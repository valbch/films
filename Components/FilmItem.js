import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImageFromApi } from "../API/TMDBApi";
import FadeIn from "./Animations/FadeIn";

// 1/ mettre en dure les infos + s'occuper des images apres - en attendant mettre : source={{ uri: "Image" }}
/////////

// -------- touchableOpacity = ---------
//pour detecter un clic sur une View = donc remplacer la view global par touchableOpacity
// Un TouchableOpacity n'est en soi qu'une "enveloppe" permettant à vos vues d'être cliquables.
// L'information "Opacity" signifie que votre vue va jouer une animation de clignotement (en jouant sur l'opacité) lorsque vous allez appuyer dessus.
//remplacer la première View du component FilmItem par une TouchableOpacity qui est capable de récupérer des évènements, et notamment l'évènement  onPress  :

class FilmItem extends React.Component {
  // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
  // $$$$$$$--- Etape 4 :
  // $$$$$$$--- creation de la fonction _displayFavoriteImage() pour affiche le coeur ou non
  _displayFavoriteImage() {
    // $$$$$$$---isFilmFavorite est la prop du component <FilmItem/> dans Search.js qui indique à l'item d'afficher un 🖤 ou non
    if (this.props.isFilmFavorite === true) {
      return (
        <Image
          style={styles.favorite_image}
          source={require("../Images/ic_favorite.png")}
        />
      );
    }
  }

  render() {
    // console.log(this.props);
    //  1/ _______ console.log()__________
    // -  taper console.log(this.props)=  dans le render
    // pour afficher les props de notre component custom FilmItem
    // - dans le terminal le détail du film s'affiche
    // -> pour récupérer le film, on fera this.props.film car c'est le nom de l'objet
    // 2/ remplacer le console.log par une constante:
    // -> const film = this.props.film;
    // 3/ Maintenant que les données du film sont dans une constante, on peut remplacer tous les textes par défaut par les vrais données.
    // ex: {film.title} pour éviter d'écrire : this.props.film.title

    // const displayDetailForFilm = this.props.displayDetailForFilm
    // ces 2 lignes peuvent être remplacées par =
    const { film, displayDetailForFilm } = this.props;

    return (
      <FadeIn>
        {/* // On définit la props onPress sur notre View pour appeler notre fonction displayDetailForFilm */}
        <TouchableOpacity
          onPress={() => displayDetailForFilm(film.id)}
          style={styles.global}
        >
          <Image
            style={styles.image}
            source={{ uri: getImageFromApi(film.poster_path) }}
          />
          <View style={styles.content}>
            <View style={styles.headerContainer}>
              {/* // $$$$$$$--- Afficher 🖤 dans la vue Recherche/Search.js
// $$$$$$$--- - Etape 4 : 
// $$$$$$$--- Appel de la fonction _displayFavoriteImage() = afficher le coeur ou nom à gauche du titre */}
              {this._displayFavoriteImage()}
              <Text style={styles.title}>{film.title}</Text>
              <Text style={styles.vote}>{film.vote_average}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.descriptionText} numberOfLines={6}>
                {film.overview}
              </Text>
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>Sorti le {film.release_date}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </FadeIn>
    );
  }
}

const styles = StyleSheet.create({
  global: {
    height: 190,

    flexDirection: "row"
  },
  image: {
    width: 120,
    height: 180,
    margin: 5
  },
  content: {
    flex: 1,
    margin: 5
  },
  headerContainer: {
    flex: 3,
    flexDirection: "row" // OK
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
    flex: 1,
    flexWrap: "wrap",
    //permet à notre texte de passer à la ligne si celui-ci est trop long
    paddingRight: 5
  },
  vote: {
    fontWeight: "bold",
    fontSize: 26,
    color: "#666666"
  },
  descriptionContainer: {
    flex: 7
  },

  dateContainer: {
    flex: 1
  },
  dateText: {
    textAlign: "right",
    fontSize: 14
  },
  favorite_image: {
    width: 25,
    height: 25,
    marginRight: 5
  }
});

export default FilmItem;
