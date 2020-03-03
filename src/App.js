import React, { Component } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'


import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'
import AlertDismissible from './auth/components/AlertDismissible'
import ArtIndex from './auth/components/art/ArtIndex'
import CreateArt from './auth/components/art/CreateArt'
import ArtShow from  './auth/components/art/ArtShow'
import EditArt from './auth/components/art/EditArt'
import CarouselPage from './auth/components/imges/CarouselPage'
import Footer from './auth/components/footer/Footer'
import Auction from './auth/components/art/Auction'
import AllArt from './auth/components/art/AllArt'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type }] })
  }

  render () {
    const { alerts, user } = this.state

    return (
      <React.Fragment>
        <Header user={user} />
        {alerts.map((alert, index) => (
          <AlertDismissible key={index} variant={alert.type} message={alert.message} />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />

          <Route  exact path='/' render={()=>(<CarouselPage/>)}/>
          <Route  exact path='/items/all' render={() => (
            <AllArt/>
          )}/>
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />
  
           <AuthenticatedRoute user={user}  exact path='/items'render={()=>(
            <ArtIndex user={user}/> )}/>
            <AuthenticatedRoute user={user} exact path='/create'render={()=>(<CreateArt user={user}/>)}/>
            
           
            <AuthenticatedRoute  user={user}  exact path='/items/:id' render={(props) => (
            <ArtShow user={user} itemId={props.match.params.id}/>
          )}/>
            <AuthenticatedRoute  user={user} path='/items/:id/edit' render={(props) => (
            <EditArt user={user} itemId={props.match.params.id} />)}/>
            <AuthenticatedRoute  user={user} path='/auction' render={(props) => (
              <Auction user={user} />)}/>
            
        </main>
        
          <Footer/>
        
        
      </React.Fragment>
    )
  }
}

export default App
