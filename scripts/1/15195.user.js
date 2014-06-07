// ==UserScript==

// @name           KoL Easy Select

// @namespace      http://freecog.net/2007/

// @description    Improves the interface for selecting items, changing dropdowns-o-doom into filterable lists.

// @include        http://*kingdomofloathing.com/*

// @exclude        http://forums.kingdomofloathing.com/*

// ==/UserScript==







if (/http:\/\/(www\d*\.)?kingdomofloathing\.com\/.*\.php/i.test(document.location.href)) {

	var selects = document.getElementsByTagName("select");

	if (Array.filter(selects, function(s) {

		return !s.multiple && s.options.length > 10;

	}).map(enhance_select).length) {

		var styles = [

			'div.enhanced-select {',

			'	width: 100%;',

			'	text-align: left;',

			'	border: 1px inset lightgray;',

			'}',

			'div.enhanced-select-filterbar {',

			'	width: 100%;',

			'	-moz-box-sizing: border-box;',

			'	border: 1px solid lightgray;',

			'}',

			'div.enhanced-select-filterbar input {',

			'	width: 100%;',

			'	padding: 2px 4px;',

			'	-moz-box-sizing: border-box;',

			'	border: none !important;',

			'}',

			'div.enhanced-select-scrollpane {',

			'	height: 10em;',

			'	overflow: auto;',

			'	overflow-x: hidden;',

			'	overflow-y: scroll;',

			'	-moz-box-sizing: border-box;',

			'	border: 1px solid lightgray;',

			'}',

			'div.enhanced-select-scrollpane label {',

			'	display: block;',

			'	padding-right: 4px;',

			'}',

			'div.enhanced-select-scrollpane label:hover {',

			'	background-color: lightyellow;',

			'}',

			'div.enhanced-select-scrollpane label span {',

			'	padding-left: .5em;',

			'	color: darkgrey;',

			'}'

		].join("\n");

		GM_addStyle(styles);

	}

}







// Replace a <select> with a filterable list of options.

function enhance_select(select) {

	var cont = document.createElement("div");

	var filterbar = document.createElement("div");

	var filter = document.createElement("input");

	var scrollpane = document.createElement("div");

	cont.appendChild(filterbar);

	filterbar.appendChild(filter);

	cont.appendChild(scrollpane);

	cont.className = "enhanced-select";

	filterbar.className = "enhanced-select-filterbar";

	scrollpane.className = "enhanced-select-scrollpane";

	

	var options = [];

	Array.forEach(select.options, function(o, index) {

		if (!index && /\s*(-+)\s*select\s.*(\1)\s*/.test(o.text)) return;

		

		var quantity = parseInt(o.text.replace(/^.*\((\d+)\)\s*$|.*/, "$1"), 10);

		var text = o.text.replace(/\s+\(\d+\)\s*$/, "");

		

		var label = document.createElement("label");

		var radio = document.createElement("input");

		radio.setAttribute("type", "radio");

		radio.setAttribute("value", o.value);

		radio.setAttribute("name", select.name);

		label.appendChild(radio);

		label.appendChild(document.createTextNode(text));

		if (!isNaN(quantity)) {

			var sp = document.createElement("span");

			sp.appendChild(document.createTextNode(String(quantity)));

			label.appendChild(sp);

		}

		scrollpane.appendChild(label);

		options.push({

			text: text,

			value: o.value,

			box: radio,

			label: label

		});

	});

	

	function apply_filter() {

		var query = false;

		try {

			if (filter.value) query = new RegExp(filter.value, "i");

		} catch(e) {

			query = false;

		}

		var visible_count = 0;

		var last_visible = null;

		options.forEach(function(o) {

			if (!query || query.test(o.text)) {

				o.label.style.display = "block";

				visible_count++;

				last_visible = o;

			} else {

				o.label.style.display = "none";

			}

		});

		if (visible_count === 1) {

			last_visible.box.checked = true;

		}

		token = null;

	}

	

	var token = null;

	function update_filter() {

		if (token !== null) window.clearTimeout(token);

		token = window.setTimeout(apply_filter, 100);

	}

	

	filter.addEventListener('change', update_filter, false);

	filter.addEventListener('keypress', update_filter, false);

	

	select.parentNode.replaceChild(cont, select);

}

