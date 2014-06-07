// ==UserScript==
// @name		One Click Profile Optimizer
// @author		Dhruva Sagar
// @version	2.1
// @namespace	http://www.dhruvasagar.com/blog/
// @description	Adds a context menu with useful task links for each Profile link on orkut.com
// @include http://www.orkut.com*
// ==/UserScript==
//

/*
Version: 2.1
	 
Original Author:
	Diogo Galvao (diogo86)
	http://www.orkut.com/Profile.aspx?uid=1893561772130915994
Author:
	Dhruva Sagar (dhruva)
	http://www.orkut.com/Profile.aspx?uid=4666573004888097606
	
Changelog:

30-Nov-2007 v2.0:
    * Made corrections to get this working with new orkut.
    * Added new links for latest features in orkut like videos.
*/

(function() {
    
    //### SETTINGS
   
    //whether to show profile picture or not
    var showPicture = true;
    var preloadPic = true;
    
    //tasks to do on profile. ?uid=868686 will be append to the url later
    var myTasks = Array(
	Array("add friend",
		  "http://img1.orkut.com/img/castro/i_friend.gif",
		  "http://www.orkut.com/FriendAdd.aspx?"),
	Array("profile",
		  "http://img4.orkut.com/img/castro/p_profile.gif",
		  "http://www.orkut.com/Profile.aspx?"),
	Array("scrapbook",
	      "http://img1.orkut.com/img/castro/p_scrap.gif",
	      "http://www.orkut.com/Scrapbook.aspx?"),
	Array("album",
	      "http://img4.orkut.com/img/castro/p_camera.gif",
	      "http://www.orkut.com/AlbumList.aspx?"),
	Array("videos",
		  "http://img3.orkut.com/img/castro/p_video.gif",
		  "http://www.orkut.com/FavoriteVideos.aspx?"),
	Array("view friends",
	      "http://img2.orkut.com/img/castro/p_viewfriends.gif",
	      "http://www.orkut.com/FriendsList.aspx?"),
	Array("ask friends",
		  "http://img3.orkut.com/img/mobius/i_icon_small_ask.gif",
		  "http://www.orkut.com/Agent.aspx?application=mobius&"),
	Array("send message",
	      "http://img2.orkut.com/img/castro/p_letter.gif",
	      "http://www.orkut.com/Compose.aspx?"),
	Array("send teaser",
	      "http://img1.orkut.com/img/castro/p_teaser.gif",
	      "http://www.orkut.com/MsgsTeaser.aspx?"),
	Array("report bogus",
	      "http://img2.orkut.com/img/castro/p_flagprofile.gif",
	      "http://www.orkut.com/FlagProfile.aspx?")
	);
    // SETTINGS ###
    
    
    function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.setAttribute("type","text/css");
	style.innerHTML = css;
	head.appendChild(style);
    }
    addGlobalStyle('div#divProfileTasks { position: absolute; background-color: #FFFFFF; border: 2px solid #A1BBE4; padding: 5px; }');
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
	    if( href == null || uidRegexp.exec(anchors[i].getAttribute("href")) == null )
		continue; //skip not linked anchors
	    
	    //if( href.match(/^(Profile)|(FriendsNet)\.aspx/) ){
		if(href.match(/Profile\.aspx/) && !href.match(/FlagProfile\.aspx/)) {
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
				    myTask.href = myTasks[i][2] + "uid=" + uid;
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
			myDiv.setAttribute("id", "divProfileTasks");
			myDiv.setAttribute("class", "module");
			
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
			    myTask.setAttribute("id", "myProfileTask" + i);
				myTask.setAttribute("href", myTasks[i][2] + "uid=" + uid);
				myTask.setAttribute("class", "userbutton");
				myTask.setAttribute("style", "text-align: left;");
				
			    var myTaskImg = document.createElement("img");
			    myTaskImg.alt = myTasks[i][0];
			    myTaskImg.src = myTasks[i][1];
			    //myTaskImg.addEventListener('mouseover',function(event){ this.src = this.src.replace(/nc_/,"oc_"); },true);
			    //myTaskImg.addEventListener('mouseout',function(event){ this.src = this.src.replace(/oc_/,"nc_"); },true);
			    myTaskImg.border = 0;
			    myTask.appendChild(myTaskImg);
				myTask.appendChild(document.createTextNode(myTasks[i][0]));
			    myDiv.appendChild(myTask);
			    //myDiv.appendChild(document.createElement("br"));
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