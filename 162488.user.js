// ==UserScript==
// @name       Cornucopia new comments
// @namespace  lundgren
// @version    0.1
// @description  Mark comments that has been added since your last visit with a red border so you can find them easier and an unread counter to the first page.
// @match      http://cornucopia.cornubot.se/*
// @copyright  2013+, Lundgren
// ==/UserScript==

var mainPage = "http://cornucopia.cornubot.se";
var numberMatcher = /\d+/;
var pageName = window.location.pathname;

if (pageName === "/") {
    var commentLinks = document.getElementsByClassName("comment-link");
	
    for (var i = 0; i < commentLinks.length; i++) {
        var link = commentLinks[i];
        var page = link.href.substr(mainPage.length, link.href.indexOf('#') - mainPage.length);
        var readItems = localStorage.getItem(page);
		
        if (readItems !== null) {
            var read = parseInt(readItems);
            var count = (link.innerText || link.text).match(numberMatcher);
            var unread = count - read;
			
            if (unread > 0) {
				if (link.innerText) {
					link.innerText += " (" + unread + " nya)";
				}
				else {
					link.text += " (" + unread + " nya)";
				}
            }
        }
    }
}
else {
    var comments = document.getElementsByClassName("comment-block");
    var pageRead = localStorage.getItem(pageName) !== null;
    localStorage.setItem(pageName, comments.length);
    
    for (var i = 0; i < comments.length; i++) {  
        var commentId = comments[i].id;
        var commentRead = localStorage.getItem(commentId) === "y";
        
        if (pageRead && !commentRead) {
            var text = document.getElementById(commentId).getElementsByTagName("p")[0];
            text.style.borderLeft = "thick solid #ff0000";
            text.style.paddingLeft = "5px";
        }
        
        localStorage.setItem(commentId, "y");
    }
}
