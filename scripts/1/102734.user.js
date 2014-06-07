// ==UserScript==
// @name           General Functions
// @namespace      gen_functions
// @description    This script doesn't do anything. It's only purpose it to provide some functions for other scripts.
// @include 	http://*.travian.*/dorf*.php*
// ==/UserScript==

// Helpful functions
// Quick getElement
function Id(e, id){ return e.getElementById(id); }
function Tag(e, tn){ return e.getElementsByTagName(tn); }
function Class(e, cn){ return e.getElementsByClassName(cn); }
function $(id){ return Id(document, id); }
function $t(tn){ return Tag(document, tn); }
function $c(cn){ return Class(documentm, cn); }
function $$(s, all){
	if(all) return document.querySelectorAll(s);
	return document.querySelector(s); 
}
// Cookies
function getCookie(c_name){
	if (document.cookie.length>0){
		c_name = "t4Custom_" + c_name;
		var c_start=document.cookie.indexOf(c_name + "=");
		if (c_start!=-1){
			c_start=c_start + c_name.length+1;
			var c_end=document.cookie.indexOf(";",c_start);
			if (c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
}
function setCookie(c_name,value,exp){
	if(exp==null) exp = 31536000000; // ms per year;
	expdate=new Date();
	expdate.setTime(expdate.getTime() + exp);

	c_name = "t4Custom_" + c_name;
	var c_value=escape(value) + "; expires="+expdate.toUTCString() + ";";
	document.cookie=c_name + "=" + c_value;
}
function arrayToCookies(array, c_name){
	if(c_name == null || array == null) return;
	for(var i=0;i<array.length;i++){ 
		setCookie(c_name+i, array[i]);
	}
}
function cookiesToArray(c_name){
	if(c_name == null) return;
	var array = new Array();
	var i=0;
	while(getCookie(c_name+i) && getCookie(c_name+i).length>0 ){
		array[i] = getCookie(c_name+i);
		i++;
	}
	return array;
}
// Elements
function __elem(e){
	try {elem.parentNode.removeChild(elem);} catch(error) { elem = null; }
}
function _elem(tag, html, id, name){
	if(html==null) html="";
	if(tag==null || tag=="") return;
	var el = document.createElement(tag);
	el.innerHTML = html;
	if(id) el.id = id;
	if(name) el.name = name;
	return el;
}
function _node(par, chil, html, num, id, name){
	var c, i;
	if(num==null) num=1;
	if(html==null) html="";
	if(id!=null) id="nodeCus_"+chil;
	if(par==null || chil==null) return;
	if(typeof(par)!='object') par = _elem(par);
	for(var i=0; i<num; i++){
		c = _elem(chil, html, id+i, name);
		par.appendChild(c);
	}
	return par;
}
// String
function multStr(n, s){
	if(n<1) return"";
	var os = s
	while(n>1){ n--;s+=os; }
	return s;
}
function fix(str, len){	return multStr(len - str.length, '0')+str; }
function _N(n){ return parseInt(n);}
// Other
function nToColor(value, range, colA, colB){
	if(value>range[1]) value = range[1];
	if(value<range[0]) value = range[0];
	if(!colA) colA = [0,0,255];
	if(!colB) colB = [255,0,0];
	var RGB = new Array();
	for(var i=0;i<4;i++){
		RGB[i]=(colA[i]-colB[i]) * (value/(range[1]-range[0])) + colB[i];
	}
	return "#"+fix(Math.round(RGB[0]).toString(16), 2)
		+fix(Math.round(RGB[1]).toString(16), 2)
		+fix(Math.round(RGB[2]).toString(16), 2);
}

