// ==UserScript==
// @name            HackForums Limer
// @namespace       xerotic/hflimer22
// @description     Makes text lime.
// @include         http://www.fps-media.com/newreply.php*
// @include         http://fps-media.com/newreply.php*
// @include         http://www.fps-media.com/newthread.php*
// @include         http://fps-media.com/newthread.php*
// @include         http://www.fps-media.com/showthread.php*
// @include         http://fps-media.com/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=lime]" + elmTextarea.value + "[/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;