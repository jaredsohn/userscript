// ==UserScript==
// @name          881903 HD archive direct download
// @author        Leonard Kuan
// @description   adds download links for 881903.com hd archived contents
// @include       *881903.com*
// @version       0.1
// ==/UserScript==

(function () {	
	var stuff = document.baseURI.match(/filename=([^&]*)/)[1].split(";");
	var num_parts = stuff.length;
	for (i=0; i<num_parts; i++)
	{	var j = i+1;
		link = document.createElement("div");
	    	link.innerHTML = '<a href="http://content-oversea.881903.com'+stuff[i]+'" style="">part ' + j + '</a>';
		link.style.textAlign = "center";
	document.getElementById("main").appendChild(link);
	}
})();