// ==UserScript==
// @name        CPanel Autocomplete Fixer
// @namespace   http://www.braveagency.com
// @description Allows autocomplete back on, and removes ad links from cPanel
// @include        *:2083/frontend/x3/index*
// @include        *:2082/frontend/x3/index*
// @include        *:2082/logout/?*
// @include        *:2083/logout/?*
// @include        *:2083
// @include        *:2082
// @include        *:2083*
// @include        *:2082*
// @version     1.02
// ==/UserScript==

var allDivs=document.getElementsByTagName('div');
document.getElementById('partnertitle').style.display = 'none';
document.getElementById('partnercontain').style.display = 'none';
document.getElementById('hglinkstitle').style.display = 'none';
document.getElementById('hglinkscontain').style.display = 'none';
document.getElementById('adwords').style.display = 'none';
document.getElementById('SEO-TOOLS').style.display = 'none';

document.getElementById('user').setAttribute('autocomplete', 'on');
document.getElementById('pass').setAttribute('autocomplete', 'on');

for(var i=0;i<allDivs.length;i++){
	if (allDivs[i].className == 'minicontain' || allDivs[i].className == 'affcontain')
	{
		allDivs[i].style.display = 'none';
	}
	if (allDivs[i].className == 'minititle')
	{
		if (allDivs[i].innerHTML == 'Web Site Builders' || allDivs[i].innerHTML == 'Make Money with Us' ||
		allDivs[i].innerHTML == 'Google AdWords Offer' || allDivs[i].innerHTML == 'VoIP Services by VOIPo')
		{
			allDivs[i].style.display = 'none';
		}
	}
}

