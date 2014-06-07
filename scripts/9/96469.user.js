// ==UserScript==
// @name           Glowslinging hotkey script
// @namespace      Conster
// @description    Use 1-5 to select an attack, 1-5 or f to begin a fight or duel again
// @include        http://*animecubed.com/billy/bvs/billycon-glowslingfight.html
// @include        http://*animecubed.com/billy/bvs/billycon-glowslinging.html
// @include        http://*animecubed.com/billy/bvs/billycon-register.html
// ==/UserScript==

function process_event(event) {
	if (event.keyCode>=49 && event.keyCode<=53) {		//1-5
		if (document.forms.namedItem( "startsling2" ) ) {
			document.forms.namedItem("startsling2").submit();
		} else if (document.forms.namedItem( "slingact" ) ) {
			var pickthis = event.keyCode-49;
			var str = "//input [@id='gslact"+pickthis+"']";
			var v = document.evaluate(str, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			v.snapshotItem(0).checked = true;
			document.forms.namedItem("slingact").submit();
		} else if (document.forms.namedItem( "goslinag" ) ) {
			document.forms.namedItem("goslinag").submit();
		} else if (document.forms.namedItem( "gosling" ) ) {
			document.forms.namedItem("gosling").submit();
		} else if (document.forms.namedItem( "glowsling" ) ) {
			document.forms.namedItem("glowsling").submit();
		}
	} else if (event.keyCode==70) {	//f
		if (document.forms.namedItem( "startsling2" ) ) {
			document.forms.namedItem("startsling2").submit();
		} else if (document.forms.namedItem( "slingact" ) ) {
			document.forms.namedItem("slingact").submit();
		} else if (document.forms.namedItem( "goslinag" ) ) {
			document.forms.namedItem("goslinag").submit();
		} else if (document.forms.namedItem( "gosling" ) ) {
			document.forms.namedItem("gosling").submit();
		} else if (document.forms.namedItem( "glowsling" ) ) {
			document.forms.namedItem("glowsling").submit();
		}
	}
}

window.addEventListener("keyup", process_event, false);