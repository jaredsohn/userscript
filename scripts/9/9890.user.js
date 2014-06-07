// ==UserScript==
// @name	Myspace Add Friend Button
// @version	0.1
// @author	Suzzaneer
// @namespace	
// @description	Myspace Add Friend Button To Search 
// @include	http://search.myspace.com/*

// ==/UserScript==


(function() {
	resTable = document.getElementById('friendresults');
	var i;
	for (i=0; i<resTable.rows.length ;i++){
		var str = resTable.rows[i].cells[2].firstChild.nextSibling.childNodes[1].firstChild + "";
		arr = str.split("=");
		friendNum = arr[arr.length-1];
		inHTML = resTable.rows[i].cells[2].firstChild.nextSibling.innerHTML;
		added = "<li><a href='http://collect.myspace.com/index.cfm?fuseaction=invite.addfriend_verify&friendID="+friendNum+"' target='_blank'>Add Friend</a></li>";
		resTable.rows[i].cells[2].firstChild.nextSibling.innerHTML = added + inHTML;
	}
})();



