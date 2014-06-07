// ==UserScript==
// @name                WME Junction Node Fixer
// @description         Creates a new editor hotkey to lock turns, fix reverse connectivity, and restore original restricted turns.
// @updateURL           https://userscripts.org/scripts/source/144939.user.js
// @include             https://*.waze.com/editor/*
// @include             https://*.waze.com/map-editor/*
// @include             https://*.waze.com/beta_editor/*
// @include             https://editor-beta.waze.com/*
// @include             https://descartes.waze.com/beta/*
// @include             https://descartesw.waze.com/beta/*
// @version             0.0.8.2
// ==/UserScript==

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
    }, 1000);
  })();

  // Stop running, because we know Greasemonkey actually runs us in
  // an anonymous wrapper.
  return;
}

WME_JNF_Version = "v0.0.8.2";

var matched = false;
var WME_Version = undefined;

console.log("WME-JNF: " + WME_JNF_Version + " starting");

// Feature detect + local reference
var storage,
    fail,
    uid;
try {
  uid = new Date;
  (storage = window.localStorage).setItem(uid, uid);
  fail = storage.getItem(uid) != uid;
  storage.removeItem(uid);
  fail && (storage = false);
} catch(e) {}

options = {};

WCENC = null;
WCSAVE = null;
WCCHAT = null;
WCLU = null;
WCUR = null;
WCMP = null;

WME_JNF_PatchAndReload = function() {
  var patch;
}

WME_JNF_SaveEnd = function(b) {
  console.log("WME-JNF: Save %s", b.success ? "succeeded" : "failed");
  if (b.success) {
    WCSAVE.controller.reload();
  }
}

WME_JNF_CleanRBT = function(jct) {
  var geo = Waze.map.getExtent().toGeometry();
  var roadTypes = { "street": 1,      "primary": 2,   "freeway": 3,   "ramp": 4,
                    "trail": 5,       "major": 6,     "minor": 7,     "dirt": 8,
                    "boardwalk": 10,  "stairway": 16, "private": 17,  "railroad": 18,
                    "runway": 19,     "parking": 20,  "service": 21};
  var typenames = { 1: "street",      2: "primary",   3: "freeway",   4: "ramp",
                    5: "trail",       6: "major",     7: "minor",     8: "dirt",
                    10: "boardwalk",  16: "stairway", 17: "private",  18: "railroad",
                    19: "runway",     20: "parking",  21: "service"};
  var prec = [4, 6, 7, 2, 1, 21, 17, 20, 8];
  if (jct.valid == true) {
    var types = {};
    var roadtype = false;
    var cities = {};
    var i = 0;
    var cityid = 0;
    var street = null;
    var city = null;
    var state = null;
    var country = null;
    var update = true;
    var street_updated = false;
    var type_updated = false;
    var nodes = {};
    
    jct.segIDs.forEach(function(segid) {
      var seg = Waze.model.segments.get(segid);
      for (var i = 0; i < seg.geometry.components.length; i++)
        if (!geo.containsPoint(seg.geometry.components[i]))
          update = false;
    });

    if (update == false)
      return;
    
    jct.segIDs.forEach(function(segid) {
      var seg = Waze.model.segments.get(segid);
      if (seg.attributes.primaryStreetID) {
        street = Waze.model.streets.get(seg.attributes.primaryStreetID);
        city = Waze.model.cities.get(street.cityID);
        if (city) {
          if (!cities[street.cityID])
            cities[street.cityID] = 0;
          if (!city.isEmpty)
            cities[street.cityID] += 100;
        }
      }
      nodes[seg.attributes.toNodeID] = Waze.model.nodes.get(seg.attributes.toNodeID);
      nodes[seg.attributes.fromNodeID] = Waze.model.nodes.get(seg.attributes.fromNodeID);
    });
    Object.forEach(nodes, function(k, node) {
      node.attributes.segIDs.forEach(function(csegid) {
        var cseg = Waze.model.segments.get(csegid);
        if (!cseg.attributes.junctionID) {
          if (cseg.attributes.roadType != roadTypes["freeway"]) {
            if (!types[cseg.attributes.roadType])
              types[cseg.attributes.roadType] = 0;
            if (cseg.attributes.fwdDirection)
              types[cseg.attributes.roadType] += 1;
            if (cseg.attributes.revDirection)
              types[cseg.attributes.roadType] += 1;
            if (cseg.attributes.primaryStreetID) {
              street = Waze.model.streets.get(cseg.attributes.primaryStreetID);
              city = Waze.model.cities.get(street.cityID);
              if (city) {
                if (!cities[street.cityID])
                  cities[street.cityID] = 0;
                if (city.isEmpty) {
                  cities[street.cityID] += 1; 
                } else {
                  cities[street.cityID] += 2;
                }
              }
            }
          } 
        }
      });
    });
    i = 0;
    Object.forEach(cities, function(k, v) {
      if (i < v) {
        i = v;
        cityid = k;
      }
    });
    street = Waze.model.streets.getByAttributes({isEmpty: true, cityID: cityid}).first();
    city = Waze.model.cities.get(cityid);
    if (city)
      country = Waze.model.countries.get(city.countryID);
    state = null;
    if (city && city.stateID)
      state = Waze.model.states.get(city.stateID);
    var j;
    for (i = 0; i < prec.length && !roadtype; i++) {
      if (city.countryID == 234 && prec[i] == 4)
        continue;
      if (prec[i] in types) {
        if (types[prec[i]] > 3 || (types[prec[i]] && city.countryID == 234)) {
          roadtype = prec[i];
        } else {
          for (j = i+1; j < prec.length && !roadtype; j++) {
            if (types[prec[j]] > 1) {
              roadtype = prec[j];
            }
          }
        }
        if (!roadtype)
          roadtype = prec[i];
      }
    }
    jct.segIDs.forEach(function(segid) {
      var seg = Waze.model.segments.get(segid);
      if (seg.attributes.roadType != roadtype) {
        Waze.model.actionManager.add(new Waze.Action.UpdateSegmentDetails(seg, {roadType: roadtype}));
        if (!type_updated) {
          console.log("JNF_RBT: road type: " + roadtype + " " + typenames[roadtype]);
          type_updated = true;
        }
      }
      if (!seg.attributes.primaryStreetID || (street && seg.attributes.primaryStreetID != street.id)) {
        Waze.model.actionManager.add(new Waze.Action.UpdateSegmentAddress(seg, {countryID: city.countryID, stateID: city.stateID, cityName: city.name, emptyStreet: true}));
        if (!street_updated) {
          if (state.name != "Other")
            console.log("JNF_RBT: " + city.name + ", " + state.name + ", " + country.name);
          else
            console.log("JNF_RBT: " + city.name + ", " + country.name);
          street = Waze.model.streets.getByAttributes({isEmpty: true, cityID: cityid}).first();
          console.log("JNF_RBT: street: %o ", street);
          street_updated = true;
        }
      }
    });
    Object.forEach(nodes, function(k, node) {
      WME_JNF_FixNode(node, false);
    });
  }
}

WME_JNF_DAT = function(a) {
  if (!a.enabled)
    return;
  WME_JNF_FixNode(a.selectedFeature, true);
}

WME_JNF_FixNode = function(node, doJunctions) {
  var view = Waze.map.getExtent().toGeometry();
  if (!node)
    return;
  if (!node.type)
    return;
  if (node.type != "node")
    return;
  if (node.areConnectionsEditable()) {
    connections = {};
    junctions = {};
    
    for (var i = 0; i < node.attributes.segIDs.length; i++) {
      var seg = Waze.model.segments.get(node.attributes.segIDs[i]);
      if (seg) {
        // store any roundabouts we see
        if (seg.attributes.junctionID) {
          if (seg.attributes.toNodeID == seg.attributes.fromNodeID) {
            console.log("single node rb");
            var seg1geo = seg.geometry.clone();
            var seg2geo = seg.geometry.clone();
            var isOdd = seg.geometry.components.length % 2;
            for (var i = 0; i < seg.geometry.components.length / 2 - 1; i++) {
              seg1geo.components.pop();
              seg2geo.components.shift();
            }
            if (isOdd == 0) {
              seg2geo.components.shift();
            }
            var newseg1 = new Waze.Feature.Vector.Segment(seg1geo);
            var newseg2 = new Waze.Feature.Vector.Segment(seg2geo);
            newseg1.copyAttributes(seg);
            newseg2.copyAttributes(seg);
            newseg1.attributes.junctionID = null;
            newseg2.attributes.junctionID = null;
            newseg1.attributes.fromNodeID = null;
            newseg2.attributes.fromNodeID = null;
            newseg1.attributes.toNodeID = null;
            newseg2.attributes.toNodeID = null;
            var joinsegs = [];
            joinsegs.push(newseg1);
            joinsegs.push(newseg2);
            Waze.model.actionManager.add(new Waze.Action.DisconnectSegment(seg, node));
            Waze.model.actionManager.add(new Waze.Action.AddSegment(newseg1));
            Waze.model.actionManager.add(new Waze.Action.AddSegment(newseg2));
            Waze.model.actionManager.add(new Waze.Action.ConnectSegment(node, newseg1));
            Waze.model.actionManager.add(new Waze.Action.ConnectSegment(node, newseg2));
            Waze.model.actionManager.add(new Waze.Action.AddNode(seg1geo.components.last(), joinsegs));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(newseg1.attributes.fromNodeID), false));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(newseg1.attributes.fromNodeID), true));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(newseg1.attributes.toNodeID), false));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(newseg1.attributes.toNodeID), true));
            Waze.model.actionManager.add(new Waze.Action.DeleteSegment(seg));
          } else {
            junctions[seg.attributes.junctionID] = Waze.model.junctions.get(seg.attributes.junctionID);
          }
        } else {
          // check for and fix looped segments, exclude roundabouts.
          if (seg.attributes.toNodeID == seg.attributes.fromNodeID) {
//          console.log("splitting");
            Waze.model.actionManager.add(new Waze.Action.DisconnectSegment(seg, node));
            var oldGeo = seg.geometry.clone();
            var newGeo = seg.geometry.clone();
            var isOdd = seg.geometry.components.length % 2;
            var joinsegs = [];
            for (var i = 0; i < seg.geometry.components.length / 2 - 1; i++) {
               newGeo.components.pop();
               oldGeo.components.shift();
            }
            if (isOdd == 0) {
              oldGeo.components.shift();
            }
            Waze.model.actionManager.add(new Waze.Action.UpdateSegmentGeometry(seg, seg.geometry, newGeo));
            var newseg = new Waze.Feature.Vector.Segment(oldGeo);
            newseg.copyAttributes(seg);
            newseg.attributes.fromNodeID = null;
            newseg.attributes.toNodeID = null;
//            newseg.attributes.fwdDirection    = seg.attributes.fwdDirection;
//            newseg.attributes.fwdToll         = seg.attributes.fwdToll;
//            newseg.attributes.level           = seg.attributes.level;
//            newseg.attributes.locked          = seg.attributes.locked;
//            newseg.attributes.primaryStreetID = seg.attributes.primaryStreetID;
//            newseg.attributes.rank            = seg.attributes.rank;
//            newseg.attributes.revDirection    = seg.attributes.revDirection;
//            newseg.attributes.revToll         = seg.attributes.revToll;
//            newseg.attributes.roadType        = seg.attributes.roadType;
//            newseg.attributes.separator       = seg.attributes.separator;
//            newseg.attributes.type            = seg.attributes.type;
            Waze.model.actionManager.add(new Waze.Action.AddSegment(newseg));
            joinsegs.push(seg);
            joinsegs.push(newseg);
            Waze.model.actionManager.add(new Waze.Action.ConnectSegment(node, newseg));
            Waze.model.actionManager.add(new Waze.Action.ConnectSegment(node, seg));
            Waze.model.actionManager.add(new Waze.Action.AddNode(seg.geometry.components.last(), joinsegs));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(node, false));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(node, true));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(seg.attributes.toNodeID), false));
            Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(wazeModel.nodes.get(seg.attributes.toNodeID), true));
          }
          
          var segments = [];
          segments.push(seg);
          // terminate unterminated dead-ends
          if (seg.attributes.toNodeID == null) {
            Waze.model.actionManager.add(new Waze.Action.AddNode(seg.geometry.components.last(), segments));
          }
          if (seg.attributes.fromNodeID == null) {
            Waze.model.actionManager.add(new Waze.Action.AddNode(seg.geometry.components.first(), segments));
          }
          var toNode = null;
          var fromNode = null;
  
          if (seg.attributes.toNodeID)
            toNode = Waze.model.nodes.get(seg.attributes.toNodeID);
          if (seg.attributes.fromNodeID)
            fromNode = Waze.model.nodes.get(seg.attributes.fromNodeID);
          if (view.containsPoint(toNode.geometry) && view.containsPoint(fromNode.geometry)) {
            if ((seg.attributes.fwdDirection == false || seg.attributes.revDirection == false) && (toNode.attributes.segIDs.length < 2 || fromNode.attributes.segIDs.length < 2))
            {
              console.log("JNF: updating dead-end segment " + seg.fid + " to two-way");
              Waze.model.actionManager.add(new Waze.Action.UpdateSegmentDetails(seg, {fwdDirection: true, revDirection: true}));
            }
            if (toNode.attributes.segIDs.length < 2) {
              Object.forEach(toNode.attributes.connections, function(i, j) {
                var connSegs = i.split(",");
                if (connSegs.first() == connSegs.last() && j) {
                  console.log("Disabling dead-end u-turn");
                  Waze.model.actionManager.add(new Waze.Action.ModifyConnection(connSegs.first(), toNode, connSegs.last(), false));
                }
              });
              if (!seg.attributes.fwdTurnsLocked) {
                 Waze.model.actionManager.add(new Waze.Action.UpdateSegmentDetails(seg, {fwdTurnsLocked: true}));
              }
            }
            if (fromNode.attributes.segIDs.length < 2) {
              Object.forEach(fromNode.attributes.connections, function(i, j) {
                var connSegs = i.split(",");
                if (connSegs.first() == connSegs.last() && j) {
                  console.log("Disabling dead-end u-turn");
                  Waze.model.actionManager.add(new Waze.Action.ModifyConnection(connSegs.first(), fromNode, connSegs.last(), false));
                }
              });
              if (!seg.attributes.revTurnsLocked) {
                 Waze.model.actionManager.add(new Waze.Action.UpdateSegmentDetails(seg, {revTurnsLocked: true}));
              }
            }
          }
//          console.log("done");
        }
      }
    }
    
    if (doJunctions) {
//      console.log("clean rbt");
      // clean up roundabouts
      Object.forEach(junctions, function(i, j) {
        WME_JNF_CleanRBT(j);
      });
    }
    
    // save a copy of the existing connections
    Object.forEach(node.attributes.connections, function(i, j) {
      connections[i] = j;
    });
    
    var has_soft = false;
    var has_revcon = false;
    var has_selfcon = false;
    // repair any self-connection RevConn
    Object.forEach(node.attributes.connections, function(i, j) {
      var connSegs = i.split(",");
      var fseg = Waze.model.segments.get(connSegs.first());
      var tseg = Waze.model.segments.get(connSegs.last());
      if (!has_soft && ((fseg.attributes.toNodeID == node.fid   && !fseg.attributes.fwdTurnsLocked) ||
                        (fseg.attributes.fromNodeID == node.fid && !fseg.attributes.revTurnsLocked) ||
                        (tseg.attributes.toNodeID == node.fid   && !tseg.attributes.fwdTurnsLocked) ||
                        (tseg.attributes.fromNodeID == node.fid && !tseg.attributes.revTurnsLocked))
         ) {
        has_soft = true;            
      }
      if (!node.isTurnAllowedBySegDirections(fseg, tseg)) {
        has_revcon = true;
      }
      if (connSegs.first() == connSegs.last()) {
        has_selfcon = true;
//        seg = Waze.model.segments.get(connSegs.first());
        Waze.model.actionManager.add(new Waze.Action.ModifyConnection(connSegs.first(), node, connSegs.last(), false));
//        Waze.model.actionManager.add(new Waze.Action.DisconnectSegment(seg, node, {deleteNode : false}));
//        Waze.model.actionManager.add(new Waze.Action.ConnectSegment(node, seg));
      }
    });
    
    if (has_soft || has_revcon || has_selfcon) {
      // 'qw' the node to lock all the turns
      Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(node, false));
      Waze.model.actionManager.add(new Waze.Action.ModifyAllConnections(node, true));
    }
    
    // disable any connection that was either originally disabled or didn't exist
    Object.forEach(node.attributes.connections, function(i, j) {
      var connSegs = i.split(",");
      if (j && !connections[i]) {
        Waze.model.actionManager.add(new Waze.Action.ModifyConnection(parseInt(connSegs.first(), 10), node, parseInt(connSegs.last(), 10), false));
      }
    });
    
    // refresh turn arrows
    WCENC.toggleShowAllArrows();
    WCENC.toggleShowAllArrows();
  }
}

WME_JNF_CheckAPI  = function() {
  if (typeof(Waze) != "object") {
    matched = "Waze";
    return false;
  }
  if (typeof(Waze.model) != "object") {
    if (typeof(wazeModel) != "object") {
      matched = "Waze.model";
      return false;
    } else {
      Waze.model = wazeModel;
    }
  }
  if (typeof(Waze.map) != "object") {
    if (typeof(wazeMap) != "object") {
      matched = "Waze.map";
      return false;
    } else {
      Waze.map = wazeMap;
    }
  }
  if (typeof(Waze.map.controls) != "object") {
    matched = "Waze.map.controls";
    return false;
  }
  if (typeof(Waze.map.controls[0]) != "object") {
    matched = "Waze.map.controls[0]";
    return false;
  }
  if (typeof(Waze.map.controls[0].displayClass) != "string") {
    matched = "Waze.map.controls[0].displayClass";
    return false;
  }
  Object.forEach(Waze.map.controls, function(k, v) {
    if (v.displayClass == "WazeControlEditNodeConnections") {
      WCENC = v;
    }
    if (v.displayClass == "WazeControlSave") {
      WCSAVE = v;
    }
    if (v.displayClass == "WazeControlChat") {
      WCCHAT = v;
    }
    if (v.displayClass == "WazeControlMapProblems") {
      WCMP = v;
    }
    if (v.displayClass == "WazeControlUpdateRequests") {
      WCUR = v;
    }
    if (v.displayClass == "WazeControlLiveUsers") {
      WCLU = v;
    }
  });
  if (typeof(WCENC) != "object") {
    matched = "WCENC";
    return false;
  }
  if (typeof(WCSAVE) != "object") {
    matched = "WCSAVE";
    return false;
  }
  if (typeof(WCCHAT) != "object") {
    matched = "WCCHAT";
    return false;
  }
  if (typeof(WCMP) != "object") {
    matched = "WCMP";
    return false;
  }
  if (typeof(WCUR) != "object") {
    matched = "WCUR";
    return false;
  }
  if (typeof(WCLU) != "object") {
    matched = "WCLU";
    return false;
  }
  if (typeof(Waze.Config) != "object") {
    matched = "Waze.Config";
    return false;
  }
  if (typeof(Waze.Config.cameras) != "object") {
    matched = "Waze.Config.cameras";
    return false;
  }
  if (typeof(Waze.Config.cameras.minDisplayZoom) != "number") {
    matched = "Waze.Config.cameras.minDisplayZoom";
    return false;
  }
  if (typeof(Waze.model.cameras) != "object") {
    matched = "Waze.model.cameras";
    return false;
  }
  if (typeof(Waze.model.cameras.minZoom) != "number") {
    matched = "Waze.model.cameras.minZoom";
    return false;
  }
  if (typeof(Waze.map.toggleFullscreen) != "function") {
    matched = "Waze.map.toggleFullscreen";
    return false;
  }
  if (typeof(WCENC.showAllArrows) != "boolean") {
    matched = "WCENC.showAllArrows";
    return false;
  }
  if (typeof(WCENC.showArrows) != "boolean") {
    matched = "WCENC.showArrows";
    return false;
  }
  if (typeof(WCENC.toggleShowAllArrows) != "function") {
    matched = "WCENC.toggleShowAllArrows";
    return false;
  }
  if (typeof(WCSAVE.controller) != "object") {
    matched = "WCSAVE.controller";
    return false;
  }
  if (typeof(WCSAVE.controller.events) != "object") {
    matched = "WCSAVE.controller.events";
    return false;
  }
  if (typeof(WCSAVE.controller.events.register) != "function") {
    matched = "WCSAVE.controller.events.register";
    return false;
  }
  if (typeof(Waze.map.DefaultPanInPixel) != "number") {
    matched = "Waze.map.DefaultPanInPixel";
    return false;
  }
  if (typeof(Waze.accelerators) != "object") {
    if (typeof(Waze.Accelerators) != "object") {
      matched = "Waze.accelerators";
      return false;
    } else {
      Waze.accelerators = Waze.Accelerators;
    }
  }
  if (typeof(Waze.accelerators.events) != "object") {
    matched = "Waze.accelerators.events";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners) != "object") {
    matched = "Waze.accelerators.events.listeners";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.disallowAllConnections) != "object") {
    matched = "Waze.accelerators.events.listeners.disallowAllConnections";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.disallowAllConnections[0]) != "object") {
    matched = "Waze.accelerators.events.listeners.disallowAllConnections[0]";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.disallowAllConnections[0].func) != "function") {
    matched = "Waze.accelerators.events.listeners.disallowAllConnections[0].func";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.allowAllConnections) != "object") {
    matched = "Waze.accelerators.events.listeners.allowAllConnections";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.allowAllConnections[0]) != "object") {
    matched = "Waze.accelerators.events.listeners.allowAllConnections[0]";
    return false;
  }
  if (typeof(Waze.accelerators.events.listeners.allowAllConnections[0].func) != "function") {
    matched = "Waze.accelerators.events.listeners.allowAllConnections[0].func";
    return false;
  }
  if (typeof(Waze.map.getExtent) != "function") {
    matched = "Waze.map.getExtent";
    return false;
  }
  var tstvar = Waze.map.getExtent();
  if (typeof(tstvar) != "object") {
    matched = "Waze.map.getExtent()";
    return false;
  }
  if (typeof(tstvar.toGeometry) != "function") {
    matched = "Waze.map.getExtent().toGeometry";
    return false;
  }
  var tstvar = tstvar.toGeometry();
  if (typeof(tstvar) != "object") {
    matched = "Waze.map.getExtent().toGeometry() == object";
    return false;
  }
  if (typeof(tstvar.containsPoint) != "function") {
    matched = "Waze.map.getExtent().toGeometry().containsPoint";
    return false;
  }
  if (typeof(Waze.model.segments) != "object") {
    matched = "Waze.model.segments";
    return false;
  }
  if (typeof(Waze.model.segments.get) != "function") {
    matched = "Waze.model.segments.get";
    return false;
  }
  if (typeof(Waze.model.nodes) != "object") {
    matched = "Waze.model.nodes";
    return false;
  }
  if (typeof(Waze.model.nodes.get) != "function") {
    matched = "Waze.model.nodes.get";
    return false;
  }
  if (typeof(Waze.model.junctions) != "object") {
    matched = "Waze.model.junctions";
    return false;
  }
  if (typeof(Waze.model.junctions.get) != "function") {
    matched = "Waze.model.junctions.get";
    return false;
  }
  if (typeof(Waze.model.streets) != "object") {
    matched = "Waze.model.streets";
    return false;
  }
  if (typeof(Waze.model.streets.get) != "function") {
    matched = "Waze.model.streets.get";
    return false;
  }
  if (typeof(Waze.model.streets.getByAttributes) != "function") {
    matched = "Waze.model.streets.getByAttributes";
    return false;
  }
  if (typeof(Waze.model.cities) != "object") {
    matched = "Waze.model.cities";
    return false;
  }
  if (typeof(Waze.model.cities.get) != "function") {
    matched = "Waze.model.cities.get";
    return false;
  }
  if (typeof(Waze.model.countries) != "object") {
    matched = "Waze.model.countries";
    return false;
  }
  if (typeof(Waze.model.countries.get) != "function") {
    matched = "Waze.model.countries.get";
    return false;
  }
  if (typeof(Waze.model.actionManager) != "object") {
    matched = "Waze.model.actionManager";
    return false;
  }
  if (typeof(Waze.model.actionManager.add) != "function") {
    matched = "Waze.model.actionManager.add";
    return false;
  }
  if (typeof(Waze.Action) != "function") {
    matched = "Waze.Action";
    return false;
  }
  if (typeof(Waze.Action.UpdateSegmentDetails) != "function") {
    matched = "Waze.Action.UpdateSegmentDetails";
    return false;
  }
  if (typeof(Waze.Action.UpdateSegmentAddress) != "function") {
    matched = "Waze.Action.UpdateSegmentAddress";
    return false;
  }
  if (typeof(Waze.Action.DisconnectSegment) != "function") {
    matched = "Waze.Action.DisconnectSegment";
    return false;
  }
  if (typeof(Waze.Action.UpdateSegmentGeometry) != "function") {
    matched = "Waze.Action.UpdateSegmentGeometry";
    return false;
  }
  if (typeof(Waze.Action.AddSegment) != "function") {
    matched = "Waze.Action.AddSegment";
    return false;
  }
  if (typeof(Waze.Action.AddNode) != "function") {
    matched = "Waze.Action.AddNode";
    return false;
  }
  if (typeof(Waze.Action.ConnectSegment) != "function") {
    matched = "Waze.Action.ConnectSegment";
    return false;
  }
  if (typeof(Waze.Action.ModifyAllConnections) != "function") {
    matched = "Waze.Action.ModifyAllConnections";
    return false;
  }
  if (typeof(Waze.Feature) != "object") {
    matched = "Waze.Feature";
    return false;
  }
  if (typeof(Waze.Feature.Vector) != "function") {
    matched = "Waze.Feature.Vector";
    return false;
  }
  if (typeof(Waze.Feature.Vector.Segment) != "function") {
    matched = "Waze.Feature.Vector.Segment";
    return false;
  }
  if (typeof(Waze.model.nodes.objects) != "object") {
    matched = "Waze.model.nodes.objects";
    return false;
  }
  tstvar = Object.keys(Waze.model.nodes.objects);
  if (typeof(tstvar) != "object") {
    matched = "Waze.model.nodes.objects keys";
    return false;
  }
//  if (typeof(tstvar[0]) != "string") {
//    matched = "Waze.model.nodes.objects keys[0]";
//    return false;
//  }
//  tstvar = Waze.model.nodes.get(tstvar[0]);
//  if (typeof(tstvar) != "object") {
//    matched = "Waze.model.nodes.get(keys[0])";
//    return false;
//  }
//  if (typeof(tstvar.areConnectionsEditable) != "function") {
//    matched = "node.areConnectionsEditable";
//    return false;
//  }
//  if (typeof(tstvar.isTurnAllowedBySegDirections) != "function") {
//    matched = "node.isTurnAllowedBySegDirections";
//    return false;
//  }
  return true;
}

WME_JNF_RestoreSettings = function () {
  // restore saved setting
  if (storage) {
    console.log("WME-JNF: loading options");
    options = JSON.parse(storage.getItem('WME_JNF'));
    if (options == null) {
      console.log("no options");
      return;
    }
    if (WCENC) {
      WCENC.showAllArrows = options['showallarrows'];
      WCENC.showArrows = options['showarrows'];
      WCENC.toggleShowAllArrows();
      WCENC.toggleShowAllArrows();
    } else {
      console.log("no WCENC");
    }
    if (WCSAVE) {
      WCSAVE.controller.events.register("saveend", this, WME_JNF_SaveEnd);
      WME_JNF_PatchAndReload();
    } else {
      console.log("no WCSAVE");
    }
    if (options['fullscreen']) {
      if (options['fullscreen'] == "fullscreen" && document.body.className != "fullscreen") {
        console.log("going fullscreen");
        Waze.map.toggleFullscreen();
      }
    }
  }
  Waze.model.events.unregister("mergeend", this, WME_JNF_RestoreSettings);
}

WME_JNF_OnUnload = function() {
    if (storage) {
      console.log("WME-JNF: saving options");
      options = {};

      //    options['hotkey'] = getId('_cbJNF_Hotkey');
      Object.forEach(Waze.map.controls, function(k, v) {
        if (v.displayClass == "WazeControlEditNodeConnections") {
          options['showallarrows'] = v.showAllArrows;
          options['showarrows'] = v.showArrows;
        }
      });
      options['fullscreen'] = document.body.className;
      storage.setItem('WME_JNF', JSON.stringify(options));
    }
}

WME_JNF_Hook = function() {
  console.log("WME-JNF: Hook");
  // make cameras visible at zoom 0 and load at zoom 1
  Waze.Config.cameras.minDisplayZoom = 0;
  Waze.model.cameras.minZoom = 0;
  
  // update pan amount so keyboard panning is useful
  Waze.map.DefaultPanInPixel = Waze.map.size.h / 4;

  // overload the WME exit function
  $(window).on("beforeunload", WME_JNF_OnUnload);

  // hook 'q'
  Waze.accelerators.events.listeners.disallowAllConnections[0].func = function() {
    WME_JNF_DAT(this);
  }

  // hook 'w'
  Waze.accelerators.events.listeners.allowAllConnections[0].func = function() {
    if (typeof(allowAllConnections) == 'function') {
      allowAllConnections();
    } else {
      this.setAllConnections(true);
    }
    
    // refresh turn arrows
    WCENC.toggleShowAllArrows();
    WCENC.toggleShowAllArrows();
  }
  Waze.model.events.unregister("mergeend", this, WME_JNF_Hook);
}

var init_tries = 0;

WME_JNF_Init = function() {
//  if (init_tries < 30) {
//    if (typeof(Waze) != "object" || typeof(Waze.model) != "object" || typeof(Waze.map) != "object") {
//      setTimeout(WME_JNF_Init, 500);
//    }
//    init_tries++;
//    return;
//  }
  console.log("WME-JNF: Checking API");
  if (WME_JNF_CheckAPI()) {
//    Waze.model.events.register("mergeend", this, WME_JNF_RestoreSettings);
//    Waze.model.events.register("mergeend", this, WME_JNF_Hook);
    WME_JNF_RestoreSettings();
    WME_JNF_Hook();
  } else {
    console.log("WME-JNF: failed API check, exiting. " + matched);
    alert("WME Junction Node Fixer has failed to load due to API check: " + matched);
    WME_JNF_FixNode = undefined;
    return;
  }
}

$(document).ready(WME_JNF_Init);