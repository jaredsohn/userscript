// ==UserScript==
// @name           Boards.ie - Total Ignore
// @namespace      http://userscripts.org/users/436255
// @description    Hides ignored users' posts totally, as well as text from posts that quote them (leaves option to display those posts)
// @version        1.1
// @icon           http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include        http://www.boards.ie/vbulletin/showthread.php*
// @include        https://www.boards.ie/vbulletin/showthread.php*
// ==/UserScript==

// v1.1 - new HTML Parser due to problems with dark skin

var SCORCHED_EARTH = false; // if true, totally remove posts that quote someone on ignore. Otherwise, they're just hidden, with an option to "show post"

var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++)
{
	if(links[i].innerHTML == "Remove user from ignore list")
		links[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
}

GM_xmlhttpRequest({
	method: "GET",
	url: "http://www.boards.ie/vbulletin/profile.php?do=ignorelist",
	onload: function(response){
		//from https://developer.mozilla.org/en-US/docs/Code_snippets/HTML_to_DOM
		var parsedhtml = document.implementation.createHTMLDocument("example");
		parsedhtml.documentElement.innerHTML = response.responseText;
		if(parsedhtml.getElementById("ignorelist") != null)
		{
			var ignoreduserslinks = parsedhtml.getElementById("ignorelist").getElementsByTagName("a");
			var ignoredusers = new Array();
			for(var i = 0; i < ignoreduserslinks.length; i++)
				ignoredusers.push(ignoreduserslinks[i].innerHTML);
			var quotes = document.getElementsByClassName("alt2");
			for(var i = 0; i < quotes.length; i++)
			{
				if(quotes[i].style.borderStyle == "inset" && quotes[i].getElementsByTagName("strong")[0] != null 
						&& ignoredusers.indexOf(quotes[i].getElementsByTagName("strong")[0].innerHTML) != -1)
				{
					if(SCORCHED_EARTH)
					{
						quotes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
					}
					else
					{
						var post = quotes[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
						var extradiv = document.createElement("div");
						extradiv.innerHTML = post.innerHTML;
						extradiv.style.visibility = "hidden";
						post.innerHTML = "";
						var show = document.createElement("div");
						show.innerHTML = "---This post quotes ignored user, click to show---";
						show.style.textDecoration = "underline";
						show.style.cursor = "pointer";
						show.onclick = function(){
							this.nextSibling.style.visibility = "visible";
							this.style.display = "none";
						};
						post.appendChild(show);
						post.appendChild(extradiv);
					}
				}
			}
		}
	}
});