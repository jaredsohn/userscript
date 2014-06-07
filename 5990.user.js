// ==UserScript==
// @name        Newsvine AutoMod
// @version     0.9.1
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.newsvine 
// @description Automatically mods up comments when you visit a page.
// @include     http://newsvine.com/_news/*
// @include     http://*.newsvine.com/_news/*
// ==/UserScript==

//Copyright (C) 2006 Lukas Fragodt.
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html
//
//This script is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.

//CAVEAT: This script does not up-vote a Friend comment when the Friend comment is
//an Author comment. This script relies on the Newsvine class attributes. For Newsvine,
//the Author class trumps the Friend class. There is no simple mechanism for determining
//whether or not an Author is also a Friend without loading an additional page. This
//will be an option in a future version of the script. 

//Other issues: 
//Need error-handling after vote to determine whether or not to 'check' toolsboxes.
//If multiple tabs are open, checkboxes can get out of sync.

function toggleMod ( key ) {
//toggles AutoMod flags
   if ( GM_getValue && GM_setValue ) {
      GM_setValue( key, !GM_getValue( key ) ); 
   }
   
   //If now set to true, AutoMod for this type.
   if ( GM_getValue( key ) ) {
      autoMod( key ); 
   }
}

function getElementsByClassRegExp ( element, className, root ) {
//Returns an array of all elements of a particular class.
//element   - string element name
//classname - regular expression for class
//root      - root element of DOM branch to search - defaults to document root

  var root = (root == null) ? document : root;
  var elements = root.getElementsByTagName(element);
  var retVal = new Array();

  for (var i = 0; i < elements.length; i++) {
    if (className.exec(elements[i].className)) {
      retVal.push(elements[i]);
    }
  }

  return retVal;
}

function getContentId() {
//grabs newsvine contentId for the article
   var urlMatch = /http:\/\/(.*\.)?newsvine\.com\/_news\/\d{4}\/\d{2}\/\d{2}\/(\d*).*/;
   urlMatch.exec(document.location);
   return RegExp.$2;
}

function getSubdomain() {
//returns subdomain of URL
   var subdomainRegExp = /http:\/\/(.*\.)newsvine\.com/;
   var subdomain = '';
   if (subdomainRegExp.exec(document.location) != 0) {
     subdomain = RegExp.$1;
   }
   return subdomain;
}

function vote( subdomain, contentId, commentId ) {
//Casts up-vote to the newsvine server.
   GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + subdomain + 'newsvine.com/_action/user/doCommentVote.php',
        headers:{
          'User-Agent':window.navigator.userAgent,
          'Accept':'text/*',
          'Content-type':'application/x-www-form-urlencoded'
        },
        data:'contentId='+contentId+'&commentId='+commentId,
        onload: function (responseDetails) {
          if (!responseDetails.status == 200) {
            GM_Log( "Unable to upvote: " + responseDetails.responseText );
          }
        },
        onerror: function (responseDetails) {
            GM_Log( "Unable to upvote: " + responseDetails.responseText );
        }
      });
}

function autoMod( key ) {
//Automatically votes up all comments of a given type.
   var keyClassName = new RegExp( "^commentbody\\ " + key + "$" );
   var comments = getElementsByClassRegExp('div', keyClassName );

   var subdomain = getSubdomain();
   var contentId = getContentId();

   //Loop through each comment, looking for voting anchors.
   for ( var i = 0; i < comments.length; i++ ) {
      var commentId = comments[i].id.substring( 1, comments[i].id.length );
      var toolsboxes = getElementsByClassRegExp( 'div', /^toolsbox$/, comments[i] );
      //Only the first toolsbox is valuable. Any others are children comments that are either
      //not the comments we are looking for or are already in our comments array.
      var toolsbox = toolsboxes[0];
      //If the toolsbox is still clickable, we can vote on it.
      if ( toolsbox.firstChild.tagName == 'A' ) {
         vote( subdomain, contentId, commentId );
         
         //Change up arrow to check mark.
         newBox = document.createElement( "div" );
         newBox.innerHTML = toolsbox.firstChild.innerHTML;
         newBox.childNodes[1].src = 'http://www.newsvine.com/_vine/images/_/icon_check.gif';

         //Increment the counter.
         newBox.firstChild.innerHTML = parseInt(newBox.firstChild.innerHTML) + 1;

         toolsbox.style.backgroundColor = '#e7e7e7';
         toolsbox.replaceChild(newBox, toolsbox.firstChild);
      }
   }
}

function initConfig() {

   //get current config
   var authorChecked   = GM_getValue( 'author',    false ) ? 'checked="checked"' : '';
   var friendChecked   = GM_getValue( 'friend',    false ) ? 'checked="checked"' : '';
   var newsvineChecked = GM_getValue( 'newsvine',  false ) ? 'checked="checked"' : '';
   var userChecked     = GM_getValue( 'user',      false ) ? 'checked="checked"' : '';

   //Add section title 
   namTitle = document.createElement( 'h3' );
   namTitle.innerHTML = 'AutoMod Options';
   document.getElementById('sidebar').appendChild( namTitle );

   //Add config options
   configBox = document.createElement( 'div' );
   configBox.id = 'autoModConfig';
   configBox.style.marginLeft  = '14px';
   configBox.style.marginRight = '14px';
   configBox.style.lineHeight  = '1.5em';

   configBox.innerHTML =                       '<form id="automod" />';
   configBox.innerHTML = configBox.innerHTML + '<input type="checkbox" value="' + authorChecked   + '" id="inputAuthor" /> AutoMod Author<br />';
   configBox.innerHTML = configBox.innerHTML + '<input type="checkbox" value="' + friendChecked   + '" id="inputFriend" /> AutoMod Friend<br />';
   configBox.innerHTML = configBox.innerHTML + '<input type="checkbox" value="' + newsvineChecked + '" id="inputNewsvine"  /> AutoMod Staff<br />';
   configBox.innerHTML = configBox.innerHTML + '<input type="checkbox" value="' + userChecked     + '" id="inputUser"    /> AutoMod You<br />';
   configBox.innerHTML = configBox.innerHTML + '</form>';

   document.getElementById( 'sidebar' ).appendChild( configBox );
   
   document.getElementById( 'inputAuthor'   ).addEventListener( 'click', function(event) { toggleMod( 'author'    ); }, false );
   document.getElementById( 'inputFriend'   ).addEventListener( 'click', function(event) { toggleMod( 'friend'    ); }, false );
   document.getElementById( 'inputNewsvine' ).addEventListener( 'click', function(event) { toggleMod( 'newsvine'  ); }, false );
   document.getElementById( 'inputUser'     ).addEventListener( 'click', function(event) { toggleMod( 'user'      ); }, false );

}

if (GM_getValue && GM_setValue) {
   //Set up configuration panel
   initConfig();

   //AutoMod
   if ( GM_getValue( 'author'   , false ) ) { autoMod( 'author'    ); }
   if ( GM_getValue( 'friend'   , false ) ) { autoMod( 'friend'    ); }
   if ( GM_getValue( 'newsvine' , false ) ) { autoMod( 'newsvine'  ); }
   if ( GM_getValue( 'user'     , false ) ) { autoMod( 'user'      ); }
} else {
   //old version of GM; default to only (and always) modding users' own posts
   autoMod( 'user' );
}
