// ==UserScript==
// @name           Napster - Add All Tracks to Now Playing
// @namespace      Customisations
// @include        *.napster.com/*
// ==/UserScript==

function arrayContains(arr, element) {
  for (var i = 0; i < arr.length; i++)
    if (arr[i] == element)
      return true;
  return false;
}

waitWhileNull = function() {
  var elem;
  var selector = "#artistHeaderListing > UL";
  var fn = function() {
    var addAllButton = document.createElement("li");
    addAllButton.setAttribute("style", "float: right");
    var addAllLink = document.createElement("a");
    addAllLink.addEventListener("click", onButtonClick, false); 
    addAllLink.href = "javascript:";
    addAllLink.appendChild(document.createTextNode("Add All"));
    addAllButton.appendChild(addAllLink);
    elem.appendChild(addAllButton);
  }
  var timeout = 500;
  elem = document.querySelector(selector)
  if(elem == null) {
    setTimeout(waitWhileNull, 500);
  } else {
    fn();
  }
}

queueItems = function(skipFirst) {
  var elems = document.querySelectorAll("#listReturn > TBODY tr");
  var addedItems = new Array();

  for(var i = (skipFirst != null) ? 1 : 0; i < elems.length; i++) {
    if(elems[i].id != null) {
      var track = elems[i].querySelector(".noWrap").innerHTML + "|" + elems[i].querySelector("TD:last-child").innerHTML;
      if(!arrayContains(addedItems, track)) {
        addedItems[addedItems.length] = track;
        unsafeWindow.Queue(elems[i].id.substr(1),"0");
      }
    }
  }
}

onButtonClick = function() {
  if(unsafeWindow.PlayerObjectReference == null || unsafeWindow.PlayerObjectReference.closed) {
    unsafeWindow.Queue(document.querySelector("#listReturn > TBODY tr").id.substr(1),"0");
    setTimeout(queueItems, 1000);
  } else {
    queueItems(true);
  }
}

waitWhileNull();