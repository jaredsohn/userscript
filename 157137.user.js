// ==UserScript==
// @name           	Forum Extract Mod for uso
// @namespace      	srazzano
// @description		Filters out any unwanted listings on forum.userstyles.org
// @author   		Sonny Razzano
// @version       	9.9.91
// @include        	http://forum.userstyles.org*
// @homepage		http://userscripts.org/scripts/show/157137
// ==/UserScript==

var fe0 = "Empty";
var fe1 = "Change Case";
var fe2 = "Delete Keyword";
var fe3 = "(1) Separate multiple entries with <> and no spacing.\n(2) Middle click inserts active keywords.\n(3) Double click clears field.\n(4) Filter does not catch '+', '(' or ')'\n(5) Double click filtered/unfiltered button for menulist of keywords.";
var fe4 = "Case-Sensitive";
var fe5 = "Set Case";
var fe6 = "Create Filter";
var fe7 = "Removing from filter:\n";
var fe8 = "Highlight To Select:";
var fe9 = "Double Click For Filter list"
var fe10 = "Filtered";
var fe11 = "Unfiltered";
var fe12 = "Case on";
var fe13 = "Case off";
var fe14 = "Non Case-Sensitive";
var fe16 = "Case-Sensitive Filter Search";
var fe17 = "Forum Extract Options";
var fe18 = "Turn Off Auto Insert Highlighted Text";
var fe19 = "Turn On Auto Insert Highlighted Text";
var fe20 = "Ok";
var fe21 = "Del";
var fe22 = "Auto Off";
var fe23 = "Auto On";

initGM();

function initGM() {
  const STORAGE_PREFIX = "usofe-", LOG_PREFIX = "Forum Extract: ", LOG = true, DEBUG = false;
  isGM = typeof GM_getValue != "undefined" && typeof GM_getValue("a", "b") != "undefined";
  log = isGM ? function(msg) {if(LOG) GM_log(msg)} : window.opera ? function(msg) {if(LOG) opera.postError(LOG_PREFIX+msg)} : function(msg) {try {if(LOG) console.log(LOG_PREFIX+msg)} catch(e) {}}
  debug = function(msg) {if(LOG && DEBUG) log("** Debug: " + msg + " **")}
  addStyle = isGM ? GM_addStyle : function(css) {var head = $("head")[0]; if(!head) return; var style = $c("style", {type:"text/css",innerHTML:css}); head.appendChild(style)}
  setValue = isGM ? GM_setValue : function(name,value) {switch (typeof(value)) {case "string": localStorage.setItem(STORAGE_PREFIX+name,"S]" + value); break; case "number": if(value.toString().indexOf(".") < 0) {localStorage.setItem(STORAGE_PREFIX + name, "N]" + value)} break; case "boolean": localStorage.setItem(STORAGE_PREFIX+name, "B]" + value); break}}
  getValue = isGM ? GM_getValue : function(name,defValue) {var value = localStorage.getItem(STORAGE_PREFIX + name); if(value == null) {return defValue} else {switch(value.substr(0,2)) {case "S]": return value.substr(2); case "N]": return parseInt(value.substr(2)); case "B]": return value.substr(2) == "true";}} return value}
  deleteValue = isGM ? GM_deleteValue : function(name) {localStorage.removeItem(STORAGE_PREFIX+name)}
}

function $(q, root, single, context) {
  root = root || document;
  context = context || root;
  if(q[0] == "#") return root.getElementById(q.substr(1));
  if(q.match(/^[\/*]|^\.[\/\.]/)) {
    if(single) return root.evaluate(q, context, null, 9, null).singleNodeValue;
    var arr = []; var xpr = root.evaluate(q, context, null, 7, null);
    for(var i = 0; i < xpr.snapshotLength; i++) arr.push(xpr.snapshotItem(i));
    return arr;
  }
  if(q[0] == ".") {
    if(single) return root.getElementsByClassName(q.substr(1))[0];
    return root.getElementsByClassName(q.substr(1));
  }
  if(single) return root.getElementsByTagName(q)[0];
  return root.getElementsByTagName(q);
}

function $c(type, props, evls) {
  var node = document.createElement(type);
  if(props && typeof props == "object") {
    for(prop in props) {
      if(typeof node[prop] == "undefined") node.setAttribute(prop, props[prop]);
      else node[prop] = props[prop];
  } }
  if(evls instanceof Array) {
    for(var i = 0; i < evls.length; i++) {
      var evl = evls[i];
      if(typeof evl.type == "string" && typeof evl.fn == "function")
        node.addEventListener(evl.type, evl.fn, false);
  } }
  return node;
}

String.prototype.trim = function() {
  return this.replace(/^\s+|\s+$/g, "");
}

function getActiveText() { 
  var getText = "", ki = $("#keywordIn");
  getText = getSelection().toString();
  if(getText != "") {
    if(ki.value == "") ki.value = getText.trim();
    else ki.value = ki.value + "<>" + getText.trim();
  }
  return;
}

function getListText() {
  if(!$("#listBox")) {
    if((indexPage || catPage) && $("#cbAuthor").checked && !$("#cbTopic").checked && getValue("authorKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"AUTHOR" + "<br>\u2003" + getValue("authorKeywords").replace(/<>/g, "<br>\u2003")});
    if((indexPage || catPage) && !$("#cbAuthor").checked && $("#cbTopic").checked && getValue("topicKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"TOPIC" + "<br>\u2003" + getValue("topicKeywords").replace(/<>/g, "<br>\u2003")});
    if((indexPage || catPage) && $("#cbAuthor").checked && $("#cbTopic").checked && getValue("authorKeywords") != "" && getValue("topicKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"AUTHOR" + "<br>\u2003" + getValue("authorKeywords").replace(/<>/g, "<br>\u2003") + "<br>" + "TOPIC" + "<br>\u2003" + getValue("topicKeywords").replace(/<>/g, "<br>\u2003")});
    if(discPage && $("#cbProfile").checked && !$("#cbThread").checked && getValue("profileKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"PROFILE" + "<br>\u2003" + getValue("profileKeywords").replace(/<>/g, "<br>\u2003")});
    if(discPage && !$("#cbProfile").checked && $("#cbThread").checked && getValue("threadKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"THREAD" + "<br>\u2003" + getValue("threadKeywords").replace(/<>/g, "<br>\u2003")});
    if(discPage && $("#cbProfile").checked && $("#cbThread").checked && getValue("profileKeywords") != "" && getValue("threadKeywords") != "")
      var listdiv = $c("div", {id:"listBox", innerHTML:"PROFILE" + "<br>\u2003" + getValue("profileKeywords").replace(/<>/g, "<br>\u2003") + "<br>" + "THREAD" + "<br>\u2003" + getValue("threadKeywords").replace(/<>/g, "<br>\u2003")});
  }
  var head = $c("td", {id:"listHeader", innerHTML:fe7 + "<br>"});
  listdiv.insertBefore(head, listdiv.firstChild);
  document.body.appendChild(listdiv);
  $("#listBox").addEventListener("mouseout", function(){document.body.removeChild(listdiv)}, false);
  $("#listBox").addEventListener("mouseup", getText, false);
}

function getText() { 
  var gText = "", ki = $("#keywordIn");
  gText = getSelection().toString();
  if(gText != "") ki.value = ki.value + gText;
  return;
}

function getInsertText() { 
  var gB = getValue("insertText") != false ? false : true, iB = $("#insBtn");
  setValue("insertText", gB);
  if(gB) {
    $("#Content").addEventListener("mouseup", getActiveText, false);
    iB.setAttribute("class", "insertOn");
    iB.title = fe18;
    iB.textContent = fe23;
  } else {
    $("#Content").removeEventListener("mouseup", getActiveText, false);
    iB.setAttribute("class", "insertOff");
    iB.title = fe19;
    iB.textContent = fe22;
} }

function getCase() {
  getValue("caseSensitive") != false ? setValue("caseSensitive", false) : setValue("caseSensitive", true); 
  if(getValue("caseSensitive")) {
    $("#caseBtn").textContent = fe12;
    $("#caseBtn").title = fe4;
    $("#keywordIn").placeholder = fe4;
  } else {
    $("#caseBtn").textContent = fe13;
    $("#caseBtn").title = fe14;
    $("#keywordIn").placeholder = fe14;
} }

function getKey(e) {
  var ki = $("#keywordIn");
  if(e.button == 1 && (indexPage || catPage) && $("#cbAuthor").checked) ki.value = gvAuthor;
  if(e.button == 1 && (indexPage || catPage) && $("#cbTopic").checked) ki.value = gvTopic;
  if(e.button == 1 && discPage && $("#cbProfile").checked) ki.value = gvProfile;
  if(e.button == 1 && discPage && $("#cbThread").checked) ki.value = gvThread;
} 

function genKey() {
  var ki = $("#keywordIn");
  if(ki.value == "") return;
  if((indexPage || catPage)  && $("#cbAuthor").checked) {
    if(gvAuthor == "") setValue("authorKeywords", ki.value);
    else setValue("authorKeywords", gvAuthor + "<>" + ki.value);
  }
  if((indexPage || catPage) && $("#cbTopic").checked) {
    if(gvTopic == "") setValue("topicKeywords", ki.value);
    else setValue("topicKeywords", gvTopic + "<>" + ki.value);
  }
  if(discPage && $("#cbProfile").checked) {
    if(gvProfile == "") setValue("profileKeywords", ki.value);
    else setValue("profileKeywords", gvProfile + "<>" + ki.value);
  }
  if(discPage && $("#cbThread").checked) {
    if(gvThread == "") setValue("threadKeywords", ki.value);
    else setValue("threadKeywords", gvThread + "<>" + ki.value);
  }
  ki.value = "";
  document.location.reload();
}

function remKey() {
  if((indexPage || catPage) && $("#cbAuthor").checked) { 
    var gv = getValue("authorKeywords"), gvs = gv.split("<>"), key = "authorKeywords"; 
  }
  if((indexPage || catPage) && $("#cbTopic").checked) { 
    var gv = getValue("topicKeywords"), gvs = gv.split("<>"), key = "topicKeywords"; 
  }
  if(discPage && $("#cbProfile").checked) { 
    var gv = getValue("profileKeywords"), gvs = gv.split("<>"), key = "profileKeywords"; 
  }
  if(discPage && $("#cbThread").checked) { 
    var gv = getValue("threadKeywords"), gvs = gv.split("<>"), key = "threadKeywords"; 
  }
  var names = [], undo = [];
  var ki = $("#keywordIn"), kwu = ki.value.split("<>");
  if(ki.value == "") return;
  if (confirm(fe7 + "\u2003" + ki.value.replace(/<>/g, "\n\u2003")) == false) return;
  if(gv == "") return;
  for(k = 0; k < gvs.length; k++) names.push(gvs[k]);
  for(i = 0; i < kwu.length; i++) undo.push(kwu[i]);
  var Array1 = names, Array2 = undo;
  for (var i = 0; i < Array2.length; i++) {
    var arrlen = Array1.length;
    for (var j = 0; j < arrlen; j++)
    if (Array2[i] == Array1[j]) Array1 = Array1.slice(0, j).concat(Array1.slice(j+1, arrlen));
  }
  var newStr = Array1.toString();
  newStr = newStr.replace(/,/g, "<>");
  if(newStr.indexOf("<>") == 0) newStr = newStr.substring(2, newStr.length);
  setValue(key, newStr);
  ki.value = "";
  document.location.reload();
}

function setFilter() {
  var fc = $("#filterCnt").textContent;
  if(fc == 0) {
    $("#filterBtn").title = "";
    return;
  } 
  $("#filterBtn").title = fe9;
  if(indexPage || catPage) {
    var enable = getValue("showFilteredIndex");
    setValue("showFilteredIndex", !enable);
    if(getValue("showFilteredIndex") == true) {
      $("#filterBtn").textContent = fe11; // + "\u2007" + fc;
      setUnfiltered();
    } else {
      $("#filterBtn").textContent = fe10; // + "\u2007" + fc;
      setFiltered();
  } } 
  if(discPage) {
    var enable = getValue("showFilteredDisc");
    setValue("showFilteredDisc", !enable);
    if(getValue("showFilteredDisc") == true) {
      $("#filterBtn").textContent = fe11; // + "\u2007" + fc;
      setUnfiltered();
    } else {
      $("#filterBtn").textContent = fe10; // + "\u2007" + fc;
      setFiltered();
} } }

function setUnfiltered() {
  if((indexPage || catPage) && $("#cbAuthor").checked) {
    for(var i = 0; i < authorContent.length; i++) {
      if(authorContent[i].getAttribute("filtered")) {
        authorContent[i].parentNode.parentNode.parentNode.style.display = "block";
  } } }
  if((indexPage || catPage) && $("#cbTopic").checked) {
    for(var i = 0; i < topicContent.length; i++) {
      if(topicContent[i].getAttribute("filtered")) {
        topicContent[i].parentNode.parentNode.style.display = "block";
  } } }
  if(discPage && $("#cbProfile").checked) {
    for(var i = 0; i < profileContent.length; i++) {
      if(profileContent[i].getAttribute("filtered")) {
        profileContent[i].parentNode.parentNode.parentNode.parentNode.style.display = "block";
  } } }
  if(discPage && $("#cbThread").checked) {
    for(var i = 0; i < threadContent.length; i++) {
      if(threadContent[i].getAttribute("filtered")) {
        threadContent[i].style.display = "block";
} } } }

function setFiltered() {
  if((indexPage || catPage) && $("#cbAuthor").checked) {
    for(var i = 0; i < authorContent.length; i++) {
      if(authorContent[i].hasAttribute("filtered")) {
        authorContent[i].parentNode.parentNode.parentNode.style.display = "none";
  } } }
  if((indexPage || catPage) && $("#cbTopic").checked) {
    for(var i = 0; i < topicContent.length; i++) {
      if(topicContent[i].hasAttribute("filtered")) {
        topicContent[i].parentNode.parentNode.style.display = "none";
  } } }
  if(discPage && $("#cbProfile").checked) {
    for(var i = 0; i < profileContent.length; i++) {
      if(profileContent[i].hasAttribute("filtered")) {
        profileContent[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
  } } }
  if(discPage && $("#cbThread").checked) {
    for(var i = 0; i < threadContent.length; i++) {
      if(threadContent[i].hasAttribute("filtered")) {
        threadContent[i].style.display = "none";
} } } }

function checkbox(e) {
  var www = e.target.id;
  var xxx = getValue(www) != false ? false : true;
  setValue(www, xxx);
  $("#filter1").style.pointerEvents = "auto";
  $("#filter1").style.opacity = "1";
  if((indexPage || catPage) && getValue("cbAuthor") && getValue("cbTopic")) {
    $("#filter1").style.pointerEvents = "none";
    $("#filter1").style.opacity = ".3";
  }
  if(discPage && getValue("cbProfile") && getValue("cbThread")) {
    $("#filter1").style.pointerEvents = "none";
    $("#filter1").style.opacity = ".3";
  }
  document.location.reload();
}

var url = window.location.href.toLowerCase();
var onCatPage = url.match(/^https?:\/\/forum\.userstyles\.org\/categories\/style-reviews/);
var onIndexPage = url.match(/^https?:\/\/forum\.userstyles\.org\/discussions/);
var onDiscPage = url.match(/^https?:\/\/forum\.userstyles\.org\/discussion\/\d+\/.*$/);

if(url.length < 30 || onIndexPage) var indexPage = true;
else indexPage = false;

if(url.length > 30 && onDiscPage) var discPage = true;
else discPage = false;

if(url.length > 30 && onCatPage) var catPage = true;
else catPage = false;


if(!getValue("caseSensitive")) setValue("caseSensitive", false);
var caseSensitive = getValue("caseSensitive");

if(!getValue("cbAuthor")) setValue("cbAuthor", false);
if(!getValue("cbTopic")) setValue("cbTopic", false);
if(!getValue("cbProfile")) setValue("cbProfile", false);
if(!getValue("cbThread")) setValue("cbThread", false);

if(!getValue("authorKeywords")) setValue("authorKeywords", "");
if(getValue("authorKeywords") == "undefined") setValue("authorKeywords", "");
if(getValue("authorKeywords").indexOf("<>") == -1) 
  setValue("authorKeywords", getValue("authorKeywords").replace(/,(?!\s)/g, "<>"));

if(!getValue("topicKeywords")) setValue("topicKeywords", "");
if(getValue("topicKeywords") == "undefined") setValue("topicKeywords", "");
if(getValue("topicKeywords").indexOf("<>") == -1) 
  setValue("topicKeywords", getValue("topicKeywords").replace(/,(?!\s)/g, "<>"));

if(!getValue("profileKeywords")) setValue("profileKeywords", "");
if(getValue("profileKeywords") == "undefined") setValue("profileKeywords", "");
if(getValue("profileKeywords").indexOf("<>") == -1) 
  setValue("profileKeywords", getValue("profileKeywords").replace(/,(?!\s)/g, "<>"));

if(!getValue("threadKeywords")) setValue("threadKeywords", "");
if(getValue("threadKeywords") == "undefined") setValue("threadKeywords", "");
if(getValue("threadKeywords").indexOf("<>") == -1) 
  setValue("threadKeywords", getValue("threadKeywords").replace(/,(?!\s)/g, "<>"));

if(!getValue("insertText")) setValue("insertText", false);
var insertText = getValue("insertText");

if(!getValue("showFilteredIndex")) setValue("showFilteredIndex", false);
var showFilteredIndex = getValue("showFilteredIndex");

if(!getValue("showFilteredDisc")) setValue("showFilteredDisc", false);
var showFilteredDisc = getValue("showFilteredDisc");

var group = $c("div", {id:"filterGrp"});
var filterA = $c("div", {id:"filterA", className:"forumFlt"});
var filterB = $c("div", {id:"filterB", className:"forumFlt"});
var filter1 = $c("div", {id:"filter1", className:"forumFlt"});
var filter2 = $c("div", {id:"filter2", className:"forumFlt"});
var filterButton = $c("button", {id:"filterBtn", textContent:fe10}, [{type:"click", fn:function() {setFilter()}}]);
var filterCount = $c("button", {id:"filterCnt", textContent:0});
var okButton = $c("button", {id:"okBtn", className:"forumBtn", title:fe6, textContent:fe20}, [{type:"click", fn:function() {genKey()}}]);
var inputBox = $c("input", {id:"keywordIn", placeholder:fe4, title:fe3}, [{type:"click", fn:function(e) {getKey(e)}}]);
var removeButton = $c("button", {id:"remBtn", className:"forumBtn", title:fe2, textContent:fe21}, [{type:"click", fn:function() {remKey()}}]);
var optionButton = $c("button", {id:"caseBtn"}, [{type:"click", fn:function(){getCase()}}]);
var insertButton = $c("button", {id:"insBtn"}, [{type:"click", fn:function(){getInsertText()}}]);

if(indexPage || catPage) {
  var checkbox1 = $c("input", {id:"cbAuthor", type:"checkbox", className:"cbCheckbox", checked:getValue("cbAuthor")}, [{type:"click", fn:function(e){checkbox(e)()}}]);
  var label1 = $c("label", {id:"labelAuthor", className:"cbLabel", textContent:"Author"});
  var checkbox2 = $c("input", {id:"cbTopic", type:"checkbox", className:"cbCheckbox", checked:getValue("cbTopic")}, [{type:"click", fn:function(e){checkbox(e)()}}]);
  var label2 = $c("label", {id:"labelTopic", className:"cbLabel", textContent:"Topic"});
  filterA.appendChild(checkbox1);
  filterA.appendChild(label1);
  filterA.appendChild(checkbox2);
  filterA.appendChild(label2);
  group.appendChild(filterA);
}

if(discPage) {
  var checkbox4 = $c("input", {id:"cbProfile", type:"checkbox", className:"cbCheckbox", checked:getValue("cbProfile")}, [{type:"click", fn:function(e){checkbox(e)()}}]);
  var label4 = $c("label", {id:"labelProfile", className:"cbLabel", textContent:"Profile Link"});
  var checkbox5 = $c("input", {id:"cbThread", type:"checkbox", className:"cbCheckbox", checked:getValue("cbThread")}, [{type:"click", fn:function(e){checkbox(e)()}}]);
  var label5 = $c("label", {id:"labelThread", className:"cbLabel", textContent:"Thread"});
  filterB.appendChild(checkbox4);
  filterB.appendChild(label4);
  filterB.appendChild(checkbox5);
  filterB.appendChild(label5);
  group.appendChild(filterB);
}

filter1.appendChild(okButton);
filter1.appendChild(inputBox);
filter1.appendChild(removeButton);
filter2.appendChild(filterButton);
filter2.appendChild(filterCount);
filter2.appendChild(insertButton);
filter2.appendChild(optionButton);

group.appendChild(filter1);
group.appendChild(filter2);

try {
  var pane = $("#Panel");
  pane.insertBefore(group, pane.firstElementChild);
} catch(ex) {}

$("#Content").addEventListener("mouseup", getActiveText, false);
$("#keywordIn").addEventListener("dblclick", function() {$("#keywordIn").value = ""}, false);
$("#filterBtn").addEventListener("dblclick", function() {getListText();}, false);

if(indexPage || catPage) {
  if(getValue("authorKeywords") == "" && getValue("topicKeywords") == "") {
    if(showFilteredIndex) $("#filterBtn").textContent = fe10; // + "\u2007" + 0;
    else $("#filterBtn").textContent = fe11; // + "\u2007" + 0;
} }

if(discPage) {
  if(getValue("profileKeywords") == "" && getValue("threadKeywords") == "") {
    if(showFilteredDisc) $("#filterBtn").textContent = fe10; // + "\u2007" + 0;
    else $("#filterBtn").textContent = fe11; // + "\u2007" + 0;
} }

var names = [], undo = [], itemContent = $(".ItemContent"), listCnt = 0;
var ki = $("#keywordIn");
var authorNames = [], topicNames = [], profileNames = [], threadNames = [], undo = [];
var authorContent = $(".ShowDiscussionAuthor");
var topicContent = $(".Title");
var profileContent = $(".ProfileLink");
var threadContent = $(".Item");
var gvAuthor = getValue("authorKeywords"), aut = gvAuthor.split("<>");
var gvTopic = getValue("topicKeywords"), top = gvTopic.split("<>");
var gvProfile = getValue("profileKeywords"), pro = gvProfile.split("<>");
var gvThread = getValue("threadKeywords"), thr = gvThread.split("<>");

if(caseSensitive) ki.placeholder = fe4;
else ki.placeholder = fe14;

if((indexPage || catPage) && $("#cbAuthor").checked) {
  if(getValue("authorKeywords") != "") {
    for(k = 0; k < aut.length; k++) authorNames.push(aut[k]);
    for(var x in authorNames)
    for(var i = 0; i < authorContent.length; i++) {
      var mod = authorNames[x].replace(/\.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "zqz");
      if(caseSensitive) var word = new RegExp(mod);
      else var word = new RegExp(mod, "i");
      if(authorContent[i].textContent.match(word)) {
        authorContent[i].setAttribute("filtered", true);
        authorContent[i].parentNode.parentNode.parentNode.setAttribute("filtered", true);
        authorContent[i].parentNode.parentNode.parentNode.style.display = "none";
        listCnt++
} } } }

if((indexPage || catPage) && $("#cbTopic").checked) {
  if(getValue("topicKeywords") != "") {
    for(k = 0; k < top.length; k++) topicNames.push(top[k]);
    for(var x in topicNames)
    for(var i = 0; i < topicContent.length; i++) {
      var mod = topicNames[x].replace(/\.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "zqz");
      if(caseSensitive) var word = new RegExp(mod);
      else var word = new RegExp(mod, "i");
      if(topicContent[i].textContent.match(word)) {
        topicContent[i].setAttribute("filtered", true);
        topicContent[i].parentNode.parentNode.setAttribute("filtered", true);
        topicContent[i].parentNode.parentNode.style.display = "none";
        listCnt++
} } } }

if(discPage && $("#cbProfile").checked) {
  if(getValue("profileKeywords") != "") {
    for(k = 0; k < pro.length; k++) profileNames.push(pro[k]);
    for(var x in profileNames)
    for(var i = 0; i < profileContent.length; i++) {
      var mod = profileNames[x].replace(/\.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "zqz");
      if(caseSensitive) var word = new RegExp(mod);
      else var word = new RegExp(mod, "i");
      if(profileContent[i].title.match(word)) {
        profileContent[i].setAttribute("filtered", true);
        profileContent[i].parentNode.parentNode.parentNode.parentNode.setAttribute("filtered", true);
        profileContent[i].parentNode.parentNode.parentNode.parentNode.style.display = "none";
        listCnt++
} } } }

if(discPage && $("#cbThread").checked) {
  if(getValue("threadKeywords") != "") {
    for(k = 0; k < thr.length; k++) threadNames.push(thr[k]);
    for(var x in threadNames)
    for(var i = 0; i < threadContent.length; i++) {
      var mod = threadNames[x].replace(/\.,\?""!@#\$%\^&\*\(\)-_=\+;:<>\/\\\|\}\{\[\]`~]*/g, "zqz");
      if(caseSensitive) var word = new RegExp(mod);
      else var word = new RegExp(mod, "i");
      if(threadContent[i].textContent.match(word)) {
        threadContent[i].setAttribute("filtered", true);
        threadContent[i].style.display = "none";
        listCnt++
} } } }

$("#filterCnt").textContent = listCnt;
if(listCnt == 0) $("#filterBtn").title = "";
else $("#filterBtn").title = fe9;

if(indexPage || catPage) {
  if(showFilteredIndex) {
    $("#filterBtn").textContent = fe11; // + "\u2007" + listCnt;
    setUnfiltered();
  } else {
    $("#filterBtn").textContent = fe10; // + "\u2007" + listCnt;
    setFiltered();
} }

if(discPage) {
  if(showFilteredDisc) {
    $("#filterBtn").textContent = fe11; // + "\u2007" + listCnt;
    setUnfiltered();
  } else {
    $("#filterBtn").textContent = fe10; // + "\u2007" + listCnt;
    setFiltered();
} }

if(insertText) {
  $("#Content").addEventListener("mouseup", getActiveText, false);
  $("#insBtn").setAttribute("class", "insertOn");
  $("#insBtn").title = fe18;
  $("#insBtn").textContent = fe23;
} else {
  $("#Content").removeEventListener("mouseup", getActiveText, false);
  $("#insBtn").setAttribute("class", "insertOff");
  $("#insBtn").title = fe19;
  $("#insBtn").textContent = fe22;
}

$("#filter1").style.pointerEvents = "auto";
$("#filter1").style.opacity = "1";

if(getValue("caseSensitive")) {
  $("#caseBtn").textContent = fe12;
  $("#caseBtn").title = fe4;
} else {
  $("#caseBtn").textContent = fe13;
  $("#caseBtn").title = fe14;
}

if((indexPage || catPage)  && getValue("cbAuthor") && getValue("cbTopic")) {
  $("#filter1").style.pointerEvents = "none";
  $("#filter1").style.opacity = ".3";
}

if(discPage && getValue("cbProfile") && getValue("cbThread")) {
  $("#filter1").style.pointerEvents = "none";
  $("#filter1").style.opacity = ".3";
}

var fe97 = "Home"; // Tab label
var fe98 = "Go to userstyles.org"; // Tooltip
var fe99 = "http://userstyles.org"; // Link url
var menu = $("#Menu"), stylesSite = $c("li", {id:"StylesSite"});
stylesSite.appendChild($c("a", {title:fe98, textContent:fe97, href:fe99}));
menu.insertBefore(stylesSite, menu.lastElementChild);

addStyle("\
  button{padding:0!important}\
  #filterGrp{margin-bottom:8px!important;text-align:center!important}\
  #filterGrp>div{margin-bottom:4px!important}\
  #filterA>input,#filterB>input{position:relative!important;top:2px!important}\
  #filter2 button{margin:0 2px!important}\
  #labelAuthor{margin-right:10px!important}\
  #keywordIn{width:180px!important}\
  #filterBtn{width:68px!important}\
  #insBtn{width:58px!important}\
  #caseBtn{width:60px!important}\
");