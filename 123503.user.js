// ==UserScript==
// @name           Youtube Aspect Remake
// @description    Adds buttons to toggle 4:3 and 16:9 aspect ratios on youtube, probs to the great work of scupizzaboy who mades this script. I've just changed the buttons to make them more adapt at the new youtube design. Original Script: http://userscripts.org/scripts/show/101165
// @namespace      NoXPhasma
// @include        http://youtube.*/*
// @include        http://*.youtube.*/*
// @include        https://youtube.*/*
// @include        https://*.youtube.*/*
// @version        1.0.2
// @date           2012-15-03
// ==/UserScript==

function setAspectWide()
{
    document = unsafeWindow.document;
    var player = document.getElementById('movie_player');
    var flashvars = player.getAttribute('flashvars').split('&');
    for (var i = 0; i < flashvars.length; i++)
    {
        if (flashvars[i].indexOf('keywords') == 0)
        {
            var keywords = flashvars[i].split('=')[1].split(',');
            var found = false;
            for (var j = 0; j < keywords.length; j++)
            {
                if (decodeURIComponent(keywords[j]) == 'yt:stretch=4:3')
                {
                    keywords[j] = encodeURIComponent('yt:stretch=16:9');
                    found = true;
                }
            }
            if (found == false)
            {
                keywords.push(encodeURIComponent('yt:stretch=16:9'));
            }
            flashvars[i] = 'keywords=' + keywords.join(',');
        }
    }
    player.setAttribute('flashvars', flashvars.join('&'));
    player.src += "";
}

function setAspectNarrow()
{
    document = unsafeWindow.document;
    var player = document.getElementById('movie_player');
    var flashvars = player.getAttribute('flashvars').split('&');
    for (var i = 0; i < flashvars.length; i++)
    {
        if (flashvars[i].indexOf('keywords') == 0)
        {
            var keywords = flashvars[i].split('=')[1].split(',');
            var found = false;
            for (var j = 0; j < keywords.length; j++)
            {
                if (decodeURIComponent(keywords[j]) == 'yt:stretch=16:9')
                {
                    keywords[j] = encodeURIComponent('yt:stretch=4:3');
                    found = true;
                }
            }
            if (found == false)
            {
                keywords.push(encodeURIComponent('yt:stretch=4:3'));
            }
            flashvars[i] = 'keywords=' + keywords.join(',');
        }
    }
    player.setAttribute('flashvars', flashvars.join('&'));
    player.src += "";
}

var target = document.getElementById('watch-actions');  

var group = document.createElement('span'); 
group.setAttribute("class", "yt-uix-button-group");
target.appendChild(group);

var button = document.createElement('input'); 
button.setAttribute("class", "start yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-default yt-uix-tooltip");
button.setAttribute("style", 'width:17px;height:2.77em;padding:0px 6px');
button.setAttribute("value", '4:3');
button.setAttribute("title", "Switch to 4:3");
button.addEventListener('click', setAspectNarrow, false);
group.appendChild(button);

var button = document.createElement('input'); 
button.setAttribute("class", "end yt-uix-tooltip-reverse  yt-uix-button yt-uix-button-default yt-uix-tooltip");
button.setAttribute("style", 'width:24px;height:2.77em;padding:0px 6px');
button.setAttribute("value", '16:9');
button.setAttribute("title", "Switch to 16:9");
button.addEventListener('click', setAspectWide, false);
group.appendChild(button);