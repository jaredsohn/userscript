// ==UserScript==
// @name         Tieba Template
// @version      1.0.0.1
// @description  贴吧模板
// @match        http://tieba.baidu.com/*
// @include      http://tieba.baidu.com/*
// @author       864907600cc
// @run-at       document-end
// @grant        GM_addStyle
// @updateURL	https://userscripts.org/scripts/source/185116.meta.js
// @downloadURL	https://userscripts.org/scripts/source/185116.user.js
// ==/UserScript==

var stylesheet='.ttemplate_listener{width: 56px;height :14px;font-size: 12px;margin: 0 0 0 auto;color: orange;cursor: pointer;}'
			  +'.tiebaTemplate-container{width: calc(100% + 28px);height: calc(100% + 14px);position: absolute;z-index: 2;top: 0px;left: -14px;color: #000;background: rgba(255,255,255,.75);font-size: 14px}'
			  +'.tiebaTemplate-header{margin: 14px;height: 30px;-webkit-user-select: none}'
			  +'.tiebaTemplate-header h3{font-size:14px}'
			  +'.tiebaTemplate-header-exit{width: 18px;height: 18px;top: 10px;position: absolute;right: 10px;font-size: 18px;cursor: pointer;}'
			  +'.tiebaTemplate-article{height: calc(100% - 90px);padding: 0 14px;text-align: center}'
			  +'.tiebaTemplate-footer{height: 30px;text-align: center;font-size: 14px}'
			  +'.tiebaTemplate-footer-add{cursor: pointer}'
			  +'.ttemplate_addp{background: #fff;height: calc(100% - 45px);width: 100%;position: absolute;bottom: 0px}'
			  +'input[type="text"].ttemplate_addp_title{border: orange 1px solid !important;height: 20px;width: calc(100% - 36px);line-height: 20px;margin: 0 12px;font-size: 14px;padding: 5px}'
			  +'.ttemplate_addp_context{border: orange 1px solid;height: calc(100% - 75px);margin: 0 12px;font-size: 14px;padding: 5px}'
			  +'.ttemplate_addp_footer{text-align: center;font-size: 14px}'
			  +'.ttemplate_addp_footer span{cursor:pointer;}'
			  +'.ttemplate_data_num{width:5%;display:inline-block}'
			  +'.ttemplate_data_art{width:85%;display:inline-block;cursor:pointer}'
			  +'.ttemplate_data_edit,.ttemplate_data_del{width:5%;display:inline-block;cursor:pointer}'
			  +'.ttemplate_data_art:hover,.ttemplate_addp_footer span:hover,.tiebaTemplate-header-exit:hover,.tiebaTemplate-footer-add:hover,.ttemplate_data_edit:hover,.ttemplate_data_del:hover{color:blueviolet}';
GM_addStyle(stylesheet);

var ttemplate_node,ttemplate_data=localStorage.getItem('tiebaTemplate').match(/{"title"\:".*?","context"\:".*?"}/gi)||[];
function ttemplate_1(){
	var f=document.createElement('div'),n1=document.getElementsByClassName('poster_head_text')[0];
	n1.parentNode.insertBefore(f,n1.nextElementSibling);
	f.className='ttemplate_listener';
	f.innerHTML='插入模板';
	f.onclick=function(){ttemplate_2()};
}
function ttemplate_2(){
	if(typeof ttemplate_node=='undefined'){
		document.getElementsByClassName('edui-container')[0].appendChild(ttemplate_node=document.createElement('div'),
																		 ttemplate_node.className='tiebaTemplate-container',
																		 ttemplate_node.innerHTML='<div class="tiebaTemplate-header">'
																									+'<h3>贴吧模板</h3>'
																									+'<div class="tiebaTemplate-header-exit" title="点击关闭此页面">×</div>'
																									+'<hr>'+'</div>'
																								 +'<div class="tiebaTemplate-article"></div>'
																								 +'<div class="tiebaTemplate-footer">'
																									+'<span class="tiebaTemplate-footer-add">新建模板</span>'
																								 +'</div>');
		document.getElementsByClassName('tiebaTemplate-footer-add')[0].onclick=function(){ttemplate_3()};
		document.getElementsByClassName('tiebaTemplate-header-exit')[0].onclick=function(){ttemplate_node.style.display='none'};
		ttemplate_4();
	}
	else ttemplate_node.style.display='';
}
function ttemplate_3(attr){
	var ttemplate_addp=document.createElement('div'),ttemplate_addp_context=document.createElement('div'),ttemplate_addp_title=document.createElement('input'),ttemplate_addp_footer=document.createElement('div');
	ttemplate_addp.className='ttemplate_addp';
	ttemplate_addp_title.setAttribute('type','text');
	ttemplate_addp_title.setAttribute('placeholder','请输入标题');
	ttemplate_addp_title.className='ttemplate_addp_title';
	ttemplate_addp_context.setAttribute('contenteditable','true');
	ttemplate_addp_context.className='ttemplate_addp_context';
	ttemplate_addp_footer.innerHTML='<span class="ttemplate_addp_save">保存</span> <span class="ttemplate_addp_cancel">取消</span>';
	ttemplate_addp_footer.className='ttemplate_addp_footer';
	ttemplate_addp.appendChild(ttemplate_addp_title);
	ttemplate_addp.appendChild(ttemplate_addp_context);
	ttemplate_addp.appendChild(ttemplate_addp_footer);
	ttemplate_node.appendChild(ttemplate_addp);
	if(typeof attr!='undefined'){
		var S=JSON.parse(ttemplate_data[attr]);
		ttemplate_addp_title.value=S.title;
		ttemplate_addp_context.innerHTML=S.context;
	}
	ttemplate_addp_footer.getElementsByClassName('ttemplate_addp_save')[0].onclick=function(){
		if(ttemplate_addp_title.value!=''&&ttemplate_addp_context.innerHTML!=''){
			var t=new Object();
			t.title=ttemplate_addp_title.value;
			t.context=ttemplate_addp_context.innerHTML;
			if(typeof attr!='undefined')ttemplate_data[attr]=JSON.stringify(t);
			else ttemplate_data.push(JSON.stringify(t));
			ttemplate_node.removeChild(ttemplate_addp);
			localStorage.setItem('tiebaTemplate',ttemplate_data.toString());
			delete t;
			ttemplate_4();
		}
	}
	ttemplate_addp_footer.getElementsByClassName('ttemplate_addp_cancel')[0].onclick=function(){
		ttemplate_node.removeChild(ttemplate_addp);
	}
}
function ttemplate_4(){
	var ttemplate_article=document.getElementsByClassName('tiebaTemplate-article')[0];
	if(localStorage.getItem('tiebaTemplate')){
		var Q,R='',S,T;
		for(Q in ttemplate_data){
			S=JSON.parse(ttemplate_data[Q]);
			R+='<div class="ttemplate_data"><div class="ttemplate_data_num">'+(parseInt(Q)+1)+'</div><div class="ttemplate_data_art" title="'+S.context.substr(0,100)+'">'+S.title+'</div><div class="ttemplate_data_edit">修改</div><div class="ttemplate_data_del">删除</div></div>';
		}
		ttemplate_article.innerHTML=R;
		var T=ttemplate_article.querySelectorAll('.ttemplate_data_art'),U=ttemplate_article.querySelectorAll('.ttemplate_data_edit'),V=ttemplate_article.querySelectorAll('.ttemplate_data_del');
		for(var i=0;i<T.length;i++)T[i].onclick=ttemplate_5;
		for(var i=0;i<U.length;i++)U[i].onclick=ttemplate_6;
		for(var i=0;i<V.length;i++)V[i].onclick=ttemplate_7;
		
	}
	else{
		ttemplate_article.innerHTML='啊哦……你还没有设置过模板呢……'
	}
}
function ttemplate_5(){
	var cnode=document.getElementById('ueditor_replace');
	cnode.innerHTML+=JSON.parse(ttemplate_data[parseInt(this.parentNode.getElementsByClassName('ttemplate_data_num')[0].innerHTML)-1]).context;
	ttemplate_node.style.display='none';
}
function ttemplate_6(){
	ttemplate_3(parseInt(this.parentNode.getElementsByClassName('ttemplate_data_num')[0].innerHTML)-1);
}
function ttemplate_7(){
	ttemplate_data.splice(parseInt(this.parentNode.getElementsByClassName('ttemplate_data_num')[0].innerHTML)-1,1);
	localStorage.setItem('tiebaTemplate',ttemplate_data.toString());
	ttemplate_4();
}

if(document.getElementsByClassName('forum_content')[0]||document.getElementsByClassName('p_postlist')[0]){
if(document.getElementById('ueditor_replace'))ttemplate_1();
else {
	var editor_wait=window.setInterval(function(){
		if(document.getElementById('ueditor_replace')){
			window.clearInterval(editor_wait);
			ttemplate_1();
		}
	},100)
}}