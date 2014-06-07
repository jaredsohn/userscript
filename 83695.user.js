// ==UserScript==
// @name Sniper
// @author ASA
// @description Adds various useful buttons to the Ogame Menu for Sniper alliance.
// @include http://uni101.ogame.tw/game/*


// ==/UserScript==

//for Ogame Sniper

//alecs::
var usersession = unsafeWindow.session; //get the usersession var from page
//alecs: i've edited the href string tag to include the usersession ID, not to be a static ID



var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<li class="menubutton_table"><span class="menu_icon"></span><a class="menubutton " href="http://ghost1980.com/Andromeda/" accesskey="" target="_blank"><span class="textlabel">Sniper galaxy</span></a></li><li class="menubutton_table"><span class="menu_icon"></span><a class="menubutton " href="http://ghost1980.com/Andromeda_forum/" accesskey="" target="_blank"><span class="textlabel">Sniper Forum</span></a></li><li class="menubutton_table"><span class="menu_icon"></span><a class="menubutton "href="http://board.ogame.tw/" accesskey="" target="_blank"><span class="textlabel">OGame Forum</span></a></li><li class="menubutton_table"><span class="menu_icon"></span><a class="menubutton " href="http://hkbomb2.co.cc/convert/index.php" accesskey="" target="_blank"><span class="textlabel">HHG Convert</span></a></li>';
document.getElementById('menuTable').appendChild(LinkDiv);
