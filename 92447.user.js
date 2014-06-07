// ==UserScript==
// @name           KoE MegaUpload Streamer
// @version        2.50
// @namespace      http://kingdomofeyes.com
// @description    Stream Videos from MegaUpload.com
// @include        http://*megaupload.com/*d=*
// @include        http://*kingdomofeyes.com/MUstream/player.php*
// ==/UserScript==
var version = "2.50";

/* Generate Video
==----------------*/
	function KoEGenVid(){
		var timer = 0;
			if (document.getElementById('countdown')){ timer = document.getElementById('countdown').innerHTML; } // Get timer
		var downloadlinkDiv = document.getElementById('downloadlink');    
		var iframe_top = 30;
		var iframe_left = 140;
		var iframe = document.createElement("div");
		iframe.style.position = 'absolute';
		iframe.style.zIndex = 200;
		iframe.style.top = iframe_top + 'px';
		iframe.style.left = iframe_left + 'px';
		iframe.setAttribute("id", "KoEStrm");
		document.body.insertBefore(iframe, document.body.firstChild);
		var myiframe = '<iframe src="http://kingdomofeyes.com/MUstream/videoplayer.php?&url=' + downloadlink + '&timer=' + timer + '" width="720px" height="420px" style="position:absolute;z-index:500;top:10px;;width:720px;height:420px;border:0px;margin:auto auto;" scrolling="no"></iframe>';
		 var myhtml =  '<div id="koe-pmain">' + myiframe + '</div>';
		iframe.innerHTML = myhtml
	}






/* Validation
===-----------*/
	var bodies = document.getElementsByTagName('body');
	var mainDiv = bodies[0];
	var pagecontent = mainDiv.innerHTML;
	// var dvid = document.getElementsByTagName('a')[14];
	
	var bad = pagecontent.search("Unfortunately, the link you have clicked is not available.") +
			pagecontent.search("The file you are trying to access is temporarily unavailable.") +
			pagecontent.search("The file that you're trying to download is larger than 1 GB.") +
			pagecontent.search("The file you're trying to download is password protected.") + 
			pagecontent.search(".rar</span><br") + pagecontent.search(".zip</span><br") + 
			pagecontent.search(".7zip</span><br") + pagecontent.search(".7z</span><br") +
			pagecontent.search(".001</span><br") + pagecontent.search(".002</span><br") +
			pagecontent.search(".003</span><br") + pagecontent.search(".004</span><br") +
			pagecontent.search(".txt</span><br") + pagecontent.search(".rtf</span><br") +
			pagecontent.search(".exe</span><br") + pagecontent.search(".ogm</span><br") +
			pagecontent.search(".iso</span><br") + pagecontent.search(".bin</span><br") +
			pagecontent.search(".mp3</span><br") + pagecontent.search(".wmv</span><br") +
			pagecontent.search(".mp4</span><br") + pagecontent.search(".wma</span><br") +
			pagecontent.search(".ogg</span><br") + pagecontent.search(".mov</span><br") +
			pagecontent.search(".aac</span><br") + pagecontent.search(".wav</span><br") +
			pagecontent.search(".psd</span><br");

	if (bad > 0) {
		while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);} // Remove lower 3 adverts

		// Insert non-video message.
		var m = document.createElement('div');
		m.setAttribute("id", "error_msg");
		document.getElementsByTagName("div")[22].appendChild(m);
		document.getElementById("error_msg").style.fontWeight = 'bold';
		document.getElementById("error_msg").style.color = '#F00';
		document.getElementById("error_msg").style.fontSize = '1.4em';
		document.getElementById("error_msg").innerHTML = 
		"Not a video file <abbr title='KoE Video Streamer disabled. Some adverts removed.' style='font-size:0.8em;position:relative;bottom:2px'>[?]</abbr>";
		

}


else { 
/* Show Video
===-----------*/
	// while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);} // Remove lower 3 adverts
	
	if (!document.getElementById('koe-pmain')) {
		var a = document.getElementsByTagName('a');
		for (var i=0; i<a.length; i++){
			if (a[i].href.indexOf('megaupload.com/files/') > 0){
				downloadlink = escape(a[i].href);
				KoEGenVid();
				
				/* Timer bypass fixed by MU -_-
				 document.getElementById('downloadcounter').style.display = 'none';
				 document.getElementById('downloadlink').style.display = 'inline'; */
				break;  }
		}	
	}


     /*  CopyRight 2011 - Team KoE
          www.kingdomofeyes.com
     ===---All-Rights-Reversed-----*/
}