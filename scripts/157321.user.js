// ==UserScript==
// @name        Series remover for score11
// @namespace   seiesremover
// @description Blendet serien auf score11.de aus
// @include     http://sc*11.de/movies.php*
// @version     1
// ==/UserScript==
var a = document.getElementsByTagName("table")[5].getElementsByTagName("table")[0].getElementsByTagName("tr"), pattern ='(Californication|Sherlock|(TV-Serie)|(TV series)|Sherlock|TV Series|How I Met Your Mother|The Big Bang Theory|TV-Series)';
for(var i = 4; i < a.length; i++) 
{
	if(a[i].textContent.match(pattern)) 
	{
		a[i].parentNode.removeChild(a[i]);
		i--;
	}
}