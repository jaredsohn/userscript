// ==UserScript==
// @name           osu forum emotion bar
// @author         meramipop
// @namespace      http://userscripts.org/scripts/show/184687
// @description    Add some emotion bars to osu forums.|在osu官网论坛的发帖页面加上表情栏。
// @icon           http://osu.ppy.sh/favicon.ico
// @include        http://osu.ppy.sh/forum/posting.php?*
// @include        https://osu.ppy.sh/forum/posting.php?*
// @downloadURL    https://userscripts.org/scripts/source/184687.user.js
// @grant          none
// @version        1.0.2
// ==/UserScript==

function SL_024()
{
	this.BaseElement = null;
	this.TextElement = null;
	this.sizeX = 500;
	this.sizeY = 50;
	this.offsetX = 10;
	this.offsetY = 5;
	this.offsetX2 = 10;
	this.offsetY2 = 10;
	this.vars = {
		"itemWidth" : 70,
		"itemHeight" : 25,
		"emoPerLine" : 10,
		"emoPadding" : 1,
		"unknown1" : 50922
	};

	/* prev: preview img, using vertical bgPos image; empty = use image files themselves 
		 size: preview size of each emotion image
		 emoL: emotions in a line, defaults to vars.emoPerLine
		 emoY: minimal lines of selection area, defaults to 6 */

	this.emotionGroups = [{
		"name" : "气泡熊",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/qpx.gif",
		"size" : 35,
		"pics" : [] // seed
		}, {
		"name" : "泡泡",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/fFace.png",
		"size" : 30,
		"pics" : []
		}, {
		"name" : "绿豆蛙",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/wFace.png",
		"size" : 40,
		"pics" : [] // seed
		}, {
		"name" : "又长一岁",
		"prev" : "",
		"emoL" : 8,
		"emoY" : 4,
		"size" : 50,
		"pics" : [] // seed
		}, {
		"name" : "兔斯基",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/tFace.gif",
		"size" : 35,
		"pics" : [] // seed
		}, {
		"name" : "阿狸",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/ali.gif",
		"size" : 42,
		"pics" : [] // seed
		}, {
		"name" : "暴漫静态",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/bDong.png",
		"size" : 35,
		"pics" : [] // seed
		}, {
		"name" : "暴漫动态",
		"prev" : "http://static.tieba.baidu.com/tb/editor/images/default/baodong_d.gif",
		"size" : 35,
		"pics" : [] // seed
		}];
	this.makeItemLink = function()
	{
		var o = document.createElement("a");
		o.href = "javascript:void(" + Math.floor(Math.random() * this.vars.unknown1) + ");"
		o.target = "_self";
		o.style.fontSize = "14px";
		o.style.fontWeight = "normal";
		o.style.border = "solid 1px #cccccc";
		o.style.color = "#129EFF";
		o.style.fontFamily = "Verdana";
		o.style.position = "absolute";
		o.style.display = "block";
		o.style.cursor = "pointer";
		o.style.textDecoration = "underline";
		o.style.textAlign = "center";
		o.style.verticalAlign = "middle";
		o.style.width = this.vars.itemWidth - 5 + "px";
		o.style.height = this.vars.itemHeight + "px";
		o.style.lineHeight = this.vars.itemHeight + "px";
		o.style.overflow = "hidden";
		return o;
	};
	this.makeEmotionBar = function()
	{
		var baseBar = document.createElement("div");
		baseBar.style.position = "relative";
		baseBar.style.left = this.offsetX + "px";
		baseBar.style.top = this.offsetY + "px";
		baseBar.style.border = "none";
		baseBar.style.background = "rgb(240,236,250)";
		baseBar.style.width = (this.emotionGroups.length * this.vars.itemWidth + 4) + "px";
		baseBar.style.height = (this.vars.itemHeight + 4) + "px";
		for(var i=0;i<this.emotionGroups.length;i++)
		{
			var a = this.makeItemLink();
			a.innerHTML = this.emotionGroups[i].name;
			a.dataValue_024_1 = i;
			a.style.top = 2 + "px";
			a.style.left = (2 + i * this.vars.itemWidth) + "px";
			a.onclick = this.click;
			baseBar.appendChild(a);
		}
		this.BaseElement.appendChild(baseBar);
	};
	this.makeEmoDiv = function()
	{
		var o = document.createElement("div");
		o.style.position = "absolute";
		o.style.display = "block";
		o.style.cursor = "pointer";
		o.style.textAlign = "center";
		o.style.verticalAlign = "middle";
		o.style.border = "solid 1px #cccccc";
		o.style.overflow = "hidden";
		return o;
	};
	this.makeEmotionArea = function(c)
	{
		var ec = this.emotionGroups[c];
		var epl = ec.emoL || this.vars.emoPerLine;
		var ew = ec.size;
		var eh = ec.size;
		var lmx = ec.emoY || 6;
		var epp = this.vars.emoPadding;
		var baseArea = document.createElement("div");
		baseArea.id = "SL_024_AR" + c;
		baseArea.style.display = "block";
		baseArea.style.position = "relative";
		baseArea.style.left = this.offsetX2 + "px";
		baseArea.style.top = this.offsetY2 + "px";
		baseArea.style.border = "solid 1px #cccccc";
		baseArea.style.background = "rgb(240,236,250)";
		baseArea.style.width = ((ew + 2 + epp) * epl - epp) + 2 + "px";
		baseArea.style.height = ((eh + 2 + epp) * Math.max(lmx,Math.ceil(ec.pics.length / epl)) - epp) + 2 + "px";
		baseArea.style.padding = "0px";
		for(var i=0;i<ec.pics.length;i++)
		{
			var x = i % epl;
			var y = (i - i % epl) / epl;
			var d = this.makeEmoDiv();
			if(ec.prev)
			{
				d.style.backgroundColor = "white";
				d.style.backgroundImage = "url('" + ec.prev + "')";
				d.style.backgroundPosition = "0px " + (-ec.size * i) + "px";
			}
			else
			{
				d.style.backgroundColor = "white";
				d.style.backgroundImage = "url('" + ec.pics[i] + "')";
			}
			d.style.width = ew + "px";
			d.style.height = eh + "px";
			d.style.left = x * (ew + 2 + epp) + 1 + "px";
			d.style.top = y * (eh + 2 + epp) + 1 + "px";
			d.dataValue_024_2 = c + "," + i;
			d.dataValue_024_3 = ec.pics[i];
			d.onclick = this.clickEmo;
			baseArea.appendChild(d);
		}
		this.BaseElement.appendChild(baseArea);
	};
	this.click = function(evt)
	{
		evt = evt || window.event;
		var elem = evt.srcElement || evt.target;
		var th = window.SL_024 || document.getElementById("SL_024_d").th;
		var c = parseInt(elem.dataValue_024_1);
		if(document.getElementById("SL_024_AR" + c) && document.getElementById("SL_024_AR" + c).style.display == "block")
		{
			document.getElementById("SL_024_AR" + c).style.display = "none";
			return;
		}
		for(var i=0;i<th.emotionGroups.length;i++)
		{
			if(document.getElementById("SL_024_AR" + i))
			{
				document.getElementById("SL_024_AR" + i).style.display = "none";
			}
		}
		if(document.getElementById("SL_024_AR" + c) == null)
		{
			th.makeEmotionArea(c);
		}
		else
		{
			document.getElementById("SL_024_AR" + c).style.display = "block";
		}
	};
	this.clickEmo = function(evt)
	{
		evt = evt || window.event;
		var elem = evt.srcElement || evt.target;
		var th = window.SL_024 || document.getElementById("SL_024_d").th;
		if(typeof insert_text == "function")
		{
			insert_text("[img]" + elem.dataValue_024_3 + "[/img]");
		}
		else
		{
			th.TextElement.value += "[img]" + elem.dataValue_024_3 + "[/img]";
		}
		var c = elem.dataValue_024_2.split(",")[0];
		if(document.getElementById("SL_024_AR" + c))
		{
			document.getElementById("SL_024_AR" + c).style.display = "none";
		}
	};
	this.seed = function()
	{
		var elem = document.createElement("div");
		elem.id = "SL_024_d";
		elem.th = this;
		elem.style.width = this.sizeX + "px";
		elem.style.height = this.sizeY + "px";
		elem.style.background = "transparent";
		document.getElementsByClassName("centrep")[0].appendChild(elem);
		this.BaseElement = elem;
		this.TextElement = document.getElementById("post_field");
		var bbBear = ["82","uh","uE","uW","9j","ag","az","aU","bm","bF","bW","cl","cC","cY","dc","dp","dF","dT",
				"eV","fd","fv","fS","gd","gl","gD","gT","hj","hz","hN","i3","ip","iS","jd","jr","jM","k5","kw","kV",
				"ls","lI","m3","mD","mQ","n3","nf","ns","nW","ob","ou","oG","p0","pK","qg","qX","rd","ry","rS","rY",
				"s8","st","sO","tg","tw"];
		for(var i=1;i<=62;i++) // bubble bear
		{
			this.emotionGroups[0].pics.push("http://puu.sh/5uu" + bbBear[i] + ".gif");
		}
		for(var i=1;i<=50;i++) // popo
		{
			this.emotionGroups[1].pics.push("http://static.tieba.baidu.com/tb/editor/images/face/i_f" + i + ".png");
		}
		for(var i=1;i<=53;i++) // frog leon
		{
			this.emotionGroups[2].pics.push("http://static.tieba.baidu.com/tb/editor/images/ldw/w_00" + (i<10?"0"+i:i) + ".gif");
		}
		for(var i=1;i<=14;i++) // grow a year
		{
			this.emotionGroups[3].pics.push("http://static.tieba.baidu.com/tb/editor/images/jd/sn_00" + (i<10?"0"+i:i) + ".gif");
		}
		for(var i=1;i<=40;i++) // tusky
		{
			this.emotionGroups[4].pics.push("http://static.tieba.baidu.com/tb/editor/images/tsj/t_00" + (i<10?"0"+i:i) + ".gif");
		}
		for(var i=1;i<=70;i++) // ali
		{
			this.emotionGroups[5].pics.push("http://static.tieba.baidu.com/tb/editor/images/ali/ali_0" + (i<10?"0"+i:i) + ".gif");
		}
		for(var i=1;i<=56;i++) // ali
		{
			this.emotionGroups[6].pics.push("http://static.tieba.baidu.com/tb/editor/images/baodong/b_00" + (i<10?"0"+i:i) + ".gif");
		}
		for(var i=1;i<=32;i++) // ali
		{
			this.emotionGroups[7].pics.push("http://static.tieba.baidu.com/tb/editor/images/baodong_d/bd_00" + (i<10?"0"+i:i) + ".gif");
		}
		this.makeEmotionBar();
	};
	this.seed();
}
SL_024.wel = function()
{
	if(document.location.href.toString().toLowerCase().indexOf("forum/posting.php") != -1)
	{
		var wp = new SL_024();
	}
}
SL_024.wel();