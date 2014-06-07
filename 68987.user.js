// ==UserScript==
// @name           free torrent bH-n
// @namespace      freebh
// @description    nCore-os free torrentek bH-s torrent adatlapokon
// @include        http://bithumen.be/details.php?*
// @include        http://bithumen.ru/details.php?*
// ==/UserScript==

if (document.location.hash!="#startcomments") {
torrent=document.title.substring(12).replace(/\[(REQ|NUKED)\]\s/,"");
GM_xmlhttpRequest({
  method: "POST",
  url: "http://ncore.cc/letoltes.php",
  data: "mire=" + torrent + "&miben=name&tipus=all&aktiv_inaktiv_ingyenes=mindehol&submit=Ok&tags=",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  onload: function(responseDetails)
    {      
		if(responseDetails.responseText.match("gold.gif")) 
			document.getElementsByTagName("nobr")[2].innerHTML+= 
				"<a href=\"http://ncore.cc/torrent_letoltese.php?torrent_id=" 
				+ responseDetails.responseText.match(new RegExp("\\((\\d*)\\)\" title=\"(\\[(REQ|NUKED)\\]\\s|)"+torrent.replace(/\s/g,"\.")+"\""))[1] 
				+ "\"><img src=\"data:image/gif;base64,R0lGODlhDwAPAOYAAGRcI1xVIK6gPGNbI4V7LlpTH6KVOJqONqCTN5OIM6WYOb6yVlNMHWhhK+nluX1zLKuiZG9mJ7itXe7qw8O4aVxWJ9jTqIuAMUVAHldRJcK3YZ6SQU1HIa2fPLGjP6mcOt7Yon51LKykaoR6Nefjul9ZKJ6XZUVAGFRNHeHbq6udO2BYIXduMJeRYo2DNdTOoGpiKLapSKyePJqON7KkPoyBMZuPNrGjPbCiPX50LHBnJ7aoP6eaOrOlPrSmPvDsxtjPjgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAPAA8AAAeWgECCg4SFQDuIPomIOz6Ogo6RPgs9PZKClZkaExIqNJmCN6I3MQ4/JBsfOKKCOK4eID+yLzMyroICuRQpsj8WEAgdAoIBxQUVvRgnDAUBggDQAw29HCgrAwCCOts6LL0ZAxHbgjnlOSO9JToP5YI17zUuIiYtMDkX74I2+zYHCQQhCCQ4sE8Qj4MHFRhAYEABQkMQBwUCADs%3D\" width=\"13\" height=\"13\" title=\"free az NCore-n\"/></a>";
		else if(responseDetails.responseText.match("belepes.php")) document.getElementsByTagName("nobr")[2].innerHTML+='<br/><font color=\"red\">jelentkezz be az <a href=\"http://anonym.to/?http://ncore.cc\">ncore.cc</a>-n</font>';
	}
  });
}
