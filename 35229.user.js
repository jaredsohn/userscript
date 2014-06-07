// ==UserScript==
// @name           SSW Easysend
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Allows you to send a lot of an item without the need to select it multiple times
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=use
// @include        http://www.secretsocietywars.com/index.php?p=inventory&a=universal_express
// ==/UserScript==

var maxnum, maxitems, maxsends;
var span = document.createElement('span');

[maxnum, maxitems, maxsends] = get_max_items();

if(maxsends > 0) {
	var invlink;
	var dclink;
	var btn;
	var select;
	var qty;
	var send_items = document.evaluate('//input[@type="submit"][contains(@value, "Send Item")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	qty = document.createElement('input');
	qty.type = "text";
	qty.size = "3";
	span.appendChild(qty);
	select = make_select();
	span.appendChild(select);
	btn = document.createElement('input');
	btn.type = "button";
	btn.value = "Send";
	btn.addEventListener('click', function(){sendstuff(select, qty);}, false);
	span.appendChild(btn);
	span.appendChild(document.createElement('br'));
	addspan(span);
	if(send_items) {
		send_items.style.display = "none";
	}
	invlink = document.evaluate('//text()[contains(., "Inventory")]//ancestor::a[@href="#"][1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	dclink  = document.evaluate('//text()[contains(., "Display Case")]//ancestor::a[@href="#"][1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(invlink) {
		invlink.addEventListener('click', function(){span.style.display = "none";send_items.style.display = "";}, false);
	}
	if(dclink) {
		dclink.addEventListener('click', function(){span.style.display = "none";send_items.style.display = "";}, false);
	}
}

function sendstuff(sel, qty) {
	var num = parseInt(qty.value);
	var prefix;
	var itemnum;
	var num_in_inventory;
	var re;
	var name = get_recipient();
	var message = get_message();

	if(qty.value == "") {
		num = maxnum * maxitems * maxsends;
	}

	if(re = /^([^:]+):(\d+)/.exec(sel.options[sel.selectedIndex].value)) {
		prefix = re[1];
		itemnum = re[2];
	} else {
		alert("You need to select an item to send.\n\nIf you have already chosen an item to send, the easysend script might be broken because it doesn't know what you picked.");
		return;
	}
	if(re = /\((\d+)\)$/.exec(sel.options[sel.selectedIndex].text)) {
		num_in_inventory = parseInt(re[1]);
	}
	if(num > num_in_inventory) {
		num = num_in_inventory;
	}
	if(num > maxnum * maxitems * maxsends) {
		num = maxnum * maxitems * maxsends;
	}
	send(num, prefix, itemnum, name, message, 0);
}

function send(num, prefix, itemnum, recipient, message, prev) {
	var numleft = Math.ceil(num / (maxnum * maxitems));
	var vars = new Array();

	vars.push("send_to="+recipient);
	vars.push("pm_text="+message);
	vars.push("card="+get_card());
	vars.push("action=Send Item(s)>>>");
	vars.push("fromplace="+prefix);
	for(var i = 1; i <= maxitems; i++) {
		if(num > maxnum) {
			vars.push("qty["+i+"]="+maxnum);
//			vars.push(prefix+"["+i+"]="+itemnum);
			vars.push("inv["+i+"]="+itemnum);
			num -= maxnum;
		} else if(num > 0) {
			vars.push("qty["+i+"]="+num);
//			vars.push(prefix+"["+i+"]="+itemnum);
			vars.push("inv["+i+"]="+itemnum);
			num = 0;
		}
	}

	span.innerHTML = parseInt((prev / (prev + numleft)) * 100) + "%<br>";
	if(num > 0) {
		GM_post("/index.php?p=inventory&a=universal_express", vars.join("&"), function(responseText){send(num, prefix, itemnum, recipient, message, prev+1);});
	} else {
		var form = document.createElement('form');
		form.action = "/index.php?p=inventory&a=universal_express";
		form.method = "POST";
		for(var i = 0; i < vars.length; i++) {
			var re;
			if(re = /^([^=]+)=([\s\S]*)/.exec(vars[i])) {
				var hidden = document.createElement('input');
				hidden.type = "hidden";
				hidden.name = re[1];
				hidden.value = re[2];
				form.appendChild(hidden);
			}
		}
		document.body.appendChild(form);
		form.submit();
	}
}

function get_card() {
	var card = document.evaluate('//input[@name="card"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

	if(card) {
		return card.value;
	}
	return "";
}

function get_recipient() {
	var textbox = document.evaluate('//input[@name="send_to"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(textbox) {
		return textbox.value;
	}
	return "";
}

function get_message() {
	var textbox = document.evaluate('//textarea[@name="pm_text"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if(textbox) {
		if(textbox.value == "") {
			return ".";
		} else {
			return textbox.value;
		}
	}
	return ".";
}

function addspan(span) {
	var turgid = document.getElementById("turgid");
	
	if(turgid) {
		turgid.parentNode.insertBefore(span, turgid);
	}
}

function make_select() {
	var select = document.createElement('select');
	var inv = get_inventory("items");
	var dc  = get_inventory("dcitems");
	var opt;
	
	opt = document.createElement('option');
	opt.text = "--- select an item ---";
	opt.value = 0;
	select.add(opt, null);
	addgroup(select, "Inventory", inv, "inv");
	addgroup(select, "Display Case", dc, "dc");
	return select;
}

function addgroup(select, title, inv, prefix) {
	var opt;
	var re;

	opt = document.createElement('optgroup');
	opt.label = title;
	select.add(opt, null);
	for(var i = 0; i < inv.length; i++) {
		if(re = /\s*(\d+) : "(.*)"/.exec(inv[i])) {
			opt = document.createElement('option');
			opt.text = re[2];
			opt.value = prefix+":"+re[1];
			select.add(opt, null);
		}
	}
}

function get_inventory(varname) {
	var regex = new RegExp('var '+varname+' = {\\n((?:\\s.*\\n)*)\\s*};');
	var re;
	if(re = regex.exec(document.getElementsByTagName('head')[0].innerHTML)) {
		return re[1].split("\n");
	}
	return [];
}

function get_max_items() {
	var nums = [0, 0, 0];

	if(re = /You may use this service to send (\d+) of (\d+) items to (\d+) people per day/.exec(document.body.innerHTML)) {
		nums = [re[1], re[2], re[3]];
	}
	if(re = /You have used your\s+[^\n]+\s+(\d+) times? today/.exec(document.body.innerHTML)) {
		nums[2] -= parseInt(re[1]);
	}
	return nums;
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
