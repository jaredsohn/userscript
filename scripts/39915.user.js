// ==UserScript==
// @name           Picasaweb Download Links
// @namespace      http://dev.thewheatfield.org/userscripts
// @description    Add direct download links at the top of the page
//                 Original script from: joe.lapoutre.com/gm/picasawebdl
// @include        http://picasaweb.google.com/*/*
// ==/UserScript==

var PicasaWebDL = {
	initLinks: function() 
    {
        //"content$src":"http://lh4.ggpht.com/_KFwvXOMcYAY/SUqtrKYV9cI/AAAAAAAAWwg/JmVcvfiNoPA/IMG_5233.jpg" 
        var list = document.getElementsByTagName('script');
        var dldLinks = '';
        var count = 1;
        for(i = 0; i < list.length; i++)
        {
            var arrayOfStrings = list[i].innerHTML.split("content$src\":\"");
            if(arrayOfStrings.length > 1)
            {
                for (var j=1; j < arrayOfStrings.length; j++)
                {
                    var imgsrc = arrayOfStrings[j].match(/([^"]*)"/i);
                 dldLinks += "<a href=\"" + imgsrc + "\">(" + count++ + ")</a> ";
                }
            }
        }
           
        var links = document.createElement("div");
        links.innerHTML = '<div style="padding: 5px; border: 0px solid #000; background-color: #ccc; color: #030; font-size:10px;font-weight:bold;text-align:center">Download Photos: ' +
        dldLinks + 
        '</div>';
        document.body.insertBefore(links, document.body.firstChild);
	}
};

PicasaWebDL.initLinks();

