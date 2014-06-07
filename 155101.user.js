// ==UserScript==
// @id            www2old|kaskus
// @name          Y̶e̶t̶ ̶A̶n̶o̶t̶h̶e̶r̶ Old Kaskus Link
// @version       20130530
// @namespace     http://old.kaskus.co.id
// @icon           http://987.photobucket.com/albums/ae353/davin_2010/Blog/kaskus_logo.png
// @author        AMZMA
// @homepage      Teras
// @description   Replace www.kaskus to old.kaskus + livebeta + selapa
// @include       /^https?://(|www\.)kaskus.co.id/thread/*/
// @include       /^https?://(|www\.)kaskus.co.id/lastpost/*/
// @include       /^https?://(|www\.)kaskus.co.id/post/*/
// @include       /^https?://(|www\.)kaskus.co.id/group/discussion/*/
// @include       /^https?://(|www\.)kaskus.co.id/show_post/*/
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

htmlreplace('www.kaskus.us/showthread.php', 'old.kaskus.co.id/showthread.php');
htmlreplace('www.kaskus.us/showpost.php', 'old.kaskus.co.id/showpost.php');
htmlreplace('www.kaskus.co.id/showthread.php', 'old.kaskus.co.id/showthread.php');
htmlreplace('www.kaskus.co.id/showpost.php', 'old.kaskus.co.id/showpost.php');
htmlreplace('livebeta.kaskus.co.id/','www.kaskus.co.id/');
htmlreplace('livebeta.kaskus.us/','www.kaskus.co.id/');


// Replace InnerHTML

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('www.kaskus.us/showthread.php','old.kaskus.co.id/showthread.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('www.kaskus.us/showpost.php','old.kaskus.co.id/showpost.php');
}
var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('www.kaskus.co.id/showthread.php','old.kaskus.co.id/showthread.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('www.kaskus.co.id/showpost.php','old.kaskus.co.id/showpost.php');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('livebeta.kaskus.co.id/','www.kaskus.co.id/');
}

var aEls = document.getElementsByTagName('a');
for (var i = 0, aEl; aEl = aEls[i]; i++) {
	aEl.href = aEl.href.replace('livebeta.kaskus.us/','livebeta.kaskus.co.id/');
}

// 
// 20121228 Initial Released
// LUPA
// 20130530 Add "Selapa" domain | fix livebeta
//

// AMZ //