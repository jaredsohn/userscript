// ==UserScript==
// @id            www2old|idfl
// @name          IDFL.me
// @version       20130530
// @namespace     http://idfl.me
// @icon           http://987.photobucket.com/albums/ae353/davin_2010/Blog/kaskus_logo.png
// @author        AMZMA
// @homepage      Teras
// @description   Replace www.idfl.us to idfl.me
// @include       /^http?://idfl.us/thread/*/
// @include       /^http?://idfl.us/showthread/*/
// @include       /^http?://idfl.us/post/*/
// @include       /^http?://idfl.us/group/discussion/*/
// @include       /^http?://idfl.us/show_post/*/
// @require       http://userscripts.org/scripts/source/1352.user.js
// @updateURL     http://userscripts.org/scripts/source/155101.meta.js
// @run-at        document-end
// ==/UserScript==

// Replace Interface Web
function htmlreplace(a, b, element)
{    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++)
    {
        if (nodes[n].nodeType == Node.TEXT_NODE)
        {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        }
        else
        {
            htmlreplace(a, b, nodes[n]);
        }
    }
}

htmlreplace('idfl.us/showthread.php', 'idfl.me/showthread.php');
htmlreplace('www.idfl.us/showpost.php', 'idfl.me/showpost.php');
htmlreplace('www.idfl.us/showpost.php', 'idfl.me/showpost.php');
htmlreplace('idfl.us/','www.idfl.me/');
htmlreplace('idfl.us/','www.idfl.me/');


// Replace InnerHTML

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us/showthread.php','idfl.me/showthread.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us/showpost.php','idfl.me/showpost.php');
}
var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us/showthread.php','idfl.me/showthread.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us.php','idfl.me/showpost.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us/','idfl.me/');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('idfl.us/','idfl.me/');
}

// 
// 20121228 Initial Released
// LUPA
// 20130530 Add "Selapa" domain | fix livebeta
//

// AMZ //