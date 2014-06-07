// ==UserScript==
// @name            LeakForums :ohya: Support
// @namespace       xerotic/lftrebuchetms (Edited by Komet to add the smiley face)
// @description     Add the :ohya: smiley face to the beginning of your post
// @match          *://*.leakforums.org/newreply*
// @match          *://*.leakforums.org/newthread*
// @version         1.0
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[img]http://i.imgur.com/3pnTy1b.gif[/img]" + elmTextarea.value + "";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;