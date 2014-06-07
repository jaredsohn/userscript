// ==UserScript==
// @name           Rearrange Available Wars
// @namespace      mw3
// @description    Rearranges the Available Wars table, putting the Select buttons at the right, closer to the View/... buttons.
// @include        http://www.crimsonleafgames.com/MW3TR/Default.aspx
// ==/UserScript==

function rearrangeAvailableWars(){
  var wn = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_GridView1") // TABLE
                   .firstChild;

  while(wn.nodeName != 'TBODY') wn = wn.nextSibling; // find the TBODY

  var wn = wn.firstChild;

  while(wn){
    if(wn.nodeName == 'TR'){
      var wn1 = wn.firstChild;
      // TH nodes in the table heading, TD in the table body
      while((wn1.nodeName != 'TH') && 
            (wn1.nodeName != 'TD')) wn1 = wn1.nextSibling; // find the first TD, with the Select button
      var wn2 = wn.lastChild;
      while((wn1.nodeName != 'TH') &&
            (wn1.nodeName != 'TD')) wn2 = wn2.previousSibling; // find the last TD
      if( ((wn1.nodeName == 'TH') && (wn1.textContent.charCodeAt(0)     == 160    )) ||
          ((wn1.nodeName == 'TD') && (wn1.firstChild.nodeName           == 'INPUT'))   ){
        wn1 = wn.removeChild(wn1);                           // remove TD from first position
        wn.insertBefore(wn1, wn2.nextSibling); // insert the Select button at the end
        if(wn1.nodeName == 'TD'){
          wn1.firstChild.addEventListener("onclick",
                                          function(e){rearrangeAvailableWarsAgain();},
                                          false);
        }
      }
    }
    wn = wn.nextSibling;
  }
  // Move the Resign button away from the other buttons:
  var rb = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_m_oResignFromWar");
  var rbTD = rb.parentNode;
  rbTD.style.height = "250px";
  var oTR = document.getElementById("ctl00_ctl00_GamePanel_MW3TR_GamePanel_GridView1")
                    .parentNode  // DIV
                    .parentNode  // TD
                    .parentNode; // TR
  oTR.style.verticalAlign = 'top';
}

function rearrangeAvailableWarsAgain(){
  rearrangeAvailableWars();
  window.setTimeout("rearrangeAvailableWarsAgain()", 500);
}
unsafeWindow.rearrangeAvailableWarsAgain = rearrangeAvailableWarsAgain;

rearrangeAvailableWarsAgain();