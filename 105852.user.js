// ==UserScript==
// @id             N-Roms Anti-Javascript
// @name           N-Roms Anti-Javascript
// @namespace      Allows navigation on n-roms.de without enabling javascript
// @include        http://www.n-roms.de/*
// ==/UserScript==

var vv = document.getElementsByTagName("tr");
if (vv != null) {
	for (var i = 0; i < vv.length; i++)
	{
		var vvv = vv[i];
		if (vvv.hasAttribute("onclick"))
		{
			var attrib = vvv.getAttribute("onclick").split("'");
			var attrib2 = attrib[1];
			var vvvv = vvv.getElementsByTagName("td");
			if (vvvv[0] != null)
			{
				vvvv[0].innerHTML = "<a href='" + attrib2 + "'>" + vvvv[0].innerHTML + "</a>"; 
			}
		}
	}
}

vv = document.getElementsByTagName("td");
if (vv != null)
{
	for (var i = 0; i < vv.length; i++)
	{
		var vvv = vv[i];
		if (vvv.hasAttribute("bgcolor"))
		{
			var attrib = vvv.getAttribute("bgcolor");
			if (attrib == "RED")
			{
				vvv.innerHTML = "<b>F&uuml;r diese Seite muss kein Javascript heruntergeladen werden</b>";
				continue;
			}	
		}

		if (vvv.hasAttribute("onclick"))
		{
			var attrib = vvv.getAttribute("onclick").split("'");
			var attrib2 = attrib[1];
			vvv.innerHTML = "<a href='" + attrib2 + "'>" + vvv.innerHTML + "</a>"; 
		}
		
		var javashit = vvv.getElementsByTagName("a");
		for (var j = 0; j < javashit.length; j++)
		{
			if (javashit[j].hasAttribute("href"))
			{
				var ahref = javashit[j].getAttribute("href");
				if (ahref.indexOf("Bildbetrachter") != -1)
				{
					var image = ahref.split("'");
					javashit[j].setAttribute("href", "image.php?img=" + image[1]);
				}
			}
		}
	}
}
