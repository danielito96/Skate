import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  Modal
} from 'react-native';
import styles from './src/Styles/styles';

export default class Skate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playName: "",
      degrees: "",
      direction: "",
      foot: "",
      modalOpen: true
    };
  };

  randomizeGame() {
    var playName = ['Jugada 1', 'Jugada 2', 'Jugada 3', 'Jugada 4', 'Jugada 5', 'Jugada 6', 'Jugada 7', 'Jugada 8'];
    var degrees = ['90°', '180°', '270°', '360°'];
    var direction = ['Adelante', 'Atras', 'De Lado', 'Del Otro Lado'];
    var foot = ['Pie Derecho', 'Pie Izquierdo', 'Tercer Pie'];

    var pos = this.getRandomPosition(playName.length);
    var playNameResult = playName[pos];
    pos = this.getRandomPosition(degrees.length);
    var degreesResult = degrees[pos];
    pos = this.getRandomPosition(direction.length);
    var direction = direction[pos];
    pos = this.getRandomPosition(foot.length);
    var footResult = foot[pos];

    this.setState({
      playName: playNameResult,
      degrees: degreesResult,
      direction: direction,
      foot: footResult
    });
  }

  getRandomPosition(max) {
    var random = Math.floor(Math.random() * (max - 1));
    return random;
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SKATE</Text>
        </View>
        <View>
          <Text style={styles.textRow}><Text style={styles.title}>Jugada: </Text>
            <Text style={styles.text}>{this.state.playName}</Text></Text>
          <Text style={styles.textRow}><Text style={styles.title}>Rotacion: </Text>
            <Text style={styles.text}>{this.state.degrees}</Text></Text>
          <Text style={styles.textRow}><Text style={styles.title}>Dirección: </Text>
            <Text style={styles.text}>{this.state.direction}</Text></Text>
          <Text style={styles.textRow}><Text style={styles.title}>Derecho Pies: </Text>
            <Text style={styles.text}>{this.state.foot}</Text></Text>
        </View>
        <View>
          <TouchableHighlight onPress={() => { this.randomizeGame() }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, backgroundColor: 'red' }}>
              <Text>Jugar</Text>
            </View>
          </TouchableHighlight>
        </View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.modalOpen}
          onRequestClose={() => console.log("hola")}>
          <View style={styles.loadingModalContainer}>
            <View style={styles.loadingModalContent}>
              <Text style={styles.textRow}><Text style={styles.title}>Configuracion 1: </Text>
                <Text style={styles.text}>configuracion 1</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Configuracion 2: </Text>
                <Text style={styles.text}>configuracion 2</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Configuracion 3: </Text>
                <Text style={styles.text}>configuracion 3</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Configuracion 4: </Text>
                <Text style={styles.text}>configuracion 4</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Configuracion 5: </Text>
                <Text style={styles.text}>configuracion 5</Text></Text>
              <TouchableHighlight onPress={() => { this.setState({ modalOpen: false }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <View style={{ padding: 10, backgroundColor: 'red' }}>
                  <Text>Guardar</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('Skate', () => Skate);
