// ==UserScript==
// @name           isnoop.net Comic Strip Snagger UI Enhancer
// @namespace      http://freecog.net/2007/
// @description    Changes the select box to a bunch of checkboxes and remembers which ones are checked, making it easy to change your subscription.
// @include        http://isnoop.net/comics/
// ==/UserScript==

var select = document.getElementsByName("comics[]")[0];

if (select) {
	var selected = eval("(" + GM_getValue("comics", "[]") + ")");
	var selected_map = {}; // Hash table for quick lookup
	selected.forEach(function(s) { selected_map[s] = true; });
	
	var container = document.createElement("div");
	container.id = "checkbox-container";
	var boxes = Array.map(select.options, function(option) {
		var label = document.createElement("label");
		var checkbox = document.createElement("input");
		checkbox.name = select.name;
		checkbox.type = "checkbox";
		checkbox.value = option.value;
		if (option.selected || option.value in selected_map)
			checkbox.checked = true;
		label.appendChild(checkbox);
		label.appendChild(document.createTextNode(" " + option.textContent));
		container.appendChild(label);
		return checkbox;
	});
	select.parentNode.replaceChild(container, select);

	// Save selected comics
	document.getElementsByName("formicate")[0].addEventListener("submit", function() {
		var checked = boxes.filter(function(b) { 
			return b.checked;
		}).map(function(b) {
			return b.value;
		});
		GM_setValue("comics", uneval(checked));
	}, false);
	
	GM_addStyle([
		"#checkbox-container {",
			"margin-bottom: 20px",
		"}",
		"#checkbox-container label {",
			"display: block;",
		"}",
		"input[type='submit'] {",
			"position: fixed;",
			"bottom: 40px;",
			"right: 40px;",
		"}"
	].join(""));
}

