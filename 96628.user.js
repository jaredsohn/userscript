// ==UserScript==
// @author         Fabio Luiz (Flss)
// @name           Gawker Layout Fix
// @namespace      Gawker Layout  Fix
// @version 1.4 
// @include        http://gizmodo.com/*
// @include        http://jalopnik.com/*
// @include        http://deadspin.com/*
// @include        http://kotaku.com/*
// @include        http://lifehacker.com/*
// @include        http://jezebel.com/*
// @include        http://gawker.com/*
// @include        http://io9.com/*
// @include        http://ca.gizmodo.com/*
// @include        http://ca.jalopnik.com/*
// @include        http://ca.deadspin.com/*
// @include        http://ca.kotaku.com/*
// @include        http://ca.lifehacker.com/*
// @include        http://ca.jezebel.com/*
// @include        http://ca.gawker.com/*
// @include        http://ca.io9.com/*
// ==/UserScript==

    var url=window.location.toString();
    var url2=location.hostname.toString();
	
    var aux=url2.replace("ca.","");
		
   
   if(url.search("comment=")>-1){
        i=url.search("=");
		var aux2="http://ca."+url2+"/comment/"+url.substring(i+10,i+18);
		document.location.href=aux2;
   }
   
   else
   
   if(url.search("http://ca.")==-1){
        url=url.replace("http://","http://ca.");
        url=url.replace("#!","");
		window.location.href=url;
    }
 
    var a_subs = document.getElementsByTagName('a');

    for (var i = 0, aEl; aEl = a_subs[i]; i++) {
	       if(aEl.href.search("http://ca.")!=-1);
		   else
            aEl.href = aEl.href.replace(aux,url2);
        }
		
	var img_subs = document.getElementsByTagName('img');

	for (var j = 0, imgEl; imgEl = img_subs[j]; j++) {

		if (imgEl.src.search("medium")!=-1) {  
			imgEl.src = imgEl.src.replace(/medium/g, "xlarge");  
			imgEl.width = 500;  
		}  
	}

		