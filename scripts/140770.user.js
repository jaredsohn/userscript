// ==UserScript==
// @name Twitter Link Cleaner
// @namespace http://techiev2.com
// @description Cleans up t.co wrapped links to actual urls on Twitter pages. Also does a minimal level of formatting
// @match https://*.twitter.com/*
// @match https://twitter.com/*
// @match http://www.twitter.com/*
// @version 1.0.14
// ==/UserScript==

/*
    Author: Sriram Murali
    Script was initially present as a bookmarklet and was later converted to a Userscript.
    Source is also available on DVCS @ https://bitbucket.org/sriram_velamur/twitter-bookmarklets
    Updated: 15 Feb 2013
*/


var obj = {

    links: null,
    lUrl: null,
    meta: {
        isBitly: null,
        isInstagram: null,
        isKindle: null,
        isFlipBrd: null,
        processed: null
    },

    findLinks: function () {
        obj.links = Array.prototype.slice.apply(document.getElementsByClassName('twitter-timeline-link'));
    },

    docState: document.readyState,
    isOperatable: function () {

        "use strict";

        var valid = (obj.docState === 'complete');
        valid = (valid || obj.docState === 'interactive');
        return valid;

    },


    fixShortener: function () {

        "use strict";

        obj.meta.isBitly = (obj.lUrl.search('bit.ly/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('ow.ly/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('kiss.ly/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('on.mash.to/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('lat.ms/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('cnet.co/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('econ.st/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('j.mp/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('is.gd/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('dthin.gs/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('twb.io/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('reut.rs/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('on.mktw.net/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('on.wsj.com/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('nyr.kr/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('bbc.in/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('tcrn.ch/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('hub.am/') !== -1);
        obj.meta.isBitly = obj.meta.isBitly || (obj.lUrl.search('rww.to/') !== -1);

        obj.meta.isInstagram = (obj.lUrl.search('instagr.am') !== -1);
        obj.meta.isTwitpic = (obj.lUrl.search('twitpic.com/') !== -1);
        obj.meta.isYouTube = (obj.lUrl.search('.*?youtu.be/') !== -1);
        obj.meta.isKindle = (obj.lUrl.search('.*?amzn.com/k/') !== -1);
        obj.meta.isFlipBrd = (obj.lUrl.search('.*?flpbd.it/') !== -1);
        obj.meta.isTlGd = (obj.lUrl.search('.*?tl.gd/') !== -1);

        if (obj.meta.isBitly) {

            if (obj.lUrl.search('bit.ly/') !== -1) {
                obj.lUrl = obj.lUrl.replace('bit.ly', 'bitly.com');
            }
            if (obj.lUrl.search('kiss.ly/') !== -1) {
                obj.lUrl = obj.lUrl.replace('kiss.ly', 'bitly.com');
            }
            if (obj.lUrl.search('ow.ly/') !== -1) {
                obj.lUrl = obj.lUrl.replace('ow.ly', 'bitly.com');
            }
            if (obj.lUrl.search('lat.ms/') !== -1) {
                obj.lUrl = obj.lUrl.replace('lat.ms', 'bitly.com');
            }
            if (obj.lUrl.search('cnet.co/') !== -1) {
                obj.lUrl = obj.lUrl.replace('cnet.co', 'bitly.com');
            }
            if (obj.lUrl.search('on.mash.to/') !== -1) {
                obj.lUrl = obj.lUrl.replace('on.mash.to', 'bitly.com');
            }
            if (obj.lUrl.search('econ.st/') !== -1) {
                obj.lUrl = obj.lUrl.replace('econ.st', 'bitly.com');
            }
            if (obj.lUrl.search('j.mp/') !== -1) {
                obj.lUrl = obj.lUrl.replace('j.mp', 'bitly.com');
            }
            if (obj.lUrl.search('is.gd/') !== -1) {
                obj.lUrl = obj.lUrl.replace('is.gd', 'bitly.com');
            }
            if (obj.lUrl.search('dthin.gs/') !== -1) {
                obj.lUrl = obj.lUrl.replace('dthin.gs', 'bitly.com');
            }
            if (obj.lUrl.search('twb.io/') !== -1) {
                obj.lUrl = obj.lUrl.replace('twb.io', 'bitly.com');
            }
            if (obj.lUrl.search('reut.rs/') !== -1) {
                obj.lUrl = obj.lUrl.replace('reut.rs', 'bitly.com');
            }
            if (obj.lUrl.search('on.mktw.net/') !== -1) {
                obj.lUrl = obj.lUrl.replace('on.mktw.net', 'bitly.com');
            }
            if (obj.lUrl.search('on.wsj.com/') !== -1) {
                obj.lUrl = obj.lUrl.replace('on.wsj.com', 'bitly.com');
            }
            if (obj.lUrl.search('nyr.kr/') !== -1) {
                obj.lUrl = obj.lUrl.replace('nyr.kr', 'bitly.com');
            }
            if (obj.lUrl.search('bbc.in/') !== -1) {
                obj.lUrl = obj.lUrl.replace('bbc.in', 'bitly.com');
            }
            if (obj.lUrl.search('tcrn.ch/') !== -1) {
                obj.lUrl = obj.lUrl.replace('tcrn.ch', 'bitly.com');
            }
            if (obj.lUrl.search('hub.am/') !== -1) {
                obj.lUrl = obj.lUrl.replace('hub.am', 'bitly.com');
            }
            if (obj.lUrl.search('rww.to/') !== -1) {
                obj.lUrl = obj.lUrl.replace('rww.to', 'bitly.com');
            }

            obj.lUrl += '+';
            obj.meta.processed = true;

        }
        if (obj.meta.isInstagram) {
            obj.lUrl = obj.lUrl.replace('instagr.am', 'instagram.com');
            obj.meta.processed = true;
        }
        if (obj.meta.isTlGd) {
            obj.lUrl = obj.lUrl.replace('tl.gd', 'twitlonger.com/show');
            obj.meta.processed = true;
        }
        if (obj.meta.isTwitpic) {
            obj.lUrl += '/full';
            obj.meta.processed = true;
        }
        if (obj.meta.isYouTube) {
            obj.lUrl = obj.lUrl.replace('youtu.be/',
                                        'youtube.com/watch?v=');
            obj.meta.processed = true;
        }
        if (obj.meta.isKindle) {
            obj.lUrl = obj.lUrl.replace('amzn.com/k/',
                                        'kindle.amazon.com/post/');
            obj.meta.processed = true;
        }
        if (obj.meta.isFlipBrd) {
            obj.lUrl += "+";
            obj.meta.processed = true;
        }

    },

    replaceLinks: function () {

        "use strict";

        obj.links.map(function (elem, idx) {
            if (elem.getAttribute('data-expanded-url')) {
                obj.lUrl = elem.getAttribute('data-expanded-url');
                elem.innerHTML = obj.lUrl;
            }
            if (elem.getAttribute('data-pre-embedded') === 'true') {
                obj.lUrl = 'http://' + elem.innerHTML;

            }

            obj.fixShortener();

            if (obj.meta.processed) {
                elem.innerHTML = obj.lUrl;
            }

            elem.setAttribute('href', obj.lUrl);

            if (obj.lUrl) {
                elem.setAttribute('target', '_blank');
            }
        });
    }

};


(function () {

    "use strict";

    setInterval(function () {

        if (obj.isOperatable()) {
            obj.findLinks();
            obj.replaceLinks();
        }

    }, 20000);

}());