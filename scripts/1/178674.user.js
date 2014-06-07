// ==UserScript==
// @name        HN Fix Expired Link
// @namespace   Pi
// @description Adds a link to home page on the expired link page, with an optional auto redirect feature
// @include     https://news.ycombinator.com/x?fnid=*
// @include     http://news.ycombinator.com/x?fnid=*
// @version     1.0
// ==/UserScript==


if(document.body.children.length == 0 && document.body.textContent.indexOf("Unknown or expired link") >= 0)
{
	function changeRedirectSettings()
	{
		var isChecked = GM_getValue('autoRedirect', false);
		GM_setValue('autoRedirect', !isChecked);
		if(!isChecked)
			location.href = homePageURL;
	}
	

	var protocol = location.href.indexOf("https:") >= 0 ? "https" : "http";
	var homePageURL =  protocol + "://news.ycombinator.com";

	var isChecked = GM_getValue('autoRedirect', false); 

	var homeLink = document.createElement('a');
	if(homeLink)
	{
		homeLink.innerHTML = "<br> Go to the Homepage";
		homeLink.href = homePageURL;
		document.body.appendChild(homeLink);
	}
	var chkDefault = document.createElement('input');
	if(chkDefault)
	{
		chkDefault.type = 'checkbox';
		chkDefault.checked = isChecked;
		chkDefault.addEventListener('change', changeRedirectSettings, false);
		document.body.appendChild(document.createTextNode(' ('));
		document.body.appendChild(chkDefault);
		document.body.appendChild(document.createTextNode('Auto redirect)'));
	}
	
	if(isChecked)
	{
		location.href = homePageURL;
	}
}
