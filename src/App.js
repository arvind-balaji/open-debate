import React, { Component } from 'react';
import { Layout} from 'antd';
import Editor from './Editor';
import Sidebar from './Sidebar';
import cheerio from 'cheerio'
import './App.css';
const compare = require("react-fast-compare");
const { Header, Content, Footer, Sider } = Layout;


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map:[]
    }
    this.quill = React.createRef();

  }
  parse = html => {
    var shouldUpdate = false;
    var map = []
    var $ = cheerio.load(html);
    $("h1, h2, h3, h4, h5, h6").each( (i, elem) => {
        map.push({text:$(elem).text(), level:$(elem)[0].tagName.match(/\d/g)[0]})
    })
    if(!compare(map, this.state.map)){
      this.setState({ map:map }) 
    }
  }  
  render() {
    return (
      <Layout>
        <Sidebar tags={this.state.map}/>
        <Editor quill={this.quill} parse={this.parse}/>
      </Layout>  
    );
  }
}

export default App;
