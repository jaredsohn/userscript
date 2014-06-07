// ==UserScript==
// @author         Fabio Luiz (All credit to this man)
// @author         Corey Owen (FadedSpark)
// @name           Gawker Properties - Classic
// @namespace      Gawker Properties - Classic
// @version 1.2
// @include        http://jalopnik.com*
// @include        http://gawker.com*
// @include        http://gizmodo.com*
// @include        http://lifehacker.com*
// @include        http://valleywag.com*
// @include        http://io9.com*
// @include        http://jezebel.com*
// @include        http://kotaku.com*
// @include        http://deadspin.com*
// @include        http://ca.jalopnik.com*
// @include        http://ca.gawker.com*
// @include        http://ca.gizmodo.com*
// @include        http://ca.lifehacker.com*
// @include        http://ca.valleywag.com*
// @include        http://ca.io9.com*
// @include        http://ca.jezebel.com*
// @include        http://ca.kotaku.com*
// @include        http://ca.deadspin.com*
// ==/UserScript==

    var url=window.location.toString();
    var url2=location.hostname.toString();
	
    var aux=url2.replace("ca.","");
		
    var a_subs = document.getElementsByTagName('a');
   
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
 
    for (var i = 0, aEl; aEl = a_subs[i]; i++) {
	       if(aEl.href.search("http://ca.")!=-1);
		   else
            aEl.href = aEl.href.replace(aux,url2);