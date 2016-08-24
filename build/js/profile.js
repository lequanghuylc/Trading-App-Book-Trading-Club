var React = require('react');
var $ = require('jquery');
var ReactDOM = require('react-dom');

var Profile = React.createClass({
    getInitialState: function(){
        return({
            registerMessage: '',
            updateAddress: ''
        });
    },
    componentWillMount: function(){
        
    },
    register: function(e){
        e.preventDefault();
        $.post('/register', {
            username: this.refs.name.value,
            email: this.refs.email.value,
            password: this.refs.password.value,
            address: this.refs.address.value,
            city: this.refs.city.value,
            state: this.refs.state.value
        }, function(data){
            if(data.message === "duplicate"){
                this.setState({registerMessage: 'Username has already been chosen'});
            } else if(data.message === "success") {
                this.props.cookie(data._id, this.refs.name.value);
                this.props.changeStatus(this.refs.name.value);
            }
        }.bind(this));
    },
    update:function(e){
        e.preventDefault();
        var updateData = {
            email: this.state.updateEmail,
            password: this.state.updatePassword,
            address: this.state.updateAddress,
            city: this.state.updateCity,
            state: this.state.updateState
        };
        $.post("/updateuserdata/"+this.props.username, updateData, function(data){
            alert("Update success");
            this.props.updateUser(updateData);
        }.bind(this));
    },
    updateOnChange: function(){
        this.setState({
            updateEmail: this.refs.updateEmail.value,
            updatePassword: this.refs.updatePassword.value,
            updateAddress: this.refs.updateAddress.value,
            updateCity: this.refs.updateCity.value,
            updateState: this.refs.updateState.value 
        });
    },
    webPage: function(val){
        this.props.action(val);
    },
    render: function(){
        return (
            <div className="row">
                <div className="col-md-6">
                {this.props.loggedIn === false ? 
                <div>
                <h3>Register to be a member of a Club</h3>
                <h5 className="login-notify">{this.state.registerMessage}</h5>
                <form className="form form-group" onSubmit={this.register}>
                    <input className="form-group form-control" type="text" ref="name" placeholder="Username" required/>
                    <input className="form-group form-control" type="email" ref="email" placeholder="Email" required/>
                    <input className="form-group form-control" type="password" ref="password" placeholder="Password" required/>
                    <input className="form-group form-control" type="text" ref="address" placeholder="Address" required/>
                    <input className="form-group form-control" type="text" ref="city"  placeholder="City" required/>
                    <input className="form-group form-control" type="text" ref="state"  placeholder="State & Country" required/>
                    <input className="btn btn-danger" type="submit" value="Register" onClick={this.register}/>
                </form>
                </div>
                :
                <div>
                <h3>Update your profile</h3>
                <form className="form form-group" onSubmit={this.update}>
                    <input className="form-group form-control" type="text" value={this.props.username} readOnly/>
                    <input className="form-group form-control" type="email" ref="updateEmail" placeholder="Email" placeholder={this.props.user.email} required onChange={this.updateOnChange}/>
                    <input className="form-group form-control" type="password" ref="updatePassword" placeholder="Password" required onChange={this.updateOnChange}/>
                    <input className="form-group form-control" type="text" ref="updateAddress" placeholder="Address" placeholder={this.props.user.address} required onChange={this.updateOnChange}/>
                    <input className="form-group form-control" type="text" ref="updateCity"  placeholder="City" placeholder={this.props.user.city} required onChange={this.updateOnChange}/>
                    <input className="form-group form-control" type="text" ref="updateState"  placeholder="State & Country" placeholder={this.props.user.state} required onChange={this.updateOnChange}/>
                    <input className="btn btn-danger" type="submit" value="Update" onClick={this.update} disabled={
                        this.state.updateEmail === '' || this.state.updatePassword === '' || this.state.updateCity === '' || this.state.updateState === '' || this.state.updateAddress === ''
                        ? true : false}/>
                </form>
                <button className="btn btn-primary" onClick={this.webPage.bind(this, 'add book')}>View your books</button>
                </div>
                }
                </div>
            </div>
        );
    }
});

module.exports = Profile;