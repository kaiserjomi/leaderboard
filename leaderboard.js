console.log("Hello World.");

//criamos uma coleção chamada "players" na variavel global "Playerlist"
PlayersList = new Meteor.Collection('players');

if(Meteor.isClient){
  //this code only runs on the client
Template.leaderboard.events({
 
  'click .player': function(){
     //events go here
    var playerId = this._id;
    //Definir uma Session, primeiro argumento é o nome da session e o segundo o valor da session
    Session.set('selectedPlayer', playerId); 
    
    
    //var selectedPlayer = Session.get('selectedPlayer');
    //console.log(selectedPlayer);
  },
  
  'dblclick': function(){
    alert("carregou duas vezes");
  },

  'mouseover .player':function(){
    console.log("atum");
  },
  
});
  
  
  
  Template.leaderboard.helpers({
  'player': function(){
    return PlayersList.find()
  },
    
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer')
      if(playerId == selectedPlayer){
        return "selected"
      }
    }, 
    
  'conta': function(){
    return PlayersList.find().count();
  },
  'otherHelperFunction': function(){
    return "some other function"
}
});
  
}


if(Meteor.isServer){
  //this code only runs on the server

}