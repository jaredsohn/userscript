// ==UserScript==
// @name       TAMMP - The Allied Media Mogul Project for eRepublik (Poland)
// @version    0.03 - translation 3
// @namespace  http://www.erepublik.com/en/organization/1766330
// @author     EvGenius - translation lukasznaw
// @include    http://www.erepublik.com/*
 // ==/UserScript==

const MediaMogulListURL = "http://www.erepublik.com/en/article/-the-allied-media-mogul-project-list-of-participating-newspapers-updated-daily-896104/1/20";
var MediaMogulUrls = [];
var MediaMogulCurrentIndex = false;

function InformerWrite (text)
{
	document.getElementById("MediaMogulInformer").innerHTML = 
		"Ilość gazet: " + MediaMogulUrls.length + "<br />"
		+ "Numer obecnie subskrybowanej gazety: " + (MediaMogulCurrentIndex + 1) + "<br />"
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

var token = false;

function getToken ()
{
	InformerWrite ("Pobieram dane...");
	
	GM_xmlhttpRequest({
		method:"GET",
		url:MediaMogulUrls[0],
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
		alert ("Subskrybowanie zakończone");
		HideInformer ();
		return;
	}
	
	InformerWrite ("Subskrybowanie gazety \"" + MediaMogulUrls[MediaMogulCurrentIndex] + "\"...");
	
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
			InformerWrite ("Subskrybowanie zakończone");
			MediaMogulCurrentIndex++;
			StartSubscribing ();
		}
	});
}


function EnableMediaMogulMode ()
{
	if (!confirm ("Chcesz włączyć tryb Media Mogul - TAMMP. "
		+ "To może zająć trochę czasu. Jeśli chcesz anulować, odśwież lub zamknij tą stronę. Kontynuować?")) return;
	
	GM_xmlhttpRequest({
		method:"GET",
		url:MediaMogulListURL,
		onerror:function(x)
		{
			alert ("error");
		},
		onload:function(details)
		{
			links_matches = /\[TAMMP\]([^]*)\[\/TAMMP\]/.exec (details.responseText);
			links = links_matches[1];
			var pattern = /<a href="([^\"]+)"/g;
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
	MediaMogulBox.title = "The Allied Media Mogul Project v0.03";
	MediaMogulBox.className = "item";
	
	MediaMogulIcon = document.createElement ("a");
	MediaMogulIcon.style.background = "url('http://i26.tinypic.com/33bpwjm.gif') no-repeat";
	MediaMogulIcon.innerHTML = "<a class=\"smalldotted\">MM</a>";
	MediaMogulIcon.style.height = "21px";
	MediaMogulIcon.style.paddingLeft = "27px";
	MediaMogulIcon.style.cursor = "pointer";
	MediaMogulBox.appendChild (MediaMogulIcon);
	
	maildisplay = document.getElementById ("maildisplay");
	maildisplay.insertBefore (MediaMogulBox, maildisplay.firstChild);
	
	MediaMogulIcon.addEventListener ("click", EnableMediaMogulMode, false);
}

window.addEventListener ('load', ShowMediaMogul, false);