// ==UserScript==
// @name           facebook.com - Highlight today events (birthdays)
// @version        1.2.1
// @description    Highlight today events (birthdays)

// @namespace      http://Kub4jz.cz
// @author         Kub4jz.cz <kub4jz@gmail.com>

// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @match          http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          https://www.facebook.com/*

// @exclude        http://*.facebook.com/sharer*
// @exclude        http://*.facebook.com/ajax/*
// @exclude        http://*.facebook.com/plugins/*

// @exclude        http://apps.facebook.com/*
// @exclude        http://*facebook.com/apps/*
// ==/UserScript==

(function(d){

    const gm_class = ' gm_highlight_events';

    const script_id = 49585,
          script_version = '1.2.1';

    const highlightColor = '#FFF8CC';

    function formatEvents()
    {
        var content;

        if (content = d.getElementById('rightCol')) {

            if (events = content.querySelector('#events_upcoming span.visible')) {

                if (events.className.indexOf(gm_class) >= 0) {
                    return false;
                }

                events.className += gm_class;

                var links = events.getElementsByTagName('a');

                if (links.length <= 2) {
                    return;
                }

                var birthday = links[0].innerHTML;

                var html = '';

                for (var i = 1; i < links.length; i++) {
                    html += ''
                        + '<div class="highlight">'
                        +     birthday . ': '
                        +     '<a href="' + links[i] + '" >'
                        +       links[i].innerHTML
                        +     '</a>'
                        + '</div> ';
                }

                events.innerHTML = html;

                delete events, links, birthday, html;
            }
        }

        return false;
    }

    function addStyle(css) {
    	if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
    	else if (heads = d.getElementsByTagName('head')) {
    		var style = d.createElement('style');
    		try { style.innerHTML = css; }
    		catch(x) { style.innerText = css; }
    		style.type = 'text/css';
    		heads[0].appendChild(style);
    	}
        return false;
    }


    /* Start script */
    formatEvents();

    addStyle(
       ' #events_upcoming .visible{background:' + highlightColor + ';border-bottom:1px solid #FFE222;display:block;margin:-1px 0 3px;padding:1px 2px;}'
      +' .visible a[href="/events/birthdays/"]{display: none;}'
    );


    if (home_stream = d.getElementById('content')) {
        setTimeout (function () {
            var t; // timeout
            home_stream.addEventListener(
                "DOMNodeInserted",
                function () {
                    clearTimeout(t);
                    t = setTimeout(formatEvents, 500);
                },
                false
            );
        }, 2000);

        /* AutoUpdater */
        if (typeof autoUpdate == 'function') {
            autoUpdate (script_id, script_version);
        }
    }

})(document);