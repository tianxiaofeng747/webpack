import React, {Component} from 'react';
import $ from '../node_modules/jquery/dist/jquery.min.js';
import './Greeter.less';

class Greeter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            username: '',
            lastGistUrl: ''
        };
        this.handleChange = (event) => {

            this.setState({
                tValue: event.target.value
            })
        };
        this.componentWillMount = () =>{
            //console.log("1")
        }
        this.componentDidMount = () => {
            var api = '/api/user.json';
            $.get(api, (result) => {
                var lastGist = result.result;
                this.setState({
                    username: lastGist.userName,
                    lastGistUrl: lastGist.src
                });
            });
        }
    }

    render () {
        return (
            <div>
                {this.state.username}'s last gist is
                <a href={this.state.lastGistUrl}>here</a>.
            </div>
        )

    }
}

// Greeter.propTypes =  {
//     title: React.PropTypes.string.isRequired,
// };
Greeter.defaultProps = {
    title: 'hello world'
};

export default Greeter
