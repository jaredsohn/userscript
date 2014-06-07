/* 
LICENSE
=======
This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA

CHANGELOG

=========
Version 1.1
  - initial release
  
Version 1.9
  - added option to disable pricing history
*/
// ==UserScript==
// @name           DaftMonkey
// @namespace      http://www.chofter.com
// @description    Greatly Improves Daft.ie, the Irish Property website.  It loads many more results per page, dynamically fetches pictures and property details without ever leaving the search results page.
// @include        http://www.daft.ie/searchrental.daft*
// @include        http://www.daft.ie/searchsharing.daft*
// @include        http://www.daft.ie/searchshortterm.daft*
// @include        http://www.daft.ie/searchnew_development.daft*
// @include        http://www.daft.ie/searchsale.daft*
// @include        http://www.daft.ie/searchcommercial.daft*
// @include        http://www.daft.ie/searchinternational.daft*
// @include        http://www.daft.ie/savedads.daft*
// @include        http://daft.ie/searchrental.daft*
// @include        http://daft.ie/searchsharing.daft*
// @include        http://daft.ie/searchshortterm.daft*
// @include        http://daft.ie/searchnew_development.daft*
// @include        http://daft.ie/searchsale.daft*
// @include        http://daft.ie/searchcommercial.daft*
// @include        http://daft.ie/searchinternational.daft*
// @include        http://daft.ie/savedads.daft*
// @include        http://www.daft.com/searchrental.daft*
// @include        http://www.daft.com/searchsharing.daft*
// @include        http://www.daft.com/searchshortterm.daft*
// @include        http://www.daft.com/searchnew_development.daft*
// @include        http://www.daft.com/searchsale.daft*
// @include        http://www.daft.com/searchcommercial.daft*
// @include        http://www.daft.com/searchinternational.daft*
// @include        http://www.daft.com/savedads.daft*
// @include        http://daft.com/searchrental.daft*
// @include        http://daft.com/searchsharing.daft*
// @include        http://daft.com/searchshortterm.daft*
// @include        http://daft.com/searchnew_development.daft*
// @include        http://daft.com/searchsale.daft*
// @include        http://daft.com/searchcommercial.daft*
// @include        http://daft.com/searchinternational.daft*
// @include        http://daft.com/savedads.daft*
// ==/UserScript==
/*
  This script greatly enhances the Daft.ie search result pages.  See http://www.chofter.com/apps?n=daftmonkey for more info.
*/

function log(){
  if (!unsafeWindow.console) {
 	return;
  }
  if (arguments.length == 5) {
      unsafeWindow.console.log(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
  } else if (arguments.length == 4) {
      unsafeWindow.console.log(arguments[0], arguments[1], arguments[2], arguments[3]);
  } else if (arguments.length == 3) {
      unsafeWindow.console.log(arguments[0], arguments[1], arguments[2]);
  } else if (arguments.length == 2) {
      unsafeWindow.console.log(arguments[0], arguments[1]);
  } else if (arguments.length == 1) {
    unsafeWindow.console.log(arguments[0]);
  } else {
    unsafeWindow.console.log(arguments[0], arguments[1]);
  }
}

var currentVersion = 1.9;

var dojoPath = "http://o.aolcdn.com/dojo/1.2.3";
var queue = [];
var semaphore = false;

var wait;
var dojo, dojox;

var isSavedPage = false;

var loading = false;
var pages = [];
var tempPageContainer;

var tableContainer;

var googleMapsScriptAdded = false;

var numCols = 1;

var filters = [];
var filterCounts = {
  hidden: 0,
  text: 0,
  agent: 0,
  photos: 0
};

var allPhotosLoaded = false;
var photoLoadComplete = false;
var contentLoaded = false;
var onlyWithPhotos = false;
var showHistory = true;
var hideHiddenProperties = true;
var hideAgentProperties = false;

var dm ={};

var minDescriptWidth = 700;

var photoPages = {};
var photoPageLinks = [];

var resultContainers = {};


var LightboxNano;

var cmds = document.createElement("div");
var daftMonkeyLink = document.createElement("a");
cmds.appendChild(daftMonkeyLink);
daftMonkeyLink.innerHTML = "(DaftMonkey)";
daftMonkeyLink.setAttribute("href", "http://www.chofter.com/apps?n=daftmonkey");
daftMonkeyLink.setAttribute("target", "_new");

var head = document.body.previousSibling;

while (head && head.tagName != "HEAD") {
  head = head.previousSibling;
}

function addToQueue(fn) {
  queue.push(fn);
  
  processNextCommand();
}

function fixCallback(name, fp){
  return name != "keypress" ? fp : function(e){ return fp.call(this, del._fixEvent(e, this)); };
}

function normalizeEventName(name){
  return name.slice(0,2) =="on" ? name.slice(2) : name;
}

function doConnect(node, event, fn) {
  event = normalizeEventName(event);
  node.addEventListener(event, fixCallback(event, fn), false);
}

function processNextCommand() {
  if (semaphore || queue.length == 0) {
    return;
  }
  semaphore = true;
  
  queue.splice(0, 1)[0]();
}

function trim(str) {
  while (str.length && str.charAt(0) == " " || str.charAt(0) == "\n") {
    str = str.substr(1);
  }
  while (str.length  && str.charAt(str.length - 1) == " " || str.charAt(str.length - 1) == "\n") {
    str = str.substr(0, str.length - 1);
  }
  return (str == ' ') ? '' : str;
}

function appendScript(href, domNode) {
  var script = document.createElement("script");
  
  if (href) {  
    script.setAttribute("src", href);
  }
  script.setAttribute("type", "text/javascript");
  (domNode || head).appendChild(script);
}

function pad(str, len) {
  while (str.length < len) {
    str = " " + str;
  }
  return str;
}

function isValidPage(){

  var q = unsafeWindow.location.search;
  
  var attr = "[photo_search]";
  var idx = q.lastIndexOf(attr)
  
  if (idx > -1) {
    if (q && q.indexOf("[photo_search]=1", idx) > -1) {
      
      return false;
    }
  }
  return true;
}


if (isValidPage()) {
  unsafeWindow.djConfig = {afterOnLoad: true};
  
  appendScript(dojoPath + "/dojo/dojo.js");
  appendScript(dojoPath + "/dojo/fx/Toggler.js");
  appendScript(dojoPath + "/dojo/fx.js");
  
  
  var waiter = function(){
    if (unsafeWindow.dojo && unsafeWindow.dojo.fx) {
      clearInterval(waitInterval);
      start();
    }
  }
  
  var waitInterval = setInterval(waiter, 100);
  
}

function createCmd(text, callback, parentNode, type) {
  var wrapper = document.createElement(type || "span");
  var label = document.createElement("span");
  var input = document.createElement('input');
  
  var labelStyle = {"float": "left", "paddingTop" : "2px", "paddingLeft" : "5px"};
  
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  
  parentNode = parentNode ? parentNode : cmds;
  
  parentNode.appendChild(wrapper);
  
  dojo.style(wrapper, "float", "left");

  label.innerHTML = text;
  dojo.attr(input, "type", "checkbox");
  doConnect(input, "onchange", callback);
  
  dojo.style(label, labelStyle);
  dojo.style(input, "float", "left");

  return {
    wrapper: wrapper,
    label: label,
    input: input
  };
}

function createSearchBox(){ 
  var container = document.createElement("span");
  var label = document.createElement("span");
  var input = document.createElement('input');
  var btn = document.createElement('button');
  
  
  cmds.appendChild(container);
  container.appendChild(label);
  container.appendChild(input);
  container.appendChild(btn);
  
  label.innerHTML = "Search All Daft";
  dojo.attr(input, "type", "text");
  btn.innerHTML = "GO";
  
  dojo.style(container, {"float": "left"});
  dojo.style(label, {"float": "left", "paddingTop" : "2px","paddingLeft" : "15px", paddingRight: "5px"});
  dojo.style(input, {"height":"19px","float": "left", 
        "marginTop" : "0px", 
        "marginLeft" : "1px",
        fontSize:"8pt",
        paddingTop: "0px"
          });
  dojo.style(btn, {"float": "left","fontSize":"7pt", marginTop:"0px",cursor:"pointer"});
  
  function find(event){
    dojo.stopEvent(event);
    var value = dojo.trim(input.value);
    if (value == null || value.length == 0) {
      return;
    }
        
    window.open("http://www.chofter.com/?q=" + encodeURIComponent("site:www.daft.ie " + value));
    return false;
  }
  
  doConnect(btn, "onclick", find);
  doConnect(input, "onkeyup", function(evt){
    if(evt.keyCode == 13) {
      setTimeout(find,1);
    }
  });
}

function updateFilterCount(){
  var node = dojo.byId("filterCount");
  if (!node) {
    return;
  }
  var total = 0;
  
  for (var x in filterCounts) {
    total += Number(filterCounts[x]);
  }
  
  dojo.byId("filterCount").innerHTML = "("+ total +" filtered)";
}

function createFilterBox(parentNode) {

  var container = document.createElement("div");
  
  var label = document.createElement("span");
  var input = document.createElement('input');
  
  var initText = "separate,with,commas";
    
  parentNode = parentNode ? parentNode : cmds;
    
  container.appendChild(label);
  container.appendChild(input);
  parentNode.appendChild(container);
  
  input.value = initText;
  
  label.innerHTML = "By Title";
  var labelStyle = {"paddingTop" : "2px","paddingLeft" : "2px", paddingRight: "5px"};
  dojo.style(label, labelStyle);
  dojo.style(input, {"height":"19px",
                     "width": "150px",
        
          "marginTop" : "0px", 
          "marginLeft" : "1px",
          fontSize:"8pt",
          paddingTop: "0px",
          color: "#aaa"
          });
  dojo.style(container, {"paddingBottom":"3px", "paddingTop": "5px"});

  var timer;
  function doFilterUpdate(){
    filters = input.value.split(",");
    dojo.forEach(filters, "array[index] = dojo.trim(array[index]).toLowerCase();");
    filters = dojo.filter(filters, function(item){
      return item.length > 0;
    });
    filterCounts.text = 0;
    refreshResultContainers(true);
    updateFilterCount();
    daftCookie("filter", input.value);
  }
  
  doConnect(input, "onkeyup", function(evt){
    if (timer) {
      clearTimeout(timer);
    }
  
    timer = setTimeout(doFilterUpdate,500);
  
  });
  
  doConnect(input, "onfocus", function(evt){
    if (input.value == initText) {
      input.value = "";
      dojo.style(input, "color", "black");
    }
  });
  var prevValue = daftCookie("filter");
  
  if(prevValue) {
    input.value = prevValue;
    dojo.style(input, "color", "black");
    doFilterUpdate();
  }
}

function getPropertyType(href) {

  var idx = href.indexOf("/search");
  var idx2 = href.indexOf(".daft", idx);
  return href.substring(idx + 7, idx2);
}

function getPropertyRootNodes(refineForm, savedForm) {
  
  //tableContainer
  var container = dojo.query("ul.search_results")[0];
  
  var tables;
  
  // Where the property tables are on the page depends on whether it is a
  // standard search page or the Saved Ads page.
  //if (!savedForm) {
    return [container];
    //return dojo.query("td[valign='top'] > table[width='100%']", outerTable)
    //  .filter(function(item){
    //    return !dojo.hasClass(item, "fVSmall");
    //});
  //} 
}

function start(){

  dojo = unsafeWindow.dojo;
  declare();

  var refineForm = dojo.byId("sh_refine_bar");
  var savedForm = dojo.query("form[action='/savedads.daft']", dojo.body())[0];
  
  // Not a supported page.
  if (!refineForm && !savedForm) {
    return;
  }
  
  //tableContainer
  
  var tables = getPropertyRootNodes(refineForm, savedForm);
     
  if (!tables || tables.length == 0) {
    // This is not a valid page. Perhaps there is a log in form on it
    // so do nothing.
    
    return;
  }
  
  // Where the commands are placed depends on whether or not this
  // is a standard search results page, or a Saved Ads page.
  if (refineForm) {
    dojo.style(refineForm, "height", "49px");
    dojo.query("fieldset", refineForm)[0].appendChild(cmds);
    
    dojo.query("select", refineForm).connect("onkeyup", function(evt){
      if (evt.keyCode == 13) {
        dojo.query("input[type='submit']", refineForm)[0].click();
      }
    });
    
    
  } else {
    isSavedPage = true;

    var row = dojo.query("> table", savedForm)[0].rows[0];
    var cell = row.cells[0];
    cell.appendChild(cmds);
    dojo.attr(cell, "background", "");
  }
  dojo.style(cmds, {
    height: "20px",
    color: "black",
    fontWeight: "bold",
    paddingLeft: "10px",
    fontSize: "8pt",
    textAlign: "center",
    marginTop: "30px"
  });
  cmds.setAttribute("id", "daftmonkey-ctrls");
  var links = dojo.query(".pages > a");
  
  dojo.style(daftMonkeyLink, {"float": "left", "paddingTop": "2px"});
  
  // If more than one page exists, 
  if (links.length > 0) {

    // Create the Load All input
    var cmd = createCmd("Load All Results:", function(evt){
      evt.target.disabled = true;
      loadAllResults();
    });
    
    dojo.subscribe("daft-page-load", function(pageNum){
      dojo.style(cmd.input, "display", "none");
      dojo.style(cmd.label, "color", "blue");
      cmd.label.innerHTML = "(Loading Page " + pad(pageNum + ")", 7);
    });
    dojo.subscribe("daft-page-load-complete", function(){
      try {
      cmd.label.innerHTML = "(All Pages Loaded)";
      dojo.style(cmd.label, "color", "red");
      } catch(e){
        log("caught ", e);
      }
    });
  }
  
  
  
  //------------------------------------------
  // Add the css to the page
  addPageCss();

  // Create the Photo Filter command
  createPhotoLoadCommand();
  
  
  var pageLinks = dojo.query(".pages > a")
    .forEach(function(node){
      if (node.innerHTML.indexOf("&lt;") > -1){return;}
      pages.push({text: node.innerHTML, href: dojo.attr(node, "href")});
  });
  
  if (!isSavedPage) {
    createFilterCommands(cmds);
  }
  createSearchBox();  

  tableContainer = dojo.byId("search_results");//tables[0].parentNode;
  
  refreshResultContainers();
  
  checkVersion();
}

function addPageCss(){
  var styleNode = document.createElement("style");
  dojo.attr(styleNode, "type", "text/css");
 
  var cssString = ".daftResult img{border:#666 solid 2px;}a:hover .dojoxEnlarge{display:block !important;} .dojoxEnlarge{background:url(http://chofter.com/apps/DaftMonkey/enlarge.png) no-repeat 0 0;top:-5px;left:-5px;width:16px;height:16px;}.dojoxLoading{background:#333 url(http://chofter.com/apps/DaftMonkey/loading.gif) no-repeat center center;border-radius:5px;-moz-border-radius:5px;border:2px solid #000;height:24px;opacity:0.8;padding:6px;width:24px;}.daftResult-loading {background: url(http://chofter.com/apps/DaftMonkey/loading.gif) no-repeat 430px 0px}"
      + '.filterPopUp {width:200px; -moz-border-radius:5px; border:1px solid #84bde7; background-color: #f7f7f7; padding: 5px; position: absolute} .unselectable {-moz-user-select: none;}'
      + '.filterPopup div {height: 20px;} .filterPopup .popupCloseNode {height: 16px;} .filterPopup .popupCloseNode img {float: right;cursor:pointer;}'
      + 'ul#search_results .hasNotes a.viewNotes {padding-right: 17px; background: url(http://www.chofter.com/apps/DaftMonkey/accept.png) no-repeat top right;}'
      + '.hiddenHistory .historyTable {display: none;}';
      
  
  if(styleNode.styleSheet) {
    styleNode.styleSheet.cssText = cssString;
  }
  else{
    styleNode.appendChild(document.createTextNode(cssString));
  }
  head.appendChild(styleNode);
  
  if(!showHistory){
    dojo.addClass(dojo.body(), "hiddenHistory");
  }
}

function styleFilterCmd(cmd){
  dojo.style(cmd.input, {
      position: "absolute",
      float: "none",
      right: "0px",
      top: "0px"
  });
  dojo.style(cmd.label, {
        float: "none"
  });

  dojo.style(cmd.wrapper, {
      "float": "none",
      position: "relative",
      paddingTop: "4px"
  });
}

function createShowHiddenCommand(parentNode) {
  var cmd = createCmd("Show Hidden Properties", function(evt){
    hideHiddenProperties = !evt.target.checked;
      
    daftCookie("showHidden", hideHiddenProperties ? "false" : "true");
    refreshResultContainers(true);
    updateFilterCount();
  }, parentNode, "div");
  
  styleFilterCmd(cmd);
  var persistedState = daftCookie("showHidden") || "false";
    
  cmd.input.checked = persistedState == "true";
  hideHiddenProperties = !cmd.input.checked;
}

function createHideAgentsCommand(parentNode) {
  var cmd = createCmd("Hide Agents", function(evt) {
    hideAgentProperties = evt.target.checked;
    
    daftCookie("hideAgents", hideAgentProperties ? "true" : "false");
    refreshResultContainers(true);
    updateFilterCount();
  }, parentNode, "div");
  styleFilterCmd(cmd);

  var persistedState = daftCookie("hideAgents") || "false";
    
  cmd.input.checked = persistedState == "true";
  hideAgentProperties = cmd.input.checked;
}

function createPhotoFilterCommand(parentNode) {
  var cmd = createCmd("Only Show With Photos", function(evt) {
    onlyWithPhotos = evt.target.checked;
    
    daftCookie("onlyWithPhotos", onlyWithPhotos ? "true" : "false");
    refreshResultContainers(true);
    updateFilterCount();
  }, parentNode, "div");
  
  styleFilterCmd(cmd);

  var persistedState = daftCookie("onlyWithPhotos") || "false";
    
  cmd.input.checked = persistedState == "true"
  onlyWithPhotos = cmd.input.checked;
}

function createHistoryCommand(parentNode){
  var cmd = createCmd("Show History", function(evt) {
    showHistory = evt.target.checked;
      
    daftCookie("showHistory", showHistory ? "true" : "false");
    refreshResultContainers(true);
  }, parentNode, "div");
    
  styleFilterCmd(cmd);
  
  var persistedState = daftCookie("showHistory") || "true";
      
  cmd.input.checked = persistedState == "true";
  showHistory = cmd.input.checked;
}

function createFilterCommands(parentNode){
  var popUp = document.createElement("div");
  dojo.addClass(popUp, "filterPopUp");
  dojo.style(popUp, {
    display: "none"
  });
  dojo.body().appendChild(popUp);
  
  popUp.innerHTML = '<div class="popupCloseNode"><img class="popupCloseIcon" src="http://www.chofter.com/apps/DaftMonkey/cross.png"></div>';

  createHistoryCommand(popUp);
  createShowHiddenCommand(popUp);
  
  var filtersHeader = document.createElement("div");
  dojo.style(filtersHeader, {"fontWeight": "bold", "paddingTop": "5px"});
  filtersHeader.innerHTML = "Filters";
  popUp.appendChild(filtersHeader);
  
  createFilterBox(popUp);
  
  createPhotoFilterCommand(popUp);
  createHideAgentsCommand(popUp);
  
  var cmd = document.createElement("span");
  parentNode = parentNode ? parentNode : cmds;
  parentNode.appendChild(cmd);
  
  cmd.innerHTML = "Options";
  dojo.style(cmd, {
    paddingRight: "15px",
    paddingTop: "2px",
    paddingLeft: "5px",
    float: "left",
    cursor: "pointer",
    background: "url(http://www.chofter.com/apps/DaftMonkey/bullet_arrow_down.png) no-repeat top right"
  });
  
  dojo.addClass(cmd, "unselectable");
  
  var afterLabel = document.createElement("span");
  dojo.attr(afterLabel, "id", "filterCount");
  
  parentNode.appendChild(afterLabel);
  
  var labelStyle = {"float": "left", "paddingTop" : "2px","paddingLeft" : "2px", paddingRight: "5px"};
  dojo.style(afterLabel, labelStyle);
  
  function setPopup(show) {
    if (show) {
      var cmdPos = dojo.marginBox(cmd)
      var absPos = dojo._abs(cmd, true);

      dojo.style(popUp, {
        "left": absPos.x + "px",
        "top": (absPos.y + 5 +  cmdPos.h) + "px",
        "display": ""
      });
      dojo.query("input", popUp)[0].focus();
    }  else {
      dojo.style(popUp, "display", "none")
    }
  }
  
  dojo.connect(cmd, "onclick", function(evt){
    setPopup(dojo.style(popUp, "display") == "none");
  });
  
  dojo.connect(window, "onresize", function(){
    setPopup(dojo.style(popUp, "display") != "none");
  });
  
  dojo.query(".popupCloseIcon", popUp).connect("onclick", function(){
    setPopup(false);
  });
}

function createPhotoLoadCommand(){
  var photoCmd = createCmd("Load Photos", function(evt) {
    evt.target.disabled = true;
    addToQueue(loadAllPhotos);
  });
  
  dojo.subscribe("daft-photo-load", function(index){
    if (!allPhotosLoaded || photoLoadComplete){
      // If all photos are not being loaded, and just one search results'
      // photos are loaded, do not show the loading indicator.
      return;
    }
    dojo.style(photoCmd.input, "display", "none");
    dojo.style(photoCmd.label, "color", "blue");
    photoCmd.label.innerHTML = "(Loading Photos: " + index + " of " + widget.resultCount + ")";
  });
  

  dojo.subscribe("daft-photo-load-complete", function(){
    photoLoadComplete = true;
    dojo.style(photoCmd.label, "color", "red");
    photoCmd.label.innerHTML = "(All Photos Loaded)";
  });
}


function daftCookie(name, value) {
  var name = "daftmonkey-data-" + name;
    
  if (arguments.length < 2) {
    return GM_getValue(name);
  }
  
  if (!dojo.isString(value)) {
    value = dojo.toJson(value);
  }
  GM_setValue(name, value);
}

// Check for a new version once per day
function checkVersion(){
  var lastCheck = daftCookie("lastVersionCheck") || 0;
  
  var now = (new Date()).getTime();
  
  var day = 1000 * 60 * 60 * 24;
  
  
  daftCookie("lastVersionCheck", now);

  if (now - lastCheck > day) {
    GM_xmlhttpRequest({
      url : "http://www.chofter.com/apps/versions.json?cachebust=" + now,
      method: "GET",
      onload: function(versions){
        versions = dojo.fromJson(versions.responseText);
              
        if (versions && versions.daftmonkey) {
          if (Number(versions.daftmonkey) > currentVersion) {
            daftMonkeyLink.innerHTML = "(Get New DaftMonkey Version)";
          }
        }
      },
      onerror: function(){
        alert("failed to read photo data");
      }
    });
  }
}

function fixArray(arrObj) {
 // if (arrObj.length) {
 //   return arrObj;
 // }
  if (!arrObj[0]) {
    return arrObj;
  }
  var fixedArr = [];    
  for (var i = 0; true; i++) {
    if (!arrObj[i]) {
      break;
    }
    fixedArr.push(arrObj[i]);
  }
  return fixedArr;
}

// Generates the table of data showing the price and subtitle history of each property
function generateHistory(data) {
  var table = document.createElement("table");
  table.className = "historyTable";
  
  var body = document.createElement("tbody");
  table.appendChild(body);
  
  dojo.style(table, "border", "1px solid #D7D7D7");
  
  var topRow = document.createElement("tr");
  body.appendChild(topRow);
  topRow.appendChild(document.createElement("td"));
  topRow.firstChild.setAttribute("colspan", "3");
  topRow.firstChild.innerHTML = "History";

  dojo.style(topRow, "backgroundColor", "#F1F1F1");

  var prices = data.prices ? fixArray(data.prices) : [];;
  //var subtitles = data.subtitles;
  
  var events = [];
  
  function formatPriceValue(value) {
    value = fixArray(value);
    if (!value.length) {
      return value[0] ?  value[0].text + ":" + value[0].value : value;
    }
    var str = "<table><tbody>";
    
    for (var i = 0; i < value.length; i++) {
      str += "<tr><td>" + value[i].text + "</td><td>" + value[i].value + "</td></tr>";
    }
    str += "</tbody></table>";
    return str;
  }
  
  
  for (var i = prices.length - 1; i > -1; i--) {
    var desc = (i == 0) ? "Initial Price" : "Price changed";
  
    events.push({date: prices[i].date, value: formatPriceValue(prices[i].value), text: desc});
  }

  events.sort(function(a, b){
    if (a.date < b.date) {
      return -1;
    }
    if (a.date == b.date) {
      return 0;
    }
    return 1;
  });
  
  for (var i = events.length - 1; i > -1; i--) {
    var row = document.createElement("tr");
    var dateCell = document.createElement("td");
    var priceCell = document.createElement("td");
    var descCell = document.createElement("td");
        
    var date = new Date(Number(events[i].date));
    
    var min = date.getMinutes();
    var hour = date.getHours();
    
    dateCell.innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" 
      + date.getFullYear() + " " + (hour % 12) + ":" + (min < 10 ? "0" + min : min) + (hour >= 12 ? "PM" : "AM");
    priceCell.innerHTML = events[i].value;
    descCell.innerHTML = events[i].text;
    
    row.appendChild(dateCell);
    row.appendChild(priceCell);
    row.appendChild(descCell);
    
    dojo.forEach([dateCell, priceCell, descCell], "dojo.style(item, 'padding', '4px');");
    
    
    dojo.style(row, "backgroundColor", "#E7ECFF");
    body.appendChild(row);
  }
  
  if (data.isNew) {
    dojo.style(table.rows[table.rows.length - 1], "backgroundColor", "#DBCA18");
  }
  
  dojo.style(table, {"marginTop": "8px", "fontSize": "8pt"});
  return table;
}

// Define the widget that parses and manipulates each result.
// One widget is defined per search result, so the "node"
// that is passed in to each widget's constructor is the table that
// encompasses the entire search result.
var widget = {

  resultCount: 0,

  Result: function(node){
    
    var _this = this;
    // Define the save function, which persists the state of the search result.
    this.save = function(){
        // Have to use the timeout so that the unsafeWindow doesn't try to save anything
        // as that will fail
        setTimeout(function(){
          daftCookie(recID, _this.persist);      
        }, 0);
    };

    this.domNode = node;
    this.content = null;
    
    widget.resultCount ++;
    
    
    this.title = dojo.query("div.title a span", node)[0];


    // If there is no title, this is not a property - it could be
    // an advertisement, so do nothing with it.
    if (!this.title) {
      this.nonValid = true;
      return;
    }
    
    // Get the images in the property.
    var imgs = dojo.query("a img", node);
    
    if (imgs.length > 0) {
      this.img = imgs[0];
      this._imgConnect = true;

      var imgAnchor = this.img.parentNode;
      if (imgAnchor.parentNode.tagName == "A"){
        imgAnchor = imgAnchor.parentNode;
      }

      log("this.img.parentNode.parentNode = ",this.img.parentNode.parentNode);

      dojo.style(imgAnchor, {"float": "left", "paddingLeft": "10px", "paddingRight": "10px"});

      doConnect(this.img, "onclick", function(evt){
        if (_this._imgConnect) {
          dojo.stopEvent(evt);

          window.open(dojo.attr(evt.target.parentNode, "href"));
        }
      });
    } else {
      log("no image in ", node);
    }
        
    
    dojo.attr(this.title, "df", "title");
    
    this.titleText = this.title.innerHTML.toLowerCase();
    
    
    var allTitleText = this.title.parentNode.parentNode.firstChild.textContent;
    allTitleText = dojo.trim(allTitleText.replace("\n", ""));
    
    // Get the photo index.
    this.index = allTitleText.substring(0, allTitleText.length - 1);
    
    // Get the path to the page describing the property.
    this.href = fixLocalHref(dojo.attr(this.title.parentNode, "href"));
    
    // Get the property type, e.g. rental, commercial etc
    this.propertyType = getPropertyType(dojo.attr(this.title.parentNode, "href"));
    
    // Get the property ID.  This is a unique number.
    this.id = getIdFromHref(this.href);
    
    // Get the three "tr" table rows.  The top one shows the title, the middle one
    // shows the details of the property, and the bottom one has links for
    // adding to saved adds and viewing more details.
    var rowTable = dojo.query("table[class='fsmall']", node)[0];
    this.rows = dojo.query("div.title,div.majority_of_text,div.links", this.domNode);//rowTable.rows;
    
    var descriptionCell = this.rows[1];//dojo.query("td[class='fsmall']", _this.rows[1])[0]
    
    this.getPrices = function(){
    
      var subtitle;
    
      var prices = [];
      
      function formatDesc(str) {
        if (str.indexOf(" - ") == 0) {
          return str.substring(3);
        }
        return str;
      }
    
      var priceNodes = dojo.query("span.price ", _this.domNode);

      if (priceNodes.length > 0) {
        //<table><tbody><tr><td class="fsmall"><b>1 Bed Apartments</b>&nbsp; </td>
        //<td class="fsmall">From 214,000</td><td width="10px"></td>
        //<td class="fsmall"><b>2 Bed Apartments</b>&nbsp; </td>
        //<td class="fsmall">From 250,000</td><td width="10px"></td></tr>
        //<tr><td class="fsmall"><b>3 Bed Apartments</b>&nbsp; </td>
        //<td class="fsmall">From 349,000</td><td width="10px"></td></tr></tbody></table>


        priceNodes.forEach(function(node) {
        
          var bedrooms = dojo.query("span.bedrooms", node.parentNode)[0];
        
          var desc = bedrooms ? bedrooms.innerHTML : "";

          prices.push({
            value: node.innerHTML,
            text: formatDesc(desc)
          });
        });
        return prices;
      }
      
      
      var priceNodes = dojo.query("span.price", this.domNode);


      if (priceNodes) {
        
        priceNodes.forEach(function(node){
          
          var bedrooms = node.nextSibling;
          
          while (!bedrooms.tagName) {
          	bedrooms = bedrooms.nextSibling;
          }
          
          prices.push({
            value: node.innerHTML,
            text: bedrooms.innerHTML
          });
        });

	return prices;
	
	/*
      
        var innerBs = dojo.query("b", priceNode);

        if (innerBs.length > 0) {
          
          return prices;
        } else {
          //<b>1,795 monthly</b>, 3 bedrooms (1 single, 2 double), 2 bathrooms, furnished
          var next = priceNode.nextSibling;
         // log ("priceNode = ", priceNode);
          var textContent = trim(next.textContent);
          while(textContent == "\n" || textContent.length == 0 || (textContent.length == 1 && textContent.charCodeAt(0) == 160)) {
         //   log ("skipping '" + next.textContent + "'");
            next = next.nextSibling;
            textContent = trim(next.textContent);
          }

          subtitle = next.textContent;
   
          if (subtitle.indexOf(", ") == 0) {
            subtitle = subtitle.substring(2);
          }
          return [{value: priceNode.innerHTML, text: formatDesc(subtitle)}];
        }*/
      }
      
      return null;
    };

    var textAreaID = this.id + '_textarea';
    
    this.prices = this.getPrices();
    
    var recID = "rec-" + this.id;
  
    var persist = daftCookie(recID);
    if (!persist || persist == null ) {
    
      persist = {
        clicked: false,
        hidden: false,
        isNew: true
      };
    } else {
      persist = dojo.fromJson(persist || {});
      persist.isNew = false;      
    }
    
    
    // Price formats changed for v1.6, so clear them.
    if (!persist.version) {
      persist.prices = null;  
    }
    persist.version = currentVersion;
    
    this.persist = persist;
       
       
    function pushIf(array, value) {
      array = fixArray(array);
      if (array.length == 0 || (trim(array[array.length - 1].value) != trim(value))) {
        // Hacky fix for a bug introduced in testing, where "_5" was appended to each subtitle.
        // Just replace it.
        if (array[array.length - 1].value == value + "_5") {
          array[array.length - 1].value = value;
        }  else {
          array.push({date: (new Date()).getTime(), value: value});
        }
        return true;
      }
      return false;
    }
    
    function comparePrices(p1, p2) {
      if (!p1 || !p2 || p1.length == 0) {
        return false;
      }
      var newP1 = fixArray(p1[p1.length - 1].value);  
      if (!newP1.length || !p2.length || newP1.length != p2.length) {
      
        return false;
      }
      
      for (var i = 0; i < newP1.length; i++) {
          if (newP1[i].value != p2[i].value || newP1[i].text != p2[i].text) {
	    return false;
          }
      }
      return true;
    }

    var priceAdded = false;
    
    if (this.prices) {
      if (!this.persist.prices) {
        this.persist.prices = [];
      } else {
        // Deserializing the Array just gives an object, with no length property,
        // so replace it with an array 
        this.persist.prices = fixArray(this.persist.prices);
      }
      if (!comparePrices(this.persist.prices, this.prices)) {
        priceAdded = true;
        this.persist.prices.push({date: (new Date()).getTime(), value: this.prices});
      }
    }

    if (priceAdded) {// || subtitleAdded) {
        
      // If the price or the subtitle has changed, the property
      // might be different, so delete the photo cache and download
      // it again.  Also show it to the user if it is hidden,
      // as they might be interested in it now if the price has dropped,
      // or if the landlord is letting a different property.
      this.persist.hidden = false;
      
      if (this.persist.photos) {
        delete this.persist['photos'];
        
      }
      this.save();
    }

    if (dojo.query(".property-bee-container", this.domNode).length < 1) {
         descriptionCell.appendChild(generateHistory(this.persist));
    }

    dojo.style(node, "paddingBottom", "20px");
    dojo.addClass(node, "daftResult");
    
    doConnect(node, "onclick", function(evt){
    
      var tgt = evt.target.tagName == "A" ? evt.target : evt.target.parentNode;
         
      if (tgt.tagName == "A" && dojo.attr(tgt, "href").substring("javascript") != 0) {
        dojo.stopEvent(evt);
        window.open(dojo.attr(tgt, "href"));
      }
    });
    
    this.hasAgent = dojo.query("span.agent", this.domNode).length > 0;

    var _this = this;
    
    var actionLinks = dojo.query("div.links > a", this.domNode);

    var viewMore = actionLinks[1];
    
    // Make the "hide me" link
    var hideMe = document.createElement("a");
    hideMe.innerHTML = this.persist.hidden ? "Unhide This Result" : "Hide This Result";
    dojo.attr(hideMe, "href", "#");
    
    doConnect(hideMe, "onclick", function(evt){
      dojo.stopEvent(evt);
      var h = _this.persist.hidden = !_this.persist.hidden;
      
      hideMe.innerHTML = h ? "Show This Result" : "Hide This Result";
      
      _this.save();
      
      if (h) {
        _this.redraw();
      }
      
      refreshResultContainers(true);
      return;
    });
    actionLinks[0].parentNode.insertBefore(hideMe, actionLinks[0]);
    actionLinks[0].parentNode.insertBefore(document.createTextNode(" | "), actionLinks[0]);
    
    if (viewMore) {
    
      // Make the "view more details" link dynamically load the content
      doConnect(viewMore, "onclick", function(evt){
        
        _this.setNotesRowDisplay("none");
        if (!_this.detailRow) {
          
          dojo.addClass(evt.target.parentNode, "daftResult-loading");
          
          _this.loadContent(function(){
            dojo.removeClass(evt.target.parentNode, "daftResult-loading");
            viewMore.innerHTML = "hide more details";
          
            semaphore = false;
            processNextCommand();
          });


          _this.loadPhotos(function(){
            semaphore = false;
            processNextCommand();
          });
          
        } else {
          _this.setDetailRowDisplay(dojo.style(_this.detailRow, "display") == "none" ? "" : "none");
        }
        dojo.stopEvent(evt);
        return false;
      });
    }
    
    // Create the View Notes link
    // -------------------------------------------
    var viewNotesLink = document.createElement("a");
    dojo.addClass(viewNotesLink, "viewNotes");
    
    viewNotesLink.innerHTML = "View Notes";
    dojo.attr(viewNotesLink, "href", "#");

    actionLinks[0].parentNode.insertBefore(viewNotesLink, actionLinks[0]);
    actionLinks[0].parentNode.insertBefore(document.createTextNode(" | "), actionLinks[0]);

    doConnect(viewNotesLink, "onclick", function(evt){
      dojo.stopEvent(evt);
      _this.setDetailRowDisplay("none");
      
      if(!_this.notesRow) {
        _this.notesRow = document.createElement("div");
        
        dojo.style(_this.notesRow, "display", "none");
        
        _this.notesRow.innerHTML = '<div style="width:100%">Notes: </div><textarea id="' + textAreaID + '"></textarea>';
        
        _this.rows[0].parentNode.appendChild(_this.notesRow);
        
        _this.notesNode = dojo.byId(textAreaID);
        dojo.attr(_this.notesNode, {"rows": "10", "cols":"50"});
        _this.notesRow.appendChild(_this.notesNode);
        
        var initialValue = _this.persist.notes;
        
        dojo.byId(textAreaID).innerHTML = initialValue || "";
                
        // Save the notes when the text area loses focus.
        doConnect(dojo.byId(textAreaID), "onblur", function(){
          _this.persist.notes = _this.notesNode.value;
          _this.save();
        });
      }
      _this.setNotesRowDisplay(dojo.style(_this.notesRow, "display") == "none" ? "" : "none");
    });
    
    
    this.updateDisplay = function(){
      var hasNotes = _this.persist.notes && this.persist.notes.length > 0;
      dojo[hasNotes ? "addClass" : "removeClass"](_this.domNode, "hasNotes");
    };
    dojo.connect(this, "save", this, "updateDisplay");
    
    
    // End create the view notes
    //--------------------------------------------
    
    this.setDetailRowDisplay = function(display) {
      if(!_this.detailRow){return;}
      viewMore.innerHTML = (display == "none") ? "View More Details" : "Hide More Details";
      dojo.style(_this.detailRow, "display", display);
    //  dojo.style(_this.detailRow[1], "display", display);
    };
    
    this.setNotesRowDisplay = function(display) {
      if(!_this.notesRow){return;}
      viewNotesLink.innerHTML = (display == "none") ? "View Notes" : "Hide Notes";
      dojo.style(_this.notesRow, "display", display);
      
      // If the notes are being shown, send the focus to the textarea for typing in.
      if (display != "none") {
        dojo.query("textarea", _this.notesRow)[0].focus();
      }
    };
    
    this.setVisible = function(show){
      dojo.style(this.domNode, "display", show ? "" : "none");
    };
    
    this.isVisible = function(){
      return dojo.style(this.domNode, "display") != "none";
    };
    
    this.hasContent = function(){
      return this.content != null;
    };
    
    this.redraw = function(){
      var display = "";// = (onlyWithPhotos && !this.img) || (hideHiddenProperties && this.persist && this.persist.hidden) ? "none" : "";
      
      var hideType = null;
      
      if (!isSavedPage) {
        if (onlyWithPhotos && !this.img) {
          hideType = "photos";
        } else if(hideHiddenProperties && this.persist && this.persist.hidden){
          hideType = "hidden";
        } else  if (display != "none" && filters.length > 0
            && dojo.some(filters, function(item){
            return _this.titleText.indexOf(item) > -1; })) {        
          hideType = "text";
        } else if (hideAgentProperties && this.hasAgent) {
          hideType = "agent";
        }
      
        if (hideType) {
          filterCounts[hideType] ++;
          display = "none";
          updateFilterCount();
        }
      }
      
      dojo.style(node, "display", display);
      
      // Only load the photos if the property is visible
      if (allPhotosLoaded && !this.content && !this.contentLoading && this.isVisible())  {
        
        this.contentLoading = true;
        
        addToQueue(function(){
          _this.loadPhotos(function(){
            semaphore = false;
            processNextCommand();
          });
        });
      }
    
    };
    
    
    this.addPhoto = function(node) {
      
      if (!this.imgCell) {
        

        this.imgCell = document.createElement("p");
        this.rows[1].appendChild(this.imgCell);
        
        dojo.style(this.imgCell, {
          "backgroundColor": "#f7f7f7"
        });
      }
      
      
      var _this = this;
      
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
      
      var img = dojo.query("img", node)[0];
      this.imgCell.appendChild(node);
      dojo.attr(node, "href", this.href);
      
      var width = dojo.style(img, "width");
      var line = {start: 1, end: Math.max(100, width)};
      
      
      doConnect(img, "onload", function(){
      
        dojo.animateProperty({
          node: img,
          properties: {
            width: line
          },
          duration: 2000,
          onEnd: function(){
            var lb = new LightboxNano(dojo.attr(img, "src2"), img);
          }
        }).play();    
      });
      
      dojo.style(img, {"width": "1px", "paddingRight" : "3px"});
      dojo.attr(img, "src", dojo.attr(img, "src1"));
            
      
      dojo.style(img, {
        maxHeight: "120px",
        maxWidth: "100px"
      });

      
    };
    
    this.loadPhotos = function(callback){
      if (this.photosLoaded) {
        callback();
        return false;
      }
      
      if (!this.img) {
        callback();
        return;
      }
      
      if (this.persist.photos) {
      
        this.persist.photos = fixArray(this.persist.photos);
        this.setPhotos(this.persist.photos);
        callback();
        return;
      }
      dojo.publish("daft-photo-load", [this.index]);
      
      
      this.loadContent(callback, true);
      
      return;
    };
    
    this.setPhotos = function(images) {
      
      if (this.photosLoaded) {
        return;
      }
      this.photosLoaded = true;

      var _this = this;
      dojo.forEach(images, function(image, index) {
        var urls = image;
        
        var small = image;//urls["96h"];
        var large = image;//urls["600l"];
        
        if (index == 0) {
        
          // If the main image is a video, don't create lightbox for it.
          if (dojo.attr(_this.img, "src").indexOf("_FLV") > -1) {
            
            return;
          }
          if (_this._imgConnect) {
            _this._imgConnect = null;
          }
          new LightboxNano(large, _this.img);
          
          return;
        }
          
        var a = document.createElement("a");
        dojo.attr(a, "href", "#");
        var img = document.createElement("img");
        a.appendChild(img);
        
        dojo.style(img, "border", "0px none");
       
        dojo.attr(img, "src1", small);
        dojo.attr(img, "src2", large);
        
        dojo.style(a, "float", "left");
          
        doConnect(a, "onclick", function(evt){
          dojo.stopEvent(evt);
          return false;
        });
      
        _this.addPhoto(a);
      });
    
    };
    
    
    this.loadContent = function(callback, dontShow){
      if (this.content) {
        callback();
        return false;
      }
      this.contentLoading = true;
      href = _this.href;
      

      GM_xmlhttpRequest({
        url : href,
        method: "GET",
        onload: function(data){
              
          _this.setContent(data.responseText, dontShow);
          callback();
        },
        onerror: function(){
          alert("failed to read photo data");
          callback();
        }
      });

      return true;
    };
        

    this.setMap = function(html, domNode) {
      if (dojo.query("iframe", domNode).length > 0) {
      	return;
      }
    
    
      var latitudeToken = "var lat = ";
      var longtitudeToken = "var lon = ";
      
      function getNumberAfter(token) {
        var idx = html.indexOf(token);
        var colonIdx = html.indexOf(";", idx);
        return html.substring(idx + token.length, colonIdx);
      }
      
      var lat = getNumberAfter(latitudeToken);
      var long = getNumberAfter(longtitudeToken);
      
      domNode.innerHTML = '<iframe width="425" height="350" frameborder="0" scrolling="no" marginheight="0" '
      + 'marginwidth="0" '
      + 'src="http://maps.google.com/?ie=UTF8&amp;ll=' + lat 
      + ',' + long 
      + '&amp;spn=0.290217,0.617294&amp;z=15&amp;output=embed"></iframe>';
    };

    
    this.setContent = function (html, dontShow){
      if (this.content) {
        this.setMap(html, this.rightDetail);
        return;
      }
      var _this = this;
      this.content = html;
      
      this.topSection = getNodesFromHtml(
          this.content, 
          "div[id='price'],div[id='details'],div[id='contact']");
          
          
      var photoImgs = getNodesFromHtml(null, "#pb_carousel li > img");
      
      var photoUrls = [];
      photoImgs.forEach(function(img){
        photoUrls.push(img.src);
      });
      
      
      this.persist.photos = photoUrls;
      this.save();
      this.setPhotos(photoUrls);
      
      var bottomSectionIds = ["div[id='features']", "div[id='description']", "table[id='facilities']"];
      this.bottomSection = [];
      
      dojo.forEach(bottomSectionIds, function(q, idx){

        try {
          var node = getNodesFromHtml(null, q)[0];
        
          if (node) {
            _this.bottomSection.push(node);
          }
        } catch(e){

        }
      });
                
      var addressStrong = getNodesFromHtml(null, "div#smi_location > ul > li strong")[0];
      
      var listOfLocalAreaInfo;
      if (addressStrong) {
        listOfLocalAreaInfo = addressStrong.parentNode.parentNode;
      }
      
      if (!this.detailRow) {
        var detailTable = document.createElement("table");
        var detailBody = document.createElement("tbody");
        detailTable.appendChild(detailBody);
        
        var row = this.detailRow = document.createElement("tr");
        detailBody.appendChild(row);

        this.rows[0].parentNode.appendChild(row);
        
        this.leftDetail = document.createElement("td");
        this.rightDetail = document.createElement("td");
        
        dojo.style(this.leftDetail, "verticalAlign", "top");

        row.appendChild(this.leftDetail);
        row.appendChild(this.rightDetail);
        
        if (dontShow) {
          dojo.style(this.detailRow, "display", "none");
        }
      }
      
      this.leftDetail.appendChild(getHeaderDiv("Summary"));

      this.topSection.forEach(function(node){
        _this.leftDetail.appendChild(node);
      });
      
      dojo.query("div[id='contact_advertiser']", this.domNode).orphan();
      
      
      function getHeaderDiv(text) {
        var h = document.createElement("div");
        h.innerHTML = text;
        dojo.style(h, {
          paddingTop: "10px",
          paddingBottom: "10px",
          fontWeight: "bold",
          textDecoration: "underline"
        });
        return h;
      }
      
      _this.leftDetail.appendChild(getHeaderDiv("Details"));
      
      
      dojo.forEach(this.bottomSection, function(node){
        _this.leftDetail.appendChild(node);
      });
      
      if (listOfLocalAreaInfo) {
        _this.leftDetail.appendChild(getHeaderDiv("More Details"));
        this.leftDetail.appendChild(listOfLocalAreaInfo);
      }
      
      if (!dontShow) {
        this.setMap(html, this.rightDetail);
      }
      dojo.style(this.rightDetail, "backgroundColor", "#F7F7F7");
    };
    
    this.redraw();
    
  }

};

function initTempPageContainer() {
  if (tempPageContainer) {
    return;
  }
  
  tempPageContainer = document.createElement("div");
  dojo.attr(tempPageContainer, "id", "tempPageContainer");
  dojo.body().appendChild(tempPageContainer);
    
  dojo.style(tempPageContainer, {
      position: "absolute",
      left: "-10000px",
      top: "-10000px",
      width: "1px",
      height: "1px",
      visibility: "hidden"
  });

}

function loadAllResults() {
  if (loading) {
    return;
  }
  
  loading = true;
    
  initTempPageContainer();
  
  dojo.query("pages > a")
    .forEach(function(item, idx, arr){
      if (item.innerHTML.indexOf("&gt;") < 0 && item.innerHTML.indexOf("&lt;") < 0) {
        item.parentNode.removeChild(item);
      }
     });
  
  addToQueue(loadPage);
  addToQueue(function(){
    refreshResultContainers(true);
    semaphore = false;
    processNextCommand();
  });
  addToQueue(function(){
    if (allPhotosLoaded) {
      loadAllPhotos();
    }
    semaphore = false;
    processNextCommand();
  });
}

function loadPage() {
  if (pages.length < 1) {
 
    dojo.publish("daft-page-load-complete");
    semaphore = false;
    processNextCommand();
    return;
  }

  var pageData = pages.splice(0, 1)[0];
  var href = pageData.href;
  var text = pageData.text;
  dojo.publish("daft-page-load", [text]);
  
  photoLoadComplete = false;
  
  var l = window.location;
  href = l.protocol + "//" + l.host + href;
  
  
  GM_xmlhttpRequest({
    url : href,
    method: "GET",
    onload: appendPageData,
    onerror: function(){
      alert("failed to read data");
    }
  });
}

function appendPageData(data){
  
  var pagDiv = getNodesFromHtml(data.responseText, 
    "div.pagination")[0];
    
  var container = pagDiv.previousSibling;
  
  while (container && container.tagName != "UL") {
    container = container.previousSibling;
  }
  
  while(container.firstChild) {
    tableContainer.appendChild(container.firstChild);
  }
  

  loadPage();
}

function getBodyContent(html) {
  var bodyIdx = html.indexOf(">", html.indexOf("<body"));
  var endBodyIdx = html.indexOf("</body");

  var body = html.substring(bodyIdx + 1, endBodyIdx);

  return body;
}

function stripIframe(body, returnFrame) {
  var scriptIdx = body.indexOf("<iframe");
  var endScriptIdx;
    
  var iframe;
    
  if(scriptIdx > -1) {
    endScriptIdx = body.indexOf("</iframe", scriptIdx);
    
    if (endScriptIdx < 0) {
      endScriptIdx = body.indexOf("/>", scriptIdx);
    }
    endScriptIdx = body.indexOf(">", endScriptIdx) + 1;

    iframe = body.substring(scriptIdx, endScriptIdx);
    body = body.substring(0, scriptIdx) + body.substring(endScriptIdx);
    
  }
      
  return returnFrame ? iframe : body;

}

function getNodesFromHtml(html, query, initialQuery, initialIndex) {
  initTempPageContainer();
  if (html) {
    var text = getBodyContent(html);
    tempPageContainer.innerHTML = stripIframe(text);
  }  
  var context = tempPageContainer;
  
  if (initialQuery) {
    context = dojo.query(initialQuery, tempPageContainer)[initialIndex || 0];
  }
  
  return dojo.query(query, context);
}


function filterResultsForPhotos(doHide) {
  onlyWithPhotos = doHide;
  refreshResultContainers(true);
}

function initResultContainer(container, doRedraw) {
  if (container._widget) {
    if (doRedraw) {
      container._widget.redraw();
    }
    return;
  }
    
  var w = new widget.Result(container);
  if (w.nonValid) {
    container._widget = {redraw:function(){}};
   // dojo.style(container, "visibility", "hidden");
  } else {
    container._widget = w;
    resultContainers[container._widget.id] = container._widget;
  }
  
  // Save the state of the property
  w.save();
}

function refreshResultContainers(doRedraw) {

  dojo[showHistory ? "removeClass" : "addClass"](dojo.body(), "hiddenHistory");

  for (var x in filterCounts) {
    filterCounts[x] = 0;
  }

  var nodes = dojo.query("> li", tableContainer);
    
  // Have to use a normal for loop here, can't use forEach on the nodes because
  // GreaseMonkey's security refuses to let functions scoped by dojo call GM_getValue
  for (var i = 0; i < nodes.length; i++) {
    initResultContainer(nodes[i], doRedraw);
  }
}


function fixLocalHref(href) {
  if (href.indexOf("http://") < 0) {
    return "http://www.daft.ie" + href;
  }
  return href;
}


function getIdFromHref(href) {
  return getAttrFromHref(href, "id");
}

function getAttrFromHref(href, attr) {
  var parts = href.split("/");
  var search = parts[parts.length - 1];
  
  var params = dojo.filter(search.split("&"), "return item.indexOf('" + attr + "' + '=') == 0;");
  
  if(params.length == 0){ 
    return null;
  }
  // Get the last occurrence of the attribute
  return params[params.length - 1].split("=")[1];
}


//----------------------------------------------------------------
// start Photo Code

function loadAllPhotos() {
  initTempPageContainer();
  allPhotosLoaded = true;
  
  if(!dojox) {
    dojox = unsafeWindow.dojox;
  }

  refreshResultContainers(true);

  addToQueue(function(){
    dojo.publish("daft-photo-load-complete");
    
    semaphore = false;
    processNextCommand();
  });
  semaphore = false;
  processNextCommand();
}


// end photo code
//---------------------------------------------------



function declare(){
  (function(d){d._destroyElement=d.destroy=function(_2){_2=d.byId(_2);try{if(!_destroyContainer||_destroyContainer.ownerDocument!=_2.ownerDocument){_destroyContainer=_2.ownerDocument.createElement("div");}_destroyContainer.appendChild(_2.parentNode?_2.parentNode.removeChild(_2):_2);_destroyContainer.innerHTML="";}catch(e){}};var _3=function(){var _4=unsafeWindow.dojo.global,_5=unsafeWindow.document,w=0,h=0,de=_5.documentElement,_9=de.clientWidth,_a=de.clientHeight,_b=d._docScroll();var _c=_5.body.clientHeight,_d=_5.body.clientWidth;var _e=_d,_f=_c,_10=_9,_11=_a;if(_d>_9){_e=_9;_10=_d;}if(_c>_a){_f=_a;_11=_c;}w=(_10>_4.innerWidth)?_e:_10;h=(_11>_4.innerHeight)?_f:_11;return {w:w,h:h,l:_b.x,t:_b.y};};LightboxNano=function(_12,n){var _14=this;this.href=_12;this.duration=500;this.preloadDelay=5000;this._node=null;this._start=null;this._end=null;this._img=null;this._bg=null;this._onClickEvt=null;this._connects=null;this._loading=false;this._loadingNode=null;this.destroy=function(){var a=this._connects||[];a.push(this._onClickEvt);d.forEach(a,function(e){d.disconnect(e);});d.destroy(this._node);};this._createDiv=function(_17,_18){var e=d.doc.createElement("div");e.className=_17;d.style(e,{position:"absolute",display:_18?"":"none"});return e;};this._load=function(e){var _1b=this;d.stopEvent(e);if(!_1b._loading){_1b._loading=true;_1b._reset();var n=_1b._node.tagName=="IMG"?_1b._node:d.query("img",_1b._node)[0];var a=d._abs(n,true),c=d.contentBox(n),b=d._getBorderExtents(n),i=d.doc.createElement("img"),ln=_1b._loadingNode;if(ln==null){_1b._loadingNode=ln=_1b._createDiv("dojoxLoading",true);d.place(ln,_1b._node);var l=d.marginBox(ln);d.style(ln,{left:parseInt((c.w-l.w)/2)+"px",top:parseInt((c.h-l.h)/2)+"px"});}c.x=a.x-10+b.l;c.y=a.y-10+b.t;_1b._start=c;_1b._img=i;_1b._connects=[d.connect(i,"onload",_1b,"_show")];d.style(i,{visibility:"hidden",cursor:"pointer",position:"absolute",top:0,left:0,zIndex:9999999});d.body().appendChild(i);i.src=_1b.href;}};this._hideLoading=function(){if(this._loadingNode){d.style(this._loadingNode,"display","none");}this._loadingNode=false;};this._show=function(){var _23=this,vp=_3(),w=_23._img.width,h=_23._img.height,vpw=parseInt((vp.w-20)*0.9),vph=parseInt((vp.h-20)*0.9),dd=d.doc,bg=dd.createElement("div"),ln=_23._loadingNode;if(_23._loadingNode){_23._hideLoading();}d.style(_23._img,{border:"10px solid #fff",visibility:"visible"});d.style(_23._node,"visibility","hidden");_23._loading=false;_23._connects=_23._connects.concat([d.connect(dd,"onmousedown",_23,"_hide"),d.connect(dd,"onkeypress",_23,"_key"),d.connect(window,"onresize",_23,"_sizeBg")]);if(w>vpw){h=h*vpw/w;w=vpw;}if(h>vph){w=w*vph/h;h=vph;}_23._end={x:(vp.w-20-w)/2+vp.l,y:(vp.h-20-h)/2+vp.t,w:w,h:h};d.style(bg,{backgroundColor:"#000",opacity:0,position:"absolute",zIndex:9999998});d.body().appendChild(bg);_23._bg=bg;_23._sizeBg();var _2c=_23._coords(_23._start,_23._end);d.fx.combine([_23._anim(_23._img,_2c),_23._anim(bg,{opacity:0.5})]).play();};this._sizeBg=function(){var dd=d.doc.documentElement;d.style(this._bg,{top:0,left:0,width:dd.scrollWidth+"px",height:dd.scrollHeight+"px"});};this._key=function(e){d.stopEvent(e);this._hide();};this._coords=function(s,e){return {left:{start:s.x,end:e.x},top:{start:s.y,end:e.y},width:{start:s.w,end:e.w},height:{start:s.h,end:e.h}};};this._hide=function(){var _31=this;d.forEach(_31._connects,function(e){d.disconnect(e);});_31._connects=[];d.fx.combine([_31._anim(_31._img,_31._coords(_31._end,_31._start),"_reset"),_31._anim(_31._bg,{opacity:0})]).play();};this._reset=function(){d.style(this._node,"visibility","visible");d.forEach([this._img,this._bg],function(n){if(n){d.style(n,"display","none");d.destroy(n);n=null;}});this._node.focus();};this._anim=function(_34,_35,_36){return d.animateProperty({node:_34,duration:this.duration,properties:_35,onEnd:_36?d.hitch(this,_36):null});};var _14=this;n=dojo.byId(n);if(!/a/i.test(n.tagName)){var a=d.doc.createElement("a");a.href=_14.href;a.className=n.className;n.className="";d.place(a,n,"after");a.appendChild(n);n=a;}d.style(n,{display:"block",position:"relative"});d.place(_14._createDiv("dojoxEnlarge"),n);_14._node=n;d.setSelectable(n,false);_14._onClickEvt=d.connect(n,"onclick",_14,"_load");setTimeout(function(){(new Image()).src=_14.href;_14._hideLoading();},_14.preloadDelay);};})(dojo);
}
