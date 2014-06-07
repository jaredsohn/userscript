// ==UserScript==
// @name parselegacy
// @description steal d2lp
// @include http://d2lp.com/tools/inscribed/
// @exclude http://example.com/directory/*
// ==/UserScript==

/*if(window.parent == window.self) {
		
	document.addEventListener("DOMContentLoaded", function(){
		document.removeEventListener( "DOMContentLoaded", arguments.callee, false );
		ready();
	}, false);*/
	document.addEventListener("DOMContentLoaded", ready(), false);

	function ready() {
		alert("test");
		var table = document.getElementsByTagName('tbody')[0];
		var tr = table.getElementsByTagName('tr');
		var td;

		var color;
		var color_array = new Array;
		
		for(var i = 1; i < tr.length; i++) {
			td = tr[i].getElementsByTagName('td');
			color = new Object;
			
			color.id	 = td[0].innerHTML;
			color.name		 = td[1].innerHTML;
			color.hero	 = parseInt(td[2].innerHTML);
			
			color_array[i - 1] = color;
		}
		
		alert(JSON.stringify(color_array));
		
	}
//};