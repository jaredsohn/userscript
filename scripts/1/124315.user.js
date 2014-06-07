// ==UserScript==
// @name            HackForums Purple
// @namespace       Jaxon/hfbluefont
// @description     Makes text blue .
// @include         http://www.hackforums.net/newreply.php*
// @include         http://hackforums.net/newreply.php*
// @include         http://www.hackforums.net/newthread.php*
// @include         http://hackforums.net/newthread.php*
// @include         http://www.hackforums.net/showthread.php*
// @include         http://hackforums.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#0fd1aa]" + elmTextarea.value + "[/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;