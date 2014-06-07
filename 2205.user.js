// ==UserScript==
// @name          Block a digg article
// @namespace     http://diveintogreasemonkey.org/download/
// @description   v1.0
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var digglinkdiggID = new Array(50);

function AddBlockThisText(thepageid, thediggid)
{
	contentsuser = document.getElementById("div" + thepageid);
	if (contentsuser) {
		newElement = document.createElement('a');
		newElement.setAttribute('id', 'block' + thepageid);
		newElement.setAttribute('href', 'javascript://' + thepageid + '-' + thediggid);
		newElement.setAttribute('style', 'position: relative; left:0; top:0');
		newElement.className='contrast';
		var linkText=document.createTextNode('block this');
		newElement.appendChild(linkText);
		contentsuser.parentNode.insertBefore(newElement, contentsuser.nextSibling);
		
		var elmLink = document.getElementById('block' + thepageid);
		elmLink.addEventListener("click", blockthis, true);
	}
}

for (digglist=0; digglist < 25; digglist++)
{
	digglink = document.getElementById("diglink" + digglist);
	digglinkurl = digglink.innerHTML;
	digglinkstart = digglink.innerHTML.indexOf("(");
	digglistfirstcomma = digglinkurl.indexOf(',');
	digglistsecondcomma = digglinkurl.indexOf(',', digglistfirstcomma + 1);
	digglistthirdcomma = digglinkurl.indexOf(',', digglistsecondcomma + 1);
	digglinkend = digglink.innerHTML.indexOf(")");
	digglinkdiggID[digglist] = digglinkurl.substr(digglistsecondcomma + 1, digglistthirdcomma - digglistsecondcomma - 1);

	IsItBlocked = ""
	//check to see if this has been saved into your blocked list
	IsItBlocked = GM_getValue(digglinkdiggID[digglist], "NO")
	if (IsItBlocked == "BLOCK")
	{
		var adSidebar = document.getElementById("enclosure" + digglist);
		if (adSidebar) {                        
			adSidebar.parentNode.removeChild(adSidebar);
		}
	}
	else
	{
		AddBlockThisText(digglist, digglinkdiggID[digglist]);
	}
}

function blockthis(digglist)
{
	thehref = this.getAttribute('href');
	secondslash = thehref.indexOf("/") + 2;
	firstdash = thehref.indexOf("-");
	thepageid = thehref.substr(secondslash, firstdash - secondslash);
	thediggid = thehref.substr(firstdash + 1, 6);
	var adSidebar = document.getElementById("enclosure" + thepageid);
	if (adSidebar) {                        
		adSidebar.parentNode.removeChild(adSidebar);
	}
	//save it into your block list.
	GM_setValue(thediggid, "BLOCK")
}