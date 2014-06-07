// ==UserScript==
// @name           SSW Probe Launcher
// @namespace      http://ssw.upup.us
// @description    Allows for easier probing of multiple sectors.
// @include        http://www.secretsocietywars.com/index.php?p=space&a=launch_probe
// ==/UserScript==

var launch_form = document.evaluate('//td[@class="main"]//form[@action="http://www.secretsocietywars.com/index.php?p=space&a=launch_probe"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var textbox = document.evaluate('//td[@class="main"]//input[@name="destination"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var button = document.evaluate('//td[@class="main"]//input[@value="Launch"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var bottom_span;
var num_warp_probes;
var probes_launched = 0;
var to_launch = 0;
var percent_span;
var bgcolors = ["rgb(238, 238, 238)", "rgb(204, 204, 204)"];
var bgcount = 0;
var table;
var table_length;
var running = false;

if(launch_form && textbox && button) {
	var re;

	if(re = /You have ([\d,]+) warp probe/.exec(launch_form.innerHTML)) {
		num_warp_probes = re[1];
	}
	table = find_parent(launch_form, "TABLE");
	table_length = table.rows.length;
	textbox.size = 30;
	textbox.style.width = "";
	textbox.addEventListener('keyup', update_sectors, false);
	button.addEventListener('click', launch_probes, false);
	bottom_span = document.createElement('span');
	percent_span = document.createElement('span');
	launch_form.appendChild(bottom_span);
	launch_form.appendChild(percent_span);
}

function update_sectors(ev) {
	var sectors;
	
	sectors = parse_sectors(this.value);
	bottom_span.innerHTML = sectors.join(', ') + " ";
	if((num_warp_probes > 0) && (num_warp_probes < sectors.length)) {
		bottom_span.innerHTML += "<br>**Warning** You don't have enough warp probes for this many sectors";
	}
	percent_span.innerHTML = "";
}

function launch_probes(ev) {
	var sectors;

	ev.preventDefault();

	if(running) {
		return;
	}
	running = true;

	while(table.rows.length > table_length) {
		table.deleteRow(table_length);
	}
	bgcount = 0;
	probes_launched = 0;
	sectors = parse_sectors(textbox.value);
	to_launch = sectors.length;
	percent_span.innerHTML = "<br>Launching";
	for(var i = 0; i < sectors.length; i++) {
//		GM_post("/index.php?p=space&a=launch_probe", "destination="+sectors[i]+"&action=Launch", function(result) {update_status(result, sectors[i]);});
		GM_post("/index.php?p=space&a=launch_probe", "destination="+sectors[i]+"&action=Launch", make_callback(sectors[i]));
	}
}

function make_callback(s) {
	return function(result) {update_status(result, s);};
}

function update_status(result, sectornum) {
	var percent;
	var re;
	var cell;
	
	probes_launched++;

	cell = table.insertRow(table.rows.length).insertCell(0);
	cell.style.background = bgcolors[bgcount++];
	if(bgcount >= bgcolors.length) {
		bgcount = 0;
	}

	if(re = /(<h3>Sector:[\s\S]*?)<\/td[\s\S]*?<td[^>]+>([\s\S]*?warp probe)/i.exec(result)) {
		var probe_results = re[1];
		var additional_results = re[2];
		var cell;

		if(re = /^([\s\S]*)<\/td/.exec(additional_results)) {
			additional_results = re[1];
		}

		cell.innerHTML = probe_results;
		if(additional_results.indexOf('warp probe') == -1) {
			cell.innerHTML += additional_results;
		}
	} else if(result.indexOf("Enemy drones destroy your probe before it can send a report!") > -1) {
		cell.innerHTML = "<b>Sector " + sectornum + ":</b> Enemy drones destroy your probe before it can send a report!";
	} else if(result.indexOf("You do not have any probes to launch") > -1) {
		cell.innerHTML = "<b>Sector " + sectornum + ":</b> You do not have any probes to launch.";
	} else if(result.indexOf("frustrated by being bound to a planet's gravity") > -1) {
		cell.innerHTML = "<b>Sector " + sectornum + ":</b> You are currently on a planet and unable to launch probes."
	} else {
		cell.innerHTML = "The script was unable to interpret the results of a scan.  Please copy and paste this into a <a href='http://www.secretsocietywars.com/index.php?p=forums&a=pm_editor&to=nardo'>smail to nardo</a><br><br>";
		cell.innerHTML += result.replace(/</g, '&lt;').replace(/>/g, '&gt;');
	}

	if(probes_launched < to_launch) {
		percent = parseInt((probes_launched / to_launch) * 100);
		percent_span.innerHTML = "<br>"+percent+"% complete";
	} else {
		percent_span.innerHTML = "";
		bottom_span.innerHTML = "";
		running = false;
		percent_span.innerHTML = "<br><b>Finished launching warp probes</b>";
	}
}

function parse_sectors(str) {
	var sectors = new Array();
	var added   = new Array();
	var words;
	var last_sector = 1;
	var through = false;
	var block = false;

	words = str.split(/[\s,]+/);
	for(var i = 0; i < words.length; i++) {
		var sectornum = parseInt(words[i]);
		var re;
		
		if(re = /^(\d+)-(\d+)$/.exec(words[i])) {
			for(var j = parseInt(re[1]); j <= parseInt(re[2]); j++) {
				added[j] = true;
			}
		} else if(re = /^(\d+)x(\d+)$/.exec(words[i])) {
			var s = block_sectors(parseInt(re[1]), parseInt(re[2]));
			for(var j = 0; j < s.length; j++) {
				added[s[j]] = true;
			}
		}	else if(words[i] == '-') {
			through = true;
		} else if(words[i] == 'x') {
			block = true;
		} else if(through) {
			for(var j = last_sector + 1; j <= sectornum; j++) {
				added[j] = true;
			}
			through = false;
		} else if(block) {
			var s = block_sectors(last_sector, sectornum);
			for(var j = 0; j < s.length; j++) {
				added[s[j]] = true;
			}
			block = false;
		}	else if(sectornum > 0) {
			added[sectornum] = true;
			last_sector = sectornum;
		}
	}
	for(i = 0; i < Math.min(added.length, 1090); i++) {
		if(added[i]) {
			sectors.push(i);
		}
	}
	return sectors;
}

function block_sectors(corner1, corner2) {
	var c1_top;
	var c1_left;
	var c2_top;
	var c2_left;
	var sectors = new Array();
	
	c1_top = parseInt((corner1 - 1) / 33);
	c1_left = corner1 - (c1_top * 33);
	c2_top = parseInt((corner2 - 1) / 33);
	c2_left = corner2 - (c2_top * 33);
	
	for(var i = Math.min(c1_top, c2_top); i <= (Math.max(c1_top, c2_top)); i++) {
		for(var j = Math.min(c1_left, c2_left); j <= (Math.max(c1_left, c2_left)); j++) {
			sectors.push((i*33) + j);
		}
	}
	return sectors;
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

function find_parent(node, nodetype) {
	while(node && (node.nodeName != nodetype)) {
		node = node.parentNode;
	}
	return node;
}
