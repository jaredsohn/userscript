// ==UserScript==
// @name           One Manga Downloader
// @namespace      System
// @description    Download manga chapters from OneManga
// @include        http://www.onemanga.com/*/*/
// ==/UserScript==

function $(e){return document.getElementById(e);}
var Ajax =
{
	Get :
		function () { return new window.XMLHttpRequest(); },

	Request :
		function (url, xmlHttp, handler)
		{
			if (xmlHttp == null) return;
			if (url.indexOf("?") == -1) url += "?";
			else url += "&";
			url += "cache=" + Math.random();
			xmlHttp.onreadystatechange = handler;
			xmlHttp.open("GET", url, true);
			xmlHttp.send(null);
		}
};

var c = $("chapter-cover");
c = c.getElementsByTagName("ul")[0];

var li = document.createElement("li");
var a  = document.createElement("a");
a.href = "javascript:;";
a.addEventListener("click",
	function ()
	{
		Download();
	}, false);
a.innerHTML = "Download / Load All";
li.appendChild(a);

c.appendChild(li);

var f = c.getElementsByTagName("a")[0].href;

function Download()
{
	var o = Ajax.Get();
	Ajax.Request(f, o,
		function ()
		{
			if (o.readyState == 4)
			{
				var h = o.responseText;
				h = h.replace(/[^$]+(<body.*?>[^$]+)/im, "$1").replace(/<\/?body.*?>/i, "").replace(/<script.*?>/gi, "<!--").replace(/<\/script>/gi, "-->");
				var n = document.createElement("div");
				n.style.display = "none";
				n.innerHTML = h;
				document.body.appendChild(n);
				
				var imgraw = document.getElementsByClassName("manga-page")[0].src;
				imgraw = imgraw.replace(/\/\w+.jpg$/i, "/");
				
				var title = $("chapter-cover").getElementsByTagName("h1")[0].innerHTML;
				title = title.replace(/<.*?>/g, "");
				title = title.split("/");
				title = title[1] + " - " + title[2];
				title = title.replace(/  /g, " ");
				
				var newPage = "<html><head><title>"+title+"</title><body style='background:#1A1715; color:white; text-align:center'>Ctrl + S<br/>";
				
				var list = $("id_page_select");
				list = list.getElementsByTagName("option");
				for each(var i in list)
				{
					newPage += "<img src='" + imgraw + i.value + ".jpg' style='padding: 15px' /><br />";
				}
				
				newPage += "</body></html>";
				
				var p = window.open("about:blank");
				p.document.write(newPage);
			}
		});
}