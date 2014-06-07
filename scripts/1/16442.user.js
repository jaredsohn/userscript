
// ==UserScript==
// @name          Photosight_View
// @description   Big Views
// @author        bw3d
// @version       0.1
// @include       http://www.photosight.ru/*
// ==/UserScript==




//alert (images.length) ;

var cnt = 0 ; 
var im = new Array();

 var images = document.images ;
 
for (i = 0 ; i < images.length; ++i) 
{
	var re = /prv-\d{4}-\d{2}.photosight.ru\// ;
	

	var s = images[i].src;
    if (images[i].src.replace ("/ny/sight.gif","") !=   images[i].src)
    {
        images[i].src = "http://img.photosight.ru/photos/40111.jpg";
        images[i].parentNode.href = "" ;
        
        images[i].parentNode.addEventListener('click', function(event) {
                                                    // event.target is the element that was clicked

                                                    // do whatever you want here

                                                    // if you want to prevent the default click action
                                                    // (such as following a link), use these two commands:
                                                    
                                                    var images = document.images ;
                                                    var cnt = 0 ; 
                                                    var im = new Array();
                                                    
                                                    for (i = 0 ; i < images.length; ++i) 
                                                    {                                                    
                                                            ss = images[i].src.replace ("prv-","img-").replace ('/pv_',"/"); 
                                                            
	                                                        if (ss != images[i].src) 
	                                                        {
	                                                        
                                                             im[cnt++] = ss ; 
                                                            }
                                                    } 
                                                    
                                                    wnd = window.open ("","_blank") ; 
                                                    
                                                    for (i = 0 ; i  < cnt; ++i) 
                                                    {
                                                        wnd.document.write("<img src='" + im[i]+"' /> <br/><br/>");
                                                    }
                                                    
                                                    event.stopPropagation();
                                                    event.preventDefault();
                                                     }, false);
    }	
	ss = images[i].src.replace ("prv-","img-").replace ('/pv_',"/") ; 
	if (ss != s) 
	{
	   images[i].parentNode.href = ss  ; 
	   images[i].parentNode.target = "_blank"; 
	   im[cnt++] = ss ;  
			
	}
	
	
	
	
}


//http://img-2007-11.photosight.ru/24/2427418.jpg
//http://prv-2007-11.photosight.ru/24/pv_2427418.jpg