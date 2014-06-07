// ==UserScript==
// @name          Netflix Layout Fix
// @namespace     http://userscripts.org/users/348550
// @description   Forces the old Netflix Watch Now layout
// @include http://netflix.com/*
// @include http://*.netflix.com/*
// ==/UserScript==
var strurl = document.location.href;



            if (strurl.indexOf('movies.netflix.com') > -1 && strurl.indexOf('WiPlayer')<0 && strurl.indexOf('Search')<0 && strurl.indexOf('/Wi')> -1 && strurl.indexOf('/WiMovie/') < 0 || strurl.indexOf('movies.netflix.com/Recs?') >- 1){
			  if(strurl.indexOf('?fcld=true')<0 )
				{
					if(strurl.indexOf('?')>-1) {strurl = strurl + "&fcld=true";}else{ strurl=strurl+"?fcld=true";}
				}
				
if(strurl.indexOf('ca.')<0){strurl=strurl.replace("movies.", "www.");}else{strurl=strurl.replace("movies.", "");}

				
			this.location.href=strurl;
		 }
	
	
