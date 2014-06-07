// ==UserScript==
// @name           Google SSL - img link
// @namespace      366.hopto.org
// @include        https://encrypted.google.com/*
// @description    Inserts link to images when using SSL Google search (img search isn't secured!)
// ==/UserScript==

//get all divs - iterator style

//settings
var show_always_link=true;
//end of settings

function htmlDecode(input){
  var e = document.createElement('div');
  e.innerHTML = input;
  return e.childNodes[0].nodeValue;
}

window.setTimeout(doMyStuff, 300);

function doMyStuff(){
  var result = document.evaluate("//div[@id='ires']/ol", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var imgbox = document.evaluate("//div[@id='ires']/ol/li[@id='imagebox']", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var img = document.evaluate("//*[@id='rg']", document.documentElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if(img.snapshotLength>0){
    return;
  }
  
  var imgbox_found=false;

  if (imgbox.snapshotLength > 0) {
  	result.snapshotItem(0).innerHTML = "<li style='margin-bottom:10px;'><a href=\"#imagebox\">Here</a> is box with images.</li>" + result.snapshotItem(0).innerHTML;
  	imgbox_found=true;
  }

  if(!imgbox_found || show_always_link) {
  	if (result.snapshotLength > 0) {
  		if (result.snapshotLength > 1) {
  			GM_log("found too many (" + result.snapshotLength + ") divs.. wtf?");
  		}
  		var text = "<li style='margin-bottom:10px;'>";
  		var loc = window.location.toString();
  		var q = decodeURIComponent(loc.replace(/.*?q=([^&]*?)(&.*|$)/, "$1").replace(/\+/g, " "));
  		q = htmlDecode(q);
  		text += "<a href=\"" + loc.replace(/(https:\/\/encrypted\.google\.com\/)search\?/, "$1images?") + "\">Link</a> to image search for \"" + q + "\".";
  		text += "</li>";
		
  		result.snapshotItem(0).innerHTML = text + result.snapshotItem(0).innerHTML;		
  	}	
  }
}