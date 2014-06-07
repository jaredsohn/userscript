// ==UserScript==
// @name           ACFUN Video Width
// @description    在ACFUN页面上增加改变视频宽度功能
// @match          http://*.acfun.tv/v/*
// @updateURL      http://userscripts.org/scripts/source/145529.meta.js
// @downloadURL    http://userscripts.org/scripts/source/145529.user.js
// @author         233
// @version        1.1.1
// ==/UserScript==

// 2013年6月14日更新，对应ACFUN Ver 0.0.5.6 @ 5.10.2013的某个小更新-_-#

(function(){

function changeTo(wid) {
    //Created by 'ACFUN Video Width' UserScript
    
    wid = Math.floor(wid);

    if (wid == 0) {
        return;
    }
    
    var w = wid + 330;
    //播放器宽度980-视频宽度650

    var h = Math.floor(wid / 16 * 10) + 40;
    //播放器高度480-视频高度440
    if (h < 480) {
        h = 480;
    } //最小高度480

    var l = 0;

    if (wid + 6 > 980) {
        l = -Math.floor((wid + 6 - 980) / 2);
    } //视频宽度大于默认宽度时左移播放器，6是播放器的边框宽度
      //播放器将超出页面时？有哪里不对，不研究了  || ( (w-$(window).width()) > ($(window).width()-980/2) )

    $("#ACFlashPlayer-re").css({
        width: w + "px",
        height: h + "px",
        left: l + "px",
        top: "0px"
    });
    //AC突然放弃iframe嵌入播放器了，而调整flash的position会导致flash重新载入，反正relative也不影响效果的样子……
    /*$("#area-player.video").css({
        height: (h + 6) + "px"
    }); //播放器容器的高度，比播放器多6px，不知道为什么*/
}

if (document.getElementById("ACFlashPlayer-re")) {
    var myscript = document.createElement("script");
    myscript.textContent = changeTo.toString();
    document.body.appendChild(myscript);

    var myspan = document.createElement("span");
    iHTML = "&nbsp;/&nbsp;&nbsp;<a onmouseover='$(\"#change-title\").show();$(\"#change-title\").mouseleave(function() {$(this).hide();});'>改变宽度</a><span id='change-title' style='float:right;display:none;'>宽度:<a href='javascript:void(0);' onclick='changeTo(540);'>540</a> <a href='javascript:void(0);' onclick='changeTo(650);'>650</a> <a href='javascript:void(0);' onclick='changeTo(720);'>720</a> <a href='javascript:void(0);' onclick='changeTo(800);'>800</a> <a href='javascript:void(0);' onclick='changeTo(864);'>864</a> <a href='javascript:void(0);' onclick='changeTo(960);'>960</a> <a href='javascript:void(0);' onclick='changeTo(1280);'>1280</a> <a href='javascript:void(0);' onclick='changeTo(prompt(\"请输入宽度。\",540));'>...</a></span>";
    myspan.innerHTML = iHTML;
    document.getElementById("subtitle-article").appendChild(myspan);
}

})();