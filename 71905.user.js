// ==UserScript==
// @name           LibraryThing Named Styles
// @namespace      http://userscripts.org/users/brightcopy
// @description    Allows for the text appearing on the style buttons (A, B, C, D, E) and the popup hint to be changed.
// @include        http://*.librarything.tld/editstyles.php
// @include        http://*.librarything.tld/catalog_bottom.php*
// ==/UserScript==

function getByXPath(xpath, contextNode) {
  return document.evaluate(xpath, contextNode || document.body, null, 
      XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function addEvent(node, eventType, callback, useCapture) {
  if (node.addEventListener) {
    node.addEventListener(eventType, callback, useCapture);
    return true;
  }
  else if (node.attachEvent)
    return node.attachEvent('on' + eventType, callback);
  else
    node['on' + eventType] = callback;
}

var editStylePat = '//div[img[@src="/pics/displaystyle_%-on.gif"]]';
var viewStylePat = '//div[@class="ltbtn-body " and string(text())="%"]';
var settingStyleHintPat = 'ltnsStyleHint%';
var settingStyleIconPat = 'ltnsStyleIcon%';

var editsSaved = false;


if (location.pathname == '/editstyles.php')
  editStyles()
else
  viewStyles();

//
/*************************************************************************************/
//

function editStyles() {
  for (var i = 1; i <= 5; i++)
    editStyleObjectAdd(i);
}

function editStyleObjectAdd(styleIndex) {
  var style = String.fromCharCode('A'.charCodeAt(0) + styleIndex - 1);
  
  var settingStyleHint = settingStyleHintPat.replace('%', style);
  var settingStyleIcon = settingStyleIconPat.replace('%', style);

  var div = getByXPath(editStylePat.replace('%', styleIndex));

  if (!div)
    return;
    
  var elem;
  
  elem = document.createElement('input');
  elem.id = settingStyleIcon;
  elem.value = GM_getValue(settingStyleIcon) || '';
  elem.title = 'Enter text for the button icon (empty for the defaults)';
  elem.type = 'text';
  elem.style.width = '75px';
  elem.style.marginLeft = '10px';
  div.appendChild(elem);
  
  elem = document.createElement('input');
  elem.id = settingStyleHint;
  elem.value = GM_getValue(settingStyleHint) || '';
  elem.title = 'Enter text for the popup hint (empty for the defaults)';
  elem.type = 'text';
  elem.style.width = '300px';
  div.appendChild(elem);

  var elems = document.evaluate('//form[@name="prefs"]', document.body, null, 
      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < elems.snapshotLength; i++) {
    var btn = elems.snapshotItem(i);
    addEvent(btn, 'submit', function(e) { 
      try {
        if (!editsSaved) {
          editsSaved = true;
          editStyleSave();
        }                  
      } catch (err) { console.log(err) }  
    }, false);
  }
}

function editStyleSave() {
  for (var i = 1; i <= 5; i++) {
    var style = String.fromCharCode('A'.charCodeAt(0) + i - 1);

    var settingStyleHint = settingStyleHintPat.replace('%', style);
    var settingStyleIcon = settingStyleIconPat.replace('%', style);
    
    editStyleSaveValue(settingStyleHint);
    editStyleSaveValue(settingStyleIcon);     
  }
}

function editStyleSaveValue(id) {
  var elem = document.getElementById(id);
  if (!elem)
    return;
    
  var value = elem.value || '';
  if (value == '')
    GM_deleteValue(id)
  else
    GM_setValue(id, value);
}

//
/*************************************************************************************/
//

function viewStyles(s) {
  for (var i = 1; i <= 5; i++)
    viewStyleChange(i);
}

function viewStyleChange(styleIndex) {
  var style = String.fromCharCode('A'.charCodeAt(0) + styleIndex - 1);
  var settingStyleHint = settingStyleHintPat.replace('%', style);
  var settingStyleIcon = settingStyleIconPat.replace('%', style);

  var div = getByXPath(viewStylePat.replace('%', style));
  if (!div)
    return;
    
  var value;
  
  value = GM_getValue(settingStyleIcon, '');
  
  if (value != '') {
    if (div.textContent)
      div.textContent = value
    else
      div.innerText = value;
  }
  
  value = GM_getValue(settingStyleHint, '');
  if (value != '')
    try {
      div.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('title', value);
    } catch (err) {
      console.log(err);
    }
}  
