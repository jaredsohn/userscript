// ==UserScript==
// @name          Bilibili Douga No Login require
// @namespace     http://jixun.org/
// @version       0.1
// @description   Don't need account to view restricted video e.g. Billy Herrington's video (..)
// @match         *://bilibili.tv/video/av*
// @match         *://www.bilibili.tv/video/av*
// @copyright     2012+, Jixun
// ==/UserScript==

/* 服务器端已经写好 (未设置)，和 AcgZone 免代理原理差不多，不过输出变成了 JSON */

(function () {
    var server = 'localhost';
    try { var $ = unsafeWindow.$; var jQuery = unsafeWindow.jQuery; /* Load jQuery. */ }
    catch (e) { return; /* Not on the correct page, exit.. */ }
    var d    = document;
    var body = d.getElementsByTagName ('body')[0];
    /*
     *  Notification box
     *    -- Display log etc.
     *         -- From: acfun.tv
     */
    var notificationCSS = '/* Notification box CSS */';
    var notification    = d.createElement("div");
    notificationCSS += "#notify  { position: fixed; left: 16px; bottom: 32px; width: auto; text-align: left; z-index: 10; background-color: rgba(0, 0, 0, 0.9); margin: 0; padding: 0; border-radius: 2px; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); }";
    notificationCSS += "#notify .item { width: auto; min-height: 16px; height: auto!important; line-height: 16px; font-size: 14px; font-weight: bold; display: block; position: relative; color: white; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); padding: 0 4px; margin: 8px 4px; border-left: 4px solid #C00; z-index: 9998; word-wrap: break-word; -webkit-transition: opacity 5s ease-in; -moz-transition: opacity 5s ease-in; -o-transition: opacity 5s ease-in; }";
    GM_addStyle(notificationCSS);
    notification.id = "notify";
    body.appendChild (notification);
    function removeElement (elementNode) { try { elementNode.parentNode.removeChild (elementNode); } catch (e) { /* Do nothing */ } }
    function fade_out (Ele) { Ele.style.opacity = 0; setTimeout( function () { removeElement (Ele); } , 5100); }
    function AddLog (Code, Delay) {
        if (Delay == undefined) { Delay = 500; /* 500 ms delay. */ } 
        var p = d.createElement("p");
        p.className = 'item';
        p.innerHTML = Code.replace(/\n/g, '<br />');
        p.addEventListener('click', function () { fade_out (this) }, true);
        notification.appendChild (p);
        if (Delay >= 0) { setTimeout (function () { fade_out (p) }, Delay); }
    }
    function dynLoadScript (addr) {
        newElement      = d.createElement("script");
        newElement.type = "text/javascript";
        newElement.src  = addr;
        d.getElementsByTagName("head")[0].appendChild(newElement);
    }
    dynLoadScript ('http://static.hdslb.com/js/page.arc.js');
    zMsg = $('.z-msg');
    if (zMsg.length == 0) { return; } // 登录需要检查
    var zMsg = zMsg[0]; // Re-define
    var d         = d;
    var localhref = d.location.toString();
    var avId = (new RegExp(/\/video\/av([\d]+)\//im).exec(localhref)||['','']) [1];
    var pId  = (new RegExp(/\/video\/av[\d]+\/index_([\d]+).html/im).exec(localhref)||['',1]) [1];
    if (avId[1] == '') { AddLog ('Av 号获取失败!'); return; }
    if (!new RegExp (/\<a href=".+\/login\.php"\>/img).test(zMsg.innerHTML)) { AddLog ('不需要登录。'); return; } // No log in needed.
    AddLog ('开始与服务器通信... \n\nAv号: av' + avId + '\nPart: ' + pId);
    GM_xmlhttpRequest({
        method : 'GET',
        synchronous : true,
        url : "http://" + server + "/getBiliDouga.php?avId=" + avId + '&pId=' + pId,
        onload : function (Response) {
            try {
            var o = jQuery.parseJSON (Response.responseText);
            d.title = o.title + ' - ' + d.title;
            zMsg.innerHTML = ('<h2>' + o.title + '</h2><br />\
<embed id="bofqi_embed" height="500" width="950" flashvars="cid=' + o.cid + '&amp;aid=' + o.aid + '" src="https://static-s.bilibili.tv/play.swf" type="application/x-shockwave-flash"\
allowscriptaccess="always" allowfullscreen="true" quality="high" style="width: 950px; height: 500px;">\
<div class="intro" style="text-align: left; padding-left: 30px;">' + o.desc + '<br /><p>By: <a href="http://space.bilibili.tv/' + o.userId + '" target="_blank">' + o.userName + '</a></p></div>\
').replace (/[\n|\r]/g);
            } catch (e) { AddLog ('出错了 >.>'); return; }
            AddLog ('传输完毕，尽情享受B站吧 :D');
        },
        onerror : function (e) {
            AddLog ('网络连接中断\nChrome 用户请确保您使用了插件 Tampermonkey。');
        }});
} ());