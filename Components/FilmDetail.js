import React from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
  Text
} from "react-native";
// pour appeler l'api au coponentDidMont :
import { getFilmDetailFromApi } from "../API/TMDBApi";
import { getImageFromApi } from "../API/TMDBApi";
import moment from "moment";
import numeral from "numeral";

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
    console.log("componentDidMount");

    getFilmDetailFromApi(this.props.navigation.state.params.idFilms).then(
      data => {
        this.setState({
          film: data,
          isLoading: false
        });
      }
    );
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
    console.log("render");

    // console.log(this.props.navigation);

    const idFilms = this.props.navigation.state.params.idFilms;
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
  }
});

export default FilmDetail;
