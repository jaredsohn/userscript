// ==UserScript==
// @name           JK
// @namespace      ~msn
// @description    j & k keys scroll comments
// @include        http://www.metafilter.com/mefi/*
// @include        http://ask.metafilter.com/mefi/*
// @include        http://metatalk.metafilter.com/mefi/*
// ==/UserScript==

// Global XPaths
COMMENTSpath    = "/html/body/div[@id='page']/div[@class='copy' or @class='comments']";  
 AUTHORsubPath  = "span/a[1]/text()";
 LINKsubPath    = "span/a[2]/@href";
COMMENTboxPath  = "/html/body/div[@id='page']/form/table/tbody/tr[2]/td[2]/textarea[@id='comment']";
 if ('metatalk.metafilter.com' == document.location.host)  // WTF??
  {COMMENTboxPath = "/html/body/form/table/tbody/tr[2]/td[2]/textarea[@id='comment']";     
   COMMENTSpath    = "html/body/div[@class='copy' or @class='comments']"; 
  }
ANCESTORcomment = 
 "ancestor-or-self::div[(@class='copy' or @class='comments') and not(ancestor-or-self::form)]";

// other Globals
SELECTEDbackgroundColor 
 = 'rgb(0,84,135)';     // blue MeFi is (0,102,153), now (0,-18,-18) dimmer

// styling
PANid = 'CMTPanel';
GM_addStyle('#' + PANid + ' {z-index: 1000; position: fixed; right: 0; bottom: 0; padding: 3px; font-size: small; color: rgb(0,0,0); background-color: rgb(255, 255, 200)}');
GM_addStyle('.CMT {color: rgb(0,0,0); font-size: small;} '
            + '#CMTNoHelp {font-weight: bold; color: rgb(255,255,255); background-color: rgb(255,0,0)}');

COMMENTS = new Array();

function Main(e){
 // JK additions
 var commentsSnap = XPOrderedSnap(document, COMMENTSpath);
  for (var i=0; i < commentsSnap.snapshotLength; i++)
   COMMENTS[i] = commentsSnap.snapshotItem(i);
 document.addEventListener("keyup", keyPress, false);
 selectComment(COMMENTS[0]);

 COMMENTbox = XPFirst(document,COMMENTboxPath); 
// addPanel();
// document.addEventListener("mouseup", bodyClick, false);
}


function findPosY(obj){  // from: www.quirksmode.org/js/findpos.html
 var curtop = 0;
 if (obj.offsetParent){
  while (obj.offsetParent){
   curtop += obj.offsetTop
   obj = obj.offsetParent;
   }
  }
 else if (obj.y)
  curtop += obj.y;
 return curtop;
}
function keyPress(e){
 if (e.target)
  if (XPFirst(e.target, "ancestor-or-self::form")) return;
 if ((e.keyCode != 75) && (e.keyCode != 74)) return;
 var cidx;   // = COMMENTS.indexOf(SELECTEDcomment);
 var viewY = window.scrollY;
  for (i=0; i < COMMENTS.length; i++) {
   var posY = findPosY(COMMENTS[i]);
    if (posY == viewY){
     cidx = i;
     break;
     }
    if (posY > viewY){
     cidx = i+1;
     break;
     }
   }
// GM_log("\n "+ e.target + ' cidx ' + cidx + ' selected comment ' + SELECTEDcomment);
 if ((e.keyCode == 75) & (cidx > 0)){    //k
  cidx--;
  selectComment(COMMENTS[cidx]);
  SELECTEDcomment.wrappedJSObject.scrollIntoView();
 }
 if ((e.keyCode == 74) & (cidx < COMMENTS.length - 1)){  //j
    cidx++;
  selectComment(COMMENTS[cidx]);
  SELECTEDcomment.wrappedJSObject.scrollIntoView();
 }
}
function searchDown(e){
 if (e) e.target.blur();
 var viewY = window.scrollY+1;   // +1 added for slashdot bug ???
  for (i=0; i < HEADERS.length; i++)
   if (findPosY(HEADERS[i]) > viewY)
    return HEADERS[i].wrappedJSObject.scrollIntoView();
//  window.scrollTo(0, document.body.offsetHeight); // go to botton if no later header
 window.scrollByPages(1);
}
   

// XPath functions:
function XPFirst(node, xpath){
 return document.evaluate(xpath, node, null,XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function XPOrderedSnap(node, xpath){
 return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
// all 'id's in the node become global variables
function globalVariablizeIds (node){ 
 var snap = XPOrderedSnap(node, 'descendant-or-self::*/@id');
  for (var i=0; i < snap.snapshotLength; i++)
   {var id = snap.snapshotItem(i).nodeValue;
     window[id] = document.getElementById(id);
    }
}
function addPanel (){
 PAN = document.createElement('div');
 PAN.id = PANid;
 function button (id, show, bName, title){
  var html = '<button id="' + id + '"';
   html += (show)?'':' style="display: none;"';
   html += ' title="' + title + '">' + bName + '</button>';
   return html;
  }
 PAN.innerHTML
 = '<div id="CMTHelpPan" style="display: none; width: 20em">'
 +  '<div style="border: thin solid blue; padding: 5px">'
 +   '<span style="position: absolute; top: 4px; right: 4px;">'
 +    button("CMTNoHelp", 1, "X", "hide help")
 +   '</span>'
 +   '<b>Comment Helper</b>'
 +   '<p class="CMT">To see the action of a button just move the mouse cursor over it.</p>'
 +   '<p class="CMT">Clicking inside a comment will highlight it and activate the <b>A</b> and <b>S</b> buttons.</p>'
 +   '<p class="CMT">Selecting text with the mouse (within a comment) will additionally activate the <b>T</b> button.</p>'
 +   '<p class="CMT">You can also customize the wrappers around what the <b>A</b> and <b>T</b> buttons append to the comment posting box.</p>'
 +   '<div><span><b>A</b>uthor link parameters: </span>'
 +    '<div style="margin: .5em">'
 +     '<table class="CMT">'
 +       '<tr><td>prefix </td><td><input id="CMTap" type="text" size="25"></td></tr>'
 +       '<tr><td>suffix </td><td><input id="CMTas" type="text" size="25"></td></tr>'
 +     '</table>'
 +    '</div>'
 +   '</div>'
 +   '<div><span>Quoted <b>T</b>ext parameters: </span>'
 +    '<div style="margin: .5em">'
 +     '<table class="CMT">'
 +       '<tr><td>prefix </td><td><input id="CMTtp" type="text" size="25"></td></tr>'
 +       '<tr><td>suffix </td><td><input id="CMTts" type="text" size="25"></td></tr>'
 +     '</table>'
 +    '</div>'
 +   '</div>'
 +  '</div>'
 + '</div>'
 + '<div id="CMTButtons"><span>'
 +   button("CMTHelp",       1, '?', "display usage information and options")
 +   button("CMTAddAuthor",  0, 'A', "add comment author #link to posting comment box")
 +   button("CMTAddText",    0, 'T', "add selected text to posting comment box")
 +   button("CMTGoComment",  1, 'R', "scroll to reply box")
 +   button("CMTGoSelected", 0, 'S', "scroll to selected comment")
 + '</span></div>';
 document.body.appendChild(PAN);
 globalVariablizeIds(PAN);
 setWrappers();
 function addClick(node, func){
  node.addEventListener("click", func, false);}
 addClick(CMTHelp,       showHelp);
 addClick(CMTNoHelp,     hideHelp);
 addClick(CMTAddAuthor,  addAuthor);
 addClick(CMTAddText,    addText);
 addClick(CMTGoComment,  goComment);
 addClick(CMTGoSelected, goSelected);
}
WRAPPERS = 
 {CMTap: '<b>#', CMTas: '</b>: ', CMTtp: '<i>', CMTts: '</i> '};

function setWrappers(){
 var wraps = eval(GM_getValue('wraps', uneval(WRAPPERS)));
  for (wrapId in wraps)
   {window[wrapId].value = wraps[wrapId];
    window[wrapId].addEventListener("change", saveWrappers, false);
   }
}
function saveWrappers(e){
 for (wrapId in WRAPPERS)
  WRAPPERS[wrapId] = window[wrapId].value;
 GM_setValue('wraps', uneval(WRAPPERS));
}
function hide(node){
 node.style.display = 'none';
}
function unHide(node){
 node.style.display = '';
}
SELECTEDcomment = null;

// not triggered by the "click" event but by "mouseup" because "click" is funny
function bodyClick(e){
 function superComment (node){
  return XPFirst(node, ANCESTORcomment);
  }
 var sel = window.getSelection();
  if (0 == sel.rangeCount)            // virgin button click
   return;                            // exit
  var range = sel.getRangeAt(0);
   if (range.collapsed)               // empty selection
    hide(CMTAddText);                 // deactive T button 
   var rsC = superComment(range.startContainer);
   var reC = superComment(range.endContainer);
    if (!rsC || !reC || (rsC != reC)) // range not inside a comment
     return hide(CMTAddText);         // deactive T button and exit
    if (!range.collapsed)
     unHide(CMTAddText);              // activate T button for non-empty selection.
    selectComment(rsC);
     unHide(CMTAddAuthor);
    unHide(CMTGoSelected);   
}
function selectComment(node){
// if (SELECTEDcomment)
//  SELECTEDcomment.style.backgroundColor = "";
// node.style.backgroundColor = SELECTEDbackgroundColor;
 SELECTEDcomment = node;
}

function showHelp(e){
 e.target.blur();
 unHide(CMTHelpPan);
 hide(CMTHelp);
}
function hideHelp(e){
 hide(CMTHelpPan);
 unHide(CMTHelp);
}
function goComment(e){
 e.target.blur();
 COMMENTbox.wrappedJSObject.scrollIntoView();
}
function goSelected(e){
 e.target.blur();
 SELECTEDcomment.wrappedJSObject.scrollIntoView();
}
function addAuthor(e){
 e.target.blur();
 var authorName = XPFirst(SELECTEDcomment, AUTHORsubPath).nodeValue;
 var linkN = XPFirst(SELECTEDcomment, LINKsubPath);
  var link = (linkN)?linkN.nodeValue:null;
   if(!link || !link.match(/#/))
    link = document.location.pathname + '#page';  // for main post
   COMMENTbox.value 
    += CMTap.value + '<a href="' + link + '">' + authorName + '</a>' + CMTas.value;
 unsafeWindow.prev(); // make addition show up in preview
}
function addText(e){
 e.target.blur();
 var sel = window.getSelection();
  var range = sel.getRangeAt(0);
   COMMENTbox.value += CMTtp.value + CMTHTML(range)  + CMTts.value;
 unsafeWindow.prev(); // make addition show up in preview
}
// inner html of the range without any <br>s because there are also CRLFs.
function CMTHTML(range){
 var tempDiv = document.createElement('div');
  tempDiv.appendChild(range.cloneContents());
  var html = tempDiv.innerHTML.replace(/<br>/g, '');
   return html;
}
// this may just be superstition, but I've had problems with
// XPath giving out-of-memory errors, and this sort of delay
// seems to fix them.
window.addEventListener('load', Main, false);


