// ==UserScript==
// @name                Sweden Rock Message Board Fixes
// @namespace	        http://www.deep-thot.se/
// @description	        Gives the board pages proper titles, and fetches titles of links
// @include		http://*swedenrock.com/index.cfm?pg=15*
// ==/UserScript==
/**
*
*  Javascript trim, ltrim, rtrim
*  http://www.webtoolkit.info/
*
**/


function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}


var element = document.getElementsByClassName('ftn_b');
if(element[0] != null){
  var textArray = element[0].textContent.split(">");
  if (textArray.length > 1){
     textArray.shift();
  }

  document.title=trim(textArray.reverse().toString());
}

var footers = document.getElementsByClassName('f_ps');
var messages = document.getElementsByClassName('ms');
var squares = document.getElementsByClassName('f_m');
var headerLinks = document.getElementsByClassName('forumButton');
var postTable = document.getElementsByClassName('f_tn');
var postTable2 = document.getElementsByClassName('f_i');
setStyle('font-size: 12px', postTable);
setStyle('font-size: 9px', postTable2);
setStyle('padding-top: 10px', footers);
setStyle('color: #d9d9d9', messages);
setStyle('background-color: #101010', squares);
setStyle('text-transform: none', headerLinks);





function setStyle(styleString, elements){
	for(var i = 0; i < elements.length ; i++){
		var currStyle = elements[i].getAttribute('style');
		elements[i].setAttribute('style', currStyle + "; " + styleString);
	}
}

var k = 0;
function convertHtmlChars(string){
     string = string.replace(/&quot;/gi,"\"");
     string = string.replace(/&amp;/gi,"&");
     string = string.replace(/&ldquo;/gi, "“");
     string = string.replace(/&rdquo;/gi, "”");
     string = string.replace("Broadcast Yourself.","Video Removed!");
     string = string.replace(/Youtube\W*-/i,"[Y] ");
     string = string.replace(/&#x202a;/gi, "");
     string = string.replace(/&#x202c;/gi, "");
     string = string.replace(/&lrm;/gi, "");
     if(string.match(/MySpace Music/i)){
       string = string.substring(0,string.indexOf(" på")) + " (MySpace)";
     }
     return string;
}


function setTitle(link,color){
    var spotify = false;
    var playlist = false;
    if(link.href.match(/(open.spotify|spotify:)/)){
      spotify = true;
      if(link.href.match(/playlist/)){
         playlist = true;
      }
    }
    GM_xmlhttpRequest({
     method: "GET",
     url: spotify ? "http://ws.spotify.com/lookup/1/?uri="+link.href : link.href,
     onload: function(response) {

         var data = response.responseText;
         if(spotify && !playlist){
           var parser = new DOMParser();
           var xml = parser.parseFromString(data, "application/xml")
           var artist = xml.getElementsByTagName("artist")[0].getElementsByTagName("name")[0].childNodes[0].nodeValue;
           var album = xml.getElementsByTagName("album")[0];
           var track = xml.getElementsByTagName("track")[0];
           if(album){
             album = album.getElementsByTagName("name")[0].childNodes[0].nodeValue;
             if(!track){
                        var released = xml.getElementsByTagName("released")[0].childNodes[0].nodeValue;
             }
           }

           if(track){
             track = track.getElementsByTagName("name")[0].childNodes[0].nodeValue;
           }


           data = "[S] " + artist;
           if(album){
             data = data + " - ";
             if(track){
                  data = data + track + " (" + album + ")";
             } else {
               data = data + album + " (" + released + ")";
             }
           }
         } else if(playlist){
           string = link.href.replace(/%3A/gi,":");

           var user = string.match(/user[\/:].*[\/:]p/).toString();
           data = "[S] " + user.substring(5,user.length-2) + "'s playlist";

         } else {
           data = data.match(/<title>[\s\S]*<\/title>/i);
           data = data.toString();
           data = data.substring(7,Math.min(data.length-8,300));
         }
         if (data != null){
            data = convertHtmlChars(data);
            var linktext = link.textContent;
            link.textContent = linktext == "Länk" || linktext == "Klicka här" ? data : linktext +  " ( " + data + " )";
            link.style.color = colors[color % colors.length];
         }

     }
   });
}


var ulinks = document.evaluate("//a[@class='msLink']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var colors = new Array("#f7d253", "#ffa070");
for (var i = 0; i < ulinks.snapshotLength; i++){
 ulink = ulinks.snapshotItem(i);
 setTitle(ulink,i);
}



