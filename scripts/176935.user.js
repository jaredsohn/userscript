// ==UserScript==
// @name       Search_Jump_go2chenhua
// @namespace  https://userscripts.org/users/chenhua
// @version    3.1.2
// @description  搜索引擎快速跳转
// @include http*://*.google.*/*
// @include http*://*.baidu.*/*
// @include http*://*.bing.*/*
// @include http*://*.soso.*/*
// @include http*://*.sogou.*/*
// @include http*://*.youdao.*/*
// @include http*://*.yahoo.*/*
// @include http*://so.360.cn/s*
// @include http*://shooter.cn/search/*
// @include http*://*.56pan.*/*
// @include http*://*.picsearch.*/*
// @include http*://*.flickr.*/*
// @include http*://*.wikipedia.org/*
// @include http*://dict.hjenglish.com/*
// @include http://ishare.iask.sina.com.cn/search.php*
// @include http://search.jd.com/Search?*
// @include http://s.taobao.com/search*
// @include http://list.tmall.com/*
// @include http://www.amazon.cn/s*
// @include http://search.dangdang.com/?key=*
// @include http://sse1.paipai.com/*
// @include http://s.etao.com/*
// @copyright  2012+, NLF http://userscripts.org/scripts/show/84970
// ==/UserScript==

(function(topObject,window,document){
//判断执行环境,opera,firefox(GM),firefox(scriptish),chrome;
var envir=(function(){
var envir={
fxgm:false,
fxstish:false,
opera:false,
chrome:false,
unknown:false,
};
var toString=Object.prototype.toString;
if(window.opera && toString.call(window.opera)=='[object Opera]'){
envir.opera=true;
}else if(typeof XPCNativeWrapper=='function'){
if(topObject.GM_notification){//scriptish的新api
envir.fxstish=true;
}else{
envir.fxgm=true;
};
}else if(typeof window.chrome=='object'){
envir.chrome=true;
}else{
envir.unknown=true;
};
return envir;
})();

//未知环境,跳出.
//if(envir.unknown)return;
function init(e){
if(document.body.nodeName=='FRAMESET')return;

var prefs={//一些设置.
dropDownList:{//下拉列表
showDelay:99,//显示延时.
hideDelay:333,//隐藏延时.
horizontal:false,//横排下拉列表
transition:true,//下拉列表动画.
},
favicon:false,//加载站点图标 czw
margin:8,//展开的引擎之间的间距.
openInNewTab:false,//是否在新页面打开.
all_frames:false,//所有框架上加载,否则只在顶层框架.
debug:false,//输出debug信息(影响速度,并且可能对你完全没有作用,你最好关闭它..-_-!~);
};

if(!prefs.all_frames){//frame
if(window!=window.parent)return;
};

prefs.icons={
dropDown:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAJCAYAAAD+WDajAAAAQElEQVR42rWKsQkAIAwEfygrG1s7  53CFbOImbhf9IqKBlB4chL9AVUN/xZTbjOSHlNqHlzsIDx+2OHC4A32wYC4oDZXgXXU8QAAAAABJ  RU5ErkJggg==',
};

//全局样式.
prefs.style='\
/*sapn display化*/\
.sej_display-block{\
display:block;\
}\
/*显示在前面的展开列表的类型,比如 网页,音乐,下载等.*/\
.sej_expanded-list-type{\
margin:0;\
margin-right:10px;\
font-weight:bold;\
color:red;\
}\
/*下拉列表和展开的列表字体全局设置*/\
.sej_container,\
.sej_drop-down-list{\
font-size:14px;\
line-height:1.7;\
}\
/*展开的列表*/\
.sej_container{\
padding:0;\
margin:0;\
border:none;\
height:auto;\
width:auto;\
}\
/*favicon设置*/\
.sej_container img,\
.sej_drop-down-list img{\
display:inline-block;\
vertical-align:middle;\
margin:0;\
border:none;\
padding:0;\
width:16px;\
height:16px;\
}\
/*下拉列表的下拉箭头*/\
.sej_container .sej_dropdown-icon{\
width:auto;\
height:auto;\
border:none;\
margin-left:2px;\
}\
/*展开列表*/\
.sej_container a{\
margin:0;\
margin-right:'+prefs.margin+'px;\
cursor:pointer;\
color:blue;\
text-decoration:underline;\
background:none;\
border:none;\
-o-transition:color 0.5s ease-in-out;\
-moz-transition:color 0.5s ease-in-out;\
-webkit-transition:color 0.5s ease-in-out;\
transition:color 0.5s ease-in-out;\
}\
/*下拉列表*/\
.sej_drop-down-list{\
line-height:2.0;\
margin:0;\
padding:0;\
border:1px solid #BCBCBC;\
position:absolute;\
height:auto;\
width:auto;\
min-width:100px;\
overflow:hidden;\
background:none;\
background-color:white;\
background-image:-moz-linear-gradient(top,white,#F2F2F2);\
background-image:-webkit-gradient(linear, 0 0, 0 100%, from(white), to(#F2F2F2));\
background-image:-webkit-linear-gradient(top,white,#F2F2F2);\
background-image:-o-linear-gradient(top,white,#F2F2F2);\
background-image:linear-gradient(top,white,#F2F2F2);\
-moz-border-radius:8px;\
border-radius:8px;\
'+(prefs.dropDownList.transition? ('\
-o-transition:opacity 0.3s ease-in-out,height 0.2s ease-in-out;\
-webkit-transition:opacity 0.3s ease-in-out,height 0.2s ease-in-out;\
-moz-transition:opacity 0.3s ease-in-out,height 0.2s ease-in-out;\
transition:opacity 0.3s ease-in-out,height 0.2s ease-in-out;\
') : '')+'\
-moz-box-shadow:1px 1px 2px rgba(0,0,0,0.2);\
-webkit-box-shadow:1px 1px 2px rgba(0,0,0,0.2);\
box-shadow:1px 1px 2px rgba(0,0,0,0.2);\
}\
.sej_drop-down-list a{\
display:block;\
color:blue;\
border:none;\
padding:0 6px;\
margin:0;\
text-decoration:none;\
text-align:left;\
background:none;\
}\
/*已访问的a元素*/\
.sej_drop-down-list a:visited,\
.sej_container a:visited{\
color:#551A8B;\
}\
/*a元素悬浮*/\
.sej_container a:hover{\
color:red;\
text-decoration:none;\
}\
/*下拉列表a元素悬浮*/\
';
//-----------------------
if(prefs.dropDownList.horizontal){
prefs.style+='\
.sej_drop-down-list{\
min-width:0;\
line-height:2.6;\
}\
.sej_drop-down-list a{\
float:left;\
}\
.sej_drop-down-list a:first-child:hover{\
border-radius:8px 0 0 8px;\
-moz-border-radius:8px 0 0 8px;\
}\
.sej_drop-down-list a:last-child:hover{\
border-radius:0 8px 8px 0;\
-moz-border-radius:0 8px 8px 0;\
}\
'
};


var siteInfos=[
//网页搜索/////////////第一个可以当模板看///////////////////////////////////////////////////////////////////////////////
{name:"google网页搜索",//你要加载的网站的名字(方便自己查找)

//是否启用.
enabled:true,

//在哪个网站上加载,正则.
url:/^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?(?:.(?!&tbm=))+$/i,

//例子(方便了自己读,此项可以没有)
example:"http://www.google.com/search?client=opera&rls=ja&q=opera&sourceid=opera&ie=utf-8&oe=utf-8&channel=suggest",

//加载哪个类型的列表: web(网页),music(音乐),video(视频),image(图片),download(下载),shopping(购物),translate(翻译),空字符串或者没有此项(不加载列表,所有的列表全部下拉.)
engineList:"web",

//给引擎列表的样式
style:'\
z-index:999;\
padding-left:78px;\
border-bottom: 1px solid #DEDEDE;\
',

//插入文档,相关
//target 将引擎跳转工具栏插入到文档的某个元素(请使用xpath匹配,比如: '//*[@id="subform_ctrl"]'  或者 css匹配(请加上 'css;' 的前缀),比如: 'css;#subform_ctrl' );
//keyword 使用 xpath 或者 css选中一个form input元素,或者此项是个函数,使用返回值.
//where 四种:'beforeBegin'(插入到给定元素的前面) ; 'afterBegin'(作为给定元素的第一个子元素) ; 'beforeEnd' (作为给定元素的最后一个子元素) ; 'afterEnd'(插入到给定元素的后面);
//style 可选.
//此项可以使用数组,候选多个对象,常用来,兼容改版的中的网站.
insertIntoDoc:{
target:'css;#rcnt',
keyword:'//input[@name="q"]',
where:'beforeBegin',
},
},
//----------------------------------------------------------------
//---------------------------------------------------------------
{name:"baidu网页搜索",
url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu)/i,
enabled:true,
engineList:"web",
style:'\
padding-left:0px;\
margin-top:10px;\
margin-bottom:2px;\
',
insertIntoDoc:{
keyword:'css;input#kw',
target:'css;#head',
where:'beforeEnd',
},
},
{name:"必应网页搜索",
url:/^https?:\/\/.*\.bing\.com\/search/i,
enabled:true,
engineList:"web",
style:"\
margin-top:10px;\
padding-left:55px;\
margin-bottom:2px;\
",
insertIntoDoc:{
keyword:'css;#sb_form_q',
target:'css;#sw_abar',
where:'beforeBegin',
},
},
{name:"有道网页搜索",
url:/^https?:\/\/www\.youdao\.com\/search/i,
engineList:"web",
enabled:true,
style:'\
position:relative;\
z-index:100;\
padding-left:135px;\
border-bottom:1px solid #D4E9F7;\
',
insertIntoDoc:{
keyword:'css;#query',
target:'css;#ctn',
where:'beforeBegin',
},
},
// czw
{name:"360搜索",
url:/^https?:\/\/so\.360\.cn\/s/i,
enabled:true,
engineList:"web",
style:'\
padding-left:0px;\
margin-top:10px;\
margin-bottom:2px;\
',
insertIntoDoc:{
keyword:'css;input#keyword',
target:'css;#head',
where:'beforeEnd',
},
},
/*图片搜索*/
{name:"百度图片",
url:/^https?:\/\/image\.baidu\.com\/i/i,
enabled:true,
engineList:"image",
style:'\
border-top:1px solid #ccc;\
border-bottom:1px solid #ccc;\
',
insertIntoDoc:{
keyword:'css;input#kw',
target:'css;#search',
where:'beforeEnd'
}
},
{name:"谷歌图片",
url:/^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/search\?(tbs=sbi)|(.*tbm=isch)/i,
enabled:true,
engineList:"image",
style:'\
border-top:1px solid #ccc;\
border-bottom:1px solid #ccc;\
',
insertIntoDoc:{
keyword:'css;input[name=q]',
target:'css;#top_nav',
where:'beforeBegin'
}
},
{name:"bing图片",
url:/^https?:\/\/.*\.bing\.com\/images\/search/i,
enabled:true,
engineList:"image",
style:'\
border-bottom:1px solid #E6E6E6;\
margin-top:75px;\
',
insertIntoDoc:{
keyword:'css;#sb_form_q',
target:'css;#sw_hdr',
where:'beforeEnd'
}
},
{name:"搜搜图片",
url:/^https?:\/\/image\.soso\.com\/image/i,
enabled:true,
engineList:"image",
style:"\
text-align:left;\
padding-left:10px;\
border-top:1px solid #D4E9F7;\
border-bottom:1px solid #D4E9F7;\
margin-top:3px;\
",
insertIntoDoc:{
keyword:'css;#sb',
target:'css;#result',
where:'beforeBegin'
}
},
{name:"搜狗图片",
url:/^https?:\/\/pic\.sogou\.com\//i,
engineList:"image",
enabled:true,
style:"\
border-top:1px solid #BFBDEA;\
border-bottom:1px solid #BFBDEA;\
padding-left:10px;\
",
insertIntoDoc:{
keyword:'css;#form_querytext',
target:'css;.searchnavbox',
where:'beforeBegin'
}
},
{name:"有道图片",
url:/^https?:\/\/image\.youdao\.com\/search/i,
engineList:"image",
enabled:true,
style:"\
padding-left:10px;\
border-top:1px solid #EBF1FF;\
border-bottom:1px solid #EBF1FF;\
",
insertIntoDoc:{
keyword:'css;#query',
target:'css;#w',
where:'beforeBegin'
}
},
{name:"雅虎图片",
url:/^https?:\/\/image\.yahoo\.cn\/s/i,
engineList:"image",
enabled:true,
style:"\
text-align:left;\
padding-left:10px;\
border-top:1px solid #D4E9F7;\
border-bottom:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#qtop',
target:'//div[@class="main_content"]',
where:'beforeBegin'
}
},
{name:"flickr",
url:/^http:\/\/www\.flickr\.com\/search\/\?/i,
engineList:"image",
enabled:true,
insertIntoDoc:{
keyword:'css;#gn-search-field',
target:'css;#global-nav',
where:'afterEnd'
}
},
{name:"picsearch",
url:/^http:\/\/cn\.picsearch\.com\/index\.cgi/i,
engineList:"image",
enabled:true,
style:"\
margin-top:80px;\
",
insertIntoDoc:{
keyword:'css;input[name=q]',
target:'css;#header',
where:'beforeEnd'
},
etc:function(){document.getElementById("search-header").style.height='83px';}
},
 {name:"pixiv",
url:/^http:\/\/www\.pixiv\.net\/search\.php/i,
engineList:"image",
enabled:true,
style:"\
margin-left:20px;\
",
insertIntoDoc:{
keyword:'css;input[name=word]',
target:'css;.header',
where:'afterEnd'
}
},
{name:"jpg4",
url:/^http:\/\/img\.jpg4\.info\//i,
engineList:"image",
enabled:true,
style:"\
//margin-top:300px;\
",
insertIntoDoc:{
keyword:'css;input[name=feed]',
target:'//div[@align="center"]',
where:'beforeEnd'
}
},
//下载//////////////////////////////////////////////////////////////////////////////////////
{name:"射手字幕",
url:/^https?:\/\/shooter\.cn\/search/i,
engineList:"download",
enabled:true,
insertIntoDoc:{
keyword:'css;#key',
target:'css;#site_header',
where:'afterEnd',
},
},
{name:"我乐盘",
url:/^https?:\/\/www\.56pan\.com\/s\.php\?/i,
engineList:"download",
enabled:true,
style:"\
margin-buttom:20px;\
",
insertIntoDoc:{
keyword:'css;#keyword',
target:'css;.wp_serach',
where:'afterBegin',
},
},
{name:"新浪爱问共享",
url:/^https?:\/\/ishare\.iask\.sina\.com\.cn\/search/i,
enabled:true,
engineList:"download",
style:'\
',
insertIntoDoc:{
keyword:'css;input#is',
target:'//table[1]',
where:'afterEnd'
},
},
/*购物*/
	{name:"一淘",
url:/^https?:\/\/s\.etao\.com\/search/i,
enabled:true,
engineList:"shopping",
style:"\
	margin-left:325px;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#J_searchIpt',
target:'css;#etao-header',
where:'afterEnd'
}
},
{name:"京东",
url:/^https?:\/\/search\.jd\.com\/Search\?/i,
enabled:true,
engineList:"shopping",
style:"\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#key',
target:'css;#nav-2013',
where:'beforeBegin'
}
},
{name:"淘宝搜索",
url:/^https?:\/\/s\.taobao\.com\/search/i,
enabled:true,
engineList:"shopping",
style:"\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#q',
target:'css;.tb-header',
where:'beforeEnd'
}
},
{name:"天猫",
url:/^https?:\/\/list\.tmall\.com\/\/?search/i,
enabled:true,
engineList:"shopping",
style:"\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#mq',
target:'css;.main  ',
where:'beforeBegin'
}
},
{name:"亚马逊",
url:/^https?:\/\/www\.amazon\.cn\/s\/ref/i,
enabled:true,
engineList:"shopping",
style:"\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#twotabsearchtextbox',
target:'css;#navbar',
where:'beforeEnd'
}
},
{name:"当当",
url:/^https?:\/\/search\.dangdang\.com\/\?key/i,
enabled:true,
engineList:"shopping",
style:"\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#key_S',
target:'css;#bd',
where:'beforeBegin'
}
},
{name:"拍拍",
url:/^https?:\/\/sse1\.paipai\.com/i,
enabled:true,
engineList:"shopping",
style:"\
text-align:left;\
padding-left:125px;\
border-bottom:1px solid #E5E5E5;\
border-top:1px solid #E5E5E5;\
margin-bottom:3px;\
",
insertIntoDoc:{
keyword:'css;#KeyWord',
target:'css;.pp-header',
where:'beforeEnd'
}
},
/*词典*/
{name:"有道词典",
url:/^https?:\/\/dict\.youdao\.com\/search/i,
enabled:true,
engineList:"dict",
style:"\
text-align:center;\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#query',
target:'css;#scontainer',
where:'beforeBegin'
}
},
{name:"爱词霸",
url:/^https?:\/\/www\.iciba\.com/i,
enabled:true,
engineList:"dict",
style:"\
text-align:center;\
margin-top:85px;\
",
insertIntoDoc:{
keyword:'css;#s',
target:'css;.header',
where:'beforeEnd'
}
},
{name:"海词",
url:/^https?:\/\/dict\.cn\/./i,
enabled:true,
engineList:"dict",
style:"\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#q',
target:'css;.top',
where:'beforeEnd'
}
},
{name:"沪江英语",
url:/^https?:\/\/dict\.hjenglish\.com\/(en|w)/i,
enabled:true,
engineList:"dict",
style:"\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#w',
target:'css;#header',
where:'beforeEnd'
}
},
{name:"沪江日语",
url:/^https?:\/\/dict\.hjenglish\.com\/(404\/)?jp/i,
enabled:true,
engineList:"dict",
style:"\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#w',
target:'css;#header',
where:'beforeEnd'
}
},
/*翻译*/
{name:"google翻译",
url:/^https?:\/\/translate\.google\./i,
enabled:true,
engineList:"translate",
style:"\
text-align:center;\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#source',
target:'css;#gt-c',
where:'beforeBegin'
}
},

{name:"百度翻译",
url:/^https?:\/\/fanyi\.baidu\.com/i,
enabled:true,
engineList:"translate",
style:"\
text-align:center;\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#user-input',
target:'css;.mis-wraper',
where:'beforeBegin'
}
},
{name:"有道翻译",
url:/^https?:\/\/fanyi\.youdao\.com/i,
enabled:true,
engineList:"translate",
style:"\
text-align:center;\
",
insertIntoDoc:{
keyword:'css;#inputText',
target:'css;.c-topbar',
where:'beforeBegin'
}
},
{name:"爱词霸翻译",
url:/^https?:\/\/fy\.iciba\.com/i,
enabled:true,
engineList:"translate",
style:"\
margin-top:100px;\
border-bottom:1px solid #D4E9F7;\
border-top:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#inputC',
target:'css;.h',
where:'beforeEnd'
}
},
//知识/////////////////////////////////////////////////////////////////////////////////////////
{name:"百度百科",
url:/^https?:\/\/baike\.baidu\.com/i,
enabled:true,
engineList:"knowledge",
style:"\
margin-bottom:8px;\
",
insertIntoDoc:{
keyword:'css;#word',
target:'css;#search',
where:'afterEnd',
},
},

{name:"百度知道",
url:/^https?:\/\/zhidao\.baidu\.com/i,
enabled:true,
engineList:"knowledge",
style:"\
margin-left:18px;\
margin-top:8px;\
margin-bottom:8px;\
",
insertIntoDoc:{
keyword:'css;#kw',
target:'css;#header',
where:'afterEnd',
},
},

{name:"搜搜问问",
url:/^https?:\/\/wenwen\.soso\.com\/z/i,
engineList:"knowledge",
enabled:true,
style:"\
text-align:left;\
padding-left:115px;\
margin-top:16px;\
margin-bottom:16px;\
border-bottom:1px solid #D4E9F7;\
",
insertIntoDoc:{
keyword:'css;#sb',
target:'css;#s_header',
where:'afterEnd',
},
},

{name:"wikipedia",
url:/^https?:\/\/.*\.wikipedia\.org/i,
engineList:"knowledge",
enabled:true,
style:"\
margin-top:-16px;\
margin-bottom:8px;\
",
insertIntoDoc:{
keyword:'css;#searchInput',
target:'css;#content',
where:'afterBegin',
},
},
];

//站点的base64图标
var icons={
google:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaXTPUvDQBgH8HyzkiCVdlBcFD+CDgUn0bU5rUMRS6mD4BuCVgfFKmitCl0s+FKhvoEgVvsyWKuRS9JLcvm7tcplSHW44e6e5/c8x91JAaKFZJXWFELRzZBVWgsQLST9JfknInlt9ExRJLMMqSOG67ID7gLb5xbG100h1hNIFyzM51gbu61wnN7Znl14Al+GC7LTas9nMi20bPgHPnUXmatOxbE1E89v3D8wd8DAbGBiw0R/XMfupY3RJcM/oBCKkUUDiUMGF/h1HN+AQiiC0xSa4aL04mBgVvcPTKZNbBYspHIMy3mGJnXx+s4xmBARAVg4Ybh4ctAb66wNJXSUGxx7RfEqBaDa5EgdMSEwmWXIlnwA+Qcb5QbHcLLTbjBGcfboILLq4yX2xXVsFSzUP1zcVzmOb2zsF21EVsRkhVD89zPVJTmqhWWV1rsGVFqRo1r4G6iM33AbQTj+AAAAAElFTkSuQmCC'
,baidu:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABWUlEQVQ4jaWSy0sCURjF/XfuRugukha1CzeBCBKIFFFIBEGrCoRwE4EErlskoYW0EFy0iBAkCMFNBCGuKrqjNg6OgzOTjY+5nhbh3ehMrw/O8vud73E8hDL8Rx5CGf5ajoBCsQuvT0IubwIATk51xA/bsPkPAdFtBYQyLIXeUCpbYtybQtcd0Na+LHb2WiCUYTXaRC5vCsBdyXIG3D/0QCjD2qaCl9cB9g9UPFb66OgcuzEVmayBpmKjVLamAxJJTTg9PQ+mHm1+sQ5CGS4ujUlAJmuAUIaZOQkdnaNS7SMYlhGKyKjVh7B6I2EQi6uTAJsDV9fvqFT7YNIQsws10eAPNNDWODa2FHh9Eoq3H85faKk2/IHGRGCWV2RYvZH7Fzo6n9o8VmS9CcPkzoBUWv82umfnhjNgfEg3pdK6M8AwuUihP9DA0bGGRFJDMCyLYLmu8NsSgP/oExgMERjFwInkAAAAAElFTkSuQmCC'
,bing:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAz0lEQVQ4jWP4v0z0PyWYgToGbHf8/39PAIQmy4CXR/////8fQlPNgDUqEFcRcBmqAe8u//9/Y+b//18e/ccKHm+DGIjTABj48uj//8tdCBccz0VVc285HgPuLYc4H5uTj+ci1N2YicMAXJph+N5yiLqfH5AMeLwN4XRCIX+5C2EZ3ICz1QhBtEBCwWtUEAEMtQyREt9dRjjtbDWm5j0BqGqgUcuAYvqNmQiX/PwACZuXR1Gj9d1llHSBmRc2GkFc8HgbwoCXRxHRSpvMRAEGADs5Dn5/MAjJAAAAAElFTkSuQmCC'
,youdao:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAyklEQVQ4jc1QsQ3CMBB0R5seJJ/F2wPQpUtHSwN1RoiYgA0YgVEYIQNQuEFCiS1lhNDg5IE4gQpO+ub0d39/QvwVaujcK9N6ZVoP3dwACCFErWjH+VGTblGZNhhYIOF8VHyd06K/ZOwU/wYnacWingJfSUoD76DPUYPnRSq6bhRte94c4gagNbtUOlBWSUqdpH2fbLn57IXIhGIHcRE043FDaTxVVDwECyTcoIbORwUO+uhA2WOKr6/H/nbQpQWSaQPo5lU4GfvnuAOO7rs1HAnRyQAAAABJRU5ErkJggg=='
,soso:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADRklEQVQ4jX2TXUxTdxjG/zcDGwsChQDObJpocCaObFjEaRbC/Ihfp8scc2Y6Z7hQo/MjmkWZmG0mWxbGiB9REBWHRSwo00EmTHJKLUwRZVVai6UTVMI5pz3l9PxPe6Acuse7ZmDik/xunvd536v3IWSKVMcbueHeab+FnPHuUF98NOyNmxjp1zl8A7rjgx79O1PzkxR6oCuXu6dH+LtJGLyTAm+nAf33DHjSY4DHmYI+T7L60Jty8JXFF38TndI1/WGgIxFP2VS4rEYMuo7AN2QBP1SHfncxbnfkoP3eLNh6M9Hmzmypd5G42IFwl+76SGcivLfS8Mz5PbTxMKLR6CQi4wq6nCWwdMzDNccc1D+aU0YIIUSx6QtCNn10iDVg2HMKmqZB0zQ84WQwpTbkFbcie38T5u9rgpeT0eWpxNnOBah6kDVR0TN3AQm3zmgcaUnGAJuPsTEVkUgEghRCwY825B2+iTN/eWC+/RRlN1xQwqMYGxtFhX0DfrmTjZ+7F5aRUGPysHg1FbzzHFRVhaqqsLqG8V4Ji+xdjTHv/7Q8Po9iay6O2HMek5A5RfNdTIfP2w5KKSil4PwSlv/Qhvm7r+ODg82wPXoem1FKcX/Aht23lmJve16QKGfSNP/JmRDcLCRJisH5RJTUdOPtbRa8+cVlNFjdsdndf+3Y3FyAra35IUJLM16M/DQTw2wFRFGcRCAQQF2bC+lf1cNU3BTzLQ4LPv5jJTbc+KiPyMcyauSjmRDK14DneQiCgHVH/8T2chaHKu3I2nYFaV824MAJFoIggOd57Ly5HyuursYqy6oqIn+bkUu/SZ8I7k0H13QSHMfhra11SGQuQL/2PGZ/fgk7Stvg84vgOA61Pb9jSS2DZeZ1E0tr1iwihBBC96RdUHamQi4ygK89Bp7nIYoiKFUgyzIkKYhAIIBLPdewxPwJjNUmGM+tvxj7RFchiVOKDFZlSxLkTQmQDufDz9Yj+h+gRjT8M9SPr5tPYbHZBGO1CTmVjH3uidXxr3SCbko4QD/Tq8GNieALkzA+HoE/LOHDK0VYfNkEYzUzuqiK+e61jaSF8VnSpwm/CoUzHEH/MyxrYJBnMfUaa5jT71cx707NvwSLTnSYYmL1KgAAAABJRU5ErkJggg=='
,sogou:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB0klEQVQ4jZ3Sv2sUQRQH8FdsZSURK0tB8D/Qa3Iii1oIwcIuSnoLf4AigkUgWqQXLhgQQgqxDUHsrCTFtoJL4G53dmcvs7t37M3uODur97WYuPFMUM8Hr5vvZ+bxhvr9/mIQBHtBEOCkDsMQjDEwxhBFEeI4Bud8L0mSRSIiGgwGSfzgCrjr/Hs/vArGWEZEpykIgvnChy2EABF1ZoDh7XMo367D+B6mSuLX+j5K8PXju/ZslmUgom4LiJWL+JZGbaBhX1DtbKDa2YB6/wbG92B8rwXyPLdAGIbgroNqd3PmxvzJtT+OMB6PLcAYA3cdFK/u4/eqP3+C3F5D/uwmkqUzM0BRFBaIouhIXV+B9j5gqtUxbKoV5PYakhunwF0HUkoLxHF84hPTe5cwef0UxvdmILm1Cu46KMvSApzzNjR6voSD5fNHW7l19thoPzehlLLAcDhsA3+rqVbIHtlPp7W2gBCiBardzXZdTbxv1xnvw/ge5NYqxN0L7dm6ri2Qpul//URjjAWyLIsOXtyZKzx6uQwpZUpEXcrz/LoQIiuKApPJBFJKlGWJqqqglILWGnVdwxgDYwyapkFVVXmv13tMRJfpsBaIqENE3Tm6Q0QLPwAGVa1p0zMtjwAAAABJRU5ErkJggg=='
,so360:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB6klEQVQ4jaXOz2oTURQG8Ltv7vEZAl1Jsm3VZO7ccdqNlK4sBFd9k0IoCD5BaRYKVtRi5l8zmZTY0o5NoVuhI9KFRbGpLaSkDYEk1s/FnTGDC6l64bf5zncPhxlhRjdDOph5dwt/wwzpwAgzOjN3eXsmJPwLc5e3mblD+B/M3CaklVq3sfPNweWwg8thB60zH4/28/i9l2D3m4TEYmsKF4NzPP34GAvNHBaaOVQ+lHExOMdiawrpboIZmwRjkyAbhL1THyuHSyg6HJqnFB2O1aiMvVMfsqG6acxoEIwGQfcJ/VEP88Ek9BqHDAgyIOg1jrl6Fv1RD7qvumlM1gmyThAex9Wwi/lgEtJXmawTpE+YC7LoDjoQHh/nMSZ9VRIux/YXGyuHS5A1lUmfIGuE1aiMt5/fQLh8nMeYrKmScAkP6zmc9b+iEpVR2sqjtJVHJSpjeD1QFzgcST/B9A2CvkEQHqFocTxws/A/reGkd4yT3jGeRU+QvKthF8JT/QTTPUJCOIRilaOwznHvdewVx/Ra5teS/qgH4Y7/MN0lpAmHoFkErcpjhMI6x/TzDK5/fEfl/TI0a9xnwlGf/kSz1ZI7LzK4+5JDs8YzJhzevumSYlVdJ+wk521WsCZmhU1Hwo4HN3dUsCZmfwKCejnLHZeJTwAAAABJRU5ErkJggg=='
,yahoo:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+ElEQVQ4jd1SIY7DMBC09gl9Qh/QR+QJeUJgQGBAZFQYUFAYYGhoEBhZfoF1oPBAYEBBeZRIU7Su7d49oF1pJFvyzM54V4jvKSs9TOVwPqgEupxgpUf8tqMBjEDOiTE6GhKRRIDJs1vANbsF15NB/DAW4bsqRghdTqGTqRwAwEqPjgZs645t3XG/PdBSj+vJJAJWeojc7o/6xbbu0OWEbd1hpUdLPWpq0FIPIYRgd38KnA8K99sjOKmpCeBPU8X4+sA4AsNKDwAJuaYmRDCVC2fBeRmzW5Ls7CKfxNsO5N1y6/kYVTHiTcRUDpejDsT/Fuly1K8In19PFuNJ1DwtkQEAAAAASUVORK5CYII='
,picsearch:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhElEQVQ4jWNgYGhggmA4YIRgqFhoKDNCDBkj9DEiNKIYhCyHDSCph9iCJAg3HWF42kxJiZLVDrZd26zNG7bxIRuO5AJ0VyAZEr+gsWHTlb9////7///P/ySGBrgcFtuw0YmLOjt3X/r////f/////s9FCg8GBoyATFssKV6ySlGsaqM4XCxxSUjwzMP79t14tX/35ecOUBcwMDCkzWRFCZroJXy8eSsuX3r8/svnH3/unL//XgDJO8gug7ORo4eBIWG+gEDx2i9ffvz+////379fvvyXYMCMDUacHIaE+RzsOcu3bLn46NrV5+/3bDxygxdLmDCiuQqDw8jgOYmdAWfAIgd60lIlpZrNe/fefHXwwO3ndQxYAbL/G5gYHBpYEPzMRfb2Pbsg0fP//34GLIGExXYkscwFxkZt23/8+PP3548//9agOrGBiSG0gY0BJYGh02kzWRnSl2hpNqzTUancJorD36gxheYSdA3IgBEtlSKnG5gc1CTkgIGwsdgINwwuDgBS3ZJW3iTxKgAAAABJRU5ErkJggg=='
,taobao:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAqUlEQVQ4jaWTsRGAIAxFs4Gj0DgGtTtQOIY7sAO1EzCOOxgLiCQRUfTf/TtE/zPBCAAAGAPiMvU5BgQRJjkj1zfe7JAguEw5tKfQPBYAX5NWn/YzpADmsQRWLyHcdP8C0IGa+H4TUGtFgy8AZ2Tp3RVwgH7b6wpaLfw6g8cWuGpnwStErHxG/aA2Vw4XQAxpLBtj2xxl+h82OwgQXd/5DGudpX0VOtMVPgBRELV9pv7F+wAAAABJRU5ErkJggg=='
,huihui:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACnklEQVQ4jXWSX2jVZRzGfzszqKVYkovIdtmFQRfRRaDgvdGVDaob2SYcJhwCh24kxHRsx+RkojKXF8IUFk2nYSMlpXMXLVwbYv9mKWzNXdSca3/e3/t9f+/z6eJM3cm6eHi+7/PAlw8v38QOJPjORP/l1rVGVlyHdT8p66x5rHdNiRI7kGAHawlHG7BPGqo8u1yAv/8g/nQeX9qCFat711JDZUHpecWpG8SpG1Wu+zMC0PI9ae4O8e6PVb3LP10h8B8mpIU6fM/WKoXySQDib1fIru7Dn9iO79lKuv9l0t21uKZkhaCrVmHgTaQoBYeCq3hmFYLMqvJ4+5p813Or/uDQeuIPp5BfIE5cJXxznFA+Tvz92wrBr2VCeSW79TWyJdK2hlUEhzcoTnyJ0nll4+ew/rzsTCvZ6EUBZN8NyM60Yv15xfHPkV9Q2tbA8s4HBKV6NP09mp0kDBcJw0Xi6Hnk5oi/lB9mYbiIZqcA/kXw8QvS/BTxzzuyoQ5sqF3ZyFnk5pTdvIwNtcuGOgiXDkqzk8gvKt2zaRXBkReRuwe2BLaI/CJkKQBkvvK2RYgBQgq2RNq26RGB73pK/mQjvvdtWd97+L53/997G/F978jl61YIeuqIN88RzjZipc1k1wcJAzvx7UmVwoUC2dgXWGkzoX8H2fVBXL6OxIpr0cyY4sQl7NRr0vwkuj+p+PMF4sgxxdFPiRPD0sIM8e6oQu8rxNvXRMxwreuUWGcO3/06cew02dggdmI7uvUV+IWKbAkt/0Uc78cffoM4chpNj+A/2oZrzpFYZ4L/oEau8Czp3nr5jidwhQ3yxVcJn70lf3QLru0lucIz+H05pXs34t6vl9+fq1yia0lwzQmuaUUP5uYa3K5aXEvu8W7V/A8xlwyszakJwQAAAABJRU5ErkJggg=='
,verycd:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC5klEQVQ4jZ2TW0hTcRzH/2Z0WZaz42VzbmdearOl5qpRLqyhFUTQNEzqoRcj8KHwqZcK9qJUpFhPlRYFETFaRUkYMS+o4ZwsszbntaXLk+5o87Kds53Jt4dgKF2ovq+/3/fD7/fj+yPCkLWQEBJD/kOC520BWRq2VoVdzdrlhVaNJs5uqauYaqp2TjVVO+2WuopOvX7j8p6Q84VmacR6jkQmbCVCW60X7peXWHOdrP/gwbKeZKmjL37T0qCEwqCEwnvxpiVbivRd34Gi8slHtxMx+roy0l7/KfKps5yYTKZV4TcXHkeazsJXfcptT4jjRigxWLUcs5p0zGrSwarkGEkSo2fden7q8ilH5FUlQs1Vz1pbTat/jPPhcbZg2c34r9OYLlXCt0UB//atmNfmYl6bB3+OCtPpcjBFcviv0BCe7mJD7ie5y1eK8V070Cm00wjeV2OuVI25nFzwBXvB6wswr8mDv3gruDvZENqVYGv328xmc2zU/fnM+Z09skRuwZyOcH8Wgg9UCJbkg9fpwev2IVCsRfCWCuH+LASeZ8BOJ3Fjpyt0UcDQ4eLjHUQEz0kJBHcWuAEFuEY1AofysajPB3czG5yLhjCYifEKKTqICG5D4YkoYORQkbFrbRwcG+Mx94RGyKsA9zkNwXoVAlfU4MbkCHkVWGyi4dgsRtfaDRgtNpRGAWxNjbqbSgp2ERFGjyQj5FGCZ9LAeVPBjcvAM2kQJpTwlKegi4jQTVHBGZNp24ojDhgKLW2EwLYmHmyjDMJXBbgJGTivDGFGgW9mOXrixGgjBO79+579lF7GZNL1pqb6WghBvzYBIacS/AANzklDGM6A00DBSgjsKckzMw0Ne36ZbfZG3TF74mamhayC52Iywu5MhF2Z+FIrQQuJRW8ixbDXrxp//x2EEG/J0TxXjvbux2zJZKA5A6GODLj2SJmB7Xn3vGXGHX80rwAVlVAL9w0P+VfGl8NlZUl/bfxXfQdwCpqwCi8HwAAAAABJRU5ErkJggg=='
,shooter:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADcElEQVQ4jW2TW0zTdxzFj0ORhDTMC5rYYEh8YCQ+YLy0W6YEYTG+LUHUZNGwB5kPxvDQgLiEkMw1AZsIblzKrdxWaNFx90K4ClUqpQ4LJGyuKNlYucwwxpC2/9/37M2ExM/75zx9DvABhrOzEzuOHk35OTHxCxtQbtfpPicZAQBFQNKHnPeM5+RkPz5zpncwPX2wDvDUA//WAN5fzOb+P9686Xvd3j5m37vXXrN9+6dbxAdnzyZbgR/vJSQsLD59ysDoKOt27GAdwCqAnrw8kmRgZIRNMTGsBVaaIiO/BQDU7tv32ZzT+fdsVRUdBw5sLgwMhEiGvfn5WjWgqoDwRH5+SCkVfnLlSrgcCNoA6TEYCAAoBSyTZjNJvpssKtL6LlzQ3vp86sHp06wFVDVAb0GBkBTX1avSEhcn9ZGRoY4jRzQAQAXQN3D+vBKlQv/4/WpheFjNVlQoKyDVgFgBeVlYSJJqbW6OofV19dJiCd8/fDgEALAC9x6lpIiIhMZzcjTvrVuaz2KR+uhoPrl8WfwOBzdWVkSJCElZnZ2V/vR0rcdoJAaBj61AS4/BwODaWui32lo1XVKiLb94IYsuF0kqktxcXaWIyExZGRv37FE1gHQfO7YCu073STnQ0XXiRHhjaSk8ZbGohaEhtehySafBwO5Tp8R56BCn7twhSRm8eFHKgLAjNlZ5cnO/QxGQXKfTjftbW4PB1VVtvrNTtFCI3vx8aUtK4mhWFpvj4uizWEhSXFlZYgWkVa9fJxmFQuDroUuXZpYmJtZHMjPVXwMD6r9AQN5OT8tGIECSMnP3Ln23b5OkuE0mVQnQsWvXqtPpjMBXQGpTbOzjruPHfYvPnonf4VDjJpMsj4+LJy9PepKTad+/n9PFxSSpxkwmZQWkLSFh3pmREQEAqALss5WVG0tud8gWHS2eGzf4qqFBjV27xodpafwB4FRxMUVEnt+8Ga4EpMto7HifcRmQ4YyP37BFRLyrBoJLbrf2uq1Naz54UP3Z2yu/2mxc9nhIUk2azZuVAPtPnhze8oX2pKSf7sfH0xYVRU9uLqdLSlgJsEWvp9/ppBYOUwsG+dxkom3nzqAlNfXLLQO/O50xrxobv+82GktLgeqGyMjOum3bvM27d8879Hq6r1/nSGam62Famn3w3LlvAKCgoOCj/wFAqy0Z5ZaacgAAAABJRU5ErkJggg=='
,wiki:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABo0lEQVQ4ja2TO4siQRSFC5lJOlUjEQQDE8FYRREFBUEwMDEcEJPGH2BsZiQoBgaiYCoiBv4FwRZDTQQROxE0sum2H3wT7EzDrLvs80Z1LnW+OkXVFcAr8Aas+f1af3hexcfib+tN/OHJT0mEbdvouo6u6xiGAeBq0zRxHMfVjuNgmqarbdtGbLdbMpkMQgh6vR6O41AoFBBCMBwOOZ1OJBIJcrkcqqoym83wer2Uy2V2ux0C4Hg88vLywnw+B0DTNEKhEN1uF4BsNsvtdgPg8XiQTCaxLAvgGwCgWq2SSqXcyw0GA4LBINPplHa77fYnkwn9ft/VLmCz2SCEYLVaAWBZFuFwmFgshq7rrqFYLKJp2jPgM2qlUnG1LMv4fD43rqIoNJvNL8/wBbBcLvF4PBwOBwBKpRJ+v5/xeAxAvV5HVdWfAwCi0SiyLLNYLOh2u7RaLSKRCJfLhVqt9v32Z8BoNEKSJPL5PIZhcL1ekSSJeDyOoii/BpimSSAQoNPpuL1Go0E6nX4yfwKevvJ+v8dxHFff73fO5/OP/Ov/Mkz/NM7vB+B52iVL10sAAAAASUVORK5CYII='
,jd:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAy0lEQVQ4jc3TIQqEUBDGcS/hBcQDyB5gwWyxvmI1bdxL2IxbtlpeNngCwbBgEAxbVFgwiDaD8N/0BEVYXIsDX5wfzDCjpbrBkWjnA16XK4UrSHWDwhWLZKb1G2iCEIBUN1jX1A80QbgPUA257dDFCQCfx3M/oKKQv4HS8wHmPe0GClccA963OwC57WwDXZww9cMmkJkWY1UzVvVyB5lpUXo+bSQBaCM5A20kKVxBE4SMVQ1A6flLQM019QNtJOeDWVcXJ/PsJ/6FvfkCxwFl51kLjdoAAAAASUVORK5CYII='
,newegg:'data:image/png;base64,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'
,dangdang:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABvElEQVQ4jXWTW3LbMAxFwTr7jCgvIBOLrLsW8yHLXUJNenMhTj8oyfFMqxkMKfDidQHIWBbGOmPrjL1fGWtmKDdsXbAldakLQ7kx1oy9X7F1ZqwzY1mQY5mBRkMBoPH/r22HAo1jmRFbF5rCIThMdEicdqREh0S3W0ucMNFxCI6mYOuCDCUDYILHBI/E8+qgIReHXNzzP553HMBQMmIfERQkOCR177qmacIZE840FKVnKckhwYGCfURkKNceQUE3JhqgYOIJE0+sHlE6ZgMN5YqMdYamSPZImJDo+RF/IfFj50Dix6pbMdlDU8Y6I7ZkFJA4IXEj0iHphMRzl3R6fYsTCtiSO4lKT/lrPZXnfesugKoi+YREj25tHGpa6+3eTfC8XXoUSe4fWXlMOIPyjQMFyacOTL6D0k/Mbtx52R1lj+oXtnOQ9tniNeOuV93nAAWJn0jyvY0lrYOkIKlHM+nZDYl+12+lHMI2rSuJdishfvb0guNtM44euXReTOrOJE1ImFYOcm8jCvqN8W1ZdJX+/loctF7CtrZjWXi/J94ffVXt/crx/puxLNiSsY+MLZmhZMY/N8Z7xtaFv8NE6qo6FMGyAAAAAElFTkSuQmCC'
,amazon:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABdElEQVQ4jZWTP0vDQBTAD2z6BRw1H0Cnmt1Js4uYfAPr7pAPIKJQEJQGVyGLXVoLLoKtu3qDg0LiYoc0BQctqTo49OdwMfZfaH3wOO7de7/35+4EkAeOgJDZJUxi8gI4HD0NggDHcdiyLCzbxvO8LFBJAJ1Bi5SSOU0jN6KO40wCdATQHbQUd3bIaRrrponv++l+UdcnAbpjgCiKkFLSbDa5qNexbDutYiZAEAQUDGOshZkBvxkLhkEURZRd93+AX+f9gwMAtovF1BbH8XRAYWUlDVg3zaEbKbtuBuAzSi1SShZ0nZymsaDrlF2XLdtmzTTpvXXo+x7c7SpNAZfL8O5P6nFYbjZV4MMenIsBQLsBFQG3u9CLsgEfbXipqmTV+ZEZtGoKUhFwtaqyPB3D4zE8ncDNhsraqkG7oc4TwN9Tfr1XjhWhnM8F/WTlcgnCa+X3HStNnnJprNR3H57P/ioIG1lNlQTqO58CX9OnmMpXEpP/AWTQTUDpCM9IAAAAAElFTkSuQmCC'
,dict:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVQ4jY3Tz2vTYBzH8SB487I+U8RdxUzqhky8qCBDcOrJk/gHTBCPipTRNjAtKgh9oNXhaQOZ0B1EkLRYS5kV3Nb1hzSt1k27NGvRNa2lTZMmLcrHw5aOWFED72Nez/N9kochHJ0hHEX6+BFLhKMgHIXNTX/Y3HTJ5vZy+6bu7Wd+fwhHcXN5DamTdkvOTAmuTBmuTAnXFjOYCIRxyPMYxO29bwEGp/04/HwVidNjllheAMsLsAezGI/mcSNRhCMl4sSTBRCOzvQB8XOnLJmA2TAv4PLbdTgz5W3E3MngtB8sL2D54jhYXsBoKIf1Z0+RqLdR7f7ESl3Dg/w3HAtlwfICzi9+giMlbo/j9A71AJYXMPYqh3fVFmSjC1nv7GZ0EZMVjO4gk/ENXFqIYICjHgvgW9tCRe+goBlWQO+gonfwMP8VLC/gbDSP67EcbBx9bwE+NFQUNAOzchuzchuBmo43Db0HJL8rO2NmcTu5AZvb2+gBR4MCSi0NQmsXMJuT28irBkRF7S12KyWCcLRl2UG80sAX1cBcVe+rqBqIVxpgeQEjoSwmY9n+Ee5kNlFWNKw0DczX9F6rioGyoqEYnYLkIzgT+YiJwOv+Q7QHswhJMkpNFZuqjoLWgaTqKDVVbOTDkPwHIPkIJB/582c0EVdaRFiq4HOtjmBxC46UiOTVvb2XJR9B48UFWH6k/yl5ZY8FkXwE/wSGeQH2l2mMzEdw8O6jPoQxr/Pfsrnp0gBHPcTpHWIYhjERhmGYX1cvojf/ywBHAAAAAElFTkSuQmCC'
,zdic:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg=='
,hj:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA/klEQVQ4jaWTrQoCQRSFbxK0GDRosFjF6BvYtmwWfACzUQQfYN9BLD7ANtMW1x88iiKoiCCbRFxcgwYvjGvRgUGU3TV85TDzMXM5l8iiNNlkUJ/MUNhkkEVpel1GJGwy6GUE9QnJURKZceaD2CD2TWIqgvaxDd/3P2DB6Hk9FKaFaII3Zz4jj3wwgXWxoK001Pd1eOzJvHPsBBN0T115sLarydxlN7ygtCgpX0mNUuEExVlREWTH2XCC8rIsc/EQiA/jwQWJYQKma8p8fp0Hm8FN3HC4H8CCledXNpVoPeAHo+E0fhdJX+toOS2FptNEdVtFbpL7UuW/l+nPdX4C2sIzGfYkF+oAAAAASUVORK5CYII='
,iciba:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jZXSoZKDMBSF4fMYvAKysnYl8kosMrIyNnIlsrYysjK2EllZuxJZ+a8I0LRlp2xmDjGcj5sJUrG8iev1usSb0NblTcCZvM4kr+3AWplLtQ3IZS1lbyL0Z6yLWBfZ1x8QbyIEcY95ZHcciCP0P5nsvsHM/kYeEwgJBuDCAwDoDiMhhHWkBGq7LaV4v9P/ZGwzIIUFGAqktts2wNvzFPPX28PI6XT6DDzuPhTJmDQ9iqS9WAWOO5GU09Q9td0YXpC0z//OE0BoSPMLxT4jcz+XeQeSn4p9D02Ts6tgV70hAEkrR0gv5ywzI23bkiSccxMwfsGlInkRprE/7c65fCsxRpxz/858i78ni99QUhiH/QAAAABJRU5ErkJggg=='
,paipai:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC0ElEQVQ4jUWS3WsUVxiHz8zGhOQi3dUEkg32L7C0CPaqeFWTC4k1rSZrZpWKSKF3ma1NZjYYY6z4AYK0Gr8KpaSlycYIGmrLTqxF92PS0BUURZAIcYkg3jgJQc3Mebw442Q4MOfMvB/P7/ceYZfjWG4c223Ent2AXW7CcuNY/yWwy3EGy41k3WaO3G1l6ucvePr9DwTpCaQxRdCbQ6jkZuzZBFa5CXs2ge02YrnryboJfsk38uD3BvyRz/CNcdiTI0hPRm+RdRNY7nrschxJAIHEuNLAnasNrFyuhVEdAAkEB87h75lApq/xdu8kvjGuCKzZDZy484GKIsBJ6QQXY8jzmvpEwL2t2/l/y35IX+WtkYPeKaQxifjtZjPzYzUQBkoCtT0X4/0jpQS1kNJXNL05pDGFOHNtAEZjMFoHBAT4OKkYM6laCIs5KZ2ZXRr57lpgVRF9NIhv5BCf/PuE1Qv1SqvixUnpyJ9qIgKnR8ApHU6IkALmPj6sTGwreuT+MGBUR0qpakjg7JqE/G4NTmpweyQ0NKCyaYggPYFoLSzR7hRDtDChRyOfqov0v5y7oX48vh41qWzKKoJkyaOl5K11DsDpWQdn9Mi4+fFhHh3U+edLERb1qWw+yKqSsExb0ePrP8ffW8Df3RqcXheZmN+twVEdeVhEY61s6eLFvmlES2mFZMnjw4KnxgU43TX4pzX8kOrWzhgMCRgUUZO9HZewzQXExoJHW9HDJ4gu0swubc1xAFZDdeo0N/YrnR03sPuqiNbiK5Ilj2RhCfubDm521+N8JeCYjhzWcLpi/NVVy/72H9nZMc2Oz6fp3HYdO/Oc/kxVjbGl5JEsKZLzY31wPAZHNd4M13N74FtGvruP3VflkPmM/kwVy1ykP7PAQN8zREtpmbbCCsnCEsniMp/eesjrY/UUs/s4nqlEiZa5iG0uYJkL9JuLWGYVy6zyDgHi/d0WUtbGAAAAAElFTkSuQmCC'
,hudong:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABVUlEQVQ4jaWSwSvDYRjHn79AkmhFW1vT0Gb90k5ujv4BVwcn5Q+QRn5tbUVZP6GtlJbk4ECRi5tcXLg5yg5yQw7Y+Dg87+ttlGne+vQ+z/d9P8/h7RUAdjvaAxB2OvkPQrWLP1F/BoCPuu4mF7a7+ZWzGRUaLy6Dr1rY6kHp/cmFr5cvfJfZZTyhEoJKCMrf2BvTi/vj2h9POrlsnEoIYbMPNvtgo78ZgJtTVwOcTLtz4wlrYVgLQxBxvJuHCiJQO4ePd3i8hZcHuL/S3HhCKQqlKKzGlGBI5Q3PZZbHmp6txrCesBKHlTgsDyh22d7ydKf54az2xhOKCSgmoDCoAARjrr+/dkNtVhjEekJ+GPLDkEvCq/ksuaSjOgXrE81ZLon1BD8FfgqWRlS+PNC6FcYTFtOwmIajgg5Y8P6G8YSsB1kPGm86YH60NdkM1hMA5jLtAXwCyK3ufWEwzWsAAAAASUVORK5CYII='
,pansou:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADZ0lEQVRYhbWTyU8TYRiH57+QNEQlIFXslEz3SltLF1s7pQs6XaatdIEOTbx78eCBkwkhHEQ9NMZEE2PEaAxLi2VJLQlhTReFBlooKKIF0ejdg0rK9Gs7tOObPLfv/T2/+b4MBJ1gDroD7EOCUB8SgbtgCPVBd4B9kkxKkycI574/EDogeleosO8PhPIE4axZvOf1X8n7esL5bn+8Knw94T2v/0qVcl//nteXoIl+yuKM3X5q1+2J7HZ5krTi9kQydvupigV2XF2TH53u1P9gx9U1WVaec7gGtvEbH8ricE1t4c5bOdylKWQLd97adrimKu3nHK4BoDyL2bWbVsdqSWzO6awNd1e6wawNd2/anNPlsrKYXVv89hZ8ZsNiXwORuY4PpjCsruL7/Z0UhtVlruODJfMs+MyxhbTZ6lm/Zk2DsQxSFZNn/ZplsFRu2mz1HB1cM2HRtAlbJ7NmwqIpHfUvL7oJHVZXLvvPIYMB+WDo3ACRMpi91cqPShjM3tL5BgRKoCZfSm/KkEmiplit8n+TRE0xkCOuN+qghM54L37VmC1Ca7hNV4G41nAb5EjojPegZU3H0LJGv1UMitJVYFmDomBHxxC0pEKHFtW6HJkFFX0FFlQoCnIsqdAhaF6huT+v0G6TWWjX0FegXYOCHPMKzX1oTq5+MCdX7xSj1NNVYE6u1IMd6gfQrEz5cFaq+kQmJlPdoatATKa6A3LMypQPoaik3f9O0r5LJiZRLNJWQKJYBDmikssdUFQo4UZF8s8gZsQyolb5jFhGlMqPCiVcCIIgaEogXZkWSL+QmRJIV8JIG6NaeRhpY5TLPjoY4bb1TnIlX0G85V0KVlvgLe9SsFRuhNvWe+zwBEcUn+CI8kAQcTCMIJRvIowgjAlEHCyZxxHFi5bGYaFxvFW4X4pQqyARYvMDleQhNj8QahUkymWNw0IjcHkM5j8ahXnfyjEG85OjLF7fSAvPWMgoi9c3BvOTFPYflf2CkRZOauQi9/C/0MJJVXy/10wm4w0Tef+GiXynmfevmUzqf9SrJvbjV83sH7TQxH5MWVw4w40s88tGeHW4Cf5ZDS8b4dXhRpa5KnnhPD9z/uaLhgvpF2dbflGi4UL6+ZnzN2sWk+dpfbPgWf25zmenmU+A1J/rfFrfLDhJ5m/sg5uWPdp5hwAAAABJRU5ErkJggg=='
,zhao:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZ3Qz0uaARzHcf1XQijGii15kMSiNTpEIB1iEOygFDu0ILoMhhcPGSRIDkxK+qFLEPoxau7pKa2gH0ZmRYSHGhGBYqBs4CTo9H3v0PCp4zy8bx9efPkaAKPJEaGWAKPB5IjwLnlWUyZHBIPJEaFXO+Xt/Fa11qBK82iMRleYRleY5tEYrUH12aZXO9WBnvgJ7aEk7aEkyvgKjmmN45s7RAQR4fjmDse0hjK+Ut31xE90wL6aoW0yQYsvTiBxhohQKN+zeH7L4vkthfI9IkIgcUaLL07bZAL7akYHupcy2CY2cYaSiAhqNo9tYvNZajaPiOAMJbFNbNK99AToiqWxejXSPwvkf1ewejWsXo2G4TkahuewjP3A6tXI/6pwdFXA6tXoiqV1oDN6hMWzjoiwsH+JxbPOm3GN8v0D5fsH7F+2sHjW+bp/iYhg8azTGT3SgY7wEYpbRUQIb2dR3Cp2/071iXb/DopbZX47i4iguFU6wk+A9tAhZleczHWRXOkPDUMLmF1x+gK79AV2MbviNAwtkCuVOb4uYnbFaQ8d6oAtkOLVp+8MTKUQEZb3L6nrn6F+MEr9YJS6/hmW/50/MPW4tQVSOmD1pWgaWaNpZI3gxuMwV6owq10wq12QK1UQEYIbl9Wd1fcEsIwd8PLjajWn/4D0VbH6g/RVEaf/+cYydqADinuPFx++/VeKe08HXn/eqymTI4IBMJreR6glwPgXlL6qSKe8DjQAAAAASUVORK5CYII='
,pan56:'data:image/png;base64,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'
,huacai:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADS0lEQVQ4jWWSa0yTBxSGT6tCacvXr8UNF3RRgrol4iJmim46ZzAaDe0nWmfwAiKUi+IliEymGQI6oxAU2n60gIAKBgjthFgv3LPNskIU2OrdgJg5/KFDhoLwlXc/WDaoJ3n/nef5cc5L5DaRxU2S0/W/7znRcPcXvr37T3PX0xdnu3ru5TmfmXjnsyWUliZ2Z/6bnfp6n+RKR3PylduIrHJAa2lD+PUOJNy6j6Md3Ujv6HGl2h/ynLWJfZ+OLJaEZF49H5Rxs9fv+5vZs7KaE+aZHUeCyu80rqxpH11z4w64uk7srOtCeE37jVWmpukTcZFk6+XZH8aUbdNqtVPc3Z9VPti43NrV+5WlFSsr7Pj6wk9YaqgzBCTmek5aBJEIrR4L0eaRCoenHg5x0utWZi4R0ana70I/KXH2BZ9vQZChHoGnbQg4Zln2P9xEEjiketjZd2N2Fcbjg7FWxTv8SgeJiBbyLecW5DYiMMuGT9Nr4J9SkU9ERM9rSSrUs6WuRiXGo4KrQflvVECL52tcm/rlN9nZwX4Zzc/nH7fA/9sqzEwsf0BERCMV7L7RauXQaLUSQjULWGUvXVZ5mvAjs37EwhbBKoerVn5Ul5U03ffw1c6PkyoxM7EMvjElfeMCk+LWiJmFYFbglcH3re3M0gMTbzPMK42oIlt5Ucgmv71l91S6y5ixuxg+2wv/ICKioRPM4+EfFMApGeqOLHpJ6y6umigQUiVR0Isaz6SFpbORpd2K7SVQhZvBbOF/JiKiN4cY51AyA+GwFDkx6/ppQ3HYpO+k0FrnAb/Vi7ZlZoi1JcMKLQ/vMCNkGsNBIiIaTGAuvY33FoQ9UuRHhLgotDTfvQtT1fwXUs74RLbRCDlngIzT90jX5nxEREQD0d4rBmOZv0bjZPgt2h8zuOxBUptPeqrPzqdQUxCFmo9PU+f3yTnDOKwxjHmpc8OISERERJVamvK3jtk3FCd3CfFeKIxYDbGmAKQuckk4oyDljPDQmCDWFMCL4/tlnH4H0fuNFQ3GMvuHY+X9QrwXqncF4/PNx6Dg8sByuViwOR27tkbZlmlSAt3BSZKBGO95b3TyTMRJ7ANxzKPO3XNut0XN5XujP1ihW7x4mjvwD/Zfl04Lg2hRAAAAAElFTkSuQmCC'
,xdowns:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADLElEQVQ4jT2TW0ybZQCGP70w24WJFx7inYlZZjJ3wX4WYqrJ9GImzkQzjRdGnZpo5oXGEbNlbBMQGEhKORTKsS2HApXDKpuTQ1FbRtehsALpeu7f45wDXCwUBEr/x4vOXry3T/I+eV8hYyBAEyHakTEQoY8YA8QwE94bIKoMEsWETDdhOgnSjI86PFQRogURQIuHavzUE1R0WFKlzGxpCCs9RJQ+ZPT52FON2NJluCljibN4qEKE6cRPI2E6qIyfRpqXkOYlXlooQvWpnZMfRCmpdeUhlpVy7KlG3JTiQ43wZYyElA6Ce70UOIo4elPFwUkVh2YlnvlSjRAgHt3j6We3GLJNI2Ng+p8qPFQToAkRVczMrrfgXDdwaFaiIl7MiuLkE8dXPNdzksOvyXy/pEbVWMH+J9JYnBPMbtTjQ0OIVkSCK1y/ryWwY+HArxInlo9TnyxnLXsH+8ok/rSTB7iwembYVzjD8y+k8Gwbub2jIUwXIskYpkALyewkr9jfyDsYXTXxL3+RJk4KH4ffdeTqCDBNTbO404SMEXGXa7jTI5gCRs66LnDkjxygNHKJDJtss8oGMm82tyIeX0OILBfVC/izbUTozgGSjFHl1LK0PsUB61GO/X6c2w9c7LHNYtrJ+G9/4t+8QYNXjXgqxuW2OcJ0/A+4ShILZQ4NiV0HZ+YvUDBXiCt9k78zCVS3XmV/wS2KS+7x2Tkvj+zbZCZy5eHwjIgkFuIMY42NoPPoSOw6UVnfomi+KO/jyS/q8v3fL14gQi9BWgijR8QZIko/SX7kPUsJqzhwb1gpnDjBiw6JgzaJI4Mf8fI3P/D1aDuhzCAyevw0EKIdEaUfGT0xzHw8WklzoJb72Iju/kJ/rA3Xxhj3FCt3+Yk4w8hKN3NbGmzpcnxZLSJ3pmZkDEwsX+WxU5d5ffxDvl28yLmF85yeqOCdtibOXNNwaaqeLm8102s1uJXv8KNBBNHhpZYAWsJ0Yrb/zNufuzhVMUm1/gbji9cJZXKnCqLDRx13qGSZ83ipQUToeSikiwi9xBggzhAJRkgwQpxhYpiJ0oeMgRCt+GnASw0hdPwHgbEX1WPRHXsAAAAASUVORK5CYII=',pixiv:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ  bWFnZVJlYWR5ccllPAAAAbRJREFUeNpiPHrvpV39tgvd5568M2MgARjJCJ1q9DIoZdRoWf/81Zcf  EgxkADEejhdM5GoGAZBeFmQBHnYWhjQrNQYvLRkGOUFuBmFudoY3X34yfPj+k+HM47cM/QeuMdx5  /RnFELgBYYYKDC3ehmBN55+8Y6jbfoHhyftvDGK8HAzGskJgQ4P05BmKNpxmWH72PtwARqGK5f8b  PPUZ/PXkGMR5OBjYWZgZvGfuZTjx4DWKTfwcbAwTg80YPDSlGLyA8ueALgIBpnx7TQY7FQkGP6Dg  159/wIJ///3H8O/HH78Y5p64zcDKzMRQ766H8EINkGPcvYXh8YdvcMGvv/5gDbTPP38zfP/9l8FI  VhguxnTu8TtgIP0iKtQZQTYyMYINgbvAffpuoqNNTZQP7IUtV58gXECsZlFgAEeZKIG92rzzIn4D  tCUE4GxZYHqIBmrcnObEwAp0vs/MPQzvv/3CTAfIIMNajaHMWRvsaSZGRoZrLz4yNO64yLD92lMM  tVgNyF17CqjpA1FeY5Lg5XxGbl4A6WUCpq5kaQGuF2dLfRiEgMkYBHZmuoCTLqGcCNILEGAAwqOS  yZnheSkAAAAASUVORK5CYII='
,deviantart:'data:image/gif;base64,R0lGODlhEAAQALMPAF1wYc/jPYufU7XIRZmtTn2QV7TIRaC0S4OXVHWIWcLWQbvPQ2p9Xa7CR8nd  P////yH5BAEAAA8ALAAAAAAQABAAAARa8IFJa5Um6M21mYElAiE5WmU4BMKZAkKwNB2BpIKiEUWS  MDcNKECIDQoBByUGGkx0hZWgQBCSCBMjcnNINRCHhaZwEDBAQ82AkBClDoizC32ilDKd/EdSv0QA  ADs=',flickr:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAtUlEQVQ4je2SPQ6CUBCEJ95Br4ElHAIsjZ2+p3fQzvdDDwUUHsbERHhwHxPLsTEhgGBirIyTbDWZL5ndBf5qtL76EC7FpkwgiqBrEzogTELYlDj6bVeUGrJia7a1bcLKEpbtMfoZLoJeWFbEruZsefZuiOeEYR9gSagFIFw2BJiuLvv7JD4MA8zpG4B3FbQ3XgEAZKVeQMz4ErXqnNGFkC6HcBmEi/pnNBFhM8LkhAo//5ff0wNbjNuWrGSFYwAAAABJRU5ErkJggg=='
,iask:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACN0lEQVQ4jY2Su09TcRxHu7gxOekElodCQ0A2WShR/oPvr7elEmEgalwqotEYRyILj9pILZqAFhNNfMRETFASrASICRoT5d5CW8vDBCyVlxRaWnKcnOCin/n7Pcs5Fss+c2hNOKQeJQ6U0nC6XOx3t2cplqtENWC3D0w+GohmJo212Ed9c87/0JgUufRviEgzdXVdFOZ3U1P7mJ7+7wSCS9jrnlNzps8QOW8OEWnEdqwzZiv2YTl0GOuJe1TXDnLq9Buq7cNYrb2U2y4HlFP2h4g0U1rcgks0tuIPcIkiv+Q+JSXPyC/rQZQTUYJTzABK4VZCKvaSrH6H7dlelBI0UbhEWI/0kVt8Yg5wKCEZ6yWrt8G0F4wONmNdZI0AxHygd5IJexGHCUATF7nkEMwHwWgnNx0gNetlN9oFRg8Z/QUkJxDNRCnbFGgiZJe/kZnzw1c/hH3shtthygsrYZxKWIUCUxMJyBMRMusfgluJqZnUxpfszlpoZmt9JKiUIkEiz/T57zJQ5hCFEsEtQpMI4qz/vxItFotFiXC3Y5jM8TJ2rOXEK04y2PY6Kpo6GJJO41GORrzep6n3oTjjIYOctZKJEZ3xUZ3bvlcpkQsHleimo7Of0bHITiSaJvpjkdXCCpYWfhKfSzMUCuPvfhs/JyYWRBPGPn9iZmGJ3znYLqyC0iOsFFWyuvmL2eUIU+90xGWasuDxeGhtvYr7bAO5o6XJRJV1d6PIlrx2q5WbVy5yo+X6npD+AKAXlU/NOP9hAAAAAElFTkSuQmCC'
,etao:'data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA0qUq/9KlKv8AAAAA0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/wAAAAAAAAAA0qUq/9KlKv8AAAAAAAAAAAAAAAAAAAAA0qUq/9KlKv8AAAAA0qUq/9KlKv8AAAAAAAAAAAAAAAAAAAAAAAAAANKlKv/SpSr/AAAAAAAAAAAAAAAAAAAAANKlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/wAAAADSpSr/0qUq/wAAAAAAAAAAAAAAAAAAAADSpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv8AAAAA0qUq/9KlKv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANKlKv/SpSr/AAAAAAAAAAAAAAAAAAAAANKlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv8AAAAA0qUq/9KlKv8AAAAA0qUq/9KlKv8AAAAAAAAAANKlKv/SpSr/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANKlKv/SpSr/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADSpSr/0qUq/wAAAADSpSr/0qUq/wAAAADSpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv8AAAAA0qUq/9KlKv8AAAAA0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/0qUq/9KlKv/SpSr/AAAAANKlKv/SpSr/AAAAANKlKv/SpSr/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AACBJAAAgSQAAJnkAAD55AAAgCQAA4AkAAP55AAAgCQAAIAkAADP5AAD/+QAAIAEAACABAAAn/wAA//8AAA=='
,tmall:'data:image/png;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AAAAAAACz/wAAuP8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AALj/AACz/wAAs/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAs/8AALP/AAC//wAAv/8AAL//AAC//wAAv/8AAL////////////8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AALP/AACz/wAAv/8AAL//AAC//wAAv/8AAL//AAC/////////////AAC//wAAv/8AAL//AAC//wAAv/8AAL//AACz/wAAs/8AAL//AAC//wAAv/8AAL//AAC//wAAv////////////wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAs/8AALP/AAC//wAAv/8AAL//AAC//wAAv/8AAL////////////8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AALP/AACz/wAAv/8AAL//AAC//wAAv/8AAL//AAC/////////////AAC//wAAv/8AAL//AAC//wAAv/8AAL//AACz/wAAs/8AAL//AAC//wAAv/8AAL//AAC//wAAv////////////wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAs/8AALP/AAC//wAAv/8AAL//AAC//wAAv/8AAL////////////8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AALP/AACz/wAAv/8AAL//AAC//wAAv/8AAL//AAC/////////////AAC//wAAv/8AAL//AAC//wAAv/8AAL//AACz/wAAs/8AAL//AAC///////////////////////////////////////////////////////8AAL//AAC//wAAs/8AALP/AAC//wAAv///////////////////////////////////////////////////////AAC//wAAv/8AALP/AACz/wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AACz/wAAs/8AALj/AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC//wAAv/8AAL//AAC4/wAAs/8AAAAAAACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AALP/AACz/wAAs/8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=='
,jpeg4:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAQCAIAAACHs/j/AAAAB3RJTUUH3QUZBA8bjXFPywAAA+xJREFUeJyVlFtsVFUYhde/9z5z2jPDtNNSCx1LLySKESu3YBQjYqIGI9EoYGpMMCFq0ERMAKMmEk3kwQDqq4lGTUgEQ0KIcrEgWlTAsVasaIEibaVDa+lcmDkz58ycffbvA5fok3E9rof1sPKtRdpogBlSEgEIjSYi/B8xsxIKgDZagA1DCM5fPvdeLjMqSDAbZv7vFDAYho0SKu2mxwpjgoQwJgRgvD92fLT1x74BAhkDw8zMxrD5RzJf1VWXQIaNIpUJshu+2LC3Z68goUgoQFB00YoXBm3pgUxECQYbhhIC4CBkImJmEBFJAFe6MEYLEiVdOj58LMbRSrHCYEUkQn8MpZ8bTU7UPeD6yBYqiXgkastfRrzpdTKZsLXRJBSxDsaGRa2jyy5bttXUrKTqHeq9USYTdkIZBYYAa5Zx33NP7NuUSvVXA2zbnV656eCer85s/yQ198mjn345qIQMslOjOz4YHzp9/qU1x9avHc/lFcnR/GhmIjO35bZitWjDJiLBDKHi8dbVMnar65Ybp8n25shfwyfnt5sPX+5avqTplXcPVwI/vevjkxNTjcuWtzy/KX/m97znkxCpidSsplbt6Ihj+1E/7+cVERk24DLBCAFm9iu6tdmZObNZ1Ta89nTsiR8OZ4t5nTqqo9NrAXXnssuJG3Ljk5P+5L4T+8q58s6fdp2VZ/sH+9sb2hQAIrrWL4go0KExbFuCAK9cnj87FotNU4895a5fd7G3x9ZB/OFVs+d1JSL1W+7fUsgVIlFr89ebl7TfvWzufQrMADP9iyhSdjprsqXit33nn1m1wDKIrli9dP5dlZ3vn/l8z7ydPW0zZjBzS7IlmUwCCHq1rtHxhrhgUgYCQKBhWAAIDTJF3n3o9LG+Uw8urFs0b46qicG93HhhSCbbq2MXLz3X7RWLAAc60KH2Qm9xYrHne1P5KSVMVqkoUJnIoPPmVmYueZWO6ZUXV97EymFIIS1RKhzf/pbpnNO25J5b9n9/Yc2jR95+86Et7whTZbAt7I2PbPQ9n4lVcWjbb6dSkYaljZ3dszs7iChX1BC1qjYemAiFVSGk+82BkSOH7n19a1IAQOTVNw4c7Kkw20JcWZtmbdUoEKlI2wYz+V1VOncsWByf5vgBO5QvlMvnRqY6Zs0IATZGzbm9zi38ufFZ5/FuHVQm0umFa9dJXWUpBMmBXwfcouu6bjQapZBZAAZg1swAKAy8qUzOrnHq6+tAxMZIaV2aHD+1+zOLw/qOzoauBQ1NTRHLIlCpXBoZHnFd13GcarVKQVhlY0jIa6AA18+KQ2YmIhNqS9kAKgAAi0MAhvnKlUmS16H4G/RUIZBbMjsmAAAAAElFTkSuQmCC'

};

var list={};//列表对象啊..

//如何添加搜索引擎:
//比如:
//list.web[0]=['Google','http://www.google.com/search?q=%s&sourceid=opera&ie=utf-8&oe=utf-8','http://www.google.cn/favicon.ico','gbk']
//list.web[排序(从小到大排列,小于0不显示相应引擎)]['显示在网页上的名字','关键字变量用%s代替','站点的图标(可以没有)',是否不接受UTF-8编码(不接受的话..填相应的编码..目前支持gbk或gb2312)]
//网页搜索列表
list.web=[];
list.web[0]=['谷歌','https://www.google.com.hk/search?newwindow=1&ie=utf-8&oe=utf-8&q=%s',icons.google]
list.web[2]=['百度','http://www.baidu.com/s?wd=%s&ie=utf-8',icons.baidu]
list.web[3]=['360','http://so.360.cn/s?ie=utf-8&q=%s',icons.so360]
list.web[4]=['必应','http://www.bing.com/search?q=%s',icons.bing]
list.web[5]=['有道','http://www.youdao.com/search?q=%s&ue=utf8',icons.youdao]
list.web[6]=['雅虎','http://www.yahoo.cn/s?q=%s',icons.yahoo]
list.web[7]=['搜搜','http://www.soso.com/q?w=%s&ie=utf-8&oe=utf-8',icons.soso]
list.web[8]=['搜狗','http://www.sogou.com/web?query=%s',icons.sogou]

//图片搜索列表
list.image=[];
list.image[0]=['谷歌图片','https://www.google.com.hk/search?hl=zh-cn&tbm=isch&q=%s',icons.google]
list.image[1]=['百度图片','http://image.baidu.com/i?ct=201326592&cl=2&word=%s&ie=utf-8&oe=utf-8',icons.baidu]
list.image[2]=['搜搜图片','http://image.soso.com/image.cgi?w=%s&ie=utf-8&oe=utf-8',icons.soso]
list.image[3]=['必应图片','http://cn.bing.com/images/search?q=%s',icons.bing]
list.image[4]=['有道图片','http://image.youdao.com/search?q=%s',icons.youdao]
list.image[5]=['搜狗图片','http://pic.sogou.com/pics?query=%s',icons.sogou]
list.image[6]=['deviantart','http://browse.deviantart.com/?qh=&section=&q=%s',icons.deviantart]
list.image[7]=['picsearch','http://cn.picsearch.com/index.cgi?q=%s',icons.picsearch]
list.image[8]=['flickr','http://www.flickr.com/search/?w=all&q=%s',icons.flickr]
list.image[9]=['pixiv','http://www.pixiv.net/search.php?s_mode=s_tag&word=%s',icons.pixiv]
list.image[15]=['jpg4','http://img.jpg4.info/index.php?feed=%s',icons.jpeg4]

//下载列表
list.download=[];
list.download[0]=['综合下载','https://www.google.com/cse?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q&',icons.google]
list.download[1]=['盘搜','http://www.pansou.com/s.php?wp=0&op=&ty=gn&op=gn&q=%s',icons.pansou]
list.download[2]=['我乐盘','http://www.56pan.com/s.php?q=%s',icons.pan56]
list.download[3]=['找文件','http://www.zhaofile.com/search.php?type=webdisk&zfilter=&cx=006138829939205075871%3Abxt8ocmyw_0&cof=FORID%3A11&ie=UTF-8&hl=zh-CN&sa=%E6%90%9C%E7%B4%A2&q=%s',icons.zhao]
list.download[4]=['新浪爱问','http://ishare.iask.sina.com.cn/search.php?key=%s&from=index&format=',icons.iask,'gbk']
list.download[6]=['VeryCD','http://www.verycd.com/search/entries/%s',icons.verycd]
list.download[7]=['绿盟','http://www.xdowns.com/tag.asp?keyword=%s',icons.xdowns,'gbk']
list.download[8]=['华彩','http://www.huacolor.com/search.asp?word=%s&m=2&Submit=%CB%D1%CB%F7',icons.huacai,'gbk']
list.download[9]=['射手字幕','http://shooter.cn/search/%s',icons.shooter]

//购物列表
list.shopping=[];
list.shopping[0]=['淘宝','http://s.taobao.com/search?q=%s',icons.taobao]
list.shopping[1]=['京东','http://search.jd.com/Search?keyword=%s',icons.jd,'gbk']
list.shopping[2]=['亚马逊','http://www.amazon.cn/s/ref=nb_ss?keywords=%s',icons.amazon]
list.shopping[3]=['当当','http://search.dangdang.com/search.php?key=%s',icons.dangdang,'gbk']
list.shopping[4]=['拍拍','http://search.paipai.com/cgi-bin/comm_search?KeyWord=%s',icons.paipai,'gbk']
list.shopping[5]=['新蛋','http://www.newegg.com.cn/Search.aspx?keyword=%s',icons.newegg,'gbk']
list.shopping[6]=['天猫','http://list.tmall.com//search_product.htm?q=%s&type=p&style=&cat=all',icons.tmall]
list.shopping[7]=['惠惠购物','http://www.huihui.cn/search?q=%s',icons.huihui]
list.shopping[8]=['一淘','http://s.etao.com/search?q=%s',icons.etao]

//翻译列表
list.translate=[];
list.translate[0]=['谷歌翻译','https://translate.google.com/translate_t?q=%s',icons.google]
list.translate[1]=['有道翻译','http://fanyi.youdao.com/translate?i=%s',icons.youdao]
list.translate[2]=['海词','http://dict.cn/%s',icons.dict]
list.translate[3]=['爱词霸','http://www.iciba.com/%s/',icons.iciba]
list.translate[4]=['沪江日语','http://dict.hjenglish.com/app/jp/cj/%s',icons.hj]
list.translate[5]=['沪江英语','http://dict.hjenglish.com/app/w/%s',icons.hj]
list.translate[6]=['有道词典','http://dict.youdao.com/search?q=%s&ue=utf8',icons.youdao]
list.translate[7]=['必应词典','http://dict.bing.com.cn/#%s',icons.bing]
list.translate[8]=['百度词典','http://dict.baidu.com/s?wd=%s&ie=utf-8&oe=utf-8',icons.baidu]
list.translate[9]=['汉典','http://www.zdic.net/zd/search/default.asp?q=%s',icons.zdic]

//知识列表
list.knowledge=[];
list.knowledge[1]=['百度百科','http://baike.baidu.com/searchword/?word=%s&pic=1&sug=1',icons.baidu,'gbk']
list.knowledge[2]=['互动百科','http://so.hudong.com/s/doc/%s',icons.hudong]
list.knowledge[3]=['百度知道','http://zhidao.baidu.com/search?word=%s',icons.baidu,'gbk']
list.knowledge[4]=['搜搜问问','http://wenwen.soso.com/z/Search.e?sp=S%s',icons.soso]
list.knowledge[5]=['维基(zh)','https://zh.wikipedia.org/wiki/%s',icons.wiki]
list.knowledge[-6]=['维基(en)','https://en.wikipedia.org/wiki/%s',icons.wiki]
list.knowledge[7]=['Google学术','http://scholar.google.com/scholar?hl=zh-CN&q=%s',icons.google]
list.knowledge[8]=['百度文库','http://wenku.baidu.com/search?word=%s',icons.baidu,'gbk']

//控制列表的具体细节
//list.details[排序(从小到大,小于0不显示相应列表)]=['显示在网页上的名字',列表名称(别改这个),列表数组(也别改)]
list.details=[];
list.details[0]=['★网页','web',list.web];
list.details[3]=['★图片','image',list.image];
list.details[4]=['★下载','download',list.download];
list.details[5]=['★购物','shopping',list.shopping];
list.details[6]=['★翻译','translate',list.translate];
list.details[7]=['★知识','knowledge',list.knowledge];

//-----------------
//utf8转常用汉字(gbk)
function toGBK(str){
var map={//编码对照 unicode(10进制) : gb2312(16进制)
40772:"F7FE"
};

var length=str.length;
var ret=[];
var character;
var charCode;
var gCode;
var neReg=/[\dA-z]/;
for(var i=0;i<length;i++){
charCode=str.charCodeAt(i);
if(charCode<=128){
character=str.charAt(i);
if(neReg.test(character)){//ascii的数字字母不编码
ret.push(character);
}else{
ret.push('%'+charCode.toString(16));
};
}else{
gCode=map.hasOwnProperty(charCode) && map[charCode];
if(gCode){
while(gCode.length<4){
gCode='0'+gCode;
};
ret.push('%'+gCode.slice(0,2)+'%'+gCode.slice(2,4));
}else{
//字库里面没有.
};
};
};
return ret.join('');
};

//--------------------

var nullFn=function(){};
var C={
log:nullFn,
err:nullFn,
};


if(prefs.debug){
if(envir.opera && window.opera.version()<10.5){
C.log=C.err=function(){
opera.postError.apply(opera,arguments);
};
}else{
var G_window=topObject.unsafeWindow || window;
var _console=G_window.console;
if(_console){
C.log=function(){
_console.log.apply(_console,arguments);
};
C.err=_console.error? function(){
_console.error.apply(_console,arguments);;
} : C.log;
};
};
};

var docCharSet=document.characterSet || '';
function encode(value,encoding){
if(encoding && /^gb/i.test(encoding)){
if(docCharSet.search(/gb/i)!=-1)return value;
if(typeof toGBK=='function'){
return toGBK(value);
};
}else{
return encodeURIComponent(value);
};
};

var url=location.href;
var matchedRule;

for(var i=0,ii=siteInfos.length,siteInfos_i;i<ii;i++){
siteInfos_i=siteInfos[i];
if(siteInfos_i.url.test(url)){
matchedRule=siteInfos_i;
break;
};
};


if(!matchedRule){
C.err('没有找到匹配的规则,退出.')
return;
};

if(!matchedRule.enabled){
C.err('规则被禁用了',matchedRule);
return;
};

C.log('找到规则:',matchedRule);


//获取滚动的距离.
function getWindowScrollXY(){
var ret;
if(support.winScrollXY){
ret={
x:window.scrollX,
y:window.scrollY,
};
}else{
ret={
x:window.pageXOffset,
y:window.pageYOffset,
};
};
return ret;
};

function getElement(selsector){
var ret;
if(selsector.search(/css;/i)==0){
ret=document.querySelector(selsector.slice(4));
}else{
ret=document.evaluate(selsector,document,null,9,null).singleNodeValue;
};
return ret
};

function isArray(obj){
var ret;
if(typeof Array.isArray=='function'){
ret=Array.isArray(obj);
}else{
ret=Object.prototype.toString.call(obj)=='[object Array]';
};
};

function makeArray(obj){
if(isArray(obj)){
return obj;
};
return [obj];
};


if(!matchedRule.insertIntoDoc){
C.err('没有找到 insertIntoDoc 项.');
return;
};

var insertIntoDoc=makeArray(matchedRule.insertIntoDoc);


var matchedInsertIntoDoc;
var iniKeyword;
var iniPosition;
var getKeyword;

for(var i=0,ii=insertIntoDoc.length,insertIntoDoc_i;i<ii;i++){
insertIntoDoc_i=insertIntoDoc[i];
iniPosition=getElement(insertIntoDoc_i.target);
if(iniPosition){
iniKeyword=null;
switch(typeof insertIntoDoc_i.keyword){
case 'string':{
getKeyword=getElement(insertIntoDoc_i.keyword);
if(getKeyword){
iniKeyword=getKeyword.value;
};
}break;
case 'function':{
getKeyword=insertIntoDoc_i.keyword;
try{
iniKeyword=getKeyword();
}catch(e){};
}break;
};
if(iniPosition && typeof iniKeyword==='string'){
matchedInsertIntoDoc=insertIntoDoc_i;
break;
};
};
};

if(!matchedInsertIntoDoc){
C.err('insertIntoDoc不匹配',matchedRule.insertIntoDoc);
return;
};

var matchedStyle=matchedInsertIntoDoc.style || matchedRule.style;
if(typeof matchedStyle!=='string'){
matchedStyle='';
};


C.log('匹配的insertIntoDoc',matchedInsertIntoDoc,'找到的位置:',iniPosition,'搜索关键字:',iniKeyword,'样式:',matchedStyle);


//容器.
var container=document.createElement('span');
container.style.cssText=matchedStyle;
container.className='sej_container sej_display-block';
var style=document.createElement('style');
style.type='text/css';
style.textContent=prefs.style;
document.body.appendChild(style);


function getEngineListInnerHTML(array,expand){
var tempArray=[];
for(var i=0,ii=array.length,array_i;i<ii;i++){
if(i in array){
array_i=array[i];

if(expand && matchedRule.url.test(array_i[1])){
continue;
};

var encoding=array_i[3]? (' encoding="'+array_i[3]+'" ') : '';
var href=' href="'+array_i[1].replace('%s',encode(iniKeyword,encoding))+'" ';
var address=' address="'+array_i[1]+'" ';
var target=prefs.openInNewTab? ' target="_blank" ' : '';
var img=prefs.favicon? (array_i[2]? ('<img src="'+array_i[2]+'"/>') : '') : '';

tempArray.push('<a'+href+address+target+encoding+'>'+img+array_i[0]+'</a>');
};
};
return tempArray.join('');
};


var dropDownList=[];

var engineListInnerHTML;
for(var i=0,ii=list.details.length,details_i;i<ii;i++){
if(i in list.details){
details_i=list.details[i];
if(details_i[1]==matchedRule.engineList){
engineListInnerHTML=getEngineListInnerHTML(details_i[2],true);
container.innerHTML=engineListInnerHTML? ('<span class="sej_expanded-list-type">'+details_i[0]+':</span>'+engineListInnerHTML) : '';
}else{
engineListInnerHTML=getEngineListInnerHTML(details_i[2]);
if(engineListInnerHTML){
dropDownList.push([details_i[0],engineListInnerHTML])
};
};
};
};


//事件支持检测.
function eventSupported( eventName,el ){
el = el || document.createElement("div");
eventName = "on" + eventName;
var isSupported = (eventName in el);
if (el.setAttribute && !isSupported ) {
el.setAttribute(eventName, "return;");
isSupported = typeof el[eventName] === "function";
};
el = null;
return isSupported;
};

var support={
mouseenter:eventSupported('mouseenter'),
mouseleave:eventSupported('mouseleave'),
winScrollXY:window.scrollX!==undefined,
};

var addCustomEvent={
_contains:function(parent,child){
if(parent && child)return !!(parent.compareDocumentPosition(child) & 16);
},
mouseenter:function(ele,fn){
var self=this;
ele.addEventListener('mouseover',function(e){
//如果来自的元素是外面的.
var relatedTarget=e.relatedTarget;
if(relatedTarget!=this && !self._contains(this,relatedTarget)){
fn.call(this,e);
};
},false);
},
mouseleave:function(ele,fn){
var self=this;
ele.addEventListener('mouseout',function(e){
//如果去往的元素,不是自己的子元素,或者自己本身.
var relatedTarget=e.relatedTarget;
if(relatedTarget!=this && !self._contains(this,relatedTarget)){
fn.call(this,e);
};
},false);
},
};


function changeKeyword(e){
var target=e.target;
if(target.nodeName!=='A')return;
var address=target.getAttribute('address');
if(!address)return;
var _getKeyword=getKeyword;
var value=typeof _getKeyword=='function'? _getKeyword() : _getKeyword.value;
var encoding=target.getAttribute('encoding');
value=encode(value,encoding);
target.href=address.replace('%s',value);
};

container.addEventListener('mouseover',changeKeyword,false);


//那啥..
function DropDownListObj(data){
this.data=data;
this.init();
};
DropDownListObj.zIndex=9999;


DropDownListObj.prototype={
hide:function(){
if(this.hiding)return;
this.hiding=true;
var ddStyle=this.dropDown.style;
ddStyle.height=0;
ddStyle.opacity=0;
this.a.style.removeProperty('color');
var self=this;
function _hide(){
self.hiding=false;
ddStyle.visibility='hidden';
};
if(prefs.dropDownList.transition){
this.styleHiddenTimer=setTimeout(_hide,333);
}else{
_hide();
};
},
forceHide:function(){
clearTimeout(this.hideTimer);
this.hide();
},
hideDelay:function(){
clearTimeout(this.hideTimer);
var self=this;
this.hideTimer=setTimeout(function(){
self.hide();
},prefs.dropDownList.hideDelay);
},
getWindowSize:function(){
var de=document.documentElement;
//windo.innerHeight;window.innerWidth;
return {
//h:document.compatMode=='BackCompat'? document.body.clientHeight : de.clientHeight,
w:de.clientWidth,
};
},
setStyle:function(){
var ddStyle=this.dropDown.style;
ddStyle.height=this.ddHeight;
ddStyle.opacity=0.96;
this.a.style.color='red';
if(DropDownListObj.preShowObj && DropDownListObj.preShowObj!=this){
DropDownListObj.preShowObj.forceHide();
};
DropDownListObj.zIndex+=1;
this.dropDown.style.zIndex=DropDownListObj.zIndex;
DropDownListObj.preShowObj=this;
},
show:function(){
var aRect=this.a.getBoundingClientRect();
var ddStyle=this.dropDown.style;
var windowScrollXY=getWindowScrollXY();

ddStyle.top= aRect.bottom + windowScrollXY.y +'px';

var halfListWidth=this.ddWidth/2;
var aRectL=aRect.left + 1/2*this.a.offsetWidth;

if(prefs.dropDownList.horizontal){
var aRightSSW=this.getWindowSize().w - aRectL;//a右边的屏幕宽度.
var distanceFormRight=halfListWidth - aRightSSW;
if(distanceFormRight<=-20){
distanceFormRight=0;
}else{
distanceFormRight+=20;
};
ddStyle.left= Math.max(aRectL-halfListWidth - distanceFormRight,10) + windowScrollXY.x +'px';
}else{
ddStyle.left= aRectL-halfListWidth + windowScrollXY.x +'px';
};
ddStyle.visibility='visible';
this.setStyle();
},
showDelay:function(){
clearTimeout(this.showTimer);
var self=this;
this.showTimer=setTimeout(function(){
self.show();
},prefs.dropDownList.showDelay);
},
getDropDownSize:function(){
var cStyle=getComputedStyle(this.dropDown,'');
var height=cStyle.height;
var width=cStyle.width;
if(parseInt(height)==0){
if(this.retryTime<11){//最多重试10次,耗时大概 1 秒.
this.retryTime+=1;
var self=this;
setTimeout(function(){
self.getDropDownSize();
},100);
}else{
this.dropDown.style.visibility='hidden';
this.dropDown.style.height=0;
};
}else{
this.ddHeight=height;
this.ddWidth=parseInt(width);
//if(prefs.dropDownList.horizontal)this.dropDown.style.width=this.ddWidth + 1 + 'px';//+1 解决放大后的问题.实际长度,比得到值小 1
this.dropDown.style.visibility='hidden';
this.dropDown.style.height=0;
};
},
init:function(){
var dropDown=document.createElement('span');
this.dropDown=dropDown;
dropDown.style.cssText='\
top:-9999px;\
left:-9999px;\
opacity:0;\
visibility:visible;\
';
dropDown.style.zIndex=DropDownListObj.zIndex;
dropDown.className='sej_drop-down-list sej_display-block'
dropDown.innerHTML=this.data[1];
var a=dropDown.firstChild;
while(a.nodeName!=='A'){
a=a.nextSibling;
};
a=a.cloneNode(false);
a.textContent=this.data[0];
var img=document.createElement('img');
img.className='sej_dropdown-icon';
img.src=prefs.icons.dropDown;
a.appendChild(img);
container.appendChild(a);
this.a=a;

var self=this;

var mEnterHandler=function(e){
//C.log('enter',e.target);
if(dropDown.style.visibility=='hidden'){
self.showDelay();
}else{
clearTimeout(self.styleHiddenTimer);
clearTimeout(self.hideTimer);
self.hiding=false;
self.setStyle();
};
};

if(support.mouseenter){
a.addEventListener('mouseenter',mEnterHandler,false);
dropDown.addEventListener('mouseenter',mEnterHandler,false);
}else{
addCustomEvent.mouseenter(a,mEnterHandler);
addCustomEvent.mouseenter(dropDown,mEnterHandler);
};

var mLeaveHandler=function(e){
//C.log('leave',e.target);
if(dropDown.style.visibility=='hidden'){
clearTimeout(self.showTimer);
}else{
self.hideDelay();
};
};

if(support.mouseleave){
a.addEventListener('mouseleave',mLeaveHandler,false);
dropDown.addEventListener('mouseleave',mLeaveHandler,false);
}else{
addCustomEvent.mouseleave(a,mLeaveHandler);
addCustomEvent.mouseleave(dropDown,mLeaveHandler);
};

dropDown.addEventListener('mouseover',changeKeyword,false);
document.documentElement.appendChild(dropDown);
this.ddHeight='auto';
this.ddWidth=0;
this.retryTime=0;
this.getDropDownSize();//css transition 动画,必须明确指定高度,所以获取.
},
};


function insertIntoDocument(ele,target,where){
if(!where){
C.err('InsertIntoDoc的 where 项,不存在',matchedInsertIntoDoc);
return;
};
switch(where.toLowerCase()){
case 'beforebegin':{
target.parentNode.insertBefore(ele,target);
}break;
case 'beforeend':{
target.appendChild(ele);
}break;
case 'afterbegin':{
var tFirstChild=target.firstChild;
if(tFirstChild){
target.insertBefore(ele,tFirstChild);
}else{
target.appendChild(ele);
};
}break;
case 'afterend':{
var tNextsibling=target.nextSibling;
if(tNextsibling){
target.parentNode.insertBefore(ele,tNextsibling);
}else{
target.parentNode.appendChild(ele);
};
}break;
};
};

for(var i=0,ii=dropDownList.length;i<ii;i++){//创建下拉列表对象.
new DropDownListObj(dropDownList[i]);
};

insertIntoDocument(container,iniPosition,matchedInsertIntoDoc.where);//插入文档.

};

if(envir.opera){
document.addEventListener('DOMContentLoaded',init,false);
}else{
init();
};

})(this,window,window.document);
