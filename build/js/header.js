var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');

var Header = React.createClass({
    getInitialState: function(){
        return({
            loginMessage: ''
        });
    },
    componentWillMount: function(){
          
    },
    formChange: function(){
      this.setState({
            username: this.refs.username.value,
            password: this.refs.password.value
      });  
    },
    handleForm: function(e){
        e.preventDefault();
        $.post("/login", {
            username: this.state.username,
            password: this.state.password
        }, function(data){
            if(data.message === "success"){
                this.props.changeStatus(this.state.username);
                this.props.cookie(data.cookie, this.state.username);
            } else {
               this.setState({loginMessage: data.message});
            }
        }.bind(this));
    },
    webPage: function(val){
        this.props.action(val);
    },
    register: function(e){
        e.preventDefault();
        this.props.action('profile');
    },
    render: function(){
        return (
            <header>
            <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="/">Book Trading Club</a>
            </div>
            <div className="collapse navbar-collapse" id="collapse">
                <ul className="nav navbar-nav navbar-right">
                    {this.props.loggedIn === false ? "" :
                        [<li key="-1"><a href="/">Home</a></li>,
                        <li key="0"><a onClick={this.webPage.bind(this, 'profile')}>Welcome {this.props.username}</a></li>,
                        <li key="1"><a onClick={this.webPage.bind(this, 'profile')}>My Profile</a></li>,
                        <li key="2"><a onClick={this.webPage.bind(this, 'add book')}>My Books</a></li>,
                        <li key="4"><a onClick={this.webPage.bind(this, 'all books')}>All Books</a></li>,
                        <li key="3"><a onClick={this.props.logout}>Logout</a></li>
                        ]
                    }
                </ul>
                {this.props.loggedIn === true ? "" :
                    <form className="navbar-form navbar-right form-inline" role="search" onSubmit={this.handleForm} 
                    style={{display: this.props.showLoginForm === true ? "inline-block" : "none"}}>
                      <div className="form-group">
                        <span className="login-notify">{this.state.loginMessage}</span>
                        <input type="text" className="form-control" placeholder="Username" ref="username" onChange={this.formChange}/>
                        <input type="password" className="form-control" placeholder="Password" ref="password" onChange={this.formChange}/>
                      </div>
                      <button type="submit" className="btn btn-primary">Login</button>
                      <button type="submit" className="btn btn-danger" onClick={this.register}>Register</button>
                    </form>
                }
            </div>
            </nav>
            </header>
        );
    }
});

module.exports = Header;