// ==UserScript==
// @name             WLM Banner Remover
// @author           Anoesj Sadraee
// @date             November 6, 2008
// @namespace        Nothing important
// @include          http://*.*.mail.live.*/*
// @include          http://mail.live.*/*
// @include          http://*.mail.live.*/*
// ==/UserScript==

(function()
{
	var imgTag = document.getElementById("RadAd_Banner");
	imgTag.parentNode.removeChild(imgTag)


  	var imgTag2 = document.getElementById("CustComm_120x60");
  	imgTag2.parentNode.removeChild(imgTag2) 

	var imgTag3 = document.getElementById("RadAd_TodayPage_Banner");
	imgTag3.parentNode.removeChild(imgTag3)
	
	var imgTag4 = document.getElementById("dapIfM0");
	imgTag4.parentNode.removeChild(imgTag4)
	
	var imgTag5 = document.getElementById("dapIfM3");
	imgTag5.parentNode.removeChild(imgTag5)

	var imgTag6 = document.getElementById("RadAd_Skyscraper");
	imgTag6.parentNode.removeChild(imgTag6)

	var imgTag7 = document.getElementById("SkyscraperContent");
	imgTag7.parentNode.removeChild(imgTag7)

}) ();