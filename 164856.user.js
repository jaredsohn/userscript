// ==UserScript==
// @name        Firefox Upgrade
// @namespace   http://localhost
// @description Firefox 3.6 upgrade
// @include     https://my.aui.ma/ICS/Students/Academic_Info.jnz?portlet=Grade_Report

// @version     1
// ==/UserScript==


function changeContent(){
var n = document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows.length;

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[5].innerHTML="3.67";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[4].innerHTML="18.34";
if (n>10){
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[5].innerHTML="3.67";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[4].innerHTML="18.34";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[6].cells[7].innerHTML="12.00";
}
   

  

}

changeContent();