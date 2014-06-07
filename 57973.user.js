// ==UserScript==
// @name           Gaia - Shortcuts @ Top
// @namespace      http://projects.indeedle.com/gaia/shortcuts
// @description    Adds a customizable shortcuts menu to the top of the screen (next to where the cash icon is)
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://projects.indeedle.com/inc/jquery.js
// ==/UserScript==

// Just note, this runs based around jquery because I'm lazy at the moment

/* Begin Script Update Checker code */
var version_scriptURL = "http://userscripts.org/scripts/source/57973.user.js"; // Change this URL to point to a permanent copy of your own script.
var version_timestamp = 1257830476980; // Used to differentiate one version of the script from an older one. Use the Date.getTime() function to get a value for this.
if(parseInt(GM_getValue("lastUpdate","0"))+86400000<=(new Date().getTime())){GM_xmlhttpRequest({method:"GET",url:version_scriptURL+"?"+new Date().getTime(),headers:{'Cache-Control':'no-cache'},onload:function(xhrResponse){GM_setValue("lastUpdate",new Date().getTime()+"");if(parseInt(/version_timestamp\s*=\s*([0-9]+)/.exec(xhrResponse.responseText)[1])>version_timestamp){if(confirm("There is an update available for the Greasemonkey script \""+xhrResponse.responseText.split("@name")[1].split("\n")[0].replace(/^\s+|\s+$/g,"")+".\"\nWould you like to go to the install page now?")){GM_openInTab(version_scriptURL);}}}});}
/* End Script Update Checker code */



(function() {
	
	// Add the links here, format is "LINK@LINK NAME",
	var linkList = [
		"http://www.gaiaonline.com/forum/myposts/@My Posts",
		"http://www.gaiaonline.com/forum/mytopics/@My Topics",
		"http://www.gaiaonline.com/forum/subscription/@Subscribed Threads",
		"http://www.gaiaonline.com/avatar@My Avatar",
		"http://www.gaiaonline.com/inventory@My Inventory",
		"http://www.gaiaonline.com/guilds/index.php?gmode=myguilds@My Guilds",
		"http://www.gaiaonline.com/forum/subscription/@Subscribed Threads",
	];

	// Don't edit below here unless you know what you're doing!
	
	// Create the button
	$('<li class="needMoreCash gc_shortcuts"><a href="#" style="background-image: url(http://pie.indeedle.com/nti5c6.png); width: 53px;" id="gc_clicker"><span>Shortcuts</span></a><ul id="gleo_shortcuts_menu" style="list-style: none;margin: 0;position: absolute;top: -999em;white-space: nowrap;display:block;left: -1px;background:url(\'/images/gaia_global/gaia_footer/default-skin/bg_ft_menubody_242x400.gif\') bottom;width:150px;padding:2px;z-index:2500;"></ul></li>').insertBefore('div.accountCurrency ul li.ending_edge');

	// Style it
	lgs_addGlobalStyle("#gleo_shortcuts_menu a:link,#gleo_shortcuts_menu a:visited { color:#526779!important; } .gc_shortcuts { overflow:visible!important; } #gleo_shortcuts_menu li a:link,#gleo_shortcuts_menu li a:visited { white-space: nowrap!important;background:none!important;font-size:11px!important;color:darkblue!important;width:150px!important;margin-top:-2px!important;} #gleo_shortcuts_menu li a:hover { background-color:#F6A838!important; color: #fff!important;}");
	
	// Add the defined links
	for (var i=0; i<linkList.length; i++)
	{
		var sLink = linkList[i].split("@", 2);
		$('#gleo_shortcuts_menu').append('<li style="padding-bottom:4px;display:block;white-space: nowrap;"><a href="' + sLink[0] + '" style="">' + sLink[1] + '</a></li>');
	}
	
	var click0 = false;
		
	// When it's clicked let's manage it
	$('.gc_shortcuts').click(function(){
		if(!click0){
			$('#gleo_shortcuts_menu').css({'top': '25px', 'margin-left': '103px'});
			$('#gc_clicker').css({'background':"url('http://pie.indeedle.com/e82zfg.png')"});
			click0 = true;
		}
		else{
			$('#gleo_shortcuts_menu').css({'top': '-999em', 'margin-left': '200px'});
			$('#gc_clicker').css({'background':"url('http://pie.indeedle.com/nti5c6.png')"});
			click0 = false;
		}
	});
	
	
}());

function lgs_addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

