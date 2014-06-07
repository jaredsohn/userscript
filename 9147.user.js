// ==UserScript==
// @name           Video Link Grabber
// @version        1.3
// @namespace      http://userscripts.org
// @creator        SaWey
// @description    Create embedded video code on bottom of page (to past in forums). You can also use it to get the links to view the video fullscreen.
// @tags           video link grab embed forum fullscreen google youtube metacafe glumbert tinypic yahoo photobucket atomfilms myspace revver gamevideos gametrailers ifilm liveleak bolt addictingclips veoh dailymotion grouper stupidvideos break hollywoodupclose collegehumor theonion youaretv vsocial heavy garagetv flurl vmix zippyvideos blastro expertvillage flickdrop godtube gofish myvideo jibjab livedigital livevideo scenemaker sharkle thevideosense vidilife zooppa
// @include        http://video.google.*
// @include        http://youtube.com/*
// @include        http://*.youtube.com/*
// @include        http://glumbert.com/*
// @include        http://*.glumbert.com/*
// @include        http://metacafe.com/*
// @include        http://*.metacafe.com/*
// @include        http://*.tinypic.com/*
// @include        http://video.yahoo.com/*
// @include        http://*.video.yahoo.com/*
// @include        http://*.photobucket.com/*
// @include        http://photobucket.com/*
// @include        http://*.atomfilms.com/*
// @include        http://atomfilms.com/*
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// @include        http://revver.com/*
// @include        http://*.revver.com/*
// @include        http://gamevideos.com/*
// @include        http://*.gamevideos.com/*
// @include        http://gametrailers.com/*
// @include        http://*.gametrailers.com/*
// @include        http://*.veoh.com/*
// @include        http://veoh.com/*
// @include        http://ifilm.com/*
// @include        http://*.ifilm.com/*
// @include        http://*.liveleak.com/*
// @include        http://liveleak.com/*
// @include        http://bolt.com/*
// @include        http://*.bolt.com/*
// @include        http://*.addictingclips.com/*
// @include        http://addictingclips.com/*
// @include        http://addictingclips.com/*
// @include        http://*.dailymotion.com/*
// @include        http://*.grouper.com/*
// @include        http://grouper.com/*
// @include        http://stupidvideos.com/*
// @include        http://www.stupidvideos.com/*
// @include        http://www.break.com/*
// @include        http://break.com/*
// @include        http://video.hollywoodupclose.com/*
// @include        http://www.collegehumor.com/*
// @include        http://collegehumor.com/*
// @include        http://www.theonion.com/*
// @include        http://theonion.com/*
// @include        http://www.youare.tv/*
// @include        http://vsocial.com/*
// @include        http://www.vsocial.com/*

// @include        http://www.heavy.com/*
// @include        http://heavy.com/*
// @include        http://garagetv.be/*
// @include        http://www.garagetv.be/*
// @include        http://www.flurl.com/*
// @include        http://flurl.com/*
// @include        http://vmix.com/*
// @include        http://www.vmix.com/*
// @include        http://www.zippyvideos.com/*
// @include        http://zippyvideos.com/*
// @include        http://blastro.com/*
// @include        http://www.blastro.com/*
// @include        http://www.expertvillage.com/*
// @include        http://expertvillage.com/*
// @include        http://www.flickdrop.com/*
// @include        http://flickdrop.com/*
// @include        http://www.godtube.com/*
// @include        http://godtube.com/*
// @include        http://www.gofish.com/*
// @include        http://gofish.com/*
// @include        http://www.myvideo.de/*
// @include        http://myvideo.de/*
// @include        http://www.jibjab.com/*
// @include        http://jibjab.com/*
// @include        http://livedigital.com/*
// @include        http://*.livedigital.com/*
// @include        http://www.livevideo.com/*
// @include        http://livevideo.com/*
// @include        http://www.scenemaker.net/*
// @include        http://scenemaker.net/*
// @include        http://www.sharkle.com/*
// @include        http://sharkle.com/*
// @include        http://www.thevideosense.com/*
// @include        http://thevideosense.com/*
// @include        http://www.vidilife.com/*
// @include        http://vidilife.com/*
// @include        http://www.zooppa.com/*
// @include        http://zooppa.com/*


// ==/UserScript==
(function(){
	var grabImage = "data:image/gif;base64,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";
	if(window.location.href.match("http://(www\.|)youtube\.com/watch"))
	{
		temp=window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
		emb_link = 'http://www.youtube.com/v/'+temp[0].substring(2);
		print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|)glumbert\.com/media/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/media/')+7).split('/');
			emb_link = 'http://www.glumbert.com/embed/'+temp[0];
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|)metacafe\.com/watch/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/watch/')+7).split('/');
			id=temp[0];
			if(temp[1]){
				rest=temp[1];
			}else{
				rest='';
			}
			emb_link = 'http://www.metacafe.com/fplayer/'+id+'/'+rest+'.swf';
			print_link(emb_link);
	}
	if(window.location.hostname.match("video\.google\.") && window.location.href.match("/videoplay"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('docid=')+6).split('&');
			emb_link = 'http://video.google.com/googleplayer.swf?docId=' + temp[0] + '&hl=en';
			emb_link = '<center><font color="#0000FF" style="font-size:16px">Embedded player: </font><a href="'+emb_link+'" style="font-weight:bold; font-size:16px; color:#FF0000">'+emb_link+'</a><span id="copytext" style="display:none;">'+emb_link+'</SPAN><textarea id="holdtext" style="display:none;"></textarea><br /><img alt="Grab Link to Clipboard!" onClick="holdtext.innerText = copytext.innerText;Copied = holdtext.createTextRange();Copied.execCommand(\'Copy\');" src="'+grabImage+'" style="cursor: pointer;"/></center><br />';
			var div = document.createElement("div");
			var divIdName = 'embedCode';
			div.innerHTML = emb_link;
			var links = document.getElementsByTagName('a');
			links[0].parentNode.insertBefore(div, links[0].nextSibling);
	}
	if(window.location.href.match("http://video\.tinypic\.com/player.php?") && window.location.href.match("v="))
	{
			temp=window.location.href.substring(window.location.href.indexOf('v=')+2).split('&');
			emb_link = 'http://tinypic.com/player.swf?file=' + temp[0]
			print_link(emb_link);
	}
	if(window.location.href.match("http://(ca\.|sg\.|ph\.|malaysia\.|uk\.|fr\.|it\.|au\.|tw\.|telemundo\.|staging\.|de\.|)video.yahoo.com/video/play") && window.location.href.match("vid="))
	{
			id=window.location.href.substring(window.location.href.indexOf('vid=')+4).split('&')[0].split('.')[1];
			if(!id){
				id=window.location.href.substring(window.location.href.indexOf('vid=')+4).split('&')[0];
			}
			emb_link = 'http://us.i1.yimg.com/cosmos.bcst.yahoo.com/player/media/swf/FLVVideoSolo.swf?id=' + id;
			print_link(emb_link);
	}
	if(window.location.href.match("http://(video\.|)photobucket\.com/mediadetail"))
	{
			temp = window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
			temp = temp[0].substring(temp[0].indexOf('videoURL')+1)
			temp = temp.substring(temp.indexOf('vid')).split('.');
			temp = temp[0].substring(3);
			emb_link = 'http://s' + id + '.photobucket.com' + unescape(temp[0].substring(6))
			print_link(emb_link);		
	}
	if(window.location.href.match("http://(www\.|)atomfilms\.com/film/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('film/')+1).split('/');
			var link = temp[1].substring(0,temp[1].indexOf('\.jsp'));
			emb_link = 'http://www.atomfilms.com:80/a/autoplayer/shareEmbed.swf?keyword='+ link;
			print_link(emb_link);
	}
	if(window.location.href.match("http://(one\.|)revver\.com/watch"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			emb_link = 'http://flash.revver.com/player/1.0/player.swf?mediaId=' + temp[3] +'&affiliateId=0';
			print_link(emb_link);
	}	
	if(window.location.href.match("http://vids\.myspace\.com/index\.cfm"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
			temp = temp[1].substring(8);
			emb_link = 'http://lads.myspace.com/videos/vplayer.swf?m=' + temp + '&type=video';
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|)gamevideos\.com/video/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			temp = temp[4];
			emb_link = 'http://www.gamevideos.com:80/swf/gamevideos11.swf?embedded=1&fullscreen=1&autoplay=0&src=http://www.gamevideos.com:80/video/videoListXML%3Fid%3D'+temp+'%26ordinal%3D1175513941657%26adPlay%3Dfalse';
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|moses\.|)gametrailers\.com/umwatcher"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
			emb_link = 'http://www.gametrailers.com/remote_wrap.php?umid='+temp[0].substring(3);
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|)veoh\.com/videos/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			temp = temp[3].substring(0,temp[3].indexOf('?'));
			emb_link = 'http://www.veoh.com/videodetails.swf?permalinkId='+temp+'&id=1&player=videodetails&videoAutoPlay=0';
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|stage\.|partners\.|)ifilm\.com/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			emb_link = 'http://www.ifilm.com/efp?flvbaseclip='+temp[3];
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|)liveleak\.com/view"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
			emb_link = 'http://www.liveleak.com/player.swf?autostart=false&token=' + temp[0].substring(2);
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|fearnet\.|my\.|)guba\.com/watch/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			temp = temp[3].substring(0,temp[3].indexOf('?'));
			var span = document.createElement("span");
			emb_link = 'http://'+window.location.href.substring(window.location.href.indexOf('http://')+7).substring(0,window.location.href.substring(window.location.href.indexOf('http://')+7).indexOf('/')).split('\.')[0]+'.guba.com/f/root.swf?video_url=http://free.guba.com/uploaditem/'+temp+'/flash.flv&isEmbeddedPlayer=true';
			print_link(emb_link);
	}
	if(window.location.href.match("http://(www\.|upload\.|)addictingclips\.com/Clip"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('?')+1).split('&');
			emb_link = 'http://www.addictingclips.com/player-ac-em.swf?key='+temp[0].substring(4);
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)bolt\.com") && window.location.href.match("/video/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			temp = temp[temp.length - 1];
			emb_link = 'http://www.bolt.com/video/flv_player_branded.swf?contentId='+temp+'&contentType=2';
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)dailymotion\.com") && window.location.href.match("/video/"))
	{
			temp=window.location.href.substring(window.location.href.indexOf('/')+1).split('/');
			for(i=0; i<temp.length; i++){
				if(temp[i]=="video"){
					box = document.getElementById("video_player_embed_code_text");
					boxArr = box.value.split("value=\"")
					box = boxArr[1].split("\"")[0]
					emb_link = box;
					print_link(emb_link);
					}
				}
	}
	if(window.location.hostname.match("(www\.|)grouper\.com") && window.location.href.match("mid"))
	{		
			box = document.getElementsByTagName('script');
			for(i=0; i<box.length; i++){
				if(box[i].text.substring(0, 12).match("FlashObject")){
					emb_link = box[i].text.split('"');
					emb_link = 'http://www.grouper.com' + emb_link[1] + "&" + emb_link[3];
					print_link(emb_link);
                     }
				
				}
	}
		if(window.location.hostname.match("(www\.|)grouper\.com") && window.location.href.match("/video/"))
	{		
			box = document.getElementsByTagName('script');
			for(i=0; i<box.length; i++){
				if(box[i].text.substring(0, 14).match("var idMedia")){
					emb_link = box[i].text.substring(box[i].text.indexOf("=")+2).split(';')[0];
					emb_link = 'http://grouper.com/mtg/mtgPlayer.swf?gvars=id~' + emb_link;
					print_link(emb_link);
                     }
				
				}
	}
	if(window.location.hostname.match("(www\.|)stupidvideos\.com") && window.location.href.match("/video/"))
	{
			emb_link = 'http://www.stupidvideos.com/player.swf?sa=1&i=' + first_video;
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)break\.com") && window.location.href.match("/index/"))
	{		
			box = document.getElementById('popup_embed');
			emb_link = box.innerHTML
			emb_link = emb_link.substring(emb_link.indexOf("http://embed.break.com")).split("\"")[0]
			print_link(emb_link);
	}
	if(window.location.hostname.match("video\.hollywoodupclose\.com") && window.location.href.match("/video/"))
	{
			box = document.getElementById("video_object");
			boxArr = box.value.split("value=\"")
			box = boxArr[1].split("\"")[0]
			emb_link = box;
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)collegehumor\.com") && window.location.href.match("/video"))
	{			
			box = document.getElementsByTagName("input");
			for(i=0;i<box.length;i++){
				if(box[i].value.match("\<embed")){
					boxArr = box[i].value.split("\"");
					emb_link = boxArr[1] + "&autoplay=false";
					print_link(emb_link);
					}
				}	
	}
	if(window.location.hostname.match("(www\.|)theonion\.com") && window.location.href.match("/video/"))
	{			
			box = document.getElementById("embedMarkup");
			boxArr = box.value.split("flashvars=\"");
			emb_link = boxArr[1].split("\"");
			emb_link = 'http://www.theonion.com/content/themes/common/assets/videoplayer/flvplayer.swf?' + emb_link;
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)youare\.tv") && window.location.href.match("/watch"))
	{			
			box = document.getElementsByTagName("textarea");
			for(i=0;i<box.length;i++){
				if(box[i].value.match("\<embed")){
					boxArr = box[i].value.split("\"");
					emb_link = boxArr[3];
					print_link(emb_link);
					}
				}	
	}
	if(window.location.hostname.match("(www\.|)vsocial\.com"))
	{			
			box = document.getElementsByTagName("textarea");
			for(i=0;i<box.length;i++){
				if(box[i].value.match("\<embed")){
					boxArr = box[i].value.split("\"");
					emb_link = boxArr[2];
					print_link(emb_link);
					return;
					}
				}
	}	
	if(window.location.hostname.match("(www\.|)heavy\.com") && window.location.href.match("/video/"))
	{			
			arr = window.location.href.split("\/");
			for(i=0;i<arr.length;i++){
				if(arr[i].match("video")){
					emb_link = 'http://www.heavy.com/ve/flvplayer?videoID=' + arr[i+1];
					print_link(emb_link);
					}
				}
	}	
	if(window.location.hostname.match("(www\.|)garagetv\.be") && window.location.href.match("/video-galerij/"))
	{
			box = document.getElementById("_ctl0____ctl0____ctl0__ctl0_bcr_PictureDetails1___Picturestats1___VideoEmbedCode");
			if(box.value.match("\<object")){
				boxArr = box.value.split("\"");
				for(i=0;i<boxArr.length;i++){
					if(boxArr[i].match("http:\/\/www\.gar")){
						emb_link = boxArr[i];
						print_link(emb_link);
						return;
						}
					}
				}
	}
	if(window.location.hostname.match("(www\.|)flurl\.com") && window.location.href.match("/item/"))
	{			
			box = document.getElementsByTagName("param");
			for(i=0;i<box.length;i++){
				if(box[i].value.match("http:\/\/www\.flurl\.com\/flvplayer")){
					emb_link = box[i].value;
					print_link(emb_link);
					return;
					}
				}
	}	
	if(window.location.hostname.match("(www\.|)vmix\.com") && window.location.href.match("type=video"))
	{		
			emb_link = 'http://www.vmix.com/flash/vmix_single_player_offsite.swf?resource_id=' + resourceid + '&l=0&auto_play=false&lineup_url=http://www.vmix.com/deamon/vmixPlayer.php?action=get_videos_by_resourceid_list%26l=0%26resourceid_list='+resourceid;
			print_link(emb_link);			
	}	
	if(window.location.hostname.match("(www\.|)zippyvideos\.com"))
	{			
			box = document.getElementsByTagName("param");
			for(i=0;i<box.length;i++){
				if(box[i].value.match("http:\/\/www\.zippyvideos\.com\/images")){
					emb_link = box[i].value;
					print_link(emb_link);
					return;
					}
				}
	}
	if(window.location.hostname.match("(www\.|)blastro\.com") && window.location.href.match("/player/"))
	{
			box = document.getElementById("copytext");
			emb_link = box.value.substring(box.value.indexOf("http://www.blastro.com/flashplayer"), box.value.indexOf("\" quality="));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)expertvillage\.com") && window.location.href.match("/videos/"))
	{
			box = document.getElementById("embed");
			emb_link = box.value.substring(box.value.indexOf("http://www.expertvillage.com/player.swf?"), box.value.indexOf("\" type="));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)flickdrop\.com") && window.location.href.match("/viewvideo/"))
	{
			box = document.getElementById("image_code");
			emb_link = 'http://www.flickdrop.com/flvplayer.swf?' + box.value.substring(box.value.indexOf("config=http"), box.value.indexOf("\" quality="));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)godtube\.com") && window.location.href.match("/view_video"))
	{
			box = document.getElementsByTagName("textarea");
			for(i=0; i<box.length; i++){
				if(box[i].name == "video_play"){
					emb_link = 'http://godtube.com/flvplayer.swf?' + box[i].value.substring(box[i].value.indexOf("flvPath=http"), box[i].value.indexOf("Brought to you by")) + document.title;
					print_link(emb_link);
					}
				}
	}
	if(window.location.hostname.match("(www\.|)gofish\.com") && window.location.href.match("/player"))
	{
			box = document.getElementById("embed");
			emb_link = 'http://www.gofish.com/player/fwplayer.swf?' + box.value.substring((box.value.indexOf("FlashVars=\"")+11), box.value.indexOf("\"><\/embed"));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)myvideo\.de") && window.location.href.match("/watch/"))
	{
			box = document.getElementById("embed_url");
			emb_link = box.value.substring((box.value.indexOf("http:\/\/www\.myvideo\.de\/movie")), box.value.indexOf("\"><\/param"));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)jibjab\.com") && (window.location.href.match("/originals/")||window.location.href.match("/view/")))
	{
			emb_link = 'http://www.jibjab.com' + player_var["movie"] + "?" + player_var["flashvars"];
			print_link(emb_link);
	}
	if(window.location.hostname.match("livedigital\.com"))
	{
			box = document.getElementsByTagName("input");
			emb_link = '';
			for(i=0; i<box.length; i++){
				if(box[i].name == "code"){
					boxArr = box[i].value.split("\"");
					for(z=0; z<boxArr.length; z++){
						if(boxArr[z].match("src=")){
							emb_link += boxArr[z+1] + '?';
							}
						if(boxArr[z].match("flashvars=")){
							emb_link += boxArr[z+1];
							}
						}
					print_link(emb_link);
					}
				}
	}
	if(window.location.hostname.match("(www\.|)livevideo\.com") && window.location.href.match("/video/"))
	{
			box = document.getElementById("ctl00_ContentPlaceHolder1_embedCode");
			emb_link = box.value.substring((box.value.indexOf("http:\/\/www\.livevideo\.com\/flvplayer")), box.value.indexOf("\" type="));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)scenemaker\.net") && window.location.href.match("/player/"))
	{
			temp = window.location.href.substring(window.location.href.indexOf("?c="));
			emb_link = 'http://www.scenemaker.net/player/embeddedPlayer/eplayer.swf' + temp;
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)sharkle\.com") && window.location.href.match("/video/"))
	{
			box = document.getElementById("embedText");
			emb_link = box.value.substring((box.value.indexOf("http:\/\/www\.sharkle\.com\/externalPlayer")), box.value.indexOf(" wmode="));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)thevideosense\.com") && window.location.href.match("/video/"))
	{
			box = document.getElementById("code");
			emb_link = box.value.substring((box.value.indexOf("http:\/\/www\.")), box.value.indexOf("\"><\/param"));
			print_link(emb_link);
	}
	if(window.location.hostname.match("(www\.|)vidilife\.com") && window.location.href.match("/video"))
	{
			
			box = document.getElementsByTagName("input");
			for(i=0; i<box.length; i++){
				if(box[i].name == "url1"){
					emb_link = box[i].value.substring(box[i].value.indexOf("http:\/\/www\.vidiLife\.com\/flash"), box[i].value.indexOf("\' quality="));
					print_link(emb_link);
					}
				}
	}
	if(window.location.hostname.match("(www\.|)zooppa\.com") && window.location.href.match("/videos/"))
	{
			box = document.getElementById("embed_code");
			emb_link = box.value.substring((box.value.indexOf("http:\/\/www\.")), box.value.indexOf("\" type"));
			print_link(emb_link);
	}

	
	
	
	function print_link(code){
		emb_link = '<center><font color="#0000FF" style="font-size:16px">Embedded player: </font><a href="'+code+'" style="font-weight:bold; font-size:16px; color:#FF0000">'+code+'</a><span id="copytext" style="display:none;">'+code+'</SPAN><textarea id="holdtext" style="display:none;"></textarea><br /><img alt="Grab Link to Clipboard!" onClick="holdtext.innerText = copytext.innerText;Copied = holdtext.createTextRange();Copied.execCommand(\'Copy\');" src="'+grabImage+'" style="cursor: pointer;"/></center><br />';
		var span = document.createElement("span");
		span.innerHTML = emb_link;
		document.body.appendChild(span);
	}
})();