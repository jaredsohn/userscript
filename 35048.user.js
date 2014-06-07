// ==UserScript==
// @name            Auto-Select Inputs and Textareas
// @description	    When Mouseover A Input or Textarea, It's Content Will Be Auto-Selected.
// @author          sfufoet
// @version         0.1
// @date            2008-10-06
// @namespace       http://blog.loland.net/2008/10/06/62.et
// @include         *
// ==/UserScript==

var inputs = document.getElementsByTagName('input');	
for(var i=0;i<inputs.length;i++){
	inputs[i].addEventListener("mouseover", function(){
		 this.focus();
		 this.select();
	} , false);
}

inputs = document.getElementsByTagName('textarea');	
for(var i=0;i<inputs.length;i++){
	inputs[i].addEventListener("mouseover", function(){
		 this.focus(); 
		 this.select(); 
	} , false);
}