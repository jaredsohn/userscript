//
// ==UserScript==
// @name 	LLoydsTSB online login nbsp remover
// @description 	Removes spaces from the lloydstsb online login memorable word field
// @include 	*secure2.lloydstsb.co.uk*
// ==/UserScript==
//


document.getElementById('formFieldInner').innerHTML=document.getElementById('formFieldInner').innerHTML.replace("&nbsp;","");