// ==UserScript==
// @name           images.google.com imageloader
// @namespace      http://images.google.com*
// @include        http://images.google.com/images*
// ==/UserScript==

var items = document.getElementsByTagName("img");

var doc = document.createElement('div');
   doc.setAttribute("id","video-page");

content = document.getElementById("navbar").parentNode;
for (var i = 0 ; i < items.length ; i++) {
	
          var item = items[i];
          
          GM_log(i + item.parentNode.baseURI);
          
          item2 = item.src.replace(/http:\/\/.*?:.*?:/,'');
        
          GM_log(i + item2);

          doc.innerHTML += "<a href="+item2+">"+item2+"</a>";	
	        
          content.appendChild(doc);          
          

      }

GM_addStyle("div#video-page {overflow:visible;}"); 