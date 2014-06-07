// ==UserScript==
// @name           Google Bar+
// @namespace      avngt
// @description    Tweaks for the new Google Bar
// @icon           http://lh5.googleusercontent.com/-QP1DNv-oHBU/Tv6JdXi16hI/AAAAAAAABQQ/CHUgOHl0iUg/s32/icon32.png
// @icon64         http://lh5.googleusercontent.com/-jb2k3ubGXKY/Tv6JdTLl9bI/AAAAAAAABQU/fq7Bqxs7WOo/s64/icon64.png
// @homepageURL    http://userscripts.org/scripts/show/25105
// @svc:version    [0.7.3]
// @version        0.7.3

// @history        (0.7.3) Code cleanup
// @history        (0.7.2) Better Icons for groups, scholar, etc.
// @history        (0.7.1) Better handling of google iframes
// @history        (0.7.0) Code Maint.
// @history        (0.6.9) Added some Excludes to fix calendar labs
// @history        (0.6.8) More accurate install count
// @history        (0.6.7) Tweaked New Bar Activation
// @history        (0.6.6) Code Maint.
// @history        (0.6.5) Context Menu fix
// @history        (0.6.4) Code Cleanup, Pretty Popup Buttons, New Icon
// @history        (0.6.3) Fixed Images
// @history        (0.6.2) Fixed Scholar
// @history        (0.6.1) Groups and Scholar added
// @history        (0.6.0) TM & GM detection
// @history        (0.5.9) Code cleanup and trying to TS non-launching
// @history        (0.5.8) Preliminary Google Ad blocking implemented
// @history        (0.5.7) Support for using the last 3 "Empty Spaces" added "Empty Space" preset
// @history        (0.5.6) Added a couple pre-sets and update notification
// @history        (0.5.5) Code cleanup
// @history        (0.5.4) Update Detection
// @history        (0.5.3) Added About Button
// @history        (0.5.2) Code cleanup and Improvement
// @history        (0.5.1) Added google reader preset
// @history        (0.5.0) Version Bump, added more presets
// @history        (0.4.3) Preset menus and polished interface
// @history        (0.4.2) Code Cleanup and Editable Menu Items
// @history        (0.4.1) Code Cleanup
// @history        (0.4.0) Improved Chrome compatibility
// @history        (0.3.9) Improved Tampermonkey compatibility
// @history        (0.3.8) Code Cleanup
// @history        (0.3.7) Added "Thin Menu" option (User Request)  
// @history        (0.3.6) Force the new google bar to be enabled.

// @updateURL      http://userscripts.org/scripts/source/119530.user.js

// @include        /^https?://.*\.google\..*$/
// @include        /^https?://google\..*$/
// @include        http*://*.google.*
// @include        http*://google.*
// @include        /^https?://.*\.gmail\..*$/
// @include        /^https?://gmail\..*$/
// @include        http*://*.gmail.*
// @include        http*://gmail.*

// @exclude /^https?://.*\.googleusercontent\..*$/
// @exclude /^https?://googleusercontent\..*$/
// @exclude http*://googleusercontent.*
// @exclude http*://*.googleusercontent.* 

// ==/UserScript==

/*
Copyright 2011 Boondoklife

This file is part of Google Bar+.

Google Bar+ is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Google Bar+ is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Google Bar+.  If not, see <http://www.gnu.org/licenses/>.
*/

var activeDocument;

var presetButtons = new Array();
    presetButtons[0] = {"label" : "Mail", "icon" : "http://lh6.googleusercontent.com/-fPl9YROHx2A/Tu6xgCMt1cI/AAAAAAAABHY/xOsBPvTiErk/s32/mail.png", "url" : "https://mail.google.com/mail/?tab=wm"};
    presetButtons[1] = {"label" : "Wallet", "icon" : "http://lh6.googleusercontent.com/-hsU6iHwKBIg/Tu6mYbZptkI/AAAAAAAABHI/-yJO-T3RxYg/s32/wallet.png", "url" : "https://wallet.google.com/manage/"};
    presetButtons[2] = {"label" : "Search", "icon" : "http://lh5.googleusercontent.com/-eGkBdAODPEU/Tu6xhB1sCoI/AAAAAAAABIE/GoeA93a5WKI/s32/search.png", "url" : "https://www.google.com/webhp?hl=en&tab=ww"};
    presetButtons[3] = {"label" : "Voice", "icon" : "http://lh4.googleusercontent.com/-BttHqRrsQSs/TtrgO3X6dRI/AAAAAAAABE0/1wbjH_Vh6cI/s32/google_voice_icon32.png", "url" : "https://www.google.com/voice"};
    presetButtons[4] = {"label" : "Map", "icon" : "http://lh5.googleusercontent.com/-SqkUScMvmE0/Tu6xgNu3eZI/AAAAAAAABJg/9ay_8uhgMbs/s32/maps.png", "url" : "http://maps.google.com/maps?hl=en&tab=wl"};
    presetButtons[5] = {"label" : "Youtube", "icon" : "http://lh4.googleusercontent.com/-miSlBL8tNPw/Tu6xhog8GlI/AAAAAAAABIk/CO7kYpXWPhw/s32/youtube.png", "url" : "http://www.youtube.com/?tab=w1"};
    presetButtons[6] = {"label" : "News", "icon" : "http://lh6.googleusercontent.com/-G62d30_VEGg/Tu6xgWraZmI/AAAAAAAABHo/WVA1ErcptXU/s32/news.png", "url" : "http://news.google.com/nwshp?hl=en&tab=wn"};
    presetButtons[7] = {"label" : "Documents", "icon" : "http://lh5.googleusercontent.com/-vOodQ-rnsOo/Tu6xiViyCGI/AAAAAAAABJA/uVIzpNnxb6E/s32/docs.png", "url" : "https://docs.google.com/?tab=wo&authuser=0"};
    presetButtons[8] = {"label" : "Translate", "icon" : "http://lh4.googleusercontent.com/-kaCjiCKnLX8/Tu6xhcvGiII/AAAAAAAABIU/N1wOxsiRzfc/s32/translate.png", "url" : "http://translate.google.com/?hl=en&tab=mT"};
    presetButtons[9] = {"label" : "Mobile", "icon" : "http://lh3.googleusercontent.com/-Dd7QCwnZPT0/Tu6xgEXhXzI/AAAAAAAABHc/oKtcJOuJcR0/s32/mobile.png", "url" : "http://www.google.com/mobile/"};
    presetButtons[10] = {"label" : "Books", "icon" : "http://lh4.googleusercontent.com/-SkksCm0rqWc/Tu6xh4cTKAI/AAAAAAAABIw/QCqmEpYZbdQ/s32/books.png", "url" : "http://books.google.com/bkshp?hl=en&tab=mp"};
    presetButtons[11] = {"label" : "Music", "icon" : "http://lh4.googleusercontent.com/-zWipz-CZTzo/Tu6xgWuICAI/AAAAAAAABHk/q_J9oMUTxnQ/s32/music.png", "url" : "http://music.google.com/"};
    presetButtons[12] = {"label" : "Offers", "icon" : "http://lh3.googleusercontent.com/-giV-dfVkgrY/Tu6xgo7n4oI/AAAAAAAABHw/6PtAd_eOXRU/s32/offers.png", "url" : "https://www.google.com/offers"};
    presetButtons[13] = {"label" : "Shopping", "icon" : "http://lh3.googleusercontent.com/-4aXvy10BTWA/Tu6xhA0AaBI/AAAAAAAABIY/VD2eUT6mRNk/s32/shopping.png", "url" : "http://www.google.com/prdhp?hl=en&tab=mf"};
    presetButtons[14] = {"label" : "Blogger", "icon" : "http://lh3.googleusercontent.com/-hYk9YFCs7-Y/Tu6xh97eX1I/AAAAAAAABI0/JB8wmQk_HSk/s32/blogger.png", "url" : "http://www.blogger.com/?tab=mj"};
    presetButtons[15] = {"label" : "Finance", "icon" : "http://lh6.googleusercontent.com/-rqeTfegt7ms/Tu6xie1UMQI/AAAAAAAABJQ/qEjLApOBxoc/s32/finance.png", "url" : "http://www.google.com/finance?tab=me"};
    presetButtons[16] = {"label" : "Photos", "icon" : "http://lh5.googleusercontent.com/-0OopMVEDaXU/Tu6xg8rw11I/AAAAAAAABH8/od2Sd3rrfE4/s32/photos.png", "url" : "https://plus.google.com/u/0/photos?tab=mq"};
    presetButtons[17] = {"label" : "Videos", "icon" : "http://lh3.googleusercontent.com/-eIkadxS-fKE/Tu6xhrCUQTI/AAAAAAAABIg/GBtfI1_hnQQ/s32/video.png", "url" : "http://video.google.com/?hl=en&tab=mv"};
    presetButtons[18] = {"label" : "Images", "icon" : "http://lh4.googleusercontent.com/--fEMHualzXo/Tu6xidfw32I/AAAAAAAABJM/fLjOigbBjUI/s32/images.png", "url" : "https://www.google.com/imghp?hl=en&tab=wi"};
    presetButtons[19] = {"label" : "Google+", "icon" : "http://lh5.googleusercontent.com/-miDH0_qLZY0/Tu6xg-tr2pI/AAAAAAAABH4/4nFur6D4DqA/s32/plus.png", "url" : "https://plus.google.com/u/0/?tab=wX"};
    presetButtons[20] = {"label" : "Calendar", "icon" : "http://lh5.googleusercontent.com/-VnJ0AmuryhM/Tu6xiC7JW4I/AAAAAAAABI8/sfUbfTar52s/s32/calendar.png", "url" : "https://www.google.com/calendar?tab=mc"};
    presetButtons[21] = {"label" : "Facebook", "icon" : "http://lh4.googleusercontent.com/-OqSknmx3lr0/TvT7vpzzYmI/AAAAAAAABNM/azdtkVoL2Ys/s32/facebook.png", "url" : "https://www.facebook.com/"};
    presetButtons[22] = {"label" : "Reader", "icon" : "http://lh5.googleusercontent.com/-jwYnG3sVy6s/Tu6xhOvoEKI/AAAAAAAABII/40Wv5e08YUc/s32/reader.png", "url" : "https://www.google.com/reader/?hl=en&tab=my"};
    presetButtons[23] = {"label" : "Netflix", "icon" : "http://lh6.googleusercontent.com/-DqcaZtVdK2M/TvT7v46b-GI/AAAAAAAABNY/sDESHoqPJsk/s32/netflix.png", "url" : "http://www.netflix.com"};
    presetButtons[24] = {"label" : "Yahoo Mail", "icon" : "http://lh4.googleusercontent.com/-MF-RKjLIiPk/TwZ3F302voI/AAAAAAAABSQ/1FCcQ_Vw10s/s32/yahooMail.png", "url" : "http://mail.yahoo.com"};
    presetButtons[25] = {"label" : "", "icon" : "", "url" : ""};
    presetButtons[26] = {"label" : "Groups", "icon" : "http://lh4.googleusercontent.com/-1x3JKtPZwdI/TwZ3FmramlI/AAAAAAAABSE/1o48tbTMP6k/s32/groups.png", "url" : "http://groups.google.com/"};
    presetButtons[27] = {"label" : "Scholar", "icon" : "http://lh5.googleusercontent.com/-P-BSC5y9wiM/TwZ3Fv4RhtI/AAAAAAAABSA/L59PTfDfaD0/s32/scholar.png", "url" : "http://scholar.google.com/"};
    presetButtons[28] = {"label" : "Pipes", "icon" : "http://lh6.googleusercontent.com/-HLfu5LYwNGU/TwUyYAVJ7AI/AAAAAAAABQ4/HRZjdy2DgLI/s32/yahooPipes.png", "url" : "http://pipes.yahoo.com"};
    
    //presetButtons[23] = {"label" : "", "icon" : "", "url" : ""};


var optionsDropdown = new Array();
    optionsDropdown.push({"id" : "-1", "label" : "Preset Buttons"});
    optionsDropdown.push({"id" : "-1", "label" : "--- Google Apps ---"});
    optionsDropdown.push({"id" : "14", "label" : "Blogger"});
    optionsDropdown.push({"id" : "10", "label" : "Books"});
    optionsDropdown.push({"id" : "20", "label" : "Calendar"});
    optionsDropdown.push({"id" : "7", "label" : "Documents"});
    optionsDropdown.push({"id" : "15", "label" : "Finance"});
    optionsDropdown.push({"id" : "19", "label" : "Google+"});
    optionsDropdown.push({"id" : "26", "label" : "Groups"});
    optionsDropdown.push({"id" : "18", "label" : "Images"});
    optionsDropdown.push({"id" : "0", "label" : "Mail"});
    optionsDropdown.push({"id" : "4", "label" : "Map"});
    optionsDropdown.push({"id" : "9", "label" : "Mobile"});
    optionsDropdown.push({"id" : "11", "label" : "Music"});
    optionsDropdown.push({"id" : "6", "label" : "News"});
    optionsDropdown.push({"id" : "12", "label" : "Offers"});
    optionsDropdown.push({"id" : "16", "label" : "Photos"});
    optionsDropdown.push({"id" : "22", "label" : "Reader"});
    optionsDropdown.push({"id" : "27", "label" : "Scholar"});
    optionsDropdown.push({"id" : "2", "label" : "Search"});
    optionsDropdown.push({"id" : "13", "label" : "Shopping"});
    optionsDropdown.push({"id" : "8", "label" : "Translate"});
    optionsDropdown.push({"id" : "17", "label" : "Videos"});
    optionsDropdown.push({"id" : "3", "label" : "Voice"});
    optionsDropdown.push({"id" : "1", "label" : "Wallet"});
    optionsDropdown.push({"id" : "5", "label" : "Youtube"});
    optionsDropdown.push({"id" : "-1", "label" : "--- Social Media ---"});
    optionsDropdown.push({"id" : "21", "label" : "Facebook"});
    optionsDropdown.push({"id" : "24", "label" : "Yahoo Mail"});
    optionsDropdown.push({"id" : "-1", "label" : "--- Multimedia ---"});
    optionsDropdown.push({"id" : "23", "label" : "Netflix"});
    optionsDropdown.push({"id" : "-1", "label" : "--- Utilities ---"});
    optionsDropdown.push({"id" : "28", "label" : "Pipes"});
    optionsDropdown.push({"id" : "-1", "label" : "--- Special Use ---"});
    optionsDropdown.push({"id" : "25", "label" : "Empty Space"});
    
// Main script variable
var avtng = {
  "settings" : null,
  "version" : "0.7.3",
  "status" : {
    "started" : "0",
    "adBlocker" : "0",
    "thinbar" : "0",
    "update"  : "0",
  },
};

// ######################################
// # Messages
// ######################################
var popupMessages = {
  "donateSmallButton" : "\
Put a meal on my family's table!\
  ",
  "donateConfirm" : "\
Did you know donating to the author ensures continued\n\
development and support, as well as food for the family!\n\
\n\
Do you wish to continue to the Paypal Donation site?",

  "aboutConfirm" : "\
Copyright 2011 Boondoklife\n\
Version: " + avtng.version + "\n\
\n\
Do you wish to goto the \"Google Bar+\" homepage?",

  "genericError" : "\
There was a problem executing Google Bar+, please let the author know!\n\
\n\
Error: ",
  
  "tmgmError" : "\
Please install either Greasemonkey or Tampermonkey!\
\n",
  
  "updateAvailable" : "There is an update available for Google Bar+",
  
  "popupBlocking" : "The new window was blocked from opening, Please disable your pop-up blocker and try again.",
  
  "donateButtonTitle" : "Put a meal on my family's table",
  
  "aboutButtonTitle" : "Visit the scripts homepage and say Hi!",
}

// ######################################
// # Core Functions
// ######################################
function init ()
{
  // Let's make sure we have the right document scope
  activeDocument = document.getElementById("canvas_frame");
  activeDocument = (activeDocument != null)? activeDocument.contentDocument : document;

  try {if (!isFunction(GM_getValue) || !isFunction(GM_setValue) || !isFunction(GM_deleteValue)){throw popupMessages.tmgmError;}}
  catch(e){throw popupMessages.tmgmError + e;}

  // If there is a stored value then lets get it and use it
  if (GM_getValue("avtng") != null){avtng.settings = JSON.parse(GM_getValue("avtng","{}"));}

  // If we do not have a stored settings value or it is the wrong version, then lets create one
  if (avtng.settings == null)
  {
    GM_deleteValue(avtng);

    avtng.settings = {
      "version" : avtng.version,
      "thinbar" : "0",
      "adBlocker" : "0",
      "menuItems" : new Array(24),
      "installSeed" : Math.randomHex(64),
    };

    for (var i = 0; i > 24; i++){avtng.settings.menuItems[i] = null;}
    updateAVTNGSettings();
    
    logInstall();
  }

  // Things to do when a new version is installed
  if (avtng.version != avtng.settings.version) {

    // Log the installation
    logInstall();

    // Setup some defaults if the settings options do not already exist
    avtng.settings.version = avtng.version;
    if (avtng.settings.thinbar == null) {avtng.settings.thinbar = 0;}
    if (avtng.settings.adBlocker == null) {avtng.settings.adBlocker = 0;}
    if (avtng.settings.menuItems == null) {avtng.settings.menuItems = new Array(24);}
    if (avtng.settings.installSeed == null) {avtng.settings.installSeed = Math.randomHex(64);}
    updateAVTNGSettings();
  }
  
  // Try to minimize the bar as soon as possible
  window.addEventListener("load", function () {if (avtng.settings.thinbar == 1 && avtng.status.thinbar == 0){minimizeTopBar("40");};setTimeout(loader, 500);}, false);
  
  // Load the custom menu items once the mouse is ready,
  // This is needed to make sure the 3 menu lines are ready before adding entries
  activeDocument.addEventListener("mouseover", loader, false);
}

function logInstall()
{
    // Log the install and version
    var COUNTER_SCRIPT = "http://mainwall1.us.to/google_bar_plus/?ver=" + avtng.version + "&key=" + avtng.settings.installSeed;
    var counter = document.createElement("iframe");
    counter.setAttribute("style", "display: none;");
    counter.setAttribute("src",COUNTER_SCRIPT);
    activeDocument.body.appendChild(counter);
}

function loader ()
{


  //Abort if we are in an iframe
  if (!isIframe){
  // Ensure the new bar is active
  activateNewBar();
  }

  if (activeDocument.getElementById("gbqla") == null || activeDocument.getElementById("gbz") == null || activeDocument.getElementById("gbtm") == null || activeDocument.getElementById("gbm1") == null || activeDocument.getElementById("gbm2") == null)
  {
    avtng.status.started = 0;
    return false;
  }
  
  if (avtng.status.started == 0)
  {
  
    // Load the update notifier
    donateMoreButton();
    checkUpdate();
    
    // Minimize the top bar if told to do so
    if (avtng.settings.thinbar == 1 && avtng.status.thinbar == 0){minimizeTopBar("40");}
    
    // Hide ads if told to do so
    if (avtng.settings.adBlocker == 1 && avtng.status.adBlocker == 0){hideAds();}
  
    // Add thin bar enabler/minimizer to profile entry
    addBarMinimizer();

    // Add Ad Blocker enabler/disabler to profile entry
    addAdBlocker();

    // Add custum menu entries
    addMenuItems();
    
    // Attach our editable menu listener to the menu
    // items in each column
    attachMenuButtonTriggers("gbzc");
    attachMenuButtonTriggers("gbm1");
    attachMenuButtonTriggers("gbm2");

    avtng.status.started = "1";
  }
}

function donateMoreButton()
{
    var updateCSS = ".donateImg {\
      vertical-align: middle;\
      margin-left: -37px;\
      padding-right: 5px;\
    }";
    
    addCSS(updateCSS);
  
      // Show the little donate button
    var updateImg = document.createElement("img");
        updateImg.setAttribute("src", "http://lh3.googleusercontent.com/-y3nAUDRqyvQ/TwHaFRUi7MI/AAAAAAAABQo/gosiHT_UDUk/s21/donateSmall.png");
        updateImg.setAttribute("title",popupMessages.donateSmallButton);
        updateImg.className = "donateImg";

    var updateContainer = document.getElementById("gbztms");
        prependChild(updateContainer, updateImg);
        updateImg.addEventListener("click",function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (confirm(popupMessages.donateConfirm)) {
            var popUp = window.open("http://www.bit.ly/googleBarPlusDonation","Donations");
            if (popUp == null || typeof(popUp)=='undefined') {   
              alert(popupMessages.popupBlocking); 
            } 
            else {   
              popUp.focus();
            }
          }
        }, true);
        
        //
}

function checkUpdate()
{
    var updateCSS = ".updateImg {\
      vertical-align: middle;\
      margin-left: 15px;\
    }";
    
    addCSS(updateCSS);
  
      // Show if there is an update available
    var updateImg = document.createElement("img");
        updateImg.setAttribute("src", "http://mainwall1.us.to/google_bar_plus/update.php?ver=" + avtng.version);
        updateImg.setAttribute("title",popupMessages.updateAvailable);
        updateImg.className = "updateImg";

    var updateContainer = document.getElementById("gbztms");
        updateContainer.appendChild(updateImg);
        updateImg.addEventListener("click",function (e) {
          e.preventDefault();
          e.stopPropagation();
          window.location.href = "http://www.bit.ly/google_bar_plus";
        }, true);
}

// Activate the new google bar
function activateNewBar()
{
  if (document.cookie.indexOf("ID=03fd476a699d6487") == -1 || document.cookie.indexOf("TM=1322688084") == -1)
  {
    var newCookie = "PREF=ID=03fd476a699d6487:U=88e8716486ff1e5d:FF=0:LD=en:CR=2:TM=1322688084:LM=1322688085:S=McEsyvcXKMiVfGds; path=/; domain=.";
    newCookie += getRootURL();
    document.cookie = newCookie;
    reloadPage();
  }
}
  
// Minimize Bar specific CSS
function minimizeTopBar(barHeight)
{  
      //Bar BG and size
  var css =  "#gb {height: 40px;}";
      css += "#gb.gbes, #gb.gbesi {height: 40px;}";
      css += ".c-i-Yd-V-xe {height: 40px !important;}";
      css += "#gb.gbem, #gb.gbemi {height: 40px;}"; 
      css +=  "#gbx1.gbes, #gbx2.gbes, #gbqlw.gbes, #gb.gbesi #gbx1, #gb.gbesi #gbx2, #gb.gbesi #gbqlw {height: 40px;}";
      css += "#gbx1.gbem, #gbx2.gbem, #gbqlw.gbem, #gb.gbemi #gbx1, #gb.gbemi #gbx2, #gb.gbemi #gbqlw {height: 40px;}";
      css +=  "#gbx1, #gbx2, #gbqlw, #gb #gbx1, #gb #gbx2, #gb #gbqlw {height: 40px;}";

      //Left padding of google icon
      css += "#gbq1.gbes, #gb.gbesi #gbq1 {margin-left: 5px;}";
      css += "#gbq1.gbem, #gb.gbemi #gbq1 {margin-left: 5px;}";
      css += "#gbq1, #gb #gbq1 {margin-left: 5px;}";

      //Arrow to the Right of the Left Google Icon
      css += "#gbmail.gbes, #gb.gbesi #gbmail {top: 18px}";
      css += "#gbmail.gbem, #gb.gbemi #gbmail {top: 18px}";
      css += "#gbmail, #gb #gbmail {top: 18px}";

      //Left Google Icon
      css += ".gbqfh #gbql.gbes, #gb.gbesi .gbqfh #gbql {margin-top: 8px; margin-bottom: 5px;}";
      css += ".gbqfh #gbql.gbem, #gb.gbemi .gbqfh #gbql {margin-top: 8px; margin-bottom: 5px;}";
      css += ".gbqfh #gbql {margin-top: 8px; margin-bottom: 5px;}";

      //Right Side Stuff Container
      css += "#gbu {height: 30px;}";

      //Right side Stuff
      css += "#gbu.gbes, #gbn.gbes, #gbq2.gbes, #gbq3.gbes, #gb.gbesi #gbu, #gb.gbesi #gbn, #gb.gbesi #gbq2, #gb.gbesi #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}"; 
      css += "#gbu.gbem, #gbn.gbem, #gbq2.gbem, #gbq3.gbem, #gb.gbemi #gbu, #gb.gbemi #gbn, #gb.gbemi #gbq2, #gb.gbemi #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}";
      css += "#gbu, #gbn, #gbq2, #gbq3, #gb #gbu, #gb #gbn, #gb #gbq2, #gb #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}";
      css += "#gbu.gbes, #gb.gbesi #gbu {margin-right: 15px;}";
      css += "#gbu.gbem, #gb.gbemi #gbu {margin-right: 15px;}";
      css += "#gbu, #gb #gbu {margin-right: 15px;}";


      //Right side Stuff GMAIL
      css += "#gbv.gbes, #gbn.gbes, #gbq2.gbes, #gbq3.gbes, #gb.gbesi #gbv, #gb.gbesi #gbn, #gb.gbesi #gbq2, #gb.gbesi #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}";
      css += "#gbv.gbem, #gbn.gbem, #gbq2.gbem, #gbq3.gbem, #gb.gbemi #gbv, #gb.gbemi #gbn, #gb.gbemi #gbq2, #gb.gbemi #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}";
      css += "#gbv, #gbn, #gbq2, #gbq3, #gb #gbv, #gb #gbn, #gb #gbq2, #gb #gbq3 {margin-top: 5px; margin-bottom: 5px; padding-top: 0px; padding-bottom: 0px;}";
      css += "#gbv.gbes, #gb.gbesi #gbv {margin-right: 15px;}";
      css += "#gbv.gbem, #gb.gbemi #gbv {margin-right: 15px;}";
      css += "#gbv, #gb #gbv {margin-right: 15px;}";
      
      //Left Menu
      css += ".gbesi #gbq1 .gbmab, .gbes #gbq1 .gbmab {margin-top: 31px;}"; //Black Arrow
      css += ".gbesi #gbq1 .gbmac, .gbes #gbq1 .gbmac {margin-top: 31px;}"; //Black Arrow
      css += ".gbesi #gbq1.gbto #gbz, .gbesi #gbq1.gbto #gbs, .gbes #gbq1.gbto #gbz, .gbes #gbq1.gbto #gbs {top: 40px !important;}";
      css += ".gbesi #gbq1 #gbz, #gbq1.gbes #gbz, .gbesi #gbq1 #gbs, #gbq1.gbes #gbs {margin-left: 5px; !important;}";
      
      css += ".gbemi #gbq1 .gbmac, .gbem #gbq1 .gbmac {margin-top: 31px;}"; //Black Arrow
      css += ".gbemi #gbq1 .gbmab, .gbem #gbq1 .gbmab {margin-top: 31px;}"; //Black Arrow
      css += ".gbemi #gbq1.gbto #gbz, .gbemi #gbq1.gbto #gbs, .gbem #gbq1.gbto #gbz, .gbem #gbq1.gbto #gbs {top: 40px !important;}";
      css += ".gbemi #gbq1 #gbz, #gbq1.gbem #gbz, .gbemi #gbq1 #gbs, #gbq1.gbem #gbs {margin-left: 5px; !important;}";
      
      css += "#gbq1 .gbmab {margin-top: 31px;}"; //Black Arrow
      css += "#gbq1 .gbmac {margin-top: 31px;}"; //Black Arrow
      css += "#gbq1.gbto #gbz, #gbq1.gbto #gbs {top: 40px !important;}";
      css += "#gbq1 #gbz {margin-left: 5px; !important;}";
      
  avtng.status.thinbar = 1;
  addCSS(css);
}
  
// Add Minimize Toggle Option
function addBarMinimizer() {
  if (activeDocument.getElementById("barMinimizer") != null){return false;}

    var css = ".barMinimizer {\
    cursor: pointer;\
  }\
  .barMinimizer:hover {\
    background: #EFF3FB;\
  }";
  var menus = activeDocument.getElementsByClassName("gbmcc");
  
  if (menus.length > 0) {
    var node = activeDocument.createElement("li");
      node.setAttribute("id","barMinimizer");
      node.className = "gbmtc";

    var innerNode = activeDocument.createElement("a");
      innerNode.className = "gbml1";
      innerNode.className += " barMinimizer";

      innerNode.style = "cursor: pointer;";
      innerNode.addEventListener("click",barMinimizer);
      innerNode.innerHTML = ((avtng.settings.thinbar == 1) ? "Disable" : "Enable") + " Thin Menu";

    addCSS(css);
    node.appendChild(innerNode);
    menus[0].appendChild(node); 
  }
}

// Add Ad Block Toggle Option
function addAdBlocker() {
  if (activeDocument.getElementById("adBlocker") != null){return false;}

  var css = ".adBlocker {\
    cursor: pointer;\
  }\
  .adBlocker:hover {\
    background: #EFF3FB;\
  }";
  var menus = activeDocument.getElementsByClassName("gbmcc");
  
  if (menus.length > 0) {
    var node = activeDocument.createElement("li");
      node.setAttribute("id","adBlocker");
      node.className = "gbmtc";

    var innerNode = activeDocument.createElement("a");
      innerNode.className = "gbml1";
      innerNode.className += " adBlocker";

      innerNode.style = "cursor: pointer;";
      innerNode.addEventListener("click",adBlocker);
      innerNode.innerHTML = ((avtng.settings.adBlocker == 1) ? "Disable" : "Enable") + " Ad Blocker";

    addCSS(css);
    node.appendChild(innerNode);
    menus[0].appendChild(node); 
  }
}


// Toggle the minize bar status
function barMinimizer()
{
  avtng.settings.thinbar ^= 1;
  updateAVTNGSettings();
  reloadPage();
}

// Toggle the adBlocker status
function adBlocker()
{
  avtng.settings.adBlocker ^= 1;
  updateAVTNGSettings();
  reloadPage();
}

// Save the applications settings
function updateAVTNGSettings()
{
  var temp = avtng.status;
  avtng.status = null;
  GM_setValue("avtng", JSON.stringify(avtng.settings));
  avtng.status = temp;
}

// ######################################
// # Tools that are needed to run correctly
// ######################################
// MiscToolBox Get the root url (xxx.google.xxx)
function getRootURL() {return /https?:\/\/[a-zA-Z0-9]+\.([^\/]+)/i.exec(document.URL)[1];}

// MiscToolBox See if we are on the google mail page
function getFullURL(){return /https?:\/\/([^\/]+)/i.exec(document.URL)[1];}

// MiscToolBox Reload page
function reloadPage(){window.location.href = "http://" + getFullURL();}

// DomToolBox Insert a node after a reference node
function insertAfter(referenceNode, newNode ){referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );}

// DomToolBox Insert a node after a reference node
function prependChild(referenceNode, newNode ){referenceNode.insertBefore( newNode, referenceNode.firstChild );}

// DomToolBox add CSS to heads of the document
function addCSS(css)
{
    var heads = activeDocument.getElementsByTagName("head");
    if (heads.length > 0) {
      var node = document.createElement("style");
      node.type = "text/css";
      node.appendChild(document.createTextNode(css));
      heads[0].appendChild(node); 
    }
}

// Check if a Function exists
function isFunction(fn){return (typeof fn == 'function')? true : false;}

// Psuedo Random Hex Generator
Math.randomHex = function(len){
  var hexVal = "";
  while(hexVal.length < len){hexVal += (Math.floor(Math.random()*16)).toString(16);}
  return hexVal;
}

//Check to see if we are in an iFrame
var isIframe = ((activeDocument == document) && (window.location != window.parent.location)) ? true : false;

// ######################################
// # Menu Functions
// ######################################
function attachMenuButtonTriggers(elId)
{
  var el = activeDocument.getElementById(elId);
  
  // If child elements exist then lets attach the listeners to them
  for (var i = 0; i < 8; i++)
  {
    var menuItem = el.childNodes[i];
      menuItem.addEventListener("mouseup", editMenuItemWindow, true);
      menuItem.addEventListener("contextmenu", function (e) {e.preventDefault(); e.stopPropagation();}, true);
  }
}

function attachMenuButtonTrigger(el)
{
      el.addEventListener("mouseup", editMenuItemWindow, true);
      el.addEventListener("contextmenu", function (e) {e.preventDefault(); e.stopPropagation();}, true);
}

function removeMenuItems(menu)
{
  var el = activeDocument.getElementById(menu);
  while (el.childNodes.length > 0 && (el.childNodes[0]).getAttribute("id") != "gbtm"){el.removeChild(el.childNodes[0]);}
}

function addMenuItems()
{
  var items = avtng.settings.menuItems;
  
  // Add CSS specific to menu item highlighting
  addCSS("#gbzc .gbzt:hover, #gbzc > li > a > .gbts:hover {background-color:#4C4C4C; cursor:pointer}");
  addCSS("#gbm1 .gbmt:hover, #gbm2 .gbmt:hover, #gbm1 .gbts:hover, #gbm2 .gbts:hover, #gbtem .gbmt {background-color:#F5F5F5; cursor:pointer}");
  
  for (var i = 0; i < 24; i++)
  {
    if (items[i] != null)
    {
      if (i < 8)
      {
        var el = activeDocument.getElementById("gbzc");
        var menuItem = createPrimaryMenuItem(items[i].url,items[i].icon,items[i].label);
        attachMenuButtonTrigger(menuItem);
        insertAfter(el.childNodes[i], menuItem);
        el.removeChild(el.childNodes[i]);
      }
      else if (i >= 8 && i < 16)
      {
        var el = activeDocument.getElementById("gbm1");
        var menuItem = createSecondaryMenuItem(items[i].url,items[i].icon,items[i].label);
        attachMenuButtonTrigger(menuItem);
        insertAfter(el.childNodes[i-8], menuItem);
        el.removeChild(el.childNodes[i-8]);
      }
      else
      {
        var el = activeDocument.getElementById("gbm2");
        var menuItem = createTertiaryMenuItem(items[i].url,items[i].icon,items[i].label);
        attachMenuButtonTrigger(menuItem);
        insertAfter(el.childNodes[i-16], menuItem);
        el.removeChild(el.childNodes[i-16]);
      }
    }
  }
  
  while (document.getElementsByClassName("gbmasph")[0] != null)
  {
    var el = document.getElementsByClassName("gbmasph")[0];
    if ((el.parentNode).getAttribute("id") == "gbzc")
    {
      var menuItem = createPrimaryMenuItem("#","","&nbsp;");
      insertAfter(el, menuItem);
      (el.parentNode).removeChild(menuItem.previousSibling);
      attachMenuButtonTrigger(menuItem);
    }
    else if ((el.parentNode).getAttribute("id") == "gbm1")
    {
      var menuItem = createSecondaryMenuItem("#","","&nbsp;");
      insertAfter(el, menuItem);
      (el.parentNode).removeChild(menuItem.previousSibling);
      attachMenuButtonTrigger(menuItem);
    }
    else if ((el.parentNode).getAttribute("id") == "gbm2")
    {
      var menuItem = createTertiaryMenuItem("#","","&nbsp;");
      insertAfter(el, menuItem);
      (el.parentNode).removeChild(menuItem.previousSibling);
      attachMenuButtonTrigger(menuItem);
    }
  }
}

function createPrimaryMenuItem(url,icon,label)
{
  var item = document.createElement("li");
      item.className = "gbt";
  
  var itemA = document.createElement("a");
      itemA.className = "gbzt";
      itemA.setAttribute("href",url);
      itemA.setAttribute("target",(url != "#")? "_blank" : "_self");

  var itemI = document.createElement("span");
      var bgStyle = "background-image: url(" + icon + "); background-position: 0px 0px;";
      itemI.setAttribute("style",bgStyle);
      itemI.className = "gbtb2";

  var itemL = document.createElement("span");
      itemL.className = "gbts";
      itemL.innerHTML = label;
      
  itemA.appendChild(itemI);
  itemA.appendChild(itemL);
  
  item.appendChild(itemA);
  
  return item;
}

function createSecondaryMenuItem(url,icon,label)
{
  var item = document.createElement("span");
      item.className = "gbmtc";
  
  var itemA = document.createElement("a");
      itemA.className = "gbmt";
      itemA.setAttribute("href",url);
      itemA.setAttribute("target",(url != "#")? "_blank" : "_self");
      
  var itemI = document.createElement("span");
      var bgStyle = "background-image: url(" + icon + "); background-position: 0px 0px;";
      itemI.setAttribute("style",bgStyle);
      itemI.className = "gbtb2";

  var itemL = document.createElement("span");
      itemL.className = "gbts";
      itemL.innerHTML = label;
      
  itemA.appendChild(itemI);
  itemA.appendChild(itemL);
  
  item.appendChild(itemA);
  
  return item;
}

function createTertiaryMenuItem(url,icon,label)
{
  var item = document.createElement("span");
      item.className = "gbmtc";
  
  var itemA = document.createElement("a");
      itemA.className = "gbmt";
      itemA.setAttribute("href",url);
      itemA.setAttribute("target",(url != "#")? "_blank" : "_self");
      
  var itemI = document.createElement("span");
      var bgStyle = "background-image: url(" + icon + "); background-position: 0px 0px;";
      itemI.setAttribute("style",bgStyle);
      itemI.className = "gbtb2";

  var itemL = document.createElement("span");
      itemL.className = "gbts";
      itemL.innerHTML = label;
      
  itemA.appendChild(itemI);
  itemA.appendChild(itemL);
  
  item.appendChild(itemA);
  
  return item;
}

function saveMenuItem(pos,url,icon,label)
{
  avtng.settings.menuItems[pos] = {"url" : url, "icon" : icon, "label" : label};
  updateAVTNGSettings();
  addMenuItems();
}

function hideAds()
{

  var css = "div#bottomads, div#topads, span#taw, div#rhs_block {\
    display:none !important;\
  }\
  \
    div.oM, div.Zs {\
    display:none !important;\
  }";
  
  addCSS(css);
}

function editMenuItemWindow(e)
{
  if (e.button == 2 && activeDocument.getElementById("avtngItemPrompt") == null)
  {
    //Try to prevent a context menu from showing
    e.stopPropagation();
    
    var elIndex = 0;
    var elem = e.currentTarget;
    while(elem = elem.previousSibling){elIndex++;}
    
    if ((e.currentTarget).parentNode.getAttribute("id") == "gbm1"){elIndex += 8;}
    if ((e.currentTarget).parentNode.getAttribute("id") == "gbm2"){elIndex += 16;}

    var css = "#avtngItemPrompt {\
      z-index: 9999;\
      position: absolute;\
      margin-left: -225px;\
      margin-top: -150px;\
      top: 50%;\
      left:50%;\
      width: 440px;\
      background-color: #F1F1F1;\
      border: solid #C6C6C6 1px;\
      border-radius: 2px;\
      box-shadow: rgba(0, 0, 0, 0.199219) 0px 2px 4px 0px;\
      padding: 5px;\
      font-family: arial, sans-serif;\
      font-size: 13px;\
      color: #666;\
    }\
    span.avtngItemPromptInput {\
      display: block;\
      margin: 5px 0px;\
    }\
    input.avtngItemPromptInput, select.avtngItemPromptInput {\
      width: 325px;\
    }\
    .avtngItemPromptLeft {\
      padding: 10px; 0px;\
      float: left;\
    }\
    .avtngItemPromptRight {\
      padding: 5px; 0px;\
      float: right;\
    }\
    .avtngItemPromptButton {\
      display: block;\
      margin: 5px 0px;\
      width: 76px;\
      cursor: pointer;\
    }\
    .avtngItemPromptIconPreview {\
      display: block;\
      border: dotted #666 1px;\
      width: 32px;\
      height: 32px;\
      margin: 5px 22px;\
    }\
    .avtngItemPromptHR {\
      width: 76px;\
      margin: 2px 0px;\
    }";
    
    addCSS(css);
    
    var currentURL = ((e.currentTarget).childNodes[0]).getAttribute("href") || "URL";
    var currentIcon = ((e.currentTarget).childNodes[0]).childNodes[0].getAttribute("style");
        currentIcon = (/\((.+)\)/i.exec(currentIcon))? /\((.+)\)/i.exec(currentIcon)[1] : "Icon";
    var currentLabel = ((e.currentTarget).childNodes[0]).childNodes[1].innerHTML || "Label";
    
    var itemPrompt = document.createElement("div");
        itemPrompt.setAttribute("id","avtngItemPrompt");
        itemPrompt.innerHTML = "<div class=\"avtngItemPromptLeft\">\
          <span class=\"avtngItemPromptInput\"><input class=\"avtngItemPromptInput\" type=\"text\" id=\"avtngItemPromptLabel\" value=\"" + currentLabel + "\" /></span>\
          <span class=\"avtngItemPromptInput\"><input class=\"avtngItemPromptInput\" type=\"text\" id=\"avtngItemPromptIcon\" value=\"" + currentIcon +"\" /></span>\
          <span class=\"avtngItemPromptInput\"><input class=\"avtngItemPromptInput\" type=\"text\" id=\"avtngItemPromptURL\" value=\""+ currentURL +"\" /></span>\
          <input type=\"hidden\" id=\"avtngItemPromptIndex\" value=\"" + elIndex + "\" />\
          <span  class=\"avtngItemPromptInput\"><center><strong>OR</strong></center></span>\
          <span  class=\"avtngItemPromptInput\">\
          <select class=\"avtngItemPromptInput\" id=\"avtngItemPromptPreset\"></select>\
          </span>\
          </div>\
          <div class=\"avtngItemPromptRight\">\
          <img src=\"" + ((currentIcon != "Icon")? currentIcon : "") + "\" alt=\"Icon\" id=\"avtngItemPromptIconPreview\" class=\"avtngItemPromptIconPreview\" />\
          <img id=\"avtngItemPromptSave\" class=\"avtngItemPromptButton\" src=\"https://lh6.googleusercontent.com/-nHvn08OuAvs/Tv56lScS4qI/AAAAAAAABP4/IhdMJtqGHP0/s100/save.png\" />\
          <img id=\"avtngItemPromptCancel\" class=\"avtngItemPromptButton\" src=\"https://lh3.googleusercontent.com/-jhcRoNTgvQw/Tv56lJcQOHI/AAAAAAAABPo/0IFcUbgSgZg/s100/cancel.png\" />\
          <hr class=\"avtngItemPromptHR\"/>\
          <img title=\"" + popupMessages.aboutButtonTitle + "\" id=\"avtngItemPromptAbout\" class=\"avtngItemPromptButton\" src=\"https://lh3.googleusercontent.com/-FKfme5RRUCs/Tv56lPakMpI/AAAAAAAABPs/bpv9FNPUmm4/s100/about.png\" />\
          <img title=\"" + popupMessages.donateButtonTitle +"\" id=\"avtngItemPromptDonate\" class=\"avtngItemPromptButton\" src=\"https://lh6.googleusercontent.com/-VWA4Upmdx-s/Tv56lT_KMzI/AAAAAAAABP8/6Oec5ks8cSQ/s100/Donate.png\" />\
          </div>\
          ";

    activeDocument.body.appendChild(itemPrompt);

    // Populate the preset dropdown
    for (var i = 0; i < optionsDropdown.length; i++)
    {
      var option = document.createElement("option");
          option.innerHTML = optionsDropdown[i].label;
          option.setAttribute("value",optionsDropdown[i].id);
      (activeDocument.getElementById("avtngItemPromptPreset")).appendChild(option);
    }

    // Attach a listener to the icon text to change the pic when text is entered
    (activeDocument.getElementById("avtngItemPromptIcon")).addEventListener("change", function(e) {var el = e.currentTarget;(activeDocument.getElementById("avtngItemPromptIconPreview")).setAttribute("src",el.value);}, false);

    // Attach a listener to the dropdown to populate the text boxes when changed
    (activeDocument.getElementById("avtngItemPromptPreset")).addEventListener("change", function(e) {
      var el = e.currentTarget;
      if (el.value == -1){return false;};
      (activeDocument.getElementById("avtngItemPromptLabel")).value = presetButtons[el.value].label;
      (activeDocument.getElementById("avtngItemPromptIcon")).value = presetButtons[el.value].icon;
      (activeDocument.getElementById("avtngItemPromptURL")).value = presetButtons[el.value].url;
      (activeDocument.getElementById("avtngItemPromptIconPreview")).setAttribute("src",presetButtons[el.value].icon);
    }, false);
    
    var saveButton = activeDocument.getElementById("avtngItemPromptSave");
        saveButton.addEventListener("click", function () {
          if (activeDocument.getElementById("avtngItemPromptURL").value == "") {activeDocument.getElementById("avtngItemPromptURL").value = "#"};
          if (activeDocument.getElementById("avtngItemPromptIcon").value == "") {activeDocument.getElementById("avtngItemPromptIcon").value = ""};
          if (activeDocument.getElementById("avtngItemPromptLabel").value == "") {activeDocument.getElementById("avtngItemPromptLabel").value = "&nbsp;"};
        
          saveMenuItem(
            activeDocument.getElementById("avtngItemPromptIndex").value,
            activeDocument.getElementById("avtngItemPromptURL").value,
            activeDocument.getElementById("avtngItemPromptIcon").value,
            activeDocument.getElementById("avtngItemPromptLabel").value
          );
          var itemPrompt = activeDocument.getElementById("avtngItemPrompt");
          activeDocument.body.removeChild(itemPrompt);
        }, false);
    
    var cancelButton = activeDocument.getElementById("avtngItemPromptCancel");
        cancelButton.addEventListener("click",function () {
          var itemPrompt = activeDocument.getElementById("avtngItemPrompt");
          activeDocument.body.removeChild(itemPrompt);
        }, false);

    var aboutButton = activeDocument.getElementById("avtngItemPromptAbout");
        aboutButton.addEventListener("click",function () {
          if (confirm(popupMessages.aboutConfirm)) {
            var popUp = window.open("http://www.bit.ly/google_bar_plus","Homepage");
            if (popUp == null || typeof(popUp)=='undefined') {   
              alert(popupMessages.popupBlocking); 
            } 
            else {   
              var itemPrompt = activeDocument.getElementById("avtngItemPrompt");
              activeDocument.body.removeChild(itemPrompt);
              popUp.focus();
            }
          }
        }, false);

    var donateButton = activeDocument.getElementById("avtngItemPromptDonate");
        donateButton.addEventListener("click",function () {
          if (confirm(popupMessages.donateConfirm)) {
            var popUp = window.open("http://www.bit.ly/googleBarPlusDonation","Donations");
            if (popUp == null || typeof(popUp)=='undefined') {   
              alert(popupMessages.popupBlocking); 
            } 
            else {   
              var itemPrompt = activeDocument.getElementById("avtngItemPrompt");
              activeDocument.body.removeChild(itemPrompt);
              popUp.focus();
            }
          }
        }, false);

  }
}

// ######################################
// # Bring the customizations online
// ######################################
try{init();}
catch(e){window.alert(popupMessages.genericError + e);}