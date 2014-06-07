// ==UserScript==
// @name           Osadnici
// @namespace      Osadnici
// @include        http://osadnici.happz.cz/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('div.drevo { background-color: #228B22; border: solid 1px black; margin: 1px; width: 8px; height: 12px; display: inline-block;');
addGlobalStyle('div.hlina { background-color: #A52A2A; border: solid 1px black; margin: 1px; width: 8px; height: 12px; display: inline-block;');
addGlobalStyle('div.ovce  { background-color: #7CFC00; border: solid 1px black; margin: 1px; width: 8px; height: 12px; display: inline-block;');
addGlobalStyle('div.obili { background-color: #EEEE00; border: solid 1px black; margin: 1px; width: 8px; height: 12px; display: inline-block;');
addGlobalStyle('div.kamen { background-color: #BEBEBE; border: solid 1px black; margin: 1px; width: 8px; height: 12px; display: inline-block;');

function getElementsByClass(searchClass,node,tag) {
  var classElements = new Array();
  if (node == null)
    node = document;
  if (tag == null)
    tag = '*';
  var els = node.getElementsByTagName(tag);
  var elsLen = els.length;
  var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
  for (i = 0, j = 0; i < elsLen; i++) {
    if (pattern.test(els[i].className) ) {
      classElements[j] = els[i];
      j++;
    }
  }
  return classElements;
}


var najdiZacatek = getElementsByClass('current_player');

if(najdiZacatek[0]){
	var prvniSpan = najdiZacatek[0].getElementsByTagName('table');
	var prvniTbody = prvniSpan[0].getElementsByTagName('td');

	//prvniTbody[5].style.backgroundColor = 'forestgreen';
	//prvniTbody[5].style.color = 'white';
	//prvniTbody[6].style.backgroundColor = 'forestgreen';
	//prvniTbody[6].style.color = 'white';

	var pocetDrevo = prvniTbody[6].innerHTML;
	var DrevoString = '';
	for(var i=0;i<pocetDrevo;i++){ DrevoString += '<div class="drevo"></div>'; }
	prvniTbody[6].innerHTML = DrevoString;

	//prvniTbody[7].style.backgroundColor = 'brown';
	//prvniTbody[7].style.color = 'white';
	//prvniTbody[8].style.backgroundColor = 'brown';
	//prvniTbody[8].style.color = 'white';

	var pocetHlina = prvniTbody[8].innerHTML;
	var hlinaString = '';
	for(var i=0;i<pocetHlina;i++){ hlinaString += '<div class="hlina"></div>'; }
	prvniTbody[8].innerHTML = hlinaString;

	//prvniTbody[9].style.backgroundColor = 'lawngreen';
	//prvniTbody[9].style.color = 'black';
	//prvniTbody[10].style.backgroundColor = 'lawngreen';
	//prvniTbody[10].style.color = 'black';

	var pocetOvce = prvniTbody[10].innerHTML;
	var ovceString = '';
	for(var i=0;i<pocetOvce;i++){ ovceString += '<div class="ovce"></div>';}
	prvniTbody[10].innerHTML = ovceString;

	//prvniTbody[11].style.backgroundColor = '#eeee00';
	//prvniTbody[11].style.color = 'black';
	//prvniTbody[12].style.backgroundColor = '#eeee00';
	//prvniTbody[12].style.color = 'black';

	var pocetObili = prvniTbody[12].innerHTML;
	var obiliString = '';
	for(var i=0;i<pocetObili;i++){ obiliString += '<div class="obili"></div>';}
	prvniTbody[12].innerHTML = obiliString;

	//prvniTbody[13].style.backgroundColor = 'gray';
	//prvniTbody[13].style.color = 'white';
	//prvniTbody[14].style.backgroundColor = 'gray';
	//prvniTbody[14].style.color = 'white';

	var pocetKamen = prvniTbody[14].innerHTML;
	var kamenString = '';
	for(var i=0;i<pocetKamen;i++){ kamenString += '<div class="kamen"></div>';}
	prvniTbody[14].innerHTML = kamenString;

	if(prvniTbody[4].innerHTML > 7) {
	prvniTbody[3].style.backgroundColor = 'red';
	prvniTbody[3].style.color = 'white';
	prvniTbody[3].style.fontSize = '16px';
	prvniTbody[4].style.backgroundColor = 'red';
	prvniTbody[4].style.color = 'white';
	prvniTbody[4].style.fontSize = '16px';
	}
}