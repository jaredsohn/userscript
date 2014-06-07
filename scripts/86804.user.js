// ==UserScript==
// @name           mdash
// @namespace      http://goodsoft.lv/
// @description    Replace "-- " with "— "
// @include        *
// ==/UserScript==

function convert () {
	var pos = 0;
	
	if (document.selection) {
		var sel = document.selection.createRange();
		sel.moveStart('character', this.value.length);
		pos = sel.text.length;
	}
	else if (this.selectionStart || this.selectionStart == '0')
		pos = this.selectionStart;
	
	var done = false;
	if (pos >= 4 && this.value.substr(pos - 4, 4) == '--- ') {
		this.value = this.value.substr(0, pos - 4) + '– ' + this.value.substr(pos);
		pos -= 2;
		done = true;
	}
	else if (pos >= 3 && this.value.substr(pos - 3, 3) == '-- ') {
		this.value = this.value.substr(0, pos - 3) + '— ' + this.value.substr(pos);
		pos -= 1;
		done = true;
	}
	
	if (done) {
		if (this.setSelectionRange) {
			this.setSelectionRange(pos, pos);
		}
		else if (this.createTextRange) {
			var range = this.createTextRange();
			range.collapse(true);
			range.moveEnd('character', pos);
			range.moveStart('character', pos);
			range.select();
		}
	}
}

var inputs = document.getElementsByTagName("input");
for (var i = 0, l = inputs.length; i < l; i++) {
	var box = inputs[i];
	if (box.type == "text")
		box.addEventListener('keyup', convert, false);
}

var inputs = document.getElementsByTagName("textarea");
for (var i = 0, l = inputs.length; i < l; i++) {
	var box = inputs[i];
	box.addEventListener('keyup', convert, false);
}


