// ==UserScript==
// @name        Runescape - Show My Threads
// @namespace   Shaun Dreclin
// @include     http://services.runescape.com/m=forum/*users.ws*
// @version     1
// @grant       GM_xmlhttpRequest
// ==/UserScript==

var username = document.getElementsByClassName("G5")[0].innerHTML.substr(16);

for(i = 0; i < document.getElementsByTagName("a").length; i++) {
    var link = document.getElementsByTagName("a")[i];
    if(link.href.indexOf("thd") == -1 && link.href.indexOf("&showuser=") == -1 && link.href.indexOf("forums.ws?") != -1 && link.href.split(",").length > 2) {
        GM_xmlhttpRequest({
            method: "GET",
            url: link.href,
            context: link,
            onload: function(response) {
                var name = response.responseText.split("users.ws?searchname=")[1];
                name = name.split("&lookup")[0];
                name = name.replace(/%A0/g, " ")
                if(name != username) {
                    response.context.parentNode.parentNode.style.opacity = "0.3";
                }
            }
        });
    }
}