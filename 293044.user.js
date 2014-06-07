// ==UserScript==
// @id             juick-reply-via-jabber-client
// @name           juick reply via jabber client
// @version        2.4
// @author         greenjoker
// @namespace      https://juick.com/greenjoker/2648917
// @description    juick reply via jabber client
// @homepage       https://userscripts.org/scripts/show/293044
// @updateURL      https://userscripts.org/scripts/source/293044.meta.js
// @downloadURL    https://userscripts.org/scripts/source/293044.user.js
// @include        *://juick.com/*
// @match          *://juick.com/*
// @exclude        *://juick.com/settings*
// @run-at         window-load
// ==/UserScript==

(function(window, undefined ){

// normalized window
/*var w;
if (typeof unsafeWindow != undefined){
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

var replies = document.getElementById('replies');
if(replies){
    var msgmenus = document.getElementsByClassName('msg-menu');
}else{
    var msgmenus = document.getElementsByClassName('s');
}

if(msgmenus.length){
    var re = new RegExp('[^0-9]*([0-9]+),?([0-9]*)[^0-9]*', 'gi');// showMessageLinksDialog(2579474) -> 2579474
    var els = [],
        rid = '';
    for ( var i=0; i<msgmenus.length; i++ ){
        var el = document.createElement('a'),
            menu = msgmenus[i];
        if(replies){
            var msglnk = menu.getElementsByTagName('a')[0],
                msgattr = msglnk.getAttribute('onclick'),
                msgid = msgattr.replace(re, '$1');// -> 2579474
                /.*,.*/.test(msgattr) ? rid = msgattr.replace(re, '$2') : rid = '';// -> 2579474/15 -> 15
        }else{
            var msgid = menu.parentNode.getAttribute('data-mid');
        }
        el.className = 'reply-jab';
        el.href = 'xmpp:juick@juick.com?message;body=%23'+(rid ? msgid+'%2F'+rid : msgid)+'%20';
        el.title = 'Ответить через jabber клиент';
        el.style.cssText = 'background:url(\'//static.juick.com/toolbar-icons.png\') no-repeat -112px 0; width:16px; height:16px; display:inline-block; margin:0 0 0 15px;';
        if(replies){el.style.margin = '15px 0 0';}
        els.push(el);
        menu.appendChild(els[i]);
    }
}else{ return; }
})(window);