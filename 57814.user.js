// ==UserScript==
// @name           Ricardo Evaluation Links 
// @version        0.1
// @include        http://*.ricardo.ch/accdb/ViewUser.asp*
// @include        https://*.ricardo.ch/accdb/ViewUser.asp*
// ==/UserScript==



var elements = document.getElementsByClassName('n_Sumrating');
if(elements.length){
	var table = elements[0];
	// getting each line
	if(table.children.length){
		var tr = table.children;
		// getting the td with the item id line
		var tds = new Array();
		for(var i = 0; i < tr.length; i++){
			if(tr[i].children && tr[i].children[4]){
				var td = tr[i].children[4];
				tds.push(tr[i].children[4]);
				td.innerHTML = '<a href="http://www.ricardo.ch/accdb/viewitem.asp?IDI='+ td.innerHTML + '">' + td.innerHTML + '</a>';
			}
		}
	}
}