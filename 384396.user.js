// ==UserScript==
// @name          Piratebay JXS
// @namespace     https://userscripts.org/users/jaxo
// @description   Adds direct .torrent file download option, auto uses https, show images in descriptions
// @version       1.1
// @author        Jaxo
// @include       http://thepiratebay.*/*
// @include       https://thepiratebay.*/*
// ==/UserScript==
   
   
   // Automatically use https
   
   if (/^http\:/i.test(location.href))
      location.href = location.href.replace(/^http/, "https");
   
   // Implement features in torrent pages
   
   if (/^https\:\/\/thepiratebay\.[a-z]{2,4}\/(torrent\/\d+|details\.php\?id\=\d+)/i.test(location.href))
   {
      var downloadDiv  = document.getElementsByClassName("download");
      var downloadLink = '(<a href="https://piratebaytorrents.info/' + location.href.replace(/^\D+/,"").split("/")[0] + '/" title="Torrent File">Get Torrent File</a>)';
   
      if (downloadDiv.length == 2 && downloadDiv[0].children.length < 3){  // check if torrent file download option aleady exists on the page
         downloadDiv[0].innerHTML += downloadLink;
         downloadDiv[1].innerHTML += downloadLink;
      }
	  
	  // Create scaled images from image links in the description
	  
	  for (var i=0; i < document.links.length; i++)
	  {
         if (inDescription(document.links[i]) && /\.(jpg|png|gif|bmp)$/i.test(document.links[i].href))
         {
            var img = document.createElement("img");
            img.style.display = "none";
            img.addEventListener("load", function(){var f=600/this.width*1;this.width*=f;this.height*=f;this.style.display="";}, false);
            img.src = document.links[i].href;
            document.links[i].appendChild(img);
         }
      }
   }
   else
   {
   // Implement features to all types of lists (searches, top lists, etc)
   
      if (document.getElementById("searchResult"))
      {
         var e = document.getElementsByClassName("detName");
      
         for (var i=0; i < e.length; i++)
         {
            if (!/piratebaytorrents\.info/i.test(e[i].parentNode.innerHTML))
	        {
	           var downloadURL = "https://piratebaytorrents.info/" + e[i].children[0].href.split("/")[4] + "/" + e[i].children[0].href.split("/")[5];
		       var downloadLink = document.createElement("a");
		       downloadLink.href = downloadURL;
		       downloadLink.innerHTML = '<img src="/static/img/dl.gif" class="dl">';
	           e[i].parentNode.insertBefore(downloadLink, e[i].parentNode.children[2]);
	        }
         }
      }
   }
   
   // Functions
   
   function inDescription(e)
   {
      while (e){
         if (e.className == "nfo")
            return true;
         e = e.parentNode;
      }
      return false;
   }
   
   