// ==UserScript==
// @name        HF Wizard Emotion
// @namespace   Cryptic [HF] UID=716331
// @description Wizard Emption for HackForums
// @include     http://www.hackforums.net/*
// @include     http://hackforums.net/*
// @version     1.0

// Credits to HF Script - HF Post Helper | xerotic

// ==/UserScript==

function form_submit(event) {
   var form = event ? event.target : this;
   var arTextareas = form.getElementsByTagName('textarea');
   for (var i = arTextareas.length - 1; i >= 0; i--) {
	   var elmTextarea = arTextareas[i];
		//Start making regexes and formatting them....
		//##Template:
		// elmTextarea.value = elmTextarea.value.replace(regex,replace);
		
		re = /\[wizard\]/gi;
		elmTextarea.value = elmTextarea.value.replace(re,"[img]http://www.en.kolobok.us/smiles/rpg/wizard.gif[/img]");
  }

   form._submit();
}

window.addEventListener('submit',form_submit, true);
HTMLFormElement.prototype._submit = HTMLFormElement.prototype.submit;
HTMLFormElement.prototype.submit = form_submit;