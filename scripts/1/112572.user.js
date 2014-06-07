// ==UserScript==
// @name	teach.xujc+
// @namespace	http://mutoo.im
// @description	厦门大学嘉庚学院教务系统优化工具
// @include	http://teach.xujc.cn/teach/main_list.php?dir_id=*
// @include	http://teach.xujc.com/teach/main_list.php?dir_id=*
// ==/UserScript==

var TDs = document.getElementsByTagName("td");
for(var i in TDs){
	var td = TDs[i];
	if(td.innerHTML=="名称"){
		var detail = document.createElement("a");
		detail.innerHTML = "详情";
		detail.setAttribute('href', '#');
		detail.setAttribute('onclick', 'onDetail()');
		var download = document.createElement("a");
		download.innerHTML = "下载";
		download.setAttribute('href', '#');
		download.setAttribute('onclick', 'onDownload()');
		var downloadAll = document.createElement("a");
		downloadAll.innerHTML = "下载全部";
		downloadAll.setAttribute('href', '#');
		downloadAll.setAttribute('onclick', 'onDownloadAll()');
		td.innerHTML += "（";
		td.appendChild(detail);
		td.innerHTML += "/";
		td.appendChild(download);
		td.innerHTML += "/";
		td.appendChild(downloadAll);
		td.innerHTML += "）";
		break;
	}
}

var script = document.createElement("script");
script.type = "text/javascript";
script.text = 'var As = document.getElementsByTagName("a");';
script.text += 'function onDetail(){';
script.text += '	for(var i in As){';
script.text += '		var a = As[i];';
script.text += '		if(String(a.href).indexOf("file")!=-1)';
script.text += '			a.href = a.href.split("file_do").join("file_info");';
script.text += '	}';
script.text += '	alert("已切换为经典模式"); ';
script.text += '}';
script.text += '';
script.text += 'function onDownload(){';
script.text += '	for(var i in As){';
script.text += '		var a = As[i];';
script.text += '		if(String(a.href).indexOf("file")!=-1)';
script.text += '			a.href = a.href.split("file_info").join("file_do");';
script.text += '	}';
script.text += '	alert("已切换为下载模式");';
script.text += '}';
script.text += '';
script.text += 'function onDownloadAll(){';
script.text += '	var iframe = document.getElementById("downloadFrame");';
script.text += '	if(window.confirm("真的要下载全部文件？")){';
script.text += '		for(var i in As){';
script.text += '			var a = As[i];';
script.text += '			if(String(a.href).indexOf("file")!=-1)';
script.text += '				var win = window.open(a.href.split("file_info").join("file_do"));';
script.text += '		}';
script.text += '	}';
script.text += '}';

document.body.appendChild(script);

