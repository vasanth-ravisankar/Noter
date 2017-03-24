var React = require("react");
var Note = require("./note.jsx")
var Loader = require("./Loader.jsx")
var axios = require("axios")
var LightboxModal = require("./LightBox.jsx")
var Modal = require("./Modal.jsx")
var _ = require("lodash")
var Auth0Lock = require('auth0-lock')
var clientId = 'aYHRwlEWGfMZcz42lsiWgU1bqwnXtevV'
var domain = 'noter.auth0.com'


module.exports = React.createClass({
  propTypes: {
    onChange: React.PropTypes.func
  },
getInitialState: function(){

  return ({
        notes: [],
        note: {title: '', content: ''},
        selectedNote: {},
        noteFetched: false,
        editLightboxDisplay: false,
        deleteLightboxDisplay: false
  })
},
componentDidMount: function(){
  this.lock = new Auth0Lock(clientId, domain, {
        auth: {
          redirectUrl: '/',
          responseType: 'token'
        }
      })
      // Add callback for lock `authenticated` event
      this.lock.on('authenticated', this._doAuthentication.bind(this))
      // binds login functions to keep this context
      this.login = this.login.bind(this)

},

_doAuthentication: function(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)
    // navigate to the home route
    //browserHistory.replace('/home')
  },

  login: function() {
    // Call the show method to display the widget.
    this.lock.show()
  },

  loggedIn: function() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  },

  setToken: function(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  },

  getToken: function() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  },

  logout: function() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
  },

fetchNotes: function(){
   fetch('/viewnotes')
      .then((response) => response.json())
      .then((responseJson) => {
      console.log(responseJson)
      if(this.state.notes.length == 0){
        this.setState({notes: responseJson, noteFetched: true })
        }
      })
      .catch((error) => {
        console.error(error);
      });
},
handleKeyPress: function(e){
  if(e.key == 'Enter'){
    this.refs.noteContent.focus()
  }
},
enterNoteTitle: function(e){
  console.log(e.keyCode)
  if(e.keyCode == 13){
    this.setState({noteContentFocus: true})
  }
  var note = this.state.note
  note.title = e.target.value
  this.setState({note: note})
},
enterNoteContent: function(e){
  var note = this.state.note;
  note.content = e.target.value
  this.setState({note: note})
},
saveNote: function(){
  var saveNotePath = "/notes"
  var self = this
  var note = this.state.note
  var title = note.title.trim().length ? note.title : 'Untitled Note'
  var note_data = {title: title, body: note.content}
  console.log(note_data)
  axios.post(saveNotePath, note_data)
  .then(function (response) {
    console.log(response);
    var notes = self.state.notes
    notes.splice(0, 0, response.data)
    self.setState({notes: notes, note: ''})
  })
  .catch(function (error) {
    console.log(error);
  });

},
openEditLightbox: function(info){
  this.setSelectedNoteInfo(info)
  this.setState({editLightboxDisplay: true});
},
closeEditLightbox: function(){
  this.setState({editLightboxDisplay: false});
},
setSelectedNoteInfo: function(info){
  this.setState({selectedNote: info})
},
editNoteTitle: function(e){
  this.state.selectedNote.title = e.target.value
  this.setState({selectedNote: this.state.selectedNote})
},
editNoteContent: function(e){
  this.state.selectedNote.text = e.target.value
  this.setState({selectedNote: this.state.selectedNote})
},
updateNote: function(){
  var self = this
  var note = this.state.selectedNote
  var updateNotePath = "/notes/"+note._id

  axios.put(updateNotePath, note)
  .then(function (response) {
    console.log(response);
    self.closeEditLightbox()
  })
  .catch(function (error) {
    console.log(error);
  });

},
openDeleteLightbox: function(info){
  this.setSelectedNoteInfo(info)
  this.setState({deleteLightboxDisplay: true});
},
closeDeleteLightbox: function(){
  this.setState({deleteLightboxDisplay: false});
},
deleteNote: function(){
  var self = this
  var note = this.state.selectedNote
  var deleteNotePath = "/notes/"+note._id

  axios.delete(deleteNotePath, note)
  .then(function (response) {
    console.log(response);
    self.closeDeleteLightbox()
  })
  .catch(function (error) {
    console.log(error);
  });

},

render: function(){
     var self = this
     var state = this.state;
     console.log(state.noteContentFocus)
   if(!state.noteFetched){
   this.fetchNotes()
   }
       return(
          <div>
             <div className="row">
                  <div className="col s12">
                    <div className="input-field col s12">
                      <input autoFocus placeholder="Title your note" type="text" value={state.note.title} className="note-title" onKeyPress={this.handleKeyPress} onChange={this.enterNoteTitle} />
                      <textarea ref="noteContent" value={state.note.content} onChange={this.enterNoteContent} placeholder="Take Note" id="textarea1" className="materialize-textarea"></textarea>
                    </div>
                    <button className="btn right" onClick={this.saveNote}>DONE</button>
                  </div>
              </div>

             <div className="row">
                { this.state.notes.length ?

                            this.state.notes.map(function(s,index){

                                return(
                                    <Note
                                      info={s}
                                      openEditLightbox = {self.openEditLightbox}
                                      closeEditLightbox = {self.closeEditLightbox}
                                      openDeleteLightbox = {self.openDeleteLightbox}
                                      closeDeleteLightbox = {self.closeDeleteLightbox}
                                      key={index} />
                                )
                            }) : <Loader />
                }
             </div>

             <LightboxModal
                    display  ={state.editLightboxDisplay}
                    close = {this.closeEditLightbox}>
                    <div className="col s8">
                        <div className="card">
                            <div className="card-content">

                              <div className="input-field col s12">
                                <input autoFocus className="note-title" type="text" value={state.selectedNote.title} onChange={this.editNoteTitle} />
                                <textarea value={state.selectedNote.text} onChange={this.editNoteContent} placeholder="Take Note" className="materialize-textarea"></textarea>
                              </div>

                            </div>
                            <div className="card-action">
                              <button onClick={this.updateNote} className="btn">Update</button>
                            </div>
                        </div>
                    </div>
                </LightboxModal>

                <LightboxModal
                       display  ={state.deleteLightboxDisplay}
                       close = {this.closeDeleteLightbox}>
                       <div className="col s6">
                           <div className="card">
                               <div className="card-content">
                                 <span className="card-title">
                                   Confirm Delete
                                 </span>
                                 <p>
                                   Are you sure you want to delete the note?
                                 </p>
                               </div>
                               <div className="card-action">
                                 <button onClick={this.deleteNote} className="btn red">Delete</button>
                               </div>
                           </div>
                       </div>
                   </LightboxModal>
           </div>
       )
   }
});
