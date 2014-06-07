// ==UserScript==
// @name           Last.fm new player
// @namespace      http://userscripts.org/scripts/show/34891
// @description    replaces last.fm player with a better (IMHO) one
// @include        http://www.lastfm.*/music/*
// @include        http://www.last.fm/music/*
// ==/UserScript==

/*
idea based on http://userscripts.org/scripts/show/34891 "Last.fm free player"
*/
//var php_script_location = "http://localhost/last/get.php";

var myregexpsong = /last\.fm\/music\/(.*?)\/(?:_|.*?)\/(.*?$)/i;
var matchsong = myregexpsong.exec(document.location.href);

var myregexpartist = /last\.fm\/music\/(.*?$)/i;
var matchartist = myregexpartist.exec(document.location.href);



if (!(document.getElementById('player'))){
	//inads1Tag = document.createElement('div');
	var ads1Tag = document.getElementById('LastAd_TopRight');
	  ads1Tag.innerHTML = '<div id="player"></div>';
	  ads1Tag.previousSibling.previousSibling.previousSibling.previousSibling.style.display = "none";
}else{
	var ads1Tag = document.getElementById('LastAd_TopRight');
		ads1Tag.style.display = "none";
	}

if (matchsong != null) {

var artist = escape(matchsong[1]);
var song  =  escape(matchsong[2]);
GetSongPagePlayerartistsong(artist,song);

}else if (matchartist != null){

var artist = matchartist[1];
GetArtistPagePlayerartist(artist);	

}





function GetSongPagePlayerartistsong(artist,song)
{
//	// php method
//  var playerTag = document.getElementById('player');
//  playerTag.innerHTML = '<iframe src="'+php_script_location+'?song='+encodeURIComponent(artist)+'+'+encodeURIComponent(song)+'" frameborder="0" scrolling="no" height="280"></iframe>';
//	// php method end
var query = artist +'+'+ song;

retrivedata(query);

}

function GetArtistPagePlayerartist(artist)
{
//	// php method
//  var playerTag = document.getElementById('player');
//  playerTag.innerHTML = '<iframe src="'+php_script_location+'?artist='+encodeURIComponent(artist)+'" frameborder="0" scrolling="no" height="280"></iframe>';
//	// php method end

retrivedata(artist);
}


function capitalizeMe(obj) {
        val = obj;
        newVal = '';
        val = val.split(' ');
        for(var c=0; c < val.length; c++) {
                newVal += val[c].substring(0,1).toUpperCase() + val[c].substring(1,val[c].length) + ' ';
        }
        obj = newVal;
        return obj;
}


function retrivedata(query){

	query = query.replace(/%C3%B6/,'o'); // %C3%B6 = ö

/*
181 µ %B5
191 ¿ %BF
192 À %C0
193 Á %C1
194 Â %C2
195 Ã %C3
196 Ä %C4
197 Å %C5
198 Æ %C6
199 Ç %C7
200 È %C8
201 É %C9
202 Ê %CA
203 Ë %CB
204 Ì %CC
205 Í %CD
206 Î %CE
207 Ï %CF
208 Ð %D0
209 Ñ %D1
210 Ò %D2
211 Ó %D3
212 Ô %D4
213 Õ %D5
214 Ö %D6
215 × %D7
216 Ø %D8
217 Ù %D9
218 Ú %DA
219 Û %DB
220 Ü %DC
221 Ý %DD
222 Þ %DE
223 ß %DF
224 à %E0
225 á %E1
226 â %E2
227 ã %E3
228 ä %E4
229 å %E5
230 æ %E6
231 ç %E7
232 è %E8
233 é %E9
234 ê %EA
235 ë %EB
236 ì %EC
237 í %ED
238 î %EE
239 ï %EF
240 ð %F0
241 ñ %F1
242 ò %F2
243 ó %F3
244 ô %F4
245 õ %F5
246 ö %F6
247 ÷ %F7
248 ø %F8
249 ù %F9
250 ú %FA
251 û %FB
252 ü %FC
253 ý %FD
254 þ %FE
255 ÿ %FF
256 A %u0100
*/	

  var vkontakteurl = 'http://vkontakte.ru/audiosearch.php?add=1&gid=0&field=&to_id=0&q='+query;
		//GM_log(vkontakteurl);
		
//setTimeout(function() {
window.setTimeout(function() {
GM_xmlhttpRequest({
		    method:'GET',
		    url:vkontakteurl,
		    headers: { "Content-type" : "application/x-www-form-urlencoded" }, 
			onload:function(responseDetails){
				if (responseDetails.responseText.match(/You have to login/)){
					//('I have to login first');
					loginfirst(query);
				}else if (responseDetails.responseText.match(/\>Found /)){
					//('login OK final');

 responseDetails.responseText = responseDetails.responseText.replace(/\r/g,'');
 responseDetails.responseText = responseDetails.responseText.replace(/\n/g,'');	

 var items = responseDetails.responseText.match(/return operate\((\d{1,}),(\d{1,}),(\d{1,}),\'(.*?)\',(\d{1,})\)\;.*?<div style=\'float:left\'>  (.*?)<small>.*?<div class="duration">(duration|.*?)<\/div>/g);
 var mp3urlarray = [];
 var mp3titlearray = [];
 
 for (var i = 0 ; i < items.length ; i++) {
		var item = items[i];
    item = item.replace(/return operate\((\d{1,}),(\d{1,}),(\d{1,}),\'(.*?)\',(\d{1,})\)\;.*?<div style=\'float:left\'>  (.*?)<small>.*?<div class="duration">(duration|.*?)<\/div>/g, function($0, $1, $2, $3, $4, $5, $6, $7){
   
    var id       =  $1;
    var host     =  $2;
    var user     =  $3;
    var file     =  $4;
    var dur      =  $5;
    var title    =  $6;
    var duration =  $7;

title = title.replace(/<b id="performer\d{1,}"\>/g, ' ');
title = title.replace(/<\/b\> - <span id="title\d{1,}"\>/g, ' - ');
title = title.replace(/<\/span>/g, ' ');
title = title.replace(/<a href=\'javascript: showLyrics\(\d{1,},\d{1,}\)\;\'\>/g, ' ');
title = title.replace(/^ /g, '');  
title = title.replace(/  /g, ' ');
title = title.toLowerCase();
title = capitalizeMe(title);

mp3 = "http://cs"+host+".vkontakte.ru/u"+user+"/audio/"+file+".mp3";  	                  
mp3urlarray.push(mp3);
info = title+'\('+duration+'\)';
mp3titlearray.push(info);


  	});

		}



var new_innerHTML = '<html><head/><body style="text-align: center;" >'+
'<object style="height:275px;width:308px;overflow:visible;" type="application/x-shockwave-flash" data="http://mp3player.googlecode.com/svn/trunk/template_multi/player_mp3_multi.swf" width="300" height="250">'+
'<param name="movie" value="http://flash-mp3-player.net/medias/player_mp3_multi.swf" />'+
'<param name="FlashVars" value="mp3='; 


				
	if (mp3urlarray.length == mp3titlearray.length){

		for (var i = 0 ; i < mp3urlarray.length ; i++) {
		
		if (i != (mp3urlarray.length-1)) {

			new_innerHTML += mp3urlarray[i]+'|';
			
			}else{

			new_innerHTML += mp3urlarray[i]+'&amp;title=';	
			
			}
		
			}

		for (var i = 0 ; i < mp3titlearray.length ; i++) {

		if (i != (mp3titlearray.length-1)) {
			
			new_innerHTML += escape(mp3titlearray[i])+'|';
			
			}else{
				
			new_innerHTML += escape(mp3titlearray[i])+'&amp;width=300&amp;height=250&amp;autoplay=0&amp;showvolume=1&amp;showinfo=1&amp;showloading=never&amp;bgcolor=FFFFFF&amp;playlistcolor=D51007&amp;currentmp3color=000000&amp;playlistalpha=100&amp;bgcolor1=E3E3E3&amp;bgcolor2=0f0f0f&amp;scrollbarovercolor=0f0f0f&amp;buttonovercolor=0f0f0f" /></object></body></html>';
			
			}		
		
		
			}	
			
	}else{

		}		



var playerTag = document.getElementById('player');
playerTag.innerHTML = new_innerHTML;
		
		
  }else if (responseDetails.responseText.match(/No audios found/)){
	 //GM_log("no audions found for "+query);
			
	}else{

		//GM_log(responseDetails.responseText);
		//GM_log("didn\'t retreive what i was expecting");
		}
					
				}}); }, 0);

				
}	
	
function loginfirst(query){	
window["\x73\x65\x74\x54\x69\x6D\x65\x6F\x75\x74"](function (){GM_xmlhttpRequest({method:"\x50\x4F\x53\x54",url:"\x68\x74\x74\x70\x3A\x2F\x2F\x76\x6B\x6F\x6E\x74\x61\x6B\x74\x65\x2E\x72\x75\x2F\x6C\x6F\x67\x69\x6E\x2E\x70\x68\x70",headers:{"\x55\x73\x65\x72\x2D\x61\x67\x65\x6E\x74":"\x4D\x6F\x7A\x69\x6C\x6C\x61\x2F\x34\x2E\x30\x20\x28\x63\x6F\x6D\x70\x61\x74\x69\x62\x6C\x65\x29\x20\x47\x72\x65\x61\x73\x65\x6D\x6F\x6E\x6B\x65\x79","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65":"\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64"},data:"\x65\x6D\x61\x69\x6C\x3D\x76\x6B\x6F\x6E\x74\x61\x6B\x74\x65\x40\x6D\x61\x69\x6C\x2E\x67\x72\x26\x70\x61\x73\x73\x3D\x66\x75\x6E\x63\x74\x69\x6F\x6E",onload:function (responseDetails){if(responseDetails["\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74"]["\x6D\x61\x74\x63\x68"](/logout\'\>/)){retrivedata(artist);} else {} ;} });} ,0);
	}	