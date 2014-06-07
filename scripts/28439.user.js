// BBC iPlayer Radio Player Play Externally
// version 0.3
// 12-06-2008
// Copyright (c) 2005-2008, Michael Pritchard
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "BBC Radio Player Play Externally", and click Uninstall.
//
// Made thanks to http://diveintogreasemonkey.org/
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BBC iPlayer Radio Player Play Externally
// @namespace     http://www.blueghost.co.uk/bbc_rp.html
// @description   Allows you to play all content externally
// @include       http://www.bbc.co.uk/radio/aod/*/aod.shtml*
// ==/UserScript==
(function()
{
	
	var more;
	
	var bbcBaseUrl = "http://www.bbc.co.uk";
	var playExternalImgSrc = bbcBaseUrl + "/radio/aod/images/ico_realplayer.gif";
	var realAudioType = "audio/x-pn-realaudio-plugin";
	
	// load some variables
	function loadVariables(){
	    // gets the showmore area to append the link to
	    more 	= document.getElementById('showmore');
	}
	
	// checks all images for the play in real player image
	// if the page already has the link we dont need to bother getting it again
	function checkForExistingExternalLink(){
	    var imgs = document.getElementsByTagName('img');
	    for (var i=0; i < imgs.length; i++){
			if (imgs[i].src == playExternalImgSrc){
				return true;
			}
		}
		return false;
	}
	
	// create a div with the specified text
	function createTextDiv(textForDiv){
	    var div = document.createElement("div");
		div.innerHTML = textForDiv;
		return div;
	}
    
    // tries to the the link to the rpm file
    function getRpmLink(){
        // try to get the audio stream var from the web page - this usually works
	    if (unsafeWindow.AudioStream)
		{
		    return unsafeWindow.AudioStream + '.rpm';
		}
		else
		{
		    // look for the embedded audio stream
		    var emb = document.getElementsByTagName('embed');
		    for (var i=0; i < emb.length; i++)
		    {
			    if (emb[i].type == realAudioType && emb[i].src)
			    {
				    return emb[i].src;
			    }
		    }
		    return null;
	    }
    }
	
	// show the play external link
	function showPlayExternalLink(){
	    if (!checkForExistingExternalLink()){
			var src = getRpmLink();
			if (src){
				var div_text = '<div id="ext_play"><strong>Getting External Link</strong></div>';
				var addon = createTextDiv(div_text);
				more.parentNode.insertBefore(addon, more.nextSibling);
				// fetch the rpm file, its contents will be the rtsp link to the stream
				GM_xmlhttpRequest({
    				method: 'GET',
    				url: bbcBaseUrl+src,
    				headers: 
    				{
        				"User-agent": "Mozilla/4.0 (compatible) Greasemonkey",
        				"Accept": "application/atom+xml,application/xml,text/xml"
    				},
    				onload: function(responseDetails) {
					    if (responseDetails.status == 200){ //check response ok
						    addon.innerHTML = '<div id="ext_play">'+
							    '<a onclick="PlayPause();" href="'+responseDetails.responseText+'" title="Play in standalone Player">' +
							    '<img src="' + playExternalImgSrc +'" width="16" height="12" border="0" alt="Play in RealPlayer" />' +
							    'Listen using stand-alone Real Player</a>'+
							    '</div>';
					    }else{ // some error occured
						    addon.innerHTML = '<div id="ext_play">'+
							    '<img src="' + playExternalImgSrc +'" width="16" height="12" border="0" alt="File Not Available" />' +
							    '<strong>Error getting Link - Error: ' + responseDetails.status + '</strong>'+
							    '</div>';
					    }
					    more.parentNode.insertBefore(addon, more.nextSibling);
					}
				});   
			}
		}
	}
	
	//do stuff
	loadVariables();
	showPlayExternalLink();
})()