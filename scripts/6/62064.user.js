// ==UserScript==
// @name           YouTube XBMC
// @namespace      youtube_xbmc
// @include        http://*.youtube.tld/*
// @include        http://youtube.tld/*
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', 'localhost:8008');
var xbmc_url;

function setXbmcHost(init){
    if(!init)xbmc_host = prompt('Please configure set the XBMC Host in host:port format', xbmc_host);
    GM_setValue('xbmc_host', xbmc_host);
    xbmc_url = 'http://' + xbmc_host + '/xbmcCmds/xbmcHttp?command=';
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
    stopPlaying();
    setTimeout(function(){
        var all_elements = document.getElementsByClassName('gsdownloadLinks');
        var element;
        for(var i=0, j=all_elements.length; i<j; i++){
            if(all_elements[i].title != 'This video format is unavailable'){
                element = all_elements[i];
            }
        }
        GM_xmlhttpRequest({
            method: 'GET',
            url: xbmc_url + 'ExecBuiltIn(PlayMedia(' + escape(element.href) + '))'
        });
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
            var xbmc_div = document.createElement('div');
            xbmc_div.id = 'xbmc_div';

            var xbmc_header = document.createElement('span');
            xbmc_header.innerHTML = 'XMBC!';
            xbmc_div.appendChild(xbmc_header);

            var xbmc_stop_link = document.createElement('a');
            xbmc_stop_link.addEventListener('click', stopPlaying, false);
            xbmc_stop_link.innerHTML = ' stop ';
            xbmc_div.appendChild(xbmc_stop_link);

            var xbmc_pause_link = document.createElement('a');
            xbmc_pause_link.addEventListener('click', pausePlaying, false);
            xbmc_pause_link.innerHTML = ' pause ';
            xbmc_div.appendChild(xbmc_pause_link);

            var xbmc_play_link = document.createElement('a');
            xbmc_play_link.addEventListener('click', playMedia, false);
            xbmc_play_link.innerHTML = 'play';
            xbmc_div.appendChild(xbmc_play_link);

            document.getElementById('watch-video-details').appendChild(xbmc_div);
        }catch(e){
            console.log(e)
        }
      },
    10);
  },
  false
);

