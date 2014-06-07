// ==UserScript==
// @name        DR TV - download single program
// @namespace   http://rasmuswriedtlarsen.com
// @copyright 	2014, Rasmus Wriedt Larsen
// @version     1.0.0
// @description Allows you to download a single program from DR TV (dr.dk/tv/) -- play a video and a download link will appear
// @match       http://www.dr.dk/tv/se/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

findBestDownloadTries = 0;
maxFindBestDownloadTries = 60;

addToPlayerTries = 0;
maxAddToPlayerTries = 60;

function findBestDownload ()
{
    var flashVarsArr = $('param[name=flashVars]')
    
    if (flashVarsArr.length == 0)
    {
        if (findBestDownloadTries < maxFindBestDownloadTries)
        {
        	findBestDownloadTries++;
        	setTimeout(findBestDownload, 1000);
        }
        return;
    }
    
    var flashVars = decodeURIComponent ( $('param[name=flashVars]').val() );
    
    var better = flashVars.split('&programcardResult=').slice(1).join('').split('}&').slice(0,-1).join('}&')+"}";
    
    var betterJSON = JSON.parse(better);
    
    function onlyStreaming(linkObj)
    {
        return linkObj.Target == "Streaming"
    }
    
    function createDownloadLinks(linkObj)
    {
        linkObj.dlURI = linkObj.Uri.replace(/rtmp:\/\/vod.dr.dk\/cms\/mp4:/, "http://vodfiles.dr.dk/");
        
        return linkObj;
    }
    
    function findRightAsset(Assets)
    {
        for (var i = 0; i < Assets.length; i++)
        {
            if ( Assets[i].Links != undefined )
            {
                return Assets[i]
            }
        }
    }
    
    var dlLinks = findRightAsset(betterJSON.Assets).Links.filter(onlyStreaming).map(createDownloadLinks)
    
    var highestBitrate = dlLinks.sort( function(a,b){return a.Bitrate < b.Bitrate;} )[0]
    
    $('h1').append('<a href="'+highestBitrate.dlURI+'" style="color: #f0f;">Download</a>')
};

function addEventToPlayer ()
{
    var player = $('.player-container a')
    
    if (player.length == 0)
    {
        if (addToPlayerTries < maxAddToPlayerTries)
        {
            addToPlayerTries++;
        	setTimeout(addEventToPlayer, 1000);
        }
    }
    else
    {
        player.click(findBestDownload);
    }
}

addEventToPlayer();