console.log("Hello World.");

//criamos uma coleção chamada "players" na variavel global "Playerlist"
PlayersList = new Meteor.Collection('players');

if(Meteor.isClient){
  //this code only runs on the client
Template.leaderboard.helpers({
  'player': function(){
    return PlayersList.find()
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