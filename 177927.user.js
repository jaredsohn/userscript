// ==UserScript==
// @name OpenGG.Clean.Player(New CDN)
// @author ghost2006
// @description 
// @version 1.0
// @namespace http://userscripts.org/users/deathdealer2013
// @updateURL https://userscripts.org/scripts/source/177927.meta.js
// @downloadURL https://userscripts.org/scripts/source/177927.user.js
// @icon http://extensiondl.maxthon.cn/skinpack/17276781/1366787326/icons/icon_48.png
// @include http://*/*
// @include https://*/*
// @run-at document-start
// ==/UserScript==

/*
 * === 说明 ===
 * 本脚本参考http://bbs.kafan.cn/thread-1514537-1-1.html 感谢卡饭大神
 * Chrome用户也可以使用Adkill and Media download这个扩展
 * 此脚本设计修改人员OpenGG  Harv  xplsy  15536900  yndoc  KawaiiUshio 5B4B铅笔
 * Bilibili黑科技由FireAway提供      参考：http://userscripts.org/scripts/show/165424
 * Opera兼容部分由Gerald修改
 * In God，We Trust.
 * THX.
 */

/* 
 * Love Jiani
 */

(function() {
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
                    'youku': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/loader.swf',
                    'ku6': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/ku6.swf',
                    'iqiyi': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/iqiyi.swf',
                    'iqiyi5': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/iqiyi5.swf',
                    'tudou': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/tudou.swf',
                    'tudou_olc': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/olc_8.swf',
                    'tudou_sp': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/sp.swf',
                    'letv': 'https://git.oschina.net/deathdealer/OpenGG/raw/master/letv.swf'
                };
            }
            return this._players;
        },
        get rules() {
            if(!this._rules) {
                this._rules = {
                    'youku': {
                        'find': /^http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/(loader|q?player[^\.]*)\.swf/i,
                        'replace': this.players['youku']
                    },
                    'youku_out': {
                        'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
                        'replace': this.players['youku'] + '?showAd=0&VideoIDS=$1'
                    },
                    'ku6': {
                        'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
                        'replace': this.players['ku6']
                    },
                    'ku6_out': {
                        'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
                        'replace': this.players['ku6'] + '?vid=$2'
                    },
                    'iqiyi': {
                        'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i,
                        'replace': this.players['iqiyi']
                    },
                    'iqiyi_out': {
                        'find': /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
                        'replace': this.players['iqiyi5'] + '?vid=$3'
                    },
                    'letv1': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/[^\.]*\/.*player\/((?!Live).*)Player[^\.]*\.swf/i,
                        'replace': this.players['letv']
                    },
                    'letv2': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/.*player[^\.]*\.swf\?v_list=[\d]/i,
                        'replace': this.players['letv']
                    },
                    'letv3': {
                        'find': /^http:\/\/.*letv[\w]*\.com\/.*\/v_list=[\d]*\/*\.swf/i,
                        'replace': this.players['letv']
                    },
                    'tudou': {
                        'find': /^http:\/\/js\.tudouui\.com\/.*player[^\.\/]*\.swf/i,
                        'replace': this.players['tudou']
                    },
                    'tudou_out': {
                        'find': /^http:\/\/(js|www)\.tudou(ui)?\.com\/.*\/(v|olc_8)\.swf/i,
                        'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
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
            this.rules['tudou_out']['preHandle'] = function(elem, find, replace, player) {
                var fn = this;
                var isFx = /firefox/i.test(navigator.userAgent);
                GM_xmlhttpRequest({
                    method: isFx ? 'HEAD' : 'GET',
                    url: isFx ? player : 'http://lovejiani.cdn.duapp.com/kafan/tfetcher?turl=' + encodeURIComponent(player + '/v.swf'),
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
            var timer = setInterval(function () {
              console.log('OpenGG.Clean.Player Loaded');
              try {
                document.getElementsByTagName('head')[0].appendChild(style);
              } catch (err) {
                if ( document.readyState === 'complete' ) {
                  document.documentElement.appendChild(style);
                } else {
                  return;
                }
              }
              clearInterval(timer);
            }, 20);
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
            replace += '?goodluck';
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

            document.addEventListener('webkitAnimationStart', handler, false);
            document.addEventListener('msAnimationStart', handler, false);
            document.addEventListener('oAnimationStart', handler, false);
            document.addEventListener('animationstart', handler, false);

            this.addAnimations();
        }
    };

    new YoukuAntiAds().init();
})();