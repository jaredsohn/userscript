// ==UserScript==
// @name           Aktivitätstest
// @namespace      sdgsdgserg
// @include        http://de*.die-staemme.de/game.php?*screen=ally*mode=members
// @include        http://de*.die-staemme.de/game.php?*mode=members*screen=ally
// ==/UserScript==


var user1;
var user2;
var user3 = document.getElementsByClassName("vis")[1].getElementsByClassName("lit")[0].getElementsByTagName("td")[0].getElementsByTagName("a")[0].innerHTML;
var laenge;
var i = 1;
var welt = window.location.href.split("//")[1].split(".")[0];

document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[0].innerHTML += "<th><a href='http://david97.byethost7.com/protokoll"+welt+".html?zufall="+Math.random()+"'>FA</a></th>";
while(i<document.getElementsByClassName("vis")[1].getElementsByTagName("tr").length)
{
 user2 = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
 user2 = user2.search(/<a href=.*>(.*)<\/a>/);
 user2 = RegExp.$1;
 user1 = document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].getElementsByTagName("td")[0].innerHTML;
 user1 = user1.search(/id=(\d+)/);
 
 if(user1 != -1)
 {
  user1 = RegExp.$1;
  document.getElementsByClassName("vis")[1].getElementsByTagName("tr")[i].innerHTML += "<td><a href='http://david97.byethost7.com/aktiv.php?id="+user1+"&passiv="+user2+"&aktiv="+user3+"&welt="+welt+"'><img src='http://david97.byethost7.com/aktivbild.php?id="+user1+"&welt="+welt+"' alt='X'></a></td>";
 }
 i++;
}