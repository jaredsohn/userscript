// ==UserScript==
// @name          KingsAge PUNCTELE ARMATEI
// @namespace     http://userscripts.org
// @description	  Find the troop points of any player in his profile page, in the last row of the table
// ==/UserScript==

window.addEventListener("load", function(e) {
  setTimeout(function(){
  var totalScore = Number(document.getElementsByClassName('borderlist')[2].getElementsByTagName("tr")[2].getElementsByTagName('td')[1].innerHTML.replace(".",""));
  var allTDs = document.getElementsByClassName('borderlist')[3].getElementsByTagName("td")
  var cityScores = []
  for( var i=0; i<allTDs.length; i++ ){
    if( i%3 == 2 )
      cityScores.push( Number(allTDs[i].innerHTML.replace(".","")) )
  }
  for( var i=0; i<cityScores.length; i++ ){
    totalScore -= cityScores[i];
  }
  totalScore -= (cityScores.length-1)*2250
  if( !isNaN( totalScore ) )document.getElementsByClassName('borderlist')[2].getElementsByTagName("tbody")[0].innerHTML += '<tr><td style="width:200px;"><b>Troop Points:</b></td><td><b>' + totalScore + '</b></td></tr>'
},'1000')}, false);