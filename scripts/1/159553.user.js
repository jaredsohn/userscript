// ==UserScript==
// @name		SdarotTv
// @namespace		yoryenathan
// @description		Skip the wait time, clean up the page and navigate between episodes and seasons using the left and right arrow keys.
// @include		*sdarot.tv*
// @grant		metadata
// @run-at		document-end
// @version		5
// ==/UserScript==
// Created by YoryeNathan@gmail.com

// Last updated: 6 May 2013

// Set this (true/false) to control whether left and right arrow keys act as next episode and previous episode hotkeys.
var ENABLE_ARROWS_NAVIGATION = true;

// Set this (true/false) to control whether space key acts as a play/pause hotkey.
var ENABLE_SPACE_PLAY_PAUSE = true;

// Set this (true/false) to swap between the left and right arrow keys navigation. True means that left is the next episode.
var SWAP_RIGHT_LEFT_NAVIGATION = true;

// Any number between 100 (for fast computers) and 3000 (for slower computers).
var CHECK_DELAY = 100;














function cleanUp()
{
    var lst = document.body.getElementsByClassName('container');

    for (var i = lst.length - 1; i >= 0; i--)
    {
        if (i != 1)
        {
        	remove(lst[i]);
        }
    }
    
    remove(document.getElementsByTagName('hr')[0]);
    remove(document.getElementById('comments'));
    remove(document.getElementById('facebook'));
    remove(document.getElementById('fb-root'));
    remove(document.getElementById('MyAdv'));
    remove(document.getElementById('menu'));
    remove(document.getElementsByTagName('header')[0]);
    remove(document.getElementsByTagName('footer')[0]);
    document.getElementById('user-menu').innerHTML = '<ul id="menu"><li><a href="/">ראשי</a></li><li id="current"><a href="/series">רשימת סדרות</a></li></ul>';
    
    document.getElementById('epinfo').style.display = 'none';
    document.getElementById('video').setAttribute('class', '');
    document.getElementsByClassName('poster')[0].setAttribute('id', 'poster');
    var x = document.getElementById('details');
    x.getElementsByTagName('span')[0].setAttribute('id', 'summary_title');
    x.getElementsByTagName('p')[0].setAttribute('id', 'summary');
    
    x = document.getElementById('watch').getElementsByClassName('title')[0];
    var innerCode = "document.getElementById('summary').style.display=document.getElementById('summary_title').style.display=document.getElementById('poster').style.display=document.getElementById('poster').style.display=='none'?'':'none';return false;";
    x.innerHTML = '<a href="#" onclick="' + innerCode + '">' + x.innerHTML + '</a>';
    x.getElementsByTagName('a')[0].click();

    if (ENABLE_SPACE_PLAY_PAUSE)
    {
        document.body.innerHTML += '<a href="#" id="togglePlay" onclick="jwplayer().play(); return false;" style="display: none;"></a>';
    }
}

function skipTime()
{
    var x = document.getElementById('loading');
    
    if (x != null && x.style.display != 'none')
    {
        var s = document.createElement('script');
        s.language = "javascript";
        s.type = "text/javascript";
        s.text = "for(var i=0;i<100;i++)countdown(0,0);document.getElementById('loading').getElementsByClassName('green')[0].click();" +
                    "jwplayer().onVolume(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onComplete(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onSeek(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onBuffer(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onPause(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onPlay(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onMute(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onResize(function(){document.getElementById('player').blur();});" +
                    "jwplayer().onFullscreen(function(){document.getElementById('player').blur();});";

        x.style.display = 'none';
        document.body.appendChild(s);
    }
    
    setTimeout(function(){skipTime()},CHECK_DELAY);
}

function remove(x)
{
    x.parentNode.removeChild(x);
}

function isElement(o)
{
    return typeof HTMLElement === "object" ? o instanceof HTMLElement : o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string";
}

function returnKey(evt)
{
    if (evt.target != document.body)
    {
        return;
    }
    
    var x = 0;

    switch (evt.keyCode)
    {
        case 32: // space
        {
            if (ENABLE_SPACE_PLAY_PAUSE)
            {
                var togglePlay = document.getElementById('togglePlay');

                if (togglePlay != null)
                {
                    togglePlay.click();
                }
            }
            return;
        }
        case 37: // left
        {
            navigate(-1);
            break;
        }
        case 39: // right
        {
            navigate(1);
            break;
        }
        default:
        {
            return;
        }
    }
}

function navigate(x)
{
    if (!ENABLE_ARROWS_NAVIGATION)
    {
        return;
    }
    
    if (SWAP_RIGHT_LEFT_NAVIGATION)
    {
        x *= -1;
    }
    
    var lst = document.getElementById('episode').getElementsByTagName('li');
    var i = getSelected(lst);
    
    if (i == -1)
    {
        window.location.href = lst[x == 1 ? 0 : lst.length - 1].getElementsByTagName('a')[0].href;
        return;
    }
    
    i += x;
    
    if (i < 0)
    {
        x = -1;
    }
    else if (i >= lst.length)
    {
        x = 1;
    }
    else
    {
        window.location.href = lst[i].getElementsByTagName('a')[0].href;
        return;
    }
    
    lst = document.getElementById('season').getElementsByTagName('li');
    i = getSelected(lst);
    i += x;
    
    if (i < 0 || i >= lst.length)
    {
        return;
    }
    
    window.location.href = lst[i].getElementsByTagName('a')[0].href;
}

function getSelected(lst)
{
    for (var i = lst.length - 1; i >= 0; i--)
    {
        if (lst[i].getAttribute('class') == 'selected')
        {
            return i;
        }
    }
    
    return -1;
}

setTimeout(function(){skipTime()},CHECK_DELAY);
cleanUp();

if (ENABLE_ARROWS_NAVIGATION || ENABLE_SPACE_PLAY_PAUSE)
{
    document.onkeydown = returnKey;
}