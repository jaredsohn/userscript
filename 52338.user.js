// ==UserScript==
// @name           SSW Remove Doppelpets
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Removes all of the doppelpets from your facilities to avoid doppelpet death in facility collisions.
// @include        http://www.secretsocietywars.com/index.php?p=space*
// @include        http://www.secretsocietywars.com/index.php?p=pvp*
// @include        http://www.secretsocietywars.com/index.php?p=facilities&a=facility&id=*
// ==/UserScript==

var manage_links = document.evaluate('//a[contains(text(), "MANAGE FACILITY")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var remove_link;
var remove_spans = new Array();
var removing = true;

for(var i = 0; i < manage_links.snapshotLength; i++) {
	var span = document.createElement('span');
	var parent_cell = document.evaluate('./ancestor::td[1]', manage_links.snapshotItem(i), null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(parent_cell) {
		var id;
		var re;
		if(re = /&id=(\d+)/.exec(manage_links.snapshotItem(i).href)) {
			id = parseInt(re[1]);
		}
		parent_cell.appendChild(document.createElement('br'));
		parent_cell.appendChild(span);
		remove_spans.push([id,span]);
	}
}

if(manage_links.snapshotLength > 0) {
	var facilities_link = document.evaluate('//a[contains(@href, "index.php?p=facilities&a=facilities")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(facilities_link) {
		var span = document.createElement('span');

		remove_link = document.createElement('a');
		remove_link.innerHTML = "remove pets";
		remove_link.setAttribute("style", facilities_link.getAttribute("style"));
		remove_link.style.cursor = "pointer";
		remove_link.href = document.location.href;
		remove_link.addEventListener('click', click_remove_link, false);
		remove_link.addEventListener('contextmenu', toggle_remove, false);
		span.appendChild(remove_link);
		span.appendChild(document.createTextNode(" | "));
		facilities_link.parentNode.insertBefore(span, facilities_link);
	}
}

function toggle_remove(ev) {
	ev.preventDefault();
	ev.stopPropagation();
	if(removing) {
		removing = false;
		remove_link.innerHTML = "restore pets";
	} else {
		removing = true;
		remove_link.innerHTML = "remove pets";
	}
}

function click_remove_link(ev) {
	ev.preventDefault();
	if(removing) {
		withdraw_doppelpets("", 0, 1, "");
	} else {
		var doppelpets = get_available_doppelpets();
		restore_doppelpets("", 0, 1, doppelpets, "");
	}
}

function restore_doppelpets(responseText, facnum, petnum, doppelpets, endtext) {
	if(remove_spans.length > facnum) {
		var facid = remove_spans[facnum][0];
		var span = remove_spans[facnum][1];
		var haspet = false;
		if(doppelpets.length == 0) {
			span.innerHTML = endtext + '<span style="color: red;">Out of doppelpets</span>';
			restore_doppelpets("", facnum+1, 1, doppelpets, "");
			return;
		}
		if(petnum <= 3) {
			if(petnum > 1) {
				haspet = get_doppelpet_name(petnum, responseText, true);
			}
			if(!haspet) {
				var pet = doppelpets.shift(); // [name,exp,id] 
				span.innerHTML = endtext + "Adding " + pet[0];
				GM_post("/index.php?p=facilities&a=facility&id="+facid, "pet_id="+pet[2]+"&dpslot="+petnum+"&action=assign_dp&submit=GO", function(responseText) {restore_doppelpets(responseText, facnum, petnum+1, doppelpets, endtext);});
			} else {
				GM_log("facility "+facnum+" had doppelpet number " + petnum);
				restore_doppelpets(responseText, facnum, petnum+1, doppelpets, endtext);
			}
		} else {
			span.innerHTML = endtext + "Doppelpets restored";
			restore_doppelpets("", facnum+1, 1, doppelpets, "");
		}
	}
}

function withdraw_doppelpets(responseText, facnum, petnum, endtext) {
	var name = "Doppelpet";
	if(remove_spans.length > facnum) {
		var id = remove_spans[facnum][0];
		var span = remove_spans[facnum][1];
		if(petnum <= 3) {
			if(petnum > 1) {
				name = get_doppelpet_name(petnum, responseText, true);
			}
			if(name) {
				span.innerHTML = endtext + "Removing "+name+"...";
				GM_post("/index.php?p=facilities&a=facility&id="+id, "pet_id=&dpslot="+petnum+"&action=assign_dp&submit=GO", function(responseText) {withdraw_doppelpets(responseText, facnum, petnum+1, endtext);});
			} else {
				withdraw_doppelpets(responseText, facnum, petnum+1, endtext);
			}
		} else {
			span.innerHTML = endtext + "Doppelpets Removed";
			withdraw_doppelpets("", facnum+1, 1, "");
		}
	}
}

function get_available_doppelpets() {
	var select = document.evaluate('//select[@name="id"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var doppelpets = new Array();
	for(var i = 0; 	i < select.options.length; i++) {
		var opt = select.options[ i ];
		var name;
		var id;
		var exp;
		var re;
		id = opt.value;
		if(re = /^([^\s]+).*E:\s*([\d,]+)/.exec(opt.text)) {
			name = re[1];
			exp = parseInt(re[2].replace(/,/g, ""), 10);
			doppelpets.push([name,exp,id]);
		}
	}
	GM_log("length: " + doppelpets.length);
	doppelpets.sort(exp_sort).splice(0, 1);
	GM_log("post-splice: " + doppelpets.length);
	return doppelpets;
}

function exp_sort(a, b) {
	return b[1] - a[1];
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

function get_doppelpet_name(num, responseText, forced) {
	var name;
	var start;
	var end;
	start = responseText.indexOf("DP Slot "+num);
	end = responseText.indexOf("DP Slot "+(num+1));

	if(end == -1) {
		end = responseText.length-1;
	}
	if((start > -1) && (re = /Remove Mini-([^<\s]+)/.exec(responseText.substring(start, end)))) {
		name = re[1];
	}
	if(!forced) {
		if(re = /Health:\s*(\d+)\s*\/\s*(\d+)/.exec(responseText.substring(start, end))) {
			if((parseInt(re[1])+heal_threshold) >= parseInt(re[2])) {
				/* really inelegant way of preventing doppelpets at full health from getting healed */
				name = null;
			}
		}
	}
	return name;
}
