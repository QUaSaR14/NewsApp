import React from 'react';
import { StyleSheet,Text, Image, View,SafeAreaView, FlatList, TouchableOpacity, Picker} from 'react-native';
import { Icon, Header, SearchBar } from 'react-native-elements';


export default class HeaderSection extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            toggleSearchBar: false,
            search: "",
        } 

        this.showSearchBar = this.showSearchBar.bind(this)
        this.searchHandler = this.searchHandler.bind(this)
    }

    showSearchBar = () => {
        this.setState({ toggleSearchBar: !this.state.toggleSearchBar })        
    }

    searchHandler = (event) => {
        this.setState({ search: event.nativeEvent.text , toggleSearchBar: !this.state.toggleSearchBar})
        console.log("******************** User Input" +this.state.search + " ********************" )
        this.props.getSearchText(event.nativeEvent.text)
    }

    render() {


        return(
            <React.Fragment >
                <Header
                    containerStyle={{ backgroundColor: '#d63031' }}
                    leftComponent={{ icon: 'menu', color: '#f6e58d' }}
                    centerComponent={{ text: 'SAMACHAR', style: { color: '#f5f6fa', fontSize: 24, fontWeight: 'bold' } }}
                    rightComponent={ 
                        <TouchableOpacity  onPress={this.showSearchBar}>
                            <Icon name='search' iconStyle={{ paddingRight: 10 }} color="#f6e58d"  />
                        </TouchableOpacity>
                    }
                />
                { 
                    this.state.toggleSearchBar ? (
                        <SearchBar 
                            platform='default'
                            autoFocus
                            autoCorrect
                            placeholder='Search Hot Topics....'
                            containerStyle={styles.searchStyle}
                            inputContainerStyle={styles.input}
                            cancelIcon={null}
                            showLoading={true}
                            returnKeyType='search'
                            onChangeText={(search) => this.setState({ search })}
                            value={this.state.search}
                            onSubmitEditing={this.searchHandler}
                        />
                    ) : null
                }  
                
            </React.Fragment>
        )
    }   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    searchStyle: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        backgroundColor: '#2f3640',    
    },
    input: {

        borderRadius: 30,
        borderLeftWidth: 2,
        borderRightWidth: 0.5,
        borderBottomWidth: 2.5,
        borderTopWidth: 0.8,

    }
})
