// ==UserScript==
// @name          Wowhead Commentbox Search
// @namespace     http://www.wowhead.com/user=Nulgar
// @description   Add/move the search box to the comment box and use it to insert DB links
// @include       http://*.wowhead.com/*
// @grant         none
// @version       0.2
// ==/UserScript==

var active=false;

window.WHBoxInsert=function(txt)
 {
 var box=document.getElementsByClassName("comment-editbox")[0]
 box.value+="["+txt+"]"
 box.focus();
 return
 }

var hookClick=function(e)
   {
   if(e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) // reluctantly, I also support Mac's command key :P
    return;
   WHBoxInsert(this.href.substring(this.href.lastIndexOf("/")+1));
   e.preventDefault();
   }

var hookResults=function(e)
  {
  e.target.firstChild.firstChild.addEventListener("click",hookClick)
  }

var getLiveSearch=function(e)
 {
 if(e.target.className!="live-search") return;
 ls=document.getElementsByClassName("live-search")[0];
 if(active)
  ls.addEventListener("DOMNodeInserted",hookResults);
 document.body.removeEventListener("DOMNodeInserted",getLiveSearch)
 }

var hookEnterKey=function(e)
 {
 if(e.which==13)
  {
  e.preventDefault();
  var lsa=document.getElementsByClassName("live-search-selected")[0];
  if(lsa)
   lsa.firstChild.firstChild.click();
  }
 }

var callSearchbox=function()
 {
// alert(active)
 if(!active)
  {
  cbody.insertBefore(sbar,button); // before the button, due to float
  sbar.addEventListener("keydown",hookEnterKey);
  sbar.childNodes[1].style.display="none";
  if(ls)
   ls.addEventListener("DOMNodeInserted",hookResults);
  button.innerHTML="Dismiss";
  }
 else
  {
  spar.insertBefore(sbar,sins);
  sbar.removeEventListener("keydown",hookEnterKey);
  sbar.childNodes[1].style.display="";
  if(ls)
   ls.removeEventListener("DOMNodeInserted",hookResults);
  button.innerHTML="Call Searchbox";
  }
 active=!active;
 }

var cbody=document.getElementsByClassName("comment-edit-body")[0];
if(!cbody) return; // we're not on a page with a comment box
var cins=cbody.childNodes[2];
var sbar=document.getElementsByClassName("topbar-search")[0];
var spar=sbar.parentNode;
var sins=sbar.nextSibling;
var ls=false;
var button=document.createElement("button");
    button.type="button";
    button.className="topbar-search";
    button.innerHTML="Call Searchbox";
    button.addEventListener("click",callSearchbox);
cbody.insertBefore(button,cins);
document.body.addEventListener("DOMNodeInserted",getLiveSearch)



// callSearchbox();

