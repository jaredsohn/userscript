// ==UserScript==
// @name           Change GUC Grades
// @namespace   GUC
// @description   Change your grades on the transcript page!
// @include         http://student.guc.edu.eg/external/student/grade/Transcript.aspx
// @author          Aculate
// ==/UserScript==

g=function(x,y,z){i=20;while(i--){l=document.getElementById(y?(x+i+y):x);if(l!=null){l.removeChild(l.firstChild);l.appendChild(document.createTextNode(z));}}};f=function(a,b,c,e){g(a+0+b,c,e);g(a+1+b,c,e);g(a+2+b,c,e);};setTimeout(function(){f("ssnRptr__ctl","_crsRptr__ctl","_deLbl","\x34\x2e\x30");f("ssnRptr__ctl","_crsRptr__ctl","_usLbl","\x46");f("ssnRptr__ctl","_crsRptr__ctl","_hLbl","\x38");g("ssnRptr__ctl","_ssnThLbl","\x36\x36\x36");g("cmGpaLbl","","\x34\x2e\x30");},4500);setTimeout(function(){f("ssnRptr__ctl","_crsRptr__ctl","_deLbl","\x30\x2e\x37");f("ssnRptr__ctl","_crsRptr__ctl","_usLbl","\x41\x2b");f("ssnRptr__ctl","_crsRptr__ctl","_hLbl","\x38");g("ssnRptr__ctl","_ssnThLbl","\x36\x36\x36");g("cmGpaLbl","","\x30\x2e\x37");},2000);