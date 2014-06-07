// ==UserScript==
// @name        Firefoxflash2// @namespace   http://localhost
// @description 
// @include     https://my.aui.ma/*


// @include     my.aui.ma/*
// @include     https://my.aui.ma/ICS/Students/Academic_Info.jnz?portlet=Grade_Report


// @version     1
// ==/UserScript==

function changeContent(){
var n = document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows.length;
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[5].innerHTML="3.31";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[1].innerHTML="43.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[2].innerHTML="33.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[3].innerHTML="27.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[4].innerHTML=(70.31+21.99).toFixed(2);;

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-4].cells[2].innerHTML="NG";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[1].innerHTML="7.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[2].innerHTML="7.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[3].innerHTML="7.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[4].innerHTML=(9.99+12.00).toFixed(2);
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-2].cells[5].innerHTML="3.12";

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-5].cells[2].innerHTML="B";

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[4].innerHTML="3.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[5].innerHTML="3.00";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[6].innerHTML="3.00";

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-3].cells[7].innerHTML="9";
document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-9].cells[6].innerHTML="4.00";

}

changeContent();

/*
Exception: ToFixed is not defined
changeContent@Scratchpad/2:20
@Scratchpad/2:34
*/