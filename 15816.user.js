// ==UserScript==
// @name           Remove BBC News Ads
// @namespace      bbcAdRemover
// @description    Remove the ads from BBC News pages
// @include        http://news.bbc.co.uk/*
// ==/UserScript==

for (i=1;i<=10;i++) {
	if(ad=document.getElementById('ad'+i)) ad.style.display='none';
}

if(ad=document.getElementById('bbccom_leaderboard')) ad.style.display='none';
if(ad=document.getElementById('bbccom_skyscraper')) ad.style.display='none';
if(ad=document.getElementById('bbccom_bottom')) ad.style.display='none';
if(ad=document.getElementById('bbccom_mpu')) ad.style.display='none';
if(ad=document.getElementById('bbccom_companion')) ad.style.display='none';
if(ad=document.getElementById('bbccom_button')) ad.style.display='none';
