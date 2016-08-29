import React, {Component} from 'react';
import {render} from 'react-dom';
import List from './componets/list';
import Search from './componets/searchBtn';
import './main.less';//使用require导入css文件

class Main extends Component {
    constructor (pro){
        super(pro);
        var self = this;
        this.state = {
            show : false
        }
        this.onHungry = (result) => {
            if(result.status){
                let list = result.result.page.list;
                if(list.length){
                    //this.state.list = list;
                    this.setState({
                        show:true,
                        list:list
                    });
                }
            }else{
                alert(result.message);
            }
        }
    }
    render (){
        let title = <Search onHungry = {this.onHungry}/>,
            list =  this.state.show ?  <List  list = { this.state.list}/> : '';
        return (
            <div>
                {title}
                {list}
            </div>
        )
    }
}

render(<Main /> , document.getElementById('root'));
