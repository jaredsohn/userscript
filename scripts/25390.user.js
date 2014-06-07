// ==UserScript==

// @name           muxtape downloader / m3u enabler

// @namespace      

// @description    This downloads muxtape songs and gives a link to an m3u to play songs in an external player

// @include        http://*.muxtape.com/*

// ==/UserScript==


var black;

var songs = new Array();
var names = new Array();
var m3ucontents = new Array();

for(var b in unsafeWindow)

{

	try

	{

		if(unsafeWindow[b].hexes != undefined)

		{

			if(unsafeWindow[b].hexes.length > 1)

			{

				black = unsafeWindow[b];

				for(var j=0; j<black.hexes.length; j++)

				{

					songs[j] = black.ladles['player'+black.hexes[j]].songurl;
					
				}

				break;

			}

		}

	}

	catch(e)

	{

	}

}



var lis = document.getElementsByTagName('li');
var j=0;
for(var i=0; i<lis.length; i++)

{

	if(lis[i].getAttribute("class") == "song")

	{	
		
		var trackname = lis[i].getElementsByTagName('div');
		trackname = trackname[0].innerHTML;
		trackname = trackname.replace(/^\s+|\s+$/g, '') ;
		
		m3ucontents = m3ucontents+encodeURIComponent("#EXTINF:-1,"+trackname+"\n"+songs[j]+"\n");
		
		var dl_a = document.createElement('a');
		

		dl_a.setAttribute('style',"color: #306EFF; display: inline;");
		
		var container_li = document.createElement("li");
		var container = document.createElement("textarea");
		container.setAttribute('name', "song"+i);
		container.setAttribute('url', songs[j]);

		dl_a.setAttribute('href', songs[j]);
		j++;
		container.setAttribute('title', lis[i].getAttribute("name"));
		container_li.setAttribute('onclick', '');
		container_li.setAttribute('style', 'padding-left: 50px;');
		container.innerHTML=trackname+".mp3";
		container.setAttribute('rows', "1");
		container.setAttribute('cols', "60");
		container.setAttribute('style',"height: 17px;");
		dl_a.innerHTML="<br>Copy/paste the above filename for easy renaming.<br>Right-click here to 'save as.'";
		dl_a.setAttribute('onclick', "location.href='"+songs[j]+"'");
		lis[i].parentNode.insertBefore(container_li, lis[i].nextSibling);
		container_li.appendChild(container);
		container_li.appendChild(dl_a);
	
		

		

	}


}

var lis2 = document.getElementsByTagName('div');

for(var i=0; i<lis2.length; i++)

{

	if(lis2[i].getAttribute("class") == "nav")

	{
		var newline=encodeURIComponent('\n');
		var m3ufullcontents=m3ucontents; //.join(newline);
		var m3u = document.createElement('a');
		m3u.setAttribute('style',"border: 2px solid red; background: White; color: Black;");
		m3u.setAttribute('href',"data:audio/x-mpegurl, "+encodeURIComponent('#EXTM3U\n')+m3ufullcontents);
		m3u.setAttribute('style',"color: #FFFFFF; display: inline;");
		m3u.setAttribute('onclick',"location.href=data:audio/x-mpegurl, " +encodeURIComponent('#EXTM3U\n')+m3ufullcontents);
		m3u.innerHTML=" play M3U in external player";
		lis2[i].appendChild(m3u);
	}
}



