// ==UserScript==
// @name           thirteenFifteen
// @namespace      http://www.abitcloser.com/blog/enabling-cultural-protocols-online
// @description    Hides all images of Muhammad from Wikipedia based on alt tag and src url
// @include        http://en.wikipedia.org/*
// ==/UserScript==

(function () {

	// gets all images on the page   
    var objects = document.getElementsByTagName("img");
    var removed = 0;
   
    if(objects.length > 0)
    {
        for(i=0;i<objects.length;i++)
        {       
            // gets alt text of the image
            var alt = objects[i].getAttribute('alt');
            
            // gets the url of image
            var fileName = objects[i].getAttribute('src');
            // concatenates the two vars into one string
            var alt = alt+fileName;
            
            var ImgParentNode = objects[i].parentNode;           
            
            // set alt to zero-length string if not present in img tag
            if(alt == undefined){
                alt = '';
            }
			alt = alt.toLowerCase();
 			if(alt.match("muhammad")!=null) {
   			objects[i].parentNode.removeChild(objects[i]);
 			}
           
            // increment the counter
            removed++;
            //
        }
       
    }
})();