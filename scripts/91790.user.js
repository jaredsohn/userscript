// ==UserScript==
// @name           PBO_toernooi.nl
// @namespace      http://www.gentsebc.be
// @description    Add ranking to badminton players
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        http://jquery-json.googlecode.com/files/jquery.json-2.2.min.js
// @updateURL	http://userscripts.org/scripts/source/91790.meta.js
// @include        http://www.toernooi.nl/*
// @version	   1.0.5
// ==/UserScript==

log=GM_log;
//Comment next line to enable logging into javascript error console
//log=function(){};
//require	   http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
//require	   http://cdn.jquerytools.org/1.2.5/tiny/jquery.tools.min.js
//require	   http://cdn.jquerytools.org/1.2.5/jquery.tools.min.js
//require        http://code.jquery.com/jquery-1.6.1.min.js

var myPlayerPool = new PlayerPool();
myPlayerPool.maxCacheAge= 1 * 24 * 60 * 60 * 1000; // Max Age for the Cached data
//myPlayerPool.maxCacheAge= 1;
myPlayerPool.gmCacheDataKey="PlayersPBO_data";
myPlayerPool.gmCacheDateKey="PlayersPBO_cachedate";
myPlayerPool.dataVersion = "0.0.1";//TODO This script can only operate on data from this version.

try {
    	addEventListener("load", function() {
			 loadRankingData();
	    },0);
} catch(e) { log(e); throw(e) }

function loadRankingData() {
	log("Starting loadRankingData...");
	var myPlayerPoolCacheData = GM_getValue(myPlayerPool.gmCacheDataKey,"NOCACHE");
	var myPlayerPoolCacheDate = GM_getValue(myPlayerPool.gmCacheDateKey,"NOCACHE");
	log("Cache retrieved");
	if (myPlayerPoolCacheData == "NOCACHE" || myPlayerPoolCacheDate =="NOCACHE") {
		log("No cache found. Loading from scratch");
		loadRankingDataFromScratch();
	}	else {
		log("Loading from cache!");
		try {			
			if ((!(myPlayerPool.isExpired(myPlayerPoolCacheDate))) ) { 
				log("Cache OK and not expired.");
				myPlayerPool = $.evalJSON(myPlayerPoolCacheData);
				addRanking();
			} else {
				log("Cache expired.");
				loadRankingDataFromScratch();					
			}
		} catch (e) {
			log("Cache loading exception. Start loading from scratch."+e);
			loadRankingDataFromScratch();
		}
	}
}

function loadRankingDataFromScratch() {
	myPlayerPool.markPageAsLoading();
	loadVblData("http://www.gentsebc.be/mashup/fetchOV_json.txt"+"?avoidBrowserCache="+new Date().valueOf());
}

function loadVblData(vblUrl) {
	log("Looking for Ranking data on "+vblUrl);	
	
  GM_xmlhttpRequest({
    method: "GET",
    url: vblUrl,
    headers: {
      "User-Agent": "Mozilla/5.0",    // If not specified, navigator.userAgent will be used.
      "Accept": "text/xml"            // If not specified, browser defaults will be used.
    },
    onload: function(response) {

    // It is a page, but first let's check for a 404.
    if(response.status == 404){
      log([
        "404 - Page not found! Report:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        //response.responseText,
        response.finalUrl,
        "End of report."
      ].join("\n"));
      return;
    }


    var res = response.responseText;
		
    log([
      "Beginning of page notes:",
      response.status,
      response.statusText,
      response.readyState,
      response.responseHeaders,
      response.finalUrl,
      "End of page notes."
    ].join("\n"));

	parseData(res);
		
    },
    onerror: function(response) {
      log([
        "Beginning of error message:",
        response.status,
        response.statusText,
        response.readyState,
        response.responseHeaders,
        response.responseText,
        response.finalUrl,
        "End of error message."
      ].join("\n"));
    
    }

  });
	
}


function parseData(playersText) {
	log("Start parseData");
	var currentTime = new Date().valueOf();

	//Update cache
	log("Updating cache");
	GM_setValue(myPlayerPool.gmCacheDataKey, playersText);
	GM_setValue(myPlayerPool.gmCacheDateKey, currentTime+"");
	log("Stop loading...");
	myPlayerPool.stopMarkPageAsLoading();


	myPlayerPool = $.evalJSON(playersText);

	//Now we are ready to use the data to add ranking info
	log("Add ranking");
	addRanking();	
}

function PlayerPool() {
	this.tnlId="";
	this.clubs = new Array();
	this.cacheDate = 0;
	this.maxCacheAge = 0;
	this.dataVersion = 0;
	
	
	this.isExpired = function(raw) {
	    if (raw != "") {
				var cache_dt = new Date(parseInt(raw));
				var age = new Date().getTime() - cache_dt.getTime();
	       
				if (age <= this.maxCacheAge) {
					return false;
				}
				else {
					return true;
				}
	    }		
	}
	
	this.markPageAsLoading = function() {
		log("Add loading indicator");

		// Setup the ajax indicator
		$('body').append('<div id="gmpbo">CACHING PBO / TOERNOOI.NL DATA</div>');

		$('#gmpbo').css({
			display:"none",
			margin:"0px",
			paddingLeft:"0px",
			paddingRight:"0px",
			paddingTop:"0px",
			paddingBottom:"0px",
			position:"absolute",
			left:"300px",
			top:"15px",
			width:"auto",
			color:"red",
			'font-size' : '1.5em'
		});
		
		$('#gmpbo').show();
	}
	
	this.stopMarkPageAsLoading = function() {
		log("Stop loading indicator");
		$('#gmpbo').hide();
	}	
}

function addRanking() {
	log("Start adding ranking info");
	var regex = /player=(\d+)/;
	var tnlPlayerId;

	$('a[href^="player.aspx"]').each(function () {
		tnlPlayerId = $(this).attr("href").match(regex)[1];
		//log("Found player "+ tnlPlayerId);
		var player = givePlayer(tnlPlayerId);
		log("givePlayer finished");
		if (!(typeof player == undefined || player == undefined)) {
			if (!(typeof player.tnlR == undefined || player.tnlR == undefined) && player.tnlR.length > 0) {
				$(this).append(", " + player.tnlR+"");			
			}
			if(!(typeof player.vblR == undefined || player.vblR == undefined) && player.vblR.length > 0) {
				if (!(typeof player.vblH == undefined || player.vblH == undefined) && player.vblH.length > 0) {
					$(this).append(", <a class='normalTip' title='"+player.vblH+"' target='_blank' href='http://www.badmintonvlaanderen.be/index.php?option=com_content&task=view&id=37&Itemid=129&vblid="+player.vblId+"'>VBL("+player.vblR+")</a>");
				} else {
					$(this).append(", <a target='_blank' href='http://www.badmintonvlaanderen.be/index.php?option=com_content&task=view&id=37&Itemid=129&vblid="+player.vblId+"'>VBL("+player.vblR+")</a>");
				}
			}
		}
	});
}


function givePlayer(tnlId) {
	log("Looking for ranking of player " +tnlId +".");
	var resultPlayer;

	try{
		var found = false;
		var myPlayer;

		var j=-1;//playerCounter				
		while (!(found) && (j<myPlayerPool.players.player.length-1)) {
			j++;
			myPlayer = myPlayerPool.players.player[j];
				if (parseInt(myPlayer.tnlId)==parseInt(tnlId)) {
					log("Found player with ranking "+myPlayer.tnlR);
					found = true;
					resultPlayer = myPlayer;
				}
		}
	} catch(e) {
		log("Parsing error?"+e);
	}
	
	return resultPlayer;
}

