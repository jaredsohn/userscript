// ==UserScript==
// @name        tieba_text2face
// @namespace   baidu
// @description 百度贴吧编辑框文字转表情
// @include     http://tieba.baidu.com/*
// @grant	unsafeWindow
// @grant	GM_xmlhttpRequest
// @version     2013-5-19
// ==/UserScript==
/*
[表情]	编辑框输入括号中内容
绿豆蛙	输入lwd;  换页:增加或删除分号 ,然后完全补完数字,以句点结束 例如 ldw;01.
兔斯基	输入tsj;    同上 例如 tsj;;21.
泡泡	输入pao;    同上 例如 pao;;;45.
阿娌	输入ali;    同上 例如 ali;;;;68.
----    -------    -----
发表     输入三个冒号:::

*/
(function(){
var _windowbdface = typeof unsafeWindow == 'undefined' ? window: unsafeWindow;
var	$ = _windowbdface.$;
//预览框
$("#edit_parent").find("div.tb-editor-editarea").before('<div  id="preview111" style="height: 50px; border-color: rgb(92,157,255);border-width: 1px;border-style: solid;;OVERFLOW-Y: auto; OVERFLOW-X:hidden; border-bottom:0px;" ></div>');
//按钮
$('.subbtn_bg:eq(0)').before('<div><input type="button" value="Face发表" class="subbtn_bg" id="bdSubmit123" ></div>');

function showFacePic(n,facePicUrl,faceTypeName)
{

	var reg11=new RegExp(faceTypeName+";.*?\\.","ig");
	var reg22=new RegExp(faceTypeName+";;;;(.*?)\\.|"+faceTypeName+";;;(.*?)\\.|"+faceTypeName+";;(.*?)\\.|"+faceTypeName+";(.*?)\\.","ig");
	if(reg11.test(n))
	{n=n.replace(reg22,insertFacePic('$1$2$3$4',facePicUrl));}
	regFace0=new RegExp(faceTypeName+";;;;;","ig");
	regFace1=new RegExp(faceTypeName+";;;;","ig");
	regFace2=new RegExp(faceTypeName+";;;","ig");
	regFace3=new RegExp(faceTypeName+";;","ig");
	regFace4=new RegExp(faceTypeName+";","ig");

	if(regFace0.test(n))
	{n=n.replace(regFace0,"");}
	else if(regFace1.test(n))
	{n=n.replace(regFace1,"")+facePicList(61,80,facePicUrl);}
	else if(regFace2.test(n))
	{n=n.replace(regFace2,"")+facePicList(41,60,facePicUrl);}
	else if(regFace3.test(n))
	{n=n.replace(regFace3,"")+facePicList(21,40,facePicUrl);}
	else if(regFace4.test(n))
	{n=n.replace(regFace4,"")+facePicList(1,20,facePicUrl);}
	$("#preview111").height("120");
	return n;
}

function replaceCode()
{
	$("#preview111").height("50");
	var n=$("#edit_parent").find("div.tb-editor-editarea").html();
	if(/ali;/i.test(n))	n=showFacePic(n,'http://static.tieba.baidu.com/tb/editor/images/ali/ali_0',"ali");//阿娌
	if(/ldw;/i.test(n))	n=showFacePic(n,'http://img.baidu.com/hi/ldw/w_00',"ldw");//绿豆蛙
	if(/pao;/i.test(n))	n=showFacePic(n,'http://static.tieba.baidu.com/tb/editor/images/face/i_f',"pao");//泡泡
	if(/tsj;/i.test(n))	n=showFacePic(n,'http://static.tieba.baidu.com/tb/editor/images/tsj/t_00',"tsj");//兔斯基

	$("#preview111").html(n);
	var obj = document.getElementById("preview111"); 
	obj.scrollTop=obj.scrollHeight; 
	//发表
	if(/:::/i.test(n))
	{
			n=n.replace(/:::/g,"");
			$("#edit_parent").find("div.tb-editor-editarea").html(n);
			$('.subbtn_bg[value=" 发 表 "]').click();
			$("#bdSubmit123").val("正在发表");
	}

}

$("#edit_parent").find("div.tb-editor-editarea").keyup(replaceCode);
//发表
$("#bdSubmit123").click(function(){
			replaceCode();
			var s=$("#preview111").html();
			$("#edit_parent").find("div.tb-editor-editarea").html(s);
			$('.subbtn_bg[value=" 发 表 "]').click();
			$("#bdSubmit123").val("正在发表");
			});
			
function insertFacePic(n,url)
{
	var a=35;
	if(url=='http://static.tieba.baidu.com/tb/editor/images/tsj/t_00')a=40;//tusiji
	if(url=='http://static.tieba.baidu.com/tb/editor/images/face/i_f')a=25;//paopao
	if(url=='http://img.baidu.com/hi/ldw/w_00')a=50;//ludouwa
	if(url=='http://static.tieba.baidu.com/tb/editor/images/ali/ali_0')a=80;//ali
	return '<img class="BDE_Smiley" src="'+url+n+'.gif" height="'+a+'" width="'+a+'" >';
}

function facePicList(a,b,url)
{
	var s='';
	var s1='';
	for(var i=a;i<=b;i++)
	{	
		var num;
		if(i<10){ num='0'+i;}else num=i;
		//num=num.substring(num.length-2,num.length);
		if(i>40&&url=='http://static.tieba.baidu.com/tb/editor/images/tsj/t_00')break;//tusiji
		if(i>50&&url=='http://static.tieba.baidu.com/tb/editor/images/face/i_f')break;//paopao
		if(i>52&&url=='http://img.baidu.com/hi/ldw/w_00')break;//ludouwa
		if(i>70&&url=='http://static.tieba.baidu.com/tb/editor/images/ali/ali_0')break;//ali
		s+='<td><img class="BDE_Smiley" src="'+url+num+'.gif" title="'+num+'" alt="无" height="29" width="29"></td>';
		s1+='<td >'+num+'.</td>';
	}
	return '<br><table style="text-align:center;"> <tr>'+s+'</tr><tr>'+s1+'</tr></table>';
}

})();
