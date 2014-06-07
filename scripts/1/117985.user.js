// ==UserScript==
// @name           google extra
// @description    Displays results for google image search, video search, wikipedia search and dictionary.com search alongside normal google searches.
// @namespace      znerp - modified by fd

// @include        http://www.google.com/search?*q=*
// @include        https://www.google.com/search?*q=*
// @include        https://encrypted.google.com/search?*q=*

// @exclude        http://www.google.com/search?*q=*&tbm=isch*
// @exclude        https://www.google.com/search?*&tbm=isch*
// @exclude        https://encrypted.google.com/search?*q=*&tbm=isch*

// ==/UserScript==

/*
FD's modifications:
- fixed "may refer to" wiki pg
- made large images draggable. In other words, compatible with drop and save addons
- Stretched google extra box
- Condensed area around search box
- Removed navigation bar 
- Fixed "Did you mean" results
- Fixed links in wiki box
- Removed icons from google's home pg 
- fixed box
- added comments
- changes to make sure cursor appears when hovering over the image -- you may have to remove google's imagebox layer on some pages. Use adblock elements for this
- moved content to the left side

TTD:
- Script doesn't work with google instant results.

Current bugs:
- none
Feel free to post/email/pm me, if you find one.

Fixed bugs:
- google extra appears on google image searches. This might be a bug in greasemonkey, rather than the script.
::::fixed using workaround:::workaround removed.Seems gm fixed the bug.
*/

//Global variables
var show    = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgpAB8IHEiwoEAAAAwSRKhwIMOGDx4uREix4sGKGA1KVLhRY0KIHSEODAgAOw%3D%3D";
var hide    = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgeAB8IHEiwoMGDCBMqNAigocOHAh9KBLCwosWLCwMCADs%3D";
var moveup  = "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAA"+
              "8ALAAAAAAMAAwABwgjAB8IHEiwoMGDAgEgTAhA4cGGEBc6lLgwYcUHExFmvMhRYEAAOw%3D%3D";
var movedown= "data:image/gif;base64,R0lGODlhDAAMAPcAAAAAAIAAAACAAICAAAAAgIAAgACAgICAgMDAwP8AAAD%2FAP%2F%2FAAAA%2F%"+
              "2F8A%2FwD%2F%2F%2F%2F%2F%2FwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"+
              "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwAAZgAAmQAAzAAA%2FwAzAAAzMwAzZgAzmQAzzAAz%2FwBmAABmMwBmZgBmmQBmzABm%2"+
              "FwCZAACZMwCZZgCZmQCZzACZ%2FwDMAADMMwDMZgDMmQDMzADM%2FwD%2FAAD%2FMwD%2FZgD%2FmQD%2FzAD%2F%2FzMAADMAMz"+
              "MAZjMAmTMAzDMA%2FzMzADMzMzMzZjMzmTMzzDMz%2FzNmADNmMzNmZjNmmTNmzDNm%2FzOZADOZMzOZZjOZmTOZzDOZ%2FzPMAD"+
              "PMMzPMZjPMmTPMzDPM%2FzP%2FADP%2FMzP%2FZjP%2FmTP%2FzDP%2F%2F2YAAGYAM2YAZmYAmWYAzGYA%2F2YzAGYzM2YzZmYz"+
              "mWYzzGYz%2F2ZmAGZmM2ZmZmZmmWZmzGZm%2F2aZAGaZM2aZZmaZmWaZzGaZ%2F2bMAGbMM2bMZmbMmWbMzGbM%2F2b%2FAGb%2F"+
              "M2b%2FZmb%2FmWb%2FzGb%2F%2F5kAAJkAM5kAZpkAmZkAzJkA%2F5kzAJkzM5kzZpkzmZkzzJkz%2F5lmAJlmM5lmZplmmZlmzJ"+
              "lm%2F5mZAJmZM5mZZpmZmZmZzJmZ%2F5nMAJnMM5nMZpnMmZnMzJnM%2F5n%2FAJn%2FM5n%2FZpn%2FmZn%2FzJn%2F%2F8wAAM"+
              "wAM8wAZswAmcwAzMwA%2F8wzAMwzM8wzZswzmcwzzMwz%2F8xmAMxmM8xmZsxmmcxmzMxm%2F8yZAMyZM8yZZsyZmcyZzMyZ%2F8"+
              "zMAMzMM8zMZszMmczMzMzM%2F8z%2FAMz%2FM8z%2FZsz%2Fmcz%2FzMz%2F%2F%2F8AAP8AM%2F8AZv8Amf8AzP8A%2F%2F8zAP"+
              "8zM%2F8zZv8zmf8zzP8z%2F%2F9mAP9mM%2F9mZv9mmf9mzP9m%2F%2F%2BZAP%2BZM%2F%2BZZv%2BZmf%2BZzP%2BZ%2F%2F%2"+
              "FMAP%2FMM%2F%2FMZv%2FMmf%2FMzP%2FM%2F%2F%2F%2FAP%2F%2FM%2F%2F%2FZv%2F%2Fmf%2F%2FzP%2F%2F%2FyH5BAEAAP"+
              "8ALAAAAAAMAAwABwgjAP8JHEiwoMGDAlEgHKhw4b%2BGCyEilFgQhUWLEzFGdMgRYUAAOw%3D%3D";

var CurrentimgPgNo = 0;
var forwardClicked = 1;

//////////Main function
var main = function() 
{
	//These variables can be modified
	var totalWidth = 1394;		//from 1195 when left navigation bar was present
	var googleExtraBoxWidth = 800;

	//Add div for pop-up images
	var x = 0, y = 0;
	
	popupDiv = document.createElement("div");
  	popupDiv.setAttribute("id", "imagePopup");
  	popupDiv.setAttribute("style", "display:none; z-index:99;position:absolute;");
  	popupDiv.addEventListener('mouseover',function(event) 
												   {
													   this.style.display = "inline";
													}
													,true);
  	popupDiv.addEventListener('mouseout', function(event) {window.clearTimeout(globalTimer); this.style.display = "none";}, true);
  	popupDiv.addEventListener('mousemove',
    	function(e) 		//this fx moves the big image when the cursor is on it
		{
//      		if (sqr(x - e.pageX) + sqr(y - e.pageY) > 400) 
//			{
//				window.clearTimeout(globalTimer);
//				this.style.display = "none";
//			}
    	}
		, true);
  	document.body.appendChild(popupDiv);
  
	//Save the document location. This is used in XHR's. --original author
	href = document.location.href;
	
	results = document.getElementById("center_col");	//fd -- determines where (in which id) to put the new box 
	results.setAttribute("style", " margin-left: 10px; width:" + totalWidth +"px;"); //fd -- determines the width of the box containing the google extra box
	totalWidth = null; //destroy variable
	
	divIdIres = document.getElementById("ires");
	divIdIres.setAttribute("style", "width:575px;");	//decreases the width of ires so that it won't be pushed down by the google extra box
	

	//minor fixing so that "Did you mean" results don't appear wacked out.
	var divId_temp = document.getElementById('botstuff');
	if (divId_temp) {
		divId_temp.setAttribute("style", "float:left;");
	}
	
	var divId_temp = document.getElementById('topstuff');			//i think this is contained within botstuff
	if (divId_temp) {
		divId_temp.setAttribute("style", "width:575px; float:left;");
	}

	var divId_temp = document.getElementById('leftnav');
	divId_temp.setAttribute("style", "background: white; border:1px solid; position:absolute; z-index:99; display:none;");		//add a border later on.
	//divIdLeftnav.parentNode.removeChild(divIdLeftnav);		//remove left navigation

	var divId_temp = document.getElementById('cnt');
	divId_temp.setAttribute("style", "padding-top: 3px; ");		//determines the distance of the logo from top

	divId_temp = null;

	document.getElementsByClassName("sfbgg")[0].style.height = "46px";		//determines the height of the gray area around search box
	document.getElementsByClassName("mw")[0].style.height = "20px";		//determines the distance of the content from top
	
	//document.getElementsByClassName("class_name")[0].style.backgroundColor = "red";		//great for troubleshooting


	//Create new div to put results in.
	newDiv = document.createElement("div")
	newDiv.setAttribute("class", "leftColumn");
  
  	//Create new style element and add it to the head.
  	style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
  	style.type = 'text/css';
  	style.innerHTML = "#leftColumn {float: left; max-width:"+(window.innerWidth - 385)+"px;}" +
                      "#google_extra .znerp {background:#D5DDF3 none repeat scroll 0 0; border-top:1px solid #3366CC; font-size: small; font-weight: bold; padding:4px 0.5em 4px 4px; z-index:99; position:relative;}"
			//fd -- added z-index to bring google_extra infront and make 'Image' links work again.
			//fd -- added position:relative; as z-index doesn't work without position.
  
  	//Create the google extra div.
  	rightDiv = document.createElement("div");
  	rightDiv.setAttribute("id", "google_extra");
  	rightDiv.setAttribute("style", "max-width:" + googleExtraBoxWidth + "px; float: right; background: #ffffff; padding-left: 10px;");	//fd - properties of new box. Changed max-width from 350. 
  	results.insertBefore(rightDiv, results.firstChild);
	googleExtraBoxWidth = null; //destroy variable

////GOOGLE INSTANT fix---fd -- doesn't work
//window.addEventListener("hashchange", repair, false);
//document.body.addEventListener("DOMSubtreeModified", repair, false);

//window.onload=window.addEventListener("hashchange", alert("fd"), false);
//document.body.addEventListener("DOMSubtreeModified", alert("fd"), false);
/*
window.addEventListener("hashchange", funcRef, false);
*/
/*
if ("onhashchange" in window) 
{
    alert("The browser supports the hashchange event!");
}
	
//function locationHashChanged() 
//{
//	alert("fd");
//}
window.onhashchange = alert("fd");
*/

//window.onhashchange = alert("fd");
//document.body.addEventListener("DOMSubtreeModified", checkOlist, false);

/* 
function checkOlist(e){ // Check for new google instant results
// Ignore events on some elements
  if (ignoreNodeNames.indexOf("|"+e.target.nodeName+"|") > -1) return;
  if (e.target.hasAttribute("id")){if (ignoreIds.indexOf("|"+e.target.id+"|") > -1) return;}
  if (e.target.hasAttribute("class")){
    if (ignoreClass.indexOf("|"+e.target.className+"|") > -1) return;
    if (e.target.className.indexOf("goog-date") > -1) return;
  }
  var liels = e.target.getElementsByTagName("li"); 
  if (!liels) return;
  if (liels.length == 0) return;
}
*/
//GOOGLE INSTANT fix---ends
   
  	//Add google extra stuff.
  	for (i = 0; i < 5; i++) 		//fd -- figure out why there is a loop here.
	{
		switch (eval(GM_getValue("order", "[0,1,2,3,4]"))[i]) 
		{
  	    	case 0: addWiki(); break;
			case 1: addImages(); break;
//   	    case 1: addVideos(); break;			//fd - commented since video doesn't work anyway
//     		case 2: 
//      	case 3: addDict(); break;
    	}
  	}
}	
//////main function ends here 


/////function to find and make a tag for next 20 images usable
function next20Images()
{	
	window.addEventListener('mouseover',
									function()
									{
										document.getElementById('aTagNext20Images').addEventListener('click',clickedNext20Images,false);		//try mousedown and mouseup later on.
										document.getElementById('aTagPrev20Images').addEventListener('click',clickedPrev20Images,false);
										document.getElementById('aTagImages').addEventListener('click',clickedImages,false);
										
										document.getElementById('logo').addEventListener('mouseover',hoverShowDiv,false);
										document.getElementById('logo').addEventListener('mouseout',hoverHideDiv,false);
										document.getElementById('leftnav').addEventListener('mouseover',hoverShowDiv,false);
										document.getElementById('leftnav').addEventListener('mouseout',hoverHideDiv,false);
									},
									false
							);
}

function clickedNext20Images()
{
	forwardClicked = 1;
	addImages();
}

function clickedPrev20Images()
{
	forwardClicked = 0;
	addImages();
}

function clickedImages()
{
	CurrentimgPgNo = 0;
	forwardClicked = 1;
	addImages();
}

function hoverShowDiv()		//function to  show div
{
	var targetDiv = document.getElementById('leftnav')
	targetDiv.style.display="block";
}

function hoverHideDiv()		//function to hide div
{
	var targetDiv = document.getElementById('leftnav')
	targetDiv.style.display="none";
}

function assignImgURL()
{
	if (forwardClicked == 1)
	{
		if (CurrentimgPgNo == 0)												//very first result
			var imageurl = document.location.href + "&tbm=isch";		//take current url and add tbm to get to the image search page.
		else
		{	
			var tmp = CurrentimgPgNo*20;
			var imageurl = document.location.href + "&tbm=isch&start=" + tmp;
		}
		CurrentimgPgNo++;
	}
	else
	{
		if (CurrentimgPgNo == 1)
		{
			var imageurl = document.location.href + "&tbm=isch";		//take current url and add tbm to get to the image search page.
			alert("Can't go back");
			return imageurl;			
		}
		else if (CurrentimgPgNo == 2)
		{
			var imageurl = document.location.href + "&tbm=isch";		//take current url and add tbm to get to the image search page.
		}
		else
		{	
			var tmp = (CurrentimgPgNo - 2)*20;
			var imageurl = document.location.href + "&tbm=isch&start=" + tmp;
		}
		CurrentimgPgNo--;
	}

	return imageurl;
}

////////////////////////// FUNCTION - ADD images from google image search
function addImages() 
{

	var imageurl = assignImgURL();

	if (document.getElementById("image"))
    	imageDiv = document.getElementById("image");
  	else 
	{
    	imageDiv = document.createElement("div");
		imageDiv.setAttribute("class", "image");
		imageDiv.setAttribute("id", "image");
	}
    
  	GM_xmlhttpRequest(
	{
    	method: 'get',
		headers: 
		{
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Content-type': 'application/x-www-form-urlencoded'
		},
      	url: imageurl,
      	onload: function(result) 
				{
        			res = result.responseText;
		
					if (res.indexOf("Suggestions:") == -1) 
					{
						imageDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="znerp" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><td><span id="sd"><a id="aTagImages" href="' 
//							+ imageurl 
//							+ '&start=20'
							+ 'javascript:void(0)'
							+ '">Go to page 1</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<a id="aTagPrev20Images" href="javascript:void(0)">Previous 20 images</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp<a id="aTagNext20Images" href="javascript:void(0)">Next 20 images</a>'
							+ '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Page no:&nbsp;'
							+ CurrentimgPgNo
							+ '</span></td></table>'; 		  //&start=20 -- added to show next 20 images
							  // backslash to prevent single quotes being interpreted as end
		    
          				addTopImages("image");
          				if (eval(GM_getValue("show", "[true,true,true,true,true]"))[0]) 
						{
			 				whatever = res.indexOf('<table width="100%" style="margin-top:10px">');
														
							ShownImages = 20;								//No. of images to show..fd
										for (i = 0; i < ShownImages; i++) 		
										{		  
											image = res.slice(res.indexOf('<a href', whatever), (whatever = res.indexOf('</a>',res.indexOf('<a href', whatever))+4));
											
											 image = image.replace(/width=\d+ height=\d+/, "style='max-width: 50px; z-index:99; position:relative;'"); 	
																							//fd -- added z-index and pos to make sure cursor appears on the image
											 imageDiv.innerHTML += image + "&nbsp;";	
										}
						}
						addEventListeners("image");
						imageImages = imageDiv.getElementsByTagName("img");		
			
						for (i = 3; i < imageImages.length; i++) 
						{
							thisImage = imageImages[i];
							thisImage.addEventListener( 'mousemove',
								function(event) {
								x = event.pageX;
								y = event.pageY;
								var h = this.parentNode.href.match(/&h=(\d+)&/)[1];		//image height
								var w = this.parentNode.href.match(/&w=(\d+)&/)[1];		//image width
								source = (w > 50) ? this.parentNode.href.slice(this.parentNode.href.indexOf("imgurl=") + 7, 
																		   this.parentNode.href.indexOf("&", this.parentNode.href.indexOf("imgurl="					))).replace(/%25/g, "%")
											  : this.src;
								globalTimer = window.setTimeout(
								function() { popUp(h,w,x,y, source);}, 10);}, true);
						
								thisImage.addEventListener('mouseout',
			
									function(event) 
									{
										window.clearTimeout(globalTimer);
										document.getElementById('imagePopup').style.display = "none";
									} ,true);
					  	}
        			}
      			}
			});

	rightDiv.appendChild(imageDiv);
	next20Images();
	Prev20Images();
}//add images fx ends


//fd --- commented since video doesn't work anyway
/*
function addVideos() 
{
	videourl = "http://www.google.com/search?q=" + href.match(/[&?]q=([^&]*)(?:&|$)/)[1] + "&tbm=vid"; //fd - works till here
//alert (videourl);	

if (document.getElementById("video"))
    videoDiv = document.getElementById("video");
  else {
    videoDiv = document.createElement("div");
    videoDiv.setAttribute("class", "video");
    videoDiv.setAttribute("id", "video");
	
		}return "apple";
}
*/
/*
  //videourl = href.replace('search', 'videosearch').replace('www', 'video').replace(/google\.[^\/]*\//, "google.com/");
  
/*  if (document.getElementById("video"))
    videoDiv = document.getElementById("video");
  else {
    videoDiv = document.createElement("div");
    videoDiv.setAttribute("class", "video");
    videoDiv.setAttribute("id", "video");
    GM_addStyle('.video a {font-size:0.9em;}');
    rightDiv.appendChild(videoDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: videourl + "&num=4",
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf("Suggestions:") == -1) {
          videoDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="znerp" style="margin-top: 4px;margin-bottom: 2px;" style="margin: 3px;"><td><span id="sd"><a href="'+videourl+'">Videos</a></span></td></table>'
          addTopImages("video");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[1]) {
            videoString = "<table><tbody><tr>"
            whatever = 0;
            for (i = 0; i < 4; i++) {
              whatever = res.indexOf('<div class=rl-item>', whatever + 1)
              if (whatever == -1) break;
              video = "<a href=\"znerp\">" +
                      res.slice(res.indexOf('<img', whatever),
                                res.indexOf('>', res.indexOf('<img', whatever))).replace(/\/0.jpg/, "/1.jpg") +
                      " width=120px></a>";
              video += "<br>" + res.slice(res.indexOf('>', res.indexOf('<div class=rl-title', whatever))+1,
                                          res.indexOf('</div>', res.indexOf('<div class=rl-title', whatever))) + "<br>";
              videoLocation = res.slice(res.indexOf('href=', res.indexOf('<div class=rl-watch-on>', whatever)) + 5,
                                        res.indexOf(' target=', res.indexOf('<div class=rl-watch-on>', whatever)))
              video = video.replace(/href="znerp"/, "href=\"" + videoLocation + "\"").replace(/href="\//, "href=\"http://video.google.com/");
              videoString += "<td>" + video + "</td>";
              if (i%2 == 1) videoString += "</tr><tr>";
            }
            videoDiv.innerHTML += videoString + "</tr></tbody></table>";
          }
          addEventListeners("video");
          videoImages = videoDiv.getElementsByTagName("img");
          for (i = 3; i < videoImages.length; i++) {
            thisImage = videoImages[i];
            if (thisImage.src.match(/\/[1-3]\.jpg/)) {
              thisImage.style.border = "2px solid #00ff00"
              thisImage.addEventListener(
                'mouseover',
                function(event) {
                  animate(this)
                },
                true);
              thisImage.addEventListener(
                'mouseout',
                function(event) {
                  window.clearTimeout(newGlobalTimer);
                },
                true);
            } 
          }
        }
      }
    });*/
//}



function addWiki() 
{
  	wikiurl = "http://en.wikipedia.org/wiki/" + href.match(/[&?]q=([^&]*)(?:&|$)/)[1].replace(/%20|\+/g, "_").replace(/%22/g, "").replace(/_[a-z]/g, toUpCase);

	if (document.getElementById("wiki"))					//if div id wiki is present, use it
    	wikiDiv = document.getElementById("wiki");
  	else 													//else create a new div id wiki 
	{
		wikiDiv = document.createElement("div");
		wikiDiv.setAttribute("class", "wiki");
		wikiDiv.setAttribute("id", "wiki");
		GM_addStyle('.wiki {font-size:1.00em;color:#333333;font-family:"Lucida Sans Unicode","Arial Unicode MS","Lucida Sans","Lucida Grande",Verdana,Helvetica,Arial,sans-serif;}'+
                '.wiki h2 {font-size: 100%;}'+
                '.wikiContent {overflow:auto;max-height:300px;}');	//increased font size from 0.75 to 1.00 ..fd
    	rightDiv.appendChild(wikiDiv);
  	}
  	
	GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: wikiurl,
      onload: function(result) 
	  {
      	res = result.responseText;
		
		if (res.indexOf('<p>', res.indexOf('<div id="contentSub">')) != -1) 
			if (res.indexOf('Wikipedia does not have an article with this exact name') == -1) 
			{
          		wikiDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="znerp" style="margin-top: 4px;margin-bottom: 2px;font-family:arial,sans-serif;" style="margin: 3px;"><td><span id="sd"><a href="'+wikiurl+'">en.wikipedia.org</a></span></td></table>';	//fd - added;
          		
				addTopImages("wiki");
			
				if (eval(GM_getValue("show", "[true,true,true,true,true]"))[2]) 
				{
					if (/ may( also)? refer to:<\/p>/.test(res)) 
					{
					  	//endSearch = res.indexOf(' end content ');			//original code
					  	endSearch = res.indexOf("<!-- /bodycontent -->");
					  	oldFoo = 0;
					  	foo = 0;
					  	while (foo < endSearch) 
					  	{
							oldFoo = foo;
							foo = res.indexOf('</ul>', foo) + 4;
						}
						wiki = res.slice(res.indexOf('<p><b>'), oldFoo);
						firstCutPt = res.indexOf('<p><b>', oldFoo);
					} 
					else if (res.indexOf('<p>"<b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p>"<b>'), res.indexOf('</p>', res.indexOf('<p>"<b>'))+4);
					  firstCutPt = res.indexOf('<p>"<b>');
					} 
					else if (res.indexOf('<p>A <b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p>A <b>'), res.indexOf('</p>', res.indexOf('<p>A <b>'))+4);
					  firstCutPt = res.indexOf('<p>A <b>');
					} 
					else if (res.indexOf('<p>An <b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p>An <b>'), res.indexOf('</p>', res.indexOf('<p>An <b>'))+4);
					  firstCutPt = res.indexOf('<p>An <b>');
					} 
					else if (res.indexOf('<p>The <b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p>The <b>'), res.indexOf('</p>', res.indexOf('<p>The <b>'))+4);
					  firstCutPt = res.indexOf('<p>The <b>');
					} 
					else if (res.indexOf('<p><i><b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p><i><b>'), res.indexOf('</p>', res.indexOf('<p><i><b>'))+4);
					  firstCutPt = res.indexOf('<p><i><b>');
					} 
					else if (res.indexOf('<p><b>') != -1) 
					{
					  wiki = res.slice(res.indexOf('<p><b>'), res.indexOf('</p>', res.indexOf('<p><b>'))+4);
					  firstCutPt = res.indexOf('<p><b>');
					} 
					else 
					{
					  wiki = res.slice(res.indexOf('<p>'), res.indexOf('</p>')+4);
					  res.indexOf('<p>');
					}


					if (res.indexOf('class="image"') != -1) {
					  wikiImage = '<img ' + 
								  res.slice(res.indexOf('src=', res.indexOf('class="image"')),
											res.indexOf('"', res.indexOf('src=', res.indexOf('class="image"'))+5)+1) +
								  '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
					  //wikiDiv.innerHTML += wikiImage;
					} else if (res.indexOf('class="thumbimage"') != -1) {
					  wikiImage = '<img ' + 
								  res.slice(res.indexOf('src=', res.indexOf('class="thumbimage"')),
											res.indexOf('"', res.indexOf('src=', res.indexOf('class="thumbimage"'))+5)+1) +
								  '" style="max-width:100px; float:right; margin-top: 13px; padding: 2px;">';
					  //wikiDiv.innerHTML += wikiImage;
					}

//fd - moved code starts
//			startPt1 = res.indexOf('</p>')+ 4;
//			endPt1 = res.indexOf('</p>',startPt1);
						
					startPt1 = firstCutPt;
					endPt1 = res.indexOf('</p>',startPt1);
					
					
					startPt2 = res.indexOf('<p>',endPt1);
					endPt2 = res.indexOf('</p>',startPt2);
		
					startPt3 = res.indexOf('<p>',endPt2);
					endPt3 = res.indexOf('</p>',startPt3);
		
					startPt4 = res.indexOf('<p>',endPt3);
					endPt4 = res.indexOf('</p>',startPt4);
//fd - moved code ends

					var rawWikiContent = res.slice(startPt2, endPt2)
										 + res.slice(startPt3, endPt3)
										 + res.slice(startPt4, endPt4);		//save the sliced htmls to a string
					
					var wikiContent = rawWikiContent.replace(/href=\"\//g, "href=\"http://en.wikipedia.org/");	
														//find href=" and replace it with wiki string so as to avoid google.com in wiki links.
												
//**********************/	



					wikiDiv.innerHTML += "<div class='wikiContent'>" 
										 + ((res.indexOf('class="image"') != -1) ? wikiImage : "") 	   //fd - disable printing wiki image
										 + wiki.replace(/href=\"\//g, "href=\"http://en.wikipedia.org/")
										 + wikiContent
										 + "</div>";
								
			//fd's code - to print 3 more paragraphs from wikipedia - a for loop would be nice
			//			- code moved up because it was giving trouble with wiki image
/*			startPt1 = res.indexOf('</p>')+ 3;
			endPt1 = res.indexOf('</p>',startPt1);
			wikiDiv.wikiContent.innerHTML += res.slice(startPt1+5, endPt1);


			startPt2 = res.indexOf('<p>',endPt1);
			endPt2 = res.indexOf('</p>',startPt2);
			wikiDiv.innerHTML += res.slice(startPt2, endPt2);

			startPt3 = res.indexOf('<p>',endPt2);
//			wikiDiv.innerHTML += " s2:" + startPt2;
			endPt3 = res.indexOf('</p>',startPt3);
//			wikiDiv.innerHTML += " e2:" + endPt2;
			wikiDiv.innerHTML += res.slice(startPt3, endPt3) + "</div>"
		;
*/
          }
        addEventListeners("wiki");
        }
      }
    });
}


////Dictionary fx
/*function addDict() 
{
  dicturl = "http://dictionary.reference.com/search?q=" + href.match(/[&?]q=([^&]*)(?:&|$)/)[1];
  if (document.getElementById("dict"))
    dictDiv = document.getElementById("dict");
  else {  
    dictDiv = document.createElement("div");
    dictDiv.setAttribute("class", "dict");
    dictDiv.setAttribute("id", "dict");
    GM_addStyle('.dict .me {display:inline;font-weight:bold;}'+
                '.dict .pg {color:#558811;display:inline;font-style:italic;}'+
                '.dict .prondelim {color:#880000;font-family:"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;}'+
                '.dict .show_spellpr .pron {color:#880000;display:inline;font-family:Verdana,"Arial Unicode MS","Lucida Sans Unicode",Helvetica,Arial,sans-serif;font-size:0.9em;}'+
                '.dict .prongoto {color:#116699;cursor:pointer;font-size:0.9em;text-decoration:underline;}'+
                '.dict table.luna-Ent {background-color:#FFFFFF;color:#333333;display:block;padding-bottom:0pt;width:100%;}'+
                '.dict .ital-inline {display:inline;font-style:italic;}'+
                '.dict * {font-size:95%;line-height:1.25em;margin:0pt;}'+
                '.dict .sectionLabel {color:#558811;display:inline;font-style:italic;}'+
                '.dict .secondary-bf {display:inline;font-weight:bold;}'+
                '.dict .homno {display:inline;font-size:0.7em;vertical-align:top;}'+

//fd - added 2 styles
				'.dict .dnindex {font-size:0.9em;color:#333333;font-family:"Lucida Sans Unicode","Arial Unicode MS","Lucida Sans","Lucida Grande",Verdana,Helvetica,Arial,sans-serif;}'+
				'.dict .dndata {display:inline;font-size:0.9em;color:#333333;font-family:"Lucida Sans Unicode","Arial Unicode MS","Lucida Sans","Lucida Grande",Verdana,Helvetica,Arial,sans-serif;}'+		
				
				'.dictContent {overflow:auto;max-height:300px;}');
    rightDiv.appendChild(dictDiv);
  }
  GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: dicturl,
      onload: function(result) {
        res = result.responseText;
        if (res.indexOf('<div class="luna-Ent">') != -1) {
          dictDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="znerp" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><td><span id="sd" style="font-size:100%;"><a href="'+dicturl+'">Dictionary.com</a></span></td></table>'
          addTopImages("dict");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[3]) {
            dict = res.slice(res.indexOf('<div class="luna-Ent">')+22,
                             res.indexOf('</div></div></div>', res.indexOf('<div class="luna-Ent">')));
					//fd - Original: dict = res.slice(res.indexOf('<div class="luna-Ent">')+22, res.indexOf('</div>', res.indexOf('<div class="luna-Ent">')));
            dictDiv.innerHTML += "<div class='dictContent'>" +
                                 dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/") +
                                 "</div>";
          }
          addEventListeners("dict");
        } else if (res.indexOf('<table>') != -1) {
          dictDiv.innerHTML = '<table width="100%" cellspacing="0" cellpadding="0" border="0" class="znerp" style="margin-top: 4px;margin-bottom: 2px; margin: 3px;"><td><span id="sd" style="font-size:100%;"><a href="'+dicturl+'">Dictionary.com</a></span></td></table>'  
          addTopImages("dict");
          if (eval(GM_getValue("show", "[true,true,true,true,true]"))[3]) {
            dict = res.slice(res.indexOf('<td>', res.indexOf('<!-- google_ad_section_start(name=def) -->'))+4,
                             res.indexOf('</td>', res.indexOf('<!-- google_ad_section_start(name=def) -->')));
            dictDiv.innerHTML += "<div class='dictContent'>" +
                                 dict.replace(/href=\"\//g, "href=\"http://dictionary.reference.com/") +
                                 "</div>";
          }
		  addEventListeners("dict");
        }
      }
    });
}
*/

//for mouseover of image results.
function sqr(x) 
{
	return (x*x) 
}

function popUp(imageHeight,imageWidth,x,y,source) 
{

////////////////lab section
var popupImageWidth = 800;		//values here are a safety net and can be removed lateron
var popupImageHeight = 800;

//var windowWidth = document.body.clientWidth;
//var windowHeight = document.body.clientHeight;
//
//var windowScroll = document.documentElement.scrollTop;		//works
//
////find the smallest of 2 no.s: windowWidth, imageWidth 
//	if (windowWidth < imageWidth)
//		popupImageWidth = windowWidth;
//	else
//		popupImageWidth = imageWidth;
//
////find the smallest of 2 heights 
//	if (windowHeight < imageHeight)
//		popupImageHeight = windowHeight;
//	else
//		popupImageHeight = imageHeight;
		
	
		
//////////////////////////////ends

	
	
	
	

//	var popupImageWidth = 800, popupImageHeight = 800;	//determines the maximum height and width of the image which pops out.
	
 	obj = document.getElementById('imagePopup');
	obj.innerHTML = "<img src='" + source + "' style='max-width: " + popupImageWidth + "px; max-height: " + popupImageHeight + "px; background: #fff;'>";	//i know img tags aren't supposed to have background, but hey it works, so don't ever compain.--fd	
																		
	obj.style.left = (x - Math.min(imageWidth, (imageWidth*popupImageWidth)/imageHeight, popupImageHeight)) + 'px';		//the no.s determine how 

//var cursorPositionVertical = y;		//taking the whole pg as the reference point
//	alert(y);
////////

	

	
	
//	var tmp = y - windowScroll - imageHeight/2;
	
//	if (tmp<30)
//		tmp+=90;//alert("dz");
	//obj.style.top = y +'px';	//original code
	obj.style.top = y  +'px';		//y determines the location vertically; this line will attach the midpoint of image to cursor 
//	alert(y - h/2);
	obj.style.display = "inline";	//no idea
}

//fd - fx disabled
/*
//for mouseover of youtube video results
function animate(image) {
  newGlobalTimer = window.setTimeout(
    function() {
      function increment(str, p1, p2, offset, s) {
        return p1 + (parseInt(p2)%3 + 1) + ".jpg";
      }
      image.src = image.src.replace(/(.*)(\d)\.jpg/, increment);
      animate(image);
    },
  750);
}
*/

//for working out wikipedia links
function toUpCase() {
  return arguments[0].toUpperCase();
}

//Add plus/minus, up and down images to google extra headings.
function addTopImages(div) {
  imageTable = document.getElementById(div).getElementsByTagName("table")[0].getElementsByTagName("tr")[0];
  imageToggleColumn = document.createElement("td");
  imageToggleColumn.setAttribute("style", "width: 100px;");
  imageToggle = document.createElement("img");
  imageToggle.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageToggle.setAttribute("title", (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? "Don't s" : "S") + "how these search results");
  imageToggle.src = (eval(GM_getValue("show", "[true,true,true,true,true]"))[numberize(div)] ? hide : show);
  imageMoveUp = document.createElement("img");
  imageMoveUp.src = moveup;
  imageMoveUp.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageMoveUp.setAttribute("title", "Move up in list");
  imageMoveDown = document.createElement("img");
  imageMoveDown.src = movedown;
  imageMoveDown.setAttribute("style", "float: right;margin-right: 3px;cursor:pointer;");
  imageMoveDown.setAttribute("title", "Move down in list");

  imageToggleColumn.appendChild(imageMoveUp);
  imageToggleColumn.appendChild(imageMoveDown);
  imageToggleColumn.appendChild(imageToggle);
  imageTable.appendChild(imageToggleColumn);
}

//Add event listeners to the top images on headings
function addEventListeners (div) {
  // up arrow
  document.getElementById(div).getElementsByTagName("img")[0].addEventListener(
    'click',
    function() {
      if (document.getElementById(div).previousSibling) {
        for (i = 1; i < 5; i++)
          if (eval(GM_getValue("order", "[0,1,2,3,4]"))[i] == numberize(div)) {
            tempThing = eval(GM_getValue("order", "[0,1,2,3,4]"));
            tempThing[i] = tempThing[i-1];
            tempThing[i-1] = numberize(div);
            GM_setValue("order", uneval(tempThing));
            break;
          }
        document.getElementById(div).parentNode.insertBefore(document.getElementById(div), document.getElementById(div).previousSibling);
      }
    },
    false);
  // down arrow
  document.getElementById(div).getElementsByTagName("img")[1].addEventListener(
    'click',
    function() {

      if (document.getElementById(div).nextSibling) {
        for (i = 0; i < 4; i++)
          if (eval(GM_getValue("order", "[0,1,2,3,4]"))[i] == numberize(div)) {
            tempThing = eval(GM_getValue("order", "[0,1,2,3,4]"));
            tempThing[i] = tempThing[i+1];
            tempThing[i+1] = numberize(div);
            GM_setValue("order", uneval(tempThing));
            break;
          }
        document.getElementById(div).parentNode.insertBefore(document.getElementById(div), document.getElementById(div).nextSibling.nextSibling);
      }
    },
    false);
  // plus/minus
  document.getElementById(div).getElementsByTagName("img")[2].addEventListener(
    "click", 
    function() {
      znerp = eval(GM_getValue("show", "[true,true,true,true,true]"));
      znerp[numberize(div)] = !znerp[numberize(div)];
      GM_setValue("show", uneval(znerp));
      if (this.src == hide)
        while (document.getElementById(div).getElementsByTagName("table")[0].nextSibling)
          document.getElementById(div).getElementsByTagName("table")[0].parentNode.removeChild(document.getElementById(div).getElementsByTagName("table")[0].nextSibling);
      else 
        switch (div) {
          case ("image"): addImages(); break;
  //        case ("video"): addVideos(); break;
          case ("wiki"): addWiki(); break;
 //         case ("dict"): addDict(); break;
//          case ("foreignWiki"): addForeignWiki(); break;
        }
      this.src = ((this.src == show) ? hide : show);
    },
    false);
}

//enum type thing for results.
function numberize(div) 
{
	switch (div) 
	{
		case ("image"): return 0; break;
		//case ("video"): return 1; break;		//fd --- since video doesn't work anyway
		case ("wiki"): return 2; break;
//		case ("dict"): return 3; break;
		//case ("foreignWiki"): return 4; break;
  	}
}

//fd - fx disabled
//Function for showing/hiding foreign wiki things in future.
/*
function toggleForeignWiki() { 
  if (GM_getValue("foreign wiki", false)) {
    GM_setValue("foreign wiki", false)
  } else {
    GM_setValue("wiki address", 
                prompt("Please enter the version of wikipedia.org you want to use.\n\nThis should be two letters to replace 'xx' in the address 'xx.wikipedia.org'", 
                       GM_getValue("wiki address", "en")))
    GM_setValue("foreign wiki", true);
  }
  window.location.reload()
}
*/


//no idea what this function does aka i don't care
function movebg(ico, dir) {
  	if ((dir == 1 && ico.x == 6) || (dir == -1 && ico.x == 0)) 
  	{ 
  		clearTimeout(ico.moving); 
		return; 
	}
  ico.x += dir;
  ico.obj.style.backgroundPosition = -ico.x * 52 + ico.y;
}

//*******FIRST LINK PRELOADER - starts*******
/*
////////////////////Preloader 1 - if you want to preload a website with images
function preloader(linkToBePreloaded){
	ifrm = document.createElement("IFRAME");
   	ifrm.setAttribute("src", linkToBePreloaded);
  	ifrm.style.display = "none";	//hides the iframe

   	document.body.appendChild(ifrm); 
}

var linkToBePreloaded = document.getElementById("ires").getElementsByTagName("a")[0];

//checking to prevent preloading of pdf files
var linkEndsInPdf = new RegExp(/^[^?]+\.(pdf)$/i);		//added i so as to make it case insensitive	
for(var i =3; linkEndsInPdf.test(linkToBePreloaded) && i <20 ;i=i+3) 
			//Reason for i=i+3 ..... The links jump 3 spots everytime, ie. the first link is at a[0], second at a[3], third at a[6] and so on.
			//Need to find a way to get links directly rather than jumping 
{
//alert("CurrentimgPgNo");
linkToBePreloaded = document.getElementById("ires").getElementsByTagName("a")[i];
}
//checking --ends

window.onload = preloader(linkToBePreloaded);
*/

////////////////////Preloader 2 - if you want to preload a website without images
var linkToBePreloaded = document.getElementById("ires").getElementsByTagName("a")[0];
GM_xmlhttpRequest
({
      method: 'get',
	  headers: 
	  {
//        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        'Content-type': 'application/x-www-form-urlencoded'
      },
	  url: linkToBePreloaded
//	  onload: alert("preloader successfully loaded"),
//	  onerror: alert("preloader failed")
});

//alert(linkEndsInPdf.test(linkToBePreloaded));
//alert(linkToBePreloaded);
//*******FIRST LINK PRELOADER - ends*******

main();
