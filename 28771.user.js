// ==UserScript==
// @name          YouTube Anywhere
// @namespace     http://www.userscripts.org
// @description   A popup YouTube player appears when you click a YouTube video link
// @include       *
// @exclude      http://*youtube.com/watch?v=*
// ==/UserScript==

(function() {
	function create_video(link, id, vidurl)
	{
		link.addEventListener("click", function()
		{
			//scroll(0,0);
			var offset = window.pageYOffset;
			var br = document.createElement("br");
			var shade = document.createElement("div");
			shade.setAttribute("style", "text-align:center;position:absolute;top:" + offset + ";left:0;opacity:0.9;background:#000;width:100%;height:100%;");
			shade.setAttribute("id", "shade_div");
			
			var open = document.createElement("a");
			open.setAttribute("style", "text-decoration:none;color:#FFF;font-family:tahoma;font-size:16px;");
			open.setAttribute("href", vidurl);
			open.setAttribute("target", "_blank");
			open.addEventListener("click", function() { document.getElementById("shade_div").parentNode.removeChild(document.getElementById("shade_div")); }, false);
			var open_text = document.createTextNode("Open in New Window -");
			
			var close = document.createElement("span");
			close.setAttribute("style", "text-decoration:none;color:#FFF;font-family:tahoma;font-size:16px;cursor:pointer;");
			close.addEventListener("click", function() { document.getElementById("shade_div").parentNode.removeChild(document.getElementById("shade_div")); }, false);
			var close_text = document.createTextNode("- Close Window");
			
			var mid_text = document.createTextNode(" - ");
			var embed = document.createElement("embed");
			embed.setAttribute("src", "http://www.youtube.com/v/" + id + "&hl=en&rel=0");
			embed.setAttribute("type", "application/x-shockwave-flash");
			embed.setAttribute("width", "425");
			embed.setAttribute("height", "344");
			embed.setAttribute("style", "margin-top:200px;");
			
			open.appendChild(open_text);
			close.appendChild(close_text);
			shade.appendChild(embed);
			shade.appendChild(br);
			shade.appendChild(open);
			shade.appendChild(close);
			document.body.appendChild(shade);
		}
		, false);
	}

	var anchors = document.getElementsByTagName("a");
	var url = /youtube\.com\/watch\?v=(.+)$/
	for (i = 0; i < anchors.length; i++)
	{
		if (anchors[i].href.match(url))
		{
			var vid = anchors[i].href.match(url)[1]
			var vidurl = anchors[i].href
			create_video(anchors[i], vid, vidurl);
			anchors[i].removeAttribute("href");
			anchors[i].innerHTML = "<span style='cursor:pointer;'>" + anchors[i].innerHTML + "</span>";
		}
	}
})()