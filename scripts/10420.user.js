// ==UserScript==
// @name           MU_Bundle
// @namespace      http://gmscripts.bigsleep.net
// @description    Free MegaUpload helper
// @version        1.0
// @include        http://www.megaupload.com/*
// @include        http://www.megarotic.com/*
// ==/UserScript==

/* ---- MU_Bundle ----
  - Makes a link you can copy or (Alt)+Click to your download manager
  - Removes the big ad so you dont have to "Skip Ad"
  - Removes (most) all Flash Objects
  - Hides all banners - this can be done with Stylish as well
  - Clears timer so link shows right off - the time count remains
  - Removes onclick from link so there can be no pop-up
  - Displays time remaining in the title
  - Option to auto-download when timer = 0
  - Works for any language they support

  -- bugs --
  - You still have to wait to download
    this is controlled on the server side and is likely
    different for everyone, eventually it works.
    Watch the timer to see how long it takes, or use the autoDownload option.
  - Hold down Shift or Alt when clicking the link and the timer continues,
    otherwise if the download fails youll get a new page and have to wait again.
    Or use the right-click menu.
  - The timer may pause if you are choosing a download folder,
    however you need to realise that downloading has started at this point.
  - Auto-download can not force download with download manager,
    "auto-alt-click" is not possible in JavaScript alone.
  -------------------- */

// Hide banners - list of IDs to not display
var mu_HideBanners = ["#topbannerswf", "#bottombannerswf", "#topswf", "#rightunitswf",
    "#adbr1"];
// you can also use this local function that removes them from the DOM
//removeElementById('topbannerswf');

// Two path regex tests - edit here if they change
// Link path is a query string
var mu_LinkPath = /^\?d=\w+/;
// Download page is / or language /en/
var mu_DlPath = /^\/(\w\w\/)?$/;

// -- Preference defaults --
// storePrefs
// - Allow preferences to be stored in userPref config (true or false)
// autoDownload
// - Load Download Link when timer hits 0 (true or false)
// message: messages displayed in confirm dialogs
var UserPrefs = {
  storePrefs: true,
  autoDownload: false,
  message: {
    autoDownload: "Automatically start the download",
  }
};

// Get top level domain name for SetCookie() and DeleteCookie()
var domainname = window.location.hostname;
var GlobalDomain = "." + getDomainPart(2) + "." + getDomainPart(1);

// Delete Cookies here, second param is for path, default path is "/"
// DeleteCookie("name","/path");
DeleteCookie("v");

// Set Cookies here, third param is for path, default path is "/"
// SetCookie("name","value","/path");
// Note:
// This function escapes the cookie value, use
// value = unescape(value);
//   to convert an escaped value if necessary, for example you might see
//   the cookie name "MUTBI" with the content value "E%3D1%2CP%3D0"
//   unescape("E%3D1%2CP%3D0") converts that to "E=1,P=0"
//   You can also use the Javascript URL ...
// javascript:alert(unescape("E%3D1%2CP%3D0"));
// Examples that might remove the country download slot limit
//SetCookie("megauploadtoolbar_visibility", "yes");
//SetCookie("megauploadtoolbar_id", "197A9F07D8724E438DEBE1C11EBBE405");

// Apply styles - affects any page the script runs on - or move to "if"s
mu_AddStyles();

var testelm;
if(mu_LinkPath.test(location.search)){
  KillFlash();
  if(testelm = getFirstXPathResult("//body//div[@style]")){
    testelm.parentNode.removeChild(testelm);
  }
  if(document.getElementById("imgstr")){
    document.getElementById("imgstr").focus();
  }
  return true;
}else if(mu_DlPath.test(location.pathname)){
  // fix unclickable Download link
  if(testelm = getFirstXPathResult( "//a[starts-with(@href,'http://www.megarotic.com/?d=') "+
      "or starts-with(@href,'http://www.megaupload.com/?d=')]" )){
    testelm.parentNode.style.zIndex = "1";
    // just in case they sneak in a click handler
    testelm.removeAttribute('onclick');
    testelm.addEventListener('click', function(e){ e.stopPropagation() }, false);
  }
  // MU script = 'function countdown()'
  if(testelm = getFirstXPathResult( "//body//script[contains(text(),'function countdown()')]" )){
    // "Download link: " = document.links[2].href
    KillFlash();
    // save title
    var mutitle = document.title;
    var re = /^\s*(\w+)\s?=\s?(\d+)\;/;
    var timer = testelm.textContent.match(re);
    var future = (timer[2] * 1000) + Date.now();
    testelm = undefined;
    //GM_log("text match: "+timer[0]+", "+timer[1]+", "+timer[2]);
    if(unsafeWindow[timer[1]] > 1){ unsafeWindow[timer[1]] = 1 }
    function waittime(){
      if(unsafeWindow[timer[1]] > 0){
        setTimeout(waittime,1000);
      }else{
        removeElementById('dlimage');
        if(testelm = getFirstXPathResult( "//a[@onclick]", document.getElementById('dlbutton') )){
          testelm.removeAttribute('onclick');
        }else{
          testelm = document.getElementById('dlbutton').getElementsByTagName('a').item(0);
        }
        if(!testelm){
          GM_log("function waittime: could not find <a> in elementId 'dlbutton'");
          return false;
        }
        testelm.id = "mubundle_downloadLink";
        testelm.textContent = "Download Link [ "+timer[2]+" ]";
        removeElementById('dlbutton');
        document.getElementById('dlcounterimg').style.display = "block";
        document.getElementById('dlcounter').style.display = "block";
        document.getElementById('dlcounter').textContent = "";
        document.getElementById('dlcounter').appendChild(testelm);
        CheckUserPrefs();
        newcounter();
        // in case they sneak in a handler
        testelm.addEventListener('click', function(e){ e.stopPropagation() }, false);
      }
    }
    function newcounter(){
      timer[2] = (future - Date.now()) / 1000;
      timer[2] = timer[2].toFixed(0);
      if(timer[2] > 0){
        document.title = "[ " + timer[2] + " ] to download";
        testelm.textContent = "Download Link [ "+timer[2]+" ]";
        setTimeout(newcounter, 1000);
      }else{
        document.title = "Download ready - " + mutitle;
        testelm.textContent = "Download Link";
        if(UserPrefs.autoDownload){ location.href = testelm.href }
      }
    }
    waittime();
  }else{
    // else nothing to do
    return false;
  }
  return true;
}

//-- functions --
function mu_AddStyles(){
  for(var i=0, styles="  "; i<mu_HideBanners.length; i++){
    styles = styles + mu_HideBanners + " { z-index: -1; display: none }\n  ";
  }
  // add more styles here
  if(GM_addStyle) GM_addStyle(styles);
}

// http://www.megaupload.com/flashobject2.js
function KillFlash(){
  // if(hasFlash){ var fo = new FlashObject }
  unsafeWindow.hasFlash = false;
  // var fo = new FlashObject("gui/ru_vis.swf", "rightunitswf", ...);
  unsafeWindow.FlashObject = null;
}
// Xpath evaluate returns first node value or null - expression [, node]
function getFirstXPathResult(expr){
  var node = (arguments[1])? arguments[1]: document;
  var res = document.evaluate(expr, node, null,
      XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  return res.singleNodeValue;
}
function removeElementById(id){
  var elm = document.getElementById(id);
  if(elm) elm.parentNode.removeChild(elm);
  return true;
}
// get part of domain (hostname) - 1=tld, 2=domain, 3=subdomain
function getDomainPart(s){
  var domparts = domainname.split(".");
  domparts.reverse();
  // for ccTLD - overkill, just for completeness
  if((domparts[2]) && (domparts[0].length == 2 && domparts[1].length <= 3)){
    // ccTLD TLD - not sure of all valid ones
    var re = /(com|org|edu|sch|gov|mod)/;
    if(re.test(domparts[1]) || domparts[1].length == 2){
      domparts[1] = domparts[1] + "." + domparts[0];
      domparts.shift();
    }
  }
  while(domparts[3]){
    domparts[2] = domparts[3] + "." + domparts[2];
    domparts.splice(3,1);
  }
  return domparts[s-1];
}
// Delete a cookie named - (cookie name [, cookie path])
function DeleteCookie(cookiename){
  var cookiepath = (arguments[1])? arguments[1]: "/";
  var date = new Date();
  date.setTime(date.getTime() - 1000);
  document.cookie = cookiename + "=; expires=" + date.toGMTString() + "; path=" + cookiepath + "; domain=" + GlobalDomain;
}
// Set a new session cookie - (cookie name, cookie value [, cookie path])
function SetCookie(cookiename, cookievalue){
  var cookiepath = (arguments[2])? arguments[2]: "/";
  // must escape unescaped cookie values
  // might also be able to use encodeURIComponent(cookievalue)
  cookievalue = escape(cookievalue);
  document.cookie = cookiename + "=" + cookievalue + "; path=" + cookiepath + "; domain=" + GlobalDomain;
}
// set user prefs if not already set
function CheckUserPrefs(){
  if(UserPrefs.storePrefs && GM_getValue){
    for(opt in UserPrefs){
      if(opt == "storePrefs"){ continue; }
      if(opt == "message"){ continue; }
      if(typeof UserPrefs[opt] !== "boolean"){
        GM_log("CheckUserPrefs: UserPrefs " + opt +
            " not boolean - must be true or false");
        UserPrefs[opt] = true;
      }
      UserPrefs[opt] = SetUserPref(opt, UserPrefs[opt]);
    }
  }
  function SetUserPref(pref,val){
    try{
      var curPref = GM_getValue(pref);
    }catch(e){
      GM_log("SetUserPref(\"" + pref + "\") thew an exception... " + e.message);
      if(e.name === "NS_ERROR_UNEXPECTED") alert("You need to restart or set pref: " + pref);
      return false;
    }
    if(curPref !== undefined) return curPref;
    var userval = confirm("MU_Bundle UserScript option:\n " + UserPrefs.message[pref] + "?");
    if(typeof userval === "boolean"){ val = userval }
    else{ GM_log("SetUserPref: confirm did not return boolean") }
    GM_setValue(pref, val);
    return val;
  }
}
