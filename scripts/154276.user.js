// ==UserScript==
// @name           贴吧增强功能脚本
// @description    贴吧增强功能脚本
// @include        http://tieba.baidu.com/*
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @exclude        http://tieba.baidu.com/i/
// ==/UserScript==

//*********************************************************自动签到功能******************************************************************
if(document.querySelector(".j_cansign")){
	document.querySelector(".j_cansign").onclick=undefined;
	document.querySelector(".j_cansign").click();
}

//*********************************************************UA尾巴功能*********************************************************************

var bt=document.querySelector('.pt_submit input[type=submit]');
bt.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();add();},false);
function add()
{ var txt=document.querySelector('td .tb-editor-editarea').innerHTML+'<br><br><br><br>　　　　——————'+'来自Opera/9.80 ( 5.1; U;                                                                                              Edition IBIS; zh-cn) Presto/2.10.289 Version/12.02';
tieba=unsafeWindow.rich_postor._getData();

tieba.content=txt;
unsafeWindow.PostHandler.post(unsafeWindow.rich_postor._option.url,tieba,function(I){unsafeWindow.rich_postor.showAddResult(I)},function(I){});
}


		