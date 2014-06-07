// ==UserScript==
// @name           Vipmerkezi.Net Arama
// @namespace      http://userscripts.org/users/sadikeker
// @description    Vipmerkezi.net
// @include        http://*.imdb.com/title/*/
// @include        http://*.imdb.com/title/*/?*
// @include        http://*.imdb.com/title/*/#*
// @include        http://*.imdb.com/title/*/combined*
// @include        http://*.imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/
// @include        http://imdb.com/title/*/#*
// @include        http://imdb.com/title/*/combined*
// @include        http://imdb.com/title/*/maindetails*
// @include        http://imdb.com/title/*/?*
// ==/UserScript==


function getImdbCode() {
	var adres=window.location.href;
	var ilk='imdb.com/title/';
	var imdbCode=adres.substring(adres.indexOf(ilk)+15);
	//remove everything after first slash
	//regexp = /\/.*/g;
	//remove everything after first alphanumeric character
	regexp = /[^a-zA-Z0-9].*/g;
	imdbCode = imdbCode.replace(regexp, "");
	return imdbCode;
}


function getTitle() {
	var title = document.title;
	title = title.match(/^(.*) \(/)[1];
	regexp = /[^a-zA-Z0-9].*/g;
	title = title.replace(regexp, "");
	return title;
}


var title = getTitle();

var imdbID = getImdbCode();


//Vipmerkezi
unsafeWindow.$('<a>')
	.attr('href', 'http://www.vipmerkezi.net/search.php?do=process&q=' + imdbID)
	.attr('target','_blank')
	.css({ marginRight: '.25em', position: 'relative', top: 3 })
	.append('<img src="data:image/gif;base64,R0lGODlhEAAQAOcAAACE/////wBzmvMe+Gs8q9MHKAB7nfMe+AVonAAAAAVowgVoygVo7gEABwAAAQAAAQAAAgVpAgVpBHz0AdMaBABzmvMe+Gs8rtMHKAB7nfMe+AVpBgAAAAVpLgVpOAVpbAEABwAAAQAAAQAAAgVpggVphHz0AtMaBABzmvMe+Gs8sNMHKAB7nfMe+AVphgAAAAVprAVptAVpwAEABwAAAQAAAgAABgVp1AVp4Hz0BdMaBABzmvMe+Gs8sdMHKAB7nfMe+AVp7AAAAAVqFAVqHgVqOAEABwAAAQAAAgAAAgVqTgVqUnz0BtMaBABzmvMe+Gs8r9MHKAB7nfMe+AVqVgAAAAVqfAVqhAVqkAEABwAAAQAAAQAACAVqpAVqrHUAQmwAaS0AdG4AaUIAIFAATUMAIGQAb2MAZUIAAFAATSoAAEIALlAATSoAO0QALkIASSoAO1IALkUATGkAAGEAbWUAZ2IAL3AAbUIAAEL//2kAdXQAbGkALSAAblAASkcARUMAIGQAb2MAZUoAAEUAUAAARy4AKlAASjsARy4AKlAASkcARSoAO0oALkUAUCoAO0oALkkARgAARm0AaWcAYS8AZXAAamcAZf8AAEL//2kAdXQAbGkALSAAbkkARyAARm8AQ2UAZAAAY0kARwAARi4AKkkARwAARm0AaWcAYS8AZWkAZwAAZkZJR0dhOTc4Rv///////////3UAQmwAaS0AdG4AaVQAIEYASSAARm8AQ2UAZAAAY0kAVEYARioAAFQALkYASSoAO1QALkYASQAARm0AaWcAYS8AZWkAdGYAZkkAAP9NTUL//2kAdXQAbGkALSAAbk4AUCAAR28AQ2UAZAAAY04AUAAARy4AKk4AUAAAR20AaWcAYS8AZW4AcAAAZ05QiRoKDf///////wAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAP8ALAAAAAAQABAAAAgxAAEIHEiwoMGDCBMaDMCwocOGAx9KZBhx4kOFGDNqFGjxIseOED+CDFBx5MaTKA0GBAA7">')
	.appendTo('h1.header');

