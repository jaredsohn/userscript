// ==UserScript==
// @name        Faction Census
// @namespace   Kandarin
// @description Keeps a tally of faction members
// @include	http://www.nexusclash.com/modules.php?*&do=roster
// @include	www.nexusclash.com/modules.php?*&do=roster
// ==/UserScript==

//checks which ranks a faction contains
//sums number of members of each rank

if (document.body.innerHTML.search('>Leader<')>(-1)) {var Leader = document.body.innerHTML.match(/>Leader</g).length} else {var Leader = 0}
if (document.body.innerHTML.search('>Lieutenant<')>(-1)) {var Lieutenant = document.body.innerHTML.match(/>Lieutenant</g).length} else {var Lieutenant = 0}
if (document.body.innerHTML.search('>Veteran<')>(-1)) {var Veteran = document.body.innerHTML.match(/>Veteran</g).length} else {var Veteran = 0}
if (document.body.innerHTML.search('>Initiate<')>(-1)) {var Initiate = document.body.innerHTML.match(/>Initiate</g).length} else {var Initiate = 0}

var census = Leader + Lieutenant + Veteran + Initiate

//Grammatical adjustment for factions with one character
//Changes character list header to include member tally

if (census!=1)
{
var Census = census + " characters"
document.body.innerHTML = document.body.innerHTML.replace("open faction</td>"," open faction with " + Census + "</td>")
document.body.innerHTML = document.body.innerHTML.replace("closed faction</td>"," closed faction with " + Census + "</td>")
}
else
{
document.body.innerHTML = document.body.innerHTML.replace("open faction</td>"," open faction with 1 character</td>")
document.body.innerHTML = document.body.innerHTML.replace("closed faction</td>"," closed faction with 1 character</td>")
}