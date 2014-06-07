// Chat Size Adjuster v1.0 ï¿½2007 Jason Bunting - http://www.sapientdevelopment.com
// ==UserScript==
// @name           ChatSizeAdjuster
// @namespace      http://sapientdevelopment.com/weewar
// @description    Allows for changing the size of the chat window in a Weewar game.
// @include        http://*weewar.com/game/*
// ==/UserScript==

//////////////////////////////////////////////////////////////////////////////////
// Basic DOM manipulation helpers
function CreateDOMElement(name, attrs, styleList) { 
  var domElement = document.createElement(name);
  for(var prop in attrs) { domElement[prop] = attrs[prop]; }
  SetStyle(domElement, styleList);
  return domElement; 
}
function SetStyle(element, styleList) {
  for(var styleName in styleList) { element.style[styleName] = styleList[styleName]; }
}
function AppendChildren(element /*, list of children*/) {
  for(var i = 1; i < arguments.length; i++) element.appendChild(arguments[i]);
}
//////////////////////////////////////////////////////////////////////////////////
// Functionality for changing chat window size
try {
  var chatSizeSettingKey = ("ChatSize_" + ((/game\/([0-9]*)/g).exec(window.location.href)[1]));
  var chatList = document.getElementById("outputList");
  chatList.style.height = GM_getValue(chatSizeSettingKey, "200px");
  var chatSizeLabel = CreateDOMElement("a", {id:"chatSizeLabel", innerHTML:"Chat Window Size: "}, {fontSize:"0.85em"});
  var increaseSizeLink = CreateDOMElement("a", {id:"increaseSizeLink", href:"#", innerHTML:"+ increase "}, {fontSize:"0.85em", color:"#00BF00", textDecoration:"none"});
  var decreaseSizeLink = CreateDOMElement("a", {id:"decreaseSizeLink", href:"#", innerHTML:"- decrease"}, {fontSize:"0.85em", color:"#BF0000", textDecoration:"none"});
  var chatSizeChanger = CreateDOMElement("div", {title:"Chat Size Adjuster - ï¿½2007 Jason Bunting - http://www.sapientdevelopment.com"}, {backgroundColor:"#EEE", padding:"3px 3px 5px 3px"});
  AppendChildren(chatSizeChanger, chatSizeLabel, increaseSizeLink, decreaseSizeLink);
  chatList.parentNode.insertBefore(chatSizeChanger,chatList);
  increaseSizeLink.addEventListener("click", function(e) {
    chatList.style.height = (+(chatList.style.height.replace("px", "")) + 50) + "px";
    GM_setValue(chatSizeSettingKey, chatList.style.height);
    e.preventDefault();
  }, false);
  decreaseSizeLink.addEventListener("click", function(e) {
    if(+(chatList.style.height.replace("px", "")) > 100) chatList.style.height = (+(chatList.style.height.replace("px", "")) - 50) + "px";
    GM_setValue(chatSizeSettingKey, chatList.style.height);
    e.preventDefault();
  }, false);
} catch(e) {
  // NOTE: "extensions.firebug.showChromeMessages must be set to 
  // true for GM_log messages to show up in the Firebug console"
  GM_log("Script failed!");
  GM_log(e);
}
