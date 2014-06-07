// ==UserScript==
// @name		[DS] Notizzettel bei Angriffsbestätigung
// @namespace		agrafix.net
// @description		Ermöglicht es Notizen in die Angriffsbestätigunsseite einzufügen
// @include		http://de*.die-staemme.de/game.php?village=*&screen=place&try=confirm*
// ==/UserScript==


function main() {
	// row
	var tr = document.createElement("tr");
	
	// td
	var td1 = document.createElement("td");
	td1.innerHTML = "Notiz:";
	tr.appendChild(td1);
	
	// td2
	var td2 = document.createElement("td");
	// input
	var input = document.createElement("input");
	input.id = "dsnote";
	input.value = GM_getValue(getUnique(), "");
	input.setAttribute('style', 'font-size:8pt;width:98%;');
	input.addEventListener('keyup', function(){
		var note = document.getElementById("dsnote").value;
		
		GM_setValue(getUnique(), note);
		
	}, false);
	td2.appendChild(input);
	
	tr.appendChild(td2);
	
	// table
	var table = $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table")
	table.appendChild(tr);
}

main();


/*
 * The function library
 * 
 */ 
function $xpath(xpath) {
	var xf = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
	var node = xf.singleNodeValue;

	return node;
}

function $gid(el) {
	var el = document.getElementById(id);

	return el;
}

function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

function parseGetVars() {
	var getVars = new Array();
	var qString = unescape(document.location.search.substring(1));
	var pairs = qString.split(/\&/);
	for (var i in pairs) {
		var nameVal = pairs[i].split(/\=/);
		getVars[nameVal[0]] = nameVal[1];
	}
	return getVars;
}

function getUnique() {
	// generate unique attack code
	var vars = parseGetVars();
	var unique = vars["village"].replace(/p/g, "").replace(/n/g, "") + "|";
	unique += $xpath("/html/body/table[2]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td[4]/b").innerHTML + "|";
	unique += $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[2]/td[2]/a").innerHTML + "|";
	unique += $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[3]/td[2]/a").innerHTML + "|";
	unique += $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table/tbody/tr[4]/td[2]").innerHTML + "|";
	unique += $xpath("/html/body/table[3]/tbody/tr/td/table/tbody/tr/td/table/tbody/tr/td/form/table[2]/tbody/tr[2]").innerHTML;
	//alert(unique);
	return unique;
}