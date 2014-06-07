// ==UserScript==
// @name        KG - add useful links
// @namespace   KG
// @include     http*://*karagarga.net/*
// @exclude     http*://forum.karagarga.net/*
// @grant	none
// @version     1.7
// ==/UserScript==

var iconUpload = "data:image/png;base64,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";

if (!window.frameElement) {

	// add icon link to My Torrents
	var target = document.getElementsByTagName('nobr')[1];
	var uploads = document.createElement('span');
	uploads.innerHTML = "<a href='mytorrents.php' title='My uploads'> <img src=' " + iconUpload + " '> </a>";
	target.insertBefore(uploads, target.firstChild);
	
	
	// torrent details page
        if (window.location.href.indexOf('/details.php') != -1) {
        	/* added to site code
			// add link that jumps to comments
    		var commLink = document.createElement('a');
        	commLink.textContent = "Comments>> ";
        	commLink.href = "#startcomments";
        	// uncomment next line to stop images loading when clicking the link
        	// commLink.setAttribute("onclick", "javascript: window.stop(); return true;");
        	var filmTitle = document.querySelector("H1");	
        	filmTitle.parentNode.insertBefore(commLink, filmTitle.nextSibling);
        	*/
        	
        	// link to search for subtitles
        	var headings = document.querySelectorAll(".heading");
                for (i=0; i < headings.length; i++) {
                      if (headings[i].textContent.indexOf('Subtitles') == 0) {
                              var subs = headings[i].parentNode.getElementsByTagName('td')[1];;
                      }
			if (headings[i].textContent.indexOf('Year') == 0) {
                              var year = headings[i].parentNode.getElementsByTagName('td')[1].textContent;
                      }

                }
                var title = document.title.replace('KG - ', '');
                title = title.split(/\(\d{4}\)/)[0]; 
                var searchLink = "http://dereferer.org/?http://www.opensubtitles.org/en/search2/sublanguageid-eng/movieyearsign-1/movieyear-" + year + "/subformat-srt/moviename-" + title;
		subs.innerHTML += "<div><a href=' " + searchLink + " ' target='_blank'>Search opensubtitles.org</a></div>";
        	
        	
	}
	

	// user details page
	
        /*  added to site code
        if (window.location.href.indexOf('/userdetails.php') != -1) {

		// add link to send bonus (can't be used if you're not a power user)
		var userName = document.getElementsByTagName('h1')[0];
		var url = "https://karagarga.net/bonustransfer.php?sub1=y&getuser=" + userName.textContent;
		var newLink = " <a href=' " + url + " '>Send Bonus!</a> ";		
		userName.parentNode.parentNode.parentNode.parentNode.nextSibling.innerHTML += newLink;

		// add link to user's uploads
		url = "https://karagarga.net/browse.php?sort=added&search_type=uploader&d=DESC&search=" + userName.textContent;
		newLink = "- <a href=' " + url + " '>User's uploads</a>";		
		userName.parentNode.parentNode.parentNode.parentNode.nextSibling.innerHTML += newLink;
	}
	*/
	
}