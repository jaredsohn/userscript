// ==UserScript==
// @name           world-war helper
// @namespace      Oliver
// @include        http://wwar.storm8.com/*
// ==/UserScript==


/*
 *  Set this value to your country's number
 *  1 = Germany
 *  2 = UK
 *  3 = USA
 *  4 = China
 *  5 = That other country
 */
var sanctionCountry = 5;

// Don't edit anything var below this line
//----------------------------------------

/* for compatibility with Google Chrome */
/* http://devign.me/greasemonkey-gm_getvaluegm_setvalue-functions-for-google-chrome/ */
if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
	this.GM_getValue=function (key,def) {
		return localStorage[key] || def;
	};
	this.GM_setValue=function (key,value) {
		return localStorage[key]=value;
	};
	this.GM_deleteValue=function (key) {
		return delete localStorage[key];
	};

// create navigation menu
var menu = document.createElement('div');
menu.setAttribute("id","wwfixermenu");
var bchecked = "";

if (addcash)
	schecked = " checked";
menu.innerHTML = "\
<input type=\"checkbox\" id=\"autobank\" "+bchecked+" />Addcash<br>\
}

var addcash        =GM_getValue("cashCurrent",false);  

}

// addcash
function addCash()
{
	var cfield = document.getElementById('cashCurrent');
	var cashcurrent = 0);
	if (cfield.getElementsByTagName('a').length > 0)
		return parseInt(cfield.getElementsByTagName('a')[0].innerHTML.replace(/,/g,''));
	else
		return parseInt(cfield.innerHTML.replace(/,/g,''));

}


setinterval(addcash, 1000);