// ==UserScript==
// @name           YouTube XBMC
// @version        0.1
// @author         tojnk
// @contributors   queeup
// @license        WTFPL
// @namespace      youtube_xbmc
// @include        http://*.youtube.tld/*
// @include        http://youtube.tld/*
// @description    Adds a 'Play on XBMC' button next to the 'Subscribe' button in youtube.
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', 'username:password@xbmc:8080');
var xbmc_url;

function setXbmcHost(init){
  if(!init)xbmc_host = prompt('Please configure set the XBMC Host in username:password@host:port format', xbmc_host);
  GM_setValue('xbmc_host', xbmc_host);
  xbmc_url = 'http://' + xbmc_host + '/jsonrpc';
}

setXbmcHost(true);

GM_registerMenuCommand('Configure XBMC host', setXbmcHost);

function stopPlaying(){
  GM_xmlhttpRequest({
    method: 'GET',
    url: xbmc_url + 'Stop()'
  });
}

function pausePlaying(){
  GM_xmlhttpRequest({
    method: 'GET',
    url: xbmc_url + 'Pause()'
  });
}

function playMedia(){
  setTimeout(function(){
    querystring = window.location.search.substring(1);
    queryarray = querystring.split("&");
    for (i=0;i<queryarray.length;i++) {
      query = queryarray[i].split("=");
      if (query[0] == "v") {
          GM_xmlhttpRequest({
              method: 'POST',
              url: xbmc_url,
              headers: 'Content-type: application/json',
              data: '{"jsonrpc": "2.0", "method": "XBMC.Play", "params":{ "file" : "plugin://plugin.video.youtube/?action=play_video&videoid=' + query[1] + '" }, "id" : 1}'
          });
      }
    }
    },
    250
  );
}

function addXBMCButton() {
    setTimeout(function () {
        GM_addStyle("#xbmc_div {border-top: 1px solid #CCCCCC; " +
                    "margin: 0px 5px; padding: 5px; color: #666666; " +
                    "font-weight: bold; text-align: center}");
        
        try{
            window
                
                var xbmc_play_link = document.createElement('button');
            xbmc_play_link.addEventListener('click', playMedia, false);
            xbmc_play_link.innerHTML = '<span class="yt-uix-button-content">Play on XBMC</span>';
            xbmc_play_link.setAttribute("id", "playXBMC");
            xbmc_play_link.setAttribute("class", "yt-uix-button yt-uix-tooltip");
            xbmc_play_link.setAttribute("type", "button");
            xbmc_play_link.setAttribute("title", "Play this video on your XBMC");
            xbmc_play_link.setAttribute("data-tooltip-title", "Play this video on your XBMC");
            xbmc_play_link.setAttribute("data-tooltip-timer", "170");
            
            document.getElementById('watch-headline-user-info').appendChild(xbmc_play_link);
        }catch(e){
            console.log(e)
                }
    },
  10);
}

if ( (document.readyState == 'complete') || (document.readyState == 'interactive') ){
    addXBMCButton();    
}
else{
    window.addEventListener('load',addXBMCButton(),false);  
}

