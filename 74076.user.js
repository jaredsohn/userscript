// ==UserScript==
// @name           filebox.ro Cinema Mode
// @namespace      Created by GExGE (http://www.gexge.ro)
// @description    Cinema mode for filebox.ro videos
// @include        http://*filebox.ro/video/play_video.php?*
// ==/UserScript==

var e={};
var v=false;
var d=document.getElementById('player');
var h="<div style='position:relative;min-height:100%;width:100%;top:0;left:0;z-index:3;'><div id='cinema_o' style='display:none;position:absolute;background-color:rgba(0,0,0,0.95);height:100%;width:100%;top:0;left:0;z-index:3;'></div>";
var sh="<span id='cinema_l' class='util-item' style='top:0;right:0;padding:5px;margin:5px;margin-top:50px;position:absolute;background-color:#000000;color:#FFFFFF; z-index:4;'><a id='cinema_a' href='#' style='color:#FFFFFF'>Cinema Toggle</a></span>";
var db=document.body;
var lc=document.getElementById('innerwrapper');
db.style.height="100%";
lc.innerHTML=sh+lc.innerHTML;
db.innerHTML=h+db.innerHTML+'</div>';
var a=document.getElementById('cinema_a');
var s=document.getElementById('cinema_l');
var o=document.getElementById('cinema_o');

document.getElementById('langbox').style.zIndex = 2;
document.getElementById('player').style.zIndex = 450;
document.getElementById('player').style.position = "relative";

e.fo=function(selector, time, destroy)
{
	var object = document.getElementById(selector);
	if (e.f_out == undefined)
	{
		e.f_out = false;
	}
	if (object.style.opacity == '' || object.style.opacity == undefined)
	{
		object.style.opacity = parseInt(1);
	}
	if (e.f_out === false)
	{
		var changes = Math.ceil(time / 50);
		e.fo_change = object.style.opacity / changes;
		e.fo_opacity = object.style.opacity;
		e.f_out = true;
	}
	e.fo_opacity = e.fo_opacity - e.fo_change;
	object.style.opacity = e.fo_opacity;
	time = time - 50;
	if (time > 0)
	{
		setTimeout(e.fo, 50, selector, time, destroy);
	}
	else
	{
		object.style.opacity = 0;
		if (destroy === true)
		{
			object.parentNode.removeChild(object);
		}
		else
		{
			object.style.display = 'none';
		}
		e.f_out = false;
	}
	return true;
}
e.fi=function(selector, time)
{
	var object = document.getElementById(selector);
	if (e.f_in == undefined)
	{
		e.f_in = false;
	}
	if (e.f_in === false)
	{
		object.style.opacity = parseInt(0);
		object.style.display = '';
		var changes = Math.ceil(time / 50);
		e.fi_change = 1/changes;
		e.fi_opacity = parseInt(object.style.opacity);
		e.f_in = true;
	}
	e.fi_opacity = e.fi_opacity + e.fi_change;
	object.style.opacity = e.fi_opacity;
	time = time - 50;
	if (time > 0)
	{
		setTimeout(e.fi, 50, selector, time);
	}
	else
	{
		object.style.opacity = 1;
		e.f_in = false;
	}
	return true;
}

function toggle()
{
	var od=document.getElementById('cinema_o');
	if (v===false)
	{
		o.style.backgroundColor="rgba(0,0,0,0.95)";
		e.fi('cinema_o',1000);
		v=2;
		return;
	}
	else if(v==2)
	{
		e.fo('cinema_o',1000);
		v=false;
		return;
	}
	return;
}

function init()
{
	a.addEventListener('click',function(){toggle();return;},true);
	o.addEventListener('click',function(){if(!v===false){toggle();};return;},true);
	return;
}
init();