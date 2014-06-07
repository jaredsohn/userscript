// ==UserScript==
// @name           nrg maavaron skipper
// @namespace      nrg_skipper
// @include        http://www.nrg.co.il/*
// ==/UserScript==

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toUTCString());
}

var cookie_names = Array(	'maavaron_news', 
				'maavaron_economy', 
				'maavaron_gossip', 
				'maavaron_soprt', 
				'maavaron_tarbut', 
				'maavaron_leisure', 
				'maavaron_branja',
				'maavaron_tayarut'
			);
for(var i in cookie_names) {
	setCookie(cookie_names[i], 10, 365);
}
