// ==UserScript==
// @name          Another Videoembed
// @description	 Automatically adds embedded videos after links to video pages..
// @include       *
// @copyright     2009, Firtina Ozbalikci
// @license         GPL 3 or later
// @version        5.09


// ==/UserScript==

//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2008  Firtina Ozbalikci
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// If you distribute a modified version of Videoembed, you are encouraged to use
// my name in the credits, and a copy of the license above.
//---------------------------------------------------------------------------------------------------

var defaultSites = [
	{
		n:'Youtube',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)youtube\.com\/.*v=([a-zA-Z0-9_-]+).*',
		args:[
       			 ['match','v=([a-zA-Z0-9_-]+)',1],
			],
		width:425,
		height:344,
		embed:'http://www.youtube.com/v/{0}&hl=en&fs=1', //&ap=%2526fmt=18
	},
	{
		n:'Glumbert',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)glumbert\.com\/media\/([a-zA-Z0-9]+)',
		args:[
       			 ['match','/media/([a-zA-Z0-9]+)',1],
			],
		width:448,
		height:336,
		embed:'http://www.glumbert.com/embed/{0}'
	},
	{
		n:'Metacafe',
		l:'^http:\/\/([a-zA-Z0-9]+\.|)metacafe\.com\/watch\/([a-zA-Z0-9-]+)',
		args:[
			['match','/watch/([a-zA-Z0-9-]+)',1],
			],
		width:400,
		height:345,
		embed:'http://www.metacafe.com/fplayer/{0}/.swf',
	},
	{
		n:'Google',
		l:'^http://video\.google\.(.+).+docid=([a-zA-Z0-9-]+).',
		args:[
			['match','docid=([a-zA-Z0-9-]+)',1],
			],
		width:400,
		height:326,
		embed:'http://video.google.com/googleplayer.swf?docid={0}&fs=true',
	},
	{
		n:'Anime Episodes',
		l:'^http://([a-zA-Z0-9]+\.|)animeepisodes\.net/video/([a-zA-Z0-9-]+)',
		args:[
			['match','/video/([a-zA-Z0-9-]+)',1],
			['match','http://([a-zA-Z0-9]+\.|).animeepisodes\.net/video',1],
			],
		width:428,
		height:352,
		embed:'http://{1}.animeepisodes.net/vidiac.swf',
		attr:[
			['FlashVars','video={0}'],
			],
	},
	{
		n:'Myvideo',
		l:'^http://([a-zA-Z0-9]+\.|)myvideo.(.+)/watch/([a-zA-Z0-9-]+)',
		args:[
			['match','/watch/([a-zA-Z0-9-]+)',1],
			],
		width:470,
		height:406,
		embed:'http://www.myvideo.at/movie/{0}',
	},
	{
		n:'Tinypic',
		l:'^http://video\.tinypic\.com/.*v=([a-zA-Z0-9]+)',
		args:[
			['match','v=([a-zA-Z0-9]+)',1],
			],
		width:440,
		height:420,
		embed:'http://v1.tinypic.com/player.swf?file={0}&s=1',
	},
	{
		n:'Yahoo',
		l:'^http://video\.yahoo\.com/watch/([0-9]+)/([0-9]+)',
		args:[
			['match','/watch/([0-9]+)/',1],
			['match','/watch/([0-9]+)/([0-9]+)',2],
			],
		width:512,
		height:322,
		attr:[
			['FlashVars','id={1}&vid={0}'],
			],
		embed:'http://d.yimg.com/static.video.yahoo.com/yep/YV_YEP.swf?ver=2.2.30',
	},
	{
		n:'Spike',
		l:'^http://([a-zA-Z0-9]+\.|)(ifilm|spike)\.com/video/.+/([0-9]+)',
		args:[
			['match','video/.+/([0-9]+)',1],
			],
		width:448,
		height:365,
		attr:[
			['flashvars','flvbaseclip={0}'],
			],
		embed:'http://www.spike.com/efp',
	},
	{
		n:'Youtube Playlist',
		l:'^http://([a-zA-Z0-9]+\.|)youtube\.com/view_play_list.*p=([a-zA-Z0-9_-]+)',
		args:[
			['match','p=([a-zA-Z0-9_-]+)',1],
			],
		width:480,
		height:385,
		embed:'http://www.youtube.com/p/{0}',
	},
	{
		n:'Myspace',
		l:'^http://vids\.myspace\.com/.*[vV]ideo[iI][dD]=([0-9]+)',
		args:[
			['match','[vV]ideo[iI][dD]=([0-9]+)',1],
			],
		width:425,
		height:360,
		embed:'http://mediaservices.myspace.com/services/media/embed.aspx/m={0},t=1,mt=video,searchID=,primarycolor=,secondarycolor=',
	},
	{
		n:'Liveleak',
		l:'^http://([a-zA-Z0-9]+\.|)liveleak\.com/view.*i=([a-zA-Z0-9_]+)',
		args:[
			['match','i=([a-zA-Z0-9_]+)',1],
			],
		width:450,
		height:370,
		embed:'http://www.liveleak.com/e/{0}',
	},
	{
		n:'Revver',
		l:'^http://([a-zA-Z0-9]+\.|)revver\.com/(watch|video)/([0-9]+)',
		args:[
			['match','(watch|video)/([0-9]+)*(/|)',2],
			],
		width:480,
		height:392,
		embed:'http://flash.revver.com/player/1.0/player.swf',
		attr:[
			['flashvars','mediaId={0}'],
			],
	},
	{
		n:'Vimeo',
		l:'^http://([a-zA-Z0-9]+\.|)vimeo\.com.*[/=:]([0-9]+)',
		args:[
			['match','vimeo\.com.*[/=:]([0-9]+)',1],
			],
		width:400,
		height:300,
		attr:[
			['flashvars','clip_id={0}&server=vimeo.com&autoplay=0&fullscreen=1&md5=0&show_portrait=0&show_title=0&show_byline=0&force_embed=0&multimoog=&color=00ADEF'],
			],
		embed:'http://vimeo.com/moogaloop_local.swf?ver=19465',
	},
	{
		n:'Veoh',
		l:'^http://([a-zA-Z0-9]+\.|)veoh\..+videos/[a-zA-Z0-9]+',
		args:[
			['match','videos/([a-zA-Z0-9]+)',1],
			],
		width:410,
		height:341,
		embed:'http://www.veoh.com/videodetails.swf?permalinkId={0}&id=1&player=videodetailsembedded&videoAutoPlay=0',
		//embed:'http://www.veoh.com/veohplayer.swf?permalinkId={0}&id=anonymous&player=videodetailsembedded&videoAutoPlay=0',
	},
	{
		n:'Guba',
		l:'^http://([a-zA-Z0-9]+\.|)guba\..+/watch/([a-zA-Z0-9]+)',
		args:[
			['match','watch/([a-zA-Z0-9]+)',1],
			],
		width:375,
		height:360,
		embed:'http://www.guba.com/f/root.swf?bid={0}&isEmbeddedPlayer=true',
	},
	{
		n:'Gamevideos',
		l:'^http://gamevideos\.1up\.com/video/id/([0-9]+)',
		args:[
			['match','id/([a-zA-Z0-9]+)',1],
			],
		width:500,
		height:319,
		embed:'http://gamevideos.1up.com/swf/gamevideos11.swf?embedded=1&amp;fullscreen=1&amp;autoplay=0&amp;src=http://gamevideos.1up.com/video/videoListXML?id={0}&amp;adPlay=true',
	},
	{
		n:'Gametrailers',
		l:'^http://([a-zA-Z0-9]+\.|)gametrailers\.com\/player\/([0-9]+)',
		args:[
			['match','\/([0-9]+)',1],
			],
		width:480,
		height:392,
		embed:'http://www.gametrailers.com/remote_wrap.php?mid={0}',
	},
	{
		n:'Pikniktube',
		l:'^http://([a-zA-Z0-9]+\.|)pikniktube\.com/video.+Video=([a-zA-Z0-9]+)',
		args:[
			['match','Video=([a-zA-Z0-9]+)',1],
			],
		width:340,
		height:320,
		embed:'http://www.pikniktube.com/player/videoplayer2.swf',
		attr:[
			['flashvars','linktarget=_blank&embedded=1&xmlsrc=http://www.pikniktube.com/getxmle.asp?q={0}&a=1&c=0'],
			],
	},
	{
		n:'Tudou single',
		l:'^http://([a-zA-Z0-9]+\.|)tudou\.com/programs/view/([a-zA-Z0-9]+)',
		args:[
			['match','view/([a-zA-Z0-9]+)',1],
			],
		width:488,
		height:423,
		embed:'http://www.tudou.com/v/{0}',
	},
	{
		n:'Tudou playlist',
		l:'^http://([a-zA-Z0-9]+\.|)tudou\.com/playlist/id/([a-zA-Z0-9]+)',
		args:[
			['match','id/([a-zA-Z0-9]+)',1],
			],
		width:488,
		height:423,
		embed:'http://www.tudou.com/player/playlist.swf?lid={0}',
	},
	{
		n:'Collegehumor',
		l:'^http://([a-zA-Z0-9]+\.|)collegehumor\.com.+video[:=]([0-9]+)',
		args:[
			['match','video[:=]([0-9]+)',1],
			],
		width:480,
		height:360,
		embed:'http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id={0}&fullscreen=1',
	},
	{
		n:'5min',
		l:'^http://([a-zA-Z0-9]+\.|)5min\.com/[vV]ideo/[a-zA-Z0-9-]+-([0-9]+)',
		args:[
			['match','[a-zA-Z0-9-]+-([0-9]+)',1],
			],
		width:480,
		height:401,
		embed:'http://www.5min.com/Embeded/{0}/',
	},
	{
		n:'Ustream',
		l:'^http://([a-zA-Z0-9]+\.|)ustream\.tv.+recorded/([0-9]+)',
		args:[
			['match','recorded/([0-9]+)',1],
			],
		width:400,
		height:320,
		embed:'http://www.ustream.tv/flash/video/{0}',
		attr:[
			['flashvars','viewcount=false&autoplay=false&brand=embed'],
			],
	},
	{
		n:'Fliggo',
		l:'^http://([a-zA-Z0-9]+\.|)fliggo\.com/video/[a-zA-Z0-9]+',
		args:[
			['match','video/([a-zA-Z0-9]+)',1],
			],
		width:425,
		height:355,
		embed:'http://www.fliggo.com/embed/{0}',
	},
	{
		n:'Overlay',
		l:'^http://([a-zA-Z0-9]+\.|)overlay\.tv/overlay/[0-9]+',
		args:[
			['match','overlay/([0-9]+)',1],
			],
		width:504,
		height:475,
		embed:'http://static.overlay.tv/images/media/authoringtool.swf',
		attr:[
			['flashvars','overlay_id={0}&host=http://www.overlay.tv/&name=embed_config&config_gen=http://static.overlay.tv/player_config/generate'],
			],
	},
	{
		n:'Webshots',
		l:'^http://([a-zA-Z0-9]+\.|)webshots\.(com|net)/video/[0-9]+',
		args:[
			['match','video/([0-9]+)',1],
			],
		width:425,
		height:350,
		embed:'http://p.webshots.com/flash/smallplayer.swf?videoFile=http://videoserve.webshots.com/video/9659/{0}_v_0.flv&audio=on&displayImagePreview=http://videothumb20.webshots.com/thumb/9659/{0}still_002_0.jpg&videoPageUrl=http://travel.webshots.com/video/{0}&autoPlay=false&shareLink=http://cards.webshots.com/ecard/personalize?photoId={0}&source=v',
	},
	{
		n:'Clipshack',
		l:'^http://([a-zA-Z0-9]+\.|)clipshack\.com/.*key=([a-zA-Z0-9]+)',
		args:[
			['match','key=([a-zA-Z0-9]+)',1],
			],
		width:430,
		height:370,
		embed:'http://www.clipshack.com/player.swf?key={0}',
	},
	{
		n:'Cnet',
		l:'^http://cnettv\.cnet\.com/[0-9_-]+-([0-9]+)',
		args:[
			['match','[0-9_-]+-([0-9]+)',1],
			],
		width:335,
		height:360,
		embed:'http://www.cnet.com/av/video/flv/newPlayers/universal.swf',
		attr:[
			['flashvars','playerType=embedded&value={0}'],
			],
	},
	{
		n:'Crackle',
		l:'^http://([a-zA-Z0-9]+\.|)crackle\.com/c.+/([0-9]+)',
		args:[
			['match','c.+/([0-9]+)',1],
			['match','crackle\.com/c(.+)/[0-9]+',1],
			],
		width:400,
		height:328,
		embed:'http://crackle.com/p{1}.swf',
		attr:[
			['flashvars','id={0}'],
			],
	},
	{
		n:'Current',
		l:'^http://([a-zA-Z0-9]+\.|)current\.com/items/[0-9]+',
		args:[
			['match','items/([0-9]+)',1],
			],
		width:400,
		height:340,
		embed:'http://current.com/e/{0}/en_UK',
	},
	{
		n:'Expertvillage',
		l:'^http://([a-zA-Z0-9]+\.|)expertvillage\.com/video/([0-9a-zA-Z_-]+)\.htm',
		args:[
			['match','video/([0-9a-zA-Z_-]+)\.htm',1],
			],
		width:491,
		height:424,
		embed:'http://cdn-www.expertvillage.com/player.swf?flv={0}',
	},
	{
		n:'Funnyordie',
		l:'^http://([a-zA-Z0-9]+\.|)funnyordie\.com/videos/[a-zA-Z0-9]+',
		args:[
			['match','videos/([a-zA-Z0-9]+)',1],
			],
		width:464,
		height:388,
		embed:'http://www2.funnyordie.com/public/flash/fodplayer.swf?5320a921',
		attr:[
			['flashvars','key={0}'],
			],
		
	},
	{
		n:'Godtube',
		l:'^http://([a-zA-Z0-9]+\.|)godtube\.com/.*viewkey=([a-zA-Z0-9]+)',
		args:[
			['match','viewkey=([a-zA-Z0-9]+)',1],
			],
		width:330,
		height:270,
		embed:'http://godtube.com/flvplayer.swf',
		attr:[
			['flashvars','viewkey={0}'],
			],
	},
	{
		n:'Justin',
		l:'^http://([a-zA-Z0-9]+\.|)justin\.tv.*/([a-zA-Z0-9]+)',
		args:[
			['match','http://([a-zA-Z0-9]+\.|)justin\.tv.*/([a-zA-Z0-9]+)',2],
			],
		width:320,
		height:263,
		embed:'http://www.justin.tv/widgets/jtv_player.swf?channel={0}',
	},
	{
		n:'Livevideo',
		l:'^http://([a-zA-Z0-9]+\.|)livevideo\.com/liveshow/[a-zA-Z0-9]+',
		args:[
			['match','liveshow/([a-zA-Z0-9]+)',1],
			],
		width:423,
		height:270,
		embed:'http://www.livevideo.com/livetv/embed/{0}',
	},
	{
		n:'Putfile',
		l:'^http://([a-zA-Z0-9]+\.|)putfile\.com.*/([a-zA-Z0-9-]+)',
		args:[
			['match','http://([a-zA-Z0-9]+\.|)putfile\.com.*/([a-zA-Z0-9-]+)',2],
			],
		width:420,
		height:349,
		embed:'http://feat.putfile.com/flow/putfile.swf?videoFile={0}',
	},
	{
		n:'12Seconds',
		l:'^http://([a-zA-Z0-9]+\.|)12seconds\.tv/channel/.*/([0-9]+)',
		args:[
			['match','channel/.*/([0-9]+)',1],
			],
		width:430,
		height:360,
		embed:'http://embed.12seconds.tv/players/remotePlayer.swf',
		attr:[
			['flashvars','vid={0}'],
			],
	},
	{
		n:'Selfcasttv',
		l:'^http://([a-zA-Z0-9]+\.|)selfcasttv\.com/Selfcast/playVideo.*ref=[a-zA-Z0-9/]+',
		args:[
			['match','ref=([a-zA-Z0-9/]+)',1],
			],
		width:340,
		height:283,
		embed:'http://www.selfcasttv.com/Selfcast/selfcast.swf?video_1=/{0}',
	},
	{
		n:'Sevenload',
		l:'^http://([a-zA-Z0-9]+\.|)sevenload\.com/videos/[a-zA-Z0-9]+',
		args:[
			['match','videos/([a-zA-Z0-9]+)',1],
			],
		width:500,
		height:314,
		embed:'http://static.sevenload.com/swf/player/player.swf',
		attr:[
			['flashvars','configPath=http%3A%2F%2Fflash.sevenload.com%2Fplayer%3FportalId%3Den%26autoplay%3D0%26itemId%3D{0}&amp;locale=en_US&amp;autoplay=0&amp;environment='],
			],
	},
	{
		n:'Spikedhumor',
		l:'^http://([a-zA-Z0-9]+\.|)spikedhumor\.com/articles/[0-9]+',
		args:[
			['match','articles/([0-9]+)',1],
			],
		width:385,
		height:285,
		embed:'http://www.spikedhumor.com/player/vcplayer.swf?file=http://www.spikedhumor.com/videocodes/{0}/data.xml&auto_play=false',
	},
	{
		n:'Jumpcut',
		l:'^http://([a-zA-Z0-9]+\.|)jumpcut\.com/.*id=([a-zA-Z0-9]+)',
		args:[
			['match','id=([a-zA-Z0-9]+)',1],
			],
		width:408,
		height:324,
		embed:'http://www.jumpcut.com/media/flash/jump.swf?id={0}&asset_type=movie&asset_id={0}&eb=1',
	},
	{
		n:'Gamecorner',
		l:'^http://([a-zA-Z0-9]+\.|)gamecorner\.pl/gamecorner/[0-9]+,[0-9]+,[0-9]+',
		args:[
			['match','gamecorner/[0-9]+,([0-9]+),[0-9]+',1],
			['match','gamecorner/[0-9]+,[0-9]+,([0-9]+)',1],
			],
		width:425,
		height:350,
		embed:'http://bi.gazeta.pl/im/loader.swf',
		attr:[
			['flashvars','m=http://serwisy.gazeta.pl/getDaneWideo?xx={1}%26xxd={0}&e=1&f=http://bi.gazeta.pl/im/'],
			],
	},
	
/*
	{
		n:'',
		l:'^',
		args:[
			['match','',1],
			],
		width:,
		height:,
		embed:'',
	},
*/
		
]

//var sss = '';for(var ii=0;ii<defaultSites.length;ii++){sss += defaultSites[ii].n + '<br>';}document.write(defaultSites.length);

var gfx = {
	minus : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADKSURBVHjahFG7EcIwDI1l/WzcULFCCtahpuGo4ZiAgShZgT04VghtjBKHBI4DdLbOlp6enmW32p6qf4a29%2BtFuXgk3xsRhRBUowV3xwuWXOe7HIswABAzIYpGDTowlWorFVUmcc6BZ1USkaldIUgpWdQBIwIiOYA2v2hC9HXdVFXzKbm5L82DbeP/9q5CVoTz9TafxUFm%2B2yTs608gIIys4kWixVAn3Nvc2JJcRZHmX2xIfLI2jPFmPNYNp0MYTMbQJvD%2Bfe3PAQYAAu1L6fh/GDIAAAAAElFTkSuQmCC',
	plus : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAADCSURBVHjalJFdCsIwDIDTOkEfxGMIehtBvIF4Em/gg1cQ9CDCXoSdY6sbdbVJZ9fpuuFgM5CmbX76pWGb3aWAPyQol/Np3RtY2LLb/RV4l5Ox0Gn7rrJ8KIoxxiP1CRICIfmEXGmYTu6daF9JxMIjIVH/K9hA0pogFkvgvOpsPoucFekKyBYzVrGJpJTyGMDqvZQSyDZLiO05yGcO%2BoU/GHEiugf3EKk76E%2BlWzhxNstkHTgOAp9wOEYl4GjIF78FGABBZFEyfagcmwAAAABJRU5ErkJggg==',
	bulb : 
"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAPCAYAAADUFP50AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAoFJREFUeNpsUltLVFEU/vY5e67OTVMnqSxBKHLK1BBS6gdED+FT89ZLPfVcoNCciaIbBPVeD12g6KWwwgtCFJJBhRReEhlpsshRZ5wZz5mZc/bMbs3IhFmLvdjszfet9a0Lk1KiaunEbKSYWdBUsQJZWIM00xD5HAoCkL6QtqsrHK1iWZlo5rMR/eeE5nYUoToDYA5y7gZjDKW8AZGKQZ9/iUxWR23PgOYPtkaZsAqRdGxQ89YFofp2U6wSHZ1SmJAls/JmNj8FacD65COszAwhePKBxhJzQ9LnErAHOwhogCkuQPFs3GTlP2l+R8mKg3uOYPnVRayaTigsPQ3V00wIg4RzcmclS4VADinAVB/9cYj1Ufg6T0NZfAfOCkkoDi9KYolINuLkIItFugWktKgJJFkxUCzEIK152P09BMmBF/ImRDYBHvDATDwmiW7kPsxRAspMxGJmCTXHuqlJM7D5O2AmlygQh2J5QzAW3pCc7ZTFQubFEzgONcAR8sC+3wZ3716k7l9FqbAKvq0PyYmHsOrboezsCt9Ir/yCPjsMR9MZKrHcFJqtSvXxcncllBov3Hv6kZ2cRHJqBM3H+zWuqvyCv/OskRy/pkEy2LwHNiZcdFF9zkoQXteNzKd5/Bi9hZoT17VAsCXKqpuTXJyOLL+9o/lyC6htscG+T1RmWYoF8H14HCl7C4J9N7UdbUejfzanal8/T0TGnt3VfPWN0PXXWNctJFJt+Db1EZdv39Na2w7/vXKbLdJ/TraGekmqAiOnI2vk8H7sOZ4OjrDNOI4tJmmETcFGtB9sRzwex5epafB/UP8hhsOntEj0iramCwhhwWUHogPnL23F/RZgALZtJ5mXblnLAAAAAElFTkSuQmCC",
	close : "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%20%00%00%00%20%08%06%00%00%00szz%F4%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%0AOiCCPPhotoshop%20ICC%20profile%00%00x%DA%9DSgTS%E9%16%3D%F7%DE%F4BK%88%80%94KoR%15%08%20RB%8B%80%14%91%26*!%09%10J%88!%A1%D9%15Q%C1%11EE%04%1B%C8%A0%88%03%8E%8E%80%8C%15Q%2C%0C%8A%0A%D8%07%E4!%A2%8E%83%A3%88%8A%CA%FB%E1%7B%A3k%D6%BC%F7%E6%CD%FE%B5%D7%3E%E7%AC%F3%9D%B3%CF%07%C0%08%0C%96H3Q5%80%0C%A9B%1E%11%E0%83%C7%C4%C6%E1%E4.%40%81%0A%24p%00%10%08%B3d!s%FD%23%01%00%F8~%3C%3C%2B%22%C0%07%BE%00%01x%D3%0B%08%00%C0M%9B%C00%1C%87%FF%0F%EAB%99%5C%01%80%84%01%C0t%918K%08%80%14%00%40z%8EB%A6%00%40F%01%80%9D%98%26S%00%A0%04%00%60%CBcb%E3%00P-%00%60'%7F%E6%D3%00%80%9D%F8%99%7B%01%00%5B%94!%15%01%A0%91%00%20%13e%88D%00h%3B%00%AC%CFV%8AE%00X0%00%14fK%C49%00%D8-%000IWfH%00%B0%B7%00%C0%CE%10%0B%B2%00%08%0C%000Q%88%85)%00%04%7B%00%60%C8%23%23x%00%84%99%00%14F%F2W%3C%F1%2B%AE%10%E7*%00%00x%99%B2%3C%B9%249E%81%5B%08-q%07WW.%1E(%CEI%17%2B%146a%02a%9A%40.%C2y%99%192%814%0F%E0%F3%CC%00%00%A0%91%15%11%E0%83%F3%FDx%CE%0E%AE%CE%CE6%8E%B6%0E_-%EA%BF%06%FF%22bb%E3%FE%E5%CF%ABp%40%00%00%E1t~%D1%FE%2C%2F%B3%1A%80%3B%06%80m%FE%A2%25%EE%04h%5E%0B%A0u%F7%8Bf%B2%0F%40%B5%00%A0%E9%DAW%F3p%F8~%3C%3CE%A1%90%B9%D9%D9%E5%E4%E4%D8J%C4B%5Ba%CAW%7D%FEg%C2_%C0W%FDl%F9~%3C%FC%F7%F5%E0%BE%E2%24%812%5D%81G%04%F8%E0%C2%CC%F4L%A5%1C%CF%92%09%84b%DC%E6%8FG%FC%B7%0B%FF%FC%1D%D3%22%C4Ib%B9X*%14%E3Q%12q%8ED%9A%8C%F32%A5%22%89B%92)%C5%25%D2%FFd%E2%DF%2C%FB%03%3E%DF5%00%B0j%3E%01%7B%91-%A8%5Dc%03%F6K'%10Xt%C0%E2%F7%00%00%F2%BBo%C1%D4(%08%03%80h%83%E1%CFw%FF%EF%3F%FDG%A0%25%00%80fI%92q%00%00%5ED%24.T%CA%B3%3F%C7%08%00%00D%A0%81*%B0A%1B%F4%C1%18%2C%C0%06%1C%C1%05%DC%C1%0B%FC%606%84B%24%C4%C2B%10B%0Ad%80%1Cr%60)%AC%82B(%86%CD%B0%1D*%60%2F%D4%40%1D4%C0Qh%86%93p%0E.%C2U%B8%0E%3Dp%0F%FAa%08%9E%C1(%BC%81%09%04A%C8%08%13a!%DA%88%01b%8AX%23%8E%08%17%99%85%F8!%C1H%04%12%8B%24%20%C9%88%14Q%22K%915H1R%8AT%20UH%1D%F2%3Dr%029%87%5CF%BA%91%3B%C8%002%82%FC%86%BCG1%94%81%B2Q%3D%D4%0C%B5C%B9%A87%1A%84F%A2%0B%D0dt1%9A%8F%16%A0%9B%D0r%B4%1A%3D%8C6%A1%E7%D0%ABh%0F%DA%8F%3EC%C70%C0%E8%18%073%C4l0.%C6%C3B%B18%2C%09%93c%CB%B1%22%AC%0C%AB%C6%1A%B0V%AC%03%BB%89%F5c%CF%B1w%04%12%81E%C0%096%04wB%20a%1EAHXLXN%D8H%A8%20%1C%244%11%DA%097%09%03%84Q%C2'%22%93%A8K%B4%26%BA%11%F9%C4%18b21%87XH%2C%23%D6%12%8F%13%2F%10%7B%88C%C47%24%12%89C2'%B9%90%02I%B1%A4T%D2%12%D2F%D2nR%23%E9%2C%A9%9B4H%1A%23%93%C9%DAdk%B2%079%94%2C%20%2B%C8%85%E4%9D%E4%C3%E43%E4%1B%E4!%F2%5B%0A%9Db%40q%A4%F8S%E2(R%CAjJ%19%E5%10%E54%E5%06e%982AU%A3%9AR%DD%A8%A1T%115%8FZB%AD%A1%B6R%AFQ%87%A8%134u%9A9%CD%83%16IK%A5%AD%A2%95%D3%1Ah%17h%F7i%AF%E8t%BA%11%DD%95%1EN%97%D0W%D2%CB%E9G%E8%97%E8%03%F4w%0C%0D%86%15%83%C7%88g(%19%9B%18%07%18g%19w%18%AF%98L%A6%19%D3%8B%19%C7T071%EB%98%E7%99%0F%99oUX*%B6*%7C%15%91%CA%0A%95J%95%26%95%1B*%2FT%A9%AA%A6%AA%DE%AA%0BU%F3U%CBT%8F%A9%5ES%7D%AEFU3S%E3%A9%09%D4%96%ABU%AA%9DP%EBS%1BSg%A9%3B%A8%87%AAg%A8oT%3F%A4~Y%FD%89%06Y%C3L%C3OC%A4Q%A0%B1_%E3%BC%C6%20%0Bc%19%B3x%2C!k%0D%AB%86u%815%C4%26%B1%CD%D9%7Cv*%BB%98%FD%1D%BB%8B%3D%AA%A9%A19C3J3W%B3R%F3%94f%3F%07%E3%98q%F8%9CtN%09%E7(%A7%97%F3~%8A%DE%14%EF)%E2)%1B%A64L%B91e%5Ck%AA%96%97%96X%ABH%ABQ%ABG%EB%BD6%AE%ED%A7%9D%A6%BDE%BBY%FB%81%0EA%C7J'%5C'Gg%8F%CE%05%9D%E7S%D9S%DD%A7%0A%A7%16M%3D%3A%F5%AE.%AAk%A5%1B%A1%BBDw%BFn%A7%EE%98%9E%BE%5E%80%9ELo%A7%DEy%BD%E7%FA%1C%7D%2F%FDT%FDm%FA%A7%F5G%0CX%06%B3%0C%24%06%DB%0C%CE%18%3C%C55qo%3C%1D%2F%C7%DB%F1QC%5D%C3%40C%A5a%95a%97%E1%84%91%B9%D1%3C%A3%D5F%8DF%0F%8Ci%C6%5C%E3%24%E3m%C6m%C6%A3%26%06%26!%26KM%EAM%EE%9ARM%B9%A6)%A6%3BL%3BL%C7%CD%CC%CD%A2%CD%D6%995%9B%3D1%D72%E7%9B%E7%9B%D7%9B%DF%B7%60ZxZ%2C%B6%A8%B6%B8eI%B2%E4Z%A6Y%EE%B6%BCn%85Z9Y%A5XUZ%5D%B3F%AD%9D%AD%25%D6%BB%AD%BB%A7%11%A7%B9N%93N%AB%9E%D6g%C3%B0%F1%B6%C9%B6%A9%B7%19%B0%E5%D8%06%DB%AE%B6m%B6%7Dagb%17g%B7%C5%AE%C3%EE%93%BD%93%7D%BA%7D%8D%FD%3D%07%0D%87%D9%0E%AB%1DZ%1D~s%B4r%14%3AV%3A%DE%9A%CE%9C%EE%3F%7D%C5%F4%96%E9%2FgX%CF%10%CF%D83%E3%B6%13%CB)%C4i%9DS%9B%D3Gg%17g%B9s%83%F3%88%8B%89K%82%CB.%97%3E.%9B%1B%C6%DD%C8%BD%E4Jt%F5q%5D%E1z%D2%F5%9D%9B%B3%9B%C2%ED%A8%DB%AF%EE6%EEi%EE%87%DC%9F%CC4%9F)%9EY3s%D0%C3%C8C%E0Q%E5%D1%3F%0B%9F%950k%DF%AC~OCO%81g%B5%E7%23%2Fc%2F%91W%AD%D7%B0%B7%A5w%AA%F7a%EF%17%3E%F6%3Er%9F%E3%3E%E3%3C7%DE2%DEY_%CC7%C0%B7%C8%B7%CBO%C3o%9E_%85%DFC%7F%23%FFd%FFz%FF%D1%00%A7%80%25%01g%03%89%81A%81%5B%02%FB%F8z%7C!%BF%8E%3F%3A%DBe%F6%B2%D9%EDA%8C%A0%B9A%15A%8F%82%AD%82%E5%C1%AD!h%C8%EC%90%AD!%F7%E7%98%CE%91%CEi%0E%85P~%E8%D6%D0%07a%E6a%8B%C3~%0C'%85%87%85W%86%3F%8Ep%88X%1A%D11%975w%D1%DCCs%DFD%FAD%96D%DE%9Bg1O9%AF-J5*%3E%AA.j%3C%DA7%BA4%BA%3F%C6.fY%CC%D5X%9DXIlK%1C9.*%AE6nl%BE%DF%FC%ED%F3%87%E2%9D%E2%0B%E3%7B%17%98%2F%C8%5Dpy%A1%CE%C2%F4%85%A7%16%A9.%12%2C%3A%96%40L%88N8%94%F0A%10*%A8%16%8C%25%F2%13w%25%8E%0Ay%C2%1D%C2g%22%2F%D16%D1%88%D8C%5C*%1EN%F2H*Mz%92%EC%91%BC5y%24%C53%A5%2C%E5%B9%84'%A9%90%BCL%0DL%DD%9B%3A%9E%16%9Av%20m2%3D%3A%BD1%83%92%91%90qB%AA!M%93%B6g%EAg%E6fv%CB%ACe%85%B2%FE%C5n%8B%B7%2F%1E%95%07%C9k%B3%90%AC%05Y-%0A%B6B%A6%E8TZ(%D7*%07%B2geWf%BF%CD%89%CA9%96%AB%9E%2B%CD%ED%CC%B3%CA%DB%907%9C%EF%9F%FF%ED%12%C2%12%E1%92%B6%A5%86KW-%1DX%E6%BD%ACj9%B2%3Cqy%DB%0A%E3%15%05%2B%86V%06%AC%3C%B8%8A%B6*m%D5O%AB%EDW%97%AE~%BD%26zMk%81%5E%C1%CA%82%C1%B5%01k%EB%0BU%0A%E5%85%7D%EB%DC%D7%ED%5DOX%2FY%DF%B5a%FA%86%9D%1B%3E%15%89%8A%AE%14%DB%17%97%15%7F%D8(%DCx%E5%1B%87o%CA%BF%99%DC%94%B4%A9%AB%C4%B9d%CFf%D2f%E9%E6%DE-%9E%5B%0E%96%AA%97%E6%97%0En%0D%D9%DA%B4%0D%DFV%B4%ED%F5%F6E%DB%2F%97%CD(%DB%BB%83%B6C%B9%A3%BF%3C%B8%BCe%A7%C9%CE%CD%3B%3FT%A4T%F4T%FAT6%EE%D2%DD%B5a%D7%F8n%D1%EE%1B%7B%BC%F64%EC%D5%DB%5B%BC%F7%FD%3E%C9%BE%DBU%01UM%D5f%D5e%FBI%FB%B3%F7%3F%AE%89%AA%E9%F8%96%FBm%5D%ADNmq%ED%C7%03%D2%03%FD%07%23%0E%B6%D7%B9%D4%D5%1D%D2%3DTR%8F%D6%2B%EBG%0E%C7%1F%BE%FE%9D%EFw-%0D6%0DU%8D%9C%C6%E2%23pDy%E4%E9%F7%09%DF%F7%1E%0D%3A%DAv%8C%7B%AC%E1%07%D3%1Fv%1Dg%1D%2FjB%9A%F2%9AF%9BS%9A%FB%5Bb%5B%BAO%CC%3E%D1%D6%EA%DEz%FCG%DB%1F%0F%9C4%3CYyJ%F3T%C9i%DA%E9%82%D3%93g%F2%CF%8C%9D%95%9D%7D~.%F9%DC%60%DB%A2%B6%7B%E7c%CE%DFj%0Fo%EF%BA%10t%E1%D2E%FF%8B%E7%3B%BC%3B%CE%5C%F2%B8t%F2%B2%DB%E5%13W%B8W%9A%AF%3A_m%EAt%EA%3C%FE%93%D3O%C7%BB%9C%BB%9A%AE%B9%5Ck%B9%EEz%BD%B5%7Bf%F7%E9%1B%9E7%CE%DD%F4%BDy%F1%16%FF%D6%D5%9E9%3D%DD%BD%F3zo%F7%C5%F7%F5%DF%16%DD~r'%FD%CE%CB%BB%D9w'%EE%AD%BCO%BC_%F4%40%EDA%D9C%DD%87%D5%3F%5B%FE%DC%D8%EF%DC%7Fj%C0w%A0%F3%D1%DCG%F7%06%85%83%CF%FE%91%F5%8F%0FC%05%8F%99%8F%CB%86%0D%86%EB%9E8%3E99%E2%3Fr%FD%E9%FC%A7C%CFd%CF%26%9E%17%FE%A2%FE%CB%AE%17%16%2F~%F8%D5%EB%D7%CE%D1%98%D1%A1%97%F2%97%93%BFm%7C%A5%FD%EA%C0%EB%19%AF%DB%C6%C2%C6%1E%BE%C9x31%5E%F4V%FB%ED%C1w%DCw%1D%EF%A3%DF%0FO%E4%7C%20%7F(%FFh%F9%B1%F5S%D0%A7%FB%93%19%93%93%FF%04%03%98%F3%FCc3-%DB%00%00%00%20cHRM%00%00z%25%00%00%80%83%00%00%F9%FF%00%00%80%E9%00%00u0%00%00%EA%60%00%00%3A%98%00%00%17o%92_%C5F%00%00%04QIDATx%DA%EC%D7%5B%8C%DDU%15%06%F0%DF%3Agz%E60%B5-sy%A1TK%81)%B4%A9-%03R%14%2F%A9i%81N%09D%03%16G%B0%06%12%02%09A%8DH%94%60%7C%D3'%23%0F%C6hh%88%97%87%C6j%C4%82%94%10%2C%85%D4%12%20%A0XZFF%DA%D24%5E%B0%B4%D3%0B3s%CE%9C%999%CB%87s*c%ED%E8%D4%8A%3C%C8NV%F6%FFa%AF%FD%7D%FFo%5D%F6%DE%91%99%DE%C9Q%F0%0E%8Fw%09%B4%FC%BB%05%17D%B4%9E%C7b%D4_%A5%FF%D5%CC%B1%FF%19%81%F7G%CC%EE%E5%13%CBX%7F%06%E3%BF%E3%8E%9E%88%87%5E%CC%3C%3C%9D%CD%2F%88h%3D%8B%F7%25y%88%03%BB2%8F%9D%12%81%85%2C%BD%94%1F%F4%90%B3p%3E%DF%9AC%DB%8A%88G%9F%CA%DC%F7%AF%7C%AF%8E%B8h%1D%AB%16%F0%CDa%0A%FD%DCrY%C4%96%E72%FF%3Cm%02m%B4uQ%EF%22%CE%24%BBh%7D%0F%F7%94%99%F1%F1%88%87%9E%9C%82%C4%1D%11%D7%7F%99%9B%97%B2%AA%8C%A3h%E7%81%03%F4b%FA%04%F6%F2%CA%3E%BE%BD%8C%2F%B4%60%06%85%05%94%D6%F0%F91FWD%3C6Y%89%0FG%CC%BB%9Euw%F3%D9y%CCo%A1%8E%96V%EA%E7R%9FC%C7)%85%E0%E9%CC%FD%B7D%3C%B5%84%DB%DA%99Q%22J%94%170%B6%96%3B%3Bi%BF!%E2%897%18%5C%C8%85%F7r%DD%E5%5C%3B%87R%90%08%8C%17(%8CS%3F%C2%A1S%AE%82g%D9%D6%CD%D7%E7s%CF%5CZ%0B%B4%94h%9DO%EB%A7%E9%5B%C6M%7F%A2t%3E%C5n%CA%A5%06%F0%3FX%85%F1%1D%7C%7F%80%1D%A7%DC%07%FA3%87%B7%B0%F9%056%D6%1A%E1%1CE1%989%93%F2%25%14z%89E%0D%85%9A%91%12M%F7%89%1A%B5gx%FCa6%FC%26%F3%E0%3F%01d%E6%B4%ECvV%0E%F0%7C%9D%3F%24%AF'%07%9B%F3%1F%93%BF%26%83%C9%B1d%A89%1F%A9qh%3B%9B%3F%C5G%A6%DAw%DA%9Dp%3B%CF%3C%CB%8F%AB%1C%C0%F1z%9E%89%D9%98%85%F2%09!%AD%EFa%CF%FD%DC%F7%D3%CC%ED%A7%DD%8Awf%8E%BC%C2%40%857Q%D1%C8%F0%3CA%F2%F1%A6%D5%86%98%F8%15%8F%FC(s%CBi%B5%E2%C9%A3%93Y%C5%C6gs%FA%3Bp6%09%D5QO%E2%0D%EC%E2%C5%FF%DAatE%C4%D9%1F%A0%A7L%7BS%EEl%26%E4%08%AAM%ABa%02Y'%F2-%82%A7G%60yD%C7u%5C%D3%CD%95%25%BAPj%02%1F%C6%91d%08cM%05%04%3A(%2C%E5%D2%0B%23%DAN%8B%C0%F2%88%AE%CF%D0%B7%92%BB%BA8%3B8%A3%19%E7%A3%C9%E1%09%8E%D5%19%CD%06x%B1%89%DF2%87%E2%95%7C%B1%97O%9E%1BQ%F8%8Fr%E0%F2%88%B9%7D%F4%AD%E6%2B%EF%A5%B5%D4%00%1E%C6P%8D%D1A%8A%C3%14K%14%3A4%98%15%1A%3FU%2C%90%0B%88%1BY_%A0%B8%24%E2%17%BB2%DF%9C6%81K%22%3A%FBXw5%F7%9E%D3h2%B5f%CC%87%AA%D4w%B2%F7Q%1E%1F%60%F7%5C%E6%5D%C5%B5%CBY%3D%9BB4T(%CC%20%96%90%7D%7C%AF%95%F2%C5%11%0F%FE%F6%C4f4U%83%B8%9B%9Bw0Zi%C8%5Bk%CA%BDw%90%97%7F%C9wzY2y%FD%15%2C%DA%CA%A6%0ACuF%F2-%AB%8EP%7D%81%CAW%B9%F5b%BA%26%FB%9D%14%FC2%E6%FD%84%1F%1Ee%A2%CE%C4%04%95%11%5E%DF%C5%C07%B8%ED%22%DAO%E6%B7%96%8F%3E%C6%83%7F%A12N%25%1B%E4%ABIu%88%EAV%AA_b%DD2%3A%8E%FB%B4L%91%99%C5q%C6%C7%88%0A%B5aF%FB%D9%F6s6%3C%C2%C3%7B3%EB'%F3%DB%98%F9%EB%1B%22%ACf%FFJn%9FK%B64Kqf%E3B%93%3D%DC%7F%94%B5%8B%23%B6%F6g%0EM%19%82%3B%B9i3%E3%DB%A8l%E0%BB%B7%B2f%BA%E7%C6Z%3E%B6%9E%FB%5E%A3Z%A3%D6%AC%92%B1%DD%D4~F%EDkTV%B1xJ%05%60%0B%9B%06Y%D3A%E7~vo%CA%7C~%BAMkc%E6%B6k%22%86%ABT%3E%C4%5Dg%11Ur%1Fq%90%1C%E4s%C7%EF%06%F1v%BE%8CVDt%F7%F0%C1%85%3CP%26%0E%91%7B%B8%F1%25%9E%7B%3As%FF%DBN%00%16E%B4%9DC%F7%99t%0E3%FC%1A%BF%DF9%E9v%1C%EF%BE%0D%FF%EF%09%FCm%003%80Qd%00%03%60%FD%00%00%00%00IEND%AEB%60%82"
}

var pushed=new Array();
var sites = defaultSites;
//var inter;
var settings;
var page_links;
//var ve_embed;

curlinkid = 0;

function checklinks2(){
	//if(page_links.length>1000)
	//return
	
	for (var i=0; i<page_links.length; i++){
		for(var ii=0;ii<sites.length;ii++){
			cursite = sites[ii]
			curlink = page_links[i]
			if(curlink.href.match(cursite.l) != null){
				var tp = replacer(cursite,curlink,cursite.n+':{0}');
				if((pushed.indexOf(tp) == -1 || settings.mode != "auto")&&(curlink.getAttribute("vembedded") != 1)) 
				{
					doit(cursite,curlink);
					curlink.setAttribute("vembedded",1);
					pushed.push(tp);
				}
				break;
			}
		}
	}
}

function checklinks3(){
	//if(page_links.length>1000)
	//return
	j = 0;
	toinc = settings.increment;
	if(toinc == -1)
		toinc = 5;
	for (; j<toinc; j++){
		i = curlinkid + j;
		
		if(i==page_links.length){
			break;
		}
		
		for(var ii=0;ii<sites.length;ii++){
			cursite = sites[ii]
			curlink = page_links[i]
			if(curlink.href.match(cursite.l) != null){
				var tp = replacer(cursite,curlink,cursite.n+':{0}');
				if((pushed.indexOf(tp) == -1 || settings.mode != "auto")&&(curlink.getAttribute("vembedded") != 1)) 
				{
					doit(cursite,curlink);
					curlink.setAttribute("vembedded",1);
					pushed.push(tp);
				}
				break;
			}
		}
		
	}
	
	curlinkid += j;
	if(curlinkid<page_links.length){
		window.setTimeout(checklinks3, 5);
	}
	//}
}
function doit(cursite,curlink)
{
	curlink.emb = document.createElement("embed");
	curlink.emb.setAttribute('allowFullScreen','true');
	curlink.emb.setAttribute('src',replacer(cursite,curlink,cursite.embed));
	curlink.emb.setAttribute('type','application/x-shockwave-flash');
	curlink.emb.setAttribute('width',cursite.width);
	curlink.emb.setAttribute('height',cursite.height);
	curlink.emb.setAttribute('bgcolor','#000000');
	curlink.emb.setAttribute('allowScriptAccess','always');
	if(cursite.attr){
		for(var iii=0;iii<cursite.attr.length;iii++){
			curlink.emb.setAttribute(cursite.attr[iii][0],replacer(cursite,curlink,cursite.attr[iii][1]));
		}
	}
	var mode = settings.mode;
	switch(mode){
		case 'auto':
			curlink.parentNode.insertBefore(document.createElement("br"),curlink.nextSibling);
			curlink.parentNode.insertBefore(curlink.emb,curlink.nextSibling);
			curlink.parentNode.insertBefore(document.createElement("br"),curlink.nextSibling);
			break;
		case 'google':
			curlink.button = document.createElement("label");
			curlink.func = function(curlink){return function(){embed(curlink);};}(curlink)
			curlink.func2 = function(curlink){return function(){unembed(curlink);};}(curlink);
			curlink.button.addEventListener('click',curlink.func,false);
			curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'">';
			curlink.button.setAttribute("id",replacer(cursite,curlink,cursite.n+':{0}'));
			curlink.parentNode.insertBefore(curlink.button,curlink);
			curlink.emb.google = {src:replacer(cursite,curlink,cursite.embed),t:0,height:cursite.height};
			curlink.emb.setAttribute('height',0);
			curlink.emb.setAttribute('src','');
			curlink.cont = document.createElement("span");
			curlink.cont.appendChild(document.createElement("br"));
			curlink.cont.appendChild(curlink.emb);
			curlink.cont.appendChild(document.createElement("br"));
			break;
		case 'lightbox':
			curlink.button = document.createElement("label");
			curlink.func = function(cursite,curlink){return function(){box(cursite,curlink);};}(cursite,curlink);
			curlink.button.addEventListener('click',curlink.func,false);
			curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important; width: 14px !important; height:15px !important" src="'+gfx.bulb+'">';
			curlink.button.setAttribute("id",replacer(cursite,curlink,cursite.n+':{0}'));
			curlink.parentNode.insertBefore(curlink.button,curlink);
	}
}
var NVF_UPDATEINTERVAL = 15;
var arr = [];
var arr2 = [];
var maxtime = 10;
function embed(curlink){
	curlink.parentNode.insertBefore(curlink.cont,curlink.nextSibling);
	curlink.button.removeEventListener('click',curlink.func,false);
	if(arr.indexOf([curlink.href,curlink]) == -1) 
		arr.push([curlink.href,curlink]);
}
function unembed(curlink){
	curlink.emb.setAttribute('src','');
	curlink.button.removeEventListener('click',curlink.func2,false);
	if(arr2.indexOf([curlink.href,curlink]) == -1) 
		arr2.push([curlink.href,curlink]);
}
function updv(){
	var i;
	for(i=0;i<arr.length;i++){
		curlink = arr[i][1];
		curlink.emb.setAttribute('height',curlink.emb.google.height*(curlink.emb.google.t/maxtime));
		curlink.emb.google.t++;
		if(curlink.emb.google.t==maxtime){
			curlink.emb.setAttribute('height',curlink.emb.google.height);
			curlink.emb.setAttribute('src',curlink.emb.google.src);
			curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.minus+'">';
			curlink.button.addEventListener('click',curlink.func2,false);
			arr.splice(i,1);
		}
	}
	for(i=0;i<arr2.length;i++){
		curlink = arr2[i][1];
		curlink.emb.setAttribute('height',curlink.emb.google.height*(curlink.emb.google.t/maxtime));
		curlink.emb.google.t--;
		if(curlink.emb.google.t==0){
			curlink.emb.setAttribute('height',0);
			curlink.button.innerHTML = '<img style="position:relative !important; left:0 !important; right:0 !important; bottom:0 !important; top:0 !important;float:none !important; border:0 !important;padding:0 !important;margin:0 !important;width: 12px !important; height:12px !important" src="'+gfx.plus+'">';
			curlink.button.addEventListener('click',curlink.func,false);
			curlink.parentNode.removeChild(curlink.cont);
			arr2.splice(i,1);
		}
	}
}
function replacer(cursite,curlink,from)
{
	function replacex(str,p1){
		var method = cursite.args[p1][0];
    		switch (method) {
			case 'match':
				return curlink.href.match(cursite.args[p1][1])[cursite.args[p1][2]];
			case undefined:
				return eval(cursite.args[p1][1]);
		}
	}
	return from.replace(/{([0-9]+)}/g,replacex);
}


GM_registerMenuCommand("Videoembed options", optmenu);
function optmenu()
{
	if(settings.mode == "lightbox")
		unbox();
	var head, style, body;
	head = document.getElementsByTagName('head')[0];
	body = document.getElementsByTagName('body')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = '.vembopt_overlay{display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: black;z-index:999998;-moz-opacity: 1;opacity:1;filter: alpha(opacity=100);} .vembopt_white_content {width:100%;height:100%;display:block;vertical-align:middle;color:white;background-color: black;z-index:999999;overflow: auto;} .vembopt{min-width:300;min-height:200;padding:10;width:50%;height:50%;text-align:left;position:absolute;background-color:gray;left:25%;top:25%;border:2px solid white;color:black} .vembopt label{font-weight: bold;}';
	head.appendChild(style);
	blackoverlay = document.createElement("div");
	whitecontent = document.createElement("div");
	whitecontent.setAttribute("name","whitecontent");
	blackoverlay.setAttribute("name","blackoverlay");
	blackoverlay.setAttribute("class","vembopt_overlay");
	whitecontent.setAttribute("class","vembopt_white_content");
	body.appendChild(blackoverlay);
	blackoverlay.appendChild(whitecontent);
	//blackoverlay.addEventListener('click',unbox,false);
	blackoverlay.setAttribute("style","display:block");
	optdiv = document.createElement("div");
	optdiv.setAttribute('class','vembopt');
	whitecontent.appendChild(optdiv);
	optdiv.innerHTML = '<center><b>&nbsp;&nbsp;&nbsp;Videoembed Options&nbsp;&nbsp;&nbsp;</b></center>'
	optdiv.appendChild(document.createElement("hr"));
	var modelabel = document.createElement("label");
	modelabel.setAttribute("style","color:black");
	modelabel.innerHTML = "mode: ";
	optdiv.appendChild(modelabel);
	var modeselect = document.createElement("select");
	modeselect.name = "modeselect";
	var objopt;
		objopt = document.createElement("option");
		objopt.text = "Auto";
		objopt.value = "auto";
		modeselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Google";
		objopt.value = "google";
		modeselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Lightbox ( beta )";
		objopt.value = "lightbox";
		modeselect.options.add(objopt);
	modeselect.value = settings.mode;
	optdiv.appendChild(modeselect);
	optdiv.appendChild(document.createElement("br"));
	var sizeselect = document.createElement("select");
	var sizelabel = document.createElement("label");
	sizelabel.setAttribute("style","color:black");
	sizelabel.innerHTML = "size: ";
	optdiv.appendChild(sizelabel);
		objopt = document.createElement("option");
		objopt.text = "Half";
		objopt.value = "0.5";
		sizeselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Regular";
		objopt.value = "1";
		sizeselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Supersize";
		objopt.value = "1.5";
		sizeselect.options.add(objopt);
	sizeselect.value = settings.size;
	sizeselect.name = "sizeselect";
	optdiv.appendChild(sizeselect);
	optdiv.appendChild(document.createElement("br"));	
	var colorlabel = document.createElement("label");
	colorlabel.setAttribute("style","color:black");
	colorlabel.innerHTML = "youtube color: ";
	colorselect = document.createElement("select");
	colorselect.name = "colorselect";
	optdiv.appendChild(colorlabel);
		objopt = document.createElement("option");
		objopt.text = "Default";
		objopt.value = "";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Storm(dark gray + light gray)";
		objopt.value = "&color1=0x3a3a3a&color2=0x999999";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Iceberg(dark blue + light blue)";
		objopt.value = "&color1=0x2b405b&color2=0x6b8ab6";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Acid(light blue + lighter blue)";
		objopt.value = "&color1=0x006699&color2=0x54abd6";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Green(dark green + light green)";
		objopt.value = "&color1=0x234900&color2=0x4e9e00";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Orange(orange + yellow)";
		objopt.value = "&color1=0xe1600f&color2=0xfebd01";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Pink";
		objopt.value = "&color1=0xcc2550&color2=0xe87a9f";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Purple";
		objopt.value = "&color1=0x402061&color2=0x9461ca";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Rubyred";
		objopt.value = "&color1=0x5d1719&color2=0xcd311b";
		colorselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Black";
		objopt.value = "&color1=0x000000&color2=0x000000";
		colorselect.options.add(objopt);
	colorselect.value = settings.youtube.color;
	optdiv.appendChild(colorselect);
	optdiv.appendChild(document.createElement("br"));	
	var hqlabel = document.createElement("label");
	hqlabel.setAttribute("style","color:black");
	hqlabel.innerHTML = "youtube high quality: ";
	hqselect = document.createElement("select");
	hqselect.name = "hqselect";
	optdiv.appendChild(hqlabel);
		objopt = document.createElement("option");
		objopt.text = "Yes";
		objopt.value = "&ap=%2526fmt%3D18";
		hqselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "No";
		objopt.value = "";
		hqselect.options.add(objopt);
	hqselect.value = settings.youtube.hq;
	optdiv.appendChild(hqselect);
	optdiv.appendChild(document.createElement("br"));	
	var inclabel = document.createElement("label");
	inclabel.setAttribute("style","color:black");
	inclabel.innerHTML = "increment per run: ";
	incselect = document.createElement("select");
	incselect.name = "incselect";
	optdiv.appendChild(inclabel);
		objopt = document.createElement("option");
		objopt.text = "5";
		objopt.value = 5;
		incselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "10";
		objopt.value = 10;
		incselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "15";
		objopt.value = 15;
		incselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "20";
		objopt.value = 20;
		incselect.options.add(objopt);
		objopt = document.createElement("option");
		objopt.text = "Infinite(for fast computers)";
		objopt.value = -1;
		incselect.options.add(objopt);
	incselect.value = settings.increment;
	optdiv.appendChild(incselect);
	optdiv.appendChild(document.createElement("hr"));
	infolabel = document.createElement("label");
	infolabel.setAttribute("style","color:black");
	infolabel.innerHTML = "If you want to open the config again, right click the Greasemonkey button (on the bottom-right of the browser) and navigate to: Userscript Commands -> Videoembed options.";
	optdiv.appendChild(infolabel);
	cent = document.createElement("center")
	optdiv.appendChild(document.createElement("hr"));
	var savebutton = document.createElement("button");
	savebutton.innerHTML = "Save & Reload page";
	savebutton.addEventListener('click',saveopts,false);
	var cancelbutton = document.createElement("button");
	cancelbutton.innerHTML = "Cancel";
	cancelbutton.addEventListener('click',cancel,false);
	cent.appendChild(savebutton);
	cent.appendChild(cancelbutton);
	optdiv.appendChild(cent);
}
function cancel(){
	for(i in document.body.getElementsByTagName("div")){
		//alert(document.body.getElementsByTagName("div")[i].getAttribute("name"));
		if(document.body.getElementsByTagName("div")[i]){
			if (document.body.getElementsByTagName("div")[i].getAttribute("name") == "whitecontent" || document.body.getElementsByTagName("div")[i].getAttribute("name") == "blackoverlay"){
				document.body.removeChild(document.body.getElementsByTagName("div")[i])
				i = i - 1
			}
		}
	}
}
function saveopts(){
	settings.mode = document.getElementsByName("modeselect")[0].value;
	settings.size = document.getElementsByName("sizeselect")[0].value;
	settings.youtube.color = document.getElementsByName("colorselect")[0].value;
	settings.youtube.hq = document.getElementsByName("hqselect")[0].value;
	settings.increment = document.getElementsByName("incselect")[0].value;
	GM_setValue('settings',uneval(settings));
	window.location.reload();
}

function checkupd(){
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
	elmA.setAttribute("href", "http://userscripts.org/scripts/show/7686");
	elmA.innerHTML = 'Checking for new version of Videoembed';
	elmD.appendChild(elmA)
	elmInsertPoint.insertBefore(elmD, elmInsertPoint.lastChild);
	GM_xmlhttpRequest({
		method:"GET",
		url:'http://userscripts.org/scripts/source/7686.user.js',
		onload:function(result) {
			if (result.responseText.indexOf('@version        5.09') == -1) {
				upddiv = document.createElement("div")
				upddiv.setAttribute('style','padding:10;position:fixed;background:black;border:2px solid gray;left:5px;bottom:5px;color:white');
				upddiv.innerHTML = '<a style="color:white;visited color:white" href="http://userscripts.org/scripts/show/7686">There is a new version of the "videoembed" userscript. Click here to install it!</a>';
				document.body.appendChild(upddiv);
				elmA.setAttribute('style',"display:none")
			}
			else
				elmA.setAttribute('style',"display:none")
		}
	});
}

if(window==window.top)
{
	options();
}

function options(){
	if(!GM_getValue('settings')){
		settings = {
			mode : 'auto',
			size: 1,
			youtube : {
				color: "",
				hq: "",
			},
		};
		optmenu();
	}
	else{
		eval('settings = '+GM_getValue('settings'));
		init();
	}
}

var whitecontent;
var blackoverlay;
function init(){
	checkupd()
	for(var ii=0;ii<sites.length;ii++){
		cursite = sites[ii]
		if (cursite.n != "12Seconds" && cursite.n != "Current"){
			cursite.width = cursite.width * settings.size;
			cursite.height = cursite.height * settings.size;
		}
		if(cursite.n == "Youtube")
			cursite.embed = cursite.embed + settings.youtube.color + settings.youtube.hq;
	}
	if(settings.youtube.hq == undefined)
	{
		settings.youtube.hq = ""
	}
	if(settings.increment == undefined)
	{
		settings.increment = 10;
	}
	if(settings.mode == "lightbox"){
		ve_background = document.createElement("div");
		ve_background.setAttribute("style","position:fixed;background:black;top:0;left:0;width:100%;height:100%;opacity:0.9;z-index:999999");
		ve_embed = document.createElement("embed");
		ve_embed.setAttribute('allowFullScreen','true');
		ve_embed.setAttribute('type','application/x-shockwave-flash');
		ve_embed.setAttribute('bgcolor','#000000');
		ve_embed.setAttribute('allowScriptAccess','always');
		//ve_background.appendChild(ve_embed);
		ve_label = document.createElement("label");
		ve_label.setAttribute("style","color:white;position:absolute;top:0%;left:50%;")
		ve_background.appendChild(ve_label);
		ve_close = document.createElement("img");
		ve_close.setAttribute("src",gfx.close);
		ve_close.setAttribute("style","position:absolute;top:0;right:0;opacity:1;width:2.5%");
		ve_close.addEventListener('click', unbox, false);
		ve_background.appendChild(ve_close);
		ve_background.style.visibility = 'hidden';
		ve_embed.style.visibility = 'hidden';
		document.getElementsByTagName('body')[0].appendChild(ve_background);
		ve_background.appendChild(ve_embed);
		/*
		blackoverlay = document.createElement("div");
		whitecontent = document.createElement("div");
		blackoverlay.setAttribute("class","vemb_overlay");
		whitecontent.setAttribute("class","vemb_white_content");
		boxlabel = document.createElement("label");
		boxlabel.setAttribute("style","color:white");
		var head, style, body;
		head = document.getElementsByTagName('head')[0];
		body = document.getElementsByTagName('body')[0];
		if (!head) { return; }
		style = document.createElement('style');
		style.type = 'text/css';
		style.innerHTML = '.vemb_overlay{display: none;position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: black;z-index:999998;-moz-opacity: 0.9;opacity:.90;filter: alpha(opacity=90);} .vemb_white_content {width:50%;height:50%;display:table-cell;vertical-align:middle;text-align:center;background-color: black;z-index:999999;overflow: auto;}';
		head.appendChild(style);
		body.appendChild(blackoverlay);
		blackoverlay.appendChild(whitecontent);
		whitecontent.appendChild(boxlabel);
		whitecontent.addEventListener('click',unbox,false);
		*/
	}
	else if(settings.mode == "google"){
		inter = setInterval(updv, NVF_UPDATEINTERVAL);
	}
	
	page_links = document.links;
	if(settings.increment==-1)
		checklinks2();
	else
		checklinks3();
	window.addEventListener('load', reallystart, false);
}

function box(cursite,curlink){
	
	for (asd in document.getElementsByTagName('embed','object')){
		node = document.getElementsByTagName('embed','object')[asd];
		if(node != ve_embed && node ){
			node.style.visibility = "hidden";
		}
	}
	
	ve_label.innerHTML = curlink.innerHTML
	while(ve_label.getElementsByTagName("*")[0]){
		ve_label.removeChild(ve_label.getElementsByTagName("*")[0]);
	}
	ve_label.setAttribute("style","color:white;position:absolute;top:0%;left:"+(50-(ve_label.offsetWidth*100/window.innerWidth)/2)+"%;")
	
	//ve_embed.setAttribute("style","position:absolute;top:5%;left:"+(50-(cursite.width/2))+"%;width:"+cursite.width+"%;height:"+cursite.height+"%;opacity:1");
	//ve_embed.setAttribute('width',cursite.width);
	//ve_embed.setAttribute('height',cursite.height);
	if(cursite.attr){
		for(var iii=0;iii<cursite.attr.length;iii++){
			ve_embed.setAttribute(cursite.attr[iii][0],replacer(cursite,curlink,cursite.attr[iii][1]));
		}
	}
	ve_background.style.visibility = "visible"
	ve_embed.style.visibility = 'visible';
	ve_embed.setAttribute('src',replacer(cursite,curlink,cursite.embed));
	if(cursite.n == "Current" || cursite.n == "Gamecorner" || cursite.n =="12Seconds" ){
		ve_embed.setAttribute("style","position:absolute;top:"+(50-(cursite.height*100/window.innerHeight)/2)+"%;left:"+(50-(cursite.width*100/window.innerWidth)/2)+"%;width:"+cursite.width+"px;height:"+cursite.height+"px;opacity:1");
	}
	else{
		ve_embed.setAttribute("style","position:absolute;top:2.5%;left:2.5%;width:95%;height:95%;opacity:1");
	}
	ve_background.removeChild(ve_embed);
	ve_background.appendChild(ve_embed);
}

function unbox(){
	for (asd in document.getElementsByTagName('embed','object')){
		node = document.getElementsByTagName('embed','object')[asd];
		if(node != ve_embed && node ){
			node.style.visibility = 'visible';
		}
	}
	ve_embed.setAttribute("src","");
	ve_background.style.visibility = 'hidden';
		ve_embed.style.visibility = 'hidden';
}
function reallystart(){
	//if(settings.increment==-1)
	//	checklinks2();
	//else
	page_links = document.links;
	curlinkid = 0;
		window.setTimeout(checklinks3, 20);
}

if (window.Pagerization) {
	window.Pagerization.addEventListener('addPage', checklinks2);
}