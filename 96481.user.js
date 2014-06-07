// ==UserScript==
// @name           UrbanZone mod
// @namespace      http://userscripts.org/users/290024
// @version        1.7
// @description    Adds a section called "Divisions" on urban-zone.org containg ctf and ts divisions (incl earlier years)
// @include        http://*urban-zone.org/*
// ==/UserScript==

// Original code
var divId = document.getElementById('pe2');

// Add the new code
var code = '<b>Divisions</b><br/><ul style="padding: 0px; margin: 2px 20px;"><li><a href="http://www.urban-zone.org/ts/"> TS Season 2</a></li><li><a href="index.php?name=Competition&event=6"> TS Season 3</a></li><li><a href="index.php?name=Competition&event=10"> TS Season 4</a></li><li><a href="index.php?name=Competition&event=12"> TS Season 5</a></li><li><a href="index.php?name=Competition&event=16"> TS Season 6</a></li><li><a href="index.php?name=Competition&event=21"> TS Season 7</a></li><li><a href="index.php?name=Competition&event=23"> TS Season 8</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=1"> CTF Season 1</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=4"> CTF Season 2</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=5"> CTF Season 3</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=6"> CTF Season 4</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=8"> CTF Season 5</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=9"> CTF Season 6</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=11"> CTF Season 7</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=13"> CTF Season 8</a></li><li><a href="http://www.urban-zone.org/league/index.php?league=1&season=14"> CTF Season 9</a></li><li><a href="index.php?name=Competition&event=5"> CTF Season 10</a></li><li><a href="index.php?name=Competition&event=9"> CTF Season 11</a></li><li><a href="index.php?name=Competition&event=11"> CTF Season 12</a></li><li><a href="index.php?name=Competition&event=15"> CTF Season 13</a></li><li><a href="index.php?name=Competition&event=20"> CTF Season 14</a></li><li><a href="index.php?name=Competition&event=22"> CTF Season 15</a></li></ul>';
window.document.getElementById('pe2').innerHTML = divId.innerHTML + code;