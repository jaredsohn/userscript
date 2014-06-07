// ==UserScript==
// @name          Flickr - Video Hider
// @description	  Hides videos on Flickr
// @author		Michael Hewett
// @namespace     http://bludger.org/
// @include       http://www*.flickr.com/photos/*/*
// @include       http://flickr.com/photos/*/*
// @include       http://flickr.com/photos/*
// @version       1.0 10-Apr-2008
// ==/UserScript==

document.title = (document.title.replace('& Video ', ''));
document.title = (document.title.replace(' and videos', ''));

var allAnchors = document.getElementsByTagName('a');

for (i=0; i<=allAnchors.length-1; i++) {

	allAnchors[i].title.replace(' and videos', '');
	allAnchors[i].title.replace(' and Videos', '');

	if (allAnchors[i].title.indexOf('Play Video') > -1) { // then it's a video
	
		var linkToVideo = allAnchors[i].href;
		var videoTitle = allAnchors[i-1].title;
		var divToHide = getParent(allAnchors[i].id, 'DIV');
		
		if (divToHide[0].id) {
			document.getElementById(divToHide[0].id).innerHTML = '<p class="privacy">View "<a href="' + linkToVideo + '">' + videoTitle + '</a>".</p>';
}
		
		divToHide = '';
	}
}

function getParent(element, parent){
	if(typeof element=="string"){element=document.getElementById(element);};
	if(!element){return null;};
	var elements=[];
	if(typeof parent!="string"){/*no parent: gets all parents till #document*/
		while(element.parentNode){
		element=element.parentNode;
		elements.unshift(element);
			if(element==parent){return elements;};
		}
	}
	else{/*string, presumes you want to locate the first parent node that is such TAG*/
	parent=parent.toUpperCase();
		while(element.parentNode){
		element=element.parentNode;
		elements.unshift(element);
			if(element.nodeName && element.nodeName.toUpperCase()==parent){return elements;};
		}
	};
	return elements;
	/* keep this comment to reuse freely:
	http://www.fullposter.com/?1 */
}
