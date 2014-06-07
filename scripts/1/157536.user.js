// ==UserScript==
// @name               de-walker
// @version    		   0.93
// @description	       Filter posts on Rock, Paper, Shotgun (by default filters posts by John Walker)
// @include		       http://www.rockpapershotgun.com/
// @include		       http://www.rockpapershotgun.com/page/*
// ==/UserScript==
//
//
// SETUP
//
// Use the following to add authors to the filtered list:
//
// Jim Rossignol	'mailto:jim@rockpapershotgun.com'
// Alec Meer		'mailto:alec@rockpapershotgun.com'
// John Walker		'mailto:john@rockpapershotgun.com'
// Adam Smith		'mailto:adam@rockpapershotgun.com'
// Nathan Grayson	'mailto:nathan@rockpapershotgun.com'
//
// This is the list of authors to filter

   var IgnoreAuthor =['mailto:john@rockpapershotgun.com']

// Separate multiple authors with commas
// example: var IgnoreAuthor =['mailto(1)','mailto(2)'...]
//
//
// Set the following line to = false if you do not wish to see the titles of filtered articles

   var ShowTitles = false;
   
//
//
// EXECUTE SCRIPT
//
// Searches the page for links

var links = document.getElementsByTagName('a');

// Loops through all the filtered authors

for (var e = 0; e < IgnoreAuthor.length; e++)

{

	// Loops through all the links found

	for (var i = 0; i < links.length; i++)
	{

		// Checks for filtered authors by e-mail address	

		if (links[i].href == IgnoreAuthor[e])
		{
	
			// When address is found, the parent node of the link is hidden

			if (ShowTitles == 0){
			links[i].parentNode.parentNode.parentNode.style.display = "none";}

			if (ShowTitles == 1){
			links[i].parentNode.parentNode.style.display = "none";}
		}
	}
	
}
