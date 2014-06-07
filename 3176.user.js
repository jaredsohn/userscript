// ==UserScript==
// @name          Yahoo! Mail Easy Checker
// @namespace     http://badsegue.org/
// @description	  Select a message by clicking on the row, instead of just the checkbox
// @include       http://*mail.yahoo.com/ym/ShowFolder?*
// ==/UserScript==
//
// Yahoo! Mail Easy Checker from http://badsegue.org
//
// This is a simple script to make it easier to select messages
//

(function(){

var dt=document.getElementById('datatable');

function clickspan(t) {

	var f = 1000; var l = 0; var c = 0;
	var ii = dt.getElementsByTagName('input');
	// find the checked item and the closest above and below
	for (i = 0; i < ii.length; i++) {	
		// is this the target one?	
		if (t.id == ii[i].id) { c = i; };
		// is the the last one before the target?
		if (c == 0 && ii[i].checked) { f = i; };
		// is the the first one after the target?
		if (c > 0  && i > c && ii[i].checked) { l = i; break; };
	}
	if (f < c) { for (i = f+1; i < c; i++) { ii[i].click(); } }
	else if ( c < l ) { for (i = c + 1; i < l; i++) { ii[i].click(); } }
}


function rowclicked (e) {
	if (!e) e = window.event;
	var t= this.getElementsByTagName('input')[0];
	if (e.shiftKey) { clickspan(t);	}
	t.click();		
}

// add event handlers for the row and for the checkbox
if (dt) d = dt.getElementsByTagName('tr');
for(var i=0;i<d.length;i++){
	if( d[i].className.match('msg') ){
    		d[i].addEventListener('mousedown', rowclicked, false);
	    	d[i].getElementsByTagName('input')[0].addEventListener('mousedown', function () { this.click() }, false);
    	}    
}  

}
)()
