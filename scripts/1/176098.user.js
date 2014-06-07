// ==UserScript==
// @name            Sinister.ly Blue & Center
// @namespace       Bluescreen/bluecenter
// @description     Makes text blue. Stolen from HF <3
// @include         http://www.sinister.ly/newreply.php*
// @include         http://sinister.ly/newreply.php*
// @include         http://www.sinister.ly/newthread.php*
// @include         http://sinister.ly/newthread.php*
// @include         http://www.sinister.ly/showthread.php*
// @include         http://sinister.ly/showthread.php*
// @version         1.0
// ==/UserScript==
 
function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
       var elmTextarea = arTextareas[i];
       elmTextarea.value = "[color=#4682B4][align=center]" + elmTextarea.value + "[/align][/color]"  + elmTextarea.value + "Kind regards, Bluescreen.";
   }
 
   form._submit();
}
 
window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;