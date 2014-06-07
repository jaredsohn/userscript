// ==UserScript==
// @name            FPS Media Tahoma White
// @namespace       xerotic/hftahomawhite2
// @description     Makes text Tahoma white.
// @include         http://www.FPS-Media.com/newreply.php*
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
	   elmTextarea.value = "[color=#FFFFFF][font=Tahoma]" + elmTextarea.value + "[/font][/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;