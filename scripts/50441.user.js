// ==UserScript==
// @name          Skreemr batch search
// @namespace     http://patraulea.com/gm
// @description   Searches for a list of mp3s with skreemr
// @include       http://bug/skreemr/*
// @include       http://skreemr.com/*
// @include       */skreemrcfg.html
// ==/UserScript==

function byId(id) { return document.getElementById(id); }
function xpath(query) { return document.evaluate(query,
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); }
function getForm(name) { return document.forms.namedItem(name); }
function getElement(coll, name) { return coll.elements.namedItem(name); }
function trim(text) { return text
	.replace(/^[\n\r\t ]+/g , "")
	.replace( /[\n\r\t ]+$/g, "");
}

if (! byId("skreemr_cfg")) {
	var list, results, state, pos;
	var timer=false;
	
	function load() {
		listStr = GM_getValue("list", "")
			.replace(/\r/g, "")
			.replace(/\n+$/g, "")
			.replace(/\n\n+/g, "\n");
		list    = listStr.split("\n");

	    results = GM_getValue("results", "");
	    state   = GM_getValue("state", "0");
	    pos     = 1*GM_getValue("pos", "0");
	}
	
	function currentTrack() {
		var items = list[pos].split("\t");
		return items[0];
	}

	function currentQuery() {
		var items = list[pos].split("\t");
		var pair = items[2] + " " + items[3];
		return pair.replace(/[^a-zA-Z0-9 ]/g, " ");
	}

	function makeQuery() {
   		load();

		if (pos >= list.length) {
			alert("already finished");
			return false;
		}

		var query = currentQuery();
		GM_log("starting, pos=" + pos + " query=" + query);
		
		var sform = getForm("searchForm");
		getElement(sform, "q").value = query;

		GM_setValue("state", "1");
		sform.submit();
		
		return false;
	}

	function stop() {
		if (timer) {
			clearTimeout(timer);
			timer = false;
			alert("stop");
		}
		GM_setValue("state", "0");
		return false;
	}

	function cfg() {
		window.location = "http://patraulea.com/gm/skreemrcfg.html";
	}

	load();
		
	var nodes = xpath("//form[@name='searchForm']");
	if (nodes.snapshotLength == 1) {
		var form = nodes.snapshotItem(0);
		
		// init extra buttons
		var cmds = {"start":makeQuery, "stop":stop, "cfg":cfg};
		var first = true;
	
		for (cmd in cmds) {
			if (! first) {
				var span = document.createElement("span");
				span.innerHTML = "|";
				form.appendChild(span);
			}
			first = false;
	
			var a = document.createElement("a");
			a.innerHTML = cmd;
			a.addEventListener('click', cmds[cmd], false);
			form.appendChild(a);
		}
		
		// if started, collect result and schedule next query
		if (state == "1") {
			var query = getElement(getForm("searchForm"), "q").value;
			GM_log("query=" + query + " expecting=" + currentQuery());
			if (query == currentQuery()) {
				var links = xpath("//table[@class='resultbox']/tbody/tr/td/div/a[@rel='nofollow']");
				GM_log("#responses=" + links.snapshotLength);

				for (var l=0; l<links.snapshotLength; l++) {
					var a = links.snapshotItem(l);
					var href = a.href;
					var text = a.getElementsByTagName("span")[0].innerHTML;
					text = trim(text);

					GM_log("text=" + text + "\thref=" + href);
					results += [currentTrack(), text, href].join("\t") + "\n";
				}

				pos += 1;
				if (pos==list.length) {
					GM_log("finished");
					pos = 0;
					state = "0";
				}
				GM_log("new pos=" + pos);
				GM_setValue("pos", pos);
				GM_setValue("state", state);
				GM_setValue("results", results);

				if (state=="1") {
					var delay = Math.floor(10000 + 40000 * Math.random(Math.random()));
					GM_log("delay=" + delay);
					timer = setTimeout(makeQuery, delay);
				}
			}
		} else {
			GM_log("disabled, state=" + state);
		}
	}
} else {
	function fill() {
		byId("skreemr_results").innerHTML = GM_getValue("results", "");
		byId("skreemr_list").innerHTML    = GM_getValue("list", "");
		byId("skreemr_state").value       = GM_getValue("state", "");
		byId("skreemr_pos").value         = GM_getValue("pos", "");
	}

	function load() {
		var listStr = byId("skreemr_list").value;
		GM_setValue("list", listStr);
		GM_setValue("results", "");
		GM_setValue("state", "0");
		GM_setValue("pos", "0");
		
		fill();
		alert("list loaded; results, state and position reset");
		return false;
	}

	fill();
	byId("skreemr_load").addEventListener('click', load, false);

}
