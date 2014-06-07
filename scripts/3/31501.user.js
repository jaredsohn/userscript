// ==UserScript==
// @name		Last.fm - Popup Radio Player
// @namespace	http://no.name.space/
// @description	Allows playing of radio stations in a popup window
// @include	http://www.last.fm/*
// ==/UserScript==

// 09-Aug-2008 created gadgetchannel

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

var playerwin;

function ShowMore()
{
	var height = 650;
	if(location.href.indexOf("playlist") != -1)
	{
		height = 700;
	}
	
	self.resizeTo(650,height + 90);
	var MoreOrLessLink = document.getElementById("MoreOrLessLink");
	MoreOrLessLink.href = "javascript:ShowLess();";
	MoreOrLessLink.innerHTML = "<< Less";
	
}

function ShowLess()
{
	var height = 355;
	if(location.href.indexOf("playlist") != -1)
	{
		height = 405;
	}
	self.resizeTo(650,height + 90);
	var MoreOrLessLink = document.getElementById("MoreOrLessLink");
	MoreOrLessLink.href = "javascript:ShowMore();";
	MoreOrLessLink.innerHTML = "More >>";
	
}
function insertAfter(parent, node, referenceNode) {
	parent.insertBefore(node, referenceNode.nextSibling);
}

(function () {
	unsafeWindow.ShowMore = ShowMore;
	unsafeWindow.ShowLess = ShowLess;
	
	openInPopup = function (event)
	  {
	     var href = event.target.getAttribute("hhref");
	     if(href == null)
	     {
	     	href = event.target.parentNode.getAttribute("hhref");
	     }
	     if(href != null)
	     {
	     	var height = 355;
	     	if(href.indexOf("playlist") != -1)
	     	{
	     		height = 405;
	     	}
	     	playerwin = window.open(href + '?popup=1','player','width=650,height=' + height + ',toolbar=no,location=no,directories=no,status=no,menubar=no,resizable=no,scrollbars=no');
	     }
	     return false;
	  }

	if (location.href.match(/\/listen[^\/]*/))
	{
		var Search = location.search;
		if(Search.indexOf("?popup=1") != -1)
		{
			document.body.style.margin = "0px";
			var Header = document.getElementById("header");
			var Footer = document.getElementById("LastFooter");
			var rightColumn = document.getElementById("rightColumn");
			var rightCols = xpath("//div[@class='rightCol']");
			var Shares = xpath("//a[@id='button1']");
			var Player = document.getElementById("player");
			if(Header)
			{
				Header.parentNode.removeChild(Header);
			}
			if(Footer)
			{
				Footer.parentNode.removeChild(Footer);
			}
			if(rightCols.snapshotLength > 0)
			{
				var rightCol = rightCols.snapshotItem(0);
				rightCol.parentNode.removeChild(rightCol);
			}
			if(rightColumn)
			{	rightColumn.parentNode.removeChild(rightColumn);
			}
			if(Shares.snapshotLength > 0)
			{
				
				Shares.snapshotItem(0).parentNode.removeChild(Shares.snapshotItem(0));
			}
			if(Player)
			{
				var MoreOrLessLink = document.createElement("a");
				var contentPane = document.getElementById("contentPane");
				MoreOrLessLink.id = "MoreOrLessLink";
				MoreOrLessLink.href = "javascript:ShowMore();";
				MoreOrLessLink.innerHTML = "More >>";
				Player.parentNode.insertBefore(MoreOrLessLink,contentPane);
				
			}
			window.setInterval(function() {
				var Shoutbox = document.getElementById("shoutboxContainer");
				var Events1 = document.getElementById("events");
				var Events2 = document.getElementById("eventsSource");
				if(Shoutbox)
				{
					Shoutbox.parentNode.removeChild(Shoutbox);
				}
				if(Events1)
				{
					Events1.parentNode.removeChild(Events1);
				}
				if(Events2)
				{
					Events2.parentNode.removeChild(Events2);
				}
			},1000);
		}
	}
	else
	{
		var Links = xpath("//a[contains(@class, 'stationbutton')]");
		for(var I=0;I<Links.snapshotLength;I++)
		{
			var Link = Links.snapshotItem(I);
			var URL = Link.href;
			//Link.setAttribute("hhref",URL);
			//Link.href = "#";
			//Link.addEventListener('click', openInPopup, true);
			var NewLinkSpan = document.createElement("span");
			var NewLink = document.createElement("a");
			if(Link.className.indexOf("stationbuttonInline") == -1)
			{
				NewLinkSpan.innerHTML = "(Play In Popup)";
			}
			else
			{
				Link.setAttribute("style","margin-right:1em;");
				NewLinkSpan.innerHTML = "(Play In Popup)";
			}
			
			NewLinkSpan.setAttribute("class","stationButtonWrapper");
			
			//NewLinkSpan.setAttribute("style","float:right;");
				NewLink.setAttribute("hhref",URL);
			NewLink.href = "#";
			//NewLink.innerHTML = "(popup)";
			NewLink.addEventListener('click', openInPopup, true);
			NewLink.appendChild(NewLinkSpan);
			
			if(Link.className.indexOf("stationbuttonInline") == -1)
			{
				NewLink.setAttribute("class","stationbutton stationbuttonMedium stationbuttonMediumRight");
				if (location.href.match(/\/home/))
				{
					NewLink.setAttribute("style","margin-top:-10px;");
					Link.parentNode.insertBefore(NewLink,Link);					
				}
				else
				{
					Link.setAttribute("style","float:left; margin-right:10em;");
					insertAfter(Link.parentNode,NewLink,Link);
				}
			}
			else
			{
				NewLink.setAttribute("class","stationbutton stationbuttonInline icon");
				insertAfter(Link.parentNode,NewLink,Link);
			}
			
			
			
		}
	}
}) ();