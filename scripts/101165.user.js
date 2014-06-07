// ==UserScript==
// @name           Youtube Aspect
// @description    Adds buttons to toggle 4:3 and 16:9 aspect ratios on youtube
// @namespace      scupizzaboy
// @include        http://youtube.*/*
// @include        http://*.youtube.*/*
// @include        https://youtube.*/*
// @include        https://*.youtube.*/*
// ==/UserScript==

function setAspectWide()
{
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
    player.parentNode.innerHTML = player.parentNode.innerHTML;
}

function setAspectNarrow()
{
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
    player.parentNode.innerHTML = player.parentNode.innerHTML;
}

var target = document.getElementById('watch-actions');
var target2 = document.getElementById('watch7-secondary-actions');

var button = document.createElement('input');  
button.name = 'setAspectNarrow';  
button.type = 'button';  
button.value = '4:3';  
button.addEventListener('click', setAspectNarrow, false);
if (target != null) target.appendChild(button);
if (target2 != null) target2.appendChild(button);

var button = document.createElement('input');  
button.name = 'setAspectWide';  
button.type = 'button';  
button.value = '16:9';  
button.addEventListener('click', setAspectWide, false);
if (target != null) target.appendChild(button);
if (target2 != null) target2.appendChild(button);