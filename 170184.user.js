// ==UserScript==
// @name           Scout Game 
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.9.13
// @include        http://*pigskinempire.com/boxscore.aspx?w=*&s=*
// @include 	   http://*pigskinempire.com/proscore.aspx?w=*&s=*
// @description    Determines the league you are scouting for and puts the proper scout link on te boxscore page
// ==/UserScript==
 
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}
 
// the guts of this userscript
function main() {
    
  genLink();
  

  function determineLeague(){
      return window.location.href.indexOf('proscore')
  }
  
  function getUrlVars()
  {
      var vars = [], hash;
      var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
      for(var i = 0; i < hashes.length; i++)
      {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
      }
      return vars;
  }

  function genLink(){

    //Create a new link and its attributes
    var scout_link = document.createElement('a');

    //Determine the leage to create the link for
    var league = determineLeague();
    league = (league > 0) ? "Pro" : "College";

    //Build the link
    var opts = getUrlVars();
    scout_link.setAttribute('id','scouting_link');
    scout_link.setAttribute('href','http://pigskinempire.com/scout.aspx?level=' + league + '&gnum=' + opts['w'] + '&s=' + opts['s']);
    scout_link.setAttribute('target','_blank');
    scout_link.innerHTML = ' | Scout Game';
    
      var par = document.getElementById('ctl00_CPH1_lnkTeamStats');
      $(scout_link).insertAfter(par);
  }

}
 
// load jQuery and execute the main function
addJQuery(main);