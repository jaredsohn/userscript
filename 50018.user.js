function usodata_50018() {
// ==UserScript==
// @name           GM_config Extender
// @namespace      http://projects.izzysoft.de/
// @description    Extends GM_config with useful functionality
// @include        http://*
// @include        https://*
// @include        file://*
// @require        http://userscripts.org/scripts/source/49700.user.js
// @copyright      JoeSimmons & SizzleMcTwizzle & IzzySoft
// @version        1.0.10
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// @uso:script     50018
// ==/UserScript==
}
var GMSU_meta_50018 = usodata_50018.toString();

/* =====================================================[ Adding tooltips ]===
 * int num: setting# referenced (starts from 0)
 * string nam: tooltip text */
GM_config.addTooltip = function(num,nam) {
  if ( cf=this.frame.contentWindow.document.getElementById('config_fields') ) {
    cf.childNodes[num].setAttribute('title',nam);
  }
}

/* =======================================[ Obtaining a stored preference ]===
 * THOU SHALT NOT USE THIS! It's only for the rare cases you REALLY need to
 * access a stored preference BEFORE calling init() - e.g. since you may need
 * to know the language to display menu items in.
 * string name: name of the preference to read
 * optional mixed default: value to return if the preference is not found */
GM_config.gets = function() {
  return GM_config.read()[arguments[0]] || arguments[1];
}

/* ====================================================[ XChange Settings ]===
 * These features require signed.applet.codebase_principal_support set to TRUE
 * in about:config (for Mozilla based browsers). Don't worry to much about it:
 * On each access the user will be prompted with a popup to confirm. */
// -----------------------------------[ Copy stored settings to clipboard ]---
unsafeWindow.copyToClipboard = function(text) {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    clipboardHelper.copyString(text);
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
GM_config.copySettings = function() {
  var settings = GM_config.read().toSource();
  if (window.clipboardData) { // IE, Opera
    window.clipboardData.setData("Text",settings);
  } else {
    unsafeWindow.copyToClipboard(settings);
  }
}
// ---------------------------------------[ Paste settings from Clipboard ]---
unsafeWindow.pasteFromClipboard = function() {
  try {
    this.netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
    const clipboardHelper = Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper);
    settings = clipboardHelper.getData();
    return settings;
  } catch(e) {
    alert('Clipboard access not permitted, sorry. You will have to set signed.applet.codebase_principal_support to true in about:config');
  }
}
GM_config.pasteSettingsFromClipboard = function() {
  settings = unsafeWindow.pasteFromClipboard();
  ok = confirm(GM_config.lang('ConfirmOverwriteFromClipboard'));
  if (ok) {
    GM_config.settings = settings;
    GM_config.save();
    alert(GM_config.lang('SettingsSaved'));
  } else {
    alert(GM_config.lang('SaveAborted'));
  }
}
GM_config.pasteSettings = function() {
  settings = prompt(GM_config.lang('PromptSettingsPaste'));
  ok = confirm(GM_config.lang('ConfirmOverwriteFromPaste'));
  if (ok) {
    GM_setValue('GM_config', settings);
  } else {
    alert(GM_config.lang('SaveAborted'));
  }
}

// ========================================================[ localization ]===
// --------------------------------------------------------[ translations ]---
GM_config.trans = {
  en: {
   'ButtonSave':     'Save',
   'ButtonSaveTip':  'Save options and close window',
   'ButtonCancel':   'Cancel',
   'ButtonCancelTip':'Close window (reject changes)',
   'ResetLinkName':  'Reset to defaults',
   'ResetLinkTip':   'Reset settings to shipped defaults',
   'ConfirmOverwriteFromClipboard': 'Sure to overwrite your settings from Clipboard?',
   'SettingsSaved':  'Settings saved.',
   'SaveAborted':    'Aborted.',
   'PromptSettingsPaste': 'Please paste your settings here:',
   'ConfirmOverwriteFromPaste': 'Sure to overwrite your settings with the entered data?'
  },
  de: {
   'ButtonSave':     'Speichern',
   'ButtonSaveTip':  'Änderungen speichern und Fenster schließen',
   'ButtonCancel':   'Abbrechen',
   'ButtonCancelTip':'Fenster schließen (Änderungen verwerfen)',
   'ResetLinkName':  'Zurücksetzen',
   'ResetLinkTip':   'Alle Werte auf Defaults zurücksetzen',
   'ConfirmOverwriteFromClipboard': 'Sollen die Einstellungen wirklich mit den Daten vom Clipboard überschrieben werden?',
   'SettingsSaved':  'Einstellungen gespeichert.',
   'SaveAborted':    'Aktion abgebrochen.',
   'PromptSettingsPaste': 'Bitte Einstellungen hier hineinkopieren:',
   'ConfirmOverwriteFromPaste': 'Sicher, dass die Einstellungen mit den kopierten Daten überschrieben werden sollen?'
  },
  nl: {
   'ButtonSave': 'Opslaan',
   'ButtonSaveTip': 'Instellingen opslaan en sluit venster',
   'ButtonCancel': 'Annuleren',
   'ButtonCancelTip':'Sluit venster (wist wijzigingen)',
   'ResetLinkName': 'Standaardinstellingen herstellen',
   'ResetLinkTip': 'Herstelt alle instellingen naar de standaardwaarden',
   'ConfirmOverwriteFromClipboard': 'Weet u zeker dat u de instellen vanaf het clipboard wil overschrijven?',
   'SettingsSaved': 'Instellingen opgeslagen.',
   'SaveAborted': 'Afgebroken.',
   'PromptSettingsPaste': 'Plak uw instellingen hier:',
   'ConfirmOverwriteFromPaste': 'Weet u zeker dat u de instellingen wilt overschrijven met de ingevoerde data?'
  },
  useLang: 'en',
  fallBack: true
};
/* -------------------------------------------------[ adding translations ]---
 * can be used to overwrite existing translations and/or add new ones
 * string lang: 2 char language code
 * object trans: translations to add in the format {'code':'translation','code2':'trans2', ...) */
GM_config.setTranslations = function(lang,trans) {
  for (attrname in trans) { this.trans[lang][attrname] = trans[attrname]; }
}
/* ---------------------------------------------------[ init localization ]---
 * string lang: language to translate into
 * boolean fallback: return original (true) or empty string (false) on NoFound? */
GM_config.initLocalization = function(lang,fallback) {
  this.trans.useLang = lang;
  this.trans.fallback = fallback;
}
/* -------------------------------------------------[ translate something ]---
 * string term: term to translate */
GM_config.lang = function(term) {
  if (typeof(this.trans[this.trans.useLang])=='undefined' || !this.trans[this.trans.useLang][term]) {
    if (!this.trans['en'][term]) {
      if (this.trans.fallback) return term;
      return '';
    }
    return trans['en'][term];
  }
  return this.trans[this.trans.useLang][term];
}
/* ----------------------------------------------------[ localize Buttons ]---
 * uses setup default language for translation - see initLocalization() */
GM_config.localizeButtons = function() {
  if ( cf=this.frame.contentWindow.document.getElementById('buttons_holder') ) {
    cf.childNodes[0].innerHTML = this.lang('ButtonSave');
    cf.childNodes[0].setAttribute('title',this.lang('ButtonSaveTip'));
    cf.childNodes[1].innerHTML = this.lang('ButtonCancel');
    cf.childNodes[1].setAttribute('title',this.lang('ButtonCancelTip'));
    cf.childNodes[2].childNodes[0].innerHTML = this.lang('ResetLinkName');
    cf.childNodes[2].childNodes[0].setAttribute('title',this.lang('ResetLinkTip'));
  }
}

// ==========================================================[ Stylish ]===
// ---------------------------------------------------[ CSS for Fading ]---
GM_config.fadeCSS = '\
  #GM_transparency_filter { background-color: #777777; }\
  /* iframe[id^="GM_config"] { opacity: 1.0 !important; background-color: #ffffff !important; } */\
';
/* ------------------------------------------------------------[ Fader ]---
 * Original code by JoeSimmons - adapted for GM_config_ext by Izzy.
 * Fade in/out by id and choose speed: slow, medium, or fast
 * Syntax: fade(
 *              node,
 *              'in'|'out' [,
 *              'fast'|'medium'|'slow' [,
 *              minOpacity [, maxOpacity]]]); */
GM_config.fade = function() {
  var e = arguments[0], dir = arguments[1], s = arguments[2]||'medium',
      minOpa = arguments[3]||.5, maxOpa = arguments[4]||1;
  if(!e || !dir || typeof dir!='string' || (dir!='out'&&dir!='in')) {return;} // Quit if node/direction is omitted, direction isn't in/out, or if direction isn't a string
  dir=dir.toLowerCase(); s=s.toLowerCase(); // Fix case sensitive bug
  var node = (typeof e=='string') ? $(e) : e, // Define node to be faded
     speed = {slow : 400, medium : 200, fast : 50};
  if(!s) var s='medium'; // Make speed medium if not specified
  if(s!='slow' && s!='medium' && s!='fast') s='medium'; // Set speed to medium if specified speed not supported
  if(dir=='in') node.style.opacity = minOpa.toString();
  else if(dir=='out') node.style.opacity = maxOpa.toString();
  //node.style.display='';
  var intv = setInterval(function(){
    if(dir=='out') {
      if(parseFloat(node.style.opacity)>minOpa) node.style.opacity = (parseFloat(node.style.opacity)-.1).toString();
      else {
        clearInterval(intv);
        node.style.background = 'transparent none repeat scroll 0 0';
        //node.style.display='none';
      }
    }
    else if(dir=='in') {
      if(parseFloat(node.style.opacity)<maxOpa) node.style.opacity = (parseFloat(node.style.opacity)+.1).toString();
      else {
        clearInterval(intv);
      }
    }
  }, speed[s]);
}

/* ----------------------------------------------------------[ FadeOut ]---
 * FadeOut main page and focus on the GM_config menu
 * You can optionally pass a string containing suitable CSS to it. If you
 * don't, GM_config.fadeCSS will be used instead. */
GM_config.fadeOut = function() {
  var styl  = document.createElement('style');
  styl.innerHTML = arguments[0] || GM_config.fadeCSS;
  styl.setAttribute('id','GM_config_menu_css');
  document.getElementsByTagName('head')[0].appendChild(styl);
  window.document.body.appendChild((this.tframe=this.create('iframe',{id:'GM_transparency_filter',src:'about:blank',style:'position:fixed; top:0; left:0; opacity:0; z-index:998; width:100%; height:100%; max-height:100%; max-width:100%; border:none; overflow:auto;'})));
  this.fade(this.tframe,'in','medium',0,.8);
  var ifras = document.getElementsByTagName('iframe');
  for (i=0;i<ifras.length;i++) {
    if (/GM_config/.exec(ifras[i].id)) {
      this.fade(ifras[i],'in','fast',0,1);
    }
  }
}
// -----------------------------------------------------------[ FadeIn ]---
GM_config.fadeIn = function() {
  this.fade(this.tframe,'out','fast',0,.8);
  var intv = setTimeout(function() {
    document.getElementById('GM_config_menu_css').parentNode.removeChild(document.getElementById('GM_config_menu_css'));
    GM_config.remove(GM_config.tframe);
    delete GM_config.tframe;
  },400);
}
/* -------------------------------------------------[ Sections to Tabs ]---
 * Convert sections to tabbed pages
 */
var sectionTabs = 0; // holds the number of tabs we have
GM_config.toggleSection = function(e) { // onClick handler for the tabs
  if ( (typeof e)=='number' ) var objNum = e;
  else var objNum = /\_(\d+)\_/.exec(e.target.id)[1], tobj;
  for (var i=0;i<sectionTabs;i++) {
    tobj = GM_config.frame.contentWindow.document.getElementById('section_'+i+'_tab');
    tdat = GM_config.frame.contentWindow.document.getElementById('section_'+i);
    tdat.setAttribute('className','section_header tab'); // does not work
    if (i==objNum) { // Activate
      // tab
      if (tobj.style.cssText.match(/font-weight/) )
        tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: bold !important'));
      else
        tobj.setAttribute('style',tobj.style.cssText + 'font-weight: bold !important;');
      tobj.setAttribute('selected',true);
      // content
      if (tdat.style.cssText.match(/display:/))
        tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:table !important'));
      else
        tdat.setAttribute('style',tdat.style.cssText +'display:table !important;');
    } else { // DeActivate
      // tab
      if (tobj.style.cssText.match(/font-weight/) )
        tobj.setAttribute('style',tobj.style.cssText.replace(/font-weight:[^\;]*/,'font-weight: normal !important'));
      else
        tobj.setAttribute('style',tobj.style.cssText + 'font-weight: normal !important;');
      tobj.setAttribute('selected',false);
      // content
      if (tdat.style.cssText.match(/display:/))
        tdat.setAttribute('style',tdat.style.cssText.replace(/display:[^\;]*/,'display:none !important'));
      else
        tdat.setAttribute('style',tdat.style.cssText +'display:none !important;');
    }
  }
}

GM_config.sections2tabs = function() {
  var rows = this.frame.contentWindow.document.getElementsByTagName('h2');
  if (rows.length<1) return;
  var anch = document.createElement('div');
  anch.style.cssText = 'border-bottom: 3px solid #cccccc;';
  anch.id = 'GM_config_tab_holder';
  sectionTabs = rows.length;
  for (var i=0;i<sectionTabs;i++) {
    rows[0].setAttribute('style','-moz-appearance:tab; display:inline; padding-left:5px; padding-right:5px;');
    rows[0].id = 'section_'+i+'_tab';
    rows[0].addEventListener('click', GM_config.toggleSection, false);
    anch.appendChild(rows[0]);
    GM_config.frame.contentWindow.document.getElementById('section_'+i).style.marginLeft = "auto";
    GM_config.frame.contentWindow.document.getElementById('section_'+i).style.marginRight = "auto";
  }
  this.frame.contentWindow.document.getElementById('section_0').parentNode.insertBefore(anch,this.frame.contentWindow.document.getElementById('section_0'));
  this.frame.contentWindow.document.getElementById('section_0_tab').setAttribute('selected',true);
  this.toggleSection(0);
}

/* -------------------------------------------------------------[ eCSS ]---
 * a sample style to use: eCSS can mean "example CSS" or "extended CSS", as
 * you wish to put it :-) */
GM_config.eCSS = '\
/* Remove the 40% wasted space to the left */\
.indent40 {\
  margin-left: auto !important;\
}\
/* Make the config fields a table */\
#config_fields {\
  display:table !important;\
  margin-left: auto !important;\
  margin-right: auto !important;\
}\
div.config_var, .section_header_holder > div { display:table-row !important; }\
div.config_var > *, .section_header_holder > div > * {\
  display:table-cell !important;\
  font-size: 12px !important;\
}\
/* Adjust the labels */\
.field_label {\
  text-align: right !important;\
  padding-right: 10px !important;\
  vertical-align: top !important;\
}\
/* Center buttons */\
#buttons_holder {\
  display:table !important;\
  margin-left: auto !important;\
  margin-right: auto !important;\
}\
#buttons_holder button {\
  margin-left: 20px !important;\
  margin-right: 20px !important;\
}\
div.reset_holder { text-align:center !important; }\
button, a.reset {\
  font-size: 11px !important;\
  font-weight: bold !important;\
}\
/* Format the header */\
#header {\
  background-color: #3e91eb !important;\
  color: #ffffff !important;\
  text-align: center !important;\
  outline: 2px solid #eae9e8 !important;\
  position: fixed !important;\
  width: 100% !important;\
  top: 0px !important;\
  height: 25px !important;\
}\
#header * {\
  font-size: 18px !important;\
  font-weight: bold !important;\
}\
#header + * { margin-top: 30px !important; }\
#header + div.config_var > * {\
  padding-top: 35px !important;\
}\
#header + div.config_var > input {\
  padding-top: 0px !important;\
  margin-top: 35px !important;\
}\
body {\
  margin-left: 0px !important;\
  margin-right: 2px !important;\
  margin-top: 2px !important;\
}\
/*.section_header_holder { padding-left: 40px; }*/\
h2.section_header {\
  font-size: 12px !important;\
  font-weight: bold !important;\
  margin-top: 5px !important;\
  margin-bottom: 5px !important;\
  background-color: transparent !important;\
  color: #444444 !important;\
  border: 0px solid white !important;\
  cursor: pointer;\
  opacity: 0.99 !important;\
}\
/* Not tabbed */\
.section_header_holder > h2.section_header {\
  cursor: auto !important;\
  background-color: #add8e6!important;\
  font-weight: bold !important;\
}\
/* Tabbed */\
.section_header[selected="true"] {\
  position: relative !important;\
  color: #000000 !important;\
  top: 1px !important;\
}\
.section_header:not([selected]) {\
  font-weight: normal !important;\
}\
#GM_config_tab_holder {\
  margin-left:5px !important;\
  margin-right:5px !important;\
  border-bottom: 1px solid #B2A293 !important;\
}\
#section_0_tab { margin-left:3px !important; }\
';

/* =========================================[ Resize configuration window ]===
 * int width: new width
 * int height: new height */
GM_config.resizeFrame = function(wid,hei) {
  if(fid=this.frame.id) {
    this.frame.style.width = wid;
    this.frame.style.height = hei;
  }
}

/* ====================================[ Add a border to the config frame ]===
 * object spec { width (5px), style (ridge), color (#eae9e8) }
 */
GM_config.addBorder = function() {
  if(fid=this.frame.id) {
    spec = arguments[0] || {};
    this.frame.style.borderWidth = (spec.width || '5px');
    this.frame.style.borderStyle = (spec.style || 'ridge');
    this.frame.style.borderColor = (spec.color || '#999999');
  }
}
