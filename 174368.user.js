// ==UserScript==
// @id             sda marathon now playing
// @name           sda marathon now playing
// @version        1.1
// @namespace      http://userscripts.org/users/501085
// @author         
// @description    
// @include        http://marathon.speeddemosarchive.com/schedule
// @include        http://www.gamesdonequick.com/schedule
// @include        http://gamesdonequick.com/schedule
// @match          http://marathon.speeddemosarchive.com/schedule
// @match          http://www.gamesdonequick.com/schedule
// @match          http://gamesdonequick.com/schedule
// @run-at         document-start
// @updateURL      https://userscripts.org/scripts/source/174368.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174368.user.js
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function(e) {
    
    var list = document.querySelectorAll( "#runTable tr td:first-child" );
    
    var nowTime = new Date();
    
    var nowplaying = document.createElement('p');
    var upnext = document.createElement('p');
    var foundone = false;
    var firstnext = false;
    
    
    for (i=0;i<list.length;i++) {
        
        //console.log(list[i].textContent)
        var runTimestamp = Date.parse(list[i].textContent + ' -0500');
        var runTime = new Date(runTimestamp);
        
        //console.log(list[i].textContent + ' // ' + (runTimestamp < Date.parse(nowTime)) + ' // ' + runTime);
        
        if (runTimestamp < Date.parse(nowTime))
        {
            nowplaying = list[i];
            foundone = true;
        }
        if (!firstnext && runTimestamp > Date.parse(nowTime))
        {
            upnext = list[i];
            firstnext = true;
        }
        
    }
    if (foundone)
    {
        nowplaying.parentElement.className += " greenrow";
    }
    if (firstnext)
    {
        upnext.parentElement.className += " pinkrow";
    }
    var greenrows = document.createElement('style');
    greenrows.innerHTML = "#runTable .greenrow{background-color: #FDDC57} #runTable .greenrow td:nth-child(odd) {background-color: #FFD93F;}";
    document.body.appendChild(greenrows);
    var pinkrows = document.createElement('style');
    pinkrows.innerHTML = "#runTable .pinkrow{background-color: #97DCFD} #runTable .pinkrow td:nth-child(odd) {background-color: #7FD9FF;}";
    document.body.appendChild(pinkrows);
    
}, false);