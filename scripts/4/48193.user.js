// ==UserScript==
// @name           rlslog
// @namespace      rlslog
// @include        http://www.rlslog.net/
// @include        http://www.rlslog.net/category/*
// @include        http://www.rlslog.net/?s*
// @include        http://www.rlslog.net/page/*
// ==/UserScript==

var smallWidth = 52;
var largeWidth = 535;
var smallHeight = 52;
var largeHeight = 250;
var currDiv;

function insertBox(divTarget)
{
	var divBox = document.createElement('div');
	divBox.id = 'divBox';
	divBox.style.width = smallWidth + 'px';
	divLink = document.createElement('a');
	divLink.addEventListener('click',getContent, false);
	divLink.href = 'javascript:void(0);';
	divLink.innerHTML = '<b>MS Links</b>';
	divBox.appendChild(divLink);
	divBox.setAttribute('name','empty');
	divBox.title = divTarget.getElementsByTagName('a')[0].href;
	divTarget.getElementsByTagName('div')[1].appendChild(divBox);
}

allDivs = document.evaluate("//div[@class='entry']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    insertBox(thisDiv);
}

function getContent(e)
{
	if (e.target.parentNode.parentNode.id == 'divBox') divBox = e.target.parentNode.parentNode;
	else divBox = e.target;
	GM_log(divBox.id);
	if (divBox.style.height == '')
	{
		height = largeHeight + 'px';
		width = largeWidth + 'px';
		if (divBox.getAttribute('name') == 'empty')
		{
			currDiv = divBox;
			getLinks(divBox);
			divBox.setAttribute('name','filled');
		}
	}
	else {
		height = '';
		width = smallWidth + 'px';
		divBox.scrollTop = 0;
	}
	divBox.style.height = height;
	divBox.style.width = width;
}

function getLinks(div)
{
	var req = new XMLHttpRequest();
	req.open("GET", div.title, true);
	req.onreadystatechange = function (aEvt) {
	  if (req.readyState == 4) {
	     if(req.status == 200)
	      insertLinks(req.responseText);
	     else
	      GM_log("Error loading page\n");
	  }};
	req.send(null);
}

function insertLinks(source)
{
	linksHTML = '<br>';
	regRS = new RegExp(/href="megashare.com"/g);
	source = source.split('div class="commenttext"');
	for (var i=1;i<source.length;i++)
	{
		links = source[i].match(regRS);
		if (links)
		{
			linksHTML += '<b>#' + i + '</b><br>';
			for (var j=0;j<links.length;j++)
			{
				link = links[j].substring(6,(links[j].length - 1));
				linksHTML += '<a href="'+link+'" target="_blank">'+link+'</a><br>';
			}
		linksHTML += '<br>'
		}
	}
	if (linksHTML == '<br>') linksHTML += '<br><br><br><br><center>No MS Links Found</center>';
	currDiv.innerHTML += linksHTML;
	currDiv.addEventListener('click',getContent, false);

}

GM_addStyle('#divBox {height: 23px; overflow-y:scroll;overflow-x:hidden;border: 1px solid #d3d8de;padding:3px;width:'+largeWidth+'px; background-color:#eaedf0;} #divBox *{color:#000;} #divBox a:hover * {text-decoration:underline;}');