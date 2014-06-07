// ==UserScript==
// @name RottenNetflix
// @namespace http://kortve.bu.edu
// @description Includes an "ADD TO NETFLIX" link directly below the title of any Rotten Tomatoes movie page.
// @include http://*rottentomatoes.com/m/*
// ==/UserScript==

var movieTitle;

movieTitle = document.title;
movieTitle = movieTitle.replace(/Movie Reviews,.*/,"");

var origTitle = document.getElementsByTagName("h1")[0];

//  var attrs = origTitle.attributes;
//  var text = ""; 
//  for(var i=attrs.length-1; i>=0; i--) {
//      text += attrs[i].name + "->" + attrs[i].value;
//  }
//  alert(text);

if (origTitle) {
    var myImage = document.createElement('img');
    myImage.src ="http://cdn.nflximg.com/us/icons/nficon.ico";
    var link = document.createElement('a');
    link.setAttribute('href', makeNetflixUrl(movieTitle));
    link.setAttribute('style', 'color:#cc0000; padding-left:10px');

    var label = document.createTextNode( "ADD TO NETFLIX" );
    link.appendChild(myImage);
    link.appendChild(label);
    origTitle.parentNode.insertBefore(link, origTitle.nextSibling);
}

function makeNetflixUrl(movietitle) {
    var Netflixurl = 'http://www.netflix.com/Search?v1='+ escape(movietitle);
    return Netflixurl;
}
