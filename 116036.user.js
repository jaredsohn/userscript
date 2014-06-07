// ==UserScript==
// @id             test2
// @name           test2
// @version        1.0
// @namespace      
// @author         
// @description    Youku Ad
// @include        http://v.youku.com/*
// @run-at         document-end
// ==/UserScript==

var vid = unsafeWindow.videoId2;
//var div = document.createElement("div");
//div.innerHTML = '<embed type="application/x-shockwave-flash" width="100%" height="100%" id="movie_player" wmode="transparent" allowfullscreen="true" allowscriptaccess="always" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" tabindex="0" class="video" name="youku" src="http://static.youku.com/v1.0.0149/v/swf/qplayer.swf" flashvars="isShowRelatedVideo=false&showAd=0&isAutoPlay=true&winType=interior&VideoIDS='+vid+'">'
var div = document.createElement("embed");
div.type = "application/x-shockwave-flash"
div.width="100%";
div.height="100%";
div.id="movie_player";
div.name="youku";
div.src="http://static.youku.com/v1.0.0190/v/swf/qplayer.swf";
div.setAttribute("allowfullscreen","true");
div.setAttribute("allowscriptaccess","always");
div.setAttribute("quality","high");
div.setAttribute("flashvars","isShowRelatedVideo=false&showAd=0&isAutoPlay=true&winType=interior&VideoIDS="+vid);

var playerdiv = document.getElementById("player");
playerdiv.removeChild(playerdiv.childNodes[0]);
playerdiv.appendChild(div);