// ==UserScript==
// @name           What Are Your Last.FM Friends Listening To?
// @namespace      http://userscripts.org/users/116116
// @description    Replaces the "Listening Now" status of your (or whoever) friends with the name of the artist and the song they are listening to
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.de/user/*
// @include        http://www.lastfm.es/user/*
// @include        http://www.lastfm.fr/user/*
// @include        http://www.lastfm.it/user/*
// @include        http://www.lastfm.pl/user/*
// @include        http://www.lastfm.com.br/user/*
// @include        http://www.lastfm.ru/user/*
// @include        http://www.lastfm.se/user/*
// @include        http://cn.last.fm/user/*
// @include        http://www.lastfm.com.tr/user/*
// @include        http://www.lastfm.jp/user/*
// @version        1.00 - 3rd Sep 2011
// ==/UserScript==

// v0.91 - 27th Jan 2010
// *initial release
//
// v0.92 - 11th Feb 2010
// *little optimization
//
// v1.00 - 3rd Seb 2011
// *click on the name of song will embed the YouTube video with the song to the page
// *script works on all last.fm domains

var friends=document.getElementsByClassName("vcard");   
var NumOfFriends=friends.length; //number of friends in the "Friends" section of user´s page

friends_list_wrapper = friends[1].parentNode.parentNode.parentNode;

function yt_fire(song){

  api_url = "http://gdata.youtube.com/feeds/api/videos?orderby=relevance&max-results=1&vq=" + song;
  
  GM_xmlhttpRequest({
  
        method: "GET",
        url: api_url,
        onload: function(response) {
      
                  xml = response.responseText;
                  video_element = document.getElementById('video116116');
                  
                  if(video_element){//remove previous embedded video
                  
                    friends_list_wrapper.removeChild(video_element);
                  
                  }
              
                  beg_string = "http://www.youtube.com/watch?v="; //video id begins after that
                  beg_num = xml.indexOf(beg_string) + 31; //beginning of, index of, video id from url
              
                  /*
                   if string not found, its indexOf is -1
                   ==> -1+31 = 30
                   ==> if beg_num == 30 then video not found
                   ==> else video found
                  */
              
                  if (beg_num != 30){ 
              
                    foo = xml.slice(beg_num);
                    end_num = foo.indexOf("&");
                    yt_video_id = foo.slice(0, end_num);
                    src_url = "http://www.youtube.com/embed/" + yt_video_id +"?rel=0&amp;autoplay=1";
                    
                    video = document.createElement('iframe');
                    video.setAttribute('id', 'video116116');
                    video.setAttribute('width', 300);
                    video.setAttribute('height', 198);
                    video.setAttribute('src', src_url);
                    friends_list_wrapper.appendChild(video);
                              
                  }
                  else{ //if now video found, write "no video found" message
                    
                    no_video_wrapper = document.createElement('p');
                    no_video_wrapper.setAttribute('id', 'video116116');
                    no_video_message = document.createTextNode('No video found :(');
                    no_video_wrapper.appendChild(no_video_message);
                    friends_list_wrapper.appendChild(no_video_wrapper);
                    
                  }
              		
                } 
  });

}

function find_country(site){
    
    switch(site){
    
      case "www.last.fm":
        return 12;
      case "www.lastfm.de": 
        return 11;
      case "www.lastfm.es": 
        return 12;
      case "www.lastfm.fr": 
        return 6;
      case "www.lastfm.it": 
        return 13;
      case "www.lastfm.pl": 
        return 12;
      case "www.lastfm.com.br": 
        return 7;
      case "www.lastfm.ru": 
        return 7;
      case "www.lastfm.se": 
        return 10;
      case "cn.last.fm": 
        return 4;
      default:
        return 0;                           
    
    }

}

site = location.hostname;
beg_remove = find_country(site);

for (i=1; i<NumOfFriends; i++){ //do not need the first element with the "vcard" class name
	
		mainNode=friends[i].getElementsByTagName("p")[0];
		
		if(mainNode){
			
			song=mainNode.getAttribute('title');
			
			song=song.slice(beg_remove);//removes unnecessary "Listening to" string
			mainNode.getElementsByTagName("span")[0].childNodes[0].nodeValue=song;
		  mainNode.style.cursor = "pointer";
		  
      mainNode.addEventListener('click', function(event) {
		   
		    yt_fire(this.getElementsByTagName("span")[0].childNodes[0].nodeValue);
		   
		  }, 'false');
   	
		}
}