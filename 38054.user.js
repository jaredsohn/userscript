// ==UserScript==
// @name          NewzBin Poster Image Script
// @description  Groups reports, loads descriptions, ratings and poster images from different sources.
// @include       http*://*.newzbin.com/*
// @include       http*://*.newzbin2.es/*
// @include       http*://*.newzxxx.com/*
// @version       2.6.1
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
var g_sort = false; //GM_getValue("g_sort", false);
var g_onlyNew = GM_getValue("g_onlyNew", false);
var g_bigPoster = GM_getValue("g_bigPoster", true);
var g_langFlags = GM_getValue("g_langFlags", true);
var g_hideThreshold = GM_getValue("g_hideThreshold", 0)/10;
var g_ageFilter = GM_getValue("g_ageFilter", 0);
var g_markFiltered = GM_getValue("g_markFiltered", true);
var g_hideFiltered = GM_getValue("g_hideFiltered", true);
var g_dontFilterNew = GM_getValue("g_dontFilterNew", false);
var g_enabledProviders = GM_getValue("g_enabledProviders", "").split(";");
var g_useFading = GM_getValue("g_useFading", true);
var g_groupDisabledSources = GM_getValue("g_groupDisabledSources", true);
var g_expandAll = GM_getValue("g_expandAll", false);

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

function Report(provider) {
	this.loaded = false;
	this.rating = null;
	this.votes = 0;
	this.title = null;
	this.posterUrl = null;
	this.lang = null;
	this.rows = new Array();
	this.expanded = g_expandAll;
	this.isNew = false;
	// stores additional information
	this.tag = null;
	
	this.provider = provider;
	
	// some DOM elements
	this.tbody = null;
	var td1 = null;
	var td2 = null;
	var posterImgTag = null;
	var titleTag = null;
	var descriptionTag = null;
	var providerTag = null;
	var genreTag = null;
	var akaTag = null;
	var ratingBarTag = null;
	var innerRatingBarTag = null;
	var ratingTextTag = null;
	var votesTag = null;
	var favicon = null;
	var reloadImgTag = null;
	
	this.create = function(key, insertBeforeRow) {
		this.tbody = reportPrototype.tbody.cloneNode(true);
		var tr = this.tbody.childNodes[0];
		this.td1 = tr.childNodes[0];
		this.td2 = tr.childNodes[1];
		this.posterImgTag = this.td1.childNodes[0];
		this.titleTag = this.td2.childNodes[0];
		this.akaTag = this.td2.childNodes[1];
		this.ratingBarTag = this.td2.childNodes[2];
		this.innerRatingBarTag = this.ratingBarTag.childNodes[0];
		this.ratingTextTag = this.td2.childNodes[3];
		this.votesTag = this.td2.childNodes[4];
		this.descriptionTag = this.td2.childNodes[5];
		this.genreTag = this.td2.childNodes[6];
		this.reloadImgTag = this.td2.childNodes[7];
		this.favicon = this.td2.childNodes[8];
		this.providerTag = this.td2.childNodes[9];
				
		this.td1.colSpan = td1Cols;
		if (this.isNew) {
			this.td1.style.backgroundColor  = "#ffeedd";
		}
		this.posterImgTag.name = key;
		this.posterImgTag.addEventListener("click", toggleReports, false);
		if (g_bigPoster) this.posterImgTag.addEventListener("mouseover", showBigPoster, false);
		this.favicon.src = this.provider.favicon;
		this.reloadImgTag.addEventListener("click", function() { loadInfo(key, true); }, false);
		this.reloadImgTag.src = reloadImg;
		this.titleTag.innerHTML = this.title;

		if (this.rows.length > 1) {
			var numRowsTag = document.createElement("p");
			numRowsTag.style.fontSize = "8pt";
			numRowsTag.innerHTML = "<b>" + this.rows.length + "</b> reports in this group";
			this.td2.appendChild(numRowsTag);
		}

		this.providerTag.innerHTML = ' <a href="' + this.provider.getLink(key) + '" target="_blank">Data source: ' + this.provider.name + '</a>';
		
		if (this.lang.length > 0) {
			var br = document.createElement("br");
			this.td1.appendChild(br);
			for (var j = 0; j < this.lang.length; j++) {
				this.td1.appendChild(this.lang[j]);
			}
		}
		tableNode.insertBefore(this.tbody, insertBeforeRow);
	}
	
	this.createPrototype = function() {
		// add new line in table
		this.tbody = document.createElement("tbody");
		var tr = document.createElement("tr");
		this.td1 = document.createElement("td");
		this.td1.align = "center";
		this.td1.colSpan = td1Cols;
		
		this.posterImgTag = document.createElement("img");
		this.posterImgTag.border=0;
		this.posterImgTag.width=100;
		this.posterImgTag.src = noPosterImg;
		this.td1.appendChild(this.posterImgTag);
		
		this.td2 = document.createElement("td");
		this.td2.colSpan = numCols - this.td1.colSpan;
		
		// create dom elements
		this.titleTag = document.createElement("strong");
		this.td2.appendChild(this.titleTag);
		this.akaTag = document.createElement("span");
		this.td2.appendChild(this.akaTag);
		
		this.ratingBarTag = document.createElement("div");
		this.ratingBarTag.className = "RatingBar";
		this.innerRatingBarTag = document.createElement("div");
		this.innerRatingBarTag.className = "RatingBarCHILD";
		this.innerRatingBarTag.style.width = "0px";
		this.ratingBarTag.appendChild(this.innerRatingBarTag);
		this.td2.appendChild(this.ratingBarTag);
		
		this.ratingTextTag = document.createElement("span");
		this.ratingTextTag.style.fontWeight = "bold";
		this.ratingTextTag.style.position = "relative";
		this.ratingTextTag.style.top = "-20px";
		this.ratingTextTag.style.left = "220px";
		this.td2.appendChild(this.ratingTextTag);
		
		this.votesTag = document.createElement("span");
		this.votesTag.style.position = "relative";
		this.votesTag.style.top = "-20px";
		this.votesTag.style.left = "220px";
		this.td2.appendChild(this.votesTag);
		
		this.descriptionTag = document.createElement("p");
		this.td2.appendChild(this.descriptionTag);

		this.genreTag = document.createElement("p");
		this.genreTag.style.fontWeight = "bold";
		this.td2.appendChild(this.genreTag);

		this.reloadImgTag = document.createElement("img");
		this.reloadImgTag.width = 16;
		this.reloadImgTag.height = 16;
		//this.reloadImgTag.src = reloadImg;
		this.reloadImgTag.style.cssFloat = "right";
		this.reloadImgTag.style.margin = "2px";
		this.reloadImgTag.title = "Click here to reload data";
		this.td2.appendChild(this.reloadImgTag);

		this.favicon = document.createElement("img");
		this.favicon.width = 16;
		this.favicon.height = 16;
		this.favicon.style.cssFloat = "right";
		this.favicon.style.margin = "2px";
		this.td2.appendChild(this.favicon);

		this.providerTag = document.createElement("p");
		this.providerTag.style.color = "grey";
		this.providerTag.style.fontSize = "8pt";
		this.providerTag.style.cssFloat = "right";
		this.td2.appendChild(this.providerTag);
		
		tr.appendChild(this.td1);
		tr.appendChild(this.td2);
		this.tbody.appendChild(tr);
		
		return this.tbody;
	}
	
	this.load = function(data, fromCache) {
		this.title = data.title;
		this.rating = data.rating;
		this.votes = data.votes;
		this.posterUrl = data.posterURL;
		
		// reset title in case it has been changed by the provider
		this.titleTag.innerHTML = this.title;
		
		if (data.aka) {
			this.akaTag.innerHTML = " AKA: " + data.aka + "";
		}
		this.setDescription(data.description);
		this.setRating(data.rating);
		this.setAgeRestriction(data.mpaa);
		this.setVotes(data.votes);
		this.setGenre(data.genre);

		if (data.posterURL == null) {
			this.setPosterSrc(noPosterImg);
		} else {
			loadPosterImage(this.posterImgTag, data.posterURL, key);
		}
		if (fromCache) {
			this.providerTag.innerHTML = ' Data source: ' + this.provider.name + " (from cache)";
		} else {
			this.providerTag.innerHTML = ' Data source: ' + this.provider.name;
		}
	}
	
	this.setTitle = function(title) {
		this.titleTag.innerHTML = title;
	}
	this.setAKA = function(aka) {
		this.akaTag.innerHTML = aka;
	}
	this.setDescription = function(description) {
		this.descriptionTag.innerHTML = description;
	}
	this.setRating = function(rating) {
		if (rating) {
			this.innerRatingBarTag.style.width = (rating/10 * 200).toString() + "px";
			this.ratingTextTag.innerHTML = rating + "/10";
			
			if (rating < g_hideThreshold && !(g_dontFilterNew && this.isNew)) {
				if (g_markFiltered) this.td2.style.backgroundColor = "#cccccc";
				if (g_hideFiltered) {
					this.tbody.style.display = "none";
					checkVisibilities();
				}
			} else if (rating >= 7.5) {
				this.td2.style.backgroundColor = "#FFC5C5";
			}
		} else {
			this.ratingBarTag.style.display = "none";
			this.ratingTextTag.style.display = "none";
		}
	}
	this.setAgeRestriction = function(age) {
		if (g_ageFilter) {
			if (age > g_ageFilter) {
				this.tbody.style.display = "none";
				checkVisibilities();
			}
		}
	}
	this.setVotes = function(votes) {
		if (votes) {
			this.votesTag.innerHTML = " " + votes + " votes";
		} else {
			this.votesTag.innerHTML = "";
		}
	}
	this.setGenre = function(genre) {
		this.genreTag.innerHTML = genre;
	}
	this.setPosterSrc = function(src) {
		this.posterImgTag.src = src;
	}
	
	this.isVisible = function() {
		if (this.tbody == null) return false;
		var top = this.tbody.offsetTop;
		var p = this.tbody.offsetParent;
		while(p) {
			top += p.offsetTop;
			p = p.offsetParent;
		}
		return (top < (window.pageYOffset + window.innerHeight) && 
				(top + this.tbody.offsetHeight) > window.pageYOffset);
	}
}

var reportPrototype = new Report(null);
reportPrototype.createPrototype();

var infoHash = new Array();
var movieOrder = new Array();

var tableNode = null;
var firstRow = null;
var loadingRow = null;
var stepRow = null;
var oldMoviesRow = null;
var unratedMoviesRow = null;
var numCols = 0;
var td1Cols = 3;
var linkFound = false;

var barImg = NPURL + "ratingBar.png";
var noPosterImg = NPURL + "noposter.gif";
var posterLoadingImg = NPURL + "posterloading.gif";
var getInfoImg = NPURL + "getinfo.png";
var loadBarImg = NPURL+"loadbar.gif";
var activateSourceImg = NPURL + "activateSource.png";
var reloadImg = NPURL + "reload.png";

var Base64 = {

    // private property
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
	method:"GET",url:NPURL+"infoProviders2.js",
	onload:function(response) {
		if(response.status==200) {
			eval(response.responseText);
			
			// enable providers
			for (var i = 0; i < g_enabledProviders.length; i++) {
				var p1 = g_enabledProviders[i];
				for (var j = 0; j < infoProviders.length; j++) {
					var p2 = infoProviders[j];
					if (p1 == p2.name) {
						p2.enabled = true;
						break;
					}
				}
			}
		}
	}
});


function init() {
	if (!infoProviders) {
		setTimeout(init, 1000);
		return;
	}
	AddPosterMenu();
	// setup CSS
	document.styleSheets[0].insertRule(".RatingBar {text-align:right;width:200px;height:20px;background:transparent url("+barImg+") no-repeat scroll 0 0;}", 0);
	document.styleSheets[0].insertRule(".RatingBarCHILD {height:20px;background:transparent url("+barImg +") no-repeat scroll 0-20px;}", 0);

	var xpathNew = "//tbody[@class='odd-new' or @class='even-new']";
	var xpathOld = "//tbody[@class='odd' or @class='even']";
	var moviesNew =document.evaluate(xpathNew,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	var moviesOld =document.evaluate(xpathOld,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	
	var total = 0;
	var loaded = 0;
	
	total += moviesNew.snapshotLength;
	loaded += processMovies(moviesNew, true);
	
	if (!g_onlyNew) {
		total += moviesOld.snapshotLength;
		loaded += processMovies(moviesOld, false);
	}
	
	if (linkFound) {
		loadingRow = createRow("<img src=\""+loadBarImg+"\"/>");
		loadingRow.style.display = "none";
		stepRow = createRow("Loading movie data...");
		stepRow.style.display = "none";
		tableNode.insertBefore(loadingRow, firstRow);
		tableNode.insertBefore(stepRow, firstRow);
		
		if (moviesNew.snapshotLength > 0 && g_sort) {
			tableNode.insertBefore(createRow("New reports"), firstRow);
			
			oldMoviesRow = createRow("Previous reports");
			tableNode.insertBefore(oldMoviesRow, firstRow);
		}

		if (g_sort) {
			unratedMoviesRow = createRow('<a name="unratedreports"/>Unrated reports');
			tableNode.insertBefore(unratedMoviesRow, firstRow);
		}
		
		loadMovieData();
		if (total > loaded) {
			var left = total - loaded;
			var str = left + ' report' +(left>1?'s are':' is')+ ' unrated';
			if (g_sort) str += ' (<a href="#unratedreports">view</a>)';
			tableNode.insertBefore(createRow(str), loadingRow);
		}
		
		// hide date lines
		var xpathDL = "//tbody[@class='dateLine']";
		var datelines = document.evaluate(xpathDL,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < datelines.snapshotLength; i++) {
			var row = datelines.snapshotItem(i);
			row.parentNode.removeChild(row);
		}
		checkVisibilities();
	}
}

function createRow(content) {
	var row = document.createElement("tbody");
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	var strong = document.createElement("strong");
	strong.innerHTML = content;
	td.colSpan = numCols;
	td.align="center";

	td.appendChild(strong);
	tr.appendChild(td);
	row.appendChild(tr);
	
	return row;
}

function determineColumnWidth(col) {
	if (col.style && col.style.width) {
		return parseInt(col.style.width);
	} else if (col.nodeType == 1) {
		// rough estimation
		return 70;
	}
	return 0;
}

// recursively find title node in row
function findTitle(node) {
	var c = node.childNodes;
	if (c == null || c.length == 0) return null;
	for (var i = 0; i < c.length; i++) {
		var n = c[i];
		if (n.nodeType == 1) {
			if (n.nodeName == "A" && n.href.search("/browse/post/") > -1 && n.href.search("nzb") == -1) {
				return n.innerHTML;
			} else {
				var p = findTitle(n);
				if (p != null) {
					return p;
				}
			}
		}
	}
	return null;
}

// recursively find language node in row
function findLanguages(node, langs) {
	if (!g_langFlags) return;
	var c = node.childNodes;
	if (c == null || c.length == 0) return;
	for (var i = 0; i < c.length; i++) {
		var n = c[i];
		if (n.nodeType == 1) {
			if (n.nodeName == "IMG" && n.src.search("/flags/") > -1) {
				// check if node is already in array
				var fnd = false;
				for (var j = 0; j < langs.length; j++) {
					if (langs[j].src == n.src) {  fnd = true; break; }
				}
				// append
				if (!fnd) langs.push(n.cloneNode(true));
			} else {
				findLanguages(n, langs);
			}
		}
	}
}

function processMovies(movies, isNew) {
	var count = 0;
	var lastProvider = null;
	for (var i = 0; i < movies.snapshotLength; i++)
	{
		var entireRow = movies.snapshotItem(i);
		if (tableNode == null) {
			tableNode = entireRow.parentNode;
			numCols = (tableNode.childNodes[1].childNodes[1].childNodes.length - 1) / 2;
			
			var columnWidth = 0;
			for (var j = 0; j < tableNode.childNodes[1].childNodes[1].childNodes.length; j++) {
				var th = tableNode.childNodes[1].childNodes[1].childNodes[j];
				columnWidth += determineColumnWidth(th);
				if (columnWidth >= 100) break;
			}
			td1Cols = Math.floor((j+1) / 2);
			if (td1Cols >= numCols) td1Cols = 3;	// in case everything fails
			firstRow = entireRow;
		}
		
		var key = null;
		var provider = null;
		
		// try the previous Provider first
		if (lastProvider) {
			key = lastProvider.getKey(unescape(entireRow.innerHTML));
			if (key) {
				provider = lastProvider;
			}
		}
		
		if (key == null) {
			for (var j = 0; j < infoProviders.length; j++) {
				provider = infoProviders[j];
				if (provider.enabled || g_groupDisabledSources) {
					key = provider.getKey(unescape(entireRow.innerHTML));
					if (key) { 
						lastProvider = provider;
						break; 
					}
				}
			}
		}
		if (key) {
			entireRow.style.display = g_expandAll?"":"none";
			linkFound = true;
			count++;
			if (infoHash[key]) {
				// group already existing
				var report = infoHash[key];
				report.rows.push(entireRow);
				findLanguages(entireRow.childNodes[1], report.lang);
			} else {
				// get title
				var title = findTitle(entireRow.childNodes[1]);
				var langs = new Array();
				findLanguages(entireRow.childNodes[1], langs);
				var report = new Report(provider);
				report.title = title;
				report.isNew = isNew;
				report.lang = langs;
				report.rows.push(entireRow);
				infoHash[key] = report;
			}
		}
	}
	return count;
}

function step(text) {
	stepRow.childNodes[0].childNodes[0].childNodes[0].innerHTML = text;
}

function loading(bool) {
	loadingRow.style.display = bool?"":"none";
	stepRow.style.display = bool?"":"none";
}

function loadMovieData() {
	// load data in array
	var i = 0;
	for (key in infoHash) {
		movieOrder.push(key);
		i++;
	}
	step("loading " + i + " report"+(i>1?"s":"")+"...");

	displayMovies();
	
	return i;
}

function waitForInfo() {	
	loading(false);	
}

function toggleReports() {
	hideBigPoster(null);
	var key = this.name;
	var report = infoHash[key];
	var rows = report.rows;
	
 	for (var k = 0; k < rows.length; k++) {
		if (g_useFading) {
			var row = rows[report.expanded?rows.length-1-k:k];
			row.style.display = "";
			row.style.opacity = report.expanded?1:0;
			fade(row, !report.expanded, 200, (k * 100), false);
		} else {
			rows[k].style.display = report.expanded?"none":"";
		}
	}
	// hide rows after fadeout
	if (g_useFading && report.expanded) {
		setTimeout(function(r) {
			for (var k = 0; k < r.length; k++) {
				r[k].style.display = "none";
			}
		}, rows.length * 100 + 100, rows);
	}
	report.expanded = !report.expanded;
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

var bigDiv = null;
var bigPoster = null;
var iframe = null;
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
		bigDiv.style.verticalAlign = "middle";
		bigDiv.style.border = "1px solid black"
		bigDiv.style.width = "600px";
		bigDiv.style.backgroundColor = "white";
		bigDiv.style.minHeight = "400px";
		bigDiv.innerHTML = 
			'<iframe name="iframe" width="315" height="100%" style="margin-left:0px; overflow-x: hidden;"></iframe>' +
			'<img id="bigPoster" width="285" valign="middle" style="margin-left:315px; max-width: 285; max-height: 400"/>' +
			'<div id="loadingFrameDiv" style="position: absolute; top: 140px; left: 47px; width: 220px; height: 19px; background-image: url('+loadBarImg+');"></div>' +
			'<img id="closeBigDiv" style="position: absolute; top: 0px; left: 576px; width: 24px; height: 24px;" src="'+NPURL+'closeButton.png"/>';
		
		var parent = document.body;
		bigDiv.addEventListener("mouseout", hideBigPoster, true);
		parent.appendChild(bigDiv);
		bigPoster = document.getElementById("bigPoster");
		iframe = document.getElementsByName("iframe")[0];
		loadingFrameDiv = document.getElementById("loadingFrameDiv");
		closeBigDiv = document.getElementById("closeBigDiv");
		closeBigDiv.addEventListener("click", hideBigPoster, false);
	}
	
	bigDiv.style.left = (this.x + 100) + "px";
	bigDiv.style.top = Math.min(this.y, window.pageYOffset + window.innerHeight - 400 ) + "px";
	this.addEventListener("mouseout", hideBigPoster, true);
	//bigDiv.style.top = (window.pageYOffset + (window.innerHeight - 400) / 2) + "px";
	//bigPoster.src = report.posterUrl; 
	bigPoster.src = this.src;
	
	loadingFrameDiv.style.display = "";
	iframe.addEventListener("load", hideLoadingImg, false);
	loadIFrameData(key, iframe);
	
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
		//this.removeEventListener("mouseout", hideBigPoster, false);
	}
}

function displayMovies() {
	for (var i = 0; i < movieOrder.length; i++) {
		var key = movieOrder[i];
		
		var info = infoHash[key];
		if (info == null) continue;
		
		var rating = info.rating;
		var isNew = info.isNew;
		var tbody = null;
		var rows = info.rows;
		
		var insertBeforeRow = rows[0];
		
		info.create(key, insertBeforeRow);
		if (g_cache[key]) // info.isVisible() || 
			loadInfo(key, false);
		else
			reportError(key, "Please wait while loading...<br/>Click the icon on the right to load manually");
		
		// move rows to group
		if (rows.length > 1) {
			for (var j = 1; j < rows.length; j++) {
				tableNode.insertBefore(rows[j], rows[j-1].nextSibling);
			}
		}
	}
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
				data.aka = provider.getAKA(responseDetails.responseText, report, g_country);
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

function createSubMenu(title, menu, divHeader, count, tooltip) {
	menu.innerHTML += '<li class="parent"><a id="trSubMenu'+title+'" href="javascript:void(null)" title="'+tooltip+'">'+title+'</a></li>';
	var SubMenu = document.createElement("ul");
	SubMenu.id = "mnSubMenu"+title;
	SubMenu.className = "tabMenu";
	divHeader.appendChild(SubMenu);
	location.href = "javascript:void(menuList["+count+"] = new CSSMenu('mnSubMenu"+title+"', 'trSubMenu"+title+"','"+menu.id+"'))";
	
	return SubMenu;
}

function addMenuItem(title, id, callback, menu, selected, hint) {
	var li = document.createElement("li");
	var a = document.createElement("a");
	li.appendChild(a);
	a.id = id;
	a.href = "javascript:void(null)";
	a.innerHTML = title;
	a.addEventListener('click', callback, false);
	a.title = hint;
	if (selected) a.style.fontWeight = 'bold';
	menu.appendChild(li);
	
	return a;
}


function AddPosterMenu() {
	var countries = new Array("Argentina", "Belgium", "Brazil", "Canada", "Czechoslovakia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Italy", "Norway", "Poland", "Soviet Union", "Spain", "Sweden", "Sweden", "Turkey", "USA");
	var settings = new Array(
		"g_onlyNew", "Only new reports", "Only new reports will processed. Activate to save CPU time",
		"g_groupDisabledSources", "Always group", "When deactivated, disabled data sources will not be grouped",
		"g_bigPoster", "Show poster popup", "Displays a higher resolution image when hovering over the poster",
		"g_langFlags", "Show language flags", "Show languages of the reports under the poster",
		"g_useFading", "Fade in/-out effect", "Fade in and out when expanding groups or showing the big poster image",
		"g_expandAll", "Expand by default", "Expand all groups by default");
	var menucount = 0;

 	// Create Poster tab 
	var mainMenu = document.getElementById("navcontainer").childNodes[4].childNodes[1];
	var PosterTab = document.createElement("li");
	var PosterMenu = document.createElement("a");
	PosterMenu.id = "PosterMenu_out";
	PosterMenu.href = "javascript:void(null);";
	PosterMenu.addEventListener('click',function () {document.getElementById("mnPosterMenu").blur();	document.getElementById("mnPosterMenu").style.visibility = "hidden"; }, false);
	PosterMenu.innerHTML='Poster';

	var divHeader = document.getElementById("header");
	var PosterMenuList = document.createElement("ul");
	PosterMenuList.id = "mnPosterMenu";
	PosterMenuList.className = "tabMenu";

	// Create Country submenu
	/*
	var PosterCountryMenu = createSubMenu("Country", PosterMenuList, divHeader, menucount++, "Select a country to get the local movie titles");
	addMenuItem("None", "PosterLang", setLang, PosterCountryMenu, (g_country == ''), "Don't display AKAs");
	for (var i = 0; i < countries.length; i++) {
		var c = countries[i];
		addMenuItem(c, "PosterLang"+c, setLang, PosterCountryMenu, (g_country == c), "Display title from " + c);
	}
	*/
	
	// Create Filter submenu
	var PosterFilterMenu = createSubMenu("Filter", PosterMenuList, divHeader, menucount++, "Filter out reports below a certain rating");
	var strThreshold = 'Set threshold';
	if (g_hideThreshold > 0) {
		strThreshold += " (" + g_hideThreshold + ")";
	}
	addMenuItem(strThreshold, "g_hideThreshold", function() {
		var t = prompt("Filter reports worse than... (0 to show all)", g_hideThreshold);
		if (t != null) {
			t = t.replace(",", ".");
			g_hideThreshold = Math.max(0, Math.min(10, parseFloat(t)));
			GM_setValue("g_hideThreshold", Math.floor(g_hideThreshold * 10));
		}
	}, PosterFilterMenu, false, "Set threshold for bad movies");
	addMenuItem("Mark bad reports", "g_markFiltered", setVal, PosterFilterMenu, g_markFiltered, "Mark bad reports with gray background");
	addMenuItem("Hide bad reports", "g_hideFiltered", setVal, PosterFilterMenu, g_hideFiltered, "Do not display bad reports");
	addMenuItem("Leave new reports", "g_dontFilterNew", setVal, PosterFilterMenu, g_dontFilterNew, "Leave new reports untouched, even if they are below the threshold");
	addMenuItem("Set Age", "g_ageFilter", function() {
		var t = prompt("Filter movies for ages over... (0 to show all)", g_ageFilter);
		if (t != null) {
			g_ageFilter = Math.max(0, Math.min(99, parseInt(t)));
			GM_setValue("g_ageFilter", g_ageFilter);
		}
	}, PosterFilterMenu, false, "Hide movies");
	
	// Create Provider Menu
	var PosterProviderMenu = createSubMenu("Data sources", PosterMenuList, divHeader, menucount++, "Enable or disable data sources");
	for (var i = 0; i < infoProviders.length; i++) {
		var p = infoProviders[i];
		addMenuItem(p.name, p.name, toggleProvider, PosterProviderMenu, p.enabled, null);
	}
	
	// create rest of menu
	for (var i = 0; i < settings.length; i+=3) {
		addMenuItem(settings[i+1], settings[i], setVal, PosterMenuList, eval(settings[i]), settings[i+2]);
	}
	
	PosterTab.appendChild(PosterMenu);
	mainMenu.appendChild(PosterTab);
	divHeader.appendChild(PosterMenuList);
	

	// Add menu and subs to Newzbin's CSSMenu function, uses location hack to escape GM sandbox
	location.href = "javascript:void(menuList[menuCount++] = new CSSMenu('mnPosterMenu', 'PosterMenu_out'))";
}

function setLang() {
	var prev = document.getElementById("PosterLang" + g_country);
	if (prev != null) prev.style.fontWeight = 'normal';
	this.style.fontWeight = 'bold';
	if (this.innerHTML == 'None') {
		g_country = '';
	} else {
		g_country = this.innerHTML;
	}
	GM_setValue("g_country", g_country);
}

function setVal() {
	var s = this.id;
	var v = !eval(s);
	this.style.fontWeight = v?'bold':'normal';
	eval(s+'='+v);
	GM_setValue(s, v);
}

function toggleProvider() {
	var provider = null;
	for (var i = 0; i < infoProviders.length; i++) {
		var p = infoProviders[i];
		if (p.name == this.id) {
			provider = p;
			break;
		}
	}
	if (provider != null) {
		if (provider.enabled) {
			provider.enabled = false;
			var nProviders = new Array();
			for (var i = 0; i < g_enabledProviders.length; i++) {
				var p = g_enabledProviders[i];
				if (p != provider.name) nProviders.push(p);
			}
			g_enabledProviders = nProviders;
		} else {
			var r = confirm("This script fetches information from the site " + provider.name + ". According to their terms of use it is not allowed to use automatic data gathering tools like this script without their written permission.\r\nTo be able to use the full scope of this script you have to get a permission of the site owner, otherwise you are violating their terms of use. Before you continue, please make sure you have the proper rights.\r\nIf you are not sure or do not have the permission, please click Cancel.");
			if (r) {
				provider.enabled = true;
				g_enabledProviders.push(provider.name);
			}
		}
		this.style.fontWeight = provider.enabled?'bold':'normal';
		GM_setValue("g_enabledProviders", g_enabledProviders.join(";"));
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

GM_registerMenuCommand('Newzbin - clear cache', function() {g_cache = {};})
GM_registerMenuCommand('Newzbin - show cache content', showToplist);
GM_registerMenuCommand('Newzbin - view cache info', function() {
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