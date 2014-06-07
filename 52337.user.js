// ==UserScript==
// @name           SSW Mostest Society Info
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Lists society info on the Mostest page.
// @include        http://www.secretsocietywars.com/index.php?p=records&a=the_mostest*
// @include        http://www.secretsocietywars.com/index.php?p=records&a=view_player*
// @include        http://www.secretsocietywars.com/index.php
// @include        http://www.secretsocietywars.com/
// ==/UserScript==

var re;
var societies = eval(GM_getValue("societies", "({})"));
var forced = eval(GM_getValue("forced", "({})"));
var dates = eval(GM_getValue("dates", "({})"));
var today = get_date();
var unknowns = new Object();

if(re = /a=view_player&id=(\d+)/.exec(document.location.href)) {
	get_player_society(re[1]);
} else if(document.location.href.indexOf("the_mostest") > -1) {
	var totals;
	var cell;
	var sections = ["Top DoppelPet Collections:", "Enemy Drones Killed (this Cycle):", "Wealthiest Players:"];
	for(var secnum = 0; secnum < sections.length; secnum++) {
		cell = document.evaluate('//text()[.="'+sections[ secnum ]+'"]/ancestor::td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if(cell) {
			totals = show_player_societies('//td[@class="main"]//text()[.="'+sections[ secnum ]+'"]/ancestor::tr[1]/following-sibling::tr[1]/td['+(cell.cellIndex+1)+']');
			cell.appendChild(document.createElement('br'));
			cell.appendChild(totals);
		}
	}
	add_unknowns();
	add_diff_link();
} else if(/\.com\/(?:index\.php)$/) {
	process_home_page();
}


function get_player_society(userid) {
	var gifs = {"illuminati.gif": "Illuminati",
		          "amaranth.gif": "Amaranth",
		          "eastern_star.gif": "Eastern Star",
		          "oddfellows.gif": "Oddfellow",
		          "triad.gif": "Triad",};

	if(!forced[userid]) {
		delete(societies[userid]);
		for(var gif in gifs) {
			if(document.evaluate('//img[contains(@src, "images/orders/'+gif+'")]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue) {
				societies[userid] = gifs[gif];
				dates[userid] = today;
				break;
			}
		}
		GM_setValue("societies", societies.toSource());
		GM_setValue("dates", dates.toSource());
	}
}

function create_text_dropdown(text, options, append, callback, args) {
	var a = document.createElement('a');
	var select = document.createElement('select');
	var matched = false;
	for(var i = 0; i < options.length; i++) {
		if(text == options[ i ]) {
			matched = true;
			select.add(new Option(text, text, true), null);
		} else {
			select.add(new Option(options[ i ], options[ i ]), null);
		}
	}
	if(!matched) {
		select.add(new Option(text, text, true), null);
	}
	select.addEventListener('change', function(ev) {replace_dropdown_with_text(ev, append, a, select, callback, args);}, false);
	a.appendChild(document.createTextNode(text));
	a.href = document.location.href;
	a.addEventListener('click', function(ev) {replace_text_with_dropdown(ev, a, select);}, false)
	return a;
}

function replace_text_with_dropdown(ev, a, select) {
	ev.preventDefault();
	a.parentNode.replaceChild(select, a);
}

function replace_dropdown_with_text(ev, append, a, select, callback, args) {
	a.innerHTML = select.options[select.selectedIndex].text;
	if(append) {
		a.appendChild(document.createTextNode(append));
	}
	select.parentNode.replaceChild(a, select);
	if(callback) {
		callback(select.options[select.selectedIndex].text, args);
	}
}

function changed_society(value, args) {
	societies = eval(GM_getValue("societies", "({})"));
	forced[args[0]] = true;
	societies[args[0]] = value;
	GM_setValue("forced", forced.toSource());
	GM_setValue("societies", societies.toSource());
}

function show_player_societies(location) {
	var playerlinks = document.evaluate(location+'//a[contains(@href, "p=records&a=view_player&id=")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var totals = new Object();
	var results = document.createElement('span');
	var resetlink = document.createElement('a');
	var society_totals = new Array();
	for(var i = 0; i < playerlinks.snapshotLength; i++) {
		var re;
		var link = playerlinks.snapshotItem(i);
		if(re = /&id=(\d+)/.exec(link.href)) {
			var society = (societies[re[1]] ? societies[re[1]] : "Unknown");
			var totalcell = document.evaluate('./ancestor::td[1]/following-sibling::td[1]', link, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var textdropdown = create_text_dropdown(society, ["Amaranth", "Eastern Star", "Illuminati", "Oddfellow", "Triad", "Unknown"], '*', changed_society, [re[1]]);
			if(society == "Unknown") {
				societies[re[1]] = "Unknown";
				unknowns[re[1]] = true;
			}
			if(forced[re[1]]) {
				textdropdown.appendChild(document.createTextNode('*'));
			}
			link.parentNode.insertBefore(textdropdown, link.nextSibling);
			link.parentNode.insertBefore(document.createTextNode(" - "), link.nextSibling);
			if(!totals[society]) {
				totals[society] = 0;
			}
			if(re = /([\d,]+)/.exec(totalcell.innerHTML)) {
				totals[society] += parseInt(re[1].replace(/,/g, ""), 10);
			}
		}
	}
	for(var key in totals) {
		society_totals.push([key, totals[key]]);
//		results.innerHTML += key + ": " + totals[key] + "<br>\n";
	}
	society_totals.sort(function(a, b) {return b[1]-a[1];});
	for(var i = 0; i < society_totals.length; i++) {
		results.innerHTML += society_totals[i][0] + ": " + Comma(society_totals[i][1]) + "<br>\n";
	}
	resetlink.addEventListener('click', reset_forced, false);
	resetlink.innerHTML = "Reset";
	resetlink.style.color = "white";
	resetlink.href = document.location.href;
	results.appendChild(resetlink);
	GM_setValue("societies", societies.toSource());
	return results;
}

function reset_forced(ev) {
	ev.preventDefault(0);
	forced = new Object();
	GM_setValue("forced", "({})");
	ev.target.parentNode.removeChild(ev.target);
}

function Comma(number) {
	number = '' + number;
	if (number.length > 3) {
		var mod = number.length % 3;
		var output = (mod > 0 ? (number.substring(0,mod)) : '');
		for (i=0 ; i < Math.floor(number.length / 3); i++) {
			if ((mod == 0) && (i == 0))
				output += number.substring(mod+ 3 * i, mod + 3 * i + 3);
			else
				output+= ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
		}
		return (output);
	}	else {
		return number;
	}
}

function get_date() {
	var text = document.evaluate('//text()[starts-with(., "UTC:")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var re;
	if(re = /UTC:(?:\s|<[^>]*>|&nbsp;)*(\d+:\d+)(?:\s|&nbsp;)+(\w+)(?:\s|&nbsp;)+(\d+),(?:\s|&nbsp;)+(\d+)/.exec(text.data)) {
		return re[2] + " " + re[3] + " " + re[4];
	}
	return "unknown";
}

function process_home_page() {
	var playerlinks = document.evaluate('//a[contains(@href, "a=view_player&id=") and contains(@onmouseover, "overlib")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var re;
	for(var i = 0; i < playerlinks.snapshotLength; i++) {
		var link = playerlinks.snapshotItem(i);
		if(re = /&id=(\d+)/.exec(link.href)) {
			var playerid = re[1];
			if(societies[playerid] && !forced[playerid] && (societies[playerid] != "Amaranth")) {
				if(re = /Society:\s*([^<]+)/.exec(link.getAttribute("onmouseover"))) {
					societies[playerid] = re[1];
					if(re[1] == "Oddfellows") {
						societies[playerid] = "Oddfellow";
					}
					dates[playerid] = today;
				}
			}
		}
	}
	GM_setValue("societies", societies.toSource());
	GM_setValue("dates", dates.toSource());
	check_supremacy();
}

function check_supremacy() {
//	var current_avg = document.evaluate('//b[text()="Majority AVG:"]/following-sibling::text()[contains(., "HOURS")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var current_avg = document.evaluate('//b[contains(text(),"y AVG:")]/following-sibling::text()[contains(., "HOURS")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var current_percent;
	var current_hours;
	var re;
	if(current_avg) {
		if(re = /(\d+)%\s+of\s+(\d+)/.exec(current_avg.data)) {
			var required;
			current_percent = re[1];
			current_hours = re[2];
			if(current_percent > 50) {
				required = ((24*80) - (current_percent * current_hours)) / (24-current_hours);
				if(required < 0) {
					required = "80% is guaranteed";
				} else if(required > 100) {
					required = "80% is impossible";
				} else {
					required = required.toFixed(1) + "% required for 80%";
				}
				current_avg.parentNode.appendChild(document.createElement('br'));
				current_avg.parentNode.appendChild(document.createTextNode(required));
			}
		}
	}
}
			

function add_unknowns() {
	var ids = new Array();
	for(var id in unknowns) {
		ids.push(id);
	}
	if(ids.length > 0) {
		GM_log("Unknowns: " + ids.length);
	}
}

function add_diff_link() {
	var link = document.createElement('a');
	var insert_cell = document.evaluate('//form[contains(@action, "/index.php?p=records&a=the_mostest")]/ancestor::td[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	link.href = document.location.href;
	link.addEventListener('click', load_diffs_click, false);
	link.innerHTML = "Load Differences";
	if(insert_cell) {
		insert_cell.appendChild(document.createElement('br'));
		insert_cell.appendChild(link);
	}
}

function load_diffs_click(ev) {
	var sel = document.evaluate('//form[contains(@action, "/index.php?p=records&a=the_mostest")]//select', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var loading = document.createTextNode("Loading...");
	ev.preventDefault();
	if(sel && (sel.options.length > 1)) {
		ev.target.parentNode.replaceChild(loading, ev.target);
		GM_post("/index.php?p=records&a=the_mostest", "id="+sel.options[1].value+"&submit=View", function(responseText) {loaded_diffs(responseText, loading);});
	} else {
		loading.data = "A layout change has broken this script, sorry.";
		ev.target.parentNode.replaceChild(loading, ev.target);
	}
}

function loaded_diffs(responseText, el) {
	var table = document.createElement('table');
	var re;
	var categories = new Object();
	if(re = /<table[^>]*ID="tblMBDisplay"[\s\S]+?<table[^>]*>([\s\S]+)<\/table[\s\S]+?Luckiest Ever/i.exec(responseText)) {
		el.parentNode.removeChild(el);
		table.innerHTML = re[1];
		for(var row = 2; row < table.rows.length; row += 2) {
			for(var cell = 0; cell < table.rows[row].cells.length; cell++) {
				var players = new Object();
				var ranktable = document.evaluate('./table', table.rows[row+1].cells[cell], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				if(table.rows[row].cells[cell].textContent == "Most Popular:") {
					continue;
				}
				for(rankrow = 0; rankrow < ranktable.rows.length; rankrow++) {
					var playername = ranktable.rows[rankrow].cells[1].textContent;
					var val = ranktable.rows[rankrow].cells[2].textContent
					var re;
					if(re = /(\d+[\d,]*)/.exec(val)) {
						players[playername] = parseInt(re[1].replace(/,/g, ""), 10);
					}
				}
//				categories.push(table.rows[row].cells[cell].textContent, players);
				categories[table.rows[row].cells[cell].textContent] = players;
			}
		}

		table = document.evaluate('//table[@ID="tblMBDisplay"]//table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		for(var row = 2; row < table.rows.length; row += 2) {
			for(var cell = 0; cell < table.rows[row].cells.length; cell++) {
				var ranktable = document.evaluate('./table', table.rows[row+1].cells[cell], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
				var players = categories[table.rows[row].cells[cell].textContent.replace(/:[\s\S]+/, ":")];
				if(players) {
					for(rankrow = 0; rankrow < ranktable.rows.length; rankrow++) {
						var playername = ranktable.rows[rankrow].cells[1].textContent.replace(/\s.*$/, "");
						var val = ranktable.rows[rankrow].cells[2].textContent
						var re;
						if(re = /(\d+[\d,]*)/.exec(val)) {
							var newval = parseInt(re[1].replace(/,/g, ""), 10);
							if((newval > 0) && players[playername] && (players[playername] != newval)) {
								var span = document.createElement('span');
								if(newval > players[playername]) {
									span.innerHTML = '+'+Comma(newval - players[playername]);
									span.style.color = "green";
								} else {
									span.innerHTML = '-'+Comma(players[playername] - newval);
									span.style.color = "red";
								}
								ranktable.rows[rankrow].cells[2].appendChild(document.createElement('br'));
								ranktable.rows[rankrow].cells[2].appendChild(span);
							}
						}
					}
				}
			}
		}
	} else {
		el.data = "Error parsing response.";
	}
}

function GM_post( dest, vars, callback, external) {
	var theHost = (external)?"":document.location.host;
	if(GM_getValue('debug',false)){ 
		GM_log("dest " + dest);
		GM_log("var " + vars);
		GM_log("fn: "+callback.name);
		GM_log("caller "+GM_post.caller.name);
	}
	 GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://'+theHost + dest,
	    headers: {'Content-type': 'application/x-www-form-urlencoded'},
			data: vars,
			onload:function(details) {
				if( typeof callback=='function' ){
					callback( details.responseText);
				}
			}
	});
}

