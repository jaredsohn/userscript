// ==UserScript==
// @name            LeakForums White Text
// @namespace       text/lfwhite
// @description     Makes text white.
// @include         http://www.leakforums.org/newreply.php*
// @include         http://leakforums.org/newreply.php*
// @include         http://www.leakforums.org/newthread.php*
// @include         http://leakforums.org/newthread.php*
// @include         http://www.leakforums.org/showthread.php*
// @include         http://leakforums.org/showthread.php*
// @include	    http://www.leakforums.org/private.php?action=read*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#FFFFFF]" + elmTextarea.value + "[/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;