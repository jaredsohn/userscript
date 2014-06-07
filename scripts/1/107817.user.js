// ==UserScript==
// @name           4chan Backtrace Tools
// @namespace      3
// @description    Tineye reverse image search, EXIF data viewer, and automatic detection of Facebook format picture file names and profile URL extraction.  I am not responsible for what you do with this.
// @include        http://boards.4chan.org/*
// @exclude        http://maps.google.com/*
// ==/UserScript==

function update() {
	var spans=document.getElementsByTagName("span");
	for (i=0; i<spans.length; i++) {
		if(spans[i].className == "fileText") {
			var check = spans[i].getElementsByClassName("tineye");
			if(check.length == 0) {
				var links = spans[i].getElementsByTagName("a");
				var tineye = "http://www.tineye.com/search?url="+escape(links[0].href);
				var exif = "http://regex.info/exif.cgi?url="+escape(links[0].href);
				var facebook = "http://www.facebook.com/profile.php?id=";
				spans[i].innerHTML += " <a class= \"tineye\" href=\""+tineye+"\" target=\"_blank\">Tineye</a>";
				spans[i].innerHTML += " <a class= \"tineye\" href=\""+exif+"\" target=\"_blank\">EXIF</a>";
				
				var filename = spans[i].getElementsByTagName("span");
				//alert(filename[0].title);
				var arr = filename[0].title.match(/\d*_\d*_\d*_\d*_\d*_[a-z].*/);
				var arr1 = filename[0].title.match(/\d*_\d*_\d*_[a-z].*/);
				//spans[i].innerHTML += " <a class= \"tineye\" href=\""+exif+"\" target=\"_blank\">" + arr[0] + "</a>";
				//alert(arr[0]);
				
				if (filename[0].title==arr[0]){
				    //alert(arr[0]);
      
					//console.log(text.match(/\d{6}_\d*_\d*_\d*_\d*_[a-z]/gi));
					//for (var i = 0; i < arr.length; i++) {
					//console.log(arr[i]);
					//var picfromfriend = arr[i];
					var picfromfriend = arr[0];
					var picfriendsplit = picfromfriend.split("_").reverse();
					var profileid = picfriendsplit[3];
					spans[i].innerHTML += " <a class= \"tineye\" href=\""+facebook+profileid+"\" target=\"_blank\">Facebook</a>";
					
			
					//console.log(profileid);
					//text.replace(profileid, "http://www.facebook.com/profile.php?id=" + profileid);
					//text += "\r\n" + "http://www.facebook.com/profile.php?id=" + profileid;
					//Do something
					//};	
				}  
				if (filename[0].title==arr1[0]){
				    //alert(arr[0]);
      
					//console.log(text.match(/\d{6}_\d*_\d*_\d*_\d*_[a-z]/gi));
					//for (var i = 0; i < arr.length; i++) {
					//console.log(arr[i]);
					//var picfromfriend = arr[i];
					var picfromfriend = arr[0];
					var picfriendsplit = picfromfriend.split("_").reverse();
					var profileid = picfriendsplit[2];
					spans[i].innerHTML += " <a class= \"tineye\" href=\""+facebook+profileid+"\" target=\"_blank\">Facebook</a>";
					
			
					//console.log(profileid);
					//text.replace(profileid, "http://www.facebook.com/profile.php?id=" + profileid);
					//text += "\r\n" + "http://www.facebook.com/profile.php?id=" + profileid;
					//Do something
					//};	
				}
			}
		}
	}
}

setInterval(update,500);
//document.addEventListener('DOMContentLoaded', update, false); //sadly this doesn't work with updaters.