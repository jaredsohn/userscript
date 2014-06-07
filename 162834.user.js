// ==UserScript==
// @name OpenGG.Clean.Player（Kingme
// @author Harv Opengg Kawaiiushio
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告
// @version 1.35
// @namespace http://userscripts.org/users/kawaiiushio
// @updateURL https://github.com/HuChundong/SWF_NOAD/raw/master/opengg.user.js
// @include http://*/*
// @include https://*/*
// ==/UserScript==

/*
 * === 申明 ===
 * dev
 */

/* History
 * dev
 */

(function(document) {
    var loader = 'https://github.com/HuChundong/SWF_NOAD/raw/master/loader.swf';
    var ku6 = 'https://github.com/HuChundong/SWF_NOAD/raw/master/ku6.swf';
    var iqiyi = 'https://github.com/HuChundong/SWF_NOAD/raw/master/iqiyi.swf';
    var players = {
        'youku': {
            find: /http:\/\/static\.youku\.com(\/v[\d\.]*)?\/v\/swf\/(q?player.*|loader)\.swf/,
            replace: loader
        },
        'youku_out': {
            find: /http:\/\/player\.youku\.com\/player\.php\/(.*\/)?sid\/([\w=]+)\/v\.swf/,
            replace: loader + '?showAd=0&VideoIDS=$2'
        },
        'ku6': {
            find: /http:\/\/player\.ku6cdn\.com\/default\/common\/player\/\d*\/player\.swf/,
            replace: ku6
        },
        'iqiyi': {
            find: /http:\/\/www\.iqiyi\.com\/player\/\d+\/Player\.swf/,
            replace: iqiyi
		},
        'tudouportalplayerhome9': {
            find: /^http:\/\/js\.tudouui\.com\/.*?\/TudouYoukuPlayer_Homer[^.]*?\.swf/,
            replace: 'http://lovejiani.duapp.com/opengg/TudouYoukuPlayer_Homer_9.swf'
        },
        'tudouportalplayerhome238': {
            find: /^http:\/\/js\.tudouui\.com\/.*?\/TudouVideoPlayer_Homer_[^.]*?.swf/,
            replace: 'http://lovejiani.duapp.com/opengg/TudouVideoPlayer_Homer_238.swf'
        },
        'tudounplayer': {
            find: /^http:\/\/dp\.tudou\.com\/nplayer[^.]*?\.swf|http:\/\/js\.tudouui\.com\/doupao\/nplayer[^.]*?\.swf/,
            replace: 'http://lovejiani.duapp.com/opengg/nplayer.swf'
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

        var find, replace;
        var player = elem.data || elem.src;
        if(!player) return;

        for(var i in players) {
            find = players[i].find;
            replace = players[i].replace;
            if(find.test(player)) {
                if(i == 'iqiyi') {
                    if(player != unsafeWindow.flashUrl) return;
                }
                elem.data && (elem.data = elem.data.replace(find, replace)) || elem.src && ((elem.src = elem.src.replace(find, replace)) && (elem.style.display = 'block'));
                reloadPlugin(elem);
                break;
            }
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
