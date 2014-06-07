// ==UserScript==
// @name           imdb
// @description    duh
// @include        http*://*.imdb.*
// ==/UserScript==

var lctn = location.href;

if(( location.hostname.indexOf('akas.imdb.com') != -1 ) || ( location.hostname.indexOf('former.imdb.com') != -1 ) || ( location.hostname.indexOf('imdb.de') != -1 ) || ( location.hostname.indexOf('imdb.es') != -1 ) || ( location.hostname.indexOf('imdb.it') != -1 ) || ( location.hostname.indexOf('imdb.fr') != -1 ) || ( location.href.indexOf('?ref') != -1 )) {

  if( location.hostname.indexOf('akas.imdb.com') != -1 ) {
		lctn = lctn.replace(/akas\./,'www\.');
	}

  if( location.hostname.indexOf('former.imdb.com') != -1 ) {
		lctn = lctn.replace(/former\./,'www\.');
	}

  if( location.hostname.indexOf('imdb.de') != -1 ) {
		lctn = lctn.replace(/\.de/,'\.com');
	}

  if( location.hostname.indexOf('imdb.es') != -1 ) {
		lctn = lctn.replace(/\.es/,'\.com');
	}

  if( location.hostname.indexOf('imdb.it') != -1 ) {
		lctn = lctn.replace(/\.it/,'\.com');
	}

  if( location.hostname.indexOf('imdb.fr') != -1 ) {
		lctn = lctn.replace(/\.fr/,'\.com');
	}

	if( location.href.indexOf('?ref') != -1 ) {
		var phonenumber=new RegExp("\\?ref_.*", "gi")
		lctn = lctn.replace(phonenumber,"");
	}

location.href = lctn;

}