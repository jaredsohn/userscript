// kotosprict
// version 0.22
// 2005-12-21 (last updated 2006-06-15)
// by ento (http://kotonoha.cc/ento)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// This script resides at http://userscripts.org/scripts/source/2409.user.js
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
//
// To uninstall, go to Tools/Manage User Scripts,
// select "kotoscript", and click Uninstall.
//
// --------------------------------------------------------------------
//
// What I can do:
//  Home - make a list of koto that you posted
//         link to your kotomark
//  Koto - keyboard shortcut
//           alt+j << prev
//           alt+l next >>
//           alt+y yes/maru
//           alt+n no /batsu
//           alt+i focus on the comment box
//           alt+k submit comment
//           alt+q cancel the answer
//         koto specific caching of posted kotolist
//         sort users
//         kotomarking
//  Hot/Pop
//       - sort
//  All  - display the number of your yes and no
//         switch between all list and yet list
//  Setup- turn on/off each features
//         lock kotonoha for a number of times (request from kotonoholics anonymous)
//
// -----------------------------------------------------------------
// changelog
//
//   2006-04-16 renamed to kotosprict
//              refactored around
//   2006-02-11 added sort for posted kotolist
//   2006-02-09 added sort for answered users (user count removed)
//   2005-12-21 first release
// -----------------------------------------------------------------
//
// ==UserScript==
// @name            kotosprict
// @namespace       http://kotonoha.cc/user/ento
// @description     enhance your kotonoha experience
// @include         http://kotonoha.cc/*
// @include         http://*.kotonoha.cc/*
// ==/UserScript==


//// Begin KTPrefsManager Object ////
function KTPrefsManager(aString){
  if(!aString) return null;
  this.domainKey = document.domain + '.';
  this.uname = aString;
  this.prefs = this.getUserPrefs(this.uname);
}

KTPrefsManager.prototype =
    {
    ScriptName : 'kotosprict',
    OldStartPoint : 'greasemonkey.scriptvals.http://kotonoha.cc/ento/kotonoha extension.',
    //// display messages ////
    DisplayMessages : new Array(),
    DefaultLanguage : 'ja',
  
    //// GM_setValue key suffix (they are stored in about:config)
    ConfigKey :
      {
      DefaultLocks : '.defaultLocks',
      RemainingLocks : '.remainingLocks',
      Prefs : '.prefs',
      Kotomark : '.kotomark',
      Postlist : '.postlist',
      PostlistLimit : '.postlist.limit'
      },
    //// keys ////
    HotKey :
      {
      Yes : 'y'.charCodeAt(0),
      No : 'n'.charCodeAt(0),
      Cancel : 'q'.charCodeAt(0),
      Forward : 'l'.charCodeAt(0),
      Backward : 'j'.charCodeAt(0),
      SkipForward : 'o'.charCodeAt(0),
      SkipBackward : 'u'.charCodeAt(0),
      Comment : 'i'.charCodeAt(0),
      Ok : 'k'.charCodeAt(0)
      },
    //// charcodes: to count the maru/batu of users
    // they are codes for o and x in fullwidth
    CharCode :
      {
      Yes : 9675,
      No : 215
      },
    //// css selector: for switching between all koto / not-yet koto
    CssRegExp :
      {
      YKoto : /span.koto_1 a:[^h]/,
      NKoto : /span.koto_2 a:[^h]/,
      Koto : /span.koto_0/
      },
    // css color
    CssColor :
      {
      YKoto : "#039",
      NKoto : "#903",
      Koto : "#666"
      },
    //// image locations: to determine the done_flag programatically
    ImageSrc :
      {
      Maru : '/images/maru.gif',
      Batsu : '/images/batsu.gif',
      // post list
      Separator : '/images/bullet.gif',
      // pointer
      Pt_Orange : '/images/pt_or.gif',
      Pt_Red : '/images/pt_r.gif',
      PtBox_Red : '/images/pt_r.png'
      },
    //// user sorting in koto page
    UserSort :
      {
      YesValue : 2,
      NoValue : 0,
      BrValue : 1
      },
    //// user prefs
    DefaultUserPrefs :
      {
      postListEnabled : true,
      shortcutEnabled : true,
      //skipEnabled : false,
      kotomarkEnabled : true,
      yesnoEnabled : true,
      //yesEnabled : false,
      //noEnabled : false,
      allCountEnabled : false,
      notyetEnabled : true,
      //sort default is already 'new'
      //yourKotolistSortByNew : true,
      usersSortByCount : false
      },
    setLanguage : function(lang){
      this.dm = this.DisplayMessages[lang];
      if(!this.dm) this.dm = this.DisplayMessages[this.DefaultLanguage];
    },
    uniqueConfigKey : function(key, aUname){
      if(!aUname) aUname = this.uname;
      return this.domainKey + aUname + key;
    },
    getMyPostedKotolist : function(){
      // get the kotolist posted by the user
      // raw format is "no,yesno,count,kotoname\n"
      var key = this.uniqueConfigKey(this.ConfigKey.Postlist);
      var raw = unescape(GM_getValue(key, ""));
      
      var list = raw.split("\n");
      var kotos = {};
      for(var i = 0; i < list.length; i++){
        var split = list[i].split(",");
        if(split.length > 2){
          var id = split.shift();
          var yesno = split.shift();
          var count = parseInt(split.shift());
          var title = split.join(",");
          kotos[id.toString()] = new Array(id, yesno, count, title);
        }
      }
      return kotos;
    },
    setMyPostedKotolist : function(kotos){
      // save the kotolist posted by the user
      var key = this.uniqueConfigKey(this.ConfigKey.Postlist);
      var raw = "";
      var count = 0;
      
      for(id in kotos){
        var koto = kotos[id];
        if(koto != null){
          count++;
          raw += escape(koto.join(","));
          raw += "\n";
        }
      }
      GM_setValue(key, raw);
      return count;
    },
      // postlist limit
    getPostlistLimit : function(){
      var key = this.uniqueConfigKey(this.ConfigKey.PostlistLimit);
      return GM_getValue(key, 20);
    },
    setPostlistLimit : function(limit){
      var key = this.uniqueConfigKey(this.ConfigKey.PostlistLimit);
      var value = "" + limit;
      GM_setValue(key, value);
    },
      // koto skips for keyboard shortcut
    //getSkips : function(){
    //  return true == this.prefs["skipEnabled"] ? 3 : 1;
    //},
      // kotomark
    getKotomark : function(){
      var key = this.uniqueConfigKey(this.ConfigKey.Kotomark);
      return GM_getValue(key);
    },
    setKotomark : function(kotono){
      var key = this.uniqueConfigKey(this.ConfigKey.Kotomark);
      var value = "" + kotono;
      GM_setValue(key, value);
    },
      // get user prefs
      // raw format is "pref=value\n"
    getUserPrefs : function(aUname){
      var key = this.uniqueConfigKey(this.ConfigKey.Prefs, aUname);
      var raw = GM_getValue(key, "");
      // initialization
      if(raw == ""){
        // we can't access Component object from user scripts
        // old pref import looks impossible..
/*        var fxpref = this.getPrefObject(this.OldStartPoint);
        var oldprefs = fxpref.getValue(key, "");
        if(oldprefs != ""){
          for(var key in this.ConfigKey){
            var oldValue = fxpref.getValue(key, null);
            if(null != oldValue) GM_setValue(key, oldValue);
          }
          raw = oldprefs;
        } else {*/
          var prefs = new Array();
          var defaults = this.DefaultUserPrefs;
          for(var key in defaults){
            prefs[key] = defaults[key];
          }
          this.setUserPrefs(prefs);
          return prefs;
//        }
      }
      return this.newPrefsFrom(raw);
    },
    newPrefsFrom : function(raw){
      var prefs = new Array();
      var list = raw.split("\n");
      for(var i = 0; i < list.length; i++){
        var split = list[i].split("=");
        if(split.length > 1){
          var pref = split.shift();
          var value = split.shift();
          prefs[pref] = eval(value);
        }
      }
      return prefs;
    },
    // copied from gm source
    getPrefObject : function(startPoint){
     var pref = Components.classes["@mozilla.org/preferences-service;1"].
        getService(Components.interfaces.nsIPrefService).
          getBranch(startPoint);
      pref.getValue = function(prefName, defaultValue) {
        var prefType = pref.getPrefType(prefName);
        // underlying preferences object throws an exception if pref doesn't exist
        if (prefType == pref.PREF_INVALID) {
          return defaultValue;
        }
        
        switch (prefType) {
        case pref.PREF_STRING:
          return pref.getCharPref(prefName);
        case pref.PREF_BOOL:
          return pref.getBoolPref(prefName);
        case pref.PREF_INT:
          return pref.getIntPref(prefName);
        }
      };
      return pref;
    },
      // save user prefs
    setUserPrefs : function(prefs){
      var key = this.uniqueConfigKey(this.ConfigKey.Prefs);
      var raw = "";
      var count = 0;
      
      for(pref in prefs){
        var value = prefs[pref];
        if(value != null){
          count++;
          raw += pref + "=" + value;
          raw += "\n";
        }
      }
      GM_setValue(key, raw);
      return count;
    },
    setUserPref : function(pref, value){
      this.prefs[pref] = value;
      this.setUserPrefs(this.prefs);
    },
      // locking
    getLocked : function(){
      var key = this.uniqueConfigKey(this.ConfigKey.RemainingLocks);
      return GM_getValue(key, 0);
    },
    setLocked : function(remaining){
      var key = this.uniqueConfigKey(this.ConfigKey.RemainingLocks);
      GM_setValue(key, remaining);
    },
    getDefaultLocks : function(){
      var key = this.uniqueConfigKey(this.ConfigKey.DefaultLocks);
      return GM_getValue(key, 1);
    },
    setDefaultLocks : function(value){
      var key = this.uniqueConfigKey(this.ConfigKey.DefaultLocks);
      GM_setValue(key, value);
    }
}
// define display messages
KTPrefsManager.prototype.DisplayMessages['ja'] =
    // begin display message = ja
    {
      // limit
    Limit_Label: 'Limit&nbsp;:&nbsp;',
    Limit_20 : '20',
    Limit_60 : '60',
    Limit_200 : '200',
    Limit_None : 'None',
      // sorting
    Sort_Label : 'Sort&nbsp;:&nbsp;',
    Sort_Abc: 'ABC',
    Sort_New : 'New',
    Sort_Yesno : '\u25cb\u00d7',
      // my stats on all koto page
    AllKoto_Yes : '\u25cb ',
    AllKoto_No : ' \u00d7 ',
    AllKoto_NA : ' - ',
    YetList_Label : '\u56de\u7b54\u6e08\uff1a',
    YetList_BeYetList : '\u96a0\u3059',
    YetList_BeAllList : '\u8868\u793a',
      // post list caching
    Cache_Delete : 'remove koto',
    Cache_Cache : 'be my koto',
    Cache_Clear : 'clear',
      // kotomarking
    Kotomark : 'kotomark',
    Kotomark_Ed : 'kotomarked',
      // 
      // locking
    Lock_Title : '\u30b3\u30c8\u30ce\u30cf - \u30ed\u30c3\u30af\u4e2d (%d)',
    Lock_KotoName : '\u30ab\u30a6\u30f3\u30c8\u30c0\u30a6\u30f3: %d',
    Lock_Batsu : '\u307E\u305F\u6765\u3066\u306D !',
    Lock_Maru : '\u6b8b\u308a %d \u500b\u3067\u3059',
    Lock_Warning : '\u307E\u305F\u6765\u3066\u306D !',
      // setup
    SetupTitle_Checks : '\u30aa\u30d7\u30b7\u30e7\u30f3',
    SetupTitle_Lock : '\u30ed\u30c3\u30af',
    Setup_CheckUseDefault : '\u521d\u671f\u8a2d\u5b9a\u306b\u623b\u3059',
    Setup_CheckLabels : {
      postListEnabled : [" Post\u3057\u305f\u30b3\u30c8\u30ea\u30b9\u30c8\u3092\u8868\u793a\u3059\u308b", ""],
      shortcutEnabled : [" \u62e1\u5f35Hotkeys<br/>(alt+ j< l> u<< o>> y\u25cb n\u00d7 i\u30b3 k\u9001 q\u672a)", ""],
      // skipEnabled : [" Hotkeys \u306F3\u3064\u98DB\u3070\u3057", ""],
      kotomarkEnabled : [" Kotomark", ""],
      yesnoEnabled : [" \u56de\u7b54\u3057\u305f\u30e6\u30fc\u30b6\u306e\u4e26\u3073\u9806\u30b9\u30a4\u30c3\u30c1",""],
      yesEnabled : [" \u25cb\u306e\u4eba\u306e\u6570", ""],
      noEnabled : [" \u00d7\u306e\u4eba\u306e\u6570", ""],
      allCountEnabled : [" All koto \u3067\u56de\u7b54\u72b6\u6cc1\u3092\u6570\u3048\u308b", ""],
      notyetEnabled : [" All koto \u306b\u672a\u56de\u7b54\u30b3\u30c8\u30ea\u30b9\u30c8\u30b9\u30a4\u30c3\u30c1\u3092", ""],
      // sort default is already 'new'
      //    new Array("yourKotolistSortByNew", true, "\u30e1\u30cb\u30e5\u30fc\u306e Your kotolist \u306f\u65b0\u7740\u9806\u306b\u98db\u3076", ),
      usersSortByCount : [" \u30e1\u30cb\u30e5\u30fc\u306e Users \u306f\u25cb\u00d7\u304c\u591a\u3044\u4eba\u306b\u98db\u3076", ""]
    },
    Setup_Locks : '\u500b',
    Setup_LockSubmit : '\u304b\u3051\u308b',
    Setup_LockSaveAsDefault : '\u30c7\u30d5\u30a9\u30eb\u30c8\u306b\u8a2d\u5b9a',
    };
  //// end display message = ja

//// End KTPrefsManager Object ////

//// Begin universal operation ////
// import koto variables
var koto_id = getKotoId();
var koto_name = getKotoName();
var done_flag = getDoneFlag();

// get user prefs
var pm = new KTPrefsManager(getUName());
if(!pm) return null;
pm.setLanguage('ja');

//// begin pref = yourKotolistSortByNew
if(pm.prefs["yourKotolistSortByNew"] == true){
  // find the link to My kotolist
  var xpath = "//ul/li/a[text()='Your kotolist']";
  var res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  
  // My kotolist links to sort by new
  if(res) res.setAttribute('href', res.getAttribute('href') + '/sort=new');
}
//// end pref = yourKotolistSortByNew

// find the link to Users
var xpath = "//ul/li/a[text()='Users']";
var res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

//// begin pref = usersSortByCount
if(pm.prefs["usersSortByCount"] == true){
  // Users links to sort by yesno
  if(res) res.setAttribute('href', '/?mode=user&act=search&sort=done_cnt');
}
//// end pref = usersSortByCount

//// begin pref = kotomarkEnabled
var kotomark = pm.getKotomark();
if(pm.prefs["kotomarkEnabled"] == true){
  var li = document.createElement("li");
  var mark = document.createElement("a");

  if(kotomark == null){ kotomark = 0; }
  mark.innerHTML = 'Kotomark';
  mark.setAttribute("id", "kt_kotomark");
  mark.setAttribute("href", "/no/" + kotomark);

  li.appendChild(mark);
  if(res) res.parentNode.parentNode.appendChild(mark);
}
//// end pref = kotomarkEnabled

//// first switch by locked or unlocked ////
var locks = pm.getLocked();
if(locks > 0) {
  //// we are locked ////
  document.title = pm.dm.Lock_Title.replace(/%s/, pm.uname).replace(/%d/, locks + '');
  done_flag = 0;
  // locked screen : ugly X(
  var inner = '<div class="block" id="container">\n';
  inner += '<h1><a title="locked"><img src="/images/logo.png" alt="Kotonoha" title="Kotonoha"/></a></h1>\n';
  inner += '<dl class="clock" id="header">\n';
  inner += '  <dt class="hidden">Login menu</dt>\n';
  inner += '     <dd><ul><li>Logged in as ';
  inner += pm.uname;
  inner += ' | Setup | Help | <a href="/logout">Log out</a></li>\n';
  inner += '       <li><!-- total done count --></li></dl><dl id="menu">\n';
  inner += '     </ul></dd></dl>\n';
  inner += '<div class="block" id="wrapper"><!--start wrapper -->\n';
  inner += '  <div class="block" id="contents"><!--start contents -->\n';
  inner += '    <div class="contents_inner">\n';
  inner += '      <dl class="block"><!-- start prevnext --></dl>\n';
  inner += '      <br style="margin-bottom: 10px;" /><!-- /prevnext -->\n';
  inner += '      <div class="block" id="koto"><!--  start koto -->\n';
  inner += '        <h2 class="kototitle" id="kototitle">' + pm.dm.Lock_KotoName.replace(/%d/, locks + '') + '</h2>\n';
  inner += '    </div><!-- /koto -->\n';
  inner += '    <dl id="marubatsu"><!--start -->\n';
  inner += '      <dt class="hidden">?dt>\n';
  inner += '      <dd class="marubox"><span id="maru" accesskey="y"><img src="/images/maru_bw.gif" width="68" height="67" alt=""/></span></dd>\n';
  inner += '      <dt class="hidden">?dt>\n';
  inner += '      <dd class="batsubox"><span id="batsu" accesskey="n"><img src="/images/batsu_bw.gif" width="68" height="67" alt=""/></span></dd>\n';
  inner += '    </dl><br /><!-- end -->\n';
  inner += '    <div id="answered_block"><p id="comment_result"></p></div>\n';
  inner += '  </div></div>\n';
  inner += '<div class="block" id="footer">\n';
  inner += '  <address>generated by <a href="http://www.userscripts.org/scripts/show/2409">kotonoha Greasemonkey script</a></address>\n';
  inner += '  <p class="affiliation">paperboy&amp;co. is not affiliated with this content</p></div>';
  inner +- '</div></div>';
  document.body.innerHTML = inner;
  // assign onclick
  var maru = document.getElementById("maru");
  var batsu = document.getElementById("batsu");
  maru.addEventListener("click", function(event){
    var message = "";
    if(done_flag == 1 | done_flag == 2){
      message = pm.dm.Lock_Warning;
    } else {
      locks = locks - 1;
      pm.setLocked(locks);
      done_flag = 1;
      message = pm.dm.Lock_Maru.replace(/%d/, locks + '');
    }
    maru.innerHTML = '<img src="/images/maru_loading.gif">';
    window.setTimeout(function(){
      maru.innerHTML = '<img src="/images/maru.gif" width="68" height="67" />';
      batsu.innerHTML = '<img src="/images/batsu_bw.gif" width="68" height="67" />';
      document.getElementById('comment_result').innerHTML = '<span class="success">' + message +'<br /></span>';
    }, 1000);
  }, true);
  batsu.addEventListener("click", function(event){
    batsu.innerHTML = '<img src="/images/batsu_loading.gif">';
    done_flag = 2;
    window.setTimeout(function(){
      batsu.innerHTML = '<img src="/images/batsu.gif" width="68" height="67" />';
      maru.innerHTML = '<img src="/images/maru_bw.gif" width="68" height="67" />';
      document.getElementById('comment_result').innerHTML = '<span class="success">' + pm.dm.Lock_Batsu + '<br /></span>';
      }, 1000);
  }, true);
} else {
  //// we are not locked
  //// switch by page type
  switch(getPageType()){
  case 'home':
    processHome();
    break;
  case 'no':
  case 'id':
    processKoto();
    break;
  case 'all':
    processAll();
    break;
  case 'setup':
    processSetup();
    break;
  case 'pop':
  case 'hot':
    processHotpop();
    break;
  case 'hot':
    processHot();
    break;
  }
}
//// End Universal Operation ////

//// Begin page specific operations ////
//// Page Type: All

//// style sheet manipulation functions
function showYetList(){
  var rules = document.styleSheets[0].cssRules;
  for(var i = 0; i < rules.length; i++){
    var sel = rules[i].selectorText;
    if(!sel) continue;
    if(sel.match(pm.CssRegExp.YKoto) || sel.match(pm.CssRegExp.NKoto)){
      rules[i].style.display = "none";
    }
  }
  var pt = document.getElementById("yetListIndicator");
  pt.parentNode.insertBefore(pt, document.getElementById("showYetList"));
}

function showAllList(){
  var rules = document.styleSheets[0].cssRules;
  for(var i = 0; i < rules.length; i++){
    var sel = rules[i].selectorText;
    if(!sel) continue;
    if(sel.match(pm.CssRegExp.YKoto)){
      rules[i].style.display = "inline";
    } else if (sel.match(pm.CssRegExp.NKoto)){
      rules[i].style.display = "inline";
    }
  }
  var pt = document.getElementById("yetListIndicator");
  pt.parentNode.insertBefore(pt, document.getElementById("showAllList"));
}
//// process All
function processAll(){
  var maru = 0;
  var batu = 0;
  var none = 0;
  // get kotosv
  var xpath = "//div[@class='kotowrapper']/span";
  var res = doceval(xpath, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);

  //// begin pref = allCountEnabled
  if(pm.prefs["allCountEnabled"] == true){
    // count my answers
    for(var i = 0; i < res.snapshotLength; i++){
      switch(res.snapshotItem(i).getAttribute('class')){
      case 'koto_0':
        none++;
        break;
      case 'koto_1':
        maru++;
        break;
      case 'koto_2':
        batu++;
        break;
      }
    }
    // insert result
    xpath ="//div[@id='contents']/div/p";
    res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    res.innerHTML += '(' + pm.dm.AllKoto_Yes + maru + pm.dm.AllKoto_No + batu + pm.dm.AllKoto_NA + none + ')';
  }
  //// end pref = allCountEnabled

  //// begin pref = notyetEnabled
  // switch style sheet: unanswered
  if(pm.prefs["notyetEnabled"] == true){
    xpath ="//div[@id='contents']/div/p";
    res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    res.innerHTML += '<br/>' + pm.dm.YetList_Label + '<span id="yetListIndicator"><img src="' + pm.ImageSrc.Pt_Red + '" alt="*" />&nbsp;</span><a href="javascript:;" id="showAllList">' + pm.dm.YetList_BeAllList + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="showYetList">' + pm.dm.YetList_BeYetList + '</a>';
    document.getElementById("showAllList").addEventListener("click", showAllList, true);
    document.getElementById("showYetList").addEventListener("click", showYetList, true);
  }
  //// end pref = notyetEnabled
}
//// Page Type: hot|pop ////
//// sorting
function hotpopSortAbc(){
  hotpopSort(newSorter, "hotpopSortIndicator", "hotpopSortAbc");
}
function hotpopSortYesno(){
  hotpopSort(yesnoSorter, "hotpopSortIndicator", "hotpopSortYesno");
}
function hotpopSort(sorter, pointerId, selectedId){
  kotolistSort(sorter, "//div[@class='kotowrapper']/span", pointerId, selectedId);
}
//// process hotpop
function processHotpop(){
  xpath = "//div[@id='contents']/div[@class='contents_inner']/div[@class='kotowrapper']";
  var kotowrapper = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  if(!kotowrapper) return;
  // div clear
  var div = document.createElement("div");
  div.setAttribute("class", "clear");
  kotowrapper.parentNode.insertBefore(div, kotowrapper);
  // sorter
  var p = document.createElement("p");
  p.setAttribute("class", "sort");
  p.innerHTML += pm.dm.Sort_Label + '<span id="hotpopSortIndicator"><img src="' + pm.ImageSrc.Pt_Orange + '" alt="*" />&nbsp;</span><a href="javascript:;" id="hotpopSortAbc">' + pm.dm.Sort_Abc + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="hotpopSortYesno">' + pm.dm.Sort_Yesno + '</a>';
  kotowrapper.parentNode.insertBefore(p, div);
  document.getElementById("hotpopSortAbc").addEventListener("click", hotpopSortAbc, true);
  document.getElementById("hotpopSortYesno").addEventListener("click", hotpopSortYesno, true);
  // number them
  res = doceval("//div[@class='kotowrapper']/span", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  var kotos = res.snapshotLength;
  for(var i=0; i<kotos; i++){
    var item = res.snapshotItem(i);
    //      GM_log("item: " + i + " " + res.snapshotItem(i).innerHTML);
    item.setAttribute("kt_no", i);
    var title = item.firstChild.getAttribute("title");
    var count = parseInt(title.substring(title.lastIndexOf('(') + 1, title.length - 1));
    item.setAttribute("kt_yesno", count);
  }
}


//// Page Type: koto ////
//// sorting
function usersSortNew(){
  usersSort(newSorter, "usersSortIndicator", "usersSortNew");
}
function usersSortYesno(){
  usersSort(yesnoSorter, "usersSortIndicator", "usersSortYesno");
}
function usersSort(sorter, pointerId, selectedId){
  listSort(sorter, "//dl[@id='answeredusers']/dd/div", pointerId, selectedId);
}

//// processing
function processKoto(){
  //// begin pref = yesnoEnabled
  //// display number of users answered ////
  if(pm.prefs["yesnoEnabled"] == true) {
    var yesno = getYesNoCount();
    res = doceval("//dl[@id='answeredusers']/dt", XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    var p = document.createElement("span");
    p.setAttribute("class", "sort");
//    p.innerHTML += '(' + (yesno["yes"] + yesno["no"]) + ') ';
    p.innerHTML += pm.dm.Sort_Label + '<span id="usersSortIndicator"><img src="' + pm.ImageSrc.Pt_Orange + '" alt="*" />&nbsp;</span><a href="javascript:;" id="usersSortNew">' + pm.dm.Sort_New + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="usersSortYesno">' + pm.dm.Sort_Yesno + '</a>';
    res.parentNode.insertBefore(p, res);//appendChild(p);
    document.getElementById("usersSortNew").addEventListener("click", usersSortNew, true);
    document.getElementById("usersSortYesno").addEventListener("click", usersSortYesno, true);
    // number them
    res = doceval("//dl[@id='answeredusers']/dd/div[@class='userbox']", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var atext = doceval("//dl[@id='answeredusers']/dd/div[@class='userbox']/p/a/text()", XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
    var users = res.snapshotLength;
    for(var i=0; i<users; i++){
      var item = res.snapshotItem(i);
//      GM_log("item: " + i + " " + res.snapshotItem(i).innerHTML);
      item.setAttribute("kt_no", i);
      var code = atext.snapshotItem(i).nodeValue.charCodeAt(0);
      if(pm.CharCode.Yes == code){
        item.setAttribute("kt_yesno", pm.UserSort.YesValue);
      } else if(pm.CharCode.No == code) {
        item.setAttribute("kt_yesno", pm.UserSort.NoValue);
      }
    }
    // br div
    res = doceval("//dl[@id='answeredusers']/dd", XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    res.innerHTML += '<div id="brbox" class="clear"></div>';
    var brbox = document.getElementById("brbox");
    brbox.setAttribute("kt_no", users);
    brbox.setAttribute("kt_yesno", pm.UserSort.BrValue);
  }
  
  //// end pref = yesnoEnabled

  // check for google searcher
  xpath = "//dl[@id='googlesearch']/dd/ul";
  res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  if(res != null){
    //// begin pref = postListEnabled
    if(pm.prefs["postListEnabled"] == true){
      var kotolist = pm.getMyPostedKotolist();
      //// event listeners
      function cacherClicked(event){
        var elem = event.target;
        if(elem.innerHTML == pm.dm.Cache_Delete){
          kotolist[koto_id.toString()] = null;
          pm.setMyPostedKotolist(kotolist);
          elem.innerHTML = pm.dm.Cache_Cache;
        } else {
          kotolist[koto_id.toString()] = new Array(koto_id, 'koto_' + done_flag, yesno['all'], koto_name + '(' + yesno['all'] + ')');
          pm.setMyPostedKotolist(kotolist);
          elem.innerHTML = pm.dm.Cache_Delete;
        }
      }
      function markerClicked(event){
        pm.setKotomark(koto_id);
        event.target.innerHTML = pm.dm.Kotomark_Ed;
        document.getElementById("kt_kotomark").setAttribute("href", "/no/" + koto_id);
      }
      // link for add cache/delete cache
      // prepare inner that adds/deletes koto from cache
      var inner = '<li><img src="' + pm.ImageSrc.PtBox_Red + '" align="middle" alt="*" />&nbsp;<a id="kt_cacher" href="javascript:;">';
      if(kotolist[koto_id.toString()] != null){
        inner += pm.dm.Cache_Delete + '</a></li>\n';
      }else{
        inner += pm.dm.Cache_Cache + '</a></li>\n';
      }
      // add it
      res.innerHTML += inner;
    }
    //// end pref = postListEnabled
    
    //// begin pref = kotomarkEnabled
    if(pm.prefs["kotomarkEnabled"] == true){
      inner = '<li><img src="' + pm.ImageSrc.PtBox_Red + '" align="middle" alt="*" />&nbsp;<a id="kt_marker" href="javascript:;">';
      if(kotomark == koto_id) {
        inner += pm.dm.Kotomark_Ed;
      } else {
        inner += pm.dm.Kotomark;
      }
      inner += '</a></li>\n';
      res.innerHTML += inner;
    }
    //// end pref = kotomarkEnabled

    // the event handler for cacher will get screwed up
    // after the marker has been added
    // so we add the handlers here
    var cacher = document.getElementById("kt_cacher");
    if(cacher) cacher.addEventListener("click", cacherClicked, false);
    var marker = document.getElementById("kt_marker");
    if(marker) marker.addEventListener("click", markerClicked, false);
  }

  //// begin pref = shortcutEnabled
  document.addEventListener('keypress', kt_hotkey, true);
  //// end pref = shortcutEnabled
}
//// hotkey ////
// click simulator
// should use unsafeWindow
function kt_click(elem){
  var event = document.createEvent("MouseEvents");
  event.initEvent("click", true, false);
  elem.dispatchEvent(event);
}

function kt_hotkey(e){
  if(e.altKey){
    switch(e.which){
    case pm.HotKey.Yes:
      kt_click(document.getElementById("maru"));
      break;
      case pm.HotKey.No:
//      set_done_flag(2);
      kt_click(document.getElementById("batsu"));
      break;
    case pm.HotKey.Cancel:
      //set_done_flag(0);
      xpath = "//div[@id='answered_block']/p/span[@class='flag0']";
      res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
      if(res) kt_click(res);
      break;
    case pm.HotKey.Forward:
      location.href = '/no/' + (koto_id + 1);
      break;
    case pm.HotKey.Backward:
      location.href = '/no/' + (koto_id - 1);
      break;
    case pm.HotKey.SkipForward:
      location.href = '/no/' + (koto_id + 3);
      break;
    case pm.HotKey.SkipBackward:
      location.href = '/no/' + (koto_id - 3);
      break;
    case pm.HotKey.Comment:
      document.getElementById('comment').focus();
      break;
    case pm.HotKey.Ok:
      xpath = "//input[@type='submit']";
      // should use unsafeWindow['set_done_flag']
      res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
      if(res) kt_click(res);
      break;
    }
    e.preventDefault();
  }
}
//// Page Type: home ////
//// limits
function postlistSetLimit20() { postlistSetLimit(20, "postlistSetLimit20"); }
function postlistSetLimit60() { postlistSetLimit(60, "postlistSetLimit60"); }
function postlistSetLimit200() { postlistSetLimit(200, "postlistSetLimit200"); }
function postlistSetLimitNone() { postlistSetLimit(NaN, "postlistSetLimitNone"); }
function postlistSetLimit(limit, selectedId) {
  xpath = "//dl[@id='postedkoto']/dd";
  var kotodd = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;

  pm.setPostlistLimit(limit); 
  homeOverridePostlist(kotodd);
  updateSortIndicator("postlistLimitIndicator", selectedId);
}
//// sorting
function postlistNewSorter()  { return "" }
function postlistYesnoSorter(){ return function(a, b){ return parseInt(b[2]) - parseInt(a[2]);} }
function postlistSortNew()  { postlistSort(postlistNewSorter(), "postlistSortNew"); }
function postlistSortYesno(){ postlistSort(postlistYesnoSorter(), "postlistSortYesno"); }

function postlistSort(sorter, selectedId){
  xpath = "//dl[@id='postedkoto']/dd";
  var kotodd = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
  if (null != sorter) kotodd.setAttribute("sorter", sorter);

  homeOverridePostlist(kotodd);
  updateSortIndicator("postlistSortIndicator", selectedId);
}
function homeOverridePostlist(kotodd){
  kotolist = pm.getMyPostedKotolist();
  var yesnoMax = 0;
  var yesnoMin = Infinity;
  kotos = new Array; for(id in kotolist){ count = parseInt(kotolist[id][2]); yesnoMax = Math.max(yesnoMax, count); yesnoMin = Math.min(yesnoMin, count); kotos.push(kotolist[id]); }
  var fontSizeMax = 15;
  var fontSizeMin = 11;
  var param = guessFontParams(fontSizeMax, fontSizeMin, yesnoMax, yesnoMin);

  var spans = [];
  var limit = pm.getPostlistLimit();
  max = (NaN != limit && limit < kotos.length) ? limit : kotos.length;
  sorter = eval(kotodd.getAttribute("sorter"))
  if ("function" == typeof(sorter)) kotos.sort(sorter);
  for(var i = 0; i < max; i++){
    var koto = kotos[i];
    spans.push('<span style="font-size: ' + yesno2fontsize(koto[2], param.a, param.b) + 'px;" class="' + koto[1] + '" kt_no="' + i + '" kt_yesno="' + koto[2] + '"><a href="/no/' + koto[0] + '">' + koto[3] + '</a></span>\n');
  }
  kotodd.innerHTML = spans.join('&nbsp;<img src="' + pm.ImageSrc.Separator + '" alt="/" />&nbsp;');
  // cache
  homeAppendMore(kotodd, kotos.length);
}
// stripped out for use in sorting
function homeAppendMore(kotodd, count){
  // add link to clear cache
  kotodd.innerHTML += '<p class="more"><img src="' + pm.ImageSrc.Pt_Orange + '" alt ="&raquo;" align="middle" />&nbsp;<a href="javascript:;" id="clearCache">' + pm.dm.Cache_Clear + ' (' + count + ')</a></p>\n';
  document.getElementById("clearCache").addEventListener("click", function(event){
    pm.setMyPostedKotolist(new Array());
    event.target.innerHTML = pm.dm.Cache_Clear + ' (0)';
  }, true);
}
// processing
function processHome(){
  //// begin pref = postListEnabled
  if(pm.prefs["postListEnabled"] == true){
    // check for user posted kotolist
    xpath = "//dl[@id='postedkoto']/dd";
    res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    var kotodd = res;
    
    // if the user has
    if(kotodd){
      xpath = "//dl[@id='postedkoto']/dd/span/a";
      res = doceval(xpath, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
      
      // get user's kotolist
      var kotolist = pm.getMyPostedKotolist();
      // update
      var newlist = new Array();
      // iterate the current list
      for (var i = 0; i < res.snapshotLength; i++){
        var a = res.snapshotItem(i);
        var span = a.parentNode;
        var id = a.getAttribute('href').split('/').pop();
        var title = a.innerHTML;
        var count = parseInt(title.substring(title.lastIndexOf('(') + 1, title.length - 1));
//        GM_log("" + count);
        var yesno = span.className;
        var sid = id.toString();
        newlist[sid] = new Array(id,yesno,count,title);
        // kotonoha displays only recent 20 koto
        // mark them by removing them from the saved kotolist
        if(kotolist[sid] != null) kotolist[sid] = null;
      }
      // add old ones = still left ones in the kotolist
      for(id in kotolist){
        var koto = kotolist[id];
        if(koto != null){
          newlist.push(koto);
        }
      }
      // save kotolist
      pm.setMyPostedKotolist(newlist);

      // sorting
      var p = document.createElement("p");
      p.setAttribute("class", "sort");
      p.innerHTML += pm.dm.Sort_Label + '<span id="postlistSortIndicator"><img src="' + pm.ImageSrc.Pt_Red + '" alt="*" />&nbsp;</span><a href="javascript:;" id="postlistSortNew">' + pm.dm.Sort_New + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="postlistSortYesno">' + pm.dm.Sort_Yesno + '</a>' + "\n";
      // limit
      p.innerHTML += '<br style="margin: 0pt;" />' + pm.dm.Limit_Label + '<span id="postlistLimitIndicator"><img src="' + pm.ImageSrc.Pt_Red + '" alt="*" />&nbsp;</span><a href="javascript:;" id="postlistSetLimit20">' + pm.dm.Limit_20 + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="postlistSetLimit60">' + pm.dm.Limit_60 + '</a>&nbsp;|&nbsp;<a href="javascript:;" id="postlistSetLimit200">' + pm.dm.Limit_200 + '</a>&nbsp;|&nbsp<a href="javascript:;" id="postlistSetLimitNone">' + pm.dm.Limit_None + '</a>' + "\n";
      // dump
      var div = document.createElement("div");
      div.setAttribute("class", "clear");
      kotodd.parentNode.insertBefore(div, kotodd);
      kotodd.parentNode.insertBefore(p, div);
      //  set event limit
      actionIds = ["postlistSetLimit20", "postlistSetLimit60", "postlistSetLimit200", "postlistSetLimitNone","postlistSortNew", "postlistSortYesno"];
      for(var i in actionIds){
        document.getElementById(actionIds[i]).addEventListener("click", eval(actionIds[i]), true);
      }
      // initialize
      pm.setPostlistLimit(20);
      updateSortIndicator("postlistLimitIndicator", "postlistSetLimit" + pm.getPostlistLimit());
      postlistSortNew();
      
    }
  }
  //// end pref = postListEnabled
}
//// Page Type: setup
// utilities

function makeCheckbox(parent, title, id){
  var check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.setAttribute("value", "true");
  if(pm.prefs[id] == true) check.setAttribute("checked", true);
  check.setAttribute("id", id);
  check.addEventListener("click", function(event){
    var elem = event.target;
    var bool = elem.checked;
    pm.setUserPref(elem.getAttribute("id"), bool);
  }, true);
  parent.appendChild(check);
  var label = document.createElement("label");
  label.setAttribute("for", id);
  label.innerHTML = title;
  parent.appendChild(label);
}
// processing
function processSetup(){
  var setup = document.getElementById("setup");
  //// checkboxes
  // dt: term
  var dt = document.createElement("dt");
  dt.innerHTML = pm.dm.SetupTitle_Checks;
  setup.appendChild(dt);
  
  // dd: definition
  var dd = document.createElement("dd");
  setup.appendChild(dd);
  var ul = document.createElement("ul");
  dd.appendChild(ul);
  // populate
  settings = pm.DefaultUserPrefs;
  for(var key in settings){
    var li = document.createElement("li");
    makeCheckbox(li, pm.dm.Setup_CheckLabels[key][0], key);
    ul.appendChild(li);
  }

  // link: set to default
  var div = document.createElement("div");
  div.innerHTML += '<p style="padding: 0; margin: 4px 0 0 0; text-align: left;"><img src="' + pm.ImageSrc.Pt_Orange + '" align="middle" alt="&raquo;" />&nbsp;<a href="javascript:;" title="revert to default" id="kt_set_default">' + pm.dm.Setup_CheckUseDefault + '</a></p>';
  dd.appendChild(div);
  document.getElementById("kt_set_default").addEventListener("click", function(event){
    pm.setUserPrefs(new Array());
    window.location.reload();
  }, true);

  //// locking
  dt = document.createElement("dt");
  dt.innerHTML = pm.dm.SetupTitle_Lock;
  setup.appendChild(dt);
  // dd: definition
  dd = document.createElement("dd");
  setup.appendChild(dd);
  var span = document.createElement("span");
  dd.appendChild(span);
  // num of lock, submit button
  var inner = '<p class="formsubmit">\n';
  inner += '  <input type="text" id="locks" name="locks" size="2" />&nbsp;\n';
  inner += '  <label for="locks">' + pm.dm.Setup_Locks + '</label>&nbsp;\n';
  inner += '  <input id="doLock" type="submit" value="' + pm.dm.Setup_LockSubmit + '" style="display: inline;"/>\n';
  inner += '  <p><input id="saveLocksAsDefault" type="checkbox" checked/>\n';
  inner += '  <label for="saveLocksAsDefault">' + pm.dm.Setup_LockSaveAsDefault +'</label></p>\n';
  inner += '</p>';
  span.innerHTML = inner;
  // event listeners
  // history.previous is protected. use "/" instead
  document.getElementById("locks").value = pm.getDefaultLocks() + "";
  document.getElementById("doLock").addEventListener("click", function(event){
    var locks = parseInt(document.getElementById("locks").value);
    pm.setLocked(locks);
    if(document.getElementById("saveLocksAsDefault").checked){
      pm.setDefaultLocks(locks);
    }
    location.href = "/";
  }, true);
}

//// End Page specific operations ////

//// Begin Utilities ////
//// variable retrieval ////
// get the user name
function getUName(){
  var uname = unsafeWindow["uname"];
  if(uname){
    return uname;
  } else {
    var xpath = "//ul/li/a[text()='Your kotolist']";
    var res = doceval(xpath, XPathResult.FIRST_ORDERED_NODE_TYPE).singleNodeValue;
    return res ? res.getAttribute('href').split("/").pop() : null;
  }
}

// get the koto id
function getKotoNo(){
  var koto_id = unsafeWindow["koto_id"];
  if(koto_id != null){
    return koto_id;
  }else{
    location.pathname.match(/no\/(\d+)/);
    return parseInt(RegExp.lastParen);
  }
}
function getKotoId(){ return getKotoNo(); }
// get koto name
function getKotoName(){
  var koto_name = unsafeWindow["koto_name"];
  if(koto_name != null){
    return koto_name;
  }else{
    return document.title.substring(7);
  }
}
// get done_flag
function getDoneFlag(){
  var done_flag = unsafeWindow["done_flag"];
  if(done_flag != null) { return done_flag; }
  else{
    var page = getPageType();
    if(("no" == page) || ("id" == page)){
      if(document.getElementById("maru").firstChild.getAttribute("src") == pm.ImageSrc.Maru){
        return 1;
      } else if (document.getElementById("batsu").firstChild.getAttribute("src") == pm.ImageSrc.Batsu){
        return 2;
      }
    } else { return 0;}
  }
}
// returns home | user | no | all | id | etc.
function getPageType(){
  var paths = location.pathname.split('/');
  paths.shift();
  return paths.shift();
}

//// koto information ////
// we are looking at a koto page
// returns the number of users answered to the koto
function getAnsweredCount(){
  xpath = "count(//dl[@id='answeredusers']/dd/div[@class='users'])";
  return doceval(xpath,XPathResult.ANY_TYPE).numberValue;
}
// get the number of users answered yes or no
// retval["yes"], retval["no"], retval["all"]
function getYesNoCount(){
  xpath = "//dl[@id='answeredusers']/dd/div/p/a/text()";
  res = doceval(xpath, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);
  var dict = new Array;
  dict["yes"] = 0;
  dict["no"] = 0;
  for(var i = 0; i < res.snapshotLength; i++){
    var code = res.snapshotItem(i).nodeValue.charCodeAt(0);
    if(code == pm.CharCode.Yes) {
      dict["yes"] = dict["yes"] + 1;
    } else if(code == pm.CharCode.No) {
      dict["no"] = dict["no"] + 1;
    }
  }
  dict["all"] = dict["yes"] + dict["no"];
  return dict;
}
//// misc ////
// alias document.evaluate
function doceval(xpath, type){
  return document.evaluate(xpath, document, null, type, null);
}
// sorting
// the * sankaku
function updateSortIndicator(pointerId, selectedId){
  var pt = document.getElementById(pointerId);
  pt.parentNode.insertBefore(pt, document.getElementById(selectedId));
}
// normal sort
function listSort(sorter, nodeXPath, pointerId, selectedId){
  // nodeXPath ex: "//dl[@id='answeredusers']/dd/div"
  var res = doceval(nodeXPath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  var length = res.snapshotLength;
  if(length < 2) return;
  var temp = new Array(length);
  var parent = res.snapshotItem(0).parentNode;
  for(var i=0; i<length; i++){
    temp[i] = res.snapshotItem(i);
  }
  temp.sort(sorter);
  for(var i=length-2; i>=0; i--){
    parent.insertBefore(temp[i], temp[i+1]);
  }
  // poitner display feedback
  updateSortIndicator(pointerId, selectedId);
}
// inserts separator
function kotolistSort(sorter, kotoXPath, pointerId, selectedId){
  // sorter: newSorter | yesnoSorter
  // kotoXPath ex: "//dl[@id='postedkoto']/dd/span"
  var res = doceval(kotoXPath, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
  var length = res.snapshotLength;
  if(length < 2) return;
  var temp = new Array(length);
  var parent = res.snapshotItem(0).parentNode;
  for(var i=0; i<length; i++){
    temp[i] = res.snapshotItem(i);
  }
  temp.sort(sorter);
  parent.innerHTML = "";
  var inner = "";
  parent.appendChild(temp[0]);
  for(var i=1; i<length; i++){
    parent.appendChild(document.createTextNode(" "));
    var img = document.createElement("img");
    img.setAttribute("src", pm.ImageSrc.Separator);
    img.setAttribute("alt", "/");
    parent.appendChild(img);
    parent.appendChild(document.createTextNode(" "));
    parent.appendChild(temp[i]);
  }
  // pointer display feedback
  updateSortIndicator(pointerId, selectedId);
}
// sort by .firstChild.innerHtml
function abcSorter(a, b){
  var aAbc = a.firstChild.innerHtml;
  var bAbc = b.firstChild.innerHtml
  if(aAbc == bAbc){
    // revert to sort-new
    return 0;
  } else {
    return bAbc < aAbc ? -1 : 1;
  }
}
// sort by .getAttribute("kt_yesno")
// when equal, revert to .getAttribute("kt_no")
function yesnoSorter(a, b){
  var aYesno = parseInt(a.getAttribute("kt_yesno"));
  var bYesno = parseInt(b.getAttribute("kt_yesno"));
  if(aYesno == bYesno){
    // revert to sort-new
    return (parseInt(a.getAttribute("kt_no")) - parseInt(b.getAttribute("kt_no")));
  } else {
    return (bYesno - aYesno);
  }
}
// sort by .getAttribute("kt_no")
function newSorter(a, b){
  return(parseInt(a.getAttribute("kt_no")) - parseInt(b.getAttribute("kt_no")));
}

//// fontsize
// dirty..
function guessFontParams(sizeMax, sizeMin, countMax, countMin){
  var a = (sizeMax - sizeMin) / (countMax - countMin);
  var b = (sizeMax - a * countMax);
  return {'a' : a, 'b' : b}
}

function yesno2fontsize(yesno, a, b){
  return a * yesno + b;
}