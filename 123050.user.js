// ==UserScript==
// @name           beemp3_nowait (EDIT!)
// @namespace      bitsscream
// @include        http://beemp3.com/download.php?*
// ==/UserScript==



function skipWait(){
	
	var scripts=document.getElementsByTagName("script");
	for (i=0;i<scripts.length ;i++)
	{
		var index = scripts[i].innerHTML.indexOf( ";setTimeout(function(){refresh(" );
		if ( index != -1 ) {
     			var mid = scripts[i].innerHTML.substring(index+32);
			var URI = mid.substring(0,mid.indexOf(")}, 1000);}")-1);
			var title = document.getElementsByTagName("title")[0].innerHTML;

			if(title.indexOf(': Free MP3 Download')>=0)
			{
				title=title.substring(0,title.indexOf(': Free MP3 Download'));
			}	
			
			document.getElementsByTagName("body")[0].innerHTML='<div style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:0;"><img src="http://www.wallpaper-music.com/wp-content/uploads/2011/03/music-volume-wallpaper.jpg" width="100%" height="100%" alt="Smile"></div><div style="position:absolute; top:54%; left:25%; width:50%; height:50%; z-index:2;"><embed class="beeplaer" wmode="transparent" style="height:100%;width:100%;" src="http://beemp3.com/player/player.swf" quality="high" bgcolor="#ffffff" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="playerID=1&bg=0xCDDFF3&leftbg=0x357DCE&lefticon=0xF2F2F2&rightbg=0x64F051&rightbghover=0x1BAD07&righticon=0xF2F2F2&righticonhover=0xFFFFFF&text=0x357DCE&slider=0x357DCE&track=0xFFFFFF&border=0xFFFFFF&loader=0xAF2910&soundFile='+escape(URI)+'"></embed></div><div style="position:fixed; top:0; left:0; width:100%; height:100%; z-index:1;"><table cellpadding="0" cellspacing="0" height="100%" width="100%"  border="0"><TR VALIGN="TOP" height="10%"><TH ALIGN="CENTER" style="font-family: Arial,Helvetica,sans-serif; font-size: 42px; vertical-align: middle; color: white;"><a href="'+URI+'" style="font-family: Arial,Helvetica,sans-serif; font-size: 42px; color: white;">'+title+'</a></TH><TR height="85%"></TR><TR><TH ALIGN="Right" style="font-family: Arial,Helvetica,sans-serif; font-size: 10px; vertical-align: middle; color: white;"></TH></TR></table></div>';


		} 
	}
}
skipWait();