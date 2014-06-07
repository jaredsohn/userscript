// ==UserScript==
// @name           جا به جا گر ساختمان های تراویان
// @namespace      جا به جا گر ساختمان های تراویان
// @description    ساختمان های تراویان در dorf2.php را جا به جا میکند.
// @version        1.5.1
// @include        http://*.travian.*/dorf2.php*
// @license        GPL 3 or any later version
// ==/UserScript==

/*****************************************************************************
 * Copyright (C) 2009 Adriaan Tichler
 *
 * This is free software; you can redistribute it and/or modify it under the
 * terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 3 of the License, or (at your option) any later
 * version.
 *
 * This is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Public License for more details
 *
 * To obtain a copy of the GNU General Public License, please see
 * <http://www.gnu.org.licenses/>
 *****************************************************************************/

// First, get the user mappings...
var mapping = eval(GM_getValue('mapping', '({})'));

function reset_vil(){
    if (!window.confirm("آیا مایلید ساختمان های دهکده را به حالت اصلی باز گردانید؟")) return;
    delete mapping[did];
    GM_setValue('mapping', uneval(mapping));
    location.reload();
}

// Register these first, in case the script fails later and we still want to reset things
GM_registerMenuCommand("ریست ساختمان های این روستا", reset_vil);
GM_registerMenuCommand("ریست تمام ساختمان ها", function(){
        if (!window.confirm("یا مایلید ساختمان های تمام دهکده ها را به حالت اصلی باز گردانید؟")) return;
        GM_setValue('mapping', '({})');
        location.reload();
    });

 // Init
var server = location.host;
var uid = document.evaluate("id('side_navi')//a[contains(@href, 'spieler.php')]/@href", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.match(/uid=(\d+)/)[1];

// Add support for the 'toggle building levels' button, so we can make it persistent
// Otherwise, this value keeps getting cleared whenever cookies get cleared, which for the more paranoid of us would be every time the browser restarts ;-)
var toggle = eval(GM_getValue('show_building_level', '({})'));
var button = document.getElementById('lswitch');
if (button != undefined){
    var current_toggle = button.className == "on";
    // If we don't have a saved setting for this server and user, then take the present value of the toggle
    if (toggle[server+'_'+uid] == undefined){
        toggle[server+'_'+uid] = current_toggle;
        GM_setValue('show_building_level', uneval(toggle));
    }
    // Otherwise, correct the value of the toggle to what we have saved
    // *note* calling vil_levels_toggle() in this fashion is safer than using unsafeWindow, because unsafeWindow would elevate the privilege of the function.
    else if (current_toggle != toggle[server+'_'+uid]) location.href = "javascript:void(vil_levels_toggle());";

    // Either way, add a listener to update our version of the toggle when it's clicked
    button.addEventListener('click', function(){
            toggle[server+'_'+uid] = !toggle[server+'_'+uid];
            GM_setValue('show_building_level', uneval(toggle));
        }, false);
}

// Look at where the original buildings are *first*
var data = [];
var poly = document.getElementById('map2').childNodes;
var img = document.getElementById('map2').nextSibling.nextSibling.childNodes;

// Raw_num won't have the right number of elements if there are unused building spots in the village
var num = [];
var raw_num = document.getElementById('village2_levels');
// Some servers use a different ID...
if (raw_num == undefined) raw_num = document.getElementById('levels');
if (raw_num != undefined){
    raw_num = raw_num.childNodes;
    for (var i in raw_num){
        if (raw_num[i].className == undefined || raw_num[i].className.indexOf('level') >= 0) continue; // Don't do walls, closing divs, or the rally point
        num[raw_num[i].className.split('d')[1] - 0] = raw_num[i]; // re-index these nodes so they don't get mistakenly translated by an empty spot
    }
}

// Store the current info about all of the buildings...
for (var i=1; i <= 20; i++){
    data[i] = [];
    //GM_log(i + ' ' + img[i].alt + ' | ' + poly[i].title);

    data[i]['className'] = img[i].className.split(' ')[2];
    if (num[i] != undefined) data[i]['num'] = num[i].className;

    data[i]['title'] = poly[i].title;
    data[i]['href'] = poly[i].href;
}

// Get the active village, to store the new mappings
// We don't have to worry about postfixes because we're only running on one page
var did = document.evaluate('//tr[@class="sel"]/td[@class="text"]/a', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (did) did = did.href.match('newdid=([0-9]*)')[1];
else {
    // If this fails, there's a possibility that we're just running the other type of travian (??? still 3.5, but with different code...)
    did = document.evaluate('//table[@id="vlist"]/tbody/tr/td[@class="dot hl"]', document, null, XPathResult.ANY_UNORDERED_NODE_TYPE,null).singleNodeValue;
    if (did) did = did.parentNode.innerHTML.match('newdid=([0-9]*)')[1];
}
// Single village support courtesy of Booboo
if (!did) {
    var single_villages = eval(GM_getValue('single_villages', '({})'));
    if (!single_villages[server + "_" + uid]){
	GM_xmlhttpRequest({
                method: 'GET',
                url: "http://" + server + "/dorf3.php",
                onload: function(xhr){
                    var did = xhr.responseText.match(/newdid=(\d+)/)[1];
                    single_villages[server + "_" + uid] = did;
                    GM_setValue('single_villages', uneval(single_villages));
                    window.location.reload();
                }
            });
        return;
    }
    else did = single_villages[server + "_" + uid];
}

if (mapping[did] == undefined) mapping[did] = {};

// This moves a building from src to dest.
function move(dest, src){
    //GM_log('Moving '+src+' to '+dest);
    var base = img[dest].className.split(' '); // We only change the last part of the class name
    img[dest].className = base[0]+' '+base[1]+' '+data[src].className;

    if (num[src] != undefined) num[src].className = 'd'+dest; // Move the building numbers. This goes backwards from everything else...

    poly[dest].title = data[src].title;
    poly[dest].href = data[src].href;
}

// The index is the destination, the value the source
for (var i in mapping[did]) move(i, mapping[did][i]);

// Get input from the user... add the moving truck.
var div = document.createElement('div');
div.setAttribute('style', 'position:absolute; top:489px; left:163px; padding:2px; z-index:100; border:none; cursor:pointer');
div.innerHTML = '<img title="جابه جا کردن ساختمان" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QCURXhpZgAASUkqAAgAAAABAGmHBAABAAAAGgAAAAAAAAABAIaSBwBgAAAALAAAAAAAAABBU0NJSQAAAFdpbmRvd0V4dDogMzAzNSwgMjY3NA1XaW5kb3dPcmc6IDAsIDANQ29udGVudDogMTAsIDI2LCAzMDEyLCAyNjcyDUlnbm9yZWQgT3Bjb2RlczoNJDEwNQD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAcACEDASIAAhEBAxEB/8QAGQAAAwEBAQAAAAAAAAAAAAAAAAcIBgED/8QAMRAAAgIBAwMCAwUJAAAAAAAAAQIDBAUGERIABxMhMQgVFxQiMmGUIzRRUlNWcZHS/8QAGAEBAAMBAAAAAAAAAAAAAAAABQAEBgH/xAAkEQABAwMDBAMAAAAAAAAAAAABAAIDBBExEiEiBRRRYUFSwf/aAAwDAQACEQMRAD8AoP4khmPoxqF8FlbmJvRRxSpbqTtDLEqTxtIVdSCPuBh+e/UNyYPW8unY83FqS/NesTeCpG1mQ2rTjcSEFSTupjb3A9Nt2I2DXN3uzWLl7Sa2px2uVk4G+EVY2P3xBJt7D+PUZZm/Rg7lYiOu9z5LirMzJY8TVuAmaWWX9oxU7gsoB5KNh6b9F175w5ojxuceFcpGsJ5Khuxd7WmE0hJmEzGd1VjPmVmGShkyzXEhifxcq7OeXNWjfeF2Kt6cSjDZ35iMlQzGMr5PHTpYqWI/JFIu+zL/AIPqD+R9R0kex+pdOVu2tQ2M5jqvK/kZeNi+hYK96wykuWPL0P4tzv779ZrSmu27e5HIaiuajqZTT2dyd94MYbpHgX7XMyzQMzuhaVWJEYESMCrEjg7HL9F6/UPrZ6asHFruBsd/WLbeVJ4m5Yqe4j+dv99HWJ+o+nP6l79M/wD10dbfu4fsqtnrHfEm+PuURpDGN5NT5pAVroRwirhwWsTggjx7rwCkHy7lOLDmVUGL7ZrrCtFofQjY6pisFMnzPMT0o53uWVIYxBSNnCkqWDNsAVADbb9eT53J2e8Wd00bLRS5vUjUrWXT9+WE2jCqo53RQkahVHDYe+2/r1V2h9M4XSWHjweCpitSqjxxruWYj8RLMfUks7Ek+5Y9IEiOK4y5BxskrKxz3u4RYHk/JP4oqxvw0d6slnaz5VcNQr17CFZRPD4I039WjhjHEbbctuI3J3I39enlW+FrSlqtTj1RqDMZZqcgKGAmBZYw0hIlVjJzdg4VnUo2yLx4kEmhB109HljL3tum9RS/+jHa3+wdO/oV6Ot90dTX6XdRX//Z">';
document.body.appendChild(div);

function notify(msg){
    var div = document.createElement('div');
    div.setAttribute('style', 'position:absolute; top:350px; left:400px; padding:2px; z-index:160; border:solid black 1px; background:#fff; -moz-border-radius:5px;');
    div.innerHTML = msg;
    document.body.appendChild(div);

    window.setTimeout(function(){div.parentNode.removeChild(div);}, 2000);
}

var truck_stage = 0;
div.addEventListener('click', function(){
        // If the truck gets clicked a second time...
        if (truck_stage == 1){
            reset_vil();
            return;
        }
        truck_stage++;
        div.childNodes[0].title = 'بازگرداندن ساختمان ها به جای اصلی';

        // Add listeners to all of the objects
        var stage = 0;
        var src;

        // Cut all of the village links, so clicking on the villages no longer redirects
        // Also, store index info in here - it's the easiest way I can think of getting this info to the click listener routine
        for (var i in poly)
            if (poly[i].href != undefined)
                poly[i].href = '#'+(poly[i].href.split('id=')[1] - 18);
        var wall = document.getElementById('map1').childNodes;
        for (var i in wall)
            if (wall[i].href != undefined)
                wall[i].href = '#22';

        // Listen for a click on each building
        for (var i in poly) poly[i].addEventListener('click', function(e){
                var dest = e.target.href.split('#')[1]; // Extract the index info from above

                // Error conditions
                if (dest == '21'){
                    notify('<b>شما نمیتوانید این را جا به جا کنید.</b>');
                    return;
                }
                if (dest == '22'){
                    notify('<b>شما نمیتوانید دیوار را جا به جا کنید.</b>');
                    return;
                }

                // This is the first click
                if (stage == 0){
                    src = dest; // actually...

                    notify('<b>روی دومی کلیک کنید</b>');
                    stage++;
                } else { // Now we have to save said data
                    var m = mapping[did];

                    //GM_log('src='+src+' dest='+dest);
                    // First, find who *holds* src right now
                    var temp = src;
                    while (m[temp] != undefined && m[temp] != src) temp = m[temp];
                    // Find who *holds* dest right now
                    var temp2 = dest;
                    while (m[temp2] != undefined && m[temp2] != dest) temp2 = m[temp2];
                    //GM_log('m['+temp+']='+dest);
                    //GM_log('m['+temp2+']='+src);
                    m[temp] = parseInt(dest);
                    m[temp2] = parseInt(src);

                    GM_setValue('mapping', uneval(mapping));
                    window.location.reload();
                }
            }, false);

        notify('<b>روی ساختمان اول کلیک کنید</b>');
    }, false);
