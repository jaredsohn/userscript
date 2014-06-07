// ==UserScript==
// @name           Online Video Stripper 1.1
// @namespace      http://theaceoffire.8k.com/OVS1.1
// @description    Slighlty improved version of Online Video Stripper. When viewing youtube videos, extra data from the page is added below the full screen video. Same is true with Veoh and Megavideo. Automatically designs a new page with the video from most online vid sites. Makes video full screen, gives link back to the source, and gives original title back. Sites include youtube, veoh, megavideo, glumbert, google video, tinypic, photobucket, spike, myspace, liveleak, revver, atomic films (Upload and regular), vimeo, gamevideos, gametrailors, and tudou!
// @include        *youtube.com/watch?*
// @include        *veoh.com/videos/*
// @include        *megavideo.com/?v=*
// @include        *glumbert.com/media*
// @include        *video.google.com/videoplay?*
// @include        *tinypic.com/player.php?v=*
// @include        *photobucket.com/mediadetail/?media=*
// @include        *spike.com/video/*
// @include        *vids.myspace.com/index.cfm?*VideoID=*
// @include        *liveleak.com/view?*
// @include        *revver.com/video/*
// @include        *atomfilms.com/film/*
// @include        *atomfilms.com/Clip.aspx?*
// @include        *vimeo.com/*
// @include        *gamevideos.com/video/id/*
// @include        *gametrailers.com/player/*
// @include        *tudou.com/programs/view/*
// @include        *video.nbc*/player/*
// @include        *yahoo.com/video/play?*
// ==/UserScript==

var init=function(y){
	var temp=document.getElementsByTagName("loveTracy");
	if(location.href.indexOf("XnoJump")===-1&&temp.length==0){//If they request not to jump here.
		var origURL=location.href;//Test string.
		function get(s){return document.getElementById(s);}
		function getH(s){return document.getElementById(s).innerHTML;}
		origURL=(origURL.split("#")[0]);//Remove the rest of the junk.
		var temp=origURL.split("\/");//Rip url into parts.
		var url;//Final url.
		var site="";//Site we are on
		var title=y;
		var id="";
		var extra="";
		site=temp[2].split(".");

		site=(site[2])?site[1]:site[0];//If the third dot is an extension.
		site=site.toLowerCase();
		switch(site){

		case "veoh":
			title=(title.split(": ")[1]).split(" |")[0];
			id=temp[4].split("\?")[0];
			url="http://www.veoh.com/static/flash/players/videodetails2.swf?permalinkId="+id;
			origURL=origURL.split("?")[0];
			extra=getH("aboutVid")+"<br/><br/>Related Tabs<br/>"+getH("relatedTabs_widget1");
			break;
		case "youtube"://Looks cruddy this way, honestly.
			title=title.split(" - ")[1];
			id=temp[3].split("=")[1];
			url="http://www.youtube.com/swf/l.swf?video_id="+id;
			extra=getH("videoDetailsDiv")+"<br/><br/>More from this user:<br/>"+getH("more_channel_videos")+"<br/><br/>Related videos:<br/>"+getH("relatedVidsBody");
			break;
		case "megavideo":
			id=temp[3].split("=")[1];
			title="VID:"+id+", "+document.getElementsByTagName("textarea")[0].innerHTML;
			url="http://www.megavideo.com/ep_gr.swf?v="+id;
			extra=document.getElementsByTagName("textarea")[0].innerHTML+"<br/><br/>Related Videos:<br/>"+document.getElementsByTagName("table")[4]/*.getElementsByTagName("div")[5]*/.innerHTML;
			break;
		case "glumbert":
			title=title.split(" - ")[1];
			id=temp[4];
			url="http://glumbert.com/player2/"+id;
			break;
		case "metacafe":
			id=temp[4];
			url="http://akimages.metacafe.com/f/fvp/EmbedVideoPlayer_5.1.0.4.swf?itemID="+id;
			break;
		case "google":
			id=(temp[3].split("=")[1]).split("&")[0];
			url="http://video.google.com/googleplayer.swf?docId="+id;		
			break;
		case "tinypic":
			id=(temp[3].split("v=")[1]).split("&")[0];
			title="TinyPic: "+id;
			url="http://v3.tinypic.com/player.swf?file="+id;
			break;
		case "photobucket":
			id=(((temp[4].split("file%3D")[1]).split("&")[0]).replace(/\%2F/g,"\/")).replace(/\%3A/g,":");
			title=title.split(" - ")[0];
			url="http://i109.photobucket.com/player.swf?file="+id;
			break;
		case "spike":
			id=temp[4];
			title=title.split(" - ")[0];
			url="http://www.spike.com/efp?flvbaseclip="+id;
			break;
		case "myspace":
			id=(temp[3].split("VideoID=")[1]).split("&")[0];
			title=title.split(": ")[1];
			url="http://lads.myspace.com/videos/vplayer.swf?m="+id;
			break;
		case "liveleak":
			title=title.split(" - ")[1];
			id=temp[3].split("i=")[1];
			url="http://www.liveleak.com/player.swf?token="+id;
			break;
		case "revver":
			title=title.split(" -- ")[0];
			id=temp[4];
			url="http://flash.revver.com/player/1.0/player.js?mediaId:"+id;
			break;
		case "atomfilms":
			if((location.href.toLowerCase()).indexOf("uploads")!=-1){//Its the upload site.
				site="upload."+site;
				title=title.split(" - ")[0];
				id=(temp[3].split("key=")[1]).split("&")[0];
				url="http://uploads.atomfilms.com/player.swf?key="+id;
			}else{//it is www.atomfilms!
				title=title.split(": ")[1];
				id=temp[4].split(".jsp")[0];
				url="http://www.atomfilms.com:80/a/autoplayer/shareEmbed.swf?keyword="+id;
			}
			break;
		case "gamevideos":
			title=title.split(" - ")[1];
			id=temp[5];
			url="http://gamevideos.com/swf/gamevideos11.swf?src=http%3A%2F%2Fgamevideos.com%2Fvideo%2FvideoListXML%3Fid%3D"+id+"%26adPlay%3Dfalse";
			break;
		case "gametrailers":
			title=title.split(" - ")[1];
			id=temp[5].split(".html")[0];
			url="http://www.gametrailers.com/remote_wrap.php?umid="+id;
			break;
		case "tudou":
			id=temp[5];
			url="http://www.tudou.com/v/"+id;
			break;
		case "nbc1":case "nbc2":case "nbc3":case "nbc4":case "nbc5":
		case "nbc6":case "nbc7":case "nbc8":case "nbc9":case "nbc10":
		case "nbc11":case "nbc12":case "nbc13":case "nbc14":
			title=title.split(" - ")[0];
			id=((temp[4].toLowerCase()).split("id=")[1]).split("&")[0]
			url="http://video.nbcuni.com/embed/player_2-1/embedded.swf?videoid="+id;
			break;

		}
		origURL=origURL+"#XnoJump";

		//Ok, time to build the page!
		temp="<html><head><title>"+title+"</title>";//Put in original title.
		temp+="<style>*{background-color:#000 !important;color:#aaf;}</style>";//Add style.
		temp+="<script><\/script></head><body>";
		temp+="<div><loveTracy>Page</loveTracy> loaded from "+site+": <a href=\""+origURL+"\">"+title+"</a>";
		temp+="</div><embed  bgcolor=\"#000\" width=\"100%\" height=\"95%\" src=\""+url+"\""
		      +" type=\"application/x-shockwave-flash\" pluginspage=\"http://www.macromedia.com/go/getflashplayer\" ></embed><br/><br/>"+extra+"</body></html>";

		document.open();
		document.write(temp);//Erase our current page for this.
		document.close();
}}

init(document.title);//If not done, do it.