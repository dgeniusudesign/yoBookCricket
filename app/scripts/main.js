/*
 *  Function to retrieve match parameters from the URL
 */

function parseURLParams(url) {
  var queryStart = url.indexOf("?") + 1,
    queryEnd   = url.indexOf("#") + 1 || url.length + 1,
    query = url.slice(queryStart, queryEnd - 1),
    pairs = query.replace(/\+/g, " ").split("&"),
    parms = {}, i, n, v, nv;
  if (query === url || query === "") {
    return;
  }
  for (i = 0; i < pairs.length; i++) {
    nv = pairs[i].split("=");
    n = decodeURIComponent(nv[0]);
    v = decodeURIComponent(nv[1]);
    if (!parms.hasOwnProperty(n)) {
      parms[n] = [];
    }
    parms[n].push(nv.length === 2 ? v : null);
  }
  return parms;
}


/*
 *  Variable declarations - self explanatory
 */


var paramVals = parseURLParams(window.location.href);
var ownTeam = paramVals.ownTeam;
var oppTeam = paramVals.oppTeam;
var matchType = paramVals.matchType;
var maxovers = 0;
var target = 0;
var ballsRemaining = 0;
//Setting the number of overs depending on the type of match.
if( matchType == "ODI" ) {
  maxovers = 50;
  target = Math.ceil(Math.random()*500);
  ballsRemaining = 300;
} else if( matchType == "T20" ) {
  maxovers = 20;
  target = Math.ceil(Math.random()*300);
  ballsRemaining = 120;
}
var batsman1 = 0;
var batsman2 = 1;
var batsmanRuns = [0,0,0,0,0,0,0,0,0,0,0];
var batsmanBalls = [0,0,0,0,0,0,0,0,0,0,0];
var teamWickets = 0;
var teamTotal = 0;
var batsmanCounter=batsman1;
var teamOvers=0;
var teamBalls=0;
var bowlerOvers = [0,0,0,0,0];
var bowlerBalls = [0,0,0,0,0];
var bowlerRuns = [0,0,0,0,0];
var bowlerMaidens = [0,0,0,0,0];
var bowlerWickets = [0,0,0,0,0];
var bowlerCounter = 0;
var latestBowlerCounter1 = 0;
var latestBowlerCounter2 = 1;
var partnershipRuns = [0,0,0,0,0,0,0,0,0,0];
var partnershipBalls = [0,0,0,0,0,0,0,0,0,0];
var partnershipCounter = 0;
var batsmanStrike;
var requiredRuns = target;
var wicketsRemaining = 10;

//Creating the players' name array based on the selected teams
switch(ownTeam.toString()) {
  case 'India':
    var batsmanName = ["Shikhar Dhawan", "Rohit Sharma", "Virat Kohli", "Ajinkya Rahane", "Suresh Raina", "MS Dhoni", "Ravindra Jadeja", "Ravichandran Ashwin", "Bhuvaneshwar Kumar", "Mohit Sharma", "Umesh Yadav"];
    break;
  case 'SouthAfrica':
    var batsmanName = ["Quinton de Kock", "Hashim Amla", "Faf du Plessis", "AB deVilliers", "David Miller", "JP Duminy", "Wayne Parnell", "Vernon Philander", "Morne Morkel", "Dale Steyn", "Imran Tahir" ];
    break;
  case 'Australia':
    var batsmanName = ["David Warner", "Aaron Finch", "Shane Watson", "Michael Clarke", "Steve Smith", "Brad Haddin", "Glenn Maxwell", "Mitchell Marsh", "Mitchell Johnson", "Pat Cummins", "Mitchell Starc" ];
    break;
  case 'Pakistan':
    var batsmanName = ["Nasir Jamshed", "Younis Khan", "Ahmed Shehzad", "Haris Sohail", "Misbah-ul-Haq", "Umar Akmal", "Shahid Afridi", "Wahab Riyaz", "Yasir Shah", "Sohail Khan", "Mohammad Irfan" ];
    break;
  case 'SriLanka':
    var batsmanName = ["T Dilshan", "H Thirimanne", "K Sangakkara", "M Jayawardene", "F Karunaratne", "J Mendis", "A Matthews", "N Kulasekara", "R Herath", "L Malinga", "S Lakmal"];
    break;
  case 'England':
    var batsmanName = ["I Bell", "J Buttler", "G Ballance", "J Root", "E Morgan", "J Taylor", "M Ali", "C Woakes", "S Broad", "S Finn", "J Anderson"];
    break;
  case 'NewZealand':
    var batsmanName = ["B McCallum", "M Guptill", "Kane Williamson", "R Taylor", "G Elliot", "Luke Ronchi", "C Anderson", "D Vettori", "A Milne", "T Boult", "T Southee"];
    break;
  case 'WestIndies':
    var batsmanName = ["D Smith", "C Gayle", "M Samuels", "J Carter", "D Ramdin", "L Simmons", "D Sammy", "A Russel", "J Holder", "J Taylor", "K Roach"];
    break;
}
switch(oppTeam.toString()) {
  case 'India':
    var bowlerName = ["Umesh Yadav", "Bhuvaneshwar Kumar", "Mohit Sharma", "Ravichandran Ashwin", "Ravindra Jadeja"];
    break;
  case 'SouthAfrica':
    var bowlerName = ["Morne Morkel", "Dale Steyn", "Wayne Parnell", "Vernon Philander", "Imran Tahir"];
    break;
  case 'Australia':
    var bowlerName = ["Mitchell Johnson", "Pat Cummins", "Mitchell Starc", "Glenn Maxwell", "Mitchell Marsh"];
    break;
  case 'Pakistan':
    var bowlerName = ["Junaid Khan", "Mohammad Irfan", "Wahab Riyaz", "Shahid Afridi", "Yasir Shah"];
    break;
  case 'SriLanka':
    var bowlerName = ["N Kulasekara", "L Malinga", "A Matthews", "R Herath", "S Lakmal"];
    break;
  case 'England':
    var bowlerName = ["S Finn", "J Anderson", "C Woakes", "S Broad", "M Ali"];
    break;
  case 'NewZealand':
    var bowlerName = ["T Boult", "T Southee", "A Milne", "C Anderson", "D Vettori" ];
    break;
  case 'WestIndies':
    var bowlerName = ["J Taylor", "K Roach", "D Sammy", "A Russel", "J Holder"];
    break;
}
/*
 *  Handling the click from button - this funcation generates the random number and calls the handle function
 *  that acts depending on the number generated
 */
document.getElementById('play').onclick = function() {
  var x=Math.floor(Math.random()*8);
  handle(x);
};

/*
 * Two for loops for filling up the batsman and bowlers' names
 */

for (var i = 0; i<=batsmanName.length - 1; i++) {
  var batsmanNameIndicator = "batsmanName"+i;
   document.getElementById(batsmanNameIndicator).innerHTML=batsmanName[i];
};

for (var i = 0; i<=bowlerName.length - 1; i++) {
  var bowlerNameIndicator = "bowlerName"+i;
   document.getElementById(bowlerNameIndicator).innerHTML=bowlerName[i];
};

/*
 *  A function that will handle the strike indicator during strike change
 */

function strikeIndicatorChange(batsman1, batsman2) {
  batsmanStrikeIndicator="batsman_strike"+batsman2;
  document.getElementById(batsmanStrikeIndicator).innerHTML = "*";
  batsmanOffStrikeIndicator="batsman_strike"+batsman1;
  document.getElementById(batsmanOffStrikeIndicator).innerHTML = "";
}

/*
 *  The main function handle() that takes care of what to do depending on the random number
 */

function handle(x) {
  latestBowlerCounter1=bowlerCounter;
  if(latestBowlerCounter1==4) {
    latestBowlerCounter2=0;
  } else {
    latestBowlerCounter2=bowlerCounter+1;
  }
  //First thing that is done is to increment the ball count for the team and the bowler
  teamBalls++;
  bowlerBalls[bowlerCounter]++;
  ballsRemaining--;
  /*
   * handling numbers should be done in a more efficient way
   * This is just the basic handling for testing - a more efficient way to handle the random number
   * will be created that depends on a number of factors like the batsman, bowler, ground, team fielding, pitch
   */
  if (x==5) {
    x=Math.floor(Math.random()*7)+1;
    if(x==5) {
      x=Math.floor(Math.random()*7)+1;
      if(x==5) {
        x=Math.floor(Math.random()*7)+1;
        if(x==5) {
          x=Math.floor(Math.random()*7)+1;
        }
      }
    }
  }
  if(x==0){
    x=Math.floor(Math.random()*8);
    if(x==6||x==4||x==7||x==0) {
      x=0;
    }
    if (x==5) {
      x=Math.floor(Math.random()*7)+1;
      if(x==5) {
        x=Math.floor(Math.random()*8);
        if(x==5) {
          x=Math.floor(Math.random()*8);
          if(x==5) {
            x=Math.floor(Math.random()*8);
          }
        }
      }
    }
  }
  if(x==4|x==6){
    x=Math.floor(Math.random()*7)+1;
    if (x==5) {
      x=Math.floor(Math.random()*7)+1;
      if(x==5) {
        x=Math.floor(Math.random()*8);
        if(x==5) {
          x=Math.floor(Math.random()*8);
          if(x==5) {
            x=Math.floor(Math.random()*8);
          }
        }
      }
    }
  }
  if(x==3){
    x=Math.floor(Math.random()*3)+1;
  }

  /*
   *  7 is for dot ball.
   *  Hence the score isn't increased, but the ball count is increased
   */

  if(x!=7){
    batsmanRuns[batsmanCounter]+=x;           //Increasing the runs scored if x is not 7
    teamTotal+=x;                             //Increasing the team total
    bowlerRuns[bowlerCounter]+=x;             //Increasing the runs for the bowler
    partnershipRuns[partnershipCounter]+=x;
    requiredRuns-=x;
  }
  batsmanBalls[batsmanCounter]++;               //Increasing the ball count for the batsman
  partnershipBalls[partnershipCounter]++;

  //Variables used to assign values to the Span IDs

  partnershipIndicator = "partnership"+partnershipCounter;
  partnershipRunsIndicator = "partnershipRuns"+partnershipCounter;
  partnershipBallsIndicator = "partnershipBalls"+partnershipCounter;
  partnershipStrikeIndicator = "partnershipStrike"+partnershipCounter;
  fallOfWicketIndicator = "fallOfWicket"+partnershipCounter;

  batsmanInFieldIndicator="batsman_infield"+batsman1;
  batsmanInFieldIndicator2="batsman_infield"+batsman2;

  batsmanRunIndicator="batsman_runs"+batsmanCounter;
  batsmanTotalIndicator="batsman_total"+batsmanCounter;
  batsmanStrikeIndicator="batsman_strike"+batsmanCounter;

  bowlerBallsIndicator="bowler_balls"+bowlerCounter;
  bowlerMaidensIndicator="bowler_maidens"+bowlerCounter;
  bowlerRunsIndicator="bowler_runs"+bowlerCounter;
  bowlerWicketsIndicator="bowler_wickets"+bowlerCounter;
  bowlerStrikeIndicator="bowler_strike"+bowlerCounter;

  //Setting a * near the current batsman and bowler
  document.getElementById(batsmanInFieldIndicator).innerHTML = "<b>" + document.getElementById(batsmanInFieldIndicator).innerHTML + "</b>";
  document.getElementById(batsmanInFieldIndicator2).innerHTML = "<b>" + document.getElementById(batsmanInFieldIndicator2).innerHTML + "</b>";

  document.getElementById(batsmanStrikeIndicator).innerHTML = "*";
  document.getElementById(bowlerStrikeIndicator).innerHTML = "*";
  document.getElementById(partnershipIndicator).innerHTML = batsmanName[batsman1]+" and "+batsmanName[batsman2];
  document.getElementById(partnershipStrikeIndicator).innerHTML = "*";


  //If the ball is a dot ball(x==7), then setting a dot in the scoring section
  if(x==7) {
    document.getElementById(batsmanRunIndicator).innerHTML = document.getElementById(batsmanRunIndicator).innerHTML + "." + " ";
    document.getElementById("allLatestBalls").innerHTML = "." + " " + document.getElementById("allLatestBalls").innerHTML;
    document.getElementById("latestBall").innerHTML = "." + " " ;
  }

  //If the ball is a Big hit, then bolding it scoring section
  if(x==6 || x==4 || x==5) {
    document.getElementById(batsmanRunIndicator).innerHTML = document.getElementById(batsmanRunIndicator).innerHTML + "<b>"+x+"</b>" + " ";
    document.getElementById("latestBall").innerHTML = "<b>"+x+"</b>" + " ";
    document.getElementById("allLatestBalls").innerHTML = "<b>"+x+"</b>" + " " + document.getElementById("allLatestBalls").innerHTML;
  }

  //If the ball is a wicket, then bolding it
  if(x==0) {
    document.getElementById(batsmanRunIndicator).innerHTML = document.getElementById(batsmanRunIndicator).innerHTML + "<b>"+"W"+"</b>" + " ";
    document.getElementById("latestBall").innerHTML = "<b>"+"W"+"</b>" + " " ;
    document.getElementById("allLatestBalls").innerHTML = "<b>"+"W"+"</b>" + " " + document.getElementById("allLatestBalls").innerHTML;
  }

  //For everything else, just displaying the score
  if(x==1 || x==2 || x==3 ) {
    document.getElementById(batsmanRunIndicator).innerHTML = document.getElementById(batsmanRunIndicator).innerHTML + x + " ";
    document.getElementById("allLatestBalls").innerHTML = x + " " + document.getElementById("allLatestBalls").innerHTML;
    document.getElementById("latestBall").innerHTML = x + " ";
  }

  //Showing the total score of the batsman
  document.getElementById(batsmanTotalIndicator).innerHTML = batsmanRuns[batsmanCounter]+"("+batsmanBalls[batsmanCounter]+")";

  //Incrementing the team score at the bottom of batting card 
  document.getElementById("team_score").innerHTML =  teamTotal+"/"+teamWickets;
  document.getElementById('teamOvers').innerHTML = teamOvers+"."+teamBalls;

  //Adjusting the bowler details after the ball has been handled
  document.getElementById(bowlerBallsIndicator).innerHTML=bowlerOvers[bowlerCounter]+"."+bowlerBalls[bowlerCounter];
  document.getElementById(bowlerMaidensIndicator).innerHTML=bowlerMaidens[bowlerCounter];
  document.getElementById(bowlerRunsIndicator).innerHTML=bowlerRuns[bowlerCounter];
  document.getElementById(bowlerWicketsIndicator).innerHTML=bowlerWickets[bowlerCounter];

  //Adjusting the partnership details after the ball has been handled
  document.getElementById(partnershipRunsIndicator).innerHTML=partnershipRuns[partnershipCounter];
  document.getElementById(partnershipBallsIndicator).innerHTML=partnershipBalls[partnershipCounter];

  //Changing the batsman counter when the runs scored is odd
  if(x==5||x==1||x==3) {
    if(batsmanCounter==batsman1){
      batsmanCounter=batsman2;
      strikeIndicatorChange(batsman1,batsman2);
    }else if(batsmanCounter==batsman2){
      batsmanCounter=batsman1;
      strikeIndicatorChange(batsman2,batsman1);
    }
  }
  //Handling a wicket
  if(x==0) {
    teamWickets++;                          //Adding wickets to the total team tally
    bowlerWickets[bowlerCounter]++;         //Adding wickets for a bowler's tally
    wicketsRemaining--;                     //Reducing the number of available wickets!
    //Showing the score in bold after the batsman is out
    //Handling things like editing the scorecard, bowler's stats once the batsman is out
    document.getElementById(batsmanTotalIndicator).innerHTML = "<b>"+batsmanRuns[batsmanCounter]+"("+batsmanBalls[batsmanCounter]+")"+"</b>";
    document.getElementById(batsmanStrikeIndicator).innerHTML = "";
    document.getElementById("team_score").innerHTML =  teamTotal+"/"+teamWickets;
    document.getElementById(bowlerWicketsIndicator).innerHTML=bowlerWickets[bowlerCounter];
    document.getElementById(partnershipStrikeIndicator).innerHTML = "";
    document.getElementById(partnershipBallsIndicator).innerHTML = partnershipBalls[partnershipCounter];
    document.getElementById(partnershipRunsIndicator).innerHTML = partnershipRuns[partnershipCounter];
    document.getElementById(fallOfWicketIndicator).innerHTML = teamTotal+"/"+teamWickets+" at "+teamOvers+"."+teamBalls+"<br/>"+batsmanName[batsmanCounter]+" to "+bowlerName[bowlerCounter];

    //Increasing the batsman counter so that the next man comes in
    if(batsmanCounter==batsman1){
      document.getElementById(batsmanInFieldIndicator).innerHTML = "<i>" + document.getElementById(batsmanInFieldIndicator).innerHTML+"</i>";
      batsman1=teamWickets+1;
      batsmanCounter=batsman1;
    }else if(batsmanCounter==batsman2){
      document.getElementById(batsmanInFieldIndicator2).innerHTML = "<i>" + document.getElementById(batsmanInFieldIndicator2).innerHTML+"</i>";
      batsman2=teamWickets+1;
      batsmanCounter=batsman2;
    }
    partnershipCounter++;
  }

  //Handling the end of an over for the bowling team
  if(teamBalls==6) {
    teamOvers++;
    teamBalls=0;
    document.getElementById('teamOvers').innerHTML = teamOvers+"."+teamBalls;
    document.getElementById("latestBowlerOvers0").innerHTML=bowlerOvers[bowlerCounter]+"."+bowlerBalls[bowlerCounter];
    document.getElementById(bowlerBallsIndicator).innerHTML=bowlerOvers[bowlerCounter]+"."+bowlerBalls[bowlerCounter];
    document.getElementById("allLatestBalls").innerHTML = "<b> | </b> " + document.getElementById("allLatestBalls").innerHTML;
    if(batsmanCounter==batsman1){
      batsmanCounter=batsman2;
      strikeIndicatorChange(batsman1,batsman2);
    } else if(batsmanCounter==batsman2){
      batsmanCounter=batsman1;
      strikeIndicatorChange(batsman2,batsman1);
    }
  }

  if(batsmanCounter==batsman1) {
    document.getElementById("latestBatsmanStrike1").innerHTML = "";
    document.getElementById("latestBatsmanStrike0").innerHTML = "*";
  } else if(batsmanCounter==batsman2) {
    document.getElementById("latestBatsmanStrike0").innerHTML = "";
    document.getElementById("latestBatsmanStrike1").innerHTML = "*";
  }

  //Handling the end of an over for an individual bowler
  if(bowlerBalls[bowlerCounter]==6) {
    bowlerOvers[bowlerCounter]++;
    bowlerBalls[bowlerCounter]=0;
    document.getElementById(bowlerStrikeIndicator).innerHTML = "";
    document.getElementById(bowlerBallsIndicator).innerHTML=bowlerOvers[bowlerCounter]+"."+bowlerBalls[bowlerCounter];
    document.getElementById("latestBowlerOvers0").innerHTML=bowlerOvers[bowlerCounter]+"."+bowlerBalls[bowlerCounter];
    //Incrementing the bowler counter at the end of an over
    bowlerCounter++;
    //If all the five bowlers have bowled, then bringing back the first bowler again
    if(bowlerCounter==5){
      bowlerCounter=0;
    }
  }

  //Latest Batsman and Bowler score Handling

  document.getElementById("latestBatsmanName0").innerHTML=batsmanName[batsman1];
  document.getElementById("latestBatsmanRuns0").innerHTML=batsmanRuns[batsman1];
  document.getElementById("latestBatsmanBalls0").innerHTML=batsmanBalls[batsman1];
  document.getElementById("latestBatsmanStrRate0").innerHTML=(batsmanRuns[batsman1]/batsmanBalls[batsman1])*100;
  document.getElementById("latestBatsmanName1").innerHTML=batsmanName[batsman2];
  document.getElementById("latestBatsmanRuns1").innerHTML=batsmanRuns[batsman2];
  document.getElementById("latestBatsmanBalls1").innerHTML=batsmanBalls[batsman2];
  document.getElementById("latestBatsmanStrRate1").innerHTML=(batsmanRuns[batsman2]/batsmanBalls[batsman2])*100;


  document.getElementById("latestBowlerName0").innerHTML=bowlerName[latestBowlerCounter1];
  document.getElementById("latestBowlerOvers0").innerHTML=bowlerOvers[latestBowlerCounter1]+"."+bowlerBalls[latestBowlerCounter1];
  document.getElementById("latestBowlerMaidens0").innerHTML=bowlerMaidens[latestBowlerCounter1];
  document.getElementById("latestBowlerRuns0").innerHTML=bowlerRuns[latestBowlerCounter1];
  document.getElementById("latestBowlerWicket0").innerHTML=bowlerWickets[latestBowlerCounter1];
  document.getElementById("latestBowlerEconomy0").innerHTML=bowlerRuns[latestBowlerCounter1]/bowlerOvers[latestBowlerCounter1];
  document.getElementById("latestBowlerName1").innerHTML=bowlerName[latestBowlerCounter2];
  document.getElementById("latestBowlerOvers1").innerHTML=bowlerOvers[latestBowlerCounter2]+"."+bowlerBalls[latestBowlerCounter2];
  document.getElementById("latestBowlerMaidens1").innerHTML=bowlerMaidens[latestBowlerCounter2];
  document.getElementById("latestBowlerRuns1").innerHTML=bowlerRuns[latestBowlerCounter2];
  document.getElementById("latestBowlerWicket1").innerHTML=bowlerWickets[latestBowlerCounter2];
  document.getElementById("latestBowlerEconomy1").innerHTML=bowlerRuns[latestBowlerCounter2]/bowlerOvers[latestBowlerCounter2];
  $("#gameStatus").text(requiredRuns+" Runs required in "+ballsRemaining+" balls with "+wicketsRemaining+" wickets in hand");

}

$(document).ready(function() {
  $("#gameTitle").text(paramVals.ownTeam+" vs "+paramVals.oppTeam);
  $("#gameTypeTitle").text(paramVals.matchType+" Match"+"("+maxovers+" over Game)");
  $("#gameTarget").text("Target - "+target+" in "+maxovers+" overs");
  $("#gameStatus").text(requiredRuns+" Runs required in "+ballsRemaining+" balls");
});