// ==UserScript==
// @id             Stop autoplay in embedded youtube videos
// @name           Stop autoplay in embedded youtube videos
// @version        1.2
// @namespace      
// @author         
// @description    Stop autoplay in embedded youtube videos. Enabled for mercola.com, works with any website.
// @include        http://*mercola.com*
// @run-at         document-end
// ==/UserScript==

function NoAutoplayEmbed() {	
	
var allLinks = document.getElementsByTagName('iframe');

  for (var i=0;i<allLinks.length;i++) {
  	
    var currentLink = allLinks[i];
    
    if(currentLink.src.match("http*://www.youtube.com/embed/.*[^#]$")) {
    	
      var orgLink = String(currentLink.src.match("http*://www.youtube.com/embed/.*[^#]$"));
      var youtubeID = orgLink.match( /[a-zA-Z0-9\-\_]{11}/ ); 
      //alert("youtubeID="+youtubeID);

      currentLink.removeAttribute('src');      
      var newLink =  "http://www.youtube.com/embed/"+youtubeID+"?rel=0&autoplay=0";      
      currentLink.setAttribute("src", newLink);
    }
    
  }

var allLinks2 = document.getElementsByTagName('embed');

  for (var i=0;i<allLinks2.length;i++) {
  	
    var currentLink2 = allLinks2[i];
    
    if(currentLink2.src.match("http*://www.youtube.com/v/.*[^#]$")) {
    	
      var orgLink2 = String(currentLink2.src.match("http*://www.youtube.com/v/.*[^#]$"));
      var youtubeID2 = orgLink2.match( /[a-zA-Z0-9\-\_]{11}/ ); 
      //alert("youtubeID="+youtubeID);

      currentLink2.removeAttribute('src');      
      var newLink2 =  "http://www.youtube.com/v/"+youtubeID2+"?rel=0&autoplay=0";      
      currentLink2.setAttribute("src", newLink2);
    }
    
  }
}


NoAutoplayEmbed();