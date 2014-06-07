// ==UserScript==
// @name       feiliao killad
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.1
// @description  enter something useful
// @match      http://*/*
// @match      https://*/*
// @copyright  2012+, You
// ==/UserScript==

(function() { function R(a){ona = "on"+a; if(window.addEventListener) window.addEventListener(a, function (e) { for(var n=e.originalTarget; n; n=n.parentNode) n[ona]=null; }, true); window[ona]=null; document[ona]=null; if(document.body) document.body[ona]=null; } R("contextmenu"); R("click"); R("mousedown"); R("mouseup"); R("selectstart");
               Function.prototype.bind = function() {
        var fn = this, args = Array.prototype.slice.call(arguments), obj = args.shift();
        return function() {
            return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
        };
    };

    function YoukuAntiAds() {}
    YoukuAntiAds.prototype = {
        _players: null,
        _rules: null,
        _done: null,
        get players() {
            if(!this._players) {
                this._players = {
                    'youku_loader': 'http://haoutil.cdn.duapp.com/player/loader.swf',
                    'youku_player': 'http://haoutil.cdn.duapp.com/player/player.swf',
                    'ku6': 'http://haoutil.cdn.duapp.com/player/ku6.swf',
                    'ku6_out': 'http://haoutil.cdn.duapp.com/player/ku6_out.swf',
     	    	   // 'pplive': 'http://haoutil.cdn.duapp.com/player/pplive.swf',
		           // 'pplive_live':'http://haoutil.cdn.duapp.com/player/pplive_live.swf',
                    'kletv':'http://haoutil.cdn.duapp.com/player/kletv.swf',
                    //'iqiyi': 'http://haoutil.cdn.duapp.com/player/iqiyi.swf',
                   // 'iqiyi5': 'http://haoutil.cdn.duapp.com/player/iqiyi5.swf',
                   // 'iqiyi_out': 'http://haoutil.cdn.duapp.com/player/iqiyi_out.swf',
                    'tudou': 'http://haoutil.cdn.duapp.com/player/tudou.swf',
                    'tudou_olc': 'http://haoutil.cdn.duapp.com/player/olc_8.swf',
                    'tudou_sp': 'http://haoutil.cdn.duapp.com/player/sp.swf',
                    'letv': 'http://haoutil.cdn.duapp.com/player/letv.swf'
                };
            }
            return this._players;
        },
        get rules() {
            if(!this._rules) {
                this._rules = {
                    'youku_loader': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/loader\.swf/i,
                        'replace': this.players['youku_loader']
                    },
                    'youku_player': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/q?player[^\.]*\.swf(\?.*)?/i,
                        'replace': this.players['youku_loader'] + '$2'
                    },
                    'youku_out': {
                        'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
                        'replace': this.players['youku_loader'] + '?showAd=0&VideoIDS=$1'
                    },
                    'ku6': {
                        'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
                        'replace': this.players['ku6']
                    },
                    'ku6_out': {
                        'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
                        'replace': this.players['ku6_out'] + '?vid=$2'
                    },
                 //   'iqiyi': {
                      //  'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i,
                      //  'replace': this.players['iqiyi']
                  //  },
                   // 'iqiyi_out': {
                       // 'find': /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
                      //  'replace': this.players['iqiyi_out'] + '?vid=$3'
                   // },
                    'tudou': {
                        'find': /^http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
                        'replace': this.players['tudou']
                    },
                    'tudou_out': {
                        'find': /^http:\/\/www\.tudou\.com\/.*(\/v\.swf)?/i,
                        'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
                    },
                    'letv': {
                        'find': /http:\/\/.*letv[\w]*\.com\/(.*\/(?!live)((v2)?[\w]{4}|swf)player[^\.]*|[\w]*cloud)\.swf/i,
                        'replace': this.players['letv']
                    },
                    'letv_out': {
                        'find': /http:\/\/.*letv\.com\/player\/swfplayer\.swf(\?.*)/i,
                        'replace': this.players['letv'] + '$1'
                    }
                }
            }
            return this._rules;
        },
        get done() {
            if(!this._done) {
                this._done = new Array();
            }
            return this._done;
        },
        initPreHandlers: function() {
            this.rules['iqiyi']['preHandle'] = function(elem, find, replace, player) {
                if(document.querySelector('span[data-flashplayerparam-flashurl]')) {
                    replace = this.players['iqiyi5'];
                }
                this.reallyReplace.bind(this, elem, find, replace)();
            }
            this.rules['iqiyi_out']['preHandle'] = function(elem, find, replace, player) {
                var match = player.match(/(autoplay)=[^&]+/ig);
                if(match) {
                    replace += '&' + match.join('&');
                }
                this.reallyReplace.bind(this, elem, find, replace)();
            }
            this.rules['tudou_out']['preHandle'] = function(elem, find, replace, player) {
                var fn = this;
                var isFx = /firefox/i.test(navigator.userAgent);
                GM_xmlhttpRequest({
                    method: isFx ? 'HEAD' : 'GET',
                    url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"https://haoutil.googlecode.com/svn/trunk/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
                    onload: function(response) {
                        var finalUrl = (isFx ? response.finalUrl : response.responseText);
                        var match = finalUrl.match(/(iid|youkuid|resourceid|autoplay|snap_pic)=[^&]+/ig);
                        if(match && !/error/i.test(finalUrl)) {
                            replace += '&' + match.join('&');
                            fn.reallyReplace.bind(fn, elem, find, replace)();
                        }
                    }
                });
            }
        },
        addAnimations: function() {
            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = 'object,embed{\
-webkit-animation-duration:.001s;-webkit-animation-name:playerInserted;\
-ms-animation-duration:.001s;-ms-animation-name:playerInserted;\
-o-animation-duration:.001s;-o-animation-name:playerInserted;\
animation-duration:.001s;animation-name:playerInserted;}\
@-webkit-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-ms-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@-o-keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}\
@keyframes playerInserted{from{opacity:0.99;}to{opacity:1;}}';
            document.getElementsByTagName('head')[0].appendChild(style);
        },
        animationsHandler: function(e) {
            if(e.animationName === 'playerInserted') {
                this.replace(e.target);
            }
        },
        replace: function(elem) {
            if(this.done.indexOf(elem) != -1) return;
            this.done.push(elem);

            var player = elem.data || elem.src;
            if(!player) return;

            var i, find, replace, isReplacing = false;
            for(i in this.rules) {
                find = this.rules[i]['find'];
                if(find.test(player)) {
                    replace = this.rules[i]['replace'];
                    if('function' === typeof this.rules[i]['preHandle']) {
                        isReplacing = true;
                        this.rules[i]['preHandle'].bind(this, elem, find, replace, player)();
                    }
                    if(!isReplacing) {
                        this.reallyReplace.bind(this, elem, find, replace)();
                    }
                    break;
                }
            }
        },
        reallyReplace: function(elem, find, replace) {
            elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
            this.reloadPlugin(elem);
        },
        reloadPlugin: function(elem) {
            var nextSibling = elem.nextSibling;
            var parentNode = elem.parentNode;
            parentNode.removeChild(elem);
            var newElem = elem.cloneNode(true);
            this.done.push(newElem);
            if(nextSibling) {
                parentNode.insertBefore(newElem, nextSibling);
            } else {
                parentNode.appendChild(newElem);
            }
        },
        init: function() {
            this.initPreHandlers();

            var handler = this.animationsHandler.bind(this);

            document.body.addEventListener('webkitAnimationStart', handler, false);
            document.body.addEventListener('msAnimationStart', handler, false);
            document.body.addEventListener('oAnimationStart', handler, false);
            document.body.addEventListener('animationstart', handler, false);

            this.addAnimations();
        }
    };

    new YoukuAntiAds().init();
            })()