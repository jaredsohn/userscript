// ==UserScript==
// @name           Tumblr v3 Customize Reblog
// @namespace      com.toldorknown.tumblr
// @description    Modifies the default reblog textarea contents
// @include        http://www.tumblr.com/reblog/*
// ==/UserScript==

// Translation table for names you'd rather use than Tumblr username

var nickNames = {
        toldorknown: "Told or Known (or Tumbled)",
	ofvarieddelights: "Jay",
};

// video posts have two textareas, otherwise we could just grab the one and only
var textAreaArray = document.getElementsByTagName("textarea");
var textArea = textAreaArray[textAreaArray.length -1];

// grab the text as provided by Tumblr
var reblogText = textArea.textContent;

// if it has an auto-attribute, throw away the mdash and store the body and author
var matchResult = reblogText.match(/([\W\w]*) \&mdash; ([^&]*)$/);

if (matchResult != null){

	var origBody = matchResult[1];		// body as provided by Tumblr, minus auto-attribute

	var origAuthor = matchResult[2];	// original author as link

	var origAuthorName = origAuthor.match(/>([^<]+)</)[1];

	// CUSTOMIZE BELOW HERE
	
	// Nickname translation
	if (origAuthorName in nickNames){
	 	origAuthor = origAuthor.replace(/>[^<]+</, ">" + nickNames[origAuthorName] + "<")
	}

	// if you have your own custom image, change this url 
	var reblogImage = "http://assets.tumblr.com/images/iframe_reblog_alpha.png";

	// start with the Tumblr reblog image followed by the author
	textArea.textContent = '<img src="' + reblogImage + '">' +
							" from " + origAuthor;

	// if the original body wasn't empty, append colon to author and 
	// add original body as a blockquote
	if(origBody != ""){ 
		textArea.textContent = textArea.textContent + ": <blockquote>" + 
								origBody + "</blockquote>\n";
	}
}