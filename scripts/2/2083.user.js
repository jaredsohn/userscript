// YAHOO! Mail Keyboard Shortcuts
// version 0.9.4
// 2006-03-01
// Copyright (c) 2005, Jun Makino
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
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
//   Fix - Bug 'o' doesn't work when any email in inbox has attachment.
// 0.9.1
//   Fix - Bug with HTML entity code in Ref.
//   Fix - Bug 'j' in the oldest mail opened.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Yahoo! Mail Keyboard Shortcuts
// @namespace     http://junmakino.fastmail.fm
// @description   Enable Gmail-like keyboard shortcuts on Yahoo! Mail.
// @include       http*://*.mail.yahoo.com/ym/*
// //@exclude       
// ==/UserScript==
var msgID,msgRef,tStr,searchOn=false;

function focusMove(cnt) {
  GM_setValue('rc',GM_getValue('rc',1)+cnt);
  curRow.cells[0].innerHTML=null;
  curRow=document.getElementById("datatable").rows[GM_getValue('rc',1)];
  cc = curRow.cells[curRow.cells.length-3].innerHTML;
  curRow.cells[0].innerHTML="&gt;"
  
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
function entity2ascii( inString ){
	var outString=inString;
	outString=outString.replace(/&lt;/g,'<');   
	outString=outString.replace(/&gt;/g,'>');   
	outString=outString.replace(/&amp;/g,'&');  
	outString=outString.replace(/&quot;/g,'"'); 
	outString=outString.replace(/&nbsp;/g,' '); 
	return outString;
}
function findHref(inString,inKeyWord){
	var outString, inx,jnx;
	for(i=0;i<inString.length-10;i++){
	  inx=inString.indexOf('href=',i)+6;
	  if (inx!=(-1+6)){
	    jnx=inString.indexOf('"',inx);
	    outString=entity2ascii(inString.substring(inx,jnx));
	    if( outString.indexOf(inKeyWord) != -1 && outString.search(/^http/) == -1 ) return outString;
	    i=jnx;
	  }
	  else break;
    }
    return -1;
}
function hotKeyInbox(evt) {
  var whichKey = evt.which;
  switch (whichKey) {
    case 0 : // 'Esc' - Escape
    break;
    case 13 : // 'Return' - open
      var tURI=entity2ascii(cc.substring( cc.indexOf('href=')+6, cc.indexOf('">')));
      location.assign( location.protocol + '//' + location.hostname + tURI );
    break;
    case 33 : // ! - report spam
      document.getElementById("spamtop").click();	
    break;
    case 47 : // '/' - Search	8
      document.getElementById("searchquery0").focus();
    break;
    case 99 : // c - Compose
      document.getElementsByTagName("button")[1].click();	
    break;
    case 100 : // d - delete
      document.getElementById("deletetop").click();	
    break;
    case 102 : // f - forward
      document.getElementById("forwardbottom").click();
    break;
    case 106 : // j - cursor down
      if ( inBoxPage && GM_getValue('rc',1) < curRow.parentNode.parentNode.rows.length - 1 ) focusMove(1);
      else {
        var tURI=findHref(document.getElementById("mobile").parentNode.innerHTML,"NEXT");
        if( tURI != -1 ) location.assign( location.protocol + '//' + location.hostname + tURI );
      }
    break;
    case 107 : // k - cursor up
      if ( inBoxPage && GM_getValue('rc',1) > 1 ) focusMove(-1);
      else {
        var tURI=findHref(document.getElementById("mobile").parentNode.innerHTML,"PREV");
        if( tURI != -1 ) location.assign( location.protocol + '//' + location.hostname + tURI );
      }
    break;
    case 109 : // m - back to inbox
      document.getElementsByTagName("button")[0].click();	
    break;
    case 111 : // o - open
      var tURI=entity2ascii(cc.substring( cc.indexOf('href=')+6, cc.indexOf('">')));
      location.assign( location.protocol + '//' + location.hostname + tURI );
    break;
    case 114 : // r - reply
      document.getElementById("replybottom").click();
    break;
    case 117 : // u - back to inbox
      document.getElementsByTagName("button")[0].click();	
    break;
    case 120 : // x - select
      document.getElementsByName("Mid")[GM_getValue('rc',1)-1].click();
      break;
    default : null;
  }
}
  function searchBoxFocused(){searchOn=true;};
  function searchBoxblur(){searchOn=false;};
  
  document.getElementById("searchquery0").addEventListener("focus",searchBoxFocused,true);
  document.getElementById("searchquery0").addEventListener("blur",searchBoxblur,true);
  document.getElementById("searchquery1").addEventListener("focus",searchBoxFocused,true);
  document.getElementById("searchquery1").addEventListener("blur",searchBoxblur,true);
  
  
  function shortcutkey_handler(event){ if ( event.ctrlKey!=1 && event.altKey!=1 && ! searchOn ) hotKeyInbox(event); };
  document.addEventListener('keypress', shortcutkey_handler, true); 

  if ( document.getElementById("datatable") ){
  	var inBoxPage=true;
    var curRow=document.getElementById("datatable").rows[GM_getValue('rc',1)];
    // Create space for cursor
    var x=curRow.parentNode.parentNode.rows[0].insertCell(0);
    x.width="1%";
    for(i=1;i<curRow.parentNode.parentNode.rows.length;i++){
      x=curRow.parentNode.parentNode.rows[i].insertCell(0);
    }
    var cc = curRow.cells[curRow.cells.length-3].innerHTML;
    focusMove(0);
  }
  else inBoxPage=false;


