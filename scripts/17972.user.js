// ==UserScript==
// @name           Youtube Get FLV URL
// @namespace      userscripts.org
// @description    Gets the .flv url of the video you are viewing.
// @version        0.4
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/w*
// ==/UserScript==

function getURL(){


	var f = document.createElement('form');

	f.id='linkForm';
	f.name='linkForm';
	f.innerHTML='<p><b>FLV Link</b></p>'+
				'<input type="text" style="width: 340px; margin-top: 2px;" '+
				'readonly="" value="Getting FLV url..." class="embedField" name="fileLink" id="fileLink"/>';

	document.getElementById('watch-ratings-views').appendChild(f);	
					
								
	var dUrl = document.URL;

	var vidID = document.location.toString().split("v=")[1].split("&")[0];

	var fv = document.getElementById('movie_player').getAttribute('flashvars');

	var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("t=")[1].split("&")[0];

	var pD = document.getElementById('watch-player-div');

	function handleErr(msg,url,l){

						return true;
						
	}

	onerror=handleErr;



	var sGetter = document.createElement('script');
	sGetter.type = "text/javascript";
	sGetter.innerHTML = "try{"+
										"var vidID1 = document.URL.split('v=')[1].split('&')[0];"+
										"var gM = document.getElementById('movie_player');"+
										"var getMp1 = gM.getAttribute('flashvars');"+
										"var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID1+'&t='+getMp1.split('t=')[1].split('&')[0];"+
										"var httpRequest = new XMLHttpRequest();"+
										"httpRequest.onreadystatechange = function() { "+
										"	if(httpRequest.readyState == 4 && httpRequest.status == 303){"+
										"				var respHed = httpRequest.getResponseHeader('Location');"+
										"				if(respHed.indexOf('googlevideo') > -1){"+
										"					respHed = 'http://'+respHed.split(\"&origin=\")[1].split('&')[0]+'/get_video?video_id='+vidID1;"+
										"				}"+
										"				if(respHed.search('&signature')){"+				
										"					respHed = respHed.split('&')[0];	"+	
										"				}"+										
										"				document.getElementById('fileLink').value = respHed"+
										"	}"+
										"};"+
										"httpRequest.open('HEAD', srcWithT, true);"+
										"httpRequest.send(null);"+
										"}"+
										"catch (err){"+
										"}";
						
	document.getElementsByTagName('body')[0].appendChild(sGetter);
	


}

var nB = document.createElement('nobr');
nB.innerHTML = '<a rel="nofollow" class="actionLink" href="#" id="fLinker">'+
				'<span class="actionText" style="text-decoration:none;">FLV</span></a>';

document.getElementById('watch-ratings-views').getElementsByTagName('div')[0].appendChild(nB);

document.getElementById('fLinker').addEventListener('click', function(e) {

			e.preventDefault();

			getURL();
			
	}, false);






