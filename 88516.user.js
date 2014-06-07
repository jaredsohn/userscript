/* 
 * Copyright (C) 2010 - Brylev Daniel (brylevdaniel@gmail.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2, or (at your option)
 * any later version.
 */

// ==UserScript==
// @name           Script for download media files from vkontakte.ru
// @author         Brylev Daniel (brylevdaniel@gmail.com)
// @description    Shows links to music and video files on vkontakte.ru pages
// @namespace      http://code.google.com/p/vk-dl/
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

// Adds references to music and video files inside element
function showLinks(element)
{
    showAudioLinks(element);
    showVideoLinks(element);
}
// Adds references to music files inside element
function showAudioLinks(element)
{
    // Get list of all images in parent element
    var imgs = element.getElementsByTagName('img');
    var func, mchs;

    for(var i = 0; i < imgs.length; i++)
        // If image's onclick function text contains 'operate()' function call (play button)
        if((func = imgs[i].getAttribute('onclick'))&&(mchs = func.match(/operate\((.*?)\)/)))
        {
            // To prevent re-adding insert blank <span>
            // Why not to use object attribute? Cause element can be reloaded by innerHTML set.
            var parent = imgs[i].parentNode;
            if(parent.firstChild.tagName == 'SPAN') continue;
            parent.insertBefore(document.createElement('span'), parent.firstChild);
                
            // Get arguments of 'operate()' function call
            var args = mchs[1].replace(/'|"|\ /g,'').split(',');
            // 'operate()' function has different arguments on myaudio and search pages
            var ref = args.length < 5 ? args[1]:
                'http://cs'+args[1]+'.vkontakte.ru/u'+args[2]+'/audio/'+args[3]+'.mp3';
                
            // Insert our reference
            var cell = document.createElement('td');
            cell.setAttribute('style', 'width:14px; vertical-align:top');
            cell.innerHTML='<font size=2><a href='+ref+'><b>[\u2193]</b></a></font>';
            // Get the row where imgbutton placed on and insert here our cell
            var row = parent.parentNode;
            row.insertBefore(cell, row.firstChild);
            var table = row.parentNode, srow, addtor;
            // If table contains second row we must insert blank cell here too
            if(srow = table.getElementsByTagName('tr')[1])
                srow.insertBefore(document.createElement('td'), srow.firstChild);
            // To prevent add button transfer to the next line append it to our row    
            if(addtor = document.getElementById('audio_add'+args[0]))
                row.appendChild(addtor.parentNode);
        }
}
// Adds references to video files inside element
function showVideoLinks(element)
{
    // Get list of anchors in parent element
    var _anrs = element.getElementsByTagName('a');
    // Copy returned NodeList to protect it from changes in loop (when we add our refs)
    var anrs = new Array(_anrs.length);
    for(i in _anrs) anrs[i] = _anrs[i];
    var func, mchs;
     
    for(var i = 0; i < anrs.length; i++)
        // If anchor's onclick function text contains 'showVideoBoxCommon()' function call
        if((func = anrs[i].getAttribute('onclick'))&&(mchs = func.match(/showVideoBoxCommon\((\{.*?\})/)))
        {
            // To prevent re-adding insert blank <span>
            var parent = anrs[i].parentNode;
            if(parent.firstChild.tagName == 'SPAN') continue;

            // Get first argument of 'showVideoBoxCommon()' function call and evalute it
            var args = eval('('+mchs[1]+')');
            args.hd = parseInt(args.hd);
            args.no_flv = parseInt(args.no_flv);
            // Generate reference(s) to video file
            var ref = args.host.match('http') ? args.host : 'http://' + args.host + '/';
            ref += parseInt(args.uid) ? 'u' + args.uid + '/video/': 'assets/videos/';
            ref += args.vtag;
            ref += args.host.match(/\.(vkontakte|vk)\./) ? '.' : args.vkid + '.vk.';
            
            // Insert element (cell) which will contain our reference(s)
            var cell;
            if(parent.className == 'post_media')
            // Video posted on the wall
            {
                cell = document.createElement('td');
                cell.setAttribute('style', 'padding-right:3px; vertical-align:middle');
                var anchor = anrs[i].cloneNode(false);
                anchor.appendChild(anrs[i].firstChild);
                anchor.appendChild(anrs[i].firstChild);
                anrs[i].removeChild(anrs[i].firstChild);
                var td = document.createElement('td');
                var table = document.createElement('table');
                // To prevent re-adding insert blank <spans>
                td.appendChild(document.createElement('span'));
                parent.insertBefore(document.createElement('span'), parent.firstChild);
                
                td.appendChild(anchor);
                table.appendChild(cell);
                table.appendChild(td);
                parent.insertBefore(table, anrs[i]);
            }
            else if(parent.className == 'clearFix')
            // Video posted on the wall in compact mode
            {
                cell = document.createElement('td');
                cell.setAttribute('style', 'padding-top:6px; vertical-align:top');
                var td = document.createElement('td');
                // To prevent re-adding insert blank <span>
                td.appendChild(document.createElement('span'));
                td.appendChild(anrs[i]);
                var table = document.createElement('table');
                table.appendChild(cell);
                table.appendChild(td);
                parent.insertBefore(table, parent.firstChild);
            }
            else
            // Video on video or video search pages
            {
                cell = document.createElement('td');
                cell.setAttribute('style', 'padding:3px 5px; vertical-align:top');
                // To prevent re-adding insert blank <span>
                parent.insertBefore(document.createElement('span'), parent.firstChild);
                var table = parent.parentNode.parentNode;
                table.insertBefore(cell, table.firstChild);
            }
                
            // Create link with popup menu
            var link = document.createElement('div');
            link.passme = 1; // To prevent 'DOMNodeInserted' event handling (see bellow)
            link.setAttribute('onmouseover', 'this.getElementsByTagName(\'div\')[0].style.visibility=\'visible\';');
            link.setAttribute('onmouseout', 'this.getElementsByTagName(\'div\')[0].style.visibility=\'hidden\';');
            link.innerHTML = '<font size=2><a href=\'javascript:\'><b>[\u2193]</b></a></font>';
            var popup = document.createElement('div'), item;
            popup.setAttribute('style', 'border:1px solid #265581; visibility:hidden; position:absolute; z-index:30');
            
            var defs = ['240','360','480','720','1080'];
            for(var r = 0; r <= args.hd; r++)
            {
                item = document.createElement('a');
                item.href = ref + (r || args.no_flv ? defs[r] + '.mp4' : 'flv');
                item.innerHTML = defs[r];
                item.setAttribute('style', 'font-size:12px; line-height:100%; height:14px;\
                       display:block; text-decoration:none; background:white; color:black; padding:3px 15px');
                item.setAttribute('onmouseover', 'this.style.backgroundColor=\'#2B587A\'; this.style.color=\'white\'');
                item.setAttribute('onmouseout', 'this.style.backgroundColor=\'white\'; this.style.color=\'black\'');
                popup.appendChild(item);
            }
            link.appendChild(popup);
            cell.appendChild(link);
        }
}
    
if(audios = document.getElementById('audios'))
{
    showAudioLinks(audios);
    // Add references when list of audios is updating via XHRequest
    audios.addEventListener('DOMNodeInserted',
       function(e){if(e.target.id)showAudioLinks(e.target);}, false);
}
if(videos = document.getElementById('videos'))
{
    showVideoLinks(videos);
    // Add references when list of videos is updating via XHRequest
    videos.addEventListener('DOMNodeInserted',
        function(e){if(e.target.id)showVideoLinks(e.target);}, false);
}
if(wall = document.getElementById('wall'))
{
    showLinks(wall);
    // Add references when wall is updating via XHRequest
    wall.addEventListener('DOMNodeInserted',
        function(e){if(e.target.id || (e.target.tagName=='DIV' && !e.target.passme))
                        showLinks(e.target);}, false);
}
if(wall = document.getElementById('mainFeed'))
// Audios and videos on wall in new wall mode 
{
    showLinks(wall);
    // Add references when wall is updating via XHRequest
    wall.addEventListener('DOMNodeInserted',
        function(e){if(e.target.id)showLinks(e.target);}, false);
}
if(results = document.getElementById('results'))
// Audios and videos on search page
{
    showLinks(results);
    // Add references when list of search results is updating via XHRequest
    results.addEventListener('DOMNodeInserted',
        function(e){if(e.target.id)showLinks(e.target);}, false);
}