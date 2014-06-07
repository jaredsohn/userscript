// ==UserScript==
// @name eRepAutoSub
// @namespace http://www.erepublik.com/en/citizen/profile/1701149
// @version 0.041
// @author EvGenius http://www.erepublik.com/en/citizen/profile/1701149
// @include http://www.erepublik.com/*
 // ==/UserScript==

const MediaMogulListURL = "http://www.erepublik.com/en/article/media-mogul-project-autosubscriber-894992/1/20";
const ScriptDownloadURL = "http://userscripts.org/scripts/show/55582";
const ScriptVersion = [0, "041"]; // major part as a number, minor part as a string
const MMTag = "MediaMogulLinks"; // newspaper list must be in [MMTag]...[/MMTag]
const ScriptTitle = "Media Mogul Project v" + ScriptVersion[0] + "." + ScriptVersion[1];


var MediaMogulUrls = [];
var MediaMogulCurrentIndex = false;
var token = false;

const UserAgent = navigator.userAgent.toLowerCase();
if (UserAgent.indexOf("firefox") == -1)
{
	if (UserAgent.indexOf("opera") != -1)
	{
		GM_log = opera.postError;
	}
	
	GM_xmlhttpRequest = function (params)
	{
		var ajax = new XMLHttpRequest ();
		
		ajax.onreadystatechange = function ()
		{
			if (ajax.readyState == 4)
			{
				var details = {responseText: ajax.responseText, status: ajax.status};
				if(ajax.status == 200)
				{
					if (params.onload)
					{
						params.onload (details);
					}
				}
				else
				{
					if (params.onerror)
					{
						params.onerror (details);
					}
				}
			}
    };

		ajax.open (params.method, params.url, true);
		if (params.headers)
		{
			for (x in params.headers)
			{
				ajax.setRequestHeader (x, params.headers[x]);
			}
			if (params.data)
			{
				ajax.setRequestHeader ("Content-length", params.data.length);
				ajax.setRequestHeader ("Connection", "close");
			}
		}
		
		ajax.send (params.data ? params.data : null);
	}
}

function InformerWrite (text)
{
	document.getElementById("MediaMogulInformer").innerHTML = 
		"Number of newspapers: " + MediaMogulUrls.length + "<br />"
		+ "Current Newspaper: " + (MediaMogulCurrentIndex + 1) + "<br />"
		+ text;
}

function ShowInformer ()
{
	var newdiv = document.createElement("div");
	var header = document.getElementById("container");
	newdiv.setAttribute ("id", "MediaMogulInformerBorder");
	newdiv.style.backgroundColor = "black";
	newdiv.style.left = "0px";
	newdiv.style.width = "100%";
	newdiv.style.zIndex = "30000";
	newdiv.style.position = "fixed";
	header.appendChild (newdiv);
	
	var contentbox = document.createElement ("div");
	contentbox.setAttribute ("id", "MediaMogulInformer");
	contentbox.style.background = "#EEE";
	contentbox.style.margin = "2px";
	contentbox.style.padding = "2px 5px";
	newdiv.appendChild (contentbox);
}

function HideInformer ()
{
	document.getElementById ("container").removeChild (
		document.getElementById ("MediaMogulInformerBorder"));
}

function getToken ()
{
	InformerWrite ("Getting token...");
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: MediaMogulUrls[0],
		onerror: function (responseDetails)
		{
			alert ("Error: " + responseDetails.responseText);
			HideInformer();
		},
		onload:function(details)
		{
			// Token: <input type="hidden" id="_token" name="_token" value="e9ab07f1b850c158e7b061405c686bbf" />
			token_match = /name=\"_token\" value=\"([0-9a-z]+)\" \/>/.exec (details.responseText);
			token = token_match[1];
			
			InformerWrite ("Token found");
			
			StartSubscribing ();
		}
	});
}

function StartSubscribing ()
{
	if (MediaMogulCurrentIndex >= MediaMogulUrls.length)
	{
		alert ("Subscription finished");
		HideInformer ();
		return;
	}
	
	InformerWrite ("Subscribing to newspaper \"" + MediaMogulUrls[MediaMogulCurrentIndex] + "\"...");
	
	var newspaper_id = /[0-9]+/.exec (MediaMogulUrls[MediaMogulCurrentIndex]);
	
	GM_xmlhttpRequest({
		method:"POST",
		url:"http://www.erepublik.com/subscribe",
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "_token=" + token + "&type=subscribe&n=" + newspaper_id,
		onerror: function (responseDetails)
		{
			alert ("Error: " + responseDetails.responseText);
			MediaMogulCurrentIndex = false;
			HideInformer();
		},
		onload:function(details)
		{
			InformerWrite ("Subscribe OK");
			MediaMogulCurrentIndex++;
			StartSubscribing ();
		}
	});
}


function EnableMediaMogulMode ()
{
	if (!confirm ("You are about to turn on Media Mogul Mode. "
		+ "It may take some time. If you want to cancel you can refresh or close this page. Proceed?")) return;
	
	MediaMogulUrls = [];
	
	GM_xmlhttpRequest ({
		method: "GET",
		url: MediaMogulListURL,
		onerror: function (x)
		{
			alert ("Error downloading newspaper list");
		},
		onload: function (details)
		{
			//GM_log (details.responseText);
			pattern = new RegExp ("\\[" + MMTag + "\\]([\\s\\S]*)\\[/" + MMTag + "\\]");
			links_matches = pattern.exec (details.responseText);
			if (!links_matches)
			{
				alert ("Error in downloaded newspaper list. Try again.");
				return;
			}
			links = links_matches[1];
			
			version_matches = /\[Version=([0-9]+)\.([0-9]+)\]/i.exec (links);
			if (!version_matches)
			{
				alert ("Error while checking version number. Try again.");
				return;
			}
			
			major = parseInt (version_matches[1]);
			minor = version_matches[2];
			if (major > ScriptVersion[0] || (major == ScriptVersion[0] && minor > ScriptVersion[1]))
			{
				if (confirm ("There is a newer version of this script. Would you like to install it?"))
				{
					window.location = ScriptDownloadURL;
					return;
				}
			}
			
			pattern = /<a href="([^\"]+)"/g;
			while (next_link = pattern.exec (links))
			{
				MediaMogulUrls.push (next_link[1]);
			}
			
			ShowInformer();
			MediaMogulCurrentIndex = 0;
			
			getToken();
		}
	});
	
	return false;
}

function ShowMediaMogul ()
{
	MediaMogulBox = document.createElement ("div");
	MediaMogulBox.title = ScriptTitle;
	MediaMogulBox.className = "item";
	
	MediaMogulIcon = document.createElement ("a");
	MediaMogulIcon.style.background = "url('http://i26.tinypic.com/33bpwjm.gif') no-repeat";
	MediaMogulIcon.innerHTML = "<span style=\"smalldotted\">MM</span>";
	MediaMogulIcon.style.height = "21px";
	MediaMogulIcon.style.paddingLeft = "27px";
	MediaMogulIcon.style.cursor = "pointer";
	MediaMogulBox.appendChild (MediaMogulIcon);
	
	maildisplay = document.getElementById ("maildisplay");
	maildisplay.insertBefore (MediaMogulBox, maildisplay.firstChild);
	
	MediaMogulIcon.addEventListener ("click", EnableMediaMogulMode, false);
}

window.addEventListener ('load', ShowMediaMogul, false);
