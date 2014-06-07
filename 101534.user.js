// ==UserScript==
// @name           Conquer Club - Empathy of War
// @namespace      namespace
// @description    Shows which countries are hidden to other players in Fog Of War games
// @include        http*://*.conquerclub.com/game.php*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version        1.0.2
// ==/UserScript==

const version = "1.0.2";
const versionUrl = "http://userscripts.org/scripts/source/101534.meta.js";
const updateIconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAotJREFUOI2dk0tIVGEYht//cs6M44xm42jjPSR1HDQaC0sLUUQpFclZBNnaXauUtCCLoG3Yoraa0MqCjC6LkhZFpFCKaLpoEUnaaHPRmTlnzu1vYYtk1KB3+X0vDx8PfMA+uXq3kt96UM/369C9FheHGF+RyybmEvKTC4N0T8iugGA/sJZVeyPHhe6outC1rBYMn7+yO4ClTW4Ch7L8PceP+O5JdJMm9HW4nInGxe/uhXB3/Ave/gPQfrbKX1MeeOo9YDooUyBoFEzepNlO0q4vOJ9H5pOhPQHdd0pyCkvqXtWVeooFiYNJKqgUg2xPID/PsKeSrMVRJj8KzaWUNAe91xh3eWtHW3w+H2Ma7DYg00FwMJsjz03hzqFoblErHS46FhxgfMcFXf2AUXp6OHiirY+zBARRQJgKSVIh2WLIdMaR5aLgEkGh16yYepfBz7SlppY+/AF0Xr7U0VzTfN/jYtSwUhBIATQJzlVwWwROVxLubALOBCwIFHiMho+f3LOh+cQyBwBO2ebEzORIKLwBJR6taD1W3hmo8gIEEDBBKfB6UsPLN9ILwuUlDgFCRBQAyN8Sz90uysktDrxvqynymWQDhEWgiEXYHTHIHBh/yJa/fbUaFsa3wukShxh3eKpHW6v9PsM0oWkCmiZhLRxF6JeFH+sWGpu0SruTjvUM0J0Sg/1AvPDUcHddSx+nOlRNhaoriCUiWI2sQFEF4gmByBbgyTUqpj87WFP7tkQOACWB3g7/4aPX810ZiCYFhKXA1G1Y3YggEjdhkwkIAXRdIKkI1J9UB2en86eBn5McACQqxR7PPBuJJbegGxYM04Kp6bBSGiw9H9ANEMMAsUxQ08S2RCua9gb/k9/JVgKLG8zYBwAAAABJRU5ErkJggg==";
const updateUrl = "http://userscripts.org/scripts/source/101534.user.js";


const eowId = "Empathy_of_War";
const eowClass = "Empathy_of_War";
const eowIconUrl = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA1VJREFUeNqkU11oHFUUPvdn7uzszv6lm+3P7kZb00j1yU0I2s2LqOhCUmhEEPqgD0XQahFBabSt5EmLWLT4VDG+6aOKqGAM9Sc2LVoTq9RCaLJJk+zOzv4k7szOzt+9TgIrIr554Hu4h3Pu+c53zkFCCPg/Rv/tmJyczGcy2ZNRVS1IjCUMo5UyDGNd1/V123amg4IXg7DVbjzqMjh79vX0yEjhk2wudxgjBKZpQqVSgXq97m1slOn22/O87VArwESAd/9mcPr0mTuKxeI8ITg5d3muNDs7G2k0GrvkkIKtjk3L5QoI7vvZzF6tr6/PU1X1nSBNCfAmCWipg4ND861Wqzk19WGFhRRz/PHx/WE1hiNqHJpbLVhdK8PNxSUcS/QohcIDH1y9ckXq7e09jBD6Cp06NfEypXT/yurt6rm33n42GlHSn3/xJXw9PQOGYULgh6XlUtBKAxiTQC+XoKzV3zj53DPhfD5foR3browVxyrJZOJ9jJEMCMDnHK79sgCdjg2NZnMnedty2WzQSiCCZU6cO39haurie59ijumy67pPM1mRtWoVfI9D8dFHwA0E61bu2ksvPg9VXQdJCvnV8oamhCNR8uBDI853l37wQAj94MDAnc1GXaGEwpNPjMPttTWo1WpwsL8fzrz6ChSLjwEIZFyf//mjucuzhueK79FTJ46wTPTuu8q1WqG5aQ2Mjo0eGB4aHg4pci6mRsFzHZBkGUyr016YX/j920vfLDJCtjDDM65Nf0LA4vDaCydUUFDOE9CvadqhdqudY3IoGYslUpQShDAWDb36Z08ybihhpY6B3PB951e65ZZ29uDe/LH20sxnK2a6Y+7p2avh3XwPcN7LBUoEm6YKhEhuX9rzMbZAgOZ7YlnYoRpO0fbOB8PH7hH2+WlrobSiccYMxZGrQHAcBI0jxMPAkcwJIcgVdsBmM4SoDrJppDOGj7oKswCOKuNDR45DXkmxXcyQw4woQvJUwSMUCQ9z4iEZI5siZDSsdmv1t6Md9F8XhnZH0D42iu6/LyNlU2lipzYljDiLdThyieP7HDumYdgrH19wiaKEg9n7Qdo/ztp0wTT+EIu3rvL1G9f4w82Ub8ctp8Y2Ax2IV4snXdsd9K//OMT/EmAA4iuZQlHh+SkAAAAASUVORK5CYII=";

function getVariableFromElement(selector, regExp) {
	var result;
	
	$(selector).each(function() {
		if ($(this).html().match(regExp)) {
			result = eval("(" + RegExp.$1 + ")");
			return false;
		}
	});
	
	return result;
}

$(function() {
 
	// Initialization
	if ($("dt:contains('Fog of War')").next().html() != "Yes")
		return;

	var gameType = 	$("dt:contains('Game Type')").next().html();
	var teamSize = 0;
	
	switch (gameType) {
		case "Doubles": teamSize = 2; break;
		case "Triples": teamSize = 3; break;
		case "Quadruples": teamSize = 4; break;
	}

	var map = getVariableFromElement('script', /map = (.+?);/);

	if (!map) return;
	
	// Styling
	GM_addStyle("div." + eowClass + " { opacity: 0.3; background: white; }");

	// Event Handling
	var leaveEmpathy = function() {
		$("#outer-map div[id*=country]").each(function() {
			$(this).removeClass(eowClass);
		});
	};
		
	var enterEmpathy = function(players) {
		leaveEmpathy();
		
		var armies = getVariableFromElement("#armies, script", /armies = (.+?);/);
		if (!armies) return false;
		
		for (var country in map.countries) {
			var player = armies[country].player;
			
			if (player == "?" || $.inArray(player, players) != -1)
				continue;

			var visible = false;
			var borders = map.countries[country].borders;

			for (var border in borders) {
				if ($.inArray(armies[borders[border]].player, players) != -1) {
					visible = true;
					break;
				}
			}
			
			if (visible) continue;
			
			$("#country" + country).addClass(eowClass);
		}
	};
	
	// Add FOW column in stats table
	$("#stats table.listing tbody tr").each(function(index) {
		
		if (index == 0) {
			$(this).append($("<th>FOW</th>").attr("id", eowId));
			return;
		}
		
		var players = new Array();
		
		if ($(this).find("td:first-child").html().match(/Team (.+)/)) {
			var teamIndex = (parseInt(RegExp.$1) - 1) * teamSize;
			for (var p = 0; p < teamSize; p++) {
				var player = teamIndex + p + 1;
				players.push(player.toString());
			}
		}
		else if (teamSize == 0 && $(this).find("td[id*=stat_armies_]").attr("id").match(/stat_armies_(.+)/)) {
			players.push(RegExp.$1);
		}
		
		var td = $("<td/>");
		
		if (players.length != 0) {
			td.append($("<img/>").attr("src", eowIconUrl).attr("alt", "Empathy of War"))
				.mouseenter(function() { enterEmpathy(players); })
				.mouseleave(leaveEmpathy);
		}
		$(this).append(td);
	});
	
	// Check for update
	var compareVersion = function(a, b) {
		var partsA = a.split("."), partsB = b.split(".");
		while (partsA.length < partsB.length) partsA.push("0");
		while (partsB.length < partsA.length) partsB.push("0");
		
		for (var i = 0; i < partsA.length; i++) {
			var va = parseInt(partsA[i]), vb = parseInt(partsB[i]);
			if (va < vb) return -1;
			else if (va > vb) return 1;
		}
		
		return 0;
	};
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: versionUrl,
		onload: function(response) {
			if (response && response.responseText && response.responseText.match(/@version\s+(\d+.\d+.\d+)/) && compareVersion(version, RegExp.$1) < 0) {
				var img = $("<img/>").attr("src", updateIconUrl).attr("alt", "Update Empathy of War");
				var a = $("<a/>").attr("href", updateUrl).append(img);
				$("#" + eowId).append(a);
			}
		}
	});
});