// ==UserScript==
// @name        alpha.yaplakal
// @namespace   alpha.yaplakal
// @include     http://alpha.yaplakal.com/go/*
// @version     2
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==



jQuery(document).ready(function()
{

    // correct broken gif
	$("img").load(function(){
        $("img").each(function(){
           if (this.src.match(/original.*gif/i)) { $( this ).css({"height":"100%"}) }
         }); 
     });
    
    // quick redirect
	$('a').each(function() 
	{
		url =  $(this).attr('href');
		reg =  new RegExp("(http\:\/\/alpha\.yaplakal\.com\/click\/\?)", "gim");
		res = reg.exec(url, "$1");
		if (res != null){
			$(location).attr('href',url);
			return false;
		} 				
	});
    
     
    
	
});
	
