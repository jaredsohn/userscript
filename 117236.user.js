// ==UserScript==
// @name           GCPersonalisationFix
// @include        http://www.geocaching.com/map/*
// @include        http://www.geocaching.com/seek/log.aspx?ID=*
// @include        http://www.geocaching.com/seek/log.aspx?LUID=*
// @include        http://www.geocaching.com/my*
// @include        http://www.geocaching.com/my/logs.aspx?s=1&lt=2
// @include        http://www.geocaching.com/seek/cache_details.aspx?*
// @description  *BETA* Removes GCVote stars for invisible caches on the new map.
// ==/UserScript==

var enabled = GM_getValue("enabled","true")==true?true:GM_getValue("enabled","true")==false?false:(GM_getValue("enabled","true")=="true");
var foundCaches = unsafeWindow.JSON.parse(GM_getValue("foundCaches","{ }"));
var hiddenCaches =  unsafeWindow.JSON.parse(GM_getValue("hiddenCaches","{ }"));
var otherCaches =  unsafeWindow.JSON.parse(GM_getValue("otherCaches","{ }"));
var wpIdCache =  unsafeWindow.JSON.parse(GM_getValue("wpIdCache","{ }"));
var oldTimeMS; 
var logging = true;
var alreadyProcessed = new Object();
var geoConverter ;
var mouseMoveEventLister = null;
var showFinds = true;
var showHides =true;
var apiEnabled = GM_getValue("apiEnabled","true")==true?true:GM_getValue("apiEnabled","true")==false?false:(GM_getValue("apiEnabled","true")=="true");
var apiObject;
var deleteWPHelper;
var pagesToVisitForCrawling = unsafeWindow.JSON.parse(GM_getValue("pagesToVisitForCrawling","[ ]"));
var numRequestsInProcess = 0;
var browserType = "unknown";

if(typeof(opera) != "undefined") {
	browserType = "Opera";
}
else if(typeof(chrome) != "undefined"){
	browserType = "Chrome";
}
else if(typeof(safari) != "undefined"){
	browserType = "Safari";
}
else{
	browserType = "FireFox";
}	

//GM_setValue("firstRun","");
if(enabled && document.URL.search("www.geocaching.com\/map")>=0 )
{
	window.addEventListener('DOMContentLoaded',initMapPage, true);
}
else if(enabled && document.URL.search("www.geocaching.com\/seek\/log")>=0 && document.URL.indexOf("?ID=")>=0 )
{
	window.addEventListener('DOMContentLoaded',initLogPage, true);
}
else if(document.URL.search("http://www.geocaching.com\/my")>=0)
{
	if(GM_getValue("firstRun","true")=="true")
	{
		window.addEventListener('DOMContentLoaded',function() {
			GM_setValue("firstRun","false");
			if(confirm("This is your first run of GCPersonalisationFix.\n"+					
						"Would would you like to visit your found cache pages, \nto let the script learn your found caches?\n\n"+
						"Click Ok to visit:\nwww.geocaching.com/my/logs.aspx?s=1&lt=2\n\n"+
						"Click Cancel to stay here. \nYou can add caches manually at the options page on: www.geocaching.com/my/"))
					{
						var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage","[ ]"));
						returnLocations.push(((document.location.href.replace("#returning","")).replace("#",""))+"#returning");	
						returnLocations.push("http://www.geocaching.com/my/owned.aspx#assisted");
						returnLocations.push("http://www.geocaching.com/my/logs.aspx?s=1&lt=11#assisted");
						returnLocations.push("http://www.geocaching.com/my/logs.aspx?s=1&lt=10#assisted");
						GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
						
						document.location.href="http://www.geocaching.com/my/logs.aspx?s=1&lt=2#assisted";
					}
		}, true);
	}
	
	if(document.URL.indexOf("logs.aspx?s=1&lt=2")>=0 || document.URL.indexOf("logs.aspx?s=1&lt=10")>=0 || document.URL.indexOf("logs.aspx?s=1&lt=11")>=0)	
	{
		window.addEventListener('DOMContentLoaded',initFoundPage, true);
	}
	else if(document.URL.indexOf("owned.aspx")>=0)
	{
		window.addEventListener('DOMContentLoaded',initOwnPage, true);
	}
	else
	{	
		window.addEventListener('DOMContentLoaded',addSettings, true);
	}
}
else if(enabled && document.URL.search("www.geocaching.com\/seek\/log")>=0 && document.URL.indexOf("?LUID=")>=0 )
{	
	window.addEventListener('DOMContentLoaded',initEditLogPage, true);
}
else if(enabled && document.URL.search("www.geocaching.com\/seek\/cache_details")>=0 && window.location.hash.indexOf("parseWp")>=0 )
{	
	window.addEventListener('DOMContentLoaded',initCachePage, true);
}

function initMapPage() {	
	//Is the map loaded?
	if (!unsafeWindow.MapSettings.Map || !unsafeWindow.L || !unsafeWindow.MapSettings.Map._loaded) {
		//Workaround to get informed when the map is loaded: raise an event every time something on the map canvas changes
		var mapCanvas = document.getElementById("map_canvas");
		if (mapCanvas) {
			log("Init map loaded event");
			mapCanvas.addEventListener('DOMAttrModified', waitForMap, true);
		}
	}
	else {
		showFinds = unsafeWindow.MapSettings.MapLayers.Geocache.options.userSession.options.showFinds;
		showHides = unsafeWindow.MapSettings.MapLayers.Geocache.options.userSession.options.showHides;	
		
		unsafeWindow.MapSettings.Map.addEventListener("layeradd", onLayerAdd);
	}
}

//Handles the DOMAttrModified event of the mapCanvas (wait for map to load)
function waitForMap(e) {
	if (unsafeWindow.MapSettings.Map && unsafeWindow.L && unsafeWindow.MapSettings.Map._loaded) {
	    var mapCanvas = document.getElementById("map_canvas");

	    //Clean up: remove the event listener
	    mapCanvas.removeEventListener('DOMAttrModified', waitForMap, true);

	    //retry - init map
	    initMapPage();
	}
}

function onLayerAdd(e){	
	if(e.layer._leaflet_id == unsafeWindow.MapSettings.MapLayers.Geocache._leaflet_id){
		showFinds = unsafeWindow.MapSettings.MapLayers.Geocache.options.userSession.options.showFinds;
		showHides = unsafeWindow.MapSettings.MapLayers.Geocache.options.userSession.options.showHides;		
	}
}

function initCachePage()
{
	var link = pagesToVisitForCrawling.pop();

	if(document.location.href == link)
	{
		GM_setValue("pagesToVisitForCrawling",unsafeWindow.JSON.stringify(pagesToVisitForCrawling));
		var wpId=document.getElementById("ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode").textContent;
		if(wpId != "")
		{
			var start = "";
			var end = "";
			var cacheId = "";
			if(document.location.href.indexOf("#parseWpFound") != -1)
			{
				newFoundLog(wpId,true);
				start = link.indexOf("guid=")+5;
				end = link.indexOf("#parseWpFound");
				cacheId=link.substr(start,end-start);
			}
			else if(document.location.href.indexOf("#parseWpHidden") != -1)
			{
				newHiddenLog(wpId,true);
				start = link.indexOf("guid=")+5;
				end = link.indexOf("#parseWpFound");
				cacheId=link.substr(start,end-start);
			}
			
			
			if(cacheId != "")
			{				
				if(!wpIdCache[cacheId])
				{
					wpIdCache[cacheId]=wpId;
					GM_setValue("wpIdCache",unsafeWindow.JSON.stringify(wpIdCache));
				}
			}
			
		}
		else
		{
			alert("Clould not find the waypoint id of this cache. This cache will be skipped! \n"+
				"You may add you this cache manually later (At the options page).\n"+
				"The link of this cache is:  "+link.replace("#parseWpFound",""));
		}
		
		var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
		var returnToPage="";
		if(returnLocations && returnLocations.length > 0)
		{
			returnToPage= returnLocations[returnLocations.length - 1];
		}
		
		if( pagesToVisitForCrawling.length==0)
		{		
			
			if(returnToPage != "")
			{	
				returnToPage=returnLocations.pop();
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				alert("All missing caches have been parsed.\n"+
				"\nThe script will bring you to: "+returnToPage);		
				document.location.href=returnToPage;
			}
			else
			{
				alert("All missing caches have been parsed.\n");
			}
			
		}
		else
		{
			if(confirm((wpId != ""?"This cache was parsed.\n":"")+					
				"Would you continue parsing and navigate to the next cache page?\n\n"+
				"Click Ok to visit the next cache page. \n("+ (pagesToVisitForCrawling.length)+" remaining)\n\n"+
				"Click Cancel to "+ (returnToPage!=""?("go back to:\n"+returnToPage):("abort.") )) )
			{
				document.location.href=pagesToVisitForCrawling[pagesToVisitForCrawling.length-1];
			}
			else
			{
				if(returnToPage!="")
				{
					returnToPage=returnLocations.pop();	
					GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
					document.location.href=returnToPage;					
				}
			}
		}
		
	}
	else
	{
		alert("Something went wrong. Aborting! You may add the missing caches manually at the options page.\n"+
			"You find the options page here: http://www.geocaching.com/my/");
	}
}

function initLogPage()
{
	log("initLogPage");
	var logButton = document.getElementById("ctl00_ContentBody_LogBookPanel1_LogButton");
	logButton.addEventListener ('click', handleLogSubmit, true);
}

function handleLogSubmit()
{	
	//Found-it/Attend-log//Webcam picture taken-log?
	var selectedText = document.getElementById("ctl00_ContentBody_LogBookPanel1_ddLogType").options[document.getElementById("ctl00_ContentBody_LogBookPanel1_ddLogType").selectedIndex].text;
	if(selectedText=="Found it"||selectedText=="Attended"||selectedText=="Webcam Photo Taken")
	{
		var idStart=document.URL.indexOf("ID=")+3;
		var id = document.URL.substring(idStart,idStart+7);
		
		newFoundLog(DBId2GC(parseInt(id)),true);
	}
}

function initFoundPage()
{
	log("initFoundLogsPage");
	if(window.location.hash.indexOf("returning") == -1)
	{
		var evaluator = new unsafeWindow.XPathEvaluator();
		var queryResult = evaluator.evaluate("//a[@class='ImageLink'][contains(@href,'cache_details.aspx?guid=')]",document, null, unsafeWindow.XPathResult.ANY_TYPE, null);
		
		var resultArray = new Array();
		var result=queryResult.iterateNext();

		while (result)
		{
			resultArray[resultArray.length]=result.href.substr(result.href.indexOf("guid=")+5);
			result=queryResult.iterateNext();
		}		

		if(resultArray.length>0)
		{
			requestVoteBatch(resultArray);
		}
		else if(window.location.hash.indexOf("#assisted") != -1)
		{
			var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
			var returnToPage="";
			if(returnLocations && returnLocations.length > 0)
			{
				returnToPage= returnLocations[returnLocations.length - 1];
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
			}			
		
			if(returnToPage!="")
			{
				returnToPage=returnLocations.pop();
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				alert("No caches found.\n\n"+
					"New logs will be detected automatically.\n"+
					"Additionaly the list of found caches will automatically \nbe updated,everytime you visit the Found-Caches-Page.\n"+
					"\nThe script will bring you to:\n"+returnToPage);
				document.location.href=returnToPage;				
			}
			else
			{
				alert("No caches found.\n\n"+
					"New logs will be detected automatically.\n"+
					"Additionaly the list of found caches will automatically\nbe updated,everytime you visit the Found-Caches-Page.");
			}
		}
	}
	else
	{
		var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
		var returnToPage="";
		if(returnLocations && returnLocations.length > 0)
		{
			returnToPage= returnLocations[returnLocations.length - 1];
			GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
		}			
	
		if(returnToPage!="")
		{
			returnToPage=returnLocations.pop();
			GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
			alert("All found caches have been parsed.\n\n"+
				"New logs will be detected automatically.\n"+
				"Additionaly the list of found caches will automatically\nbe updated,everytime you visit the Found-Caches-Page.\n"+
				"\nThe script will bring you to:\n"+returnToPage);
			document.location.href=returnToPage;				
		}
		else
		{
			alert("All found caches have been parsed.\n\n"+
				"New logs will be detected automatically.\n"+
				"Additionaly the list of found caches will automatically\nbe updated,everytime you visit the Found-Caches-Page.");
		}
	}
}

function initOwnPage()
{
	log("ownCachesPage");
	if(window.location.hash.indexOf("returning") == -1)
	{
		
		var evaluator = new unsafeWindow.XPathEvaluator();
		var queryResult = evaluator.evaluate("//a[contains(@href,'cache_details.aspx?guid=')]",document, null, unsafeWindow.XPathResult.ANY_TYPE, null);
		
		var resultArray = new Array();
		var result=queryResult.iterateNext();

		while (result)
		{
			resultArray[resultArray.length]=result.href.substr(result.href.indexOf("guid=")+5);
			result=queryResult.iterateNext();
		}
		
		
		if(resultArray.length>0)
		{
			requestVoteBatch(resultArray);	
		}
		else if(window.location.hash.indexOf("#assisted") != -1)
		{
			var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
			var returnToPage="";
			if(returnLocations && returnLocations.length > 0)
			{
				returnToPage= returnLocations[returnLocations.length - 1];
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
			}			
		
			if(returnToPage!="")
			{
				returnToPage=returnLocations.pop();
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				alert("No caches found.\n\n"+					
					"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.\n"+
					"\nThe script will bring you to:\n"+returnToPage);
				document.location.href=returnToPage;				
			}
			else
			{
				alert("No caches found.\n\n"+
					"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.");
			}
		}		
	}
	else
	{
		var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
		var returnToPage="";
		if(returnLocations && returnLocations.length > 0)
		{
			returnToPage= returnLocations[returnLocations.length - 1];
			GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
		}			
	
		if(returnToPage!="")
		{
			returnToPage=returnLocations.pop();
			GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
			alert("All hidden caches have been parsed.\n\n"+					
				"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.\n"+
				"\nThe script will bring you to:\n"+returnToPage);
			document.location.href=returnToPage;				
		}
		else
		{
			alert("All hidden caches have been parsed.\n\n"+					
				"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.");
		}
	}
}

function requestVoteBatch(cacheIds,owner) {	
	var knownWPIds = new Array();
	var unknownIds  = new Array();
	var k=0;
	
	unknownIds[k]=new Array();
	
	for(i=0;i<cacheIds.length;i++)
	{
		if(wpIdCache[cacheIds[i]])
		{			
			knownWPIds[knownWPIds.length]={"waypoint":wpIdCache[cacheIds[i]]};
		}
		else
		{
			if(unknownIds[k].length >=100)
			{
				k++;
				unknownIds[k]=new Array();
			}
			unknownIds[k][unknownIds[k].length]=cacheIds[i];
		}
	}
	
	if(unknownIds[0].length > 0)
	{
		for(j=0;j<=k;j++)
		{
			log("WPid-Online request for "+ unknownIds[j].length +  " caches started.");
			var user="uglyDUMMYusernamesolution";	
			var dataString="version="+"GCPersonalisationFix"+"&userName="+user+"&cacheIds="+unknownIds[j]+"&password="+"";
			
			GM_xmlhttpRequest({
			method: 'POST',
			headers: {'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'},
			data: dataString,
			url: "http://gcvote.com/getVotes.php",
			onload: function(responseDetails) {
				parseResult(responseDetails.responseText);
			},
			onerror: function(responseDetails) {
				alert("Unable to contact GCVote-Server! Errorcode "+responseDetails.status+"\nPlease use the options page to fill in the informations manually.");
			}
			});
			numRequestsInProcess++;
		}
	}
	
	if(knownWPIds.length > 0)
	{
		log("Resolved WPids for "+ knownWPIds.length +  " caches using the local cache.");
		handleResultData(knownWPIds);
	}
	
}

function initEditLogPage()
{
	log("initEditLogPage");
	
	var titel = document.getElementById("ctl00_ContentBody_LogBookPanel1_lbLogText");
	var typeVerb = titel.textContent.substr(titel.textContent.indexOf(titel.firstChild.textContent)+titel.firstChild.textContent.length+1).split(" ")[0];
	
	//Found/Webcam foto took/attend-log?
	if(typeVerb=="found" || typeVerb=="took"|| typeVerb=="attended")
	{
		var evaluator = new unsafeWindow.XPathEvaluator()
		var queryResult = evaluator.evaluate("//a[@class='ImageLink'][contains(@href,'cache_details.aspx?guid=')]",document, null, unsafeWindow.XPathResult.FIRST_ORDERED_NODE_TYPE, null);
		requestVoteBatch(queryResult.singleNodeValue.href.substr(queryResult.singleNodeValue.href.indexOf("guid=")+5));
	}
}

function handleLogDelete()
{
	var itemsToKeep = new Object();
	var found = false;

	foundCaches = unsafeWindow.JSON.parse(GM_getValue("foundCaches","{ }"));
	
	for (foundCacheItemName in foundCaches) 
	{		
		found=(deleteWPHelper.indexOf(foundCaches[foundCacheItemName]) != -1);
		
		if(!found)
		{
			itemsToKeep[foundCacheItemName]=foundCaches[foundCacheItemName];
		}
		else
		{
			found=false;
		}
	}

	foundCaches=itemsToKeep;

	//Save changes
	GM_setValue("foundCaches",unsafeWindow.JSON.stringify(foundCaches));
}


function parseResult(data)
{	
	numRequestsInProcess--;
	var parser = new window.DOMParser();
	var xmlDoc = parser.parseFromString(data, "text/xml");
	
	var votes=xmlDoc.getElementsByTagName("vote");
	
	
	handleResultData(votes);
}

function handleResultData(votes)
{		
	log("Processing data");

	if(document.URL.indexOf("logs.aspx?s=1&lt=2")>=0 || document.URL.indexOf("logs.aspx?s=1&lt=10")>=0 || document.URL.indexOf("logs.aspx?s=1&lt=11")>=0)
	{
		var cacheId;
		var wpId;
		for(var i=0;i<votes.length;i++)
		{
			cacheId=votes[i].getAttribute?votes[i].getAttribute("cacheId"):votes[i].cacheId;
			wpId=votes[i].getAttribute?votes[i].getAttribute("waypoint"):votes[i].waypoint;	
			
			if(wpId != "")
			{
				newFoundLog(wpId,false);	
				if(!wpIdCache[cacheId])
				{
					wpIdCache[cacheId]=wpId;
				}
			}
			else
			{
				pagesToVisitForCrawling.push("http://www.geocaching.com/seek/cache_details.aspx?guid="+cacheId+"#parseWpFound");				
			}
		}
		
		
		//Save changes
		GM_setValue("foundCaches",unsafeWindow.JSON.stringify(foundCaches));
		GM_setValue("wpIdCache",unsafeWindow.JSON.stringify(wpIdCache));
		
		if(pagesToVisitForCrawling.length>0 && numRequestsInProcess == 0)
		{
			GM_setValue("pagesToVisitForCrawling",unsafeWindow.JSON.stringify(pagesToVisitForCrawling));
			if(confirm("Could not determinate waypoint-id(s) of "+pagesToVisitForCrawling.length+" cache(s)! \n"+					
				"Would you like to visit the cache page(s) to parse the waypoint-id(s) from there?\n\n"+
				"Click Ok to visit the first cache page: "+ pagesToVisitForCrawling[pagesToVisitForCrawling.length-1]+"\n\n"+
				"Click Cancel to abort."))
			{
				var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage","[ ]"));
				returnLocations.push((((document.location.href.replace("#returning","")).replace("#assisted","")).replace("#",""))+"#returning");	
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
				document.location.href=pagesToVisitForCrawling[pagesToVisitForCrawling.length-1];
			}
			else
			{
				pagesToVisitForCrawling = new Array();
				GM_setValue("pagesToVisitForCrawling",unsafeWindow.JSON.stringify(pagesToVisitForCrawling));
			}
		}
		else if(window.location.hash.indexOf("#assisted") != -1 && numRequestsInProcess == 0)
		{
			
			var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
			var returnToPage="";
			if(returnLocations && returnLocations.length > 0)
			{
				returnToPage= returnLocations[returnLocations.length - 1];
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));
			}			
		
			if(returnToPage!="")
			{
				returnToPage=returnLocations.pop();
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				alert("All found caches have been parsed.\n\n"+
					"New logs will be detected automatically.\n"+
					"Additionaly the list of found caches will automatically\nbe updated,everytime you visit the Found-Caches-Page.\n"+
				        "\nThe script will bring you to:\n"+returnToPage);
				document.location.href=returnToPage;				
			}
			else
			{
				alert("All found caches have been parsed.\n\n"+
					"New logs will be detected automatically.\n"+
					"Additionaly the list of found caches will automatically\nbe updated,everytime you visit the Found-Caches-Page.");
			}
		}
		
	}	
	else if(document.URL.indexOf("owned.aspx")!=-1)
	{	
		var cacheId;
		var wpId;
		for(var i=0;i<votes.length;i++)
		{
			cacheId=votes[i].getAttribute?votes[i].getAttribute("cacheId"):votes[i].cacheId;
			wpId=votes[i].getAttribute?votes[i].getAttribute("waypoint"):votes[i].waypoint;	
			
			if(wpId != "")
			{
				newHiddenLog(wpId,false);	
				if(!wpIdCache[cacheId])
				{
					wpIdCache[cacheId]=wpId;
				}
			}
			else
			{
				pagesToVisitForCrawling.push("http://www.geocaching.com/seek/cache_details.aspx?guid="+cacheId+"#parseWpHidden");				
			}
		}
		
		//Save changes
		GM_setValue("hiddenCaches",unsafeWindow.JSON.stringify(hiddenCaches));
		GM_setValue("wpIdCache",unsafeWindow.JSON.stringify(wpIdCache));
		
		if(pagesToVisitForCrawling.length>0)
		{
			GM_setValue("pagesToVisitForCrawling", unsafeWindow.JSON.stringify(pagesToVisitForCrawling));
			if(confirm("Could not determinate waypoint-id(s) of "+pagesToVisitForCrawling.length+" cache(s)! \n"+					
				"Would you like to visit the cache page(s) to parse the waypoint-id(s) from there?\n\n"+
				"Click Ok to visit the first cache page: "+ pagesToVisitForCrawling[pagesToVisitForCrawling.length-1]+"\n\n"+
				"Click Cancel to abort."))
			{
				var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage","[ ]"));
				returnLocations.push(((document.location.href.replace("#returning","")).replace("#",""))+"#returning");				
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				
				document.location.href=pagesToVisitForCrawling[pagesToVisitForCrawling.length-1];
			}
			else
			{
				pagesToVisitForCrawling = new Array();
				GM_setValue("pagesToVisitForCrawling",unsafeWindow.JSON.stringify(pagesToVisitForCrawling));
			}
		}
		if(window.location.hash.indexOf("#assisted") != -1 && numRequestsInProcess == 0)
		{
			var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage",""));
			var returnToPage="";
			if(returnLocations && returnLocations.length > 0)
			{
				returnToPage= returnLocations[returnLocations.length - 1];
				
			}			
		
			if(returnToPage!="")
			{
				returnToPage=returnLocations.pop();
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				alert("All hidden caches have been parsed.\n\n"+					
					"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.\n"+
				        "\nThe script will bring you to:\n"+returnToPage);
				document.location.href=returnToPage;				
			}
			else
			{
				alert("All hidden caches have been parsed.\n\n"+					
					"The list of hidden caches will automatically be updated,\neverytime you visit the Hidden-Caches-Page.");
			}
		}
	}	
	else if(document.URL.search("www.geocaching.com\/seek\/log")>=0 && document.URL.indexOf("?LUID=")>=0)
	{
		var delLink = document.getElementById("ctl00_ContentBody_LogBookPanel1_btnConfirm");
		if(delLink)
		{
			deleteWPHelper=votes[0].getAttribute?votes[0].getAttribute("waypoint"):votes[0].waypoint;
			delLink.addEventListener ('click', handleLogDelete, true);			
		}		
	}
}

function newFoundLog(wpId, save)
{		
	if (wpId != "")
	{
		if(save)
		{			
			foundCaches = unsafeWindow.JSON.parse(GM_getValue("foundCaches","{ }"));
		}			
		
		if(!foundCaches[wpId])
		{
			log("New Log: "+ wpId);
			foundCaches[wpId]= {
				"WpId":wpId}
			if(save)
			{
				//Save changes				
				GM_setValue("foundCaches",unsafeWindow.JSON.stringify(foundCaches));
			}
		}	
	}
	else{alert("here");}
}

function newHiddenLog(wpId, save)
{
	if (wpId != "")
	{		
		if(!hiddenCaches[wpId])
		{
			log("New Log: "+wpId);
			hiddenCaches[wpId]={
				"WpId":wpId}
			
			if(save)
			{
				//Save changes
				GM_setValue("hiddenCaches",unsafeWindow.JSON.stringify(hiddenCaches));
			}
		}	
	}
}

function newOtherCache(wpId, owner,save)
{
	if (wpId != "")
	{		
		if(!otherCaches[wpId])
		{
			log("New API/other cache: "+wpId);
			otherCaches[wpId]={
				"WpId":wpId,				
				"Owner":owner
			};
			
			if(save)
			{
				//Save changes
				GM_setValue("otherCaches",unsafeWindow.JSON.stringify(otherCaches));
			}
		}	
	}
}

function deleteOtherCache(wpId, owner)
{
	var itemsToKeep = new Object();	

	otherCaches = unsafeWindow.JSON.parse(GM_getValue("otherCaches","{ }"));
	
	for (otherCacheItemName in otherCaches) 
	{		
		if(otherCaches[otherCacheItemName].Owner!=owner || otherCaches[otherCacheItemName].WpId!=wpId)
		{
			itemsToKeep[otherCacheItemName]=otherCaches[otherCacheItemName];
		}		
	}

	otherCaches=itemsToKeep;
	
	//Save changes
	GM_setValue("otherCaches",unsafeWindow.JSON.stringify(otherCaches));	
}

function deleteOtherCaches(owner)
{
	var itemsToKeep = new Object();	

	otherCaches = unsafeWindow.JSON.parse(GM_getValue("otherCaches","{ }"));
	
	for (otherCacheItemName in otherCaches) 
	{		
		if(otherCaches[otherCacheItemName].Owner!=owner)
		{
			itemsToKeep[otherCacheItemName]=otherCaches[otherCacheItemName];
		}		
	}

	otherCaches=itemsToKeep;
	
	//Save changes
	GM_setValue("otherCaches",unsafeWindow.JSON.stringify(otherCaches));	
}

function listOtherCaches(owner)
{
	var items= new Array();	

	otherCaches = unsafeWindow.JSON.parse(GM_getValue("otherCaches","{ }"));
	
	for (otherCacheItemName in otherCaches) 
	{		
		if(otherCaches[otherCacheItemName].Owner == owner)
		{
			items.push(otherCaches[otherCacheItemName].WPId);
		}		
	}

	return items;
}

function checkIfHidden(wpId)
{	
	return !((showFinds || !foundCaches[wpId]) && (showHides || !hiddenCaches[wpId]) && (!apiEnabled || !otherCaches[wpId]));	
}

function addSettings()
{	
	//Used GCVote Config as template
	var sidebar=document.getElementById("ctl00_ContentBody_WidgetMiniProfile1_LoggedInPanel");
	var self = document.getElementById("GCPersonalisationFixConfigContent");
	if(sidebar&&!self) 
	{
	
		var header=document.createElement("h3");
		header.setAttribute("class","widget-header");			
		var imgMinus=document.createElement("img");
		imgMinus.setAttribute("src","http://www.geocaching.com/images/minus.gif");
		imgMinus.setAttribute("alt","hide config");
		var linkMinus=document.createElement("a");
		linkMinus.href="#"
		linkMinus.addEventListener("click",hideConfig,true);
		linkMinus.id="hide_GCPersonalisationFix_Config"
		linkMinus.style.display="none";
		linkMinus.appendChild(imgMinus);
		header.appendChild(linkMinus);
		var imgPlus=document.createElement("img");
		imgPlus.setAttribute("src","http://www.geocaching.com/images/plus.gif");
		imgPlus.setAttribute("alt","show config");
		var linkPlus=document.createElement("a");
		linkPlus.addEventListener("click",showConfig,true);
		linkPlus.id="show_GCPersonalisationFix_Config"
		linkPlus.appendChild(imgPlus);
		header.appendChild(linkPlus);
		header.appendChild(document.createTextNode(" GCPersonalisationFix "));		
		var div=document.createElement("div");
		div.id="GCPersonalisationFixConfigContent";
		div.innerHTML='  <table style="border-collapse:collapse;width:100%;text-align:left;"> <tbody> <tr> <td style="text-align:left;padding:0px;border:0px"> <input type="checkbox" id="GCPersonalisationFixConfigEnabled" /> Enable GCPersonalisationFix <br /><input type="checkbox" id="GCPersonalisationFixApiEnable" /> Enable API-Access <br /><br /></td></tr><tr><td style="text-align:left;padding:0px;border:0px"><table><td style="text-align:left;padding:0px;border:0px"><span><a href="#" id="linkFoundCaches" title="Update found caches list.">Found Caches:</a></span><br /><textarea id="GCPersonalisationFixConfigFoundCaches" rows="10" cols="11" style="margin-left:15px;"></textarea></td><td style="text-align:left;padding:0px;border:0px"><span style="margin-left:15px;"><a href="#" id="linkOwnedCaches" title="Update own caches list.">Owned Caches:</a></span><br /><textarea id="GCPersonalisationFixConfigHiddenCaches" rows="10" cols="11" style="margin-left:15px;"></textarea></td></table></td></tr></tbody></table><input type="button" id="GCPersonalisationFixConfigSave" value="Save changes" style="margin-top:5px" />'
		div.style.display="none";
	
		var divDummy=document.createElement("div");
		divDummy.appendChild(document.createTextNode("\u00A0"));
		divDummy.id="Div-Dummy";
		
		sidebar.appendChild(header);
		sidebar.appendChild(div);
		sidebar.appendChild(divDummy);
		
		document.getElementById("GCPersonalisationFixConfigEnabled").checked=GM_getValue("enabled","true")==true?true:GM_getValue("enabled","true")==false?false:(GM_getValue("enabled","true")=="true");
		document.getElementById("GCPersonalisationFixApiEnable").checked=GM_getValue("apiEnabled","true")==true?true:GM_getValue("apiEnabled","true")==false?false:(GM_getValue("apiEnabled","true")=="true");
		
		var foundCachesString="";
		for (foundCachesItemName in foundCaches) {
			foundCachesString=foundCachesString+foundCachesItemName+"\n";
		}
		
		var hiddenCachesString="";
		for (hiddenCachesItemName in hiddenCaches) {
			hiddenCachesString=hiddenCachesString+hiddenCachesItemName+"\n";
		}
		document.getElementById("GCPersonalisationFixConfigFoundCaches").value=foundCachesString;
		document.getElementById("GCPersonalisationFixConfigHiddenCaches").value=hiddenCachesString;
		document.getElementById("GCPersonalisationFixConfigSave").addEventListener("click",saveConfig,true);
		
		document.getElementById("linkFoundCaches").addEventListener("click",function (){
			if(confirm("Would would you like to visit your found caches pages, \nto let the script learn your found caches?\n\n"+
				"Click Ok to visit:\nwww.geocaching.com/my/logs.aspx?s=1&lt=2\n"+
				"(Unsaved changes will be lost!)\n\n"+
				"Click Cancel to stay here.")) 
			{				
				var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage","[ ]"));
				returnLocations.push(((document.location.href.replace("#returning","")).replace("#",""))+"#returning");
				returnLocations.push("http://www.geocaching.com/my/logs.aspx?s=1&lt=11#assisted");
				returnLocations.push("http://www.geocaching.com/my/logs.aspx?s=1&lt=10#assisted");
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));			
				
				document.location.href="http://www.geocaching.com/my/logs.aspx?s=1&lt=2#assisted";
			}
		},true);
		
		document.getElementById("linkOwnedCaches").addEventListener("click",function (){
			if(confirm("Would would you like to visit your own caches page, \nto let the script learn your hidden caches?\n\n"+
				"Click Ok to visit:\nwww.geocaching.com/my/owned.aspx\n"+
				"(Unsaved changes will be lost!)\n\n"+
				"Click Cancel to stay here.")) 
			{
				var returnLocations = unsafeWindow.JSON.parse(GM_getValue("returnToPage","[ ]"));
				returnLocations.push(((document.location.href.replace("#returning","")).replace("#",""))+"#returning");			
				GM_setValue("returnToPage",unsafeWindow.JSON.stringify(returnLocations));	
				
				document.location.href="http://www.geocaching.com/my/owned.aspx#assisted";
			}
		},true);		
		
	}
}

function showConfig() {	
	if(!document.getElementById("GCPersonalisationFixConfigContent")) return;
	document.getElementById("GCPersonalisationFixConfigContent").style.display="inline";	
	document.getElementById("show_GCPersonalisationFix_Config").style.display="none";
	document.getElementById("hide_GCPersonalisationFix_Config").style.display="inline";
}


function hideConfig() {
	if(!document.getElementById("GCPersonalisationFixConfigContent")) return;
	document.getElementById("GCPersonalisationFixConfigContent").style.display="none";
	document.getElementById("show_GCPersonalisationFix_Config").style.display="inline";
	document.getElementById("hide_GCPersonalisationFix_Config").style.display="none";
}

function saveConfig()
{
	log("saveConfig");
	
	enabled = document.getElementById("GCPersonalisationFixConfigEnabled").checked;
	apiEnabled = document.getElementById("GCPersonalisationFixApiEnable").checked;

	
	var foundIds = document.getElementById("GCPersonalisationFixConfigFoundCaches").value.split(/,|;|\n/);
	var wpId;
	
	foundCaches=new Object();
	
	for(i=0;i<foundIds.length;i++)
	{	
		wpId=foundIds[i].trim();
		if(wpId!="")
		{
			if(wpId.length>4 && wpId.length<8 && wpId.substring(0,2).toUpperCase()=="GC")
			{
				newFoundLog(wpId,false);
			}
		}
	}
	
	var hiddenIds = document.getElementById("GCPersonalisationFixConfigHiddenCaches").value.split(/,|;|\n/);
	
	hiddenCaches=new Object();
	
	for(i=0;i<hiddenIds.length;i++)
	{	
		wpId=hiddenIds[i].trim();
		if(wpId!="")
		{
			if(wpId.length>4 && wpId.length<8 && wpId.substring(0,2).toUpperCase()=="GC")
			{
				newHiddenLog(wpId,false);
			}
		}
	}
	if(apiEnabled == false)
	{
		otherCaches = new Object();
		GM_setValue("otherCaches",unsafeWindow.JSON.stringify(otherCaches));
		
		if(apiEnabled != (GM_getValue("apiEnabled","true")==true?true:GM_getValue("apiEnabled","true")==false?false:(GM_getValue("apiEnabled","true")=="true") ))
		{
			if(apiObject)
			{
				if(confirm("Should all exiting API-Keys be removed?\n(If the API-function is enabled again,\nall scripts have to ask for authorization again.)"))
				{
					apiObject.removeAllApiKeys();
				}
			}
		}
	}
	
	//Save changes
	GM_setValue("enabled",enabled);
	GM_setValue("apiEnabled",apiEnabled);
	GM_setValue("foundCaches",unsafeWindow.JSON.stringify(foundCaches));
	GM_setValue("hiddenCaches",unsafeWindow.JSON.stringify(hiddenCaches));
}

//API
var apiBackEnd = function () {
	var ports = new Object();
	var apiKeys = unsafeWindow.JSON.parse(prtc_getValue("apiKey","{}")); 
	var authKeys = unsafeWindow.JSON.parse(prtc_getValue("authKey","{}")); 
	
	var init=function ()
	{	
		window.addEventListener('message', handleConnect, false);
	}
	
	var handleConnect = function(event){
		if(event.origin == "http://www.geocaching.com"){			
			var data = JSON.parse(event.data);
			var apiKey = "";
			var authKey = "";
			
			if(data.service.indexOf("Answer") == -1){
				if(!apiKeys[data.apiKey]){
					if(data.service == "register"){
						//Register new client
						if(confirm("An other script wants access to GCPersonalisationFix.\nAllow?"))
						{
							apiKey = newGuid();
							authKey = newGuid();
							apiKeys[apiKey] = apiKey;
							authKeys[apiKey] = authKey;
							
							prtc_setValue("apiKey",unsafeWindow.JSON.stringify(apiKeys));
							prtc_setValue("authKey",unsafeWindow.JSON.stringify(authKeys));
							
							event.source.postMessage(JSON.stringify({"apiKey": apiKey, "authKey": authKey, "service":"registerAnswer"}),"http://www.geocaching.com");
						}
					}
				}
				else{
					//Client exists -> etablish connection for requested service
					apiKey=apiKeys[data.apiKey];
					authKey=authKeys[apiKey];		
				
					if(apiKey != "" && authKey != ""){
						if(browserType == "FireFox" && data.service == "isCacheVisible"){
							event.source.postMessage(JSON.stringify({"authKey": authKey, "service":"isCacheVisibleAnswer"}), "http://www.geocaching.com");	
						}
						else if(data.service == "isCacheVisible"){
							var channel =  new MessageChannel();	
							if(!ports[apiKey]){
								ports[apiKey] = new Object();
							}
							
							channel.port1.addEventListener('message', handleIsCacheVisibleRequest, false);
							
							ports[apiKey]["isCacheVisible"]=channel.port1;
							
							event.source.postMessage(JSON.stringify({"authKey": authKey, "service":"isCacheVisibleAnswer"}), "http://www.geocaching.com", [channel.port2]);	
							
							channel.port1.start();
						}
						else if(browserType == "FireFox" && data.service == "isCacheVisibleData"){
							handleIsCacheVisibleRequest(event);
						}
					}
				}
			}				
		}
	}
	
	var handleIsCacheVisibleRequest = function(event){	
		var reqData = JSON.parse(event.data);
		if(reqData.apiKey && reqData.wpId && browserType == "FireFox"){
			event.source.postMessage(JSON.stringify({"service":"isCacheVisibleDataAnswer", "wpId":reqData.wpId, "isVisible": (!checkIfHidden(reqData.wpId)) }) ,"http://www.geocaching.com");
		}
		else if(reqData.apiKey && reqData.wpId && ports[reqData.apiKey]["isCacheVisible"]){		
			ports[reqData.apiKey]["isCacheVisible"].postMessage(JSON.stringify({"wpId":reqData.wpId, "isVisible": (!checkIfHidden(reqData.wpId)) })); 	
			//ports[reqData.apiKey]["isCacheVisible"].postMessage(JSON.stringify({"wpId":reqData.wpId, "isVisible": false })); 			
		}
		
	}
	
	this.removeAllApiKeys = function()
	{
		apiKeys = new Object();
		authKeys = new Object();
		ports = new Object();
		prtc_setValue("apiKey",unsafeWindow.JSON.stringify(apiKeys));
		prtc_setValue("authKey",unsafeWindow.JSON.stringify(authKeys));
	}
	
	//Constructor
	init();
}

function prtc_setValue(name, value) {
	if(typeof widget != "undefined")
	{		
		widget.preferences.setItem(name,value);		
	}
	else
	{
		GM_setValue(name, value);
	}
}

function prtc_getValue(name, defaultValue) {
	if(typeof widget != "undefined")
	{		
		var result = widget.preferences.getItem(name);
		return result!=""?result:defaultValue;
	}
	else
	{
		return GM_getValue(name, defaultValue);
	}
}

//http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript
function newGuid() {   
    return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
	}));
}

if(apiEnabled)
{	
	apiObject = new apiBackEnd(); 
}


//For logging
function log(message)
{
	if(logging)
	{
		GM_log(message);
	}
}

//GCId-Functions
function DBId2GC(gcId)
{
	var gcCode = "";
	var sequence = "0123456789ABCDEFGHJKMNPQRTVWXYZ";
	
	var base = 31;	

	var rest = 0; 		
	var divResult=gcId+411120;
	
	do
	{
		rest=divResult%base;
		divResult=Math.floor(divResult/ base);		
		gcCode=sequence.charAt(rest)+gcCode;
	}while(divResult!=0);
	
	
	if ((gcCode.length < 4) || (gcCode.length == 4 && sequence.indexOf(gcCode.charAt(0)) < 16)) {

		base=16;		
		rest = 0; 		
		divResult=gcId;
		gcCode="";
		
		do
		{
			rest=divResult%base;
			divResult=Math.floor(divResult/ base);		
			gcCode=sequence.charAt(rest)+gcCode;
		
			}while(divResult!=0);
	}
	
	return "GC"+gcCode;
}