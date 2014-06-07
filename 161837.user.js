// ==UserScript==
// @name		Page eNumberator
// @namespace		yoryenathan
// @description		Adds floating numbers to pages with a number in their url to increase or decrease it, for to the next or previous episode, results page, or whatever. The script searches for the last number found in the url, so it doesn't work for all cases. Also allows navigation using Ctrl+Left and Ctrl+Right
// @include		*
// @grant		metadata
// @run-at		document-end
// @version		2
// ==/UserScript==
// Created by YoryeNathan@gmail.com

// <-- Start of user settings -->

// Set this (true/false) to control whether Ctrl + left and right arrow keys act as the < and > links.
var ENABLE_ARROWS_NAVIGATION = true;

// Set this (true/false) to swap between the functionality of < and >. False means that < is previous and > is next.
var SWAP_RIGHT_LEFT_NAVIGATION = false;

// <-- End of user settings -->

if (window.top === window.self)
{
    var url = window.location.toString();
    var num = 0;
    var mod = 1;
    var digits = 0;

    for (i=url.length-1;i>=0;i--)
    {
        var c = getNum(url.charAt(i));
    
        if (c != -1)
        {
            while (c != -1)
            {
                i--;
                digits++;
                num += c * mod;
                mod *= 10;
                c = getNum(url.charAt(i));
            }
        
            break;
        }
    }

    if (digits > 0)
    {
        i++;

        var dir = 1;
    
        if (SWAP_RIGHT_LEFT_NAVIGATION)
        {
            dir = -1;
        }
        
        var prevNum = (num - dir).toString();
        var nextNum = (num + dir).toString();
    
        while (prevNum.length < digits)
        {
            prevNum = "0" + prevNum;
        }
    
        while (nextNum.length < digits)
        {
            nextNum = "0" + nextNum;
        }
    
        var pre = url.substring(0, i);
        var post = url.substring(i + digits);
    
        var prev = pre + prevNum + post;
        var next = pre + nextNum + post;
    
        var x = document.createElement ('div');
        x.innerHTML =
            "<span style='position: fixed; top: 0; z-index: 1000000000; font: 12px verdana; text-decoration:none; " +
                "background-color: white; padding: 3px; border: 1px solid black; color: black;'>" +
                    "<a id='eNumberatorPrev' href='" + prev + "' style='margin: 3px; text-decoration:none; color: black;'>&#60;</a>~" +
                        "<a id='eNumberatorNext' href='" + next + "' style='margin: 3px; text-decoration:none; color: black;'>&#62;</a></span>";
        x.setAttribute('style', 'text-align: center;');
        document.body.appendChild(x);
    }

    if (ENABLE_ARROWS_NAVIGATION)
    {
        document.onkeydown = returnKey;
    }
}

function getNum(i)
{
    return "0123456789".indexOf(i);
}

function returnKey(e)
{
    if (e.target != document.body || !e.ctrlKey || e.shiftKey || e.altKey)
    {
        return;
    }
    
    switch (e.keyCode)
    {
        case 37: // left
        {
            document.getElementById('eNumberatorPrev').click();
            break;
        }
        case 39: // right
        {
            document.getElementById('eNumberatorNext').click();
            break;
        }
        default:
        {
            return;
        }
    }
}