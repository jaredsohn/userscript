// ==UserScript==
// @name           Picasa SlideShow inside Orkut
// @namespace      http://gverma.blogspot.com
// @description    Shows the slideshow of users Picasa album 
// @include        http://www.orkut.com/Profile.aspx*
// @include        http://orkut.com/Profile.aspx*
// ==/UserScript==

(function() {
     try {
		var rightbox = document.getElementById("rbox");
		if(!rightbox)
			return;
		var allImgs = document.evaluate(
			"//img[@class='favicon']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
		if(!allImgs)
			return;
		var thisImg,picasauser;
		for(var i=0;i<allImgs.snapshotLength;i++){
			thisImg = allImgs.snapshotItem(i);
			if(thisImg.src == "http://picasaweb.google.com/favicon.ico")
				picasauser = thisImg.parentNode.href;
			}
		if(!picasauser)
			return;
		picasauser = picasauser.substring(picasauser.lastIndexOf('%2F')+3,picasauser.indexOf('&'));
		rightbox.innerHTML = '<table cellspacing="0" cellpadding="0" border="0" class="module"><tr><td class="topl_g"><b>&nbsp;&nbsp;<a href="http://picasaweb.google.com">His Photos</a></b></td><td class="topr"></td></tr><tr><td class="boxmid" align="center"><span id="photospan"></span></td><td class="boxmidr"></td></tr><tr><td class="botl"></td><td class="botr"></td></tr></table>' + rightbox.innerHTML;
		var span = document.getElementById('photospan');
		if(!span)
			return;
		span.innerHTML = '<embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="270" height="200" flashvars="host=picasaweb.google.com&captions=1&RGB=0xFFFFFF&feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'+picasauser+'%2F%3Fkind%3Dphoto%26alt%3Drss%26access%3Dpublic" pluginspage="http://www.macromedia.com/go/getflashplayer">';
     } catch (e) {
         GM_log( 'Gtalk inside Orkut exception: ' + e );
		 alert(e);
		}
    
})();