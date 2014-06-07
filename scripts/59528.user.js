// ==UserScript==
// @name           Conquer Space advanced
// @description    Replaces +N Link in Constructionmenu with max possible number to build;
// @namespace      http://beta.conquer-space.net/Ingame/colony*
// ==/UserScript==


// Converts strings like 12.345 or 123k to numbers
function strnr(obj) {
	var returned;
	var ergebnis = obj.search(/\d+k/);
	if (ergebnis == 0) {
		returned = obj.substr(0, obj.length - 1);
		returned = parseInt(returned)*1000;
	} else {
		var i = obj.indexOf(".");
		var returned = obj.substr(0,i) + "" + obj.substr(i+1,3);
		returned = parseInt(returned);
	}
	
	return returned;
}

var stahl = document.getElementById("res_0").innerHTML;
var oel = document.getElementById("res_1").innerHTML;
var silizium = document.getElementById("res_2").innerHTML;
var deuterium = document.getElementById("res_3").innerHTML;

stahl = strnr(stahl);
oel = strnr(oel);
silizium = strnr(silizium);
deuterium = strnr(deuterium);

// take a building with index i in buildlist
// and returns the resource cost as an array(metal,oel,siliz,deut)
function res(i) {
	var span = document.getElementById("b-btns-"+i);
	var root = span.parentNode.parentNode.nextSibling.nextSibling;
	var metal_res = root.firstChild.nextSibling;
	var oel_res = metal_res.nextSibling.nextSibling;
	var silizium_res = oel_res.nextSibling.nextSibling;
	var deuterium_res = silizium_res.nextSibling.nextSibling;
	
	// filters out the numbers
	this.html2nr = function(res) {
		var str = res.innerHTML;
		var j = str.indexOf(">");
		str = str.substr(j+1, str.length - j - 1);
		str = strnr(str);
		return str;
	}

	var array_res = new Array();
	array_res[0] = this.html2nr(metal_res);
	array_res[1] = this.html2nr(oel_res);
	array_res[2] = this.html2nr(silizium_res);
	array_res[3] = this.html2nr(deuterium_res);
	
	return array_res;
}

// calculates the max buildlimit
function howmany(cost_res) {
	var factor = 999;
	//stahl
	var result = Math.floor(stahl / cost_res[0]);
	if (factor > result) factor = result;
	// oel
	result = Math.floor(oel / cost_res[1]);
	if (factor > result) factor = result;
	// silizium
	result = Math.floor(silizium / cost_res[2]);
	if (factor > result) factor = result;
	// deuterium
	result = Math.floor(deuterium / cost_res[3]);
	if (factor > result) factor = result;
	
	if (factor <= 1) return 0;
	else return factor;
}

// For all buildings in buildlist
for (var i = 0; document.getElementById("name-"+i);i++) {

	var job = document.getElementById("name-"+i);
	var span = document.getElementById("b-btns-"+i);
	link = span.lastChild.previousSibling;
	parent = job.parentNode.previousSibling;
	if (parent.nodeName == "#text") {
		parent = parent.previousSibling;
	}
	var cost_res = res(i);
	var nr = howmany(cost_res);
	if (nr > 0) {
		var href = link.previousSibling.previousSibling.getAttribute("href", false);
		// Link to Add
		href = href.substr(0, href.length - 1);
		href = href + nr;
		
		link.setAttribute("href", href);
		link.innerHTML = "+" + nr;
	} else {
		var text = document.createTextNode(" ");
		link.parentNode.replaceChild(text, link);
	}
}
