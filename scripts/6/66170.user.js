// ==UserScript==
// @author		R.B.G
// @name		TROY s20
// @Translation         R.B.G
// @namespace		http://userscripts.org/
// @description		To Alliance TROY Server 20
// @include		http://*.travian.*php*
// @version		1.0
// ==/UserScript==




//Configuration
var links = [
    ['تحـآلـف TROY'     , 'allianz.php'],
    ['هـجـمـآآت تحـآلف TROY'        , 'allianz.php?s=3'],
	['اخبـآر تـحـآلـف TROY'        , 'allianz.php?s=4'],
];

//Code
var menu = document.getElementById('side_info');
if(menu == null) { //Just one village
  menu = document.createElement('div');
  menu.setAttribute('id','sright');
  document.getElementById('lmidall').appendChild(menu);
}
menu.appendChild(document.createElement('br'));

var elemB, elemUL, elemLI, elemA;

/* Links Menu */
elemB  = document.createElement('b');
elemB.appendChild(document.createTextNode('||~ تحـآلـف TROY ~||'));
menu.appendChild(elemB)

elemUL = document.createElement('ul');
elemUL.setAttribute('class','dl');
menu.appendChild(elemUL)

for each ( var link in links ){
    elemLI = document.createElement('li');
    elemLI.setAttribute('class','dl');

    elemA = document.createElement('a');
    elemA.href = link[1];
    elemA.appendChild(document.createTextNode(link[0]));

    elemLI.appendChild(elemA);
    elemUL.appendChild(elemLI);
}