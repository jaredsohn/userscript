// ==UserScript==
// @name        Universal Hub Killfile
// @description Filters out posts on universalhub.com by users who are known to argue in bad faith.
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     http*://*universalhub.com/*
// @version     1.00
// ==/UserScript==

	var usernameList = ["O-FISH-L", 
	   "Pete Nice", 
	   "ihateboston", 
	   "Markk02474", 
	   "bulgingbuick",
       "jakester",
	   "Will LaTulippe"];

	   
	var curIdIndex = 0;
$('article:has(footer.comment-submitted:has(span[rel="sioc:has_creator"]))').filter(function(idx) {       
   
    var authorUrl = $(this).find('.username')[0].toString();
    // If this is a registered user, we now have a handle to their full
    // profile page.  Otherwise we have an object that swe need to pull the
    // first child out of

    var author;
    if (authorUrl.indexOf("http://www.universalhub.com/users") != -1) {
      author = authorUrl.substring(34);
    } else {
      author = $(this).find('.username')[0].innerHTML;
    }
      for (ii = 0; ii < usernameList.length; ii++) {
        if (author.indexOf( usernameList[ii].toLowerCase() ) > -1) {
            var curUser = usernameList[ii];
            curIdIndex++;
            // Hide the title div
            $(this).prev().css("display", "none");
            $(this).prev().attr("id", "title_" + curIdIndex);
            
            // Swap out the offending text
            $(this).attr("id", "comment_" + curIdIndex);
    		$(this).html("<div>Hid comment by " + curUser + "</div>");
    		
    		// Check to see if the following section is indented below this one, which
    		// indicates that it's a response.  If so, hide it as well.
    		if (typeof $(this).next().attr("class") != "undefined") {
        		var classList = $(this).next().attr("class").split(/\s+/);
                for (var i = 0; i < classList.length; i++) {
                   if (classList[i] === 'indented') {
                     $(this).next().css("display", "none");
                     $(this).next().attr("id", "indent_" + curIdIndex);
                   }
                }
            }
            return true;
        }
      
    }
       return false;
    });
    