// ==UserScript==
// @name           SSW Syndicate Forums
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Displays posts from all your syndicates on one page
// @include        http://www.secretsocietywars.com/index.php?p=syndicates&a=syndicates*
// ==/UserScript==

var greyarrow = "data:image/gif;base64,R0lGODlhCAAIAKIAAP///9XV1ZKSkn9/f35+fv///wAAAAAAACH5BAEAAAUALAAAAAAIAAgAAAMWKAHcRKqBQUcEZDytsuaBll3j0lxSAgA7";
var running = false;
var months = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12};
var colors = ['#eeeeee', '#dddddd'];
var color_index = 0;

if(document.location.href.indexOf('a=syndicates') > -1) {
	main_syndicate_page();
}

function main_syndicate_page() {
	var syndicate_table = find_syndicate_table();
	var syndicate_numbers = new Array();

	if(document.location.href.indexOf("#allforum") > -1) {
		load_cached_forums();
		return;
	}

	if(syndicate_table) {
		var syndicate_divs = find_syndicate_divs(syndicate_table);
		var cell;
		var view_link;
		for(var i = 0; i < syndicate_divs.length; i++) {
			var img = document.evaluate('.//img', syndicate_divs[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var a   = document.evaluate('.//a[contains(@href, "p=syndicates&a=syndicate&s=")]', syndicate_divs[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var syndicate_number = get_syndicate_number(a);
			var syndicate_name   = get_syndicate_name(a);
			add_arrow_handler(img, syndicate_number);
			syndicate_numbers.push(syndicate_number);
			GM_setValue("name"+syndicate_number, syndicate_name);
			if(!GM_getValue("enabled"+syndicate_number, true)) {
				img.src = greyarrow;
			}
		}
		cell = syndicate_table.insertRow(syndicate_table.rows.length).insertCell(0);
		cell.colSpan = 2;
		cell.align = "middle";
		view_link = document.createElement('a');
		view_link.href = "/index.php?p=syndicates&a=syndicates";
		view_link.innerHTML = "View combined forum";
		view_link.addEventListener('click', function(ev) {ev.preventDefault(); make_forums(syndicate_numbers, syndicate_table);}, false);
		cell.appendChild(view_link);
	}
}

function make_forums(all_numbers, table) {
	var syndicates = new Array();
	var cell;
	var html = new Array();

	if(running) {
		return;
	}
	running = true;

/*
	cell = table.insertRow(table.rows.length).insertCell(0);
	cell.colSpan = 2;
*/
	cell = table.rows[table.rows.length-1].cells[0];
	for(var i = 0; i < all_numbers.length; i++) {
		if(GM_getValue("enabled"+all_numbers[i], true)) {
			syndicates.push(all_numbers[i]);
		}
	}
	if(syndicates.length > 0) {
		var syndicate = syndicates.pop();
		cell.innerHTML = "Loading forum 1 of " + (syndicates.length + 1) + "...";
		grab_forums(syndicate, syndicates, html, cell);
	} else {
		running = false;
		alert("No syndicates selected");
	}
}

function grab_forums(syndicate, syndicates, html, cell) {
	GM_get("/index.php?p=syndicates&a=view_forum&s="+syndicate, function(responseText) {next_forum(responseText, syndicate, syndicates, html, cell);});
}

function next_forum(responseText, syndicate, syndicates, html, cell) {
	html.push([syndicate,responseText]);
	if(syndicates.length > 0) {
		var next_syndicate = syndicates.pop();
		cell.innerHTML = "Loading forum " + (html.length + 1) + " of " + (html.length + syndicates.length + 1) + "...";
		grab_forums(next_syndicate, syndicates, html, cell);
	} else {
		cell.innerHTML = "Generating forum...";
		display_results(html);
		cell.innerHTML = "";
	}
}

function display_results(html) {
//	var main = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var posts = new Array();
//	var table = document.createElement('table');
	var table = insert_forum_table();
	var cat;
	var table_html = "";

	
//	if(main) {
	if(true) {
		for(var i = 0; i < html.length; i++) {
			posts.push(extract_posts(html[i][1]));
		}
		for(var i = 0; i < posts.length; i++) {
			posts[i] = posts[i].sort(compare_posts); /* eliminates a bunch of stickies at the top */
			for(var j = 0; j < posts[i].length; j++) {
				posts[i][j] = posts[i][j].replace(/(\s+by\s+<a.*?<\/a>)/i, "$1<br><a href='/index.php?p=syndicates&a=view_forum&s="+html[i][0]+"'>"+GM_getValue("name"+html[i][0])+"</a>");
			}
		}
		while((cat = find_next_post_category(posts)) >= 0) {
			table_html += "<tr>"+posts[cat].shift().replace(/#(?:dddddd|eeeeee)/gi, colors[color_index++]).replace(/(<span[^>]*>\s*\[STICKY\]\s*<\/span>)([^<]*<a.*?<\/a>)/i, "$2 $1")+"</tr>";
			if(color_index >= colors.length) {
				color_index = 0;
			}
		}
		table.innerHTML += table_html;
		
//		main.appendChild(table);
		GM_setValue("tablecache", table.innerHTML.replace(/\s+/g, " "));
		document.location.replace("#allforum");
	}
}

function find_next_post_category(posts) {
	var latest = -1;
	for(var i = 0; i < posts.length; i++) {
		if(posts[i].length > 0) {
			if(latest == -1) {
				latest = i;
			} else if(compare_posts(posts[latest][0], posts[i][0]) > 0) {
				latest = i;
			}
		}
	}
	return latest;
}

function compare_posts(a, b) {
	var a_sticky, b_sticky;
	var a_date, b_date;
	var re;
	var order = ["year", "month", "day", "hour", "minutes"];
	
/*
	if(a.indexOf("[STICKY]") > -1) {
		a_sticky = true;
	}
	if(b.indexOf("[STICKY]") > -1) {
		b_sticky = true;
	}
	if(a_sticky && !b_sticky) {
		return -1;
	} else if(b_sticky && !a_sticky) {
		return 1;
	}
*/
	/* parseInt("09") returns 0 for some reason (parseInt("08") returns 8), check for leading zeroes then */
	if(re = /<a[^>]+#\d+"[^>]*>\s*0*(\d+):0*(\d+)\s+0*(\d+)\.0*(\d+)\.0*(\d+)/i.exec(a)) {
		a_date = new Object();
		a_date.hour    = parseInt(re[1]);
		a_date.minutes = parseInt(re[2]);
		a_date.month   = parseInt(re[3]);
		a_date.day     = parseInt(re[4]);
		a_date.year    = parseInt(re[5]) + 3000;
	} else if(re = /Posted\s+(\w{3})\s+0*(\d+),\s+0*(\d+)\s+@\s+0*(\d+):0*(\d+)/.exec(a)) {
		a_date = new Object();
		a_date.month   = months[re[1]];
		a_date.day     = parseInt(re[2]);
		a_date.year    = parseInt(re[3]);
		a_date.hour    = parseInt(re[4]);
		a_date.minutes = parseInt(re[5]);
	}

	if(re = /<a[^>]+#\d+"[^>]*>\s*0*(\d+):0*(\d+)\s+0*(\d+)\.0*(\d+)\.0*(\d+)/i.exec(b)) {
		b_date = new Object();
		b_date.hour    = parseInt(re[1]);
		b_date.minutes = parseInt(re[2]);
		b_date.month   = parseInt(re[3]);
		b_date.day     = parseInt(re[4]);
		b_date.year    = parseInt(re[5]) + 3000;
	} else if(re = /Posted\s+(\w{3})\s+0*(\d+),\s+0*(\d+)\s+@\s+0*(\d+):0*(\d+)/.exec(b)) {
		b_date = new Object();
		b_date.month   = months[re[1]];
		b_date.day     = parseInt(re[2]);
		b_date.year    = parseInt(re[3]);
		b_date.hour    = parseInt(re[4]);
		b_date.minutes = parseInt(re[5]);
	}

	if(a_date && b_date) {
		for(var i = 0; i < order.length; i++) {
			if(a_date[order[i]] != b_date[order[i]]) {
				return b_date[order[i]] - a_date[order[i]];
			}
		}
	}
	return 0;
}

function load_cached_forums() {
//	var main = document.evaluate('//td[@class="main"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var table = insert_forum_table();

/*	
	if(main) {
		main.innerHTML = "<table>"+GM_getValue("tablecache", "<tr><td>error</td></tr>")+"</table>";
	}
*/
	table.innerHTML = GM_getValue("tablecache", "<tr><td>Syndicate Forum Script: Error loading from cache</td></tr>");
}

function extract_posts(raw_html) {
	var re;
	var posts = new Array();
	
	while(re = /<tr[^>]*>([\s\S]+?)<\/tr/gi.exec(raw_html)) {
		var tr_html = re[1];
		if(/index.php\?p=syndicates&a=forum&s=\d+&id/.exec(tr_html)) {
			posts.push(tr_html);
		}
	}
	return posts;
}

function add_arrow_handler(img, number) {
	img.addEventListener('click', function(ev) {clicked_arrow(this, number)}, false);
}

function clicked_arrow(img, number) {
	if(GM_getValue("enabled"+number, true)) {
		GM_setValue("enabled"+number, false);
		img.src = greyarrow;
	} else {
		GM_setValue("enabled"+number, true);
		img.src = "/images/syndicates/syn_arw_8x8.gif";
	}
}

function find_syndicate_table() {
	var table = document.evaluate('//legend//text()[contains(., "YOUR SYNDICATES")]//ancestor::fieldset//table', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	return table;
}

function insert_forum_table() {
	var parent_table = document.evaluate('//legend//text()[contains(., "SYNDICATE CATEGORIES")]//ancestor::table[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var table = document.createElement('table');
	var cell;
	
	cell = parent_table.insertRow(0).insertCell(0);
	cell.colSpan = 2;
	cell.appendChild(table);
	return table;
}

function find_syndicate_divs(table) {
	var divs_snapshot = document.evaluate('.//img//following-sibling::a[contains(@href, "p=syndicates&a=syndicate&s=")]//ancestor::div', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var divs = new Array();
	for(var i = 0; i < divs_snapshot.snapshotLength; i++) {
		divs.push(divs_snapshot.snapshotItem(i));
	}
	return divs;
}

function get_syndicate_number(link) {
	var re;
	if(re = /p=syndicates&a=syndicate&s=(\d+)/.exec(link.href)) {
		return parseInt(re[1]);
	}
}

function get_syndicate_name(link) {
	var name = link.innerHTML.replace(/^\s+/, '').replace(/\s+$/, '');
	return name;
}

function GM_get( dest, callback, external) {
	var theHost = (external)?"":document.location.host;
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://'+ theHost + dest,
		onload:function(details) {
			if( typeof callback=='function' ){
				callback(details.responseText);
			}
		}
	});
}
