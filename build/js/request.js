var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');

var Request = React.createClass({
    accept: function(){
        $.post('/processrequest',{
            action: "accepted",
            from: this.props.from,
            to: this.props.to,
            fromBook: this.props.fromBook,
            toBook: this.props.toBook,
            _id: this.props._id
        }, function(data){
            alert(data.message);
            location.reload();
        });
    },
    refuse: function(){
        $.post('/processrequest',{
            action: "refused",
            from: this.props.from,
            to: this.props.to,
            fromBook: this.props.fromBook,
            toBook: this.props.toBook,
            _id: this.props._id
        }, function(data){
            alert(data.message);
            location.reload();
        });
    },
    render: function(){
        return (
            <li className="request" style={this.props.status === "waiting" ? {} : {textDecoration: "line-through"}}>
            {this.props.from === this.props.username ? "You" : this.props.from} sent {this.props.to === this.props.username ? "You" : this.props.to} a trade request,  &nbsp;
            <a href={"https://tradingbook-quanghuyf.c9users.io/singlebook/?b="+this.props.fromBook} target="_blank">this book</a> &nbsp;
             for <a href={"https://tradingbook-quanghuyf.c9users.io/singlebook/?b="+this.props.toBook} target="_blank">this book</a>.
             &nbsp; <b>Request status: {this.props.status}</b>
             &nbsp; {this.props.to === this.props.username && this.props.status === "waiting" ?
             <span><button onClick={this.accept} className="btn btn-info">Accept</button>&nbsp;<button onClick={this.refuse} className="btn btn-danger">Refuse</button></span>
             : ''}
             &nbsp; {this.props.status === "accepted" ?
             <a href={this.props.from === this.props.username ? "https://tradingbook-quanghuyf.c9users.io/singlebook/?b="+this.props.fromBook :
               "https://tradingbook-quanghuyf.c9users.io/singlebook/?b="+this.props.toBook 
             } target="_blank"><button className="btn btn-info">Get contact Email</button></a>
             : ''}
            </li>
        );
    }
});

module.exports = Request;