// ==UserScript==
// @name           Tumblr Sidebr
// @namespace      http://zetx.tumblr.com/
// @description    Restores your default tumblelog's sidebar to the dashboard. 
// @version        4
// @include        http://www.tumblr.com/dashboard*
// @include        http://www.tumblr.com/likes*
// ==/UserScript==

/*

(C) 2011 Caleb Leung
Creative Commons Attribution-ShareAlike 3.0 Unported License (http://creativecommons.org/licenses/by-sa/3.0/)

Shout-outs to: osc-rwar, cutlerish, atesh

*/

// CHANGE THE NUMBER BELOW TO MANUALLY SET YOUR SIDEBR (1 = Tumblr default)
var tumblelogNum = 1;

function setCookie(cookieName, val, del)
{
	var today = new Date();
	today.setTime(today.getTime());
	var expires = new Date(today.getTime() + 157680000000 );
	
	document.cookie = cookieName + " = " + val +
		";expires=" + (del ? -1: expires.toGMTString()) +
		";path=/" +
		";domain=tumblr.com";
}

function getCookie(cookieName)
{
	var relevantCookies = [];
	var cookieRegExp = /sidebr/g;
	var match;
	var numCookies = 0;
	var cookies = document.cookie;
	 
	while ((match = cookieRegExp.exec(cookies)) != null) 
	{
		match = cookies.substring(match.index);
		relevantCookies[numCookies] = match.split('=');
		if (relevantCookies[numCookies][1].indexOf(';') > 0) 
			relevantCookies[numCookies][1] = relevantCookies[numCookies][1].substring(0,relevantCookies[numCookies][1].indexOf(';'));
		numCookies++;
	}


	for (var i = 0; i < relevantCookies.length; i++)
		if (relevantCookies[i][0] == cookieName) return relevantCookies[i][1];
	return 1;
}

function embedElement(element, toEmbed, exec)
{
	var tag = document.createElement(element);
	tag.textContent = toEmbed.toString();
	if (exec) tag.textContent = "(" + tag.textContent + ")();";
	document.body.appendChild(tag);
}

function initExtras()
{	
	var style = ' \
	#sidebr-ui \
	{ \
		font-family: "Arial Unicode MS", "Lucida Grande"; \
		color: #95A6BD; \
		margin-top: 10px; \
	} \
	#sidebr-ui a \
	{ \
		cursor: pointer; \
		text-decoration: none; \
		font-weight: bold; \
		color: #95A6BD; \
	} \
	.sidebr-radar \
	{ \
		bottom: 250px; \
	} \
	.sidebr-info \
	{ \
		background: rgba(0, 0, 0, 0.1); \
		text-align: left; \
		margin-top: 5px; \
	} \
	.sidebr-ecks \
	{ \
		position: relative; left: 20px; float: right; color: rgb(168, 177, 186); text-decoration: none; font-weight: bold; background: url("/images/dashboard_controls/icons_sprite.png?2") repeat scroll 0pt -1000px transparent; width: 16px; height: 16px; cursor: pointer;\
		opacity: 1%; \
	}';

	embedElement("script", setCookie, false);
	embedElement("script", getCookie, false);	
	embedElement("style", style, false);
}

function postExtras(rc)
{
	var removeSides = 1;
	var sidebrEcks = {
	
		num : 0,
		createLink : function() {
			var link = document.createElement('a');
				link.setAttribute('class', 'sidebr-ecks');
				link.setAttribute('id', 'sidebr-ecks'+this.num);
				link.setAttribute('style', 'opacity: 0');
				link.setAttribute('onMouseOver', '$("sidebr-ecks'+this.num+'").setOpacity(1)');
				link.setAttribute('onMouseOut', '$("sidebr-ecks'+this.num+'").setOpacity(0)');
				link.setAttribute('onClick', 'new Effect.Fade("sidebr'+this.num+'");setCookie("sidebr'+this.num+'", "0", false)');
				link.setAttribute('title', 'Hide');
			return link;
		}
	}
	var insertLink = "";
	
	
	for (var i = 0; i < rc.getElementsByTagName('ul').length; i++)
	{
		rc.getElementsByTagName('ul')[i].setAttribute('onMouseOver', '$("sidebr-ecks'+removeSides+'").setOpacity(1)');
		rc.getElementsByTagName('ul')[i].setAttribute('onMouseOut', '$("sidebr-ecks'+removeSides+'").setOpacity(0)');	
		
		rc.getElementsByTagName('ul')[i].setAttribute('id', 'sidebr'+removeSides);
		sidebrEcks.num = removeSides;
		insertLink = sidebrEcks.createLink();
		rc.getElementsByTagName('ul')[i].insertBefore(insertLink, rc.getElementsByTagName('ul')[i].firstChild);
		removeSides++;
	}
	
	// Search
	rc.getElementsByTagName('form')[0].setAttribute('onMouseOver', '$("sidebr-ecks'+removeSides+'").setOpacity(1)');
	rc.getElementsByTagName('form')[0].setAttribute('onMouseOut', '$("sidebr-ecks'+removeSides+'").setOpacity(0)');

	sidebrEcks.num = removeSides++;
	insertLink = sidebrEcks.createLink();
	insertLink.setAttribute('onClick', 'new Effect.Fade("search_form");setCookie("sidebrSearch", "0", false)');
	rc.getElementsByTagName('form')[0].insertBefore(insertLink, rc.getElementsByTagName('form')[0].firstChild);
	
	// Radar
	document.getElementById('radar_attribution').setAttribute('onMouseOver', '$("sidebr-ecks'+removeSides+'").setOpacity(1)');
	document.getElementById('radar_attribution').setAttribute('onMouseOut', '$("sidebr-ecks'+removeSides+'").setOpacity(0)');

	sidebrEcks.num = removeSides++;
	insertLink = sidebrEcks.createLink();
	insertLink.setAttribute('onClick', 'new Effect.Fade($("radar_attribution").up());setCookie("sidebrRadar", "0", false)');
	document.getElementById('radar_attribution').insertBefore(insertLink, document.getElementById('radar_attribution').firstChild);
}

function removeSections()
{
	var num = document.getElementById("right_column").getElementsByTagName('ul').length;
	
	for (var i = 1; i <= num; i++)
	{
		if (!Number(getCookie("sidebr"+i)))
			$("sidebr" + i).toggle();
	}
	
	if (!Number(getCookie("sidebrSearch")))
		$("search_form").toggle();
	if (!Number(getCookie("sidebrRadar")))
		$("radar_attribution").up().toggle();
	if (!Number(getCookie("sidebrAttached")))
		document.getElementById("right_column").setAttribute('style','display:block;position:fixed;margin-left:646px;top:91px;width:215px');
}

function detachSidebr()
{
	if (Number(getCookie("sidebrAttached")))
	{
		setCookie("sidebrAttached", "0", false);
		document.getElementById("right_column").setAttribute('style','display:block;position:fixed;margin-left:646px;top:91px;width:215px');
	}
	else
	{
		setCookie("sidebrAttached", "1", true);
		document.getElementById("right_column").setAttribute('style','');
	}
}

function deleteSettings()
{
	var num = document.getElementById("right_column").getElementsByTagName('ul').length;
	
	for (var i = 1; i <= num; i++)
		setCookie("sidebr"+i, "1", true);
		
	setCookie("sidebrSearch", "1", true);
	setCookie("sidebrRadar", "1", true);
	setCookie("sidebrAttached", "1", true);
}

function main() 
{
	var getTumblelog = document.getElementById("user_channels");
	
	var addy = "";
	var extras = Boolean(Number(getCookie("sidebrExtras")));
	initExtras();

	var container = document.createElement('ul');
	container.setAttribute('class', 'controls_section');
	container.setAttribute('id', 'sidebr');
	container.innerHTML = '<li class=""> <a href="' + addy + '" class="posts"> <div class="hide_overflow">Posts</div> <span class="count"></span> </a> </li> <!-- Followers --> <li class=""> <a href="' + addy + '/followers" class="followers"> <div class="hide_overflow">Followers</div> <span class="count"></span> </a> </li> <!-- Messages --> <li class=""> <a href="' + addy + '/messages" class="messages"> <div class="hide_overflow">Messages</div> <span class="count"></span> </a> </li> <!-- Drafts --> <li class=""> <a href="' + addy + '/drafts" class="drafts"> <div class="hide_overflow">Drafts</div> </a> </li> <!-- Queue --> <li class=""> <a href="' + addy + '/queue" class="queue"> <div class="hide_overflow">Queue</div> <span class="count"></span> </a> </li>';
	
	rc = document.getElementById("right_column");
	rc.insertBefore(container, rc.getElementsByTagName('ul')[1]);
	
	tumblelogNum--;
	addy = getTumblelog.getElementsByTagName('li')[tumblelogNum].getElementsByTagName('a')[0];
	
	var httpRequest = new XMLHttpRequest();
		httpRequest.open('GET',addy,true);
		httpRequest.setRequestHeader("Method", "GET " + addy + " HTTP/1.1");
		httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
		httpRequest.send(null);

	 httpRequest.onreadystatechange = function() {
		if (httpRequest.readyState == 4)
		{
			var defaultTumb = httpRequest.responseText;
			var tumbPost = defaultTumb.search("\<!-- Posts --\>");
			var tumbMassEd = defaultTumb.search("\<!-- Mass Post editor --\>");
			defaultTumb = defaultTumb.substring(tumbPost,tumbMassEd);
			defaultTumb = defaultTumb.replace(/class="\s*selected\s*"/,'class=\"\"');
			document.getElementById("sidebr").innerHTML = defaultTumb;

			if (extras)
			{
				postExtras(rc);
				embedElement("script", deleteSettings, false);
				embedElement("script", detachSidebr, false);
				embedElement("script", removeSections, true);
				
				var uagent = navigator.userAgent.toLowerCase();
				if (uagent.search("chrome") > -1) 
					document.getElementById("search_controls_button").setAttribute('style', 'padding-top: 19px;');
			}	
		}
	}
	
	var sidebrUI = document.createElement('div');
		sidebrUI.setAttribute('id', 'sidebr-ui');
		sidebrUI.setAttribute('align', 'right');
		sidebrUI.innerHTML = ' \
		{Sidebr: \
		<a class="sidebr-reset" title="Reset Sidebr" onclick="$(\'sidebr-reset-info\').slideDown(); deleteSettings();">&#x21bb;</a> \
		' + (!extras ? '' : '<a class="sidebr-detach" title="Detach Sidebr" onclick="detachSidebr();">&#x2198;</a>') + ' \
		<a class="sidebr-onoff" title="' + (extras ? "Disable" : "Enable") + ' Extra Features" onclick="$(\'sidebr-onoff-info\').slideDown(); setCookie(\'sidebrExtras\', ' + (extras ? 0 : 1) + ', false)">&#x233d;</a>} \
		<div id="sidebr-reset-info" class="sidebr-info" style="display:none">Sidebr Reset.<br /><a onclick="window.location.reload(false); this.up().fade();">Refresh</a> to see changes.</div> \
		<div id="sidebr-onoff-info" class="sidebr-info" style="display:none">Extras ' + (extras ? "disabled" : "enabled") + '.<br /><a onclick="window.location.reload(false); this.up().fade();">Refresh</a> to see changes.</div>';
	rc.appendChild(sidebrUI);		
}
main();