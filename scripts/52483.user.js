// ==UserScript==
// @name           帮助百度读中文
// @namespace      http://emule-fans.com/
// @author         tomchen1989
// @homepage       http://emule-fans.com/baidu-chinese-helper/
// @description    帮助百度读中文，消灭链接显示乱码，消灭所有百度广告和竞价排名结果，添加其他搜索引擎链接
// @include        http://www.baidu.com/s*
// @include        http://www.baidu.com/baidu*
// @version        0.7.1
// ==/UserScript==

/*
This userscript(/Greasemonkey Script) is for the chinese search engine Baidu.com.

本脚本能够帮助百度读中文，消灭链接显示乱码，消灭所有百度广告和竞价排名结果，添加其他搜索引擎链接

具体介绍、使用方法、功能、注意事项、截图等等请见：http://emule-fans.com/baidu-chinese-helper/

更新：
ver 0.1 @ 2009-6-26
初始版本。
ver 0.2 @ 2009-6-27
缩减代码，修正一些bug，兼容BaiduMonkey脚本，兼容其他浏览器。
ver 0.3 @ 2009-6-29
兼容baidu++、baidu_ad等脚本，恢复无须隐藏的一些文字信息。
ver 0.4 @ 2009-6-30
乱码变中文和隐藏广告两功能分离，修正进行某些搜索时误隐藏搜索框或链接decode错误的bug。
ver 0.5 @ 2009-7-2
修正与BaiduMonkey、baidu++三者同时使用的bug，修正GBK等编码的URL误decode的bug，新增其他搜索引擎链接功能。
ver 0.6.1 @ 2009-7-3
修正搜狗搜索中文字词的bug，搜索引擎增至14个。
ver 0.7.1 @ 2009-7-8
无关键词时链接变普通文字，兼容新版baidu++1.0.0。
*/

(function () {

//设置。本脚本为轻型脚本，不打算使用GM setValue或cookies，请手动在这里修改搜索引擎链接设置
//想将其他搜索引擎设为默认显示的话，请将“,isdefault:true”移到那个搜索引擎的项的大括号结尾；另外您也可增/删项目，但要注意格式
var searchengines = {
	google:{name:"Google英文",url:"http://www.google.com/search?hl=en&q={searchterm}",isdefault:true},
	googlecn:{name:"谷歌中文",url:"http://www.google.cn/search?hl=zh-CN&q={searchterm}"},
	wikipedia:{name:"Wikipedia英文",url:"http://en.wikipedia.org/wiki/Special:Search?search={searchterm}"},
	wikipediazh:{name:"中文维基百科",url:"http://zh.wikipedia.org/w/index.php?title=Special:Search&search={searchterm}"},
	twitter:{name:"Twitter",url:"http://search.twitter.com/search?q={searchterm}"},
	fanfou:{name:"饭否",url:"http://fanfou.com/q/{searchterm}"},
	yahoo:{name:"Yahoo英文",url:"http://search.yahoo.com/search?p={searchterm}"},
	yahoocn:{name:"雅虎中文",url:"http://one.cn.yahoo.com/s?p={searchterm}"},
	bing:{name:"Bing英文",url:"http://www.bing.com/search?mkt=en-US&q={searchterm}"},
	bingcn:{name:"必应中文",url:"http://cn.bing.com/search?q={searchterm}"},
	flickr:{name:"Flickr",url:"http://www.flickr.com/search/?q={searchterm}"},
	dictcn:{name:"Dict.cn海词",url:"http://dict.cn/{searchterm}.htm"},
//	baidu:{name:"百度",url:"http://www.baidu.com/s?ie=utf-8&word={searchterm}"},
	sogou:{name:"搜狗",url:"http://www.sogou.com/web?query={searchterm}",noencode:true},
	youdao:{name:"有道",url:"http://www.youdao.com/search?q={searchterm}"}
};

//==函数==
//隐藏广告和竞价排名
function removeAdds() {
	try {
		if (!baidupp) {
			var tabless = document.getElementsByTagName("table");
			var len = tabless.length;
			var firstResultOcc = false;
			for (var i=0; i<len; i++) {
				var thistable = tabless[i];
				if (thistable.align=="right"){//右栏
					thistable.id = "sidebar";
					if (thistable.innerHTML!==""){
						var innertd = thistable.getElementsByTagName("td")[0];
						if (findEva(innertd,"a","a.href.substr(0,23)==\"http:\/\/tieba.baidu.com\/\"")) {
							var tiebatb = findEva(innertd,"a","a.href.substr(0,23)==\"http:\/\/tieba.baidu.com\/\"").parentNode.parentNode.parentNode.parentNode;//贴吧链接所在table
							tiebatb.id = "tiebatable";
						}
						var children = innertd.childNodes;
						for(var t=0; t<children.length; t++) {
							var dell = children[t];
							if(dell.style&&dell.id!="tiebatable"){
								dell.style.display="none";
							}
						}
					}
				} else
					if (findEva(thistable,"a","a.innerHTML==\""+unescape("%u767E%u5EA6%u5FEB%u7167")+"\"")){//真正搜索结果，“百度快照”escape防止编码问题
						if (!firstResultOcc) {//第一个
							firstResultOcc = true;
							var start = thistable;
							if (baidumonkey){
								start = thistable.parentNode;//BaiduMonkey的真正搜索结果被div包裹，取得那个div
							}
							for (var del=start.previousSibling; del.id!="sidebar"; del=del.previousSibling) {
							}
							for (del=start.previousSibling; del.id!="sidebar"; del=del.previousSibling) {
								if(del.style&&del.tagName.toLowerCase()!="ol"&&del.tagName.toLowerCase()!="p"){//隐藏右栏与第一个真正搜索结果之间所有可以隐藏的元素，保留ol（百度计算器）、p（文字信息）
									del.style.display="none";
								}
							}
						}
					}
			}
		}
	} catch (e) {
//		alert("removeAdds bug: " + e);
	}
}

//乱码变中文
function changeToZh(){
	try {
		var tdss = document.getElementsByTagName("td");
		for (var d=0; d<tdss.length; d++) {
			var thistd = tdss[d];
			if (thistd.className=="f"&&findEva(thistd,"a","a.innerHTML==\""+unescape("%u767E%u5EA6%u5FEB%u7167")+"\"")) {
				var font = findEva(thistd,"font","font.size==-1");
				var urllinefont = findEva(font,"font","font.color==\"#008000\"");
				var urlline = urllinefont.innerHTML;
				var kpos = urlline.lastIndexOf("K");
				var spacepos = urlline.lastIndexOf(" ",kpos);
				var orurl = thistd.getElementsByTagName("a")[0].href;
				var rslt = navigator.appVersion.match(/MSIE (\d+\.\d+)/, "");
				if (rslt !== null && Number(rslt[1]) <= 6.0) {
					orurl = escape(orurl);
				}
				try {
					orurl = decodeURIComponent(orurl);//这里如果对URL进行decode时throw出malform错误的话，可能是GBK等URL编码，百度已转换，所以不向下执行
					var pos = orurl.indexOf(":\/\/")+3;
					orurl = orurl.substr(pos);//把链接删去前缀“xxxx://”
					if (orurl.length>41) {
						orurl = orurl.substring(0,41)+" ...";//获得长度大于41的话截取前41并加上省略号，41似乎是百度默认
					}
					var niceurl = orurl;
					var niceurlline = niceurl+urlline.substr(spacepos);
					urllinefont.innerHTML = niceurlline;
				} catch (e1) {
//					alert("decodeURI malform: " + e1);
				}
			}
		}
	} catch (e) {
//		alert("changeToZh bug: " + e);
	}
}

//添加其他搜索引擎链接
function addOtherSEs() {
	try {
		var keywordinput = document.getElementsByName("wd")[0];
		var initkeyword = keywordinput.value;
		var oseoptions = "";
		for (var se in searchengines) {
			if (searchengines.hasOwnProperty(se)) {
				oseoptions += "<option value=\""+searchengines[se].url+"\"";
				if (searchengines[se].isdefault) {
					oseoptions += " selected=\"selected\"";
				}
				if (searchengines[se].noencode) {
					oseoptions += " class=\"noencode\"";
				}
				oseoptions += ">"+searchengines[se].name+"</option>";
			}
		}
		var changeSeLink = function() {
			var keyword = document.getElementsByName("wd")[0].value;
			var osesel = document.getElementById("ose_sel");
			var thisoption = osesel.options[osesel.selectedIndex];
			var url;
			if (thisoption.className=="noencode") {
				url = thisoption.value.replace(/\{searchterm\}/, keyword);
			} else {
				url = thisoption.value.replace(/\{searchterm\}/, encodeURIComponent(keyword));
			}
			var osea = document.getElementById("ose_a");
			if (keyword==="") {
				osea.removeAttribute("href");
			} else {
				osea.href = url;
			}
			document.getElementById("ose_kw").innerHTML = keyword;
		};
		var ht = "<label for=\"ose_sel\" id=\"ose_lb\">使用</label><select id=\"ose_sel\" style=\"height:18px;font-size:12px;\">"+oseoptions+"</select><a id=\"ose_a\" href=\"\" target=\"_blank\"> 搜索【<span id=\"ose_kw\" style=\"color:red;\">"+initkeyword+"<\/span>】 <\/a>";
		var bdhomea = findEva(document,"a","a.innerHTML==\"把百度设为主页\"");
		var ose = document.createElement("span");
		ose.id = "ose_span";
		ose.innerHTML=ht;
		bdhomea.parentNode.insertBefore(ose, bdhomea);
		bdhomea.style.display="none";
		addEventSimple(keywordinput, "keyup", changeSeLink);
		addEventSimple(window, "load", changeSeLink);
        window.setTimeout(function(){
			addEventSimple(document.getElementById("ose_sel"), "change", changeSeLink);
        }, 100);
	} catch (e) {
//		alert("addOtherSEs bug: " + e);
	}
}

//返回元素el中第一个标签为tag且满足条件evaStr的节点，如果找不到即返回false
function findEva(el,tag,evaStr){
	var tags = el.getElementsByTagName(tag);
	var has = false;
	var len = tags.length;
		for (var i=0; i<len; i++) {
			eval("var "+tag+"=tags[i]");
			if (eval(evaStr)){
				has = true;
				return eval(tag);
			}
		}
	if (has === false) {
		return false;
	}
}

//跨浏览器的绑定事件
function addEventSimple(obj, evt, fn){
	if (obj.addEventListener) {
		obj.addEventListener(evt, fn, false);
	}
	else
		if (obj.attachEvent) {
			obj.attachEvent('on' + evt, fn);
		}
}

//==运行==
changeToZh();
addOtherSEs();
addEventSimple(window, "load", function() {
	baidupp = findEva(document,"a","a.innerHTML==\""+unescape("%5B%u8BBE%u7F6Ebaidu++%5D")+"\"") ? true : false;//检查是否使用baidu++
	baidumonkey = findEva(document,"div","div.className==\"bm_MultiColDiv\"") ? true : false;//检查是否使用BaiduMonkey
	removeAdds();
});

})();