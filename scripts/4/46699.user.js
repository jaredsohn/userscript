// ==UserScript==
// @name           Gamefaqs - Walktrough highlighter
// @namespace      ...
// @description    Helps you read walktroughs by highlighting paragraphs when you mouse over, or sticky them when you click on them!
// @include        http://www.gamefaqs.com/*
// ==/UserScript==

// Set a maximum width for the div frames, default walktrough writers
// limit themselves to 640 pixels width. You can set this to 0 to
// disable setting a width and just expand the frame as far your
// window resolution goes.
var opt_para_width = 640;

/* ----- DO NOT EDIT BELOW THIS LINE ----- */

(function(){
  
  // Variable holders
  var ele;
  var htm_wt;
  var ele_hea = document.getElementById("header");
  var ele_bod = document.getElementById("body");
  var arr_pre = document.getElementsByTagName("pre");
  var ele_foo = document.getElementById("footer");
  
  // Check if document is a walktrough
  if(arr_pre && arr_pre.length == 1) {
    htm_wt = arr_pre[0].innerHTML;
    ele = arr_pre[0];
  }
  
  // Is the page a walktrough? Do our magic!
  if(htm_wt) {
    
    // Replace all double-carriage return with special div tags that allow someone to "sticky" the paragraph
    if(opt_para_width == 0) {
      ele.innerHTML = ele.innerHTML.toString().replace(/\n\n/g, "</div>\n<div onclick=\"if(this.foc != 1){this.foc=1;this.style.border='2px solid #FFFF00';this.style.padding='4px';}else{this.foc=0;this.style.border='0px';this.style.padding='0px';}\" onmouseover=\"this.style.backgroundColor='#FFFFCC';this.style.marginLeft='32px';\" onmouseout=\"if(this.foc != 1){this.style.backgroundColor='#FFFFFF';this.style.marginLeft='0px';}\">");
    } else {
      ele.innerHTML = ele.innerHTML.toString().replace(/\n\n/g, "</div>\n<div style=\"width:" + opt_para_width + "px;overflow:auto;\" onclick=\"if(this.foc != 1){this.foc=1;this.style.border='2px solid #FFFF00';this.style.padding='4px';}else{this.foc=0;this.style.border='0px';this.style.padding='0px';}\" onmouseover=\"this.style.backgroundColor='#FFFFCC';this.style.marginLeft='32px';\" onmouseout=\"if(this.foc != 1){this.style.backgroundColor='#FFFFFF';this.style.marginLeft='0px';}\">");
    }
    
  }
  
})();
