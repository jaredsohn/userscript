// Twixxer
// Brian Shaler
// Awesome
// Copyright?
// Nah. Awesomeness is enough of a reward in and of itself.
// --------------------------------------------------------------------
// ==UserScript==
// @name          Twixxer - by Brian Shaler
// @namespace     http://twixxer.com/
// @description   Adds photo and video sharing to Twitter!
// @include       http://twitter.com/*
// @include       https://twitter.com/*
// ==/UserScript==

var toReplace = new Array();
var currentTwixxer;
var currentVersion = 2.1;

function replaceMe(targ)
{
  newd = document.createElement("div");
  newd.style.margin = "25px 10px";
  targ.parentNode.parentNode.appendChild(newd);
  toReplace[toReplace.length] = {ref: newd, url: targ.href};
  newd.innerHTML = "<img alt=\"Loader\" src=\"http://static.twitter.com/images/loader.gif\" />";
}

function populateNextTwixxer ()
{
  tx = toReplace.pop();
  currentTwixxer = tx;
  url = tx.url.split("twixxer.com/").join("twixxer.com/get/");
  url = url.split("twxr.us/").join("twixxer.com/get/");
  if (url.indexOf("flickr.com") > 0)
  {
    url = "http://twixxer.com/flickr.php5?myPhoto=" + url;
  }
  GM_xmlhttpRequest({ method: 'GET', url: url, headers: {'Accept': 'application/xml,text/xml' },
    onload: function(responseDetails)
    {
      if (currentTwixxer)
      {
        currentTwixxer.ref.innerHTML = responseDetails.responseText;
        //currentTwixxer.ref.style.cssFloat = "left";
        currentTwixxer = undefined;
        if (toReplace.length > 0)
        {
          populateNextTwixxer();
        }
      }
    }
  });
}

function HurryRunGoGo ()
{

var trsx = document.getElementsByTagName("tr");
var trs = new Array();
for (i=0; i<trsx.length; i++)
{
    trs.push(trsx[i]);
}
divs = document.getElementsByTagName("div");
for (i=0; i<divs.length; i++)
{
  if (divs[i].className == "desc hentry" || divs[i].className == "desc")
  {
    trs[trs.length] = divs[i];
  }
}
entries = new Array();
for (i=0; i<trs.length; i++)
{
  if (trs[i].className == "hentry" || trs[i].className == "hentry hentry_hover")
  {
    entries[entries.length] = trs[i].getElementsByTagName("span")[0];
  } else
  if (trs[i].className == "desc hentry" || trs[i].className == "desc")
  {
    entries[entries.length] = trs[i].getElementsByTagName("p")[0];
  }
}

for (i=0; i<entries.length; i++)
{
  atags = entries[i].getElementsByTagName("a");
  for (j=0; j<atags.length; j++)
  {
    h = atags[j].href;
    h = h.split("://www.flickr.com/").join("://flickr.com/");
    if (((h.substring(0, 18) == "http://twixxer.com" && h.length > 19) || (h.substring(0, 14) == "http://twxr.us" && h.length > 15)) && !(h.indexOf(".php") > 0) && !(h.indexOf(".js") > 0))
    {
      replaceMe(atags[j]);
    } else
    if (h.indexOf("flickr.com/photos/") > 0 && h.split("/").length > 5)
    {
      replaceMe(atags[j]);
    }
  }
}

if (toReplace.length > 0)
{
  populateNextTwixxer();
}

}

var twixxerIframe;
var twixxerIframeVisible = false;
function showIframe ()
{
  if (twixxerIframeVisible)
  {
    twixxerIframe.style.display = "none";
    twixxerIframeVisible = false;
  } else
  {
    if (!twixxerIframe)
    {
      twixxerIframeHolder = document.createElement("div");
      twixxerIframeHolder.className = "info";
      document.getElementById("doingForm").appendChild(twixxerIframeHolder);
      twixxerIframe = document.createElement("iframe");
      twixxerIframe.style.width = "90%";
      twixxerIframe.style.height = "260px";
      twixxerIframe.style.border = "solid 1px #999999";
      twixxerIframeHolder.appendChild(twixxerIframe);
    }
    twixxerIframe.style.display = "";
    twixxerIframe.src = "http://twixxer.com/upload.php5?v="+currentVersion+"&twitter_username="+getUserName();
    twixxerIframeVisible = true;
  }
}

mypage = document.getElementsByTagName("body")[0].id;
if (mypage == "home" || mypage == "public_timeline" || mypage == "replies")
{
  newa = document.createElement("a");
  newa.innerHTML = "Twixxer";
  newa.style.padding = "5px 10px";
  if (mypage == "replies")
  {
    newa.style.cssFloat = "right";
    newa.style.position = "relative";
    newa.style.top = "-12px";
    newa.style.right = "12px";
  } else
  {
    newa.style.margin = "0px 0px 0px 460px";
  }
  newa.href = "#";
  newa.className = "section_links";
  newa.addEventListener('click', showIframe,false);
  document.getElementById("doingForm").appendChild(newa);
}

tinies = [];
urlshorteners = ["http://tinyurl.com/", "http://snurl.com/", "http://is.gd/", "http://ping.fm/"];
for (j=0; j<urlshorteners.length; j++)
{
	//turl = "http://tinyurl.com/";
	turl = urlshorteners[j];
	var atags = document.getElementsByTagName("a");
	for (i=0; i<atags.length; i++)
	{
		if (atags[i].href.substring(0, turl.length) == turl)
		{
			tinies.push(atags[i]);
		}
	}
}

var thisTiny;
function lookupTiny()
{
  thisTiny = tinies.shift();
  var url = "http://twixxer.com/tinyurl.php5?url="+thisTiny.href;
  GM_xmlhttpRequest({ method: 'GET', url: url, headers: {'Accept': 'application/xml,text/xml' },
    onload: function(responseDetails)
    {
      if (thisTiny && responseDetails.responseText.length > 12 && responseDetails.responseText != "error")
      {
        thisTiny.href = responseDetails.responseText;
      }
      thisTiny = undefined;
      if (tinies.length > 0)
      {
        lookupTiny();
      } else
      {
        HurryRunGoGo();
      }
    }
  });
}

function getUserName ()
{
	str = "";
	links = document.getElementsByTagName("a");
	for (var i=0; i<links.length; i++)
	{
		if (links[i].innerHTML == "your profile")
		{
			str = links[i].href;
			str = str.split("http://twitter.com/").join("");
		}
	}
	return str;
}

if (tinies.length == 0)
{
	HurryRunGoGo();
} else
{
	lookupTiny();
}

