// ==UserScript==
// @name           Youtube Copy Time Index
// @namespace      http://www.mango12.com/
// @description    The Game
// @include        http://www.youtube.com/watch?v=*
// @include        http://youtube.com/watch?v=*
// ==/UserScript==

var player = unsafeWindow.document.getElementById("movie_player");
if (player)
{
	var flag = unsafeWindow.document.getElementById("watch-tab-flag");
	if (flag)
	{
		var div = unsafeWindow.document.createElement("div");
		div.setAttribute("class", "watch-tab");
		div.innerHTML = "<a class=\"watch-action-link\" href=\"javascript:getTimeIndex();\">Time Index</a>";
		flag.parentNode.insertBefore(div, flag.nextSibling);
		
		unsafeWindow.getTimeIndex = function()
		{
			var time = player.getCurrentTime();
			var seconds = parseInt(time);
			var minutes = Math.floor(seconds / 60);
			var seconds = seconds % 60;
			alert(document.location.href + "#t=" + minutes + "m" + seconds + "s");
		}
	}
}