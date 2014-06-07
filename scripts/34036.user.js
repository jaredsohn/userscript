// ==UserScript==
// @name           hatebuize
// @namespace      http://d.hatena.ne.jp/janus_wel/
// @description    add bookmarked number of はてなブックマーク to specified position by SITEINFO
// ==/UserScript==
/*
 * VERSION
 *  1.01
 *
 * LICENSE
 *  New BSD License
 *
 * ACKNOWLEDGMENT
 *  this script based on 'del.icio.us meets Hatena Bookmark',
 *  AutoPagerize and many others !!
 *
 *  refer:
 *      - http://la.ma.la/blog/diary_200512131313.htm
 *      - http://d.hatena.ne.jp/m4i/20051213/1134425307
 *      - http://userscripts.org/scripts/show/8551
 *      - http://wedata.net/
 *
 * HISTORY
 *  2008/09/15  ver. 0.10   - initial written.
 *  2008/09/16  ver. 0.11   - refactoring.
 *  2008/09/17  ver. 0.20   - add command that toggle AutoPagerize
 *                            information display to Greasemonkey menu.
 *                          - add receiver for 'GMHatebuizeToggle'
 *                            CommandEvent that toggle AutoPagerize
 *                            information display.
 *  2008/09/19  ver. 1.00   - work togather with wedata.net.
 *                          - add command that clear SITEINFO cache.
 *                          - add receiver for 'GMHatebuizeClearCache'
 *                            CommandEvent that clear SITEINFO cache.
 *                          - refactoring.
 *  2010/07/29  ver. 1.01   - fix the bug to execute procedures three times
 *                            when the SITEINFO cash is expired.
 * */

(function() {

// constant variables ---------------------------------------------------
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
// XML-RPC like GM_xmlhttpRequest
function XMLRPC() {
    this.initialize.apply(this, arguments);
}

XMLRPC.prototype = {
    constants: {
        CHUNK_SIZE_DEFAULT: 1,
    },

    initialize: function() {
        // manipulable properties from external by getter/setter
        this._url = '';
        this._chunkSize = this.constants.CHUNK_SIZE_DEFAULT;
        this._method = '';
        this._onload = '';
        this._params = [];

        // propertis assumed that private
        this._chunks = [];
        this._calledLoadHandlerCount = 0;
        this._numofChunk = 0;
        this._response;
    },

    // getter / setter for end point
    url: function(url) {
        if(url) {
            if(!isHttpURL(url)) {
                throw new Error('assign HTTP URL to url');
            }
            this._url = url;
            return this;
        }
        else {
            return this._url;
        }
    },

    // getter / setter for chunk size
    // amount of data ( = params) posted by GM_xmlhttpRequest
    chunkSize: function(chunkSize) {
        if(chunkSize) {
            if(!isNumber(chunkSize)) {
                throw new Error('assign number to chunkSize');
            }
            this._chunkSize = chunkSize;
            return this;
        }
        else {
            return this._chunkSize;
        }
    },

    // getter / setter for method
    method: function(method) {
        if(method) {
            // check data-type
            if(!isString(method)) {
                throw new Error('assign string to method');
            }
            this._method = method;
            return this;
        }
        else {
            return this._method;
        }
    },

    // getter / setter for params
    data: function(params) {
        if(params) {
            // check data-type
            if(!isArray(params)) {
                throw new Error('assign Array object to params');
            }

            this._params = Array.apply(null, params);
            return this;
        }
        return this._params;
    },

    // getter / setter for callback function execute on loading
    onload: function(onload) {
        if(onload) {
            if(!isFunction(onload)) {
                throw new Error('assign Function object to onload');
            }

            this._onload = onload;
            return this;
        }
        else {
            return this._onload;
        }
    },

    // send http request and handle response
    send: function() {
        // build up chunks that will be sended.
        this._buildChunks();

        for(var i=0, max=this._numofChunk ; i<max ; ++i) {
            GM_xmlhttpRequest({
                method: 'POST',
                url:    this._url,
                data:   this._chunks[i].toString(),
                onload: this._loadHandler.bind(this)
            });
        }

        return this;
    },

    // pre-process before send
    _buildChunks: function() {
        // calculate the number of chunks
        var numofParams = this._params.length;
        if(numofParams > 1) {
            this._numofChunk = Math.ceil(numofParams / this._chunkSize);
        }

        // build up !!
        var chunkSize = this._chunkSize;
        var method = this._method;
        var params = this._params;
        for(var i=0, max=this._numofChunk ; i<max ; ++i) {
            var chunk = this._chunkTemplate(method);
            var count = -1;
            for(;;) {
                var param = params.shift();
                if(++count === chunkSize || !param) break;
                chunk..params.appendChild(this._paramTemplate(param));
            }

            this._chunks.push(chunk);
        }

        return this;
    },

    // callback function for GM_xmlhttpRequest
    _loadHandler: function(res)
    {
        var response = new XML(res.responseText.replace(/^<\?xml[^>]*?\?>\s*/, ''));
        if(this._response) {
            this._response..struct.appendChild(response..member);
        }
        else {
            this._response = response;
        }

        if(++(this._calledLoadHandlerCount) === this._numofChunk) {
            this._onload(this._response);
        }
    },

    // chunk template
    _chunkTemplate: function(method) {
        if(isString(method)) {
            var chunkTemplate =
                <methodCall>
                    <methodName>{method}</methodName>
                    <params></params>
                </methodCall>
                ;
            return chunkTemplate;
        }
        return null;
    },

    // param template
    // now, string only
    // TODO implement each data-type
    _paramTemplate: function(param) {
        if(isString(param)) {
            var paramTemplate =
                <param>
                    <value>
                        <string>{param}</string>
                    </value>
                </param>
                ;
            return paramTemplate;
        }
        return null;
    },
};


// HatebuizeController class
// singleton
function HatebuizeController() {
    var self = arguments.callee;
    if(self.instance == null) {
        this.initialize.apply(this, arguments)
        self.instance = this;
    }
    return self.instance;
}

HatebuizeController.prototype = {
    initialize: function(siteinfos) {
        this.siteinfo = this._buildHatebuizeController(siteinfos);
        debug('SITEINFO: ' + this.siteinfo.toSource());

        this.insertPositions = {};
        this.urls = [];
        this.afterFlag = !!(this.siteinfo.after);
    },

    constants: {
        // for はてなブックマーク API
        // refer: http://d.hatena.ne.jp/keyword/%A4%CF%A4%C6%A4%CA%A5%D6%A5%C3%A5%AF%A5%DE%A1%BC%A5%AF%B7%EF%BF%F4%BC%E8%C6%C0API

        IDENTIFIER:     'gm_hatebuize',

        ENTRY_URI:      'http://b.hatena.ne.jp/entry/',
        END_POINT:      'http://b.hatena.ne.jp/xmlrpc',
        CHUNK_SIZE_MAX: 50,

        HATEBU_SINGLE_TEMPLATE: 'user',
        HATEBU_PLURAL_TEMPLATE: 'users',

        HOTTER_USER_COUNT:  5,
        HOTTEST_USER_COUNT: 10,

        HOT_STYLE: [
            'margin           : 0 3px;',
            'font-style       : normal !important;',
            'font-size        : small !important;',
            'text-decoration  : underline !important;',
        ].join(''),

        HOTTER_STYLE: [
            'margin           : 0 3px;',
            'font-style       : normal !important;',
            'font-size        : small !important;',
            'text-decoration  : underline !important;',
            'color            : #ff6666 !important;',
            'background-color : #fff0f0 !important;',
            'font-weight      : bold !important;',
        ].join(''),

        HOTTEST_STYLE: [
            'margin           : 0 3px;',
            'font-style       : normal !important;',
            'font-size        : small !important;',
            'text-decoration  : underline !important;',
            'color            : red !important;',
            'background-color : #ffcccc !important;',
            'font-weight      : bold !important;',
        ].join(''),

    },
    // build HatebuizeController object on appropriate SITEINFO
    _buildHatebuizeController: function(siteinfos) {
        for(var i=0, max=siteinfos.length ; i<max ; ++i) {
            var info = siteinfos[i];
            if(location.href.match(info.applyURL)) {
                return info;
            }
        }

        throw new Error('not found SITEINFO.');
    },

    // main method
    hatebuize: function(newNodes) {
        // initialize
        this.urls = [];
        this.insertPositions = {};

        if(newNodes) {
            // for AutoPagerize
            debug('newNodes.length: ' + newNodes.length);

            for(var i=0, max=newNodes.length ; i<max ; ++i) {
                this._pickoutBySiteinfo(newNodes[i]);
            }
        }
        else {
            this._pickoutBySiteinfo();
        }

        if(this.urls.length) {
            var xmlrpc = new XMLRPC;
            xmlrpc.chunkSize(this.constants.CHUNK_SIZE_MAX)
                  .url(this.constants.END_POINT)
                  .method('bookmark.getCount')
                  .data(this.urls)
                  .onload(this._callback.bind(this))
                  .send();
        }
    },

    // pickout URLs and nodes by XPath of SITEINFO
    _pickoutBySiteinfo: function(newNode) {
        // evaluate!!  results are ordered,
        // so url correspond to insert position (node)
        var hrefs = $s(this.siteinfo.urlNode, newNode);
        var insertPositions = $s(this.siteinfo.insertPosition, newNode);

        // cache results length
        var hrefsLength = hrefs.length;
        var insertPositionsLength = insertPositions.length;
        debug(hrefsLength);
        debug(insertPositionsLength);

        // if conflict both length, we can't make valid pairs
        if(! (hrefsLength === insertPositionsLength)) {
            throw new Error(
                [
                    'a number of results that evaluate XPath is conflict',
                    'number of urls: ' + hrefsLength,
                    'number of insert positions: ' + insertPositionsLength,
                ].join("\n")
            );
        }

        // process data
        for(var i=0 ; i<hrefsLength ; ++i) {
            // pickout URL
            var href = hrefs[i];
            var url = href.nodeValue;
            if(!url) {
                url = href.textContent;

                // fine-tuning
                if(! url.match(/^s?https?:\/\//)) url = 'http://' + url;
                if(url.match(/:\/\/[^\/]+$/)) url += '/';
            }

            // build the hash(object) that is key: url, value: node
            this.insertPositions[url] = insertPositions[i];
            // escape the key to object property
            this.urls.push(url);
        }
    },

    // callback for XMLRPC
    _callback: function(response) {
        debug(response);

        // pickout number of bookmarded
        var users = {};
        for each (var member in response..member) {
            users[member.name] = parseInt(member..int.toString(), 10);
        }

        for(var i=0, max=this.urls.length ; i<max ; ++i) {
            var url = this.urls[i];

            // if nobody bookmark the url, not display
            var numofUser = users[url];
            if(!numofUser) continue;

            // insert Hatebu node
            var insertPosition = this.insertPositions[url];
            var hatebuNode = this._buildHatebuNode(url, numofUser);

            this.afterFlag
                ? insertNodeAfterSpecified(hatebuNode, insertPosition)
                : insertNodeBeforeSpecified(hatebuNode, insertPosition);
        }
    },

    // red one
    _buildHatebuNode: function(url, numofUsers) {
        var a = document.createElement('a');
        a.setAttribute('class', this.constants.IDENTIFIER);
        a.setAttribute(
            'href',
            this.constants.ENTRY_URI + url.replace("#", '%23')
        );
        a.setAttribute(
            'style',
            numofUsers >= this.constants.HOTTEST_USER_COUNT
                ? this.constants.HOTTEST_STYLE
                : numofUsers >= this.constants.HOTTER_USER_COUNT
                    ? this.constants.HOTTER_STYLE
                    : this.constants.HOT_STYLE
        );

        var text = document.createTextNode(
            numofUsers + ' ' +
            (numofUsers === 1
                ? this.constants.HATEBU_SINGLE_TEMPLATE
                : this.constants.HATEBU_PLURAL_TEMPLATE)
        );

        a.appendChild(text);
        return a;
    },
};

// SITEINFO controller class
function SITEINFOController() {
    this._initialize.apply(this, arguments);
}

SITEINFOController.prototype = {
    _initialize: function () {
        GM_registerMenuCommand(
            'hatebuize - clear cache',
            this.clearCache.bind(this)
        );

        window.content.addEventListener(
            'GMHatebuizeClearCache',
            this.clearCache.bind(this),
            false
        );

        this.siteinfos;
    },

    _constants: {
        SITEINFO_IMPORT_URL: 'http://wedata.net/databases/hatebuize/items.json',
        CACHE_NAME: 'siteinfo',

        // 1 day, unit: msec
        EXPIRE_TIME: 60 * 60 * 24 * 1000,
    },

    // this script's ignition
    // setup SITEINFO and launch hatebuize
    setupSITEINFO: function() {
        // read cache
        var cache = this.readCache();

        debug('setupSITEINFO: ' + cache.toSource());

        // first of all, launch hatebuize
        launchHatebuize(SITEINFO.concat(cache.data));

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

    // import SITEINFO and launch hatebuize
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
        GM_log(new Date() + ' Can\'t import SITEINFO from wedata.net');
    },

    // cache controller
    readCache: function () {
        return eval(GM_getValue(this._constants.CACHE_NAME, '')) || {};
    },

    writeCache: function (cacheObject) {
        GM_setValue(this._constants.CACHE_NAME, cacheObject.toSource());
    },

    clearCache: function () {
        GM_log('clear hatebuize\'s SITEINFO cache');
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
            'hatebuize - toggle AutoPagerize info display',
            this.toggle.bind(this)
        );

        // litener for CommandEvent
        window.content.addEventListener(
            'GMHatebuizeToggle',
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
function launchHatebuize(siteinfos) {
    try {
        var hc = new HatebuizeController(siteinfos);
        hc.hatebuize();

        var daic = new APInfoDisplayController();

        // register callback function to AutoPagerize
        addFilterToAP( hc.hatebuize.bind(hc) );
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

// XPath (element.evaluate wrapper)
function $f(query, node) {
    if(!node) node = document;
    var result = (node.ownerDocument || node).evaluate(
        query,
        node,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    );
    return result.singleNodeValue
        ? result.singleNodeValue
        : null;
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

// utilities
function isString(something) {
    return (typeof something === 'string'
        || something.constructor === String);
}
function isNumber(something) {
    return (typeof something === 'number'
        || something.constructor === Number);
}
function isArray(something) {
    return (something.constructor === Array);
}
function isFunction(something) {
    return (typeof something === 'function'
        || something.constructor === Function);
}
function isHttpURL(something) {
    // refer: http://www.din.or.jp/~ohzaki/perl.htm#httpURL
    return (isString(something)
        && something.match(/s?https?:\/\/[-_.!~*'()a-zA-Z0-9;\/?:@&=+$,%#]+/g));
}

function debug(message) {
    if(DEBUG) {
        GM_log(message);
    }
}

})()

// vim: set sw=4 ts=4 et;
