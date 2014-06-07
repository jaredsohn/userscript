// ==UserScript==
// @name           highlighter
// @namespace      http://userscripts.org/users/33073/scripts
// @description    changes the highlight mode for nopaste.voric.com
// @include        http://nopaste.voric.com/paste.php*
// ==/UserScript==

// Common functions

/*
 * $(id) => returns DOM element with given id, or else null
 */

function $(id) {
	return document.getElementById(id) ? document.getElementById(id) : null;
}


/*
 * String.trim() => filters whitespace from beginning and end of String
 */

String.prototype.trim = function() {
	return this.replace(/^\s+/g, "").replace(/\s+$/g, "");
}


/*
 * change(value) => will send a POST XMLHttpRequest with the given value and update
 *					the highlighted code according to sent value
 */

function change(value) {
	GM_xmlhttpRequest({
		method: "post",
		url: "http://nopaste.voric.com/format.php",
		headers: { "Content-type" : "application/x-www-form-urlencoded" },
		data: encodeURI("highlight="+$("highlight").value+"&text="+$("code").textContent.trim()),
		onload: function(e) {
			// load the response text
			$("code").innerHTML = e.responseText.trim();
			// reset the cursor to default
			$("code").style.cursor = $("highlight").style.cursor = "auto";
		}
	});
}




/*
 * Script start
 */

// Create the [ Change ] link

var span = document.createElement("span");
	span.innerHTML = "[ <a href=\"#\" id=\"changer\">Change<\/a> ]";
	span.id = "changespan";
$("info").appendChild(span);


// Create the <select> element when the #changer link is clicked

var link = $("changespan").childNodes[1];
link.addEventListener("click", function() {
	var select = document.createElement("select");
		select.id = "highlight";
		select.name = "highlight";
		select.style.fontSize = "11px";
	$("info").appendChild(select);


// Init event on change of value

	select.addEventListener("change", function() {
		// test the selected value (can't be 0)
		if (this.value != "0") {
			// show a little progress meter
			this.style.cursor = $("code").style.cursor = "wait";
			change(this.value);
			// update the "Syntax Highlighting" information
			$("highlightmode").innerHTML = this.childNodes[this.value].innerHTML;
			// set the options back to --Select--
			this.selectedIndex = "0";
		}
	}, false);


// Available modes

	var options = new Array("0", "1", "2", "3", "4", "5");
	var names = new Array("--Select--", "Plain Text", "PHP", "Java", "MySQL", "JavaScript");


// Create <option> elements for each mode

	for (var x=0; x<names.length; x++) {
		var option = document.createElement("option");
		option.value = options[x];
		option.innerHTML = names[x];
		select.appendChild(option);
	}


// Remove the [ Change ] link

	this.parentNode.parentNode.removeChild(this.parentNode);
}, false);