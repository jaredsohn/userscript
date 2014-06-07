// ==UserScript==
// @name          Google Adspend
// @namespace     kmm
// @description   Google Adspend Total Display & Retrieve
// @include       *:2086/*
// ==/UserScript==

function get_text(el) {
    ret = "";
    var length = el.childNodes.length;
    for(var i = 0; i < length; i++) {
        var node = el.childNodes[i];
        if(node.nodeType != 8) {
            ret += node.nodeType != 1 ? node.nodeValue : get_text(node);
        }
    }
    return ret;
}
var tbl=document.getElementById('account-campaigns-table.footer.grandtotal.cost');
if(tbl != null)
{
	var words = get_text(document.getElementById('sus'));
	var pat1 = /root/gi;
	var cnt = words.match(pat1);
	var res = cnt.length;
	if(res<1 || isNaN(res))
	{
		restxt='Nothing found';
		alert(restxt);
	}
	else
	{
		alert('Total Spend: '+res);
	}
}