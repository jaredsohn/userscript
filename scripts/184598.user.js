// ==UserScript==
// @name        Spatry's Cup of Linux Custom Font Userscript
// @namespace   Mocha / MochaJS (On iRC)
// @description Change your text to whatever you please by simply editing the script.  (In this example we'll have Arial text.)
// @include     http://www.cupoflinux.com/BB/index.php
// @include     http://www.cupoflinux.com/BB/post.php*
// @version     1
// @grant       none
// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
	   elmTextarea.value = "[b][color=#42cffd]" + elmTextarea.value + "[/color][/b]";
   }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;