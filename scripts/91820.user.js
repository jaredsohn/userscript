// ==UserScript==
// @name           dsleftover
// @namespace      agrafix
// @description    Wie viele truppen sind übrig (BERICHTE)
// @include       http://ae*.die-staemme.ae/game.php?village=*&screen=report&mode=all&view=*
// ==/UserScript==

function leftover(tableid) {
	var anzahl_tr = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table[" + tableid + "]/tbody/tr[3]/td/table/tbody/tr[2]");
	var verluste_tr = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table[" + tableid + "]/tbody/tr[3]/td/table/tbody/tr[3]");
	var the_table = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[4]/td/table[" + tableid + "]/tbody/tr[3]/td/table/tbody");
	
	var ael = anzahl_tr.getElementsByTagName("td");
	var anzahl = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	for (var i = 1;i<13;i++) {
		anzahl[(i-1)] = parseInt(ael[i].innerHTML);
	}
	
	var vel = verluste_tr.getElementsByTagName("td");
	var verluste = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
	for (var j = 1;j<13;j++) {
		verluste[(j-1)] = parseInt(vel[j].innerHTML);
	}
	
	var new_tr = document.createElement("tr");
	var new_td;
	var left = 0;
	var percentage = 0;
	
	for (var k = 0;k<13;k++) {
		new_td = document.createElement("td");
		new_td.setAttribute("ستايل", "text-align:center;border-top:1px solid black;");
		
		if (k == 0) {
			new_td.innerHTML = "&Uuml;brig:";
		}
		else {
			left = (anzahl[(k-1)]-verluste[(k-1)]);
			if (left == 0) {
				new_td.setAttribute("فئة", "مخفي");
				percentage = 0;
			}
			else {
				percentage = Math.round(left/anzahl[(k-1)]*100);
			}
			
			new_td.innerHTML = left + "<br />(" + percentage + "%)";
			
			
		}
		
		new_tr.appendChild(new_td);
	}
	
	insertAfter(the_table, new_tr, verluste_tr);
}

leftover(3);
leftover(4);

function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;//.textContent
	
	return node;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}