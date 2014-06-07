// ==UserScript==
// @name            Chobots.net Forum Userscript ~Created by Navy
// @namespace       xerotic/hftahomaelectricblue
// @description     Makes text Tahoma and Electric Blue.
// @include         http://chobots.net/newreply.php*
// @include         http://chobots.net/forum/newreply.php*
// @include         http://chobots.net/forum/newthread.php*
// @include         http://chobots.net/newthread.php*
// @include         http://chobots.net/showthread.php*
// @include         http://chobots.net/forum/newthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[b][color=#42cffd][font=Arial]" + elmTextarea.value + "[/font][/color][/b]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;