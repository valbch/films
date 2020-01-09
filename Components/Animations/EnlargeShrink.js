// ---- Ajoutez un agrandissement / rétrécissement sur le bouton Favoris ----

// 1 - Quand on ajoute un film aux favoris, le bouton d'ajout passe de ♡ à 🖤, ça, ça marche déjà. Maintenant, je souhaite, qu'en plus, le 🖤double de volume, qu'il passe d'une taille de 40x40 à 80x80 avec une animation spring.

// 2 - Quand on supprime un film des favoris, le bouton de suppression passe de 🖤à ♡, ça aussi c'est OK. Maintenant, je souhaite, qu'en plus, le 🖤diminue par 2 son volume, qu'il passe de 80x80 à 40x40 avec une animation spring.

// 3 - Enfin, je veux que toute l'animation soit externalisée dans un component à part entière, comme on l'a fait pour l'animation FadeIn. ====> OK

// ----- > A FAIRE

// L'animation EnlargeShrink, prend, via les props, un booléen  shouldEnlarge  en fonction de si le 🖤doit être agrandi ou rétréci
// Il faut jouer l'animation quand le 🖤est mis à jour, c'est-à-dire quand le component FilmDetail et tout ce qu'il contient sont re-rendus. Reportez-vous aux cycles de vie pour connaître la méthode à surcharger.
// Pensez également à gérer le cas où l'utilisateur affiche le détail d'un film déjà en favoris. Dans ce cas précis, le 🖤doit être, par défaut, agrandi.
// Dans FilmDetail.js ===== Faites attention également au style que l'on a défini sur l'image du 🖤. Il faut indiquer à notre image d'adapter sa taille à l'espace disponible. Pour les images, c'est un peu particulier à réaliser, alors je vous donne l'astuce. Remplacez le style  favorite_image  par  :
// favorite_image:{
//     flex: 1,
//     width: null,
//     height: null
// }

import React from "react";
import { Animated } from "react-native";

class EnlargeShrink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewSize: new Animated.Value(this._getSize())
    };
  }

  _getSize() {
    if (this.props.shouldEnlarge === true) {
      return 80;
    }
    return 40;
  }
  // La méthode componentDidUpdate est exécuté chaque fois que le component est mise à jour, c'est l'endroit parfait pour lancer / relancer notre animation.
  componentDidUpdate() {
    Animated.spring(this.state.viewSize, {
      toValue: this._getSize()
    }).start();
  }

  render() {
    return (
      <Animated.View
        style={{ width: this.state.viewSize, height: this.state.viewSize }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

export default EnlargeShrink;
