// ==UserScript==
// @name          Orkut  enhancer *Update*
// @Author        Modified by Saady 
// @namespace     http://www.orkut.com/Community.aspx?cmm=4268139
// @description	  Display Links to Albums ,Video and ScrapBook for each profile! =)
// @include       http://www.orkut.com/*
// ==/UserScript==
window.addEventListener("load", function(e) {
var anchorTags = document.getElementsByTagName("a");
for (var i = 0; i < anchorTags.length ; i++)
{
   if(anchorTags[i].href.indexOf("Profile.aspx")>=0&&anchorTags[i].innerHTML.indexOf("<img")==-1)
   {
       var link = anchorTags[i].href;
       var j = link.indexOf("Profile.aspx");
       j=j+12;

       var uid = link.substring(j,link.length);

       var newLink1 = document.createElement("a");
       var text1 = document.createTextNode("[S]");
       newLink1.href="/Scrapbook.aspx"+uid;
       newLink1.appendChild(text1);
       anchorTags[i].parentNode.appendChild(newLink1);

       var newLink2 = document.createElement("a");
       var text2 = document.createTextNode("[A]");
       newLink2.href="/AlbumList.aspx"+uid;
       newLink2.appendChild(text2);
       anchorTags[i].parentNode.appendChild(newLink2);

       var newLink3 = document.createElement("a");
       var text3 = document.createTextNode("[V]");
       newLink3.href="/FavoriteVideos.aspx"+uid;
       newLink3.appendChild(text3);
       anchorTags[i].parentNode.appendChild(newLink3);


    

   }
}
}, false);

