// ==UserScript==
// @name           Player Salaries	
// @copyright      2013, Jdog
// @license        (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @version        6.4.13
// @include        http://pigskinempire.com/evalplayer.aspx?id=*&level=Pro
// @description    This just adds a players salary information to their scouting page - Requested by PatriotsHater
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
    
  var opts = getUrlVars();
  var playerId = opts['id'];
    

    $('.rbcontent').find('td').eq(5).html('<strong>Salary:</strong>&nbsp;<span id="sal"></span>&nbsp;&nbsp;&nbsp;<strong>Years Left:</strong>&nbsp;<span id="yrs"></span>');
    $('#sal').load('/proplayer.aspx?id=' + playerId + ' #ctl00_CPH1_lblSalary ');
    $('#yrs').load('/proplayer.aspx?id=' + playerId + ' #ctl00_CPH1_lblYearsLeft ');
    
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

    
}
 
// load jQuery and execute the main function
addJQuery(main);