// ==UserScript==
// @name           qvod 转换器
// @namespace      weiyc
// @include        *play*
// @exclude        http://bo.79bo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==



function qvod_findURL(jqdoc)
{
	console.log($("embed[id='qvod_embed']",jqdoc));
	if(typeof($("embed[id='qvod_embed']",jqdoc).get(0))!="undefined")
	{
		console.log("embed tag hasd been inject.");
		return false;
	}
	
	if(typeof($("object[classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF']",jqdoc).get(0))!="undefined")//是否存在Qvod插件
	{
		var url = $("object[classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF'] > PARAM[name='URL']",jqdoc).attr("VALUE");//提取URL参数
//		console.log(url);
		
		if(!url)//未提取到参数 失败
		{
			console.log("findURL can't find PARAM.URL");

			var teststr = jqdoc.location.toString();//可能隐藏在框架url中，尝试从中提取
			console.log("teststr is-"+teststr);
			url = teststr.match(/qvod:\/\/[0-9]+?\|[0-9a-zA-Z]+?\|.+?\|/i);
//			url = RegExp.$1;
			console.log("find in frame org-url-"+teststr+"-and url is-"+url);
			
			if(!url)
			{
				teststr = unescape(jqdoc.location);
				url = teststr.match(/qvod:\/\/[0-9]+?\|[0-9a-zA-Z]+?\|.+?\|/i);
				if(url == "")
				{ 
					console.log("can't find Qvod url is empty!");
					return false;
				}
				console.log("find in frame decode-url-"+teststr+"-and url is-"+url);
			}
		}
		console.log(url.toString().match(/qvod:\/\/[0-9]+?\|[0-9a-zA-Z]+?\|.+?\|/i));
		if(!url.toString().match(/qvod:\/\/[0-9]+?\|[0-9a-zA-Z]+?\|.+?\|/i))
			return false;//对提取的Qvod参数进行过滤，判断是否是有效的URL
		
		var newembed = jqdoc.createElement("embed");
		console.log("find the URL is-"+url+"create embed Element now!");
		newembed.innerHTML = "<embed id='qvod_embed' width='"+$("object[classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF']",jqdoc).width()+"' height='"+$("object[classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF']",jqdoc).height()+"' URL=\'"+url+"\' type='application/qvod-plugin'></embed>"
		$("object[classid='clsid:F3D0D36F-23F8-4682-A195-74C92B03D4AF']",jqdoc).append(newembed);
		return true;
	}
	console.log("findURL can't find macth DOM!");
}

function qvod_viewdisplay()
{
	console.log(window.location);
	//var subframs = unsafeWindow.frames;
	console.log("findurl in main window"+window.document.location);
	qvod_findURL(document);//在主框架中寻找qvod插件 提出参数
	if(window.frames.length>0)//从子框架中提出参数
	{
//		console.log(window.frames.length);
		for(var item = 0;item<window.frames.length;item++)
		{
			console.log("findurl in window.frames item:"+window.frames[item].document.location);
			if(qvod_findURL(window.frames[item].document))
				return ;
		}
	}

}
document.addEventListener("load",qvod_viewdisplay,true)