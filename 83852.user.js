// ==UserScript==
// @name           BvS Scratchies v4
// @namespace      TheSpy
// @version        4.00 Initial re-release (beta 3.00) [CCobo36]
// @version        4.00 Improved win chance, no more waiting time [CCobo36]
// @history        4.00 Added a button to move the GUI [TheSpy]
// @history        3.01 Added a button to move the GUI [TheSpy]
// @history        3.00 Initial re-release (beta 3.00) [TheSpy,North]
// @history        3.00.1 Improved the GUI (is now drag-able) [TheSpy]
// @history        3.00.2 Changed from functions to a single class [TheSpy]
// @history        3.00.3 Serverside optimizations [North]
// @history        2.08 Serverside and clientside optimizations [North]
// @history        2.07 Improved scratchy logic (no queries on won/lost&unfinished tickets) [North]
// @history        2.06 Removed images [TheSpy]
// @history        2.05 Updated with game update (removed randoms) [TheSpy]
// @history        2.04 Moved server [TheSpy]
// @history        2.03 Added yellow & green color for random spots [TheSpy]
// @history        2.02 Fixed 'text[1] is undefined' error [TheSpy]
// @history        2.01 Changed GET to POST [TheSpy]
// @history        2.00 Initial re-release (beta 2.00) [TheSpy]
// @history        1.00 Initial re-release (beta 1.00) [TheSpy,rveach]
// @description    Play the minigame Scratchies!
// @include        http://www.animecubed.com/billy/bvs/partyhouse.html
// @include        http://animecubed.com/billy/bvs/partyhouse.html
// ==/UserScript==

// server version
var serverVersion = "3.01";
var hotkeyEnable = false;


/*
	DOM Storage wrapper class (credits: http://userscripts.org/users/dtkarlsson)
	Constructor:
		var store = new DOMStorage({"session"|"local"}, [<namespace>]);
	Set item:
		store.setItem(<key>, <value>);
	Get item:
		store.getItem(<key>[, <default value>]);
	Remove item:
		store.removeItem(<key>);
	Get all keys in namespace as array:
		var array = store.keys();
*/
function DOMStorage(type, namespace) {
	var my = this;

	if (typeof(type) != "string")
		type = "session";
	switch (type) {
		case "local": my.storage = localStorage; break;
		case "session": my.storage = sessionStorage; break;
		default: my.storage = sessionStorage;
	}

	if (!namespace || typeof(namespace) != "string")
		namespace = "Greasemonkey";

	my.ns = namespace + ".";
	my.setItem = function(key, val) {
		try {
			my.storage.setItem(escape(my.ns + key), val);
		}
		catch (e) {
			GM_log(e);
		}
	},
	my.getItem = function(key, def) {
		try {
			var val = my.storage.getItem(escape(my.ns + key));
			if (val)
				return val;
			else
				return def;
		}
		catch (e) {
			return def;
		}
	}
	// Kludge, avoid Firefox crash
	my.removeItem = function(key) {
		try {
			my.storage.setItem(escape(my.ns + key), null);
		}
		catch (e) {
			GM_log(e);
		}
	}
	// Return array of all keys in this namespace
	my.keys = function() {
		var arr = [];
		var i = 0;
		do {
			try {
				var key = unescape(my.storage.key(i));
				if (key.indexOf(my.ns) == 0 && my.storage.getItem(key))
					arr.push(key.slice(my.ns.length));
			}
			catch (e) {
				break;
			}
			i++;
		} while (true);
		return arr;
	}
}

// UI (credits: http://userscripts.org/users/dtkarlsson)
function Window(id, storage) {
	var my = this;
	my.id = id;
	my.offsetX = 0;
	my.offsetY = 0;
	my.moving = false;
	my.element = document.createElement("div");
	my.elementContainer = document.createElement("div");
	my.elementDrag = document.createElement("div");

	// Window dragging events
	my.drag = function(event) {
		if (my.moving) {
			my.elementContainer.style.left = (event.clientX - my.offsetX)+'px';
			my.elementContainer.style.top = (event.clientY - my.offsetY)+'px';
			event.preventDefault();
		}
	}
	my.stopDrag = function(event) {
		if (my.moving) {
			my.moving = false;
			var x = parseInt(my.elementContainer.style.left);
			var y = parseInt(my.elementContainer.style.top);
			if(x < 0) x = 0;
			if(y < 0) y = 0;
			storage.setItem(my.id + ".coord.x", x);
			storage.setItem(my.id + ".coord.y", y);
			my.elementContainer.style.opacity = 1;
			my.elementDrag.removeEventListener('mouseup', my.stopDrag, true);
			my.elementDrag.removeEventListener('mousemove', my.drag, true);
		}
	}
	my.startDrag = function(event) {
		if (event.button != 0) {
			my.moving = false;
			return;
		}
		my.offsetX = event.clientX - parseInt(my.elementContainer.style.left);
		my.offsetY = event.clientY - parseInt(my.elementContainer.style.top);
		my.moving = true;
		my.elementContainer.style.opacity = 0.75;
		event.preventDefault();
		my.elementDrag.addEventListener('mouseup', my.stopDrag, true);
		my.elementDrag.addEventListener('mousemove', my.drag, true);
	}

	my.elementContainer.id = id;
	my.elementDrag.className = "drag";
	my.elementDrag.innerHTML = "<img alt=\"MOVE\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAwBQTFRFlTcEzraSAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAn9OuygAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuM6DpWdUAAABTSURBVChTbVFRFgAgBOP+l85IxHx4M2IkQk2XWVlyHSWJLjf/UHQOtoBBnSTy1R3Q4+4sjpry6DnV+yBK0ud8UEr+JWE2E0/XdA3zIHvNcWb+GQe/9ADpBBwp3wAAAABJRU5ErkJggg==\"/>";
	document.body.appendChild(my.elementContainer);
	my.elementContainer.appendChild(my.element);
	my.elementContainer.appendChild(my.elementDrag);
	my.elementDrag.addEventListener('mousedown', my.startDrag, true);

	if (storage.getItem(my.id + ".coord.x"))
		my.elementContainer.style.left = storage.getItem(my.id + ".coord.x") + "px";
	else
		my.elementContainer.style.left = "6px";
	if (storage.getItem(my.id + ".coord.y"))
		my.elementContainer.style.top = storage.getItem(my.id + ".coord.y") + "px";
	else
		my.elementContainer.style.top = "6px";
}

function FloatingScratchy() {
	var my = this;

	my.scratchy = "";
	my.pickCount = 0;
	my.bestPick = "";
	my.superPicked = false;
	my.query = new Array();

	// Tick and Scratch (browser)
	my.browserScript = ""+<r><![CDATA[
		function tickAndScratch() {
			document.getElementById("cb0").checked = true;
			document.getElementById("cb1").checked = true;
			document.getElementById("cb2").checked = true;
			document.getElementById("cby0").checked = true;
			document.mainform2.submit();
		}

		function UpdateSpot(className, count, prize) {
			if(className.length == count.length) {
				for(i = 0; i < className.length; i++) {
					var td = document.getElementById("sid" + i);
					td.className = className[i];
					td.innerHTML = "[" + count[i] + "]";
				}
				var span = document.getElementById("prize");
				span.innerHTML = prize;
			}
		}

	]]></r>+"";

	my.window = new Window("bvsScratchy", scratchySettings);

	// style
	GM_addStyle("#bvsScratchy {border: 2px solid #953704; position: fixed; z-index: 100; color: #000000; background-color: #EDD2A7; padding: 4px; text-align: left; min-width: 240px; min-height: 32px;} #bvsScratchy, #bvsScratchy * {font-size: 12px; font-family: arial;} #bvsScratchy dl {margin: 0; padding: 0;} #bvsScratchy dt {margin: 0; padding-top: 5px; font-size: 12px;} #bvsScratchy dd {margin: 0; padding: 0; font-size: 18px;} #bvsScratchy a {color: #A10000; font-weight: bold;} #bvsScratchy .drag {cursor: move; position:absolute; top: 5px; right:5px;} .high { font-weight: bold; color: #FFFF00; text-decoration: blink; } .mhigh { font-weight: bold; color: #00FF00; } .normal { font-weight: bold; } .mlow { font-weight: bold; color: #FF0000; } .low { font-weight: bold; color: #7F0000; text-decoration: line-through; } .special { font-weight: bold; border: 1px dotted white; background-color: #333;}");

	// get player's name
	my.playerName = function() {
		try {
			return document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;
		}
		catch (e) {
			return "none";
		}
	}

	// parse the ticket
	my.parseImages = function() {
		try {
			var shown = new Array();
			var fail = false;

			var images = document.evaluate("//form[@name='mainform2']//img[contains(@src, '/billy/layout/scratch')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for(var i = 0; i < images.snapshotLength; i++) {
				var img = images.snapshotItem(i);
				var src = img.src;

				var visible = !/scratchspot.jpg$/i.test(src);
				var xSpot = /[^\d]X.jpg$/.test(src);
				var bonus = i >= 20;

				if(visible && !xSpot)
					my.pickCount++;

				if(visible && !xSpot && bonus)
					my.superPicked = true;

				if(xSpot)
					shown.push(i);

				if(!visible){
					my.scratchy += "-";
				}else{
					switch(src[src.indexOf("scratch") + 7]){
						case 'S':
							my.scratchy += "S";
							break;
						case 'J':
							my.scratchy += "B";
							break;
						case 'P':
							my.scratchy += "P";
							break;
						case 'N':
							my.scratchy += "L";
							break;
						case '1':
							my.scratchy += "1";
							break;
						case '2':
							my.scratchy += "2";
							break;
						case '3':
							my.scratchy += "3";
							break;
					}

					if(!xSpot && !bonus) {
						if(my.bestPick == "")
							my.bestPick = my.scratchy[i];
						else if(my.bestPick != my.scratchy[i])
							fail = true;
					}
				}
			}

			// If billy bonus choosen and nothing else, go for claymore
			if (my.pickCount == 1 && my.superPicked == true && /B/.exec(my.scratchy.substr(20)) )
			{
				my.bestPick = "B";
			}



			if(fail)
				my.bestPick = "F";
			else if(my.bestPick == "")
				my.bestPick = "S";

			if(shown.length > 0 && my.pickCount == 0)
				scratchySettings.setItem(my.playerName() + ".show", shown.join());
		}
		catch(e) {
			alert("Exception caught!\n\nError name: " + e.name + "\nError message: " + e.message);
		}

	}

	// used to create the bloodline string
	my.hiddenSpots = function(n) {
		var temp = "";
		for(var i = 0; i<n; i++)
			temp += "-";
		return temp;
	}

	// create bloodline string
	my.getBloodline = function() {
		var bloodline;
		var lsShow = scratchySettings.getItem(my.playerName() + ".show").split(",");
		var show = [];

		for(var i = 0; i<lsShow.length; i++){
			show.push(parseInt(lsShow[i]));
		}

		if(lsShow.length == 0)
			bloodline = my.hiddenSpots(25);
		else{
			bloodline = my.hiddenSpots(show[0]) + my.scratchy[show[0]];
			if(lsShow.length == 1)
				bloodline += my.hiddenSpots(24-show[0]);
			if(lsShow.length == 2)
				bloodline += my.hiddenSpots(show[1]-show[0]-1) + my.scratchy[show[1]] + my.hiddenSpots(24-show[1]);
		}

		return bloodline;
	}

	// add a script
	my.addBrowserScript = function(script) {
		var head = document.getElementsByTagName("head")[0];
		var node = document.createElement("script");
		node.type = "text/javascript";
		node.innerHTML = script;
		head.appendChild(node);
	}

	// send a xml HTTP request
	my.queryServer = function(query) {
		try {
			GM_xmlhttpRequest({
				method: "POST",
				url: "http://bvs.ecansol.com/scratchies.php",
				headers: {
					"User-Agent": "Mozilla/5.0",
					"Accept": "text/xml",
					"Content-type": "application/x-www-form-urlencoded"
				},
				data: encodeURI(query),
				onerror: function(response) {
					alert("BvS Scratchies failed!");
				},
				onload: function(response) {
					try {
						// Re-enable the hotkey
						hotkeyEnable = true;

						var text = response.responseText.split("|");
						var suc = 0;
						try {
							suc = parseInt(text[0]);
						}
						catch(e) {
							suc = -1;
						}
						switch(suc) {
							case 1: {
								my.update(4, text[1]);
							} break;
							case 2: {
								my.update(1, text[1]);
							} break;
							default: {
								alert("Error!\n\n" + response.responseText);
							} break;
						}
					}
					catch(e) {
						alert("Exception caught!\n\nError name: " + e.name + "\nError message: " + e.message);
					}
				}
			});
		}
		catch(e) {
			alert("Exception caught!\n\nError name: " + e.name + "\nError message: " + e.message);
		}
	}

	// Update the strategy information in DOM storage
	my.updateStrategy = function(event) {

		var objAnchor = event.target;
		var strategy_url = objAnchor.getAttribute("stratLocation");

		alert("Updating from: " + strategy_url);
		GM_xmlhttpRequest({
			method: "POST",
			url: strategy_url,
			headers: {
				"User-Agent": "Mozilla/5.0",
				"Accept": "text/xml",
				"Content-type": "application/x-www-form-urlencoded"
			},
			onload: function(response) {
				var stratArray = response.responseText.split("\n");

				var scratchySettings = new DOMStorage("local", "BvSScratchies");

				var i=0;
				for (i=0; i<95; i++)
				{
					var temp = stratArray[i].split("#");
					var bloodline = temp[0];
					var infostring = temp[1];
					scratchySettings.setItem(bloodline, infostring);
				}
				alert("Strategy Update Complete");
			}
		});
	}

	// Build the html for a given stats object
	my.htmlStrategy = function(stats) {

		// Initialize the html string
		var html = "";

		// Initialize item names and winnings
		var item_list     = new Array("Claymore", "ShoNuff", "26 Buckets", "Goldens", "Yomas", "Supers");
		var winnings_list = new Array(stats.claymore, stats.shonuff, stats.buckets, stats.golden, stats.yoma, stats.super);

		// Build the Info table
		html += "<div><b>Aggregate Winnings:<b> &nbsp &nbsp (" + stats.numcards + " tickets)<br><table>";

		var i;
		for (i=0;i<6;i++) {
			html += "<tr><td><b>" + item_list[i] + ":</b></td>";
			html += "<td>" + winnings_list[i] + "<td>("
				+ Math.round(winnings_list[i] * 100.0 * 1000/ stats.numcards)/1000 + "%)</td></tr>";
		}

		html += "</table></div>";

		return html;
	}

	// Scratch suggested strategy spot and build html for popup statistics
	my.doStrategy = function() {

		var scratchySettings = new DOMStorage("local", "BvSScratchies");

		// Get the strategy data
		var info = scratchySettings.getItem(my.getBloodline(), "Error Code GAMMA").split("~");

		// Extract All info about the first scratch
		var first  = new Object();
		var second = new Object();
		var final  = new Object();

		first.info = info[0].split(",");
		first.claymore = 0;
		first.shonuff  = first.info[1];
		first.buckets  = 0;
		first.golden   = 0;
		first.yoma     = 0;
		first.super    = 0;
		first.spot     = parseInt(first.info[6]);
		first.numcards = first.info[7];

		document.getElementById("cb" + (first.spot > 19 ? "y" + (first.spot - 20) : first.spot) ).checked=true;


		second.info = info[2];
		second.info = second.info.split("&");
		second.spot     = parseInt(second.info[0].split(",")[6]);

		document.getElementById("cb" + (second.spot > 19 ? "y" + (second.spot - 20) : second.spot) ).checked=true;


		final.info = second.info[2];
		final.spot0 = parseInt(final.info.split(",")[0]);
		final.spot1 = parseInt(final.info.split(",")[1]);

		document.getElementById("cb" + (final.spot0 > 19 ? "y" + (final.spot0 - 20) : final.spot0) ).checked=true;
		document.getElementById("cb" + (final.spot1 > 19 ? "y" + (final.spot1 - 20) : final.spot1) ).checked=true;

		return my.htmlStrategy(first);

	}

	// update the layer
	my.update = function(success, text) {

		var html = "";
		switch(success) {
			case 0: { // init
				html = "Loading. Please wait...";
			} break;
			case 1: { // query returned
				alert("Error Code BACON: unreachable code");
			} break;
			case 2: { // failed
				html = "Ticket Failed.<br/><a href=\"javascript:tickAndScratch();\">Scratch Spots &gt;</a>";
			} break;
			case 3: { // won
				html = "Ticket Won.<br/><a href=\"javascript:document.mainform2.submit();\">Get New Ticket &gt;</a>";
			} break;
			case 4: { // message
				html = text;
			} break;
		}

		// Links for updating strategy.txt file
		html =  '<b>Select a strategy:</b>' +
			'<br /><a stratLocation="http://bvs.ecansol.com/strat_shonuff.txt" href="javascript:void(0)" id="aStratShonuff">Maximum Shonuff &gt;</a> ' +
			'<br /><a stratLocation="http://bvs.ecansol.com/strat_claymore.txt" href="javascript:void(0)" id="aStratClaymore">Maximum Claymore &gt;</a>' +
			'<br /><a stratLocation="http://bvs.ecansol.com/strat_value.txt" href="javascript:void(0)" id="aStratRyo">Maximum Ryo Value &gt;</a>' +
			'<br /><a stratLocation="http://bvs.ecansol.com/strat_count.txt" href="javascript:void(0)" id="aStratWin">Maximum Win Chance &gt;</a>' +
			'<br /><br />' +
			html;

		my.window.element.innerHTML = html;

		// Add events to strategy links for greasemonkey function callback
		document.getElementById("aStratShonuff" ).addEventListener("click", my.updateStrategy, true);
		document.getElementById("aStratClaymore").addEventListener("click", my.updateStrategy, true);
		document.getElementById("aStratRyo"     ).addEventListener("click", my.updateStrategy, true);
		document.getElementById("aStratWin"     ).addEventListener("click", my.updateStrategy, true);
	}

	my.update(0);
	my.addBrowserScript(my.browserScript);
	my.parseImages();

	if(my.scratchy.length == 25) {
		if(my.bestPick != "F" && my.pickCount < 4) {
			// Use Enhanced algorithm from local DOM storage
			var html = my.doStrategy();
			hotkeyEnable = true;
			my.update(4,html);
		}
		else if (my.bestPick == "F" && my.pickCount == 4) {
			// Send query to server for failed ticket
			my.query.push("scratchy=" + my.scratchy);
			my.query.push("bloodline=" + my.getBloodline());
			my.query.push("bestPick=" + my.bestPick);
			my.query.push("show=" + scratchySettings.getItem(my.playerName() + ".show"));
			my.query.push("superPicked=" + my.superPicked);
			my.query.push("player=" + my.playerName());
			my.query.push("version=" + serverVersion);
			my.queryServer(my.query.join("&"));
		}
		else{
			if(my.pickCount < 4) {
				// Failed ticket which needs remaining spots scratched
				document.getElementById("cb0").checked = true;
				document.getElementById("cb1").checked = true;
				document.getElementById("cb2").checked = true;
				document.getElementById("cby0").checked = true;
				hotkeyEnable = true;
				my.update(2);
			}
			else {
				// Winning ticket
				hotkeyEnable = true;
				my.update(3);
			}
		}
	}
}

var headerText = document.evaluate("//font/font/b[text()='Scratchy Tickets']/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
if(headerText != null && headerText.snapshotLength == 1) {
	var scratchySettings = new DOMStorage("local", "BvSScratchies");
	var scratchyWindow = new FloatingScratchy();
}

// Hotkey listeners

function KeyCheck(event) {
	var KeyID = event.keyCode;

	// Enter Key OR S Key
	if (hotkeyEnable && (KeyID == 13 || KeyID == 83))
		unsafeWindow.document.mainform2.submit();
}

document.documentElement.addEventListener("keyup", KeyCheck, true);
