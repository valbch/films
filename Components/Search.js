// Components/Search.js

import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
  FlatList,
  ActivityIndicator
} from "react-native";
import FilmItem from "./FilmItem";
import FilmList from "./FilmList";
import { getFilmsFromApiWithSearchedText } from "../API/TMDBApi";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.searchedText = "";
    this.page = 0;
    this.totalPages = 0;
    this.state = {
      films: [],
      isLoading: false
    };
    // this._loadFilms = this._loadFilms.bind(this);
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true });
      getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(
        data => {
          this.page = data.page;
          this.totalPages = data.total_pages;
          this.setState({
            films: [...this.state.films, ...data.results],
            isLoading: false
          });
        }
      );
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text;
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

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
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
    return (
      <View style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder="Titre du film"
          onChangeText={text => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button title="Rechercher" onPress={() => this._searchFilms()} />
        <FilmList
          films={this.state.films} // C'est bien le component Search qui récupère les films depuis l'API et on les transmet ici pour que le component FilmList les affiche
          navigation={this.props.navigation} // Ici on transmet les informations de navigation pour permettre au component FilmList de naviguer vers le détail d'un film
          loadFilms={this._loadFilms} // _loadFilm charge les films suivants, ça concerne l'API, le component FilmList va juste appeler cette méthode quand l'utilisateur aura parcouru tous les films et c'est le component Search qui lui fournira les films suivants
          page={this.page}
          totalPages={this.totalPages} // les infos page et totalPages vont être utile, côté component FilmList, pour ne pas déclencher l'évènement pour charger plus de film si on a atteint la dernière page
          favoriteList={false} // Ici j'ai simplement ajouté un booléen à false pour indiquer qu'on n'est pas dans le cas de l'affichage de la liste des films favoris. Et ainsi pouvoir déclencher le chargement de plus de films lorsque l'utilisateur scrolle.
        />
        {this._displayLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: "#000000",
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default Search;
