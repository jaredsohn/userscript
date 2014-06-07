// ==UserScript==
// @id             test_google_search_hack
// @name           Test Google Redirection To Hacking website
// @namespace      
// @description    Remove redirection and click-tracking in Google hack results.
// @author         
// @homepage       
// @version        0.8.6
// @include        http*://www.google.*/
// @include        http*://www.google.*/url?q=*
// @include        http*://www.google.*/#hl=*
// @include        http*://www.google.*/search*
// @include        http*://www.google.*/webhp?hl=*
// @include        https://encrypted.google.com/
// @include        https://encrypted.google.com/#hl=*
// @include        https://encrypted.google.com/search* 
// @include        https://encrypted.google.com/webhp?hl=*
// @include        http://ipv6.google.com/
// @include        http://ipv6.google.com/search*
// @exclude        *tbm=pts*
// @exclude        *tbm=shop*
// @exclude        *tbm=bks*
// @exclude        *tbm=isch*
// @updateURL      
// @run-at         document-start
// ==/UserScript==

/*
 * DESCRIPTION:
 * 
 * This script disable click-tracking and redirection in Google search results,
 * and restore the result url from
 *      "http://www.google.com/url?url=http://example.com" 
 * to 
 *      "http://example.com"
 *
 * Now Support both http and https search, instant-on and instant-off search.
 */

/*
 * UserScripts are running in the sandbox, so we don't need to put it in an
 * annoymous function.
 */
var dangoGoogleRR = (function () {
    /* Shorthand for document.getElementById */
    function _$(id) { return document.getElementById(id); };

    /* Shorthand for decodeURIComponent method */
    var _dec = decodeURIComponent;

    /* Logs the information in the result state area */
    function _logger(msg) {
        var state = _$('dangoGRRState');

        /* Creates first if not exist */
        if (state == null) {
            state = document.createElement('span');
            state.id = 'dangoGRRState';

            _$('resultStats').appendChild(state);
        }

        state.innerHTML = ' >> ' + msg;
    }

    /* 
     * Do real clean work on specified link.
     *
     * Removes click-tracking and restores redirection URL to original one if need.
     */
    function _doClean(link) {
        /* Click-tracking is bind on mousedown event. */
        var track = link.getAttribute('onmousedown');

        /* Redirection URL's regular expression */
        var rredirect = /\/url\?(?:url|q)=([^&]*)/i;

        /* Real image URL's regular expression */
        var rrealimg = /imgurl=([^&]*)/i;

        /*
         * If the link contains click-tracking code, we should remove it.
         * Otherwise, the link that is a redirection or image URL also need to be
         * restored to the original one.
         */
        if (track && track.indexOf('return rwt(') != -1) {
            link.removeAttribute('onmousedown');
        } else if (rredirect.test(link.href)) {
            link.href = _dec(link.href.match(rredirect)[1]);
        } else if (rrealimg.test(link.href)) {
            link.href = _dec(link.href.match(rrealimg)[1]);
        } else if (link.id == 'rg_hl' || link.id == 'rg_hta') {
            link.setAttribute('target', '_blank');
        }
    }

    /*
     * Removes redirection in search results.
     */
    function _removeRedirect() {
        /* Saves the start time */
        var start = (new Date()).getTime();

        /* Queries all result links */
        var links = document.querySelectorAll('#res .g a'), 
            len = links.length;

        /* Iterates each link that found in the result and clean */
        for (var i = 0; i < len; i++) { _doClean(links[i]); }

        /* Print the logger */
        _logger('DangoGoogleRR have processed ' + len + ' links in ' 
            + ((new Date()).getTime() - start) + 'ms. ');
    }

    /* 
     * Removes redirection in search results until the Instant Search is
     * complete. That means all results are showed in the page.
     */
    function _delayRemoveRedirect(event) {
        /*
         * Web page is loading from top to bottom, so we choose an element 
         * that is located after the result lists and will change in one search.
         * The foot (div#xfoot) element meets both requirements. 
         *
         * DOM Mutation Events can detect whether a dom element is changed.
         *
         * DOMAttrModified event is more effecient here, but this event is not
         * well supported by every browsers. So, we should handle other event
         * types here.
         */
        if (event.type == 'DOMAttrModified') {
            if (event.target.id === 'xfoot' && event.newValue == '') {
                _removeRedirect();
                event.stopPropagation();
            }
        } else { // Other mutation events like DOMNodeInserted
            if (event.relatedNode.id == 'xfoot') {
                _removeRedirect();
                event.stopPropagation();
            }
        }
    }

    return {
        /* Listens specified events and handle it */
        listen: function () {
            /* The name of mutation event that will be listened */
            var mutationEvtName = 'DOMAttrModified';

            /* 
             * Listens DOMContentLoaded event in normal search, this event will
             * not fire in Instant Search.
             */
            if (location.pathname == '/search') {
                window.addEventListener("DOMContentLoaded", _removeRedirect, false);
            }

            /* 
             * DOMAttrModified event will only fire when you modify one 
             * elements' attribute with the native setAttribute method in
             * Chrome. So we need to select an alternative method here.
             */
            if (window.chrome) {
                mutationEvtName = 'DOMNodeInserted';
            }

            /*
             * Listen the specified mutation event in document object, but we
             * use event delegate here.This will save a lot of unnecessary
             * performance overhead.
             */
            document.addEventListener(mutationEvtName, _delayRemoveRedirect, false);
        }
    };
})();

/* Listens events here */
dangoGoogleRR.listen();