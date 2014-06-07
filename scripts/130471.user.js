// ==UserScript==
// @name           facebook.com - link unmangler
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @run-at document-start
// ==/UserScript==

document.addEventListener('DOMNodeInserted',
    function(e){ 
        e=e.srcElement;
        if(e.nodeType!=1)return;
        a=e.querySelectorAll('a[href^="/connect/uiserver.php"]');
        for(i in a)if(a[i].href)a[i].href=unescape(a[i].href.replace(/^.+redirect_uri=(.*?)&/,'$1'));
        a=e.querySelectorAll('a[onmousedown^="UntrustedLink.bootstrap"]');
        for(i in a)if(a[i].setAttribute)a[i].setAttribute('onmousedown','');
        a=e.querySelectorAll('a[href^="http://apps.facebook.com/wpsocialreader/"] .blueItemLink');
        for(i in a)if(a[i].parentNode)a[i].parentNode.parentNode.parentNode.href='https://www.google.com/search?btnI=1&q="'+escape(a[i].textContent)+'"';
    },false
);