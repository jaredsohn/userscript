// ==UserScript==
// @name          Internet Percentage Use dd-wrt
// @namespace     AfzalivE
// @description	  Shows percentage use
// @include       http://192.168.0.1/ttgraph.cgi*
// @version       1.0.0
// @author        AfzalivE (AfzalNaj)
// ==/UserScript==

// Change the @include to your router's IP

GM_addStyle(
		".usage {bottom: -35px!important; font: bold 12px Tahoma,Arial,sans-serif; width: 500px!important; z-index: 1!important;}"
	);

var totalCapacity = 120; // in GB
var usage = document.getElementById("label").innerHTML;

regex = /(\d+) MB \/ .* (\d+)/;
var inc = usage.match(regex)[1];
var out = usage.match(regex)[2];

var totalUsed = parseInt(inc) + parseInt(out);

var percent = totalUsed * 100 / (totalCapacity * 1024);
percent = Math.round(percent * 100) / 100;
var percentLeft = 100 - percent;
var capLeft = percentLeft * 120 / 100;

usageDiv = document.createElement("li");
usageDiv.setAttribute('class','usage');
document.getElementById("t-graph").appendChild(usageDiv);
usageDiv.innerHTML = percent.toString() + "% used, " + capLeft.toString() + " GB left";