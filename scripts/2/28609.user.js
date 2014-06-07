// ==UserScript==
// @name           SSW Doppelpet Healer
// @namespace      http://homeworlds.secretsocietywars.com/nardo
// @description    Lets you click the Heal link for your Doppelpet without changing the page
// @include        http://www.secretsocietywars.com/*
// ==/UserScript==

var heal_links;
var healing = false;
var queue = 0;
var overdiv;
var health_span;
var p_button;
var last_resp_length = 0;

heal_links = document.evaluate('//a[contains(@href, "/index.php?p=pets&a=heal_main")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for(var i = 0; i < heal_links.snapshotLength; i++) {
	heal_links.snapshotItem(i).addEventListener('click', doppel_heal, false);
}

if(heal_links.snapshotLength > 0) {
	p_button = document.createElement('input');
	p_button.type = "button";
	p_button.style.visibility = "hidden";
	p_button.setAttribute("accesskey", "p");
	p_button.addEventListener('click', doppel_heal, false);
	document.body.appendChild(p_button);
}


function doppel_heal(ev) {
	var stats_table;
	var health_row;
	var heal_link;
	var containing_table;
	var heal_href;

	healing = true;
	queue++;
	
	ev.preventDefault();

	heal_link = document.evaluate('//td[@class="leftside"]//a[contains(@href, "/index.php?p=pets&a=heal_main")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(heal_link.snapshotLength > 0) {
		heal_href = heal_link.snapshotItem(0).href;
		containing_table = heal_link.snapshotItem(0);
	}
	while(containing_table && (containing_table.nodeName != "TABLE")) {
		containing_table = containing_table.parentNode;
	}
	if(containing_table) {
		var health_row = containing_table.rows[1];
		var rleft, rtop;
		var d2;

		if(!health_span) {
			health_span = find_health_span(containing_table);
		}

		[rleft, rtop] = findPos(health_row);

		if(!overdiv) {
			overdiv = document.createElement('div');
			overdiv.style.position   = "absolute";
			overdiv.style.display    = "block";
			overdiv.style.left       = rleft + "px";
			overdiv.style.top        = rtop + "px";
			overdiv.style.width      = health_row.offsetWidth + "px";
			overdiv.style.height     = health_row.offsetHeight + "px";
			overdiv.style.fontSize   = "9px";
			overdiv.style.textAlign  = "center";
			overdiv.style.background = "red";
			overdiv.style.color      = "rgb(238, 238, 238)";
			overdiv.innerHTML = "Healing";
			document.body.appendChild(overdiv);
		}
		overdiv.style.display = "block";
		overdiv.style.MozOpacity = "1.0";
		if(queue == 1) {
			overdiv.innerHTML = "Healing";
		}
		if(queue > 1) {
			overdiv.innerHTML = "Queue: " + (queue - 1);
		} else {
			make_heal_request(heal_href);
		}
	}
}

function process_heal_response(txt, u) {
	var re;
	var curhealth;
	var totalhp;

	if(re = /<span[^>]+title="Mini-[^"]+health"[^>]*>\s*(\d+)\s*\/(\d+)/i.exec(txt)) {
		curhealth = re[1];
		totalhp = re[2];
	}

	if(totalhp > 0) {
		health_span.innerHTML = curhealth + "/" + totalhp;
	}

	if(totalhp && (curhealth == totalhp)) {
		queue = 0;
	}
	queue--;

	if(queue <= 0) {
		healing = false;
		if(re = /Now you have ([\d,]+)/.exec(txt)) {
			overdiv.innerHTML = re[1] + " Left";
			setTimeout(fade_overdiv, 250);
		} else {
			fade_overdiv();
		}
	} else {
		if(queue > 1) {
			overdiv.innerHTML = "Queue: " + (queue - 1);
		} else {
			overdiv.innerHTML = "Healing";
		}
		make_heal_request(u);
	}
}

function fade_overdiv() {
	var new_opacity = 0.0;
	
	if(!healing) {
		new_opacity = parseFloat(overdiv.style.MozOpacity) - 0.1;
		if(new_opacity <= 0.0) {
			overdiv.style.MozOpacity = "0.0";
		} else {
			overdiv.style.MozOpacity = new_opacity;
			setTimeout(fade_overdiv, 25);
		}
	}
}

function find_health_span(obj) {
	var spans;
	
	spans = obj.getElementsByTagName("span");
	for(var i = 0; i < spans.length; i++) {
		if(/^Mini-.*health$/.exec(spans[i].title)) {
			return spans[i];
		}
	}
}

function heal_handler(client, u) {
	if(client.readyState == 4) {
		if(client.responseText.length > 0) {
			process_heal_response(client.responseText, u);
		}
	} else if(client.readyState == 3) {
		if(client.responseText.substr(Math.max(last_resp_length - 20, 0)).indexOf("Your Doppelpet Cage") > -1) {
			var txt = client.responseText;
			client.abort();
			process_heal_response(txt, u);
		} else {
			last_resp_length = client.responseText.length;
		}
	}
}

function make_heal_request(u) {
	var client = new XMLHttpRequest();
	client.onreadystatechange = function() {heal_handler(client, u);};
	client.open("GET", u);
	last_resp_length = 0;
	client.send("");
/*
	GM_xmlhttpRequest({
		method: 'GET',
		url: u,
		onload: function(responseDetails) {
							process_heal_response(responseDetails.responseText, u);
						}
	});
*/
}

function findPos(obj) {
	var curleft = 0;
	var curtop = 0;
	
	do {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
	} while (obj = obj.offsetParent);

	return [curleft, curtop];
}