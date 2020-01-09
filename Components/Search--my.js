import React from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import FilmItem from "./FilmItem";
import FilmList from "./FilmList---test";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

// import { connect } from "react-redux";

// --------Search.js-------------
// Dans Search.js, on va créer un component custom Search qui va correspondre à notre vue Recherche.

// -------------creation du scroll infini ---------------

// 1 ---- Détectez la fin d'une FlatList : ---- avec l'évènement  onReachEnd (appelé lorsque l'on a atteint une position définie par la valeur de  onEndReachedThreshold)
// OnEndReachedThreashold  n'est pas un évènement, c'est une propriété permettant de définir quand l'évènement  onEndReached  est appelé.
// 2 ---- Gérez la pagination : ----  a) aller voir le résultat de l'API directement sur le web, afin d'avoir un rendu beaucoup plus visible. b) Puis utiliser les valeurs de  page  et  total_pages pour gérer notre pagination et, par la même occasion, notre scroll infini. c) modifier notre fonction  getFilmsFromApiWithSearchedText  de l'API dans le fichier TMDBApi.js. d)modifier l'appel que l'on fait actuellement dans  _loadFilms
// 3 ---- Remettez le state à zéro : ----  si j'oublie de mettre le state à zero, les recherches des films s'empile - a) créer une nouvelle fonction _searchFilms() c'est dans cette fonction que l'on va effectuer une nouvelle recherche
//b) attention setState  est une fonction asynchrone.  setstate possède un paramètre  callback  qui permet d'exécuter une action dès que notre state a fini de se mettre à jour. C'est parfait, on va utiliser ce paramètre pour lancer notre recherche une fois que le state a été remis à zéro

// plus d'info: https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native/5359721-apprehendez-le-setstate

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0; // Compteur pour connaître la page courante
    this.totalPages = 0; // Nombre de pages totales pour savoir si on a atteint la fin des retours de l'API TMDB
    this.state = {
      films: [],
      isLoading: false // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
    };
  }

  // J'ai essayé d'appliquer le state es06 sans constructor mais impossible de caller le this.page =0 et this.totalPages = 0 hors du state ... C'est un composant fonctionnel ? je ne comprends pas
  //   state = {
  //     // dans le state: on ne gère que des données qui une fois modifiée peuvent affecter le rendu de notre component
  //     films: [],
  //     isLoading: false, // Par défaut à false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
  //     // searchedText: "" // pour stocker le texte rechercher par l'utilisateur, taper dans le textInput
  //     // pour récupérer le texte taper dans le textInput, il faut qu'un évènement ai lieu dans le component - sinon impossible de recuperer- donc a chaque fois qu'un caractère est saisi
  //     // utiliser la props onChangeText sur le textInput - elle est appaelé a chaque fois qu'un texte est saisi
  //     // ------ retirer la propriété searchedText: ""  du state car ça charge a chaque fois qu on tape une lettre dans l'input... pour rien alors que rien à changé - du coup ne pas utiliser le state dans ce cas -
  //     // => donc sortir la variable searchedText dans une variable à par entiere: this.searchedText="" - c'est pour optimiser ,mais si je le mets dans le state c'est bon aussi ca fonctionne
  //     page=0,
  //     totalPages=0
  //   };

  //appeler cette fonction dès que l'utilisateur click sur rechercher - donc dans onPress()
  // c'est dans la fonction _loadFilms que nous allons appeler la fonction getFimls
  _loadFilms() {
    // ajouter le if pour effectuer la recherche , uniquement si le texte n'est pas vide
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true }); // Lancement du chargement

      // mettre "star"dans la () de la fonction en attendant de créer la fonction _searchTextInputChanged(text) puis remplaver par this.state.searchedText:
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;

          // on va modifier le state avec la methode setState lorsque l'appel API est terminé
          // => cela permet d'afficher toute la liste de films
          // quand la recherche est terminée- le component est rechargé avec les films récupérés de l'api (data.results)
          this.setState({
            // films: data.results, => avant de modifier avec : [...]
            //Si j'avais laissé  films: data.results , à chaque appel, on aurait écrasé et perdu les films que l'on a déjà récupérés. Notre but est d'ajouter les films à ceux que l'on a déjà récupérés et c'est exactement ce que l'on a fait ici.
            //La syntaxe  ...tableau  crée une copie du tableau. Avec cette simplification, on doit passer deux copies de nos tableaux pour que la concaténation fonctionne.
            films: [...this.state.films, ...data.results], // idem : films: this.state.films.concat(data.results) = le tableau de film qu on concatene avec

            isLoading: false // Arrêt du chargement - faire passer le bouleen a false
          });
        }
        // results est une clée de l'api =  https://api.themoviedb.org/3/search/movie?api_key=180fd47bdfed927432c5dd86424757fa&language=fr&query=star
      );
    }
  }
  _searchTextInputChanged(text) {
    this.searchedText = text; // Modification du texte recherché à chaque saisie de texte, sans passer par le setState comme avant
    // this.setState({ searchedText: text });
  }
  // sur react native on peut creer une fonction qui retourne du JSX -
  // tres pratique pour gérer un affichage optionnel
  //  Attention, toutefois, ces fonctions appelées dans le render doivent obligatoirement retourner des éléments graphiques, soit en React Native, des components (React Native ou custom).

  // --- le loading ----
  // Posez-vous la question : que souhaite-t-on faire ici exactement ?On souhaite afficher un chargement ActivityIndicator au lancement de la recherche par-dessus notre FlatList. Puis, à la fin de l'appel API, on souhaite juste enlever le chargement.
  _displayLoading() {
    //  le bouleen isLoding vaut true = this.state.isLoading
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
          {/* Le component ActivityIndicator possède une propriété size pour définir la taille du visuel de chargement : small ou large. Par défaut size vaut small, on met donc large pour que le chargement soit bien visible */}
        </View>
      );
    }
  }
  _searchFilms() {
    this.page = 0;
    this.totalPages = 0;
    this.setState(
      {
        films: []
      },
      () => {
        this._loadFilms();
      }
    );
  }
  //----Créez une action au clic sur un item de notre FlatList-----
  // ===> Cette action prend en paramètre l'identifiant du film que l'on souhaite afficher en détail. = idFilm en orange
  //fonction pour passer de la vue recherche à la vue FilmDetail:_displayDetailForFilm()
  //elle prendra en parametre (idFilm) = identifiant du film qu on souhaite afficher
  // nous allons appelé cette fonction lorsqu 'un clic sur un item de notre flatlist à lieu
  // donc depuis le component filmItem
  _displayDetailForFilm = idFilm => {
    // // ----- Naviguez d'une vue à l'autre ----
    // "FilmDetail" = mettre en parametre le nom de l'ecran(screen) que l'on souhaite afficher
    console.log("Display film with id " + idFilm);
    this.props.navigation.navigate("FilmDetail", { idFilms: idFilm });
    // comprendre le chemin grace au conlole.log(this.props) cf commentaires // ----- Naviguez d'une vue à l'autre ---- juste en dessous du render()
    //  Voici la définition de la fonction  navigate  que l'on utilise pour naviguer entre les vues :
    // ===> navigate('RouteName', { parameters })
  };

  render() {
    // console.log(this.state.isLoading);

    // ----- Naviguez d'une vue à l'autre ----
    //Depuis que l'on a ajouté notre vue Search à notre StackNavigator, quelque chose a changé dans ses props. Mettre un console.log =
    // console.log(this.props);===> On a un objet navigation qui s'est ajouté à nos props. Et bien, c'est cet objet qui va nous permettre d'utiliser la navigation dans notre component Search.

    return (
      <View style={styles.mainContainer}>
        <TextInput
          // prop onSubmitEditing = Validation de la recherche avec le clavier
          // ajouter la props onSubmitEditing - lorsque l'évènement est appelé, on va appeler this._loadFilms. puis changer en _searchFilms() pour remettre à zero le state:

          onSubmitEditing={() => this._searchFilms()}
          // dès qu'un texte sera saisi (onChangeText) on va appeler une fonction _searchTextInputChanged() lui faire passer le texte saisi (text) :
          onChangeText={text => this._searchTextInputChanged(text)}
          style={styles.textinput}
          placeholder="Titre du film"
        />
        <Button
          style={{ height: 50 }}
          title="Rechercher"
          onPress={() => this._searchFilms()}
        />
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilms charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
        />
        {/* °°°°°°°°°°°°°°avant la creation du component FilmList.js <FlatList
          // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
          // $$$$$$$--- - Etape 2 : ajouter la prop extraData ds la flatList =
          // $$$$$$$--- ---traitement du 🖤-----  extraData : ------
          // $$$$$$$--- On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre suite à la connexion avec le store/redux
          // $$$$$$$--- si on oubli extraData le <3 ne s'affiche pas car le state initial de la flatList(this.state.films) car les données de film = l'api :
          extraData={this.props.favoritesFilm}
          data={this.state.films} // data = les données que l'on souhaite afficher dans la liste. la flatList affiche une liste de film ;
          keyExtractor={item => item.id.toString()} // = une clé pour définir les item de manière unique.
          // attention, c'est pas formecement id dans item.id=> voir selon l'object que je recupere(ca peut être _id ou autre)
          onEndReachedThreshold={0.5}
          onEndReached={() => {
            if (this.page < this.totalPages) {
              // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
              this._loadFilms();
            }
          }}
          // le Flatlit est comme un map, sauf qu il a des propriété
          // renderItem = qui correspond au rendu des données de la liste.
          // Après => (Ici, on définira un template pour afficher nos films.=== <FilmItem/>)
          renderItem={({ item }) => (
            //-------- FilmItem ---------= est un component Custom
            // film = est une prop du component FilItem
            // {item} = les données du film contenus dans item -> renderItem={({ item })
            // => la prop "film=" permet de faire passer les données du film "{item}"  au component "FilmItem"
            // on a récupérer la prop dans FilmsItem.js en faisant this.props.film

            <FilmItem
              film={item}
              displayDetailForFilm={this._displayDetailForFilm}
              // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
              // $$$$$$$---  Etape 3 : (suite dans le component FilmItem.js)
              // $$$$$$$--- Ajout d'une props isFilmFavorite pour indiquer à l'item d'afficher un 🖤 ou non:
              isFilmFavorite={
                this.props.favoritesFilm.findIndex(
                  film => film.id === item.id
                ) !== -1
                  ? true
                  : false
              }
            />
          )}
          //  1 - renderItem = rendu des données de notre liste --apres => = définir un template pour afficher les films => creation d'un component custom : <FilmItem />
          // 2 - Créer une prop film sur le component filmItem + lui faire passer les données du film contenu dans item puis aller dans le component custom FilmItem  pour récupérer cette prop
          // les props permettent de transmettre des propriétés au component custom et faire passer des infos entre les contenus
          // ici on a fait passer la prop film avec les données du film au component FilmItem
          // on le récupère dans le component FilmItem en faisant this.props.film
        /> °°°°°°°°°°°°°° */}
        {/* Mettre l'appel de la fonction à la fin du render, pour etre sure qu'elle soit appelé en dernier et que le chargement s'affiche par dessus tous mes autres élements graphique  */}
        {this._displayLoading()}
        {/* // ou il est possible de tout mettre dans le render à la place de créer une fonction hors du this.render. cela donne:
        { this.state.isLoading ?
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />
          </View>
          : null
      } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute", // pour faire passer ma vue de chargement par dessus mon écran - La définition de la position  absolute  va nous permettre de faire passer le chargement par-dessus notre FlatList. Le problème est que le style  position: 'absolute'  fait passer notre chargement par-dessus toute notre vue, y compris le TextInput et le Button "Rechercher". Si vous affichez une vue par dessus des éléments, ces derniers ne sont plus accessibles. On définit donc une valeur top à 100 pour notre vue, pour qu'elle ne bloque pas l'accès au TextInput et au Button "Rechercher".
    left: 0,
    right: 0,
    top: 100, // pour éviter que ma vue passe par dessus le textInput et le bouton rechercher
    // si je met 0, le textInput et le bouton rechercher auraient été inaccessible
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
    // pour que l'ActivityIndicator soit centré dans la vue = alignItems et justifyContent = center
  }
});
// // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
// // $$$$$$$---  Etape 1 : connecter le store à Search
// const mapStateToProps = state => {
//   return { favoritesFilm: state.favoritesFilm };
// };
// export default connect(mapStateToProps)(Search);

export default Search;
