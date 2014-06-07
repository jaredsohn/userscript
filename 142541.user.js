// ==UserScript==
// @name       Baidu Ressafe Redirection Skipper
// @version    0.0.1
// @description  取消百度对360搜索和Google搜索的自动跳转，取消360搜索结果中对百度网址自动设为快照。
// @include    http://*baidu.com/search/ressafe.html*
// @include    http://*so.360.cn/s?q=*
// @author     RootFoot

// ==/UserScript==
(function(){
    var bdrs=window.location.href;
    if (bdrs.match("ressafe\\.html\\?q=.*&url=.*baidu.com")) {
        window.location.href=window.location.href.replace(/.*url=(.*)&*/,"$1");
    };

    var url360=window.location.href;
    if (url360.match("http://so.360.cn/s\\?q=")) {
        for (var i = 0; i <  document.getElementsByTagName("h3").length; i++) {
            var bdlink = document.getElementsByTagName("h3")[i].getElementsByTagName("a")[0];
            if (bdlink.href.match("http://cacheso\\.360\\.cn/c\\?m=")) {
                var olink=bdlink.href.replace(/.*&u=(.*)&*/,"$1");
                bdlink.href=decodeURIComponent(olink);
            };
        };
    };
})();