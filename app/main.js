import React from 'react';
import {render} from 'react-dom';
import Greeter from './Greeter';
import './main.less';//使用require导入css文件
let data = 123;
render(<Greeter name="small kugua" />, document.getElementById('root'));
