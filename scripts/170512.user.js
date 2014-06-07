// ==UserScript==
// @name            DiverseBox Script
// @namespace       DiverseBox Posts
// @description     DiverseBoxStyle post
// @include         http://www.diversebox.net/newreply.php*
// @include         http://diversebox.net/newreply.php*
// @include         http://www.diversebox.net/newthread.php*
// @include         http://diversebox.net/newthread.php*
// @include         http://www.diversebox.net/showthread.php*
// @include         http://diversebox.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#01c1c1][font=Times New Roman][size=medium]" + elmTextarea.value + "[/size][/font][/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;