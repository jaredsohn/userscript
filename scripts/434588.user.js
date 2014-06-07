// ==UserScript==
// @name        Videlibri-Skript
// @namespace   http://www.benibela.de
// @include     *
// @version     8
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_info
// ==/UserScript==

// @name        Webscraper / Xidelscript

/***************************************************************************
 *   copyright       : (C) 2012-2014 Benito van der Zander                 *
 *                              (except the library directly below)        *
 *   http://www.benibela.de                                                *
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation  either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 ***************************************************************************/

//\newcommand{\n}{new line} is it wise to write js in a tex editor??

//******************************************************************************
//Dragging library
//*****************************************************************************
// Do not remove this notice.
//
// Copyright 2001 by Mike Hall.
// See http://www.brainjar.com for terms of use.
//*****************************************************************************

// Determine browser and version.

function Browser() {

  var ua, s, i;

  this.isIE    = false;
  this.isNS    = false;
  this.version = null;

  ua = navigator.userAgent;

  s = "MSIE";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isIE = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  s = "Netscape6/";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = parseFloat(ua.substr(i + s.length));
    return;
  }

  // Treat any other "Gecko" browser as NS 6.1.

  s = "Gecko";
  if ((i = ua.indexOf(s)) >= 0) {
    this.isNS = true;
    this.version = 6.1;
    return;
  }
}

var browser = new Browser();

// Global object to hold drag information.

var dragObj = new Object();
dragObj.zIndex = 0;

function dragStart(event, el) {

  var el;
  var x, y;

  // If an element id was given, find it. Otherwise use the element being
  // clicked on.

  if (el)
    dragObj.elNode = el;
  else {
    if (browser.isIE)
      dragObj.elNode = window.event.srcElement;
    if (browser.isNS)
      dragObj.elNode = event.target;

    // If this is a text node, use its parent element.

    if (dragObj.elNode.nodeType == 3)
      dragObj.elNode = dragObj.elNode.parentNode;
  }

  // Get cursor position with respect to the page.

  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Save starting positions of cursor and element.

  dragObj.cursorStartX = x;
  dragObj.cursorStartY = y;
  dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
  dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);

  if (isNaN(dragObj.elStartLeft)) dragObj.elStartLeft = 0;
  if (isNaN(dragObj.elStartTop))  dragObj.elStartTop  = 0;

  // Update element's z-index.

  //dragObj.elNode.style.zIndex = ++dragObj.zIndex;

  // Capture mousemove and mouseup events on the page.

  if (browser.isIE) {
    document.attachEvent("onmousemove", dragGo);
    document.attachEvent("onmouseup",   dragStop);
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS) {
    document.addEventListener("mousemove", dragGo,   true);
    document.addEventListener("mouseup",   dragStop, true);
    event.preventDefault();
  }
}

function dragGo(event) {

  var x, y;

  // Get cursor position with respect to the page.

  if (browser.isIE) {
    x = window.event.clientX + document.documentElement.scrollLeft
      + document.body.scrollLeft;
    y = window.event.clientY + document.documentElement.scrollTop
      + document.body.scrollTop;
  }
  if (browser.isNS) {
    x = event.clientX + window.scrollX;
    y = event.clientY + window.scrollY;
  }

  // Move drag element by the same amount the cursor has moved.

  dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
  dragObj.elNode.style.top  = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";

  if (browser.isIE) {
    window.event.cancelBubble = true;
    window.event.returnValue = false;
  }
  if (browser.isNS)
    event.preventDefault();
}

function dragStop(event) {

  // Stop capturing mousemove and mouseup events.

  if (browser.isIE) {
    document.detachEvent("onmousemove", dragGo);
    document.detachEvent("onmouseup",   dragStop);
  }
  if (browser.isNS) {
    document.removeEventListener("mousemove", dragGo,   true);
    document.removeEventListener("mouseup",   dragStop, true);
  }
  
  var dragged = $(dragObj.elNode);
  GM_setValue(prf+"guicoordinates", JSON.stringify([dragged.css("left"), dragged.css("top"), dragged.width(), dragged.height()]));
}

//******************************************************************************

var interceptor = {};
var lang = 0;

function tr(en, de) {
  return (!lang || !de) ? en : de;
}

var prf = "__scraper_";
var prfid = "#" + prf;
var prfclass = "." + prf;
var multipageInitialized = false;
var multipageInterceptionInitialized = false;
var mainInterface = null;
var changedBody = false;


   
function moveLeft(e){
  $(prfid + "moveleft").hide();
  $(prfid + "moveright").show();
  mainInterface.css("left", "0px");
  mainInterface.css("right", "");
  mainInterface.css("top", "0px");
  mainInterface.css("width", "25%");
  mainInterface.css("height", "100%");
  GM_setValue(prf+"guiposition", "left");
  
  $(document.body.parentNode).css("position", "absolute").css("left", "26%").css("width", "75%");
  //TODO: move fixed
  changedBody = true;
}

function moveRight(e){
  $(prfid + "moveleft").show();
  $(prfid + "moveright").hide();
  mainInterface.css("top", "0");
  mainInterface.css("left", "");
  mainInterface.css("right", "0px");
  mainInterface.css("width", "25%");
  mainInterface.css("height", "100%");
  GM_setValue(prf+"guiposition", "right");

  $(document.body.parentNode).css("position", "absolute").css("left", "0").css("width", "74%");
  changedBody = true;
}

function makeinput(caption, id, value){ 
  var overridenValue = value;
  if (GM_getValue(prf+id+"_saved")) overridenValue = GM_getValue(prf+id+"_saved");
  return '<tr><td>'+caption+':</td><td><input id="'+prf+id+'"'+(overridenValue?'value="'+overridenValue+'"':"")+'/></td><td><button onclick="document.getElementById(\''+prf+id+'\').value = \''+value+'\';">⟲</button></tr>'; 
}
function makeselectraw(id, values, def, style){ 
  if (!def) def = 0;
  if (GM_getValue(prf+id+"_saved")) def = GM_getValue(prf+id+"_saved") * 1;
  return '<select style="'+style+'" id="'+prf+id+'">'+ values.map ( function(e, i) { return '<option value="'+i+'"'+(def == i ? " selected" : "")+'>'+e+'</option>'} ) + '</select>'; 
}
function makeselect(caption, id, values, def){ 
  return '<tr><td>'+caption+':</td><td>'+makeselectraw(id,values,def,"width:100%")+'</td></tr>'; 
}



function activateScraper(){ 
  localStorage[prf+"_deactivated"] = "false";
  if (!mainInterface || mainInterface.css("display") == "none") {
    if (!mainInterface) {
      var gui = $(
'<div style="border: none; clear: both" id="'+prf+'gui">'+
'<b>Select the values you want to extract on the site</b><br><hr>' +
'<input id="'+prf+'optioncheckbox" type="checkbox"/> Show options<br>'+
'<table id="'+prf+'optiontable" style="display:none">' + 
makeinput('Included Attributes', "attribs", "id|class|name")+
makeinput('Included Attributes (in loops)', "attribsinloops", "class")+
makeinput('Excluded ids', "idsexcl", ".*[0-9].*|"+prf+".*")+
makeinput('Excluded classes', "classesexcl", ".*(even|odd|select|click|hover|highlight|active|[0-9]|"+prf+").*")+
makeinput('Excluded default tags', "tagsexcl", "tbody")+
makeselect('Include siblings', "siblings", ["always", "if necessary", "never"], 1)+
'</table>'+
'<hr>Final ' + makeselectraw("outputkind", ["template","xpath (case)", "xpath", "css"], 0, "width: auto")+ ":"+
'</div>'
      )
      .append(
        $("<button/>", {
          text: "remote test",
          click: function(){
            var fd = new FormData();
            var extract = $(prfid+"template").val();
            var extractKind = (["template", "xpath", "xpath", "css"])[$(prfid+"outputkind").val()];
            if (extractKind == "css") {
              extract = (extract + "\n").split("\n")[0];
              var varCutOff = /.*:=(.*)/.exec(extract);
              if (varCutOff) extract = varCutOff[1];
            } else if (extractKind == "xpath") {
              var s = extract.split("\n");
              extract = "(";
              for (var i=0;i<s.length;i++) {
                if (s[i].trim() == "") continue;
                if (extract.length != 1) extract += ",\n";
                extract += s[i];
              }
              extract += ")";
            }

            fd.append("raw", "true");
            fd.append("extract", extract);
            fd.append("extract-kind", extractKind);
            var clone = document.body.cloneNode(true);
            removeScraperNodes(clone);
            fd.append("data", "<html><head><title></title></head>"+ //prefix
                              encodeNodeTags(document.body, false)+ //body tag (with existing attributes)
                              clone.innerHTML+"</body></html>");
            fd.append("output-format", "json");
            GM_xmlhttpRequest({
              url: "http://videlibri.sourceforge.net/cgi-bin/xidelcgi",
              data: fd, //automatically sets content-type
              method: "POST",
              onload: function(response){alert(response.responseText)}
              });
          }
        }))
       .append($("<br/>"))
       .append($("<textarea/>", {
         id: prf+'template',
         text: "waiting for selection...",
         style: "height: 15em"
       }))
       .append($("<br/>"))
       .append($("<input/>", {
         type: "checkbox",
         id: prf+"multipagecheckbox",  
         click: toggleMultipageScraping}))
       .append("Multipage template")
       .append($("<button/>", {id: prf + "multipageclearall", text: "clear all", style:"display: none",  click: function(){
         if (!confirm("Are you sure you want to remove all templates below? This action is not reversible.")) return;
         multipageClearAll();
       }}))
       .append($("<div/>", {
         id: prf + "multipage",
         style: "display: none"
         })
           .append($("<table/>", {id: prf + "multipagetable"}))
           .append("Resulting multipage template:")
           .append($("<br/>"))
           .append($("<textarea/>", {id: prf + "multipagetemplate"}))
       )
        
      mainInterface = $("<div/>",{
        style: "position: fixed;" +
               "top: 10px; " +
               "border: 1px solid gray; " +
               "background-color: white; "+ 
               "color: black;" +
               "padding: 2px;"+
               "z-index: 2147483647;"+ //maximal z-index (yes, there are pages close to this value)
               "overflow: auto;"+
               "overflow-x: hidden;"+
               "max-width: 50%;"+
               "max-height: 95%",
        id: prf + "main"
      });
      mainInterface.appendTo("body");
      
         
      
      var harness = $('<div/>', {style:"border:none; max-height: 100%; overflow: auto; background-color: #EEEEEE"}).mousedown(function(e){
        if (e.target != this) return;
        $(prfid + "moveleft").show();
        $(prfid + "moveright").show();
        mainInterface.css("height", "");
        mainInterface.css("width", "");
        if (mainInterface.css("right") != "") {
          mainInterface.css("left", $(document).width() - $(this.parentNode).width() - (/[0-9]+/.exec(mainInterface.css("right"))) + "px"); 
          mainInterface.css("right", "");
        }
        GM_setValue(prf+"guiposition", "free");
        if (changedBody) {
          $(document.body.parentNode).css("left", "0").css("width", "100%");
          changedBody = false;
        }
        //,alert("=>"+localStorage[prf+"guiposition"]);
        dragStart(e,this.parentNode);})
        .append($("<button/>", {
           text: "<<", 
           id: prf + "moveleft",
           style: "border: 1px dashed black; padding: 2px;   cursor: pointer", 
           click: moveLeft }))
        .append($("<button/>", {
           text: ">>", 
           id: prf + "moveright",
           style: "border: 1px dashed black; padding: 2px; cursor: pointer; float: right; display: none", 
           click: moveRight }))
        .append($("<button/>", {
           text: "X", 
           style: "border: 3px double black; cursor: pointer; float: right", 
           click: deactivateScraper }))
           ;
      
      
      mainInterface.append(harness).append(gui);
            
      $("head").append($(
'<style>'+ 
 '.'+prf+ 'templateRead { border: 2px solid #FF00FF !important; display: inline-block; background-color: #FFFFFF; color: #000000}' +      //text-decoration: line-through;  
 '.'+prf+ 'templateRead div { border: none}' +      
 '.'+prf+ 'templateRead input { border: 1px solid gray; color: black; background-color: white}' +      
 '.'+prf+ 'templateRead button { border: 1px solid gray; margin-left: 4px}' +      
 '.'+prf+'read_options_hide {font-size:75%; border: 1px dashed; display: none; width: 100%; padding-right: 7px}'+
 //'.'+prf+'templateRead:hover .'+prf+'read_options_hide{display: table}'+
 '.'+prf+'templateRead .'+prf+'read_options_pre{display: inline; background-color: #FF00FF}'+ 
 //'.'+prf+'templateRead:hover .'+prf+'read_options_pre{display: none}'+ 
 '.'+prf+'read_options {display: inline}'+ 
// '.'+prf+'read_options:hover {display: block}'+ 
 '.'+prf+'read_var {width: 40px}'+
 '.'+prf+'read_source {width: 100%}'+

 '#'+prf+'main {background-color: #FFFFFF; color: #000000}'+
 '#'+prf+'main table {width: 100%}'+
 '#'+prf+'main input {width: 100%; border: 1px solid gray; margin: 0; padding: 2px; color: black; background-color: white} '+
 '#'+prf+'main table button {border: 1px dashed black; padding: 2px;   cursor: pointer}'+
 '#'+prf+'main select {width: 100%; border: 1px solid gray; margin: 0; padding: 2px;}'+
 '#'+prf+'main table td {padding:2px; margin: 0}'+
 '#'+prf+'main textarea {width: 20em; height:10em; resize: both; width: 100%; background-color: #FFFFFF; color: #000000}'+ 


 '.'+prf+ 'templateLoop { border: 2px solid #0000FF !important  ; }' +      
 '.'+prf+ 'templateLoopMatched { border: 2px solid #00FF00 !important; }' +      
 '.'+prf+ 'templateLoopTR { background-color: #6666FF !important; }' +      
 '.'+prf+ 'templateLoopTR td { background-color: #6666FF !important; }' +      
 '.'+prf+ 'templateLoopMatchedTR { background-color: #55FF55 !important; }' +      
 '.'+prf+ 'templateLoopMatchedTR td { background-color: #55FF55 !important; }' +      
 '.'+prf+ 'templateReadRepetition { border: 2px solid yellow }' +


// prfid + "multipagetable textarea {width: 100%}" + 
 'body, html {height: 100%}' + 
/* prfid+'multipagesurrounding { height: 100%; overflow: hidden}' +
 prfid+'multipageinterface { position: absolute; width: 25em; left: 0; top: 0; bottom: 0}' +
 prfid+'multipageframe { position: absolute; left: 25em; top: 0; right: 0; height: 100% }' +
 prfid+'multipageframe iframe {position: absolute; top: 0; left: 0;  width: 99%; height: 99%}' +*/
'</style>'));
      
      $(gui).find("input, select").change(function(){
        GM_setValue(this.id+"_saved", this.value);
        regenerateTemplateQueued();
      });

      $(gui).find("td button").click(regenerateTemplateQueued);
      
       $("table", gui)
       .append($("<tr/>")
         .append($("<td/>")
           .append($("<input>", {type: "checkbox", id: prf+"useLineBreaks", checked: GM_getValue(prf+"useLineBreaks"+"_saved", true), click: function(){
             GM_setValue(this.id + "_saved", this.checked);         
             regenerateTemplateQueued();
             $(prfid+"useIndentationSpan").css("color", this.checked ? "black" : "gray");
           }}))
           .append(" use linebreaks")
         )
         .append($("<td/>")
           .append($("<span/>", {id: prf+"useIndentationSpan", style : "color: " + (GM_getValue(prf+"useLineBreaks"+"_saved", true) ? "black" : "gray")})
             .append($("<input>", {type: "checkbox", id: prf+"useIndentation", checked: GM_getValue(prf+"useIndentation"+"_saved", true), click: function(){
               GM_setValue(this.id + "_saved", this.checked);
               regenerateTemplateQueued();
             }}))
             .append(" use indentation")
           )
         ))
       .append($("<tr/>")
         .append($("<td/>").append($("<button/>", {text: "add selection", click: addSelectionToTemplate})))
       );

      
      var mouseUpActivated = false;
      $(document).mouseup(function(e){
        if (mouseUpActivated) return;
        e.preventDefault();
        e.stopImmediatePropagation();
        mouseUpActivated = true;
        setTimeout(function(){
          mouseUpActivated = false;
          addSelectionToTemplate();
        }, 350);
      });

      $(prfid+"optioncheckbox").click(function(){
        $(prfid+"optiontable").toggle(); 
        GM_setValue("optionTableDisplay", $(prfid+"optiontable").css("display"));
      });
      
      if (!Node.ELEMENT_NODE) Node.ELEMENT_NODE = 1;
      if (!Node.TEXT_NODE) Node.TEXT_NODE = 3;
      
      RegExp.escape = function(text) {
          return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
      } //by Colin Snover

//alert(localStorage[prf+"guiposition"]);
      
      //  $( prfid + "moveleft").click(); works, but then causes an exception :(
      if (interceptor.init_maininterface) interceptor.init_maininterface();
    } else mainInterface.show();
    $(prfid+"activation").hide();

    if (GM_getValue(prf+"guiposition") == "left") moveLeft(); 
    else if (GM_getValue(prf+"guiposition") == "right") moveRight();
    else if (GM_getValue(prf+"guiposition") == "free") {
      $(prfid + "moveright").show();
      var pos = GM_getValue(prf+"guicoordinates");
      if (pos) {
        pos = JSON.parse(pos);
        mainInterface.css("left", pos[0]).css("top", pos[1]);//.width(pos[2]);//.height(pos[3]);
      } else mainInterface.css("right", "10px");
    }
  }
  
  if (interceptor.activated) interceptor.activated();
}

function deactivateScraper(){
  localStorage[prf+"_deactivated"] = true;
  $(prfid+"activation").show();
  mainInterface.hide();
  if (changedBody) {
    $(document.body.parentNode).css("left", "0").css("width", "100%");
    changedBody = false;
  }
  
  if (interceptor.deactivated) interceptor.deactivated();
}

function isMultipageScrapingEnabled(){
  return !($(prfid+"multipage").css("display") == "none");
}

function toggleMultipageScraping(){
  if (!isMultipageScrapingEnabled()) {
    $(prfid+"outputkind").val(0);
    $(prfid+"multipageclearall").show();
    $(prfid+"multipage").css("display", "block");
    GM_setValue("multipageActive", true);
    if (!multipageInitialized) {
      var oldMultipage = GM_getValue("multipageTemplate");
      if (oldMultipage) oldMultipage = JSON.parse(oldMultipage);
      else oldMultipage = [];

      var table = $(prfid+"multipagetable");
      
      table.html("");
      
      table
      .append($("<tr/>")
            .append($("<td/>", {text: "Auto-follow:"}))
            .append($("<td/>").append($("<input/>", {type:"checkbox", checked: GM_getValue("multipageAutoFollow", true), id: prf + "multipageAutoFollow", title: "Automatically follow clicked links or submitted forms, no need to click the follow button", change: function(){ GM_setValue("multipageAutoFollow", $(prfid+"multipageAutoFollow").checked()); } }))))
      .append($("<tr/>")
            .append($("<td/>", {text: "Variables:"}))
            .append($("<td/>", {colspan: 3}).append($("<input/>", {value: GM_getValue("multipageVariables", ""), id: prf + "multipageVariables", title: "Variables defined in the template, in the format a:=1, b:=2, c:=3.", change: regenerateMultipageTemplate}))))
      ;
      
      function toggleNextTR(cb, count){
        if (!count) count = 1;
        var row = cb.parentNode.parentNode;
        var el = row.nextSibling;
        if (el.style.display == "none") {
          for (var i=0;i<count;i++) {
            el.style.display = "table-row";
            el = el.nextSibling;
          }
        } else {
          for (var i=0;i<count;i++) {
            el.style.display = "none";
            el = el.nextSibling;
          }
        }
      }
      
      function createNewPage(page){
        var more = (page.repeat || page.post || page.test);
        table
        .append($("<tr/>",  {})
          .append($("<td/>", {style: "border-top: 1px solid black"})
            .append($("<button/>", {text: "X", click: function(){
              var row = this.parentNode.parentNode;
              var table = row.parentNode;
              if (table.rows.length < 8) { alert("The last sub template cannot be removed."); return;}
              if (!confirm("Are you sure you want to remove the template for url \""+row.getElementsByTagName("input")[0].value+"\"?\nThis action is not reversible.")) return;
              table.removeChild(row.nextSibling);
              table.removeChild(row.nextSibling);
              table.removeChild(row.nextSibling);
              table.removeChild(row);
              regenerateMultipageTemplate();
            }}))
            .append($("<span/>", {text: " URL:"}))
           )
          .append($("<td/>", {style: "border-top: 1px solid black", colspan: 3})
            .append($("<input/>", {value: page.url, change: regenerateMultipageTemplate})))
          .append($("<td/>", {style: "border-top: 1px solid black"})
            .append($("<input/>", {type: "checkbox", checked: more?true:false, change: function(){toggleNextTR(this, 2 + (page.repeat?1:0));}}))
            .append("more")
           )
        ).append($("<tr/>", {style: more?"":"display: none"})
          .append($("<td/>", {text: "Postdata:"}))
          .append($("<td/>", {colspan: 3}).append($("<input/>", {value: page.post, change: regenerateMultipageTemplate})))
        ).append($("<tr/>", {style: more?"":"display: none"})
          .append($("<td/>", {text: "Condition:"}))
          .append($("<td/>", {colspan: 3}).append($("<input/>", {value: page.test, change: regenerateMultipageTemplate})))
          .append($("<td/>", {})
            .append($("<input/>", {type: "checkbox", checked: (page.repeat?true:false), change: function(){page.repeat = !page.repeat; toggleNextTR(this); regenerateMultipageTemplate();}}))
            .append("loop"))
        ).append($("<tr/>", {style: page.repeat?"":"display: none"})
          .append($("<td/>", {text: "For all:"}))
          .append($("<td/>", {}).append($("<input/>", {value: page.loopvar, change: regenerateMultipageTemplate})))
          .append($("<td/>", {text: "in"}))
          .append($("<td/>", {}).append($("<input/>", {value: page.looplist, change: regenerateMultipageTemplate})))
        ).append($("<tr/>")
          .append($("<td/>", {text: "Template:"}))
          .append($("<td/>", {colspan: 4}).append($("<textarea/>", {text: page.template})))
        )
      }
      var curUrl = location.href;
      if (curUrl.indexOf("#") > 0) curUrl = curUrl.substring(0, curUrl.indexOf("#"));
      var oldData = "";
      
      if (GM_getValue("FORM_URL", "") != "" || GM_getValue("FORM_DATA", "") != "") {
        if (GM_getValue("FORM_URL") &&  GM_getValue("FORM_URL").indexOf("$follow") >= 0) GM_setValue(prf + "LAST_FOLLOW_URL", curUrl)
        else GM_setValue(prf + "LAST_FOLLOW_URL", "");
        if (GM_getValue("FORM_URL") != "") curUrl = GM_getValue("FORM_URL");
        if (GM_getValue("FORM_DATA") != "") oldData = GM_getValue("FORM_DATA");
        GM_setValue("FORM_URL", "");
        GM_setValue("FORM_DATA", "");
      }
      oldMultipage.push({url: curUrl, repeat: false, test: "", template: $(prfid+"template").val(), post: oldData});
//alert("??: "+oldMultipage.length);
//alert("??: "+JSON.stringify(oldMultipage));
      /*if (oldMultipage.length >= 2 ) {
        alert(oldMultipage[oldMultipage.length-2].url );
        alert(oldMultipage[oldMultipage.length-1].url );
      }*/
      while (oldMultipage.length >= 2 
            &&
             ( (  oldMultipage[oldMultipage.length-2].url == oldMultipage[oldMultipage.length-1].url 
                 && oldMultipage[oldMultipage.length-2].url.indexOf("$follow") >= 0)
               || (oldMultipage[oldMultipage.length-2].url.indexOf("{$follow") < 0
                   && oldMultipage[oldMultipage.length-1].url == GM_getValue(prf + "LAST_FOLLOW_URL")) ) 
            && (oldMultipage[oldMultipage.length-1].template == "" || oldMultipage[oldMultipage.length-1].template == "waiting for selection..."))
          oldMultipage.pop(); //remove useless duplicates caused by reloads
          
      for (var i = 0; i < oldMultipage.length; i++) 
        createNewPage(oldMultipage[i]);

      multipageInitialized = true;
      regenerateMultipageTemplate();
      
      if (!multipageInterceptionInitialized) {
        multipageInterceptionInitialized = true;
        function getElementValue(e){
          switch (e.tagName) {
            case "INPUT": if (e.getAttribute('type')) switch (e.getAttribute('type').toLowerCase()){
              case "text": case "hidden": case "password":
                return e.value;
              case "checkbox": case "radio":
                return e.checked;
              default: return "";
            }
            case "TEXTAREA": return e.value;
            case "SELECT": return e.options[e.selectedIndex].value;
            default: return "";
          }
        }
        //intercept form
        var inps = [].concat(
          [].slice.call(document.getElementsByTagName("input")),
          [].slice.call(document.getElementsByTagName("textarea")),
          [].slice.call(document.getElementsByTagName("select"))
        );

        for (var i=0;i<inps.length;i++) 
          inps[i].setAttribute(prf+"oldValue", getElementValue(inps[i]));

        $("form").submit(function(){
          if (!GM_getValue("multipageActive", false)) return;
          var an = []; var av = [];
          for (var i=0; i<this.elements.length; i++){          
            var e = this.elements[i];
            var n = e.getAttribute('name');
            var v = getElementValue(e);
            if (!n) continue;
            if (e.getAttribute(prf + "oldValue") == v) continue;
            if (e.tagName == "INPUT" 
                && e.getAttribute('type') 
                && (e.getAttribute('type').toLowerCase() == "radio" || e.getAttribute('type').toLowerCase() == "checkbox") 
                && !e.checked)
              continue;
            n = '"' +n.replace('"', '""', "g")+'"';
            v = '"' +v.replace('"', '""', "g")+'"';
            if (interceptor.formParam) {
              var inter = interceptor.formParam(n, v, e);
              if (inter) { n = inter[0]; v = inter[1]; }
            }
            an.push(n);
            av.push(v);
          };
          var ser = "";
          if (an.length == 0) ser = ".";
          else {
            for (var i=0;i<an.length;i++) {
              if (ser != '') ser += ', ';
              ser += an[i]+ ': '+ av[i];
            }
            ser = 'form(., {' + ser + '})';
          }

          var tempElement = document.createTextNode("x");
          if (this.childNodes.length == 0) this.appendChild(tempElement);
          else this.insertBefore(tempElement, this.childNodes[0]);
          var range = document.createRange();
          range.setStartBefore(tempElement);
          range.setEndAfter(tempElement);             
          addRangeToTemplate(range);
           
          $(this).find(prfclass+"read_var").first().val(multipageNextFollowIndex());
          $(this).find(prfclass+"read_source").first().val(ser);
          tempElement.textContent = "";
          regenerateTemplate();
          GM_setValue("FORM_URL", "{$"+multipageNextFollowIndex()+"}");
        });
        /*
        $("form").submit(function(){
          if (!GM_getValue("multipageActive", false)) return;
          function getParams(form) { //taken from some forum post
            var esc = encodeURIComponent;
                var params = [];
                for (i=0; i<form.elements.length; i++){
                var e = form.elements[i];
                var n = e.getAttribute('name');
                if (!n) continue;
                if (e.tagName == "INPUT"){
                switch (e.getAttribute('type').toLowerCase()){
                case "text": case "hidden": case "password":
                params.push(n + "=" + esc(e.value));
                break;
                case "checkbox":
                if (e.checked) { params.push(n + "=" + esc(e.value)); }
                //else { params.push(n + "="); } failed with stbdue
                break;
                case "radio":
                if (e.checked) { params.push(n + "=" + esc(e.value)); }
                break;
                }
                }
                if (e.tagName == "TEXTAREA"){
                params.push(n + "=" + esc(e.value));
                }
                if (e.tagName == "SELECT"){
                params.push(n + "=" + esc(e.options[e.selectedIndex].value));
                }
                }
                return params.join('&');
          }      
          
          var url = this.action;
          if (url == "") url = location.href;
          var data = getParams(this);
          if (this.method == "GET") {
            if (url.indexOf("?") > 0) url += "&";
            else url += "?";
            url += data;
            data = "";
          }
          GM_setValue("FORM_URL", url);
          GM_setValue("FORM_DATA", data);
        });*/
        
        
        //intercept links
        setTimeout(function(){
          var as = document.getElementsByTagName("a");
          for (var i=as.length-1;i>=0;i--) {
            var newA = document.createElement("a");            
            //newA.innerHTML = as[i].innerHTML;
            if (as[i].textContent != "")
              newA.textContent = as[i].textContent; //if there are child elements (like in <a><span>x</></a>) the read expression binds to them instead the link.
            as[i].style.display = "none";
            newA.href = "javascript:;"; //when changing here, update followLink
            newA.className = as[i].className;
            newA.setAttribute(prf + "interceptionInsertion", "true");
            newA.addEventListener("click", (function(oldA){return function(){
              if (!isMultipageScrapingEnabled()) {
                oldA.click();
                return;
              }
              //alert("clicked on:" + oldA.textContent);
              var range = document.createRange();
              range.setStartBefore( oldA.previousSibling);
              range.setEndAfter(oldA.previousSibling);             
              setTimeout(function(){
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);            
                setTimeout(function(){
  //                $(oldA.previousSibling).find(prfclass+"btnloop").hide();
                  $(oldA.previousSibling).find(prfclass+"btnfollow").click();
                }, 300);
              }, 200);
              return false;
            }})(as[i]));
            as[i].parentNode.insertBefore(newA, as[i]);
            
          }
        }, 300);      
      }
    }
    
  } else {
    $(prfid+"multipage").css("display", "none");
    $(prfid+"multipageclearall").hide();
    GM_setValue("multipageActive", false);
  }
  document.getElementById(prf+"multipagecheckbox").checked = GM_getValue("multipageActive", false);
}

function multipageClearAll(){
  GM_setValue("multipageTemplate", "[]");
  GM_setValue("multipageVariables", "");
  $(prfid+"multipage").css("display", "none");
  multipageInitialized = false;
  toggleMultipageScraping();
}

function enableMultipage(){
  GM_setValue("multipageActive", true);
  if (isMultipageScrapingEnabled() && document.getElementById(prf+"multipagecheckbox").checked) return;
  $(prfid+"multipage").css("display", "none");
  toggleMultipageScraping();
}


function regenerateMultipageTemplate(){
  var pages = [];
  var tds = $(prfid+"multipagetable tr td");
  for (var i=4; i < tds.length; i+=14) {
    pages.push({
      url:      tds[i+ 1].getElementsByTagName("input")[0].value,
      post:     tds[i+ 4].getElementsByTagName("input")[0].value,
      test:     tds[i+ 6].getElementsByTagName("input")[0].value,
      repeat:   tds[i+ 7].getElementsByTagName("input")[0].checked,
      loopvar:  tds[i+ 9].getElementsByTagName("input")[0].value,
      looplist: tds[i+11].getElementsByTagName("input")[0].value,
      template: tds[i+13].getElementsByTagName("textarea")[0].value
    });
  }


  if (pages.length == 0) pages = JSON.parse(GM_getValue("multipageTemplate", JSON.stringify(pages)));
  else GM_setValue("multipageTemplate", JSON.stringify(pages));

  var vars = $(prfid+"multipageVariables"); //what was this for?
  if (vars.length == 0) vars = GM_getValue("multipageVariables", "");
  else {
    vars = vars.val();
    GM_setValue("multipageVariables", vars);
  }
  
  var res = "<action>\n";  
  var followedVars = "";
  for (var i=0;i < pages.length; i++){ //initialize follow vars, so optional elements abort the following
    var m = /[{][$](.*)[}]/.exec(pages[i].url); 
    if (m) 
      if (followedVars) followedVars += ", " + m[1] + " := ()";
      else followedVars = m[1] + " := ()";
 
  }
  if (followedVars) res += "  <s>" + followedVars + "</s>\n";
  if (vars != "") {
    res += '  <page><template>{' + vars + '}</template></page>\n\n';
  }
  for (var i=0;i < pages.length; i++){
    if (pages[i].repeat)
      res += ' <loop '+encodeXMLAttributes({
        "var": pages[i].loopvar != "" ? pages[i].loopvar : null,
        list: pages[i].looplist != "" ? pages[i].looplist : null,
        test: pages[i].test != "" ? pages[i].test : null
      }) + '>\n';
    res += '  <page '+encodeXMLAttributes({
      url: pages[i].url, 
      test: !pages[i].repeat && pages[i].test != "" ? pages[i].test : null
    })+'>\n';
    if (pages[i].post != "") 
      res += "    <post>"+encodeXMLAttribute(pages[i].post)+"</post>\n";
    if (pages[i].template != "" && pages[i].template.trim() != "waiting for selection...") {
      res += "    <template>\n" + pages[i].template + "\n    </template>\n";
    }
    res += "  </page>\n";
    if (pages[i].repeat)
      res += " </loop>\n";
    res += "\n";
  }
  res += "</action>";
  $(prfid+"multipagetemplate").val(res);
}

function multipageNextFollowIndex(){
  var pages = JSON.parse(GM_getValue("multipageTemplate", JSON.stringify(pages)));
  if (!pages || !pages.length) return "follow1";
  var m = /[{][$]_?follow([0-9]+)/.exec(pages[pages.length-1].url);
  if (!m) return "follow1";
  return "follow" + (m[1]*1+1); 
}

function myCreate(name, properties){ //basically the same as $(name, properties).get(), but latter can't be passed to surroundContents
  var result = document.createElement(name);
  if (properties) for (var p in properties) result.setAttribute(p, properties[p]);
  return result;
}

function enumerate(context, callback){  //like $("*", context).each(callback), but latter didn't work for the DocumentFragments of Range.extractContents
  var kids = context.childNodes;
  for (var i=0;i<kids.length;i++) enumerate(kids[i], callback);
  callback(context);
}

/*function childNodeLength(el){
  var r = el.childNodes.length;
  console.log(el.childNodes[1]);
  alert(">"+el.childNodes[el.childNodes.length-1].nodeValue+"<");
  for (var i=0;i<el.childNodes.length && el.childNodes[i].nodeType == Node.TEXT_NODE && el.childNodes[i].nodeValue == "";i++)  r -= 1;
  for (var i=el.childNodes.length-1;i>=0 && el.childNodes[i].nodeType == Node.TEXT_NODE && el.childNodes[i].nodeValue == "";i--)  r -= 1;  
  if (r <= 0) return 0;
  return r;
}*/

function indexOfNode(nl, e) {  //overriding NodeList.indexOf didn't work, perhaps due to GreaseMonkey security
  for (var i=0;i<nl.length;i++) if (nl[i] == e) return i; 
  return -1; 
} 

function removeWhileEmptyTextNode(e){ 
  if (!e) return;
  var p = e.parentNode;
  var i = indexOfNode(p.childNodes, e);
  var c = 0;
  while (i>=0 && p.childNodes[i].nodeType == Node.TEXT_NODE && p.childNodes[i].nodeValue == "") {
    p.removeChild(p.childNodes[i]);
    if (i >= p.childNodes.length) i-=1;
    c+=1;
  }
  return c;    
}

function removeEmptyTextNodesChildNodes(e){
  if (e.childNodes.length == 0) return;
  removeWhileEmptyTextNode(e.childNodes[0]);
  if (e.childNodes.length == 0) return;
  removeWhileEmptyTextNode(e.childNodes[e.childNodes.length-1]);
}

function removeNodeButKeepChildren(n, local){
  if (!n) return;
  if (!n.parentNode) return;
  var cn = n.childNodes;
  var p = n.parentNode;
  while (cn.length > 0){
    if (cn[0].classList && cn[0].classList.contains(prf+"read_options"))  {
      n.removeChild(cn[0]);
     } else
      p.insertBefore(cn[0], n);
  }
  var nid = $(n).attr("id");
  p.removeChild(n);
  if (local) return;

  if (n == window.searchingRepetition) window.searchingRepetition = null;
  if ($(n).data(prf+"repetition")) {
    removeNodeButKeepChildren(document.getElementById($(n).data(prf+"repetition")));
    if (!n.classList.contains(prf+"templateReadRepetition")){
      //n = from element (see addRepetition)
      $("."+prf+"templateLoopMarkedFrom"+nid)
        .removeClass(prf+"templateLoopMarkedFrom"+nid)
        .each(function(){
          if (this.className.indexOf(prf+"templateLoopMarkedFrom") < 0) {
            $(this).removeClass(prf+"templateLoop");  //remove loop marker, if no children are there to loop over
            $(this).removeClass(prf+"templateLoopMatched");
            $(this).removeClass(prf+"templateLoopTR");  
            $(this).removeClass(prf+"templateLoopMatchedTR"); 
          }
        })
    }
  }
  
}

function removeScraperNodes(n, local) {
  if (n.classList && n.classList.contains("__scraper_templateRead")) {
    removeNodeButKeepChildren(n, local);
    return;    
  }
  if (n.id == "__scraper_main" || n.id == "__scraper_activation" ) {
    n.parentNode.removeChild(n);
    return;
  }
  if (!n.childNodes) return;
  var kids = n.childNodes;
  for (var i=kids.length-1;i>=0;i--)
    removeScraperNodes(kids[i], local);
}

function nextNode(e){
  if (!e) return null;
  if (e.nextSibling) return e.nextSibling;
  return nextNode(e.parentNode);
}
function previousNode(e){
  if (!e) return null;
  if (e.previousSibling) return e.previousSibling;
  return previousNode(e.parentNode);
}


function addSelectionToTemplate(){
  if (!mainInterface || mainInterface.css("display") == "none") return;
  if (!Node.TEXT_NODE) alert("initialization failed");
  
  var s = window.getSelection();
  
  /*if (( s.anchorNode.classList && s.anchorNode.classList.contains(prf+"templateRead") &&
         s.focusNode.classList && s.focusNode.classList.contains(prf+"templateRead")) || $(s.anchorNode).add(s.focusNode).parents("."+prf+"templateRead, "+prfid+"main").length != 0) return;*/

  if ($(s.anchorNode).add(s.focusNode).parents(prfid+"main").length != 0) return; 
  if ($(s.anchorNode).add(s.focusNode).parents("."+prf+"read_options").length != 0) return; 

  var r = s.getRangeAt(0);
  addRangeToTemplate(r, s);
}
  
function addRangeToTemplate(range, selection){
  var r = range;
  var s = selection;
  if (!r) return;
  
  var start = r.startContainer, end = r.endContainer, startOffset = r.startOffset, endOffset = r.endOffset;

  var changed = false;
  if (start.classList && start.classList.contains(prf+"templateRead")) {
    var temp = start.parentNode;
    removeNodeButKeepChildren(start);
    start = temp;
    changed = true;
  }
  if (end.classList  && end.classList.contains(prf+"templateRead")) {
    var temp = end.parentNode;
    removeNodeButKeepChildren(end);
    end = temp;
    changed = true;
  }
  if (s)
    $(s.anchorNode).add(s.focusNode).parents("."+prf+"templateRead").each(
      function(i,n){removeNodeButKeepChildren(n); changed=true; }
    );
    
  
  if (start == end && endOffset <= startOffset) { if (changed) regenerateTemplateQueued(); return; }
  
//  alert(start+" "+end+" "+startOffset + " "+endOffset)
  //reimplementation of surroundContents, except the inserted element is moved down as far as possible in the hierarchie
  
  //remove useless (text) nodes
  while ((start.nodeType == Node.TEXT_NODE && start.nodeValue.substring(startOffset).trim() == "")
         || (start.nodeType == Node.ELEMENT_NODE && start.childNodes.length <= startOffset)) {
    startOffset = indexOfNode(start.parentNode.childNodes,start) + 1;
    start = start.parentNode;
    if (start == end && endOffset <= startOffset) return;
  }
  while (endOffset == 0 || (end.nodeType == Node.TEXT_NODE && end.nodeValue.substring(0,endOffset).trim() == "")) {
    endOffset = indexOfNode(end.parentNode.childNodes,end);
    end = end.parentNode;
    if (start == end && endOffset <= startOffset) { if (changed) regenerateTemplateQueued(); return;}
  }
  
  //find common ancestor
  var common;
  var a = start, b = end, ai = startOffset, bi = endOffset;

  if (a == b) common = a;
  else {
    var aparents = new Array(); var bparents = new Array();
    var aindices = new Array(); var bindices = new Array();

    aparents.push(a); aindices.push(ai);
    bparents.push(b); bindices.push(bi);
    while (a != b) {
      if (a != null) {
        ai = indexOfNode(a.parentNode.childNodes, a);
        if (bparents.indexOf(a.parentNode) >= 0) { common = a.parentNode; bi = bindices[bparents.indexOf(common)]; break; }
        a = a.parentNode;
      }
      if (b != null){
        bi = indexOfNode(b.parentNode.childNodes, b) + 1;
        if (aparents.indexOf(b.parentNode) >= 0) { common = b.parentNode; ai = aindices[aparents.indexOf(common)]; break; }
        b = b.parentNode;
      }
      aparents.push(a); aindices.push(ai);
      bparents.push(b); bindices.push(bi);
    }
    if (a == b)  
      common = a;
  }
  
  if (!common) alert("failed to find common parent");
  if (ai >= bi) { if (changed) regenerateTemplateQueued(); return; }
  
  var templateRead;
  if (common.nodeType != Node.TEXT_NODE) {
    bi -= removeWhileEmptyTextNode(common.childNodes[ai]);
    bi -= removeWhileEmptyTextNode(common.childNodes[bi-1]);
    if (ai >= bi) { if (changed) regenerateTemplateQueued(); return;}
    
    while (ai + 1 == bi) {
      if (common.childNodes[ai].classList && common.childNodes[ai].classList.contains(prf+"templateRead")) {
        bi = ai + common.childNodes[ai].childNodes.length;
        removeNodeButKeepChildren(common.childNodes[ai]);
        changed = true;
      } else {
        if (common.childNodes[ai].nodeType == Node.TEXT_NODE) break;
        common = common.childNodes[ai];
        ai = 0;
        bi = common.childNodes.length;
      }
      bi -= removeWhileEmptyTextNode(common.childNodes[ai]);
      bi -= removeWhileEmptyTextNode(common.childNodes[bi-1]);
      if (ai >= bi) { if (changed) regenerateTemplateQueued(); return;}
    }

    //if (bi + 1 <= common.childNodes.length)// && common.childNodes[bi].nodeType == Node.TEXT_NODE) 
    //  bi++; //prevent inclusion of the next element in the read tag, but still allow partial text inclusion (todo: check if this is correct)

    for (var i=bi-1; i >= ai; i--) 
      enumerate(common.childNodes[i], function(n){ 
        if (n.classList && n.classList.contains(prf+"templateRead")) 
          removeNodeButKeepChildren(n);           
      })
    templateRead = myCreate("div", {"class": prf + "templateRead"});
    common.insertBefore(templateRead, common.childNodes[ai]);
    for (var i=ai;i<bi;i++)
      templateRead.appendChild(common.childNodes[ai+1]);

  //alert(a+" "+b+" "+ai + " "+bi)
    //split text nodes
    if (start.nodeType == Node.TEXT_NODE && startOffset != 0)  {
      var prefix = start.nodeValue.substring(0,startOffset);
      start.textContent = start.nodeValue.substring(startOffset);
      templateRead.parentNode.insertBefore(document.createTextNode(prefix), templateRead);
    }

    if (end.nodeType == Node.TEXT_NODE && endOffset < end.nodeValue.length)  {
      var suffix = end.nodeValue.substring(endOffset);
      end.textContent = end.nodeValue.substring(0,endOffset);
      if (templateRead.parentNode.lastChild == templateRead)
        templateRead.parentNode.appendChild(document.createTextNode(suffix));
      else {
        templateRead.parentNode.insertBefore(document.createTextNode(suffix), templateRead.nextSibling);
      }
    }
    
    //get rid of duplicated text nodes
    enumerate(templateRead.parentNode, function(n){
      for (var i=n.childNodes.length-1;i>0;i--)
        if (n.childNodes[i].nodeType == Node.TEXT_NODE && n.childNodes[i - 1].nodeType == Node.TEXT_NODE) {
          n.childNodes[i-1].nodeValue = n.childNodes[i-1].nodeValue + n.childNodes[i].nodeValue;
          n.childNodes[i].parentNode.removeChild(n.childNodes[i]);
        }
    });
  } else {
    var prefix = common.nodeValue.substring(0,ai);
    var s = common.nodeValue.substring(ai, bi);
    templateRead = myCreate("div", {"class": prf + "templateRead"});
    templateRead.textContent = s;
    var suffix = common.nodeValue.substring(bi);

    common.parentNode.insertBefore(document.createTextNode(prefix), common);
    common.parentNode.insertBefore(templateRead, common);
    common.textContent = suffix;
  }
  
  if (templateRead) {
    enumerate(templateRead.parentNode, function(n){
      removeEmptyTextNodesChildNodes(n);
    });
    
    if (!window.runningId) window.runningId = 0;
    window.runningId += 1;
    templateRead.id = prf + "templateRead"+ window.runningId;
   

    var value = "";
 
    //same vars as in regenerateTemplate
    var cur = templateRead.parentNode;
    var kids = cur.childNodes;
    var tagsexcl = new RegExp("^("+$(prfid + "tagsexcl").val()+")$", "i");
    var ignoreTag = !cur.hasAttributes() && tagsexcl.test(cur.nodeName);       //auto created elements don't have attributes
    var i = indexOfNode(kids, templateRead);
    
    if (!ignoreTag && kids.length == 1) value = ".";
    else if (ignoreTag && cur.parentNode.childNodes.length == 1) value = ".";
    else if (kids[i].childNodes.length == 1 && kids[i].childNodes[0].nodeType == Node.TEXT_NODE) {
      //only read text
      var prefix = (i == 0 || kids[i-1].nodeType != Node.TEXT_NODE) ? "" : (kids[i-1].nodeValue.trimLeft());
      var suffix = (i == kids.length - 1 || kids[i+1].nodeType != Node.TEXT_NODE) ? "" : (kids[i+1].nodeValue).trimRight();
      value = "text()";
      if (prefix != "") value = "substring-after(" + value +  ", '" + prefix + "')";
      if (suffix != "") value = "substring-before(" + value +  ", '" + suffix + "')";
    } else {
      value = ".";
    }   
     
    function spanner(n){ return $("<span/>", {style: "display: table-cell"}).append(n); }
    function maketinyedit(c, info, clicky){if (!clicky) clicky = regenerateTemplateQueued; return $("<input/>", {class: c, title: info, /*change: clicky,*/ keyup: clicky, click: function(e){e.preventDefault(); this.focus();}   });};
    function maketinybutton(c, info, clicky){ return $("<button/>", {class: c, text: info, click: clicky  });}; 
       
       
    function varnameChanged(){
      var p = $(this).parents("."+prf+"templateRead");
      var value = p.find("."+prf+"read_var").val();
      p.find(prfclass+"btnfollow").text( value.indexOf("follow") >= 0 ? "follow link" : "mark link");
            
      if (p.find("."+prf+"read_optional").is(':checked')) value += "?";
      p.find("."+prf+"read_options_pre").text(value);
      regenerateTemplateQueued();
    }
    
    function followLink(e){
      var t = this;
      var p = $(this).parents("."+prf+"templateRead");
     // p.find("."+prf+"read_optional").prop("checked", true); ??
     
      e.stopImmediatePropagation();
      e.preventDefault();

      if (p.find("."+prf+"read_var").val().indexOf("follow") >= 0) {
        var link = p.parent(); 
        if (multipageInitialized && link.attr("href") == "javascript:;") 
          link = link.next();
        setTimeout(function(){ GM_setValue("FORM_URL", "{$"+multipageNextFollowIndex()+"}"); link[0].click(); }, 100);
      } else {
        p.find("."+prf+"read_var").val(multipageInitialized ? multipageNextFollowIndex()  : "_follow");
        p.find("."+prf+"read_source").val("@href");
        varnameChanged.call(this);        
        if (multipageInitialized && $(prfid + "multipageAutoFollow").is(':checked')) {
          regenerateTemplate();
          if (interceptor.allowAutoFollow && interceptor.allowAutoFollow())
            setTimeout(function(){t.click();}, 200); //after regen
        } 
      }
    }
    
    function readRepetitions(e,p){
      if (p.data(prf+"repetition")) 
        removeNodeButKeepChildren(document.getElementById(p.data(prf+"repetition")));
      
      p.find("."+prf+"btnloop").text("select next occurence");
      window.searchingRepetition = p;
      if (e) e.preventDefault();
    }
    
    function addRepetition(from, to){
      //assert  window.searchingRepetition == from
      window.searchingRepetition = null;

      to.addClass(prf+"templateReadRepetition")
      from.data(prf+"repetition", to.attr("id"));
            
      //alert(from.get()  + " "+to.get());                                                                                   works (=> [object XrayWrapper [object HTMLDivElement]] [object XrayWrapper [object HTMLDivElement]])
      //alert(from.get().parentNode  + " "+to.get().parentNode);                                                             does not work (=> undefined undefined)
      //alert(document.getElementById(from.attr("id")).parentNode  + " "+document.getElementById(to.attr("id")).parentNode); works (=> [object XrayWrapper [object HTMLTableCellElement]] [object XrayWrapper [object HTMLTableCellElement]])
      
      
      var highestMatchFrom = document.getElementById(from.attr("id")).parentNode;
      var highestMatchTo =   document.getElementById(to.attr("id")).parentNode;
      
      if (highestMatchFrom == highestMatchTo) {
        alert("Repetitions need to be in different html tags");
        readRepetitions(null,from);
        return;
      }
      
      if (!fitElements(highestMatchFrom, highestMatchTo, true)) {
        alert("Failed to match parents: "+encodeNodeTags(highestMatchFrom, true) +" vs. "+encodeNodeTags(highestMatchTo, true)+"\nMake sure to select both occurences in the same way, and add mismatching attributes to the ignore lists.");
        readRepetitions(null,from);
        return;
      }
      
      var matchFromPseudoTemplate = [{nodeName: highestMatchFrom.nodeName, attributes: filterNodeAttributes(highestMatchFrom, true)}];
      
      while (highestMatchFrom.parentNode != highestMatchTo.parentNode && fitElements(highestMatchFrom.parentNode, highestMatchTo.parentNode, true)){
        highestMatchFrom = highestMatchFrom.parentNode;
        highestMatchTo = highestMatchTo.parentNode;
        matchFromPseudoTemplate.push({nodeName: highestMatchFrom.nodeName, attributes: filterNodeAttributes(highestMatchFrom, true)});
      }
      
      if ($(highestMatchFrom.parentNode).find("#"+to.attr("id")).length == 0){
        alert("Highest common parent: "+encodeNodeTags(highestMatchFrom, false)+ " doesn't contain the marked repetition.\nFailed matching: "+encodeNodeTags(highestMatchFrom.parentNode, true)+ " vs. "+encodeNodeTags(highestMatchTo.parentNode, true) );
        readRepetitions(null, from);
        return;
      }
        
      
      
      from.find("."+prf+"btnloop").text("read repetitions");
      to.data(prf+"repetition", from.attr("id"));
      
      $(highestMatchFrom).addClass(prf+"templateLoop").addClass(prf+"templateLoopMarkedFrom"+from.attr("id"));
      if (highestMatchFrom.nodeName == "TR") $(highestMatchFrom).addClass(prf+"templateLoopTR");
      
      var siblings = highestMatchFrom.parentNode.childNodes;
      var selfFound = false;
      for (var i=0;i<siblings.length;i++)
        if (selfFound) {
          if (canMatchPseudoTemplate(matchFromPseudoTemplate, matchFromPseudoTemplate.length, siblings[i])) {
            $(siblings[i]).addClass(prf+"templateLoopMatched").addClass(prf+"templateLoopMarkedFrom"+from.attr("id"));
            if (siblings[i].nodeName == "TR")
              $(siblings[i]).addClass(prf+"templateLoopMatchedTR");            
              
          }
        } else if (siblings[i] == highestMatchFrom) selfFound = true;
      
      regenerateTemplateQueued();
      //from.css("border", "2px solid blue");
    }
   
    if ($(templateRead).width() < 90) width = "40px";
    else width = "100%";

    $('<span/>', {
      text: "",
      class: prf+"read_options_pre"
    }).add(
      window.searchingRepetition ?  ( $("<span/>", {text: "repetition", style: "background-color: yellow"}) )
      :
      (($('<div/>', {
          text: "",
          class: prf+"read_options_hide"
         })).append(
           $("<div/>", {style: "display: table"})
           .append(
             $("<div/>", {style: "display: table-row"})
               .append(spanner(maketinyedit(prf+"read_var", "Variable name", varnameChanged)))
               .append(spanner().text(":="))
               .append(spanner(maketinyedit(prf+"read_source", "Value to read (e.g. text() or   @href))").val(value).css("width", width)).css("width", width).css("padding-right", "10px"))
           ).add($("<div/>", {})
             .append(maketinybutton(prf+"btnkill", "X", function(e){var readTag = this.parentNode.parentNode.parentNode.parentNode; removeNodeButKeepChildren(readTag); regenerateTemplateQueued(); e.preventDefault(); return false;}))
            // .append("<br/>")
             .append(cur.nodeName == "A" ? maketinybutton(prf+"btnfollow", "mark link", followLink) : "")
             .append(maketinybutton(prf+"btnloop", "read repetitions", function(e){readRepetitions(e,$(this).parents("."+prf+"templateRead")); return false;}))
             .append($("<input/>", {type: "checkbox", class: prf+"read_optional", change: varnameChanged, click: function(e){ e.preventDefault(); var t = this; var tc = this.checked; setTimeout(function(){ t.checked = tc; varnameChanged.call(t); /* returning resets the checked value to the old value. */ }, 200); return false;}}))
             .append("optional")
             .append($("<input/>", {type: "checkbox", class: prf+"read_match_children", change: varnameChanged, click: function(e){ e.preventDefault(); var t = this; var tc = this.checked; setTimeout(function(){ t.checked = tc; varnameChanged.call(t); /* returning resets the checked value to the old value. */ }, 200); return false;}}))
             .append("match children")
           )
       )) 
    ).appendTo($("<div class='"+prf+"read_options'/>").appendTo($(templateRead)));
    
    
    var v = false;
    function changeVisibility(){
      if (v) {
        $(templateRead).find("."+prf+"read_options_pre").hide(0);
        $(templateRead).find("."+prf+"read_options_hide").show(0);
      } else {
        $(templateRead).find("."+prf+"read_options_pre").show(0);
        $(templateRead).find("."+prf+"read_options_hide").hide(0);
      }
    }
    $(templateRead).hover(function(){v = true; changeVisibility()}, function(){v = false; setTimeout(changeVisibility, 250);});
    
    if (interceptor.newTemplateRead) interceptor.newTemplateRead(templateRead); 
  }
  
  if (window.searchingRepetition) 
    addRepetition(window.searchingRepetition, $(templateRead));
  /*
  var cur = ex;
  removeEmptyTextNodesChildNodes(cur);
  while (cur.childNodes.length == 1) {
    cur = cur.firstChild;
    removeEmptyTextNodesChildNodes(cur);
  }
  var templateRead = null;
  if (cur == ex) {
    cur = myCreate("div", {"class": prf + "templateRead"});
    cur.appendChild(ex);
    templateRead = cur;
    alert("1");    
  } else {
    templateRead = myCreate("div", {"class": prf + "templateRead"});
    cur.parentNode.replaceChild(templateRead, cur);
    alert(cur.parentNode);
    templateRead.appendChild(cur);
    alert(cur.parentNode == templateRead);
    alert(cur);
    alert(cur.innerHTML);
    cur = ex;
    for (var i=0;i<cur.childNodes.length;i++)
      alert(cur.childNodes[i]+": "+	cur.childNodes[i].innerHTML)
    return;
  }
  
//  alert( $("."+prf+"templateRead", $(ex.childNodes)).length);
//alert( $("."+prf+"templateRead", $(ex)).length);
  r.insertNode(cur); //surroundContents(myCreate("span", {"class": prf + "templateRead"}));
//  if (templateRead.parentNode) removeEmptyTextNodesChildNodes(templateRead.parentNode);
//  if (templateRead.parentNode.parentNode) removeEmptyTextNodesChildNodes(templateRead.parentNode.parentNode);
  */
  regenerateTemplateQueued();
  if (selection)
   window.getSelection().collapseToStart(); //or use selection? ?
}

function updateRegexps(){
  window.attribs = new RegExp("^("+$(prfid + "attribs").val()+")$", "i");
  window.attribsinloops = new RegExp("^("+$(prfid + "attribsinloops").val()+")$", "i");
  window.tagsexcl = new RegExp("^("+$(prfid + "tagsexcl").val()+")$", "i");
  window.idsexcl = new RegExp("^("+$(prfid + "idsexcl").val()+")$", "i");
  window.classesexcl = new RegExp("^("+$(prfid + "classesexcl").val()+")$", "i");
  window.siblingsinclmode = $(prfid+"siblings").val();
}

function filterNodeAttributes(node, inloop){
  var res = {};
  var a = node.attributes;
  if (a)
    for (var i=0;i<node.attributes.length;i++)
      if ((inloop ? attribsinloops : attribs).test(a[i].name)) 
        if (a[i].name == "id") {
          if (!idsexcl.test(a[i].value)) 
            res[a[i].name] = a[i].value;
        } else if (a[i].name == "class") {
          var cl = new Array();
          for (var j=0;j<node.classList.length;j++)
            if (!classesexcl.test(node.classList[j])) cl.push(node.classList[j]);
          if (cl.length > 0) res["class"] = cl;
        } else res[a[i].name] = a[i].value;
    //if (node.attributes[i].name)
  return res;
}

function objHasProperties(obj){
  for (var i in obj) return true;
  return false;
}

function fitElements(t, h, inloop){ //template vs. html element
  if (t.nodeName != h.nodeName) return false;
  return fitElementTemplate(t.nodeName, filterNodeAttributes(t, inloop), h);
}

function fitElementTemplate(tn, att, h){ //template node name, template attributes vs. html element
//alert("fit: "+encodeNodeTags(t)+" => "+encodeNodeTags(h));
  if (tn != h.nodeName) return false;
  
  for (var a in att) 
    if (a != "class") {
      if (!h.attributes[a] || att[a] != h.attributes[a].value) return false;
    } else {
      var expectedClasses = att[a];
      if (expectedClasses.length == 0) continue;
      if (!h.classList) return false;
      for (var i=0;i<expectedClasses.length;i++)
        if (!h.classList.contains(expectedClasses[i])) 
          return false;
    }

  return true;
}

var TemplateShortRead = 1;
var TemplateLoop = 2;
var TemplateMatchNode = 3;
var TemplateMatchText = 4; 

//(simplified) template matching
function canMatchPseudoTemplate(templateNodes, templateNodeLength, tocheck){
  //TODO: optimize (e.g. gather all that match last, gather all that match last-1 and have parents in the 1st set,...). Matching again to all children is crazy
  var last = templateNodes[templateNodeLength-1];
  var kids = tocheck.childNodes;
  if (fitElementTemplate(last.nodeName, last.attributes, tocheck)) {
    if (templateNodeLength == 1) return true;
    for (var i=0;i<kids.length;i++)
      if (canMatchPseudoTemplate(templateNodes, templateNodeLength-1, kids[i]))
        return true; 
  }
  //alert(templateNodes+" "+templateNodeLength+" "+tocheck+ " "+tocheck.textContent);
  for (var i=0;i<kids.length;i++)
    if (canMatchPseudoTemplate(templateNodes, templateNodeLength, kids[i]))
      return true; 
  return false;
}

function findTemplateMatchingNodes(template, start) {
  //find all self-or-descendants::* matching template (ignoring children)
  var firstLevelMatches = new Array;
  function recElement(node){
    if (fitElementTemplate(template.value, template.attributes, node)) firstLevelMatches.push(node);
    var kids = node.childNodes;
    for (var i=0;i<kids.length;i++)
      recElement(kids[i]);
  }
  function recText(node){
    if (node.nodeType == Node.TEXT_NODE) {
      if (node.nodeValue.trim() == template.value)
        firstLevelMatches.push(node);
    } else {
      var kids = node.childNodes;
      for (var i=0;i<kids.length;i++)
        recText(kids[i]);
    }
  }
  
  if (template.kind == TemplateMatchNode) recElement(start);
  else if (template.kind == TemplateMatchText) recText(start);
  else return [];
  
  if (!template.children || template.children.length == 0) return firstLevelMatches;
  
  
  //find all matches for all children
  var kidsMatches = new Array();
  
  for (var i = 0; i < template.children.length; i++) {
    var doMatch = ((!template.children[i].templateAttributes || !template.children[i].templateAttributes.optional) 
               && (template.children[i].kind == TemplateMatchText || template.children[i].kind == TemplateMatchNode));
    if (!doMatch) 
      kidsMatches.push(null);
    else {
      kidsMatches.push(findTemplateMatchingNodes(template.children[i], start)); //This is only called once for every template element 
      if (kidsMatches[kidsMatches.length-1].length == 0) return [];
    }
  }
  
  firstLevelMatches.filter(function(node){
    var okay = true;
    var laterKids = new Array();
    for (var i = 0; i < node.children.length; i++)
      if (kidsMatches[i] != null) {
        var newMatches = kidsMatches[i].filter(function(n){ return n != node && node.compareDocumentPosition(n) & 16 == 16; });
        if (newMatches.length == 0) return false;
        laterKids.push(newMatches);
      }
    for (var i = laterKids.length-1; i>=0; i--) 
      for (var j = laterKids.length-1; j>i; j--) {
        while ((laterKids[i][laterKids[i].length-1].compareDocumentPosition(laterKids[j][laterKids[j].length-1]) & 4) != 4) { //UNLESS laterKids[i].last < laterKids[j].last  
          laterKids[i].pop();
          if (laterKids[i].length == 0) return false;
        }
      }
   return true;
  });
  
  return firstLevelMatches;
}

function encodeXMLAttribute(s) {
  if (s instanceof Array) s = s.join(" ");
  return s.replace( /&/g, '&amp;').replace( /"/g, '&quot;').replace( /</g, '&lt;');
}
function encodeXMLAttributes(o) {
  var res = "";
  for (var i in o) {
    if (o[i] == null) continue;
    if (res != "") res += " ";
    res += i + "=\"" + encodeXMLAttribute(o[i]) + "\"";
  }
  return res;
}

function encodeNodeTags(node, close, inloop){
  if (!node) return "??";
  var res = "<" + node.nodeName;
  var attr = filterNodeAttributes(node, inloop);
  if (attr)
    for (var i in attr)
      if (i != "class") res += " " + i + "=\""+encodeXMLAttribute(attr[i])+"\"";
      else res += " " + i + "=\""+encodeXMLAttribute(attr[i].join(" "))+"\"";
  if (close) res += "/>\n";
  else res += ">";
  return res;
}

/*function fitElements(n1, n2){
  if (n1.nodeName != n2.nodeName) return false;
  var a1 = filterNodeAttributes(n1);
  var a2 = filterNodeAttributes(n2);
  function cmp(b1, b2) {
    for (var a in b1) 
      if (a != "class") {
        if (b1[a] != b2[a]) return false;
      } else {
        if (b1[a].split(" ").sort().join(" ") != 
            b2[a].split(" ").sort().join(" "))
          return false;
      }
    return true;
  }
  
  return cmp(a1, a2) && cmp(a2, a1);
}*/


function regenerateTemplateQueued(){   setTimeout(function(){regenerateTemplateQueuedDo(new Date().getTime())}, 250); }

var updatedTime = 0;
function regenerateTemplateQueuedDo(callTime){   
  if (callTime < updatedTime) return;
  regenerateTemplate();
}


function regenerateTemplate(){

  updateRegexps();
  
  function regenerateTemplateRec(cur, inloop){
    function nodeToTemplate(node) {
      if ( node.nodeType == Node.TEXT_NODE) {
        var temp = node.textContent.trim();
        if (temp == "") return null;
        return {
          kind: TemplateMatchText,
          value: temp,
          attributes: {},
          children: [],
          templateAttributes: {}
        };
      } else if (node.nodeType == Node.ELEMENT_NODE) {
        return {
         kind: TemplateMatchNode,
         value: node.nodeName,
         attributes: filterNodeAttributes(node, inloop),
         children: [],
         templateAttributes: {}
        };
      }
      return null;
    }
  
    var loopElement = (cur.classList && cur.classList.contains(prf+"templateLoop"));
    inloop = inloop || loopElement;
  
    var kids = cur.childNodes;
    var res = new Array();
    var lastFoundTemplate = -1;
    var i = 0;
    var useSiblings = false;
    var fullSpecified = true;
    var hasReadTag = false;
    var allOptional = true;
    var hasOptional = false;
    var optionals = new Array();
    var foundRead = false;
    var hasText = false;
    for (i=0;i<kids.length;i++) {
      if (kids[i].nodeType != Node.TEXT_NODE && kids[i].nodeType != Node.ELEMENT_NODE) continue;

      var newTemplate = null;
      var templateSpecific = false;
      var matchChildren = false;
      var foundReadNow = false;
      if (kids[i].classList && kids[i].classList.contains(prf+"templateRead")) {
        if (kids[i].classList.contains(prf+"templateReadRepetition")) 
          continue;
       
        hasReadTag = true;
        
        var read = $("." + prf + "read_var", kids[i]).val();
        if (read != "") read += " := ";

        read += $("." + prf + "read_source", kids[i]).val();
        
        newTemplate = [{
         kind: TemplateShortRead,
         value: read,
         attributes: {},
         children: [],
         templateAttributes: {}
        }];
        
       
       
        var optional = $("."+prf+"read_optional", kids[i]).is(':checked');
        allOptional = allOptional && optional;
        hasOptional = hasOptional || optional;
        optionals.push(optional);
        foundReadNow = true;
        matchChildren = $("."+prf+"read_match_children", kids[i]).is(':checked');
      } else { 
        var x = regenerateTemplateRec(kids[i], inloop); 
        if (x.template && x.template.length > 0) {
          newTemplate = x.template;
          allOptional = allOptional && x.optional;
          hasOptional = hasOptional || x.optional;
          optionals.push(x.optional);
          templateSpecific = x.fullSpecified && !x.optional;
        } 
      }
      if (newTemplate != null) {
        if (siblingsinclmode == 1 && newTemplate.length > 0 && !templateSpecific) {
          var testTemplate = newTemplate[0];
          if (testTemplate.kind == TemplateLoop && testTemplate.children.length > 0) 
            testTemplate = testTemplate.children[0];
          var toPushReverse = [];
          for (var j = i - 1; j > lastFoundTemplate; j--)
            if (testTemplate.kind == TemplateShortRead 
             || testTemplate.kind == TemplateLoop 
             || (toPushReverse.length > 0 && findTemplateMatchingNodes(toPushReverse[toPushReverse.length-1], kids[j]).length > 0)
             || findTemplateMatchingNodes(testTemplate, kids[j]).length > 0) {
               if (multipageInterceptionInitialized && kids[j].getAttribute && kids[j].getAttribute(prf + "interceptionInsertion") == "true" ) 
                 continue; //ignore our own elements
               var x = nodeToTemplate(kids[j]);               
               if (x && x.kind != TemplateMatchText) toPushReverse.push(x);
               else if (x && !hasText && !foundRead) { //multiple text nodes around a read mean that the text node has been splitted and the html contains only one text node here, so they can't be used
                 hasText = true;
                 toPushReverse.push(x);
               }
           }
           for (var j = toPushReverse.length - 1; j >= 0; j--)
             res.push([toPushReverse[j]]);
        }
        if (matchChildren) 
          for (var j=0;j<kids[i].childNodes.length-1;j++) {
            var x = nodeToTemplate(kids[i].childNodes[j]);
            if (x) res.push([x]);
          }
        fullSpecified = fullSpecified && templateSpecific;
        lastFoundTemplate = i;
        res.push(newTemplate);
        if (foundReadNow) foundRead = foundReadNow;
      } else if (siblingsinclmode == 0) { //always
        var x = nodeToTemplate(kids[i]);
        if (x != null) {
          if (x.kind != TemplateMatchText) res.push([x]);
          else if (!hasText && !foundRead) { //multiple text nodes around a read mean that the text node has been splitted and the html contains only one text node here, so the template can only inlclude the first text node 
            hasText = true;
            res.push([x]);
          }
        }
      }
    }
    
    if (lastFoundTemplate == -1) return {template: []};

    var p = 0;
    var restemplate = [];
    //alert(res.toSource());
    for (var i=0;i<res.length;i++) {
      if (res[i] == null) continue;
      if (res[i] instanceof Array) {
        for (var j = 0; j < res[i].length; j++) {
          if (!allOptional && optionals[p])
            res[i][j].templateAttributes.optional = true;
          restemplate.push(res[i][j]);
        }
        p+=1;
      } else alert("????: "+res[i]+": "+res[i].toSource());
    }
    
    
    var ignoreTag = fullSpecified || (!cur.hasAttributes() && tagsexcl.test(cur.nodeName));
     
    if (!ignoreTag) {
      restemplate = [{
       kind: TemplateMatchNode,
       value: cur.nodeName,
       attributes: filterNodeAttributes(cur, inloop),
       children: restemplate,
       templateAttributes: {}
      }];

      if (objHasProperties(restemplate[0].attributes)) {
        if (restemplate[0].attributes.id != null) fullSpecified = true;
      }

    }
    
    if (loopElement) {
      restemplate = [{
        kind: TemplateLoop,
        value: "",
        attributes: {},
        children: restemplate,
        templateAttributes: {}
       }];
    }     
// 
    return {template: restemplate, 
            fullSpecified: fullSpecified, 
            optional: allOptional};
  }
  
  var res = regenerateTemplateRec(document.body, false);
  
  if (res.optional)
    for (var i=0;i<res.template.length;i++)
      res.template[i].templateAttributes.optional = true;

  for (var i=0;i<res.template.length;i++) if (res.template[i].value == "BODY") res.template[i].attributes = {}; //don't need to check attributes on body

  
  var finalRes;
  switch ($(prfid+"outputkind").val() * 1) {
    case 0: finalRes = serializeTemplate(res.template); break;
    case 1: finalRes = serializeTemplateAsXPath(res.template, true);  break;
    case 2: finalRes = serializeTemplateAsXPath(res.template); break;
    case 3: finalRes = serializeTemplateAsCSS(res.template); break;
  }
  
  $(prfid + "template").val( finalRes );
  
  if ($(prfid+"multipage").css("display") != "none") {
    $(prfid+"multipagetable textarea").last().val( finalRes );
    regenerateMultipageTemplate();
  }
  
  updatedTime = new Date().getTime();
}


 /* function serializeAll(cur){
    if (cur.nodeType == Node.TEXT_NODE) return cur.nodeValue;
    if (cur.classList && (cur.classList.contains(prf+"templateRead") || cur.classList.contains(prf+"read_options"))) return "";
    var kids = cur.childNodes;
    var res = encodeNodeTags(cur)+"\n";
    for (var i=0;i < kids.length;i++) { 
      res += serializeAll(kids[i]);
    }
    res += "</"+cur.nodeName+">\n";
    return res;
  }
  */
function serializeTemplate(templates, indentation) {
  var useLineBreaks = $(prfid + "useLineBreaks").is(":checked");
  var useIndentation = useLineBreaks && $(prfid + "useIndentation").is(":checked");
  var lineBreak = useLineBreaks ? "\n" : "";
  if (indentation == null) indentation = "";
  var indentationDelta = (useIndentation ?  "  " : "");

  var res = "";
  function addSurrounded(s) {
    if (s == "") return;
    var multiLine = s[s.length-1] == '\n';
    if (useLineBreaks && multiLine) res += "\n";
    res += s;  
    if (useIndentation && multiLine) res += indentation;
  }
  for (var i=0;i<templates.length;i++) {
    if (templates[i].kind == TemplateMatchNode) {
      res += indentation + "<" + templates[i].value;
      if (objHasProperties(templates[i].attributes)) res += " " + encodeXMLAttributes(templates[i].attributes);
      if (templates[i].templateAttributes.optional) res += " t:optional=\"true\"";
      if (templates[i].children.length == 0) res += "/>" + lineBreak;
      else {
        res+=">";
        addSurrounded(serializeTemplate(templates[i].children, indentation + indentationDelta));
        res+="</"+templates[i].value+">" + lineBreak; 
      }
    } else if (templates[i].kind == TemplateMatchText) {
      if (res.length > 0 && res[res.length-1] == '\n') res += indentation + indentationDelta;
      res += templates[i].value;
    } else if (templates[i].kind == TemplateLoop) {
      res += indentation + "<t:loop>";
      addSurrounded(serializeTemplate(templates[i].children, indentation + indentationDelta));
      res += "</t:loop>" + lineBreak;
    } else if (templates[i].kind == TemplateShortRead) {
      var shortNotation =  (i == 0 || (templates[i-1].kind != TemplateMatchText && templates[i-1].kind != TemplateShortRead))
                        && (i == templates.length-1 || (templates[i+1].kind != TemplateMatchText && templates[i+1].kind != TemplateShortRead));
      if (shortNotation) res += "{";
      else res += indentationDelta + "<t:s>";
      res += templates[i].value;
      if (shortNotation) res += "}";
      else res += "</t:s>";
    }
  }
  return res;
}

/*
Conversion rules
node[@att="xyz"]

node.class

<a><b></b></a>

a b

a x ~ y ~ b 

<a><x/><y/><b>..</b></a>
*/

function serializeTemplateAsCSS(templates) {
  function rec(t) {
    if (t.kind != TemplateMatchNode && t.kind != TemplateLoop) 
      return; //ignore read and text for css
    function serializeNode(t){
      if (t.kind == TemplateLoop) return;  //ignore loop (everything is looped)
      var sel = t.value;
      if (t.attributes["id"] != null)
        sel += "#" + t.attributes["id"];
      if (t.attributes["class"] != null)
        for (var i = 0; i < t.attributes["class"].length; i++) 
          sel = sel + "." + t.attributes["class"][i];

      for (var a in t.attributes)
        if (a != "class" && a != "id") 
          sel = sel + "[" + a + "=\"" + t.attributes[a].replace(/"/g, '\\"') + "\"]";
      return sel;
    } 
    
    var basesel = serializeNode(t);
    var childsel = "";
    var first = true;

    var resSel = [], resNames = [];
    for (var i=0;i<t.children.length;i++) {
      if (t.children[i].kind == TemplateMatchText) continue; //ignore
      else if (t.children[i].kind == TemplateMatchNode || t.children[i].kind == TemplateLoop) {
        var kid = t.children[i];
        if (kid.kind == TemplateLoop) { //todo: handle multiple children
          if (kid.children.length == 0) continue;
          kid = kid.children[0];
        }
        if (childsel != "") childsel += " ~ ";
        else childsel += " ";

        var cn = rec(kid) ;         
        var c = cn[0], n = cn[1];
        for (var j = 0; j<c.length;j++) {
          resSel.push(basesel + childsel +  c[j]);  
          resNames.push(n[j]);
        }

        childsel += serializeNode(kid);            //ignore children for matching (can't nest css selectors)
      } else if (t.children[i].kind == TemplateShortRead) {
        resSel.push(basesel);
        var names = /([^ ]*) *:=/.exec(t.children[i].value);
        resNames.push( ( names && names.length > 1) ? names[1] : "");
      }
    }
    return [resSel, resNames];
  }
  
  var res = "";
  for (var i = 0; i < templates.length; i++) {
    var x = rec(templates[i]);
    for (var j = 0; j < x[0].length; j++)
       res += (x[1][j] != "" ? x[1][j] + " := " : "") + x[0][j] + "\n";
  }
  return res;
}

/*
  Basic conversion rules:
<node att="xyz">

node[@att="xyz"][1]

node[translate(@att, "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "abcdefghijklmnopqrstuvwxyz") = "xyz"][1]

<a><b></b></a>

 //a//b


<a><x/><y/><b>..</b></a>

//a//x/following-sibling::y/following-sibling::b/

  
*/
function serializeTemplateAsXPath(templates, full) {
  function rec(t) {
    if (t.kind != TemplateMatchNode && t.kind != TemplateLoop) 
      return; //ignore read and text for css
    function translate(xpath, to) {
      //translate(xpath, "ABC...", "abc", ...)
      var lup   = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var ldown = "abcdefghijklmnopqrstuvwxyz";
      var letters = "";
      for (var i=0;i<26; i++)
        if (to.indexOf(lup[i]) >= 0 || to.indexOf(ldown[i]) >= 0) letters += lup[i];
      return 'translate('+xpath+', "' + letters + '", "'+letters.toLowerCase()+'")';
    }
    function cmp(xpath, to, startswith){
      var toesc = '"' + to.replace( /"/g, '""' ) + '"';
      if (!full) {
        if (startswith) return 'starts-with('+xpath+', '+toesc+')';
        else return xpath + ' = ' + toesc;
      }
      var translated = translate(xpath, to);
      if (startswith) return 'starts-with('+translated + ', '+toesc+')';
      else return translated + ' = ' + toesc;
    }      
    function serializeNode(t){
      if (t.kind == TemplateLoop) return;  //ignore loop (everything is looped)
      var sel;
      if (!full) sel = t.value;
      else sel = "*["+cmp("node-name(.)", t.value)+"]";
      for (var a in t.attributes)
        if (a != "class") 
          sel = sel + "[" + cmp("@" + a, t.attributes[a]) + "]";

      if (t.attributes["class"] != null)
        for (var i = 0; i < t.attributes["class"].length; i++) 
          sel = sel + "[contains(concat(' ', @class, ' '), ' " + t.attributes["class"][i].toLowerCase() + " ')]";

      return sel;
    } 
    
    var basesel = serializeNode(t);
    var childsel = "";
    var first = true;

    var resSel = [], resNames = []; var lastWasText = false;
    for (var i=0;i<t.children.length;i++) {
      if (t.children[i].kind == TemplateMatchText) {
        if (childsel != "") childsel += "/following-sibling::";
        else childsel += "//";
        childsel += "text()["+cmp(".", t.children[i].value, true)+"]";
        lastWasText = true;
      } else if (t.children[i].kind == TemplateMatchNode || t.children[i].kind == TemplateLoop) {
        var kid = t.children[i];
        if (kid.kind == TemplateLoop) { //todo: handle multiple children
          if (kid.children.length == 0) continue;
          kid = kid.children[0]; //ignore loops (xpath is looping over all anyways)
        }
        if (childsel != "") childsel += "/following-sibling::";
        else childsel += "//";

        var cn = rec(kid) ;         
        var c = cn[0], n = cn[1];
        for (var j = 0; j<c.length - 1;j++) {

          resSel.push(basesel + childsel + c[j]);  
          resNames.push(n[j]);
        }
        childsel += c[c.length-1];
        lastWasText = false;
      } else if (t.children[i].kind == TemplateShortRead) {
        var read = /([^ ]*) *:= *(.*)/.exec(t.children[i].value);
        if (read == null) read = ["", t.children[i].value];
        resNames.push( read[0] );
        if (read[1] == ".") resSel.push(basesel + (childsel != "" ? "[." + childsel + "]" : ""));
        else if (childsel == "") resSel.push(basesel + childsel + "/" + read[1]);
        else if (read[1] == "text()") resSel.push(basesel + childsel + ( lastWasText ? "" : "/following-sibling::text()") );
        else resSel.push(basesel + childsel + (lastWasText ? "/" : "/following-sibling::node()/") + read[1].replace( /text[(][)]/g, "."));
      }
    }
    if (childsel == "") resSel.push(basesel);
    else resSel.push(basesel + "[." + childsel + "]");
    resNames.push(":=");
    return [resSel, resNames];
  }
  
  var res = "";
  for (var i = 0; i < templates.length; i++) {
    var x = rec(templates[i]);
    for (var j = 0; j < x[0].length - 1; j++)
       res += (x[1][j] != "" ? x[1][j] + " := " : "") + "//" + x[0][j] + "\n";
  }
  return res;
}
function UNIT_TESTS(){  // 👈🌍👉
  if (!Node.ELEMENT_NODE) { alert("initialization failed"); return; }
  $(prfid+"useLineBreaks").prop("checked", "checked");
  $(prfid+"useIndentation").prop("checked", "");
  var testBox = $("<div/>", {id: "XXX_YYY_ZZZ_TESTBOX"}); //can't use scraper prefix, or it would be ignored
  testBox.appendTo(document.body);
  var testi = 0;
  function t(input, outputtemplate, outputxpath, outputcss,  special){
    testBox.html(input);
    
    var rangepos = [];
    var rangenodes = [];
    var reprangepos = [];
    var reprangenodes = [];
    
    function rec(node){
      if (node.nodeType == Node.ELEMENT_NODE) {
        for (var i=0;i<node.childNodes.length;i++)
          rec(node.childNodes[i]);
      } else if (node.nodeType == Node.TEXT_NODE) {
        function extract(c, dest, destNode){
          var pos = [];
        
          var f = node.nodeValue.indexOf(c);
          while ( f > -1) {
            dest.push(f);
            destNode.push(node);
            if (f > -1) 
              node.nodeValue = node.nodeValue.substr(0,f) + node.nodeValue.substr(f+1); 
            f =  node.nodeValue.indexOf(c);
          }
          return pos;
        }
        
        extract("|", rangepos, rangenodes);
        extract("#", reprangepos, reprangenodes);
      }
    }
    
    rec(document.getElementById("XXX_YYY_ZZZ_TESTBOX"));

    for (var i=0;i<rangepos.length;i+=1  ) {
      var range = document.createRange();
      range.setStart(rangenodes[i], rangepos[i]);
      i+=1;
      range.setEnd(rangenodes[i], rangepos[i]);

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      addSelectionToTemplate();
      
      var j = i + 1;
      if (j < rangenodes.length && rangenodes[j] == rangenodes[i]) {
        var reads = document.getElementsByClassName(prf+"templateRead");
        var newContainer = reads[reads.length-1].nextSibling;
        while (j < rangenodes.length && rangenodes[j] == rangenodes[i]) {
          rangenodes[j] = newContainer;
          rangepos[j] -= rangepos[i];
          j++;
        }
      }
    }
    
    for (var i=0;i<reprangenodes.length;i++) {
      var range = document.createRange();
      range.setStart(reprangenodes[i], reprangepos[i]);
      i+=1;
      range.setEnd(reprangenodes[i], reprangepos[i]);

      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      window.searchingRepetition = $($("."+prf+"templateRead").get((i-1)/2)); 
     
      addSelectionToTemplate();
    }

    if (special) special();
    
    testi += 1;

    function test(type, output, prefix, suffix) {
    
      $(prfid+"outputkind").val(type);
    
      regenerateTemplate();
    
      if (outputtemplate.indexOf('id="') < 0) {
        if (suffix != "") output = prefix + output + suffix;
        else output = prefix + output.replace(/\n/g, "\n" + prefix);
      }
      output += "\n";
    
      var got = $(prfid + "template").val();
    
      if (got != output) alert("Test: "+testi + ":"+type+"\nGot:\n"+got+"\n------------------\nExpected:\n"+output);
    }
    
    test(0, outputtemplate, '<DIV id="XXX_YYY_ZZZ_TESTBOX">\n', '\n</DIV>');
    test(2, outputxpath, '//DIV[@id = "XXX_YYY_ZZZ_TESTBOX"]', '');
    test(3, outputcss, 'DIV#XXX_YYY_ZZZ_TESTBOX ', '');
  }
  
  var ta = t;
  //t = function(a,b){};
  
  
  t('<a><b>|Dies wird Variable test|</b></a>',                                      '<A>\n<B>{.}</B>\n</A>',               '//A//B', 'A B');
  t('<a><b>|Dies wird erneut Variable test|</b><b>Nicht Test</b><b>Test</b></a>',   '<A>\n<B>{.}</B>\n</A>',               '//A//B', 'A B');
  t('<a>|<b>Dies wird erneut Variable test|</b><b>Nicht Test</b><b>Test</b></a>',   '<A>\n<B>{.}</B>\n</A>',               '//A//B', 'A B');
  t('<a><b>|Dies wird erneut Variable test</b>|<b>Nicht Test</b><b>Test</b></a>',   '<A>\n<B>{.}</B>\n</A>',               '//A//B', 'A B');
  t('<a>|<b>Dies wird erneut Variable test</b>|<b>Nicht Test</b><b>Test</b></a>',   '<A>\n<B>{.}</B>\n</A>',               '//A//B', 'A B');
  t('<a><b>Nicht Test</b><b>Test:</b><b>|Dies wird erneut Variable test2|</b></a>', '<A>\n<B/>\n<B/>\n<B>{.}</B>\n</A>',   '//A//B/following-sibling::B/following-sibling::B', 'A B ~ B ~ B');
  t('<a><b v="abc">1</b><b v="def"></b>      <b>2</b><b>3</b><b v="ok">Hier|xyz|</b><b v="!">5</b></a>', 
    '<A>\n<B>Hier<t:s>substring-after(text(), \'Hier\')</t:s></B>\n</A>',
    '//A//B//text()[starts-with(., "Hier")]/substring-after(., \'Hier\')',
    'A B');
  t('<a><b v="abc">1</b><b v="def"></b>      <b>2</b><b>3</b><b v="ok">Hier|xyz</b>|<b v="!">5</b></a>', 
    '<A>\n<B>Hier<t:s>substring-after(text(), \'Hier\')</t:s></B>\n</A>',
    '//A//B//text()[starts-with(., "Hier")]/substring-after(., \'Hier\')',
    'A B');

  t('<a><b>|abc|</b><c>|dies kommt raus|</c></a>', '<A>\n<B>{.}</B>\n<C>{.}</C>\n</A>', '//A//B\n//A//B/following-sibling::C', 'A B\nA B ~ C');
  t('<a>|<b>abc</b><c>dies kommt raus</c>|</a>',   '<A>{.}</A>',                        '//A',                                 'A');

  t('<a><b>|1|</b><b>#2#</b><b>3</b><b>4</b><b>5</b></a>', 
    '<A>\n<t:loop>\n<B>{.}</B>\n</t:loop>\n</A>',
    '//A//B',
    'A B');
  t('<a><b>0</b><b>|1|</b><b>#2#</b><b>3</b><b>4</b><b>5</b></a>', 
    '<A>\n<B/>\n<t:loop>\n<B>{.}</B>\n</t:loop>\n</A>',
    '//A//B/following-sibling::B',
    'A B ~ B');
  t('<a><ax>123124</ax><ax><b>525324</b></ax><ax><b>1</b></ax><ax><b>|3|</b></ax></a>', 
    '<A>\n<AX/>\n<AX/>\n<AX/>\n<AX>\n<B>{.}</B>\n</AX>\n</A>',
    '//A//AX/following-sibling::AX/following-sibling::AX/following-sibling::AX//B',
    'A AX ~ AX ~ AX ~ AX B');
  t('<table class="prettytable"><tbody><tr class="hintergrundfarbe6"><th>Trigraph</th><th>ersetztes Zeichen</th></tr><tr><td><code>??=</code></td><td><code>|Y|</code></td></tr><tr><td><code>??/</code></td><td><code>#\\#</code></td></tr><tr><td><code>??\'</code></td><td><code>^</code></td></tr><tr><td><code>??(</code></td><td><code>[</code></td></tr><tr><td><code>??)</code></td><td><code>]</code></td></tr><tr><td><code>??!</code></td><td><code>X</code></td></tr><tr><td><code>??&lt;</code></td><td><code>{</code></td></tr><tr><td><code>??&gt;</code></td><td><code>}</code></td></tr><tr><td><code>??-</code></td><td><code>~</code></td></tr></tbody></table>', //table modified from wikipedia
  '<TABLE class="prettytable">\n<t:loop>\n<TR>\n<TD/>\n<TD>\n<CODE>{.}</CODE>\n</TD>\n</TR>\n</t:loop>\n</TABLE>',
  '//TABLE[contains(concat(\' \', @class, \' \'), \' prettytable \')]//TR//TD/following-sibling::TD//CODE',
  'TABLE.prettytable TR TD ~ TD CODE'); 
  t('<table class="prettytable"><tbody><tr class="hintergrundfarbe6"><th>Trigraph</th><th>ersetztes Zeichen</th></tr><tr><td><code>??=</code></td><td><code>Y</code></td></tr><tr><td><code>??/</code></td><td><code>|\\|</code></td></tr><tr><td><code>??\'</code></td><td><code>#^#</code></td></tr><tr><td><code>??(</code></td><td><code>[</code></td></tr><tr><td><code>??)</code></td><td><code>]</code></td></tr><tr><td><code>??!</code></td><td><code>X</code></td></tr><tr><td><code>??&lt;</code></td><td><code>{</code></td></tr><tr><td><code>??&gt;</code></td><td><code>}</code></td></tr><tr><td><code>??-</code></td><td><code>~</code></td></tr></tbody></table>', //table modified from wikipedia
  '<TABLE class="prettytable">\n<TR/>\n<TR/>\n<t:loop>\n<TR>\n<TD/>\n<TD>\n<CODE>{.}</CODE>\n</TD>\n</TR>\n</t:loop>\n</TABLE>',
  '//TABLE[contains(concat(\' \', @class, \' \'), \' prettytable \')]//TR/following-sibling::TR/following-sibling::TR//TD/following-sibling::TD//CODE',
  'TABLE.prettytable TR ~ TR ~ TR TD ~ TD CODE'
  );  //skipping one requires two new rows, since the first row matches the header
  t('<x>foobar 123|456|7890 |abc|defghij xyz</x>', 
    '<X>foobar 123<t:s>substring-before(substring-after(text(), \'foobar 123\'), \'7890 abcdefghij xyz\')</t:s><t:s>substring-before(substring-after(text(), \'7890 \'), \'defghij xyz\')</t:s></X>',
    '//X//text()[starts-with(., "foobar 123")]/substring-before(substring-after(., \'foobar 123\'), \'7890 abcdefghij xyz\')\n//X//text()[starts-with(., "foobar 123")]/substring-before(substring-after(., \'7890 \'), \'defghij xyz\')',
    'X\nX');
  t('<a><b>|1|</b><c>|2|</c></a>', 
    '<A>\n<B t:optional="true">{.}</B>\n<C>{.}</C>\n</A>', 
    '//A//B\n//A//B/following-sibling::C',
    'A B\nA B ~ C',
    function(){$("."+prf+"templateRead ."+prf+"read_optional").first().prop("checked", "checked");});
  t('<a><b id="test">|xyz|</b></a>', 
    '<B id="test">{.}</B>',
    '//B[@id = "test"]',
    'B#test');
  t('<a><b id="test">|xyz|</b><c>|abc|</c></a>', 
    '<DIV id="XXX_YYY_ZZZ_TESTBOX">\n<A>\n<B id="test">{.}</B>\n<C>{.}</C>\n</A>\n</DIV>',
    '//DIV[@id = "XXX_YYY_ZZZ_TESTBOX"]//A//B[@id = "test"]\n//DIV[@id = "XXX_YYY_ZZZ_TESTBOX"]//A//B[@id = "test"]/following-sibling::C',
    'DIV#XXX_YYY_ZZZ_TESTBOX A B#test\nDIV#XXX_YYY_ZZZ_TESTBOX A B#test ~ C'
    );
  t('<a><b>|hallo|</b></a>', 
    '<A>\n<B>hallo<t:s>.</t:s></B>\n</A>', 
    '//A//B[.//text()[starts-with(., "hallo")]]',
    'A B',
    function(){$("."+prf+"templateRead ."+prf+"read_match_children").first().prop("checked", "checked");});
  t('<a><b>|123<x/>456|</b></a>', 
     '<A>\n<B>{.}</B>\n</A>',
     '//A//B',
     'A B'
     );   
  t('<a><b>|123<x/>456|</b></a>', 
    '<A>\n<B>123<X/>\n456<t:s>.</t:s></B>\n</A>', 
    '//A//B[.//text()[starts-with(., "123")]/following-sibling::X/following-sibling::text()[starts-with(., "456")]]',
    'A B',
    function(){$("."+prf+"templateRead  ."+prf+"read_match_children").first().prop("checked", "checked");}); 
//  t('<a><b>123<x/>456|foo<span>ood</span>bar|789<x/>012</b></a>', '<A>\n<B>hallo<t:s>.</t:s></B>\n</A>', function(){$("."+prf+"templateRead  ."+prf+"read_match_children").first().prop("checked", "checked");}); not sure what this should become
    //*/
  $(prfid+"gui").css("background-color","#00FF00");
  
}


/*Templategeneration guide lines:

Selection:

  No empty read tags!

  No nested read tags (would be possible, but too confusing)  

  Attribute white list id|class
  
  Element blacklist: tbody
  
  Id blacklist: .*[0-9].*
  
  Class blacklist: even|odd|selected|.*[0-9].*


  Read tags surrounding text only/p:

     Need br siblings
 
     In table, need tr/td siblings if no unique attribute  exist (e.g. id) (class not sufficient, since it's probably even/odd)
     
     If splitted text nodes, use regex filtering
 
 
        content:        text only       elements
        surrounding:
        none:             .                .
        text           use text()        use .
                       (+filter)
        elements:      use text()        use (_lastmatched, _lastmatched/following-siblings::*)
                    (+siblings+filter?)  
 
  (If parent has no relevant attributes and no other children, move read tag up? no)

  If only single child, move down

  TABLE: No tbody, thead


LOOPING:

  Find common parent
  
  Find similar ending, discard middle path of the tree 
  
  (correct details?)

GUI:
  
  Clear all button
  
  Make optional
  
  Remove button
  
  Extend (to all siblings) button 
  
  Read to variable
  
  Read attribute
  */
  
  





var inIframe = top != self && window.frameElement && window.frameElement.nodeName && window.frameElement.nodeName == "IFRAME";

if (!inIframe) { //iframe screws up multipage templates


//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//------------------------------------VIDELIBRI SCRIPT BLOCK----------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


//should be another script, but greasemonkey @require sucks


if (GM_info.script.name.toLowerCase().indexOf("videlibri") >= 0) {
   lang = 1;
   var bookFields = ["title", "author", "id", "duedate", "status", "year", "_renewlink", "_renewid"];
   var bookFieldNames = ["Titel", "Autor", "Signatur", "Leihfristende", "Bemerkung zum Verlängerungsstatus", "Erscheinungsjahr", "Verlängerungslink", "Verlängerungscheckbox"];
   var bookFieldArticle = ["den", "den", "die", "das", "die", "das", "den", "die"];
   var phase = GM_getValue("vl_phase", 0); 
   var PHASE_FIRSTBOOKPROP = 3;
   if (phase >= PHASE_FIRSTBOOKPROP && phase < PHASE_FIRSTBOOKPROP + bookFields.length + 1) phase = 3;
   var firstField = -1;
   var firstFieldTemplateRead;
   var checkboxIntercepted = false;
   function vlfinished(){
     var libName = GM_getValue("vl_libName", "meine Bibliothek");
     regenerateMultipageTemplate();
     mainInterface.hide();
     lastpage = $("<div/>",{
        style: "position: fixed;" +
               "left: 10px; top: 10px; right: 10px; bottom: 10px; " +
               "border: 1px solid gray; " +
               "background-color: white; "+ 
               "color: black;" +
               "padding: 2px;"+
               "z-index: 2147483647;"+ //maximal z-index (yes, there are pages close to this value)
               "overflow: auto;",
        id: prf + "vl_main"
      }).append('<h1>VideLibri-Skript</h1><p>Das Kontozugriffs-Template wurde erstellt und muss nun nur noch in VideLibri eingetragen werden. In der Desktop-Version, kann dies direkt in dem Einstellungsdialog erfolgen, bei der Android-Version ist der Screen zu klein dafür, so dass es irgendwo hochgeladen, und in VideLibri wieder runtergeladen werden muss. Zum Runterladen, öffnet man den Einstellungsdialog der App, klickt auf den Button "Neue Bibliothek registrieren", gibt im neuen Dialog die URL im obersten Feld ein und klickt auf "installieren".  Zudem kann ein hochgeladene Template kann auch von der Desktop-Version runtergeladen werden.'+ 
        '<p>Zum Hochladen auf die VideLibri-Sourceforge-Seite klicke diesen Button: <button id="'+prf+'_vl_upload">auf SF hochladen</button>. Die URL wird anschließend hier angezeigt: <div style="color:red; font-weight: bold" id="'+prf+'_vl_result"></div>'+
        '<p>Es werden nur die drei unten angezeigten Dateien hochgeladen. Es macht Sinn diese vor dem Hochladen nochmal anzusehen, ob sie keine persönlichen Daten enthalten. (Kontonummer und Passwort sollten durch die $username und $password Platzhalter ersetzt worden sein) '+
        '<p>Wer es auf einen eigenen Server hochladen will, muss diese Dateien dort hochladen, wobei die URL zu <code>bib.html</code> dann in VideLibri eingegeben werden muss:'+
        '<div style="display:block"><code>template/template</code>:<br> <textarea id="'+prf+'_vl_template" style="float: none; width:90%; height: 10em"></textarea><br></div>'+
        '<div style="display:block"><code>meta.xml</code>:<br> <textarea id="'+prf+'_vl_meta" style="float: none; width:90%; height: 6em"></textarea><br></div>'+
        '<div style="display:block"><code>bib.html</code>:<br> <textarea id="'+prf+'_vl_links" style="float: none; width:90%; height: 6em"></textarea><br></div>'
        );   
      $(document.body).append(lastpage);
      var template = "<actions>\n<action id=\"connect\"></action>\n" + $(prfid+"multipagetemplate").val().replace("<action>", '<action id="update-all">');
      if (template.indexOf("_renewlink") >= 0 || template.indexOf("_renewid") >= 0 ){
        var renewAction = "<action id=\"renew-list\">\n";
        if (template.indexOf("_renewlink") >= 0) {
          renewAction  += '  <loop var="b" list="$renew-books">\n';
                       +  '    <page url="{$b._renewlink}"/>\n';
                       + '  </loop>\n';
        } else if (template.indexOf("_renewid") >= 0) {
          template = template.replace("</s>", "</s><s>renew-form := () </s>");
          renewAction += '  <s>form := form-combine($renew-form, $renew-books ! {(.)._renewid: "on"} ) </s>\n'; 
          renewAction += '  <page url="{$form}"/>\n';
        }
        renewAction += "  <call action=\"update-all\"/>\n"
                    +  "</action>";
        
        template += "\n" + renewAction;
      }
        
      template += "\n</actions>";
      var firstRead = template.indexOf("<template>");
      if (firstRead > 0) {
        firstRead += "<template>".length;
        for (; firstRead < template.length && template[firstRead] != ">"; firstRead++);
        firstRead++
        template = template.substring(0, firstRead) + "<t:s>vl:delete-current-books()</t:s>" + template.substring(firstRead, template.length);        
      }
      url = /url="(http:\/\/[^"]+)"/.exec(template); 
      if (url) url = url[1];
      $(prfid+"_vl_template").val(template);
      $(prfid+"_vl_meta").val(
        '<?xml version="1.0" encoding="UTF-8"?>\n'+
        '<library>\n'+
        '  <longName value="'+libName+'"/>\n'+
        '  <shortName value="'+libName+'"/>\n'+
        (url ? '  <catalogue value="'+url+'"/>\n'+
            '  <homepage value="'+url+'"/>\n' : "") +
        '  <id value="-_-_-_'+libName.replace( /[^0-9a-zA-Z]/, "", "g")+'"/>\n'+
        '  <template value="template"/>\n'+
        '</library>'       
      );
      $(prfid+"_vl_links").val(
        '<html><head>\n'+
        '  <link rel="videlibri.description" href="meta.xml"/>\n'+
        '  <link rel="videlibri.template" href="template/template"/>\n'+
        '</head><body>\n'+
        '  Neues Template f&uuml;r  "'+libName+'"\n'+
        '</body></html>\n'        
      );
      lastpage.append($("<button>", {
         "text": "Zurück",
         "click": function(){  switchVLPhase(phase - 1); lastpage[0].parentNode.removeChild(lastpage[0]); mainInterface.show(); }
       }));
       $(prfid + "_vl_upload").click(function(){
         var fd = new FormData();
         fd.append("meta", $(prfid+"_vl_meta").val());
         fd.append("links", $(prfid+"_vl_links").val());
         fd.append("template", $(prfid+"_vl_template").val());
         GM_xmlhttpRequest({
           url: "http://videlibri.sourceforge.net/user/upload.php",
           data: fd, //automatically sets content-type
           method: "POST",
           onload: function(response){
             $(prfid + "_vl_result").html(response.responseText);
           },
           onerror: function(){ alert("Hochladen fehlgeschlagen!!!"); },
           onabort: function(){ alert("Hochladen fehlgeschlagen!!!"); }
         });
       });
   }
   
   function switchVLPhase(p){
     var oldValue = $(prfid+'_vlname').val();
     if (oldValue) GM_setValue("vl_libName", oldValue);
     //if (phase == p) return; does not work? has to be initialized once
     phase = p;
     GM_setValue("vl_phase", phase);
     var e = document.getElementById(prf+"_vl_base");
     var ct = "";
     switch (p) {
       case 0: ct = "<b>Erstellung eines einfachen Konto-Template<br><br>"+
                    "Es müssen mindestens zwei Ausleihen vorhanden sein. <br><br>"+
                    "<span style='color: red'>Folge den normalen Links durch den Bibliothekkatalog, bis zur Anmelde-Seite für den Kontozugriff</span>. (noch nicht anmelden)<br>"+
                    'Dann auf "Weiter" klicken.<br><br>(manchmal wird das Skript zu früh aktiviert, weil dies noch nicht die Katalogseite ist oder das Skript jetzt die Links blockiert. In dem Fall dieses kleine (!) Fenster mit dem X schließen, F5 drücken und den roten Button erst später klicken)'; break;
       case 1: ct = 'Auf der Anmeldeseite nun normal Kartennummer und Passwort eingeben. <br><br><i>Nach</i> dem Einloggen die Fragen beantworten und auf "Weiter" klicken.<br>(Zum Einloggen ist es besser den grafischen Button zu klicken als Enter)'; break;
       case 2: ct = 'Folge den normalen Links durch den Bibliothekskatalog, bis die Liste der Ausleihen angezeigt wird. Dann auf "Weiter" klicken.'; break;
     };
     if (p >= 3 && p < 3 + bookFieldNames.length + 1) {
        var loopRead = $(prfclass + "templateLoop").length > 0;
       if (loopRead || firstField == -1 || !firstFieldTemplateRead) {
         var q = (loopRead ? p - 1 : p) - 3;
         if (q < 0) 
           ct = 'Wurde "Zurück" gedrückt? Dann wird dieser Schritt übersprungen, solange grüne markierte Zeilen vorhanden sind.';
         else if (q < bookFieldNames.length - 2) 
           ct = 'Markiere <span style="color:blue">'+bookFieldArticle[q]+' '+bookFieldNames[q]+'</span> der ersten Ausleihe. Anschließend, oder wenn dieser Bibliothekkatalog kein "' + bookFieldNames[q]+ '"-Feld hat, auf "Weiter" klicken.<br><br><span style="font-size: 75%">(am einfachsten lässt es sich meistens mit schnellem Doppelklicken markieren. Wenn etwas falsch markiert wurde, z.B.: nur ein Teil vom Feld lässt es sich durch nochmaliges Anklicken wieder entfernen)</span>';
         else if (q < bookFieldNames.length) {
           var link = q == bookFieldNames.length - 2;
           ct = "Wenn ein Template mit Verlängerungsmöglichkeit erstellt werden soll, und "+(link ? "es in jeder Zeile einen Link zum Verlängern eines einzelnen Buches gibt, klicke auf den Verlängerungslink des ersten Buches und danach auf 'Weiter'." : 'es in jeder Zeile eine Checkbox gibt, mit der sich ein Buch zum Verlängern markieren gibt, klicke auf diese Checkbox und dann auf "Weiter". ')+'<br><br>Wenn es das nicht gibt, einfach so auf "Weiter klicken".';
         } else
           ct = "Keine Bucheigenschaften markiert! So geht es nicht.";
        } else { 
          ct = 'Markiere '+bookFieldArticle[firstField]+' '+bookFieldNames[firstField]+' der <span style="color:blue"> zweiten Ausleihe</span>. <br> Wenn alle Ausleihen blau/grün markiert sind, auf "Weiter" klicken. <br><br>Wenn sie nicht grün werden, nochmal versuchen, bis es klappt. (ansonsten geht das Skript hier nicht richtig. Vielleicht nochmal ganz von vorne versuchen (schließen, f5). "weiter" ginge auch, aber dann zeigt VideLibri nur das erste Buch an. ).'
          
          $(firstFieldTemplateRead).find(prfclass + "btnloop")[0].click();
        }
     } else if (p == 3 + bookFieldNames.length + 1) {
       ct = 'Gebe den Namen der Bibliothek ein <input value="'+GM_getValue("vl_libName", "meine Bibliothek")+'" id="'+prf+'_vlname"/> und klicke auf "Weiter".';
     } else if (p == 3 + bookFieldNames.length + 1 + 1) {
       ct = "fertig";
     }    
     
     e.innerHTML = ct + "<br><br>";
     $(e).append($("<button>", {
       "text": "Weiter...",
       "click": function(){  switchVLPhase(phase + 1); }
     }));
     $(e).append("<br><br><br><br><br>");
     $(e).append($("<button>", {
      "text": "Zurück",
      "click": function(){  switchVLPhase(phase - 1); }
      }));
     $(e).append("(nur für Notfälle)");
     
     if (phase == 3) {
       firstField = -1;
       firstFieldTemplateRead = null;
     }           
       
     if (phase == 3 + bookFields.length + 2) { 
       var firstVar = $(prfclass + "read_var")[0];
       var firstSource = $(prfclass + "read_source")[0];
      
       if (firstVar && firstVar.value != "book") {
         firstSource.value = '{"' + /book[.](.*)/.exec(firstVar.value)[1]+'": ' + firstSource.value + '}';
         firstVar.value = "book";
         regenerateTemplate();
       }
       
       vlfinished();
     }
     
     if (phase == PHASE_FIRSTBOOKPROP && !checkboxIntercepted) {
        checkboxIntercepted = true;
        $('input[type=checkbox]').click(function(){
   //     alert(firstField  + " "+phase + " " + (PHASE_FIRSTBOOKPROP + bookFieldNames.length - 1 + 1));
          if (firstField == -1) return;
          if (phase != PHASE_FIRSTBOOKPROP + bookFieldNames.length - 1 + 1) return;
             if (this.childNodes.length > 0) {
               this.removeChild(this.childNodes[0]);
               regenerateTemplate();
               this.parentNode.style.backgroundColor = "";
             } else {
               var range = document.createRange();
               range.setStartBefore(this);
               range.setEndAfter(this);             
               addRangeToTemplate(range);
               this.parentNode.style.backgroundColor = "blue";
             }
        })
      }    
   };
   
   var loginParamFoundName = false;
   var loginParamFoundPass = false;
   
   interceptor = {
     "init_afterbtn": function(){
       $(prfid + "activation").append("<div><br><br><br>Öffne den Bibliothekkatalog und klicke dann diesen Button</div>");
       if (!localStorage[prf+"_deactivated"]) 
         localStorage[prf+"_deactivated"] = "true";
     },
     "init_maininterface": function(){
       $(prfid + "gui b:first").hide();
       $(prfid + "gui").prepend( 
         '<div><b>VideLibri-Skript: </b>' +
         '<div id="'+prf+'_vl_base">'+
         '</div>' +
         '<div style="margin-top: 400px">"Experten"-Konfiguration:<br><br></div></div>'
       );
       switchVLPhase(phase);
     },
     "activated": function(){
       if (!isMultipageScrapingEnabled()) enableMultipage();
     },
     "activationButton": function(){
       interceptor.deactivated();
     },
     "deactivated": function(){
       GM_setValue("vl_phase", 0);
       switchVLPhase(0);
       multipageClearAll();
     },
     "formParam": function(n, v, e){
       if (phase == 1) {
         if (e && e.getAttribute("type") && e.getAttribute("type").toLowerCase() == "hidden") return;
         if (!loginParamFoundName && confirm('Ist ' +v+ ' die Kartennummer?\n\n(Das Skript muss Nummer und Passwort kennen, damit es sie aus dem Template löschen kann.)')) { loginParamFoundName = true; return [n, "$username"]; }
         if (!loginParamFoundPass && confirm('Ist ' +(v.substr(0,2) + "****************".substr(0, (v.length-2)))+ ' das Passwort?  ( * verbirgt Zeichen )\n\n(Das Skript muss Nummer und Passwort kennen, damit es sie aus dem Template löschen kann.)')) { loginParamFoundPass = true; return [n, "$password"]; }
                  
       }
     },
     "newTemplateRead": function (tr){
       field = phase - 3;
       if (field >= 0 && field < bookFields.length + 1) {
         if (firstField == -1) { firstField = field; firstFieldTemplateRead = tr; }
         else {
           var loopRead = $(prfclass + "templateLoop").length > 0;
           if (loopRead) field --;
         }
         $(tr).find(prfclass + "read_var").val("book."+bookFields[field]);
         if (bookFields[field] == "duedate") {
           function guessFormat (date) {
             var temp = /^[0-9]{4}([^0-9]+)[0-9]{1,2}([^0-9]+)[0-9]{1,2}/.exec(date);
             if (temp) return "yyyy" + temp[1] + "m" + temp[2] + "d";
             var temp = /^[0-9]{1,2}([^0-9]+)[0-9]{1,2}([^0-9]+)[0-9]{1,4}/.exec(date);
             if (temp) return "d" + temp[1] + "m" + temp[2]+ "yyyy";
           
             var temp = /^[0-9]{4}([^0-9])[a-zA-ZäöüÄÖÜ]{3}([^0-9])[0-9]{1,2}/.exec(date);
             if (temp) return "yyyy" + temp[1] + "mmm" + temp[2] + "d";
             var temp = /^[0-9]{1,2}([^0-9])[a-zA-ZäöüÄÖÜ]{3}([^0-9])[0-9]{1,4}/.exec(date);
             if (temp) return "d" + temp[1] + "mmm" + temp[2]+ "yyyy";
             
             return prompt("Konnte das Datumsformat von "+date+' nicht erkennen. Bitte gebe es mit folgender Notation ein\n d = Tag, m = Monat, y = Jahr.\nZ.B.: Datumsformat für "2 Dezember-14" ist "d mmmm-yy" oder für "13-01-01" wäre es "yy-mm-dd" (ohne " eingeben) ');
           }
           var date = tr.textContent.trim();
           var format = guessFormat(date);
           $(tr).find(prfclass + "read_source").val("parse-date(., '"+format.replace("'", "''", "g")+"')");
         } else if (bookFields[field] == "_renewid") {
           $(tr).find(prfclass + "read_source").val("(@name,  if (empty($renew-form)) then $renew-form := form(./ancestor::form[1]) else ())[1]"); //hack so we get a form
         }
         
       }
     },
     "allowAutoFollow": function(){
     //alert(phase );
     //alert(PHASE_FIRSTBOOKPROP + bookFieldNames.length - 2);
       return phase != PHASE_FIRSTBOOKPROP + bookFieldNames.length - 2 + 1;
     }
   }
   
   
}

 








//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------


  
  
$("<div/>",{
  text: tr("Activate Scraping", "Aktivieren"),
  style: "position: fixed;" +
         "right: 10px; top: 10px; " +
         "border: 2px solid red; " +
         "background-color: white; "+ 
         "color: black; "+
         "text-align: center; "+
         "cursor: pointer; padding: 2px; z-index: 2147483647",
  id: prf + "activation",
  click:  function(){ 
    activateScraper();
    if (interceptor.activationButton) interceptor.activationButton();
  }
}).appendTo("body");

if (interceptor.init_afterbtn) interceptor.init_afterbtn();

if (localStorage[prf+"_deactivated"] != "true") {
  activateScraper();
  if (GM_getValue("multipageActive", false)) enableMultipage();


  //setTimeout(UNIT_TESTS, 50);
}

if (GM_getValue("optionTableDisplay", "none") != "none") {
  $(prfid+"optiontable").show(); 
  $(prfid+"optioncheckbox").prop("checked", "checked");
}










} //end if inIframe







