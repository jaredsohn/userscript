// ==UserScript==
// @name           peereview
// @namespace      C:\Program Files\Mozilla Firefox\15418.user.js
// @include        http://peereview.huji.ac.il/
// ==/UserScript==

document.getElementsByName('course')[0].value='77318';
document.getElementsByName('studentname')[0].value=document.getElementsByName('instructorname')[0].value;
document.getElementsByName('studentpassword')[0].value=document.getElementsByName('instructorpassword')[0].value;
document.getElementsByName('submit')[1].click();
document.getElementsByTagName('form')[0].style.visibility='hidden';
document.body.innerHTML+='<p style="font-size:20pt;color:red;position:absolute;top:10px;">Please Wait... Logging in as "'+document.getElementsByName('instructorname')[0].value+'"</p>';

