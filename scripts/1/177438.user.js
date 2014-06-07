// ==UserScript==
//
// @name           Re-Enable Right Click and Highlighting on Minirlss.net
//
// @description    Reverses scripts that are used to disable right clicking and highlighting of text - currently only for minirlss.net, but could be modified to work on other sites.
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
//Version Number
// @version        1.0.1
//
// Urls process this user script on
// @include        http*://minirlss.net/*
// @include        http*://www.minirlss.net/*
//
// ==/UserScript==
//*Functions*
function allowTextSelection(){
  var styles='*,p,div{user-select:text !important;-moz-user-select:text !important;-webkit-user-select:text !important;}';
  jQuery('head').append(jQuery('<style />').html(styles));
  
  window.console&&console.log('allowTextSelection');
  var allowNormal = function(){
    return true;
  };
  window.console&&console.log('Elements unbound: '+
    jQuery('*[onselectstart], *[ondragstart], *[oncontextmenu], #songLyricsDiv'
    ).unbind('contextmenu').unbind('selectstart').unbind('dragstart'
    ).unbind('mousedown').unbind('mouseup').unbind('click'
    ).attr('onselectstart',allowNormal).attr('oncontextmenu',allowNormal
    ).attr('ondragstart',allowNormal).size());
}

//Main.Code*
allowTextSelection();

void(document.oncontextmenu=null);