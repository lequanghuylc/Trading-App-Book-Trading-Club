var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Header = require('./header');
var Profile = require('./profile');
var AllBooks = require('./allbooks');
var SingleBook = require('./singlebook');
var AddBook = require('./addbook');


var BookClub = React.createClass({
    getInitialState: function(){
        return({
            userData: {},
            loggedIn: false,
            webPage: 'loading',
            singleBookID: false
        });
    },
    componentWillMount: function(){
        $.get( "/checklogin", function( data ) {
          if(data !== "false"){
              this.changeLogInStatus(data);
          } else {
              this.setState({loggedIn: false});
          }
        }.bind(this));
        switch(window.location.pathname){
            case "/": setTimeout(function() {this.webPage('all books');}.bind(this), 500); break;
            case "/singlebook/":setTimeout(function() {this.webPage('single book');}.bind(this), 500); 
                this.setState({singleBookID: this.getQueryVariable('b')});  break;
            default:  setTimeout(function() {this.webPage('all books');}.bind(this), 500); break;   
        }
        
    },
    webPage: function(val){
        this.setState({
            webPage: val
        });
        switch(val){
            case 'profile':
                $.get("/getuserdata/"+this.state.userData.username, function(data){
                    if(this.state.userData.bookData){
                        data.bookData = this.state.userData.bookData;
                    }
                    this.setState({userData: data});
                }.bind(this));
                break;
            case 'all books':
                break;
            case 'add book':
                break;
        }
    },
    changeLogInStatus: function(val){
        var boo = this.state.loggedIn;
        var data = new Object();
        data.username = val;
        this.setState({
            loggedIn: !boo,
            userData: boo === false ? data : {}
        });
        $.get("/getuserbook/"+val, function(data){
                    var userData = this.state.userData;
                    userData.bookData = data;
                    this.setState({userData: userData});
                }.bind(this));
    },
    getBookDataAfterLogin: function(){
        $.get("/getuserbook/"+this.state.userData.username, function(data){
                    var userData = this.state.userData;
                    userData.bookData = data;
                    this.setState({userData: userData});
                }.bind(this));  
    },
    logout: function(){
        this.setState({
            loggedIn: false,
            userData: {}
        });
        //clear all cookie
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        
    },
    cookie: function(id, username){
        //clear all cookie
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
        //set new cookie
        document.cookie = "user=" + username + ";";
        document.cookie = "au=" + id + ";" ;
    },
    updateUser: function(val){
        val.username = this.state.userData.username;
        this.setState({
            userData: val
        })  ;
    },
    addBook: function(data){
        var userData = this.state.userData;
        if(userData.bookData === undefined){
           userData.bookData = [];
           userData.bookData.push(data);
        } else {
           userData.bookData.push(data);
        }
        this.setState({
           userData: userData
        });
    },
    getQueryVariable: function(variable){
        var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
        return false;
    },
    render: function(){
        switch(this.state.webPage){
            case 'all books': var generateWebpage = <AllBooks />;
                break;
            case 'profile': var generateWebpage = <Profile changePage={this.webPage} cookie={this.cookie} action={this.webPage}
                loggedIn={this.state.loggedIn} changeStatus={this.changeLogInStatus} user={this.state.userData}
                username={this.state.userData.username === undefined ? "" : this.state.userData.username} updateUser={this.updateUser} />;
                break;
            case 'single book': var generateWebpage = <SingleBook bookID={this.state.singleBookID} loggedIn={this.state.loggedIn} 
                user={this.state.userData} 
                username={this.state.userData.username === undefined ? "" : this.state.userData.username} updateUser={this.updateUser} />;
                break;
            case 'add book': var generateWebpage = <AddBook user={this.state.userData} addBook={this.addBook}/>;
                break;
            case 'loading': var generateWebpage = <p>loading...</p>;
                break;
        }
        return(
            <div>
            <Header loggedIn={this.state.loggedIn} username={this.state.userData.username === undefined ? "" : this.state.userData.username} 
                action={this.webPage} changeStatus={this.changeLogInStatus} logout={this.logout} cookie={this.cookie}/>
            <main>
                {generateWebpage}
            </main>
            </div>
        );
    }
});



ReactDOM.render(<BookClub />, document.querySelector(".container"));