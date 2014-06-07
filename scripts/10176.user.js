// ==UserScript==
// @name          Ipernity Visits Graph
// @version       2.9.4.4
// @description   Graph the number of times your photostream has been viewed
// @namespace     http://ipernity.streamgraphr.com
// @include       http://www.ipernity.com/home/*
// @include       http://ipernity.com/home/*
// ==/UserScript==

/*
	Description
	========
	Display a graph of how often your photostream has been viewed.
	
	Implementation Notes:
	Flickr does not make daily viewing data for your photostream available (nor does it even track this data, as far as I know).  All it reports is how many times your photostream has been viewed overall.  This script tracks the total view count across multiple days to derive daily view counts from the total that is reported by Flickr.  For example, if your photostream page yesterday said "Your photostream has been viewed 500 times", and today it says "Your photostream has been viewed 520 times", you can infer that you had 20 photostream views between yesterday and today.  The script collects this data and sends it to a graphing site to generate the graph that is displayed on your photostream page.

	One implication of this data collection system is that the view statistics are only collected and updated when you access your photostream page.  If you go several days without accessing your photostream page, the script has no way of knowing what the view counts were during the missing days.  In this situation, it takes the current total view count and the most recent total view count and averages the views across all the missing days.  The data is not totally accurate in this situation, but the graph is really just for fun in any case and the missing data should not matter too much.

	Another implication is that the graph will not start to generate meaningful data until the day _after_ it is installed.  On the first day, it doesn't have any previous view counts to work with, so it is only counting views as of the moment it is installed.  It can never show data from before the point it was installed, because again, Flickr does not provide access to historical photostream view information.

	History
	=====
	V 1.00 - 2006-03-26 - Original Release
	V 1.01 - 2006-03-27 - Add sparkline support
	V 1.02 - 2006-03-28 - Fix display bug
	V 1.03 - 2006-03-28 - Send version info to server
	V 1.04 - 2006-03-31 - Link back to script home page to check for updates
	V 1.05 - 2006-05-17 - Fix for Flickr Gamma site upgrade
	V 1.06 - 2006-05-22 - Additional fixes to adapt to Flickr's changing site design.  Add chart placement options.  Add color selection options.
	V 1.07 - 2006-05-25 - Add support for multiple Flickr accounts on the same machine - data is stored separately for each account, so each account has its own graph.
	V 1.08 - 2006-06-12 - Fix for yet another Flickr change to the format of view data

	V 2.0  - 2006-12-22 - Modified to create the graph localy using a canvas element
	V 2.1  - 2006-12-22 - Added grid, labels, last 30 days and mean values
	V 2.1.1 - 2006-12-22 - Fix an calculation mistake if data for some days is missing
	V 2.1.2 - 2007-01-06 - Better grid scaling for very large numbers of daily views
	V 2.1.3	- 2007-03-01 - Bug fixed which did fill up every month to 31 days
	V 2.2.0 - 2007-03-15 - Adjust to new flickr layout and only show sparkline on start
	V 2.9.0 - 2007-03-19 - work in progress for the code restructuring, published because of a few small bugfixes and tweaks
	V 2.9.2 - 2007-06-06 - A bug fix for the change of the presentation of the number of views, now more characters can be used as grouping symbol " ", "," and "."
	V 2.9.2.1 - 2007-06-07 - Bug fix for the all-time mean value position
	V 2.9.3 - 2007-06-12 - adjusted view parsing to work in all current language versions
	V 2.9.3.1 - 2007-06-20 - Version for Ipernity
	V 2.9.3.2 - 2007-06-21 - colours for Ipernity (replaced flickr pink)
	V 2.9.3.3 - 2007-06-21 - adjusted some colours and improved graphing of data in the first 30 days
	V 2.9.4 - 2007-06-24 -changes to title, some code clean up
	V 2.9.4.1 - 2007-06-28 - short period now 45 days, all time dates just shown when useful
	V 2.9.4.2 - 2007-07-01 - solved bug with calculation of views per day
	V 2.9.4.3 - 2007-08-02 - fixed bug in all-time data
	V 2.9.4.4 - 2007-08-03 - fixed bug in getting the views
*/

// DO NOT CHANGE!
var SCRIPT_VERSION = "2.9.4.4";

/* CONFIGURATION */
var SPARK_HEIGHT = 12;		// sparkline height
var SPARK_WIDTH = 75;		// sparkline width
var CHART_HEIGHT = 300;		// chart height
var CHART_WIDTH = 710;		// chart width

/* INTERNALS */
var inTop;
var userid = "user";
var viewsList;			// path to the views (needed for getting data and putting the sparkline)
var views;			// current Views;
var noDG = 45;

var topSpan;			// the space for the big graph
var topSpanShowed = 0;		// is the big graph shown?

// the data

igData = {};

function process() {
	inTop = matches(document.location, /home\/[^\/]+\/*$/);
	if (inTop) {
		processTop();
		return;
	}
}

function toggleTopSpan() {
	if ( topSpanShowed ) {
		topSpan.setAttribute("style", "display:none;");
		topSpanShowed = 0;
	} else {
		topSpan.setAttribute("style", "display:block;position: relative; top: 0; left:0; width:0; height:0; overflow:visible; z-index: 10000 !important;");
		topSpanShowed = 1;
	}
}

function processTop() {
	getViews();
	if (views <= 0) {
		return;
	}

	igData = new IperGraphData(views);

	var newSpan = document.createElement("div");
	newSpan.id = "chartPlaceholder";
	var gTitle = document.createElement("span");
	gTitle.appendChild(document.createTextNode("Daily Visits Graph"));
	gTitle.setAttribute("style", "font-size: 150%; white-space: nowrap;");
	newSpan.appendChild(gTitle);
	var gvLink = document.createElement("a");
	gvLink.href = "http://www.ipernity.com/blog/c.schurig/12225";
	gvLink.setAttribute("style", "margin:0;padding:0;");
	newSpan.appendChild(gvLink);
	var gVersion = document.createElement("span");
	gVersion.appendChild(document.createTextNode(" v" + SCRIPT_VERSION));
	gVersion.setAttribute("style", "font-size: 50%;");
	gvLink.appendChild(gVersion);
	gTitle.appendChild(gvLink);
	newSpan.appendChild(document.createElement("br"));
	var newImage = document.createElement("canvas");
//	var histoGraph = document.createElement("canvas");
	newSpan.appendChild(newImage);
//	newSpan.appendChild(histoGraph);

	topSpan = document.createElement("div");
	var bgSpan = document.createElement("div");
	topSpan.appendChild(bgSpan);
	topSpan.appendChild(newSpan);

	var sparkImageA = document.createElement("a");
	var sparkImage = document.createElement("canvas");
	sparkImageA.appendChild(sparkImage);
	sparkImageA.addEventListener("click", toggleTopSpan, false);
	var sparklineSpace;
	var setSpace;

	var list = xpath('//*[@id="home_0_title"]');

	if (list.snapshotLength > 0) {
		sparklineSpace = list.snapshotItem(0);
		if (sparklineSpace != null) {
			//setSpace.parentNode.insertBefore(topSpan, setSpace);
			sparklineSpace.appendChild(sparkImageA);
		}
	}

	list = xpath('/html/body/div[2]/table/tbody/tr/td/div/table/tbody/tr[3]/td/div');
	if (list.snapshotLength > 0) {
		setSpace = list.snapshotItem(0);
		if (setSpace != null) {
			//setSpace.parentNode.insertBefore(topSpan, setSpace);
			setSpace.parentNode.insertBefore(topSpan, setSpace);
		}
	}

	topSpan.setAttribute("style", "position: relative; top: 0; left:0; width:0; height:0; overflow:visible; display:none; z-index: 10000 !important;");
	bgSpan.setAttribute("style", "width: 760px; height: 400px; background: #eee; opacity: 0.95;");
	newSpan.setAttribute("style", "opacity: 1; position: relative; left: 0; top: -400px; width: 760px; height: 400px; padding: 25px;");


	newImage.setAttribute("style", "position:relative; left:-10px; top:15px;margin:0;padding:0;");
	newImage.setAttribute("width", CHART_WIDTH);
	newImage.setAttribute("height", CHART_HEIGHT);
//	histoGraph.setAttribute("style", "position: absolute; left:0; top:0; width:" + CHART_WIDTH/2 + "height:" + CHART_HEIGHT*0.75);
	var ctx = newImage.getContext("2d");

	// sparkline
	var sparkh = 1.5*SPARK_HEIGHT+3;
	sparkImage.setAttribute("height", sparkh);
	sparkImage.setAttribute("width", SPARK_WIDTH + 12);
	sparkImage.setAttribute("style", "position: relative; left: 10px; top: 6px;" + "height: " + sparkh + "px");
	var sctx = sparkImage.getContext("2d");

	var offset = 30;

	// grid lines and scaling
	// y
	var dy = 0;
	if (igData.maxAll <= 70) {
		dy = 10;
	} else if (igData.maxAll <= 140) {
		dy = 20;
	} else if (igData.maxAll <= 280) {
		dy = 40;
	} else if (igData.maxAll <= 560) {
		dy = 80;
	} else if (igData.maxAll < 1000) {
		dy = 200;
	} else if (igData.maxAll <= 2000) {
		dy = 400;
	} else {
		dy = Math.ceil(igData.maxAll / 6 / 500) * 500;
	}
	
	igData.maxAll = Math.ceil(igData.maxAll / dy) * dy;

	// how many points have we?
	lll = igData.Y.length;

	if (lll > 1) {
		// more then 30? (then we'll have two graphs)
		ml = (lll > noDG) ? noDG : lll;
		// the graph of the last 30 days (or less, if you haven't run the script long enough)
		ctx.fillStyle = "rgba(110,207,4,0.8)";
		sctx.strokeStyle = "rgba(110,207,4,1)";
		sctx.lineWidth = 1;
		ctx.beginPath();
		sctx.beginPath();
		ctx.moveTo(offset + (noDG - ml)*(CHART_WIDTH - offset)/noDG, CHART_HEIGHT);
		sctx.moveTo((noDG - ml)*SPARK_WIDTH/noDG, 1.5*(SPARK_HEIGHT - SPARK_HEIGHT/igData.maxTH * igData.Y[lll-ml])+1);
		for (i = 0; i < ml; i++) {
			ctx.lineTo(offset + (noDG - ml + i)*(CHART_WIDTH - offset)/noDG, CHART_HEIGHT - (CHART_HEIGHT - 10)/igData.maxAll * igData.Y[i+lll-ml]);
			ctx.lineTo(offset + (noDG - ml + i + 1)*(CHART_WIDTH - offset)/noDG, CHART_HEIGHT - (CHART_HEIGHT - 10)/igData.maxAll * igData.Y[i+lll-ml]);
			sctx.lineTo((noDG - ml + i) * SPARK_WIDTH / noDG, 1.25 * (SPARK_HEIGHT - SPARK_HEIGHT/(igData.maxTH - igData.minTH)* (igData.Y[i+lll-ml] - igData.minTH))+2);
		}
		ctx.lineTo(CHART_WIDTH, CHART_HEIGHT);
		ctx.closePath();
		ctx.fill();
		sctx.stroke();
	
		sctx.strokeStyle = "rgba(0, 99, 220,1)";
		sctx.lineWidth = 3;
		sctx.beginPath();
		sctx.moveTo(SPARK_WIDTH - 1, 1.25 * (SPARK_HEIGHT - SPARK_HEIGHT/(igData.maxTH - igData.minTH)* (igData.Y[lll-1] - igData.minTH))+2+1);
		sctx.lineTo(SPARK_WIDTH + 1, 1.25 * (SPARK_HEIGHT - SPARK_HEIGHT/(igData.maxTH - igData.minTH)* (igData.Y[lll-1] - igData.minTH))+2-1);
		sctx.stroke();
	}
	
	var viewsToday = document.createElement("span");

	if ( lll > 1 ) {
		viewsToday.appendChild(document.createTextNode(Math.round(igData.Y[lll - 1])));
	} else {
		viewsToday.appendChild(document.createTextNode("no data yet - collecting"));
	}
	sparklineSpace.insertBefore(viewsToday,sparkImage.nextSibling);
	viewsToday.setAttribute("style", "color:#0063dc; font-size: 50%; font-weight: normal; padding-left: 10px;");

	ctx.lineWidth = 3;

	// we have more than 30 days of data, so superimpose a graph
	// with all the data in blue
	if (lll > noDG) {
		ctx.fillStyle = "rgba(0, 99, 220,0.5)";
		ctx.beginPath();
		ctx.moveTo(offset, CHART_HEIGHT);
		for (i = 0; i < lll; i++) {
			ctx.lineTo(offset + i*(CHART_WIDTH - offset)/lll, CHART_HEIGHT - (CHART_HEIGHT - 10)/igData.maxAll * igData.Y[i]);
			ctx.lineTo(offset + (i+1)*(CHART_WIDTH - offset)/lll, CHART_HEIGHT - (CHART_HEIGHT - 10)/igData.maxAll * igData.Y[i]);
		}
		ctx.lineTo(CHART_WIDTH, CHART_HEIGHT);
		ctx.closePath();
		ctx.fill();
		
		// mean over all data
		ctx.strokeStyle = "rgba(25, 75, 200,0.5)";
		ctx.beginPath();
		ctx.moveTo(offset, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * igData.mean);
		ctx.lineTo(CHART_WIDTH, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * igData.mean);
		ctx.stroke();
	}

	// mean over the last noDG days
	ctx.strokeStyle = "rgba(65,122,2,0.75)";
	ctx.beginPath();
	ctx.moveTo(offset, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * igData.meanTH);
	ctx.lineTo(CHART_WIDTH, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * igData.meanTH);
	ctx.stroke();

	// the frame
	ctx.lineWidth = 1;
	ctx.strokeStyle = "rgb(20,20,20)";
	ctx.beginPath();
	ctx.moveTo(offset,CHART_HEIGHT);
	ctx.lineTo(offset,10);
	ctx.lineTo(CHART_WIDTH,10);
	ctx.lineTo(CHART_WIDTH,CHART_HEIGHT);
	ctx.closePath();
	ctx.stroke();	

	// the grid
	ctx.strokeStyle = "rgba(40,40,40,0.2)";
	// y-grid	
	for (i = 1; i < igData.maxAll/dy; i++) {
		ctx.beginPath();
		ctx.moveTo(offset, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * i * dy);
		ctx.lineTo(CHART_WIDTH, CHART_HEIGHT - (CHART_HEIGHT - 10)/ igData.maxAll * i * dy);
		ctx.stroke();
	}
	// x-grid
	xnum = Math.floor(noDG / 5);
	for (i = 1; i < xnum; i++) {
		ctx.beginPath();
		ctx.moveTo(CHART_WIDTH - i * (CHART_WIDTH-offset)/xnum,10);
		ctx.lineTo(CHART_WIDTH - i * (CHART_WIDTH-offset)/xnum,CHART_HEIGHT);
		ctx.stroke();
	}	

	var numberStyle = "position:relative;z-index:100;font-size:14px;width:100px;height:0px;overflow:visible;margin:0;padding:0;";
	var nSpan;
	for (i = 0; i <= igData.maxAll/dy; i++) {
		nSpan = document.createElement("div");
		nSpan.appendChild(document.createTextNode(Math.floor(i * dy)));
		newSpan.appendChild(nSpan);
		numberOffset = Math.floor(6 - (CHART_HEIGHT - 12)/igData.maxAll * i * dy);
		nStyle = numberStyle + "top:" + numberOffset + "px;" + "color:black;text-align:right;right:85px;" ;
		nSpan.setAttribute("style", nStyle);
	}

	// mean Values
	posYA = Math.floor((CHART_HEIGHT - 12) / igData.maxAll * igData.mean);
	posYT = Math.floor((CHART_HEIGHT - 12) / igData.maxAll * igData.meanTH);
	if (lll > noDG) {
		posD = (igData.mean - igData.meanTH)/igData.maxAll*(CHART_HEIGHT - 12);
		if ( Math.abs(posD) <  16) {
			corrD = (posD > 0) ? -8 : 8;
			posYA = Math.floor((igData.mean + igData.meanTH) / (2 * igData.maxAll) * (CHART_HEIGHT - 12) - corrD + 2);
			posYT = Math.floor((igData.mean + igData.meanTH) / (2 * igData.maxAll) * (CHART_HEIGHT - 12) + corrD + 2);
		}
		nSpan = document.createElement("div");
		nSpan.appendChild(document.createTextNode(igData.mean));
		newSpan.appendChild(nSpan);
		numberOffset = Math.floor(8 - posYA);
		nStyle = numberStyle + "top:" + numberOffset + "px;" + "color:#0063dc;text-align:left;left:705px;" ;
		nSpan.setAttribute("style", nStyle);
	}
		

	nSpan = document.createElement("div");
	nSpan.appendChild(document.createTextNode(igData.meanTH));
	newSpan.appendChild(nSpan);
	numberOffset = Math.floor(6 - posYT);
	nStyle = numberStyle + "top:" + numberOffset + "px;" + "color:#417a02;text-align:left;left:705px;" ;
	nSpan.setAttribute("style", nStyle);

	// noDG days
	for (i=0; i<=xnum; i++) {
		nSpan = document.createElement("div");
		nSpan.appendChild(document.createTextNode(-Math.floor(noDG / xnum * i)));
		newSpan.appendChild(nSpan);
		numberOffset = CHART_WIDTH - Math.floor((CHART_WIDTH - offset) / xnum * i) - 75 + offset/2;
		nStyle = numberStyle + "top:16px;" + "color:#417a02;text-align:center;left:" + numberOffset + "px;" ;
		nSpan.setAttribute("style", nStyle);
	}
	// dates
	if (lll > noDG) {
		dd = (igData.X.length - 1)/ xnum;
		for (i=0; i<=xnum; i++) {
			nSpan = document.createElement("div");
			nSpan.appendChild(document.createTextNode(igData.X[Math.floor((xnum - i) * dd)]));
			newSpan.appendChild(nSpan);
			numberOffset = CHART_WIDTH - Math.floor((CHART_WIDTH - offset) / xnum * i) - 75 + offset/2;
			verticalOffset = 6 - CHART_HEIGHT;
			nStyle = numberStyle + "top:" + verticalOffset + "px;" + "color:#0063dc;text-align:center;left:" + numberOffset + "px;" ;
			nSpan.setAttribute("style", nStyle);
		}
	}
}

function getViews() {
	viewsList = xpath('//table[@class="side"]/tbody/tr/td/div/div/small');
	views = 0;
	var element;
	var viewElement;

	var re = new RegExp("/home/([^/]+)");
	var matches = re.exec(document.location);
	if (matches.length > 1) {
		userid = matches[1].replace(/\?.*$/,"");
	} else {
		return 0;
	}

	for (var i = 0; i < viewsList.snapshotLength; ++i) {
		element = viewsList.snapshotItem(i).childNodes;
		var len = element.length;
		var viewRe = new RegExp("^[^\\d]+([\\d]+)[^\\d]+$");
//		for (var j = 0; j<len; j++) {
			var c = element[4]; //define exactly where to find it
			if (c == null) {
				continue;
			}
			var theText = c.nodeValue;
			if (theText != null) {
//				alert(theText);
				var viewMatches = viewRe.exec(theText);
				if (viewMatches != null) {
					views = viewMatches[1].replace(/[^\d]/g, "") * 1;
					if (views) {
						break;
					}
				}
			}
//		}
		if (views) {
			break;
		}
	}
	return views;
}

function IperGraphData(views) {
	this.maxAll = 1;
	this.minTH = 1e9;
	this.maxTH = 1;
	this.mean = 0;
	this.meanTH = 0;
	this.load(views);
}

IperGraphData.prototype.load = function (curViews) {
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
	var currentArray = [];
	if (currentValue != "") {
		currentArray = currentValue.split(",");
	}
	
	if (firstTime) {
		if (day >= 2) {
			currentArray[day - 2] = views;
		} else if (day == 1) {
			var lastMonthArray = [];
			lastMonthArray[yesterdayDay - 1] = views - 1;
			var lastMonthValue = lastMonthArray.join(",");
			GM_setValue(userid + "." + yesterdayMonthStr, lastMonthValue);
		}
	}
	
	if (views < currentArray[day - 2]) {
		views = currentArray[day - 2];	
	}
	currentArray[day - 1] = views;
	currentValue = currentArray.join(",");

	GM_setValue(userid + "." + monthStr, currentValue);

	var pieces = initialMonth.split("-");
	var theYear = pieces[0] * 1;
	var theMonth = pieces[1] * 1;
	var postData = "";
	this.X = [];
	var graphDataY = [];
	graphDataY[0] = 0;
	var j = 1;
	var i = 0;
	var lll = 0;
	var lastDay = 0;
	this.mean = 0;
	while (theYear < year || (theYear == year && theMonth <= month)) {
		var key = monthString(theYear, theMonth);
		var monthData = GM_getValue(userid + "." + key, "");
		if (monthData != "") {
			currentArray = monthData.split(",");
			// read current month only until today
			if (theYear == year && theMonth == month) {
				lll = day;
			} else {
				lll = currentArray.length;
				dateTest = new Date(theYear, theMonth - 1, lll);
				if (dateTest.getMonth() >= theMonth) {
					lll -= dateTest.getDate();
				}
			}
			for (i = 0; i < lll; i++) {
				xxx = parseInt(currentArray[i], 10);
				if (i>0) {
					xxxb = parseInt(currentArray[i-1], 10);
					if (xxx < xxxb) {
						xxx = -1;
					}
				}
				if ( !(xxx > 0) ) {
					xxx = graphDataY[j-1] - 1;
				}
				this.X[j] = String(theYear).slice(2) + "-" + dateString(theMonth) + "-" + dateString(i+1);
				graphDataY[j++] = xxx;
				dateTest = new Date(theYear, theMonth - 1, i + 1);
				lastDay = dateTest.getDay();
			}
		}
		theMonth++;
		if (theMonth == 13) {
			theMonth = 1;
			theYear++;
		}
	}
	// remove '0' in the beginning
	lll  = graphDataY.length;
	var first = 0;
	for (i = 0; i < lll - 1; i++) {
		if (graphDataY[i] > 0) {
			first = i;
			break;
		}
	}
	
	this.X.splice(0, first+1);
	graphDataY.splice(0, first);

	this.Y = [];
	var ct = 0;
	lll = graphDataY.length;

	r = 1;
	/* randomisation of my data for a screen shot ;-)
	r = Math.random() * 3;*/
	for (i = 1; i < lll; i++ ) {
		/* calling Math.random() everytime makes the data very spikey
		if (Math.random() > 0.8 || r < 1) r = Math.random() * 3;*/
		if (graphDataY[i] < graphDataY[i -1]) {
			ct++;
		} else {
			if ( ct > 0) {
				ct++;
				j = (graphDataY[i] - graphDataY[i - ct]) / ct * r;
				for (var k = 0; k < ct; k++) {
					this.Y[i - 1 - k] = j;
				}
			} else {
				j = (graphDataY[i] - graphDataY[i - 1]) * r;
				this.Y[i - 1] = j;
			}
			ct = 0;
		}
		this.maxAll = (j > this.maxAll) ? j : this.maxAll;
		this.mean += j;
//		curDay = 
	}
	this.mean = Math.ceil(this.mean / (lll-1));
	var ml = noDG;
	if (this.Y.length < noDG) {
		ml = this.Y.length;
	}

	for (i = 0; i < ml; i++) {
		var cv = this.Y[i+lll-ml-1];
		this.maxTH = (this.maxTH < cv) ? cv : this.maxTH;
		this.minTH = (this.minTH > cv) ? cv : this.minTH;
		this.meanTH += cv;
	}
	this.meanTH = Math.ceil(this.meanTH / ml);
};

function monthString(year, month) {
	month = month * 1;
	var ret = "";
	if (month <= 9) {
		ret += "0";
	}
	ret += month;
	return year + "-" + ret;

}

function dateString(digit) {
	digit = digit * 1;
	var ret = "";
	if (digit <= 9) {
		ret += "0";
	}
	return ret + digit;
}

function xpath(query, startingPoint) {
	if (startingPoint == null) {
		startingPoint = document;
	}
	return document.evaluate(query, startingPoint, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function log(s) {
	GM_log(s);
}

function s(num) {
	if (num == 1) {
		return "";
	}
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

/*
 function createCookie(strName, strValue, iDays)
{
	if (iDays)
	{
		var dtDate = new Date();
		dtDate.setTime(dtDate.getTime()+(iDays * 24 * 60 * 60 * 1000));
		var strExpires = '; expires=' + dtDate.toGMTString();
	}
	else
		var strExpires = '';

	document.cookie = strName + '=' + strValue + strExpires + '; path=/';
}

function readCookie(strName)
{
	var nameEQ = strName + '=';
	var arCookies = document.cookie.split(';');
	for(var iCounter=0; iCounter<arCookies.length; iCounter++)
	{
		var strCookie = arCookies[iCounter];
		while (strCookie.charAt(0)==' ')
			strCookie = strCookie.substring(1, strCookie.length);
		if (strCookie.indexOf(nameEQ) == 0)
			return strCookie.substring(nameEQ.length, strCookie.length);
	}
	return null;
}
 */


process();
