// ==UserScript==
// @name	LinkedIn news - Top frame remover
// @namespace	linkedin
// @author         Fedmich
// @match	http://www.linkedin.com/news*
// @include	http://www.linkedin.com/news*
// @description	Automatically removes the top frame of the LinkedIn Group News.
// @version	0.2
// Last modified : Jun 21, 2011
// ==/UserScript==

function gup( name )
{
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

function redirect_from_linkedin(){
	var u = gup('articleURL');
	if(! u){
		var ob = document.getElementById('li-news-frame');
		if(ob!=null){ u = ob.src; }
	}
	if(! u){ return; }
	u = u.replace('http%3A','http:').replace(/%2F/g,'/').replace('%23','')
		.replace(/%2F/g,'/').replace(/%252F/g,'/').replace(/%253A/g,':')
		.replace(/%3F/g,'?').replace(/%3D/g,'=').replace(/%26/g,'&');
	
	u = u.replace(/(mkt_tok|utm_source|utm_medium)\=(.*)/,'');
	u = u.replace(/\?$/,'');
	if(! u){ return; }
	location.href= u;
}
redirect_from_linkedin();