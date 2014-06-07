// ==UserScript==
// @name        Review Queue Hider
// @description Hide and show individual queues from the Review page
// @namespace   http://stackoverflow.com/users/1563422/danny-beckett
// @version     1.1
// @grant
// @include     http://*.stackexchange.com/review*
// @include     http://answers.onstartups.com/review*
// @include     http://askubuntu.com/review*
// @include     http://meta.askubuntu.com/review*
// @include     http://meta.serverfault.com/review*
// @include     http://meta.stackoverflow.com/review*
// @include     http://serverfault.com/review*
// @include     http://stackapps.com/review*
// @include     http://stackoverflow.com/review*
// @include     http://superuser.com/review*
// ==/UserScript==

// Images courtesy of fatcow.com/free-icons
var toMove = [];
var queues = document.getElementsByClassName('dashboard-item');
var hide = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAllJREFUeNqMU0toU1EQPfd9k4qF+mkg0lREUWqEWtQuWqOl2rpQ3HXjTl0IdlHowrVLF4ILCy7EjTs3KgrSoLaJdVGVCDVEix9sJNXGxmhsk5f3u9556bPRCHZguMzMOefN3HmX4S9L9HSMccc9zTkP+DnGmMFk6cahp5nz9ViBAfODZG90wLGs8bbD/Wjt2getpQVelQNmsYh86gU+TT6CrKqDsal0/A+B5MHoAJPk8ejZcwgEdZSnk7CzH2Dn56G0hqFEtqGpOwajUkX6+jVw1xmMPUnHfwtMdO/ke0dGIS/kUH54D65jgcky/Ba440CSVTQdOQEntAUvr1xG3/QsIwEp0bN7LHL0GNRCHuX4bRoYshaApGjCVe+kmPJUJxzhiUcfl1zXPRPq7ILx+D5kVyhWDbDKMlh5adVFTHmqE47wxCMBRUjrSj4Hs1rBhgcz+J8Vj3eC8MTzOoDEwLPvIUkK1mKEIzzxagJiNvbjO+TgujUJEI7wxPNG4IyZtmVpyvpmLJ/qB2ybFtzIJIKigHACD+J5AoumfSdfWhpqC20G03Tv58A/+LRRRhsSIp8XvoJ4K2lEJnqjc/v3dCAQ0Ol2ayINDTAxvwTDqOL5qwz6ptLtApeVRC07WSgNpzKzMEX7qq5D1TSoqgpFOJ1eLPJUJxzhibeyRuDi6+xNOu3UzNXtW9sRDofEZQXBeK1HxzAwn/uCdx/nkPj2c9jH+yP41ix8x60Duy5sUpWT4iI0cB/BzEXLvjv07M0lEbwVXmp4jXUWEb7RW/GqucILftv1z/mXAAMAUKIIFQm47kwAAAAASUVORK5CYII=';
var show = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAlxJREFUeNqkU0toU1EQPfc2bZKHSRpLaUu0YMGNXbYVEfxhEZFCV3UnCIqCRUTsIgsXLlyEWhdaFRcKSnZ2pRTclC7EhYa0kErFQrQgjQn5NE3S5vs+nXn5FVNw4YV53Hfnzjkzc+YKwzDwP8vCHyFE4+DSDIZUDT5dxyhDs0dKoE1igcw7fw9L9btMLsxPDeDiNJ67DzhvXTlzA8f6B1FWc9jKR5HIbCC0HkIwvIpyRZubn8LlFgAKfuc52Dfx7JofK5G3WF73o6RydoCV8lQ6BrBTdGExtIJCWXtBmUw2AMYeiyGHTQk+ue7H4o9JpLZjUHXgzqlqf55+FrARiBTtSKa78HUtBk3H8Ie7xpLkCxUVj8ZGxvHtzyukCjEqGNCbbYHGRv9GWwV2ZRO9bvJrmGGfrN05d6TnMMLJjyZzmSJKehOA90Uqh0uyK2U4FbO7ZxsqcKIlbYvq7MTNkXSLVN7TTalfLgtTlbr6siojkNlJQFjkv4WX+8yBJIBUNgrVsYlZYuAyOF3viSqN74swlWin3lgJgGYE9dEx8bQSAuHoLxhFN2xWqpPM2tFk4T2fsS+bAXJ5Iiki0ABIfodvLRJHMqHD0CUszGZpAvCezzTKKh4XiKYNxCnGLL82SMr5+3jj6sbEUY9Ed48ORxfgsvWaAJliDLkUBccEfkYNZOKYW3iIqxSb3zvK/Rce4LXSidE+t4DDbjTq5I7nClXm7aQZPEXHv1veAq2BwXGcPDSM2xY7jtelYrdaQGAjiNnV9/jEwfs+ptriMfGQOf8SMEsWIcvvfY27AgwA3EwHS5LUr7EAAAAASUVORK5CYII=';

// Checks whether a toggle state is saved for a queue
function exists(queue)
{
    return document.cookie.indexOf('rqh_' + location.host + '_' + queue + '=') >= 0;
}

// Gets a queue's toggle state
function get(queue)
{
    for(var i = 0; pair = document.cookie.split('; ')[i].split('='); i++)
        if(pair[0] == 'rqh_' + location.host + '_' + queue)
            return unescape(pair[1]) === '1';
	return false;
}

// Sets a queue's toggle state
function set(queue, shown)
{
    document.cookie = 'rqh_' + location.host + '_' + queue + '=' + shown;
}

// Toggles a queue's toggle state & button
function toggle(box)
{
    var state = get(box.queue);
    
    box.firstChild.src = 'data:image/png;base64,' + (state ? show : hide);
    box.parentNode.style.opacity = state ? '0.3' : '1.0';
    
    if(state)
    	document.getElementById('mainbar').appendChild(box.parentNode);
    else
    	document.getElementById('mainbar').insertBefore(box.parentNode, document.getElementById('mainbar').children[1]);
    
    set(box.queue, state ? '0' : '1');
    fixTops();
}

function fixTops()
{
    for(var i = 0; i < queues.length; i++)
    {
        // Ignore queues with insufficient rep
   		if(typeof queues[i].getElementsByClassName('dashboard-title')[0].getElementsByTagName('a')[0] == 'undefined')
        	continue;
        
    	queues[i].lastChild.style.top = '-' + (queues[i].clientHeight - 10 + (i == 0 ? 15 : 0)) + 'px';
    }
}

// Add a toolbox to each queue
for(var i = 0; i < queues.length; i++)
{
    // Ignore queues with insufficient rep
    if(typeof queues[i].getElementsByClassName('dashboard-title')[0].getElementsByTagName('a')[0] == 'undefined')
        continue;
    
    var queue = queues[i].getElementsByClassName('dashboard-title')[0].getElementsByTagName('a')[0].getAttribute('href').split('/').slice(-1)[0];
    if(!exists(queue))
        set(queue, 1);
    
    var box = document.createElement('div');
    box.innerHTML = '<img src="data:image/png;base64,' + (get(queue) ? hide : show) + '" height="16" width="16">';
    box.onclick = function(){ toggle(this); };
    box.queue = queue;
    box.style.border = '1px dotted #999';
    box.style.borderTopStyle = 'none';
    box.style.cursor = 'pointer';
    box.style.float = 'right';
    box.style.padding = '5px';
    box.style.position = 'relative';
    queues[i].appendChild(box);
    
    if(!get(queue))
    {
        queues[i].style.opacity = '0.3';
        toMove.push(i);
    }
}

// Move the hidden queues to the bottom - this is done separately from the for() above so
// that [i] is preserved (i.e. so queues aren't being moved around, and [i]'s position changes)
for(var i = toMove.length - 1; i >= 0; --i)
    document.getElementById('mainbar').appendChild(queues[toMove[i]]);

fixTops();