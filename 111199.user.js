// Nana TV for Mac and Linux user script
// version 1.6
// 2010-08-05
// Copyright (c) 2007, 2010 Yehuda B.
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation
// files (the "Software"), to deal in the Software without
// restriction, including without limitation the rights to use,
// copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the
// Software is furnished to do so, subject to the following
// conditions:
// 
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
// OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
// HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
// WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
// FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
// OTHER DEALINGS IN THE SOFTWARE.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.6.6 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Nana TV for Mac", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Nana TV for Mac
// @namespace     http://yehudab.com
// @description   Fix display issues in Nana (Israel) TV web site for Mac and Linux computers. Version 1.6
// @include       http://*.nana10.co.il/Video/*
// @include       http://*.nana10.co.il/*/radio/*
// ==/UserScript==
function getPlayerHtml(url, width, height)
{
	GM_log(url);
	return "<a target=\"_new\" style=\"float:right;color:white;background-color:black;text-decoration:none\" href=\"" + url + "\">\u05dc\u05e6\u05e4\u05d9\u05d4 \u05d9\u05e9\u05d9\u05e8\u05d4</a><br>" +
		"<EMBED type='application/x-mplayer2' width='" + width +"' height='" + height + "' " +
		"src='" + url + "' autostart='1' showcontrols='1' loop='0'></EMBED>"; // לצפיה ישירה
}

function skipAdds(clipURL, width, height, obj)
{
	if (typeof obj == "string")
		obj = document.getElementById(obj);
	try 
	{
		window.setTimeout(function() {
	 		GM_xmlhttpRequest({
			  method:"GET",
			  url:clipURL,
			  onload:function(details) {
				if (details.status != 200)
				{
					GM_log("Unable to load video: " + clipURL, 2);
				}
				else
				{
					var videoUrl = clipURL;
					var allTags = details.responseText.match(/<[^>]+>/g);
					var i, l = allTags == null ? 0 : allTags.length;
					if (l == 0)
					{
						GM_log("asx is empty");
						return;
					}
					var inEntry = false;
					var canSkip = false;
					var tagName;
					var haveVideoURL = false;
					for (i = 0; i < l; i++)
					{
						tagName = allTags[i].match(/[a-zA-Z]+/);
						if (tagName != null)
						{
							tagName = tagName[0].toLowerCase();
							switch (tagName)
							{
							case "entry":
								if (!inEntry)
								{
									inEntry = true;
									canSkip = false;
									haveVideoURL = false;
									if (allTags[i].match(/clientskip="yes"/i))
										canSkip = true;
								}
								else
								{
									inEntry = false;
									if (canSkip && haveVideoURL)
									{
										obj.innerHTML = getPlayerHtml(videoUrl, width, height);
										return;
									}
								}
								break;
							case "param":
								paramName = allTags[i].match(/name[ ]*=[ ]*"[^"]+"/i);
								paramValue = allTags[i].match(/value[ ]*=[ ]*"[^"]+"/i);
								if (paramValue != null && paramName != null)
								{
									paramName = paramName[0].replace(/^.*"([^"]+)".*$/, "$1").toLowerCase();
									paramValue = paramValue[0].replace(/^.*"([^"]+)".*$/, "$1").toLowerCase();
									if (paramName == "canskipforward" && (paramValue == "no" || paramValue == "false"))
										canSkip = false;
									if (paramName == "title" && paramValue == "intro")
										canSkip = false;
									if (paramName == "title" && paramValue == "main clip")
										canSkip = true;
								}
								break;
							case "starttime":
								canSkip = true;
								break;
							case "ref":
								if (canSkip) 
								{
									var href = allTags[i].match(/href[ ]*=[ ]*"[^"]+"/i);
									if (href != null)
									{
										var tmpVideoUrl = href[0].replace(/^.*"([^"]+)".*$/, "$1");
										if (tmpVideoUrl.indexOf('.wmv') >= 0) {
											haveVideoURL = true;
											videoUrl = tmpVideoUrl;
										}
									}
								}
								break;
									
							}
						}
						
					}
					GM_log("Can't skip ads. Showing full video");
					obj.innerHTML = getPlayerHtml(videoUrl, width, height);
				}
			  }
			});
		}, 0);
	}
	catch (ex)
	{
		GM_log(ex);
	}
}

unsafeWindow.fixVideo = function(count)
{
	var PlayerContainer = document.getElementById("PlayerContainer");
	if (PlayerContainer == null)
		return;
	var width = PlayerContainer.offsetWidth;
	var height = PlayerContainer.offsetHeight;
	var embedIn = PlayerContainer.parentNode;
	if (width == 0 || height == 0)
	{
		width = 576;
		height= 432;
	}
	var clipURL = '';
	var directViewUrl = document.getElementById("directViewUrl");
	if (directViewUrl != null) {
		clipURL = directViewUrl.getAttribute('href');
		if (clipURL == '#') {
			if (count < 5) {
				count++;
				window.setTimeout("fixVideo(" + count + ")", 500);
				return;
			}
			else
			{
				GM_log("directViewUrl not found");
				return;
			}
		}
	}
	if (clipURL == "")
	{
		GM_log("directViewUrl not found");
		return;
	}
	skipAdds(clipURL, width, height, embedIn);
	// embedIn.innerHTML = getPlayerHtml(clipURL, width, height);
	var PlayerUI = document.getElementById("PlayerUI");
	var TimeSlider = document.getElementById("TimeSlider");
	if (PlayerUI != null && TimeSlider != null)
	{
		document.body.bgColor = "";
		PlayerUI.style.display = "none";
		TimeSlider.style.display = "none";
	}
	topLayerContainer = document.getElementById("topLayerContainer");
	if (topLayerContainer != null)
		topLayerContainer.style.display = "none";
	
}
function fixAudio()
{
	unsafeWindow.changeChannel = function(chId) {
	    document.getElementById("chName").innerHTML = "\u05DE\u05E0\u05D2\u05DF: " + unsafeWindow.channels[chId].name;
	    for (var i = 0; i < unsafeWindow.totalChannels; i++) {
	        document.getElementById("chList").childNodes[i].childNodes[0].className = "";
	    }
	    document.getElementById("chList").childNodes[chId].childNodes[0].className = "selected";
        document.getElementById("playerHolder").innerHTML = getPlayerHtml(unsafeWindow.channels[chId].url, "100%", "100%");
	    unsafeWindow.activeChannel = chId;
	}
}
function fixRefresh()
{
	unsafeWindow.PerformPageRefresh = function(){}
}
if (window.location.href.match(/video/i))
	unsafeWindow.fixVideo(0);
else if (window.location.href.match(/radio/i))
	fixAudio();
fixRefresh();