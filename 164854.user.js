// ==UserScript==
// @name        Rimii
// @namespace   http://localhost
// @description for Rimiiiiii onlyyyyyyy
// @include     https://my.aui.ma/ICS/Students/Academic_Info.jnz?portlet=Grade_Report

// @version     1
// ==/UserScript==

function changeContent(){
var n = document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows.length;

document.getElementById("pg0_V_rptCourseList_ctl00_dgCourseList").rows[n-1].cells[5].innerHTML="3.67";

   

  

}

changeContent();