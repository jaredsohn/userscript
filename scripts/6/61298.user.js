// ==UserScript==
// @name           Flickr Soundtrack
// @namespace      flickr.soundtrack
// @description    Add Soundtrack to flickr photos.
// @include        http://www.flickr.com/photos/*
// @exclude        http://www.flickr.com/photos/*/sizes
// @version        0.2 - Change to machine tag format
// ==/UserScript==

// To use this, you need to add a tag to the picture on flickr in the format "soundtrack:xxxxxx=yyyyyy" 

//xxxxxx specifies the type of soundtrack you are embedding, yyyyyy specifies a parameter to identify it. For example, to add (the sound from) a YouTube video with video id of w1ydsxhsc9y on YouTube, you would add a tag of "soundtrack=youtube:w1ydsxhsc9y" 

//Please note that as of this initial release, YouTube is the only supported type of soundtrack! More to follow in future releases!

var debug=false;

if(unsafeWindow.console){
   var GM_log = unsafeWindow.console.log;
} else {
  debug = false;
}

function log(text) { 
  if (debug) {
    GM_log(text);
  }
}

log("Flickr Soundtrack Executing");

String.prototype.startsWith = function(str)
{return (this.match("^"+str)==str)}

function parseTags() {
   var XPATH_TAGS = "//div[@id='themachinetags']/div/a[@class='Plain']";

   var listTags = document.evaluate(
                  XPATH_TAGS,
                  document,
                  null,
                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                  null);  

   log("Found " + listTags.snapshotLength + " tags");

   for (var i=0; i<listTags.snapshotLength; i++) {    
      var tagNode = listTags.snapshotItem(i);
      var tag = tagNode.innerHTML;    
      log(i + " " + tag);
      if (tag.startsWith('soundtrack:')) {
         parseSoundtrack(tag);
         
      }
   }
}

function parseSoundtrack(tag){
   log("Parsing soundtrack tag " + tag);  
   var typeStart = tag.indexOf(":") + 1;
   var typeEnd = tag.indexOf("=", typeStart);
   log("Soundtrack type in positions " + typeStart + "-" + typeEnd);
   var type = tag.substring(typeStart, typeEnd);
   var param = tag.substring(typeEnd + 1);
   addSoundtrack(type, param);
}

function addSoundtrack(type,param) {
   log("Adding " + type + " soundtrack - " + param);
   var photoDiv = document.getElementById("photo-drag-proxy").parentNode;

   if (type=="youtube") {
     var soundDiv = document.createElement("div");
     soundDiv.setAttribute("style", "height:25px");
     
     var width=document.getElementById("photo-drag-proxy").clientWidth;

     var object = document.createElement("object");
     var param1 = document.createElement("param");
     var param2 = document.createElement("param");
     var param3 = document.createElement("param");      
     var embed = document.createElement("embed");
    
     param1.setAttribute("name", "movie");
     param1.setAttribute("value", "http://www.youtube.com/v/" + param + "&autoplay=1");     
     param2.setAttribute("name", "allowFullScreen");
     param2.setAttribute("value", "true");     
     param3.setAttribute("name", "allowscriptaccess");
     param3.setAttribute("value", "always");     

     embed.setAttribute("src", "http://www.youtube.com/v/" + param + "&autoplay=1");
     embed.setAttribute("type", "application/x-shockwave-flash");
     embed.setAttribute("allowscriptaccess", "always");
     embed.setAttribute("allowfullscreen", "true");
     embed.setAttribute("width", width);
     embed.setAttribute("height", "25px");    
     embed.setAttribute("style", "height: 25px");

     object.setAttribute("width", width);
     object.appendChild(param1);
     object.appendChild(param2);
     object.appendChild(param3);
     object.appendChild(embed);
     soundDiv.appendChild(object);          

     log("Adding HTML to photo");
     photoDiv.appendChild(soundDiv);
   }
}

parseTags();