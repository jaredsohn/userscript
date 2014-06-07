// ==UserScript==
// @name           No evaluations
// @namespace      GUC
// @description    Allow you to view your transcript without doing evaluations
// @include        http://student.guc.edu.eg/external/student/grade/Transcript.aspx
// @author         Mohamed Ashraf
// ==/UserScript==

function main(){
    var text = document.getElementById("msgLbl");
    text.innerHTML = "<p></p>";
    var choose = document.getElementById("stdYrLst");
    choose.disabled = false;
    text.innerHTML = "<p>Evaluations have been blocked by script. Good Luck!!</p>";
}
main();
