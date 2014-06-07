// ==UserScript==
// @id             bilibili_player
// @name           bilibili播放器修正
// @version        1.1.2
// @namespace      rox
// @author         Rox Dorentus <zhangyi.cn@gmail.com>
// @description    bilibili播放器
// @include        http://www.bilibili.tv/video/av*
// @updateURL      http://userscripts.org/scripts/source/171985.meta.js
// @downloadURL    http://userscripts.org/scripts/source/171985.user.js
// @run-at         document-end
// ==/UserScript==

// see:
//   http://userscripts.org/scripts/review/165219
//   http://zythum.sinaapp.com/youkuhtml5playerbookmark/

var G_CID, G_AID;

function unsafeWindowGet(keypath) {
    try {
        return eval('unsafeWindow.' + keypath);
    }
    catch (e) {
        var element = document.body;
        var div = document.createElement("div");
        div.style.cssText = "width:0 ; height:0 ; position:absolute ; overflow:hidden";
        div.innerHTML = "<input onfocus='this.value=window."+ keypath +";' />";
        var input = div.firstChild;
        element.appendChild(div);
        input.focus();
        var value = input.value;
        element.removeChild(div);
        return value;
    }
    return undefined;
}

function getAidCidAndThen(callback) {
    if (G_CID && G_AID) {
        callback(G_CID, G_AID);
    }
    else {
        var location = /http:\/\/www\.bilibili\.tv\/video\/av([0-9]+)(?:index_([0-9]+)\.html)?/.exec(document.URL);
        if (location[2] == undefined) {
            location[2] = null;
        };

        G_AID = location[1];
        G_CID = unsafeWindowGet('flashvars.cid');
        callback(G_CID, G_AID);
    }
}

function replacePlayer() {
    getAidCidAndThen(function(cid, aid) {
        var iframe = document.createElement('iframe');
        iframe.width = 950;
        iframe.height = 490;
        iframe.src = 'https://secure.bilibili.tv/secure,cid=' + cid + '&amp;aid=' + aid;
        iframe.setAttribute('scrolling', 'no');
        iframe.setAttribute('border', 0);
        iframe.setAttribute('frameborder', 0);
        iframe.setAttribute('framespacing', 0);
        iframe.setAttribute('style', 'width: 950px; height: 588px; margin-top: 5px;');

        var player = document.querySelector("#bofqi");
        player.innerHTML = '';
        player.appendChild(iframe);
    });
}

function replacePlayer2() {
    getAidCidAndThen(function(cid, aid) {
        var bplayer = document.createElement("embed");
        bplayer.type = "application/x-shockwave-flash";
        bplayer.width = 950;
        bplayer.height = 482;
        bplayer.src = "https://static-s.bilibili.tv/play.swf";
        bplayer.setAttribute("flashvars", "aid=" + aid + "&cid=" + cid);
        bplayer.setAttribute("quality", "high");
        bplayer.setAttribute("allowfullscreen", "true");
        bplayer.setAttribute("allowscriptaccess", "always");
        bplayer.setAttribute("rel", "noreferrer");

        var player = document.querySelector("#bofqi");
        player.innerHTML = '';
        player.appendChild(bplayer);
    });
}

var player = document.querySelector("#bofqi");
var shouldReplace = (player && /iqiyi|sohu/.test(player.innerHTML));

var titleElement = document.querySelector('.videobox > .viewbox > .info > h2');
if (titleElement) {
    var containerElement = document.createElement('h2');
    containerElement.setAttribute('style', 'margin-bottom: 0px; margin-top: 3px; margin-left: 15px;');
    titleElement.parentNode.insertBefore(containerElement, titleElement.nextSibling);

    if (shouldReplace) {
        var replacerButton = containerElement.appendChild(document.createElement('button'));
        replacerButton.innerHTML = '原版(iframe)';
        replacerButton.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            replacePlayer();
        });

        var replacerButton2 = containerElement.appendChild(document.createElement('button'));
        replacerButton2.innerHTML = '原版(swf)';
        replacerButton2.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            replacePlayer2();
        });
    }

    var html5Button = containerElement.appendChild(document.createElement('button'));
    html5Button.innerHTML = 'HTML5';
    html5Button.setAttribute('title', 'http://zythum.sinaapp.com/youkuhtml5playerbookmark/');
    html5Button.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        var l = document.createElement('link');
        l.setAttribute('rel', 'stylesheet');
        l.setAttribute('media', 'all');
        l.setAttribute('href', 'http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.css');
        document.body.appendChild(l);
        var s = document.createElement('script');
        s.setAttribute('src', 'http://zythum.sinaapp.com/youkuhtml5playerbookmark/youkuhtml5playerbookmark2.js');
        document.body.appendChild(s);
    });
}
