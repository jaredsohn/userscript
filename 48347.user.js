// ==UserScript==
// @name            Pardus combat rounds order reverse
// @namespace   http://*.pardus.at/
// @author          Yog
// @version         1,0
// @description  It will reverse the order of combat rounds in the drop down menu while fighting with a NPC or Player. 
// @include         http://*.pardus.at/ship2*
// @include         http://*.pardus.at/ship2ship_combat.php*
// ==/UserScript==


var option;
var select;
var rtext;
var rtext2;
select = document.getElementsByTagName('select');
if (select[0].hasAttribute('style')) { option = select[1].getElementsByTagName('option') }
else { option = select[0].getElementsByTagName('option'); }

    for(var i = 0; i < option.length; i++)
	{
	option[i].setAttribute("value", option.length-i);
	}
    for(var i = 0; i < (option.length/2); i++)
	{
	rtext = option[i].textContent;
	rtext2 = option[option.length-1-i].textContent;
	option[option.length-1-i].innerHTML = rtext;
	option[i].innerHTML = rtext2;
	}
	