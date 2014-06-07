// ==UserScript==
// @name          Show Craigslist Emails and locations
// @namespace     http://jeffpalm.com/showemails/
// @description   Shows the contact info and google map location on the subject page of craigslist
// @include       http://*craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2009 Jeffrey Palm.
 */
const TESTING = true;

// --------------------------------------------------
// Misc
// --------------------------------------------------

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

// --------------------------------------------------
// Main
// --------------------------------------------------

function newShowLocationEventListener(_a,_link) {
	var a = _a;
	var link = _link;
	return function(e) {
    GM_xmlhttpRequest({
      method:"GET",
          url:a.href,
          headers:{
          "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml,text/plain",
            },
          onload: function(res) {
					try {
            showLocation(res,a,link);
          } catch (e) {if (TESTING) alert(e);}
				}
      });
	}
}

function showLocation(response,a,link) {
  var lines = response.responseText.split(/\n/);
	var res;
	var found = false;
	for (var i=0; i<lines.length; i++) {
		var line = lines[i];
    
    // http://maps.google.com/?q=loc%3A+%34%32+street+brooklyn+ny+US
    if (res = line.match(/http:\/\/maps.google.com\/\?q=loc%3A+([^\"]+)\">google map/)) {
      var loc = unescape(res[1]);
      loc = loc.replace(/%30/g,'0');
      loc = loc.replace(/%31/g,'1');
      loc = loc.replace(/%32/g,'2');
      loc = loc.replace(/%33/g,'3');
      loc = loc.replace(/%34/g,'4');
      loc = loc.replace(/%35/g,'5');
      loc = loc.replace(/%36/g,'6');
      loc = loc.replace(/%37/g,'7');
      loc = loc.replace(/%38/g,'8');
      loc = loc.replace(/%39/g,'9');
      loc = loc.replace(/^\++/g,'');
      loc = loc.replace(/\++$/g,'');
      // Try to normalize it a little

      // The location to show
      var showLocation = loc;
      showLocation = showLocation.replace(/\+/g,' ');
      
      
      var width  = 150;
      var height = 150;
      
      var url = 'http://jeffpalm.com/showemails/map.php?loc=' + loc;
      
      var d = $n("div",a.parentNode);
      d.style.padding = '20px';
      d.style.display = "inline";
      $t(" ",a.parentNode);
      var div = $n("div",a.parentNode);
      
      // Place the map
      var newDiv;
      newDiv = $n("iframe",div);
      newDiv.style.display = 'inline';
      newDiv.style.float = 'left';
      newDiv.style.width = (width+20) + "px";
      newDiv.style.height = (height+20) + "px";
      newDiv.style.border = "0";
      newDiv.style.frameBorder = "0";
      newDiv.overflow = 'none';
      newDiv.src = url;
                        
      // Show the address
      newDiv = $n("div",div);
      newDiv.style.paddingTop = '20px';
      newDiv.style.display = 'inline';
      newDiv.style.float = 'left';
      newDiv.style.verticalAlign = 'top';
      newDiv.innerHTML = showLocation;
      
      found = true;

      turnLinkToShown(link);
    }
  }
	//
	// Not found
	//
	if (!found) turnLinkToNotFound(link);
}

function newEventListener(_a,_link) {
	var a = _a;
	var link = _link;
	return function(e) {
    GM_xmlhttpRequest({
      method:"GET",
          url:a.href,
          headers:{
          "User-Agent":"monkeyagent",
            "Accept":"text/monkey,text/xml,text/plain",
            },
          onload: function(res) {
					showContactInfo(res,a,link);
				}
      });
	}
}

function showContactInfo(response,a,link) {
	var lines = response.responseText.split(/\n/);
	var res;
	var found = false;
	for (var i=0; i<lines.length; i++) {
		var line = lines[i];
		//
		// Maybe replace with a confident address
		//
		if (res = line.match(/href=\"(mailto[^\"]+)\">([^<]+)</)) {
			link.href      = res[1];
			link.innerHTML = res[2];
			link.style.fontStyle = "normal";
			link.style.color = "#990066";
			found = true;
			break;
		}
		//
		// Maybe replace with a possible address
		//
		if (res = line.match(/\W(\w+@\w+\.\w+)\W/)) {
			link.href      = "mailto:" + res[1];
			link.innerHTML = res[1];
			link.style.fontStyle = "normal";
			link.style.color = "#770000";
			found = true;
			break;
		}
	}
	//
	// Not found
	//
	if (!found) turnLinkToNotFound(link);
}

function turnLinkToShown(link) {
  link.href = "#";
  link.style.fontStyle = "normal";
  link.style.color = "#333300";
  link.innerHTML = "showing";
}

function turnLinkToNotFound(link) {
  link.href = "#";
  link.style.fontStyle = "normal";
  link.style.color = "#330000";
  link.innerHTML = "not found";
}

function main() {
  var links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    var a = links[i];
		if (!a.href) continue;
		if (!a.href.match(/\d+\.html$/)) continue;
		var p = a.parentNode;
    var link;

    // contact info link
		link = document.createElement("a");
		p.appendChild(document.createTextNode(" "));
		link.innerHTML = "contact info";
		link.style.color = "#007700";
		link.style.fontStyle = "italic";
		link.href = "#" + new Date().getTime();
		p.appendChild(link);
		link.addEventListener("click",newEventListener(a,link),true);

    // show location link
		link = document.createElement("a");
		p.appendChild(document.createTextNode(" "));
		link.innerHTML = "show location";
		link.style.color = "#007777";
		link.style.fontStyle = "italic";
		link.href = "#_" + new Date().getTime();
		p.appendChild(link);
		link.addEventListener("click",newShowLocationEventListener(a,link),true);
  }    
}

try {main();} catch (e) {if (TESTING) alert("ERROR:" + e);}