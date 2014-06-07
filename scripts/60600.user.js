// ==UserScript==
// @name           SoPPS for Firefox
// @namespace      liu.wanfang@gmail.com
// @description    SoPps for firefox in the totem-pps V1.0
// @include        http://so.pps.tv/*
// ==/UserScript==

function GmOnClick(evt)
{
	if(evt.target.value == "影院模式")
	{
		evt.target.value = "恢复"
		
		var d = document.getElementsByTagName('div');
		for(i=0;i<d.length;i++)
		{
			if( d[i].className == "addtional" || d[i].className == "xad" )
			{
				d[i].style.display = "none";
			}
		}
		
		document.getElementById('GmShowPlay').style.width = '968px';
		
		document.getElementById('flash').style.width = '973px';
	}
	else
	{
		evt.target.value = "影院模式"
		
		var d = document.getElementsByTagName('div');
		for(i=0;i<d.length;i++)
		{
			if( d[i].className == "addtional" || d[i].className == "xad" )
			{
				d[i].style.display = "";
			}
		}
				
		document.getElementById('GmShowPlay').style.width = '500px';

		document.getElementById('flash').style.width = '505px';
	}
}

var a = document.getElementsByTagName('a');
var i,pps;

for(i=0;i<a.length;i++)
{
	if( a[i].href == window.location.href )
	{
		pps = a[i].hreflang.match(/pps:\/\/.*?rmvb|pps:\/\/.*?wmv/);
	}
}
var o = document.getElementById('flash');
var s = "<object id='GmShowPlay' data='"+pps+"' type='application/x-mplayer2' width='500' height='536' scr='"+pps+"' ShowControls='true' autostart='true' ShowTracker='true' style='z-index:1002;'><param name='playcount' value='infinite'></object>";
s += "<input Id='GmShowBig' type='button' value='影院模式' style='height:35px;width:65px;background:#444;-moz-border-radius:10px;color:#FFFFFF;border:1px outset #444;margin:10px;' />";
if(document.getElementById('pre-btn'))
	s += "<a style='height:55px;width:75px;background:#444;-moz-border-radius:10px;color:#FFFFFF;border:1px outset #444;margin:10px;padding:10px;' href='"+document.getElementById('pre-btn').href+"' >上一个</a>";
if(document.getElementById('next-btn'))
	s += "<a style='height:55px;width:75px;background:#444;-moz-border-radius:10px;color:#FFFFFF;border:1px outset #444;margin:10px;padding:10px;' href='"+document.getElementById('next-btn').href+"' >下一个</a>";
o.innerHTML = s;

document.getElementById('GmShowBig').addEventListener("click",GmOnClick,false);

setTimeout("clearInterval(_inter);",1200);