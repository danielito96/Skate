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
    //crea un nuevo reto para el jugador
    var playName = ['Ollie', 'Kickflip', 'Heelflip', 'Pop Shove-it', 'Varial kikflip', 'Varial heelflip', 'Bigspin', 'Hard flip'];
    var degrees = ['0°', '180°', '360°'];
    var direction = ['Backside', 'Frontside'];
    var foot = ['Regular', 'Goofy', 'Nollie', 'Fakie'];

    var pos = this.getRandomPosition(playName.length);
    var playNameResult = playName[pos];
    pos = this.getRandomPosition((degrees.length) );
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

  //se llama cuando el jugador logro hacer el reto
  logro() {
    if (this.state.twoPlayers) {
      //dos jugadores
      if (this.state.turn == 1) {
        if (this.state.lost1 == word.length) {
          //si el jugador gano el turno de cortesía, vuelve a tener 2 oportunidades
          this.setState({ lost1: this.state.lost1 - 1 })
        }
      } else {
        if (this.state.lost2 == word.length) {
          //si el jugador gano el turno de cortesía, vuelve a tener 2 oportunidades
          this.setState({ lost2: this.state.lost2 - 1 })
        }
      }
      this.setState({
        infoModalOpen: true,
        modalContent: <View>
          <Text style={styles.modalTitle}>Exelente!</Text>
          <Text style={styles.modalSubTitle}>Continua el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
          <TouchableHighlight onPress={() => { this.changeTurn(true) }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
              <Text style={{ textAlign: 'center' }}>Continuar</Text>
            </View>
          </TouchableHighlight>
        </View>
      });
    } else {
      //un jugador
      this.setState({
        points: this.state.points += 10,
        infoModalOpen: true,
        modalContent: <View>
          <Text style={styles.modalTitle}>Exelente!</Text>
          <Text style={styles.modalSubTitle}>Has ganado 10 puntos</Text>
          <TouchableHighlight onPress={() => { this.setState({ infoModalOpen: false }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
              <Text style={{ textAlign: 'center' }}>Continuar</Text>
            </View>
          </TouchableHighlight>
        </View>
      });
    }
  }

  fallo() {
    if (this.state.twoPlayers) {
      //dos jugadores
      //se le añade una letra a la palabra
      var lost = this.state.turn == 1 ? this.state.lost1 : this.state.lost2;
      lost += 1;
      if (this.state.canRandomize) {
        //si fallo el jugador que propone el reto, solo cambian de turno
        this.setState({
          infoModalOpen: true,
          modalContent: <View>
            <Text style={styles.modalTitle}>Que mal</Text>
            <Text style={styles.modalSubTitle}>Continua el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
            <TouchableHighlight onPress={() => { this.changeTurn(false) }} underlayColor={'rgba(0, 0, 0, 0)'}>
              <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
                <Text style={{ textAlign: 'center' }}>Continuar</Text>
              </View>
            </TouchableHighlight>
          </View>
        })
      } else {
        //si fallo el jugador retado
        if (lost == word.length) {
          //si solo le falta una letra de la palabra se le da un turno de cortesía
          if (this.state.turn == 1) {
            this.setState({ lost1: lost })
          } else {
            this.setState({ lost2: lost })
          }
          this.setState({
            infoModalOpen: true,
            modalContent: <View>
              <Text style={styles.modalWordTitle}>SKAT</Text>
              <Text style={styles.modalTitle}>Ultima Oportunidad</Text>
              <TouchableHighlight onPress={() => { this.setState({ infoModalOpen: false }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
                  <Text style={{ textAlign: 'center' }}>Reintentar</Text>
                </View>
              </TouchableHighlight>
            </View>
          })
        } else if (lost > word.length) {
          //si ya perdio las dos oportunidades pierde
          this.setState({
            infoModalOpen: true,
            modalContent: <View>
              <Text style={styles.modalWordTitle}>SKATE</Text>
              <Text style={styles.modalTitle}>has perdido</Text>
              <Text style={styles.modalWinnerTitile}>gano el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
              <TouchableHighlight onPress={() => { this.resetGame(); }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
                  <Text style={{ textAlign: 'center' }}>Empezar de Nuevo</Text>
                </View>
              </TouchableHighlight>
            </View>
          })
        } else {
          //si todavia le faltan varias letras de la palabra
          if (this.state.turn == 1) {
            this.setState({ lost1: lost })
          } else {
            this.setState({ lost2: lost })
          }
          this.setState({
            infoModalOpen: true,
            modalContent: <View>
              <Text style={styles.modalWordTitle}>{this.getActualWord(lost)}</Text>
              <Text style={styles.modalTitle}>Que mal</Text>
              <Text style={styles.modalSubTitle}>Continua el jugador {this.state.turn == 1 ? "2" : "1"}</Text>
              <TouchableHighlight onPress={() => { this.changeTurn(true) }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
                  <Text style={{ textAlign: 'center' }}>Continuar</Text>
                </View>
              </TouchableHighlight>
            </View>
          })
        }
      }
    } else {
      //un jugador
      this.setState({
        infoModalOpen: true,
        modalContent: <View>
          <Text style={styles.modalWordTitle}>{this.state.points} puntos!</Text>
          <Text style={styles.modalTitle}>Has generado {this.state.points} puntos en esta ronda</Text>
          <TouchableHighlight onPress={() => { this.setState({ infoModalOpen: false }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
            <View style={{ padding: 10, margin: 10, backgroundColor: 'red' }}>
              <Text style={{ textAlign: 'center' }}>Continuar</Text>
            </View>
          </TouchableHighlight>
        </View>
      })
    }
  }

  changeTurn(changeForm) {
    //cambia el turno
    var turn = this.state.turn;
    var reloadForm = this.state.canRandomize;
    if (turn == 1) {
      turn = 2;
    } else {
      turn = 1;
    }
    //si fallo el jugador que hacia el reto, el otro jugador propone el reto ahora
    if (changeForm) {
      reloadForm = !this.state.canRandomize;
    }
    this.setState({
      canRandomize: reloadForm,
      turn: turn
    });
    this.setState({ infoModalOpen: false });
  }

  getActualWord(lost) {
    //obtiene las letras que tiene cada jugador
    return word.slice(0, lost);
  }

  getRandomPosition(max) {
    var random = Math.floor(Math.random() * max);
    return random;
  }

  resetGame() {
    //reinicia el juego
    this.setState({
      playName: "",
      degrees: "",
      direction: "",
      foot: "",
      infoModalOpen: false,
      canRandomize: true,
      turn: 1,
      points: 0,
      lost1: 0,
      lost2: 0,
      modalContent: null
    })
  }

  //settings
  saveSettings() {
    //reinicia el juego
    this.resetGame();
    this.setState({ modalOpen: false })
  }

  render() {
    //frond-end
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SKATE</Text>
          <TouchableHighlight onPress={() => { this.setState({ modalOpen: true }) }} style={styles.settingsIcon}>
            <Image source={require('./src/Resources/settings_black_48.png')} />
          </TouchableHighlight>
        </View>
        <View>
          {this.state.twoPlayers ?
            <Text style={styles.textRow}><Text style={styles.title}>Jugadador {this.state.turn}</Text></Text> :
            <Text style={styles.textRow}><Text style={styles.title}>Puntos {this.state.points}</Text></Text>}
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
              <TouchableHighlight onPress={() => { this.setState({ twoPlayers: !this.state.twoPlayers }) }} underlayColor={'rgba(0, 0, 0, 0)'}>
                <Text style={styles.textRow}><Text style={styles.title}>jugadores: </Text>
                  <Text style={styles.text}>{this.state.twoPlayers ? "2" : "1"}</Text></Text>
              </TouchableHighlight>
              <TouchableHighlight onPress={() => { this.saveSettings() }} underlayColor={'rgba(0, 0, 0, 0)'}>
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

//<Image source={require('https://www.google.com.co/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwjphNzt7__TAhWHWCYKHf6vDN8QjRwIBw&url=https%3A%2F%2Fwww.taringa.net%2FSkatruck&psig=AFQjCNF5YJT56iH4JmZBuwndj5Lvzxn_rw&ust=1495417877233963')} style={styles.backgroundImage} />