// ==UserScript==
// @name       xiamiPlayer
// @namespace  http://use.i.E.your.homepage/
// @version    0.1.2
// @description  替换歌曲页面的播放器
// @match      http://www.xiami.com/song/*
// @copyright  2012+, You
// ==/UserScript==


(function(win){	
    var id = win.location.pathname.substr(6);
    var node = document.getElementsByClassName('cd2play')[0];
    node.innerHTML += '<embed height="33" width="257" wmode="transparent" type="application/x-shockwave-flash" src="/widget/0_'+id+'/singlePlayer.swf">';
})(window);


//参考 http://www.xiami.com/song/detail/id/1770691263
// <embed height="33" width="257" wmode="transparent" type="application/x-shockwave-flash" src="/widget/0_1770691263/singlePlayer.swf">