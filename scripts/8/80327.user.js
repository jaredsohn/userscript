// ==UserScript==
// @name           oc.at custom date post position
// @namespace      oc.at
// @description    Shows the date of posts at a configurable position
// @include        http://*.overclockers.at/*
// ==/UserScript==

// jQuery loading from http://joanpiedra.com/jquery/greasemonkey/

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { $ = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
        if (typeof $ == 'function') {

            // chose with which variant to render the new position of the date
            // 1 - part of the title, in bold
            // 2 - before the titel, not bold
            // 3 - right aligned at the post; after the title
            // 4 - above username
            var variant = 4;

            var domDate = [];
            var domUser = [];

            // accumulate all dates into one array; order is important
            $('div.sf').each( function() {
                if ( $('img[alt="Old Post"]', this).length > 0 ) {
                    domDate.push( this );
                } else if ( $('img[alt="New Post"]', this).length > 0 ) {
                    domDate.push( this );
                }
            } );

            // for each date the appropriate heading (given by its index)
            var domHeading = [];
            switch (variant) {
                case 1:
                    domHeading = $('a.cat strong');
                    break;
                case 2:
                case 3:
                    domHeading = $('a.cat');
                    break;
                case 4:
                    domUser = $('a[name] + div.nf');
                    break;
            }

            // the number of date entries found must absolutely match the
            // headings, or something is really foobar
            if (variant < 4 && domDate.length != domHeading.length) {
                return;
            }
            if (variant == 4 && domDate.length != domUser.length) {
                return;
            }

            for ( var i = 0, l = domDate.length; i < l; i++) {
                var datum = $.trim( $(domDate[i]).text() );
                var title = $.trim( $(domHeading[i]).text() );

                switch (variant) {

                    case 1:
                        if (title.length == 0) {
                            $(domHeading[i]).text( datum );
                        } else {
                            $(domHeading[i]).text( datum + ': ' + title);
                        }
                        break;

                    case 2:
                        $(domHeading[i]).before(datum + ' ');
                        break;

                    case 3:
                        $(domHeading[i]).before('<div style="float: right;">' + datum + '</div>');
                        break;

                    case 4:
                        $(domUser[i]).before('<div class="sf" style="">' + datum + '</div><br /><br />');

                }

                $(domDate[i]).text('');
            }
        }
    }


