// ==UserScript==
// @name            DiscussionZone Trebuchet MS 
// @namespace       uzi/dztrebuchetms
// @description     Makes text Trebuchet MS
// @include         http://www.discussionzone.net/quickreply.php*
// @include         http://discussionzone.net/quickreply.php*
// @include         http://www.discussionzone.net/newreply.php*
// @include         http://discussionzone.net/newreply.php*
// @include         http://www.discussionzone.net/newthread.php*
// @include         http://discussionzone.net/newthread.php*
// @include         http://www.discussionzone.net/showthread.php*
// @include         http://discussionzone.net/showthread.php*
// @include         http://www.discussionzone.net/*
// @include         http://discussionzone.net/*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[font=Trebuchet MS]" + elmTextarea.value + "[/font]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;