// ==UserScript==
// @name       Florian sux lol
// @namespace  http://krokerik.com/
// @version    0.1
// @description  Turn youtube links into embedded videos on the Tomatoforum
// @match      http://fenomas.com/tomatobb*
// @copyright  2012+, You
// ==/UserScript==

var videoEmbed, i, p;
function createVideo(videoID) {

	videoEmbed = document.createElement("iframe");
	videoEmbed.src = "//www.youtube.com/embed/"+videoID;
    videoEmbed.width = "560";
    videoEmbed.height = "315";
    videoEmbed.frameborder = "0";
}

var links = document.getElementsByTagName("a");
var bad_id;
for (i = 0; i < links.length; i++)
{
		if (links[i].href.substring(0,31) =="http://www.youtube.com/watch?v=" && links[i].parentNode.className == "postbody")
        {
			createVideo(links[i].href.substring(31,links[i].href.length));
            p = document.createElement("p");
            p.appendChild(videoEmbed);
            p.appendChild(document.createElement("br"));
            p.appendChild(document.createTextNode(links[i].innerHTML));
            links[i].parentNode.appendChild(p);
            links[i].parentNode.removeChild(links[i]);
        }
}