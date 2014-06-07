// Greasemonkey script: craigslist tool
 
// == March 23, 2008 - Updated by Josh Trefethen - http://zjt.us == 
// This script was originally written by Kenneth Go, and has been updated by Josh Trefethen
// It appears Ken disappeared, and since many of the links and code on this site linked to his 
// site hosted a gwu, which no longer exists, I have updated this script to take those links out

// I also changed the js so that the script does not ad an additional top frame. 

// This script reskins craigslist. Hope you like it.
// Dynamically creates a frameset to browse lists and open them in a right frame.
// Also includes features like inline google maps for housing posts

// ==UserScript==
// @name                Craigslist skin BETA
// @author				Kenneth Go, Josh Trefethen
// @namespace		
// @date				2006-3-15
// @description         Change look & feel of craigslist list pages
// @include             http://*.craigslist.org/*
// @exclude             http://www.craigslist.org
// @exclude             http://www.craigslist.org/
// ==/UserScript==

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
		src = 'http://www.google.com/search?as_sitesearch=dallas.craigslist.org'
	}
	document.body = document.createElement('frameset');
	document.body.setAttribute('rows','*');
	document.body.setAttribute('cols','420,*');
	leftFrame = document.createElement('frame')
		leftFrame.setAttribute('name',"left")
		leftFrame.setAttribute('src',leftSrc);	
 	//botFrameSet = document.createElement('frameset')
	//	botFrameSet.setAttribute('rows',"30,*")
	//	botFrameSet.setAttribute('cols',"*")
	document.body.appendChild(leftFrame);
	//document.body.appendChild(botFrameSet);
	//navFrame = document.createElement('frame')
	//	navFrame.setAttribute('name',"nav")
	//	navFrame.setAttribute('src',"http://home.gwu.edu/~kengo/craigtool/craignext.htm");
	rightFrame = document.createElement('frame')
		rightFrame.setAttribute('name',"right")
		rightFrame.setAttribute('src',src);
	//botFrameSet.appendChild(navFrame);
	//botFrameSet.appendChild(rightFrame);
	document.body.appendChild(rightFrame);
	leftFrame.contentDocument.location = leftSrc;
	rightFrame.contentDocument.location = src;
	
}
// Add styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
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
				// 3/1/06 kg: aded for inline google map
				//find google map link
					if(ai.match('maps.google')){
						//alert(ai);
						//create div for map
						insertMap(ai);
					}
				
		}
}

//=====================
// 3/1/06: added for inline google map
// insert google map at the bottom
//=====================
function insertMap(url) {
	 var mapurl = url;
	 var gmd = document.createElement("div");
	 gmd.id = 'gmd';
	 var plural = '';
	 var d=document; var m=d.createElement('div');
	 var str = '<iframe id=gmf width=100% height=450 src="'+mapurl+'"></iframe>'
	 m.innerHTML = str;
	 d.body.appendChild(m);
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


