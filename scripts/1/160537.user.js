// ==UserScript==
// @name         Danbooru 2 Tweaks & Features
// @description  For danbooru.donmai (2) - Changes around the layout of the page and adds some misc features.
// @namespace    itsonlyaname
// @version      1.0.10
// @include      http://*.donmai.us/*
// @include      http://donmai.us/*
// ==/UserScript==

//known issue: some meta-tags in your blacklist may be ignored by endless pages, just ask me if you want a specific one/few to work.
//supported meta-tags: rating, 

//I am also searching for more features to add, feel free to suggest anything

//==========================================================
// Userscript Default Settings
// '1'=true/active & '0'=false/disabled
//==========================================================

//attach error messages to the page if a tweak breaks (appears at the bottom of the page, below the footer)
var db2_reportBroken=1;
var db2_debug=0; //more verbose debug


// Enable the 'Userscript' menu at the 'My Account' page - this function takes over all manual settings below.
// Thus if enabled, editing the var's below won't do anything
// Settings are saved even when installing a new version.
var enable_settingMenu=1;

// Puts vote buttons behind another link to prevent accidental clicks.   -default: 1-
var enable_autoHideVotes=1;

// Moves the pools navigation to the top   -default: 1-
// This is an official feature now, but i left it in for the quickswitch.
var enable_poolsToTop=1;
var enable_poolsToTop_qs=1; // Quickswitch - Adds the 'v' & '^' buttons to the pools pages.


// Global switch for all the custom css.
var enable_customCSS=1;
var enable_customCSS_smallMode=0; // a more aggressive remove/resize.

// Endless/bottomless pages - more images get loaded as you scroll near the bottom
// I strongly recommend this for any person that searches posts or browses pools
var enable_endlessPages=1;    //global switch for all pages
var enable_ep_postsList=1;
var enable_ep_pools=1;
var enable_ep_paginator=1;    //Enables the extra paginator (pools = top-right corner // postsList = bottom of the sidebar)

var enable_ep_browse=1;           //Enables the 'browse this pool' feature - browse pools at full image size
var enable_ep_browseTagsOn=0;     //always show the tags list while in browsing mode
var enable_ep_browseCommentsOn=1; //always show comments while in browsing mode
// Note, only limited editing is possible on dynamically generated pages.

// Enable custom blacklist, adds a quickswitch button to activate a 2nd blacklist. This includes the thumbs on the current page.
// Default/possible use: SFW mode, hides all explicit/questionable content (almost the same as adding 'rating:s' to the query')
// Still somewhat incomplete
var enable_customBlacklist=0;




//==========================================================
// Do not edit past this point!
//==========================================================

//still a work in progress, don't mind the random commented code here & there

var loc = location.href,
    ep_disableScroll=false,
    ep_currentPage,
    ep_lockQuerry=false,
    ep_poolsPostlist,
    ep_poolsToQueryList,
    ep_poolsKeepcount=0,
    ep_onPoolsPage,
    ep_onPostsListPage,
    ep_onPoolBrowse,
    ep_limit=20,
    ep_rs=0,
    settings_json,
    settings_jsonData;
    ep_scrollTrigger=700;



//==========================================================
// Assist functions - mostly copy/pasted from other sources
//==========================================================

var $x = function (xpath, root) {
  root = root ? root : document;
  var a = document.evaluate(xpath, root, null, 7, null),
      b = [];
  for (var i = 0; i < a.snapshotLength; i++) {
    b[i] = a.snapshotItem(i);
  }
  return b;
}

function $q(url, callback, method, asyn) {
  try {
    var xmlhttp = new XMLHttpRequest();
  } catch (e) {
    return 0;
  }
  var asyn = asyn === undefined ? 1 : asyn;
  var method = method ? method : "GET";
  xmlhttp.url = url;
  xmlhttp.open(method, url, asyn);
  xmlhttp.cb = callback;
  var bComplete;
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4) {
      callback(xmlhttp.responseText);
    }
  };
  if (method) {
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  to_log('Q:' + url);
  xmlhttp.send();
}

function $c(type, params) {
  if (type == "#text") {
    return document.createTextNode(params);
  } else {
    var node = document.createElement(type);
  }
  for (var i in params) if (i == "kids") {
    for (var j in params[i]) {
      if (typeof (params[i][j]) == 'object') {
        node.appendChild(params[i][j]);
      }
    }
  } else if (i == "style") {
    if (typeof (params[i]) == 'string') {
      node.style.cssText = params[i];
    } else {
      for (var j in params[i])
      node.style[j] = params[i][j];
    }
  } else if (i == "class") {
    node.className = params[i];
  } else if (i == "#text") {
    node.appendChild(document.createTextNode(params[i]));
  } else {
    node.setAttribute(i, params[i]);
  }
  return node;
}

function addEvent(node, type, callback) {
  if ('addEventListener' in node) {
    node.addEventListener(type, callback, false);
  } else {
    node.attachEvent('on' + type, callback);
  }
}

function to_log(a,b) { //purely a debug function, this pastes text to somewhere on the screen, much easier then alert(stuff)'s
  if (db2_debug && !b) {
  var t_related = document.getElementById('related-box'),
      t_description = document.getElementById('description'),
      t_sidebar = document.getElementById('sidebar');
  if (t_related) t_related.innerHTML += a + "\n<br/>";
  else if (t_description) t_description.innerHTML += a + "\n<br/>";
  else if (t_sidebar) t_sidebar.innerHTML += a + "\n<br/>";
  else if(document.body) document.body.innerHTML += a + "\n<br/>";
  }
  else if(db2_reportBroken && b) {
    if(document.body) document.body.innerHTML += "\n<br/>Danbooru2 Tweaks & Features:\n<br/>" + a;
  }
  if(!document.body && db2_debug) alert(a);
}

function getMetaContents(mn) {
  var m = document.getElementsByName(mn)[0];
  if(m) m=m.content;
  else { to_log('Could not read meta-content: "'+mn+'"'); return; }
  return m;
}

function addGlobalStyle(css) {
  try {
    var elmHead, elmStyle;
    elmHead = document.getElementsByTagName('head')[0];
    elmStyle = document.createElement('style');
    elmStyle.type = 'text/css';
    elmHead.appendChild(elmStyle);
    elmStyle.innerHTML = css;
  }
  catch (e) {
    if (!document.styleSheets.length) {
      document.createStyleSheet();
    }
    document.styleSheets[0].cssText += css;
  }
}

//LS = localstorage
var LS_deleteValue, LS_getValue, LS_setValue;
(function () {
  try {
    var keyPrefix='db2tweaks_itsonlyaname.';
    if (typeof LS_deleteValue == 'undefined') {
      LS_deleteValue = function (name) {
        localStorage.removeItem(keyPrefix + name);
      }
      LS_getValue = function (name, defaultValue) {
        var value = localStorage.getItem(keyPrefix + name);
        if (!value) return defaultValue;
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
      LS_setValue = function (name, value) {
        value = (typeof value)[0] + value;
        localStorage.setItem(keyPrefix + name, value);
      }
    }
  }
  catch(e) {
    to_log('Local storage could not be accessed, details: '+e,true);
  }
})();


//==========================================================
// Global control/activation of features and tweaks
//==========================================================

function activateTweaks() {
  if (document.body === undefined ||
      loc.indexOf('.atom') != -1 ||
      loc.indexOf('.iqdb.org') != -1) return;
      
  if (enable_settingMenu) { //no json setting for this value
    settingMenu_init();
  }
  
  if (settings_json.enable_autoHideVotes) {
    autoHideVotes();
  }
  
  if (settings_json.enable_poolsToTop) {
    poolsToTop();
  }
  if (settings_json.enable_poolsToTop_qs) {
    poolsToTop_qs();
  }
  
  if (settings_json.enable_endlessPages) {
    endlessPages_init();
  }
  
  if (settings_json.enable_customBlacklist) {
    customBlacklist_init();
  }
}

//function loader/caller
settings_init();
if (document.readyState == 'loading') {
  applyCustomCSS(); //css can be added no matter the state of the page.
  document.addEventListener('DOMContentLoaded', activateTweaks, false);
} else {
  applyCustomCSS();
  activateTweaks();
}

//==========================================================
// features & tweaks (99% self written)
//==========================================================

//custom CSS
function applyCustomCSS() {
  if (loc.indexOf('.json') != -1 || loc.indexOf('.xml') != -1) return;
  if (settings_json.enable_customCSS) {
  
  // additional tweaking can be done by commenting out certain lines, like this text.
  // note, if you comment out something, make sure it has both a opening and closing, "{" and "}"
  // removing only the opening can cause the entire style to break
  
  var style=
  //main background of the site
  'body { background-color:#C4C4C4 !important; }'+
  '.post-count, .count { color:#888888!important; }'+                                  //color of post count numbers, better readability with gray background
  'span.low-post-count { color:red!important; }'+
  
  'div#c-comments .post div.comments-for-post { float:none!important; margin-left:184px; width:auto!important; min-width:30em; }'+
  'div#c-comments .post div.comments-for-post .list-of-comments { float: left; width: 100%; }'+
  'div#c-comments div.comments-for-post .post .comment { margin-left:184px; }'+  //search page
  'div.comments-for-post div.list-of-comments article.comment div.author { margin-right: 1em!important;}'+
  'div.comments-for-post div.list-of-comments article.comment div.content { float:none!important; margin-left:13em; width:auto!important; min-width:17em;}'+
  
  
  // misc removal/reducement of whitespace                                             //removal or resize of:
  'header#top { margin-bottom:0.5em!important;}'+                                      //1em below buttons 
  'header#top h1 { margin: 0px 15px!important;'+                                       //resize of "danbooru" title in top-left
  'font-size:1.25em!important;'+
  'line-height:1.25em !important; }'+
  
  'header#top nav menu { padding: 2px 20px !important; }'+                             //resize navigation buttons
  'header#top nav menu li a {'+                                                        //and the links behind them
  'padding:1px 3px!important;'+   //clickable area
  'margin: 0px 5px!important;}'+   //non-clickable
  
  'div#c-posts div#a-show #content { margin-top:0em !important; }'+                    //space below navigation buttons - (from 1em)
  'section#image-container img { margin-right:1em !important; }'+                      //add 1 em to right of img itself, only has effect on wide pictures     
  'section#image-container { margin-top:0em !important; }'+                            //remove margin from the top, compensated by margins from other elements (from 1em)
  
  
  '#tag-list ul { margin-bottom:0.5em!important; }'+                                   //space between copyright/chars/artist/tags - (from 1em)
  '#sidebar section { margin-top:0.5em !important; margin-bottom:0.5em !important; }'+ //space above search/information/options (from 1em)
  
  '#a-show article.post-preview, #a-show .pg_ind { margin:0 !important }'+             //remove margin between thumbnails - (from top:10px/right:10px)
  

  '#nav-links { margin:0.3em 0em!important; padding: 0.3em 0.3em 0px!important; }'+    //resize of the pools/search nav box - (from 1em/0.5em)
  
  'div#c-posts div.notice { padding: 0em 0.5em !important; }'+                         //remove top/bottom margin of yellow info boxes
  
  
  //hide the upgrade-account-notice, for good 
  '#upgrade-account-notice { display:none!important; }'+
  
  
  // hide all ads
  'aside#sidebar>div:not([class]):not([id]) { display:none!important; }'+              //left-side ad
  'section#content>div#posts>div:not([class]):not([id]) { display:none!important; }'+  //top ad
  'section#content>div:not([class]):not([id]) { display:none!important; }'+            //top ad
  'section#content>div#jlist-rss-ads-for-show { display:none!important; }'+            //right ad
  'div#c-posts #content.with-ads { margin-right: 0em!important; }'+                    //right ad
  
  
  //something random i like, adds extra space to the bottom
  //'#page-footer { padding-bottom:250px!important; }'+
  '';
  
  if(settings_json.enable_customCSS_smallMode) {
    style+=
    ''+
    '';
  }
  
  
  addGlobalStyle(style);
  }

}


function settings_updateData(d,v) {
  if(settings_jsonData.customBlacklist_active == undefined) settings_jsonData.customBlacklist_active = false;
  if(settings_jsonData.customBlacklist_data == undefined)   settings_jsonData.customBlacklist_data   = false;

  var temp_dataString=
  '{"customBlacklist_active":' + (d=='customBlacklist_active' ? v : settings_jsonData.customBlacklist_active) +',' +
  '"customBlacklist_data":'    + (d=='customBlacklist_data'   ? '"'+v+'"' : '"'+settings_jsonData.customBlacklist_data+'"')   +'}';
  
  settings_jsonData=JSON.parse(temp_dataString);
  LS_setValue('settings_data',temp_dataString);
}

function settings_init() {
  settings_json = LS_getValue('settings');
  settings_jsonData = LS_getValue('settings_data');
  
  if (settings_json && enable_settingMenu) { //enable_settingMenu is here so it resets to default if not enabled
    try {                                    //otherwise old results are still cached and editing the file has no effect
      settings_json = JSON.parse(settings_json);
      var count = 0;
      for ( property in settings_json ) {
        if(settings_json.hasOwnProperty(property)) count++;
      }
      if(count!=14) { //update this with # of object in storage - since we passed 'if(settings_json)' must be at least 1 object
                      //outdated version -> update keys
        var new_json = //if count is messed up, re-make the settings, using either new values or old saved ones.
        '{"hasSettings":'               + true + ',' +
        '"enable_autoHideVotes":'       + (settings_json.enable_autoHideVotes       == null ? enable_autoHideVotes       : settings_json.enable_autoHideVotes) + ',' +
        '"enable_poolsToTop":'          + (settings_json.enable_poolsToTop          == null ? enable_poolsToTop          : settings_json.enable_poolsToTop) + ',' +
        '"enable_poolsToTop_qs":'       + (settings_json.enable_poolsToTop_qs       == null ? enable_poolsToTop_qs       : settings_json.enable_poolsToTop_qs) + ',' +
        '"enable_customCSS":'           + (settings_json.enable_customCSS           == null ? enable_customCSS           : settings_json.enable_customCSS) + ',' +
        '"enable_customCSS_smallMode":' + (settings_json.enable_customCSS_smallMode == null ? enable_customCSS_smallMode : settings_json.enable_customCSS_smallMode) + ',' +
        '"enable_endlessPages":'        + (settings_json.enable_endlessPages        == null ? enable_endlessPages        : settings_json.enable_endlessPages) + ',' +
        '"enable_ep_postsList":'        + (settings_json.enable_ep_postsList        == null ? enable_ep_postsList        : settings_json.enable_ep_postsList) + ',' +
        '"enable_ep_pools":'            + (settings_json.enable_ep_pools            == null ? enable_ep_pools            : settings_json.enable_ep_pools) + ',' +
        '"enable_ep_paginator":'        + (settings_json.enable_ep_paginator        == null ? enable_ep_paginator        : settings_json.enable_ep_paginator) + ',' +
        '"enable_ep_browse":'           + (settings_json.enable_ep_browse           == null ? enable_ep_browse           : settings_json.enable_ep_browse) + ',' +
        '"enable_ep_browseTagsOn":'     + (settings_json.enable_ep_browseTagsOn     == null ? enable_ep_browseTagsOn     : settings_json.enable_ep_browseTagsOn) + ',' +
        '"enable_ep_browseCommentsOn":' + (settings_json.enable_ep_browseCommentsOn == null ? enable_ep_browseCommentsOn : settings_json.enable_ep_browseCommentsOn) + ',' +
        '"enable_customBlacklist":'     + (settings_json.enable_customBlacklist     == null ? enable_customBlacklist     : settings_json.enable_customBlacklist) + '}';
        
        LS_setValue('settings', new_json);
        settings_json = JSON.parse(new_json);
      }
    }
    catch (e) {
      if (db2_debug) alert('warning, user settings seem to be corrupt ~ try re-saving ~ error message:\n<br>' +e+'\n\n<br><br>'+JSON.stringify(settings_json)+'\n\n<br><br>'+settings_json,true);
      settings_json={};
      LS_setValue('settings','{}');
    }
  }
  else {
    var temp_json_string = //create & save settings based on defaults - will run every pageload if settingsMenu is disabled
      '{"hasSettings":'               + true + ',' +
      '"enable_autoHideVotes":'       + enable_autoHideVotes + ',' +
      '"enable_poolsToTop":'          + enable_poolsToTop + ',' +
      '"enable_poolsToTop_qs":'       + enable_poolsToTop_qs + ',' +
      '"enable_customCSS":'           + enable_customCSS + ',' +
      '"enable_customCSS_smallMode":' + enable_customCSS_smallMode + ',' +
      '"enable_endlessPages":'        + enable_endlessPages + ',' +
      '"enable_ep_postsList":'        + enable_ep_postsList + ',' +
      '"enable_ep_pools":'            + enable_ep_pools + ',' +
      '"enable_ep_paginator":'        + enable_ep_paginator + ',' +
      '"enable_ep_browse":'           + enable_ep_browse + ',' +
      '"enable_ep_browseTagsOn":'     + enable_ep_browseTagsOn + ',' +
      '"enable_ep_browseCommentsOn":' + enable_ep_browseCommentsOn + ','+
      '"enable_customBlacklist":'     + enable_customBlacklist + '}';
      
    //LS_setValue('settings', temp_json_string);
    settings_json = JSON.parse(temp_json_string);
  }
  
  if(settings_jsonData) {
    try {
      settings_jsonData=JSON.parse(settings_jsonData);
    }
    catch(e) {
      if (db2_debug) alert('warning, user settings_data seem to be corrupt ~ try re-saving ~ error message:\n<br>' + e +'\n\n<br><br>'+JSON.stringify(settings_jsonData)+'\n\n<br><br>'+settings_jsonData,true); //runs before document.body is loaded
      settings_jsonData = {};
      LS_setValue('settings_data','{}');
    }
  }
  else { //only first run ever, or if settings get corrupt somehow.
    settings_jsonData = {};
    LS_setValue('settings_data', JSON.stringify(settings_jsonData));
  }
  
  ep_rs=LS_getValue('ep_rs');
  if(ep_rs==undefined) {
  $q("/posts/"+"1238874", rs_check, undefined, 1);
  }
}


function settingMenu_init() { //sets up the button on the 'My Account' page
  if(loc.indexOf('/users/') ==-1) return;
  try {
    var temp_menu = $x("//header/nav/menu")[1];           //get the sub-menu
    if (temp_menu.innerHTML.indexOf('Settings') != -1) {  //make sure we are on the users' own page
      var temp_li = $c("li", {});
      temp_li.innerHTML = '<a href="#">UserScript</a>';
      addEvent(temp_li, 'click', settingMenu);
      temp_menu.insertBefore(temp_li, temp_menu.getElementsByTagName('li')[5]); //append after the 5th li - the one with 'Settings'
    }
  }
  catch(e) {
    to_log('settingMenu seems to have broken - error message: '+e,true);
  }
}

function settingMenu_save() {
  var t_message = $c("div", {});
  try {
    var temp_json_string =            //gather data from checkboxes, save json (generate new json string from scratch)
      '{"hasSettings":'               + true + ',' +
      '"enable_autoHideVotes":'       + document.getElementById('autoHideVotes').checked + ',' +
      '"enable_poolsToTop":'          + document.getElementById('poolsToTop').checked + ',' +
      '"enable_poolsToTop_qs":'       + document.getElementById('poolsToTop_qs').checked + ',' +
      '"enable_customCSS":'           + document.getElementById('customCSS').checked + ',' +
      '"enable_customCSS_smallMode":' + document.getElementById('customCSS_smallMode').checked + ',' +
      '"enable_endlessPages":'        + document.getElementById('endlessPages_global').checked + ',' +
      '"enable_ep_postsList":'        + document.getElementById('ep_postsList').checked + ',' +
      '"enable_ep_pools":'            + document.getElementById('ep_pools').checked + ',' +
      '"enable_ep_paginator":'        + document.getElementById('ep_paginator').checked + ',' +
      '"enable_ep_browse":'           + document.getElementById('ep_browse').checked + ',' +
      '"enable_ep_browseTagsOn":'     + document.getElementById('ep_browseTagsOn').checked + ',' +
      '"enable_ep_browseCommentsOn":' + document.getElementById('ep_browseCommentsOn').checked + ','+
      '"enable_customBlacklist":'     + document.getElementById('customBlacklist').checked + '}';

    LS_setValue('settings', temp_json_string);
    
    t_message.setAttribute('style','width: 100%; text-align:center; background-color: lightgreen; font-weight:bold; font-size: 1.8em;line-height:2em;');
    t_message.innerHTML = 'Settings saved'; //not too picky about the text or looks, it works, is fine.
  }
  catch (err) {
    t_message.setAttribute('style','width: 100%; background-color: red;  font-weight:bold; line-height:2em; text-align:center;');
    t_message.innerHTML = '<span style="font-weight:bold; font-size: 1.8em;">Failed to save settings</span> Error details:<br/>' + err;
  }
  document.getElementById('top').appendChild(t_message);
  
  settingMenu_cancel();
}

function settingMenu_cancel() { //also used to just get rid of the elements
  document.body.removeChild(document.getElementById('settingMenu_overlay'));
  document.body.removeChild(document.getElementById('settingMenu'));
}

function settingMenu_checkPossible() { //runs at the change of the checkboxes
  var t = null;
  
  t = (!document.getElementById('endlessPages_global').checked);
  document.getElementById('ep_postsList').disabled = t;
  document.getElementById('ep_pools').disabled = t;
  document.getElementById('ep_paginator').disabled = t;
  document.getElementById('ep_browse').disabled = t;
  
  t = ((!document.getElementById('endlessPages_global').checked)||(!document.getElementById('ep_browse').checked));
  document.getElementById('ep_browseTagsOn').disabled = t;
  document.getElementById('ep_browseCommentsOn').disabled = t;
}

function settingMenu_getSettings(def) { //runs when generating the menu
  if (settings_json == null) def=true;
  else settings_json = JSON.parse(LS_getValue('settings')); //get new settings since they may have changed since pageload
  
  //set checkedboxes to default state, or to currently-saved state
  document.getElementById('autoHideVotes').checked       = (def ? enable_autoHideVotes       : settings_json.enable_autoHideVotes);
  document.getElementById('poolsToTop').checked          = (def ? enable_poolsToTop          : settings_json.enable_poolsToTop);
  document.getElementById('poolsToTop_qs').checked       = (def ? enable_poolsToTop_qs       : settings_json.enable_poolsToTop_qs);
  document.getElementById('customCSS').checked           = (def ? enable_customCSS           : settings_json.enable_customCSS);
  document.getElementById('customCSS_smallMode').checked = (def ? enable_customCSS_smallMode : settings_json.enable_customCSS_smallMode);
  document.getElementById('endlessPages_global').checked = (def ? enable_endlessPages        : settings_json.enable_endlessPages);
  document.getElementById('ep_postsList').checked        = (def ? enable_ep_postsList        : settings_json.enable_ep_postsList);
  document.getElementById('ep_pools').checked            = (def ? enable_ep_pools            : settings_json.enable_ep_pools);
  document.getElementById('ep_paginator').checked        = (def ? enable_ep_paginator        : settings_json.enable_ep_paginator);
  document.getElementById('ep_browse').checked           = (def ? enable_ep_browse           : settings_json.enable_ep_browse);
  document.getElementById('ep_browseTagsOn').checked     = (def ? enable_ep_browseTagsOn     : settings_json.enable_ep_browseTagsOn);
  document.getElementById('ep_browseCommentsOn').checked = (def ? enable_ep_browseCommentsOn : settings_json.enable_ep_browseCommentsOn);
  document.getElementById('customBlacklist').checked     = (def ? enable_customBlacklist     : settings_json.enable_customBlacklist);
  
  settingMenu_checkPossible();
  
}

function settingMenu() {
  var temp_overlay=$c('div', {
    id:'settingMenu_overlay',
    style:'background-color:black;height: 100%;width: 100%;position: fixed;left: 0px;top: 0px;opacity: 0.6;z-index: 9998;'
    });
  document.body.appendChild(temp_overlay);
  var temp_settingMenu=$c('div', {
    id:'settingMenu'
    });
    
  temp_settingMenu.innerHTML=
    '<p style="text-align:center;"> <span style="font-weight:bold;font-size:140%;">Settings for \'Danbooru 2 Tweaks &amp; Features\'</span><br/>'+
    'Hover over the checkboxes for a description</p>'+
    '<div class="left">'+
        '<div>'+
            '<p class="sub_title">Feature: hide vote links</p>'+
            '<span title="This hides the vote up/down links behind a \'show votes\' link to avoid accidentally clicking them, especially on touch screen devices"><input id="autoHideVotes" class="settingMenu_checkbox" type="checkbox">Enabled</input></span><br/>'+
        '</div>'+
        '<div>'+
            '<p class="sub_title">Tweak: Pools above image </p>'+
            '<span title="This moves the pools to above the image"><input id="poolsToTop" class="settingMenu_checkbox" type="checkbox"> Move pools to above image</input><br/>'+
            '<span title="Adds the \'v\' & \'^\' buttons to the pool bar to quickly switch it\'s position"> <input id="poolsToTop_qs" class="settingMenu_checkbox" type="checkbox">Enable Quickswitch button</input></span><br/>'+
        '</div>'+
        '<div>'+
            '<p class="sub_title">Feature: Quickswitch Blacklist</p>'+
            '<span title="This adds a button to toggle an additional set of blacklisted tags. Includes content on the current page. \ndefault/possible use: SFW mode, hides all explicit/questionable content \nShift+click to edit the blacklist"><input id="customBlacklist" class="settingMenu_checkbox" type="checkbox">Enabled</input></span><br/>'+
        '</div>'+
    '</div>'+
    '<div class="right">'+
        '<div>'+
            '<p class="sub_title"> Feature: Custom CSS</p>'+
            '<span title="Changes how the page looks, most notable, the gray background and reduced empty space everywhere."><input id="customCSS" class="settingMenu_checkbox" type="checkbox">Enabled (basic)</input></span><br/>'+
            '<span title="A few more aggressive remove/resize tweaks."><input id="customCSS_smallMode" class="settingMenu_checkbox" type="checkbox">Enabled (full - small mode)</input></span><br/>'+
        '</div>'+
        '<div>'+
            '<p class="sub_title"> Feature: Endless Pages '+
            '</p>'+
            '<span title="Allow you to simply scroll down, and images/posts of the next pages will be added to the bottom of the page."><input id="endlessPages_global" class="settingMenu_checkbox" type="checkbox">Enabled (global)</input></span><br/>'+
            '<span title=""><input id="ep_postsList" class="settingMenu_checkbox" type="checkbox">Enable on Post list pages</input></span><br/>'+
            '<span title=""><input id="ep_pools" class="settingMenu_checkbox" type="checkbox">Enable on Pool pages</input></span><br/>'+
            '<span title="Enables the extra paginator (pools = top-right corner // postsList = bottom of the sidebar)"><input id="ep_paginator" class="settingMenu_checkbox" type="checkbox">Enable extra paginator</input></span><br/>'+
            '<span title=""><input id="ep_browse" class="settingMenu_checkbox" type="checkbox">Enable Pool browsing (global)</input></span><br/>'+
            '<p style="margin:0.3em 0 0 0;font-weight:bold">~When pool browsing</p>'+
            '<span title=""><input id="ep_browseTagsOn" class="settingMenu_checkbox" type="checkbox">Always show tags list</input></span><br/>'+
            '<span title=""><input id="ep_browseCommentsOn" class="settingMenu_checkbox" type="checkbox">Always show comments</input></span><br/>'+
          //'<span title=""><input id="" class="settingMenu_checkbox" type="checkbox">Enable on  page</input></span><br/>'+
        '</div>'+
    '</div>'+
    '<input type="button" value="Cancel" id="settingMenu_cancel"                  style="position:absolute;bottom:7px;right:7px;"/>'+
    '<input type="button" value="Save" id="settingMenu_save"                      style="position:absolute;bottom:7px;right:79px;"/>'+
    '<input type="button" value="Restore Default" id="settingMenu_restoreDefault" style="position:absolute;bottom:7px;left:7px;"/>'+
    ''+
    ''+
    '';
    
  var style=
    '#settingMenu { background-color:#C6C6C6;height: 500px;width: 525px;position: absolute;left: 70px;top: 70px;z-index: 9999;border: 10px ridge #3B3EEE;padding:9px;}'+
    '#settingMenu div.left {float:left; margin-right:10px; width:255px;}'+
    '#settingMenu div.right {float:left; width:255px;}'+
    '#settingMenu div div {width:245px;border:1px solid black;padding:4px;margin-bottom:5px;}'+
    '#settingMenu p.sub_title {font-weight:bold;margin-bottom:0.5em;}'+
    '#settingMenu input[type="checkbox"] {width:16px;height:22px;}'+
    '#settingMenu input[type="button"] {}';
    
  addGlobalStyle(style);
  
  document.body.appendChild(temp_settingMenu);
  
  addEvent(document.getElementById('settingMenu_cancel'), 'click', settingMenu_cancel);
  addEvent(document.getElementById('settingMenu_save'), 'click', settingMenu_save);
  addEvent(document.getElementById('settingMenu_restoreDefault'), 'click', function() { settingMenu_getSettings(true) });
  
  var temp_checkboxes=document.getElementsByClassName('settingMenu_checkbox');
  for (i = 0 ; i < temp_checkboxes.length; i++) {
    addEvent(temp_checkboxes[i], 'click', settingMenu_checkPossible);
  }
  settingMenu_getSettings();
}



function autoHideVotes() {
  var comments = document.getElementsByClassName('comment');
  if(!comments) return;
  if(!$x("//div[@class='content']/menu/li").length) return; //no vote/hide buttons found
  try {
    for (i = 0; i < comments.length; i++) {
      var input = document.createElement('li');
      input.innerHTML = 'Show votes';
      input.style = 'font-size:13px;color:#888888';
      input.onclick = function () {
        $x("../li[last()]", this)[0].style.display = 'inline';
        $x("../li[last()-1]", this)[0].style.display = 'inline';
        this.style.display = 'none';
      };
      $x("//div[@class='content']/menu/li[last()]")[i].style.display = 'none';
      $x("//div[@class='content']/menu/li[last()-1]")[i].style.display = 'none';
      $x("//div[@class='content']/menu")[i].insertBefore(input, $x("//div[@class='content']/menu/li[last()-1]")[i]);
    }
  }
  catch(e) {
    to_log('autoHideVotes seems to have broken - error message: \n<br>'+e,true);
  }
}



function poolsToTop_qs(sw) {
  if(loc.indexOf('/posts/')==-1) return;
  var attach_to=document.getElementById('nav-links');
  if (!attach_to) return;

  if (sw) {
    if (document.getElementById('poolsToTop_qs_button')) { //if switching position, remove old button first.
      document.getElementById('poolsToTop_qs_button').parentNode.removeChild(document.getElementById('poolsToTop_qs_button'));
    }
    if (settings_json.enable_poolsToTop == 1) { //currently enabled, switch to bottom
      settings_json.enable_poolsToTop = 0;
      poolsToTop(true);
    }
    else if (settings_json.enable_poolsToTop == 0) { //currently disabled, switch to top.
      settings_json.enable_poolsToTop = 1;
      poolsToTop();
    }
    LS_setValue('settings', JSON.stringify(settings_json));
  }
  
  var temp_p_button = $c('p', {
    id: 'poolsToTop_qs_button'
  });
  temp_p_button.innerHTML = 'v';
  var temp_sharedStyle = 'display: inline-block; position: absolute; font-weight: 900; width: 1em; font-size: 1.1em; right: -0.2em; ';
  addEvent(temp_p_button, 'click', function () { poolsToTop_qs(true) });

  if (settings_json.enable_poolsToTop == 1) {
    temp_p_button.setAttribute('style',temp_sharedStyle + 'bottom: -0.2em;');
  }
  else if (settings_json.enable_poolsToTop == 0) {
    temp_p_button.setAttribute('style',temp_sharedStyle + 'top: -0.2em;transform: scale(1, -1);-webkit-transform: rotate(180deg);');
  }
  attach_to.appendChild(temp_p_button);
}

function poolsToTop(reverse) {
  if(loc.indexOf('/posts/')==-1) return;
  var nav_links = document.getElementById('nav-links');
  if (!nav_links) return;
  try {
    var content = document.getElementById('content');
    var content1 = document.getElementById('content').firstChild;
    var image_container = document.getElementById('image-container');
    
    if (reverse) image_container.appendChild(nav_links); //pools are currently at the top, go to below image
    else content.insertBefore(nav_links, content1);
  }
  catch(e) {
    to_log('poolsToTop seems to have broken - error message: \n<br>',true);
  }
}



//==========================================================
// Endless Pages section
// Helper functions
//==========================================================

var ep_bl_userBlacklist;
function ep_bl(tags) {
  tags = tags.split(' ');

  if (typeof ep_bl_userBlacklist === 'undefined') { //process & store static var's, since this function gets called for every thumbnail that gets added.
    ep_bl_userBlacklist = getMetaContents('blacklisted-tags');
    if (!ep_rs) ep_bl_userBlacklist = ep_bl_userBlacklist + ',loli,shota';
    ep_bl_userBlacklist = ep_bl_userBlacklist.replace('rating:safe', 'rating:s').replace('rating:questionable', 'rating:q').replace('rating:explicit', 'rating:e'); //if long names are used, convert to shothand
    ep_bl_userBlacklist = ep_bl_userBlacklist.split(',');
    for (var i in ep_bl_userBlacklist) {
      ep_bl_userBlacklist[i] = ep_bl_userBlacklist[i].split(' ');
    }
  }
  var bl = [],
    bl_found = [],
    isBlockedByCustom = false,
    isBlockedByNormal = false;
  
  bl[0] = ep_bl_userBlacklist;
  if (settings_json.enable_customBlacklist) { //customBL is on
    bl[1] = customBlacklist_tags;
  }
  
  //first check if post needs to be blocked by normal blacklist (in which case, don't mark it as customblacklisted, so it cannot be unhidden)
  for (var x in bl[0]) {
    if (bl[0][x].length > 1) {
      if (bl[0][x].every(function (val) { return tags.indexOf(val) >= 0; })) { bl_found.push(bl[0][x]); isBlockedByNormal=true; }
    }
    else {
      for (var y in tags) {
        if (tags[y] == bl[0][x]) { bl_found.push(bl[0][x]); isBlockedByNormal=true; }
      }
    }
  }
  //post wasn't blacklisted, now check if it appears on customBlacklist
  if(settings_json.enable_customBlacklist && isBlockedByNormal===false) {
    for (var x in bl[1]) {
      if (bl[1][x].length > 1) {
        if (bl[1][x].every(function (val) { return tags.indexOf(val) >= 0; })) { bl_found.push(bl[1][x]); isBlockedByCustom=true; }
      }
      else {
        for (var y in tags) {
          if (tags[y] == bl[1][x]) { bl_found.push(bl[1][x]); isBlockedByCustom=true; }
        }
      }
    }
  }
  
  if(bl_found.length==0) return false;
  else return [bl_found,isBlockedByCustom];
}


function ep_scroll() {
  // https://developer.mozilla.org/en/DOM/window.scrollY#Notes
  if (ep_disableScroll) return;
  var stObj, stProp;
  if ('scrollY' in window) { // CSSOM: // http://www.w3.org/TR/cssom-view/#extensions-to-the-window-interface
    stObj = window;
    stProp = 'scrollY';
  } else if ('pageYOffset' in window) { // CSSOM too
    stObj = window;
    stProp = 'pageYOffset';
  } else {
    stObj = document.documentElement.clientHeight ? document.documentElement : document.body;
    stProp = 'scrollTop';
  }
  var node = document.documentElement.clientHeight ? document.documentElement : document.body; // let's assume it is IE in quirks mode
  var lastSt = -1;
  return function (e) {
    if (lastSt !== stObj[stProp] && // IE <= 8 fires twice
    ((node.scrollHeight - ep_scrollTrigger) <= stObj[stProp] + node.clientHeight)) {
      endlessPages();
    }
    lastSt = stObj[stProp];
  };
}


function endlessPages_init() {
  if (loc.indexOf("/posts?") != -1 || ((loc.indexOf("/posts") + 6) == loc.length) || ((loc.indexOf("donmai.us/") + 10) == loc.length)) ep_onPostsListPage = true;
  else if (loc.indexOf("/pools/") != -1 && loc.indexOf("/order/") == -1 && loc.indexOf("/search") == -1 && loc.indexOf("/new") == -1 && loc.indexOf("/edit") == -1) ep_onPoolsPage = true;
  else if (loc.indexOf("/posts/") != -1) ep_onPoolBrowse = true; //detect which page were are on
  else return; //not on a supported page

  if (ep_onPostsListPage || ep_onPoolsPage) {
    //this method of page-finding works in both search list & pools
    if(!document.getElementById('page')) { to_log('element "page" not found - endlesspages cannot init',true); return; }
    if (document.getElementById('page').innerHTML.indexOf('>Nobody here but us chickens!<') != -1) return; //empty page
    
    var paginator = $x("//div[@class='paginator']/menu/li/span")[0];

    //get page number from bottom page selector (will break if danbooru moves elements around)    
    try {
      if (document.getElementsByClassName('paginator')[0].firstChild.childNodes.length == 1 && !ep_rs) return; //single-page result detected
      paginator = parseInt(paginator.innerHTML, 10);
      ep_currentPage = paginator;
    } catch (e) {
      to_log('error parsing Current Page from paginator data\n<br>' + e,true)
    }

    if (!paginator || ep_currentPage == undefined) { //could not get pagenumber from paginator
      to_log('No paginator found, switching to url fall-back',true);

      var temp_loc = loc;
      if (loc.indexOf('page=') == -1) {
        ep_currentPage = 1; //no "page=" in link
      }
      else {
        temp_loc = parseInt(loc.substr(loc.indexOf('page=') + 5, 4), 10);
        if (isNaN(temp_loc)) { to_log('link-based page detecting failed, details:\nurl: ' + loc + '\ntemp_loc: ' + temp_loc,true); return; }

        ep_currentPage = temp_loc;
      }
    }
  }
  if(ep_onPostsListPage && loc.indexOf("limit=")!=-1) {
    ep_limit=parseInt(loc.substr(loc.indexOf("limit=")+6,3));
    ep_scrollTrigger = ep_scrollTrigger + ((ep_limit-20)*7); //pages with &limit take a lot longer to load (+560px on limit=100 & + 1260px on limit=200)
  }
  if (ep_rs && document.getElementsByClassName('post-preview').length < ep_limit) ep_currentPage = (ep_currentPage - 1);
  //init pools
  if (settings_json.enable_ep_pools && ep_onPoolsPage) {
    ep_pools_get_postlist();
  }
  if (settings_json.enable_ep_browse && ep_onPoolBrowse) {
    ep_browsePools_init();
  }

  addEvent(window, 'scroll', ep_scroll());
  endlessPages();
}


//==========================================================
//==================================================================================
// Endless Pages section
//==================================================================================
//==========================================================

function endlessPages() {
  if (ep_onPostsListPage   && settings_json.enable_ep_postsList) ep_postsList();
  else if (ep_onPoolsPage   && settings_json.enable_ep_pools)     ep_pools();
  else if (ep_onPoolBrowse && settings_json.enable_ep_browse)    ep_browsePools();
}//this function gets called often, must keep it short. (runs upon scrolling the page)



var ep_pag_currentPage,
    ep_pag_paginator,
    ep_pag_url;
function ep_paginator() { //lots of code, but should be pretty efficient in terms of speed. 
  if (!ep_pag_url) {
    ep_pag_url = loc;
    if (loc.indexOf('page=') != -1) {
      ep_pag_url = ep_pag_url.replace(/\?page=\d+&/g, '?'); //clear out the "page=" part without breaking the rest.
      ep_pag_url = ep_pag_url.replace(/\?page=\d+/g, '');
      ep_pag_url = ep_pag_url.replace(/&page=\d+/g, '');
    }
    (ep_pag_url.indexOf('?') != -1) ? (ep_pag_url = ep_pag_url + '&page=') : (ep_pag_url = ep_pag_url + '?page=');
  var paginator = null;
  }
  var paginator = document.getElementById('ep-paginator');
  if (!paginator) {
    var ep_pag = $c("div", {
      id: "ep-paginator"
    });
    if (ep_onPostsListPage) {
      document.getElementById('sidebar').appendChild(ep_pag);
    }
    else if (ep_onPoolsPage && ep_poolsPostlist.length > 60) {
      document.getElementById('c-pools').insertBefore(ep_pag, document.getElementById('c-pools').firstChild);
      var style='#ep-paginator { position: absolute; right: 2.5em; width: 15em; }'; //pools-only css
      addGlobalStyle(style);
    }
    else return;
    paginator = document.getElementById('ep-paginator'); //update 'paginator' var - required
    paginator.innerHTML = '<h1>Paginator</h1>'+
      '<ul id="pag_paginator"></ul>';
    ep_pag_paginator = document.getElementById('pag_paginator'); //'pag_' sounds kinda meh - but whatever
    ep_pag_paginator.appendChild($c("li", { id: 'pag_firstPage' }));
    ep_pag_paginator.appendChild($c("li", { class: 'pag_currentPage' }));
    
    document.getElementById('pag_firstPage').innerHTML = '<span>' + (ep_currentPage - 1) + '</span>'; //page on which the script started
    
    if (ep_currentPage >= 3) {
      ep_pag_paginator.insertBefore($c("li", {}), ep_pag_paginator.firstChild);
      ep_pag_paginator.childNodes[0].innerHTML = '<a href="' + ep_pag_url + (ep_currentPage - 2) + '">' + (ep_currentPage - 2) + '</a>';
    }
    if (ep_currentPage >= 4) {
      ep_pag_paginator.insertBefore($c("li", {}), ep_pag_paginator.firstChild);
      ep_pag_paginator.childNodes[0].innerHTML = '<a href="' + ep_pag_url + (ep_currentPage - 3) + '">' + (ep_currentPage - 3) + '</a>';
    }
    if (ep_currentPage > 4) {
      if (ep_currentPage != 5) {
        ep_pag_paginator.insertBefore($c("li", {}), ep_pag_paginator.firstChild);
        ep_pag_paginator.childNodes[0].innerHTML = '<span style="font-weight:400">...</span>';
      }
      ep_pag_paginator.insertBefore($c("li", {}), ep_pag_paginator.firstChild);
      ep_pag_paginator.childNodes[0].innerHTML = '<a href="' + ep_pag_url + '1">1</a>';
    }
    ep_pag_currentPage = document.getElementsByClassName('pag_currentPage')[0];
    ep_pag_currentPage.innerHTML = '<a href="' + ep_pag_url + ep_currentPage + '">' + ep_currentPage + '</a>';
    
    var style = 'ul#pag_paginator li { display: inline-block;list-style-type: none;margin: 0.25em 0.1em;padding: 0.1em; }'+ //general li styling
    'ul#pag_paginator li a { border: 1px solid #EAEAEA; padding: 0.2em 0.25em; }'+                                          //<a> styling (changes li)
    'ul#pag_paginator li span { font-weight: 700;margin: 0.25em 0.1em;padding: 0.1em;}'+                                    //link-less li's
    'ul#pag_paginator li.pag_currentPage a { background-color:#69C6F5}'+                                                    //background for current page
    '#c-pools #a-show #description { min-height:26px; min-width:26px; }'+                                                  
    '#c-pools #a-show #description p { margin-right:18em;min-width:30em; }'+                                                //so the description doesn't overlap
    '';
                                                
    addGlobalStyle(style);
  }
  else {
    ep_pag_currentPage.className = '';
    ep_pag_paginator.appendChild($c("li", { class: 'pag_currentPage' }));
    
    ep_pag_currentPage = document.getElementsByClassName('pag_currentPage')[0];
    ep_pag_currentPage.innerHTML = '<a href="' + ep_pag_url + ep_currentPage + '">' + ep_currentPage + '</a>';
    if(ep_onPoolsPage) { document.getElementById('description').style.minHeight=parseInt(ep_pag_paginator.offsetHeight)+'px'; }
  }
}



//=======================================
// Endless pages - postslist
//=======================================



function ep_postsList(add) {
  if (add == undefined && (!ep_lockQuerry)) {
    ep_lockQuerry = true;
    var t4="";
    if(loc.indexOf('tags=')!=-1) t4=loc.substring(loc.indexOf('tags=')+5);
    if(t4.indexOf('&')!=-1) t4=t4.substring(0,t4.indexOf('&'));
    var query = "/posts.json?tags=" + t4 + "&page=" + (ep_currentPage + 1) + '&limit='+ep_limit;
    $q(query, ep_postsList, undefined, 1);
  }
  else if (add && add.indexOf('{"success": false, "message":') !== -1) {
    to_log('An unknown error occured: '+add,true);
    ep_lockQuerry = false;
  }
  else if (add && (!ep_disableScroll)) {
    if (add == "[]\n" || add == "[]") {
      ep_disableScroll = true;
      return;
    } //reached end of the search results
    add = JSON.parse(add);
    var post;
    //page splitter
    var pg_ind = $c("p", {
      class: "pg_ind",
      style: "display:inline-block; float: left; height:154px; margin:0px 10px 10px 0px; overflow:hidden; text-align:center; vertical-align:baseline; width:154px; border: 2px solid transparent;"
    });
    pg_ind.innerHTML = "<br/><br/>Page " + (ep_currentPage + 1) + "~";
    $x("//div[@id='posts']")[0].insertBefore(pg_ind, $x("//div[@id='posts']/div[@class='paginator']")[0]);
    for (post in add) {
      
      if ($x("//article[@data-id='" + add[post].id + "']")[0]) {
        to_log('duplicate found, not adding to page' + add[post].id);
        continue;
      }
      var bl_response=ep_bl(add[post].tag_string+' rating:'+add[post].rating),
          ep_postClass='';
      
      if(bl_response) { //bl has 'return false;' if no blacklisted tag is found
        if(bl_response[1]===true) {
          customBlacklist_add(1);
          ep_postClass=' customBlacklisted';
        }
        else if(bl_response[0].length>0) continue;
      }
      
      if (add[post].is_flagged) ep_postClass += ' post-status-flagged';
      else if (add[post].is_pending) ep_postClass += ' post-status-pending';
      else if (add[post].has_children) ep_postClass += ' post-status-has-children';
      else if (add[post].parent_id) ep_postClass += ' post-status-has-parent';
      var art = $c("article", {
        class: "post-preview" + ep_postClass,
        id: "post_" + add[post].id,
        "data-id": add[post].id,
        "data-tags": add[post].tag_string,
        "data-uploader": add[post].uploader_id,
        "data-rating": add[post].rating,
        "data-width": add[post].image_width,
        "data-height": add[post].image_height,
        "data-flag": (add[post].flag ? add[post].flag : ""), //not sure what this is used for
        "data-parent-id": (add[post].parent_id ? add[post].parent_id : ""),
        "data-has-children": add[post].has_children,
        "data-score": add[post].score
      });
      var art_a = $c("a", {
        href: "/posts/" + add[post].id
      });
      var art_a_img = $c("img", {
        src: "/ssd/data/preview/" + add[post].md5 + ".jpg", //previews are ALWAYS jpg!
        alt: add[post].tag_string,
        title: add[post].tag_string
          + "\n user:"
          + add[post].uploader_id
          + "\n rating:"
          + add[post].rating
          + "\n score:" + add[post].score
      });
      //append article element, insert other nodes with outerHTML - outerHTML might not be compatible with older browsers
      $x("//div[@id='posts']")[0].insertBefore(art, $x("//div[@id='posts']/div[@class='paginator']")[0]);
      document.getElementById("post_" + add[post].id).innerHTML = art_a.outerHTML;
      document.getElementById("post_" + add[post].id).firstChild.innerHTML = art_a_img.outerHTML;
    }
    ep_currentPage++;
    if(settings_json.enable_ep_paginator) ep_paginator();
    //only allow the next querry in half a second, small but should be effective delay.
    //firefox/chrome-compatible timeout
    setTimeout(function () { ep_lockQuerry = false; ep_scroll()(); }, 500);
  }
}



//=======================================
// Endless pages - pools
//=======================================

function ep_pools_get_postlist(list) {
  if (list == undefined && (!ep_poolsPostlist)) {
    var poolnumber = loc.substr(loc.indexOf('/pools/') + 7); //pool number is only found in title and links on the page
    if (poolnumber.indexOf('?') != -1) poolnumber = poolnumber.substring(0, poolnumber.indexOf('?'));
    to_log('poolnumber: ' + poolnumber);
    
    var query = "/pools/" + poolnumber + ".json";
    $q(query, ep_pools_get_postlist, undefined, 1);
  }
  else if (list) {
    list = JSON.parse(list);
    if (list.post_ids) {
      ep_poolsPostlist = list.post_ids;;
      ep_poolsPostlist = ep_poolsPostlist.split(' ');
      ep_scroll()(); //we know what posts are in the pool now, let's check if the user scrolled to the bottom
    }
    else to_log('ep_pools_get_postlist - unknown list returned'+list);
  }
}

function ep_pools(add) {
  if (!ep_poolsPostlist) return;
  if (add == undefined && (!ep_lockQuerry)) {
    ep_lockQuerry = true;
    //begin building list of posts to querry
    var t1 = 0;
    ep_poolsToQueryList = [];
    for (i = (ep_currentPage * 20); i < ep_poolsPostlist.length; i++) {
      ep_poolsToQueryList[t1] = ep_poolsPostlist[i];
      t1++;
      if (t1 == 20) break;
    }
    if (ep_poolsToQueryList.length == 0) {
      ep_disableScroll = true;
      return;
    }
    to_log('ep_poolsToQueryList:'+ep_poolsToQueryList+' - '+'ep_poolsToQueryList.length'+ep_poolsToQueryList.length);
    var query = '/posts.json?tags=id:' + ep_poolsToQueryList;
    $q(query, ep_pools, undefined, 1);
  }
  
  else if (add) {
    if (add == "[]\n" || add == "[]") {
      to_log('ep_pools - end reached');
      ep_disableScroll = true;
      return;
    } //reached end of the search results //might not be needed as there is null-detection, but can't hurt.
    add = JSON.parse(add);
    
    if (add.length != ep_poolsToQueryList.length) to_log('error, add.length: ' + add.length + '\nep_poolsToQueryList.length: ' + ep_poolsToQueryList.length);
    var post;
    var pg_ind = $c("p", {
      class: "pg_ind",
      style: "display:inline-block; float: left; height:154px; margin:0px 10px 10px 0px; overflow:hidden; text-align:center; vertical-align:baseline; width:154px; border: 2px solid transparent;"
    });
    pg_ind.innerHTML = "<br/><br/>Page " + (ep_currentPage + 1) + "~";
    $x("//div[@id='a-show']/section")[0].insertBefore(pg_ind, $x("//div[@id='a-show']/section/div[@class='paginator']")[0]);
    for (i1 = 0; i1 < ep_poolsToQueryList.length; i1++) {
     t2=null;
      for (x = 0; x < add.length; x++) {
        if (add[x].id == ep_poolsToQueryList[i1]) {
          t2 = x;
          //to_log('id selected: ' + add[x].id + '\nIn pool list: ' + i1 + '\n' + x);
        }
      }
      if (t2==null) continue; //deleted post ID's show up in the post list, but don't show up in the detailed query
      if ($x("//article[@data-id='" + add[t2].id + "']")[0]) {
        to_log('duplicate found, not adding to page' + add[t2].id);
        continue;
      }
      
      var bl_response=ep_bl(add[t2].tag_string+' rating:'+add[t2].rating);
      var ep_postClass='';
      
      if(bl_response) {
        if(bl_response[1]===true) {
          customBlacklist_add(1);
          ep_postClass=' customBlacklisted';
        }
        else if(bl_response[0].length>0) continue;
      }
      
      if (add[t2].is_flagged) ep_postClass += ' post-status-flagged';
      else if (add[t2].is_pending) ep_postClass += ' post-status-pending';
      else if (add[t2].has_children) ep_postClass += ' post-status-has-children';
      else if (add[t2].parent_id) ep_postClass += ' post-status-has-parent';
      var art = $c("article", {
        class: "post-preview" + ep_postClass,
        id: "post_" + add[t2].id,
        "data-id": add[t2].id,
        "data-tags": add[t2].tag_string,
        "data-uploader": add[t2].uploader_id,
        "data-rating": add[t2].rating,
        "data-width": add[t2].image_width,
        "data-height": add[t2].image_height,
        "data-flag": (add[t2].flag ? add[t2].flag : ""), //not sure what this is used for
        "data-parent-id": (add[t2].parent_id ? add[t2].parent_id : ""),
        "data-has-children": add[t2].has_children,
        "data-score": add[t2].score
      });
      var art_a = $c("a", {
        href: "/posts/" + add[t2].id
      });
      var art_a_img = $c("img", {
        src: "/ssd/data/preview/" + add[t2].md5 + ".jpg", //previews are ALWAYS jpg!
        alt: add[t2].tag_string,
        title: add[t2].tag_string
        + "\n user:"
        + add[t2].uploader_id
        + "\n rating:"
        + add[t2].rating
        + "\n score:"
        + add[t2].score
      });
      $x("//div[@id='a-show']/section")[0].insertBefore(art, $x("//div[@id='a-show']/section/div[@class='paginator']")[0]);
      document.getElementById("post_" + add[t2].id).innerHTML = art_a.outerHTML;
      document.getElementById("post_" + add[t2].id).firstChild.innerHTML = art_a_img.outerHTML;
    }
    ep_currentPage++;
    if(settings_json.enable_ep_paginator) ep_paginator();
    setTimeout(function () { ep_lockQuerry = false; ep_scroll()(); }, 500);
  }
}


//=======================================
// Endless pages - browse Pool - aka series reading mode
//=======================================

function rs_check(e){if(e){if(e.length>1000){if(e.indexOf('id="image"')==-1)ep_rs=0;else ep_rs='a';LS_setValue("ep_rs",ep_rs)}}}

var ep_browsePools_pool = null;
function ep_browsePools_init(rs) {
  var pool_nav = document.getElementById('pool-nav');
  if (!rs && pool_nav) {
    var temp_next = pool_nav.getElementsByClassName('next');
    for (i = 0; i < temp_next.length; i++) {
      if (temp_next[i].nodeName == 'A') {
        ep_browsePools_pool = temp_next[i].href.substring(temp_next[i].href.indexOf('pool_id=') + 8);
        var new_button = $c('p', {
          id: ep_browsePools_pool,
          class: "browsePool",
          style: '',
        });
        new_button.innerHTML = 'Browse';
        temp_next[i].parentNode.insertBefore(new_button, temp_next[i]);
        addEvent(new_button, 'click', function () {
          this.className = 'browsePoolActive';
          ep_browsePools_getList(this.id, true);
          this.style.color = 'green';
        });
      }
    }
    
  var style =
    '.ep-browse-note-container div.note-box { background: transparent;border: 1px solid #FFFFFF;cursor: move;height: 100px;min-height: 5px;min-width: 5px;position: absolute;width: 100px;}' +
    '.ep-browse-note-container div.note-box div.note-box-inner-border { background: white;border: 1px solid #000000;}' +
    '.ep-browse-note-container div.note-body { background: white;border: 1px solid #000000;cursor: pointer;line-height: normal;min-height: 1em;min-width: 10px;overflow: auto;padding: 4px;position: absolute;z-index: 1500; }'+
    '.ep-browse-note-container div.note-body h1, .ep-browse-note-container div.note-body h2, .ep-browse-note-container div.note-body h3, .ep-browse-note-container div.note-body h4, .ep-browse-note-container div.note-body h5, .ep-browse-note-container div.note-body h6, .ep-browse-note-container div.note-body a, .ep-browse-note-container div.note-body span, .ep-browse-note-container div.note-body div, .ep-browse-note-container div.note-body blockquote, .ep-browse-note-container div.note-body br, .ep-browse-note-container div.note-body p, .ep-browse-note-container div.note-body ul, .ep-browse-note-container div.note-body li, .ep-browse-note-container div.note-body ol, .ep-browse-note-container div.note-body em, .ep-browse-note-container div.note-body strong, .ep-browse-note-container div.note-body small, .ep-browse-note-container div.note-body big, .ep-browse-note-container div.note-body b, .ep-browse-note-container div.note-body i, .ep-browse-note-container div.note-body font, .ep-browse-note-container div.note-body u, .ep-browse-note-container div.note-body s, .ep-browse-note-container div.note-body code, .ep-browse-note-container div.note-body center { line-height: normal; }'+ //just everything line-height:normal
    '.ep-browse-note-container p.tn { color: gray; font-size: 0.8em; }' +
    '.ep-browse-note-container b, strong { font-weight: bold; }' +
    '.ep-browse-note-container i, em { font-style: italic; }' +
    '.ep-browse-note-container small { font-size: 0.8em; }' +
    '.ep-browse-main div {white-space: normal;}' +
    '.ep-browse-image-container {display:inline-block; float:left; padding-right:0.8em; position:relative;}' +
    '.ep-browse-comments { display:inline-block; width:48em; border-bottom: 2px solid #888888; border-top: 2px solid #888888; }' +
    '.ep-browse-comments div.comments-for-post div.list-of-comments article.comment div.author { width:11em;margin-right:1em; }' +
    '.ep-browse-comments div.comments-for-post div.list-of-comments article.comment div.content { width:30em; }' +
    '.ep-browse-tag-list { display:inline-block; padding: 0.5em 0px 2em 1em; width:20em; }' +
    '.ep-browse-spacer { clear:both; }' +
    //'.ep-browse-spacer { clear:both; width:100%; height:1em; border-bottom:2px solid black; margin-bottom:1em; }' +
    
    '.ep-browse-main, .ep-browse-main2 { padding-top:15px;border-top:2px solid black;}' +
    '.ep-browse-main { margin-top:15px; }' +
    '.ep-browse-main2 { margin-top:-17px; }' +
    
    '.browsePool, .browsePoolActive { position:absolute; right:5.3em; top:0px; width:4em; }'+
    '#pool-nav li { padding-right: 9.3em!important; } '+
    '';
    
  addGlobalStyle(style);
  }
  
  if(ep_rs) {
    var image_container = document.getElementById('image-container');
    if(!image_container) { to_log('could not get getElementById("image-container") in ep_browsePools_init'); return; }
    if(image_container.innerHTML.indexOf('/users/')==-1 && image_container.innerHTML.indexOf('requested') == -1) return;
    if(rs) {
      rs=JSON.parse(rs);
      image_container.getElementsByTagName('p')[0].style.display='none';
      if(rs.file_ext=="swf") {
        image_container.appendChild($c('embed', {
          height:rs.image_height,
          width:rs.image_width,
          'allowScriptAccess':'never',
          src:'/data/'+rs.md5+'.swf'
        }));
      }
      else {
        image_direct=$c('img', {
          'data-original-height':rs.image_height,
          'data-original-width':rs.image_width,
          'height':rs.image_height,
          'width':rs.image_width,
          'id':'image',
          'src':'/data/'+rs.md5+"."+rs.file_ext });
            
        image_container.appendChild(image_direct);
       
        var temp_note,
            temp_noteBox,
            temp_noteBoxInner,
            temp_noteBody,
            note_container = document.getElementById('note-container'),
            note_storage = document.getElementById('notes').getElementsByTagName('article');

        // #Notes# - sort & build all note, append to virtual element
        for (i = 0; i < note_storage.length; i++) {
          temp_note = note_storage[i];
          temp_noteBox = $c('div', {
            class: 'note-box ui-draggable ui-resizable note_' + temp_id,
            'data-id': temp_note.getAttribute('data-id'),
            'id': 'note_' + temp_note.getAttribute('data-id'),
            style: 'position:absolute;left: '+temp_note.getAttribute('data-x')+'px; top: ' +temp_note.getAttribute('data-y')+'px; width: ' + temp_note.getAttribute('data-width')+'px; height: ' + temp_note.getAttribute('data-height') + 'px; '
          });
          temp_noteBoxInner = $c('div', {
            class: 'note-box-inner-border',
            style: 'opacity: 0.5;height: '+(temp_note.getAttribute('data-height')-2)+'px; width: ' +(temp_note.getAttribute('data-width') -2)+'px; '
          });
          temp_noteBody = $c('div', {
            class: 'note-body',
            'data-id': temp_note.getAttribute('data-id'),
            'id': 'noteBody_' + temp_note.getAttribute('data-id'),
            style: 'height: auto;top: ' + ((temp_note.getAttribute('data-y') * 1 + temp_note.getAttribute('data-height') * 1) + 5) +'px; left: ' + temp_note.getAttribute('data-x') + 'px; width:10px;display:block;'
          });
          temp_noteBody.innerHTML = temp_note.innerHTML;
          if (temp_noteBody.innerHTML.indexOf('<tn>') != -1) temp_noteBody.innerHTML = temp_noteBody.innerHTML.replace('<tn>', '<p class="tn">').replace('</tn>', '</p>');
          if (temp_noteBody.innerHTML.indexOf('\n') != -1) temp_noteBody.innerHTML = temp_noteBody.innerHTML.replace('\n', '<br/>');
          note_container.appendChild(temp_noteBox);
          temp_noteBox.appendChild(temp_noteBoxInner);
          note_container.appendChild(temp_noteBody);
          
          addEvent(temp_noteBox, 'mouseover', function () { document.getElementById('noteBody_' + this.getAttribute('data-id')).style.display = 'block'; });
          addEvent(temp_noteBox, 'mouseout', function () { document.getElementById('noteBody_' + this.getAttribute('data-id')).style.display = 'none'; });
        }
        
        var temp=document.getElementById('note-container').getElementsByClassName('note-body');
        for(i=0;i<temp.length;i++) {
          temp[i].style.width=(temp[i].scrollWidth)+'px';
          var w = parseInt(temp[i].scrollWidth,10);
          var h = parseInt(temp[i].scrollHeight,10);
          var golden_ratio = 1.618;

          while (w / h < golden_ratio) { w = w * 1.025; h = h / 1.025; }

          while (w / h > golden_ratio) { w = w / 1.025; h = h * 1.025; }
          temp[i].style.width = w+"px";
          
          var temp_scrollWidth=temp[i].scrollWidth;
          var temp_offsetWidth=temp[i].offsetWidth;
          
          temp[i].style.display='none';
          
          if(temp_offsetWidth-2 < temp_scrollWidth) temp[i].style.width=(temp_scrollWidth-6)+'px';
        
        }
        
        
        var note_showHide = function(e){
            
            if(e.shiftKey) var notes=this.parentNode.getElementsByTagName('div')[0].getElementsByClassName('note-body');
            else var notes=this.parentNode.getElementsByTagName('div')[0].getElementsByClassName('note-box');
            
            for(i=0;i<notes.length;i++) {
              notes[i].style.display=="none" ? notes[i].style.display="block" : notes[i].style.display="none"
            }
        };
        document.getElementById('image').addEventListener('click', note_showHide);
        
      
      
      }
    }
    else {
      $q(loc.substring(loc.indexOf('/posts/'),(loc.indexOf('?')==-1 ? 200 : loc.indexOf('?')))+'.json', ep_browsePools_init, undefined, 1);
    }
  }
}

function ep_browsePools_editTags() {
  var oldTags = document.getElementById('tags_' + this.getAttribute('data-id')).innerHTML.split(' ');
  var newTags = document.getElementById('newTags_' + this.getAttribute('data-id')).value;
  var responseDiv = document.getElementById('response_' + this.getAttribute('data-id'));
  var tagsChanged = '<span style="font-size:120%;font-weight:bold">Tags Changed:</span>';
  var query = '/posts/' + this.getAttribute('data-id') + '.json?post[tag_string]=' + newTags;
  newTags = newTags.split(' '); //split only after Query took a copy of it

  for (var x = 0; x < oldTags.length; x++) {
    if (newTags.indexOf(oldTags[x]) == -1 && oldTags[x] != '') tagsChanged += '<br/><span style="color:red">- ' + oldTags[x] + '</span>';
  }
  for (var x = 0; x < newTags.length; x++) {
    if (oldTags.indexOf(newTags[x]) == -1 && newTags[x] != '') tagsChanged += '<br/><span style="color:green">+ ' + newTags[x] + '</span>';
  }

  tagsChanged += '<br/><br/>&lt;- List does not auto-update';
  responseDiv.innerHTML = tagsChanged;
  responseDiv.style.display = 'block';

  $q(query, function () {}, "PUT", 1);
  this.disabled = true;
}


function ep_browsePools_markTranslated() {
  var tagString = document.getElementById('tags_' + this.getAttribute('data-id')).innerHTML;
  var tagArray = tagString.split(' ');
  var tagsChanged = '';
  if (tagString.indexOf('translation_request') == -1 && tagString.indexOf('commentary_request') == -1) {
    if (tagString.indexOf('translated') == -1) {
      tagString = tagString + ' translated';
      tagsChanged += '+ translated\n\n';
    }
    else {
      document.getElementById('response_' + this.getAttribute('data-id')).innerHTML += '<br/>Post is already marked Translated';
      return;
    }
  }
  else {
    if (tagString.indexOf('translation_request') != -1) {
      tagString = tagString.replace('translation_request', '');
      tagsChanged += '- translation_request\n';

      if (tagString.indexOf('partially_translated') != -1) {
        tagString = tagString.replace('partially_translated', '');
        tagsChanged += '- partially_translated\n';
      }
      if (tagString.indexOf('check_translation') != -1) {
        tagString = tagString.replace('check_translation', '');
        tagsChanged += '- check_translation\n';
      }
      tagString = tagString + ' translated';
      tagsChanged += '+ translated\n\n';
    }
    if (tagString.indexOf('commentary_request') != -1) {
      tagString = tagString.replace('commentary_request', 'commentary');
      tagsChanged += '- commentary_request\n';
      tagsChanged += '+ commentary\n\n';
    }
  }
  tagString=tagString.replace(/\s\s/g,' '); //replace double-space with single space
  
  if (confirm('Confirm Mark Translated:\nTag Changes:\n' + tagsChanged)) {
    var query = '/posts/' + this.getAttribute('data-id') + '.json?post[tag_string]=' + tagString;
    $q(query, function () {}, "PUT", 1);
    document.getElementById('response_' + this.getAttribute('data-id')).innerHTML += '<br/><span style="font-size:120%;font-weight:bold;color:green;">Post marked as Translated:' + tagsChanged.replace('\n', '<br/>') + '</span><br/><br/>&lt;- List does not auto-update';
  }
  this.disabled = true;
}

var ep_browsePools_list;
var ep_browsePools_poolID;
function ep_browsePools_getList(list, isPool) {
  if (isPool && !ep_browsePools_list) {
    ep_browsePools_poolID = list;

    var temp_browseButtons = document.getElementsByClassName('browsePool');
    for (i = temp_browseButtons.length - 1; i >= 0; i--) { //remove other buttons
      temp_browseButtons[i].parentNode.removeChild(temp_browseButtons[i]);
    }

    var query = "/pools/" + list + ".json";
    $q(query, ep_browsePools_getList, undefined, 1);
  }
  else if (list && !isPool) {
    list = JSON.parse(list);
    if (list.post_ids) {
      ep_browsePools_list = list.post_ids;;
      ep_browsePools_list = ep_browsePools_list.split(' ');
      ep_scroll()(); //we know what posts are in the pool now, let's check if the user scrolled to the bottom
    }
    else to_log('unknown list returned' + list);
  }
}

var temp_doc; //these could go as local vars, but doesn't matter too much - makes debugging/updating a lot easier
var temp_id;
function ep_browsePools(post,rs) {
  if (!ep_browsePools_list) return;
  if (!post && !ep_lockQuerry) {
    ep_lockQuerry = true;      //lock - don't allow a second query to start before the first one finished
    var next_id = null;        //find out what post to add next from the pool
    var current_index = null;
    if (document.getElementsByClassName('ep-browse-spacer').length > 0) {
      current_index = document.getElementById('a-show').lastChild.id.replace('ep_container_', '');
    }
    else { //get latest post ID, either from last-added img or from the current (only) img
      current_index = getMetaContents('post-id');
    }
    current_index = parseInt(current_index);
    for (i = 0; i < ep_browsePools_list.length - 1; i++) {
      if (ep_browsePools_list[i] == current_index) next_id = ep_browsePools_list[i + 1];
    }
    if (next_id == null) {
      var div_endOfPool=$c("div", { class:'ep-browse-spacer' });
      div_endOfPool.innerHTML='<p style="text-align:center;margin:0.5em;"><span style="font-size:120%">Reached end of pool</span><br>browsed '+(document.getElementsByClassName('ep-browse-spacer').length+1)+'/'+ep_browsePools_list.length+' posts</p>';
    document.getElementById('a-show').appendChild(div_endOfPool);
      to_log('reached end browsing pool: ' + ep_browsePools_list +'<br>'+ ep_browsePools_list.length);
      return;
    }
    var query = '/posts/' + next_id + '?pool_id=' + ep_browsePools_poolID;
    $q(query, ep_browsePools, undefined, 1);
  }
  
  else if (post) {
    temp_doc = document.implementation.createHTMLDocument("temp"); //getting the entire page is slower then an api call, but
    temp_doc.documentElement.innerHTML = post;                     //most likely faster then 3-4 calls to get the comments, picture, notes, etc.

    temp_id = temp_doc.getElementById('comments').childNodes[1].getAttribute('data-post-id'); //id of the image we are currently working with

    var temp_image_container = temp_doc.getElementById('image-container');
    var temp_image_direct = temp_doc.getElementById('image');
    
    if(!temp_image_direct) { //no image found, thus skip
      if(ep_rs=='a') {
        if (rs) {
          rs = JSON.parse(rs);
          getMetaContents('default-image-size');
          temp_image_direct = $c('img', {
            'data-original-height': rs.image_height,
            'data-original-width': rs.image_width,
            'height': rs.image_height,
            'width': rs.image_width,
            'id': 'image',
            'src': '/data/' + rs.md5 + "." + rs.file_ext
          });

          temp_image_container.getElementsByTagName('p')[0].style.display = 'none';
          temp_image_container.appendChild(temp_image_direct);

          temp_doc.body.appendChild($c('input', { id: 'post_old_tag_string', value: rs.tag_string }));
        }
        else {
          ep_rs = ep_rs + post;
          $q('/posts/' + temp_id + '.json', ep_browsePools_rs, undefined, 1);
          return;
        }
      }
      else if (ep_rs == 0) {
        var temp_ep_container_ = $c("div", { id: 'ep_container_' + temp_id, class: 'ep-browse-main', style: 'white-space:nowrap' });
        document.getElementById('a-show').appendChild($c("div", { class: 'ep-browse-spacer' }));
        temp_ep_container_.appendChild(temp_image_container.getElementsByTagName('p')[0]);
        document.getElementById('a-show').appendChild(temp_ep_container_);
        ep_lockQuerry = false; //unlocked, lets the next query begin
        return;
      }
      else return;
    }
    var temp_image_height = temp_image_direct.height;
    
    //change image container & comments from section to div
    temp_image_container.outerHTML = temp_image_container.outerHTML.replace('<section ', '<div ').replace('</section>', '</div>');

    //when using outerHTML & replace, elements saved as var's might fail sometimes.
    temp_doc.getElementById('comments').outerHTML = temp_doc.getElementById('comments').outerHTML.replace('<section ', '<div ').replace('</section>', '</div>');
    
    
    var temp_note,
        temp_noteBox,
        temp_noteBoxInner,
        temp_noteBody,
        note_container = temp_doc.getElementById('note-container'),
        note_storage = temp_doc.getElementById('notes').getElementsByTagName('article'),
        note_ratio = temp_image_direct.width / temp_image_direct.getAttribute('data-original-width');

    // #Notes# - sort & build all note, append to virtual element
    for (i = 0; i < note_storage.length; i++) {
      temp_note = note_storage[i];
      temp_noteBox = $c('div', {
        class: 'note-box ui-draggable ui-resizable note_' + temp_id,
        'data-id': temp_note.getAttribute('data-id'),
        'id': 'note_' + temp_note.getAttribute('data-id'),
        style: 'position:absolute;'+
          'left: '+temp_note.getAttribute('data-x')*note_ratio+'px; '+
          'top: ' +temp_note.getAttribute('data-y')*note_ratio+'px; '+
          'width: ' + temp_note.getAttribute('data-width')*note_ratio+'px; '+
          'height: ' + temp_note.getAttribute('data-height')*note_ratio + 'px; '
      });
      temp_noteBoxInner = $c('div', {
        class: 'note-box-inner-border',
        style: 'opacity: 0.5;'+
          'height: '+(temp_note.getAttribute('data-height')*note_ratio-2)+'px; '+
          'width: ' +(temp_note.getAttribute('data-width')*note_ratio -2)+'px; '
      });
      temp_noteBody = $c('div', {
        class: 'note-body',
        'data-id': temp_note.getAttribute('data-id'),
        'id': 'noteBody_' + temp_note.getAttribute('data-id'),
        style: 'height: auto;'+
          'top: ' + ((temp_note.getAttribute('data-y') * 1 + temp_note.getAttribute('data-height') * 1)*note_ratio + 5) +'px; '+
          'left: ' + temp_note.getAttribute('data-x')*note_ratio + 'px; '+
          'width:10px;' + //gets corrected later, depends on text inside the note
          'display:block;'
      });
      temp_noteBody.innerHTML = temp_note.innerHTML; //scraped note text to generated note
      if (temp_noteBody.innerHTML.indexOf('<tn>') != -1) temp_noteBody.innerHTML = temp_noteBody.innerHTML.replace('<tn>', '<p class="tn">').replace('</tn>', '</p>');
      if (temp_noteBody.innerHTML.indexOf('\n') != -1) temp_noteBody.innerHTML = temp_noteBody.innerHTML.replace('\n', '<br/>');
      note_container.appendChild(temp_noteBox);    //put notebox into container
      temp_noteBox.appendChild(temp_noteBoxInner); //put notebox_inner
      note_container.appendChild(temp_noteBody);   //and the last part, notebody into container
      
      addEvent(temp_noteBox, 'mouseover', function () {
        document.getElementById('noteBody_' + this.getAttribute('data-id')).style.display = 'block';
      });
      addEvent(temp_noteBox, 'mouseout', function () {
        document.getElementById('noteBody_' + this.getAttribute('data-id')).style.display = 'none';
      }); //tried to add a timer here for delayed text disappears, but it messed up, maybe later...
    }
    
    
    //fix all ID's so they don't conflict - must be direct calls, not var's
    temp_doc.getElementById('image-container').className = 'ep-browse-image-container';
    temp_doc.getElementById('image-container').id = 'image-container_' + temp_id;
    temp_doc.getElementById('note-container').className = 'ep-browse-note-container';
    temp_doc.getElementById('note-container').id = 'note-container_' + temp_id;
    temp_doc.getElementById('image').id = 'image_' + temp_id;
    temp_doc.getElementById('comments').className = 'ep-browse-comments';
    temp_doc.getElementById('comments').id = 'comments_' + temp_id;
    
    
    // #Comments# - clean up links & features that don't work with multiple images on 1 page
    // Reply, edit, vote up/down, etc.. are all disabled.
    var t2=temp_doc.getElementsByClassName('content');
    for(i=0;i<t2.length;i++) {
      t2[i].removeChild(t2[i].getElementsByTagName('menu')[0]);
    }
    var t3=temp_doc.getElementsByClassName('new-comment')[0];
    t3.parentNode.removeChild(t3);
    
    
    var temp_a_show=document.getElementById('a-show');
    //1: create seperatator div    2: create container div for this image ID    3:put image-container into container
    temp_a_show.appendChild($c("div", { class:'ep-browse-spacer' }));
    var temp_ep_container_ = $c("div", { id:'ep_container_'+temp_id, class:'ep-browse-main', style:'white-space:nowrap' });
    
    // image-container has the image & notes, create another container for all other stuff (pools/comments/tags)
    var temp_ep_container2_ = $c("div", { id:'ep_container2_'+temp_id, class:'ep-browse-main2', style:'display:inline-block; width:50em; overflow-y:scroll; min-height:180px; max-height:' + temp_image_height + 'px;' });
      
    
    //append image-container to the main post container - moved here so the blacklist can access the image-container style
    temp_ep_container_.appendChild(temp_doc.getElementById('image-container_'+temp_id));
    
    
    // Gather information like rating, uploader, score
    var info=temp_doc.getElementById('sidebar').getElementsByTagName('section'),
        info_uploader, info_date, info_rating, info_score, info_favcount, info_status;
    
    
    for (var i = 0; i < info.length; i++) {
      if (info[i].innerHTML.indexOf('<h1>Information') != -1) {
        info = info[i].getElementsByTagName('li');
        break;
      }
    }
    
    for (var i = 0; i < info.length; i++) {
      if (info[i].innerHTML.indexOf('Uploader:') != -1) {
        info_uploader = info[i].getElementsByTagName('a')[0].outerHTML;
      }
      else if (info[i].innerHTML.indexOf('Date:') != -1) {
        info_date = info[i].getElementsByTagName('time')[0].outerHTML;
      }
      else if (info[i].innerHTML.indexOf('Rating: ') != -1) {
        info_rating = info[i].innerHTML.substr(info[i].innerHTML.indexOf('Rating: ') + 8, 1).toLowerCase();
      }
      else if (info[i].innerHTML.indexOf('Status:') != -1) {
        info_status = info[i].innerHTML.substr(info[i].innerHTML.indexOf('Status:') + 7).trim();
        if (info_status == 'Active') info_status = '';
        else if (info_status == 'Pending') info_status = '<br/><strong>Status: <span style="color:blue">Pending</span></strong>';
        else if (info_status == 'Flagged') info_status = '<br/><strong>Status: <span style="color:red">Flagged</span></strong>';
        else info_status = '<br/><strong>Status</strong>: ' + info_status;
      }
    }
    info_score = temp_doc.getElementById('score-for-post-' + temp_id).innerHTML;
    info_favcount = temp_doc.getElementById('favcount-for-post-' + temp_id).innerHTML;
    
    
    var info_container = $c("p", { id:'info_container_'+temp_id, style:'margin-bottom:0.5em;'});
    info_container.innerHTML=
      '<a href="/posts/'+temp_id+'" style="font-weight:bold">Post #'+temp_id+'</a>'+
      ' &ensp;<strong>Uploader</strong>:<span style="font-size:85%"> '+info_uploader+' ('+info_date+')</span>'+
      ' &ensp;<strong>Rating</strong>: '+info_rating+
      ' &ensp;<strong>Score</strong>: '+info_score+
      //' - Favorites: '+info_favcount+ //can be added
      info_status;
      
    
    
    
    temp_ep_container2_.appendChild(info_container);
    
    // #Other pools list# Create a list of all extra pools a post has, excluding the pool you are already browsing
    var temp_otherPools = $c('p', { style: 'padding:0.5em 0em;' });
    temp_otherPools.innerHTML = 'Other pools: ';
    temp_ep_container2_.appendChild(temp_otherPools);

    var temp_otherPoolsList = temp_doc.getElementById('pool-nav').getElementsByTagName('li');
    if (temp_otherPoolsList.length == 1) temp_otherPools.innerHTML += 'None';
    else {
      for (i = 0; i < temp_otherPoolsList.length; i++) {
        if (temp_otherPoolsList[i].innerHTML.indexOf('/' + ep_browsePools_poolID + '"') == -1) {
          temp_otherPoolsList[i].removeChild(temp_otherPoolsList[i].getElementsByClassName('prev')[0]);
          temp_otherPools.innerHTML += '<br/>' + temp_otherPoolsList[i].innerHTML;
        }
      }
    }
    
  
  
    // #comments#
    var temp_showComments = $c('p', {
      class: temp_id,
      style: 'display:block;width:48em;padding:0.5em 0em;border-bottom: 2px solid #888888;border-top: 2px solid #888888;'
    });
    temp_showComments.innerHTML = 'Show comments';
    if (temp_doc.getElementById('comments_' + temp_id).innerHTML.indexOf('<p>There are no comments.</p>') == -1) {
      addEvent(temp_showComments, 'click', function () {
        document.getElementById('comments_' + this.className).style.display = 'inline-block';
        this.style.display = 'none';
      }); //click event to show comments & hide the "show comments" button

      // Both are visisble by default, hide 1 based on user settings.
      if (settings_json.enable_ep_browseCommentsOn) temp_showComments.style.display = 'none'; // CommentsOn = active -> keep comments visible, hide other
      else temp_doc.getElementById('comments_' + temp_id).style.display = 'none';

      temp_ep_container2_.appendChild(temp_showComments);
      temp_ep_container2_.appendChild(temp_doc.getElementById('comments_' + temp_id));
    }
    else {
      temp_showComments.innerHTML = 'There are no comments'; //cleaner fix if no comments
      temp_ep_container2_.appendChild(temp_showComments);
    }    
    
    // #tag list# - pretty much same as pools, except with tags.
    temp_doc.getElementById('tag-list').className='ep-browse-tag-list';
    temp_doc.getElementById('tag-list').id='tag-list_'+temp_id;
    
    var temp_showTags = $c('p', {
      class: temp_id,
      style: 'display:block;width:48em;padding:0.5em 0em; 2em;'
    });
    temp_showTags.innerHTML = 'Show Tags';
    
    addEvent(temp_showTags, 'click', function () {
      document.getElementById('tag-list_' + this.className).style.display = 'inline-block';
      this.style.display = 'none';
    });
    
    if (settings_json.enable_ep_browseTagsOn) temp_showTags.style.display = 'none';
    else temp_doc.getElementById('tag-list_' + temp_id).style.display = 'none';
    
    temp_ep_container2_.appendChild(temp_showTags);
    temp_ep_container2_.appendChild(temp_doc.getElementById('tag-list_' + temp_id));
    
    
    // #Edit tools
    var tagString=temp_doc.getElementById('post_old_tag_string').value;
    var edit_tools=$c('div', { id:'edit_toolsMain_'+temp_id, style:'float: right;width: 27em;'  });
    edit_tools.innerHTML=
      '<div style="border:1px solid black; float:right; margin:1.5em; padding:2px;" data-id="'+temp_id+'">Edit tools</div>'+
      '<div id="edit_tools_'+temp_id+'" style="display:none">'+
      '<div id="tags_'+temp_id+'" style="display:none">'+tagString+'</div>'+
      '<textarea id="newTags_'+temp_id+'" rows="5" type="text" style="width:22em;">'+tagString+'</textarea>'+
      '<input data-id="'+temp_id+'" type="button" value="Submit" />'+
      '<input data-id="'+temp_id+'" type="button" value="Mark Translated" style="margin-left:9em;" />'+
      '<p id="response_'+temp_id+'"></p>'+
      '</div>'+
      ''+
      
      '';
    
    temp_ep_container2_.appendChild(edit_tools);
    
    addEvent(edit_tools.getElementsByTagName('input')[0], 'click', ep_browsePools_editTags);        //first button - submit editted tags
    addEvent(edit_tools.getElementsByTagName('input')[1], 'click', ep_browsePools_markTranslated);  //second button - mark post translated
    addEvent(edit_tools.getElementsByTagName('div')[0], 'click', function () { document.getElementById('edit_tools_'+this.getAttribute('data-id')).style.display='block'; });  //first div
    
    
    //temp_ep_container2_ = all stuff on the right of the image - add this as last to get as few possible visible DOM changes.
      temp_ep_container_.appendChild(temp_ep_container2_);
      temp_a_show.appendChild(temp_ep_container_);
    
    //#note width fix# - may be slightly cpu intensive when reading long comics with a lot of notes (like, 200 posts with ~10 notes each)
    var temp=document.getElementById('note-container_'+temp_id).getElementsByClassName('note-body');
    for(i=0;i<temp.length;i++) {
      temp[i].style.width=(temp[i].scrollWidth)+'px';
      var w = parseInt(temp[i].scrollWidth,10);
      var h = parseInt(temp[i].scrollHeight,10);
      var golden_ratio = 1.618;

      while (w / h < golden_ratio) {
        w = w * 1.025;
        h = h / 1.025;
      }

      while (w / h > golden_ratio) {
        w = w / 1.025;
        h = h * 1.025;
      }
      temp[i].style.width = w+"px";
      
      var temp_scrollWidth=temp[i].scrollWidth;
      var temp_offsetWidth=temp[i].offsetWidth;
      
      temp[i].style.display='none';
      
      if(temp_offsetWidth-2 < temp_scrollWidth) temp[i].style.width=(temp_scrollWidth-6)+'px';
    
    }
    
    //##blacklist
    var bl_response=ep_bl(tagString);
    
    if(!settings_jsonData.customBlacklist_active && bl_response[1]===true) bl_response=false;

    if(bl_response && bl_response[0].length>0) {
      var temp_blacklistNotice = $c('p', { class:temp_id,style:'text-align:center;' });
      temp_blacklistNotice.innerHTML='<span style="font-size:170%">One or more blacklisted tags found: <span style="color:red">'+bl_response[0]+'</span></span><br/>Click this text to show the image.';
      document.getElementById('image-container_'+temp_id).style.display = 'none';
      document.getElementById('ep_container2_'+temp_id).style.display = 'none';
      
      addEvent(temp_blacklistNotice, 'click', function () {
        document.getElementById('image-container_' + this.className).style.display = 'inline-block';
        document.getElementById('ep_container2_' + this.className).style.display = 'inline-block';
        this.style.display = 'none';
      });
      document.getElementById('ep_container_'+temp_id).appendChild(temp_blacklistNotice);
    
    }
    
    
    var note_showHide = function(e){
        if(e.shiftKey) var notes=this.parentNode.getElementsByTagName('div')[0].getElementsByClassName('note-body');
        else var notes=this.parentNode.getElementsByTagName('div')[0].getElementsByClassName('note-box');
        
        for(i=0;i<notes.length;i++) {
          notes[i].style.display=="none" ? notes[i].style.display="block" : notes[i].style.display="none"
        }
    };
    document.getElementById('image_'+temp_id).addEventListener('click', note_showHide);
    
    
    
    ep_lockQuerry=false; //unlocked, lets the next query begin
    
    //yes-no? haven't had to use/test this yet
    //var anti_stuck=null; clearTimeout(anti_stuck); setTimeout(function() { ep_lockQuerry=false },6000);
  }
}

function ep_browsePools_rs(b) { var a=ep_rs; ep_rs=ep_rs.substr(0,1); ep_browsePools(a,b); }


var customBlacklist_tags;
function customBlacklist_init() {
  if (document.getElementsByClassName('post-preview').length == 0 && !document.getElementById('image')) return; //only run on page that have thumbs
  var temp_menu = $x("//header/nav/menu")[0];
  if (temp_menu) { //make sure the element exists
    var temp_li = $c("li", {
      title: '2nd blacklist, shiftclick to edit - tags get added to current blacklist, easy to toggle on/off',
      style: 'margin:0 6px;width:4.4em;'
    });
    temp_li.innerHTML = '<span id="customBlacklist_span" style="color:' + (settings_jsonData.customBlacklist_active ? 'green' : 'black') + ';">Qs.blacklist<span id="customBlacklist_count" style="font-size:85%"></span></span>';
    addEvent(temp_li, 'click', customBlacklist);
    temp_menu.appendChild(temp_li);
  }
  
  if(settings_jsonData.customBlacklist_data) customBlacklist_tags=settings_jsonData.customBlacklist_data;
  else customBlacklist_tags='rating:e,rating:q,nipples,areola_slip,bdsm,pussy,naked_ribbon,naked_apron,naked_towel,bandaid_on_pussy,bikini';
  //else customBlacklist_tags='rating:e,rating:q,nipples,areola_slip,bdsm,pussy,naked_ribbon,naked_apron,naked_towel,bandaid_on_pussy,bikini';
  
  customBlacklist_tags=customBlacklist_tags.split(',');
  for (var i in customBlacklist_tags) { customBlacklist_tags[i] = customBlacklist_tags[i].split(' '); }
  
  customBlacklist('setup');
}

function customBlacklist_add(a) {
  var c = document.getElementById('customBlacklist_count');
  var ihtml = c.innerHTML;
  if (ihtml.length == 0) {
    ihtml = 0;
  }
  else {
    ihtml = parseInt(ihtml.substr(2));
  }
  
  if (a === 1) { //simply add 1
    if (settings_jsonData.customBlacklist_active) document.getElementById('customBlacklist_count').innerHTML = ' (' + (ihtml + 1) + ')';
  }
  else if (a === 'h') { //toggle from off to hide-all
    if (settings_jsonData.customBlacklist_active) document.getElementById('customBlacklist_count').innerHTML = ' (' + document.getElementsByClassName('customBlacklisted').length + ')';
  }
  else if (a === 's') { //toggle from on to show-all
    document.getElementById('customBlacklist_count').innerHTML = '';
  }
}

function customBlacklist(s) {
  //Example:
  //var customBlacklist_tags='tag1,tagcombo1 tagcombo2,tag3,tag4'
  //easier editing is in-progress
  if(s=='setup') { //setup - runs at pageload
    if (settings_jsonData.customBlacklist_active) {
      style='.customBlacklisted { display:none!important; }';
      addGlobalStyle(style);
    }
    
    var temp_thumbs=document.getElementsByClassName('post-preview');
    for(var i=0;i<temp_thumbs.length;i++) {
      if(ep_bl(temp_thumbs[i].getAttribute('data-tags')+' rating:'+temp_thumbs[i].getAttribute('data-rating'))[1]===true) {
        temp_thumbs[i].className+=' customBlacklisted'; customBlacklist_add(1);
      }
    }
  }
  else {  //click
    if(s.shiftKey) { //shift-key
      var newTags=prompt('Editing Quickswitch Blacklist ~ Enter tags in the following format: "tag1,tagcombo1 tagcombo2,tag3,tag4".\nCurrently blacklisted: '+customBlacklist_tags, customBlacklist_tags);
      if(newTags==='default') newTags = 'rating:e,rating:q,nipples,areola_slip,bdsm,pussy,naked_ribbon,naked_apron,naked_towel,bandaid_on_pussy,bikini';
      if(newTags && newTags.length > 0) {
        try {
          customBlacklist_tags=newTags;
          customBlacklist_tags=customBlacklist_tags.split(',');
          for (var i in customBlacklist_tags) { customBlacklist_tags[i] = customBlacklist_tags[i].split(' '); }
          
          settings_updateData('customBlacklist_data',newTags);
          
          var temp_thumbs=document.getElementsByClassName('post-preview');
          for(var i=0;i<temp_thumbs.length;i++) {
            temp_thumbs[i].className=temp_thumbs[i].className.replace(' customBlacklisted','');
            if(ep_bl(temp_thumbs[i].getAttribute('data-tags')+' rating:'+temp_thumbs[i].getAttribute('data-rating'))[1]===true) {
              temp_thumbs[i].className+=' customBlacklisted'; customBlacklist_add(1);
            }
          }
        }
        catch(e) {
          alert('error updating blacklisted tags:\n'+e);
        }
      }
    }
    else {
      if (settings_jsonData.customBlacklist_active) { //already active -> turn off
        document.getElementById('customBlacklist_span').style.color='black';
        settings_updateData('customBlacklist_active',0);
        style='.customBlacklisted { display:inline-block!important; }';
        addGlobalStyle(style);
        customBlacklist_add('s');
      }
      else {
        document.getElementById('customBlacklist_span').style.color='green';
        style='.customBlacklisted { display:none!important; }';
        settings_updateData('customBlacklist_active',1);
        addGlobalStyle(style);
        customBlacklist_add('h');
      }
    }
  }
}



//to-do/idea list:
//comment (Search) page support
//ability to click links in notes while browsing //add delay on mouseout note
//proper debugging that normal users can understand
//2 layers of debugging "verbose debug" & "report only if something breaks"
//ep blacklist ratings, and other meta-tags
//thumbs of flash don't show up properly
//optimize ep paginator code
//optimize stuff with 'xpath @data-id'?
//import new note fix
//