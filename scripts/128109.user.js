// ==UserScript==
// @name            HackForums LMGTFY
// @namespace       tableflipper/lmgtfy
// @description     Easy way to LMGTFY links.
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
		var firstSplit = elmTextarea.value.split("[lmgtfy")[1];
		var url = firstSplit.split("]")[0].replace("=", "");
		var secondSplit = firstSplit.split("[/lmgtfy]")[0];
		var inside = secondSplit.split("]")[1];
		var output = "[url=http://www.lmgtfy.com?q=" + url.replace(/\s/g,'+') + "]" + inside + "[/url]";
	    elmTextarea.value = output;
   }
   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;