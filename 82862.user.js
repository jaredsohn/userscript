// ==UserScript==
// @name           Phoca Download - count total number of downloads
// @namespace      http://d.hatena.ne.jp/at_kimura/
// @include        http://*/administrator/index.php?option=com_phocadownload&view=phocadownloads
// ==/UserScript==

(function(){
	var table = document.getElementById("editcell");
	var tbody = table.getElementsByTagName("tbody")[0];
	var trs = tbody.getElementsByTagName("tr");
	var sum = 0;
	for(var i=0;i<trs.length;i++){
	  var td = trs[i].getElementsByTagName("td")[4];
	  sum += td.innerHTML*1;
	}
	var thead = table.getElementsByTagName("thead")[0];
	var th = thead.getElementsByTagName("th")[4];
	th.appendChild(document.createElement("br"));
	th.appendChild(document.createTextNode(sum));
})();