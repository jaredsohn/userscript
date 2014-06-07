// ==UserScript==
// @name           taker
// @author         NoTriX
// @namespace      http://www.one.lt
// @description    Free your one.lt from adds
// @include        http://w*.one.lt/*
// @exclude        http://*.one.lt/checkThemeAvailability.do*
// @email          notrix@gmail.com
// @version        1.2 BETA
// ==/UserScript==


function skinHack()
{
	var urlas = document.location + ' ';
	if (urlas.indexOf('ownmycustomthemecreate') > 0)
	{
		for( var i = 0; i < document.getElementsByTagName('href="http://t12.one.lt/getTheme?id=55804025651200&v=22&key=CSS').length; i++ )
		{
			if (document.getElementsByTagName('link')[i].rel == "stylesheet")
			{
				if (confirm("Ar nustatyti si skina kaip numatytaji?"))
				{
					document.cookie = "onefreeskin="+document.getElementsByTagName('link')[i].href+"; path=/";
				}
			}
		}
	}
	var ptag, atag, parent, tkn, themeid, res;
	var xhttp = new XMLHttpRequest();
	var temos = Utilss.getElementsByXPath('//a[contains(@onclick, "checkThemeAvailability.do")]');
	if (temos.length > 0)
	{
		for (var i = 0; i < temos.length; i++)
		{
			parent = temos[i].parentNode;
			tkn = Math.floor((9999-1110)*Math.random()) + 1111;
			themeid = temos[i].childNodes[0].id.replace(/labelTheme-/, "");
			urlas = "/checkThemeAvailability.do?tkn=" + tkn + "&st.id=community.ownbriefthemes.page&themeId=" + themeid;
			atag = document.createElement("A");
			atag.href = "javascript:void(0);";
			atag.rel = urlas;
			EventManager.Add(atag,'click',function(e) {
				xhttp.open("GET", this.rel, false);
				xhttp.send(null);
				if (xhttp.readyState == 4) { 
					res = xhttp.responseText;
					tkn = res.indexOf("text/css") + 16;
					urlas = res.indexOf("CSS");
					urlas = res.substr(tkn,urlas-tkn+3);
					document.cookie = "onefreeskin="+urlas+"; path=/";
					setSkin();
				}
			});
			ptag = document.createElement("P");
			ptag.style.cssText = "margin: 0px; padding-top: 5px;";
			ptag.appendChild(document.createTextNode("Ijungti skina!"));
			atag.appendChild(ptag);
			parent.appendChild(atag);
		}
	}
}
