// ==UserScript==
// @name           Pardus Winix Imagepack
// @namespace      www.herbal-jazz.net
// @version        1.1
// @description    Allows you to use one image pack configuration between Windows and *nix
// @include        http://*.pardus.at/*
// @author         Richard Broker (Beigeman)
// @icon           http://i175.photobucket.com/albums/w159/Beigeman/gm/pardus_logo64_cap.png
// ==/UserScript==

// ========= CUSTOMISATION =========
// These paths must be from the root to your image pack directory for both systems.
// Also, bear in mind that Unix is case sensitive, don't mistype your paths.
var unix_path = "/home/beige/pardus/images_standard/";
var win_path = "c:/pardus/images_standard/";
// =================================

// ========== DO NOT EDIT ==========
var imgs = document.getElementsByTagName('img');
var link = document.getElementsByTagName('link');
var body = document.body;
var td = document.getElementsByTagName('td');
var css = document.getElementsByTagName('style');
var table = document.getElementsByTagName('table');
var div = document.getElementsByTagName('div');
var onmouse = null;
var onload = null;
var regex;
// =================================

// ======== HERE BE DRAGONS ========
// (i.e. horribly hacky code)
for (i= 0; i < css.length;i++)
{
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (css[i].innerHTML.indexOf(unix_path != -1))
        {
            regex = new RegExp(unix_path,"g");
            css[i].innerHTML = css[i].innerHTML.replace(regex,win_path);
        }
    }
    else // Assume if not win, then unix
    {
        // An td backgroundImagee contains a windows path.
        if (css[i].innerHTML.indexOf(win_path) != -1)
        {
            regex = new RegExp(win_path,"g");
            css[i].innerHTML = css[i].innerHTML.replace(regex,unix_path);
        }
    }
}

for (i = 0; i < td.length; i++)
{
    // If the td backgroundImage has a unix path in it.
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (td[i].style.backgroundImage.indexOf(unix_path != -1))
        {
            td[i].style.backgroundImage = td[i].style.backgroundImage.replace(unix_path,win_path);
        }
        // Workaround for editing script calling attributes.
        onmouse = td[i].getAttribute('onmouseover');
        if (onmouse != null)
        {
            regex = new RegExp(unix_path, "g");
            onmouse = onmouse.replace(regex,win_path);
            td[i].setAttribute('onmouseover', onmouse);
        }
        onmouse = td[i].getAttribute('onmouseout');
        if (onmouse != null)
        {
            regex = new RegExp(unix_path, "g");
            onmouse = onmouse.replace(regex,win_path);
            td[i].setAttribute('onmouseout', onmouse);
        }
    }
    else // Assume if not win, then unix
    {
        // An td backgroundImagee contains a windows path.
        if (td[i].style.backgroundImage.indexOf(win_path) != -1)
        {
            td[i].style.backgroundImage = td[i].style.backgroundImage.replace(win_path,unix_path);
        }
        // Workaround for editing script calling attributes.
        onmouse = td[i].getAttribute('onmouseover');
        if (onmouse != null)
        {
            regex = new RegExp(win_path, "g");
            onmouse = onmouse.replace(regex,unix_path);
            td[i].setAttribute('onmouseover', onmouse);
            onmouse = null;
        }
        onmouse = td[i].getAttribute('onmouseout');
        if (onmouse != null)
        {
            regex = new RegExp(win_path, "g");
            onmouse = onmouse.replace(regex,unix_path);
            td[i].setAttribute('onmouseout', onmouse);
            onmouse = null;
        }
    }
}

for (i = 0; i < div.length; i++)
{
    // If the div backgroundImage has a unix path in it.
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (div[i].style.backgroundImage.indexOf(unix_path != -1))
        {
            div[i].style.backgroundImage = div[i].style.backgroundImage.replace(unix_path,win_path);
        }
    }
    else // Assume if not win, then unix
    {
        // An td backgroundImagee contains a windows path.
        if (div[i].style.backgroundImage.indexOf(win_path) != -1)
        {
            div[i].style.backgroundImage = div[i].style.backgroundImage.replace(win_path,unix_path);
        }
    }
}


for (i = 0; i < table.length; i++)
{
    // If the table backgroundImage has a unix path in it.
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (table[i].style.backgroundImage.indexOf(unix_path != -1))
        {
            table[i].style.backgroundImage = table[i].style.backgroundImage.replace(unix_path,win_path);
        }
    }
    else // Assume if not win, then unix
    {
        // An td backgroundImagee contains a windows path.
        if (table[i].style.backgroundImage.indexOf(win_path) != -1)
        {
            table[i].style.backgroundImage = table[i].style.backgroundImage.replace(win_path,unix_path);
        }
    }
}

// Modify the backgroundImage elements in the body.
if (navigator.appVersion.indexOf("Win")!=-1)
{
    if (body.style.backgroundImage.indexOf(unix_path) != -1)
    {
        body.style.backgroundImage = (body.style.backgroundImage.replace(unix_path,win_path));
    }    
    onload = body.getAttribute('onload');
    if (onload != null)
    {
        regex = new RegExp(unix_path, "g");
        onload = onload.replace(regex,win_path);
        body.setAttribute('onload', onload);
        onload = null;
    }
}
else
{
    if (body.style.backgroundImage.indexOf(win_path) != -1)
    {
        body.style.backgroundImage = (body.style.backgroundImage.replace(win_path,unix_path));
    }
    onload = body.getAttribute('onload');
    if (onload != null)
    {
        regex = new RegExp(win_path, "g");
        onload = onload.replace(regex,unix_path);
        body.setAttribute('onload', onload);
        onload = null;
    }
}

// Import the correct stylesheet.
for (i = 0; i < link.length;i++)
{
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (link[i].href.indexOf(unix_path) != -1)
        {
            link[i].href = (link[i].href.replace(unix_path,win_path));
        }
    }
    else // Assume if not win, then unix
    {
        // An link ref contains a windows path.
        if (link[i].href.indexOf(win_path) != -1)
        {
            link[i].href.replace(win_path,unix_path);
        }
    }
}

// Fix paths for actual image elements.
for (i = 0; i < imgs.length; i++)
{
    // If the img src has a unix path in it.
    if (navigator.appVersion.indexOf("Win")!=-1)
    {
        if (imgs[i].src.indexOf(unix_path) != -1)
        {
            imgs[i].src = (imgs[i].src.replace(unix_path,win_path));
        }
    }
    else // Assume if not win, then unix
    {
        // An img src contains a windows path.
        if (imgs[i].src.indexOf(win_path) != -1)
        {
            imgs[i].src.replace(win_path,unix_path);
        }
    }
}