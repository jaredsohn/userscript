// ==UserScript==
// @name	AV Quick Stream
// @version	1.2
// @namespace	http://www.anivoid.com/
// @description	Stream any .avi or .mp4 files from aniVOID's Anime, Cartoon, or Hentai database. Also works with icefilms.info. Based on IQS.


// @include	http://www.anivoid.com/*
// @include	http://cartoon.anivoid.com/*
// @include	http://hentai.anivoid.com/*
// @include	http://www.megaupload.com/*d=*
// @include	http://megaupload.com/*d=*

// @include	http://www.megaporn.com/*d=*
// @include	http://megaporn.com/*d=*


// ==/UserScript==

	var version = "1.2";
	
	// get url params
	function gup(name){
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(location.href);
		if (results == null)
			return "";
		else
			return results[1];
	}
	
	// url params
	var w = gup('w');
	var h = gup('h');
	
	// defaults
	if (!w) w = 968;
	if (!h) h = 554;
	var downloadlink = 0;
	var flashlink = 0;
	var timer = 0;
	
	function avVerify(){
		var normalizedURL = 'http://';
		if (!location.host.match(/www\./i)) normalizedURL += "www.";
		normalizedURL += location.host + location.pathname;
		if (gup('d')) normalizedURL += "?d="+gup('d');
		
		var iframe = document.createElement("iframe");
		iframe.src = 'http://www.anivoid.com/stream/verify.php?url='+normalizedURL;
		iframe.style.width = w+'px';
		iframe.style.height= h+'px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","avVerify");
		document.body.insertBefore(iframe, document.body.firstChild);
	}

	function avEmbed(){
		var iframe = document.createElement("iframe");
		iframe.src = 'http://www.anivoid.com/stream/player.php?&w='+w+'&h='+h+'&vurl='+downloadlink+'&d='+flashlink+'&t='+timer+'&v='+version;
		iframe.style.width = w+'px';
		iframe.style.height= h+'px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","avQuickStream");
		document.body.insertBefore(iframe, document.body.firstChild);
	}
	

	
// anivoid
if (location.host.match('anivoid.com') || location.host.match('cartoon.anivoid.com') || location.host.match('hentai.anivoid.com') && !location.href.match('&sourceid=')) {
	var a = document.getElementById('srclist').getElementsByTagName('a');
	for (var i=0;i<a.length;i++){
		var x = a[i].href;
		var url=x.indexOf('&url=')+5;
		if (url>5) {
			x = x.slice(url);
			if (!x.match("\\?"))
				x = x.replace("&","?");
			if (x.match('dankfile.com'))
				a[i].target = "_blank";
			a[i].href = x;
		}
	}
}





// mega
if ((location.host.match('megaupload.com') || location.host.match('megaporn.com')) && location.href.match('\\?d=')){

	// check for bad link
	var pagecontent = document.body.innerHTML;
	var bad = pagecontent.search("Unfortunately, the link you have clicked is not available.") +
	pagecontent.search("The file that you're trying to download is larger than 1 GB.") +
	pagecontent.search("The file you're trying to download is password protected.") + 
	pagecontent.search(".mkv</span><br />") +
	pagecontent.search(".ogm</span><br />") +
	pagecontent.search(".001</span><br />") +
	pagecontent.search(".002</span><br />") +
	pagecontent.search(".003</span><br />") +
	pagecontent.search(".rar</span><br />") +
	pagecontent.search(".zip</span><br />");
	
	if (bad > 0 && !document.getElementById('avVerify')){
		avVerify();
	}
	
	// display embed
	else if (!document.getElementById('avQuickStream'))
	{
		if (document.body.innerHTML.indexOf('megavideo.com/?d=')>-1){
			flashlink = gup('d');
		}
		
		if (document.getElementById('countdown')){
			timer = document.getElementById('countdown').innerHTML;
		}

		var a = document.getElementsByTagName('a');
		for (var i=0;i<a.length;i++){
			if (a[i].href.indexOf('megaupload.com/files/') > 0){
				downloadlink = escape(a[i].href);
				avEmbed();
				break;
			}
		}
		 		
	}
	
}
