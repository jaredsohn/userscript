// ==UserScript==
// @name           Yahoo! Mail - Login Simplified
// @namespace      http://www.Ez-IT-Solutions.com
// @description    Automatically cleans up the Yahoo! Mail Login page to make it simple and clean - NOTE: This code is entirely based off of Broccoli's script located here: http://userscripts.org/scripts/show/123826
// @grant          GM_log
// @include        http*://login.yahoo.com/config/*
// @version        1.0
// ==/UserScript==

try{

	sta=document.getElementById('static');sta.parentNode.removeChild(sta);
	ifh=document.getElementById('iframeHolder');ifh.parentNode.removeChild(ifh);
	document.getElementById('yUnivHead').appendChild(document.getElementById('signUpBtn'));
	document.getElementById('yUnivHead').appendChild(document.getElementById('idpBtns'));
	document.getElementsByClassName('yregbx')[0].setAttribute('style','border:solid #888 1px');

	document.getElementById('inputs').setAttribute('style','width:220px;');
	document.getElementById('username').setAttribute('style','margin-top:4px; padding-left:5px; padding-right:5px;');
	document.getElementById('passwd').setAttribute('style','margin-top:4px; padding-left:5px; padding-right:5px;');
	document.getElementsByClassName('ap-h1')[0].setAttribute('style','margin:0px');

	var SignIn = document.getElementsByClassName('ap-h1')[0].innerHTML
	SignIn = document.getElementsByClassName('ap-h1')[0].innerHTML.replace(/\<br\s*\>/g, '');
	document.getElementsByClassName('ap-h1')[0].innerHTML = SignIn
	
	// *** NOTE: *** -- The code above could be simplified by simply using the following:
	//document.getElementsByClassName('ap-h1')[0].innerHTML = 'Sign in to Yahoo!';

   } catch(me){}

fashion=
   {
	"a1":"#iframeHolder,#footer,#uncheck,#static,#yregdsilu,#lisu,#ap,#idp,a#fBtnLnk,a#gBtnLnk{display:none;}",
	"a2":"body{background-color:#eeeeee;overflow:hidden;}#signUpBtn{position:relative;top:-31px;left:190px;}",
	"a3":"#signUpBtn:hover{border:solid black 1px;}#idpBtns{position:relative;top:-31px;left:220px;width:250px;display:inline-block;}",
	"a4":"#fBtn{position:relative;top:-26px;left:100px;}#gBtn{position:relative;top:-26px;left:100px;}",
	"a5":"#yuhead-com-links{position:relative;top:13px;left:20px;}",
	"a6":"#yreglg,#loginBox{width:100%}#loginBox{position:relative;left:-560px}",
	"a7":"#username,#passwd{height:20px;font-size:20px;border:solid #888888 1px;border-radius:5px;color:#888888;font-weight:bold;outline:none;}",
	"a8":"#yregmain,.badge{position:relative;left:285px;}",
	"a9":"#username:focus,#passwd:focus{border:solid #888 1px;box-shadow:0px 0px 7px #888888}",
	"a0":"#hdBg{position:relative;left:-17px;background-image:url('');}body{margin-top:75px;}",
	"b0":"#fBtn,#gBtn{opacity:1;box-shadow: 1px 1px 1px #888}#fBtn:hover,#gBtn:hover{cursor:pointer;opacity:0.8;}",
	"b1":"#inputs label{display:inline;}"
}

style=document.createElement("style"); cssText=''
for(a in fashion){cssText+=fashion[a]}
style.innerHTML=cssText;
document.body.appendChild(style);
cssText=''; fashion={}
