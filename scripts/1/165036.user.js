// ==UserScript==
// @name 去除youku.ku6.iqiyi.tudou.letv广告
// @author ccKevin
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告
// @version 1.6
// @updateURL https://userscripts.org/scripts/source/165036.meta.js
// @include http://*/*
// @include https://*/*
// ==/UserScript==

(function(document) {
    var loader = 'http://cckevin.cdn.duapp.com/swf/loader.swf';
    var ku6 = 'http://cckevin.cdn.duapp.com/swf/ku6.swf';
    var iqiyi = 'http://cckevin.cdn.duapp.com/swf/iqiyi.swf';
    var iqiyi5 = 'http://cckevin.cdn.duapp.com/swf/iqiyi5.swf';
    var tudou = 'http://cckevin.cdn.duapp.com/swf/tudou.swf';
    var letv = 'http://cckevin.cdn.duapp.com/swf/letv.swf';
    var players = {
        'youku': {
            find: /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/(loader|q?player[^\.]*)\.swf/i,
	        replace: loader
        },
        'youku_out': {
            find: /http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*\.swf/i,      
	        replace: loader + '?showAd=0&VideoIDS=$1'
        },
        'ku6': {
            find: /http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
            replace: ku6
        },
	    'ku6_out': {
            find: /http:\/\/player\.ku6\.com\/(inside|refer)\/([^\/]+)\/v\.swf.*/i,
            replace: ku6 + '?vid=$2'
        },
        'letv1': {
            find: /http:\/\/.*letv[\w]*\.com\/[^\.]*\/.*player\/((?!Live).*)Player[^\.]*\.swf/i,
            replace: letv
        },
        'letv2': {
            find: /http:\/\/.*letv[\w]*\.com\/.*player[^\.]*\.swf\?v_list=[\d]/i,
            replace: letv
        },
        'letv3': {
            find: /http:\/\/.*letv[\w]*\.com\/.*\/v_list=[\d]*\/*\.swf/i,
            replace: letv
        },
        'tudou': {
            find: /http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
            replace: tudou
        },
        'tudou_out': {
            find: /http:\/\/www\.tudou\.com\/v\/\w+\/v\.swf|http:\/\/www\.tudou\.com\/[a-z]\/.*resourceId=(\w+)\/v\.swf/i,
            replace: tudou + '?tvcCode=-1&autostart=false'
			//replace: tudou + '?tvcCode=-1'
        },
        'iqiyi': {
            find: /http:\/\/www\.iqiyi\.com\/player\/\d+\/Player\.swf/i,
            replace: iqiyi
        },
        'iqiyi_out': {
            //find: /http:\/\/player\.video\.i?qiyi\.com\/([^\/]*)\/.*/,
	        find: /http:\/\/(player|dispatcher)\.video\.i?qiyi\.com\/(.*[\?&]vid=)?([^\/&]+).*/i,
            replace: iqiyi5 + '?vid=$3'
        }
    };

    var done = [];

    function reloadPlugin(elem) {
        var nextSibling = elem.nextSibling;
        var parentNode = elem.parentNode;
        parentNode.removeChild(elem);
        var newElem = elem.cloneNode(true);
        done.push(newElem);
        if(nextSibling) {
            parentNode.insertBefore(newElem, nextSibling);
        } else {
            parentNode.appendChild(newElem);
        }
    }

    function replace(elem) {
        if(done.indexOf(elem) != -1) return;
        done.push(elem);

        var player = elem.data || elem.src;
        if(!player) return;

        var i, find, replace, isReplacing = false;
        for(i in players) {
            find = players[i].find;
            if(find.test(player)) {
                replace = players[i].replace;
                
                preHandle();

                if(!isReplacing) {
                    reallyReplace();
                }
                break;
            }
        }

        function preHandle() {
            if(i == 'iqiyi' && document.querySelector('span[data-flashplayerparam-flashurl]')) {
                replace = iqiyi5;
            } else if(i == 'tudou_out') {
                var match = player.match(/(iid|youkuId)=[^\/]+/i);
                if(match) {
                     replace += '&' + match[0];
                } else {
                    isReplacing = true;
                    var icode = player.match(/\/([^\/]{11})\/.*v\.swf/i);
                    if(icode) {
                        GM_xmlhttpRequest({
                            method: 'GET',
                            url: 'http://api.tudou.com/v3/gw?method=item.info.get&appKey=myKey&format=json&itemCodes=' + icode[1],
                            onload: function(response) {
                                var obj = eval('(' + response.responseText + ')');
                                if(obj) {
                                    replace += '&iid=' + obj['multiResult']['results'][0]['itemId'];
                                    reallyReplace();
                                }
                            }
                        });
                    }
                }
            }
        }

        function reallyReplace() {
            elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
            reloadPlugin(elem);
        }
    }
    
    function addAnimations() {
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
    }
    
    function animationsHandler(e) {
        if(e.animationName === 'playerInserted') {
            replace(e.target);
        }
    }
    
    document.body.addEventListener('webkitAnimationStart', animationsHandler, false);
    document.body.addEventListener('msAnimationStart', animationsHandler, false);
    document.body.addEventListener('oAnimationStart', animationsHandler, false);
    document.body.addEventListener('animationstart', animationsHandler, false);
  
    addAnimations();

})(window.document);