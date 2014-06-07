// ==UserScript==
// @name          	League Of Legends Elite Noob Filter
// @description		Version 1.0: Filters retards from League of Legends Elite facebook group postings. Gives them embarrassing text by default.
// @include         http://www.facebook.com/groups/LeagueOfLegendsElite/*
// @include			http://na.leagueoflegends.com/board/*
// ==/UserScript==

/*

  Author: Benjamin
  email: tercicatrix@gmail.com
  
  Version: 1.0
    1.0 - First Release
	
	Improvements needed: 
	Speed when typing.
	Implement the whitelist. Improve the black and white lists. Make an interface for ease of use for user.
	Clean up the mutation watcher.
	Figure out a way for it to filter out dumbass posts from when you expand comments.

*/

// Licensed for unlimited modification and redistribution as long as
// this notice is kept intact.

//Used to check and make sure this all even compiles.
//Puts a little box with text in the lower left corner of the screen if the script compiled and ran this call.
function compileChecker()
{
	body = document.body;
	if(body != null) {
		div = document.createElement("div");
		div.style.position = "fixed";
		div.style.bottom = "+122px";
		div.style.left = "+6px";
		div.style.backgroundColor = "#eceff5";
		div.style.border = "2px solid #94a3c4";
		div.style.padding = "2px";
		div.innerHTML = "<p> Testing Div: Shows up when the code compiles</p>"
		
		body.appendChild(div);
	}
}

//Replacement text. Fill with whatever you like, 
//(just be sure to leave the quotes intact and be careful if using a special character like a slash / or quote ' ", etc !)
replacementText = "I am either a giant noob, or I choose to use the words noobs love most.";
var newTextNode = document.createTextNode(replacementText); 

//edit the words here
//sorted alpha backwords to catch bad word groupings
//This list will detect case-INsensitively 
badwords = ['u mad', 'trolling', 'trolled', 'troll', 'meta', 'elo hell', 'but my team mates', 'but my teammates'];
//Whitelist words. If a post contains these words, we'll skip checking for badwords.
//Needs more words to help trundle not get blocked.
//Also, not working yet.
whitelist=['trundle', 'ssotp', 'Ryan Irian'];


//The middle entry is a regular expression to catch people who post their scores k/d/a or k/d style.
var bw = "\\b("+badwords.join("|")+ '|(([0-9])+/([0-9])+(/([0-9])+)?)'+")\\b";
bw = new RegExp(bw, "gi"); 
//g means check globally, and don't stop if we find a match
//i means perform case-insensitive matching

function filter() 
{				
	//Run for main stories first.
	elements = getElementsByClass("userContent");
	scan();
	//Then check comments
	elements = getElementsByClass("commentBody");
	scan();
}

function scan()
{
	var i = 0;
	var j = 0;

	//Go through all the elements on the page
	for(i = 0; i <= elements.length; i++) 
	{
		var el = elements[i];
		removing = false;
		
		//If this element isn't null...
		if(el != null){
			//Then, go through all the children of each element
			for(j = 0; j <= el.childNodes.length; j++){
				//If this child isn't null...
				if(el.childNodes[j] != null)
				{
					//Then read its data
					data = el.childNodes[j].nodeValue;
					//Eventually, we'll set up a whitelist here
					if(true) 
					{
						//Now, if it matches any of the badwords
						if(bw.test(data))
						{
							//Set it so that the whole post gets replaced with our replacement text
							el.firstChild.nodeValue = newTextNode.nodeValue;
							removing = true;
						}
					}
				}			
			}
			if(removing)
			{
				//Go backwards through the children list and remove them, leaving the replacement text node intact
				for(j = el.childNodes.length - 1; j >= 1; j--)
				{
					el.removeChild(el.childNodes[j]);
				}
				removing = false;
			}
		}
	}
}

function GoNow(WaitUntil)
{
	setTimeout(filter, WaitUntil); 
}

function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var MutationObserver = window.MutationObserver ||
                           window.WebKitMutationObserver ||
                           window.MozMutationObserver;

//Our mutation observer. Checks for any changes made to the page, so we can re-run the script.
var observer = new MutationObserver(function(mutations) {
	//Handle changes all-at-once
	// [mutations] is a list of 'stuff that happened'.
	
	//Since facebook generates a shit load of mutations, we'll operate when the amount is 5 or greater.
	if(mutations.length >= 5) {
		//Run for main stories first.
		elements = getElementsByClass("userContent");
		scan();
		//Then check comments
		elements = getElementsByClass("commentBody");
		scan();		
	}
	
	//Sadly, trying to call the main body's functions from inside here doesn't work.
	//Or at least, I couldn't get it to work.
	function scan()
	{
		var i = 0;
		var j = 0;

		//Go through all the elements on the page
		for(i = 0; i <= elements.length; i++) 
		{
			var el = elements[i];
			removing = false;
			
			//If this element isn't null...
			if(el != null){
				//Then, go through all the children of each element
				for(j = 0; j <= el.childNodes.length; j++){
					//If this child isn't null...
					if(el.childNodes[j] != null)
					{
						//Then read its data
						data = el.childNodes[j].nodeValue;
						//Eventually, we'll set up a whitelist here
						if(true) 
						{
							//Now, if it matches any of the badwords
							if(bw.test(data))
							{
								//Set it so that the whole post gets replaced with our replacement text
								el.firstChild.nodeValue = newTextNode.nodeValue;
								removing = true;
							}
						}
					}			
				}
				if(removing)
				{
					//Go backwards through the children list and remove them, leaving the replacement text node intact
					for(j = el.childNodes.length - 1; j >= 1; j--)
					{
						el.removeChild(el.childNodes[j]);
					}
					removing = false;
				}
			}
		}
	}
});

observer.observe(document, { childList: true, subtree: true });

//Start the initial "thread", waiting for the page to load a little
GoNow(500);