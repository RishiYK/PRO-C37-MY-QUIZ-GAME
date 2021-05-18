class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    question.hide();
    background("lightyellow");
    fill(0);
    textSize(30);
    text("Your Result",340,50);
    text("----------",320,500);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var display_Answers= 230

      fill("green");
      textSize(15);
      text("NOTE: IF THE SENTENCE IS IN GREEN YOU HAVE ANSWERED CORRECTLY!",130,230)
      for(var plr in allContestants){
          var correctAns="2"
        if(correctAns===allContestants[plr].answer)
        fill("green");
      else
      fill("red");
      display_Answers+=30;
      textSize(15);
      text(allContestants[plr].name+":"+allContestants[plr].answer,250,display_Answers)

      
      }
      
    }

  }
}
