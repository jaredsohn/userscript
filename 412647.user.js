// ==UserScript==
// @name		right-to-left support for outlook.com
// @description Adds right to left (rtl) live button to outlook.com / live.com / hotmail.com
// @include	 https://*.mail.live.com/* 
// @include	 https://*a.gfx.ms/*
// @grant	   GM_addStyle
// ==/UserScript==


// just in case some one is searc
function gRtlBtnHandler() 
{
	if ( document.title.indexOf("Outlook") < 0 )
	{
		return;
	}

	var ButtonListMe = document.getElementsByClassName("ButtonList Enabled");
	if ((ButtonListMe==null) || (ButtonListMe.length<=0) || (ButtonListMe[0].children.length<=0))
	{
		createTimer(2);
		return;
	}

	if (document.getElementById ("myRtlButton") != null)
		return;

	var zNode = document.createElement('div');
	
	zNode.innerHTML = '<button id="myRtlButton" type="button">\<\></button>';
	zNode.setAttribute ('id', 'myRtlContainer');
	ButtonListMe[0].appendChild(zNode);		

	document.getElementById ("myRtlButton").addEventListener ("click", ButtonClickActionRTL, false);

	document.addEventListener("DOMNodeRemoved",gRtlBtnHandlerEvent,false);
}

function gRtlBtnHandlerEvent(zEvent) 
{
	gRtlBtnHandler();
}

var gGlobalRtlPrefixHtml=document.createElement('gGlobalRtlPrefixHtml');
var gGlobalRtlSuffixHtml=document.createElement('gGlobalRtlSuffixHtml');
var gGlobalRtlDataTouch=0;

function gResetGlobalRtl()
{
	gGlobalRtlPrefixHtml.innerHTML="";
	gGlobalRtlSuffixHtml.innerHTML="";
	gGlobalRtlDataTouch=0;
}


function gMakeHtml(firstElem)
{
	if (firstElem==null)
		return "";

	var retval="";

	if (firstElem.outerHTML != null)
	{
		retval = firstElem.outerHTML;

		if ((gGlobalRtlPrefixHtml.innerHTML=="") && (gGlobalRtlDataTouch==0))
			gGlobalRtlPrefixHtml.innerHTML=retval;
		else
			gGlobalRtlSuffixHtml.innerHTML=retval;
	}
	else if (firstElem.data != null)
	{
		retval = firstElem.data;
		gGlobalRtlDataTouch=1;
	}
	else
	{
	}

	return retval;
}

function gCollectHtml(firstElem,stopElem,maxTextLines)
{
	gResetGlobalRtl();

	var outhtml = "";
	var lineCnt=0;

	if (firstElem == null)
		return "";

	outhtml += gMakeHtml(firstElem.previousSibling);
	if (firstElem.previousSibling && (firstElem.previousSibling.data != null))
		lineCnt += 1;    

	if (firstElem==stopElem)
	{
		outhtml += gMakeHtml(firstElem);

		if (firstElem.data != null)
			lineCnt += 1;

		if (firstElem != null)
		{
			outhtml += gMakeHtml(firstElem.nextSibling);

			if (firstElem.nextSibling && (firstElem.nextSibling.data != null))
				lineCnt += 1;
		}

		return outhtml;
	}

	while ( (firstElem != null) && (firstElem != stopElem) )
	{
		if (firstElem.data != null)
			lineCnt += 1;

		if (lineCnt>maxTextLines)
			break;

		outhtml += gMakeHtml(firstElem);

		firstElem = firstElem.nextSibling;
	} 


	return outhtml;    
}

function ButtonClickActionRTL(zEvent) 
{
	var elements = document.getElementsByTagName('iframe');
	for(var i=0; i<elements.length; i++) 
	{
		var input = elements[i];

		if (input.id != "ComposeRteEditor_surface")
			continue;

		input.spellcheck=true;
		if (typeof(input.contentDocument) == 'undefined' || input.contentDocument == null)
		{
			alert('wtf0');
			continue;
		}

		if (typeof(input.contentDocument.firstElementChild) == 'undefined' || input.contentDocument.firstElementChild == null)
		{
			alert('wtf1');
			continue;
		}


		var items = input.contentDocument.getElementsByTagName("*");
		var mydoc = input.ownerDocument;
		//input.focus();
		//input.contentWindow.focus();

		for(var j=0; j<items.length; j++)
		{
			var itemsj = items[j];
			if (itemsj.getAttribute("sutra")!="richtextframebody")
				continue;

			var maxlines = 1;
			var selstring = itemsj.firstChild.ownerDocument.getSelection().toString();
			if (selstring)
			{
				maxlines = selstring.split(/[\n]/g).length;
				if (false)
				{
					maxlines = 1+lines.length;
				}
			}

			var range = itemsj.firstChild.ownerDocument.getSelection().getRangeAt(0).cloneRange();            
			var tmpRange = range;
			var objline = tmpRange.startContainer;
			var textline = objline.data;

			if (objline.className == "t_mbgc t_atc RichText")
				continue; // something went wrong.

			var allHtml = textline;

			if (objline.parentElement != null)
			{
				if ((objline.parentElement.tagName == 'P') || (objline.parentElement.tagName == 'p') || (gGlobalRtlPrefixHtml.tagName == 'div'))
				{
					if (objline.parentElement.getAttribute("dir") == "rtl")
						objline.parentElement.setAttribute("dir","ltr");
					else
						objline.parentElement.setAttribute("dir","rtl");

					continue;
				}
			}

			allHtml = gCollectHtml(objline,tmpRange.endContainer,maxlines);

			if ((gGlobalRtlPrefixHtml.tagName == 'P') || (gGlobalRtlPrefixHtml.tagName == 'p') || (gGlobalRtlPrefixHtml.tagName == 'div'))
			{
				if (objline.parentElement.getAttribute("dir") == "rtl")
					objline.parentElement.setAttribute("dir","ltr");
				else
					objline.parentElement.setAttribute("dir","rtl");

				continue;
			}


			var newprefix = gGlobalRtlPrefixHtml.innerHTML + "<p dir=\"rtl\">";
			var newsuffix = "</p>" + gGlobalRtlSuffixHtml.innerHTML;
			var seltext = allHtml.substring(gGlobalRtlPrefixHtml.innerHTML.length,allHtml.length-gGlobalRtlSuffixHtml.innerHTML.length);

			var newHtml = newprefix+seltext+newsuffix;

			var orgtext = items[j].innerHTML;
			orgtext = orgtext.replace(allHtml,newHtml);
			items[j].innerHTML = orgtext;
		}
	}
}


function createTimer(i) {
	// wait 1 second and add the gbar.
	window.setTimeout(function() {

		gRtlBtnHandler();


	}, 1000*i);

}


// first check

(function() {

	createTimer(1);


})();


//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
#myRtlButton {
min-width: .1em;
width: 2em;
background-color: rgba(190, 190, 190, 0);
padding-top: 0;
padding-left: 0;
padding-right: 0;
}
#myLtrButton {
min-width: .1em;
width: 2em;
background-color: rgba(190, 190, 190, 0);
padding-top: 0;
padding-left: 0;
padding-right: 0;
}
#myRtlContainer{
}
*/} ) );

function multilineStr (dummyFunc) {
	var str = dummyFunc.toString ();
	str	 = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
		.replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
		.replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
		;
	return str;
}

