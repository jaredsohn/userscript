// ==UserScript==
// @name          Happy Hunning
// @description	  Filters TheHun to suit your taste, by highlighting desirable phrases, filtering unwanted links and easily distingishing between movies & images.
// @include       http://*.thehun.*
// ==/UserScript==
/*
	Question, comments or concerns can be sent to lochness93@hotmail.com
	version 2.1.0
*/
(function() {
GM_log("started: " + Date());		  

/*
	THE FOLLOWING VARIABLES CAN BE CUSTOMIZED TO SUIT YOUR NEEDS
*/
	// Style Infromation
	var _bold	= 'color: #000; font-weight: bold;';
	var _mov	= 'background-color: #FFCFD1;';
	var _pic	= 'background-color: #DBFFCF;';
	var _both	= 'background-color: #FFEDCF;';
	var _none	= 'background-color: #CFFFFA;';

	// Rewrites Body Tag
	document.body.setAttribute('LINK','#006699')
	document.body.setAttribute('VLINK','#660066')
	document.body.setAttribute('ALINK','#FF9900')
	
	// Word to Filter
	var properLinks = new RegExp("^(January|February|March|April|May|June|July|August|September|October|November|December)");
	var badWords = new RegExp("(homosexual|gay|jerk|mmm|ladyboy|shemale|fat|chubby|plump)",'i');
	var boldWords = new RegExp("(anal|asian|blowjob|throat| head| ass)",'i');
	var movieList = new RegExp("(vid|movie|clip|series)",'i');
	var galleryList = new RegExp("(pic|gallery|photos)",'i');
	
	
/*
	DO NOT CHANGE ANYTHING BELOW THIS LINE
*/

	// Goes through each link element at a time
	var everyLink = document.getElementsByTagName("a");
	for(i=0; i<everyLink.length; i++){
		x = everyLink[i].innerHTML
	
		// Removes Unnessesary Links
		if (properLinks.test(x) == false){
			everyLink[i].innerHTML = '';
		}
		
		// Filters Bad Words
		if (badWords.test(x) == true){
			everyLink[i].parentNode.removeChild(everyLink[i].nextSibling); // Removes line break, must be called before the link is removed.
			everyLink[i].parentNode.removeChild(everyLink[i]) //  Removes link
		}
	}
		
		
	var everyLink = document.getElementsByTagName("a");	
	for(i=0; i<everyLink.length; i++){
		x = everyLink[i].innerHTML	

		// Checks to see whether link is a movie or gallery
		var isMovie = movieList.test(x)
		var isGallery = galleryList.test(x)
		
		function styleize(s)
				{
				everyLink[i].setAttribute('style',s);
				}
		
		if (isMovie == true && isGallery == true) // Is both movie and gallery
			{
			styleize(_both);
			}
		else if (isMovie == false && isGallery == true) // Is Gallery only
			{
			styleize(_pic);
			}
		else if (isMovie == true && isGallery == false) // Is Movie only
			{
			styleize(_mov);
			}
		else if (isMovie == false && isGallery == false) // Is neither movie or gallery
			{
			styleize(_none);
			}
			
		// Bold Key Phrases
		if (boldWords.test(x) == true){
			var y = everyLink[i].getAttribute('style');
			var f = new String(y+_bold);
			everyLink[i].setAttribute('style',f);
		}
}

GM_log("finished: " + Date());
})();
