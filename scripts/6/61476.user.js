// ==UserScript==
// @name           Twitter Pin
// @namespace      http://www.paopao.name
// @description    Pin the latest tweet you have readed as another color
// @version        0.3
// @author         paopao
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function(){
  var bgColor = "#CCCCFF";
  var current_li = false, liListener;
  //insert CSS rules
  var cssRules = '#pinned:link,#pinned:visited {position:fixed; top:50%; right:0px; background:white; font-weight:bold; text-decoration:none; text-shadow:2px 2px 2px #99CCFF; -moz-border-radius-topleft:10px; -webkit-border-top-left-radius:10px; -moz-border-radius-bottomleft:10px; -webkit-border-bottom-left-radius:10px; padding:10px;}' + '#pinned:hover,#pinned:active {background:' + bgColor + '; color:white; text-shadow:2px 2px 2px #000;}';

  var headElement = document.getElementsByTagName("head")[0];
  var styleElements = headElement.getElementsByTagName("style");
  if(styleElements.length == 0) {
    var tempStyleElement = document.createElement('style');
    tempStyleElement.setAttribute("type", "text/css");
    headElement.appendChild(tempStyleElement);
  }
  var styleElement = styleElements[0];
  var media = styleElement.getAttribute("media");
  if(media != null && !/screen/.test(media.toLowerCase()) ){
    styleElement.setAttribute("media","screen");
  }
  styleElement.appendChild(document.createTextNode(cssRules));
    
  //latest readed tweet link
  var pinned_li = document.createElement('a');
  pinned_li.id = 'pinned';
  pinned_li.innerHTML = 'Pinned Tweet';
  
  document.body.appendChild(pinned_li);
  //mark the pinned tweet backgroundcolor when click the pinned link
  pinned_li.addEventListener("click", function(){
    if(this.href.indexOf("#") != -1) {
      var tmp_id = this.href.substring(this.href.indexOf("#") + 1);
      var tmp_li = document.getElementById(tmp_id);
      if(tmp_li) tmp_li.style.backgroundColor = bgColor;
    }
    return true;
  }, true);
  
  //bind event listener to timeline's parent node
  var timeline = document.getElementById('timeline');
  if(timeline) {
    timeline.parentNode.addEventListener("click",function (e) {
      if(e.target.tagName == "LI" || e.target.tagName == "SPAN" || e.target.tagName == "DIV") {
        var tmp_id = pinned_li.href.substring(pinned_li.href.indexOf("#") + 1);
        current_li = document.getElementById(tmp_id) || current_li;
        if(current_li.style) unsetCurrentLi();          
        current_li = getParentLi(e.target);
        if(current_li) setCurrentLi(current_li);
      }
    },false);
  }
   
  //set current li's background color and event
  function setCurrentLi(ele) {
    current_li = ele;
    var next_li = current_li.nextSibling || current_li.previousSibling;
    current_li.style.backgroundColor = bgColor;
    pinned_li.href = "#" + current_li.id;
    current_li.addEventListener("DOMNodeRemoved",liListener = function(e) {
      //var d = new Date();
      //console.log(e.target.id + " removed at " + d.getTime());
      if(e.target.tagName != "LI") return false;
      e.target.style.backgroundColor = "";
      if(next_li) setCurrentLi(next_li);
    },true);
  }
  
  //unset current li's background color and event
  function unsetCurrentLi() {
    if(!current_li) return true;
    current_li.style.backgroundColor = "";
    current_li.removeEventListener("DOMNodeRemoved", liListener, true);
  }
  
  //retreiving for parent li
  function getParentLi(ele) {
    if(ele.tagName == "LI")  return ele;
    while(ele.tagName != "LI") {
      ele = ele.parentNode;
      if(ele == document)  return false;
    }
    return ele;
  }
})();
