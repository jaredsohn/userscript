//
// ==UserScript==
// @description   Overrides the information page time outs and automatically submits pages
// @name         driversed.com script 
// @include      https://driversed.com/trafficschool/courseware/html/html_page.aspx*
// ==/UserScript==
//

var timer1 = setTimeout("ctrlTimer_Complete()", 2000);
var timer2 = setTimeout("document.frm.submit()", 3000);
	