// ==UserScript==
// @name           Goofbay Add Seller
// @namespace      http://fastcheck.blogspot.com
// @description    Add seller ID to each item row
// @include        http://www.goofbay.com/getBidderList.html?bidder_id=*
// ==/UserScript==
(function () { // function wrapper for Opera
var idUrl = "http://feedback.ebay.de/ws/eBayISAPI.dll?ViewFeedback&userid=";
var itemUrl = "http://cgi.ebay.de/ws/eBayISAPI.dll?ViewItem&item=";
var tr = document.evaluate("//table/descendant::table/descendant::tr", document, null, 7,null);
var trl = tr.snapshotLength-1;
var td = new Array(),offset=2,x,item,vk,node;
regExp = /sellerid=(\b[^&]*)&/; 

td[1] = document.createElement("td");
td[1].innerHTML = "<b>Seller</b>";
tr.snapshotItem(1).appendChild(td[1]);

for (var j=offset;j<trl;j++) {

		node = tr.snapshotItem(j);
		td[j] = document.createElement("td");
		td[j].setAttribute('class',(j%2==0)?'result_row_alt':'result_row');
		node.appendChild(td[j]);

	x = (node.childNodes.length<12)?2:3;
	item = node.childNodes[x].firstChild.innerHTML;

		GM_xmlhttpRequest({ 
			method:"GET", 
			url:itemUrl + item,
			onload:function(result) {
					vk = regExp.exec(result.responseText)[1];
					td[offset].innerHTML = "<a href=" + idUrl + vk + " target='_blank'>" + vk + "</a>";
					offset++;
			}
		});
}
})(); // function wrapper for Opera
