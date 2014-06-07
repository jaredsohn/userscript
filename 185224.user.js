// ==UserScript==
// @name           FBOnlineNow
// @namespace      FBOnlineNow
// @include        http://*.facebook.com*
// @exclude        http://*.facebook.com/login.php*
// @exclude        http://en-gb.facebook.com/*
// @description    Log out of Facebook Chat and still see who is online.
// @author         http://userscripts.org/users/106030
// @version        0.2.3
// ==/UserScript==

// Modified version of
// http://userscripts.org/scripts/show/36083
// http://userscripts.org/scripts/show/19450
// http://userscripts.org/scripts/show/23499

var goodUrl = true;
init();
function init() {
  if (!document.body) { window.setTimeout(function(){init();}, 300); }
  if (window != window.top) return;  // Don't run in a frame
  if ($('loginform')) return; // Don't run if not logged in
  MenuCommands();
  if (GM_getValue('ShowPopUp', true)) { createChatMenu(); }
  facebookOnlineNow();
}

function facebookOnlineNow() {
 var urls = ["http://apps.facebook.com/invisible/",
            "http://apps.facebook.com/invisible/?",
         "http://apps.facebook.com/invisible/?ref=bookmarks",
        "http://apps.facebook.com/invisible/?ref=bookmarks&count=0"];
  var urlIndex = GM_getValue('UrlIndex', 0);
  if (!goodUrl) {
  urlIndex++;
   if (urlIndex >= urls.length) urlIndex = 0;
   GM_setValue('UrlIndex', urlIndex);
  }
  goodUrl = false;
  GM_xmlhttpRequest({
    method:"GET",
    url:urls[urlIndex],
    headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
    onload:function(response) {
      if((response.readyState == 4) && (response.status == 200)) {
        parseResults(response.responseText);
        goodUrl = true;
      }
    }
  });
  window.setTimeout(facebookOnlineNow, 30000); // Refresh every 30 seconds
}

function parseResults(response) {
  var uLINK = "";
  var popText = "";
  
  var today = new Date();
  var h = today.getHours();
  if (h<10) h = "0"+h;  
  var m = today.getMinutes();
  if (m<10) m = "0"+m;
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yy = today.getFullYear();
  var t = dd+"/"+mm+"/"+yy+" "+h+":"+m;

  var lastchecked = GM_getValue("lastupdated", t);

  var res = response;
  var re = new RegExp(
    '<td [^<>]*>[^<>]*' +
    '<span [^<>]*>[^<>]*' +
    '<a href="http://www\\.facebook\\.com/profile\\.php\\?id=([^<>]*)" onclick=[^<>]*>[^<>]*' +
    '<img [^<>]*title="([^<>"]*)"[^<>]*/>[^<>]*' +
    '</a>[^<>]*' +
    '</span>[^<>]*' +
    '</td>[^<>]*' +
    '<td [^<>]*>[^<>]*' +
    '<img [^<>]*src="http://jakejarvis\\.dreamhosters\\.com/invisible/images/(idle|active)\\.gif"[^<>]*/>[^<>]*'+
    '</td>[^<>]*',
    'g');

  var m;
  var count = 0; 

  while ((m = re.exec(res)) != null) {
    var uID = m[1];
    var uNAME = m[2];
    var uSTATUS = m[3];
    count++;

    var a = GM_getValue(uID,uNAME+","+t+","+t);
    var b = a.split(",");
    var c;

    if (lastchecked == b[2]) {
      c = b[1].split(" ");
      GM_setValue(uID,uNAME+","+b[1]+","+t);  //was online
    }
    else {
      c = t.split(" ");
      GM_setValue(uID,uNAME+","+t+","+t);  //now online
    }

    uLINK = '<a href="http://www.facebook.com/profile.php?id='+uID+'">'+uNAME+'</a>';

    if (GM_getValue('ShowTime', true)) {
      uLINK = c[1] + '&nbsp;' +uLINK; 
    }

    if (uSTATUS == 'active') {
      uLINK = '<img src="http://jakejarvis.dreamhosters.com/invisible/images/active.gif">&nbsp;' + uLINK;
    } else {
      uLINK = '<img src="http://jakejarvis.dreamhosters.com/invisible/images/idle.gif">&nbsp;' + uLINK;
    }

    popText += '<div id="fbmLINK">'+uLINK+'</div>'; // For popup menu - add hh:mm here
  }

  if (GM_getValue('ShowPopUp', true)) { updatePopUp(popText,count); } // Popup menu in place of chat

  GM_setValue("lastupdated", t);
}

// Adds the online friends list on top of the Facebook Chat bar
function createChatMenu (){
  var onshow = GM_getValue('ShowHide', false);
  if (onshow != true && onshow != false) { 
    onshow = false;
    GM_setValue('ShowHide', onshow); 
  }

  GM_addStyle(
    '#fbmDIV { bottom:-2px !important; right:220px !important; min-width:140px; border:1px solid #b5b5b5; background:#e5e5e5; position:fixed !important; z-index:99999 !important; padding:0px; }'+
    '#fbmHEAD { color:black; font-size:11px; padding:5px 6px 5px 6px; height:14px; min-width: 112px; padding-left: 21px; background-image: url(http://static.ak.fbcdn.net/images/presence/buddy_list.gif); background-repeat: no-repeat; background-position: 4px 6px; white-space: nowrap;}'+
    '#fbmHEAD:hover { cursor:pointer; }'+
    '#fbmEXIT { color:#6D84B4; float:right; font-weight:bold; padding:5px 6px 5px 6px; vertical-align:top; }'+
    '#fbmEXIT:hover { cursor:pointer; color:#3B5998; }'+
    '#fbmBODY { background-color:white; border-bottom:1px solid #b5b5b5; }'+
    '#fbmLINK { padding:4px 8px 4px 8px; }'+
    '#fbmNUM { font-weight:bold; }'
  );
  if (!onshow) { GM_addStyle('#fbmBODY {display: none;}'); }

  // Create new friends menu
  var div = document.createElement('div');
  div.id = 'fbmDIV';
  div.innerHTML = '<div id="fbmBODY"><div id="fbmLINK">Loading...</div></div><div id="fbmEXIT" title="Close">x</div><div id="fbmHEAD">Online Now (<span id="fbmNUM">0</span>)</div>';
  document.body.appendChild(div);

  // Listen for clicks on the x and make the list disappear and stop updating
  $('fbmEXIT').addEventListener('click', function() { 
    $('fbmDIV').style.display='none';
  }, false);
  // Listen for clicks on the header and hide/show the list of friends
  $('fbmHEAD').addEventListener('click', function() {
    if (onshow) { $('fbmBODY').style.display='none'; onshow = false; }
    else { $('fbmBODY').style.display='block'; onshow = true; }
    GM_setValue('ShowHide',onshow);
  }, false);
}

// Updates the online friend list on top of Facebook Chat
function updatePopUp (temp,num) {
  if (temp == "") { temp = '<div id="fbmLINK">No online friends.</div>'; }
  if ($('fbmNUM')) { $('fbmNUM').innerHTML = num; }
  if ($('fbmBODY')) { GM_addStyle('#fbmBODY {max-height:500px; overflow:auto;}'); $('fbmBODY').innerHTML = temp; }
}

function $(id) { return document.getElementById(id); }

// User Script Commands in Greasemonkey
function MenuCommands (){
  GM_registerMenuCommand('FBOnline: Show/Hide PopUp Friends', function(){
    if ((GM_getValue('ShowPopUp', true)) && (confirm('Hide online friends in place of Facebook Chat?'))) {
      GM_setValue('ShowPopUp', false);
    }
    else if ((!GM_getValue('ShowPopUp', true)) && (confirm('Show online friends in place of Facebook Chat?'))) {
      GM_setValue('ShowPopUp', true);
    }
  });
  GM_registerMenuCommand('FBOnline: Show/Hide Time', function(){
    if ((GM_getValue('ShowTime', true)) && (confirm('Hide Time next to friend?'))) {
      GM_setValue('ShowTime', false);
    }
    else if ((!GM_getValue('ShowTime', true)) && (confirm('Show Time next to friend?'))) {
      GM_setValue('ShowTime', true);
    }
  });
}

