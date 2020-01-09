import React from "react";
import { Dimensions, Animated } from "react-native";

class FadeIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionLeft: new Animated.Value(Dimensions.get("window").width)
    };
  }

  componentDidMount() {
    Animated.spring(this.state.positionLeft, {
      toValue: 0
    }).start();
  }
  render() {
    return (
      <Animated.View style={{ left: this.state.positionLeft }}>
        {/* // FadeIn.js est devenu un component parent car le component FilmItem est encapsulé dans <FadeIn>component FilmItem</FadeIn> 
        ===> Sur React les component parents doivent retourner leurs enfants
        ===> Il faut retourner {this.props.children}  */}
        {this.props.children}
      </Animated.View>
    );
  }
}

export default FadeIn;
