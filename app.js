import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  TouchableHighlight,
  Modal,
  Image
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
      modalOpen: false,
      twoPlayers: true,
      canRandomize: true,
      turn: 1
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

  settingsPlayer() {
    this.setState({ twoPlayers: !this.state.twoPlayers });
  }

  logro() {
    if (this.state.twoPlayers) {
      var turn = this.state.turn;
      if (turn == 1) {
        turn = 2;
      } else {
        turn = 1;
      }
      this.setState({
        canRandomize: !this.state.canRandomize,
        turn: turn
      });
    }
  }

  fallo() {
    if (this.state.twoPlayers) {
      var turn = this.state.turn;
      if (turn == 1) {
        turn = 2;
      } else {
        turn = 1;
      }
      this.setState({
        canRandomize: !this.state.canRandomize,
        turn: turn
      });
    }
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
          <TouchableHighlight onPress={() => { this.setState({ modalOpen: true }) }} style={styles.settingsIcon}>
            <Image source={require('./src/Resources/settings_black_48.png')} />
          </TouchableHighlight>
        </View>
        <View>
          {this.state.twoPlayers ? <Text style={styles.textRow}><Text style={styles.title}>Jugadador {this.state.turn}</Text></Text> : null}
          {this.state.canRandomize ?
            <View>
              <Text style={styles.textRow}><Text style={styles.title}>Jugada: </Text>
                <Text style={styles.text}>{this.state.playName}</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Rotacion: </Text>
                <Text style={styles.text}>{this.state.degrees}</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Dirección: </Text>
                <Text style={styles.text}>{this.state.direction}</Text></Text>
              <Text style={styles.textRow}><Text style={styles.title}>Derecho Pies: </Text>
                <Text style={styles.text}>{this.state.foot}</Text></Text>
            </View> : null}
          <Text style={styles.textRow}><Text style={styles.title}>Jugada: </Text>
            <Text style={styles.text}>{this.state.playName} {this.state.degrees} {this.state.direction} {this.state.foot}</Text>
          </Text>
        </View>
        {this.state.canRandomize ?
          <View>
            <TouchableHighlight onPress={() => { this.randomizeGame() }} underlayColor={'rgba(0, 0, 0, 0)'}>
              <View style={{ padding: 10, backgroundColor: 'red' }}>
                <Text>Lanzar</Text>
              </View>
            </TouchableHighlight>
          </View> : null}
        <View style={{ flexDirection: 'row', margin: 40 }}>
          <TouchableHighlight style={{ margin: 10 }} onPress={() => { this.logro() }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, backgroundColor: 'red' }}>
              <Text>Logro</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight style={{ margin: 10 }} onPress={() => { this.fallo() }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, backgroundColor: 'red' }}>
              <Text>Fallo</Text>
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
              <TouchableHighlight onPress={() => { this.settingsPlayer() }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <Text style={styles.textRow}><Text style={styles.title}>jugadores: </Text>
                  <Text style={styles.text}>{this.state.twoPlayers ? "2" : "1"}</Text></Text>
              </TouchableHighlight>
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
