// ==UserScript==
// @name           MySimpleGbar
// @namespace      http://diveintogreasemonkey.org/download/
// @description	   Simple way to replace the google gbar.
// @include        http://*.google.com/*
// @copyright	   Spider with addLink() from JoeSimmons and help from 
//		   znerp and other forum members over at  userscripts.org
// ==/UserScript==
var gbar = document.getElementById('gbar');
var masterLink = 'MyLink';
var LinkCount;
var name, link;

function id(ID) {
if(ID) { return document.getElementById(ID); }
else { return false; }
}

//		       arg1	   arg2	       arg3	arg4	    arg5
// Syntax: addLink('link text', 'link href', 'class', 'target', 'id of node');
function addLink(arg1, arg2, arg3, arg4, arg5) {
if(arg1 && arg2) {
var n, a;
n=(arg5)?id(arg5):id('gbar');
a = document.createElement('a');
// Make the 1st argument the link text
if(arg1) {a.appendChild(document.createTextNode(arg1));}
// Make the 2nd argument the link href
if(arg2) {a.href = arg2;}
// Make the 3rd argument the link's class
if(arg3) {a.setAttribute('class', arg3);}
// Make the 4th argument the link's target
if(arg4) {a.setAttribute('target', arg4);}
// Add it to the variable gbar
n.appendChild(document.createTextNode(' '));
n.appendChild(a);
}
}

// By Spider
// Add link too the gbar and refreshes the current page
function AddCustom() 
{
	name = prompt("Enter link text:", "");
	if(name == null || name == '')
	{
		if(name == ''){alert('name empty');}
	}
	else{
		link = name + "," + prompt("Enter link URL:", "http://");
		//alert('Link Entered');
		//alert(link);
		GM_setValue('MyLink'+LinkCount, link);
		GM_setValue('LinkCount', LinkCount+1);
	}
	window.location.reload();
}

function RemoveCustom()
{
	//Remove Code Here...
	//alert('Remove Link');
	var Remove = prompt("Enter the name of the custom link you would like to remove:", "");
	//alert(Remove);
	for(var x = 0; x < LinkCount; x++)
	{
		//check current GM setting for Remove
		var thisLink = GM_getValue(masterLink + x, "");
		//alert(thisLink);
		//alert(thisLink.indexOf(Remove));
		if(thisLink.indexOf(Remove) >= 0)
		{
			//alert('Found!');
			//Remove Link
			while(x < LinkCount)
			{
				//alert('Before: ' + GM_getValue(masterLink + x), "");
				GM_setValue(masterLink + x, GM_getValue(masterLink + (x+1), ""));
				//alert('After: ' + GM_getValue(masterLink + x, ""));
				x++;
			}
			GM_setValue('LinkCount', LinkCount-1);
		}
	}
	window.location.reload();
}

// Setup the Add/Remove menu
var ARmenu =document.createElement("select");
var AddC = document.createElement('option');
AddC.text = 'Add Link';
var RemoveC = document.createElement('option');
RemoveC.text = 'Remove Link';
ARmenu.add(AddC, null);
ARmenu.add(RemoveC, null);
ARmenu.title = 'Custom Links';
gbar.appendChild(ARmenu);
AddC.addEventListener('click', AddCustom, true);
RemoveC.addEventListener('click', RemoveCustom, true);

// ADD THE LINKS HERE
addLink('Web', 'http://www.google.com/ig?hl=en', 'gb1', '_self', 'gbar');
addLink('Gmail', 'http://mail.google.com/mail/?hl=en&tab=wm', 'gb1', '_self', 'gbar');
addLink('Documents', 'http://docs.google.com/?hl=en&tab=wo#all', 'gb1', '_self', 'gbar');
addLink('Calendar', 'http://www.google.com/calendar/render?tab=oc', 'gb1', '_self', 'gbar');
addLink('Sites', 'http://sites.google.com/?tab=c3', 'gb1', '_self', 'gbar');
addLink('Images', 'http://images.google.com/imghp?hl=en&tab=wi', 'gb1', '_self', 'gbar');
addLink('Maps', 'http://maps.google.com/maps?hl=en&tab=vl','gb1', '_self', 'gbar');

// Remove comments to add these links
//===================================
//addLink('News', 'http://news.google.com/nwshp?hl=en&tab=wn', 'gb1', '_self', 'gbar');
//addLink('Shopping', 'http://www.google.com/prdhp?hl=en&tab=nf', 'gb1', '_self', 'gbar');
//addLink('Video', 'http://video.google.com/?hl=en', 'gb1', '_self', 'gbar');
//addLink('Groups', 'http://groups.google.com/grphp?hl=en&tab=vg&pli=1', 'gb1', '_self', 'gbar');
//addLink('Books', 'http://books.google.com/bkshp?hl=en&tab=gp', 'gb1', '_self', 'gbar');
//addLink('Scholar', 'http://scholar.google.com/schhp?hl=en&tab=ps', 'gb1', '_self', 'gbar');
//addLink('Finance', 'http://finance.google.com/finance?hl=en&tab=pe', 'gb1', '_self', 'gbar');
//addLink('Blogs', 'http://blogsearch.google.com/?hl=en&tab=eb', 'gb1', '_self', 'gbar');
//addLink('YouTube', 'http://www.youtube.com/?tab=b1', 'gb1', '_self', 'gbar');
//addLink('Photos', 'http://picasaweb.google.com/home?tab=cq', 'gb1', '_self', 'gbar');
//addLink('Reader', 'http://www.google.com/reader/view/?tab=qy', 'gb1', '_self', 'gbar');
//addLink('More', 'http://www.google.com/intl/en/options/', 'gb1', '_self', 'gbar');
// To add a custom link use the following syntax
// addLink('link text', 'link href', 'class', 'target', 'id of node');

// Add Custom Links added through GreaseMonkey
LinkCount = GM_getValue("LinkCount", 0);
if(LinkCount == 0){GM_setValue("LinkCount", 0);}
var currentLink = 0;
//alert(LinkCount + ' Links');
while(currentLink < LinkCount)
{
	// Fetch custom links from cookies
	var linkLoc = masterLink + currentLink;
	//alert(linkLoc);
	// Seperate name and link
	name = GM_getValue(linkLoc, "");
	//alert("index = "+name.indexOf(","));
	link = name.substring(name.indexOf(",")+1, name.length);
	name = name.substring(0, name.indexOf(","));
	//alert(name);
	//alert(link);
	addLink(name, link, 'gb1', '_self', 'gbar');
	currentLink++;
}

// This will remove the original gbar links
gbar.removeChild(gbar.firstChild);
