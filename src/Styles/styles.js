import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F5FCFF',
    alignItems: 'center', 
  },
  header: {
    flexDirection: 'row', 
    alignSelf: 'stretch', 
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    backgroundColor: 'red'
  },
  headerTitle: {
    fontSize: 30, 
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    fontSize: 20
  },
  textRow: {
    padding: 16
  },
  loadingModalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20
  },
  loadingModalContent: {
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    alignItems: 'center', 
    alignSelf: 'stretch', 
    justifyContent: 'center',
  },
  settingsIcon: {
    justifyContent: 'flex-end'
  },
  modalTitle: {
    fontSize: 20
  },
  modalSubTitle: {
    fontSize: 15
  },
  modalWordTitle: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

module.exports = styles;
