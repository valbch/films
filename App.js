// ---------Ajoutez le store à notre application -----------
// => Pour accéder au store dans tous les components de notre application.

import React from "react";
import Navigation from "./Navigation/Navigation";
//1/ = importer le composant Provider de la librairies react-redux =
// => ce composant va se charger de distribuer notre store à notre application
// => component Provider permet d'acceder au store et à ses reducers
import { Provider } from "react-redux";
// pour le distribuer il faut lui donner donc aller le chercher dans "./Store/configureStore" :
import Store from "./Store/configureStore";

export default class App extends React.Component {
  render() {
    return (
      // on utilise le Provider - on lui fourni le store (=prop de Provider - en vert ) dans {store} (en blanc)
      // encapsuler notre application ( <Naigation/>) dans le Provider
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}
