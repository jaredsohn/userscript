// ==UserScript==
// @name		YOSPOS Style Helper
// @description	replaces images with text
// @include 	http://forums.somethingawful.com/*
// @namespace	yospos
// ==/UserScript==

// It will be incredible if this actually works
/*

BIG TO-DO:

Replace images with text equivs -
	* Mod/admin stars
	* That ugly OK button on the jumplist - can't remove because it has no class (heh)
	
Add ">" to unread post count

Turn Profile, History, Rap Sheet li's into buttons - onclick for the area i guess

*/


//so first we need to see if it's in YOSPOS, since @match can't do that for threads obviously
/*breadcrumbsDiv = getElementsByClass('breadcrumbs')[0];
breadcrumbsString = (new XMLSerializer()).serializeToString(breadcrumbsDiv);

if (breadcrumbsString.indexOf('YOSPOS') != -1) {*/
	
	//Step one: replace images

	images = document.getElementsByTagName('img');
	//console.log(images);
	for (i=0;i < images.length;i++) {
		//console.log(images[i].getAttribute("src"));
		//since we removed an ima ge, images all get moved down by one... fuckin weird i know... ugh.
		switch (images[i].getAttribute("src")) {
			case "http://fi.somethingawful.com/images/forum-post.gif":
				removeAndReplace(images[i], "Post");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/buttons/button-bookmark.gif":
				//I'm just flat removing this because it's weird and JavaScripty... I'll look into it later if people REALLY NEED IT but there's always the link at the bottom of the thread vOv
				images[i].parentNode.parentNode.removeChild(images[i].parentNode); //fuck JavaScript's XML DOM forever
				i = i - 1; 
				break;
			case "http://fi.somethingawful.com/images/forum-reply.gif":
				removeAndReplace(images[i], "Reply");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/sa-quote.gif":
				removeAndReplace(images[i], "Quote");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/images/sa-edit.gif":
				removeAndReplace(images[i], "Edit");
				i = i - 1;
				break;
			case "http://forumimages.somethingawful.com/images/button-report.gif":
				removeAndReplace(images[i], "Report");
				i = i - 1;
				break;
			//  a whole bunch of vote imgs!!!
			case "http://fi.somethingawful.com/rate/default/1stars.gif":
				removeAndReplace(images[i], "CRAP");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/2stars.gif":
				removeAndReplace(images[i], "**");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/3stars.gif":
				removeAndReplace(images[i], "***");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/4stars.gif":
				removeAndReplace(images[i], "****");
				i = i - 1;
				break;
			case "http://fi.somethingawful.com/rate/default/5stars.gif":
				removeAndReplace(images[i], "*****");
				i = i - 1;
				break;
			// sure this image is innocuous enough but since literally no one has ever used it, i think it can be dropped
			case "http://fi.somethingawful.com/images/sortasc.gif":
				images[i].parentNode.innerHTML = "";
				i = i - 1; 
				break;
		}
	}
	
	
	//mod stars are defined in css and are not an <img>
	//the little "edited by" image is the same way
	
	
	//TO-DO: '>' sign on unread posts
	
	//TO-DO: make buttons out of replaced images... could be annoying as FUCK. maybe dont do this. :effort:
	
	//i don't edit the css file here obviously; not insane. too bad i can't use firefox's nice e4x thing to just directly embed this because ~chrome~ so i have to run a script to add all those slahes...
	
//}

function removeAndReplace(image, replacementText) {
	console.log("Replacing ");
	console.log(image);
	image.parentNode.innerHTML = replacementText;
}

//thanks first result for get elements by class on google
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