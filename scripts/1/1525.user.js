// ==UserScript==
// @name          Auto Save Forms
// @description	  Saves form data every few seconds and gives option of repopulating form later.
// ==/UserScript==



(function() {

	var d = document;
	var i = d.getElementsByTagName('input'); // inputs
	var t = d.getElementsByTagName('textarea'); // textareas
	var f = d.getElementsByTagName('form'); // textareas

	// Strip i down to just text inputs
	var newi = new Array();
	for (j=0;j<i.length;j++) {
		if (i[j].type == 'text') {
			newi.push(i[j]);
		}
	}
	i = newi;

	var box; // Box for offer to repopulate
	var boxtext; // Text for offer to repopulate
	var j;
	var e = new Array();
	var eo;
	var saving;

	function start() {
		for (j = 0; j < f.length; j++) {
			f[j].addEventListener("submit", clear, false);
		}
		for (j = 0; j < i.length; j++) {
			i[j].addEventListener("keyup", prepsave, false);
		}
		for (j = 0; j < t.length; j++) {
			t[j].addEventListener("keyup", prepsave, false);
		}
		offer_repopulate();
	}

	function clear() {
		var today = new Date();
		var expiry = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000); // In the past to expire cookie
		d.cookie = "FormsSavedData=; expires=" + expiry.toGMTString() + "; path=/";
	}

	function getCookie(name) {
		var re = new RegExp(name + "=([^;]+)");
		var value = re.exec(d.cookie);
		return (value != null) ? unescape(value[1]) : false;
	}

	function setCookie(name, value) {
		var today = new Date();
		var expiry = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000); // Expires after a month

		d.cookie = name + "=" + escape(value) + "; expires=" + expiry.toGMTString() + "; path=/";
	}

	function prepsave() {
		clearInterval(saving);
		saving = setInterval(savedata, 500);
	}

	function savedata() {
		e = new Array();
		for (j=0;j<i.length;j++) {
			e.push(i[j].value.toString());
		}
		for (j=0;j<t.length;j++) {
			e.push(t[j].value.toString());
		}
		setCookie('FormsSavedData', e.join("|"));
		clearInterval(saving);
	}

	function repopulate() {
		eo = getCookie('FormsSavedData').split("|");
		for (j=0;j<i.length;j++) {
			i[j].value = eo.shift();
		}
		for (j = 0; j < t.length; j++) {
			t[j].value = eo.shift();
		}
	}

	function offer_repopulate() {
		if (getCookie('FormsSavedData')) {
			// Cookie found. Write offer to repopulate to page.
			box = d.createElement("div");
			box.setAttribute("style", 
                               "cursor: pointer; " +
                               "position: absolute; " +
                               "top: 20px; " +
                               "right: 20px; " +
                               "background-color: #fee; " +
                               "color: #f00; " +
                               "border: 1px dotted #f00; " +
                               "padding: 3px 8px;");
			d.body.appendChild(box);
			box.addEventListener("click", repopulate, false);

			boxtext = d.createTextNode('Repopulate Form');
			box.appendChild(boxtext);
		}
	}
	
	window.addEventListener("load", start, false);

})();