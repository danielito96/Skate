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

const word = "SKATE";

export default class Skate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playName: "",
      degrees: "",
      direction: "",
      foot: "",
      modalOpen: false,
      infoModalOpen: false,
      twoPlayers: true,
      canRandomize: true,
      turn: 1,
      points: 0,
      lost1: 0,
      lost2: 0,
      modalContent: null
    };
  };

  randomizeGame() {
    var playName = ['Ollie', 'Kickflip', 'Heelflip', 'Pop Shove-it', 'Varial kikflip', 'Varial heelflip', 'Bigspin', 'Hard flip'];
    var degrees = ['180°', '360°'];
    var direction = ['Backside', 'Frontside'];
    var foot = ['Regular', 'Goofy', 'Nollie', 'Fakie'];

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
      //show modal to change player
      this.setState({
        infoModalOpen: true,
        modalContent: <View>
          <Text style={styles.modalTitle}>Exelente!</Text>
          <Text style={styles.modalSubTitle}>Continua el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
          <TouchableHighlight onPress={() => { this.changeTurn() }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
              <Text style={{ textAlign: 'center' }}>Continuar</Text>
            </View>
          </TouchableHighlight>
        </View>
      });
      //this.changeTurn();
    } else {
      this.setState({ points: this.state.points += 1 })
    }
  }

  changeTurn() {
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
    this.setState({ infoModalOpen: false });
  }

  fallo() {
    if (this.state.twoPlayers) {
      var lost = this.state.turn == 1 ? this.state.lost1 : this.state.lost2;
      lost += 1;
      if (this.state.canRandomize) {
        //this.changeTurn();
        this.setState({
          infoModalOpen: true,
          modalContent: <View>
            <Text style={styles.modalTitle}>Que mal</Text>
            <Text style={styles.modalSubTitle}>Continua el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
            <TouchableHighlight onPress={() => { this.changeTurn() }} underlayColor={'rgba(0, 0, 0, 0)'}>
              <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
                <Text style={{ textAlign: 'center' }}>Continuar</Text>
              </View>
            </TouchableHighlight>
          </View>
        })
      } else {
        if (lost == word.length) {
          //segundo tiro
        } else if (lost > word.length) {
          //game Over
        } else {
          if (this.state.turn == 1) {
            this.setState({ lost1: lost })
          } else {
            this.setState({ lost2: lost })
          }
          //this.changeTurn();
        }
      }

    } else {
      this.setState({ points: 0 });
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
        <View style={{ flexDirection: 'row', margin: 10 }}>
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
              <TouchableHighlight onPress={() => { this.setState({ modalOpen: false }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <View style={{ padding: 10, backgroundColor: 'red' }}>
                  <Text>Guardar</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.infoModalOpen}
          onRequestClose={() => console.log("hola")}>
          <View style={styles.loadingModalContainer}>
            <View style={styles.loadingModalContent}>
              {this.state.modalContent}
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

AppRegistry.registerComponent('Skate', () => Skate);
