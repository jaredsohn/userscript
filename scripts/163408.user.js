// ==UserScript==
// @name           Swyter Tweaks for Pandora
// @description    Provides non-stop music and puts the current song and artist on the title bar. \
//                 Additionally removes advertising, unblocks lyrics, provides a persistent skin selector, enforces the Pandora One layout and places a convenient download button. Nothing more, nothing less.
// @include        http*://www.pandora.com/*
// @version        2013.06.20
// @updateURL      https://userscripts.org/scripts/source/163408.meta.js
// @downloadURL    https://userscripts.org/scripts/source/163408.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// ==/UserScript==

function thingie()
{
	/* find if the I'm listening button exists and click it if does */
	listen=document.getElementsByClassName("still_listening");
	
	if (listen.length > 0)
	{
		listen[0].click();
	}
	
	/* unlock lyrics */
	lyrics=document.querySelector(".lyricsText.unselectable");
	
	if (lyrics != null)
	{
		for (var i=lyrics.attributes.length; i-->0;)
		{
			lyrics.removeAttributeNode(lyrics.attributes[i]);
		}
		lyrics.classList.add("lyricsText");
	}
	
	/* direct the download link to the current song, redundant -- but should fix fixefox's strange behavior on mouse down (?) */
	download=document.getElementById("swydwnld");
	
	download.href=($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.src);
	download.download=mysong.text+"-"+artist.text+"."+($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.formatType || "m4a");
	
	/* calls itself every 6s */
	setTimeout(thingie,6*1000);
}

/* set the Pandora One centered layout */
document.documentElement.classList.add("width-p1-noAds");

/* get rid of the in-page advertising container */
if(ads=document.getElementById("ad_container"))
{
	ads.parentNode.removeChild(ads);
}

/* let's hook the AJAX requests and filter out the audio ads and user tracking */
XMLHttpRequest.prototype.upon = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method,url)
{
	if(url.match(/proxyAdRequest|mediaserverPublicRedirect|brokenAd|stats|andomedia|tritondigital|doubleclick|imrworldwide|scorecardresearch|analytics/) != null)
	{
		console.info("Audio ad intercepted!",arguments);
		this.abort();
	}
	else
	{
		this.upon.apply(this,arguments);
	}
}

/* pick the song and artist fields */
mysong=document.getElementsByClassName("playerBarSong")[0];
artist=document.getElementsByClassName("playerBarArtist")[0];

/* add a download button for the current song */
document.getElementsByClassName("buttons")[1].innerHTML+="<a id='swydwnld' \
                                                         target='_blank' \
                                                          class='button btn_bg' \
                                                          style='text-decoration:none; font-size:11px; width:52px; padding-left:3px; color:inherit;'> \
                                                         <span style='background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAMCAYAAAC0qUeeAAAA6klEQVR42o2QvQ6CMBSFuzk4OLojccCGAkZNFKQwEPCnZfEBnHxB38LER/AR1EkXpd5bfyJGjDc5adp+57T3EvJWDpd7a5AW7W6m3Egq3JOqcrg4U3+mbNR4jioqYTfKj2DQIAOZ/bQa9rg8PWEUHU3VXzALwOD/gF0uDywU+gsI02FWhhkXa+z6LlHgFLS4noaeCL4IASvSTJI6C+XWi+QFGlRunKuXAfcgMGyIadZ0umF0G2DYOXF+fRq8xwrnBxpnrdJ36EDYcLF/JBUa5F/AV4NBZmESGjDZ4pOU/KpksYyxqU6Y9j7vbuvheB+14VYeAAAAAElFTkSuQmCC) no-repeat 2px 1px;padding-right:17px;'></span>Download</a>";
download=document.getElementById("swydwnld");
download.addEventListener("mouseover",function(e)
{
	e.target.href=($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.src);
	e.target.download=mysong.text+"-"+artist.text+"."+($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.formatType || "m4a");
})

/* backup the original title */
original_title=document.title;

/* whenever the info dock changes */
info=document.getElementsByClassName("info")[0];
info.addEventListener("DOMNodeInserted",function()
{
	/* set the title bar to the current song */
	document.title=(mysong.text.length > 0 &&
	                artist.text.length > 0) ? ("Now playing «"+mysong.text+"» by «"+artist.text+"»") : original_title;

	/* direct the download link to the current song, redundant -- but should fix fixefox's strange behavior on mouse down (?) */
	download=document.getElementById("swydwnld");
	
	download.href=($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.src);
	download.download=mysong.text+"-"+artist.text+"."+($.jPlayer.prototype.instances.jp_0.data('jPlayer').status.formatType || "m4a");
})

/* unlock theme chooser */
sknTab=document.getElementById("skinTab");
sknTab.style.display="inherit";

/* create a new css link and pin it on the document's head, we'll be using it later */
link=document.createElement("link");
link.rel="stylesheet";

document.head.appendChild(link);


/* ugly jquery callback, launched whenever a theme-preview-button-thingie is clicked */
$(document).on("mouseup",".skin_definition_container",function(e)
{

    /* pick our id from .skin_definition_container > a > img[src="/preview_{skinid}.png"] */
	skin_name=e.currentTarget.children[0].children[0].src.match(/preview_(.+)\.png$/)[1];
	
	/* a few of the preview ids don't match with their css counterparts, if that's the case, fallback... to the pandora designers: that's malapraxis */
	skin_name=(
	{    "default": "pandoraone",
	      "cosmic": "cosmicrift",
	         "sea": "deepseadisco"
    }[skin_name]) || skin_name;

	skin_set();
	
	console.log("New theme selected!",skin_name);
})


function skin_set()
{
	/* set our previously made CSS link to the selection */
	link.href="http://www.pandora.com/static/pandora_one/skins/"+skin_name+"/skin.css";
	
	/* store as persistent preference */
	try{ GM_setValue('swyPandoraTheme', skin_name) }catch(e){ localStorage['swyPandoraTheme']=skin_name}
}

/* restore a theme in case it has been selected previously. ugly, i know */
try{ skin_name = GM_getValue('swyPandoraTheme') || skin_name }catch(e){ skin_name = localStorage['swyPandoraTheme'] || skin_name }; skin_set()

/* call the recurrent function */
thingie();