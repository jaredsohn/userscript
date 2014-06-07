// ==UserScript==
// @name        FotoRomantika
// @namespace   FotoRomantika
// @include     http://www.fotoromantika.ru/#id*
// @version     1
// ==/UserScript==
 
$.fn.onAvailable = function(fn)
{
        var sel = this.selector;
        var timer;
        var self = this;
        if (this.length > 0) {
            fn.call(this);   
        }
        else {
            timer = setInterval(function(){
                if ($(sel).length > 0) {
                    fn.call($(sel));
                    clearInterval(timer);  
                }
            },50);  
        }
};
	
$(function() 
{
    $("map[name='Navigation']").onAvailable(function(){
        RemoveMap();
			  
		ShowFullImageLink();
			  
	   // LocateToImage();		
    });
	
	function ShowFullImageLink()
	{
		var link = $('#lightboxlink a');
		link.html('<a href="#" onclick="LocateToImage();"><b style="background-color:yellow;color:black">[ SHOW FULL IMAGE ]</b></a>');
		link.click(function() {
				LocateToImage();
		});
	}
	
	function LocateToImage()
	{
		var imgSrc =  ($('img[usemap="#Navigation"]').attr('src'));
		window.location.href = imgSrc;
	}
	   
    function RemoveMap()
    {
		if(  $('map[name="Navigation"]').length > 0 )  $('map[name="Navigation"]').remove();
    }     
});
 