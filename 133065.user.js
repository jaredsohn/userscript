// JavaScript Document
// ==UserScript==
// @name           Ikariam Donation Logger for ikariam v 0.5.0+
// @autor          roselan
// @version        1.1.6
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @namespace      ikariamScript
// @description    Display donations over time
// @include        http://s*.ikariam.*/*
// @include        http://s*.*.ikariam.*/*
// @exclude        http://board.ikariam.*/*
// @require        http://code.jquery.com/jquery-1.7.2.min.js
// ==/UserScript==

$(document).ready(function(){

	// global stuff
	var log = false;
	var islandId = ($(".viewIsland a").attr("href")).split("=").pop();
	var host = window.location.host;
	var resourceType, id, donation, today, islandDonations, lastDonationId, lastDonation, newDonationFound;

	// global stuff for donation logger
	function donationMain(e) {
			setTimeout(function () {
			// get various id
			resourceType = ( e.target.id.indexOf('Resource') > 0 || $(e.target).closest('li').hasClass('wood') ) ? 'W' : 'P';
			id = host+"."+islandId+"."+resourceType;
			
			// init
			donation = new donationSet();
			today = new Date();
			donation.date = today;
				
			islandDonations = eval(GM_getValue(id, []));		
			if (islandDonations.length > 0 && !(parseInt(islandDonations[0].players[0].name))) convert();
			
			lastDonationId = islandDonations.length -1;
			lastDonation = islandDonations[lastDonationId];
			newDonationFound = false;			
			
			// "main"
			setLangData();
			drawOptions();
			drawDonations();
			saveDonations();
		}, 200);
	}
	
	
	$('#islandresource, #islandtradegood, #donateForm div.centerButton input').click( function (e) {
		donationMain(e);
	});
	
	// linkify resources
	var resources = $("#cityResources .resources"); 
	$(".wood, .wine, .marble, .glass, .sulfur", resources).mouseover( function () {
		this.style.cursor = 'pointer';
	});
	
	$(".wood, .wine, .marble, .glass, .sulfur", resources).click( function (e) {
		var view = $(e.target).closest('li').hasClass('wood') ? 'resource' : 'tradegood';
		unsafeWindow.ajaxHandlerCall('?view='+view+'&islandId='+islandId);
		donationMain(e);
	});
	

	// technical stuff
	function syslog(stuff) {
		if (log) console.log(stuff);
	}
	
	function formatNumber(x) {
		while (x.match(/^\d\d{3}/)){
		   x = x.replace(/(\d)(\d{3}(\.|,|$))/, '$1,$2');
		}
		return x;
	}
	
	
	// objects used to store a donation.
	function donationSet () {
		this.date;
		this.players = [];
	}

	function playerSet () {
		this.name;
		this.amount;
	}
	
	function getSelfId () {
		var selfId = GM_getValue(host+".selfId", "");
		
		if (selfId == "") {
			/*
			$.get("index.php", {view: "options", page: "game"}, function (data) {
				data = data.replace(/(\r\n|\n|\r)/gm,"");
				$data = $(data);
				selfId = $('#options_debug > table > tbody > tr > td', $data).eq(0).text();
				console.log(selfId);
				console.log($data);
				GM_setValue(host+".selfId", selfId);
			}
			*/
			selfId = unsafeWindow.dataSetForView.avatarId;
			GM_setValue(host+".selfId", selfId);
		}	
		
		return selfId;
	}
	
	// options
	function drawOptions () {
		$("#resourceUsers > #donationTableContainer > table > thead > tr > th").eq(4).after("<th>" + langData['tDifference'] + "</th>");
		
		var options = "<div id=DonationLoggerOptions>";
		options += "<h3 class=header>" + langData['tTitle'] + "</h3>";
		options += "<div class='header'><table  width='100%' ><tbody>";
		
		var option = GM_getValue(host+"timeFrame", "");
		options += "<tr>";
		options += "<td width=15%><input id=r1 type=radio name=DonationLoggerOption value=last "	+ ((option == "last")	? "checked" : "")	+ "> " + langData['tLast']	+ "</input></td>";
		options += "<td width=14%><input id=r2 type=radio name=DonationLoggerOption value=hour "	+ ((option == "hour")	? "checked" : "")	+ "> " + langData['tHour']	+ "</input></td>";
		options += "<td width=14%><input id=r3 type=radio name=DonationLoggerOption value=day "		+ ((option == "day")	? "checked" : "") 	+ "> " + langData['tDay']	+ "</input></td>";
		options += "<td width=14%><input id=r4 type=radio name=DonationLoggerOption value=week "	+ ((option == "week")	? "checked" : "")	+ "> " + langData['tWeek']	+ "</input></td>";
		options += "<td width=14%><input id=r5 type=radio name=DonationLoggerOption value=month "	+ ((option == "month")	? "checked" : "")	+ "> " + langData['tMonth']	+ "</input></td>";
		options += "<td width=14%><input id=r6 type=radio name=DonationLoggerOption value=year "	+ ((option == "year")	? "checked" : "")	+ "> " + langData['tYear']	+ "</input></td>";
		options += "<td width=15%><input id=r7 type=radio name=DonationLoggerOption value=first "	+ ((option == "first")	? "checked" : "")	+ "> " + langData['tFirst'] + "</input></td>";	
		options += "</tr>";
		options += "<tbody></table></div></div>";
		
		$('#resourceUsers').prepend(options);	
		
		$('.mainContentScroll').css('height', parseInt($('.mainContentScroll').css('height'))+30+'px' );
	
		// radio button for small or ultra small images
		$("input[type=radio][name=DonationLoggerOption]").change( function () {
			GM_setValue(host+"timeFrame", this.value);
			drawDonations();				
		});
	
	}

	
	// donations
	function getPlayerDonation(players, name) {
		//syslog("getPlayerDonation");
		for (var i=0; i<players.length; i++) {
			if (players[i].name == name) {
				//syslog("get donation for " + name + ": " + i + " -> " + players[i].name + " . " +players[i].amount);
				return players[i].amount;  //{amount = players[i].amount;}
			}
			//else syslog("player "+name+" not found");
		}
		//syslog("player " + name + "not found!!");
		return 0;		
	}
	
	
	function getTimeFrame () {
		var option = GM_getValue(host+"timeFrame", "");
		var hour = 1000 * 60 * 60;
		switch (option)  {
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

	// get last donationSet according to timeFrame
	function getTargetDonation () {
		var len = islandDonations.length;
		syslog("number of recorded donations: " + len);
		// usually the last donation equals the actual situation, therefore we have to get the donation before the last one (wich is len -1).
		if (getTimeFrame() == 0) {
			if (len == 1) return islandDonations[len -1];
			if (len >  1) return islandDonations[len -2];
		}
		
		var targetDate = new Date(today - getTimeFrame());
		syslog("targetDate");
		syslog(getTimeFrame());
		syslog(today);
		syslog(targetDate);
		//syslog("donationList");
		//syslog(islandDonations);
		syslog("dates");		
		
		for (var i=0; i < len; i++) {
			if (islandDonations[i].date >= targetDate) {
				syslog("found");
				//syslog(islandDonations[i -1].date);
				//syslog(islandDonations[i -1].players);
				syslog(islandDonations[i].date);
				syslog(islandDonations[i].players);
				// when a donation is found within the target date range, we need to get the donation before that one to inclue it! 
				if (i == 0) return islandDonations[i];	
				else return islandDonations[i -1];				
			}			
		}
	}
	
	function drawDonations () {	
		targetDonation = getTargetDonation();
		newDonationFound = false;
		$("#donationTableContainer tr.avatar").each( function () {
			
			player = new playerSet();
			// store player id in player name to keep track when player changes his name. I should rename players.name to players.id.
			//player.name = $("td[class=ownerName]", this).text();
			var playerHref = $("td.actions > a", this).attr("href");
			if (playerHref) {
				player.name = playerHref.split("=").pop();
			}
			else {				
				player.name = getSelfId();				
			}
			player.amount = $("td.ownerDonation", this).text().replace(/,/gi, "");
			donation.players.push(player);	
			//syslog("target found: " +((targetDonation) ? "yes" : "no"));
			if ($("td.donationLog", this)) {
				$("td.donationLog", this).remove();
			} 
			var donationElem = "<td class=donationLog align=right>";
			if (targetDonation) {				
				donationElem += formatNumber((player.amount - getPlayerDonation(targetDonation.players, player.name)).toString());
			}
			donationElem += "</td>";
			$("td.ownerDonation", this).after(donationElem);
			
			if (!newDonationFound && lastDonation) {				
				if (player.amount != getPlayerDonation(lastDonation.players, player.name)) {
					syslog("new dontation for" +player.name +": "+player.amount + " "+getPlayerDonation(lastDonation, player.name));
					newDonationFound = true;
				}
			}
		});
	}
	
	// save donations	
	function saveDonations () {
		syslog("save?");
		syslog(lastDonationId);
		syslog(newDonationFound);
		syslog(lastDonation);
		if (islandId && (!lastDonation || newDonationFound)) {
			syslog("saving!");
			islandDonations.push(donation);
			//syslog(uneval(islandDonations));
			GM_setValue(id, uneval(islandDonations));
		}
		else syslog("not saving!");
	}
	
	// convert all donation set to replace user name by user id when users switch from v 0.1.1 to a newer version. This funtion Will be deleted at release.
	function convert () {
		syslog("converting");
		$("#resourceUsers > .content > table > tbody > tr[class*=avatar]").each( function () {
			var playerName = $("td.ownerName", this).text();
			var playerId;
			var playerHref = $("td.actions > a", this).attr("href");
			if (playerHref) {
				playerId = playerHref.split("=").pop();
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
		GM_setValue(id, uneval(islandDonations));
	}
	
// Language specific section
	function setLangData()	{
		var urlParts = host.split('.');	
		var lang = urlParts[urlParts.length - 1];
		if (lang == "com" && urlParts.length == 4) { //for example: http://s1.ba.ikariam.com
			lang = urlParts[1];
		}
		if (lang == "net" && urlParts.length == 3) { //for example: http://s1.ikariam.net/
			lang = "tr";
		}		
		
		switch (lang) {			
		
		// French
		case 'fr'	:
			langData = {tLast : 'Dernier', tHour : 'Heure', tDay : 'Jour', tWeek : 'Semaine', tMonth : 'Mois', tYear : 'Année', tFirst : 'Premier', tTitle : 'Période pour les nouvelles donations', tDifference: 'Différence' }; 
			break;
		
		// English default
		default :
			langData = {tLast : 'Last change', tHour : 'Hour', tDay : 'Day', tWeek : 'Week', tMonth : 'Month', tYear : 'Year', tFirst : 'First change', tTitle : 'Period for new donations', tDifference: 'Difference' }; 
		}	
		return;
	}

				
	
//} catch (e) {syslog(e);}



});