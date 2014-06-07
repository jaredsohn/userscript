// ==UserScript==
// @name           HWM_Opera_Battle_Flash_Ext
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/war.php?*
// @include        http://www.heroeswm.ru/warlog.php?*
// ==/UserScript==

var combat = document.getElementById('combat2');
var default_value = combat.childNodes[11].getAttribute('height');

var my_saved_height = 750;


var a_inc = document.createElement('a');
a_inc.innerHTML = " [+] ";
a_inc.href = 'javascript: void(0)' ;
a_inc.addEventListener( "click", inc , false );
a_inc.title = "\u0443\u0432\u0435\u043B\u0438\u0447\u0438\u0442\u044C" ;
a_inc.style.color = "black";
a_inc.style.fontWeight = "bold";

var a_dec = document.createElement('a');
a_dec.innerHTML = " [-] ";
a_dec.href = 'javascript: void(0)' ;
a_dec.addEventListener( "click", dec , false );
a_dec.title = "\u0443\u043C\u0435\u043D\u044C\u0448\u0438\u0442\u044C" ;
a_dec.style.color = "black";
a_dec.style.fontWeight = "bold";

var a_save_1 = document.createElement('a');
a_save_1.innerHTML = my_saved_height;
a_save_1.href = 'javascript: void(0)' ;
a_save_1.title = "current height";
a_save_1.style.color = "black";
a_save_1.style.fontWeight = "bold";

var br = document.createElement('br');

combat.parentNode.insertBefore(br, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_save_1, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_dec, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_inc, combat.parentNode.childNodes[0]);



// set my saved height
combat.childNodes[11].setAttribute('height', my_saved_height);

function inc() {
	var h = parseInt(combat.childNodes[11].getAttribute('height')) + 10;
	combat.childNodes[11].setAttribute('height', h);
	a_save_1.innerHTML = h;
}			

function dec() {
	var h = parseInt(combat.childNodes[11].getAttribute('height')) - 10;
	combat.childNodes[11].setAttribute('height', h);
	a_save_1.innerHTML = h;
}



// ========== END ===


