// ==UserScript==
// @name           Eur'OGame Little
// @namespace      eurogame
// @description    Simple script that shows when the missing resources to a building are available.
// @version        0.0.2 - Alpha
// @include        http://*.ogame.com.pt/game/*
// @include        http://*.ogame.org/game/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// ==/UserScript==

/**
= TODO =========================================================================
* [/]Move to Jetpack platform (using Page MODs API)
  * Repensar sobre quando/se usar JQuery/JS
* [+]Create user friendly options (in-game?)
* [+]Script update function?
* [/]Repensar o nome do script?
== Maybe =======================================================================
* [+]Building queue

= Changelog ====================================================================
* [/]21-03-2012 - Updated to work with version 3.1.4 of Redesign
* [+]Time Left to be available
* [+]Create a language structure (object-based)
* [+]"Time Left" timer
* [+]Detailed Information about missing resources
* [+]Weeks in "Available in"
* [+]Alert when resources are available
* [/]Updated to work with version 1.2.1 of Redesign
*/

$(function(){
    var TLD = /\.(\w+)\/game\//.exec(location.href)[1];
    var GETpage = /page=(.*)&?/.exec(location.href)[1];
    var GETsession = $('input[name="session"]').val(); // já nao é GET mas ok
    
    var LANG = {
        LocalizationStrings : unsafeWindow.LocalizationStrings,
        
        resources: [
            /(.*):\|/.exec($("#metal_box").attr("title"))[1],
            /(.*):\|/.exec($("#crystal_box").attr("title"))[1],
            /(.*):\|/.exec($("#deuterium_box").attr("title"))[1],
            /(.*):\|/.exec($("#energy_box").attr("title"))[1]
        ],
        
        pt: { // Portuguese
            available:   "Já se encontra disponível!",
            availableIn: "Disponível em",
            availableAt: "Disponível em",
            details:     "Detalhes",
            timeunits:   {
                week: "w"
            }
        },
        
        org: { // English
            available:   "Available!",
            availableIn: "Available in",
            availableAt: "Available at",
            details:     "Details",
            timeunits:   {
                week: "w"
            }
        }
    };
    
    LANG.resourcesId = {};
        LANG.resourcesId[LANG.resources[0]] = 0;
        LANG.resourcesId[LANG.resources[1]] = 1;
        LANG.resourcesId[LANG.resources[2]] = 2;
        LANG.resourcesId[LANG.resources[3]] = 3;
    
    
    function timeToText(time, format) {
        var weeks, days, hours, mins, secs;
        
        switch (format) {
            case "hours":
                weeks = Math.floor(time/168);
                time -= weeks * 168;
                days = Math.floor(time/24);
                    time -= days * 24;
                hours = Math.floor(time);
                    time -= hours;
                mins = Math.floor(time*60);
                    time -= mins / 60;
                secs = Math.floor(time*3600);
            break;
            case "seconds":
                weeks = Math.floor(time/604800);
			        time -= weeks * 604800;
                days = Math.floor(time/86400);
                    time -= days * 86400;
                hours = Math.floor(time/3600);
                    time -= hours * 3600;
                mins = Math.floor(time/60);
                    time -= mins * 60;
                secs = Math.floor(time);
            break;
            case "mili":
                weeks = Math.floor(time/604800000);
                    time -= weeks * 604800000;
                days = Math.floor(time/86400000);
                    time -= days * 86400000;
                hours = Math.floor(time/3600000);
                    time -= hours * 3600000;
                mins = Math.floor(time/60000);
                    time -= mins * 60000;
                secs = Math.floor(time/1000);
            break;
        }
                
        var text = "";
        if (weeks > 0) text += weeks + LANG[TLD].timeunits.week + " ";
        if (days > 0) text += days + LANG.LocalizationStrings.timeunits['short'].day + " ";
        if (hours > 0) text += hours + LANG.LocalizationStrings.timeunits['short'].hour + " ";
        if (mins > 0) text += mins + LANG.LocalizationStrings.timeunits['short'].minute + " ";
        if (secs > 0) text += secs + LANG.LocalizationStrings.timeunits['short'].second + " ";
        
        return text;
    }
    
    
    if (GETpage == 'resources' || GETpage == 'station' || GETpage == 'research' || GETpage == 'shipyard' || GETpage == 'defense') {
        
        var Resources = [
            unsafeWindow.resourceTickerMetal,
            unsafeWindow.resourceTickerCrystal,
            unsafeWindow.resourceTickerDeuterium
        ];
            
        $.each(Resources, function(i) { // I have to do this because Resources[i].production is a number divided and then rounded, so it's not precise
            Resources[i].rate = /\+((\.?\d*)*)/.exec($("#"+Resources[i].valueElem).parent().parent().attr("title"))[1].replace(/\D/, "");
        });
        
        
        var updateAI;
        function timeLeft() {
            var missTimes = Array(0, 0, 0);
            var detailedInfo = '';
            clearInterval(updateAI);
            
            $("span.missing_resource").each(function() {
                
                var rId = LANG.resourcesId[/\d+ (.*)/.exec($(this).parent().attr("title"))[1]];
                if (rId == 3) return; //Energy
                
                var missAmount = parseInt($(this).html().replace(/\D/g, ''));
                
                if ($(this).html().indexOf(LANG.LocalizationStrings['unitMega']) != -1) 
                    missAmount *= 1000000;
                    
                if ($(this).html().indexOf(LANG.LocalizationStrings['unitKilo']) != -1) 
                    missAmount *= 1000000000;
                    
                if ($(this).html().indexOf(LANG.LocalizationStrings['unitMilliard']) != -1) 
                    missAmount *= 1000000000000;
                
                missTimes[rId] = (missAmount - Resources[rId].available) / Resources[rId].rate;
                detailedInfo += LANG.resources[rId]+': '+timeToText(missTimes[rId], 'hours')+'<br />';
            });
            
            var missTime = Math.max(missTimes[0],missTimes[1],missTimes[2]);
            
            if (missTime > 0) {
                
                var now = new Date();
                var readyAt = new Date();
                readyAt.setTime(now.getTime() + (missTime * 60 * 60 * 1000));
                
                var availableHtml = '<li id="AvailableInfo" class="tips_available" title="|<center><b>'+LANG[TLD].availableAt+':</b></center>'+readyAt.toLocaleString()+"<br /><br /><center><b>"+LANG[TLD].details+":</b></center>"+detailedInfo+'">'+
                                                    LANG[TLD].availableIn+': '+
                                                    '<span class="time" id="AItimer">'+
                                                        timeToText(missTime, 'hours')+
                                                    '</span>'+
                                                '</li>';
                
                $("#action ul").append(availableHtml);
                
                updateAI = setInterval(updateTimerAI, 1000);
            }
        }
        
        function updateTimerAI() {
            var timeText = $("#AItimer").html();
            
            var tTweeks = /(\d+)w/.exec(timeText);
            var tTdays = /(\d+)d/.exec(timeText);
            var tThours = /(\d+)h/.exec(timeText);
            var tTmins = /(\d+)m/.exec(timeText);
            var tTsecs = /(\d+)s/.exec(timeText);
            
            var time = -1;
            if (tTsecs != null) time += parseInt(tTsecs[1]);
            if (tTmins != null) time += tTmins[1] * 60;
            if (tThours != null) time += tThours[1] * 3600;
            if (tTdays != null) time += tTdays[1] * 86400;
            if (tTweeks != null) time += tTweeks[1] * 604800;
            
            if (time > 0) {
                $("#AItimer").html(timeToText(time, 'seconds'));
            } else {
                $("#AvailableInfo").removeClass('tips_available').attr('title', '').html(LANG[TLD].available);
                clearInterval(updateAI);
            }
        }
        
        unsafeWindow.loadDetails = function(type) {
            $.post(
                "index.php?page="+GETpage+"&session="+GETsession+"&ajax=1",
                { type: type},
                function(data){
                    $("#detail").html(data);
                    $("#techDetailLoading").hide();
                    timeLeft();
                    location.href = 'javascript:initCluetip();var nR=$("*.tips_available").cluetip("destroy").cluetip({splitTitle:"|",showTitle:false,cluetipClass:"event",positionBy:"mouse",leftOffset:15,topOffset:10,width:"auto"});';
                    $("input[type='text']:first", document.forms["form"]).focus();
                }
            );
        };
        
    }
    
});