// ==UserScript==
// @name       Kinox_Memory
// @namespace  http://google.com/
// @version    0.1
// @description  this will save the seen episodes and season in the localStorage introduced in HTML5
// @include      http://kinox.to/*
// @run-at document-end
// @require http://code.jquery.com/jquery-latest.js
// @copyright  2013+, nxg
// ==/UserScript==

var NOT_SEEN_COLOR = 'background-color: #FFFFFF';
var SEEN_COLOR = 'background-color: #5FB404';

if(window.location.href.search('html') != -1) {
    
    var resetHistory = document.getElementById('backward-episode');
    resetHistory.outerHTML = resetHistory.outerHTML + '<a id="resetHistory" href="javascript:void(0)" style="float: right; margin-top: 6px;">Reset History</a>';
    
    var menu = document.getElementById('Vadda').getElementsByTagName('table')[1].getElementsByTagName('tbody')[0];
    menu.innerHTML = menu.innerHTML + '<tr>	<td class="Label" nowrap="">View Tools:</td>	<td class="Value"><span style="white-space: nowrap;"><a data-ytta-id="-" href="#" id="setSeasonViewedBtn">Set Season Viewed</a></span>&nbsp; <span style="white-space: nowrap;"><a data-ytta-id="-" href="#" id="setEpisodeViewedBtn">Set Episode Viewed</a></span>&nbsp; <span style="white-space: nowrap;"><a data-ytta-id="-" href="#">Test</a></span></td></tr>';
    
    
    viewReset();
}

function viewReset() {
    var season = document.getElementById('SeasonSelection');
    var episode = document.getElementById('EpisodeSelection');
    var ajaxStream = document.getElementById('AjaxStream');
    var href = window.location.href;
    var seriesName = href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.html'));
    
    season.onchange = function() {
        viewReset();
    };
    episode.onchange = function() {
        viewReset();   
    };
    ajaxStream.onclick = function() {
        if (episode[episode.value -1].getAttribute('style') != SEEN_COLOR) {
            setEpisodeViewedInStorage(seriesName, season.value, episode.value);
        }
        viewReset();
    };
    
    document.getElementById('setSeasonViewedBtn').onclick = function() {
        for (var i=0; i<episode.length; i++) {
            if (episode[i].getAttribute('style') != SEEN_COLOR) {
                setEpisodeViewedInStorage(seriesName, season.value, i + 1);
            }
        }
        viewReset();
    };
    document.getElementById('setEpisodeViewedBtn').onclick = function() {
        if (episode[episode.value-1].getAttribute('style') != SEEN_COLOR) {
            setEpisodeViewedInStorage(seriesName,season.value,episode.value);
            viewReset();
        }
    };
    
    
    var storage = readStorage(seriesName);
    var seenSplit = storage.split('##');
    
    var seasonSeenArray = new Array(season.length);
    for (var sSA=0; sSA<seasonSeenArray.length; sSA++) {
        seasonSeenArray[sSA] = 0;
    }
    
    
    //Color Episodes
    for (var x=0; x<seenSplit.length; x++) {
        var oneEpisodeSplit = seenSplit[x].split('.');
        if (oneEpisodeSplit[0] == season.value) {
            episode[oneEpisodeSplit[1]-1].setAttribute('style',SEEN_COLOR);
        } else {
            
        }
        seasonSeenArray[oneEpisodeSplit[0]-1] += 1;
    }
    
    for (var sid=0; sid<season.length; sid++) {
        if (season[sid].getAttribute('rel').split(',').length === seasonSeenArray[sid]) {
            season[sid].setAttribute('style','margin: 6px 0px; ' + SEEN_COLOR);
        } else {
            season[sid].setAttribute('style','margin: 6px 0px; ' + NOT_SEEN_COLOR);
        }
    }
    
    for (var eid=0; eid<episode.length; eid++) {
        if (episode[eid].getAttribute('style') === null) {
            episode[eid].setAttribute('style',NOT_SEEN_COLOR);
        }
    }
    
    colorDropdowns(episode, season);
    
    document.getElementById('resetHistory').onclick = function() {
        removeStorage(seriesName);
    };
    
    //##switch to Streamcloud if possible
    switchStreamcloud();
    //##Goto first unseen
    //gotoFirstUnseen();
}

function colorDropdowns(episode, season) {
    var episodeStyle = episode[episode.value-1].getAttribute('style');
    if (episodeStyle != null && episodeStyle === SEEN_COLOR) {
        episode.setAttribute('style',SEEN_COLOR);   
    } else {
        episode.setAttribute('style',NOT_SEEN_COLOR);   
    }
    
    var seasonStyle = season[season.value-1].getAttribute('style');
    if (seasonStyle != null && seasonStyle === ('margin: 6px 0px; ' + SEEN_COLOR)) {
        season.setAttribute('style','margin: 6px 0px; ' + SEEN_COLOR);   
    } else {
        season.setAttribute('style','margin: 6px 0px; ' + NOT_SEEN_COLOR);   
    }
}

function switchStreamcloud() {
    
    window.setTimeout ( function() {
        var streamcloud = document.getElementById('Hoster_30');
        if (streamcloud != null) {
            //getPlayerByMirror(streamcloud, 'Auto');
            streamcloud.setAttribute('onclick','getPlayerByMirror(this, \'Auto\');');
            streamcloud.click();
        }
    }, 500);
}

function gotoFirstUnseen() {
    var SeasonLength = $("select#SeasonSelection option").length;
    var EpisodeLength = $("select#EpisodeSelection option").length;
    var EpisodeNum = $('select#EpisodeSelection option:selected').index()*1 + 1;
    
    if(EpisodeNum == EpisodeLength) {
        var removedAttrSeason = $('select#SeasonSelection option:selected').removeAttr('selected');
        var toSelectToSeason = removedAttrSeason;
        while (toSelectToSeason.attr('style') == SEEN_COLOR) {
            toSelectToSeason.next();
        }
        toSelectToSeason.attr('selected','selected');
        
        $('#SeasonSelection').change();
    } else {
        var removedAttrEpisode = $('select#EpisodeSelection option:selected').removeAttr('selected');
        var toSelectToEpisode = removedAttrEpisode;
        while (toSelectToEpisode.attr('style') == SEEN_COLOR && EpisodeNum) {
            toSelectToEpisode.next();
        }
        toSelectToEpisode.attr('selected','selected');
        
        $('#EpisodeSelection').change();
    }     
}


function removeStorage(seriesID) {
    localStorage.removeItem("monkeyViewed_" + seriesID);
}

function readStorage(seriesID) {
    return localStorage.getItem("monkeyViewed_" + seriesID);
}

function setEpisodeViewedInStorage(seriesID, seasonNum, episodeNum) {
    var prevStorage = readStorage(seriesID);
    if (prevStorage === null) {
        prevStorage = '';
    } else {
        prevStorage += '##';   
    }
    var newStorage = prevStorage + seasonNum + '.' + episodeNum;
    localStorage.setItem("monkeyViewed_" + seriesID, newStorage);
}