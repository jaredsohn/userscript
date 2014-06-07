// ==UserScript==
// @name          Block a digg article
// @namespace     http://diveintogreasemonkey.org/download/
// @description   v1.0.14
// @include       http://digg.com/*
// @include       http://www.digg.com/*
// ==/UserScript==

var digglinkdiggID = new Array(250);
var digglink;

var showblocked = 1

contentsuser = document.getElementById("blogged"); //if the "blog this" item appears
if (contentsuser) {showblocked = 0} //then we don't want to show the blocked list.

var ignoretitlelist = new Array(10);

for (i = 1; i < 11; i++)
{
	ignoretitlelist[i] = GM_getValue("IGNORETITLE_" + i, "");
}

function AddBlockThisText(thepageid, thediggid)
{
	contentsuser = document.getElementById("ul" + thepageid);
	if (contentsuser) {
		newElement = document.createElement('a');
		newElement.setAttribute('id', 'block' + thepageid);
		newElement.setAttribute('href', 'javascript://' + thepageid + '-' + thediggid);
		newElement.className='tool';
		var linkText=document.createTextNode('block article');
		newElement.appendChild(linkText);
		contentsuser.parentNode.insertBefore(newElement, contentsuser.nextSibling);
		
		var elmLink = document.getElementById('block' + thepageid);
		elmLink.addEventListener("click", blockthis, true);
	}
	contentsuser = document.getElementById("block" + thepageid);
	if (contentsuser) {
		theuserid = getusersname(document.getElementById("enclosure" + thepageid));
		newElement = document.createElement('a');
		newElement.setAttribute('id', 'blockuser' + theuserid);
		newElement.setAttribute('href', 'javascript://' + thepageid + '-' + thediggid + "-" + theuserid);
		newElement.className='tool';
		var linkText=document.createTextNode('block user');
		newElement.appendChild(linkText);
		contentsuser.parentNode.insertBefore(newElement, contentsuser.nextSibling);
		
		var elmLink = document.getElementById('blockuser' + theuserid);
		elmLink.addEventListener("click", blockuser, true);
	}
}

blocklistcount = 0;

	if (showblocked == 1)
	{
		//show the Stories You've Blocked text
		contentsuser = document.getElementById("sidebar");
		if (contentsuser) {
			blB = document.createElement('B');
			t1 = document.createTextNode("Stories You've Blocked");
			blP = document.createElement('P');
			blBR = document.createElement('BR');
			blB.appendChild(t1); //make it bold
			contentsuser.appendChild(blP);
			contentsuser.appendChild(blB);
			contentsuser.appendChild(blBR);
		}
	}

for (digglist=0; digglist < 255; digglist++)
{
	theuserid = "";
	enclosureelement = document.getElementById("enclosure" + digglist);
	if (enclosureelement)
	{
		theuserid = getusersname(enclosureelement);
		if (theuserid)
		{
			digglink = document.getElementById("diglink" + digglist);
			digglinkurl = digglink.innerHTML;
			digglinkstart = digglink.innerHTML.indexOf("(");
			digglistfirstcomma = digglinkurl.indexOf(',');
			digglistsecondcomma = digglinkurl.indexOf(',', digglistfirstcomma + 1);
			digglistthirdcomma = digglinkurl.indexOf(',', digglistsecondcomma + 1);
			digglinkend = digglink.innerHTML.indexOf(")");
			digglinkdiggID[digglist] = digglinkurl.substr(digglistsecondcomma + 1, digglistthirdcomma - digglistsecondcomma - 1);
		
		
			diggtitleHTML = document.getElementById("title" + digglist).innerHTML
			diggtitleHTMLhrefstart = diggtitleHTML.indexOf('>') + 5
			diggtitleHTMLhrefend = diggtitleHTML.indexOf('</a>')
			diggtitle = diggtitleHTML.substr(diggtitleHTMLhrefstart , diggtitleHTMLhrefend - diggtitleHTMLhrefstart)
			
			
			IsItBlocked = "";
			//IsUserBlocked = "NO";
			//check to see if this has been saved into your blocked list
			IsItBlocked = GM_getValue(digglinkdiggID[digglist], "NO")
			IsUserBlocked = GM_getValue("USER_" + theuserid, "NO")
			if (IsItBlocked == "BLOCK" || IsUserBlocked == "BLOCK")
			{
				blockeditem = digglinkdiggID[digglist] + '\r\n';
				if (showblocked == 1){showblockeditem(blockeditem, diggtitle);}
				blocklistcount = blocklistcount + 1
				
				var adSidebar = document.getElementById("enclosure" + digglist);
				if (adSidebar) {                        
					adSidebar.parentNode.removeChild(adSidebar);
				}
			}
			else
			{
				AddBlockThisText(digglist, digglinkdiggID[digglist]);
			}
			

			//check to see if something in this title is on the ignore list
			
			ignoreme = 0;
			for (i=1; i < 11; i++)
			{
				//I had to add a blank space because it wouldnt match if it was the first word.
				ucasediggtitle = " " + diggtitle.toLowerCase()
				if (ignoretitlelist[i])
					{ucaseignoretitlelist = ignoretitlelist[i].toLowerCase()} 
				else 
					{ucaseignoretitlelist = ""}

				if (ucasediggtitle.indexOf(ucaseignoretitlelist) > 0)
					{ignoreme = 1;}
			
				//if this item should be ignored, then remove it.
				if (ignoreme > 0)
				{
					var adSidebar = document.getElementById("enclosure" + digglist);
					if (adSidebar) {                        
						adSidebar.parentNode.removeChild(adSidebar);
					}
				
				}
			}
		}
	}
}


	if (showblocked == 1)
	{
		// show the "blocked from this page text
		contentsuser = document.getElementById("sidebar");
		if (contentsuser) {
			blBR = document.createElement('BR');
			t1 = document.createTextNode(blocklistcount + " story(s) blocked from");
			t2 = document.createTextNode("this page.");
			contentsuser.appendChild(t1);
			contentsuser.appendChild(blBR);
			contentsuser.appendChild(t2);
		}
	}

	//show the Users You've Blocked text
	//contentsuser = document.getElementById("sidebar");
	//if (contentsuser) {
		//blB = document.createElement('B');
		//t1 = document.createTextNode("Users You've Blocked");
		//blP = document.createElement('P');
		//blBR = document.createElement('BR');
		//blB.appendChild(t1); //make it bold
		//contentsuser.appendChild(blP);
		//contentsuser.appendChild(blB);
		//contentsuser.appendChild(blBR);
	//}



	//show Your Ignore List
	if (showblocked == 1)
	{
		contentsuser = document.getElementById("sidebar");
		if (contentsuser) {
			blB = document.createElement('B');
			t1 = document.createTextNode("Items You Want To Ignore");
			blP = document.createElement('P');
			blBR = document.createElement('BR');
			blB.appendChild(t1); //make it bold
			contentsuser.appendChild(blP);
			contentsuser.appendChild(blB);
			contentsuser.appendChild(blBR);
		
			for (i = 1; i < 11; i++)
			{
				showignorelistitem(i, ignoretitlelist[i]);
			}
			
			t2 = document.createTextNode("Click on an number to change.");
			contentsuser.appendChild(t2);
		}
	}

function showignorelistitem(i, ignoreitem)
{
	contentsuser = document.getElementById("sidebar");
	if (contentsuser) {
		//t1 = document.createTextNode(i + ") " + ignoreitem);
		blBR = document.createElement('BR');
		//contentsuser.appendChild(t1);
			newElementA = document.createElement('a');
			newElementA.setAttribute('id', 'ignore' + i);
			newElementA.setAttribute('href', 'javascript://' + i);
			newElementA.className='tool';
			var linkTextA=document.createTextNode(i + ") " + ignoreitem);
			newElementA.appendChild(linkTextA);
		contentsuser.appendChild(newElementA);
		contentsuser.appendChild(blBR);

		var elmLink = document.getElementById('ignore' + i);
		elmLink.addEventListener("click", changeignore, true);
	}
}

function changeignore()
{
	thehref = this.getAttribute('href');
	secondslash = thehref.indexOf("/") + 2;
	theignoreid = thehref.substr(secondslash, 6);
	
	newignore = prompt("Please type in what you'd like to ignore (not case sensitive)", '')
	GM_setValue("IGNORETITLE_" + theignoreid, newignore);

	window.location.reload()
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


function getusersname(enclosure)
{
	enclosurehtml = enclosure.innerHTML;
	usersstart = enclosurehtml.indexOf('/users/');
	usersend = enclosurehtml.indexOf('"', usersstart );
	usersname = enclosurehtml.substr(usersstart + 7, usersend - usersstart - 7);
	return usersname;
}

function blockuser(theuserid)
{
	thehref = this.getAttribute('href');
	secondslash = thehref.indexOf("/") + 2;
	firstdash = thehref.indexOf("-");
	seconddash = thehref.indexOf("-", firstdash + 1);
	thepageid = thehref.substr(secondslash, firstdash - secondslash);
	thediggid = thehref.substr(firstdash + 1, 6);
	theuserid = thehref.substr(seconddash + 1, 100);
	if (confirm('Are you sure you want to block ALL current and future articles from ' + theuserid + '?') == true)
	{
		var adSidebar = document.getElementById("enclosure" + thepageid);
		if (adSidebar) {                        
			adSidebar.parentNode.removeChild(adSidebar);
		}
		//save it into your block list.
		GM_setValue(thediggid, "BLOCK");
		GM_setValue("USER_" + theuserid, "BLOCK");
		window.location.reload()
	}
}

function showblockeditem(blockeditem, blockeditemtitle)
{
	contentsuser = document.getElementById("sidebar");
	if (contentsuser) {
		t1 = document.createTextNode(blockeditem);
		blBR = document.createElement('BR');
		contentsuser.appendChild(t1);
			newElementA = document.createElement('a');
			newElementA.setAttribute('id', 'unblock' + blockeditem);
			newElementA.setAttribute('href', 'javascript://' + blockeditem);
			newElementA.setAttribute('title', blockeditemtitle);
			newElementA.className='tool';
			var linkTextA=document.createTextNode('unblock');
			newElementA.appendChild(linkTextA);
		contentsuser.appendChild(newElementA);
		contentsuser.appendChild(blBR);

		var elmLink = document.getElementById('unblock' + blockeditem);
		elmLink.addEventListener("click", unblockitem, true);

	}
}

function unblockitem()
{
	thehref = this.getAttribute('href');
	secondslash = thehref.indexOf("/") + 2;
	thediggid = thehref.substr(secondslash, 6);
	GM_setValue(thediggid, "NO");
	window.location.reload()
}