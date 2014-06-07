// ==UserScript==
// @name           forced anon
// @namespace      4chan
// @include        http://*.4chan.org/*/res/*.html
// @include        http://*.4chan.org/*/imgboard.html
// ==/UserScript==

spanz = document.getElementsByTagName('span');

for (i = 0; i < spanz.length; i++)
{
	if ((spanz[i].className == 'commentpostername') || (spanz[i].className == 'postername'))
	{
		if ((spanz[i].childNodes.length > 0) && (spanz[i].childNodes[0].tagName == 'a'))
		{			
			hrf = spanz[i].childNodes[0].href;
			spanz[i].innerHTML = '<a href="'+hrf+'">Anonymous</a>';
		}
		else spanz[i].innerHTML = 'Anonymous';
	}
	else if (spanz[i].className == 'postertrip')
		spanz[i].style.display = 'none';
}