// JavaScript Document
// ==UserScript==
// @name      Ikariam Donation Logger ("mobile" version)
// @autor     roselan
// @version    0.2.1
// @license    GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace   ikariamScript
// @description  Display donations over time
// @include    http://m*.ikariam.*/*
// @exclude    http://board.ikariam.*/*
// @require    http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==
$(document).ready(function(){
	
	console.time('donationLogger listeners');
	
	// linkify resources
	var $resources = $("#cityResources .resources"),
		islandId = $("#changeCityForm li.viewIsland a").attr("href").split("=").pop();
		
	$resources.find("li.wood, li.wine, li.marble, li.glass, li.sulfur").mouseover( function () {
		this.style.cursor = 'pointer';
	});
	$resources.find("li.wood").click( function () {
		document.location = "/index.php?view=resource&type=resource&id=" + islandId;
	});
	$resources.find("li.wine, li.marble, li.glass, li.sulfur").click( function () {
		document.location = "/index.php?view=tradegood&type=tradegood&id=" + islandId;
	});	
	console.timeEnd('donationLogger listeners');
	
	
	console.time('donationLogger execution');
	// get and display past donations info
	donationLogger.run();
	console.timeEnd('donationLogger execution');
	
});
console.time('donationLogger definition');

// donationLogger module
var donationLogger = (function () {
		
		// donationLogger "global" vars set in init()
		var isResource,
			isTradegood,
			host, 
			resourceType,
			islandId,
			id,
			today,
			donation,
			$islandData,
			islandDonations,
			lastDonation,
			newDonationFound,
			langData,
			timeFrameOption,
			timeFrame; 
		
		
		// ** helper functions **
		
		// ** get last donation according to timeFrame **
		// The last donation reflects the actual situation. So, when a donation is
		// found within the target date range, the donation before this found one
		// is needed in order to compute the the difference with "now".
		// This is where all "intelligence" is, and the logic is often very counterintuive.
		// you have to remember the concept of timeframe is a chunk of time going backward
		// from "now". Hence, hour is "greater" than year, as it finishes later.
		// -> targetDate = now - timeframe. The more the period rises, the more donations
		// amount increases.
		var getTargetDonation = function () {
		
			var len = islandDonations.length,
				i = 1,
				targetDate = today - timeFrame;
			
			// if no entry in log, return.
			if ( !len ) return false;
			
			// get "timeFrame" "last donation"
			// the donation before the last one (wich is len -1) is needed, so it's len-2
			// if there is only one donation set for the island, return it (in order to not display "0" difference, and not total amounts the first time donationLogger is used)
			if ( timeFrame == 0 ) return len == 1 ? islandDonations[0] : islandDonations[len -2];				
			
			// search for first donation within the time frame.
			for ( ; i < len; i++) {
				var donationDate = islandDonations[i].date;
				//console.log(i, new Date(donationDate), new Date(targetDate), (islandDonations[i].date >= targetDate));
				if (donationDate >= targetDate) {
					//console.log('target date found!', i, new Date(islandDonations[i].date), islandDonations[i].players);					
					return islandDonations[i -1];				
				}			
			}
			
			// no donation found within the timeFrame, so return the lastest one
			return islandDonations[len -1];
			
		}
		
		
		var getPlayerDonation = function (players, id) {
			return players[id] ? players[id]-0 : 0;
		}		
		
		var getTimeFrame = function () {
			var hour = 1000 * 60 * 60;			
			switch (timeFrameOption) {
				case "hour"	: return hour;
				case "day"	: return hour * 24;
				case "week"	: return hour * 24 * 7;
				case "month": return hour * 24 * 30;
				case "year"	: return hour * 24 * 365;
				case "first": return hour * 24 * 365 * 10;
				case "last"	: return 0;			
				default		: return hour;
			}		
		}
		
		var getSelfId = function () {
			var selfId = localStorage.getItem(host+".selfId")-0;
			if (!selfId) {
				$.ajaxSetup({async:false});
				$.get("index.php", {view: "options", page: "game"}, function (data) {
					selfId = $('#options_debug > table > tbody > tr > td', data).eq(0).text() -0; //.replace(/^\s+/g,'').replace(/\s+$/g,'');
					localStorage.setItem(host+".selfId", selfId);					
				});
				$.ajaxSetup({async:true});
			}
			return selfId;
		}
		
		
		// technical stuff
		var formatNumber = function (x) {
			while (x.match(/^\d\d{3}/)){
			  x = x.replace(/(\d)(\d{3}(\.|,|$))/, '$1,$2');
			}
			return x;
		}
		
				
		// save donations	
		var saveDonations = function () {
			if (!lastDonation || newDonationFound) {
				islandDonations.push(donation);
				localStorage.setItem(id, JSON.stringify(islandDonations));
			}			
		}
						
		// Language
		var getLangData = function ()	{
			var urlParts = host.split('.'),
				lang = urlParts[urlParts.length - 1];
			if (lang == "com" && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
				lang = urlParts[1];
			}
			if (lang == "net" && urlParts.length == 3) { //for example: http://s1.ikariam.net/
				lang = "tr";
			}		
			
			switch (lang) {			
				// French
				case 'fr': 
					return {
						tLast	: 'Dernier', 
						tHour	: 'Heure', 
						tDay	: 'Jour', 
						tWeek	: 'Semaine', 
						tMonth	: 'Mois', 
						tYear	: 'Année', 
						tFirst	: 'Premier', 
						tTitle	: 'Période pour les nouvelles donations', 
						tDiff	: 'Différence' }; 
				// English default
				default :
					return {
						tLast	: 'Last change', 
						tHour	: 'Hour', 
						tDay	: 'Day', 
						tWeek	: 'Week', 
						tMonth	: 'Month', 
						tYear	: 'Year', 
						tFirst	: 'First change', 
						tTitle	: 'Period for new donations', 
						tDiff	: 'Difference' }; 
			}				
		}
		
		// ** init **
		var init = function () {
			// get various id
			host = window.location.host;
			resourceType = isResource ? "W" : "P";
			islandId = $("#changeCityForm li.viewIsland a").attr("href").split("=").pop();
			id = host+"."+islandId+"."+resourceType;
			today = new Date().getTime();
			donation = {date: today, players: {}};
			islandData = localStorage.getItem(id);
			islandDonations = JSON.parse(islandData) || [];
			lastDonation = islandDonations[islandDonations.length -1];
			newDonationFound = false,
			langData = getLangData(),
			timeFrameOption = localStorage.getItem(host+".timeFrame"),
			timeFrame = getTimeFrame();			
		}
		
		// ** display timeframe options **
		var drawOptions = function () {
			
			$("#resourceUsers > .content > table > thead > tr > th").eq(4).after("<th>" + langData['tDiff'] + "</th>");
			
			var ctn			= "class=DonationLoggerOption type=radio name=DonationLoggerOption",
				//timeFrames	= ['last', 'hour', 'day', 'week', 'month', 'year', 'first'],
				//colWidths	= [15, 14, 14, 14, 14, 14, 15],
				//i			= 0,				
				options 	= "";
			options += "<div id=DonationLoggerOptions>";
			options += "<h3 class=header>" + langData['tTitle'] + "</h3>";
			options += "<table cellpadding=0 cellspacing=0 class=header><tbody>";
			
			/*
			options += "<tr>";
			for ( ; i < 7 ; i++ ) {
				var width = colWidths[i],
					rId = 'r'+(i+1),
					val = timeFrames[i],
					checked = timeFrames[i] === timeFrameOption ? ' checked' : '',
					lang = langData['t' + timeFrames[i].charAt(0).toUpperCase() + timeFrames[i].slice(1)];
					
				options += "<td width=" + width + "%><input id=" + rId + ctn;
				options += "value=" + val + checked + "> " + lang	+ "</input></td>";
			}
			options += "</tr>";
			*/
			
			options += "<tr>";
			options += "<td width=15%><input " + ctn + " value=last "  + (timeFrameOption == "last"  ? "checked" : "")	+ "> " + langData['tLast']	+ "</input></td>";
			options += "<td width=14%><input " + ctn + " value=hour "  + (timeFrameOption == "hour"  ? "checked" : "")	+ "> " + langData['tHour']	+ "</input></td>";
			options += "<td width=14%><input " + ctn + " value=day "   + (timeFrameOption == "day"   ? "checked" : "") 	+ "> " + langData['tDay']	+ "</input></td>";
			options += "<td width=14%><input " + ctn + " value=week "  + (timeFrameOption == "week"  ? "checked" : "")	+ "> " + langData['tWeek']	+ "</input></td>";
			options += "<td width=14%><input " + ctn + " value=month " + (timeFrameOption == "month" ? "checked" : "")	+ "> " + langData['tMonth']	+ "</input></td>";
			options += "<td width=14%><input " + ctn + " value=year "  + (timeFrameOption == "year"  ? "checked" : "")	+ "> " + langData['tYear']	+ "</input></td>";
			options += "<td width=15%><input " + ctn + " value=first " + (timeFrameOption == "first" ? "checked" : "")	+ "> " + langData['tFirst'] + "</input></td>";	
			options += "</tr>";
			
			options += "<tbody></table></div>";
			
			$('#resourceUsers').prepend(options);	
		
			// radio button listener
			$('#DonationLoggerOptions').on('change', 'input.DonationLoggerOption', function () {
				timeFrameOption = this.value;
				timeFrame = getTimeFrame();
				localStorage.setItem(host+".timeFrame", this.value);			
				drawDonations();				
			});
		
		}

		
		// ** display donations **
		var drawDonations = function () {	
			var targetDonation = getTargetDonation();
			newDonationFound = false;
			$("#resourceUsers > .content > table > tbody > tr[class*=avatar]").each( function () {
				var playerRef = $("td.actions > a", this).attr("href");
				var playerId = playerRef ? playerRef.split("=").pop()-0 : getSelfId();
				var amount = $("td.ownerDonation", this).text().replace(/,/gi, "") -0;
				donation.players[playerId] = amount;
			
				if ($("td.donationLog", this)) $("td.donationLog", this).remove();
				
				var donationElem = "<td class=donationLog align=right>";
				if (targetDonation) {
					//if (playerId == 908) 
					//console.log('thing', playerId, typeof playerId, amount, getPlayerDonation(targetDonation.players, playerId), targetDonation.players[playerId], targetDonation.players);
					donationElem += formatNumber((amount - getPlayerDonation(targetDonation.players, playerId)).toString());
				}
				donationElem += "</td>";
				$("td.ownerDonation", this).after(donationElem);
			
				if (!newDonationFound && lastDonation) {				
					if (amount != getPlayerDonation(lastDonation.players, playerId)) {
						//console.log("new dontation for" +playerId +": "+amount + " "+getPlayerDonation(lastDonation, playerId));
						newDonationFound = true;
					}
				}
			});
			
		}

		/*
		// convert all donation set to replace user name by user id when users switch from v 0.1.1 to a newer version. This funtion Will be deleted at release.
		function convert () {
			$("#resourceUsers > .content > table > tbody > tr[class*=avatar]").each( function () {
				var playerName = $("td.ownerName", this).text();
				var playerId;
				var playerRef = $("td.actions > a", this).attr("href");
				if (playerRef) {
					playerId = playerRef.split("=").pop();
				}
				else {				
					playerId = getSelfId();
				}			
				for (var i = 0; i<islandDonations.length; i++) {
					for (var j = 0; j<islandDonations[i].players.length; j++) {
						if (islandDonations[i].players[j].name == playerName) {
							
							islandDonations[i].players[j].name = playerId;
						};					
					}				
				}			
			});		
			localStorage.setItem(id, JSON.stringify(islandDonations));
		}
		
		function convert2() {
			islandDonations = eval(GM_getValue(id, []));	
			localStorage.setItem(id, JSON.stringify(islandDonations));
			GM_deleteValue(id);
		}
		
		function convert3() {
			var obj = [];
			
			if (typeof islandDonations[0].date != 'number') {
				for (var i in islandDonations) {
					if (typeof islandDonations[0].date != 'number') { 
						//console.log(i, typeof islandDonations[i].date);
						var dt = new Date(islandDonations[i].date);
						obj[i] = {};
						obj[i].date = dt.getTime();
						obj[i].players = islandDonations[i].players;
					}
				}
				//console.log(obj);
				islandDonations = obj;			
			}
			//console.log(obj);
			
			obj = [];
			for (var i in islandDonations) {
				//console.log(i, typeof islandDonations[i].players, islandDonations[i].players.length, islandDonations[i].players);
				if (typeof islandDonations[i].players != 'array') {
					var island = {};
					for (var player in islandDonations[i].players) {
						if (islandDonations[i].players[player].name) {						
							island[islandDonations[i].players[player].name] = islandDonations[i].players[player].amount;					
						}
						else {
							island[player] = islandDonations[i].players[player];
						}
					}
					obj[i] = {};
					obj[i].date = islandDonations[i].date;
					obj[i].players = island;
					//console.log(obj[i]);
				}
			}
			islandDonations = obj;
					
			//localStorage.setItem(id, JSON.stringify(islandDonations));
			//console.log('c4', islandDonations);
			
				
		}
		*/
		/*
		function convert4() {
			var obj = [];
			for (var i in islandDonations) {
				//console.log(i, typeof islandDonations[i].players, islandDonations[i].players.length, islandDonations[i].players);
				if (typeof islandDonations[i].players != 'array') {
					var island = {};
					for (var player in islandDonations[i].players) {
						if (player.replace(/^\s+/g,'').replace(/\s+$/g,'') !== player) console.log('"'+player+'"');
						//var newPlayer = player-0; //player.replace(/^\s+/g,'').replace(/\s+$/g,'');
						var np = player == "NaN" ? getSelfId() : player-0
						island[np] = islandDonations[i].players[player]-0;
					}
					obj[i] = {};
					obj[i].date = islandDonations[i].date;
					obj[i].players = island;
					//console.log(obj[i]);
				}
			}
			islandDonations = obj;
					
			localStorage.setItem(id, JSON.stringify(islandDonations));
			//console.log('c4', islandDonations);
			
				
		}
		*/

		
		return {
			run: function () {
				
				isResource = $("#resource").length;
				isTradegood = $("#tradegood").length;
		
				if ( isResource || isTradegood ) {
					
					// convert tools for different versions... shall be deleted "soon (tm)".
					//if (islandDonations && islandDonations.length > 0 && !(islandDonations[0].players[0].name-0)) convert();
					//if (!islandDonations) convert2();
					//convert3();
					//convert4();		
					
					// "main"
					init();					
					drawOptions();
					drawDonations();
					saveDonations();	
				}
			}
		}
		
	})(donationLogger);	
	
	console.timeEnd('donationLogger definition');