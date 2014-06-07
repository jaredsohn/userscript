// --------------------------------------------------------------------------
// ==UserScript==
// @name           FIX UPLOAD EXTRACTION SYSTEM
// @description    fix download page
// @include        http://www.downloadindex.info
// ==/UserScript==
//
// --------------------------------------------------------------------------


unsafeWindow.secBoard= function(n) {
    var secTable=document.getElementById("secTable");
    var mainTable=document.getElementById("mainTable");
    for(i=0;i<secTable.rows[0].cells.length;i++) 
      secTable.rows[0].cells[i].className="sec1"; 
    secTable.rows[0].cells[n].className="sec2"; 
    for(i=0;i<mainTable.tBodies.length;i++) 
      mainTable.tBodies[i].style.display="none"; 
    mainTable.tBodies[n].style.display="block"; 
};
