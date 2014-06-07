// ==UserScript==
// @name           Picasa SlideShow inside Orkut
// @namespace      http://gverma.blogspot.com
// @description    Shows the slideshow of users Picasa album
// @include        http://www.orkut.com/Profile.aspx*
// @include        http://orkut.com/Profile.aspx*
// ==/UserScript==(function() {
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
 	for(var i=0;i&lt;allImgs.snapshotLength;i++){
 		thisImg = allImgs.snapshotItem(i);
 		if(thisImg.src == "http://picasaweb.google.com/favicon.ico")
 			picasauser = thisImg.parentNode.href;
 		}
 	if(!picasauser)
 		return;
 	picasauser = picasauser.substring(picasauser.lastIndexOf('%2F')+3,picasauser.indexOf('&amp;'));
 	rightbox.innerHTML = '&lt;table cellspacing="0" cellpadding="0" border="0" class="module"&gt;&lt;tr&gt;&lt;td class="topl_g"&gt;&lt;b&gt;  &lt;a href="http://picasaweb.google.com"&gt;His Photos&lt;/a&gt;&lt;/b&gt;&lt;/td&gt;&lt;td class="topr"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td class="boxmid" align="center"&gt;&lt;span id="photospan"&gt;&lt;/span&gt;&lt;/td&gt;&lt;td class="boxmidr"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;tr&gt;&lt;td class="botl"&gt;&lt;/td&gt;&lt;td class="botr"&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;' + rightbox.innerHTML;
 	var span = document.getElementById('photospan');
 	if(!span)
 		return;
 	span.innerHTML = '&lt;embed type="application/x-shockwave-flash" src="http://picasaweb.google.com/s/c/bin/slideshow.swf" width="270" height="200" flashvars="host=picasaweb.google.com&amp;captions=1&amp;RGB=0xFFFFFF&amp;feed=http%3A%2F%2Fpicasaweb.google.com%2Fdata%2Ffeed%2Fapi%2Fuser%2F'+picasauser+'%2F%3Fkind%3Dphoto%26alt%3Drss%26access%3Dpublic" pluginspage="http://www.macromedia.com/go/getflashplayer"&gt;';
     } catch (e) {
         GM_log( 'Picasa Slideshow inside Orkut exception: ' + e );
 	}
})();