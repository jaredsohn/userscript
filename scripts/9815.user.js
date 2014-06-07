// ==UserScript==
// @name              ChinaUnix BlackList
// @namespace     http://bbs.chinaunix.net/
// @description     block the posts of user who is in BlackList
// @include           http://bbs.chinaunix.net/*
// ==/UserScript==

var this_key = "chinaunix_blacklist";
var this_newbie_key = "chinaunix_blacklist.newbieLimit";
//var trigger_uid = /viewpro\.php\?uid=(\d+)/;
var trigger_uid = /profile\-uid\-(\d+)\.html/;
var valid_uid = /\d+/;
var blacklist = {};
if (typeof(GM_getValue(this_key)) != 'undefined') eval("blacklist={"+GM_getValue(this_key)+"}");

var newbieLimit = 100;
if (typeof(GM_getValue(this_newbie_key)) != 'undefined') eval("newbieLimit=\""+GM_getValue(this_newbie_key)+"\"");

// ==== Functions ====
// config manager
function addToBlackList(uid, uname) {
  blacklist[uid] = uname;
  persistent();
}
function removeFromBlackList(uid) {
  if (blacklist[uid]) blacklist[uid] = null;
  persistent();
}
function persistent() {
  GM_setValue(this_key, cfg2str());
}
function cfg2str() {
  var str = '';
  for (uid in blacklist) if (blacklist[uid])   str += "\""+ uid + "\":\"" + blacklist[uid] + "\",";
  return str;
}


// call_back
function menu_command_add(e) {
  var uid = prompt("Please input the UID of the guy you want to block");
  if (uid && uid.match(valid_uid)) {
    var uname = prompt("Please input the NAME of the guy you want to block");
    if (!uname) uname = "1";
    addToBlackList(uid, uname);
  } else {
    alert("Please input a VALID UID");
  }
}
function menu_command_remove(e) {
  var uid = prompt("Please input the UID of the guy you want to unblock");
  if (uid && uid.match(valid_uid)) removeFromBlackList(uid);
}
function menu_command_list(e) {
  var str = cfg2str();
  alert("You have blocked:\n" + str.split(",").join("\n"));
}
function menu_command_setNewbieLimit(e) {
  var limit = prompt("Please input the LIMIT of the newbie you want to block", newbieLimit);
  if (limit && limit.match(/\d+/)) GM_setValue(this_newbie_key, limit);
}

// feature
function snapshot_query(document, expr, obj) {
  return document.evaluate(expr, obj, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeNode (element) {
	if (element && element.parentNode) element.parentNode.removeChild(element);
}

function getUserUid(content) {
  return content.search(trigger_uid) != -1 ? RegExp.$1 : null;
}

function removeBlack(document) {
  var linkList = snapshot_query(document, "//tr/td[position()=1 or position()=3]/a[starts-with(@href, 'profile-uid')]", document);
  for (var i = 0; i < linkList.snapshotLength; i++) {
    var a = linkList.snapshotItem(i);
    var uid = getUserUid(a.href);
    if (uid != null && blacklist[uid])  removeNode(a.parentNode.parentNode);
  }
}

function removeNewbie(document) {
	var linkList = snapshot_query(document, "//tr/td[position()=1]/a[starts-with(@href, 'profile-uid')]/parent::*/div/a[starts-with(@href, 'http://search.chinaunix.net/cgi-bin/search?mode=all_author')]", document);
  for (var i = 0; i < linkList.snapshotLength; i++) {
    var a = linkList.snapshotItem(i);
    if (a.text.match(/\d+/) && parseInt(a.text) < newbieLimit)  removeNode(a.parentNode.parentNode.parentNode);
  }
}

function removeRubbish(document, pattern) {
  var rb = snapshot_query(document, pattern, document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    removeNode(rb.snapshotItem(i));
  }
}

function removeAllRubbish(document) {
  // logo
  removeRubbish(document, "//table/tbody/tr/td/a/img[@src='images/default/logo.gif']/parent::*/parent::*/parent::*");
  // signature
  removeRubbish(document, "//table[@class='t_msg']/tbody/tr/td[@valign='bottom']");
  // right reserved
  removeRubbish(document, "//tr[@class='outertxt']/parent::*");
  // ad
  removeRubbish(document, "//tr[@class='t_infoline']");
  removeRubbish(document, "//div[@class='subtable']/table/tbody/tr/td[@class='header']/a[@href='http://blog.chinaunix.net']/parent::*/parent::*/parent::*/parent::*");
  // vote
  //removeRubbish(document, "//td/a[starts-with(@href, 'postappraise.php?action=')]/parent::*");
  // user pic
  removeRubbish(document, "//tr/td[position()=1]/a[starts-with(@href, 'profile-uid')]/parent::*/div/table");
  // jump option
  removeRubbish(document, "//div[@class='subtable option']");
}

function adjustWidth(document) {
  var rb = snapshot_query(document, "//*[contains(@class, 'maintable')]", document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    rb.snapshotItem(i).className = '';
    rb.snapshotItem(i).style.width = "100%";
  }
  rb = snapshot_query(document, "//*[contains(@style, 'width')]", document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    if (rb.snapshotItem(i).style.width == "980px") rb.snapshotItem(i).style.width = "98%";
  }
  rb = snapshot_query(document, "//*[@width='980']", document);
  for (var i = 0; i < rb.snapshotLength; i++) {
    rb.snapshotItem(i).width = "98%";
  }
}

// ==== End Functions ====

removeBlack(document)
if (newbieLimit > 0) removeNewbie(document)
removeAllRubbish(document)
//adjustWidth(document)

GM_registerMenuCommand("ChinaUnix BlackList : Add Black", menu_command_add)
GM_registerMenuCommand("ChinaUnix BlackList : Remove Black", menu_command_remove)
GM_registerMenuCommand("ChinaUnix BlackList : View BlackList", menu_command_list)
GM_registerMenuCommand("ChinaUnix BlackList : Set NewbieLimit", menu_command_setNewbieLimit)
