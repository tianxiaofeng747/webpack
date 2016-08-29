/**
 * Created by test on 16/8/26.
 */
import React, {Component} from 'react';
import $ from 'jquery';
import './index.less';
import api from '../config/apiConfig';
class Search extends Component {
    constructor (props){
        super(props);
        this.state = {
            asnOrderId:'0001'
        };
        this.searchData = () =>{
            var asnId =  this.refs.asnOrderId.value;
            $.get(api.getList,{
                asnId: asnId
            }).then((result) => {
                this.props.onHungry(result);
            });

            //this.state.asnOrderId = asnId;

        }
    }
    render (){
        return (
        <div className="search-area">
            <form action="" className="J_SearchForm">
                <label className="input-label">到货通知单</label>

                <div className="fn-inline form-item">
                    <input className="hui-input" placeholder="请输入到货通知单单号"  name="asnOrderId" type="text" ref="asnOrderId" />
                </div>
                <a className="btn btn-new J_SearchBtn" onClick={ this.searchData }>搜索</a>

            </form>
        </div>
        )
    }
}
export default Search ;