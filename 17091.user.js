/* Version 1.10
 * Add some interface enhancements to lordsgame.com.
 * - Adds link to 'My Attacks' and a user searchbox on the right.
 * - Adds shortkeys to every page:
 *  - u = go to selected user (first select a username by dragging mouse) 
 * - auto relogin
 * - Main page 
 *  - auto fill in max diamonds to buy
 * - User Page/List
 *  - remember Non glorious users and tag in userlist.
 *  - possibility to tag users (defender, friend, enemy) (gives color in userlist)
 *  - Remembers number of won and lost battles against users. display in userlist.
 *  - Adds link to clan page of user on userpage.
 * - Adds shortkey to specific pages:
 *  - p and n to userlist for previous and next page.
 * - Army Page
 *  - Auto fill max TE
 * - Army, Buildings, Technology page:
 *  - Add link to sell required amount of diamonds to buy links
 *
 */
// ==UserScript==
// @name           lordsgame v2
// @namespace      http://hampei.vanderveen.name
// @include        http://lordsgame.com/*
// @include        http://www.lordsgame.com/*
// ==/UserScript==
(function() {
var UT = [
 ["default", ""],
 ["defender", "darkred"],
 ["enemy", "yellow"],
 ["friend", "green"]
];


/*****     MAIN     ******/

var XP = XPathResults();

var gold = getGold();
 
/*******     auto relogin     ***/

// After login the mail page is show, redirect to saved url (url when logout was detected), remove saved url.
if (location.href.match('/main.php')) {
 var goto = null;
 if (goto = GM_getValue('goto')) {
  GM_setValue('goto', "");
  if (!goto.match('/main.php'))
   location.href = goto;
 }
}
// Detect logged out image, save current url, goto index.
if (find("//img[@src='images/accessdenied.gif']", XP.First)) {
 GM_setValue('goto', window.location.href);
// window.location.href='http://lordsgame.com/index.php';
 if (find("//input[@name='signup_pass']", XP.First).value.length > 0)
  find("//input[@name='do_signup']", XP.First).click();
}
// On the index page, if login info is there, submit form
if (location.href == 'http://lordsgame.com/index.php' ) {
 if (find("//input[@name='signup_pass']", XP.First).value.length > 0)
  find("//input[@name='do_signup']", XP.First).click();
}

/*******     RIGHT MENU    ***/

if (location.href != 'http://lordsgame.com/' &&
location.href!='http://lordsgame.com/index.php') {
 var fTR = find ("//table[2]/tbody/tr", XP.First);
 var menuright = 
 '<div id="rightmenu"><table class="mi"><tr><td class="mu"><form action="userlist.php">find <input name="search" size="12" /></form></td></tr></table>' +
 '<table class="mi"><tr><td class="mu"><a href="/history.php?mode=1" class="mu">My Attacks</a></td></tr></table>' +
 '<table class="mi"><tr><td class="mu" id="user_actions"></td></tr></table></div>';
 fTR.appendChild(elem('td', ['class', 'mo rightmenu', 'width', '150', 'valign', 'top'], menuright));
 addGlobalStyle('#rightmenu {top: 102px; position: fixed}');
}

/*******     Global shortkeys     ***/

 /* handle keypresses */

var currently_pressed = 0;
window.addEventListener('keypress',  function(e) {
 if (e.altKey || e.ctrlKey || e.target.tagName != 'HTML') return;
 switch(e.which) {
  case 117: location.href= window.getSelection().toString() ?  // u	
  '/userlist.php?search=' + window.getSelection() : 
  '/userlist.php'; break;
 }
}  , true);


var users = find("//a[starts-with(@href, 'user.php?id=')]", XP.List);
for(var i=0,usr; usr = users.snapshotItem(i); i++) {
 if (usr.href.match(/user\.php\?id=(\d+)$/))
  usr.addEventListener('mouseover', show_user_actions, true);
}
 
function show_user_actions(e) {
 document.getElementById('user_actions').innerHTML = 
  e.target.innerHTML +
  '<br /><a class="l" href="'+ e.target.href +'&a=send_gift">Send gift</a>' +
  '<br /><a class="l" href="message.php?mode=send&amp;to='+ e.target.innerHTML+ '">Send message</a>';
}
  
if (gold && location.href.match('(army.php)|(buildings.php)|(technology.php)')) {
 var addSellButton = function(node, cost_str) {
  var cost = cost_str.match('cost ([0-9]+)')[1];
  var diamonds = Math.ceil((cost - gold)/500);
  if (cost > 10000)
   node.parentNode.insertBefore(elem('a', ['href', '/main.php?sellgoods='+diamonds, 'target', '_blank'], 'Sell ' + diamonds + ' diamonds'), node.nextSibling);
 }
 var costs = find("//input[contains(@value, '(cost')]", XP.List);
 for(var i=0,c; c = costs.snapshotItem(i); i++) {
  addSellButton(c, c.value);
 }
 costs = find("//a[@class='l']", XP.List);
 for(var i=0,c; c = costs.snapshotItem(i); i++) {
  addSellButton(c, c.innerHTML);
 }
}
  
/*******     alter main page (prefill diamonds and mailbox links)    ***/

if (location.href.match('/main.php')) {
 if (gold)
  find("//input[@name='buygoods']", XP.First).value = Math.floor(gold / 550);
}

/*******     user pages (save list faction members)    ***/

if (location.href.match('/user.php')) {
 // detect user id, detect if faction member
 var id = location.href.match(/id=(\d+)/)[1];
 var users = readUsers();
 if (!users[id]) users[id] = {};
 var nroMembers = users.length;
 var changed = 0;
 var isMember = find("//td/b[contains(text(),'Member of your faction')]", XP.First);
 if (isMember && !users[id].c) { // add member if not known
  users[id].c = 1; changed = 1; }
 else if (!isMember && users[id].c) { // remove ex-member
  delete users[id].c; changed = 1; }

 // save number of battles won/lost
 if (location.href.match('\a=attack')) {
  if (find("//b[text()='You have lost the battle']", XP.First))
   users[id].l = users[id].l ? users[id].l + 1 : 1;
  if (find("//b[text()='You have won the battle']", XP.First))
   users[id].w = users[id].w ? users[id].w + 1 : 1;
  changed = 1; 
 } 

 // Save if opponent is non-glorious.
 var isNonGlorious = document.body.innerHTML.match('Non glorious opponent');
 if (isNonGlorious && !users[id].ng) {
	users[id].ng = 1; changed = 1; }
 else if (!isNonGlorious && users[id].ng) { 
  delete users[id].ng; changed = 1; }
 
 // add a link to user faction page if he is a faction member.
 if (isMember) {
  var fID = find("substring-after(//a[starts-with(@href, 'clan.php')]/@href, '=')", XP.String);
  isMember.appendChild(elem('a', ['href','clanmember.php?clan='+fID+'&id='+id], 'clan page'));
 }
  
 // add select box for type of user (defender, friend, ..)
 var slct = elem("select", ['style', 'background-color: inherit; color: inherit']);
 slct.addEventListener("change", function(e) { users[id].t = e.target.value; writeUsers(users); }, false );
 for (var i = 0; i < UT.length; ++i)
  slct.appendChild(elem("option", ["value", i, 'style', 'background-color: inherit; color: ' + UT[i][1]], UT[i][0]));
 slct.value = users[id].t;
 var attb = find("//a[contains(@href, 'a=attack')]", XP.First);
 attb.parentNode.insertBefore(slct, attb.nextSibling);
 
 if (changed) // save if changed
  writeUsers(users);
}

/*******     userlist pages (tag known clansmen)     ***/

if (location.href.match('/userlist.php')) {
 var users = readUsers();
 var usersA = find("//a[starts-with(@href, 'user.php?id=')]", XP.List);
 for(var i=0,usr; usr = usersA.snapshotItem(i); i++) {
  var id = usr.href.match(/id=(\d+)/)[1];
  var gtd = usr.parentNode.nextSibling.nextSibling;
  var g = gtd.firstChild.nodeValue.replace(/[^0-9]/g, '');
  if (g < 19000) gtd.className = 'lowGold';
  if (users[id]) {
   if (users[id].w) usr.parentNode.appendChild(document.createTextNode(' W' + users[id].w));
   if (users[id].l) usr.parentNode.appendChild(document.createTextNode(' L' + users[id].l));
   if (users[id].ng) usr.parentNode.appendChild(document.createTextNode(' NG '));
   if (users[id].t) usr.parentNode.parentNode.className = 'utype' + users[id].t;
  }  
 }
 // define colors for lowgold and usertypes.
 var st = 'td.lowGold { color: #bbb !important; }'
 for (var i=0; i < UT.length; ++i)
  st += 'tr.utype'+i+' td { color: '+UT[i][1]+' !important; }';
 addGlobalStyle(st);

 /* handle keypresses */
 function keypressed(e) {
  if (e.altKey || e.ctrlKey) return;
  switch(e.which) {
	 case 112: followFirstLink(" Previous "); break; // p	  
	 case 110: followFirstLink(" Next "); break; // n
  }
 }  
 window.addEventListener('keypress', keypressed, true);
  
}


/*******     message pages     ***/

if (location.href.match('/message.php')) {
 var datetimes = find("//td[starts-with(text(), '20')]", XP.List);
 for(var i=0,d; d = datetimes.snapshotItem(i); i++) {
  d.innerHTML = d.innerHTML.replace(/ /, '_');
 }
 
 var deletes = find("//a[text()=' Delete ']", XP.List);
 for(var i=0,d; d = deletes.snapshotItem(i); i++) {
  d.parentNode.removeChild(d.previousSibling);
 }
 
  /* handle keypresses */
 function keypressed(e) {
  if (e.altKey || e.ctrlKey) return;
  switch(e.which) {
	 case 112: followFirstLink(" <<< "); break; // p	  
	 case 110: followFirstLink(" >>> "); break; // n
  }
 }  
 window.addEventListener('keypress', keypressed, true);
}


/*******     Army page     ***/

if (location.href.match('/army.php')) {
 var TE_input = find("//form[@action='?a=exercise']/input[@name='amount']", XP.First);
 var gold = find("//b[text()='Gold']/following-sibling::text()", XP.String);
 if (gold) gold = parseInt( gold.replace(/[^0-9]/g, '') );
 if (TE_input && gold) {
	// get current TE, cost of next TE and calculate the multiplier for TE-cost (10 or 9)
	var TE_val =  parseInt( TE_input.parentNode.parentNode.innerHTML.match(/Experience: (\d+)/)[1] );
	var TE_cost = parseInt( find("../input[@type='submit']/@value", XP.String, TE_input).match(/cost (\d+)/)[1] );
	var TE_mult = TE_cost / (TE_val+1);
	// 5m^2 + (10n+5)m = gold; with n the current TE and m the TE that can be bought with current gold.
	var a = TE_mult/2;
	var b = TE_mult * TE_val + TE_mult/2;
	TE_input.value = Math.floor( (0-b + Math.sqrt( b*b + 4*a*gold )) / (2*a) ); // abc formula
 } 
}

/*****     Global functions.     *****/

function readUsers() {
 var userinfo = GM_getValue("userinfo");
 if (userinfo)
  return eval ('(' + userinfo + ')');	
 else
  return {};
}

function writeUsers(users) {
 var s = '{';
 for (var id in users) {
  if (users[id].length==0) continue; 
  s += id + ':{';
  for (var v in users[id]) {
	 s += v + ':' + users[id][v] + ',';
  }
  s += '},';
 }
 s += '}';
 GM_setValue('userinfo', s);
}

function getGold() {
 var gld = find("//b[text()='Gold']/following-sibling::text()", XP.String);
 if (gld)
  return gld.substring(2).replace(/[^0-9]/g, '');
}

//if (location.href.indexOf('/buildings.php') > -1) {
//	var buyA = find("//a[contains(text(), '(cost')]", XP.List);
//}


/*****     UTILITY FUNCTIONS     *****/

function elem(tag, attrs) {
 var ret = document.createElement(tag);
 for(var i=0,att; att = attrs[i++]; i++)
 ret.setAttribute(att, attrs[i]);
 if (arguments.length == 3)
 ret.innerHTML = arguments[2];
 return ret;
}

function find(xpath,xpres,context) {
 var ret = document.evaluate(xpath,context?context:document,null,xpres,null);
 switch(xpres) {
  case XP.First : return ret.singleNodeValue;
  case XP.String: return ret.stringValue;
  case XP.Number: return ret.numberValue;
  default      : return ret;
 }
}
function XPathResults() {
 return {
  First : XPathResult.FIRST_ORDERED_NODE_TYPE,
  List  : XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  String : XPathResult.STRING_TYPE,
  Number : XPathResult.NUMBER_TYPE
 };
}
   
function addGlobalStyle(css) {
 var head = document.getElementsByTagName('head')[0];
 if (head)
 head.appendChild( elem('style', ['type', 'text/css'], css) );
}

function followFirstLink(text) {
	
 var link = find("//a[text()='"+text+"']", XP.First);
 if (link) location.href = link.href;
}

})();