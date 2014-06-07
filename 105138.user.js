// ==UserScript==
// @name          GcLogFilterPlus
// @namespace     http://gm.spbgh.de/
// @description   Filters logs by type in cache listings on geocaching.com
// @author        gm(a)spbgh_de
// @version       1.2
// @licence       CC BY-NC-SA 3.0 http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include       http*://www.geocaching.com/seek/cache_details.aspx?*
// ==/UserScript==

var SCRIPT_NAME = 'GcLogFilterPlus';
var SCRIPT_VERSION = '1.2';
var PATH_IMG_ACTIVE = '/images/icons/';
var PATH_IMG_INACTIVE = 'http://gm.spbgh.de/gclogfilterplus/';

var allImages;
var nameDb, activeDb, fileDb;
var maxSeenLogs = 0;

function loadEvent() {
  init(false);
}

function reloadEvent() {
  init(true);
}

function init(reload) {
  if (getMarker()) return;

  var logTypeCount = document.evaluate("count(//span[@id='ctl00_ContentBody_lblFindCounts']/p/img)",
    document, null, XPathResult.ANY_TYPE, null).numberValue;
  if (logTypeCount == 0) return;

  createDb();
  registerEvents();
  setMarker();
  placeResetLink(false);

  if (!reload) {
    allImages[0].parentNode.parentNode.addEventListener('DOMSubtreeModified', reloadEvent, false);
  }
  else {
    filter();
  }
}

function placeResetLink(show) {
  var link = document.createElement('a');
  link.innerHTML = 'Reset';
  link.setAttribute('title', SCRIPT_NAME+' '+SCRIPT_VERSION);
  link.setAttribute('id', SCRIPT_NAME+'-reset');
  link.addEventListener('click', resetFilterLink(), false);
  document.getElementById(SCRIPT_NAME).appendChild(link);

  if (!show) showResetLink(false);
}

function showResetLink(show) {
  var style = show ? '' : 'display: none';
  document.getElementById(SCRIPT_NAME+'-reset').setAttribute('style', style);
}

function setMarker() {
  var span = document.getElementById('ctl00_ContentBody_lblFindCounts');
  span.getElementsByTagName('p')[0].setAttribute('id', SCRIPT_NAME);
}

function getMarker() {
   return (document.getElementById('ctl00_ContentBody_lblFindCounts').firstChild.getAttribute('id') == SCRIPT_NAME);
}

function createDb() {
  var logTypes = document.evaluate("//span[@id='ctl00_ContentBody_lblFindCounts']/p/img",
    document, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  allImages = new Array();
  nameDb = new Array();
  activeDb = new Array();
  fileDb = new Array();

  var actualImage;
  while (actualImage = logTypes.iterateNext()) {
    allImages.push(actualImage);
    nameDb.push(actualImage.getAttribute('alt'));
    activeDb.push(true);
    fileDb.push(trimPath(actualImage.getAttribute('src')));
  }
}

function trimPath(path) {
  var tmp = path.split('/');
  return tmp[tmp.length-1];
}

function registerEvents() {
  for (var i=0; i<allImages.length; i++) {
    allImages[i].addEventListener('click', toggleType(i), false);
    allImages[i].addEventListener('dblclick', exclusiveType(i), false);
  }
}

// Logs dieses Typs ein-/ausblenden
function toggleType(i) {
  return function() {
    activeDb[i] = !(activeDb[i]);
    filter();
  }
}

// Ausschliesslich Logs dieses Typs anzeigen
function exclusiveType(i) {
  return function() {
    resetActiveDb(false);
    activeDb[i] = true;
    filter();
  }
}

// Alle Logtypen anzeigen (Reset-Link)
function resetFilterLink() {
  return function() {
    resetActiveDb(true);
    filter();
  }
}

// Alle Logtypen anzeigen (Symbol vor Log)
function resetFilterLog(i) {
  return function() {
    if (!isFilterActive()) return;
    resetActiveDb(true);
    filter();
    document.getElementById(SCRIPT_NAME+'-log-'+i).scrollIntoView(true);
  }
}

function resetActiveDb(state) {
  for (var i=0; i<activeDb.length; i++) {
    activeDb[i] = state;
  }
}

function filter() {
  // Filtersymbole aktualisieren
  for (var i=0; i<activeDb.length; i++) {
    allImages[i].setAttribute('src', getSrc(i, activeDb[i]));
  }
  showResetLink(isFilterActive());

  // Filterung
  var logs = document.evaluate("//div[@class='HalfLeft LogType']/strong/img",
  document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  var alt = false;
  var placeListeners = maxSeenLogs < logs.snapshotLength;
  for (var i=0; i<logs.snapshotLength; i++) {
    if (placeListeners) {
      logs.snapshotItem(i).setAttribute('id', SCRIPT_NAME+'-log-'+i);
      logs.snapshotItem(i).addEventListener('dblclick', resetFilterLog(i), false);
    }
    maxSeenLogs = logs.snapshotLength;

    if (isActive(logs.snapshotItem(i).title)) {
      logs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', '');

      // Alternierende Faerbung
      var cssClass = alt ? 'AlternatingRow' : 'Nothing';
      logs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.setAttribute('class', cssClass);
      alt = !alt;
    }
    else {
      logs.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode.setAttribute('style', 'display: none');
    }
  }
}

function getSrc(picId, active) {
  return (active ? PATH_IMG_ACTIVE+getFileName(picId) : PATH_IMG_INACTIVE+getFileName(picId));
}

function getFileName(i) {
  return fileDb[i];
}

function isActive(name) {
  for (var i=0; i<nameDb.length; i++) {
    if (nameDb[i] == name) return activeDb[i];
  }
  return false;
}

function isFilterActive() {
  var maxTypes = activeDb.length;
  var activeCount = 0;
  for (var i=0; i<maxTypes; i++) {
    if (activeDb[i]) activeCount++;
  }
  return (activeCount < maxTypes);
}

window.addEventListener('load', loadEvent, false);