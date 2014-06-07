// ==UserScript==
// @name            Fix download
// @namespace       http://venj.me/greasemonkey/
// @description     Fix an error in non-IE browsers.
// @include         http://www.downloadindex.info/Get.asp?Id=*
function secBoard2(n) {
    return function () {
        var mainTable = document.getElementById("mainTable");
        var secTable = document.getElementById("secTable");
        for(i=0;i<secTable.tBodies[0].rows[0].cells.length;i++) 
            secTable.tBodies[0].rows[0].cells[i].className="sec1"; 
        secTable.tBodies[0].rows[0].cells[n].className="sec2"; 
        for(i=0;i<mainTable.tBodies.length;i++) 
            mainTable.tBodies[i].style.display="none"; 
        mainTable.tBodies[n].style.display="block"; 
    };
}

var secTable = document.getElementById("secTable");
for(i=0;i<secTable.tBodies[0].rows[0].cells.length;i++) {
    var cell = secTable.tBodies[0].rows[0].cells[i];
    cell.addEventListener("click",secBoard2(i), false);
}
// ==/UserScript==