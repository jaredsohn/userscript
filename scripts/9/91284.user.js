// ==UserScript==
// @name           Highlight today events (facebook)
// @version        1.0
// @description    
// @author         Tony White


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

    const script_id = 49585;
    const script_version = '1.0';

    const highlightColor = '#41EEEA';

    function formatEvents()
    {
        if (events = d.querySelectorAll('#events_upcoming span.visible')[0]) {

            if (events.className.indexOf(gm_class) <= 0) {
                events.className += gm_class;
            } else {
                return false;
            }

            var links = events.getElementsByTagName('a');

            if (links.length <= 2) {
                return;
            }

            var birthday = links[0].innerHTML;

            var html = '';

            for (var i = 1; i < links.length; i++) {
                html += '<div class="highlight">' + birthday + ': <a href="' + links.item(i) + '" >' + links.item(i).innerHTML + '</a></div> ';
            }

            events.innerHTML = html;

            delete events, links, birthday, html;
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

    addStyle(' #events_upcoming span.visible { background: ' + highlightColor + '; border-bottom: 1px solid #FFE222; display: block; margin: -1px 0 3px; padding: 1px 2px; }');
    addStyle(' span.visible a[href="/?sk=bd"] { display: none; }');

    formatEvents();

    if (home_stream = d.getElementById('content')) {
        setTimeout ( function () {
            var t; // timeout
            home_stream.addEventListener("DOMNodeInserted", function () { clearTimeout(t); t = setTimeout(formatEvents, 1000); }, false);
        }, 1500);

        if (typeof autoUpdate == 'function') {
            autoUpdate (script_id, script_version);
        }

    }

})(document);