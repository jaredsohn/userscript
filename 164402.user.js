// ==UserScript==
// @name       D2Jsp Auto Redirector #2
// @version    0.1
// @description  Auto Redirector #2
// @match      http://*/index.php?act=report*
// @copyright  2012+, MrSithSquirrel
// ==/UserScript==



function clickConfirmButton(e) {
 var buttons = document.getElementsByTagName('button');
 var clicked = false;
 for (var index=0; index < buttons.length; index++){
  if(buttons[index].textContent == "Back To Post"){
   buttons[index].click();
   clicked = true;
   break;
  }
 }
 if(!clicked){
  setTimeout("window.location.reload()",300*1000);
 }
}
clickConfirmButton();