import React, { PureComponent } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import Delta from 'quill-delta'
import 'react-quill/dist/quill.snow.css';
import { Layout} from "antd";
import './Editor.css';
import { throws } from 'assert';
const { Content } = Layout;

// const matcherA = (node, delta) => {
//     return delta.compose(new Quill.Delta().retain(delta.length(), { underline: true }));
// }
var config = {
    scrollingContainer:  ".ql-editor",
    modules: {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, false] }],
            // [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'background': [] }],
            [{ 'align': ['right', 'center', 'justify'] }],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['clean']
          ],
          clipboard: {
            matchers: [
                [   '.StyleUnderline', (node, delta) => 
                    delta.compose( new Delta().retain(delta.length(), { underline: true }))
                ],
                [   '.Style13ptBold', (node, delta) => 
                    delta.compose( new Delta().retain(delta.length(), { bold: true }))
                ]
            ]
          }
      },
      formats: [
        'header',
        'font',
        'bold', 'italic', 'underline', 'strike',
        'blockquote', 'code-block',
        'color', 'background',
        'script', 'sub', 'super',
        'align', 'right', 'center', 'justify',
        'list', 'bullet', 'indent',
        'image',
        'formula'
      ],
}
class Editor extends PureComponent {
    constructor (props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (content, delta, source, editor) => {
        this.setState({ text: content })
        this.props.parse(content)
    }
    
    render = () => {
        return (
            <Content style={{ width:"100%" }}>
                <ReactQuill ref={this.props.quill}
                    value={this.state.text}
                    onChange={this.handleChange} 
                    theme="snow"
                    modules={config.modules}
                    formats={config.formats}
                    scrollingContainer={config.scrollingContainer}
                />
            </Content>
        );
    }
}

export default Editor;