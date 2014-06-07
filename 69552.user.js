// ==UserScript==
// @name	  Estiah PvP Fight Log
// @description	  PvP Fight Log Version 1.10.  Adds links to save/view fight summaries for 1v1.  Direct questions/comments to Gitface in Estiah or email 'theoneandonlygitface@gmail.com'.
// @author        Gitface
// @license	  (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @include http://www.estiah.com/pvp
// @include http://www.estiah.com/character/combat/replay/*

// ==/UserScript==

//----------------------------
// Known Issues/Limitations
//----------------------------
// - Only works on 1 v 1 fights of self vs. someone
// - can't see bounty on VsMoblist when character name is really long
// - "Loading" animated gif stops spinning when updateTable is called.
//     And it is located to the side of the fight log on replay pages.
// - Don't know how to query for all people in a city (for city link).
// - When two pages are open with a fightlog on it, saving a fight one
//     will not populate tables on the other page.  Only a page re-load
//     will fully synch/populate all tables.  Same for note changes on
//     one page not reflected on the other.

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  General functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// This function inserts newNode after referenceNode
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore( newNode, referenceNode.nextSibling );
}

//---------------------------------------------------------------
// change unicode back to special chars
function displayNotes(str) {
  return str.replace(/&GFopen;/g,'{').replace(/&GFclose;/g,'}').replace(/&GFquote;/g,'\"').replace(/^<GitfaceNotes>(.*)<\/GitfaceNotes>$/,'$1');
}
//---------------------------------------------------------------
// change special chars to unicode
function saveNotes(str) {
  return "<GitfaceNotes>" + str.replace(/{/g,'&GFopen;').replace(/}/g,'&GFclose;').replace(/\"/g,'&GFquote;') + "</GitfaceNotes>";
}

//---------------------------------------------------------------
// add a line break to the div
//---------------------------------------------------------------
function addLineBreak(thediv) {
  thebr = document.createElement("br");
  thediv.appendChild(thebr);
}

//---------------------------------------------------------------
function quote(str) {
  return "\"" + str + "\"";
}
function quotekeyval(str1, str2) {
  return "\"" + str1 + "\"\"" + str2 + "\"";
}

//---------------------------------------------------------------
function jump(linkText) {
  return function() {
    window.open("http://www.estiah.com/character/" + linkText);
  }
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Token list manipulation
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  return first token in a list of {} tokens
//---------------------------------------------------------------
function firstToken(str) {
  var token = str.replace(/^{([^{}]+)}.*/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return last token in a list of {} tokens
//---------------------------------------------------------------
function lastToken(str) {
  var token = str.replace(/.*{([^{}]+)}$/,'$1');
  return token;  
}

//---------------------------------------------------------------
//  return str with last token popped off
//---------------------------------------------------------------
function popLastToken(str) {
  var newstr = str.replace(/(.*){[^{}]+}$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  return str with first token popped off
//---------------------------------------------------------------
function popFirstToken(str) {
  var newstr = str.replace(/^{[^{}]+}(.*)$/,'$1');
  return newstr;
}

//---------------------------------------------------------------
//  append token
//---------------------------------------------------------------
function appendToken(str, token) {
  var newstr = str + "{" + token + "}";
  return newstr;
}

//---------------------------------------------------------------
//  prepend token
//---------------------------------------------------------------
function prependToken(str, token) {
  var newstr = "{" + token + "}" + str;
  return newstr;
}

//---------------------------------------------------------------
//  delete token by index
//---------------------------------------------------------------
function deleteToken(str, id) {
  var newstr = "";
  var count = 0;
  while (str.length > 0) {
    var token = firstToken(str);
    if (id != count) {
      newstr = appendToken(newstr, token);
    }
    str = popFirstToken(str);
    count++;
  }
  return newstr;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Page parsing functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//-----------------------------------------------------------
function getBountyAmount(userid) {
  var e = document.evaluate("//div[@id='SystemInfoCharacter" + userid + "']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (! e) return 0;
  var thehtml = e.singleNodeValue.innerHTML.replace(/\n/g, '');
  if (thehtml.indexOf("WANTED") >= 0) {
    return parseInt(thehtml.replace(/.*WANTED\!\s*(\d+)g.*/,'$1'));
  }
  return 0;
}

//-----------------------------------------------------------
/*
?  Armor played, Armor destroyed
?  Ward played, Ward destroyed
?  Wp played, Wp destroyed
*/

//----------------------------------------------------
//Lokimir loses 2 life
//Lokimir heals 8 damage
function getBattleStatsLossGain(thehtml, username) {
  var re = new RegExp(username + " loses (\\d+) life", "g");
  var losscount = 0;
  while (arr = re.exec(thehtml)) {
    if (arr[1]) losscount = losscount + parseInt(arr[1]);
  }

  var re = new RegExp(username + " heals (\\d+) damage", "g");
  var healcount = 0;
  while (arr = re.exec(thehtml)) {
    if (arr[1]) healcount = healcount + parseInt(arr[1]);
  }

  ret = losscount + "/" + healcount;
  //DEBUG alert(username + ": loss/heal " + ret); //DEBUG
  return ret;
}

//----------------------------------------------------
//Luvtt gains 1 extra action 
//Gitface is stunned
//Gitfaces uses [Mind Resonance]
function getBattleStatsPlayXtraStunned(thehtml, username) {
  var re = new RegExp("\"turn\">" + username + " uses <a", "g");
  var playcount = 0;
  while (arr = re.exec(thehtml)) {
    playcount++;
  }

  var re = new RegExp(username + " is stunned", "g");
  var stuncount = 0;
  while (arr = re.exec(thehtml)) {
    stuncount++;
  }

  var re = new RegExp(username + " gains (\\d+) extra action", "g");
  var xtracount = 0;
  while (arr = re.exec(thehtml)) {
    if (arr[1]) xtracount = xtracount + parseInt(arr[1]);
  }

  ret = playcount + "/" + xtracount + "/" + stuncount;
  //DEBUG alert(username + ": play/xtra/stun " + ret); //DEBUG
  return ret;
}

//----------------------------------------------------
//Travel takes 2 spirit damage
//Overlordz takes 0 spirit damage (1 resisted)
function getBattleStatsSpirit(thehtml, username) {
  var re = new RegExp(username + " takes (\\d+) spirit damage *(\\((\\d+) resisted\\))?", "g");
  var spirittaken = 0;
  var spiritresisted = 0;
  while (spirits = re.exec(thehtml)) {
    if (spirits[1]) spirittaken = spirittaken + parseInt(spirits[1]);
    if (spirits[3]) spiritresisted = spiritresisted + parseInt(spirits[3]);
  }
  ret = spirittaken + "/" + spiritresisted;
  //DEBUG alert(username + ": Spirit " + ret); //DEBUG
  return ret;
}

//----------------------------------------------------
//Luvtt takes 8 melee damage
//Qqpaladin takes 12 melee damage (36 absorbed)
//Lokimir takes 2 melee damage (24 absorbed, 2 pierced)
function getBattleStatsMelee(thehtml, username) {
  var re = new RegExp(username + " takes (\\d+) melee damage *(\\((\\d+) absorbed(, (\\d+) pierced)?\\))?", "g");
  var meleetaken = 0;
  var meleeabsorbed = 0;
  while (melees = re.exec(thehtml)) {
    if (melees[1]) meleetaken = meleetaken + parseInt(melees[1]);
    if (melees[3]) meleeabsorbed = meleeabsorbed + parseInt(melees[3]);
    if (melees[5]) {
      //Pierced counted in meleetaken already.
      //Also should count destroyed armor
      // meleedestroyed + parseInt(melees[5]);
    }
  }
  ret = meleetaken + "/" + meleeabsorbed;
  //DEBUG alert(username + ": Melee " + ret); //DEBUG
  return ret;
}

//----------------------------------------------------
//Luvtt takes 24 magic damage
//Gitface takes 4 magic damage (17 warded)
//Gitface takes 4 magic damage (17 warded, 4 pierced)
function getBattleStatsMagic(thehtml, username) {
  var re = new RegExp(username + " takes (\\d+) magic damage *(\\((\\d+) warded(, (\\d+) pierced)?\\))?", "g");
  var magictaken = 0;
  var magicwarded = 0;
  while (magics = re.exec(thehtml)) {
    if (magics[1]) magictaken = magictaken + parseInt(magics[1]);
    if (magics[3]) magicwarded = magicwarded + parseInt(magics[3]);
    if (magics[5]) {
      //Pierced counted in magictaken already.
      //Also should count destroyed ward
      // magicdestroyed + parseInt(magics[5]);
    }
  }
  ret = magictaken + "/" + magicwarded;
  //DEBUG alert(username + ": Magic " + ret); //DEBUG
  return ret;
}

//----------------------------------------------------
function getBattleStats(username) {
  var stats = [];
  var thediv = document.getElementById("VsMsg");
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  thehtml = thehtml.replace(/<span[^>]*>/g,'');
  thehtml = thehtml.replace(/<\/span>/g,'');

  stats[0] = getBattleStatsMelee(thehtml, username);
  stats[1] = getBattleStatsMagic(thehtml, username);
  stats[2] = getBattleStatsSpirit(thehtml, username);
  stats[3] = getBattleStatsLossGain(thehtml, username);
  stats[4] = getBattleStatsPlayXtraStunned(thehtml, username);

  return stats;
}

//---------------------------------------------------------------
function getUsername() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/character" class="nolink">Gitface (L.<strong class="PT_update_level">17</strong>)</a>
    if (thehtml.indexOf("<a href=\"/character\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/character"[^>]+>([^< ]+) \(L.*/,'$1');
      return thehtml;
    } 
  }
  return "?";
}

//---------------------------------------------------------------
function getLevel() {
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/character" class="nolink">Gitface (L.<strong class="PT_update_level">17</strong>)</a>
    if (thehtml.indexOf("<a href=\"/character\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/character"[^>]+>[^< ]+ \(L[^>]+>(\d+).*/,'$1');
      return thehtml;
    } 
  }
  return "?";
}

//---------------------------------------------------------------
function getCity() {
  // check for moblist.  If none it is a replay fight.
  var thediv = document.getElementById("VsMobList");
  if (!thediv) {
    var thediv = document.getElementById("VsRedirect");
    if (!thediv) return "?";
    if (thediv.innerHTML.indexOf("Go Back to Coliseum") >= 0) {
      return "Coliseum";
    }
    // else - replay fight.  return "?"
    return "?";
  }
  var dropdownnodes = document.evaluate("//div[@class='entry BV_menu_dropdown']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
  for (var i = 0; i < dropdownnodes.snapshotLength; i++) {
    var node = dropdownnodes.snapshotItem(i);
    var thehtml = node.innerHTML.replace(/\n/g, '');

    //<a href="/city" class="nolink disabled">City Skyrift</a>
    if (thehtml.indexOf("<a href=\"/city\"") >= 0) {
      thehtml = thehtml.replace(/.*<a href="\/city"[^>]+>City ([^<]+)<\/a>.*/,'$1');
      return thehtml;
    } 
  }
  return "?";
}

//---------------------------------------------------------------
function getDeckname() {
  var sel = document.evaluate("//select[@name='deck']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (!sel.singleNodeValue) return "?";
  var idx = sel.singleNodeValue.selectedIndex;
  var thehtml = sel.singleNodeValue.options[idx].innerHTML;
  var thehtml = thehtml.replace(/\n/g, '');
  return thehtml;
}

//---------------------------------------------------------------
function getWinner() {
  var thediv = document.getElementById("VsWinner");
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  return thehtml.replace(/^([^ ]+).*/,'$1');
}

//---------------------------------------------------------------
//<span class="status">Gitface : 
function getOpponentName() {
  var thediv = document.getElementById("VsMsg");
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  var spans = thehtml.split("<span");
  var re = new RegExp("\"status\">\s*[^ ]+ \:");
  for (var i = 0; i < spans.length; i++) {
    if (re.test(spans[i])) {
      var name = spans[i].replace(/.*class=\"status\">([^ ]+) .*/,'$1');
      if (name != getUsername()) {
        //DEBUG alert(name);
        return name;
      }
    }
  }
  // no status found... try a different approach
  var myusername = getUsername();
  // <span class="player">Gitface</span>
  var re = new RegExp("<span class=\"player\">\\s*([^<]+)\\s*<","g");
  while (test = re.exec(thehtml)) {
    if ((test) && (test[1] != myusername)) {
      return test[1];
    }
  }
  // no player spans - try defeat/end
  if (thehtml.indexOf(" is defeated.") >= 0) {
    name = thehtml.replace(/.*>\s*([^ ]+) is defeated.*/,'$1');
    if (name != myusername) return name;
  }
  else if (thehtml.indexOf(" collapses of exhaustion.") >= 0) {
    name = thehtml.replace(/.*>\s*([^ ]+) collapses of exhaustion.*/,'$1');
    if (name != myusername) return name;
  }
  return "?";
}

//---------------------------------------------------------------
// var thediv = document.getElementById("VsMobList");
//<div class="name"> <a href="/character/45389" class=" nolink BV_system_file">Godfazer</a> </div>
//<div class="classname lhp"><strong>Adventurer</strong></div>
//<div class="info lhp"> <a href="/json/pvp/match/index/mob/45389" onclick="return false;" id="MobFight45389" class="c2 nolink func BV_vslist_fight">[Fight]</a> L.<strong>18</strong> | Rating <strong>2123</strong> </div>
//---------------------------------------------------------------
function getOpponentId(opponentName) {
  if (opponentName == "?") return "?";
  var thediv = document.getElementById("VsMobList");
  if (thediv) { 
    var thehtml = thediv.innerHTML.replace(/\n/g, '');
    var divs = thehtml.split("<div");
    var re = new RegExp(">\s*" + opponentName + "\s*<");
    for (var i = 0; i < divs.length; i++) {
      if (re.test(divs[i])) {
        // found player
        //<div class="name"> <a href="/character/45389" class=" nolink BV_system_file">Godfazer</a> </div>
        return divs[i].replace(/.*<a href=\"\/character\/(\d+).*/,'$1');
      }
    }
  }
  else {
    // try VsAnimation
    var thediv = document.getElementById("VsAnimation");
    if (!thediv) { return "?"; }
    var thehtml = thediv.innerHTML.replace(/\n/g, '');
    //<div class="pname c2" id="Player0PName">Gitface</div> <div class="level">17</div> <div class="bar_hp"><div style="width: 100%;" class="inner" id="Player0BarHp"></div></div> <div class="avatar"> <img src="/image/dyn/avatar/52146.png?1258518963" id="Player0Avatar"> </div>
    var divs = thehtml.split("<div");
    var re = new RegExp(">\s*" + opponentName + "\s*<");
    for (var i = 0; i < divs.length; i++) {
      if (re.test(divs[i])) {
        // found player name.  id is in the avatar div (sometimes).  avatar
        // div is in name div + 4
        if (divs[i+4].indexOf("image/dyn/avatar") >= 0) {
          return divs[i + 4].replace(/.*image\/dyn\/avatar\/(\d+).*/,'$1');
        }
        else {
          // avatar does not contain the user id
          return "?";
        }
      }
    }
  }
  return "?";
}
//---------------------------------------------------------------
// class="classname lhp"><strong style="color: rgb(255, 255, 255);">Adventurer</strong></div> 
function getOpponentClass(opponentName) {
  if (opponentName == "?") return "?";
  var thediv = document.getElementById("VsMobList");
  if (!thediv) { return "?"; }
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  var divs = thehtml.split("<div");
  var re = new RegExp(">\s*" + opponentName + "\s*<");
  for (var i = 0; i < divs.length; i++) {
    if (re.test(divs[i])) {
      // found player
      return divs[i+1].replace(/.*<strong[^>]*>([^<]+)<\/strong>.*/,'$1');
    }
  }
  return "?";
}
//---------------------------------------------------------------
function getOpponentLevel(opponentName) {
  if (opponentName == "?") return "?";
  var thediv = document.getElementById("VsMobList");
  if (thediv) {
    var thehtml = thediv.innerHTML.replace(/\n/g, '');
    var divs = thehtml.split("<div");
    var re = new RegExp(">\s*" + opponentName + "\s*<");
    for (var i = 0; i < divs.length; i++) {
      if (re.test(divs[i])) {
        // found player
        //<div class="info lhp"> <a href="/json/pvp/match/index/mob/45389" onclick="return false;" id="MobFight45389" class="c2 nolink func BV_vslist_fight">[Fight]</a> L.<strong>18</strong> | Rating <strong>2123</strong> </div>
        return divs[i+2].replace(/.*L.<strong>(\d+)<\/strong>.*/,'$1');
      }
    }
  }
  else {
    // try VsAnimation
    var thediv = document.getElementById("VsAnimation");
    if (!thediv) { return "?"; }
    var thehtml = thediv.innerHTML.replace(/\n/g, '');
    //<div class="pname c2" id="Player0PName">Gitface</div> <div class="level">17</div> <div class="bar_hp"><div style="width: 100%;" class="inner" id="Player0BarHp"></div></div> <div class="avatar"> <img src="/image/dyn/avatar/52146.png?1258518963" id="Player0Avatar"> </div>
    var divs = thehtml.split("<div");
    var re = new RegExp(">\s*" + opponentName + "\s*<");
    for (var i = 0; i < divs.length; i++) {
      if (re.test(divs[i])) {
        // found player name.  id is in a following div + 1
        return divs[i + 1].replace(/.*class=\"level\">(\d+).*/,'$1');
      }
    }
  }
  return "?";
}
//---------------------------------------------------------------
function getOpponentRating(opponentName) {
  if (opponentName == "?") return "?";
  var thediv = document.getElementById("VsMobList");
  if (!thediv) { return "?"; }
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  var divs = thehtml.split("<div");
  var re = new RegExp(">\s*" + opponentName + "\s*<");
  for (var i = 0; i < divs.length; i++) {
    if (re.test(divs[i])) {
      // found player
      //<div class="info lhp"> <a href="/json/pvp/match/index/mob/45389" onclick="return false;" id="MobFight45389" class="c2 nolink func BV_vslist_fight">[Fight]</a> L.<strong>18</strong> | Rating <strong>2123</strong> </div>
      return divs[i+2].replace(/.*Rating\s*<strong>(\d+)<\/strong>.*/,'$1');
    }
  }
  return "?";
}

//---------------------------------------------------------------
// win/loss by HP or exhaustion
// Gitface is defeated. 
// Ossegu collapses of exhaustion.
function getWinMethod() {
  var thediv = document.getElementById("VsMsg");
  var thehtml = thediv.innerHTML.replace(/\n/g, '');
  if (thehtml.indexOf(" is defeated.") >= 0) {
    return "HP";
  }
  if (thehtml.indexOf(" collapses of exhaustion.") >= 0) {
    return "EX";
  }
  return "?";
}

//---------------------------------------------------------------
//<span class="status">Gitface : <strong>241/241</strong> HP, <strong>0</strong> Armor, <strong>0</strong> Ward, <strong>0</strong> Willpower, <strong>29/32</strong> Charm(s) left</span>
// 1 is HP
// 2 is armor
// 3 is ward
// 4 is willpower
// 5 is charms left
function getLastBattleSpan(thehtml, username) {
  var thehtml = thehtml.replace(/\n/g, '');
  var spans = thehtml.split("<span");
  var spanid = -1;
  var re = new RegExp("\"status\">" + username + ".*<strong>\\s*\\d+/\\d+.*HP");
  for (var i = 0; i < spans.length; i++) {
    if (re.test(spans[i])) {
      // found right user - cache the last matching span id
      spanid = i; // cac
    }
  }
  if (spanid == -1) {
    return "";
  }
  return spans[spanid];
}

//---------------------------------------------------------------
//<span class="status">Gitface : <strong>241/241</strong> HP, <strong>0</strong> Armor, <strong>0</strong> Ward, <strong>0</strong> Willpower, <strong>29/32</strong> Charm(s) left</span>
// 1 is HP
// 2 is armor
// 3 is ward
// 4 is willpower
// 5 is charms left
function getBattleSpan(thehtml, username) {
  //DEBUG alert('getbattlespan \"' + username + '\"');  //DEBUG
  var thehtml = thehtml.replace(/\n/g, '');
  var spans = thehtml.split("<span");
  var re = new RegExp("\"status\">" + username + ".*<strong>\\s*\\d+/\\d+.*HP");
  for (var i = 0; i < spans.length; i++) {
    if (re.test(spans[i])) {
      // found right user - return the span
      return spans[i];
    }
  }
  return "";
}

//---------------------------------------------------------------
// max cards
function getMaxCards(username) {
  if (username == "?") return "?";
  var thediv = document.getElementById("VsMsg");
  var thespan = getBattleSpan(thediv.innerHTML, username);
  //DEBUG alert('maxcards ' + thespan); //DEBUG
  if (thespan == "") {
    return "?";
  }
  var strongs = thespan.split("<strong>");
  return strongs[5].replace(/^\d+\/(\d+).*/,'$1');
}
//---------------------------------------------------------------
// remaining cards
function getRemainingCards(username) {
  if (username == "?") return "?";
  var thediv = document.getElementById("VsMsg");
  var thespan = getLastBattleSpan(thediv.innerHTML, username);
  //DEBUG alert('leftcards ' + thespan); //DEBUG
  if (thespan == "") {
    return "?";
  }
  var strongs = thespan.split("<strong>");
  return strongs[5].replace(/^(\d+)\/\d+.*/,'$1');
}

//---------------------------------------------------------------
// max hp
function getMaxHP(username) {
  if (username == "?") return "?";
  var thediv = document.getElementById("VsMsg");
  var thespan = getBattleSpan(thediv.innerHTML, username);
  //DEBUG alert('maxhp ' + thespan); //DEBUG
  if (thespan == "") {
    return "?";
  }
  var strongs = thespan.split("<strong>");
  return strongs[1].replace(/^\d+\/(\d+).*/,'$1');
}

//---------------------------------------------------------------
// remaining HP
function getRemainingHP(username) {
  if (username == "?") return "?";
  var thediv = document.getElementById("VsMsg");
  var thespan = getLastBattleSpan(thediv.innerHTML, username);
  //DEBUG alert('lefthp ' + thespan); //DEBUG
  if (thespan == "") {
    return "?";
  }
  var strongs = thespan.split("<strong>");
  return strongs[1].replace(/^(\d+)\/\d+.*/,'$1');
}

//---------------------------------------------------------------
function getTheDate() {
  var date = new Date();

  //Fri Jan 01 2010 17:17:30 GMT-0800 (Pacific Standard Time)
  var munge = date.toString();
  munge = munge.replace(/^[^ ]+ /,'');
  munge = munge.replace(/ GMT.*$/,'');
  munge = munge.replace(/Jan/,'01');
  munge = munge.replace(/Feb/,'02');
  munge = munge.replace(/Mar/,'03');
  munge = munge.replace(/Apr/,'04');
  munge = munge.replace(/May/,'05');
  munge = munge.replace(/Jun/,'06');
  munge = munge.replace(/Jul/,'07');
  munge = munge.replace(/Aug/,'08');
  munge = munge.replace(/Sep/,'09');
  munge = munge.replace(/Oct/,'10');
  munge = munge.replace(/Nov/,'11');
  munge = munge.replace(/Dec/,'12');
  munge = munge.replace(/^([^\s]+) (\d+) (\d+)/,'$1/$2');
  munge = munge.replace(/:\d+$/,'');
  return munge;
}
//---------------------------------------------------------------
function getLeftVal(str) {
  return str.replace(/^([^\/]+)\/.*/,'$1');
}

//---------------------------------------------------------------
function getFightStr() {
  var fightid = getNextFightid();

  // This is the date of the save - not the date of the fight
  var date = getTheDate();
  var city = getCity();
  var username = getUsername();
  var mylevel = getLevel();
  var deckname = getDeckname();
  var winner = getWinner();
  var iwin = "Loss";
  if (winner == username) {
    iwin = "Win";
  }

  var opponentName = getOpponentName();
  if (opponentName == "?") {
    alert("Can't find opponent's name.  Are you sure you fought someone?");
    return;
  }
  var opponentId = getOpponentId(opponentName);
  var opponentClass = getOpponentClass(opponentName);
  var opponentLevel = getOpponentLevel(opponentName);
  var opponentRating = getOpponentRating(opponentName);
  var winmethod = getWinMethod();

  var myMaxCards = getMaxCards(username);
  var myMaxHP = getMaxHP(username);
  var myLeftCards = getRemainingCards(username);
  var myLeftHP = getRemainingHP(username);

  var opponentMaxCards = getMaxCards(opponentName);
  var opponentMaxHP = getMaxHP(opponentName);
  var opponentLeftCards = getRemainingCards(opponentName);
  var opponentLeftHP = getRemainingHP(opponentName);

  mystats = getBattleStats(getUsername());
  opponentstats = getBattleStats(opponentName);

  // clean up values for the loser when things happened between the last
  // two battle statuses
  if ((iwin == "Win") && (winmethod == "HP")) {
    opponentLeftHP = 0;
    opponentLeftCards = opponentMaxCards - getLeftVal(opponentstats[2]) - getLeftVal(opponentstats[4]);
  }
  else if ((iwin == "Win") && (winmethod == "EX")) {
    opponentLeftHP = opponentMaxHP - getLeftVal(opponentstats[0]) - getLeftVal(opponentstats[1]);
    opponentLeftCards = 0;
  }
  else if ((iwin == "Loss") && (winmethod == "HP")) {
    myLeftHP = 0;
    myLeftCards = myMaxCards - getLeftVal(mystats[2]) - getLeftVal(mystats[4]);
  }
  else if ((iwin == "Loss") && (winmethod == "EX")) {
    myLeftHP = myMaxHP - getLeftVal(mystats[0]) - getLeftVal(mystats[1]);
    myLeftCards = 0;
  }
  else {
    // alert('Something bad happend in parsing');
  }

  //DEBUG alert("date:'" + date + "' winloss:'" + iwin + "' city:'" + city + "' dekcname:'" + deckname + "' mylvl:'" + mylevel + "'\nopponentName:'" + opponentName + "' opponentid:'" + opponentId + "' opponentClass:'" + opponentClass + "' opponentLevel:'" + opponentLevel + "' opponentRating:'" + opponentRating + "'\nwinmethod:'" + winmethod + "' mymaxcards:'" + myMaxCards + "' mymaxhp:'" + myMaxHP + "' opponentmaxcards:'" + opponentMaxCards + "' opponentmaxhp:'" + opponentMaxHP + "'\nmyleftcards:'" + myLeftCards + "' mylefthp:'" + myLeftHP + "' opponentleftcards:'" + opponentLeftCards + "' opponentlefthp:'" + opponentLeftHP + "'"); //DEBUG

  ret = quotekeyval("fightid",fightid);
  ret = ret + quotekeyval("date",date);
  ret = ret + quotekeyval("city",city);
  ret = ret + quotekeyval("win",iwin);
  ret = ret + quotekeyval("how",winmethod);
  ret = ret + quotekeyval("mydeck",deckname);
  ret = ret + quotekeyval("mylvl",mylevel);
  ret = ret + quotekeyval("myhp",myLeftHP + '/' + myMaxHP);
  ret = ret + quotekeyval("mycards",myLeftCards + '/' + myMaxCards);
  ret = ret + quotekeyval("yourname",opponentName);
  ret = ret + quotekeyval("yourid",opponentId);
  ret = ret + quotekeyval("yourclass",opponentClass);
  ret = ret + quotekeyval("yourlvl",opponentLevel);
  ret = ret + quotekeyval("yourrating",opponentRating);
  ret = ret + quotekeyval("yourhp",opponentLeftHP + '/' + opponentMaxHP);
  ret = ret + quotekeyval("yourcards",opponentLeftCards + '/' + opponentMaxCards);
  ret = ret + quotekeyval("mymelee",mystats[0]);
  ret = ret + quotekeyval("mymagic",mystats[1]);
  ret = ret + quotekeyval("myspirit",mystats[2]);
  ret = ret + quotekeyval("mygainloss",mystats[3]);
  ret = ret + quotekeyval("myxtrastun",mystats[4]);
  ret = ret + quotekeyval("yourmelee",opponentstats[0]);
  ret = ret + quotekeyval("yourmagic",opponentstats[1]);
  ret = ret + quotekeyval("yourspirit",opponentstats[2]);
  ret = ret + quotekeyval("yourgainloss",opponentstats[3]);
  ret = ret + quotekeyval("yourxtrastun",opponentstats[4]);
  ret = ret + quotekeyval("notes", saveNotes("Notes"));

  return ret;
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//  Log manipulation functions
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//---------------------------------------------------------------
//  name of fight log Varname
//---------------------------------------------------------------
function getFightLogVarname() {
  return "estiah_pvp_fight_log_" + getUsername();
}

//---------------------------------------------------------------
function modifyNotesInTable(table, fightid, newNotes) {
  var cell = document.getElementById(table.id + " pvp_fight_notes " + fightid);
  if (!cell) return;
  cell.innerHTML = newNotes;
}

//---------------------------------------------------------------
function modifyNotes() {
  var fightid = this.id.replace(/.* pvp_fight_notes (\d+)/,'$1');
  id = parseInt(fightid);

  var oldNotes = this.innerHTML;

  var newNotes = prompt("Fight Notes", oldNotes);
  if (! newNotes) return;  // cancelled
  // remove leading/trailing whitespace
  newNotes = newNotes.replace(/^\s+/,'');
  newNotes = newNotes.replace(/\s+$/,'');
  if (newNotes.length == 0) {
    newNotes = "Notes";
  }
  if (newNotes != oldNotes) {
    // modify notes cell in all tables
    var thediv = document.getElementById("pvp_fight_tables");
    var tables = thediv.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      modifyNotesInTable(tables[i], fightid, newNotes);
    }

    // modify saved fight token
    var varname = getFightLogVarname();
    var log = GM_getValue(varname, "");

    var re = new RegExp("(.*{[^}]*\"fightid\"\"" + fightid + "\"[^}]*)<GitfaceNotes>[^<]*</GitfaceNotes>(.*)");
    var bits = re.exec(log);
    var newlog = bits[1] + saveNotes(newNotes) + bits[2];

    //DEBUG alert(newlog);  //DEBUG
    GM_setValue(varname, newlog);
  }
}

//---------------------------------------------------------------
function getNextFightid() {
  var varname = getFightLogVarname();
  var log = GM_getValue(varname, "");
  var re = new RegExp("\"fightid\"\"(\\d+)\"", "g");
  var fightIdMap = new Object();
  while (fights = re.exec(log)) {
    fightIdMap[fights[1]] = 1;
  }
  var nextid = 0;
  while (fightIdMap[nextid]) {
    nextid++;
  }
  //DEBUG alert('free fightid ' + nextid);
  return nextid;
}

//---------------------------------------------------------------
function tableHeaderRows() {
  return 3;
}
//---------------------------------------------------------------
function tableEntryRows() {
  return 3;
}

//---------------------------------------------------------------
function deleteFightFromTable(tab, fightid) {
  cell = document.getElementById(tab.id + " pvp_fight_log_fightid " + fightid);
  if (! cell) return;
  var rowid = cell.parentNode.rowIndex;
  for (var j = 0; j < tableEntryRows(); j++) {
    tab.deleteRow(rowid);
  }
}

//---------------------------------------------------------------
function deleteSingleFight() {
  var fi = this.id.replace(/pvp_fight_log_delete (\d+)/,'$1');
  fightid = parseInt(fi);

  var varname = getFightLogVarname();
  var log = GM_getValue(varname, "");
  var re = new RegExp("(.*){[^}]*\"fightid\"\"" + fightid + "\"[^}]*}(.*)");
  var fights = re.exec(log);
  var newlog = fights[1] + fights[2];
  GM_setValue(varname, newlog);

  var thediv = document.getElementById("pvp_fight_tables");
  var tables = thediv.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    deleteFightFromTable(tables[i], fightid);
  }

  // clean up [Log] links in mob list
  addRemoveLogLinksInMobList();
}

//---------------------------------------------------------------
function getBorderColor(type) {
  if (type == "inside") return "#696969";
  return "#aa7711";
}

//---------------------------------------------------------------
function setCellBorder(cell, type) {
  if (type == "top") {
    cell.style.borderTop = "1px solid " + getBorderColor("outside");
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid "  + getBorderColor("inside");
    cell.style.borderBottom = "1px solid "  + getBorderColor("inside");
  }
  else if (type == "bottom") {
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "2px solid " + getBorderColor("outside");
  }
  else if (type == "middle") {
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "1px solid " + getBorderColor("inside");
  }
  else if (type == "both") {
    // top and bottom 
    cell.style.borderTop = "1px solid " + getBorderColor("outside");
    cell.style.borderLeft = "0px none";
    cell.style.borderRight = "1px solid " + getBorderColor("inside");
    cell.style.borderBottom = "2px solid " + getBorderColor("outside");
  }
  else {
    alert('bad border type');
  }
  return cell;
}

//---------------------------------------------------------------
// type = top, bottom, both
function addCell(row, align, type) {
  var cell = row.insertCell(-1);
  cell.align = align;
  cell.style.fontSize = "smaller";
  cell.style.padding = "5px 3px 5px 3px";
  cell = setCellBorder(cell, type);  
  return cell;
}

//---------------------------------------------------------------
function addRightCell(row, align, type) {
  var cell = addCell(row, align, type);
  cell.style.borderRight = "1px solid " + getBorderColor("outside");
  return cell
}
//---------------------------------------------------------------
function addLeftCell(row, align, type) {
  var cell = addCell(row, align, type);
  cell.style.borderLeft = "1px solid " + getBorderColor("outside");
  return cell;
}


//---------------------------------------------------------------
function addHeaderCell(row, type) {
  var cell = addCell(row, "center", type);
  cell.style.fontWeight = "bold"
  if ((type == "bottom") || (type == "both")) {
    cell.style.borderBottomWidth = "3px";
    cell.style.borderBottomColor = "#FFFFFF";
  }
  return cell;
}

//---------------------------------------------------------------
function addLeftHeaderCell(row, type) {
  var cell = addHeaderCell(row, type);
  cell.style.borderLeft = "1px solid " + getBorderColor("outside");
  return cell;
}

function addRightHeaderCell(row, type) {
  var cell = addHeaderCell(row, type);
  cell.style.borderRight = "1px solid " + getBorderColor("outside");
  return cell;
}

//---------------------------------------------------------------
function getEstiahFightColor(type) {
  if (type == "player") return "#FFCC00";
  if (type == "armor") return "#FF66AA";
  if (type == "ward") return "#33CCCC";
  if (type == "melee") return "#FF6666";
  if (type == "magic") return "#9999FF";
  if (type == "card") return "#99FF99";
  if (type == "class") return "#87CEFA";
  if (type == "spirit") return "#CC9966";
  if (type == "willpower") return "#FF6600";
  if (type == "special") return "#22AA22";
  if (type == "none") return "#FFFFFF";
  return "#000000";
}

//---------------------------------------------------------------
function getClassSoulColor(type) {
  var red = "#FF0000";  //pow
  var blue = "#7777FF";  //int
  var brown = "#FF9900";  //con
  var green = "#00FF00";  //dex
  var white = "#FFFFFF";
  if (type == "Fighter") return red;
  if (type == "Novice") return blue;
  if (type == "Scout") return green;
  if (type == "Recruit") return brown;
  if (type == "Mercenary") return red;
  if (type == "Wizard") return red;
  if (type == "Monk") return blue;
  if (type == "Sage") return blue;
  if (type == "Rogue") return green;
  if (type == "Shaman") return green;
  if (type == "Guard") return brown;
  if (type == "Cleric") return brown;
  if (type == "Berserker") return red;
  if (type == "Deathknight") return red;
  if (type == "Champion") return blue;
  if (type == "Pyromaniac") return blue;
  if (type == "Assassin") return green;
  if (type == "Warden") return green;
  if (type == "Paladin") return brown;
  if (type == "Hierarch") return brown;
  if (type == "Summoner") return red;
  if (type == "Slayer") return blue;
  if (type == "Inquisitor") return green;
  if (type == "Warlord") return brown;
  return white;
}


//---------------------------------------------------------------
function getRatioStr(str) {
  var bits = str.split("/");
  if (bits.length != 2) {
    return str;
  }

  var color = "#32CD32"; // green
  var ratio = parseInt(bits[0])/parseInt(bits[1]);
  if (ratio < 0.6666) {
    color = "#FFFF00";  // yellow
  }
  if (ratio < 0.3333) {
    color = "#DC143C";  // red
  }
  return "<span style=\"color:" + color + "\">" + str + "</span>";
}

//---------------------------------------------------------------
function getWinStr(str) {
  color = "#DC143C"; // loss = red
  if (str == "Win") {
    color = "#32CD32"; // win = green
  }
  return "<span style=\"color:" + color + "\">" + str + "</span>";
}

//---------------------------------------------------------------
function getClassColorStr(class) {
  return "<span style=\"color:" + getClassSoulColor(class) + "\">" + class + "</span>";
}

//---------------------------------------------------------------
function get1ColorStr(str, c1) {
  return "<span style=\"color:" + getEstiahFightColor(c1) + "\">" + str + "</span>";
}

//---------------------------------------------------------------
function get2ColorStr(str, c1, c2) {
  var bits = str.split("/");
  if (bits.length != 2) {
    return "<span style=\"color:" + getEstiahFightColor(c1) + "\">" + str + "</span>";
  }
  return "<span style=\"color:" + getEstiahFightColor(c1) + "\">" + bits[0] + "</span>/<span style=\"color:" + getEstiahFightColor(c2) + "\">" + bits[1] + "</span>";
}

//---------------------------------------------------------------
function get3ColorStr(str, c1, c2, c3) {
  var bits = str.split("/");
  if (bits.length != 3) {
    return "<span style=\"color:" + getEstiahFightColor(c1) + "\">" + str + "</span>";
  }
  return "<span style=\"color:" + getEstiahFightColor(c1) + "\">" + bits[0] + "</span>/<span style=\"color:" + getEstiahFightColor(c2) + "\">" + bits[1] + "</span>/<span style=\"color:" + getEstiahFightColor(c3) + "\">" + bits[2] + "</span>";
}

//---------------------------------------------------------------
function getMeleeStr(str) {
  return get2ColorStr(str, "melee", "armor");
}
//---------------------------------------------------------------
function getMagicStr(str) {
  return get2ColorStr(str, "magic", "ward");
}
//---------------------------------------------------------------
function getSpiritStr(str) {
  return get2ColorStr(str, "spirit", "willpower");
}
//---------------------------------------------------------------
function getSpecialStr(str) {
  var arr = str.split('');
  cnt = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] == '/') {
      cnt++;
    }
  }
  if (cnt == 2) {
    return get3ColorStr(str, "none", "special", "special");
  }
  else {
    return get2ColorStr(str, "special", "special");
  }
}

//---------------------------------------------------------------
function addHeader(tab) {
  // add header
  tab.insertRow(0);
  tab.insertRow(1);
  tab.insertRow(2);

  var cell = addLeftHeaderCell(tab.rows[0], "top");
  cell.rowSpan = 2;
  cell.innerHTML = "Date";

  cell = addHeaderCell(tab.rows[0], "top");
  cell.rowSpan = 2;
  cell.innerHTML = "Win";

  cell = addHeaderCell(tab.rows[0], "top");
  cell.rowSpan = 2;
  cell.innerHTML = "Name";

  cell = addHeaderCell(tab.rows[0], "top");
  cell.rowSpan = 2;
  cell.innerHTML = "Level";

  cell = addLeftHeaderCell(tab.rows[2], "bottom");
  cell.colSpan = 2;
  cell.innerHTML = "City";

  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.colSpan = 2;
  cell.innerHTML = "My Gear";

  cell = addHeaderCell(tab.rows[0], "both");
  cell.rowSpan = 3;
  cell.innerHTML = "HP";

  cell = addHeaderCell(tab.rows[0], "both");
  cell.rowSpan = 3;
  cell.innerHTML = "Cards";

  cell = addHeaderCell(tab.rows[0], "top");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[1], "middle");
  cell.innerHTML = getMeleeStr("Melee");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.innerHTML = getMeleeStr("Take/Absorb");

  cell = addHeaderCell(tab.rows[0], "top");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[1], "middle");
  cell.innerHTML = getMagicStr("Magic");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.innerHTML = getMagicStr("Take/Ward");

  cell = addHeaderCell(tab.rows[0], "top");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[1], "middle");
  cell.innerHTML = getSpiritStr("Spirit");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.innerHTML = getSpiritStr("Take/Resist");

  cell = addHeaderCell(tab.rows[0], "top");
  cell.style.borderBottomStyle = "none";
  cell = addHeaderCell(tab.rows[1], "middle");
  cell.style.borderBottomStyle = "none";
  cell.innerHTML = getSpecialStr("HP");
  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.innerHTML = getSpecialStr("Loss/Gain");

  cell = addHeaderCell(tab.rows[0], "top");
  cell.style.borderBottomStyle = "none";
  cell.innerHTML = "Plays/";
  cell = addHeaderCell(tab.rows[1], "middle");
  cell.style.borderBottomStyle = "none";
  cell.innerHTML = getSpecialStr("Xtra") + "/";
  cell = addHeaderCell(tab.rows[2], "bottom");
  cell.innerHTML = getSpecialStr("Stun");

  cell = addRightHeaderCell(tab.rows[0], "both");
  cell.rowSpan = 3;
  cell.innerHTML = "Del";

}

//---------------------------------------------------------------
function token2map(token) {
  var map = new Object();
  token = token.replace(/^\"/,'');
  token = token.replace(/\"$/,'');
  var bits = token.split("\"\"");

  // extract key value pairs and put them in a map
  for (var i = 0; i < bits.length; i+=2) {
    map[bits[i]] = bits[i+1];
  }
  
  map["date"] = map["date"].replace(/(\d+)\/(\d+)\/(\d+)/,'$1/$2');
  map["myname"] = getUsername();
  if (map["yourclass"] == "?") {
    // don't display unknown class
    map["yourclass"] = "";
  }
  return map;
}

//---------------------------------------------------------------
function addEntryToTable(tab, map, rowIndex, token) {
    // size of one fight entry
    tab.insertRow(rowIndex);
    tab.insertRow(rowIndex+1);
    tab.insertRow(rowIndex+2);

    var cell = addLeftCell(tab.rows[rowIndex], "left", "top");
    cell.rowSpan = 2;
    cell.innerHTML = map["date"];

    var cell = addCell(tab.rows[rowIndex], "center", "top");
    cell.innerHTML = getWinStr(map["win"]);
    cell.style.borderBottomStyle = "none";
    var cell = addCell(tab.rows[rowIndex + 1], "center", "middle");
    cell.style.borderTopStyle = "none";
    cell.innerHTML = map["how"];

    var cell = addLeftCell(tab.rows[rowIndex + 2], "left", "bottom");
    cell.colSpan = 2;
    cell.innerHTML = map["city"];

    var cell = addCell(tab.rows[rowIndex + 2], "left", "bottom");
    cell.colSpan = 2;
    cell.innerHTML = map["mydeck"];

    var cell = addCell(tab.rows[rowIndex + 2], "left", "bottom");
    cell.colSpan = 7;
    var notesa = document.createElement("a");
    notesa.style.textDecoration = "none";
    notesa.id = tab.id + " pvp_fight_notes " + map["fightid"];
    notesa.innerHTML = displayNotes(map["notes"]);
    cell.appendChild(notesa);
    notesa.addEventListener("click",modifyNotes,false);

    var cell = addCell(tab.rows[rowIndex], "left", "top");
    if (map["yourid"] != "?") {
      var chara = document.createElement("a");
      chara.style.textDecoration = "none";

      chara.innerHTML = getClassColorStr(map["yourclass"]) + " " + get1ColorStr(map["yourname"],"player");
      cell.appendChild(chara);
      chara.addEventListener("click",jump(map["yourid"]),true);
    }
    else {
      cell.innerHTML = getClassColorStr(map["yourclass"]) + " " + get1ColorStr(map["yourname"],"player");
    }

    var cell = addCell(tab.rows[rowIndex+1], "left", "middle");
    cell.innerHTML = get1ColorStr(map["myname"], "player");

    var cell = addCell(tab.rows[rowIndex + 1], "center", "middle");
    cell.innerHTML = map["mylvl"];
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getRatioStr(map["myhp"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getRatioStr(map["mycards"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getMeleeStr(map["mymelee"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getMagicStr(map["mymagic"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getSpiritStr(map["myspirit"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getSpecialStr(map["mygainloss"]);
    var cell = addCell(tab.rows[rowIndex + 1], "right", "middle");
    cell.innerHTML = getSpecialStr(map["myxtrastun"]);

    var cell = addCell(tab.rows[rowIndex], "center", "top");
    cell.innerHTML = map["yourlvl"];
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getRatioStr(map["yourhp"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getRatioStr(map["yourcards"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getMeleeStr(map["yourmelee"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getMagicStr(map["yourmagic"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getSpiritStr(map["yourspirit"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getSpecialStr(map["yourgainloss"]);
    var cell = addCell(tab.rows[rowIndex], "right", "top");
    cell.innerHTML = getSpecialStr(map["yourxtrastun"]);

    var cell = addRightCell(tab.rows[rowIndex], "center", "both");
    cell.rowSpan = tableEntryRows();
    var dela = document.createElement("a");
    dela.innerHTML = "[X]";
    dela.setAttribute("class", "c2 nolink func");
    dela.setAttribute("title", "Delete Fight");
    dela.id = "pvp_fight_log_delete " + map["fightid"];
    cell.appendChild(dela);
    dela.addEventListener("click", deleteSingleFight, false);

    var cell = addCell(tab.rows[rowIndex], "center", "middle");
    cell.style.borderTop = "0px none";
    cell.style.borderLeft = "0px none";
    cell.style.borderBottom = "0px none";
    cell.style.borderRight = "0px none";
    cell.style.display = "none";
    cell.id = tab.id + " pvp_fight_log_fightid " + map["fightid"];
    cell.innerHTML = map["fightid"];
}

//---------------------------------------------------------------
function addNewTable(name) {
  var thediv = document.getElementById("pvp_fight_tables");
  var tab = document.createElement("table");
  tab.id = "pvp_fight_log_table " + name;
  tab.cellSpacing = 0;
  tab.cellPadding = 0;
  addHeader(tab);
  tab.style.display = "none";  // hidden
  thediv.appendChild(tab);
  
  var statusdiv = document.createElement("div");
  statusdiv.innerHTML = "empty";
  statusdiv.id = "pvp_fight_log_table_status " + name;
  statusdiv.style.display = "none";  // hidden
  thediv.appendChild(statusdiv);

  var filterdiv = document.createElement("div");
  filterdiv.innerHTML = "";
  filterdiv.id = "pvp_fight_log_table_filter " + name;
  filterdiv.style.display = "none";  // hidden
  thediv.appendChild(filterdiv);

  addCaption (tab, name);
}

//---------------------------------------------------------------
function addCaption(tab, name) {
  myname = getUsername();
  city = getCity();
  var cap = tab.createCaption();

  cap.style.fontSize = "larger";
  cap.style.margin = "0px 0px 3px 0px";
  cap.style.width = "100%";
  cap.style.color = "#f6ba68";
  cap.style.fontWeight = "bold";
  if (name == "allfights") {
    cap.innerHTML = "All " + myname + "'s Fights";
  }
  else if (name == "singleopponent") {
    cap.innerHTML = myname + " vs. ?";
  }
  else if (name == "currentmoblist") {
    cap.innerHTML = myname + "'s Fights vs. Opponents in Current Page";
  }
  else if (name == "currentcity") {
    cap.innerHTML = myname + "'s Fights vs. Opponents in " + city;
  }
}

//---------------------------------------------------------------
function updateTable(tabname, tab, charmap) {
  var status = getTableStatus(tabname);
  if (status == "full") return;
  // else status is "empty" - fill table completely

  var varname = getFightLogVarname();
  var log = GM_getValue(varname, "");

  // split tokens into an array
  var rowIndex = tableHeaderRows();
  var tokens = log.split("}{");
  if (! tokens.length) return;

  // strip leading '{' and trailing '}'
  tokens[0] = tokens[0].replace(/^{(.*)/,'$1');
  maxTokenIdx = tokens.length - 1;
  tokens[maxTokenIdx] = tokens[maxTokenIdx].replace(/(.*)}$/,'$1');

  // iterate on tokens
  for (var i = 0; i < tokens.length; i++) {
    var yourname = tokens[i].replace(/.*\"yourname\"\"([^\"]+)\".*/,'$1');
    // if charname map was provided - check that this token opponent name
    // is in the map before adding it to the table
    if ((charmap) && (! charmap[yourname])) {
      continue;
    }
    var map = token2map(tokens[i]);
    addEntryToTable(tab, map, rowIndex);
    rowIndex = rowIndex + tableEntryRows();
  }
  setTableStatus(tabname, "full");
}

//---------------------------------------------------------------
function getTableStatus(tabname) {
  statusdiv = document.getElementById("pvp_fight_log_table_status " + tabname);
  return statusdiv.innerHTML;
}

//---------------------------------------------------------------
function setTableStatus(tabname, status) {
  statusdiv = document.getElementById("pvp_fight_log_table_status " + tabname);
  statusdiv.innerHTML = status;
}

//---------------------------------------------------------------
function hideAllTables() {
  var thediv = document.getElementById("pvp_fight_tables");
  var tables = thediv.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    tables[i].style.display = "none";
  }
}

//---------------------------------------------------------------
function getTable(name) {
  return document.getElementById("pvp_fight_log_table " + name);
}

//---------------------------------------------------------------
function showTable(tab) {
  tab.style.display = "";
}

//---------------------------------------------------------------
function addLoading() {
  thediv = document.createElement("div");
  thediv.id = "pvp_fight_table_loading";
  thediv.style.display = "none";
  thediv.style.margin = "7px 7px 7px 7px";

  theimg = document.createElement("img");
  theimg.src = "/image/template/phoenix/loading.gif";
  theimg.style.verticalAlign = "top";
  thediv.appendChild(theimg);

  sometext = document.createElement("text");
  sometext.innerHTML = " loading...";
  thediv.appendChild(sometext);

  var topdiv = document.getElementById("pvp_fight_tables");
  topdiv.appendChild(thediv);
}

//---------------------------------------------------------------
function showLoading() {
  thediv = document.getElementById("pvp_fight_table_loading");
  thediv.style.display = "";
}

//---------------------------------------------------------------
function hideLoading() {
  thediv = document.getElementById("pvp_fight_table_loading");
  thediv.style.display = "none";
}

//---------------------------------------------------------------
function estiahShowAllFightLog() {
  hideAllTables();
  showLoading();
  setTimeout(internalShowAllFightLog, 0);
}
function internalShowAllFightLog() {
  tabname = "allfights";
  var tab = getTable(tabname);
  updateTable(tabname, tab);
  hideLoading();
  showTable(tab);
}

//---------------------------------------------------------------
function getCurrentCityListNames() {
  var charmap = new Object();
  // TODO
  return charmap;
}

//---------------------------------------------------------------
function getCurrentMobListNames() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  var charmap = new Object();
  for (var i = 0; i < mobnodes.length; i++) {
    var thehtml = mobnodes[i].innerHTML.replace(/\n/g, '');
    var charname = thehtml.replace(/.*<a[^>]*character\/[^>]+>([^<]+).*/,'$1');
    charmap[charname] = 1;
  }
  return charmap;    
}

//---------------------------------------------------------------
function estiahShowCurrentMobsFightLog() {
  hideAllTables();
  showLoading();
  setTimeout(internalShowCurrentMobsFightLog, 0);

  function internalShowCurrentMobsFightLog() {
    tabname = "currentmoblist";
    var tab = getTable("currentmoblist");
    var charmap = getCurrentMobListNames();
    updateTable(tabname, tab, charmap);
    hideLoading();
    showTable(tab);
  }
}

//---------------------------------------------------------------
function estiahShowCurrentCityFightLog() {
  hideAllTables();
  showLoading();
  setTimeout(internalShowCurrentCityFightLog, 0);

  function internalShowCurrentCityFightLog() {
    tabname = "currentcity";
    var tab = getTable("currentcity");
    var charmap = getCurrentCityListNames();
    updateTable(tabname, tab, charmap);
    hideLoading();
    showTable(tab);
  }
}

//---------------------------------------------------------------
function clearTable(tab) {
  numrows = tab.rows.length;
  for (var i = tableHeaderRows(); i < numrows; i++) {
    tab.deleteRow(tableHeaderRows());
  }
}

//---------------------------------------------------------------
function showSingleCharFightLog(charname) {
  hideAllTables();
  showLoading();
  setTimeout(internalShowSingleCharFightLog, 0);

  function internalShowSingleCharFightLog() {
    tabname = "singleopponent";
    var tab = getTable(tabname);
    clearTable(tab);
    setTableStatus(tabname, "empty");
    var charmap = new Object();
    charmap[charname] = 1;
    updateTable(tabname, tab, charmap);
    tab.caption.innerHTML = tab.caption.innerHTML.replace(/(.* vs\. ).*/,'$1 ' + charname);
    hideLoading();
    showTable(tab);
  }
}

//---------------------------------------------------------------
// wrapper for [Log] link to call
function estiahShowSingleCharFightLog() {
  var charname = this.id.replace(/MobFightLog (.*)/,'$1');
  showSingleCharFightLog(charname);
}

//---------------------------------------------------------------
function estiahHideFightLog() {
  hideAllTables();
}

//---------------------------------------------------------------
// Save a fight
//---------------------------------------------------------------
function estiahSaveFight() {
  var str = getFightStr();  
  if (!str) return;

  var varname = getFightLogVarname();
  var log = GM_getValue(varname, "");
  var newlog = prependToken(log, str);
  GM_setValue(varname, newlog);

  var map = token2map(str);

  // add fight to all tables except singleopponent one
  rowIndex = tableHeaderRows();
  var thediv = document.getElementById("pvp_fight_tables");
  var tables = thediv.getElementsByTagName("table");

  // Don't add an entry to singleopponent because it will get cleared 
  // when that table is next displayed anyway.
  // Don't add an entry to empty tables because it will cause a duplicate
  // entry.
  // Add to allfights, currentmob, currentcity.  Have to be in both
  // in order to do the fight anyway.  Exception is for coliseum/replays
  // but we disable show by currentmob/currentcity in that case anyway.
  for (var i = 0; i < tables.length; i++) {
    var tabname = getTablename(tables[i]);
    if (getTableStatus(tabname) == "empty") continue;
    if (tables[i].id.indexOf("singleopponent") >= 0) continue;
    addEntryToTable(tables[i], map, rowIndex);
  }

  showSingleCharFightLog(map["yourname"]);
  
  // update the [Log] links in the moblist
  addRemoveLogLinksInMobList();
}

//---------------------------------------------------------------
function getTablename(table) {
  return table.id.replace(/pvp_fight_log_table (.*)/,'$1');
}

//---------------------------------------------------------------
// Reset the log
//---------------------------------------------------------------
function estiahResetLog() {
  var answer = confirm("Are you sure you want to reset the log?");
  if (answer) {
    GM_setValue(getFightLogVarname(), "");
    
    var thediv = document.getElementById("pvp_fight_tables");
    var tables = thediv.getElementsByTagName("table");
    for (var i = 0; i < tables.length; i++) {
      clearTable(tables[i]);
      var tabname = getTablename(tables[i]);
      setTableStatus(tabname, "empty");
    }
    hideAllTables();
    // clean up [Log] links in mob list
    addRemoveLogLinksInMobList();
  }
}

//---------------------------------------------------------------
// create links to display/reset the log
//---------------------------------------------------------------
function addLinks(pvpLogDiv) {
  //------- first row of links
  var linksdiv = document.createElement("div");
  linksdiv.id = "pvp_fight_log_links_mod";
  linksdiv.style.width = "100%";
  linksdiv.style.margin = "7px 0px 0px 5px";

  thediv = document.createElement("div");
  //NOT NEEDED thediv.style.cssFloat = "none";
  thediv.style.margin = "2px 4px 2px 4px";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Clear PvP Fight Log\">[Reset Fight Log]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahResetLog,false);

  var thediv = document.createElement("div");
  thediv.style.margin = "2px 4px 2px 4px";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Save Fight Summary\">[Save Fight]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahSaveFight,false);
  pvpLogDiv.appendChild(linksdiv);

  //------- next row of links
  linksdiv = document.createElement("div");
  linksdiv.style.margin = "3px 0px 5px 5px";
  linksdiv.id = "pvp_fight_log_links_mod";
  linksdiv.style.width = "100%";

  var thediv = document.createElement("div");
  thediv.style.margin = "2px 4px 2px 4px";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Hide fight summaries\">[Hide Fights]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahHideFightLog,false);

  var thediv = document.createElement("div");
  thediv.style.margin = "2px 4px 2px 4px";
  thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Show all fights in the PvP Fight Log\">[Show All Fights]</a>";
  linksdiv.appendChild(thediv);
  thediv.addEventListener("click",estiahShowAllFightLog, false);

  if (document.location.href.indexOf("character/combat") < 0) {
    // don't add show by current page or by current city if on a replay page
    var thediv = document.createElement("div");
    thediv.style.margin = "2px 4px 2px 4px";
    thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Show fights with current page opponents\">[Show Fights vs. Current Page Opponents]</a>";
    linksdiv.appendChild(thediv);
    thediv.addEventListener("click",estiahShowCurrentMobsFightLog,false);
    
    var thediv = document.createElement("div");
    thediv.style.margin = "2px 4px 2px 4px";
    city = getCity();
    thediv.innerHTML = "<a class=\"c2 nolink func\" title=\"Show fights with opponents currently in " + city + "\">[Show Fights vs. Opponents in " + city + "]</a>";
    //TODO linksdiv.appendChild(thediv);
    thediv.addEventListener("click",estiahShowCurrentCityFightLog,false);
  }

  pvpLogDiv.appendChild(linksdiv);
 
}

//---------------------------------------------------------------
function haveFight(charname) {
  var varname = getFightLogVarname();
  var log = GM_getValue(varname, "");

  var re = new RegExp("\"yourname\"\"" + charname + "\"", "g");
  if (re.exec(log)) {
    return true;
  }
  return false;
}

//---------------------------------------------------------------
function addBountyToMobList() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  for (var i = 0; i < mobnodes.length; i++) {
    var thehtml = mobnodes[i].innerHTML.replace(/\n/g, '');
    var charid = thehtml.replace(/.*character\/(\d+).*/,'$1');
    var charname = thehtml.replace(/.*<a[^>]*character\/[^>]+>([^<]+).*/,'$1');

    bounty = getBountyAmount(charid);
    if (bounty != 0) {
      var classdiv = mobnodes[i].getElementsByClassName("name");
      if (classdiv.length != 1) continue;

      var text1 = document.createElement("text");
      text1.innerHTML = " | ";
      text1.style.fontSize = "smaller";
      var text2 = document.createElement("text");
      text2.className = "pow"; // red
      text2.style.fontSize = "smaller";
      text2.innerHTML = bounty + "g";
      classdiv[0].appendChild(text1);
      classdiv[0].appendChild(text2);
    }
  }
}

//---------------------------------------------------------------
function colorClassesOnMobList() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  for (var i = 0; i < mobnodes.length; i++) {
    var classdiv = mobnodes[i].getElementsByClassName("classname lhp");
    if (classdiv.length != 1) continue;
    var theclass = classdiv[0].getElementsByTagName("strong");
    if (theclass.length != 1) continue;
    theclass[0].style.color = getClassSoulColor(theclass[0].innerHTML);
  }
}

//        <div class="avatar">            <a href="/character/51899" class="BV_system_file">                <img src="/image/system/default_avatar.png">            </a>        </div>        <div class="name">            <a href="/character/51899" class=" nolink BV_system_file">Luoz3</a>        </div>        <div class="classname lhp"><strong>Adventurer</strong></div>        <div class="info lhp">            <a href="/json/pvp/match/index/mob/51899" onclick="return false;" id="MobFight51899" class="c2 nolink func BV_vslist_fight">[Fight]</a>            L.<strong>20</strong> |            Rating <strong>1815</strong>        </div>   
//---------------------------------------------------------------
function addRemoveLogLinksInMobList() {
  var mobnodes = document.getElementsByClassName("mob opacity outline BV_system_highlight");
  for (var i = 0; i < mobnodes.length; i++) {
    var thehtml = mobnodes[i].innerHTML.replace(/\n/g, '');
    var charname = thehtml.replace(/.*<a[^>]*character\/[^>]+>([^<]+).*/,'$1');

    if (haveFight(charname)) {
      var infodiv = mobnodes[i].getElementsByClassName("info lhp");
      if (infodiv.length != 1) continue;
      var fightlink = infodiv[0].getElementsByTagName("a");
      if (fightlink.length != 1) continue;

      var anchor = document.createElement("a");
      anchor.className = "c2 nolink func";
      anchor.id = "MobFightLog " + charname;
      anchor.innerHTML = "[Log]";
      anchor.style.margin = "0px 2px 0px 2px";
      anchor.addEventListener("click",estiahShowSingleCharFightLog,false);
      insertAfter(anchor, fightlink[0]);
    }
    else {
      // no fights exist - check if the [log] link is there and delete it.
      var infodiv = mobnodes[i].getElementsByClassName("info lhp");
      if (infodiv.length != 1) continue;
      var links = infodiv[0].getElementsByTagName("a");
      if ((links.length == 2) && (links[1].innerHTML == "[Log]")) {
        infodiv[0].removeChild(links[1]);
      }
    }
  }
}

//---------------------------------------------------------------
function modifyMobList() {
  colorClassesOnMobList();
  addBountyToMobList();
  addRemoveLogLinksInMobList();
}

//---------------------------------------------------------------
function activateFightLinks() {
  var adiv = document.createElement("div");
  adiv.style.display = "none";
  adiv.innerHTML = "<script src=\"/js/battle.js?362.2\" type=\"text/javascript\" charset=\"utf-8\"></script>";
  var div = document.getElementById("SystemInfo");
  div.appendChild(adiv);
  div.removeChild(adiv);
}

//---------------------------------------------------------------
function myFunction() {
  alert('myfunction');
  var origVsListChangeFunction = VsList.change;
  var myVsListChangeFunction = function() {
    // call the original change function then do my stuff.
    origVsListChangeFunction();
    alert('worked');
  }
}

//---------------------------------------------------------------
function setupMonitorVsList() {
  var thediv = document.getElementById("VsMobList");
  if (!thediv) return; // not the PvP page

  // cache a pointer to the original VsList.change function
  var origVsListChangeFunction = unsafeWindow.VsList.change;

  // create my new VsList.change function
  var myVsListChangeFunction = function() {
    // call the original change function then do my stuff.
    origVsListChangeFunction();

    // Wait half a second for moblist to get cleared and says 'loading'
    // Then call the next function after that happens.
    seconds = 0.5;
    var timer = seconds*1000; // milliseconds
    setTimeout(myVsListChangeFunctionMid, timer)
  };

  // second part of my new VsList.change function
  var myVsListChangeFunctionMid = function() {
    // poll the VsMoblist to see if it still says "loading..."
    var thediv = document.getElementById("VsMobList");
    if (thediv.innerHTML.indexOf("loading...") >= 0) {
      seconds = 0.5;
      var timer = seconds*1000; // poll every 0.5 seconds
      setTimeout(myVsListChangeFunctionMid, timer);
      return;
    }
    var timer = 0.5*1000; // give a half-second to finish update of moblist
    setTimeout(myVsListChangeFunctionEnd, timer);
  }

  // last part of my new VsList.change function
  var myVsListChangeFunctionEnd = function() {
    // VsMoblist has updated - add my stuff to the mob list
    modifyMobList();
  }

  // overwrite existing VsList.change to point to mine
  unsafeWindow.VsList.change = myVsListChangeFunction;
}

//---------------------------------------------------------------
// Add interface for the log
//---------------------------------------------------------------
function estiahPvpLogSetup() {

  setupMonitorVsList();
  modifyMobList();

  var pvpLogDiv = document.createElement("div");
  pvpLogDiv.style.border = "1px solid #aa7711";
  pvpLogDiv.id = "pvp_fight_log_mod";
  var e = document.evaluate("//div[@class='moblist format']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (!e.singleNodeValue) {
    //<div id="VsRedirect" class="section_text" style="display:none">
    e = document.evaluate("//div[@id='VsRedirect']", 
	document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  }
  e.singleNodeValue.parentNode.appendChild(pvpLogDiv);

  // title div
  var thediv = document.createElement("div");
  thediv.style.fontSize = "larger";
  thediv.style.margin = "7px 0px 0px 0px";
  thediv.style.width = "100%";
  thediv.className = "deck highlight";
  thediv.innerHTML = "<p align=\"left\" style=\"color: #f6ba68;font-weight: bold;margin-left: 10px;margin-bottom: 7px\">Fight Log</p>";
  pvpLogDiv.appendChild(thediv);

  // add links
  addLinks(pvpLogDiv);
  addLineBreak(pvpLogDiv);

  // create div to hold all the fight log tables
  thediv = document.createElement("div");
  thediv.style.margin = "20px 0px 0px 0px";
  thediv.id = "pvp_fight_tables";
  pvpLogDiv.parentNode.appendChild(thediv);

  addNewTable("allfights");
  addNewTable("singleopponent");
  addNewTable("currentmoblist");
  addNewTable("currentcity");

  addLoading();
}

//---------------------------------------------------------------
// Execute script
//---------------------------------------------------------------
window.addEventListener('load',estiahPvpLogSetup,false);




//------------------------------------------------
// autojump stuff - still not working
  // change to players of all level
  //var sel = document.evaluate("//select[@name='type']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //if (!sel.singleNodeValue) return;
  //sel.singleNodeValue.selectedIndex = 1;

  // make default sort by level
  //var rad = document.evaluate("//input[@value='level']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  //if (!rad.singleNodeValue) return;
  //rad.singleNodeValue.click();
