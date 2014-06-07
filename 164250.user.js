// ==UserScript==
// @name       Fix Chrome in kms.kasi.re.kr
// @namespace  http://use.i.E.your.homepage/
// @version    0.7
// @description  enter something useful
// @match      http://kms.kasi.re.kr/*
// @match      http://intra.kasi.re.kr/*
// @copyright  2013+, Jae-Joon Lee
// @require http://userscripts.org/scripts/source/100842.user.js
// ==/UserScript==

function replace_GetElementById() {
 if (! document.hasOwnProperty('oldGetElementById') ) {
  
  document.oldGetElementById = document.getElementById;
  document.getElementById = function(nn) {
  
   var r = document.oldGetElementById(nn);
   if (! r) {
     var el = document.getElementsByName(nn);
     if (el && el.length > 0) {
        r = el[0];
     }
   }
   return r;
  }
 }
}

function update_hidden_frame() {
 document.all.HiddenFrame = document.getElementById("HiddenFrame");
}

function update_form1_all() {
    if (document.form1) {
        document.form1.all = document.form1.getElementsByTagName("*");
    }

    if (document.Form1) {
        document.Form1.all = document.Form1.getElementsByTagName("*");
    }
    
    if (parent.document.all.hdnTitle.value) {
        parent.document.all.hdnContents.value = document.Form1.all.hdnHTML.value;
        parent.setContents();
    }

    p = document.getElementById("dlList")
    if (p) {
        p.parentElement.style["vertical-align"] = "top";
    }

}

contentEval( replace_GetElementById );
contentEval( update_hidden_frame );
contentEval( update_form1_all );

var iframes = document.getElementsByTagName("iframe");
for(var i=iframes.length-1; i >=0; i--){
  iframe = iframes[i];
    if ( iframe.style["background-color"] == "red" ) {
        iframe.style["background-color"] = "white";
    }
}

if (document.title == "KnowledgeMapAnchor") {
    hh = document.getElementsByName("ctl00")[0].offsetHeight;
    iframe = parent.document.getElementsByName("KnowledgeMapAnchor")[0];
    iframe.style["height"] = hh;
}
