// ==UserScript==
// == December 8, 2008 - Updated by Rollinns (LB)- 
// This script was originally written by Kenneth Go, and has been updated by Josh Trefethen
// Then updated again by Rollinns (LB) to include elements of the 
// family friendly craigslist scriptwritten by S Spigarelli.
// Thank you to all three for your time and work on these
// Due to all their work I give credit to them and God for this.

// The following changes have been made
// The search bar and city names have been brought back, and the communtiy & forums areas have 
// been removed. The personals were removed with S Spigarelli's script and are still gone.
// Also the City was changed from Dallas to Kansas City

// Josh wrote the following about the Craiglist Skin BETA
// It appears Ken disappeared, and since many of the links and code on this site linked to his 
// site hosted a gwu, which no longer exists, I have updated this script to take those links out
// I also changed the js so that the script does not ad an additional top frame. 
// This script reskins craigslist. Hope you like it.
// Dynamically creates a frameset to browse lists and open them in a right frame.
// Also includes features like inline google maps for housing posts

// S Spigarelli wrote the following about more family friendly craigslist
// remove content that I don't like to see when I visit a public site like craigslist - and I don't need to see personals - ever

// @name           Craigslist family skin beta
// @namespace      http://userscripts.org/users/74548
// @description    Combo of more_family_friendly_craiglist and craigslist_skin_BETA with changes to both
// @include        http://*.craigslist.org/*
// @include        http://craigslist.org/*
// @date          2008-12-08
// @version       0.2
// @GM_version    0.8
// ==/UserScript==

(function() {
    // find all tables on the page - look for a summary of "personals"
    tables = document.getElementsByTagName("table");
    for (i=0; i<tables.length; i++)
    {
      // remove personals section
      if (tables[i].summary.match(/personals/i)) tables[i].style.display = "none";
      // remove community as well
      if (tables[i].summary.match(/community/i)) tables[i].style.display = "none";
      // remove forums as well
      if (tables[i].summary.match(/forums/i)) tables[i].style.display = "none";
    }

    anchors = document.getElementsByTagName("a");
    for (i=0; i<anchors.length; i++)
    {
      if (anchors[i].innerHTML.match(/^erotic|kink|adult|m4m|w4w|queer$/i)) anchors[i].style.display = "none";
    }
})();
// Greasemonkey script: craigslist tool by Josh Trefethen
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
		src = 'http://www.google.com/search?as_sitesearch=kansascity.craigslist.org'
	}
	document.body = document.createElement('frameset');
	document.body.setAttribute('rows','*');
	document.body.setAttribute('cols','320,*');
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
			   'body { font-family: Verdana,Arial,sans-serif;line-height:16px; ! important; background:#FFFFFF;'+ 
			   'font-size:10pt !important;'+
			   '}'+
				'a{text-decoration:none; color:#003DB8 ;}a:hover{text-decoration:underline;background-color:#eaeaea;}a:visited{color:#660066;}'+
				'td{font-family: Verdana,Arial,sans-serif;line-height:16px; ! important;font-size:12pt !important; }'
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
		removeSection('td',2);
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
