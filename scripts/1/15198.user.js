// ==UserScript==
// @name           Better Network Usage Monitor
// @namespace      http://freecog.net/2007/
// @description    Lets you the MAC addresses on the Rose-Hulman network usage monitor page to human-readable names (double-click on a hostname to change it).  Also displays bar graphs of network usage by MAC address.
// @include        http://www.rose-hulman.edu/TSC/tools/network_usage_tool/
// @include        https://www.rose-hulman.edu/TSC/tools/network_usage_tool/
// ==/UserScript==

// Redirect to the secure page.  (Of course, if the script gets a 
// chance to do this you've already authenticated on the insecure one,
// but this is better than nothing.)
if (document.location.href.match(/^http:/i)) {
	document.location.href = 'https://www.rose-hulman.edu/TSC/tools/network_usage_tool/';
}

// MAC addresses -> to HTML fragments.
var map = eval(GM_getValue("map", "({})"));
// MAC addresses -> nodes that display that MAC address's text
var node_map = {};

// MAC addresses -> bar styles
var color_map = {};
// [font_color, background] (CSS appropriate strings)
var colors = [
	["white", "darkred"],
	["white", "darkgreen"],
	["white", "darkblue"],
	["white", "darkgray"],
	["white", "purple"],
	["white", "goldenrod"],
	["white", "black"],
];

function color_for_mac(mac) {
	if (mac in color_map) return color_map[mac];
	var color = colors.shift();
	color_map[mac] = color;
	return color;
}

Array.forEach(document.getElementsByTagName("table"), function(table) {
	if (table.className === "data") {
		var bar_chart = document.createElement("div");
		var rows = table.getElementsByTagName("tr");
		Array.slice(rows, 1, -1).forEach(function(row) {
			var cells = row.getElementsByTagName("td");
			var cell = cells[0];
			var bar = document.createElement("div");
			var key = cell.textContent;
			
			cell.title = bar.title = key;
			if (key in map) {
				cell.innerHTML = map[key];
				bar.innerHTML = map[key];
			}
			
			var color = color_for_mac(key);
			bar.style.color = color[0];
			bar.style.background = color[1];
			var portion = parseFloat(cells[2].textContent.replace(/[^\d\.]+g/, ''), 10);
			bar.style.width = portion * .99 + '%'; // Scale down a bit so floats don't bump
			
			cell.addEventListener("dblclick", function(e) {
				show_input(key, cell);
			}, false);
			
			if (key in node_map) node_map[key].push(cell);
			else node_map[key] = [cell];
			
			node_map[key].push(bar);
			bar_chart.appendChild(bar);
		});
		
		bar_chart.className = "bar-chart";
		table.parentNode.appendChild(bar_chart);
	}
});



function show_input(key, cell) {
	var old_value = (key in map) ? map[key] : key;
	
	cell.innerHTML = [
		'<form action="about:blank" class="rename-form" title="">',
		'<input type="text">',
		'<div>',
		' <input type="submit" value="&#x2714;" title="Save">',
		' <input type="button" value="&#x2718;" title="Cancel">',
		'</div>',
		'</form>'
	].join('');
	
	var inputs = cell.getElementsByTagName("input");
	var form = cell.firstChild;
	
	inputs[0].value = old_value;
	
	form.addEventListener("dblclick", function(e) {
		// Don't overwrite this form on double-click
		e.stopPropagation();
	}, false);
	
	form.addEventListener("submit", function(e) {
		end(inputs[0].value);
		e.stopPropagation();
		e.preventDefault();
	}, false);
	
	inputs[2].addEventListener("DOMActivate", function(e) {
		end(null);
	}, false);
	
	function end(new_value) {
		if (new_value && new_value !== old_value) {
			node_map[key].forEach(function(c) {
				c.innerHTML = new_value;
			});
			
			map[key] = new_value;
			GM_setValue("map", uneval(map));
		} else {
			// Clear out the UI
			cell.innerHTML = old_value;
		}
	}
}

var darkred = 'data:image/png;base64,' + 
		'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyAQMAAAAk8RryAAAA' + 
		'A1BMVEWqAABzleVsAAAAAXRSTlOzEo46UAAAAA5JREFUGJVj' + 
		'YBgFgwkAAAGQAAHY85U/AAAAAElFTkSuQmCC';


// Automatic reload functionality
var load_time = new Date().getTime();

window.addEventListener('load', function() {
	var content = document.getElementById("content");
	var label = document.createElement("label");
	label.setAttribute("id", "auto-reload");
	label.innerHTML = '<input type="checkbox">\xa0Reload\xa0after\xa05\xa0minutes';
	content.insertBefore(label, content.firstChild);
	label.firstChild.checked = GM_getValue("reload", true);

	label.firstChild.addEventListener("change", function(e) {
		load_time = new Date().getTime();
		GM_setValue("reload", e.target.checked);
	}, false);
}, false);

var interval = window.setInterval(function() {
	if (new Date().getTime() > (load_time + 1000 * 60 * 5)) {
		window.location.reload();
		window.clearInterval(interval);
	}
}, 1000);


GM_addStyle([
	'h3 { margin: 10px 0 20px 0; clear: left; }',
	'.rename-form { display: block; position: relative; width: 100%; }',
	'.rename-form div { position: absolute; left: -.7em; top: -.8em;',
		'bottom: -.8em; white-space: pre; z-index: 1;',
		'padding: .4em .4em .4em 100%; background: url(', darkred, '); }',
	'.rename-form input[type="text"] { font: inherit; display: block;',
		'width: 100%; padding: 0; border: none; left: -2px;',
		'position: relative; z-index: 2; padding-left: 2px;',
		'color: white; background: transparent; }',
	'.rename-form input[type="submit"] { margin-left: .7em; }',
	'.rename-form input[type="reset"] { margin-left: .4em; }',
	'.bar-chart { width: 90%; margin: 0 auto 1em auto; height: 1.5em; ',
		'font-size: 12px; }',
	'.bar-chart > div { float: left; overflow: hidden; height: 1.5em;',
		'line-height: 1.5em; }',
	'#auto-reload { float: right; margin-right: 20px; }',
].join('\n'));
