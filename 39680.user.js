// ==UserScript==
// @name           Disable Embed Autoplay
// @namespace      http://dev.thewheatfield.org/userscripts
// @description    Disables Embed Tags Autoplay for 
//                      self embeded media
//						audio
//                      	imeem.com audio
//                      	myflashfetish.com 
//                      	profileplaylist.net
//							playlist.com
//							greatprofilemusic.com
//							myplaylist.org
//                      	deezer.com
//							bloguez.com
//						video
//							videodetective.com
//							videodetective.net
// @include        *
// ==/UserScript==

	////////////////////////////////////////////////////////////////////////
	// self embeded linking to media file
	// <embed src="annoying.mp3" autostart="true">
	////////////////////////////////////////////////////////////////////////
	// myflashfetish.com
	// 		<embed src="http://assets.myflashfetish.com/swf/mp3/minime.swf?myid=15422885&path=2008/11/23" quality="high" wmode="transparent" flashvars="mycolor=27081D&mycolor2=47232C&mycolor3=66997B&autoplay=true&rand=0&f=4&vol=100&pat=0&grad=false" width="160" height="68" name="myflashfetish" align="middle"type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" border="0" style="visibility:visible;width:160px;height:68px;"></embed>
	////////////////////////////////////////////////////////////////////////
	// bloguez.com
	//		<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" WIDTH="180" HEIGHT="265">
	//		<PARAM NAME="movie" VALUE="http://www.bloguez.com/manager/players/mediaplayer_v42.swf">
	//		<PARAM NAME="quality" VALUE="high">
	//		<PARAM NAME="allowfullscreen" VALUE="true">
	//		<PARAM NAME="allowscriptaccess" VALUE="always">
	//		<PARAM NAME="wmode" VALUE="opaque">
	//		<PARAM NAME="flashvars" VALUE="file=http://www.bloguez.com/manager/playlist.php%3Fid%3Dclairobscur&playlist=bottom&playlistsize=100&shuffle=true&repeat=list&backcolor=111111&frontcolor=cccccc&lightcolor=66cc00&screencolor=333333&autostart=true">
	//		<embed wmode="opaque" allowscriptaccess="always" allowfullscreen="true" src="http://www.bloguez.com/manager/players/mediaplayer_v42.swf" width="180" height="265" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="file=http://www.bloguez.com/manager/playlist.php%3Fid%3Dclairobscur&playlist=bottom&playlistsize=100&shuffle=true&repeat=list&backcolor=111111&frontcolor=cccccc&lightcolor=66cc00&screencolor=333333&autostart=true">
	//		</OBJECT>
	////////////////////////////////////////////////////////////////////////
	//  videodetective.com
	// 		<div style="width:320px;text-align:center;font-family:arial;font-size:11px;background-color:#f5f5f5;border:solid 1px #d2d2d2;"><embed style="border:solid 1px #e3e3e3" src="http://www.videodetective.com/codes/flvcodeplayer.swf" width="320" height="260" allowfullscreen="true" flashvars="&file=454556&height=260&width=320&autostart=false&shuffle=false" /><br><a href="http://www.videodetective.com/movies/SOMETHING_LIKE_HAPPINESS/trailer/P00454556.htm">visit videodetective.com for more info</a></div><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://counters.gigya.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEyMjgwNDY5OTE3NjUmcHQ9MTIyODA*NzMxMjkyMSZwPTU1MDgxJmQ9Jmc9MSZ*PSZvPTFlN2Y5OWZiNzlmMDQwY2ZiYzNkOWFlMTk5ZTJkMmFm.gif" /></div>
	////////////////////////////////////////////////////////////////////////
	//  videodetective.net
	// 		<embed style="border: solid 1px #E3E3E3" src="http://videodetective.net/flash/players/?publishedid=886105&customerid=69249&version=4&playerid=4" width="320" height="260" allowfullscreen="true" /><img style="visibility:hidden;width:0px;height:0px;" border=0 width=0 height=0 src="http://counters.gigya.com/wildfire/IMP/CXNID=2000002.0NXC/bT*xJmx*PTEyMzEzNDM3NTI*MzcmcHQ9MTIzMTM*Mzc1NjQwNiZwPTU1MDgxJmQ9Jmc9MSZ*PSZvPTczY2Q*NDY5NjkxYjRjYTQ5NTMwOWI2OGJjMGI5ZWNh.gif" />	
	////////////////////////////////////////////////////////////////////////
	// 	profileplaylist.net
	//	playlist.com
	//	greatprofilemusic.com
	//	myplaylist.org
	// 		<embed border="0" menu="false" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" allowscriptaccess="never" src="http://www.greatprofilemusic.com/mc/mp3player-othersite.swf?config=http://www.greatprofilemusic.com/mc/config/config_black_shuffle.xml&mywidth=435&myheight=270&playlist_url=http://www.greatprofilemusic.com/loadplaylist.php?playlist=18474792" type="application/x-shockwave-flash" height="270" style="width:435px; visibility:visible; height:270px;" width="435" wmode="transparent" name="mp3player"/>
	////////////////////////////////////////////////////////////////////////
	// deezer.com
	//		<div style="width:220px;height:55px;"><object width="220" height="55"><param name="movie" value="http://www.deezer.com/embedded/small-widget-v2.swf?idSong=904862&colorBackground=0x555552&textColor1=0xFFFFFF&colorVolume=0x39D1FD&autoplay=0"></param><embed src="http://www.deezer.com/embedded/small-widget-v2.swf?idSong=904862&colorBackground=0x525252&textColor1=0xFFFFFF&colorVolume=0x39D1FD&autoplay=0" type="application/x-shockwave-flash" width="220" height="55"></embed></object><br><font size='1' color ='#000000'>Discover <a href='http://www.deezer.com/en/linkin-park.html'>Linkin Park</a>!</font></div>
	////////////////////////////////////////////////////////////////////////
	// imeem.com
	//	<div style="width:300px;"><object width="300" height="110"><param name="movie" value="http://media.imeem.com/m/O6QMQp_Xb1/aus=false/"></param><param name="wmode" value="transparent"></param><embed src="http://media.imeem.com/m/O6QMQp_Xb1/aus=false/" type="application/x-shockwave-flash" width="300" height="110" wmode="transparent"></embed></object><div style="background-color:#E6E6E6;padding:1px;"><div style="float:left;padding:4px 4px 0 0;"><a href="http://www.imeem.com/"><img src="http://www.imeem.com/embedsearch/E6E6E6/" border="0"  /></a></div><form method="post" action="http://www.imeem.com/embedsearch/" style="margin:0;padding:0;"><input type="text" name="EmbedSearchBox" /><input type="submit" value="Search" style="font-size:12px;" /><div style="padding-top:3px;"><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=0&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/152/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=1&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/153/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=2&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/154/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=3&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/155/10/O6QMQp_Xb1/" border="0" /></a></div></form></div></div><br/><a href="http://www.imeem.com/racecarracecar/music/CBjy6dZ4/tenacious_d_kyle_quit_the_band_demo/">Kyle Quit The Band (Demo) - Tenacious D</a>
	//	<div style="width:300px;"><object width="300" height="110"><param name="movie" value="http://media.imeem.com/m/O6QMQp_Xb1"></param><param name="wmode" value="transparent"></param><embed src="http://media.imeem.com/m/O6QMQp_Xb1" type="application/x-shockwave-flash" width="300" height="110" wmode="transparent"></embed></object><div style="background-color:#E6E6E6;padding:1px;"><div style="float:left;padding:4px 4px 0 0;"><a href="http://www.imeem.com/"><img src="http://www.imeem.com/embedsearch/E6E6E6/" border="0"  /></a></div><form method="post" action="http://www.imeem.com/embedsearch/" style="margin:0;padding:0;"><input type="text" name="EmbedSearchBox" /><input type="submit" value="Search" style="font-size:12px;" /><div style="padding-top:3px;"><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=0&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/152/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=1&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/153/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=2&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/154/10/" border="0" /></a><a href="http://ads.imeem.com/ads/banneradclick.ashx?ep=3&ek=O6QMQp_Xb1"><img src="http://ads.imeem.com/ads/bannerad/155/10/O6QMQp_Xb1/" border="0" /></a></div></form></div></div><br/><a href="http://www.imeem.com/racecarracecar/music/CBjy6dZ4/tenacious_d_kyle_quit_the_band_demo/">Kyle Quit The Band (Demo) - Tenacious D</a>
	////////////////////////////////////////////////////////////////////////


// replace old embed with new embed
// need to replace not just change attribute due to way flash plugin works
function createReplacement(elementToReplace, attributeNameToChange, newAttributeValue)
{
    var embedReplacement = elementToReplace.cloneNode(true);
    embedReplacement.setAttribute(attributeNameToChange, newAttributeValue);
    elementToReplace.parentNode.replaceChild(embedReplacement, elementToReplace);
}

var list;

list = document.getElementsByTagName('object');
for(i = 0; list.length && i < list.length; i++)
{
	var object = list[i];

	var params = object.getElementsByTagName('param');
	var src = '';
	for(j = 0; params.length && j < params.length; j++)
	{
		if (params[j].getAttribute("name").toLowerCase() == 'movie')
		{
			src = params[j].getAttribute("value");
			break;
		}
	}

	for(j = 0; params.length && j < params.length; j++)
	{
		if (params[j].getAttribute("name").toLowerCase() == 'movie')
		{
			////////////////////////////////////////////////////////////////////////
			// imeem.com
			////////////////////////////////////////////////////////////////////////
			// add "/aus=false/" to the end of the src
			////////////////////////////////////////////////////////////////////////
		
			if (src.search(/imeem.com/i) != -1)
			{
				if (src.search(/aus=false/i) == -1)
				{
					var embedReplacement = document.createElement('object');
					var elementToReplace = object;
					var reg = new RegExp(src + "\"", "g");
					embedReplacement.innerHTML = object.innerHTML.replace(reg, src+"/aus=false/\"");
					elementToReplace.parentNode.replaceChild(embedReplacement, elementToReplace);
					break;
				}
			}
		}
	
	////////////////////////////////////////////////////////////////////////
	// 	myflashfetish.com
	// 	bloguez.com
	//  videodetective.com
	//  videodetective.net
	////////////////////////////////////////////////////////////////////////
	// 	change autostart or autoplay to "false" in flashvars attribute
	////////////////////////////////////////////////////////////////////////
	
		if (params[j].getAttribute("name").toLowerCase() == 'flashvars')
		{
			if ( (src.search(/myflashfetish.com/i)  != -1) 
			|| (src.search(/videodetective.com/i)  != -1)
			|| (src.search(/videodetective.net/i)  != -1)
			|| (src.search(/bloguez.com/i)  != -1)
			)

			{
				var embedReplacement = object.cloneNode(true);
				var elementToReplace = object;
				var param = embedReplacement.getElementsByTagName('param')[j];
				var flashvars = param.getAttribute("value");
				if(flashvars.search(/autostart/i) != -1)
				{
					flashvars = flashvars.replace(/autoStart=true/,"autoStart=false");
					flashvars = flashvars.replace(/autostart=true/i,"autostart=false");
					flashvars = flashvars.replace(/autoplay=true/i,"autoplay=false");
				}
				else
				{
					flashvars += '&autostart=false&autoplay=false';
				}
				createReplacement(param, "value", flashvars);
				elementToReplace.parentNode.replaceChild(embedReplacement, elementToReplace);
				break;
			}
		}
	}
}

list = document.getElementsByTagName('embed');
for(i = 0; list.length && i < list.length; i++)
{
	var msg = '';
	var embed = list[i];
	var autostart = embed.getAttribute("autostart");
	var src = embed.getAttribute("src").toLowerCase();
	
	////////////////////////////////////////////////////////////////////////
	// self embeded linking to media file
	// <embed src="annoying.mp3" autostart="true">
	////////////////////////////////////////////////////////////////////////
	//  change autostart="true" to "0"
	////////////////////////////////////////////////////////////////////////
	if (autostart != null)
	{
		createReplacement(embed, "autostart", 0);
	}
	////////////////////////////////////////////////////////////////////////
	// imeem.com
	////////////////////////////////////////////////////////////////////////
	// add "/aus=false/" to the end of the src
	////////////////////////////////////////////////////////////////////////

	if (src.search(/imeem.com/i) != -1)
	{
		if (src.search(/aus=false/i) == -1)
		{
			var embedReplacement = document.createElement('embed');
			for(i = 0; i < embed.attributes.length; i++)
			{
				if (embed.attributes[i].name.toLowerCase() == "src")
					embedReplacement.setAttribute(embed.attributes[i].name, embed.attributes[i].value + "/aus=false/");
				else
					embedReplacement.setAttribute(embed.attributes[i].name, embed.attributes[i].value);
			}
			var elementToReplace = embed;
			elementToReplace.parentNode.replaceChild(embedReplacement, elementToReplace);
		}
	}
	
	////////////////////////////////////////////////////////////////////////
	// 	myflashfetish.com
	// 	bloguez.com
	//  videodetective.com
	//  videodetective.net
	////////////////////////////////////////////////////////////////////////
	// 	change autostart or autoplay to "false" in flashvars attribute
	////////////////////////////////////////////////////////////////////////
	else if ( (src.search(/myflashfetish.com/i)  != -1) 
			|| (src.search(/videodetective.com/i)  != -1)
			|| (src.search(/videodetective.net/i)  != -1)
			|| (src.search(/bloguez.com/i)  != -1)
			)
	{
		var flashvars = embed.getAttribute("flashvars");
		if (flashvars == null)
		{
			flashvars = "autoStart=false";
		}
		else
		{
			flashvars = flashvars.replace(/autoStart=true/,"autoStart=false");
			flashvars = flashvars.replace(/autostart=true/i,"autostart=false");
			flashvars = flashvars.replace(/autoplay=true/i,"autoplay=false");
		}
		createReplacement(embed, "flashvars", flashvars);
	}
	////////////////////////////////////////////////////////////////////////
	// 	profileplaylist.net
	//	playlist.com
	//	greatprofilemusic.com
	//	myplaylist.org
	////////////////////////////////////////////////////////////////////////
	// add "noautostart" to src xml config file
	//      -----------------               --------------------------------------
	//      original filename               new filename
	//      -----------------               --------------------------------------
	//      "config_black_shuffle.xml"  >   "config_black_noautostart_shuffle.xml"        
	//      "config_black.xml"          >   "config_black_noautostart.xml"
	//
	//  format of config filename is: config_COLOUR_NOAUTOSTART_SHUFFLE.xml
	//     --------         ----------------------
	//     variable         values
	//     --------         ----------------------
	//     COLOUR           varies
	//     AUTOSTART        "noautostart" or blank
	//     SHUFFLE          "shuffle" or blank 
	////////////////////////////////////////////////////////////////////////
	else if (src.search(/greatprofilemusic.com/i)  != -1 
		|| src.search(/profileplaylist.net/i)  != -1
		|| src.search(/playlist.com/i)  != -1
		|| src.search(/myplaylist.org/i)  != -1
		)
	{
		var str = embed.getAttribute("src");
		if ((src != null) && src.search(/noautostart/i)  == -1)
		{
			if (src.search(/shuffle/i)  != -1)
			{
				str = str.replace(/shuffle/i,"noautostart_shuffle");
			}
			else
			{
				str = str.replace(/.xml/i,"_noautostart.xml");
			}
			createReplacement(embed, "src", str);

		}
	}
	////////////////////////////////////////////////////////////////////////
	// deezer.com
	////////////////////////////////////////////////////////////////////////
	// autoplay=0 in src attribute of the embed
	////////////////////////////////////////////////////////////////////////
	else if (src.search(/deezer.com/i) != -1)
	{
		if (src.search(/autoplay/i) != -1)
		{
			if (src.search(/autoplay=1/i) != -1)
			{
				src = src.replace(/autoplay=1/i,"autoplay=0");
				createReplacement(embed, "src", src);
			}
		}
		else
		{
			createReplacement(embed, "src", src + '&autoplay=0');
		}
	}
} 
