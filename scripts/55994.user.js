// ==UserScript==
// @name            Travian Server Village
// @autor           Orekaria
// @version         1.0.6
// @namespace       OrSV
// @description     Shows the village active in the Travian server
// @include 	    http://s*.travian*
// @exclude 	    http://shop.travian*.*
// @exclude 	    http://*.travian*.*/activate.php*
// @exclude 	    http://*.travian*.*/support.php*
// @exclude 	    *.css
// @exclude 	    *.js
// ==/UserScript==

// changelog;
// 1.0.6 20090903 added: new include and exclude domains
//		  fixed: color was not being shown due to Travian server changes
// 1.0.5 20090824 changed: search pattern for active village
// 1.0.4 20090819 added: only checks the server once in a fresh interval even if several pages are opened in the same browser
//		  fixed: updating in different pages of the same brower now works as intented
// 1.0.3 20090819 fixed: include scope
//                changed: namespace
//                changed: fresh interval in seconds. error checking
// 1.0.2 20090819 added: menu command for fresh interval
// 1.0.1 20090819 first published version

// if you get the error "Error: GadrmGeneralWrapper is not defined..." is because of the ad-blocker, not this code
var useFireBugConsole = false; 

var XPList = XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE;
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var dom = new DOMUtils();

// global variables
var cookieServerVillageId = getServer() + "_serverVillage";
var cookieFreshInterval = getServer() + "_freshInterval";
var cookieLastCheck = getServer() + "_lastCheck"; // to avoid multiple callings when multiple pages are opened
var xPathVillageUrls = "//table[contains(@id,'vlist')]//a[contains(@href,'newdid')]";
var xPathCurrentVillageUrl = "//table[contains(@id,'vlist')]//td[contains(@class,'dot hl')]/parent::*/td/a";
var isSynchronizedColor = "green"; // '#A4FE9A';
var isDeSynchronizedColor = "red"; // '#FE9A9A';
var urlToCheck = "http://" + document.domain + "/nachrichten.php?t=1";
var freshInterval = getGMCookie(cookieFreshInterval, 3);
var mozillaAgent = (navigator.userAgent) ? navigator.userAgent : 'Mozilla/5.0 (Windows; U; Windows NT 5.1; pl-PL; rv:1.9.0.11) Gecko/2009060215 Firefox/3.0.11';

var loadedId = 0;

main();

return;

function main(){
	// if you are using FireBug, redirect logging to the FireBug console
	if(useFireBugConsole)
		if(unsafeWindow.console){
			GM_log = unsafeWindow.console.log;
	}


	// one or more villages
	var villageTable = dom.id('vlist');
	if(villageTable == null){
		// log("the players owns one village. no need for this script.")
		return;
	}

	var currentInterval = getGMCookie(cookieFreshInterval, freshInterval);
	GM_registerMenuCommand("Travian Server Village: Fresh interval (" + freshInterval + ")", promptFreshInterval);
	
	// get the current village and color it
	loadedId = getCurrentVillageId(document);
	setGMCookie(cookieServerVillageId, loadedId);
	colorVillage();

	// inject AJAX
	setGMCookie(cookieLastCheck, new Date().getTime().toString());
	window.setInterval(checkIfVillageChangedAJAX, Number(1000));
}


// Menu command prompt
function promptFreshInterval(){
	var currentInterval = getGMCookie(cookieFreshInterval, freshInterval);
	var newInterval = prompt("Set the new fresh interval in seconds", currentInterval);
	try{
		if(Number(newInterval) > 0)
			setGMCookie(cookieFreshInterval, Number(newInterval));
	}
	catch(err){}
}


function colorVillage(){
	var serverId = getGMCookie(cookieServerVillageId, 0);
	
	var color = isDeSynchronizedColor;
	var checkId = serverId;
	if(serverId == loadedId){
		checkId = loadedId;
		color = isSynchronizedColor;
	}
	//log("id = " + checkId);
	
	// paint	
	var villageAs = dom.find(xPathVillageUrls);
	var villageCount = villageAs.snapshotLength;
	for(var i = 0; i < villageCount; i++){
		var url = villageAs.snapshotItem(i);
		var villageId = getParameterFromUrl(url, 'newdid');
		if(villageId == checkId){
			url.parentNode.setAttribute("style", "background: " + color + ";");
		} else {
			url.parentNode.setAttribute("style", "background: transparent;");
		}
	}
}


function getCurrentVillageId(doc){
	var villageId = 0;
	var currentVillageA = dom.find(xPathCurrentVillageUrl, XPList, doc);
	villageId = getParameterFromUrl(currentVillageA.snapshotItem(0), 'newdid');
	// log("villageId = (" +currentVillageA.snapshotItem(0) + ") " + villageId);
	return villageId;
}

// some AJAX
function checkIfVillageChangedAJAX (forced) {
	colorVillage();
	var now = new Date();
	var lastTime = Number(getGMCookie(cookieLastCheck, new Date().getTime().toString()));
	// log("date = " + now.getTime() + "; lastDate = " + lastTime + "; dif = " + dateDiff(lastTime));
	
	if(dateDiff(lastTime) < freshInterval)
		return;
	
	// log("checking... " + now.getTime().toString() + "; dif = " + dateDiff(lastTime));
	setGMCookie(cookieLastCheck, now.getTime().toString());
	
	send(urlToCheck, function(responseDetails) {
			pulled = dom.cn("div", responseDetails.responseText);
			// check if the server active village is the village active when the page loaded
			var serverVillageId = getCurrentVillageId(pulled);
			setGMCookie(cookieServerVillageId, serverVillageId);
		});
	//log("out");
}


function send(url, callback, postfields) {
	var options = {
		'url':url,
		'method':( !postfields ? 'GET' : 'POST' ),
		'headers':{
		'User-Agent':mozillaAgent
		},
		'onload':function(e) {
			callback(e);
		},
		'onerror':function(e) {
			callback(e);
		}
	};
	if (!!postfields) {
		var postdata = '';
		for ( n in postfields ) {
			postdata += '&' + n + '=' + encodeURIComponent(postfields[n].replace('[fullInfo]',fullInfo));
		}
		postdata = postdata.substr(1);
		options.headers["Content-type"] = "application/x-www-form-urlencoded";
		options.headers["Content-length"] = postdata.length;
		options.data = postdata;
	}
	GM_xmlhttpRequest(options);
}


// url functions
function getPageURL(){
        return window.location.href;
}

function getServerUrlInfo() {
	var serverInfo = new Array();    
        // getPageURL().search(/http:\/\/(.*)\//);
 	getPageURL().search(/http:\/\/(.*)\/(.*)/);
        serverInfo[0] = RegExp.$1;
        serverInfo[2] = RegExp.$2;
        serverInfo[1] = serverInfo[0].replace(/\.travian\./,'');
        serverInfo[2].search(/\?(.*)/,'');
	serverInfo[3] = RegExp.$1;
	
	if(serverInfo[3].length > 0)
		serverInfo[2] = serverInfo[2].replace("?" + serverInfo[3], '');
	
        return serverInfo;
}

function getServer(){
	return getServerUrlInfo()[1];
}

function getParametersNamesFromUrl(uri){
	var params = new Array( );
	var regex = /[\?&]([^=]+)=/g;
	while( ( results = regex.exec(uri) ) != null )
		params.push( results[1] );
	return params;
}

function getParameterFromUrl(uri, parameterName){
	parameterName = parameterName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]" + parameterName + "=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec(uri);
	if( results == null )
		return "";
	else
		return results[1];
}


// logging
function log(msg){
	GM_log(msg);
}

// cookies
function setGMCookie(key, value){
	GM_setValue(key, value);
}

function getGMCookie(key, defaultValue){
	var gotValue;
	gotValue = GM_getValue(key, null);
	if(gotValue == null){
		setGMCookie(key, defaultValue);
		gotValue = defaultValue;
	}
	return gotValue;
}


// datetime functions
function dateDiff(time){
	// Resta fechas y redondea  
	var diferencia = (new Date().getTime()) - time;
	// log(diferencia);
	var dias = Math.floor(diferencia / (1000 * 60 * 60 * 24)) ; 
	var seconds = Math.floor(diferencia / 1000); 
	
	return seconds;
}


//DOM functions
function DOMUtils(doc, ctxt, html) { // from FranMod
    this.cn = function(tag, html) {
        var elem = this.document.createElement(tag);
        if (html)
            elem.innerHTML = html;
        return elem;
    }

    this.id = function(id) {
        return this.document.getElementById(id);
    }

    this.find = function(xpath, xpres, doc) {
        if (!doc)
            doc = document;
        else if (typeof doc == 'string')
            doc = cn('div', doc);
	if(!xpres)
		xpres = XPList;
        var ret = document.evaluate(xpath, doc, null, xpres, null);

        return xpres == XPFirst ? ret.singleNodeValue : ret;
    }

    if (!doc)
        doc = document;
    if (!ctxt)
        ctxt = doc;
    if (html) {
        this.document = doc.implementation.createDocument('', '', null);
        this.context = doc.createElement('div');
        this.context.innerHTML = html;
        ansDoc.appendChild(this.context);
    } else {
        this.document = doc;
        this.context = ctxt;
    }
}