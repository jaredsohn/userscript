// ==UserScript==
// @name          test
// @description   Makes ALL your YouTube videos go to HQ automatically. Now with autoplay off and color options. Your favorite YouTube script is better than ever!
// @include       http://*youtube.com/watch?*
// @version       0.97.7
// ==/UserScript==
function yt720() {
var enablecolors=true,         // <--    ///////////////////////////////////
    useHD=true,                // <-- THIS IS THE DOMAIN OF CONFIGURABLE
    autoplay=ture,            // <-- OPTIONS. EDITING ANYTHING ELSE WILL VOID
    autoBuffer=false,          // <-- YOUR WARRANTY ;)
    c1="150EF3",               // <--
    c2="150EF3",               // <--
    bigMode=true,              // <--  /////////////////////////////////////
    iif=function(x,y){return x?y:""},
    map=swfArgs.fmt_map,
    fmts=new Array(22,35),              // a list of the highest YouTube formats
    fmt,
    $=_gel,
    toLoad="18",
    i=0;
while(fmt=fmts[i++]) {                  // check available formats
   if (fmt==22 && !useHD) continue;     // and seek out the best one
   if(new RegExp(fmt+"/").test(map)) {  // if it's available
        toLoad=fmt;
	break;
   }
}
  var r=new XMLHttpRequest();  // each req is about 16KB, not too bad
    r.open("GET","/watch?v="+pageVideoId+"&fmt="+toLoad);
    r.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
onYouTubePlayerReady=function(playerId) {ote
g_YouTubePlayerIsReady = true;
var player = _gel("movie_player");
player.addEventListener("onStateChange","handleWatchPagePlayerStateChange");
player.addEventListener("onPlaybackQualityChange","onPlayerFormatChanged");
onPlayerFormatChanged(player.getPlaybackQuality());
         if (bigMode) {
            const wide="watch-wide-mode";
            $("watch-this-vid").className=wide;
            $("watch-other-vids").className=wide;
         }
         else {
            $("watch-this-vid").className="";
            $("watch-other-vids").className="";
         }
}
             swfArgs=eval("("+/swfArgs = ({[^;]+)/.exec(this.responseText)[1]+")");

             if(enablecolors) {
                   swfArgs.color1="0x"+c1;
                   swfArgs.color2="0x"+c2;
             }
             if(!autoplay && !autoBuffer)
                  swfArgs.autoplay=0;
  
         var ads=new Array("ad_channel_code","ad_host_tier","iv_storage_server","invideo","iv_module","ad_video_pub_id","ad_host","ad_module","ad_tag","ad_eurl");
         for(var i=ads.length-1;i>=0;i--)
         	delete swfArgs[ads[i]];

             writeMoviePlayer("watch-player-div");
             if(!autoplay && autoBuffer)
                   var pauser=setInterval(function(){try{_gel("movie_player").pauseVideo();clearInterval(pauser);}catch(e){}},100);
        }
       };
  r.send("");

}
document.body.appendChild(document.createElement("script")).innerHTML="("+yt720+")()";