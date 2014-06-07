// ==UserScript==
// @name           ThinkComputers Video Ad Bullshit Blocker
// @namespace      http://userscripts.org/users/MMM
// @description    Seriously fuck this ad.
// @author         MattyMattMatt
// @version        1.0
// @include        http://*.thinkcomputers.org/*
// @include        http://thinkcomputers.org/*
// ==/UserScript==

var src = function()
{
    document.getElementsByClassName('widget')[0].style.display = 'none';
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