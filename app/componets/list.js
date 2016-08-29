/**
 * Created by test on 16/8/26.
 */
import React, {Component} from 'react';
//import $ from '../../node_modules/jquery/dist/jquery.min.js';
import './index.less';
class List extends Component {
    constructor (props){
        super(props);
        this.componentDidMount = () =>{
            console.log("3");
        }

    }
    render (){
        return (
            <div className="search-list J_RenderList">
                <table className="hui-table">
                    <thead>
                    <tr>
                        <th><input type="checkbox" className="J_SelectAll" />全选</th>
                        <th>序号</th>
                        <th><span className="J_sort desc selected" rel="osn_oid" data-sort="desc">到货通知单号<i></i></span></th>
                        <th>关联采购单号</th>
                        <th><span className="J_sort" rel="purchase_type">采购类型<i></i></span></th>
                        <th>供应商编码</th>
                        <th>供应商名称</th>
                        <th><span className="J_sort" rel="status">状态<i></i></span></th>
                        <th><span className="J_sort" rel="expected_delivery_time">预计到货时间<i></i></span></th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {

                            this.props.list && this.props.list.map(function (item) {

                                return (
                                    <tr key= {item.id} >
                                        <td><input data-status="wait_instock" className="only-select" type="checkbox"/></td>
                                        <td>1</td>
                                        <td> { item.asnOid  } </td>
                                        <td>{item.purchaseTid}</td>
                                        <td>普通采购</td>
                                        <td>1510136824</td>
                                        <td>供应商小数点001</td>
                                        <td>待入库</td>
                                        <td>2016-08-31 00:00:00</td>
                                        <td><a href="/wms/asn/order/asnDetail.html?asnOid=ASN201608020000393623" className="link">进入详情</a></td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
            </div>
        )
    }
}
export default List ;