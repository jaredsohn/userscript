// ==UserScript==
// @name          CleanerFB
// @version 	  1.0
// @description   "John doe and 43553 other friends joined the group 'LOL OMG I HATE WHEN I FORGET WHERE I PUT MY KEYS HAH XDDDDD'"
// @include 	  http://*.facebook.com/*
// @include 	  https://*.facebook.com/*
// ==/UserScript==



/**** CONFIG ****/

var remFriendMsg = true;
var remGroupMsg = true;
var remFanMsg = true;

var remEventMsg = false;
var remTagMsg = false;

/**** CONFIG ****/


var docLen = 0;
var timer;
var exp;

function onDocumentChange(){
	var stories = document.getElementsByTagName('h3');
	
	for(var i = 0; i < stories.length; i++){
		if(stories[i].className == 'GenericStory_Message GenericStory_Report'){
			if(exp.test(stories[i].innerHTML)){
				stories[i].parentNode.parentNode.style.display = 'none';
			}
		}
	}
}


function checkForChanges(){
	if(docLen != document.getElementsByTagName('body')[0].innerHTML.length){
		docLen = document.getElementsByTagName('body')[0].innerHTML.length;
		
		onDocumentChange();
	}
}

function constructRegExp(){
	var expString = '(';
	
	
	if(remFriendMsg){
		expString += 'are now friends|';
		expString += 'is now friends|';

                expString += 'är nu vänner|';
	        expString += 'är nu vän med|';
	}
	if(remGroupMsg){
		expString += 'joined the group|';

		expString += 'har gått med i gruppen|';
                expString += 'gick med i gruppen|';
	}
	if(remFanMsg){
		expString += 'became fans of|';
		expString += 'became a fan|';

		expString += 'har blivit ett fan|';
		expString += 'har blivit fans till|';
                expString += 'fans|';
	}
	if(remEventMsg){
		expString += 'is attending|';

	        expString += 'kommer att delta|';
	}
	if(remTagMsg){
		expString += 'were tagged in an album|';

		expString += 'har taggats i ett album|';
	}
	
	expString = expString.replace(/\|$/, ')');
	exp = new RegExp(expString);
}


constructRegExp();
window.addEventListener('load',  function () { timer = setTimeout(checkForChanges, 1000) }, true);
window.addEventListener('scroll', function () { clearTimeout(timer); timer = setTimeout(checkForChanges, 500) }, true);
