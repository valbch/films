import React from "react";
import { FlatList, StyleSheet } from "react-native";
import FilmItem from "./FilmItem";
import { connect } from "react-redux";

// Quelle sera la fonction de ce component ?
// - afficher une liste de films
// - naviguer vers le détail d'un film.
// ===> Le component FilmList va recevoir des films de par ses props, les afficher et, au clic sur un film, naviguer vers son détail.

// A FAIRE :
// ===> dans FilmList.js:
// dans le state= Afficher la liste de film
// avec une fonction _displayDetailForFilm() = qui permet d'afficher le détail d'un film
// Flatlist avec les filmItem

// ===> dans Search.js:
// FilmList  est à la place de flatlist et filmItem

class FilmList extends React.Component {
  state = {
    films: []
  };
  _displayDetailForFilm = idFilm => {
    console.log("Display film " + idFilm);
    // On a récupéré les informations de la navigation, on peut afficher le détail du film
    this.props.navigation.navigate("FilmDetail", { idFilm: idFilm });
  };
  render = () => {
    return (
      <FlatList
        style={styles.list}
        // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
        // $$$$$$$--- - Etape 2 : ajouter la prop extraData ds la flatList =
        // $$$$$$$--- ---traitement du 🖤-----  extraData : ------
        // $$$$$$$--- On utilise la prop extraData pour indiquer à notre FlatList que d’autres données doivent être prises en compte si on lui demande de se re-rendre suite à la connexion avec le store/redux
        // $$$$$$$--- si on oubli extraData le <3 ne s'affiche pas car le state initial de la flatList(this.state.films) car les données de film = l'api :
        extraData={this.props.favoritesFilm}
        data={this.props.films} // data = les données que l'on souhaite afficher dans la liste. la flatList affiche une liste de film ;
        keyExtractor={item => item.id.toString()} // = une clé pour définir les item de manière unique.
        // attention, c'est pas formecement id dans item.id=> voir selon l'object que je recupere(ca peut être _id ou autre)

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
            displayDetailForFilm={this._displayDetailForFilm}
          />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (this.page < this.totalPages) {
            // On vérifie également qu'on n'a pas atteint la fin de la pagination (totalPages) avant de charger plus d'éléments
            this._loadFilms();
          }
        }}
        //  1 - renderItem = rendu des données de notre liste --apres => = définir un template pour afficher les films => creation d'un component custom : <FilmItem />
        // 2 - Créer une prop film sur le component filmItem + lui faire passer les données du film contenu dans item puis aller dans le component custom FilmItem  pour récupérer cette prop
        // les props permettent de transmettre des propriétés au component custom et faire passer des infos entre les contenus
        // ici on a fait passer la prop film avec les données du film au component FilmItem
        // on le récupère dans le component FilmItem en faisant this.props.film
      />
    );
  };
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  }
});
const mapStateToProps = state => {
  return { favoritesFilm: state.favoritesFilm };
};
export default connect(mapStateToProps)(FilmList);
