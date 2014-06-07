// ==UserScript==
// @name            userscripts.org - View Source Code
// @namespace       http://userscripts.org/scripts/source/171167.user.js
// @description     http://userscripts.org/users/33073源脚本这里的转向是失效的，毕竟有几年了。所以，我改了一下连接就正确了This script adds an icon to every script giving you the possibility to see a the source code highlighted. Also, there are more options on the highlighted page, like copying the code.
// @include         http://userscripts.org/*
// ==/UserScript== 


var links=document.getElementsByTagName("a");
for (var i=0; i<links.length; i++) {
	if (links[i].href.match(/\/scripts\/show\/([0-9]{1,6})$/gi) && links[i].className == "title") {
		var source = "http://userscripts.org/scripts/review/"+RegExp.$1;
		var link = document.createElement("a");
			link.href = source;
			link.setAttribute("style", "margin-left:5px; cursor:pointer;");
		links[i].parentNode.insertBefore(link, links[i].nextSibling);
		var img = document.createElement("img");
			img.src = "data:image/gif,GIF89a%10%00%10%00%D5%3F%00%C2%CD%CC%94%A7%CB%FF%F8%18%ED%ED%97%A6%9D%8B%CA%E6%FF%D6%ED%FF%FC%CEL%BB%DC%FF%90%9D%AC%92%A1%B1%DD%EC%FF%B7%CC%E4%F9%FC%FF%B8%C2%C2%FF%C5%02%FD%B7%02%D2%E7%FF%DE%E9%FE%FC%FE%FF%ABp5%C6%D2%D1%DA%EA%FF%C6%DF%FF%8F%9F%C9%FF%95*%E0%ED%FF%C1%DC%FF%AF%D3%FF%97%A5%B1%B4%BE%C0%AC%C1%DC%F0%F7%FF%D3%C0%9B%DF%F4%FF%F8%FA%FF%B8%CA%DD%B6%C0%BF%9E%B8%E3%BF%BEl%EB%E6%AB%B3%8E8%B4%D5%FF%7C%7Cy%F9%F1%E7%D4%E0%DF%89vQ%F4%FB%FF%FF%EE%10%7D%8A%AB%FF%8F%1B%DA%ED%FF%FF%C9p%DF%AFY%C9%A6m%B6%C0%C1%BE%C5%C9%C5%C4s%9B%A9%B1%FF%F3%0C%A6i-%E8%F4%FF%FF%FF%FF%FF%FF%FF!%F9%04%01%00%00%3F%00%2C%00%00%00%00%10%00%10%00%00%06%8B%C0%9FpH%14%A2B%C5%A4p%B0K%B9%92-%E2%00%F6%80%D0%08%C4%8F%E4%26%3C%09%AA%19%5Ee%C8%F0%F9%2C%B8%DC%17%12%1E%0B%CB%3E%CDk%B0%CEP%DC%3F%B8fd8%80)%00C%24f%1A%0D%0B%2C4%072%80D%3Aq%86%3E%2B56%04%26%0EE%1D%3E%0B%1338%01%11%08%17%1B%1E%98g%0D%11%3D%1B%17%1C%051I%0A%3E%11%20%17%11*%05%18%25J%B0%05%0B%08%06%18%97J%3F%0A%13%1B%22%C0%C2C%C4%01%C1%C9B%09%CDDA%00%3B";
			//img.setAttribute("onclick", "window.location.href='"+source+"';");
			img.setAttribute("title", "View Source");
		link.appendChild(img);
	}
}