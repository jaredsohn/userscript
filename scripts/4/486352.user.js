// ==UserScript==
// @name            BiteFight: PluginVamp
// @namespace		BiteFight: PluginVamp
// @description     Плагин для игры BiteFight
// @author          Asiman
// @include         http://*.ru.bitefight.gameforge.com/*
// @version 		0.1
// ==/UserScript==

var interval = setInterval((function() {
    function getXmlHttp(){
      var xmlhttp;
      try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
          xmlhttp = false;
        }
      }
      if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
        xmlhttp = new XMLHttpRequest();
      }
      return xmlhttp;
    }

    function getAvatar(src){
        var playerUserPic = document.getElementById("playerUserPic").getElementsByTagName("img")[0];
        var xhr = getXmlHttp();
        xhr.open('GET', 'http://bf.logserver.su/img/index.php?url='+src, false);
        xhr.send(null);
        if(xhr.status == 200 && xhr.responseText != 0) {
            playerUserPic.src = xhr.responseText;
            setItem(src, xhr.responseText);
        }
    }

    if (document.location.href.indexOf ("/profile/player/") > 1) {
        if(document.getElementById("playerUserPic")) {
            getAvatar(document.location.href);
            clearInterval(interval);
        }
    }
    if (document.location.href.indexOf ("/city/shop/2") > 1) {
        var css = document.createElement('style');
        css.type = 'text/css';

        var styles = 'td {max-width: 150px;}';

        if (css.styleSheet) css.styleSheet.cssText = styles;
        else css.appendChild(document.createTextNode(styles));

        document.getElementsByTagName("head")[0].appendChild(css);
    }
}), 500);