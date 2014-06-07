// ==UserScript==
// @name           Digg Junk Remover
// @namespace      http://userscripts.org/scripts/show/45950
// @description    Removes stories that contain user-defined keywords.
// @include        http://digg.com/*
// ==/UserScript==
if(GM_getValue("Keywords") == undefined)
{
	GM_setValue("Keywords", "sexy,boobs,porn,nsfw,nws");
}	
var words = GM_getValue("Keywords").split(",");
GM_registerMenuCommand("Digg Keyword Remover - Keywords", disp_prompt);
function disp_prompt()
{
	var name=prompt("Please enter your keywords in the stories you wish to remove. (Separate with comas)",GM_getValue("Keywords"));
	if (name!=null && name!="")
	{
		GM_setValue("Keywords", name);
		words = GM_getValue("Keywords").split(",");
		alert("Keywords set.\n" + words);
		window.location.reload(true);
	}
}

var i;
if(document.getElementsByTagName('ul').length > 0)
{
	//alert(document.getElementsByTagName('ul').child.length);
	for(i=0;i<document.getElementsByTagName('ul').length;i++)
	{
		if(document.getElementsByTagName('ul')[i].getAttribute("class") == "news-digg")
		{
			var contents = document.getElementsByTagName('ul')[i].innerHTML;
			var j;
			for(j=0;j<words.length;j++)
			{
				//alert(words[j]);
				if(contents.toLowerCase().indexOf(words[j]) > -1)
				{
					document.getElementsByTagName('ul')[i].innerHTML = "";
					document.getElementsByTagName("ul")[i].setAttribute("class", "none");
				}
			}
		}
	}
}

if(document.getElementsByTagName('div').length > 0)
{
	//alert(document.getElementsByTagName('ul').child.length);
	for(i=0;i<document.getElementsByTagName('div').length;i++)
	{
		if(document.getElementsByTagName('div')[i].getAttribute("class") == "news-summary" || document.getElementsByTagName('div')[i].getAttribute("class") == "news-summary v" || document.getElementsByTagName('div')[i].getAttribute("class") == "news-summary v img-summary")
		{
			var contents = document.getElementsByTagName('div')[i].innerHTML;
			var j;
			for(j=0;j<words.length;j++)
			{
				//alert(words[j]);
				if(contents.toLowerCase().indexOf(words[j]) > -1)
				{
					document.getElementsByTagName('div')[i].innerHTML = "";
					document.getElementsByTagName("div")[i].setAttribute("class", "none");
				}
			}
		}
	}
}