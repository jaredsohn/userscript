// Version 1.1
// ==UserScript==
// @name           Timestamper
// @description    Subs $$t for timestamps when Ctrl-Shift-O is pressed
// @include        *
// ==/UserScript==

var regT = new RegExp("\\$\\$t", "gi");

function format(num){
	var out = num;
	if (num.length == 1){
		out = "0" + num;
	}
	return out;
}

function replaceTokens() {
	var dat = new Date();
	var h = format(dat.getHours());
	var m = format(dat.getMinutes());
	var s = format(dat.getSeconds());
	var ts = h+':'+m+':'+s;
	
	for (var i = 0; i < document.forms.length; i++) {
		var f = document.forms[i];
		//alert(f);
		for (var j = 0; j < f.elements.length; j++) {
			var el = f.elements[j];
			if (el.type == "text" || el.type == "textarea") {
				//alert("value: "+el.value);				
				el.value = el.value.replace(regT, ts);
			}
		}
	}
}

function keyPressed(e) {
	// O
   if( e.ctrlKey && e.shiftKey && e.keyCode == 79 ) 
        replaceTokens();
}

window.addEventListener('keydown', keyPressed, false)

