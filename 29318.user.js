// Scorehero Dog-Ear Remover
// ver 1.1
// by Daniel Lew
// 
// I got annoyed at the dog-ear on Scorehero because
// it blocks forum utilities and has always been just
// a little too wonky for my tastes.  This removes
// the dog-ear entirely and adds a link to the title.
//
// ==UserScript==
// @name           Scorehero Dog-Ear Remover
// @namespace       
// @description    Removes the dog-ear link, and places a link on the title image.
// @include        http://*scorehero.com/*
// ==/UserScript==

var isGHDomain = (window.location.host == 'www.scorehero.com');
var isForum = (window.location.href.indexOf('/forum/') > -1);

var dogEar;
var link = document.createElement("a");
var linkImage;
if (isGHDomain)
{
    dogEar = document.getElementById("switch-site-gh");
    if (!isForum)
    {
        link.href = "javascript: __utmLinker('http://rockband.scorehero.com/')";
    }
    else
    {
        link.href = "javascript: __utmLinker('http://rockband.scorehero.com/forum/')";
    }
    var images = document.getElementsByTagName("img");
    for (var a = 0; a < images.length; a++)
    {
        if (images[a].src == "http://www.scorehero.com/images/title2.gif" 
                && images[a].alt == "ScoreHero")
        {
            linkImage = images[a];
            break;
        }
    }

    // Fugly hover psuedo class needs to be removed.
    var head = document.getElementsByTagName("head")[0];
    if (head)
    {
        link.className = "destroyerOfUgly";
        var newStyle = document.createElement("style");
        newStyle.type = "text/css";
        newStyle.innerHTML = "a.destroyerOfUgly:hover {background: none;}";
        head.appendChild(newStyle);
    }
}
else
{
    if (!isForum)
    {
        dogEar = document.getElementById("switch-site");
        linkImage = document.getElementById("sh-rb-logo").childNodes[0];
        link.href = "javascript: __utmLinker('http://www.scorehero.com')";
    }
    else
    {
        // Sigh, we have to handle RB forums differently because
        // it is COMPLETELY different...
        var divs = document.getElementsByTagName("div");
        for (var a = 0; a < divs.length; a++)
        {
            if (divs[a].className == "switch-1" || divs[a].className == "switch-2")
            {
                divs[a].parentNode.removeChild(divs[a]);
                a--;  // Compensate for having removed a node.
            }
        }
        link = document.getElementById("sh-rb-logo").childNodes[0];
        link.href = "javascript: __utmLinker('http://www.scorehero.com/forum/')";
    }
}

if (dogEar && (isGHDomain || !isForum))
{
    dogEar.parentNode.removeChild(dogEar);
    
    if (linkImage)
    {
        linkImage.parentNode.insertBefore(link, linkImage);
        linkImage.parentNode.removeChild(linkImage);
        linkImage.style.border = 0;
        link.appendChild(linkImage);
    }
}
