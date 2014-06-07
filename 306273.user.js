// ==UserScript==
// @name        HTML Input Order
// @namespace   tabindex
// @include 	http*
// @description Order input fiels by tabindex from top to bottom.
// @version     1.0.1
// ==/UserScript==

var nh_inputs = document.getElementsByTagName("*");
for (it=0; it<nh_inputs.length;it++)
{
	if (nh_inputs[it]=="[object HTMLInputElement]" || nh_inputs[it]=="[object HTMLSelectElement]" || nh_inputs[it]=="[object HTMLTextAreaElement]") 
		nh_inputs[it].tabIndex = (it+1);
}