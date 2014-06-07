// ==UserScript==
// @name            The West - Crafting Shortcut
// @description	    Creates a shortcut to crafting and the travelling merchant next to the character info.
// @namespace       Leones
// @icon            http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license         GNU Lesser General Public License (LGPL)
// @copyright       2011, Leones
// @author          Leones
// @release         CWalter
// @include         http://*.the-west.*/game.php*
// @version         1.4.1
//
// @history         1.4.1 Opens the crafting window upon clicking.
// @history         1.4 Updated for 1.35
// @history         1.3 Fixed the craft button, sort of
// @history         1.2 Added timer to travelling merchant, thanks to Christophev
// @history         1.1 Added travelling merchant button
// @history         1.0 Crafting button
// ==/UserScript==


var ni = document.getElementById('character_stats');

var newscript = document.createElement('script');
var newscript2 = document.createElement('script');

var newdiv = document.createElement('div');
var newdiv2 = document.createElement('div');
var newdiv3 = document.createElement('div');
var newdiv4 = document.createElement('div');

newscript.setAttribute('type','text/javascript');
newscript2.setAttribute('type','text/javascript');

newdiv.setAttribute('id','craft');
newdiv2.setAttribute('id','trader');
newdiv3.setAttribute('id','wisselbox');
newdiv3.setAttribute('style', 'position:absolute;left:350px;top:75px;');
newdiv4.setAttribute('id','tijdhier');
newdiv4.setAttribute('style', 'position:absolute;left:430px;top:75px;');

newscript.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">Profissão</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";
newscript2.innerHTML = "function showPopupH(){var i = 'Comerciante';var popup = new MousePopup(i);document.getElementById('trader').addMousePopup(popup);setTimeout(\" i='joow';     \",2000);}function showPopupCraft(){var txt = 'Oficio';var p = Character.profession;if (p == 0){} if(p==1){ txt = txt+': Cozinheiro';}else if(p==2){ txt = txt+': Vendedor de Tonico';}else if(p==3){ txt = txt+': Ferreiro';}else if(p==4){ txt = txt+': Perito Mestre';}else{} document.getElementById('craft').addMousePopup(new MousePopup(txt));}";

newdiv.innerHTML = "<img src=\"http://www.the-west.com.br/images/crafting/select.png\" width=\"33\" height=\"33\"id=\"knop\" onMouseover=\"javascript:showPopupCraft();\" onclick=\"javascript:CharacterWindow.open();CharacterWindow.showTab('crafting');\" style=\"position:absolute;left:295px;top:5px;cursor:pointer;\" />";
newdiv2.innerHTML = "<img src=\"http://www.the-west.com.br/images/itemtrader/haendler_btn.jpg\" width=\"37\" height=\"37\ id=\"knop2\" onMouseover=\"javascript:showPopupH();\" onclick=\"javascript:laden();\" style=\"position:absolute;left:295px;top:40px;cursor:pointer;\" />";

ni.appendChild(newscript);
ni.appendChild(newscript2);
ni.appendChild(newdiv);
ni.appendChild(newdiv2);
ni.appendChild(newdiv3);
ni.appendChild(newdiv4);