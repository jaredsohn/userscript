// ==UserScript==
// @name           NicoNicoDouga GINZA change.
// @namespace      Shigecky
// @description    ニコニコ動画(GINZA)の再生ページで詳細情報の常時表示と構成変更。I change regular indication and constitution of the detailed information of it in a reproduction page of NicoNicoDouga(GINZA). 2013/10/8 update support.
// @include        http://www.nicovideo.jp/watch/*
// @grant          none
// @homepage       http://userscripts.org/scripts/show/174758
// @updateURL      http://userscripts.org/scripts/source/174758.user.js
// @version        0.1.2
// ==/UserScript==

(function(w) {
    var getFirstElementByClassName = function(targetElm, tagName, className) {
        var nodes = targetElm.getElementsByTagName(tagName);
        for (var i = 0; i < nodes.length; i++) {
            if (nodes[i].className == className) return nodes[i];
        }
        return null;
    };
    
    var videoHeader = document.getElementById('videoHeader');
    var videoDetailOpenButton = getFirstElementByClassName(videoHeader, 'span', 'open  videoDetailOpenButton');
    videoDetailOpenButton.click();
    
    var bottomContentTabContainer = document.getElementById('bottomContentTabContainer');
    bottomContentTabContainer.insertBefore(videoHeader, document.getElementById('videoExplorer'));
    
    var detailExpander = getFirstElementByClassName(videoHeader, 'div', 'toggleDetailExpand');
    detailExpander.style.display = 'none';
    
    var shortVideoInfo = getFirstElementByClassName(videoHeader, 'div', 'shortVideoInfo');
    shortVideoInfo.style.display = 'none';
    
    var videoHeaderMenu = document.getElementById('videoHeaderMenu');
    videoHeaderMenu.style.display = 'none';
    
    var topVideoInfo = document.getElementById('topVideoInfo');
    
    var userProfile = getFirstElementByClassName(topVideoInfo, 'div', 'userProfile');
    var videoHeaderDetail = document.getElementById('videoHeaderDetail');
    videoHeader.insertBefore(userProfile, videoHeaderDetail);
    userProfile.style.cssFloat = 'right';
    
    var videoDesc = getFirstElementByClassName(topVideoInfo, 'p', 'videoDescription description');
    videoHeader.appendChild(videoDesc);
    
    var videoMenuToggleButton = getFirstElementByClassName(videoHeader, 'a', 'videoMenuToggle videoMenuToggleButton');
    videoMenuToggleButton.style.position = 'static';
    videoMenuToggleButton.style.cssFloat = 'right';
    var videoTagContainer = document.getElementById('videoTagContainer');
    videoHeader.insertBefore(videoMenuToggleButton, videoTagContainer);
    
    // 下部のプレイリストを消す
    document.getElementById('playlist').style.display = 'none';
    document.getElementById('videoExplorerExpand').style.display = 'none';
    
    // タイトルをページトップへ
    var playerContainerWrapper = document.getElementById('playerContainerWrapper');
    var bounds = playerContainerWrapper.getBoundingClientRect();
    w.scrollTo(bounds.left, bounds.top + 14);
    
    window.addEventListener("load", function() { setTimeout(blurTagContainer(), 0); }, false);
    videoTagContainer.addEventListener('mouseout', function(){ setTimeout(blurTagContainer, 500); }, false);
    
})(this.unsafeWindow || this);
