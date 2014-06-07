// ==UserScript==
// @name        KG - move details
// @namespace   KG
// @include     http*://*karagarga.net/details.php?*
// @exclude	http*://forum.karagarga.net/*
// @grant	none
// @version     1.5
// ==/UserScript==

var toMove = ["Language", "Subtitles", "Source", "Rip Specs", "Size", "Upped by", "Num files", "File list", "Added", "Snatched", "Peers", "Seeders", "Leechers", "Pots", "Visible", "Last\xA0seeder", "Filename"]

// don't run in iFrames
if (!window.frameElement) {

	// clear some anchor links as they'll jump to the wrong place	
    var links = document.links;
    for (i=0; i < links.length; i++) {
    	links[i].href = links[i].href.replace("#seeders", "");
    	links[i].href = links[i].href.replace("#filelist", "");
    	links[i].href = links[i].href.replace("#snatchers", "");
    }
    
    var headings = document.querySelectorAll(".heading");
    var wrapper = document.querySelector("table .outer");
    
    var newBox = document.createElement('Table');
    newBox.style.float = "right";
    newBox.style.marginTop = "10em";
    newBox.style.marginLeft = "0.5em";
    wrapper.parentNode.insertBefore(newBox, wrapper.nextSibling);
    
    newBox.parentNode.vAlign="top";
    
    for (i=0; i < headings.length; i++) {
            for (var h in toMove) {
                    if (headings[i].textContent.indexOf(toMove[h]) == 0) {
                            var row = headings[i].parentNode;
                            cloneItem(row, newBox);
                            row.innerHTML = '';
                    }
            }
    }
} // end iframe check


function cloneItem(item, target) {
   if (!item || !target) return;
  
   // clone the div
  item2 = item.cloneNode(true);

  // insert clone
  target.insertBefore(item2, target.nextSibling);
}
