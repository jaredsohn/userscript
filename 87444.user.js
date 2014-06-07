// ==UserScript==
// @name           FRmovies.net & AlloShare & AlloMovies directLinker for MegaUpload/MegaVideo [v1.05]
// @author         Gezus
// @description    [Frmovies FIXED] Créé un lien direct en supprimant la page de pub, fonctionne sur Frmovies.net et Allomovies.com Alloshare.com -+- Replace all links on the page by a direct link to megaupload.com/?d=XXXXXXXX.
// @include        http://atcine.com*
// @include        http://frmovies.net*
// @include        http://t.frmovies.net*
// @include        http://www.allomovies.com*
// @include        http://www.alloshare.com*
// ==/UserScript==

(function ()
{
	var links = document.links;
	for (var i=0;i<links.length;i++){ 
		    
	if (links[i].href.split('=')[1] == "divxm&id")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[2].substring(0,8));
	    
	if (links[i].href.split('=')[1] == "Down&id")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[2].substring(0,8)); 
	    
        if (links[i].href.split('=')[1] == "voir&id")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[2].substring(0,8));
	    
	if (links[i].href.split('=')[1] == "1voir&id")
	    links[i].setAttribute('href',"http://www.megavideo.com/?d="+links[i].href.split('=')[2].substring(0,8));
        
	   if (links[i].href.split('=')[1] == "1&id")
	    links[i].setAttribute('href',"http://www.megavideo.com/?v="+links[i].href.split('=')[2].substring(0,8));	       
        if (links[i].href.split('=')[1] == "2&id")
	    links[i].setAttribute('href',"http://www.megavideo.com/?v="+links[i].href.split('=')[2].substring(0,8));	       
        if (links[i].href.split('=')[1] == "3&id")
	    links[i].setAttribute('href',"http://www.megavideo.com/?v="+links[i].href.split('=')[2].substring(0,8));	 
 	   if (links[i].href.split('=')[1] == "4&id")
	    links[i].setAttribute('href',"http://www.megavideo.com/?v="+links[i].href.split('=')[2].substring(0,8));	       
	    
	if (links[i].href.split('=')[2] == "http://www.megavideo.com/?v")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[4]);
	if (links[i].href.split('=')[2] == "http://www.megavideo.com/?d")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[4]);
	    
	if (links[i].href.split('=')[2] == "http://www.megaupload.com/?d")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[4]);    
	if (links[i].href.split('=')[2] == "http://www.megaupload.com/?v")
	    links[i].setAttribute('href',"http://www.megaupload.com/?d="+links[i].href.split('=')[4]);
	       				}
}
)();