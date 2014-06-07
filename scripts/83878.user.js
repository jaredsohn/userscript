// ==UserScript==
// @name           Not A ReaLiker
// @namespace      thecohenoam.co.cc
// @description    Shows the Not A ReaLike button near every page like button, by clicking it all the invisable content become visable!
// @include        https://www.facebook.com/pages/*
// ==/UserScript==

if (window.addEventListener)
{
  window.addEventListener('load', myFunction, false);
} 
else if (window.attachEvent)
{
  window.attachEvent('onload', myFunction);
}

function myFunction()
{
	document.getElementById('mainbuttonspan').innerHTML = document.getElementById('mainbuttonspan').innerHTML += '&nbsp;<label class="mlm mainButton uiButton"><input id="notarealike" type="button" value="Not A ReaLike"a></label>';
	document.getElementById('notarealike').addEventListener('click', notarealike, false);
}

function notarealike()
{
	alert('The hidden content should now be visable.\nThank you for NotAReaLiking...\n\nThis scripts has been developed by theCoheNoam\nnoam@thecohenoam.co.cc');
	for(i in x=document.getElementsByTagName("span")) if(x[i].style.visibility=="hidden") void(x[i].style.visibility="visible"); for(i in x=document.getElementsByTagName("span")) if(x[i].style.visibility=="hidden") void(x[i].style.visibility="visible");
}