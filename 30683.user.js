//Works with new orkut
//Takes care of Universal Search Pages as bug noted by Asad Raza @ http://userscripts.org/forums/2/topics/1335
//Also works with new orkut album. 

// ==UserScript==
// @name           Orkut One-Click Scrap, Album & Add to Friend list Links
// @description    One click to Add someone to Yours Friend-list
// @include        http://*.orkut.*/*
// ==/UserScript==

(function() {
//Gather all anchor tags	
var i=document.getElementsByTagName('a');
var scraplink, albumlink, friendlink; 
var uid, linkdata, linkparts;

for (var j=i.length-1; j>1; j--) {
//check if anchor have "href" attriubute	 
	linkdata =  i[j].getAttribute("href");

//get "uid"	
	//page IS NOT search page
    if (!document.URL.match("UniversalSearch")){	
    	linkparts = linkdata.split("?");
    	uid = linkparts[1];
    }
    //page IS search page
    else{
    	linkparts = linkdata.split("uid%3D");
    	uid = "uid=" + linkparts[1];	
    }
          
    
//Add one-click links to scrapbook, album and friendlist

    if (linkdata.match("Profile.") == "Profile." ) {
//		Scrapbook : Prepare Link  
    	scraplink = document.createElement("a");
        scraplink.href="http://www.orkut.com/Scrapbook.aspx" + "?" + uid;
        scraplink.appendChild(document.createTextNode("[S]"));
        
//      Album : Prepare Link
        albumlink = document.createElement("a");
        albumlink.href="http://www.orkut.com/AlbumList.aspx" + "?" + uid;
        albumlink.appendChild(document.createTextNode("[A]"));
        
//    	FriendList : Prepare Link
        friendlink = document.createElement("a");
        friendlink.href="http://www.orkut.com/FriendAdd.aspx" + "?" + uid;
        friendlink.appendChild(document.createTextNode("[F]"));

//		Add Link to orkuts
//      Following three lines works separetly
//      You can comment out any of them to disable links to that feature
//      EX: Adding // before scrapbook line will disable scrapbook linking        
              
        i[j].parentNode.insertBefore( friendlink ,i[j].nextSibling); //Friend
        i[j].parentNode.insertBefore( albumlink ,i[j].nextSibling); //Album
        i[j].parentNode.insertBefore( scraplink ,i[j].nextSibling); //Scrapbook
        }
    }
})();
