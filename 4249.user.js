// ==UserScript==
// @name        digg - colorize links by category
// @namespace   http://www.webjudge.net
// @description Colorizes Digg links based on category
// @include     http://digg.com/
// @include     http://*.digg.com/
// @include     http://digg.com/index/page*
// @include     http://*.digg.com/index/page*
// @include	http://digg.com/view/*
// @include	http://*.digg.com/view/*
// ==/UserScript==

document.getElementsByClassName = function ( className )
{
  var elements = new Array ();
  var children = document.getElementsByTagName( "*" );
  for ( var a = 0; a < children.length; a++ ) {
    if ( children[a].className == className ) elements.push ( children[a] );
  }
  return elements;
}

function colorizeByCategory(body, details) {
   var category = details.childNodes[7].childNodes[1].childNodes[0].nodeValue;
   var link = body.childNodes[1].childNodes[0];

   GM_log("There's a story about " + category + " here");
   var linkColor = null;
   if(category == 'Science') {
      linkColor = "orange";
   } else if(category == 'Deals') {
      linkColor = "teal";
   } else if(category == 'Technology') {
      linkColor = "green";
   } else if(category == 'Apple') {
      linkColor = "red";
   } else if(category == 'Linux/Unix') {
      linkColor = "black";
   } else if(category == 'Software') {
      linkColor = "grey";
   } else if(category == 'Gaming') {
      linkColor = "magenta";
   } else if(category == 'Security') {
      linkColor = "aqua";
   } else if(category == 'Hardware') {
      linkColor = "silver";
   } else if(category == 'Links') {
      linkColor = "maroon";
   }

   if(linkColor != null) {
      GM_log("Changing color");
      link.style.color = linkColor;
   }
   // also add the category to the text
   var origText = link.childNodes[0].nodeValue;
   link.childNodes[0].nodeValue = "[[" + category.toUpperCase() + "]] " + origText;
}

var stories = document.getElementsByClassName('news-summary');
GM_log("We found " + stories.length + " stories on this stupid Web page.");
for(var i = 0; i < stories.length; i++) {
   var newsBody = null;
   var newsDetails = null;

   var childObj = stories[i].childNodes;
   for(var j = 0; j < childObj.length; j++) {
      if(childObj[j].className == 'news-body') {
          newsBody = childObj[j];
          break;
      } 
   }
   childObj = newsBody.childNodes;
   for(j = 0; j < childObj.length; j++) {
      if(childObj[j].className == 'news-details') {
         newsDetails = childObj[j];
         break;
      }
   }
   colorizeByCategory(newsBody, newsDetails);
}
