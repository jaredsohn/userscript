// ==UserScript==
// @name           DMvsVLC v1.1 (20090518)
// @namespace      somebody@somewhere
// @description    Dailymotion : add links (flv/mp4) to download videos and (optionly) replace DM player by vlc mozilla plugin
// @include        http://www.dailymotion.com/*
// ==/UserScript==

dailypatch=0;
link="";
boolReplacePlayer=false;	// false = original player

dailymotion();

// add video to vlc & play it
// btw vlc plugin crash A LOT with firefox
// it's ok in opera but i'm unable to access to vlc interface
// other problems : how to deactivate overlay / how to activate controls
// it's just a hack to reduce CPU

function playvideo()
{
	vlc=document.getElementById("vlc");

	if (vlc)
	{
	vlc.playlist.add(link);
	vlc.playlist.play();
	}
}

function dailymotion()
{
	nBox=document.getElementById("videoplayer");
	
	if (!nBox)
		return;

	nElem=document.getElementsByTagName("div");
	
	document.title+=" (video detected)"; // script in action ^^

for (nn=0;nn<nElem.length;nn++)
{
	div=nElem[nn];
	clas=div.getAttribute("class");
	
	if (clas)
		{
			if (clas=="dm_widget_videoplayer")
			{
				code=unescape(div.innerHTML);
				
			var deb=code.indexOf('video=',0);
			var fin=code.indexOf('&amp;',deb);
			if (deb==-1 | fin==-1)
				break;
			code=code.substring(deb,fin);
			format=new Array();
			var i=0; // # format
			deb=0;
		
			do
			{
				// old : every stream start with '/get' (include) and end with '@@' (exclude)
				// new : '/get' > '/cdn/'		
				deb=code.indexOf('/cdn/',deb)
				if (deb==-1)
					break;
				fin=code.indexOf('@@',deb)
				if (fin==-1)
					break;
				format[i]="http://www.dailymotion.com"+code.substring(deb,fin);
				deb=fin;
				i++;
			}
			while (i<6); // safety
			
			var newCode="";
			
			var link=format[i-1]; // default stream for vlc = MP4

			// replace DM player ?

			if (boolReplacePlayer)
			{
					newCode="<EMBED type='application/x-vlc-plugin' version='VideoLAN.VLCPlugin.2' id='vlc' width='560' height='420' target='"+format[i-1]+"' autoplay='yes' /></br>";
			}
				
			// add video download links (right click to download / left click to play)
			newCode+="<CENTER>";
			
			for (l=0;l<i;l++)
			{
				newCode+="<a href='"+format[l]+"'>DOWNLOAD</a> ";
			}
			
			if (boolReplacePlayer)
			{			
				// add play button for vlc (cheap player ^^)
				newCode+="<button type='button' onclick='javascript:playvideo()'>PLAY</button>";
			}
			newCode+="</CENTER>";
			
			if (boolReplacePlayer==false)
				newCode=newCode+div.innerHTML;
				
			div.innerHTML=newCode;
			
			dailypatch=true;
			}
		}
}
}