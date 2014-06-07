// ==UserScript==
// @name           s0rs player
// @namespace      userscripts.org
// @description    Replaces the youtube flash video player with s0rs player
// @credits        Based on the Youtube Alternate Video Player script by Yanksy (http://userscripts.org/scripts/show/13955)
// @version        0.1
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/watch*
// ==/UserScript==

var srcWithT;

var dUrl = document.URL;

var vidID = document.location.toString().split("v=")[1].split("&")[0];

var fv = document.getElementById('movie_player').getAttribute('flashvars');

if( dUrl.indexOf('www') > -1 ){

  srcWithT = 'http://www.youtube.com/get_video?video_id='+vidID+'&'+fv.slice(fv.indexOf('t='), fv.indexOf('&sk='));

}
else{

  srcWithT = 'http://youtube.com/get_video?video_id='+vidID+'&'+fv.slice(fv.indexOf('t='), fv.indexOf('&sk='));

}

//make into options
if(!GM_getValue('aB') && !GM_getValue('aP')){

	GM_setValue('aB', 'autoBuffering:true');
	GM_setValue('aP', 'autoPlay:false');

}

var pD = document.getElementById('playerDiv');

var aLoader = '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'+
				'YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';

pD.innerHTML = '<div style="position:relative;width:480px;height:395px;"><p style="position:relative;top:50%;left:40%;font-weight:bold;">Loading... &nbsp; <img style="position:relative;" src="data:image/gif;base64,'+aLoader+'" /></p></div>';


// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://video.s0rs.net/s0rs/jquery-1.2.1.pack.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

function letsJQuery() {

	$.ajax({
		type: "GET",
		url: srcWithT,
		error: function(data){
			
			var respHed = data.getResponseHeader('Location');

			if(respHed.indexOf('cache.googlevideo.com') > -1){
			
				respHed = 'http://'+data.getResponseHeader('Location').split("&origin=")[1]+'/get_video?video_id='+vidID;
				
			}

			pD.innerHTML = '<embed width="480" height="395" type="application/x-shockwave-flash" '+
			'src="http://video.s0rs.net/s0rs/mediaplayer.swf" id="s0rs-player" name="s0rs-player" bgcolor="#ffffff" '+
			'quality="high" allowscriptaccess="always" allowfullscreen="true" flashvars="file=http://video.s0rs.net/'+vidID+'.flv&amp;height=395&amp;width=480&amp;autostart=true" />';
	
		}
	});
   

}
