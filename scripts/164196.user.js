// ==UserScript==
// @name YoukuAntiADs
// @author Harv
// @description 通过替换swf播放器的方式来解决优酷的黑屏广告
// @version 0.1.7.3
// @namespace http://userscripts.org/users/Harv
// @updateURL https://userscripts.org/scripts/source/119622.meta.js
// @include http://*/*
// @include https://*/*
// ==/UserScript==

/*
 * === 申明 ===
 * 本脚本使用的播放器虽然是本人修改制作的，但是使用了鲁夫v.opengg.me的内容
 * 这是因为在不久的以前优酷开始限制第三方播放器获取节目列表
 * 详情可以参见鲁夫的博文《万恶的优酷》（http://opengg.me/854/evil-youku/）
 *
 * 在这里感谢鲁夫提供的v.opengg.me以及他的优秀的作品！！！
 *
 * 同时，在这里说明一下制作这个播放器的目的，那就是为了记住播放历史
 * 如果您不建议有无历史记录，您可以直接使用鲁夫的脚本
 * OpenGG.Clean.Player（http://userscripts.org/scripts/show/120679）
 * 同样可以给您带来优质的体验
 *
 * 注：现在已不需要依赖鲁夫的服务器了！
 */

/* History
 * 2013-4-2 v0.1.7.3 完善ku6，tudou规则
 * 2013-4-1 v0.1.7.2 完善ku6规则
 * 2013-3-31 v0.1.7.1 完善tudou外链
 * 2013-3-31 v0.1.7 增加对tudou支持（需要flashplayer11+）
 *                  增加对tudou外链不完美支持（需要安装脚本管理器，除Firefox外未测）
 *                  同时感谢15536900（http://bbs.kafan.cn/thread-1507278-1-1.html），以后播放器的更新以他为主
 * 2013-3-22 v0.1.6.1 增加iqiyi v5播放器（本身支持js脚本的浏览器已不再需要脚本管理器）
 * 2013-3-18 v0.1.6  完善youku规则，增加对iqiyi支持（各浏览器需要安装脚本管理器）
 * 2013-2-7 v0.1.5.1 修正css，修正opera兼容性
 * 2013-2-5 v0.1.5 多浏览器支持
 * 2012-11-19 v0.1.4 解决Fx17+不再支持CDATA引起的问题
 * 2012-10-25 v0.1.3 添加申明，感谢鲁夫提供的优酷节目列表转发功能
 * 2012-9-8 v0.1.2 解决百度贴吧视频不能显示的问题. example:http://tieba.baidu.com/p/1812024947
 * 2012-9-8 v0.1.1 googlecode 版本控制由 git 调整为 svn，现在应该不会白屏了.
 * 2012-9-1 v0.1 替换播放器调整，记住播放历史还是要的 @_@ !
 * 2012-8-17 v0.0.9 调整优酷swf匹配规则，同时替换播放器换成opengg.me
 * 2012-6-26 v0.0.8 使用 animationstart 事件代替 DOMNodeInserted. from http://opengg.me/784/high-performance-domnodeinserted-hack/
 * 2012-3-22 v0.0.7 使用网友CzBiX推荐的无广告完整功能player.cws.swf
 * 2012-2-15 v0.0.6 直接使用http://static.youku.com/v/swf/qplayer.swf替换swf播放器，不再需要获取swf版本号
 * 2012-1-7 v0.0.5 支持 DOMNodeInserted. example:http://live.taobao.com/detail/2011/12/22/567106/1.php?spm=1.51914.112571.4
 * 2011-12-20 v0.0.4 更改替换策略，使用prefs存贮swf版本号，定时更新（默认7天更新一次）
 * 2011-12-14 v0.0.3 更新
 * 2011-12-4 v0.0.2 增加对优酷外链的支持
 * 2011-12-3 v0.0.1 第一个版本
 */

(function(document) {
    var loader = 'http://haoutil.googlecode.com/svn/trunk/player/testmod/testmod/loader.swf';
    var ku6 = 'http://haoutil.googlecode.com/svn/trunk/player/testmod/ku6.swf';
    var iqiyi = 'http://haoutil.googlecode.com/svn/trunk/player/testmod/iqiyi.swf';
    var iqiyi5 = 'http://haoutil.googlecode.com/svn/trunk/player/testmod/iqiyi5.swf';
    var tudou = 'http://haoutil.googlecode.com/svn/trunk/player/testmod/tudou.swf';
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