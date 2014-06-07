// ==UserScript==
// @name           ad block ebookee
// @namespace      smk
// @description    remove ads from ebookee
// @include        http://ebookee.org/*
// @include        http://www.ebookee.com.cn/*
// @include        http://www.ebookee.com/*
// @include        http://www.ebookee.net/*
// @include        http://www.ebooksx.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @run-at         document-end
// ==/UserScript==

function remAds(){
	//footer ad links
	$('.footer-contents > p:contains("Links:")').remove();
	
	//remove the RHS babylon ad
	$('div.navbar:contains("Download Translater")').next('ul.arrowlist').andSelf().remove();
	
	//remove the RHS recommend bar
	$('div.navbar:contains("We Recommend")').next('ul.arrowlist').andSelf().remove();
	
	//remove fake download links
	$('a[href^="/download/ezdownload.php?"]').remove();
	
	//remove amazon ads
	$('a:contains("Buy This Book"):contains("Amazon")[target="_blank"]').remove();
	
	//remove tradePub ad
	$('a[href*="/ebookee.tradepub.com/"]').remove();
	
	//remove sponsored links
	$('div.navbar:contains("Sponsored Links")').remove();
}

function main(){
	remAds();
}

main();
