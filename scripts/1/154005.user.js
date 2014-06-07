// ==UserScript==
// @name       YouTube Shuffle
// @version    0.3
// @description  Integrated YouTube playlist shuffling until YouTube sorts their shit and fixes playlist shuffling themselves.
// @match      *youtube.com/*&list=*
// @copyright  2012, Charlie Wilkinson
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
function saveShuffle(playlist, value, days)
{
    var date = new Date();
    date.setDate(date.getDate() + days);
    document.cookie = "ytshuffle" + playlist + "=" + value + "; expires=" + date.toGMTString() + "; domain=youtube.com";
}
function getShuffle(playlist) 
{
    var splitCookie = document.cookie.split(';');
    
	for(var i = 0; i < splitCookie.length; i++) 
    {
        var s = splitCookie[i];
        
        var sShuffleCookieParam = "ytshuffle" + playlist + "="
        var iShuffleValIndex = s.indexOf(sShuffleCookieParam);
        
		if (iShuffleValIndex !== -1)
            return s.substring(iShuffleValIndex + sShuffleCookieParam.length);
	}
    
	return null;
}
function getSubstring(string, startIndex, endIndex)
{
    if(endIndex == -1)
        return string.substring(startIndex);
    else
        return string.substring(startIndex, endIndex);
}
var sUrl = document.URL;
var sShuffleParam = "&shuffle=";
var sListParam = "&list=";
var iShuffleParamPos = sUrl.indexOf(sShuffleParam);
var iListParamPos = sUrl.indexOf(sListParam);
var bIsShuffled = false;
var sShuffleVal = null;
var sListVal = null;
if(iListParamPos !== -1)
{
    var iListValStart = iListParamPos + sListParam.length;
    var iListValEnd = sUrl.indexOf("&", iListValStart);
    sListVal = getSubstring(sUrl, iListValStart, iListValEnd);
    
    if(iShuffleParamPos !== -1)
    {
        var iShuffleValStart = iShuffleParamPos + sShuffleParam.length;
        var iShuffleValEnd = sUrl.indexOf("&", iShuffleValStart);
        sShuffleVal = getSubstring(sUrl, iShuffleValStart, iShuffleValEnd);
        
        saveShuffle(sListVal, sShuffleVal, 1);
        
        
        bIsShuffled = true;
    }
    else
    {
        var sSavedShuffleVal = getShuffle(sListVal);
        
        if(sSavedShuffleVal !== null)
            window.location = sUrl + "&shuffle=" + sSavedShuffleVal;
    }
}
$(document).ready(function() {
    if(bIsShuffled)
    {
        $('.watch7-playlist-bar-secondary-controls').prepend('<input type="button" value="Remove Shuffle" id="RemoveShuffle">');
        
         $('.watch7-playlist-bar-secondary-controls #RemoveShuffle').click(function(){ 
                saveShuffle(sListVal, sShuffleVal, -1);
            $('.watch7-playlist-bar-secondary-controls #RemoveShuffle').prop('value','Shuffle Removed!');
        });
    }
});