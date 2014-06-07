// This is a Greasemonkey script which fixes some annoying things with the Flashback forum
// and adds a couple of new ones
// Author: Oneman mod by D.A. and epost72
//
// ==UserScript==
// @name	Flashscript2:1
// @description	Adds a couple of functions to www.flashback.org
// @include	http://www.flashback.org*
// @include	http://flashback.org*
// @include	https://www.flashback.org*
// @include	https://flashback.org*
// ==/UserScript==

// Settings variables. Don't touch these unless you know you have to.
// Use the HTML-settings instead.

var fixLinks			= true;
var biggerTextbox 		= true;
var textboxHeight		= 500;
var textboxWidth		= 700;
var replaceRedStar		= true;
var fixSignatures 		= true;
var processImageLinks 		= true;	//Needs to be true for the following two settings to work
var showImages			= true;
var showButtons			= true;
var maxImageWidth		= 800;
var maxImageHeight		= 800;
var showVideos			= true;
var showSubmitButtons 		= true;
var useAdvancedEdit		= true;
var leftColumnWidth		= 130;	//Default is 175
var expandCodeWindows		= true;
var showTooltips		= false;
var showOnLinks			= true;
var quoteMultiple		= true;
var signatureStyle		= 'color: #999999; font-size: 9px;';
var fixArchiveLinks		= true;
var useColumns			= true;
var numberOfColumns		= 4;

//favoriteForumArray is in the format "Name", forum ID
var favoriteForums = new Array(
		"Dator och IT-support", 133,
		"Flashback", 29
		);
var otherLinks = new Array();

//End of settings. Do not touch the code below unless you know what you're doing

var allAnchors = document.getElementsByTagName('a');
try { var postsAnchors = document.getElementById('posts').getElementsByTagName('a'); } catch (e) {}
var allTableData = document.getElementsByTagName('td');
var allImages = document.getElementsByTagName('img');
var allTables = document.getElementsByTagName('table');
var allDivs = document.getElementsByTagName('div');
var allPres = document.getElementsByTagName('pre');
var allObjects = document.getElementsByTagName('object');

var advancedEditImageData = "iVBORw0KGgoAAAANSUhEUgAAAGQAAAAPCAMAAAAlD5r/AAAABGdBTUEAAK/INwWK6QAAABl0RVh0\
							U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAYUExURezq6qKjrTMzMwAAAGZmZsvLy8LC\
							wry7vFbqROIAAAC3SURBVHja3FTRDsQgCEO4zv//4yECYpZ7m/dwNWEIHbVZHIGPA8R0HEzcT6Cl\
							jdb7FBFdrwLcAmwi1wGAPwGdP0VEcQkgGIlvFRg9365MecZZvBWM+EVkThgilkWAt2rNeHNUBG+s\
							whQhXSECwE49bCDsuBNYQWojedaIbpI9mBOaTuAiNqEE8Roye4acuZGLiDvBU0T8Ee+tIZsc8vyV\
							nEL1m4TI+/gfkXLjz4nstugXf+FbgAEAQ/sYUxRPkY4AAAAASUVORK5CYII=";
	
var quoteMultipleImageData = "iVBORw0KGgoAAAANSUhEUgAAAEYAAAAPCAMAAABup0kSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
							bWFnZVJlYWR5ccllPAAAACdQTFRFtra6x8fHlJWmu7q7xcXFwMDAvb29ycnJ6+npZmZmAAAAMzMz\
							zMzMyPzwQQAAAKxJREFUeNrMk8ESwyAIRDWaYpH//94uqBF7tB66GZFhmYfJxCD1gCTUckA11LSn\
							+RaSEjCvPdUrNF0gAHPvqb6HQFBMZuYba+wuZDPh9MQ5HpOByWjKLfDM0fzU1qQ7iil4gMmKicQE\
							cVs6aYYYo8WeeMdOU+w0MQJDK6blLMJPbUmG405DBIxQn6Cm6CTRXaxftGZV+nLctxFRzJ7+C+P+\
							4p8wCzKcueEfAQYAD9gkl9d5M28AAAAASUVORK5CYII=";

var clearQuotesImageData = "iVBORw0KGgoAAAANSUhEUgAAAF0AAAAPCAMAAACx6TMNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
							bWFnZVJlYWR5ccllPAAAACFQTFRFvb29urq7xcXFwL/AwMDAycnJ6+npZmZmAAAAMzMzzMzM21Q+\
							GwAAANNJREFUeNrUlN0ShCAIhY2kgPd/4OUATrYz7VVe7BEsfvx0nKlmuk7W9Fgnbbq9qusqbNtA\
							b2/qOqx64OHeXRJ21/5DKFdHryCk55D23emdRKRTd5PhyDxM0V5NcLoXZzoFnYRiCaVFnMmniaam\
							TJbNdAKdiaUsB9dWkanTyXfOm9gl6ZlC1unHGa7EoGcdloNzGVZc6fE2d0z0YayBxgYODrqJGVh4\
							po8gKhhSbzJa44ETAJpFdrO4mSNuxszp9qqme/87+vStrqDfdmpL/5EfAQYAU7Ak34O0n68AAAAA\
							SUVORK5CYII=";

var columnsImageData =	"iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAMAAACOacfrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
								bWFnZVJlYWR5ccllPAAAAAZQTFRFaGho////Fq7xigAAAAJ0Uk5T/wDltzBKAAAAF0lEQVR42mJg\
								RAYM+HhggMygpxxAgAEAJ4oAay951vQAAAAASUVORK5CYII=";	
var noColumnsImageData = "iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAMAAACOacfrAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ\
									bWFnZVJlYWR5ccllPAAAAAZQTFRFaGho////Fq7xigAAAAJ0Uk5T/wDltzBKAAAAFUlEQVR42mJg\
									RAYM+HiogM5yAAEGACPZAFw4g4EqAAAAAElFTkSuQmCC";
	
//Black star in base64, gif
var star = "R0lGODlhDwAPAKIAAAAAAP///4uLi1dXVy4uLhUVFQUFBf///yH5BAEAAAcALAAAAAAPAA8AAANA\
			eLo3/K/AOYCYjwCCmQHSM4yjBmwEQQ7F6b5ncR0mfHJM7RoOpG+Y1iv0EJwMhI/FB7oIWjhGIaog\
			EBWCnmiWAAA7";
	
//var tmr = (new Date()).getTime();
ReadSettings();
if (biggerTextbox && !$('vB_Editor_001_iframe'))
	BiggerTextbox();
if (replaceRedStar)
	ReplaceStar();
if (showSubmitButtons)
	ShowSubmitButtons();
if (expandCodeWindows)
	ExpandCodeWindows();
if (showTooltips)
	MakeTooltip();
if (quoteMultiple)
	QuoteMultiple();
if (fixSignatures)
	FixSignatures();

	
ShowMenu();
CreateSettingsDialog();
	
if (window.location.href.match("flashback.org/t") || window.location.href.match("flashback.org/p") 
	|| window.location.href.match("flashback.org/sp"))
{
	var anchors;
	if (!postsAnchors)
		anchors = allAnchors;
	else
		anchors = postsAnchors;
		
	for (var i = anchors.length-1; i > 0; i--)	// Reverse because the images need to be added before the buttons on posts
	{
		try
		{
			var currentAnchor = anchors[i];
		
			if (fixLinks)
				FixLinks(currentAnchor);
			if (useColumns)
				ActivateColumns(currentAnchor);
			if (processImageLinks)
			{
				ProcessImageLinks(currentAnchor);
				if (showButtons)
					ShowButtons(currentAnchor);
			}
			if (showVideos)
				ShowVideos(currentAnchor, i);
			if (useAdvancedEdit)
				UseAdvancedEdit(currentAnchor);
			if (quoteMultiple)
				InsertQuoteMultipleButtons(currentAnchor);		
		}
		catch(e)
		{
			GM_log("Error: " + e);
		}
	}
}
else if (window.location.href.match("flashback.org/t") || 
	window.location.href.match("flashback.org/p") || 
	window.location.href.match("flashback.org/sp"))
{
	if (showTooltips && showOnLinks)
	{
		for (var i = 0; i < allAnchors.length; i++)
		{
			AddTooltipToAnchor(currentAnchor);
		}
	}
}

for (var i = 0; i < allTableData.length; i++)
{
	if (showTooltips && !showOnLinks)
	{
		AddTooltipToTd(allTableData[i]);
	}
	if(leftColumnWidth != 175)
	{
		ChangeLeftColumnWidth(allTableData[i]);
	}
}

for (var i = 0; i < allDivs.length; i++)
{
	if (expandCodeWindows)
	{
		ExpandPhpWindows(allDivs[i]);
	}
}

//////////////
// Functions
//////////////

function embedFunction(s) 
{
	document.body.appendChild(document.createElement('script')).innerHTML=s.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2');
}

function insertAfter(newNode, node)
{ 
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function $(id)
{
	return document.getElementById(id);
}

function $x(expression, context)
{
	if(!context)
		context = document;
	var i, arr = [], xpr = document.evaluate(expression, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for(i = 0; item = xpr.snapshotItem(i); i++)
	{
		arr.push(item);
	}
	return arr;
}

function encodeRE(s)
{
	return s.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
}

//Make the textbox bigger
function BiggerTextbox() 
{	
	try 
	{
		var textArea = document.getElementById('vB_Editor_001_textarea');
		if (!textArea)
			return;
			
		textArea.setAttribute('style', 'width: '+textboxWidth+'px; height: '+textboxHeight+'px');
		
		for (i = 0; i < allDivs.length; i++)
		{
			if (allDivs[i].className == 'panel clear')
			{
				allDivs[i].setAttribute('style', 'background-color: #e8e8e8;');
				break;
			}
		}
	}
	catch (e)
	{
		GM_log("Fel i BiggerTextbox\n" + e);
	}
}

//Fix links
function FixLinks(currentAnchor)
{
	try
	{
		var leave = "https://www.flashback.org/leave.php?u=";
		var newUrl;
		
		if (currentAnchor.href.toLowerCase().indexOf(leave) != -1)
		{
			newUrl = unescape(currentAnchor.href.replace(leave, "")).replace(/&amp;/gi, "&");
			if (newUrl.match(/^(?:https?|ftp|mailto):\/\//) == null)	// No protocol, add http
				newUrl = "http://" + newUrl;

			currentAnchor.href = newUrl;
		}
	}
	catch (e)
	{
		GM_log("Fel i FixLinks\n" + currentAnchor.href + "\n" + e);
	}
	return currentAnchor;
}

//Fix links
function FixLinksOld(currentAnchor)
{
	try
	{
		var leave = "flashback.org/leave.php?u=";
		
		if ((currentAnchor.href.toLowerCase().indexOf(leave + "http:") != -1) ||
			(currentAnchor.href.toLowerCase().indexOf(leave + "https:") != -1) ||
			(currentAnchor.href.toLowerCase().indexOf(leave + "ftp:") != -1) ||
			(currentAnchor.href.toLowerCase().indexOf(leave + "mailto:") != -1))
		{
			currentAnchor.href = currentAnchor.href.replace(/http:\/\/(www\.)?flashback\.org\/leave\.php\?u=/g, "");
		}
		else if (currentAnchor.href.toLowerCase().indexOf(leave) != -1)
		{
			currentAnchor.href = currentAnchor.href.replace(/http:\/\/(www\.)?flashback\.org\/leave\.php\?u=/g, "http://");
		}
	}
	catch (e)
	{
		GM_log("Fel i FixLinks\n" + currentAnchor.href + "\n" + e);
	}
	return currentAnchor;
}

//Replace red star
function ReplaceStar()
{	
	try
	{
		//imageData could contain any gif image in base64 format
		var imageData = star;
		
		for (var i=0; i<allImages.length; i++)
		{
			if ((allImages[i].src.indexOf("img/misc/navbits_start.gif") != -1) ||
				(allImages[i].src.indexOf("img/misc/navbits_start_start.gif") != -1))
			{
				allImages[i].src = "data:image/gif;base64," + imageData;
				break;	//Only one star per page
			}	
		}
	}
	catch (e)
	{
		GM_log("Fel i ReplaceStar\n" + e);
	}
}

function FixSignatures()
{
	if (!window.location.href.match("flashback.org/t") || !window.location.href.match("flashback.org/p"))
		return;
	
	try
	{	
	var style = ".signature {" + signatureStyle + "}";
	style += ".signature a {" + signatureStyle + "}";
	GM_addStyle(style);
	
	}
	catch (e)
	{
		GM_log("Fel i FixSignatures\n" + e);
	}
}

function ProcessImageLinks(currentAnchor)
{
	if (window.location.href.indexOf("flashback.org/p") == -1 && 
		window.location.href.indexOf('flashback.org/t') == -1 &&
		window.location.href.indexOf('flashback.org/sp') == -1)
		return;
	
	try
	{
		if (currentAnchor.href.toLowerCase().match(/(?:jpe?g|gif|svg|bmp|png|tiff?)(?:\?0)*$/) ||
			currentAnchor.href.toLowerCase().match("tinypic.com/view") ||
			currentAnchor.href.toLowerCase().match("hidebehind.com/.+?") || 
			currentAnchor.href.toLowerCase().match("putfile.com/pic.php?") ||
			currentAnchor.href.toLowerCase().match("pixbox.se/(pic_show|pic/pic_dl)") ||
			currentAnchor.href.toLowerCase().match("dumparump.com/view.php?") ||
			currentAnchor.href.toLowerCase().match("bilddagboken.se/p/show.html?") ||
			currentAnchor.href.indexOf('quikk.se/') != -1)
		{
			if (isInSignature(currentAnchor))
				return;
			
			if (!fixLinks)
				currentAnchor = FixLinks(currentAnchor);
			
			var newImage = document.createElement('img');
			var url = currentAnchor.href;
			
			newImage.id = "insertedImage" + i;
			newImage.alt = url;
			newImage.src = showImages ? url : '#';
			newImage.style.maxWidth = maxImageWidth + 'px';
			newImage.style.maxHeight = maxImageHeight + 'px';
			newImage.style.border = '0';
			newImage.style.display = showImages && !isInQuote(currentAnchor) ? 'block' : 'none';
			
			currentAnchor.parentNode.insertBefore(newImage, currentAnchor);
			
			//The url might be to a html page that needs parsing
			getRealImageUrl(url, newImage.id);
			
			if (showButtons)
			{
				var linkButton = document.createElement('input');
				linkButton.type = 'Button';
				linkButton.value = showImages ? 'Hide' : 'Show';
				linkButton.setAttribute('style', "font-size:9px;margin:0px;padding:0px;");
				linkButton.setAttribute('id', 'insertedButton' + i);
				linkButton.setAttribute('onClick', "img = document.getElementById('" + "insertedImage" + i + "'); if (img.style.display == 'block') {img.style.display = 'none'; this.value='Show'; } else { img.src = img.alt; img.style.display = 'block'; this.value='Hide'}");

				currentAnchor.parentNode.insertBefore(linkButton, newImage);
			}
		}
	}
	catch (e)
	{
		GM_log("Fel i ProcessImageLinks\n" + currentAnchor.href + "\n" + e);
	}
}

function isInQuote(anchor)
{
	var td = anchor;
	var maxiter = 5;
	while (td.tagName.toLowerCase()!="td" && maxiter-->=0)
		td = td.parentNode;
	return td.className == "alt2";
}
function isInSignature(el)
{
	var maxiter = 6;
	while (maxiter-->=0)
	{
		if (el.id.indexOf("post_message") != -1)
			return false;
		if (el.className.indexOf("signature") != -1)
			return true;
		el = el.parentNode;			
	}
	return false;
}
	
//Show button 'Show all' in the top left of each post containing images
function ShowButtons(currentAnchor)
{
	try
	{
		if (!(currentAnchor.id.match("postcount")))  // Wrong anchor
		{
			return;
		}
		var postTd = currentAnchor.parentNode;
		
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
			return;
		
		var postButton = document.createElement('input');				
		postButton.type = 'button';
		postButton.value = showImages ? 'Hide all' : 'Show all';
		postButton.setAttribute('style', "font-size:9px;margin:0px 5px 0px 0px;padding:0px;float:left;");
	
		var onClickCode;
		
		onClickCode  = "var postBtnElements=document.getElementById('post_message_";
		onClickCode +=  currentAnchor.id.substring(9);	//Post ID-number
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
	catch (e)
	{
		GM_log("Fel i ShowButtons\n" + e);
	}
}	

function getRealImageUrl(url, imageId)
{
	if (url.match(/((imageshack\.us)|(exs\.cx)|(echo\.cx))\/my\.php/))	//Imageshack html with image
		fixImageLink(url, imageId, "href='http://img[0-9]*?\.imageshack\.us.*?\.(?:jpe?g|gif|png|bmp|tiff?).*?images/external",
			function (u) { return u.match("http.*(?:jpe?g|gif|png|bmp|tiff?)").toString(); });
		
	else if (url.match(/imagevenue\.com\/(?:view|img)\.php/))
		fixImagevenueLink(url, imageId);
	
	else if (url.match("tinypic.com/view"))
		fixImageLink(url, imageId, "http://.{1,5}?\.?tinypic\.com/[a-z0-9]+?\.(?:jpe?g|gif|png|bmp|tiff?)");
	
	else if (url.match(/wikipedia\.org.*Image:/))
		fixImageLink(url, imageId, "http://upload.wikimedia.org/wikipedia/.*?\.(?:jpe?g|gif|png|bmp|tiff?|svg)");
		
	else if (url.match("hidebehind.com/"))
		fixHidebehindLink(url, imageId);
		
	else if (url.match("putfile.com/pic.php?"))
		fixImageLink(url, imageId, "http://img.*?\.putfile\.com/main/.+?\.(?:jpe?g|gif|png|bmp|tiff?)");
		
	else if (url.match("pixbox.se/pic_show"))
		fixImageLink(url, imageId, "http://.+?pixbox\.se/.+?jpe?g.+?thePicture", 
			//function (u) { return u.match("http.+?jpg").toString().replace("640x480", "original"); });	// Original => Behörighet saknas 
			function (u) { return u.match("http.+?jpg").toString(); });
		
	else if (url.match("dumparump.com/view.php?"))
		fixDumparumpLink(url, imageId);		
	
	else if (url.match("bilddagboken.se/p/show.html?"))
	{	
		url = url.replace("&", "&");
		fixBDB(url, imageId);
		//fixImageLink(url, imageId, new RegExp("http://images[\\d]\\.bilddagboken\\.se/[\\d]{1,2}/.*/_u[\\d]/u.*?.jpg"));
	}
	else if(url.match("quikk.se"))
	{
		fixQuikk(url, imageId);
	}
}


function fixQuikk(linkUrl, imageId)
{
	try
	{
		imageUrl = linkUrl;
					
		var image = document.getElementById(imageId);
		image.alt = imageUrl;
		if (showImages)
		{
			image.src = imageUrl;
		}
	}
	catch (e)
	{
		GM_log("Fel i fixQuikk\n" + "\nID: " + imageId + "\n" + linkUrl + "\n" + e);
	}
}


//Asynchronus, so it can't return a value.
function fixImageLink(linkUrl, imageId, regexp, callback)
{
	var imageUrl;

	GM_xmlhttpRequest
	(
	{
		method:  'GET',
		url:     linkUrl,
		onload:  function(results)
		{
			try
			{
				page = results.responseText;
				imageUrl = page.match(regexp);
						
				if (!imageUrl)
					imageUrl = linkUrl;
				else
					if (callback)
						imageUrl = callback(imageUrl.toString());
					
				var image = document.getElementById(imageId);
				image.alt = imageUrl;
				if (showImages)
				{
					image.src = imageUrl;
				}
			}
			catch (e)
			{
				GM_log("Fel i fixImageLink\n" + "\nID: " + imageId + "\n" + linkUrl + "\n" + e);
			}
		}
	}
	);
}

function fixBDB(linkUrl, imageId)
{
	var imageUrl;
	GM_xmlhttpRequest(
	{
		method:  'GET',
		url:     linkUrl,
		onload:  function(results)
		{
			try
			{
				var bdbDoc	= results.responseText;
				var myRegExp	= new RegExp("http://images[\\d]\\.bilddagboken\\.se/[\\d]{1,2}/.*/_u[\\d]/u.*?.jpg");
				
				bdbDoc		= bdbDoc.substring(bdbDoc.indexOf('id="showContentImage"'));
				bdbDoc		= bdbDoc.substring(0, bdbDoc.indexOf('id="showContentImageTools"'));
			
				imageUrl	= bdbDoc.match(myRegExp);

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
			catch (e)
			{
				GM_log("Fel i BDB\n" + linkUrl + "\n" + e);
			}
		}
	});
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
			try
			{
				page = results.responseText;
				var temp = page.match(/src=.*?\.(?:jpe?g|gif|png|bmp|tiff?)\"/i).toString();
	
				imageUrl = linkUrl.match(/http:\/\/img[0-9]*?\.imagevenue\.com\//);
				temp = temp.match(/.*(?:jpg|jpeg|png|gif|bmp|tif|tiff)/i);
				imageUrl += temp.toString().substring("SRC=\"".length);
				
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
			catch (e)
			{
				GM_log("Fel i fixImagevenueLink\n" + linkUrl + "\n" + e);
			}
		}
	}
	);
}

function fixGeneralPhpLinks(linkUrl, imageId)
{
	try 
	{
		var imageUrl;
		var imageName = linkUrl.match(/=.+?\.(?:jpe?g|gif|png|bmp|tiff?)$/i);
		imageName = imageName.substr(1);
		GM_xmlhttpRequest
		(
		{
			method:  'GET',
			url:     linkUrl,
			onload:  function(results)
			{
				page = results.responseText;
				var regexpStr = "/src=(\"|')?http://.+?" + imageName; + "/i";
				imageUrl = page.match(regexpStr);
				
				if (!imageUrl)
				{
					imageUrl = linkUrl;
				}
				else
				{
					imageUrl = imageUrl.toString().match(/http.+?(?:jpe?g|gif|png|bmp|tiff?)$/);
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
	catch (e)
	{
		GM_log("Fel i fixGeneralPhpLinks\n" + linkUrl + "\n" + e);
	}
}

function fixHidebehindLink(url, imageId)
{
	try
	{	
		var imageURL;
		if (url.lenght < 28)
			imageURL = url;
		else
		{
			var id = url.match(/hidebehind\.com\/.{6}/).toString();
			id = id.substr("hidebehind.com/".length);
			imageURL = "http://www.hidebehind.com/hotlink/" + id.substr(0, 2) + "/" + id + ".jpg";
		}
			
		var image = document.getElementById(imageId);
		image.alt = imageURL;
		if (showImages)
		{
			image.src = imageURL;
		}
	}
	catch (e)
	{
		GM_log("Fel i fixHidebehindLink\n" + imageURL + "\n" + e);
	}
}

function fixDumparumpLink(linkUrl, imageId)
{
	var imageUrl;
	var regexp = "http://image.dumparump.com/.*?\.(?:jpe?g|gif|png|bmp|tiff?)"
	GM_xmlhttpRequest
	(
	{
		method:  'GET',
		url:     linkUrl,
		onload:  function(results)
		{
			try
			{
				page = results.responseText;
				imageUrl = page.match(regexp).toString();
				imageUrl = imageUrl.replace(/image/, "thumb");
				
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
			catch (e)
			{
				GM_log("Fel i fixDumparumpLink\n" + linkUrl + "\n" + e);
			}
		}
	}
	);
}

function ShowVideos(currentAnchor, index)
{
	if (!window.location.href.match("t"))
		return;
		
	try
	{
		if (!(currentAnchor.parentNode.id.match("post_message") || 
			currentAnchor.parentNode.parentNode.id.match("post_message")))	//Not a post, probably a quote. Skip this link
			return;

		if (currentAnchor.href.match(/http:\/\/.*?youtube\.com\/watch\?/i))
			ShowYoutubeVideo(currentAnchor, index);
		
		else if (currentAnchor.href.match(/http:\/\/video\.google\.com\/videoplay\?docid/i))
			ShowGoogleVideo(currentAnchor, index);
		
		else if (currentAnchor.href.match(/http:\/\/.*?liveleak\.com\/view\?/i))
			ShowLiveLeakVideo(currentAnchor, index);
	}
	catch (e)
	{
		GM_log("Fel i ShowVideos\n" + e);
	}
}

function ShowYoutubeVideo(anchorElement, index)
{
	try
	{
		var video = document.createElement("div");
		video.id = "insertedVideo" + index;
		video.style.width = '425px';
		video.style.height = '350px';
		anchorElement.parentNode.insertBefore(video, anchorElement);
		
		var videoId = anchorElement.href.match(/watch\?v=.{11}/).toString();
		videoId = videoId.substr(8);
		
		video.innerHTML = "<object width=\"425\" height=\"350\"><param name=\"movie\" value=\"http://www.youtube.com/v/\
%VIDEOID%\"></param><param name=\"allowFullScreen\" value=\"true\"></param><param name=\"wmode\" value=\"transparent\"></param><embed src=\
\"http://www.youtube.com/v/%VIDEOID%?fs=1&hd=1&showinfo=3\" type=\"application/x-shockwave-flash\" wmode=\"transparent\" \
width=\"425\" height=\"350\" allowfullscreen=\"true\"></embed></object>";
		
		video.innerHTML = video.innerHTML.replace(/%VIDEOID%/g, videoId);
	}
	catch (e)
	{
		GM_log("Fel i ShowYoutubeVideo\n" + e);
	}
}

function ShowGoogleVideo(anchorElement, index)
{
	try
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
	catch (e)
	{
		GM_log("Fel i ShowGoogleVideo\n" + e);
	}
}

function ShowLiveLeakVideo(anchorElement, index)
{
	try
	{
		var video = document.createElement("div");
		video.id = "insertedVideo" + index;
		video.style.width = '450px';
		video.style.height = '370px';
		
		var videoId = anchorElement.href.match(/view\?i=.+/).toString();
		videoId = videoId.substr("view?i=".length);
		
		video.innerHTML = "<object width='450' height='370'><param name='movie' value='http://www.liveleak.com/e/%VIDEOID%'></param><param name='wmode' value='transparent'></param><embed src='http://www.liveleak.com/e/%VIDEOID%' type='application/x-shockwave-flash' wmode='transparent' width='450' height='370'></embed></object>";
		
		video.innerHTML = video.innerHTML.replace(/%VIDEOID%/g, videoId);
		anchorElement.parentNode.insertBefore(video, anchorElement);
	}
	catch (e)
	{
		GM_log("Fel i ShowLiveLeakVideo\n" + e);
	}
}

function ShowMenu()
{
	try
	{
		var usercptools = document.getElementById('usercptools');
		if (!usercptools)
			return;
		var menu = usercptools.parentNode;		
		
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
		
		createMainMenu('rootcontrol');
	}
	catch (e)
	{
		GM_log("Fel i ShowMenu\n" + e);
	}
}

function createMainMenu(controlId)
{
	try
	{
		var menuScript = document.createElement('DIV');
		menuScript.className = 'vbmenu_popup';
		menuScript.id = controlId + '_menu';
		menuScript.setAttribute('style', 'display:none');
		
		var tmp = "";
		
		tmp += '<table cellpadding="4" cellspacing="1" border="0">';
		tmp += "<tr><td class='thead'>";
		tmp += "<a href='#' onClick='showFlasshcriptSettings(); return false;'>Inställningar...</a>";
		tmp += '</a></td>';
		tmp += '</tr>';
		tmp += '<tr><td class="thead">Favoritforum</td></tr>';
		
		for (i=0; i<favoriteForums.length; i+=2)
		{
			tmp += '<tr><td class="vbmenu_option">';
			tmp += '<a href="http://www.flashback.org/t' + favoriteForums[i+1] + '">';
			tmp += favoriteForums[i];
			tmp += '</a></td>';
			tmp += '</tr>';
		}
		
		if (otherLinks.length > 1)
		{
			tmp += '<tr><td class="thead">Andra länkar</td></tr>';
		
			for (i=0; i<otherLinks.length; i+=2)
			{
				if (otherLinks[i].length==0) continue;
				tmp += '<tr><td class="vbmenu_option">';
				tmp += '<a href="' + otherLinks[i+1] + '">';
				tmp += otherLinks[i];
				tmp += '</a></td>';
				tmp += '</tr>';
			}
		}
		
		tmp += '</table>';	
		menuScript.innerHTML = tmp;	
		var menu = document.getElementById('usercptools').parentNode;
		menu.parentNode.parentNode.parentNode.parentNode.insertBefore(menuScript, 
			menu.parentNode.parentNode.parentNode.parentNode.childNodes[20]);
	}
	catch (e)
	{
		GM_log("Fel i createMainMenu\n" + e);
	}
}

function ShowSubmitButtons()
{
	try
	{
		var editor = document.getElementById('vB_Editor_001_textarea')
		if (!editor) 
			return;
		
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
		sendButton.value = document.getElementById("vB_Editor_001_save").value;
		sendButton.id = 'insertedsendbutton';
		sendButton.className = 'button';
		sendButton.name = 'sbutton';
		sendButton.setAttribute('onClick', 'document.getElementById("vB_Editor_001_save").click()');
		
		var previewButton = document.createElement('input');
		previewButton.type = 'submit';
		previewButton.value = document.getElementsByName("preview")[1].value;
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
	catch (e)
	{
		GM_log("Fel i ShowSubmitButtons\n" + e);
	}
}


function UseAdvancedEdit(currentAnchor)
{
	if (!window.location.href.match(/(?:showthread|showpost)\.php/))
		return;
	
	try
	{
		if ((currentAnchor.href.match("http://www.flashback.org/editpost.php")))
		{	
			currentAnchor.name = "";
			currentAnchor.firstChild.src = "data:image/png;base64," + advancedEditImageData;
		}
	}
	catch (e)
	{
		GM_log("Fel i UseAdvancedEdit\n" + e);
	}
}

function ChangeLeftColumnWidth(currentTd)
{
	if (!window.location.href.match(/(?:showthread|showpost)\.php/))
		return;
		
	try
	{
		if ((currentTd.width == 175) && currentTd.className == 'alt2')
		{
			currentTd.width = leftColumnWidth;
		}
	}
	catch (e)
	{
		GM_log("Fel i ChangeLeftColumnWidth\n" + e);
	}
}

function ExpandCodeWindows()
{
	if (!window.location.href.match(/(?:showthread|showpost|private|newreply)\.php/))
		return;
		
	try
	{
		// Code & HTML
		for (i=0; i<allPres.length; i++)
		{
			if (allPres[i].className == 'alt2')
			{
				//allPres[i].style.width = (document.documentElement.clientWidth - 300) + "px";
				allPres[i].style.width = "100%";
			}
		}
	}
	catch (e)
	{
		GM_log("Fel i ExpandCodeWindows\n" + e);
	}
}
function ExpandPhpWindows(currentDiv)
{
	// PHP
	try
	{
		if ((currentDiv.className == 'alt2') &&	(currentDiv.style.width == '640px'))
		{
			currentDiv.style.width = (document.documentElement.clientWidth - 300) + "px";
			currentDiv.style.width = "100%";
		}
	}
	catch (e)
	{
		GM_log("Fel i ExpandPhpWindows\n" + e);
	}
}

function MakeTooltip()
{
	if (!window.location.href.match(/(?:forumdisplay|search|private)\.php/))
		return;
		
	try
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
		code += "var image = \"http://www.flashback.org/image.php?u=\" + td.getElementsByTagName('span')[td.getElementsByTagName('span').length-1].getAttribute('onClick').match(/(?:\\d)+/);";
		code += "var headline = document.getElementById('thread_title_'+td.id.match(/(?:\\d)+/)).innerHTML;";
		code += "var message = td.getAttribute('_title');";
		code += "div.innerHTML = createTooltipHTML(nick, image, headline, message);"; 
		code += "tID = setTimeout(\"showTooltip()\", 800); }";
		
		scriptNode.innerHTML = code;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	}
	catch (e)
	{
		GM_log("Fel i MakeTooltip\n" + e);
	}
}

function AddTooltipToAnchor(anchor)
{
	if (anchor.id.indexOf('thread_title') == -1)
	{
		return;
	}
	try
	{
		var td = anchor.parentNode;
		while (td.nodeName.indexOf('TD') == -1)
		{
			td = td.parentNode;
		}
		td.setAttribute('_title', td.title);
		td.setAttribute('title', '');
		anchor.setAttribute('onMouseOver', "startTooltip(document.getElementById('" + td.id + "'))");
		anchor.setAttribute('onMouseOut', 'hideTooltip()');
	}
	catch (e)
	{
		GM_log("Fel i AddTooltipToAnchor\n" + e);
	}
}

function AddTooltipToTd(td)
{
	if (!(td.id.match('td_title_')))
	{
		return;
	}
	try
	{
		td.setAttribute('_title', td.title);
		td.setAttribute('title', '');
		
		td.setAttribute('onMouseOver', "startTooltip(this)");
		td.setAttribute('onMouseOut', 'hideTooltip()');
	}
	catch (e)
	{
		GM_log("Fel i AddTooltipToTd\n" + e);
	}
}

function createTooltipCSS()
{
	try
	{
		var css;
		css = 'div.tooltip { position: absolute; z-index: 1000; } ';
		css += 'table.tooltip { border-collapse: collapse; width: 450px; height: 80px; border: 1px solid #000; } ';
		css += 'th.tooltip { border: 1px solid #000; background-color: #d1d1d1; font: bold 13px verdana; opacity: 0.9; height: 16px;} ';
		css += 'td.tooltip_avatar { border: 1px solid #000; width: 70px; background-color: #dbdbdb; font: bold 11px verdana; ';
		css += 'vertical-align: top; opacity: 0.9; padding: 2px; } ';
		css += 'th.tooltip { border: 1px solid #000; background-color: #d1d1d1; font: bold 11px verdana; opacity: 0.9; } ';
		css += 'td.tooltip_message { border: 1px solid #000; background-color: #e3e3e3; font: 12px verdana; vertical-align: top; opacity: 0.9; white-space: -moz-pre-wrap; } ';
		css += 'img.tooltip { display: block; max-width: 75px; max-height: 75px; opacity: 1.0; margin-top: 5px; margin-left: auto; margin-right: auto; } ';
	}
	catch (e)
	{
		GM_log("Fel i createTooltipCss\n" + e);
	}
	
	return css;
}

function addQuote(qBtn) 
{
    var quoteText = "";    
    var postcontainer = qBtn;    
    while (postcontainer.tagName != 'TABLE') 
    {
        postcontainer=postcontainer.parentNode;      
    }
    
    var postid = postcontainer.id.match(/[\d]+/);    
    var post = document.getElementById('post_message_' + postid);    
    var username = document.getElementById('postmenu_' + postid).childNodes[1].text;    
    quoteText += '[quote=' + username + ']';
    
    for (var i=0; i < post.childNodes.length; i++) 
    {
		quoteText += parseQuoteNode(post.childNodes[i]);
    }
	
	quoteText += "[/quote]\n\n";
	
	var storage;
	if (navigator.userAgent.indexOf("Firefox/2") != -1)
		storage = unsafeWindow.globalStorage.namedItem('flashback.org').wrappedJSObject;	// Firefox 2
	else
		storage = unsafeWindow.globalStorage[document.location.host];		// Firefox 3
    
    if (storage.savedQuotes)
		storage.savedQuotes += quoteText;
    
    else
		storage.savedQuotes = quoteText;
}

function parseQuoteNode(currentNode)
{
	if (currentNode.nodeType == 3)	// Textnode
	{
		return currentNode.data;            
	}
	
	if (currentNode.nodeType != 1) 
		return "";
	
	var returnText = "";
	switch (currentNode.tagName.toLowerCase())
	{
	case "div":
		returnText += parseDiv(currentNode);
		break;	
	case "img":
		returnText += parseImg(currentNode);
		break;	
	case "a":
		if (currentNode.href == currentNode.text)
			returnText += "[url]" + currentNode.href + "[/url]";
		else
			returnText += "[url=" + currentNode.href + "]" + currentNode.text + "[/url]";
		break;		
	case "b":
		returnText += "[b]";
		for (var i=0; i<currentNode.childNodes.length; i++)
			returnText += parseQuoteNode(currentNode.childNodes[i]);
		returnText += "[/b]";
		break;		
	case "i":
		returnText += "[i]";
		for (var i=0; i<currentNode.childNodes.length; i++)
			returnText += parseQuoteNode(currentNode.childNodes[i]);
		returnText += "[/i]";
		break;		
	case "u":
		returnText += "[u]";
		for (var i=0; i<currentNode.childNodes.length; i++)
			returnText += parseQuoteNode(currentNode.childNodes[i]);
		returnText += "[/u]";
		break;		
	case "span":
		if (currentNode.className == "highlight")
		{
			returnText += "[highlight]"
			for (var i=0; i<currentNode.childNodes.length; i++)
				returnText += parseQuoteNode(currentNode.childNodes[i]);
			returnText += "[/highlight]";
		}
		else
		{
			for (var i=0; i<currentNode.childNodes.length; i++)
				returnText += parseQuoteNode(currentNode.childNodes[i]);
		}
		break;		
	case "ol":
		returnText += "[list=1]";            
		for (var j=0; j < currentNode.childNodes.length; j++)
		{
			returnText += "[*]";
			for (var i=0; i<currentNode.childNodes[j].childNodes.length; i++)
				returnText += parseQuoteNode(currentNode.childNodes[j].childNodes[i]) + "\n";
		}
		returnText += "[/list]";
		break;
	case "ul":
		returnText += "[list]";            
		for (var j=0; j < currentNode.childNodes.length; j++)
		{
			returnText += "[*]";
			for (var i=0; i<currentNode.childNodes[j].childNodes.length; i++)
				returnText += parseQuoteNode(currentNode.childNodes[j].childNodes[i]) + "\n";
		}
		returnText += "[/list]";
		break;		
	default:
		returnText += currentNode.textContent;
	}
	
	return returnText;
}

function parseDiv(divElement) 
{
    var returnText = "";
    
    try
    {
        var divtype = divElement.childNodes[1].firstChild.textContent;
        
        if (divtype.indexOf('Citat:') != -1) 
			return returnText;	// Don't quote quotes
        
        else if (divtype.indexOf('PHP-kod:') !=-1 )
        {
            returnText += "[php]" + divElement.getElementsByTagName("code")[1].textContent + "[/php]";          
        }
        
        else if (divtype.indexOf("Kod:") != -1) 
        {
            returnText += "[code]";
            var prediv = divElement.childNodes[3].firstChild;
            
            for (var j=0; j < prediv.childNodes.length; j++) 
            {
                if (prediv.childNodes[j].nodeType == 3) 
					returnText += prediv.childNodes[j].data;
            }
            returnText += "[/code]";
        }
        
        else if (divtype.indexOf('HTML-kod:') != -1)
        {
            returnText += "[html]";            
            var prediv = divElement.childNodes[3].firstChild;
            
            for (var j=0; j < prediv.childNodes.length; j++)
            {
                if (prediv.childNodes[j].nodeType==3) 
					returnText += prediv.childNodes[j].data;
            }
            returnText += "[/html]";
        }
        
        else if (divtype.indexOf('Spoiler:') != -1)
        {
            returnText += "[spoiler]";            
            
            for (var j=0; j < divElement.childNodes[3].childNodes[1].childNodes.length; j++)
            {
                returnText += parseQuoteNode(divElement.childNodes[3].childNodes[1].childNodes[j]);
            }
            returnText += "[/spoiler]";
        }
    }
    
    catch(e) 
    {
		GM_log("Fel i parseDiv()\n" + e);
    }
    return returnText;
}

function parseImg(imageElement) 
{
	try 
	{
		if (imageElement.id.indexOf('insertedImage') != -1) 
			return "";
        
        switch (imageElement.title.toLowerCase()) 
        {
        case 'smile': 
			return ':)';            
            break;            
        case 'cry':
			return ":'(";            
            break;            
        case 'whink': 
			return ";)";            
            break;            
        case 'ohmy':
			return ':o';            
            break;            
        case 'tongue':
			return ':p';            
            break;            
        case 'grin': 
			return ':D';            
            break;            
        case 'noexpression': 
			return ':|';            
            break;            
        case 'sad': 
			return ':(';            
            break;            
        default: 
			return ":" + imageElement.title.toLowerCase() + ":";
        }
    }
    
    catch(e) {}
    return returnText;
}

function InsertQuoteMultipleScripts()
{
	if (!window.location.href.match(/(?:showthread|showpost)\.php/))
		return;
		
	unsafeWindow.addQuote = addQuote;
	unsafeWindow.parseDiv = parseDiv;
	unsafeWindow.parseImg = parseImg;	
}


function InsertQuoteMultipleButtons(currentAnchor)
{
	if (!window.location.href.match(/(?:showthread|showpost)\.php/))
		return;
		
	try
	{	
		if (currentAnchor.href.indexOf("newreply.php?do=newreply")==-1)
			return;
			
		if (currentAnchor.href.indexOf("&noquote=1")==-1)
		{
			var qmBtn = document.createElement('a');
			qmBtn.href = "#";
			qmBtn.setAttribute('onClick', "javascript: addQuote(this); this.firstChild.style.opacity = '0.3'; this.setAttribute('onclick' , 'javascript: return false;'); return false;");
				
			var qmBtnImg = document.createElement('img');
			qmBtnImg.src = "data:image/png;base64," + quoteMultipleImageData;
			qmBtnImg.border = 0;
			qmBtnImg.alt = qmBtnImg.title = "Spara citat/Citera flera";
			qmBtnImg.setAttribute('style', "opacity: 1.0;");
			
			qmBtn.appendChild(qmBtnImg);
			currentAnchor.parentNode.appendChild(qmBtn);
		}
	}
	catch (e)
	{
		GM_log("Fel i InsertQuoteMultipleButtons\n" + e);
	}
}

function PasteAndClearQuotes()
{
	if (window.location.href.indexOf('newreply.php')==-1)
		return;
	
	try
	{
		var code = '';	
		code += "(function() { ";
		code += "var storage; if (navigator.userAgent.indexOf(\"Firefox/2\") != -1) storage=window.globalStorage['flashback.org'];";
		code += "else storage = window.globalStorage[document.location.host];";
		code += "if (!storage.savedQuotes) return;";
		code += "var textArea = document.getElementById('vB_Editor_001_textarea'); ";
		code += "if (textArea.value.replace(/\\[quote.*?\\](?:\\n|.)*\\[\\/quote\\]/i, '').length<=1) ";
		code += "textArea.value = storage.savedQuotes + textArea.value; ";
		code += "storage.removeItem('savedQuotes');";
		code += "})();";
		
		var scriptNode = document.createElement('script');
		scriptNode.type = "text/javascript";
		scriptNode.innerHTML = code;
		document.getElementsByTagName('head')[0].appendChild(scriptNode);
	}
	catch (e)
	{
		GM_log("Fel i PasteAndClearQuotes\n" + e);
	}
}

function QuoteMultiple()
{
	InsertQuoteMultipleScripts();
	PasteAndClearQuotes();
}

function CreateSettingsDialog()
{
	try
	{
		if (document.getElementsByTagName('body')[0].getAttribute('contenteditable') == "true")	// Advanced editor
			return;
		var settingsDiv = document.createElement('div');
		var backgroundDiv = document.createElement('div');
		var settingsDialog = document.createElement('div');
		var shadowDiv = document.createElement('div');
		var dialogWidth = 420;
		var dialogHeight = 770;
		
		settingsDiv.appendChild(backgroundDiv);
		settingsDiv.appendChild(settingsDialog);
		settingsDiv.appendChild(shadowDiv);
		
		settingsDiv.id="settingsDiv";
		settingsDiv.setAttribute('style', "display: none; position: absolute; left: 0px; top: 0px; " + 
			"min-width: 100%; min-height: 100%;");
		
		backgroundDiv.setAttribute('style', "min-width: 100%; min-height: 100%; opacity: 0.7; " + 
			"z-index: 1009; position: fixed; background-color: #000000;");
		backgroundDiv.id="backgroundDiv";
		
		settingsDialog.setAttribute('style', "background-color: #eff0f1; position: absolute; " + 
			"z-index: 1011; width: "+dialogWidth+"px; height: "+dialogHeight+"px; left: "+(window.innerWidth/2-8-dialogWidth/2)+"px; top: 40px;"+
			"padding: 10px;");
		shadowDiv.setAttribute('style', "background-color: #000000; position: absolute; opacity: 0.5;" + 
			"z-index: 1010; width: "+dialogWidth+"px; height: "+dialogHeight+"px; left: "+(window.innerWidth/2-dialogWidth/2)+"px; top: 48px; padding: 10px;");
		
		var hc = "";
		
		hc += "<h4 align=center>Flashscriptinställningar</h4>";
		hc += "<form name='settingsform' id='settingsform'>";
		hc += "<input type=checkbox name=fixlinks title='Tar bort sidan \"Du lämnar nu Flashback\" när man klickar på en länk'>";
		hc += "<label for=fixlinks title='Tar bort sidan \"Du lämnar nu Flashback\" när man klickar på en länk'>Fixa utgående länkar</label><br>";
		hc += "<input type=checkbox name=biggertextbox title='Gör textrutan när man skriver inlägg och PM större'>";
		hc += "<label for=biggertextbox title='Gör textrutan när man skriver inlägg och PM större'>Större textruta när man skriver inlägg och PM</label><br>";
		hc += "     Bredd: <input type=text name=textboxwidth size=1> pixlar  Höjd: <input type=text name=textboxheight size=1> pixlar<br>";
		hc += "<input type=checkbox name=replaceredstar title='Ersätt den röda stjärnan med en svart'>";
		hc += "<label for=replaceredstar title='Ersätt den röda stjärnan med en svart'>Ersätt den röda stjärnan med en svart</label><br>";
		hc += "<input type=checkbox name=fixsignatures title='Byt stil på signaturerna med CSS-kod'>";
		hc += "<label for=fixsignatures title='Byt stil på signaturerna med CSS-kod'>Byt stil på signaturer</label><br>";
		hc += "     Ny CSS-kod: <input type=text name=signaturestyle size=26><br>";
		hc += "<input type=checkbox name=processimagelinks title='Infoga bilder direkt i inlägg med länkar till bilder'>";
		hc += "<label for=processimagelinks title='Infoga bilder direkt i inlägg med länkar till bilder'>Infoga bilder i inlägg</label><br>";
		hc += "     <input type=checkbox name=showimagebuttons title='Visa knappar för att visa/dölja bilder'>";
		hc += "<label for=showimagebuttons title='Visa knappar för att visa/dölja bilder'>Visa knappar för att visa eller dölja bilder</label><br>";
		hc += "     <input type=checkbox name=showimages title='Visa bilder direkt'>";
		hc += "<label for=showimages title='Visa bilder direkt'>Visa bilderna direkt</label><br>";
		hc += "      Maxbredd: <input type=text name=maximagewidth size=1> pixlar   Maxhöjd: <input type=text name=maximageheight size=1> pixlar<br>";
		hc += "<input type=checkbox name=showvideos title='Infoga filmer från Youtube och Google Video direkt i inlägg med länkar till filmer'>";
		hc += "<label for=showvideos title='Infoga filmer från Youtube och Google Video direkt i inlägg med länkar till filmer'>Infoga filmer från Youtube och Google Video i inlägg</label><br>";
		hc += "<input type=checkbox name=showsubmitbuttons title='Visa Skicka- och Förhandsgranskningsknappar över textrutan när man skriver inlägg'>";
		hc += "<label for=showsubmitbuttons title='Visa Skicka- och Förhandsgranskningsknappar över textrutan när man skriver inlägg'>Visa Skicka och Förhandsgranska-knapparna över textrutan</label><br>";
		hc += "<input type=checkbox name=useadvancededit title='Gå direkt till den avancerade editorn när man redigerar ett inlägg'>";
		hc += "<label for=useadvancededit title='Gå direkt till den avancerade editorn när man redigerar ett inlägg'>Använd avancerad editor när man redigerar inlägg</label><br>";
		hc += " Bredd på den vänstra kolumnen (standard är 175): <input type=text name=leftcolumnwidth title='Bredd på kolumnen med avatarer, användarnamn mm' size=1> pixlar<br>";
		hc += "<input type=checkbox name=expandcodewindows title='Bredda kod-, PHP- och HTML-rutor till hela fönsterbredden'>";
		hc += "<label for=expandcodewindow title='Expandera kod-, PHP- och HTML-rutor till hela fönsterbredden'>Expandera kodrutor</label><br>";
		hc += "<input type=checkbox name=showtooltip title='Visa inforuta med ett utdrag ur första inlägget när man hovrar över en länk till en tråd'>";
		hc += "<label for=showtooltip title='Visa inforuta med ett utdrag ur första inlägget när man hovrar över en länk till en tråd'>Visa tooltip</label><br>";
		hc += "     Visa när man hovrar över: ";
		hc += "<input type=radio name=showtooltiponlinks title='Visa inforutan endast när man hovrar över länken till tråden' onclick='javascript: document.settingsform.showtooltipontd.checked=false; return false;'>Länkar ";
		hc += "<input type=radio name=showtooltipontd title='Visa inforutan när man hovrar över hela tabellcellen' onclick='javascript: document.settingsform.showtooltiponlinks.checked=false; return false;'>Tabellceller<br>";
		hc += "<input type=checkbox name=quotemultiple title='Gör det möjligt att citera flera inlägg samtidigt'>";
		hc += "<label for=quotemultiple title='Gör det möjligt att citera flera inlägg samtidigt'>Citera flera</label><br>";
		hc += "<input type=checkbox name=usecolumns title='G&#65533;r det m&#65533;jligt att visa inl&#65533;gg som kolumner'>";
		hc += "<label for=usecolumns title='G&#65533;r det m&#65533;jligt att visa inl&#65533;gg som kolumner'>Visa kolumn-knappar. Antal kolumner: </label><input type=text name=numcolumns size=1><br>";		
		hc += " Favoritforum (namn på en rad, forum-ID på nästa osv):<br>"
		hc += " <textarea name=favoriteforums rows=8 cols=50></textarea><br>";
		hc += " Övriga länkar (namn på en rad, URL på nästa osv):<br>"
		hc += " <textarea name=otherlinks rows=5 cols=50></textarea><br>";
		hc += "</form>";
		
		hc += "<div style='bottom: 5px; left: 5px; position: absolute; font-size: 10px;'>";
		hc += "<a href='http://www.flashback.org/t385213'>Flashscript</a></div>";
		
		hc += "<div style='bottom: 5px; position: absolute; right: 5px;'>";
		hc += "<input type=button onclick='javascript: saveSettings(); return false;' value='Spara'>";
		hc += " <input type=button onclick='javascript: hideFlashscriptSettings(); return false;' value='Avbryt'>";
		hc += "</div>";
		
		settingsDialog.innerHTML = hc; 
		document.getElementsByTagName('body')[0].appendChild(settingsDiv);
		
		// Insert settings from variables to settings dialog
		var form = document.forms.namedItem('settingsform');
		var fe = form.elements.wrappedJSObject;
		fe.namedItem('fixlinks').checked =			fixLinks;
		fe.namedItem('biggertextbox').checked =	biggerTextbox;
		fe.namedItem('textboxheight').value =		textboxHeight;
		fe.namedItem('textboxwidth').value =		textboxWidth;
		fe.namedItem('replaceredstar').checked =	replaceRedStar;
		fe.namedItem('fixsignatures').checked =	fixSignatures;
		fe.namedItem('signaturestyle').value =		signatureStyle;
		fe.namedItem('processimagelinks').checked=	processImageLinks;
		fe.namedItem('showimagebuttons').checked =	showButtons;
		fe.namedItem('showimages').checked =		showImages;
		fe.namedItem('maximagewidth').value =		maxImageWidth;
		fe.namedItem('maximageheight').value =		maxImageHeight;
		fe.namedItem('showvideos').checked =		showVideos;
		fe.namedItem('showsubmitbuttons').checked =	showSubmitButtons;
		fe.namedItem('useadvancededit').checked =	useAdvancedEdit;
		fe.namedItem('leftcolumnwidth').value =		leftColumnWidth;
		fe.namedItem('expandcodewindows').checked =	expandCodeWindows;
		fe.namedItem('showtooltip').checked =		showTooltips;
		fe.namedItem('showtooltiponlinks').checked=	showOnLinks;
		fe.namedItem('showtooltipontd').checked = !showOnLinks;
		fe.namedItem('quotemultiple').checked =	quoteMultiple;
		fe.namedItem('usecolumns').checked =		useColumns;
		fe.namedItem('numcolumns').value =			numberOfColumns;
		fe.namedItem('favoriteforums').value =		favoriteForums.join("\n");
		fe.namedItem('otherlinks').value =			otherLinks.join("\n");
		
		unsafeWindow.showFlasshcriptSettings = showFlasshcriptSettings;
		unsafeWindow.hideFlashscriptSettings = hideFlashscriptSettings;
		unsafeWindow.saveSettings = saveSettings;
		
	}
	catch (e)
	{
		GM_log("Fel i CreateSettingsDialog\n" + e);
	}
}

function showFlasshcriptSettings() 
{
    try
    {
		var settingsdiv = document.getElementById('settingsDiv');    
		settingsdiv.style.display='block'; 
    }
    catch (e)
	{
		GM_log("Fel i showFlashscriptSettings\n" + e);
	} 
}

function hideFlashscriptSettings() 
{
    try
    {
		document.getElementById('settingsDiv').style.display='none';
    }
    catch (e)
	{
		GM_log("Fel i hideFlashscriptSettings\n" + e);
	}
}

function saveSettings() 
{
	try
	{
		var storage;
		if (navigator.userAgent.indexOf("Firefox/2") != -1)
			storage = unsafeWindow.globalStorage.namedItem('flashback.org').wrappedJSObject;	// Firefox 2
		else
			storage = unsafeWindow.globalStorage[document.location.host];		// Firefox 3
			
		var form = document.forms.namedItem('settingsform');
		var fe = form.elements.wrappedJSObject;
		
		storage.fsFixlinks=				fe.namedItem('fixlinks').checked;
		storage.fsBiggertextbox=		fe.namedItem('biggertextbox').checked;
		storage.fsTextboxwidth=			fe.namedItem('textboxwidth').value;
		storage.fsTextboxheight=		fe.namedItem('textboxheight').value;
		storage.fsReplaceredstar=		fe.namedItem('replaceredstar').checked;
		storage.fsFixsignatures=		fe.namedItem('fixsignatures').checked;
		storage.fsSignaturestyle=		fe.namedItem('signaturestyle').value;
		storage.fsProcessimagelinks=	fe.namedItem('processimagelinks').checked;
		storage.fsShowimagebuttons=	fe.namedItem('showimagebuttons').checked;
		storage.fsShowimages=			fe.namedItem('showimages').checked;
		storage.fsMaximagewidth=		fe.namedItem('maximagewidth').value;
		storage.fsMaximageheight=		fe.namedItem('maximageheight').value;
		storage.fsShowvideos=			fe.namedItem('showvideos').checked;
		storage.fsShowsubmitbuttons=	fe.namedItem('showsubmitbuttons').checked;
		storage.fsUseadvancededit=		fe.namedItem('useadvancededit').checked;
		storage.fsLeftcolumnwidth=		fe.namedItem('leftcolumnwidth').value;
		storage.fsExpandcodewindows=	fe.namedItem('expandcodewindows').checked;
		storage.fsShowtooltip=			fe.namedItem('showtooltip').checked;
		storage.fsShowtooltiponlinks=	fe.namedItem('showtooltiponlinks').checked;
		storage.fsQuotemultiple=		fe.namedItem('quotemultiple').checked;
		storage.fsUseColumns=			fe.namedItem('usecolumns').checked;
		storage.fsNumberOfColumns=		fe.namedItem('numcolumns').value;
		storage.fsFavoriteforums=		fe.namedItem('favoriteforums').value;
		storage.fsOtherlinks=			fe.namedItem('otherlinks').value;
		
		storage.fsSettingssaved=		true;
		
		hideFlashscriptSettings();
	}
	catch (e)
	{
		GM_log("Fel i saveSettings\n" + e);
	}
}
	
function ReadSettings()
{
	try
	{
		var savedSettings;
		if (navigator.userAgent.indexOf("Firefox/2") != -1)
			savedSettings = unsafeWindow.globalStorage.namedItem('flashback.org').wrappedJSObject;	// Firefox 2
		else
			savedSettings = unsafeWindow.globalStorage[document.location.host];		// Firefox 3
		
		if (savedSettings.fsSettingssaved)
		{
			fixLinks =			savedSettings.fsFixlinks.value=="true";
			biggerTextbox =	savedSettings.fsBiggertextbox.value=="true";
			textboxHeight =	savedSettings.fsTextboxheight.value;
			textboxWidth =		savedSettings.fsTextboxwidth.value;
			replaceRedStar =	savedSettings.fsReplaceredstar.value=="true";
			fixSignatures =	savedSettings.fsFixsignatures.value=="true";
			signatureStyle =	savedSettings.fsSignaturestyle.value;
			processImageLinks =	savedSettings.fsProcessimagelinks.value=="true";
			showButtons =		savedSettings.fsShowimagebuttons.value=="true";
			showImages =		savedSettings.fsShowimages.value=="true";
			maxImageWidth =	savedSettings.fsMaximagewidth.value;
			maxImageHeight =	savedSettings.fsMaximageheight.value;
			showVideos =		savedSettings.fsShowvideos.value=="true";
			showSubmitButtons =	savedSettings.fsShowsubmitbuttons.value=="true";
			useAdvancedEdit =	savedSettings.fsUseadvancededit.value=="true";
			leftColumnWidth =	savedSettings.fsLeftcolumnwidth.value;
			expandCodeWindows =	savedSettings.fsExpandcodewindows.value=="true";
			showTooltips =		savedSettings.fsShowtooltip.value=="true";
			showOnLinks =		savedSettings.fsShowtooltiponlinks.value=="true";
			quoteMultiple =		savedSettings.fsQuotemultiple.value=="true";
			favoriteForums =	savedSettings.fsFavoriteforums.value.split("\n");
			otherLinks =		savedSettings.fsOtherlinks.value.split("\n");
			useColumns =		savedSettings.fsUseColumns.value=="true";
			numberOfColumns=	savedSettings.fsNumberOfColumns.value;
		}
	}
	catch (e)
	{
		GM_log("Fel i ReadSettings\n" + e);
	}
}

function ActivateColumns(currentAnchor)
{						
	try
	{
		if (!(currentAnchor.id.match("postcount")))  // Wrong anchor
		{
			return;
		}
		var postcount = currentAnchor.id.match(/[\d]+/);	
		var postTd = currentAnchor.parentNode;
		
		var columnButton = document.createElement('img');
		columnButton.src = "data:image/png;base64," + columnsImageData;
		columnButton.setAttribute('active', false);
		columnButton.setAttribute('postcount', postcount);
		columnButton.setAttribute('style', "float: left;");
		columnButton.setAttribute('onclick', "javascript: ColumnButtonOnClick(this); return false;");	
		postTd.insertBefore(columnButton, postTd.firstChild);
			
		unsafeWindow.ColumnButtonOnClick = ColumnButtonOnClick;
	}
	catch (e)
	{
		GM_log("Fel i ActivateColumns\n" + e);
	}
}

function ColumnButtonOnClick(btn)
{
	
	var msg = document.getElementById('post_message_' + btn.getAttribute('postcount'));
	var messageHeight = parseInt(document.defaultView.getComputedStyle(msg, null).getPropertyValue("height"));
	var cssHeight = "";
	
	if (messageHeight < 140)
		cssHeight = "height: 13em;";
	
	if (btn.getAttribute('active') == "false")
	{
		msg.setAttribute('style', "-moz-column-count: " + numberOfColumns + "; -moz-column-gap: 1em; " + cssHeight);
		btn.setAttribute('active', true);
		btn.src = "data:image/png;base64," + noColumnsImageData;
	}
	else
	{
		msg.setAttribute('style', "");
		btn.setAttribute('active', false);
		btn.src = "data:image/png;base64," + columnsImageData;
	}
	return false;
}