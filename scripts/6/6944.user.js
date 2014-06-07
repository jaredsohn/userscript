// ==UserScript==
// @name           Blue Dot Video Player
// @namespace      http://bluedot.us
// @description    Add video player to all video dots on You Tube
// @include        http://bluedot.us/*
// ==/UserScript==

stYouTubePat = '<object class="VPlayer"><param name="movie" value="http://www.youtube.com/v/VIDEO"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/VIDEO" type="application/x-shockwave-flash" wmode="transparent"></embed></object>';

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('ul.dotList div.note .VPlayer { width:240px; float:left; margin-left: 0px; margin-right: 12px;}');

String.prototype.StReplace = function(stPat, stRep)
{

	var st = "";

	var ich = 0;
	var ichFind = this.indexOf(stPat, 0);

	while (ichFind >= 0)
		{
		st += this.substring(ich, ichFind) + stRep;
		ich = ichFind + stPat.length;
		ichFind = this.indexOf(stPat, ich);
		}
	st += this.substring(ich);

	return st;
}

function ChildTagClass(node, tag, class)
{
	var i;
	var nodeChildren;

	if (!node)
		return null;

	nodeChildren = node.getElementsByTagName(tag);
	if (nodeChildren.length == 0)
		return null;
	for (i = 0; i < nodeChildren.length; i++)
		{
		var nodeT = nodeChildren[i];
		if (class == undefined || nodeT.className == class)
			return nodeT;
		}
	return null;
}

function Dot(li)
{
	var i;

	this.li = li;
	this.divTitle = ChildTagClass(li, "DIV", "t");
	this.aTitle = ChildTagClass(this.divTitle, "A", "d");
	this.href = this.aTitle.href;
	this.divNote = ChildTagClass(li, "DIV", "note");
	this.aThumb = ChildTagClass(this.divNote, "A");
	this.imgThumb = ChildTagClass(this.aThumb, "IMG");

	if ((this.href.indexOf("http://youtube.com/") == 0 ||
		this.href.indexOf("http://www.youtube.com/") == 0) &&
		this.href.indexOf("v=") != -1)
		{
		var ichVideo = this.href.indexOf("v=") + 2;
		var stVideo = this.href.substr(ichVideo, 11);
		this.divPlayer = document.createElement("div");
		this.divPlayer.class = "VPlayer";
		this.divPlayer.innerHTML = stYouTubePat.StReplace("VIDEO", stVideo);
		}
}

var divDots;
var liDotList;

divDots = document.getElementById("dots");
liDotList = divDots.getElementsByTagName("LI");
for (i = 0; i < liDotList.length; i++)
	{
	dot = new Dot(liDotList[i]);
	if (dot.divPlayer)
		{
		if (dot.aThumb)
			{
			dot.imgThumb.style.display = "none";
			}
		dot.divNote.insertBefore(dot.divPlayer, dot.divNote.childNodes[0]);
		}
	}
