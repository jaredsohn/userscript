/*//////////////////////////////////////////////////////////////////////////
// ==UserScript===
// @name           WhatPulse Exchanger
// @author         Jerone UserScript Productions
// @namespace      http://userscripts.org/users/31497
// @homepage       http://userscripts.org/scripts/show/96801
// @description    Adds some tweaks to WhatPulse website.
// @description    WhatPulse Exchanger 8
// @copyright      2012 Jerone
// @version        8
// @icon           http://mallow.wakcdn.com/avatars/000/893/279/normal.png
// @include        http://whatpulse.org/stats/users/*/
// @include        https://whatpulse.org/stats/users/*/
// ==/UserScript==
///////////////////////////////////////////////////////////////////////////*/



var table = document.getElementById("content").getElementsByClassName("pulses")[1],
	trs = table.getElementsByTagName("tr");
Array.prototype.slice.call(trs, 0).forEach(function(row){
	var headers = row.getElementsByTagName("th");
	if(headers.length>0){
		var header = headers[0],
			item = document.createElement("th");
		item.appendChild(document.createTextNode("Computer"));
		header.parentNode.insertBefore(item, header);
	} else {
		var cells = row.getElementsByTagName("td"),
			cell = cells[0],
			img = cell.getElementsByTagName("img")[0],
			item = document.createElement("td");
		item.appendChild(document.createTextNode(img.getAttribute("title").split(/\son\scomputer\s/i)[1]));
		cell.parentNode.insertBefore(item, cell);
	}
});


var infoNotice = document.getElementById("content").getElementsByClassName("notice")[0];
infoNotice.innerHTML = infoNotice.innerHTML.replace(/This user is in team <a.+href=\"([^\"]*)\".+>(.*)<\/a> and is ranked (\d*)(st|nd|rd|th) in that team/, function(){
	return 'This user is in team <a href="' + arguments[1] + '">' + arguments[2] + '</a> and is ranked <a href="' + arguments[1] + 'page/' + Math.floor((parseInt(arguments[3])-1)/25)  + '/">' + arguments[3] + arguments[4] + '</a> in that team';
});
infoNotice.innerHTML = infoNotice.innerHTML.replace(/is in (\d*)(st|nd|rd|th) place./, function(){
	return 'is in <a href="http://whatpulse.org/stats/users/page/' + Math.floor((parseInt(arguments[1])-1)/25)  + '/">' + arguments[1] + arguments[2] + '</a> place.';
});



//*** STATISTICS ***//
// Chars (exclude spaces): 2.030
// Chars (include spaces): 2.280
// Chars (Chinese): 0
// Words: 198
// Lines: 53