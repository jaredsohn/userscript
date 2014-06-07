// ==UserScript==
// @name           Physics Forums - reply
// @namespace      www.dlugosz.com
// @description    Adjust "Reply to Thread" page
// @include        http://www.physicsforums.com/newreply.php*
// @include        http://www.physicsforums.com/private.php*
// @include        http://www.physicsforums.com/showthread.php*
// ==/UserScript==

var QR= document.getElementById ("vB_Editor_QR_textarea");
if (QR) {  // this is the "Quick Reply"
   QR.removeAttribute ("style");
   QR.setAttribute ("cols", "80");  // was 60.
   }
else {  // Main editing page
  var panelsurround= document.evaluate ("//td[@class='panelsurround']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  // get rid of ((align="center")) in this TD.
  panelsurround.removeAttribute ("align");
  var panel= panelsurround.getElementsByTagName ("DIV") [0];
  var innerdiv= panel.getElementsByTagName ("DIV") [0];
  // get rid of evil "640px"
  innerdiv.removeAttribute ("style");
  
  // let Title: be longer.  Set size to same as maxlength which is 85.
  var x= document.evaluate ("//input[@name='title']", panel, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  x.setAttribute ("size", "85");
  
  // kill the "smiles" panel.  If I cared about it, it could be moved below or
  // made into a pop-up instead.  Or just remove the animated ones.
  var smiles= document.getElementById ("vB_Editor_001_smiliebox");
  if (smiles) {
     smiles= smiles.parentNode;  // this is the TD that contains it.
     var TR= smiles.parentNode;  // the TR that contains the editor and smiles
     TR.removeChild (smiles);
     }
  
  // set things to full width, starting from the top so each can reference the
  // new size of the parent.  IOW, re-layout the thing.
  var x= innerdiv.getElementsByTagName ("table") [1];
  x.style.width= "100%";
  x= document.getElementById ("vB_Editor_001");
  x= x.getElementsByTagName ("table") [0];
  x.width= "100%";
  
  x= document.getElementById ("vB_Editor_001_textarea");
  // is hard-coded to 540px and also has a height in the same style attribute
  x.setAttribute ("style", "width:100%");  // remove height, let rows take precidence.
  x.setAttribute ("rows", "20");  // no reason to scrimp.
  }
