// ==UserScript==
// @name           Anti Ikariam Reklam
// @namespace      http://www.teknokoliktasarim.com/script/
// @description    İkariam Reklam Engelleyecisi. TeknoKolik
// @autor          $hikamaru
// @version        1.1
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==


// Boxes in Overviews and Trading post + Mercenary transporter + Ads (Boxy v Přehledech a na Tržišti + Námezdní transport + Reklamy)
var values = new Array("trader", "viewCityImperium", "viewMilitaryImperium", "viewResearchImperium", "viewDiplomacyImperium", "setPremiumTransports", "banner_container");
for(var i = 0; i < values.length; i++)
{
	var del = document.getElementById(values[i]);
	if(del != null)
	{
		del.parentNode.removeChild(del);
	}
}


// Banner Ad (Banerová reklama)
var value = document.getElementsByTagName("iframe");
for(var i = 0; i < value.length; i++)
{
	var del = value[i].parentNode;
	del.parentNode.removeChild(del);
}
