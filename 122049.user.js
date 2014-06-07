// ==UserScript==
// @name WME Street to river
// @description This script create a new river landmark in waze editor papyrus. It transforms the the geometry of a new unsaved street to a polygon.
// @namespace http://www.tay-tec.de/waze-street-to-river
// @grant none
// @version 12.12.20.1
// @include https://*.waze.com/editor/*
// @include https://*.waze.com/map-editor/*
// @include https://*.waze.com/beta_editor/*
// @include https://descartes.waze.com/beta/*
// @include https://descartesw.waze.com/beta/*
// ==/UserScript==


// Mini howto:
// 1) install this script as greasemonkey script or chrome extension
// 2) draw a new street but do not save the street
// 3) add and apply a street name to define the rivers name and the the width of the river
//    Example: "20m Spree" creates a 20 meters width river named "Spree"
// 4) Select the helper street
// 5) Click the "Street to river" button
// 4) Delete the helper street
// 5) Edit the new landmark as you like


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
        }, 0);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}


function streetToRiver() {

  var defaultWidth = 20;

  function insertButtons() {
    if(selectionManager.selectedItems.length == 0) return;
    if(document.getElementById('streetToRiver') != null) return;
	    
    var btn1 = $('<button class="btn" title="create a new street, select and click this button">Street to river</button>');
    btn1.click(doRiver);
    var btn2 = $('<button class="btn" title="create a new street, select and click this button">Street to railway</button>');
    btn2.click(doRailway);

    var cnt = $('<section id="streetToRiver"/>');
    cnt.append(btn1);
    cnt.append(btn2);
    $("#segment-edit-general").append(cnt);
    console_log("Street to river initialized");
  }

  function doRiver(ev) {
    var foundSelectedSegment = false;
    for (var s=selectionManager.selectedItems.length-1; s>=0; s--) {
      var sel = selectionManager.selectedItems[s];
      if (sel.type == "segment" && sel.state == "Insert") {
        // found segment
        foundSelectedSegment = true;
        if (convertToLandmark(sel, "H3010"))
        {
          alert("Successfully created new river landmark");
        }
      }
    }
    if (! foundSelectedSegment) {
        alert("No unsaved and selected new street found!");
      }
  }

  function doRailway(ev) {
    var foundSelectedSegment = false;
    for (var s=selectionManager.selectedItems.length-1; s>=0; s--) {
      var sel = selectionManager.selectedItems[s];
      if (sel.type == "segment" && (sel.state == "Insert" || sel.data.roadType == 18)) {
        // found segment
        foundSelectedSegment = true;
        defaultWidth = 8;
        if (convertToLandmark(sel, "W0200"))
        {
          alert("Successfully created new railway landmark");
        }
        defaultWidth = 20;
      }
    }
    if (! foundSelectedSegment) {
        alert("No unsaved new street or railroad found!");
      }
  }

  function convertToLandmark(sel, lmtype) {

    var leftPa, rightPa, leftPb, rightPb;
    var prevLeftEq, prevRightEq;
    var street = getStreet(sel);

    var displacement = getDisplacement(street);

    var polyPoints = null;
    var vertices = sel.geometry.getVertices();
    for (var i=vertices.length-1; i>0; i--)
    {
      var pa = vertices[i];
      var pb = vertices[i-1];
      var scale = (pa.distanceTo(pb) + displacement) / pa.distanceTo(pb);

      leftPa = pa.clone();
      leftPa.resize(scale, pb, 1);
      rightPa = leftPa.clone();
      leftPa.rotate(90,pa);
      rightPa.rotate(-90,pa);

      leftPb = pb.clone();
      leftPb.resize(scale, pa, 1);
      rightPb = leftPb.clone();
      leftPb.rotate(-90,pb);
      rightPb.rotate(90,pb);

      var leftEq = getEquation({ 'x1': leftPa.x, 'y1': leftPa.y, 'x2': leftPb.x, 'y2': leftPb.y });
      var rightEq = getEquation({ 'x1': rightPa.x, 'y1': rightPa.y, 'x2': rightPb.x, 'y2': rightPb.y });
      if (polyPoints == null) {
        polyPoints = [ leftPa, rightPa ];
      }
      else {
        var li = intersectX(leftEq, prevLeftEq);
        var ri = intersectX(rightEq, prevRightEq);
        if (li && ri) {
          polyPoints.unshift(li);
          polyPoints.push(ri);
        }
        else {
          polyPoints.unshift(leftPb.clone());
          polyPoints.push(rightPb.clone());
        }
      }

      prevLeftEq = leftEq;
      prevRightEq = rightEq;
    }

    polyPoints.push(rightPb);
    polyPoints.push(leftPb);

    var polygon = new OpenLayers.Geometry.Polygon(new OpenLayers.Geometry.LinearRing(polyPoints));

    var landmark = new Waze.Feature.Vector.Landmark(polygon);
    landmark.attributes.mtfcc = lmtype;
    if (street) {
      landmark.attributes.name = street.name.replace(/^\d+(m|ft)\s*/, '');
    }
    var what = wazeModel.actionManager.add(new Waze.Action.AddLandmark(landmark));

    return true;
  }


  function getEquation(segment) {
    if (segment.x2 == segment.x1)
      return { 'x': segment.x1 };

    var slope =  (segment.y2 - segment.y1) / (segment.x2 - segment.x1);
    var offset = segment.y1 - (slope  * segment.x1)
    return { 'slope': slope, 'offset': offset };
  }

  //
  // line A: y = ax + b
  // line B: y = cx + b
  //
  // x = (d - b) / (a - c)
  function intersectX(eqa,eqb,defaultPoint) {
    if ("number" == typeof eqa.slope && "number" == typeof eqb.slope) {
      if (eqa.slope == eqb.slope)
        return null;

      var ix = (eqb.offset - eqa.offset) / (eqa.slope - eqb.slope);
      var iy = eqa.slope * ix + eqa.offset;
      return new OpenLayers.Geometry.Point(ix, iy);
    }
    else if ("number" == typeof eqa.x) {
      return new OpenLayers.Geometry.Point(eqa.x, eqb.slope * eqa.x + eqb.offset);
    }
    else if ("number" == typeof eqb.y) {
      return new OpenLayers.Geometry.Point(eqb.x, eqa.slope * eqb.x + eqa.offset);
    }
    return null;
  }


  function getStreet(segment) {
    if (! segment.attributes.primaryStreetID)
      return null;
    var street = segment.model.streets.get(segment.attributes.primaryStreetID)
    return street;
  }

  function getDisplacement(street) {
    if (! street)
      return defaultWidth;
    if (street.name.match(/^(\d+)m\b/))
      return parseInt(RegExp.$1);
    if (street.name.match(/^(\d+)ft\b/))
      return parseInt(RegExp.$1) * 0.3048;
    return defaultWidth;
  }

  function console_log(msg) {
    if (console.log)
      console.log(msg);
  }
 
  selectionManager.events.register("selectionchanged", null, insertButtons);
}

streetToRiver();