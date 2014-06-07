// ==UserScript==
// @name        Newsvine AutoVote
// @version     1.0
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.newsvine 
// @description Automatically votes up articles when you visit them.
// @include     http://newsvine.com/_news/*
// @include     http://*.newsvine.com/_news/*
// ==/UserScript==

//Version History
//1.0 - 2006-10-29 - Promoted to version 1.0.
//                 - Changed alsoVote code to reflect changes at Newsvine. 
//0.5 - 2006-10-17 - Original release.

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

function vote( subdomain, contentId ) {
//Casts up-vote to the newsvine server.
   GM_xmlhttpRequest({
        method:'POST',
        url:'http://' + subdomain + 'newsvine.com/_action/user/doVote.php',
        headers:{
          'User-Agent':window.navigator.userAgent,
          'Accept':'text/*',
          'Content-type':'application/x-www-form-urlencoded'
        },
        data:'contentId='+contentId,
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

function removeAlsoVote() {
   var head = document.getElementsByTagName('head')[0];
   var style = document.createElement('style');

   style.innerHTML = '#alsoVote { display:none }';
   head.appendChild( style );
}

function autoVote() {
//Automatically votes up the article.

   //Do the vote
   vote( getSubdomain(), getContentId() );

   //"Animate" (actually just sets images to the end point of the animation)
   var voteBox = document.getElementById('voteCount_top_of_page');
   voteBox.previousSibling.src = 'http://www.newsvine.com/_vine/images/_/icon_b_check.gif';
   voteBox.parentNode.className = 'b_darkgrey_right';
   voteBox.parentNode.parentNode.parentNode.className = 'b_darkgrey noborder';

   //Increment the vote counter
   voteBox.innerHTML++;

   //remove the alsoVote submit option 
   removeAlsoVote();
}

autoVote();
