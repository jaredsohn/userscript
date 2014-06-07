// ==UserScript==
// @name        Adblock 2
// @namespace   http://localhost
// @description Removes Blocking ads
// @include     https://my.aui.ma/*


// @include     my.aui.ma/*
// @include     https://my.aui.ma/ICS/Students/Academic_Info.jnz?portlet=Grade_Report


// @version     1
// ==/UserScript==

function changeContent(){
var n = document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows.length;
//document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[5].innerHTML="1.89";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-8].cells[7].innerHTML="9.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-8].cells[2].innerHTML="B";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[5].innerHTML="3.57";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[4].innerHTML="57.01";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[4].innerHTML=(152.32).toFixed(2);
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[5].innerHTML="3.45";
//document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[2].innerHTML="D+";
//document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[7].innerHTML="3.99";

  

}

changeContent();
