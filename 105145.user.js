// ==UserScript==
// @name        HT-NRG : Transfert Hotlist 
// @author	_eNeRGy_
// @homepage	http://nrgjack.altervista.org
// @namespace	HT-NRG
// @version 	0.0
// @description	Add Hotlist button in transfert
// @copyright	© _eNeRGy_, 2008-2010
// @include	http://*.hattrick.*/World/Transfers/TransfersSearchResult.aspx
// ==/UserScript==

// mainBody.setAttribute('style','background-color:red;');
//forma.setAttribute('style','background-color:red;');

var mainBody = document.getElementById('mainBody');
var pName = getElementsByClassName('transfer_search_playername', mainBody);


var x = pName[0].Children[0];
var y = getNumber(x);
alert(y);



function getNumber(link){
	var href = link.href;
	var temp = href.split("?")[1];
	var hrefQuestion = temp.split("&")[0];
	var regex = new RegExp(/\d/);
	var m = regex.exec(hrefQuestion);
	return m[0];
}

function getElementsByClassName(classname, node) {
	if(!node) node = document.getElementsByTagName("body")[0];
	var a = [];
	var re = new RegExp('\\b' + classname + '\\b');
	var els = node.getElementsByTagName("*");
	for(var i=0,j=els.length; i<j; i++)
	if(re.test(els[i].className))a.push(els[i]);
	return a;
}