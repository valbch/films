// Navigation StackNavigator = s nitialise avec toutes les vues qu il va contenir

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

//utiliser notre StackNavigator et l’afficher dans notre application. Pour ce faire, il faut utiliser la fonction  createAppContainer  de React Navigation. Elle permet de formater votre navigation pour la rendre utilisable dans l’application:
import { createAppContainer } from "react-navigation";
// Ici, on va importer la fonction  createStackNavigator  de la librairie  react-navigation-stack  . Une fonction qui, comme son nom l'indique, permet de créer un StackNavigator. On ne va pas créer de component, donc pas besoin d'importer React :
import { createStackNavigator } from "react-navigation-stack";
import Search from "../Components/Search";
import FilmDetail from "../Components/FilmDetail";

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

export default createAppContainer(SearchStackNavigator);
