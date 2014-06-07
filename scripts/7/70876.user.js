//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Base Uploader - Fleet Summary
// @description   Summarises Fleet On/Incoming To An Astro
// @include       *.astroempires.com/*
// @exclude       *.astroempires.com/home.aspx*
// @exclude       *.astroempires.com/login.aspx*
// @exclude       forum.astroempires.com/*
// @exclude       support.astroempires.com/*
// @exclude       wiki.astroempires.com/*
// @exclude       wiki.astroempires.com/*/*
// @exclude       *.astroempires.com/upgrade.aspx*
// @exclude       *.astroempires.com/tables.aspx*
// @exclude       *.astroempires.com/register.aspx*
// @exclude       *.astroempires.com/smilies.aspx*
// ==/UserScript==

//================================================================
//==========================SUM FLEET=============================
//================================================================

window.fleetSummer = {
	fleetData : new Array(),
	guildSummed : false,
	commaFormat : function (amount) {
		var delimiter = ",";
		amount = "" + amount;
		var a = amount.split('.', 2)
		var d = a[1];
		var i = parseInt(a[0]);
		if (isNaN(i)) {
			return '';
		}
		var minus = '';
		if (i < 0) {
			minus = '-';
		}
		i = Math.abs(i);
		var n = new String(i);
		var a = [];
		while (n.length > 3) {
			var nn = n.substr(n.length - 3);
			a.unshift(nn);
			n = n.substr(0, n.length - 3);
		}
		if (n.length > 0) {
			a.unshift(n);
		}
		n = a.join(delimiter);
		if (d == undefined || d.length < 1) {
			amount = n;
		} else {
			amount = n + '.' + d;
		}
		amount = minus + amount;
		return amount;
	},
	sumFleets : function() {	
		function getGuild(name) {
			var regex = /\[.*?\]/;
			result = regex.exec(name);
			if (result)
				return result[0];
			else
				return name;
		}

		rows = document
				.evaluate(
						"//table[@id='map_fleets']//table[@class='layout listing sorttable']//tr[@align='center']",
						document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
						null);
		if (rows.snapshotLength == 0)
			rows = document
					.evaluate(
							"//table[@id='base_fleets']//table[@class='layout listing sorttable']//tr[@align='center']",
							document, null,
							XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		
		
		if (rows.snapshotLength == 0)
			rows = document.evaluate("//table[@id='map_fleets']//tr[@align='center']",document, null,		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		
		if (!rows || rows.snapshotLength == 0)
			return;
		var formatNumbers = true;
		var addFleets = true;
		var now = new Date(), future = new Date();
		for ( var i = 0; i < rows.snapshotLength; i++) {
			var row = rows.snapshotItem(i);
			var size = parseInt(row.childNodes[3].firstChild.textContent);
			if (formatNumbers)
				row.childNodes[3].firstChild.textContent = fleetSummer.commaFormat(size);
			if (addFleets) {
				var player = row.childNodes[1].getAttribute("sorttable_customkey");
				var arrivalTimeCell = row.childNodes[2];
				var guild = getGuild(player);
				var incoming = (arrivalTimeCell.childNodes.length > 0);
				var incomingToday = false;
				row.setAttribute("guild", guild);
				if ((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id
						.indexOf('checked') != -1)
						&& (parseInt(arrivalTimeCell.title) >= 0)) {
					var time = arrivalTimeCell.title;
					future.setTime(now.getTime() + (time * 1000));
					incomingToday = (future.getDate() - now.getDate() == 0);
				}
				var incomingSize = incoming ? size : 0;
				var incomingTodaySize = incomingToday ? size : 0;
				fleetSummer.addFleetSize(guild, size, incomingSize, incomingTodaySize);
			}
		}
		fleetSummer.insertFleetSummary();
	},
	addFleetSize : function(guild, size, incomingSize, incomingTodaySize) {
		for ( var i = 0; i < fleetSummer.fleetData.length; i++) {
			if (fleetSummer.fleetData[i][0] == guild) {
				if (incomingSize == 0)
					fleetSummer.fleetData[i][1] = (fleetSummer.fleetData[i][1] + size);
				fleetSummer.fleetData[i][2] = (fleetSummer.fleetData[i][2] + incomingSize);
				fleetSummer.fleetData[i][3] = (fleetSummer.fleetData[i][3] + incomingTodaySize);
				fleetSummer.guildSummed = true;
				return;
			}
		}
		if (incomingSize == 0)
			fleetSummer.fleetData[fleetSummer.fleetData.length] = new Array(guild, size, 0, 0);
		else
			fleetSummer.fleetData[fleetSummer.fleetData.length] = new Array(guild, 0, incomingSize,
					fleetSummer.incomingTodaySize);
	},
	insertFleetSummary : function() {
		var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
		var style = "";
		var incoming, arrived, incomingToday, total;
		var formatNumbers = true;
		for ( var i = 0; i < fleetSummer.fleetData.length; i++) {
			incoming = fleetSummer.fleetData[i][2];
			arrived = fleetSummer.fleetData[i][1];
			total = fleetSummer.fleetData[i][1] + fleetSummer.fleetData[i][2];
			incomingToday = fleetSummer.fleetData[i][3];
			if (formatNumbers) {
				incoming = fleetSummer.commaFormat(incoming);
				arrived = fleetSummer.commaFormat(arrived);
				incomingToday = fleetSummer.commaFormat(incomingToday);
				total = fleetSummer.commaFormat(total);
			}
			html = html + "<tr align='center' " + style + "><td>"
					+ fleetSummer.fleetData[i][0] + "</td><td>" + incoming + " ("
					+ incomingToday + ")</td><td>" + arrived + "</td><td>"
					+ total + "</td><td><a id='showHide" + fleetSummer.fleetData[i][0]
					+ "' href='javascript: void(0)'>Hide</a></td></tr>";
		}
		var newTable = document.createElement("table");
		newTable.setAttribute("class", "box-complex box box-full");
		newTable.setAttribute("align", "center");
		newTable.setAttribute("width", "600");

		newTable.innerHTML = html;
		var table = document.evaluate("//table[@id='base_fleets']", document,
				null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		if (!table)
			table = document.evaluate("//table[@id='map_fleets']", document,
					null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		table.parentNode.insertBefore(newTable, table);
		var br = document.createElement("br");
		table.parentNode.insertBefore(br, table);
		for ( var i = 0; i < fleetSummer.fleetData.length; i++) {
			var link = document.getElementById("showHide" + fleetSummer.fleetData[i][0]);
			link.addEventListener('click',
					fleetSummer.getShowHideFleetClosure(fleetSummer.fleetData[i][0]), true);
		}
	},
	getShowHideFleetClosure : function(guild) {
		function func() {
			var guildRows = document.evaluate("//tr[@guild='" + guild + "']",
					document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
					null);
			for ( var i = 0; i < guildRows.snapshotLength; i++) {
				var row = guildRows.snapshotItem(i);
				row.style.display = (row.style.display == "none") ? "" : "none";
				row.style.visibility = (row.style.visibility == "hidden") ? ""
						: "hidden";
			}
			var link = document.getElementById("showHide" + guild);
			link.textContent = (link.textContent == "Show") ? "Hide" : "Show";
		}
		;
		return func;
	}
}
fleetSummer.sumFleets();




//================================================================
//=========================END SUM FLEET==========================
//================================================================