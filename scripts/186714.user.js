// ==UserScript==
// @name        	LF Tweaker
// @namespace   	http://userscripts.org/users/492428
// @version     	3
// @author      	Doodles
// @description 	Tweaks the Leisureforcegaming.net forums for BEST VIEWING.
// @icon			http://i.imgur.com/PteE8N6.jpg
// @include     	http://www.leisureforcegaming.net/forums/*
// @include     	http://leisureforcegaming.net/forums/*
// @updateURL       http://userscripts.org/scripts/source/186714.meta.js
// @downloadURL     http://userscripts.org/scripts/source/186714.user.js
// @updateVersion   3
// @grant       	none
// ==/UserScript==

//
// FUNCTION SETTINGS - to deactivate a function replace "true" with "false"
//

// Condense Document Title
var funcTitle = true;
// Remove Images from Signatures
var funcSigImg = true;
// Fix Post Panel
var funcPost = true;
// 100% Page Width
var funcFullWidth = true;
// Reset Hash Anchor
var funcResetAnchor = true;
// Remove the Green bar at the Top
var funcRemoveGreen = true;
// Remove the Hover Underline on the Bar Menu
var funcMenuUnderline = true;
// Enlarge Small Text
var funcEnlargeText = true;

//
// FUNCTIONS - Do not edit after this point
//

// Condense Document Title
if(funcTitle)
{
	document.title = document.title.replace("Leisureforce • ", "");
}

// Remove Images from Signatures
if(funcSigImg && document.URL.indexOf("viewtopic.php") != -1)
{
	var imgDivs = document.getElementsByTagName("div");
	for (var i = 0; i < imgDivs.length; i++) 
	{
		if(imgDivs[i].className == "signature") 
		{
			var images = imgDivs[i].getElementsByTagName("img");
			while(images.length > 0) 
			{
				images[0].parentNode.removeChild(images[0]);
			}
			while(imgDivs[i].innerHTML.substring(0,4) == "<br>")
			{
				imgDivs[i].innerHTML = imgDivs[i].innerHTML.substring(4);
			}			
    	}
	}
}

// Fix Post Panel
if(funcPost)
{
	if(document.URL.indexOf("viewtopic.php") != -1)
	{
		var detailDivs = document.getElementsByTagName("div");
		for (var i = 0; i < detailDivs.length; i++) 
		{
			if(detailDivs[i].className == "forum-box") 
			{
				var divs = detailDivs[i].getElementsByTagName("div");
				var postBody = divs[0];
				if(postBody.className == "postbody")
				{
					// CREATING NEW LAYOUT
					var table = document.createElement("table");
					table.setAttribute("cellspacing", "0");
					table.setAttribute("cellpadding", "0");
					table.setAttribute("width", "100%");
					var tableTr = document.createElement("tr");
					table.appendChild(tableTr);
					var posterTd = document.createElement("td");
					posterTd.style.width = "154px";
					posterTd.style.margin = "0 0 0 0";
					posterTd.style.padding = "0 4px 0 0";
					posterTd.style.borderRight = "1px solid #333333";
					posterTd.style.verticalAlign = "top";
					tableTr.appendChild(posterTd);
					var postTd = document.createElement("td");
					postTd.style.padding = "0 0 0 8px";
					postTd.style.verticalAlign = "top";
					tableTr.appendChild(postTd);
					postBody.style.width = "100%";
					// EDITING POST BODY
					var brs = postBody.getElementsByTagName("br");
					if(brs.length > 0)
					{
						postBody.removeChild(brs[0]);
					}
					var brhs = postBody.getElementsByTagName("br");
					if(brhs.length > 0)
					{
						postBody.removeChild(brhs[0]);
					}
					postTd.appendChild(postBody);
					var postBut = postBody.getElementsByTagName("ul")[0];
					postBut.style.padding = "0 0 0 10px";
					// FIXING SIG
					var sigs = postBody.getElementsByTagName("div");
					for (var j = 0; j < sigs.length; j++) 
					{
						if(sigs[j].className == "signature") 
						{
							sigs[j].style.borderTop = "1px solid #333333";
						}	
					}
					// FIXING POSTER DETAILS
					var dl = detailDivs[i].getElementsByTagName("dl")[0];
					var avatar = dl.getElementsByTagName("dt")[0];
					var newText = "<div align=\"center\">" + avatar.innerHTML;
					
					if(dl.className == "postprofile online")
					{
						newText = newText + " - Online";
					}
					newText = newText + "</div>";
					
					var ps = dl.getElementsByTagName("dd");
					for(var j = 0; j < ps.length; j++)
					{
						var t = ps[j].innerHTML;
						if(t != "&nbsp;")
						{
							newText = newText + t + "<br>";
						}
					}
					posterTd.innerHTML = newText;
					// PUTTING CONTENT IN RIGHT PLACE
					detailDivs[i].innerHTML = '';
					detailDivs[i].appendChild(table);
				}
			}
		}
	}
}

// 100% Page Width
if(funcFullWidth)
{
	var detailDivs = document.getElementsByTagName("div");
	for (var i = 0; i < detailDivs.length; i++) 
	{
		if(detailDivs[i].className == "wrap2") 
		{
			detailDivs[i].style.width = '100%';
		}
	}
	var stupidWrap = document.getElementById('wrap3');
	stupidWrap.style.width = '';
	stupidWrap.style.width = '100%';
	stupidWrap.style.maxWidth = '';
	stupidWrap.style.maxWidth = '100%';
	stupidWrap.style.padding = '0 0 0 0';
	stupidWrap.style.margin = '0 0 0 0';
	var pageBody = document.getElementById('page-body');
	pageBody.style.margin = '4px 4px';
}

// Reset Hash Anchor
if(funcResetAnchor)
{
	if(location.href.indexOf("#p") != -1)
	{
		var headDivs = document.getElementsByTagName("div");
		for (var i = 0; i < headDivs.length; i++) 
		{
			var hD = headDivs[i];
			if(hD.className == "cat-head") 
			{
				var theLink = hD.getElementsByTagName("a")[0];
				if(!theLink)
				{
				
				}
				else
				{
					var tempHref = theLink.getAttribute("href");
					var postNum = tempHref.split("#")[1];
					var newEle = document.createElement("a");
					newEle.setAttribute("name", postNum);
					hD.appendChild(newEle);
				}
			}
		}
	}
	if(location.href.indexOf("#") != -1)
	{
		resetHashAnchor();
	}	
}

// Remove the Green bar at the Top
if(funcRemoveGreen)
{
	var greens = document.getElementsByTagName("div");
	for (var i = 0; i < greens.length; i++) 
	{
		if(greens[i].className == "pagetop") 
		{
			greens[i].style.height = "0px";
			break;
		}
	}
}
// Remove the Hover Underline on the Bar Menu
if(funcMenuUnderline)
{
	var css='.navlink ul li a:hover{text-decoration:none;}';
	style=document.createElement('style');
	if (style.styleSheet)
		style.styleSheet.cssText=css;
	else 
		style.appendChild(document.createTextNode(css));
	document.getElementsByTagName('head')[0].appendChild(style);
}

// Enlarge Small Text
if(funcEnlargeText)
{
	var textDivs = document.getElementsByTagName("div");
	for (var i = 0; i < textDivs.length; i++) 
	{
		if(textDivs[i].className == "postbody") 
		{
			var textSpans = textDivs[i].getElementsByTagName("span");
			for(var j = 0; j < textSpans.length; j++)
			{
				var fontSi = textSpans[j].style.fontSize;
				fontSi = fontSi.replace('%', '');
				if(fontSi != null && fontSi != "")
				{
					if(parseInt(fontSi) < 85)
					{
						textSpans[j].style.fontSize = "100%";
						var newSpanText = '<span style="color:#00BFFF;">[' + fontSi + '] </span>';
						newSpanText = newSpanText + textSpans[j].innerHTML;
						newSpanText = newSpanText + '<span style="color:#00BFFF;"> [/' + fontSi + ']</span>';
						textSpans[j].innerHTML = newSpanText;
					}
				}
			}
    	}
	}		
}

//
// INTERNAL FUNCTIONS
//

function removeDays(text)
{
	text = text.replace(/Sun |Sat /g, '');	
	text = text.replace(/Mon /g, '');
	text = text.replace(/Tue /g, '');	
	text = text.replace(/Wed /g, '');	
	text = text.replace(/Thu /g, '');	
	text = text.replace(/Fri /g, '');	
	//text = text.replace(/Sat /g, '');	
	return text;
}

function resetHashAnchor()
{
     if (window.onload)
     {
		location.href = location.href;
		//location.hash = location.hash;
     } else {
        setTimeout('resetHashAnchor();', 1000)
     }
}