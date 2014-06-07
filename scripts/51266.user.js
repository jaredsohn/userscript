// ==UserScript==
// @name           Deposit and Withdrawal All
// @namespace      Chicken
// @include        http://gunzrpg.com/index.php
// ==/UserScript==

function all(choice) {

	var possiableCash = getElementsByClass("txtR");
	var cash = possiableCash[2].innerHTML;
	var bank = possiableCash[3].innerHTML;
	
	cash = removeSpaces(cash);
	bank = removeSpaces(bank);
	
	if(choice == 0)
		document.getElementsByName("deposit")[0].value = cash;
	else 
		document.getElementsByName("withdrawal")[0].value = bank;
	
	function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
	}
	
	function removeSpaces(string) {
		return string.split(' ').join('');
	}

}




//add the buttons and script to deposit/withdrawal
var head, script;
head = document.getElementsByTagName('head')[0];
if (!head) { return; }
script = document.createElement('script');
script.type = 'text/javascript';
script.innerHTML = all;
head.appendChild(script);


var a = document.createElement('a');
a.setAttribute('href', 'javascript:void(0);');
a.setAttribute('onClick', 'all(0);');
a.setAttribute('id', 'gMButton');
a.setAttribute('style', 'color:#FFF; background:#000; font:12px arial; position:fixed; bottom:0; left:0; padding:3px; z-index: 99999;');
a.textContent = 'Deposit All';
document.body.insertBefore(a, document.body.firstChild);

a = document.createElement('a');
a.setAttribute('href', 'javascript:void(0);');
a.setAttribute('onClick', 'all(1);');
a.setAttribute('id', 'gMButton');
a.setAttribute('style', 'color:#FFF; background:#000; font:12px arial; position:fixed; bottom:0; right:0; padding:3px; z-index: 99999;');
a.textContent = 'Withdrawal All';
document.body.insertBefore(a, document.body.firstChild);