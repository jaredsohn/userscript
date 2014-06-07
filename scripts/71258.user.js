// ==UserScript==
// @name           Viva Ponata Script
// @namespace      VivaPonata
// @description    VivaPonataHelp
// @include        about:blank
// @include        http://viva-ponata.com/*
// @include        http://www.viva-ponata.com/*
//
// ==/UserScript==

function giftLog() {
	this.serialize = function (giftEntryInput) {
		var result = "";
		result += giftEntryInput.price;
		result += ";"
		result += giftEntryInput.timeInMs;
		result += ";"
		result += giftEntryInput.itemName;
		result += ";"
		result += giftEntryInput.receptor;
		return (result);
	}
	this.deSerialize = function (giftEntryString) {
		if (!giftEntryString) {
			return (null);
		}
		var giftEntryArray = giftEntryString.split(";");
		var result = new giftEntry (giftEntryArray[0], giftEntryArray[1], giftEntryArray[2], giftEntryArray[3]);
		return (result)
	}
	this.serializeArray = function (giftEntryArray) {
		if (!giftEntryArray) {
			return (null);
		}
		var resultString = "";
		var delimiter = "||";
		var gl = new giftLog();
		for (var i = 0; i < giftEntryArray.length; ++i) {
			resultString += gl.serialize(giftEntryArray[i]);
			resultString += delimiter;
		}
		
		resultString = resultString.substring(0, resultString.length - delimiter.length);
		return (resultString);
	}
	this.deSerializeArray = function (giftEntryArrayString) {
		if (!giftEntryArrayString) {
			return (null);
		}
		var giftEntryStrings = giftEntryArrayString.split("||");
		var gl = new giftLog();
		var result = new Array();
		for (var i = 0; i < giftEntryStrings.length; ++i) {
			result.push(gl.deSerialize(giftEntryStrings[i]));
		}
		return (result)
	}
	
	this.getGiftLogFromGmVariable = function(greaseMonkeyVariable) {
		var geString = GM_getValue(greaseMonkeyVariable, null);
		var geArray;
		var gl = new giftLog();
		if (!geString) {
			geArray = new Array();
		} else {
			geArray = gl.deSerializeArray(geString);
		}
		return(geArray);
	}
	
	this.saveGiftLogToGmVariable = function(greaseMonkeyVariable, geArray) {
		if (geArray != null) {
			var gl = new giftLog();
			GM_setValue(greaseMonkeyVariable, gl.serializeArray(geArray));
		}
	}
	
	this.getGiftLogForLastDays = function (days, giftLog) {
		var geArray = giftLog;
		var dateNow = new Date();
		var timeNowInMs = Date.parse(dateNow.toGMTString());
		var thirtyDaysInMs = days*24*60*60*1000; // == 2 592 000 000
		var geResultArray = new Array()
		for (var i = 0; i < geArray.length; ++i) {
			if ((timeNowInMs - geArray[i].timeInMs) < thirtyDaysInMs) {
				geResultArray.push(geArray[i]);
			}
		}
	
		return (geResultArray);
	}
	
	this.giftLimitCounter = function (greaseMonkeyVariable) {
		var gl = new giftLog();
		var geArray = gl.getGiftLogFromGmVariable(greaseMonkeyVariable)
		if (window.location.pathname == "/itemmarket.php" && window.location.search == "?action=gift2") {
			var xpathResult = document.evaluate("/html/body/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/center", document, null, XPathResult.ANY_TYPE, null);
			var actualResult = xpathResult.iterateNext();
			var extractString = actualResult.innerHTML;
			// Shall match strings like "You bought the Levitra 6 from the market for $9,750 and sent the gift to <b>veikko</b>"
			extractString = extractString.match(/You bought the .+ from the market for \$.+ and sent the gift to \<.+\>/);
			if (extractString)
				extractString = extractString[0]; //Convert from an array to string
			var lengthDeterminator = "You bought the ";
			extractString = extractString.substring(lengthDeterminator.length);
			var itemName = extractString.substring(0, extractString.search(/ from the market for /));
			// Remove the Item name
			extractString = extractString.substring(itemName.length);
			lengthDeterminator = " from the market for $";
			extractString = extractString.substring(lengthDeterminator.length);
			// Getting the price as string. 
			var price = extractString.substring(0, extractString.search(/ and sent the gift to /));
			lengthDeterminator = " and sent the gift to <b>";
			// Remove the price and the invariable string that is following.
			extractString = extractString.substring(price.length + lengthDeterminator.length);
			var playerName = extractString.substring(0, extractString.search(/\</));
			var dateNow = new Date();
			//TODO: convert to a number.
			price = price.replace(/,/g, "");
			var time = Date.parse(dateNow.toGMTString());
			var additionalHtml = "<br>"
			additionalHtml += "Item: " + itemName + " Price: " + price + " Player: " + playerName + " Time: " + time;
			actualResult.innerHTML += additionalHtml;

			// Save gift persistently
			var ge = new giftEntry(price, time, itemName, playerName);
			
			var gl = new giftLog();
			var geArray = gl.getGiftLogFromGmVariable(greaseMonkeyVariable)
			geArray.push(ge);
		}
		return (geArray);
	}
	
	this.embedGiftLog = function(giftLogString) {
		if (window.location.pathname == "/inventory.php") {
			var xpathResult = document.evaluate("/html/body/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/center", document, null, XPathResult.ANY_TYPE, null);
			var actualResult = xpathResult.iterateNext();

			var geArray = giftLogString;
			var oDate = new Date();		
			var additionalHtml = "";
			var priceSum = 0;
			additionalHtml += "<table width=\"80%\" cellspacing=\"1\" border=\"0\" class=\"table\"><tbody>";
			additionalHtml += "<tr class=\"h\"> <td class=\"h\">Date </td> <td class=\"h\"> Item </td> <td class=\"h\"> Price </td> <td class=\"h\"> Player </td> </tr>";
			additionalHtml += "<td colspan=\"4\"><b><center>Gift Log</center></b></td>";
			for (var i = 0; i < geArray.length; ++i) {
				oDate.setTime(geArray[i].timeInMs);
				additionalHtml += "<tr><td>" + oDate.toLocaleString() + "</td> <td>" + geArray[i].itemName + "</td> <td>" + geArray[i].price + "</td> <td>" + geArray[i].receptor + "</td></tr>";
				priceSum += parseInt(geArray[i].price);
			}
			additionalHtml += "<tr><td> Sum </td> <td /> <td>" + priceSum + "</td> <td></td></tr>";
			additionalHtml += "</tbody></table>";
			actualResult.innerHTML += additionalHtml;
		}
		return;
	}

}

function giftEntry(price, timeInMs, itemName, receptor) {
	this.price = price;
	this.timeInMs = timeInMs;
	this.itemName = itemName;
	this.receptor = receptor;
}

function partnerSexCounter() {
	function processPartnerSexResult(htmlString, regExpression, greaseMonkeyVariable) {
		var additionalHtml = null;
	
		if (htmlString.match(regExpression) != null) {
			additionalHtml = "<br>";
			var valueOfGmVariable = GM_getValue(greaseMonkeyVariable, 0);
			GM_setValue(greaseMonkeyVariable, valueOfGmVariable + 1);
			additionalHtml += greaseMonkeyVariable + " + 1 = " + (valueOfGmVariable + 1);
		}
		return (additionalHtml);
	}
	this.countPartnerSex = function () {
		if (window.location.pathname == "/partner.php") {
			// Find place in the Html-Document
			var xpathResult = document.evaluate("/html/body/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/center", document, null, XPathResult.ANY_TYPE, null);
			var actualResult = xpathResult.iterateNext();
			partnerSexResultHtml = actualResult.innerHTML;
			
			var additionalHtml = null;
			additionalHtml = processPartnerSexResult(partnerSexResultHtml, /This is what they call a perfect deepthroat! You got your skill up!!/, "iPsSkillsUp");
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /Tight, almost as tight as a virgin! You got /, "iPsFullEnergyUp");
			}
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /Hardcore! Your partner spasmed so violently and fell unconscious.../, "iPsFullEnergyUpPartnerHurt");
			}
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /After a while your spouse falls asleep! You got /, "iPsHalfEnergyUp");
			}
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /Blah! Your partner got a headache. Maybe next time, babe.../, "iPsNoEnergy");
			}
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /Oh Myyyy! Your partner gets over exited and bites you!!/, "iPsNoEnergyAndHurt");
			}
			if (additionalHtml == null) {
				additionalHtml = processPartnerSexResult(partnerSexResultHtml, /It seems you have lost your gold ring, or maybe some whore stole it../, "iPsGoldRingLost");
			}
			
			// Print the result on the page (if there is any).
			if (additionalHtml != null) {
				actualResult.innerHTML += additionalHtml;
			}
		}
		return;
	}
	
	//
	// Embeds the Partner Sex results in the Viva Ponata Website
	//
	this.embedPartnerSexCounter = function() {
		if (window.location.pathname == "/events.php") {
			var xpathResult = document.evaluate("/html/body/center/table/tbody/tr/td/center/table/tbody/tr/td[2]/center", document, null, XPathResult.ANY_TYPE, null);
			var actualResult = xpathResult.iterateNext();

			// Get the Values for Partner Sex
			var iPsSkillsUp = GM_getValue("iPsSkillsUp", 0);
			var iPsFullEnergyUp = GM_getValue("iPsFullEnergyUp", 0);
			var iPsFullEnergyUpPartnerHurt = GM_getValue("iPsFullEnergyUpPartnerHurt", 0);
			var iPsHalfEnergyUp = GM_getValue("iPsHalfEnergyUp", 0);
			var iPsNoEnergy = GM_getValue("iPsNoEnergy", 0);
			var iPsNoEnergyAndHurt = GM_getValue("iPsNoEnergyAndHurt", 0);
			var iPsGoldRingLost = GM_getValue("iPsGoldRingLost", 0);
			var iPsSum = iPsSkillsUp + iPsFullEnergyUp + iPsFullEnergyUpPartnerHurt + iPsHalfEnergyUp + iPsNoEnergy + iPsNoEnergyAndHurt;


			var additionalHtml = "";
			additionalHtml += "<table width=\"80%\" cellspacing=\"1\" border=\"0\" class=\"table\"><tbody>";
			additionalHtml += "<tr class=\"h\"> <td class=\"h\">PS Result</td> <td class=\"h\">Number of times</td> <td class=\"h\">Percentage</td></tr>";
			additionalHtml += "<td colspan=\"3\"><b><center>Partner Sex</center></b></td>";
			additionalHtml += "<tr><td> Skills up </td>" + "<td>" + iPsSkillsUp + "</td>" + "<td>" + (iPsSkillsUp *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td> 100% Energy </td>" + "<td>" + iPsFullEnergyUp + "</td>" + "<td>" + (iPsFullEnergyUp *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td> 100% Energy, Partner Hurt </td>" + "<td>" + iPsFullEnergyUpPartnerHurt + "</td>" + "<td>" + (iPsFullEnergyUpPartnerHurt *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td>  50% Energy </td>" + "<td>" + iPsHalfEnergyUp + "</td>" + "<td>" + (iPsHalfEnergyUp *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td>   0% Energy </td>" + "<td>" + iPsNoEnergy + "</td>" + "<td>" + (iPsNoEnergy *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td>   0% Energy, bite </td>" + "<td>" + iPsNoEnergyAndHurt + "</td>" + "<td>" + (iPsNoEnergyAndHurt *100 /iPsSum)  + "</td></tr>";
			additionalHtml += "<tr><td> Sum </td> <td>" + iPsSum + "</td> <td>100</td></tr>";
			additionalHtml += "<tr><td> Gold Rings lost: </td> <td>" + iPsGoldRingLost + "</td> <td></td></tr>";

			additionalHtml += "</tbody></table>";
		
			actualResult.innerHTML += additionalHtml;
		}
	}
}

try {
	var ps = new partnerSexCounter();
	ps.countPartnerSex();
	ps.embedPartnerSexCounter();
} catch (e) {
	GM_log(e);
}



try {
	var gl = new giftLog();
	var giftLogArray = gl.giftLimitCounter("aVpGifts");
//	gl.saveGiftLogToGmVariable("aVpGifts", giftLogArray);
	var giftLogArray30Days = gl.getGiftLogForLastDays(31, giftLogArray);
	gl.saveGiftLogToGmVariable("aVpGifts", giftLogArray30Days);
	gl.embedGiftLog(giftLogArray30Days);
} catch (e) {
	GM_log(e);
}

function locationOutput() {
	GM_log("location.hash: " + window.location.hash);
	GM_log("location.host: " + window.location.host);
	GM_log("location.hostname: " + window.location.hostname);
	GM_log("location.href: " + window.location.href);
	GM_log("location.pathname: " + window.location.pathname);
	GM_log("location.port: " + window.location.port);
	GM_log("location.protocol: " + window.location.protocol);
	GM_log("location.search: " + window.location.search);
}

function testSomething() {

}

try {
	testSomething();
} catch(e) {
	GM_log(e);
}