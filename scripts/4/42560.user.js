// ==UserScript==
// @name           Javadoc Offline
// @namespace      fagonfoss.com
// @description    Take Javadoc offline with google gears!
// @include        http*://*/*
// ==/UserScript==

var count = 0;
var total = 0;
var baseLoc = window.location + "";

var doOffline = (window.frames.length > 0);

function getProgressFrame()
{
	for (y = 0; y < window.frames.length; y++) {
		if (window.frames[y].name == "packageListFrame") return window.frames[0];
	}
}

function updateProgress() {
	if (count < total)
	{
		count++;
	}
	var progress = getProgressFrame().document.getElementById("progress");
	progress.innerHTML = count + " / " + total + " cached";
	
	if (count == total) {
		cached = true;
		capture(baseLoc);
		progress.innerHTML = "";
	}
}

function insertProgessMeter() {
	var progressFrame = getProgressFrame();

	var progressDiv = progressFrame.document.createElement("div");
	progressDiv.setAttribute("id", "progress");
	var content = progressFrame.document.createTextNode("");
	progressDiv.appendChild(content);

	var bodyElem = progressFrame.document.getElementsByTagName('BODY')[0];
	var parent = bodyElem.parentNode;
	parent.insertBefore(progressDiv, parent.firstChild);
}

function addLoadEvent(func) {
  var oldonload = unsafeWindow.onload;
  if (typeof unsafeWindow.onload != 'function') {
    unsafeWindow.onload = func;
  } else {
    unsafeWindow.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}

// Correct gears init code
var server = null;
var store = null;
function initGears() {
	if (!unsafeWindow.google) unsafeWindow.google= {};
	if (!unsafeWindow.google.gears)
	{
	  unsafeWindow.google.gears = {};
	  unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
	  try 
	  {
	    unsafeWindow.google.gears.factory = unsafeWindow.GearsFactory();
	    server = unsafeWindow.google.gears.factory.create('beta.localserver');
	    store = server.createStore("javadoc_offline");
	  }
	  catch(e)
	  {
	  	alert("Something went wrong! - " + e.message);
	  }
	}
}

function capture(url) {
  console.log("Trying to capture: " + url);
  if (!store) {
    setError('Please create a store for the captured resources');
    return;
  }
  //if (store.canServeLocally(url))
  //	return;
  
  store.capture(url, function(url, success, captureId){
  	  updateProgress();
      console.log("Captured: "+url);
  });
}

function triggerAllowJavadocDialog(){
window.addEventListener("load",
  function(){
    new GearsFactory().create('beta.localserver', '1.0');
    location.href = location.href;
    return false;
  }, true);
}

function getBaseUrl(loc) {
	if (loc.charAt(loc.length) != '/') {
		var pos = loc.lastIndexOf('/');
		return loc.substring(0, pos) + "/";
	}
	return loc + "/";
}

function isJavadoc() {
	for (y = 0; y < window.frames.length; y++) {
		var name = window.frames[y].name;
		
		if (name != "packageListFrame" || name != "packageFrame" || name != "classFrame") {
			return false;
		}
	}
	return true;
}

function getLinksFromFrames() {
	var links = [];
	for (y = 0; y < window.frames.length; y++) {
		var frameBody = window.frames[y].document.getElementsByTagName('BODY')[0];
		var ahrefs = frameBody.getElementsByTagName('a');
		for (i = 0; i < ahrefs.length; i++) {
			links.push(getBaseUrl(window.frames[y].location + "") + ahrefs[i].getAttribute("href"));
		}
	}
	return links;
}

addLoadEvent(function() {
  if (!doOffline) {
  	return;
  }
  
  insertProgessMeter();
  initGears();
  if (!server){
    triggerAllowJavadocDialog();
  }

  var links = getLinksFromFrames();
  total = links.length
  
  total++;
  capture(window.location+"");
  
  for (y = 0; y < window.frames.length; y++) {
  	total++;
  	capture(window.frames[y].location + "");
  }
  
  for (i = 0; i < links.length; i++)
  {
  	var link = links[i];
  	capture(link);
  	
  	pos = link.indexOf('package-frame.html');
  	if (pos != -1) {
  		total = total + 4;
		capture(link.substring(0, pos) + 'package-tree.html');
		capture(link.substring(0, pos) + 'deprecated-list.html');
		capture(link.substring(0, pos) + 'index-all.html');
		capture(link.substring(0, pos) + 'help-doc.html');
	}
  }
});