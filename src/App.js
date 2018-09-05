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
    var prev = {};
    $("h1, h2, h3, h4, h5, h6").each( (i, elem) => {
        const level = $(elem)[0].tagName.match(/\d/g)[0];
        var parent = 0
        if (prev.level){
          if(level > prev.level){
              parent = prev.id
          }else if (level == prev.level){
              parent = prev.parent_id
          }else{
            map[prev.parent_id].id
          }
        } 
        map.push(
          prev = { text:$(elem).text(), 
            level: level,
            id:i+1,
            parent_id: parent
          }
        )
        //prev = ;
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
