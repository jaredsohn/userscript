// ==UserScript==
// @name           fb-whois-op
// @namespace      fb-whois-op
// @include        *flashback.org*
// ==/UserScript==

function SetOP(OP)
{
	for(var i in document.getElementsByTagName("div"))
	{
		var elem = document.getElementsByTagName("div")[i];
		if(elem.innerHTML.search("postmenu_") > -1)
		{
			if(elem.firstElementChild.innerHTML == OP)
				elem.innerHTML = "(TS) " + elem.innerHTML;
		}
	}
}

if(document.URL.search("flashback.org/t") > -1)
{
	var p = document.URL.replace(/^(http(s|):\/\/|)(www.|)flashback.org\/t[0-9]+(p|)/, "");
	var t = document.URL.replace(/^(http(s|):\/\/|)(www.|)flashback.org\/t/, "");
	t = t.replace(/p[0-9]+$/, "");
	
	if(p == "")
		SetOP(document.getElementsByClassName("bigusername")[0].innerHTML);
	else
	{
		var x = new XMLHttpRequest();
		x.open("GET","https://www.flashback.org/t" + t,false);
		x.onreadystatechange=function() 
		{
			if(x.readyState == 4) 
			{
				var d=x.responseText;
				d = d.match(/<a class="bigusername" href="[^"]+">([^"]+)<\/a>/gi)[0];
				d = d.replace(/<a class="bigusername" href="[^"]+">/, "").replace(/<\/a>/, "");
				SetOP(d);
			}
		}
		x.send(null);
	}
}
