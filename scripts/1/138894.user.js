// ==UserScript==
// @name          EmoticonPlus
// @namespace     http://emoji.sinaapp.com
// @version       2.3.7
// @author	  @Yangxin
// @description   example script to alert "Hello world!" on every page
// @match         http://*.weibo.com/*
// @exclude       https://*
// @require       http://code.jquery.com/jquery-1.7.2.min.js
// @require       http://emoji.sinaapp.com/gm/data_emoji.js
// @require       http://emoji.sinaapp.com/gm/data_txt.js
// @require       http://emoji.sinaapp.com/gm/Insert_All_showLog.js
// @require       http://emoji.sinaapp.com/gm/autoupdatehelper.js
// @updateURL     https://userscripts.org/scripts/source/138894.meta.js
// @downloadURL   https://userscripts.org/scripts/source/138894.user.js
// ==/UserScript==


/***定义常量***/
var Weibo = /\weibo\.com/i.test(location.href);
var EmoticonPlus = {name: 'EmoticonPlus',id: '138894',version: '2.3.7'};
GM_addStyle(".ywz{width:auto !important;height:auto !important;padding:5px 6px 5px 6px !important;overflow:visible !important;}");
var iftext=0;
var ifemoji=0;
var user;

/***验证GM版本 自动更新***/
if (!GM_xmlhttpRequest) {
	alert('请升级到最新版本的 Greasemonkey.');
	return;
}else if(Weibo){
    GM_xmlhttpRequest({
        method: 'GET',
        url: 'http://emoji.sinaapp.com/updata.php?d='+$(".user_name a").text(),
        headers: {
            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
            'Accept': 'application/atom+xml,application/xml,text/xml',
        },
        onload: function(responseDetails) {
            //alert('Request for Atom feed returned ' + responseDetails.status + ' ' + responseDetails.statusText + '\n\n' + 'Feed data:\n' + responseDetails.responseText);
        }
    });
}
new Updater(EmoticonPlus).check();


//The same as the Insert_Weibo.js
addLog("我被加载进页面了");

/*数据*/
var text_display="";
var emoji_display="";
if(iftext==1)text_display='style="display:none;"';
if(ifemoji==1)emoji_display='style="display:none;"';
var add_button='<a href="javascript:void(0);" id="emoji" '+emoji_display+'>Emoji</a><a href="javascript:void(0);" id="ywz" '+text_display+'>颜文字</a>';
var added=0;
var added1=0;
var added2=0;
var isSetSingleWeibo=0;
var isSetFaceBtn=0;
var isSetsmileyBtn=0;
var isSetComRtBtnAction=0;

/*设定表情按钮id、添加点击、鼠标离开的动作*/
$(".face").each(function (index, domEle) { 
	if ($(this).text() == "表情") {
		$(this).attr("id","face_button");
		isSetFaceBtn=1;
		addLog("找到表情按钮啦 class=face");
		//设定表情按钮动作
		document.getElementById("face_button").addEventListener('mouseout',add_emoji_button, false);
		document.getElementById("face_button").addEventListener('click',aEL_usually_clear, false);//点击表情按钮，清除emoji/颜文字样式
		addLog("点击表情时会有反应了");
	}	
});

/*找不到表情按钮，针对单条微博时，表情按钮对应另一个class*/
if(!isSetFaceBtn){
	addLog("找不到表情按钮，应该不是微博主页~嗯嗯");
	/*
$("span[class='faces']").each(function (index, domEle) { 
$(this).attr("id","face_button"+index);
//设定表情按钮动作
document.getElementById("face_button"+index).addEventListener('mouseout',add_emoji_button, false);
document.getElementById("face_button"+index).addEventListener('click',aEL_usually_clear, false);//点击表情按钮，清除emoji/颜文字样式
isSetSingleWeibo++;
});
if(isSetSingleWeibo)addLog("目测是单条微博的页面，给"+isSetSingleWeibo+"表情图标加了点击动作 span[class=faces]");
*/
	$("[node-type='smileyBtn']").each(function (index, domEle) {
		$(this).attr("id","face_button"+index);
		/*设定表情按钮动作*/
		document.getElementById("face_button"+index).addEventListener('mouseout',add_emoji_button, false);
		document.getElementById("face_button"+index).addEventListener('click',aEL_usually_clear, false);//点击表情按钮，清除emoji/颜文字样式
		isSetsmileyBtn++;
	});
	if(isSetsmileyBtn)addLog("找到"+isSetsmileyBtn+"个smileyBtn的按钮，加了点击动作 a[node-type=smileyBtn]");
	isSetFaceBtn=1;
}


/*鼠标离开评论链接的事件*/
function aEL_addcom(){//http://www.iteye.com/topic/664638
	$("span[class='faces']").each(function (index1, domEle1) {
		$(this).attr("id","comment_button"+index1+"_face");
		document.getElementById("comment_button"+index1+"_face").addEventListener('mouseout',add_emoji_button, false);//添加鼠标离开表情按钮的事件
	}); 
}
/*遍历评论/转发按钮，添加离开事件*/
addLog("找一下评论转发连接");
$("a").each(function (index, domEle) { 
	if ($(this).text().indexOf("评论") != -1  ||  $(this).text().indexOf("转发") != -1  ||  $(this).text().indexOf("回复") != -1) {
		if(!$(this).attr("id"))
			$(this).attr("id","comment_button"+index);
        document.getElementById("comment_button"+index).addEventListener('mouseout',aEL_addcom, false);//添加鼠标离开链接的事件
        isSetComRtBtnAction=1;
	}
});
if(isSetComRtBtnAction)addLog("给评论和转发按钮加了个动作");

/*事件：点击常用表情or点击表情按钮，清除emoji/颜文字样式*/
function aEL_usually_clear(){$("#emoji").attr("class","");$("#ywz").attr("class","");}


/*添加表情框中的emoji、颜文字按钮    作用域：循环执行and鼠标离开表情按钮、评论时  */
function add_emoji_button(){
	/*查找"常用表情"按钮*/
	if(!document.getElementById("usually")){//没有usually id
		$("a").each(function (index, domEle) { 
			if ($(this).html() == "常用表情") {
				$(this).attr("id","usually");//添加"常用表情"id
				addLog("找到常用表情和魔法表情，加了个id");
			}
		});
	}
	/*查找"魔法表情"按钮*/
	if(!document.getElementById("magic")){
		$("a").each(function (index, domEle) { 
			if ($(this).html() == '<span class="ico_magic"></span>魔法表情') {
				$(this).attr("id","magic");
			}
		});
	}
	/*添加emoji按钮*/
	if(!document.getElementById("emoji") && document.getElementById("usually")){
		addLog("强行插入emoji和颜文字");
		$("#usually").after(add_button);
	}
	/*当表情框已经打开，循环执行下列操作有效*/
	if($("#usually").length>0){
		/*清除重复样式*/
		if(document.getElementById("usually").className=="current W_texta"){$("#emoji").attr("class","");$("#ywz").attr("class","");}//样式取消重复
		/*添加表情主框架id*/
		$("div[class='detail'] ul[class='faces_list clearfix']").each(function (index, domEle) { 
			if(!$(this).attr("id")){
				$(this).attr("id","face_list");
				addLog("框住表情列表的范围id");
			}
		}); 
		/*添加usually和magic的css动作，清除emoji和颜文字的选中样式*/
		if(!added2){
			document.getElementById("usually").addEventListener('click', aEL_usually_clear, false);//点击usually按钮，清除emoji/颜文字样式
			document.getElementById("magic").addEventListener('click', aEL_usually_clear, false);//点击magic按钮，清除emoji/颜文字样式
			added2=1;
		}
	}
	/*添加emoji/颜文字点击动作*/
	if(!added1 && document.getElementById("emoji") && document.getElementById("ywz")){
		document.getElementById("emoji").addEventListener('click',emoji, false);
		document.getElementById("ywz").addEventListener('click',ywz, false);
		added1=1;
		addLog("点emoji和颜文字的链接会有反应啦");
	}
}

window.setInterval(function() { add_emoji_button() }, 1000);

function emoji(){
	add_emoji_face("emoji");
}
function ywz(){
	add_emoji_face("ywz");
}

/*点击emoji按钮*/
function add_emoji_face(type){
	addLog("改了个分类");
	/*改css*/
	$("#usually").attr("class","");
	$("#magic").attr("class","");
	$("#emoji").attr("class","");
	$("#ywz").attr("class","");
	$("#"+type).attr("class","current W_texta");
	$("#face_list").attr("class","faces_list clearfix");//如果前一个状态是魔法表情 此操作可恢复li样式
	//右边左右按钮
	$("p[class='tab_kind W_linkb'] span[class='right'] a[class='next']").each(function (index, domEle) {$(this).attr("class","next_d");});
	$("p[class='tab_kind W_linkb'] span[class='right'] a[class='pre']").each(function (index, domEle) {$(this).attr("class","pre_d");});
	//分类
	$("p[class='tab_kind W_linkb'] em").each(function (index, domEle) {$(this).attr("id","cat");$(this).text("");});
	//换行
	$("div[class='detail'] div[class='W_pages_minibtn']").each(function (index, domEle) {$(this).text("");});
	//内容
	/*hot face*/
	$("div[class='detail'] ul[class='faces_list faces_list_hot clearfix']").each(function (index, domEle) {$(this).css("display","none");});
	/*face content*/
	$("div[class='detail'] ul[class='faces_list clearfix']").each(function (index, domEle) {$(this).text("");});
	/*face pages*/
	$("div[class='W_pages_minibtn']").each(function (index, domEle) {$(this).text("");});
	addLog("咔咔，完成~");
	/*分类*/
	if(type=="emoji"){
		addLog("呼叫emoji表情");
		$("#cat").html('\
<a href="javascript:void(0);" class="current W_texta" id="emoji_1">表情</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="emoji_2">自然</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="emoji_3">社会</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="emoji_4">物品</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="emoji_5">字符</a>');
		$("#face_list").html(face1);
		document.getElementById("emoji_1").addEventListener('click', cur1, false);	
		document.getElementById("emoji_2").addEventListener('click', cur2, false);	
		document.getElementById("emoji_3").addEventListener('click', cur3, false);	
		document.getElementById("emoji_4").addEventListener('click', cur4, false);	
		document.getElementById("emoji_5").addEventListener('click', cur5, false);
	}else{
		addLog("呼叫颜文字");
		$("#cat").html('\
<a href="javascript:void(0);" class="current W_texta" id="ywz0">'+w0+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz1">'+w1+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz2">'+w2+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz3">'+w3+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz4">'+w4+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz5">'+w5+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz6">'+w6+'</a>\
<em class="W_vline">|</em>\
<a href="javascript:void(0);" id="ywz7">'+w7+'</a>');
		$("#face_list").html(f0);
		document.getElementById("ywz0").addEventListener('click', ff0, false);	
		document.getElementById("ywz1").addEventListener('click', ff1, false);	
		document.getElementById("ywz2").addEventListener('click', ff2, false);	
		document.getElementById("ywz3").addEventListener('click', ff3, false);	
		document.getElementById("ywz4").addEventListener('click', ff4, false);	
		document.getElementById("ywz5").addEventListener('click', ff5, false);	
		document.getElementById("ywz6").addEventListener('click', ff6, false);
		document.getElementById("ywz7").addEventListener('click', ff7, false);		
	}
}
function cur(id){
	$("em[id='cat'] a[class='current W_texta']").each(function (index, domEle) {$(this).attr("class","");}); 
	$("#"+id).attr("class","current W_texta");
}
function cur1(){
	$("#face_list").html(face1);cur("emoji_1");
}
function cur2(){
	$("#face_list").html(face2);cur("emoji_2");
}
function cur3(){
	$("#face_list").html(face3);cur("emoji_3");
}
function cur4(){
	$("#face_list").html(face4);cur("emoji_4");
}
function cur5(){
	$("#face_list").html(face5);cur("emoji_5");
}
function ff0(){
	$("#face_list").html(f0);cur("ywz0");
}
function ff1(){
	$("#face_list").html(f1);cur("ywz1");
}
function ff2(){
	$("#face_list").html(f2);cur("ywz2");
}
function ff3(){
	$("#face_list").html(f3);cur("ywz3");
}
function ff4(){
	$("#face_list").html(f4);cur("ywz4");
}
function ff5(){
	$("#face_list").html(f5);cur("ywz5");
}
function ff6(){
	$("#face_list").html(f6);cur("ywz6");
}
function ff7(){
	$("#face_list").html(f7);cur("ywz7");
}
