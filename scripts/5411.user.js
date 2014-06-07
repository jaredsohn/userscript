// ==UserScript==
// @name          Measure and warn when Viewstate is too large
// @namespace     http://outsystems.com/userscripts
// @description	  Shows the viewstate size
// @include       *.aspx*
// ==/UserScript==


(function() {
var i=document.getElementsByTagName('input');
for (var j=0; j<i.length; j++) {
	if ('hidden'==i[j].type) {
		if( (i[j].name=='__VIEWSTATE' || i[j].name=='__OSVSTATE') && i[j].value.length > 0) {
			document.title += " (Viewstate: " + Math.round(i[j].value.length/1024) + "k)";
			if( i[j].value.length > 102400) alert( "Viewstate is too large (" + Math.round(i[j].value.length/1024) + "k)");

		}
	}
}
})();
