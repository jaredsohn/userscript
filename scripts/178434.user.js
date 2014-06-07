// ==UserScript==
// @name        search_input_fixed
// @namespace   https://minhill.com
// @description 为超星图书和网易公开课搜索框填入关键词
// @include     http://202.116.65.59:8080/markbook/BookSearch.jsp*
// @include     http://so.open.163.com/movie/search/searchprogram*
// @updateURL   https://userscripts.org/scripts/source/178434.meta.js
// @downloadURL https://userscripts.org/scripts/source/178434.user.js
// @version     0.2
// ==/UserScript==
if(document.getElementById('getpingdao')){
    var patt= new RegExp("Word=(.*)&Library");
    str = patt.exec(location.href)[1];

    urldecode(str, 'gbk', function(str) {
                //alert(str);
                document.getElementById('KeyWord').value = str;
    })
}

if(document.getElementById('vsearch')){
    var patt= new RegExp("vs=(.*)&pltype");
    str = patt.exec(location.href)[1];
    urldecode(str, 'gbk', function(str) {
                //alert(str);
                document.getElementById('vsearch').value = str;
    })
}

    function urldecode(str, charset, callback) {
            window._urlDecodeFn_ = callback;
            var script = document.createElement('script');
            script.id = '_urlDecodeFn_';
            var src = 'data:text/javascript;charset=' + charset + ',_urlDecodeFn_("' + str + '");'
            src += 'document.getElementById("_urlDecodeFn_").parentNode.removeChild(document.getElementById("_urlDecodeFn_"));';
            script.src = src;
            document.body.appendChild(script);
    }