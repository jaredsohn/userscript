// ==UserScript==
// @name Paysafecard-Eintrager
// @namespace Zort
// @description leichter & schneller Paysafecard-Codes eintragen
// @version	0.1
// @include *customer.cc.at.paysafecard.com/psccustomer/GetWelcomePanelServlet*
// ==/UserScript==


// [Funktion] Code eintragen
function eintrag() {

var code = document.getElementById('eintrag').value;
code = code.replace(/-/g, '');

document.getElementById('mainPagePart:rn1').value = code.slice(0, 4);
document.getElementById('mainPagePart:rn2').value = code.slice(4, 8);
document.getElementById('mainPagePart:rn3').value = code.slice(8, 12);
document.getElementById('mainPagePart:rn4').value = code.slice(12, 16);

}

// Inputs einfügen
var div_15 = document.getElementsByTagName('div')[15];
var div_19 = document.getElementsByTagName('div')[19];
var div_30 = document.getElementsByTagName('div')[30];
div_15.innerHTML = 'PIN: <span class="text"><input id="eintrag" type="text" autocomplete="off" class="text" maxlength="19" size="19" style="text-align:center" /></span>';
div_19.innerHTML = ''; // Info Button löschen ^_^
div_30.innerHTML = '<label>Sicherheits-Check:</label><input id="mainPagePart:rn1" type="hidden" name="mainPagePart:rn1" autocomplete="off" class="text" maxlength="4" onkeyup="return autoTab(this, 4, event);" size="4" style="text-align:center" /><input id="mainPagePart:rn2" type="hidden" name="mainPagePart:rn2" autocomplete="off" class="text" maxlength="4" onkeyup="return autoTab(this, 4, event);" size="4" style="text-align:center" /><input id="mainPagePart:rn3" type="hidden" name="mainPagePart:rn3" autocomplete="off" class="text" maxlength="4" onkeyup="return autoTab(this, 4, event);" size="4" style="text-align:center" /><input id="mainPagePart:rn4" type="hidden" name="mainPagePart:rn4" autocomplete="off" class="text" maxlength="4" onkeyup="return autoTab(this, 4, event);" size="4" style="text-align:center" />';


document.getElementById('mainPagePart:next').addEventListener("mouseover", eintrag, false);
