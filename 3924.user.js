// Celsius / Fahrenheit Temperature Conversion
// version 0.2 BETA!
// 24-04-2006
// Copyright (c) 2006, Marc Powell <marc DOT powell AT yahoo DOT com>
// 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// For the lazy American travelers or anyone else really that can't 
// seem to learn the temperature conversions when they're looking up 
// the weather forecast or a recipe for dinner.  This script makes it 
// easy by automagically adding the equivalent temperature conversion, 
// whether that be Celsius or Fahrenheit, in parenthesis on any page 
// you are browsing.
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Temperature Conversion", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Temperature Conversion
// @namespace     http://shaddow.f2o.org/greasemonkey/
// @description   Automagically appends equivalent Celsius or Fahrenheit temperature in parenthesis
// @include       *
// @exclude       http://*.allrecipes.com/*
// ==/UserScript==
//
// Version history:
//  Version 0.2:
//   - Fix bug: character encoding problem with degree symbol
//   - Fix bug: support for negative and decimal temperatures
//   - Fix bug: support for long lines containing multiple temperatures
//
//  Version 0.1:
//   - Initial version!

var debug = false;
if(debug) GM_log("starting tempconv");

// Append style to page
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// split text into two nodes (if needed)
function splitNodes(offset,regexMatch,currentNode,convNode)
{
  // add span node with conversion
  currentNode.parentNode.insertBefore(convNode,currentNode.nextSibling);

  // split line of text
  var text = thisElement.textContent;
  var textLen = regexMatch.index+regexMatch[0].length-offset;
  if(debug) GM_log("len:  ["+textLen+"]<["+text.length+"] ?");
  if(textLen<text.length)
  {
    var text1 = text.substring(0,textLen);
    var text2 = text.substring(textLen);

    if(debug) GM_log("index: "+regexMatch.index);

    if(text2.length>0)
    {
      if(debug) GM_log("split: ["+text1+"]["+text2+"]");
      currentNode.textContent = text1;
      
      var newTextNode = document.createTextNode(text2);
      currentNode.parentNode.insertBefore(newTextNode,convNode.nextSibling);
      currentNode = newTextNode;
    }
  }
  
  return currentNode;
}

// Extract type
function getType(value) {

  if(debug) GM_log("type: ["+value+"]");

  // Celsius
  if( value.toUpperCase()=="C" ||
      value.toUpperCase()=="CELSIUS" ||
      value.toUpperCase()=="CENTIGRADE" ||
      value=="&#8451" ||
      value=="\u2103" )
    return "C";

  // Fahrenheit
  if( value.toUpperCase()=="F" ||
      value.toUpperCase()=="FAHRENHEIT" ||
      value=="&#8457" ||
      value=="\u2109" )
    return "F";
  
  // unknown
  return "?";
}

// Celsius to Fahrenheit
function getTf(Tc) {
  var Tf = (9/5)*Tc+32;
  return Tf.toFixed(1);
}

// Fahrenheit to Celsius
function getTc(Tf) {
  var Tc = (5/9)*(Tf-32);
  return Tc.toFixed(1);
}

addGlobalStyle('.Tfconvert { color:#003366; font-size: smaller; font-family:verdana,sans-serif }');
addGlobalStyle('.Tcconvert { color:#990000; font-size: smaller; font-family:verdana,sans-serif }');

var notInTags=['a', 'head', 'noscript', 'option', 'script', 'style', 'title', 'textarea'];
var allelements = document.evaluate(
    "//text()[not(ancestor::"+notInTags.join(') and not(ancestor::')+")]",
    document, 
    null, 
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
    null);

for (var i = 0; i < allelements.snapshotLength; i++) {
    var thisElement = allelements.snapshotItem(i);
    var text = thisElement.textContent;
    var offset=0;
    
    // Show Conversion
    var tempRE=/(-?\d+(\.\d+)?)(\s*)((\u2070|\u2218|\u02DA|\u00B0|\u00BA|&#176;|&deg;|deg|degree|degrees)(\s*)(Celsius|Centigrade|Fahrenheit|C|F)|(&#8451;|&#8457;|\u2103|\u2109))/gi;
    var m;
    while (m=tempRE.exec(text)) {
    
      if(debug) GM_log("text: ["+text+"]");
      if(debug) GM_log("match: ["+m[0]+"] -- x"+m.length);

      // extract number and type parts
      var value = m[1];
      var type;
      if(m[7]==undefined) 
        type = getType(m[4]);
      else
        type = getType(m[7]);
      if(debug) GM_log("value: ["+value+type+"]");
      if(type=="?") continue;

      // convert values
      var Tc = 0;
      var Tf = 0;
      if(type=="F")
      {
        Tf = value;
        Tc = getTc(Tf);
        if(debug) GM_log(Tf+"F -> "+Tc+"C");
        
        // append conversion element
        var span=document.createElement('span');
        span.innerHTML = "&nbsp;("+Tc+" &deg;C)";
        span.className = "Tcconvert";
        thisElement = splitNodes(offset,m,thisElement,span);
      }
      else
      {
        Tc = value;
        Tf = getTf(Tc);
        if(debug) GM_log(Tc+"C -> "+Tf+"F");
        
        // append conversion element
        var span=document.createElement('span');
        span.innerHTML = "&nbsp;("+Tf+" &deg;F)";
        span.className = "Tfconvert";
        thisElement = splitNodes(offset,m,thisElement,span);
      }
      offset = text.length - thisElement.textContent.length;
  }
}