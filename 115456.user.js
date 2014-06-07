// ==UserScript==
// @name Pinboard - Tag Cloud Sort
// @description Sort the tag cloud by which tags are used most.
// @include http://pinboard.in/*
// @include http://www.pinboard.in/*
// @include https://pinboard.in/*
// @include https://www.pinboard.in/*
// ==/UserScript==

var defaultFreq = true;

var main_node = document.getElementById("tag_cloud");
var tags = [];
if (main_node) {
  // get all the tags
  var tagAnchors = document.evaluate("./div/table/tbody/tr/td/a[@class = 'tag']", 
                                  main_node, 
                                  null,
                                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                  null);
                                  
  if (tagAnchors.snapshotLength == 0) {                             
    tagAnchors = document.evaluate("./a[@class = 'tag']", 
                                    main_node, 
                                    null,
                                    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                                    null);  
  }

  // gather up all the tags
  var tagsParent; 
  var tagsSibling;
  var tagA;
  for (var i = 0; i < tagAnchors.snapshotLength; i++) {
    tagA = tagAnchors.snapshotItem(i);
    
    var fontSize = tagA.style.fontSize;
    var opacity = tagA.style.opacity;
    var size = 0;
    var op = 0;
    if (fontSize) {
      var fontRegex = new RegExp("(\\d+\.?\\d*)");
      var fontArr = fontRegex.exec(fontSize);
      if (fontArr) {
        fontSize = fontArr[1];
        size = parseFloat(fontSize);
        if (isNaN(size)) {
          size = 0;
        }
      }
    }
    if (opacity) {
      op = parseFloat(opacity);
      if (isNaN(op)) {
        op = 0;
      }
      op = op * 100;
    }
    var total = op + size;
    
    // is this tag in the tag cloud or the tag list?
    tagA = getTagContainer(tagA);
    
    var popt = new PopTag(tagA, i, total);
    tags.push(popt);
  }
  
  if (tagAnchors.snapshotLength > 0) {
    tagsParent = tagA.parentNode;
    tagsSibling = tagA.nextSibling;
    
    // add the sorting options div just after the tag cloud header div
    var insertBefore = main_node.firstChild;
    var cloudHeader =  document.getElementById("tag_cloud_header");
    if (cloudHeader && cloudHeader.nextSibling) {
      insertBefore = cloudHeader.nextSibling;
    }
      
    var sortTagDiv = document.createElement("div");
    sortTagDiv.id = "gm_sortTagDiv";
    main_node.insertBefore(sortTagDiv, insertBefore);
    
    // add the sort links	
    alphaSort = createSortLink("alpha", postSortDefault, sortTagDiv, tagsParent, tagsSibling, tagAnchors);
    sortTagDiv.appendChild(document.createTextNode(" | "));
    freqSort = createSortLink("freq", postSortFreq, sortTagDiv, tagsParent, tagsSibling, tagAnchors);
    
    var evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    if (defaultFreq) {
      freqSort.dispatchEvent(evt);
    }
    else {
      alphaSort.dispatchEvent(evt);
    }
  }
}

function createSortLink(linkText, sortFunction, parentDiv, tagsParent, tagsSibling, tagAnchors) {
	var a = document.createElement("a");
	a.innerHTML = linkText;
	a.className = "gm_sortTagLink";
	a.href = "";
	parentDiv.appendChild(a);
	
	a.addEventListener("click", function(event) {
		event.stopPropagation();		
		event.preventDefault();
    
		// first remove all the tags from the DOM
		for (var i = 0; i < tagAnchors.snapshotLength; i++) {
			var tag = getTagContainer(tagAnchors.snapshotItem(i));
			tag.parentNode.removeChild(tag);
		}

    // sort the tags
    tags.sort(sortFunction);
    
    // add all the tags back
    for (var i = 0; i < tags.length; i++) {
      if (tagsSibling) {
        tagsParent.insertBefore(tags[i].tag, tagsSibling);
        tagsParent.insertBefore(document.createTextNode(" "), tagsSibling);
      }
      else {
        tagsParent.appendChild(tags[i].tag);
        tagsParent.appendChild(document.createTextNode(" "));
      }
    }
		
		// highlight this link to indicate that it is on, deselect the other links
		var sortLinks = document.evaluate("//a[contains(@class, 'gm_sortTagLink')]", main_node, null,
                            						XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                            						null);
		for (var i = 0; i < sortLinks.snapshotLength; i++){			
			sortLinks.snapshotItem(i).className = "gm_sortTagLink";
		}
		this.className = this.className + " gm_sortTagLinkOn";
	}, false);
	
	return a;
}

function getTagContainer(tagNode) {
  var tag = tagNode;
  if (tag.parentNode.nodeName == "TD") {
    if (tag.parentNode.parentNode.nodeName == "TR") {
      tag = tag.parentNode.parentNode;
    }
  }
  return tag;
}

function PopTag(t, i, f) {
	this.tag = t;
	this.index = i;
	this.freq = f;
}
function postSortDefault(a, b) {
	return a.index - b.index;
}
function postSortFreq(a, b) {
	return b.freq - a.freq;
}

GM_addStyle(
  'div#gm_sortTagDiv { margin: 7px 0; }' +
	'div#gm_sortTagDiv a.gm_sortTagLinkOn { color: black; font-weight: bold; }' +
	'div#gm_sortTagDiv a { color: #999; }'
);