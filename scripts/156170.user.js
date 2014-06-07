// ==UserScript==
// @name        searchToolBar
// @namespace   BedlamiteMan
// @include     *
// @version     1
// ==/UserScript==

var searchToolBarHtmlCode_BedlamiteMan = "<div id='searchToolBarDIV_BedlamiteMan'>";
searchToolBarHtmlCode_BedlamiteMan += "<meta http-equiv='content-type' content='text/html; charset=utf-8'>";
searchToolBarHtmlCode_BedlamiteMan += "<script type='text/javascript' src='http://code.jquery.com/jquery-1.8.3.min.js'><\/script>";
searchToolBarHtmlCode_BedlamiteMan += "<style type='text/css'>#searchToolBarDIV_BedlamiteMan{display:none;width:330px;height:61px;position:absolute;left:800px;top:200px;box-shadow:2px 2px 5px #9E9E9E;background-color:#fff;z-index:10000;border:1px solid #BEBEBE;}#searchToolBarDIV_BedlamiteMan a{width:16px;height:16px;}#searchToolBarDIV_BedlamiteMan img{width:16px;height:16px;border:none;}#searchToolBarDIV_BedlamiteMan .inputDiv_BedlamiteMan{position:absolute;width:300px;height:35px;}#searchToolBarDIV_BedlamiteMan .inputDiv_BedlamiteMan input[type=text]{margin:6px 0px 0px 6px;width:293px;height:25px;border:1px solid #BEBEBE;font-family:微软雅黑;text-indent:3px;box-shadow:0px 0px 2px #9E9E9E;}#searchToolBarDIV_BedlamiteMan .getMoreDiv_BedlamiteMan{position:absolute;height: 25px;margin:10px 0 0 300px;width:25px;}#searchToolBarDIV_BedlamiteMan .getMoreDiv_BedlamiteMan a{width:16px;height:16px;margin:2px 0px 0px 6px;}#searchToolBarDIV_BedlamiteMan .searchButtonDiv_BedlamiteMan{width:320px;height:30px;margin:33px 0px 0px 2px;}#searchToolBarDIV_BedlamiteMan .searchButton_BedlamiteMan{position:relative;width:16px;height:16px;margin:6px 0px 0px 6px;float:left;}</style>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='inputDiv_BedlamiteMan'><form target='_blank' name='searchToolBarForm_BedlamiteMan' method='get' action='http://baike.baidu.com/search/word' accept-charset='gb2312'><input type='text' id='keyWord_BedlamiteMan' name='word' value='' title='点击回车打开相关百度百科词条' /><input type='hidden' value='1' name='pic'/><input type='hidden' value='1' name='sug'/><input type='hidden' value='GBK' name='enc'/></form></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='getMoreDiv_BedlamiteMan'><a href='javascript:openOrCloseBar_BedlamiteMan(\"open\");' title='展开' id='open_BedlamiteMan' style='display:none;'><img src='searchToolBarImg/down.png' ></img></a><a href='javascript:openOrCloseBar_BedlamiteMan(\"close\");' title='收起' id='close_BedlamiteMan' style='display:block;'><img src='searchToolBarImg/up.png' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButtonDiv_BedlamiteMan'>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"copy\");' title='复制到剪切板'><img src='searchToolBarImg/copy.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"link\");' title='打开链接'><img src='searchToolBarImg/link.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"baidu\");' title='百度一下，你就知道'><img src='http://www.baidu.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"baidubaike\");' title='百度百科'><img src='http://www.baidu.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"youdaocidian\");' title='有道词典'><img src='http://www.youdao.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"yinyuetai\");' title='音悦台'><img src='http://www.yinyuetai.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"google\");' title='谷歌'><img src='http://www.google.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"baidumusic\");' title='百度音乐'><img src='http://ting.baidu.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"douban\");' title='豆瓣'><img src='http://www.douban.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"xunleikankan\");' title='迅雷看看'><img src='http://search.kankan.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"iqiyi\");' title='爱奇艺'><img src='http://www.iqiyi.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"youku\");' title='优酷'><img src='http://www.youku.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"51rrkan\");' title='51人人看'><img src='http://www.51rrkan.com/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "<div class='searchButton_BedlamiteMan'><a href='javascript:getForward_BedlamiteMan(\"ffdy\");' title='放放电影'><img src='http://www.ffdy.cc/favicon.ico' ></img></a></div>";
searchToolBarHtmlCode_BedlamiteMan += "</div>";
searchToolBarHtmlCode_BedlamiteMan += "</div>";
document.body.innerHTML=document.body.innerHTML+searchToolBarHtmlCode_BedlamiteMan;

$(document).ready(function(){
	event_BedlamiteMan=null;
	searchText_BedlamiteMan="";
	$(document).click(function(e){
		event_BedlamiteMan = e;
		if($(event_BedlamiteMan.target).parents("#searchToolBarDIV_BedlamiteMan").length == 0 && event_BedlamiteMan.target.id != "searchToolBarDIV_BedlamiteMan"){
			$("#searchToolBarDIV_BedlamiteMan").fadeOut(300);
		}
		
		//获取选中内容
		var browerInfo_BedlamiteMan = navigator.userAgent.toUpperCase();
		var tempText_BedlamiteMan="";
		//判断浏览器类型,并获取选中内容
		if(browerInfo_BedlamiteMan.indexOf("MSIE") >= 0){
			tempText_BedlamiteMan=document.selection.createRange().text;
		}else if(browerInfo_BedlamiteMan.indexOf("FIREFOX") >= 0){
			tempText_BedlamiteMan=window.getSelection();
		}

		tempText_BedlamiteMan = $.trim(tempText_BedlamiteMan);//去前后空格
		if (tempText_BedlamiteMan != "" && tempText_BedlamiteMan != null && tempText_BedlamiteMan != searchText_BedlamiteMan){
			searchText_BedlamiteMan = tempText_BedlamiteMan;
			
			//获取鼠标坐标,获取搜索工具条将要显示的坐标位置
			$("#searchToolBarDIV_BedlamiteMan").css("left",(event_BedlamiteMan.pageX + 10)+"px");
			$("#searchToolBarDIV_BedlamiteMan").css("top",(event_BedlamiteMan.pageY + 20)+"px");
			$("#searchToolBarDIV_BedlamiteMan").fadeIn(300);
			$("#keyWord_BedlamiteMan").val(searchText_BedlamiteMan);
		}
	});
});

//跳转相关搜索
function getForward_BedlamiteMan(direction){
	if(direction == "copy"){//复制
		//alert(searchText_BedlamiteMan);
		//window.open(searchText_BedlamiteMan);
	}else if(direction == "link"){//跳转
		if(getTextFormat_BedlamiteMan()){
			window.open(searchText_BedlamiteMan);
		}
	}else if(direction == "baidu"){//百度
		window.open("http://www.baidu.com/s?wd="+searchText_BedlamiteMan);
	}else if(direction == "youdaocidian"){//有道词典
		window.open("http://dict.youdao.com/search?q="+searchText_BedlamiteMan);
	}else if(direction == "baidubaike"){//百度百科
		document.searchToolBarForm_BedlamiteMan.submit();
		//window.open("http://baike.baidu.com/search/word?pic=2&enc=GBK&sug=1&word="+searchText_BedlamiteMan);
	}else if(direction == "yinyuetai"){//音悦台
		window.open("http://www.yinyuetai.com/search?searchType=mv&keyword="+searchText_BedlamiteMan);
	}else if(direction == "51rrkan"){//51人人看
		window.open("http://www.51rrkan.com/index.php?ie=utf-8&s=vod-search&form_index=c3275a4fd37c7b208d378765a967d1e2&wd="+searchText_BedlamiteMan);
	}else if(direction == "google"){//谷歌
		window.open("http://www.google.com.hk/search?q="+searchText_BedlamiteMan);
	}else if(direction == "baidumusic"){//百度音乐
		window.open("http://ting.baidu.com/search?ie=utf-8&key="+searchText_BedlamiteMan);
	}else if(direction == "douban"){//豆瓣
		window.open("http://www.douban.com/search?q="+searchText_BedlamiteMan);
	}else if(direction == "xunleikankan"){//迅雷看看
		window.open("http://search.kankan.com/search.php?keyword="+searchText_BedlamiteMan);
	}else if(direction == "iqiyi"){//爱奇艺
		window.open("http://so.iqiyi.com/so/q_"+searchText_BedlamiteMan+"_f_2");
	}else if(direction == "youku"){//优酷
		window.open("http://www.soku.com/v?keyword="+searchText_BedlamiteMan);
	}/*else if(direction == "douban"){//豆瓣
		window.open("http://www.douban.com/search?q="+searchText_BedlamiteMan);
	}*/else if(direction == "ffdy"){//放放电影
		window.open("http://www.ffdy.cc/search/?keyword="+searchText_BedlamiteMan);
	}
	//searchText_BedlamiteMan="";
	//$("#searchToolBarDIV_BedlamiteMan").fadeOut(300);
}

//判断选中内容格式
function getTextFormat_BedlamiteMan(){
	var	tempSearchText_BedlamiteMan=searchText_BedlamiteMan.toLowerCase();
	if(tempSearchText_BedlamiteMan.indexOf("www.") == 0){
		tempSearchText_BedlamiteMan="http://"+tempSearchText_BedlamiteMan;
		searchText_BedlamiteMan="http://"+searchText_BedlamiteMan;
		return true;
	}else{
		if(tempSearchText_BedlamiteMan.indexOf("http://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("https://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("ftp://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("file://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("thunder://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("flashget://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("ed2k://") == 0 || 
			tempSearchText_BedlamiteMan.indexOf("thunder://") == 0){
			return true;
		}else{
			return false;
		}
	}
}

//展开/合并更多搜索工具条
function openOrCloseBar_BedlamiteMan(from){
	if(from=="open"){
		document.getElementById("open_BedlamiteMan").style.display="none";
		document.getElementById("close_BedlamiteMan").style.display="block";
	}else if(from=="close"){
		document.getElementById("close_BedlamiteMan").style.display="none";
		document.getElementById("open_BedlamiteMan").style.display="block";
	}
}

//将选中文本复制到剪切板
function copyBedlamiteMan(){
	
}