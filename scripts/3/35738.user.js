// ==UserScript==
// @name          PlayListar.com Save MP3 Link
// @namespace     http://www.playlistar.com/
// @description	  Add a link to save MP3 links on your account at PlayListar.com
// @include       *
// ==/UserScript==


//sends ajax request to playlistar.com to save an mp3 associated with your username
//you can approve or reject all songs added to your account once you are logged in
function sendRequest()
  { var username = this.getAttribute('username');
    var url = this.getAttribute('mp3link');
	GM_xmlhttpRequest({
	    method: 'POST',
	    url: 'http://www.playlistar.com',
	    headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Content-type': 'application/x-www-form-urlencoded',
	    },
	    data: 'do=addoutsidetrack&username='+username+'&fileurl='+url,
	    onload: function(responseDetails) {
		alert(responseDetails.responseText);
	    }
	});	   
      var iconOff = "data:image/gif;base64,R0lGODlhFAAUAKIAAAEBASAgIDc3N2pqaqurq9HR0fDw8PHx8SH5BAAAAAAALAAAAAAUABQAAAOQCLrcfubAaKIspUJltZbGIHTK9EGTIGQbgJoFIYvCIBOlpw2AEASAgE%2FAiWEGg8zgp%2FglFQVggxAiBgcVaFOkwC6ZgxYOQDgUuoclMlg4dKGGMyApKBsIAWqzp1RQWRUYBgx5PD06FBEOCisdFR4MSEiPiZSDjBmJICYUC1iIJ5t%2BmZqPL4oAlBIgpjqLrw4JADs%3D";
      this.innerHTML  = '<img src="'+iconOff+'" style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle" alt="Stream MP3" />';
      this.setAttribute('title','You have already cross-linked this to Playlistar.com');
  }
  
  
//debugging function  
  function alertDebug()
  {
	return alert( this.getAttribute('mp3link') );	  
  }

//get username or request it if not present in GM memory
var username = '';
if (!GM_getValue('username')) {
	username = prompt("What is your Playlistar.com user name ?");
	GM_setValue('username', username);
} else {
	username = GM_getValue('username');
}
	
//our icon
//do image conversion here: http://software.hixie.ch/utilities/cgi/data/data
var iconOn = "data:image/gif;base64,R0lGODlhFAAUAKIAABQUFEBAQGtra5eXl7KystTU1Obm5v39%2FSH5BAAAAAAALAAAAAAUABQAAANrCLrc%2Fi0ESAEpFZYycxDgsBGgUBFHYRiHoWLKJw3DNKxHaxBdwOZA0yW3YwSIwwMBcMMNGIKc6ai07AatDjM3odYKJoDAEPalJqjD1NgjCtIwShSY42SwSgLhmQEUzn0MOUuBCyBahYmKFAkAOw%3D%3D";
var iconOff = "data:image/gif;base64,R0lGODlhFAAUAKIAAAEBASAgIDc3N2pqaqurq9HR0fDw8PHx8SH5BAAAAAAALAAAAAAUABQAAAOQCLrcfubAaKIspUJltZbGIHTK9EGTIGQbgJoFIYvCIBOlpw2AEASAgE%2FAiWEGg8zgp%2FglFQVggxAiBgcVaFOkwC6ZgxYOQDgUuoclMlg4dKGGMyApKBsIAWqzp1RQWRUYBgx5PD06FBEOCisdFR4MSEiPiZSDjBmJICYUC1iIJ5t%2BmZqPL4oAlBIgpjqLrw4JADs%3D";
	
  var links = document.evaluate('//a', document, null, XPathResult.ANY_TYPE, null); 
  var mp3_links = new Array();
  var current_link = links.iterateNext();
  while (current_link) {
    var href = current_link.getAttribute('href');
    if (href) {
	if (href.match(/\.mp3$/i)) {
        	mp3_links.push(current_link);
	}
    }
    current_link = links.iterateNext();
  }
  for (var i = 0; i < mp3_links.length; i++) {
      var m3u_link = document.createElement('a');
  // old method - do the post in a new browser window - lazy - confusing
  // m3u_link.setAttribute('href', 'data:audio/x-mpegurl,' + escape(mp3_links[i].href));
  
  //new method do an ajax post
    m3u_link.setAttribute("id","pstar"+i);
    m3u_link.setAttribute('mp3link',mp3_links[i].href);
    m3u_link.setAttribute('username',username);
    //our ajax event handler
    m3u_link.addEventListener("click", sendRequest, true );
    m3u_link.setAttribute('title', 'Add this MP3 to Playlistar.com');
    m3u_link.setAttribute('target','new');
    m3u_link.innerHTML 
        = '<img src="'+iconOn+'"'
        + ' style="border: 0; margin: 0 0 0 2px; padding: 0; vertical-align: middle"'
        + ' alt="Stream MP3" />';
      mp3_links[i].parentNode.insertBefore(m3u_link, mp3_links[i]);
      mp3_links[i].parentNode.insertBefore(mp3_links[i], m3u_link);
  }