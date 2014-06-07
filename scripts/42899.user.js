// ==UserScript==
// @name           Acgun
// @namespace      http://www.acfun.cn
// @include        http://222.243.146.200/*
// ==/UserScript==

(function(){
function date_string()
{
	function z(i){return (i<10)?('0'+i):Number(i).toString();}
	var d = new Date();
	return d.getFullYear()+"-"+z(d.getMonth()+1)+"-"+z(d.getDate()+1)+" "+z(12)+":"+z(34)+":"+z(56);
}
function make_post_string(obj)
{
	var k,v;
	var arr = [];
	function e(s){return encodeURI(s).replace(/\+/g,"%2B").replace(/\@/g,"%40")}
	for (k in obj)
	{
		v = obj[k];
		arr.push(e(k)+"="+e(v));
	}
	return arr.join("&");
}
function make_ui(fl,obj)
{
	var div = document.createElement("div");
	function mh(k,v){return "<input id='"+k+"' type='hidden' value='"+v+"'/>"}
	var k;
	var ss="";
	for (k in obj){ss+=mh(k,obj[k])}
	ndate=date_string();
	div.innerHTML = ss+"mode:"+
					"<select id='_mode'>"+
					"<option value='1'>1</option>"+
					"<option value='2'>2</option>"+
					"<option value='3'>3</option>"+
					"<option value='4'>4</option>"+
					"<option value='5'>5</option>"+
					"</select> "+
					"time:<input id='_playTime' type='text' value='1' size='5'/> "+
					"fontsize:<input id='_fontsize' type='text' size='5' value='20'/> "+
					"color:<input id='_color' type='text' value='16777215'/> "+
					"date:<input id='_date' type='text' value='"+ndate+"'/>"+
					//"<script src='http://www.mattkruse.com/javascript/colorpicker/combined-compact/ColorPicker2.js' type='javascript'></script>"+
					"<button id='_colorpicker' onclick='if (!window.cp){cp = new ColorPicker();}cp.select(document.getElementById(\"_color\"),\"_colorpicker\")'>选颜色</button><br/>"+
					"message: <button id='_post'>发表</button><br/>"+
					"<textarea id='_message' style='width:539px;height:386px;font-size:20px;font-family:黑体;line-height:20px;font-weight:bold;'></textarea>"+
					'<DIV ID=\"colorPickerDiv\" STYLE=\"position:absolute;visibility:hidden;\"> </DIV>';
	div.id = '_poster';
	div.style.display='none';
	fl.parentNode.appendChild(div);
	//add script
	var sc = document.createElement('script');
	sc.type = 'text/javascript';
	sc.src='http://www.mattkruse.com/javascript/colorpicker/combined-compact/ColorPicker2.js';
	document.getElementsByTagName('head')[0].appendChild(sc);
	
	document.body.addEventListener('dblclick',function(){
		var p = document.getElementById('_poster');
		if (p.style.display == 'none')
		{
			p.style.display='';
		}
		else
		{
			p.style.display ='none';
		}
	},false);
}
function postit()
{

	function $v(id){return document.getElementById(id).value;}
	var obj = {};
	obj.playerID = $v('_playerID');
	obj.mode = $v('_mode');
	obj.message = $v('_message');
	obj.playTime = $v('_playTime');
	//obj.date = date_string();
	obj.date=$v('_date');
	obj.fontsize = $v('_fontsize');
	obj.color = $v('_color');

	//parse time
	var temp = obj.playTime.split(':');
/*	if (temp.length == 2)
	{
		var a = new Number(temp[0]);
		var b = new Number(temp[1]);
		var c = a*60+b;
		if (isNaN(c))
		{
			unsafeWindow.alert('时间非法');
			return;
		}
		obj.playTime = c;
	}
	else
	{
		obj.playTime = new Number(obj.playTime);
		if (isNaN(obj.playTime))
		{
			unsafeWindow.alert('时间非法');
			return;
		}
	}
	*/
	//parse color
	if (obj.color[0]=='#')
	{
		var r = new Number('0x'+obj.color.slice(1,3));
		var g = new Number('0x'+obj.color.slice(3,5));
		var b = new Number('0x'+ obj.color.slice(5,7));
		if (isNaN(r+g+b)){
			unsafeWindow.alert("颜色非法");
			return;
		}
		obj.color = (r<<16) + (g<<8) + b;
	}
	else
	{
		obj.color = new Number(obj.color);
		if (isNaN(obj.color)){
			unsafeWindow.alert("颜色非法");
			return;
		}
	}
	var s = make_post_string(obj);
	//alert(s);
	function onload(response)
	{
		if (response.status == 200)
		{
			alert("发布成功");
		}
		else
			alert("status="+response.stauts+"\n"+response.responseText);
	}
	function onerror(e)
	{
		alert('error');
		alert(e.status);
	}
	GM_xmlhttpRequest({
		method:'POST',
		url:$v('_url'),
		headers:{
			Referer:document.location.href,
			Cookie:document.cookie,
			'Content-Type': 'application/x-www-form-urlencoded'},
		data:s,
		onload:onload,
		onerror:onerror
	});
}
var alert = unsafeWindow.alert;
if (document.embeds.length != 1) return;
var fl = document.embeds[0];
var m = /\/([^\\\/]+)\/([^\.\\\/]+)\.swf\?id=([0-9]+)/.exec(fl.src);
if (m[1] != 'newflvplayer' || (m[2] != 'player' && m[2] != 'player1')) return;
var playerId = m[3];
make_ui(fl,{_playerID:playerId,_url:'http://222.243.146.200/newflvplayer/acaccept.aspx'});
document.getElementById("_post").addEventListener('click',postit,false);
document.getElementById("_fontsize").addEventListener('change',function(){
	var m=document.getElementById('_message');
	m.style.fontSize=this.value+'px';
	m.style.lineHeight=this.value+'px';
},false);
})();