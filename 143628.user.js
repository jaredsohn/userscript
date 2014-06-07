// ==UserScript==
// @name       QJWM.com Direct Link
// @namespace  http://userscripts.org/users/480113/scripts
// @version    1.0
// @description  给千军万马的下载链接加上直接链接
// @match      http://*.qjwm.com/down_*.html
// @copyright  2012+, XpAhH
// ==/UserScript==

(function(){
    var x=new XMLHttpRequest();
    x.open("GET",location.href.replace("/down_","/download_"));
    x.onreadystatechange=function(){
        if(this.readyState>3){
            var d=document.querySelector(".downsubmit .jubao+li a");
            d.href=this.responseText.match(/var thunder_url = "(.+)";/)[1];
            d.removeAttribute("onclick");
        }
    };
    x.send(null);
})()