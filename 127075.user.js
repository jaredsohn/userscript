// ==UserScript==
// @name           Unmutable Hangouts
// @namespace      com.mohamedmansour.googleplus.cantimute
// @description    Auto unmutes Hangouts in Google+
// @version        1.0
// @include        https://plus.google.com/hangouts/* 
// ==/UserScript==

// Do not run in iframes
if (window.top !== window.self) {
	return;
}

var runner = null;

var settings = {
  set automute_setting(val) {
    localStorage['automute_setting'] = val;
  },
  get automute_setting() {
    var key = localStorage['automute_setting'];
    return (typeof key == 'undefined') ? true : key === 'true';
  }
};

var simulateClick = function(element) {
  var initEvent = function(elt, str) {
      var clickEvent = document.createEvent("MouseEvents");
      clickEvent.initEvent(str, true, true);
      elt.dispatchEvent(clickEvent)
  };
  initEvent(element, "mousedown");
  initEvent(element, "click");
  initEvent(element, "mouseup");
};

var checkMuteStatus = function() {
  var mutes = document.querySelectorAll('div[title$="ute microphone"]');
  for (var i = 0; i < mutes.length; i++) {
    var mute = mutes[i];
    if (mute.getAttribute('title' ) == 'Unmute microphone') {
      simulateClick(mute);
    }
  }
};

var keyListener = function(e) {
  if (e.ctrlKey && e.keyCode == 77 /*m*/) {
    load(true);
  }
};

var clickListener = function(e) {
  load(true);
};

var linkListener = function(e) {
  window.open(e.target.href);
  return false;
};

var load = function(toggle) {
  if (toggle) {
    settings.automute_setting = !settings.automute_setting;
  }

  if (settings.automute_setting && !runner) {
    runner = setInterval(checkMuteStatus, 1000);
  }
  else if (runner) {
    clearInterval(runner);
    runner = null;
  }
  muteButton.innerText = (settings.automute_setting ? 'Stop' : 'Start') + ' Auto UnMute';
};

// Render UI.
var container = document.createElement('div');
container.setAttribute('style', 'visibility: visible; position: fixed; z-index: 1000; top: 5px; left: 300px;');
var muteButton = document.createElement('button');
muteButton.addEventListener('click', clickListener, false);
muteButton.setAttribute('style', 'background-color: #368200;background-image: -webkit-linear-gradient(top,#3D9400,#368200);' +
                                 'background-image: -moz-linear-gradient(top,#3D9400,#368200);background-image: -ms-linear-gradient(top,#3D9400,#368200);' +
                                 'background-image: -o-linear-gradient(top,#3D9400,#368200);background-image: linear-gradient(top,#3D9400,#368200);' +
                                 'border: 1px solid #2D6200;text-shadow: 0 1px rgba(0, 0, 0, 0.3);color: white;border-radius: 3px;padding: 5px;');
container.appendChild(muteButton);
var helpLink = document.createElement('a');
helpLink.href = 'https://plus.google.com/116805285176805120365/about';
helpLink.onclick = linkListener;
helpLink.innerText = '?';
helpLink.setAttribute('style', 'color: blue; cursor: pointer');
container.appendChild(helpLink);

document.body.appendChild(container);

// Init Key Events.
window.addEventListener('keyup', keyListener, false);

// Start loading the listeners.
load();