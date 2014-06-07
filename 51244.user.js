// ==UserScript==
// @name         Livebox : Update DNS
// @description	 Ajouter un boutton sur la Livebox pour pouvoir acceder simplement au gestionnaire DNS
// @author       Max485
// @include	     *192.168.1.1/cache*
// @include	     *192.168.1.1/index.cgi*
// ==/UserScript==

var table = ufEval('/html/body/form/table/tbody/tr[2]/td/table[3]/tbody', document);
table = table.snapshotItem(0);

var new_tr = document.createElement('tr');
var new_td = document.createElement('td');

table.appendChild(new_tr);
new_tr.appendChild(new_td);

new_td.setAttribute('colspan', '3');
new_td.setAttribute('class', 'standard_cell');
new_td.innerHTML = "<a onclick=\"javascript:mimic_button('navigator: 9027..');\" style='cursor : pointer;'>Acceder au Gestionnaire DNS</a>";





function ufEvalnode(path,document,node) {
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return ret;

}
function ufEval(path,document) {
	return ufEvalnode(path,document,document);
}