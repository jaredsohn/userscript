// ==UserScript==
// @name           Broken Salon
// @namespace      tech.nimbus.fi
// @description    Repair salon.com "Continue Reading" links and cartoon pages.
// @include        http://www.salon.com/*
// ==/UserScript==

var TN = TN || {};

/* Fix Broken Salon */
TN.BrokenSalon = {
    debug: false,  // are we debugging?

    /** init()
     *
     *  Initialize fixes. Comment out the fixes you do not want.
     */
    init: function() {
        // Check environment
        if (!GM_addStyle || !document || !document.getElementsByTagName || !document.getElementById) return;

        // Repair continue reading links
        TN.BrokenSalon.repairContinueReading();

        // Repair cartoon pages
        // This is now (2009-12-21) repaired in Salon.com.
        // TN.BrokenSalon.repairCartoons();
    },

    /** repairCartoons()
     *
     *  Repair the cartoon pages.
     */
    repairCartoons: function() {
        var comic = document.getElementById('comicsImage');
        if (!comic) return;
        GM_addStyle(<><![CDATA[

            DIV#col1, DIV#col1 {
                display: block;
                margin: 0;
                padding: 0;
                border: 0;
                width: 100%;
                overflow: visible;
            }

            DIV.sbody > DIV.story_preview > DIV,
            DIV.sbody > DIV.story_preview > SPAN,
            DIV.sbody > DIV.story_preview > A {
                display: none;
            }

            IMG#comicsImage {
                display: block;
                position: relative;
                z-index: 1000001;
                max-width: 1000001px;
                max-height: 1000001px;
            }

        ]]></>.toString());
        GM_addStyle('IMG#comicsImage { width: '+ comic.naturalWidth +'px !important; height: '+ comic.naturalHeight +'px !important; }');
        if (TN.BrokenSalon.debug) alert('repairCartoons done!');
    },

    /** repairContinueReading()
     *
     *  Repair the continue reading links.
     */
    repairContinueReading: function() {
        links = TN.DOM.getElementsByClass('continue_reading', document, 'A');
        if (!links) return;
        for (var i = links.length; i--;) {
            parent = links[i].parentNode;
            var read_story = parent.innerHTML.match(/read_story\(([^)]*)\)/);
            var url = parent.innerHTML.match(/continue_reading" href="([^"]*)"/);
            if (!read_story || !url) return;
            var html = '';
            html += '<a class="continue_reading" href="javascript:" onclick="read_story('+ read_story[1] +'); return false;">Continue Reading Here</a>';
            html += '<br>';
            html += '<a class="continue_reading" href="'+ url[1] +'" target="_blank">Open in New Page</a>';
            parent.innerHTML = html;
        }
        if (TN.BrokenSalon.debug) alert('repairContinueReading done!');
    }
};

/* Some DOM Tools */
TN.DOM = {

    /** getElementsByClass(cls, root, tag)
     *
     *  Return an array of elements that contain the given css class.
     *  Optionally limit search by root element and tag type.
     */
    getElementsByClass: function(cls, root, tag) {
        root = root || document;
        tag = tag || '*';
        if (!root.getElementsByTagName) return null;
        var classElements = new Array();
        var allElements = root.getElementsByTagName(tag);
        for (var i = allElements.length; i--;) {
            if (TN.DOM.containsClass(allElements[i], cls)) {
                classElements.push(allElements[i]);
            }
        }
        return (classElements.length) ? (classElements) : (null);
    },

    /** containsClass(obj, cls)
     *
     *  Returns true if object contains the css class.
     */
    containsClass: function(obj, cls) {
        if (!obj || !obj.className) return false;
        var str = ' ' + obj.className + ' ';
        return (str.indexOf(' ' + cls + ' ') >= 0);
    }
};

/* Initialize Broken Salon */
TN.BrokenSalon.init();

// eof
