//
//  Note, this script is a highly specific, one-off, on request.
//  It is not meant to be a robust utility for every need; modify it as you see fit.
//
// ==UserScript==
// @name            Fizy.com, audio results only
// @namespace       http://www.fizy.com/
// @description     This script just restricts the search results to the audio type only.
// @include         http://fizy.com/*
// @include         http://www.fizy.com/*
// @include         https://fizy.com/*
// @include         https://www.fizy.com/*
// ==/UserScript==
//

var zGbl_ResultsAddedTimer      = '';
var bGbl_FilterForAudioOnly     = true;


function LocalMain ()
{
    /*--- Only fire if we have search results.
    */
    var zSearchResults          = document.getElementById ('results');
    if (zSearchResults)
    {
        zSearchResults.addEventListener ("DOMNodeInserted", SelectSearchOptionsWithDelay, false);

        /*--- Turn off the auto-audio, if the user clicks on one of the other two options.
            Turn it back on if the user clicks on audio.
        */
        var zAllbutton          = document.getElementById ('c_all');
        var zVideobutton        = document.getElementById ('c_video');
        var zAudiobutton        = document.getElementById ('c_audio');

        zAllbutton.  addEventListener ("click", function() {SetAutoAudioMode (false);},   false);
        zVideobutton.addEventListener ("click", function() {SetAutoAudioMode (false);},   false);
        zAudiobutton.addEventListener ("click", function() {SetAutoAudioMode (true);},    false);
    }
    else
    {
        throw new Error ('Oops! Unable to find the "results" node on the Fizy page.', '');
    }
}


function SetAutoAudioMode (bFilterForAudioOnly)
{
    bGbl_FilterForAudioOnly = bFilterForAudioOnly;

    if (!bFilterForAudioOnly)
    {
        var zInfoTxt                    = document.getElementById ('idInfoText');
        if (zInfoTxt)
        {
            zInfoTxt.style.visibility   = 'hidden';
        }
    }
}


function SelectSearchOptionsWithDelay (zEvent)
{
    if (!bGbl_FilterForAudioOnly)   return;

    if (typeof zGbl_ResultsAddedTimer == "number")
    {
        clearTimeout (zGbl_ResultsAddedTimer);
        zGbl_ResultsAddedTimer  = '';
    }
    zGbl_ResultsAddedTimer      = setTimeout (function() { HandleResultsAdded (); }, 333);    //-- 333 milliseconds
}


function HandleResultsAdded ()
{
    if (!bGbl_FilterForAudioOnly)   return;

    /*--- Only fire if "audio" type is not already selected.
    */
    var zMediaTypeNode          = document.getElementById ('c_audio');
    if (zMediaTypeNode)
    {
        if (!zMediaTypeNode.checked)
        {
            if (typeof (unsafeWindow.fizy) != "undefined")
            {
                unsafeWindow.fizy.setType ('audio'); //-- fizy.setType() is loaded by fizy.com

                /*--- Alert the user.
                */
                var zFilterBox                  = document.getElementById ('playall-button-container');
                if (zFilterBox)
                {
                    var zInfoTxt                = document.getElementById ('idInfoText');
                    if (!zInfoTxt)
                    {
                        zInfoTxt                = document.createElement ('span');
                        zInfoTxt.id             = 'idInfoText';
                        zInfoTxt.innerHTML      = 'Results filtered to audio only.';
                        zFilterBox.appendChild (zInfoTxt);
                    }

                    zInfoTxt.style.visibility   = 'visible';
                }
                //unsafeWindow.fizy.toggleFilter();
            }
            else
            {
                throw new Error ('Oops! Unable to find the "fizy" functions!', '');
            }
        }
    }
    else
    {
        throw new Error ('Oops! Unable to find the "c_audio" node on the Fizy page.', '');
    }
}


window.addEventListener ("load", LocalMain, false);

