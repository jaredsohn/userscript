// ==UserScript==
// @name           CleanSUBeta
// @namespace      furman87.stumbleupon.com
// @description    Cleans up the cluttered SU beta layout
// @include        http://stumbleupon.com/*
// @include        http://*.stumbleupon.com/*
// @author         furman87
// @license        This software is licensed under the CC-GNU GPL < http://creativecommons.org/licenses/GPL/2.0/>
// @version        1.3
// ==/UserScript==

var myName;
var myPage;
var suUserName;
var sidebarState;
var sidebarGM = 'sidebarState';
var myNameGM = 'myName';

//------------------------------------------------------------------------------
function xpath(query) {
  return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//------------------------------------------------------------------------------
function extractNameFromURL(url) {
  var reURL = /^http:\/\/([^\.]+)\.stumbleupon\.com\/.*/i;
  r = reURL.exec(url);
  return r[1];
}

//------------------------------------------------------------------------------
function getSpan(links, re) {
  result = null;
  for (i = 0; i < links.length; i++) {
    if (re.exec(links[i].title)) {
      result = links[i].getElementsByTagName('span')[0];
      break;
    }
  }
  return result;
}

//------------------------------------------------------------------------------
function setWrapperWidth(width) {
  var wrapper = document.getElementById('wrapper');
  wrapper.style.width = width;
}

//------------------------------------------------------------------------------
function setSidebar(on) {
  var sidebar = xpath("//td[@class='sidebar']").snapshotItem(0);
  if (on) {
    sidebar.style.display = 'table-cell';
    setWrapperWidth('1000px');
  } else {
    sidebar.style.display = 'none';
    setWrapperWidth('780px');
  }
}

//------------------------------------------------------------------------------
function toggleSidebar(e) {
  sidebarState = GM_getValue(sidebarGM, false);
  sidebarState = !sidebarState;
  setSidebar(sidebarState);
  GM_setValue(sidebarGM, sidebarState);
}

//------------------------------------------------------------------------------
function removeMenu() {
  var div;
  var divs = xpath("//div[@class='form' or @class='clear pdgTopLg']");
  for (i = 0; i < divs.snapshotLength; i++) {
    div = divs.snapshotItem(i);
    div.parentNode.removeChild(div);
  }
}

//------------------------------------------------------------------------------
function removeH3Div(title) {
  var h3, div;
  var h3s = xpath("//div/h3");
  for (i = 0; i < h3s.snapshotLength; i++) {
    h3 = h3s.snapshotItem(i);
    if (h3.innerHTML.toLowerCase() == title.toLowerCase()) {
      div = h3.parentNode;
      div.parentNode.removeChild(div);
    }
  }
}

//------------------------------------------------------------------------------
function fixOtherStumblersMenu(stumblerName) {
  // get the links from the sidebar.
  var lis = xpath("//div[@class='form']/ul[@class='cmds']/li");
  var setFriends = lis.snapshotItem(0);
  var sendMessage = lis.snapshotItem(2);

  // get the reference to the user menu
  var ul = xpath("//div[@class='inlinetabs clear']/ul[@class='mgnLeftSm']").snapshotItem(0);

  // add the 'Add as a friend' link
  var friendsItem = document.createElement('li');
  friendsItem.innerHTML = setFriends.innerHTML;
  ul.appendChild(friendsItem);

  // add the 'Send a message' link
  var messageItem = document.createElement('li');
  var re = /^(<a[^>]+>)(.*)$/i;
  messageItem.innerHTML = "<a class='btnWhite' href='http://" + stumblerName + ".stumbleupon.com/contact/'>" + re.exec(sendMessage.innerHTML)[2];
  ul.appendChild(messageItem);
}

//------------------------------------------------------------------------------
function getMailLink() {
  return xpath("//span[@class='btnAlert']/a[1]").snapshotItem(0);
}

//------------------------------------------------------------------------------
function getVisitorLink() {
  return xpath("//span[@class='btnAlert']/a[2]").snapshotItem(0);
}

//------------------------------------------------------------------------------
function getPathName() {
  p = document.location.pathname;
  re = /\/([^\/]*)\/?(\d*\/)?/i;
  return re.exec(p)[1].toLowerCase();
}

//------------------------------------------------------------------------------
function addMailAndVisitorsTabs(ml, vl) {
  var lim, liv, toggleLink, a, t;
  // get the videos tab
  videos = document.getElementById('t-videos');

  // build a new visitors tab and add it after the videos tab
  liv = document.createElement('li');
  liv.innerHTML = "<a href='http://" + myName + ".stumbleupon.com/home/'>" + vl.innerHTML + "</a>";
  videos.parentNode.insertBefore (liv, videos.nextSibling);

  // build a new mail tab and add it after the videos tab
  lim = document.createElement('li');
  lim.innerHTML = "<a href='http://" + myName + ".stumbleupon.com/inbox/'>" + ml.innerHTML + "</a>";
  videos.parentNode.insertBefore(lim, videos.nextSibling);

  toggleLink = document.createElement('li');
  a = document.createElement('a');
  t = document.createTextNode('Sidebar');
  a.href = '#';
  a.appendChild(t);
  a.addEventListener("click", toggleSidebar, true);
  toggleLink.appendChild(a);
  videos.parentNode.insertBefore(toggleLink, videos.nextSibling);
}

//------------------------------------------------------------------------------
function promptUserName(name) {
  return window.prompt('Enter your SU user name', name);
};

//------------------------------------------------------------------------------
function getMyName() {
  var name = GM_getValue(myNameGM, '');
  if (!name.length) {
    name = promptUserName(name);
    if (name)
      GM_setValue(myNameGM, name);
  }
  return name;
}

//------------------------------------------------------------------------------
function promptUserNameCallback(e) {
  var name = GM_getValue(myNameGM, '');
  name = promptUserName(name);
  if (name)
    GM_setValue(myNameGM, name);
};

//==============================================================================
GM_registerMenuCommand('Enter SU User Name', promptUserNameCallback);
myName = getMyName();
vl = getVisitorLink();
ml = getMailLink();
addMailAndVisitorsTabs(ml, vl);
suUserName = extractNameFromURL(document.URL );
myPage = myName.toLowerCase() == suUserName.toLowerCase ();
docPathName = getPathName();
sidebarState = GM_getValue(sidebarGM, false);

if (myPage) {
  switch (docPathName) {
    case '':
    case 'archive':
    case 'edit':
    case 'friends':
    case 'fans':
    case 'groups':
    case 'inbox':
    case 'prefs':
    case 'review':
    case 'stumbles':
      setSidebar(sidebarState);
      break;
    case 'home':
      removeMenu();
      removeH3Div('Miss the classic look?');
      break;
    default:
      break;
  }
} else {
  switch (docPathName) {
    case 'contact':
      setSidebar(sidebarState);
      break;
    default:
      fixOtherStumblersMenu(suUserName);
      setSidebar(sidebarState);
      break;
  }
}

// Version History
// 1.3: Ability to toggle sidebar.
// 1.2: Fixed main content width.
// 1.1: Enabled user to fix their SU user name.
// 1.0: Initial release -- no sidebars, moved mail/visitor indicators to tabs, moved add friend/send message links.