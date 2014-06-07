// ==UserScript==
// @name	Tieba Multiuser
// @namespace	http://gera2ld.blog.163.com/
// @author	Gerald <gera2ld@163.com>
// @version	1.0.1
// @description	百度贴吧马甲切换
// @downloadURL	https://userscripts.org/scripts/source/154072.user.js
// @updateURL	https://userscripts.org/scripts/source/154072.meta.js
// @include	http://tieba.baidu.com/*
// ==/UserScript==

(function() {
	if(!document.querySelector('.s_nav')) return;
	if(typeof unsafeWindow!='undefined') PageData=unsafeWindow.PageData;
	else unsafeWindow=window;
	function switchUser(s,p){
		var d=new Date();if(s) d.setTime(d.getTime()+8*365*24*3600*1000); else s='';
		document.cookie='BDUSS='+s+';domain=baidu.com;path=/;expires='+d.toGMTString();
		if(typeof p=='function') p();
		else if(typeof p=='string') location.replace(p);
		else location.reload();
	}
	function save(){localStorage.setItem('ge_users',JSON.stringify(users));}
	var users=localStorage.getItem('ge_users');
	if(users==null) users={}; else users=JSON.parse(users);
	var p=unsafeWindow.PageData;
	if(p.user&&p.user.is_login&&p.user.name) {
		var c=document.cookie.match(/BDUSS=(.*?)(;|$)/);
		if(c) {users[p.user.name]=c[1];save();}
	}
	var s=document.createElement('style');
	s.innerHTML='#ge_users>li{position:relative;cursor:pointer;}#ge_users span{background:#77f;color:white;border-radius:3px;border:1px solid;border:none;margin:2px;cursor:pointer;text-align:center;padding:0 2px;}';
	document.head.appendChild(s);
	function userClick(e){
		e.preventDefault();
		e=e.target;var p;
		if(e.tagName=='A') {
			p=null;
			if(/^\/i\//.test(location.pathname)) p='/';
			if(e.nextSibling) switchUser(users[e.innerText||e.textContent],p);
			else if(e.innerHTML=='未登录状态') switchUser();
			else if(e.innerHTML=='添加马甲') unsafeWindow.TbCom.process("User", "buildLoginFrame");
		} else if(e.tagName=='SPAN') {
			p=e.previousSibling;
			delete users[p.innerText||p.textContent];
			save();(p=p.parentNode).parentNode.removeChild(p);
		}
	}
	function initTieba(){
		var c=document.querySelector('#com_userbar>ul');
		if(!c) return setTimeout(initTieba,1000);
		var b=document.createElement('li');b.className='split';c.insertBefore(b,c.firstChild);
		var a=document.createElement('li');a.innerHTML='<a href=# class=u_arrow>马甲</a>';c.insertBefore(a,b);
		a.onmouseover=function(){b.style.display='block';};
		a.onmouseout=function(){b.style.display='none';};
		b=document.createElement('div');
		b.setAttribute('style',"padding-top:4px;width:50px;display:none;position:absolute;");
		a.appendChild(b);
		c=document.createElement('div');c.className='u_ddl_con u_ddl_con_top';b.appendChild(c);
		var ul=document.createElement('ul');ul.id='ge_users';c.appendChild(ul);
		ul.onclick=userClick;
		c=document.createElement('li');c.innerHTML='<a href=#>未登录状态</a>';ul.appendChild(c);
		for(var i in users) {
			if(!i) {delete users[i];continue;}
			c=document.createElement('li');
			c.innerHTML='<a href=#>'+i.replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</a><span style="position:absolute;right:0;top:0;">删除</span>';
			ul.appendChild(c);
		}
		c=document.createElement('li');c.innerHTML='<a href=#>添加马甲</a>';ul.appendChild(c);
	}
	initTieba();
})();
