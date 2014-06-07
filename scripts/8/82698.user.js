// ==UserScript==
// @name           BvS Scratchies Thingie
// @namespace      Conster
// @description    Automates Scratchies to using '1' or '2'
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html

// @include        http://animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

function process_event(event) {
	if ( event.keyCode == 49 ){		//1
		quickcheck('cb0', 'cb6', 'cb14', 'cby0');
		moveOn();
	} else if ( event.keyCode == 50) {		//2
		quickcheck('cb11', 'cb12', 'cb19', 'cby4');
		moveOn();
	}
}

function moveOn() {
	var ST = document.evaluate("//input[@name='superticket' and @value='go']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue
	if(ST != null) {
		ST.wrappedJSObject.checked = true;
	}
	if (document.forms.namedItem("scratch") != null) {
		document.forms.namedItem("scratch").wrappedJSObject.submit();
	} else if (document.forms.namedItem("mainform2") != null) {
		document.forms.namedItem("mainform2").wrappedJSObject.submit();
	}
}

function quickcheck (field1,field2,field3,field4) {
	for (i = 0; i< 20; i++) {
		fieldname='cb'+i;
		if (document.getElementById(fieldname) != null) {
			document.getElementById(fieldname).checked = false;
		}
	}
	for (i = 0; i < 5; i++) {
		fieldname='cby'+i;
		if (document.getElementById(fieldname) != null) {
			document.getElementById(fieldname).checked = false;
		}
	}

	if (document.getElementById(field1) != null) {
		document.getElementById(field1).checked = true;
	}
	if (document.getElementById(field2) != null) {
		document.getElementById(field2).checked = true;
	}
	if (document.getElementById(field3) != null) {
		document.getElementById(field3).checked = true;
	}
	if (document.getElementById(field4) != null) {
		document.getElementById(field4).checked = true;
	}
}

document.documentElement.addEventListener("keyup", process_event, true);