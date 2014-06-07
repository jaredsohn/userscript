// ==UserScript==
// @name        Chatrandom Optimizer
// @namespace   http://marvinate.wordpress.com
// @description Chatrandom Optimizer
// @include     http*://*.chatrandom.com/*
// @include     http*://chatrandom.com/*
// @grant       GM_addStyle
// @version     1.1
// ==/UserScript==
//
// Version 1.1 [2013-05-25]
// [*] Remove advertisments and other useless stuff
//
// Version 1.1.1 [2013-07-23]
// [*] Additional adverts removed

document.optimizerVersion = "1.1.1";

// =============================================================================
// ===  CSS Styles  ============================================================
// =============================================================================

GM_addStyle(".share_logo { position: relative; } ");
GM_addStyle(".marvinateSelf { font-size: 14px; position: absolute; right: 0px; top: -4px; border: 1px solid #60AAE0; background-color: #ffffff; padding: 5px; } ");
GM_addStyle(".marvinateSelfTitle { font-size: 12px; font-weight: bold; } ");


// =============================================================================
// ===  Self identification and header  ========================================
// =============================================================================

var logoDiv = document.getElementById('logo');
if(logoDiv != null) {

  var titleLink = MV_createElement("div", { "class": "marvinateSelfTitle" });
  titleLink.appendChild(document.createTextNode("Optimizations by marvin - Version " + document.optimizerVersion + " "));

  var authorDiv = MV_createElement("div", { "class": "marvinateSelf" });
  authorDiv.appendChild(titleLink);
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 3px 0px 0px 0px;"}, "<small><a style=\"color: #000000;\" target=\"_blank\" href=\"http://marvinate.wordpress.com\">http://marvinate.wordpress.com</a></small>"));
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 10px 0px 0px 0px;"}, "<small><i>\"I think,\" Marvin murmured at last, from deep within his corroding rattling thorax, \"I feel good about it.\"</i></small>"));
  logoDiv.parentElement.appendChild(authorDiv);

}


// =============================================================================
// ===  Remove advertisments and other useless stuff  ==========================
// =============================================================================

MV_removeElementsByPath("//a[@class='classname']");
MV_removeElementsByPath("//a[@class='classname2']");
MV_removeElementsByPath("//a[@class='classname c_banner']");
MV_removeElementsByPath("//div[@class='share']");
MV_removeElementsByPath("//div[@class='main_text']");
MV_removeElementsByPath("//div[@class='footer_text']/center[1]");


// =============================================================================
// ===  Chat enhancements  =====================================================
// =============================================================================

// Widen the area in which the plugin is being displayed
window.addEventListener('load', function() {
  var chatAppObject = document.getElementById('chat-app');
  if(chatAppObject != null) {
    chatAppObject.height = "840";
  }
});


// =============================================================================
// ===  Includes  ==============================================================
// =============================================================================
//
// Include start [domUtil.js]
function MV_removeElementsByPath(pPath) {
  var pathResult = document.evaluate(pPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(pathResult.snapshotLength > 0) {
    for(var i=0; i < pathResult.snapshotLength; i++) {
      var pathNode = pathResult.snapshotItem(i);
      pathNode.parentNode.removeChild(pathNode);
    }
  }
}

function MV_getElementByPath(pPath, pRoot) {
  var pathResult = document.evaluate(pPath, pRoot == null ? document : pRoot, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  return pathResult.snapshotLength <= 0 ? null : pathResult.snapshotItem(0);
}

function MV_createButton(pAttributes, pClickListener) {
  pAttributes.type = "button";
  var resultElement = MV_createElement("input", pAttributes);
  if(pClickListener != null) {
    resultElement.addEventListener("click", pClickListener, true);
  }
  return resultElement;
}

function MV_createElement(pElementName, pAttributes, pInnerHtml) {
  var resultElement = document.createElement(pElementName);
  for(attributeName in pAttributes) {
    resultElement.setAttribute(attributeName, pAttributes[attributeName]);
  }
  if(pInnerHtml != null) {
    resultElement.innerHTML = pInnerHtml;
  }
  return resultElement;
}
// Include end [domUtil.js]
