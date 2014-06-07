

// Copyright (C) 2009 Christian Glashagen and The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
// The script was made by modifying Shulik's version of Glasis The West Script.
// --------------------------------------------------------------------
//
// This is a script for the browser game The West and is powered by Greasemonkey, which is a Firefox addon
//
// To get Greasemonkey, go to this webpage and click "Add to firefox": https://addons.mozilla.org/en-US/firefox/addon/748
// Afterwards you need to restart Firefox.
//
// --------------------------------------------------------------------
// 
// 
// Fumbbl Association - Go West (v.0.60)
//
//
// ==UserScript==
// @name           Fumbbl Association - Go West
// @namespace      http://userscripts.org/scripts/edit_src/55870
// @description    Adds 4 buttons, Fumbbl Goes West forum, Westinsider, Weststats, Export duel. (v0.60)
// @include        http://*.the-west.*
// @exclude        http://zz1w1.tw.innogames.net/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==


var actual_world = window.location.host.substr(0,3);
var actual_region = window.location.host.substr(0,2);

switch(actual_region){
default:
language="en";
break;
}

var weststats_link = document.createElement("li");
weststats_link.id="weststats_link";
weststats_link.innerHTML = '<a style="background:url(http://dump.ninjapirat.org/files/weststats.jpg) no-repeat" href="http://www.weststats.com/?change_world='+actual_world+'" target="_blank"></a>';


var publish_duel = document.createElement("li");
publish_duel.id="publish_duel";
publish_duel.innerHTML='<a href="javascript: var remoteScript=new Element(\'script\', {\'type\': \'text/javascript\', \'src\': \'http://tw-help.ic.cz/vytah.js\'});document.body.appendChild(remoteScript);void(0);"><img src="http://dump.ninjapirat.org/files/exp_duel1.jpg" alt="Publikovat duel"></a>';




var fumbbl_forum = document.createElement("li");
fumbbl_forum.id="fumbbl_forum";
fumbbl_forum.innerHTML = '<a style="background:url(http://dump.ninjapirat.org/files/fgw_forum.jpg) no-repeat" href="http://thewest.280384.nl/index.php" target="_blank"></a>';



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																				//
//																				//
//      How to enable a button for exporting your inventory and skills to your account at West Stats (disabled by default).					//
//																				//
//																				//
//	To enable the button and make it export to your profile, you need to put your login data into the script. Code will be marked [code]:			//
//																				//
//	1. Locate [javascript:var wsp_auth = '&ui=176189&up=c07eb5a8c0dc7bb81c217b67f11c3b7a5e95ffd7'] in the third line below this textbox (my login).		//
//	2. Go to http://www.weststats.com and login.														//
//	3. Go to http://www.weststats.com/User_import/ and find the code from step 1. there, in the first line.*						//
//	4. Replace [javascript:var wsp_auth = '&ui=176189&up=c07eb5a8c0dc7bb81c217b67f11c3b7a5e95ffd7'] in this script with the code from your weststats.	//
//	5. Remove [//] from the three lines below this textbox.													//
//	6. Remove [//] from [//	menu_work.parentNode.insertBefore(weststats_script, menu_work.nextSibling);] at the buttom of this script.			//
//	7. Congrats, you have done it. Refresh your browser and see if the new button works!									//
//																				//
//																				//
//	*The code will be different than mine, since it contains your personal login data for weststats.							//
//																				//
//																				//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//var weststats_script = document.createElement("li");
//weststats_script.id="weststats_script";
//weststats_script.innerHTML = "<a href=\"javascript:var wsp_auth = '&ui=176189&up=c07eb5a8c0dc7bb81c217b67f11c3b7a5e95ffd7';var wsp_url = 'www.weststats.com';var remoteScript=new Element('script', {'type': 'text/javascript', 'src': 'http://www.weststats.com/js/import_all.js?1247793097'});document.body.appendChild(remoteScript);void(0);\"> <img src='http://dump.ninjapirat.org/files/Exp_ws.jpg'></a>";






var westinsider_script = document.createElement("li");
westinsider_script.id="westinsider_script";
westinsider_script.innerHTML = "<a style='background:url(http://dump.ninjapirat.org/files/westinsider_left.jpg) no-repeat'    href=\"javascript:(function(){%20var%20head%20=%20document.getElementsByTagName('head').item(0);%20var%20old%20=%20document.getElementById('TWIjs');%20if(old)%20head.removeChild(old);%20var%20js%20=%20document.createElement('script');%20js.setAttribute('id',%20'TWIjs');%20js.setAttribute('language',%20'javascript');%20js.setAttribute('type',%20'text/javascript');%20js.setAttribute('src',%20'http://www.TheWestInsider.com/scripts/1.js.php');%20head.appendChild(js);%20}%20)()\"</a>";


var menu_inventory = document.getElementById('menu_inventory');
var menu_townforum = document.getElementById('menu_townforum');
var menu_reports = document.getElementById('menu_reports');
var menu_work = document.getElementById('menu_work');




if (menu_inventory) {	
	menu_inventory.parentNode.insertBefore(westinsider_script, menu_inventory.nextSibling);
};

if (menu_townforum) {	
	menu_townforum.parentNode.insertBefore(fumbbl_forum, menu_townforum.nextSibling);	
};

if (menu_reports) {	
	menu_reports.parentNode.insertBefore(publish_duel, menu_reports.nextSibling);	
};

if (menu_work) {
	menu_work.parentNode.insertBefore(weststats_link, menu_work.nextSibling);
//	menu_work.parentNode.insertBefore(weststats_script, menu_work.nextSibling);
};

