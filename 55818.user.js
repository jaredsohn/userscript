// ==UserScript==
// @name           NowPlaying on VCDQuality
// @include        http*://www.vcdq.com/*
// @version 	   1.0
// ==/UserScript==

// load 
var NPURL = "http://hunecker.de/nowplaying/";

window.addEventListener("scroll", checkVisibilities, false);
window.addEventListener("load", init, false);
window.addEventListener("unload", storeCache, false);

// constants
var CACHE_VER = 1;
var CACHE_EXPIRE = 15 * 24 * 60 * 60 * 1000;
var CACHE_LEN = 4000;

var g_country = GM_getValue("g_country", "");
var g_enabledProviders = GM_getValue("g_enabledProviders", "").split(";");
var g_useFading = GM_getValue("g_useFading", true);
var g_groupDisabledSources = GM_getValue("g_groupDisabledSources", true);
var g_expandAll = false; // GM_getValue("g_expandAll", false);
var g_cacheVer = GM_getValue("g_cacheVer", 0);
var g_cache;
var decodingTime = 0;
if (g_cacheVer != CACHE_VER) {
	g_cache = {};
	GM_setValue("g_cacheVer", CACHE_VER);
} else {
	var start = new Date().getTime();
	g_cache = eval(GM_getValue("g_cache")) || {};
	var end = new Date().getTime();
	decodingTime = end - start;
}

var g_titleMap;
g_titleMap = eval(GM_getValue("g_titleMap")) || {};

String.prototype.basicTrim = function () {
	return (this.replace(/\s+$/,"").replace(/^\s+/,""));
};

function Report(provider) {
	this.loaded = false;
	this.posterUrl = null;
	this.rows = new Array();
	// stores additional information
	this.tag = null;
	
	this.provider = provider;
	
	// some DOM elements
	var td1 = null;
	var posterImgTag = null;
	
	this.create = function(key, insertBeforeRow) {
		for (var i = 0; i < insertBeforeRow.childNodes.length; i++) { 
			var child = insertBeforeRow.childNodes[i];
			if (child.style) insertBeforeRow.childNodes[i].style.borderTop = "1px solid grey"; 
		}
		insertBeforeRow.vAlign = "middle";
		this.td1 = insertBeforeRow.childNodes[0];
		this.td1.style.borderBottom = "1px solid grey";
		this.td1.style.paddingRight = "5px";
		this.td1.width = 100;
		this.posterImgTag = document.createElement("img");
		this.posterImgTag.border=0;
		this.posterImgTag.width=100;
		this.posterImgTag.src = noPosterImg;
		this.td1.appendChild(this.posterImgTag);
				
		this.posterImgTag.name = key;
		this.posterImgTag.addEventListener("mouseover", showBigPoster, false);

		var lastRow = insertBeforeRow;
		if (this.rows.length > 1) {
			this.td1.rowSpan = this.rows.length;
			for (var i = 1; i < this.rows.length; i++) { 
				this.rows[i].removeChild(this.rows[i].childNodes[0]); 
				tableNode.insertBefore(this.rows[i], this.rows[i-1].nextSibling);
			}
			lastRow = this.rows[this.rows.length - 1];
		}
		for (var i = 0; i < lastRow.childNodes.length; i++) { 
			var child = lastRow.childNodes[i];
			if (child.style) lastRow.childNodes[i].style.borderBottom = "1px solid grey"; 
		}

		}
	
	this.load = function(data, fromCache) {
		if (data.posterURL == null) {
			this.setPosterSrc(noPosterImg);
		} else {
			loadPosterImage(this.posterImgTag, data.posterURL, key);
		}
	}
	
	this.setPosterSrc = function(src) {
		this.posterImgTag.src = src;
	}
	
	this.isVisible = function() {
		if (this.td1 == null) return false;
		var top = this.td1.offsetTop;
		var p = this.td1.offsetParent;
		while(p) {
			top += p.offsetTop;
			p = p.offsetParent;
		}
		return (top < (window.pageYOffset + window.innerHeight) && 
				(top + this.td1.offsetHeight) > window.pageYOffset);
	}
}

var infoHash = new Array();
var tempHash = new Array();
var movieOrder = new Array();

var tableNode = null;
var firstRow = null;
var numCols = 10;
var linkFound = false;

var barImg = NPURL + "ratingBar.png";
var noPosterImg = NPURL + "noposter.png";
var posterLoadingImg = NPURL + "posterloading.gif";
var getInfoImg = NPURL + "getinfo.png";
var loadBarImg = NPURL+"loadbar.gif";
var activateSourceImg = NPURL + "activateSource.png";
var reloadImg = NPURL + "reload.png";

var Base64 = {

    // private property3
    _keyStr :
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = new Array();
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        while (i < input.length) {

            chr1 = input.charCodeAt(i++) & 0xff;
            chr2 = input.charCodeAt(i++) & 0xff;
            chr3 = input.charCodeAt(i++) & 0xff;

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output.push(this._keyStr.charAt(enc1));
            output.push(this._keyStr.charAt(enc2));
            output.push(this._keyStr.charAt(enc3));
            output.push(this._keyStr.charAt(enc4));
        }

        return output.join("");
    }
}

// load infoProviders
infoProviders = null;
GM_xmlhttpRequest( {
	method:"GET",url:NPURL+"infoProviders3.js",
	onload:function(response) {
		if(response.status==200) {
			eval(response.responseText);
			for (var i = 0; i < infoProviders.length; i++) {
				infoProviders[i].enabled = true;
			}
		}
	}
});

var rowsToProcess = 0;
var rowsProcessed = 0;
function init() {
	if (!infoProviders) {
		setTimeout(init, 1000);
		return;
	}
	// TODO: AddPosterMenu();
	
	//var xpathNew = "//table/tbody/tr[@class='odd' or @class='even']";
	var xpathNew = "//table/tbody/tr[contains(concat(' ',normalize-space(@class),' '),' odd ') or contains(concat(' ',normalize-space(@class),' '),' even ')]";
	var moviesNew =document.evaluate(xpathNew,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	moviesNew.snapshotLength;
	processMovies(moviesNew);

	if (rowsProcessed > 0) {
		var xpathHeader = "//table/thead/tr";
		var headers = document.evaluate(xpathHeader,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var THead = headers.snapshotItem(i);
		
		if (THead.innerHTML.indexOf("IMDB") > -1) {

			// modify first row
			var th = document.createElement("th");
			th.innerHTML = "Cover";
			THead.removeChild(THead.childNodes[17]);
			THead.insertBefore(th, THead.childNodes[0]);
		
			for (var i = 0; i < moviesNew.snapshotLength; i++) {
				var entireRow = moviesNew.snapshotItem(i);
				var td;
				
				td = document.createElement("td");
				td.innerHTML = "&nbsp;";			
				entireRow.removeChild(entireRow.childNodes[17]);
				entireRow.insertBefore(td, entireRow.childNodes[0]);
			}
		}
	}

	loadMovieData();
}

function findTitle(node) {
	if (node.childNodes.length < 6) return null;
	var title = node.childNodes[11].childNodes[1].innerHTML;
	var n = title.search(/\(|\*|\[|SCREENER|XViD|720|1080/);
	if (n > 0) title = title.substr(0, n);
	n = title.search(/S[0-9]+E[0-9]+/);
	if (n > 0) title = title.substr(0, n);
	n = title.search(/E[0-9]+/);
	if (n > 0) title = title.substr(0, n);
	n = title.search(/Season\s?[0-9]/);
	if (n > 0) title = title.substr(0, n);
	return title.basicTrim();
}

function processMovies(movies) {
	var count = 0;
	rowsToProcess = movies.snapshotLength - 2;
	rowsProcessed = 0;

	for (var i = 1; i < movies.snapshotLength - 1; i++)
	{
		var entireRow = movies.snapshotItem(i);
		if (tableNode == null) {
			tableNode = entireRow.parentNode;
			firstRow = entireRow;
		}
		var title = findTitle(entireRow);
		var provider = infoProviders[1];		
		var key = provider.getKey(entireRow.innerHTML);
		
		if (!key && title) {
			if (g_titleMap[title]) {
				key = g_titleMap[title];
			} else {
				if (tempHash[title]) {
					tempHash[title].push(entireRow);
				} else {
					tempHash[title] = new Array();
					tempHash[title].push(entireRow);
				}
			}
		}

		if (key) {
			rowsProcessed++;
			processRow(entireRow, key, title, provider);
		}
	}
	
	for (title in tempHash) {
		var arr = tempHash[title];
		var provider = infoProviders[1];

		// try searching on google
		url = 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + title + '+site:imdb.com';
		
		GM_xmlhttpRequest({
			method:"GET",
			title: title,
			provider: provider,
			url:url,
			onload:function(details) {
				var res;
				res = eval('(' + details.responseText + ')');
				if (res.responseData.results[0]) {
					url2 = res.responseData.results[0].unescapedUrl;
					var key = this.provider.getKey(url2);
					if (key) {
						var arr = tempHash[this.title];
						for (var i = 0; i < arr.length; i++) {
							var row = arr[i];
							processRow(row, key, this.title, this.provider);
						}
						// add to map
						g_titleMap[this.title] = key;
					}
				}
				rowsProcessed += tempHash[this.title].length;
			}
		});
	}
}

function processRow(entireRow, key, title, provider) {
	linkFound = true;
	if (infoHash[key]) {
		// group already existing
		var report = infoHash[key];
		report.rows.push(entireRow);
	} else {
		// get title
		var report = new Report(provider);
		report.title = title;
		report.rows.push(entireRow);
		infoHash[key] = report;
	}
}

function loadMovieData() {
	if (rowsToProcess > rowsProcessed) {
		// wait until everything is loaded
		setTimeout(loadMovieData, 1000);
		return;
	}

	// load data in array
	var i = 0;
	for (key in infoHash) {
		movieOrder.push(key);
		i++;
	}

	displayMovies();
		
	checkVisibilities();
	
	return i;
}

function loadIFrameData(key, iframe) {
	GM_xmlhttpRequest( {
		method:"GET",url:NPURL + "check.php?key="+escape(key),headers: {"User-agent":"Mozilla/4.0 (compatible)"}, 
		onload:function(response) {
			if(response.status==200) {
				var iFrameSrc = NPURL + "show.php?key="+escape(key);
				iframe.src = iFrameSrc;
			} else {
				var iFrameSrc = NPURL + "show.php?pass=qwer&key="+escape(key)+"&data=" + escape(g_cache[key]);
				iframe.src = iFrameSrc;
			}
		},
		onerror:function(response) {
			var iFrameSrc = NPURL + "show.php?key="+escape(key)+"&data=" + escape(g_cache[key]);
			iframe.src = iFrameSrc;
		}
	});

}

// absolute left position
function absLeft(el) {
	return (el.offsetParent)?el.offsetLeft+absLeft(el.offsetParent) : el.offsetLeft;
}
// absolute top position
function absTop(el) {
	return (el.offsetParent)?el.offsetTop+absTop(el.offsetParent) : el.offsetTop;
}

var bigDiv = null;
var bigPoster = null;
var infoIframe = null;
var loadingFrameDiv = null;
var closeBigDiv = null;
function showBigPoster() {
	var key = this.name;
	var report = infoHash[key];
	var provider = report.provider;
	var url = report.posterUrl;
	if (provider.enabled) {
		url = provider.getPosterBig(url, report, key);
	}
	
	if (bigDiv == null) {		
		bigDiv = document.createElement("div");
		bigDiv.style.position = 'absolute';
		bigDiv.style.zIndex = '100';
		bigDiv.style.border = "1px solid black"
		bigDiv.style.width = "600px";
		bigDiv.style.backgroundColor = "white";
		bigDiv.style.height = "400px";
		bigDiv.innerHTML = 
			'<iframe id="infoIframe" width="315" height="400" style="float: left; display: inline; overflow-x: hidden;"></iframe>' +
			'<img id="bigPoster" width="285" valign="middle" style="position: absolute; left:315px; width: 285px; max-height: 400px"/>' +
			'<div id="loadingFrameDiv" style="position: absolute; top: 140px; left: 47px; width: 220px; height: 19px; background-image: url('+loadBarImg+');"></div>' +
			'<img id="closeBigDiv" style="position: absolute; top: 0px; left: 576px; width: 24px; height: 24px;" src="'+NPURL+'closeButton.png"/>';
		
		var parent = document.body;
		bigDiv.addEventListener("mouseout", hideBigPoster, true);
		parent.appendChild(bigDiv);
		bigPoster = document.getElementById("bigPoster");
		infoIframe = document.getElementById("infoIframe");
		loadingFrameDiv = document.getElementById("loadingFrameDiv");
		closeBigDiv = document.getElementById("closeBigDiv");
		closeBigDiv.addEventListener("click", hideBigPoster, false);
	}
	
	bigDiv.style.left = (absLeft(this) + 100) + "px";
	bigDiv.style.top = Math.min(absTop(this), window.pageYOffset + window.innerHeight - 400 ) + "px";
	this.addEventListener("mouseout", hideBigPoster, true);
	bigPoster.src = this.src;
	
	loadingFrameDiv.style.display = "";
	infoIframe.addEventListener("load", hideLoadingImg, false);
	loadIFrameData(key, infoIframe);
	
	if (provider.enabled && url != null) {
		loadPosterImage(bigPoster, url, key);
	}
	
	fade(bigDiv, true, 200, 0, true);
}

function hideLoadingImg(event) {
	loadingFrameDiv.style.display = "none";
}

function hideBigPoster(event) {
	if (event != null && 
		this != closeBigDiv && 
		event.relatedTarget != null && 
		(event.relatedTarget == bigDiv || event.relatedTarget.parentNode == bigDiv)) return;

	if (bigDiv != null) {
		fade(bigDiv, false, 500, 0, true);
	}
}

function displayMovies() {
	for (var i = 0; i < movieOrder.length; i++) {
		var key = movieOrder[i];
		
		var info = infoHash[key];
		if (info == null) continue;
		
		var rating = info.rating;
		var tbody = null;
		var rows = info.rows;
		
		var insertBeforeRow = rows[0];
		
		info.create(key, insertBeforeRow);
		
		// move rows to group
		if (rows.length > 1) {
			for (var j = 1; j < rows.length; j++) {
			}
		}
		//return;
	}
}

var posterArray = new Array();
function pushPosterImage(poster, src, ref) {
	var c = new Array(poster, src, ref);
	posterArray.push(c);
}

function loadPosterImage(poster, posterURL, key) {
	var provider = infoHash[key].provider;
	var URL = provider.getLink(key, infoHash[key]);
	GM_xmlhttpRequest( {
		method:"GET",url:posterURL,headers: {Referer:URL,"User-agent":"Mozilla/4.0 (compatible)"}, 
		overrideMimeType:'text/plain; charset=x-user-defined',
		onload:function(response) {
			if(response.status==200) {
				var text = response.responseText;
				var b64 = Base64.encode(text);
				poster.src = "data:image/jpeg;base64,"+b64;
			} else {
				poster.src = noPosterImg;
			}
		},
		onerror:function(response) {
			poster.src = noPosterImg;
		}
	});
}

function sortArray() {
	movieOrder.sort(function(a, b) {
		var aa = infoHash[a];
		var ab = infoHash[b];
		
		if (aa == null && ab == null) return 0;
		if (aa == null) return -1;
		if (ab == null) return 1;
		
		return ab.rating - aa.rating;
	});
}

function checkVisibilities() {
	for (var key in infoHash) {
		var report = infoHash[key];
		if (!report.loaded && report.isVisible()) {
			loadInfo(key, false);
		}
	}
}

function reportError(key, message) {
	var report = infoHash[key];
	report.setDescription(message);
	report.setPosterSrc(noPosterImg);	
}

function loadInfo(key, passCache) {
	var report = infoHash[key];
	report.loaded = true;
	report.setPosterSrc(posterLoadingImg);
	var provider = report.provider;
	
	if (!provider.enabled) {
		reportError(key, "The data provider "+provider.name+" is disabled. Please enable it in the poster tab above if you want to fetch information to this title.");
		report.setPosterSrc(activateSourceImg);
		return;
	}
	
	// check cache
	if (!passCache && g_cache[key]) {
		var data = new Data();
		data.fromCache(g_cache[key]);
		data.touch(key);
		report.load(data, true);
	} else {
		var URL = provider.getLink(key, report);
		GM_xmlhttpRequest({
	      method: 'GET',
	      url: URL,
		  timeout: 500,
		  headers: {'Referer': URL, 'Cache-Control': 'max-stale'},
		  onerror: function (responseDetails) {
				reportError(key, "Error while loading data: " + responseDetails.statusText + "<br/>Click the icon on the right to retry", true);
		  },
	      onload: function (responseDetails) {
			var report = infoHash[key];
			var provider = report.provider;
			if (responseDetails.status == 200) {
				var data = new Data();
				
				data.rating = provider.getRating(responseDetails.responseText, report);
				data.votes = report.votes;
				data.description = provider.getDescription(responseDetails.responseText, report, data);
				data.genre = provider.getGenre(responseDetails.responseText, report);
				data.posterURL = provider.getPosterThumb(responseDetails.responseText, report);
				data.aka = provider.getAKA(responseDetails.responseText, report);
				data.title = report.title;
				data.category = provider.getCategory(responseDetails.responseText, report);
				data.mpaa = provider.getMPAA(responseDetails.responseText, report);
				data.provider = provider.number;
				data.touch(key);
				
				report.load(data, false);
	        } else {
				reportError(key, "Error while loading data: " + responseDetails.statusText + ".<br/>Click the icon on the right to retry");
			}
		  }
		});
	}
}

function showFilteredGroups() {
	for (var key in infoHash) {
		var info = infoHash[key];
		if (info == null) continue;
		
		var rating = info.rating;
		var tbody = info.tbody;
		
		if (rating < g_hideThreshold) {
			tbody.style.display = '';
		}
	}
}

// opacity functions
function fade(object, fadeIn, millisec, delay, setDisplay) {
	if (g_useFading) {
		var interval = Math.round(millisec / 10);
		
		object.goalOp = fadeIn?1:0;
		for(var i = 0; i < 10; i++) {
			setTimeout(changeOpac, (delay + i * interval), object, setDisplay);
		}
		setTimeout(function(o) {o.style.opacity = o.goalOp}, delay + millisec, object);
	} else {
		object.style.display = fadeIn?"":"none";
	}
}

function changeOpac(object, setDisplay) {
	var style = object.style; 
	var op = parseFloat(style.opacity);
	if (isNaN(op)) op = 0;
	if (style.opacity < object.goalOp) {
		op += 0.1;
	} else if (style.opacity > 0) {
		op -= 0.1;
	}
	style.opacity = op;
	if (setDisplay) {
		style.display = (op > 0)?"":"none"
	};
}

function storeCache() {
	// store cache
	var total = 0;
	var deleted = 0;
	// check for expired entries
	var now = new Date().getTime();
	for (var key in g_cache) {
		if (!g_cache[key]) {
			alert("Inconsistent cache state! Cache has to be purged. If this error persists, please leave a note in the discussion site of this script.");
			GM_setValue("g_cache", "");
			return;
		}
		var timestamp = parseInt(g_cache[key].substr(0, 13));
		if (timestamp + CACHE_EXPIRE < now) {
			delete g_cache[key];
			deleted++;
		}
		total++;
	}
	if (total > CACHE_LEN) {
		// remove first n entries
		var n = total - CACHE_LEN;
		var i = 0;
		for (var key in g_cache) {
			if (i < n) {
				delete g_cache[key];
				deleted++;
			}
			i++;
		}
	}
	// if (deleted > 0) {
		// alert("Deleted " + deleted + " cache entries");
	// }
	GM_setValue("g_cache", g_cache.toSource());
	GM_setValue("g_titleMap", g_titleMap.toSource());
}

function showToplist() {
	var div = document.createElement("div");
	div.style.position = 'absolute';
	div.style.top = 0;
	div.style.left = 0;
	div.style.backgroundColor = "white";
	div.style.zIndex = '200';
	document.body.appendChild(div);
	
	div.innerHTML = g_cache.toSource() + "<br/>";
	
	var order = new Array();
	for (key in g_cache) {
		var data = new Data();
		data.fromCache(g_cache[key]);
		order.push(data);
	}
	order.sort(function(a, b) {
		if (a.rating == null || isNaN(a.rating)) return 1;
		if (b.rating == null || isNaN(b.rating)) return -1;
		return b.rating - a.rating;
	});

	for (var i = 0; i < order.length; i++) {
		var data = order[i];
		var p = document.createElement("p");
		p.innerHTML = data.title + " rating: " + data.rating + "<br/>";
		div.appendChild(p);
		
		var img = document.createElement("img");
		img.width = 100;
		img.height = 140;
		img.title = data.title + " rating: " + data.rating;
		img.src = data.posterURL;
		p.appendChild(img);
		
	}
}

GM_registerMenuCommand('VCDQ - clear cache', function() {g_cache = {}; g_titleMap = {};})
GM_registerMenuCommand('VCDQ - show cache content', showToplist);
GM_registerMenuCommand('VCDQ - view cache info', function() {
	var i = 0;
	for (key in g_cache) i++;
	var start = new Date().getTime();
	var str = g_cache.toSource();
	var end = new Date().getTime();
	var ms = end - start;
	var bytes = str.length;
	var avg = bytes/i;
	alert("Items in cache: " + i + 
		"\r\nTotal bytes: " + str.length + 
		"\r\nAverage size: " + avg + 
		"\r\nEncoding time (ms): " + ms + 
		"\r\nDecoding time (ms): " + decodingTime);
})
