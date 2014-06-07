// ==UserScript==
// @name          Flickr Photostream Graphr
// @version       1.08
// @description   Graph the number of times your photostream has been viewed
// @namespace     http://flickr.photostreamgraphr.com
// @include       http://www.flickr.com/photos/*
// @include       http://flickr.com/photos/*
// ==/UserScript==

/*
	Description
	===========
	Display a graph of how often your photostream has been viewed.
	
	Implementation Notes:
	Flickr does not make daily viewing data for your photostream available (nor does it even track this data, as far as I know).  All it reports is how many times your photostream has been viewed overall.  This script tracks the total view count across multiple days to derive daily view counts from the total that is reported by Flickr.  For example, if your photostream page yesterday said "Your photostream has been viewed 500 times", and today it says "Your photostream has been viewed 520 times", you can infer that you had 20 photostream views between yesterday and today.  The script collects this data and sends it to a graphing site to generate the graph that is displayed on your photostream page.

	One implication of this data collection system is that the view statistics are only collected and updated when you access your photostream page.  If you go several days without accessing your photostream page, the script has no way of knowing what the view counts were during the missing days.  In this situation, it takes the current total view count and the most recent total view count and averages the views across all the missing days.  The data is not totally accurate in this situation, but the graph is really just for fun in any case and the missing data should not matter too much.

	Another implication is that the graph will not start to generate meaningful data until the day _after_ it is installed.  On the first day, it doesn't have any previous view counts to work with, so it is only counting views as of the moment it is installed.  It can never show data from before the point it was installed, because again, Flickr does not provide access to historical photostream view information.

	History
	=======
	V 1.00 - 2006-03-26 - Original Release
	V 1.01 - 2006-03-27 - Add sparkline support
	V 1.02 - 2006-03-28 - Fix display bug
	V 1.03 - 2006-03-28 - Send version info to server
	V 1.04 - 2006-03-31 - Link back to script home page to check for updates
	V 1.05 - 2006-05-17 - Fix for Flickr Gamma site upgrade
	V 1.06 - 2006-05-22 - Additional fixes to adapt to Flickr's changing site design.  Add chart placement options.  Add color selection options.
	V 1.07 - 2006-05-25 - Add support for multiple Flickr accounts on the same machine - data is stored separately for each account, so each account has its own graph.
	V 1.08 - 2006-06-12 - Fix for yet another Flickr change to the format of view data

	To check for updates, visit http://www.flickr.com/photos/jpoa/118364532/
*/


/*
	Configuration
	=============
	CHART_TYPE - Integer from 1 to 2
		1 - Standard graph (default)
		2 - Sparkline (inline) (see http://en.wikipedia.org/wiki/Sparkline)

	CHART_LOCATION - Integer from 1 to 2 (only applies if CHART_TYPE = 1)
		1 - Locate above Sets
		2 - Locate below Sets

	CHART_FILL_COLOR - String value with comma-separated decimal RGB values for chart fill color.  Default is Flickr pink (255,0,132)

	CHART_OUTLINE_COLOR - String value with comma-separated decimal RGB values for chart outline color.  Default is Flickr blue (0, 99, 220)

*/

var CHART_TYPE = 1;
var CHART_LOCATION = 1;
var CHART_FILL_COLOR = "255,0,132";
var CHART_OUTLINE_COLOR = "0,99,220";

// End Configuration Section


var inTop;
var SCRIPT_VERSION = "1.08";
var userid = "user";

function process() {
	inTop = matches(document.location, /photos\/[^/]+\/$/);
	if (inTop) {
		processTop();
		return;
	}
}

function processTop() {
	//var list = xpath("//td[@class='Extras']"); Changed 1.08 6/12/06
	var list = xpath("//td[@class='Section']/h1/small");
	var views = 0;
	var element;
	var viewElement;

	var re = new RegExp("/photos/([^/]+)");
	var matches = re.exec(document.location);
	if (matches.length > 1) {
		userid = matches[1];
	}

	for (var i = 0; i < list.snapshotLength; ++i) {
		element = list.snapshotItem(i);
		var c = element.firstChild;
		if (c == null) continue;
		var theText = c.nodeValue;
		if (theText != null) {
			var viewRe = new RegExp("([\\d,]+) [Vv]iews");
			var viewMatches = viewRe.exec(theText);
			if (viewMatches.length > 1) {
				views = viewMatches[1].replace(/[^\d]/g, "") * 1;
				break;
			}
		}
	}
	if (views <= 0) return;

	var newLink = document.createElement("a");
	newLink.href = "http://www.flickr.com/photos/jpoa/118364532/";
	var newImage = document.createElement("img");
	newImage.src = "";
	newLink.appendChild(newImage);
	var newSpan = document.createElement("span");
	newSpan.id = "chartPlaceholder";
	if (CHART_TYPE == 1) {
		newSpan.appendChild(document.createTextNode("Daily Photostream Views"));
		newSpan.appendChild(document.createElement("br"));
	}
	newSpan.appendChild(newLink);
	if (CHART_TYPE == 1) {
		newSpan.appendChild(document.createElement("br"));
	}
	newSpan.setAttribute("style", "display:none;");

	var setSpace;

	list = xpath("//div[@class='SetSpace']");
	if (list.snapshotLength > 0) {
		setSpace = list.snapshotItem(0);
	}


	if (CHART_TYPE == 1) {
		if (CHART_LOCATION == 1) {
			if (setSpace != null) {
				setSpace.insertBefore(newSpan, setSpace.firstChild);
			}
		} else if (CHART_LOCATION == 2) {
			setSpace.appendChild(newSpan);
		}
	} else if (CHART_TYPE == 2) {
		viewElement.parentNode.insertBefore(newSpan, viewElement);
	}

	copyConfigValues();

	var now = new Date();
	var yesterday = new Date();
	yesterday.setTime(now.getTime() - (60 * 60 * 24 * 1000));

	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var yesterdayYear = yesterday.getFullYear();
	var yesterdayMonth = yesterday.getMonth() + 1;
	var yesterdayDay = yesterday.getDate();

	var monthStr = monthString(now.getFullYear(), month);
	var yesterdayMonthStr = monthString(yesterday.getFullYear(), yesterdayMonth);
	var firstTime = false;

	var initialMonth = GM_getValue(userid + ".firstMonth", "");
	if (initialMonth == "") {
		initialMonth = (day == 1) ? yesterdayMonthStr : monthStr;
		GM_setValue(userid + ".firstMonth", initialMonth);
		firstTime = true;
	}

	var currentValue = GM_getValue(userid + "." + monthStr, "");
	var currentArray = new Array(31);
	if (currentValue != "") {
		currentArray = currentValue.split(",");
	}
	currentArray[day - 1] = views;
	if (firstTime) {
		if (day >= 2) {
			currentArray[day - 2] = views - 1;
		} else if (day == 1) {
			var lastMonthArray = new Array(31);
			lastMonthArray[yesterdayDay - 1] = views - 1;
			var lastMonthValue = lastMonthArray.join(",");
			GM_setValue(userid + "." + yesterdayMonthStr, lastMonthValue);
		}
	}
	currentValue = currentArray.join(",");

	GM_setValue(userid + "." + monthStr, currentValue);

	var pieces = initialMonth.split("-");
	var theYear = pieces[0] * 1;
	var theMonth = pieces[1] * 1;
	var postData = "";
	while (theYear < year || (theYear == year && theMonth <= month)) {
		var key = monthString(theYear, theMonth);
		var monthData = GM_getValue(userid + "." + key, "");
		if (monthData != "") {
			if (postData == "") {
			} else {
				postData += "&";
			}
			postData += "key" + key + "=" + monthData;
		}
		theMonth++;
		if (theMonth == 13) {
			theMonth = 1;
			theYear++;
		}
	}
	postData += "&CHART_TYPE=" + CHART_TYPE;
	postData += "&CHART_FILL_COLOR=" + CHART_FILL_COLOR;
	postData += "&CHART_OUTLINE_COLOR=" + CHART_OUTLINE_COLOR;
	postData += "&VERSION=" + SCRIPT_VERSION;
	request(postData);
}

function copyConfigValues() {
	var initialMonth = GM_getValue("firstMonth", "");
	if (initialMonth == "") {
		return;
	}

	GM_setValue("firstMonth", "");
	GM_setValue(userid + ".firstMonth", initialMonth);

	var now = new Date();
	var year = now.getFullYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();

	var pieces = initialMonth.split("-");
	var theYear = pieces[0] * 1;
	var theMonth = pieces[1] * 1;
	while (theYear < year || (theYear == year && theMonth <= month)) {
		var key = monthString(theYear, theMonth);
		var monthData = GM_getValue(key, "");
		GM_setValue(userid + "." + key, monthData);
		GM_setValue(key, "");
		theMonth++;
		if (theMonth == 13) {
			theMonth = 1;
			theYear++;
		}
	}
}

function request(postData) {
	log("Fetching request...");
	GM_xmlhttpRequest({
		method: "POST",
		url: "http://myjavaserver.com/servlet/testbed.ChartServlet",
		headers: {
			"User-agent": "Mozilla/4.0 (compatible) Greasemonkey (Flickr Photostream Graphr)",
			"Accept": "application/atom+xml,application/xml,text/xml",
			"Content-type": "application/x-www-form-urlencoded",
			"Referer": document.location,
		},
		data: postData,
		onload: function(responseDetails) {
			log("Received response.");
			var doc = responseDetails.responseText;
			//log(doc);
			var chartUrl = "";
			if (doc.indexOf("servlet runner") > 0) {
				chartUrl = "http://myjavaserver.com/~testbed/error.png";
			}
			log(doc);

			doc = new XML(doc);
			if (doc.filename == "error.png") {
				chartUrl = "http://myjavaserver.com/~testbed/error.png";
			} else {
				if (CHART_TYPE == 1) {
					chartUrl = "http://myjavaserver.com/servlet/testbed.MyDisplayChart?filename=" + doc.filename;
				} else {
					chartUrl = "http://bitworking.org/projects/sparklines/spark.cgi?type=smooth&d=" + doc.data + "&height=20&min-m=false&max-m=false&last-m=true&min-color=red&max-color=blue&last-color=red&step=2";
				}
			}
			var list = xpath("//span[@id='chartPlaceholder']");
			if (list.snapshotLength > 0) {
				var span = list.snapshotItem(0);
				if (CHART_TYPE == 1) {
					var link = span.firstChild.nextSibling.nextSibling;
					var img = link.firstChild;
					img.src = chartUrl;
					span.setAttribute("style", "display:block; overflow:hidden; width:185px; height:150px;");
					img.setAttribute("style", "position:relative; left:-30px; top:-1px;");
				} else {
					var link = span.firstChild;
					var img = link.firstChild;
					img.src = chartUrl;
					span.setAttribute("style", "display:inline;");
					img.setAttribute("style", "border:none;vertical-align:middle;");
					span.appendChild(document.createTextNode(" "));
					// Get rid of bullet
					var c = span.nextSibling;
					var cleanText = c.nodeValue.substring(4, 99);
					if (CHART_TYPE == 2) {
						var newNode = document.createTextNode(cleanText);
						c.parentNode.replaceChild(newNode, c);
					}
				}
			}
		}
	});
}

function monthString(year, month) {
	month = month * 1;
	var ret = "";
	if (month <= 9) {
		ret += "0";
	}
	ret += month;
	return year + "-" + ret;

}

function xpath(query, startingPoint) {
	if (startingPoint == null) {
		startingPoint = document;
	}
	var retVal = document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return retVal;
}

function log(s) {
	GM_log(s);
}

function s(num) {
	if (num == 1) return "";
	return "s";
}

function matches(string, re) {
	return re.test(string);
}

function span(text, id) {
	var newSpan = document.createElement("span");
	span.appendChild(document.createTextNode(text));
	if (id != null) {
		newSpan.id = "chartPlaceholder";
	}
	return newSpan;
}


process();