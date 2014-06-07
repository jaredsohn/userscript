// ==UserScript==

// @name		Ogame Pirate Base script for Ogame (redesign)
// @namespace		http://ogame-pb.net/
// @description		Ogame Pirate Base script for Redesign Ogame
// @include		http://*.ogame.*game/index.php?page=galaxy*
// @include		http://*.ogame.*game/index.php?page=showmessage*
// @license		GNU GPL
// @version 		0.2.7
// @author 		sleader
// @homepage 		http://ogame-pb.net/

// @resource		ImgPassed	http://ogame-pb.net/plugin_files/x2pass.png
// @resource		ImgFailed	http://ogame-pb.net/plugin_files/x2fail.png
// @resource		ImgWarning	http://ogame-pb.net/plugin_files/x2warn.png
// @resource		ImgInProgress	http://ogame-pb.net/plugin_files/x2proc.png
// @resource		ImgPassed_	http://ogame-pb.net/plugin_files/x2pass_.png
// @resource		ImgFailed_	http://ogame-pb.net/plugin_files/x2fail_.png
// @resource		ImgWarning_	http://ogame-pb.net/plugin_files/x2warn_.png
// @resource		ImgInProgress_	http://ogame-pb.net/plugin_files/x2proc_.png
// @resource		ImgPSearch	http://ogame-pb.net/plugin_files/x2psearch.png
// @resource 		ImgPSearch_	http://ogame-pb.net/plugin_files/x2psearch_.png
// @resource		ImgPStats	http://ogame-pb.net/plugin_files/x2pstats.png
// @resource 		ImgPStats_	http://ogame-pb.net/plugin_files/x2pstats_.png
// @resource		ImgASearch	http://ogame-pb.net/plugin_files/x2asearch.png
// @resource 		ImgASearch_	http://ogame-pb.net/plugin_files/x2asearch_.png
// @resource		ImgASearch2	http://ogame-pb.net/plugin_files/x2asearch2.png
// @resource 		ImgASearch2_	http://ogame-pb.net/plugin_files/x2asearch2_.png

// ==/UserScript==
// Globals
  var SCRIPT_NAME = 'Ogame Pirate Base script for Ogame (redesign)';
  var SCRIPT_URL = 'http://userscripts.org/scripts/source/89874.user.js';
  var SCRIPT_VERSION = '0.2.7'; // DO NOT FORGET TO UPDATE!!!

  var GMHelper = {
    loaded : typeof unsafeWindow != 'undefined',
    aWindow : typeof unsafeWindow == 'undefined' ? window : unsafeWindow,
    
    getValue : function(name, defaultValue) {
      if (this.loaded) {
        return GM_getValue(name, defaultValue);
      }
    },
    
    setValue : function(name, value) {
      if (this.loaded) {
        GM_setValue(name, value.toString());
      }
    },
    
    getNamespace : function(aWindow, path) {
      var currentNamespace = aWindow;
      while(path.length > 0) {
        var nextNamespace = path.shift();
        if (typeof currentNamespace[nextNamespace] == 'undefined') {
          currentNamespace = currentNamespace[nextNamespace] = {};  
        }
      }
      return currentNamespace;
    },
    
    updateScript : function() {
    
      var sender = this;
    
      if (this.loaded) {
        this.setValue('version', SCRIPT_VERSION);
        var now = new Date();
        
        var lastCheck = Date.parse(this.getValue('lastCheck', now));
        if ((now.getTime() - lastCheck) > 3600000) 
        {
          GM_xmlhttpRequest( {
             method : 'GET',
             url : SCRIPT_URL,
             headers : {
               'User-Agent': navigator.userAgent,
               'Accept' : '*/*',
               'Range' : 'bytes=0-1000',
               'Cache-control' : 'no-cache',
               'Pragma' : 'no-cache'
             },
             onload : function(response) {
                if (response.status == 206) {
                  var matches = response.responseText.match(/^\s*\/\/\s*\@version\s+(.+?)\s*$/m);
                  if (matches != null) {
                    var currentVersion = sender.getValue('version', '0.2.7');
                    if (currentVersion != matches[1]) {
                      if (confirm('Greasemonkey Script "' + SCRIPT_NAME + '" is updates. Renew?')) {
                        window.open(SCRIPT_URL, '_blank');
                      }
                      
                    }
                  }
                }
             }
           });

        }
        this.setValue('lastCheck', now);
      }
    }
    
  }
  
var document = unsafeWindow.document;
var localStorage = unsafeWindow.localStorage;
var $ = unsafeWindow.$;
var g_arrSettings = [];
	g_arrSettings['server'] = 'http://ogame-pb.net';
	g_arrSettings['newserver'] = 'http://ogame-pb.net';
	g_arrSettings['version'] = ReplaceSpaces('0.2.7');
	g_arrSettings['last_coord'] = false;
	g_arrSettings['rej_rate'] = 0;
	g_arrSettings['rej_restr'] = 24;
	g_arrSettings['ospy_count'] = 3;
	g_arrSettings['visited_timeout'] = 48;
var g_arrBox = {};
	g_arrBox['CS'] = false;
var g_objXSSInformer = new cXSSInformer();
var g_arrImgs = [];
	g_arrImgs['ImgPSearch'] = GM_getResourceURL('ImgPSearch');
	g_arrImgs['ImgPSearch_'] = GM_getResourceURL('ImgPSearch_');
	g_arrImgs['ImgPStats'] = GM_getResourceURL('ImgPStats');
	g_arrImgs['ImgPStats_'] = GM_getResourceURL('ImgPStats_');
	g_arrImgs['ImgASearch'] = GM_getResourceURL('ImgASearch');
	g_arrImgs['ImgASearch_'] = GM_getResourceURL('ImgASearch_');
	g_arrImgs['ImgASearch2'] = GM_getResourceURL('ImgASearch2');
	g_arrImgs['ImgASearch2_'] = GM_getResourceURL('ImgASearch2_');

(function() {
	try {
		if ((CheckURL() == 1) || (CheckURL() == 2)) {
			g_arrBox['sname'] = $('#playerName span:first').html();
//			ScriptUpdater.check(89874, g_aSettings['version']);
		  	GMHelper.updateScript();
			ClearLS_();
			Invider1();
			Invider2();
			g_objXSSInformer.Init();
			g_objXSSInformer.SetState('warning');
			g_objXSSInformer.SetMsg(ReplaceSpaces('Open Galaxy started'), 'lime');
			GM_registerMenuCommand('Open Galaxy: clear GM storage', ClearGMStorage);
			GM_registerMenuCommand('Open Galaxy: show GM storage', ShowGMStorage);
			GM_registerMenuCommand('Open Galaxy: clear LS storage', ClearLS);
			GM_registerMenuCommand('Open Galaxy: show LS storage', ShowLS);
			//OnlineSpyGet();
		}
		if (CheckURL() == 3) {
			Invider3();
		}
	}
	catch(e) {}
})();

function Invider1() {
//var console = unsafeWindow.console;
//console.log("-111");
	$("#galaxyContent").ajaxSuccess(function(e,xhr,settings) {
		if (settings.url.indexOf("page=galaxyContent") == -1) return;
		if (g_arrBox['CS']) return;
		DumpGalaxy();
		AddPNameLink();
		AddANameLink();
	});
}

function Invider2() {
	$("#statisticsContent").ajaxSuccess(function(e,xhr,settings) {
		if (settings.url.indexOf("page=statisticsContent") == -1) return;
//		DumpStatistics();
	});
}

function Invider3() {
	$(document).ready(function() {
		var objDiv = $('div.note');
		if (objDiv.html().search(new RegExp('(.*\[[0-9]{1}:[0-9]{1,3}:[0-9]{1,2}\]){2}.*: [0-9]{1,3} %')) != -1) {
			var arrPCoord = $('div.note a:first').html().replace('[', '').replace(']', '').split(':');
			setTimeout(
				function() {



					GM_xmlhttpRequest({
						method: "POST",
						url: g_arrSettings['server'] + '/xss2x.php',
						data: 'x=' + arrPCoord[0] + '&y=' + arrPCoord[1]+ '&z=' + arrPCoord[2] + '&xss=1&url=' + PrepareData(document.location.href.slice(0, 80)) + '&cmd=' + 5,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(objResponse) {
							var sResponse = objResponse.responseText;
							if (!sResponse) ;
							else {
								if (sResponse == '-1') ;
								else {
									if (sResponse.indexOf('err:') != -1) ;
									else {
										arrResponse = sResponse.split('|');
										if (arrResponse[0] == 0) sColorP = "#444444"; else sColorP = "#ffffff";
										if (arrResponse[2] == 0) sColorF = "#444444"; else sColorF = "lime";
										var sMsg = '<font color="red">' + arrResponse[4] + '</font>: <font color="' + sColorP + '">#' + arrResponse[1] + ' (' + arrResponse[0] + ')</font> / <font color="' + sColorF + '">#' + arrResponse[3] + ' (' + arrResponse[2] + ')</font>';
										var sId = 'rcv_pspy';
										var objDiv = $('div.note');
										var objMessage = $('<br><table id="' + sId + '" style="display: none"><tr><td>'
											+ '<a href="' + g_arrSettings['newserver'] + '/rep2coord.php?x=' + arrPCoord[0] + '&y=' + arrPCoord[1]+ '&z=' + arrPCoord[2]+'&url=' + PrepareData(document.location.href.slice(0, 80)) + '" target="_blank">'
											+ CreateImgObject('', 
															g_arrImgs['ImgPSearch'],
															g_arrImgs['ImgPSearch_'],
															32,
															'Open Galaxy SpyEx', 
															'Open Galaxy SpyEx',
															''
											)
											+ '</a>'
											+ '</td><td>'
											+ sMsg + '</td></tr></table>');
										objDiv.append(objMessage);
										$('#' + sId).show("slow");
									}
								}
							}
						}
					});
				},
			0);
		}
	});
}


function AddPNameLink() {
	arrItems = $('div[id*="player"]');
	for (var i = 1; i < arrItems.length; i++) {
		try {
			sPName = arrItems.eq(i).find('span').eq(1).html();
			objLink = document.createElement('li');
				objLink.innerHTML = '<a href=http://ogame-pb.net/rep2url.php?pname='+sPName+'&url=' + PrepareData(document.location.href.slice(0, 80)) +' target=_blank><img src=http://ogame-pb.net/favicon.ico> http://ogame-pb.net</a><br><table><tr><td>'
					+ CreateImgObject('', 
									g_arrImgs['ImgPSearch'],
									g_arrImgs['ImgPSearch_'],
									32,
									'Find planets and moons', 
									'Open Galaxy Search',
									'GetPNameCoords(\'' + sPName + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode)'
					)
					+ '</td></tr></table>';
			arrItems.eq(i).find('ul').append(objLink);
			
			sGMCacheValue = ReadLS('OpenGalaxy.CoordX.' + GameId() + '.' + sPName);
			if (sGMCacheValue) {
				var arrGMCacheValue = sGMCacheValue.split('|');
				var objList = $('<li class="coordx_cache"></li>').get(0);
				objList.innerHTML += 'Coord<font color="yellow">X</font>:'
				for (var j = 0; j < arrGMCacheValue.length; j++) {
					arrSplit = arrGMCacheValue[j].split(":");
					if (arrSplit[3] == '1') sMoon = '<font color="red">&nbsp;[&#9679;]</font>'; else sMoon = '';
					objList.innerHTML += '<a target="_parent" style="text-decoration: none" href="javascript:showGalaxy(' + arrSplit[0] + ',' + arrSplit[1] + ',' + arrSplit[2] + ');">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + sMoon + '</a>';
				}
				arrItems.eq(i).find('ul').append(objList);
			}
			
			sGMCacheValue = ReadLS('OpenGalaxy.StatX.' + sPName);
			if (sGMCacheValue) {
				var arrGMCacheValue = sGMCacheValue.split('|');
				if (arrGMCacheValue[0] == 0) sColorP = "#444444"; else sColorP = "white";
				if (arrGMCacheValue[2] == 0) sColorF = "#444444"; else sColorF = "yellow";
				var objList = $('<li class="statx_cache"></li>').get(0);
				objList.innerHTML += 'Stat<font color="yellow">X</font>: <font color="' + sColorP + '">#' + arrGMCacheValue[1] + ' (' + arrGMCacheValue[0] + ')</font> / <font color="' + sColorF + '">#' + arrGMCacheValue[3] + ' (' + arrGMCacheValue[2] + ')</font>';
				arrItems.eq(i).find('ul').find('li').eq(0).after(objList);
			}
		}
		catch(e) {}
	}
}

function AddANameLink() {
	arrItems = $('div[id*="alliance"]');
	sCoords = $('span[id="pos-planet"]').eq(0).html().replace('[', '').replace(']', '');
	if (sCoords == null) return;
	arrCoords = sCoords.split(':');
	for (var i = 0; i < arrItems.length; i++) {
		try {
			sAName = arrItems.eq(i).find('span').eq(0).html().split(' ').slice(1).join(' ');
			objLink = document.createElement('li');
				objLink.innerHTML = '<table><tr><td>' + 
					CreateImgObject('', 
									g_arrImgs['ImgASearch'],
									g_arrImgs['ImgASearch_'],
									32,
									'Find nearby planets (within 30 systems)', 
									'Open Galaxy Search',
									'GetNearbyANameCoords(\'' + sAName + '\', \'' + arrCoords[0] + '\', \'' + arrCoords[1] + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode, 2)'
					)
				+ '</td><td>' + 
					CreateImgObject('', 
									g_arrImgs['ImgASearch2'],
									g_arrImgs['ImgASearch2_'],
									20,
									'Find nearby moons (within 60 systems)', 
									'Open Galaxy Search',
									'GetNearbyANameCoords(\'' + sAName + '\', \'' + arrCoords[0] + '\', \'' + arrCoords[1] + '\', this.parentNode.parentNode.parentNode.parentNode.parentNode, 3)'
					)
				+ '</td></tr></table>';
			arrItems.eq(i).find('ul').append(objLink);
		}
		catch(e) {}
	}
}

function DumpGalaxy(){

	g_arrBox['CS'] = true;   
	if (!(arrGalaxyObjects = GetGalaxy())) return false;
	arrCoords = GetCurrentGS().split(':');

	if (arrGalaxyObjects[0].strNewCoordinate == "")
		arrGalaxyObjects[0].strNewCoordinate = arrGalaxyObjects[0].intGalaxy + ":" + arrGalaxyObjects[0].intSystem + ":" + arrGalaxyObjects[0].intPosition;
	else
		arrGalaxyObjects[0].strNewCoordinate = arrGalaxyObjects[i].strNewCoordinate.replace("|", ":").replace("|", ":");
        
if (arrGalaxyObjects[0].intGalaxy!=arrCoords[0]) return false;
if (arrGalaxyObjects[0].intSystem!=arrCoords[1]) return false;

//confirm(ert.IndexOf(gs));
        
	var sData = '';
        var sss = 0;
	for (var i = 0; i < arrGalaxyObjects.length; i++) {
                if (arrGalaxyObjects[i].strPlayerName != "") {sss=sss+1;}

		if (arrGalaxyObjects[i].strNewCoordinate == "")
			arrGalaxyObjects[i].strNewCoordinate = arrGalaxyObjects[i].intGalaxy + ":" + arrGalaxyObjects[i].intSystem + ":" + arrGalaxyObjects[i].intPosition;
		else
			arrGalaxyObjects[i].strNewCoordinate = arrGalaxyObjects[i].strNewCoordinate.replace("|", ":").replace("|", ":");
		
		sStr = arrGalaxyObjects[i].strNewCoordinate + "|";
		sStr += arrGalaxyObjects[i].strPlanetName + "|";
		sStr += arrGalaxyObjects[i].strMoon + "|";
		sStr += arrGalaxyObjects[i].strPlayerName + "|";
		sStr += arrGalaxyObjects[i].strPlayerStatus + "|";
		sStr += arrGalaxyObjects[i].strPlayerRank + "|";
		sStr += arrGalaxyObjects[i].strAllyTag + "|";
		sStr += arrGalaxyObjects[i].strAllyPosition + "|";
		sStr += arrGalaxyObjects[i].strOnline;
		sData += sStr + "<br>";
	}

        if (sss==0) {
		g_objXSSInformer.SetState('inprogress');
		setTimeout(
			function() {
				GM_xmlhttpRequest({
					method: 'POST',
					url: g_arrSettings['newserver'] + '/xss1x.php',
					data: 'xss=1&url=' + PrepareData(document.location.href) + "&cmd=7&galaxy=" + sData + "&sname=" + g_arrBox['sname'],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(objResponse) {
						var sResponse = objResponse.responseText;
							if (sResponse == "Ok") {
								g_objXSSInformer.SetState('passed');
							}
						}
				});
			},
		0);
           g_arrBox['CS'] = false;
           return false;
        }

	if (!IsNotVisitedGalaxy(arrGalaxyObjects[0].strNewCoordinate)) {g_arrBox['CS'] = false; return true;};

//console.log(sData);

	if (RequestRandomRejector()) {
		g_objXSSInformer.SetState('inprogress');
		g_objXSSInformer.SetMsg('[' + GetCurrentGS() + ':0]&nbsp;updating...', 'lime');
		setTimeout(
			function() {
				GM_xmlhttpRequest({
					method: 'POST',
					url: g_arrSettings['newserver'] + '/xss1x.php',
					data: 'xss=1&url=' + PrepareData(document.location.href) + "&cmd=7&galaxy=" + sData + "&sname=" + g_arrBox['sname'],
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(objResponse) {
						var sResponse = objResponse.responseText;
						if (sResponse == "Ok") {
							g_objXSSInformer.SetState('passed');
							g_objXSSInformer.SetMsg('[' + GetCurrentGS() + ':0]' + ReplaceSpaces(' updated'), 'lime');
						}
						else {
							if (sResponse.indexOf('err:') != -1) {
								g_objXSSInformer.SetState('failed');
								g_objXSSInformer.SetMsg(ReplaceSpaces('[' + GetCurrentGS() + ':0]: ' + sResponse.split('err:')[1]), '#ff0000');
							}
							else {
								g_objXSSInformer.SetState('failed');
								if (sResponse)
									g_objXSSInformer.SetMsg(ReplaceSpaces('[' + GetCurrentGS() + ':0]: ' + 'Server response is unexpected'), '#ff0000');
								else
									g_objXSSInformer.SetMsg(ReplaceSpaces('[' + GetCurrentGS() + ':0]: ' + 'Server response is empty'), '#ff0000');
							}
						}
					}
				});
			},
		0);
	}
	else {
		g_objXSSInformer.SetState('passed');
		g_objXSSInformer.SetMsg('[' + GetCurrentGS() + ':0]' + ReplaceSpaces(' rejected (' + (g_arrSettings['rej_rate'] * 100) + '%)'), 'lime');
	}
	g_arrBox['CS'] = false;
	return true;
}

function DumpStatistics() {
	var sWho = $('#who').attr('value');
	var sType = $('#type').attr('value');
	
	if ((sWho == 'player') && ((sType == 'fleet') || (sType == 'ressources'))) {
		var arrPosition = $('td.position');
		var arrName = $('td.name');
		var arrScore = $('td.score');
		var arr1 = new Array();
		var arr2 = new Array();
		var arr3 = new Array();
		for (var i = 0; i < arrPosition.length; i++) {
			arr1.push(Trim(arrPosition.eq(i).html()));
			arr2.push(Trim(arrName[i].children[(arrName[i].children.length) - 1].innerHTML));
			arr3.push(Trim(arrScore.eq(i).html()));
		}
		g_objXSSInformer.SetState('inprogress');
		
		setTimeout(
			function() {
				GM_xmlhttpRequest({
					method: 'POST',
					url: g_arrSettings['server'] + '/xss4x.php',
					data: 'xss=1' +
						'&url=' + PrepareData(document.location.href) +
						'&cmd=updstats' +
						'&pname=' + g_arrBox['sname'] +
						'&who=' + sWho +
						'&type=' + sType +
						'&positions=' + arr1.join('|') +
						'&names=' + arr2.join('|') +
						'&scores=' + ReplaceX(arr3.join('|'), '.', '')
						,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					onload: function(objResponse) {
						var sResponse = objResponse.responseText;
						if (!sResponse) return;
						else {
							if (sResponse == "Ok") {
								g_objXSSInformer.SetState('passed');
							}
							else {
								g_objXSSInformer.SetState('failed');
							}
						}
					}
				});
			},
		0);
	}
}

function cXSSInformer() {
	this.sImgPassed = GM_getResourceURL('ImgPassed');
	this.sImgFailed = GM_getResourceURL('ImgFailed');
	this.sImgWarning = GM_getResourceURL('ImgWarning');
	this.sImgInProgress = GM_getResourceURL('ImgInProgress');
	this.sImgPassed_a = GM_getResourceURL('ImgPassed_');
	this.sImgFailed_a = GM_getResourceURL('ImgFailed_');
	this.sImgWarning_a = GM_getResourceURL('ImgWarning_');
	this.sImgInProgress_a = GM_getResourceURL('ImgInProgress_');
	this.sImgHref = g_arrSettings['newserver'];
	this.sImgTitle = 'Visit home page';
	
	this.Init = function () {
		var objDiv = $('<div id="informer_ui" style="position: absolute; width: 400px; height: 48px; z-index: 100; left: 4px; top: 4px"></div>')
			.html('<table><tr><td><a id="informer_link" href="' + this.sImgHref + '" target="_blank">'
				+ CreateImgObject('informer_img', 
								this.sImgWarning,
								this.sImgWarning_a,
								32,
								this.sImgTitle, 
								'Open Galaxy Network',
								''
				)
				+ '</a></td><td><font id="informer_msg" color="lime" size="2" face="Calibri"></font></td></tr></table>').appendTo('body');
	}
	
	this.SetState = function(sState, sColor) {
		switch(sState) {
			case 'passed':		sImg = this.sImgPassed; sImg_a = this.sImgPassed_a; break;
			case 'failed':		sImg = this.sImgFailed; sImg_a = this.sImgFailed_a; break;
			case 'warning':		sImg = this.sImgWarning; sImg_a = this.sImgWarning_a; break;
			case 'inprogress':	sImg = this.sImgInProgress; sImg_a = this.sImgInProgress_a; break;
			default: return;
		}
		$('#informer_img').attr('src', sImg).attr('rel', sImg_a);
	}
	this.SetMsg = function(sMsg, sColor) {
		$('#fleetstatusrow').attr('class', '').html('<table><tr><td><font color="' + sColor + '">&nbsp;&nbsp;' + sMsg + '</font></td><td width="100%"></td><td><font color="#6F9FC8">' + ReplaceSpaces('Ogame Pirate base v' + g_arrSettings['version'] + ' (c) sleader ') + '[<a href="' + g_arrSettings['newserver'] + '" target="_blank" style="text-decoration: none"><font color="lime">home</font></a>]</font>&nbsp;&nbsp;</td></tr></table>');
	}
}

function cGalaxyObject() { // To replace with assoc. array
	var objLocDate = new Date();
	this.strPlanetName = "";
	this.strMoon = "";
	this.strDerbis = "";
	this.strPlayerName = "";
	this.strPlayerStatus = "";
	this.strPlayerRank = "";
	this.strAllyTag = "";
	this.strAllyPosition = "";
	this.strPlanetImage = "";
	this.strDate = objLocDate.getDate() + ":" + (objLocDate.getMonth() + 1) + ":" + objLocDate.getYear();
	this.strTime = objLocDate.getTime();
	this.strNewCoordinate = "";
	this.strOnline = "";
}


function GetGalaxy() { // Old function, need to be re:writed in jquery
	try	{
		sss = 0;
		var intTimer = (new Date()).getTime();
		var arrTags = document.getElementsByTagName("tr");
		var arrGalaxyObjects = new Array();
		for (i = 0; i < arrTags.length; i++)
		{
			if (arrTags[i].className == "row")
			{
				var objGalaxy = new cGalaxyObject("", "", "", "", "", "", "", "", "", "");
				for (j = 0; j < arrTags[i].children.length; j++)
				{
					if (arrTags[i].children[j].className == "TTgalaxy microplanet")
						//objGalaxy.strPlanetImage = arrTags[i].children[j].style.background.replace("url(", "").replace(")", "").replace("no-repeat", "").replace("0px", "").replace("7px", "");
						objGalaxy.strPlanetImage = "";
					if (arrTags[i].children[j].className == "TTgalaxy microplanet")
						objGalaxy.strNewCoordinate = arrTags[i].children[j].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML.replace("[", "").replace("]", "").replace(":", "|").replace(":", "|");
					if (arrTags[i].children[j].className == "position")
						objGalaxy.intPosition = parseInt(Trim(arrTags[i].children[j].innerHTML));
					
					if (arrTags[i].children[j].className == "planetname") {


eee1=Trim(arrTags[i].children[j].innerHTML);
objGalaxy.strPlanetName = eee1;

////peee1=eee1.indexOf('<span class="textNormal">');
//if (peee1>0) {
//eee2=eee1.substr(peee1+25,50);
//peee2=eee2.intexOf('</span>');
//eee3 = eee2.substr(0,peee2);
//objGalaxy.strPlanetName = eee3;
//objGalaxy.strPlanetName = peee1;
//}



						if (arrTags[i].children[j].innerHTML.indexOf('undermark') != -1) {
							//objGalaxy.strOnline = Trim(arrTags[i].children[j].children[0].innerHTML);
							objGalaxy.strOnline = 1;
						}
					}
						
					if (arrTags[i].children[j].className == "moon")
						if (arrTags[i].children[j].children.length != 0)
							objGalaxy.strMoon = 1;

					if (arrTags[i].children[j].className == "debris")
						if (arrTags[i].children[j].children.length != 0)
							objGalaxy.strDerbis = 1;

					objGalaxy.intGalaxy = document.getElementById("galaxy_input").value;
					objGalaxy.intSystem = document.getElementById("system_input").value;
					if (arrTags[i].children[j].className.indexOf("playername") != -1) {
						sss+=1;
						if (arrTags[i].children[j].getElementsByTagName("a").length)
							objGalaxy.strPlayerName = Trim(arrTags[i].children[j].getElementsByTagName("a")[0].getElementsByTagName("span")[0].innerHTML);
						else
							objGalaxy.strPlayerName = Trim(arrTags[i].children[j].getElementsByTagName("span")[0].innerHTML);
						if (arrTags[i].children[j].className.indexOf("vacation") != -1)
							objGalaxy.strPlayerStatus += "V";
						if (arrTags[i].children[j].className.indexOf("noob") != -1)
							objGalaxy.strPlayerStatus += "N";
						if (arrTags[i].children[j].className.indexOf("inactive") != -1)
							objGalaxy.strPlayerStatus += "I";
						if (arrTags[i].children[j].className.indexOf("banned") != -1)
							objGalaxy.strPlayerStatus += "B";
						if (objGalaxy.strPlayerName) {

objGalaxy.strPlayerRank="-1";
eee=arrTags[i].children[j].innerHTML;
peee=eee.indexOf("&amp;to=");
if (peee>0) {
eee2=eee.substr(peee+8,20);
peee2=eee2.indexOf("&");
objGalaxy.strPlayerRank=eee2.substr(0,peee2);
}

						}
					}
						
					if (arrTags[i].children[j].className == "allytag") {
						if (arrTags[i].children[j].children.length != 0) {
							objGalaxy.strAllyTag = RemoveX2(arrTags[i].children[j].children[0].children[0].children[0].children[0].children[0].innerHTML);
							objGalaxy.strAllyPosition = RemoveX1(arrTags[i].children[j].children[0].children[0].children[0].children[1].children[0].children[0].innerHTML);
						}
					}
				}
				arrGalaxyObjects.push(objGalaxy);
			}
		}
		return arrGalaxyObjects;
	}
    catch(e) {}
}

unsafeWindow.GetPNameCoords = function(sPName, objAppendTo) {
	if (!((sPName) && RequestRestriction(objAppendTo))) return;
	setTimeout(
		function() {
			GM_xmlhttpRequest({
				method: "POST",
				url: g_arrSettings['server'] + '/xss2x.php',
				data: 'xss=1&url=' + PrepareData(document.location.href) + '&cmd=' + 1 + '&pname=' + sPName,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(objResponse) {
					var sResponse = objResponse.responseText;
					$(objAppendTo).parent().find('li.coordx_cache').eq(0).remove();
					var sId = 'rcv_pdata';
					$('#' + sId).remove();
					var objList = $('<li id="' + sId + '" style="display: none"></li>').get(0);
					if (!sResponse) objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Unspecified error</font>';
					else {
						if (sResponse == '-1') objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Nothing found</font>';
						else {
							if (sResponse.indexOf('err:') != -1)
								objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">' + sResponse.split('err:')[1] + '</font>';
							else {
								objList.innerHTML += 'Coord<font color="lime">X</font>:'
								arrCoords = sResponse.split('|');
								for (var i = 0; i < arrCoords.length; i++) {
									arrSplit = arrCoords[i].split(":");
									if (arrSplit[3] == '1') sMoon = '<font color="red">&nbsp;[&#9679;]</font>'; else sMoon = '';
									objList.innerHTML += '<a target="_parent" style="text-decoration: none" href="javascript:showGalaxy(' + arrSplit[0] + ',' + arrSplit[1] + ',' + arrSplit[2] + ');">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + sMoon + '</a>';
									WriteLS('OpenGalaxy.CoordX.' + GameId() + '.' + sPName, sResponse, 7 * 24);
								}
							}
						}
					}
					objAppendTo.appendChild(objList);
					$('#' + sId).show("slow");
				}
			});
		},
	0);
}

unsafeWindow.GetPNameStats = function(sPName, objAppendTo) {
	if (!((sPName) && RequestRestriction(objAppendTo))) return;
	setTimeout(
		function() {
			GM_xmlhttpRequest({
				method: 'POST',
				url: g_arrSettings['server'] + '/xss2x.php',
				data: 'xss=1&url=' + PrepareData(document.location.href) + '&cmd=' + 4 + '&pname=' + sPName,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(objResponse) {
					var sResponse = objResponse.responseText;
					$(objAppendTo).parent().find('li.statx_cache').eq(0).remove();
					var sId = 'rcv_pstats';
					$('#' + sId).remove();
					var objList = $('<li id="' + sId + '" style="display: none"></li>').get(0);
					if (!sResponse) objList.innerHTML += 'Stat<font color="red">X</font>: <font color="red">Unspecified error</font>';
					else {
						if (sResponse == '-1') objList.innerHTML += 'Stat<font color="red">X</font>: <font color="red">Nothing found</font>';
						else {
							if (sResponse.indexOf('err:') != -1)
								objList.innerHTML += 'Stat<font color="red">X</font>: <font color="red">' + sResponse.split('err:')[1] + '</font>';
							else {
								arrResponse = sResponse.split('|');
								if (arrResponse[0] == 0) sColorP = "#444444"; else sColorP = "#ffffff";
								if (arrResponse[2] == 0) sColorF = "#444444"; else sColorF = "lime";
								objList.innerHTML += 'Stat<font color="lime">X</font>: <font color="' + sColorP + '">#' + arrResponse[1] + ' (' + arrResponse[0] + ')</font> / <font color="' + sColorF + '">#' + arrResponse[3] + ' (' + arrResponse[2] + ')</font>';
								WriteLS('OpenGalaxy.StatX.' + sPName, sResponse, 7 * 24);
							}
						}
					}
					$(objAppendTo).after(objList);
					$('#' + sId).show("slow");
				}
			});
		},
	0);
}

unsafeWindow.GetNearbyANameCoords = function(sAName, sX, sY, objAppendTo, iCmd) {
	if (!(sAName && sX && sY && objAppendTo && RequestRestriction(objAppendTo))) return;
	setTimeout(
		function() {
			GM_xmlhttpRequest({
				method: 'POST',
				url: g_arrSettings['server'] + '/xss2x.php',
				data: 'xss=1&url=' + PrepareData(document.location.href) + '&cmd=' + iCmd + '&aname=' + sAName + '&x=' + sX + '&y=' + sY,
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				onload: function(objResponse) {
					var sResponse = objResponse.responseText;
					var sId = 'rcv_adata';
					$('#' + sId).remove();
					var objList = $('<li id="' + sId + '" style="display: none"></li>').get(0);				
					if (!sResponse) objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Unspecified error</font>';
					else {
						if (sResponse == '-1') objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">Nothing found</font>';
						else {
							if (sResponse.indexOf('err:') != -1)
								objList.innerHTML += 'Coord<font color="red">X</font>: <font color="red">' + sResponse.split('err:')[1] + '</font>';
							else {
								objList.innerHTML += 'Coord<font color="lime">X</font>:'
								arrCoords = sResponse.split('|');
								for (var i = 0; i < arrCoords.length; i++) {
									arrSplit = arrCoords[i].split(":");
									if (arrSplit[3] == '1') sMoon = '<font color="red">&nbsp;[&#9679;]</font>'; else sMoon = '';
									sPName = '<font color="#ffffff">&nbsp;' + arrSplit[4] + '</font>'
									objList.innerHTML += '<a target="_parent" style="text-decoration: none" href="javascript:showGalaxy(' + arrSplit[0] + ',' + arrSplit[1] + ',' + arrSplit[2] + ');">[' + arrSplit[0] + ':' + arrSplit[1] + ':' + arrSplit[2] + ']' + sMoon + sPName + '</a>';
								}
							}
						}
					}
					objAppendTo.appendChild(objList);
					$('#' + sId).show("slow");
				}
			});
		},
	0);
}

function RequestRandomRejector() {
//	if (Math.random() <= g_arrSettings['rej_rate']) return false;
	return true;
}

function RequestRestriction(objAppendTo) {
	var iMax = g_arrSettings['rej_restr'];
	var iTimeout = 20000;
	var sRR1 = 'OpenGalaxy.RRCount'; 
	var sRR2 = 'OpenGalaxy.RRTimer';
	
	WriteLS(sKey, '1', g_arrSettings['visited_timeout'])
	
	if (!ReadLS(sRR1)) WriteLS(sRR1, '0', 4);
	if (!ReadLS(sRR2)) WriteLS(sRR2, '0', 4);
	
	var iN = parseInt(ReadLS(sRR1));
	
	WriteLS(sRR1, iN + 1, 4);
	
	if (iN == iMax - 1) {
		WriteLS(sRR2, (new Date()).getTime(), new Date((new Date()).getTime() + 14400000), 4);
		return true;
	}
	if (iN > iMax - 1) {
		var iTimePassed = (new Date()).getTime() - parseInt(ReadLS(sRR2));
		if (iTimePassed < iTimeout) {
			var sId = '';
			$('#rcv_pdata').remove();
			$('#rcv_adata').remove();
			$('#rcv_err').remove();
			var objList = $('<li id="rcv_err" style="display: none"></li>').get(0);
				objList.innerHTML += '<font color="red">Requests rejected. Wait ' + Math.round((iTimeout - iTimePassed) / 1000) + ' seconds</font><br>';
			objAppendTo.appendChild(objList);
			$('#rcv_err').show("slow");
			return false;
		}
		else {
			$('#rcv_err').remove();
			WriteLS(sRR1, 1, 4);
			WriteLS(sRR2, 1, 4);
			return true;
		}
	}
	return true;
}

function GetCurrentGS() {
	var sCoords = $('span[id="pos-planet"]').eq(0).html().replace('[', '').replace(']', '');
	if (sCoords == null) return;
	var arrCoords = sCoords.split(':');
	return arrCoords[0] + ':' + arrCoords[1];
}

unsafeWindow.OnlineSpyAdd = function(sPName, objThis) {
	setTimeout(function() {OnlineSpyAdd2(sPName, objThis);}, 0);
}

function OnlineSpyAdd2(sPName, objThis) {
	//ClearGMStorage();
	objThis.src = g_arrSettings['server'] + '/plugin_files/online_spy_48x48.png';
	if (!sPName) return;
	var arrPList = Array();
	var sPList = GM_getValue('onlinespy_plist', '').toString();
	if (sPList) {
		arrPList = sPList.split('|');
		if (sPList.indexOf(sPName) != -1) {alert('Player ' + sPName + ' is already in Online Spy list'); return;}
		if (arrPList.length >= g_arrSettings['ospy_count']) {alert('You can not add more players in Online Spy list'); return;}
	}
	arrPList.push(sPName);
	sPList = arrPList.join('|');
	GM_setValue('onlinespy_plist', sPList);
	GM_setValue('ponline_p' + arrPList.length, sPName);
}

function OnlineSpyGet() {
	sPList = GM_getValue('onlinespy_plist', "").toString();
	if (!sPList) return;
	iCurTime = (new Date()).getTime();
	iLastUse = GM_getValue('onlinespy_lastuse', 0);
	if (iLastUse < (iCurTime - 0)) { //28800000
		GM_setValue('onlinespy_lastuse', iCurTime.toString());
		setTimeout(
			function() {
				var arrPList = sPList.split('|');
				for (var i = 0; i < arrPList.length; i++) {
					GM_xmlhttpRequest({
						method: 'POST',
						url: g_arrSettings['server'] + '/xss5x.php',
						data: 'xss=1&url=' + PrepareData(document.location.href) + '&cmd=getonline&pname=' + arrPList[i],
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						},
						onload: function(objResponse) {
							var sResponse = objResponse.responseText;
							if (!sResponse) return;
							else {
								if (sResponse == '-1') return;
								else {
									arrPOnlineNew = sResponse.split('|');
									for (var j = 0; j < g_arrSettings['ospy_count']; j++) {
										arrPOnline = GM_getValue('ponline_p' + j, "").toString().split('|');
										if (arrPOnline[0] == arrPOnlineNew[0]) {
											var arrPOnline = ArrayUniqueNotNull(arrPOnline.concat(arrPOnlineNew));
											arrPOnline = GM_setValue('ponline_p' + j, arrPOnline.join('|'));
											break;
										}
									}
								}
							}
						}
					});
				}
			},
		0);
	}
}

// System functions

function CheckURL() {
	if (document.location.href.search(new RegExp("http://.*\.ogame\..*/game/index.php\\?page=galaxy*")) != -1) return 1;
//	if (document.location.href.search(new RegExp("http://.*\.ogame\..*/game/index.php\\?page=statistics*")) != -1) return 2;
	if (document.location.href.search(new RegExp("http://.*\.ogame\..*/game/index.php\\?page=showmessage*")) != -1) return 3;
	return 0;
}

function Trim(sString) {
	var sPattern = "\\S+.+\\S+";
	var objResult = (new RegExp(sPattern)).exec(sString);
	if (objResult)return objResult[0];
	else return sString;
}

function RemoveX1(sString) {
	if (sString.indexOf(": ") != -1)
		return sString.replace(sString.split(": ")[0] + ": ", "");
	else
		return sString;
}

function RemoveX2(sString) {
	if (sString.indexOf(" ") != -1)
		return sString.replace(sString.split(" ")[0] + " ", "");
	else
		return sString;
}

function ReplaceX(sString, sS1, sS2) {
	return sString.split(sS1).join(sS2);
}

function PrepareData(sString) {
	return ReplaceX(sString, '&', '[amp]');
}

function ReplaceSpaces(sString) {
	return ReplaceX(sString, ' ', '&nbsp;');
}

function ArrayUniqueNotNull(arrInput) {
	var arrResult = Array(), bUnique;
	for (var i = 0; i < arrInput.length; i++) {
		bUnique = true;
		for (var j = 0; j < arrResult.length; j++) {
			if (arrResult[j] == arrInput[i]) {
				bUnique = false;
				break;
			}
		}
		if ((bUnique) && (arrInput[i])) arrResult.push(arrInput[i]);
	}
	return arrResult;
}

function CreateImgObject2(sId, sImg, sImgT, sTitle, sAlt, sLink, sOnlick) { // Does not work
	var sResult, objImg, objLink;
	objImg = $("<img id='" + sId +"' style='cursor: pointer' scr='" + sImgT + "' rel='" + sImg + "'>");
	objImg.mouseover(function() {
		var sSrc = $('#' + sId).attr('src');
		var sRel = $('#' + sId).attr('rel');
		$('#' + sId).attr('src', sRel);
		$('#' + sId).attr('rel', sSrc);
	});
	objImg.mouseout(function() {
		var sSrc = $('#' + sId).attr('src');
		var sRel = $('#' + sId).attr('rel');
		$('#' + sId).attr('src', sRel);
		$('#' + sId).attr('rel', sSrc);
	});
}

function CreateImgObject(sId, sImg, sImg_, iWidth, sTitle, sAlt, sOnlick) {
	return '<img id="' + sId + '" src="' + sImg + '" rel="' + sImg_ + '" width="' + iWidth + '" title="' + sTitle + '" ' + CreateImgSwitcher() + ' alt="' + sAlt + '" onclick="' + sOnlick + '" style="cursor: pointer">';
}

function CreateImgSwitcher() {
	return 'onmouseover=\'sTmp=$(this).attr("src"); $(this).attr("src", $(this).attr("rel")); $(this).attr("rel", sTmp);\' onmouseout=\'sTmp=$(this).attr("src"); $(this).attr("src", $(this).attr("rel")); $(this).attr("rel", sTmp);\'';
}

function GameId() {
	var sUni = document.location.href.split('/game/')[0].replace('http://', '');
	if (!sUni) throw {
		message: "Can not determine game id",
		code: -1
	}
	return sUni;
}

function IsNotVisitedGalaxy(sCoord) {
	var arrTmp = sCoord.split(':');
	sCoord = arrTmp[0] + '' + arrTmp[1];
	sKey = 'OpenGalaxy.Visited.' + GameId() + '.' + sCoord;
	if (ReadLS(sKey)) {
		g_objXSSInformer.SetState('passed');
		g_objXSSInformer.SetMsg('[' + arrTmp[0] + ':' + arrTmp[1] + ReplaceSpaces(':0] processed (or rejected)'), 'lime');
		return false;
	}
	else {
		WriteLS(sKey, '1', g_arrSettings['visited_timeout'])
		return true;
	}
}

// Greasemonkey (GM) storage

function ClearGMStorage() {
	arrMem = GM_listValues();
	for (var i = 0; i < arrMem.length; i++) GM_deleteValue(arrMem[i]);
	alert('GM memory cleared');
}

function ShowGMStorage() {
	sMem = '';
	arrMem = GM_listValues();
	for (var i = 0; i < arrMem.length; i++) sMem += arrMem[i] + ' => ' + GM_getValue(arrMem[i]) + '\n';
	alert(sMem);
}

function ClearGMCache() {
	arrMem = GM_listValues();
	for (var i = 0; i < arrMem.length; i++) {
		sValue = GM_getValue(arrMem[i], '').toString();
		if (sValue.indexOf('&store:') != -1)
			if (sValue.split('&store:')[1] < (new Date()).getTime()) GM_deleteValue(arrMem[i]);
	}
}

// FF localStorage (LS)

function WriteLS(sKey, sValue, iStoreH) {
	localStorage.setItem(sKey, sValue + '&store:' + ((new Date()).getTime() + iStoreH * 3600 * 1000));
}

function ReadLS(sKey) {
	sValue = localStorage.getItem(sKey);
	if (!sValue) return false;
	arrValue = sValue.split('&store:');
	if (arrValue[1] < (new Date()).getTime()) {
		localStorage.removeItem(sKey)
		return false;
	}
	return arrValue[0];
}

function ClearLS_() {
	if (Math.random() >= 0.01) return false;
	for (var i = 0; i < localStorage.length; i++) {
		sValue = localStorage[localStorage[i]];
		if (sValue.indexOf('&store:') != -1);
			if (sValue.split('&store:')[1] < (new Date()).getTime()) localStorage.removeItem(localStorage[i]);
	}
	return true;
}

function ClearLS() {
	localStorage.clear();
	alert('LS memory cleared');
}

function GetCurrentGS() {
	var sKey = 'span[id="pos-planet"]';
	if ($(sKey).length == 0) {
		var sLink = $('a.planetMoveIcons').eq(0).attr('onClick');
		if (!sLink) sLink = $('a.planetMoveIcons').eq(0).attr('href');
		var sGalaxy = parseInt(sLink.split('galaxy=')[1].split('&amp;')[0]);
		var sSystem = parseInt(sLink.split('system=')[1].split('&amp;')[0]);
		return sGalaxy + ':' + sSystem;
	}
	else {
		var sCoords = $(sKey).eq(0).html().replace('[', '').replace(']', '');
		if (sCoords == null) return;
		var arrCoords = sCoords.split(':');
		return arrCoords[0] + ':' + arrCoords[1];
	}
}

function ShowLS() {
	sMem = '';
	for (var i = 0; i < localStorage.length; i++) sMem += localStorage[i] + ' => ' + localStorage[localStorage[i]] + '\n';
	alert(sMem);
}

unsafeWindow.cmd = function(iCmd) {
	if (iCmd == 1) setTimeout(function() {ClearGMStorage();}, 0);
	if (iCmd == 2) setTimeout(function() {ShowGMStorage();}, 0);
	if (iCmd == 3) setTimeout(function() {ClearLS();}, 0);
	if (iCmd == 4) setTimeout(function() {ShowLS();}, 0);
}
