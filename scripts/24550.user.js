// ==UserScript==
// @name           Reload MCoOL Webmail [DEPRECATED]
// @namespace      http://technobabbl.es/
// @description    Automatically reloads the Inbox page (and only the Inbox; doesn't touch other folders or message view) of the MCoOL Webmail service every three minutes. Also adds a counter to the title showing the number of unread messages on the page.
// @include        http://wm.mcool.org:8000/_folder?*folder=inbox*
// @version        0.2.1
// ==/UserScript==

window.addEventListener( 'load',
    function() {
        setTimeout( function() {
            window.location.href = window.location.href;
        } , 180000);
        var grayrows = document.getElementsByTagName( 'tr' );
        var unreadRows = 0;
        for(i=0;i<grayrows.length;i++) {
            if(grayrows[i].getAttribute('bgcolor') == "#eeeeee") unreadRows++;
        }
        if(unreadRows == 0) { /* Do nothing */ }
        else { document.title += " (" + unreadRows + " unread)"; }
    },
true );