// ==UserScript==
// @name           YouTube Popup Button
// @namespace      https://gist.github.com/4692809
// @description    Shows a "Play in popup"-button on YouTube video pages.
// @version        1.2
// @include        http://www.youtube.com/watch?*
// @include        http://youtube.com/watch?*
// @include        https://www.youtube.com/watch?*
// @include        https://youtube.com/watch?*
// ==/UserScript==

writeBtn();

function writeBtn() {
  var vidid = getParameter(document.location.href, "v");
	var jscall = "javascript:" + 
		      "var player = document.getElementById(\"movie_player\");" + 
		      "player.stopVideo();" + 
		      "window.open('http://youtube.com/watch_popup?v=" + vidid + "#t=' + player.getCurrentTime()," +
		      "'popup','height=450,width=450,scrollbars=no');";
	
	
	var btnElement = document.createElement('button');
	btnElement.setAttribute("class", "end yt-uix-button yt-uix-button-default yt-uix-button-empty");
	btnElement.setAttribute("onClick", jscall);
	btnElement.setAttribute("type", "button");
	btnElement.setAttribute("role", "button");
	btnElement.setAttribute("style", "margin-left: 5px;");
	btnElement.innerHTML = "<span class=\"yt-uix-button-content\">Play in popup</span>";
	
	document.getElementById('masthead-upload-button-group').appendChild(btnElement);
}


function getParameter(url, name) {
	var urlparts = url.split('?');
	if (urlparts.length > 1) {
		var parameters = urlparts[1].split('&');
		for (var i = 0; i < parameters.length; i++) {
			var paramparts = parameters[i].split('=');
			if (paramparts.length > 1 && unescape(paramparts[0]) == name) {
				return unescape(paramparts[1]);
			}
		}
	}
	return null;
}