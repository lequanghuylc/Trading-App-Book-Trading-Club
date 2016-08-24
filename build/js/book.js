var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');

var Book = React.createClass({
    render: function(){
        return(
            <div className="col-md-4 book text-center">
                <a href={"/singlebook/?b=" + this.props.bookID}>
                <div><img src={this.props.img} /></div>
                <h5>{this.props.bookname}</h5>
                </a>
            </div>    
        );
    }
});

module.exports = Book;