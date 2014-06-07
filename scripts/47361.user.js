// ==UserScript==
// @name          YouTube HQ + 720p Ultimate [Revised By Japzone]
// @description   Makes ALL your YouTube videos go to HQ automatically. Now with autoplay off and color options. Your favorite YouTube script is better than ever!
// @include       http://*youtube.com/watch?*
// @namespace     #aVg
// @version       0.98.4
// ==/UserScript==
//@More Settings--By Japzone
//WordSearch (Ctrl+F) "//Start" For More Settings
//@/More Settings
function yt720() {
var enablecolors=false,        // <--    ///////////////////////////////////
    useHD=false,               // <-- THIS IS THE DOMAIN OF CONFIGURABLE
    autoplay=false,            // <-- OPTIONS. EDITING ANYTHING ELSE WILL VOID
    autoBuffer=false,          // <-- YOUR WARRANTY ;)
    hideAnnotations=false,     // <--
    c1="000000",              // <--
    c2="FFFFFF",              // <--
    bigMode=false,             // <--
    jumpToPlayer=true,        // <--
    loop=false,                // <-- ////////////////////////////////////////////
    map=swfArgs.fmt_map,
    fmts=new Array("22","35"),              // a list of the highest YouTube formats
    fmt,
    $=_gel,
    toLoad="18",
    i=0;
window.player=$("movie_player");
while(fmt=fmts[i++]) {                  // check available formats
   if (fmt=="22" && !useHD) continue;     // and seek out the best one
   if(new RegExp(fmt+"/").test(map)) {  // if it's available
        toLoad=fmt;
	break;
   }
}

if(jumpToPlayer)
	location.replace(location.href.replace(location.hash,"")+"#watch-vid-title");

// BEGIN ytOnload
onYouTubePlayerReady=function(playerId) {
g_YouTubePlayerIsReady = true;

handleWatchPagePlayerStateChange=function(state) {
 if (state == 0) {
   if(loop) {
    player.seekTo(0,true);
    player.playVideo();
   } 
   if (watchIsPlayingAll) {
    gotoNext();
   }
 }
};
player.addEventListener("onStateChange","handleWatchPagePlayerStateChange");

player.addEventListener("onPlaybackQualityChange","onPlayerFormatChanged");
onPlayerFormatChanged(player.getPlaybackQuality());toggleWidePlayer(bigMode);
}
// END ytOnload

function showDownloads() {
 var style=document.createElement("style");
 style.type="text/css";
 style.innerHTML=".avgDL {float:right;}";

document.getElementsByTagName("head")[0].appendChild(style);

//Start Download Disable
//Place "//" in front of " var" To Disable
//----
// var downloads={"3gp":"17","mp4":"18","hd mp4":"22"};
//----
//End Download Disable

 var info=$("watch-ratings-views"), block=document.createElement("div");
 var head=$("watch-this-vid-info");
 
 block.className="avgDL";
 block.appendChild(document.createTextNode("Download this video as: "));

 var flv=document.createElement("a");
 flv.href="/get_video?video_id="+pageVideoId+"&t="+swfArgs.t;
 flv.innerHTML="flv";

 block.appendChild(flv);

 for(var dl in downloads) {
  var temp=flv.cloneNode(true);
  temp.innerHTML=dl;
  temp.href+="&fmt="+downloads[dl];
  if(!(dl=="hd mp4" && !isHDAvailable)) {
   block.appendChild(document.createTextNode(" // "));
   block.appendChild(temp);
  } }
  head.insertBefore(block,info);
}

  var r=new XMLHttpRequest();  // each req is about 16KB, not too bad
//Start AutoPlay Player Quality Change
//Place "//" in front of the one you want Disabled "HD" or "SD"
//----
//    r.open("GET","/watch?v="+pageVideoId+"&fmt="+toLoad);//Player Plays HD
    r.open("GET","/watch?v="+pageVideoId+toLoad);//Player Plays SD
//----
//End AutoPlay Player Quality Change
    r.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
             swfArgs=eval("("+/swfArgs = ({[^;]+)/.exec(this.responseText)[1]+")");
	     swfArgs.enablejsapi="1";
             if(enablecolors) {
                   swfArgs.color1="0x"+c1;
                   swfArgs.color2="0x"+c2;
             }
             if(!autoplay && !autoBuffer)
                  swfArgs.autoplay=0;
         var ads=new Array("infringe","ad_channel_code","ad_host_tier","invideo","ad_video_pub_id","ad_host","ad_module","ad_tag","ad_eurl");
	 if(hideAnnotations) {
            ads.push("iv_storage_server");
            ads.push("iv_module");
         }
         for(var i=ads.length-1;i>=0;i--)
         	delete swfArgs[ads[i]];
         var vars="";
         for(var arg in swfArgs)
		vars+="&"+arg+"="+swfArgs[arg];

	 player.setAttribute("flashvars",vars.substring(1));
	 player.src=player.src;

         if(!autoplay && autoBuffer)
             var pauser=setInterval(function(){try{player.pauseVideo();clearInterval(pauser);}catch(e){}},100);
         showDownloads();
        }
       };
  r.send("");

}
document.body.appendChild(document.createElement("script")).innerHTML="("+yt720+")()";