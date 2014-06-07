// ==UserScript==
// @name           maangchi photo contest
// @namespace      CRD
// @include        http://www.maangchi.com/photo-contest
// @description    Sorts the photos in the photo contest on maangchi.com by vote count.
// ==/UserScript==

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

setTimeout( function() {
	var photos = getElementsByClassName('psgal_1');
	var photosWrapper = document.getElementById('bwbps_stdgal_1');
	
	photos.sort(function(a,b) {
		var aVotes = parseInt(getElementsByClassName('bwbps-vote-total', '', a)[0].innerHTML);
		var bVotes = parseInt(getElementsByClassName('bwbps-vote-total', '', b)[0].innerHTML);
		
		return bVotes - aVotes;
	});
	
	for( var i = 0; i < photos.length; i++ )
	{
		photosWrapper.appendChild(photos[i]);
	}
}, 100);