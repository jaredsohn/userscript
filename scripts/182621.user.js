// ==UserScript==
// @id             juick-read-more-link
// @name           juick read more link
// @version        2.3
// @author         greenjoker
// @namespace      https://juick.com/greenjoker/2648917
// @description    juick read more link
// @homepage       http://userscripts.org/scripts/show/182621
// @updateURL      https://userscripts.org/scripts/source/182621.meta.js
// @downloadURL    https://userscripts.org/scripts/source/182621.user.js
// @include        *://juick.com/
// @include        *://juick.com?*
// @include        *://juick.com/?*
// @include        *://juick.com/*/*
// @match          *://juick.com/
// @match          *://juick.com?*
// @match          *://juick.com/?*
// @match          *://juick.com/*/*
// @exclude        *://juick.com/settings*
// @run-at         window-load
// ==/UserScript==

(function(window, undefined ){

// normalized window
/*var w;
if (unsafeWindow && typeof unsafeWindow != undefined){
    w = unsafeWindow;
} else {
    w = window; 
}

// do not run in frames
if (w.self != w.top){
    return;
}*/
if (window.self != window.top){
    return;
}

var cont = document.getElementById("content"),
    msgs = cont.getElementsByTagName("article");
if (msgs.length){
    var msglast = msgs[msgs.length-1];
    while (msglast && msglast.nodeType !== 1){
        msglast = msglast.previousSibling;
    }
    if (msglast){
        var url = decodeURIComponent(window.location.toString());
        if (/.*&.*/.test(url)){
            var reurl = new RegExp('(^.*juick.com/[^?]*)[\?\b].*&(.*)', 'ig'),// http://juick.com/tag/vk?before=2647391&show=all -> http://juick.com/tag/vk/
                suf = '&' + url.replace(reurl, "$2");// -> &show=all
        }else{
            var reurl = new RegExp('(^.*juick.com/[^\?]*)[\?\b](.*)', 'ig');// http://juick.com/tag/vk?before=2647391 -> http://juick.com/tag/vk
            /.*\?[^(?:before)].*/.test(url) ? suf = '&' + url.replace(reurl, "$2") : suf = ''// -> &show=all
        }
        var lnk = url.replace(reurl, '$1'),// -> http://juick.com/tag/vk
            msgid = msglast.getAttribute('data-mid'),
            page = cont.getElementsByClassName("page")[0],
            el = document.createElement('span');
        el.innerHTML = ' | <a href="'+lnk+'?before='+msgid+suf+'">Дальше →</a>';
        while(el.firstChild){
            page.appendChild(el.firstChild);
        }
    }else{ return; }
}else{ return; }
})(window);