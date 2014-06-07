// ==UserScript==
// @name           xkiv-th-sell-improver
// @namespace      xKiv
// @include        *twilightheroes.com/sell.php*
// ==/UserScript==

function reverse(s){
    return s.split("").reverse().join("");
}

var reFull = new RegExp("\\(([0-9]*)\\)[ \t]*\\[([0-9]*) chips each\\]$");
var reFullx = new RegExp("\\[([0-9]*) chips\\]$");
function get_select_value(a) {
	var av = a.innerHTML;
	var avm = reFull.exec(av);
	var avm2 = reFullx.exec(av);
	var num1;
	var prc1;
	if (avm == null) {
		num1 = 1;
		prc1 = avm2[1];
	} else {
		num1 = avm[1];
		prc1 = avm[2];
	}
	return num1*prc1;
}

function update_select() {
	var selects = document.evaluate(".//select[@name='whichitem[]']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (selects.snapshotLength < 1)
		return;
	var selex = selects.snapshotItem(0);
	var opts = selex.options;
	var z = [];
	for (var i = 0; i < opts.length; i++) {
		var op = opts[i];
		var zItem = [];
		zItem.innerHTML = op.text;
		zItem.text = op.text;
		zItem.value = op.value;
		z[i] = zItem;
	}

	z.sort(function(a,b) {
		var v1 = get_select_value(a);
		var v2 = get_select_value(b);
		return v2-v1;
	});

	ii = 0;
	var total = 0;
	var opx;
	for (oo in z) {
		opx = z[oo];
		var opxv = get_select_value(opx);
		total += opxv;
		opx.text = opx.text + ' {' + opxv + '}';
		selex.options[ii].text = opx.text;
		selex.options[ii].value = opx.value;
		ii++;
	}
	if (selex != null) {
		opx = selex.parentNode;
		var div = document.createElement('div');
		div.innerHTML = 'Total: ' + total + ' chips in ' + (ii+1) + ' stacks';
		opx.appendChild(div);
	}
}

update_select();

