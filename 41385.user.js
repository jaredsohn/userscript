// ==UserScript==
// @name           Vkontakte lyrics
// @namespace      http://userscripts.org/scripts/show/41385
// @description    Music lyrics for vkontakte.ru
// @include        http://vkontakte.ru/audio.php*
// @include        http://vkontakte.ru/gsearch.php?*section=audio*
// @include        http://www.songscroller.com/customize.php*
// ==/UserScript==

(function() {


//You can change the text and background colours

var text_colour =   "4C6A8A";   //"FFFFFF" ;
var background_colour =  "FFFFFF" ;     // "000000";

//Change this to zero not to show the "Text" link
var add_TEXT = 1; //0;


//Seconds. Increase it, if do not see text lyrics on pages 2,3,...
var Delay = 1;  // 3;


if (location.toString().match('songscroller.com/customize')) {  //Opera
	location.replace('http://www.songscroller.com/scroller.swf?song'+location.toString().substring(location.toString().indexOf('='))+'&tcolor='+text_colour+'&bcolor='+background_colour);
} else {


function addLyric(id) {
    var img = document.getElementById("imgbutton"+id);
	  var str = img.getAttribute("onclick");
    var re=/operate\((\d+)[^0-9]+(\d+)[^0-9]+(\d+),[^0-9a-zA-Z]+([0-9a-zA-Z]+)/;
    var arr=re.exec(str);
    var user=arr[3];
    if (user<100000) {
   	user=parseInt(user)+100000;
  	user=(user.toString()).substr(1);
    }
    var span = document.getElementById("title"+id);
    var title=span.innerHTML.replace(/<[^>]+>/g,"");
    var artb=document.getElementById("performer"+id);
    var artist=artb.innerHTML.replace(/<[^>]+>/g,"");    
   
    if ((typeof GM_xmlhttpRequest!="undefined") && (navigator.userAgent.indexOf("Chrome")==-1)){ //FireFox
    
     GM_xmlhttpRequest({
		    method: 'GET',
    url: 'http://www.lyricsplugin.com/ref/?tag='+encodeURIComponent(artist.replace("'","\\'"))+'|'+encodeURIComponent(title.replace("'","\\'")),
    headers: {
        'User-agent': 'Mozilla/5.0',
        'Accept': 'application/atom+xml,application/xml,text/xml',
    },
    onload: function(responseDetails) {
    		
        var rtxt = responseDetails.responseText; 
        if (rtxt) {
    
        img.setAttribute("alt",'http://www.songscroller.com/'+rtxt.substring(rtxt.indexOf("scroller.swf?song="),rtxt.indexOf("scroller_id")-24)+text_colour+'&bcolor='+background_colour ); 
   
       }
       }
		 });
   																																																																						
        img.setAttribute('onClick', "ifr = window.content.document.getElementById('iframelyr'); if(ifr){ ifr.style.display = 'inline'; if (window.content.document.getElementById('lastfmcharts')) {ifr.style.height = '214px'; ifr.style.width = '184px'; ifr.style.padding = '2px'; }  if (this.alt){ ifr.src = this.alt; }else {ifr.style.display = 'none'; }} " +str);
 
   
    } else {  // Opera or Chrome
    	
      	var theURL = 'http://www.lyricsplugin.com/ref/?tag='+encodeURIComponent(artist.replace("'","\\'"))+'|'+encodeURIComponent(title.replace("'","\\'"));
    	  img.setAttribute('alt',theURL);
				img.setAttribute('onClick', "ifr = document.getElementById('iframelyr'); ifr.style.display = 'none';  ifr.src = this.alt; window.setTimeout(function() {ifr.style.display = 'inline'; },3000 ); " +str);
       
    	}
      
    if (add_TEXT){
    	var addon1=document.createElement("a");
			var newdiv=document.createElement("div");
			addon1.setAttribute("href",'http://www.lyricsplugin.com/wmplayer03/plugin/?artist='+encodeURIComponent(artist)+'&title='+encodeURIComponent(title));
  
 	  	addon1.setAttribute("target","_blank");
  	  addon1.innerHTML="\u0442\u0435\u043A\u0441\u0442";      	  
    
    	newdiv.appendChild(addon1);
    
    	newdiv.className="duration";
    	artb.parentNode.parentNode.appendChild(newdiv);
    }
}


function addLyrics() {
	var parent = document.getElementById("audios");   
        if (!parent) {
	 //   parent = document.getElementById("bigResult");
	  parent = document.getElementById("results");
        }
	if(parent){
		var audios = parent.getElementsByTagName("div");
		re=/audio(\d+)/;
		for (var i=0;i<audios.length;i++) {
		var m = audios[i].id.match(re);
			if (m) {
				addLyric(m[1]);
			}
		}
	}
}

function makeLyrics(){
  
  fr = document.getElementById("iframelyr");
  if(!fr){
    fr = document.createElement("iframe");
    fr.setAttribute("height","204px"); 
    fr.setAttribute("scrolling","no");
    fr.setAttribute("id","iframelyr");
    fr.setAttribute("name","lyrics_iframe");
    fr.setAttribute("src","");                    
    fr.setAttribute("style","BORDER: none; width: 175px; TOP: 100px;  display:block; scrolling:no");
 	fr.setAttribute("padding","2px"); 
  }
    
  var ab = document.getElementById('audioBar');

  if (ab){
   	pages = ab.getElementsByTagName("li");
   	 for (var i=0;i<pages.length;i++) {
		  pages[i].childNodes[0].addEventListener('click', makeLyrics1, false);
		}
    ab.appendChild(fr);    
  } else {
  	sb = document.getElementById('filters'); 
	fr.style.width = "164px";
	fr.style.height = "191px";
	fr.style.float = "left"	;
	fr.style.padding = "10px 0px 0px 0px";
  //  fr.style.margin = "0px 0px 10px 0px"; 
  	pages = document.getElementById('content').getElementsByTagName("li");
  	    for (var i=0;i<pages.length;i++) {
		  pages[i].childNodes[0].addEventListener('click', makeLyrics1, false);
		}
  	sb.appendChild(fr);  
  }
  

  addLyrics();
}

function makeLyrics1() {
  document.getElementById("iframelyr").style.display = 'none';
	window.setTimeout(function() { makeLyrics() }, Delay*1000);	
}

makeLyrics();

}

})();