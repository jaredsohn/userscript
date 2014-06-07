// ==UserScript==
// @name           Safety Deposit Box Mass Item Remover
// @namespace      sLAUGHTER
// @description    Removes either: All items, or leaves at least one of each :)
// @include        http://www.neopets.com/safetydeposit.phtml*
// ==/UserScript==

// DO NOT EDIT BELOW UNLESS YOU KNOW WHAT YOURE DOING!
// ---------------------------------------------------
obj = document.createElement('div'); 
obj.innerHTML = '<a href="#"><font size=-2>Remove All</a><br>---------</font>';
document.getElementsByClassName('content')[0].getElementsByTagName('td')[13].appendChild(obj);
obj.addEventListener('click', RemoveAll, false);

obj1 = document.createElement('div');
obj1.innerHTML = '<a href="#"><font size=-2>Leave One</font></a>';
document.getElementsByClassName('content')[0].getElementsByTagName('td')[13].appendChild(obj1);
obj1.addEventListener('click', RemoveLeave, false);
var itemoffset;
function RemoveAll(){
	itemoffset = 0;
	Remove();
}

function RemoveLeave(){
	itemoffset = 1;
	Remove();
}

function Remove(){
	var x=18;
	var count = cnt(document.body.innerHTML) + 4;
	for(var i=5;i<=count;i++){
		document.getElementsByClassName('content')[0].getElementsByTagName('input')[i].value = (document.getElementsByClassName('content')[0].getElementsByTagName('td')[x].innerHTML.replace(/<(\S+).*>(.*)<\/\1>/i,'$2')-itemoffset);
		x+=6;
	}
}

function cnt(str){
	var find = 'Remove One';
	var currcount = 0;
	for (var i=0;i<str.length;i++) {
		if (find == str.substr(i,find.length)) currcount++;
	}
	return currcount;
}