// ==UserScript==
// @name           Operation: De-Junk Youtube
// @namespace      http://userscripts.org/users/117504
// @description    Cleans junk and ads on youtube.
// @include        http://*.youtube.com/*
// @include        http://www.youtube.com/*
// @require        http://sizzlemctwizzle.com/updater.php?id=77394
// ==/UserScript==
//Version 0.7
var enlargeVids = false; //enlarge videos?
removeContent('feedmodule-POP');
removeContent('POP-data');
removeContent('homepage-side-content');
removeContent('footer-new');
removeContent('search-pva');
removeContent('ad_creative_1');
removeContent('search-related-terms');
removeContent('watch-promoted-videos-container');
removeContent('homepage-whats-new-block');
removeContent('masthead_child_div');
removeContent('ad_creative_expand_btn_1');
removeContent('google_companion_ad_div');
removeContent('watch-channel-brand-div');
homePage();
fixColumns();
if (enlargeVids) { enlargeVideo(); }
removeClass('playlist-entry');
removeClass('search-related search-related-keywords');
removeClass('movie-cell *sr');
removeClass('ads');
removeClass('video-long-title');
removeClass('show-cell *sr');
removeClass('playlist-cell *sr');
removeClass('channel-cell *sr');
removeClass('promoted-videos-disclaimer');
removeClass('channel-cell *sr');
removeClass('playlist-entry');
removeClass('video-long-title');

function homePage() {
  var home = document.getElementById('homepage-main-content');
  try { home.style.width = "965px";} 
  catch(err) {}
}

function enlargeVideo() {
  var player = document.getElementById('movie_player');
  try {
    player.setAttribute("style", "width: 170% !important; height: 170% !important;");
  }
  catch(err) {}
}

function fixColumns() {
  try {
  var table = document.createElement("table");
  var row = table.insertRow(0);
  var left = row.insertCell(0);
  var right = row.insertCell(1);
  left.setAttribute("valign", "top");
  right.setAttribute("valign", "top");
  var links, link;
  links = document.evaluate("//div[@class='video-cell *sr']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  var half = links.snapshotLength / 2;
  var parent;
  for(var i = 0; i < links.snapshotLength; i++) {
	  link = links.snapshotItem(i);
	  link.parentNode.parentNode.appendChild(table);
	  if(i < half)
		  left.appendChild(link);
	  else
		  right.appendChild(link);
          link.style.padding = "10px";
          link.style.border = "5px";
  }
  removeClass('video-long-title');
  }
  catch(err) {}
}

function removeContent(id) {

  var node = document.getElementById(id);

  if (node) {
	  node.parentNode.removeChild(node);
	  node = null;
  }
}

function removeClass(cls) {
  
  var cool = document.getElementsByClassName(cls);
 
  if (cool.length > 0) {
    for(var d = 0; d < cool.length; d++) {
      cool[d].parentNode.removeChild(cool[d]);
      cool[d] = null;
    }
  }
}

document.getElementsByClassName = function(clsName){
    var retVal = new Array();
    var elements = document.getElementsByTagName("*");
    for(var i = 0;i < elements.length;i++){
        if(elements[i].className.indexOf(" ") >= 0){
            var classes = elements[i].className.split(" ");
            for(var j = 0;j < classes.length;j++){
                if(classes[j] == clsName)
                    retVal.push(elements[i]);
            }
        }
        else if(elements[i].className == clsName)
            retVal.push(elements[i]);
    }
    return retVal;
}   