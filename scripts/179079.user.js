// ==UserScript==
// @name        Video_Player_Replace_L
// @author      VoToV
// @version     2014.04.26.08:00(GMT+8)
// @updateURL   https://userscripts.org/scripts/source/179079.meta.js
// @downloadURL https://userscripts.org/scripts/source/179079.user.js
// @description Through the way of replace SWF player to solve video advertising 
//              and black screen
// ==/UserScript==

//notice:Youku is the old version with 1670
//This is the amended version,Thanks for OGG, Harv, kawaiiushio

(function() {
	Function.prototype.bind = function() {
		var fn = this, args = Array.prototype.slice.call(arguments), obj = args.shift();
		return function() {
			return fn.apply(obj, args.concat(Array.prototype.slice.call(arguments)));
		};
	};
    function VideoAntiADs() {}
    VideoAntiADs.prototype = {
	_players: null,
        _rules: null,
        _done: null,
        get players() {
            if(!this._players) {
                this._players = {
			'youku': 'http://haoutil.googlecode.com/svn/trunk/player/youku.swf',
			'tudou': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/tudou.swf',
			'tudou_olc': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/olc_8.swf',
			'tudou_sp': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/sp.swf',
			'ku6': 'http://aau0.qiniudn.com/vpr/ku6.swf',
			'ku62': 'http://aau0.qiniudn.com/vpr/ku62.swf',
			'letv': 'http://haoutil.googlecode.com/svn/trunk/player/testmod/letv.swf',
			'letv2': 'http://aau0.qiniudn.com/vpr/letv2.swf',
			'letv4': 'http://aau0.qiniudn.com/vpr/letv4.swf',
			'iqiyi': 'http://vaau0.qiniudn.com/vpr/iqiyi5.swf',
			'iqiyi2': 'http://aau0.qiniudn.com/vpr/iqiyi2.swf',
			'iqiyi4': 'http://aau0.qiniudn.com/vpr/iqiyi4.swf',
			'pps': 'http://aau0.qiniudn.com/vpr/pps.swf'
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
			'youku2': {
				'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*(\/v)?\.swf.*/i,
				'replace': this.players['youku'] + '?showAd=0&VideoIDS=$1'
			},
			'youku3': {
				'find': /^http:\/\/player\.youku\.com\/player\.php\/.*sid\/(\w+)/i,
				'replace': this.players['youku'] + '?VideoIDS=$1'
			},
			'tudou': {
				'find': /^http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
				'replace': this.players['tudou']
			},
			'tudou_out': {
				'find': /^http:\/\/www\.tudou\.com\/\w+\/v\.swf$/i,
				'replace': this.players['tudou_olc'] + '?tvcCode=-1&swfPath=' + this.players['tudou_sp']
			},
			'ku6': {
				'find': /^http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/\w+\.swf.*/i,
				'replace': this.players['ku6']
			},
			'ku62': {
				'find': /^http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
				'replace': this.players['ku62'] + '?vid=$2'
			},
			'letv1': {
				'find': /^http:\/\/.*letv[\w]*\.com[^\.]*\/.*player\/((?!Live).*)Player[^\.]*\.swf/i,
				'replace': this.players['letv2']
			},
			'letv2': {
				'find': /^http:\/\/.*letv[\w]*\.com\/.*\/v_list=[\d]+\/vid=(\w+)/i,
				'replace': this.players['letv2'] + '?vid=$1'
			},
			'letv3': {
				'find': /^http:\/\/.*letv[\w]*\.com\/(.*[\/\?]v_list=\w+$|.*\/letvbili\.swf)/i,
				'replace': this.players['letv2']
			},
			'letvdw': {
				'find': /^http:\/\/(assets\.dwstatic\.com\/video\/vpp|.*letv[\w]*\.com\/[^li]\w+)\.swf/i,
				'replace': this.players['letv4']
			},
			'iqiyi': {
				'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf$/i,
				'replace': this.players['iqiyi']
			},
			'iqiyi2': {
				'find': /^http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?(\w+).*/i,
				'replace': this.players['iqiyi2'] + '?vid=$3' + '&autoPlay=1'
			},
			'iqiyib': {
				'find': /^http:\/\/www\.bilibili\.tv\/iqiyi\.swf/i,
				'replace': this.players['iqiyi4']
			},
			'pps': {
				'find': /^http:\/\/www\.iqiyi\.com\/player\/cupid\/\w+\/pps\w+play\w+\.swf/i,
				'replace': this.players['pps']
			},
			'pps2': {
				'find': /^http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf.*$/i,
				'replace': this.players['iqiyi4']
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

            this.rules['tudou_out']['preHandle'] = function(elem, find, replace, player) {
                var fn = this;
                var isFx = /firefox/i.test(navigator.userAgent);
                GM_xmlhttpRequest({
                    method: isFx ? 'HEAD' : 'GET',
                    url: isFx ? player : 'https://query.yahooapis.com/v1/public/yql?format=json&q=' + encodeURIComponent('use"http://haoutil.googlecode.com/svn/trunk/firefox/tudou_redirect.yql.xml" as tudou; select * from tudou where url="' + player + '" and referer="' + window.location.href + '"'),
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

    new VideoAntiADs().init();
})();