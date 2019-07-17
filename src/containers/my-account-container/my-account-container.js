import React, { Component } from 'react'

//Redux
import { connect } from "react-redux";

//Route
import { Redirect, Link, Route } from 'react-router-dom';

class MyAccountContainer extends Component {
    render() {
        if(this.props.user.currentUser) {
            return (
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3 col-md-3">
                            <div class="panel-group" id="accordion">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" 
                                            data-parent="#accordion" 
                                            href="#collapseOne">
                                            <i className="fa fa-user-circle"></i>
                                            {' Username'}
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapseOne" class="panel-collapse collapse in">
                                        <div class="panel-body">
                                            <table class="table">
                                                <tr>
                                                    <td>
                                                        <Link to='/account/orders'>
                                                            <i class="fa fa-shopping-bag"></i>
                                                            {' Orders'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to='/account/addresses'>
                                                            <i class="fa fa-map"></i>
                                                            {' Addresses'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to='/account/coupons'>
                                                            <i class="fa fa-ticket"></i>
                                                            {' Coupons'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
                                                <i className="fa fa-cog"></i>
                                                Settings
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapseTwo" class="panel-collapse collapse">
                                        <div class="panel-body">
                                        <table class="table">
                                                <tr>
                                                    <td>
                                                        <Link to='/account/change-password'>
                                                            <i class="fa fa-key"></i>
                                                            {' Change Password'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h4 class="panel-title">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                                            <i className="fa fa-info-circle"></i>
                                                {'Others'}
                                            </a>
                                        </h4>
                                    </div>
                                    <div id="collapseThree" class="panel-collapse collapse">
                                        <div class="panel-body">
                                        <table class="table">
                                                <tr>
                                                    <td>
                                                        <Link to='/account/help'>
                                                            <i class="fa fa-question-circle"></i>
                                                            {' Help'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to='/account/logout'>
                                                            <i class="fa fa-sign-out"></i>
                                                            {' Logout'}
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-9 col-md-9">
                            <div class="well">
                                <Route path='/account/orders' render={() =>
                                    <h1>Orders</h1>
                                } />
                                <Route path='/account/addresses' render={() =>
                                    <h1>Addresses</h1>
                                } />
                                <Route path='/account/coupons' render={() =>
                                    <h1>Coupons</h1>
                                } />
                                <Route path='/account/change-password' render={() =>
                                    <h1>Change Password</h1>
                                } />
                                <Route path='/account/help' render={() =>
                                    <h1>Help</h1>
                                } />
                                <Route path='/account/logout' render={() =>
                                    <h1>Logout</h1>
                                } />
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(
                <Redirect to='/login' />
            )
        }

    }
}

const mapStateToProps = state => {
    return {
      user: state.user
    };
  };
  
  const mapDispatchToProps = {

  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyAccountContainer);
