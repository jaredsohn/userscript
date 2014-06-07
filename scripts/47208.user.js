// This is a Greasemonkey user script.
// ==UserScript==
// @name          eHarmonyAccelerator
// @namespace     http://simonwoodside.com
// @description   This script adds tabs at the top of the profile display pages to quick-close a match, and to quickly close with reason "Other".
// @include       http://www.eharmony.ca/*
// @include       http://www.eharmony.com/*
// ==/UserScript==

// The "set" is apparently the ID of the user you're looking at
var eHSet = getQueryParameter('set');

// Configuration - change these if eHarmony changes the names of things
fullProfilePage = "review"
imagesPage = "matchview"
closeMatchPage = "closematch"
tabBarClassName = "myMatchesSubtabs"

// Figure out what page we're on
pathArray = window.location.pathname.split('/');
curPage = pathArray[pathArray.length-1];

// Find the tab bar
tabBar = getElementsByClassName( tabBarClassName )[0];
//if( !tabBar ) { displayError('Unable to find the tab bar.'); return; }

switch( curPage ) {
case fullProfilePage:
case imagesPage:
  addTabItem( "Close Match", "location.href = '/singles/servlet/user/comm/closematch?set=" + eHSet + "'" );
  break;
case closeMatchPage:
  window.addEventListener('load', function() {
    // this should work but GM is messing it up: document.chooseCloseReasonForm.chosenReasons[17].checked = true;
    document.forms[1].elements[18].checked = true;
   }, true);
  addTabItem( "Close (Other)", "document.getElementsByName('chooseClosed')[0].click()" );
  break;
}


function addTabItem( title, onclick ) {
  item = document.createElement('div');
  item.innerHTML = '<div class="tab" style="background: #aff"><p>' +
      '<a onclick="' + onclick + '" href="#">' + title + 
      '</a></p></div>';
  tabBar.appendChild( item );
}


//
// "library" functions
//
function displayError( msg ) {
  GM_log( "ERROR: " + msg );
  GM_log( "You may need a new version of eHarmonyAccelerator greasemonkey script." );
}

function getQueryParameter( name ) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp( regexS );
  var results = regex.exec( window.location.href );
  if( results == null )
    return "";
  else
    return results[1];
}

// from http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\\\s)" + className + "(\\\\s|$)");
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