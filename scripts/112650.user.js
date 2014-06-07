// ==UserScript==
// @name           lastfm-library-pic
// @namespace      http://userscripts.org/users/398905
// @description    changes the artist picture in a user's library to one of your choice
// @include        http://www.lastfm.*/user/*
// @include        http://www.last.fm/user/*
// @include        http://cn.last.fm/user/*
// ==/UserScript==
//
// 2011-10-08 v0.02 fixed some escaped characters
// 2011-09-10 v0.01 initial release
//
//
var userData=[
/*  ###################################################################################
        put your user data here, using the format in the examples:
                ["artistname","http://picture_URL"],
        
        Remember that the image will be scaled to width=126 pixels.
    ################################################################################### */
    
	["Monrose","http://userserve-ak.last.fm/serve/126/46455007.png"],
	["Lady Gaga","http://b.mp-farm.com/f/128x134/100000/126053.jpg"]
	
/*  ###################################################################################
        end of user data
    ################################################################################### */
];

var allAnchors = document.getElementsByTagName("A");

for( i=0; i<allAnchors.length; i++){
	if( allAnchors[i].firstChild.className == "pictureFrame" ){
		// this link has <span class="pictureFrame">
		
		// get text & unescape from HTML standard:
		var shownName = allAnchors[i].lastChild.innerHTML;
		shownName = shownName.replace(/&lt;/g, "<");
		shownName = shownName.replace(/&gt;/g, ">");
		shownName = shownName.replace(/&quot;/g, "\"");
		shownName = shownName.replace(/&amp;/g, "&");
		
		// see if we want this artist:
		for(j=0; j<userData.length; j++){
			if( shownName == userData[j][0] ){
				// artist name in pictureFrame matches this name in userData
				
				// get the HTML & replace the image URL:
				var theHTML=allAnchors[i].innerHTML.replace(/src=\"\S+\"/,"src=\""+userData[j][1]+"\"");
				
				// remove the height parameter to preserve aspect ratio, & save to document:
				allAnchors[i].innerHTML=theHTML.replace(/height=\"\d+\"/,"");
				break;
			}
		}
	}
}

// this works on user profile page & first page of library
// pics for rest of library aren't coded in the page html
