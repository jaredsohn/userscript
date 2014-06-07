// ==UserScript==
// @name           BBC iPlayer XBMC
// @namespace      iplayer_xbmc
// @include        http://*.bbc.co.uk/iplayer/*
// @include        http://bbc.co.uk/iplayer/*
// ==/UserScript==

// ==UserScript==
// @name           BBC iPlayer XBMC
// @namespace      iplayer_xbmc
// @include        http://*.bbc.co.uk/iplayer/*
// @include        http://bbc.co.uk/iplayer/*
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', 'http://username:password@xbmc:8080');
var xbmc_url;

function setXbmcHost(init){
    if(!init)xbmc_host = prompt('Please configure set the XBMC Host in username:password@host:port format', xbmc_host);
    GM_setValue('xbmc_host', xbmc_host);
    xbmc_url = xbmc_host + '/jsonrpc';
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
        urlstring = window.location + "";
        parts = urlstring.split("/");
        episode = parts[5];
        GM_xmlhttpRequest({
           method: 'POST',
           url: xbmc_url,
           headers: 'Content-type: application/json',
           data: '{"jsonrpc": "2.0", "method": "XBMC.Play", "params":{ "file" : "plugin://plugin.video.iplayer/?pid=' + episode + '" }, "id" : 1}'
        });
     },
     250
   );
}

window.addEventListener(
  'load',
  function() {
    setTimeout(function () {
        try{
            window
            var xbmc_play_link = document.createElement('a');
            xbmc_play_link.addEventListener('click', playMedia, false);
            xbmc_play_link.innerHTML = '(Play in XBMC)';

            proginfo = document.getElementById('programme-info');
            proginfo = proginfo.getElementsByTagName('div')[0];
            title = proginfo.getElementsByTagName('h2')[0];
            date = title.getElementsByTagName('span')[1];
            date.innerHTML = date.innerHTML + " ";
            date.appendChild(xbmc_play_link);
        }catch(e){
            console.log(e)
        }
      },
    10);
  },
  false
);