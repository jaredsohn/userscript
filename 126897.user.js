// ==UserScript==
// @name          	Facebook messages resurrector
// @version	1.1
// @namespace      
// @description  You accidently deleted your message on facebook?? with this script you can bring back that message, or you can bring back message from your friends account.
// @include	http://www.facebook.com/*
// @include	https://www.facebook.com/*
// @include	http://www.google.nl/*
// @include	https://www.google.nl/*
// ==/UserScript==

var $grjl = {

	init : function(){
		this.RemovePrefetch();
		this.RemoveSponsors();
		this.RemoveLinkTracking();
		this.RemoveBadLinks();
	},

	qs : function(Query_String_Name,url) {
		var i, pos, argname, argvalue, queryString, pairs;
		if(!url){url = location.href}
		queryString = url.substring(url.indexOf("?")+1);
		pairs = queryString.split("&");
		for (i = 0; i < pairs.length; i++) { 
			pos = pairs[i].indexOf('='); 
				if (pos == -1) {
					continue; 
				}
			argname = pairs[i].substring(0,pos);
			argvalue = pairs[i].substring(pos+1); 
			if (argname == Query_String_Name) {
				// return unescape(argvalue.replace(/\+/g, " "));
				return argvalue;
			}
		}
		return false;
	},
	
	RemoveSponsors : function(){
		var mbEnd = $('mbEnd') ;  
		if (mbEnd){
			mbEnd.parentNode.removeChild(mbEnd) ; 
		}
		var tads = $('tads');
		if(tads){
			tads.parentNode.removeChild(tads) ;  				
		}
		var rhsa = $('rhsa');
		if(rhsa){
			rhsa.parentNode.removeChild(rhsa) ; 
		}
	},
	
	RemoveLinkTracking : function(){
		var all_a = document.getElementsByTagName('a');
		for (var i = 0, k=all_a.length; i< k; i++){
			var a = all_a[i];
			a.removeAttribute('onclick');
			a.removeAttribute('onmousedown');
			if(a.href.match(/\/url\?q=/)){
				var q = this.qs('q',a.href);
				a.href = decodeURIComponent(q.replace(/\+/g, '%20'));
 			}
			else if(a.href.match(/\/url\?url=/)){
				var url = this.qs('url',a.href);
				a.href = decodeURIComponent(url.replace(/\+/g, '%20'));
 			}
		}
		
		var elements = ['div', 'li', 'span'];
		for (var i = 0, k=elements.length; i< k; i++){
			var element = document.getElementsByTagName(elements[i]);
			for (var x = 0, y=element.length; x< y; x++){
				var el = element[x];
				el.removeAttribute('onclick');
				el.removeAttribute('onmousedown');	
			}
		}
			
	},

	RemovePrefetch : function(){
		var all_links = document.getElementsByTagName('link');
		for (var i = 0 , k=all_links.length; i< k ; i++){
			var link = all_links[i];
			if(link.rel == 'prefetch'){
				link.parentNode.removeChild(link) ;
			}
		}	
	}
	
};

function $(id, doc) { if (!doc) { doc = document ; } if(doc.getElementById(id)) { return doc.getElementById(id) } else { return false } ; };

(function(){
	$grjl.init();
})();