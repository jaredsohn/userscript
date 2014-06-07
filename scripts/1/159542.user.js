// ==UserScript==
// @name                [TS] deviantART DeviationWatch Load All
// @namespace           TimidScript
// @description         Loads all deviations in Inbox DeviantWatch
// @include             http://www.deviantart.com/messages/*
// @version             1.0.11
// @require             http://userscripts.org/scripts/source/159301.user.js
// @resource  meta      http://userscripts.org/scripts/source/159542.meta.js
// @icon                data:image/png;base64,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
// ==/UserScript==


/*
**************************************************************************************************
Copyright © TimidScript
TimidScript's Homepage:         http://userscripts.org/users/159542
Script's Homepage:              http://userscripts.org/scripts/show/166159

------------------------------------
 Version History
------------------------------------
1.0.11
 - Cleaned up header and comments
 - Changed USO ID

1.0.10
 - Update script to work with new DeviantArt changes
 - Changed userscript URL page due to a spam review and a dead install counter.
 - Changed the name

1.0.9
 - Bug Fix: URL hostname changed from my.deviantart.com to www.deviantart.com

1.0.8  (09-03-2013)
 -Button is not shown if there is only one page.

1.0.7  (07-03-2013)
 -Bug: It seems DeviantArt has stopped the ability to remove thumbnails or hide them. That's
    what's been causing issues since 1.0.3.  New mechanism is made.
 -Replaced the whole code. Made it based on interval checking instead of event listener.

1.0.6
 -Bug: When you click Deviations for the first time and then the "Display all Devations"
    it does not load the last set of thumbnails. Reason is unknown. You can avoid this by clicking
    something from the inbox menu then back to "Deviations", after you press the button all 
    deviations will load on the table.
 -Small fix, displays a error log if deviations are not all loaded as error is captured now.

1.0.5 (05/03/2013)
 -Changed the way it gets the thumbnails. It now waits for the nav link bar to be added
    before it tries to load all thumbnails in once go into the table.         
 -OffSet is set according to the first time the button pressed. Had a mechanism where it was 
    used but decided to remove it. It is still in place for future assurance. 
 -Increased the time wait between each load to 1000ms
    
1.0.3 (26/02/2013)
 -Added 500ms timeout between each page fetch.
 -Added summary box at the bottom.

1.0.2 (25/02/2013)
 -Changed the behaviour. You now need to press the button
    to get a table of all images.     
 -No need to set offset. It no longer uses it
 -New Feature: You are able to drag and drop thumbnails to Favourites 
 -New Feature: Set hideInbox to true if you wish to hide it when view deviations
**************************************************************************************************
*/

console.info("DeviantScript");
var deviationCount = 0;
var offSet = 0;
var pageCount = 0;
var timeout = 1000; //Timeout between each fetch of Next page.
var intervalIDWait;
var intervalIDCheck;
var hideInbox = false;

var gmi = document.getElementById("gmi-ResourceStream");
var table = document.createElement("table");



CheckURL();
document.addEventListener("DOMSubtreeModified", CheckURL, true);


/*
=========================================================================================================
    Checks URL of document to see if its deviations first page. 
=========================================================================================================*/
function CheckURL()
{
    if (document.getElementsByClassName("alink nav2").length > 0 && (document.URL == "http://www.deviantart.com/messages/#view=deviations" || document.URL == "http://www.deviantart.com/messages/#view=deviations&page=1"))
    {
        if (!document.getElementById("deviantScriptButton"))
        {
            button = document.createElement("button");
            button.id = "deviantScriptButton"
            button.setAttribute("style", "width: 100%; height: 25px;");
            button.textContent = "Display all Deviations";            
            button.onclick = LoadTable;
            gmi = document.getElementById("gmi-ResourceStream");
            gmi.parentNode.insertBefore(button, gmi);
            table.style.height = 0;
            table.innerHTML = "";

        }
    }
    else if (document.getElementById("deviantScriptButton"))
    {
        document.getElementById("deviantScriptButton").parentElement.removeChild(document.getElementById("deviantScriptButton"));
    }
}

/*
=========================================================================================================
    Removes unwanted bars. 
=========================================================================================================*/
function RemoveUnwantedBars()
{
    var el = document.getElementById("sidebar-you-know-what");
    if (el) el.parentNode.removeChild(el);

    el = document.getElementById("overhead-you-know-what");
    if (el) el.parentNode.removeChild(el);

    if (hideInbox)
    {
        el = document.getElementsByClassName("f messages-left")[0];
        if (el) el.parentNode.removeChild(el);
    }
}

/*
=========================================================================================================
    Gets deviation count from title div
=========================================================================================================*/
function DeviationsCount()
{
    var titles = document.body.getElementsByClassName("mczone-title");


    for (var i = 0; title = titles[i].textContent, i < titles.length; i++)
    {
        if (title.indexOf("Deviations") > 0)
        {
            return title.match(/^\d+/)[0];
        }
    }

    return -1;
}


/*
=========================================================================================================
    Loads deviations into the table     
=========================================================================================================*/
function LoadTable(event)
{
    deviationCount = 0;
    offSet = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation").length;

    table.setAttribute("style", "width: 100%; height: 100px; padding: 0px 25px 0px 25px");
    table.innerHTML = "";
    gmi.parentNode.insertBefore(table, gmi);
    RemoveUnwantedBars();
    pageCount = 0;
    intervalIDCheck = setInterval(CheckIfImagesAreLoaded, 200);
    //GetThumbnails();
    //GetNextPage();
}


/*
=========================================================================================================
    Imitates mouse click on next
=========================================================================================================*/
var dispatchMouseEvent = function (target, var_args)
{
    var e = document.createEvent("MouseEvents");
    // If you need clientX, clientY, etc., you can call
    // initMouseEvent instead of initEvent
    e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
    target.dispatchEvent(e);
};


/*
=========================================================================================================
    Places thumbnail into table
=========================================================================================================*/
function GetThumbnail(thumbnail)
{
    //console.log(thumbnail.getAttribute("marked"));
    if (!thumbnail.getAttribute("marked"))
    {
        thumbnail.setAttribute("marked", "true");
        var thumb = thumbnail.getElementsByClassName("thumb")[0];
        var d = document.createElement("div");
        d.innerHTML = thumbnail.innerHTML;

        d.setAttribute("style", "width: 210px; display: inline-block; vertical-align:middle; text-align:center; margin-right: 5px; margin-bottom: 5px;");

        table.appendChild(d);
        deviationCount++;
        d.getElementsByClassName("mcb-app")[0].innerHTML = "<strong>" + deviationCount + "</strong>";
        //thumbnail.innerHTML = "";
        //thumbnail.setAttribute("style", "display: none !important;");  // Does not work
    }
}

/*
=========================================================================================================
    Parses through the thumbnails after display deviations button is pressed
=========================================================================================================*/
function GetThumbnails()
{
    var thumbnails = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation");
    var errorCount = 0;
    pageCount++;
    for (var i = 0; i < thumbnails.length; i++)
    {
        try
        {
            GetThumbnail(thumbnails[i]);
        }
        catch (err) { errorCount++; }
    }

    if (errorCount > 0) console.error("Failed to add " + errorCount + " thumbnails from page " + pageCount);
}

/*
=========================================================================================================
    Gets next page if any otherwise returns false
=========================================================================================================*/
function GetNextPage()
{
    var next = document.getElementsByClassName("r page");
    //console.log(next);
    if (next.length > 0)
    {
        next = next[0];
        console.log(next.href);
        var evt = document.createEvent("MouseEvents");
        evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        next.dispatchEvent(evt);
        return true;
    }
    return false;
}

function AddSummaryBar()
{
    d = document.createElement("div");
    p = document.createElement("p");
    d.setAttribute("style", "width:100%; text-align:center;  border: outset; background-color: #A6C1C0;");
    d.appendChild(p);
    p.setAttribute("style", "width:100%; text-align:center; ");
    table.appendChild(d);


    if (DeviationsCount() != deviationCount)
        p.innerHTML = "<strong style=\"color:red;\">ERROR: </strong> Only got " + deviationCount + " out of " + DeviationsCount();
    else
        p.textContent = "Got " + deviationCount + " out of " + DeviationsCount();
}

function CheckIfImagesAreLoaded()
{
    var nav = document.getElementsByClassName("alink nav2");    
    if (nav && nav.length == 1)
    {
        thumbnails = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation");
        images = gmi.getElementsByTagName("img");        
        if (thumbnails.length <= images.length)
        {            
            clearInterval(intervalIDCheck);
            GetThumbnails();
            if (GetNextPage()) intervalIDCheck = setInterval(CheckIfImagesAreLoaded, 200);
            else //Reached last page
            {
                console.log("Hiding GMI as unable to remove thumbnails");
                var thumbnails = gmi.getElementsByClassName("mcbox ch mcbox-thumb mcbox-thumb-deviation");
                for (var i = 0; i < thumbnails.length; i++)
                {
                    thumbnails[i].innerHTML = "";
                }
                AddSummaryBar();
            }
        }
    }
}
