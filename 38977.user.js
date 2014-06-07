// ==UserScript==
// @name           Remove HostGator CPanel Ads
// @namespace      http://www.owlhawk.net
// @description    Removes ad and affiliate links from hostgator control panel.
// @include        *:2083/frontend/x3/index*
// @include        *:2082/frontend/x3/index*
// ==/UserScript==

var allDivs=document.getElementsByTagName('div');
document.getElementById('partnertitle').style.display = 'none';
document.getElementById('partnercontain').style.display = 'none';
document.getElementById('hglinkstitle').style.display = 'none';
document.getElementById('hglinkscontain').style.display = 'none';
document.getElementById('adwords').style.display = 'none';
document.getElementById('SEO-TOOLS').style.display = 'none';

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