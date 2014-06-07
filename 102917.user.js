// ==UserScript==
// @name           UTM-Remover
// @namespace      http://userscripts.org/users/MMM
// @description    Remove UTM from address bar and links.
// @author         MattyMattMatt
// @version        1.1
// @include        *
// Excluding gmail as it will not load with script as pointed out by nascent at userscripts
// @exclude        https://mail.google.com/*
// ==/UserScript==

var src = function()
{
    // if you want to disable the tracking, leave it as TRUE, otherwise, set it to FALSE
    removeFromAnchors = true;
    loc = window.location.href;
    if(loc.indexOf('utm_') != -1)
    {
	window.location.href = loc.substr(0, loc.search(/[?&#]utm_/));
    }
    if(removeFromAnchors)
    {
	anchors = document.getElementsByTagName('a');
	for(i=0; i < anchors.length; i++)
	{
	    item = anchors[i];
	    loc = item.getAttribute('href');
	    if(loc.indexOf('utm_') != -1)
	    {
		item.setAttribute('href', loc.substr(0, loc.search(/[?&#]utm_/)));
	    }
	}
    }
};

function contentEval(source)
{
    if ('function' == typeof source)
    {
	source = '(' + source + ')();';
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval(src);