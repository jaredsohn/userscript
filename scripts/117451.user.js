// ==UserScript==
// @name          WifiAmp
// @namespace     
// @author        Thomas Kekeisen (http://thomaskekeisen.de)
// @description   Pauses winamp when a youtube video starts playing using wifiamp (http://socialbit.de/wifiamp)
// @include       *
// @exclude       *.jpg
// @exclude       *.png
// @exclude       *.swf
// @exclude       *.bmp
// @exclude       *.htaccess
// @exclude       *.jpeg
// @exclude       *.gif
// ==/UserScript==


// Tested in firefox






// Set up some new css
var newCSS = ((<><![CDATA[
    #wifiAmpSettings            
    {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;                
        height: 100%;  
        background: rgba(0, 0, 0, 0.75); 
        z-index: 1337;   
        display: none;     
    }
    #wifiAmpSettings *
    {
        z-index: 1337;    
    }  
    #wifiAmpSettings fieldset
    {
        width: 360px;
        height: 152px;
        padding: 20px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -76px 0 0 -200px;
        background: #FFF;
        -moz-border-radius: 10px;
        box-shadow: 5px 5px 5px #000;
    }
    #wifiAmpSettings fieldset legend
    {
        position: absolute;
        top: -45px;
        left: 0;
        color: #FFF;
        font: 18px arial;
    }
    #wifiAmpSettings fieldset label,
    #wifiAmpSettings fieldset input
    {
        float: left;
        margin: 0 0 10px 0;
    }
    #wifiAmpSettings fieldset label
    {
        clear: left;
        display: block;
        font: 14px arial;
        width: 100px;
    }
    #wifiAmpSettings fieldset input
    {
        width: 248px;
        border: 1px solid #000;
        height: 26px;
        padding: 0 5px 0 5px;
    }
    #wifiAmpSettings fieldset input[type=button]
    {
        height: auto;
        width: 360px;
	    font-family: Arial, Helvetica, sans-serif;
	    font-size: 14px;
	    color: #ffffff;
	    padding: 10px 20px;
	    background: -moz-linear-gradient(top, #e86c14 0%, #e64615);
	    background: -webkit-gradient(linear, left top, left bottom, from(#e86c14), to(#e64615));
	    border-radius: 10px;
        -moz-border-radius: 10px;
	    -webkit-border-radius: 10px;
	    border: 1px solid #000;
	    -moz-box-shadow: 0px 1px 3px rgba(000,000,000,0.5),inset 0px 0px 1px rgba(255,255,255,0.6);
	    -webkit-box-shadow: 0px 1px 3px rgba(000,000,000,0.5), inset 0px 0px 1px rgba(255,255,255,0.6);
	    text-shadow: 0px -1px 0px rgba(000,000,000,0), 0px 1px 0px rgba(255,255,255,0.2);
        cursor: pointer;
    }
]]></>).toString());

// Add the css
GM_addStyle(newCSS);

// Set up some new html code
var newHTML = ((<><![CDATA[
    <div id="wifiAmpSettings">
      <fieldset>
        <legend>WifiAmp settings</legend>
        <label for="wifiAmpServer">Server:</label>
        <input id="wifiAmpServer" name="wifiAmpServer" value="" >
        <label for="wifiAmpPort">Port:</label>
        <input id="wifiAmpPort" name="wifiAmpPort" value="" >
        <label for="wifiAmpPassword">Password:</label>
        <input id="wifiAmpPassword" name="wifiAmpPassword" value="" >
        <input type="button" id="wifiAmpSaveButton" name="wifiAmpSaveButton" onclick="wifiAmpSaveButtonPressed()" value="Save and Close" />
      </fieldset>    
    </div>
]]></>).toString());

// Get the body
var body = document.getElementsByTagName('body')[0];

// Add the html
body.innerHTML = body.innerHTML + newHTML;

// Fill the text fields
document.getElementById('wifiAmpServer').value   = GM_getValue('wifiAmpServer',   'http://127.0.0.1');
document.getElementById('wifiAmpPort').value     = GM_getValue('wifiAmpPort',     '5555');
document.getElementById('wifiAmpPassword').value = GM_getValue('wifiAmpPassword', '');

// Append the click function
unsafeWindow.wifiAmpSaveButtonPressed = function()
{
    setTimeout(function() 
    {
        // Save the settings
        GM_setValue('wifiAmpServer',   document.getElementById('wifiAmpServer').value);
        GM_setValue('wifiAmpPort',     document.getElementById('wifiAmpPort').value);
        GM_setValue('wifiAmpPassword', document.getElementById('wifiAmpPassword').value);

        // Re-append the settings
        appendSettingsInUnsaveWindow();
    }, 0);

    // Hide the settings
    document.getElementById('wifiAmpSettings').style.display = 'none';
}

// The settings function
var showSettings = function ()
{
    // Show the settings
    document.getElementById('wifiAmpSettings').style.display = 'block';
}

// Register the menu command
GM_registerMenuCommand( "WifiAmp settings", showSettings);

// Set up a function to append the settings in the unsafe window
var appendSettingsInUnsaveWindow = function()
{
    unsafeWindow.unsafeWindowWifiAmpServer   = GM_getValue('wifiAmpServer',  'http://127.0.0.1');
    unsafeWindow.unsafeWindowWifiAmpPort     = GM_getValue('wifiAmpPort',    '5555');
    unsafeWindow.unsafeWindowWifiAmpPassword = GM_getValue('wifiAmpPassword', '');
}

// Append the settings
appendSettingsInUnsaveWindow();

// Insert some javascript to fix some scoping problems
var jsToInject  = ( (<><![CDATA[
    // When the player state changed
    var stateChanged = function (state)
    {
        // One more wrapping to fix just some more scoping problems...
        stateChangedGM(state);
    }

    // The youtube player is ready
    var onYouTubePlayerReady = function (playerId)
    {
        // Get the player
        var playerNode = document.getElementById(playerId);

        // Append the event listener
        playerNode.addEventListener
        (
            'onStateChange',
            '(function(state) { return stateChanged(state); })'
        );
    }
]]></>).toString () );

// Add the header
// Thanks to: http://stackoverflow.com/questions/7971930/how-to-call-youtube-flash-api-of-existing-videos-using-greasemonkey
function addJS_Node (text, s_URL)
{
    var scriptNode                      = document.createElement ('script');
    scriptNode.type                     = "text/javascript";
    if (text)  scriptNode.textContent   = text;
    if (s_URL) scriptNode.src           = s_URL;

    var targ    = document.getElementsByTagName('head')[0]
                || document.body
                || document.documentElement;
    targ.appendChild (scriptNode);
}
addJS_Node (jsToInject);

// A second wrapper which has GM_functions available
unsafeWindow.stateChangedGM = function(state)
{
    // Check whether we got a usable state
    if (state != -1 && state != 3 && playerStateBuffer[playerCounter] != state)
    {

        // -1 = Unstarted
        // 0  = Stopped
        // 1  = Playing
        // 2  = Paused
        // 3  = Buffering

        // Some debug output
        console.log('The state changed to: ' + state);

        // TODO: Password
        
        // Build the server url
        var serverUrl = unsafeWindow.unsafeWindowWifiAmpServer + ':' + unsafeWindow.unsafeWindowWifiAmpPort + '/';
        
        // TODO: Cache previous state to prevent double calls

        // Check whether the player is playing
        if (state == 1)
        {
            serverUrl = serverUrl + 'winamp.pauseIfPlaying';
        }
        // The player is paused or stopped
        else if (state == 2 || (state == 0 && playerStateBuffer[playerCounter] != 2))
        {
            serverUrl = serverUrl + 'winamp.playIfPaused';
        }

        // Some debug output
        console.log('The server url: ' + serverUrl);

        setTimeout(function() 
        {
            GM_xmlhttpRequest({
              method: "GET",
              url: serverUrl,
              onload: function(response) {
           
              }
            });
        }, 0);

        // Update the buffer
        playerStateBuffer[playerCounter] = state;
    }
}

// Set up a player counter
var playerCounter = 0;

// Set up a player state buffer
var playerStateBuffer = [];

// Get all embed objects
var embedObjects = document.getElementsByTagName('embed');

// Check whether we found some objects
if (embedObjects.length > 0)
{
    // Iterate all objects
    for (i in embedObjects)
    {
        // Get the current object
        var currentObject = embedObjects[i];

        // Get the source link
        var sourceLink = currentObject.src;

        // Check whether this is a youtube player
        if (sourceLink && sourceLink.indexOf('youtube') > -1)
        {
            // Set up the parameters
            var parameters = '&enablejsapi=1&version=3&playerapiid=wifiamp' + playerCounter;

            // Enable the api
            currentObject.src += parameters;

            // Get the parent node
            var objectNode = currentObject.parentNode;

            // Add the id
            currentObject.id = 'wifiamp' + playerCounter;

            // Get all param objects
            var paramObjects = objectNode.getElementsByTagName('param');

            // Iterate all param objects
            for (i in paramObjects)
            {
                // Get the param obejct
                var paramObject = paramObjects[i];

                // Check whether we got a value
                if (paramObject.value)
                {
                    // Get the value
                    var paramValue = paramObject.value;

                    // Check whether the value is a youtube link
                    if (paramValue.indexOf('youtube') > -1)
                    {
                        // Enable the api
                        paramObject.value += parameters;
                    }
                }
            }

            // Set up the state buffer entry
            playerStateBuffer[playerCounter] = -1;

            // Increase the player count
            ++playerCounter;
        }
    }
}