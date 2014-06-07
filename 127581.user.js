// ==UserScript==
// @name            The West Shortcut Icons (SP)
// @description	    Dodaje 4 ikony: Miasto widmo,Wioska indiańska, Targ:Legion i Koszary w forcie LEGIONY
// @namespace       Leones
// @icon            http://img854.imageshack.us/img854/4797/iconcwalter.jpg
// @license         GNU Lesser General Public License (LGPL)
// @copyright       2012, Sparki
// @author          Sparki
// @release         CWalter
// @include         http://*.the-west.*/game.php*
// @version         1.2.5.7.2.4.2.4.1
//
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
newscript2.innerHTML = "function showPopupH(){var i = 'Koszary: LEGIONY';var popup = new MousePopup(i);document.getElementById('trader').addMousePopup(popup);setTimeout(\" i='joow';     \",2000);}function showPopupCraft(){var txt = 'Targ: Legion';var p = Character.profession;if (p == 0){} if(p==1){ txt = txt+': Cozinheiro';}else if(p==2){ txt = txt+'';}else if(p==3){ txt = txt+': Ferreiro';}else if(p==4){ txt = txt+': Perito Mestre';}else{} document.getElementById('craft').addMousePopup(new MousePopup(txt));}";
newscript3.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">ProfissĂŁo</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";
newscript4.innerHTML = "var timeout; function ikhebgeklikt(){var t = new Date().getTime()-ItemTraderpage.timediff;var dt = (ItemTraderpage.time-t)/1000;var dt2 = dt.formatDuration();var nit = document.getElementById('tijdhier');nit.innerHTML = dt2;var nit2 =document.getElementById('wisselbox');nit2.innerHTML ='Wisselen in:';var hours=Math.floor(dt/3600);var minutes=Math.floor(dt/60-hours*60);var seconds=Math.floor(dt%60);timeout = setTimeout(\"ikhebgeklikt()\",999); if ( hours == 0 && minutes == 0 && seconds == 0){var timebox = document.getElementById('tijdhier');timebox.innerHTML = '';var wisselen =document.getElementById('wisselbox');wisselen.innerHTML ='<p style=\"color:red;\"><b><a href=\"javascript:laden();\">ProfissĂŁo</br>renovar</a></b></p></a>';clearTimeout(timeout);}}function laden(){Trader.open(\'item_trader\');;setTimeout(\"ikhebgeklikt()\",2000);}";


newdiv.innerHTML = "<img src=\"http://public.beta.the-west.net/images/items/yield/dice.png\" width=\"37\" height=\"37\"id=\"knop\" onMouseover=\"javascript:showPopupCraft();\" onclick=\"javascript:if(Character.home_town != null) MarketWindow.open(Character.home_town.town_id, 10);\" style=\"position:absolute;left:290px;top:5px;cursor:pointer;\" />";
newdiv2.innerHTML = "<img src=\"http://public.beta.the-west.net/images/items/left_arm/bear.png\" width=\"33\" height=\"33\ id=\"knop2\" onMouseover=\"javascript:showPopupH();\" onclick=\"javascript:AjaxWindow.show('fort_building_barracks', {fort_id: 7}, '7');\" style=\"position:absolute;left:290px;top:40px;cursor:pointer;\" />";
newdiv3.innerHTML = "<img src=\"http://public.beta.the-west.net/images/items/yield/pipe.png\" width=\"35\" height=\"35\ id=\"knop2\" onMouseover=\"javascript:showPopupCraft();\" onclick=\"javascript:AjaxWindow.show('quest_employer',{employer:'indianvillage',x:544,y:644}, 'indianvillage_544_644');\" style=\"position:absolute;left:335px;top:40px;cursor:pointer;\" />";
newdiv4.innerHTML = "<img src=\"http://public.beta.the-west.net/images/items/yield/ruby.png\" width=\"35\" height=\"35\ id=\"knop2\" onMouseover=\"javascript:showPopupH();\" onclick=\"javascript:AjaxWindow.show('quest_employer',{employer:'ghosttown',x:993,y:12}, 'ghosttown_993_12');\" style=\"position:absolute;left:335px;top:9px;cursor:pointer;\" />";


ni.appendChild(newscript);
ni.appendChild(newscript2);
ni.appendChild(newdiv);
ni.appendChild(newdiv2);
ni.appendChild(newdiv3);
ni.appendChild(newdiv4);