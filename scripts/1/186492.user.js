// ==UserScript==
// @name         NezzSorozatokat.info
// @namespace    http://komornik-gabor.hu/
// @version      0.2
// @description  Skip ads make loading faster with ajax
// @match        http://nezzsorozatokat.info/*
// @copyright    2013, Komornik Gábor
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js
// ==/UserScript==

// @resource helyett
img = function(src) { var i = new Image(); i.src = src; return i; };
loading = img('data:image/gif;base64,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\nCwg1RAAAOwAAAAAAAAAAAA==');


// Url handler plugin for jquery
/*
 * Purl (A JavaScript URL parser) v2.3.1
 * Developed and maintanined by Mark Perkins, mark@allmarkedup.com
 * Source repository: https://github.com/allmarkedup/jQuery-URL-Parser
 * Licensed under an MIT-style license. See https://github.com/allmarkedup/jQuery-URL-Parser/blob/master/LICENSE for details.
 */
;(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        window.purl = factory();
    }
})(function() {

    var tag2attr = {
            a       : 'href',
            img     : 'src',
            form    : 'action',
            base    : 'href',
            script  : 'src',
            iframe  : 'src',
            link    : 'href',
            embed   : 'src',
            object  : 'data'
        },

        key = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment'], // keys available to query

        aliases = { 'anchor' : 'fragment' }, // aliases for backwards compatability

        parser = {
            strict : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
            loose :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
        },

        isint = /^[0-9]+$/;

    function parseUri( url, strictMode ) {
        var str = decodeURI( url ),
        res   = parser[ strictMode || false ? 'strict' : 'loose' ].exec( str ),
        uri = { attr : {}, param : {}, seg : {} },
        i   = 14;

        while ( i-- ) {
            uri.attr[ key[i] ] = res[i] || '';
        }

        // build query and fragment parameters
        uri.param['query'] = parseString(uri.attr['query']);
        uri.param['fragment'] = parseString(uri.attr['fragment']);

        // split path and fragement into segments
        uri.seg['path'] = uri.attr.path.replace(/^\/+|\/+$/g,'').split('/');
        uri.seg['fragment'] = uri.attr.fragment.replace(/^\/+|\/+$/g,'').split('/');

        // compile a 'base' domain attribute
        uri.attr['base'] = uri.attr.host ? (uri.attr.protocol ?  uri.attr.protocol+'://'+uri.attr.host : uri.attr.host) + (uri.attr.port ? ':'+uri.attr.port : '') : '';

        return uri;
    }

    function getAttrName( elm ) {
        var tn = elm.tagName;
        if ( typeof tn !== 'undefined' ) return tag2attr[tn.toLowerCase()];
        return tn;
    }

    function promote(parent, key) {
        if (parent[key].length === 0) return parent[key] = {};
        var t = {};
        for (var i in parent[key]) t[i] = parent[key][i];
        parent[key] = t;
        return t;
    }

    function parse(parts, parent, key, val) {
        var part = parts.shift();
        if (!part) {
            if (isArray(parent[key])) {
                parent[key].push(val);
            } else if ('object' == typeof parent[key]) {
                parent[key] = val;
            } else if ('undefined' == typeof parent[key]) {
                parent[key] = val;
            } else {
                parent[key] = [parent[key], val];
            }
        } else {
            var obj = parent[key] = parent[key] || [];
            if (']' == part) {
                if (isArray(obj)) {
                    if ('' !== val) obj.push(val);
                } else if ('object' == typeof obj) {
                    obj[keys(obj).length] = val;
                } else {
                    obj = parent[key] = [parent[key], val];
                }
            } else if (~part.indexOf(']')) {
                part = part.substr(0, part.length - 1);
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
                // key
            } else {
                if (!isint.test(part) && isArray(obj)) obj = promote(parent, key);
                parse(parts, obj, part, val);
            }
        }
    }

    function merge(parent, key, val) {
        if (~key.indexOf(']')) {
            var parts = key.split('[');
            parse(parts, parent, 'base', val);
        } else {
            if (!isint.test(key) && isArray(parent.base)) {
                var t = {};
                for (var k in parent.base) t[k] = parent.base[k];
                parent.base = t;
            }
            if (key !== '') {
                set(parent.base, key, val);
            }
        }
        return parent;
    }

    function parseString(str) {
        return reduce(String(str).split(/&|;/), function(ret, pair) {
            try {
                pair = decodeURIComponent(pair.replace(/\+/g, ' '));
            } catch(e) {
                // ignore
            }
            var eql = pair.indexOf('='),
                brace = lastBraceInKey(pair),
                key = pair.substr(0, brace || eql),
                val = pair.substr(brace || eql, pair.length);

            val = val.substr(val.indexOf('=') + 1, val.length);

            if (key === '') {
                key = pair;
                val = '';
            }

            return merge(ret, key, val);
        }, { base: {} }).base;
    }

    function set(obj, key, val) {
        var v = obj[key];
        if (typeof v === 'undefined') {
            obj[key] = val;
        } else if (isArray(v)) {
            v.push(val);
        } else {
            obj[key] = [v, val];
        }
    }

    function lastBraceInKey(str) {
        var len = str.length,
            brace,
            c;
        for (var i = 0; i < len; ++i) {
            c = str[i];
            if (']' == c) brace = false;
            if ('[' == c) brace = true;
            if ('=' == c && !brace) return i;
        }
    }

    function reduce(obj, accumulator){
        var i = 0,
            l = obj.length >> 0,
            curr = arguments[2];
        while (i < l) {
            if (i in obj) curr = accumulator.call(undefined, curr, obj[i], i, obj);
            ++i;
        }
        return curr;
    }

    function isArray(vArg) {
        return Object.prototype.toString.call(vArg) === "[object Array]";
    }

    function keys(obj) {
        var key_array = [];
        for ( var prop in obj ) {
            if ( obj.hasOwnProperty(prop) ) key_array.push(prop);
        }
        return key_array;
    }

    function purl( url, strictMode ) {
        if ( arguments.length === 1 && url === true ) {
            strictMode = true;
            url = undefined;
        }
        strictMode = strictMode || false;
        url = url || window.location.toString();

        return {

            data : parseUri(url, strictMode),

            // get various attributes from the URI
            attr : function( attr ) {
                attr = aliases[attr] || attr;
                return typeof attr !== 'undefined' ? this.data.attr[attr] : this.data.attr;
            },

            // return query string parameters
            param : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.query[param] : this.data.param.query;
            },

            // return fragment parameters
            fparam : function( param ) {
                return typeof param !== 'undefined' ? this.data.param.fragment[param] : this.data.param.fragment;
            },

            // return path segments
            segment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.path;
                } else {
                    seg = seg < 0 ? this.data.seg.path.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.path[seg];
                }
            },

            // return fragment segments
            fsegment : function( seg ) {
                if ( typeof seg === 'undefined' ) {
                    return this.data.seg.fragment;
                } else {
                    seg = seg < 0 ? this.data.seg.fragment.length + seg : seg - 1; // negative segments count from the end
                    return this.data.seg.fragment[seg];
                }
            }

        };

    }
    
    purl.jQuery = function($){
        if ($ != null) {
            $.fn.url = function( strictMode ) {
                var url = '';
                if ( this.length ) {
                    url = $(this).attr( getAttrName(this[0]) ) || '';
                }
                return purl( url, strictMode );
            };

            $.url = purl;
        }
    };

    purl.jQuery(window.jQuery);

    return purl;

});
// END OF JQUERY PURL PLUGIN

// SCRIPT START!!!!
function truncate(text, length, more) {
    length = length || 80;
    more = more || '...';
	var len = text.length,
        lenmore = more.length;
    if(len <= length) return text;
    return text.substr(0, length - lenmore) + more;
}
String.prototype.truncate = function(l,m) { return truncate(this, l, m); };

$.fn.center = function() {
    return this.each(function(k, elem) {
    	var elem = $(elem),
            parent = elem.parent(),
            w = elem.width(), h = elem.height(),
            pw = parent.innerWidth(), ph = parent.innerHeight(),
            left = Math.floor((pw - w) / 2),
            top  = Math.floor((ph - h) / 2);
        if(parent.css('position') == 'static') {
            parent.css('position', 'relative')
            	.css('top', '').css('left', '')
            	.css('bottom', '').css('right', '');
        }
        elem.css('position', 'absolute')
        	.css('top', top).css('left', left);
    });
};

function createClass(proto) {
    var cls = function() {
        $.isFunction(this.initialize)
            && this.initialize.apply(this, arguments);
    };
    cls.prototype = proto;
    return cls;
}

var Page = (function(undefined) {
    
    var utype = typeof undefined;
    var url = $.url();
    
    function isU(val) {
        return utype == typeof val;
    }
    
    function pageType() {
        var s = url.param('s'), e = url.param('e');
        if(!isU(e) && !isU(s)) {
            return 'e'; // epizód
        }
        if(!isU(s)) {
            return 's'; // sorozat
        }
        return 'n';     // semmi
    }
    function isE() {
        return pageType() == 'e';
    }
    function isS() {
        return pageType() == 'e' || pageType() == 's';
    }
    
    function getSeriesId() {
        return isS() ? $.url().param('s') : null;
    }
    
    function getSorozatCim() {
        return $.trim($('div#main > h1').text());
    }
    
    function _getEpDetailsRow() {
        if(!isS()) return null;
        return $('div#main > div:first tr')[1];
    }
    
    function getEpizodCim() {
        var node = _getEpDetailsRow();
        return node == null ? null : $.trim($('h2', node).text());
    }
    
    function getNeighbour(n_per_p) {
        var node = _getEpDetailsRow();
        if(!node) return null;
        var td = $('td:' + (n_per_p == 'previous' ? 'first' : 'last'), node);
        return {
            text: $.trim($('h3', td).text()),
            series: getSeriesId(),
            partId: $('a', td).url().param('e')
        };
    }
    
    function listak() {
    	return $('div[id^="lista_"]');
    }
    
    function clearHeader() {
        // remove FB like, G+ button
        $('h1#logo > div, h1#logo > iframe').remove();
        // empty menu (semmi értelme kategorizálni, 
        // ez sokkal jobb hely könyvjelzőknek
        $('#header > ul').empty();
    }
    
    function clearEpHeader() {
        $('div#main > div:first tr:last').remove();
    }
    
    return {
        getCurrent: function() {
            return {
                id: getSeriesId(),
                title: isS() ? getSorozatCim() : null
            };
        },
        getCurrentEp: function() {
            return {
                next: getNeighbour('next'),
                previous: getNeighbour('previous'),
                
                text: getEpizodCim(),
                series: getSeriesId(),
                partId: $.url().param('e')
                
            };
        },
        isPart: isE,
        isSeries: isS,
        cleanUp: function() {
            clearHeader();
            isE() && clearEpHeader();
            if(isS()) {
            	$('ul', listak().show()).css('list-style-type', 'none');
            }
        },
        getLists: listak
    };
})();

var Video = createClass({
    initialize: function(initialnode, noautoload) {
        this.node = $(initialnode);
        this.videoid = this.node.attr('id').substr(6);
       	this.sorszam = $('.advideo', this.node).attr('sorsz');
        this.nowloading();
        this.prefetch(!noautoload);
        console.log('initialize video: ' + this.videoid + ' / ' + this.sorszam);
    },
    prefetch: function(autoload) {
        console.log('prefetch video: ' + this.sorszam);
        if(!this.cache()) {
            console.log(' -> not in cache');
    		this.fetch = $.get('/videobetolt.php', {id: this.sorszam}, $.proxy(this, 'store'), 'text');
        }
        if(autoload) {
            console.log('auto show after fetch');
        	this.fetch.done($.proxy(this, 'show'));
        }
        this.fetch.fail($.proxy(this, 'report'));
    },
    cache: function() {
    	var text = GM_getValue('video.' + this.sorszam, false);
        if(!text) return false;
        console.log(' -> in cache');
        var def = $.Deferred();
        this.fetch = def.promise();
        this.asText = JSON.parse(text);
        def.resolve(this.asText);
        return true;
    },
    report: function() {
    	console.warn('something crashed', arguments);
    },
    store: function(text) {
    	this.asText = text;
        var json = JSON.stringify(text);
        GM_setValue('video.cachesize', GM_getValue('video.cachesize', 0) + json.length);
        GM_setValue('video.' + this.sorszam, json);
    },
    show: function(text) {
    	this.node.html(text || this.asText);
    },
    nowloading: function() {
    	var img = $('<img/>').attr('src', loading.src);
        var div = $('<div/>').attr('style', 'margin:20px 15px 0; padding:5px; width:94%; display: inline-table;')
        		.addClass('advideo').append(img);
        this.node.empty().append(div);
        img.on('load', $.proxy(img, 'center'));
    }
});
Video.clearCache = function() {
    $.each(GM_listValues(), function(n, key) {
        if(key.substr(0, 6) == 'video.') {
        	GM_deleteValue(key);
        }
    });
    console.log('Cache cleared');
}
Video.printDbSize = function() {
	console.log('Currently using ' + GM_getValue('video.cachesize', 0) + ' bytes for cache');
}

var Bookmarks = createClass({
    gmkey: 'bookmarks',
    initialize: function() {
        var that = this;
        this.bookmarks = [];
        var bms = GM_getValue(this.gmkey, false);
        this.plus = this._registerItem2Dom({
            text: '+',
            command: $.proxy(this, 'addThis')
        });
        if(bms) {
            $.each(JSON.parse(bms), function(k, item) {
                that.add(item);
            });
        }
        if(Page.isPart()) {
            var item = this.getItemFor(Page.getCurrent().id);
            if(item) {
                item.lastviewed = Page.getCurrentEp().partId;
                this.save();
            }
        }
    },
    getItemFor: function(id) {
        return $.grep(this.bookmarks, function(item) {
            return item.id === id;
        })[0];
    },
    addThis: function() {
        var id = Page.getCurrent().id;
        if(id === null) return alert('Ezt az oldalt nem tudod könyvjelzőnek beállítani');
        if('object' == typeof this.getItemFor(id))
            return;
        this.add({
            text: Page.getCurrent().title,
            id: id
        });
        this.save();
    },
    save: function() {
        var exp = [];
        $.each(this.bookmarks, function(k, bookmark) {
            exp.push({
                id: bookmark.id,
                text: bookmark.text,
                lastviewed: bookmark.lastviewed || null
            });
        });
        GM_setValue(this.gmkey, JSON.stringify(exp));
    },
    add: function(item) {
        var id = this.bookmarks.length;
        this.bookmarks[id] = item;
        item.current = Page.getCurrent().id === item.id;
        item.command = $.proxy(this, 'open', item);
        item.tasks = {'x': $.proxy(this, 'remove', item)};
        this._registerItem2Dom(item);
        return item;
    },
    remove: function(item) {
        var index = this.bookmarks.indexOf(item);
    	this._removeItemFromDom(item);
        if(index > -1) {
        	this.bookmarks.splice(index, 1);
        }
        // console.log(item, index, this.bookmarks);
        this.save();
    },
    open: function(item, event) {
        var s, e, cs, ce, item;
        s = item.id;
        cs = Page.getCurrent().id;
        e = item.lastviewed || null;
        ce = Page.getCurrentEp().partId;
        // console.log('requested: ' + s + '/' + e + '\ncurrent: ' + cs + '/' + ce);
        if(s == cs && e == ce) 
            return; // ott vagyunk ahol lennünk kell
        var url = '/?s=' + s;
        if(e) url += '&e=' + e;
        window.location.assign( url );
    },
    _getItem: function(id) {
        return this.bookmarks[id] || null;
    },
    _registerItem2Dom: function(item) {
        var ul = $('#header > ul'),
            element = $('<li></li>');
        element.append(
            $('<a></a>').attr('href', 'javascript:void(0)').append(
                $('<span/>').text(item.text.truncate(20))
            )
            .click(item.command)
        );
        if(item.tasks) {
            var span = function() { return $('<span/>').css('display', 'inline').css('background', 'transparent').css('padding', '0'); };
            var toggleUnderline = function(e) { $(this).css('text-decoration', e.type == 'mouseenter' ? 'underline' : 'none'); };
            var d = document, t = 'createTextNode', tasks = span().css('margin-left', '2px'),
                bracelet = [d[t]('('), d[t](')')], comma = d[t](','), run = 0;
            tasks.append(bracelet[0]);
            $.each(item.tasks, function(label, task) {
                if(run++ != 0) {
                    tasks.append(comma);
                }
            	span().text(label).click(task).appendTo(tasks).on('mouseenter', toggleUnderline).on('mouseleave', toggleUnderline);
            });
            tasks.append(bracelet[1]);
            $('span', element).append(tasks);
        }
        if(item.current) {
            element.attr('id', 'current');
        }
        ul.prepend(element);
        item.element = element;
        return item;
    },
    _removeItemFromDom: function(item) {
        if(item.element && item.element.remove) {
            item.element.remove();
            delete item.element;
        }
        return item;
    }
});


// ENTRY
$(window).on('load', function() {
    setTimeout(function() {
        Page.cleanUp();
        window.bm = new Bookmarks();
        if(Page.isPart()) {
            Page.getLists().each(function(k, node) {
                new Video(node);
            });
        }
    }, 10);
});
// CLEAR
$(window).keypress(function(e) {
    if(e.ctrlKey && !e.altKey && !e.shiftKey && e.which == 9) {
    	Video.clearCache();
    }
    if(e.ctrlKey && e.altKey && !e.shiftKey && e.which == 205) {
    	Video.printDbSize();
    }
});

// SCRIPT END -- (c) Komornik Gábor 2013
