// ==UserScript==
// @name           TED XBMC
// @namespace      ted_xbmc
// @include        http://*.ted.com/*
// @include        http://ted.com/*
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', 'username:password@host:port');
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
        querystring = window.location
          if (querystring != null) {
              GM_xmlhttpRequest({
                  method: 'POST',
                  url: xbmc_url,
                  headers: 'Content-type: application/json',
                  data: '{"jsonrpc": "2.0", "method": "XBMC.Play", "params":{ "file" : "plugin://plugin.video.ted.talks/?url= + querystring " }, "id" : 1}'
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

            var xbmc_play_link = document.createElement('button');
            xbmc_play_link.addEventListener('click', playMedia, false);
            xbmc_play_link.innerHTML = '<span id="altHeadline">Play on XBMC</span>';
            xbmc_play_link.setAttribute("id", "playXBMC");
            xbmc_play_link.setAttribute("id", "altHeadline");
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
  },
  false
);
