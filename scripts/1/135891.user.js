// ==UserScript==
// @name           Company - Companies Managing
// @namespace      popmundo
// @include        http://*.popmundo.com/Common/CharacterDetails.asp?action=Miscellaneous&CharacterID=*
// @version	   2.0
// @description    A better visual solution
// @updateURL      https://userscripts.org/scripts/source/135891.meta.js
// @downloadURL    https://userscripts.org/scripts/source/135891.user.js
// ==/UserScript==
// don't ask how this works this script is ancient so I don't even remember
function X(xpath, doc) {
	if (doc == null) doc = document;
	try {
		var elem = doc.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (elem && elem.snapshotLength >= 1) {
			return elem.snapshotItem(0);
		}
		else return null;
	}
	catch (e) {
		GM_Log("X: " + e);
	}
}
function getN(a) { for (i = 0;i < a.length;i++) ret = ret + a[i]+ (a[i+1]?String(a[i+1]).length<3?".":"":""); return ret; }
function readable(a) {
	var ret = "", s="";
	if (String(a).indexOf(".") > -1) {
		s = String(a).slice(0,String(a).indexOf("."));
		ret = String(a).slice(String(a).indexOf("."),String(a).length).replace(".",",");
	}
	else s = a;
	var ln = String(s).length;
	for (var i=0;i <= ln;i++) if (i%3 ==0) ret =  " " + String(s).slice(ln-i,ln-i+3) + ret;
	ret = String(s).slice(0,(ln%3)) + ret;
	return ret;
}

var div = X('/html/body/table[3]/tbody/tr/td/div[2]'), lang = 0, cCount = 0, cTotal = 0, l=0;
var table = document.createElement("table");
table.width = "469";
table.cellSpacing = "0";
table.cellPadding = "2";
table.style.border = "0";
table.style.margin = "0 0 20 0";
var th = document.createElement("tr");
th.style.backgroundColor = "#FFF";
var td = document.createElement("td");
td.textContent = "Company";
td.style.width = "250px";
td.style.textAlign = "left";
th.appendChild(td);
var td = document.createElement("td");
td.textContent = "Amount";
td.style.width = "205px";
td.style.textAlign = "right";
th.appendChild(td);
table.appendChild(th);
for (i =0;i < div.childNodes.length;i++) { 
	if ((div.childNodes[i].tagName == "A") && (div.childNodes[i].href.indexOf("Company.asp") > -1)) {
		if (lang == 0) {
			if (div.childNodes[i -1].textContent.replace(/([\D]+)/ig,"").length > 0) lang = -1;
			else { lang = +1; div.childNodes[(i -1)].textContent = ""; }
		}
		var amount = (div.childNodes[i +lang].textContent.match(/([\d\-]+)/gi)), l = i,ret = "";
		for (j = 0;j < amount.length;j++) ret = ret + amount[j]+ (amount[j+1]?String(amount[j+1]).length<3?".":"":"");
		amount = parseFloat(ret);
		cTotal += amount;
		++cCount;
		var tr = document.createElement("tr");
		if (cCount%2 == 0) tr.className = "DarkColumnHL";
		var td = document.createElement("td");
		var a = document.createElement("a");
		a.innerHTML = div.childNodes[i].innerHTML;
		a.href = div.childNodes[i].href;
		td.appendChild(a);
		tr.appendChild(td);
		var td = document.createElement("td");
		td.textContent = readable(amount);
		td.style.textAlign = "right";
		tr.appendChild(td);
		table.appendChild(tr);
		div.childNodes[i].style.display = "none";
		div.childNodes[(i + lang)].textContent = "";
	}
	if ((l > 1) && (div.childNodes[i].tagName == "BR")) div.childNodes[i].style.display = "none";
}
if (lang != 0) {
	if (lang < 0) div.childNodes[l+1].textContent = "";
	var tr = document.createElement("tr");
	if (cCount%2 > 0) tr.className = "DarkColumnHL";
	var td = document.createElement("td");
	td.colSpan = "2";
	td.textContent = readable(cTotal);
	td.style.textAlign = "right";
	tr.appendChild(td);
	table.appendChild(tr);
	div.insertBefore(table,div.childNodes[l]);
}