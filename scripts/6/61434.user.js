// ==UserScript==
// @name           totauxVueGlobale
// @namespace      e-univers
// @include        http://*.e-univers.org/index.php?action=overview
// ==/UserScript==
function ufEvalnode(path,document,node) {
	var ret = document.evaluate(path,node,null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return ret;

}
function ufEval(path,document) {
	return ufEvalnode(path,document,document);
}
String.prototype.trimInt = function() {
	string = this.replace(/\D/g,'');
	return string ? parseInt(string) : 0;
}
function uf_addFormat(str) {
	str += '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(str)) {
		str = str.replace(rgx, '$1' + ' ' + '$2');
	}
	return str;
}

var rows=ufEval("id('divpage')/table/tbody/tr",document);
var total=0;
for(var i=10;i<13;i++)
	{
		var row=rows.snapshotItem(i);
		var cells=row.getElementsByTagName('th');
		var nb=0;
		for(var j=1;j<cells.length;j++)
			{
				//alert(cells[j].innerHTML);
				nb+=cells[j].innerHTML.trimInt();
			}
		var cell = document.createElement('th');
		total+=nb;
		cell.innerHTML=uf_addFormat(nb);
		row.appendChild(cell);
	}
row=rows.snapshotItem(9);
cell = document.createElement('th');
cell.innerHTML=uf_addFormat(total);
row.appendChild(cell);
