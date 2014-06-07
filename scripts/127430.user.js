// ==UserScript==
// @name         War of Ninja - Search Bar
// @namespace    for WarofNinja.com
// @version		 2.1.3
// @include      http://forums.warofninja.com/*
// @include      http://forums.warofninja.com
// @include      forums.warofninja.com/*
// @include      forums.warofninja.com
// @include      http://www.warofninja.com/my-settings
// @include      http://warofninja.com/my-settings
// @include      www.warofninja.com/*
// @include      www.warofninja.com
// @author       Sand_Spirit
// @description  Adds a search bar on WoN forums.
// @history		 1.0 - First release
// @history 	 1.1 - Update: The Search Text Box is now css styled.
// @history 	 1.1.1 - Update: Added Userscripts link above the search box.
// @history 	 2.0 - Update: Settings of Search Bar can be modified on the 'Settings' page. Settings are stored in browser as cookies. Position of Search Bar can now be changed. Current positions are 'Side', 'Top' and 'Bottom'.
//@history 	 2.1 - Update: Screenshots now pop-in on the 'My Settings' page instead of opening in a new tab.
//@history 	 2.1.1 - Update: Fixed style for 'Settings' and 'Userscripts' links for the side search bar.
//@history 	 2.1.2 - Update: div.success now shows message when you save your settings instead of the pop-up system message.
//@history 	 2.1.3 - Fix: This script no longer interrupts WoN site scripts.
// ==/UserScript==

// Adds .css

var newstyle = document.createElement('link');
newstyle.rel = 'stylesheet';
newstyle.href = 'http://sandspirit.netii.net/warofninja/userscripts/SearchBar/searchbar.css';
newstyle.type = 'text/css';

document.getElementsByTagName('head')[0].appendChild(newstyle);

// Add .js

var plugin = document.createElement('script');
plugin.src = 'http://sandspirit.netii.net/warofninja/userscripts/CookieReadWrite.js';
plugin.type = 'text/javascript';

document.getElementsByTagName('head')[0].appendChild(plugin);

// Adds jQuery
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// MAIN FUNCTION
function main() {
jQuery.noConflict();

// Defines window vars
var useragent = navigator.userAgent;
var pageurl = window.location;
var pagetitle = document.title;
var position;
var positioncookie;

positioncookie = getCookie('us_searchbar_position');
if (pageurl === 'http://www.warofninja.com/my-settings' || 'www.warofninja.com/my-settings' || 'warofninja.com/my-settings') 
{
	if (positioncookie != null && positioncookie == 'Side' || 'Top' || 'Bottom')
	{ 
	$('<div class="info usSettingsStaticMessage">Current search bar position: ' + positioncookie + '</div>').fadeIn('fast').insertBefore('section#changeSettings section:first');
	}
$('<section><h2>Search Bar Settings</h2><table><tbody><tr class="description"><td colspan="5">Here, you can adjust your settings for "Search Bar" userscript. Settings are stored in your browser as cookies.</td></tr><tr class="input"><td class="label"><label>Position:</label></td><td class="input"><form name="position_f"><input type="radio" name="position_r" id="position_1" value="Side">Side (Default) &nbsp&nbsp<a href="javascript: void(0)" onMouseOver="$(\'#position_preview1\').fadeIn(\'fast\')" onMouseOut="$(\'#position_preview1\').stop(true, true).fadeOut(\'fast\')" style="cursor:pointer;"><img src="http://img138.imageshack.us/img138/6858/viewscreenshoticon.png"></a></input><br><input type="radio" name="position_r" id="position_2" value="Top">Top &nbsp&nbsp<a href="javascript: void(0)" onMouseOver="$(\'#position_preview2\').fadeIn(\'fast\')" onMouseOut="$(\'#position_preview2\').stop(true, true).fadeOut(\'fast\')" style="cursor:pointer;"><img src="http://img138.imageshack.us/img138/6858/viewscreenshoticon.png"></a></input><br><input type="radio" name="position_r" id="position_3" value="Bottom">Bottom &nbsp&nbsp<a href="javascript: void(0)" onMouseOver="$(\'#position_preview3\').fadeIn(\'fast\')" onMouseOut="$(\'#position_preview3\').stop(true, true).fadeOut(\'fast\')" style="cursor:pointer;"><img src="http://img138.imageshack.us/img138/6858/viewscreenshoticon.png"></a></input></form></td><td><input type="button" style="height:30px;" class="button smaller" id="position_save" value="Save"></td></tr></tbody></table></section><br><img id="position_preview1" height="308" width="400" src="http://img225.imageshack.us/img225/9287/screenshotsidepositionr.png" class="screenshot" /><img id="position_preview2" height="308" width="400" src="http://img577.imageshack.us/img577/9601/screenshottoppositionre.png" class="screenshot" /><img id="position_preview3" height="308" width="400" src="http://img818.imageshack.us/img818/4853/screenshotbottompositio.png" class="screenshot" />').fadeIn('1000').insertBefore('section#changeSettings section:first');

$("#position_1").click(function(){
	position = "Side"
	});
	
$("#position_2").click(function(){
	position = "Top"
	});
	
$("#position_3").click(function(){
	position = "Bottom"
	});

$("#position_save").click(function(){
$('.usSettingsMessage').fadeOut('fast').remove();
	switch (position) {
		case 'Side':
		$('<div class="success usSettingsMessage">You have successfully changed settings of "Search Bar" script. Position of search bar is now: ' + position + '</div>').fadeIn('fast').insertBefore('section#changeSettings section:first');
		$.cookie('us_searchbar_position', 'Side', { expires: 777777, path: '/', domain: 'warofninja.com' });
		break;
		case 'Top':
		$('<div class="success usSettingsMessage">You have successfully changed settings of "Search Bar" script. Position of search bar is now: ' + position + '</div>').fadeIn('fast').insertBefore('section#changeSettings section:first');
		$.cookie('us_searchbar_position', 'Top', { expires: 777777, path: '/', domain: 'warofninja.com' });
		break;
		case 'Bottom':
		$('<div class="success usSettingsMessage">You have successfully changed settings of "Search Bar" script. Position of search bar is now: ' + position + '</div>').fadeIn('fast').insertBefore('section#changeSettings section:first');
		$.cookie('us_searchbar_position', 'Bottom', { expires: 777777, path: '/', domain: 'warofninja.com' });
		break;
		default:
		$('<div class="error usSettingsMessage">An error occured.</div>').fadeIn('fast').insertBefore('section#changeSettings section:first');
		break;
/*End of switch (position)*/}
$(".usSettingsStaticMessage").refresh();

	});
}

var searchbar_skin2 = $('<div class="forumHeader"><span>Search</span></div><div class="forumContainer"><center><form autocomplete="on" method="get" action="http://www.google.com/search" target="_blank"><div><table><tr><td><img src="http://img717.imageshack.us/img717/4120/searchforum.png">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td><td><input type="text" name="q" id="searchbox_skin2" class="searchbox_skin2" size="25" maxlength="255" value="" /><br><a href="http://www.warofninja.com/my-settings" class="forumButton">Settings</a> &nbsp;&nbsp; <a href="http://sandspirit.netii.net/warofninja/userscripts" class="forumButton">Userscripts</a><br><input type="checkbox" style="display:none;" name="sitesearch" value="forums.warofninja.com" checked /></div><input  class="button" type="submit" value="Search" size="15" style="float:right"/></form></div>');

var searchbar_skin1 = $('<section id="searchengine_skin1"><header><h4>Search</h4><img alt="" src="http://i44.tinypic.com/qzf5ee.png"></header><center><form autocomplete="off" method="get" action="http://www.google.com/search" target="_blank"><div><table><tr><td><br><input autocomplete="off" type="text" name="q" id="searchbox_skin1" class="searchbox_skin3" size="25" maxlength="255" value="" /><center><input class="button smaller" type="submit" value="Search" size="15" /></td></tr><tr><td align="center" style="font-size:75%"><input type="checkbox"  name="sitesearch" style="display:none;" value="forums.warofninja.com" checked /><br><p class="links"><a href="http://www.warofninja.com/my-settings" class="us_links">Settings</a><a href="http://sandspirit.netii.net/warofninja/userscripts" style="float:right" class="us_links">Userscripts</a></p><br></td><tr></table></div></form></section>');

if (positioncookie === null) { 	$.cookie('us_searchbar_position', 'Side', { expires: 777777, path: '/', domain: 'warofninja.com' }); }
else if (positioncookie === "Side") { $(searchbar_skin1).fadeIn('1000').insertBefore('#goBackToStartpage'); }
else if (positioncookie === "Top") { $(searchbar_skin2).fadeIn('1000').insertBefore('div#content table.forumTable:first'); }
else if (positioncookie === "Bottom") { $(searchbar_skin2).fadeIn('1000').insertAfter('div#content table.forumTable:last'); }

/* End of main() */}

// Runs main()
addJQuery(main);