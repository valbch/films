// Navigation/Navigation.js

import React from "react"; // N'oubliez pas l'import de React ici. On en a besoin pour rendre nos components React Native Image !
import { StyleSheet, Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import Test from "../Components/Test";

const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});
const FavoritesStackNavigaror = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favoris"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          // On définit le rendu de nos icônes par les images récemment ajoutés au projet
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={styles.icon}
            />
          ); // On applique un style pour les redimensionner comme il faut
        }
      }
    },

    Favorites: {
      screen: FavoritesStackNavigaror,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_favorite.png")}
              style={styles.icon}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#DDDDDD", // Couleur d'arrière-plan de l'onglet sélectionné
      inactiveBackgroundColor: "#FFFFFF", // Couleur d'arrière-plan des onglets non sélectionnés
      showLabel: false, // On masque les titres
      showIcon: true // On informe le TabNavigator qu'on souhaite afficher les icônes définis
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

export default createAppContainer(MoviesTabNavigator);
