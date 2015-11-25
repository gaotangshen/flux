var React = require('react');
var ReactDOM = require('react-dom');
// var App = React.createClass({
// 	render:function(){
// 		return <h1> My Flux App</h1>
// 	}
// });
var App = React.createClass({
	getInitialState: function(){
		return {
			name: 'Tyler McGinnis',
			friends: ['Jake Lingwall', 'Murphy Randall', 'Merrick Christensen'],
		}
	},
	addFriend: function(friend){
		this.setState({
			friends: this.state.friends.concat([friend])
		});
	},
	render: function(){
		return (
			<div>
			<h3> Name: {this.state.name} </h3>
			<AddFriend addNew={this.addFriend} />
			<ShowList names={this.state.friends} />
			</div>
			)
	}
});
var AddFriend = React.createClass({
	propTypes: {
		addNew: React.PropTypes.func.isRequired
	},
	getInitialState: function(){
		return {
			newFriend: ''
		}
	},
	updateNewFriend: function(e){
		this.setState({
			newFriend: e.target.value
		});
	},
	handleAddNew: function(){
		this.props.addNew(this.state.newFriend);
		this.setState({
			newFriend: ''
		});
	},
	render: function(){
		return (
			<div>
			<input type="text" value={this.state.newFriend} onChange={this.updateNewFriend} />
			<button onClick={this.handleAddNew}> Add Friend </button>
			</div>
			);
	}
});

var ShowList = React.createClass({
	getDefaultProps: function(){
		return {
			names: []
		}
	},
	render: function(){
		var listItems = this.props.names.map(function(friend){
			return <li> {friend} </li>;
		});
		return (
			<div>
			<h3> Friends </h3>
			<ul>
			{listItems}
			</ul>
			</div>
			)
	}
});
// var App = React.createClass({
//   getInitialState: function(){
//     alert('In getInitialState');
//     return {
//       name: 'Tyler McGinnis'
//     }
//   },

//   // Invoked once before first render
//   componentWillMount: function(){
//       // Calling setState here does not cause a re-render
//       alert('In Component Will Mount');
//   },


//   // Invoked once after the first render
//   componentDidMount: function(){
//       // You now have access to this.getDOMNode()
//       alert('In Component Did Mount');
//   },

//   // Invoked whenever there is a prop change
//   // Called BEFORE render
//   componentWillReceiveProps: function(nextProps){
//       // Not called for the initial render
//       // Previous props can be accessed by this.props
//       // Calling setState here does not trigger an additional re-render
//       alert('In Component Will Receive Props');
//   },

//   // Called IMMEDIATELY before a component is unmounted
//   componentWillUnmount: function(){},


//   render: function(){
//     return (
//       <div>
//         Hello, {this.state.name}
//       </div>
//     )
//   }
// });
// ReactDOM.render(<App />, document.getElementById('main'));
module.exports = App;