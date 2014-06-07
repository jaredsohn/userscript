/* 
Flickr Cut-n-Paste to Blog

This script makes it easy to cut-and-paste photos from Flickr
into your blog while still including a credit link to the photographer.

- creates CSS classes around images on flickr
  - this makes it easy to create your own style for displaying photos
  - CSS structure: http://userscripts.org/scripts/show/12118
- creates a credit link underneath the photo
  - links to the photographer's main photo page
- automatically checks for updates every two weeks

*/
// ==UserScript==
// @name           Flickr Cut-n-Paste to Blog
// @namespace      http://InternetDuctTape.com
// @description    Makes it easy to do an OLE cut-and-paste Flickr photos to your blog (ie: WordPress using TinyMCE) and give the proper attribution
// @include        http://flickr.com/*
// @version        1.0
// ==/UserScript==

(function() {
  window.addEventListener("load", function(e) {flickrCutNPaste()}, false);
 })();


function flickrCutNPaste () {
  autoUpdateFromUserscriptsDotOrg({
    name: 'Flickr Cut-n-Paste to Blog',
	url: 'http://userscripts.org/scripts/source/12118.user.js',
	version: "1.0",
	});

  var list = document.getElementsByTagName('div');
  var credit;
  var photo;
  var found = 0;
  for (var index=0; (index<list.length) && (found < 2); index++) {
    console.log(list[index].className);
    if (
	(list[index].className == "Widget") ||
	(list[index].className == "Owner")
	) {
      //      console.log("found credit");
      credit = list[index].lastChild.previousSibling.href;
      found += 1;
    }
    else if (list[index].className == "photoImgDiv") {
      //      console.log("found photoImgDiv");
      for (var j=0; j<list[index].childNodes.length; j++) {
	if (list[index].childNodes[j].nodeName == "IMG") {
	  photo = list[index].childNodes[j];
	  found += 1;
	}
      }
    }
    else if (list[index].className == "DownloadThis") {
      //      console.log("found DownloadThis");
      for (var j=0; j<list[index].childNodes.length; j++) {
	for (var k=0; k<list[index].childNodes[j].childNodes.length; k++) {
	  //	  console.log("j:" + j + ", k:" + k);
	  //	  console.log(list[index].childNodes[j].childNodes[k].nodeName);
	  if (list[index].childNodes[j].childNodes[k].nodeName == "IMG") {
	    photo = list[index].childNodes[j].childNodes[k];
	    found += 1;
	  }
	}
      }
    }
  }
  if (credit && photo) {
    // Clean up photo
    // ?v=0" alt="Migration" onload="show_notes_initially();" class="reflect"
    photo.innerHTML = photo.innerHTML.replace(/\s+(onload=".*?"|class=".*?"|id=".*?")/i);

    // Create a placeholder 
    var p = document.createElement('span');
    p.className = "flickr-photo";
    insertAfter(p, photo);

    var s = document.createElement('span');
    var m = credit.match(/photos\/(.*?)\//);
    s.innerHTML = 'Photo by <a class="flickr-link" href="'+credit+'>'+m[1]+'</a>';
    s.className = "flickr-credit";
    p.appendChild(photo);
    p.appendChild(s);

    // Put cut-in-paste indicators
    var start = document.createElement('p');
    start.innerHTML = "<b>START-CUTTING-HERE (Click right mouse button, hold and drag) &gt;&gt;</b>";
    var end = document.createElement('p');
    end.innerHTML = "<b>&lt;&lt; STOP-CUTTING-HERE (Ctrl-C to copy, Ctrl-V to paste)</b>";
    p.parentNode.insertBefore(start, p);
    insertAfter(end, p);

  }
}



function insertAfter(newNode, node) {
// var link = document.getElementById("the_link");
// var icon = document.createElement("img");
// icon.src = "â€¦";
// insertAfter(icon, link);
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// Auto Update script
function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  // Update code from Junk Blocker: http://loonyone.livejournal.com/
// usage example
// autoUpdateFromUserscriptsDotOrg({
//   name: 'RSS+Atom Feed Subscribe Button Generator',
//   url: 'http://userscripts.org/scripts/source/688.user.js',
//   version: "1.2",
// });
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.

    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
      url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
      onload: function(result) {
        if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

        var theOtherVersion = parseFloat(RegExp.$1);
        if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

        if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
          GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
        }
      }
    });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
