// Thumbs2Links
// Copyright (c) 2007 TheDarkman
//
// This work is licensed under a Creative Commons License
// See http://creativecommons.org/licenses/by-nc-sa/2.5/
// 
// Update 1.1 (2007/01/28) - Added partial support for www.tubehos.com & tos.mindpoop.com
//
// ==UserScript==
// @name         Thumbs2Links
// @version      1.1
// @namespace    http://thedarkman.altervista.org/
// @description  Collect direct links to vids from the thumbnails page
// @include      http://*dailymotion.*/*
// @include      http://*tinypic.com/*
// @include      http://*youtube.com/*
// @include      http://*tubehos.com/*
// @include      http://*mindpoop.com/*
// ==/UserScript==

var elements, vid ;

document.addEventListener('click', function(event) { // if you click on 'Get direct links' launch the function
    if ((event.target.href.match(/addtype/i)!=null) || (event.target.href.match(/my_videos_upload/i)!=null) || (event.target.href.match(/contacts/i)!=null) || (event.target.href.match(/chatrooms/i)!=null) || (event.target.href.match(/submit.html/i)!=null))
    {	
      if  (window.location.hostname.match(/tinypic/i)!=null) getlinks();
      if  (window.location.hostname.match(/youtube/i)!=null) gettubelinks();
      if  (window.location.href.match(/dailymotion/i)!=null) getdailylinks();
      if  (window.location.href.match(/mindpoop/i)!=null) gettoslinks();
      if  (window.location.href.match(/tubehos/i)!=null) gettubehoslinks();      
      event.stopPropagation();
      event.preventDefault();
    }
}, true);

// tinypic version
if (window.location.href.match(/videos/i)!=null)  // if we are on a thumbnails page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/addtype/i)!=null)  // we found the 'Upload link'
    {	
      elements[i].innerHTML = 'Get direct links!'; // replace the 'Upload your' link with 'Get direct links'
    }
  }
}	

// tubehos version
if (window.location.href.match(/tubehos/i)!=null)  // if we are on a thumbnails page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/submit.html/i)!=null)  // we found the 'Submit' link
    {	
      elements[i].innerHTML = 'Get direct links!'; // replace the 'Chat' link with 'Get direct links'
    }
  }
}	

// mindpoop version
if (window.location.href.match(/mindpoop/i)!=null)  // if we are on a thumbnails page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/chatrooms/i)!=null)  // we found the 'Chat' link
    {	
      elements[i].innerHTML = 'Get direct links!'; // replace the 'Chat' link with 'Get direct links'
    }
  }
}	

// dailymotion version
if (window.location.href.match(/dailymotion/i)!=null)  // if we are on dailymotion
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/contacts/i)!=null)  // we found the 'Contacts'
    {	
      elements[i].innerHTML = 'Get direct links!'; // replace the 'Contacts' link with 'Get direct links'
    }
  }
}

// youtube version
if ((window.location.href.match(/profile_/i)!=null) || (window.location.href.match(/view_play_list/i)!=null)) // if we are on a thumbnails page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/my_videos_upload/i)!=null)  // we found the 'Upload' link
    {	
      elements[i].innerHTML = 'Get direct links!'; // replace the 'Subscriptions' link with 'Get direct links'
    }
  }
}	

// Tinypic function
var getlinks = function() 
 {
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/player.php/i)!=null)  // if it's a link to a movie then download the page and grab the  direct link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[i].href,
        onload:function(result)
          {
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('SWFObject') != -1) {  // This line contains a movie
				var a = document.createElement('a');
				a.href = line.substring(line.indexOf('http://'),line.indexOf('.tinypic.com/')+13)+line.substring(line.indexOf('file=')+5,line.indexOf('file=')+28);
				a.innerHTML = a.href+'<br>';
				document.body.appendChild(a);  // add a link to the video on the bottom of the page
				break;
			}		
	    }     
	  }
      });
     }     
   }      
}	                     

// Youtube function
var gettubelinks = function()  // if we are on a youtube thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if ((elements[i].href.match(/watch/i)!=null) && (elements[i].innerHTML.match(/img/i)==null)) // if it's a link to a movie then download the page and grab the  dirrect link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[i].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('SWFObject') != -1) {  // This line contains a movie
				var a = document.createElement('a');
				a.href = 'http://www.youtube.com/get_video?'+ line.substring(line.indexOf('video_id'),line.indexOf('movie_player')-4);
				a.innerHTML = a.href+'<br>';
				document.body.appendChild(a);  // add a link to the video on the bottom of the page
				break;
			}		
	    }     
	  }
      });
     }     
   }      
//   cleanlinks();
}	                     

// Dailymotion function
var getdailylinks = function()  // if we are on a dailymotion thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if ((elements[t].href.match(/video/i)!=null) && (elements[t].innerHTML.match(/160x120/i)==null)) // if it's a link to a movie then download the page and grab the  dirrect link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('320x240') != -1) {  // This line contains a movie
				var a = document.createElement('a');
				a.href = unescape(line.substring(line.indexOf('http'),line.indexOf(';')-2));
				a.innerHTML = a.href+'<br>';
				document.body.appendChild(a);  // add a link to the video on the bottom of the page
				break;
			}		
	    }     
	  }	
      });  
    }     
  }      
}	

// Mindpoop function
var gettoslinks = function()  // if we are on a mindpoop thumbnails page
 {	
  elements = document.getElementsByTagName('a');	// collect all the links
  for (t = 0; t < elements.length; t++) {
    if (elements[t].href.match(/tos.php/i)!=null) // if it's a link to a movie then download the page and grab the  dirrect link	 	
    {
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:elements[t].href,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('flv_converter') != -1) {  // This line contains a movie
				var a = document.createElement('a');
				a.href = unescape(line.substring(line.indexOf('converter')+12,line.indexOf('target')-2));
				a.innerHTML = a.href+'<br>';
				document.body.appendChild(a);  // add a link to the video on the bottom of the page
				break;
			}		
	    }     
	  }	
      });  
    }     
  }      
}	

// Tubehos function
var gettubehoslinks = function()  // if we are on a mindpoop thumbnails page
 {	
  elements = document.getElementsByTagName('embed');	// collect all the links
  for (t = 0; t < elements.length; t++) {
      vid = 'http://www.youtube.com/watch?v=' + elements[t].src.substring(25,36);
      GM_xmlhttpRequest({  //for each thumbnail we download the video page
        method:"GET",
        url:vid,
        onload:function(result)
          {            	
	    lines = result.responseText.split("\n");  // Make an array out of the HTML
            for (var i = 0; i < lines.length; i++) {  // Loop through lines of the HTML		
			var line = lines[i];  		
			if (line.indexOf('SWFObject') != -1) {  // This line contains a movie
				var a = document.createElement('a');
				a.href = 'http://www.youtube.com/get_video?'+ line.substring(line.indexOf('video_id'),line.indexOf('movie_player')-4);
				a.innerHTML = a.href+'<br>';
				document.body.appendChild(a);  // add a link to the video on the bottom of the page
				break;
			}		
	    }     
	  }	
      });     
  }      
}	

// replaces the links with links to local .flv files,
// this is usefull if you want to build a gallery linked to the downloaded videos.
var cleanlinks = function()
 {
  elements = document.getElementsByTagName('a');	// collect all the links
  for (i = 0; i < elements.length; i++) {
    if ((elements[i].href.match(/watch/i)!=null) && (elements[i].innerHTML.match(/img/i)==null)) // if it's a link to a movie then download the page and grab the  dirrect link	 	
    { 	
    	vid = elements[i].href;
    	elements[i].href = vid.substring(0,vid.indexOf(/http/)+43) + '.flv';
    }		
  }     
}

// replace tinypic upload link with download link
if (window.location.href.match(/player.php/i)!=null) // if we are on a video page
 {
  elements = document.getElementsByTagName('a');	
  for (i = 0; i < elements.length; i++) {
    if (elements[i].href.match(/addtype/i)!=null) // we found the 'Upload your' link
    {
      vid=document.getElementById('mymovie');	// let's calculate the direct link to the source
      elements[i].href=vid.src.substring(0,vid.src.indexOf('.tinypic.com/')+13)+vid.src.substring(vid.src.indexOf('file=')+5)      
      elements[i].innerHTML = 'Download it!';   // then we replace the 'Upload yours' link with the new 'Download it!' 
    }
  }
}	
