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
var newscript3 = document.createElement('script');
var newscript4 = document.createElement('script');
var newscript5 = document.createElement('script');
var newscript6 = document.createElement('script');

var newdiv = document.createElement('div');
var newdiv2 = document.createElement('div');
var newdiv3 = document.createElement('div');
var newdiv4 = document.createElement('div');
var newdiv5 = document.createElement('div');
var newdiv6 = document.createElement('div');

newscript.setAttribute('type','text/javascript');
newscript2.setAttribute('type','text/javascript');

newdiv.setAttribute('id','craft');
newdiv2.setAttribute('id','trader');
newdiv3.setAttribute('id','markt');
newdiv4.setAttribute('id','market');
newdiv5.setAttribute('id','wisselbox');
newdiv5.setAttribute('style', 'position:absolute;left:350px;top:75px;');
newdiv6.setAttribute('id','tijdhier');
newdiv6.setAttribute('style', 'position:absolute;left:430px;top:75px;');

newscript.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">ProfissĂŁo</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";
newscript2.innerHTML = "function showPopupH(){var i = 'Handlarz wędrowny';var popup = new MousePopup(i);document.getElementById('trader').addMousePopup(popup);setTimeout(\" i='joow';     \",2000);}function showPopupCraft(){var txt = 'Targ';var p = Character.profession;if (p == 0){} if(p==1){ txt = txt+': Cozinheiro';}else if(p==2){ txt = txt+'';}else if(p==3){ txt = txt+': Ferreiro';}else if(p==4){ txt = txt+': Perito Mestre';}else{} document.getElementById('craft').addMousePopup(new MousePopup(txt));}";
newscript3.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">ProfissĂŁo</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";
newscript4.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">ProfissĂŁo</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";


newdiv.innerHTML = "<img src=\"http://profile.ak.fbcdn.net/hprofile-ak-snc4/162036_185843251425909_5771777_q.jpg\" width=\"37\" height=\"37\"id=\"knop\" onMouseover=\"javascript:showPopupCraft();\" onclick=\"javascript:if(Character.home_town != null) MarketWindow.open(Character.home_town.town_id, 10);\" style=\"position:absolute;left:290px;top:5px;cursor:pointer;\" />";
newdiv2.innerHTML = "<img src=\"http://multimedia.play.pl/presenter/372161.gif?pid=372161&type=www\" width=\"37\" height=\"37\ id=\"knop2\" onMouseover=\"javascript:showPopupH();\" onclick=\"javascript:laden();\" style=\"position:absolute;left:290px;top:40px;cursor:pointer;\" />";
newdiv3.innerHTML = "<img src=\"http://profile.ak.fbcdn.net/hprofile-ak-snc4/41600_176481165710306_2898033_q.jpg\" width=\"34\" height=\"34\ id=\"knop2\" onMouseover=\"javascript:showPopupCraft();\" onclick=\"javascript:CharacterWindow.open();CharacterWindow.showTab('crafting');\" style=\"position:absolute;left:335px;top:40px;cursor:pointer;\" />";
newdiv4.innerHTML = "<img src=\"http://profile.ak.fbcdn.net/hprofile-ak-ash2/71157_164378020251021_4671187_q.jpg\" width=\"30\" height=\"30\ id=\"knop2\" onMouseover=\"javascript:showPopupH();\" onclick=\"javascript:AjaxWindow.show('fort_building_barracks', {fort_id: 7}, '7');\" style=\"position:absolute;left:335px;top:9px;cursor:pointer;\" />";


ni.appendChild(newscript);
ni.appendChild(newscript2);
ni.appendChild(newdiv);
ni.appendChild(newdiv2);
ni.appendChild(newdiv3);
ni.appendChild(newdiv4);