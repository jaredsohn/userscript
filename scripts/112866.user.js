// ==UserScript==
// @name Game Day Dance Card Filter
// @namespace http://userscripts.org
// @description filtering out the disinteresting college football scores
// @match http://msn.foxsports.com/collegefootball/scores*
// @run-at document-end
// ==/UserScript==


function philParseOneScorebox( scorebox ){
  if( scorebox.innerHTML != null ){
    var scoreboxParts = scorebox.childNodes;
    for( var i = 0; i < scoreboxParts.length; ++i ){
      var scoreboxPart = scoreboxParts[i];
      if( scoreboxPart.id != null ){
        philHandleGame( scoreboxPart.id );
      }
    } 
  }
}

function philHandleGame( gameName ){
  var nameParts = gameName.split( "-" ) ;
  renderOneGame( nameParts );
}

function renderOneGame( nameParts ){
  var scoreId = nameParts[0] + "Scores-" + nameParts[1] ;
  var homeTotalId = nameParts[0] + "TotalHome-" + nameParts[1];
  var awayTotalId = nameParts[0] + "TotalAway-" + nameParts[1];

  var homeTotalScore = document.getElementById( homeTotalId ).innerHTML;
  var awayTotalScore = document.getElementById( awayTotalId ).innerHTML;
  var gameIsClose = false;
  if( homeTotalScore != "" && awayTotalScore != ""){
    homeTotalScore = parseInt( homeTotalScore );
    awayTotalScore = parseInt( awayTotalScore );
    gameIsClose = Math.abs( homeTotalScore  - awayTotalScore ) < 8;
  }

  var actualScores = document.getElementById( scoreId );
  if( (gamesDisplayed % 3) == 0 ) {
    filteredOutput += "<tr>";
  }
  filteredOutput += '<td ';
  if( gameIsClose ) filteredOutput += 'bgcolor="0xADFF2F"';
  filteredOutput += ">";
  filteredOutput += actualScores.innerHTML;
  filteredOutput += "</td>";
  if( (gamesDisplayed % 3) == 2 ){
    filteredOutput += "</tr>";
  }
  gamesDisplayed += 1;
}

var scoreboxContainer = document.getElementById( "sbScoreboxes" );
var scoreboxes = scoreboxContainer.childNodes;
var gamesDisplayed = 0;
var filteredOutput = '<html><body><table border="1">';
for( var i = 0; i < scoreboxes.length; ++i ){
  var scorebox = scoreboxes[i];
  philParseOneScorebox( scorebox );
}
document.write( filteredOutput );
document.write( "</table></body></html>" );
