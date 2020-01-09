// Components/Test.js
// PanResponder
// ===> pour faire glisser le carré rouge où on veut avec le doigt
// L'API PanResponder n'est pas vraiment liée aux animations, mais elle s'en rapproche. L'API permet de détecter les gestes de l'utilisateur à l'écran et d'effectuer des actions en fonction.

// Un PanResponder n'a rien à voir avec l'API Animated, on n'a donc pas besoin de nos Animated.Value ni de notre Animated.View ici.
// plus d'info : https://openclassrooms.com/fr/courses/4902061-developpez-une-application-mobile-react-native/4959606-ameliorez-votre-application-avec-des-animations
import React from "react";
import { StyleSheet, View, PanResponder, Dimensions } from "react-native";
// onStartShouldSetPanResponder  : qui indique au PanResponder s'il doit détecter les gestes dès son initialisation. On a mis  true  . Indispensable, sans quoi le PanResponder ne détecterait rien.
// onPanResponderMove  : qui définit l'action à effectuer à chaque geste de l'utilisateur.
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topPosition: 0,
      leftPosition: 0
    };
    var { height, width } = Dimensions.get("window");
    this.panResponder = PanResponder.create({
      // Première chose, dans le  constructor  , j'ai créé un PanResponder avec deux propriétés :
      //propriété 1 : onStartShouldSetPanResponder  : qui indique au PanResponder s'il doit détecter les gestes dès son initialisation. On a mis  true  . Indispensable, sans quoi le PanResponder ne détecterait rien.
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // propriété 2 : onPanResponderMove  : qui définit l'action à effectuer à chaque geste de l'utilisateur.
      onPanResponderMove: (evt, gestureState) => {
        let touches = evt.nativeEvent.touches;
        if (touches.length == 1) {
          this.setState({
            topPosition: touches[0].pageY - height / 2,
            leftPosition: touches[0].pageX - width / 2
          });
        }
      }
    });
  }
  render() {
    return (
      <View style={styles.main_container}>
        <View
          {...this.panResponder.panHandlers}
          style={[
            styles.animation_view,
            { top: this.state.topPosition, left: this.state.leftPosition }
          ]}
        ></View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  animation_view: {
    backgroundColor: "red",
    width: 100,
    height: 100
  }
});
export default Test;
