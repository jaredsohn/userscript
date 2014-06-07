// ==UserScript==
// @name           Google Search Language Switcher
// @namespace      null
// @description    Add a select-box for the hl parameter on google result pages.
// @include        http://*.google.tld/*
// ==/UserScript==

// should work with web, images, videos, news, books, scolar, blogs and directory search.

// early sanity check
// http://www.google.com/news/search?
var wl = window.location;
if (wl.pathname.lastIndexOf("/", 1) == wl.pathname.length-1 ||
    wl.search.length < 2) return;

// you can set the default languages here; will be used if
// Google Language Code Changer hasn't been configured through
// the GM menu before.
var defaultLanguages = "en de fr pl";

var $i = function(id){
  return window.document.getElementById(id);
}
var $c = function(tagName){
  return window.document.createElement(tagName);
}

// shows the settings overlay
var showOpts = function() {
  // create the background
  var bg = $c("div");
  bg.id = "glccBg";
  bg.setAttribute("style", "position: absolute; background-color: rgba(200, 210, 220, 0.93); left: 0px; top: 0px; width: 100%; height: "+(window.document.height+20).toString()+"px; z-index: 200");
  window.document.body.appendChild(bg);

  // create overlay content
  var opts = $c("div");
  opts.id = "glccOpts";
  opts.setAttribute("style", "position: fixed; text-align: center; top: 50px; width: 100%; height: 100%; z-index: 201");
  opts.textContent = "Set your preferred languages";
  window.document.body.appendChild(opts);
  
  var cbDiv = $c("div");
  cbDiv.id = "glccCbDiv";
  cbDiv.textContent = "Loading Language Codes ...";
  opts.appendChild(cbDiv);
  
  opts.appendChild($c("br"));

  var toggleAllBtn = $c("button");
  toggleAllBtn.textContent = "Clear/Select All";
  toggleAllBtn.addEventListener("click", function(){ toggleAllCB(); }, false);
  opts.appendChild(toggleAllBtn);

  opts.appendChild(window.document.createTextNode("\u2003"));

  var okBtn = $c("button");
  okBtn.textContent = "Ok";
  okBtn.addEventListener("click", hideOptions, false);
  opts.appendChild(okBtn);
  
  opts.appendChild(window.document.createTextNode("\u2003"));

  var customiseBtn = $c("Button");
  customiseBtn.textContent = "Customise";
  customiseBtn.addEventListener("click", customiseLangs, false);
  opts.appendChild(customiseBtn);
  
  GM_xmlhttpRequest({
    method:"GET",
    url:"http://sites.google.com/site/tomihasa/google-language-codes",
    onload: glccSetupCbs,
    onerror: glccXHRError
  });
}



var customiseLangs = function() {
  hideOptions();
  var bg = $c("div");
  bg.id = "glccBg";
  bg.setAttribute("style", "position: absolute; background-color: rgba(200, 220, 210, 0.93); left: 0px; top: 0px; width: 100%; height: "+(window.document.height+20).toString()+"px; z-index: 200;");
  window.document.body.appendChild(bg);

  var opts = $c("div");
  opts.id = "glccOpts";
  opts.setAttribute("style", "position: fixed; text-align: center; top: 50px; width: 100%; height: 100%; z-index: 201;");
  opts.textContent = "Set the language aliases for the drop-down list/button";
  window.document.body.appendChild(opts);

  myLangs.forEach(function(v){
    var lnDiv = $c("div");
    lnDiv.textContent = window.glccLnMap[v]+"("+v+"): ";
    var lnTb = $c("input");
    lnTb.type = "text";
    lnTb.name = v;
    lnTb.value = GM_getValue(v, v);
    lnTb.addEventListener("change", function(e){
      var tb = e.target;
      GM_setValue(tb.name, tb.value);
    }, false);
    lnDiv.appendChild(lnTb);
    opts.appendChild(lnDiv);
  });

  var okBtn = $c("button");
  okBtn.textContent = "Ok";
  okBtn.addEventListener("click", hideOptions, false);
  opts.appendChild(okBtn);
}

var clear = true;
var toggleAllCB = function() {
  var cbList = window.document.getElementsByClassName("glccOptsCB");
  for (var i = 0; i < cbList.length; i++) cbList[i].checked=clear;
  clear = !clear;
}

function glccXHRError(response){
  $i("glccCbDiv").textContent = "Loading language codes failed: " + response.statusText;
}  

function glccSetupCbs(response){
  var cbDiv = $i("glccCbDiv");
  var res = /<a name="interfacelanguage">.{10,50}<pre>([^]+?)<\/pre>/.exec(response.responseText);
  if (res == null) {
    cbDiv.textContent = "Parsing language codes file failed; this may be due to a network problem; or this script needs to be updated; server response: " + response.statusText;
    return;
  }

  res = res[1];

  var llRegexp = /webhp\?hl=([^"]+).+?<\/a>\s*(.+)/g;
  var lRes;
  var cbCol;
  var counter = 0;
  cbDiv.textContent = "";
  window.glccLnMap = {};
  while ((lRes = llRegexp.exec(res))!=null){
    if (counter%24 == 0){
      cbCol = $c("div");
      cbCol.setAttribute("style", "display: inline-block; text-align: left; margin: 8px;");
      cbDiv.appendChild(cbCol);
    }
    counter++;
    var lCode = lRes[1];
    var lName = lRes[2];
    window.glccLnMap[lCode]=lName;
    cbCol.appendChild($c("br"));
    var cb = $c("input");
    cb.className = "glccOptsCB";
    cb.type="checkbox";
    cb.value = lCode;
    if (myLangs.indexOf(lCode) != -1) cb.checked=true;
    cbCol.appendChild(cb);
    cbCol.appendChild(window.document.createTextNode(lName));
  }
  if (counter == 0) cbDiv.textContent = "Zero languages parsed; probably this script needs an update. Please inform the developer.";
}

function hideOptions() {
  var cbList = window.document.getElementsByClassName("glccOptsCB");
  for (var i = 0; i < cbList.length; i++) {
    var cbval = cbList[i].value;
    while (myLangs.indexOf(cbval) != -1)
      myLangs.splice(myLangs.indexOf(cbval), 1);
    if (cbList[i].checked === true) myLangs.push(cbval);
  }
  GM_setValue("selectedLangs", myLangs.join(" "));
  window.document.body.removeChild($i("glccOpts"));
  window.document.body.removeChild($i("glccBg"));
  var input = $i("glccInput");
  if (input != null) input.parentNode.removeChild(input);
  build();
}

var tsf = window.document.querySelector("form#tsf,form[name='gs'],form.search-form");
var currentLang;
var build = function(){
  if (tsf == null) return; // this shouldnt happen
  var hlEl = tsf.elements.namedItem("hl");
  if (hlEl === null || hlEl.value == "") { // form does not have an (hidden) input with attrib name=="hl" -> extract from url 
	try {
	  currentLang = (/(?:^\?|&)hl=([\w-]+)(?:$|&)/.exec(window.location.search))[1];
	} catch (e) {
  	  currentLang = myLangs[0];
	}
  } else {
    currentLang = hlEl.value;
  }
  if (hlEl !== null) hlEl.parentNode.removeChild(hlEl);

  var el;
  // decide whether a drop-down-list or a (toggle-)button shall be created
  if (myLangs.length > 2) {
    el = $c("select");
    el.name = "hl";
    myLangs.forEach(function(lC){
      var option = $c("option");
      option.value = lC;
      option.textContent = GM_getValue(lC, lC);
      if (lC == currentLang) option.selected = true;
      el.appendChild(option);
    });
    el.addEventListener("change", function (e) { tsf.submit(); }, false);
  } else {
    el = $c("button");
    var ln = myLangs.filter(function(a) {return a!=currentLang;})[0];
    el.textContent = GM_getValue(ln, ln);
    el.value = ln;
    var hlel = $c("input");
    hlel.type = "hidden";
    hlel.name = "hl";
    hlel.value = currentLang;
    el.appendChild(hlel);
    el.addEventListener("click", function(){ hlel.value = ln; tsf.submit();}, false);
  }
  el.className = "lsb";
  el.id = "glccInput";
  
  if (tsf.className == "search-form") { // news
    el.className = "lsb1";
    var target = tsf.querySelector("input.searchField");
	target.parentNode.insertBefore(el, target.nextSibling.nextSibling);
  } else if (!tsf.hasAttribute("id") && tsf.name == "gs") { // groups
    var target = tsf.querySelector("input[type='submit']");
	target.parentNode.appendChild(el);
  } else {
    var target = document.evaluate(".//table//div[@class='lsd']/ancestor::td", tsf, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);  
    target = target.singleNodeValue;
	target.parentNode.insertBefore(el, target);
  }
}

GM_registerMenuCommand("Google Language Code Changer Settings", showOpts);
var myLangs = GM_getValue("selectedLangs", defaultLanguages).split(" ");
build();