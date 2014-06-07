// This is a Greasemonkey script which fixes some annoying things with the Flashback forum
// Author: Oneman
//
// ==UserScript==
// @name	Flashscript
// @description	Adds a couple of functions to www.flashback.info
// @include	http://www.flashback.info*
// ==/UserScript==


//	Settings	\\

var biggerTextbox =	true;
var fixLinks = 		true;
var removeAds = 		true;
var replaceRedStar = 	true;
var removeInlineAds = 	true;
var fixSignatures = 	true;

var processImageLinks =	true;	//Needs to be true for the following two settings to work
	var showImages =	false;
	var showButtons = 	true;

var showVideos =		true;
var showLinkIcons = 	false;
var showSubmitButtons =	true;
var useAdvancedEdit = 	false;
var leftColumnWidth = 	130;	//Default is 175
var expandCodeWindows =	true;
var showTooltips =	 	true;
	var showOnLinks = 	true;
var showMenu = 		true;

//favoriteForumArray is in the format "Name", forum ID
var favoriteForumArray = new Array(
		"Dator och IT-support", 133,
		"Programmering", 42,
		"Flashback", 29
		);


//End of settings. Do not touch the code below unless you know what you're doing


var leave = "http://www.flashback.info/leave.php?";
var allAnchors = document.getElementsByTagName('a');
var allTableData = document.getElementsByTagName('td');
var allImages = document.getElementsByTagName('img');
var allTables = document.getElementsByTagName('table');
var allDivs = document.getElementsByTagName('div');
var allPres = document.getElementsByTagName('pre');
var allObjects = document.getElementsByTagName('object');

if (biggerTextbox)
	BiggerTextbox();	
if (fixLinks)
	FixLinks();	
if (removeAds)
	RemoveAds();
if (replaceRedStar)
	ReplaceStar();
if (removeInlineAds)
	RemoveInlineAds();
if (fixSignatures)
	FixSignatures();
if (processImageLinks)
	ProcessImageLinks();
if (showVideos)
	ShowVideos();
if (showLinkIcons)
	ShowLinkIcons();
if (showMenu)
	ShowMenu();
if (showSubmitButtons)
	ShowSubmitButtons();
if (useAdvancedEdit)
	UseAdvancedEdit();
if (leftColumnWidth!=175)
	ChangeLeftColumnWidth();
if (expandCodeWindows)
	ExpandCodeWindows();
if (showTooltips)
	ShowTooltips();

function RemoveAds() 
{
	for (i=0; i<allObjects.length; i++)
	{
		allObjects[i].parentNode.removeChild(allObjects[i]);
	}
	
	for (i=0; i<allTableData.length; i++)
	{
		try
		{
			if ((allTableData[i].id.indexOf('post') != -1) ||
				(allTableData[i].className == 'alt2'))	//Quotes
			{
				continue;
			}
		}
		catch (e) {}
		
		try
		{
			if (allTableData[i].innerHTML.length > 2000)
				continue;
			
			if (allTableData[i].innerHTML.match(/href=.+?\?.+?=http:/i))
			{
				allTableData[i].style.display = 'none';
			}
		}
		catch (e) {}
					
	}
}

//Make the textbox bigger
function BiggerTextbox() 
{
	var textArea = document.getElementById('vB_Editor_001_textarea');
	if (textArea)
	{
		textArea.setAttribute('style', 'width: 600px; height: 600px');
	}
	for (i=0; i<allDivs.length; i++)
	{
		if (allDivs[i].className == 'panel')
		{
			allDivs[i].setAttribute('style', 'background-color: #e8e8e8;');
		}
	}
}

//Fix links
function FixLinks()
{
	for(var i=0; i<allAnchors.length; i++)
	{
		if (allAnchors[i].href.indexOf(leave + "www") != -1)
		{
			allAnchors[i].href = allAnchors[i].href.replace(leave, "http://");
		}
		
		else if (allAnchors[i].href.indexOf(leave) != -1)
		{
			allAnchors[i].href = allAnchors[i].href.replace(leave, "");
		}
	}
}

//Replace red star
function ReplaceStar()
{
	//Black star in base64, gif
	var star = "R0lGODlhDwAPAKIAAAAAAP///4uLi1dXVy4uLhUVFQUFBf///yH5BAEAAAcALAAAAAAPAA8AAANA\
	eLo3/K/AOYCYjwCCmQHSM4yjBmwEQQ7F6b5ncR0mfHJM7RoOpG+Y1iv0EJwMhI/FB7oIWjhGIaog\
	EBWCnmiWAAA7";
	
	//imageData could contain any gif image in base64 format
	var imageData = star;
	
	for (var i=0; i<allImages.length; i++)
	{
		if ((allImages[i].src.indexOf("images2006/misc/navbits_start.gif") != -1) ||
			(allImages[i].src.indexOf("images2006/misc/navbits_start_start.gif") != -1))
		{
			allImages[i].src = "data:image/gif;base64," + imageData;
			break;	//Only one star per page
		}	
	}
}

//Remove inline ads
function RemoveInlineAds()
{
	for (i=0; i<allTables.length; i++)
	{
		if (	allTables[i].getAttribute('bgcolor') == '#e3e3e2' &&
			allTables[i].getAttribute('width') == '100%' &&
			allTables[i].getAttribute('height') == '75' &&
			allTables[i].getAttribute('cellspacing') == '1' &&
			allTables[i].getAttribute('cellpadding') == '0' &&
			allTables[i].getAttribute('border') == '0' &&
			allTables[i].getAttribute('align') == 'center')
			{
				allTables[i].style.display = 'none';
			}
	}
}

function FixSignatures()
{
	//This is the new style for the signatures
	var style = 'color: #999999; font-size: 9px';
	
	for (i=0; i<allDivs.length; i++)
	{
		if (allDivs[i].className != 'signature')
			continue;
			
		allDivs[i].setAttribute('style', style);
		var childNodes = allDivs[i].getElementsByTagName('*');
		
		for (j=1; j<childNodes.length; j++)
		{		
			try
			{
				childNodes[j].setAttribute('style', style);
			}
			catch(ex) {}
		}
	}
}

function ProcessImageLinks()
{
	var fileformats= new Array()
		fileformats[0] = "jpg";
		fileformats[1] = "jpeg";
		fileformats[2] = "png";
		fileformats[3] = "gif";
		fileformats[4] = "svg";
		fileformats[5] = "bmp";
	
	var maxImagewidth = 	1200;
	var maxImageheight = 	800;
	var allElements, thisElement;
	
	for (var i=0; i<allAnchors.length; i++)
	{
		thisElement = allAnchors[i];
		
		for (var ff=0; ff<fileformats.length; ff++)
		{
			if (thisElement.href.toLowerCase().match(fileformats[ff] + "$"))
			{	
				if (!(thisElement.parentNode.id.match("post_message")))	//Not a post, probably a quote. Skip this link
					break;
				
				thisElement.href = FixLink(allAnchors[i].href);
				
				var newImage = document.createElement('img');
				var url = thisElement.href;
				
				newImage.id = "insertedImage" + i;
				newImage.alt = url;
				newImage.src = showImages ? url : '#';
				newImage.style.maxWidth = maxImagewidth + 'px';
				newImage.style.maxHeight = maxImageheight + 'px';
				newImage.style.border = '0';
				newImage.style.display = showImages ? 'block' : 'none';
				
				//The url might be to a html page that needs parsing
				getRealImageUrl(url, newImage.id);
				
				thisElement.parentNode.insertBefore(newImage, thisElement);
				
				if (showButtons)
				{
					var linkButton = document.createElement('input');
					linkButton.type = 'Button';
					linkButton.value = showImages ? 'Hide' : 'Show';
					linkButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
					linkButton.setAttribute('id', 'insertedButton' + i);
					linkButton.setAttribute('onClick', "img = document.getElementById('" + "insertedImage" + i + "'); if (img.style.display == 'block') {img.style.display = 'none'; this.value='Show'; } else { img.src = img.alt; img.style.display = 'block'; this.value='Hide'}");
	
					thisElement.parentNode.insertBefore(linkButton, newImage);
				}
			}
		}
	}
	
	//Show button 'Show all' in the top right of each post containing images
	if (showButtons)
	{
		var postTd;
		
		for (var i = 0; i < allAnchors.length; i++)
		{
			if (!(allAnchors[i].id.match("postcount")))  // Wrong anchor
			{
				continue;
			}
			postTd = allAnchors[i].parentNode;
			postTd.id = 'TD_' + allAnchors[i].id;
			
			var postImages = postTd.parentNode.parentNode.parentNode.getElementsByTagName('img');		
			//Images can be smilies, check for images inserted by this script
			var hasInsertedImages = false;
			for (var j=0; j < postImages.length; j++)
			{
				if (postImages[j].id.match("insertedImage"))
				{
					hasInsertedImages = true;
					break;
				}
			}
			
			if (!hasInsertedImages)
				continue;
			
			var postButton = document.createElement('input');				
			postButton.type = 'button';
			postButton.value = showImages ? 'Hide all' : 'Show all';
			postButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
		
			var onClickCode;
			
			onClickCode  = "var postBtnElements=document.getElementById('post_message_";
			onClickCode +=  allAnchors[i].id.substring(9);	//Post ID-number
			onClickCode += "').getElementsByTagName('input'); ";
			
			onClickCode += "for (i=0;i<postBtnElements.length;i++) { ";
			onClickCode += " if (postBtnElements[i].id.match(\"insertedButton\")) { ";
			onClickCode += "if ((this.value.match(\"Show\") && postBtnElements[i].value.match(\"Show\")) || ";
			onClickCode += "(this.value.match(\"Hide\") && postBtnElements[i].value.match(\"Hide\"))) ";
			onClickCode += "postBtnElements[i].click(); }}";
			onClickCode += "this.value = this.value.match(\"Show\") ? \"Hide all\" : \"Show all\";";	
			
			postButton.setAttribute('onClick',onClickCode);		
			postTd.insertBefore(postButton, postTd.firstChild);
		}
	}
}

function FixLink(link)
{
	if (link.match(leave + "www"))
	{
		return link.replace(leave, "http://");
	}
	
	else if (link.match(leave))
	{
		return link.replace(leave, "");
	}
	else if (!(link.match("://")))	//"www.example.com/image.jpg"
	{
		return "http://" + link;
	}
	else
		return link;
}			

function getRealImageUrl(url, imageId)
{
	if (url.match(/((imageshack\.us)|(exs\.cx)|(echo\.cx))\/my\.php/))	//Imageshack html with image
		fixImageshackLink(url, imageId);
		
	else if (url.match("imagevenue.com/img.php"))
		fixImagevenueLink(url, imageId);
		
}

//Asynchronus, so it can't return a value.
function fixImageshackLink(linkUrl, imageId)
{
	var imageUrl;
	GM_xmlhttpRequest
	(
	{
		method:  'GET',
		url:     linkUrl,
		onload:  function(results)
		{
			page = results.responseText;
			var regexpStr = "http://img[0-9]*?\.imageshack\.us.*?\.(?:jpg|jpeg|gif|png|bmp|tif|tiff)";
			imageUrl = page.match(regexpStr);
			
			if (!imageUrl)
			{
				imageUrl = linkUrl;
			}
			
			var image = document.getElementById(imageId);
			image.alt = imageUrl;
			if (showImages)
			{
				image.src = imageUrl;
			}
		}
	}
	);
}

function fixImagevenueLink(linkUrl, imageId)
{
	var imageUrl;
	GM_xmlhttpRequest
	(
	{
		method:  'GET',
		url:     linkUrl,
		onload:  function(results)
		{
			page = results.responseText;
			var temp = page.match(/src=(?:.*?)\.(?:jpg|jpeg|gif|png|bmp|tif|tiff)\"><\/td>/i).toString();

			imageUrl = linkUrl.match(/http:\/\/img[0-9]*?\.imagevenue\.com\//);
			temp = temp.match(/.*(?:jpg|jpeg|png|gif|bmp|tif|tiff)/i);
			imageUrl += temp.toString().substring(5);
			
			if (!imageUrl)
			{
				imageUrl = linkUrl;
			}
			
			var image = document.getElementById(imageId);
			image.alt = imageUrl;
			if (showImages)
			{
				image.src = imageUrl;
			}
		}
	}
	);
}

function ShowVideos()
{
	for (var i=0; i<allAnchors.length; i++)
	{
		if (!(allAnchors[i].parentNode.id.match("post")))	//Not a post, probably a quote. Skip this link
			continue;

		if (allAnchors[i].href.match(/http:\/\/(www\.)?youtube\.com\/watch\?/))
		{
			//GM_log(allAnchors[i]);
			ShowYoutubeVideo(allAnchors[i], i);
		}		
		
		else if (allAnchors[i].href.match(/http:\/\/video\.google\.com\/videoplay\?docid/))
			ShowGoogleVideo(allAnchors[i], i);		
	}
}

function ShowYoutubeVideo(anchorElement, index)
{
		var video = document.createElement("div");
		video.id = "insertedVideo" + index;
		video.style.width = '425px';
		video.style.height = '350px';
		anchorElement.parentNode.insertBefore(video, anchorElement);
		
		var videoId = anchorElement.href.match(/watch\?v=.{11}/).toString();
		videoId = videoId.substr(8);
		
		video.innerHTML = "<object width=\"425\" height=\"350\"><param name=\"movie\" value=\"http://www.youtube.com/v/\
%VIDEOID%\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\
\"http://www.youtube.com/v/%VIDEOID%\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" \
width=\"425\" height=\"350\"></embed></object>";
		
		video.innerHTML = video.innerHTML.replace(/%VIDEOID%/g, videoId);
}

function ShowGoogleVideo(anchorElement, index)
{
	var video = document.createElement("div");
	video.id = "insertedVideo" + index;
	video.style.width = '400px';
	video.style.height = '326px';
	anchorElement.parentNode.insertBefore(video, anchorElement);
	
	var videoId = anchorElement.href.match(/docid=-?[0-9]*/).toString();
	videoId = videoId.substr(6);
	
	video.innerHTML = "<embed style=\"width:400px; height:326px;\" type=\"application/x-shockwave-flash\"\
	 src=\"http://video.google.com/googleplayer.swf?docId=%VIDEOID%&hl=en\"> </embed>";
	
	video.innerHTML = video.innerHTML.replace(/%VIDEOID%/g, videoId);
}

function ShowLinkIcons()
{
	for (var i=0; i<allAnchors.length; i++)
	{
		var thisElement = allAnchors[i];
		
		if (!((thisElement.parentNode.id.match("post_message")) || 
			(thisElement.parentNode.tagName.toLowerCase().match("li"))))
			continue;
		
		var rootAddress = thisElement.href.match(/http:\/\/.*?\//);
		
		var icon = document.createElement('img');
		icon.id = "insertedIcon" + i;
		icon.style.maxWidth = '13px';
		icon.style.maxHeight = '13px';
		icon.style.marginRight = '2px';
		icon.style.marginLeft = '2px';
		icon.src = rootAddress + "favicon.ico";
		
		thisElement.parentNode.insertBefore(icon, thisElement);
	}
}

function ShowMenu()
{
	var menu;
	try
	{
		menu = document.getElementById('usercptools').parentNode;		
	}
	catch (e)
	{
		return;
	}
	var rootControl = document.createElement('TD');
	rootControl.className = 'vbmenu_control';
	rootControl.id = 'rootcontrol';
	var rootControlLink = document.createElement('A');
	rootControlLink.innerHTML = 'Flashscript';
	rootControlLink.href = '';
	var regscript = document.createElement('SCRIPT');
	regscript.type = 'text/javascript';
	regscript.innerHTML = 'vbmenu_register("rootcontrol", 1);';
	rootControl.appendChild(rootControlLink);
	rootControl.appendChild(regscript);
	menu.insertBefore(rootControl, menu.childNodes[3]);
	
	createMainMenu('rootcontrol', favoriteForumArray);
}

function createMainMenu(controlId, forums)
{
	var menuScript = document.createElement('DIV');
	menuScript.className = 'vbmenu_popup';
	menuScript.id = controlId + '_menu';
	menuScript.setAttribute('style', 'display:none');
	
	var tmp = "";
	tmp = '<table cellpadding="4" cellspacing="1" border="0">';
	tmp += '<tr><td class="thead">Favoritforum</td></tr>';
	
	for (i=0; i<forums.length; i+=2)
	{
		tmp += '<tr><td class="vbmenu_option">';
		tmp += '<a href="http://www.flashback.info/forumdisplay.php?f=' + forums[i+1] + '">';
		tmp += forums[i];
		tmp += '</a></td>';
		tmp += '</tr>';
	}
	
	tmp += '</table>';	
	menuScript.innerHTML = tmp;	
	var menu = document.getElementById('usercptools').parentNode;
	menu.parentNode.parentNode.parentNode.parentNode.insertBefore(menuScript, 
		menu.parentNode.parentNode.parentNode.parentNode.childNodes[20]);
}

function ShowSubmitButtons()
{
	var editor = document.getElementById('vB_Editor_001_textarea')
	if (!editor) return;
	
	var form = editor;
	var maxIterations = 20;
	while ((form.tagName != 'FORM') && (maxIterations-- > 0))
	{
		form = form.parentNode;
	}

	var bar = document.createElement('table');
	var tr = document.createElement('tr');
	var td = document.createElement('td');
	
	var sendButton = document.createElement('input');
	sendButton.type = 'submit';
	sendButton.value = 'Skicka svar';
	sendButton.id = 'insertedsendbutton';
	sendButton.className = 'button';
	sendButton.name = 'sbutton';
	sendButton.setAttribute('onClick', 'document.getElementById("vB_Editor_001_save").click()');
	
	var previewButton = document.createElement('input');
	previewButton.type = 'submit';
	previewButton.value = 'Forhandsgranska inlagg';
	previewButton.id = 'insertedpreviewbutton';
	previewButton.className = 'button';
	previewButton.name = 'preview';
	previewButton.setAttribute('onClick', 'document.getElementsByName("preview")[1].click()');
	
	td.appendChild(sendButton);
	td.appendChild(previewButton);
	td.className = 'tcat';
	td.align = 'center';
	
	bar.width = '100%';
	
	tr.appendChild(td);
	bar.appendChild(tr);
	
	form.parentNode.insertBefore(bar, form);
}

function UseAdvancedEdit()
{
	var advancedEditImageData = "iVBORw0KGgoAAAANSUhEUgAAAGQAAAAPCAMAAAAlD5r/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
	U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURezq6qKjrTMzMwAAAGZmZsvLy8LC\
	wry7vFbqROIAAAC3SURBVHja3FTRDsQgCEO4zv//4yECYpZ7m/dwNWEIHbVZHIGPA8R0HEzcT6Cl\
	jdb7FBFdrwLcAmwi1wGAPwGdP0VEcQkgGIlvFRg9365MecZZvBWM+EVkThgilkWAt2rNeHNUBG+s\
	whQhXSECwE49bCDsuBNYQWojedaIbpI9mBOaTuAiNqEE8Roye4acuZGLiDvBU0T8Ee+tIZsc8vyV\
	nEL1m4TI+/gfkXLjz4nstugXf+FbgAEAQ/sYUxRPkY4AAAAASUVORK5CYII=";

	for (var i=0; i<allAnchors.length; i++)
	{
		if ((allAnchors[i].href.match("http://www.flashback.info/editpost.php")) &&
			!(window.location.href.match("editpost.php")))
		{	
			allAnchors[i].name = "";
			allAnchors[i].firstChild.src = "data:image/png;base64," + advancedEditImageData;
		}
	}
}

function ChangeLeftColumnWidth()
{
	for (var i=0; i<allTableData.length; i++)
	{
		if ((allTableData[i].width == 175) && allTableData[i].className == 'alt2')
		{
			allTableData[i].width = leftColumnWidth;
		}
	}
}

function ExpandCodeWindows()
{
	// Code & HTML
	for (i=0; i<allPres.length; i++)
	{
		if (allPres[i].className == 'alt2')
		{
			allPres[i].style.width = "100%";
		}
	}
	
	// PHP
	for (i=0; i<allDivs.length; i++)
	{
		if ((allDivs[i].className == 'alt2') &&
			(allDivs[i].style.width == '640px'))
		{
			allDivs[i].style.width = '100%';
		}
	}	
}

/*(function ()
{
    var han = "<span onClick=\"if(this.innerHTML=='han') this.innerHTML='honom'; else this.innerHTML='han';\">han</span>";
	var hon = "<span onClick=\"if(this.innerHTML=='hon') this.innerHTML='henne'; else this.innerHTML='hon';\">hon</span>";
	
	for (i=0; i<allDivs.length; i++)
	{
		try
		{
			if (allDivs[i].id.indexOf('post_message')==-1)
				continue;
			
			allDivs[i].innerHTML = allDivs[i].innerHTML.replace(/\bhon\b/g, hon);
			allDivs[i].innerHTML = allDivs[i].innerHTML.replace(/\bhan\b/g, han);
		}
		catch(e)
		{
		}
	}
})();*/

function ShowTooltips()
{
	var divNode = document.createElement('div');
	divNode.setAttribute('style', 'display: none');
	divNode.id = 'tooltip';
	divNode.className = 'tooltip';
	document.getElementsByTagName('body')[0].appendChild(divNode);
	
	GM_addStyle(createTooltipCSS());
	
	var scriptNode = document.createElement('script');
	scriptNode.type = "text/javascript";
	var code = "";
	code += "var tID;";
	
	code += "function positionTooltip(e) {"; 
	code += "var div = document.getElementById('tooltip');"; 
	code += "div.style.left = (e.pageX + 15) + 'px';"; 
	code += "div.style.top = (e.pageY + 2) + 'px';}";
	
	code += "document.onmousemove = positionTooltip;";
	
	code += "function createTooltipHTML(nick, image, headline, message) {";
	code += "var html=\"<table class=tooltip><tr><th class=tooltip colspan=2>%HEADLINE%</th></tr><tr><td class=tooltip_avatar>%USERNAME%<br>\" +";
	code += "\"<img src='%IMGPATH%' class=tooltip></td><td class=tooltip_message>%MESSAGE%</td></tr></table>\";";
	code += "html = html.replace('%USERNAME%', nick);";
	code += "html=html.replace('%IMGPATH%', image);"; 
	code += "html=html.replace('%HEADLINE%', headline);"; 
	code += "html=html.replace('%MESSAGE%', message);";
	code += "return html;}";
	
	code += "function showTooltip() {";
	code += "var div = document.getElementById('tooltip');";
	code += "div.style.display = 'block';}"; 
	
	code += "function hideTooltip() {";
	code += "var div = document.getElementById('tooltip');"; 
	code += "div.style.display = 'none';"
	code += "clearTimeout(tID);}";
	
	code += "function startTooltip(td) { ";
	code += "var div = document.getElementById('tooltip');";
	code += "var nick = td.getElementsByTagName('span')[td.getElementsByTagName('span').length-1].innerHTML;"
	code += "var image = \"http://www.flashback.info/image.php?u=\" + td.getElementsByTagName('span')[td.getElementsByTagName('span').length-1].getAttribute('onClick').match(/(?:\\d)+/);";
	code += "var headline = document.getElementById('thread_title_'+td.id.match(/(?:\\d)+/)).innerHTML;";
	code += "var message = td.getAttribute('_title');";
	code += "div.innerHTML = createTooltipHTML(nick, image, headline, message);"; 
	code += "tID = setTimeout(\"showTooltip()\", 800); }";
	
	scriptNode.innerHTML = code;
	document.getElementsByTagName('head')[0].appendChild(scriptNode);
	
	if (showOnLinks)
	{
		for (i=0; i<allAnchors.length; i++)
		{
			var co = allAnchors[i];
			if (co.id.indexOf('thread_title') == -1)
			{
				continue;
			}
			
			var td = co.parentNode;
			while (td.nodeName.indexOf('TD') == -1)
			{
				td = td.parentNode;
			}
			td.setAttribute('_title', td.title);
			td.setAttribute('title', '');
			co.setAttribute('onMouseOver', "startTooltip(document.getElementById('" + td.id + "'))");
			co.setAttribute('onMouseOut', 'hideTooltip()');
		}
	}
	else
	{
		for (var i=0; i<allTableData.length; i++)
		{
			var current = allTableData[i];
			if (!(current.id.match('td_title_')))
			{
				continue;
			}
			current.setAttribute('_title', current.title);
			current.setAttribute('title', '');
			
			current.setAttribute('onMouseOver', "startTooltip(this)");
			current.setAttribute('onMouseOut', 'hideTooltip()');
		}
	}
}

function createTooltipCSS()
{
	var css;
	css = 'div.tooltip { position: absolute; z-index: 1000; } ';
	css += 'table.tooltip { border-collapse: collapse; width: 450px; height: 80px; border: 1px solid #000; } ';
	css += 'th.tooltip { border: 1px solid #000; background-color: #d1d1d1; font: bold 13px verdana; opacity: 0.9; height: 16px;} ';
	css += 'td.tooltip_avatar { border: 1px solid #000; width: 70px; background-color: #dbdbdb; font: bold 11px verdana; ';
	css += 'vertical-align: top; opacity: 0.85; padding: 2px; } ';
	css += 'th.tooltip { border: 1px solid #000; background-color: #d1d1d1; font: bold 11px verdana; opacity: 0.9; } ';
	css += 'td.tooltip_message { border: 1px solid #000; background-color: #e3e3e3; font: 12px verdana; vertical-align: top; opacity: 0.85; white-space: -moz-pre-wrap; } ';
	css += 'img.tooltip { display: block; max-width: 75px; max-height: 75px; opacity: 1.0; margin-top: 5px; margin-left: auto; margin-right: auto; } ';
	
	return css;
}