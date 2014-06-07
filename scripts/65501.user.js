// ==UserScript==
// @name           TTNET Oyun Remove Ads
// @description    Removes TTNET Oyun Advertisements.
// @version        1.0
// @date           01.01.2010
// @author         Volkan KIRIK
// @namespace      http://userscripts.org/users/volkan
// @include        http://ttnetoyun.com.tr/*
// @include        http://www.ttnetoyun.com.tr/*
// ==/UserScript==

o10=document.getElementById('topBanner');
if (o10)
{
	o10.style.display = 'none';
}
p10=document.getElementById('ctl00_cphContentRight_ucAdvertisement_ctl00_flashAdvertisement');
if (p10)
{
	p10.style.display = 'none';
}
r10=document.getElementById('ctl00_cphContentRight_ucAdvertisementBottom_ctl00_flashAdvertisement');
if (r10)
{
	r10.style.display = 'none';
}
