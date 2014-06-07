// ==UserScript==
// @name           cz_ss_replace
// @namespace      http://userscripts.org/users/93551
// @include        *lolthai.com*/details.php*
// @include        *madoomee.com*/details.php*
// ==/UserScript==

var REPLACE_SITES = ["torrentmove", "postto", "ohozaa", "piggy"];

function Hashtable(){
	this.keys = new Array();
	this.values = new Array();
	this.length = 0;
}

Hashtable.prototype.set = function(key, value){
	var index = this.keys.indexOf(key);
	if(index == -1){
		this.length++;
		this.keys.push(key);
		this.values.push(value);
	}else{
		this.values[index] = value;
	}
}

Hashtable.prototype.get = function(key){
	var index = this.keys.indexOf(key);
	if(index != -1)
		return this.values[index];
	return null;
}

var table = new Hashtable();

function xpathFirst(p, c) {
  return document.evaluate(p, c || document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function buildRegex(){
  var result = "";
  for(var i in REPLACE_SITES){
    if(i != 0)
        result += "|"
    result += "(http|htts):[\\w-\./]*" + REPLACE_SITES[i] + "[\\w-\./\?\=]*"  
  }
  return new RegExp(result, "ig");  
}

function main(){
	//find all links
    var reg = buildRegex();
	var ss = xpathFirst('/html/body/table[2]/tbody/tr[2]/td/table/tbody/tr[3]/td[2]');
	var detail = xpathFirst('/html/body/table[2]/tbody/tr[2]/td/table/tbody/tr[4]/td[2]');
	var l = ss.innerHTML.match(reg);
	var d = detail.innerHTML.match(reg);
	for(var i in l){
		//remove last char
		if(l[i].charAt(l[i].length - 1) == '"')
			l[i] = l[i].substring(0, l[i].length - 1);
			
		table.set(l[i], "");
	}	
	for(var i in d){
		//remove last char
		if(d[i].charAt(d[i].length - 1) == '"')
			d[i] = d[i].substring(0, d[i].length - 1);
			
		table.set(d[i], "");
	}
	
	//no torrent move link found
	if(l == null && d == null)
		return
	
	//find cadmium's comment
	var exist = xpathFirst("/html/body/table[2]/tbody/tr[2]/td/table[2]/tbody/tr/td/table/tbody/tr/td/p/a/b/font[b='cadmium']");
	if(exist){
		var tab = exist.parentNode.parentNode.parentNode.nextSibling.nextSibling;
		var as = tab.getElementsByTagName('a');
		for(var i=0; i<as.length; i+=2){
			table.set(as[i].href, as[i+1].href);
		}
	}
	
	//replace
	
	/*
	var ssa = ss.getElementsByTagName('a');
	var detaila = detail.getElementsByTagName('a');
	for(var i in ssa){
		var x = ssa[i].href;
		alert(x);
		if(table.get(x))
			alert(table.get(x));
	}
	for(var i in detaila){
		var x = detaila[i].href;
		alert(x);
		if(table.get(x))
			alert(table.get(x));
	}
	*/
	
	
	var tempss = ss.innerHTML;
	var tempdetail = detail.innerHTML;
	for(var i = 0; i<table.length; i++){
		tempss = tempss.replace(table.keys[i], table.values[i]);
		tempdetail = tempdetail.replace(table.keys[i], table.values[i]);
	}
	ss.innerHTML = tempss;
	detail.innerHTML = tempdetail;
}

main();