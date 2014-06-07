// ==UserScript==
// @name           Facebook Large Photos
// @namespace      http://trevorcreech.com/geekery/greasemonkey/facebooklargephotos
// @description    Makes profile pictures large in facebook search results
// @include        http://*.facebook.com/s.php?q=*
// @include        http://facebook.com/s.php?q=*
// ==/UserScript==

// Based on Photos.com Images Watermark Remover: http://userscripts.org/scripts/review/19747
//addGlobalStyle function from Dive Into Greasemonkey: http://diveintogreasemonkey.org/patterns/add-css.html

addGlobalStyle('.ubersearch .result .info dl,.ubersearch .result .info dt,.ubersearch .result .info dd{margin:0px 0px 0px 50px;padding:0px;}');

// Find image
var imgs = document.getElementsByTagName('img');
for (i=0;i<imgs.length;i++)
{
	if (imgs[i].className=='photo')
	{
		imgs[i].src = imgs[i].src.replace(/\/s/,'/n');
	}
}

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}


