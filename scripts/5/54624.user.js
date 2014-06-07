// ==UserScript==
// @name           Pigskin Empire: Practice Progress Sort
// @namespace      pbr/pps
// @include        http://beta.pigskinempire.com/practiceresult.asp?s=*&t=A
// ==/UserScript==

window.setTimeout( function() {
    main();
}, 100);

function main() {
	var table = document.getElementsByClassName("info")[0];
	
	for (var i=1; i<table.rows.length-1; i++) {
		for (var j=i+1; j<table.rows.length; j++) {
			var left = table.rows[i].cells[1];
			var right = table.rows[j].cells[1];
			if (left == null) continue;
			if (right == null) continue;
			
			if (left.innerHTML >= right.innerHTML) {
				var temp = table.rows[i].innerHTML;
				table.rows[i].innerHTML = table.rows[j].innerHTML;
				table.rows[j].innerHTML = temp;
			}
		}
	}
}

