// ==UserScript==
// @name			音乐下载
// @namespace		http://weibo.com/caols
// @description		下载音乐
// @version			0.153
// @created			2012.07.01
// @modified		        2012.07.02
// @author			Gnauk
// @match               http://cn.ttcy.com/*
// ==/UserScript==

var $version = 0.153;
var $uid;


function download(file)
{
	windows.open(file);
	return true;
}


//修改“下一步”，屏蔽输入电话窗口
function onDownLoadsTianTang()
{
     var obj=document.getElementById('mPlayer');
    if (obj===undefined || obj==null) return;
    console.log("find!");
	
	var val=obj.childNodes[1].getAttribute('value');

    var tb=document.getElementsByTagName("tbody")[4];
	tb.deleteRow(5);

	var tbody=document.getElementsByTagName("tbody")[5];
	tbody.deleteRow(0);

	var newtr= document.createElement('tr');
	var line='<td><a href="'+val+'"target="_blank">下载(右键点击,"链接另存为")</a></td>';
	//var line='<td><a href="javascript:void(0)" id="downloadByCW">下载</a></td>';
	 newtr.innerHTML =line;
     tbody.appendChild(newtr);


   //document.getElementById('downloadByCW').addEventListener('click', function () {
	//		console.log("click");
	//		windows.open(val);
	//	}, false);

    return false;
}



function isTianTangPage()
{
	if (document.title.indexOf('天堂草原音乐')==0 )
	{
			console.log("yinyue");
		return true;
	}
	
	return false;
}

if (isTianTangPage())
{
      onDownLoadsTianTang();
}

// 处理动态载入内容
//document.addEventListener('DOMNodeInserted', onDOMNodeInsertion, false);