import React from 'react';
import { StyleSheet,Text, Image, View,SafeAreaView, FlatList, ActivityIndicator} from 'react-native';
import { Header, Icon } from 'react-native-elements'
import { BarIndicator } from 'react-native-indicators'
import NewsCard from './components/Card'
import HeaderSection from './components/Header'

export default class App extends React.Component {
 
    constructor(props){
        super(props);
        this.state = {
          isLoading: true,
          data: [],
          searchQuery: "",
          isRefreshing: false,
        }

        this.fetchNews = this.fetchNews.bind(this)
        this.setId = this.setId.bind(this)
        this.getSearchQuery = this.getSearchQuery.bind(this)
        this._refresh = this._refresh.bind(this)
    }

    componentDidMount() {
      console.log("Fetching news....")
      this.fetchNews()
      console.log('Fetching complete....')
    }

    fetchNews(query = "") {
      console.log("******************** Fetch Query: " + query + " ********************")
      var squery = 'q=' + query + '&'
      var head = 'https://newsapi.org/v2/top-headlines?'
      var end = 'country=in&' +
          'sortBy=popularity&' +
          'pageSize=10&' +
          'apiKey=6b1818eddeaa4b7ba7a5a4105b6ea3d5';

      
      var url = query === "" ? (head+end) : (head+squery+end)
      var req = new Request(url)

      fetch(req)
        .then(res => res.json())
        .then(json => {
            
            this.setState({
              isLoading: false,
              isRefreshing: false,
              searchQuery: query,
              data: this.setId(json.articles)
            })
            
            console.log(json.articles[0])
        })
        .catch(error => {
          console.log(error)
        })
    }

    setId(arr) {
      const obj = []
      for (let index = 0; index < arr.length; index++) {
        obj[index] = { ...arr[index], id: index }
      }
      return obj
    }

    getSearchQuery(text) {
      console.log("******************** Search Query: " + text + " ********************")
      this.setState({ searchQuery: text, isLoading: true })
      this.fetchNews()
    }

    _refresh(query) {
      this.setState({ isRefreshing: true, isLoading: true})
      this.fetchNews(query)
    }

    render() {

      return (
        <SafeAreaView style={styles.container}>
          <HeaderSection  getSearchText={this.fetchNews} />
          <View style={{ flex: 1, flexDirection: 'row' , alignItems: 'center', justifyContent: 'center' }}>
              { this.state.isLoading ? 
                <BarIndicator size={50} color='#F97F51' count={5} /> :
                <FlatList
                  data={this.state.data}
                  renderItem={({ item }) => (
                    <NewsCard  article={item} />
                  )}
                  contentContainerStyle={{ paddingBottom: 20 }}
                  keyExtractor={(item) => item.id.toString()}
                  onRefresh={() => this._refresh(this.state.searchQuery)}
                  refreshing={this.state.isRefreshing}
              />
              }
          </View>
        </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#2C3A47',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

// #34495e