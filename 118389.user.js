// ==UserScript==
// @name         Waze Livemap Navigation
// @namespace    http://userscripts.org/users/419370
// @version      0.74
// @description  Display the navigation list in the Livemap on Waze.com
// @include      *.waze.*/livemap/*
// @author       Timbones
// ==/UserScript==


/* bootstrap to inject showNavigation() function in to site code */
function main() {
    var injectStr = 'function (nav_json) {'
                  + 'window.setTimeout(showNavigation, 500, nav_json);';

    var old_function = reroute;
    var new_function = old_function.toString().replace(/function ?\(nav_json\) ?\{/, injectStr);
    eval('reroute = ' + new_function);

    var content_wrapper = document.getElementById('content_wrapper');
    var edit_link = getElementsByClassName('second_tab', content_wrapper)[0];
    edit_link.setAttribute('onClick', 'return openEditor()');
    edit_link.href = '#';
  };

/* new function to be called when a new route is returned from the server */
function showNavigation(nav_json) {
    // hide scrolling marquee of traffic reports
    var content_wrapper = document.getElementById('content_wrapper');
    var live_reports = getElementsByClassName('live_reports', content_wrapper)[0];
    live_reports.style.display = 'none';

    // add new box to show navigation instructions
    var instructions = document.getElementById('instructions');
    if (!instructions) {
        instructions = document.createElement('div');
        instructions.id = 'instructions';
        live_reports.parentNode.insertBefore(instructions, live_reports);
    }

    instructions.innerHTML = '';
    instructions.style.display = 'block';
    instructions.style.height = document.getElementById('map').style.height;

    // determine what units are used: miles or meters
    var route_details = document.getElementById('route_details');
    var distance_unit = getElementsByClassName('distance_unit', route_details)[0].innerHTML;

    if (distance_unit.match(/miles/)){
      var convert_miles = 0.62137;
      var symbol_dist   = ' miles';
    } else {
      var convert_miles = 1;
      var symbol_dist   = ' km';
    }

    beginImage = '<img src="/images/from.png" style="float: left; top: 0; padding-right: 4px" width="15" height="15" />';
    continueImage = '<img src="/editor/images/vectors/routeInstructions/big_direction_forward.png" style="float: left; top: 0; padding-right: 4px" width="15" height="16" />';

    var popupIndex = 0;
    popupArray = new Array();

    // for each route returned by Waze...
    for (var r = 0; r < nav_json.alternatives.length; r++) {
        var route = nav_json.alternatives[r].response;
        var streetNames = route.streetNames;

        if (r > 0) {
            instructions.appendChild(document.createElement('p'));
        }

        // name of the route, with coloured icon
        route_name = document.createElement('p');
        route_name.className = 'route';
        route_name.innerHTML = '<img src="http://world.waze.com/images/Route'+(r+1)+'.png"> '
                             + '<b>Via ' + route.routeName + '</b>';
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
              dirImage = '<img src="/editor/images/vectors/routeInstructions/'+dirImage+'.png" style="float: left; top: 0; padding-right: 4px" width="15" height="16" />';

            var debug = '';
            if (route.results[i].instruction.tts)
              debug += '<br>TTS: ' + route.results[i].instruction.tts;
            if (route.results[i].penalty)
              debug += '<br>Penalty: ' + route.results[i].penalty;
            if (route.results[i].isToll)
              debug += '<br>isToll: ' + route.results[i].isToll;
            if (route.results[i].additionalInstruction != null)
              debug += '<br>additionalInstruction: ' + route.results[i].additionalInstruction;
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
                        var lon = nav_json.alternatives[r].coords[0].x;
                        var lat = nav_json.alternatives[r].coords[0].y;
                        optail = beginImage + 'depart from ';
                    } else { // start of street location
                        var lon = route.results[i].path.x;
                        var lat = route.results[i].path.y;
                    }

                    var distance = (prevDist * convert_miles / 1000).toFixed(1) + symbol_dist;
                    var duration = (prevTime / 60).toFixed(1) + " mins";

                    currentItem = document.createElement('a');
                    currentItem.href = '#';
                    currentItem.id = '_jumpTo' + ++popupIndex;
                    currentItem.className = 'step';
                    currentItem.innerHTML = optail + streetName;
                } else {
                    // these will be appended to previous turn instruction
                    currentItem.innerHTML += optail + streetName;
                }
                popupArray[popupIndex] = '[' + distance + ' - ' + duration + ']<br>' + currentItem.innerHTML + debug;
                currentItem.setAttribute('onClick', 'jumpTo('+lon+','+lat+',' + popupIndex + ',' + lastSegment + ')');

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
                var end = nav_json.alternatives[r].coords.length - 1;
                var lon = nav_json.alternatives[r].coords[end].x;
                var lat = nav_json.alternatives[r].coords[end].y;
            }

            var distance = (totalDist * convert_miles / 1000).toFixed(1) + symbol_dist;
            var duration = (totalTime / 60).toFixed(1) + " mins";
            prevDist = totalDist;
            prevTime = totalTime;

            lastSegment = route.results[i].path.segmentId;

            // create new instruction
            currentItem = document.createElement('a');
            currentItem.href = '#';
            currentItem.id = '_jumpTo' + ++popupIndex;
            currentItem.className = 'step';
            currentItem.innerHTML = dirImage + opcode;

            popupArray[popupIndex] = '[' + distance + ' - ' + duration + ']<br>' + currentItem.innerHTML + debug;
            currentItem.setAttribute('onClick', 'jumpTo('+lon+','+lat+',' + popupIndex + ',' + lastSegment + ')');

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

        popupIndex++;
    }

    sessionStorage.navigationAddon = JSON.stringify(popupArray);

    // get start and end of the route
    var lon1 = nav_json.alternatives[0].coords[0].x;
    var lat1 = nav_json.alternatives[0].coords[0].y;

    var end = nav_json.alternatives[0].coords.length - 1;
    var lon2 = nav_json.alternatives[0].coords[end].x;
    var lat2 = nav_json.alternatives[0].coords[end].y;

    var rerouteArgs = '{lon:'+lon1+',lat:'+lat1+'},{lon:'+lon2+',lat:'+lat2+'}';

    // create link to
    reverseLink = document.createElement('a');
    reverseLink.innerHTML = 'reverse route';
    reverseLink.href = '#';
    reverseLink.style.padding = '8px';
    reverseLink.setAttribute('onClick', 'reverseRoute('+rerouteArgs+');');
    instructions.appendChild(reverseLink);

    // create link to close the navigation instructions
    closeLink = document.createElement('a');
    closeLink.innerHTML = 'close list';
    closeLink.href = '#';
    closeLink.style.padding = '0 4px';
    closeLink.style.float = 'right';
    closeLink.setAttribute('onClick', 'closeNavigation();');
    instructions.appendChild(closeLink);

    // add link to script homepage and version
    scriptVer = document.createElement('div');
    scriptVer.innerHTML = '<i><a href="http://userscripts.org/scripts/show/118389" target="_blank">'
                        +  'Waze Livemap Navigation Script</a> v0.74</i>';
    scriptVer.className = 'scriptVer';
    instructions.appendChild(scriptVer);

    return false;
};

// to close the navigation instructions
function closeNavigation() {
    // hide  navigation instructions
    var instructions = document.getElementById('instructions');
    instructions.style.display = 'none';

    // show scrolling marquee of traffic reports
    var content_wrapper = document.getElementById('content_wrapper');
    var live_reports = getElementsByClassName('live_reports', content_wrapper)[0];
    live_reports.style.display = 'block';
}

// to calculate the reverse route
function reverseRoute(from, to) {
  g_route_from.location = to;
  g_route_to.location = from;

  reroute();
}


/* to show the location of the instruction on the map */
function jumpTo(lon, lat, popupIndex, segment) {
    var maxzoom = g_map.getNumZoomLevels() - 1;
    if (g_map.zoom != maxzoom) {
        var center = g_map.getCenter();
        g_map.setCenter(center, maxzoom);
    }

    popupArray = JSON.parse(sessionStorage.navigationAddon);
    text = popupArray[popupIndex];
    text = text.replace(/width="15" height="16"/, 'width="30" height="32"');

    var wwwServer = location.pathname.replace(/\/livemap.*$/, '');
    wwwServer = wwwServer.replace(/http:/, 'https:');

    // add link to edit this segment in the editor
    var editSeg = ' - <a href="' + wwwServer + '/editor/?zoom=5'
                + '&lon='+lon + '&lat='+lat + '&segments='+segment
                + '" target="Papyrus">show in editor</a>';

    // add link to next instruction
    var nextLink = '';
    instruction = document.getElementById('_jumpTo' + (popupIndex-1));
    if (instruction)
      nextLink += ' <a href="#" onclick="return jumpNext(' + (popupIndex-1) + ');">&laquo; back</a>';

    instruction = document.getElementById('_jumpTo' + (popupIndex+1));
    if (instruction)
      nextLink   += ' <a href="#" onclick="return jumpNext(' + (popupIndex+1) + ');">next &raquo;</a>';

    var lonlat = new OpenLayers.LonLat(lon = lon, lat = lat);
    markLocation(lonlat, null, '<div>' + text + '<br><br clear="left">' + nextLink + editSeg + '<div>');

    return false;
}

/* to show the next instruction on the map */
function jumpNext(popupIndex) {
  instruction = document.getElementById('_jumpTo' + popupIndex);
  if (!instruction) return false;

  return instruction.click();
}


function openEditor() {
    var center_lonlat=OpenLayers.Layer.SphericalMercator.inverseMercator(g_map.getCenter().lon,g_map.getCenter().lat);
    var mapZoom=(window.location.hostname=='world.waze.com' ? (g_map.zoom>6 ? (g_map.zoom>7 ? g_map.zoom-5 : g_map.zoom-6) : 0) : (g_map.zoom>10 ? g_map.zoom-11 : 0));
    window.open('https://'+window.location.hostname+'/editor/?zoom='+mapZoom+'&lon='+center_lonlat.lon+'&lat='+center_lonlat.lat,'Waze Map Editor');
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


/* dirty hack to inject scripts in to the DOM */
var script = document.createElement('script');
script.setAttribute('type','text/javascript');
script.appendChild(document.createTextNode('('+ main +')();'));
script.innerHTML += "\n" + showNavigation.toString() + "\n";
script.innerHTML += "\n" + closeNavigation.toString() + "\n";
script.innerHTML += "\n" + reverseRoute.toString() + "\n";
script.innerHTML += "\n" + jumpTo.toString() + "\n";
script.innerHTML += "\n" + jumpNext.toString() + "\n";
script.innerHTML += "\n" + openEditor.toString() + "\n";
script.innerHTML += getElementsByClassName.toString() + "\n";
(document.body || document.head || document.documentElement).appendChild(script);


/* dirty hack to inject stylesheet in to the DOM */
var style = document.createElement('style');
style.innerHTML = "#instructions {float: left; margin-right: 20px; padding: 0; height: 460px; width: 240px; background: white; border: 1px solid #C2C2C2; overflow-y: auto;}\n"
                                + "#instructions p.route {margin: 0; padding: 4px 8px; border-bottom: silver solid 1px; background: #eee}\n"
                                + "#instructions a.step {display: block; margin: 0; padding: 3px 8px; text-decoration: none; color:black;border-bottom: silver solid 1px;}\n"
                                + "#instructions a.step:hover {background: #ffd; text-decoration: underline;}\n"
                                + "#instructions a.step:active {background: #dfd;}\n"
                                + "#instructions div.scriptVer {clear: right; text-align: center; margin: 8px;}\n";
(document.body || document.head || document.documentElement).appendChild(style);
