var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Book = require('./book');
var Request = require('./request');
var AddBook = React.createClass({
    getInitialState: function(){
        return({
            request: []
        });
    },
    componentWillMount: function(){
        $.get("/getrequest/"+this.props.user.username, function(data){
            console.log(JSON.stringify(data));
            this.setState({
               request: data 
            });
        }.bind(this));
    },
    addBook: function(e){
        e.preventDefault();
        $.post("/addbook/", {
            bookname: this.refs.name.value,
            image: this.refs.image.value,
            username: this.props.user.username
        },function(data){
            this.props.addBook(data);
        }.bind(this));
    },
    render: function(){
        return (
            <section>
            <div className="row">
                <div className="col-xs-12">
                <h3>Request logs</h3>
                {this.state.request.length === 0 ? 'You have no request' : 
                <ul>
                 {this.state.request.reverse().map(function(val, index){
                    return(
                    <Request _id={val._id} username={this.props.user.username} key={index} from={val.from} to={val.to} fromBook={val.fromBook} toBook={val.toBook} status={val.status} /> 
                    );
                 }.bind(this))}
                 </ul>
                }
                </div>
            </div>
            <div className="row">
                <div className="col-md-6">
                <h3>Add a book</h3>
                <form className="form form-group" onSubmit={this.addBook}>
                    <input className="form-group form-control" type="text" ref="name" placeholder="Name of Book" required/>
                    <input className="form-group form-control" type="text" ref="image" placeholder="Image Url of Bookcover" required/>
                    <input className="btn btn-danger" type="submit" value="Add Book" onClick={this.addBook}/>
                </form>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12">
                <h3>Your Books</h3>
                {this.props.user.bookData ? 
                this.props.user.bookData.map(function(val, index){
                    return (
                        <Book key={index} bookname={val.bookname} img={val.image} bookID={val._id}/>
                    );
                })
                : ""}
                </div>
            </div>
            </section>
        );
    }
});

module.exports = AddBook;