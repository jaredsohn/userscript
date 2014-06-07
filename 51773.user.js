// ==UserScript==
// @name           Youtube widescreen
// @namespace      userscripts.org
// @description    Replaces the youtube flash video player with FlowPlayer flash video player and make it widescreen. ( flowplayer.org ), this script is based on Youtube Alternative Script 
// @version        0.1
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://*.youtube.com/w*
// ==/UserScript==


var vidID = document.location.toString().split("v=")[1].split("&")[0];
var fv = document.getElementById('movie_player').getAttribute('flashvars');
var srcWithT = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0];
var srcMP4SD = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0]+'&fmt=18';
var srcMP4HD = 'http://'+document.domain+'/get_video?video_id='+vidID+'&t='+fv.split("&t=")[1].split("&")[0]+'&fmt=22';
var pD = document.getElementById('watch-player-div');

var Dp = document.getElementById('watch-other-vids').innerHTML;
var Dpnew = document.getElementById('watch-other-vids');

var aLoader = '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'+'YwSRlycNcWskCkApIyEAOwAAAAAAAAAAAA==';
//http://forboden.com/coding/flashtest/FlowPlayerDark.swf  http://img.youtube.com/vi/'+vidID+'/0.jpg

Dpnew.innerHTML = '<div id="mau" style="margin-top: 500px;">'+ Dp +'</div>';	   
pD.innerHTML = '<embed width="960" height="500" type="application/x-shockwave-flash" '+'src="http://forboden.com/coding/flashtest/FlowPlayerDark.swf" id="FlowPlayer" name="FlowPlayer" bgcolor="#ffffff" '+'quality="high" allowscriptaccess="always" allowfullscreen="true" flashvars="config={ '+'playList: [ { url: \'http://img.youtube.com/vi/'+vidID+'/0.jpg\', overlayId: \'play\' }, { url: \''+encodeURIComponent(srcWithT)+'\' '+'}],showPlayListButtons:false, initialScale: \'scale\', showLoopButton: false, allowResize: true, useNativeFullScreen:true'+',autoBuffering:true,autoPlay:true,loop:false}"/><br>'+
	'<a href="'+srcWithT+'"><b>Download FLV</b></a>  |  '+
	'<a href="'+srcMP4SD+'"><b>Download MP4 SD</b></a>  |  '+
	'<a href="'+srcMP4HD+'"><b>Download MP4 HD</b></a>';

