// ==UserScript==
// @name           Google Reader - show original in tab
// @namespace      azmaan
// @description    Shows original Reader item in new tab
// @include        http://www.google.com/reader/*
// @include        http://reader.google.com/*
// ==/UserScript==
// Original can be found in http://userscripts.org/scripts/show/2197

function GRT_key(event) {
  if (String.fromCharCode(event.which)=="h" && !event.ctrlKey) {

    var current_element = document.getElementById("current-entry");
    var current_title = current_element.getElementsByClassName("entry-source-title")[0].innerHTML;
    if(current_title === "Hacker News"){
      var comment_link = current_element.getElementsByClassName("item-body")[0].firstChild.firstChild.href;
      GM_openInTab(comment_link);
    }else{
       var link = current_element.getElementsByClassName("entry-title-link")[0].href;
       GM_openInTab(link);
    }
    try {
      event.preventDefault();
    } catch (e) {
    }
    return false;
  }
  return true;
}

document.addEventListener("keypress", GRT_key, true);