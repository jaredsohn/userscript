// ==UserScript==
// @name           eRep ease donate
// @namespace      ns
// @include        http://www.erepublik.com/*/donate/*
// ==/UserScript==

function updInv(){
var plink = document.querySelector('#menu2 ul li a').href;

GM_xmlhttpRequest({
  method: "GET",
  url: plink,
  onload: function(response) {
	if (!response.responseXML) response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
    var text = response.responseText;
	var L = text.length;
	var idx = text.indexOf('<ul id="owninv" class="inventory padded" >');
	text = text.substr(idx, L-idx);
	idx = text.indexOf('</ul>');
	text = text.substr(0, idx+5);
	var inv = document.getElementById('small');
	inv.innerHTML = '';
	inv.innerHTML = text;
	transform();
	init();
  }
});
}

function transform(){
	var list = document.querySelectorAll('#small li');
	var id;

	for (var i=list.length-1; i>=0; i--){
		id = /personalitem(\d*)/.exec(list[i].id)[1];
		var hin = list[i].appendChild(document.createElement('INPUT'));
		hin.setAttribute('type', 'hidden');
		hin.setAttribute('name', 'products[]');
		hin.id = 'products_'+id;
		hin.value = id;
	}
}

function checkItem(el){
	while(el.tagName.toLowerCase() != 'li' && el.tagName.toLowerCase() != 'body') el = el.parentNode;
	return el.tagName.toLowerCase()=='li'?el:null;
}

function toDonate(e){
	var el = checkItem(e.target);
	var toTr = document.getElementById('big');

	if (!el) return 0;
	if (toTr.childNodes.length>10) return 0;

	var i, node, nn;
	
	if (e.shiftKey) {
		for(i=0; i<9; i++){
			nn = el.nextSibling.tagName=='LI'?el.nextSibling:el.nextSibling.nextSibling;
			node = el.parentNode.removeChild(el);
			toTr.appendChild(node);
			el = nn;
		}
	}else{
		node = el.parentNode.removeChild(el);
		toTr.appendChild(node);
	}
	
	var node = el.parentNode.removeChild(el);
	toTr .appendChild(node);
}

function init(){
	var el = document.getElementById('small');
	el.addEventListener('click', toDonate, true);
}

var p = document.createElement('P');
p.setAttribute('class', 'padded goright');
p.innerHTML = '<a class="dotted updLink" style="cursor: pointer" id="invUpd"> Update inventory </a>';
el = p.firstChild;
var pN = document.getElementById('items2');
pN.parentNode.insertBefore(p, pN);
el.addEventListener('click', updInv, true);	

init();