// ==UserScript==
// @name           faviconize
// @namespace      http://d.hatena.ne.jp/janus_wel/
// @description    insert favicon.ico accordance with SITEINFO
// ==/UserScript==
/*
 * VERSION
 *  1.02
 *
 * LICENSE
 *  New BSD License
 *
 * ACKNOWLEDGMENT
 *  this script based on fav.icio.us2, 'Favicon with Google',
 *  'Favicon with Hatena Bookmark', AutoPagerize and many others !!
 *
 *  refer:
 *      - http://userscripts.org/scripts/show/3406
 *      - http://june29.jp/2006/10/18/favicon-greasemonkey/
 *      - http://userscripts.org/scripts/show/8551
 *      - http://wedata.net/
 *
 * HISTORY
 *  2008/09/07  ver. 0.10   - initial written.
 *  2008/09/08  ver. 0.11   - fix the bug that display a lot of favicon
 *                            on AutoPagerize load.
 *  2008/09/09  ver. 0.20   - cache results of existence check.
 *                          - break off changing 'class' attribute.
 *  2008/09/10  ver. 0.21   - check responseText when existence check.
 *                          - refactoring.
 *  2008/09/11  ver. 0.30   - the existence check use the change
 *                            some attributes of "img" element.
 *                          - refactoring (apply Singleton and
 *                            Factory Method and Observer Pattern ?).
 *                          - add feature that display
 *                            AutoPagerize SITEINFO on flag.
 *  2008/09/14  ver. 0.31   - bugfix: singleton object.
 *                          - trimming weight of addDcoumentFilterToAP
 *                            and addFilterToAP.
 *                          - define and use Function.prototype.bind.
 *  2008/09/16  ver. 0.40   - change SITEINFO.
 *                          - change image and style.
 *                          - refactoring.
 *  2008/09/17  ver. 0.50   - add command that toggle AutoPagerize
 *                            information display to Greasemonkey menu.
 *                          - add receiver for 'GMFaviconizeToggle'
 *                            CommandEvent that toggle AutoPagerize
 *                            information display.
 *  2008/09/18  ver. 1.00   - work togather with wedata.net.
 *                          - add command that clear SITEINFO cache.
 *                          - add receiver for 'GMFaviconizeClearCache'
 *                            CommandEvent that clear SITEINFO cache.
 *                          - refactoring.
 *  2008/09/20  ver. 1.01   - fix the bug that not display favicon on
 *                            status 200 at existence check.
 *                            use response.finalUrl: from Greasemonkey 0.8
 *                          - change loading icon to regular one.
 *  2010/07/29  ver. 1.02   - fix the bug to execute procedures three times
 *                            when the SITEINFO cash is expired.
 * */

(function() {

// constants ------------------------------------------------------------
// for development
const DEBUG = false;

// this definitions are given priority in SITEINFO application
const SITEINFO = [
/* template
    {
        name:           '',
        applyURL:       '',
        urlNode:        '',
        insertPosition: '',
        after:          false,
    },
*/
];


// extention of native class --------------------------------------------
// extend the feature that bind the Function to the Object
// NOTICE: this function is return the Function object
// refer: bind function in prototype.js
//        http://www.prototypejs.org/
Function.prototype.bind = function(object) {
    var __method = this;
    return function() {
        return __method.apply(object, arguments);
    }
};


// class definition -----------------------------------------------------
// controller as factory and observer
// Singleton pattern
// refer: http://la.ma.la/blog/diary_200508141140.htm
function FaviconizeController() {
    var self = arguments.callee;
    if(self.instance == null) {
        this._initialize.apply(this, arguments)
        self.instance = this;
    }
    return self.instance;
}

FaviconizeController.prototype = {
    // constructor : assign array of SITEINFO objects
    _initialize: function(siteinfos) {
        this.siteinfo = this._buildFaviconizeController(siteinfos);
        debug('SITEINFO: ' + this.siteinfo.toSource());

        // Array for caching checked favicon URL
        this.checkedURL = [];
        this.afterFlag = !!(this.siteinfo.after);
    },

    // build Faviconizer object on appropriate SITEINFO
    _buildFaviconizeController: function (siteinfos) {
        for(var i=0, max=siteinfos.length ; i<max ; ++i) {
            var info = siteinfos[i];
            if(location.href.match(info.applyURL)) {
                return info;
            }
        }

        throw new Error('not found SITEINFO.');
    },

    // main method
    // newNodes is Array of HTML / XML node
    faviconize: function(newNodes) {
        if(newNodes) {
            // for AutoPagerize
            debug('newNodes.length: ' + newNodes.length);
            for(var i=0, max=newNodes.length ; i<max ; ++i) {
                this._createFaviconizer(newNodes[i]);
            }
        }
        else {
            this._createFaviconizer();
        }
    },

    _createFaviconizer: function(newNode) {
        // pickout URLs and nodes by XPath of SITEINFO
        // evaluate!!  results are ordered,
        // so url correspond to insert position (node)
        var hrefs = $s(this.siteinfo.urlNode, newNode);
        var insertPositions = $s(this.siteinfo.insertPosition, newNode);

        // cache results length
        var hrefsLength = hrefs.length;
        var insertPositionsLength = insertPositions.length;

        // if conflict both length, we can't make valid pairs
        if(! (hrefsLength === insertPositionsLength)) {
            throw new Error(
                [
                    'a number of results that evaluate XPath is conflict',
                    'urlNode: ' + hrefsLength + ' hit' + (hrefsLength===1 ? '' : 's'),
                    'insertPosition: ' + insertPositionsLength + ' hit' + (hrefsLength===1 ? '' : 's'),
                ].join("\n")
            );
        }

        // process data
        for(var i=0 ; i<hrefsLength ; ++i) {
            // pickout and fine-tuning URL
            var href = hrefs[i];
            var url = href.nodeValue ? href.nodeValue : href.textContent;
            url = this._makeFaviconURL(url);

            var f = new Faviconizer(url, insertPositions[i], this);
            f.insertFavicon();
        }
    },

    _makeFaviconURL: function(url) {
        // refer : http://ja.wikipedia.org/wiki/Favicon
        return 'http://' + getHostname(url) + '/favicon.ico';
    },

    // methods for Observer pattern
    addCheckedURL: function(url) {
        this.checkedURL[url] = true;
        //debug('added:' + url);
    },

    isCheckedURL: function(url) {
        return this.checkedURL[url];
    },

    isInsertAfter: function() {
        return this.afterFlag;
    },
};

// main class in this script
function Faviconizer() {
    this._initialize.apply(this, arguments);
}

Faviconizer.prototype = {
    // constructor : assign anchorNode object
    _initialize: function(faviconURL, insertPosition, controller) {
        this.faviconURL     = faviconURL;
        this.insertPosition = insertPosition;
        this.controller     = controller;
        this.faviconNode    = this._buildFaviconNode();
    },

    _constants: {
        IDENTIFIER: 'gm_faviconize',

        DEFAULT_IMAGE:       'chrome://global/skin/icons/loading_16.png',
        NON_EXISTENCE_IMAGE: 'chrome://global/skin/icons/notloading_16.png',

        FAVICON_STYLE: [
            'margin        : 0 3px !important;',
            'padding       : 0 !important;',
            'border        : none !important;',
            'width         : 16px !important;',
            'height        : 16px !important;',
            'vertical-align: text-bottom !important;',
        ].join(''),
    },

    // insert favicon node before anchor
    insertFavicon: function() {
        // in this timing, "src" attribute is null and
        // background-image on "style" attribute is default image
        this.controller.isInsertAfter()
            ? insertNodeAfterSpecified(this.faviconNode, this.insertPosition)
            : insertNodeBeforeSpecified(this.faviconNode, this.insertPosition);

        // inquire whether checked or not to the observer
        if(this.controller.isCheckedURL(this.faviconURL)) {
            this._displayFavicon();
            return;
        }

        // check the existence of favicon.ico
        GM_xmlhttpRequest( {
            method:  'GET',
            url:     this.faviconURL,
            onload:  this._onloadHandler.bind(this),
            onerror: this._onerrorHandler.bind(this),
        });
    },

    // make "img" element
    _buildFaviconNode: function() {
        // build node!!
        var faviconNode = document.createElement('img');
        faviconNode.src    = this._constants.DEFAULT_IMAGE;
        faviconNode.alt    = '';
        faviconNode.width  = 16;
        faviconNode.height = 16;
        faviconNode.className = this._constants.IDENTIFIER;
        faviconNode.setAttribute('style', this._constants.FAVICON_STYLE);

        return faviconNode;
    },

    // callback function for GM_xmlhttpRequest
    _onloadHandler: function(response) {
        var existence = this._judgeFaviconExistence(response);

        if(existence) {
            // cache existence of favicon
            this.controller.addCheckedURL(this.faviconURL);
        }
        this._displayFavicon(existence);
    },

    _onerrorHandler: function(response) {
        debug(response.status);
//        debug(response.statusText);
//        debug(response.responseHeaders);
        this._displayFavicon(false);
    },

    // change "src" and background-image on "style" attribute
    _displayFavicon: function(existence) {
        this.faviconNode.src = existence
            ? this.faviconURL
            : this._constants.NON_EXISTENCE_IMAGE;
    },

    // check the existence of favicon
    _judgeFaviconExistence: function(response) {
        // server should return HTTP status 200 if favicon.ico exists
        if(response.status === 200 && response.responseText.length !== 0) {

            // not image ?
            // TODO
            // need accurate regexp.
            if(response.responseText.match(/<!DOCTYPE|<html[\s\S]+<head|<HTML[\S\s]+<HEAD/)) {
                debug('not image: ' + response.finalUrl);
//                debug(response.responseText);
                return false;
            }

            // redirected ?
            if(response.finalUrl && response.finalUrl !== this.faviconURL) {
                debug('redirected: ' + response.finalUrl);
                if(response.finalUrl.match(/\.ico$/)) {
                    this.faviconURL = response.finalUrl;
                    return true;
                }

                return false;
            }

            return true;
        }

        // FIXME
        // the handling on status 401
//        if(response.status !== 401) {
//            debug(response.status + ' ' + response.statusText);
//            debug(response.responseHeaders);
//        }

        return false;
    },
};

// SITEINFO controller class
function SITEINFOController() {
    this._initialize.apply(this, arguments);
}

SITEINFOController.prototype = {
    _initialize: function () {
        GM_registerMenuCommand(
            'faviconize - clear cache',
            this.clearCache.bind(this)
        );

        window.content.addEventListener(
            'GMFaviconizeClearCache',
            this.clearCache.bind(this),
            false
        );

        this.siteinfos;
    },

    _constants: {
        SITEINFO_IMPORT_URL: 'http://wedata.net/databases/faviconize/items.json',
        CACHE_NAME: 'siteinfo',

        // 1 day, unit: msec
        EXPIRE_TIME: 60 * 60 * 24 * 1000,
    },

    // this script's ignition
    // setup SITEINFO and launch faviconize
    setupSITEINFO: function() {
        // read cache
        var cache = this.readCache();

        debug('setupSITEINFO: ' + cache.toSource());

        // first of all, launch faviconize
        launchFaviconize(SITEINFO.concat(cache.data));

        // if there is no cache, import from wedata.net
        if(!cache || !(cache.lastExpire)) {
            this._importSITEINFO();
            return;
        }

        // expire ?
        var present = new Date().getTime();
        var lastExpire = cache.lastExpire.getTime();
        if(present - lastExpire > this._constants.EXPIRE_TIME) {
            // in expiration
            this._importSITEINFO();
            return;
        }
    },

    // import SITEINFO and launch faviconize
    _importSITEINFO: function () {
        debug('_importSITEINFO');
        GM_xmlhttpRequest({
            method:  'GET',
            url:     this._constants.SITEINFO_IMPORT_URL,
            onload:  this._onloadHandler.bind(this),
            onerror: this._onerrorHandler.bind(this),
        });
    },

    // callback functions for GM_xmlhttpRequest
    _onloadHandler: function (response) {
        debug(response.status);

        // error handling
        if(response.status !== 200) {
            this._onerrorHandler();
        }

        // form data from wedata.net
        var wedata = eval(response.responseText).map(
            function (i) { return i.data; }
        );
        wedata.sort(function (a, b) {
            return a.applyURL.length - b.applyURL.length;
        });
        // make and write cache
        var cache = {
            lastExpire: new Date(),
            data:       wedata,
        };
        this.writeCache(cache);

        GM_log(new Date() + ' Importing SITEINFOs is succeeded.');
    },

    _onerrorHandler: function() {
        GM_log(new Date() + ' Can\'t import SITEINFOs from wedata.net');
    },

    // cache controller
    readCache: function () {
        return eval(GM_getValue(this._constants.CACHE_NAME, '')) || {};
    },

    writeCache: function (cacheObject) {
        GM_setValue(this._constants.CACHE_NAME, cacheObject.toSource());
    },

    clearCache: function () {
        GM_log('clear faviconize\'s SITEINFO cache');
        GM_setValue(this._constants.CACHE_NAME, '');
    },
};

// AutoPagerizeDisplayController
function APInfoDisplayController() {
    this._initialize.apply(this, arguments);
};

APInfoDisplayController.prototype = {
    _initialize: function () {
        this.flag = GM_getValue('displayAutoPagerizeInfoFlag', false);

        // register Greasemonkey menu command
        GM_registerMenuCommand(
            'faviconize - toggle AutoPagerize info display',
            this.toggle.bind(this)
        );

        // litener for CommandEvent
        window.content.addEventListener(
            'GMFaviconizeToggle',
            this.toggle.bind(this),
            false
        );
    },

    toggle: function () {
        this.flag = !(this.flag);
        GM_setValue('displayAutoPagerizeInfoFlag', this.flag);
        GM_log(
            'AutoPagerize\'s SITEINFO display is '
            + (this.flag ? 'enable' : 'disable')
        );
    },
    is: function () {
        return this.flag;
    },

    // callback function for AutoPagerize.addDocumentFilter
    displayAPInfo: function (newDocument, requestURL, siteinfo) {
        if(this.is()) {
            var str = ['AutoPagerize SITEINFO'];
            for(var property in siteinfo) {
                str.push(property + ': ' + siteinfo[property]);
            }
            GM_log(str.join("\n"));
        }
    },
};


// function definitions -------------------------------------------------
function launchFaviconize(siteinfos) {
    try {
        var fc = new FaviconizeController(siteinfos);
        fc.faviconize();

        var daic = new APInfoDisplayController();

        // register callback function to AutoPagerize
        addFilterToAP( fc.faviconize.bind(fc) );
        addDocumentFilterToAP( daic.displayAPInfo.bind(daic) );
    }
    catch(e) {
        debug(e.message);
    }
}

// main -----------------------------------------------------------------
var s = new SITEINFOController();
s.setupSITEINFO();


// stuff functions ------------------------------------------------------
// for AutoPagerize
function addFilterToAP(filterFunction) {
    if(window.AutoPagerize && window.AutoPagerize.addFilter) {
        setTimeout( function() {
            window.AutoPagerize.addFilter(filterFunction);
        }, 0, this.unsafeWindow || window);
    }
}

function addDocumentFilterToAP(filterFunction) {
    if(window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
        setTimeout( function() {
            window.AutoPagerize.addDocumentFilter(filterFunction);
        }, 0, this.unsafeWindow || window);
    }
}

// XPath (document.evaluate wrapper)
function $f(query, node) {
    if(!node) node = document;
    var result = (node.ownerDocument || node).evaluate(
        query,
        node,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    return result.singleNodeValue ? result.singleNodeValue : null;
}

function $s(query, node) {
    if(!node) node = document;
    var result = (node.ownerDocument || node).evaluate(
        query,
        node,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    var nodes = [];
    for(var i=0, max=result.snapshotLength ; i<max ; ++i)
        nodes.push(result.snapshotItem(i));
    return nodes;
}

// node control
function insertNodeBeforeSpecified(inserted, specified) {
    return specified.parentNode.insertBefore(inserted, specified);
}
function insertNodeAfterSpecified(inserted, specified) {
    var next = specified.nextSibling;
    if(next) {
        return specified.parentNode.insertBefore(inserted, next);
    }
    else {
        return specified.parentNode.appendChild(inserted);
    }
}

// utility
function debug(message) {
    if(DEBUG) {
        GM_log(message);
    }
}

function getHostname(url) {
    if(url.match(/^(?:s?https?:\/\/)?([^\/]+)/)) {
        return RegExp.$1;
    }
    return null;
}

}())

// vim:sw=4 ts=4 et:
