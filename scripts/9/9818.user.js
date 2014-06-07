// ==UserScript==
// @name              ChinaUnix WhiteList
// @namespace     http://bbs.chinaunix.net/
// @description     block the posts of user who is not in WhiteList
// @include           http://bbs.chinaunix.net/*
// ==/UserScript==

var this_key = "chinaunix_whitelist";
var this_key_enable = "chinaunix_whitelist.enable";
var trigger_uid = /viewpro\.php\?uid=(\d+)/;
var valid_uid = /\d+/;
var whitelist = {};
if (typeof(GM_getValue(this_key)) != 'undefined') eval("whitelist={"+GM_getValue(this_key)+"}");

// ==== Functions ====
// config manager
function addToWhiteList(uid, uname) {
  whitelist[uid] = uname;
  persistent();
}
function removeFromWhiteList(uid) {
  if (whitelist[uid]) whitelist[uid] = null;
  persistent();
}
function persistent() {
  GM_setValue(this_key, cfg2str());
}
function cfg2str() {
  var str = '';
  for (uid in whitelist) if (whitelist[uid])   str += "\""+ uid + "\":\"" + whitelist[uid] + "\",";
  return str;
}


// call_back
function menu_command_add(e) {
  var uid = prompt("Please input the UID of the guy you want to allow");
  if (uid && uid.match(valid_uid)) {
    var uname = prompt("Please input the NAME of the guy you want to allow");
    if (!uname) uname = "1";
    addToWhiteList(uid, uname);
  } else {
    alert("Please input a VALID UID");
  }
}
function menu_command_remove(e) {
  var uid = prompt("Please input the UID of the guy you want to unallow");
  if (uid && uid.match(valid_uid)) removeFromWhiteList(uid);
}
function menu_command_list(e) {
  var str = cfg2str()
  alert("You have allowed:\n" + str.split(",").join("\n"));
}
function menu_command_enable(e) {
  GM_setValue(this_key_enable, "true");
}
function menu_command_disable(e) {
  GM_setValue(this_key_enable, "false");
}


// feature
function snapshot_query(document, expr, obj) {
  return document.evaluate(expr, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeNode (element) {
	if (element) element.parentNode.removeChild(element);
}

function getUserUid(content) {
  return content.search(trigger_uid) != -1 ? RegExp.$1 : null;
}

function removeBlack(document) {
  var linkList = snapshot_query(document, "//tr/td[position()=1]/a[starts-with(@href, 'viewpro.php?uid=')]", document);
  for (var i = 0; i < linkList.snapshotLength; i++) {
    var a = linkList.snapshotItem(i);
    var uid = getUserUid(a.href);
    if (uid != null && !whitelist[uid])  removeNode(a.parentNode.parentNode);
  }
}

// ==== End Functions ====

if (GM_getValue(this_key_enable) == "true") {
  removeBlack(document);
  GM_registerMenuCommand("ChinaUnix WhiteList : Disable", menu_command_disable);
} else {
  GM_registerMenuCommand("ChinaUnix WhiteList : Enable", menu_command_enable);
}
GM_registerMenuCommand("ChinaUnix WhiteList : Add White", menu_command_add)
GM_registerMenuCommand("ChinaUnix WhiteList : Remove White", menu_command_remove)
GM_registerMenuCommand("ChinaUnix WhiteList : View WhiteList", menu_command_list)
