// ==UserScript==
// @name          STFU - RAZORBACK59000
// @namespace     stfurazor
// @description   Permet d'ignorer l'existence de RAZORBACK59000 et BASS MANTA sur le forum officiel formulawan.
// @license       GPL v3
// @include       http://www.formulawan.fr/forum/viewtopic*
// @include       http://www.formulawan.fr/forum/posting*
// ==/UserScript==

var i=0; 
var author,author2;
while(document.getElementsByClassName('name')[i]) {
	author = '';
	author2 = '';

	author = document.getElementsByClassName('name')[i].innerHTML.replace(new RegExp('.*RAZORBACK59000.*','g'),'RAZORBACK59000');
	author2 = document.getElementsByClassName('name')[i].innerHTML.replace(new RegExp('.*BASS MANTA.*','g'),'BASS MANTA');
	if((author == 'RAZORBACK59000') || (author2 == 'BASS MANTA')) {
	document.getElementsByClassName('name')[i].parentNode.parentNode.parentNode./*parentNode.*/innerHTML= '';
	} else {
		i++;
	}	
} 
i=0;
while(document.getElementsByClassName('genmed')[i]) {
	author = '';
	author2 = '';
	
	author = document.getElementsByClassName('genmed')[i].innerHTML.replace(new RegExp('.*RAZORBACK59000.*','g'),'RAZORBACK59000');
	author2 = document.getElementsByClassName('genmed')[i].innerHTML.replace(new RegExp('.*BASS MANTA.*','g'),'BASS MANTA');
	if(author2 == 'BASS MANTA') author=author2;
	if((author == 'RAZORBACK59000') || (author == 'BASS MANTA')) {
	
	document.getElementsByClassName('genmed')[i].parentNode.parentNode.parentNode.innerHTML= '<tr><td><span class=\"genmed\"><b>'+author+' a probablement écrit une connerie:<\/b><\/span><\/td><\/tr><tr><td class=\"quote\">KAMOULOX !!!!<\/td><\/tr>' ;
	}
	i++;
	
} 