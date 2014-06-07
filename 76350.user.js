// ==UserScript==
// @name			Embedifier
// @description		Places hyperlinks to embed linked images and videos from some popular sites.
// @include			*reddit.com/*
// @include			*chan.org/*
// @include			*google.com/*
// @exclude			*google.com/images?*
// @exclude			*google.com/imgres?imgurl=*
// @author			Glayden
// @version			1.9.01
// ==/UserScript==

/*OPTIONS*/

/*sets the max-width for images in px*/ 
var maxwidth = 750;

/*sets whether or not links that have been found elsewhere should be posted again*/
var allowDupeLinks = true;

/*sets whether or not to automatically links*/
var autoEmbedImages = false;
var autoEmbedVideos = false;

/*disable embedifying for videos from...*/
var disableYoutube = false;
var disableVimeo = false;
var disableCollegeHumor = false;
var disableDailyMotion = false;
var disableMetacafe = false;
var disableLiveLeak = false;
var disableGoogleVideo = false;
var disableFunnyOrDie = false;

/*ADVANCED AUTO EMBEDDING OPTIONS: assumes auto-embedding is turned on*/
/*sets the number of images/videos which should be auto-embedded before a warning is presented*/
var embedWarningCount = 40;
/*Not recommended on some sites: ignores the warning, equivalent to setting embedWarning count to infinity*/
var ignoreWarning = false;
/*Never asks to embed ALL, but still asks whether to continue after every set of embedWarningCount (<-the #) auto-embeds*/
var heedWarning = false;
/*Presents no dialogues. Simply stops after embedWarningCount (<-the #) auto-embed*/
var justStop = false;

/*ADVANCED DISPLAY OPTIONS*/
var assumeProperUnicodeSupport = true;
var is_chrome = (navigator.userAgent.toLowerCase().indexOf('chrome') > -1);

var s_open = ">";
var s_close = "<";
var s_destroy = "X";
	
if(is_chrome || assumeProperUnicodeSupport)
{
	s_open = "&#8921;";
	s_close = "&#8920;";
	s_destroy = "&#10007;";
}

/*sets the text to be displayed for an image hyperlink*/
var imgLinkText = s_open;
/*sets the text to be displayed for a duplicate image hyperlink (assuming allowDupeLinks = true)*/
var imgLinkDupeText = s_open;
/*sets the text to be displayed for an image hyperlink*/
var imgLinkUndoText = s_close;
/*sets the text to be displayed for a duplicate image hyperlink (assuming allowDupeLinks = true)*/
var imgLinkDupeUndoText = s_close;

/*sets the text to be displayed for a video hyperlink*/
var vidLinkText = s_open;
/*sets the text to be displayed for a duplicate video hyperlink*/
var vidLinkDupeText = s_open;
/*sets the text to be displayed for a video hyperlink to undo its embedding*/
var vidLinkUndoText = s_close;
/*sets the text to be displayed for a duplicate video hyperlink to undo its embedding*/
var vidLinkDupeUndoText = s_close;

/*sets the text to be displayed for the complete embed removal for images*/
var imgRemText = s_destroy;
/*sets the text to be displayed for the complete embed removal for videos*/
var vidRemText = s_destroy;

/*ADVANCED STYLING*/
var stilo = "display: block; max-width: " + maxwidth + "px;";
var vidLinkStilo = "text-decoration:none; font-weight:normal; background-color:#9696FF; color: #FFFFFF; font:verdana, arial;";
var imgLinkStilo = "text-decoration:none; font-weight:normal; background-color:#FFFFFF; color: #9696FF; font:verdana, arial;";
var vidRemLinkStilo = vidLinkStilo;
var imgRemLinkStilo = imgLinkStilo;

/*REDDIT SPECIAL*/
var nsfwCommentLinkCheck = true;
var nsfwVidLinkStilo = "text-decoration:none; font-weight:normal; background-color:#FF9696; color: #FFFFFF; font:verdana, arial;";
var nsfwImgLinkStilo = "text-decoration:none; font-weight:normal; background-color:#FFFFFF; color: #FF9696; font:verdana, arial;";
var nsfwVidRemLinkStilo = nsfwVidLinkStilo;
var nsfwImgRemLinkStilo = nsfwImgLinkStilo;

/*WORKING CODE*/

var s = document.getElementsByTagName("a");
var s2 = document.getElementsByTagName("img");
var randNum = Math.floor(Math.random()*999999999999)*1000;
var count = randNum;
var vidCount = randNum;
var embedCount = 0;
var iurls = new Array();
var vurls = new Array();
for(var i=0; i<s2.length; i++)
{
	var m = s2[i];
	if(m.width >= maxwidth)
	{
		var str = m.src;
		var str5 = str.substring(str.length-5, str.length).toLowerCase();
		var str4 = str5.substring(1, str.length);
		var newURL = 1;
		for(var j=0; j<iurls.length; j++)
		{
			if(str == iurls[j])
			{
				newURL = 0;
				j = iurls.length;
			}
		}
		if(newURL == 1)
		{
			iurls.push(str);
			embedCount++;
		}
	}
}

/*
Dear Programmers,

My apologies for any obtrusiveness and general ugliness in the code below...
(Please don't yell at me, unless of course you're also volunteering to help rewrite it. ;] )
My excuse is that this was essentially my "hello world" for javascript
so it developed (mutated) as I picked things up

Eventually (when I have time) I'll rewrite it and it won't make you cry.
Until then, please don't hurt me.

(P.S. I swear I'll learn regex)
*/
var currCount = 0;
var autoEmbedded = 0;
var vidID ="";



function atSite(site)
{
	var domn = document.domain.toLowerCase();
	var wloc = window.location.href.toLowerCase();
	var tmp = wloc.indexOf(site+ "/");
	var domainEnd = wloc.indexOf("/",10);
	return ((tmp > -1) && (tmp < domainEnd)) || !(domn.indexOf(site) && domn.indexOf("www." + site));
}

var domn = document.domain.toLowerCase();
var wloc = window.location.href.toLowerCase(); 
var domainEnd = wloc.indexOf("/",10);

var tmp = wloc.indexOf("chan.org/");
var atChan = ((tmp > -1) && (tmp < domainEnd)) || !domn.indexOf("chan.org");
if(atChan)
{
	allowDupeLinks = false;
}

var atReddit = atSite("reddit.com");
var atImgur = atSite("imgur.com");
var atDigg = atSite("digg.com");
var atYouTube = atSite("youtube.com");
var atVimeo = atSite("vimeo.com");
var atCollegeHumor = atSite("collegehumor.com");
var atDailyMotion = atSite("dailymotion.com");
var atMetacafe = atSite("metacafe.com");
var atLiveLeak = atSite("liveleak.com");
var atGoogleVideo = atSite("video.google.com");
var atFunnyOrDie = atSite("funnyordie.com");


for(var i=0; i<s.length; i++)
{
	var vidSite ="";
	var contDupe = false;
	var m = s[i];
	var str = m.href;
	var strLC = str.toLowerCase();
	var str5 = str.substring(str.length-5, str.length);
	var str4 = str5.substring(1, str5.length);
	var dupe = (m.id.substring(0,6) == "imgNum");
	var imageFile = ((str4 == ".gif")||(str4 == ".png")||(str4 == ".jpg")||(str4 == ".bmp")||(str5 == ".jpeg")) && (strLC.indexOf("/wiki/file:") == -1);
	var imgurExcep = !strLC.indexOf("http://imgur.com/") && (str.charAt(str.length - 1) != "/") && !atImgur && (str.indexOf("/a/") == -1);
	var embeddedBig = false;
	var ignoreLink = false;
	var nsfwLink = false;
	if(imgurExcep && !imageFile)
	{
		var qMarkPos = str.indexOf("?");
		if(qMarkPos != -1)
		{
			str = str.substring(0,qMarkPos);
		}
		str = str + ".jpg";
		strLC = str.toLowerCase();
	}
	if(atReddit || atDigg)
	{
		if(m.innerHTML.indexOf("<img") != -1)
		{
			ignoreLink = true;
		}
	}
	if(ignoreLink)
	{	
	}
	else if(!dupe && (imageFile || imgurExcep))
	{
		var htext = imgLinkText;
		var htext2 = imgLinkUndoText;
		for(var j=0; j<iurls.length; j++)
		{
			if(iurls[j] == str)
			{
				if(j<embedCount)
				{
					embeddedBig = true;
				}
				contDupe = true;
				htext = imgLinkDupeText;
				htext2 = imgLinkDupeUndoText;
			}
		}
		if(atReddit && nsfwCommentLinkCheck)
		{
			if(m.parentNode.innerHTML.toLowerCase().indexOf("nsfw") != -1)
			{
				nsfwLink = true;
			}
			else if(m.parentNode.className == "title")
			{
				var cuz = m.parentNode.parentNode.childNodes[2];
				if(cuz.innerHTML.toLowerCase().indexOf("nsfw") != -1)
				{
					nsfwLink = true;
				}
			}
		}
		if(!embeddedBig && (allowDupeLinks||!contDupe))
		{
			var imgStyle;
			var imgRemStyle;
			if(nsfwLink == true)
			{
				imgStyle = nsfwImgLinkStilo;
				imgRemStyle = nsfwImgRemLinkStilo;
			}else{
				imgStyle = imgLinkStilo;
				imgRemStyle = imgRemLinkStilo;
			}
			
			tmp = count + "' style='" + imgStyle + "' href='javascript:";
			var tmp2 = "(" + count + ", \"" + str + "\", \"" + stilo + "\", \"" + htext + "\", \"" + htext2 + "\")'>";
			var linkSpan = document.createElement("span");
			linkSpan.innerHTML = "<a id='linkImg" + tmp + "embedImage" + tmp2 + htext + "</a>";
			var mageDiv = document.createElement("div");
			mageDiv.innerHTML = "<a id='imgNum" + count + "'></a>";
			if((autoEmbedImages) && !(nsfwLink || contDupe))
			{
				if((!ignoreWarning) && (currCount == embedWarningCount))
				{
					if(!heedWarning)
					{
						ignoreWarning = confirm("WARNING: There are already " + autoEmbedded + " images/videos loading do you want to auotembed them ALL?");
					}
					if(!ignoreWarning && !justStop)
					{
						heedWarning = true;
						justStop = confirm("There are " + autoEmbedded + " images/videos loading. Do you want to embed up to another " + embedWarningCount + "?");
						if(!justStop)
						{
							currCount = 0;
						}
					}
				}
				if (ignoreWarning||(currCount < embedWarningCount))
				{
					linkSpan.innerHTML = "<a id='linkImg" + tmp + "undoImgEmbed" + tmp2 + htext2 + "</a>";
					mageDiv.innerHTML = "<a id='imgNum" + count + "' href='javascript:undoImgEmbed" + tmp2 + "<img style='" + stilo + "' src='" + str + "' border='0'></a>";
					currCount++;
					autoEmbedded++;
				}
			}
			var par = m.parentNode;
			var remImgLinkSpan = document.createElement("span");
			remImgLinkSpan.id = "remImg" + count;
			remImgLinkSpan.innerHTML = "<a href = 'javascript:remImgEmbed(" + count + ")' style='" + imgRemStyle + "'>" + imgRemText + "</a>";
			par.insertBefore(linkSpan, m);
			par.insertBefore(remImgLinkSpan, m.nextSibling);
			par.insertBefore(mageDiv, m.nextSibling.nextSubling);
			iurls.push(str);
			i++;
			count++;
		}
	}
	else
	{
		if(!(atYouTube || (strLC.indexOf("http://www.youtube.com/watch?v=") && strLC.indexOf("http://youtube.com/watch?v="))))
		{
				vidSite = "youtube"
				var idLoc = strLC.indexOf("v=") + 2;
				var qualLoc = strLC.indexOf("fmt=") + 4;
				var timeLoc = strLC.indexOf("#t=") + 3;
				var timeSecs = 0;
				if(timeLoc != 2)
				{	
					timeLoc;
					var lastEndMark = timeLoc;
					var hrDone = false;
					var minDone = false;
					var currLoc = timeLoc;
					var val = strLC.charAt(currLoc);
					while(!isNaN(val) || (!hrDone && (val == 'h')) || (!minDone && (val == 'm')))
					{
						currLoc++;
						if(val == 'h')
						{
							timeSecs = parseInt(strLC.substring(lastEndMark, currLoc),10)*3600;
							lastEndMark = currLoc - 1;
							hrDone = true;
						}
						else if(val == 'm')
						{
							timeSecs += parseInt(strLC.substring(lastEndMark, currLoc),10)*60;
							lastEndMark = currLoc - 1;
							minDone = true;
						}
						val = strLC.charAt(currLoc);
					}
					if(lastEndMark + 2 < currLoc)
					{
						timeSecs += parseInt(strLC.substring(lastEndMark + 1, currLoc),10);
					}
				}
				vidID = str.substring(idLoc, idLoc + 11);
				if(timeSecs > 0)
				{
					vidID += "&start=" + timeSecs;
				}
		}
		else if(!(atVimeo || (strLC.indexOf("http://www.vimeo.com/") && strLC.indexOf("http://vimeo.com/"))))
		{
				var idLoc = strLC.indexOf("vimeo.com/") + 10;
				vidID = str.substring(idLoc, str.length);
				if(!isNaN(vidID))
				{
					vidSite = "vimeo";
				}
		}
		else if(!(atCollegeHumor || (strLC.indexOf("http://www.collegehumor.com/video:") && strLC.indexOf("http://collegehumor.com/video:"))))
		{
				var idLoc = strLC.indexOf("video:") + 6;
				vidID = str.substring(idLoc, idLoc + 7);
				if(!isNaN(vidID))
				{
					vidSite = "collegehumor";
				}
		}
		else if(!(atDailyMotion || (strLC.indexOf("http://www.dailymotion.com/video/") && strLC.indexOf("http://dailymotion.com/video/"))))
		{
				var idLoc = strLC.indexOf("video/") + 6;
				vidID = str.substring(idLoc, idLoc + 6);
				vidSite = "dailymotion";
		}
		else if(!(atMetacafe || (strLC.indexOf("http://www.metacafe.com/watch/") && strLC.indexOf("http://metacafe.com/watch/"))))
		{
				var idLoc = strLC.indexOf("watch/") + 6;
				tmp = str.indexOf("/", idLoc + 1);
				tmp = str.indexOf("/", tmp + 1);
				var tmp2 = strLC.indexOf("?", idLoc);
				if((tmp == -1)||((tmp2 != -1) && (tmp > tmp2)))
				{
					tmp = tmp2;
				}
				if(tmp == -1)
				{
					tmp = str.length;
				}
				vidID = str.substring(idLoc, tmp);
				vidSite = "metacafe";
		}
		else if(!(atLiveLeak || (strLC.indexOf("http://www.liveleak.com/view?i=") && strLC.indexOf("http://liveleak.com/view?i="))))
		{
				var idLoc = strLC.indexOf("view?i=") + 7;
				tmp = str.indexOf("&", idLoc + 1);
				if(tmp == -1)
				{
					tmp = str.length;
				}
				vidID = str.substring(idLoc, tmp);
				vidSite = "liveleak";
		}
		else if(!(atGoogleVideo || (strLC.indexOf("http://www.video.google.com/videoplay?docid=") && strLC.indexOf("http://video.google.com/videoplay?docid="))))
		{
				var tmp = strLC.indexOf("docid=");
				var idLoc;
				while(tmp != -1)
				{
					tmp = tmp + 6;
					idLoc = tmp;
					tmp = strLC.indexOf("docid=", tmp + 1);
				}
				tmp = str.indexOf("&", idLoc);
				var tmp2 = str.indexOf("#", idLoc);
				if((tmp == -1)||((tmp2 != -1) && (tmp > tmp2)))
				{
					tmp = tmp2;
				}
				if(tmp == -1)
				{
					tmp = str.length;
				}
				vidID = str.substring(idLoc, tmp);
				vidSite = "googlevideo";
		}		
		else if(!(atFunnyOrDie || (strLC.indexOf("http://www.funnyordie.com/videos/") && strLC.indexOf("http://funnyordie.com/videos/"))))
		{
				var idLoc = strLC.indexOf("videos/") + 7;
				tmp = strLC.indexOf("/", idLoc + 1);
				if(tmp == -1)
				{
					tmp = str.length;
				}
				vidID = str.substring(idLoc, tmp);
				vidSite = "funnyordie";
		}
if(((vidSite == "youtube") && disableYoutube)||((vidSite == "vimeo") && disableVimeo)||((vidSite == "collegehumor") && disableCollegeHumor)||
((vidSite == "dailymotion") && disableDailyMotion)||((vidSite == "metacafe") && disableMetacafe)||((vidSite == "liveleak") && disableLiveLeak)||
((vidSite == "googlevideo") && disableGoogleVideo)||((vidSite == "funnyordie") && disableFunnyOrDie))
{
	vidSite = "";
}		
		if(vidSite != "")
		{
			var htextV = vidLinkText;
			var htextV2 = vidLinkUndoText;
			for(var j=0; j<vurls.length; j++)
			{
				if(vurls[j] == str)
				{
					contDupe = true;
					htextV = vidLinkDupeText;
					htextV2 = vidLinkDupeUndoText;
				}
			}
			if(allowDupeLinks||!contDupe)
			{
				if(atReddit && nsfwCommentLinkCheck)
				{
					if(m.parentNode.innerHTML.toLowerCase().indexOf("nsfw") != -1)
					{
						nsfwLink = true;
					}
					else if(m.parentNode.className == "title")
					{
						var granny = m.parentNode.parentNode;
						if(granny.childNodes[2].innerHTML.toLowerCase().indexOf("nsfw") != -1)
						{
							nsfwLink = true;
						}
						else if(granny.childNodes[3].innerHTML.toLowerCase().indexOf("nsfw") != -1)
						{
							nsfwLink = true;
						}
					}
				}
				var vidStyle;
				var vidRemStyle;
				if(nsfwLink == true)
				{
					vidStyle = nsfwVidLinkStilo;
					vidRemStyle = nsfwVidRemLinkStilo;
				}else{
					vidStyle = vidLinkStilo
					vidRemStyle = vidRemLinkStilo;
				}
				tmp = vidCount + "' style='" + vidStyle + "' href='javascript:";
				var tmp2 = "(\"" + vidSite + "\", " + vidCount + ", \"" + vidID + "\", \"" + htextV + "\", \"" + htextV2 + "\")'>";
				var vidLinkSpan = document.createElement("span");
				var vidDiv = document.createElement("div");
				vidDiv.id = "vidDiv" + vidCount;
				vidLinkSpan.innerHTML = "<a id='linkVid" + tmp + "embedVid" + tmp2 + htextV + "</a>";
				vidDiv.innerHTML = "";
				if((autoEmbedVideos) && !(nsfwLink || contDupe))
				{
					if((!ignoreWarning) && (currCount == embedWarningCount))
					{
						if(!heedWarning)
						{
							ignoreWarning = confirm("WARNING: There are already " + autoEmbedded + " images/videos loading do you want to auotembed them ALL?");
						}
						if(!ignoreWarning && !justStop)
						{
							heedWarning = true;
							justStop = confirm("There are " + autoEmbedded + " images/videos loading. Do you want to embed up to another " + embedWarningCount + "?");
							if(!justStop)
							{
								currCount = 0;
							}
						}
					}
					if (ignoreWarning||(currCount < embedWarningCount))
					{
						var objPart = "";
						if(vidSite == "youtube")
						{
							objPart = "<object width='480' height='385'><param name='movie' value='http://www.youtube.com/v/" + vidID + "&fs=1&iv_load_policy=3'></param><param name='allowFullScreen' value='true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://www.youtube.com/v/" + vidID + "&fs=1&iv_load_policy=3' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' width='480' height='385'></embed></object><br>";	
						}
						else if(vidSite == "vimeo")
						{
							objPart = "<object width='480' height='270'><param name='allowfullscreen' value='true' /><param name='allowscriptaccess' value='always' /><param name='movie' value='http://vimeo.com/moogaloop.swf?clip_id=" + vidID + "&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1' /><embed src='http://vimeo.com/moogaloop.swf?clip_id=" + vidID + "&amp;server=vimeo.com&amp;show_title=1&amp;show_byline=1&amp;show_portrait=0&amp;color=&amp;fullscreen=1' type='application/x-shockwave-flash' allowfullscreen='true' allowscriptaccess='always' width='480' height='270'></embed></object><br>";
						}
						else if(vidSite == "collegehumor")
						{
							objPart = "<object width='480' height='360' type='application/x-shockwave-flash' data='http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=" + vidID + "&fullscreen=1'><param name='allowfullscreen' value='true'/><param name='wmode' value='transparent'/><param name='allowScriptAccess' value='always'/><param name='movie' quality='best' value='http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=" + vidID + "&fullscreen=1'/><embed width='480' height='360' src='http://www.collegehumor.com/moogaloop/moogaloop.swf?clip_id=" + vidID + "&fullscreen=1' type='application/x-shockwave-flash' wmode='transparent' allowScriptAccess='always'></embed></object>";
						}
						else if(vidSite == "dailymotion")
						{
							objPart = "<object width='480' height='270'><param name='movie' value='http://www.dailymotion.com/swf/video/" + vidID + "'></param><param name='allowFullScreen' value='true'></param><param name='allowScriptAccess' value='always'></param><embed width='480' height='270' type='application/x-shockwave-flash' src='http://www.dailymotion.com/swf/video/" + vidID + "' allowfullscreen='true' allowscriptaccess='always'></embed></object>";
						}
						else if(vidSite == "metacafe")
						{
							objPart = "<embed src='http://www.metacafe.com/fplayer/" + vidID + ".swf' width='400' height='345' wmode='transparent' pluginspage='http://www.macromedia.com/go/getflashplayer' type='application/x-shockwave-flash' allowFullScreen='true' allowScriptAccess='always'></embed>";
						}
						else if(vidSite == "liveleak")
						{
							objPart = "<object width='450' height='370'><param name='movie' value='http://www.liveleak.com/e/" + vidID + "'></param><param name='wmode' value='transparent'></param><param name='allowscriptaccess' value='always'></param><embed width='450' height='370'src='http://www.liveleak.com/e/" + vidID + "' type='application/x-shockwave-flash' wmode='transparent' allowscriptaccess='always'></embed></object>";
						}
						else if(vidSite == "googlevideo")
						{
							objPart = "<embed style='width:400px; height:326px;' id='VideoPlayback' type='application/x-shockwave-flash' src='http://video.google.com/googleplayer.swf?docId=" + vidID + "'></embed>";
						}
						else if(vidSite == "funnyordie")
						{
							objPart = "<embed width='480' height='453' type='application/x-shockwave-flash' name='fodplayer' src='http://player.ordienetworks.com/flash/fodplayer.swf?c79e63ac' quality='high' allowfullscreen='true' flashvars='key=" + vidID + "&amp;autostart=false'>";	
						}
						vidLinkSpan.innerHTML = "<a id='linkVid" + tmp + "undoVidEmbed" + tmp2 + htextV2 + "</a>";
						vidDiv.innerHTML = objPart;						
						currCount++;
						autoEmbedded++;
					}
				}
				var par = m.parentNode;
				var remVidLinkSpan = document.createElement("span");
				remVidLinkSpan.id = "remVid" + vidCount;
				remVidLinkSpan.innerHTML = "<a href = 'javascript:remVidEmbed(" + vidCount + ")' style='" + vidRemStyle + "'>" + vidRemText + "</a>";
				par.insertBefore(vidLinkSpan, m);
				par.insertBefore(remVidLinkSpan, m.nextSibling);
				par.insertBefore(vidDiv, m.nextSibling.nextSibling);
				vurls.push(str);
				i++;
				vidCount++;
			}
		}
	}
}

/*
If you're not comfortable with the following script import, here's an alternative
 1) check the code out for fishiness (I promise it's entirely harmless)
 2) host it yourself
 3) edit your local greasemonkey file to redirect the script source to wherever you're hosting it

I'm not the boogey man. This is simply the only method I found which got the code to work on chrome, but if you've got it working with a better method, I'm all ears =]
http://userscripts.org/scripts/discuss/76350
*/
function addScript()
{
	var script = document.createElement("script");
	script.src="http://inkstream.org/code/emb.js";
	(document.body || document.head || document.documentElement).appendChild(script);
}
addScript(); //new chrome workaround