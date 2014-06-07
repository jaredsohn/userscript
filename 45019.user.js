// ==UserScript==
// @author		Petr Kalivoda
// @name			Facebook spam-story filter
// @namespace	http://www.facebook.com/profile.php?id=1023859919
// @description	Hides quizes or all the stories published by external applications
// @include 		http://www.facebook.com/*home.php*
// @version		1.0
// ==/UserScript==

/*defines what kinds of applications are filtered,
this is the only possible configuration for now, if you want
for example not to filter applications, change FILTER_APPLICATIONS
to false.
*/
const FILTER_QUIZES = true;
const FILTER_APPLICATIONS = true;

function hide()
{
	/*first we get an array of elements possibly containing an unwanted story,
	every story's body is in a div element of UIIntentionalStory_Body */
	var els = document.getElementsByClassName("UIIntentionalStory_Body");
	/*then we loop these elements and we hide every one which is considered
	an unwanted story. */
	for(var q = 0; q <= els.length -1; q++)
	{
		if(FILTER_APPLICATIONS === true && els[q].innerHTML.indexOf('facebook.com/apps') >= 0)  els[q].parentNode.parentNode.style.display = 'none';
		if(FILTER_QUIZES === true && els[q].innerHTML.indexOf('quiz.applatform.com') >= 0)  els[q].parentNode.parentNode.style.display = 'none';
	}
}

if(window.addEventListener)
{
	window.addEventListener('load', function()
	{
		hide(); //this is for the first load of html body
		document.getElementsByTagName('body')[0].addEventListener('DOMSubtreeModified', hide, true); //this is for any change of HTML body, for example AJAX reloads or clicking on "Older Posts".
	},true);
}/* there will be code for Microsoft Anal Explorer, don't uncomment this.
else if(window.attachEvent)
{
	window.attachEvent('onload', function()
	{
		var el = document.getElementsByTagName('body')[0];
		el.attachEvent('onload', hide);
	})	
}*/



	

