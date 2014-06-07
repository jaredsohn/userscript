// ==UserScript==
// @name        pure gif.tv
// @namespace   NoNameSpace
// @include     http://www.gif.tv/*
// @include     http://gif.tv/*
// ==/UserScript==


var placeIt = function()
{
    var a = document.getElementById('gif'),
        b = a.getElementsByTagName('img')[0],
        c = window.innerHeight,
        d = window.innerWidth,
        e = 0,
        f = 0,
        g = 0,
        h = 0;

    if (b != undefined)
    {
        e = parseInt(document.defaultView.getComputedStyle(b, '').getPropertyValue('height'));
        f = parseInt(document.defaultView.getComputedStyle(b, '').getPropertyValue('width'));

        if ((e != 0) && (f != 0))
        {
            g = c/2 - e/2;
            h = d/2 - f/2;

            a.style.top     = g+'px';
            a.style.left    = h+'px';
            a.style.display = 'inline';
        } else { 
            a.style.display = 'none';
        }
    }
    
    setTimeout(function()
        {
            placeIt();
        }
    , 128);
};

var purify = function()
{
    var a = document.getElementById('container'), b = a.childNodes, c;

    document.body.style.backgroundImage = 'none';
    document.body.style.backgroundColor = 'black';
    a.style.width = 'auto';

    for (var i = b.length-1; i > -1; i--)
    {
        c = b[i];
        if ((c.nodeType == 1) && (c.id != 'gif'))
            c.style.display = 'none';
    }


    b                = document.createElement('a');
    b.href           = 'javascript:getImage();';

    c                = document.getElementById('gif');
    c.style.height   = 'auto';
    c.style.width    = 'auto';
    c.style.margin   = '0';
    c.style.left     = '0';
    c.style.top      = '0';
    c.style.position = 'fixed';
    b.appendChild(c.parentNode.removeChild(c));
    a.appendChild(b);

    placeIt();
};

purify();