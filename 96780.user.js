// ==UserScript==
// @name           GawkerRedir
// @namespace      http://userscripts.org/users/MMM
// @description    Redirects Gawker sites to a subdomain which still uses the old, better layout.
// @author         MattyMattMatt (http://lifehacker.com/people/h4x0r3d.1337)
// @include        http://lifehacker.com/*
// @include        http://kotaku.com/*
// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://jezebel.com/*
// @include        http://gizmodo.com/*
// @include        http://jalopnik.com/*
// @include        http://fleshbot.com/*
// @include        http://lifehacker.com/*
// @include        http://kotaku.com/*
// @include        http://gawker.com/*
// @include        http://deadspin.com/*
// @include        http://jezebel.com/*
// @include        http://gizmodo.com/*
// @include        http://jalopnik.com/*
// @include        http://fleshbot.com/*
// @include        http://io9.com/*
// @Chrome         FFS, just use include. Stop being special.
// @match          http://lifehacker.com/*
// @match          http://kotaku.com/*
// @match          http://gawker.com/*
// @match          http://deadspin.com/*
// @match          http://jezebel.com/*
// @match          http://gizmodo.com/*
// @match          http://jalopnik.com/*
// @match          http://fleshbot.com/*
// @match          http://lifehacker.com/*
// @match          http://kotaku.com/*
// @match          http://gawker.com/*
// @match          http://deadspin.com/*
// @match          http://jezebel.com/*
// @match          http://gizmodo.com/*
// @match          http://jalopnik.com/*
// @match          http://fleshbot.com/*
// @match          http://io9.com/*
// ==/UserScript==

var src = function()
{
    //Change the UK to CA if it stops working or for some aestethic reason you prefer one over the other (won't work for Gawker).
    lh = 'ca.';
    ko = 'ca.';
    ga = 'ca.';
    ds = 'ca.';
    jez = 'ca.';
    giz = 'ca.';
    j = 'ca.';
    fb = 'ca.';
    io = 'ca.';
    site = window.location.host;
    article = window.location.href;
    article = article.substring(article.indexOf('.com')+4, article.length);
    article = article.replace('#!','/');
    if (article.indexOf('?') != -1)
    {
	if((colon = article.indexOf(':')) != -1)
	{
	    comment = article.substring(article.indexOf('=')+1,colon) + '/#c' + article.substring(colon+1,article.length);
	}
	else
	{
	    comment = article.substring(article.indexOf('=')+1,article.length);
	    comment = comment + '/#c' + comment
	}
	article = '/comment/' + comment;
    }
    else if (isNaN(article.charAt(2)))
    {
	article = '/tag' + article;
	article = article.replace('/forum','');
    }
    sites = {
	'lifehacker.com': lh,
	'kotaku.com': ko,
	'gawker.com': ga,
	'deadspin.com': ds,
	'jezebel.com': jez,
	'gizmodo.com': giz,
	'jalopnik.com': j,
	'fleshbot.com': fb,
	'io9.com': io
    };
    window.location.href = 'http://' + sites[site] + site + article;
};

function contentEval(source)
{
    if ('function' == typeof source)
    {
	source = '(' + source + ')();'
    }
    var script = document.createElement('script');
    script.setAttribute("type", "application/javascript");
    script.textContent = source;
    document.body.appendChild(script);
    document.body.removeChild(script);
}
contentEval(src);