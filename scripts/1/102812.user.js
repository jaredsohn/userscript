// ==UserScript==
// @name           Citylevel0
// @namespace      Citylevel0
// @description    No description.
// @include        http://s*.*.ikariam.com/index.php?view=island&id=*
// @include        http://s*.*.ikariam.com/index.php?view=island&cityId=*
// ==/UserScript==

var x = 0;
for (i=0;i<=16;i++)
	{
	var city = document.getElementById("cityLocation"+i);
	if (city.className.match("cityLocation city level") != null) { var x = x+1; }
	if (city.className == "cityLocation city level0")
		{
		var cityinfo = document.getElementsByTagName("table")[x];
		var owner = cityinfo.rows[1].cells[1].innerHTML.split("	")[1].split(" ")[0];
		city.title="Pelaaja: "+owner;
		}
	}