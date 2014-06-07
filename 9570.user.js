// ==/UserScript==
// @name           Brower webpage by 4500 WEBPROXY
// @namespace      http://userscripts.org/scripts/show/9570
// @description    Brower webpage by 4500 WEBPROXY
// @include		     *
// @LAST UPDATE	  	31/05/2007
// ==/UserScript==

var url = window.location.href;
var div = document.createElement("DIV");
 div.style.position = "absolute";
 div.style.right = "0px";
 div.style.bottom = "0px";
 div.style.visibility = "visible";
 div.style.width = "20px";
 div.style.height = "20px";
 div.style.cursor = "pointer";
 div.style.zIndex = 1000;
 div.innerHTML = "<a href=http://www.156.net.ru/do.php?js=js&url="+url+"><img src='http://cang.baidu.com/-/remote/fav3.jpg' alt='Brower Current Page By web Proxys!' style='padding: 0pt; vertical-align: middle ! important; margin-bottom: 2px ! important;' border='0' /></a>";


 document.getElementsByTagName('body')[0].appendChild(div);

