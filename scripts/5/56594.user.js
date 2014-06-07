// ==UserScript==
// @name          community.wizards.com Tag Parser
// @description   Parses tags on community.wizards.com
// @include        http://community.wizards.com/go/thread/view/*
// ==/UserScript==

var sblockOpen = '[sblock' ;
var sblockClosed = '[/sblock]';
var cnt = 0;

var page = document.body.innerHTML;

while((page.toLowerCase()).indexOf(sblockOpen) >= 0)
{
	var tagToOpen = "<a href='#' style='text-decoration:none' onmouseup=\"var x=document.getElementById('spoiler_" + cnt + "'); x.style.display == 'none' ? x.style.display='' : x.style.display='none'; x.style.display == 'none' ? this.innerHTML = '<button>sblock</button>' : this.innerHTML = '<button>sblock</button>';\"><button>sblock</button></a><div style='text-align:left;padding-left:30px;padding-right:30px'><div id='spoiler_" + cnt + "' style='display:none;border:1px solid #000000;background-color:#e8e8e8;padding:5px'>"
	var i = (page.toLowerCase()).indexOf(sblockOpen);
	var j = sblockOpen.length;
	page = page.substr(0,i) + tagToOpen + page.substr(i+j);
	cnt += 1;
}

cnt = 0;

while((page.toLowerCase()).indexOf(sblockClosed) >= 0)
{
	var i = (page.toLowerCase()).indexOf(sblockClosed);
	var j = sblockClosed.length;
	page = page.substr(0,i) + "</div></div>" + page.substr(i+j);
	cnt += 1;
}

document.body.innerHTML = page;


