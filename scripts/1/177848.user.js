// ==UserScript==
// @author          Bassem
// @name            snipe_upload
// @namespace       snipe script
// @description     snipe script that is translated for arabic & english servers
// @include         http://ae*.tribalwars.ae/*
// @include         http://en*.tribalwars.net/*
// @version         1.00
// ==/UserScript==

/*
what is speciall with this script:
1 - it is tranlated to arabic + english server
2 - it works with the script "Tabs_noteBook"
 */

var lang = {
	'ae' : {
		'tv' : 'القرية الهدف',
		'ht' : 'وقت الوصول',
		'go' : 'اذهب',
		'send' : 'ارسل',
		'from' : 'من',
		'to' : 'على',
		'at' : 'في'
	},
	'en' : {
		'tv' : 'Target Village',
		'ht' : 'Hit time',
		'go' : 'Go',
		'send' : 'Send',
		'from' : 'from',
		'to' : 'to',
		'at' : 'at'
	},
};
const url = document.location.href;
var langs = url.match(/\/\/(\D{2})\d+\./);
langs = langs ? langs[1] : false;
var std_lang = 'en';
const _server = langs ? langs : std_lang;
const bas = lang[_server] ? lang[_server] : lang[std_lang];

function fnInjectOverviewBar() {
	/* Default to your own currently active village */
	var defaultCoords = fnExtractCoords(win.$("title").html());

	/* Default to midnight of next day */
	var defaultDate = new Date();
	defaultDate.setTime(((Math.floor(defaultDate.getTime() / msPerDay) + 1) * minsPerDay + defaultDate.getTimezoneOffset()) * msPerMin);
	defaultDate = defaultDate.toString().replace(/\w+\s*/i, "").replace(/(\d*:\d*:\d*)(.*)/i, "$1");

	/* Perform the injection */
	fnInjectUnits();
	win.$('<tr><td colspan="3">' + bas.tv + ':<input id="snipe_coord" value="' + defaultCoords + '" class="text-input inactive" size="7" onFocus="this.select()" /></td><td colspan="1">' + bas.ht + ':<input id="arrival_time" size="25" class="text-input inactive" value="' + defaultDate + '"/></td><td><input type="button" value="' + bas.go + '" onClick="fnCalculateBackTime()" /></td></tr>').insertAfter(win.$('#menu_row2'));
	win.$('<div id="snipe_output"><br/><span>Fluffy88\'s Snipe Calculator</span><br/><span><sub>(dalesmckay modification ' + version + ')</sub><hr></span><br/></div>').insertAfter(win.$('body'));
}

function fnExtractCoords(src) {
	var vv = src.match(/\d+\|\d+/ig);
	return ( vv ? vv[vv.length - 1] : null);
}

function fnCalculateDistance(to, from) {
	var target = fnExtractCoords(to).match(/(\d+)\|(\d+)/);
	var source = fnExtractCoords(from).match(/(\d+)\|(\d+)/);
	var fields = Math.sqrt(Math.pow(source[1] - target[1], 2) + Math.pow(source[2] - target[2], 2));

	return fields;
}

function fnDebugLog(msg) {
	win.$("body").append("<span>" + msg + "</span><br/>");
}

/* sendMethod = "GET" || "POST", params = json, type = xml,json,text */
function fnAjaxRequest(url, sendMethod, params, type) {
	var error = null, payload = null;

	win.$.ajax({
		"async" : false,
		"url" : url,
		"data" : params,
		"dataType" : type,
		"type" : String(sendMethod || "GET").toUpperCase(),
		"error" : function(req, status, err) {
			error = "ajax: " + status;
		},
		"success" : function(data, status, req) {
			payload = data;
		}
	});

	if (error) {
		throw (error);
	}

	return payload;
}

function fnCreateConfig(name) {
	return win.$(fnAjaxRequest("/interface.php", "GET", {
		"func" : name
	}, "xml")).find("config");
}

function fnCreateUnitConfig() {
	return fnCreateConfig("get_unit_info");
}

function fnCreateWorldConfig() {
	return fnCreateConfig("get_config");
}

function fnCalculateLaunchTime(source, target, unit, landingTime) {
	var distance = fnCalculateDistance(target, source);
	var unitSpeed = unitConfig.find(unit + " speed").text();

	/* Convert minutes to milli-seconds */
	var unitTime = distance * unitSpeed * msPerMin;

	/* Truncate milli-second portion of the time */
	var launchTime = new Date();
	launchTime.setTime(Math.round((landingTime.getTime() - unitTime) / msPerSec) * msPerSec);

	return launchTime;
}

function fnWriteCookie(ele) {
	var snipeConfig = "";

	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i, e) {
		snipeConfig += win.$("#view_" + e.src.match(/unit\_(.+)\.png?/i)[1]).prop("checked") ? "1" : "0";
	});

	var cookie_date = new Date(2099, 11, 11);
	win.document.cookie = '$snipe=' + snipeConfig + ';expires=' + cookie_date.toGMTString();
}

function fnInjectUnits() {
	var twCookie = win.document.cookie.match(/\$snipe\=([0|1]*)/i);
	if (twCookie) {
		twCookie = twCookie[1];
		for (var ii = 0; ii < twCookie.length; ii++) {
		}
	}

	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i, e) {
		if (this.parentNode.nodeName == "A") {
			win.$('<input type="checkbox" ' + ((!twCookie || (twCookie[i] == "1")) ? 'checked="true"' : '') + ' id="view_' + e.title + '" OnClick="fnWriteCookie(this);"/>').insertBefore(win.$(this.parentNode));
		} else {
			win.$('<input type="checkbox" ' + ((!twCookie || (twCookie[i] == "1")) ? 'checked="true"' : '') + ' id="view_' + e.title + '" OnClick="fnWriteCookie(this);"/>').insertBefore(win.$(this));
		}
	});
	win.$("#combined_table tr:first th:has(img[src*=unit_])").attr("style", "background-color:yellow");
}

function fnExtractUnits() {
	var units = [];

	win.$("#combined_table tr:first th img[src*=unit_]").each(function(i, e) {
		units.push(e.title);
	});

	return units;
}

function fnCalculateBackTime() {
	var worldConfig = fnCreateWorldConfig();
	var hasChurch = worldConfig && parseInt(worldConfig.find("game church").text() || "0", 10);
	var arrivalTime = new Date(win.$("#arrival_time").prop("value").split(":").slice(0, 3).join(":"));
	var target = win.$("#snipe_coord").prop("value");
	/*var arrivalTime = new Date(document.getElementById("arrival_time").value.split(":").slice(0,3).join(":"));
	 var target = document.getElementById("snipe_coord").value;*/
	var servertime = win.$("#serverTime").html().match(/\d+/g);
	var serverDate = win.$("#serverDate").html().match(/\d+/g);
	serverTime = new Date(serverDate[1] + "/" + serverDate[0] + "/" + serverDate[2] + " " + servertime.join(":"));
	var output = [];
	var ii, troop_count, source, launchTime;
	var units = fnExtractUnits();

	/* Loop through your own villages */
	win.$("#combined_table tr:gt(0)").each(function(i, e) {
		source = fnExtractCoords($(this).find("td:eq(1)").html());
		if (source != target) {
			var isVisible = false;

			/* Process Each Unit */
			for ( ii = 0; ii < units.length; ii++) {
				if (win.$("#view_" + units[ii]).prop("checked")) {
					troop_count = parseInt($(this).find("td:eq(" + (ii + ( hasChurch ? 9 : 8)) + ")").text(), 10);

					/* Do we have Units currently Available */
					if (troop_count > 0) {
						launchTime = fnCalculateLaunchTime(source, target, units[ii], arrivalTime);

						/* Cache Units that can reach the target on time */
						if (launchTime.getTime() > serverTime.getTime()) {
							isVisible = true;
							output.push([launchTime.getTime(), bas.send + " " + units[ii] + "  (" + troop_count + ")  " + bas.at + "  " + launchTime.toString().replace(/(\d*:\d*:\d*)(.*)/i, "$1") + "  " + bas.from + "   [coord]" + source + "[/coord]   " + bas.to + "   [coord]" + target + "[/coord]", e]);
						}
					}
				}
			}
		}

		win.$(e).attr("style", "display:" + ( isVisible ? "table-row" : "none"));
	});

	/* Sort by Launch Time in Ascending Order */
	output = output.sort(function(a, b) {
		return (a[0] - b[0]);
	});
	for (var qq = 0; qq < output.length; qq++) {
		win.$("#combined_table").get(0).tBodies[0].appendChild(output[qq][2]);
	}

	/* Clear existing messages and display version */
	var srcHTML = "";
	srcHTML += "<br/>";
	srcHTML += "<span>Fluffy88\'s Snipe Calculator</span>";
	srcHTML += "<br/>";
	srcHTML += "<span><sub>(dalesmckay modification " + version + ")</sub><hr></span>";
	srcHTML += "<br/>";

	if (output.length > 0) {
		srcHTML += "<div align=\"center\"><textarea wrap=\"off\" readonly=\"yes\" cols=\"80\" rows=\"" + (output.length + 1) + "\" style=\"width:95%;background-color:transparent;\" onfocus=\"this.select();\">";

		for ( ii = 0; ii < output.length; ii++) {
			srcHTML += output[ii][1] + "\n";
		}

		srcHTML += "</textarea></div>";
	} else {
		srcHTML += "<span style=\"color:red;\">Impossible to reach on time</span>";
	}

	srcHTML += "<br/><br/><br/>";

	win.$("#snipe_output").html("");
	win.$("#snipe_output").append(win.$(srcHTML));
}

try {
	var author = "dalesmckay@gmail.com";
	var minVer = "7.0";
	var win = (window.frames.length > 0) ? window.main : window;

	var ver = win.game_data.version.match(/[\d|\.]+/g);
	if (!ver || (parseFloat(ver[1]) < minVer)) {
		alert("This script requires v" + minVer + " or higher.\nYou are running: v" + ver[1]);
	} else if (win.$("#snipe_output").length <= 0) {
		var msPerSec = 1000;
		var secsPerMin = 60;
		var minsPerHour = 60;
		var hrsPerDay = 24;
		var msPerMin = msPerSec * secsPerMin;
		var msPerHour = msPerMin * minsPerHour;
		var msPerDay = msPerHour * hrsPerDay;
		var minsPerDay = hrsPerDay * minsPerHour;

		var version = 'v3.2';

		var unitConfig = fnCreateUnitConfig();

		fnInjectOverviewBar();
	}
} catch(objError) {
	var dbgMsg = "Error: " + String(objError.message || objError);
	alert(dbgMsg);
}
