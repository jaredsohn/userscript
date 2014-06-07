// ==UserScript==
// @name        tieba_face
// @namespace   baidu
// @description 百度贴吧表情 支持楼中楼
// @include     http://tieba.baidu.com/*
// @downloadURL	http://userscripts.org/scripts/source/167853.user.js
// @version     2013-5-20(1)
// ==/UserScript==

(function(){
var $ = unsafeWindow.$;
//表情url 前段
ldwUrl='http://static.tieba.baidu.com/tb/editor/images/ldw/w_00';
paopaoUrl='http://static.tieba.baidu.com/tb/editor/images/face/i_f';
tsjUrl='http://static.tieba.baidu.com/tb/editor/images/tsj/t_00';
aliUrl='http://static.tieba.baidu.com/tb/editor/images/ali/ali_0';
boboUrl='http://static.tieba.baidu.com/tb/editor/images/bobo/B_00';
lbbUrl='http://static.tieba.baidu.com/tb/editor/images/luoluobu/llb_0';
qpxUrl='http://static.tieba.baidu.com/tb/editor/images/qpx_n/b';

var chooseFace="<div id='list1234'><font size=2 id='ldwFace'>(绿豆蛙)</font>"+
		"<font size=2  id='paopaoFace'>(泡泡)</font><font size=2  id='tsjFace'>(兔斯基)</font>"+
		"<font size=2  id='aliFace'>(阿狸)</font><font size=2  id='boboFace'>(波波)</font>"+
		"<font size=2  id='lbbFace'>(罗布布)</font><font size=2  id='qpxFace'>(气泡熊)</font></div>";

//监听 "回复" "我说一句" "楼中楼回复"按钮
	$("a[class*='lzl_s_r']").mouseup(function(){faceDiv()});
	$("p[class*='j_lzl_p']").mouseup(function(){faceDiv()});
	$("div.core_reply_tail").mouseup(function(){faceDiv()});

//生成楼中楼表情列表
function faceDiv()
{		this_page =2;
		setTimeout(function(){
		$("div.lzl_simple_wrapper").find("div.tb-editor-editarea").height(85);
		$("#preview111").remove();
		$("#list1234").remove();
		$("#faceTop").remove();
		$("#top222").remove();
		$("div.lzl_simple_wrapper").before('<div id="top222" style="height:30px;"></div><div  id="preview111" style="OVERFLOW-Y: auto; OVERFLOW-X:hidden;" ></div>'+chooseFace);
		ldwClick(1,53,'http://static.tieba.baidu.com/tb/editor/images/ldw/w_00');	
		addClickkEvent();		
		},50);
}

//生成主编辑框表情列表
function faceMainDiv()
{
	this_page =1;
	$("#preview111").height(0);
	$("#preview111").remove();
	$("#list1234").remove();
	$("#faceTop").remove();
	$("#top222").remove();
	previewWindow();
	ldwClick(1,52,'http://img.baidu.com/hi/ldw/w_00');	
	addClickkEvent();
}
faceMainDiv();	

//主编辑框
$("#edit_parent").find("div.tb-editor-editarea").click(function(){faceMainDiv()});
//预览框
function previewWindow()
{
	$("#edit_parent").find("div.tb-editor-editarea").before('<div  id="preview111" style="OVERFLOW-Y: auto; OVERFLOW-X:hidden;" ></div>'+chooseFace);
	$("#edit_parent").find("div.tb-editor-toolbar").before('<div id="faceTop"></div>');
}


//绿豆蛙有两种表情, 50*50不能在楼中楼使用
function ldwClick(a,b,url)
{
	$("#ldwFace").click(function(){		
		$("#preview111").html(facePicList(a,b,url));
		 ddd();
		});
}	

//楼中楼生成恢复表情列表
$("div.d_post_content_main").click(function () {
if(this_page==1)faceDiv();
} );

var tmpTop="0";
function ddd()
{
	$("#preview111").height(145);	
	
	if(this_page==1)$("html,body").animate({scrollTop:$("#faceTop").offset().top},100);
	if(this_page==2){
	//点击回复框表情列表时 防抖动
	var a;
	var b;
	b=Math.abs($("#top222").offset().top-tmpTop)
	b<120?a=tmpTop:a=$("#top222").offset().top-20;	
	b<120?tmpTop=a:tmpTop=$("#top222").offset().top-20;	
	scrollTo(0,a);
	}
}	
function addClickkEvent(){
	$("#paopaoFace").click(function(){
		$("#preview111").html(facePicList(1,50,paopaoUrl));
		ddd();});
	$("#tsjFace").click(function(){
		var n=facePicList(1,40,tsjUrl);			
		$("#preview111").html(facePicList(1,40,tsjUrl));
		ddd();});
	$("#aliFace").click(function(){	
		$("#preview111").html(facePicList(1,70,aliUrl));
		ddd();});
	$("#boboFace").click(function(){	
		$("#preview111").html(facePicList(1,63,boboUrl));
		ddd();});
	$("#lbbFace").click(function(){	
		$("#preview111").html(facePicList(1,60,lbbUrl));
		ddd();});
	$("#qpxFace").click(function(){	
		$("#preview111").html(facePicList(1,62,qpxUrl));
		ddd();});
		//点击隐藏主编辑器表情列表	
	$("#edit_parent").find("div.tb-editor-editarea").mousedown(function(){
			$("#preview111").height(0);	
			$("html,body").animate({scrollTop:$("#faceTop").offset().top},100);});

}	

 
//插入函数  摘自http://userscripts.org/scripts/review/142404 感谢@坐怀则乱
var this_page=1;
unsafeWindow.usualSmileyInsertSmiley1 = function (image_src)
{	
		if (this_page == 1)
		{
			unsafeWindow.rich_postor._editor.execCommand("insertsmiley", image_src);
			unsafeWindow.rich_postor._editor.overlay.close();
		}

		if (this_page == 2 )
		{
			unsafeWindow.LzlEditor._s_p._se.execCommand("insertsmiley", image_src);
			unsafeWindow.LzlEditor._s_p._se.editorPlugins.insertsmiley.closeOverlay();
		}
}	
	
//生成表情图片列表
function facePicList(a,b,url)
{
	var s='';
	for(var i=a;i<=b;i++)
	{	
		var a=45;
		if(url==paopaoUrl)a=30;//paopao
		var num;
		if(i<10){ num='0'+i;}else num=i;
		s+='<img class="BDE_Smiley" src="'+url+num+'.gif"  height="'+a+'" width="'+a+'"         onclick="usualSmileyInsertSmiley1(\''+url+num+'.gif\')"     >';
	}
	return s;
}

})();