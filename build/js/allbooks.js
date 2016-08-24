var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');
var Book = require('./book');
var AllBooks = React.createClass({
    getInitialState: function(){
        return({
            books : ''
        });
    },
    componentWillMount: function(){
        $.get("/getallbook", function(data){
            this.setState({
                books: data
            })
        }.bind(this));
    },
    getBookData: function(){
          
    },
    render: function(){
        return (
            <section>
                { typeof this.state.books === "string" ? '' :
                    <div className="row">
                        {
                        this.state.books.map(function(val, index){
                           return (
                            <Book key={index} bookname={val.bookname} img={val.image} bookID={val._id}/> 
                           ); 
                        })
                        }
                    </div>
                }
            </section>
        );
    }
});

module.exports = AllBooks;