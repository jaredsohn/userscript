// FASTMAIL.FM Keyboard Shortcuts
// version 0.9.4
// 2005-12-08
// Copyright (c) 2005, Jun Makino
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
// 0.9.4
//  Fix - Set cursor position at refreshing page.
// 0.9.3.1
//  Fix - Firefox 1.5/Greasemonkey 0.6.4 issue was not resolved.
// 0.9.3
//  Enh - Add scroll
//  Enh - Keep cursor location
//  Fix - Search box awkward behavior.
//  Fix - Firefox 1.5/Greasemonkey 0.6.4 issue
// 0.9.2
//  Fix - "d" key doesn't go back to mail box when the first mail open.
// 0.9.1
//  Fix - Disabled key even when search box is filled.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          FASTMAIL.FM Keyboard Shortcuts
// @namespace     http://junmakino.fastmail.fm
// @description   Enable Gmail-like keyboard shortcuts on FastMail.FM
// @include       http*://www.fastmail.fm/mail/*
// //@exclude       
// ==/UserScript==
var msgID,msgRef,tStr,searchOn=false;

function focusMove(cnt) {
  GM_setValue('rc',GM_getValue('rc',0)+cnt);
  curRow.cells[0].innerHTML=null;
  curRow=document.getElementById("RowNum"+GM_getValue('rc',0));
  cc1 = curRow.cells[1].innerHTML;
  cc7 = curRow.cells[7].innerHTML;
  msgID=cc1.substring( cc1.indexOf('name=')+6, cc1.indexOf('title=')-2 );
  curRow.cells[0].innerHTML="<b>&gt;</b>"
  //Scroll
  var screenHight=window.screen.availHeight-150;
  var pos=getPosition(curRow);
  var rpos=getPosition(curRow)-window.scrollY;
  //curRow.cells[0].innerHTML='<div id="MyCursor">'+rpos+':'+window.scrollY+':'+screenHight+':'+window.screen.availTop+'</div>';
  if ( cnt>0 && rpos > screenHight/6*5 ) {window.scrollTo(0, pos - screenHight/2);}
  if ( cnt<0 && rpos < screenHight/6 )   {window.scrollTo(0, pos - screenHight/2);}
  if ( rpos > screenHight-50 || rpos < 0 )  {window.scrollTo(0, pos - screenHight/2);}
}
function getPosition(obj){
  var curtop=0;
  while (obj.offsetParent){curtop += obj.offsetTop;obj = obj.offsetParent;}
  curtop += obj.offsetTop;
  return curtop;
}
function hotKeyMail(evt) {
  var whichKey = evt.which;
  switch (whichKey) {
    case 97 : // a - reply all
      document.getElementsByName("MSignal_MC-CreateReply*U-1*"+msgID+"*Inbox*1*")[0].click();
    break;
    case 99 : // c - Compose
      location.assign(document.getElementsByTagName("a")[1].href);
    break;
    case 100 : // d - delete
      tStr=document.getElementById("MsgReadNavBar").rows[0].cells[2].innerHTML;
      tStr=tStr.replace(/<\/a>/g,"").substr(tStr.indexOf("&lt;&nbsp;&nbsp;")+32);
      location.assign( location.protocol + '//' + location.hostname +
                       tStr.substring(1,tStr.indexOf("title=")-2 )  );
    break;
    case 102 : // f - forward
      document.getElementsByName("MSignal_MC-CreateForward*U-1*"+msgID+"*Inbox*")[0].click();
    break;
    case 106 : // j - next message
      location.assign(document.getElementsByTagName("link")[1].href);
    break;
    case 107 : // k - previous message
      location.assign(document.getElementsByTagName("link")[0].href);
    break;
    case 109 : // m - back to inbox
      location.assign(document.getElementsByTagName("a")[0].href);
    break;
    case 114 : // r - reply
      document.getElementsByName("MSignal_MC-CreateReply*U-1*"+msgID+"*Inbox*0*")[0].click();
    break;
    case 117 : // u - back to inbox
      location.assign(document.getElementsByTagName("a")[0].href);
    break;
    default : null;
  }
}
function hotKeyInbox(evt) {
  var whichKey = evt.which;
  switch (whichKey) {
    case 0 : // 'Esc' - Escape
    break;
    case 13 : // 'Return' - open
      location.assign( location.protocol + '//' + location.hostname +
                       cc7.substring( cc7.indexOf('href=')+6, cc7.indexOf('title=')-2 ));
    break;
    case 33 : // ! - report spam
      document.getElementsByName("FMB-Action")[0].options[1].selected=true;
      document.getElementById("DoBtnId").click();	
    break;
    case 47 : // '/' - Search	8
      document.getElementsByName("FMB-ST")[0].focus();
    break;
    case 99 : // c - Compose
      location.assign(document.getElementsByTagName("a")[0].href);
    break;
    case 100 : // d - delete
      document.getElementsByName("FMB-Action")[0].options[0].selected=true;
      document.getElementById("DoBtnId").click();	
    break;
    case 106 : // j - cursor down
      GM_getValue('rc',0) < curRow.parentNode.parentNode.rows.length - 2 ? focusMove(1):null;
    break;
    case 107 : // k - cursor up
      GM_getValue('rc',0) > 0 ? focusMove(-1):null; break;
    break;
    case 111 : // o - open
      location.assign( location.protocol + '//' + location.hostname +
                       cc7.substring( cc7.indexOf('href=')+6, cc7.indexOf('title=')-2 ));
    break;
    case 120 : // x - select
      document.getElementsByName(msgID)[0].click();
      break;
    default : null;
  }
}

// *** Inbox ***
if ( document.getElementById("RowNum0") ){
  function searchBoxFocused(){searchOn=true;};
  function searchBoxblur(){searchOn=false;};
  
  document.getElementsByName("FMB-ST")[0].addEventListener("focus",searchBoxFocused,true);
  document.getElementsByName("FMB-ST")[0].addEventListener("blur",searchBoxblur,true);
  
  function shortcutkey_handler(event){if (event.ctrlKey!=1 && event.altKey!=1 
  	                                          // Check search is not used.
                                              && ! searchOn ) hotKeyInbox(event)};
  document.addEventListener('keypress', shortcutkey_handler, true); 
  
  document.getElementById("RowNum0").parentNode.parentNode.rows.length < GM_getValue('rc',0)+2 ? GM_setValue('rc',0) : null;
  var curRow=document.getElementById("RowNum"+GM_getValue('rc',0));
  // Create space for cursor
  var x=curRow.parentNode.parentNode.rows[0].insertCell(0);
  x.width="1%";
  curRow.parentNode.parentNode.rows[0].className="DatTh";
  for(i=1;i<curRow.parentNode.parentNode.rows.length;i++){
    x=curRow.parentNode.parentNode.rows[i].insertCell(0);
  }
  var cc1 = curRow.cells[1].innerHTML;
  var cc7 = curRow.cells[7].innerHTML;
  var msgID=cc1.substring( cc1.indexOf('name=')+6, cc1.indexOf('title=')-2 );
  focusMove(0);
}
// *** Mail ***
if ( document.getElementById("MsgReadNavBar") ){
  function shortcutkey_handler(event){if (event.ctrlKey!=1 && event.altKey!=1) hotKeyMail(event); };
  document.addEventListener('keypress', shortcutkey_handler, true); 
  msgID=document.getElementsByName("SMR-MsgId")[0].value;
}



