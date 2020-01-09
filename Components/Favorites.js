// Components/Favorites.js
// construire la vue Favoris :

// 1 - Connecter le store Redux au component Favorites et transmettre au component FilmList les films favoris du state de l'application.

// 2 - Créer et ajouter un StackNavigator pour l'onglet favoris.

// 3 - Bien différencier le cas où l'on affiche la liste de films depuis l'onglet recherche et depuis l'onglet favoris. Quand on arrive à la fin de la liste des films favoris, il ne faut pas appeler la fonction   loadFilms . Personnellement, j'ai utilisé un booléen  favoriteList  au moment de la déclaration du component FilmList pour différencier les deux cas.

//4 - (Bonus) Les détails des films favoris sont déjà stockés dans notre state global. De ce fait, quand on arrive sur la vue détail d'un film favori, ce n'est pas nécessaire de refaire un appel API, on peut utiliser le détail du film stocké.

import React from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import FilmList from "../Components/FilmList";
class Favorites extends React.Component {
  render() {
    return (
      <FilmList
        films={this.props.favoritesFilm}
        navigation={this.props.navigation}
        favoriteList={true} // Ici on est bien dans le cas de la liste des films favoris. Ce booléen à true permettra d'empêcher de lancer la recherche de plus de films après un scroll lorsqu'on est sur la vue Favoris.
      />
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => {
  return { favoritesFilm: state.favoritesFilm };
};

export default connect(mapStateToProps)(Favorites);
