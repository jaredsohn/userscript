// ==UserScript==
// @name           EverTex
// @namespace      http://www.github.com/kaayy
// @version        1.3
// @description    Display formulas in EverNote
// @include        https://www.evernote.com/Home.action*
// @include        https://www.evernote.com/view/*
// @include        https://www.evernote.com/pub/*
// @include        https://www.evernote.com/shard/*
// ==/UserScript==
// This is the Greasemonkey version of EverTex. 
// This userscript displays formulas in EverNote's web interface via MathJax.
// Source Code available at: https://github.com/kaayy/everTex
// Author: kaayy
// Date: Aug. 2012
// Thanks to Lars Kindler, who gave me the first version of this userscript.
//
// And thanks to Anna Hambitzer for her suggestion to render the shared pages.


var iframename_0='EN_IframePanel_0';
var iframename_1='EN_IframePanel_1';


function iframeload_listener(iframename){
  var dom=document.getElementById(iframename).contentWindow.document;
  if(dom.body.innerHTML=='') return;
  if(dom.body.innerHTML=='<h3>Loading note data...</h3>') return;
  var getmark=dom.getElementById('evertex_mathjax');
  if(getmark==null){
    dScript=dom.createElement('script');
    dScript.type='text/javascript';
    dScript.id='evertex_mathjax'
    dScript.src='http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
    dScript.text='if(!MathJax.isReady) MathJax.Hub.Startup.onload(); MathJax.Hub.Typeset();'
    dom.body.appendChild(dScript);
  }
  return;
}


// Load code idea borrowed from GmailTeX Official
//   http://userscripts.org/scripts/review/96444

var attempt=0;

var waitENLoad=setInterval(function(){
  if (attempt++>100){
    clearInterval(waitENLoad);
    return;
  }
  var frame1=document.getElementById(iframename_1);
  if(frame1) {
    document.getElementById(iframename_1).addEventListener("load",function(){iframeload_listener(iframename_1);},false);
    clearInterval(waitENLoad);
    return;
  }
  var frame0=document.getElementById(iframename_0);
  if(frame0) {
     document.getElementById(iframename_0).addEventListener("load",function(){iframeload_listener(iframename_0);},false);
     clearInterval(waitENLoad);
     return;
  }
  return;
}, 400);

