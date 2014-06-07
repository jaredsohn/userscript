// ==UserScript==
// @name        1322(原4399)下载辅助
// @namespace   http://www.xsecure.cn/
// @description 1322(原4399)游戏盒页面下载辅助工具
// @include     http://www.1322.com/pcgameinfo_*.html*
// @grant       none
// @updateURL		https://userscripts.org/scripts/source/147462.meta.js
// @downloadURL		https://userscripts.org/scripts/source/147462.user.js
// @version     0.0.5
// ==/UserScript==

function downloadHelperFor1322() {
    var url = window.location.toString();
    var host = window.location.host;
    
    try {
        var game_id = url.match(/^http:\/\/www\.1322\.com\/pcgameinfo_(.+)\.html/)[1]
    }
    catch(err) {
        return false;
    }
    
    try {
        var down_btn = document.getElementById("download");
    }
    catch(err) {
        return false;
    }
    
    down_btn.removeAttribute("onclick");
    down_btn.addEventListener("click", function(event) {
            var game_dir = game_id.substring(0,game_id.length - 3);
            if(game_dir == '') {
                game_dir = '0';
            }
            var down_url = "http://p2pcdn.1322.com/download/games/" + game_dir + "/" + game_id + ".zip";
            GM_openInTab(down_url);
        }, false
    );
}

if(true) {
    downloadHelperFor1322();
}