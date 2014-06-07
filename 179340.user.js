// ==UserScript==
// @name                WME Route Checker
// @namespace           http://userscripts.org/users/419370
// @description         Allows editors to check the route between two segments
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @include             https://editor-beta.waze.com/*
// @updateURL           http://userscripts.org/scripts/source/179340.meta.js
// @version             1.0
// @grant               none
// ==/UserScript==

var wmerc_version = "1.0"

/* bootstrap, will call initialiseHighlights() */
function bootstrapRouteTest()
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
  setTimeout(initialiseRouting, 777);
}

function showRouteOptions() {
  if (Waze.selectionManager.selectedItems.length != 2) {
    WMERC_lineLayer_route.destroyFeatures();
    return;
  }
  
  if (getId('routeTest') != null) 
    return;

  // add new edit tab to left of the map
  var addon = document.createElement('div');
  addon.id = "routeTest";
  if (location.hostname.match(/editor.*.waze.com/)) {
    coords1 = getCoords(Waze.selectionManager.selectedItems[0]);
    coords2 = getCoords(Waze.selectionManager.selectedItems[1]);
    var url = getLivemap()
            + "&from_lon="+coords1.lon + "&from_lat="+coords1.lat
            + "&to_lon="+coords2.lon + "&to_lat="+coords2.lat;
    
    addon.innerHTML = '<p><b><a href="'+url+'" title="Opens in new tab" target="LiveMap">Show routes in LiveMap</a> &raquo;</b></p>';
  } else {
    addon.innerHTML = '<p><b><a href="#" id="goroutes" title="WME Route Checker">Show routes between these two segments</a> &raquo;</b></p>';
  }
  
  // hook into edit panel on the left    
  var userTabs = getId('edit-panel');
  var segmentBox = getElementsByClassName('segment', userTabs)[0];
  var tabContent = getElementsByClassName('tab-content', segmentBox)[0];
  segmentBox.insertBefore(addon, tabContent);
   
  // automatically start getting route when user clicks on tab
  getId('goroutes').onclick = fetchRoute;
 
  return true;
}

function getCoords(segment) {
  var numpoints = segment.geometry.components.length;
  var middle = Math.floor(numpoints / 2);
  
  if (numpoints % 2 == 1 || numpoints < 2) { // odd number, middle point
    seglat = segment.geometry.components[middle].y;
    seglon = segment.geometry.components[middle].x;
  } 
  else { // even number - take average of middle two points
    seglat = (segment.geometry.components[middle].y
           +  segment.geometry.components[middle-1].y) / 2.0;
    seglon = (segment.geometry.components[middle].x
           +  segment.geometry.components[middle-1].x) / 2.0;
  }
  return OpenLayers.Layer.SphericalMercator.inverseMercator(seglon,seglat);
}
  
function fetchRoute(reverse) {
  var coords1, coord2;
  reverse = (reverse != false);
  if (reverse) {
    coords1 = getCoords(Waze.selectionManager.selectedItems[0]);
    coords2 = getCoords(Waze.selectionManager.selectedItems[1]);
  } else {
    coords1 = getCoords(Waze.selectionManager.selectedItems[1]);
    coords2 = getCoords(Waze.selectionManager.selectedItems[0]);
  }
  
  var img = '<img src="https://www.waze.com/images/search_indicator.gif" hspace="4">';
  
  // get the route, fix and parse the json
  if (location.hostname.match(/editor.*.waze.com/)) {
  /*
    var text = document.createElement('i');
    text.innerHTML = 'In-editor routes not available in Beta, sorry<br>';
    getId('routeTest').appendChild(text);
    
    
    var url = getLivemap()
            + "&from_lon="+coords1.lon + "&from_lat="+coords1.lat
            + "&to_lon="+coords2.lon + "&to_lat="+coords2.lat;
    
    var permalink = getElementsByClassName('WazeControlPermalink', getId('wazeMap'))[0]; 
    permalink = permalink.getElementsByTagName('a')[0].href;
    
    var editorLink = document.createElement('a');
    editorLink.innerHTML = 'Switch to old editor &raquo;';
    editorLink.href = permalink.replace('editor-beta', 'www');
    editorLink.style.display = 'block'
    editorLink.target="WME";
    getId('routeTest').appendChild(editorLink);
  */
  } else {
    getId('routeTest').innerHTML = "<p><b>Fetching route from LiveMap " + img + "</b></p>";
    var url = getRoutingManager();
    var data = {
      from: "x:" + coords1.lon + " y:" + coords1.lat + " bd:true",
      to: "x:" + coords2.lon + " y:" + coords2.lat + " bd:true",
      returnJSON: true,
      returnGeometries: true,
      returnInstructions: true,
      timeout: 60000,
      nPaths: 3};
  
    $.ajax({
      dataType: "json",
      url: url,
      data: data,
      dataFilter: function(data, dataType) {
        return data.replace(/NaN/g, '0');
      },
      success: function(json) { 
        showNavigation(json, reverse);
      }
    });
  }
/*  
  // create link to view the navigation instructions
  var livemapLink = document.createElement('a');
  livemapLink.innerHTML = 'View Route in LiveMap &raquo;';
  livemapLink.href = url;
  livemapLink.target="LiveMap";
  getId('routeTest').appendChild(livemapLink);
*/
  return false;
}

function getLivemap() {
  var center_lonlat=new OpenLayers.LonLat(Waze.map.center.lon,Waze.map.center.lat);
  center_lonlat.transform(new OpenLayers.Projection ("EPSG:900913"),new OpenLayers.Projection("EPSG:4326"));
  var coords = '?lon='+center_lonlat.lon+'&lat='+center_lonlat.lat;

  return 'https://www.waze.com/livemap'+coords;
}
  
function getRoutingManager() {
  if (Waze.model.countries.get(235) || Waze.model.countries.get(40)) { // US & Canada
    return '/RoutingManager/routingRequest';
  } else if (Waze.model.countries.get(106)) { // Israel
    return '/il-RoutingManager/routingRequest';
  } else {
    return '/row-RoutingManager/routingRequest';
  }
}
  
function plotRoute(coords, index) {
  var points = [];
  for (var i in coords) {
    if (i > 0) {
      var point = OpenLayers.Layer.SphericalMercator.forwardMercator(coords[i].x, coords[i].y);
      points.push(new OL.Geometry.Point(point.lon,point.lat));
    }
  }
  var newline = new OL.Geometry.LineString(points);
    
  var style = { 
    strokeColor: routeColors[index], 
    strokeOpacity: 0.7,
    strokeWidth: 8 - index * 2,
  };
  var lineFeature = new OL.Feature.Vector(newline, {type: "routeArrow"}, style);
  
  // Display new segment
  WMERC_lineLayer_route.addFeatures([lineFeature]);
}

function showNavigation(nav_json, reverse) {
  // plot the route
  routeColors = ["#8309e1", "#52BAD9", "#888800", ]; 
  WMERC_lineLayer_route.destroyFeatures();
  if (typeof nav_json.alternatives !== "undefined"){
    for (var r = nav_json.alternatives.length-1; r >= 0; r--) {
      plotRoute(nav_json.alternatives[r].coords, r);
    }
  } else {
    plotRoute(nav_json.coords, 0);
  }
  WMERC_lineLayer_route.setVisibility(true);

  // hide segment details
  var userTabs = getId('edit-panel');
  var segmentBox = getElementsByClassName('segment', userTabs)[0];
  var tabContent = getElementsByClassName('tab-content', segmentBox)[0];
  tabContent.style.display = 'none';
  
  // write instructions
  instructions = getId('routeTest');
  instructions.innerHTML = '';
  instructions.style.display = 'block';
  instructions.style.height = document.getElementById('map').style.height;

  if (typeof nav_json.alternatives !== "undefined") {
    for (var r = 0; r < nav_json.alternatives.length; r++) {
      showInstructions(nav_json.alternatives[r], r);
    }
    nav_coords = nav_json.alternatives[0].coords;
  } else {
    showInstructions(nav_json, 0);
    nav_coords = nav_json.coords;
  }
  var lon1 = nav_coords[0].x;
  var lat1 = nav_coords[0].y;

  var end = nav_coords.length - 1;
  var lon2 = nav_coords[end].x;
  var lat2 = nav_coords[end].y;

  var rerouteArgs = '{lon:'+lon1+',lat:'+lat1+'},{lon:'+lon2+',lat:'+lat2+'}';

  // footer for extra links
  var footer = document.createElement('div');
  footer.className = 'routes_footer';
  
  // create link to reverse the route
  var reverseLink = document.createElement('a');
  reverseLink.innerHTML = '&laquo; Reverse Route';
  reverseLink.href = '#';
  reverseLink.setAttribute('onClick', 'fetchRoute('+!reverse+');');
  reverseLink.addEventListener('click', function() { fetchRoute(!reverse); }, false);
  footer.appendChild(reverseLink);

  footer.appendChild(document.createTextNode(' | '));

  var url = getLivemap()
          + "&from_lon="+lon1 + "&from_lat="+lat1
          + "&to_lon="+lon2 + "&to_lat="+lat2;

  // create link to view the navigation instructions
  var livemapLink = document.createElement('a');
  livemapLink.innerHTML = 'View in LiveMap &raquo;';
  livemapLink.href = url;
  livemapLink.target="LiveMap";
  footer.appendChild(livemapLink);

  footer.appendChild(document.createElement('br'));

  // add link to script homepage and version
  var scriptLink = document.createElement('a');
  scriptLink.innerHTML = 'WME Route Checker v' + wmerc_version;
  scriptLink.href = 'https://www.waze.com/forum/viewtopic.php?t=64777';
  scriptLink.style.fontStyle = 'italic';
  scriptLink.target="_blank";
  footer.appendChild(scriptLink);

  instructions.appendChild(footer);

  return false;
}

function showInstructions(nav_json, r) {
  var imgRoot = '/assets-editor';
  
  continueImage = '<img src="'+imgRoot+'/images/vectors/routeInstructions/big_direction_forward.png" style="float: left; top: 0; padding-right: 4px" width="15" height="16" />';
  beginImage = continueImage;

  // for each route returned by Waze...
  var route = nav_json.response;
  var streetNames = route.streetNames;

  if (r > 0) {
      instructions.appendChild(document.createElement('p'));
  }

  // name of the route, with coloured icon
  route_name = document.createElement('p');
  route_name.className = 'route';
  route_name.style.borderColor = routeColors[r];
  route_name.innerHTML = '<b style="color:'+routeColors[r]+'">Via ' + route.routeName + '</b>';
  instructions.appendChild(route_name);

  var optail = '';
  var prevStreet = '';
  var currentItem = null;
  var totalDist = 0;
  var totalTime = 0;
  var prevDist = 0;
  var prevTime = 0;
  var lastSegment = route.results[0].path.segmentId;

  // iterate over all the steps in the list
  for (var i = 0; i < route.results.length; i++) {
    prevDist = totalDist;
    prevTime = totalTime;
    totalDist += route.results[i].length;
    totalTime += route.results[i].crossTime;

    if (!route.results[i].instruction)
      continue;
    var opcode = route.results[i].instruction.opcode;
    if (!opcode)
      continue;

    if (opcode.match(/ROUNDABOUT_EXIT/))
      continue;

    switch (opcode) {
      case "CONTINUE":
      case "NONE":        dirImage = "big_direction_forward"; break;
      case "TURN_LEFT":   dirImage = "big_direction_left"; break;
      case "TURN_RIGHT":  dirImage = "big_direction_right"; break;
      case "KEEP_LEFT":
      case "EXIT_LEFT":   dirImage = "big_direction_exit_left"; break;
      case "KEEP_RIGHT":
      case "EXIT_RIGHT":  dirImage = "big_direction_exit_right"; break;
      case "APPROACHING_DESTINATION":   dirImage = "big_direction_end"; break;
      case "ROUNDABOUT_LEFT":
      case "ROUNDABOUT_EXIT_LEFT":      dirImage = "big_directions_roundabout_l"; break;
      case "ROUNDABOUT_RIGHT":
      case "ROUNDABOUT_EXIT_RIGHT":     dirImage = "big_directions_roundabout_r"; break;
      case "ROUNDABOUT_STRAIGHT":
      case "ROUNDABOUT_EXIT_STRAIGHT":  dirImage = "big_directions_roundabout_s"; break;
      case "ROUNDABOUT_ENTER":
      case "ROUNDABOUT_EXIT":           dirImage = "big_directions_roundabout"; break;
      case "ROUNDABOUT_U":              dirImage = "big_directions_roundabout_u"; break;
      default: dirImage = '';
    }
    if (dirImage != '')
      dirImageSrc = '<img src="'+imgRoot+'/images/vectors/routeInstructions/'+dirImage+'.png" style="float: left; top: 0; padding-right: 4px" width="15" height="16" />';

    var streetName = route.streetNames[route.results[i].street];
    if (!streetName || streetName == null)
      streetName = '';
    else
      streetName = '<span style="color: blue">' + streetName + '</span>';

    if (streetName.match(/^to/i))
      optail = ' ';

    // display new, non-blank street names
    if ((streetName != prevStreet && streetName != '') || i == 0) {
      if (currentItem == null) {
        // new street that doesn't follow turn instruction, i.e. continue
        if (optail == '')
          optail = continueImage + 'continue on ';

        if (i == 0) { // from location
          var lon = nav_json.coords[0].x;
          var lat = nav_json.coords[0].y;
          optail = beginImage + 'depart from ';
        } else { // start of street location
          var lon = route.results[i].path.x;
          var lat = route.results[i].path.y;
        }

        addTurnImage(lat, lon, dirImage);
        
        currentItem = document.createElement('a');
        currentItem.className = 'step';
        currentItem.innerHTML = optail + streetName;
      } else {
        // these will be appended to previous turn instruction
        currentItem.innerHTML += optail + streetName;
      }

      instructions.appendChild(currentItem);
      prevStreet = streetName;
      currentItem = null;
      optail = '';
    }

    if (opcode == 'CONTINUE' || opcode == 'NONE') {
      continue;
    }

    // roundabouts with nth exit instructions
    if (opcode == 'ROUNDABOUT_ENTER') {
      opcode += route.results[i].instruction.arg + 'th exit';
      opcode = opcode.replace(/1th/, '1st');
      opcode = opcode.replace(/2th/, '2nd');
      opcode = opcode.replace(/3th/, '3rd');
      opcode = opcode.replace(/4th/, '4th');
      opcode = opcode.replace(/0th/, '<span style="color: red">0th</span>');
    }

    // convert opcode to pretty text
    opcode = opcode.replace(/APPROACHING_DESTINATION/, 'arrive at destination');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?LEFT/, 'at the roundabout, turn left');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?RIGHT/, 'at the roundabout, turn right');
    opcode = opcode.replace(/ROUNDABOUT_(EXIT_)?STRAIGHT/, 'at the roundabout, continue straight');
    opcode = opcode.replace(/ROUNDABOUT_(ENTER|EXIT)/, 'at the roundabout, take ');
    opcode = opcode.toLowerCase().replace(/_/, ' ');
    opcode = opcode.replace(/roundabout u/, 'at the roundabout, make a U-turn');

    // flush previous instruction to list
    if (currentItem != null) {
      instructions.appendChild(currentItem);
      currentItem = null;
    }

    // get coordinates of instruction
    if (i+1 < route.results.length) { // location of turn
      var lon = route.results[i+1].path.x;
      var lat = route.results[i+1].path.y;
    } else { // destination location
      var end = nav_json.coords.length - 1;
      var lon = nav_json.coords[end].x;
      var lat = nav_json.coords[end].y;
    }
    
    addTurnImage(lat, lon, dirImage);
    
    lastSegment = route.results[i].path.segmentId;

    // create new instruction
    currentItem = document.createElement('a');
    currentItem.className = 'step';
    currentItem.innerHTML = dirImageSrc + opcode;

    // connecting word in case we have a street name later
    if (opcode.match(/continue/))
      optail = ' on ';
    else
      optail = ' onto ';

    // force 'turn left' and 'turn right' to show the street name
    if (opcode.match(/turn left|turn right/))
      prevStreet = '';
  }

  // flush last instruction to list
  if (currentItem != null) {
    instructions.appendChild(currentItem);
    currentItem = null;
  }
};

function addTurnImage(lat, lon, image, title) {
  var coords = OpenLayers.Layer.SphericalMercator.forwardMercator(lon, lat);
  var point = new OL.Geometry.Point(coords.lon,coords.lat);
  var imgRoot = '/assets-editor';
  
  var style = { 
    externalGraphic: imgRoot + "/images/vectors/routeInstructions/"+image+".png", 
    graphicWidth: 30,
    graphicHeight: 32,
    graphicZIndex: 9999,
    title: title
  };
  var imageFeature = new OL.Feature.Vector(point, null, style);
  
  // Display new segment
  WMERC_lineLayer_route.addFeatures([imageFeature]);
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

function initialiseRouting()
{
  console.log("Initialising WME Route Checker");

  /* dirty hack to inject stylesheet in to the DOM */
  var style = document.createElement('style');
  style.innerHTML = "#routeTest {padding: 0 8px; overflow-y: auto;}\n"
                  + "#routeTest p.route {margin: 0; padding: 4px 8px; border-bottom: silver solid 3px; background: #eee}\n"
                  + "#routeTest a.step {display: block; margin: 0; padding: 3px 8px; text-decoration: none; color:black;border-bottom: silver solid 1px;}\n"
                  + "#routeTest a.step:hover {background: #ffd; text-decoration: underline;}\n"
                  + "#routeTest a.step:active {background: #dfd;}\n"
                  + "#routeTest div.routes_footer {text-align: center; margin-bottom: 25px;}\n";
               // + ".WazeControlLayerSwitcher:hover {max-height: 500px}";
  (document.body || document.head || document.documentElement).appendChild(style);
    
  // add a new layer for routes
  WMERC_lineLayer_route = new OL.Layer.Vector("Route Checker Script", 
    { rendererOptions: { zIndexing: true }, 
      shortcutKey: "S+t",
      uniqueName: 'route_checker' }
  ); 
  WMERC_lineLayer_route.setZIndex(9999);
  Waze.map.addLayer(WMERC_lineLayer_route);
  Waze.map.addControl(new OL.Control.DrawFeature(WMERC_lineLayer_route, OL.Handler.Path));
  
  // hack in translation:
  I18n.translations[I18n.locale].layers.name.route_checker = "Route Checker Script"; 
   
  // ...and then hide it
  $("label:contains('Route Checker Script')").parent().remove();
  
  // add listener for whenever selection changes
  Waze.selectionManager.events.register("selectionchanged", null, showRouteOptions);
  setTimeout(showRouteOptions, 777);
}

/* engage! =================================================================== */
bootstrapRouteTest();

/* end ======================================================================= */
