// ==UserScript==
// @name           HWM_Battle_Flash_Extender
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/warlog.php?*
// @include        http://www.heroeswm.ru/war.php?*
// ==/UserScript==

var combat = document.getElementById('combat1');
var default_value = combat.childNodes[9].getAttribute('height');

var a_inc = document.createElement('a');
a_inc.innerHTML = "[+]";
a_inc.href = 'javascript: void(0)' ;
a_inc.addEventListener( "click", inc , false );
a_inc.title = "+" ;
a_inc.style.color = "black";

var a_dec = document.createElement('a');
a_dec.innerHTML = "[-]";
a_dec.href = 'javascript: void(0)' ;
a_dec.addEventListener( "click", dec , false );
a_dec.title = "-" ;
a_dec.style.color = "black";

var a_save_1 = document.createElement('a');
a_save_1.innerHTML = "[_1_]";
a_save_1.href = 'javascript: void(0)' ;
a_save_1.addEventListener( "click", save1 , false );
a_save_1.title = "\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432 \u043f\u0435\u0440\u0432\u0443\u044e \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u0443\u044e" ;

var a_load_1 = document.createElement('a');
a_load_1.innerHTML = "[_" + GM_getValue('1', default_value) + "_]";
a_load_1.href = 'javascript: void(0)' ;
a_load_1.addEventListener( "click", load1 , false );
a_load_1.title = "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432 " +  GM_getValue('1', 545);

var a_save_2 = document.createElement('a');
a_save_2.innerHTML = "[_2_]";
a_save_2.href = 'javascript: void(0)' ;
a_save_2.addEventListener( "click", save2 , false );
a_save_2.title = "\u0417\u0430\u043f\u0438\u0441\u0430\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432\u043e \u0432\u0442\u043e\u0440\u0443\u044e \u043f\u0435\u0440\u0435\u043c\u0435\u043d\u043d\u0443\u044e" ;

var a_load_2 = document.createElement('a');
a_load_2.innerHTML = "[_" + GM_getValue('2', default_value)+ "_]";
a_load_2.href = 'javascript: void(0)' ;
a_load_2.addEventListener( "click", load2 , false );
a_load_2.title = "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432 " +  GM_getValue('2', 545);

var a_set_as_default = document.createElement('a');
a_set_as_default.innerHTML = "[_!(" + GM_getValue('default', default_value) + ")_]";
a_set_as_default.href = 'javascript: void(0)' ;
a_set_as_default.addEventListener( "click", as_default , false );
a_set_as_default.title = "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u043a\u0430\u043a \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e";

var check = document.createElement('input');
check.type = "checkbox";
check.defaultChecked = GM_getValue('auto', false);
check.addEventListener( "click", checkChanged , false );
check.title = "\u0410\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u0435\u0441\u043a\u0438 \u0443\u0441\u0442\u0430\u043d\u0430\u0432\u043b\u0438\u0432\u0430\u0442\u044c \u0432 \u043d\u0430\u0447\u0430\u043b\u0435 \u0431\u043e\u044f \u0432\u044b\u0441\u043e\u0442\u0443 \u043f\u043e \u0443\u043c\u043e\u043b\u0447\u0430\u043d\u0438\u044e";

var a_reset = document.createElement('a');
a_reset.innerHTML = "[_" + default_value + "_]";
a_reset.href = 'javascript: void(0)' ;
a_reset.addEventListener( "click", reset , false );
a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');;

var br = document.createElement('br');

combat.parentNode.insertBefore(br, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_reset, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(check, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_set_as_default, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_load_2, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_save_2, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_load_1, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_save_1, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_dec, combat.parentNode.childNodes[0]);
combat.parentNode.insertBefore(a_inc, combat.parentNode.childNodes[0]);

var color = "black";
a_save_1.style.color = color;
a_load_1.style.color = color;
a_save_2.style.color = color;
a_load_2.style.color = color;
a_set_as_default.style.color = color;
a_reset.style.color = color;

if (GM_getValue('auto', false)) {
	combat.childNodes[9].setAttribute('height', GM_getValue('default', default_value));
}


function inc() {
	combat.childNodes[9].setAttribute('height', parseInt(combat.childNodes[9].getAttribute('height')) + 10);
	a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');
}			

function dec() {
	combat.childNodes[9].setAttribute('height', parseInt(combat.childNodes[9].getAttribute('height')) - 10);
	a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');
}

function save1() {
	GM_setValue('1', combat.childNodes[9].getAttribute('height'));
	a_load_1.innerHTML = "[_" + GM_getValue('1', default_value) + "_]";
	a_load_1.title = "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432 " +  GM_getValue('1', 545);
}

function load1() {
	combat.childNodes[9].setAttribute('height', GM_getValue('1', default_value));
	a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');
}

function save2() {
	GM_setValue('2', combat.childNodes[9].getAttribute('height'));
	a_load_2.innerHTML = "[_" + GM_getValue('2', default_value) + "_]";
	a_load_2.title = "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c \u0442\u0435\u043a\u0443\u0449\u0443\u044e \u0432\u044b\u0441\u043e\u0442\u0443 \u0432 " +  GM_getValue('2', 545);
}

function load2() {
	combat.childNodes[9].setAttribute('height', GM_getValue('2', default_value));
	a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');
}

function as_default() {
	GM_setValue('default', combat.childNodes[9].getAttribute('height'));
	a_set_as_default.innerHTML = "[_!(" + GM_getValue('default', default_value) + ")_]";
}

function checkChanged() {
	GM_setValue('auto', !GM_getValue('auto', false));
}

function reset() {
	combat.childNodes[9].setAttribute('height', default_value);
	a_reset.title = "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c \u0432\u044b\u0441\u043e\u0442\u0443 \u0434\u043e \u043e\u0431\u044b\u0447\u043d\u043e\u0433\u043e \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u044f.\n\u0422\u0435\u043a\u0443\u0449\u0435\u0435 \u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0435 = " + combat.childNodes[9].getAttribute('height');
}
