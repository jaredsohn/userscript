// ==UserScript==
// @name           EditTools
// @namespace      liuwanfang86.jimdo.com
// @description		许多网站的在线编辑器的功能有限，这个脚本可补充在线编辑器的功能。安装这个脚本后，您可以方便的在论坛中修改帖子中的字体、字号，插入表格，不离开当前页面，即可通过google搜索图片。
// @include        http://*
// ==/UserScript==

if(top != self)
{
	var googlePage;
	//建立工具栏
	var tools = document.createElement("div");
	tools.style.backgroundImage = "url(data:image/gif;base64,R0lGODlhBAAeAMZQAMDAwMDAwcHAwMHBwMLCwsLCw8PDw8TExMXExcXFxcbGx8bHxsfHx8jIycnIycjJyMnJyMvKy8vLysvLy83MzM3Nzc%2FOz8%2FPz9HR0dPT09XV1dXV1tfX19fX2NfY19nZ2tna2dra2dvb29zb29vc29zc3N3e3d3e3t7e3d%2Ff4ODf3%2BDg4OHh4uLh4eHi4uLi4uTj5OTk5Obm5ebm5ujo6Orq6uzs7O3s7O7u7u7u7%2B%2Fv7%2FDw8PDw8fHw8fDx8PLy8vLy8%2FPy8vLz8vT09fX09PT19fX19fb29vf39vf39%2Fn4%2BPn5%2Bfr6%2B%2Fv6%2B%2Fv7%2B%2F39%2Ff%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FyH%2BEUNyZWF0ZWQgd2l0aCBHSU1QACwAAAAABAAeAAAHcYBMTE1OSEdJSEJAP0E5Ojg4NZI1M5UyLS8sLiYnKCYgIR8fGxqlGKcYFRQVFRANDg8IBwkHAgEDAAQFBAYMCwwKExITERYXxxnJGR0cHh0iJCUjKisrKTEwMTE03DQ2NzY2PT47PENERUZKS%2BxP7k%2BBADs%3D)";
	tools.style.top = 0;
	tools.style.left = 0;
	tools.style.padding = "5px";
	tools.style.paddingRight = "15px";
	tools.style.height = "23px";
	tools.style.position = "fixed";
	top.document.body.appendChild(tools);
	//建立字体按钮
	var fontname = document.createElement("img");
	fontname.src = "data:image/gif;base64,R0lGODlhFAAUAKUAAAAAAAoKCg4ODjo5OEhISHBDFXZJGXhOIn1SI1lZWH9WK4deL4diOZtfIJZkL21raplnMXd1c7tsGYN5act7J9t8GI%2BNi4%2BQjJKSkpqbmbCZgLKagKWin6anpa2trLSxrsPAvNHOytLOy%2BDg4PT09AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAD8ALAAAAAAUABQAAAZZwJ9wSCwajYCjkghILofNqDSqbC6d1yn2ydxyhdZvd7mBaqfDhuZ6dECe3p9CUsgWDxWGnTihIAxiQiEkHguBQhcjHYc%2FDwkZjAMYBBGHFgABAhwfICKMR0EAOw%3D%3D";
	fontname.alt = "字体";
	fontname.title = "字体";
	fontname.addEventListener("click", displayFont, false);
	fontname.style.display = "inline";
	tools.appendChild(fontname);
	//建立字号按钮
	var fontsize = document.createElement("img");
	fontsize.src = "data:image/gif;base64,R0lGODlhFAAUAKECAAAAAAAA%2F%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEAAAIALAAAAAAUABQAAAI5lI%2BpyxoLmghUgbievrzz9AhXgx3h4Y0OWYKMmkHtKqaeCzHaZDXUiZrhEDCJKeZLZn7Mpk75pBkKADs%3D";
	fontsize.alt = "字体大小";
	fontsize.title = "字体大小";
	fontsize.addEventListener("click", displaySize, false);
	fontsize.style.display = "inline";
	tools.appendChild(fontsize);
	//建立表格按钮
	var visualaid = document.createElement("img");
	visualaid.src = "data:image/gif;base64,R0lGODlhFAAUAMMGADJKYp6uwtfa6lx3obLF1XKLsvr8%2Fo%2B08oufwqzE8t%2Fq%2Fqy40oKWssLQ4rzV8gAAACH5BAEAAA8ALAAAAAAUABQAAAR78MlJq704681p%2Bx8hLktgnp5hIGrrKgqQru4Ly1ODMCfiM4yCcICTEFQBlYBlaBRgieLjaEgKBIwm4ZmIUhYq3y44HJilYFrzqUgMBI4DOtx0tt1xOSVpAAoLZoFneyoMUAMKAgcDDnFSfFxuiot5jwCXmJmaHZydnhQRADs%3D";
	visualaid.alt = "插入表格";
	visualaid.title = "插入表格";
	visualaid.addEventListener("click",displayTable,false);
	visualaid.style.display = "inline";
	tools.appendChild(visualaid);
	//建立图片按钮
	var imagebutton = document.createElement("img");
	imagebutton.src = "data:image/gif;base64,R0lGODlhFAAUAMMAAP%2F%2F%2F5zO9GaZAJmZmZzOFeDg4CVjAACZAJw4KjMzMwEAAQAAAAAAAAAAAAAAAAAAACH5BAEAAAoALAAAAAAUABQAAARvUMlJq734gs27r0AgjuQIgKUQCAN5UqGoEoRgF%2BI7xQLtG6ocauUjGA4uVNBnOwphgYKNEDgIrAJDQSfZ2G6HAqJg3YC8AIQVYeucO4iExwwr0hIIO1cB%2BNrYbH57AAdHhoWIR4NzjHsZj5CRkhIRADs%3D";
	imagebutton.alt = "插入图片";
	imagebutton.title = "插入图片";
	imagebutton.addEventListener("click",displayImage,false);
	imagebutton.style.display = "inline";
	tools.appendChild(imagebutton);
	//建立about按钮
	var aboutbutton = document.createElement("img");
	aboutbutton.src = "data:image/gif;base64,R0lGODlhFAAUAMZeAAgI%2FggI%2FwkJ%2FgkJ%2Fw0N%2Fw4O%2Fg4O%2Fw8P%2FhAQ%2FxYW%2FhYW%2Fx4d%2Fh4e%2Fh8e%2Fx0f%2Fh4f%2Fh8f%2Fx4g%2FyYm%2FiYm%2Fycm%2FyYn%2Fy4u%2Fi4u%2Fy8u%2Fi8u%2Fy4v%2FzY2%2FjY2%2Fzc2%2FzY3%2Fz4%2B%2Fj4%2B%2Fz8%2B%2Fz4%2F%2Fj4%2F%2Fz8%2F%2F0ZG%2FkZG%2F0dG%2FkdG%2F0ZH%2FkZH%2F0dH%2FkdH%2F05O%2Fk5O%2F09O%2Fk9O%2F05P%2Fk5P%2F09P%2F1ZW%2FlZW%2F1dW%2FldW%2F1ZX%2FlZX%2F1dX%2FldX%2F15e%2Fl9e%2Fl9e%2F15f%2Fl5f%2F19f%2Fl9f%2F19g%2Fmdm%2F2dn%2Fmdn%2F25t%2Fm9u%2Fm9v%2Fm9v%2F3Bv%2F3Bw%2FnR0%2F3V1%2FnV1%2F3Z2%2Fnd2%2Fnd2%2F3d3%2F3h4%2Fn5%2F%2Fn5%2F%2F39%2F%2FoB%2F%2Fn%2BA%2Fn%2BA%2F9zc%2F93d%2F%2F%2F%2F%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2F4CA%2FyH5BAEKAH8ALAAAAAAUABQAAAfdgH%2BCg4SFhoeIiX9ZV1hYWlZVioJOUFFRVFNSUk9NiUpMS0pKXElISahHh0WsRq5brq5FRIY%2FQ0I%2BPT1CvEA%2FPEFCPIU6ODs7NzfHxzk3NjU1NIQvMTIzMDBdXTMzMjAvLi4thCcrLOcqKl3nKCYp5yWEIyQfI%2FMhXSQhISAiJP%2BEPHDYwIFDhw5dChYkSJAQhgwPLVy40EXDhQwWLFi0UGiCBAoSJkzoIjJkyAqGIjxYsICBgy4MGLRsAAFRAgU4tXXBiXPSAQMEghYwgGCSIAACBAwIAMCo06eIAgEAOw%3D%3D";
	aboutbutton.alt = "关于";
	aboutbutton.title = "关于";
	aboutbutton.addEventListener("click",displayAbout,false);
	aboutbutton.style.display = "inline";
	tools.appendChild(aboutbutton);
	//建立关闭按钮
	var smallico = document.createElement("div");
	smallico.style.width = "11px";
	smallico.style.height = "24px";
	smallico.style.display = "inline";
	smallico.style.position = "absolute";
	var closebutton = document.createElement("img");
	closebutton.src = "data:image/gif;base64,R0lGODlhCwALAIABAP8AAP%2F%2F%2FyH5BAEKAAEALAQAAAAHAAsAAAIQBIKmsWrIXnLxuDOh3rzDAgA7";
	closebutton.alt = "关闭";
	closebutton.title = "关闭";
	closebutton.addEventListener("click",CloseTable,false);
	smallico.appendChild(closebutton);
	//建立关闭按钮
	var movebutton = document.createElement("img");
	movebutton.src = "data:image/gif;base64,R0lGODlhCwALAIABAAAA%2F%2F%2F%2F%2FyH5BAEKAAEALAQAAAAHAAsAAAIRRI5hlsDnXprRwQoRexvPUAAAOw%3D%3D";
	movebutton.alt = "工具栏紧贴编辑窗口";
	movebutton.title = "工具栏紧贴编辑窗口";
	movebutton.addEventListener("click",MoveTools,false);
	smallico.appendChild(movebutton);
	tools.appendChild(smallico);
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
	fontlist.style.backgroundColor = "#EEE";
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
	sizelist.style.backgroundColor = "#EEE";
	tools.appendChild(sizelist);
	//建立表格窗口
	var insertTableDialog = document.createElement("div");
	var insertTable = document.createElement("table");
	insertTableDialog.style.position = "absolute";
	insertTableDialog.style.backgroundColor = "#EEE";
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
	insertImageDialog.style.backgroundColor = "#EEE";
	insertImageDialog.style.display = "none";
	insertImageDialog.style.width = "280";
	insertImageDialog.style.zIndex = "1600";
	insertImageDialog.style.padding = "10px";
	insertImageDialog.appendChild(document.createTextNode("请输入图片地址或图片相关文字，如输入图片相关文字，程序将通过谷歌搜索图片"));
	insertImageDialog.appendChild(document.createElement("br"));
	var insertImageURL = document.createElement("input");
	insertImageURL.value = "http://";
	insertImageURL.style.width = "180px";
	//改变文字时触发事件
	insertImageURL.addEventListener("input",urlChange,false);
	var insertImageButton = document.createElement("input");
	insertImageButton.value = "插入";
	insertImageButton.type = "button";
	insertImageButton.addEventListener("click",InsertOrSearch,false);
	insertImageDialog.appendChild(insertImageURL);
	insertImageDialog.appendChild(insertImageButton);
	insertImageDialog.appendChild(document.createElement("br"));
	//插入图片预览
	var insertImageGoogle = document.createElement("div");
	insertImageGoogle.style.height = "300px";
	insertImageGoogle.style.overflowY = "auto";
	insertImageDialog.appendChild(insertImageGoogle);
	insertImageDialog.appendChild(document.createElement("br"));
	var insertImagePer = document.createElement("input");
	insertImagePer.style.display = "none";
	insertImagePer.value = "上一页";
	insertImagePer.type = "button";
	insertImagePer.addEventListener("click",function(event){if(googlePage > 1){googlePage++;StartLoad();}},false);
	insertImageDialog.appendChild(insertImagePer);
	var insertImagePage = document.createElement("input");
	insertImagePage.style.display = "none";
	insertImagePage.style.width = "50px";
	insertImagePage.value = "1";
	insertImageDialog.appendChild(insertImagePage);
	var insertImageNext = document.createElement("input");
	insertImageNext.style.display = "none";
	insertImageNext.value = "下一页";
	insertImageNext.type = "button";
	insertImageNext.addEventListener("click",function(event){googlePage++;StartLoad();},false);
	insertImageDialog.appendChild(insertImageNext);
	var insertImageBig = document.createElement("img");
	insertImageBig.style.position = "absolute";
	insertImageBig.style.top = "30px";
	insertImageBig.style.left = "280px";
	insertImageBig.style.display = "none";
	insertImageBig.style.border = "#444 solid 40px";
	insertImageBig.style.backgroundColor = "#444";
	insertImageDialog.appendChild(insertImageBig);
	tools.appendChild(insertImageDialog);
	//about窗口
	var aboutDialog = document.createElement("div");
	aboutDialog.style.position = "absolute";
	aboutDialog.style.backgroundColor = "#EEE";
	aboutDialog.style.display = "none";
	aboutDialog.style.zIndex = "1600";
	aboutDialog.style.padding = "20px";
	var aboutImage = document.createElement("img");
	aboutImage.src = "data:image/jpeg;base64,%2F9j%2F4AAQSkZJRgABAQEASABIAAD%2F%2FgATQ3JlYXRlZCB3aXRoIEdJTVD%2F2wBDABsSFBcUERsXFhceHBsgKEIrKCUlKFE6PTBCYFVlZF9VXVtqeJmBanGQc1tdhbWGkJ6jq62rZ4C8ybqmx5moq6T%2F2wBDARweHigjKE4rK06kbl1upKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKT%2FwAARCADIAMgDASIAAhEBAxEB%2F8QAGgABAAIDAQAAAAAAAAAAAAAAAAEDAgQFBv%2FEADUQAAICAQMCBAMGBgMBAQAAAAECAAMRBBIhMUEFE1FhIjJxQoGRobHBBhQjUtHwFTPhJGL%2FxAAXAQEBAQEAAAAAAAAAAAAAAAAAAQID%2F8QAGhEBAQEBAQEBAAAAAAAAAAAAAAERIQIxQf%2FaAAwDAQACEQMRAD8A9NERAREQEREBERAREQEREBIkyIExEQIkyJMBERAREQEREBERAREQEREBERAREQETF3VFLOwUDuTNXVeIVaagWsc5OFA7wNuJwrfF3N6h38lCcbQuSMdSf0jWeJrUa6alayyzGS%2FGfu%2FaB3QwPQgyZ53VatryukoawW7sMVbHAHIEwRmNzWI75rT4QGJ3N6fr%2BED0sTyvh2v1FusI1F7mvnIzjA57y3SazVJ%2FMDzgooq8z4l5bvj88QPSSZytF4v51AsuTaQQCB2950F1FbHGcEnAyOsC2JEmAiIgIiICIiAiIgIiICIkQHSc3VeMVU2NXWA5UctngTQ8U8SfV3jSaUny87WI%2B2fT6SrwnQrqfErXsIZKDz6Ej9oGGv09wRdbe7DzW3eX3Hpx6zYvW%2FVanTZUKVTeqt69cmbfidwqpDIpdgNtYPJz6ynSutdJDP5moIw5U55J6A%2F70gRb4etyCpWChQWez1OO%2Ftn%2FAHiY%2BH01LYdQo3qnBvs6Zx2Ess1y21PWiotKNtLNkhv8yFsGtrR2sNenqO4ds47n9hAt061Jq2WtNrrWQHb7JPJJ9z1MxWnHlrQn9MKRvPAf7%2FSW16Pege4lK1YuFb5myc5b%2FE5fi3jqs9lNAyoG3PbMC5Eqd0FTL8TbTaBjPrtHpNa%2BtNV4q%2BmocCtQFY%2BoGCfzE5C6u5dhDkbB8PtFDvuLB9pcnLZ5gdO3UCvU6rkEWIcD1JM6Ol1JTTVahssiqQfqADj8p54sGPmZA2sFVSc5E39HraxWKX3Fd4OMdYHp9NqFtUGt9y5%2BvE2Z5jw%2B5gjNWoQ1%2FPg4J54nd0ep80EfnmBtxIkwEREBERAREQEREBOP4%2F4j%2FLUjT1HNtnBx1AnS1V402msuP2FJnjXay5G1lzbnsbCg9%2F8Af2gb3genL3bjyF7%2B%2Bf3%2FAE%2Bs6%2Bmu0tVT7MLUXOWH2yPT2%2F3vPPNqnXTjT1cncM47segmVNjvWlV7%2FCGK59u5%2FAQL%2FGtQLKfgz%2FXOV%2Bmf8%2FpMGvTSacio%2FwBTArQD1xyfzP4znXXnVapSOAOnsJs1GpC2rcHCnbUp6n3gbuzyatNpQMnO%2Bw9efSdFtRpdEqoFBdRx3%2BI%2BnvOA%2Bvas5PU8hf8Af0mx4VprdRadVbyF%2BRT3Mio1uv1esJRrDWpb4gPsj%2FM1KvDhdqBVXn1Yn7I9PrO4PDEJ%2BNye7Y7mben09Wnr2VLtHU%2BpMmrjl%2F8AA6c5LO4OOmZOh8I0wBcqXU8KW9PWdcjPQRjAxM6uOf8A8Poi2TWSAMAZ4nF8Q0%2F8q7VqMbc4b1HX956vE19Xoq9ZS9dnU%2FK39pllLHk9PqrK7VO44PBno%2FDbwGN1bA1k4Zccg8czy9lbUXPVYMMpKmdnw10rqX5mBI3qTwQRg%2FkRNsPXA5GZMwqBFag9QJnAREQEREBERARExsYIjMegGYHB%2FiLV%2BYRo6m682Y7Adpw9U7XlUrHwVjaMevf%2FAH2lugB1N1ljk5dssfbqZfqTVXp6q6sbyST6jPA%2FKBoism6mtfQfcTIusZi6oMJ8ufYdpczpXe7IMBFOD6mX6igeXo6kAVQhd2x3J7%2FhA0aaiqNa3wqOBnuZmyZ2ryABk%2B3ufeblVZ1Oq8sDAQkn6zu06aqlAqqM5zkjnPrJbiyOPofBw%2B260FB1CH0953FTaoVRgCU6nWVabAOST0AlKeIrgtYuwD1PaZ7WuRu4MgTWq8U0tjbfNC59ek2lKuu5TkSKkSZiJlIAgdZDMAMkgCUfzSsxFeGx3zA538RaAWac6lPmr%2BYeoml4ER5irtBycn2wf8H8p2DfZZVYt9Y2OpHH6GaP8O6InUeYSAEJyp7gjj9pvyxXqO0mRJmkIiICIiAiIgJRrWK6S4jrsP6S%2BVakFqWUdwRA8XoGKZPQMDmYBt1m8noCx%2BvaZWEUVhDw4JBHpKqEy1hsB2qucH8oGxTQgN3m%2FEoUYwe5m0tqtRp1bglyx9wOk0EdjSwwcs2cY656Ta02m1FmoqU1uEUY3Y4AzA7Hh9IStrWA3WMW%2FGbFrEKSOSZkEARVGcKMCSCRjHbpObbjX0XWWbjW7P8ATAEuq8Msc7rSq%2Bw6Tfa5t20Kcg85EoPiOnqsCWWEk8DaJrqcamq8GfJahkJznBGJRp3eg%2FMaWUkWIefoROxVqhcA1aPj%2FwDQI%2FaZaigX1FXAKnniBjp7jaoLDDYzj195ZY4rRmIzjsJhUfi5HTpM2GW56ATKuRbZq9Z%2FTUBXJ7H5RNqnwlUp2m192Oq8CbbWJXUXyqg95Uuv0%2BObTkd8HEo1l0N9ZKG5HQg8kc%2B03PBqDWH3gBgFBHccf%2BTOy%2FcqCrY7WHC56HufykUBxc1pOzI6bzg9unTtLGa6UTCtw67hM5pCIiAiIgIiICQRmTEDx3itIXW60gehEq0uj1mp0x1FbJtz8h%2B1ib38TA1XsR0sQH9Y0jOPB62pOPj6%2BmTiSrGrq9llS27GpcAl19DnE6HgTX%2BWd7EqoAX7%2BZo69XTULXaPhJAOOhXOZ1%2FDBjSK39xJkt4SNwsT6fhI2sGzuBHoRJMkTOt411RzeWGPv5E1L%2FDHe1yvlkMxbnrmdLITJPAIhsHk8Zl2s4q0VR0ul8v%2FALLHO5yx4zLTwmM5IkhR2g4AwI3VzFSgBlkPWqvuGckessAGfUiLk31kA4PY%2BhkGpqdE11BTzMbsduntK%2FD9Dbo2Zt9bZGBxwB34m%2FU5asMRyRyPSQbBuAwRn1l2mRrpp69K9LrkBbMnJ45GP3m%2BiK1rjA2jAxKrESyplc5U9QOss0TKUcKCCGIOTk5ljNbCqFGFAA9pMRNIREQEREBERAREQOJ%2FEuksu0621rkIp3fScrwDVLl9DZ8rncn17ievIyMTxHiOnfwrxEEYypDoezCSjd8YSz%2Bfqc%2F9RAAz068j6zoeFvv0NY7r8JlF2tR1ocpv094w2fsGToA2m1D6dyCjfEhHt1%2FYzP426kDrA6SJlWWZBVT2H4SMyQYGWSBwT%2BMpuxXXvwTjool0q1H%2FAFgkZAIJx6ShQ4dA2CM9jLMyjzkGORzzxMhYCu4HIgTUNrunYncP9%2F3rLJTWS1zHB2gYB9ZdIGJh4Ywfz7B8rWHH3cSNS5Sk7fmb4V%2Bpm1pKF0%2BnSpR8oxNeWfS6IibZIiICIiAiIgIiICc7xvw5fENGQB%2FVTJQ%2Ft986MQPH%2BH6iltE2j1reWUPBPHHWdiuut6q3p%2BXgqTLfE%2FC671e6qtTdjocgN%2BHeU%2BHsG0i7eo4b695mxqNoSTIEmYaYzIGYnrJgZgzF2GMesquvWrAbOT6CUjWaZjjzRn0PH6y4La6q62LKoBPtM8LnO0Z%2BkqOpr7On4wbkUZZlA9SYwXqQOAMD2mfWabaulTgupz2ByZtVOGrDjIBGeeIBK%2FN1ikkbahux7ngfoZvTV0KNsa1xhrDkD0HabU3GKRESoREQEREBERAREQEREBOF4XSdLdq9Oc4rtwuT2IBH5Tuzj6Rmt1uuZunm4H3fD%2B0l%2BLGwWw2D%2BMZxJYAjBmHKnDcj1mG2WYmOARkHMAwMjMWAIwQCPeZCMQKdiDgoMfSStGnXlaVB%2Bkt2yAoEaMFor37ti59cS0qXxUvVuPoO8cAZlujRsNa6lS3AB7CWdS1sgAAAdBJiJtgiIgIiICIiAiIgIiICIldloVlReXbt6D1gYavUDT0lzyegA7k9JTRV5aNwNz%2FExHc95NyAXozruAPBPrzLJn01FRkGZsuRkTECZVUwx04kbh3EtdZURAzGMcSN0rwR04mDG77LD8IF%2BT2jnvKMakVlhbWMDPKE%2FvL6NOxqWy7V5Df2qFH7y4msq1F9pr6qvLn9pvzCtErQKgAUdAJnNSYzSIiUIiICIiAiIgIiICYWWJUhZ2CqO5lWp1HkgIi77W%2BVR%2Bp9pWmme1vN1J3EfKnYQJFl2q%2F6waav7m%2BZvoO0tppSgHb1PUnqZYTwDMC%2FcQItKvWVJxniUrYRlWHxDgiTa3T3mrfuJW6vl14I%2FuHp9Ys1ZcbeYIz0lVdm9FdTwZYG4nNpGPSYFZZnnniQRjiBht9pAWZjg4My6QrV1TbaSq%2FM%2FwAIm95FfkrUegGAZqhd2tq5yoBOPpj%2FAMm0zFsg8Ym58YqpdPbUgVbWOOhYzI6pqR%2F9FZUZxuXkTJHB%2BFuv6y3AI24BB7Sozia2x9PlqsvX3rPJH0%2FxLK767MYYBv7TwYFsREBERAREQEpvu8vCIN1rfKv7n2iICmkJksd7t8zHv%2F5JdyMYiIEbuOJX04iJRDLu%2BE9R0lOCMnHERKJXI4UZBPSWmsgdwfeImPUWVgTJBG72iJhsZSACeh6SCfeIipGjoLG%2F5Syt2JxuUZ9OCPyzOq3BB%2B4xE6RmsHQ9RK1cqf29YiVG0jb13CV6jSpqMHJSwdGU4MRIKGfU6RS7N59YGWyMEf8Ak2tPemppW2s5VoiBbERAREQP%2F9k%3D";
	aboutDialog.appendChild(aboutImage);
	aboutDialog.appendChild(document.createElement("br"));
	aboutDialog.appendChild(document.createElement("br"));
	aboutDialog.appendChild(document.createTextNode("名称：通用编辑栏"));
	aboutDialog.appendChild(document.createElement("br"));
	aboutDialog.appendChild(document.createTextNode("版本：0.2V"));
	aboutDialog.appendChild(document.createElement("br"));
	aboutDialog.appendChild(document.createTextNode("设计者：刘万方"));
	tools.appendChild(aboutDialog);
	tools.className = "tools";
	window.addEventListener("click",HiddenTools,false);
}
function HiddenAll()
{
	fontlist.style.display = "none"
	sizelist.style.display = "none"
	insertTableDialog.style.display = "none"
	insertImageDialog.style.display = "none"
	aboutDialog.style.display = "none"
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
	fontlist.style.left=event.target.offsetLeft+"px";
	fontlist.style.top=event.target.offsetTop+26+"px";
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
	sizelist.style.left=event.target.offsetLeft+"px";
	sizelist.style.top=event.target.offsetTop+26+"px";
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
	insertTableDialog.style.left=event.target.offsetLeft+"px";
	insertTableDialog.style.top=event.target.offsetTop+26+"px";
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
	insertImageDialog.style.left=event.target.offsetLeft+"px";
	insertImageDialog.style.top=event.target.offsetTop+26+"px";
}
function displayAbout(event)
{
	//显示about窗口
	if(aboutDialog.style.display == "none")
	{
		HiddenAll();
		aboutDialog.style.display = "block"
	}
	else
		aboutDialog.style.display = "none"
	aboutDialog.style.left=event.target.offsetLeft+10+"px";
	aboutDialog.style.top=event.target.offsetTop+36+"px";
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
		insertImagePage.style.display = "inline";
		insertImageNext.style.display = "inline";
		insertImageGoogle.style.display = "inline";
	}
	else
	{
		insertImageButton.value = "插入";
		insertImagePer.style.display = "none";
		insertImagePage.style.display = "none";
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
	insertImagePage.value = googlePage;
	//载入google页面
	GM_xmlhttpRequest({
		method: 'GET',
		url: "http://images.google.cn/images?ndsp=20&q="+insertImageURL.value+"&start="+(googlePage*20-20),
		overrideMimeType: 'text/javascript',
		onload:DisplayGoogle});
}
//载入 google后的回调函数。
function DisplayGoogle(responseDetails)
{
	var resText = responseDetails.responseText;
	var i;
	insertImageGoogle.innerHTML = "<span style='color:#F00;width:260px;'>这里显示的图片是通过谷歌图片搜索引擎搜索到的，我不太清楚这样做是否会侵犯到谷歌公司的利益，如果谷歌公司不希望我这么做，请与我联系，我会在程序中删除这一功能。</span><br>";
	for(i=0;resText.indexOf("dyn.Img(")>=0;i++)
	{
		//图片页面
		resText = resText.substring(resText.indexOf("dyn.Img(")+9);
		//跳过一些参数
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		//显示图片
		var newImg = document.createElement("img");
		//图片地址 
		newImg.src = resText.substring(0,resText.indexOf("\""));
		newImg.style.display = "inline";
		newImg.style.margin = "10px";
		newImg.addEventListener("click",FormatImg,false);
		newImg.addEventListener("mouseover",DisplayImage,false);
		newImg.addEventListener("mouseout",HiddenImage,false);
		//跳过一些参数
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		resText = resText.substring(resText.indexOf(",")+2);
		newImg.title = resText.substring(0,resText.indexOf("\""));
		var w = eval(newImg.title.substring(0,newImg.title.indexOf(" x")));
		var h = eval(newImg.title.substring(newImg.title.indexOf(" x")+3,newImg.title.indexOf(" -")));
		if( w/h > 16/12 )
		{
			newImg.style.width = "40px";
			newImg.style.height = (h*40/w)+"px";
			newImg.style.marginLeft = "10px";
			newImg.style.marginRight = newImg.style.marginLeft;
			newImg.style.marginTop = 25-(h*20/w)+"px";
			newImg.style.marginBottom = newImg.style.marginTop;
		}
		else
		{
			newImg.style.width = (w*30/h)+"px";
			newImg.style.height = "30px";
			newImg.style.marginLeft = 30-(w*15/h)+"px";
			newImg.style.marginRight = newImg.style.marginLeft;
			newImg.style.marginTop = "10px";
			newImg.style.marginBottom = newImg.style.marginTop;
		}
		insertImageGoogle.appendChild(newImg);
	}
	if(i == 0)
	{
		if(googlePage>1)
			insertImageGoogle.innerHTML = "<span>已经是最后一页了，请返回上一页。</span><br>";
		else
			insertImageGoogle.innerHTML = "<span>对不起，没有您要的图片</span><br>";
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
//预览图片
function DisplayImage(event)
{
	insertImageBig.style.display = "inline";
	insertImageBig.src = "";
	insertImageBig.src = event.target.src;
	insertImageBig.style.width = "640px";
	insertImageBig.style.height = "480px";
	//改变原图大小
	var w = eval(event.target.title.substring(0,event.target.title.indexOf(" x")));
	var h = eval(event.target.title.substring(event.target.title.indexOf(" x")+3,event.target.title.indexOf(" -")));
	if( w/h > 16/12 )
	{
		event.target.style.width = "60px";
		event.target.style.height = (h*60/w)+"px";
		event.target.style.marginLeft = "0px";
		event.target.style.marginRight = event.target.style.marginLeft;
		event.target.style.marginTop = 25-(h*30/w)+"px";
		event.target.style.marginBottom = event.target.style.marginTop;
	}
	else
	{
		event.target.style.width = (w*50/h)+"px";
		event.target.style.height = "50px";
		event.target.style.marginLeft = 30-(w*25/h)+"px";
		event.target.style.marginRight = event.target.style.marginLeft;
		event.target.style.marginTop = "0px";
		event.target.style.marginBottom = event.target.style.marginTop;
	}
	if(w<640 && h<480)
	{
		insertImageBig.style.top = "30px";
		insertImageBig.style.width = w+"px";
		insertImageBig.style.height = h+"px";
	}
	else if( w/h > 16/12 )
	{
		insertImageBig.style.top = 270-(h*320/w)+"px";
		insertImageBig.style.width = "640px";
		insertImageBig.style.height = (h*640/w)+"px";
	}
	else
	{
		insertImageBig.style.top = "30px";
		insertImageBig.style.width = (w*480/h)+"px";
		insertImageBig.style.height = "480px";
	}
}
function HiddenImage(event)
{
	insertImageBig.style.display = "none";
	//改变原图大小
	var w = eval(event.target.title.substring(0,event.target.title.indexOf(" x")));
	var h = eval(event.target.title.substring(event.target.title.indexOf(" x")+3,event.target.title.indexOf(" -")));
	if( w/h > 16/12 )
	{
		event.target.style.width = "40px";
		event.target.style.height = (h*40/w)+"px";
		event.target.style.marginLeft = "10px";
		event.target.style.marginRight = event.target.style.marginLeft;
		event.target.style.marginTop = 25-(h*20/w)+"px";
		event.target.style.marginBottom = event.target.style.marginTop;
	}
	else
	{
		event.target.style.width = (w*30/h)+"px";
		event.target.style.height = "30px";
		event.target.style.marginLeft = 30-(w*15/h)+"px";
		event.target.style.marginRight = event.target.style.marginLeft;
		event.target.style.marginTop = "10px";
		event.target.style.marginBottom = event.target.style.marginTop;
	}
}
//紧贴窗口或复原
function MoveTools(event)
{
        var aFrms = parent.document.getElementsByTagName("IFRAME");
	var myFrm;
        for(i=0;i<aFrms.length;i++)
	{
		if(aFrms[i].contentWindow == window)
		{
                	myFrm = aFrms[i];
		}
	}
	if(movebutton.title == "工具栏紧贴编辑窗口")
	{
		movebutton.title = "编辑窗口最大化"
		movebutton.src = "data:image/gif;base64,R0lGODlhCwALAIABAAAA%2F%2F%2F%2F%2FyH5BAEKAAEALAAAAAALAAsAAAIYjI8Gyx0NwUtHWlbnSlajLk2KSF3RRiEFADs%3D"
		tools.style.position = "absolute";
		var target = myFrm;
		var x = target.offsetLeft;
		var y = target.offsetTop;
		var target = target.offsetParent;
		while (target)
		{
		        x += target.offsetLeft;
		        y += target.offsetTop;
			target = target.offsetParent
		}
		tools.style.left = x+"px";
		tools.style.top = (y-35)+"px";
	}
	else
	{
		movebutton.src = "data:image/gif;base64,R0lGODlhCwALAIABAAAA%2F%2F%2F%2F%2FyH5BAEKAAEALAQAAAAHAAsAAAIRRI5hlsDnXprRwQoRexvPUAAAOw%3D%3D"
		movebutton.title = "工具栏紧贴编辑窗口"
		tools.style.position = "fixed";
		tools.style.top = "0px";
		tools.style.left = "0px";
	}
}
