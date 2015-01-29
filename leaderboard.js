console.log("Hello World.");

//criamos uma coleção chamada "players" na variavel global "Playerlist"
PlayersList = new Meteor.Collection('players');

if(Meteor.isClient){
  //this code only runs on the client
  
Template.addPlayerForm.events({
 
  'submit form': function(event){
    //para impedir que faça refresh
    event.preventDefault();
    //"playerName" é o nome do input de texto da form
    var playerNameVar = event.target.playerName.value;
    //Inserir na base de dados "PlayersList"
    PlayersList.insert({
      name: playerNameVar,
      score: 0
    });
  }
});  
  
Template.leaderboard.events({
   //clicar no elemento com class player
  'click .player': function(){
     //events go here
    var playerId = this._id;
    //Definir uma Session, primeiro argumento é o nome da session e o segundo o valor da session
    Session.set('selectedPlayer', playerId); 
 
  },
  
      //quando carrega no botão  com class increment
      'click .increment': function(){
      var selectedPlayer = Session.get('selectedPlayer');
        //ao usar $set vamos apenas fazer update aos campos que queremos, senão o update ia apagar os campos todos o meter apenas os novos
        //PlayersList.update(selectedPlayer, {$set: {score: 5} });
        PlayersList.update(selectedPlayer, {$inc: {score: 5} });
    },
  
      'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        PlayersList.update(selectedPlayer, {$inc: {score: -5} });
      },
    
  
  'dblclick': function(){
    alert("Carregou duas vezes em: " + this._id + " "+ this.name );
  },

  'mouseover .player':function(){
    console.log("atum");
  },
  
});
  
  
  Template.leaderboard.helpers({
    'player': function(){
      //primeiro vai ser ranked por score e depois por nome
      return PlayersList.find({}, {sort:  {score: -1, name: 1} } )
    },
    
    'selectedClass': function(){
      var playerId = this._id;
      var selectedPlayer = Session.get('selectedPlayer')
      //Coloca um if para apenas devolver selected no player escolhido
      if(playerId == selectedPlayer){
        return "selected"
      }
    }, 
    
    
    'showSelectedPlayer': function(){
      var selectedPlayer = Session.get('selectedPlayer');
      return PlayersList.findOne(selectedPlayer)
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