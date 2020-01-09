import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
// pour appeler l'api au coponentDidMont :
import { getFilmDetailFromApi } from "../API/TMDBApi";
import { getImageFromApi } from "../API/TMDBApi";
import moment from "moment";
import numeral from "numeral";
// Connecter le store - étape 1 =connecter le store à notre component FilmDetail grace a la fonction connect :
import { connect } from "react-redux";

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: undefined,
      isLoading: true
    };
  }
  // ------ Appel API avec componentDidMont: -------
  // lancer l'appel api en appelant la fonction getFilmDetailFromApi(
  // utiliser les data pour définir le state puis créer la fonction _displayFilm() pour afficher le détail du film

  componentDidMount() {
    getFilmDetailFromApi(this.props.navigation.state.params.idFilms).then(
      data => {
        this.setState({
          film: data,
          isLoading: false
        });
      }
    );
  }
  //  Etape 2_Action :creation de la fonction qui sera appelé au clic du bouton "Favorie":
  _toggleFavorite() {
    const action = { type: "TOGGLE_FAVORITE", value: this.state.film };
    // Etape3_Action : utiliser la fonction dispatch() pour envoyer la fonction au store
    this.props.dispatch(action);
  }

  // creation de la méthode componentDidUpdate() - cette methode fait partie du cycle de vie updating
  // faire un console.log(), permet de verifier:
  // - bon fonctionnement de redux en ajoutant et en supprimant des films de nos favories
  // - Que le component passe bien dans le cycle de vie updating a chaque fois qu'un changement à lieu dans la liste de film favoris

  // ----------componentDidUpdate() -----------
  // ajouter a la méthode un log  pour afficher les films favoris.
  // => ouvrir le terminal - acceder au detail d'un film, puis cliquer sur le bouton Favoris: passage dans le cycle de vie updating et la liste de film favoris, géré par le store redux contient bien le film séléctionné
  // si je reclique sur le bouton favoris - j'ai bien un tableau vide Array []
  // on passe d'un tableau vide à un tableau avec un film,
  // mais en plus le component FilmDetail passe bien dans le cycle updating à chaque changement
  componentDidUpdate() {
    console.log(this.props.favoritesFilm);
  }
  //   --------- AFFICHER LE <3 vide ou plein ----------
  // 1/ créer une fonction   _displayFavoriteImage()
  // 2/ créer une variable sourceImage qui va nous permettre de gérer l'image à afficher
  //   => l'initialiser avec le coeur vide
  _displayFavoriteImage() {
    let sourceImage = require("../Images/ic_favorite_border.png");
    // 3/ utiliser la fonction .findIndex() pour savoir si le film fait parti ou non des favoris :
    //   => si le resultat ne vaut pas - 1 = le film fait parti des favoris. Dans ce cas l'image à affiche est le coeur plein
    if (
      this.props.favoritesFilm.findIndex(
        item => item.id === this.state.film.id
      ) !== -1
    ) {
      // Film dans nos favoris
      sourceImage = require("../Images/ic_favorite.png");
      // Le nom de vos images, défini dans require, doit être statique.
    }
    return <Image style={styles.favorite_image} source={sourceImage} />;
  }

  // creer une fonction pour afficher le detail du film:
  _displayFilm() {
    //récupérer le film dans une constante, car plus facile à utiliser:
    const film = this.state.film;
    // afficher son détail uniquement si film ne vaut pas undefined sinon lors du lancement de l'application, on va passer dans le _displyFilm alors que le film ne sera pas encore récupéré
    // recupérer la fonction dans le render de notre component
    if (film != undefined) {
      return (
        //component ScrollView = comme une vue mais quand il y a bcp de contenu, la vue va scroller
        <ScrollView style={styles.ScrollView_container}>
          {/* <Text>{film.title}</Text> */}
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.backdrop_path) }}
          />
          <Text style={styles.title_text}>{film.title}</Text>
          {/* // Etape 1_Action : creation du bouton :  */}
          <TouchableOpacity
            // remplacer le bouton par un TouchableOpacity car le bouton ne peut pas afficher une image coeur- Les boutons sur React Native, Button, sont très peu customisables, voire pas du tout. On ne peut pas créer un Button avec une image, par exemple. De ce fait, on utilise souvent les Touchable pour créer nos boutons custom.
            style={styles.favorite_container}
            onPress={() => this._toggleFavorite()}
          >
            {/* // Dans le TouchableOpacity on va appeler la fonction _displayFavoriteImage() qui va se charger d'afficher un coeur plein ou un coeur vide : s'occuper du styles puis créer la fonction plus haut */}
            {this._displayFavoriteImage()}
          </TouchableOpacity>
          <Text style={styles.description_text}>{film.overview}</Text>
          <Text style={styles.default_text}>
            {/* //Utiliser moment.js pour formater la date. Les 2 lignes de code fonctionnent */}
            {/* Sorti le {moment(new Date(film.release_date)).format("DD/MM/YYYY")} */}
            Sorti le : {moment(film.release_date).format("DD/MM/YYYY")}
          </Text>
          <Text style={styles.default_text}>Note : {film.vote_average} </Text>
          <Text style={styles.default_text}>
            Nombre de votes : {film.vote_count}{" "}
          </Text>
          <Text style={styles.default_text}>
            Budget : {numeral(film.budget).format("0,0 $")}{" "}
          </Text>
          <Text style={styles.default_text}>
            Genre(s) :{" "}
            {film.genres.map(genre => {
              return genre.name;
            })}
          </Text>
          <Text style={styles.default_text}>
            Companie(s):{" "}
            {film.production_companies.map((item, i) => {
              return item.name;
            })}
          </Text>
        </ScrollView>
      );
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
  }
  render() {
    console.log(this.props);

    // console.log(this.props.navigation);

    // const idFilms = this.props.navigation.state.params.idFilms;
    return (
      <View style={styles.main_container}>
        {/* //pour afficher le detail du film: _displayFilm() */}
        {this._displayFilm()}
        {this._displayLoading()}
        {/* <Text>
        {idFilms}
         ou directement dans creer de const idFilms= {/* Détail du film !!!{this.props.navigation.state.params.idFilms} */}
        {/* </Text> */}
        {/* // ou acceder aux parametresen utilisant la fonction getParam() */}
        {/* <Text>Détail du film{this.props.navigation.getParam('idFilm')}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  loading_container: {
    position: "absolute", // pour faire passer ma vue de chargement par dessus mon écran - La définition de la position  absolute  va nous permettre de faire passer le chargement par-dessus notre FlatList. Le problème est que le style  position: 'absolute'  fait passer notre chargement par-dessus toute notre vue, y compris le TextInput et le Button "Rechercher". Si vous affichez une vue par dessus des éléments, ces derniers ne sont plus accessibles. On définit donc une valeur top à 100 pour notre vue, pour qu'elle ne bloque pas l'accès au TextInput et au Button "Rechercher".
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
    // pour que l'ActivityIndicator soit centré dans la vue = alignItems et justifyContent = center
  },
  ScrollView_container: {
    flex: 1 // pour que le contenu de la scrollView prenne tout l'ecran
    // flexDirection: "row"
  },
  image: {
    height: 169,
    margin: 5
    // backgroundColor: "gray"
  },
  title_text: {
    // backgroundColor: "yellow",
    fontWeight: "bold",
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 35,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10
  },
  description_text: {
    fontStyle: "italic",
    color: "#666666",
    margin: 5,
    marginBottom: 15
    // backgroundColor: "red"
  },
  default_text: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
    // backgroundColor: "pink"
  },
  favorite_container: {
    alignItems: "center"
    // ne pas définir de taille- la taille sera defini par la taille du coeur, son composant enfant
  },
  favorite_image: {
    width: 40,
    height: 40
  }
});
// Connecter le store - étape 2 =créer une fonction  mapStateToProps  et l'ajouter en paramètre de la fonction  connect:
const mapStateToProps = state => {
  // Connecter le store - étape 4 = connecterez que les éléments nécessaires dans le return :
  // => spécifier les informations qui nous intéressent et ne pas retourner tout le state
  return { favoritesFilm: state.favoritesFilm };
};
// Connecter le store à FilmDetail - étape 3  =connection du state de l'application avec les props du component FilmDetail:
export default connect(mapStateToProps)(FilmDetail);
