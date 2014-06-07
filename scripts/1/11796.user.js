// ==UserScript==
// @name           UVM Class Search Enhancer
// @namespace      *uvm.edu*
// @description    Modifies the class search to be more user-friendly and turns it into a much more valuable tool.
// @include        https://aisweb1.uvm.edu/*
// ==/UserScript==
if(document.getElementsByName('sel_subj')[1] != null) {
	(document.getElementsByName('sel_subj'))[1].size="12";
	(document.getElementsByName('sel_subj'))[1].multiple="yes";
}

//Fixes the annoying 'must click button to search again' bug.
//also could just set submitcount to 0, but I wanted to override the function. just cuz. 
unsafeWindow.checkSubmit = function() {
	return true;
} 


	