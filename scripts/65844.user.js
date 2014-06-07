// ==UserScript==
// @name           ForumTube
// @description    Converts Youtube, DailyMotion, izlesene, Metacafe and Mynet video URLs to their own video players
// @author         juiev
// @include        *
// @version	   0.1
// ==/UserScript==

var youtubePtr=/http:\/\/www\.youtube\.com\/watch\?v=((\w|\-)+)&?.*/g; // Youtube Pattern
var dailymoPtr=/http:\/\/www\.dailymotion\.com\/video\/(\w+)_?.*/g;    // Daily Motion Pattern
var izlesenPtr=/http:\/\/www\.izlesene\.com\/video\/(\w|\-)+\/(\d+)/g; // izlesene Pattern
var metacafPtr=/http:\/\/www\.metacafe\.com\/watch\/((\w|\-)+\/\w+)\/?/g; // MetaCafe Pattern
var mynetekPtr=/http:\/\/video\.eksenim\.mynet\.com\/(\w+\/\w+\/(\d+))\/?/g; // Mynet Eksenim Pattern


var refs=document.getElementsByTagName('a');

var vidURL,vidID;

for (i=0;i<refs.length;i++){ var h=refs[i].href;
	if (h.match(youtubePtr)||h.match(izlesenPtr)||h.match(dailymoPtr)||h.match(metacafPtr)||h.match(mynetekPtr)){
		var a=refs[i];
		var style=a.style;
		var uri=h;
		style.cursor="default"
		style.display="block";
		style.width="400px";
		style.height="20px";
		style.padding="5px 5px 5px 20px";
		style.border="solid 1px #d7d7f3";
		style.textDecoration="none";
		style.backgroundColor="#e7e7f7";
		a.name=a.href;
		a.removeAttribute('href');
		a.removeAttribute('onclick');
		a.addEventListener('click', function(event) {

			toggleTube(this)

		}, false);
};

}
function toggleTube(o) {
// 	o.style.height = o.style.height>'20px'?'20px':'320px';
var thisHeight=o.style.height;
 	if(thisHeight!='20px'){ // Unset All
	  o.style.height='20px';
	  o.removeChild(o.getElementsByTagName('embed')[0]);
	} else {// Set Movie On
	  o.style.height='320px';
	  var swf=document.createElement('embed');
	  swf.height='300px';
	  swf.width='400px';
	  swf.type='application/x-shockwave-flash';
	  swf.src=watch(o.name);
	  o.appendChild(swf);
//	  o.innerHTML+=o.name;

	}

}
function watch(ss){
	switch(ss.split('.')[1]){
	   case 'youtube' :
		var vID=ss.replace(youtubePtr,"$1");
		vidURL="http://www.youtube.com/v/"+vID;
		return vidURL;
	   break;
	   case 'dailymotion' :
		var vID=ss.replace(dailymoPtr,"$1");
		vidURL="http://www.dailymotion.com/swf/"+vID;
		return vidURL;
	   break;
	   case 'izlesene' :
		var vID=ss.replace(izlesenPtr,"$2");
		vidURL="http://www.izlesene.com/embedplayer.swf?video="+vID;
		return vidURL;
	   break;
	   case 'metacafe' :
		var vID=ss.replace(metacafPtr,"$1");
		vidURL="http://www.metacafe.com/fplayer/"+vID+".swf";
		return vidURL;
	   break;
	   case 'eksenim' :
		var vID=ss.replace(mynetekPtr,"$1");
		vidURL="http://video.eksenim.mynet.com/"+vID+".swf";
		return vidURL;
	   break;
	   default:
	  	return "null"
	   break;
	} 
}



