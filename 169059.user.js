// ==UserScript==
// @name        Firefoxflash// @namespace   http://localhost
// @description Changes my nounoursa gpa
// @include     https://my.aui.ma/*


// @include     my.aui.ma/*
// @include     https://my.aui.ma/ICS/Students/Academic_Info.jnz?portlet=Grade_Report


// @version     1
// ==/UserScript==

function changeContent(){
var n = document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows.length;
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[5].innerHTML="2.92";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[3].innerHTML="70.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[4].innerHTML="204.4";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[2].innerHTML="B+";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[7].innerHTML="6.99";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[4].innerHTML=(9.00+8.10+6.00+6.60).toFixed(2);
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[5].innerHTML="1.98";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[2].innerHTML="C";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[4].innerHTML="3.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[5].innerHTML="3.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[6].innerHTML="3.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[7].innerHTML="6.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-8].cells[2].innerHTML="B-";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-8].cells[7].innerHTML="8.10";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-9].cells[4].innerHTML="4.00";
  document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-9].cells[6].innerHTML="4.00";

}

changeContent();

/*
Exception: ToFixed is not defined
changeContent@Scratchpad/2:20
@Scratchpad/2:34
*/