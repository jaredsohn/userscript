// Solves the puzzle that is offered on the mentioned page.
// version 0.1 BETA!
// 2007-04-22
// Copyright (c) 2007, Andreas Hoffmann
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "puzzle-shikaku", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          puzzle-shikaku
// @namespace     http://www.andihoffmann.de
// @description   Script for solving the puzzle "Shikaku"
// @include       http://www.puzzle-shikaku.com/*
// ==/UserScript==


/**
 * Finds all elements of the type "a" with the href containing "href"
 */
function findAByHref(href) {
	var i;
	var found =0;
	var myAs = new Array();
	var allAs = document.getElementsByTagName("a");
	for (i=0;i<allAs.length;i++){
		var currentA = allAs[i];
		if (currentA.href.indexOf(href) > -1) {
			myAs[found] = currentA;
			found++;
		}
	}
	return myAs;
}


/**
 * Inserts a node after a known one.
 */
function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

/**
 * Creates a new element
 */
function createElement(type, attributes) {
  var element = document.createElement(type);
  if(attributes != null) {
     for(var i = 0, l = attributes.length; i < l; i++) {
        element.setAttribute(attributes[i][0], attributes[i][1]);
     }
  }
  return element;
}

/**
 * Creates a complex element
 */
function createEl(elObj, parent) {
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { createEl(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

/**
 * GetElementById
 */
function $(id) {
  return document.getElementById(id);
}

/**
 * GetElementById
 */
function solvePuzzle() {
  if (document.getElementsByName("ready").length > 0) {
    var field = readField();
    //Now the field is known. Translate the field into Island-ids.
    var islandSizes = translateToIslands(field);
    //Start the solving.
    //First strategy: Find Islands where only one solution is feasible.
    var finishedIslands = new Array(islandSizes.length);
    var changedSomething = true;
    var securityCount = 0;
    while (changedSomething && securityCount < 100){
      while (changedSomething && securityCount < 100) {
        changedSomething = findTrivialIslands(field, islandSizes, finishedIslands);
        securityCount++;
      }
      //Now the simple strategies failed.
      //Third strategy: Find fields that can only be reached by certain islands.
      changedSomething = findSingleReachables(field, islandSizes, finishedIslands);
    }
    if (securityCount < 100) {
      submitField(field, finishedIslands);
    } else {
      alert("Das war der Notausgang");
    }
  }
}

function findSingleReachables(field, islandSizes, finishedIslands) {
  var fieldSize = field.length;
  var changedSomething = false;
  //Create the field, where the reachable fields will be marked:
  //undefined for unknown fields
  //true for fields that can be reached by multiple islands
  //islandId for fields that can only be reached by a single island.
  var markedField = new Array(fieldSize);
  for (var i=0;i<markedField.length;i++){
    markedField[i] = new Array(fieldSize);
  }
  //Loop over all islands.
  for (var islandId = 0;islandId<islandSizes.length;islandId++) {
    if (!finishedIslands[islandId]) {
      var myFeasibleIslands = feasibleIslands(field, islandSizes, islandId);
      for each (var island in myFeasibleIslands) {
        for (var y = island.top;y<=island.bottom;y++){
          for(var x = island.left;x<=island.right;x++){
            if (typeof(field[y][x]) == 'undefined'){
              //Only if there are no information about the field available
              if (typeof(markedField[y][x]) == 'undefined'){
                //Field is only reachable by this island
                markedField[y][x] = islandId;
              } else if (typeof(markedField[y][x]) == 'number'){
                //Field is reachable by two islands.
                markedField[y][x] = true;
              } //else: it's a true -> nothing needs to be changed.
            }
          }
        }
      }
    }
  }
  //Now mark all fields that can only be reached by a single island on the field.
  for (var y=0;y<fieldSize;y++){
    for (var x=0;x<fieldSize;x++){
      if (typeof(markedField[y][x]) == 'number') {
        if (field[y][x] != markedField[y][x]) {
          field[y][x] = markedField[y][x];
          changedSomething = true;
        }
      }
    }
  }
  return changedSomething;
}

function submitField(field, finishedIslands) {  
  var horizontal = "";
  var vertical = "";
  for (var y=0;y<field.length-1;y++) {
    for (var x=0;x<field[y].length;x++) {
      if (drawLine(field[y][x], field[y+1][x], finishedIslands)){
        horizontal += "y";
      } else {
        horizontal += "n";
      }
    }
  }
  
  for (var y=0;y<field.length;y++) {
    for (var x=0;x<field[y].length-1;x++) {
      if (drawLine(field[y][x], field[y][x+1], finishedIslands)) {
        vertical += "y";
      } else {
        vertical += "n";
      }
    }
  }
  
  document.getElementsByName("ansH")[0].value = horizontal;
  document.getElementsByName("ansV")[0].value = vertical;
  document.getElementsByName("ready")[0].click();
}

function drawLine(v1, v2, finishedIslands) {
  var v1Defined = typeof(v1) != 'undefined';
  var v2Defined = typeof(v2) != 'undefined';
  if (v1Defined && v2Defined) {
    return v1 != v2;
  } else if (!v1Defined && v2Defined) {
  return finishedIslands[v2];
  } else if (v1Defined && !v2Defined) {
    return finishedIslands[v1];
  } else {
    return false;
  }
}

function readField() {
  var table = $("ShikakuTable");
  var rows = table.childNodes[0].childNodes;
  var size = (rows.length-1)/2
  var field = new Array(size);
  for (var y = 0;y<size;y++){
    var row = rows[y*2+1];
    field[y] = new Array(size);
    for (var x = 0; x<size;x++) {
      var cell = row.childNodes[x*2+1];
      if (cell.childNodes.length > 0) {
        var textNode = cell.childNodes[0];
        field[y][x] = parseInt(textNode.nodeValue);
      }
    }
  }
  return field;
}

function translateToIslands(field){
  var currentIsland = -1;
  var islandSizes = new Array();
  for (var i=0;i<field.length;i++){
    for (var j=0;j<field[i].length;j++){
      if (field[i][j]) {
        currentIsland++;
        islandSizes[currentIsland] = field[i][j];
        field[i][j] = currentIsland;
      }
    }
  }
  return islandSizes;
}

function findTrivialIslands(field, islandSizes, finishedIslands) {
  var fieldSize = field.length;
  var changedSomething = false;
  for (var islandId = 0;islandId<islandSizes.length;islandId++) {//
    if (!finishedIslands[islandId]) {
      var myFeasibleIslands = feasibleIslands(field, islandSizes, islandId);
      if (myFeasibleIslands.length == 0) {
        alert("Unlösbar: " + islandId);
        showField(field);
      } else if (myFeasibleIslands.length == 1) {
        var island = myFeasibleIslands[0];
        paintIsland(field, island, islandId);
        finishedIslands[islandId] = true;
        changedSomething = true;
      } else {
        //At least mark the fields that are covered by all islands
        var left = 0;
        var right = fieldSize;
        var top = 0;
        var bottom = fieldSize;
        for each (var island in myFeasibleIslands) {
          left = Math.max(left, island.left);
          right = Math.min(right, island.right);
          top = Math.max(top, island.top);
          bottom = Math.min(bottom, island.bottom);
        }
        for (var y = top;y<=bottom;y++) {
          for (var x=left;x<=right;x++) {
            if (field[y][x] != islandId) {
              field[y][x] = islandId;
              changedSomething = true;
            }
          }
        }
      }
    }
  }
  return changedSomething
}

function showField(field) {
  var text = "";
  for (y = 0;y<field.length;y++) {
    text = text + field[y] + "\n";
  }
  alert(text);
}

function paintIsland(field, island, islandId) {
  for (var y = island.top;y<=island.bottom;y++){
    for (var x=island.left;x<=island.right;x++) {
      field[y][x] = islandId;
    }
  }
}

function feasibleIslands(field, islandSizes, islandId) {
  var fieldSize = field.length;
  var minX = 100;
  var maxX = -1;
  var minY = 100;
  var maxY = -1; 
  //Determine the min and max sizes of the island.
  for (var y=0;y<field.length;y++){
    for (var x=0;x<field[y].length;x++){
      if (field[y][x] == islandId) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  var islands = possibleIslands(islandSizes[islandId], fieldSize, minX, maxX, minY, maxY);
  var myFeasibleIslands = new Array();
  for each (var island in islands) {
    var feasible = true;
    for (var y = island.top;y<=island.bottom;y++) {
      for (var x=island.left;x<=island.right;x++) {
        if (typeof(field[y][x])!='undefined' && field[y][x] != islandId) {
          feasible = false;
          break;
        }
      }
      if (!feasible) {
        break;
      }
    }
    if (feasible) {
      myFeasibleIslands.push(island);
    }
  }
  return myFeasibleIslands;
}

function possibleIslands(islandSize, fieldSize, minX, maxX, minY, maxY) {
  //Returns all islands that are possible without taking the neighbours into account.
  var dimensions = possibleDimensions(islandSize, fieldSize);
  var islands = new Array();
  for each (var dimension in dimensions) {
    //Find all possible patterns where the dimension will fit.
    //offset 0, 0 is where the minX, minY is in the top-left corner of the dimension.
    var marginX = dimension.x - (maxX-minX) - 1;
    var marginY = dimension.y - (maxY-minY) - 1;
    for (var offsetX = -1*marginX;offsetX<=0;offsetX++) {
      for (var offsetY = -1*marginY;offsetY<=0;offsetY++) {
        var island = new Object();
        island.left = minX + offsetX;
        island.top = minY + offsetY;
        island.right = island.left + dimension.x - 1;
        island.bottom = island.top + dimension.y - 1;
        island.width = dimension.x;
        island.height = dimension.y;
        if (island.left > -1 && island.top > -1 && island.bottom < fieldSize && island.right < fieldSize) {
          islands.push(island);
        }
      }
    }
  }
  return islands;
}

function possibleDimensions(islandSize, fieldSize) {
  var primes = new Array(2,3,5,7,11,13,17,19,23);
  var factors = new Array();
  while(islandSize > 1) {
    for (var i=0;i<primes.length;i++){
      var prime = primes[i];
      if (prime < fieldSize && islandSize % prime == 0) {
        if (factors[i]) {
          factors[i]++;
        } else {
          factors[i] = 1;
        }
        islandSize = islandSize/prime;
      }
    }
  }
  //Now the primeFactors have been found -> find the possible square-sizes.
  //Stack containing the current position in the array.
  var currentFactorCounts = new Array();
  currentFactorCounts.push(-1);
  var dimensions = new Array();
  while(currentFactorCounts.length > 0) {
    var currentFactorCount = currentFactorCounts.pop();
    var maxCurrentFactorCount = factors[currentFactorCounts.length]?factors[currentFactorCounts.length]:0;
    if (currentFactorCount < maxCurrentFactorCount) {
      currentFactorCount++;
      currentFactorCounts.push(currentFactorCount);
      if (currentFactorCounts.length >=primes.length) {
        var dimension = createDimension(primes, factors, currentFactorCounts);
        dimensions.push(dimension);
      } else {
        currentFactorCounts.push(-1)
      }
    }
  }
  return dimensions;
}

function createDimension(primes, maxFactors, usedFactors) {
  var x = 1;
  var y = 1;
  for (var i = 0;i<primes.length;i++){
    x *= Math.pow(primes[i], usedFactors[i]);
    y *= Math.pow(primes[i], (maxFactors[i]?maxFactors[i]:0) - usedFactors[i]);
  }
  var result = new Object();
  result.x = x;
  result.y = y;
  return result;
}

function embedFunction(s) {
  document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

if (document.getElementsByName("ready").length > 0) {
  var solveButton = createEl({n:"input", a: {"@class":"button", "@type":"submit", "@value":" Solve ", "@name":"nothing", "@onclick":"solvePuzzle()"}, c:[]});
  var newPuzzleButton = document.getElementsByName("new")[0];
  insertAfter(solveButton, newPuzzleButton);
  insertAfter(document.createTextNode('\n'), newPuzzleButton);
  embedFunction(solvePuzzle);
  embedFunction(findSingleReachables);
  embedFunction(submitField);
  embedFunction(drawLine);
  embedFunction(readField);
  embedFunction(translateToIslands);
  embedFunction(findTrivialIslands);
  embedFunction(showField);
  embedFunction(paintIsland);
  embedFunction(feasibleIslands);
  embedFunction(possibleIslands);
  embedFunction(possibleDimensions);
  embedFunction(createDimension);
  embedFunction($);  
}