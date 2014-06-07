// ==UserScript==
// @name          Videoembed
// @description	 Automatically adds embedded videos after links to video pages..
// @include       *
// @exclude        http://glumbert.com/*
// @exclude        http://*.glumbert.com/*
// @exclude        http://metacafe.com/*
// @exclude        http://*.metacafe.com/*
// @exclude        http://video.google.com/*
// @exclude        http://*.tinypic.com/*
// @exclude        http://video.yahoo.com/*
// @exclude        http://*.video.yahoo.com/*
// @exclude        http://*.photobucket.com/*
// @exclude        http://photobucket.com/*
// @exclude        http://ifilm.com/*
// @exclude        http://*.ifilm.com/*
// @exclude        http://bolt.com/*
// @exclude        http://*.bolt.com/*
// @exclude        http://youtube.com/*
// @exclude        http://*.youtube.com/*
// @exclude        http://*.myspace.com/*
// @exclude        http://myspace.com/*
// @exclude        http://*.liveleak.com/*
// @exclude        http://liveleak.com/*
// @exclude        http://revver.com/*
// @exclude        http://*.revver.com/*
// @exclude        http://*.atomfilms.com/*
// @exclude        http://atomfilms.com/*
// @exclude        http://*.addictingclips.com/*
// @exclude        http://addictingclips.com/*
// @exclude        http://*.vimeo.com/*
// @exclude        http://vimeo.com/*
// @exclude        http://*.veoh.com/*
// @exclude        http://veoh.com/*
// @exclude        http://*.guba.com/*
// @exclude        http://guba.com/*
// @exclude        http://gamevideos.com/*
// @exclude        http://*.gamevideos.com/*
// @exclude        http://gametrailers.com/*
// @exclude        http://*.gametrailers.com/*
// @exclude        http://tudou.com/*
// @exclude        http://*.tudou.com/*
// @exclude        http://pikniktube.com/*
// @exclude        http://*.pikniktube.com/*


// @namespace   http://hergonan.blogspot.com/

// @version        2.2


//by Hergonan (http://hergonan.blogspot.com)
// ==/UserScript==

(function() {
	var page_links = document.links;
	var pushed=new Array();
	
	function createVideo(e,tubelink) {
		if(!tubelink.match("[A-Za-z0-9_\-]{11}"))
			return;
		if(pushed.indexOf(tubelink)!=-1)
			return;
		pushed.push(tubelink);
		tubeobj=document.createElement('object');
		tubeobj.setAttribute('width','425');
		tubeobj.setAttribute('height','350');
		tubeobj.innerHTML = '<param name="movie" value="http://www.youtube.com/v/"'+tubelink+'></param><embed src="http://www.youtube.com/v/'+tubelink+'" type="application/x-shockwave-flash" width="425" height="350"></embed>'
		e.parentNode.insertBefore(document.createElement('br'),e.nextSibling);
		e.parentNode.insertBefore(tubeobj,e.nextSibling);
		e.parentNode.insertBefore(document.createElement('br'),e.nextSibling);
	}
for (var i=0; i<page_links.length; i++){
	if(page_links[i].href.match("http://(www\.|)glumbert\.com/media/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			var obj = document.createElement("object");
			obj.setAttribute('width','496')
			obj.setAttribute('height','372')
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/media/')+7).split('/');
			name = argus[0]
			obj.innerHTML = '<param value="http://www.glumbert.com/embed/'+name+'" name="movie"/><param value="transparent" name="wmode"/><embed width="496" height="372" wmode="transparent" type="application/x-shockwave-flash" src="http://www.glumbert.com/embed/'+name+'"/>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
		}
	}
	if(page_links[i].href.match("http://(www\.|)metacafe\.com/watch/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/watch/')+7).split('/');
			var obj = document.createElement("object");
			obj.setAttribute('width','400')
			obj.setAttribute('height','372')
			id=argus[0]
			if(argus[1])
				rest=argus[1]
			else
				rest=''
			obj.innerHTML = '<param name="movie" value="http://www.metacafe.com/fplayer/'+id+'/'+rest+'.swf"></param><embed src="http://www.metacafe.com/fplayer/'+id+'/'+rest+'.swf" width="400" height="345" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash"></embed>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
		}
	}
	if(page_links[i].hostname.match("video\.google\.") && page_links[i].href.match("/videoplay"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('docid=')+6).split('&');
			var src = 'http://video.google.com/googleplayer.swf?docId=' + argus[0] + '&hl=en'
			var obj = document.createElement("object");
			obj.setAttribute('width','400')
			obj.setAttribute('height','326')
			obj.innerHTML = '<param name="movie" value="'+src+'"></param><embed style="width:400px; height:326px;" id="VideoPlayback" type="application/x-shockwave-flash" src="'+src+'" flashvars="&subtitle=on"></embed>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);				
		}
	}
	if(page_links[i].href.match('http://video\.animeepisodes\.net/video')) 
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/video/')+7).split('/');
			src = argus[0]
			src = src.substring(0,src.indexOf('.htm'))
			src = 'http://video.animeepisodes.net/vidiac.swf" FlashVars="video=' + src
			var obj = document.createElement("object");
			obj.setAttribute('width','428')
			obj.setAttribute('height','352')
			obj.innerHTML = '<param name="movie" value="'+src+'"></param><embed src="' + src + '" quality="high" bgcolor="#ffffff" width="428" height="352" name="ePlayer" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
		}
	}
	if(page_links[i].href.match("http://video\.tinypic\.com/player.php?") && page_links[i].href.match("v="))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('v=')+2).split('&');
			src = 'http://tinypic.com/player.swf?file=' + argus[0]
			var obj = document.createElement("object");
			obj.setAttribute('width','440')
			obj.setAttribute('height','380')
			obj.innerHTML = '<param name="movie" value="'+src+'"></param><embed width="440" height="380" type="application/x-shockwave-flash" src="'+src+'"></embed>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
		}
	}
	if(page_links[i].href.match("http://(ca\.|sg\.|ph\.|malaysia\.|uk\.|fr\.|it\.|au\.|tw\.|telemundo\.|staging\.|de\.|)video.yahoo.com/video/play") && page_links[i].href.match("vid="))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			id=page_links[i].href.substring(page_links[i].href.indexOf('vid=')+4).split('&')[0].split('.')[1];
			if(!id)
			id=page_links[i].href.substring(page_links[i].href.indexOf('vid=')+4).split('&')[0];
			var obj = document.createElement("object");
			obj.setAttribute('width','440')
			obj.setAttribute('height','380')
			obj.innerHTML = '<param name="movie" value="http://us.i1.yimg.com/cosmos.bcst.yahoo.com/player/media/swf/FLVVideoSolo.swf"></param><embed src="http://us.i1.yimg.com/cosmos.bcst.yahoo.com/player/media/swf/FLVVideoSolo.swf" flashvars="id=' + id + '" type="application/x-shockwave-flash" width="425" height="350"></embed>'
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(obj, page_links[i].nextSibling);
			page_links[i].parentNode.insertBefore(document.createElement('br'),page_links[i].nextSibling);
		}
	}
	if(page_links[i].href.match("http://(video\.|)photobucket\.com/mediadetail"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
		pushed.push(page_links[i].href);
		argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++) {
			if(!argus[x].indexOf('media=') && argus[x].match('swf')) {
				var span = document.createElement("span");
				lol = argus[x].substring(argus[x].indexOf('video')+1)
				bleh=lol.substring(lol.indexOf('vid')).split('.');
				id = bleh[0].substring(3)
				code_str = ''
				code_str += '<br><embed width="430" height="389" type="application/x-shockwave-flash" src="http://s' + id + '.photobucket.com' + unescape(argus[x].substring(6)) + '"></embed><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
			}
		}
		}
	}
	
	if(page_links[i].href.match("http://(www\.|stage\.|partners\.|)ifilm\.com/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
		pushed.push(page_links[i].href);
		
		argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
		for(x=0;x<argus.length;x++) {
			if(!argus[x].indexOf('video')) {
				var span = document.createElement("span");
				y = x + 1
				lol = argus[y]
				code_str = ''
				code_str += '<br><embed width="448" height="365" src="http://www.ifilm.com/efp" quality="high" bgcolor="000000" name="efp" align="middle" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" flashvars="flvbaseclip=' + lol + '&"> </embed><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
			}
		}
		}
	}
	if(page_links[i].hostname.match("(www\.|)bolt\.com") && page_links[i].href.match("/video/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
		pushed.push(page_links[i].href);
		argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
		x = argus.length
		x = x - 1
		lol = argus[x]
		if(lol.match("[0-9]") && !lol.match("[a-zA-Z]"))
		{
			var span = document.createElement("span");
			code_str = '<br><embed src="http://www.bolt.com/video/flv_player_branded.swf?contentId='+lol+'&contentType=2" loop="false" quality="high" bgcolor="white" width="365" height="340" name="video_play_500" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /><br>'
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
		}
		if(!lol) {
			x = x - 1
			lol = argus[x]
			if(lol.match("[0-9]") && !lol.match("[a-zA-Z]"))
			{
				var span = document.createElement("span");
				code_str = '<br><embed src="http://www.bolt.com/video/flv_player_branded.swf?contentId='+lol+'&contentType=2" loop="false" quality="high" bgcolor="white" width="365" height="340" name="video_play_500" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
			}
		}
		}
	}
	if(page_links[i].href.match(/\.youtube.com\/watch\?v=/i))
	{
		argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++)
			if(!argus[x].indexOf('v='))
				createVideo(page_links[i],argus[x].substring(2))
	}
	if(page_links[i].href.match("http://(www\.|)youtube\.com/view_play_list"))
	{
		argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++) {
			if(!argus[x].indexOf('p='))
			{
			link = argus[x].substring(2)
			var span = document.createElement("span");
			code_str = ''
			code_str += '<br><object width="530" height="370"><param name="movie" value="http://www.youtube.com/p/'+link+'"></param><embed src="http://www.youtube.com/p/'+link+'" type="application/x-shockwave-flash" width="530" height="370"></embed></object><br>'
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
			}
		}
	}
	if(page_links[i].href.match("http://vids\.myspace\.com/index\.cfm"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
			for(x=0;x<argus.length;x++)
			{
				if(!argus[x].indexOf('videoid=') || !argus[x].indexOf('videoID='))
				{
				mys = argus[x].substring(8)
				var span = document.createElement("span");
				code_str = '<br><embed src="http://lads.myspace.com/videos/vplayer.swf" flashvars="m=' + mys + '&type=video" type="application/x-shockwave-flash" width="430" height="346"></embed><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)liveleak\.com/view"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
		pushed.push(page_links[i].href);
		argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
		for(x=0;x<argus.length;x++) {
			if(!argus[x].indexOf('i=')) {
				var span = document.createElement("span");
				code_str = ''
				code_str += '<br><object type="application/x-shockwave-flash" width="450" height="370" data="http://www.liveleak.com/player.swf?autostart=false&token=' + argus[x].substring(2) + '"><param name="movie" value="http://www.liveleak.com/player.swf?autostart=false&token=' + argus[x].substring(2) + '"><param name="quality" value="high"></object><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
			}
		}
		}
	}
	if(page_links[i].href.match("http://(one\.|)revver\.com/watch"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			var span = document.createElement("span");
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('watch')) {
					
					y = x + 1
					lol = argus[y]
					code_str = ''
					code_str += '<br><embed type="application/x-shockwave-flash" src="http://flash.revver.com/player/1.0/player.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" scale="noScale" salign="TL" bgcolor="#ffffff" flashvars="mediaId=' + lol + '&affiliateId=0" height="392" width="480"></embed><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)atomfilms\.com/film/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			var span = document.createElement("span");
			argus=page_links[i].href.substring(page_links[i].href.indexOf('film/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(argus[x].match('\.jsp')){
					var link = argus[x].substring(0,argus[x].indexOf('\.jsp'))
					
					code_str = ''
					code_str += '<br><embed src="http://www.atomfilms.com:80/a/autoplayer/shareEmbed.swf?keyword='+link+'" width="426" height="350"></embed><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|upload\.|)addictingclips\.com/Clip"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('key=')) {
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><embed src="http://www.addictingclips.com/player-ac-em.swf?key='+argus[x].substring(4)+'" width="430" height="354"></embed><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)vimeo\.com/clip"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			if(page_links[i].href.match('clip:'))
			argus=page_links[i].href.substring(page_links[i].href.indexOf('clip:')+5)
			
			if(page_links[i].href.match('clip='))
			argus=page_links[i].href.substring(page_links[i].href.indexOf('clip=')+5)
			
			var span = document.createElement("span");
			code_str = ''
			code_str += '<br><embed src="http://www.vimeo.com/moogaloop.swf?clip_id='+argus+'" quality="best" scale="exactfit" width="400" height="300" type="application/x-shockwave-flash"></embed><br>'
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
		}
	}
	if(page_links[i].href.match("http://(www\.|)veoh\.com/videos/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('videos')) {
					y = x + 1
					link = argus[y]
					
					if(link.indexOf('?') != '-1')
					link = link.substring(0,link.indexOf('?'))
					
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><embed src="http://www.veoh.com/videodetails.swf?permalinkId='+link+'&id=1&player=videodetails&videoAutoPlay=0" width="540" height="438" bgcolor="#000000" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|fearnet\.|my\.|)guba\.com/watch/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('watch')) {
					y = x + 1
					link = argus[y]
					if(link.indexOf('?') != '-1')
					link = link.substring(0,link.indexOf('?'))
					href = page_links[i].href
					href = href.substring(href.indexOf('http://')+7)
					href = href.substring(0,href.indexOf('/')).split('\.')
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><embed src="http://'+href[0]+'.guba.com/f/root.swf?video_url=http://free.guba.com/uploaditem/'+link+'/flash.flv&isEmbeddedPlayer=true" quality="high" bgcolor="#FFFFFF" menu="false" width="375px" height="360px" name="root" id="root" align="middle" allowScriptAccess="sameDomain" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)gamevideos\.com/video/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('video')) {
					y = x + 2
					link = argus[y]
					if(link.indexOf('?') != '-1')
					link = link.substring(0,link.indexOf('?'))
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="420" height="405" id="gamevideos6" align="middle"><param name="quality" value="high"><param name="play" value="true"><param name="loop" value="true"><param name="scale" value="showall"><param name="wmode" value="window"><param name="devicefont" value="false"><param name="bgcolor" value="#000000"><param name="menu" value="true"><param name="allowScriptAccess" value="sameDomain"><param name="allowFullScreen" value="true"><param name="salign" value=""><param name="movie" value="http://www.gamevideos.com:80/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://www.gamevideos.com:80/video/videoListXML%3Fid%3D'+link+'%26ordinal%3D1175513941657%26adPlay%3Dfalse" /><param name="quality" value="high" /><param name="bgcolor" value="#000000" /> <embed src="http://www.gamevideos.com:80/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://www.gamevideos.com:80/video/videoListXML%3Fid%3D'+link+'%26ordinal%3D1175513941657%26adPlay%3Dfalse" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" play="true" loop="true" scale="showall" wmode="window" devicefont="false" id="gamevideos6" bgcolor="#000000" name="gamevideos6" menu="true" allowscriptaccess="sameDomain" allowFullScreen="true" type="application/x-shockwave-flash" align="middle" height="405" width="420"/></object><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|moses\.|)gametrailers\.com/umwatcher"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('id=')) {
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"  codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" id="gtembed" width="480" height="409">	<param name="allowScriptAccess" value="sameDomain" /> <param name="movie" value="http://www.gametrailers.com/remote_wrap.php?umid='+argus[x].substring(3)+'"/> <param name="quality" value="high" /> <embed src="http://www.gametrailers.com/remote_wrap.php?umid='+argus[x].substring(3)+'" swLiveConnect="true" name="gtembed" align="middle" allowScriptAccess="sameDomain" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="480" height="409"></embed> </object><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)pikniktube\.com/video"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('Video=')) {
					var span = document.createElement("span");
					link = argus[x].substring(6)
					code_str = ''
					code_str += '<br><object data="http://www.pikniktube.com/flvplayer.swf" type="application/x-shockwave-flash" height="388" width="450"><param value="#FFFFFF" name="bgcolor"><param value="image=http://www.pikniktube.com/titles/'+link+'.jpg&amp;file=http://medya.pikniktube.com/video/'+link+'.flv&amp;overstretch=true&amp;showdigits=false&amp;logo=VideoLogo.swf&amp;showicons=true&amp;showfsbutton=true&amp;showdigits=true&amp;showeq=true&amp;autostart=false&amp;volume=100&amp;fsreturnpage=default.asp&amp;width=450&amp;height=370&amp;displayheight=370" name="flashvars"></object><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
				}
			}
		}
	}
	if(page_links[i].href.match("http://(www\.|)tudou\.com/programs/view"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('?')+1).split('&');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('itemID=')) {
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><object width="400" height="350"><param name="movie" value="http://www.tudou.com/player/player.swf?iid='+argus[x].substring(7)+'"></param><embed src="http://www.tudou.com/player/player.swf?iid='+argus[x].substring(7)+'" type="application/x-shockwave-flash" width="400" height="350"></embed></object><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span, page_links[i].nextSibling);
				}
			}
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/view/')+6).split('/');
			if(argus[0]) {
				var span = document.createElement("span");
				code_str = ''
				code_str += '<br><object width="400" height="350"><param name="movie" value="http://www.tudou.com/v/'+argus[0]+'"></param><embed src="http://www.tudou.com/v/'+argus[0]+'" type="application/x-shockwave-flash" width="400" height="350"></embed></object><br>'
				span.innerHTML = code_str
				page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
			}	
		}
	}
	if(page_links[i].href.match("http://(www\.|)tudou\.com/playlist/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			argus=page_links[i].href.substring(page_links[i].href.indexOf('/')+1).split('/');
			for(x=0;x<argus.length;x++) {
				if(!argus[x].indexOf('id')) {
					y = x + 1
					link = argus[y]
					var span = document.createElement("span");
					code_str = ''
					code_str += '<br><object width="488" height="423"><param name="movie" value="http://www.tudou.com/player/playlist.swf?lid='+link+'"></param><param name="allowscriptaccess" value="always"><embed src="http://www.tudou.com/player/playlist.swf?lid='+link+'" type="application/x-shockwave-flash" width="488" height="423"></embed></object><br>'
					span.innerHTML = code_str
					page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
				}
			}
		}
	}
	
	/*	Template
	if(page_links[i].href.match("http://(www\.|)template\.com/"))
	{
		if(pushed.indexOf(page_links[i].href)==-1)
		{
			pushed.push(page_links[i].href);
			//check for video code here
			
			code_str = ''
			code_str += '<br>embed code here<br>'
			span.innerHTML = code_str
			page_links[i].parentNode.insertBefore(span,page_links[i].nextSibling);
		}
	}
	*/
		
}

    // only check for updates one time a day
	var d = new Date();
    if (GM_getValue('lastcheck') == d.getDate()) {
        return
    }
    GM_setValue('lastcheck',d.getDate());
	var elmInsertPoint = document.body;
	var elmD = document.createElement("div");
	elmD.setAttribute('style',"position:fixed;background:white;border:1px solid yellow;bottom:0")
	var elmA = document.createElement("a");
	elmA.setAttribute('style',"color:black")
    elmA.setAttribute("href", "http://userscripts.org/scripts/source/7686.user.js");
    elmA.innerHTML = 'Checking for new version of Videoembed';
	elmD.appendChild(elmA)
    elmInsertPoint.insertBefore(elmD, elmInsertPoint.lastChild);
    // check for update
    GM_xmlhttpRequest({
        method:"GET",
        url:'http://userscripts.org/scripts/source/7686.user.js',
        onload:function(result) {
            if (result.responseText.indexOf('@version        2.2') == -1) {
				elmA.setAttribute('style',"display:none")
				elmA.innerHTML = 'There is a new version of the "videoembed" userscript. Click here to install it'
				elmA.setAttribute('style',"color:blue")
            }
			else
			elmA.setAttribute('style',"display:none")
			
        }
    });
})();