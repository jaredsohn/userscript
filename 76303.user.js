// ==UserScript==
// @name           Reach Your Friends
// @namespace      Reach Your Friends
// @description    I'm so punny.
// @include        http://www.bungie.net/Stats/LiveFriends.aspx
// ==/UserScript==

var friendArray = document.getElementsByClassName('friend_cont');
var i = 0;
for (var i = 0; i<friendArray.length; i++)
{
var firstLineGamertag = document.getElementsByClassName('infoB').item(i).getElementsByClassName('name').item(0).textContent;
var secondLine = document.getElementsByClassName('infoB').item(i).getElementsByTagName('li').item(1);
var currentGame = document.getElementsByClassName('infoC').item(i).getElementsByClassName('game').item(0);
secondLine.innerHTML += '|&nbsp; <a href="javascript:void(0);" onclick="open_parent(\'http://www.bungie.net/Stats/Reach/Default.aspx?player='+firstLineGamertag+'\');" target="_parent">Halo: Reach</a>';
if (currentGame.textContent.length>=12)
currentGame.style.margin = '-40px 0 0 0';
}

// Give your friends a reach around. They deserve it.
// I deserve two, though.
// Wait... wut?