// ==UserScript==
// @name           Neopets : Shops : Advanced Auto Haggler
// @namespace      http://www.gamingire.com/
// @description    Choose between 3 choices of auto hagglers
// @include        http://www.neopets.com/objects.phtml?type=shop*
// ==/UserScript==
if(location.href.match('type=shop'))
{
var layout = '<hr><b>Advanced Auto Haggler - By Backslash</b><hr><input type="radio" name="group1" value="one"> 12345 to 12345<br>\
<input type="radio" name="group1" value="two"> 12345 to 12222<br>\
<input type="radio" name="group1" value="three" checked> 12345 to 12121<hr>';
document.body.innerHTML = document.body.innerHTML.replace('Neopian Inflation is currently at',layout+'<br><br>Neopian Inflation is currently at');

if (GM_getValue('haggleMode') == "one")
{
document.getElementsByName('group1')[0].checked = true;
}
if (GM_getValue('haggleMode') == "two")
{
document.getElementsByName('group1')[1].checked = true;
}
if (GM_getValue('haggleMode') == "three")
{
document.getElementsByName('group1')[2].checked = true;
}
document.getElementsByName('group1')[0].addEventListener('change', function(){getCheckedValue(document.getElementsByName('group1'))}, false);
document.getElementsByName('group1')[1].addEventListener('change', function(){getCheckedValue(document.getElementsByName('group1'))}, false);
document.getElementsByName('group1')[2].addEventListener('change', function(){getCheckedValue(document.getElementsByName('group1'))}, false);
}
// return the value of the radio button that is checked
// return an empty string if none are checked, or
// there are no radio buttons
function getCheckedValue(radioObj) {
	if(!radioObj)
		return "";
	var radioLength = radioObj.length;
	if(radioLength == undefined)
		if(radioObj.checked)
			return radioObj.value;
		else
			return "";
	for(var i = 0; i < radioLength; i++) {
		if(radioObj[i].checked) {
			GM_setValue('haggleMode', radioObj[i].value);
		}
	}
	return "";
}

if(location.href.match('obj_info_id='))
{
if (GM_getValue('haggleMode') == "one")
{
autoHaggle1();
}
if (GM_getValue('haggleMode') == "two")
{
autoHaggle2();
}
if (GM_getValue('haggleMode') == "three")
{
autoHaggle3();
}
}


function autoHaggle1() //12345 to 12345
{
if(document.body.innerHTML.match('I wont take less than'))
{
var price = getBetween(document.body.innerHTML, "I wont take less than ", " Neopoints for it.");
price = price.replace(/,/g,'');
}

if(document.body.innerHTML.match('I want at least'))
{
var price = getBetween(document.body.innerHTML, "I want at least ", " Neopoints for this great item");
price = price.replace(/,/g,'');
}
document.getElementsByName('current_offer')[0].value = price;
}

function autoHaggle2() //12345 to 12222
{
if(document.body.innerHTML.match('I wont take less than'))
{
var price = getBetween(document.body.innerHTML, "I wont take less than ", " Neopoints for it.");
price = price.replace(/,/g,'');
}

if(document.body.innerHTML.match('I want at least'))
{
var price = getBetween(document.body.innerHTML, "I want at least ", " Neopoints for this great item");
price = price.replace(/,/g,'');
}

var haggle_price = [];
haggle_price.push(price[0]);
for (i=0;i<price.length-1;i++)
{
haggle_price.push(price[1]);
}
document.getElementsByName('current_offer')[0].value = haggle_price.join('');
}


function autoHaggle3() //12345 to 12121
{
if(document.body.innerHTML.match('I wont take less than'))
{
var price = getBetween(document.body.innerHTML, "I wont take less than ", " Neopoints for it.");
price = price.replace(/,/g,'');
}

if(document.body.innerHTML.match('I want at least'))
{
var price = getBetween(document.body.innerHTML, "I want at least ", " Neopoints for this great item");
price = price.replace(/,/g,'');
}

var haggle_price = [];
for (i=0;i<price.length;i++)
{
haggle_price.push(price[0]);
haggle_price.push(price[1]);
}
haggle_price.splice(price.length,10);
var final_price = haggle_price.join('');
document.getElementsByName('current_offer')[0].value = final_price;
}


function getBetween(zStr, zStart, zEnd, zPos) {
    var z1 = zStr.indexOf(zStart, (zPos === undefined ? 0 : zPos)); var z2 = zStr.indexOf(zEnd, z1);
    return z2 > z1 && z1 > -1 ? zStr.substring(z1 + zStart.length, z2) : '';
}
