// ==UserScript==
// @name           auto-circle-stream
// @description    Automatically switches to one-circle stream
// @include        https://plus.google.com/
// @include        https://plus.google.com/stream*
// ==/UserScript==

as = document.getElementsByTagName('a');
as_length = as.length;

for(i=0; i<=as_length; i++)
{
	if(as[i].innerHTML == 'mainstream')
	{
		as[i].click();
	}
}