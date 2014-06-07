var GMSU_meta_50318 = <><![CDATA[
// ==UserScript==
// @name           ImmonetFilter
// @namespace      http://projects.izzysoft.de/
// @description    Filter out unwanted objects on ImmoNet.DE
// @version        1.0.8
// @include        http://*.immonet.de/*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @require        http://userscripts.org/scripts/source/50018.user.js
// @require        http://userscripts.org/scripts/source/51513.user.js
// @uso:script     50318
// ==/UserScript==
]]></>;

// =======================================[ Translations ]===
var trans = {
 en: {
   'Language':       'Language',
   'FilterHides':    'Hide filtered properties',
   'FilterRemoves':  'Remove filtered properties',
   'HiliteOff':      'Turn Highlighting off',
   'HiliteOn':       'Turn Highlighting on',
   'Configuration':  'Configuration',
   'ConfigTitle':    'Settings for ImmonetFilter',
   'HideTitles':     'Hide by Titles:',
   'HideLocations':  'Hide by Locations:',
   'HideIDs':        'Hide by IDs:',
   'HiliteTitles':   'Highlight by Titles:',
   'HiliteLocations':'Highlight by Locations:',
   'HiliteIDs':      'Highlight by IDs:',
   'HiliteColor':    'Highlight Color:',
   'Hidden':         'Hidden',
   'Location':       'Location',
   'Title':          'Title',
   'HTitleTooltip':  'Strings to match in the properties title. Separate values by semicolon.',
   'HLocationTooltip':'Strings to match in the properties location. Separate values by semicolon.',
   'HIdTooltip':     'IDs to match. Separate values by semicolon.',
   'HColorTooltip':  'Background color for the highlighted objects.',
   'LangTooltip':    'Chose the language for ImmonetFilters output.',
   'ButtonSave':     'Save',
   'ButtonSaveTip':  'Save options and close window',
   'ButtonCancel':   'Cancel',
   'ButtonCancelTip':'Close window (reject changes)',
   'ResetLinkName':  'Reset to defaults',
   'ResetLinkTip':   'Reset settings to shipped defaults',
   'ActivateConfigXChange': 'Activate Configuration Exchange:',
   'ConfigXChangeTooltip': 'This adds two new items to the GM user menu to copy/paste your stored configuration. Useful to copy that data between multiple installations.',
   'CopySettings2Clipboard': 'Copy stored settings to Clipboard',
   'PasteSettings': 'Paste new Settings',
   'FadeMainPage': 'Fade main page on menu toggle:',
   'FadeMainPageTooltip': 'FadeOut/FadeIn main page when menu is opened/closed?',
    'PurgeIdDays': 'Expiration time (days) for IDs',
   'PurgeIdDaysTooltip': 'IDs not seen for the specified days will be removed from your configuration when you press the purge button',
   'PurgeTooltip': 'Click here to execute the purge',
   'PurgeIDsNotFound': 'It seems the following IDs have never been seen. The reason could be you entered them in a previous version of this script which not yet supported the purging. Shall we purge these IDs from your configuration?\n\n',
   'PurgeIDsFound': 'The timestamp of following IDs indicates the related objects are no longer listed on Immowelt.DE - do you want to remove them from your configuration?\n\n',
   'PurgeAbort': 'Not purged.',
   'ItemsPurged': 'items removed.',
   'Nothing2Purge': 'There are no outdated IDs found to purge.',
   'FilterSection': 'Filter',
   'SettingsSection': 'Settings',
   'MaintSection': 'Maintenance',
   'UpdateInterval': 'Update Interval',
   'UpdateIntervalTooltip': 'Days between update checks',
   'UpdateNow': 'Check Now',
   'UpdateNowTooltip': 'Click here to check for updates right now',
   'ForceDepCheck': 'Force check of dependencies?',
   'ForceDepCheckTooltip': 'Whether to check for dependency updates even if the main script was not updated',
   'DebugLog': 'Debug Logging:',
   'DebugLogTooltip': 'Enable debug logging to the console',
   'AddFilterById': ' + ID',
   'AddFilterByTitle': ' + title',
   'AddFilterByLocation': ' + location',
   'AddFilterId': 'Add this ID to the filter settings: ',
   'AddFilterTitle': 'Add the following text to the title filter:',
   'AddFilterLocation': 'Add the following text to the location filter:'
},
 de: {
   'Language':       'Sprache',
   'FilterHides':    'Versteckte Objekte ausblenden',
   'FilterRemoves':  'Versteckte Objekte entfernen',
   'HiliteOff':      'Highlighting deaktivieren',
   'HiliteOn':       'Highlighting aktivieren',
   'Configuration':  'Konfiguration',
   'ConfigTitle':    'Einstellungen für ImmonetFilter',
   'HideTitles':     'Titel-Filter:',
   'HideLocations':  'Orts-Filter:',
   'HideIDs':        'ID-Filter:',
   'HiliteTitles':   'Titel hervorheben:',
   'HiliteLocations':'Orte hervorheben:',
   'HiliteIDs':      'IDs hervorheben:',
   'HiliteColor':    'Hintergrundfarbe für Highlight:',
   'Hidden':         'Versteckt',
   'Location':       'Ort',
   'Title':          'Titel',
   'HTitleTooltip':  'Begriffssuche im Titel der Objekte. Werte müssen mit Semikolon voneinander getrennt werden.',
   'HLocationTooltip':'Begriffssuche in der Ortsbeschreibung der Objekte. Werte müssen mit Semikolon voneinander getrennt werden.',
   'HIdTooltip':     'Suche nach IDs. Werte müssen mit Semikolon voneinander getrennt werden.',
   'HColorTooltip':  'Hintergrundfarbe zur Hervorhebung von Objekten (Highlighting).',
   'LangTooltip':    'Sprache für ImmonetFilter',
   'ButtonSave':     'Speichern',
   'ButtonSaveTip':  'Änderungen speichern und Fenster schließen',
   'ButtonCancel':   'Abbrechen',
   'ButtonCancelTip':'Fenster schließen (Änderungen verwerfen)',
   'ResetLinkName':  'Zurücksetzen',
   'ResetLinkTip':   'Alle Werte auf Defaults zurücksetzen',
   'ActivateConfigXChange': 'Konfigurations-Austausch aktivieren:',
   'ConfigXChangeTooltip': 'Fügt dem GM Benutzermenü zwei Einträge zum Kopieren/Ersetzen der gespeicherten Konfigurationsdaten hinzu. Nützlich, um Einstellungen zwischen mehreren Installationen auszutauschen.',
   'CopySettings2Clipboard': 'Gespeicherte Einstellungen in die Zwischenablage kopieren',
   'PasteSettings': 'Neue Settings einfügen',
   'FadeMainPage': 'Webseite aus/einblenden:',
   'FadeMainPageTooltip': 'Soll die Webseite aus/eingeblendet werden, wenn das Menü geöffnet/geschlossen wird?',
   'PurgeIdDays': 'Verfallszeit (Tage) für IDs',
   'PurgeIdDaysTooltip': 'IDs, die in diesem Zeitraum nicht mehr gesehen wurden, werden per Knopfdruck aus der Konfiguration entfernt',
   'Purge': 'Aufräumen',
   'PurgeTooltip': 'Ein Klick auf diesen Button startet das Aufräumen',
   'PurgeIDsNotFound': 'Die folgenden IDs wurden vom Skript noch auf keiner besuchten Seite gesehen. Das kann daran liegen, dass sie bereits mit einer früheren Version erfasst wurden, welche noch nicht darauf geachtet hat. Sollen sie dennoch entfernt werden?\n\n',
   'PurgeIDsFound': 'Der Zeitstempel folgender IDs lässt darauf schließen, dass die zugehörigen Objekte nicht mehr auf Immowelt.DE zu finden sind. Sollen sie aus der Konfiguration entfernt werden?\n\n',
   'PurgeAbort': 'Nichts entfernt.',
   'ItemsPurged': 'Einträge entfernt.',
   'Nothing2Purge': 'Keine veralteten IDs gefunden.',
   'SettingsSection': 'Einstellungen',
   'MaintSection': 'Wartung',
   'UpdateInterval': 'Update Intervall',
   'UpdateIntervalTooltip': 'Tage zwischen Prüfungen auf verfügbare Aktualisierungen',
   'UpdateNow': 'Jetzt prüfen',
   'UpdateNowTooltip': 'Hier klicken, um sofort nach verfügbaren Updates zu suchen',
   'ForceDepCheck': 'Prüfung der Abhängigkeiten erzwingen?',
   'ForceDepCheckTooltip': 'Abhängigkeiten auf Updates prüfen, auch wenn das Haupt-Skript aktuell ist?',
   'DebugLogTooltip': 'Aktiviere Debug-Logging zur Konsole',
   'AddFilterByTitle': ' + Titel',
   'AddFilterByLocation': ' + Ort',
   'AddFilterId': 'Diese ID zum Filter hinzufügen: ',
   'AddFilterTitle': 'Folgenden Text zum Titel-Filter hinzufügen:',
   'AddFilterLocation': 'Folgenden Text zum Orts-Filter hinzufügen:'
 }
};
GM_config.setTranslations('en',trans.en);
GM_config.setTranslations('de',trans.de);
// ======================================[ /Translations ]===

// =====================================[ GM_config init ]===
// ------------------------------------[ Setup Languages ]---
//var langAvail = { "de": "Deutsch", "en": "English" };
var myLang = GM_config.gets('language')||'de';
GMSU.setLang(myLang);
GM_config.initLocalization(myLang,true);
function lang(term) { return GM_config.lang(term); }
// -------------------------------------[ init GM_config ]---
function initConfig() {
  debugOut('ImmoNet: Initializing Config');
  var tcols = 65;
  GM_config.init(lang('ConfigTitle'),{
    ignoreTitle:{ section: [lang('FilterSection')], label: lang('HideTitles'), title: lang('HTitleTooltip'), type: 'textarea', cols:tcols, default: '' },
    ignoreLocation:{ label: lang('HideLocations'), title: lang('HLocationTooltip'), type: 'textarea', cols:tcols, default: '' },
    ignoreID:   { label: lang('HideIDs'), title: lang('HIdTooltip'), type: 'textarea', cols:tcols, default: '' },
    hiliteTitle: { label: lang('HiliteTitles'), title: lang('HTitleTooltip'), type: 'textarea', cols:tcols, default: '' },
    hiliteLocation: { label: lang('HiliteLocations'), title: lang('HLocationTooltip'), type: 'textarea', cols:tcols, default: '' },
    hiliteID:   { label: lang('HiliteIDs'), title: lang('HIdTooltip'), type: 'textarea', cols:tcols, default: '' },
    hiliteColor: { section: [lang('SettingsSection')], label: lang('HiliteColor'), title: lang('HColorTooltip'), type: 'text', size:10, default: '#ffff99' },
    //hideOnly:   { label: 'Only hide ignored properties:', type: 'checkbox', default: hideOnly },
    //hiliteActive: { label: 'Highlight is active:', type: 'checkbox', default: hiliteActive },
    language: { label: lang('Language')+':', title: lang('LangTooltip'), type: 'select', options: {'de':'Deutsch','en':'English','nl':'Nederlands'}, default: 'de' },
    configXChange: { label: lang('ActivateConfigXChange'), title: lang('ConfigXChangeTooltip'), type: 'checkbox', default: false },
    fadeMainPage: { label: lang('FadeMainPage'), title: lang('FadeMainPageTooltip'), type: 'checkbox', default: false },
    debugLog: { label: lang('DebugLog'), title: lang('DebugLogTooltip'), type: 'checkbox', default: false },
    purgeIdDays: { section: [lang('MaintSection')], label: lang('PurgeIdDays'), title: lang('PurgeIdDaysTooltip'), type: 'int', size:3, default: 30 },
    purgeIDs: { label: lang('Purge'), title: lang('PurgeTooltip'), type: 'button', script: purgeIDs },
    updateDepCheckForce: { label: lang('ForceDepCheck'), title: lang('ForceDepCheckTooltip'), type: 'checkbox', default: false },
    updaterInterval: { label: lang('UpdateInterval'), title: lang('UpdateIntervalTooltip'), type: 'int', size:3, default: 7 },
    updateNow: { label: lang('UpdateNow'), title: lang('UpdateNowTooltip'), type: 'button', script: forcedUpdate }
  },GM_config.eCSS,
  {
    open: function() {
      GM_config.localizeButtons();
      GM_config.addBorder();
      GM_config.resizeFrame('75%','500px');
      GM_config.sections2tabs();
      adjustPurgeButton();
      if (fadeMainPage) GM_config.fadeOut();
    },
    save: function() {
      GMSU.setCheckInterval(GM_config.get('updaterInterval'));
      location.reload();
    },
    close: function() { if (fadeMainPage) GM_config.fadeIn(); }
  });
}
// -------------------------------------[ open GM_config ]---
function showConfig() {
  GM_config.open();
}
// ====================================[ /GM_config init ]===
// ======================================[ Configuration ]===
initConfig();
var ignoreTitle = GM_config.get('ignoreTitle').split(";"); // titles to ignore
var hiliteTitle = GM_config.get('hiliteTitle').split(";"); // titles to highlight
var ignoreLocation = GM_config.get('ignoreLocation').split(";"); // locations to ignore
var hiliteLocation = GM_config.get('hiliteLocation').split(";"); // locations to highlight
var ignoreID = GM_config.get('ignoreID').split(";"); // property IDs to ignore
var hiliteID = GM_config.get('hiliteID').split(";"); // property IDs to highlight
var hiliteColor = GM_config.get('hiliteColor');      // color for highliting
var hideOnly = GM_getValue("hideOnly",true);         // Hide or remove elements?
var hiliteActive = GM_getValue("hiliteActive",true); // HiLite elements?
var configXchangeActivated = GM_config.get('configXChange'); // XChange of configuration data?
var fadeMainPage = GM_config.get('fadeMainPage'); // fadeOut/In main page when opening/closing menu?
// collecting hidden IDs here to prevent double-hides
var hiddenIDs  = new Array();
var hilitedIDs = new Array();
// General property data
var pageIDs = new Array();
var pageTitles = new Array();
var pageLocations = new Array();
var lastSeenIDs = eval(GM_getValue('lastSeenIDs', '({})')); // keep track for purge
var debugMode = GM_config.get('debugLog');
GMSU.debugMode = debugMode;

// =====================================[ /Configuration ]===

// ========================================[ SubRoutines ]===
/** Debug Output (GM_log only when this.debugMode is enabled)
 * @method debugOut
 * @param mixed message
 */
function debugOut(msg) {
  if (debugMode) GM_log(msg);
}
// --------------------------------------[ Forced Update ]---
function forcedUpdate() {
  debugOut('Initializing update check');
  GMSU.init(50318,true,GM_config.get('updateDepCheckForce'));
//  window.setTimeout(function() {
//    GMSU.init(50318,true,GM_config.get('updateDepCheckForce'));
//  },0);
}
// ----------------------------[ Adjust the Purge button ]---
function adjustPurgeButton() {
  var pb = GM_config.frame.contentDocument.getElementById('field_purgeIDs');
  var pd = GM_config.frame.contentDocument.getElementById('field_purgeIdDays');
  pb.parentNode.parentNode.removeChild(pb.parentNode);
  pd.parentNode.appendChild(pb);
  pb.style.position = 'relative';
  pb.style.left = '10px';
  pb = GM_config.frame.contentDocument.getElementById('field_updateNow');
  pd = GM_config.frame.contentDocument.getElementById('field_updaterInterval');
  pb.parentNode.parentNode.removeChild(pb.parentNode);
  pd.parentNode.appendChild(pb);
  pb.style.position = 'relative';
  pb.style.left = '10px';
}
// -------------------------------[ Purging obsolete IDs ]---
function purgeAr(purgArr) { // remove purgeArr elements from ignoreID+hiliteID
  var igUp = 0, hiUp = 0;
  var igID = GM_config.frame.contentDocument.getElementById("field_ignoreID").value.split(";"),
      hiID = GM_config.frame.contentDocument.getElementById("field_hiliteID").value.split(";");
  for (var i=0;i<purgArr.length;i++) {
    for (var k=0;k<igID.length;k++) {
      if (purgArr[i]==igID[k]) {
        igID.splice(k,1);
        igUp += 1;
        break;
      }
    }
    for (k=0;k<hiID.length;k++) {
      if (purgArr[i]==hiID[k]) {
        hiID.splice(k,1);
        hiUp += 1;
        break;
      }
    }
  }
  if (igUp) {
    GM_config.set('ignoreID',igID.join(";"));
    GM_config.frame.contentDocument.getElementById("field_ignoreID").value = igID.join(";");
  }
  if (hiUp) {
    GM_config.set('hiliteID',hiID.join(";"));
    GM_config.frame.contentDocument.getElementById("field_hiliteID").value = hiID.join(";");
  }
  return (hiUp+igUp);
}

function purgeIDs() { // check whether we have something to purge and call purgeAr then
  var notFound = new Array(), gotStamp = new Array();
  var now = new Date().getTime();
  var expMSecs = GM_config.frame.contentDocument.getElementById("field_purgeIdDays").value*86400*1000;
  var igID = GM_config.frame.contentDocument.getElementById("field_ignoreID").value.split(";"),
      hiID = GM_config.frame.contentDocument.getElementById("field_hiliteID").value.split(";");
  for (var i=0;i<igID.length;i++) {
    if (igID[i]) { // skip empty ones
      if (!lastSeenIDs[igID[i]]) {
        notFound.push(igID[i]);
      } else if (now-lastSeenIDs[igID[i]] > expMSecs) {
        gotStamp.push(igID[i]);
      }
    }
  }
  for (i=0;i<hiID.length;i++) {
    if (hiID[i]) { // skip empty ones
      if (!lastSeenIDs[hiID[i]]) {
        notFound.push(hiID[i]);
      } else if (now-lastSeenIDs[hiID[i]] > expMSecs) {
        gotStamp.push(hiID[i]);
      }
    }
  }
  if ( !(notFound.length||gotStamp.length) ) alert(lang('Nothing2Purge'));
  else {
    if (notFound.length) {
      if (confirm(lang('PurgeIDsNotFound')+notFound+' ('+notFound.length+')'))
        alert(purgeAr(notFound)+' '+lang('ItemsPurged'));
      else alert(lang('PurgeAbort'));
    }
    if (gotStamp.length) {
      if ( confirm(lang('PurgeIDsFound')+gotStamp) )
        alert(purgeAr(gotStamp)+' '+lang('ItemsPurged'));
      else alert(lang('PurgeAbort'));
    }
  }
}

// --------------------------[ Toggle a setting via Menu ]---
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

// simple in_array check (is the item contained in the array?)
function in_array(item,arr) {
  for(p=0;p<arr.length;p++) if (item == arr[p]) return true;
  return false;
}

/* --------------------------------[ PageScriptInjection ]---
 * Inject script into page to toggle visibility of filtered elements
 * (only called if hideOnly==true) */
function toggleVisScript() {
  var anch = document.getElementsByTagName('head');
  if (!anch) return;
  var scr = document.createElement('script');
  scr.text = "function toggleOn(pid) {"
           + " document.getElementById('immo'+pid).setAttribute('style','display:block');"
           + " document.getElementById('l'+pid).setAttribute('href','javascript:toggleOff('+pid+')');"
           + "} function toggleOff(pid) {"
           + " document.getElementById('immo'+pid).setAttribute('style','display:none');"
           + " document.getElementById('l'+pid).setAttribute('href','javascript:toggleOn('+pid+')');"
           + "} function openFilterDiv(pid) {"
           + " document.getElementById('filter'+pid).setAttribute('style','display:inline;margin-left:2px;');"
           + " document.getElementById('filterref'+pid).setAttribute('style','outline:1px solid red;color:red;');"
           + " document.getElementById('filterref'+pid).setAttribute('href','javascript:closeFilterDiv('+pid+')');"
           + "} function closeFilterDiv(pid) {"
           + " document.getElementById('filter'+pid).setAttribute('style','display:none');"
           + " document.getElementById('filterref'+pid).setAttribute('style','outline:none;');"
           + " document.getElementById('filterref'+pid).setAttribute('href','javascript:openFilterDiv('+pid+')');"
           + "}";
  anch[0].appendChild(scr);
}

/* ----------------------------------[ collect page info ]---
 * investigatePage() collects IDs, titles, and locations plus
 * marks the corresponding areas by assigning them IDs */
function investigatePage() {
  var rows = document.evaluate("//div[@class='objectinfo']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<rows.snapshotLength;i++) {
    pageIDs[i] = /immo(\d+)/.exec(rows.snapshotItem(i).id)[1];
    lastSeenIDs[pageIDs[i]] = new Date().getTime();
 }
  rows = document.evaluate("//div[@class='titel']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<rows.snapshotLength;i++) {
    pageTitles[i] = rows.snapshotItem(i).textContent.toString();
  }
  rows = document.evaluate("//div[@class='adresse']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<rows.snapshotLength;i++) {
    pageLocations[i] = rows.snapshotItem(i).textContent.toString();
  }
  if (lastSeenIDs) GM_setValue('lastSeenIDs',lastSeenIDs.toSource());
};

/* --------------------------------------[ HideProperty ]---
 * hide a property instead of removing it
 * parameters: firstNode (TR), propertyID, hidingRule */
function hideProperty(pid,reason) {
  if (in_array(pid,hiddenIDs)) return;
  hiddenIDs.push(pid);
  var fnode = document.getElementById('immo'+pid);
  fnode.setAttribute('style','display:none');
  var note = document.createElement('div');
  var link = document.createElement('a');
  link.id = 'l'+pid;
  link.setAttribute('href','javascript:toggleOn('+pid+')');
  link.setAttribute('style','color:#777777;');
  link.innerHTML = reason;
  note.appendChild(link);
  note.setAttribute('style','text-align:right;border-bottom:1px solid #c4cee6;font-size:9px;color: #aaaaaa;');
  fnode.parentNode.insertBefore(note,fnode);
}

/* ---------------------------------[ Add Filter-Button ]---
 * addFilterButton() adds a button to add/remove a property
 * to/from the filter list */
function addFilterButton() {
  var rows = document.evaluate("//a[@id='contactLink']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i=0;i<rows.snapshotLength;i++) {
    if (in_array(pageIDs[i],hiddenIDs)) { // hidden property
      debug(pageIDs[i]+' is hidden, no filter button added');
      continue;
    }
    var li = document.createElement('span'),
        a  = document.createElement('a');
    li.setAttribute('class','imFilter');
    li.setAttribute('style','margin-left:10px;');
    a.innerHTML = lang('Filter');
    a.setAttribute('href','javaScript:openFilterDiv('+pageIDs[i]+')');
    a.id = 'filterref'+pageIDs[i];
    li.appendChild(a);
    var div = document.createElement('div');
    div.id = 'filter'+pageIDs[i];
    div.setAttribute('style','z-index:100;display:none;');
      var lfid = document.createElement('span'),
          afid = document.createElement('a');
      afid.innerHTML = lang('AddFilterById');
      afid.setAttribute('href','#');
      afid.addEventListener('click',function(e) {addFilter('id',this.parentNode.parentNode.id.substring(6));}, false);
      lfid.appendChild(afid);
      lfid.setAttribute('style','outline:1px solid #326EA1;margin: 0 2px 0 2px;padding-right:2px;');
      div.appendChild(lfid);
      var ltit = document.createElement('span'),
          atit = document.createElement('a');
      atit.innerHTML = lang('AddFilterByTitle');
      atit.setAttribute('href','#');
      atit.addEventListener('click',function(e) {addFilter('title',this.parentNode.parentNode.id.substring(6));}, false);
      ltit.appendChild(atit);
      ltit.setAttribute('style','outline:1px solid #326EA1;margin: 0 2px 0 2px;padding-right:2px;');
      div.appendChild(ltit);
      var lloc = document.createElement('span'),
          aloc = document.createElement('a');
      aloc.innerHTML = lang('AddFilterByLocation');
      aloc.setAttribute('href','javascript:addFilterLocation('+pageLocations[i]+')');
      aloc.addEventListener('click',function(e) {addFilter('location',this.parentNode.parentNode.id.substring(6));}, false);
      lloc.appendChild(aloc);
      lloc.setAttribute('style','outline:1px solid #326EA1;margin: 0 2px 0 2px;padding-right:2px;');
      div.appendChild(lloc);
    li.appendChild(div);
    rows.snapshotItem(i).parentNode.appendChild(li);
  }
}

/* --------------------[ Add an item to the filter list ]---
 * adds the specified filter to the list of typ */
function addFilter(typ,pid) {
  switch(typ) {
    case 'id'      :
      if (!confirm(lang('AddFilterId')+pid)) return;
      if (GM_config.get('ignoreID')=='') GM_config.set('ignoreID',pid);
      else GM_config.set('ignoreID',GM_config.get('ignoreID')+';'+pid);
      break;
    case 'title'   :
      var title = document.evaluate("//div[@id='immo"+pid+"']/div[@class='beschreibung']/div/div[@class='titel']/a", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent.toString().replace(/^\s*(.*?)\s*$/,'$1');
      title = prompt(lang('AddFilterTitle'),title);
      if (title=='' || title==null) return;
      if (GM_config.get('ignoreTitle')=='') GM_config.set('ignoreTitle',title);
      else GM_config.set('ignoreTitle',GM_config.get('ignoreTitle')+';'+title);
      break;
    case 'location':
      var tmp = document.evaluate("//div[@id='immo"+pid+"']/div[@class='beschreibung']/div[@class='info']/div[@class='daten']/div[@class='adresse']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
      if (tmp.nodeValue==null) loc = tmp.firstChild.nodeValue;
      else loc = tmp.nodeValue;
      loc = prompt(lang('AddFilterLocation'),loc.replace(/^\s*(.*?)\s*/,'$1'));
      if (loc=='' || loc==null) return;
      if (GM_config.get('ignoreLocation')=='') GM_config.set('ignoreLocation',loc);
      else GM_config.set('ignoreLocation',GM_config.get('ignoreLocation')+';'+loc);
      break;
  }
  GM_config.save();
  location.reload();
}

/* -------------------------------------[ HiliteProperty ]---
 * parameters: firstNode (TR), propertyID */
function hiliteProperty(pid) {
  if (!hiliteActive) return;
  if (in_array(pid,hilitedIDs)) return;
  if (in_array(pid,hiddenIDs)) return;
  hilitedIDs.push(pid);
  var fnode = document.getElementById('immo'+pid);
  fnode.setAttribute('style','background-color:'+hiliteColor+' !important;');
}

// ------------------------[ un-hilite hidden properties ]---
function unHiliteHidden() {
  for (var i = 0; i<hilitedIDs.length; i++) {
  if (in_array(hilitedIDs[i],hiddenIDs)) {
    document.getElementById('immo'+hilitedIDs[i]).setAttribute('style','background-color:transparent !important;display:none !important;');
    }
  }
}

// --------------------------------------[ hide by title ]---
function doTitles() {
  if ( !(ignoreTitle[0]||hiliteTitle[0]) ) return;
  for (var i=0;i<pageTitles.length;i++) { // Hiding
    if (ignoreTitle[0]) for (var k=0;k<ignoreTitle.length;k++) {
      var test = new RegExp(ignoreTitle[k],"gi");
      if ( pageTitles[i].match(test) ) {
        if (hideOnly) {
          hideProperty(pageIDs[i],lang('Hidden')+' ('+lang('Title')+': '+ignoreTitle[k]+')');
        } else {
          var rej = document.getElementById('immo'+pageIDs[i]);
          rej.parentNode.removeChild(rej);
        }
        break;
      }
    }
    if (hiliteTitle[0]) for (var k=0;k<hiliteTitle.length;k++) {
      test = new RegExp(hiliteTitle[k],"gi");
      if (pageTitles[i].match(test)) {
        hiliteProperty(pageIDs[i]);
        break;
      }
    }
  }
}

// ----------------------------------[ hide by location ]---
function doLocations() {
  if ( !(ignoreLocation[0]||hiliteLocation[0]) ) return;
  for (var i=0;i<pageLocations.length;i++) {
    if (ignoreLocation[0]) for (var k=0;k<ignoreLocation.length;k++) { // Hide
      test = new RegExp(ignoreLocation[k],"gi");
      if (pageLocations[i].match(test)) {
        if (hideOnly) {
          hideProperty(pageIDs[i],lang('Hidden')+' ('+lang('Location')+': '+ignoreLocation[k]+')');
        } else {
          var rej = document.getElementById('immo'+pageIDs[i]);
          rej.parentNode.removeChild(rej);
        }
        break;
      }
    }
    if (hiliteLocation[0]) for (var k=0;k<hiliteLocation.length;k++) { // HiLite
      test = new RegExp(hiliteLocation[k],"gi");
      if (pageLocations[i].match(test)) {
        hiliteProperty(pageIDs[i]);
        break;
      }
    }
  }
}

// ----------------------------------------[ hide by ID ]---
function doIDs() {
  if ( !(hiliteID[0]||ignoreID[0]) ) return;
  for (var i=0;i<pageIDs.length;i++) {
    if (ignoreID[0]) for (var k=0;k<ignoreID.length;k++) { // Hide
      if (ignoreID[k]!=pageIDs[i]) continue;
      if (hideOnly) {
        hideProperty(ignoreID[k],lang('Hidden')+' (ID: '+ignoreID[k]+')');
      } else {
        var rej = document.getElementById('immo'+pageIDs[i]);
        rej.parentNode.removeChild(rej);
      }
      break;
    }
    if ( hiliteID[0] ) for (var k=0;k<hiliteID.length;k++) { // HiLite
      if (hiliteID[k]!=pageIDs[i]) continue;
      hiliteProperty(hiliteID[k]);
    }
  }
}

//==============================================[ Menu ]===
makeMenuToggle("hideOnly", hideOnly, lang('FilterHides'), lang('FilterRemoves'), "ImmonetFilter");
makeMenuToggle("hiliteActive", hiliteActive, lang('HiliteOn'), lang('HiliteOff'), "ImmonetFilter");
if (configXchangeActivated) {
  GM_registerMenuCommand('ImmonetFilter: ' + lang('CopySettings2Clipboard'),GM_config.copySettings);
  GM_registerMenuCommand('ImmonetFilter: ' + lang('PasteSettings'),GM_config.pasteSettings);
}
GM_registerMenuCommand('ImmonetFilter: ' + lang('Configuration'),showConfig);

// ==============================================[ Main ]===
var resTable = document.getElementById('listeneintraege');
if (resTable) {
  functions = new Array(doTitles,doLocations,doIDs,unHiliteHidden,addFilterButton);
  investigatePage();
  for (f=0; f<functions.length; f++) {
    try { functions[f](); }
    catch(e) { GM_log("Trying " + functions[f] + " caused error: " + e); }
  }
  if (hideOnly) toggleVisScript();
}
GMSU.init(50318);
