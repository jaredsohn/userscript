// ==UserScript==
// @name           Google Images
// @namespace      shervey.userscripts.org
// @include        http://images.google.com/*
// ==/UserScript==

var tds = document.getElementsByTagName("td");
var tdCount = 0;

for(var i = 0; i < tds.length; i++) {
	if(tds[i].id.indexOf("tDataImage") > -1) {
		var as = tds[i].getElementsByTagName("a");
	 	if(as.length > 0) {
	 		var a = as[0];
			var url = a.href.match(/imgurl\=.+\&imgrefurl/);
			if(url) {
				url = url[0].replace("imgurl=","").replace("&imgrefurl","");
				
				var link = document.createElement("a");
				link.href = url;
				link.target = "_blank";
				link.style.fontWeight = "bold";
				link.style.fontSize = "10pt";
				link.innerHTML = "View Image";
				
				tds[i].appendChild(document.createElement("br"));
				tds[i].appendChild(link);
			}
		}
	}
}