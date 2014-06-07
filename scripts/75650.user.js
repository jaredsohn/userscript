//
//  Kevin And Bean Archive fixer.
//  Created by ScriptKeeper.   Random rights reserved. ;-)
//
//--------------------------------------------------------------------------
//
//  This is a Greasemonkey script for the "Kevin And Bean Archive" site.
//
//  The search results of this site have a bunch of useless clutter and are spewed in
//  a barely readable format and in random order!
//
//  The links are also frequently "staled" and lead to MicroCrap-specific "playlist" files --
//  that must be opened to find the PROPER link to content.
//
//  This script kills the worst of the useless bits, sorts the results by date, and fetches the
//  correct links.
//
//--------------------------------------------------------------------------
//
//  To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
//  Install Greasemonkey then restart Firefox and revisit this script.
//  Greasemonkey will popup and ask you if you want to install the script.
//  Click the "Install" button when it becomes active.
//
//  To uninstall, go to Tools -> Greasemonkey -> Manage User Scripts,
//  select "Kevin And Bean Archive fixer", and click "Uninstall".
//
//--------------------------------------------------------------------------
//
// ==UserScript==
// @name            Kevin And Bean Archive fixer
// @namespace       http://www.kevinandbeanarchive.com/
// @author          ScriptKeeper
// @description     Fixes the atrocious search results from the Kevin And Bean Archive.
// @include         http://kevinandbeanarchive.com/audio.php?*
// @include         http://www.kevinandbeanarchive.com/audio.php?*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==
//


function fixTheSite_Main ()
{
    /*--- Kill all <small> and <br> tags, since it's crap we'll never want or need. ---
        This page has atrocious layout and informantion 'scent'; thus the need
        for such crude measures,
    */
    killTagsByName ('small');
    killTagsByName ('br');
    killTagsByName ('img');     //-- Don't need overly large twitter logo.


    //--- Of course, search pages have completely differnt file-list format than daily pages.
    if (/search/i.test (document.location.search) )
    {
        sortTagsBySpecialCriteriaAndFixLinks ("li");
    }
    else
    {
        //--- This hyper-crappy layout has the payload links in the first <td> element (no info scent)
        var zContCell   = $("td:first");
        var zPayload    = zContCell.find ("a");
        zPayload.addClass ("DecentLinks");

        //--- Fix hyperlinks
        zPayload.each
        (
            function ()
            {
                /*--- Change href...
                    FROM:
                        ?dir=audio/-------September%2017%20Friday-------&file=07%20Adam%20Carolla-2010-09-17.mp3
                    TO:
                        /audio/-------September%2017%20Friday-------/07%20Adam%20Carolla-2010-09-17.mp3
                */
                var jNode   = $(this);
                var sTmp    = jNode.attr ("href");
                sTmp        = sTmp.replace (/\?dir=/, "/");
                sTmp        = sTmp.replace (/.file=/, "/");
                sTmp        = sTmp.replace (/\&/g, "/");
                sTmp        = sTmp.replace (/\/amp;?\//g, "/");

                jNode.attr ("href", sTmp);
            }
        );

        //--- Sort links in place.
        zPayload.sort (SortPayloadLinks).appendTo (zContCell);

        function SortPayloadLinks (zA, zB)
        {
             if      (zA.text()  >  zB.text() )
                return 1;
             else if (zA.text()  <  zB.text() )
                return -1;
             else
                return 0;
        }
    }


    /*--- Now make the payload a little more obvious. ---
    */
    {
        var sCrappyHTML         = document.body.innerHTML;
        //-- This text is just floating directly in the body node!
        document.body.innerHTML = sCrappyHTML.replace (/RESULTS:/, '<hr><div id="RezHeader">Matching Show Segments (Newest first):</div>');
    }
}


function killTagsByName (sTagName)
{
    var zTargTags   = document.getElementsByTagName (sTagName);
    if (zTargTags)
    {
        var iNumTargTags    = zTargTags.length;

        for (var iTargTagNum=iNumTargTags-1;  iTargTagNum >= 0;  iTargTagNum--) //-- Kill the last, first, to avoid orphan problems.
        {
            var zTargTag    = zTargTags[iTargTagNum];
            if (zTargTag)
            {
                zTargTag.parentNode.removeChild (zTargTag);
            }
        }
    }
}


function sortTagsBySpecialCriteriaAndFixLinks (sTagName)
{
    var zTargTags   = document.getElementsByTagName (sTagName);
    if (zTargTags)
    {
        var iNumTargTags    = zTargTags.length;
        var aTagValues      = [];

        /*--- Copy list items to an array for processing.
        */
        for (var iTargTagNum=0;  iTargTagNum < iNumTargTags;  iTargTagNum++)
        {
            aTagValues[iTargTagNum]     = zTargTags[iTargTagNum].innerHTML;
        }


        /*--- Sort the array by our custom criteria.
        */
        aTagValues.sort (sortByEmbeddedDateDescending);


        /*--- Fix the freaking hyperlinks.
        */
        for (var iTargTagNum=0;  iTargTagNum < iNumTargTags;  iTargTagNum++)
        {
            var sTmp                = aTagValues[iTargTagNum];
            sTmp                    = sTmp.replace (/audio.php\?dir=/, "/");

            /*--- This next is not working!!!
                Also, replace is doing weird things with that ampersand.  The stuff,
                after this comment, works.
            aTagValues[iTargTagNum] = sTmp.replace (/\&file=/, "/");
            */
            sTmp = sTmp.replace (/.file=/, "/");
            sTmp = sTmp.replace (/\&/g, "/");
            aTagValues[iTargTagNum] = sTmp.replace (/\/amp;?\//g, "/");
        }


        /*--- Replace the page nodes with the ordered and cleaned version.
        */
        for (var iTargTagNum=0;  iTargTagNum < iNumTargTags;  iTargTagNum++)
        {
            zTargTags[iTargTagNum].innerHTML   = aTagValues[iTargTagNum];
        }
    }
}


function sortByEmbeddedDateDescending (sA, sB)
{
    var aDates, sKeyTextA, sKeyTextB;

    /*--- Extract the LAST valid date. ---
    */
    aDates          = sA.match (/\d{4}-{1,2}\d{2}-{1,2}\d{2}/g);    //-- Date format:  2010-12-04
    if (aDates)
        sKeyTextA   = RegExp.lastMatch;         //-- "RegExp.lastMatch" are special javascript keywords.
    else
        sKeyTextA   = '0000-00-00';             //-- Undated stuff goes last.

    aDates          = sB.match (/\d{4}-{1,2}\d{2}-{1,2}\d{2}/g);
    if (aDates)
        sKeyTextB   = RegExp.lastMatch;
    else
        sKeyTextB   = '0000-00-00';


    /*--- Now sort by dates, descending. ---
    */
    if      (sKeyTextA < sKeyTextB)
        return 1;
    else if (sKeyTextA > sKeyTextB)
        return -1;
    else
    {
        /*--- This is a special case.  If two items are the same date, subsort alphabetically (NOT desc).
        */
        sKeyTextA   = sA.replace (/<[^<>]+>/g, "");     //-- Leaves just the innertext of the hyperlink.
        sKeyTextB   = sB.replace (/<[^<>]+>/g, "");

        if      (sKeyTextA > sKeyTextB)
            return 1;
        else if (sKeyTextA < sKeyTextB)
            return -1;
        else
            return 0;
    }
}


window.addEventListener ("load", fixTheSite_Main, false);


GM_addStyle
(
   'li, .DecentLinks                        \
    {                                       \
        margin:         0.3ex 0 0.3ex 5em;  \
        font-family:    verdana;            \
        font-size:      18px;               \
        font-weight:    normal;             \
        line-height:    150%;               \
    }                                       \
    .DecentLinks                            \
    {                                       \
        display:        block;              \
    }                                       \
    #RezHeader                              \
    {                                       \
        margin:         1.5em 0 0.5em 2em;  \
        font-family:    verdana;            \
        font-size:      22px;               \
        font-weight:    bold;               \
    }                                       \
   '
);


GM_addStyle ("big {display: block;}");  //-- Compensate for misuse of <big> elements.

