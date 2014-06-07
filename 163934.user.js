// ==UserScript==
// @name        youtube.com : watch page enhancer
// @namespace   tukkek
// @description better YT, includes ad remover and full size video
// @include     http*://www.youtube.com/watch?*
// @version     1
// ==/UserScript==
if (window.top!=window.self){
  throw 'Not in top window, exiting.';
}
/*
* BUFFER ENHANCER
*/
function newdiv(){
  var d=document.createElement('div');
  return d;
}
var MAX_ETA_LOOPS=100000;
var YOUTUBE_DEFAULT_BUFFER=10;
var BUFFER_ETA_PANEL='buffereta';
var BUFFER_TICK_PERIOD=5000;
var BUFFERCHECKPERIOD=5000;
var RESIZERATIO=1;
var PROGRESS_INTERVAL=1000;
var ENABLEPROGRESS=false;//TODO
var ENABLESTRETCH=true;//TODO

var status=newdiv();
var etaPanel=newdiv();
var player;
var buffertimer;
var duration;
var lastclick=false;//TODO remove
var start=false;
var lastEta;
var canceltickqueue=false;
var ignore=0;
var buffercheckPause=false;
var bufferchecktimer=false;
var updateapi=true;//TODO workaround
var bufferdebug=false;
var cancelcount=0;
var bufferup=false;
var holdupstart=-1;
var playlist=false;
var cued=false;
var lastposition=-1;
var stopped=false;

function showEta(show){
  etaPanel.style.display=show?'block':'none';
}
function clearbuffer(){
  window.clearInterval(buffertimer);
  buffertimer=false;
  showEta(false);
  lastEta=[];
  canceltickqueue=true;
  if (!bufferdebug){
    status.innerHTML='';
  }
  holdupstart=-1;
}
function out(text){
  showEta(true);
  etaPanel.innerHTML=text;
}
function debug(text){
  if (bufferdebug){
    status.innerHTML=text+'<br/>';
  }
}
function getElementById(id){
  return document.getElementById(id);
}
function calcEta(duration,position,secondsBuffered,speed){
  var timeToComplete=(duration*(1-position)-secondsBuffered)/speed;
  var eta=timeToComplete;
  var predict=secondsBuffered;
  var debugLoops=0;
  while (eta>0&&predict>1) {
    eta-=predict;
    predict=predict*speed;
  }
  return eta;
}
/* since youtube doesn't properly fire buffering events when out of buffer during play */
function buffercheck(){
  if (buffercheckPause||buffertimer||calculatebufferedsecondsleft()>=10){
    return;
  }
  var current=player.getCurrentTime();
  if (current==0||current==player.getDuration()||duration<(BUFFERCHECKPERIOD/1000)){
    return;
  }
  updateapi=false;
  changebuffer(3);
  updateapi=true;
}
function startbuffercheck(){
  if (!bufferchecktimer){
    bufferchecktimer=setInterval(buffercheck,BUFFERCHECKPERIOD);
  }
}
function calculatebufferedsecondsleft(){
  var secondsBuffered=duration*(player.getVideoLoadedFraction()-player.getCurrentTime()/duration);
  return secondsBuffered<0?0:secondsBuffered;
}
function buffertick(){
  debug('tick');
  if (canceltickqueue){
    debug('cancel '+(++cancelcount));
    clearbuffer();
    return;
  }
  cancelcount=0;
  var current=player.getCurrentTime();
  var position=current/duration;
  if (position<BUFFER_TICK_PERIOD){
    play();
    clearbuffer();
    return;
  }
  var loaded=player.getVideoLoadedFraction();
  if (updateapi){
    if (holdupstart==-1){
      holdupstart=current;
    }
    player.mute();
    play();
    pause();
    player.seekTo(holdupstart,false); //TODO test true and holdupstart
    player.unMute();
  }
  
  if (loaded<=0||!isFinite(position)){ //TODO bugs
    debug('Loaded: '+loaded);
    clearbuffer();
    play();
    return;
  }
  if (loaded<position){
    out(
      'YouTube bug ('+
      loaded+
      '&lt;'+
      position+
      ')... Fix: '+
      Math.round(100*loaded/position)+
      '%');
    restart();
    return;
  }
  var secondsBuffered=calculatebufferedsecondsleft();
  var wait=(time()-start)/1000;
  var speed=secondsBuffered/wait;
  var simulation;
  var eta=-1;
  var debugLoops=0;
  if (speed==0){
    simulation=Number.MAX_VALUE;
  } else {
    do {
      try {
        var lastSimulation=simulation;
        simulation=calcEta(duration,position,secondsBuffered+(speed*++eta),speed);
        if (lastSimulation==simulation){
          alert('Stuck!');simulation=Number.MAX_VALUE;
        }
      } catch(e) {
        clearbuffer();
        debug(duration+' '+position+' '+secondsBuffered+' '+speed);
        return;
      }
    } while(simulation>0);
  }
  if ((eta<=0&&secondsBuffered<YOUTUBE_DEFAULT_BUFFER)&&(duration-current)>10){
    eta=(YOUTUBE_DEFAULT_BUFFER-secondsBuffered)/speed;
  }
  lastEta.push(eta);
  var MAX_STALE_SECONDS=10;
  if (lastEta.length>=MAX_STALE_SECONDS/(BUFFER_TICK_PERIOD/1000)){ //auto-reload if too slow
    var abort=true;
    for (i=lastEta.length-MAX_STALE_SECONDS;i<lastEta.length;i++){
      if (lastEta[i]<(duration-current)){
        abort=false;
        break;
      }
    }
    if (abort){
      ignore=true;
      clearbuffer();
      document.location.reload();
      return;
    }
  }
  var seconds=Math.floor(eta % 60);
  if (seconds < 10){
    seconds='0'+seconds;
  }
  out(Math.floor(eta / 60)+':'+seconds);
  debug(
    '<br/>Duration: '+duration+
    '<br/>Current: '+current+
    '<br/>Position: '+position+
    '<br/>Loaded: '+loaded+
    '<br/>Seconds buffered: '+secondsBuffered+
    '<br/>Waiting time: '+wait+
    '<br/>Buffered seconds/second: '+speed+
    '<br/>Seconds to play: '+eta
    +'<br/>bytes loaded: '+player.getVideoBytesLoaded()
    +'<br/>fraction loaded: '+player.getVideoLoadedFraction()
  );
  if (eta<=0||loaded==null||isNaN(secondsBuffered)){
    clearbuffer();
    play();
    startbuffercheck();
  }
}
function pause(){
  ignore++;
  player.pauseVideo();
}
function play(){
  ignore++;
  player.playVideo();
}
function restart(){
  start=time();
}
function buffercheckstop(){
  window.clearInterval(bufferchecktimer);
  bufferchecktimer=false;
}
function changebuffer(state){
  if (!start){
    restart();
  }
  if (ignore>0){
    ignore--;
    return;
  }
  var alreadyrunning=buffertimer&&!canceltickqueue;
  if (state==1&&alreadyrunning){ //yt player is forcing play
    pause();
    buffercheckstop();
    return;
  }
  switch (state){ //https://developers.google.com/youtube/js_api_reference
    case 3: //buffering
      break;
    case 2: //pause
      buffercheckstop();
      if (alreadyrunning||player.getCurrentTime()==player.getDuration()){
        return;
      }
      /*if (!lastclick||time()-lastclick>1000){
        break;
      }*/
      bufferchecktimer=false;
    case 5: //stopped
    case 1: //playing
    case 0: //ended
      clearbuffer();
    default:
      return;
  }
  clearbuffer();
  if(stopped){
    return;
  }
  pause();
  canceltickqueue=false;
  buffertick();
  buffertimer=setInterval(buffertick,BUFFER_TICK_PERIOD);
};
function initbuffer(){
  GM_addStyle('#'+BUFFER_ETA_PANEL+'{background: grey;color: white;padding:5px;position: fixed;font:bolder;top:25px;left:25px;z-index:200;display:none;}');
  etaPanel.id=BUFFER_ETA_PANEL;
  document.body.appendChild(etaPanel);
  
  var container=getElementById('watch7-headline');
  container.insertBefore(status,container.firstChild);
  debug('YouTubePlayerReady');
  duration=player.getDuration();
  if (!duration||duration==0){
    debug('fallback: '+player.getDuration+'='+player.getDuration());
    return;
  }
  player.addEventListener('onStateChange','youtubecombufferfix');
  debug('event registered');
};
function iframeclicked(){
  lastclick=time();
}
GM_registerMenuCommand('Toggle buffer debug',function(){
  bufferdebug=!bufferdebug;
  debug('enabled');
},'T');
/*
* PROGRESS DISPLAY
*/
var MIDDLE_PANEL=document.createElement('div');
var MIDDLE_PANEL_ID='statechangepanelid';
var NO_LAST=-1;
var duration;
var period;
var middle;
var progresstimer=false;
var parameters=[];
function style(property,value){
  MIDDLE_PANEL.style[property]=value;
}
function clear(){
  style('display','none');
}
function stop(){
  window.clearInterval(progresstimer);
  progresstimer=false;
  clear();
}
function time(){
  return new Date().getTime();
}
function rgb(rounded,decimal,quarter){
  return decimal>quarter/4?rounded+1:rounded;
}
function changeprogress(state){
  if (!duration){
    duration=player.getDuration();
    period=duration/2;
    middle=duration/2;
  }
  switch (state) { //https://developers.google.com/youtube/js_api_reference
    case 1: //playing
      var lastCurrent=NO_LAST;
      var lastEpoch;
      if (!progresstimer){
        progresstimer=setInterval(function(){
          var current=player.getCurrentTime();
          if ((middle-period)<current&&current<(middle+period)) {
            style('display','block');
            var ms=0;
            var now=time();
            if (lastCurrent==current){//same second
              ms=(now-lastEpoch)/1000;
            } else {
              lastEpoch=now;
            }
            lastCurrent=current;
            var progress=255*((current+ms)/duration);
            var rounded=Math.floor(progress);
            var decimal=progress-rounded;
            var color='rgb('+
              rgb(rounded,decimal,1)+
              ','+
              rgb(rounded,decimal,2)+
              ','+
              rgb(rounded,decimal,3)+
              ')';
            style('color',color);
            style('background',color);
          } else {
            lastCurrent=NO_LAST;
            clear();
          }
        },PROGRESS_INTERVAL);
      }
      break;
    default:
      stop();
      break;
  }
}
/*
* STRETCH
*/
var streched=false;
function parsedimension(from,to){
  return to/parseInt(from.replace('px',''));
}
function stretch(){
  if(!ENABLESTRETCH){
    return;
  }
  var videostyle=
    document.querySelector('#enhancedplayer').contentDocument.querySelector('video').style;
  videostyle['transform']='scale('+
    parsedimension(videostyle.width,document.documentElement.clientWidth)+','+
    parsedimension(videostyle.height,document.documentElement.clientHeight)+')';
}
unsafeWindow.statechange=function(event){
  var state=event.data;
  if(ENABLEPROGRESS){
    changeprogress(state);
  }
  if (bufferup){
    changebuffer(state);
  } else {
    bufferup=true;
    initbuffer();
  }
  //TODO switch
  if (!streched&&state==1){
    streched=true;
    stretch();
  }
  if (state==-1&&cued){
    cued();
  }
  //TODO would be nice to prevent autoskip to next video so i can check the feedback
};
function initprogress(){
  GM_addStyle('#'+MIDDLE_PANEL_ID+'{height:10px;width:10px;position:fixed;font:bolder;z-index:300;bottom:0px;left:0px;display:none;}');
  MIDDLE_PANEL.id=MIDDLE_PANEL_ID;
  MIDDLE_PANEL.innerHTML='.';
  document.body.appendChild(MIDDLE_PANEL);
}
function isplaylist(){
  return playlist[0];
}
/*
* MAIN
*/ 
function crop(id){
  var container=document.getElementById(id);
  if (container){
    container.style.padding='0px';
  }
}
function querystyle(query){
  var select = document.querySelector(query);
  return select?select.style:false;
}
function resize(){
  var p=document.querySelector('#enhancedplayer');
  p.setAttribute('width',document.documentElement.clientWidth+'px');
  p.setAttribute('height',document.documentElement.clientHeight*RESIZERATIO+'px');
  p.scrollIntoView();
}
function enhance(){
  GM_addStyle(''); //fixes #movie_player's wrappedJSObject being undefined
  var tag=document.createElement('script');
  tag.src="https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  var params=document.location.search.substr(1).split('&');
  for (var i=0;i<params.length;i++){
    var param=params[i].split('=');
    var name=param[0];
    var value=param[1];
    parameters[name]=value;
  }
  playlist=[parameters['list']];
  lastposition=GM_getValue(document.location.href,0);
  window.scrollTo(0,5000000);//load comments and vote functions while we still have #player
  setTimeout(function(){
    var newplayer=document.createElement('iframe');
    var oldplayer=document.querySelector('#player');
    var playerparent=oldplayer.parentNode;
    playerparent.insertBefore(newplayer,oldplayer);
    playerparent.removeChild(oldplayer);
    newplayer.outerHTML='<iframe \
      id="enhancedplayer" \
      type="text/html" \
      src="'+
        document.location.protocol+
        '//www.youtube.com/embed/'+
        parameters['v']+
        '?html5=1&autohide=1&autoplay=1&enablejsapi=1&modestbranding=1&version=3&start='+
        lastposition+
        '"\
      />';
    resize();
    unsafeWindow.ready=function(event) {
      initprogress();
      startbuffercheck();
      player.setVolume(100);
      player.setPlaybackQuality('hd720');
      setInterval(function(){
        var value=document.location.href;
        var current=player.getCurrentTime();
        if (isFinite(current)&&player.getDuration()-current<10){
          GM_deleteValue(value);
        } else {
          GM_setValue(value,Math.floor(current));
        }
      },10000)
      var playlistid=isplaylist();
      if (playlistid){
        player.cuePlaylist({list:playlistid});
        cued=function(){
          cued=false;
          var playerplaylist=player.getPlaylist();
          var playlistindex=playerplaylist.indexOf(parameters['v']);
          setTimeout(function(){
            player.playVideoAt(playlistindex);
            if (playlistindex!=0){
              changeprogress=function(state){};
              stop();
            }
            if (lastposition<1){
              clearbuffer();
              player.stopVideo();
              stopped=true;
              setTimeout(function(){stopped=false;},1000);
            }else{
              player.playVideo();
              player.seekTo(lastposition,true);
            }
            setInterval(function(){
              var newindex=player.getPlaylistIndex();
              if (playlistindex!=newindex){
                document.location.href=
                  player.getVideoUrl()+'&list='+playlist[0]+'&v='+playerplaylist[newindex];
              }
            },BUFFERCHECKPERIOD);
          },1000);
        }
      }
    };
    
    player=new unsafeWindow.YT.Player('enhancedplayer', {
      events: {
        'onReady': 'ready',
        'onStateChange': 'statechange',
      }
    });
    document.querySelector("#enhancedplayer").contentDocument
      .addEventListener('click',iframeclicked,true);
  },1250);
}
function hide(e){
  var ptc=querystyle(e);
  if (ptc){
    ptc['display']='none';
  }
}
var HIDES=[
  '#watch7-sidebar',
  '#watch-sidebar-section',
  '.watch-sidebar-section',
  '#watch7-sidebar',
  '#watch7-playlist-tray-container',
  '#watch-related',
  '#guide',
  ]
for (h=0;h<HIDES.length;h++){
  hide(HIDES[h]);
}
/*
* SHOW NUMBER OF COMMENTS AND LIKE/DISLIKE RATIO
*/
var DISABLED='-';
var titletimer;
function parse(clazz){
  var select=document.querySelector('.'+clazz);
  return select?parseInt(select.textContent.split(',').join('')):DISABLED;
}
function sethtml(id,html){
  var e=document.getElementById(id);
  if (e){
    e.innerHTML=html;
  }
}
var defaultvideo=document.querySelector('video');
if (defaultvideo){
  setInterval(function(){
    defaultvideo.pause();
  },1000);
}
titletimer=setInterval(function(){
  clearInterval(titletimer);
  enhance();
  var dislikes=parse('dislikes-count');
  var likes=parse('likes-count');
  document.title=
    document.title.replace('YouTube','')+
    (dislikes==DISABLED||likes==DISABLED?DISABLED:Math.round(likes/(dislikes+1)))+
    'lpd';
},250);
window.onresize=function(){
  resize();
};
setInterval(stretch,5000);
document.body.style.overflowY='hidden';
document.querySelector('#masthead-positioner').style.display='none';