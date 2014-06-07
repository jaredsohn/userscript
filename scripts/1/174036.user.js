// ==UserScript==
// @name         Oversetter
// @description  Improves Google Translate by adding another box at the bottom for translating in reverse direction.
// @author       TPReal
// @version      0.1.1
// @require      http://code.jquery.com/jquery-1.9.1.min.js
// @match        *://translate.google.com/*
// ==/UserScript==

var HASH_REGEXP=/^#(\w+)\/(\w+)(?:\/(.*))?$/;
var DEFAULT_FIELDS=[null,"en","en",""];

$(function(){
  $("#gt-text-top").after(
    $("<span>").append(
      $("<button type='button'>&times;&times;</button>").click(function(){
        setText(window.top,"");
        setText(retranslateWindow(),"");
      }),
      $("<button type='button'>&darr;&darr;</button>").click(function(){
        moveText(window.top,retranslateWindow());
      }),
      $("<button type='button'>&uarr;&uarr;</button>").click(function(){
        moveText(retranslateWindow(),window.top);
      })
    ).css({float:"right"}).find("button").width("8em").height("3em").end(),
    $("<iframe id='retranslate_frame'/>").attr({src:location.origin}).width("100%").height("350px")
  );
});

function retranslateWindow(){
  return $("#retranslate_frame").get(0).contentWindow;
}

function getText(wnd){
  return $(wnd.document).find("#result_box")[0].innerText;
}

function setText(wnd,text){
  var fields=hashToFields(wnd.location.hash);
  setTextInFields(fields,text);
  wnd.location.hash=fieldsToHash(fields);
}

function moveText(fromWnd,toWnd){
  setText(toWnd,getText(fromWnd));
}

function hashToFields(hash){
  return HASH_REGEXP.exec(hash)||DEFAULT_FIELDS;
}

function fieldsToHash(fields){
  var hash="#"+fields[1]+"/"+fields[2];
  if(fields[3])
    hash+="/"+fields[3];
  return hash;
}

function setTextInFields(fields,text){
  fields[3]=encodeURIComponent(text);
}
