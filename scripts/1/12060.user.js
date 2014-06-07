// ==UserScript==
// @name           add link to niconico watch page
// @namespace      http://cocoromi.s57.xrea.com
// @include        http://www.nicovideo.jp/watch/*
// ==/UserScript==

(function(){
    const TARGET_ID = "PAGEHEADER";
    const PLAYER_ID = "flvplayer_container";
    const DISPLAY_NONE = "none";
    function get_dl_link(a_elem , div){
        GM_xmlhttpRequest({
            method : "GET",
            url : "http://www.nicovideo.jp/api/getflv?v="+a_elem.href.replace(/http.*?watch\/(.*)$/g,"$1"),
            onload : function(req){
                add_link(req , a_elem , div);
            },
            onerror : function (req) {
                alert(req.responseText);
            }
        });
    }

    function add_link(req , a_elem , div) {
        var url=unescape(/\&url\=(.*?)\&/.exec(req.responseText)[1]);
        var divd = document.createElement("div");
        divd.innerHTML += '<a> DL </a>';
        divd.style.cursor = "pointer";
        divd.addEventListener('click' , function () {
                document.getElementById(PLAYER_ID).innerHTML = DISPLAY_NONE;
                GM_openInTab(url);
            },
            true
        );
        
        div.appendChild(divd);
    }
    get_dl_link(window.location , document.getElementById(TARGET_ID));
})();