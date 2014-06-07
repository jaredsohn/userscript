// ==UserScript==
// @name           YouTube XBMC
// @namespace      youtube_xbmc
// @include        http://*.youtube.tld/*
// @include        http://youtube.tld/*
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', '192.168.2.2:611');
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

window.addEventListener(
  'load',
  function() {
    setTimeout(function () {
        GM_addStyle("#xbmc_div {border-top: 1px solid #CCCCCC; " +
            "margin: 0px 5px; padding: 5px; color: #666666; " +
            "font-weight: bold; text-align: center}");

        try{
            window

            var xbmc_play_link = document.createElement('a');
            xbmc_play_link.addEventListener('click', playMedia, false);
            xbmc_play_link.innerHTML = '(Play in XBMC)';

            document.getElementById('eow-title').appendChild(xbmc_play_link);
        }catch(e){
            console.log(e)
        }
      },
    10);
  },
  false
);