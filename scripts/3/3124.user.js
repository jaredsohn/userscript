// ==UserScript==
// @name           orkutProfileTasks
// @namespace      http://diogo86.no-ip.org/greasemonkey/orkutProfileTasks
// @description    Adds a context menu with useful task links for each Profile link on orkut.com
// @include        http://www.orkut.com*
// ==/UserScript==
//

/*
Version: 1.2
	 
Author:
	Diogo Galvao (diogo86)
	http://www.orkut.com/Profile.aspx?uid=1893561772130915994
	
Changelog:
06-Feb-2006 v1.0:

    * context menu onClick on every Profile.aspx link.
    * absolute positioned div with its elements created on the fly on the first click and getting
      its links changed later on.
    * cancel button to hide it.
    * .top and .left style attributes not well guessed yet.
    * GOLIVE!
    * feature plan:
          o show the original sized profile picture on the context menu. for doing so i think
            the best way is caching its location by uid. at least i see no other way for guessing
            its path. thus it'd be possible only for already seen profiles.
          o report as bogus and add to bookmark links. it's a bit hard to code it because there are
            some hidden atributes that have to be submited.

06-Feb-2006 v1.0.1:

    * i've just realized it's much better on right click (contextmenu).

07-Feb-2006 v1.1:

    * implemented the orginal sized profile picture to the contextMenu which can be disabled setting
      the showPicture variable to false. the way it's done today may be kind of boring as it is shown
      only after the image gets totally loaded making the contextmenu to get resized. by now i got no
      better way for doing it since it's not a fixed size and i can't guess the size it is.
    * look n' feel: onMouseOver effect for the buttons.
    * added Report As Bogus link.
    * removed View Profile link. it was useful when the the menu was activated by single click not by
      right click (contextMenu). now you can just click it for following the link.
    * removed the Cancel button. the context menu now disappears when something else is clicked
    * minor script improvements.
    * future plan:
          o we still need an Add To Bookmarks link.
          o View Communities link not yet implemented 'cos there is no default image for the button.
          o better positioning algorithm.

07-Feb-2006 v1.1.1:

    * View Profile link is back so I can Open Link In a New Tab without moving my arm around to
      press Ctrl :)

11-Feb-2006 v1.1.2:

    * The new variable myLocale makes it easy to change the button's language!

19-Feb-2006 v1.2:

    * Implemented a preloading feature for profile pictures. It's disable by default since I prefer
      bandwidth saving to waiting some pictures to load ;) You can enable it setting preloadPic
      to true.
    * Changed the regExp to also match links on FriendsNet.aspx although I never use it.

*/

(function() {
    
    //### SETTINGS
   
    //buttons language
    var myLocale = "en-US";
    //var myLocale = "pt-BR";
        
    //whether to show profile picture or not
    var showPicture = true;
    var preloadPic = false;
    
    //tasks to do on profile. ?uid=868686 will be append to the url later
    var myTasks = Array(
	Array("profile",
		"http://images3.orkut.com/img/" + myLocale + "/nc_viewprofile.gif",
		"http://www.orkut.com/Profile.aspx"),
	Array("album",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_album.gif",
	      "http://www.orkut.com/AlbumView.aspx"),
	Array("scrapbook",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_viewscrap.gif",
	      "http://www.orkut.com/Scrapbook.aspx"),
	Array("friends",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_viewfriends.gif",
	      "http://www.orkut.com/FriendsList.aspx"),
	Array("message",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_sendmessage.gif",
	      "http://www.orkut.com/Compose.aspx"),
	Array("teaser",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_sendteaser.gif",
	      "http://www.orkut.com/MsgsTeaser.aspx"),
	Array("bogus",
	      "http://images3.orkut.com/img/" + myLocale + "/nc_flaguser.gif",
	      "http://www.orkut.com/FlagProfile.aspx")
	);
    // SETTINGS ###
    
    
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
    }
    addGlobalStyle('div#divProfileTasks { position: absolute; background-color: #BFD0EA; border: 2px solid #A1BBE4; padding: 5px; }');
    //styling function copied from http://diveintogreasemonkey.org/patterns/add-css.html
    
    
    try{
	
	//hide the context menu if something else is clicked
	document.body.addEventListener('click', function(event){
	    var myDiv = document.getElementById('divProfileTasks');
	    if( myDiv )
		myDiv.style.display = "none";
	},true);
	
	//regexp for getting the uid from an url
	var uidRegexp = new RegExp("uid=(\\d+)");
	
	//paths to profile pictures by uid
	var imagens = new Array();
	var preloaderPic = new Array();
	
	//searching through all links
	var anchors = document.getElementsByTagName("a");
	for( i=0; i<anchors.length; i++ ){
	    var href = anchors[i].getAttribute("href");
	    if( href == null )
		continue; //skip not linked anchors
	    
	    if( href.match(/^(Profile)|(FriendsNet)\.aspx/) ){
		//if it is a profile link
		
		//if pictures are used look for it inside of the link
		// and store the path for its medium-sized image
		if( showPicture == true ){
		    var hasImg = anchors[i].getElementsByTagName("img");
		    if( hasImg.length && hasImg[0].getAttribute("src").match("small") ){
			var uid = uidRegexp.exec(anchors[i].getAttribute("href"));
			uid = uid[1];
			imagens[uid] = hasImg[0].getAttribute("src").replace(/small/,"medium");
			//if preloading is enable we create an element for caching the image
			if( preloadPic == true ){
			    preloaderPic[uid] = document.createElement("img");
			    preloaderPic[uid].src = imagens[uid];
			}
		    }
		}
		
		//add the contextMenu function
		anchors[i].addEventListener('contextmenu', function(event) {
		    //get the uid from the url
		    var uid = uidRegexp.exec(this.href)[1];
		    
		    if( document.getElementById("divProfileTasks") ){
			
			//if the div already exists we just change the links
			var myDiv = document.getElementById("divProfileTasks");
			
			for(i=0;i<myTasks.length;i++){
			    var myTask = document.getElementById("myProfileTask"+i);
			    myTask.href = myTasks[i][2] + "?uid=" + uid;
			}
			//also change the profile picture
			if( showPicture == true ){
			    var myProfilePicture = document.getElementById("myProfilePicture");
			    myProfilePicture.style.display = "none";
			    if( imagens[uid] )
				myProfilePicture.src = imagens[uid];
			}
		    }else{
			//if it does not exist yet we create it
			var myDiv = document.createElement("div");
			myDiv.id = "divProfileTasks";
			
			//set the profile picture
			if( showPicture == true ){
			    var myPicDiv = document.createElement("div");
			    myPicDiv.style.textAlign = "center";
			    
			    var myPicture = document.createElement("img");	
			    myPicture.id = "myProfilePicture";
			    myPicture.addEventListener("load",function(event){ this.style.display="block"; }, true);
			    if( imagens[uid] )
				myPicture.src = imagens[uid];
			    myPicture.style.display = "none";
			    myPicture.style.margin = "auto auto";
			    
			    myPicDiv.appendChild(myPicture);
			    myDiv.appendChild(myPicDiv);
			}
			
			//add the task buttons
			for(i=0;i<myTasks.length;i++){
			    var myTask = document.createElement("a");
			    myTask.href = myTasks[i][2] + "?uid=" + uid;
			    myTask.id = "myProfileTask" + i;
			    
			    var myTaskImg = document.createElement("img");
			    myTaskImg.alt = myTasks[i][0];
			    myTaskImg.src = myTasks[i][1];
			    myTaskImg.addEventListener('mouseover',function(event){ this.src = this.src.replace(/nc_/,"oc_"); },true);
			    myTaskImg.addEventListener('mouseout',function(event){ this.src = this.src.replace(/oc_/,"nc_"); },true);
			    myTaskImg.border = 0;
			    myTask.appendChild(myTaskImg);
			    
			    myDiv.appendChild(myTask);
			    myDiv.appendChild(document.createElement("br"));
			}
			
			//append the div to the body but does not show it yet, we gotta position it first!
			myDiv.style.display = "none";
			document.body.appendChild(myDiv);
		    }
		    
		    var divProfileTasks = document.getElementById("divProfileTasks");
		    
		    //this positioning algorithm is weird i know. send me something better please :)
		    var scrollTop = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
		    var scrollLeft = document.body.scrollLeft ? document.body.scrollLeft : document.documentElement.scrollLeft;
		    var divLeft = event.clientX + scrollLeft;
		    if( divLeft + 200 > screen.availWidth ){ divLeft = screen.availWidth - 200; }
		    divProfileTasks.style.left = divLeft ;
		    //var divTop = event.clientY + scrollTop;
		    //if( divTop + 200 > screen.availHeight + scrollTop ){ divTop = screen.availHeight - 200; }
		    //divProfileTasks.style.top = divTop ;
		    divProfileTasks.style.top = event.clientY + scrollTop;
		    
		    //now that the div is more or less positioned lets show it
		    divProfileTasks.style.display = "block";
		    
		    //force the stopping of the contextMenu event
		    event.stopPropagation();
		    event.preventDefault();
		    
		}, true); //end the function and close the addEventListener method
		
	    } //if it is a Profile link
	    
	}// for each anchor
	
    }catch(e){
	//debug any mistake
	alert("orkutProfileTasks error: " + e);
	
    }// try
    
})();
