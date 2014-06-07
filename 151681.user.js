// ==UserScript==
// @name            ForumKorner TAHOMA BLACK
// @namespace       theb/wftahomeblack3
// @description     Makes text Tahoma black at ForumKorner
// @include         http://www.forumkorner.net/newreply.php*
// @include         http://forumkorner.net/newreply.php*
// @include         http://www.forumkorner.net/newthread.php*
// @include         http://forumkorner.net/newthread.php*
// @include         http://www.forumkorner.net/showthread.php*
// @include         http://forumkorner.net/showthread.php*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[color=#000000][font=Trebuchet MS]" + elmTextarea.value + "[/font][/color]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;