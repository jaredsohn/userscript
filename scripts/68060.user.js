// ==UserScript==
// @name           avaxhome.ws with more info from amazon
// @version        20100204
// @namespace      http://files-search.com/userscripts/fdownloader/
// @description    retrieving mp3 samples from amazon.com (about 50% correct) and it's adding some links with relevand pages
// @include        http://avaxhome.ws/music/*
// @include        http://avaxhome.ws/ebooks/*
// @include        http://avaxhome.ws/software/*
// @include        http://avaxhome.ws/video/*
// @include        http://avaxhome.ws/magazines/*
// @include        http://avaxhome.ws/games/*
// @include        http://avaxhome.ws/graphics/*
// @include        http://avaxhome.ws/misc/*
// @exclude        http://avaxhome.ws/*pages*
// ==/UserScript==

function getElementsByClassName(className, tag, elm){
	var testClass = new RegExp("(^|\\s)" + className + "(\\s|$)");
	var tag = tag || "*";
	var elm = elm || document;
	var elements = (tag == "*" && elm.all)? elm.all : elm.getElementsByTagName(tag);
	var returnElements = [];
	var current;
	var length = elements.length;
	for(var i=0; i<length; i++){
		current = elements[i];
		if(testClass.test(current.className)){
			returnElements.push(current);
		}
	}
	return returnElements;
}

function addeventlistener(titleid){
	
	if (document.getElementById(titleid)){
		var addingeventtotitle=document.getElementById(titleid);
		addingeventtotitle.addEventListener("click", findTheSong, false);
	}else{
		addeventlistener(titleid);
		}
	}
	
function findTheSong(env){
	console.log(env.currentTarget);
	titletosearch = env.currentTarget.id.replace(/^title/,'').replace(/%20$/,'').replace(/_/,'%20');
	console.log(titletosearch);
	vkurl = "http://vk.com/gsearch.php?section=audio&q="+titletosearch;
	//http://vk.com/gsearch.php?section=audio&q=Anthony%20Wrong%20side%20of%20the%20street
	//                                          Anthony%20Wrong%20side%20of%20the%20street
	
						GM_xmlhttpRequest({
							method: "get",
							url: vkurl,
							headers: {
								'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
								'Content-type': 'text/html'
							},
							onload: function(responseDetails) {
								res = responseDetails.responseText;
								console.log(res);
								GM_log(res);
								//http://cs1589.vkontakte.ru/u2136663/audio/65fa6188ecbb.mp3 performer42375292

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
console.log(mp3);
mp3titlearray.push(info);


  	});

		}
								
								}});
	
	}

function tryToFindTheTracks(nameofthegroupartist){
	atextContent = document.body.textContent;
	regexatextContent= "\\d{1,2}(?:|\\.| -) (\\w(?:[\\w| |-|,|']{5,35}))(?:\\r|\\n|\\d|\\()";
	myregexpregexatextContent = new RegExp(regexatextContent,"g");
	var tracksinraw = atextContent.match(myregexpregexatextContent);
	//console.log(tracksinraw);
	for (i in tracksinraw){
		var wanabeatrack = tracksinraw[i].match(/\d{1,2}(?:|\.| -) (\w(?:[\w| |-|,|']{5,35}))(?:\r|\n|\d|\()/);
		var wanabeatrack = wanabeatrack[1];
		//console.log(nameofthegroupartist +' ' +wanabeatrack);
		avaxinnerHTML = document.body.innerHTML;
		//avaxbody = document.body;
		//console.log(avaxbody);
		
		if (avaxinnerHTML.match(wanabeatrack)){
			myregexprewanabeatrack = new RegExp(wanabeatrack,"g");
			var titleid = escape(nameofthegroupartist +'_' +wanabeatrack)
			document.body.innerHTML = document.body.innerHTML.replace(myregexprewanabeatrack ,'<span style="background-color:paleGoldenRod;" id=title'+titleid+'>'+wanabeatrack+'</span>');
			//window.setTimeout({ 
				//addeventlistener(titleid);
	
	//},500);		
			}
		spans = document.getElementsByTagName('span');
		for (all in spans){
			thisspan = spans[all];
			if (thisspan.id.match(/title/)){
				addeventlistener(thisspan.id);
				}
			}	
			
		}
	}

if (document.location.href.match(/music/)){	
	console.log(document.title);// AvaxHome -> Electric Light Orchestra - The Harvest Years 1970-1973 (2006)
	nameofthegroupartist = document.title.match(/AvaxHome -> (.*?) -/);
	if(nameofthegroupartist[1]){
	nameofthegroupartist = nameofthegroupartist[1];
	//tryToFindTheTracks(nameofthegroupartist);
    }
}

/*
1.01 Funkadelic - Wars Of Armaggedon 2:37
1.02 Laibach - Decree (Beat) 0:36
1.03 John Carpenter - The End (Disco Version: Part 1) 1:37
1.04 Hiltmeyer Inc. - Narkotik! 1:18
1.05 Hashim - Rocking The Planet (Beat) 0:53
1.06 Miroslav Vitous - New York City 0:30
1.07 Soft Cell - Sex Dwarf 2:00
1.08 Tres Demented - Demented Drums 1:00
1.09 Luciano And Quenum - Orange Mistake 2:07 


01. Atrocity Exhibition
02. Isolation
03. Passover
04. Colony
05. A Means to an End
06. Heart and Soul
07. Twenty Four Hours
08. The Eternal
09. Decades

*/


function get(url, cb , ff) {
  GM_xmlhttpRequest({
    method: "GET",
     url: url,
     onload: function(xhr) { cb(xhr.responseText,ff); }
  });
}

function get_the_mp3_from_m3u(url, cb) {
GM_xmlhttpRequest({
    method: "GET",
     url: url,
	 overrideMimeType: 'text/plain; charset=x-user-defined',
     onload: function(xhr) { cb(xhr.responseText); }
  });
}

function URLEncode (clearString) {
	clearString = escape(clearString);
	clearString = clearString.replace(/\%u04.{2}/gi,'');
	return clearString;
}

var item = document.title;
item = item.replace(/^.*\-\> /,'');
item = item.replace(/\’/,"'");
item = item.replace(/\:/,'');
item = item.replace(/ - /,' ');
item = item.replace(/Lossless/,'');
item = item.replace(/\.\.\./,'');
item = item.replace(/\(\d{4}\)/,'');
item = item.replace(/\//g,' ');
item = item.replace(/\,/g,' ');
item = item.replace(/\(/g,'');
item = item.replace(/\)/g,'');
item = item.replace(/\d{4}/g,'');
item = item.replace(/–/g,''); 
item = item.replace(/\[.*?\]/,'');
item = item.replace(/ EP /,' ');
item = item.replace(/( |\')Single /,' ');
item = URLEncode(item);
xrandom=Math.floor(Math.random()*11);
yrandom=Math.floor(Math.random()*11);

amazonquery0 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Daps&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;  // <-- all departments
amazonquery0title = 'All Departments search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery0,'amazonquery0',amazonquery0title);
//get(amazonquery0, resultsFromAmazon);

if (window.location.href.match(/music/)){
amazonquery1 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Ddigital-music-album&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery1title = 'MP3 Albums search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery1,'amazonquery1',amazonquery1title);
amazonquery2 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Ddigital-music&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery2title = 'MP3 Songs search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery2,'amazonquery2',amazonquery2title);	
get(amazonquery1, resultsFromAmazon);
get(amazonquery2, resultsFromAmazon);
	}

if (window.location.href.match(/magazines/)){
amazonquery1 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Dmagazines&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery1title = 'Magazines search  [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery1,'amazonquery1',amazonquery1title);
get(amazonquery1, resultsFromAmazon);
	}
	
if (window.location.href.match(/video/)){
amazonquery1 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Ddvd&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery1title = 'Video search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery1,'amazonquery1',amazonquery1title);
get(amazonquery1, resultsFromAmazon);
	}	


if (window.location.href.match(/software/)){
amazonquery1 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Dsoftware&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery1title = 'Software search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery1,'amazonquery1',amazonquery1title);
get(amazonquery1, resultsFromAmazon);
	}

if (window.location.href.match(/ebooks/)){
amazonquery1 = 'http://www.amazon.com/s/ref=nb_ss?url=search-alias%3Dstripbooks&field-keywords='+item+'&x='+xrandom+'&y='+yrandom;
amazonquery1title = 'Books search [From Amazon] for: ' +unescape(item);
createalinkwith(amazonquery1,'amazonquery1',amazonquery1title);
get(amazonquery1, resultsFromAmazon);
	}	
	
function resultsFromAmazon(text) {
	
	var amazondiv = document.createElement('div');
		amazondiv.innerHTML = text;
		
	if (getElementsByClassName('srTitle', 'span', amazondiv)){
		var link1 = getElementsByClassName('srTitle', 'span', amazondiv);
		
		if(link1[0]){
			var finalUrl = link1[0].parentNode.href;
			if (finalUrl!=undefined){
				artist = link1[0].parentNode.parentNode.lastElementChild.firstChild.textContent
				createalinkwith(finalUrl,'finalUrl',artist +' - '+link1[0].textContent+' [From Amazon]');
			    }
				trying_to_retrieve_more_data(finalUrl);
			}
		}  
		
	if (getElementsByClassName('productTitle', 'div', amazondiv)){
		var link2 = getElementsByClassName('productTitle', 'div', amazondiv);
		
		if(link2[0] && link2[0].childNodes[1].href){			
			var finalUrl = link2[0].childNodes[1].href;
			createalinkwith(finalUrl,'finalUrl',link2[0].textContent+' [From Amazon] 1');	
			}

		if(link2[0] && link2[0].childNodes[0].href){			
			var finalUrl = link2[0].childNodes[0].href;
			createalinkwith(finalUrl,'finalUrl',link2[0].textContent+' [From Amazon] 2');	
			}			
	   }
}

function trying_to_retrieve_more_data(url){
	 get(url, add_more_data);
}

function add_more_data(text){
	var amazondiv_more_data = document.createElement('div');
		amazondiv_more_data.innerHTML = text;	
		
		if (getElementsByClassName('trackList', 'div', amazondiv_more_data)){
			albumTrackList = getElementsByClassName('trackList', 'div', amazondiv_more_data);
		    }
			
		if (getElementsByClassName('playCol','td', amazondiv_more_data)){
			playCol = getElementsByClassName('playCol', 'td', amazondiv_more_data);
			titleCol = getElementsByClassName('titleCol', 'td', amazondiv_more_data);			

		if (playCol.length>0)
			makePlaceToHostTheTracks();	   
		   		
			for(i in playCol){
				mp3url = playCol[i].childNodes[0].href;
				mp3url = mp3url.replace(/http\:\/\/avaxhome\.ws\//,'http://amazon.com/');
				mp3title = titleCol[i].textContent;				

				  if (mp3url.match(/m3u/)){
					m3u = mp3url;
					get(m3u, addTheMp3InThePage , mp3title);
					}else{
					addTheMp3InThePage(mp3url,mp3title)	
					}					
			}
	  }
}

function makePlaceToHostTheTracks(){
 var avaxamazonTracksSpace = document.createElement("div");	
 	 avaxamazonTracksSpace.setAttribute('id', 'avaxamazonTracksSpace');
     avaxamazonTracksSpace.setAttribute('class', 'container');
     avaxamazonTracksSpace.setAttribute('style', 'font-weight:bold;');		
 	 avaxamazonTracksSpace.innerHTML = 'Sample Tracks';	  
	   if (getElementsByClassName('panel-wrap', 'div', document.body)){
		   var panel_wrap = getElementsByClassName('panel-wrap', 'div', document.body)[1];
		       panel_wrap.appendChild(avaxamazonTracksSpace);
		   }	
}	

function addTheMp3InThePage(txt,mp3title){
		
	var playerdiv = document.createElement("div");
		playerdiv.id = 'flash-mp3-player.net_rules';
		playerdiv.innerHTML = "<div>"+mp3title+"</div>";
	var audioElement = document.createElement("object");
	    audioElement.setAttribute('width', '200');
		audioElement.setAttribute('height', '20');
		audioElement.setAttribute('type', 'application/x-shockwave-flash');
		audioElement.setAttribute('data', 'http://flash-mp3-player.net/medias/player_mp3_maxi.swf');
	
	var audioparam1 = document.createElement("param");	
		audioparam1.setAttribute('name', 'movie');
		audioparam1.setAttribute('value', 'http://flash-mp3-player.net/medias/player_mp3_maxi.swf');
		
	var audioparam2 = document.createElement("param");		
		audioparam2.setAttribute('value', 'mp3='+escape(txt)+'&showstop=1showvolume=1&'+
'loadingcolor=a52a2a&'+
//'bgcolor1=ffa50b&'+
//'bgcolor2=000000&'+
'buttoncolor=ffa50b&'+
'buttonovercolor=fffffb&'+
'buttoncolor=a52a2a&'+
'buttonovercolor=a52a2a'+
'slidercolor1=a52a2a&'+
'slidercolor2=00000b&'+
'sliderovercolor=a52a2a'
);
		
		//brown = a52a2a 
		//orange = ffa50b
		//orangedark d07600
/*
loadingcolor  	The color of loading bar
bgcolor1 	The first color of the background gradient
bgcolor2 	The second color of the background gradient
buttoncolor 	The color of the buttons
buttonovercolor 	Hover color of buttons
slidercolor1 	The first color of the bar gradient
slidercolor2 	The second color of the bar gradient
sliderovercolor 	Hover color of the bar
textcolor 	The text color.
bgcolor 	The background color
	*/
audioparam2.setAttribute('name', 'FlashVars');	
audioElement.appendChild(audioparam1);
audioElement.appendChild(audioparam2);
playerdiv.appendChild(audioElement);

avaxamazonTracksSpace = document.getElementById('avaxamazonTracksSpace');
		       avaxamazonTracksSpace.appendChild(playerdiv);

	}		

function createalinkwith(url,id,title){
		 var avaxamazonAlink = document.createElement("div");	
		 avaxamazonAlink.setAttribute('id', 'main-info-container');
		 avaxamazonAlink.setAttribute('class', 'container');
		 avaxamazonAlink.setAttribute('style', 'cursor:pointer;font-weight:bold;');
		 avaxamazonAlink.innerHTML = title;
		 avaxamazonAlink.addEventListener("click", function(){
			 createaniframewith(url,id);
			 }, false);
 
 	   if (getElementsByClassName('panel-wrap', 'div', document.body)){
		   var panel_wrap = getElementsByClassName('panel-wrap', 'div', document.body)[1];
		       panel_wrap.appendChild(avaxamazonAlink);
		   }
 
} 

function createaniframewith(url,id){
	var iframeamazon = document.getElementById('iframeamazon');
	if (iframeamazon){
		iframeamazon.setAttribute('src', url);
		}else{
       var iframeamazon = document.createElement("iframe");
       iframeamazon.setAttribute('src', url);
       iframeamazon.setAttribute('width', '99%');
	   iframeamazon.setAttribute('height', '854px');
	   iframeamazon.setAttribute('class', 'container');
	   iframeamazon.setAttribute('id', 'iframeamazon');
       	   
	   if (getElementsByClassName('panel-wrap', 'div', document.body)){
		   var panel_wrap = getElementsByClassName('panel-wrap', 'div', document.body)[1];
		   panel_wrap.appendChild(iframeamazon);
		   }
        }
} 
