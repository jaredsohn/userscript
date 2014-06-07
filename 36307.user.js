// ==UserScript==
// @name           EditTools
// @namespace      liuwanfang86.jimdo.com
// @include        http://*
// ==/UserScript==

if(top != self)
{
	var googlePage;
	//建立工具栏
	var tools = document.createElement("div");
	tools.style.backgroundImage = "url(http://liuwanfang86.jimdo.com/cc_images/thumb_208770807.gif?t=1225424875)";
	tools.style.top = 0;
	tools.style.left = 0;
	tools.style.padding = "5px";
	tools.style.position = "fixed";
	top.document.body.appendChild(tools);
	//建立字体按钮
	var fontname = document.createElement("img");
	fontname.src = "http://liuwanfang86.jimdo.com/cc_images/thumb_208769807.gif?t=1225353145";
	fontname.alt = "字体";
	fontname.addEventListener("click", displayFont, false);
	fontname.style.display = "inline";
	tools.appendChild(fontname);
	//建立字号按钮
	var fontsize = document.createElement("img");
	fontsize.src = "http://liuwanfang86.jimdo.com/cc_images/thumb_208719907.gif?t=1225198779";
	fontsize.alt = "字体大小";
	fontsize.addEventListener("click", displaySize, false);
	fontsize.style.display = "inline";
	tools.appendChild(fontsize);
	//建立表格按钮
	var visualaid = document.createElement("img");
	visualaid.src = "http://liuwanfang86.jimdo.com/cc_images/thumb_208720007.gif?t=1225198780";
	visualaid.alt = "插入表格";
	visualaid.addEventListener("click",displayTable,false);
	visualaid.style.display = "inline";
	tools.appendChild(visualaid);
	//建立图片按钮
	var imagebutton = document.createElement("img");
	imagebutton.src = "http://liuwanfang86.jimdo.com/cc_images/thumb_208720407.gif?t=1225248019";
	imagebutton.alt = "插入图片";
	imagebutton.addEventListener("click",displayImage,false);
	imagebutton.style.display = "inline";
	tools.appendChild(imagebutton);
	//建立关闭按钮
	var closebutton = document.createElement("img");
	closebutton.src = "http://liuwanfang86.jimdo.com/cc_images/thumb_208770707.gif?t=1225417375";
	closebutton.alt = "关闭";
	closebutton.addEventListener("click",CloseTable,false);
	closebutton.style.display = "inline";
	tools.appendChild(closebutton);
	//建立字体选项
	var fontlist = document.createElement("table");
	var fontnamelist = new Array ("removeFormat","宋体","黑体","隶书","幼圆","楷体_GB2312",
				"仿宋_GB2312","新宋体","华文彩云","华文仿宋","华文新魏",
				"文鼎ＰＬ简报宋","文鼎ＰＬ细上海宋","文泉驿正黑 ","Arial","Arial Black",
				"Arial Narrow","Century","Courier New","Georgia","Impact",
				"Lucida Console","monospace","MS Sans Serif",
				"Sans","sans-serif","Sawasdee","serif","Shado","Sharjah",
				"Sindbad","Standard Symbols L",
				"Symbol","System","Tahoma","Tarablus","Tholoth","TlwgMono",
				"Times New Roman","Verdana","Webdings","Wingdings");
	fontlist.style.position = "absolute";
	for(var i=0;i<fontnamelist.length;i++)
	{
		fontlist.insertRow(i);
		var cell = fontlist.rows[i].insertCell(-1);
		cell.innerHTML = fontnamelist[i];
		cell.style.fontFamily = fontnamelist[i];
		cell.addEventListener("click",setFontName,false);
	}
	fontlist.style.display = "none"
	fontlist.style.width = "200px";
	fontlist.style.height = "300px";
	fontlist.style.overflowY = "auto";
	fontlist.style.backgroundImage = "url(http://liuwanfang86.jimdo.com/cc_images/cache_208771007.gif?t=1225426733)";
	tools.appendChild(fontlist);
	//建立字号选项
	var sizelist = document.createElement("table");
	sizelist.style.position = "absolute";
	for(var i=0;i<16;i++)
	{
		sizelist.insertRow(i);
		var cell = sizelist.rows[i].insertCell(-1);
		cell.innerHTML = i+8;
		cell.style.fontSize = (i+8)+"px";
		cell.addEventListener("click",setFontSize,false);
	}
	sizelist.style.display = "none"
	sizelist.style.backgroundImage = "url(http://liuwanfang86.jimdo.com/cc_images/cache_208771007.gif?t=1225426733)";
	tools.appendChild(sizelist);
	//建立表格窗口
	var insertTableDialog = document.createElement("div");
	var insertTable = document.createElement("table");
	insertTableDialog.style.position = "absolute";
	insertTableDialog.style.backgroundImage = "url(http://liuwanfang86.jimdo.com/cc_images/cache_208771007.gif?t=1225426733)";
	insertTableDialog.style.zIndex = "1600";
	for(var i=0;i<4;i++)
	{
		insertTable.insertRow(i);
		for(var j=0;j<4;j++)
		{
			var cell = insertTable.rows[i].insertCell(-1);
			cell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			cell.style.border = "1px Inset #888";
			cell.style.fontSize = "16px";
		}
	}
	insertTableDialog.style.display = "none"
	insertTableDialog.appendChild(insertTable);
	var insertTableText = document.createElement("div");
	insertTableDialog.appendChild(insertTableText);
	tools.appendChild(insertTableDialog);
	//表格窗口的消息监听
	insertTable.addEventListener("mousemove",TableMove,false);
	insertTable.addEventListener("click",TableUp,false);
	//建立图片窗口
	var insertImageDialog = document.createElement("div");
	insertImageDialog.style.position = "absolute";
	insertImageDialog.style.backgroundImage = "url(http://liuwanfang86.jimdo.com/cc_images/cache_208771007.gif?t=1225426733)";
	insertImageDialog.style.display = "none";
	insertImageDialog.style.width = "340px";
	insertImageDialog.style.zIndex = "1600";
	insertImageDialog.style.padding = "10px";
	insertImageDialog.appendChild(document.createTextNode("请输入图片地址或图片相关文字，如输入图片相关文字，程序将通过谷歌搜索图片"));
	var insertImageURL = document.createElement("input");
	insertImageURL.value = "http://";
	//改变文字时触发事件
	insertImageURL.addEventListener("input",urlChange,false);
	var insertImageButton = document.createElement("input");
	insertImageButton.value = "插入";
	insertImageButton.type = "button";
	insertImageButton.addEventListener("click",InsertOrSearch,false);
	insertImageDialog.appendChild(insertImageURL);
	insertImageDialog.appendChild(insertImageButton);
	//插入图片预览
	var insertImageGoogle = document.createElement("div");
	insertImageGoogle.style.height = "300px";
	insertImageGoogle.style.overflowY = "auto";
	insertImageDialog.appendChild(insertImageGoogle);
	tools.appendChild(insertImageDialog);
	var insertImagePer = document.createElement("input");
	insertImagePer.style.display = "none";
	insertImagePer.value = "上一页";
	insertImagePer.type = "button";
	insertImagePer.addEventListener("click",function(event){if(googlePage > 1){googlePage++;StartLoad();}},false);
	insertImageDialog.appendChild(insertImagePer);
	var insertImageNext = document.createElement("input");
	insertImageNext.style.display = "none";
	insertImageNext.value = "下一页";
	insertImageNext.type = "button";
	insertImageNext.addEventListener("click",function(event){googlePage++;StartLoad();},false);
	insertImageDialog.appendChild(insertImageNext);
	tools.className = "tools";
	window.addEventListener("click",HiddenTools,false);
}
function HiddenAll()
{
	fontlist.style.display = "none"
	sizelist.style.display = "none"
	insertTableDialog.style.display = "none"
	insertImageDialog.style.display = "none"
}
//显示字体列表
function displayFont(event)
{
	if(fontlist.style.display == "none")
	{
		HiddenAll();
		fontlist.style.display = "block"
	}
	else
		fontlist.style.display = "none"
	fontlist.style.left=event.target.offsetLeft;
	fontlist.style.top=event.target.offsetTop+26;
}
function displaySize(event)
{
	if(sizelist.style.display == "none")
	{
		HiddenAll();
		sizelist.style.display = "block"
	}
	else
		sizelist.style.display = "none"
	sizelist.style.left=event.target.offsetLeft;
	sizelist.style.top=event.target.offsetTop+26;
}

function displayTable(event)
{
	//显示表格窗口
	if(insertTableDialog.style.display == "none")
	{
		HiddenAll();
		insertTableDialog.style.display = "block"
	}
	else
		insertTableDialog.style.display = "none"
	insertTableDialog.style.left=event.target.offsetLeft;
	insertTableDialog.style.top=event.target.offsetTop+26;
}
function displayImage(event)
{
	//显示图片窗口
	if(insertImageDialog.style.display == "none")
	{
		HiddenAll();
		insertImageDialog.style.display = "block"
	}
	else
		insertImageDialog.style.display = "none"
	insertImageDialog.style.left=event.target.offsetLeft;
	insertImageDialog.style.top=event.target.offsetTop+26;
}
//关闭工具栏
function CloseTable()
{
	tools.parentNode.removeChild(tools);
}
function HiddenTools()
{
	var n = top.document;
	HiddenToolsFun(n,1);
	tools.style.display = "block";
}
function HiddenToolsFun(n,p)
{
	if(n.className == "tools")
		n.style.display = "none";
	if(p>5) return;
	for(var i=0;i<n.childNodes.length;i++)
	{
		HiddenToolsFun(n.childNodes[i],p+1);
	}
}
//设置字体
function setFontName(event)
{
	document.execCommand("FontName",false,event.target.style.fontFamily);
	fontlist.style.display = "none"
}
function setFontSize(event)
{
	window.focus();
	var n = document.createElement("SPAN");
	n.style.fontSize = event.target.style.fontSize;
	document.execCommand("RemoveFormat",false,"");
	window.getSelection().getRangeAt(0).surroundContents(n);
	sizelist.style.display = "none"
}
//在表格上移动
function TableMove(evt)
{
	var elem=evt.target;
	if(elem.nodeName=="TD")
	{
		var x=elem.cellIndex+1;
		var y=elem.parentNode.rowIndex+1;
		var cl = insertTable.rows[0].cells.length
		var rl = insertTable.rows.length
		if(x>=cl)
		{
			for(i=0;i<rl;i++)
			{
				var oneCell=insertTable.rows[i].insertCell(-1);
				oneCell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				oneCell.style.background = "none";
				oneCell.style.border = "1px Inset #888";
				oneCell.style.fontSize = "16px";
			}
			//差点出错
			cl++;
		}
		if(y>=rl)
		{
			var oneCell;
			var oneRow=insertTable.insertRow(-1);
			for(i=0;i<cl;i++)
			{
				oneCell=oneRow.insertCell(-1);
				oneCell.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
				oneCell.style.background = "none";
				oneCell.style.border = "1px Inset #888";
				oneCell.style.fontSize = "16px";
			}
			rl++;
		}
		for(i=0;i<y&&i<rl;i++)
		{
			var oneRow = insertTable.rows[i];
			for(j=0;j<x&&j<cl;j++)
			{
				oneRow.cells[j].style.backgroundColor="#008";
			}
			for(j=x;j<cl;j++)
			{
				oneRow.cells[j].style.background="none";
			}
		}
		for(i=y;i<rl;i++)
		{
			var oneRow = insertTable.rows[i];
			for(j=0;j<cl;j++)
			{
				oneRow.cells[j].style.background="none";
			}
		}
		insertTableText.innerHTML=y+"×"+x;
	}
}
//在表格窗口上单击鼠标
function TableUp(evt)
{
	var elem=evt.target;
	if(elem.nodeName=="TD")
	{
		var cell=elem.cellIndex+1;
		var row=elem.parentNode.rowIndex+1;
		{
			var Range=window.getSelection().getRangeAt(0);
			newTable=document.createElement("table");
			newTable.style.border = "1px solid #888";
			newTbody=document.createElement("tbody");
			newTable.appendChild(newTbody);
			for(i=0;i<row;i++)
			{
				var oneRow=newTable.insertRow(-1);
				for(j=0;j<cell;j++)
				{
					var oneCell = oneRow.insertCell(-1);
					oneCell.innerHTML = "&nbsp;";
					oneCell.style.border = "1px solid #888";
				}
			}
			Range.deleteContents();
			Range.insertNode(newTable);
		}
		insertTableDialog.style.display = "none"
	}
}

function urlChange(event)
{
	if(event.target.value.indexOf("://")<0)
	{
		insertImageButton.value = "搜索";
		insertImagePer.style.display = "inline";
		insertImageNext.style.display = "inline";
		insertImageGoogle.style.display = "inline";
	}
	else
	{
		insertImageButton.value = "插入";
		insertImagePer.style.display = "none";
		insertImageNext.style.display = "none";
		insertImageGoogle.style.display = "none";
	}
}
//插入图片或者搜索图片
function InsertOrSearch(event)
{
	if(insertImageButton.value == "插入")
		FormatImg(insertImageURL.value);
	else
	{
		googlePage = 1;
		StartLoad()
	}
}
//开始载入
function StartLoad()
{
	insertImageGoogle.innerHTML = "Loading...";
	//载入google页面
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://images.google.cn/images?q="+insertImageURL.value+"&start="+(googlePage*20-20),
		overrideMimeType: 'text/javascript',
		onload:DisplayGoogle});
}
//载入 google后的回调函数。
function DisplayGoogle(responseDetails)
{
	var resText = responseDetails.responseText;
	var arrURL = new Array;
	var arrImage = new Array;
	insertImageGoogle.innerHTML = "<span style='color:#F00'>这里显示的图片是通过谷歌图片搜索引擎搜索到的，我不太清楚这样做是否会侵犯到谷歌公司的利益，如果谷歌公司不希望我这么做，请与我联系，我会在程序中删除这一功能。</span>";
	for(var i=0;resText.indexOf("dyn.Img(")>=0;i++)
	{
		//图片页面
		resText = resText.substring(resText.indexOf("dyn.Img(")+9);
		arrURL[i] = resText.substring(0,resText.indexOf("&"));
		//跳过一些参数 
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		//图片地址 
		arrImage[i] = resText.substring(0,resText.indexOf("\""));
		//显示图片
		var newImg = document.createElement("img");
		newImg.src = arrImage[i];
		newImg.style.width = "80px";
		newImg.style.height = "60px";
		newImg.style.display = "inline";
		newImg.style.margin = "10px";
		newImg.addEventListener("click",FormatImg,false);
		insertImageGoogle.appendChild(newImg);
	}
}
//插入图片
function FormatImg(event)
{
	var url;
	if(typeof(event) == "string")
		url = event;
	else
		url = event.target.src;
	newImg=document.createElement("img");
	newImg.src=url;
	var sel=window.getSelection();
	var Range=sel.getRangeAt(0);
	Range.deleteContents();
	Range.insertNode(newImg);
	HiddenAll();
}
