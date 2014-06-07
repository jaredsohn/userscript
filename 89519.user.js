// ==UserScript== 
// @name           test4
// @include        * 
// 
// @resource       jQuery               http://code.jquery.com/jquery-1.4.3.js
// @resource       jQueryUI             https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.6/jquery-ui.min.js 
// ==/UserScript== 



(function() { 
  var head = document.getElementsByTagName('head')[0]; 
  var script = document.createElement('script'); 
  script.type = 'text/javascript'; 
  var jQuery = GM_getResourceText('jQuery'); 
  var jQueryUI = GM_getResourceText('jQueryUI'); 
  script.innerHTML = jQuery + jQueryUI; 
  head.appendChild(script); 
  $ = unsafeWindow.$; 
})(); 
$(document).ready(function() { 


( function() {

//============================= User Config ===============================================
const DIV_OPACITY    =   0.90; // between 0 and 1
const DEFAULT_POS    =   2;    // 1=top-left / 2=top-right / 3=bottom-left / 4=bottom-right
const RESET_KEYCODE  =  19;    // 19=VK_PAUSE
const SHOW_AT_START  =   1;    // 0=no / 1=if storage used / 2=if storage available / 3=yes
const SHOW_AT_CHANGE =   1;    // 0=no / 1=yes

const COLOR_TITLE       = '#AAAAFF';
const COLOR_TITLE_TEXT  = '#666666';
const COLOR_UNAVAILABLE = '#FF8888';
const COLOR_PROTECTED   = '#FFAA44';
const COLOR_NOT_USED    = '#88CCCC';
const COLOR_USED        = '#44FF44';
const COLOR_INFO_TEXT   = '#000000';
const COLOR_CLOSE       = '#CCCCDD';
const COLOR_CLOSE_TEXT  = '#000000';
const COLOR_BG_SESSION  = '#444400';
const COLOR_BG_LOCAL    = '#220066';
const COLOR_BG_GLOBAL   = '#225522';

//=========================================================================================
//=========================================================================================
//=========================================================================================
const FONT_COURIER_NEW    = '"Courier New", Courier, monospace';
const FONT_ARIAL          = 'Arial, Tahoma, Helvetica, sans-serif';
const DIV_HEIGHT          = 18;
const DIV_ZINDEX          = 999999999;
const KEY_DIV_WIDTH       = 250;

//=============================== Compatibility Routines ==================================
var gvar=function() {}; if(typeof(unsafeWindow)=='undefined') { unsafeWindow=window; }
if(typeof(GM_log)=='undefined') { GM_log=function(msg) { if((typeof(unsafeWindow.console)!='undefined') && (typeof(unsafeWindow.console.log)!='undefined')) { unsafeWindow.console.log(msg); } }; }
if(window.navigator.appName.match(/^opera/i) && typeof(window.opera)!='undefined') { gvar.isOpera=true; GM_log=window.opera.postError; } else { gvar.isOpera=false; }

//=============================== Useful Routines =========================================
// void show_alert(message :string[,display :int] ) => Log and display a message
// display: 0=console only / 1=top of document / 2=bottom of document
function show_alert(msg, display) {
  if(arguments.callee.counter>=0) { arguments.callee.counter++; } else { arguments.callee.counter=0; }
  GM_log('['+arguments.callee.counter+'] '+msg);
  if(display==1 || display==2) {
    warningelem=document.createElement('div');
    warningelem.setAttribute("style","color:#FFFFFF; background:#FF8000; width:auto; text-align:center; font-size:24px; border: 3px solid #CC0088; margin:2px; background:#FF8800; color:#000000;");
    warningelem.textContent=msg;
    if(display==1) { document.body.insertBefore(warningelem, document.body.firstChild); }
    else { document.body.appendChild(warningelem); }
  }
}

function isDefined(x)   { return !(x == null && x !== null); }
function isUndefined(x) { return x == null && x !== null;    }
function removeElement(el) { el.parentNode.removeChild(el); }
function replaceElement(el,nel) { var elp=el.parentNode; var eln=el.nextSibling; elp.removeChild(el); elp.insertBefore(nel,eln); }
function user_select(element,value) {
  var els = element.style;
  if(!els) { return; }
  if(isDefined(els.userSelect)) {els.userSelect=value;} // CSS3
  else if (isDefined(els.MozUserSelect)) {els.MozUserSelect=value;} // Mozilla
  else if (isDefined(els.webkitUserSelect)) {els.webkitUserSelect=value;} // WebKit
  else if (isDefined(els.OUserSelect)) {els.OUserSelect=value;} // Opera
}
function getKeyCode(event) {
  var key=event.keyCode;
  if(gvar.isOpera) { if(key>96 && key<123) { key=key-32; } } // key.toUpperCase();
  if(event.ctrlKey)  { key=key+1000; }
  if(event.shiftKey) { key=key+2000; }
  if(event.altKey)   { key=key+4000; }
  if(event.metaKey)  { key=key+8000; }
  return key;
}

//============================== Storage routines ========================================
function sessionStorageType() {
  var res=''; try { res=typeof(unsafeWindow.sessionStorage) } catch(e) { res='Error'; } // Catch Security error
  return res;
}
function localStorageType() {
  var res=''; try { res=typeof(unsafeWindow.localStorage)   } catch(e) { res='Error'; } // Catch Security error
  return res;
}
function globalStorageType() {
  var res=''; try { res=typeof(unsafeWindow.globalStorage)   } catch(e) { res='Error'; } // Catch Security error
  return res;
}
function databaseStorageType() {
  var res=''; try { res=typeof(unsafeWindow.openDatabase)   } catch(e) { res='Error'; } // Catch Security error
  return res;
}

function sessionStorageLength() {
  var lg=0; try { lg=unsafeWindow.sessionStorage.length; } catch(e) { lg='Unreadable'; } // Catch Security error
  return lg;
}
function localStorageLength()   {
  var lg=0; try { lg=unsafeWindow.localStorage.length; } catch(e) { lg='Unreadable'; } // Catch Security error
  return lg;
}
function globalStorageLength() {
  var lg=0; try { lg=unsafeWindow.globalStorage[location.hostname].length; } catch(e) { lg='Unreadable'; } // Catch Security error
  return lg;
}
function databaseStorageLength() {
  var lg=0;
  for(var name in unsafeWindow) {
    //show_alert(name+" "+unsafeWindow[name],1);
    try { if(unsafeWindow[name]=="[object Database]") { lg+=1; } } catch(e) {} // Catch Security error
  }
  if(lg==0 && unsafeWindow.opera) { return 'Available'; }
  return lg;
}

//=============================== Main functions =========================================
function keyPressed(event) {
  var keyCode=getKeyCode(event);
  if(keyCode==RESET_KEYCODE) {
    resetPos();
    refresh();
    refresh_data();
    gvar.infoBox.style.setProperty('display','block','');
  }
}

function hideInfoBox(event) {
  gvar.infoBox.style.setProperty('display','none','');
}

function downTitleInfoBox(event) {
  if(event.button!=0) { gvar.moveM=false; return; }
  gvar.offX=event.screenX-gvar.infoBox.offsetLeft;
  gvar.offY=event.screenY-gvar.infoBox.offsetTop;
  gvar.moveM=true;
}
function upTitleInfoBox(event) {
  gvar.moveM=false;
}
function moveTitleInfoBox(event) {
  if(gvar.moveM) {
    gvar.infoBox.style.left=(event.screenX-gvar.offX)+'px';
    gvar.infoBox.style.top =(event.screenY-gvar.offY)+'px';
    gvar.infoBox.style.removeProperty('right');
    gvar.infoBox.style.removeProperty('bottom');
  }
}

function resetPos() {
  gvar.infoBox.style.removeProperty('left');
  gvar.infoBox.style.removeProperty('right');
  gvar.infoBox.style.removeProperty('top');
  gvar.infoBox.style.removeProperty('bottom');
  switch(DEFAULT_POS) {
    case 1: gvar.infoBox.style.setProperty('left' ,'3px',''); gvar.infoBox.style.setProperty('top'   ,'3px',''); break;
    default:
    case 2: gvar.infoBox.style.setProperty('right','3px',''); gvar.infoBox.style.setProperty('top'   ,'3px',''); break;
    case 3: gvar.infoBox.style.setProperty('left' ,'3px',''); gvar.infoBox.style.setProperty('bottom','3px',''); break;
    case 4: gvar.infoBox.style.setProperty('right','3px',''); gvar.infoBox.style.setProperty('bottom','3px',''); break;
  }
}

function storageEvent(event) {
  //show_alert('Storage Event');
  refresh();
  refresh_data();
  if(SHOW_AT_CHANGE) { gvar.infoBox.style.setProperty('display','block',''); }
}

function refresh() {
  function refreshStorage(ws,lgS,divS,divSitem,cbaf) {
    if((ws=='object') || (cbaf && ws=='function')) {
      if(lgS>=0) {
        divSitem.style.setProperty('text-align','right','');
        divSitem.style.setProperty('padding-right','6px','');
        divSitem.textContent=lgS+' item(s)';
        if(lgS>0) { divS.style.setProperty('background',COLOR_USED,''); } else { divS.style.setProperty('background',COLOR_NOT_USED,''); }
      } else {
        divSitem.style.setProperty('text-align','left','');
        divSitem.style.setProperty('padding-right','0','');
        divSitem.textContent=lgS;
        if(lgS=='Available') {
          divS.style.setProperty('background',COLOR_NOT_USED,'');
        } else {
          divS.style.setProperty('background',COLOR_PROTECTED,'');
        }
      }
    } else {
      divSitem.style.setProperty('text-align','left','');
      divSitem.style.setProperty('padding-right','0','');
      if(ws=='Error') {
        divSitem.textContent='Protected';
        divS.style.setProperty('background',COLOR_PROTECTED,'');
      } else if(ws=='undefined') {
        divSitem.textContent='Unavailable';
        divS.style.setProperty('background',COLOR_UNAVAILABLE,'');
      } else {
        divSitem.textContent='Bad type';
        divS.style.setProperty('background',COLOR_UNAVAILABLE,'');
      }
    }
  }
  // Show Data
  refreshStorage(sessionStorageType() ,sessionStorageLength() ,gvar.divSS,gvar.divSSitem,false);
  refreshStorage(localStorageType()   ,localStorageLength()   ,gvar.divLS,gvar.divLSitem,false);
  refreshStorage(globalStorageType()  ,globalStorageLength()  ,gvar.divGS,gvar.divGSitem,false);
  refreshStorage(databaseStorageType(),databaseStorageLength(),gvar.divDS,gvar.divDSitem,true);
}

//========================
function sessionStorageDisplayEvent(e) {
  e.preventDefault();
  storageDisplay(0);
}

function localStorageDisplayEvent(e) {
  e.preventDefault();
  storageDisplay(1);
}

function globalStorageDisplayEvent(e) {
  e.preventDefault();
  storageDisplay(2);
}

function storageDisplay(storageId) {
  if(gvar.overlay!=null) { return; }
  gvar.storageId=storageId; gvar.storage=null; gvar.name='N/A'; var lg='N/A'; var bg='#000000'; var title='';
  switch(storageId) {
    case 0:
      lg=sessionStorageLength(); bg=COLOR_BG_SESSION; gvar.name='sessionStorage'; title=gvar.name+' [ this page ]';
      if(lg>=0) { gvar.storage=unsafeWindow.sessionStorage; } else { lg='no'; }
    break;
    case 1:
      var domain=location.protocol+'//'+location.hostname; if(location.port!='') { domain+=':'+location.port; }
      lg=localStorageLength(); bg=COLOR_BG_LOCAL; gvar.name='localStorage'; title=gvar.name+' [ '+domain+'/* ]';
      if(lg>=0) { gvar.storage=unsafeWindow.localStorage; } else { lg='no'; }
    break;
    case 2:
      lg=globalStorageLength(); bg=COLOR_BG_GLOBAL; gvar.name='globalStorage'; title=gvar.name+' [ '+location.hostname+' ]';
      if(lg>=0) { gvar.storage=unsafeWindow.globalStorage[location.hostname]; } else { lg='no'; }
    break;
  }

  gvar.overlay = document.createElement('div');
  gvar.overlay.setAttribute('style','position:fixed; top:0; bottom:0; left:0; right:0; height:100%; width:100%; background:'+bg+'; opacity:0.5; overflow:auto; z-index:'+(DIV_ZINDEX-2));
  document.body.appendChild(gvar.overlay);

  gvar.panel = document.createElement('div');
  gvar.panel.setAttribute('style','position:fixed; top:8px; bottom:8px; left:0; right:0; margin-left:auto; margin-right:auto; width:800px; z-index:'+(DIV_ZINDEX-1)+'; background:'+bg+'; color:#FFFFFF; overflow:auto; font-family:'+FONT_ARIAL+'; font-size:15px; font-weight:normal; text-decoration:none; line-height:15px;');

  var pdiv=document.createElement('div');
  pdiv.setAttribute('style','position:absolute; left:0; right:0; padding:20px; padding-left:14px; padding-right:0px; text-align:left;');
  gvar.panel.appendChild(pdiv);

  // Title...
  var tabElem=document.createElement('table');
  tabElem.setAttribute('style','width:760px; border-collapse:collapse; border:0; margin:0; padding:0;');
  var tr=document.createElement('tr');
  var td1=document.createElement('td'); tr.appendChild(td1);
  td1.setAttribute('style','border:0; margin:0; padding:0;');
  var td2=document.createElement('td'); tr.appendChild(td2);
  td2.setAttribute('style','width:100%; border:0; margin:0; padding:0;');
  var td3=document.createElement('td'); tr.appendChild(td3);
  td3.setAttribute('style','border:0; margin:0; padding:0;');
  tabElem.appendChild(tr); pdiv.appendChild(tabElem);

  var elem=document.createElement('input'); elem.setAttribute('type','button');
  elem.setAttribute('style','width:80px; padding:4px; background: #C0C0C0 !important; color:#000000 !important; border-width:1px; cursor: pointer;');
  elem.value='Reset';
  elem.addEventListener('click', panel_clear, true);
  if(gvar.storage==null) { elem.style.setProperty('visibility','hidden',''); }
  td1.appendChild(elem);

  var titleElem=document.createElement('div');
  titleElem.setAttribute('style','padding:4px; background:transparent !important; color:#FFFFFF !important; text-align:center; font-size:20px;');
  titleElem.textContent=title; td2.appendChild(titleElem);

  elem=document.createElement('input'); elem.setAttribute('type','button');
  elem.setAttribute('style','width:80px; padding:4px; background: #C0C0C0 !important; color:#000000 !important; border-width:1px; cursor: pointer;');
  elem.value='Close';
  elem.addEventListener('click', panel_close, true);
  td3.appendChild(elem);

  // Editor...
  var newElem=document.createElement('div');
  newElem.setAttribute('style','width:100%; margin-top:20px;');

  var div=document.createElement('div');
  div.setAttribute('style','position:relative; display:block; margin-top:3px; color:black; height:30px; font-family:'+FONT_ARIAL);
  newElem.appendChild(div);
  var divC=document.createElement('div');
  divC.setAttribute('style','position:absolute; left:0px; top:0; width:26px; height:18px; padding:0px; text-align:center; font-size:9px; padding-top:4px; background:rgba(192,192,192,0.8); border:1px solid gray; cursor:pointer;');
  divC.textContent='Clear';
  div.appendChild(divC);
  var div1=document.createElement('textarea');
  div1.setAttribute('style','position:absolute; left:30px; top:0; width:'+(KEY_DIV_WIDTH+2)+'px; height:18px; padding:2px; margin:0px; margin-top:1px; border:0px; font-size:15px; background:rgba(255,255,255,0.75);');
  div1.value='';
  div.appendChild(div1);
  var div2=document.createElement('textarea');
  div2.setAttribute('style','position:absolute; left:'+(KEY_DIV_WIDTH+38)+'px; top:0; width:'+(704-KEY_DIV_WIDTH)+'px; height:18px; padding:2px; margin:0px; margin-top:1px; border:0px; font-size:15px; background:rgba(255,255,255,0.75);');
  div2.value='';
  div.appendChild(div2);
  var divS=document.createElement('div');
  divS.setAttribute('style','position:absolute; left:748px; top:0; width:24px; height:18px; padding:0px; text-align:center; font-size:9px; padding-top:4px; background:rgba(192,192,192,0.8); border:1px solid gray; cursor:pointer;');
  divS.textContent='Save';
  div.appendChild(divS);
  newElem.appendChild(div);
  pdiv.appendChild(newElem);

  gvar.editKey=div1;
  gvar.editData=div2;
  divC.addEventListener('click', clear_Edit, true);
  divS.addEventListener('click', save_Edit, true);
  
  // Data...
  gvar.dataElem=document.createElement('div');
  gvar.dataElem.setAttribute('style','position:relative; left:0; right:0;');
  pdiv.appendChild(gvar.dataElem);

  document.body.appendChild(gvar.panel);
  refresh_data();
}

function clear_Edit(e) {
  e.preventDefault();
  gvar.editKey.value='';
  gvar.editData.value='';
}

function save_Edit(e) {
  e.preventDefault();
  switch(gvar.storageId) {
    case 0: case 1: case 2:
      gvar.storage.setItem(gvar.editKey.value,gvar.editData.value);
      clear_Edit(e);
  }
}

function fill_Edit(e) {
  e.preventDefault();
  var id=parseInt(e.target.textContent,10);
  gvar.editKey.value=gvar.storage.key(id);
  gvar.editData.value=gvar.storage.getItem(gvar.editKey.value);
}

function panel_close(e) {
  e.preventDefault();
  if(gvar.overlay!=null) { removeElement(gvar.overlay); gvar.overlay=null; removeElement(gvar.panel); gvar.panel=null; }
}

function panel_clear(e) {
  e.preventDefault();
  if(gvar.storage!=null) {
    if(confirm('Clear all '+gvar.name+' data ?')) { gvar.storage.clear(); }
  }
}

function refresh_data() {
  if(!gvar.storage) { return; }
  if(!gvar.dataElem) { return; }

  var lg=0;
  switch(gvar.storageId) {
    case 0: lg=sessionStorageLength(); break;
    case 1: lg=localStorageLength(); break;
    case 2: lg=globalStorageLength(); break;
  }
  if(!(lg>=0)) { return; }

  var newElem=document.createElement('div');
  newElem.setAttribute('style','width:100%; margin-top:10px;');

  var div=document.createElement('div');
  div.setAttribute('style','position:relative; display:block; margin-top:3px;');
  newElem.appendChild(div);
  var div1=document.createElement('div');
  div1.setAttribute('style','position:relative; left:0; top:0; width:24px; height:17px; padding:2px; text-align:center; background:rgba(255,255,255,0.4);');
  div1.textContent='#';
  div.appendChild(div1);
  var div2=document.createElement('div');
  div2.setAttribute('style','position:absolute; left:30px; top:0; width:'+KEY_DIV_WIDTH+'px; height:17px; padding:2px; padding-left:4px; background:rgba(255,255,255,0.4);');
  div2.textContent='Key';
  div.appendChild(div2);
  var div3=document.createElement('div');
  div3.setAttribute('style','position:absolute; left:'+(KEY_DIV_WIDTH+38)+'px; top:0; width:'+(702-KEY_DIV_WIDTH)+'px; height:17px; padding:2px; padding-left:4px; background:rgba(255,255,255,0.4);');
  div3.textContent='Data';
  div.appendChild(div3);
  newElem.appendChild(div);

  for(var h=0;h<lg;h++) {
    var key=gvar.storage.key(h);
    if(typeof key=='undefined') { key='<undefined>'; }
    var data=gvar.storage.getItem(key);
    if(typeof data=='undefined') { data='<undefined>'; }

    var div=document.createElement('div');
    div.setAttribute('style','position:relative; display:block; margin-top:3px;');
    var div1=document.createElement('div');
    div1.setAttribute('style','position:relative; left:0; top:0; width:24px; height:17px; text-align:right; padding:2px; background:rgba(255,255,255,0.2); font-size:13px; cursor:pointer;');
    div1.textContent=h;
    div.appendChild(div1);
    var div2=document.createElement('div');
    div2.setAttribute('style','position:absolute; left:30px; top:0; width:'+(KEY_DIV_WIDTH+2)+'px; height:17px; padding:2px; background:rgba(255,255,255,0.2); font-size:13px; overflow:hidden;');
    div2.textContent=key;
    div.appendChild(div2);
    var div3=document.createElement('div');
    div3.setAttribute('style','position:absolute; left:'+(KEY_DIV_WIDTH+38)+'px; top:0; width:'+(704-KEY_DIV_WIDTH)+'px; height:17px; padding:2px; background:rgba(255,255,255,0.2); font-size:13px; overflow:hidden;');
    div3.textContent=data;
    div.appendChild(div3);
    var div4=document.createElement('div');
    div4.setAttribute('style','position:absolute; left:748px; top:0; width:10px; height:15px; text-align:center; padding:2px; background:rgba(128,128,128,0.8); border:1px solid gray; color:#660000; font-weight:bold; cursor:pointer;');
    div4.textContent='X';
    div4.setAttribute('value',key);
    div.appendChild(div4);
    div4.addEventListener('click',deleteItem,true);
    newElem.appendChild(div);

    div1.addEventListener('click', fill_Edit, true);
  }
  replaceElement(gvar.dataElem,newElem);
  gvar.dataElem=newElem;
}

function deleteItem(event) {
  event.preventDefault();
  if(!gvar.storage) { return; }
  var key=event.target.getAttribute('value');
  if(confirm('Delete '+key+' ?')) { gvar.storage.removeItem(key); }
}


/******************************************** License ******************************************************
*** Creative Commons 3.0                                                                                 ***
*** by: BY-attribution (Requirement to acknowledge or credit the author "GIJoe")                         ***
*** nc: Non-Commercial (Use for commercial purpose is forbidden)                                         ***
*** sa: Share Alike    (Derivative works must be under the same or similar license to this one)          ***
***********************************************************************************************************/

function main() {
  // Check if html page with div or table or link...
  var check=null; try { check=document.evaluate('//div',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(e) {}
  if(!check) { try { check=document.evaluate('//table',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(e) {} }
  if(!check) { try { check=document.evaluate('//a',document,null,XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue; } catch(e) {} }
  if(!check) { return; }

  // Create infoBox
  var top1=DIV_HEIGHT+1; var htot=(DIV_HEIGHT+1)*5+1;
  var infoBox=document.createElement('div');
  infoBox.setAttribute('style','position:fixed; display:none; width:149px; height:'+htot+'px; opacity:'+DIV_OPACITY+'; right:3px; top:3px; background:'+COLOR_TITLE+'; color:'+COLOR_INFO_TEXT+'; white-space:nowrap; text-align:center; vertical-align:middle; overflow:auto; z-index:'+DIV_ZINDEX+'; font-family:'+FONT_ARIAL+' !important; font-size:15px; font-weight:normal; text-decoration:none; line-height:17px;');

  var div5=document.createElement('div');
  div5.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0; left:0px; right:0px; border:1px solid gray; cursor: move; font-weight:bold; padding-right:'+DIV_HEIGHT+'px; color:'+COLOR_TITLE_TEXT);
  div5.textContent='Storage Viewer';
  user_select(div5,'none');
  infoBox.appendChild(div5);
  var div6=document.createElement('div');
  div6.setAttribute('style','position: absolute; display :block; height:'+(DIV_HEIGHT-4)+'px; width:'+(DIV_HEIGHT-4)+'px; top:2px; right:2px; border:1px solid gray; cursor:pointer; background:'+COLOR_CLOSE+'; font-size:13px; line-height:14px; color:'+COLOR_CLOSE_TEXT);
  div6.textContent='X';
  user_select(div6,'none');
  infoBox.appendChild(div6);

  var divSS=document.createElement('div');
  divSS.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:'+top1+'px; left:0; right:0; border:1px solid gray; cursor:pointer;');
  var divSS1=document.createElement('div');
  divSS1.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; left:2px;');
  divSS1.textContent='Session:';
  divSS.appendChild(divSS1);
  var divSS2=document.createElement('div');
  divSS2.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; right:0; width:86px; text-align:left;');
  divSS2.textContent='N/A';
  divSS.appendChild(divSS2);
  infoBox.appendChild(divSS);

  var divLS=document.createElement('div');
  divLS.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:'+(top1*2)+'px; left:0; right:0; border:1px solid gray; cursor:pointer;');
  var divLS1=document.createElement('div');
  divLS1.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; left:2px;');
  divLS1.textContent='Local:';
  divLS.appendChild(divLS1);
  var divLS2=document.createElement('div');
  divLS2.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; right:0; width:86px; text-align:left;');
  divLS2.textContent='N/A';
  divLS.appendChild(divLS2);
  infoBox.appendChild(divLS);

  var divGS=document.createElement('div');
  divGS.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:'+(top1*3)+'px; left:0; right:0; border:1px solid gray; cursor:pointer;');
  var divGS1=document.createElement('div');
  divGS1.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; left:2px;');
  divGS1.textContent='Global:';
  divGS.appendChild(divGS1);
  var divGS2=document.createElement('div');
  divGS2.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; right:0; width:86px; text-align:left;');
  divGS2.textContent='N/A';
  divGS.appendChild(divGS2);
  infoBox.appendChild(divGS);

  var divDS=document.createElement('div');
  divDS.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:'+(top1*4)+'px; left:0; right:0; border:1px solid gray; cursor:default;');
  var divDS1=document.createElement('div');
  divDS1.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; left:2px;');
  divDS1.textContent='DB:';
  divDS.appendChild(divDS1);
  var divDS2=document.createElement('div');
  divDS2.setAttribute('style','position: absolute; display :block; height:'+DIV_HEIGHT+'px; top:0px; right:0; width:86px; text-align:left;');
  divDS2.textContent='N/A';
  divDS.appendChild(divDS2);
  infoBox.appendChild(divDS);


  gvar.infoBox=infoBox; gvar.divSS=divSS; gvar.divSSitem=divSS2; gvar.divLS=divLS; gvar.divLSitem=divLS2;
  gvar.divGS=divGS; gvar.divGSitem=divGS2; gvar.divDS=divDS; gvar.divDSitem=divDS2;
  document.body.appendChild(infoBox);

  gvar.moveM=false;
  div5.addEventListener('mousedown',downTitleInfoBox, true);
  window.addEventListener('mouseup',upTitleInfoBox, true);
  window.addEventListener('mousemove',moveTitleInfoBox, true);
  div6.addEventListener('click', hideInfoBox, true);
  
  divSS.addEventListener('click', sessionStorageDisplayEvent, true);
  divLS.addEventListener('click', localStorageDisplayEvent  , true);
  divGS.addEventListener('click', globalStorageDisplayEvent , true);

  if(gvar.isOpera) {
    window.addEventListener('keypress',keyPressed,true);
  } else {
    window.addEventListener('keydown',keyPressed,true);
  }
  resetPos();

  var used=false;
  if(SHOW_AT_START>2) { gvar.infoBox.style.setProperty('display','block',''); }
  else if(SHOW_AT_START>1 && (sessionStorageLength()>=0 || localStorageLength()>=0)) { gvar.infoBox.style.setProperty('display','block',''); }
  else if(SHOW_AT_START>0 && (sessionStorageLength()>0  || localStorageLength()>0 )) { gvar.infoBox.style.setProperty('display','block',''); }

  unsafeWindow.addEventListener('storage', storageEvent, true);
  refresh();
}

function waitForReady(callback) {
  var docState=null; try { docState=unsafeWindow.document.readyState; } catch(e) { docState=null; }
  if(docState) {
    if(docState!='complete') {
      GM_log('Document not loaded ('+docState+'), waiting...',0);
      window.setTimeout(waitForReady,150,callback); return;
    } else { GM_log('Document loaded ('+docState+'), launching...',0); }
  }
  callback();
}

waitForReady(main);

})();
// ]]>



  var res=''; try { res=typeof(unsafeWindow.globalStorage)   } catch(e) { res='Error'; } // Catch Security error
  alert(res);



$('head').append('<link rel="stylesheet" href="http://martin-tomasek.test.effectix.com/analyza/css/smoothness/jquery-ui-1.8.6.custom.css" type="text/css" media="all">');
  $('<div title="Test">jjkhhkjhkj</div>').dialog(); 
}); 

