// 
// Original code from "Youtube Set Focus to the Video"
// 
// ==UserScript==
// @name          VoiceTV : Tweak FlowPlayer direct link
// @namespace     http://userstyles.org
// @description   VoiceTV Tweak FlowPlayer direct link (original code from "Youtube Set Focus to the Video")
// @author        ahha00001
// @version       1.0.11
// @license       MIT License
// @include       http://*.voicetv.co.th/*
// ==/UserScript==


var zGbl_VideoNodeAppearedTimer = '';


function LocalMain ()
{
    //--- Refactor the page title, to improve tabbed browsing.
//    var oldTitle            = document.title;
//    document.title          = "[VoiceTV] " + oldTitle;

    var zVideoShell             = document.getElementById ('player');
    if (zVideoShell)
    {
        /*--- Look for the movie node.  If flashblock is in use, it may not exist yet.
        */
        var zVideoNode          = document.getElementById ('player_api');
        if (zVideoNode)
        {
//            alert("FlashBlock is not detected");
            
            zVideoNode.focus();
            
            doAddLinks(zVideoNode);
            
        }
        else
        {
//            alert("FlashBlock is detected");
            
            /*--- Focus on the flashblock shell and setup to watch for when the video node appears.
            */
            var zFlashBlckShell = zVideoShell.getElementsByTagName ("div")[0];

            zFlashBlckShell.focus();

            zVideoShell.addEventListener ("DOMNodeInserted", FocusVideoWithDelay, false);
        }
    }
    else
    {
        throw new Error ('Oops! Unable to find the "watch-player" node on the Youtube page.', '');
    }
}


function FocusVideoWithDelay (zEvent)
{
    if (typeof zGbl_VideoNodeAppearedTimer == "number")
    {
        clearTimeout (zGbl_VideoNodeAppearedTimer);
        zGbl_VideoNodeAppearedTimer = '';
    }
//    zGbl_VideoNodeAppearedTimer     = setTimeout (function() { HandleVideoNodeAppeared (); }, 222);    //-- 222 milliseconds
    zGbl_VideoNodeAppearedTimer     = setTimeout (function() { HandleVideoNodeAppeared (); }, 444);    //-- 444 milliseconds
}


function HandleVideoNodeAppeared ()
{
    var zVideoNode = document.getElementById ('player_api');
    if (zVideoNode)
    {
        
        zVideoNode.focus();

        doAddLinks(zVideoNode);
        
    }
    else
    {
        throw new Error ('Oops! Unable to find the "player_api" node on the VoiceTV page.', '');
    }
}


function doAddLinks(aNodePlayerAPI) {
    
    var params = aNodePlayerAPI.getElementsByTagName( 'param' );
    var aConfig;
    for(var i = params.length - 1; i >= 0; i--) {
        var aNode = params[i];
        if(aNode.getAttribute("name") == "flashvars") {
            aConfig = eval(aNode.getAttribute("value"));
//            alert("aConfig is " + aConfig.toSource());
            break;
        }
    }

    var container = aNodePlayerAPI.parentNode.parentNode;
    
    var aHref;
    var aText;
    
    if(aConfig) {
        var aTargetHref = aConfig.clip.url;
        if( aTargetHref.indexOf( "http://" , 0 ) == 0) {
            aHref = aTargetHref;
        } 
//        else if( aTargetHref.indexOf( "mp4:uploads/" , 0 ) == 0) {
//            aHref = "http://stream264.voicetv.co.th/" + aTargetHref.substring(12);
//        } 
        else 
        {
//			var aBaseTargetHref = "http://stream264.voicetv.co.th/";
			var aBaseTargetHref = "http://vod.voicetv.co.th/vod/";
//			var aBaseTargetHref = aConfig.rtmp.netConnectionUrl.replace("rtmp://", "http://");

            aHref = aBaseTargetHref + aTargetHref.substring(4);
        }
        
        aText = container.baseURI + "$$$" + aConfig.clip.url;
        
    } else {
        aHref = "javascript:void(0);";
        aText = container.baseURI + "$$$";
    }
    
    var aLink = document.createElement( "a" );
    aLink.setAttribute( "href", aHref );
    aLink.innerHTML = aText;
    
    var aDiv = document.createElement( "div" );
    aDiv.id = "vtv-tweak-directlink";
    aDiv.setAttribute( "style", "position:fixed; top:5px; right: 5px; font-family: Verdana, Geneva, sans-serif; font-size: 9px; background-color: #FF9; padding: 5px 10px 5px 10px; white-space:nowrap; text-align: right; border-radius: 0px 0px 0px 10px; box-shadow: 3px 3px 3px #888888; border: medium solid #F60;" );
    aDiv.appendChild( aLink );
    
//    container.appendChild( aLink );
//    container.appendChild( aDiv );
//    aNodePlayerAPI.parentNode.parentNode.insertBefore( aDiv , aNodePlayerAPI.parentNode);
    
    // append directly to body element
    document.body.appendChild( aDiv );

}


window.addEventListener ("load", LocalMain, false);
