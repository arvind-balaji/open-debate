import React, { Component } from "react";
import { Layout, Menu, Tree } from "antd";
import { arrayToTree } from 'performant-array-to-tree'
import "./Sidebar.css";
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const TreeNode = Tree.TreeNode;

// const { SubMenu, MenuItemGroup } = Menu;
const { Sider } = Layout;

class Sidebar extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.tags.length != nextProps.tags.length)
  //     return true;
  //   for (var i = 0; i < this.props.tags.length; i++) {
  //     if(this.props.tags[i] != nextProps.tags[i]){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  state = {
    expandedKeys: ['0-0-0', '0-0-1'],
    autoExpandParent: true,
    checkedKeys: ['0-0-0'],
    selectedKeys: [],
  }
  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }



  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    document.querySelectorAll("h1, h2, h3, h4, h5, h6")[info.node.props.dataRef.id-1].scrollIntoView()
    this.setState({ selectedKeys });
  }
  renderTreeNodes = (data) => {
    return data.map((item) => {
      if (item.children) {
        return (
          <TreeNode         onClick={()=> this.handleClick({'e':item.key})}
           title={item.text} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode {...item} />;
    });
  }
  listToTree = list => {
    var map = {}, node, roots = [], i;
    for (i = 0; i < list.length; i += 1) {
        map[list[i].id] = i; // initialize the map
        list[i].children = []; // initialize the children
    }
    for (i = 0; i < list.length; i += 1) {
        node = list[i];
        if (node.parent_id != "0") {
            // if you have dangling branches check that map[node.parentId] exists
            list[map[node.parent_id]].children.push(node);
        } else {
            roots.push(node);
        }
    }
    return roots;
}

  renderData = data => {
    var out = []
    var index = 0;
    var recurse =  function myself (i) {
      if (data[i+1].level > data[i].level){
        myself(i+1);
      }else{
        out.push(data[i]);
        return;
      }
    }
    recurse(0);
    return out;
  }
  render() {
    const data = this.listToTree(this.props.tags, { id: 'id', parentId: 'parent_id' });
    return (
      <div className="sidebar" style={{ padding: "0", background: "#fff" }}>
        <Sider style={{ background: "#fff" }}>
        <Tree
        defaultExpandAll
        defaultSelectedKeys={['0-0-0']}
        onSelect={this.onSelect}
        selectedKeys={this.state.selectedKeys}
      >
        {this.renderTreeNodes(data)}
        {/* {this.renderData(foo)} */}
      </Tree>
          {/* <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
          >
          
            {this.props.tags.map((item, index) => (
              // <Tooltip placement="right" title={item.text}>
              <Menu.Item
                className="sidebar-item"
                style={{ paddingLeft: "10px" }}
                title={item.text}
                key={index}
                onClick= {this.handleClick}
              >
                  {item.text}
              </Menu.Item>
            ))}
          </Menu>
           */}

        </Sider>
      </div>
    );
  }
}

export default Sidebar;
