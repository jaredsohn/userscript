// ==UserScript==
// @name        PussyTorrents New Layout / Design
// @namespace   PussyTorrents
// @description It Gives New Layout / Design To PussyTorrents
// @include     http://www.pussytorrents.org/*
// @grant       none
// @version     1
// ==/UserScript==

$(".navbar").hide();            // hides the original navigation bar ( menu )
$(".bookmarkButton").hide();    // hides the bookmark buttons ( top & bottom )
$(".span4").hide();             // hides the original messages button and it's img


/* style the user info bar */
var userInfoBar = document.getElementById('memberBar');

userInfoBar.style.width="750px";
userInfoBar.style.textAlign="center";
userInfoBar.style.margin="20px auto";


/* make the new custom menu & go-to-top button */
NewTopValues = [ "233px", "266px", "299px", "332px", "365px", "398px", "431px", "464px", "497px", "530px", "0px" ];
NewMenuNames = [ "PT Home", "Browse Page", "User\'s Profile", "Forums", "VIP Section", "Chat", "Upload Page", "FAQ & Rules", "View Staff", "Messages", "^" ];
NewMenuItemLinks = [ "../", "/torrents/browse", "/profile", "/forums", "/user/donate", "/chat", "/upload", "/forums/categories/documentation", "/staff/list", "/user/messages", "#top" ];
NewMenuItemTitles = [ "Go To The PT Home Page", "Go To The Browse Page", "Go To The User\'s Profile Page", "Go To The Forums Page", "Go To The VIP Section", "Go To The IRC / Chat Page", "Go To The Upload Page", "Go To The FAQ & Rules Page", "View Staff Members", "View Your Messages", "Go To The Top" ];

window.onload = function makeNewMenu() {
    for(var i=0; i<NewMenuNames.length; i++) {
    
            var customMenu = document.createElement('a');
            customMenu.text = NewMenuNames[i];
            customMenu.title = NewMenuItemTitles[i];
            customMenu.href = NewMenuItemLinks[i];
            document.body.appendChild(customMenu);
    
            customMenu.style.position = "fixed";
            customMenu.style.border = "1px solid #501a37";
            customMenu.style.borderRadius = "5px";
            customMenu.style.textDecoration = "none";
            customMenu.style.background = "#802A59";
            customMenu.style.color = "white"; 
            
            if(NewMenuNames[i] != "^") {
        	    customMenu.style.width = "90px";
        	    customMenu.style.padding = "5px";
                customMenu.style.top = NewTopValues[i];
                customMenu.style.left = "5px";
            }
            
            else {
                customMenu.style.bottom = "10px";
    		    customMenu.style.right = "10px";
    	       	customMenu.style.padding = "3px";
            }   

        (function(newTab) {
            newTab.onmouseover = function() { newTab.style.background = "#501a37"; };
            newTab.onmouseout = function() { newTab.style.background = "#802A59"; };
        }(customMenu));
	}
}