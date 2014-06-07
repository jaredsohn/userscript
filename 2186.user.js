// ==UserScript==
// @name          Slashdot Keyboard Shortcuts
// @namespace     http://www.z33.org/
// @description   Be liberated from the tyrany of manual scrolling on Slashdot!
// @include       http://slashdot.org/*
// @include       http://www.slashdot.org/*
// ==/UserScript==

(function() {

  var browseObjs;  // list of navigable objects
  var keyFuncMap; // keycode to function map

  // basically our "main" function
  function handleOnloadEvent(event) {
    // loads naviObjs list
    // setups keycode to funtion mapping
    // registers keyboard event listeners
    if (setup()) {
      // GM_log("Setup completed successfully.");
      // scroll to fist object
      gotoNextObject();
    }
  }

  function setup() {

    // get list of navigable objects
    browseObjs = getBrowsableObjects();

    // don't setup keybindings if there are navigable objects
    if (!browseObjs || browseObjs.length == 0) {
      alert("Couldn't find any browsable objects!");
      return false;
    }
    // alert("Found " + browseObjs.length + " navigable objects in page");

    // add keybindings
    keyFuncMap = new Array();
    
    // for the right hand
    keyFuncMap["j".charCodeAt(0)] = gotoNextObject;
    keyFuncMap["k".charCodeAt(0)] = gotoPreviousObject;

    // for the left hand
    keyFuncMap["f".charCodeAt(0)] = gotoNextObject;
    keyFuncMap["d".charCodeAt(0)] = gotoPreviousObject;

    // add a keyboard event listener
    document.addEventListener("keypress", handleKeyboardEvent, false);
    return true;
  }

  // returns a list of objects to which we can navigate
  function getBrowsableObjects() {
    var objects = [];

    // for some reason //table/tr/td[@bgcolor='#006666'] doesn't work
    // so we select all tables, then investigate their children via dom methods
    var xpath = "/html/body//div[@id='articles']//div[@class='generaltitle']";
    var obit = document.evaluate(xpath, document, null,
        XPathResult.ANY_TYPE, null);
    while (o = obit.iterateNext()) {
      objects.push(o);
    }
    return objects;
  }

  function handleKeyboardEvent(event) {
    // not sure why this is needed, but it was in the sample
    // script so I keep it here
    if (!event) event = window.event;

    var charCode = event.which;
    var handler = keyFuncMap[charCode];
    if (handler) {
      handler(event);
    }
  }

  // scroll page to location of next object, or first object
  // if at end
  function gotoNextObject(event) {
    var objPos = getNextObjectPosition(window.pageYOffset);
    if (objPos) {
      window.scrollTo(0, objPos);
    } // else no object found
  }

  // scroll page to location of previous object, or last object
  // if at beginning
  function gotoPreviousObject(event) {
    var objPos = getPreviousObjectPosition(window.pageYOffset);
    if (objPos) {
      window.scrollTo(0, objPos);
    } // else no object found
  }

  // returns the index of the next object
  function getNextObjectPosition(winPos) {
    for (var i = 0; i < browseObjs.length; i++) {
      var objPos = findObjectPosition(browseObjs[i]);
      if (winPos < objPos) {
        return objPos;
      } 
    }
    return null;
  }

  // returns the position of the next object
  function getPreviousObjectPosition(winPos) {
    for (var i = browseObjs.length - 1; i >= 0; i--) {
      var objPos = findObjectPosition(browseObjs[i]);
      if (winPos > objPos) {
        return objPos;
      } 
    }
    return null;
  }

  function findObjectPosition(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
      while (obj.offsetParent) {
        curtop += obj.offsetTop
        obj = obj.offsetParent;
      }
    } else if (obj.y) {
      curtop += obj.y;
    }
    return curtop;
  }

  // call "main" when the document is finished loading
  window.addEventListener("load", handleOnloadEvent, false);

})();
