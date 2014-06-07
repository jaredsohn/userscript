// ==UserScript==
// @name	   prohardver.hu : index : alter layout
// @namespace	   http://www.prohardver.hu/
// @include	   http://www.prohardver.hu/
// @include	   http://www.prohardver.hu/index.html
// @include	   http://prohardver.hu/
// @include	   http://prohardver.hu/index.html
// @include	   http://www.mobilarena.hu/
// @include	   http://www.mobilarena.hu/index.html
// @include	   http://mobilarena.hu/
// @include	   http://mobilarena.hu/index.html
// ==/UserScript==
function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head)
		return;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

window.addEventListener(
	"load", 
	function() 
	{
		var parent = document.evaluate("//div[@class = 'tab tfriss flc']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		if (parent == null)
			return;
//		document.evaluate("//div[@class = 'cimrovat']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.style.display = "none";
		var news1 = parent.childNodes.item(1);
		var news2 = parent.childNodes.item(7);
		var news3 = parent.childNodes.item(9);
		var sites1 = parent.childNodes.item(3);
		var sites2 = parent.childNodes.item(5);
		var sites3 = parent.childNodes.item(11);
		var news = document.createElement("div");
		news.className = "anyagok floatl";
		news.style.width = "292px";
		news.innerHTML = news1.innerHTML + news2.innerHTML + news3.innerHTML;
		parent.appendChild(news);
		parent.removeChild(news1);
		parent.removeChild(news2);
		parent.removeChild(news3);
		var sites = document.createElement("div");
		sites.style.display = "block";
		var logout = "<h4><span></span>Logout</h4><ul>";
		var links = document.evaluate("//div[@class = 'box border list logout']/ul/li/p", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var n = 0; n < links.snapshotLength - 1; n++)
		{
			var link = links.snapshotItem(n);
			logout += "<li>" + link.innerHTML + "</li>";
		}
		logout += "</ul><h6><a href=\"http://logout.hu\">Még t&#xf6;bb Logout</a></h6>";
		sites.innerHTML = 
			"<div class=\"ajanlo ajanlo_it floatr\">" + sites1.innerHTML + "</div>" +
			"<div class=\"ajanlo ajanlo_ma floatr\">" + sites3.innerHTML  + "</div>" +
			"<div class=\"ajanlo ajanlo_lo floatr\">" + logout + "</div>" +
			"<div class=\"ajanlo ajanlo_gp floatr\">" + sites2.innerHTML + "</div>";
		parent.appendChild(sites);
		parent.removeChild(sites1);
		parent.removeChild(sites2);
		parent.removeChild(sites3);
	},
	false);

addGlobalStyle(
	".ajanlo_lo, .ajanlo_lo h4 { border-color: #9B2223; } " +
	".ajanlo_lo h4 { color: #9B2223; background-image: url(/design/common-bul4-lo.gif); } " +
	".ajanlo_lo li { background-image: url(/design/common-bul4-lo.gif); }");

/*
1.4 | 2010-04-02 módosítva a Mobilarena új designjához is
1.3 | 2010-03-31 változott kicsit az oldal, script javítva
1.2 | 2010-03-07 védettebbé tettem a kódot, most már a felső reklámcsík megjelenése/eltűnése esetén is működik
1.1 | 2010-03-01 változott kicsit az oldal felépítése, hozzáigazítva
1.0 | 2010-02-23 eredeti változat
*/