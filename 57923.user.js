// ==UserScript==
// @name           Monopoly City Street TOOLS
// @namespace      http://mcsclans.com/
// @description    Monopoly City Street TOOLS
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @version        0.6
// ==/UserScript==

// copyright       Monopoly City Street Clans (c) 2009
// homepage        http://mcsclans.com/
// blog            http://mcsclans.blogspot.com/
// twitter         http://twitter.com/mcsclans

function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	style = document.createElement('link');

	style.type = 'text/css';
	style.rel = 'stylesheet';
	style.href = css;
	head.appendChild(style);
}

function addInlineJavascript(content)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
    script.innerHTML = content.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
	head.appendChild(script);
}

function addJavascript(src)
{
	var head, script;
	head = document.getElementsByTagName('head')[0];
	if (!head) return;

	script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = src;
	head.appendChild(script);
}

function init()
{
	var TOOLCONFIG = 
	{
		url: 'http://mcsclans.com/js/',
		version: '0.6.81',

		// update - 6 hour
		updateinterval: 21600, 
		unixtime: parseInt(new Date().getTime().toString().substring(0, 10))
	};

    if (typeof (MCS) == 'undefined' || MCS.getPlayerData() == null) {
        window.setTimeout("init()", 1000);
        return;
    }
	var rotate = TOOLCONFIG.unixtime - (TOOLCONFIG.unixtime % TOOLCONFIG.updateinterval)
	addJavascript(TOOLCONFIG.url + 'MonopolyCityStreetToolsInit.js?v=' + TOOLCONFIG.version + '&gm=1&rotate=' + rotate);
}

addInlineJavascript(addJavascript);
addInlineJavascript(init);

init();
