// ==UserScript==
// @name New Team Stats Shortcut
// @namespace http://www.courtrivals.com/
// @description Adds a shortcut to detailed team stats on top of the Team Page.
// @include http://www.courtrivals.com/teams.php*
// @include http://courtrivals.com/teams.php*
// ==/UserScript==

var request = new XMLHttpRequest();
request.open("GET", "ajax/Team-Roster.php", false);
request.send(null);
var response = request.responseText;
var tid = response.slice(response.indexOf('tid='), response.indexOf('">show detailed info'));
var table = document.getElementById('shad');
table.innerHTML = table.innerHTML.replace(
  'My Team',
  'My Team <a href="http://www.courtrivals.com/showTeamStats.php?'
    + tid + '" style="color:white">(click here for detailed team stats)</a>'
);
