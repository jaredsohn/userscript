// ==UserScript==
// @name           IgnoreTASCommenters
// @namespace      tag:kbalakrishnan@comcast.net,2009-08-07:IgnoreTASCommenters
// @description    Filter selected commenters from TheAmericanScene
// @include        http://theamericanscene.com/*
// @include        http://www.theamericanscene.com/*
// ==/UserScript==


// IgnoredCommentsVerbose: Determines whether comments are
//     just removed altogether, or text is replaced with "Comment Removed".
//   Default: 1
//   Set to 0 to remove all evidence of comment.

IgnoredCommentsVerbose = 1;

//regexp is the regular expression used to find the offending comments
// to add or remove commenters, modify the pipe-separated commenter names in the parens

var regexp = /<p class="small">[\s\S]*(Chet|matoko_chan)/ ;


var allComments, allLIElements, thisLIElement;
var arResult;

allComments = document.getElementsByClassName('comments');

if (allComments) {

	//comments are enclosed in LI tags but not otherwise marked --
	// search through all LI elements for match
	allLIElements = allComments[0].getElementsByTagName('li');
	for (var i=0; i < allLIElements.length; i++) 
 	       {
		thisLIElement = allLIElements[i];
		arResult = regexp.exec(thisLIElement.innerHTML);

		if (arResult ) {
 			if (IgnoredCommentsVerbose) 
			    {
				thisLIElement.innerHTML='<p>Comment Removed</p>' + arResult.input.substring(arResult.index);
			    }
   	             else 
			   {
				thisLIElement.innerHTML='';
       	             }
		}
	}
}

