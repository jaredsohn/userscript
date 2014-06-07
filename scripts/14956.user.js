// ==UserScript==
// @name           twitter favicon changer
// @namespace      http://oquno.com/
// @description    change twitter favicon to user icon
// @include        http://twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==
(function(){
    $(document).ready(function(){
        $(document).bind('DOMNodeInserted',function (){
            var src;
            var icon = $('h2.dashboard-profile-title img');
            if (icon.length > 0){
                src = icon[0].src;
            } else {
                src = 'http://twitter.com/phoenix/favicon.ico';
            }

            var icon = $('link[rel="shortcut icon"]')[0];
            if (icon.href != src){
                /* thanks to os0x! http://oquno.com/log/eid1947.html#comments */ 
                var f = icon.cloneNode(false);
                f.href = src;
                var head = icon.parentNode;
                head.removeChild(icon);
                head.appendChild(f);
            }
        });
    });
})();
