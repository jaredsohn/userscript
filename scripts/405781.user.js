// ==UserScript==
// @name           Clickmeter Tracker - Alternative to userscripts.org Install Counters
// @namespace      CMTAUSOIC
// @description    Tired of USO's useless install counters? Here's how you can use a free tracking pixel service to monitor who/when/how much traffic all of your script's pages still get on userscript.org (USO).
// @include        http://my.clickmeter.com/Campaigns?campaignId=*
// @include        https://my.clickmeter.com/Campaigns?campaignId=*
// @require        http://code.jquery.com/jquery-1.10.2.js
// @author         drhouse
// @version        1.0.8
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

/* note: ClickMeter reports clicks, if made from the same IP between or greater than 30 minutes apart, as a unique visit */

$(document).ready(function () {
    
    function GetURLParameter(sParam) //return single parameter in query string
    {
        var sPageURL = window.location.search.substring(1);
        var sURLVariables = sPageURL.split('&');
        for (var i = 0; i < sURLVariables.length; i++) 
        {
            var sParameterName = sURLVariables[i].split('=');
            if (sParameterName[0] == sParam) 
            {
                return sParameterName[1];
            }
        }
    }
    
    function scan(){  
        var newcount = $('#container_pie_legend > ul:nth-child(2) > li:nth-child(1) > span.clicks-count').text(); //page element to watch
        var campaignId = GetURLParameter('campaignId');
        var oldcount = GM_getValue('oldcount_'+campaignId);
        var timeoutMinutes = 60*1000; //60*1000 = 1 minute
        
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'http://www.freesound.org/data/previews/91/91926_7037-lq.ogg');
        audioElement.setAttribute('autostart', 'false');
        $.get();
        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);
        
        var audioElement2 = document.createElement('audio');
        audioElement2.setAttribute('src', 'http://www.freesound.org/data/previews/80/80921_1022651-lq.ogg');
        audioElement2.setAttribute('autostart', 'false');
        $.get();
        audioElement2.addEventListener("load", function() {
            audioElement2.play();
        }, true);
        
        var width = screen.width * 0.75;
        var height = screen.height * 0.75;
        var left = (screen.width - width) / 2;
        var top = (screen.height - height) / 2;
        var params = 'width=' + width + ', height=' + height;
        params += ', top=' + top + ', left=' + left;
        params += ', directories=no';
        params += ', location=no';
        params += ', menubar=no';
        params += ', resizable=yes';
        params += ', scrollbars=yes';
        params += ', status=no';
        params += ', toolbar=no';
        
        var firstrun = GM_getValue('firstrun_'+campaignId);
        
        if (firstrun == 'false'){
            if ( newcount == oldcount ){
                audioElement.play();
                window.setTimeout(function(){window.location.href=window.location.href}, timeoutMinutes);
            } else {
                GM_setValue('oldcount_'+campaignId, newcount);
                audioElement2.play();
                window.setTimeout(function(){window.location.href=window.location.href}, timeoutMinutes);
                newwin = window.open('https://my.clickmeter.com/campaign-clicks?campaignId=' + campaignId, 'changes', params); //change detected, opens window to show latest visitor details, see helper "Clickmeter Referrer to USO Title Converter"
                if (window.focus) {
                    newwin.focus();
                }
            }
        } else if (firstrun == null){
            GM_setValue('firstrun_'+campaignId, 'false');
            GM_setValue('oldcount_'+campaignId, newcount);
            audioElement.play();
            window.setTimeout(function(){window.location.href=window.location.href}, timeoutMinutes); 
        }
            }
    
    setTimeout(function(){scan()},1000); //delay allows full page load before scan
    
});