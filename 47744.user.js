// ==UserScript==
// @name           (Gnome & Kde)-look: preview link changer
// @namespace      http://userscripts.org/users/87790
// @author         Hadogenes
// @description    Changes links to preview to direct one
// @include        http://gnome-look.org/content/show.php/*
// @include        http://*.gnome-look.org/content/show.php/*
// @include        http://kde-look.org/content/show.php/*
// @include        http://*.kde-look.org/content/show.php/*
// ==/UserScript==
function a() {
  return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')
}
document.body.appendChild(document.createElement('script')).innerHTML = a();
return;

function getElementByClass(tagName,className) {
  var tags = document.getElementsByTagName(tagName);
  var finds = [];
  
  for(var i = 0, len = tags.length; i < len; ++i) {
    if (tags[i].className.indexOf(className) != -1) {
       finds.push(tags[i]);
     }
  }
   
  return finds;
}

function getChildByType(nodeArray, type) {
	var finds = [];
	
  for(var i = 0, len = nodeArray.length; i < len; ++i) {
    if (nodeArray[i].nodeName == type.toUpperCase()) {
      finds.push(nodeArray[i]);
    }
	}
  return finds;
}

function changeLinks() {
	var links = getChildByType(getElementByClass("td", "detailcontent")[0].childNodes, "a");
	
	var hrefSplit, fileNo, fileId, fileName;
	var newSrc, newEnd;
	
	for(var i = 0, len = links.length; i < len; ++i) {
		hrefSplit = links[i].href.split("?")[1].split("&");
		
		// Finding Id and No of images
		for (var j = 0; j < hrefSplit.length; ++j) {
			var hrefMain = hrefSplit[j].split("=")[0];
			
		  if (hrefMain == "preview") {
		    fileNo = hrefSplit[j].split("=")[1];
		  }
		  // Maby it will by needed someday
		  //else if (hrefMain == "id") {
  		//  fileId = hrefSplit[j].split("=")[1];
		  //}
		}
		
		// Finding filename of image (must be in another loop, because we don't know the order in hrefSplit tab)
		var mainNo = "file" + fileNo;
		for (var j = 0; j < hrefSplit.length; ++j) {
		  if (hrefSplit[j].split("=")[0] == mainNo) {
		    fileName = hrefSplit[j].split("=")[1];
		  }
		}
		
		newEnd = "-pre" + fileNo + "/" + fileName;
		// Getting base address from preview image
		newSrc = getChildByType(links[i].childNodes, "img")[0].src.replace(/(.*)-m[0-9]+.*/, "$1" + newEnd);
		
		// Last part changing link and "onclick" event handler
		links[i].href = newSrc;
		links[i].onclick = "";
		links[i].target = "";
	}
}

window.addEventListener("load", function() { changeLinks(); }, true);
