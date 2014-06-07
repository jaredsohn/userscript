// ==UserScript==
// @name          Craig mail
// @namespace     http://jeffpalm.com/craigmail
// @description   Mail all on craigslist
// @include       http://*.craigslist.org/*
// ==/UserScript==

/*
 * Copyright 2007 Jeffrey Palm.
 */

// --------------------------------------------------
// misc
// --------------------------------------------------

function $e(id) {
  if (typeof id == "string") {
    var el = $(id);
    if (!el) alert("unkown node: " + id);
    return el;
  }
  return id;
}

function $(id) {
  if (typeof id == "string") {
    var el = document.getElementById(id);
    return el;
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


var emails = new Array();
function newFunction(_a) {
  var a = _a;
  return function(details) {
    if (details.responseText) {
      if (m = /href=\"mailto\:([^\?]+)\?/.exec(details.responseText)) {
        var email = m[1];
        emails.push(email);
        if (++cur == numIds) {
          var link = "mailto:";
          for (var j=0; j<emails.length; j++) {
            if (j>0) link += ",";
            link += emails[j];
          }
          document.location = link;
        }
      }
      return 0;
    }
  };
}


function mailAll() {
  emails = new Array();
  var sel = new Array();
  for (var i in ids) {
    var id = ids[i];
    if ($(id).checked == true || $(id).checked == "true") {
      sel.push(id);
    }
  }
  numIds = sel.length;
  for (var i in sel) {
    var id = sel[i];
    var url = ids2links[id];
    note(url);
    GM_xmlhttpRequest({
      method:"GET",
          url: url,
          headers:{
          "User-Agent": "monkeyagent",
            "Accept":"text/html,text/monkey,text/xml,text/plain",
            },
          onload: newFunction(link)
          });
  }
}

function selectAll() {
  for (var i in ids) {
    $(ids[i]).checked = true;
  }
}

function selectNone() {
  for (var i in ids) {
    $(ids[i]).checked = false;
  }
}

function makeA(div,html,callback) {
  var a = $n("a",div);
  a.href = "#";
  a.innerHTML = html;
  a.addEventListener("click",callback,true);
}

function insertLink() {
  var body = document.getElementsByTagName("body")[0];
  var div = $n("div");
  insertBefore(div,body.firstChild);
  $t("[ ",div);
  makeA(div,"mail all",mailAll);
  $t(" | ",div);
  makeA(div,"select all",selectAll);
  $t(" | ",div);
  makeA(div,"select none",selectNone);
  $t(" ",div);
  noteSpan = $n("span",div);
  $t(" ",div);
  $t(" ]",div);
}

function note(msg) {
  noteSpan.innerHTML = "<em>" + msg + "</em>";
}

function done() {
  note("done");
}

var CHARS = new Array();
CHARS[33] = '!';
CHARS[34] = '"';
CHARS[35] = '#';
CHARS[36] = '$';
CHARS[37] = '%';
CHARS[38] = '&';
CHARS[39] = '\'';
CHARS[40] = '(';
CHARS[41] = ')';
CHARS[42] = '*';
CHARS[43] = '+';
CHARS[44] = ',';
CHARS[45] = '-';
CHARS[46] = '.';
CHARS[47] = '/';
CHARS[48] = '0';
CHARS[49] = '1';
CHARS[50] = '2';
CHARS[51] = '3';
CHARS[52] = '4';
CHARS[53] = '5';
CHARS[54] = '6';
CHARS[55] = '7';
CHARS[56] = '8';
CHARS[57] = '9';
CHARS[58] = ':';
CHARS[59] = '';
CHARS[60] = '<';
CHARS[61] = '=';
CHARS[62] = '>';
CHARS[63] = '?';
CHARS[64] = '@';
CHARS[65] = 'A';
CHARS[66] = 'B';
CHARS[67] = 'C';
CHARS[68] = 'D';
CHARS[69] = 'E';
CHARS[70] = 'F';
CHARS[71] = 'G';
CHARS[72] = 'H';
CHARS[73] = 'I';
CHARS[74] = 'J';
CHARS[75] = 'K';
CHARS[76] = 'L';
CHARS[77] = 'M';
CHARS[78] = 'N';
CHARS[79] = 'O';
CHARS[80] = 'P';
CHARS[81] = 'Q';
CHARS[82] = 'R';
CHARS[83] = 'S';
CHARS[84] = 'T';
CHARS[85] = 'U';
CHARS[86] = 'V';
CHARS[87] = 'W';
CHARS[88] = 'X';
CHARS[89] = 'Y';
CHARS[90] = 'Z';
CHARS[91] = '[';
CHARS[92] = '\\';
CHARS[93] = ']';
CHARS[94] = '^';
CHARS[95] = '_';
CHARS[96] = '`';
CHARS[97] = 'a';
CHARS[98] = 'b';
CHARS[99] = 'c';
CHARS[100] = 'd';
CHARS[101] = 'e';
CHARS[102] = 'f';
CHARS[103] = 'g';
CHARS[104] = 'h';
CHARS[105] = 'i';
CHARS[106] = 'j';
CHARS[107] = 'k';
CHARS[108] = 'l';
CHARS[109] = 'm';
CHARS[110] = 'n';
CHARS[111] = 'o';
CHARS[112] = 'p';
CHARS[113] = 'q';
CHARS[114] = 'r';
CHARS[115] = 's';
CHARS[116] = 't';
CHARS[117] = 'u';
CHARS[118] = 'v';
CHARS[119] = 'w';
CHARS[120] = 'x';
CHARS[121] = 'y';
CHARS[122] = 'z';
CHARS[123] = '{';
CHARS[124] = '|';
CHARS[125] = '}';
CHARS[126] = '~';
var cur = 0;
var cnt = 0;
var ids = new Array();
var ids2links = new Array();
var noteSpan;
var numIds = 0;
function insertCheckBoxes() {
  var links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    link = links[i];
    if (link.href && link.href.match(/.*craigslist.org.*\/\d+\.html$/)) {
      var par = link.parentNode;
      var span = $n("span");
      insertBefore(span,link);
      var cb = $n("input",span);
      var id = "_i" + cnt++;
      ids.push(id);
      cb.id = id;
      ids2links[id] = link.href;
      cb.type = "checkbox";
    }
  }
}

function main() {
  insertLink();
  insertCheckBoxes();
}

main();
