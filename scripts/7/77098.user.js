// ==UserScript==
// @name           Travian Building Mover
// @namespace      Travian Building Mover
// @description    This repositions the buildings on the dorf2.php page
// @version        1.6.1
// @include        http://*.travian.*/dorf2.php*
// @license        GPL 3 or any later version
// ==/UserScript==

/*****************************************************************************
 * Copyright (C) 2009, 2010 Adriaan Tichler
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
    if (!window.confirm("Reset this village's buildings to their original position?")) return;
    delete mapping[did];
    GM_setValue('mapping', uneval(mapping));
    location.reload();
}

// Register these first, in case the script fails later and we still want to reset things
GM_registerMenuCommand("BM: Reset this village's buildings", reset_vil);
GM_registerMenuCommand("BM: Reset all buildings", function(){
        if (!window.confirm("Reset all buildings in all villages to their original position?")) return;
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

redraw_village();

// Are we in move mode?
var move_mode = GM_getValue('move_mode', false);
var unclicked = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACUDASIAAhEBAxEB/8QAGgABAAMAAwAAAAAAAAAAAAAACAAGBwEEBf/EACwQAAIBAwQCAQIFBQAAAAAAAAECAwQFEQAGEiEHMRMUIggVIzJxGEFSofD/xAAYAQADAQEAAAAAAAAAAAAAAAADBAUGAv/EACURAAICAgADCQAAAAAAAAAAAAECAAMEEQUSIQYTIjFBUWFxkf/aAAwDAQACEQMRAD8AY8rsoPH36Gf+9aD/APUR52u9e8FLS2ulnQE/TUNCGwqhS3ISF2zgn1k5yAvrTflALEEgetAfylLV7Zi3e1JK0BvN2rKOF1kAKpT1lasikdseUfBRgemPeksy56wAnqdQ+Oiu2jNd8FebvKO43M9/slru1sSjapk/L4mjr0AmMXUXIrIRxdvj+xiAeJY4VkbY7xQ3y1U90tVZFVUdQvOKWPsMM4P8EEEEHBBBBHWjz+HaOjO4NwS0otb4s9rDfQ06xqpL1hIbDNlsFSTkZ6GOtWC57mvGy/LVTHbrUs+2aijpa2+mOLL0ru9Qn1KAOGLH4k5IsblgjEFW/fm8ftGzcUfBtGgACDv310MNfQq9Vm7x8uP3HJ1NdHb91t95tq3C2VUdTTu7AMvRVgcMrA9qynIKkAgggjI1NbBWDDYiU8TftBTmjqLvNVR0sVHCZaiSaXhGsSAszEnpcLk5PXvOPehmu0Y62z3DdG5aKa5XK9VMxsVqp6dRJVSSM0jycfj5iNmJcKSCi/uY9MUz5psO8t0bpoLallqq7aFLHHVSQ0dRAprasOeKTiWRD8UYVWCjIZmBJygxPGnjW7wblbem8/ga7yRiOjoYJecVthHfDkenlY4ZnA9rgEgnkzWEC8zfkmZLZVt601+FR1J8t/Ag2rbx5P2Vd57DQUW56C8zQQmpd6w1RkwhdRD8ahQn6khxlhk4ypB1rm1PH3nPd+0Khqiqq7O91popFrLrVs5ZFSTiGCt8scgk4MoEYRQ7MMsBljrGAB16/wBfxrkov+Of76lvg47tzlBv6lbvDKH4C2Pc/H3juCwXi8G61xmeeWQdpGWC/po2AzquOmYAnvpRhRNX5AAMAAd561NNKABoTknc/9k=';
var clicked   = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAgACUDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAABwgABQYBBP/EADAQAAIBBAEDAgMGBwAAAAAAAAECAwQFBhEHABIhEzEIFCMVIiYyNFFBQ1ZlcbTT/8QAGQEAAgMBAAAAAAAAAAAAAAAAAQYEBQgH/8QAKBEAAgEDAwIFBQAAAAAAAAAAAQIDAAQFERIhBhMxQXGS0RVRVGGB/9oADAMBAAIRAxEAPwAj8H8VYFknFVnvd5sHzVwqfXEsxq507u2eRR91XUaCqPbXt+/SrfaWQ3eveClwu10s6An5ahaobSqFLdwkldt6J9tnewF9unf+GcA8IY+CQP1P+zN0qHKUtXjMWXtSStAbzdqyjhdZACqU9ZWrIpHlj3R9ijQ9mPnqjaONbePaikkDy/VOmVzWSXK3Ma3LhRI4ADsAAGPAGtWnBUEeRuZ7/wAd2u7WxKNqmT7Pq6uOvQCYxeIvWKyEdrt6f3GIB7Sx0rMbY+IuHb5aqe6WqxRVVHUL3xSx3CpIYb0f5nggggg6IIII8dYL4do6M5BkEtKLW+rPaw3yNOsaqS9YSG0zbbRUk7G/A1460Fzya8YXy1Ux261LPjNRR0tbfTHFt6V3eoT5lAHDFj6SdyLG5YIxBVvz0Vvl4Wyj2MsagAAg8eenBqBPmsqvK3Unvb5oSfEridhw7OqK2Y7QfJUstsjneP1nk25llUnbsT7KB+3jqde34rLrb7zn1ruFsqo6mnezoAy+CrCecMrA+VZTsFSAQQQRsdTo3u3vts8K750tNLPiLeSVizFeSTqT6k0U+IKCnPAVmu81VHSxUcNVLUSTS9kaxJUTMzEnwul2dnx77179L4uIx1tnuGUZLRTXK5XqpmNitVPTqJKqSRmkeTt9PvEbMS4UkFF/Mx8MbmizqifE8XxK8S1T4/bI3qqqko02aurNVK6JP3FdxRr2OFUkMzgkgoANvxpleBQZK2aZnlUDXeSMR0dDBSVTxW2EeezuMenlY6ZnA910CQT3OFjc2qW6F3XUAcajx0rPHU2Dzt1m51t7aTt9x23BG0I3HQA6ef3pf628cn4Vd57DQUWT0F5mghNS71hqjJpC6iH01ChPqSHW2GzrakHouYpx9znl+IVDVFVV2d7rTRSLWXWrZyyKknaGCt6scgk7GUCMIodmG2A2fl5y4qAH4o9v7fU+P8fT66ecuKf6o3/H9BU/8+obpj3beSuv8o/Qsx+LJ7G+KVXlDB7nx9WWawXi8G61xtazyyDykZaaX6aNoM6rrwzAE+fCjSidaL4l8rx/MM7orljdcK2kitiQPIIXj1IJZWI06g+zA71rz1Olu8KmdivhWhuloZIcRbxyqVYLyCNCPUGv/9k=';

if (move_mode == true) start_move();

// Get input from the user... add the moving truck.
var div = document.createElement('div');
div.setAttribute('style', 'position:absolute; top:487px; left:161px; padding:2px; z-index:100; border:none; cursor:pointer');
div.innerHTML = '<img title="" src="">';
document.body.appendChild(div);
change_truck();

// And the click listener onto the moving truck button
div.addEventListener('click', function(){
        move_mode = !move_mode;
        GM_setValue('move_mode', move_mode);

        if (move_mode == false)
            window.location.reload();
        else {
            change_truck();
            start_move();
        }
    }, false);

function redraw_village(){
    // The index is the destination, the value the source
    for (var i in mapping[did]) move(i, mapping[did][i]);
}

// This moves a building from src to dest. Used many times per page load.
function move(dest, src){
    //GM_log('Moving '+src+' to '+dest);
    var base = img[dest].className.split(' '); // We only change the last part of the class name
    img[dest].className = base[0]+' '+base[1]+' '+data[src].className;

    if (num[src] != undefined) num[src].className = 'd'+dest; // Move the building numbers. This goes backwards from everything else...

    poly[dest].title = data[src].title;
    poly[dest].href = data[src].href;
}

// Notify the user in a non-intrusive manner (no clicking away).
function notify(msg){
    var div = document.createElement('div');
    div.setAttribute('style', 'position:absolute; top:350px; left:400px; padding:2px; z-index:160; border:solid black 1px; background:#fff; -moz-border-radius:5px;');
    div.innerHTML = msg;
    document.body.appendChild(div);

    window.setTimeout(function(){div.parentNode.removeChild(div);}, 2000);
}

// Switch the truck's title and image. Must be called *after* the truck is on the screen.
function change_truck(){
    if (move_mode == true){
        div.childNodes[0].title = "Stop Swapping Buildings";
        div.childNodes[0].src = clicked;
    } else {
        div.childNodes[0].title = "Swap Buildings";
        div.childNodes[0].src = unclicked;
    }
}

// Add click listeners to all of the buildings. Swap the first-clicked building with the second-clicked one.
function start_move(){
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
                notify('<b>You cannot move the rally point</b>');
                return;
            }
            if (dest == '22'){
                notify('<b>You cannot move the walls</b>');
                return;
            }

            // This is the first click
            if (stage == 0){
                src = dest; // actually...

                notify('<b>Click on the second one</b>');
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

                // Go back to stage one
                notify('<b>Click on the first building</b>');
                stage = 0;

                // Re-move all of the moved buildings
                redraw_village();

                // Redraw_village resets the href of all the buildings in mapping ONLY.
                // So, un-reset them in case they get moved in the future.
                for (var j in mapping[did]) poly[j].href = '#'+mapping[did][j];

                // Now delete any buildings that are actually in their home position (keep
                // things tidy), and then save the mapping.
                if (temp  == m[temp])  delete mapping[did][temp];
                if (temp2 == m[temp2]) delete mapping[did][temp2];

                GM_setValue('mapping', uneval(mapping));
            }
        }, false);
    
    notify('<b>Click on the first building</b>');
}
