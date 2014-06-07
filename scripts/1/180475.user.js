// ==UserScript==
// @name        endomondo garmin import fix
// @namespace   http://userscripts.org/users/sharkx
// @include     http://www.endomondo.com/*
// @version     3
// @grant       none
// ==/UserScript==

// ---------------------------------
// Fixes the garmin import issue on endomondo pages
// Originally written by stefanu123@gmail.com
// 
// If this script works, it was written by me (stefanu123@gmail.com) 
// Otherwise I don't know who wrote it.
//
// USE AT OWN RISK ! THIS SCRIPT HAS NOT BEEN TESTED EXTENSIVELY; ACTUALLY NOT AT ALL
// It worked for me, but it may not work for you. Don't blame me; I warned you.
//
// Feel free to distribute it wherever you think it may work; 
// Modify it if you wish; just leave the "original written by" notice.
// Drop me an email (stefanu123@gmail.com), if you need help; I will try to reply as soon as possible
// ---------------------------------

// ---------------------------------
// some script options; see comments below, too
var bSetSport = false;
var nSport = 0;

// some of the most popular sports are listed here
// 0 - Cycling, sport
// 1 - Cycling, transport
// 8 - Mountain biking
// 13 - Running

function gebcn(s, i)
{
    if (arguments.length == 1)
    {
        return document.getElementsByClassName(s);
    }
    else
    {
        return document.getElementsByClassName(s)[i];
    }
}

function gebi(s)
{
    return document.getElementById(s);
}

function setListener(){

    try
    {
        // try to fix widths and other geometry
        gebcn('box', 0).style.width = '90%';
        gebcn('box', 0).style.height = window.innerHeight*8/10 + 'px';
        gebcn('iframed', 0).style.height = window.innerHeight*8/10 + 'px';
    }
    catch (x)
    {
    }

    try
    {
        // fix IDs
        var sportElements = gebcn('sport');
        if (sportElements.length > 0)
        {        
            for(var i = 0; i < sportElements.length; i++) 
            { 
                var sportCombo = sportElements[i].childNodes[0];
                var workoutCheck = sportElements[i].parentNode.firstChild.firstChild;
                
                workoutCheck.title = workoutCheck.value;
                
                if (sportCombo.id.length > 48)
                {
                    var strId = workoutCheck.value.replace(/[-:]/g, "");
                    sportCombo.id = strId;
                    sportCombo.title = strId;
                    sportCombo.style.background = '#b8f9b8';
                    sportCombo.style.width = '120px';
    
                    if (bSetSport)
                    {
                        sportCombo.selectedIndex = nSport;
                    }
                }
            }
        }
    }
    catch (x)
    {
    }
        
    try
    {
        // fix table sizes
        var table = gebi('garminActivitiesSelection').getElementsByTagName('table');
        if (table.length > 0)
        {
            table[0].width = '60%';
            table[0].align = 'center';
        }

        var tableHeader = gebi('garminActivitiesSelection').getElementsByTagName('th');
        if (tableHeader.length > 0)
        {
            tableHeader[1].width = '80%';
            tableHeader[2].width = '20%';
        }

        gebcn('textualSelectList', 0).style.width = '80%';
    }
    catch (x)
    {
    }
    
    try
    {
        // fix progress bar and title
        gebcn('progressBar', 0).style.height = '10px';
        gebcn('progressIndicator', 0).style.height = '10px';
        gebcn('title', 0).style.padding = '0px 10px 10px';
    }
    catch (x)
    {
    }
    
    try
    {
        // fix colors
        var tableRows = gebi('garminActivitiesSelection').getElementsByTagName('tr');
        if (tableRows.length > 0)
        {        
            tableRows[0].style.background = '#808080';
            for(var i = 1; i < tableRows.length; i++) 
            { 
                if (i%2 == 0)
                {
                    tableRows[i].style.background = '#494945';
                }
            }
        }
    }
    catch (x)
    {
    }

	setTimeout(setListener,1000);
}

setListener();
