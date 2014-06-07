// ==UserScript==
// @name           Simplified mangafox
// @namespace      waykohler
// @description    Simplifies the layout and resizes the image to it's original resolution
// @include        http://www.mangafox.com/manga/*/*
// ==/UserScript==

if( top == self )
{
    var header = document.getElementById("header");
    //header.style.display = 'none';
    
    var widepage = document.getElementsByClassName("widepage page");
    widepage[0].style.display = 'none';
    
    var footer = document.getElementById("footer");
    footer.style.display = 'none';
    
    var image = document.getElementById("image");
    image.width = image.naturalWidth;
    var viewer = document.getElementById("viewer");
    viewer.style.width = image.naturalWidth+"px";
    
    var image = document.getElementById("image");
    var width = image.naturalWidth;
    var intervalId = 0;
    if(width < 10) {
    	width = GM_getValue("lastWidth", 400);
		intervalId = setInterval(function() 
			{ 
				width = image.naturalWidth;
				if(width >= 10) {
				    image.width = width;
				    var viewer = document.getElementById("viewer");
				    viewer.style.width = width+"px";
				    clearInterval(intervalId);
				}
			},100);
    }
    image.width = width;
    var viewer = document.getElementById("viewer");
    viewer.style.width = width+"px";


    document.body.insertBefore(header,document.getElementById("footer"));

    window.addEventListener(
    'load', 
    function() {
        var image = document.getElementById("image");
        image.width = image.naturalWidth;
        var viewer = document.getElementById("viewer");
        viewer.style.width = image.naturalWidth+"px";
		GM_setValue("lastWidth",image.naturalWidth);
		
	    var next = image.parentNode;
	    var iframe = document.createElement('iframe');
	    iframe.setAttribute( 'src', next.getAttribute('href') );
	    iframe.style.height = '0px';
	    iframe.style.width = '800px';
	    iframe.scrolling = "no";
	    iframe.frameBorder = 0;
	    iframe.id = "next_iframe";
	    document.body.appendChild(iframe);
	    clearInterval(intervalId);
    },
    true);
}
