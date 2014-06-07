// ==UserScript==
// @name           Make GitHub Blob pages full width
// @namespace      https://bitbucket.org/deadlydog/greasemonkeyscripts
// @description    Makes the GitHub Blob page span the full width of the browser.
// @include        https://github.com/*/blob/*
// @grant          none
// @version        1.1
// ==/UserScript==

elements = document.getElementsByClassName('container hentry');
for (index = 0; index < elements.length; index++)
{
	elements[index].style.width="95%";	// Only 95% to leave room for text in the margins.
}

elements = document.getElementsByClassName('frames');
for (index = 0; index < elements.length; index++)
{
	elements[index].style.width="100%";
}

elements = document.getElementsByClassName('frame frame-center');
for (index = 0; index < elements.length; index++)
{
	elements[index].style.width="100%";
}
