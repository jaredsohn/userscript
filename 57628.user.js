// Greasemonkey script: Craigslist-In-A-Frame
// Copyright (c) 2009, Erich Cervantez

// Reskins Craigslist to provide two frames

// ==UserScript==
// @name                Craigslist-In-A-Frame by Erich
// @author		Erich Cervantez
// @namespace		
// @date		2009-9-12
// @description         Provides framed craigslist
// @include             http://*.craigslist.org/*
// @exclude             http://www.craigslist.org
// @exclude             http://www.craigslist.org/
// ==/UserScript==

//=====================
// Specify column width
//=====================

var cols = 670;

//=====================
// Create Frameset
//=====================
//if there is no frame, create it
if(top.frames.length == 0){
	var src = window.location.href;
	var leftSrc = '';

	// if the URL is a posting page, open the corresponsing listing in the left frame
	//ex: https://www.craigslist.org/sfc/jjj/nnnn.htm
	if(src.indexOf('.htm') > 0){
		leftSrc = src.substring(0,src.lastIndexOf('/'));
	}
	else{
		// otherwise open the default page in the right
		leftSrc = src;
		src = 'about:blank'
	}
	document.body = document.createElement('frameset');
	document.body.setAttribute('rows','*');
	document.body.setAttribute('cols', cols + ',*');

	leftFrame = document.createElement('frame')
		leftFrame.setAttribute('name',"left")
		leftFrame.setAttribute('src',leftSrc);

	botFrameSet = document.createElement('frameset')
		botFrameSet.setAttribute('rows',"*")
		botFrameSet.setAttribute('cols',"*");

	document.body.appendChild(leftFrame);
	document.body.appendChild(botFrameSet);

	rightFrame = document.createElement('frame')
		rightFrame.setAttribute('name',"right")
		rightFrame.setAttribute('src',src);
	botFrameSet.appendChild(rightFrame);
	leftFrame.contentDocument.location = leftSrc;
	rightFrame.contentDocument.location = src;
	
}

// Add styles
function setStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

setStyle(
			   'body { font-family: Verdana,Arial,sans-serif;line-height:14px; ! important; background:#FFFFFF;'+ 
			   'font-size: 9pt !important;'+
			   '}'+
				'a{text-decoration:none; color:#003DB8 ;}a:hover{text-decoration:underline;background-color:#eaeaea;}a:visited{color:#660066;}'+
				'td{font-family: Verdana,Arial,sans-serif;line-height:14px; ! important;font-size: 9pt !important; }'
				)

//=====================
// Helper function to remove element
//=====================
function removeSection(tag,n) {
	try{
						
			var t = document.getElementsByTagName(tag)[n];
				
				// if not a table for images
				if (t.summary != "craigslist hosted images" || t.parentNode.summary != "craigslist hosted images" || t.parentNode.summary !="main"){
					//find parent
					t.parentNode.removeChild(t);
					
				}
				
			
	}
		catch(e){
			return;}
}
//=====================
// Remove sections of the page to make it more readable
//=====================
// Check if first table is the bread crumbs and then remove the first cell and links to scam and flagging info
// Added check for img tag for postings with images.
if (document.getElementsByTagName('table')[0].summary != "main"){
var td = document.getElementsByTagName('td')[0];
	if (td && td.innerHTML.match('craigslist')&& !td.innerHTML.match('img') ){
		removeSection('td',0);
		removeSection('table',2);
	}
//remove two lines before results
removeSection('br',0);
removeSection('br',1);
// remove printerfriendly button
removeSection('form',1);
}

//=====================
// remove BLockquotes
//=====================
var d = document.body.innerHTML;
if(d.match('blockquote')){
	d=d.replace("<blockquote>","").replace("</blockquote>","").replace("<blockquote>","").replace("</blockquote>","");
	document.body.innerHTML =d;

}


//=====================
// Adjust links to open in right frame.
//=====================
// change links to open in loadhere frame
var a = document.getElementsByTagName('a');
if (a.length >0){
	for (var i = 0; i < a.length; i++) 
		{
			var ai = a[i].href;
			// if link contains .html change target location
				
				if (ai.match('.html')||ai.match('post')||ai.match('help')||ai.match('map'))
				{
					if(ai.match('index')!='index'){
						a[i].target="right";
					}
					
				}
				else
				{
					a[i].target="left";
				}
				
		}
}


//=====================
// make the links look all nice and pretty
//=====================
p = document.getElementsByTagName('p');
if (p.length >0){
	for (var i = 0; i < p.length; i++) 
		{
				if((i % 2) ==0){
					p[i].setAttribute("style","background:#EFF2F7;border:1px dashed #a5b2bd; padding:3pt");	
				}else{
					p[i].setAttribute("style","border:1px dashed #a5b2bd; padding:3pt")  ;	
				}
		}
}


