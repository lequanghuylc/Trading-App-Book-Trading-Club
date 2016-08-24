var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Book = require('./book');
var SingleBook = React.createClass({
    getInitialState: function(){
        return({
            showButton: false
        });
    },
    componentWillMount: function(){
        if(this.props.bookID){
            $.get("/getsinglebook/"+this.props.bookID, function(data){
                this.setState({
                        bookData: data
                    });
            }.bind(this)); 
        }
    },
    handleClick: function(){switch(true){
            case (this.props.user.username === this.state.bookData.username):
               alert("You can't trade book with yourself"); break;
            case (typeof this.props.user.bookData == "undefined"):
                alert("Data's still loading... Comeback couple seconds later"); break;
            case (this.props.user.bookData.length === 0): 
                alert("You don't have any book to trade");break;
            case (typeof this.state.bookData.request == "string" &&  JSON.parse(this.state.bookData.request).indexOf(this.props.user.username) >-1):
                alert("You already sent request");break;
            default: this.setState({showButton: true}); break;
        }
    },
    sendRequest: function(val){
        $.post("/sendrequest", {
            from: this.props.user.username,
            to: this.state.bookData.username,
            fromBook: val,
            toBook: this.props.bookID,
            status: "waiting"
        },function(data){
            alert("request sent");
            this.setState({showButton: false});
            location.reload();
        }.bind(this));  
    },
    render: function(){
        return (
            <section>
            {this.state.bookData ?
            <div className="row">
                <Book bookname={this.state.bookData.bookname} img={this.state.bookData.image} bookID={this.state.bookData._id} />
                <div className="col-md-8 book">
                    <h2 className="text-danger">{this.state.bookData.bookname}</h2>
                    <p>This book belongs to <span className="h3 text-primary">{this.state.bookData.username}</span></p>
                    <h4>Here's this user's Address</h4> 
                    <p><b>Email: </b>{this.state.bookData.email}</p>
                    <p><b>Address: </b>{this.state.bookData.address}</p>
                    <p><b>City: </b>{this.state.bookData.city}</p>
                    <p><b>State & Country: </b>{this.state.bookData.state}</p>
                    <button className="btn btn-danger" onClick={this.handleClick} disabled={!this.props.loggedIn}
                    style={{"display": this.state.showButton ? "none" : "block" }} >Send trade request</button>
                    <div style={{"display": this.state.showButton ? "block" : "none" }}>
                    <h4>Click one of your books to trade</h4>
                    {typeof this.props.user.bookData == "undefined" ? "loading":
                    <div>
                    {this.props.user.bookData.map(function(val, index){
                    return (
                        <button key={index} onClick={this.sendRequest.bind(this, val._id)} className="btn btn-primary">{val.bookname}</button>
                    );
                    }.bind(this))}
                    </div>
                    }
                    </div>
                </div>
            </div>
            : "Loading..."}
            </section>
        );
    }
});

module.exports = SingleBook;