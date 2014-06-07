// ==UserScript==
// @name             free leaks Electric Blue
// @namespace       1337/flelectricbluefont
// @description     Makes text electric blue.
// @include         http://www.free-leaks.com/newreply.php*
// @include         http://free-leaks.com/newreply.php*
// @include         http://www.free-leaks.com/newthread.php*
// @include         http://free-leaks.com/newthread.php*
// @include         http://www.free-leaks.com/showthread.php*
// @include         http://free-leaks.com/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#42cffd]" + elmTextarea.value + "[/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;