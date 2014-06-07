// ==UserScript==
// @name       Man Dinh
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Checks to see if Dan Dinh has started or stopped streaming, and prompts user to go to his stream
// @match      http://*/*
// @copyright  2012+, You
// ==/UserScript==


//Create new date object
var time = new Date();

//If (same day AND 8 hours later) OR 
//	 (different day AND today's hours + balance of previous day's hours >= 8)
if ( ((time.getDate() == GM_getValue("prevDate", 0)) && (time.getHours() >= GM_getValue("prevHours", 0) + 8)) || 
     ((time.getDate() != GM_getValue("prevDate", 0)) && (time.getHours() + (23 - GM_getValue("prevHours", 0)) >= 8)) )
{
    //Reset to "not streaming"
 	GM_setValue("isStreaming", 0);   
}

//Set new values for previous date and hours
GM_setValue("prevDate", time.getDate());
GM_setValue("prevHours", time.getHours());


//Send HTTP GET request to solomid streams page and examine response
GM_xmlhttpRequest(
{
    method: "GET",
    url: "http://www.solomid.net/streams.php",
    onload: function(response) 
    {
        if (GM_getValue("isStreaming", 0) == 0 && response.responseText.indexOf("livestream.php?s=2726") > -1)
        //If Dan's stream was not previously listed and now is, toggle stream status and prompt user to go to stream
        {
			GM_setValue("isStreaming", 1);
            if (confirm("Dan Dinh is now streaming. Proceed to stream?"))
            {
             	location.href = "http://www.twitch.tv/dandinh";
            }
        }
        else if (GM_getValue("isStreaming", 0) == 1 && response.responseText.indexOf("livestream.php?s=2726") == -1)
        //If Dan's stream was previously listed and now is not, toggle stream status and alert user
        {
            GM_setValue("isStreaming", 0);
            alert("Dan Dinh is no longer streaming.");
        }
    }
}); 