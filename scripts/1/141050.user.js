// ==UserScript==
// @name                WME Color Highlights
// @namespace           http://userscripts.org/users/419370
// @description         Adds colours to road segments to show their status
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @updateURL           http://userscripts.org/scripts/source/141050.meta.js
// @version             1.81
// @grant               none
// ==/UserScript==

var wmech_version = "1.81"

/* bootstrap, will call initialiseHighlights() */
function bootstrapHighlights()
{
  var bGreasemonkeyServiceDefined = false;

  try {
    bGreasemonkeyServiceDefined = (typeof Components.interfaces.gmIGreasemonkeyService === "object");
  }
  catch (err) { /* Ignore */ }

  if (typeof unsafeWindow === "undefined" || ! bGreasemonkeyServiceDefined) {
    unsafeWindow    = ( function () {
      var dummyElem = document.createElement('p');
      dummyElem.setAttribute('onclick', 'return window;');
      return dummyElem.onclick();
    }) ();
  }

  /* begin running the code! */
  setTimeout(initialiseHighlights, 999);
}

// set of 'bad names' to flag on UK roads only
// if editing for another country, search for 234
var badNames = [
   ' (Av|Avenue)$',
   ' Ch$',                    // chase
   ' (Crt|Court|Close|Cls)$',
   ' (Cres|Crescent|Crs)$',
   ' (Drv|Drive)$',
   ' (Gardens?|Grdns?)$',     // optional s
   ' (Grn|Green|Grove)$',
   ' (Grv|Grove|Place)$',
   ' (Lane|Road|Street)$',
   ' (Te|Tce|Terr|Terrace)$',
   ' (Wk|Wy)$',               // Walk|Way

   '[.]$',                    // anything ending in .
   '^[a-z]+| [a-z]{3}',       // missing capitals
   ' By-[Pp]ass',             // Bypass
   '^([AB]\\d+ - )?St ',      // Saint (St.)
   '^[AB]\\d+ : ',            // Colon instead of dash
   '^[AB]\\d+(  |-| -?[A-Za-z])', // double or missing space, or missing hyphen
   ' \\([AB]\\d+\\)$'         // ending in (A123)
];
var reBadNames = new RegExp(badNames.join('|'), '');

var goodNames = [
   '^([AB]\\d+.* - )?The (Avenue|Boulevard|Broadway|Bypass|Circus|Close|Court|Crescent|Drive)$',
   '^([AB]\\d+.* - )?The (Gardens?|Green|Groves?|Lane|Mount|Place|Park|Ridge|Square|Street|Terrace|Valley)$'
];
var reGoodNames = new RegExp(goodNames.join('|'), '');


/* =========================================================================== */
function highlightSegments() {
  var showLocked = getId('_cbHighlightLocked').checked;
  var showRanked = betaMode ? getId('_cbHighlightRanked').checked : false;
  var showToll   = getId('_cbHighlightToll').checked;
  var showNoCity = getId('_cbHighlightNoCity').checked;
  var showNoName = getId('_cbHighlightUnnamed').checked;
  var showOneWay = getId('_cbHighlightOneWay').checked;
  var showNoDirection = getId('_cbHighlightNoDirection').checked;
  var showRestrictions = getId('_cbHighlightRestrictions').checked;
  var specificCity = getId('_cbHighlightCity').checked;
  var specificCityInvert = getId('_cbHighlightCityInvert').checked;
  var specificRoadType = getId('_cbHighlightRoadType').checked;
  var showNoTerm = getId('_cbHighlightNoTerm').checked;

  var showRecent = advancedMode ? getId('_cbHighlightRecent').checked : false;
  var specificEditor = advancedMode ? getId('_cbHighlightEditor').checked : false;
  //var showHouseNums = advancedMode ? getId('_cbHighlightHouseNums').checked : false;

  var showLandmarks = getId('_cbHighlightLandmarks').checked;

  var tNow = new Date();
  var numDays;
  var selectedUserId = null;
  var selectedCityId = null;

  if (specificEditor) {
    var selectUser = getId('_selectUser');
    if (selectUser.selectedIndex >= 0)
      selectedUserId = selectUser.options[selectUser.selectedIndex].value;
    else
      specificEditor = false;
  }

  if (specificCity) {
    var selectCity = getId('_selectCity');
    if (selectCity.selectedIndex >= 0)
      selectedCityId = selectCity.options[selectCity.selectedIndex].value;
    else
      specificCity = false;
  }

  if (specificRoadType) {
    var selectRoadType = getId('_selectRoadType');
    if (selectRoadType.selectedIndex >= 0)
      selectedRoadType = selectRoadType.options[selectRoadType.selectedIndex].value;
    else
      specificRoadType = false;
  }

  if (showRecent) {
    numDays = getId('_numRecentDays').value;
    if (numDays === undefined) numDays = 0;
  }

  // counters
  var numUserHighlighted = 0;
  var numCityHighlighted = 0;

  for (var seg in Waze.model.segments.objects) {
    var segment = Waze.model.segments.get(seg);
    var attributes = segment.attributes;
    var line = getId(segment.geometry.id);

    if (line !== null) {
      var sid = attributes.primaryStreetID;

      // check that WME hasn't highlighted this segment
      var opacity = line.getAttribute("stroke-opacity");
      var lineWidth = line.getAttribute("stroke-width");
      if (opacity == 1 || lineWidth == 9)
        continue;

      // turn off highlights when roads are no longer visible
      var roadType = attributes.roadType;
      if (Waze.map.zoom <= 3 && (roadType < 2 || roadType > 7) ) {
        if (opacity > 0.1) {
          line.setAttribute("stroke","#dd7700");
          line.setAttribute("stroke-opacity",0.001);
          line.setAttribute("stroke-dasharray", "none");
        }
        continue;
      }

      // highlight all newly paved roads (or roads without any nodes)
      if (sid === null || (attributes.toNodeID === null && attributes.fromNodeID === null && roadType < 9)) {
        if (opacity < 0.1) {
          line.setAttribute("stroke","#f00");
          line.setAttribute("stroke-opacity",0.75);
          line.setAttribute("stroke-width", 10);
        }
        continue;
      }
      var street = Waze.model.streets.get(sid);

      // get attributes for this segment
      var toll        = attributes.fwdToll;
      var locked      = attributes.lockRank > 0;
      var ranked      = attributes.rank > 0;
      var noEdit      = attributes.permissions == 0;
      var noName      = (street != null) && street.isEmpty;
      var badName     = !noName && street.name.match(reBadNames) && !street.name.match(reGoodNames);
      var cityID      = (street != null) && street.cityID;
      var noCity      = false;
      var countryID   = 0;
      if (cityID != null && Waze.model.cities.get(cityID) != null) {
        noCity = Waze.model.cities.get(cityID).isEmpty;
        countryID = Waze.model.cities.get(cityID).countryID;
      }
      var oneWay      = ((attributes.fwdDirection + attributes.revDirection) == 1); // it is 1-way only if either is true
      var noDirection = (!attributes.fwdDirection && !attributes.revDirection); // Could use the .attribute.allowNoDirection?
      var hasRestrictions = (attributes.fwdRestrictions.length + attributes.revRestrictions.length > 0);
      var updatedOn   = new Date(attributes.updatedOn);
      var updatedBy   = attributes.updatedBy;
      var roundabout  = attributes.junctionID !== null;
      var tDif = (tNow.getTime() - updatedOn.getTime()) / 86400000;

      // get current state of the line
      var lineColor = line.getAttribute("stroke");

      // default colours
      var newColor = "#dd7700";
      var newOpacity = 0.001;
      var newDashes = "none";
      var newWidth = 8;

      // Recent Edits within X days, with decaying green opacity
      if (showRecent && numDays >= 0 && tDif <= numDays) {
        if ((updatedBy == selectedUserId) || (!specificEditor)) {
          var heatScale = 0.75 / numDays;
          newColor = "#0f0";
          newOpacity = Math.min(0.999999, 1 - (tDif * heatScale));
        }
      }

      // Toll = Dashed
      else if (toll && showToll) {
        newColor = locked ? "#ff0000" : "#00f";
        newOpacity = 0.5;
        newDashes = "10 10";
      }

      // No Edit = Black
      else if (noEdit && showLocked) {
        newColor = "#000";
        newOpacity = 0.75;
        newWidth = 3;
      }

      // Locked = Red
      else if (locked && showLocked) {
        newColor = "#f00";
        newWidth = 6;
        newOpacity = 0.2 * Math.min(5, attributes.lockRank);
      }

      else if (ranked && showRanked) {
        newColor = "#800";
        newWidth = 3;
        newOpacity = 0.2 * attributes.rank;
      }

      else if (hasRestrictions && showRestrictions) {
        newColor = "#909";
        newDashes = "10 10";
        newOpacity = 0.5;
      }

      // bad roundabouts = Lime
      //else if (roundabout && (!oneWay || !noName) && showNoTerm) {
      //  newColor = "#BE0";
      //  newOpacity = 0.5;
      //}

      // Unnamed (No Name) = Orange
      // except roundabouts and non-Streets
      else if (noName && showNoName && !roundabout && attributes.roadType < 8) {
        newColor = "#fb0";
        newOpacity = 0.5;
      }

      // bad names (UK only) = Orange dashed
      else if ((badName || !noName && roundabout) && showNoName && countryID == 234 && attributes.roadType != 4) {
        newColor = "#fb0";
        newOpacity = 0.5;
        newDashes = "10 10";
        newWidth = 6;
      }

      // No City = Gray
      else if (noCity && showNoCity) {
        newColor = "#888";
        newOpacity = 0.5;
      }

      // No Direction = Cyan
      else if (noDirection && showNoDirection) {
        newColor = "#0ff";
        newOpacity = 0.3;
      }

      // One Way = Blue
      else if (oneWay && showOneWay) {
        newColor = "#00f";
        newOpacity = 0.2;
      }

      // Unterminated segments: no end node or not connected = Lime
      else if (showNoTerm && (attributes.toNodeID === null || attributes.fromNodeID === null || attributes.toNodeID === attributes.fromNodeID) && attributes.length > 10) {
        newColor = "#BE0";
        newOpacity = 0.5;
      }

      //else if (showHouseNums && attributes.hasHNs) {
      //  newColor = "#4E4";
      //  newOpacity = 0.5;
      //}

      // selected road type = purple
      else if (specificRoadType && attributes.roadType == selectedRoadType) {
        newColor = "#909";
        newOpacity = 0.5;
        newWidth = 4;
      }

      // special road types: non-drivable / non-routable
      else if (specificRoadType && selectedRoadType == 98 && nonRoutableTypes.contains(attributes.roadType)) {
        newColor = "#909";
        newOpacity = 0.5;
        newWidth = 4;
      }
      else if (specificRoadType && selectedRoadType == 99 && nonDrivableTypes.contains(attributes.roadType)) {
        newColor = "#909";
        newOpacity = 0.5;
        newWidth = 4;
      }


      // highlight segments by selected user, unless already highlighted
      if (specificEditor && !showRecent) {
        if (updatedBy == selectedUserId && newColor == "#dd7700") {
          newColor = "#00ff00";
          newOpacity = 0.5;
          numUserHighlighted++;
        } else if (updatedBy != selectedUserId) {
          newColor = "#dd7700";
          newOpacity = 0.001;
          newDashes = "none";
        }
      }

      // highlight segments by selected City, unless already highlighted
      // if city is only on an alternate street highlight it with dashes
      if (specificCity) {
        var altCityMatch = false;
        var specificCityMatch = (cityID == selectedCityId);
        if (specificCityInvert)
          specificCityMatch = (cityID != selectedCityId && !noCity);

        if (!specificCityMatch) {
          // look for matching city in alternate streets
          for (var i in attributes.streetIDs) {
            var streetID = attributes.streetIDs[i];
            var currentStreet = Waze.model.streets.get(streetID);
            if (currentStreet == null)
              continue;
            var match = (currentStreet.cityID == selectedCityId);
            if (specificCityInvert)
              match = !match
            if (match) {
              altCityMatch = true;
              break;
            }
          }
        }

        if (specificCityMatch && (newColor == "#dd7700" || newColor == "#888")) {
          newColor = "#ff0";
          newOpacity = 0.75;
          newDashes = "none";
          numCityHighlighted++;
        } else if (altCityMatch && (newColor == "#dd7700" || newColor == "#888")) {
          newColor = "#ffff01";
          newOpacity = 0.75;
          newDashes = "10 10";
          newWidth = 6;
          numCityHighlighted++;
        } else if (!specificCityMatch && !altCityMatch && !noCity) {
          newColor = "#dd7700";
          newOpacity = 0.001;
          newDashes = "none";
        }
      }

      // highlight railroads (as Landmarks)
      if (showLandmarks && attributes.roadType == 18) {
          newColor = "#444";
          newOpacity = 0.8;
          newDashes = "4 12";
          newWidth = 3;
      }

      // if colour has changed, update the line attributes
      if (lineColor != newColor) {
        line.setAttribute("stroke", newColor);
        line.setAttribute("stroke-opacity", newOpacity);
        line.setAttribute("stroke-dasharray", newDashes);
        if (newColor != "#dd7700") { //default
          line.setAttribute("stroke-width", newWidth);
        } else {
          line.setAttribute("stroke-width", 6);
        }
      }
    } // end if (line !== null)
  } // end of loop

  numUserHighlightedText = getId('_numUserHighlighted');
  if (specificEditor)
    numUserHighlightedText.innerHTML = ' = ' + numUserHighlighted;
  else
    numUserHighlightedText.innerHTML = '';

  numCityHighlightedText = getId('_numCityHighlighted');
  if (specificCity)
    numCityHighlightedText.innerHTML = ' = ' + numCityHighlighted;
  else
    numCityHighlightedText.innerHTML = '';
} // end of function

function highlightLandmarks() {
  if (typeof Waze.model.landmarks == "undefined") {
    return;
  }

  // if checkbox unticked, reset landmarks to original style
  if (!getId('_cbHighlightLandmarks').checked) {
    for (var mark in Waze.model.landmarks.objects) {
      var landmark = Waze.model.landmarks.get(mark);
      var poly = getId(landmark.geometry.id);
      if (poly !== null) {
        if (poly.getAttribute("fill-opacity") != 0.4) {
          poly.setAttribute("fill","#0093ae");
          poly.setAttribute("stroke","#0093ae");
          poly.setAttribute("fill-opacity",0.4);
        }
      }
    }
    return;
  }


  var specificCity = getId('_cbHighlightCity').checked;
  var specificCityInvert = getId('_cbHighlightCityInvert').checked;

  if (specificCity) {
    var selectCity = getId('_selectCity');
    if (selectCity.selectedIndex >= 0) {
      selectedCityId = selectCity.options[selectCity.selectedIndex].value;
    } else
      specificCity = false;
  }

  for (var mark in Waze.model.landmarks.objects) {
    var landmark = Waze.model.landmarks.get(mark);
    var poly = getId(landmark.geometry.id);
    if (poly !== null) {
      selectedCityMatch = (specificCity && landmark.attributes.cityID == selectedCityId);
      if (specificCityInvert) selectedCityMatch = !selectedCityMatch;

      // highlight landmarks which have the City field set in the address = yellow
      if (poly.getAttribute("fill") != "#ff8") {
        if (specificCity && selectedCityMatch) {
          poly.setAttribute("fill","#ff8");
          poly.setAttribute("stroke","#cc0");
        }
      }
      // if was yellow and now not yellow, reset
      else if (!specificCity || !selectedCityMatch) {
        poly.setAttribute("fill","#0093ae");
        poly.setAttribute("stroke","ccc");
      }

      if (poly.getAttribute("fill") == "#0093ae") {
        var mtfcc   = landmark.attributes.mtfcc;

        // default = gray
        poly.setAttribute("fill","#999");
        poly.setAttribute("stroke","#ccc");
        poly.setAttribute("fill-opacity",0.45);

        // gas station = green
        if (mtfcc == "W0002") {
          poly.setAttribute("fill","#00d894");
          poly.setAttribute("stroke","#00d894");
        }

        // parking lot = pink
        else if (mtfcc == "W0001") {
          poly.setAttribute("fill","#f99");
          poly.setAttribute("fill-opacity",0.2);
        }

        // water = blue
        else if (mtfcc == "H2053" || mtfcc == "H3010") {
          poly.setAttribute("fill","#09f");
          poly.setAttribute("stroke","#69f");
        }

        // park/grass/trees = green
        else if (mtfcc == "K2181" || mtfcc == "K2190") {
          poly.setAttribute("fill","#0f0");
          poly.setAttribute("fill-opacity",0.2);
          poly.setAttribute("stroke","#9f9");
        }
      }

      // gas stations - check if complete
      if (poly.getAttribute("fill") == "#00d894" &&
          window.location.href.match(/world.waze.com/)) {
        var name = landmark.attributes.name;
        var address = landmark.attributes.venueInfo.address;
        var brand = landmark.attributes.venueInfo.brand;

        if (name == '' || address == '' || brand == '') {
          poly.setAttribute("fill","#f00");
          poly.setAttribute("stroke","#f00");
        }
      }
    }
  }
}

function highlightSelectedNodes() {
  if (Waze.map.zoom <= 3 || !advancedMode)
    return true;

  var showTurns = advancedMode ? getId('_cbHighlightTurns').checked : false;

  // look for a selected node or segment (there can only be 1)
  var currentNodes = [];
  var selectType = '';
  if (Waze.selectionManager.selectedItems.length == 1) {
    var selection = Waze.selectionManager.selectedItems[0];
    if (selection !== null) {
      if (selection.state == "Update" && lastModified == false) {
        lastSelected = null;
        lastModified = true;
      } else if (selection.state != "Update" && lastModified == true) {
        lastSelected = null;
        lastModified = false;
      }

      selectType = selection.type;
      if (selection.type == "node") {
         currentNodes.push(selection.fid);
      }

      else if (selection.type == "segment") {
        currentNodes.push(selection.attributes.fromNodeID);
        currentNodes.push(selection.attributes.toNodeID);
      }
    }
  }

  // selection changed, then reset previous highlights | selectType == 'node'
  if ((lastSelected != currentNodes[0] || !showTurns) && selectedLines.length > 0) {
    for (var i = 0; i < selectedLines.length; i++) {
      line = getId(selectedLines[i]);
      if (line !== null && line.getAttribute("stroke-width") == 8)
        line.setAttribute("stroke-opacity", 0.0001);
    }
    selectedLines = [];
  }

  // no node selected, quit now
  if (currentNodes.length === 0) {
    lastSelected = null;
    lastModified = false;
    return true;
  }

  var numSoftTurns = 0;
  var numRevConns = 0;
  var numUTurns = 0;
  var showWarning = false;

  for (var i = 0; i < currentNodes.length; i++) {
    var currentNode = currentNodes[i];

    var node = Waze.model.nodes.get(currentNode);
    if (node === undefined) continue;

    // ignore dead-end nodes
    if (node.attributes.segIDs.length <= 1) {
      lastSelected = currentNode[0];
      continue;
    }

    // find segments that connect to this node
    for (var j = 0; j < node.attributes.segIDs.length; j++) {
      var segID = node.attributes.segIDs[j];
      var segment = Waze.model.segments.get(segID);
      if (segment === undefined)
        continue;

      var attributes = segment.attributes;
      var line = getId(segment.geometry.id);
      if (line === null || line === undefined)
        continue;

      var newColor = null;
      var n = (attributes.fromNodeID == currentNode) ? 1 : 0; // n = 0 for fwd, 1 for rev

      // check for soft-turns
      var nodeLocked = (n == 0) ? attributes.fwdTurnsLocked : attributes.revTurnsLocked;
      if (nodeLocked === false) {
        newColor = "#ff0"; // yellow
        numSoftTurns++;
      }

      // highlight reverse connectivity and nodes that are causing it in purple
      if (attributes.fwdDirection == true && attributes.revDirection == false) {
        // one way A->B
        for (var key in node.attributes.connections) {
          var val = node.attributes.connections[key];
          var connSegs = key.split(",");
          var checkseg = (n == 0) ? connSegs[1] : connSegs[0];
          if (val == true && checkseg == segID) {
            newColor = "#f0f";
            numRevConns++;
          }
        }
      }

      if (attributes.fwdDirection == false && attributes.revDirection == true) {
        // one way A<-B
        for (var key in node.attributes.connections) {
          var val = node.attributes.connections[key];
          var connSegs = key.split(",");
          var checkseg = (n == 0) ? connSegs[0] : connSegs[1];
          if (val == true && checkseg == segID) {
            newColor = "#f0f";
            numRevConns++;
          }
        }
      }

      if (attributes.fwdDirection == true && attributes.revDirection == true) {
        // two-way, check for connections back to the same segment
        if (node.attributes.segIDs.length > 1) {
          for (var key in node.attributes.connections) {
            var val = node.attributes.connections[key];
            var connSegs = key.split(",");
            if (val == true && connSegs[0] == segID && connSegs[1] == segID) {
              newColor = "#0ff";
              numUTurns++;
            }
          }
        }
      }

      var oldOpacity = line.getAttribute("stroke-opacity");
      if (newColor !== null && oldOpacity < 1 && showTurns) {
        line.setAttribute("stroke", newColor);
        line.setAttribute("stroke-opacity", 1);
        line.setAttribute("stroke-width", 8);
        line.setAttribute("stroke-dasharray", "none");
        selectedLines.push(segment.geometry.id);
      }
      if (newColor !== null)
        showWarning = true;
    }
  }

  if (currentNodes.length > 0) {
    var currentNode = currentNodes[0];

    if (showWarning === true) {
      // setup new box for warnings about this node
      var selectionBox;
      if (selectType == 'segment')
        selectionBox = getId('segment-edit-general');
      else
        selectionBox = getId('node-edit-general');

      var nodeDetails = getId('nodeTipsBox');
      if (!nodeDetails) {
        nodeDetails = document.createElement('div');
        nodeDetails.id = 'nodeTipsBox';
        selectionBox.appendChild(nodeDetails);
      } else {
        return;
        nodeDetails.innerHTML = '';
      }

      if (numSoftTurns > 0) {
        nodeText = document.createElement('div');
        if (selectType == 'node')
          nodeText.title = "Press Q and then re-enable each allowed turn.";
        else
          nodeText.title = "Select individual nodes to see details.";
        nodeText.style.padding = "4px 2px";
        nodeText.innerHTML = "<b>Warning:</b> " + selectType + " has " + numSoftTurns + " soft turns.";
        nodeText.style.backgroundColor = '#ffc';
        nodeDetails.appendChild(nodeText);
      }
      if (numRevConns > 0) {
        nodeText = document.createElement('div');
        if (selectType == 'node')
          nodeText.title = "Press Q and then re-enable each allowed turn.";
        else
          nodeText.title = "Select individual nodes to see details.";
        nodeText.style.padding = "4px 2px";
        nodeText.innerHTML = "<b>Warning:</b> " + selectType + " has " + numRevConns + " reverse connections.";
        nodeText.style.backgroundColor = '#fcf';
        nodeDetails.appendChild(nodeText);
      }
      if (numUTurns > 0) {
        nodeText = document.createElement('div');
        nodeText.title = "Use the U-Turn arrows to set when a U-Turn is allowed.";
        nodeText.style.padding = "4px 2px";
        nodeText.innerHTML = "<b>Notice:</b> " + selectType + " has " + numUTurns + " U-Turns.";
        nodeText.style.backgroundColor = '#cff';
        nodeDetails.appendChild(nodeText);
      }

      if (selectType == 'node') {
        nodeText = document.createElement('div');
        nodeText.style.padding = "4px 2px";
        nodeText.innerHTML = '<br>';
        if (typeof unsafeWindow.WME_JNF_Version != "undefined") {
            nodeText.innerHTML += '<span style="float:right">[<a href="http://userscripts.org/scripts/show/144939" target="_blank">JNF '+unsafeWindow.WME_JNF_Version+'</a>]</span>';
          if (typeof unsafeWindow.WME_JNF_FixNode == "function") {
            nodeText.innerHTML += '<i><a href="#" id="_autoFixLink">'
                               +  'Automatically fix this node</a></i> (Q)<br>';
          } else {
            nodeText.innerHTML += "<i style='color: red'>JNF script not active. Upgrade!</i><br>";
          }
        } else {
          nodeText.innerHTML += '<i>Hover over text above for help.</i><br>';
        }
        nodeText.innerHTML += '<i>For a full explanation, <a href="http://waze.cryosphere.co.uk/node-help" target="_blank">see this page</a>.</i><br>';
        nodeDetails.appendChild(nodeText);

        autoFixLink = getId('_autoFixLink');
        if (autoFixLink != null) {
          autoFixLink.onclick = autoFixNode;
        }
      }
    }
  }

  lastSelected = currentNodes[0];
  return true;
}

function autoFixNode()
{
  currentNode = Waze.selectionManager.selectedItems[0];
  unsafeWindow.WME_JNF_FixNode(currentNode);

  return false;
}

/* display average speed for selected segments (code by bgodette) */
/* no longer used */
function extraDetails() {
  if (!advancedMode)
    return;

  if (Waze.selectionManager.selectedItems.length == 1) {
    var selection = Waze.selectionManager.selectedItems[0];
    if (selection) {
      if (selection.type == "segment") {
        segeditgen = document.getElementById("segment-edit-general");
        segextra = document.getElementById("segment-extra-details");
        if (!segextra) {
          segextra = document.createElement('div');
          segextra.id = 'segment-extra-details';
          segeditgen.appendChild(segextra);
        }
        var fwdSpeed = selection.attributes.fwdCrossSpeed;
        var revSpeed = selection.attributes.revCrossSpeed;
        var editTime = new Date(selection.attributes.updatedOn);

        segextra.innerHTML = "<br><u title=\"*Additional data displayed by Color Highlights Script\">Average speed for segment</u>*<br>"
                           + "&nbsp; A->B: " + fwdSpeed + "km/h (" + Math.round(fwdSpeed * 6.21371) / 10 + "mph)<br>"
                           + "&nbsp; B->A: " + revSpeed + "km/h (" + Math.round(revSpeed * 6.21371) / 10 + "mph)<br>"
                           + "Segment Rank: " + (selection.attributes.rank + 1) + " cones<br>"
                           + "<i>" + editTime.toTimeString() + "</i>";
      }
    }
  }
  return true;
}

function highlightBadNodes() {
  if (Waze.map.zoom <= 3 || !advancedMode)
    return true;

  var showTurns = advancedMode ? getId('_cbHighlightTurns').checked : false;
  var showRestrictions = getId('_cbHighlightRestrictions').checked;

  for (var currentNode in Waze.model.nodes.objects) {
    var node = Waze.model.nodes.get(currentNode);
    if (node === undefined) continue;

    var numRestrictions = 0;
    var numSoftTurns = 0;
    var numRevConns = 0;
    var numUTurns = 0;

    // ignore dead-end nodes
    if (node.attributes.segIDs.length <= 1) {
      continue;
    }

    // find segments that connect to this node
    for (var j = 0; j < node.attributes.segIDs.length; j++) {
      var segID = node.attributes.segIDs[j];
      var segment = Waze.model.segments.get(segID);
      if (segment === undefined)
        continue;

      var attributes = segment.attributes;

      // count restictions
      if (showRestrictions) {
        for (var key in node.attributes.restrictions) {
          if (key) numRestrictions++;
        }
      }

      if (attributes.roadType < 2 || attributes.roadType > 7)
        continue; // only look at Primary Streets and above

      var n = (attributes.fromNodeID == currentNode) ? 1 : 0; // n = 0 for fwd, 1 for rev

      // check for soft-turns
      var nodeLocked = (n == 0) ? attributes.fwdTurnsLocked : attributes.revTurnsLocked;
      if (nodeLocked === false) {
        numSoftTurns++;
      }

      // highlight reverse connectivity and nodes that are causing it in purple
      if (attributes.fwdDirection == true && attributes.revDirection == false) {
        // one way A->B
        for (var key in node.attributes.connections) {
          var val = node.attributes.connections[key];
          var connSegs = key.split(",");
          var checkseg = (n == 0) ? connSegs[1] : connSegs[0];
          if (val == true && checkseg == segID) {
            numRevConns++;
          }
        }
      }

      if (attributes.fwdDirection == false && attributes.revDirection == true) {
        // one way A<-B
        for (var key in node.attributes.connections) {
          var val = node.attributes.connections[key];
          var connSegs = key.split(",");
          var checkseg = (n == 0) ? connSegs[0] : connSegs[1];
          if (val == true && checkseg == segID) {
            numRevConns++;
          }
        }
      }

      if (attributes.fwdDirection == true && attributes.revDirection == true) {
        // two-way, check for connections back to the same segment
        if (node.attributes.segIDs.length > 1) {
          for (var key in node.attributes.connections) {
            var val = node.attributes.connections[key];
            var connSegs = key.split(",");
            if (val == true && connSegs[0] == segID && connSegs[1] == segID) {
              numUTurns++;
            }
          }
        }
      }
    }

    var newColor = null;
    if (numUTurns > 0)          newColor = "#0ff";
    else if (numRevConns > 0)   newColor = "#f0f";
    else if (numRestrictions > 0)   newColor = "#909";

    var circle = getId(node.geometry.id);
    if (newColor != null && circle != null) {
      opacity = circle.getAttribute("fill-opacity");
      if (opacity < 0.1) {
        circle.setAttribute("fill-opacity", 0.75);
        circle.setAttribute("fill", newColor);
      }
    }
  }

  return true;
}


// add logged in user to drop-down list
function initUserList() {
  if (!advancedMode) return;

  var thisUser = Waze.loginManager.user;
  if (thisUser === null) return;

  var selectUser = getId('_selectUser');
  var usrOption = document.createElement('option');
  var usrRank = thisUser.normalizedLevel;
  var usrText = document.createTextNode(thisUser.userName + " (" + usrRank + ")");
  usrOption.setAttribute('value',thisUser.id);
  usrOption.appendChild(usrText);
  selectUser.appendChild(usrOption);
  console.log("WME Highlights: Init User list: " + thisUser.userName);
}

// add current city in to drop-down list
function initCityList() {
  var locationInfo = Waze.map.getControlsByClass('Waze.Control.LocationInfo')[0];
  if (locationInfo === null || locationInfo.location === null)
    return;

  var cityName = locationInfo.location.city;
  var thisCity = null;
  for (var city in Waze.model.cities.objects) {
    var cityObj = Waze.model.cities.get(city);
    if (cityObj.name == cityName) {
      thisCity = cityObj.id;
      break;
    }
  }
  if (thisCity === null)
    return;

  var selectCity = getId('_selectCity');
  var cityOption = document.createElement('option');
  var cityText = document.createTextNode(cityName);
  cityOption.appendChild(cityText);
  cityOption.setAttribute('value',thisCity);
  selectCity.appendChild(cityOption);
  console.log("WME Highlights: Init City list: " + cityName);

  // stop listening for this event
  Waze.model.events.unregister("mergeend", null, initCityList);
}

// populate drop-down list of editors
function updateUserList() {
  // update list of users - for high zoom and AMs only
  if (Waze.map.zoom <= 3 || !advancedMode)
    return;

  var selectUser = getId('_selectUser');
  var numUsers = Waze.model.users.objects.length;
  if (numUsers === 0)
    return;

  // preserve current selection
  var currentId = null;
  if (selectUser.selectedIndex >= 0)
    currentId = selectUser.options[selectUser.selectedIndex].value;

  // collect array of users who have edited segments
  var editorIds = [];
  for (var seg in Waze.model.segments.objects) {
    var segment = Waze.model.segments.get(seg);
    if (getId(segment.geometry.id) === null)
      continue;
    var updatedBy = segment.attributes.updatedBy;
    if (editorIds.indexOf(updatedBy) == -1)
      editorIds.push(updatedBy);
  }
  editorIds.sort();

  if (editorIds.length === 0)
    return;

  // reset list
  selectUser.options.length = 0;

  // add all users in field of view
  for (var i = 0; i < editorIds.length; i++) {
    var id = editorIds[i];
    var user = Waze.model.users.get(id);
    if (user === null || typeof(user) === "undefined")
      continue;

    var usrOption = document.createElement('option');
    var usrRank = user.normalizedLevel;
    var usrText = document.createTextNode(user.userName + " (" + usrRank + ")");
    if (currentId !== null && id == currentId)
      usrOption.setAttribute('selected',true);
    usrOption.setAttribute('value',id);
    usrOption.appendChild(usrText);
    selectUser.appendChild(usrOption);
  }
}

// populate drop-down list of Cities
function updateCityList() {
  var selectCity = getId('_selectCity');
  var numCities = Waze.model.cities.objects.length;

  if (numCities === 0)
    return;

  // preserve current selection
  var currentId = null;
  if (selectCity.selectedIndex >= 0)
    currentId = selectCity.options[selectCity.selectedIndex].value;

  // collect array of Cities
  var cityIds = [];
  var cityObjs = [];

  //=========================================================================================
  // This new block of code checks the following assumed conditions:
  // * Every U.S. city should have an associated state
  // * Every 'No city' U.S. city should be properly numbered (not an orphan blank city)
  // * We only care about states if get.cities shows us close enough to the U.S. to matter
  // * Any non US's city state code should be 99 (None/other)
  //========================================================================================

  // collect list if unique cities from the segments
  for (var sid in Waze.model.streets.objects) {
    var cid = Waze.model.streets.get(sid).cityID;
    var city = Waze.model.cities.get(cid);
    if (cityIds.indexOf(cid) == -1) {
      cityIds.push(cid);
      cityObjs.push({id: city.id, name: city.name, state: city.stateID, country: city.countryID});
    }
  }

  if (cityIds.length === 0)
    return;

  // reset list
  selectCity.options.length = 0;

  // count how many (non empty) states there are here
  var numStates = 0
  for (var obj in Waze.model.states.objects) {
    state = Waze.model.states.get(obj);
    if (state.id != 1 && state.name != "")
      numStates++;
  }

  // count how many countries there are here
  var numCountries = 0;
  for (var obj in Waze.model.countries.objects) {
    numCountries++;
  }

  // add all cities in field of view
  cityObjs.sort(function(a,b){return (a.name < b.name) ? -1 : (a.name > b.name) ? 1 : 0;});
  for (var i = 0; i < cityObjs.length; i++) {
    var cityID = cityObjs[i].id;
    // "State-like CityIDs" to ignore. These are consistently over 100,000,000.
    if (cityID > 100000000) continue;
    var cityName  = cityObjs[i].name;
    var stateID   = cityObjs[i].state;
    var countryID = cityObjs[i].country;

    if (countryID == 235) {  // for U.S. only
      // 'No City' segments in the U.S. should have an assigned state.
      // This ID has a prescribed range. If not in this range, we get 'other' state pollution in map,
      // or a bogus blank city associated to the state.

      if (cityName === "") {
        if (cityID >= 999900 && cityID <= 999999) {
          cityName = "No City";
        } else {
          cityName = "EMPTY CITY";
        }
      }
    }

    else { // for non U.S. segments
      if (cityName === "") cityName = "No City";
    }

    var stateObj = Waze.model.states.get(stateID);
    var countryObj = Waze.model.countries.get(countryID);

    // State handling. All cities should have an associated state. Throw an error if not.
    if (numStates > 0) {
      // If more than one state, we're appending it. No brainer.
      if (numStates > 1) {
        // ... and, if one of those states is 'Other', that's an error. Report it.
        if (stateObj.id === 99) {
            cityName += ", " + "NO STATE";
        }
        // If we get here, the state ID should be fine. Append it.
        else {
          cityName += ", " + stateObj.name;
        }
      }

      // If we have more than one country and are in the US, append the state for sanity.
      if (numStates == 1 && numCountries > 1) {
        cityName += ", " + stateObj.name;
      }
    }

    // If we're on a non-US street, state should always be 99, 'Other/none'.
    // Append if this is the case. Otherwise don't add anything.
    else if (stateID != 99 && stateID > 1) {
      cityName += ", INVALID STATE";
    }

    if (numCountries > 1) {
      cityName += ", " + countryObj.name.replace('United States', 'U.S.');
    }

    // create option in select menu
    var cityOption = document.createElement('option');
    var cityText = document.createTextNode(cityName);

    if (currentId !== null && cityID == currentId)
      cityOption.setAttribute('selected',true);
    cityOption.setAttribute('value',cityID);
    cityOption.appendChild(cityText);
    selectCity.appendChild(cityOption);
  }
}

var RoadTypes = {
  1: "Streets",
 21: "Service Road",
 98: "Non-Routable Roads",    // --------------
108: "- Dirt roads",
120: "- Parking Lot Road",
117: "- Private Road",
199: "Non-Drivable Roads",    // --------------
210: "- Pedestrian Bw",
205: "- Walking Trails",
216: "- Stairway",
219: "- Runway/Taxiway"
//  2: "Primary Street",
//  3: "Freeways",
//  4: "Ramps",
//  6: "Major Highway",
//  7: "Minor Highway",
// 18: "Railroad",
};

var nonRoutableTypes = new Array(8, 20, 17);
var nonDrivableTypes = new Array(10, 5, 16, 19);

// populate drop-down list of editors
function populateRoadTypes() {
  var selectRoadType = getId('_selectRoadType');

  for (var id in RoadTypes) {
    var type = RoadTypes[id]
    var usrOption = document.createElement('option');
    var usrText = document.createTextNode(type);
    if (id == 1)
      usrOption.setAttribute('selected',true);
    usrOption.setAttribute('value',id % 100);
    usrOption.appendChild(usrText);
    selectRoadType.appendChild(usrOption);
  }
}

function toggleOptions () {
  var objStyle = getId('hiliteOptions').style.display;
  if  (objStyle == "none") {
    objStyle = "block";
    getId('_btnHide').innerHTML = "hide";
  }
  else {
    objStyle = "none";
    getId('_btnHide').innerHTML = "show";
  }
  getId('hiliteOptions').style.display = objStyle;
  if (advancedMode)
    getId('advancedOptions').style.display = objStyle;
  getId('hiliteLandmarks').style.display = objStyle;
  return false;
}

// enable advanced options if user is logged in and at least an AM
function enableAdvancedOptions()
{
  if (advancedMode) return;

  if (typeof Waze == 'undefined')
    Waze = unsafeWindow.Waze;

  if (typeof Waze.loginManager == 'undefined')
    Waze.loginManager = unsafeWindow.Waze.loginManager;

  if (typeof Waze.loginManager == 'undefined')
    Waze.loginManager = unsafeWindow.loginManager;

  if (Waze.loginManager !== null && Waze.loginManager.isLoggedIn()) {
    thisUser = Waze.loginManager.user;
    if (thisUser !== null && thisUser.normalizedLevel >= 3) {
      Waze.loginManager.events.unregister("afterloginchanged", null, enableAdvancedOptions);
      console.log('WME Highlights: Advanced Options enabled for ' + thisUser.userName);
      getId('advancedOptions').style.display = 'block';
      advancedMode = true;
      initUserList();
      initCityList();
    }
  }
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

/* =========================================================================== */

function initialiseHighlights()
{
  // global variables
  advancedMode = false;
  betaMode = location.hostname.match(/editor-beta.waze.com/);
  lastSelected = null;
  lastModified = false;
  selectedLines = [];

  // add new box to left of the map
  var addon = document.createElement('section');
  addon.id = "highlight-addon";

  if (navigator.userAgent.match(/Chrome/)) {
    addon.innerHTML  = '<b><a href="https://chrome.google.com/webstore/detail/wme-color-highlights/ijnldkoicbhinlgnoigchihmegdjobjc" target="_blank"><u>'
                     + 'WME Colour Highlights</u></a></b> &nbsp; v' + wmech_version;
  } else {
    addon.innerHTML  = '<b><a href="http://userscripts.org/scripts/show/141050" target="_blank"><u>'
                     + 'WME Colour Highlights</u></a></b> &nbsp; v' + wmech_version;
                     + ' <a href="http://userscripts.org/scripts/show/141050" target="_blank">'
                     + '<img src="http://waze.cryosphere.co.uk/scripts/update.php?version=' + wmech_version + '" /></a>';
  }

  // highlight segements
  var section = document.createElement('p');
  section.style.paddingTop = "8px";
  section.style.textIndent = "16px";
  section.id = "hiliteOptions";
  section.innerHTML  = '<b>Highlight Segments</b><br>'
                     + '<input type="checkbox" id="_cbHighlightLocked" /> Editor Locks (Red)<br>'
                     + '<input type="checkbox" id="_cbHighlightRanked" /> <span title="*Not available in all countries yet">Traffic Locks* (Dark Red)</span><br>'
                     + '<input type="checkbox" id="_cbHighlightToll" /> Toll (Dashed)<br>'
                     + '<input type="checkbox" id="_cbHighlightUnnamed" /> No Name (Orange)<br>'
                     + '<input type="checkbox" id="_cbHighlightNoCity" /> No City (Gray)<br>'
                     + '<input type="checkbox" id="_cbHighlightOneWay" /> One Way (Blue)<br>'
                     + '<input type="checkbox" id="_cbHighlightNoDirection" /> Unknown Direction (Cyan)<br>'
                     + '<input type="checkbox" id="_cbHighlightRestrictions" /> Time/Vehicle Restrictions (Purple)<br>'
                     + '<input type="checkbox" id="_cbHighlightNoTerm" /> <span title="*Dead-end roads should have terminating nodes on the end, or Waze cannot route to or from them.">Unterminated Roads* (Lime)</span><br>'
                     + '<input type="checkbox" id="_cbHighlightCity" /> Filter by City (Yellow) '
                     + '<input type="checkbox" id="_cbHighlightCityInvert" /> invert <br> '
                     + '  <select id="_selectCity" name="_selectCity" style="margin: 0 0 4px 16px"></select>'
                     + '<span id="_numCityHighlighted"></span><br>'
                     + '<input type="checkbox" id="_cbHighlightRoadType" /> Highlight a Road Type (Purple)<br> '
                     + '  <select id="_selectRoadType" name="_selectRoadType" style="margin: 0 0 4px 16px"></select><br>'
                     ;
  addon.appendChild(section);

  // advanced options
  section = document.createElement('p');
  section.style.paddingTop = "8px";
  section.style.textIndent = "16px";
  section.style.display = "none";
  section.id = 'advancedOptions';
  section.innerHTML  = '<b>Advanced Options</b><br>'
             + '<input type="checkbox" id="_cbHighlightRecent" /> Recently Edited (Green)<br> '
             + '  <input type="number" min="0" max="365" size="3" id="_numRecentDays"  style="margin: 0 0 4px 16px"/> days<br>'
             + '<input type="checkbox" id="_cbHighlightEditor" /> Filter by Editor (Green)<br> '
             + '  <select id="_selectUser" name="_selectUser" style="margin: 0 0 4px 16px"></select>'
             + '<span id="_numUserHighlighted"></span><br>'
             + '<input type="checkbox" id="_cbHighlightTurns" /> <span title="*Highlight turn errors when a segment or node is selected, and on mjor roads">Turn Warnings for Selected Nodes*</span><br>'
             //'<input type="checkbox" id="_cbHighlightHouseNums" /> <span>Segments with House Numbers</span><br>'
             ;
  addon.appendChild(section);

  // highlight landmarks
  section = document.createElement('p');
  section.style.padding = "8px 16px";
  section.style.textIndent = "-16px";
  section.id = "hiliteLandmarks";
  section.innerHTML  = '<input type="checkbox" id="_cbHighlightLandmarks" /> <b title="'
                     + 'parks/trees = pale green, water = blue, parking lot = pink, '
                     + 'everything else = gray">Highlight Landmarks</b><br>';
  addon.appendChild(section);

  var userTabs = getId('user-info');
  var navTabs = getElementsByClassName('nav-tabs', userTabs)[0];
  var tabContent = getElementsByClassName('tab-content', userTabs)[0];

  newtab = document.createElement('li');
  newtab.innerHTML = '<a href="#sidepanel-highlights" data-toggle="tab">Highlight</a>';
  navTabs.appendChild(newtab);

  addon.id = "sidepanel-highlights";
  addon.className = "tab-pane";
  tabContent.appendChild(addon);

  // check for AM or CM, and unhide Advanced options
  enableAdvancedOptions();

  // always populate road types
  populateRoadTypes();

  // setup onclick handlers for instant update:
  getId('_cbHighlightLocked').onclick = highlightSegments;
  if (betaMode) getId('_cbHighlightRanked').onclick = highlightSegments;
  getId('_cbHighlightToll').onclick = highlightSegments;
  getId('_cbHighlightUnnamed').onclick = highlightSegments;
  getId('_cbHighlightNoCity').onclick = highlightSegments;
  getId('_cbHighlightOneWay').onclick = highlightSegments;
  getId('_cbHighlightNoDirection').onclick = highlightSegments;
  getId('_cbHighlightRestrictions').onclick = highlightSegments;
    

  getId('_cbHighlightRecent').onclick = highlightSegments;
  getId('_cbHighlightEditor').onclick = highlightSegments;
  getId('_cbHighlightCity').onclick = highlightSegments;
  getId('_cbHighlightCityInvert').onclick = highlightSegments;
  getId('_cbHighlightRoadType').onclick = highlightSegments;
  getId('_cbHighlightNoTerm').onclick = highlightSegments;
  getId('_cbHighlightTurns').onclick = highlightSelectedNodes;
  //getId('_cbHighlightHouseNums').onclick = highlightSegments;

  getId('_selectUser').onfocus = updateUserList;
  getId('_selectUser').onchange = highlightSegments;

  getId('_selectCity').onfocus = updateCityList;
  getId('_selectCity').onchange = highlightSegments;

  getId('_selectRoadType').onchange = highlightSegments;

  getId('_cbHighlightLandmarks').onclick = highlightLandmarks;


  // restore saved settings
  if (localStorage.WMEHighlightScript) {
    console.log("WME Highlights: loading options");
    options = JSON.parse(localStorage.WMEHighlightScript);

    getId('_cbHighlightLocked').checked       = options[1];
    getId('_cbHighlightToll').checked         = options[2];
    getId('_cbHighlightUnnamed').checked      = options[3];
    getId('_cbHighlightNoCity').checked       = options[4];
    getId('_cbHighlightOneWay').checked       = options[5];
    getId('_cbHighlightNoDirection').checked  = options[6];
    getId('_cbHighlightNoTerm').checked       = options[14];
    getId('_cbHighlightCity').checked         = options[15];
    getId('_cbHighlightRoadType').checked     = options[16];
    getId('_selectRoadType').selectedIndex    = options[17];
    getId('_cbHighlightLandmarks').checked    = options[7];
    getId('_cbHighlightRestrictions').checked = options[19];
    
    if (betaMode) {
      getId('_cbHighlightRanked').checked       = options[20];
    }
    
    if (options[12] === undefined) options[12] = 7;
    getId('_cbHighlightRecent').checked   = options[11];
    getId('_numRecentDays').value         = options[12];
    getId('_cbHighlightEditor').checked   = options[13];
    getId('_cbHighlightTurns').checked    = options[18];
    //getId('_cbHighlightHouseNums').checked= options[19];
  } else {
    getId('_cbHighlightLandmarks').checked = true;
    getId('_cbHighlightTurns').checked    = true;
  }

  if (typeof Waze.model.landmarks == "undefined") {
    getId('_cbHighlightLandmarks').checked = false;
    getId('_cbHighlightLandmarks').disabled = true;
  }

  // overload the WME exit function
  saveHighlightOptions = function() {
    if (localStorage) {
      console.log("WME Highlights: saving options");
      var options = [];

      // preserve previous options which may get lost after logout
      if (localStorage.WMEHighlightScript)
        options = JSON.parse(localStorage.WMEHighlightScript);

      options[1] = getId('_cbHighlightLocked').checked;
      options[2] = getId('_cbHighlightToll').checked;
      options[3] = getId('_cbHighlightUnnamed').checked;
      options[4] = getId('_cbHighlightNoCity').checked;
      options[5] = getId('_cbHighlightOneWay').checked;
      options[6] = getId('_cbHighlightNoDirection').checked;
      options[14] = getId('_cbHighlightNoTerm').checked;
      options[15] = getId('_cbHighlightCity').checked;
      options[16] = getId('_cbHighlightRoadType').checked;
      options[17] = getId('_selectRoadType').selectedIndex;
      options[7] = getId('_cbHighlightLandmarks').checked;
      options[19] = getId('_cbHighlightRestrictions').checked;

      if (betaMode) {
        options[20]= getId('_cbHighlightRanked').checked;
      }
     
      if (advancedMode) {
        options[11] = getId('_cbHighlightRecent').checked;
        options[12] = getId('_numRecentDays').value;
        options[13] = getId('_cbHighlightEditor').checked;
        options[18] = getId('_cbHighlightTurns').checked;
        //options[19] = getId('_cbHighlightHouseNums').checked;
      }

      localStorage.WMEHighlightScript = JSON.stringify(options);
    }
  }
  window.addEventListener("beforeunload", saveHighlightOptions, false);

  // begin periodic updates
  window.setInterval(highlightSegments,333);
  window.setInterval(highlightLandmarks,500);
  window.setInterval(highlightBadNodes,444);
  window.setInterval(highlightSelectedNodes,250);

  // trigger code when page is fully loaded, to catch any missing bits
  window.addEventListener("load", function(e) {
    var mapProblems = getId('map-problems-explanation')
    if (mapProblems !== null) mapProblems.style.display = "none";
    enableAdvancedOptions();
  });

  // register some events...
  Waze.map.events.register("zoomend", null, highlightSegments);
  Waze.map.events.register("zoomend", null, highlightLandmarks);
  Waze.map.events.register("zoomend", null, highlightSelectedNodes);

  Waze.selectionManager.events.register("selectionchanged", null, highlightSelectedNodes);
  //Waze.selectionManager.events.register("selectionchanged", null, extraDetails);

  Waze.loginManager.events.register("afterloginchanged", null, enableAdvancedOptions);
  Waze.model.events.register("mergeend", null, initCityList);
}

/* engage! =================================================================== */
bootstrapHighlights();

/* end ======================================================================= */
