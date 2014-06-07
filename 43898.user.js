// ==UserScript==
// @name           Lepro Textomate Back Replacer
// @namespace      http://leprosorium.ru/*
// @description    Replace Fucking Prepaid Replacements :)
// @description    Copyright (c) 2009, random2 / http://leprosorium.ru/users/20228
// @include        http://leprosorium.ru/*
// @include        http://www.leprosorium.ru/*
// ==/UserScript==

function getfuckinvars(doc)
{
	mates=new Array();

	var ff2=getElementsByClassName('fow_to_word',doc);

	for (var i=0;i<ff2.length;i++)
	{
		mates[i]=new Array();
		mates[i]['to']=ff2[i].childNodes[0].nodeValue;

	}

	var ff=getElementsByClassName('fow_word',doc);

	for (var i=0;i<ff.length;i++)
	{
	//	mates[i]['from']=ff[i].childNodes[0].nodeValue.substring(0,ff[i].childNodes[0].nodeValue.length-1) +'<span style="display: none">.</span>'+ ff[i].childNodes[0].nodeValue.substring(ff[i].childNodes[0].nodeValue.length-1,ff[i].childNodes[0].nodeValue.length);
//'<div class="link"><a href="http://leprosorium.ru/fraud/textomate/">' +
		mates[i]['from']='<div class="link"><a href="http://leprosorium.ru/fraud/textomate/">' + ff[i].childNodes[0].nodeValue.substring(0,ff[i].childNodes[0].nodeValue.length-1) +'<span style="display: none">.</span>'+ ff[i].childNodes[0].nodeValue.substring(ff[i].childNodes[0].nodeValue.length-1,ff[i].childNodes[0].nodeValue.length) + '<span style="color: gray">было: '+ ff2[i].childNodes[0].nodeValue.substring(0,ff2[i].childNodes[0].nodeValue.length-1) +'<span style="display: none">.</span>'+ ff2[i].childNodes[0].nodeValue.substring(ff2[i].childNodes[0].nodeValue.length-1,ff2[i].childNodes[0].nodeValue.length) +'</span></a></div>'
//<span style="color: gray">было: </span></a></div>';
	}
	
	
	go(mates);
}



function go(mates)
{
	createCSSClass('div.link', 'display: inline');
	createCSSClass('div.link a', 'text-decoration: none;');
	createCSSClass('div.link a:hover', 'background-color: #fff; display: inline');
	createCSSClass('div.link a:link span', 'display: none;');
	createCSSClass('div.link a:visited span', 'display: none;');
	createCSSClass('div.link a:hover span', 'z-index: 9000; position: absolute; margin:15px 0px 0px 20px; background-color: beige; max-width:220; padding: 2px 10px 2px 10px; border: 1px solid #C0C0C0; font: normal 10px/12px verdana; color: #000; text-align:left; display: inline;');

	var str=document.getElementsByClassName('dt',document);
	var varsarray=mates;

//	varsarray.reverse();


//window.alert(varsarray[0]['from']);
	for (var i=0;i<str.length;i++)
	{
		var p=str.item(i).innerHTML;
		for (var si=0;si<varsarray.length;si++)
		{
			var p = str_replace(varsarray[si]['to'],varsarray[si]['from'], p);
		}


		str.item(i).innerHTML=p;
	}
}

function str_replace(search, replace, subject)
{
	return subject.split(search).join(replace);
} 


function getElementsByClassName(class_name,doc)
{
	var all_obj=doc,ret_obj=new Array(),j=0,teststr;
	if(doc.all)all_obj=doc.all;
	else if(doc.getElementsByTagName && !doc.all)all_obj=doc.getElementsByTagName("*");

	for(i=0;i<all_obj.length;i++)
	{
		if(all_obj[i].className.indexOf(class_name)!=-1)
		{
			teststr=","+all_obj[i].className.split(" ").join(",")+",";
			if(teststr.indexOf(","+class_name+",")!=-1)
			{
				ret_obj[j]=all_obj[i];
				j++;
			}
		}
	}
	return ret_obj;
}

function loadXMLDoc(url)
{
	var req;
	req = null;
	if (window.XMLHttpRequest) {
		try {
			req = new XMLHttpRequest();
		} catch (e){}
	} else if (window.ActiveXObject) {
		try {
			req = new ActiveXObject('Msxml2.XMLHTTP');
		} catch (e){
			try {
		                req = new ActiveXObject('Microsoft.XMLHTTP');
			} catch (e){}
		}
	}
 
	if (req) {
		req.onreadystatechange = function ()
		{
			try {
				if (req.readyState == 4) {
					if (req.status == 200) {
						var doc = parse(req.responseText);
						getfuckinvars(doc);
					} else {
						//alert("?? ??????? ???????? ??????:\n" +
					//		req.statusText);
					}
				}
			}
			catch( e ) {
      // alert('Caught Exception: ' + e.description);
      // ? ????? ? ????? XMLHttpRequest ? Firefox ?????????? ??????????? ??????
      // Bugzilla Bug 238559 XMLHttpRequest needs a way to report networking errors
      // https://bugzilla.mozilla.org/show_bug.cgi?id=238559
			}
		};
		req.open("GET", url, true);
		req.send(null);
	}
}
 
function parse(result)
{
	var iframe=document.createElement('iframe');
	iframe.style.visibility='hidden';
	iframe.style.width="0";
	iframe.style.height="0";
	document.documentElement.appendChild(iframe);
	var doc=iframe.contentDocument;
	document.documentElement.removeChild(iframe);
	doc.documentElement.innerHTML=result.replace(/\bhref=/g,'_href=').replace(/\bsrc=/g,'_src=').replace(/\bHREF=/g,'_href=').replace(/\bSRC=/g,'_src=');
	return doc;
}


var createCSSClass = function(selector, style)
{
	// using information found at: http://www.quirksmode.org/dom/w3c_css.html
	// doesn't work in Opera due to lack of styleSheets support
	if(!document.styleSheets) return;
	if(document.getElementsByTagName("head").length == 0) return;
	var stylesheet;
	var mediaType;
	if(document.styleSheets.length > 0)
	{
		for(i = 0; i<document.styleSheets.length; i++)
		{
			if(document.styleSheets[i].disabled) continue;
			var media = document.styleSheets[i].media;
			mediaType = typeof media;
			// IE
			if(mediaType == "string")
			{
				if(media == "" || media.indexOf("screen") != -1)
				{
					styleSheet = document.styleSheets[i];
				}
			}
			else if(mediaType == "object")
			{
				if(media.mediaText == "" || media.mediaText.indexOf("screen") != -1)
				{
					styleSheet = document.styleSheets[i];
				}
			}
			// stylesheet found, so break out of loop
			if(typeof styleSheet != "undefined") break;
		}
	}
	// if no style sheet is found
	if(typeof styleSheet == "undefined")
	{
		// create a new style sheet
		var styleSheetElement = document.createElement("style");
		styleSheetElement.type = "text/css";
		// add to <head>
		document.getElementsByTagName("head")[0].appendChild(styleSheetElement);
		// select it
		for(i = 0; i<document.styleSheets.length; i++)
		{
			if(document.styleSheets[i].disabled) continue;
			styleSheet = document.styleSheets[i];
		}
		// get media type
		var media = styleSheet.media;
		mediaType = typeof media;
	}
	// IE
	if(mediaType == "string")
	{
		for(i = 0;i<styleSheet.rules.length;i++)
		{
			// if there is an existing rule set up, replace it
			if(styleSheet.rules[i].selectorText.toLowerCase() == selector.toLowerCase())
			{
				styleSheet.rules[i].style.cssText = style;
				return;
			}
		}
		// or add a new rule
		styleSheet.addRule(selector,style);
	}
	else if(mediaType == "object")
	{
	for(i = 0;i<styleSheet.cssRules.length;i++)
	{
		// if there is an existing rule set up, replace it
		if(styleSheet.cssRules[i].selectorText.toLowerCase() == selector.toLowerCase())
		{
			styleSheet.cssRules[i].style.cssText = style;
			return;
		}
	}
	// or insert new rule
	styleSheet.insertRule(selector + "{" + style + "}", styleSheet.cssRules.length);
	}
}



var url = window.location.protocol + "//" + window.location.host + "/fraud/textomate/";
loadXMLDoc(url);