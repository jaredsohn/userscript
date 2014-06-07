// ==UserScript==
// @name           TravianRankDisplay
// @namespace      zsom
// @include        http://*.travian.*/spieler.php?uid=*
// ==/UserScript==

var profileTable = document.getElementById("profile");
var ths = profileTable.getElementsByTagName("th");
var profileText = ths[0].childNodes[0].nodeValue;
var name = profileText.substring(profileText.indexOf(" ") + 1);

getRank(name,'31','off');

var randInterval = Math.round(Math.random() * 2000 + 1000);
setTimeout(function(){getRank(name,'32','def');}, randInterval);

var hostParts = document.location.hostname.split(".");

var wsParam;
if(hostParts.length == 3){
	wsParam = hostParts[2];
	if(hostParts[0].substring(0,1) == 's'){
		wsParam += hostParts[0].substring(1);
	}

} else {
	wsParam = hostParts[1];
}

//alert(wsParam);

var uidStart = document.location.href.indexOf("uid=");
var uid = document.location.href.substring(uidStart + 4);


var wsLink = document.createElement("a");
var linkText =  document.createTextNode("analyzer");
wsLink.setAttribute("href","http://travian.ws/analyser.pl?s=" + wsParam + "&uid=" + uid);
wsLink.setAttribute("target","_blank");
wsLink.appendChild(linkText);
var nlNode = document.createElement("br");
var plRankNode = profileTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].childNodes[3];
plRankNode.appendChild(nlNode);
plRankNode.appendChild(wsLink);

function getRank(player, urlId, type){
	var randX = Math.round(Math.random() * 40 + 5);
	var randY = Math.round(Math.random() * 10 + 7);
	var postData = "name=" + player + "&rank=1&submit=submit&submit.x=" + randX + "&submit.y=" + randY;
	var url = "http://" + document.location.hostname + "/statistiken.php?id=" + urlId;
	post(url, postData, type);
}

function post(url, data, type) {
	GM_xmlhttpRequest({
		method: "POST",
		url: url,
		headers:{'Content-type':'application/x-www-form-urlencoded'},
		data:encodeURI(data),
		onload: function(responseDetails) {       
					var text = responseDetails.responseText;     
					var start = text.indexOf('<td class="ra  fc" >') + 20;
					var end = text.indexOf("</td>",start);

					var cur_rank = text.substring(start, end -1);     
					addRankToPage(type,cur_rank);
				}
	});
}

function addRankToPage(type,rank){       
	var styleText = "background-position: 0 top; height: 30px; width: 30px; background-image: url(gpack/travian_default/img/s/" + type + ".gif); ";
	var imgNode = document.createElement("img");
	imgNode.setAttribute("src","img/x.gif");
	imgNode.setAttribute("style",styleText);

	var nlNode = document.createElement("br");
	var textNode = document.createTextNode(": " + rank + ". ");

	var plRankNode = profileTable.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[2].childNodes[3];

	plRankNode.appendChild(nlNode);
	plRankNode.appendChild(imgNode);
	plRankNode.appendChild(textNode);
}

