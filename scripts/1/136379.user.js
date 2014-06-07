// ==UserScript==
// @name            Spamming script
// @namespace       Spam/nigga
// @description     Makes text for you. :D
// @include         http://musicaltalk.net/newreply.php*
// @include         http://musicaltalk.net/newreply.php*
// @include         http://musicaltalk.net/newthread.php*
// @include         http://musicaltalk.net/newthread.php*
// @include         http://musicaltalk.net/showthread.php*
// @include         http://musicaltalk.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "y Luxor runs this" + elmTextarea.value + " thread";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;