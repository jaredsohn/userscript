// ==UserScript==
// @name           Pardus Route Creator
// @namespace      pardus.at
// @description    Creates Navigation Routes for Pardus
// @include        http://*.pardus.at/*
// @author         Rhindon
// @version        1.0
// ==/UserScript==

// ////////////////////////////////////////////////////////////////////////
// User Defined Variables:
// ////////////////////////////////////////////////////////////////////////


//Route Creator Keyboard Action Keys
  var GO_KEY = 'g';
  var ADDDEST_KEY = 'a';

var borderStyle = 'solid 1px gray';

var showRouteHighlighted = true;

var enableImportExport = true;

var enableKeyboardActions = true;

// If you use the Pardus Clock Greasemonkey Script, and your clock is located
// under the Nav Bar, set this to true.  Otherwise, set it to false.

var pardusClockUnderNav = false;

// These variables are used for the Navigation Grid
  
  var enableNavGrid = true;

  //Set to false if you don't want the center square highlighted
  var highlightCenterSquare = true;


  //You can change the color of the gridlines and the center highlight here.
  var color       = "#282828";  //Dark Gray
  var highlightColor   = "darkred";  //Dark Red




// ////////////////////////////////////////////////////////////////////////
// Beginning of Code
// ////////////////////////////////////////////////////////////////////////


var img = document.getElementsByTagName('img');


var count=0;
for(i = 0; i < img.length; i++) {

	if(img[i].getAttribute('class') == 'nf') {
		count++;
	}
}

var gridSize = Math.sqrt(count);

var mapWidth = gridSize;
var mapHeight = gridSize;

var mapWidthPx = 64 * gridSize;
var mapHeightPx = 64 * gridSize;

var heightOffset = mapHeightPx + 50;
if(pardusClockUnderNav) heightOffset += 65;

window.addEventListener("load",routeCreatorInit,false);

var currentRoute = -1;
var locx = 0;
var locy = 0;
var sector = '';
var routeCount = 0;
var selectedRoute = "";
var coordValues = "";
var currentNav = "";

var highlightSquare = (gridSize * gridSize / 2) + .5;





// ////////////////////////////////////////////////////////////////////////
// Imported -- Rhindon's Standard Cookie Code 
//          -- Stores GreaseMonkey Values instead of actual Cookies
// ////////////////////////////////////////////////////////////////////////

function createCookie(name,value) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	GM_setValue(subdomain + '-' + name,value);

}

function readCookie(name) {

	subdomain = window.location.host.substr(0, window.location.host.indexOf('.'));

	try {
		var temp = GM_getValue(subdomain + '-' + name);
		if(temp != '~~~DELETED~~~') return temp;
		return null;
       	} catch(err) {
       		return null;
	}
}

function eraseCookie(name) {
	createCookie(name,"~~~DELETED~~~");
}

// ////////////////////////////////////////////////////////////////////////
// End imported code
// ////////////////////////////////////////////////////////////////////////

function doKeyboardAction(e) {

  var keynum = e.which;
  
  char = String.fromCharCode(keynum).toLowerCase();

  if (char == GO_KEY.toLowerCase()) {
    goRoute();
  } else if (char == ADDDEST_KEY.toLowerCase()) {
    addDest();
  }

}

function mynav(to) { 
  document.getElementsByName('destination')[0].value = to;
  document.getElementById('navForm').submit();
}


function getLocation() {

  sector = document.getElementById('sector').innerHTML;
  
  var tmp = document.getElementById('coords').innerHTML;
  tmp = tmp.substring(tmp.indexOf('[') + 1, tmp.indexOf(']'));
  locx = tmp.substring(0, tmp.indexOf(','));
  locy = tmp.substring(tmp.indexOf(',') + 1);
}

function addRoute() {
  routeName = document.getElementById('route').value;
    
  if(routeName == '') {
    alert('Enter a name for the Route.');
    return;
  }
  
  routeCount++;
  
  createCookie("routeCount", routeCount);
  createCookie("route" + routeCount, routeName);
  
  var option = document.createElement('option');
  option.value = 'route' + routeCount;
  option.text = routeName;
    
  var sel = document.getElementById("routes");
  try {
    sel.add(option,null); // standards compliant
  } catch(ex) {
    sel.add(option); // IE only
  }
  
  document.getElementById('route').value = "";  
  
}

function deleteRoute() {

  routeName = readCookie(selectedRoute);
  if(routeName) {
    routeName = routeName.substring(0, routeName.indexOf('~'));
  }

  if(confirm("Are you sure you want to delete this Route: \n" + routeName)) {  
    eraseCookie(selectedRoute);
    
    document.getElementById('routes').remove(document.getElementById('routes').selectedIndex);

    highlightRoute();
  }
}

function exportRoute() {

  expText = readCookie(selectedRoute);
  
  if(expText.indexOf('~NR=')) {
    expText = expText.substr(0, expText.indexOf('~NR='));
  }

  document.getElementById('eximText').value = expText;
}

function importRoute() {
  routeCount++;

  routeText = document.getElementById('eximText').value;
  routeName = routeText.substr(0, routeText.indexOf('~'));
  
  createCookie("routeCount", routeCount);
  createCookie("route" + routeCount, routeText);
  
  var option = document.createElement('option');
  option.value = 'route' + routeCount;
  option.text = routeName;
    
  var sel = document.getElementById("routes");
  try {
    sel.add(option,null); // standards compliant
  } catch(ex) {
    sel.add(option); // IE only
  }

}

function deleteFromCurrent() {

  route = readCookie(selectedRoute);
  oldRoute = route;
  
  route = route.substring(route.indexOf('~' + sector + '/' + locx + '/' + locy + '/'));
  route = route.substring(1);
  route = route.substring(route.indexOf('~'));
  
  newRoute = oldRoute.substring(0, oldRoute.indexOf(route));
  
  createCookie(selectedRoute, newRoute);

  highlightRoute();
}

function addDest() {

  var prefix = null;
  var suffix = null;
  
  newValue = '';

  currentValue = readCookie(selectedRoute);
  
  localX = document.getElementById('destx').value;
  localY = document.getElementById('desty').value;  
  
  srchStr = '~' + localX + ';' + localY + ';';

  if(coordValues.indexOf(srchStr) < 0) {
    alert("Invalid Coordinates.");
    return;
  }
  
  nav = coordValues.substr(coordValues.indexOf(srchStr) + srchStr.length);
  nav = nav.substr(0, nav.indexOf('~'));
  
  newCoords = '~' + sector + '/' + localX + '/' + localY + '/' + nav;

  newValue = currentValue + newCoords;

  createCookie(selectedRoute, newValue);

  highlightRoute();

}

function selectRoute() {

  selectedRoute = document.getElementById("routes")[document.getElementById("routes").selectedIndex].value;
  createCookie('currentRoute', selectedRoute);
  
  highlightRoute();
}

function goRoute() {

  var go = readCookie(selectedRoute) + "~";
  var foundCurLoc = false;


//alert('0\n' + go + '\n' + foundCurLoc);
  go = go.substring(go.indexOf('~' + sector + '/'));
//alert('1\n' + go + '\n' + foundCurLoc);
  if(go.indexOf('~' + sector + '/' + locx + '/' + locy) >= 0) {
    go = go.substring(go.indexOf('~' + sector + '/' + locx + '/' + locy));
    foundCurLoc = true;
  }
//alert('2\n' + go + '\n' + foundCurLoc);
  go = go.substring(1);
//alert('3\n' + go + '\n' + foundCurLoc);
  if(foundCurLoc) go = go.substring(go.indexOf('~') + 1);
//alert('4\n' + go + '\n' + foundCurLoc);
  go = go.substring(0, go.indexOf('~'));
//alert('5\n' + go + '\n' + foundCurLoc);
//alert('5a\n' + sector + '\n' + 'go.indexOf(sector): ' + go.indexOf(sector));
  if(go.indexOf(sector) < 0) {
    //alert("Next destination not in this sector.");
    return;
  }
  go = go.substring(go.lastIndexOf('/') + 1);
//alert('6\n' + go + '\n' + foundCurLoc);

  //alert('Going To:' + go);

  if(go.indexOf('NR') >= 0) {
    
    go = go.substring(go.indexOf('='));
    
    var r = document.getElementById('routes');
    for(i = 0; i < r.options.length; i++) {
      if(r.options[i].value == go) {
        r.selectedIndex = i;
        return;        
      }
    }
    
  }
  
  //alert('Go:' + go);
  
  if(go == '' || go.indexOf('~NR=') == 0) {
    return;
  }

//alert('Going to: ' + go);
  
  mynav(go);

}

function setNextRoute() {

  var text = "Enter the route number of the Next Route:\n";
  
  opts = document.getElementById('routes').options;
  for(i = 1; i <= opts.length; i++) {
    if(opts[i] && opts[i].value != selectedRoute) {
      text += '\n' + opts[i].value.substring(5) + '\t=\t' + opts[i].text;
    }
  }
  
  var selected = prompt(text);
  
  newRoute = readCookie(selectedRoute);
  
  if(newRoute.indexOf('~NR=') >= 0) {
    newRoute = newRoute.substr(0, newRoute.indexOf('~NR='));
  }
  
  newRoute += '~NR=route' + selected;

  createCookie(selectedRoute, newRoute);

}



function fillDest(event) {
  if(event.button==2) {

    c = event.target.title;
    
    document.getElementById('destx').value = c.substring(1, c.indexOf(',')).replace(/ /g, '');
    document.getElementById('desty').value = c.substring(c.indexOf(',') + 1, c.indexOf(']')).replace(/ /g, '');

  }
}


function highlightRoute() {

  if(!showRouteHighlighted) return;
  
  showNavGrid();
  
  images = document.getElementsByTagName('img');
  var localX = locx - ((mapWidth - 1) / 2);
  var localY = locy - ((mapHeight - 1) / 2);
  var xLimit = Math.round(locx) + (mapWidth - 1) / 2;
  var count = 0;
  var started = false;
  var baseIndex = -1;
  var maxIndex = -1;
  
//  alert(sector + ' / ' + localX + '/' + localY + '/' + nav);
  
  for(i = 0; i < images.length; i++) {


    if(images[i].className == 'nf') {

      if(baseIndex == -1) {
        baseIndex = i;
        maxIndex = mapWidth * mapHeight;
      }

      if(images[i].parentNode.parentNode.innerHTML.indexOf('nav(') >= 0
       && images[i].parentNode.parentNode.childNodes.length == 1) {
      
        nav = images[i].parentNode.parentNode.innerHTML;
        
        nav = nav.substring(nav.indexOf('nav(') + 4);
        nav = nav.substring(0, nav.indexOf(')'));
        coordValues += '~' + localX + ';' + localY + ';' + nav;
        
        //Highlight tiles in the selected Route
        curRoute = readCookie(selectedRoute);
        if(curRoute) {

          if(curRoute.indexOf('~' + sector + '/' + localX + '/' + localY + '/' + nav) >
             curRoute.indexOf('~' + sector + '/' + locx + '/' + locy + '/')) {
            
            images[i].style.borderTop=borderStyle;
            images[i].style.borderRight=borderStyle;
            
            if(i + Math.round(mapWidth) <= maxIndex) {
              images[i + mapWidth].style.borderTop=borderStyle;
            } else {
              images[i].style.borderBottom = borderStyle;
            }
            
            if(i - 1 >= baseIndex) {
              images[i - 1].style.borderRight=borderStyle;
            } else {
              images[i].style.borderLeft = borderStyle;
            }
            
          }
        }
        
      }

      localX++;
      
      if(localX > xLimit) {
        localX = locx - ((mapWidth - 1) / 2);
		localY++;
      }
    }  
  }


}

function addCoordsToMap() {

  images = document.getElementsByTagName('img');
  var localX = locx - ((mapWidth - 1) / 2);
  var localY = locy - ((mapHeight - 1) / 2);
  var xLimit = Math.round(locx) + (mapWidth - 1) / 2;
  var count = 0;
  var started = false;
  
  for(i = 0; i < images.length; i++) {

    if(images[i].className == 'nf') {

      images[i].title = '[' + localX + ', ' + localY + ']';
      images[i].addEventListener('mousedown',fillDest,true);

      if(images[i].parentNode.parentNode.innerHTML.indexOf('nav(') >= 0
       && images[i].parentNode.parentNode.childNodes.length == 1) {
      
        nav = images[i].parentNode.parentNode.innerHTML;
        
        nav = nav.substring(nav.indexOf('nav(') + 4);
        nav = nav.substring(0, nav.indexOf(')'));
        coordValues += '~' + localX + ';' + localY + ';' + nav;
      }

      localX++;
      
      if(localX > xLimit) {
        localX = locx - ((mapWidth - 1) / 2);
		localY++;
      }
    }  
  }
}

function getRouteCount() {
  routeCount = readCookie("routeCount");
  if(routeCount == null) {
    routeCount = 0;
  }
  
}

function showHelp() {

  h = "";
  
  h += 'To create a new Route:';
  h += '\n\t1. Enter the name of the Route in the "Route" box.';
  h += '\n\t2. Click the "Add Route" button.';
  h += '\n\n\tResult: A new, empty route has been added to the drop-down box with that name.';
  h += '\n\nTo add a destination to a route:';
  h += '\n\t1. Enter the coordinates in the "Dest X" and "Dest Y" boxes.';
  h += '\n\t\t NOTE: Right-clicking on a tile will automatically enter that tile\'s coordinates ';
  h += '\n\t\t\t\tinto the boxes.';
  h += '\n\t2. Click the "Add Destination" button.';
  h += '\n\n\tResult: The new destination will be added to the ';
  h += '\n\t\tEND of the route, regardless of where your ship currently is.';
  h += '\n\t\t NOTE: You cannot jump to a tile outside your current view.';
  h += '\n\nTo follow a Route:';
  h += '\n\t1. Select the route from the drop-down box (if it\'s not already selected).';
  h += '\n\t2. Click the "Go" button.';
  h += '\n\n\tResult: You will be taken to the next location in your route.';
  
  alert(h);
}



function showNavGrid() {

  var img = document.getElementsByTagName('img');


  var count=0;
  for(i = 0; i < img.length; i++) {

    if(img[i].getAttribute('class') == 'nf') {

      if(enableNavGrid) {

        count++;
        
        img[i].style.borderBottom = 'none';
        
        if(highlightCenterSquare && count == highlightSquare) {

        img[i].setAttribute('style', img[i].getAttribute('style') 
        + "; border-top:     solid    1px " + highlightColor 
        + "; border-right: solid    1px " + highlightColor + ";");

        } else if(highlightCenterSquare && count == highlightSquare - 1) {

        img[i].setAttribute('style', img[i].getAttribute('style') 
        + "; border-top:     dashed 1px " + color 
        + "; border-right: solid    1px " + highlightColor + ";");

        } else if(highlightCenterSquare && count == highlightSquare + gridSize) {

        img[i].setAttribute('style', img[i].getAttribute('style') 
        + "; border-top:     solid    1px " + highlightColor 
        + "; border-right: dashed 1px " + color + ";");

        } else {

        img[i].setAttribute('style', img[i].getAttribute('style') 
        + "; border-top:     dashed 1px " + color 
        + "; border-right: dashed 1px " + color + ";");

        }    


      } else {
        img[i].style.border="none";
      }
      
    }

  }
}

function selectNextRoute() {

  var selectedRouteText = readCookie(selectedRoute);
  if(!selectedRouteText) return;
  
  if(selectedRouteText.indexOf('~NR=') < 0) {
//    alert('Returning (0)');
    return;
  }
  
  test = selectedRouteText;
//alert('1:' + test)
  test = test.substring(0, test.lastIndexOf('~'));
//  alert('2:' + test)
  test = test.substring(test.lastIndexOf('~') + 1);
  
//  alert('3:' + test)
  
  if (test.indexOf(sector + '/' + locx + '/' + locy) < 0) {
//    alert('Returning (1)');
    return;
  }
  
//  alert('Finding next route...');
  
  var enter = false;
  
  if(selectedRouteText.indexOf('~' + sector + '/' + locx + '/' + locy) >= 0) {
    test = selectedRouteText;
    test = test.substring(test.indexOf('~' + sector + '/' + locx + '/' + locy));
    test = test.substring(1);
    if(test.indexOf('~') >= 0) {
      test = test.substring(test.indexOf('~'));
      if(test.indexOf('~NR=') == 0) {
        enter = true;
      }
    }
  }
  
  if(selectedRouteText.indexOf('~' + sector + '/' + locx + '/' + locy) < 0
    || enter) {
    if(selectedRouteText.indexOf('~NR=') >= 0) {
      nextRoute = selectedRouteText.substring(selectedRouteText.indexOf('~NR=') + 4)
      if(nextRoute.indexOf('~') > 0) {
        nextRoute = nextRoute.substring(0, nextRoute.indexOf('~'));
        
      }
      
//      alert('Setting next route to: ' + nextRoute);
    selectedRoute = nextRoute;
    createCookie('currentRoute', selectedRoute);
    }
  
  }
  
  
//  alert('SelectedRoute: ' + selectedRoute);
  
}


function routeCreatorInit() {

  getLocation();

  getRouteCount();

  selectedRoute = readCookie('currentRoute');

  selectNextRoute();

  addCoordsToMap();

  highlightRoute();
  
//  alert(coordValues.replace(/~/g, '\n'));

  rt_html =           '<table width="448" style="border: none; zindex: -1" align="center">';
  rt_html = rt_html + '<tr><td>';
  
//Loop through Routes and add buttons
  rt_html = rt_html + '<select id="routes" name="routes">';
  
  rt_html = rt_html + '<option value="">Select...</option>';
  
  for(i = 1; i <= routeCount; i++) {

    routeName = readCookie("route" + i);
    if(routeName != null) {
      routeName = routeName.split('~')[0];
      if("route" + i == selectedRoute) {
        rt_html = rt_html + '<option value="route' + i + '" SELECTED>' + routeName + '</option>';
      } else {
        rt_html = rt_html + '<option value="route' + i + '">' + routeName + '</option>';
      }
    }
  }
  
  rt_html = rt_html + '</select>&nbsp;';
  rt_html = rt_html + '<button name="goBtn" id="goBtn">Go!</button>';

  rt_html = rt_html + '&nbsp;<button name="setNextRouteBtn" id="setNextRouteBtn">Set Next Route</button>';
  
  rt_html = rt_html + '</td>';
  
  rt_html = rt_html + '<td align="right">';
  rt_html = rt_html + 'Route: &nbsp;<input type="text" name="route" id="route" size="10" />&nbsp;';
  rt_html = rt_html + '<button id="addRouteBtn">Add Route</button><br />';

  rt_html = rt_html + '</td></tr>';

  rt_html = rt_html + '<tr><td>';

  rt_html = rt_html + '<button name="deleteBtn" id="deleteBtn">Delete Route</button>';
  rt_html = rt_html + '<br /><button name="delFromCurBtn" id="delFromCurBtn">Delete From Current Location</button>';
  
  rt_html = rt_html + '</td>';

  rt_html = rt_html + '<td align="right">';
  rt_html = rt_html + 'Dest X: &nbsp;<input type="text" name="destx" id="destx" size="2" />&nbsp;';
  rt_html = rt_html + 'Dest Y: &nbsp;<input type="text" name="desty" id="desty" size="2" />&nbsp;';
  rt_html = rt_html + '<button id="addDestBtn">Add Destination</button>';
  rt_html = rt_html + '</td>';
  rt_html = rt_html + '</tr>';
  
  
  rt_html += '<tr><td>'
  
  rt_html += '&nbsp;</td>';
  rt_html += '<td nowrap align="right"><a href="#" id="showHelp">Show Help</a></td></tr>';
  
  if(enableImportExport) {
    rt_html += '<tr><td colspan="2" align="right">';
    rt_html += '  <input  id="eximText" type="text" size="70"/><br />';
    rt_html += '  <button id="exportBtn">Export</button>';
    rt_html += '  <button id="importBtn">Import</button>';
    rt_html += '</td></tr>';
    
  }  

  rt_html = rt_html + '</table>';
  

  if(document.URL.indexOf('main.php') >= 0) {


    var child = document.createElement("div")
    child.setAttribute("class", "routeCreator");
    child.setAttribute("style", "position: absolute; top: " + heightOffset + "px; left: 20%; width: 60%;");

    child.innerHTML = rt_html

    document.body.insertBefore(child, document.body.lastChild);
    document.body.id = 'bodyid';

    if(enableKeyboardActions) window.addEventListener("keypress",doKeyboardAction,true);
    
    document.getElementById("routes").addEventListener('change',selectRoute, true);
    document.getElementById("goBtn").addEventListener('click',goRoute, true);
    document.getElementById("deleteBtn").addEventListener('click',deleteRoute, true);
    document.getElementById("delFromCurBtn").addEventListener('click',deleteFromCurrent, true);
    
    document.getElementById("addRouteBtn").addEventListener('click',addRoute,true);
    document.getElementById("addDestBtn").addEventListener('click',addDest,true);

    document.getElementById("setNextRouteBtn").addEventListener('click',setNextRoute,true);

    document.getElementById("showHelp").addEventListener('click',showHelp,true);

    document.getElementById("exportBtn").addEventListener('click',exportRoute,true);
    document.getElementById("importBtn").addEventListener('click',importRoute,true);
    
  }
}

