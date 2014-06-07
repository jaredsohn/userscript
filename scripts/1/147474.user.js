
// ==UserScript==
// @name                MUR Selection Script
// @namespace           http://userscripts.org/users/Kuhlkatz
// @description         Allows selection of all MURs in a zoomed area
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://descartes.waze.com/beta/*
// @include             https://descartesw.waze.com/beta/*
// @version             0.1.2
// ==/UserScript==

var version = "v0.1.2";
var panelExpanded = true;
var wazeMURMapCenter = null;
var wazeMURMapZoom = null;


if ('undefined' == typeof __RTLM_PAGE_SCOPE_RUN__) {
  (function page_scope_runner() {
    // If we're _not_ already running in the page, grab the full source
    // of this script.
    var my_src = "(" + page_scope_runner.caller.toString() + ")();";
    // Create a script node holding this script, plus a marker that lets us
    // know we are running in the page scope (not the Greasemonkey sandbox).
    // Note that we are intentionally *not* scope-wrapping here.
    var script = document.createElement('script');
    script.setAttribute("type", "text/javascript");
    script.textContent = "var __RTLM_PAGE_SCOPE_RUN__ = true;\n" + my_src;

    // Insert the script node into the page, so it will run, and immediately
    // remove it to clean up.  Use setTimeout to force execution "outside" of
    // the user script scope completely.
    setTimeout(function() {
          document.body.appendChild(script);
          document.body.removeChild(script);
        }, 500);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

// Check is WME is busy loading road data
function checkPendingOperations() {
  var selectMUR = getId('_selectMUR');
  var classList = getId('Waze.Control.PendingOperation_43').className;
  var operationHTML = getId('Waze.Control.PendingOperation_43').innerHTML;
  var wmeLoadingSaving = false;
  if (operationHTML=="Loading road data..." || operationHTML=="Saving changes...") wmeLoadingSaving = true;
  var wmeIsActive = classList.search('hidden');
// disable dropdown interaction while WME is refreshing or saving
  if (wmeIsActive == -1 && wmeLoadingSaving) {
    if (selectMUR.disabled==false) selectMUR.disabled = true;
  } else {
// enable dropdown interaction
    if (selectMUR.disabled==true && wazeMURMapCenter==null) {
	  selectMUR.disabled = false;
	}
  }
  if ((document.getElementById('uroControls') != null) && (document.getElementById('highlight-addon') != null)) {
    getId('murselectaddon').style.bottom = (getId('uroControls').clientHeight + getId('highlight-addon').clientHeight) + 21 + 'px';
  } else {
    if (document.getElementById('uroControls') != null) {
      getId('murselectaddon').style.bottom = getId('uroControls').clientHeight + 21 + 'px';
    } else {
    if (document.getElementById('highlight-addon') != null) {
        getId('murselectaddon').style.bottom = getId('highlight-addon').clientHeight + 21 + 'px';
      } else {
        getId('murselectaddon').style.bottom = '8px';
      }
    }
  }
  return;
}


function openLivemap() {
    var mapHref = $("#permalink-container").children("a").attr("href");
    var newHref = {};
    mapHref = parseURLParms(mapHref);
    newHref[0] = mapHref[0].replace("/editor/", "/livemap/");
    newHref.lat = mapHref.lat;
    newHref.lon = mapHref.lon;
    var zoom = parseInt(mapHref.zoom);
    if(zoom >= 4) zoom = 9
    else if(zoom >=2) zoom += 5;
         else zoom += 6;
    newHref.zoom = zoom;
    var livemapURL = newHref[0]+"?zoom="+newHref.zoom+"&lat="+newHref.lat+"&lon="+newHref.lon;
    window.open(livemapURL);
}


function parseURLParms(href) {
    var parms = {}, hash;
    var idx = href.indexOf('?');
    var hashes = href.slice(idx + 1).split('&');
    parms[0] = href.slice(0, idx);
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        parms[hash[0]] = hash[1];
    }
    return parms;
}


// populate the drop-down list of MURs
function updateMURList() {
console.log("UpdateMURList");
  var selectMur = getId('_selectMUR');
  var currentMURId = null;
  if (selectMur.selectedIndex >= 0)
    currentMURId = selectMur.options[selectMur.selectedIndex].value;
  
  var murIds = new Array();
  for (var mur in wazeModel.mapUpdateRequests.objects) {
    var murPriority = 4;
    var murRequest = wazeModel.mapUpdateRequests.get(mur);
    var murattributes = murRequest.attributes;
    switch(murattributes.severity) {
      case "high":
        murPriority=1;
        break;
      case "medium":
        murPriority=2;
        break;
      default:
        murPriority=3;
	}
    if (murIds.indexOf(murRequest.fid) == -1) {
      murIds.push({fid: murRequest.fid, name: murPriority+"-"+murattributes.typeText+" ("+murattributes.severity.substring(0,1)+"-"+murRequest.fid+")"});
    }
  }
  murIds.sort(function(a,b){return (a.name.substring(0,1) < b.name.substring(0,1)) ? -1 : (a.name.substring(0,1) > b.name.substring(0,1)) ? 1 : 0;});

  selectMur.options.length = 0;
  for (var i = 0; i < murIds.length; i++) {
    var murID = murIds[i].fid;
    var murName = murIds[i].name;
    if (murName == "") continue;
	var murOption = document.createElement('option');
    var murText = document.createTextNode(murName);
    if (currentMURId != null && murID == currentMURId)
      murOption.setAttribute('selected',true);
    murOption.setAttribute('value',murID);
    murOption.appendChild(murText);
    selectMur.appendChild(murOption);
  }
  numMURSelectedText = getId('_numMURSelected');
  numMURSelectedText.innerHTML = ' = ' + selectMur.options.length;
  return;
}


function resetMURList() {
  wazeMURMapCenter=null;
  wazeMURMapZoom=null;
  getId("_btnURZoom").style.fontStyle="normal";
  getId("_btnURReturn").style.fontWeight="normal";
  updateMURList();
  return;
}


function viewMUR() {
  murSelection = new Array();
  var selectMur = getId('_selectMUR');
  var currentMURId = null;
  if (selectMur.selectedIndex >= 0)
    currentMURId = selectMur.options[selectMur.selectedIndex].value;

  for (var mur in wazeModel.mapUpdateRequests.objects) {
    var muRequest = wazeModel.mapUpdateRequests.get(mur);
    var murID = muRequest.fid;
    var bounds = muRequest.bounds;
    if (currentMURId==murID) {
	  if (wazeMURMapCenter==null) {
	    wazeMURMapCenter=wazeMap.getCenter();
	    wazeMURMapZoom=wazeMap.getZoom();
	  }
      getId('_selectMUR').disabled=true;
	  wazeMap.setCenter(bounds.getCenterLonLat());
	  wazeMap.zoomTo(5);
      getId("_btnMURZoom").style.fontStyle="italic";
      getId("_btnMURReturn").style.fontWeight="bold";
	  break;
	}
    continue;
  }
  return;
}


function returnMURView() {
  if (wazeMURMapCenter!=null && wazeMURMapZoom!=null) {
    wazeMap.setCenter(wazeMURMapCenter);
    wazeMap.zoomTo(wazeMURMapZoom);
    wazeMURMapCenter=null;
    wazeMURMapZoom=null;
    getId('_selectMUR').disabled=false;
	getId("_btnMURZoom").style.fontStyle="normal";
	getId("_btnMURReturn").style.fontWeight="normal";
  }
  return;
}

function toggleMUROptions () {
  var objStyle = "none";
  panelExpanded = !panelExpanded;
  if  (panelExpanded) {
    objStyle = "block";
    getId('_btnHideMUR').innerHTML = "hide";
  }
  else {
    getId('_btnHideMUR').innerHTML = "show";
  }
  getId('murOptions').style.display = objStyle;
  return false;
}

/* helper function */
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getId(node) {
  return document.getElementById(node);
}

// flag for new editor
var beta = (getId('user-tabs') != null);

// add new box to left of the map
var addon = document.createElement('p');
addon.id = "murselectaddon";

addon.innerHTML  = '<b><a href="http://userscripts.org/scripts/show/147474">UR Selection Script</a></b> &nbsp; ' + version
if (!beta) {
  addon.innerHTML += ' &nbsp; [<a href="#" id="_btnHideMUR">hide</a>]';
}

// MUR options
section = document.createElement('p');
section.style.paddingTop = "8px";
section.style.textIndent = "16px";
section.style.display = "block";
section.id = 'murOptions';
section.innerHTML  = '<b>UR Selection</b><br>'
           + '  <select id="_selectMUR" name="_selectMUR" style="margin: 0 0 4px 16px"></select>'
           + '<span id="_numMURSelected"></span><br>'
		   + '<span style="margin: 0 0 4px 16px"></span>[<a href="#" id="_btnMURZoom" "> Locate </a>] &nbsp; [<a href="#" id="_btnMURReturn"> Return </a>] &nbsp; [<a href="#" id="_btnLivemap"> Livemap </a>]';
addon.appendChild(section);

if (beta) {
  var userTabs = getId('user-tabs');
  var navTabs = getElementsByClassName('nav-tabs', userTabs)[0];
  var tabContent = getElementsByClassName('tab-content', userTabs)[0];

  newtab = document.createElement('li');
  newtab.innerHTML = '<a href="#sidepanel-murselection" data-toggle="tab">Map UR Selection</a>';
  navTabs.appendChild(newtab);

  addon.id = "sidepanel-murselection";
  addon.className = "tab-pane";
  tabContent.appendChild(addon);
} else {
  addon.style.fontSize = "12px";
  addon.style.margin = "8px";
  addon.style.background = "#f3fff3"
  addon.style.border = "silver dotted 1px";
  addon.style.position = "absolute";
  addon.style.bottom = "20px";
  addon.style.width = "250px";
  addon.style.padding = "8px";

  getId('side-panel').appendChild(addon);
  getId("_btnHideMUR").onclick = toggleMUROptions;
}

// setup onclick handlers for instant update:
getId('_selectMUR').onfocus = updateMURList;
getId('_selectMUR').onchange = updateMURList;

getId('_btnMURZoom').onclick = viewMUR;
getId('_btnMURReturn').onclick = returnMURView;

getId('_btnLivemap').onclick = openLivemap;


// Set timer to check for WME Loading and Saving
window.setInterval(checkPendingOperations,1000);


// trigger code when page is fully loaded, to catch any missing bits
window.addEventListener("load", function(e) {
  updateMURList();
  return true;
});
