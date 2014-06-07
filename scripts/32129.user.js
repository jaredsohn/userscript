// JavaScript Document
// ==UserScript==
// @name           Userscripts Pagination
// @namespace      http://www.alushinrio.com/
// @include        http://userscripts.org/scripts/search*
// ==/UserScript==

//Test first to see if there even is pagination needed.
//If a paragraph after the table exists, it's the pagination paragraph
lastptemp = document.evaluate("//div[@id='content']/table/following-sibling::p",
	document,
	null,
	XPathResult.FIRST_ORDERED_NODE_TYPE,
	null);
if(lastp = lastptemp.singleNodeValue)
{
	//Get the window location to get the page number
	loc = new String(document.location);
	tpage = loc.match(/page=(\d+)/);

	if(tpage)
	{
		page = Number(tpage[1]);
	}
	else
	{
		//if the page number wasn't found, we must be on the first page
		//set page to 0 for later;
		page = 0;
	}

	//if page is lower than 2, we're on the first page so Previous should be disabled.
	if(page < 2)
	{
		prevbutton = document.createElement('span');
		prevbutton.setAttribute('class', 'disbabled');
	}
	else
	{
		//replace the old page number with the previous one and create a link.
		prevloc = loc.replace(/page=\d+/, ("page=" + (page-1)));
		prevbutton = document.createElement('a');
		prevbutton.setAttribute('href', prevloc);
	}
	prevbutton.innerHTML = '&laquo; Previous';

	//as long as userscripts doesn't do a redesign, this was the best way to find the list of links at the end.
	divc = document.getElementById('content');

	//we want the last link in the pagination paragraph
	as = lastp.getElementsByTagName('a');
	lasta = as[as.length-1];
	lastn = Number(lasta.innerHTML);
	//the number in the last link is either the second to last page number, in which case we're on the last page and our page number will be larger than that number, or it's the last page, in which case our page number will be less than it.  Really, there's no need to check to see if the page number is equal, since it should never be, but just in case.
	if(page >= lastn)
	{
		nextbutton = document.createElement('span');
		nextbutton.setAttribute('class', 'disbabled');
	}
	else
	{
		//from before, we set the page number to 0 so we could make sure to insert a "page=" query into the URL of the links.
		if(page==0)
		{
			page = 1;
			reg = /\?/;
		}
		else
		{
			reg = /\?page=\d+&/;
		}
		nextloc = loc.replace(reg, ("?page=" + (page+1) + '&'));
		nextbutton = document.createElement('a');
		nextbutton.setAttribute('href', nextloc);
	}
	nextbutton.innerHTML = 'Next &raquo;';

	//chop out that "Pages:" heading, which isn't needed
	lastp.firstChild.nodeValue = lastp.firstChild.nodeValue.replace(/Pages:/i, '');

	//use lastp as a sandbox, because we're just going to move its contents into our new div later.
	lastp.insertBefore(prevbutton, lastp.firstChild);
	lastp.insertBefore(document.createTextNode(" "), prevbutton.nextSibling);
	lastp.insertBefore(nextbutton, null);
	lastp.insertBefore(document.createTextNode(" "), nextbutton);

	//new div so the pagination looks like it does on the scripts pages
	paginatebar = document.createElement('div');
	paginatebar.setAttribute('class', 'pagination');
	paginatebar.innerHTML = lastp.innerHTML;

	//swap out the ugly for the pretty
	divc.replaceChild(paginatebar, lastp);

	//put another one at the top for good measure
	bartop = paginatebar.cloneNode(true);
	//find the first table (which is the list of scripts) and insert the new bar before it
	tables = divc.getElementsByTagName('table');
	firsttable = tables[0];
	divc.insertBefore(bartop, firsttable);
}