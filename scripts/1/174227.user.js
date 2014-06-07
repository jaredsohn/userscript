// ==UserScript==
// @name        Steam Info
// @namespace   http://userscripts.org/users/deparsoul
// @description 快速查询Steam游戏信息
// @include     http://steamdb.sinaapp.com/sync
// @version     0.2
// ==/UserScript==

if(document.URL == 'http://steamdb.sinaapp.com/sync'){
    document.getElementById('noScript').style.display = 'none';
    document.getElementById('withScript').style.display = 'block';
    load('http://steamcommunity.com/my/games?tab=all', 'own');
    load('http://steamcommunity.com/my/wishlist', 'wish');
}else{
    var script = document.createElement("script");
    script.setAttribute("src", "http://steamdb.sinaapp.com/steam_info.js");
    document.body.appendChild(script);
}

function exec(fn) {
    location.assign("javascript:"+fn);
}

//Load page at url into element with id
function load(url, id){
    GM_xmlhttpRequest({
        method: "GET",
        url: url,
        onload: function(response) {
            document.getElementById(id+'_before').style.display = 'none';
            document.getElementById(id+'_after').style.display = 'block';
            document.getElementById(id).innerHTML=escape(response.responseText);
            exec('proc_'+id+'()');
        }
    });
}
