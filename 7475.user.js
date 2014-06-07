// ==UserScript==
// @name             2chdatreader9
// @namespace        
// @description      2ch dat reader
// @include          *
// ==/UserScript==


var DEBUG = 0;
var AOMIT = 1;
var SIMPLE = 1;
var CONFIRM = 0;
var OUTPUT = 1005;
var EXTRA = 0;
var i;
var NL = "\n";


var url= document.URL;
if ( !url.match("dat$") ) return;
//var len = url.length;
//if ( "dat" != url.substring(len-3, len) ) return;

var str = "";
//str = document.body.getElementsByTagName("pre")[0].nodeName;
var childs = document.body.getElementsByTagName("pre")[0].childNodes;
str = "";
for ( i=0; i<childs.length; i++) {
	str += childs[i].nodeValue;
}

//alert(str);

var lines = str.split(NL);
//alert(lines[0]);

var STEP = "<>";
//tmp = lines[0].split(STEP);
//alert(tmp[0]);
name = new Array(0);
mail = new Array(0);
dateid = new Array(0);
res = new Array(0);
title = new Array(0);
for ( i=0; i<lines.length-1; i++) {
	tmp = lines[i].split(STEP);
	name.push( tmp[0]);
	mail.push(tmp[1]);
	dateid.push(tmp[2]);
	res.push(tmp[3]);
	title.push(tmp[4]);
}

if (0 < DEBUG && DEBUG < 2) {
alert(name[0]);
alert(name[0] + mail[0] + dateid[0] + res[0] + title[0]);
}

/* ******************************************************* */

if (0 < DEBUG && DEBUG < 3) {
result = res[0];
var ele = document.createElement("pre");
var strt = document.createTextNode(result);
ele.appendChild(strt);
alert(result);
document.body.insertBefore(ele, document.body.firstChild);
}

/* ******************************************************* */

/* name change */
var BB = "&lt;\/b&gt;";
var BS = "&lt;b&gt;";
for ( i=0; i<name.length; i++) {
	while ( name[i].match("<\/b>") ) name[i] = name[i].replace("<\/b>", BB);
	while ( name[i].match("<b>") ) name[i] = name[i].replace("<b>", BS);
}
for ( i=0; i<name.length; i++) {
	while ( name[i].match(BB) ) name[i] = name[i].replace(BB, "<b>");
	while ( name[i].match(BS) ) name[i] = name[i].replace(BS, "</b>");
}

/* res change */
var BR = "<br>";
var AMPGT = "&gt;";
var AMPLT = "&lt;";
var AMPQUOT = "&quot;";
var AMPNBSP = "&nbsp;";
var AMPAMP = "&amp;";
var Aend = "<\/a>";
var Astart = "<a .*?blank\">";
for ( i=0; i<res.length; i++) {
	res[i] =  res[i].replace(/<br>/g, NL);
	//while ( res[i].match(BR) ) res[i] = res[i].replace(BR, NL);

	res[i] = res[i].replace(/&gt;/g, ">");
	res[i] = res[i].replace(/&lt;/g, "<");
	res[i] = res[i].replace(/&quot;/g, "\"");
	res[i] = res[i].replace(/&nbsp;/g, " ");
	//while ( res[i].match(AMPGT) ) res[i] = res[i].replace(AMPGT, ">");
	//while ( res[i].match(AMPLT) ) res[i] = res[i].replace(AMPLT, "<");
	//while ( res[i].match(AMPQUOT) ) res[i] = res[i].replace(AMPQUOT, "\"");
	//while ( res[i].match(AMPNBSP) ) res[i] = res[i].replace(AMPNBSP, " ");

	res[i] = res[i].replace(/&amp;/g, "&");
	//while ( res[i].match(AMPAMP) ) res[i] = res[i].replace(AMPAMP, "&");

	if (AOMIT) {
		//alert("Aomit");
		res[i] =  res[i].replace(/<\/a>/g, "");
		//while ( res[i].match(Aend) ) res[i] = res[i].replace(Aend, "");

		res[i] =  res[i].replace(/<a .*?blank\">/g, "");
		/* not good ??*/
		//while ( res[i].match(Astart) ) res[i] = res[i].replace(Astart, "");
	} // end AOMIT
} // end 


/* reslines */
/*
reslines = new Array(0);
for ( i=0; i<res.length; i++) {
	tmp = res[i].split(NL);
	reslines.push(tmp);
}
*/
//alert(reslines[0][0]);

/* css */
var RESUNIT = "res_unit";
var RESTITLE = "res_title";
var RESINFO = "res_info";
 var RESNUM = "res_num";
 var RESNAME = "res_name";
 var RESMAIL = "res_mail";
 var RESDATEID = "res_dateid";
var RESBODY = "res_body";
var SIMPLEP = "simplep";
// var RESLINES = "res_lines";
GM_addStyle(
	RESUNIT +
	'{' +
	' display: block;' +
	'}'
);
GM_addStyle(
	RESTITLE +
	'{' +
	' display: block;' +
	' font-weight: bold;' +
	'}'
);
GM_addStyle(
	RESINFO +
	'{' +
	' display: block;' +
	'}'
);
GM_addStyle(
	RESNUM +
	'{' +
	' font-weight: bold;' +
	'}'
);
GM_addStyle(
	RESNAME +
	'{' +
	' font-weight: lighter;' +
	' font-size: small;' +
	' color: gray;' +
	'}'
);
GM_addStyle(
	RESMAIL +
	'{' +
	' font-weight: lighter;' +
	' font-size: small;' +
	' color: skyblue;' +
	'}'
);
GM_addStyle(
	RESDATEID +
	'{' +
	' font-weight: lighter;' +
	' font-size: small;' +
	' color: pink;' +
	'}'
);
GM_addStyle(
	RESBODY +
	'{' +
	' white-space:pre;' +
	'}'
);
GM_addStyle(
	SIMPLEP +
	'{' +
	' white-space:pre;' +
	'}'
);

/* */
document.body.removeChild(document.body.lastChild);



/* simple */
if (SIMPLE) {
var simple = "";
for ( i=0; i<res.length && i<OUTPUT; i++) {
	//simple += "---\n";
	simple += title[i];
	simple += "\n";
	simple += eval(i+1);
	simple += " ";
	simple += name[i];
	simple += " [";
	simple += mail[i];
	simple += "] ";
	simple += dateid[i];
	simple += "\n";
	simple += res[i];
	simple += "\n";
}
var simplepre = document.createElement(SIMPLEP);
var simplet = document.createTextNode(simple);
simplepre.appendChild(simplet);
document.body.appendChild(simplepre);

return;
}


/* confirm */
var confirmresult = true;
if (CONFIRM) {
confirmresult = confirm(eval(res.length) + "\n" +  title[0] + "\n" + name[0] +  "[" + mail[0] + "]" + dateid[0] + "\n" + res[0]);
}
if(!confirmresult) return;

/* output */
for ( i=0; i<res.length && i<OUTPUT; i++) {
	var str;
	var strt;



	/* RESUNIT */
	var res_unit = document.createElement(RESUNIT);


	/* RESTITLE */
	var res_title = document.createElement(RESTITLE);
	str = title[i];
	strt = document.createTextNode(str);
	res_title.appendChild(strt);
	res_unit.appendChild(res_title);


	/* RESINFO */
	var res_info = document.createElement(RESINFO);

	var res_num = document.createElement(RESNUM);
	str = eval(i+1);
	strt = document.createTextNode(str);
	res_num.appendChild(strt);
	res_info.appendChild(res_num);

	var res_name = document.createElement(RESNAME);
	str = name[i];
	strt = document.createTextNode(str);
	res_name.appendChild(strt);
	res_info.appendChild(res_name);

	var res_mail = document.createElement(RESMAIL);
	str = mail[i];;
	strt = document.createTextNode(str);
	res_mail.appendChild(strt);
	res_info.appendChild(res_mail);

	var res_dateid = document.createElement(RESDATEID);
	str = dateid[i];
	strt = document.createTextNode(str);
	res_dateid.appendChild(strt);
	res_info.appendChild(res_dateid);

	res_unit.appendChild(res_info);


	/* RESBODY */
	var res_body = document.createElement(RESBODY);
	str = res[i];
	strt = document.createTextNode(str);
	res_body.appendChild(strt);
	res_unit.appendChild(res_body);


	//document.body.insertBefore(res_unit, document.body.lastChild);
	document.body.appendChild(res_unit);

	/*  */
	strt = document.createTextNode("\n");
	document.body.appendChild(strt, document.body.lastChild);
	
}






if (EXTRA) {
var result = document.getElementsByTagName("html")[0].innerHTML;
var resultt = "<html>" + result + "</html>";
//GM_log(resultt);

myWindow=window.open('','My','resizable=yes,menubar=yes,scrollbars=yes,width=200,height=100');

//myWindow.document.getElementsByTagName("html")[0].innerHTML = result;
myWindow.document.write(resultt);

myWindow.document.close();
//myWindow.focus()
}
