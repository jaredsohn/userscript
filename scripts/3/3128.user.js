// ==UserScript==
// @name           Scroll to Headers
// @namespace      http://www.telerama.com/~mcguire/us
// @description    prototype example: adds panel with buttons to scroll to previous or next header from top of viewport.
// @include        *
// ==/UserScript==

// change the XPath below to select your "header" nodes
HEADERSpath = 'html/body//h1|//h2|//h3|//h4|//h5|//h6';

function XPOrderedSnap(node, xpath){
 return document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
HEADERS = new Array;

GM_addStyle('#hsPanel {position: fixed; padding: 3px; background-color: rgb(255, 255, 200)}');

function addPanel(){
 var headersSnap = XPOrderedSnap(document, HEADERSpath);
  if (!headersSnap) return;
  for (var i=0; i < headersSnap.snapshotLength; i++)
   HEADERS[i] = headersSnap.snapshotItem(i);  // could mung here if needed
 PAN = document.createElement('div');
  PAN.id = 'hsPanel';
  PAN.innerHTML
   = '<button id="hsDown"   title="scroll to earlier header">&#8595;</button>'
   + '<button id="hsUp"     title="scroll to later header">&#8593;</button>'
   + '<button id="hsRotate" title="rotate this panel position">&#8635;</button>';
  document.body.appendChild(PAN);
  rotatePanel(); // to give an initial position
  function addClick(id, func){
   document.getElementById(id).addEventListener("click", func, false);}
  addClick("hsDown",   function(e){ searchDown(e);});
  addClick("hsUp",     function(e){   searchUp(e);});
  addClick("hsRotate", function(e){rotatePanel(e);});
  if (HEADERS.length == 0){
    function hideB (id){
     document.getElementById(id).style.display = 'none';}
    hideB('hsDown');
    hideB('hsUp');
    }
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
function searchDown(e){
 if (e) e.target.blur();
 var viewY = window.scrollY;
  for (i=0; i < HEADERS.length; i++)
   if (findPosY(HEADERS[i]) > viewY)
    return HEADERS[i].wrappedJSObject.scrollIntoView();
}
function searchUp(e){
 if (e) e.target.blur();
 var viewY = window.scrollY;
  for (i=HEADERS.length-1; i > -1; i--)
   if (findPosY(HEADERS[i]) < viewY)
    return HEADERS[i].wrappedJSObject.scrollIntoView();
}
PANpos = -1;

function rotatePanel(e){
 if (e) e.target.blur();
 PANpos = (PANpos+1) % 4;
  var vs = [['0px','','','0px'],
            ['0px','0px','',''],
            ['','0px','0px',''],
            ['','','0px','0px']][PANpos];
   var pS = PAN.style;
    pS.left =   vs[0];
    pS.top =    vs[1];
    pS.right =  vs[2];
    pS.bottom = vs[3];
}

// this may just be superstition, but I've had problems with
// XPath giving out-of-memory errors, and this sort of delay
// seems to fix them.
window.addEventListener('load', function(e){addPanel();}, false);
