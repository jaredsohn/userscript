// ==UserScript==
// @name           *.ning.com Ads Remover
// @namespace
// @description    *.ning.com google Ads Remover
// @include        http://*.ning.com/*
// ==/UserScript==
// Author: Kishore Kumar Maramraj
// email: kishore dot maramraj at gmail dot com
//
//========
// change log:
// Version 1.0 - date: Mar 09 2007
//
//========
// Bugs
// ?
//=========


window.adRemover = function(){
 
var i;
var googleAdsFrame= document.getElementById('xg_body').getElementsByTagName("iframe");
//alert("size: "+googleAdsFrame.length);
   for(i=0;i<googleAdsFrame.length;i++){  
	  // alert(i);
        if(googleAdsFrame[i].name="google_ads_frame"){	      
        	googleAdsFrame[i].parentNode.removeChild(googleAdsFrame[i]);
		}
   }


}

adRemover();


