// ==UserScript==
// @name           Show Titles in Recent Items
// @namespace      Niall's SalesForce hacks
// @description    Replaces the Case numbers with friendlier Titles in the Recent Items sidebar box
// @include        https://na1.salesforce.com/*
// ==/UserScript==
//

// find that box containing the recent item entries

var e = document.getElementById("sidebarDiv");
if(!e) return;
var recentItems = e.childNodes[3].childNodes[1].childNodes[1].childNodes[0];
if (!recentItems) return;

// recentItems of clas mruList individualPalette
var entries = getElementsByClass("caseBlock",recentItems,"div");

var req = 0;  // one global XMLHttpRequest


var url = "https://na1.salesforce.com/ui/common/MRUHoverLoader?";
var hoverIDs = new Array();
// go through each recent items entry, extract hoverID from onmouseover, append to url
for(var ii=0; ii<entries.length; ii++) {
        var onmouseover = entries[ii].getAttribute("onmouseover");
        var hoverID = onmouseover.substr(25,15);
        hoverIDs.push(hoverID);
        if(ii != entries.length-1)
            url = url + "hoverIds=" + hoverID + "&";
        else
            url = url + "hoverIds=" + hoverID;
}

GetAsyncData(url,req,hoverIDs);



function GetAsyncData(url,req,hoverIDs) {
    if(window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.abort();
        req.onreadystatechange = function() {
              if(req.readyState==4 && req.status == 200) {
                  var response = req.responseText;
                  for(var j=0; j<hoverIDs.length; j++) { 
                    // this does some very ugly string searches, and a getElementById, so it
                    // could probably be sped up a lot  (XPATH?)
                    var desiredHover = hoverIDs[j];
                    var regexA = new RegExp("<" + desiredHover + ">","g");
                    var regexB = new RegExp("</" + desiredHover + ">","g");
                    var desiredHoverStart = response.search(regexA);
                    var desiredHoverStop = response.search(regexB);
                    var text = response.slice(desiredHoverStart,desiredHoverStop);
                    
                    var titleIndex = text.search(/Title<\/td><td class=\"dataCol\">/);
                    titleIndex = titleIndex+30; // skip to start of title text

                    var title = text.slice(titleIndex,titleIndex+50);
                    var endPoint = title.search(/<\/td>/);
                    title = title.slice(0,endPoint);

                    var box = document.getElementById("mru" + hoverIDs[j]);
                    if(!box)
                        alert("couldnt find mru" + hoverIDs[j]);
                    else {
                        var target = box.childNodes[0].childNodes[1];
                        target.innerHTML = "<b>" + title + "</b>";
                    }

                  }
              } 
        }
        req.open("GET", url, true);
        req.send(null);
    }
}



function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

