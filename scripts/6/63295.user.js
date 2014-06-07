// ==UserScript==
// @name           Brizzly Expander
// @description    Allows you to expand/collapse part of the Brizzly interface to take advantage of more screen real estate
// @version        Release 5
// @author         Brian Hartvigsen
// @namespace      brizzly-expander-no-an-email@brianandjenny.com
// @include        http://brizzly.com/*
// @include        http://*.brizzly.com/*
// @include        https://brizzly.com/*
// @include        https://*.brizzly.com/*
// ==/UserScript==

/* Changelog
 Release 5:
  - Updating to draw menu item in the correct spot
 Release 4:
  - Just updating the @include statements for https
 Release 3:
  - Will remember collapsed sections across sessions and reloads
    This should work 100% of the time on Firefox w/ Greasemonkey. YMMV w/ Chrome
    though I have attempted to make it work with beta and .266.0 developer build
 Release 2:
  - Will now properly collapse left side when using "Make Brizzly.com Look Like Twitter" userstyle script
  - Inject help text into the dialog
  - No longer collpases on curly brackets or pipe character
 Release 1:
  - Initial release
*/
function $(e) { return document.getElementById(e); }

// @copyright      2009, James Campos
// @license        cc-by-3.0; http://creativecommons.org/licenses/by/3.0/

if ((typeof GM_getValue == 'undefined') || (GM_getValue('a', 'b') == undefined)) {
  if (typeof GM_log == 'undefined') GM_log = function(msg) { console.log(msg) };
  
  GM_setValue = function(name, value) {
    value = (typeof value)[0] + value;
    localStorage.setItem(name, value);
  }

  GM_getValue = function(name, defaultValue) {
    var value = localStorage.getItem(name);
    if (!value)
      return defaultValue;
    var type = value[0];
    value = value.substring(1);
    switch (type) {
      case 'b':
        return value == 'true';
      case 'n':
        return Number(value);
      default:
        return value;
    }
  }
}

(function() {
$('main-timeline').style.maxWidth = 'inherit';
$('main-timeline').style.width='inherit';

var collapsed = {left: false, right: false};
collapsed.left = (GM_getValue('brizzlyexpander.left') == 'undefined' ? false : GM_getValue('brizzlyexpander.left'));
collapsed.right = (GM_getValue('brizzlyexpander.right') == 'undefined' ? false : GM_getValue('brizzlyexpander.right'));

if ($('brizzlyexpander') == null) {
  var collapser = document.createElement('span');
  collapser.id = 'brizzlyexpander';
  collapser.className = 'datum';
  $('auth').insertBefore(collapser, $('auth').lastChild.previousSibling);
}
genCollapser();

if (collapsed.left) collapseLeft(true);
if (collapsed.right) collapseRight(true);

function genCollapser() {
  $('brizzlyexpander').innerHTML = '';
  var link = document.createElement('a');
  link.setAttribute('href', '#');
  link.setAttribute('onclick', 'return false');
  link.addEventListener('click', collapseLeft, true);
  link.innerHTML = '&#9703;';
  $('brizzlyexpander').appendChild(link);
  
  var link = document.createElement('a');
  link.setAttribute('href', '#');
  link.setAttribute('onclick', 'return false');
  link.addEventListener('click', collapseMe, true);
  if (collapsed.left && collapsed.right)
    link.innerHTML = '&#9656;&#9666;';
  else
    link.innerHTML = '&#9666;&#9656;';
  $('brizzlyexpander').appendChild(link);
  
  var link = document.createElement('a');
  link.setAttribute('href', '#');
  link.setAttribute('onclick', 'return false');
  link.addEventListener('click', collapseRight, true);
  link.innerHTML = '&#9704;';
  $('brizzlyexpander').appendChild(link);
}

function collapse(elem, direction, forced) {
  var check = (typeof(forced)!="boolean");
  
  if (check) collapsed[direction] = !collapsed[direction];
  else collapsed[direction] = forced;
  
  if (collapsed[direction]) {
    elem.style.display='none';
    $('main-timeline').style.setProperty('margin-'+direction, '0px', 'important');
  } else {
    elem.style.display='';
    $('main-timeline').style.setProperty('margin-'+direction, '', '');
  }
  
  GM_setValue('brizzlyexpander.' + direction, collapsed[direction]);
  if (check) genCollapser();
}

function collapseLeft(forced) {
  collapse($('nav'), 'left', forced);
}

function collapseRight(forced) {
  collapse($('sidebar'), 'right', forced);
}
function collapseMe() {
  if (!collapsed.left || !collapsed.right) {
    collapseLeft(true);
    collapseRight(true);
  } else {
    collapseLeft(false);
    collapseRight(false);
  }
  
  genCollapser();
}

function keyUp(e) {
  var event = e || window.event;
 
  if (event.target && event.target.nodeName) {
    var targetNodeName = event.target.nodeName.toLowerCase();
    if (targetNodeName == "textarea" ||
       (targetNodeName == "input" && event.target.type &&
       event.target.type.toLowerCase() == "text")) {
      return false;
    }
  }
  
  if (event.which == 91) collapseLeft();
  else if (event.which == 93) collapseRight();
  else if (event.which == 92) collapseMe();
}

function commandKeyHelp(key, desc) {
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.setAttribute('class', 'key');
  td.innerHTML = key + ':';
  tr.appendChild(td);

  var td = document.createElement('td');
  td.setAttribute('class', 'desc');
  td.innerHTML = desc;
  tr.appendChild(td);
  
  return tr;
}
window.addEventListener("keypress", keyUp, false);

commandHelpXPath="//div[contains(@class, 'key-commands-help')]/div[contains(@class, 'ui-widget-content')]/table";

function injectCommandHelp(e) {
  var helpkeys = document.evaluate(commandHelpXPath, e.target, null, 9, null).singleNodeValue;
  if (helpkeys) {
    document.removeEventListener("DOMNodeInserted", injectCommandHelp, false);
    document.addEventListener("DOMNodeRemoved", watchForRemoveHelp, false);
    
    helpkeys.appendChild(commandKeyHelp('[', 'collapse/expand navbar'));
    helpkeys.appendChild(commandKeyHelp(']', 'collapse/expand sidebar'));
    helpkeys.appendChild(commandKeyHelp('\\', 'collapse/expand both sides'));
  }
}

function watchForRemoveHelp(e) {
  var helpkeys = document.evaluate(commandHelpXPath, e.target, null, 9, null).singleNodeValue;
  if (helpkeys) return;
  
  document.addEventListener("DOMNodeInserted", injectCommandHelp, false);
  document.removeEventListener("DOMNodeRemoved", watchForRemoveHelp, false);
}

document.addEventListener("DOMNodeInserted", injectCommandHelp, false);
})();