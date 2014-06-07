// ==UserScript==
// @name           Page Positioning Buttons
// @author         Ziyu
// @namespace      http://userscripts.org/users/ziyu
// @description    Add links to go to top, bottom or a user specified position of each page.
// @include        *
// ==/UserScript==

// "Forked" from http://userscripts.org/scripts/show/105473

var numberOfPositions = 3;  // Sets number of positions
var bottomMargin = 80;  // Sets bottom margin

// common button style
var cssCommon = 'cursor:pointer;width:36px;';
var cssContainer = cssCommon + 'position:fixed;right:0px;';
var cssTopButton = cssCommon + 'height:36px;border-radius:5px 0 0 0;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB+SURBVDhPY1i1atV/amAGahgCMoNhaIGlS5cKAp19BoRBbLJcj2QILDJINwzoAmMgfoclIkBixkS5DI8hMJcRNgxoSBoOl6CnNZBhaVhdBjWE1MSJahjQkA4KEmYH2GUrV66cSYEhYB+AzKBtFiHkQqKiH6Ro1CDCQTWgYQQAs81DU0G/83sAAAAASUVORK5CYII=) no-repeat scroll 50% 50% rgba(0, 0, 0, 0);';
var cssBtmButton = cssCommon + 'height:36px;border-radius:0 0 0 5px;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAUCAYAAACAl21KAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACPSURBVDhPY2DAAlatWvUfH8amB6vYqEGEg2pgw4iQ7cTKM6xcuXImsYpxqQOZAQ4woIIOCgzrQAl1oEFpZBiWhitFgwx7R4SBIDXYDYGZDFRgTMAwkCHGhBMRJMxwGUa8ITCbli5dKgg08AySN8+AxIhyCboiJMPIN4Qsm6miiYioxltawvSDYogohYTUAQC80UNTOht/YwAAAABJRU5ErkJggg==) no-repeat scroll 50% 50% rgba(0, 0, 0, 0);';
var cssPosButtonSet = cssCommon + 'height:16px;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAAB7SURBVChTY2CAglWrVokAcRUQb4LiaiAtBpMH00ABayB+DcT/0fBbIN8OpkgUhyKYpndAeXGQaSAr0E1C59eDFG4mQuF2kMItxCqsJUJhI8hEcSAGORiXOz8A5aRgPncAct5jUQxS5IwelhJAwUYg3gHEO4G4CW4SUCUAr5P12vViZpQAAAAASUVORK5CYII=) no-repeat scroll 50% 50% rgba(0, 0, 0, 0);';
var cssPosButtonRwd = cssCommon + 'height:16px;background:url(data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAAOwgAADsIBFShKgAAAABl0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjUuODc7gF0AAAB9SURBVChThc4xDkAwAEbhHsQgsRjsFgaDCziH+1hMJukBiMVgcCYhwmuiNCiSb1DvTwnx80gpHWTWjI8uCkxoHiGHHkrM2A5XyIGPCosR6LAVHAaosb4EOuxUGGP8iFTcnf/IS4rBMrhCvSBM0N8Gz9AYROrKY2APjUFInO9AjKU6HWDivAAAAABJRU5ErkJggg==) no-repeat scroll 50% 50% rgba(0, 0, 0, 0);';

function newPosButton() {
  var pos = 0,
      isset = 0,
      posButton = document.createElement('div');

  function getPosition() {
    return pos;
  }

  function setPosition(yOffset) {
    pos = yOffset;
    isset = 1;

    return pos;
  }

  function goToPosition() {
    if(isset) {
      window.scrollTo(0, pos);
    }
  }

  function recordPosition() {
    setPosition(window.pageYOffset);

    posButton.style.cssText = cssPosButtonRwd;
    posButton.removeEventListener('click', recordPosition, false);
    posButton.addEventListener('click', goToPosition, false);
  }

  posButton.style.cssText = cssPosButtonSet;
  posButton.addEventListener('click', recordPosition, false);

  return {
    posButton   : posButton,
    isset       : isset,
    getPosition : getPosition()
  }
}

function Buttons() {

  var intervalHandle = null,
      numOfPos = numberOfPositions,
      container = document.createElement('div'),
      posContainer = document.createElement('div');

  function init() {

    var topButton = document.createElement('div'),
        btmButton = document.createElement('div');

    container.style.cssText = cssContainer + 'bottom:' + bottomMargin.toString() + 'px';
    topButton.style.cssText = cssTopButton;
    btmButton.style.cssText = cssBtmButton;

    topButton.addEventListener('click', pageGoToTop, false);
    topButton.addEventListener('mouseover', pageScrollUp, false);
    topButton.addEventListener('mouseout', stopScroll, false);

    btmButton.addEventListener('click', pageGoToBottom, false);
    btmButton.addEventListener('mouseover', pageScrollDown, false);
    btmButton.addEventListener('mouseout', stopScroll, false);

    container.appendChild(topButton);
    container.appendChild(posContainer);
    container.appendChild(btmButton);
    document.body.appendChild(container);

    return this;
  }

  function pageGoToTop() {
    window.scrollTo(0, 0);
  }

  function pageGoToBottom() {
    window.scrollTo(0, 999999);
  }

  function pageScrollUp() {
    if (intervalHandle == null) {
      intervalHandle = setInterval(function(){window.scrollBy(0,-3)}, 60);
    }
  }

  function pageScrollDown() {
    if (intervalHandle == null) {
      intervalHandle = setInterval(function(){window.scrollBy(0,3)}, 60);
    }
  }

  function stopScroll() {
    clearInterval(intervalHandle);
    intervalHandle = null;
  }

  function addPos() {

    while (numOfPos--) {
      posContainer.appendChild(newPosButton().posButton);
    }
    return this;
  }

  return {
    container    : container,
    posContainer : posContainer,
    init         : init(),
    addPos       : addPos()
  };
}

if (window.top == window.self) { // if not iframe

  var de = document.documentElement
  if(de.scrollHeight > de.clientHeight && document.body) {
    Buttons().init().addPos();
  }
}
