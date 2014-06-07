// ==UserScript==
// @name           SS2. LightWalk
// @namespace      wootpk3r/dkwizard
// @include        http://www.sigmastorm2.com/index.php?cmd=world*
// @include        http://www.sigmastorm2.com/index.php?cmd=combat*
// @include        http://sigmastorm2.com/index.php?cmd=world*
// @include        http://sigmastorm2.com/index.php?cmd=combat*
// ==/UserScript==

/*
FS. LightWalk is made by wootpk3r (FS).
SS2. Lightwalk is ported and stripped by dkwizard (FS, SS2) from FS. LightWalk.

TERMS OF SERVICE
	- I am in no way affliated to Hunted Cow Studios, any issues with this script should be sent to me (dkwizard)
	- Any modification done to this script without the author's consent and approval should not be distributed and kept only for yourself.
	- You may not sell or trade this script commercially, It has been distributed free and shall remain free.
*/

/*
	[ REFERENCE ]

	N	2
	S	3
	E	1
	W	0
	NE	5
	NW	4
	SE	7
	SW	6

*/

// ----------- Modify anything beyond line at your own risk. ----------------

var linkUpdateDelay=10;

var hotKey = ["A","D","W","X","Q","E","Z","C"];

dir = [
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]/td/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td[3]/table/tbody/tr[3]/td/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[4]/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td[4]/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[7]/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td/a",
	"/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td[7]/a"]

function getVal(p,m)
{
	rS=m.split("?");
	n=rS[1].split("&");
	for (i=0;i<n.length;i++)
	{
		o = n[i].split("=");
		if (o[0]==p)
		{
			return o[1];
		}
	}
}

function getNode(path)
{
	var rs = document.evaluate(path,document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var node = rs.snapshotItem(0);
	if(node!=null)
	{
		return node;
	}
}

function move(w,href)
{
	x=parseInt(getVal("x",href));
	y=parseInt(getVal("y",href));
	switch(w)
	{
		case 0:
			x=x-1;
		break;
		case 1:
			x=x+1;
		break;
		case 2:
			y=y-1;
		break;
		case 3:
			y=y+1;
		break;
		case 4:
			y=y-1;
			x=x-1;
		break;
		case 5:
			y=y-1;
			x=x+1;
		break;
		case 6:
			y=y+1;
			x=x-1;
		break;
		case 7:
			y=y+1;
			x=x+1;
		break;
	}
	a=getNode(dir[w]);
	setTimeout(function(){a.href=newURL(x,y)},linkUpdateDelay);
	updateAllLinks(w);
}

function updateAllLinks(e)
{
	for(z=0;z<=7;z++)
	{
		if(z!=e)
		{
			a2=getNode(dir[z]);
			x2=parseInt(getVal("x",a2.href));
			y2=parseInt(getVal("y",a2.href));
			switch(e)
			{
				case 0:
					x2=x2-1;
				break;
				case 1:
					x2=x2+1;
				break;
				case 2:
					y2=y2-1;
				break;
				case 3:
					y2=y2+1;
				break;
				case 4:
					y2=y2-1;
					x2=x2-1;
				break;
				case 5:
					y2=y2-1;
					x2=x2+1;
				break;
				case 6:
					y2=y2+1;
					x2=x2-1;
				break;
				case 7:
					y2=y2+1;
					x2=x2+1;
				break;
			}
			a2.href=newURL(x2,y2);
		}
	}
}

function newURL(x,y)
{
	return "http://www.sigmastorm2.com/index.php?cmd=world&subcmd=move&x="+x+"&y="+y;
}

function shortcutKey(e)
{
	if(document.activeElement.id!="guildChatRHSInput")
	{
		var character = String.fromCharCode(e.which);
		for(i=0;i<=7;i++)
		{
			if(character==hotKey[i])
			{
				window.stop();
				window.location.href=getNode(dir[i]).href;
				move(i,getNode(dir[i]).href);
				break;
			}
		}
	}
}

if(getVal("cmd",window.location.href)=="world" || getVal("cmd",window.location.href)=="combat")
{
	if(getVal("subcmd",window.location.href)=="map")
	{
		a=getNode("/html/body/table");
		a.cellSpacing="1";
	}
	else
	{
		document.addEventListener('keypress',shortcutKey,false);
	}
}