// ==UserScript==
// @name           TwitThis_zh_CN
// @namespace      http://twitter.com
// @author         Ziru
// @description    TwitThis (Simplified-Chinese version)
// @include        http://twitthis.com/twit?url=*
// ==/UserScript==

// helper function to rewrite the option values
function rewriteOption(optElem, newValue) {
  optElem.value = newValue;
  optElem.replaceChild(document.createTextNode(newValue), optElem.childNodes[0]);
}

function rewriteInputElem(inputElem, url) {
  if (/^http:\/\/www.yobo.com/.exec(url)) {
    var match = /^(.*?) < .* < (.*? - YOBO) .*?$/.exec(inputElem.value);
    if (match) {
      // alert('input = ' + inputElem.value + ', match = ' + match[1]);
      inputElem.value = match[1] + ' by ' + match[2];
    }
  }
}

function findOptionIndex(selectElem, value) {
  var optElems = selectElem.getElementsByTagName('option');
  for (var idx = 0; idx < optElems.length; idx++) {
    if (optElems[idx].value == value)
      return idx;
  }
  return -1;
}

function rewriteDefaultPrependOptions(prependElem, url) {
  // alert('here');
  if (/^http:\/\/www.yobo.com/.exec(url)) {
    // alert('rewrite teh selected index' + findOptionIndex(prependElem, '[在听] '));
    prependElem.selectedIndex = findOptionIndex(prependElem, '[在听] ');
  } else if (/^http:\/\/.*video*/.exec(url) || 
             /^http:\/\/.*youtube*/.exec(url) || 
             /^http:\/\/.*tudou*/.exec(url) ||
             /^http:\/\/.*youku*/.exec(url)) {
    prependElem.selectedIndex = findOptionIndex(prependElem, '[在看] ');
  }
}

function findElementByName(elems, name) {
  for each (var elem in elems) {
    if (elem.getAttribute('name') == name)
      return elem;
  }
  return null;
}

var url = findElementByName(document.getElementsByTagName('input'), 'url').value;

// find the select element named 'prepend'
var prependElem;
for each (var selectElem in document.getElementsByTagName('select')) {
  if (selectElem.getAttribute('name') == 'prepend') {
    prependElem = selectElem;
    break;
  }
}
if (!prependElem) {
  // alert('Oops! TwitThis changes their page layout!');
  return;
}

// replace the option values with the translations here
for each (var optElem in prependElem.getElementsByTagName('option')) {
  switch (optElem.value) {
    case 'Reading:':
      rewriteOption(optElem, '[在读] ');
      break;
    case 'Looking at:':
      rewriteOption(optElem, '[在看] ');
      break;
    case 'Listening to:':
      rewriteOption(optElem, '[在听] ');
      break;
    case 'Laughing at:':
      rewriteOption(optElem, '[在笑] ');
      break;
    case 'Responding to:':
      rewriteOption(optElem, '[在回] ');
      break;
    case 'Waiting for:':
      rewriteOption(optElem, '[在等] ');
      break;
    case 'Looking forward to:':
      rewriteOption(optElem, '[在期待] ');
      break;
    case 'At:':
      rewriteOption(optElem, '[在] ');
      break;
    // case '@:':
  }
}

// adjust the display width of the title input box
var inputElem = prependElem.nextSibling;
while (inputElem.nodeType != 1)
  inputElem = inputElem.nextSibling;
if (inputElem && inputElem.tagName == 'INPUT') {
  inputElem.setAttribute('style', 'width: 350px');
  rewriteInputElem(inputElem, url);
}

rewriteDefaultPrependOptions(prependElem, url);
