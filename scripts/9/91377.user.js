// ==UserScript==
// @name        TelkkuTuner
// @namespace   http://script.tyyppi.org/
// @description Tuunaaja telkku.com:iin; Mainosten ja turhien ohjelmien poisto sekä väritys.
// @include     http://telkku.com/*
// @include     http://www.telkku.com/*
// @include     http://www2.telkku.com/*
// @include     http://telkku.fi/*
// @include     http://www.telkku.fi/*
// @icon        http://tuner.tyyppi.org/favicon.ico
// @require     http://script.tyyppi.org/jquery.min.js
// @require     http://script.tyyppi.org/jscolor/jscolor.js
// @author      TTH
// @timestamp   1383406844
// @version     4.4
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_openInTab
// @updateURL   https://userscripts.org/scripts/source/91377.meta.js
// @downloadURL https://userscripts.org/scripts/source/91377.user.js
// ==/UserScript==

/*

This copyright section and all credits in the script must be included in modifications or redistributions of this script.

 // Telkku Tuner is built over core functions and framework cut out from FFixer  version 2.1.3
 // FFixer is Copyright (c) 2010, Vaughan Chandler    http://userscripts.org/scripts/show/8861

Telkku Tuner (originally TelkkuFixer) is Copyright (c) 2013, TTH
Telkku Tuner is licensed under a Creative Commons Attribution-Share Alike 3.0 Unported License
License information is available here: http://creativecommons.org/licenses/by-sa/3.0/

*/

(function() {

if (self != window.top) { return; } // Don't run in frames

var version = '4.4';
var version_timestamp = 1383406844;
var release_date = 20131102;

/*
 * 4.4: (internal process of loosing fbf-stuff.)
 * 4.4: change: hide icos for hidden prgs (move them into a)
 * 4.4: feature: background colors for all highlights
 * 4.3: fix: show right highlight icos in fav.mngmnt
 * 4.3: fix: dont hide buttons in settings page
 */

var loc;
var page = '';
var lastPage = '';
var homePageNotModified = true;
var id = 0;
var language = 'fi';
var storage;

var lang = {
  // Finnish
  fi : {
    'all' : 'all',
    'All' : 'All',
    'Close' : 'Sulje',
    'ConfigureTelkkuFixer' : 'Tunaa Asetuksia',
    'ConfMainPageAdds': 'Poista p&auml;&auml;sivun mainokset',
    'ConfMainPageLogos': 'Poista Telkku-logo',
    'ConfMainPageShrink': 'Pienenn&auml; toolbar',
    'ConfBarCombine': '<small>UUSI</small> Yhdist&auml; kaikki K&auml;ytt&auml;j&auml; valikkoon',
    'ConfArticles': 'Poista artikkelit sivun lopusta',
    'ConfAddClean': 'Agressiivinen mainospoisto',
    'ConfLogosAsTxt': 'Kanavalogot tekstiksi',
    'ConfFaceBooks': 'Poista Facebook-like:t',
    'ConfGooglePlus': 'Poista Google+',
    'YColor':'Keltainen',
    'RColor':'Punainen',
    'GColor':'Vihre&auml;',
    'BYColor':'Keltainen',
    'BRColor':'Punainen',
    'BGColor':'Vihre&auml;',
    'CPToggle':'N&auml;yt&auml; kuluvan ohjelman v&auml;ri',
    'CodeToggle':'N&auml;yt&auml; v&auml;rien html-koodit',
    'ctHelp':'Checkbox=K&auml;yt&auml; omaa arvoa. &nbsp; T=Tekstin väri, B=Taustan väri, R=reset',
    'Rowd-info':'Jos "rivit&auml; kellonajat", ajan taustav&auml;ri ei muutu',
    'ConfHideY':'Piilota',
    'ConfHideR':'Piilota',
    'ConfHideG':'Piilota',
    'ConfHideBY':'Piilota',
    'ConfHideBR':'Piilota',
    'ConfHideBG':'Piilota',
    'ConfSingleMenu':'Yhdist&auml; Ohjelmat ja K&auml;ytt&auml;j&auml; valikot',
    'ConfSetCPColor':'Vaihda kuluvan ohjelman v&auml;ri',
    'ConfSetTTColor':' ',
    'ConfSetNTColor':' ',
    'ConfSetTBColor':' ',
    'ConfSetNBColor':' ',
    'ConfSetHTColor':' ',
    'ConfSetRTColor':' ',
    'ConfSetGTColor':' ',
    'ConfSetYTColor':' ',
    'ConfSetBRTColor':' ',
    'ConfSetBGTColor':' ',
    'ConfSetBYTColor':' ',
    'ConfSetHBColor':' ',
    'ConfSetRBColor':' ',
    'ConfSetGBColor':' ',
    'ConfSetYBColor':' ',
    'ConfSetBRBColor':' ',
    'ConfSetBGBColor':' ',
    'ConfSetBYBColor':' ',
    'ConfHideComments':'Poista keskustelut ja kommentit',
    'ConfBigPicture':'Iso kuva infoissa, (piilota my&ouml;s keskustelut)',
    'ConfHideStars':'Poista t&auml;hti-ratingsit',
    'ConfHidePlate':'Latauksen aikainen piilotus',
    'ConfHideRecord':'Poista tallennustoiminnot',
    'ConfHideCal':'Poista kalenteriin lis&auml;ys toiminnot',
    'ConfHideUserName':'<small>UUSI</small> Piilota k&auml;ytt&auml;j&auml;nimi',
    'ConfLowWidth':'Sivun leveys vapautus - Sallii kapeamman n&auml;yt&ouml;n',
    'ConfClock':'Lis&auml;&auml; kello - Oman koneesi kellonaika toolbar:iin.',
    'ConfRowd':'Rivit&auml; kellonajat - Mahdollistaa kapeamman n&auml;yt&ouml;n',
    'ConfTTLanguage':'Kieli',
    'HideProgram':'Piilota n&auml;kyvist&auml;',
    'UnhideProgram':'Palauta n&auml;kyviin',
    'ConfSectionHomePage':'Optiot',
    'ConfSectionAdvanced':'V&auml;rit',
    'ConfSectionAbout':'About',
    'ConfigureInstructions' : 'Muutokset tallentuvat v&auml;litt&ouml;m&auml;sti, mutta n&auml;kyv&auml;t vasta seuraavan sivun p&auml;ivityksen j&auml;lkeen.',
    'Updates' : '<a href="#" id="fbfUpdateLink" onclick="return false;">Testaa nyt</a> onko telkku.tyyppi.org:issa uutta versiota.',
    'Refresh' : 'P&auml;ivit&auml;',
    'UpdateAvailable1' : 'P&auml;ivitys on saatavilla Telkku Tuner:iin',
    'UpdateAvailable2' : 'Asennetaanko nyt?',
    'UpdateHomepage' : 'Avaa telkku.tyyppi.org',
    'UpdateInstall' : 'Asenna nyt',
    'UpdateTomorrow' : 'Ei t&auml;n&auml;&auml;n',
    'yearsOld' : '%s years old',
    'Font' : 'Teksti',
    'F' : 'T',
    'B' : 'B',
    'R' : 'R',
    'Background' : 'Tausta',
    'Hover' : 'Hover',
    'Times' : 'Ajat',
    'Hide': 'Piilota',
    'Hidden': 'Piilotettu',
    'Normal': 'Normaali',
    'NoUpdateAvail': 'Ei uutta versiota saatavilla.'
  },
  en : {
    'all' : 'all',
    'All' : 'All',
    'Close' : 'Close',
    'ConfigureTelkkuFixer' : 'Configure Telkku Tuner',
    'ConfMainPageAdds': 'Hide main page adds',
    'ConfMainPageLogos': 'Hide telkku-logo',
    'ConfMainPageShrink': 'Shrink the toolbar',
    'ConfBarCombine': '<small>NEW</small> Merge all to User menu',
    'ConfArticles': 'Hide articles below program list',
    'ConfAddClean': 'Agressive ad clean',
    'ConfLogosAsTxt': 'Logos as text',
    'ConfFaceBooks': 'Hide all Facebook-likes',
    'ConfGooglePlus': 'Hide all Google+',
    'YColor':'Yellow',
    'RColor':'Red',
    'GColor':'Green',
    'BYColor':'Yellow BG',
    'BRColor':'Red BG',
    'BGColor':'Green BG',
    'ConfHideY':'Hide',
    'ConfHideR':'Hide',
    'ConfHideG':'Hide',
    'ConfHideBY':'Hide',
    'ConfHideBR':'Hide',
    'ConfHideBG':'Hide',
    'CPToggle':'Show current program color',
    'CodeToggle':'Show color html-codes',
    'Rowd-info':'If "Remove time column", background of time does not change',
    'ConfSingleMenu':'Merge Programs and User menus',
    'ConfSetCPColor':'Change Current Program Background',
    'ConfSetTTColor':' ',
    'ConfSetNTColor':' ',
    'ConfSetTBColor':' ',
    'ConfSetNBColor':' ',
    'ConfSetHTColor':' ',
    'ConfSetRTColor':' ',
    'ConfSetGTColor':' ',
    'ConfSetYTColor':' ',
    'ConfSetBRTColor':' ',
    'ConfSetBGTColor':' ',
    'ConfSetBYTColor':' ',
    'ConfSetHBColor':' ',
    'ConfSetRBColor':' ',
    'ConfSetGBColor':' ',
    'ConfSetYBColor':' ',
    'ConfSetBRBColor':' ',
    'ConfSetBGBColor':' ',
    'ConfSetBYBColor':' ',
    'ConfHideComments':'Hide all user comments',
    'ConfBigPicture':'Show big picture in info, (usable with:Hide user comments)',
    'ConfHideStars':'Hide user star ratings',
    'ConfHidePlate':'Load time hide plate',
    'ConfHideRecord':'Hide recorder buttons',
    'ConfHideCal':'Hide Add to calendar',
    'ConfHideUserName':'<small>NEW</small> Hide your username',
    'ConfLowWidth':'Remove min-width requirement',
    'ConfClock':'Add (local) clock to toolbar',
    'ConfRowd':'Remove time column - join with program names',
    'ConfTTLanguage':'Language',
    'HideProgram':'Hide program',
    'UnhideProgram':'Restore program',
    'ConfSectionHomePage':'Options',
    'ConfSectionAdvanced':'Colors',
    'ConfSectionAbout':'About',
    'ConfigureInstructions' : 'Changed settings are stored immediately, result visible after next refresh.',
    'Updates' : '<a href="#" id="fbfUpdateLink" onclick="return false;">Check now</a> does telkku.tyyppi.org have new version available.',
    'Refresh' : 'Refresh',
    'UpdateAvailable1' : 'An update is available for Telkku Fixer',
    'UpdateAvailable2' : 'Would you like to update now?',
    'UpdateHomepage' : 'Go to homepage',
    'UpdateInstall' : 'Install now',
    'UpdateTomorrow' : 'Remind me tomorrow',
    'yearsOld' : '%s years old',
    'Font' : 'Font',
    'F' : 'F',
    'B' : 'B',
    'R' : 'R',
    'Background' : 'BG',
    'Hover' : 'Hover',
    'Times' : 'Times',
    'Hide'  : 'Hide',
    'Hidden' :'Hidden',
    'Normal':'Normal',
    'NoUpdateAvail': 'No update is available for Telkku Tuner.'
  },

}

function debug(){}
// DEBUG ONLY!
/* *
function debug(text) {
  var div = document.createElement('div');
  div.innerHTML = text;
  $('fbf-debug').insertBefore(div,$('fbf-debug').firstChild);
}
var dbg = document.createElement('div');
dbg.id='fbf-debug';
//dbg.style.display='none';
addStyle('#fbf-debug { position:fixed; left:0; bottom:0; right:0; padding:5px; z-index:1000; height:125px; background:rgba(200,200,200,0.8); border-top:1px solid black; overflow:auto; }');
document.body.appendChild(dbg);
debug('Loaded');
/* */


//
// Greasemonkey functions / cross-browser stuff
//

// Figure out what type of storage should be used, prefer localstorage
var storage = 'none';
if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }
if( storage=='none' )
 try {
  if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
    // Make sure greasemonkey's functions work cause some browsers lie. Yes Chrome/Chromium, I'm talking about you...
    GM_setValue('testkey', 'testvalue');
    if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
  }
} catch(x) {}

function setValue(key, value) {
  switch (storage) {
    case 'localstorage':
      localStorage['tt-'+key] = value;
      break;
    case 'greasemonkey':
      GM_setValue('tt-'+key, value);
      break;
  }
  prefs[key] = value;
}

function getValue(key, value) {
  switch (storage) {
    case 'localstorage':
      var val = localStorage['tt-'+key];
      if (val=='true') { return true; }
      else if (val=='false') { return false; }
      else if (val) { return val; }
      break;
    case 'greasemonkey':
      return GM_getValue('tt-'+key, value);
  }
  return value;
}

function getValueOld(key, value) {
  //check GM-side
  var gmvar=undefined;
  try {
    if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
      gmvar = GM_getValue(id+'-'+key);
    }
  } catch(x) {}
  if (gmvar) { logentry('GM_'+key+'='+gmvar); return gmvar; }

  if ( storage=='localstorage')
  {
    var val = localStorage['fbf-'+id+'-'+key];
    if (val=='true') { return true; }
    else if (val=='false') { return false; }
    else if (val) { return val; }
  }
  return value;
}
function listOld()
{
  try  {
      logentry( 'GM_:'+GM_listValues());
  } catch(x) {}
  {
      var str='LS:';
      for(var i in localStorage)
      {
        str += i+'='+localStorage[i] +',';
      }
      logentry(str);
  }
  return;
}
function eraseOldValues( )
{
  var str='ERASE:';
  try {
    var keys = GM_listValues();
    var key;
    for (var i=0; key=keys[i]; i++) {
      if ( key.match( '^0-' ) ) {
        str += 'GM_'+key+',';
        GM_deleteValue(key);
      } 
      //else { str += 'KG_'+key+','; }
    }
  } catch(x) {}
  str+='.';
  {  
    for(var i in localStorage)
    {
      if ( i.match( '^fbf-0-' ) ) {
        str += i+',';
        localStorage.removeItem(i);
      }
    }
  }
  logentry(str);
  return;
}

//check if the previous sibling node is an element node
function get_previoussibling(n)
{
  x=n.previousSibling;
  while (x.nodeType!=1)
  {
    x=x.previousSibling;
  }
  return x;
}
//check if the previous sibling node is an element node
function get_firstchild(n)
{
  x=n.firstChild;
  if ( x ) 
  {
  
  while (x.nodeType!=1)
  {
    x=x.nextSibling;
  }
  }
  return x;
}
//check if the previous sibling node is an element node
function get_nextsibling(n)
{
  x=n.nextSibling;
  while (x.nodeType!=1)
  {
    x=x.nextSibling;
  }
  return x;
}

function logentry(str) {
  //if (typeof debug !== 'undefined') { debug(str); }
  //if (typeof GM_log !== 'undefined') { GM_log(str); return true; }
  //else 
if (typeof console !== 'undefined' && console.log) { console.log(str); return true; }
  return false;
}

function addStyle(css) {
  if (typeof GM_addStyle !== 'undefined') { return GM_addStyle(css); }
  else if (heads = document.getElementsByTagName('head')) {
    var style = document.createElement('style');
    try { style.innerHTML = css; }
    catch(x) { style.innerText = css; }
    style.type = 'text/css';
    heads[0].appendChild(style);
  }
}

function registerMenuCommand(name, func) {
  if (typeof GM_registerMenuCommand !== 'undefined') { return GM_registerMenuCommand(name, func); }
}

function xmlhttpRequest(params, callBack) {
  if (typeof GM_xmlhttpRequest !== 'undefined') {
    params['onload'] = callBack;
    return GM_xmlhttpRequest(params);
  }
  return null;
}

function openInTab(url) {
  if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
  else { window.open(url); }
}

/* // internal comments
 COLORS:              MODES:
  N=Normal             cT = Text of C
  T=Time               cB = Back of C
  H=Hover
  R=Red
  G=Green
  Y=Yellow
  BR,BG,BY=Back*
       
fbfConf G  Color
fbfConf BY Color
*/

var buf  = 'MainPageAdds,Articles,MainPageLogos,MainPageShrink,FaceBooks,GooglePlus,'   
  +'HideY,!HideR,!HideG,!HideBY,!HideBR,!HideBG,'
  +'!SingleMenu,!BarCombine,'
  +'SetTTColor,SetTBColor,'
  +'SetNTColor,SetNBColor,'
  +'!SetBRTColor,!SetBGTColor,!SetBYTColor,'
  +'!SetRTColor,!SetGTColor,!SetYTColor,'
  +'!SetBRBColor,!SetBGBColor,!SetBYBColor,'
  +'!SetRBColor,!SetGBColor,!SetYBColor,'
  +'SetHTColor,SetHBColor,'
  +'!SetCPColor,'
  +'!HideUserName,HideComments,'
  +'BigPicture,HideStars,!HidePlate,HideRecord,HideCal,LowWidth,Rowd,Clock,AddClean,!LogosAsTxt';
var booleanOptions = buf.split(',');
var defColors = {
  'NBColor':   '#ffffff',
  'NTColor':   '#282828',
  'HTColor':   '#ff0000',
  'HBColor':   '#E6F2FF',
  'TTColor':   '#282828',
  'TBColor':   '#E6F2FF',
  'RTColor':   '#FF0000',
  'GTColor':   '#068900',
  'YTColor':   '#FFC208',
  'RBColor':   '#ffffff',
  'GBColor':   '#ffffff',
  'YBColor':   '#ffffff',
  
  'CPColor':   '#C4E3FF',
  'BRTColor':  '#282828',
  'BRBColor':  '#FF6E5B',
  'BGTColor':  '#282828',
  'BGBColor':  '#5AFB5D',
  'BYTColor':  '#282828',
  'BYBColor':  '#FFC859'
}
var prefs = {
  'TTLanguage': getValue('TTLanguage','fi'),
  'NBColor': getValue('NBColor','#bbccbb'),
  'NTColor': getValue('NTColor','#000000'),
  'HTColor': getValue('HTColor','#ff0000'),
  'HBColor': getValue('HBColor','#E6F2FF'),
  'TTColor': getValue('TTColor','#443333'),
  'TBColor': getValue('TBColor','#bbccbb'),
  'RTColor': getValue('RTColor',   '#FFC208'),
  'GTColor': getValue('GTColor',   '#FFC208'),
  'YTColor': getValue('YTColor',   '#FFC208'),
  'RBColor': getValue('RBColor',    '#bbccbb'),
  'GBColor': getValue('GBColor',    '#bbccbb'),
  'YBColor': getValue('YBColor',    '#bbccbb'),
  
  'CPColor':   getValue('CPColor',  '#C4E3FF'),
  'BRTColor':  getValue('BRTColor',  '#282828'),
  'BRBColor':  getValue('BRBColor',   '#FF6E5B'),
  'BGTColor':  getValue('BGTColor',  '#282828'),
  'BGBColor':  getValue('BGBColor',   '#5AFB5D'),
  'BYTColor':  getValue('BYTColor',  '#282828'),
  'BYBColor':  getValue('BYBColor',   '#FFC859'),
}
for (var i=0; i<booleanOptions.length; i++) {
  bool = true;
  if (booleanOptions[i].charAt(0)=='!') {
    booleanOptions[i] = booleanOptions[i].replace('!','');
    bool = false;
  }
  prefs[booleanOptions[i]] = getValue(booleanOptions[i], bool)
}

// PARAM CONVERT FROM OLD TO NEW
var tmp = getValue('version');
var oldbc = getValueOld('BackColor');
var oldad = getValueOld('MainPageAdds');
function o2n(ok,nk) {
 var ov = getValueOld(ok);
 var nv = getValue(nk);
 setValue(nk,ov);
 logentry(' Convert '+ok+'('+ov+') => '+nk+'('+nv+') = '+getValue(nk) );
}
logentry('Version = ' + tmp + ','+oldbc+','+oldad);
listOld();

if ( !tmp && (oldbc!=undefined || oldad!=undefined) )
{
  logentry('Config conversion into '+version);
  o2n( 'BackColor','NBColor');
  o2n( 'TextColor','NTColor');
  o2n( 'HoverColor','HTColor');
  o2n( 'HoverBColor','HBColor');
  o2n( 'TimeColor', 'TTColor');
  o2n( 'TimeBColor', 'TBColor');
  o2n( 'BRColor', 'BRBColor');
  o2n( 'BGColor', 'BGBColor');
  o2n( 'BYColor', 'BYBColor');

  for (var i=0; i<booleanOptions.length; i++) {
    o2n( booleanOptions[i], booleanOptions[i] );
  }
  setValue('version',version);  
  eraseOldValues();
  window.alert('TelkkuTuner p&auml;ivittyi, asetukset konvertoitiin. Seuraava refresh on taas oikein.');
  return;
}

language = prefs['TTLanguage'];

function preInitTelkkuTuner()
{
  //
  // Add styles used by script
  //
  addStyle(
    '.fbfPopup { background:#f6f6f6; color:#111; border:3px double #666666; -moz-border-radius:5px; -webkit-border-radius:5px; -khtml-border-radius:5px; border-radius:5px; }'+
    '.fbfPopupContainer { display:none; top:0; right:0; bottom:0; left:0; }'+
    '#FBFConfigContainer { z-index:1001; }'+
    '#FBFConfig { width:700px; padding:10px; margin:20px auto 0; }'+
    '#FBFConfig label {  font-weight:normal; display:inline; } '+
    '#fbfConfigControls div#fbfConfigControl-0 label {padding-right:1em; color:#666666; }'+
    '#FBFConfig .fbfHeader { font-weight:bold; }'+
    '#FBFConfigShadow, #fbfShadow { display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:black; opacity:0.8; }'+
    '#fbfUpdatePopup { max-width:450px; margin:100px auto; padding:10px; }'+
    '.fbfImportant { font-weight:bold; }'+
    '.fbfNote { color:#777777; }'+
    '.fbfRight { text-align:right; }'+
    '.ad_story .social_ad_advert { z-index:0; }'+
    '.ttReset { text-decoration:underline;color:blue;cursor:pointer; display:block; margin: 1px 5px 0px 5px;}'+
    '.ctHelp { font-style: italic; opacity:.8; }'
  );


  if (isMainPage())
  {
    //
    // Add div for popups and shadows
    //
    var popupDiv = document.createElement('div');
    popupDiv.id = 'fbfPopupContainer';
    popupDiv.className = 'fbfPopupContainer';
    document.body.appendChild(popupDiv);
    var shadowDiv = document.createElement('div');
    shadowDiv.id = 'fbfShadow';
    document.body.appendChild(shadowDiv);

    var popupscript = document.createElement('script');

    popupscript.innerHTML =  'var TFprogramId="0"; function setPI(v){ TFprogramId=v;} function infop(u) {  IPW=window.open(\'tiedot?oid=\'+u,\'IP\',"menubar=no,location=no,resizable=1,width=650,height=250");  IPW.focus();}';
    document.body.appendChild(popupscript);
  }
  addStyle(
    '#fbfConfigContainer { width:100%; }'+
    '#fbfConfigTabs { width:200px; vertical-align:top; }'+
    '#fbfConfigTabs div { float:left; width:31%; background:white; color:#3b5998; padding:10px 0 10px 10px; border:1px solid #cccccc; border-top-width:0; cursor:pointer; }'+
    '#fbfConfigTabs div#fbfConfigTab-0 { border-top-width:1px; }'+
    '#fbfConfigTabs div:hover { font-weight:bold; }'+
    '#fbfConfigTabs div.fbfConfigSelectedTab { background:#3b5998; color:white; font-weight:bold; }'+
    '#fbfConfigControls { background:white; border:1px solid #cccccc; vertical-align:top; }'+
    '#fbfConfigControls div { display:none; padding:5px 5px 5px 5px; }'+
    '#fbfConfigControls div.fbfConfigSelectedControl { display:block; }'+
    '#fbfConfigControls div#fbfConfigControl-0 {padding-left:25px }'+
    '#fbfConfigControls #fbfConfigControl-0 input[type=checkbox] { margin-left:-18px; margin-bottom:8px; }'+
    '#xfbfConfigControls #colortest input[type=checkbox], #fbfConfigControls #fbfConfigControl-1 input[type=checkbox] { margin-left:0px; margin-bottom:0px; }'+
    '#rcolortest:hover { width:auto !important;}'
  );
  
}
//
// Misc. Short Functions
//

// Get element by id
function $(id,root) { /*if ((root||document).getElementById(id))*/ return (root||document).getElementById(id); window.alert('no id:'+id); return null;}

// Get element(s) by class name
function $c(className,root){
  if (document.getElementsByClassName) { return (root||document).getElementsByClassName(className); }
  else {
    var elms = $x('.//*[contains(@class,"'+className+'")]',root);
    var buffer = new Array();
    for (var i=0; i<elms.snapshotLength; i++) { buffer.push(elms.snapshotItem(i)); }
    return buffer;
  }
}
function $c1(className,root){
  if (document.getElementsByClassName) { return (root||document).getElementsByClassName(className)[0]; }
  else { return $x1('.//*[contains(@class,"'+className+'")][1]',root); }
}

// XPath
function $x(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null); }
function $x1(xpath,root) { return document.evaluate(xpath,(root?root:document),null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue; }

// Get a string in the current language, or default to english
function $l(key,text) {
  var string, l;
  if (lang[language][key]) { string = lang[language][key]; l = language; }
  else { string = lang['en'][key]; l = 'en'}
  if (text) { string = string.replace('%s', text); }
  return string;
}

// Pad with a 0
function $0(x) { return x<10 ? '0'+x : ''+x; }

// Add 'click' event listener
function onClick(id,func){
  if ($(id))
    $(id).addEventListener('click',func,false);
  else
    logentry('NO onclick:'+id);
}
// Add 'change' event listener
function onChange(id,func){$(id).addEventListener('change',func,false);}

// Click on an element
function click(elm) {
  var evt = document.createEvent('MouseEvents');
  evt.initEvent('click', true, true);
  elm.dispatchEvent(evt);
}

// Determine if we're on the home page
function isHomePage() {
         return true;
//  return !!(page.match(/^((\?|home\.php).*)?$/));
}
function isMainPage(){
  return !!(page.match(/^((\?|programtable).*)?$/));
}
function isInfoPage(){
  return !!(page.match(/^program.show..*$/));
}

// Log an error
function logError(category, x) {
  msg = "TF Error (" + category + ") - " +  x.name + ' - ' + x.message + ' in file <' + x.fileName + '> on line ' + x.lineNumber + ' while viewing ' + page;
  logentry(msg);
}

// Show a popup div with a shadow background
function showPopup(content, onTop, fixedPosition) {
  $('fbfPopupContainer').innerHTML = content;
  $('fbfPopupContainer').style.position = fixedPosition ? 'fixed' : 'absolute';
  if (true || onTop) {
    $('fbfShadow').style.zIndex = '1000';
    $('fbfPopupContainer').style.zIndex = '1001';
  } else {
    $('fbfShadow').style.zIndex = '1';
    $('fbfPopupContainer').style.zIndex = '2';
  }
  $('fbfShadow').style.display = 'block';
  $('fbfPopupContainer').style.display = 'block';
  if (!fixedPosition) { window.scroll(0,0); }
}

// Hide popups created with showPopup()
function hidePopup() {
  if ($('fbfPopupContainer')) {
    $('fbfPopupContainer').style.display = 'none';
    $('fbfShadow').style.display = 'none';
  }
}

getDocument = function() {
   return (document.body?document.body:(document.documentElement?document.documentElement:document.getElementsByTagName('div')[0]));
};

function anyColorChange(){

  if (prefs['SetTTColor'])
  {
    document.getElementById('cttime').style.color=prefs['TTColor'];
  } else {
    document.getElementById('cttime').style.color=defColors['TTColor'];
  }
  if (prefs['Rowd'])
  {
    document.getElementById('cttime').style.background='inherit';
  } else {
    if (prefs['SetTTColor']) // ONLY *T
    {
      document.getElementById('cttime').style.background=prefs['TBColor'];
    } else {
      document.getElementById('cttime').style.background=defColors['TBColor'];
    }
  }

  if (jQuery('#fbfCPToggle')[0].checked)
  {
    document.getElementById('ctCPColor').style.backgroundColor=document.getElementById('fbfConfCPColor').value;
  }
  if (prefs['SetNTColor'])
  { 
    document.getElementById('colortest').style.color=prefs['NTColor'];
  } else{
    document.getElementById('colortest').style.color=defColors['NTColor'];
  }
  if (prefs['SetNTColor']) // ONLY *T
  { 
    document.getElementById('colortest').style.backgroundColor=prefs['NBColor'];
  } else{
    document.getElementById('colortest').style.backgroundColor=defColors['NBColor'];
  }
  var ctvalues = new Array('R','G','Y','BR','BG','BY','H');
  for (var i=0; i<ctvalues.length; i++) {
    var ctc = ctvalues[i]+'Color';
    var cttc = ctvalues[i]+'TColor';
    var ctbc = ctvalues[i]+'BColor';
    //'TextColor',
    if ( prefs['Set'+cttc] ) {
      $('ct'+ctc).style.color=prefs[cttc];
    } else {
      $('ct'+ctc).style.color=defColors[cttc];
    }
    //'BackColor' 
    if ( prefs['Set'+ctbc]) {
      $('ct'+ctc).style.backgroundColor=prefs[ctbc]; }
    else if (ctc[0] == 'B') {
      $('ct'+ctc).style.backgroundColor=defColors[ctbc]; }
    else {
      $('ct'+ctc).style.backgroundColor='inherit'; }
  }
  
  var hids = ['Y','R','G','BY','BR','BG'];
  for ( h in hids )
  {
    if (prefs['Hide'+hids[h]])
    { 
      document.getElementById('ct'+hids[h]+'Color').innerHTML = '+ '+$l('Hidden');
      document.getElementById('ct'+hids[h]+'Color').style.width = '1em';
    } else {
      document.getElementById('ct'+hids[h]+'Color').innerHTML = $l(hids[h]+'Color');
      document.getElementById('ct'+hids[h]+'Color').style.width = 'auto';
    }
  }
}

function showConfig() {

  function makeCheckBox(id1) {
    var buf = '';
    buf = '<input type="checkbox" id="fbfConf' + id1 + '" /><label for="fbfConf' + id1 + '">' + $l('Conf'+id1) + '</label>';
    return buf;
  }
  function makeCheckBoxes(ids) {
    ids = ids.split(',');
    var buf = '';
    for (var i=0; i<ids.length; i++) { buf = buf + makeCheckBox( ids[i] ) + '<br />'; }
    return buf;
  }
  function makeNumberInputs(ids) {
    ids = ids.split(',');
    var buf = '';
    for (var i=0; i<ids.length; i++) { buf = buf + $l('Conf'+ids[i]) + '<br /><input type="text" id="fbfConf' + ids[i] + '" value="' + prefs[ids[i]] + '" /><br />'; }
    return buf;
  }
  function makeColorCfg( clor ) {
    jQuery('#tt'+clor)[0].innerHTML = makeCheckBox('Set'+clor+'TColor')
    + '<input type="button" class="ttB" value="'+$l('F')+'" id="ttCB'+clor+'T" >'
    + '<input type="button" class="ttB" value="'+$l('R')+'" id="ttRB'+clor+'T" ><br>'
    + makeCheckBox('Set'+clor+'BColor')
    + '<input type="button" class="ttB" value="'+$l('B')+'" id="ttCB'+clor+'B" >'
    + '<input type="button" class="ttB" value="'+$l('R')+'" id="ttRB'+clor+'B" >'

    onClick('ttCB'+clor+'T', function(){this.color= new jscolor.color(this,{styleElement:'',valueElement:'fbfConf'+clor+'TColor'}); this.color.showPicker()}, false);
    onClick('ttCB'+clor+'B', function(){this.color= new jscolor.color(this,{styleElement:'',valueElement:'fbfConf'+clor+'BColor'}); this.color.showPicker()}, false);
    onClick('ttRB'+clor+'T', function(){ $('fbfConf'+clor+'TColor').value = defColors[clor+'TColor']; setValue(clor+'TColor',defColors[clor+'TColor']);}, false);
    onClick('ttRB'+clor+'B', function(){ $('fbfConf'+clor+'BColor').value = defColors[clor+'BColor']; setValue(clor+'BColor',defColors[clor+'BColor']);}, false);
    
    //document.getElementById('fbfConf'+key+'Color').color.fromString(defColors[key+'Color']);
    //setValue(key+'Color', defColors[key+'Color']);
    }
  function makeColorCfgs( arr ) {
    for ( one in arr ) makeColorCfg( arr[one] );
  }
  showPopup(
   
    '<div id="FBFConfig" class="fbfPopup">'+
    '<div style="text-align:center;"><span class="fbfImportant">' + $l('ConfigureTelkkuFixer') + '</span><br /><span class="fbfNote">(Telkku Tuner ' + version + ' - ' + release_date + ')</span></div><br />'+
    $l('ConfigureInstructions') + '<br />'+
    '<br />'+
    '<table id="fbfConfigContainer">'+
      '<tr><td id="fbfConfigTabs">'+
          '<div id="fbfConfigTab-0" class="fbfConfigSelectedTab">' + $l('ConfSectionHomePage') + '</div>'+
          '<div id="fbfConfigTab-1">' + $l('ConfSectionAdvanced') + '</div>'+
          '<div id="fbfConfigTab-2">' + $l('ConfSectionAbout') + '</div>'+
      '</td></tr><tr><td id="fbfConfigControls">'+
        '<div id="fbfConfigControl-0" class="fbfConfigSelectedControl">'+
          '<span style="display:block;width:49%;float:left;">'+
          makeCheckBoxes('MainPageAdds,AddClean,Articles,MainPageLogos,MainPageShrink,BigPicture,LowWidth,SingleMenu,BarCombine,HideUserName')+
          '</span><span style="display:block;width:49%;float:left;">'+
          makeCheckBoxes('HideComments,HideStars,HideRecord,HideCal,FaceBooks,GooglePlus,Rowd,Clock,HidePlate,LogosAsTxt')+
          '</span>'+
        '</div>'+

        '<div id="fbfConfigControl-1">'+
          '<span class="ctHelp">'+$l('ctHelp')+'</span><br/>'+
          '<span class="ctHelp">'+$l('Rowd-info')+'</span>'+
          '<table border=1 id="colortest" style="white-space:nowrap;">'+
          '<tr id="ctCPColor"><td></td><td id="cttime">'+$l('Times')+'</td><td>'+$l('Normal')+'</td>'+
          '<td id="ctHColor">'+$l('Hover')+'</td>'+
          '<td id="ctYColor">'+$l('YColor')+'</td><td id="ctRColor">'+$l('RColor')+'</td><td id="ctGColor">'+$l('GColor')+'</td>'+
          '<td id="ctBYColor">Kelta</td><td id="ctBRColor">Puna</td><td id="ctBGColor">Vihr</td></tr>'+
          
          '<tr><td>'+$l('Font')+'<br/>'+$l('Background')+'</td>'+
          '<td id="ttT">'+
          '<td id="ttN">'+ 
          '<td id="ttH">'+
          '<td id="ttY">'+ 
          '<td id="ttR">'+           
          '<td id="ttG">'+ 
          '<td id="ttBY">'+
          '<td id="ttBR">'+
          '<td id="ttBG">'+
          
          '<tr id="ctCodes" style="display:none;"><td>Codes'+
          '<td>'+
          '<input class="" size="7" id="fbfConfTTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfTBColor"></input>'+
          '<td>'+
          '<input class="" size="7" id="fbfConfNTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfNBColor"></input>'+
          '<td>'+
          '<input class="" size="7" id="fbfConfHTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfHBColor"></input>'+          
          '<td>'+
          '<input class="" size="7" id="fbfConfYTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfYBColor"></input>'+
          '<td>'+
          '<input class="" size="7" id="fbfConfRTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfRBColor"></input>'+
          '<td>'+
          '<input class="" size="7" id="fbfConfGTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfGBColor"></input>'+
          '<td>'+          
          '<input class="" size="7" id="fbfConfBYTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfBYBColor"></input>'+
          '<td>'+
          '<input class="" size="7" id="fbfConfBRTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfBRBColor"></input>'+
          '<td>'+          
          '<input class="" size="7" id="fbfConfBGTColor"></input><br/>'+
          '<input class="" size="7" id="fbfConfBGBColor"></input>'+

          '<tr>'+
          '<td>'+$l('Hide')+
          '<td colspan="3">'+
          '<td>'+makeCheckBoxes('HideY')+
          '<td>'+makeCheckBoxes('HideR')+
          '<td>'+makeCheckBoxes('HideG')+
          '<td>'+makeCheckBoxes('HideBY')+
          '<td>'+makeCheckBoxes('HideBR')+
          '<td>'+makeCheckBoxes('HideBG')+
          
          '</tr></table>'+
          '<table><tr><td>'+makeCheckBoxes('SetCPColor')+
          '</td><td><input class="color" size="7" id="fbfConfCPColor"></input></td>'+
          '<td><span class="ttReset" id="fbfResetCPC">reset</span></td>'+
          '<td><input type="checkbox" id="fbfCPToggle" onclick="document.getElementById(\'ctCPColor\').style.backgroundColor=this.checked?document.getElementById(\'fbfConfCPColor\').value:\'inherit\'"><label for="fbfCPToggle" class="ctHelp">'+$l('CPToggle')+'</label></td></tr>'+
          '<tr><td colspan="4">&nbsp;<hr/><input type="checkbox" id="fbfCodeToggle" onclick="document.getElementById(\'ctCodes\').style.display=this.checked?\'table-row\':\'none\'"><label for="fbfCodeToggle" class="ctHelp">'+$l('CodeToggle')+'</label>'+
          '</table>'+
          '<br/>'+
     

        '</div>'+
        '<div id="fbfConfigControl-2">'+
          '<span xmlns:dc="http://purl.org/dc/elements/1.1/" property="dc:title"><a href="http://telkku.tyyppi.org/" target="_blank">Telkku Tuner</a></span> by <span xmlns:cc="http://creativecommons.org/ns#" property="cc:attributionName">TTH</span> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/">Creative Commons Attribution-Share Alike 3.0 Unported License</a>.<br /><br /><a rel="license" href="http://creativecommons.org/licenses/by-sa/3.0/"><img alt="Creative Commons License" style="border-width:0;" src="http://i.creativecommons.org/l/by-sa/3.0/88x31.png" /></a><br /><br />'+

          $l('ConfTTLanguage') + ': <select id="fbfConfTTLanguage" style="padding:0; margin-top:3px;"><option value="en">English</option><option value="fi">Suomi</option></select><br/><br/>'+
          $l('Updates')+'<br/>'+

          '</div>'+
      '</td></tr>'+
    '</table>'+
    '<br /><hr /><div style="text-align:right;"><input type="button" value="' + $l('Refresh') + '" onclick="location.reload();" /> <input type="button" id="fbfCloseConfig" value="' + $l('Close') + '" /></div>'+
    '</div>', true
  );

  makeColorCfgs( ['T','N','R','G','Y','BR','BG','BY','H']);
    
  // Update fields to match current settings
  for (var i=0; i<booleanOptions.length; i++) {
    if (prefs[booleanOptions[i]]) 
    { 
      if ( $('fbfConf'+booleanOptions[i]))
        $('fbfConf'+booleanOptions[i]).checked='checked'; 
      else
        logentry("No checkbox: "+booleanOptions[i]);
    }
    onClick('fbfConf'+booleanOptions[i], function(e) {
      setValue(e.target.id.replace('fbfConf',''), e.target.checked);
      prefs[e.target.id.replace('fbfConf','')] = e.target.checked;
    });
  }
  onChange('fbfConfSetNTColor',function(){ jQuery('#fbfConfSetNBColor')[0].checked = this.checked; anyColorChange();})
  onChange('fbfConfSetNBColor',function(){ jQuery('#fbfConfSetNTColor')[0].checked = this.checked; anyColorChange();})
  onChange('fbfConfSetTTColor',function(){ jQuery('#fbfConfSetTBColor')[0].checked = this.checked; anyColorChange();})
  onChange('fbfConfSetTBColor',function(){ jQuery('#fbfConfSetTTColor')[0].checked = this.checked; anyColorChange();})
  
  $('fbfConfTTLanguage').value = prefs['TTLanguage'];
  $('fbfConfNBColor').value = prefs['NBColor'];
  $('fbfConfNTColor').value = prefs['NTColor'];
  $('fbfConfTTColor').value = prefs['TTColor'];
  $('fbfConfTBColor').value = prefs['TBColor'];
  $('fbfConfCPColor').value = prefs['CPColor'];
  $('fbfConfHTColor').value = prefs['HTColor'];
  $('fbfConfRTColor').value = prefs['RTColor'];
  $('fbfConfGTColor').value = prefs['GTColor'];
  $('fbfConfYTColor').value = prefs['YTColor'];
  $('fbfConfHBColor').value = prefs['HBColor'];
  $('fbfConfRBColor').value = prefs['RBColor'];
  $('fbfConfGBColor').value = prefs['GBColor'];
  $('fbfConfYBColor').value = prefs['YBColor'];
  $('fbfConfBRBColor').value = prefs['BRBColor'];
  $('fbfConfBRTColor').value = prefs['BRTColor'];
  $('fbfConfBGBColor').value = prefs['BGBColor'];
  $('fbfConfBGTColor').value = prefs['BGTColor'];
  $('fbfConfBYBColor').value = prefs['BYBColor'];
  $('fbfConfBYTColor').value = prefs['BYTColor'];

  jscolor.init();  

  // Listen for changes
  onClick('fbfConfigTabs', function(e) {
    var current = e.target;
    if (current.tagName=='DIV' && current.className != 'fbfConfigSelectedTab') {
      var previous = $c('fbfConfigSelectedTab')[0];
      previous.className='';
      $('fbfConfigControl-' + previous.id.match(/-(\d+)/)[1]).className = '';
      current.className = 'fbfConfigSelectedTab';
      $('fbfConfigControl-' + current.id.match(/-(\d+)/)[1]).className = 'fbfConfigSelectedControl';
    }
  });
  onClick('fbfConfRowd', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideY', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideR', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideG', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideBY', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideBR', function(e) {anyColorChange();}, false);
  onClick('fbfConfHideBG', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetNTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetNBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetTTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetTBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetCPColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetHTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetRTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetGTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetYTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBRTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBGTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBYTColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetHBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetRBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetGBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetYBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBRBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBGBColor', function(e) {anyColorChange();}, false);
  onClick('fbfConfSetBYBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfNTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfNBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfTTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfTBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfCPColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfHTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfRTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfGTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfYTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfHBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfRBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfGBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfYBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBRBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBGBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBYBColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBRTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBGTColor', function(e) {anyColorChange();}, false);
  onChange('fbfConfBYTColor', function(e) {anyColorChange();}, false);
  
  var cvalues = new Array('NBColor','NTColor','HTColor','HBColor','TTColor','TBColor','CPColor',
    'RBColor','GBColor','YBColor','RTColor','GTColor','YTColor',
    'BRBColor','BRTColor','BGBColor','BGTColor','BYBColor','BYTColor');
  for (var i=0; i<cvalues.length; i++) {
    $('fbfConf'+cvalues[i]).addEventListener('blur', function(e) { var k=e.target.id.replace('fbfConf',''); setValue(k, e.target.value); prefs[k] = e.target.value; anyColorChange() }, false);
    $('fbfConf'+cvalues[i]).addEventListener('change', function(e) { var k=e.target.id.replace('fbfConf',''); setValue(k, e.target.value); prefs[k] = e.target.value; anyColorChange() }, false);
  }
  anyColorChange();
  if (jQuery('#fbfUpdateLink').length) 
    onClick('fbfUpdateLink', function() { FBFUpdateCheck(true); });
  onClick('fbfCloseConfig', function() { hidePopup(); });

  onChange('fbfConfTTLanguage', function(e) {  setValue(e.target.id.replace(/^fbfConf/,''),e.target.options[e.target.selectedIndex].value); e.target.blur(); });  

  window.scroll(0,0);
}

function colorReset(e) {
  function colorResetSet( key )
  {
    document.getElementById('fbfConf'+key+'Color').color.fromString(defColors[key+'Color']);
    setValue(key+'Color', defColors[key+'Color']);
  }
  var targ;
  if (!e) var e = window.event;
  if (e.target) targ = e.target;
  else if (e.srcElement) targ = e.srcElement;
  if (targ.nodeType == 3) // defeat Safari bug
    targ = targ.parentNode;
  
  var target = targ.id.substr(8);
  if ( target == "Main" ) 
  {
    colorResetSet( 'Text' );
    colorResetSet( 'Back' );
  }
  else if ( target == "Time" ) 
  {
    colorResetSet( 'Time' );
    colorResetSet( 'TimeB' ); 
  }
  else if ( target == "Hover" )
  {
    colorResetSet( 'Hover' );
    colorResetSet( 'HoverB' );  
  }
  else if ( target == "CPC" )
  {
    colorResetSet( 'CP' );
  }
  // Bx => Bx+BxT / x => xT
  else if ( target.length == 2 )
  {
    colorResetSet( target );
  }
  if ( target.length < 3 )
  {
    colorResetSet( target+'T' );
  }
  anyColorChange();
}

//
// Check for Updates (very modified, originally based on code by Jarett - http://userscripts.org/users/38602)
//
var updateForced; 
function FBFUpdateCheck(forced) {
  if ((forced) || (parseInt(getValue("LastUpdate", "0")) + 86400000 <= (new Date().getTime()))) {
    updateForced = forced;
    debug('upd');
    try { 
      xmlhttpRequest({method: "GET",url: "https://userscripts.org/scripts/source/91377.meta.js?" + new Date().getTime(),headers: {'Cache-Control': 'no-cache'}}, handleUpdateResponse);
      debug('reqyest ok');
    }
    catch (err) {     
      debug('reg err'+err); 
      if (forced) { alert("An error occurred while checking for updates:\n" + err); } 
    }
  }
}
function handleUpdateResponse(r) {
  debug('respo');
  setValue('LastUpdate', new Date().getTime() + "");
  if (r.responseText.match(/@timestamp\s+(\d+)/)[1] > version_timestamp) {
    debug('showpo'); 
    showUpdatePopup();
  } else if (updateForced) { 
    alert( $l('NoUpdateAvail') ); 
  }
  debug('ebif');
}

function showUpdatePopup() {
  showPopup(''+
    '<div id="fbfUpdatePopup" class="fbfPopup"><div class="fbfImportant"></div>' + $l('UpdateAvailable1') + '<br /><br /><div class="fbfNote">' + $l('UpdateAvailable2') + '</div><br /><div class="fbfRight">'+
    '<input type="button" value="' + $l('UpdateInstall') + '" id="fbfUpdateInstall" //> '+
    '<input type="button" value="' + $l('UpdateHomepage') + '" id="fbfUpdateHomepage" > '+
    '<input type="button" value="' + $l('UpdateTomorrow') + '" id="fbfUpdateTomorrow" /></div></div>', true
  );
  onClick('fbfUpdateInstall', function() { openInTab('https://userscripts.org/scripts/source/91377.user.js'); hidePopup(); });
  onClick('fbfUpdateHomepage', function() { window.open('http://telkku.tyyppi.org/'); hidePopup(); });
  onClick('fbfUpdateTomorrow', hidePopup);
}

var preInited = false;
  //
  // Figure out what page we're looking at
  //
  loc = window.location.href.toLowerCase();
  page = loc.split('telkku.com/')[1];
  if (page.indexOf(';')!=-1) {
    buf = page.split(';');
    page = buf[0];
  }
  if (page.indexOf('#')!=-1) {
    buf = page.split('#');
    page = buf[0];
  }
  page = page.replace(/^!?\//,'');
  if (page!=lastPage) { logentry('Page => "' + page + '"'); }// DEBUG ONLY

function instantClear(postal)
{  
  if (document.body )
  {
  
    if (prefs['HidePlate']) {
      if (!document.getElementById('telkkuloader'))
      {
        var telkku = document.createElement('div');
        telkku.id = 'telkkuloader';
        telkku.innerHTML = 'Hetkinen<br/><small>Tietoja ladataan<br/><small>(click to show)</small></small>';
        telkku.onclick = function(){ jQuery("#telkkuloader").fadeOut(200);};
        telkku.style.cssText = 'transition: all 0.75s linear; -o-transition: all 0.75s linear; -webkit-transition: all 0.75s linear; -moz-transition: all 0.75s linear;'
        +'position:fixed;top:0px;left:0px;z-index:9999;opacity:1;height:100%;width:100%;background-color:'+prefs['NBColor']+';color:'+prefs['NTColor']+';font-size:200%;text-align:center;padding-top:5em;';
        document.body.appendChild( telkku );
      }      
    } 


    var x = null;
    
/*
    x = jQuery('script:contains("showAds : true")');
    if ( x.length )
    {
      if ( x.text().search('showAds : true','showAds : false') > -1 )
      {
        x.text( x.text().replace('showAds : true','showAds : false') );
        
        jQuery("body").append('<scr'+'ipt type="text/javascript">window.alert("changed");</script>');
      }
    }
*/
    if ( prefs['AddClean'] )
    {
      // dev
      x = jQuery('script[src*="EAS_fif.js"]');
      if (x.length) {
        x.remove();
      }
      x = jQuery('script[src*="eas.almamedia.fi"],div[id*="EAS_"],script[src*="adtlgc.com"]');
      if (x.length) {
        x.remove();
      }
      x = jQuery('script:contains("scorecardresearch"),noscript:contains("scorecardresearch")');
      if (x.length) {
        x.remove();
      }

      // dev

      if (prefs['Articles'])
      {
        x = jQuery('#articles');
        if (x.length) {
          x.remove();
        }
      }
      if (prefs['FaceBooks'])
      {
        x = jQuery('#fb-root,.facebookLike');
        if (x.length) {
          var fbs = x.next();
          if (fbs.length) 
            if (fbs.text().search('FB.init')>0) 
            {
              fbs.remove();
            }
          x.remove();
        }
      }
      if (prefs['MainPageAdds'])
      {
        x = jQuery('script[src*="eas.almamedia"]');
        if (x.length) {
          x.remove();
        }
        x = jQuery('.l-grid--16.l-wrap.rhythm-trailer');
        if (x.length) {
          x.remove();
        }
        x = jQuery('#OTITopBanner,#OTIRightBanner');
        if (x.length) {
          x.remove();
        }
        x = jQuery('#ilFrame');
        if (x.length) {
          x.parent().parent().remove();
        }
        x = jQuery('#klFrame');
        if (x.length) {
          x.parent().parent().remove();
        }
      }
    } // addclean
    if (!preInited)
    {
      preInited = true;
      preInitTelkkuTuner();
    }
    if ( document.readyState == "complete" )
    {
      //preInitTelkkuTuner();
      if (postal === undefined)
        processPage();
      return;
    }
  }
//window.alert('al');
  setTimeout( instantClear, 5 );
}


instantClear();



function processPage() {
  jQuery( '#telkkuloader' ).fadeOut(950);

  //
  // Allow script configuration
  //
  registerMenuCommand($l('ConfigureTelkkuFixer'), showConfig);
  if (menu = $('recorderPickerMenu')) {
    var configLink = document.createElement('span');
    configLink.innerHTML = '<a class="btn" id="fbfConfigMenuLink"  href="#" onclick="return false;" >Tuner</a>';
    configLink.setAttribute('style','float:right;');
    menu.parentNode.appendChild(configLink);
    $('fbfConfigMenuLink').addEventListener('click', showConfig, false);
  }
  // prepare for info window data addition
  jQuery('#modal-big').bind('DOMNodeInserted', function(event) {
    instantClear(1);
  });
  
  //
  // Customize
  //

  try {
    if (homePageNotModified) {
      var favicon = document.createElement('link');
      favicon.rel = 'icon';
      favicon.type = 'image/x-icon';
      favicon.href = 'http://tuner.tyyppi.org/favicon.ico';
      document.getElementsByTagName('head')[0].appendChild(favicon);
      document.getElementsByTagName('head')[0].insertBefore(favicon, document.getElementsByTagName('head')[0].childNodes[0]);

      if (loc.search('www.') >= 0 )
        jQuery('h1:contains("HTTP Status 500")').after("<div style='font-size:200%; border:3px inset red;'>Telkulla näyttää olevan ongelmia, <a href='http://www2.telkku.com/'>Kokeile toista palvelinta</a> -Terveisin TelkkuTuner</div>");
      
      if (isMainPage()){ // colors can be tricky, lets only fck them on mainpage
        if (prefs['SetNTColor']) {
          addStyle('body { background: '+prefs['NBColor']+'; color: '+prefs['NTColor']+'} div.theme-boxed--dark { border: 2px inset #334; background: '+prefs['NBColor']+'; } '+
          '#programTable a {color:'+prefs['NTColor']+';transition: color 0.75s linear 1s; -o-transition: color 0.75s linear 1s; -webkit-transition: color 0.75s linear 1s; -moz-transition: color 0.75s linear 1s;}');
        }
        if (prefs['SetTTColor']) {
          if (prefs['Rowd'])
            addStyle('.time {color:'+prefs['TTColor']+';}');
          else
            addStyle('#main .program-table .cellContainer { background: none; }'+
            '#main .program-table .programTableCell .is-current-program th.time, #main .program-table .programTableCell th.time {color:'+prefs['TTColor']+'; background: '+prefs['TBColor']+';}');
        }
        
        if (prefs['SetCPColor']) { 
          addStyle('#main .program-table .programTableCell .is-current-program, #main .program-table .programTableCell .is-current-program { background-color: '+prefs['CPColor']+'; }'
          +' #main .program-table .programTableCell .is-current-program .name, #main .program-table .programTableCell .is-current-program .time { background-color: inherit; }' );
        }
      }
      
      // Program name in info screen
      addStyle('.program-overlay__header #programName.title-block { width:90%;}');
      
      // remove the excess height of elems. // not make lines equal squares again
      // addStyle('html #programTable { line-height:normal;}'); 
      //addStyle('.programTableCell tbody tr {border-bottom: 1px dotted blue; margin-bottom: -1px; } .programTableCell tbody tr * { border-bottom: 0; margin-bottom: 0px; }');

      if (prefs['SetHTColor']) {
        addStyle(
        '#programTable a:hover {color:'+prefs['HTColor']+'; transition: color 0s linear 0s;-o-transition: color 0s linear 0s;-webkit-transition: color 0s linear 0s;-moz-transition: color 0s linear 0s;}');
      }
      if (prefs['SetHBColor']) {
        addStyle(' .program-table .name:hover { background-color: '+prefs['HBColor']+';  } '+
        '#programTable a:hover { transition: color 0s linear 0s;-o-transition: color 0s linear 0s;-webkit-transition: color 0s linear 0s;-moz-transition: color 0s linear 0s;}');
      }
      
      // back-highlights to full cell, and set colors.
      if (prefs['SetBGTColor']) { 
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-green"] td { background-color: '+prefs['BGBColor']+'; }'
          +'#main #programTable .is-favorited[data-favorite-mode="background-green"] a { color: '+prefs['BGTColor']+'; background-color:inherit !important; }'); 
      } else {
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-green"] td { background-color: rgb(90,251,93); }'
          +'#main #programTable .is-favorited[data-favorite-mode="background-green"] a { color: '+prefs['NTColor']+'; }' );
      }
      if (prefs['SetBRTColor']) { 
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-red"] td { background-color: '+prefs['BRBColor']+'; }'
                +'#main #programTable .is-favorited[data-favorite-mode="background-red"] a { color: '+prefs['BRTColor']+'; background-color:inherit !important;}');  
      } else {
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-red"] td { background-color: rgb(255,110,91); }'
          +'#main #programTable .is-favorited[data-favorite-mode="background-red"] a { color: '+prefs['NTColor']+'; }' );        
      }
      if (prefs['SetBYTColor']) { 
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-yellow"] td { background-color: '+prefs['BYBColor']+';}'
                +'#main #programTable .is-favorited[data-favorite-mode="background-yellow"] a { color: '+prefs['BYTColor']+'; background-color:inherit !important;}');
      } else {
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="background-yellow"] td { background-color: rgb(255,200,89); }'
          +'#main #programTable .is-favorited[data-favorite-mode="background-yellow"] a { color: '+prefs['NTColor']+'; }' );        
      }
      
      // Change Color Y ellow
      if (prefs['SetGTColor']) {
        //addStyle('#programTable .is-favorited[data-favorite-mode="text-green"] .programWrapper a { color: '+prefs['GTColor']+' !important; } 
        //'#programTable .is-favorited[data-favorite-mode="text-green"] .programWrapper a:hover { color:'+prefs['HoverColor']+' !important;' );
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="text-green"] td { background-color: '+prefs['GBColor']+'; }'
          +'#main #programTable .is-favorited[data-favorite-mode="text-green"] a { color: '+prefs['GTColor']+' !important; background-color:inherit !important; }'); 
      } 

      if (prefs['SetRTColor']) {
        //addStyle('#programTable .is-favorited[data-favorite-mode="text-red"] .programWrapper a { color: '+prefs['RTColor']+' !important; } #programTable .is-favorited[data-favorite-mode="text-red"] .programWrapper a:hover { color:'+prefs['HoverColor']+' !important;' );
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="text-red"] td { background-color: '+prefs['RBColor']+'; }'
          +'#main #programTable .is-favorited[data-favorite-mode="text-red"] a { color: '+prefs['RTColor']+' !important; background-color:inherit !important; }'); 
      }
      if (prefs['SetYTColor']) {
        //addStyle('#programTable .is-favorited[data-favorite-mode="text-yellow"] .programWrapper a { color: '+prefs['YTColor']+' !important; } #programTable .is-favorited[data-favorite-mode="text-yellow"] .programWrapper a:hover { color:'+prefs['HoverColor']+' !important;' );
        addStyle( '#main #programTable .is-favorited[data-favorite-mode="text-yellow"] a { color: '+prefs['YTColor']+' !important; background-color:inherit !important; }'); 
      }
      if (prefs['SetYBColor']) {
        addStyle('#main #programTable .programTableCell .is-favorited[data-favorite-mode="text-yellow"] td { background-color: '+prefs['YBColor']+'; }'); 
      }

      // Hide adds
      if (prefs['MainPageAdds'])
      {
        var f = $('topBannerWrapper');
        if (f) f.parentNode.removeChild(f);
        f = $('bottomAdSlot');
        if (f) f.parentNode.removeChild(f);
        f = $('footer');
        if (f) f.parentNode.removeChild(f);
        f = $('almaFooter');
        if (f) f.parentNode.removeChild(f);
        f = $('klFrame');
        if (f) f.parentNode.removeChild(f);
        f = $('ilFrame');
        if (f) f.parentNode.removeChild(f);
        f = $('OTITopBanner');
        if (f) f.parentNode.removeChild(f);
        f = $('OTIRightBanner');
        if (f) f.parentNode.removeChild(f);
        addStyle('.modal-open #modal-big .modal-body { top: auto; height: auto; }');
        addStyle('#footer { display:none; }');
        addStyle('.centerAreaAds, .showAdSpot, #klFrame, #ilFrame, #OTITopBanner, #OTIRightBanner { display:none; }');
      }
      
      // Move icos into a href
      {
        jQuery(".programWrapper > .ico" ).each(function() {
          jQuery(this).appendTo(jQuery(this).parent().children('a'));
        });
      }
      // Logos As Text
      if (prefs['LogosAsTxt'])
      {
        jQuery('.channel-logo').replaceWith(function(){ return jQuery(this).attr('alt');});
      }
      // Hide adds
      if (prefs['Articles'])
      {
        var f = $('articles');
        if (f) f.parentNode.removeChild(f);
        // ruler bar
        addStyle('div[class="l-wide theme-toolbar rhythm-remove-trailer"] { display:none;} ');
      }
      // Remove useless logo space on top
      if (prefs['MainPageLogos']) {
        addStyle('.site-header { display:none;} ' );
      }
      // Remove Facebook
      if (prefs['FaceBooks']) {
        addStyle('.facebookLike, .fb_ltr, #facebook, #fb-root { display:none;}' );
      }
      // Remove GooglePlus
      if (prefs['GooglePlus']) {
        addStyle('#___plusone_0, #___plusone_1,#___plusone_2,#___plusone_3,#___plusone_4,#___plusone_5,#___plusone_6, #plusone, #plusone_table { display:none !important;}' );
      }

      if (prefs['SingleMenu'] || prefs['BarCombine']) {
        addStyle('.l-stack li .site-navigation__dropdown-item { margin-bottom: 0px; }');
      //}
      //if (prefs['SingleMenu']) {
        var usr = jQuery('.site-navigation__user-menu ul.l-stack');
        if (usr.length) {
          var ohj = jQuery('.l-ribbon .dropdown__content ul.l-stack');
          jQuery('<li><hr></li>').appendTo( ohj[0] );
          var op = ohj.parents('li');
          ohj.insertBefore( usr[0] );
          op.remove();
        }        
      }
      // Move black-bar items into gray-bar
      if (prefs['BarCombine']) {
        var usr = jQuery('.site-navigation__user-menu ul.l-stack:last-child'); // 1 or 2
        if (usr.length) {
          var bar = jQuery('ul.l-ribbon.l-grid--12');
          bar.removeClass('l-ribbon l-grid--12').addClass('l-stack');
          bar.find('li > a').addClass('site-navigation__dropdown-item').removeClass('site-navigation__item recorder-promo-nav-btn');
          jQuery('<li><hr></li>').appendTo( bar[0] );
          bar.insertBefore( usr );
        
          var uusr = jQuery('.site-navigation__user-menu.dropdown.js-dropdown')
          var graybar = jQuery('.clearfix.l-wrap.l-grid--16');
          graybar.append( uusr );
          jQuery('#site-navigation').remove();        
        }
        addStyle('.site-navigation__search input#site-navigation__search__input { font-size:75%; width:120px; } .clearfix .site-navigation__user-menu:after, .site-navigation .site-navigation__user-menu:after { content: none; } ');
      }
      if ( prefs['HideUserName']) {
        addStyle('.site-navigation .site-navigation__user-menu, .site-navigation__user-menu  { width: 73px; margin-right:10px; } .site-navigation__user-menu .dropdown__content--right { width: 220px; } .site-navigation__user-menu a .site-navigation__user-name { display:none;} .site-navigation__user-menu .main-usermenu-arrow-down { background-position: -244px -119px; width: 16px; }');
      }
      // Shrink zoom useless logo space
      if (prefs['MainPageShrink']) {
      
        addStyle('.site-navigation .site-navigation__item, .site-navigation .site-navigation__item > a, .site-navigation .site-navigation__user-menu,'
        +'.site-navigation__item,  .site-navigation__item > a, .site-navigation__user-menu { font-size:inherit; }');

        addStyle(' #main menu .btn, #main menu .btn-group > .btn, #main menu .btn-group > li > .btn { height:auto; line-height:normal; } #main .sticky-placeholder { height:auto; } .site-navigation, #main .theme-toolbar { margin-bottom: 0px !important; }');
        addStyle('.site-navigation .site-navigation__user-menu, .site-navigation__user-menu { height:29px; } .site-navigation .site-navigation__user-img, .site-navigation__user-img { width:28px; height:28px;} .site-navigation .main-usermenu-arrow-down, .main-usermenu-arrow-down { height:28px; width:28px; } ');
      }

      {
        addStyle(
        '#favoritePickerMenu .highlightText #favPenRed, .highlightText #favPenRed.is-selected, .highlightText #favPenRed:hover, '+
        '.selector-favorite[data-favorite-mode="text-red"] .selector-favorite-ico, '+
        '.selector-favorite[data-favorite-mode="text-red"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.penRed, '+        
        '#favoriteEditorTable #favoriteStyleSelector ul li.penRed '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+(prefs['SetRTColor']?prefs['RTColor'].substr(1):defColors['RTColor'].substr(1))+'/'+(prefs['HideR']||!prefs['SetRBColor']?'t':prefs['RBColor'].substr(1))+(prefs['HideR']?'/h':'')+'.png"); }');
        addStyle(
        '#favoritePickerMenu .highlightText #favPenGreen, .highlightText #favPenGreen.is-selected, .highlightText #favPenGreen:hover, '+
        '.selector-favorite[data-favorite-mode="text-green"] .selector-favorite-ico, '+
        '.selector-favorite[data-favorite-mode="text-green"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.penGreen, '+
        '#favoriteEditorTable #favoriteStyleSelector ul li.penGreen '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+(prefs['SetGTColor']?prefs['GTColor'].substr(1):defColors['GTColor'].substr(1))+'/'+(prefs['HideG']||!prefs['SetGBColor']?'t':prefs['GBColor'].substr(1))+(prefs['HideG']?'/h':'')+'.png"); }');
        addStyle(
        '#favoritePickerMenu .highlightText #favPenYellow, .highlightText #favPenYellow.is-selected, .highlightText #favPenYellow:hover, '+
        '.selector-favorite[data-favorite-mode="text-yellow"] .selector-favorite-ico, '+
        '.selector-favorite[data-favorite-mode="text-yellow"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.penYellow, '+
        '#favoriteEditorTable #favoriteStyleSelector ul li.penYellow '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+(prefs['SetYTColor']?prefs['YTColor'].substr(1):defColors['YTColor'].substr(1))+'/'+(prefs['HideY']||!prefs['SetYBColor']?'t':prefs['YBColor'].substr(1))+(prefs['HideY']?'/h':'')+'.png"); }');
        addStyle(
        '#favoritePickerMenu .highlightBackground #favHighlightRed, '+
        '.selector-favorite[data-favorite-mode="background-red"] .selector-favorite-ico, '+ 
        '.selector-favorite[data-favorite-mode="background-red"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.highlightRed, '+
        '#favoriteEditorTable #favoriteStyleSelector ul li.highlightRed '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+prefs['BRTColor'].substr(1)+'/'+(prefs['HideBR']?'t':(!prefs['SetBRBColor']?defColors['BRBColor'].substr(1):prefs['BRBColor'].substr(1)))+(prefs['HideBR']?'/h':'')+'.png"); }');
        addStyle(
        '#favoritePickerMenu .highlightBackground #favHighlightGreen, '+
        '.selector-favorite[data-favorite-mode="background-green"] .selector-favorite-ico, '+ 
        '.selector-favorite[data-favorite-mode="background-green"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.highlightGreen, '+
        '#favoriteEditorTable #favoriteStyleSelector ul li.highlightGreen '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+prefs['BGTColor'].substr(1)+'/'+(prefs['HideBG']?'t':(!prefs['SetBGBColor']?defColors['BGBColor'].substr(1):prefs['BGBColor'].substr(1)))+(prefs['HideBG']?'/h':'')+'.png"); }');
        addStyle(
        '#favoritePickerMenu .highlightBackground #favHighlightYellow, '+
        '.selector-favorite[data-favorite-mode="background-yellow"] .selector-favorite-ico, '+ 
        '.selector-favorite[data-favorite-mode="background-yellow"].is-active .selector-favorite-ico, '+
        '#favoriteEditorTable .selectFavoriteStyleButton.highlightYellow, '+
        '#favoriteEditorTable #favoriteStyleSelector ul li.highlightYellow '+
        '{ background-position: 0 0; background-image: url("http://tuner.tyyppi.org/ico/'+prefs['NBColor'].substr(1)+'/'+prefs['BYTColor'].substr(1)+'/'+(prefs['HideBY']?'t':(!prefs['SetBYBColor']?defColors['BYBColor'].substr(1):prefs['BYBColor'].substr(1)))+(prefs['HideBY']?'/h':'')+'.png"); }');
        
        var hids = ['Y','R','G','BY','BR','BG'];
        var longs= ['text-yellow','text-red','text-green','background-yellow','background-red','background-green'];
        for ( h in hids )
        {
          if (prefs['Hide'+hids[h]])
          {
            addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a { color: '+prefs[hids[h]+'TColor']+'; padding: 0px; font-weight:normal; background-color:inherit !important; opacity:0.6; overflow:hidden; text-decoration:none; white-space:nowrap; width:0.9em; font-size:85%; display:block; clear:none;float:left;}');
            addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a:before { content:"+    ";} #main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a:hover:before { content:"";}');
            addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] .time { opacity:0.6; font-size:85%; } ');
            addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] .name { height:1em; } ');
          
            if (prefs['SetNTColor']) {
              if (h<3)
                addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a:hover { opacity:1; width:auto; min-width:100%; position:absolute; padding:0px 3px 3px 1px; height:1.1em; font-size:90%;white-space:nowrap; cursor:crosshair; overflow:visible; background-color:'+prefs['NBColor']+' !important; z-index:5;}');
              else
                addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a:hover { opacity:1; width:auto; min-width:100%; position:absolute; padding:0px 3px 3px 1px; height:1.1em; font-size:90%;white-space:nowrap; cursor:crosshair; overflow:visible; background-color:'+prefs[hids[h]+'BColor']+' !important; z-index:5;}');
              
            } else {
              addStyle('#main #programTable .is-favorited[data-favorite-mode="'+longs[h]+'"] a:hover { opacity:1; width:auto; min-width:100%; position:absolute; padding:0px 3px 3px 1px; height:1.1em; font-size:90%;white-space:nowrap; cursor:crosshair; overflow:visible; z-index:5; }');
            }
          }
        }
      }

 
      if (prefs['Clock']) {
        var n = $('fbfConfigMenuLink');
        if (n){
          var s = document.createElement('script');
          s.innerHTML = 'function updClock(){var cTime = new Date ( );var cHours = cTime.getHours ( );var cMin = cTime.getMinutes ( );cMin = ( cMin < 10 ? "0" : "" ) + cMin; document.getElementById("fbfConfigMenuLink").innerHTML = "Tuner / " + cHours + ":" + cMin;setTimeout("updClock()",15000);} setTimeout("updClock()",5000);';
          getDocument().appendChild(s);
        }
      }
      // Join the program times with program name
      if (prefs['Rowd']) {
        addStyle('#main .program-table .cellContainer, #main .program-table th.time { background: none; } #main table {width:100%;} .programWrapper .time { float:left; line-height:18px; } .program-table .programTableRow .programTableCell .is-current-program .time { background-color: inherit; }');
        
        var programs = $x('.//th[@class="time"]');
        for (var i=0; i<programs.snapshotLength; i++) {
          var skip=0;
                   
          if (!skip){
            var dpw = programs.snapshotItem(i); // <th time>
            var dtr = dpw.parentNode;            //   <tr>
            //var tt = get_previoussibling(tn); // time
            var dtn = get_nextsibling(dpw);     // <td name>
            var dtt = get_previoussibling(dtn);
            var ddiv = get_firstchild(dtn);  // <div programWrapper>
            while (ddiv && ddiv.className != 'programWrapper') // skip recorderindicator
              ddiv = get_nextsibling(ddiv);
            var dda = get_firstchild( ddiv ); // <a href>
            var stime = dpw.innerHTML;
            debug( ddiv.innerHTML );
            dtr.removeChild(dpw);
            var ti2 = document.createElement('span');
            ti2.innerHTML = stime+'&nbsp;';
            ti2.setAttribute('class','time');
            //dda.insertBefore( ti2, dda.firstChild );
            ddiv.insertBefore( ti2, dda );
            
            //dtr.style.borderBottom="1px dotted blue";
          } else {  }
        }
      }

       // Hide the Comments things
      if (prefs['HideComments']) {
        addStyle('.modal-body #commentContainer, .modal-body .oti-sidebar-right, a[href="http://www.telkku.com/community"], a[href="http://telkku.com/community"] { display:none; }');
        
      }

      if (prefs['HideStars']) {
        addStyle('.modal-body .rating, .l-island--only-sides .l-grid--6 { display:none; }');
      } 

      if (prefs['HideRecord']) {
        addStyle('.site-navigation #recorderLink, #recorderLink, #main #recorderPickerMenu, a.btn[title="Nauhoita ohjelma"] { display:none; }');
      } 
      if (prefs['HideCal']) {
        addStyle('.l-island--small div.btn[title~=ohjelma] { display:none; }');
      } 
      // all removed from info header
      //if (prefs['HideCal'] && prefs['HideRecord'] && prefs['HideStars'] ) {
        addStyle('.modal-body .theme-toolbar { padding:0px; } menu.l-grid--8.program-overlay__menu { width:auto; } ');
      //}
      if (prefs['LowWidth'])
      {
        addStyle('.l-grid--16, .l-grid--12 { width:auto; min-width:inherit;} body { width:99.99%; min-width:inherit;} '
        +' .clearfix .site-navigation__user-menu:after, .site-navigation .site-navigation__user-menu:after { content: none; }' );
        addStyle('#main .program-table-wrapper { margin:0px;} #main .program-table .programTableCell td { padding: 0px 0px 0px 3px; }' );
        
        var sups = $x('.//td[contains(@class,"cellContainer")]');
        for (var i=0; i<sups.snapshotLength; i++) {
          var t = sups.snapshotItem(i);
          t.width = '';
        }
        
      }
      if (prefs['BigPicture']) {
        addStyle('#programInfoOverlay .oti-sidebar-left.l-grid--4.l-vertical-box--25 { width: auto; min-width: 200px; }  .modal-body .l-island--small .program-overlay__image { max-height: 500px; } .program-overlay__image img { width:auto !important; height:auto !important; max-width: 420px; max-height: 360px; } .l-grid--4.l-vertical-box--25 .l-island--small { position:relative; min-height:200px; } .l-grid--4.l-vertical-box--25 .l-island--small .l-island--small { position:absolute; bottom:-50px; } .txt-baselines--2 { text-shadow: 2px 2px 1px #ffffff; } .l-island--small .addFavorite, .l-island--small .deleteFavorite { display:none; }');
      } 


      if (!isMainPage())
      { // convert
        if (prefs['HideTops']) {
          var infolinks = $x("//a[contains(@href,'toiminto=lisaa')][contains(@href,'tyyppi=i')]");
          for (var i=0; i<infolinks.snapshotLength; i++) {
            var t = infolinks.snapshotItem(i);
            t.innerHTML=$l('HideProgram');
          }
          var infolinks = $x("//a[contains(@href,'toiminto=poista')][contains(@href,'tyyppi=i')]");
          for (var i=0; i<infolinks.snapshotLength; i++) {
            var t = infolinks.snapshotItem(i);
            t.innerHTML=$l('UnhideProgram');
          }
        }
      }

      homePageNotModified = false;
    }
  } catch(x0) { logError('Home', x0); }
  

}


}) ();

// There are
