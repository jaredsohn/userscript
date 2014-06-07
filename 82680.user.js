// ==UserScript==
// @name           FS. LightWalk
// @namespace      wootpk3r
// @include        http://fallensword.com/index.php?cmd=world*
// @include        http://www.fallensword.com/index.php?cmd=world*
// @include        http://www.fallensword.com/index.php?cmd=settings*
// @include        http://fallensword.com/index.php?cmd=settings*
// @include        http://www.fallensword.com/index.php?cmd=combat*
// @include        http://fallensword.com/index.php?cmd=combat*
// ==/UserScript==

/*
TERMS OF SERVICE
	- I am in no way affliated to Hunted Cow Studios, any issues with this script should be sent to me.
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
var nU=0;
var hotKey = new Array(7);
	hotKey[0]=GM_getValue("FSLW_W","A");
	hotKey[1]=GM_getValue("FSLW_E","D");
	hotKey[2]=GM_getValue("FSLW_N","W");
	hotKey[3]=GM_getValue("FSLW_S","X");
	hotKey[4]=GM_getValue("FSLW_NW","Q");
	hotKey[5]=GM_getValue("FSLW_NE","E");
	hotKey[6]=GM_getValue("FSLW_SW","Z");
	hotKey[7]=GM_getValue("FSLW_SE","C");

var dir= new Array(7);
	dir[0]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[2]/td/table/tbody/tr[3]/td/a";
	dir[1]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[2]/td[3]/table/tbody/tr[3]/td/a";
	dir[2]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td[4]/a";
	dir[3]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[3]/td[4]/a";
	dir[4]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td/a";
	dir[5]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr/td[7]/a";
	dir[6]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[3]/td/a";
	dir[7]="//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[3]/td[7]/a";

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

function countMoves()
{
	nU++;
	c = getNode("//div[@id='FSLW_Panel']");
	c.innerHTML="<span style='color:#2A7FFF;font-weight:bold'>Fs. LightWalk</span>[ "+nU+" ]";
}

function move(w,href)
{
	countMoves();
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
	return "http://www.fallensword.com/index.php?cmd=world&subcmd=move&x="+x+"&y="+y;
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
			f=false;
			b = getNode(dir[0]);
				b.addEventListener("click",function(){window.stop();move(0,this.href);},f);
			b = getNode(dir[1]);
				b.addEventListener("click",function(){window.stop();move(1,this.href);},f);
			b = getNode(dir[2]);
				b.addEventListener("click",function(){window.stop();move(2,this.href);},f);  
			b = getNode(dir[3]);
				b.addEventListener("click",function(){window.stop();move(3,this.href);},f);  
			b = getNode(dir[4]);
				b.addEventListener("click",function(){window.stop();move(4,this.href);},f);  
			b = getNode(dir[5]);
				b.addEventListener("click",function(){window.stop();move(5,this.href);},f);  
			b = getNode(dir[6]);
				b.addEventListener("click",function(){window.stop();move(6,this.href);},f);  
			b = getNode(dir[7]);
				b.addEventListener("click",function(){window.stop();move(7,this.href);},f);
		
			b = getNode("//table/tbody/tr[2]/td[2]/table/tbody/tr[5]/td/table/tbody/tr/td/table/tbody/tr[4]/td");
			b.innerHTML="<div style='font-size:12px;text-align:center;' id='FSLW_Panel'><span style='color:#2A7FFF;font-weight:bold'>Fs. LightWalk</span> [ <a style='text-decoration:none' href='#' onmouseover=\"tt_setWidth(225);Tip('<b>FS. LightWalk does not actively reduce lag.</b><br/><br/>It makes it possible for you to move more than one step without having to wait for the page to reload. Keep in mind that if your pageload is already fast, you might not see any difference.');\" style='color:blue;font-weight:bold;'>?</a> ] [ <a style='text-decoration:none' href='http://forum.fallensword.com/phpBB3/viewtopic.php?f=1&t=96370&p=1000799' onmouseover=\"tt_setWidth(225);Tip('Check out the webpage for updates.')\">Webpage</a> ] [ <a style='text-decoration:none' href='http://fallensword.com/index.php?cmd=message&target_player=wootpk3r' onmouseover=\"tt_setWidth(225);Tip('Contact me if you need any help.')\">@</a> ]</div>";	
	}
}
else if (getVal("cmd",window.location.href)=="settings")
{
	tn = getNode("//table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table");
	tBody=tn.getElementsByTagName('tbody')[0];
	nTR=document.createElement('tr');
	nTD=document.createElement('td');
	tn=getNode("/html/body/table/tbody/tr[2]/td[2]/table/tbody/tr[2]/td[2]/table");
	nTD.innerHTML="<br><div style=\"padding:4px;background-color:#4C86FA;border:1px black solid;font-weight:bold\">FS. LightWalk Settings</div>  <table style=\"width: 100%\"><tr><td colspan=\"2\"><br/><b>Shortcut Keys</b><br/><span style='font-size:10px'>Setup your own set of hotkeys used to move around the map, They are case sensitive.</span></td></tr><tr><td style=\"width: 153px\">North</td><td><input style='width:25px' type=\"text\" id=\"FSLW_Nshortcut\" value=\""+hotKey[2]+"\" /></td></tr><tr><td style='width:25px' style=\"width: 153px\">South</td><td><input style='width:25px' type=\"text\" id=\"FSLW_Sshortcut\" value=\""+hotKey[3]+"\" /></td></tr><tr><td style=\"width: 153px\">East</td><td><input style='width:25px' type=\"text\" id=\"FSLW_Eshortcut\" value=\""+hotKey[1]+"\" /></td></tr><tr><td style=\"width: 153px\">West</td><td><input style='width:25px' type=\"text\" id=\"FSLW_Wshortcut\" value=\""+hotKey[0]+"\" /></td></tr><tr><td style=\"width: 153px\">North East</td><td><input style='width:25px' type=\"text\" id=\"FSLW_NEshortcut\" value=\""+hotKey[5]+"\" /></td></tr><tr><td style=\"width: 153px\">North West</td><td><input style='width:25px' type=\"text\" id=\"FSLW_NWshortcut\" value=\""+hotKey[4]+"\" /></td></tr><tr><td style=\"width: 153px\">South East</td><td><input style='width:25px' type=\"text\" id=\"FSLW_SEshortcut\" value=\""+hotKey[7]+"\" /></td></tr><tr><td style=\"width: 153px\">South West</td><td><input style='width:25px' type=\"text\" id=\"FSLW_SWshortcut\" value=\""+hotKey[6]+"\" /></td></tr><tr><td></td><td><input class='custombutton' type='button' id='FSLW_Save' value='Save'/></td></tr></table>";
	nTD.colSpan="3";
	nTR.appendChild (nTD);
	tBody.appendChild(nTR);
	document.getElementById('FSLW_Save').addEventListener('click',function(){
		GM_setValue("FSLW_E",document.getElementById('FSLW_Eshortcut').value);
		GM_setValue("FSLW_N",document.getElementById('FSLW_Nshortcut').value);
		GM_setValue("FSLW_S",document.getElementById('FSLW_Sshortcut').value);
		GM_setValue("FSLW_W",document.getElementById('FSLW_Wshortcut').value);
		GM_setValue("FSLW_NE",document.getElementById('FSLW_NEshortcut').value);
		GM_setValue("FSLW_NW",document.getElementById('FSLW_NWshortcut').value);
		GM_setValue("FSLW_SE",document.getElementById('FSLW_SEshortcut').value);
		GM_setValue("FSLW_SW",document.getElementById('FSLW_SWshortcut').value);
		alert("Settings Saved");
	},false);
}