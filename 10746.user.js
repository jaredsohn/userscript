// ==UserScript==
// @name          Craigslist image preview
// @namespace     http://jeffpalm.com/overheardinnewyork
// @description   Send IMs to people from overheardinnewyork.com
// @include       http://*overheardinnewyork.com*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm.
 */

// --------------------------------------------------
// Misc
// --------------------------------------------------

var PREFIX = "*ohinny*.";
var PARAM_LIST = "list";
var SEP = "|";
var sendLink;

function setValue(key,val) {
  return GM_setValue(PREFIX + key,val);
}

function getValue(key,defaultValue) {
  var res = GM_getValue(PREFIX + key);
  if (!res) res = defaultValue;
  return res;
}

function $(id) {
  if (typeof(id) == "string") {
    return document.getElementById(id);
  }
  return id;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function $n(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function $t(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

function isFalse(s) {
  return !s || s == "false";
}

// ====================================================================
//       URLEncode and URLDecode functions
//
// Copyright Albion Research Ltd. 2002
// http://www.albionresearch.com/
//
// You may copy these functions providing that 
// (a) you leave this copyright notice intact, and 
// (b) if you use these functions on a publicly accessible
//     web site you include a credit somewhere on the web site 
//     with a link back to http://www.albionresearch.com/
//
// If you find or fix any bugs, please let us know at albionresearch.com
//
// SpecialThanks to Neelesh Thakur for being the first to
// report a bug in URLDecode() - now fixed 2003-02-19.
// And thanks to everyone else who has provided comments and suggestions.
// ====================================================================
function urlencode(plaintext)
{
  // the Javascript escape and unescape functions do not correspond
  // with what browsers actually do...
  var SAFECHARS = "0123456789" +					// Numeric
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +	// Alphabetic
    "abcdefghijklmnopqrstuvwxyz" +
    "-_.!~*'()";					// RFC2396 Mark characters
  var HEX = "0123456789ABCDEF";

  var encoded = "";
  for (var i = 0; i < plaintext.length; i++ ) {
    var ch = plaintext.charAt(i);
    if (ch == " ") {
      encoded += "+";				// x-www-urlencoded, rather than %20
    } else if (SAFECHARS.indexOf(ch) != -1) {
      encoded += ch;
    } else {
      var charCode = ch.charCodeAt(0);
      if (charCode > 255) {
        alert( "Unicode Character '" 
               + ch 
               + "' cannot be encoded using standard URL encoding.\n" +
               "(URL encoding only supports 8-bit characters.)\n" +
               "A space (+) will be substituted." );
        encoded += "+";
      } else {
        encoded += "%";
        encoded += HEX.charAt((charCode >> 4) & 0xF);
        encoded += HEX.charAt(charCode & 0xF);
      }
    }
  } // for

  return encoded;
}

function trim(s) {
  s = s.replace(/^\s+/,"");
  s = s.replace(/\s+$/,"");
  return s;
}

// --------------------------------------------------
// Main
// --------------------------------------------------

function addNewUser() {
  var ans = prompt("Please type a new user");
  if (isFalse(ans)) return;
  var lst = getValue(PARAM_LIST,"");
  var ss = lst.split(SEP);
  for (var i in ss) {
    if (ss[i] == ans) {
      alert("You already have " + ss[i]);
      addNewUser();
      return;
    }
  }
  lst += ans + SEP;
  setValue(PARAM_LIST,lst);
}

function newFunction(_sel,_id) {
  var sel = _sel;
  var id = _id;
  return function() {
    var user = sel.value;
    sendIM(user,id);
  }
}

function addBoxes() {

  var lst = getValue(PARAM_LIST,"");
  var users = lst.split(SEP);
  if (users.length == 0) return;

  var divs = document.getElementsByTagName("div");
  for (var i in divs) {
    var d = divs[i];
    if (d.className != "blogbody") continue;
    var a = d.firstChild.nextSibling;
    var id = a.href; //a.href.replace(/.*\//,"");
    var spans = d.getElementsByTagName("span");
    for (var j in spans) {
      var s = spans[j];
      if (s.className != "otherlinks") continue;
      $t(" | ",s);
      var sel = $n("select",s);
      for (var k in users) {
        var u = users[k];
        var opt = $n("option",sel);
        opt.value = u;
        opt.innerHTML = u;
      }
      var newA = $n("a");
      newA.href = "#";
      newA.innerHTML = "IM";
      newA.addEventListener("click",newFunction(sel,id),true);      
      $t(" ",s);
      s.appendChild(newA);
    }

  }
}

function sendIM(user,id) {
  var as = document.getElementsByTagName("a");
  for (var i in as) {
    var a = as[i];
    if (a.className != "titlelink") continue;
    if (a.href != id) continue;

    var par = a.parentNode;

    var next;
    var msg = "";

    // Get the title
    next = a;
    while (next.nodeName != "H3") next = next.nextSibling;
    var title = trim(next.innerHTML);
    title = title.replace(/<[^>]+>/g,"");

    function send(s) {
      var url = "aim:goim?screenname=" + user + "&message=" + s + "%0A";
      document.location = url;
      pause(100);
    }

    send("*" + title + "*");

    var spans = par.getElementsByTagName("span");
    var loc = 0;
    for (var i=0; i<spans.length; i++) {
      var s = spans[i];
      if (s.className == "speakerline") {
        if (s.childNodes.length != 2) continue;
        var speaker = trim(s.childNodes[0].innerHTML);
        speaker = speaker.replace(/.*>/,"");
        speaker = speaker.replace(/\#/,"");
        var line = trim(s.childNodes[1].nodeValue);
        line = line.replace(/\:/,"");
        send("*" + speaker + "*: " + line);
      } else if (s.className == "location") {
        send(trim(s.innerHTML));
      }
    }
    
    send(tagLine());


    break;
  }

}

function pause(millis)
{
  var date = new Date();
  var curDate = null;
  
  do { curDate = new Date(); }
  while(curDate-date < millis);
} 

function tagLine() {
  return " Sent using http://jeffpalm.com/overheardinnewyork.user.js";
}

function addLink() {

  var ul = $("menuleft");
  if (!ul) return false;

  var li = $n("li",ul);
  var a  = $n("a",li);
  a.href = "#";
  a.innerHTML = "Add new IM";
  a.addEventListener("click",addNewUser,true);
  
  return true;
}

function main() {
  if (addLink()) addBoxes();
  
}

try {main();} catch (e) {}
