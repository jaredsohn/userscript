// ==UserScript==
// @name           VIADEO Free Profiler
// @namespace      Gezus_2kX
// @author         Gezus
// @description    [ www.viadeo.com ] Permet de visualiser directement les profils VIADEO avec un compte gratuit (non premium) en cliquant sur "mise en relation" au lieu d'avoir le message obligeant à payer un abonnement premium pour voir les profils. / Free user profile link like premium user.
// @include       http://www.viadeo.com/*
// @include       http://static2.viadeo-static.com/*
// ==/UserScript==

(function ()
{
	var links = document.links;
	for (var i=0;i<links.length;i++){ 
		        
	if (links[i].href.split('/')[3] == "miseenrelation")
	    links[i].setAttribute('href',"http://www.viadeo.com/profile/"+links[i].href.split('=')[1]);	    	     
	     
	       				}
}
)();

