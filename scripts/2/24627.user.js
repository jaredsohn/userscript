// ==UserScript==
// @name        Embedded Video Downloader v0.1 (YouTube,Google,MetaCafe, ect.)
// @namespace   http://www.userscripts.org
// @description get direct link for embedded videos from different sites using vngrabber.net
// @version     0.1
// @date        2008-04-01
// @include		*break.com/index/*
// @include		*crunchyroll.com/media*
// @include     *dailymotion.com*video*
// @include     *ifilm.com/video/*
// @include		*livevideo.com/video*
// @include		*megavideo.com/?v=*
// @include     *metacafe.com/watch/*
// @include		*spike.com/video*
// @include     *veoh.com/videos/*
// @include     *video.google.com/videoplay?docid=*
// @include     *video.yahoo.com/video/play?vid=*
// @include     *vids.myspace.com/index.cfm?fuseaction=vids.individual&VideoID=*
// @include     *youtube.com/watch?v=*
// @include		*atomfilms.com/film*
// @include		*blastro.com/player*
// @include		*blog.com.vn/Home*
// @include		*bofunk.com/video*
// @include		*clip.vn/watch*
// @include		*esnips.com/doc*
// @include		*eyespot.com/share?*
// @include		*goear.com/listen*
// @include		*guba.com/watch*
// @include     *media.putfile.com*
// @include		*jumpcut.com/view?id=*
// @include		*mtv.com/overdrive/?id=*
// @include		*musicjesus.com/song*
// @include		*nhaccuatui.com/nghe?*
// @include		*phimtogo.com/?cmd=act:play*
// @include     *tudou.com/programs/view/*
// @include		*sonic.vn/front/music/play.aspx?*
// @include     *vimeo.com/1*
// @include     *vimeo.com/2*
// @include     *vimeo.com/3*
// @include     *vimeo.com/4*
// @include     *vimeo.com/5*
// @include     *vimeo.com/6*
// @include     *vimeo.com/7*
// @include     *vimeo.com/8*
// @include		*vntube.com/mov/view_video.php?*
// @include		*v.youku.com/v_show/id*
// @include		*vnmusic.com.vn/music/index.php?aid=nghenhac&id*
// @include		*theoyeucau.com/Home*2005*
// @include		*theoyeucau.com/Home*2006*
// @include		*theoyeucau.com/Home*2007*
// @include		*theoyeucau.com/Home*2008*
// @include		*theoyeucau.com/Home*2009*
// @include		*yourfilehost.com/media.php?cat*file*
// ==/UserScript==

getLink();
	
function getLink(){
	hostLink='http://www.vngrabber.net/index.php';
	GM_xmlhttpRequest({
    	method: 'POST',
    	url:hostLink,
    	headers: {
	    	'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        	'Content-type' : 'application/x-www-form-urlencoded',},data:'url='+window.location.href,
    		onload: function(responseDetails) {
	    		addElement();
        		document.getElementById('videodownload').innerHTML=responseDetails.responseText;
        		
    	}
	});
}

function addElement(){
	var e = document.createElement('div');
	e.setAttribute('id', 'videodownload');
	document.body.insertBefore(e,document.body.childNodes[0]);
}


