// ==UserScript==
// @name        eSix Extend
// @description Adds several functions to e621 (and similar sites).
// @namespace   com.xch3l.userscripts
// @version     2.87 (010414)
// @include     *://e621.net/*
// @include     *://e926.net/*
// @include     *://twentypercentcooler.net/*
// @include     *://gallery.agn.ph/*
// @include     *://beta.ouroboros.ws/*
// @downloadURL https://googledrive.com/host/0BxuaxlGgDz8TTHV6dW9ESUNqdkk/files/eSix_Extend.user.js
// @grant       none
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAARuAAAEbgHQo7JoAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAy1JREFUeNrtVl1IU2EYXv9g0g8UkdvSQiIKokBQoshAKQOhm9XO1IoKIy8isYx5o4V20UXlRdJy5wxNE/9LLSlRUTF1WBNNUadzOV22XMrc35l53r4zx0GPxzpTWwS+8FycD87zPN/7ve/3fgLB/xyuoYJQchCP+TfiutyrtrqzlLUmEkgtcdCn4tPGmtP2+mjK+v4U0HB2PSj1mTgAbELoAqBg2lAB1toocHxM7vWlATnMRiNC+YylHxwaucGXBrQIzQhbEI7RTiin+Y2vxNcjCOd8+yFIEaL+mug+iWJrkFQVxAeCtLS1K73nNSIZrhZhOPADcY3NQJLmQ9P6wiRy6CXmGi4JMXUX+fOWF2LKS/zFcRBi+FhwTB5dGxsQVAjf6BqZsQyArf6cu2VRx+h5ie+UPPVHpEZvDHjw0FMfxxHuI6QijDg7Ut0GyJ5HVbwMiKV4xhLEaZCiWGXwnEKls9Hn0KSArS1hAkzdfz6CwLjsvYjIySbffzkHUogPUNTQDxUtOrj3ohWOXM/nOorXcwwk0Mdgb0/8AROabbx2j0hK2KQRyWUwaJwEdgybLBCeVLLARICMiPAYOIrQZjG27+ApTpxkkwXFqkA7Oiv+SWuCG5l1EP+4Fjp14+41dd8Y11F0CSRF6zwmNvIre9TH6McONtmd501uIdL1E8JuFjLrZ+SvmExE3i1fYEKMKRO86nqRjIjnKiz6zOkwmq1Q1ToELT1fQTsyAWaLgzGAZVRzZWF8jyxrO/++l+IqLgONnSOM0AxFwfdJO3zWm6FOY4CC+j7ILNPMy8w8SIlQ3gYCpIQY3Xw2NonqXbdbfAAVIV0PXrRksdeXLzKQxia6kP6WyYAcb2bWD1zJhSRF02LiDvd88DYCohV+6OdhNmG1Ws+YUPeOwbv2L0wN3Mpq4LgLlOlLHkFijMC4WvFZZSdM2V2MEYNpCipbdRB+u5RtYHRXXO7mZc1BRNLMlVqxDIcTicVwOD5/8aEkwy8uexCjWRCCyKglzII2eoyvyGtgsbb8DShhTHbYij1HAmMVuxHplBcG8lb8SYYm23k0H57wgiRHKFiN1fAyfgEWvs7zmo/rrQAAAABJRU5ErkJggg==
// ==/UserScript==

// Created:  03/09/12 11:23Pm
// Modified: 01/04/14  4:25Pm

(function() {

  var sitename  = null, // Name to display on the top of the page
  cookies   = parseCookies(), // GET ALL THE COOKIES!
  pageQuery = parseQuery(), // Get the current page's query string
  loc       = window.location.pathname.split("/"), // Split the path part of the URL for easier lookup
  agnph     = false, // Are we on AGNPH?
  defset    = {"version":"010414", "saveVersion":140401, "fixedUserBar":false, "singleline":false, "allfaves":false, "showdmails":false, "hiliteur":true, "hilitebc":true, "unixLE":false, "submitOnCtrlEnter":false, "enhanceNoticeError":true, "tinyPrefix":"ta_", "tinyAlias":[], "checkInterval":30, "checkOnPosts":true, "uselog":false, "floatinglog":true, "poolPrevKey":86, "poolNextKey":78}, // Default settings. Also used to check save versions.
  settings  = (window.localStorage.settings?eval("/*eSixExtend Settings*/\n"+window.localStorage.settings):defset), // Settings
  date      = new Date().getTime(), // Current time (as milliseconds) since the page loaded
  userslist = null, // List of all users renectly PM'd
  isChrome  = /Chrome/gi.test(navigator.userAgent); // Check if the current browser is Google Chrome or Chromium based

  // Convert old pool format to the new one
  if(window.localStorage.poolLastID) {
    notice("Old pool format detected. Converting...");
    query("/pool/show.json?id="+window.localStorage.poolLastID, "GET", function(j, x, t) {
      var posts = window.localStorage.poolPosts.split(",");
      window.localStorage.poolSubscriptions = '[{"id":'+j.id+',"name":"'+j.name+'","posts":['+posts+'],"last":'+posts[0]+'}]';
      window.localStorage.removeItem("poolLastID");
      window.localStorage.removeItem("poolPosts");
      notice("Conversion to new pool format completed.");
    }, "getApool");
  }

  if(!window.localStorage.subscriptionsNextCheck)
    window.localStorage.subscriptionsNextCheck = date+((settings.checkInterval || defset.checkInterval)*60000);

  // Set custom links (used from this version onwards
  if(!window.localStorage.ubLinks) {
    window.localStorage.ubLinks = '[{"title":"Replies to your comments", "url":"/comment/search?query=[userNM]"},{"title":"Comments on your posts", "url":"/comment?poster_id=[userID]"},{"title":"Upload", "url":"/post/upload"}]';
  }

  // TinyAliases
  var TinyAlias = (settings.tinyAlias?settings.tinyAlias:[]);
  TinyAlias.find = function(name) {
    for(var i=0; i<this.length; i++) {
      if(name == this[i].name) {
        var t = this[i];
        t.i = i;
        return t;
      }
    }
    return null;
  };
  TinyAlias.toString = function() {
    var r = [];
    for(var i=0; i<this.length; i++) {
      var t = this[i];
      r.push('{"name":"'+t.name+'", "tags":"'+t.tags+'"}');
    }
    return "["+r+"]";
  };

  // Find an item inside an array
  Array.prototype.findItem = function(what) {
    var whatIs = (typeof what);

    for(var index = 0, element; index < this.length, element = this[index]; index++) {
      if(whatIs == "function")
        if(what(element) == true) return index;
      else
      if(element == what) return index;
    }

    return -1;
  };

  // Write LOC information
  if(settings.uselog == true) {
    var locdiv = createElement("div", {innerHTML:"Loc: "}, document.body);
    for(var i=1; i<loc.length; i++) {
      createElement("span", {style:{display:"inline-block", backgroundColor:"#FFF", color:"#000", borderRadius:"4px", padding:"2px", marginRight:"4px"}, innerHTML:loc[i], title:"loc["+i+"]"}, locdiv);
    }

    createElement("p", {innerHTML:new Date(date)}, locdiv);
  }

  if(cookies.login && (window.location.hash != "#eSixExtendSettings" && (date>(window.localStorage.nextAlert||0))) || (loc[1] == "forum" && loc[3] == "66904")) {
    if(!window.localStorage.settings) {
      var fp = createFloatingPanel(null, null);
      fp.parentNode.style.position = "fixed";
      fp.innerHTML = "<h3 class='panelTitle'>Hi new user!</h3>"+
        "<div class='centerpadded'><p>Thank you for downloading this UserScript (called \"eSix Extend\"). I hope you find it useful!</p>"+
        "<h6>Would you like to check the settings page and set up?</h6><br/>"+
        "<input type='button' value='Yes' id='ee_okay' style='margin-right:1em;' />"+
        "<input type='button' value='No' id='ee_cancel' /></div>";
      document.getElementById("ee_okay").addEventListener("click", function() {
        window.localStorage.nextAlert = date+600000;
        window.location.assign("/user/edit#eSixExtendSettings");
      }, true);
      document.getElementById("ee_cancel").addEventListener("click", function() {
        window.localStorage.nextAlert = date+600000;
        fp.center();
        fp.innerHTML = "<h5>This message will be shown again in 10 minutes</h5><br/>"+
          "<input type='checkbox' id='ee_lolno' /><label for='ee_lolno'>lolnope (or &quot;Don't show this again&quot; :) )</label>";
        window.setTimeout(function(){
          var lolno = document.getElementById("ee_lolno").checked;
          hidePanels();
          if(lolno == true) window.localStorage.nextAlert = date*600000;
        }, 5000);
      }, true);
    } else
    if(settings.saveVersion < defset.saveVersion && parseInt("0"+window.localStorage.alertedVersion) < defset.saveVersion) {
      var fp = createFloatingPanel(null, null);
      fp.parentNode.style.position = "fixed";
      fp.innerHTML = "<h3 class='panelTitle'>Your settings are outdated!</h3>"+
        "<div class='centerpadded'><p>Your settings version is <span class='redtext'>"+(settings.saveVersion?""+settings.saveVersion+" ":"[older]")+"</span>, while the newest is <span class='greentext'>"+defset.saveVersion+"</span>.</p>"+
        "<p>This means that there are new changes on the preferences page (options were added/removed)</p>"+
        "<p>Check <a href='https://e621.net/forum/show/66904'>forum #66904</a> for the update log.</p>"+
        "<h6>Would you like to go to your settings and update them?</h6><br/>"+
        "<input type='button' value='Yes' id='ee_okay' style='margin-right:1em;' />"+
        "<input type='button' value='No' id='ee_cancel' /></div>";
      document.getElementById("ee_okay").addEventListener("click", function() {
        window.localStorage.nextAlert = date+600000;
        window.location.assign("/user/edit#eSixExtendSettings");
      }, true);
      document.getElementById("ee_cancel").addEventListener("click", function() {
        window.localStorage.nextAlert = date+600000;
        fp.center();
        fp.innerHTML = "<h5>This message will be shown again in 10 minutes</h5><br/>"+
          "<input type='checkbox' id='ee_lolno' /><label for='ee_lolno'>lolnope (or &quot;Don't show this again&quot; :) )</label>";
        window.setTimeout(function(){
          var lolno = document.getElementById("ee_lolno").checked;
          hidePanels();
          if(lolno == true) window.localStorage.nextAlert = date*600000;
        }, 5000);
      }, true);
    }
  }

  // Check where are we and set the title according to it //
  switch(window.location.hostname) {
    case "e621.net": sitename="e621"; break; // We're on e621
    case "e926.net": sitename="e926"; break; // or on e926? (SFW Version of e621)
    case "twentypercentcooler.net": sitename="20% Cooler"; break; // Yay ponies!!
    case "gallery.agn.ph": sitename="AGNPH"; agnph=true; break; // Poképorn!
    case "beta.ouroboros.ws": sitename="Ouroboros"; agnph=2; break; // Ooh! Betas!
  }

  var linkColor = "currentColor", bg = "";
  var ss = document.styleSheets;
  for(var i=0; i<ss.length; i++) {
    var h = ss[i].href;
    if(/hexagon\.css/.test(h)) {
      linkColor = ss[i].cssRules[22].style.color;
      bg = ss[i].cssRules[1].style.background;
    }

    if(/(?:skin-pony|skin-bloodlust|skin-serpent)\.css/.test(h)) {
      linkColor = ss[i].cssRules[2].style.color;
      bg = ss[i].cssRules[1].style.background;
    }
  }

  // Write a CSS for this UserScript //
  var css = createElement("style", {type:"text/css", id:"eSixExtend_CSS", innerHTML:
    // eSix's CSS fixes
    "div.response-list {padding-bottom:0.25em !important;} "+
    "div.response-list > div.comment {border-top:1px solid rgba(255, 255, 255, 0.5); margin-top:8px !important; margin-bottom:8px !important; padding-top:4px !important; display:block; word-wrap:break-word; position:relative;} "+
    "div.response-list div.footer {position:absolute; bottom:4px;} "+
    "div.response-list > div.comment > div.author {text-align:right;} "+
    "span.thumb img.preview {border-bottom-left-radius:0px !important; border-bottom-right-radius:0px !important;} "+
    "#edit-box {background-color:#284A81 !important; border:none !important; border-radius:4px; box-shadow:2px 2px 5px #07162D; margin-bottom:10px; padding:10px;} "+
    "#edit-box input[type='submit'] {margin-right:1ex;} "+
    "textarea {font-family:Tahoma, Geneva, Sans-Serif; font-size:1em; width:90%; min-height:100px;} "+
    ".small {font-size:10px;} "+
    ".link {color:"+linkColor+"; cursor:pointer} "+
    "divcontent div.content {width:90% !important;} "+
    "tr div.sourcelink-url-history, tr div.sourcelink-url-history:hover {overflow: visible !important; height:auto !important; background:none !important; border:none !important; box-shadow:none !important;}"+

    // Common Extend's CSS
    ".userStatus {display:block; vertical-align:middle; position:"+(settings.fixedUserBar?"fixed":"absolute")+"; right:0px; top:0px; padding:4px 4px 0px 4px; border-radius:0px 0px 0px 6px; z-index:10} "+
    ".notifTag {margin-left:4px; padding:4px;} .userTag {font-weight:bold; color:#FFD700 !important; margin:4px;} .userTag:hover {color:#FFFFFF !important;} input[disabled]{opacity:0.5; color:#000} "+
    ".hotlink {margin:0px; font-weight:bold} "+
    ".formattingButtons input {min-width:64px; margin-right:1ex; text-align:center;} "+
    ".floatingPanel {position:absolute; border-radius:4px; padding:4px; font-size:80%; z-index:100; max-width:50%; max-height:50%; overflow-y:auto; opacity:1; transition:opacity 250ms ease-out 0ms;} "+
    ".floatingPanel .panelTitle {position:relative; left:-4px; top:-4px; width:100%; box-shadow:0px 0px 6px #000; padding:2px 4px;}"+
    ".floatingPanel .centerpadded {padding:10px; text-align:center;}"+
    ".floatingPanel .option, .floatingPanel .close {cursor:pointer; padding:2px 4px;} "+
    ".floatingPanel .close {position:absolute; right:4px; top:0px;} "+
    ".floatingPanel .close:hover, .floatingPanel .option:hover {font-weight:bold; text-shadow: 0px 0px 3px currentColor; background-color:rgba(0, 0, 0, 0.2)} "+
    ".floatingPanel .close:active, .floatingPanel .option:active {font-weight:bold; text-shadow:0px 0px 3px #000;} "+
    ".floatingPanel .removeUserPMd {position:absolute; right:4px; top:1px} "+
    "fieldset {border:1px solid currentColor; border-radius:6px;} "+
    "fieldset legend {padding:0em 1ex; border-left:1px solid currentColor; border-right:1px solid currentColor; font-variant:small-caps; font-size:1.2em; font-weight:bold;} "+
    ".settingsPane fieldset {margin-bottom:1em;} "+
    ".colorTile {border-radius:2px; box-shadow:1px 2px 3px #000000 inset; display:inline-block; height:14px; margin:1px; width:14px;} "+
    ".colorTile:hover {border-radius:4px; margin:0px; padding:1px; position:relative; top:0px;} "+
    "#eSixExtendSettings input[type=checkbox], #eSixExtendSettings input[type=radio] {margin-right:1ex}"+
    ".ubLink * {display:inline-block; margin-right:1ex;} .ubLink :nth-child(1), .ubLink :nth-child(2) {width:40%;} "+
    "div.ubLink:first-child input:nth-child(3), div.ubLink:last-child input:nth-child(4) {visibility:hidden}"+

    // Site's CSS fixes by setting
    (settings.enhanceNoticeError==true?"#notice, #error {display:block !important; position:fixed; top:-100%; left:0px; min-width:50%; z-index:1000; transition:top 200ms ease 0ms;} ":"")+
    (settings.hiliteur==true?".response-list > div.comment[data-author='"+fixUsername()+"'] {background-color:rgba(255,255,255,0.1)} ":"")+
    (settings.hilitebc==true?".response-list > div.comment.bad-comment {background-color:rgba(0,0,0,0.1) !important;}":"")}, document.head);

  // Locate the header and the navigation bar (navbar) //
  var header = document.getElementById("header");
  var navbar = document.getElementById("navbar");
  var subnav = document.getElementById("subnav");

  // Create the user notification box //
  var xdiv = createElement("div", {style:{marginLeft:"1em"}});

  // The title of the site we're on //
  if(header) createElement("h1", {innerHTML:'<a href="/">'+sitename+'</a>'}, xdiv);

  // The user info space where we'll be putting... uh... the user info.
  var userStatus = createElement("div", {className:"rounded userStatus"}, xdiv);
  if(agnph == true) userStatus.style.marginTop = "40px";

  // Insert the notification box before the header (it'll be at the top)
  document.body.insertBefore(xdiv, document.body.firstChild);

  // Remove "e621" and "My Account" items from the navigation bar, since we've already added them
  if(navbar) {
    navbar.removeChild(navbar.childNodes[1]);
    navbar.removeChild(navbar.childNodes[2]);
  }

  var i;

  // User is logged in (because the username exists in a cookie) ////////////////////////////////
  if(cookies.login) {
    // Get user ID and Level //
    if(!window.localStorage.userID || !window.localStorage.userLV && (cookies.login != window.localStorage.userNM)) {
      // If the UserID and UserLevel were not saved already or if it's a different username...
      query("/user/index.json?name="+fixUsername(), "GET", function(json, xml, text) { // ...retrieve and store them.
        for(var i=0; i<json.length; i++) {
          var id = json[i].id;
          var lv = json[i].level;

          if(json[i].name==cookies.login) {
            if(agnph != 2) document.getElementById("comments_counter").href = "/comment?poster_id="+id;
            document.getElementById("userprofile").href = "/user/show/"+id;
            window.localStorage.userNM = cookies.login;
            window.localStorage.userID = id;
            window.localStorage.userLV = lv;
          }
        }
      }, "userident");
    }

    // User home
    createElement("a", {id:"userprofile", href:"/user/home", title:"Home", className:"userTag", innerHTML:"\u25B6", style:{margin:"0px"}}, userStatus);

    // Username/profile
    createElement("a", {href:"/user/show/"+window.localStorage.userID, title:"View profile", className:"userTag", innerHTML:cookies.login}, userStatus);

    // Link to the message center
    if(settings.showdmails === true) {
      query("/dmail/inbox.json", "GET", function(json, xml, text) {
        var dmails = document.getElementById("dmail_counter"); // The counter
        var unread = []; // Unread PMs

        // Count unread mails
        for(var i=0; i<json.length; i++) {
          var pm = json[i];
          if(pm.has_seen == false && pm.from_id != window.localStorage.userID) {
            unread.push(pm);
          }
        }

        window.localStorage.LastUnreadPMsCount = unread.length;
        dmails.innerHTML = "<b>M</b>"+(unread.length>0?unread.length:"0");
        dmails.title = (unread.length==0?"No":unread.length)+" new message"+(unread.length==1?"":"s");
      }, "userpms");

      // Total dmails
      var unreadpms = window.localStorage.LastUnreadPMsCount||0;
      createElement("a", {id:"dmail_counter", href:"/dmail/inbox", className:"notifTag", innerHTML:"<b>M</b>"+unreadpms, title:(unreadpms==0?"No":unreadpms)+" new message"+(unreadpms==1?"":"s")}, userStatus);
    }

    if(agnph != 2) {
      // Get Faves count
      query("/post/index.xml?tags=fav%3A"+fixUsername()+(settings.allfaves?"+status%3Aany":"")+"&limit=1", "GET", function(json, xml, text) {
        var fav = document.getElementById("faves_counter");
        var cnt = xml.getElementsByTagName("posts")[0].getAttribute("count");

        window.localStorage.LastFavesCount = cnt;
        fav.innerHTML = "<b>\u2665</b>"+cnt;
        fav.title = (cnt===0?"No":cnt)+" posts faved";
      }, "userfaves");

      // Favorited posts
      createElement("a", {id:"faves_counter", href:"/post?tags=fav%3A"+fixUsername(), className:"notifTag", innerHTML:"<b>\u2665</b>"+window.localStorage.LastFavesCount, title:window.localStorage.LastFavesCount+" posts faved"}, userStatus);

      // Separator
      userStatus.appendChild(document.createTextNode(" | "));
    }

    var ubLinks = eval("("+window.localStorage.ubLinks+")"), lnk, ele;
    for(var i=0; i<ubLinks.length; i++) {
      lnk = ubLinks[i];
      createElement("a", {href:lnk.url.replace(/\[userNM]/g, fixUsername()).replace(/\[userID]/g, window.localStorage.userID).replace(/\[userLV]/g, window.localStorage.userILV), title:lnk.title, className:"notifTag hotlink", innerHTML:lnk.title.charAt(0).toUpperCase()+"\u25B6"}, userStatus);
    }

    // Settings
    var useredit = createElement("a", {href:"/user/edit", title:"Settings", className:"notifTag hotlink", innerHTML:"S\u25B6"}, userStatus);
    useredit.addEventListener("contextmenu", function(event) {
      event.preventDefault();
      window.open("/user/edit#eSixExtendSettings");
    }, true);

    // Separator
    userStatus.appendChild(document.createTextNode(" | "));

    // Logout
    createElement("a", {href:"/user/logout", title:"Logout", className:"notifTag hotlink", innerHTML:"L\u25B6"}, userStatus);

  } else { // User is not logged in or does not have an account already (what is it waiting for?) //

    // Login
    createElement("a", {href:"/user/login", title:"Login", className:"notifTag hotlink", innerHTML:"Login"}, userStatus);

    // Separator
    userStatus.appendChild(document.createTextNode(" | "));

    // Signup
    createElement("a", {href:"/user/signup", title:"Signup", className:"notifTag hotlink", innerHTML:"Signup"}, userStatus);
  }

  // Add the forum post/comment/blip's id /////////////////////////////////////////////////////////
  var ss = document.getElementsByTagName("span");

  for(var i=0; i<ss.length; i++) {
    var span = ss[i];
    var ch = span.childNodes[0];
    if(span.parentNode.className == "author" && ch.tagName == "A" && /\/(?:blip|comment|forum)\/show\/[0-9]/.test(ch.href)) {
      var href = ch.href.split("/");
      var postId = createElement("span", {className:"date", innerHTML:"#"+href[href.length-1]});
      span.parentNode.insertBefore(postId, span.nextSibling);
      span.parentNode.insertBefore(document.createElement("br"), span.nextSibling);
    }
  }

  // Locate the textareas that can be formatted with DText. And do some other modifications //////////////////////////////////////////////////////////////
  // loc[] array format: "https://e621.net/loc[1]/loc[2]/loc[3]"

  if(loc[1] == "user") {
    if(loc[2] == "edit") { // We're on the user settings page
      var ra = createFormattingButtons("user_about");
      ra.style.height = "400px";

      var content = ra.parentNode;
      var previewBtn = createElement("input", {type:"button", value:"Preview"});
      previewBtn.addEventListener("click", function() {
        // The following line was taken from the Preview button on the Forums to preview user info (Sorry guys n_n; )
        new Ajax.Updater('preview', '/forum/preview?forum_post[body]='+encodeURIComponent(ra.value), {asynchronous:true, evalScripts:true, method:'get', onSuccess:function(request){$j('#preview').fadeIn('slow')}});
      }, true);
      content.appendChild(previewBtn);
      content.insertBefore(previewBtn, ra.nextSibling);

      var previewDiv = createElement("div", {id:"preview", className:"formsection", style:{margin:"1em 0", display:"none"}});
      content.appendChild(previewDiv);
      content.insertBefore(previewDiv, ra);

      // Settings tab
      var content = document.getElementById("content");
      var userEdit = document.getElementById("user-edit");

      var paneHolder = document.getElementById("paneHolder");
      if(!paneHolder) {
        paneHolder = createElement("div", {id:"paneHolder", className:"rounded formsection"});
        content.insertBefore(paneHolder, content.firstChild);
      }

      if(userEdit.className != "settingsPane")
        userEdit.className = "settingsPane";
      userEdit.style.display = "none";
      paneHolder.appendChild(userEdit);

      var style = document.getElementById("panesStyle");
      if(!style) {
        style = createElement("style", {type:"text/css", id:"panesStyle", innerHTML:
          "ul#settingsPanes {list-style:none; margin-bottom:0px; font-weight:bold; font-size:1.5ex; background:none;} "+
          "ul#settingsPanes li {display:inline-block; cursor:pointer; padding:1ex; margin:0px 1em 0px 0px; border-radius:4px 4px 0px 0px; box-shadow:none;position:relative; z-index:1;}"+
          "ul#settingsPanes li.inactive {opacity:0.75; padding-bottom:0px; top:1ex;}"});
        content.insertBefore(style, paneHolder);
      }

      var tabs = document.getElementById("settingsPanes");
      if(!tabs) {
        tabs = createElement("ul", {id:"settingsPanes"});
        content.insertBefore(tabs, paneHolder);
      }

      var userSettings = document.getElementById("userSettings");
      if(!userSettings) {
        userSettings = createElement("li", {id:"userSettings", innerHTML:"Account Settings", className:"rounded formsection inactive"});
        userSettings.addEventListener("click", function() {
          $j("#settingsPanes > li").addClass("inactive");
          $j(userSettings).removeClass("inactive");
          $j("#paneHolder > .settingsPane").slideUp();
          $j("#user-edit").slideDown();
        }, true);
        tabs.appendChild(userSettings);
      }

      var eSixSettings = createElement("li", {innerHTML:"eSix Extend Settings", className:"rounded formsection inactive"});
      eSixSettings.addEventListener("click", function() {
        $j("#settingsPanes > li").addClass("inactive");
        $j(eSixSettings).removeClass("inactive");
        $j("#paneHolder > .settingsPane").slideUp();
        $j("#eSixExtendSettings").slideDown();
      }, true);
      tabs.appendChild(eSixSettings);

      // Insert the script's settings pane
      var eePane = createElement("div", {className:"settingsPane", id:"eSixExtendSettings", style:{position:"relative", display:"none"}, innerHTML:
        "<small>These settings don't affect normal usage of the entire site, just this userscript.</small><br/><br/>"+

        // General script settings
        "<fieldset><legend>General Settings</legend>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_fixedUserBar'"+(settings.fixedUserBar?" checked":"")+" /><label for='ee_fixedUserBar'>UserBar is always visible</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_singleline'"+(settings.singleline?" checked":"")+" /><label for='ee_singleline'>Display formatting buttons in a single line</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_allfaves'"+(settings.allfaves?" checked":"")+" /><label for='ee_allfaves'>Include deleted posts when counting faves (gives the same number as in profile)</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_showdmails'"+(settings.showdmails?" checked":"")+" /><label for='ee_showdmails'>Show new DMails (PMs) received.</label> <span>Requires HTTPS</span><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_hiliteur'"+(settings.hiliteur?" checked":"")+" /><label for='ee_hiliteur'>Highlight your own comments</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_hilitebc'"+(settings.hilitebc?" checked":"")+" /><label for='ee_hilitebc'>Highlight hidden comments (below threshold)</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_unixLE'"+(settings.unixLE?"":" checked")+" /><label for='ee_unixLE'>Treat line endings as if they were like Windows</label> <span>Might save you a character for each line on blips (Windows uses two chars for new lines, while pretty much any other OS doesn't)</span><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_submitOnCtrlEnter'"+(settings.submitOnCtrlEnter?" checked":"")+" /><label for='ee_submitOnCtrlEnter'>Submit current form on Ctrl+Enter</label><br/>"+
        "<input type='checkbox' onChange='enableSave()' id='ee_enhanceNoticeError'"+(settings.enhanceNoticeError?" checked":"")+" /><label for='ee_enhanceNoticeError'>Enhance <a class='link' onClick='event.preventDefault(); notice(\"This is a notice message\")'>Notice</a> and <a class='link' onClick='event.preventDefault(); error(\"This is an error message\")'>Error</a> messages</label><br/>"+

        // Debug options
        "<input type='checkbox' onChange='enableSave()' id='ee_uselog'"+(settings.uselog?" checked":"")+" /><label for='ee_uselog'>Log messages to console (Dev related, if you're curious you can check it too)</label>"+
        "<div style='margin-left:2em;"+(window.devbug?" display:none;":"")+"'><input type='checkbox' onChange='enableSave()' id='ee_floatinglog'"+(settings.floatinglog?" checked":"")+" /><label for='ee_floatinglog'>Use floating textarea</label></div></fieldset>"+

        // Subscriptions
        "<fieldset><legend>Subscriptions</legend>"+
        "<p style='margin-bottom:3ex;'>Forums or Pools that you would like to be notified of when they update, go on their respective box below.</p>"+

        "<div style='width:45%; float:left; margin-right:20px;'>"+
        "<label for='lstForums'>Subscriptions:</label>"+
        "<span style='float:right;'><input type='button' class='small' id='eeSubsCheckNow' value='Check for updates now' /> <input type='button' id='subsRemove' class='small' value='Remove selected' disabled /></span>"+
        "<select size='8' style='width:100%;' id='lstSubscriptions'><optgroup id='lstPools' label='Pools'></optgroup><optgroup id='lstForums' label='Forums'></optgroup></select></div>"+
        "<div style='width:45%; float:left; margin-right:20px;' id='subsInfo'></div><div style='clear:both'><br/>"+

        "<p><label for='eeCheckInterval'>Check for updates every</label><input type='number' style='margin:0px 1ex;' size='6' id='eeCheckInterval' min='1' max='60' value='"+(settings.checkInterval?settings.checkInterval:30)+"' onChange='enableSave(); document.getElementById(\"eeMinutePlural\").style.display=(this.value==1?\"none\":\"\")' /><label for='eeCheckInterval'>minute<span id='eeMinutePlural'>s</span></label><br />"+
        "<input type='checkbox' onChange='enableSave()' id='eeCheckOnPosts'"+(settings.checkOnPosts?" checked":"")+" /><label for='eeCheckOnPosts'>Check for updates even when viewing posts</label></p>"+
        "<small>Note that too many subscriptions or a very low interval may have a negative impact on the servers, so please be considerate and remove those that you don't need anymore.</small></fieldset>"+

        // Pool navigation settings
        "<fieldset><legend>Pool Navigation</legend>"+
        "<p>To navigate in a pool, click on the 'Read' button (in a post's page, 'Read pool' in a pool's listing), then, press the keys defined here to go to the previous or next post in the pool.<br/>"+
        "Letter/number keys are recommended, other keys may show wrong symbols or lowercase letters.</p>"+
        "<label for='ee_prevKey'>Previous post: </label><input type='text' value='"+String.fromCharCode(settings.poolPrevKey||defset.poolPrevKey)+"' name='"+(settings.poolPrevKey||defset.poolPrevKey)+"' id='ee_prevKey' onKeyDown='event.preventDefault(); this.value=String.fromCharCode(event.keyCode); this.name=event.keyCode; enableSave();' size='4' style='text-align:center' /><br/>"+
        "<label for='ee_nextKey'>Next post: </label><input type='text' value='"+String.fromCharCode(settings.poolNextKey||defset.poolNextKey)+"' name='"+(settings.poolNextKey||defset.poolNextKey)+"' id='ee_nextKey' onKeyDown='event.preventDefault(); this.value=String.fromCharCode(event.keyCode); this.name=event.keyCode; enableSave();' size='4' style='text-align:center' /></fieldset>"+

        // TinyAlias
        "<fieldset><legend>TinyAlias</legend>"+
        "<span>A TinyAlias is like a normal alias, but with the added benefit that it does not require admin's approval, covers many, probably unrelated tags, and is applied instantly while tagging.</span>"+
        '<p>For example: The tinyalias "character" would be replaced with the tags "gray_fur feline amber_eyes female" after pressing [Space] while editing a post\'s tags.</p>'+
        "<p>To add a new TinyAlias, fill in the name and tags in their respective boxes and then click on 'Apply' to add it to the list. If a TinyAlias already exists, it will be updated with the new tags.</p>"+
        "<div><div style='width:25%;float:left;margin-right:20px'>"+
        "<label for='taList'>TinyAliases:</label>"+
        "<select size='10' style='width:100%;' id='taList'></select>"+
        "<input type='button' id='taRemove' value='Remove' />"+
        "</div><div>"+
        "<label for='taName'>Name:</label>"+
        "<input type='text' style='display:block;width:30%' id='taName'></textarea>"+
        "<label for='taTags'>Tags:</label>"+
        "<textarea style='display:block;width:30%;height:135px' id='taTags'></textarea>"+
        "<input type='button' id='taApply' value='Apply' disabled />"+
        "</div></div>"+
        "<div style='clear:both'><br/>"+
        "<span>Note: When tagging with a TinyAlias, it must be prefixed, otherwise this will not work. This is to avoid conflicts with a TinyAlias\' name and a normal tag's name.</span>"+
        "<p>You can use just about any character, except Space, since it triggers the replacement. Max. 4 chars.</p>"+
        '<label for="taPrefix">Prefix: </label><input type="text" value="'+(settings.tinyPrefix || "ta_")+'" id="taPrefix" maxlength="4" size="6" />'+
        "</div></fieldset>"+

        // Quick access
        "<fieldset><legend>Quick Access</legend>"+
        "<p>Customize the links in the UserBar. Note that their appearance on the UserBar will be the first letter followed by \u25B6</p>"+
        "<div class='ubLink'><strong>Title</strong><strong>URL</strong><strong>Order</strong></div>"+
        "<div id='lstLinks'></div>"+
        "<input type='button' id='ublAdd' value='Add new' />"+
        "<br/><br/><span>Replacement labels (applied only on URLs)</span>"+
        "<ul><li><strong>[userNM]</strong>: Your username ("+cookies.login+")</li>"+
        "<li><strong>[userID]</strong>: Your user id ("+window.localStorage.userID+")</li>"+
        "<li><strong>[userLV]</strong>: Your user level ("+window.localStorage.userLV+")</li></ul>"+
        "</fieldset>"+

        // Buttons
        "<input type='button' value='Defaults' id='ee_btnDefaults' /> "+
        "<input type='button' id='ee_btnSave' value='Save' "+(window.localStorage.settings && settings.saveVersion==defset.saveVersion?"disabled":"")+" /> <sup id='ee_msgSaved' class='newoption-label' style='display:none'>Settings saved!</sup>"+
        "<br/><small>Saves settings in the localStorage. For these to be persistent between pages, localStorage must be enabled in your browser.</small>"+
        "<small style='position:absolute; right:0px; top:0px; text-align:right'>Version code: "+defset.version+"</small>"}, paneHolder);

      var eeSave = document.getElementById("ee_btnSave");
      window.enableSave = function() {eeSave.disabled = false;};

      // Populate the subscriptions lists
      var subsInfo = document.getElementById("subsInfo"), subsRem = document.getElementById("subsRemove"),
        subsLst = document.getElementById("lstSubscriptions"), checkSubsNow = document.getElementById("eeSubsCheckNow"),
      addForum = function(ob) {
        createElement("option", {value:'{"id":'+ob.id+',"name":"'+ob.name+'","pages":'+ob.pages+',"newest_id":'+ob.newest_id+',"last_id":'+ob.last_id+'}', type:0, innerHTML:ob.name}, document.getElementById("lstForums"));
      }, addPool = function(ob) {
        createElement("option", {value:'{"id":'+ob.id+',"name":"'+ob.name+'","posts":['+ob.posts+'],"last":'+ob.last+'}', type:1, innerHTML:ob.name.replace(/_/g, " ")}, document.getElementById("lstPools"));
      };

      var populateSubsList = function() {
        var subs, i, su, t, e, ds, fs = window.localStorage.forumSubscriptions, ps = window.localStorage.poolSubscriptions;
        if(fs && fs != '"[]"') {
          subs = eval("("+fs+")");
          for(i=0; i<subs.length; i++) {
            addForum(subs[i]);
          }
        }

        if(ps && ps != '"[]"') {
          subs = eval("("+ps+")");
          for(i=0; i<subs.length; i++) {
            addPool(subs[i]);
          }
        }
      };

      var subsSelect = function() {
        if(this.selectedIndex != -1) {
          var itm = this.options[this.selectedIndex], sub = eval("("+itm.value+")"), anm;
          subsInfo.innerHTML = "";
          subsRem.disabled = false;
          subsRem.item = itm;

          if(itm.type == 0) {
            subsInfo.innerHTML = "<h6>Forum: <a href='/forum/show/"+sub.id+"' target='_blank'>"+sub.name.replace(/_/g, " ")+"</a> <a href='/forum/show/"+sub.id+"?page="+sub.pages+"' target='_blank' class='last-page'>last</a></h6>"+
              "Last seen: <a href='/forum/show/"+sub.last_id+"' target='_blank'>forum #"+sub.last_id+"</a><br/>"+
              "Most recent: <a href='/forum/show/"+sub.newest_id+"' target='_blank'>forum #"+sub.newest_id+"</a><br/>"+
              "<a href='/forum/show/"+sub.id+"?page="+sub.pages+"' target='_blank'>"+sub.pages+" pages</a>";
          } else {
            this.disabled = true;
            anm = animatedIndicator(subsInfo, "strong");
            query("/post/show.json?id="+sub.last, "GET", function(j, x, t) {
              subsLst.disabled = false;
              window.clearInterval(anm);
              subsInfo.innerHTML = "<div><h6>Pool: <a href='/pool/show/"+sub.id+"' target='_blank'>"+sub.name.replace(/_/g, " ")+"</a></h6>"+
                "<a class='preview' style='float:left; margin-right:1ex;' target='_blank' href='/post/show/"+sub.last+"'>"+
                "<img class='preview' width='"+j.preview_width+"' height='"+j.preview_height+"' src='"+j.preview_url+"' /></a>"+
                "<p>Current post: "+(sub.posts.indexOf(sub.last)+1)+" of "+sub.posts.length+"</p>"+
                "</div>";
            }, "poolthumb");
          }
        }
      };

      subsLst.addEventListener("change", subsSelect, true);
      subsRem.addEventListener("click", function() {
        var itm = this.item;
        itm.parentNode.removeChild(itm);
        subsInfo.innerHTML = "";
        this.disabled = true;
        enableSave();
      }, true);

      checkSubsNow.addEventListener("click", function() {
        var anm = animatedIndicator(this);
        subsLst.disabled = subsRem.disabled = checkSubsNow.disabled = true;
        subsInfo.innerHTML = "";
        checkSubsUpdates(function() {
          window.clearInterval(anm);
          checkSubsNow.value = "Check for updates now";
          subsLst.disabled = subsRem.disabled = checkSubsNow.disabled = false;
          document.getElementById("lstForums").innerHTML = "";
          document.getElementById("lstPools").innerHTML = "";
          populateSubsList();
        });
      }, true);
      populateSubsList();

      // Populate list of TinyAliases
      var taList = document.getElementById("taList"), taName = document.getElementById("taName"), taTags = document.getElementById("taTags"),
        taPrefix = document.getElementById("taPrefix"), taRemove = document.getElementById("taRemove"), taApply = document.getElementById("taApply"),
        ta, tn, op;

      for(i=0; i<TinyAlias.length; i++) {
        ta = TinyAlias[i];
        tn = ta.tags.split(" ").length;
        op = createElement("option", {value:ta.name, innerHTML:ta.name+" ("+tn+" tag"+(tn==1?"":"s")+")", id:"ta_"+ta.name, item:i}, taList);
        ta.item = op;
      }

      taList.addEventListener("change", function() {
        var ta = TinyAlias.find(this.value);
        taName.value = ta.name;
        taTags.value = ta.tags;
        taApply.disabled = false;
      });

      var checkNameAndTags = function() {
        taApply.disabled = (taName.value.length == 0 || taTags.value.length == 0);
        taTags.value = taTags.value.replace(/\n/g, " ");
      };

      taName.addEventListener("keyup", checkNameAndTags);
      taTags.addEventListener("keyup", checkNameAndTags);

      taRemove.addEventListener("click", function() {
        var ta = TinyAlias.find(taList.value);
        taList.removeChild(ta.item);
        TinyAlias.splice(ta, 1);
        taName.value = "";
        taTags.value = "";
        taApply.disabled = true;
        enableSave();
      });

      taPrefix.addEventListener("change", function() {
        this.value = this.value.replace(/ /gi, "");
        if(this.value.length == 0) this.value = "ta_";
        if(this.value != (settings.tinyPrefix || "ta_")) enableSave();
      });

      taApply.addEventListener("click", function() {
        var name = taName.value.replace(new RegExp(taPrefix.value || "ta_", ""), ""), tags = taTags.value;

        if(name && tags) {
          var ta = TinyAlias.find(name);
          var taTagCount = tags.split(" ").length;
          var taLabel = name+" ("+taTagCount+" tag"+(taTagCount==1?"":"s")+")";

          if(ta == null) {
            var op = createElement("option", {value:name, innerHTML:taLabel, id:"ta_"+name});
            taList.appendChild(op);
            TinyAlias.push({"name":name, "tags":tags});
            taName.value = taTags.value = "";
          } else {
            ta.tags = tags;
            ta.item.innerHTML = taLabel;
          }
        }

        enableSave();
        taApply.disabled = true;
      });

      // Populate list of custom links
      var newUbLink = function(nubTitle, nubUrl) {
        var itm = createElement("div", {className:"ubLink", dataset:{title:nubTitle, url:nubUrl}}, lst);

        createElement("input", {type:"text", value:nubTitle, onchange:function() {
          this.parentNode.dataset.title = this.value;
          enableSave();
        }}, itm);

        createElement("input", {type:"text", value:nubUrl, onchange:function() {
          this.parentNode.dataset.url = this.value;
          enableSave();
        }}, itm);

        createElement("input", {type:"button", value:"\u25B2", style:{minWidth:"24px"}, onclick:function() {
          this.parentNode.parentNode.insertBefore(this.parentNode, this.parentNode.previousElementSibling);
          enableSave();
        }}, itm);

        createElement("input", {type:"button", value:"\u25BC", style:{minWidth:"24px"}, onclick:function() {
          this.parentNode.parentNode.insertBefore(this.parentNode.nextElementSibling, this.parentNode);
          enableSave();
        }}, itm);

        createElement("input", {type:"button", value:"\u2716", style:{minWidth:"24px"}, onclick:function() {
          this.parentNode.parentNode.removeChild(this.parentNode);
          enableSave();
        }}, itm);
      };

      var itm, lnk, inp, lst = document.getElementById("lstLinks");
      for(var i=0; i<ubLinks.length; i++) {
        lnk = ubLinks[i];
        newUbLink(lnk.title, lnk.url);
      }

      document.getElementById("ublAdd").addEventListener("click", function() {
        newUbLink("", "");
        enableSave();
      }, true);

      // Assign events to 'Default' and 'Save' buttons
      document.getElementById("ee_btnDefaults").addEventListener("click", function() {
        window.localStorage.settings = '({"version":"'+defset.version+'"'+
          ',"saveVersion":'+defset.saveVersion+
          ',"fixedUserBar":'+defset.fixedUserBar+
          ',"singleline":'+defset.singleline+
          ',"allfaves":'+defset.allfaves+
          ',"showdmails":'+defset.showdmails+
          ',"hiliteur":'+defset.hiliteur+
          ',"hilitebc":'+defset.hilitebc+
          ',"unixLE":'+defset.unixLE+
          ',"submitOnCtrlEnter":'+defset.submitOnCtrlEnter+
          ',"enhanceNoticeError":'+defset.enhanceNoticeError+
          ',"tinyPrefix":"ta_"'+
          ',"tinyAlias":[]'+
          ',"checkInterval":'+defset.checkInterval+
          ',"checkOnPosts":'+defset.checkOnPosts+
          ',"uselog":'+defset.uselog+
          ',"floatinglog":'+defset.floatinglog+
          ',"poolPrevKey":'+defset.prevKey+
          ',"poolNextKey":'+defset.nextKey+'})';
        window.localStorage.alertedVersion = defset.saveVersion;
        window.localStorage.nextAlert = 0;
        window.location.reload();
      }, true);
      eeSave.addEventListener("click", writeSettings, true);

      if(window.location.hash == "#eSixExtendSettings") {
        userSettings.className = "rounded formsection inactive";
        eSixSettings.className = "rounded formsection";
        eePane.style.display = "block";
      } else {
        userSettings.className = "rounded formsection";
        eSixSettings.className = "rounded formsection inactive";
        userEdit.style.display = "block";
      }
    } else
    if(loc[2] == "show") {
      createFormattingButtons("blips_body");

      // Blacklist user
      createElement("li", {innerHTML:"<a class='link' id='blUser'>Blacklist user</a>"}, subnav.firstElementChild);
      document.getElementById("blUser").addEventListener("click", function() {
        notice("Adding user to blacklist");
        query("/user/index.json?id="+loc[3], "GET", function(j, x, t) {
          blacklistTag("user:"+j[0].name);
        });
      }, true);

      if(loc[3] == window.localStorage.userID) {
        var dc = document.getElementsByTagName("tbody")[1];

        var countersTR = dc.insertRow(-1);
        var countersTD = countersTR.insertCell(0);
        countersTD.setAttribute("colspan", "4");

        // Commenting score
        var ccs = createElement("input", {type:"button", value:"Commenting score", style:{marginRight:"1em"}});
        ccs.addEventListener("click", function() {
          this.disabled = true;
          var score = 0, highest = [0,0], lowest = [0,1000], page = 1, stim = animatedIndicator(ccs);
          var loadComments = function() {
            query("/comment/search.json?query=user%3A"+fixUsername()+"&page="+page, "GET", function(json, xml, text) {
              if(json.length != 0) {
                for(var i=0; i<json.length; i++) {
                  var cm = json[i], cs = cm.score, id = cm.id;
                  score += cs;
                  if(cs >= highest[1]) highest = [id, cs];
                  if(cs <= lowest[1]) lowest = [id, cs];
                }

                page++;
                loadComments();
              } else
                countScore();
            }, "commentspager");
          };

          var countScore = function() {
            var rs = createFloatingPanel(ccs, true);
            rs.innerHTML = "Your score is: <span"+(score==0?" style='font-weight:bold'":" class='"+(score>0?"greentext":"redtext")+"'")+">"+score+"</span>.<br/>"+
              "Most rated: <a href='https://e621.net/comment/show/"+highest[0]+"' target='_blank'"+(highest[1]==0?" style='font-weight:bold'":" class='"+(highest[1]>0?"greentext":"redtext")+"'")+">comment #"+highest[0]+"</a> (<span"+(highest[1]==0?" style='font-weight:bold'":" class='"+(highest[1]>0?"greentext":"redtext")+"'")+">"+highest[1]+"</span>)<br/>"+
              "Least rated: <a href='https://e621.net/comment/show/"+lowest[0]+"' target='_blank'"+(lowest[1]==0?" style='font-weight:bold'":" class='"+(lowest[1]>0?"greentext":"redtext")+"'")+">comment #"+lowest[0]+"</a> (<span"+(lowest[1]==0?" style='font-weight:bold'":" class='"+(lowest[1]>0?"greentext":"redtext")+"'")+">"+lowest[1]+"</span>)";
            window.clearInterval(stim);
            ccs.value = "Commenting score";
            ccs.disabled = false;
          }

          loadComments();
        }, false);
        countersTD.appendChild(ccs);

        // Posting score
        var cps = createElement("input", {type:"button", value:"Posting score"});
        cps.addEventListener("click", function() {
          this.disabled = true;
          var score = 0, hiScore = {score:0}, loScore = {score:1000}, stim = animatedIndicator(cps), page = 1;
          var loadPosts = function() {
            query("/post/index.json?tags=user%3A"+fixUsername()+"&page="+page, "GET", function(json, xml, text) {
              if(json.length != 0) {
                for(var i=0; i<json.length; i++) {
                  var post = json[i];

                  score += post.score;
                  if(post.score >= hiScore.score) hiScore = post;
                  if(post.score <= loScore.score) loScore = post;
                }

                page++;
                loadPosts();
              } else
                countScore();
            }, "postspager");
          };

          var countScore = function() {
            var hiScoreTitle = makeTooltip(hiScore);
            var loScoreTitle = makeTooltip(loScore);

            var rs = createFloatingPanel(cps, true);
            rs.innerHTML = "Your score is: <a href='https://e621.net/post?tags=user%3A"+cookies.login+"+order%3Ascore' target='_blank'"+(score==0?" style='font-weight:bold'":" class='"+(score>0?"greentext":"redtext"))+"'>"+score+"</a>.<br/>"+
               "Most rated: <a href='https://e621.net/post/show/"+hiScore.id+"' target='_blank'"+(hiScore.score==0?" style='font-weight:bold'":" class='"+(hiScore.score>0?"greentext":"redtext")+"'")+" alt='"+hiScoreTitle+"' title='"+hiScoreTitle+"'>post #"+hiScore.id+"</a> (<span"+(hiScore.score==0?" style='font-weight:bold'":" class='"+(hiScore.score>0?"greentext":"redtext")+"'")+">"+hiScore.score+"</span>)<br/>"+
              "Least rated: <a href='https://e621.net/post/show/"+loScore.id+"' target='_blank'"+(loScore.score==0?" style='font-weight:bold'":" class='"+(loScore.score>0?"greentext":"redtext")+"'")+" alt='"+loScoreTitle+"' title='"+loScoreTitle+"'>post #"+loScore.id+"</a> (<span"+(loScore.score==0?" style='font-weight:bold'":" class='"+(loScore.score>0?"greentext":"redtext")+"'")+">"+loScore.score+"</span>)<br/>";
            window.clearInterval(stim);
            cps.value = "Posting score";
            cps.disabled = false;
          }

          loadPosts();
        }, false);
        countersTD.appendChild(cps);
      }
    } else
    if(loc[2] == "block") {
      createFormattingButtons("ban_reason");
    }
  } else
  if(loc[1] == "forum" && (loc[2] == "new" || loc[2] == "show" || loc[2] == "edit")) {
    // We're on the forums (creating a new thread, editing a post or replying to someone)
    var ra = createFormattingButtons("forum_post_body");
    if(ra) ra.style.height = "200px";

    if(loc[2] == "show") {
      var subsF = (window.localStorage.forumSubscriptions?eval("("+window.localStorage.forumSubscriptions+")"):[]),
        index = subsF.findItem(function(item) {
          return (item.id == loc[3]);
        });

      if(index != -1) {
        var sub = subsF[index], lastId = document.getElementById("forum").lastElementChild.id.substr(1);
        if(sub.pages < parseInt(pageQuery.page)) {
          sub.name = document.title;
          sub.pages = pageQuery.page;
          sub.newest_id = lastId;
          sub.last_id = lastId;
          updateForums(subsF);
        }
      } else {
        createElement("li", {innerHTML:"<a class='link' id='subsForum'>Subscribe to this forum</a>"}, subnav.firstElementChild);
        document.getElementById("subsForum").addEventListener("click", function() {
          notice("Subscribing to this forum");
          query("/forum/show.json?id="+loc[3], "GET", function(j1, x1, t1) {
            var forumName = j1.title, count = 0, page = 1, current = 0;
            var saveForum = function() {
              notice("Subscribed to this forum");
              updateForumSubscriptions({"id":loc[3], "name":forumName, "pages":Math.ceil(count/30),"newest_id":current,"last_id":current});
            };

            var getPosts = function() {
              query("/forum/index.json?parent_id="+loc[3]+"&page="+page, "GET", function(j2, x2, t2) {
                if(j2.length == 0) {
                  saveForum();
                } else {
                  count += j2.length;
                  if(page == 1) current = j2[0].id;
                  page++;
                  getPosts();
                }
              }, "subsforum");
            };
            getPosts();
          }, "subsforum");
        }, true);
      }
    }
  } else
  if(loc[1] == "blip" && loc[2] != "search") {
    // We're on the blips or creating a new blip
    var ra = createFormattingButtons("blips_body");

    // Create the counter element
    var charcounter = createElement("span", {id:"blipChars", style:{textAlign:"right", fontWeight:"bold", cssFloat:"right"}, innerHTML:"\u2711 0"});

    var fchange = function() {
      var chars = ra.value.replace(/(\x0D|\x0A)/gm, (settings.unixLE?".":"..")).length;

      if(chars>255) charcounter.className = "date"; else
      if(chars>240 && chars<255) charcounter.className = "redtext"; else
      if(chars>=200 && chars<240) charcounter.className = "greentext"; else
      if(chars<200) charcounter.className = "";

      document.getElementById("blipChars").innerHTML = "\u2711 "+chars;
    };

    // Count remaining characters on each keypress
    ra.addEventListener("keydown", fchange, true);
    ra.addEventListener("keyup", fchange, true);
    ra.addEventListener("focus", fchange, true);
    ra.addEventListener("blur", fchange, true);

    // Insert the counter
    ra.parentNode.insertBefore(charcounter, document.getElementById("fbtns_blips_body"));
  } else
  if(loc[1] == "post" && loc[2] != "error") {
    // We're on the post listing (yes, there is an error subpage. Try searching for more tags than your user level allows)

    // Formatting buttons for "Post Description"
    var postDesc = createFormattingButtons("post_description");

    // "Sort" and "Count tags" buttons
    var tagsBox = document.getElementById("post_tags");
    var tbParent = tagsBox.parentNode;
    var extend = document.createElement("div");

    if(tbParent.id == "quick-edit") tbParent = tbParent.parentNode.parentNode; // Scale up two levels (when we're in the post index)
    tbParent.appendChild(extend);

    tagsBox.addEventListener("keyup", function(event) {
      if(event.keyCode == 32) {
        for(var i=0; i<TinyAlias.length; i++) {
          var ta = TinyAlias[i];
          var tags = tagsBox.value.split(" ");
          var taTags = ta.tags.split(" ");
          var tt = [];

          for(var j=0; j<taTags.length; j++) {
            if(tags.indexOf(taTags[j]) == -1) tt.push(taTags[j])
          }

          tagsBox.value = tagsBox.value.replace((settings.tinyPrefix || "ta_")+ta.name, tt.join(" "));
        }
      }
    });

    createElement("input", {type:"button", value:"Sort", style:{marginRight:"1ex"}, onclick:function() {
      var tags = tagsBox.value.split(" ");
      for(var i=0; i<tags.length; i++) {
        if(tags[i].length == 0) tags.splice(i, 1);
      }
      tagsBox.value = tags.sort().join(" ");
    }}, extend);

    var btnCount = createElement("input", {type:"button", value:"Count tags", timer:null, onclick:function() {
      var tags = tagsBox.value.split(" ").length-1;
      this.value = (tags===0?"No":tags)+" tag"+(tags==1?"":"s");
      this.disabled = true;
      window.setTimeout(function() {
        btnCount.value = "Count tags";
        btnCount.disabled = false;
      }, 5000);
    }});
    extend.appendChild(btnCount);

    // Check tag
    var checkTheTag = function() {
      if(tfTag.value != "") {
        this.disabled = true;
        var tim = animatedIndicator(tagFindInfo, "span");
        query("/tag/index.json?name="+encodeURIComponent(tfTag.value), "GET", function(json, xml, text) {
          window.clearInterval(tim);
          searchTag.disabled = false;
          if(json.length == 0) {
            tagFindInfo.innerHTML = "No posts use this tag";
          } else {
            var num = json[0].count;
            tagFindInfo.innerHTML = "<p>"+(num==0?"No":num)+" post"+(num==1?"":"s")+" use"+(num==1?"s":"")+" this tag</p>"+
              "<div><input type='button' style='margin-right:1ex;' onClick='window.open(\"/post/index?tags="+tfTag.value+"\")' value='Posts' />"+
              "<input type='button' onClick='window.open(\"/wiki/show?title="+tfTag.value+"\")' value='Wiki' /></div>";
          }
        }, "tagsearch");
      } else {
        tagFindInfo.innerHTML = "<em>Please provide a tag to search for</em>";
      }
    };

    var grpTagFind = createElement("fieldset", {}, tbParent);

    createElement("legend", {innerHTML:"<label for='ee_tagSearch'>Check tag</label>"}, grpTagFind);
    createElement("div", {innerHTML:"Use this field to look for a tag if you're not sure whether it is used or not"}, grpTagFind);

    var tfTag = createElement("input", {id:"ee_tagSearch", type:"text", size:"24", style:{marginRight:"1ex"}, onkeydown:function(event) {
      if(event.keyCode == 13) {
        event.preventDefault();
        checkTheTag();
      }
    }}, grpTagFind);

    var searchTag = createElement("input", {type:"button", value:"Check", style:{marginRight:"1ex"}}, grpTagFind);
    var addTag = createElement("input", {type:"button", value:"Add", style:{marginRight:"1ex"}}, grpTagFind);
    var tagFindInfo = createElement("div", {}, grpTagFind);

    searchTag.addEventListener("click", checkTheTag, true);

    addTag.addEventListener("click", function() {
      var t = tagsBox.value;
      var tags = t.split(" ");
      var tag = tfTag.value;
      if(tags.indexOf(tag) == -1) {
        tagsBox.value += (t.charAt(t.length-1) == " " ? tag : " "+tag);
        tfTag.value = "";
      } else {
        this.value = "Tag already exists";
        this.disabled = true;
        window.setTimeout(function() {
          addTag.value = "Add";
          addTag.disabled = false;
        }, 5000);
      }
    });

    // Formatting buttons for comment box
    if(loc[2] == "show" && (document.getElementById("image") || document.getElementsByTagName("object").length != 0)) {
      createFormattingButtons("reply-text-"+loc[3]);

      // Link for each tag to blacklist
      var tags = document.getElementById("tag-sidebar").querySelectorAll("a:nth-child(2)");

      for(var i=0; i<tags.length; i++) {
        var tag = tags[i];
        var blTag = createElement("a", {innerHTML:"X", name:tag.innerHTML.replace(/ /g, "_"), title:'Blacklist "'+tag.innerHTML.replace(/ /g, "_")+'"', className:"link", onclick:function() {blacklistTag(this.name);}});
        tag.parentNode.insertBefore(blTag, tag);
        tag.parentNode.insertBefore(document.createTextNode(" "), tag);
      }

      // Link that blacklists the currently viewed post
      var postOptions = document.getElementById("stats").nextElementSibling.childNodes[3];
      createElement("li", {innerHTML:"<a class='link'>Blacklist post</a>", onclick:function() {blacklistTag();}}, postOptions);

      var postCommands, rightcol = document.getElementById("right-col").childNodes;
      for(var i=0; i<rightcol.length; i++) {
        var el = rightcol[i];
        if(el.childNodes[1] && el.childNodes[1].tagName == "H4") {
          postCommands = el.childNodes[1];
          break;
        }
      }

      var descBox = postCommands.parentNode.previousSibling.previousSibling;
      if(descBox.childNodes[1].className == "section collapse-container") {
        descBox.parentNode.insertBefore(postCommands, descBox);
      }

      postCommands.appendChild(document.createTextNode(" | "));

      var sozPost = null, sozUrls = [], thatSauce;
      var sauces = createElement("a", {innerHTML:"Get source", className:"link", onclick:function() {
        var presentOptions = function() {
          var url = encodeURIComponent(sozPost.sample_url), md5 = sozPost.md5, fp = createFloatingPanel(sauces, false);
          fp.innerHTML = "<h4 class='option' onClick='window.open(\"http://google.com/searchbyimage?image_url="+url+"\")'>Google</h4>"+
            "<h4 class='option' onClick='window.open(\"http://www.tineye.com/search?url="+url+"\")'>TinEye</h4>"+
            "<h4 class='option' onClick='window.open(\"http://saucenao.com/search.php?url="+url+"\")'>SauceNAO</h4>"+
            "<h4 class='option' onClick='window.open(\"http://iqdb.org/?url="+url+"\")'>IQDB</h4>"+
            "<h4 class='option' onClick='window.open(\"https://inkbunny.net/submissionsviewall.php?mode=search&text="+md5+"&md5=yes\")'>InkBunny</h4>"+
            "<h4 class='option' onClick='window.open(\"http://www.furaffinity.net/search?q="+thatSauce+"\")'>FurAffinity</h4>"+
            (sozPost.tags.indexOf("my_little_pony") != -1?"<h4 class='option' onClick='window.open(\"https://derpibooru.org/search/reverse?url="+url+"&fuzziness=0.25\")' title='Other boorus might have sourced images, this one might help a bit'>Derpibooru</h4>":"");
        };

        if(sozPost == null) {
          var stats = document.querySelectorAll("div#stats ul li.sourcelink")[0].firstElementChild.childNodes;
          for(var i=0, s; i<stats.length, s=stats[i]; i++) {
            if(s.tagName == "A" && /facdn/.test(s.href)) {
              thatSauce = s.href.replace(/.*\/(.*)/, "$1").split(".")[1].replace(/_/g, "&20");
              break;
            }
          }

          query("/post/show.json?id="+loc[3], "GET", function(json, xml, text) {
            sozPost = json;
            presentOptions();
          }, "postsauce");
        } else {
          presentOptions();
        }
      }}, postCommands);

      setPoolSpace();

      var pools = [];
      var subs = (window.localStorage.poolSubscriptions ? eval("("+window.localStorage.poolSubscriptions+")") : []);
      for(var i=0; i<subs.length; i++) {
        pools.push(subs[i].id);
      }

      var divs = document.getElementsByTagName("div");
      for(i=0; i<divs.length; i++) {
        var dp = divs[i], dpid = parseInt(dp.id.substr(4));
        if(/pool.[0-9]/.test(dp.id) && pools.indexOf(dpid) == -1) {
          var rp = createElement("input", {type:"button", value:"Read", className:"small", style:{position:"absolute", right:"4px"}, poolID:parseInt(dpid)});
          rp.addEventListener("click", function() {
            initPool(this, this.poolID);
          }, true);
          dp.insertBefore(rp, dp.firstChild);
          break;
        }
      }
    } else
    if(loc[2] != "show" && loc[2] != "upload") {
      var posts = Post.posts.entries();
      var sidebar = document.getElementById("ad-button").parentNode;
      var commonTags = createElement("div", {}, sidebar);

      createElement("h5", {innerHTML:"<a class='link'>Common tags</a>", onclick:function() {
        $j("#commonTags").toggle();
        window.localStorage.showCommonTags = (window.localStorage.showCommonTags == "true"?false:true);
      }}, commonTags);

      var ctList = createElement("div", {id:"commonTags", style:{display:(window.localStorage.showCommonTags == "true"?"block":"none")}}, commonTags);

      if(posts.length  == 0) createElement("p", {innerHTML:"Uh..."}, ctList); else
      if(posts.length  == 1) createElement("p", {innerHTML:"Really?"}, ctList);
      else {
        var tags = [];
        tags.find = function(what) {
          for(var i=0; i<this.length; i++) {
            if(this[i].name == what) return i;
          }

          return -1;
        };

        var tagSearch = document.getElementById("tags");
        var searchTerms = tagSearch.value.split(" ");
        var p, t;

        for(p=0; p<posts.length; p++) {
          var postTags = posts[p].value.tags;
          for(t=0; t<postTags.length; t++) {
            var i = tags.find(postTags[t]);
            if(searchTerms.indexOf(postTags[t]) == -1) {
              if(i == -1)
                tags.push({name:postTags[t], count:1});
              else
                tags[i].count++;
            }
          }
        }

        var li;

        tags.sort(function(a, b) {
          if(a.count < b.count) return  1;
          if(a.count > b.count) return -1;
          return  0;
        });

        for(var i=0; i<tags.length; i++) {
          t = tags[i];

          if(i < 30 && t.count != posts.length) {
            createElement("div", {innerHTML:'<a href="/wiki/show?title='+t.name+'">?</a> <a href="/post/index?tags='+t.name+'+'+tagSearch.value+'">+</a> <a href="/post/index?tags=-'+t.name+'+'+tagSearch.value+'">–</a> <a class="link" onClick="blacklistTag(\''+t.name+'\')">X</a> <a href="/post/index?tags='+t.name+'">'+t.name+'</a><span class="post-count" style="float:right;">'+t.count+'</span>'}, ctList);
          }
        }
      }
    }

  } else
  if(loc[1] == "set" && loc[2] == "new") {
    createFormattingButtons("set_description");
  } else
  if(loc[1] == "wiki" && (loc[2]=="add" || loc[2]=="edit")) {
    // We're editing a page on the wiki
    createFormattingButtons("wiki_page_body");
  } else
  if(loc[1] == "tag_alias" && loc[2] == "new") {
    // We're suggesting a tag alias
    createFormattingButtons("tag_alias_reason");
  } else
  if(loc[1] == "tag_implication" && loc[2] == "new") {
    // We're suggesting an implication
    createFormattingButtons("tag_implication_reason");
  } else
  if(loc[1] == "artist" && loc[2] == "create") {
    // We're creating a new entry for an artist
    createFormattingButtons("artist_notes");
  } else
  if(loc[1] == "pool") {
    if(loc[2] == "create") { // We're creating a new pool
      createFormattingButtons("pool_description");
    } else
    if(loc[2] == "show") {
      var cnt = createElement("div", {style:{cssFloat:"right"}});
      var pool = document.getElementById("pool-show");
      pool.insertBefore(cnt, pool.firstChild);
      createElement("input", {type:"button", value:"Read pool", onclick:function() {initPool(this, loc[3]);}}, cnt);
    }
  } else
  if(loc[1] == "dmail") {
    var namebox = document.getElementById("dmail_to_name") || document.getElementById("to_name");
    var lastDMailed = window.localStorage.lastDMailed;
    userslist = (lastDMailed?lastDMailed.split(","):[]);

    namebox.addEventListener("click", function() {
      var fp = createFloatingPanel(namebox, false);
      fp.parentNode.style.top = (namebox.offsetTop+namebox.offsetHeight)+"px";

      if(userslist.length == 0) {
        fp.style.textAlign = "center";
        if(settings.showdmails) {
          fp.innerHTML = "<h5 style='color:#AAA' id='ee_check'>&lt;No users recently PM'd&gt;</h5>"+
            "<small>Click to fetch from your sent PMs</small>";
          fp.addEventListener("click", findUsersPMd, true);
        } else
          fp.innerHTML = "<h5 style='color:#AAA' id='ee_check'>&lt;No users recently PM'd&gt;</h5>";
      } else {
        for(var i=0; i<userslist.length; i++) {
          var userItem = createElement("h5", {style:"position:relative;", className:"option"}, fp);

          var userName = createElement("div", {innerHTML:userslist[i], onclick:function() {
            namebox.value = this.innerHTML;
            if(loc[2] != "inbox") document.getElementById("dmail_title").focus();
          }}, userItem);

          createElement("span", {className:"removeUserPMd", innerHTML:"X", name:userslist[i], title:'Remove "'+userslist[i]+'"', onclick:function() {
            userslist.splice(userslist.indexOf(this.name), 1);
            window.localStorage.lastDMailed = userslist;
          }}, userItem);
        }
      }
    }, true);

    if(loc[2] == "show" || loc[2] == "compose") { // We're responding to a PM
      createFormattingButtons("dmail_body");
      document.forms[0].addEventListener("submit", function() {
        var sendTo = namebox.value.replace(/ /g, "_");
        if(sendTo != "") {
          var usrpos = userslist.indexOf(sendTo);
          if(usrpos != 1) userslist.splice(usrpos, 1);
          userslist.unshift(sendTo);
          window.localStorage.lastDMailed = userslist;
        }
      }, true);
    }
  } else
  if(loc[1] == "comment") {
    var commentBoxes = document.getElementsByTagName("textarea");
    for(i=0; i<commentBoxes.length; i++){
      var ta = commentBoxes[i];
      if(/reply-text-/.test(ta.id)) {
        createFormattingButtons(ta.id);
      }
    }
  } else
  if(loc[1] == "user_record") {
    createFormattingButtons("user_record_body");
  } else
  if((loc[1] == "take_down" || loc[1] == "takedown") && loc[2] == "show") {
    var list = document.querySelectorAll(".formsection")[1];
    var posts = list.querySelectorAll("a");
    var postIDs = [];
    var postNum = 0;

    postIDs.indexOf = function(o) {
      var index = -1;

      for(var i=0; i<this.length; i++) {
        if(this[i].url == o.url) {
          index = i;
          break;
        }
      }

      return index;
    };

    for(var i=0; i<posts.length; i++) {
      var a = posts[i];
      var id = a.innerHTML.replace(/\D/g, "");
      var newo = {"url":a.href, "id":parseInt(id)};
      if(id && postIDs.indexOf(newo) == -1) postIDs.push(newo);
    }

    if(postIDs.length != 0) {
      var thumbs = createElement("div", {}, list);

      var getPosts = function() {
        var item = postIDs[postNum];

        query("/post/show.json?id="+item.id, "GET", function(post, x, t) {
          logIt("takedown#"+loc[3], "Checking post #"+post.id, (post.status?"Status: "+post.status:"Probably deleted"));

          if(post.status && post.status != "deleted") {
            var space = createElement("span", {className:"thumb", style:{display:"inline-block"}}, thumbs);

            createElement("a", {href:item.url, target:"_blank", className:"tooltip-thumb", onmouseover:function() {borosimageswitch("si"+post.id);}, innerHTML:
              '<img class="preview" id="i'+post.id+'" alt="'+makeTooltip(post)+'" title="'+makeTooltip(post)+'" src="'+post.preview_url+'" width="'+post.preview_width+'" height="'+post.preview_height+'" />'+
              '<span class="post-score" style="display:block">#'+post.id+'</span>'}, space);

            thumbs.appendChild(document.createTextNode(" "));
          }

          postNum++;
          if(postNum < postIDs.length)
            getPosts();
        }, "takedown", function(code) {
          postNum++;
          if(postNum < postIDs.length)
            getPosts();
        });
      };

      getPosts();
    }
  }

  // Subscriptions updater
  if((date > (window.localStorage.subscriptionsNextCheck || 0)) && !(settings.checkOnPosts && (loc[1] == "post" && loc[2] == "show"))) checkSubsUpdates();

  function checkSubsUpdates(onEnd) {
    var mode = 0, index = 0, url = "", page = 1, subsF = [], subsP = [], subPosts = [],
    check = function() {
      if(mode == 0) { // Check pools
        logIt("upd8r", "Updater: Pool mode", "Index: "+(index+1)+"/"+subsP.length);
        url = "/pool/show.json?id="+subsP[index].id;
      } else { // Check forums
        if(subsF[0]) {
          logIt("upd8r", "Updater: Forum mode", "Index: "+(index+1)+"/"+subsF.length);
          url = "/forum/index.json?parent_id="+subsF[index].id;
        } else {
          doneChecking();
          return;
        }
      }

      var subsLen = (mode == 0?subsP:subsF).length-1;
      query(url+"&page="+page, "GET", function(j, x, t) {
        var obj = (mode == 0 ? j.posts : j), i;

        if(obj.length == 0) {
          if(index < subsLen) {
            if(mode == 0) {
              subsP[index].posts = subPosts;
            } else {
              subsF[index].pages = Math.ceil(subPosts.length/30);
              subsF[index].newest_id = subPosts[subPosts.length-1];
            }

            // Advance to the next subscription
            index++;
            page = 1;
            subPosts = [];
            check();
          } else {
            if(mode == 0) {
              index = 0;
              page = mode = 1;
              subPosts = [];
              check();
            } else
              doneChecking();
          }

        } else {
          for(i = 0; i < obj.length; i++) subPosts.push(obj[i].id);
          page++;
          check();
        }
      }, "updater");
    },
    doneChecking = function() {
      updatePools(subsP);
      updateForums(subsF);
      if(onEnd) onEnd();
      window.localStorage.subscriptionsNextCheck = date+((settings.checkInterval || defset.checkInterval)*60000);
      notice("Done checking subscriptions. <a class='link' id='viewSubsUpdates'>Click here to view updates</a>");
      document.getElementById("viewSubsUpdates").addEventListener("click", function() {
        var dp = document.getElementById("notice").style;
        if(settings.enhanceNoticeError) dp.top = "-100%"; else dp.display = "none";

        var fp = createFloatingPanel(null, null), fph = fp.parentNode.style;
        fp.addCloseButton();
        fp.innerHTML = "<h2 class='panelTitle'>Recent updates</h2><div id='lstUpdates'></div>";
        fph.position = "fixed";
        fph.width = "30%";
        fph.minHeight = "200px";

        var ups, sub, subsPL = subsP.length, subsFL = subsF.length, lst = document.getElementById("lstUpdates");
        if(subsPL != 0) {
          createElement("div", {innerHTML:"<strong>Pools:</strong>", style:{marginTop:"1ex"}}, lst);
          for(ups=0; ups<subsPL, sub=subsP[ups]; ups++) {
            if(sub.last != sub.posts[sub.posts.length-1])
              createElement("div", {innerHTML:"<a href='/post/show/"+sub.last+"' target='_blank'>"+sub.name+"</a>", style:{marginLeft:"1em"}}, lst);
          }
        }

        if(subsFL != 0) {
          createElement("div", {innerHTML:"<strong>Forums:</strong>", style:{marginTop:"1ex"}}, lst);
          for(ups=0; ups<subsFL, sub=subsF[ups]; ups++) {
            if(sub.last_id < sub.newest_id)
              createElement("div", {innerHTML:"<a href='/forum/show/"+sub.id+"?page="+pages+"#p"+last_id+"' target='_blank'>"+sub.name+"</a>", style:{marginLeft:"1em"}}, lst);
          }
        }
      }, true);
    };

    // Prepare the subscriptions
    if(window.localStorage.poolSubscriptions) subsP = eval("("+window.localStorage.poolSubscriptions+")");
    if(window.localStorage.forumSubscriptions) subsF = eval("("+window.localStorage.forumSubscriptions+")");

    // Start checking
    if(subsP[0] || subsF[0]) {
      // Prevent other tabs or windows from checking for updates
      window.localStorage.subscriptionsNextCheck = 64060617600000; // 01/01/4000

      if(!subsP[0]) mode = 1;
      notice("Checking subscriptions");
      check();
    }
  };

  //0402
  var nao = new Date();
  if(nao.getDate() == 2 && nao.getMonth() == 3 && Math.round(Math.random()*24) == nao.getHours() && window.localStorage.apr02 != ":)") {
    var fp = createFloatingPanel(null, null);
    fp.parentNode.style.position = "fixed";
    fp.innerHTML = "<h2 class='panelTitle' id='dismissApr02'>An error occured</h2>"+
      "<p>An error occured inside your settings, this is probably caused by an incompatibility between this version's settings and an unused remnant from the previous vesion</p>"+
      "<p>Mind if I <em>try</em> to fix it?</p>"+
      "<div style='text-align:center'><input type='button' id='okay1' style='margin-right:1em;' value='No' /><input type='button' id='okay2' value='Nah' /></div>";

    document.getElementById("dismissApr02").addEventListener("click", fp.remove, true);
    var tryFix = function() {
      fp.remove();

      var wat = createElement("div", {id:"wat", style:{background:bg, boxShadow:"0px 0px 10px 2px #000"}}), b = document.body.childNodes;
      document.body.style.background = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGElEQVR42mP4DwXPoIBhgARgDJjEAAkAANyQ8oG3jzWJAAAAAElFTkSuQmCC') fixed";
      document.body.style.overflowX = "hidden";

      if(isChrome) {
        wat.style.webkitTransform = "scale(1, 1) skew(0deg, 0deg) rotate(0deg)";
        wat.style.webkitTransformOrigin = "50% "+(Math.floor(window.innerHeight/2)+window.scrollY)+"px";
        wat.style.webkitTransitionProperty = "webkit-transform";
        wat.style.webkitTransitionDuration = "500ms";
        wat.style.webkitTransitionTimingFunction = "ease";
        wat.style.webkitTransitionDelay = "0ms";
      } else {
        wat.style.transform = "scale(1, 1) skew(0deg, 0deg) rotate(0deg)";
        wat.style.transformOrigin = "50% "+(Math.floor(window.innerHeight/2)+window.scrollY)+"px";
        wat.style.transitionProperty = "transform";
        wat.style.transitionDuration = "500ms";
        wat.style.transitionTimingFunction = "ease";
        wat.style.transitionDelay = "0ms";
      }

      for(var w=0; w<b.length; w++) {if(!/(?:devbug_log|devbug_eval)/.test(b[w].id)) wat.appendChild(b[w]);}
      document.body.insertBefore(wat, document.body.firstChild);
      fp = createFloatingPanel(null, null);
      fp.parentNode.style.position = "fixed";
      fp.parentNode.style.textAlign = "center";
      fp.innerHTML = "<h2 class='panelTitle' id='watpls'></h2><span id='mmsg'>Correcting pool subscriptions&hellip;</span>";
      var tmpl = animatedIndicator(document.getElementById("watpls"), "span");
      var mmsg = document.getElementById("mmsg");

      var step = 0;
      var times = [2500, 2000, 5000, 4000, 1000, 800, 1000, 2000, 100, 100, 100, 100, 100, 100, 100, 2000, 3000, 2000, 500, 500, 2500, 5000, 3000, 2000, 2000, 3000, 10];
      var msgs =  ["Finding PMs", "Adjusting preferences", "Oops!", "<strong>Crap!</strong>", "", "<small>Wait, wait, wait... I got this...</small>", "<small>I just...</small>", "", "D'oh!", "", "", "", "", "", "", "", "Okay, don't panic&hellip;", "don't panic&hellip;", "<h4>PANIC!</h4>", "<h2>PANIC!</h2>", "", "&hellip;", "Ugh&hellip; fuck it&hellip;", "", "", "You know what?", "<input type='button' id='endwut1' style='margin-right:1em;' value='Okay' /><input type='button' id='endwut2' value='Really funny...' />"];
      var steps = times.length-1, ws = wat.style, trans = ["", ""];
      var pun = function() {
        fp.center();
        if(msgs[step] != "") mmsg.innerHTML = msgs[step];
        switch(step) {
          case 2:  trans = ["scale(1, 1) skew(30deg, 0deg) rotate(0deg)", "500ms"]; document.body.style.overflowY = "hidden"; break;
          case 3:  trans = ["scale(1, 1) skew(30deg, 0deg) rotate(180deg)", "5500ms"]; break;
          case 5:  trans = ["scale(1, 1) skew(0deg, 15deg) rotate(180deg)", "200ms"]; break;
          case 6:  trans = ["scale(1, 1) skew(0deg, deg) rotate(180deg)", "4000ms"]; break;
          case 7:  trans = ["scale(0.5, 0.5) skew(0deg, 0deg) rotate(0deg)", "1000ms"]; break;
          case 8:  trans = ["scale(3, 3) skew(10deg, -10deg) rotate(0deg)", "250ms"]; break;
          case 9:  trans = ["scale(3.2, 3.2) skew(-10deg, 10deg) rotate(0deg)", "100ms"]; break;
          case 10: trans = ["scale(3, 3) skew(10deg, -10deg) rotate(0deg)", "100ms"]; break;
          case 11: trans = ["scale(3.2, 3.2) skew(-10deg, 10deg) rotate(0deg)", "100ms"]; break;
          case 12: trans = ["scale(3, 3) skew(10deg, -10deg) rotate(0deg)", "100ms"]; break;
          case 13: trans = ["scale(3.2, 3.2) skew(-10deg, 10deg) rotate(0deg)", "100ms"]; break;
          case 14: trans = ["scale(3, 3) skew(10deg, -10deg) rotate(0deg)", "100ms"]; break;
          case 16: trans = ["scale(2.5, 2.5) skew(0deg, 0deg) rotate(0deg)", "3000ms"]; break;
          case 17: trans = ["scale(2, 2) skew(0deg, 0deg) rotate(45deg)", "2000ms"]; break;
          case 18: trans = ["scale(0.5, 0.5) skew(0deg, 0deg) rotate(90deg)", "500ms"]; break;
          case 19: trans = ["scale(0.25, 0.25) skew(0deg, 0deg) rotate(270deg)", "500ms"]; break;
          case 22: trans = ["scale(0.12, 0.12) skew(0deg, 0deg) rotate(270deg)", "500ms"]; break;
          case 23: trans = ["scale(0.05, 0.05) skew(0deg, 0deg) rotate(270deg)", "2000ms"]; break;
          case 24: trans = ["scale(0.1, 0.1) skew(0deg, 0deg) rotate(270deg)", "2000ms"]; break;
          case 25: trans = ["scale(0, 0) skew(0deg, 0deg) rotate(270deg)", "3000ms"]; break;
          case 26: {
            var endwut = function() {
              fp.remove();
              window.localStorage.apr02 = ":)";
              window.setTimeout(function(){window.location.reload();}, 2000);
            };
            window.clearInterval(tmpl);
            watpls.innerHTML = "Have a nice April 2<sup>nd</sup>!";
            watpls.marginBottom = "1em";
            document.getElementById("endwut1").addEventListener("click", endwut, true);
            document.getElementById("endwut2").addEventListener("click", endwut, true);
            break;
          }
        }

        if(isChrome) {
          ws.webkitTransform = trans[0];
          ws.webkitTransitionDuration = trans[1];
        } else {
          ws.transform = trans[0];
          ws.transitionDuration = trans[1];
        }

        if(step < steps) window.setTimeout(pun, times[step]);
        step++;
      };

      window.setTimeout(pun, 3000);
    };

    document.getElementById("okay1").addEventListener("click", tryFix, true);
    document.getElementById("okay2").addEventListener("click", tryFix, true);
  }

  /*****************************************************************************************************************
  *****************************************************************************************************************/

  function createFormattingButtons(textareaID) {
    var responseArea = document.getElementById(textareaID);
    logIt("fbtns", "Creating formatting buttons for: \""+textareaID+"\"", "");

    if(responseArea) {
      responseArea.parentNode.style.width = "99%"; // Stretch the box container
      responseArea.style.width = "100%"; // Make it fit the whole width
      responseArea.style.fontFamily = "Tahoma, Geneva, Sans-Serif"; // Switch to a non-monospaced font
      responseArea.style.fontSize = "10pt"; // with a relatively normal height
      if(!responseArea.style.height) responseArea.style.height = "200px"; // and a tad higher if it doesn't have any size defined

      if(settings.submitOnCtrlEnter) {
        responseArea.addEventListener("keyup", function(event) {
          if(event.ctrlKey && event.keyCode == 13) this.form.submit();
        });
      }

      var newButton;
      var fbtns = createElement("div", {className:"formattingButtons", id:"fbtns_"+textareaID});

      fbtns.ondblclick = function() {
        var btop = this.firstChild.firstChild.offsetTop-6;
        var fpBtns = createFloatingPanel(this.firstChild.firstChild);
        fpBtns.className = "formattingButtons";
        fpBtns.parentNode.ignore = true;
        fpBtns.parentNode.style.position = "fixed";
        fpBtns.parentNode.style.top = (btop-window.pageYOffset)+"px";
        fpBtns.appendChild(fbtns.firstChild);

        var dragMove = function(event) {
          if(fp.dragging) {
            var pos = {"x":(event.clientX-fp.click.x), "y":(event.clientY-fp.click.y)};
            fp.style.left = pos.x+"px";
            fp.style.top = pos.y+"px";
          }
        }

        var fp = fpBtns.parentNode;
        fp.click = {"x":0, "y":0};
        fp.ondblclick = function() {
          fpBtns.remove();
          fbtns.appendChild(fpBtns.firstChild);
          document.body.removeEventListener("mousemove", dragMove, false);
        };
        fp.onmousedown = function(event) {
          event.preventDefault();
          fp.click = {"x":(event.clientX-fp.offsetLeft), "y":(event.clientY-fp.offsetTop)};
          fp.dragging = true;
          return false;
        };
        fp.onmouseup = function(event) {
          fp.dragging = false;
        };
        document.body.addEventListener("mousemove", dragMove, false);
      };

      var tbDiv = document.createElement("div");

      newButton = createElement("input", {type:"button", value:"B", title:"Make text bold", style:{fontWeight:"bold"}}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[b]", "[/b]", "");}, true);

      newButton = createElement("input", {type:"button", value:"I", title:"Make text italic", style:{fontStyle:"italic"}}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[i]", "[/i]", "");}, true);

      newButton = createElement("input", {type:"button", value:"S", title:"Strike text", style:{textDecoration:"line-through"}}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[s]", "[/s]", "");}, true);

      newButton = createElement("input", {type:"button", value:"Spoiler", title:"Spoil something"}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[spoiler]", "[/spoiler]", "");}, true);

      newButton = createElement("input", {type:"button", value:"Heading", title:"Add a heading"}, tbDiv);
      newButton.addEventListener("click", function() {
        var cb = createFloatingPanel(this, false);
        cb.style.textAlign = "center";

        for(var i=0; i<6; i++) {
          createElement("h"+(i+1), {className:"option", innerHTML:"H"+(i+1), val:i+1, onclick:function() {
            responseArea.add("h"+this.val+".", "", "");
          }}, cb);
        }
      }, true);

      // Just Priv+ users (above level 20) can enjoy this. Ironically, I can't :/
      if(window.localStorage.userLV > 20 || (loc[1] == "set" && (loc[2] == "new" || loc[2] == "edit") ) ) {
        newButton = createElement("input", {type:"button", value:"Color", title:"Colorize text"}, tbDiv);
        newButton.addEventListener("click", function() {
          var c = ["#000","#808080","#800000","#808000","#008000","#008080","#000080","#800080","#808040","#004040","#0080FF","#004080","#8000FF","#804000","#FFF","#CCC","#F00","#FF0","#0F0","#0FF","#00F","#F0F","#FFFF80","#00FF80","#80FFFF","#8080FF","#FF0080","#FF8040"];
          var cb = createFloatingPanel(this, false);
          cb.style.lineHeight = "1px";

          for(var i=0; i<c.length; i++) {
            createElement("span", {className:"colorTile", style:{backgroundColor:c[i]}, color:c[i], onclick:function() {
              responseArea.add("[color="+(this.color)+"]", "[/color]", "");
            }}, cb);

            if(i+1 == c.length/2) createElement("br", {}, cb);
          }
        }, true);
      }

      if(settings.singleline === false) createElement("br", {}, tbDiv);

      newButton = createElement("input", {type:"button", value:"Wiki", title:"Add a link to an entry page on the wiki"}, tbDiv);
      newButton.addEventListener("click", function() {
        var selection = getSelection(responseArea);
        var fp = createFloatingPanel(this, true);
        fp.innerHTML = '<div id="grpWikipage"><label for="wikipage">Wiki Page:</label><br/>'+
          '<input type="text" id="wikipage" value="" /><br/></div>'+
          '<label for="wikititle">Title:</label><br/>'+
          '<input type="text" id="wikititle" value="" placeholder="(Optional)" />'+
          '<div style="text-align:center; margin-top:1em"><input type="button" id="okay" value="OK" /></div>';

        document.getElementById("okay").addEventListener("click", function() {
          var wpage = document.getElementById("wikipage").value;
          var wtitle = document.getElementById("wikititle").value;
          if(wpage != "") responseArea.add("[[", "]]", wpage+(wtitle==""?"":"|"+wtitle));
          hidePanels();
        }, true);

        document.getElementById("grpWikipage").style.display = (selection[0] == selection[1]?"block":"none");
        document.getElementById("wikipage").focus();
      }, true);

      newButton = createElement("input", {type:"button", value:"Tag", title:"Add a link to a tag search"}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("{{", "}}", "");}, true);

      newButton = createElement("input", {type:"button", value:"Quote", title:"Insert a quote block"}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[quote]", "[/quote]", "");}, true);

      newButton = createElement("input", {type:"button", value:"Code", title:"Insert a piece of code"}, tbDiv);
      newButton.addEventListener("click", function(){responseArea.add("[code]", "[/code]", "");}, true);

      newButton = createElement("input", {type:"button", value:"Section", title:"Separate with a section"}, tbDiv);
      newButton.addEventListener("click", function() {
        var fp = createFloatingPanel(this, true);
        fp.innerHTML = '<label for="stitle">Section title:</label><br/>'+
          '<input type="text" id="stitle" value="" size="30" placeholder="(Optional)" />'+
          '<br/><input type="checkbox" id="expand" /><label for="expand">Expand by default</label>'+
          '<div style="text-align:center; margin-top:1em"><input type="button" id="okay" value="OK" /></div>';

        var okbtn = document.getElementById("okay")
        okbtn.addEventListener("click", function() {
          var stitle = document.getElementById("stitle").value;
          var expand = document.getElementById("expand").checked;
          responseArea.add("[section"+(expand?",expanded":"")+(stitle!=""?"="+stitle:"")+"]", "[/section]", "");
          hidePanels();
        }, true);
        okbtn.focus();
      }, true);

      newButton = createElement("input", {type:"button", value:"Link", title:"Add a link to another page"}, tbDiv);
      newButton.addEventListener("click", function() {
        var selection = getSelection(responseArea);
        var fp = createFloatingPanel(this, true);
        fp.innerHTML = '<label for="url">Enter the URL of the page'+
          (selection[0]!=selection[1]?' for<div style="box-shadow:1px 2px 4px #000 inset; border-radius:4px; padding:4px;">'+responseArea.value.substr(selection[0], selection[1]-selection[0])+'</div>':':')+'</label><br/>'+
          '<input type="url" id="url" value="" size="50" /><br/>'+
          '<div id="grpTitle"><label for="title">Title</label><br/>'+
          '<input type="text" id="title" value="" size="50" /></div>'+
          '<div style="text-align:center; margin-top:1em"><input type="button" id="okay" value="OK" /></div>';

        document.getElementById("grpTitle").style.display = (selection[0] == selection[1]?"block":"none");
        document.getElementById("okay").addEventListener("click", function() {
          var url = document.getElementById("url").value;
          var title = document.getElementById("title").value;
          if(url != "") responseArea.add('"', '":'+url, title);
          hidePanels();
        }, true);

        document.getElementById("url").focus();
      }, true);

      fbtns.appendChild(tbDiv);
      responseArea.parentNode.insertBefore(fbtns,responseArea);
      return responseArea;
    } else {
      logIt("fbtns", "Error creating formatting buttons for: \""+textareaID+"\"", "Couldn't find textbox");
      return null;
    }
  }

  /* add(textarea, open, close, preset)
      Adds 'open' at the end of the text that is inside the defined text area (before the selection,
      if it's any). Same for 'close', except that it will be after 'open' (after the selected text,
      again, if it was any).

      Parameters:
        textarea  The target textarea
        open          The opening tag to be added before the selected text
        close         The closing tag to be added after the selected text
        preset        The text that has been inserted using a pop-up box. Currently, this is only used
                      for the "Wiki" button. */
  HTMLTextAreaElement.prototype.add = function(open, close, preset) {
    var text = this.value;
    var selection = this.getSelection();
    var scroll = this.scrollTop;
    var left, right;
    var endtag;
    var sel = text.substring(selection[0], selection[1]);

    if(selection[0] == selection[1]) {
      left = text.substring(0, selection[0])+open;
      this.value = left+preset+close+text.substring(selection[1], text.length);
      this.selectionStart = left.length;
      this.selectionEnd = this.selectionStart+preset.length;
    } else {
      left = text.substr(0, selection[0]);
      right = text.substr(selection[1], text.length);

      this.value = left+open+sel+close+right;
      this.selectionStart = left.length+open.length;
      this.selectionEnd = this.selectionStart+sel.length;
    }

    this.scrollTop = scroll;
    this.focus();
  }

  /* getSelection(textarea)
      Returns the selection start and end of the textarea element as an array (start, end) */
  HTMLTextAreaElement.prototype.getSelection = function() {
    return [this.selectionStart, this.selectionEnd];
  }

  /* blacklistTag(tag)
      Adds to the user blacklist the tag defined or the current post if there is no tag */
  window.blacklistTag = function(tag) {
    var blTags = decodeURIComponent(cookies.blacklisted_tags);
    blTags = encodeURIComponent(blTags.replace(/\+/g, " ")+"&"+(tag?tag:"id:"+loc[3])).replace(/%26/g, "%0D%0A");

    notice("Adding "+(tag?"'"+tag.replace(/user:/g, "")+"'":"post #"+loc[3])+" to blacklist");
    query("/user/update.json?user[blacklisted_tags]="+blTags, "POST", function(j, x, t) {
      if(j.success == true) {
        notice((tag?"'"+tag.replace(/user:/g, "")+"'":"Post #"+loc[3])+" blacklisted");
      } else {
        error("Error blacklisting "+(tag?"'"+tag.replace(/user:/g, "")+"'":"post #"+loc[3])+(j.reason?": "+j.reason:""));
      }
    }, "blacklistTag", function(code) {
      error("Error blacklisting "+(tag?"'"+tag.replace(/user:/g, "")+"'":"post #"+loc[3]));
    });/**/
  };

  /* fixUsername()
      Fixes the username (stored in cookies.login) by replacing spaces with an undescore and
      returns it */
  function fixUsername() {
    return (cookies.login?cookies.login.toLowerCase().replace(" ","_"):"");
  }

  /* parseCookies()
      Parses all of the current website cookies and returns a JSON object based off of them for
      easier access to each cookie.

      Returns:
        A JSON Object with all of the cookies' names as attributes of that object. Note that
        changing the value of an attribute of this object will not change the actual cookie.
        Unfortunately. For that, [document.cookie = "{cookie name}={value}";] is still an
        option. */
  function parseCookies() {
    var q = document.cookie.split("; "); // Open cookie jar and separate cookies
    var v = "({";

    // Divide cookies
    for(var i=0; i<q.length; i++) {
      var p = q[i].split("=");
      v += '"'+p[0]+'":"'+p[1]+'",';
    }

    // Share cookies
    return eval("/*Cookie parser*/\n"+v.substr(0, v.length-1)+"})");
  }

  function parseQuery() {
    var s = location.search;
    var q = s.substr(1, s.length).split("&");
    var v = "({";

    for(var i=0; i<q.length; i++) {
      var p = q[i].split("=");
      v += "\""+p[0]+"\":\""+p[1]+"\",";
    }

    return eval("/*Page query parser*/\n"+v.substr(0, v.length-1)+"})");
  }

  /* query(url, callback, grouptag)
      Makes a request for a resource on a website and executes the callback with the responseText
      and responseXML as a JSON Object and a DOM Object (respectively) as parameters.

      Parameters:
        url       The url of the resource to request
        callback  The callback to execute when the request is received (State=200 and Status=4)
        grouptag  Tag to group similar requests (to minimize DevBug entries) */
  function query(url, method, callback, grouptag, onError) {
    if(!url || !callback) throw "Query error: URL or Callback are missing";

    var req = new window.XMLHttpRequest();
    var gtag = grouptag || url;

    logIt(gtag, "Query: "+url+" ("+method+")", "Request initiated");
    req.onreadystatechange = function() {
      if(req.readyState == 4) {
        switch(req.status) {
          case 200: {
            logIt(gtag, "Query: "+url+" ("+method+")", "Request OK");
            var json, text = req.responseText;

            try {json = eval("/*Query: Parse to JSON Object*/\n("+text+")");}
            catch (except) {json = null;}

            try {
              callback(json, req.responseXML, text);
            } catch(except) {
              logIt(gtag, "Query: "+url, "Callback error\n"+except.name+"\n"+except.message+(except.lineNumber?"\nLine: "+except.lineNumber:""));
            }
            break;
          }

          case 403: logIt(gtag, "Query: "+url+" [Forbidden]", "Access denied"); if(onError) {onError(403)}; break;
          case 404: logIt(gtag, "Query: "+url+" [Not Found]", "Not found"); if(onError) {onError(404)}; break;
          case 420: logIt(gtag, "Query: "+url+" [Invalid Record]", "Record could not be saved"); if(onError) {onError(420)}; break;
          case 421: logIt(gtag, "Query: "+url+" [User Throttled]", "User is throttled, try again later"); if(onError) {onError(421)}; break;
          case 422: logIt(gtag, "Query: "+url+" [Locked]", "The resource is locked and cannot be modified"); if(onError) {onError(422)}; break;
          case 423: logIt(gtag, "Query: "+url+" [Already Exists]", "Resource already exists"); if(onError) {onError(423)}; break;
          case 424: logIt(gtag, "Query: "+url+" [Invalid Parameters]", "The given parameters were invalid"); if(onError) {onError(424)}; break;
          case 500: logIt(gtag, "Query: "+url+" [Internal Server Error]", "Some unknown error occurred on the server"); if(onError) {onError(500)}; break;
          case 503: logIt(gtag, "Query: "+url+" [Service Unavailable]", "Server cannot currently handle the request, try again later"); if(onError) {onError(503)}; break;
        }
      }
    };

    try {
      req.open(method, url, true);
      req.send();
    } catch (except) {
      logIt(gtag, "Query: "+url, "Error: "+except);
    }
  }

  /* writeSettings() - Writes the settings into the localStorage */
  function writeSettings() {
    if(window.localStorage) {
      // Set states according to their respective checkboxes
      var fixedUserBar = document.getElementById("ee_fixedUserBar").checked,
      singleline = document.getElementById("ee_singleline").checked,
      allfaves = document.getElementById("ee_allfaves").checked,
      showdmails = document.getElementById("ee_showdmails").checked,
      hiliteur = document.getElementById("ee_hiliteur").checked,
      hilitebc = document.getElementById("ee_hilitebc").checked,
      tinyPrefix = document.getElementById("taPrefix").value,
      unixLE = document.getElementById("ee_unixLE").checked,
      submitOnCtrlEnter = document.getElementById("ee_submitOnCtrlEnter").checked,
      enhanceNoticeError = document.getElementById("ee_enhanceNoticeError").checked,
      uselog = document.getElementById("ee_uselog").checked,
      floatinglog = document.getElementById("ee_floatinglog").checked,
      checkInterval = document.getElementById("eeCheckInterval").value,
      checkOnPosts = document.getElementById("eeCheckOnPosts").checked,
      prevKey = document.getElementById("ee_prevKey").name,
      nextKey = document.getElementById("ee_nextKey").name;

      // Store the settings
      window.localStorage.settings = '({"version":"'+defset.version+'"'+
        ', "saveVersion":'+defset.saveVersion+
        ', "fixedUserBar":'+fixedUserBar+
        ', "singleline":'+singleline+
        ', "allfaves":'+allfaves+
        ', "showdmails":'+showdmails+
        ', "hiliteur":'+hiliteur+
        ', "hilitebc":'+hilitebc+
        ', "unixLE":'+(!unixLE)+
        ', "submitOnCtrlEnter":'+submitOnCtrlEnter+
        ', "enhanceNoticeError":'+enhanceNoticeError+
        ', "tinyPrefix":"'+tinyPrefix+'"'+
        ', "tinyAlias":'+TinyAlias.toString()+
        ', "checkInterval":'+checkInterval+
        ', "checkOnPosts":'+checkOnPosts+
        ', "uselog":'+uselog+
        ', "floatinglog":'+floatinglog+
        ', "poolPrevKey":'+prevKey+
        ', "poolNextKey":'+nextKey+'})';

      // Clear the settings alert
      window.localStorage.alertedVersion = defset.saveVersion;
      window.localStorage.nextAlert = 0;

      // Save the custom links
      var ls = [], itm, lst = document.getElementById("lstLinks").childNodes;

      for(var i=0; i<lst.length; i++) {
        itm = lst[i].dataset;
        ls.push('{"title":"'+itm.title+'", "url":"'+itm.url+'"}');
      }
      window.localStorage.ubLinks = "["+ls+"]";

      // Save subscriptions
      ls = []; lst = document.getElementById("lstForums").childNodes;
      for(var i=0; i<lst.length; i++) {
        ls.push(lst[i].value);
      }
      window.localStorage.forumSubscriptions = "["+ls+"]";

      ls = []; lst = document.getElementById("lstPools").childNodes;
      for(var i=0; i<lst.length; i++) {
        ls.push(lst[i].value);
      }
      window.localStorage.poolSubscriptions = "["+ls+"]";

      // Let the user know that the settings have been saved
      var m = document.getElementById("ee_msgSaved").style;
      m.display = "inline";
      window.setTimeout(function() {m.display = "none";}, 1000);
    } else {
      window.alert("localStorage is disabled in your browser");
    }
    document.getElementById("ee_btnSave").disabled = true;
  }

  /* createFloaingPanel(parent, closeButton)
      Creates a new floating panel with a close button (if specified) and a DIV and returns the DIV
      to add a content.

      Parameters:
        parent       The parent object from which retrieve its position and size
        closeButton  Indicates if a close button should be used (true) instead of closing the panel
                     by clicking anywhere else (false) */
  function createFloatingPanel(parent, closeButton) {
    var rect = {"x":0, "y":0, "w":64, "h":16};

    if(parent != null) {
      var r = parent.getBoundingClientRect();
      rect = {"x":(r.left+window.pageXOffset)-6, "y":(r.top+window.pageYOffset)-6, "w":(r.right-r.left)+4, "h":(r.bottom-r.top)+4};
    }

    var floatingPanel = createElement("div", {className:"floatingPanel rounded", style:{left:rect.x+"px", top:rect.y+"px", minWidth:rect.w+"px", minHeight:rect.h+"px"}}, document.body);
    var floatingContent = createElement("div", {className:"floatingContent"}, floatingPanel);
    floatingContent.center = function() { // Utility function to center the panel
      var dis = this.parentNode;
      window.setTimeout(function() {
        dis.style.left = ((window.innerWidth/2)-(dis.offsetWidth/2))+"px";
        dis.style.top = ((window.innerHeight/2)-(dis.offsetHeight/2))+"px";
      }, 1);
    };

    floatingContent.addCloseButton = function(beforeClose) {
      createElement("small", {className:"close", innerHTML:"X", title:"Click to close", onclick:function() {
        if(beforeClose) beforeClose();
        floatingContent.remove();
      }}, this.parentNode);
    };

    floatingContent.remove = function() {
      floatingPanel.style.opacity = 0;
      window.setTimeout(function(){document.body.removeChild(floatingPanel);}, 250);
    }

    switch(closeButton) {
      case true: floatingContent.addCloseButton(null); break;
      case false: document.body.addEventListener("click", hidePanels, true); break;
      case null: floatingContent.center(); break;
    }

    return floatingContent;
  }

  /* hidePanels()
      Hides (removes from the document, actually) all floating panels that are in the page */
  function hidePanels() {
    var i, fps = document.querySelectorAll(".floatingPanel .floatingContent");

    for(i=0; i<fps.length; i++) {
      var fp = fps[i];
      if(fp && !fp.ignore) fp.remove();
    }

    document.body.removeEventListener("click", hidePanels, true);
  }

  function animatedIndicator(elem, tag) {
    var ssym = ["\u25E2","\u25E3","\u25E4","\u25E5"];
    var sstp = 0;

    if(tag) elem.innerHTML = "<"+tag+">"+ssym[0]+" Please wait...</"+tag+">";
    else elem.value = ssym[0]+" Please wait..."

    return window.setInterval(function() {
      sstp = (sstp==3?0:sstp+1);
      if(tag) elem.innerHTML = "<"+tag+">"+ssym[sstp]+" Please wait...</"+tag+">";
      else elem.value = ssym[sstp]+" Please wait..."
    }, 250);
  }

  function initPool(elem, id) {
    elem.disabled = true;

    var stim = animatedIndicator(elem, null), poolID = parseInt(id), page = 1, poolPosts = [], poolName = "";
    var loadPool = function() {
      query("/pool/show.json?id="+poolID+"&page="+page, "GET", function(json, xml, text) {
        if(json.posts.length != 0) {
          for(var i=0; i<json.posts.length; i++) {poolPosts.push(json.posts[i].id);}
          page++;
          loadPool();
        } else {
          poolName = json.name;
          poolReady();
        }
      }, "poolpager");
    };

    var poolReady = function() {
      window.clearInterval(stim);
      elem.value = "Ready";
      var newob;
      if(loc[1] == "post" && loc[2] == "show") {
        newob = {"id":poolID,"name":poolName,"posts":poolPosts,"last":loc[3]};
        setPoolSpace();
      } else {
        newob = {"id":poolID,"name":poolName,"posts":poolPosts,"last":poolPosts[0]};
        location.assign("/post/show/"+poolPosts[0]);
      }
      updatePoolSubscriptions(newob);
    };

    loadPool();
  }

  function setPoolSpace() {
    var subs = (window.localStorage.poolSubscriptions?eval("("+window.localStorage.poolSubscriptions+")"):[]);
    var poolSpc = null;
    var active, pool = subs.findItem(function(item) {
      poolSpc = document.getElementById("pool"+item.id);
      return (poolSpc != null);
    });

    if(poolSpc) {
      var su = subs[pool], posts = su.posts, ob = '{"id":'+su.id+',"name":"'+su.name+'","posts":['+posts+'],"last":'+su.last+'}',
      index = posts.indexOf(Number(loc[3])),
      pk = String.fromCharCode(settings.poolPrevKey || defset.poolPrevKey),
      nk = String.fromCharCode(settings.poolNextKey || defset.poolNextKey);

      var poolNav = createElement("div", {dataset:{ref:ob}, style:{textAlign:"center"}}, poolSpc),
      active = createElement("div", {innerHTML:
        (index>0?"<span style='float:left' id='ee_poolPrevPage' title='Press \""+pk+"\" to go to the previous page'>[&#9668;<span style='font-weight:bold;'>"+pk+"</span>]</span>":"")+
        "Page "+(index+1)+" of "+posts.length+""+
        (index<posts.length-1?"<span style='float:right' id='ee_poolNextPage' title='Press \""+nk+"\" to go to the next page'>[<span style='font-weight:bold;'>"+nk+"</span>&#9658;]</span>":"")+
        "<br/><input type='button' class='small' value='Stop reading' id='ee_btnStop' />"}, poolNav);

      document.getElementById("ee_btnStop").addEventListener("click", function() {
        subs.splice(pool, 1);
        updatePools(subs);
        $j(active).slideUp(function(){poolNav.parentNode.removeChild(poolNav);});
      }, true);

      window.addEventListener("keydown", function(event) {
        var tag = event.target.tagName, nextPost;

        if(tag != "INPUT" || tag != "TEXTAREA") {
          if(event.keyCode == settings.poolPrevKey && index != 0) {
            nextPost = posts[index-1], subs[pool].last = nextPost;
            updatePools(subs);
            document.getElementById("ee_poolPrevPage").className = "greentext";
            location.assign("/post/show/"+nextPost);
          }
          if(event.keyCode == settings.poolNextKey && index != posts.length-1) {
            nextPost = posts[index+1], subs[pool].last = nextPost;
            updatePools(subs);
            document.getElementById("ee_poolNextPage").className = "greentext";
            location.assign("/post/show/"+nextPost);
          }
        }
      }, true);
    }
  }

  function findUsersPMd() {
    var page = 1, userIDs = [], userIDindex = 0, fp2 = createFloatingPanel(null, null),
      fpTitle = createElement("div", {}, fp2), fpMessage = createElement("div", {}, fp2);
    fp2.style.textAlign = "center";

    var getPMs = function() {
      logIt("pms", "Getting PMs", "");
      query("/dmail/inbox.json?page="+page+"&visibility=all", "GET", function(json, xml, text) {
        if(json.length > 0) {
          for(var i=0; i<json.length; i++) {
            var uid = json[i].to_id;
            if(userIDs.indexOf(uid) == -1) userIDs.push(uid);
          }
          page++;
          getPMs();
        } else {
          fpMessage.innerHTML = "Finding users";
          findUser();
        }
      }, "pmdpager");
    };

    var findUser = function() {
      if(userIDs.length == 0) {
        logIt("usrs", "Finding users", "No users found");
        window.clearInterval(stim);
        fp2.center();
        fp2.innerHTML = "<h3 class='panelTitle'>No users found</h3><small>Have you PM'd somebody lately?</small>";
        var tth = window.setTimeout(hidePanels, 2000);
        document.body.addEventListener("click", function() {
          if(tth) window.clearTimeout(tth);
          hidePanels();
        }, true);
      } else {
        logIt("usrs", "Finding user", "User ID: "+userIDs[userIDindex]);
        query("/user/index.json?id="+userIDs[userIDindex], "GET", function(json, xml, text) {
          var user = json[0];
          if(userIDs[userIDindex] == user.id && userslist.indexOf(user.name) == -1 && user.id != window.localStorage.userID) userslist.push(user.name);
          userIDindex++;

          if(userIDindex < userIDs.length) {
            findUser();
          } else {
            window.clearInterval(stim);
            fp2.center();
            fpTitle.innerHTML = "<h2>Done</h2>";
            fpMessage.innerHTML = userslist.length+" users found";
            var tth = window.setTimeout(hidePanels, 2000);
            document.body.addEventListener("click", function() {
              if(tth) window.clearTimeout(tth);
              hidePanels();
            }, true);
            logIt("usrs", "Users list", userslist.length+" users");
            window.localStorage.lastDMailed = userslist;
          }
        }, "userspager");
      }
    };

    var stim = animatedIndicator(fpTitle, "h2");
    getPMs();
    fpMessage.innerHTML = "Checking PMs";
  }

  function updatePoolSubscriptions(ns, remove) {
    if(window.localStorage.poolSubscriptions && window.localStorage.poolSubscriptions != "[]") {
      var subs = eval("("+window.localStorage.poolSubscriptions+")");
      if(remove) subs.splice(subs.indexOf(ns), 1); else subs.push(ns);
      updatePools(subs);
    } else {
      window.localStorage.poolSubscriptions = '[{"id":'+ns.id+',"name":"'+ns.name+'","posts":['+ns.posts.join(",")+'],"last":'+ns.last+'}]';
    }
  }

  function updateForumSubscriptions(ns, remove) {
    if(window.localStorage.forumSubscriptions && window.localStorage.forumSubscriptions != "[]") {
      var subs = eval("("+window.localStorage.forumSubscriptions+")");
      if(remove) subs.splice(subs.indexOf(ns), 1); else subs.push(ns);
      updateForums(subs);
    } else {
      window.localStorage.forumSubscriptions = '[{"id":'+ns.id+',"name":"'+ns.name+'","pages":'+ns.pages+',"newest_id":'+ns.newest_id+',"last_id":'+ns.last_id+'}]';
    }
  }

  function updatePools(subs) {
    var s = [], i, su;
    for(i=0; i<subs.length; i++) {
      su = subs[i];
      s.push('{"id":'+su.id+',"name":"'+su.name+'","posts":['+su.posts.join(",")+'],"last":'+su.last+'}');
    }
    window.localStorage.poolSubscriptions = "["+s+"]";
  }

  function updateForums(subs) {
    var s = [], i, su;
    for(i=0; i<subs.length; i++) {
      su = subs[i];
      s.push('{"id":'+su.id+',"name":"'+su.name+'","pages":'+su.pages+',"newest_id":'+su.newest_id+',"last_id":'+su.last_id+'}');
    }
    window.localStorage.forumSubscriptions = "["+s+"]";
  }

  function makeTooltip(post) {
    return post.tags+
      "\n\nRating: "+(post.rating=="s"?"Safe":(post.rating=="q"?"Questionable":"Explicit"))+
      (post.score?"\nScore: "+post.score:"")+
      "\nUser: "+post.author+
      (post.created_at?"\nDate: "+parse_eSix_time(post.created_at):"");
  }

  function parse_eSix_time(time) {
    var mm, dd, d = new Date(time.s*1000);

    switch(d.getMonth()) {
      case  0: mm="January"; break;
      case  1: mm="February"; break;
      case  2: mm="March"; break;
      case  3: mm="April"; break;
      case  4: mm="May"; break;
      case  5: mm="June"; break;
      case  6: mm="July"; break;
      case  7: mm="August"; break;
      case  8: mm="September"; break;
      case  9: mm="October"; break;
      case 10: mm="November"; break;
      case 11: mm="December"; break;
    }

    dd = d.getDate();

    return mm+" "+(dd<10?"0"+dd:dd)+", "+d.getFullYear();
  }

  /* logIt(tag, title, message)
      Adds a new log to the error console with the title and the message arranged in separate lines.
      If the DevBug extension exists, it will create a new DevLog entry with the title and the
      message specified */
  function logIt(tag, title, message) {
    if(settings.uselog) {
      if(window.devbug) {
        new window.devbug("{eSixExtend} "+tag, "{eSixExtend} "+title.replace(/\n/gm, "<br/>"), message.replace(/\n/gm, "<br/>"), false);
      } else {
        console.log("{eSixExtend} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):""));

        if(settings.floatinglog) {
          var dbg = document.getElementById("dbgTextarea");
          if(!dbg) {
            createElement("pre", {id:"dbgTextarea", style:{display:"block", border:"1px dashed #000", color:"#000", backgroundColor:"#FFF", overflow:"auto", position:"fixed", left:"1em", bottom:"1em", right:"auto", top:"auto", width:"80%", fontSize:"1em", lineHeight:"1em", height:"2em", zIndex:"10", fontFamily:"Monospace"},
              innerHTML:"", onclick:function() {
              this.style.height = (this.style.height=="25%"?"2em":"25%");
            }}, document.body);
          }

          var d = new Date();
          var h = d.getHours();
          var m = d.getMinutes();
          var s = d.getSeconds();
          dbg.innerHTML += (dbg.innerHTML.length>0?"\n\n":"")+"["+(h<10?"0"+h:h)+":"+(m<10?"0"+m:m)+":"+(s<10?"0"+s:s)+"] {eSixExtend} "+title+(message?"\n\t"+message.replace(/\n/gm, "\n\t"):"");
          dbg.scrollTop = dbg.scrollHeight;
        }
      }
    }
  }

  // Helper for document.createElement
  function createElement(tag, attrs, appendTo) {
    if(!tag) throw new SyntaxError("'tag' not defined");

    var ele = document.createElement(tag), attrName, styleName, dataName;
    if(attrs) for(attrName in attrs) {
      if(attrName === "style")   for(styleName in attrs.style) {ele.style[styleName] = attrs.style[styleName];} else
      if(attrName === "dataset") for(dataName in attrs.dataset) {ele.dataset[dataName] = attrs.dataset[dataName];} else
        ele[attrName] = attrs[attrName];
    }

    if(appendTo) appendTo.appendChild(ele);

    return ele;
  }

  // Override default 'notice()' and 'error()' functions, if allowed to
  if(settings.enhanceNoticeError == true) {
    var divNotice = document.getElementById("notice"), divError = document.getElementById("error"), ntv, etv;

    window.notice = function(msg) {
      divNotice.innerHTML = "<div style='margin-right:2em'>"+msg+"</div><div style='cursor:pointer; position:absolute; right:10px; top:5px;' onclick='this.parentNode.style.top=\"-100%\"'>X</div>";
      if(divNotice.style.top == "0%") {
        divNotice.style.borderColor = "#0F0";
        ntv = "top 200ms ease 0ms";
        if(isChrome) divNotice.style.webkitTransition = ntv; else divNotice.style.transition = ntv;
        window.setTimeout(function() {
          ntv = "top 200ms ease 0ms, border-color 500ms ease 0ms";
          if(isChrome) divNotice.style.webkitTransition = ntv; else divNotice.style.transition = ntv;
          divNotice.style.borderColor = "";
        }, 1);
      } else {
        divNotice.style.top = "0%";
      }
      divError.style.top = "-100%";
    };

    window.error = function(msg) {
      divError.innerHTML = "<div style='margin-right:2em'>"+msg+"</div><div style='cursor:pointer; position:absolute; right:10px; top:5px;' onclick='this.parentNode.style.top=\"-100%\"'>X</div>";
      if(divError.style.top == "0%") {
        divError.style.borderColor = "#F00";
        etv = "top 200ms ease 0ms";
        if(isChrome) divError.style.webkitTransition = etv; else divError.style.transition = etv;
        window.setTimeout(function() {
          etv = "top 200ms ease 0ms, border-color 500ms ease 0ms";
          if(isChrome) divError.style.webkitTransition = etv; else divError.style.transition = etv;
          divError.style.borderColor = "";
        }, 1);
      } else {
        divError.style.top = "0%";
      }
      divNotice.style.top = "-100%";
    };

    if(divNotice.style.display == "") {
      notice(divNotice.innerHTML.split("<div")[0]);
    }

    if(divError.style.display == "") {
      error(divError.innerHTML.split("<div")[0]);
    }
  }

})();
