import React, { Component } from 'react';
import BackgroundImage from './../../components/BackgroundImage';
import Preloader from './../../components/Preloader';
import { StyleSheet, FlatList } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
import * as firebase from 'firebase';
import { NavigationActions } from 'react-navigation';
import RestaurantEmpty from './../../components/restaurant/RestaurantEmpty';
import RestaurantAddButton from './../../components/restaurant/RestaurantAddButton';

export default class Restaurants extends Component {

    constructor() {
      super();
      this.state = {
        restaurants: [],
        loaded: false,
        logo: require('../../../assets/images/restaurant.png'),
        search: '',
      };
      this.refRestaurants = firebase.database().ref().child('restaurants');
    }

    componentDidMount(){
      const { search } = this.state;

      if( ! search ) {
        this.refRestaurants = firebase.database().ref().child('restaurants');   
      } else {
        this._filterRestaurants( search )
      }

      
      this._loadFirebaseRestaurants();
    }

    _loadFirebaseRestaurants () {
      this.refRestaurants.on('value', snapshot => {
        let restaurants = [];
        snapshot.forEach(row => {
          restaurants.push({
            id: row.key,
            name: row.val().name,
            address: row.val().address,
            capacity: row.val().capacity,
            description: row.val().description,
          })
        });
        this.setState({
          restaurants,
          loaded: true,
        });
      })
    }

    addRestaurant () {
      const navigateAction = NavigationActions.navigate({
        routeName: 'AddRestaurant',
      });
      this.props.navigation.dispatch( navigateAction );
    }

    restaurantDetail ( restaurant ) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'DetailRestaurant',
        params: { restaurant } //{restaurant:restaurant}
        
      });
      this.props.navigation.dispatch( navigateAction );
    }

    searchRestaurants( search ) {
      this.setState({
        search: search.charAt(0).toUpperCase() + search.slice(1)
      });

      if( search.length >= 3 ) {
        this._filterRestaurants( search );
        setTimeout( () =>  {
          this._loadFirebaseRestaurants();
        },200);
      }

      if( search.length == 0 ) {
        this.resetSearch();
      }
    }

    resetSearch () {
      this.setState({
        search: '',
      });
      this.refRestaurants = firebase.database().ref().child('restaurants');
      setTimeout( () =>  {
          this._loadFirebaseRestaurants();
        },200);
    }

    _filterRestaurants( search ) {
      this.refRestaurants = firebase.database().ref().child('restaurants')
        .orderByChild('name')
        .startAt( search )
        .endAt( `${search}\uf8ff` );
    }

    renderRestaurant ( restaurant ) {
      return(
        <ListItem
          containerStyle = { styles.item }
          titleStyle = { styles.title }
          title = { `${restaurant.name} (capacidad: ${restaurant.capacity})` }
          leftAvatar = {{ source: this.state.logo }} 
          onPress = { () => this.restaurantDetail( restaurant ) }
          rightIcon = {{ name: 'arrow-right', type: 'font-awesome', style: styles.listIconStyle }}
        />
      )
    }

    render () {
      const { loaded, restaurants } = this.state;
      if ( !loaded ){
        return ( <Preloader /> )
      }

      const searchBar = (
        <SearchBar
            platform = 'android'
            showLoading
            cancelIcon = {{ type: 'font-awesome', name: 'chevron-left' }}
            placeholder = 'Buscar restaurante'
            onChangeText = {( text ) => this.searchRestaurants( text ) }
            onClear = { this.resetSearch.bind( this ) }
            value = { this.state.search }
            />
      );

      if ( !restaurants.length ){
        return (
          <BackgroundImage source = { require('./../../../assets/images/bg5.jpg') }>
            
            { searchBar }
            <RestaurantEmpty text = 'No hay restaurantes disponibles' />
            <RestaurantAddButton addRestaurant = { this.addRestaurant.bind( this ) } />
          </BackgroundImage>
        )
      }

      return (
        <BackgroundImage source = { require('./../../../assets/images/bg5.jpg') }>
          
          { searchBar }
          <FlatList
            data = { restaurants }
            renderItem = { ( data ) => this.renderRestaurant( data.item ) } 
            keyExtractor = {( data ) => data.id }
          /> 

          <RestaurantAddButton
           addRestaurant = { this.addRestaurant.bind( this ) } />
        </BackgroundImage>
      )

    }
}

const styles = StyleSheet.create({
  title: {
    color: '#fff',
  },
  listIconStyle: {
    marginRight: 10,
    fontSize: 15,
    color: 'rgba(255, 38, 74, 0.6)',
  },
  item: {
    padding: 10,
    backgroundColor: 'rgba(206, 206, 206, 0.6)',
  }
});
