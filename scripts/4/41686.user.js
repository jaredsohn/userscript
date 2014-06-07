// ==UserScript==
// @name           Fate Helper
// @namespace      http://fate.jaescout.com/dbhelper/
// @description    Interface Enhancement of Astroempires
// @include        http://epsilon.astroempires.com/*
// @include        http://*.jaescout.com/*
// @exclude 	     http://*.astroempires.com/home.aspx*
// @exclude 	     http://*.astroempires.com/login.aspx*
// @exclude        http://fateepsilon.proboards85.com/*
// @resource targt http://fate.jaescout.com/dbhelper/littletarget.gif
// @resource arrow http://fate.jaescout.com/dbhelper/littlearrow.gif
// @resource   eye http://fate.jaescout.com/dbhelper/eye.png
// @resource alarm http://fate.jaescout.com/dbhelper/alarmclock.png
// @resource   css http://fate.jaescout.com/dbhelper/style.css
// @require        http://fate.jaescout.com/dbhelper/data.js
// @require        http://fate.jaescout.com/dbhelper/support.js
// @require        http://fate.jaescout.com/dbhelper/config.js
// ==/UserScript==

var uploadarray = new Array();
var uploadcount = 0 ;
var forum_url = 'http://fateepsilon.proboards85.com/';

if (urlhostname == universeName+".astroempires.com"){
	var url = window.location.toString().match(/\?(.+)$/);
	var params = RegExp.$1.split("&");
	var EmpireParams = {};
	var servername = urlhostname.split('.')[0];
	servername = servername.substring(0,1).toUpperCase() + servername.substring(1) + " - ";
	function getparams() {
		for(var i=0;i<params.length;i++) {
			var tmp = params[i].split("=");
			EmpireParams[tmp[0]] = unescape(tmp[1]);
		}
	}
	switch(window.location.pathname) {
		case "/commander.aspx": window.document.title = servername+"Commanders"; break;
		case "/guild.aspx": window.document.title = servername+"Guild"; break;
		case "/notes.aspx": window.document.title = servername+"Notes"; break;
		case "/bookmarks.aspx": window.document.title = servername+"Bookmarks"; break;
		case "/messages.aspx": window.document.title = servername+"Messages"; break;
		case "/board.aspx": window.document.title = servername+"Board"; break;
		case "/base.aspx":
			if (window.document.forms[0] && window.document.forms[0].elements[0]) {
				var base = window.document.forms[0].elements[0];
				if (base.options[base.selectedIndex]) {
					window.document.title = servername+base.options[base.selectedIndex].text;
					break;
				}
			}
			window.document.title = servername+"Base";
			break;
		case "/map.aspx": 
			getparams();
			if (EmpireParams.map){
				window.document.title = servername+"Map/" + EmpireParams.map; break;
			}
			if (EmpireParams.loc){
				window.document.title = EmpireParams.loc; break;
			}
			else {
				window.document.title = servername+"Map"; break;
			}
		break;
		case "/fleet.aspx":
			getparams();
			if (EmpireParams.gal){
				window.document.title = servername+ EmpireParams.gal; break;
			}
			else{
				window.document.title = servername+"Fleets"; break;
			}
		break;
		case "/empire.aspx":
			getparams();
			 for(var i in EmpireParams) {
				 switch(EmpireParams[i]) {
					 case "scanners": window.document.title = servername+"Scanners"; break;
					 case "technologies": window.document.title = servername+"Tech"; break;
					 case "units": window.document.title = servername+"Units"; break;
					 case "structures": window.document.title = servername+"Structures"; break;
					 case "economy": window.document.title = servername+"Economy"; break;
					 case "bases_capacities": window.document.title = servername+"Base Capacities"; break;
					 case "bases_events": window.document.title = servername+"Base Events"; break;
					 case "trade": window.document.title = servername+"Trade"; break;
					 default: window.document.title = servername+"Empire"; break;
				 }
			 }
		break;
		default:
		window.document.title = window.document.title.replace("Astro Empires - ", servername);
	}
} else if (urlhostname == "forum.astroempires.com"){
	var newtitle = [];
	var path = window.location.pathname;
	if (path == "/index.php"){
		window.document.title = "Forum Index";
	}
	else{
		newtitle = window.document.title.split("Astro Empires :: ");
		window.document.title = newtitle[1];
	}
}
var pagetype=getPageType();

function getGameServerTime() {
	var tmp_HTML = document.body.innerHTML.substr(document.body.innerHTML.indexOf("Server Time:")+13, 19);
	if (tmp_HTML.indexOf("<") >0) {
	    tmp_HTML = tmp_HTML.substr(3, 2) + "/" + tmp_HTML.substr(0, 2) + "/" + tmp_HTML.substr(6, 12)
	}
	else {
        tmp_HTML = tmp_HTML.substr(3, 2) + "/" + tmp_HTML.substr(0, 2) + "/" + tmp_HTML.substr(6, 13);
    }
	return tmp_HTML;
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	AUTOSCOUT_FRAME
//////////////////////////////////////////////////////////////////////////////////////////
function autoScoutUpdateReportMap() {
  callOnMainFrame("setMapScoutHighlights('"+autoScoutListWaypoints().join(',').replace('*','').replace('\r','')+"');");
	callOnMainFrame("setNextScoutWaypoint('"+autoScoutGetNextWaypoint()+"');");
  autoScoutUpdateLastScanTimes();
  callOnMainFrame("highlightFleet('"+scoutFleetIdInput.value+"');");
}
function scoutOnLoadMainPage() {
  autoScoutUpdateReportMap();
  callOnMainFrame("highlightFleet('"+scoutFleetIdInput.value+"');");
}
function autoScoutLock() {
  scoutEditingLocked=1;
  scoutWaypointsInput.disabled='disabled';
  scoutWaypointsInput.style.color='#CCCCCC';
  scoutWaypointsInput.style.backgroundColor='#444444';
  scoutFleetIdInput.disabled='disabled';
  scoutFleetIdInput.style.color='#CCCCCC';
  scoutFleetIdInput.style.backgroundColor='#444444';
  scoutLockScoutingBtn.style.display='none';
  scoutEditScoutingBtn.style.display='block';
}
function autoScoutPauseScouting() {
  scoutfindingregionwaypoint = '';
  scoutfindingsystemwaypoint = '';
  scoutsystemlist = '';
  if (scoutFleetArrivalTimeout) {
    clearTimeout(scoutFleetArrivalTimeout);
  }
  scoutFleetArrivalTimeout=0;
  if (scoutUpdateFleetMovementInterval) {
    clearInterval(scoutUpdateFleetMovementInterval);
  }
  scoutUpdateFleetMovementInterval=0;
  if (pollScanStart) {
    clearInterval(pollScanStart);
  }
  pollScanStart=0;
  scoutfillingalaxywaypoints =0;
  clearMainFrameCalls();
  scoutPauseScouting = 1;
  scoutPauseScoutingBtns.style.display='none';
  scoutStartScoutingBtns.style.display='block';
}
function autoScoutBeginScouting() {
	function scoutCheckWaypoints() {
		var gal = '';
		var newWpsList = '';
		if ($('always nearest').checked && $('scan age threshold').value=='0') {
			alert("To use the 'always nearest' option you must select a minimum age of scans to skip.\nOtherwise the scout would endlessly scan the same 2 regions");
		}
		var wps = autoScoutListWaypoints();
		for (var i=0; i<wps.length; i++) {
			var isnext = wps[i].indexOf('*')!=-1;
			var wp = wps[i].replace('*','').replace(/\(\d+\)\s+/g,'');
			if (wp=='') {
				continue;
			}
			var res = loc_re.exec(wp);
			if (!res || (wp.length!=12 && wp.length!=6)) {
				alert('Invalid waypoint:\n'+wp);
				return 0;
			}
			for (var j=i+1; j<wps.length; j++) {
				var wp2 = wps[j].replace('*','');
				if (wp.slice(0,6)==wp2.slice(0,6)) {
					alert('region included twice:\n'+wp+'\n'+wp2);
					return 0;
				}
			}
			if (i==0) {
				gal = wp.slice(0,3);
			}
			else {
				if (wp.slice(0,3) != gal) {
					alert('list spans multiple galaxies:\n'+gal+'\n'+wp);
					return 0;
				}
			}
			if (newWpsList) {
				newWpsList+='\n';
		  }
			newWpsList+=wp;		
			if (isnext) {
				newWpsList+='*';
			}
		}
		scoutWaypointsInput.value = newWpsList;
		return 1;
	}

  autoScoutUpdateInputOptions();
  if (scoutFleetIdInput.value=='') {
    alert('No Fleet selected');
    return;
  }
  if (!scoutCheckWaypoints()) {
    return;
  }
  if (scoutWaypointsInput.value=='') {
    if (!$('always nearest').checked) {
      alert("No waypoints.\nTo scout an entire galaxy without waypoints you need to use a minimum scan age and check the 'always nearest' box.");
      return;
    }
    scoutfillingalaxywaypoints=1;
    scoutDebug('filling waypoints');
  }
  autoScoutLock();
  scoutPauseScouting = 0;
  scoutPauseScoutingBtns.style.display='block';
  scoutStartScoutingBtns.style.display='none';
  autoScoutGetLastScanTimes();
  $('scouting status').innerHTML = 'initialising';
}
function autoScoutSetStatus() {
  var html = 'Next wp: <span style="color:#AAFFAA">';
  html += ' #'+scoutNextWaypointNumber+'<br>';
  html += scoutNextWaypoint;
  html+='</span><br>';
  var selectbox = $('scout scan type');
  for (var i=0; i<selectbox.childNodes.length; i++) {
    if (selectbox.childNodes[i].selected) {
      html+=selectbox.childNodes[i].innerHTML + '<br>';
      break;
    }
  }
  selectbox = $('scan age threshold');
  for (i=0; i<selectbox.childNodes.length; i++) {
    if (selectbox.childNodes[i].selected) {
      html+=selectbox.childNodes[i].innerHTML + '<br>';
      break;
    }
  }
  if ($('always nearest').checked) {
    html += 'always nearest';
  } else if ($('loop waypoints').checked) {
    html += 'looping on';
  } else {
    html += 'no looping';
  }
  $('scouting status').innerHTML = html;
}
function autoScoutCheckFleet() {
	function autoScoutStartScan() {
		if (scoutPauseScouting)	{
			if (pollScanStart) {
				clearInterval(pollScanStart);
			}
			pollScanStart = 0;
			return;
		}
		callOnMainFrame($('scout scan type').value+"();");
		try {
			var mainframeloc = parent.frames[1].location.href;
		} catch(e) {
			alert("ERROR! I'm trying to start scanning on the main frame, but it appears to be connected to the wrong server\nPlease navigate back to "+serverurl+" so I can continue scouting..");
		}
	}

  if (scoutUpdateFleetMovementInterval) {
    clearInterval(scoutUpdateFleetMovementInterval);
  }
  scoutUpdateFleetMovementInterval=0;
  if (scoutFleetArrivalTimeout) {
    clearInterval(scoutFleetArrivalTimeout);
  }
  scoutFleetArrivalTimeout=0;
  if (scoutPauseScouting)	{
		return;
	}
  scoutDebug('checking fleet');
window.setTimeout(function() {
      GM_xmlhttpRequest({
          method: 'GET',
          url: serverurl+"fleet.aspx?fleet="+scoutFleetIdInput.value,
          onerror: function (responseDetails) {scoutDebug(responseDetails.status);},
					onload: function (responseDetails) {
						function autoScoutFindRegionWaypoint() {
							if (scoutPauseScouting)	{
								scoutfindingregionwaypoint = '';
								scoutfindingsystemwaypoint = '';
								scoutsystemlist = '';
								return;
							}
								if (scoutsystemlist) {
									autoScoutRegionData(scoutsystemlist);
								} else {
									try {
											scoutDebug('finding suitable waypoint');
											parent.frames[1].location.href = serverurl+'map.aspx?loc='+scoutfindingregionwaypoint;
									 } catch(e) {
											autoScoutPauseScouting();
											alert("ERROR! I'm trying to start scanning on the main frame, but it appears to be connected to the wrong server\nPlease navigate back to "+serverurl+" so I can continue scouting..");
										}
								}
						}
					
						if (scoutPauseScouting)	{
							return;
					  }
						var res1 = autoScoutFleetInfo_re.exec(responseDetails.responseText);
						var res2 = fleetSize_re.exec(responseDetails.responseText);
						if (!res1) {
							alert("Error.. Couldn't find fleet.\nAre you sure it hasn't merged with another fleet.\nPlease re-enter fleetid");
							return;
						}
						if (!res2) {
							alert("Fleet size error.. fleet must consist of a single ship.");
							return;
						}
						if (res2[2]!='1') {
							alert("Fleet size error.. fleet must consist of a single ship.");
							return;
						}
						var scoutFleetCurrentLoc = res1[1];
						scoutFleetDestination = res1[4] ? res1[4] : scoutFleetCurrentLoc;
						setScoutFleetArrival( res1[7] ? parseInt(res1[7]) : 0 );
						if (scoutfillingalaxywaypoints && scoutWaypointsInput.value=='') {
							scoutfillingalaxywaypoints =0;
							var newWps = '';
							var gal = scoutFleetCurrentLoc.slice(0,3);
							if (scoutQuarter0=='1') {
								for (var x=0; x<5; x++) {
									for (var y=0; y<5; y++) {
										if (((x==0 || x==9) && (y<2 || y>7)) || ((y==0 || y==9) && (x<2 || x>7))) {
											continue;
										}
										if (newWps) {
											newWps+='\n';
										}
										newWps+=gal+':'+String(x)+String(y);
									}
								}
							}
							if (scoutQuarter1=='1') {
								for (var x=0; x<5; x++) {
									for (var y=5; y<10; y++) {
										if (((x==0 || x==9) && (y<2 || y>7)) || ((y==0 || y==9) && (x<2 || x>7))) {
											continue;
										}
										if (newWps) {
											newWps+='\n';
										}
										newWps+=gal+':'+String(x)+String(y);
									}
								}
							}
							if (scoutQuarter2=='1') {
								for (var x=5; x<10; x++) {
									for (var y=0; y<5; y++) {
										if (((x==0 || x==9) && (y<2 || y>7)) || ((y==0 || y==9) && (x<2 || x>7))) {
											continue;
										}
										if (newWps) {
											newWps+='\n';
										}
										newWps+=gal+':'+String(x)+String(y);
									}
								}
							}
							if (scoutQuarter3=='1') {
								for (var x=5; x<10; x++) {
									for (var y=5; y<10; y++) {
										if (((x==0 || x==9) && (y<2 || y>7)) || ((y==0 || y==9) && (x<2 || x>7))) {
											continue;
										}
										if (newWps) {
											newWps+='\n';
										}
										newWps+=gal+':'+String(x)+String(y);
									}
								}
							}
							if (newWps=='') {
								for (var x=0; x<10; x++) {
									for (var y=0; y<10; y++) {
										if (((x==0 || x==9) && (y<2 || y>7)) || ((y==0 || y==9) && (x<2 || x>7))) {
											continue;
										}
										if (newWps) {
											newWps+='\n';
										}
										newWps+=gal+':'+String(x)+String(y);
									}
								}
							}
							scoutWaypointsInput.value = newWps;
							scoutQuarter0 = '1';
							scoutQuarter1 = '1';
							scoutQuarter2 = '1';
							scoutQuarter3 = '1';	
						}
						if (autoScoutFindNextWaypoint(scoutFleetDestination)) {
							if (scoutFleetArrival) {
								if (scoutFleetArrivalTimeout)
									clearTimeout(scoutFleetArrivalTimeout);
								if (!scoutIsInitialLoad)
									callOnMainFrame("location.href='"+serverurl+"fleet.aspx?gal="+scoutFleetDestination.slice(0,3)+"';");
								scoutIsInitialLoad = 0;
								scoutFleetArrivalTimeout = setTimeout(autoScoutGetLastScanTimes, (scoutFleetArrival*1000) + 10000);
								autoScoutSetStatus();
								return;
							}
							else {
								if (scoutLastScannedRegion != scoutFleetCurrentLoc.slice(0,6) && scoutFleetCurrentLoc.slice(0,6) == scoutNextWaypoint.slice(0,6)) {
									if (scoutPauseScouting)	return;
									var rloc=scoutNextWaypoint.slice(0,6);
									scoutDebug('loading region:<br>'+rloc);
									clearMainFrameCalls();
									try {
										parent.frames[1].location.href = serverurl+'map.aspx?loc='+rloc;
										if (pollScanStart)
											clearInterval(pollScanStart);
										pollScanStart = setInterval(autoScoutStartScan, 3000);
									} catch(e) {
										autoScoutPauseScouting();
										alert("ERROR! I'm trying to start scanning on the main frame, but it appears to be connected to the wrong server\nPlease navigate back to "
											+serverurl+" so I can continue scouting..");
									}
									autoScoutSetStatus();
									return;
								}				
								else {
									if (scoutFleetCurrentLoc.slice(0,6) == scoutNextWaypoint.slice(0,6))
										autoScoutAdvanceWaypoint();
									if (scoutNextWaypoint) {
										scoutshiptype = res2[1];
										scoutshipquantity = parseInt(res2[2]);
										
										if (scoutNextWaypoint.length==6) {
											scoutfindingregionwaypoint = scoutNextWaypoint;
											autoScoutFindRegionWaypoint();
											return;
										}
										autoScoutMoveScout(scoutFleetIdInput.value, scoutNextWaypoint, scoutshiptype, scoutshipquantity);
										autoScoutSetStatus();
										return;
									}
								}
							}
						}
						autoScoutSetNextWaypoint('');
						scoutError('Scout finished');
						autoScoutPauseScouting();
						if (scoutFleetDestination && !scoutIsInitialLoad)
							callOnMainFrame("location.href='"+serverurl+"fleet.aspx?gal="+scoutFleetDestination.slice(0,3)+"';");
						scoutIsInitialLoad = 0;
						var form = '<form id="reloadscoutrouteform" method="GET" action="'+dbase_url+'wlhelper/scoutframe.php" target="_top">';
						if (scoutLastScannedRegion) {
							form +='<input name="q0" value="'+scoutLastScannedRegion.slice(0,3)+'">';
						}
						form +='<input name="finished" value="Finished">';
						form +='</form>';
					
						var d = node({html: form, style: {display: 'none'}, append: document.body});
						EventManager.CleanUp();
						$('reloadscoutrouteform').submit();
					}
      });
}, 0);
}
function setScoutFleetArrival(s) {
	function autoScoutUpdateFleetMovement() {
		var elem=$('scouteta');
		if (elem) {
			scoutFleetArrival = (parseInt(elem.title) - (new Date()).getTime()) / 1000;
			if (scoutFleetArrival<0) {
				scoutFleetArrival=0;
				if (scoutUpdateFleetMovementInterval)
					clearInterval(scoutUpdateFleetMovementInterval);
			}
			elem.innerHTML = secsToClockTime(scoutFleetArrival);
		}
	}

  if (scoutUpdateFleetMovementInterval)
    clearInterval(scoutUpdateFleetMovementInterval);
  scoutFleetArrival = s;
  scoutFleetETA = (new Date()).getTime() + (s*1000);
  scoutUpdateFleetMovementInterval = setInterval(autoScoutUpdateFleetMovement, 999);

  if (scoutEtaCounter && scoutEtaCounter.id)
    scoutEtaCounter.id='expired';
  scoutDebug('en route:<br>'+scoutFleetDestination+'<br>~<div style="text-align:right;" id="scoutEtaCounter" title="'+scoutFleetETA+'">'+secsToClockTime(scoutFleetArrival)+'</div>');
  scoutEtaCounter = $('scoutEtaCounter');
  scoutEtaCounter.id = 'scouteta';
}
function autoScoutGetLastScanTimes() {
  if (scoutPauseScouting)	return;
  var gloc = autoScoutListWaypoints()[0].slice(0,3);
  scoutDebug('checking last scan');
//	window.setTimeout(function() {
//				GM_xmlhttpRequest({
//						method: 'GET',
//						url: dbase_url+'aej_lastscan.php?gloc='+gloc+'&password='+dbase_pass,
//						onload: function (responseDetails) {
//							interpretForumLogin(responseDetails.responseText);
//							autoScoutUpdateLastScanTimesResponse(responseDetails);
//							if (scoutPauseScouting)	return;
//							autoScoutCheckFleet();
//						}
//				});
//	}, 0);
}
function autoScoutUpdateLastScanTimes() {
  try {
		var gloc = autoScoutListWaypoints()[0].slice(0,3);
//		window.setTimeout(function() {
//					GM_xmlhttpRequest({
//							method: 'GET',
//							url: dbase_url+'aej_lastscan.php?gloc='+gloc+'&password='+dbase_pass,
//							onload: autoScoutUpdateLastScanTimesResponse,
//					});
//		}, 0);
  }
  catch(e) {}
}
function autoScoutUpdateLastScanTimesResponse(responseDetails) {
  interpretForumLogin(responseDetails.responseText);
  var strlist = '';
  eval(responseDetails.responseText);
  var wps = autoScoutListWaypoints();
  for (var key in scoutRecentScans) {
    if (scoutRecentScans[key] > parseInt($('scan age threshold').value))
      scoutRecentScans[key] = '';
    else strlist+=key+',';
  }
  callOnMainFrame("darkenWaypointsToSkip('"+strlist+"');");
}
function autoScoutSystemData(scoutsystemdata) {
  if (scoutPauseScouting)	{
    scoutfindingregionwaypoint = '';
    scoutfindingsystemwaypoint = '';
    scoutsystemlist = '';
    return;
  }
  if (scoutfindingsystemwaypoint) {
    if (scoutsystemdata) {
      var locs = scoutsystemdata.split(',');
      scoutfindingregionwaypoint = '';
      scoutfindingsystemwaypoint = '';
      scoutsystemlist = '';
      autoScoutMoveScout(scoutFleetIdInput.value, locs[locs.length-1], scoutshiptype, scoutshipquantity);
      autoScoutSetStatus();
      return;
    } else {
      scoutDebug('empty System');
      scoutfindingsystemwaypoint = '';
      //setTimeout(autoScoutFindingSystemWaypointEmpty,500);
      setTimeout(autoScoutRegionData,500, scoutsystemlist);
    }
  }	
}
function autoScoutRegionData(scoutregiondata) {
	function autoScoutFindSystemWaypoint() {
		if (scoutPauseScouting)	{
			scoutfindingregionwaypoint = '';
			scoutfindingsystemwaypoint = '';
			scoutsystemlist = '';
			return;
		}
		try {
			parent.frames[1].location.href = serverurl+'map.aspx?loc='+scoutfindingsystemwaypoint;
		} catch(e) {
			autoScoutPauseScouting();
			alert("ERROR! I'm trying to start scanning on the main frame, but it appears to be connected to the wrong server\nPlease navigate back to "+serverurl+" so I can continue scouting..");
		}
	}
  if (scoutPauseScouting)	{
    scoutfindingregionwaypoint = '';
    scoutfindingsystemwaypoint = '';
    scoutsystemlist = '';
    return;
  }
  if (scoutfindingregionwaypoint && !scoutfindingsystemwaypoint) {
    scoutsystemlist = scoutregiondata;
    var locs = scoutregiondata.split(',');
    var wp0 = scoutFleetDestination;
    var mindist = 1000000;
    var minwp = '';
    for (var i=0; i<locs.length; i++) {
      var wp1 = locs[i];
      if (wp1) {
        if (scoutfindingregionwaypoint != wp1.slice(0,6)) {
          alert('wrong region loaded');
          return;
        }
        var wp0_y = parseInt(wp0.slice(1,2))*100+parseInt(wp0.slice(4,5))*10+parseInt(wp0.slice(7,8));
              var wp0_x = parseInt(wp0.slice(2,3))*100+parseInt(wp0.slice(5,6))*10+parseInt(wp0.slice(8,9));
              var wp1_y = parseInt(wp1.slice(1,2))*100+parseInt(wp1.slice(4,5))*10+parseInt(wp1.slice(7,8));
              var wp1_x = parseInt(wp1.slice(2,3))*100+parseInt(wp1.slice(5,6))*10+parseInt(wp1.slice(8,9));
        
              var dist = Math.sqrt((wp0_y-wp1_y)*(wp0_y-wp1_y) + (wp0_x-wp1_x)*(wp0_x-wp1_x));
        if (dist<mindist) {
          mindist = dist;
          minwp = wp1;
        }
      }
    }
    if (minwp) {
      var newlist = new Array();
      for (var i=0; i<locs.length; i++) {
        if (locs[i]!=minwp)
          newlist.push(locs[i]);
      }
      scoutsystemlist = newlist.join(',');
      scoutfindingsystemwaypoint = minwp;
      setTimeout(autoScoutFindSystemWaypoint,500);
    }
    else {
      scoutNextWaypoint = autoScoutFindNextWaypoint(scoutFleetDestination);
			var newWpsList = '';
			wps = autoScoutListWaypoints();
			for (var i=0; i<wps.length; i++) {
				if (wps[i]) {
					if (wps[i].replace('*','') != scoutfindingregionwaypoint)
						newWpsList+=wps[i]+'\n';
				}
			}
			scoutWaypointsInput.value = newWpsList;
      scoutfindingregionwaypoint = '';
      scoutfindingsystemwaypoint = '';
      scoutsystemlist = '';
      autoScoutCheckFleet();
    }
  }
}
function autoScoutFindNextWaypoint(scoutFleetDestination) {
  if ($('start at nearest wp').checked || $('always nearest').checked) {
		var wps = autoScoutListWaypoints();
		var mindist = 1000000;
		var minwp = '';
		for (var i=0; i<wps.length; i++) {
			var wp0 = scoutFleetDestination;
			var wp1 = wps[i].replace('*','');
			if (scoutRecentScans[wp1.slice(0,6)])
				continue;
			if (scoutLastScannedRegion==wp1.slice(0,6))
				continue;
			var wp0_y = parseInt(wp0.slice(1,2))*100+parseInt(wp0.slice(4,5))*10+parseInt(wp0.slice(7,8));
			var wp0_x = parseInt(wp0.slice(2,3))*100+parseInt(wp0.slice(5,6))*10+parseInt(wp0.slice(8,9));
			var wp1_y = 0;
			var wp1_x = 0;
			if (wp1.length==6) {
					var wp1_y = parseInt(wp1.slice(1,2))*100+parseInt(wp1.slice(4,5))*10 + 4.5;
					var wp1_x = parseInt(wp1.slice(2,3))*100+parseInt(wp1.slice(5,6))*10 + 4.5;
			} else {
				var wp1_y = parseInt(wp1.slice(1,2))*100+parseInt(wp1.slice(4,5))*10+parseInt(wp1.slice(7,8));
				var wp1_x = parseInt(wp1.slice(2,3))*100+parseInt(wp1.slice(5,6))*10+parseInt(wp1.slice(8,9));
			}
			var dist = Math.sqrt((wp0_y-wp1_y)*(wp0_y-wp1_y) + (wp0_x-wp1_x)*(wp0_x-wp1_x));
			if (dist < mindist) {
				mindist = dist;
				minwp = wp1;
			}
		}
		if (minwp) {
			$('start at nearest wp').checked='';
			if (!scoutFleetArrival)
				scoutDebug('closest wp:<br>'+minwp);
			autoScoutSetNextWaypoint(minwp);
		}
	}
	scoutNextWaypoint = autoScoutGetNextWaypoint();
	if (!scoutNextWaypoint)
		scoutNextWaypoint = autoScoutAdvanceWaypoint();
	if (scoutNextWaypoint && scoutRecentScans[scoutNextWaypoint.slice(0,6)]) {
    scoutDebug('recently scanned:<br>'+scoutNextWaypoint);
		scoutNextWaypoint = autoScoutAdvanceWaypoint();      		
  }      		
	if (scoutNextWaypoint && scoutLastScannedRegion == scoutNextWaypoint.slice(0,6))
    scoutNextWaypoint = autoScoutAdvanceWaypoint();
		callOnMainFrame("setNextScoutWaypoint('"+autoScoutGetNextWaypoint()+"');");
		return scoutNextWaypoint;
}
function autoScoutListWaypoints() {
  return scoutWaypointsInput.value.replace(/_?\d+=/g,'').split('\n');
}
function autoScoutGetNextWaypoint() {
  scoutNextWaypoint = '';
  scoutNextWaypointNumber = 0;
  var wps =autoScoutListWaypoints();
  for (var i=0; i<wps.length; i++) {
    if (wps[i].indexOf('*')!=-1) {
      scoutNextWaypointNumber = i+1;
      scoutNextWaypoint = wps[i].replace('*','');
      return scoutNextWaypoint;
    }
  }
  return '';
}
function autoScoutSetNextWaypoint(loc) {
  loc = loc.replace('*','');
  var newWpsList='';
  var wps =autoScoutListWaypoints();
  for (var i=0; i<wps.length; i++) {
    var wp = wps[i].replace('*','');
    if (wp && wp==loc) {
      newWpsList+=wp+'*'+'\n';
    }
    else if (wp)
      newWpsList+=wp+'\n';
  }
  scoutWaypointsInput.value = newWpsList;
}
function autoScoutAdvanceWaypoint() {
	function autoScoutGetNextWaypointInList() {
		var wp_index = -1;
		var wps =autoScoutListWaypoints();
		for (var i=0; i<wps.length; i++) {
			if (wps[i].indexOf('*')!=-1)
				wp_index = i;
		}
		if (wp_index==-1)
			return wps[0];
		else if (wp_index==wps.length-1) {
			if ($('loop waypoints').checked) {
				return wps[0];
			}
			else {
				return 0;
			}
		}
		else return wps[wp_index+1];
	}

  var wp = autoScoutGetNextWaypointInList();
  autoScoutSetNextWaypoint(wp);
  if (!wp) {
    autoScoutSetNextWaypoint('');
    return autoScoutGetNextWaypoint();
  }
  var wpfirst = wp;
  while(scoutRecentScans[wp.slice(0,6)]) {
    scoutDebug('recently scanned:<br>'+wp);
    wp = autoScoutGetNextWaypointInList();
    autoScoutSetNextWaypoint(wp);
    if (wp==wpfirst || !wp) {
      autoScoutSetNextWaypoint('');
      return autoScoutGetNextWaypoint();
    }
  }
  return autoScoutGetNextWaypoint();
}
function autoScoutMoveScout(fleetid, destination, shiptype, quantity) {
  if (scoutPauseScouting)	return;
  scoutDebug('moving to:<br>'+destination);
  var q = 'units='+escape(shiptype);
  q += '&back=move';
  q += '&fleet='+fleetid;
  q += "&destination="+destination;
  q += '&'+escape(shiptype)+'='+quantity;
window.setTimeout(function() {
		GM_xmlhttpRequest({
				method: 'POST',
				url: serverurl+"fleet.aspx",
				data: q,
				onerror: function (responseDetails) {scoutDebug(responseDetails.status);},
				onload: autoScoutMoveScoutResponse,
				headers: {'Content-type':'application/x-www-form-urlencoded'}
		});
}, 0);
}
function autoScoutMoveScoutResponse(responseDetails) {
  if (scoutPauseScouting)	return;
  var res = fleetresponsefleetlist_re.exec(responseDetails.responseText);
  var mres = fleetarrival_re.exec(responseDetails.responseText);
  var eres = fleetresponseerror_re.exec(responseDetails.responseText);
  if (eres) {
    scoutError(eres[2]);
    try {
      parent.frames[1].document.body.innerHTML = responseDetails.responseText;
    } catch(e) {}
  }
  else if (!res) {
    scoutError('unknown movement error!');
    try {
      parent.frames[1].document.body.innerHTML = responseDetails.responseText;
    } catch(e) {}
  }
  else if (!mres) {
    scoutError('error getting eta!');
    try {
      parent.frames[1].document.body.innerHTML = responseDetails.responseText;
    } catch(e) {}		
  }
  else {
    var h = mres[3];
    var m = mres[5];
    var s = mres[7];
    var s = parseInt(s);
    if (m) s += parseInt(m)*60;
    if (h) s += parseInt(h)*60*60;
    scoutFleetDestination = scoutNextWaypoint;
    setScoutFleetArrival( s );      
    if (scoutLastScannedRegion) {
			var form = '<form id="reloadscoutrouteform" method="GET" action="'+dbase_url+'wlhelper/scoutframe.php" target="_top">';
			form +='<input name="q0" value="'+scoutLastScannedRegion.slice(0,3)+'">';
			form +='<input name="q1" value="'+scoutFleetIdInput.value+'">';
			form +='<input name="q2" value="'+$('scan age threshold').value+'">';
			form +='<input name="q3" value="'+$('scout scan type').value+'">';
			form +='<input name="q4" value="'+$('always nearest').checked+'">';
			var wps = autoScoutListWaypoints().join(',').replace('\r','');
			form +='<input name="q5" value="'+encodeURIComponent(wps)+'">';
			form +='</form>';
			var d = node({html: form, style: {display: 'none'}, append: document.body});
			EventManager.CleanUp();
			$('reloadscoutrouteform').submit();
    } else
      callOnMainFrame("location.href='"+serverurl+"fleet.aspx?gal="+scoutNextWaypoint.slice(0,3)+"';");
  }
}
function autoScoutScannersStartedCallback() {
  if (pollScanStart)
    clearInterval(pollScanStart);
  pollScanStart = 0;

  if (scoutPauseScouting)	return;
  clearMainFrameCalls();
  scoutDebug('scanning..');
}
function autoScoutScannersFinished() {
  if (scoutPauseScouting)	return;
  scoutDebug('scan finished');
  scoutLastScannedRegion = scoutNextWaypoint.slice(0,6);
  autoScoutGetLastScanTimes();
}
function scoutDebug(str) {
  scoutDebugPane.innerHTML = str+'<hr>' + scoutDebugPane.innerHTML;
}
function scoutError(str) {
  scoutDebugPane.innerHTML = '<span style="color:red;">'+str+'</span><hr>' + scoutDebugPane.innerHTML;
}
function loadScoutInOtherFrame() {
  if (!scoutFleetIdInput.value) {
    scoutError('no fleet selected');
    return;
  }
  try {
    parent.frames[1].location.href = serverurl+'fleet.aspx?fleet='+scoutFleetIdInput.value;
  } catch(e) {
    GM_log(e);
    alert("Sorry, I can't load the other frame unless its looking at the "+serverurl+" server");
  }
}
function autoScoutUpdateInputOptions() {
  if ($('scan age threshold').value=='0') {
    $('always nearest').checked='';
    $('always nearest wrap').style.display='none';
  }
  else $('always nearest wrap').style.display='block';

  if ($('always nearest').checked) {
    $('start at nearest wp wrap').style.display='none';
    $('loop waypoints wrap').style.display='none';
  }
  else {
    $('start at nearest wp wrap').style.display='block';	
    $('loop waypoints wrap').style.display='block';	
  }
}
function initScoutingInterface() {
	function autoScoutEdit() {
		scoutEditingLocked=0;
		scoutWaypointsInput.disabled='';
		scoutWaypointsInput.style.color='';
		scoutWaypointsInput.style.backgroundColor='';
		scoutFleetIdInput.disabled='';
		scoutFleetIdInput.style.color='';
		scoutFleetIdInput.style.backgroundColor='';
		scoutLockScoutingBtn.style.display='block';
		scoutEditScoutingBtn.style.display='none';
	}
	function autoScoutReverseWaypoints() {
		var newWpsList = '';
		var wps = autoScoutListWaypoints();
		for (var i=wps.length-1; i>=0; i--) {
			if (wps[i])
				newWpsList+=wps[i]+'\n';	
		}
		scoutWaypointsInput.value = newWpsList;
		autoScoutUpdateReportMap();
	}
	function scoutFrameWindowCloseConfirmCallback(e) {
		e.returnValue = "This will stop your scout route.";
	}
	function pollActionsFromMainFrame() {
		if (pollActionsLock) return;
		pollActionsLock = 1;
		try {
			var el = $(gmprefix+'evalOnScoutFrame');
			if (el && el.value) {
				try {
				var actions = el.value.split('\n');
				var action = actions.shift();
				if (actions)
					el.value = actions.join('\n');
				else
					el.value='';
				if (action) {
					eval(action);
				}
				} catch(e) {}
			}
		} catch(e) {}	
		pollActionsLock = 0;	
	}
	function reloadOtherFrame() {
		try {
			parent.frames[1].location.href = parent.frames[1].location.href;
		} catch(e) {
			alert("Sorry, I can't reload the other frame unless its looking at the "+serverurl+" server");
		}
	}
	function closeScoutFrame() {
		var href;
		try {
			href = parent.frames[1].location.href;
		} catch(e) {
			href = serverurl+'empire.aspx';
		}
		var form = '<form id="closescoutframe" method="GET" action="'+dbase_url+'dbhelper/scoutframe.php" target="_top">';
		form +='<input name="redirect" value="'+encodeURIComponent(href)+'">';
		form +='</form>';
	
		var d= node({html: form, style: {display: 'none'}, append: document.body});
		$('closescoutframe').submit();
	}

  if (window.name.indexOf('scoutframe')!=-1) {
    isScoutFrame =1;
    document.body.innerHTML='';
    var el = node({tag: 'a', href: 'javascript:void(1);', text: ' close', style: {whiteSpace: 'nowrap'}, append: document.body});
    EventManager.Add(el, 'click', closeScoutFrame);
    node({tag: 'span', text: '[X]', style: {color: 'red'}, before: el.firstChild});
    node({tag: 'hr', style: {clear: 'both'}, append: document.body});
    var el = node({tag: 'a', href: 'javascript:void(1);', text: 'Reload page >>', style: {whiteSpace: 'nowrap', cssFloat: 'right'},
      title: "Refresh right pane. Use this if you have scanner problems (if they lock up or on an error).", append: document.body});
    EventManager.Add(el, 'click', reloadOtherFrame);
    node({tag: 'hr', style: {clear: 'both'}, append: document.body});
    var el = document.createTextNode('Fleet id:');
    el.title = "Enter fleet to use. Click a fleet on the right panel to use that fleet (if inputs aren't locked)";
    document.body.appendChild(el);
    node({tag: 'br', append: document.body});
    scoutFleetIdInput = node({tag: 'input', size: '8', title: "Enter fleet to use. Click a fleet on the right panel to use that fleet (if inputs aren't locked)", 
      append: document.body});
    var el = node({tag: 'a', href: 'javascript:void(1);', text: ' fleet> ', title: "Go to fleet view.", append: document.body});
    EventManager.Add(el, 'click', loadScoutInOtherFrame);
    var el = document.createTextNode('Waypoints:');
    el.title = "Click target icons on the right pane to add to list. Mark first waypoint to visit with a star.";
    document.body.appendChild(el);
    scoutWaypointsInput = node({tag: 'textarea', style: {width: '100%', height: '223px'}, 
      title: "Click target icons on the right to add to list or edit directly. Mark first loc to visit with a *", append: document.body});
    scoutStartScoutingBtns = node({tag: 'div', style: {whiteSpace: 'nowrap'}});
    scoutEditScoutingBtn = createLink(0,'Edit Details',autoScoutEdit);
    scoutEditScoutingBtn.style.display='none';
    scoutEditScoutingBtn.title = "Inputs are currently locked to avoid getting messed up.";
    scoutStartScoutingBtns.appendChild(scoutEditScoutingBtn);
    scoutLockScoutingBtn = createLink(0,'Lock Details',autoScoutLock);
    scoutLockScoutingBtn.style.display='block';
    scoutLockScoutingBtn.title = "Lock the inputs so the route doesn't get messed up.";
    scoutStartScoutingBtns.appendChild(scoutLockScoutingBtn);
    node({tag: 'br', append: scoutStartScoutingBtns});
    var el = node({tag: 'a', href: 'javascript:void(1);', text: 'Reverse list',
      title: "Reverse the order of the waypoints so the scout starts at the end and moves backwards.", append: scoutStartScoutingBtns});
    EventManager.Add(el, 'click', autoScoutReverseWaypoints);
    node({tag: 'br', append: scoutStartScoutingBtns});
    var el = node({append: scoutStartScoutingBtns});
    var el = node({tag: 'select', id: 'scout scan type', title: "Select the scan type to use. Scout will scan the region at each waypoint.", append: el});
    node({tag: 'option', value: "startBaseRegionScanners", title: "Scans all bases in the region.Records Full base details.", text: 'normal scan', append: el});
    node({tag: 'option', value: "startFleetRegionScanners", title: "As normal scan. Also lists all fleets in the region.", text: 'fleet scan', append: el});
    node({tag: 'option', value: "startAstroRegionScanners", title: "As normal scan. Also lists the stats of all empty astros.", text: 'astro scan', append: el});
    node({tag: 'option', value: "startQuickScanners", title: "Quick scan recording all bases. Does not record base details.", text: 'quick scan', append: el});
    node({tag: 'option', value: "startDebrisScanners", title: "As quick scan. Lists all debris in region.", text: 'debris scan', append: el});
    node({tag: 'br', append: scoutStartScoutingBtns});
    var el = node({append: scoutStartScoutingBtns});
    var el = node({tag: 'select', id: 'scan age threshold', title: "Skip regions that were scanned recently.", append: el});
    node({tag: 'option', value: "0", title: "Scan all regions regardless of when they were last scanned", text: 'scan all', append: el});
    node({tag: 'option', value: "43200", text: 'skip age < 12h', append: el});
    node({tag: 'option', value: "86400", text: 'skip age < 24h', append: el});
    node({tag: 'option', value: "129600", text: 'skip age < 36h', append: el});
    node({tag: 'option', value: "172800", text: 'skip age < 48h', append: el});
    node({tag: 'option', value: "345600", text: 'skip age < 4d', selected: 'selected', append: el});
    node({tag: 'option', value: "604800", text: 'skip age < 7d', append: el});
    node({tag: 'option', value: "864000", text: 'skip age < 10d', append: el});
    node({tag: 'option', value: "1209600", text: 'skip age < 14d', append: el});
    node({tag: 'br', append: scoutStartScoutingBtns});
    var wrap = node({id: 'always nearest wrap', style: {display: 'block'}, append: scoutStartScoutingBtns});
    node({tag: 'input', type: 'checkbox', id: 'always nearest', title: "Scout will always go to the closest waypoint that hasn't been scanned recently.",
      append: wrap});
    node({tag: 'label', htmlFor: 'always nearest', title: "Scout will always go to the closest waypoint that hasn't been scanned recently.", text: 'always nearest',
      append: wrap});
    var wrap = node({id: 'start at nearest wp wrap', style: {display: 'block'}, append: scoutStartScoutingBtns});
    node({tag: 'input', type: 'checkbox', id: 'start at nearest wp', title: "Scout will find the closest waypoint on the route and start there.",
      append: wrap});
    node({tag: 'label', htmlFor: 'start at nearest wp', title: "Scout will find the closest waypoint on the route and start there.", text: 'start nearest',
      append: wrap});
    var wrap = node({id: 'loop waypoints wrap', style: {display: 'block'}, append: scoutStartScoutingBtns});
    node({tag: 'input', type: 'checkbox', id: 'loop waypoints', title: "Sets continuous looping. Scout will go from last waypoint to first waypoint..",
      append: wrap});
    node({tag: 'label', htmlFor: 'loop waypoints', title: "Sets continuous looping. Scout will go from last waypoint to first waypoint..", text: 'loop route',
      append: wrap});
    node({tag: 'br', append: scoutStartScoutingBtns});
    EventManager.Add(node({tag: 'a',href: 'javascript:void(1);', text: 'Start Scouting', append: scoutStartScoutingBtns}), 'click', autoScoutBeginScouting);
    node({tag: 'br', append: scoutStartScoutingBtns});
    scoutStartScoutingBtns.style.display='block';
    document.body.appendChild(scoutStartScoutingBtns);
    EventManager.Add($("scan age threshold"), 'change', autoScoutUpdateLastScanTimes);
    EventManager.Add($('scan age threshold'), 'change',autoScoutUpdateInputOptions);
    EventManager.Add($('start at nearest wp'), 'click',autoScoutUpdateInputOptions);
    EventManager.Add($('always nearest'), 'click',autoScoutUpdateInputOptions);
    EventManager.Add($('loop waypoints'), 'click',autoScoutUpdateInputOptions);
    scoutPauseScoutingBtns = document.createElement('div');
    EventManager.Add(node({tag: 'a', href: 'javascript:void(1);', text: 'Pause Scouting', append: scoutPauseScoutingBtns}), 'click', autoScoutPauseScouting);
    node({tag: 'hr', append: scoutStartScoutingBtns});
    node({id: 'scouting status', style: {border: '1px solid green', background: '#003300', padding: '2px 4px', color: 'lime'}, append: scoutPauseScoutingBtns});
    scoutPauseScoutingBtns.style.display='none';
    document.body.appendChild(scoutPauseScoutingBtns);
    node({tag: 'hr', append: scoutStartScoutingBtns});
    scoutDebugPane = node({append: document.body});
    node({tag: 'textarea', id: gmprefix+'evalOnScoutFrame', style: {display: 'none'}, append: document.body});
    node({tag: 'textarea', id: gmprefix+'evalOnMainFrame', style: {display: 'none'}, text: '', append: document.body});
    setInterval(pollActionsFromMainFrame, 100);
    EventManager.Add(scoutWaypointsInput, 'change', autoScoutUpdateReportMap);
    setInterval(autoScoutUpdateLastScanTimes, 1000*60*60);
    var vals = window.name.split('#');
    var fleetid = '';
    if (vals.length == 3) {
      scoutFleetIdInput.value = vals[1];
      $('scan age threshold').value = vals[2];
      $('always nearest').checked = 'checked';
      autoScoutBeginScouting();
    }
    if (vals.length >= 8) {
      scoutFleetIdInput.value = vals[1];
      $('scan age threshold').value = vals[2];
      $('always nearest').checked = 'checked';
      $('scout scan type').value = vals[3];
      scoutQuarter0 = vals[4];
      scoutQuarter1 = vals[5];
      scoutQuarter2 = vals[6];
      scoutQuarter3 = vals[7];
      if (vals.length == 10) {
        $('always nearest').checked = vals[8];
        scoutWaypointsInput.value = decodeURIComponent(vals[9]).replace(/,/g,'\n');
      }
      EventManager.Add(window, 'beforeunload', scoutFrameWindowCloseConfirmCallback, 0);
      autoScoutBeginScouting();
    }
  }
}
function clearMainFrameCalls() {
  try {
    $(gmprefix+'evalOnMainFrame').value = '';
  } catch(e) {}	
}
function callOnMainFrame(str) {
  try {
    $(gmprefix+'evalOnMainFrame').value += str+'\n';
  } catch(e) {}	
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	BASE_ENHANCEMENTS
//////////////////////////////////////////////////////////////////////////////////////////
var activeselectregistry = new Array();
var numactiveselects = 0;
function ActiveSelect(form) {
	this.id = numactiveselects++;
	activeselectregistry.push(this);
	this.form = form;
	this.el_select = 0;
	this.options = 0;
	this.iter_options = -1;
	for (var i=0; i<form.elements.length; i++) {
		if (form.elements[i].options) {
			this.el_select = form.elements[i];
			this.options = form.elements[i].options;
		}	
	}
}
function highlightParentRowGray() {
	this.parentNode.parentNode.style.background = '#050505';
}
function highlightParentRowBlue() {
	this.parentNode.parentNode.style.background = '#001133';
}
function highlightParentRowGreen() {
	this.parentNode.parentNode.style.background = '#003311';
}
function highlightParentRowRed() {
	this.parentNode.parentNode.style.background = '#663311';
}
function highlightParentRowOrange() {
	this.parentNode.parentNode.style.background = '#666611';
}
function leaveParentRow() {
	this.parentNode.parentNode.style.background = '';
}
function productionButtonOnClick() {
	var el = this.previousSibling;
	while (el && el.nodeName.toLowerCase() != 'input')
		el = el.previousSibling;
	if (el) {
		el.value = (parseInt(el.value) + parseInt(this.name)); 
		calculateProductionTotals();
	}
}
function productionButtonSetActive(l, credits_left) {
      	var cost = parseInt(l.title.replace(' credits',''));
      	if (credits_left - cost < 0) {
      		l.previousSibling.style.display='inline';
      		l.style.display='none';
      	}
      	else {
      		l.previousSibling.style.display='none';
      		l.style.display='inline';
      	}
}
function calculateProductionTotals() {
  function timeToSecs(t_str) {
    var res = ( /((\d+)h|) ?((\d+)m|) ?((\d+)s|)?/i.exec(t_str) );
    var h = res[2] ? parseInt(res[2],10) : 0;
    var m = res[4] ? parseInt(res[4],10) : 0;
    var s = res[6] ? parseInt(res[6],10) : 0;
    return (((h*60)+m)*60)+s
  }
  function secsToTime(int_s) {
    var h = Math.floor(int_s / 3600);
    int_s = int_s % 3600;
    var m = Math.floor(int_s / 60);
    m = ((m || h) && m<10) ? '0'+m : m;
    int_s = Math.floor(int_s % 60);
    int_s = (int_s<10) ? '0'+int_s : int_s;
    return (h ? h+'h ':'') + (m ? m+'m ':'') + int_s+'s';
  }
  
	var ptime = 0;
	var pcost = 0;
	for (var nrow=3; nrow<table.childNodes.length-2; nrow+=2) {
		if (table.childNodes[nrow].childNodes[5].firstChild.nodeName=='INPUT') {
			var n = parseInt(table.childNodes[nrow].childNodes[5].firstChild.value);
			if (n) {
				ptime += timeToSecs( table.childNodes[nrow].childNodes[4].firstChild.nodeValue ) * n;
				pcost += parseInt( table.childNodes[nrow].childNodes[2].firstChild.nodeValue ) * n;
			}
		}			
	}
	productiontotals.firstChild.nodeValue = pcost+' credits - '+secsToTime(ptime);
	var credits_left = parseInt(numcredits) - pcost;
	if (credits_left < 0)
		productiontotals.style.color = 'red';
	else
		productiontotals.style.color = '';
		
	for (var i=0; i<productionIncrementButtons.length; i++) {
		productionButtonSetActive(productionIncrementButtons[i], credits_left);
	}
}
var activequeueform = 0;
var activebaseform = 0;
var productiontotals = 0;
function enhanceProductionPage() {
	function clearProductionTotals() {
		productiontotals.firstChild.nodeValue = '0 credits - 00s ';
		productiontotals.style.color = '';
		for (var i=0; i<productionIncrementButtons.length; i++) {
			productionButtonSetActive(productionIncrementButtons[i], parseInt(numcredits));
		}
	}

	table = document.evaluate( "//th[@class='th_header2']/../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var forms = document.getElementsByTagName('form');
	if (table.childNodes.length > 4) {
		for (var i=0; i<forms.length; i++) {
			if (forms[i].action==serverurl+'base.aspx') {
				activebaseform = new ActiveSelect(forms[i]);
				break;
			}
		}
		table.childNodes[0].style.display='none';
		table.childNodes[2].style.display='none';
		for (var nrow=3; nrow<table.childNodes.length; nrow+=2) {
			table.childNodes[nrow+1].style.display='none';
		}
		productiontotals = node({className: 'help', text: '-', style: {cssFloat: 'right', paddingRIght: '4px'}});
		table.childNodes[table.childNodes.length-2].firstChild.insertBefore(productiontotals, table.childNodes[table.childNodes.length-2].firstChild.firstChild);
		table.childNodes[table.childNodes.length-1].style.display='table-row';
		table.childNodes[table.childNodes.length-1].style.textAlign='right';
		EventManager.Add(table.childNodes[table.childNodes.length-1].firstChild.firstChild,'click',clearProductionTotals);
	}
	for (var nrow=3; nrow<table.childNodes.length-2; nrow+=2) {
		table.childNodes[nrow].childNodes[5].style.whiteSpace= 'nowrap';
		var lastcell = table.childNodes[nrow].childNodes[5];
		if (lastcell.firstChild.nodeName != 'INPUT')
			continue;
		var prod_cost = parseInt(lastcell.firstChild.parentNode.previousSibling.previousSibling.previousSibling.firstChild.nodeValue);
		EventManager.Add(lastcell.firstChild,'change',calculateProductionTotals);
		lastcell.firstChild.value = 0;
		var btn_details = [];
		btn_details.push([1,' +1 ',highlightParentRowBlue]);
		btn_details.push([10,' +10 ',highlightParentRowGreen]);
		btn_details.push([100,'+100 ',highlightParentRowRed]);
		btn_details.push([1000,'+1k ',highlightParentRowOrange]);
		for each( items in btn_details ) {
			var num = items[0];
			var lx = createLink(0,items[1],blankCallback);
			var l = createLink(0,items[1],productionButtonOnClick);
			l.name = String(num);
			lx.title = l.title = (num*prod_cost)+' credits';
			lx.className = 'prodIncBtnOff';
			l.className = 'prodIncBtn';
			EventManager.Add(lx,'mouseover',highlightParentRowGreen);
			EventManager.Add(lx,'mouseout',leaveParentRow);
			EventManager.Add(l,'mouseover',items[2]);
			EventManager.Add(l,'mouseout',leaveParentRow);
			table.childNodes[nrow].childNodes[5].appendChild(lx);
			lx.style.display='none';
			table.childNodes[nrow].childNodes[5].appendChild(l);
			productionIncrementButtons.push(l);
		}
		calculateProductionTotals();
	}
}
function enhanceConstructionPage() {
	table = document.evaluate( "//th[@class='th_header2']/../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var i_lastcolumn = 5;
	var forms = document.getElementsByTagName('form');
	for (var i=0; i<forms.length; i++) {
		if (forms[i].action==serverurl+'base.aspx') {
			activebaseform = new ActiveSelect(forms[i]);
		} else if (forms[i].action.indexOf("view=structures")!=-1 || forms[i].action.indexOf("view=defenses")!=-1) {
			activequeueform = new ActiveSelect(forms[i]);
		} else if (forms[i].action.indexOf("view=research")!=-1) {
			activequeueform = new ActiveSelect(forms[i]);
			i_lastcolumn = 3;
		}
	}
	if (table && table.childNodes.length > 4) {
		table.childNodes[0].style.display='none';
		table.childNodes[2].style.display='none';
		for (var nrow=3; nrow<table.childNodes.length; nrow+=2) {
			table.childNodes[nrow+1].style.display='none';
		}
	}
	var energytechmultiplier = 5;
	var fertility = 0;
	var uspopcost = 0;
	var obpopcost = 0;
	var obcostparentnode = 0;
	var popcost = 0;
	var areacost = 0;
	var energycost = 0;
	var bestAreaSignifier = node({tag: 'span', html: ' - (A)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestPopSignifier = node({tag: 'span', html: ' - (P)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	var bestEnergySignifier = node({tag: 'span', html: ' - (E)', style: {fontSize: '7pt', verticalAlign: 'top'}});
	for (var nrow=3; nrow<table.childNodes.length; nrow+=2) {
		var cname = table.childNodes[nrow].childNodes[1].firstChild.firstChild.firstChild.firstChild.nodeValue + table.childNodes[nrow].childNodes[1].firstChild.firstChild.childNodes[1].nodeValue;
		if (location.search.indexOf('view=structures')!=-1) {
			table.childNodes[nrow].title = cname;
			var td1help_res = /Fertility..(\d+).|Metal resource..(\d+).|Crystals resource..(\d+)./.exec(table.childNodes[nrow+1].childNodes[1].firstChild.nodeValue);
			if (td1help_res) {
				var td1help = td1help_res[0].replace(/(.*?)( resource\.|\.).(\d+)./gi," ($1 $3)");
				var d = node({className: 'help', style: {cssFloat: 'right', paddingTop: '5px'}, text: td1help, before: table.childNodes[nrow].childNodes[1].childNodes[0]});
				table.childNodes[nrow].childNodes[1].style.whiteSpace='nowrap';
			}
			if (getState('o_enhanceConstructionValues',0)) {
				if (cname=='Urban Structures') {
					fertility = parseInt(td1help_res[1]);
					uspopcost = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue);
					uspopcost = uspopcost / fertility;
					table.childNodes[nrow].childNodes[2].appendChild(bestPopSignifier);
				}
				if (cname=='Orbital Base') {
					obpopcost = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue) / 10;
					obcostparentnode = table.childNodes[nrow].childNodes[2];
					popcost = uspopcost + (areacost / fertility);
					if (obpopcost && obpopcost < popcost) {
						popcost = obpopcost;
						bestPopSignifier.parentNode.removeChild(bestPopSignifier);
						table.childNodes[nrow].childNodes[2].appendChild(bestPopSignifier);			
					}
				}
				if (cname=='Terraform') {
					areacost = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue) / 5;
					table.childNodes[nrow].childNodes[2].appendChild(bestAreaSignifier);
				}
				if (cname=='Multi-Level Platforms') {
					var cost = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue) / 10;
					if (cost < areacost) {
						areacost = cost;
						bestAreaSignifier.parentNode.removeChild(bestAreaSignifier);
						table.childNodes[nrow].childNodes[2].appendChild(bestAreaSignifier);
					}
				}
				if (cname=='Solar Plants' || cname=='Gas Plants' || cname=='Fusion Plants' || cname=='Antimatter Plants') {
					var c = parseInt(table.childNodes[nrow].childNodes[2].firstChild.nodeValue);
					var e = parseInt(table.childNodes[nrow].childNodes[3].firstChild.nodeValue.slice(1));
					c = (c + popcost + areacost) / (energytechmultiplier*e);
					if (!energycost)
						energycost = c;
					if (c <= energycost) {
						energycost = c;
						if (bestEnergySignifier.parentNode)
							bestEnergySignifier.parentNode.removeChild(bestEnergySignifier);
							table.childNodes[nrow].childNodes[2].appendChild(bestEnergySignifier);
					}
				}
			}
		}
		if (activequeueform) {
			var l = activequeueform.buttonToSelect(cname, 'queue', 0);
			if (l) {
				table.childNodes[nrow].childNodes[i_lastcolumn].appendChild(document.createTextNode(' - '));
				table.childNodes[nrow].childNodes[i_lastcolumn].style.whiteSpace='nowrap';
				EventManager.Add(l,'mouseover',highlightParentRowBlue);
				EventManager.Add(l,'mouseout',leaveParentRow);
				l.style.padding = '5px 0px';
				table.childNodes[nrow].childNodes[i_lastcolumn].appendChild(l);
				if (l.previousSibling.previousSibling && l.previousSibling.previousSibling.style && !l.previousSibling.previousSibling.previousSibling) {
					EventManager.Add(l.previousSibling.previousSibling,'mouseover',highlightParentRowGray);
					EventManager.Add(l.previousSibling.previousSibling,'mouseout',leaveParentRow);
					l.previousSibling.previousSibling.style.padding = '5px 0px';
				}
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	COMBAT_CALC
//////////////////////////////////////////////////////////////////////////////////////////
function addCombatSimulatorLinks() {
	function runCombatSimulator(evt) {
		function createCombatCalcFleet() {
			var fleet = new Array();
				for (var j=0; j<numShipTypes; j++) {
					var slot = new Object();
					slot.type = shipnames[j];
					slot.qt = 0;
					slot.rs = 0;
					slot.pw = 0;
					slot.ar = 0;
					slot.sh = 0;
					slot.baseStats = attackCalcShipTypes[slot.type.replace(' ','_')];
					fleet.push(slot);
				}
			return fleet;
		}
		function battleResults(f0,f1) {
			var r0 = battleResult(f0);
			var r1 = battleResult(f1);
			return 'simulated losses - ( Attacker: '+Math.round(r0[0])+' ; Defender: '+Math.round(r1[0])+' )';
		}
		function battleResult(fleet) {
			var losses = 0;
			var debris = 0;
			for (var i = 0; i < numShipTypes; i++) {
				if (fleet[i].qt && fleet[i].baseStats[1]) {
					losses += Math.round(fleet[i].qt - fleet[i].rs) * fleet[i].baseStats[1];
				}
			}
			return [losses, debris];
		}
		function rsl(fleet) {
				for (var i = 0; i <= 10; i++) {
					fleet[i].rs = Math.ceil(ship_armour_total[i] / fleet[i].ar);
				}
				for (var i = 11; i <= 13; i++) {
					fleet[i].rs = Math.ceil((ship_armour_total[i] / fleet[i].ar) * 10) / 10;
				}
				for (var i = 14; i < numShipTypes; i++) {
					fleet[i].rs = Math.ceil((ship_armour_total[i] / fleet[i].ar) * 100) / 100;
				}
		
		}
		function init_armour(fleet) {
			armour_total = 0;
			for (i=0; i<numShipTypes; i++) {
				ship_armour_total[i] = fleet[i].qt * fleet[i].ar;
				armour_total += ship_armour_total[i];
			}
		}
		function dgt(shiptype, f0, f1, ion) {
			var attack_qty = f0[shiptype].qt;
			var attack_pwr = f0[shiptype].pw;
			var ship_damage = new Array(numShipTypes);
				if (attack_qty != 0) {
				for (var i=0; i<numShipTypes; i++) {
					if (f1[i].sh) {
						if (f1[i].qt != 0) {
							if (f1[i].sh > attack_pwr) {
								 ship_damage[i] = attack_pwr * ion;
							} else {
								 ship_damage[i] = attack_pwr - f1[i].sh + f1[i].sh * ion;
							}
						} else {
							ship_damage[i] = 0;
						}
					} else {
						if (f1[i].qt != 0) {
							ship_damage[i] = attack_pwr;
						} else {
							ship_damage[i] = 0;
						}
					}
				}
				var catt = attack_qty;
				for (var repeat = 0; repeat < 5; repeat++) {
					if (armour_total > 0) {
						armour_total = 0;
						var ship_damage_u = new Array(numShipTypes);
						var total_damage = 0;
						for (var i=0; i<numShipTypes; i++)
							total_damage += ship_damage[i];
						for (var i=0; i<numShipTypes; i++) {
							ship_damage_u[i] = 0;
							if (ship_damage[i] != 0 || f1[i].qt != 0) {
								ship_damage_u[i] = (ship_damage[i] * catt) / total_damage;
							}
							ship_armour_total[i] -= ship_damage_u[i] * ship_damage[i];
							armour_total += ship_armour_total[i];
						}
						var ship_damage_u2 = new Array(numShipTypes);
						for (var i=0; i<numShipTypes; i++) {
							if (ship_armour_total[i] < 0) {
								ship_damage_u2[i] = ((ship_damage[i] * ship_damage_u[i]) + ship_armour_total[i]) / ship_damage[i];
							} else {
								ship_damage_u2[i] = ship_damage_u[i];
							}
						}
						var cn = 0;
						for (var i = 0; i < numShipTypes; i++) {
							if (ship_armour_total[i] < 0) {
								cn++;
							}
						}
						var car = 0;
						if (repeat == 0) {
							car = 1 - 0.06 * cn;
						}
						armour_total = 0;
						for (var i = 0; i < numShipTypes; i++) {
							catt -= ship_damage_u2[i]
							if (ship_armour_total[i] < 0) {
								ship_damage[i] = 0;
								ship_damage_u2[i] = 0;
								ship_armour_total[i] = 0;
							}
							armour_total += ship_armour_total[i];
						}
						catt = catt * car;
					}
				}
			} else {
				for (var i = 0; i <= numShipTypes; i++) {
					ship_damage[i] = 0;
				}
			}
		}
		function simulateCombat(f0, f1) {
				init_armour(f0);
				for (var i = 0; i < numShipTypes; i++) {
					if (i==3 || i==8)
						dgt(i, f1, f0, 0.5);
					else
						dgt(i, f1, f0, 0.01);
				}
				rsl(f0);
				init_armour(f1);
				for (var i = 0; i < numShipTypes; i++) {
					if (i==3 || i==8)
						dgt(i, f0, f1, 0.5);
					else
						dgt(i, f0, f1, 0.01);
				}
				rsl(f1);
		}
	
		var t = this.parentNode.previousSibling;
		var t2 = this.parentNode.nextSibling;
		var fleet0 = createCombatCalcFleet(); 
		var fleet1 = createCombatCalcFleet();
		for (var i=2; i<t.firstChild.childNodes.length; i++) {
			var shiptype = t.firstChild.childNodes[i].firstChild.firstChild.nodeValue;
			var ship = fleet0[attackCalcShipTypes[shiptype.replace(' ','_')][0]];
			ship.qt = parseFloat(t.firstChild.childNodes[i].childNodes[1].firstChild.nodeValue);
			ship.pw = parseFloat(t.firstChild.childNodes[i].childNodes[3].firstChild.nodeValue);
			ship.ar = parseFloat(t.firstChild.childNodes[i].childNodes[4].firstChild.nodeValue);
			ship.sh = parseFloat(t.firstChild.childNodes[i].childNodes[5].firstChild.nodeValue);
		}
		for (var i=2; i<t2.firstChild.childNodes.length; i++) {
			var shiptype = t2.firstChild.childNodes[i].firstChild.firstChild.nodeValue;
			var ship = fleet1[attackCalcShipTypes[shiptype.replace(' ','_')][0]];
			ship.qt = parseFloat(t2.firstChild.childNodes[i].childNodes[1].firstChild.nodeValue);
			ship.pw = parseFloat(t2.firstChild.childNodes[i].childNodes[3].firstChild.nodeValue);
			ship.ar = parseFloat(t2.firstChild.childNodes[i].childNodes[4].firstChild.nodeValue);
			ship.sh = parseFloat(t2.firstChild.childNodes[i].childNodes[5].firstChild.nodeValue);
		}
		simulateCombat(fleet0,fleet1);
		for (var i=2; i<t.firstChild.childNodes.length; i++) {
			var shiptype = t.firstChild.childNodes[i].firstChild.firstChild.nodeValue;
			var ship = fleet0[attackCalcShipTypes[shiptype.replace(' ','_')][0]];
			var span = node({tag: 'span', html: ship.rs, style: {color: '#7722EE'}});
			if (t.firstChild.childNodes[i].childNodes[2].firstChild.nodeValue=='?')
				t.firstChild.childNodes[i].childNodes[2].removeChild(t.firstChild.childNodes[i].childNodes[2].firstChild);
			t.firstChild.childNodes[i].childNodes[2].appendChild(document.createTextNode(' '));
			t.firstChild.childNodes[i].childNodes[2].appendChild(span);
		}
		for (var i=2; i<t2.firstChild.childNodes.length; i++) {
			var shiptype = t2.firstChild.childNodes[i].firstChild.firstChild.nodeValue;
			var ship = fleet1[attackCalcShipTypes[shiptype.replace(' ','_')][0]];
			var span = node({tag: 'span', html: ship.rs, style: {color: '#7722EE'}});
			if (t2.firstChild.childNodes[i].childNodes[2].firstChild.nodeValue=='?')
				t2.firstChild.childNodes[i].childNodes[2].removeChild(t2.firstChild.childNodes[i].childNodes[2].firstChild);
			t2.firstChild.childNodes[i].childNodes[2].appendChild(document.createTextNode(' '));
			t2.firstChild.childNodes[i].childNodes[2].appendChild(span);
		}
		this.parentNode.className = 'help';
		this.parentNode.appendChild(document.createTextNode(battleResults(fleet0,fleet1)));
		this.parentNode.removeChild(this);   	
	}

	var tables = document.getElementsByTagName('table');
	for (var j=0; j<tables.length; j++) {
		var t = tables[j];
		if (t.firstChild.firstChild && t.firstChild.firstChild.firstChild && t.firstChild.firstChild.firstChild.firstChild && t.firstChild.firstChild.firstChild.firstChild.nodeValue=='Attack Force') {
			var t2 = t.nextSibling.nextSibling;
			if (t2.firstChild.firstChild && t2.firstChild.firstChild.firstChild && t2.firstChild.firstChild.firstChild.firstChild && t2.firstChild.firstChild.firstChild.firstChild.nodeValue=='Defensive Force') {
				if (getState('o_autoCombatSimulator',0) && location.href.indexOf('fleet')!=-1) {
					var d = node({text: '-', style: {color: '#7722EE', textAlign: 'center'}, before: t2});
					t.parentNode.removeChild(t.nextSibling);
					(runCombatSimulator.bind(d.firstChild))(null);
				} else if (getState('o_combatSimulator',0)) {
					var d = node({style: {color: '#7777CC', textAlign: 'center'}, before: t2});
					var l = node({tag: 'a', href: 'javascript:void(1);', text: '[simulator]', style: {color: 'red', fontWeight: 'bold'}, append: d});
					EventManager.Add(l, 'click', runCombatSimulator);
					t.parentNode.removeChild(t.nextSibling);
				}
				if (pagetype == 'messages' && t.parentNode.firstChild.innerHTML != "Forward Battle Report") {
					var d = node({style: {color: '#7777CC', textAlign: 'center'}, before: t});
					var l = node({tag: 'a', href: 'javascript:void(1);', text: '[save report]', style: {color: 'red', fontWeight: 'bold'}, append: d});
					EventManager.Add(l, 'click', saveCombatReport);
					d.parentNode.removeChild(d.previousSibling);
				} 
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	ENHANCE_LINKS
//////////////////////////////////////////////////////////////////////////////////////////
function filterLinks() {
	var scoutsystemdata = '';
	var scoutregiondata = '';
	var links_iter = document.getElementsByTagName('a');
	for (var i=0; i<links_iter.length; i++) {
		var link=links_iter[i];
		var res = linktype_re.exec(link.href);
		if (res) {
			if (res[3]) {
				if (res[3]=='loc') {
					if (parseInt(res[4].slice(1,2))+1 > num_gal_groups) {
						num_gal_groups = parseInt(res[4].slice(1,2))+1;
						setState('num_gal_groups',num_gal_groups);
					}
					if (res[4].length==3) {
						link.href = serverurl+'fleet.aspx?gal='+res[4];
						continue;
					}
					if (res[4].length==12) {
						var astrotype = '';
						astrolinks.push([link,res[4]]);
						if (link.firstChild.nodeName=='IMG') {
							if (link.firstChild.title.indexOf('Gas Giant')!=-1 || link.firstChild.title.indexOf('Asteroid Belt')!=-1)
								continue;
							astrotype = link.firstChild.title;
							link.firstChild.id = res[4];
							link.firstChild.title='';
							if (pagetype=='mapSystem' && isscoutframechild) {
								if (!(link.nextSibling && link.nextSibling.nodeName=='DIV' && link.nextSibling.firstChild && link.nextSibling.firstChild.nodeName=='A' && link.nextSibling.firstChild.style.textDecoration=='underline')) {
									if (scoutsystemdata) scoutsystemdata+=",";
									scoutsystemdata+=res[4];
								}
							}
						}
						validastrolinks.push([link,res[4]]);
						EventManager.Add(link, 'mouseover', loadBasePopup);
						EventManager.Add(link, 'mouseout', popupOnMouseOut);
						scannableastrolinks.push([link,res[4],astrotype]);
						link.title='';
						continue;
					}
					if (res[4].length==9) {
						systemlinks.push([link,res[4]]);
						systemlocs.push(res[4]);
						if (pagetype=='mapRegion' && isscoutframechild) {
							if (scoutregiondata) scoutregiondata+=",";
							scoutregiondata+=res[4];
						}						
						EventManager.Add(link, 'mouseover', loadSystemPopup);
						EventManager.Add(link, 'mouseout', popupOnMouseOut);
						link.title='';
						continue;
					}
				} else if (res[3]=='base') {
					link.parentNode.style.zIndex = String(zIndexes['baseparent']+i);
					baselinks.push([link,res[4]]);
					link.parentNode.style.zIndex=String(250000+i);
            if (pagetype != "baseBuildQueue") {
              EventManager.Add(link, 'mouseover', loadNameBasePopup);
              EventManager.Add(link, 'mouseout', popupOnMouseOut);
              if ((getState('o_productionHelper',0))&&(pagetype == 'empire')) {
                var id = link.href.substring(link.href.indexOf("=",0)+1, link.href.length);
                empireLinks.push(id, link.innerHTML);
              }
            }
					continue;
				} else if (res[3]=='fleet') {
					link.parentNode.style.zIndex = String(zIndexes['fleetparent']+i);

					link.name=link.href;
					EventManager.Add(link, 'mouseover', fleetDetailsOnMouseOver);
					EventManager.Add(link, 'mouseout', popupOnMouseOut);
					if (link.parentNode.previousSibling && link.firstChild.nodeValue && link.firstChild.nodeValue.match(/^\d+$/)) {
						continue;
					}
					else fleetlinks.push([link,res[4]]);
					continue;
				} else if (res[3]=='player') {
					if (myuserid && res[4]==myuserid && pagetype!='board' && pagetype!='messages') {
						var name=link.firstChild.nodeValue.replace(/\[.*?\] */,"");
						setState('playername', name);
					}
					link.title='';
          EventManager.Add(link, 'mouseover', playerDetailsOnMouseOver);
          EventManager.Add(link, 'mouseout', popupOnMouseOut);
					continue;
				} else if (res[3]=='guild') {
					if (getState('o_popupGuildInfo',0))
						EventManager.Add(link, 'mouseover', guildDetailsOnMouseOver);
          EventManager.Add(link, 'mouseout', popupOnMouseOut);
					continue;
				}
			} else if (res[1]=='board.aspx' && boardlink==0) {
				boardlink = link;
				continue;
			} else if (res[1]=='messages.aspx' && messageslink==0) {
				messageslink = link;
				continue;
			} else if (res[1]=='account.aspx') {
				myuserid = link.parentNode.nextSibling.firstChild.nodeValue.slice(2);
				setState('userid', myuserid);
				continue;
			} else if (res[1]=='credits.aspx') {
				try {
					numcredits = link.parentNode.nextSibling.firstChild.nodeValue;
				} catch (e) {}
			}
		} else {
			if (link.href.indexOf("javascript(void:searchPlayer"!=-1)) {
				link.title='';
        if (link.parentNode && link.parentNode.title)
          link.parentNode.title='';
        EventManager.Add(link, 'mouseover', playerSearchOnMouseOver);
        EventManager.Add(link, 'mouseout', popupOnMouseOut);
     	}
      if (link.href.indexOf("&view=structures") !=-1) {
        if (pagetype != "baseBuildQueue") {;
           EventManager.Add(link, 'mouseover', structuresQueueOnMouseOver);
           EventManager.Add(link, 'mouseout', popupOnMouseOut);
         }
      }
      if (link.href.indexOf("&view=production") !=-1) {
        if (pagetype != "baseBuildQueue") {;
           EventManager.Add(link, 'mouseover', productionQueueOnMouseOver);
           EventManager.Add(link, 'mouseout', popupOnMouseOut);
         }
      }
      if (link.href.indexOf("&view=research") !=-1) {
        if (pagetype != "baseBuildQueue") {;
           EventManager.Add(link, 'mouseover', researchQueueOnMouseOver);
           EventManager.Add(link, 'mouseout', popupOnMouseOut);
         }
      }
		}	
		otherLinks.push(link);	
	}
	if (isscoutframechild) {
		if (pagetype=='mapRegion')
			callOnScoutFrame("autoScoutRegionData('"+scoutregiondata+"');");
		if (pagetype=='mapSystem') 
			callOnScoutFrame("autoScoutSystemData('"+scoutsystemdata+"');");
	}
}
function highlightFleet(fleetid) {
	var n=0;
	for (var i=0; i<fleetlinks.length; i++) {
		if (fleetlinks[i][1]==fleetid) {
			if (n==0)
				fleetlinks[i][0].style.border='1px solid #FF33FF';
			if (n==3) {
				fleetlinks[i][0].style.background='#FF00FF';
				fleetlinks[i][0].firstChild.style.visibility='hidden';
			}
			n++;
		} else {
			fleetlinks[i][0].style.border='';
			fleetlinks[i][0].style.background='';
			if (n==3) {
				fleetlinks[i][0].firstChild.style.visibility='visible';
			}
		}
	}
}
function enhanceLinks() {
	for (var i=0; i<validastrolinks.length; i++) {
		var link=validastrolinks[i][0];
		var loc =validastrolinks[i][1];
    var newlink = createImageLink(0, img_target, clickDestination);
    newlink.name = loc;
		newlink.title='Save Dest';
    if (getState('easyMoveDestination','')==newlink.name) {
      newlink.style.backgroundColor = '#6666FF';
		}
    newlink.className='saveDest';
		EventManager.Add(newlink, 'dblclick', doubleClickSaveDest);
    if (pagetype=='units' || pagetype=='fleets' || pagetype=='mapGalaxy')
			link.parentNode.style.whiteSpace="nowrap";
    if (pagetype=='mapSystem') {
      if (link.childNodes[0].nodeName.toLowerCase()=='img') {
        newlink.style.position='absolute';
        var top = link.childNodes[0].style.top;
        newlink.style.top = String(parseInt(top.slice(0,top.length-2))-10)+'px';
        newlink.style.left = link.childNodes[0].style.left;
        newlink.style.zIndex = String(zIndexes['systemtarget']+i);
        link.parentNode.appendChild(newlink);
      }
    }	else
      link.parentNode.insertBefore(newlink,link);
	}
	var lcount;
	if (pagetype=='mapGalaxy') {
		for (var i=0; i<baselinks.length; i++) {
			link = baselinks[i][0];
			if (link.parentNode && link.parentNode.style && link.parentNode.style.position=='absolute') {
        var top = link.parentNode.style.top;
        var left = link.parentNode.style.left;
        var newlink = node({tag: 'a', href: link.href, append: link.parentNode.parentNode, style: {position: 'absolute', zIndex: String(zIndexes['basetarget']+i),
          top: String(parseInt(top.slice(0,top.length-2))-2)+'px', left: String(parseInt(left.slice(0,left.length-2))-12) +'px'}});
        node({tag: 'img', src: img_target, append: newlink});
        EventManager.Add(newlink, 'click', clickBaseMove);
        if (getState('easyMoveToBase','')==newlink.name)
          newlink.style.backgroundColor = '#6666FF';
			}			
		}
	}
	for (var i=0; i<fleetlinks.length; i++) {
		lcount=0;
		for (var j=0; j<fleetlinks.length; j++) {
			if (fleetlinks[j][0].href==fleetlinks[i][0].href)
				lcount++;
		}
		if (lcount>2)
			continue;
		var link=fleetlinks[i][0];
		var fleetid =fleetlinks[i][1];
		var newlink;
    newlink = createImageLink(0, img_arrow, clickFleetMove);
    newlink.name=link.href.replace('&view=move','');
    EventManager.Add(newlink, 'mouseover', fleetDetailsOnMouseOver);
    EventManager.Add(newlink, 'mouseout', popupOnMouseOut);
    newlink.style.zIndex = String(zIndexes['fleetmove']+i);
    if (newlink.name == getState('easyMoveFleetLink',''))
      newlink.style.backgroundColor = '#6666FF';
		newlink.className='fleetMove';
		link.style.paddingLeft='3px';
    if (pagetype=='units' || pagetype=='fleets' || pagetype=='mapGalaxy')
			link.parentNode.style.whiteSpace="nowrap";
		link.parentNode.insertBefore(newlink, link.nextSibling);
		EventManager.Add(newlink, 'dblclick', doubleClickFleetMove);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	FLEET_ACTION_ENHANCEMENTS
//////////////////////////////////////////////////////////////////////////////////////////
function myMaxQuant() {	maxquant(this.title); }
function myUpdate() { update(this.title); }
function myFillHangar() { fill_hangar(this.title); }
function maxQuantAll() {
	var units = $('units').value.split(',');
	for (var i=0; i<units.length; i++) {
		maxquant(units[i]);
	}
}
function maxQuantAllNonCombatants() {
	var units = $('units').value.split(',');
	for (var i=0; i<units.length; i++) {
		if (units[i]=='Recycler' || units[i]=='Scout Ship' || units[i]=='Carrier' || units[i]=='Fleet Carrier')
			maxquant(units[i]);
	}
}
function maxquant(id) {
    $("quant" +id).value = Number($('avail' +id).innerHTML);
	update(id);
}
function zeroAll() {
	var units = $('units').value.split(',');
	for (var i=0; i<units.length; i++) {
		zero(units[i]);
	}
}
function saveMovementDetails() {
	if ($('units') && $('destination')) {
		setState('fleetactions_destination', $('destination').value);
		if ($('units')) {
			var units = $('units').value.split(',');
			for (var i=0; i<units.length; i++) {
				if (units[i] && $("quant" +units[i])) {
					setState('fleetactions_movementunits'+units[i], $("quant"+units[i]).value);
				}
			}
		}
	}
}
function enhanceFleetPage() {
  var isownfleet = 0;
  var ownfleets = new Array();
  var res = /\?fleet=(\d+)((&action|&view)=([^&]+)|)/.exec(location.search);
  fleetidhere = res[1];
  fleetlinkhere = serverurl+'fleet.aspx?fleet='+fleetidhere;
  var view = res[4] ? res[4] : '';
  if (view == '' || view=='repair_all' || view=='repair' || view=='recall') {
    var tables = document.getElementsByTagName('table');
    for (var i=0; i<tables.length; i++) {
      if (tables[i].firstChild && tables[i].firstChild.nodeName.toLowerCase()=='form' && tables[i].firstChild.elements[0].name=='fleet') {
        isownfleet = 1;
        var options = tables[i].firstChild.elements[0].options;
        for (var fi=0; fi<options.length; fi++)
          ownfleets.push(options[fi].value);
        fleetlocationlink = tables[i].childNodes[1].childNodes[1].firstChild.firstChild.href;
        var l = createImageLink(0,img_eye,fleetWatchHere);
        l.name = fleetlocationlink;
        l.className='saveDest';
        l.title='watch fleets at this location';
        tables[i].childNodes[1].childNodes[1].firstChild.appendChild(l);
        var desttd = tables[i].childNodes[1].childNodes[1].childNodes[1];
        if (desttd.firstChild && desttd.firstChild.href) {
          fleetlocationlink = tables[i].childNodes[1].childNodes[1].childNodes[1].firstChild.href;
          var l = createImageLink(0,img_eye,fleetWatchHere);
          l.name = fleetlocationlink;
          l.className='saveDest';
          l.title='watch fleets at this location';
          tables[i].childNodes[1].childNodes[1].childNodes[1].appendChild(l);
        }
        var res = loc_re.exec(fleetlocationlink);
        fleetlocation = res[1];	
      }
      if (isownfleet && tables[i].firstChild && tables[i].firstChild.firstChild && tables[i].firstChild.firstChild.firstChild && tables[i].firstChild.firstChild.firstChild.childNodes[1] && tables[i].firstChild.firstChild.firstChild.childNodes[1].nodeValue=='VERVIEW') {
        var fleeturl = serverurl+'fleet.aspx?fleet='+fleetidhere;
        var fleetdesc = tables[i];
        var table = node({tag: 'table', align: 'center', before: fleetdesc});
        var tr = node({tag: 'tr', append: table});
        var td0 = node({tag: 'td', style: {verticalAlign: 'top'}, append: tr});
        var td1 = node({tag: 'td', style: {verticalAlign: 'top'}, append: tr});
        var td2 = node({tag: 'td', style: {verticalAlign: 'top'}, append: tr});
        lastfleetmovedpane = td2;
        fleetresponsepane = node({id: 'fleetresponsepane', align: 'center', html: '<hr>', before: table.nextSibling});
        var mb,mr,md;
        mb = node({tag: 'table'});
        mr = node({tag: 'tr', html: '<td></td><td><b>Units</b></td><td colspan="2" style="text-align:right">dest:<input id="destination" class="quant" name="destination" size="12" maxlength="12" value="" type="text"></td>', append: mb});
        md = node({tag: 'td', append: mr});
        var l = createImageLink(0,img_target,loadDest);
        l.className='saveDest';
        l.title = 'use last saved destination (you can use another tab to select it)';
        md.appendChild(l);
        mr = node({tag: 'tr', html: '<td colspan="3"> </td><td align="center">Quantity</td><td>Hangar</td>', append: mb});

        var fleetrows = fleetdesc.firstChild.childNodes;
        var unitlist = '';
        var hangarCapacities={'Fighters':-1,'Bombers':-1,'Heavy Bombers':-2,'Ion Bombers':-2,'Frigate':4,'Ion Frigate':4,'Cruiser':4,'Carrier':60,'Heavy Cruiser':8,'Battleship':40,'Fleet Carrier':400,'Dreadnought':200,'Titan':1000,'Leviathan':4000,'Death Star':10000}	;
        for (var j=2; j<fleetrows.length-1; j++) {
          var name = fleetrows[j].firstChild.firstChild.firstChild.nodeValue;
          var maxquant= fleetrows[j].childNodes[1].firstChild.nodeValue;
          unitlist += unitlist ? ','+name : name;
          mr = node({tag: 'tr', append: mb});
            md = node({tag: 'td', html: '<b>'+name+'</b>', append: mr});
            md = node({tag: 'td', id: 'avail'+name, align: 'center', html: maxquant, append: mr});
            md = node({tag: 'td', align: 'center', style: {fontSize: '7pt'}, append: mr});
            var l = node({tag: 'a', href: 'javascript:void(1);', text: 'max', title: name, append: md});
            EventManager.Add(l, 'click', myMaxQuant);
            if (hangarCapacities[name]) {
              md.appendChild(document.createTextNode('-'));
              var l = createLink(0,'hangar',myFillHangar);
              l.title = name;
              md.appendChild(l);
            }
            md.appendChild(document.createTextNode(' '));
            md = node({tag: 'td', append: mr});
            var l = createLink(0,'[-]',decQuant);
            l.title = name;
            md.appendChild(l);
            var l = createLink(0,'[+]',incQuant);
            l.title = name;
            md.appendChild(l);
            var inp = node({tag:'input', id:'quant'+name, className:'quant', name:'name', title:name, size:'8', maxlength:'10', value:'0', type:'text', append:md});
            EventManager.Add(inp,'change',myUpdate);
            md = node({tag: 'td', id: 'hangar'+name, title: hangarCapacities[name] ? String(hangarCapacities[name]) : '0', align: 'center', append: mr});
        }
        mr = node({tag: 'tr', append: mb});
        md = node({tag: 'td', html: '', append: mr});
        md = node({tag: 'td', html: '', append: mr});
        md = node({tag:'td', align:'center', style:{fontSize:'7pt'}, append: mr});
        md.appendChild(createLink(0,'all',maxQuantAll));
        md.appendChild(document.createTextNode('-'));
        md.appendChild(createLink(0,'none',zeroAll));
        md = node({tag: 'td', align: 'center', style: {fontSize: '7pt'}, append: mr});
        md.appendChild(createLink(0,'non combatants',maxQuantAllNonCombatants));
        md = node({tag: 'td', id: 'totalhangar', align: 'center', html: '0', append: mr});
        mr = node({tag: 'tr', append: mb});
        md = node({tag: 'td', html: '', colSpan: 4, append: mr});
        ml = node({tag: 'label', htmlFor: 'moveonalarm', html: 'Move on alarm :', append: md});
        ml = node({tag: 'input', id: 'moveonalarm', type: 'checkbox', append: md});
        EventManager.Add(ml, 'click', toggleMoveOnAlarm);
        ml = node({tag: 'label', htmlFor: 'hammerrequest', html: 'Repeat 5 times :', append: md});
        ml = node({tag: 'input', id: 'hammerrequest', type: 'checkbox', append: md});
        md = node({tag: 'td', append: mr});
        var inp = node({tag: 'button', id: 'launchmove', className: 'quant', html: ' Move ', append: md});
        EventManager.Add(inp,'click',quickMovement);
        document.body.removeChild(fleetdesc);
        td0.appendChild(fleetdesc);
        fleetdesc.id="fleetdesc";
        mb.style.display="none";
        td0.appendChild(mb);
        mb.id="fleetmove";
        inp = node({tag: 'input', id: 'units', name: 'units', value: unitlist, type: 'hidden', append: td0});
        var div = node({tag: 'center', before: table});
        fleetlistpane = node({tag: 'div'});
        var inp= node({tag: 'input', id: 'fleetwatchthislocation', value: fleetlocation, size: 12, className: 'quant', append: div});
        var l = createLink(0, ' - show fleets ', getFleetList);
        var l = createLink(0, ' ', getFleetList);
        l.id = "showfleetlist_btn";
        div.appendChild(l);
        fleetwatchbar = node({tag: 'span', style: {display: 'none'}});
        var l = createLink(0, ' [x]', closeFleetList);
        l.style.color='red';
        fleetwatchbar.appendChild(l);
        fleetwatchbar.appendChild(createScannerBar());
        div.appendChild(fleetwatchbar);
        div.appendChild(fleetlistpane);
        node({tag: 'br', append: td1});
//        td1.appendChild(createLink(0, 'Repair All', quickRepairAll));
        td1.appendChild(createLink(0, ' ', quickRepairAll));
        node({tag: 'br', append: td1});
//        td1.appendChild(createLink(0, 'Recall',recallActiveFleet));
        td1.appendChild(createLink(0, ' ',recallActiveFleet));
        var d = document.createElement('div');
        td1.appendChild(d);
//        d.innerHTML='<input id="recallonalarm" type="checkbox"><label for="recallonalarm">Recall on alarm</label></input>';
        d.innerHTML=' ';
        node({tag: 'br', append: td1});
        var l=createLink(0, 'Attack Base', warnAttackButtons)
        EventManager.Add(l,'dblclick',quickAttackBase);
        EventManager.Add(l,'mouseout',popupOnMouseOut);
        l.style.color='red';
        td1.appendChild(l);
        node({tag: 'br', append: td1});
//        var l=createLink(0, 'Attack Fleet #', warnAttackButtons)
        var l=createLink(0, ' ', warnAttackButtons)
        EventManager.Add(l,'dblclick',quickAttackFleet);
        EventManager.Add(l,'mouseout',popupOnMouseOut);
        l.style.color='red';
        td1.appendChild(l);
//        var el = node({tag: 'input', id: 'fleetattackfleetid', title: "enter the fleet id or full url of the fleet to attack", size: 5, append: td1});
//        var el = node({tag: 'input', id: 'fleetattackfleetid', title: "enter the fleet id or full url of the fleet to attack", size: 5, append: td1});
//        node({tag: 'br', append: td1});
        td1.appendChild(createLink(fleeturl+'&action=revolt', 'Revolt',0));
        node({tag: 'hr', append: td1});
//        var l = createLink(0, '< Show Movement', toggleFleetMovement);
        var l = createLink(0, ' ', toggleFleetMovement);
        l.id = 'togglefleetmovement_btn';
        td1.appendChild(l);
        node({tag: 'br', append: td1});
        if (getState('last_url', '').replace(/&.*/,'')==location.href.replace(/&.*/,'')) {
//          $('recallonalarm').checked=getState('fleetactions_recallonalarm','');
          $('fleetwatchthislocation').value = getState('fleetaction_'+'fleetwatchthislocation','');
          if ($('fleetwatchthislocation').value=='')
            $('fleetwatchthislocation').value = fleetlocation;
          loadScannerVars();
          if (getState('fleetactions_showingfleets'))
            getFleetList();
          if(getState('fleetactions_showingmovement'))
            toggleFleetMovement();
          $('moveonalarm').checked=getState('fleetactions_moveonalarm','');
          $('hammerrequest').checked=getState('fleetactions_'+'hammerrequest','');
          if (getState('fleetactions_lastfleetmoved_fromurl')==location.href) {
            if (getState('fleetactions_lastfleetmoved')) {
              showLastMovedFleet(getState('fleetactions_lastfleetmoved'), getState('fleetactions_lastfleetmovedhtml'));
            }
          }
					$('destination').value = getState('fleetactions_destination','');
					var units = $('units').value.split(',');
					for (var i=0; i<units.length; i++) {
						if(units[i] && $("quant" +units[i])) {
							$("quant" +units[i]).value = Number(getState('fleetactions_movementunits'+units[i],0));
								update(units[i]);
						}
					}
        }
//        if (unitlist=='Scout Ship' || unitlist=='Corvette') {
//          var html = '<form target="_top" action="'+dbase_url+'dbhelper/scoutframe.php">';
//          html += '<input name="q0" type="hidden" value="'+fleetlocation.slice(0,3)+'">';
//          html += '<select name="q3" id="q3" title="Select the scan type to use.">';
//          html += '<option value="startBaseRegionScanners" title="Scans all bases in the region.Records Full base details.">normal scan</option>';
//          html += '<option value="startFleetRegionScanners" title="As normal scan. Also lists all fleets in the region.">fleet scan</option>';
//          html += '<option value="startAstroRegionScanners" title = "As normal scan. Also lists the stats of all empty astros.">astro scan</option>';
//          html += '<option value="startQuickScanners" title="Quick scan recording all bases. Does not record base details." selected>quick scan</option>';
//          html += '<option value="startDebrisScanners" title="As quick scan. Lists all debris in region.">debris scan</option>';
//          html += '</select>';
//          html += ' all regions in quarters: ';
//          html += ' <table style="background:none;display:inline;border:none;padding:0px;margin:0px;" cellpadding="0" cellspacing="0">'
//          html += '<tr>';
//          html += '<td><input  style="padding:0px;margin:0px;" value="1" type="checkbox" name="q00" checked="checked"></td>';
//          html += '<td><input  style="padding:0px;margin:0px;" value="1" type="checkbox" name="q01" checked="checked"></td>';
//          html += '<tr></tr>';
//          html += '<td><input  style="padding:0px;margin:0px;" value="1" type="checkbox" name="q10" checked="checked"></td>';
//          html += '<td><input style="padding:0px;margin:0px;"  value="1" type="checkbox" name="q11" checked="checked"></td>';
//          html += '</tr>';
//          html += ' </table>' 
//          html += ' of '+fleetlocation.slice(0,3)+' that haven\'t been scanned for ';
//          html += '<input name="noshow" type="hidden" value="">';
//          html += '<input name="q1" type="hidden" value="'+fleetidhere+'">';
//          html += '<select name="q2" id="scan age threshold" title="Skip regions that were scanned recently.">';
//          html += '<option value="'+0+'" title="Scan all regions regardless of when they were last scanned">(scan all)</option>';
//          html += '<option value="'+60*60*12+'" title="">12 hours</option>';
//          html += '<option value="'+60*60*24+'" title="">24 hours</option>';
//          html += '<option value="'+60*60*36+'" title="">36 hours</option>';
//          html += '<option value="'+60*60*48+'" title="">48 hours</option>';
//          html += '<option value="'+60*60*24*4+'" title="">4 days</option>';
//          html += '<option value="'+60*60*24*7+'" title="" selected>7 days</option>';
//          html += '<option value="'+60*60*24*10+'" title="">10 days</option>';
//          html += '<option value="'+60*60*24*14+'" title="">14 days</option>';
//          html += '</select>';
//          html += ' <input type="submit" value="Go">';
//          html += '</form>';
//          displayFleetActionMessage(html);
//          $('q3').value = getState('autoscoutScanType', startQuickScanners);
//          EventManager.Add($('q3'), 'change', function () { setState('autoscoutScanType', this.options[this.selectedIndex].value); });
//          $('scan age threshold').value = getState('autoscoutSkipAge', String(60*60*24*7));
//          EventManager.Add($('scan age threshold'), 'change', function () { setState('autoscoutSkipAge', this.options[this.selectedIndex].value); });
//        }
        t2();
        setInterval(checkFleetListAge,999);
        return;			
      }
    }			
  }	
}
function displayFleetActionMessage(html) {
	var div = node({tag: 'div', html: '<hr>'+html});
	if (fleetresponsepane.firstChild)
		fleetresponsepane.insertBefore(div,fleetresponsepane.firstChild);
	else
		fleetresponsepane.appendChild(div);
}
function toggleMoveOnAlarm() {
  if(this.checked) {
    $("launchmove").disabled = true;
    displayFleetActionMessage("Move on alarm : Activated");
  } else {
    $("launchmove").disabled = false;
    displayFleetActionMessage("Move on alarm : Desactivated");
  }
}
function loadDest() {
	var fleetDest = getState('easyMoveDestination', '');
	if (fleetDest) {
		$('destination').value=fleetDest;
		$('destination').borderColor='red';
	}
}
function warnAttackButtons() {
	var msg = '<span style="color:red;">Double Click to use.<br><br><b>BE VERY CAREFUL!</b><br>There is no confirmation step</span>';
	popup({msg:msg, trackelement:this});
}
function toggleFleetMovement() {
	if ($('fleetmove').style.display=='none') {
		fleetactions_showingmovement = 1;
		$('togglefleetmovement_btn').firstChild.nodeValue = '< Hide Movement';
		$('fleetdesc').style.display='none';
		$('fleetmove').style.display='block';
	}
	else {
		fleetactions_showingmovement = 0;
		$('togglefleetmovement_btn').firstChild.nodeValue = '< Show Movement';
		$('fleetmove').style.display='none';
		$('fleetdesc').style.display='block';
	}
}
function quickRepairAll() {
	GM_xmlhttpRequest({
			method: 'GET',
			url: serverurl+"fleet.aspx?fleet="+fleetidhere+"&action=repair_all",
			onerror: fleetResponseError,
			onload: fleetResponse,
	});
	displayFleetActionMessage('repair order sent..');
}
function quickAttackFleet() {
	var attackingfleetid = this.title;
	if (!attackingfleetid)
		attackingfleetid = $('fleetattackfleetid').value;
	var res = /\?fleet=(\d+)((&action|&view)=([^&]+)|)/.exec(attackingfleetid);
	if (res && res[1])
		attackingfleetid = res[1];
	if (!attackingfleetid) {
		displayFleetActionMessage('first enter the id or url of the fleet you want to attack.');
		return;
	}
	GM_xmlhttpRequest({
			method: 'POST',
			url: serverurl+"combat.aspx?fleet="+fleetidhere+"&attack="+attackingfleetid,
			data: 'form=true',
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onerror: fleetResponseError,
			onload: function (responseDetails) {
				if (!attackingfleetid)
					displayFleetActionMessage('oops.. I forgot the fleet you want to attack (report bug pls)');
				var html = responseDetails.responseText;
				var res = confirm_code_re.exec(html);
				if (!res)
					res = alt_confirmcode_re.exec(html);
				if (!res) {
					displayFleetActionMessage('<span style="color:red;">!!! ERROR.. attack didn\'t happen !!!</span>');
				}
				else {
					displayFleetActionMessage('confirm code sent..');
					GM_xmlhttpRequest({
							method: 'POST',
							url: serverurl+"combat.aspx?fleet="+fleetidhere+"&attack="+attackingfleetid,
							data: 'confirm=true&confirm_code='+res[1],
							onerror: fleetResponseError,
							onload: fleetResponse,
							headers: {'Content-type':'application/x-www-form-urlencoded'}
					});
				}
			}
	});
	displayFleetActionMessage('attack order sent..');
}
function quickMovement() {
	function isMaxQuantSelected() {
		var units = $('units').value.split(',');
		for (var i=0; i<units.length; i++) {
			if (parseInt($("quant"+units[i]).value) < parseInt($("avail"+units[i]).innerHTML))
				return 0;
		}
		return 1;
	}
	function reHammerQuickMovement() {
		var now = (new Date()).getTime();
		if (now - hammeringmovementstart >= 9000)
			cancelHammerQuickMovement();
		else
			quickMovement();
	}
	function cancelHammerQuickMovement() {
		if (hammeringmovementinterval) {
			clearInterval(hammeringmovementinterval);
			hammeringmovementinterval = 0;
		}
	}

	var hammeringmovementinterval = 0;
	var hammeringmovementstart = 0;
	var fleetactions_lastdestination = '';
	if ($('hammerrequest').checked) {
		$('hammerrequest').checked = '';
		hammeringmovementstart = (new Date()).getTime();
		hammeringmovementinterval = setInterval(reHammerQuickMovement,2000);
	}
	if ($('moveonalarm').checked) {
	  return;
  }
	fleetactions_lastdestination = $('destination').value;
	var q = 'units='+$('units').value;
	q += '&back=move';
	q += '&fleet='+fleetidhere;
	q += "&destination="+$('destination').value;
	var units=$('units').value.split(',');
	for (var i=0; i<units.length; i++) {
		q += '&'+units[i]+'='+$('quant'+units[i]).value;
	}
	GM_xmlhttpRequest({
			method: 'POST',
			url: serverurl+"fleet.aspx",
			data: q,
			headers: {'Content-type':'application/x-www-form-urlencoded'},
			onerror: fleetResponseError,
			onload: function (responseDetails) {
				var res = fleetresponsefleetlist_re.exec(responseDetails.responseText);
				var mres = fleetresponsefleetmoved_re.exec(responseDetails.responseText);
				var eres = fleetresponseerror_re.exec(responseDetails.responseText);
				if (eres) {
					displayFleetActionMessage("<span class='red'>"+eres[2]+"</span");
				}
				else {
					if (mres && res) {
						cancelHammerQuickMovement();
						var lines = res[0].split('<tr');
						var fid=0;
						for (var i=0; i<lines.length; i++) {
							var fres = fleetreponsefleetdetails_re.exec(lines[i]);
							if (fres) {
								if (fres[3] == fleetactions_lastdestination) {
									var thisfid = parseInt(fres[1]);
									if (thisfid > fid)
										fid = thisfid;
								}
							}
						}
						if (fid && !isMaxQuantSelected()) {
							var html = "<a href=\""+serverurl+"fleet.aspx?fleet="+fid+"\">Last fleet moved</a><br>"+mres[0].replace(fleetidhere, fid);
							showLastMovedFleet(fid,html);
						}
						zeroAll();
					}	
					fleetResponse(responseDetails);
				}
			}
	});
	displayFleetActionMessage('Movement order sent..');
}
function showLastMovedFleet(fid, details) {
	lastfleetmoved = fid;
	lastfleetmovedpane.align="right";
	lastfleetmovedpane.innerHTML = details;
	var el = createLink(0,'Recall Fleet',recallLastMovedFleet);
	lastfleetmovedpane.appendChild(el);
	lastfleetmovedhtml = details;
	setState('fleetactions_lastfleetmoved_fromurl', location.href);
}
function recallActiveFleet() {
	GM_xmlhttpRequest({
			    method: 'GET',
			    url: serverurl+"fleet.aspx?fleet="+fleetidhere,
			    onerror: fleetResponseError,
			    onload: fleetRecallConfirmation,
			});
	displayFleetActionMessage('Recall order sent..');
}
function fleetRecallConfirmation(responseDetails) {
	var html = responseDetails.responseText;
	var res = confirm_code_re.exec(html);
	if (!res)
		res = alt_confirmcode_re.exec(html);
	if (!res) {
		displayFleetActionMessage('<span style="color:red;">!!! ERROR.. recall didn\'t happen !!!</span>');
	} else {
		displayFleetActionMessage('Confirm code sent..');
		GM_xmlhttpRequest({
				method: 'POST',
				url: serverurl+"fleet.aspx?fleet="+fleetidhere+"&action=recall",
				data: 'confirm_cb=true&confirm=true&confirm_code='+res[1],
				onerror: fleetResponseError,
				onload: fleetResponse,
				headers: {
						'Content-type':'application/x-www-form-urlencoded'
				}
		});
	}	
}
function recallLastMovedFleet() {
	GM_xmlhttpRequest({
			    method: 'GET',
			    url: serverurl+"fleet.aspx?fleet="+lastfleetmoved,
			    onerror: fleetRecallLastMovedResponseError,
			    onload: fleetRecallLastMovedConfirmation,
			});
	node({tag: 'br', append: lastfleetmovedpane});
	lastfleetmovedpane.appendChild(document.createTextNode('recalling...'));
}
function fleetRecallLastMovedConfirmation(responseDetails) {
	var html = responseDetails.responseText;
	var res = confirm_code_re.exec(html);
	if (!res)
		res = alt_confirmcode_re.exec(html);
	if (!res) {
		displayFleetActionMessage('<span style="color:red;">!!! ERROR.. recall didn\'t happen !!!</span>');
	}
	else {
		displayFleetActionMessage('Confirm code sent..');
			GM_xmlhttpRequest({
			    method: 'POST',
			    url: serverurl+"fleet.aspx?fleet="+lastfleetmoved+"&action=recall",
			    data: 'confirm_cb=true&confirm=true&confirm_code='+res[1],
			    onerror: fleetRecallLastMovedResponseError,
			    onload: fleetRecallLastMovedResponse,
			    headers: {'Content-type':'application/x-www-form-urlencoded'}
			});
	}	
}
function fleetRecallLastMovedResponseError(responseDetails) {
	var reponsehtml = "<p color='red'>ERROR: "+responseDetails.status+"</p>";
	reponsehtml += "<p>"+responseDetails.statusText+"</p>";
	reponsehtml += "<p>"+responseDetails.responseText+"</p>";
	var div = node({tag: 'div', html: reponsehtml, append: lastfleetmovedpane});
}
function fleetRecallLastMovedResponse(responseDetails) {
	lastfleetmovedpane.innerHTML = '';
	setState('fleetactions_lastfleetmoved_fromurl', '');
	lastfleetmoved = 0;
	lastfleetmovedhtml = '';
	displayFleetActionMessage('Second fleet recalled..');

	if (fleetactions_showingfleets)
		getFleetList();
}
function quickAttackBase() {
			GM_xmlhttpRequest({
			    method: 'POST',
			    url: serverurl+"combat.aspx?fleet="+fleetidhere+"&attack=base&mission=conquer",
			    data: 'form=true',
			    onerror: fleetResponseError,
			    onload: quickAttackBaseConfirmation,
			    headers: {
			        'Content-type':'application/x-www-form-urlencoded'
			    }
			});
	displayFleetActionMessage('attack order sent..');
}
function quickAttackBaseConfirmation(responseDetails) {
	var html = responseDetails.responseText;
	var res = confirm_code_re.exec(html);
	if (!res)
		res = alt_confirmcode_re.exec(html);
	if (!res) {
		displayFleetActionMessage('<span style="color:red;">!!! ERROR.. attack didn\'t happen !!!</span>');
	} else {
		displayFleetActionMessage('confirm code sent..');
		GM_xmlhttpRequest({
				method: 'POST',
				url: serverurl+"combat.aspx?fleet="+fleetidhere+"&attack=base&mission=conquer",
				data: 'confirm=true&confirm_code='+res[1],
				onerror: fleetResponseError,
				onload: fleetResponse,
				headers: {
						'Content-type':'application/x-www-form-urlencoded'
				}
		});
	}
}
function fleetResponseError(responseDetails) {
	var reponsehtml = "<p color='red'>ERROR: "+responseDetails.status+"</p>";
	reponsehtml += "<p>"+responseDetails.statusText+"</p>";
	reponsehtml += "<p>"+responseDetails.responseText+"</p>";
	displayFleetActionMessage(reponsehtml);
}
function fleetResponse(responseDetails) {
	var html = responseDetails.responseText;
	var res = fleetresponsebody_re.exec(html);
	if (res && res[1]) {
		html = res[1];
		html = html.replace(fleetresponseclean_re,'');
	}
	displayFleetActionMessage(html);
}
function fleetWatchHere() {
	var loc = this.name;
	var res= loc_re.exec(loc);
	$('fleetwatchthislocation').value = res[1];
	getFleetList();
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	FLEET_MOVEMENT_PAGE
//////////////////////////////////////////////////////////////////////////////////////////
function incQuant() {
    var id=this.title;
    if (Number($("quant" +id).value) < Number($('avail' +id).innerHTML))
	    $("quant" +id).value = Number($("quant" +id).value)+1;
    update(this.title);
}
function decQuant() {
    var id=this.title;
    if (Number($("quant" +id).value) > 0)
	    $("quant" +id).value = Number($("quant" +id).value-1);
    update(this.title);
}
function zero(id) {
    $("quant" +id).value = 0;
	update(id);
}
function fastloc(destination) {
    $("destination").value = destination;
    calc_distance();
}
function fill_hangar(id) {
    $("quant" +id).value = 0;
	update(id);
    $("quant" +id).value = Math.ceil(Number($("totalhangar").innerHTML)/(-$("hangar" +id).title));
	update(id);
}
function update(id) {
	var avail=0;
	var hangar=0;
	var size=0;
	var distance=0;
	var quant=0;
	avail=Number($('avail' +id).innerHTML);
	hangar=$("hangar" +id).title;
	if ($("size" +id)) {
		size=$("size" +id).title;
		distance=$("distance").innerHTML;
	}
	if (Number($("quant" +id).value)>avail) $("quant" +id).value=avail;
	if (Number($("quant" +id).value)<0)     $("quant" +id).value=0;
	quant=$("quant" +id).value;
	if (hangar)	{
		$("hangar" +id).innerHTML =  hangar*quant;
		if ($("size" +id))
			$("size" +id).innerHTML =    size*quant;
	}
	totals();
}
function calc_distance() {
	if (!$("start"))
		return;
	var start="";
	var distance=0;
	var s_gal0=""; var sgal1=0; var sgal2=0;
	var s_reg0=0; var s_reg1=0;
	var s_sys0=0; var s_sys1=0;
	var s_ast0=0; var s_ast1=0;
	var t_gal0=""; var t_gal1=0; var t_gal2=0;
	var t_reg0=0; var t_reg1=0;
	var t_sys0=0; var t_sys1=0;
	var t_ast0=0; var t_ast1=0;
	var s_sys_x=0; var s_sys_y=0;
	var t_sys_x=0; var t_sys_y=0;
	var var_gal=0; var var_sys=0; var var_ast0=0;  var var_ast1=0;

	start=$("start").innerHTML;
	s_gal0=String(start.charAt(0));		s_gal1=Number(start.charAt(1));	s_gal2=Number(start.charAt(2));
	s_reg0=Number(start.charAt(4));		s_reg1=Number(start.charAt(5));
	s_sys0=Number(start.charAt(7));		s_sys1=Number(start.charAt(8));
	s_ast0=Number(start.charAt(10));	s_ast1=Number(start.charAt(11));
	t_gal0=String($("destination").value.charAt(0));	t_gal1=Number($("destination").value.charAt(1));	t_gal2=Number($("destination").value.charAt(2));
	t_reg0=Number($("destination").value.charAt(4));	t_reg1=Number($("destination").value.charAt(5));
	t_sys0=Number($("destination").value.charAt(7));	t_sys1=Number($("destination").value.charAt(8));
	t_ast0=Number($("destination").value.charAt(10));	t_ast1=Number($("destination").value.charAt(11));
	s_sys_x=s_reg1*10+s_sys1; s_sys_y=s_reg0*10+s_sys0;
	t_sys_x=t_reg1*10+t_sys1; t_sys_y=t_reg0*10+t_sys0;
	var_gal=Math.abs((s_gal1-t_gal1)*19+s_gal2-t_gal2);
	var_sys=Math.ceil(Math.sqrt(Math.pow(t_sys_x-s_sys_x,2)+Math.pow(t_sys_y-s_sys_y,2)));
	var_ast0=Math.abs(t_ast0-s_ast0);
	var_ast1=Math.abs(t_ast1-s_ast1);
	if (var_gal) {
		if (t_gal1==s_gal1) { distance=var_gal*200; }
		if (t_gal1>s_gal1) { distance=(9-s_gal2)*200+2000+t_gal2*200; }
		if (t_gal1<s_gal1) { distance=s_gal2*200+2000+(9-t_gal2)*200; }
		}
	else
	{	if (var_sys) { distance=var_sys; }
		else
		{	if (var_ast0) { distance=var_ast0/5; }
			else
			{ distance=0.1; }
		}
	}
	$("distance").innerHTML=distance;
	calc_duration();
	totals();
}
function calc_duration(){
	var distance=0;
	var speed=0;

	if ($("distance")) {
		distance=Number($("distance").innerHTML);
		speed=Number($("maxspeed").innerHTML);
		if ((distance>0) && (speed>0)) $("duration").innerHTML=tempo(Math.ceil((distance/speed)*3600));
	}
}
function totals(){
	var units="";
	var max_speed=0;
	var hangar=0;
	var size=0;
	var speed=0;
	units=$("units").value;
	var a=new Array;
	a=units.split(",");
	max_speed=Number.MAX_VALUE;
	for (var i in a) {
		hangar+=	Number($("hangar" +a[i]).innerHTML);
		if ($("size"   +a[i]))
			size+=		Number($("size"   +a[i]).innerHTML);
		if ($("speed" +a[i])) {
			speed=Number($("speed" +a[i]).innerHTML);
			if (speed>0) {
				if ( ($("quant" +a[i]).value>0) && (speed<max_speed) ) max_speed=speed;
			}
		}
	}
	if (max_speed==Number.MAX_VALUE) { max_speed=""; }
	$("totalhangar").innerHTML=hangar;
	if ($("totalsize"))
		$("totalsize").innerHTML=size;
	if ($("maxspeed"))
		$("maxspeed").innerHTML=max_speed;
	if (hangar<0)		$("totalhangar").style.color="red"; 
	if (hangar>=0)		$("totalhangar").style.color="white";
	calc_duration();
}
function tempo(s){
	var m=0;
	var h=0;
	if(s>59) m=Math.floor(s/60); s=s-m*60;
	if(m>59) h=Math.floor(m/60); m=m-h*60;
	if(s<10) s="0"+s;
	if(m<10) m="0"+m;
	if (h>0) return h+"h "+m+"m "+s+"s";
	if (m>0) return m+"m "+s+"s";
			 return s+"s";
}
function moveAll() {
	var moveallcode='';
	for (var i=0; i<otherLinks.length; i++) {
		if (otherLinks[i].firstChild.nodeValue=='all')
			moveallcode=otherLinks[i].href.slice(11);
	}
	onSubmitFleetMovement();
	eval(moveallcode+';document.forms[1].submit();');		
}
function onSubmitFleetMovement() {
	setState('easyMoveFleetLink', location.href.replace('&view=move',''));
	if ($('followMovingFleet') && $('followMovingFleet').checked) {
		setOriginToFollowFleet();
	}
}
function setOriginToFollowFleet() {
	var origin = $('destination').parentNode.previousSibling.firstChild.nodeValue;
	setState('followFleetMovingFrom', origin);
}
function enhanceMovePage() {
	var destinput = $('destination');
	if (destinput) {
		EventManager.Add(document.forms[1],'submit',onSubmitFleetMovement);
		var dest = getState('easyMoveDestination','');
		if (dest) {
			var destinput = $('destination');
			destinput.value = dest;
			destinput.style.borderColor='red';
			setState('easyMoveDestination', '');
			setState('easyMoveToBase', '');
			calc_distance();
		}
		if (pagetype=='fleetMove') {
			var els = document.getElementsByTagName('input');
			var moveSubmit = 0;
			for (var i=0; i<els.length; i++) {
				if (els[i].value=='Move') {
					moveSubmit = els[i];
				}
				if (els[i].className=='quant' && els[i].id.indexOf('quant')!=-1) {
					var newel = createLink(0,'[-] ',decQuant);
					newel.title = els[i].name;
					els[i].parentNode.insertBefore(newel, els[i]);
	
					var newel = createLink(0,'[+]',incQuant);
					newel.title = els[i].name;
					els[i].parentNode.insertBefore(newel, els[i]);
				}
			}
			if (moveSubmit) {
				var viewmovingfleethelp = 'check this to go to the overview page of the fleet after movement';
				var newel = node({html: '<label title="'+viewmovingfleethelp+'" style="font-weight:normal;color:#555555;" for="followMovingFleet">view moving fleet</label><input title="'+viewmovingfleethelp+'" type="checkbox" id="followMovingFleet">', before: moveSubmit});
        newel = createLink(0,'Move All', moveAll);
        moveSubmit.parentNode.insertBefore(newel, moveSubmit);
			}
		}
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	FLEET_WATCH
//////////////////////////////////////////////////////////////////////////////////////////
function t2() {
	var n=0;
	while(1) {
		n++;
		elem=$('insertedtime'+n);
		if (!elem) {
			if (n>1)
				break;
			else
				continue;
		}
		s=elem.title;

		if(s<=0){ elem.innerHTML="-" }
		else elem.innerHTML=secsToClockTime(s);
		elem.title-=1;
	}
	window.setTimeout(t2,999);
}
var fleetwatchbar = 0;
var fleetwatchinterval = 0;
function fleetActionsWatchFleets() {
	fleetActionsCancelWatchFleets();
	if($('fleetwatchpause').value) {
		var timer = parseInt($('fleetwatchpause').value)*1000;
		timer = timer * (0.8 + (0.4*Math.random()));
		if (alarmsounding)
			fleetwatchinterval = setTimeout(fleetActionsWatchFleets, timer);
		else			
			fleetwatchinterval = setTimeout(updateFleetList, timer);
	}
}
function fleetActionsCancelWatchFleets() {
	clearTimeout(fleetwatchinterval);
}
var fleetwatch_incoming = 0;
var fleetwatch_incoming_soon = 0;
var fleetwatch_notification = '';
function fleetActionsCheckAlarm() {
	var filter = $('fleetwatchfilter').value;
	var notfilter = $('notfleetwatchfilter').value;
	if ($('fleetwatchalarm').checked) {
		var threshhold = $('fleetwatchsizethreshhold').value;
		document.title = 'watching..';
		if (fleetwatch_incoming_soon  && (threshhold=='' || threshhold=='0' || fleetwatch_incoming>=parseInt(threshhold))) {
			stopAlarm();
			alarmnotification = fleetwatch_incoming_soon+' fleets';
			if ($('alarmmakenoise')) {
				alarmmakenoise= $('alarmmakenoise').checked;
			}
			$('fleetwatchalarm').checked = '';
			soundAlarm();			
		}
		else {
			if (fleetwatch_incoming) {
				fleetwatch_notification = fleetwatch_incoming+' fleets';
			}
			else {
				if (pagetype=='scanners')
					fleetwatch_notification = '...scanners';
				else
					fleetwatch_notification = '...'+fleetlocation;
			}
			setTimeout(fleetActionsSetNotification,1000);
		}
		fleetwatch_incoming = 0;
		fleetwatch_incoming_soon = 0;
	}
	fleetActionsWatchFleets();
}
function fleetActionsSetNotification() {
	document.title = fleetwatch_notification;
}
function fleetActionsCheckFleet(owner, arrival, size) {
	var filter = $('fleetwatchfilter').value;
	var notfilter = $('notfleetwatchfilter').value;
	if ($('fleetwatchalarm').checked) {
		var twarning = $('fleetwatchwarningtime').value;

		var filteritems = filter.split(',');
		var notfilteritems = notfilter.split(',');
		var isvalid=1;
		if (filteritems) {
			isvalid=0;
			for (var i=0; i<filteritems.length; i++) {
				var res = trim_re.exec(filteritems[i]);
				if (res && res[1] && owner.toLowerCase().indexOf(res[1].toLowerCase())!=-1) {
					isvalid=1;
					break;
				}
			}
		}
		if (notfilteritems && isvalid) {
			for (var i=0; i<notfilteritems.length; i++) {
				var res = trim_re.exec(notfilteritems[i]);
				if (res && res[1] && owner.toLowerCase().indexOf(res[1].toLowerCase())!=-1) {
					isvalid=0;
					break;
				}
			}
		}
		if (isvalid) {
			fleetwatch_incoming += parseInt(size);
			if (twarning=='' || twarning=='0' || parseInt(arrival) <= parseInt(twarning)*60) {
				fleetwatch_incoming_soon += parseInt(size);
			}
		}
	}
}
function updateFleetList() {
	if (pagetype=='scanners') {
    GM_xmlhttpRequest({
        method: 'GET',
        url: serverurl+'empire.aspx?view=scanners',
        onerror: scannerListResponseError,
        onload: scannerListResponse,
    });
    if (scannerpane.firstChild)
      scannerpane.firstChild.firstChild.firstChild.firstChild.innerHTML= 'refreshing fleet list...';
	} else
    getFleetList();
}
function getFleetList() {
	var loc = $('fleetwatchthislocation').value;
	var res= loc_re.exec(loc);
	if (!(res && res[1].length==12)) {
		alert('invalid location');
		return;
	}
  GM_xmlhttpRequest({
      method: 'GET',
      url: serverurl+'map.aspx?loc='+loc,
      onerror: fleetListResponseError,
      onload: fleetListResponse,
  });
	if (fleetactions_showingfleets) {
		fleetlistpane.firstChild.firstChild.firstChild.firstChild.innerHTML= 'refreshing fleet list...';
	}
	else
		fleetlistpane.innerHTML = 'getting fleet list..';
	fleetactions_showingfleets = 1;
	$('showfleetlist_btn').firstChild.nodeValue=' - refresh fleets';
	fleetwatchbar.style.display='inline';
}
function closeFleetList() {
	fleetlistpane.innerHTML = '';
	fleetactions_showingfleets = 0;
	$('showfleetlist_btn').firstChild.nodeValue=fleetlocation+' - show fleets';
	fleetwatchbar.style.display='none';
}
function fleetListResponseError(responseDetails) {
	var reponsehtml = "<p color='red'>ERROR: "+responseDetails.status+"</p>";
	reponsehtml += "<p>"+responseDetails.statusText+"</p>";
	reponsehtml += "<p>"+responseDetails.responseText+"</p>";
	fleetlistpane.innerHTML = reponsehtml;
}
function fleetListResponse(responseDetails) {
	var res = listfleets_re.exec(responseDetails.responseText);
	fleetlisttime = (new Date()).getTime();
	var dres = /\d+ credits in space Debris./.exec(responseDetails.responseText);
	var debris= dres ? '<center>'+dres[0]+'</center>' : '';
	if (res) {
		fleetlistpane.innerHTML = res[0].replace(/time(\d+)/g,'insertedtime$1')+ debris;//.replace(/<th colspan=.4.>Fleets<\/th>/i,'<th colspan="4"></th>');
		var i=0;
		while(1) {
			i++;
			var cd = $('insertedtime'+i);
			if (enhanceCountdown(cd))
				break;
		}
		var tbody = fleetlistpane.firstChild.firstChild;
		tbody.firstChild.firstChild.innerHTML = '(age- <span id="fleetlistage">0:00:00</span>)';
		var th = node({tag: 'th', text: 'Attack', append: tbody.childNodes[1]});
		for (var i=2; i<tbody.childNodes.length; i++) {
			var td = document.createElement('td');
			var fleetlink = tbody.childNodes[i].firstChild.firstChild.href;
			if (fleetlink==fleetlinkhere) {
				td.innerHTML=' ';
				tbody.childNodes[i].style.background = '#002277';
			}
			else {
				var l = createLink(0, 'Attack', warnAttackButtons);
				EventManager.Add(l,'dblclick',quickAttackFleet);
				EventManager.Add(l,'mouseout',popupOnMouseOut);
				l.title = fleetlink;
				l.style.color='red';
				EventManager.Add(l,'mouseover',highlightFleetBar);
				EventManager.Add(l,'mouseout',unHighlightFleetBar);
				td.appendChild(l);
			}
			tbody.childNodes[i].appendChild(td);
			var link = tbody.childNodes[i].childNodes[0].firstChild;
			link.name = link.href;
			EventManager.Add(link, 'mouseover', fleetDetailsOnMouseOver);
			EventManager.Add(link, 'mouseout', popupOnMouseOut);
			var link = tbody.childNodes[i].childNodes[3].firstChild;
			link.name = link.href;
			EventManager.Add(link, 'mouseover', fleetDetailsOnMouseOver);
			EventManager.Add(link, 'mouseout', popupOnMouseOut);
			
			var owner = tbody.childNodes[i].childNodes[1].firstChild.firstChild.nodeValue;
			var arrival = tbody.childNodes[i].childNodes[2].firstChild ? tbody.childNodes[i].childNodes[2].firstChild.title : 0;
			var size = tbody.childNodes[i].childNodes[3].firstChild.firstChild.nodeValue;
			fleetActionsCheckFleet(owner, arrival, size);
		}
		fleetActionsCheckAlarm();
	}
	else {
		if (debris)
			fleetlistpane.innerHTML = "no fleets<br>(age- <span id=\"fleetlistage\">0:00:00</span>)"+debris;
		else
			fleetlistpane.innerHTML = "no fleets found (maybe you can't see there?)<br>(age- <span id=\"fleetlistage\">0:00:00</span>)";
		fleetActionsCheckAlarm();
	}
}
function highlightFleetBar() {
	this.parentNode.parentNode.style.background='#880000';
}
function unHighlightFleetBar() {
	this.parentNode.parentNode.style.background='';
}
function checkFleetListAge() {
	var ageel = $('fleetlistage');
	if (ageel) {
		var agestr = secsToClockTime(Math.floor(((new Date()).getTime() - fleetlisttime)/1000));
		ageel.firstChild.nodeValue = agestr;
	}
}
function createScannerBar() {
	var scannerbar = node({align: 'center'});
//  var span = node({tag: 'span', html: '  refresh every:', append: scannerbar});
//  var inp = node({tag: 'select', id: 'fleetwatchpause', append: scannerbar});
//  EventManager.Add(inp,'change',updateFleetList);
//  span.title = inp.title= 'reload list automically. times are randomised +/- 20% to allay suspicion';
//  node({tag: 'option', value: '', html: '', append: inp});
//	node({tag: 'option', value: '15', html: '~15 s', append: inp});
//	node({tag: 'option', value: '60', html: '~1 min', append: inp});
//	node({tag: 'option', value: '120', html: '~2 min', append: inp});
//	node({tag: 'option', value: '180', html: '~3 min', append: inp});
//  node({tag: 'option', value: '300', html: '~5 min', append: inp});
//  node({tag: 'option', value: '600', html: '~10 min', append: inp});
//  node({tag: 'option', value: '900', html: '~15 min', append: inp});
//  node({tag: 'option', value: '1200', html: '~20 min', append: inp});
//  node({tag: 'option', value: '1800', html: '~30 min', append: inp});
//  node({tag: 'option', value: '2700', html: '~45 min', append: inp});
//  node({tag: 'option', value: '3600', html: '~1 hour', append: inp});

//  var span = node({tag: 'span', html: ' <label for="fleetwatchalarm">alarm:</label>', append: scannerbar});
//  var inp = node({tag: 'input', id: 'fleetwatchalarm', type: 'checkbox', append: scannerbar});
//  span.title = inp.title = 'sound the alarm if incoming fleets are sighted';
//  var span = node({tag: 'span', html: ' <label for="alarmmakenoise">noisy:</label>', append: scannerbar});
//  var inp = node({tag: 'input', id: 'alarmmakenoise', type: 'checkbox', append: scannerbar});
//  span.title = inp.title= 'make a big racket (turn your sound up)';
//  var span = node({tag: 'span', html: ' fleet owner:', append: scannerbar});
//  var inp = node({tag: 'input', id: 'fleetwatchfilter', size: 6, append: scannerbar});
//  span.title = inp.title= 'only alert to fleets owned by. (guildtag or partial name, comma separated terms)';
//  var span = node({tag: 'span', html: ' not:', append: scannerbar});
//  var inp = node({tag: 'input', id: 'notfleetwatchfilter', size: 6, append: scannerbar});
//  span.title = inp.title= 'ignore fleets owned by. (guildtag or partial name, comma separated terms)';
//  var span = node({tag: 'span', html: ' min size:', append: scannerbar});
//  var inp = node({tag: 'input', id: 'fleetwatchsizethreshhold', size: 4, append: scannerbar});
//  span.title = inp.title= 'minimum total size of matching fleets. leave blank to alert any tiny fleet';
//  var span = node({tag: 'span', html: ' warning (mins):', append: scannerbar});
//  var inp = node({tag: 'input', id: 'fleetwatchwarningtime', size: 3, append: scannerbar});
//  span.title = inp.title= 'time before arrival to sound alarm. leave blank to alert on first sighting';
  return scannerbar;
}
function loadScannerVars() {
//	if (getState('last_url', '').replace(/&.*/,'')==location.href.replace(/&.*/,'')) {
//      		$('fleetwatchalarm').checked = getState('fleetaction_'+'fleetwatchalarm','');
//	}
//	$('fleetwatchpause').value = getState('fleetaction_'+'fleetwatchpause','');
//	$('fleetwatchfilter').value = getState('fleetaction_'+'fleetwatchfilter','');
//	$('notfleetwatchfilter').value = getState('fleetaction_'+'notfleetwatchfilter','');
//	$('fleetwatchwarningtime').value = getState('fleetaction_'+'fleetwatchwarningtime','');
//	$('fleetwatchsizethreshhold').value = getState('fleetaction_'+'fleetwatchsizethreshhold','');
//	$('alarmmakenoise').checked = getState('fleetaction_'+'alarmmakenoise','');
}
var scannerpane, originalscannertable;
function enhanceScanners() {
  var tables = document.getElementsByTagName('table');
  for (var i=0; i<tables.length; i++) {
    if (tables[i].firstChild && tables[i].firstChild.firstChild && tables[i].firstChild.firstChild.firstChild && tables[i].firstChild.firstChild.firstChild.firstChild && tables[i].firstChild.firstChild.firstChild.firstChild.href && tables[i].firstChild.firstChild.firstChild.firstChild.href.indexOf('?view=scanners')!=-1) {
      var table = tables[i];
      var html = '<table align="center" width="800">'+table.innerHTML+'</table>';
      document.body.insertBefore(createScannerBar(),table.previousSibling);
      loadScannerVars();
      scannerpane = node({before: table});
      scannerListResponse( {'responseText':html} );
      originalscannertable = table;
      t2();
      setInterval(checkFleetListAge,999);
      return;
    }
  }	
}
function scannerListResponse(responseData) {
	fleetlisttime = (new Date()).getTime();
	var res = scanners_re.exec(responseData.responseText);

	if (res) {
		originalscannertable.style.display='none';
		scannerpane.innerHTML = res[0].replace(/time(\d+)/g,'time$1');
		var i=0;
		while(1) {
			i++;
			var cd = $('time'+i);
			if (enhanceCountdown(cd))
				break;
		}
		var tbody = scannerpane.firstChild.firstChild;
		var tr = node({tag: 'tr', html: '<th colspan="5">(age- <span id="fleetlistage">0:00:00</span>)</th>', before: tbody.firstChild});
		for (var i=2; i<tbody.childNodes.length; i++) {
			var link = tbody.childNodes[i].childNodes[0].firstChild;
			link.name = link.href;
			EventManager.Add(link, 'mouseover', fleetDetailsOnMouseOver);
			EventManager.Add(link, 'mouseout', popupOnMouseOut);
			var link = tbody.childNodes[i].childNodes[4].firstChild;
			link.name = link.href;
			EventManager.Add(link, 'mouseover', fleetDetailsOnMouseOver);
			EventManager.Add(link, 'mouseout', popupOnMouseOut);
			var owner = tbody.childNodes[i].childNodes[1].firstChild.firstChild.nodeValue;
			var arrival = tbody.childNodes[i].childNodes[3].firstChild ? tbody.childNodes[i].childNodes[3].firstChild.title : 0;
			var size = tbody.childNodes[i].childNodes[4].firstChild.firstChild.nodeValue;
			fleetActionsCheckFleet(owner, arrival, size);
		}
	  if (getState('o_enhanceTime',0)) {	
           enhanceTime();
}

		fleetActionsCheckAlarm();
	}
}
function getScannerList() {
			GM_xmlhttpRequest({
			    method: 'GET',
			    url: serverurl+'empire.aspx?view=scanners',
			    onerror: scannerListResponseError,
			    onload: scannerListResponse,
			});
	if (scannerpane.firstChild)
		scannerpane.firstChild.firstChild.firstChild.firstChild.innerHTML= 'refreshing fleet list...';
}
function scannerListResponseError(responseDetails) {
	var reponsehtml = "<p color='red'>ERROR: "+responseDetails.status+"</p>";
	reponsehtml += "<p>"+responseDetails.statusText+"</p>";
	reponsehtml += "<p>"+responseDetails.responseText+"</p>";
	scannerpane.innerHTML = reponsehtml;
}
function scanScanner() {
	if (!originalscannertable)
		return;
	for (var i=1; i<originalscannertable.rows.length; i++) {
    var currentRow = originalscannertable.rows[i];
    var fid = currentRow.firstChild.firstChild.href;
    fid = fid.substring(fid.indexOf("fleet=",0)+6, fid.length);
    var bloc = currentRow.childNodes[2].firstChild.href;
    bloc = bloc.substring(bloc.indexOf("loc=", 0)+4, bloc.length);
		var q = "scanner#@#"+fid
			+"#@#"+currentRow.firstChild.firstChild.innerHTML
			+"#@#"+currentRow.childNodes[3].title
			+"#@#"+currentRow.childNodes[4].firstChild.innerHTML
			+"#@#"+bloc
			+"#@#"+currentRow.childNodes[1].firstChild.innerHTML
			+"#@#"+myuserid;
		queries.push(q);
		postData();
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	HELP_MANUAL
//////////////////////////////////////////////////////////////////////////////////////////
function showDebrisScanResults() {
	var html = getState('debris_scan_results', 'no results saved');
	showScanResultsPopup(html,'All debris scan results. <a href="javascript:void(1);" id="clearresults">(clear debris scan results)</a>');
	EventManager.Add($('clearresults'), 'click', clearDebrisScanResults);
}
function clearDebrisScanResults() {
	setState('debris_scan_results', 'no results saved');
	showDebrisScanResults();
}
function showFleetScanResults() {
	var html = getState('fleet_scan_results','no results saved');
	showScanResultsPopup(html,'All fleet scan results. <a href="javascript:void(1);" id="clearresults">(clear fleet scan results)</a>');
	EventManager.Add($('clearresults'), 'click', clearFleetScanResults);
}
function clearFleetScanResults() {
	setState('fleet_scan_results', 'no results saved');
	showFleetScanResults();
}
function showAstroScanResults() {
	var html = getState('astro_scan_results','no results saved');
	showScanResultsPopup(html,'All astro scan results. <a href="javascript:void(1);" id="clearresults">(clear astro scan results)</a>');
	EventManager.Add($('clearresults'), 'click', clearAstroScanResults);
}
function clearAstroScanResults() {
	setState('astro_scan_results','no results saved');
	showAstroScanResults();
}
function showScanResults() {
	var html = getState('scanned_fleets','no results saved');
	showScanResultsPopup(html,'Results of last scan. (use the results link on left menu to see again)');
}
function showScanResultsPopup(html, title) {
	var links = 'Show compiled results: ';
	links += '<a href="javascript:void(1);" id="showfleetres" title="Show all combined fleet scan results">fleets</a>';
	links += ' | ';
	links += '<a href="javascript:void(1);" id="showastrores" title="Show all combined astro scan results">astros</a>';
	links += ' | ';
	links += '<a href="javascript:void(1);" id="showdebrisres" title="Show all combined debris scan results">debris</a>';
	showResultPage('<div class="helppage">'+links+'<hr>'+html+'</div>',title);
	EventManager.Add($('showfleetres'), 'click', showFleetScanResults);
	EventManager.Add($('showastrores'), 'click', showAstroScanResults);
	EventManager.Add($('showdebrisres'), 'click', showDebrisScanResults);
}

var resultpage=0;
function showResultPage(html,title) {
	if (!resultpage) {
		resultpage = createJavascriptPopup(html,title,1);
		resultpage.style.display='block';
		resultpage.style.left = 50+'px';
		resultpage.style.visibility='visible';
	}
	else {
		resultpage.contentwrap.style.height = '';
		resultpage.contentwrap.innerHTML = html;
		resultpage.titlewrap.innerHTML = title;
		resultpage.contentwrap.scrollTop=0;
	}
	resultpage.style.top = (window.pageYOffset+5)+'px';
	var maxheight = window.innerHeight-50;
	if (resultpage.contentwrap.offsetHeight > maxheight-10)
		resultpage.contentwrap.style.height = (maxheight)+'px';
}

function repositionResultPage() {
	if (resultpage && resultpage.firstChild)
		resultpage.style.top = (window.pageYOffset+5)+'px';
}
EventManager.Add(document, 'scroll', repositionResultPage);

//////////////////////////////////////////////////////////////////////////////////////////
// @module	MAIN
//////////////////////////////////////////////////////////////////////////////////////////
function addDestLinkToLocationHere() {
  var centers = document.getElementsByTagName('center');
  for (var i=0; i<centers.length; i++) {
    if (centers[i].childNodes[centers[i].childNodes.length-1].nodeName=='A' && centers[i].childNodes[centers[i].childNodes.length-1].firstChild.nodeValue=='Bookmark') {
      var el_parent = centers[i];
      var el_bm = centers[i].childNodes[centers[i].childNodes.length-1];
      var split_re = new RegExp("(.*?)(\\(.(\\d\\d:?)+\\) )");
      var res = split_re.exec(el_bm.previousSibling.nodeValue);
      if (res) {
        var l=createImageLink(0,img_target,clickDestination);
        l.className='saveDest';
        l.name=currentloc;
        l.title='Save Dest';
        EventManager.Add(l, 'dblclick', doubleClickSaveDest);
        if (l.name==getState('easyMoveDestination','')) {
          l.style.backgroundColor = '#6666FF';
        }
        el_parent.removeChild(el_bm.previousSibling);
        el_parent.insertBefore(document.createTextNode(res[1]),el_bm);
        el_parent.insertBefore(l,el_bm);
        el_parent.insertBefore(document.createTextNode(res[2]),el_bm);
      }					
    }
  }
}
function skipAfterFleetMove() {
	if (pagetype=='fleets') {
		var gotopage = getState('easyMoveInitialView', '');
		var followFleetFrom = getState('followFleetMovingFrom', '');
		var movingFleet = getState('easyMoveFleetLink','');
		if (gotopage || followFleetFrom) {
			var els = document.getElementsByTagName('center');
			for (var i=0; i<els.length; i++) {
				if (els[i].firstChild && els[i].firstChild.nodeValue && els[i].firstChild.nodeValue.indexOf('Campaign fleets left')!=-1) {
					if (followFleetFrom) {
						var links = document.getElementsByTagName('a');
						for (var j=0; j<links.length; j++) {
							if (links[j].parentNode.nodeName=='TD' && links[j].href.indexOf('fleet.aspx?fleet='!=-1)) {
								if (movingFleet.indexOf(links[j].href)!=-1 && links[j].parentNode.nextSibling.nextSibling.firstChild) {
									//this is the original fleet with a destination
									gotopage = links[j].href;
									break;
								}
								else if (links[j].parentNode.nextSibling.firstChild && links[j].parentNode.nextSibling.firstChild.href && links[j].parentNode.nextSibling.firstChild.href.indexOf(followFleetFrom)!=-1) {
									gotopage = links[j].href;
								}							
							}
						}
					}
					setState('easyMoveFleetLink','');
					setState('easyMoveDestination', '');
					setState('easyMoveToBase', '');
					setState('easyMoveInitialView', '');
					setState('followFleetMovingFrom', '');
					if (gotopage) {
						location.href=gotopage;
						return 1;
					}
					else return 0;
				}
			}
		}				
	}
	return 0;
}
function listDests() {
	var dests_str = getState('saveDests', '');
	if (dests_str!='')
		return dests_str.split(',');
	return new Array();
}
function saveDest(dest) {
	var dests = listDests();
	var newdests = [];
	for (var i=dests.length-15; i<dests.length; i++) {
		if (i>=0 && dests[i]!=dest)
			newdests.push(dests[i]);
	}
	newdests.push(dest);
	setState('saveDests', newdests.join(','));
}
function clearDests() {
	setState('saveDests', '');
	location.href=location.href;
}
function clearFleet(){
	setState('easyMoveInitialView', location.href);
	setState('easyMoveFleetLink','');
	location.href=location.href;
}
function setFleetForEasyMove(href) {
	setState('easyMoveFleetLink', href.replace('&view=move',''));
}
function clickFleetMove() {
	setState('easyMoveInitialView', location.href);
	setState('easyMoveFleetLink', this.name);
	
	if (this.previousSibling.firstChild.nodeValue)
		setState('easyMoveFleetName', this.previousSibling.firstChild.nodeValue);
	else {
		setState('easyMoveFleetName', "???");
		for each (l in fleetlinks) {
			if (l[0].href == this.name) {
				setState('easyMoveFleetName', l[0].firstChild.nodeValue);
				break;
			}
		}
	}
	this.style.backgroundColor = '#6666FF';

	var fleetDest = getState('easyMoveDestination', '');
	if (fleetDest) {
		location.href=this.name+'&view=move';
	}
}
function doubleClickFleetMove(){
	setState('easyMoveInitialView', location.href);
	location.href = this.name+'&view=move';
}
var basemoveurl='';
function clickBaseMove(){
	window.name=gmprefix+'_moving_to_base';
	setState('easyMoveToBase', this.name);
	setState('movingToBaseLastView', location.href)
	location.href=this.name;
}
function moveToBase() {
  window.name = '';
  saveDest(currentloc);
  setState('easyMoveDestination', currentloc);
  var fleetMoving = getState('easyMoveFleetLink', '');
  if (fleetMoving)
    location.href=fleetMoving+'&view=move';
  else
    location.href = getState('movingToBaseLastView');
}
function doubleClickSaveDest() {
	location.href = serverurl+'map.aspx?loc='+this.name;
}
function clickDestination() {
	saveDest(this.name);
	setState('easyMoveDestination', this.name);
	setState('easyMoveToBase', '');
	this.style.backgroundColor = '#6666FF';

	var easyMoveFleetLink = getState('easyMoveFleetLink', '');
	if ($('destination') && (typeof(fleetactions_showingmovement)!='undefined' && fleetactions_showingmovement) || location.search.indexOf('view=move')!=-1) {
		fastloc(this.name);
	}
	else if (easyMoveFleetLink) {
		location.href = easyMoveFleetLink+'&view=move';
	}
}
var currentloc;
function getCurrentLoc() {
	if (pagetype=='mapGalaxy' || pagetype=='mapRegion' || pagetype=='mapSystem' || pagetype=='mapAstro' || pagetype=='reportSearch') {
		var res=loc_re.exec(location.search);
		if (res)
			currentloc=res[1];
	}
	else if (pagetype=='base' && validastrolinks.length) {
		currentloc = validastrolinks[0][1];		
	}
}
function saveSystemLocs()  {
  if (systemlocs.length)
    setState('systems_here',systemlocs.join(','));
  else
    setState('systems_here','');
}
function initRegionScannerMenu() {
	if (pagetype=='mapRegion' || (location.href.indexOf(dbase_url.slice(0,-1))!=-1 && scannableastrolinks.length) || (window.name=='ae_scanning' && getState('regionScannersStarted',''))) {
		if (location.href.indexOf(dbase_url.slice(0,-1))!=-1) {
			var l=scannerMenuStart=createMenuLink(0, 'rescan', startAstroBaseScanners);
			lmenu.appendChild(l);
			l.link.title = "Scans all bases currently listed. Updates with full details. (only works on bases you can see)";
		}	
		else {
//			var l=scannerMenuStart=createMenuLink(0, 'scan region', startBaseRegionScanners);
			var l=scannerMenuStart=createMenuLink(0, ' ', startBaseRegionScanners);
			lmenu.appendChild(l);
			l.link.title = "Scans all bases in the region.Records Full base details.";

//			var l3 = createLink(0, 'fleet scan', startFleetRegionScanners);
			var l3 = createLink(0, ' ', startFleetRegionScanners);
			l.appendChild(l3);
			l.appendChild(document.createElement('br'));
			l3.title = "As normal scan. Also lists all fleets in the region.";

//			var l4 = createLink(0, 'astro scan', startAstroRegionScanners);
			var l4 = createLink(0, ' ', startAstroRegionScanners);
			l.appendChild(l4);
			l.appendChild(document.createElement('br'));
			l4.title = "As normal scan. Also lists the stats of all empty astros.";

//			var l5 = createLink(0, 'quick scan', startQuickScanners);
			var l5 = createLink(0, ' ', startQuickScanners);
			l.appendChild(l5);
			l.appendChild(document.createElement('br'));
			l5.title = "Quick scan recording all bases. Does not record base details.";

//			var l6 = createLink(0, 'debris scan', startDebrisScanners);
			var l6 = createLink(0, ' ', startDebrisScanners);
			l.appendChild(l6);
			l.appendChild(document.createElement('br'));
			l6.title = "As quick scan. Lists all debris in region.";
			
			l.appendChild(document.createElement('hr'));
		}
		l=scannerMenuPause=createMenuLink(0, '|| pause', pauseRegionScanners);
    lmenu.appendChild(l);
		l=scannerMenuContinue=createMenuLink(0, '|> continue', continueRegionScanners);
    lmenu.appendChild(l);
		l=scannerMenuStop=createMenuLink(0, '|x| stop', abortRegionScanners);
    lmenu.appendChild(l);
		scannerMenuStart.style.display='none';
		scannerMenuPause.style.display='none';
		scannerMenuContinue.style.display='none';
		scannerMenuStop.style.display='none';		      	
    if (getState('regionScannersStarted','')=='')
      scannerMenuStart.style.display='inline';
		else if (window.name=='ae_scanning') {
			lmenu.appendChild(document.createTextNode('queue: '+getState('scanner_systems').split(',').length));
			
		      	scannerMenuStop.style.display='inline';	
		      	if (getState('regionScannersPaused','')!='')
			      	scannerMenuContinue.style.display='inline';
			else
			      	scannerMenuPause.style.display='inline';
		}
	}
	if (window.name!='ae_scanning' && getState('regionScannersStarted','')) {		
		l=createMenuLink(0, 'abort', abortRegionScanners);
    lmenu.appendChild(l);
    l.link.innerHTML = 'abort<br>scan';
    l.style.border = '1px solid red';
		l.style.display = 'block';
		l.title = 'Abort the current scan. If you aren\'t scanning then click this to restore functionality';
		lmenu.appendChild(document.createElement('hr'));
	}
}
function startQuickScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startQuickScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region',currentloc.slice(0,6));
    setState('scan_type','quick_base');
    startRegionScanners();
	}, 0);
}
function startDebrisScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startDebrisScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region',currentloc.slice(0,6));
    setState('scan_type','quick_debris');
    setState('scanned_fleets', '<b>Debris Scanners</b> '+currentloc.slice(0,6)+' ' + getServerTime()+'<br><br>' );
    setState('scanner_report_url','');
    startRegionScanners();
	}, 0);
}
function startAstroBaseScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startAstroBaseScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region','');
    setState('scan_type','astro_base');
    setState('scanner_report_url',location.href);
    startScanners(resolveDuplicates(getLinkListUrls(scannableastrolinks)));
    setTimeout(regionScanNext, 400);
	}, 0);
}
function startBaseRegionScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startBaseRegionScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region',currentloc.slice(0,6));
    setState('scan_type','region_base');
    startRegionScanners();
	}, 0);
}
function startFleetRegionScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startFleetRegionScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region',currentloc.slice(0,6));
    setState('scan_type','region_fleet');
    setState('scanned_fleets', '<b>Fleet Scanners</b> '+currentloc.slice(0,6)+' ' + getServerTime()+'<br><br>' );
    setState('scanner_report_url','');
    startRegionScanners();
	}, 0);
}
function startAstroRegionScanners() {
	if (window.name=='ae_scanning')
		return;
	window.setTimeout(function() {
    if (getState('regionScannersStarted',0)) {
      if (!isscoutframechild)
        setTimeout(startAstroRegionScanners, 1000);
      else
        callOnScoutFrame("scoutError('scanners running elsewhere.. waiting..');");
      saveDataNotification('scanners already running elsewhere..<br>scanning will start once they finish.');
      return;
    }
    setState('scanning_this_region',currentloc.slice(0,6));
    setState('scan_type','region_astro');
    setState('scanned_fleets', '<b>Astro Scanners</b> '+currentloc.slice(0,6)+' '+ getServerTime()+'<br><br>' );
    setState('scanner_report_url','');
    startRegionScanners();
	}, 0);
}
var pollScannersTillFleet = 0;
function startRegionScanners() {
	var isfleetinregion=0;
	for (var i=0; i<systemlinks.length; i++) {
		if (systemlinks[i][0].style && systemlinks[i][0].style.cssText.indexOf('underline')!=-1)
			isfleetinregion=1;
	}
	if (!isfleetinregion) {
		if (isscoutframechild) {
			return;
		}
		else if (!confirm('You have no fleets in this region..\n\n Are you sure you want to scan?'))
			return;
	}
	if (isscoutframechild)
		callOnScoutFrame("autoScoutScannersStartedCallback();");
  window.setTimeout(function() {
    var syslocs_str = getState('systems_here','');
    if (syslocs_str) {
      setState('regionScannersScanningRegions','1');
      
      setState('scanner_report_url',serverurl+'map.aspx'+"?loc="+currentloc.slice(0,6));
      startScanners(resolveDuplicates(getLinkListUrls(systemlinks)));
      postRegionDataReport(currentloc.slice(0,6));
      postData();
    }
	}, 0);
}
var savedscanlinks=0;
function startScanners(scanlinks) {
	if ((!scanlinks) && savedscanlinks)
		scanlinks=savedscanlinks;

	if (scanlinks) {
		if (posting) {
			savedscanlinks=scanlinks;
			setTimeout(startScanners,50);
			return;
		}
		window.setTimeout(function() {
			setState('regionScannersStarted',1);
			setState('scanner_systems',scanlinks.join(','));
			setState('regionScannersPaused','');
			if (scannerMenuStart) {
				scannerMenuStart.style.display='none';
				scannerMenuPause.style.display='inline';
				scannerMenuContinue.style.display='none';
				scannerMenuStop.style.display='inline';
			}
			window.name="ae_scanning";
		}, 0);
	}
	savedscanlinks=0;
}
function pauseRegionScanners() {
	if (scannerMenuPause) {
		scannerMenuPause.style.display='none';
		scannerMenuContinue.style.display='inline';
		setState('regionScannersPaused','1');
	}
}
function continueRegionScanners() {
	scannerMenuPause.style.display='inline';
	scannerMenuContinue.style.display='none';
	setState('regionScannersPaused','');
	setTimeout(regionScanNext,400);
}
function stopRegionScanners() {
	if (scannerMenuStart) {
		scannerMenuStart.style.display='none';
		scannerMenuPause.style.display='none';
		scannerMenuContinue.style.display='none';
		scannerMenuStop.style.display='none';
	}
	setState('scan_type','');
	setState('scanner_systems','');
	setState('regionScannersStarted','')
	setState('regionScannersScanningRegions','');
	window.name='';
}
function isWindowScanning() {
	return (window.name==gmprefix+"_moving_to_base" || (window.name=="ae_scanning" && getState('scan_type') && (!getState('regionScannersPaused'))))
}
function abortRegionScanners() {
	stopRegionScanners();
	if (getState('regionScannersScanningRegions','')) {
		alert('Scan aborted.\nYou should go back and scan the region again to avoid database errors\n\n'+getState('scanning_this_region',''));
	}
	location.href=serverurl+"map.aspx?loc="+getState('scanning_this_region','');
}
function removeAstroFromScanList(aloc) {
	var syslocs_str = getState('scanner_systems','');
	if (syslocs_str) {
		var newl=[];
		var systems = syslocs_str.split(',');
		for (var i=0; i<systems.length; i++) {
			if (systems[i].indexOf(aloc)==-1)
				newl.push(systems[i]);
		}
		setState('scanner_systems',newl.join(','));
	}
}
function regionScanNext() {
	if (window.name=='ae_scanning' && getState('regionScannersStarted','')) {
		var scan_type = getState('scan_type');
		var syslocs_str = getState('scanner_systems','');
		if (pagetype=='mapAstro' && scan_type=='astro_base')
			syslocs_str = ( resolveDuplicates(getLinkListUrls(baselinks)).concat(syslocs_str.split(',')) ).join(',');
		if (pagetype=='mapSystem' && (scan_type=='region_fleet' || scan_type=='region_astro'))
			syslocs_str = ( resolveDuplicates(getLinkListUrls(scannableastrolinks)).concat(syslocs_str.split(',')) ).join(',');
		if (pagetype=='mapSystem' && (scan_type=='region_fleet' || scan_type=='region_astro' || scan_type=='region_base'))
			syslocs_str = ( resolveDuplicates(getLinkListUrls(baselinks)).concat(syslocs_str.split(',')) ).join(',');
			
		if (syslocs_str) {
			if (getState('regionScannersPaused','')=='') {
				var systems = syslocs_str.split(',');
				var nextsys = systems.shift();
				setState('scanner_systems',systems.join(','));
				setTimeout(function(){ location.href=nextsys; } , 500+Math.random()*1500);
			}
		}
		else {
			if (getState('scan_type')=='region_fleet') {
				setState('fleet_scan_results',getState('scanned_fleets','')+'<hr><br>'+getState('fleet_scan_results',''));
				showScanResults();
				stopRegionScanners();
				if (isscoutframechild)
					callOnScoutFrame("autoScoutScannersFinished();");
				initLeftMenu();
			}
			else if (getState('scan_type')=='region_astro') {
				setState('astro_scan_results',getState('scanned_fleets','')+'<hr><br>'+getState('astro_scan_results',''));
				showScanResults();
				stopRegionScanners();
				if (isscoutframechild)
					callOnScoutFrame("autoScoutScannersFinished();");
				initLeftMenu();
			}
			else if (getState('scan_type')=='quick_debris') {
				setState('debris_scan_results',getState('scanned_fleets','')+'<hr><br>'+getState('debris_scan_results',''));
				showScanResults();
				stopRegionScanners();
				if (isscoutframechild)
					callOnScoutFrame("autoScoutScannersFinished();");
				initLeftMenu();
			}
			else {
				stopRegionScanners();
				if (isscoutframechild)
					callOnScoutFrame("autoScoutScannersFinished();");
				if (isscoutframechild) {
					initLeftMenu();
					return;
				}
//				location.href=getState('scanner_report_url');
			}
		}
	}
}
function getServerTime() {
	var els = document.getElementsByTagName('small');
	for (var i=0; i<els.length; i++) {
		if (els[i].firstChild.nodeValue.indexOf('Server Time')!=-1)
			return els[i].firstChild.nodeValue;		
	}
}
function postBaseDataReport(a,b,f) {
	if (b) {
		var notes='';
		if (b.defences) {
			notes+="Economy\t"+b.economy+"<br>";
			notes+=b.defences;
			notes+=b.defences_values;
			notes+=f.fleets;
		} /*else if ((a.baseowner == '- empty -') && (a.occupier == '- empty -')) {
			notes+="Type\t"+a.type+"<br>";
			notes+="Area\t"+a.area+"<br>";
			notes+="Solar\t"+a.solar+"<br>";
			notes+="Fertility\t"+a.fertility+"<br>";
			notes+="Metal\t"+a.metal+"<br>";
			notes+="Gas\t"+a.gas+"<br>";
			notes+="Crystals\t"+a.crystals+"<br>";
		}*/
		var q = "base#@#"+a.loc+"#@#"+a.baseowner+"#@#"+a.occupier+"#@#"+notes+"#@#"+myuserid;
		queries.push(q);
	}
}
function postRegionDataReport(rloc) {
	var q = "region#@#"+rloc+"#@#"+myuserid;
	queries.push(q);
}
function postScannerDataReport(f,b,p) {
  var q = "scanner#@#"+f.id+"#@#"+f.name+"#@#"+f.arrival+"#@#"+f.size+"#@#"+b.loc+"#@#"+p.name+"#@#"+myuserid;
	queries.push(q);
}
function scanSystem() {
        GM_log("LOADING MODULE:  SCANSYSTEM");

	var ScanDate = getGameServerTime();

	var dataObjs=[];
	for (var i=0; i<scannableastrolinks.length; i++) {
		var link = scannableastrolinks[i][0];
		var loc = scannableastrolinks[i][1];
		if (link.firstChild.nodeName.toLowerCase()=='img') {
			var img=link.childNodes[0];
			var res=astrotype_re.exec(scannableastrolinks[i][2]);
			var atype=res[1];
			if (atype=='Gas Giant' || atype=='Asteroid Belt') {
				continue;
			}
			if (atype=='unknown') {
				loadSystemScript();
				setTimeout(regionScanNext,400);
				return;
			}
			var nextel =  link.nextSibling;
			if (!nextel) {
				loadSystemScript();
				setTimeout(regionScanNext,400);
				return;
			}
			nextel = nextel.firstChild;
			if (!nextel || !nextel.href) {
				loadSystemScript();
				setTimeout(regionScanNext,400);
				return;
			}
			var a = new Object();
			a.loc = loc;
			if (nextel.href.indexOf('base')!=-1) {
				a.baseowner = nextel.childNodes[0].nodeValue;
				a.occupier = '';
				var occupier = nextel.parentNode.nextSibling.firstChild.firstChild;
				if (occupier)
					a.occupier = occupier.nodeValue;				
			}
			else if (!(nextel.firstChild && nextel.firstChild.nodeName=='DIV'  && nextel.firstChild.firstChild.firstChild && nextel.firstChild.firstChild.firstChild.nodeName=='SPAN' && nextel.firstChild.firstChild.firstChild.nodeValue.indexOf('- empty -')!=-1)) {
				a.baseowner = 'undefined';
				a.occupier = 'undefined';
			}
			if (link.nextSibling && link.nextSibling.childNodes.length>2 && link.nextSibling.childNodes[2].title && link.nextSibling.childNodes[2].title.indexOf('Debris')!=-1) {
				if (window.name=='ae_scanning' && getState('scan_type')=='quick_debris') {
					var ftext = getState('scanned_fleets','');
					ftext += "<a title=\"fleet scanners\" href=\""+serverurl+"map.aspx?loc="+a.loc+"\">"+a.loc+"</a>";
					if (a.baseowner) {
						ftext += " "+a.baseowner;
					}
					if (a.occupier) {
						ftext += " ("+a.occupier+")";
					}
					ftext += " <span style=\"color:#AAAAAA;font-weight:normal;\">*"+link.nextSibling.childNodes[2].title+"</span>";
					ftext += "<br>";
					setState('scanned_fleets', ftext+"<br>" );
				}				
			}
                	uploadarray[uploadcount] = "?ScanType=System&Base=" + a.loc + "&BaseOwner=" + a.baseowner + "&BaseOccupier=" + a.occupier + "&ScanDate=" + ScanDate + "&PType=" + atype;
                	uploadarray[uploadcount] = uploadarray[uploadcount] + "&Economy=&Income=&JumpGate=&CommandCenters=&Defenses=";
//                	GM_log("upload array = " + uploadarray[uploadcount]);
                	uploadcount++;
			dataObjs.push(a);
		}
	}
	for (var i=0; i<dataObjs.length; i++) {
		postBaseDataReport(dataObjs[i],dataObjs[i],0);
	}
	postData();
}
function scanBase() {
        GM_log("LOADING MODULE:  SCANBASE");
	if (pagetype=='base') {
		if (location.search.indexOf('&view=')!=-1)
			return;
		if (location.search.indexOf('?base=')==-1)
			return;

		if (!currentloc)
			return;
		removeAstroFromScanList(currentloc);
	} else if (pagetype!='mapAstro')
		return;
	else if (window.name=='ae_scanning' && getState('scan_type', '')=='astro_base') {
		setTimeout(regionScanNext,400);
		return;
	}
	var a = new Object();
	var b = new Object();
	var f = new Object();

 	var fleetarray = new Array();
        var basedefenses = '&Defenses=';      
        var basejumpgate = '&JumpGate=';
        var basecc = '&CommandCenters='; 
        var basecapital = '&Capital='; 
        var stripbase = '';
        var defname = '';
        var defnum = '';
        var ScanDate = getGameServerTime();  
	var numfleet = 0;
	
	b.loc = a.loc = f.loc = currentloc;
	b.traderoutes = "";
	b.traderoutes_free=0
	var astroimgtd=0;
	var tables = document.getElementsByTagName('table');
	for (var i=0; i<tables.length; i++) {
		var t = tables[i].firstChild;
		if (t.firstChild) {
			if (t.parentNode.className=='base' || t.parentNode.className=='astro') {
				a.type = t.firstChild.firstChild.firstChild.childNodes[7].nodeValue;
				a.area = t.firstChild.firstChild.firstChild.childNodes[11].nodeValue;
				if (a.type=='Gas Giant' || a.type=='Asteroid Belt')
					return;
				astroinfo = t.firstChild.childNodes[0];
				if (a.area == 'unknown')
					break;
				a.solar = t.firstChild.firstChild.firstChild.childNodes[15].nodeValue;
				a.fertility = t.firstChild.firstChild.firstChild.childNodes[19].nodeValue;
				a.metal = t.firstChild.firstChild.firstChild.childNodes[22].firstChild.childNodes[1].childNodes[1].firstChild.nodeValue;
				a.gas = t.firstChild.firstChild.firstChild.childNodes[22].firstChild.childNodes[2].childNodes[1].firstChild.nodeValue;
				a.crystals = t.firstChild.firstChild.firstChild.childNodes[22].firstChild.childNodes[3].childNodes[1].firstChild.nodeValue;
			}			
			if (t.firstChild.firstChild.firstChild.nodeValue=='Fleets') {
				f.fleets='';
				for (var j=2; j<t.childNodes.length; j++) {
					var r = t.childNodes[j];
					
					f.fleets+= r.childNodes[1].firstChild.firstChild.nodeValue;
					f.fleets+="\t";
					var fleetarrival="";

					if (r.childNodes[2].title) {
						var s = parseInt(r.childNodes[2].title);
						var h= Math.floor(s/(60*60));
						f.fleets+=h+':';
						s -= h*60*60;
						var m = Math.floor(s/60);
						if (m<10)
							f.fleets+='0';
						f.fleets+=m+':';
						s -= m*60;
						if (s<10)
							f.fleets+='0';
						f.fleets+=s;
						
						fleetarrival = h + ":" ;
						if ( m < 10 ) {
                                                    fleetarrival = fleetarrival + '0' + m + ":" ;
                                                }
                                                else
                                                    fleetarrival = fleetarrival + m + ":" ;

                                                if ( s < 10 ) {
                                                    fleetarrival = fleetarrival + '0' + s ;
                                                }
                                                else
                                                    fleetarrival = fleetarrival + s ;
					}
					else
						f.fleets+=' ';
					
					f.fleets+= "\t";

					f.fleets+= r.childNodes[3].firstChild.firstChild.nodeValue;
					f.fleets+='<br>';
					fleetarray[numfleet] = '&FleetOwner=' + r.childNodes[1].firstChild.firstChild.nodeValue + '&FleetTotal=' + r.childNodes[3].firstChild.firstChild.nodeValue + '&FleetArrival=' + fleetarrival;
                                        numfleet++;
				}
			}
			if (t.childNodes.length>1 && t.childNodes[1].firstChild && t.childNodes[1].firstChild.firstChild && t.childNodes[1].firstChild.firstChild.nodeValue=='Processing capacity') {
				var res = linktype_re.exec(location.href);
				a.baseid = res[3];
				b.baseid = res[3];
				b.construction = t.childNodes[2].childNodes[1].firstChild.nodeValue;
				b.production = t.childNodes[3].childNodes[1].firstChild.nodeValue;
				b.research = t.childNodes[4].childNodes[1].firstChild.nodeValue;
				b.economy = t.childNodes[6].childNodes[1].firstChild.nodeValue;
				b.income = t.childNodes[7].childNodes[1].firstChild.nodeValue;
				a.baseowner = t.childNodes[9].childNodes[1].firstChild.innerHTML;
				var res = intid_re.exec(t.childNodes[9].childNodes[1].firstChild.href);
				b.ownerid = res[1];
				a.occupier='';
				if (t.childNodes[10].childNodes[1].firstChild.firstChild)
					a.occupier = t.childNodes[10].childNodes[1].firstChild.firstChild.nodeValue;
			}
			if (t.firstChild.firstChild.firstChild.nodeValue=='Base') {
				var res = linktype_re.exec(t.childNodes[2].firstChild.firstChild.href);
					a.baseid = res[3];
				a.baseowner = t.childNodes[2].childNodes[1].firstChild.firstChild.nodeValue;
				a.occupier='';
				if (t.childNodes[2].childNodes[2].firstChild.firstChild)
					a.occupier = t.childNodes[2].childNodes[2].firstChild.firstChild.nodeValue;
			}
			if (t.firstChild.firstChild.firstChild.nodeValue=='Base Name') {
				 b.traderoutes = t.childNodes[1].childNodes[5].firstChild.nodeValue;
				 var parts = b.traderoutes.split('/');
				 b.traderoutes_free = parseInt(parts[1])-parseInt(parts[0]);
			}
			if (t.firstChild.firstChild.firstChild.nodeValue=='Structures') {
				b.defences = '';
				b.defences_values='';
				var buildingnames = t.childNodes[1].childNodes[0].innerHTML.split('<br>');
				var buildingnumbers = t.childNodes[1].childNodes[1].innerHTML.split('<br>');
				for (var j=0; j<buildingnames.length; j++) {
					var structurename = cleanstring(buildingnames[j]);
					var structurenumber = cleanstring(buildingnumbers[j]);
//					GM_log("Structure = " + structurename + "  :  " + structurenumber);
					
					if (structurename == 'Command Centers') {
                                                b.defences += 'Command Centers\t'+buildingnumbers[j]+'<br>';
						basecc = basecc + structurenumber;
					}
					if (structurename == 'Jump Gate') {
						b.defences += 'Jump Gate\t'+buildingnumbers[j]+'<br>';
						basejumpgate = basejumpgate + structurenumber;
                                        }
					if (structurename == 'Capital') 
						basecapital = basecapital + structurenumber;
				}
				var defnames = t.childNodes[1].childNodes[3];
				var defnumbers = t.childNodes[1].childNodes[4];
				for (var j=0; j<defnames.childNodes.length; j+=2) {
					b.defences+=defnames.childNodes[j].nodeValue+"<br>";
					b.defences_values+= defnumbers.childNodes[j].nodeValue+"<br>";
                			defname = defnames.childNodes[j].nodeValue;
                                        defnum = defnumbers.childNodes[j].nodeValue;
                                        basedefenses = basedefenses + defname + ":" + defnum + ":";
				}
				if (!b.defences) {
					b.defences = 'no defences<br>';
					b.defences_value = '';	
				}
			}
		}
	}
	var isseen=1;
	if (a.type=='Asteroid' && (!(getState('regionScannersScanningRegions','') && window.name=='ae_scanning')) && (!a.baseowner) && (!a.fleets) && (!a.debris))
		isseen = 0;
	if ((a.area=='unknown') || !a.area)
		isseen = 0;
	if (isseen==0) {
		var pos = getElementPosition(astroinfo);
		loadStaticInfo('aej_loadlocinfo.php','&loc='+currentloc,pos[0],pos[1]);		
		return;
	}
	a.debris='0';	
	var centers = document.getElementsByTagName('center');
	for (var i=0; i<centers.length; i++) {
		var t = centers[i].firstChild;
		if (t && t.nodeValue && t.nodeValue.indexOf('Debris')!=-1) {
			a.debris = t.nodeValue.split(' ')[0];
		}
	}
	if (window.name=='ae_scanning' && getState('scan_type')=='region_astro') {
		if (!a.baseowner) {
			var ftext = getState('scanned_fleets','');
			ftext += "<a title=\"fleet scanners\" href=\""+serverurl+"map.aspx?loc="+a.loc+"\">"+a.loc+"</a>";
			ftext += " " + a.type + ", " + a.area+","+a.solar+","+a.fertility +","+a.metal +","+a.gas +","+a.crystals;
			setState('scanned_fleets', ftext+"<br>" );
		}
		if (pagetype!='base') {
			setTimeout(regionScanNext,400);
			return;
		}
	}
	if (window.name=='ae_scanning' && getState('scan_type')=='region_fleet') {
		if (f.fleets || a.debris!='0') {
			var ftext = getState('scanned_fleets','');
			ftext += "<a title=\"fleet scanners\" href=\""+serverurl+"map.aspx?loc="+a.loc+"\">"+a.loc+"</a>";
			if (a.baseowner) {
				ftext += " "+a.baseowner;
			}
			if (a.occupier) {
				ftext += " ("+a.occupier+")";
			}
			if (a.debris!='0') {
				ftext += " <span style=\"color:#AAAAAA;font-weight:normal;\">*"+a.debris+" Debris</span>";
			}
			ftext += "<br>";
			if (f.fleets) {
				ftext += f.fleets;
			}
			setState('scanned_fleets', ftext+"<br>" );
		}
		if (pagetype!='base') {
			setTimeout(regionScanNext,400);
			return;
		}
	}	
	if (!f.fleets) {
		f.fleets='no fleets<br>';
	}

        uploadarray[0] = "?ScanType=Base&Base=" + a.loc + "&BaseOwner=" + a.baseowner + "&BaseOccupier=" + a.occupier + "&ScanDate=" + ScanDate + "&PType=" + a.type;
        uploadarray[1] = "?ScanType=BaseInfo&Base=" + a.loc + "&Econ=" + b.economy + "&OIncome=" + b.income + basejumpgate + basecc + basecapital + basedefenses;
        uploadcount=2;
        for (fcount=0 ; fcount < numfleet ; fcount++) {
            uploadarray[uploadcount] = "?ScanType=FleetInfo&Base=" + a.loc + "&FleetOrder=" + fcount + fleetarray[fcount];
            uploadcount++;
        }

//for (i = 0 ; i < uploadarray.length ; i++) {
//	    GM_log('uploadarray ' + i + ' = ' + uploadarray[i]);
//}
	postBaseDataReport(a,b,f);
	postData();
}
var alarmflashon = 0;
var alarmnotification = 'ALARM';
var originalwindowtitle = document.title;
var alarmiframe = 0;
var alarmpollcallback = 0;
var alarmisset = 0;
var alarm_t0 = 0;
var alarmmakenoise = 0;
var stopalarmpopup = 0;
var alarmwarning = 0;
var alarmsounding = 0;
var alarmlink= 0;
function setAlarm() {
	if (alarmisset || alarmsounding)
		stopAlarm();
	else
		startAlarm(0);
}
function startAlarm(seconds) {
	stopAlarm();
	alarmwarning= 0;
	
	var now = new Date();
	if (!seconds)
		seconds = parseInt(prompt('Enter time in minutes:','0'))*60;
	else {
		alarmwarning = getState('default_alarm_warning','0');
		alarmwarning = prompt('how much warning do you want (in seconds)',alarmwarning);
		setState('default_alarm_warning',alarmwarning);
	}
	if ((!seconds) || seconds <= 0)
		return;

	alarmmakenoise = confirm('Make an awful racket to wake you up?\n(Make sure the sound is turned up)');
	t0 = now.getTime() + (seconds*1000);
	initAlarm(t0, alarmwarning, alarmmakenoise);
}
function initAlarm(t0, warning, noise) {
	function checkAlarm() {
		var sleft = (alarm_t0 - (new Date()).getTime()) / 1000;
		if (sleft <= 0) {
			clearInterval(alarmpollcallback);
			alarmpollcallback = 0;
			alarm_tstr = '0:00:00';
			document.title = alarm_tstr;
		}
		else {
			document.title = secsToClockTime(sleft);
		}
		if (sleft-alarmwarning <= 0 && !alarmsounding) {
			soundAlarm();
		}
	}
	alarm_t0 = t0;
	
	alarmwarning = warning;
	alarmmakenoise = noise;
	
	alarmisset = 1;
	alarmpollcallback = setInterval(checkAlarm,999);
	alarmnotification = '0:00:00';
	checkAlarm();
	
	alarmlink.link.firstChild.nodeValue='cancel';
}
function moveOnAlarm() {
	if ($('moveonalarm') && $('moveonalarm').checked) {
		$('moveonalarm').checked= '';
		$('recallonalarm').checked= '';
		quickMovement();
	}
	if ($('recallonalarm') && $('recallonalarm').checked) {
		$('recallonalarm').checked= '';
		$('moveonalarm').checked= '';
		recallActiveFleet();
	}
}
function soundAlarm() {
	function flashAlarm() {
		if (alarmsounding) {
			
			if (alarmflashon) {
				alarmflashon = 0;
				document.title = alarmnotification.replace(/./g, "  ");
				alarmflashtimeout = setTimeout(flashAlarm,250);
			}
			else {
				alarmflashon = 1;
				document.title = alarmnotification;
				alarmflashtimeout = setTimeout(flashAlarm,550);
			}
		}
	}

	moveOnAlarm();
	if (alarmmakenoise) {
		alarmiframe = node({html: '<iframe src="'+dbase_url+'dbhelper/alarm.html" width="1" height="1">', style: {visibility: 'hidden', position: 'absolute', left: '0px', top: '0px'},
      append: document.body});
		var content = '<div id="stopAlarm" style="width:200px;height:100px;vertical-align:middle;text-align:center;font-size:200%">Click here to<br>stop alarm</div>';
		stopalarmpopup = createJavascriptPopup(content,'Alarm');
		stopalarmpopup.style.display='block';
		centerEl(stopalarmpopup);
		stopalarmpopup.style.visibility='visible';
		EventManager.Add($('stopAlarm'), 'click', stopAlarm);
	}
	alarmisset = 0;
	alarmsounding=1;
	alarmlink.link.firstChild.nodeValue='stop';
	flashAlarm();
}
function stopAlarm() {
	if (alarmpollcallback)
		clearInterval(alarmpollcallback);
	if (alarmflashtimeout)
		clearTimeout(alarmflashtimeout);
	alarmflashtimeout = 0;
	alarmpollcallback = 0;
	
	alarmsounding=0;
	alarmisset=0;
	document.title = originalwindowtitle;
	if (alarmiframe) {
		document.body.removeChild(alarmiframe);
		delete alarmiframe;
		alarmiframe = 0;
	}
	if (stopalarmpopup) {
		document.body.removeChild(stopalarmpopup);
		delete stopalarmpopup;
		stopalarmpopup = 0;
	}
	alarmlink.link.firstChild.nodeValue='alarm';
}
var alarmflashtimeout = 0;
function enhanceCountdowns() {
	if (!getState('o_showAlarmButtons',0))
		return;
	i=0;
	while(1) {
		i++;
		var cd = $('time'+i);
		if (enhanceCountdown(cd))
			break;
	}
}
function enhanceCountdown(cd) {
		if (!(cd && cd.title))
			return 1;
		if (parseInt(cd.title) <= 0)
			return 0;

		cd.style.whiteSpace = 'nowrap';
		var l = createImageLink(0, img_alarm ,setAlarmFromCountdown);
		l.style.marginLeft='2px';
		l.className='saveDest';
		var em = document.createElement('span');
		em.innerHTML = cd.innerHTML;
		em.title = cd.title;
		em.id = cd.id;
		cd.id='';
		cd.innerHTML = '';
		cd.appendChild(em);
		cd.appendChild(l);
		l.title = 'Set alarm';
		return 0;
}
var alarmcountdownitem = 0;
function setAlarmFromCountdown() {
	if (alarmcountdownitem)
		alarmcountdownitem.style.border='';
	alarmcountdownitem = this.previousSibling;
	alarmcountdownitem.style.border='1px solid red';

	startAlarm(this.previousSibling.title);
}
var savedatnotify;
var issavingdata;
function initSaveDataNotify() {
	function repositionSaveDataNotify() {
		savedatnotify.style.left = String(lmenu.offsetWidth)+'px';
		savedatnotify.style.top = String(document.body.scrollTop)+'px';
	}

	savedatnotify = node({className: 'savedatnotify', style: {display: 'none'}, append: document.body});
	repositionSaveDataNotify();
	EventManager.Add(document, 'scroll', repositionSaveDataNotify);
}
function saveDataNotification(msg) {
	savedatnotify.className='savedatnotify';
	savedatnotify.innerHTML = msg;
	savedatnotify.style.left = '50px';
	savedatnotify.style.display='block';
}

var queries=[];
var posting=0;
function postData() {
        GM_log('LOADING MODULE:  POSTDATA');
        var aeuploadstring="";
	if (queries.length==0) {
		setTimeout(regionScanNext,400);
		return;
	}
	if (uploadarray.length==0) {
		setTimeout(regionScanNext,400);
		return;
	}
	posting=1;
	issavingdata=1;
	saveDataNotification('saving data...');
//	GM_xmlhttpRequest({
//	    method: 'POST',
//	    url: dbase_url+'aej_upload.php',
//	    headers: {'Content-type':'application/x-www-form-urlencoded; charset=UTF-8',},
//	    data: 'password='+dbase_pass+'&playerid='+myuserid+'&playername='+encodeURIComponent(getState('playername',''))+'&version='+escape(version)+'&queries='+encodeURIComponent(queries.join('#@@@#')),
//	    onload: onPostDataReponse
//	});
	for (i = 0 ; i < uploadarray.length ; i++) {
//	    GM_log('uploadarray ' + i + ' = ' + uploadarray[i]);
            aeuploadstring=dbase_url + 'php/scoutdatainsert.php' + uploadarray[i];
//	    GM_log('aeuploadstring  = ' + aeuploadstring);
       	    GM_xmlhttpRequest({
	        method: 'POST',
	        url: aeuploadstring,
	        headers: {
	            'Content-type':'application/x-www-form-urlencoded; charset=UTF-8',
	        },
	        onload: onPostDataReponse
	    });
        }
	queries=[];
}

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,"");
}
function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,"");
}
function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,"");
}
function cleanstring(stringToTrim) {
	return stringToTrim.replace(/\<[^\>]*\>/g,"");
}

function onPostDataReponse(responseDetails) {
	function saveDataNotifyError(msg) {
		savedatnotify.className='savedatnotifyerror';
		savedatnotify.innerHTML = '<a href="javascript:void(1);" onclick="this.parentNode.style.display=\'none\';">[x]</a>'+msg;
		savedatnotify.style.left = '50px';
		savedatnotify.style.display='block';	
	}
	function closeDataNotify() {
		savedatnotify.style.display='none';	
	}

//	var dbaseResponse = interpretForumLogin(responseDetails.responseText);
//	if (dbaseResponse=='a_ok') {
//		issavingdata=0;
//    saveDataNotification('data saved.');
//		setTimeout(closeDataNotify,2000);
//		setTimeout(regionScanNext,400);
//	}
//	else {
//		pauseRegionScanners();
//		saveDataNotifyError(dbaseResponse);
//	}
//        GM_log('LOADING ONPOSTDATARESPONSE');
//        GM_log('responseText = ' + ltrim(responseDetails.responseText));
//        var dbaseResponse = responseDetails;
	if (ltrim(responseDetails.responseText) == 'a_ok') {
		issavingdata=0;
                saveDataNotification('data saved.');
		setTimeout(closeDataNotify,2000);
		setTimeout(regionScanNext,300);
	}
	else {
		pauseRegionScanners();
		saveDataNotifyError(responseDetails.responseText);
	}
	posting=0;
}

var systemloadingmsg;
function loadSystemScript() {
	if (!getState('o_loadMissingInfo',0)) return;
	
	if (isWindowScanning())	return;

		var tables = document.getElementsByTagName('table');
		for (var i=0; i<tables.length; i++) {
			if (tables[i].className =='system') {
				var pos = getElementPosition(tables[i]);
				systemloadingmsg = createJavascriptPopup('loading...','',0);
				systemloadingmsg.style.left = String(pos[0]+2)+'px';
				systemloadingmsg.style.top = String(pos[1]+2)+'px';
				systemloadingmsg.style.visibility = 'visible';
				systemloadingmsg.style.display = 'block';
			}
		}
    GM_xmlhttpRequest({
        method: 'POST',
        url: dbase_url+'aej_loadsysteminfo.php',
        headers: {'Content-type':'application/x-www-form-urlencoded'},
        data: 'password='+dbase_pass+'&loc='+currentloc,
        onload: onLoadSystemScript
    });
}
function onLoadSystemScript(responseDetails) {
//	if (isForumLogin(responseDetails.responseText))
//		return;
	try {
		document.body.removeChild(systemloadingmsg);
	}catch(e){}
		eval(responseDetails.responseText);
		addPlayerSearchLinkPopups();
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	SIDE_MENUS
//////////////////////////////////////////////////////////////////////////////////////////
function initLeftMenu() {
	lmenu = node({className: 'helperMenu', style: {position: 'absolute'}});
	galaxylinksmenu = node({className: 'helperMenu', style: {position: 'absolute'}, append: document.body});
	initRegionScannerMenu();
	if (!isWindowScanning()) {
		if (getState('scanned_fleets')) {
//			var l = createMenuLink(0,'results',showScanResults);
			var l = createMenuLink(0,' ',showScanResults);
			l.title = 'Show results collected from astro/fleet/debris scans';
			lmenu.appendChild(l);
		}
		lmenu.appendChild(createMenuLink(0,'options',popupOptions));
		alarmlink = document.createElement('div');
		alarmlink.appendChild(createImageLink(0, img_alarm, setAlarm));
		alarmlink.link = createLink(0,'alarm',setAlarm);
		alarmlink.appendChild(alarmlink.link);
		lmenu.appendChild(alarmlink);
		
		if (getState('o_showGalaxyLinks',0)){
			var group = 0, w;
			for (var i=0; i<show_galaxies.length; i++)
				if (show_galaxies[i]=='-') {
					var section = createMenuSection(universe+group);
					group++;
					galaxylinksmenu.appendChild(section);
					w = section.childNodes[1];
				}
				else {
					var l=createMenuLink(serverurl+'fleet.aspx?gal='+universe+String(show_galaxies[i]),universe+String(show_galaxies[i]),0);
					l.style.lineHeight='1.0em';
					w.appendChild(l);
				}
		}
	}
	document.body.appendChild(lmenu);
	repositionLeftMenu();
	EventManager.Add(document,'scroll', repositionLeftMenu);
}
function initRightMenu() {
  function addBookmark() {
    var url = location.href;
    var name = prompt('Enter bookmark name:');
    var bookmarks = getState('bookmarks','').split('#####');
    bookmarks.push(name+'###'+url);
    setState('bookmarks',bookmarks.join('#####'));
    location.href=location.href;
  }
  function listBookmarks() {
    var bookitems = getState('bookmarks','').split('#####');
    var bookmarks = new Array();
    for (var i=0; i<bookitems.length; i++) {
      if (bookitems[i]!='') {
        var bmparts = bookitems[i].split('###');
        bookmarks.push( [bmparts[0], bmparts[1]] );
      }
    }
    return bookmarks;
  }
  function deleteBookmark() {
    var bmkey = this.title;
    var bookmarks = getState('bookmarks','').split('#####');
    var newbookmarks=[];
    for (var i=0; i<bookmarks.length; i++) {
      if (bookmarks[i]!='') {	
        if (String(i)+':delete:'+bookmarks[i].split('###')[0] != bmkey)			
          newbookmarks.push(bookmarks[i]);
        else {
          var dodelete = confirm('delete the bookmark?');
          if (!dodelete)
            return;
        }
      }
    }
    setState('bookmarks',newbookmarks.join('#####'));
    location.href=location.href;
  }

	rmenu = node({className: 'helperMenu', style: {position: 'absolute', right: '0px', top: '0px'}});
	var section = createMenuSection('generalMenuLinks');
	rmenu.appendChild(section);
	var w = section.childNodes[1];
	w.appendChild(createMenuLink(serverurl+'contacts.aspx','Contacts',0));
	w.appendChild(createMenuLink(serverurl+'guild.aspx','Guild',0));
	try {
		var msgstext = 'Messages';
		var msgscolor = '';
			var num=0;
			var n = messageslink.parentNode.nextSibling.firstChild;
			if (n.firstChild)
				num = parseInt(n.firstChild.nodeValue.replace(/ New/,''));
			else
				num = parseInt(n.nodeValue.replace(/ New/,''));
			msgstext += ' ('+num+')';
			if (num) {
				var res = color_re.exec(n.parentNode.innerHTML);
				if (res)
					msgscolor = res[0];//'color:#9999FF;';
			}
		var l = createMenuLink(serverurl+'messages.aspx',msgstext,0);
		l.link.style.color = msgscolor;
		w.appendChild(l);
	} catch (e) {}
	try {
		var boardtext = 'Board';
		var boardcolor = '';
			var num=0;
			var n = boardlink.parentNode.nextSibling.firstChild;
			if (n.firstChild)
				num = parseInt(n.firstChild.nodeValue.replace(/ New/,''));
			else
				num = parseInt(n.nodeValue.replace(/ New/,''));
			boardtext += ' ('+num+')';
			if (num) {
				var res = color_re.exec(n.parentNode.innerHTML);
				if (res)
					boardcolor = res[0];//'color:#9999FF;';
			}
		var l = createMenuLink(serverurl+'board.aspx',boardtext,0);
		l.link.style.color = boardcolor;
		w.appendChild(l);
    w.appendChild(createMenuLink(serverurl+'bookmarks.aspx','Bookmarks',0));
	} catch (e) {}
	var l=createMenuLink(forum_url,'Forum',0);
	w.appendChild(l);
	var query = currentloc ? '?loc='+currentloc.slice(0,6) : '';
	w.appendChild(createMenuLink(dbase_url+'login.php','Database',0));
	var section = createMenuSection('empireMenuLinks');
	rmenu.appendChild(section);
	var w = section.childNodes[1];
	w.appendChild(createMenuLink(serverurl+'empire.aspx','Empire',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=bases_capacities','Capacities',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=economy','Economy',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=trade','Trade',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=fleets','Fleets',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=units','Units',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=technologies','Tech',0));
	w.appendChild(createMenuLink(serverurl+'empire.aspx?view=scanners','Scanners',0));
	var section = createMenuSection('customMenuLinks');
	rmenu.appendChild(section);
	var w = section.childNodes[1];
	var bookmarks = listBookmarks();
	for (var i=0; i<bookmarks.length; i++) {
		var wrap=node({append: w});
		var l = createLink(0,'[x]',deleteBookmark);	wrap.appendChild(l);
		l.title=String(i)+':delete:'+bookmarks[i][0];		
		wrap.appendChild(createLink(bookmarks[i][1],bookmarks[i][0],0));
		node({tag: 'br', append: wrap});
	}
	w.appendChild(createMenuLink(0,'[add link here]',addBookmark));
	var baselink_here = serverurl+'base.aspx?base='+/\?base=(\d+)((&action|&view)=([^&]+)|)/.exec(location.search);
	if (activebaseform) {
		var section = createMenuSection('baseViewMenuLinks');
		rmenu.appendChild(section);
		var w = section.childNodes[1];
		w.appendChild(createMenuLink(baselink_here,'Overview',0));
		w.appendChild(createMenuLink(baselink_here+'&view=structures','Structures',0));
		w.appendChild(createMenuLink(baselink_here+'&view=defenses','Defenses',0));
		w.appendChild(createMenuLink(baselink_here+'&view=production','Production',0));
		w.appendChild(createMenuLink(baselink_here+'&view=research','Research',0));
		w.appendChild(createMenuLink(baselink_here+'&view=trade','Trade',0));
		var section = createMenuSection('baseMenuLinks');
		rmenu.appendChild(section);
		var w = section.childNodes[1];
		var l = 0;
		while (l=activebaseform.buttonToSelect(activebaseform.nextOptionName(), 0, 0)) {
			if (l.className) {
				l.style.color = "#C0C0C0";
				l.style.textDecoration = 'underline';
			}
			w.appendChild(l);
      node({tag: 'br', append: w});
		}
	} else {
		var section = createMenuSection('fleetMoveMenuLinks');
		rmenu.appendChild(section);
		var w = section.childNodes[1];
		var dests = listDests();
		if (getState('easyMoveFleetLink','')) {
			w.appendChild(createMenuLink(0,'[clear fleet]',clearFleet));
			w.appendChild(createMenuLink(getState('easyMoveFleetLink',''),getState('easyMoveFleetName',''),0));
		}
		if (dests.length)
			w.appendChild(createMenuLink(0,'[clear locs]',clearDests));
		var selectedDest = getState('easyMoveDestination','');
		for (var i=dests.length-1; i>=0; i--) {
			var l=createImageLink(0,img_target,clickDestination);
			l.className='saveDest';
			var wx = createMenuLink(serverurl+'map.aspx?loc='+dests[i],dests[i],0);
			wx.insertBefore(l, wx.link);
			w.appendChild(wx);
			l.name=dests[i];
			l.title='Save Dest';
			EventManager.Add(l, 'dblclick', doubleClickSaveDest);
			if (dests[i]==selectedDest) {
				l.style.backgroundColor = '#6666FF';
				wx.link.style.border="1px solid red";
			}
			else {
				l.style.color='black';
			}
			EventManager.Add(wx.link, 'mouseover', loadBasePopup);
			EventManager.Add(wx.link, 'mouseout', popupOnMouseOut);
		}
	}		
	document.body.appendChild(rmenu);
	EventManager.Add(document, 'scroll', repositionRightMenu);
}
function repositionLeftMenu() {
	lmenu.style.left = '2px';
	lmenu.style.top = String(document.body.scrollTop)+'px';
	galaxylinksmenu.style.left = '2px';
	galaxylinksmenu.style.top = String(lmenu.offsetHeight + document.body.scrollTop + 2)+'px';
}
function repositionRightMenu() {
	rmenu.style.right = '5px';
	rmenu.style.top = String(document.body.scrollTop)+'px';
}
function createMenuLink(url, text, onclick) {
	var wrap = document.createElement('div');
	var link = node({tag: 'a', href: url ? url : 'javascript:void(1);', text: text, append: wrap});
  if (onclick)
    EventManager.Add(link, 'click', onclick);
  node({tag: 'br', append: wrap});
	wrap.link = link;
	return wrap;
}
function createMenuSection(id) {
	var wrap = node({id: id});
	var header = node({tag: 'a', href: 'javascript:void(1);', text: 'V '+ id.replace('MenuLinks',''), className: 'menuSectionHeader',
    style: {display: 'block', color: '#7777FF'}});
  EventManager.Add(header, 'click', toggleMenuSection);
	var collapsible = node({className: 'menuSectionContent'});
	wrap.appendChild(header);
	wrap.appendChild(collapsible);
	if (!getState(id, 1))
		(toggleMenuSection.bind(header))();
	return wrap;
}
function toggleMenuSection() {
	var content = this.parentNode.childNodes[1];
	var id = this.parentNode.id;
	if (content.style.display=='none') {
		setState(id, 1);
		content.style.display='block';
		this.firstChild.nodeValue = 'V '+ id.replace('MenuLinks','');
	}
	else  {
		setState(id, 0);
		content.style.display='none';
		this.firstChild.nodeValue = '> '+ id.replace('MenuLinks','');
	}
}

//MAIN//
function resolveDuplicates(l) {
  var r=[];
  for (var i=0; i<l.length; i++) {
    var dupe=0;
    for (var j=0; j<r.length; j++) {
      if (l[i]==r[j]) {
        dupe=1;
        break;
      }
    }
    if (!dupe)
      r.push(l[i]);
  }
  return r;
}
function getLinkListUrls(l) {
  var r=[];
  for (var i=0; i<l.length; i++) {
    r.push(l[i][0].href);
  }
  return r;
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	SUB_MAP
//////////////////////////////////////////////////////////////////////////////////////////
function loadSmallGalMap(params) {
	var postvars = '?password='+dbase_pass+'&loc='+currentloc+'&databaseurl='+escape(dbase_url)+params;
	if (isscoutframechild)
		postvars += '&noSearch=1';
//		GM_xmlhttpRequest({
//				method: 'GET',
//				url: dbase_url+'aej_smallgalmap.php'+postvars,
//				onload: onLoadSmallGalMap,
//				headers: {'Content-type':'application/x-www-form-urlencoded; charset=UTF-8'}
//		});
}
var smallgalmap;
var smallgalmaptable;
function onLoadSmallGalMap(responseDetails) {
	function smallGalMapMouseHighlight(evt) {
		if (!(maphighlightbox && psmallmap))
			return;
		if (evt.pageX > pmap[0] && evt.pageX < pmap[0]+600 && evt.pageY > pmap[1] && evt.pageY < pmap[1]+600) {
			var x = Math.floor((evt.pageX-pmap[0]) / 60);
			var y = Math.floor((evt.pageY-pmap[1]) / 60);
			maphighlightbox.style.left = String(psmallmap[0] + (x*19))+'px';
			maphighlightbox.style.top = String(psmallmap[1] + (y*18)-1)+'px';
			maphighlightbox.style.display='block';
			maphighlightbox.style.width='18px';
			maphighlightbox.style.height='17px';
		}
		else if (evt.pageX > psmallmap[0] && evt.pageX < psmallmap[0]+190 && evt.pageY > psmallmap[1] && evt.pageY < psmallmap[1]+180) {
			var x = Math.floor((evt.pageX-psmallmap[0]) / 19);
			var y = Math.floor((evt.pageY-(psmallmap[1]-1)) / 18);
			maphighlightbox.style.left = String(pmap[0] + (x*60)+1)+'px';
			maphighlightbox.style.top = String(pmap[1] + (y*60)+1)+'px';
			maphighlightbox.style.display='block';
			maphighlightbox.style.width='59px';
			maphighlightbox.style.height='59px';
		}
		else maphighlightbox.style.display='none';
	}
	function repositionSmallGalMapWrap() {
		smallgalmap.style.left = String(document.body.clientWidth - smallgalmap.offsetWidth)+'px';
		smallgalmap.style.top = String((-1) + document.body.clientHeight + document.body.scrollTop - smallgalmap.offsetHeight)+'px';
		if (smallgalmaptable) {
			psmallmap = getElementPosition(smallgalmaptable);
		}
		redrawSubMapScoutHighlights();
		smallGalMapRegionHighlight();
	}
	function smallGalMapRegionHighlight() {
		if (maphighlightbox && pagetype=='mapRegion') {
			var x = parseInt(currentloc.slice(5,6));
			var y = parseInt(currentloc.slice(4,5));
			maphighlightbox.style.left = String(psmallmap[0] + (x*19))+'px';
			maphighlightbox.style.top = String(psmallmap[1] + (y*18)-1)+'px';
			maphighlightbox.style.display='block';
			maphighlightbox.style.width='18px';
			maphighlightbox.style.height='17px';
		}
	}
	function deleteSmallGalMapSearch() {		
		for (var key in systemdots) {
			document.body.removeChild(systemdots[key]);
		}
		systemdots = new Array();
		gm_sintensities = new Array();
		smallgalmap = $('smallgalmap');
		if (smallgalmap) {
			smallgalmap.parentNode.removeChild(smallgalmap);
			smallgalmaptable = 0;
			try {
				document.body.removeChild(maphighlightbox);
			}catch(e){}
			maphighlightbox = 0;
		}
		for (var i=0; i<systemlinks.length; i++) {
			var el = systemlinks[i][0].firstChild;
			if (el && el.nodeName=='IMG') {
				el.style.border='';
				el.title='';
			}
		}
	}
	function clearSmallGalMapSearch() {
		deleteSmallGalMapSearch();
		loadSmallGalMap('&clearSearch=1');
	}
	function smallGalMapSearch() {
		var params = '';
		var input_ids = ['owner','notowner','occupier','jumpgate','economy','turretmax','maxfleet','occupier','maxage'];
		for (var i=0; i<input_ids.length; i++) {
			params += '&'+input_ids[i]+'='+encodeURI($(input_ids[i]).value);
			params += '&'+input_ids[i]+'_blank=1';
		}		
		deleteSmallGalMapSearch();
		loadSmallGalMap(params);
	}
	function smallGalMapQuickJumpGates() {
		var params = '&quickJumpgates=1&overrideSearch=1';	
		var input_ids = ['owner','notowner','occupier','jumpgate','economy','turretmax','maxfleet','occupier','maxage'];
		for (var i=0; i<input_ids.length; i++) {
			params += '&'+input_ids[i]+'='+encodeURI($(input_ids[i]).value);
			params += '&'+input_ids[i]+'_blank=1';
		}
		deleteSmallGalMapSearch();
		loadSmallGalMap(params);
	}

	if (smallgalmap) {
		delete smallgalmap;
	}
	var map = interpretForumLogin(responseDetails.responseText);
	smallgalmap = node({id: 'smallgalmap', html: map, style: {position: 'absolute', visibility: 'hidden', top: '0px', left: '0px'}});
	document.body.appendChild(smallgalmap);
	smallgalmaptable = $('smallgalmaptable');
	if (pagetype=='mapGalaxy' || pagetype=='mapRegion') {
		if (!pmap) {
			var tds = document.getElementsByTagName('td');
			for (var i=0; i<tds.length; i++) {
				if (tds[i].className == 'td_reg') {
					pmap = getElementPosition(tds[i]);			
					break;
				}
			}
		}
		if (pagetype=='mapGalaxy' && pmap) {
			EventManager.Add(document, 'mousemove', smallGalMapMouseHighlight);
		}			
		maphighlightbox = node({style: {border: (isscoutframechild) ? '2px solid #FFFF00': '2px solid #33FF66', zIndex: String(zIndexes['mappositionhl']),
      position: 'absolute', display: 'none'}, append: document.body});
	}
	repositionSmallGalMapWrap();
	smallgalmap.style.visibility='visible';
	EventManager.Add(document, 'scroll', repositionSmallGalMapWrap);
	if (!isscoutframechild) {
		EventManager.Add($('submitMapSearch'), 'click', smallGalMapSearch);
		EventManager.Add($('clearSearchLink'), 'click', clearSmallGalMapSearch);
		EventManager.Add($('quickJumpgates'), 'click', smallGalMapQuickJumpGates);
	}
}
var pmap=0;
var psmallmap;
var maphighlightbox;
var mapscouthighlightlocs = new Array();
var submapscouthighlightboxes = new Array();
var darkenedWaypoints = new Array();
var jumpgatelevels = new Array();
var systemdots = new Array();
var gm_sintensities = new Array();
var mapscoutnextwp = '';
var mouseoverwp = '';
function setMapScoutHighlights(locs) {
	mapscouthighlightlocs = locs.split(',');
	redrawSubMapScoutHighlights();
}
function redrawSubMapScoutHighlights() {
	function onMouseOverWaypoint() {
		if (maphighlightbox && this.title.length > 6)
			maphighlightbox.style.visibility = 'hidden';
		mouseoverwp = this.name;
		setNextScoutWaypoint(mapscoutnextwp);
	}
	function onMouseOutWaypoint() {
		if (maphighlightbox)
			maphighlightbox.style.visibility = 'visible';
		mouseoverwp = '';
		setNextScoutWaypoint(mapscoutnextwp);
	}

	for (var i=0; i<submapscouthighlightboxes.length; i++) {
		document.body.removeChild(submapscouthighlightboxes[i]);
	}
	submapscouthighlightboxes = new Array();
	if (!(currentloc && psmallmap))
		return;
	if (!(pagetype=='mapGalaxy' && smallgalmaptable))
		return;	
	for (var i=0; i<mapscouthighlightlocs.length; i++) {
		var loc = mapscouthighlightlocs[i];
		if (loc.length!=12 && loc.length!=6)
			continue;	
		if (currentloc.slice(0,3) != loc.slice(0,3))
			continue;
    var x = parseInt(loc.slice(5,6));
    var y = parseInt(loc.slice(4,5));
    var box = node({tag: 'a', style: {border: '2px solid #00FFCC', zIndex: String(zIndexes['submapscouthl']+i), position: 'absolute', 
      left: String(psmallmap[0] + (x*19)+2)+'px', top: String(psmallmap[1] + (y*18)+1)+'px', display: 'block', width: '14px', height: '13px'}, 
      href: serverurl+'map.aspx?loc='+loc.slice(0,6), title: loc.slice(0,6), name: loc, append: document.body});
    EventManager.Add(box, 'mouseover', onMouseOverWaypoint);
    EventManager.Add(box, 'mouseout', onMouseOutWaypoint);
    submapscouthighlightboxes.push(box);		
    setNextScoutWaypoint(mapscoutnextwp);
	}
}
function darkenWaypointsToSkip(strlist) {
	darkenedWaypoints = new Array();
	var wps = strlist.split(',');
	for (var i=0; i<wps.length; i++) {
		darkenedWaypoints[wps[i]]=1;
	}
	setNextScoutWaypoint(mapscoutnextwp);
}
function setNextScoutWaypoint(loc) {
	mapscoutnextwp = loc;
	mloc = mouseoverwp;
	if (pagetype=='mapGalaxy') {
		for (var i=0; i<submapscouthighlightboxes.length; i++) {
			var el = submapscouthighlightboxes[i];
			if (el.name==mloc) {
				el.style.border = '2px solid #FFFFFF';
			}
			else if (el.name==loc) {
				if (darkenedWaypoints[el.name.slice(0,6)]) {
					el.style.border = '2px solid #990099';
				}
				else
					el.style.border = '2px solid #FF33FF';
			}
			else if (darkenedWaypoints[el.name.slice(0,6)]) {
				el.style.border = '2px solid #009966';
			}
			else {
				el.style.border = '2px solid #00FFCC';
			}
		}
	}
}
function createSystemDot(sloc) {
  window.setTimeout(function() {
    if (pagetype=='mapGalaxy' && pmap && getState('o_showMapDots',0)) {
      var i = gm_sintensities[sloc];
      i = gm_sintensities[sloc] = (i!=undefined) ? i+1 : 5;
      i = (i > 9) ? 9 : i;
      var colr = ['','8F','99','AC','CC','DD','EE','FF','FF','FF'][i];
      var colg = ['','00','00','00','00','00','00','33','66','99'][i];
      if (systemdots[sloc]) {
        systemdots[sloc].style.border = '2px solid #'+colr+colg+'00';
      } else {
        var x = (parseInt(sloc.slice(5,6))*60) + (parseInt(sloc.slice(8,9))*6);
        var y = (parseInt(sloc.slice(4,5))*60) + (parseInt(sloc.slice(7,8))*6);
        var box = node({tag: 'a', style: {border: '2px solid #'+colr+colg+'00', zIndex: String(zIndexes['systemdot']+i), position: 'absolute', 
          left: String(pmap[0] + (x)+2)+'px', top: String(pmap[1] + (y)+2)+'px', display: 'block', width: '0px', height: '0px'}, 
          href: serverurl+'map.aspx?loc='+sloc, append: document.body});
        systemdots[sloc]=box;
        EventManager.Add(box, 'mouseover', loadSystemPopup);
        EventManager.Add(box, 'mouseout', popupOnMouseOut);
      }
    }
  }, 0);
}
function createJumpGateDot(loc, level, owner) {
	if (pagetype=='mapGalaxy' && pmap) {
		var sloc = loc.slice(0,9);
		var i = gm_sintensities[sloc];
		if ((!i) || level >= i) {
			i = gm_sintensities[sloc] = level;
			i = (i > 9) ? 9 : i;
			var col = ['','008800','66AA00','99EE00','FFFF33','FF9900','FF4400','FF0088','FF33FF','FF99FF'][i];
			var title = 'JG Lvl '+level+' ('+loc+', '+owner+')';
			if (systemdots[sloc]) {
				systemdots[sloc].style.background = '#'+col;
				systemdots[sloc].name=loc;
				systemdots[sloc].title=title;
			} else {
				var x = (parseInt(sloc.slice(5,6))*60) + (parseInt(sloc.slice(8,9))*6);
				var y = (parseInt(sloc.slice(4,5))*60) + (parseInt(sloc.slice(7,8))*6);
				var box=createImageLink(0,img_target,clickDestination);
				box.className='saveDest';
				box.name=loc;
				box.title = title;
				box.style.background = '#'+col;
				box.style.zIndex=String(zIndexes['systemdot']+i);
				box.style.position='absolute';
				box.style.left = String(pmap[0] + (x)-1)+'px';
				box.style.top = String(pmap[1] + (y)-2)+'px';
				box.style.display='block';
				EventManager.Add(box, 'dblclick', doubleClickSaveDest);
				document.body.appendChild(box);
				systemdots[sloc]=box;
			}
		}
	}	
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	POPUPS
//////////////////////////////////////////////////////////////////////////////////////////
var numpopups = 0;
function createJavascriptPopup(htmlcontent,title,showclosebtn) {
  var pane = node({tag: 'table', style: {display: 'none', visibility: 'hidden', position: 'absolute', Zindex: String(zIndexes['popup']+ (numpopups++)), 
    top: '0px', left: '0px'}, className: 'infopane', append: document.body});
  
  if (showclosebtn || title) {
    var tr = node({tag: 'tr', append: pane}); 
    var td1 = node({tag: 'td', className: 'infopane_menu', html: title, append: tr}); 
    pane.titlewrap = td1;
  
    var td2 = node({tag: 'td', className: 'infopane_closebtn', style: {textAlign: 'right'}, append: tr}); 
    if (showclosebtn) {
     var pane_closebtn = node({tag: 'a', href: 'javascript:void(1);', text: '[x]', title: 'Close', append: td2});
     EventManager.Add(pane_closebtn, 'click', javascriptPopupCloseBtnCallback);
    }
  }
  var tr = node({tag: 'tr', html: '<td colspan="2" style="padding:0px;"><div class="infopane_content" style="overflow:auto;">'+htmlcontent+'</div></td>', append: pane}); 
  pane.contentwrap = tr.firstChild.firstChild;
  
  return pane;
}
function javascriptPopupCloseBtnCallback() {
  if (resultpage==this.parentNode.parentNode.parentNode)
    resultpage=0;
  if (infopup_root && infopup_root.pup && infopup_root.pup==this.parentNode.parentNode.parentNode)
    infopup_root.drop();
  try{document.body.removeChild(this.parentNode.parentNode.parentNode);}catch(e){}
}
function centerEl(el) {
  var panew = el.offsetWidth;
  var paneh = el.offsetHeight;
  
  var winw = window.innerWidth-20;
  var winh = window.innerHeight-20;
  
  el.style.top = String(window.pageYOffset + ((winh-paneh)/2))+'px';
  el.style.left = String(window.pageXOffset + ((winw-panew)/2))+'px';
}

var mouseX = 0;
var mouseY = 0;
function trackMouseMove(evt) {
  mouseX = evt.pageX;//: window.event.clientX + standardbody.scrollLeft;
  mouseY = evt.pageY;//: window.event.clientY + standardbody.scrollTop;
  popupOnMouseMove(evt);
}
EventManager.Add(document, 'mousemove', trackMouseMove);

var infopup_root = 0;
var infopup_loading_pause = 300;
function InfoPup(params) {//msg, url, trackelement, callback, borderelement, newborder, parent, loading_pause) {
  this.params = params;
  this.infopup_loading_pause = infopup_loading_pause;
  if (params.pause_length)
    this.infopup_loading_pause = params.pause_length;
  this.msg = params.msg;
  this.url = params.url;
  this.callback = params.callback;
  this.trackelement = params.trackelement;
  this.trackelement_mouseout = 0;
  this.borderelement = params.borderelement;
  this.newborder = params.newborder;
  this.originalborder = params.oldborder ? params.oldborder : '';
  if (this.borderelement && !params.oldborder)
   this.originalborder = this.borderelement.style.border;
  this.backgroundelement = params.backgroundelement;
  this.newbackground = params.newbackground;
  this.originalbackground = params.oldbackground ? params.oldbackground : '';
  if (this.backgroundelement && !params.oldbackground)
    this.originalbackground = this.backgroundelement.style.background;
  this.issticky = params.sticky;
  this.postdata = params.postdata ? params.postdata : '';
  this.post = (params.post ||params.postdata) ;
  this.infopup_parent = 0;
  this.infopup_child = 0;
  this.awaiting_content = 0;
  this.pup = 0;
  
  var found_parent = this.getParent();
  if (found_parent) {
    if (found_parent.infopup_child)
     found_parent.infopup_child.drop();
    this.infopup_parent = found_parent;
    found_parent.infopup_child = this;
  } else {
    if (infopup_root)
     infopup_root.drop();
    infopup_root = this;
  }
}
var doinfopupmousemove = 0;
setInterval(function() {doinfopupmousemove=1;}, 50);
function popupOnMouseMove(evt) {
  if (doinfopupmousemove) {
        doinfopupmousemove = 0;
    var p = infopup_root;
    while (p) {
     p.callback_mouseMove(evt);
     p = p.infopup_child;
    }
  }
}
function popupOnMouseOut(evt) {
  var p = infopup_root;
  while (p) {
    p.callback_mouseOut(this, evt);
    p = p.infopup_child;
  }
}
function popup(params) {
  if (params.url)
    new InfoPup(params).load();
  else if (params.msg)
    new InfoPup(params).setContent(params.msg);
  }
  Function.prototype.bind = function(object) {
    var func = this;
    return function() { return func.apply(object, arguments); }
}
function fleetDetailsOnMouseOver() {
  if (!getState('o_popupFleetInfo',0)) return;
  
  var url=this.name;
  if (url.indexOf(serverurl)==-1)
    url = serverurl+url;
  popup({ url:url, trackelement:this, callback:getFleetDetailsResponse, pause:1 });
}
function fleetDetailsOnClick() {
  popup({ url:this.name, trackelement:this, callback:getFleetDetailsResponse, pause:1 });
  }
  function getFleetDetailsResponse(responseText) {
  var fleetdetailspopup_re = new RegExp("<table[^>]*>(<tbody>)?<tr><th[^>]*><font[^>]*>O<\\/font>VERVIEW<\\/th><\\/tr>(.*?)<\\/table>",'i');
  var res = fleetdetailspopup_re.exec(responseText);
  if (res) 
    return(res[0]);
  else 
    return "no fleet data returned";
}
function guildDetailsOnMouseOver() {
  if (this.href.indexOf(serverurl)==-1)
    this.href = serverurl+this.href;
  popup({ url:this.href, trackelement:this, callback:guildDetailsResponse, pause:1, sticky:1, backgroundelement:this, newbackground:'#333399',oldbackground:'none' });
}
var guildprofilepopupdata;
function guildDetailsResponse(responseText) {
  var guild_data_re = new RegExp("<th[^>]*>([^<]*)</th></tr><tr><td[^>]*>[^<]*</td></tr><tr><td[^>]*><br[^>]*>(<b>Tag:</b>\\s+(\\[.*?\\])\\s.*?profile.aspx.player=[^\\d]?(\\d+).*?Members:[^\\d]+\\d+)", 'm');
  var res = guild_data_re.exec(responseText);
  if (res) {
    var tag = res[3];
    var gmid = res[4];
    guildprofilepopupdata = responseText.split(res[2])[1];
    guildprofilepopupdata = guildprofilepopupdata.split(/<\/th><td[^>]*>/mig)[1];
  //  guildprofilepopupdata = responseText.split(/<img[^>]*>*<br[^>]*><\/th><td[^>]*>/mig)[1];
    guildprofilepopupdata = guildprofilepopupdata.split(/<\/td><\/tr><tr><td[^>]*>[^<]*<\/td><\/tr><tr><td[^>]*>Homepage:/mig)[0];
    if (guildprofilepopupdata)
     guildprofilepopupdata = '<div class="popupprofile">'+guildprofilepopupdata+'</div>';
  
    var text = res[2].replace(tag,'<span style="color:#EEEE77">'+tag+'</span>');
    var funcs = '[<a href="messages.aspx?msg='+gmid+'">msg gm</a>]';
    funcs+= '<br>[<a href="'+dbase_url+'?do_clearSearch=1&owner='+encodeURIComponent(tag)+'">bases</a>]';
    if (guildprofilepopupdata)
     funcs +=    '<br>[<a href="javascript:void(1);" id="showguildprofilepopup">profile</a>]';
    this.setContent('<div class="playerpopup"><a style="display:block:float:left;" href="'+this.url+'">'+res[1]+'</a><div style="float:right;text-align:right">'+funcs+'</div><br><br>'+text+'</div>');
    if (guildprofilepopupdata) {
     EventManager.Add($('showguildprofilepopup'), 'click', guildProfilePopup);
     EventManager.Add($('showguildprofilepopup'), 'mouseout', popupOnMouseOut);
    }
  }
  else 
    return "guild data not found<br>try clicking the link";
}
function guildProfilePopup() {
  popup({ msg:guildprofilepopupdata, trackelement:this, backgroundelement:this, newbackground:'#333399',oldbackground:'none', sticky:1 });
}
function playerDetailsOnMouseOver() {
  if (!getState('o_popupUserInfo',0)) return;
  
  if (this.href.indexOf(serverurl)==-1)
    this.href = serverurl+this.href;
  popup({ url:this.href, trackelement:this, callback:playerDetailsResponse, pause:1, sticky:1, backgroundelement:this, newbackground:'#333399',oldbackground:'none' });
}
var playerprofilepopupdata = '';
function playerDetailsResponse(responseText) {
  var player_data_re = new RegExp("<th[^>]*>([^<]*)</th></tr><tr[^>]*><th[^>]*>[^<]*</th></tr><tr[^>]*><td[^>]*><br[^>]*>(<b>Player #[^\\d]+(\\d+).*?Account:.*?Account Start:[^\\d]+\\d+ days)");
  var res = player_data_re.exec(responseText);
  if (res) { 
    var name = res[1];
    var res2= split_guild_re.exec(name);
    if (res2) name = res2[2];
    playerprofilepopupdata = responseText.split(res[2])[1];
    playerprofilepopupdata = playerprofilepopupdata.split(/<\/th><td[^>]*>/mig)[1];
    playerprofilepopupdata = playerprofilepopupdata.split(/<\/td><\/tr><tr><td[^>]*>[^<]*<\/td><\/tr><tr><td[^>]*>Homepage:/mig)[0];
    if (playerprofilepopupdata)
     playerprofilepopupdata = '<div class="popupprofile">'+playerprofilepopupdata+'</div>';
  
    var text = res[2].replace(/<a[^>]*?href=.guild.aspx\?guild=(\d+)./, '<a href="'+serverurl+"guild.aspx?guild=$1\" id=\"popupguildlink\" ");
    var funcs = '[<a href="messages.aspx?msg='+res[3]+'">msg</a>]';
    funcs+= '<br>[<a style="color:#DDDDDD;" href="'+dbase_url+'?do_clearSearch=1&owner='+encodeURIComponent(name)+'">bases</a>]';
    if (playerprofilepopupdata)
     funcs +=    '<br>[<a href="javascript:void(1);" id="showplayerprofilepopup">profile</a>]';
    this.setContent('<div class="playerpopup"><a style="display:block:float:left;" href="'+this.url+'">'+res[1]+'</a><div style="float:right;text-align:right">'+funcs+'</div><br><br>'+text+'</div>');
    var guildlink = $('popupguildlink');
    if (guildlink) {
		  if (getState('o_popupGuildInfo',0))
				EventManager.Add(guildlink, 'mouseover', guildDetailsOnMouseOver);
			EventManager.Add(guildlink, 'mouseout', popupOnMouseOut);
    }
    if (playerprofilepopupdata) {
			EventManager.Add($('showplayerprofilepopup'), 'click', playerProfilePopup);
			EventManager.Add($('showplayerprofilepopup'), 'mouseout', popupOnMouseOut);
    }
  }
  else 
    return "player data not found<br>try clicking the link";
}
function playerProfilePopup() {
  popup({ msg:playerprofilepopupdata, trackelement:this, backgroundelement:this, newbackground:'#333399',oldbackground:'none', sticky:1 });
}
function playerSearchOnMouseOver(evt) {
  if (!getState('o_popupUserInfo',0)) return;
  
  var player_search_re = new RegExp("javascript:void\\(searchPlayer\\(\\'(.*?)\\'\\)\\)");
  var player_search_re2 = new RegExp("javascript:void\\(document.getElementById\\(\\'nick\\'\\).value = /(\[.*?\]|) ?(.*)/.exec\\(\\'(.*?)\\'\\)");
  var res = player_search_re.exec(this.href);
  if (!res) 
    res = player_search_re2.exec(this.href);
  if (res) {
    var fullname = name = res[1];
    var res2 = split_guild_re.exec(name);
    if (res2) {
     name = res2[2];
    }
    popup({ url:serverurl+'/contacts.aspx?action=search_player', postdata:'nick='+encodeURIComponent(name), trackelement:this, callback:playerSearchResponse, pause:1, sticky:1, cascade:1, fullplayername:fullname });
  }
}
function playerSearchResponse(responseText) {
  var player_results_re = new RegExp("Player\\(s\\) found:(<br[^>]*>)*(.*?)<br[^>]*></center></body></html>");
  var res = player_results_re.exec(responseText);
  if (res) {
    var split_player_links_re = new RegExp("<br[^>]*>");
    var links = res[2].split(split_player_links_re);
  
    var text = '<b>Search results:</b><br>';
    var exact_match = 0;
    for (var i=0; i<links.length; i++) {
     var res = link_re.exec(links[i]);
     if (decodeURIComponent(escape(this.params.fullplayername)) == res[2]) {
      var searchlink = this.params.trackelement;
      searchlink.href = serverurl+res[1];
      searchlink.style.background='#000055';
      this.close();
      popup({ url:searchlink.href, trackelement:searchlink, callback:playerDetailsResponse, pause:1, sticky:1, backgroundelement:searchlink, newbackground:'#333399',oldbackground:'none' });    
      EventManager.Add(searchlink, 'mouseover', playerDetailsOnMouseOver);
      return;
     }
     var link = '<a id="playerpopuplink'+i+'" style="color:#DDDDDD;white-space:nowrap;display:block;" href="'+serverurl+res[1]+'">'+res[2]+'</a>';
     text += link;
    }
    this.setContent('<div class="playerpopup">'+text+'</div>');
    for (var i=0; i<links.length; i++) {
     var link = $('playerpopuplink'+i);
     EventManager.Add(link, 'mouseover', playerDetailsOnMouseOver);
     EventManager.Add(link, 'mouseout', popupOnMouseOut);
    }
  }
  else return 'no results';
}
var staticinfopopup = 0;
function loadStaticInfo(url,params,x,y) {
  if (!getState('o_loadMissingInfo',0)) return;
  staticinfopopup = createJavascriptPopup('loading   ','',1);
  staticinfopopup.style.display='block';
  staticinfopopup.style.top = y+'px';
  staticinfopopup.style.left = x+'px';
  staticinfopopup.contentwrap.style.padding = '0px 3px';
  staticinfopopup.style.visibility='visible';
//  GM_xmlhttpRequest({
//     method: 'POST',
//     url: dbase_url+url,
//     headers: {'Content-type':'application/x-www-form-urlencoded'},
//     data: 'password='+dbase_pass+params,
//     onload: loadBaseDataOverlayResponse
//  });
}
function loadBaseDataOverlayResponse(responseDetails) {
  if (!responseDetails.responseText) return 'no results';
  var responseText = interpretForumLogin(responseDetails.responseText);
  staticinfopopup.contentwrap.innerHTML = responseText;
  addPlayerSearchLinkPopups();
}
function splitLocationLink(text) {
return text.replace(loc_components_re, '<a title="go to galaxy" id="splitlink_gal" href="'+serverurl+'fleet.aspx?gal=$4">$4</a><a title="go to region"  id="splitlink_reg" href="'+serverurl+'map.aspx?loc=$3">$5</a><a title="go to system" id="splitlink_sys" href="'+serverurl+'map.aspx?loc=$2">$6</a><a title="go to location" id="splitlink_loc" href="'+serverurl+'map.aspx?loc=$1">$7</a>');
}
function loadSystemPopup() {
  if (!getState('o_popupSystemInfo',0)) return;
  if (isWindowScanning()) return;
  
  var res = linktype_re.exec(this.href);
  if (res && res[4] && res[4].length==9) {
    borderelement = this;
    if (borderelement.firstChild && borderelement.firstChild.nodeName=='IMG')
     borderelement = borderelement.firstChild;
    newborder = "2px solid #333399";
    
    popup({ url: dbase_url+'dbhelper/aej_loadsysregioninfo.php',
     postdata: 'password='+dbase_pass+'&loc='+res[4]+'&pagetype='+pagetype,
     trackelement:this, 
     callback:onLoadSystemPopup, 
     pause:0, sticky:1, cascade:0,
     borderelement:borderelement, 
     newborder:newborder,
     headers: {
         'Accept': 'text/html',
         'Content-type':'application/x-www-form-urlencoded'
     },
     loc:res[4]
    });
  }
}
function onLoadSystemPopup(responseText) {
  if (!responseText) return 'no results';
  responseText = interpretForumLogin(responseText);
  if (responseText.indexOf('no bases found')!=-1) 
    responseText = '<.>'+this.params.loc+'</.><br>'+responseText;
  responseText = splitLocationLink(responseText);
  this.setContent(responseText);
  
  for (var i=0; i<100; i++) {
    var el = $('stickyloclink'+i);
    if (!el)
     break;
     
    var l=createImageLink(0,img_target,clickDestination);
    l.className='saveDest';
    l.name=el.innerHTML;
    l.title='Save Dest';
    EventManager.Add(l, 'dblclick', doubleClickSaveDest);
    if (l.name==getState('easyMoveDestination','')) {
     l.style.backgroundColor = '#6666FF';
    }
    el.parentNode.insertBefore(l,el);
  
    EventManager.Add(el, 'mouseover', loadBasePopup);
    EventManager.Add(el, 'mouseout', popupOnMouseOut);
  }
  addPlayerSearchLinkPopups();
}
function addPlayerSearchLinkPopups() {
  var links = document.getElementsByTagName('a');
  for (var i=0; i<links.length; i++) {
    var el = links[i];
    if ((!el.title) && el.href.indexOf('javascript:void(document.getElementById\'nick')) {
     if (res) {
      EventManager.Add(el, 'mouseover', playerSearchOnMouseOver);
      EventManager.Add(el, 'mouseout', popupOnMouseOut);
     }
    }
  }
}
function loadBasePopup() {
if (!getState('o_popupBaseInfo',0)) return;
if (isWindowScanning()) return;
var res = linktype_re.exec(this.href);
  if (res && res[4]) {
    popup({ url: dbase_url+'dbhelper/aej_loadlocinfo.php',
     postdata: 'password='+dbase_pass+'&loc='+res[4],
     trackelement:this, 
     callback:onLoadBasePopup, 
     pause:0, sticky:0, cascade:0,
     backgroundelement:this, 
     newbackground:'#333399',
     oldbackground:'none',
     headers: {'Accept': 'text/html','Content-type':'application/x-www-form-urlencoded'},
     loc:res[4]
    });
  }
}
function onLoadBasePopup(responseText) {
if (!responseText) return 'no results';
responseText = interpretForumLogin(responseText);
if (responseText.indexOf('no base found')!=-1) 
  responseText = '<.>'+this.params.loc+'</.><br>'+responseText;
responseText = splitLocationLink(responseText);
if (!this.infopup_parent) {
  this.issticky=1;
  this.setContent(responseText);
  addPlayerSearchLinkPopups();
  EventManager.Add($('splitlink_sys'),'mouseover',loadSystemPopup);
  EventManager.Add($('splitlink_sys'),'mouseoout',popupOnMouseOut);
  $('splitlink_sys').title = '';
} else
  return responseText;
}
function loadNameBasePopup() {
  if (!getState('o_popupNameBaseInfo',0)) return;
  if (isWindowScanning()) return;
  var res = linktype_re.exec(this.href);
  if (res && res[4]) {
    popup({ url: serverurl+'base.aspx?base='+res[4],
     trackelement:this, 
     callback:onLoadNameBasePopup, 
     pause:0, sticky:0, cascade:0,
     backgroundelement:this, 
     newbackground:'#333399',
     oldbackground:'none',
     headers: {'Accept': 'text/html','Content-type':'application/x-www-form-urlencoded'}
    });
  }
}
function onLoadNameBasePopup(responseText) {
  if (!responseText) return 'no results';
  if (!this.infopup_parent) {
    this.issticky=1;
		var startLoc = responseText.indexOf("<a href='map.aspx?loc=",0);
		if (startLoc == -1) return "You must be logged in before.";
		var html = responseText.substring(startLoc, startLoc+52)+"<br />";
		var endArea = responseText.indexOf("</td><td>",startLoc+61);
		html += "Area : "+responseText.substring(startLoc+61, endArea)+"<br />"
		var endEnergy = responseText.indexOf("</td><td>",endArea+9);
		html += "Energy : "+responseText.substring(endArea+9, endEnergy)+"<br />"
		var endPopulation = responseText.indexOf("</td><td>",endEnergy+9);
		html += "Population : "+responseText.substring(endEnergy+9, endPopulation)+"<br />"
		var endTradeRoute = responseText.indexOf("</td></tr>",endPopulation+9);
		html += "Trade Route : "+responseText.substring(endPopulation+9, endTradeRoute)+"<br />"
		html += "<br />"
		var startConstruction = responseText.indexOf("<td>Construction</td><td>",0)+25;
		html += "Construction : "+responseText.substring(startConstruction, responseText.indexOf("</td><td>cred./h</td>",startConstruction))+"<br />"
		var startProduction = responseText.indexOf("<td>Production</td><td>",0)+23;
		html += "Production : "+responseText.substring(startProduction, responseText.indexOf("</td><td>cred./h</td>",startProduction))+"<br />"
		var startResearch = responseText.indexOf("<td>Research</td><td>",0)+21;
		html += "Research : "+responseText.substring(startResearch, responseText.indexOf("</td><td>cred./h</td>",startResearch))+"<br />"
    responseText = html;
    this.setContent(responseText);
  }
}
function structuresQueueOnMouseOver() {
  if (!getState('o_popupQueue',0)) return;
  if (isWindowScanning()) return;
  popup({ url: this.href,
   trackelement:this,
   callback:onLoadStructuresQueue, 
   pause:0, sticky:0, cascade:0,
   backgroundelement:this, 
   newbackground:'#333399',
   oldbackground:'none',
   headers: {'Accept': 'text/html','Content-type':'application/x-www-form-urlencoded'}
  });
}
function onLoadStructuresQueue(responseText) {
  if (!responseText) return 'No results';
  if (!this.infopup_parent) {
    this.issticky=1;
    if (responseText.indexOf("<title>Astro Empires - Login</title>", 0) != -1)
      return "You must be logged in before.";
    startQueue = responseText.indexOf("<th colspan='2'>Construction Queue</th></tr><tr align='center'><form action='base.aspx?base=", 0);
    if (startQueue != -1) return "No Queue.";
    startQueue = responseText.indexOf("<tr><th colspan='2'>Construction Queue</th>", 0);
    endQueue = responseText.indexOf("<tr align='center'><form action='base.aspx?base=", 0);
    if (endQueue == -1) endQueue = responseText.indexOf("</table></body></html>", 0);
    responseText = "<table align='center' width='150'>"+responseText.substring(startQueue, endQueue)+"</table>";
    this.setContent(responseText);
  }
}
function productionQueueOnMouseOver() {
  if (!getState('o_popupQueue',0)) return;
  if (isWindowScanning()) return;
  popup({ url: this.href,
   trackelement:this,
   callback:onLoadProductionQueue, 
   pause:0, sticky:0, cascade:0,
   backgroundelement:this, 
   newbackground:'#333399',
   oldbackground:'none',
   headers: {'Accept': 'text/html','Content-type':'application/x-www-form-urlencoded'}
  });
}
function onLoadProductionQueue(responseText) {
  if (!responseText) return 'No results';
  if (!this.infopup_parent) {
    this.issticky=1;
    if (responseText.indexOf("<title>Astro Empires - Login</title>", 0) != -1)
      return "You must be logged in before.";
    startQueue = responseText.indexOf("<tr><th colspan='3'>Production</th>", 0);
    if (startQueue == -1) return "No Queue.";
    endQueue = responseText.indexOf("</tr></table><SCRIPT", 0);
    if (endQueue == -1) endQueue = responseText.indexOf("</table></body></html>", 0);
    responseText = "<table align='center' width='200'>"+responseText.substring(startQueue, endQueue)+"</table>";
    this.setContent(responseText);
  }
}
function researchQueueOnMouseOver() {
  if (!getState('o_popupQueue',0)) return;
  if (isWindowScanning()) return;
  popup({ url: this.href,
   trackelement:this,
   callback:onLoadResearchQueue,
   pause:0, sticky:0, cascade:0,
   backgroundelement:this,
   newbackground:'#333399',
   oldbackground:'none',
   headers: {'Accept': 'text/html','Content-type':'application/x-www-form-urlencoded'}
  });
}
function onLoadResearchQueue(responseText) {
  if (!responseText) return 'No results';
  if (!this.infopup_parent) {
    this.issticky=1;
    if (responseText.indexOf("<title>Astro Empires - Login</title>", 0) != -1)
      return "You must be logged in before.";
    if (responseText.lastIndexOf("You must build Research Labs first") != -1)
      return "No Research Labs.";
    startQueue = responseText.indexOf("<th colspan='2'>Research Queue</th></tr><tr align='center'><form action='base.aspx?base=", 0);
    if (startQueue != -1) return "No Queue.";
    startQueue = responseText.indexOf("<tr><th colspan='2'>Research Queue</th>", 0);
    endQueue = responseText.indexOf("<tr align='center'><form action='base.aspx?base=", 0);
    if (endQueue == -1) endQueue = responseText.indexOf("</table></body></html>", 0);
    responseText = "<table align='center' width='150'>"+responseText.substring(startQueue, endQueue)+"</table>";
    this.setContent(responseText);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	EVENTS_ENHANCEMENTS
//////////////////////////////////////////////////////////////////////////////////////////
function productionHelperOnClick() {
	var el = this.previousSibling;
	while (el && el.nodeName.toLowerCase() != 'input')
		el = el.previousSibling;
	if (el) {
		el.value = (parseInt(el.value) + parseInt(this.name)); 
    calculateTotals();
	}
}
function prodHelperEvent(e) {
  if (e.shiftKey && (e.target.name == 'fast')) {
    for (i=0; i<empireLinks.length; i=i+2) {
      $("fast_"+empireLinks[i]).checked = e.target.checked;
    }
  } else if (e.shiftKey && (e.target.name == 'unit')) {
    e.target.blur();
    for (i=0; i<empireLinks.length; i=i+2) {
      $("unit_"+empireLinks[i]).selectedIndex = e.target.selectedIndex;
    }
  } else if (e.shiftKey && (e.target.name == 'quant')) {
    e.target.blur();
    for (i=0; i<empireLinks.length; i=i+2) {
      $("quant_"+empireLinks[i]).value = e.target.value;
    }
  }
  if ((e.target.name == 'fast')||(e.target.name == 'unit')||(e.target.name == 'quant'))
    calculateTotals();
}
function calculateTotals() {
	var pcost = 0;
  for (i=0; i<empireLinks.length; i=i+2) {
    n = ($("fast_"+empireLinks[i]).checked) ? 2 : 1;
    pcost += parseInt(ProductionGetCost[$("unit_"+empireLinks[i]).selectedIndex] * $("quant_"+empireLinks[i]).value * n);
	}
	$('cost_all').innerHTML = pcost+' credits';
	var credits_left = parseInt(numcredits) - pcost;
	$('cost_all').style.color = (credits_left < 0) ? 'red' : '';
}
function resetForm() {
  for (i=0; i<empireLinks.length; i=i+2) {
    $("unit_"+empireLinks[i]).selectedIndex = 0;
    $("fast_"+empireLinks[i]).checked = false;
    $("quant_"+empireLinks[i]).value = 0;
    calculateTotals();
  }
}
function startSubmitQueue() {
  submitQueue(0);
}
function submitQueue(i) {
    if ($("quant_"+empireLinks[i]).value != 0) {
      var postData = $("unit_"+empireLinks[i]).value+"="+$("quant_"+empireLinks[i]).value+"&post_back=true";
      if ($("fast_"+empireLinks[i]).checked)
        postData += "&fast=true";
      $("quant_"+empireLinks[i]).value = 'ok';
      $("quant_"+empireLinks[i]).style.backgroundColor = 'red';
      GM_xmlhttpRequest({
        method: "POST",
        url: serverurl+"base.aspx?base="+empireLinks[i]+"&view=production",
        data: encodeURI(postData),
        headers:{'Content-type':'application/x-www-form-urlencoded'},
     		onreadystatechange: function(xhr) {if (xhr.readyState == "4") {endSubmitQueue(i);}}
      });
    } else {
      endSubmitQueue(i);
    }
}
function endSubmitQueue(i) {
  if (i == empireLinks.length-2)
    window.setTimeout(reloadPage, 500);
  else
    submitQueue(i+2);
}
function productionHelper() {
  var btn_details = [];
  btn_details.push([1,' +1 ',highlightParentRowBlue]);
  btn_details.push([10,' +10 ',highlightParentRowGreen]);
  btn_details.push([100,'+100 ',highlightParentRowRed]);
  btn_details.push([1000,'+1k ',highlightParentRowOrange]);
  table.rows[1].childNodes[4].innerHTML = 'Fast Prod';
  table.rows[1].childNodes[5].innerHTML = 'Unit Type';
  table.rows[1].childNodes[6].innerHTML = 'Quantity';
  for (i=2; i<table.rows.length; i=i+2) {
    var currentRow = table.rows[i];
		var res = /\?base=(\d+)/.exec(table.rows[i].childNodes[0].firstChild.href);
	  table.rows[i+1].style.display = 'none';
    currentRow.childNodes[4].innerHTML = "<input type='checkbox' name='fast' class='check' id='fast_"+res[1]+"' />";
    currentRow.childNodes[6].innerHTML = "<input type='text' name='quant' class='quant' id='quant_"+res[1]+"' size='5' maxlength='5' value='0' />";
    var html = "<select name='unit' id='unit_"+res[1]+"'><option value='Fighters'>Fighters</option><option value='Bombers'>Bombers</option>";
    html += "<option value='Heavy Bombers'>Heavy Bombers</option><option value='Ion Bombers'>Ion Bombers</option><option value='Corvette'>Corvette</option>";
    html += "<option value='Recycler'>Recycler</option><option value='Destroyer'>Destroyer</option><option value='Frigate'>Frigate</option>"
    html += "<option value='Ion Frigate'>Ion Frigate</option><option value='Scout Ship'>Scout Ship</option><option value='Outpost Ship'>Outpost Ship</option>";
    html += "<option value='Cruiser'>Cruiser</option><option value='Carrier'>Carrier</option><option value='Heavy Cruiser'>Heavy Cruiser</option>";
    html += "<option value='Battleship'>Battleship</option><option value='Fleet Carrier'>Fleet Carrier</option><option value='Dreadnought'>Dreadnought</option>";
    html += "<option value='Titan'>Titan</option><option value='Leviathan'>Leviathan</option><option value='Death Star'>Death Star</option></select>";
    currentRow.childNodes[5].innerHTML = html;
    EventManager.Add($("unit_"+res[1]), 'change', prodHelperEvent, true);
    EventManager.Add(document, 'click', prodHelperEvent, true);
    for each( items in btn_details ) {
      var num = items[0];
      var lx = createLink(0,items[1],blankCallback);
      var l = createLink(0,items[1],productionHelperOnClick);
      l.name = String(num);
      lx.className = 'prodIncBtnOff';
      l.className = 'prodIncBtn';
      EventManager.Add(lx,'mouseover',highlightParentRowGreen);
      EventManager.Add(lx,'mouseout',leaveParentRow);
      EventManager.Add(l,'mouseover',items[2]);
      EventManager.Add(l,'mouseout',leaveParentRow);
      currentRow.childNodes[6].appendChild(lx);
      lx.style.display='none';
      currentRow.childNodes[6].appendChild(l);
    }
  }
  node({tag: 'tr', html: "<th colspan='7' class='help' align='right' id='cost_all'>0 credits</th>", append: table});
  node({tag: 'tr', html: "<th colspan='7' align='right'><input type='reset' id='resetButton' value='Reset' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='hidden' name='post_back' value='true' /><input type='submit' id='submitButton' value='Submit' /></th>", append: table});
  EventManager.Add($("submitButton"), 'click', startSubmitQueue);
  EventManager.Add($("resetButton"), 'click', resetForm);
}
function productionHelperButton() {
  if (getState('o_productionHelper',0) && ((location.search.indexOf('view=')==-1) || (location.search.indexOf('view=bases_events')!=-1))) {
		table = document.evaluate( "//th[@class='th_header2']/../..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		table.firstChild.style.display='none';
		var prodTitle = table.childNodes[1].childNodes[5];
		var link = node({tag: 'a', href: 'javascript:void(1);', className: 'ProdHelper', name: 'ProdHelper', title: 'Prod. Helper', before: prodTitle.firstChild});
		node({tag: 'img', src: img_eye, append: link});
		EventManager.Add(link, 'click', productionHelper);
	}
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	ENHANCE_TIME
//////////////////////////////////////////////////////////////////////////////////////////
Date.prototype.format = function(format) {
  var returnStr = '';
  var replace = Date.replaceChars;
  for (var i = 0; i < format.length; i++) {
    var curChar = format.charAt(i);
    if (replace[curChar])
      returnStr += replace[curChar].call(this);
    else
      returnStr += curChar;
   }
   return returnStr;
};

Date.replaceChars = {
shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

// Day
d: function() { return (this.getDate() < 10 ? '0' : '') + this.getDate(); },
D: function() { return Date.replaceChars.shortDays[this.getDay()]; },
j: function() { return this.getDate(); },
l: function() { return Date.replaceChars.longDays[this.getDay()]; },
N: function() { return this.getDay() + 1; },
S: function() { return (this.getDate() % 10 == 1 && this.getDate() != 11 ? 'st' : (this.getDate() % 10 == 2 && this.getDate() != 12 ? 'nd' : (this.getDate() % 10 == 3 && this.getDate() != 13 ? 'rd' : 'th'))); },
w: function() { return this.getDay(); },
// Month
F: function() { return Date.replaceChars.longMonths[this.getMonth()]; },
m: function() { return (this.getMonth() < 11 ? '0' : '') + (this.getMonth() + 1); },
M: function() { return Date.replaceChars.shortMonths[this.getMonth()]; },
n: function() { return this.getMonth() + 1; },
// Year
Y: function() { return this.getFullYear(); },
y: function() { return ('' + this.getFullYear()).substr(2); },
// Time
a: function() { return this.getHours() < 12 ? 'am' : 'pm'; },
A: function() { return this.getHours() < 12 ? 'AM' : 'PM'; },
g: function() { return this.getHours() == 0 ? 12 : (this.getHours() > 12 ? this.getHours() - 12 : this.getHours()); },
G: function() { return this.getHours(); },
h: function() { return (this.getHours() < 10 || (12 < this.getHours() < 22) ? '0' : '') + (this.getHours() < 10 ? this.getHours() + 1 : this.getHours() - 12); },
H: function() { return (this.getHours() < 10 ? '0' : '') + this.getHours(); },
i: function() { return (this.getMinutes() < 10 ? '0' : '') + this.getMinutes(); },
s: function() { return (this.getSeconds() < 10 ? '0' : '') + this.getSeconds(); },
// Timezone
O: function() { return (this.getTimezoneOffset() < 0 ? '-' : '+') + (this.getTimezoneOffset() / 60 < 10 ? '0' : '') + (this.getTimezoneOffset() / 60) + '00'; },
Z: function() { return this.getTimezoneOffset() * 60; },
// Full Date/Time
r: function() { return this.toString(); },
U: function() { return this.getTime() / 1000; }
};
function enhanceTime() {
  var n=1;
  while(elem = $('time'+n)) {
    elem.id = 'newtime'+n;
    s=elem.title;
    var newElement, endTime;
    var d = new Date();
    var now = new Date();
    if (elem) {
       if(s<=0) {
         endTime="-"
       } else {
         d.setTime(d.getTime()+(s*1000));
         if(now.getDate() == d.getDate()) {
            endTime="Today @ "+d.format(' G:i');
         } else if(now.getDate()+1 == d.getDate()) {
            endTime="Tomorrow @ "+d.format(' G:i');
         } else {
            endTime=d.format('D, jS @ G:i');
         }
         if (getState('o_colorTime',0)) {
          elem.style.color = getAgeCol(s);
         }
       }
       elem.innerHTML = "<b><span id='time"+n+"' title='"+ s +"'>-</span></b><br><nobr><span style='font-size: xx-small'>" + endTime + "</span></nobr>"
    }
    n++;
  }
  if ((pagetype == "fleets")||(pagetype == "mapGalaxy")||$('myCanvas'))
    $("myCanvas").style.top = parseInt($("myCanvas").style.top) + (n-1)*12 + 'px';
}
function getAgeCol(age) {
		var col = '#4444aa';
		if (age <3600)
			col = '#ccccff';
		else if (age <5400)
			col = '#bbbbf7';
		else if (age <7200)
			col = '#aaaaee';
		else if (age <14400)
			col = '#9999dd';
		else if (age <28800)
			col = '#8888cc';
		else if (age <57600)
			col = '#7777c7';
		else if (age <86400)
			col = '#6666bb';
		else if (age <172800)
			col = '#5555b6';
		return col;
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module	ENHANCE_TRADE
//////////////////////////////////////////////////////////////////////////////////////////
var tradeNames = new Array();
var tradeNodes = new Array();
function checkTradePage() {
	function highlightTrade(nameToFind) {
		var item;
		for (var i = 0; i < tradeNodes.length; i++) {
			item = tradeNodes[i];
			if(item.innerHTML == nameToFind) {
				item.style.color = 'red';
				item.innerHTML = item.innerHTML + ' (Duplicate)';		
			}
		}
	}
	var allNames, thisName, lastName;
	allNames = document.evaluate( "//small[@class='gray']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var saveData = "";
	for (var i = 0; i < allNames.snapshotLength; i++) {
		if(i%2==1) {
			thisName = allNames.snapshotItem(i);
			tradeNames.push(thisName.innerHTML);
			tradeNodes.push(thisName);
			saveData = thisName.innerHTML+";"+saveData;
		}
	}
	setState('tradePartners',escape(saveData));
	tradeNames.sort();
	for (var i = 1; i < tradeNames.length; i++) {
		console.log("tradeName : "+escape(tradeNames[i]));
		thisName = tradeNames[i];
		lastName = tradeNames[i-1];
		if(thisName == lastName) {
			highlightTrade(thisName);
		}
	}
}
function findPoorTrades() {
	var rows = document.evaluate( "//table[4]//tr[@align='center']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null); 
	var upperThreshold = getState("poorTradeUpperThreshold",10);
	var lowerThreshold = getState("poorTradeLowerThreshold",10);
	for (var i = 0; i < rows.snapshotLength; i++) {
		var eco1Cell = document.evaluate( "td[3]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
		var eco2Cell = document.evaluate( "td[4]", rows.snapshotItem(i), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0); 
		var eco1 = parseInt(eco1Cell.innerHTML);
		var eco2 = parseInt(eco2Cell.innerHTML);
		if(eco2 - eco1 > upperThreshold) {
			eco2Cell.style.color = "orange";
		}
		if(eco2 - eco1 < -1*lowerThreshold) {		
			eco2Cell.style.color = "red";
		}
	}
}
function insertToggleLink() {
	function toggleBasesWithFullTrades() {
		var table = document.evaluate( "//th[@class='th_header2']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode.parentNode;
		var string = "";
		rows = table.childNodes;
		for(var i=2;i<rows.length - 1;i++){	
			var location = rows[i].childNodes[1].firstChild.textContent;
			var economy = rows[i].childNodes[2].textContent;
			var routesString = rows[i].childNodes[3].firstChild.textContent;
			var routes = parseInt(routesString.split(" / ")[0]); 
			var totalRoutes = parseInt(routesString.split(" / ")[1]);
			if(routes == totalRoutes){
				rows[i].style.display = hideTradeRows?  "":"none";
				rows[i].style.visibility = hideTradeRows?  "":"hidden";
			}
		}
		hideTradeRows = !hideTradeRows;
		document.getElementById("hideTradesLink").textContent = hideTradeRows? "Show all":"Hide full trades";
	}
	var lastRow = document.evaluate( "//th[@class='th_header2']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.parentNode.parentNode.lastChild;
	var a = node({tag: 'a', href: 'javascript:void(1);', id: 'hideTradesLink', text: "Hide full trades", append: lastRow.firstChild});
	EventManager.Add(a, 'click',toggleBasesWithFullTrades);
}
var hideTradeRows = false;

//////////////////////////////////////////////////////////////////////////////////////////
// @module : STATS
//////////////////////////////////////////////////////////////////////////////////////////
function playerStats() {
	var playerRow = document.evaluate( "//td[text()='"+myuserid+"']/..", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	if (!playerRow)
		return;
  var q = "player#@#"+playerRow.childNodes[2].firstChild.innerHTML
		+"#@#"+playerRow.childNodes[4].innerHTML
		+"#@#"+playerRow.childNodes[5].innerHTML
		+"#@#"+parseInt(playerRow.childNodes[6].innerHTML)/1000
		+"#@#"+parseInt(playerRow.childNodes[7].innerHTML)/1000
		+"#@#"+parseInt(playerRow.childNodes[8].innerHTML)/1000
		+"#@#"+myuserid;
	queries.push(q);
	postData();
}
function saveCombatReport() {
	var t = this.parentNode.previousSibling;
	var tsize = t.firstChild.childNodes.length;
	var t1 = this.parentNode.nextSibling;
	var t2 = this.parentNode.nextSibling.nextSibling.nextSibling;
  var q = "combat#@#"+myuserid
		+"#@#"+t.firstChild.childNodes[1].lastChild.lastChild.innerHTML
		+"#@#"+t.firstChild.childNodes[2].lastChild.innerHTML
		+"#@#"+t.firstChild.childNodes[4].lastChild.firstChild.innerHTML
		+"#@#"+t.firstChild.childNodes[5].lastChild.firstChild.data;
	for (var i=6; i<t.firstChild.childNodes.length; i++) {
		if (t.firstChild.childNodes[i].firstChild.innerHTML == "Defensive Force") {
			if (i == 6) {
				q += "#@#"
					+"#@#";
			}
			if (i == 7) {
				q += "#@#";
			}
			break;
		}
		q += "#@#"+t.firstChild.childNodes[i].lastChild.innerHTML;
	}
	q += "#@#"+t.firstChild.childNodes[i+1].lastChild.firstChild.innerHTML
		+"#@#"+t.firstChild.childNodes[i+2].lastChild.firstChild.data;
	for (var j=i+3; j<t.firstChild.childNodes.length; j++) {
		if (t.firstChild.childNodes[j].firstChild.innerHTML == "Start Defenses") {
			continue;
		}
		if (t.firstChild.childNodes[j].firstChild.innerHTML == "End Defenses") {
			continue;
		}
		q += "#@#"+t.firstChild.childNodes[j].lastChild.innerHTML;
	}
	if (j == 9) {
		q += "#@#"
	  	+"#@#"
			+"#@#";
	}
	if (j == 10) {
		q += "#@#"
		  +"#@#";
	}
	if (j == 13) {
		q += "#@#";
	}
	for (var i=2; i<t1.firstChild.childNodes.length; i++) {
		if (i==2)
			q += "#@#";
		else
			q += "@##@";
		q += t1.firstChild.childNodes[i].childNodes[0].innerHTML
			+"@#@"+t1.firstChild.childNodes[i].childNodes[1].innerHTML
			+"@#@"+t1.firstChild.childNodes[i].childNodes[2].innerHTML
			+"@#@"+t1.firstChild.childNodes[i].childNodes[3].innerHTML
			+"@#@"+t1.firstChild.childNodes[i].childNodes[4].innerHTML
			+"@#@"+t1.firstChild.childNodes[i].childNodes[5].innerHTML;
	}
	for (var i=2; i<t2.firstChild.childNodes.length; i++) {
		if (i==2) {
			q += "#@#";
		} else {
			q += "@##@";
		}
		q += t2.firstChild.childNodes[i].childNodes[0].innerHTML
			+"@#@"+t2.firstChild.childNodes[i].childNodes[1].innerHTML
			+"@#@"+t2.firstChild.childNodes[i].childNodes[2].innerHTML
			+"@#@"+t2.firstChild.childNodes[i].childNodes[3].innerHTML
			+"@#@"+t2.firstChild.childNodes[i].childNodes[4].innerHTML
			+"@#@"+t2.firstChild.childNodes[i].childNodes[5].innerHTML;
	}
	if (i==2) {
		q += "#@#";
	}
	var infos = this.parentNode.parentNode;
	var isize = infos.childNodes.length;
	switch (isize) {
	  case 9:
			q += "#@#"+infos.childNodes[7].firstChild.innerHTML
			+"#@#"+infos.lastChild.innerHTML
			+"#@#"
			+"#@#";
		break;
	  case 11:
			q += "#@#"+infos.childNodes[7].firstChild.innerHTML
			+"#@#"+infos.childNodes[8].innerHTML
			+"#@#"+infos.lastChild.innerHTML
			+"#@#";
	  break;
	  case 13:
			q += "#@#"+infos.childNodes[7].firstChild.innerHTML
			+"#@#"+infos.childNodes[8].innerHTML
			+"#@#"+infos.childNodes[10].innerHTML
			+"#@#"+infos.lastChild.innerHTML
		break;
		default:
		break;
	}
	queries[0] = q;
	postData();
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module : FLEET_LANDING
//////////////////////////////////////////////////////////////////////////////////////////
var fleetData = new Array(); //[guild],[incoming],[landed],[incoming today]
var guildSummed = false;
function commaFormat(amount){
	var delimiter = ",";
		amount = ""+amount;
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d==undefined || d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}
function sumFleets() {
	function getGuild(name){
			var regex = /\[.*?\]/;
			result = regex.exec(name);
			if(result)
				return result[0];
			else return name;
	}

	var rows = document.evaluate("//th[@colspan='4' and text()='Fleets']",document,null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
	if(!rows)
		return;
	rows = rows.parentNode.parentNode.childNodes;
	var formatNumbers = true;
	var addFleets = true;
	var now = new Date(), future = new Date();
	for(var i=2;i<rows.length;i++) {
		var row = rows[i];
		var size = parseInt(row.childNodes[3].firstChild.textContent);
		if(formatNumbers)
		row.childNodes[3].firstChild.textContent = commaFormat(size);
		if(addFleets) {
			var player = row.childNodes[1].firstChild.textContent;
			var arrivalTimeCell = row.childNodes[2];
			var guild = getGuild(player);
			var incoming = (arrivalTimeCell.childNodes.length > 0);
			var incomingToday = false;
			row.setAttribute("guild",guild);
			if((arrivalTimeCell.id.indexOf('time') != -1 || arrivalTimeCell.id.indexOf('checked') != -1) && (parseInt(arrivalTimeCell.title) >= 0) ) {
				var time = arrivalTimeCell.title;
				future.setTime(now.getTime() + (time * 1000));
				incomingToday = (future.getDate() - now.getDate() == 0);
			}
			var incomingSize = incoming? size:0;
			var incomingTodaySize = incomingToday? size:0;
			addFleetSize(guild,size,incomingSize,incomingTodaySize);
		}
	}
	if(addFleets) {
		if(guildSummed)
		insertFleetSummary();
	}
}
function addFleetSize(guild,size,incomingSize,incomingTodaySize) {
	for(var i=0;i<fleetData.length;i++) {
		if(fleetData[i][0]==guild) {
			if(incomingSize==0)
			fleetData[i][1] = (fleetData[i][1] + size);
			fleetData[i][2] = (fleetData[i][2] + incomingSize);
			fleetData[i][3] = (fleetData[i][3] + incomingTodaySize);
			guildSummed = true;
			return;
		}
	}
	if(incomingSize==0)
		fleetData[fleetData.length] = new Array(guild,size,0,0);
	else
		fleetData[fleetData.length] = new Array(guild,0,incomingSize,incomingTodaySize);
}
function insertFleetSummary() {
	var html = "<tr><th colspan='5'>Fleet Summary</th></tr><tr><th style='color:gold'>Guild</th><th style='color:gold'>Incoming (Today)</th><th style='color:gold'>Landed</th><th style='color:gold'>Total Fleet Size</th><th/></tr>"
	var style="";
	var incoming,arrived,incomingToday,total;
	var formatNumbers = true;
	for(var i=0;i<fleetData.length;i++) {
		incoming = fleetData[i][2];
		arrived = fleetData[i][1];
		total = fleetData[i][1] + fleetData[i][2];
		incomingToday = fleetData[i][3];
		if(formatNumbers) {
			incoming = commaFormat(incoming);
			arrived = commaFormat(arrived);
			incomingToday = commaFormat(incomingToday);
			total = commaFormat(total);
		}
		html = html+"<tr align='center' "+style+"><td>"+fleetData[i][0]+"</td><td>"+incoming+" ("+incomingToday+")</td><td>"+arrived+"</td><td>"+total+"</td><td><a id='showHide"+fleetData[i][0]+"' href='javascript: void(0)'>Hide</a></td></tr>";
	}
	var newTable = document.createElement("table");
	newTable.setAttribute("width","600");
	newTable.setAttribute("align","center");
	newTable.innerHTML = html;
	var table = document.evaluate("//th[@colspan='4' and text()='Fleets']",document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue.parentNode.parentNode.parentNode;
	document.body.insertBefore(newTable,table);
	var br = document.createElement("br");
	document.body.insertBefore(br,table);
	for(var i=0;i<fleetData.length;i++) {
		var link = document.getElementById("showHide"+fleetData[i][0]);
		link.addEventListener('click',getShowHideFleetClosure(fleetData[i][0]),true);
	}
}
function getShowHideFleetClosure(guild) {
	function func(){
		var guildRows = document.evaluate("//tr[@guild='"+guild+"']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
		for (var i = 0; i < guildRows.snapshotLength; i++) {
			var row = guildRows.snapshotItem(i);
			row.style.display = (row.style.display=="none")? "":"none";
			row.style.visibility = (row.style.visibility=="hidden")? "":"hidden";
		}
		var link = document.getElementById("showHide"+guild);
		link.textContent= (link.textContent=="Show")? "Hide":"Show";
	};
  return func;
}

//////////////////////////////////////////////////////////////////////////////////////////
// @module : INIT
//////////////////////////////////////////////////////////////////////////////////////////
if (getState('current_version','0') != version+ '_l') {
	setDefaultOptions();
	setState('current_version',version+ '_l');
	node({html: 'script version '+version+' installed', style: {color: 'red', position: 'absolute', left: '50px', top: String(document.body.scrollTop)+'px'},
	append: document.body});
	throw('new version installed successfully');
}
var isScoutFrame = (window.name.indexOf('scoutframe')!=-1) ? true : false;
var isscoutframechild = false;
try {
	if ((!isScoutFrame) && parent.frames[0].name.indexOf('scoutframe')!=-1)
		isscoutframechild = true;
} catch(e) {}

if (!server_re.exec(location.href) & !isscoutframechild) {
	document.body.style.marginLeft = '60px';
	document.body.style.marginRight = '120px';
}

var num_gal_groups = getState('num_gal_groups',1);
for (var i=0; i<num_gal_groups * 10; i++) {
	if (i%10==0) //i!=0 && 
		show_galaxies.push( '-' );
	show_galaxies.push( (i<10) ? '0'+String(i) : String(i) );
}

function callOnScoutFrame(str) {
	try {
		parent.frames[0].document.getElementById(gmprefix+'evalOnScoutFrame').value += str+'\n';
	} catch(e) {}
}

if (isScoutFrame) {
	var scoutfillingalaxywaypoints = 0;
	var scoutshiptype = '';
	var scoutshipquantity=0;
	var scoutUpdateFleetMovementInterval = 0;
	var scoutEtaCounter = 0;
	var scoutRecentScans = {};
	var filteredWaypoints = new Array();
	var scoutfindingregionwaypoint = '';
	var scoutfindingsystemwaypoint = '';
	var scoutsystemlist = '';
	var scoutNextWaypoint = '';
	var scoutNextWaypointNumber = 0;
	var pollScanStart=0;
	var scoutFleetArrivalTimeout =0;
	var scoutLastScannedRegion='';
	var scoutPauseScouting=1;
	var scoutFleetDestination = '';
	var scoutFleetIdInput=0;
	var scoutStartScoutingBtns=0;
	var scoutPauseScoutingBtns=0;
	var scoutFleetArrival = 0;
	var scoutEditingLocked=0;
	var scoutIsInitialLoad = 1;
	var scoutQuarter0 = '1';
	var scoutQuarter1 = '1';
	var scoutQuarter2 = '1';
	var scoutQuarter3 = '1';
	initScoutingInterface();
} else if (!skipAfterFleetMove()) {
	var s=GM_getResourceText("css");
	if (getState('o_menuTransparency',0))
		s+="div.helperMenu {opacity:0.60}";
	if (getState('o_menuBiggerText',0)) {
		s+="div.helperMenu { font-size:8pt; line-height:1.1; }";
		s+=".menuSectionHeader { font-size:8pt; line-height:0.5; }";
	}
	node({tag: 'style', type: 'text/css', html: s, append: document.body});
	node({tag: 'textarea', id: gmprefix+'evalOnMainFrame', style: {display: 'none'}, text: '', append: document.body});
	if (pagetype != 'tables' && pagetype != 'ranks')
		filterLinks();
	 if (getState('o_enhanceTime',0)) {	
           enhanceTime();
}

	getCurrentLoc();
	if (window.name==gmprefix+'_moving_to_base' && pagetype=='base')
    moveToBase();
	initLeftMenu();
	if (getState('o_enhanceConstruction',0) && (pagetype == 'baseBuildQueue' ||pagetype == 'baseSearchQueue') && location.href.indexOf("info=",0) == -1)
		enhanceConstructionPage();
	if (getState('o_enhanceProduction',0) && pagetype == 'baseProdQueue') {
		var productionIncrementButtons = [];
		enhanceProductionPage();
	}
	if (!isWindowScanning())
    initRightMenu();
	initSaveDataNotify();
	if (pagetype=='mapRegion')
    saveSystemLocs();
	scanBase();
	if (pagetype=='mapSystem')
    scanSystem();
	if (!isWindowScanning() && (pagetype=='mapRegion' || pagetype=='mapGalaxy' || pagetype=='mapSystem') && currentloc)
		loadSmallGalMap('');
	if (getState('o_fleetPageEnhancements',0) && pagetype=='fleetsData') {
		var fleetresponsepane = 0;
		var lastfleetmovedpane = 0;
		var lastfleetmovedhtml = '';
		var lastfleetmoved = 0;
		var fleetlistpane = 0;
		var fleetidhere = 0;
		var fleetlinkhere = '';
		var fleetlocationlink = '';
		var fleetlocation= '';
		var fleetlisttime= 0;
		var fleetactions_showingmovement = 0;
		var fleetactions_showingfleets = 0;
		enhanceFleetPage();
	}
	if (pagetype=='scanners') {
		enhanceScanners();
		scanScanner();
	}
	if (pagetype=='guild')
		playerStats();
	if (pagetype=='fleetMove' || pagetype=='fleetsData')
		enhanceMovePage();
	if (getState('o_moveButtons',0) && !isWindowScanning())
		enhanceLinks();
	enhanceCountdowns();
	if (pagetype=='mapAstro' && currentloc && getState('o_moveButtons',0))
    addDestLinkToLocationHere();
	if (pagetype=='board' || pagetype=='messages' || location.href.indexOf('combat.aspx')!=-1 || (pagetype=='fleets' && location.search.indexOf('&attack=')!=-1)) {
		var numShipTypes = n;
		var armour_total = 0;
		var ship_armour_total = new Array(numShipTypes);
		addCombatSimulatorLinks();
	}
	if (pagetype=='empire')
		productionHelperButton();
	if ((pagetype=="trade")) {
		checkTradePage();
		findPoorTrades();
		insertToggleLink();
	}
	if ((pagetype=="base") || (pagetype=="mapAstro"))
		sumFleets();
	if (getState('last_url')==location.href && getState('alarmisset'))
		initAlarm(parseInt(getState('alarm_t0')), getState('alarmwarning'), getState('alarmmakenoise'));
	if (isscoutframechild) {
		var pollActionsLock=0;
		function pollActionsFromScoutFrame() {
			if (pollActionsLock) return;
			pollActionsLock = 1;
			try {
				var el = $(gmprefix+'evalOnMainFrame');
				if (isscoutframechild && !(el && el.value))
					el = parent.frames[0].document.getElementById(gmprefix+'evalOnMainFrame');
				if (el && el.value) {
					try {
					var actions = el.value.split('\n');
					var action = actions.shift();
					if (actions)
						el.value = actions.join('\n');
					else
						el.value='';
					if (action) {
						eval(action);
					}
					} catch(e) {}
				}
			} catch(e) {}
			pollActionsLock = 0;	
		}

		setInterval(pollActionsFromScoutFrame, 100);
		callOnScoutFrame('scoutOnLoadMainPage();');
	}
}

function exit() {
	setState('last_url', location.href);
	if (typeof(fleetactions_showingfleets)!='undefined') 
		setState('fleetactions_showingfleets', fleetactions_showingfleets);
	if (typeof(fleetactions_showingmovement)!='undefined') 
		setState('fleetactions_showingmovement', fleetactions_showingmovement);
	if (typeof(lastfleetmoved)!='undefined') 
		setState('fleetactions_lastfleetmoved', lastfleetmoved);
	if (typeof(lastfleetmovedhtml)!='undefined') 
		setState('fleetactions_lastfleetmovedhtml', lastfleetmovedhtml);
	if (typeof(saveMovementDetails)!='undefined')
		saveMovementDetails();
	setState('alarmisset', alarmisset);
	setState('alarm_t0', String(alarm_t0));
	setState('alarmwarning', alarmwarning);
	setState('alarmmakenoise', alarmmakenoise);
	if ($('recallonalarm'))
		setState('fleetactions_'+'recallonalarm',$('recallonalarm').checked);
	else
		setState('fleetactions_'+'recallonalarm','');

	if ($('moveonalarm')) {
		setState('fleetaction_'+'fleetwatchthislocation',$('fleetwatchthislocation').value);
		setState('fleetactions_'+'hammerrequest',$('hammerrequest').checked);
		setState('fleetactions_'+'moveonalarm',$('moveonalarm').checked);
	} else {
		setState('fleetaction_'+'fleetwatchthislocation','');
		setState('fleetactions_'+'hammerrequest','');
		setState('fleetactions_'+'moveonalarm','');
	}
	if ($('fleetwatchpause')) {
		setState('fleetaction_'+'fleetwatchpause',$('fleetwatchpause').value);
		setState('fleetaction_'+'fleetwatchalarm',$('fleetwatchalarm').checked);		
		setState('fleetaction_'+'alarmmakenoise',$('alarmmakenoise').checked);		
		setState('fleetaction_'+'fleetwatchwarningtime',$('fleetwatchwarningtime').value);
		setState('fleetaction_'+'fleetwatchsizethreshhold',$('fleetwatchsizethreshhold').value);
		setState('fleetaction_'+'fleetwatchfilter',$('fleetwatchfilter').value);
		setState('fleetaction_'+'notfleetwatchfilter',$('notfleetwatchfilter').value);
	} else {
		setState('fleetaction_'+'fleetwatchpause','');
		setState('fleetaction_'+'fleetwatchalarm','');
	}
}
window.addEventListener('unload',exit,false);