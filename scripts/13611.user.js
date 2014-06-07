// ==UserScript==
// @name           jbidwatchAdder
// @namespace      none
// @include        http://cgi*.ebay.tld/*
// ==/UserScript==

var username, password;

// you may uncomment the following and enter your credentials there
//var username = "myUserId";
//var password = "mySecret";


var item = document.querySelector("td#vi-tTblC2>div.vi-pla>a:last-of-type");
if (item == null) return;
item = item.href.match(/&itemId=(\d+)/)[1];

var addlink = document.getElementById("WatchYourItemLinkTop");
if (addlink != null){
	addlink.href = "http://localhost:9099/addAuction?id="+item;
	addlink.target = "_self";
	addlink.addEventListener("click", function (event) {
		var span = document.getElementById("linkTopAct");
		while (span.firstChild){
			span.removeChild(span.firstChild);
		}
		span.textContent = "adding ...";
		GM_xmlhttpRequest({method: "GET",
			url: "http://" +
			(username === undefined || password === undefined ? "" : username+":"+password+"@") +
			"localhost:9099/addAuction?id="+item,
			onload: function(responseDetails){
				var span = document.getElementById("linkTopAct");
				var i;
				if ((i = responseDetails.responseText.indexOf("href=\"\/"+item+"\"")) != -1 ||
				    (i = responseDetails.responseText.indexOf("HREF=\"\/"+item+"\"")) != -1) {
					span.textContent = "added!";
					var localstr = responseDetails.responseText.substr(i-120, i);
					var mres = /class="row\d ([^"]+)"/.exec(localstr);
					if (mres.length > 1) span.textContent += " to tab: " + mres[1];
				} else {
					span.textContent = "not added?";
				}
			}
		});
		event.stopPropagation();
		event.preventDefault();
	}, true);

	var node = document.evaluate(".//text()", addlink, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	node.nodeValue += " in jbidwatcher";
}
