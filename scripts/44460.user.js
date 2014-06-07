// ==UserScript==
// @name           Ikariam Embassy Tool
// @namespace      ikariam.embassy.tool
// @description    Gives information about what and when of your alliance members
// @author         Toranaga
// @version		   1.0rc1-01
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js
// @require        http://www.JSON.org/json2.js
// @include		   http://s*.ikariam.*/*
// @exclude		   http://board.ikariam.*/*
// ==/UserScript==

/*
 * Loosely based on Ikariam-all-in-one Embassy Tool
 * (http://userscripts.org/scripts/show/35189)
 * 
 * 
 * Changes in v.1.0rc1-01
 * - Bugfix: avoid clash with CAT indicator script.
 *
 * Changes in v.1.0rc1
 * - Rewritten using jQuery & JSON.
 * - Added inline artwork from http://dryicons.com
 *
 * Changes in v. 0.99a
 * - Fiddled with the scores display. Useless padding removed.
 * - Added duration for shipping resources from selected town to members towns.
 *
 * Changes in v. 0.99
 * - Replaced remote images with game images from the server
 * - Moved options and reset button to the Ikariam options page
 * - Added option to display last online as number of days (the date is still available as a tooltip).
 *
 * Changes in v. 0.9
 * - Ikariam 2.8 compatibility
 * - Removed Ally Sorter: not needed anymore
 */

const DISPLAY_DATE = 'DisplayDate';
const INFO_DISPLAY_TEXT = 'DisplayInfoAsText';
const VAR_DISPLAY_TEXT = 'DisplayVariationsAsText';
const DEBUG = false;

var host;
var domain;
var server;

const CACHE_KEY = 'EmbassyToolCache';
const CACHE_TYPE_RESET = "Reset";
const CACHE_TYPE_LAST = "Last";

var locale = 'en';

/*
 * Words dictionary
 */
const NEW_ALERT = 'NEW_ALERT';
const NEW_TOTAL = 'NEW_TOTAL';
const ABANDON   = 'ABANDON';
const TOTAL_ABD = 'TOTAL_ABD';
const CONFIRM   = 'CONFIRM';
 
const lang = {
	en: {
		NEW_ALERT: 'New Members',
		NEW_TOTAL: 'Total new members',
		ABANDON: 'Abandon',
		TOTAL_ABD: 'Total abandon',
		CONFIRM: 'Are you sure you want to reset recorded points?'
	},
	
	it: {
		NEW_ALERT: 'Nuovi membri',
		NEW_TOTAL: 'Totale nuovi membri',
		ABANDON: 'Abbandoni',
		TOTAL_ABD: 'Totale abbandoni',
		CONFIRM: 'Sei sicuro di cancellare i punteggi salvati?'
	},
	
	co: {
		NEW_ALERT: 'חברים חדשים',
		NEW_TOTAL: 'סך הכל חברים חדשים',
		ABANDON: 'עזבו',
		TOTAL_ABD: 'סך הכל עזבו',
		CONFIRM: 'האם אתה בטוח שבירצונך לאפס?'
	},
	
	il: {
		NEW_ALERT: 'חברים חדשים',
		NEW_TOTAL: 'סך הכל חברים חדשים',
		ABANDON: 'עזבו',
		TOTAL_ABD: 'סך הכל עזבו',
		CONFIRM: 'האם אתה בטוח שבירצונך לאפס?'
	}
}

function log(m) {
	if (DEBUG) {
		GM_log(m);
	}
}

function message(id) {
	return lang[locale][id];
}

function dispatch() {
	var page = $("body").attr("id");
	if (page == "options") {
		options();
		return;
	}

	if($("#embassy").length || $("#alliance").length) {
		embassyTool();
	}
}

function makeCacheKey(cacheType) {
	var cacheKey = CACHE_KEY + "." + cacheType + "." + top.location.host;
	log("Made a cache key: " + cacheKey);
	return cacheKey;
}

function readCache(cacheType) {
	var result = {};
	var json = GM_getValue(makeCacheKey(cacheType));
	log(cacheType + ":" + json);
	if (json) {
		result = JSON.parse(json);
	}
	return result;
}

function writeCache(cacheType, cache, isDirty) {
	log("Writing " + cacheType + "..." + (isDirty?"dirty":"clean"));
	if (!isDirty) {
		return;
	}
	var json = JSON.stringify(cache);
	log("json: " + json);
	GM_setValue(makeCacheKey(cacheType), json);
}

function embassyTool() {
	host = top.location.host.split(".");
	domain = host[host.length -1];
	server = host[0];

	if (domain in lang) {
		locale = domain;
	}

	GM_addStyle(
		"#container #mainview table.table01 td { padding: 4px; } " +
		"#container #mainview table.table01 td.nopad { padding: 0; } " +
		"#mainview .cityInfo ul li ul li { padding: 4px; width: 240px; } " +
		"#mainview .aioeDistance { float: right; clear: none; }");
	
	processMembers();
}

function convertIkariamDate( argDate ) {
    var returnDate = new Date(
        argDate.split(".")[2],      // Year Argument
        argDate.split(".")[1] - 1,  // Month Argument (ZERO based), subtract one to offset
        argDate.split(".")[0]);     // Day Argument
    return returnDate;
}

function scoreImage(value) {
	var up = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAA2FJREFUOI11U11MW2UAPfe2hVJuS5G2dARmCQouky1bsiw4paaQ6ELMJtFtMWj0ZYagCUSzmDgfTAyNicuc2zTxL6SYLQyHP8sWmMtAcLKyurk5KLCk469DLi20t/R+9/a7934+QeKiJzlv55yXcw4YY3iYUkZ6jhnsF40wJZuialJMXb0xFm76Ly3HGMM6lsS/N5d6vJ2Lc4mmidiEM0MfwGY1oUQoh9dZJYE3Lo1cv/L+oYMtsXXPRsCavFZXaLb1h873Oi5OfQFH5X2UbJLBGMBUO5z6kwg82g6fa5s8dmu4ad++5qGNAHFZLHMXuaaOnugUwvQU9tTbYIKGe+ObUFVpBjXPQTdMyEoGmsqC2OppUL7/KfRER8eRWR4APG7Px9/90CcMpk/D7y+Gpuq4NuJAe30PWnf3QiMuGBqD1WbFhfhRpOicNVC/9xgAcOl0+ilN1gcOBF8Sap+fhYXXcDMiINjch11bqgEAM+IMTo42wzCvIqcZeMzWgJerOknozFf7ebtgf+/2ZFRQ7DFYTAYiY/Z/mRlj8Hl8eHNHD3TyCMA4TCcjUJAu2F678wOeM+BfSDxAnkAQi7rx6aGL2LWlGouJJNZIFgpVsCAuotr7OA5v6wZIGVJkFVkjhUKbvY7XNGqYzCbIMgd3qQ6bXUZCEvHO2VeQWVOQU3M4NvQGJheiIDkZRKVQVQ48Z4JGKTNLmcxgpXfziyQtgOirCF5+FUKBFYStwKBAjjNA9CUc//115CiDrCeRDxeK8l24vRS9xt+duBus8fmk8vztWEroILkMVkgcBrVBJjIIkUGVAki5ZchUwkpKxY6KAEw0T77Uf+FDvt7vv6FS5fy7L3RgehwgOQMqyYNCAF4zgdfMIAqgyBakMxS84UDL7nb8eefmz2d6zg1yjDGc+vyk5+D+A9MDkd+KPuo/Ak+FigLeiVr3M+B5Dn+JI0iRBAotxTje0g0mWrJvdRyuGR65Ht+YcijUtbPR33h5Prlc8s2vX2JqdRRpugieB0rtFXi6phGv7WnFymwqfeL0J3u/7eoe3eh5nW1trd4/wmNfx2MLy+MTkyx8J8xuRSPs/kyMzd2bT/7Y29dVu7Wm/H/fuI6321rrAs82tDsdxQFKKTcfnx8613v2s4ErV4cf1v4DS/bjJaYUi0IAAAAASUVORK5CYII%3D';
	var down = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAGHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3NPsx9OAAACt0lEQVQ4jXWTzU9UZxTGf+e9M8yMMwiXASFFwE6M7ULQGHTXhTGKqxZr2x3RRXVj0lRjTLttunIj0ej/QND4sTBummhoo1PAsS2BKFoFGRQTHLgwXu9933vfLixEIj7Lk5NfzsfziLWW9RSDDYDAGHS1SlNdnazXl1inZqfm53k2NkY0WybjOGTa2lneutWqKKajpVk+CgistdcGBpi+0M+2Z5N8YgxKBC+VYq5zB82nziCJhG1vzK9CZGWFILb20q+/4Jw7y95chkQqjRIhAkIbo9/4vLaWhrP95Pf3UGhpkfcBdnBwkMfHj9KTr0eLogb4/MFzAMZ3thECodZ4oeazazdZ3pBl1/btogBeVhYYPt/PnmwGTxQG0EA19FFJgwYMECWTOMYwc6Eft6np3Q0ia+2jiXFykw+RbBqzcklAEJSSVYCxEOeyVP68S2Ghwo3RUassMD8zQ9ZoAhHc60N0j40RADr2MXFAAORvDLH51i0iUYRLS8SVCpnaWpQ2Bsdx0P+PXe+G5Grq6Cz+TTaTJAwMhd/u0vXpFt74b1f7lONgtEZVPY+Wjg68dJrIxpS+2MeDJyU2uS4Sg41iNjc0U3x0j6eHegnjGFVfT7KxiVflMqoxn5f2QoHErt1Ulqto4OHBLymOFxGjEKMYfTLC06+/JRRh2VukdX8PQTrNkb6+d1/Qvk/PmZ8ZxyHSIaEIk199Q+nfEhPPJ3h8+DtCEXzfx26sY8fpn/jn/v21Rpp9NWdLt+/w+48naAvfkq7NgXKwQBxF+IuLOK7LoYGrzKYzdHd2rjESAFPlsn09N0fx4nmW/hhCvAWUCCm3gcKBg3T/cJIpb4nurq4Prbyi4ZER29jaSuB5RAsVahyHVD5PmEzx18gwh3t714TpA8CKLl+5bDe6DYRG82J6mmPfH1s3zv8B5ORDlesjdvMAAAAASUVORK5CYII%3D';
	var spacer = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAArwAAAK8AFCrDSYAAAAGHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3NPsx9OAAAAHElEQVQ4jWP8//8/AyWAiSLdowaMGjBqwCAyAABjmgMdtjw0ugAAAABJRU5ErkJggg%3D%3D';

	return '<img title="' + value + '" alt="' + value + '" src="' + 
	(value > 0 ? up :
	(value < 0 ? down : spacer))
	+ '" />';
}

function scoresFormat(cell, value) {
	var score = cell.text();
	if (value == undefined) {
		value = "NEW";
	}
	
	if (GM_getValue(VAR_DISPLAY_TEXT, true)) {
		cell.html("<table class='nopad' border='0' cellspacing='0' cellpadding='0' width='280'><tbody>" +
				"<tr><td width='60%' align='right' class='nopad'>" + score + "</td><td align='right' class='nopad'>(" + value + ")</td></tr></tbody></table>");
	} else {
		cell.html('<div style="float:right;">' + score + '&nbsp;' + scoreImage(value) + '</div>');
	}
}

function processMembers(membersTable, cachedMembersReset, cachedMembersLast) {

	var cachedMembersReset = readCache(CACHE_TYPE_RESET);
	var cachedMembersLast = readCache(CACHE_TYPE_LAST);
	var membersTable = $("#memberList");

	var currentMembers = {};
	var newCacheMembersReset = {};
	var isResetDirty = false;
	var isLastDirty = false;
	
	var myLocation = extractLocation($("#changeCityForm div[class*=coords]").text());

	// check for new entries
	var totalNew = 0;
	var msg = message(NEW_ALERT) + "\n";

	$("tbody tr", membersTable).each(
		function() {
			setOnlineStatus(this);
			var pointsCell = $("td:eq(4)", this);
			var memberName = $("td:eq(1)", this).html().replace(/<.*?>/g, "");
			var memberPoints = parseInt(pointsCell.html().replace(/(,|\.)/g, ""));
			
			// add distance from selected town to members town
			$("li li > a", $("td:eq(2)", this)).each(
					function() {
						$(this).before($('<div class="aioeDistance">' + getDistance(myLocation, extractLocation(this.text)) + '</div>'));
					});

			var pointsAtLastReset = cachedMembersReset[memberName];
			if (typeof(pointsAtLastReset) === 'undefined') {
				pointsAtLastReset = memberPoints;
				isResetDirty = true;
			}
			newCacheMembersReset[memberName] = pointsAtLastReset;
			
			currentMembers[memberName] = memberPoints;
			
			var pointsWhenLastSeen = cachedMembersLast[memberName];
			if (typeof(pointsWhenLastSeen) === 'undefined') {
				scoresFormat(pointsCell);
				msg += memberName + "\n";
				totalNew++;
				isLastDirty = true;
			} else {
				scoresFormat(pointsCell, memberPoints - pointsAtLastReset);
				isLastDirty |= (memberPoints != pointsWhenLastSeen);
			}
		}
	);

	if (totalNew > 0) alert(msg + message(NEW_TOTAL) + ": " + totalNew);
	
	//And now, let's check for those who left the alliance!
	var msg = message(ABANDON) + "\n";
	var totalAbandons = 0;
	for (var memberName in cachedMembersLast) {
		// If a cached member is not in the current member list...
		if (typeof(currentMembers[memberName]) == 'undefined') {
			totalAbandons++;
			msg += memberName + "\n";
			isLastDirty = true;
			isResetDirty = true;
			var trOut = document.createElement("TR");
			trOut.style.backgroundColor = "#F00";
			var tdOut = document.createElement("TD");
			tdOut.setAttribute('colspan','7');
			tdOut.style.color = "#FFF";
			tdOut.innerHTML = "<b>" + memberName + "</b> Points: <b>" + cachedMembersLast[memberName] + "</b>";
			trOut.appendChild(tdOut);
			membersTable.append(trOut);
		}
	}
	if(totalAbandons > 0) alert(msg + message(TOTAL_ABD) + ": " + totalAbandons);
	
	writeCache(CACHE_TYPE_LAST, currentMembers, isLastDirty);
	writeCache(CACHE_TYPE_RESET, newCacheMembersReset, isResetDirty);	
}

function setOnlineStatus(tRow) {
	var firstCell = $("td:first", tRow);
	var status = firstCell.attr("class");
	if(status == 'online') {
		template('online', firstCell, null);
	} else
	
	if(status == 'offline') {
		var nowDateStr = $("#servertime").html().split(" ")[0].replace(/^\s+|\s+$/g, '');
		var nowDate = convertIkariamDate(nowDateStr);
		var inactiveDate = new Date();
		// accounts generally go inactive after seven days
		inactiveDate.setDate(nowDate.getDate() - 7);
		
		var lastOnline = firstCell.attr("title").split(":")[1].replace(/^\s+|\s+$/g, '');
		var lastDate = convertIkariamDate(lastOnline);
		
		if (!GM_getValue(DISPLAY_DATE, true)) {
			var days = Math.ceil((nowDate - lastDate)/86400000);
			lastOnline = (days == 0) ? "today" : (days == 1) ? "yesterday" : days + " days";
		}
		
		if( lastDate < inactiveDate ) {
			template('inactive', firstCell, lastOnline);
		} else {
			template('offline', firstCell, lastOnline);
		}
	}
}

function makeCell(tpl, status, image, lastOnline, message, fontColour) {

	return (tpl > 0) ?
			"<div style='width: 8em'>" +
			(status =='online' ? "" : "<span style='float: left; padding-left: 2px;'>"+lastOnline + "</span>") +
			"<span style='float: right'><img src='" + image + "'></span></div>"
			:
			(status =='online' ? "" : "<span style='float: left'>("+lastOnline + ")</span>") +
			"<b><font color='" + fontColour + "'><span style='float: right'>" + message + "</span></font></b>";
}

function template(status, cellElement, lastOnline) {
	var tpl = GM_getValue(INFO_DISPLAY_TEXT, true) ? 0:1;
	var images = {
		'online': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAA2hJREFUOI11k31M1HUAxj+/373xcnBHB8SIlHIFW7mMlg0yroFJSA3WXNbG+rPJMCfVXKatlYxyszVfyK31QuAqQStrGKYJgRkvGoZ0CBny/nLcHcfvjnv73f2+/QVbrp7t+e95nr+eD0IIbrfiU0qEJs5HgyK07FXDbqf3Yl9vT9l/ZSUhBCuad86tuTM9o252wlXmGHVYfeoMCXE6bOYsMqzrFGTtbFf3hX0vbK8cXemsDvgD/vxEfUJb4+mW5NaR4yRl3yIlVUWnBy0ch03KxX7Xq2Snbgj09neWlZc/17E64FxwZqZZUof3H64z96jHKNgUj1E2ggaaBjEiOIaNpKZEKF/7Ng+mPR1qOdOYW1OzZ1wPkJ6WfrDp5Clzu1JPyRYrakgiIgtkWWAyCfr6olTlNWNLU/i8fyeZ1py4osLSD4BtsqIoBZ65xYovLh9nY34C4aBETANNk5AlGcffHgoz97H1iUe517IRo8HK+Yl6bClpW+tqD2yRk8xJb/xxY8gcNI+SYDQyOSURjISJaaAE/cRcdmoqdqCF4cT1/YSkMW66BwixFP/Q+ry3ZEnDPuWaIc4c5eaYn6eyDlKy7k18YTeDDonXSt9Hb4Cfh85wfbEZo0hhKeBjWfOSmJCUr49GVU2n1xGKRDHE1rKt4BkSzBKLSgCr4uKR3PuYdTr5dvhdTLKZYAgiEZAlHVFVFbLi87Xfk7EGvycRfeI8Rzp2EQ7EeDFvF3sr9hILwtdXD6FEZgmHTARCGgasWEypzM3P/CoPOgbfy8nOVrJMG1jwCC5PnKK2dQdLih+9kOke6eLSeDNS1EogCC6vwsN3F6NTjYGzbT+8Ixfa7X1hNXT69WdrGB4EPcn0Tbdy4MdqXG4/zdeOEo1BICDj9QWRNQuVj+3m2sDv3395srldEkJw7KOj6dsrnh85d+WSpbZtD+lZEQwGsOnvx6/NogmNpWWFRIOVDyubEE7D8s6al3M6u7qnV6/c2NiQt9m++adJ94Lt018+ZtjTTUC4MOiMWOLvYFNOMS89XoVn3Lt0uP5Q6WcNTb8B/Ius6uqqjKs9vZ9Mj04t/Om4IXoGekT/0BVxa2xUTPw16f6u5ZuG9Q/kZP0vjSt6pboqv+jJ4t3W5JQiVVWlyenJjuaWr46cu3Cx8/bsP4npztuoRJziAAAAAElFTkSuQmCC',
		'offline': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAA2tJREFUOI11k1tMWwUcxr9zDg2nQCktXVdYW5JtMIMmyyBzlmzTbGHoumF2icOEzOzBC0bRGPXFJ2bcJbJFURdiiEGmKcmqI2wxDuhgMFIoyzZnM5piu7XQ0gu9naYtpe35+2BY4qJf8r19v+/tByLC0xWEREuBaDRNtBrL5bKhePzmnG3W+F9bhoiwnnAgoN+g0ZzxRCLGx3Z7RcHvg5TjINXpId+6VWAL4m+zY6Ofvdbe7n4CrT+lBMGwKoqJQZOJupt20VCVkmzqcrqzUU6TejWNHGymu5ZR8oRXUsO/ml9a50BECAeD1asFMXmxq4u+lfM0US6hh1oVOWp15KjVkU2rIousiEY2lpPt8o/kWl7OfHX+XA0RgQUAlVp9fvgXc9nahXOQl5Wh8P0Ass8bsBaPISUImKmth3jxEthiHsGPP0De6+H3HDReAAAk4omm5Wgs+eluA5lLOBofNBERUVIQ6NbeF+jrhu00735EwXyBxnov0VAJS5b2NnIHAukvPj99gMmL4vC01Xp44mgrdksYMPXPYefPV1CmUiESjSKTSkFZXQ3vwgL+eu9twPEQ2dJSNA7/jgcu922WgBcjS0sozeeQ5aVYvX8Plpf3IejxoFKpRJVOh7DLBefJNjD2P1DgeawlkxBjMUhlMgOby+dFjuOQAyACSJEIJ1MEYjkAQIEIYABRIkGWgBz+KctxyOdyxKYEYVxTU4MkzyOVSWNxxy6cGrFAo9Mi4vcjuOCETKtHXd8A8jsakc1kwFZUQKLagJDPN83O2+1n9Zs3C0UNOxFYiaDp5BtQKRSIhkIYO3YYU23HEHK7INPXoNTYisRKBJuaW5Dl+fSN69e6GCLCos/3g/fR41NDRw/hWQ6oO9ONpSuDyNyxgeFYsNvqoThyHItnT4PleRyfmsXUgz8HXzUaX2eICL3f9KhbT5xw3rs1Kb/9fgfUsQhklUqwJSUgAIVMGslQFPymKhwxD8FfLE198tab28atM74nLvzU39+wp7l5JBoMVs5+14Pk9BQYIQ6WYVCsUGLLgRY0dn4Ej5BM9HZ/+UrfwGXrv1wgInR2vKOxzc31uf3+8LzDQfYZKznnbORxu2hhcSlivnq1f/szddr/tXE9ne92GPbu3/9huUK5by2fY5a93gmzydRzw3Jz8unt3zEY9F+OwnBWAAAAAElFTkSuQmCC',
		'inactive': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAK8AAACvABQqw0mAAAABh0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzT7MfTgAAAhtJREFUOI2lkstLlGEUxn/n/S5z0SEVh/rwMnkpcZouWqhEkRBtW4Wr6J8IAouKgtq46GIILYMutAlat8vKjDREITQrRSkvNTnNjH7zzeVtkUngaEhncxbn4cfzPBzRWvM/ozY7zj6u7J55UHlpM4254WWuovX9c/N6wQOnpeKZGY0PbMnB23tW3/bGFapiyww9tPo20hUFLA1WdsVndPu+EylinWmW5vWB+SfhM8W0sr7EUvvFhZKp6l1JZzGYw1sWqj3F59Fti529XgTiK5s6mHoU6M4k887OYytc6Q1xsS9EpN0ln82FJ3rty/+IUO58fKnON3UkwYWykKY8VIAMNLWlmR6Rs8w6kQ0Boz3WTdv27KpGD1IQChaoCGnIKHbU5vAHs+bwXbldFOANhtu+jEtX9HCKTEIgK/gsKA1oyCkyKYPmQy4L05xMPq05uq7E1+ecIcNyW1uOJ3HTCsuAyQWFQqgrg6ynsG0YfRXEXfaNHbkzu3fNwdx959TSgm5tPujiJkzIKhSKN+MW/WMmBoJedbF7T5bUj0Js5lbd6d8Atz48MSDXGqIZggEwRWEqhWUKcwnha0JhWQpTCaYo/D6hoSnH5Ej+KuNtVTJ1o3ryXX++oT7qkS+ArGbTGkoCGkFIphQC6IKAFgwRPn0wiO23vpm2bfREGvMdP7/bfuQvAJp0QuDPnxVkbWsNNbWG6/ep4SKfuLX5Bc3LzSeyHttMAAAAAElFTkSuQmCC'
	};
	var fontColours = { 'online': '#008800', 'offline': '#F00000', 'inactive': '#708090' };
	
	cellElement.html(makeCell(tpl, status, images[status], lastOnline, status.toUpperCase(), fontColours[status]));
	cellElement.css("background-image", "none")
}

function Location(xCoord, yCoord) {
	this.X = xCoord;
	this.Y = yCoord;
	this.toString = function() { return "[" + this.X + ":" + this.Y + "]"; } 
}

function extractLocation(html) {
	var rgx = /.*\[(\d+):(\d+)\].*/;
	var x = html.replace(rgx, "$1");
	var y = html.replace(rgx, "$2");
	return new Location(x, y);
}

function fmt(n, unit) {
	return (n>0 ? n + unit : "");
}

function getDistance(p1, p2) {
	// compute duration to ship goods from p1 to p2
	if (p1.X == p2.X && p1.Y == p2.Y) {
		return "10m";
	}
	
	var distance = Math.ceil(1200*Math.sqrt(Math.pow(Math.abs(p1.X-p2.X), 2) + Math.pow(Math.abs(p1.Y-p2.Y), 2)));
	var days = Math.floor(distance/86400); distance = distance - days*86400;
	var hours = Math.floor(distance/3600); distance = distance - hours*3600;
	var minutes = (days > 0) ? 0 : Math.floor(distance/60);
	var seconds = (days + hours > 0) ? 0 : distance - minutes*60;
	return fmt(days, 'D') + fmt(hours, 'h') + fmt(minutes, 'm') + fmt(seconds, 's');
}

function options() {
	var allElements = document.getElementsByTagName('form');
	for(var i = 0; i < allElements.length; i++) {
	    var thisElement = allElements[i];
		if (thisElement.elements[0].value == 'Options') {
			var div = document.createElement('div');
			div.setAttribute("id", "AIOEmbassyOptions");
			div.innerHTML = <>
				<div>
					<h3>All-in-One Embassy Options</h3>
					<table cellpadding="0" cellspacing="0">
						<tr><td align="center">
							How should I display the information?<br />
							<input id="aioeInfoDisplayText" type="radio" name="aioeInfoDisplayMode" value="Text" />Text <input id="aioeInfoDisplayImages" type="radio" name="aioeInfoDisplayMode" value="Images" />Images<br />
						</td></tr>
						<tr><td align="center">
							How should I display the dates?<br />
							<input id="aioeDisplayDate" type="radio" name="aioeDisplayMode" value="Dates" />Dates <input id="aioeDisplayDurations" type="radio" name="aioeDisplayMode" value="Durations" />Durations<br />
						</td></tr>
						<tr><td align="center">
							How should I display the variations?<br />
							<input id="aioeVarDisplayText" type="radio" name="aioeVarDisplayMode" value="Text" />Text <input id="aioeVarDisplayImages" type="radio" name="aioeVarDisplayMode" value="Images" />Images<br />
						</td></tr>
						<tr><td align="center">
							<div class="centerButton"><input id="aioeReset" class="button" value="Reset!" type="button" /></div>
						</td></tr>
					</table>
				</div>
			</>;
			
			thisElement.insertBefore(div, document.getElementById('options_debug'));
			
			if (GM_getValue(INFO_DISPLAY_TEXT, true)) {
				document.getElementById("aioeInfoDisplayText").checked = true;
			} else {
				document.getElementById("aioeInfoDisplayImages").checked = true;
			}
			
			document.getElementById("aioeInfoDisplayText").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, true);
				}, true);
			document.getElementById("aioeInfoDisplayImages").addEventListener('change',
				function() {
					GM_setValue(INFO_DISPLAY_TEXT, false);
				}, true);

			if (GM_getValue(DISPLAY_DATE, true)) {
				document.getElementById("aioeDisplayDate").checked = true;
			} else {
				document.getElementById("aioeDisplayDurations").checked = true;
			}
			
			document.getElementById("aioeDisplayDate").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, true);
				}, true);
			document.getElementById("aioeDisplayDurations").addEventListener('change',
				function() {
					GM_setValue(DISPLAY_DATE, false);
				}, true);
				
			if (GM_getValue(VAR_DISPLAY_TEXT, true)) {
				document.getElementById("aioeVarDisplayText").checked = true;
			} else {
				document.getElementById("aioeVarDisplayImages").checked = true;
			}
			
			document.getElementById("aioeVarDisplayText").addEventListener('change',
				function() {
					GM_setValue(VAR_DISPLAY_TEXT, true);
				}, true);
			document.getElementById("aioeVarDisplayImages").addEventListener('change',
				function() {
					GM_setValue(VAR_DISPLAY_TEXT, false);
				}, true);

			document.getElementById("aioeReset").addEventListener('click',
		    		function() {
						if (confirm(message(CONFIRM))) {
							writeCache(CACHE_TYPE_LAST, {}, true);
							writeCache(CACHE_TYPE_RESET, {}, true);
						}
		    		}, true);			
			return;
		}
	}
}

$(function(){ dispatch(); });