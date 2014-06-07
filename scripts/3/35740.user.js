// ==UserScript==
// @name           SSW Reset-Safe Auction Protector
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Helps prevent you from accidentally selling a reset-safe item in yoobey for starbux if you wanted to sell for e-peen
// @include        http://www.secretsocietywars.com/index.php?p=auction&a=auction
// @include        http://www.secretsocietywars.com/examine.php*
// ==/UserScript==

var rs_items = eval(GM_getValue("reset_safe_items", "[]"));
var submit_button = document.evaluate('//input[@type="submit"][contains(@value, "Auction")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if(document.location.href.indexOf("p=auction") > -1) {
	auction();
} else if(document.location.href.indexOf("examine.php") > -1) {
	examine();
}

function auction() {
	if(submit_button) {
		check_reset_list_date();
		submit_button.addEventListener("click", check_auctions, false);
	}
}

function examine() {
	var item_textnode = document.evaluate('//fieldset/legend/b/text()', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(item_textnode) {
		if(is_reset_safe(item_textnode.data)) {
			var span = document.createElement('span');
			span.style.color = "red";
			span.style.fontWeight = "bold";
			span.appendChild(document.createTextNode(" (Reset-Safe)"));
			item_textnode.parentNode.appendChild(span);
		}
	}
}

function check_auctions(ev) {
	var answer;
	var selects = document.evaluate('//select[starts-with(@name, "inv[")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var bad_auctions = new Array();

	for(var i = 0; i < selects.snapshotLength; i++) {
		var itemname = selects.snapshotItem(i).options[selects.snapshotItem(i).selectedIndex].text;
		itemname = itemname.replace(/\s+\(\d+ sb.*$/, "");
		if(using_starbux(i) && is_reset_safe(itemname)) {
			bad_auctions.push(itemname);
		}
	}
	if(bad_auctions.length > 0) {
		answer = confirm("You are going to auction these reset-safe item(s) for starbux:\n" + bad_auctions.join("\n") +  "\nWould you like to continue?  Press OK to auction them and Cancel to cancel the auction.");
		if(!answer) {
			ev.preventDefault();
		}
	}
}

function using_starbux(auction_num) {
	var currency_select = document.getElementsByName("bidinv["+auction_num+"]")[0];
	if(currency_select.options[currency_select.selectedIndex].text == "Starbux") {
		return true;
	}
	return false;
}

function is_reset_safe(itemname) {
	if(itemname == "E-Penis") {
		return false;
	}
	for(var i = 0; i < rs_items.length; i++) {
		if(rs_items[i].toLowerCase() == itemname.toLowerCase()) {
			return true;
		}
	}
	return false;
}

function check_reset_list_date() {
	var today_month;
	var today_year;
	var rs_month;
	var rs_year;
	var re;

	if(re = /UTC:(?:\s|&nbsp;)+\d+:\d+(?:\s|&nbsp;)+(\w+)(?:\s|&nbsp;)+\d+,(?:\s|&nbsp;)+(\d+)/.exec(document.body.innerHTML)) {
		today_month = re[1];
		today_year = re[2];
	}
	rs_month = GM_getValue("month", "");
	rs_year  = GM_getValue("year", "");
	if((today_month != rs_month) || (today_year != rs_year)) {
		add_fetch_list_link();
	}
}

function add_fetch_list_link() {
	var span = document.createElement('span');
	var link = document.createElement('a');
	var table = document.evaluate('./ancestor::table[1]', submit_button, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(table) {
		var cell;
		link.href = "#";
		link.addEventListener("click", function(ev) {ev.preventDefault(); fetch_list(span);}, false);
		span.innerHTML = "Reset-Safe list is out of date, you should ";
		link.innerHTML = "grab it now";
		span.appendChild(link);
		cell = table.insertRow(0).insertCell(0);
		cell.align = "middle";
		cell.appendChild(span);
	}
}

function fetch_list(span) {
	span.innerHTML = "Fetching...";
	GM_get("/index.php?p=help&a=sfr_items", function(responseText) {update_list(responseText, span);});
}

function update_list(responseText, span) {
	var re;

	span.innerHTML = "";

	rs_items = new Array();
	while(re = /<td style="background-color:#666666;[^>]+>[^<]+<b>([^<]+)/gi.exec(responseText)) {
		rs_items.push(re[1]);
	}
	if(rs_items.length > 10) {
		GM_setValue("reset_safe_items", rs_items.toSource());
		if(re = /UTC:(?:\s|&nbsp;)+\d+:\d+(?:\s|&nbsp;)+(\w+)(?:\s|&nbsp;)+\d+,(?:\s|&nbsp;)+(\d+)/.exec(document.body.innerHTML)) {
			GM_setValue("month", re[1]);
			GM_setValue("year", re[2]);
		}
	} else {
		alert("Un oh, I could not parse the reset safe items list.  You're on your own, buddy.");
	}
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
