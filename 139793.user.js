// ==UserScript==
// @name       AcfunKeyWord
// @version    0.1
// @description  Acfun关键字过滤脚本
// @author         Yangff
// @match      http://www.acfun.tv/*
// @copyright  2012+, Yangff
// ==/UserScript==
// 下面是一坨从源程序中分离出来的函数……
//将数据读取自LocalStorage
(function(){
function mimikoLoad(para){
	if(window.localStorage){
		var mimikoSaveData = localStorage.getItem('av.' + para);
		return mimikoSaveData;
	}else{
		return null;
	};
};

//将数据存储至LocalStorage
function mimikoSave(key, content){
	if(window.localStorage){
		localStorage.setItem('av.' + key, content);
	};
};
function makeHTML(html)
{
  if (html==null) return "";
	html='<div name="box"><div id="hided" style="display: none">'+html+'</div><div id="hidder">您正在查看的内容含有您不喜欢的关键字已经被程序过滤，如需查看本条评论，请点击<a href="javascript:void(0)" onclick="$(this).parent().parent().children(\'#hided\').css(\'display\',\'inline\');$(this).parent().css(\'display\',\'none\');">这里</a></div></div>';
	return html;
}
function parseClear(para){
	var mimikoText=para?para.replace(/\n{4,}/g,'').replace(/\[hr\]/g,'').replace(/\[b\]([\s|\S]*?)\[\/b\]/g,'$1').replace(/\[i\]([\s|\S]*?)\[\/i\]/g,'$1').replace(/\[u\]([\s|\S]*?)\[\/u\]/g,'$1').replace(/\[font\=([\s|\S]+?)\](\S+?)\[\/font\]/g,'$2').replace(/\[size\=(\S+?)\](\S+?)\[\/size\]/g,'$2').replace(/\[s\]([\s|\S]*?)\[\/s\]/g,'$1').replace(/\[align\=(\S+?)\](\S+?)\[\/align\]/g,'$2').replace(/\[url\=(\S+?)\](\S+?)\[\/url\]/g,'$2').replace(/\[url\](\S+?)\[\/url\]/g,'$1').replace(/\[email\]([\s|\S]*?)\[\/email\]/g,'$1').replace(/\[emot\=(\S+?)\,(\S+?)\/\]/g,'').replace(/\[img\](\S+?)\[\/img\]/g,'').replace(/\[img\=(\S+?)\](\S+?)\[\/img\]/g,'').replace(/\[size\=(\d+?(?:px){0,1})\]([\s|\S]*?)\[\/size\]/g,'$2').replace(/\[color\=(\S+?)\]([\s|\S]*?)\[\/color\]/g,'$2'):'Error.';return mimikoText};

function parseJson(para){
	var mimikoJson = typeof(para) != 'object' ? unsafeWindow.$.parseJSON(para) : para;
	return mimikoJson;
};	
String.prototype.Left = function(len)
{

	if(isNaN(len)||len==null)
	{
		len = this.length;
	}
	else
	{
		if(parseInt(len)<0||parseInt(len)>this.length)
		{
			len = this.length;
		}
	}
	return this.substr(0,len);
}
var controlStringS = new Array();
var controlString = new Array();
function initKeyWord()
{
	controlStringS=mimikoLoad("keyWords");
	if (controlStringS==null) {controlStringS='';controlString= new Array();return;}
	controlStringS=controlStringS.split('\n');
	for (reg=0;reg<controlStringS.length;reg++)
	{
		controlString[reg]=new RegExp(controlStringS[reg]);
	}
    controlStringS=mimikoLoad("keyWords");
    if (controlStringS==null) controlStringS="";
}
initKeyWord();
//controlString=new Array(new RegExp("屌"),new RegExp("吊"));

        unsafeWindow.$("body").ajaxSuccess(function(event,xhr,options)
	{
		if (options.url.Left(23)=="/comment_list_json.aspx")
		{
		// 待过滤字符串
			var cache=parseJson(xhr.responseText);
			var reg;
			for(var i in cache.commentContentArr){
				var killonce=false;
				
				//alert(cache.commentContentArr['c'+cache.commentList[i]]);
				var precheck = cache.commentContentArr[i].content;//parseClear(cache.commentContentArr['c'+cache.commentList[i]].content);
				//alert(precheck);
				for (reg=0;reg<controlString.length;reg++)
				{   if (controlString[reg].exec("")!=null) continue;
					if (controlString[reg].exec(precheck)!=null)
					{
						killonce=true;break;
					}
				}
				if (killonce)
				{
					// 遍历所有这个评论，杀掉。
				//	alert("Kill  by "+controlString[reg]);
					var lists = unsafeWindow.$('div[id=c-'+ cache.commentContentArr[i].cid + ']');
					//alert(lists);
					//lists.html("fucl");
					lists.children(".area-simple-inner").children(".comment-comment").html(makeHTML(lists.children(".area-simple-inner").children(".comment-comment").html()));
					lists.children(".area-comment-right").children(".comment-comment").html(makeHTML(lists.children(".area-comment-right").children(".comment-comment").html()));
						//$('div[id=c-'+ "8013360" + ']')[0].children(".area-simple-inner").children(".comment-comment")
				}
			}
  		
		}
	}
	);
var profile = '<div id="page-backstyle">\
	<div id="inner">\
    	<div class="window">\
            <div class="title-window">过滤评论</div>\
            <div class="mainer">\
		       <label class="">\
		         请在下面的文本框中编辑过滤信息，一行一个，支持<a href="http://zh.wikipedia.org/zh-cn/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F">正则表达式</a>。\
			     <textarea style="width: 600px; height:250px" id="regkeyword"></textarea>\
		       </label>\
            </div>\
        </div>\
    </div>\
</div>';
function showPage()
{
    initKeyWord();
    unsafeWindow.$('#area-stage-right').empty().html(profile);
    unsafeWindow.$("#regkeyword").val(controlStringS);
}
if (window.location.href.split("#")[0] == "http://www.acfun.tv/config.html")
{
	unsafeWindow.$(unsafeWindow).ready(function(){var btn = unsafeWindow.$('<a class="btn-left" href="#target=keyword">评论过滤</a>');
	btn.insertBefore("#btn-apply");
	btn.bind("click",function(){
		
		unsafeWindow.$('a.btn-left-active').removeClass('btn-left-active');
		btn.addClass('btn-left-active');
		showPage();//alert("3");
	});});
	unsafeWindow.$("#btn-apply").bind("click",function(){
		mimikoSave("keyWords",unsafeWindow.$("#regkeyword").val().replace(/\r/,''));
	})
}
})();