// ==UserScript==
// @name           Redirect to Course Admin
// @namespace      http://courses.jonesinternational.edu/admin/school/index.jkg?sid=4*
// @description    Whenever you hit the index page, automatically go to the course admin page.  Huge timesaver
// @include        http://courses.jonesinternational.edu/admin/school/index.jkg?sid=4*
// ==/UserScript==

top.frames[1].location.href = 'http://courses.jonesinternational.edu/admin/school/course/CourseMain.php?sid=4';
function Jomo () {
  top.frames[1].document.getElementById('Ref').focus();
}
if (window.addEventListener){
  window.addEventListener("load", Jomo, false);
}
else if (window.attachEvent){
  window.attachEvent("onload", Jomo);
}