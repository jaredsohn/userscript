// ==UserScript==
// @name YoukuAntiADs_Local 
// @author IMT
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告 
// @version 0.1.0.0
// @namespace http://userscripts.org/users/imt
// @updateURL https://userscripts.org/scripts/source/119622.meta.js
// @include http://*/*
// @include https://*/*
// ==/UserScript==
 

(function(document) {
    var domain = 'http://imt.youku.com:8008/';//127.0.0.1:8008/
    var loader = domain +'loader.swf';
    var ku6 = domain +'ku6.swf';
    var iqiyi = domain +'iqiyi.swf';
    var iqiyi5 = domain +'iqiyi5.swf';
    var tudou = domain +'tudou.swf';
    var players = {
        'youku': {
            find: /http:\/\/static\.youku\.com(\/v[\d\.]+)?\/v\/swf\/(loader|q?player[^\.]*)\.swf/i,
            replace: loader
        },
        'youku_out': {
            find: /http:\/\/player\.youku\.com\/player\.php\/.*sid\/([\w=]+).*\/v\.swf/i,
            replace: loader + '?showAd=0&VideoIDS=$1'
        },
        'ku6': {
            find: /http:\/\/player\.ku6cdn\.com\/default\/.*\/\d+\/player\.swf/i,
            replace: ku6
        },
        'iqiyi': {
            find: /http:\/\/www\.iqiyi\.com\/player\/\d+\/player\.swf/i,
            replace: iqiyi
        },
        'iqiyi_out': {
            find: /http:\/\/player\.video\.i?qiyi\.com\/([^\/]*)\/.*/i,
            replace: iqiyi5 + '?vid=$1'
        },
        'tudou': {
            find: /http:\/\/js\.tudouui\.com\/.*player[^\.]*\.swf/i,
            replace: tudou
        },
        'tudou_out': {
            find: /http:\/\/www\.tudou\.com\/.*\/v\.swf/i,
            replace: tudou + '?tvcCode=-1'
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

        var find, replace;
        for(var i in players) {
            find = players[i].find;
            if(find.test(player)) {
                var isReplacing = false;
                replace = players[i].replace;
                if(i == 'iqiyi' && document.querySelector('span[data-flashplayerparam-flashurl]')) {
                    replace = iqiyi5;
                } else if(i == 'tudou_out') {
                    if(/(iid|youkuId)=[^\/]+/.test(player)) {
                         replace += player.replace(/.*((iid|youkuId)=[^\/]+).*/, '&$1');
                    } else {
                        isReplacing = true;
                        if(!GM_xmlhttpRequest) return;

                        GM_xmlhttpRequest({
                            method: 'HEAD',
                            url: player,
                            onload: function(response) {
                                replace += response.finalUrl.replace(/.*[?&]((iid|youkuId)=[^&]+).*/, '&$1');
                                reallyReplace();
                            }
                        });
                    }
                }
                if(!isReplacing) {
                    reallyReplace();
                }

                break;
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