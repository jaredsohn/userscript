// ==UserScript==
// @name           Oda TV Boyun ağrısı çözdürgeci
// @description    Oda TV Web Sitesinin sürekli sol tarafa yapışık gözükmesi sorununu çözer. Sayfayı ortalar.
// @namespace      
// @include        http://www.odatv.com/*
// @include        http://odatv.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==


function ortala(){
	var width = $(window).width();
	if(width < 790)
		return;
		
	var marLeft = (width - 790)/2;


	var leftStr = new String(marLeft) + "px";
	document.body.style.marginLeft = leftStr;
        
        
    if($("#pageskin").size() > 0)
    {
       $("#pageskin").hide();
    }
}

ortala();
$(window).resize(function () {
	ortala(); 
 });