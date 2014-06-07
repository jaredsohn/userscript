// ==UserScript==
// @name           devViewer
// @namespace      deviantart.com
// @description    Allows for previews of links on deviantART
// @include        http://*.deviantart.com/*
// ==/UserScript==

var myVersion = "0.10 Alpha";

//Y U LOOKING AT MY SOURCE CODE?

//Function findLinkables
//Locates Deviations and appends the onMouseOver and onMouseOut so that they can show the devViewer
//Arguments: None;
//Returns: None;
function findLinkables()
{
	//search for A tags who have HREF attributes and do not have the CLTAG attribute
	var aTags = document.evaluate("//a[@href]//img[not(@cltag)]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i = 0; i < aTags.snapshotLength; i++) 
	{
		aTag = aTags.snapshotItem(i);
		var cltag = document.createAttribute("cltag");
		//image outer has a url for a deviation, make sure it's not in Superbrowse
		if (aTag.parentNode.href != null && aTag.parentNode.href.match(/.*\.deviantart\.com\/art\/.*/) != null)
		{		
			cltag.value = "valid";		
			aTag.parentNode.title = "";
			
			aTag.addEventListener("mouseover", previewMaster.newPreview, false);
			aTag.addEventListener("mouseout", previewMaster.removePreview, false);
		}
		else
		{
			//these are not the elements we are looking for
			cltag.value = "invalid";
		}
		
		aTag.setAttributeNode(cltag);
	}
	setTimeout(findLinkables, 500);
}

//where the hell is this element?
//elem - The element we're getting the X and Y of
//returns: Object containing X and Y
function getPos(elem)
{	
	var gpos = new Object();
	gpos.x = 0;
	gpos.y = 0;
	
	var workObj = elem;
	if (workObj != null)
	{
		//find position
		while (workObj != document.body)
		{
			gpos.x += workObj.offsetLeft;
			gpos.y += workObj.offsetTop;
			workObj = workObj.offsetParent;
		}
	}
	else
	{
		gpos.x = 0;
		gpos.y = 0;
	}
	
	return gpos;
}

//positions the preview
function imgPosition()
{
	
	var gpos = getPos(currentCaller);
	var hpos = Math.round(gpos.x - (devViewerObj.clientWidth));
	var vpos = Math.round(gpos.y - (devViewerObj.clientHeight / 2));
	if (hpos - devViewerObj.clientWidth < 0)
	{
		hpos += (currentCaller.width != null ? currentCaller.width : 150) + devViewerObj.clientWidth;
	}
	if (vpos < window.pageYOffset)
	{
		vpos = window.pageYOffset;
	}
	if (vpos > (window.pageYOffset + window.innerHeight - 400))
	{
		vpos = window.pageYOffset + window.innerHeight - 400;
	}

	devViewerObj.style.left = hpos+"px";
	devViewerObj.style.top = vpos+"px";
	
	//devDesc.style.width = (largeDev.width > 210 ? largeDev.width + 10 : 210)+"px";
}

//smooth animation idk
function smoothAnim()
{	
	divOpacity += 0.1;
	if (divOpacity > 1)
	{
		divOpacity = 1;
	}
	devViewerObj.style.opacity = divOpacity;
	//for fancy zoom in effect
	devViewerObj.style.MozTransform = "scale("+(0.9 + (0.1 * divOpacity))+")";
	if (divOpacity < 1)
	{
		setTimeout(smoothAnim, 20);
	}
}

//for the popup of the info viewer
function smoothScale()
{	
	divScale += 0.1;
	if (divScale > 1)
	{
		divScale = 1;
	}
	dVBottomInfo.style.bottom = ((200-(Math.pow((200*(1-divScale)), 2)/200))-200)+"px";
	if (divScale < 1)
	{
		setTimeout(smoothScale, 20);
	}
}

//gets the file size for a Deviation
function getFileSize(rawNum)
{
	var fileSize;
	
	if (rawNum >=1024000)
	{
		fileSize = Math.round(rawNum/1024000) + "Mb";
	}
	else if (rawNum >= 1024 && rawNum < 1024000)
	{
		fileSize = Math.round(rawNum/1024) + " Kb";
	}
	else
	{
		fileSize = rawNum + " Bytes";
	}
	return fileSize;
}

//used to get a Date string
function devGetDate(timeStamp)
{
	var theDate = new Date(timeStamp);
	var formattedDate;
	var weekday;
	switch (theDate.getDay())
	{
		case 0: {weekday = "Sun"; break;}
		case 1: {weekday = "Mon"; break;}
		case 2: {weekday = "Tue"; break;}
		case 3: {weekday = "Wed"; break;}
		case 4: {weekday = "Thu"; break;}
		case 5: {weekday = "Fri"; break;}
		case 6: {weekday = "Sat"; break;}
	}
	var month;
	switch (theDate.getMonth())
	{
		case 0: {month = "Jan"; break;}
		case 1: {month = "Feb"; break;}
		case 2: {month = "Mar"; break;}
		case 3: {month = "Apr"; break;}
		case 4: {month = "May"; break;}
		case 5: {month = "Jun"; break;}
		case 6: {month = "Jul"; break;}
		case 7: {month = "Aug"; break;}
		case 8: {month = "Sep"; break;}
		case 9: {month = "Oct"; break;}
		case 10: {month = "Nov"; break;}
		case 11: {month = "Dec"; break;}
	}
	formattedDate = weekday + ", " + month + " " + theDate.getDate() + ", " + theDate.getFullYear();
	return formattedDate;
}

//convert a Base 10 Number into a Base 16 Number
//aNum = A base 10 Number
//returns = A base 16 Number
function toBase16(aNum)
{
	var aHex = "";
	var hexChars = "0123456789ABCDEF";
	while (aNum > 0)
	{
		aHex = hexChars.charAt(aNum % 16) + aHex;
		aNum = aNum >> 4;
	}
	return aHex;
}

//convert a Base 10 number into a Base 36 Number
//aNum = A base 10 number
//returns = A base 36 number
function toBase36(aNum)
{
	var aFinal = "";
	var someNums = "0123456789abcdefghijklmnopqrstuvwxyz";
	while (aNum > 0)
	{
		aFinal = someNums.charAt(aNum % 36) + aFinal;
		aNum = Math.floor(aNum / 36);
	}
	return aFinal;
}

//init for a new preview
function newPreview(evt)
{
	//only execute if (shift is required and pressed) or (shift is not required)
	if ((GM_getValue('requireShift', false) && evt.shiftKey) || !GM_getValue('requireShift', false))
	{
		currentCaller = evt.target;
		//var qre = /\d+(?!-)/;
		var qre = /(?:\/|\-)(\d+)(?=$|\?)/;
		previewMaster.previewID = evt.target.parentNode.href.match(qre)[1];
		resetDevViewer();
		devViewerObj.style.opacity = 0;
		devViewerObj.style.display = "inline";
		imgOpacity = 0;
		imgPosition();
		
		diFiGet('"Deviation","Get",[["' + previewMaster.previewID + '"]]', previewMaster.previewFin);
		setTimeout(smoothAnim,  GM_getValue('viewerDelay', 1000));
	}
}

//finish up the preview
//difiResult = Fed by GM_xmlhttpRequest, contains result of DiFi Request
function previewFin(difiResult)
{
	//first, see if we should be replacing images; check to see if we have a result
	if (dVImgPreview.src == "http://e.deviantart.net/emoticons/e/eager.gif" && difiResult.status!=null)
	{
		var difiObj = eval('('+difiResult.responseText+')');
		//see if dA liked the DiFi request
		if (difiObj.DiFi.status == "SUCCESS")
		{
			var devInfo = difiObj.DiFi.response.calls[0].response.content[0];
			//see if this deviation request is the most current
			if (devInfo != null && devInfo.deviationid == previewMaster.previewID)
			{
				if (devInfo.litexcerpt == "")
				{
					if (devInfo.width<300 && devInfo.height<300)
					{
						//for small stuff like Stamps
						dVImgPreview.src = "http://th01.deviantart.com/"+devInfo.filepreview.replace(/\:/, "/");
					}
					else
					{
						dVImgPreview.src = "http://th01.deviantart.com/"+devInfo.filepreview.replace(/\:/, "/300W/");
					}
					dVImgPreview.style.display = "inline";
				}
				else
				{
					dVTextPreview.innerHTML = devInfo.litexcerpt + "...";
					dVTextPreview.style.display = "inline-block";
				}
				
				
				dVInfoDevTitle.innerHTML = devInfo.title;
				dVInfoDevTitle.href = devInfo.url;
				dVInfoDeviant.innerHTML = "<span style='font-size: 7pt; text-decoration: italic;'>by " + devInfo.symbol + "<a href='http://" + devInfo.username + ".deviantart.com'>" + devInfo.username + "</a><br /></span>";
				
				var resultingText = "<table width='100%' height='200' cellspacing='0' cellpadding='2'><tr><td width='180' valign='middle' align='center'><div style='padding: 15px;'>";
				//note: cltag='invalid' prohibits our generated thumbnail from making a devViewer. That'd be kinda bad.
				
				if (devInfo.litexcerpt == "")
				{
					resultingText += "<a href='" + devInfo.url + "'><img  cltag='invalid' src='";
					if (devInfo.width<300 && devInfo.height<300)
					{
						//for small stuff like Stamps
						resultingText += "http://th01.deviantart.com/"+devInfo.filepreview.replace(/\:/, "/");
					}
					else
					{
						resultingText += "http://th01.deviantart.com/"+devInfo.filepreview.replace(/\:/, "/300W/");
					}
					resultingText += "' style='-moz-border-radius: 5px; background: #2c3635; padding: 5px; max-width: 150px; max-height: 150px; -moz-box-shadow: 0px 0px 2px rgba(44,54,53,1);' /></a>";
				}
				else
				{
					resultingText += "<div style='background: #FFF; font-size: 7pt; width: 150px; height: 150px; overflow-y: scroll; display: inline-block; -moz-box-shadow: 0px 0px 3px rgba(255,255,255,1); text-align: left;'>"+devInfo.litexcerpt + "...</div>";
				}
				
				resultingText+="</div>";
				
				
				
				//critique info here
				// devattr is a base 16 number - second number from the right indicates Critque/comment pref. 4 = Critique 2 = No Critique 3 = No Comments
				
				resultingText += "</td><td valign='top' style='padding-top: 20px; font: sans-serif;'><span class='dVTextShadow'><b><a style='font: 16pt \"Trebuchet MS\", Arial, Helvetica, sans-serif;' href='"+devInfo.url+"'>"+devInfo.title + "</a></b></span> <span style='font-size: 10pt; text-decoration: italic;'>by " + devInfo.symbol + "<a href='http://" + devInfo.username + ".deviantart.com'>" + devInfo.username + "</a></span><span style='font-size: 7pt;'>";
				
				var devattrib = toBase16(devInfo.devattr);
				if (devattrib.charAt(devattrib.length - 2) == "4")
				{
					resultingText += " [Critique Requested]";
				}
				
				if (devInfo.printid != 0)
				{
					resultingText += " [Print Available]";
				}
				
				resultingText += "</span>";
				
				resultingText += "<br /><hr />";
				
				
				resultingText += "<table width='100%' cellpadding='2' cellspacing='0'><tr><td width='50%'><table width='100%' style='font-size: 10pt;' cellpadding='2' cellspacing='0'>";
				resultingText += "<tr><td width='25%' class='dVTextShadow'>Dimensions:</td><td width='75%' align='right'>" + devInfo.filewidth + "px by " + devInfo.fileheight + "px</td></tr>";
				resultingText += "<tr style='background-color: #dae4d9;'><td class='dVTextShadow'>File Size:</td><td align='right'>" + getFileSize(devInfo.filesize) + "</td></tr>";
				resultingText += "<tr><td class='dVTextShadow'>Uploaded:</td><td align='right'>" + devGetDate(devInfo.ts*1000) + "</td></tr>";
				var figureCat = "";
				for (var i in devInfo.catinfo)
				{
					figureCat += devInfo.catinfo[i].cattitle + (i == (devInfo.catinfo.length - 1) ? "" : "/");
				}
				resultingText += "<tr style='background-color: #dae4d9;'><td class='dVTextShadow'>Category:</td><td align='right'><div style='overflow: hidden; width: 100%; height: 18px;'><a href='http://www.deviantart.com/?catpath=" + devInfo.catpath + "'>" + figureCat + "</a></div></td></tr></table>";
				
				resultingText += "</td><td width='50%'><table width='100%' style='font-size: 10pt;' cellpadding='2' cellspacing='0'>"
				
				//if the third character from the right in the devInfo is 0, then share links are enabled. Too lazy to code to check, will update if someone complains
	
				//twitter
				resultingText += "<tr><td><a style='color: #337287; text-decoration: none;' href='http://twitter.com/home?status=Check+out+http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"+on+%23deviantart'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/twitter-24.gif' /> [Twitter]</a></td>";
				
				//faycebook
				resultingText += "<td><a style='color: #337287; text-decoration: none;' href='http://www.facebook.com/share.php?u=http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/facebook-24.gif' /> [Facebook]</a></td></tr>";
				
				//reddit
				resultingText += "<tr><td><a style='color: #337287; text-decoration: none;' href='http://reddit.com/submit?url=http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/reddit.gif?3' /> [Reddit]</a></td>";
				
				//digg
				resultingText += "<td><a style='color: #337287; text-decoration: none;' href='http://digg.com/submit?url=http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/digg-24.gif' /> [Digg]</a></td></tr>";
				
				//livejournal
				resultingText += "<tr><td><a style='color: #337287; text-decoration: none;' href='http://www.livejournal.com/update.bml?subject=Devious+Journal+Entry&event=http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/livejournal-24.gif' /> [LiveJournal]</a></td>";
				
				//Eww Myspace
				resultingText += "<td><a style='color: #337287; text-decoration: none;' href='http://www.myspace.com/Modules/PostTo/Pages/?u=http%3A%2F%2Ffav.me%2Fd"+toBase36(devInfo.deviationid)+"'><img style='vertical-align: middle;' src='http://st.deviantart.com/share/myspace-24.gif' /> [MySpace]</a></td></tr>";
				
				resultingText +="</table></td></tr><tr><td colspan='2'><table width='100%' style='font-size: 10pt;' cellpadding='2' cellspacing='0'>"
				
				resultingText +="<tr><td width='10%' class='dVTextShadow'>Link:</td><td align='right' width='40%'><input type='text' size='45' style='font-size: 9pt; text-align: right;' onclick='this.select();' value='http://fav.me/d"+ toBase36(devInfo.deviationid) + "' /></td>";
				resultingText += "<td width='20%' class='dVTextShadow'>Thumbnail:</td><td align='right' width='30%'><input type='text' size='30' style='font-size: 9pt; text-align: right;' onclick='this.select();' value=':thumb" + devInfo.deviationid + ":' /></td></tr>";
				
				resultingText +="</table></td></tr></table>";
				
				
				resultingText += "</td></tr></table>";
				
				
				
				dVPaneHolder.innerHTML = resultingText;
				imgPosition();
				
				
			}
		}
	}
}
//shows configuration dialogue
function displayConfig()
{
	var resultingText = "<span style='font-size: 7pt; position: absolute; bottom: 5px; left: 5px;'><b><a href='http://fav.me/d2vecls'>devViewer</a></b> is Copyright (C) 2010 - 2011 <a href='http.//sparklum.com'><b>SparkLum</b></a> - <span id='clDevMesUpdateCheck'>Checking for Updates...</span></span><table width='100%' cellspacing='0' cellpadding='2'><tr><td valign='top' style='padding-top: 20px; font: sans-serif;'><span class='dVTextShadow' style='font: 16pt \"Trebuchet MS\", Arial, Helvetica, sans-serif;'><b>devViewer</b> Configuration Panel</span> <span style='font-size: 10pt; text-decoration: italic;'> Version " + myVersion + " </span><hr />";
	
	resultingText += "</td></tr></table>";
	
	resultingText += "<form id='clDevViewConfig'><table cellspacing='0' cellpadding='5'>";
	/*//description autoshow setting
	resultingText += "<td width='35%'><b>Show More Info</b><br /><small>When checked, will automatically show more information about the deviation.</small></td><td width='15%' align='right'><input id='clDescShowAlways' type='checkbox' " + (GM_getValue('descShowAlways', false) ? "checked='true'" : "") + " /></td>";*/
	//requires Shift to appear
	resultingText += "<tr><td width='35%'><b>Require Shift Key</b><br /><small>When checked, requires that you are holding down the 'Shift' key for the devViewer to appear.</small></td><td width='15%' align='right'><input id='clRequireShift' type='checkbox' " + (GM_getValue('requireShift', false) ? "checked='true'" : "") + " /></td>";
	//mmm, selectors - viewer delay
	resultingText += "<td width='35%'><b>devViewer Delay</b><br /><small>Sets the amount of time before the devViewer appears when hovering over a deviation.</small></td><td width='15%' align='right'>";
	resultingText += "<select id='clViewerDelay' size='1'><option value='10'>No Delay</option><option value='500'>Half a Second</option><option value='1000'>One Second</option><option value='2000'>Two Seconds</option></select>";
	resultingText += "</td></tr>";
	resultingText += "</table><hr />";
	resultingText += "<div align='center'><a id='clSubmitConfigForm' class='smbutton smbutton-blue' style='cursor: pointer;'><span><b>Save</b></span></a> <a id='clCancelConfigForm' class='smbutton' style='cursor: pointer;'><span>Cancel</span></a></div></form>";
	
	
	dVPaneHolder.innerHTML = resultingText;
	
	overPreview = false;
	removePreview();
	detailShow();
	
	var myOptions = document.getElementById('clViewerDelay').options;
	for (var i in myOptions)
	{
		if (myOptions[i].value == GM_getValue('viewerDelay', 1000))
	   {
		   myOptions[i].selected = true;
	   }
	}
	
	
	document.getElementById('clSubmitConfigForm').addEventListener("click", closeConfigPanelSave, false);
	document.getElementById('clCancelConfigForm').addEventListener("click", closeConfigPanelCancel, false);
	//check for updates
	GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://sparklum.com/da/scripts/largedev.xml",
					  onload: finishUpdateCheck
					  });
}

//closes the Configuration Panel and saves
function closeConfigPanelSave(evt)
{
	//yo, we're saving
	//GM_setValue('descShowAlways', document.getElementById('clDescShowAlways').checked);
	GM_setValue('requireShift', document.getElementById('clRequireShift').checked);
	var myOptions = document.getElementById('clViewerDelay').options;
	for (var i in myOptions)
	{
		if (myOptions[i].selected)
	   {
		   GM_setValue('viewerDelay', myOptions[i].value)
	   }
	}
	alert("devViewer Preferences saved!");
	
	dVBottomInfo.style.display = "none";
	divScale = 0;
}

//closes the configuration panel and Cancels
function closeConfigPanelCancel(evt)
{
	dVBottomInfo.style.display = "none";
	divScale = 0;
}

//finishes the checking for updates
function finishUpdateCheck(curVer)
{
	if (curVer.status!=null && document.getElementById('clDevMesUpdateCheck')!=null)
	{
		scriptInfo = new DOMParser().parseFromString(curVer.responseText, "text/xml");
		currentVersion = scriptInfo.getElementsByTagName('version')[0].firstChild.nodeValue;
		if (currentVersion == myVersion)
		{
			document.getElementById('clDevMesUpdateCheck').innerHTML = "No Updates Found";
		}
		else
		{
			document.getElementById('clDevMesUpdateCheck').innerHTML = "<b>Update Found!</b> Version " + currentVersion + " - <a href='http://userscripts.org/scripts/source/65274.user.js' target='_blank'>[Install]</a>";
		}
	}
}

//remove the preview
function removePreview()
{
	//function to delay it a bit so we can capture if it moved to the actual hover square or not
	function actualUndo()
	{
		//checks against a person moving from the deviation to the preview square
		if (overPreview == false)
		{
			resetDevViewer();
			divOpacity = 0;
			devViewerObj.style.display = "none";
			devViewerObj.style.opacity = 0;
		}
		else
		{
			//prevented square from going away
		}
	}
	
	setTimeout(actualUndo, 10);
}

//executes DiFi Commands
//DiFiArgs: A string containing the arguments for the DiFi Request
//doThisNext: A function to execute when the request is complete
function diFiGet(DiFiArgs, doThisNext)
{
	GM_xmlhttpRequest({
					  method: "GET",
					  url: "http://www.deviantart.com/global/difi/?t=json&c[]="+DiFiArgs,
					  onload: doThisNext,
					  onerror: doThisNext
					  });
}

//Object that contains all the functions for making new previews and updating them
function PreviewMaster()
{
	//updated when a new Preview is added
	this.previewID = 0;
	
	//init for a new preview
	this.newPreview = newPreview;
	
	//finish up preview
	this.previewFin = previewFin;
	
	//remove the preview
	this.removePreview = removePreview;
	
}

var previewMaster = new PreviewMaster();

//the current caller
var currentCaller;

//opacity for the preview Div
var divOpacity = 0;

//for the scale of the details panel
var divScale = 0;

//keeps the preview from leaving if the deviant is over the preview
var overPreview = false;

//overall element
var devViewerObj = document.createElement('div');
devViewerObj.id = "devViewerObj";
devViewerObj.align = "center";
//inner Image Preview
var dVImgPreview = document.createElement('img');
dVImgPreview.id = "dVImgPreview";
devViewerObj.appendChild( dVImgPreview );
//inner text preview
var dVTextPreview = document.createElement('div');
dVTextPreview.id = "dVTextPreview";
dVTextPreview.align = "left";
devViewerObj.appendChild( dVTextPreview );
//informational display
var dVInfoPanel = document.createElement('div');
dVInfoPanel.id = "dVInfoPanel";
dVInfoPanel.align = "center";
devViewerObj.appendChild( dVInfoPanel );
//deviation title
var dVInfoDevTitle = document.createElement('a');
dVInfoDevTitle.id = "dVInfoDevTitle";
dVInfoDevTitle.style.fontSize = "8pt";
dVInfoDevTitle.style.fontWeight = "bold";
dVInfoPanel.appendChild( dVInfoDevTitle );
//misc formatting
dVInfoPanel.appendChild( document.createElement('br'));
//artist name, formatted "by ~deviant"
var dVInfoDeviant = document.createElement('span');
dVInfoDeviant.id = "dVInfoDeviant";
dVInfoPanel.appendChild( dVInfoDeviant );
//misc formatting
dVInfoPanel.appendChild( document.createElement('hr'));
//more show/hide
var dVDetailToggle = document.createElement('a');
function detailShow()
{
	dVPaneInfo.innerHTML = dVPaneHolder.innerHTML;
	dVBottomInfo.style.bottom = "-200px";
	dVBottomInfo.style.display = "inline";
	smoothScale();
}
dVDetailToggle.addEventListener("click", detailShow, false);
dVDetailToggle.style.cursor = "pointer";
dVInfoPanel.appendChild( dVDetailToggle );
//misc formatting
var divDash = document.createElement('span');
divDash.innerHTML = " - ";
dVInfoPanel.appendChild(divDash);
//configuration link
var dVConfigLink = document.createElement('a');
dVConfigLink.innerHTML = "[Configuration]";
dVConfigLink.style.cursor = "pointer";
//quickfunction opens the Configuration Dialogue
//appended to dVConfigLink
function configBox()
{
	displayConfig();
	return false;
}
dVConfigLink.addEventListener("click", configBox, false);
dVInfoPanel.appendChild( dVConfigLink );

//bottom pane
var dVBottomInfo = document.createElement('div');
dVBottomInfo.id = "dVBottomInfo";

//bottom pane holder, filled in by details and replaces what's in the bottom pane when requested
var dVPaneHolder = document.createElement('div');
dVPaneHolder.id = "dVPaneHolder";

//bottom pane container
var dVPaneInfo = document.createElement('div');
dVPaneInfo.id = "dVPaneInfo";

//bottom page closer
//<a id='dVCloseButton' href='#' class='smbutton smbutton-red smbutton-big'><span><b>X</b></span></a>
var dVCloseButton = document.createElement('a');
dVCloseButton.className='smbutton smbutton-red';
dVCloseButton.innerHTML = "<span><b>Close</b></span>";
dVCloseButton.style.position="absolute";
dVCloseButton.style.right="5px";
dVCloseButton.style.top="5px";
dVDetailToggle.style.cursor = "pointer";
//temp function, closes the details pane
function tmpCloseMe()
{
	dVBottomInfo.style.display = "none";
	divScale = 0;
}
dVCloseButton.addEventListener('click', tmpCloseMe, false);
dVBottomInfo.appendChild(dVCloseButton);
dVBottomInfo.appendChild(dVPaneInfo);

//insert into Page scope
document.body.insertBefore(devViewerObj, document.body.firstChild);
document.body.insertBefore(dVBottomInfo, document.body.firstChild);

//Initialize all Styles
//stylize overall element
GM_addStyle("div.devViewerObj {-moz-border-radius: 5px; padding: 10px; position: absolute; border: 1px solid #2b2e2c; background: #dae4d9 url(http://st.deviantart.com/minish/gruzecontrol/gmtop.gif?1) repeat-x; z-index: 20000; -moz-box-shadow: 0px 2px 3px rgba(0,0,0,0.7); display: inline;}");
devViewerObj.className = "devViewerObj";
//stylize Image Preview
GM_addStyle("img.dVImgPreview {-moz-border-radius: 5px; background: #2c3635; padding: 5px; -moz-box-shadow: 0px 0px 2px rgba(44,54,53,1); max-width: 300px; max-height: 300px;}");
dVImgPreview.className = "dVImgPreview";
//stylize text preview
GM_addStyle("div.dVTextPreview {-moz-border-radius: 5px; background: #e6eae5; padding: 5px; -moz-box-shadow: 0px 0px 2px rgba(44,54,53,1); max-width: 300px; max-height: 300px; overflow-y: scroll; font-size: 7pt; color: #2c3635;}");
dVTextPreview.className = "dVTextPreview";
GM_addStyle("div.dVInfoPanel {text-align: center; -moz-border-radius: 5px; border: 1px solid #9eb1a2; font: 8pt sans-serif; color: #2c3635; background: #eafae3; margin-top: 10px; padding-top: 4px; padding-bottom: 4px; text-shadow: #fff 1px 1px 0;}");
GM_addStyle("div.dVInfoPanel a {color: #337287;}");
GM_addStyle("div.dVInfoPanel hr {color: #9eb1a2; background-color: #9eb1a2; height: 1px; border: none;}");
dVInfoPanel.className = "dVInfoPanel";
GM_addStyle("div.dVBottomInfo {position: fixed; width: 100%; height: 200px; background: #dae4d9 url(http://st.deviantart.com/minish/gruzecontrol/gmtop.gif?1) repeat-x; z-index: 20000; border-top: 1px solid #2b2e2c; -moz-box-shadow: 0px 0px 3px rgba(0,0,0,0.7); bottom: 0px; display: none;}");
dVBottomInfo.className = "dVBottomInfo";
GM_addStyle(".dVTextShadow { text-shadow: #fff 1px 1px 0;}");


//Function resetDevViewer
//Resets the devViewer with default values.
//Arguments: None.
//Returns: Nothing.
function resetDevViewer()
{
	//preview image
	dVImgPreview.src="http://e.deviantart.net/emoticons/e/eager.gif";
	//literature preview section
	dVTextPreview.innerHTML = "Literature Preview";
	//deviation title
	dVInfoDevTitle.href = "http://deviantart.com";
	dVInfoDevTitle.innerHTML = "Deviation Title";
	//deviation author
	dVInfoDeviant.innerHTML = "<span style='font-size: 7pt; text-decoration: italic;'>by ~<a href='http://me.deviantart.com'>Deviant</a></span>";
	//reset detail panel toggle
	dVDetailToggle.innerHTML = "[Details]";
	
	//hide everything
	dVImgPreview.style.display = "none";
	dVTextPreview.style.display = "none";
	devViewerObj.style.opacity = "0";
	devViewerObj.style.display = "none";
}

//First Run stuff

//fill default values
resetDevViewer();
//positions preview image when it loads
devViewerObj.addEventListener("load", imgPosition, false);
//guards against the preview going away if deviant moves into preview square
devViewerObj.addEventListener("mouseout", previewMaster.removePreview, false);
var tempFunc = function () {overPreview=true;};
devViewerObj.addEventListener("mouseover", tempFunc, false);
var tempFunc2 = function () {overPreview = false;};
devViewerObj.addEventListener("mouseout", tempFunc2, false);
findLinkables();