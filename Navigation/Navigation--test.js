// [1] Navigation StackNavigator = s nitialise avec toutes les vues qu il va contenir

// avant = installer react Natigation = npm i --save react-navigation + npm i + npm start
// 1/ importer la fonction createStackNavigator de la librairie react-navigation :
// =====> import { createStackNavigator } from "react-navigation";
//2/ créer le StackNavigator  qu on va appeler SeachStackNavigator + utiliser la fonction createStackNavigator() qu on vient d'importer
// =====> const SeachStackNavigator = createStackNavigator();
// => un StackNavigator, s'initialise avec toutes les vues qu'il va comporter
// 3/ dans notre StackNavigator on va afficher notre vue Search donc l'importer:
// =====> import Search from "../Components/Search";
// 4/ initialiser notre StackNavigator avec une entrée Search qui va correspondre au screen importé Search :
// =====> const SeachStackNavigator = createStackNavigator({Search: { screen: Search, navigationOptions:{title: "Rechercher"} }
// 5/ pour exporter et utiliser notre navigation dans l'application, il faut utiliser un container appeler createAppContainer donc l'importer:
// 6/ Créer notre container en lui donnant notre stackNavigator :
// ====> export default createAppContainer (SeachStackNavigator)
// 7/ dans le fichier App.js on va modifier l'affichage de notre component Seach par celui de notre Navigation + dans le return afficher notre Nagigation
//////

//[2] Navigation avec TabNavigator
// ====> créer une barre d'onglets/TabBar = une barre d'onglets n'est qu'un simple menu, où chaque entrée du menu affiche une vue.
// => On associe  un onglet à une vue = l'onglet "recherche" va afficher la vue "recherche de film", et l'onglet "favoris", la vue "favoris".
// 1) Importer createBottomTabNavigator =import { createBottomTabNavigator } from 'react-navigation-tabs' Puis faire : npm --save install react-navigation-tabs et enfin : npm --save install react-native-reanimated
// 2) Créer une constante/variable et initialiser la barre d'onglet avec createBottomTabNavigator () .
// => La création d'un TabNavigator passe par la fonction  createBottomTabNavigator de React Navigation.
// 3) mettre MoviesTabNavigator dans export default à la place de SearchStackNavigator

//utiliser notre StackNavigator et l’afficher dans notre application. Pour ce faire, il faut utiliser la fonction  createAppContainer  de React Navigation. Elle permet de formater votre navigation pour la rendre utilisable dans l’application:
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import { StyleSheet, Image, Text } from "react-native";
import React from "react";

import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import FilmList from "../Components/FilmList";
// *******  StackNavigator  *******
// Ici, on va importer la fonction  createStackNavigator  de la librairie  react-navigation-stack  . Une fonction qui, comme son nom l'indique, permet de créer un StackNavigator.
const SearchStackNavigator = createStackNavigator({
  Search: {
    // Ici j'ai appelé la vue "Search" mais on peut mettre ce que l'on veut. C'est le nom qu'on utilisera pour appeler cette vue
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});
// *******  TabNavigator  *******

const MoviesTabNavigator = createBottomTabNavigator(
  {
    // Définir une entrée Search avec un écran qui va correspondre à notre StackNavigator
    // Notre navigation principal n'est plus le StackNavigator
    Search: {
      screen: SearchStackNavigator,
      // °°°° Customisez les onglets --- Etape 2:
      // ==> Définir le rendu des icon :  utiliser navigationOptions
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
      screen: Favorites,
      // °°°° Customisez les onglets --- Etape 2:
      // ==> Définir le rendu des icon :  utiliser navigationOptions
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
    // °°°° Customisez les onglets --- Etape 1:
    // tabBarOtions: option pour définir des propriétés sur la barre d'onglet
    // ==> Suppression des titres des onglets : showLabel: false
    // ==> Affichage des images dans les onglets : showIcon: true + tabBarIcon dans  navigationOptions
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
