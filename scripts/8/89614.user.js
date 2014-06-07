// ==UserScript==
// @name           icampus.ac.kr Login (For GM,Opera,Chrome)
// @description    Enables to login on icampus.ac.kr
// @include        http://admin.skku.edu/*
// @include        http://icampus.ac.kr/*
// @include        http://www.icampus.ac.kr/*
// @copyright      OLokLiR
// @version        0.403
// ==/UserScript==

if(/cocousrloginaction/i.test(document.URL)&&document.domain=='admin.skku.edu'){
	var unsafeWindow=this['unsafeWindow']||window; //For Opera (Opera don't know unsafeWindow.)
	unsafeWindow.fnLoginUserFix=function(){
		var unsafeWindow=this['unsafeWindow']||window;
		var loginForm=unsafeWindow.document.getElementsByName('loginForm')[0];
		try{
			if(/icampus/i.test(loginForm.retPage.value)){ //Greasemonkey can't read this.(BUG??)
				loginForm.action='/co/COCOUsrLoginAction.do';
				loginForm.submit();
		}}catch(e){
			if(/icampus/i.test(unsafeWindow.document.getElementsByName('retPage')[0].value)){
				loginForm.action='/co/COCOUsrLoginAction.do';
				loginForm.submit();
		}}
	}
	window.addEventListener("load",unsafeWindow.fnLoginUserFix,false); //Chrome ignores this.
	setTimeout(unsafeWindow.fnLoginUserFix,500); //For Chrome. (Chrome loads scripts too late.)
}
if(/icampus[.]ac[.]kr[/]front[/]login[/]login[.]do/i.test(document.URL)){
	var btn=document.getElementById("btn");
	var btn_add=document.getElementById("btn_add");
	for(var i=0;i<btn.childNodes.length;i++){
		if(btn.childNodes[i].className=="btn1"){
			btn.childNodes[i].childNodes[0].setAttribute("onclick","document.location='/front/main/MainAction.do?method=list&locate=ko'");
		}
		if(btn.childNodes[i].className=="btn2"){
			btn.childNodes[i].childNodes[0].setAttribute("onclick","document.location='/front/main/MainAction.do?method=list&locate=en'");
		}
	}
	for(var i=0;i<btn_add.childNodes.length;i++){
		try{
			if(btn_add.childNodes[i].tagName.toLowerCase()=="a"){
				btn_add.childNodes[i].setAttribute("onclick","document.location='/back/login/login.do'");
			}
		}catch(e){};
	}
}