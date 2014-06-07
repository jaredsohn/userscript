// ==UserScript==
// @name           ituogrenci
// @namespace      http://www.ituogrenci.com/
// @description    A script for ITU Otomasyon
// @include        http://www.sis.itu.edu.tr/
// @include        http://node*.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_WWWLogin
// @include        http://node*.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_GenMenu?name=bmenu.P_MainMnu&msg=WELCOME
// @include        http://node*.sis.itu.edu.tr:8092/pls/pprd/kyol.P_Kisa
// @include        http://node*.sis.itu.edu.tr:8092/pls/pprd/kayit.P_AddDrop
// ==/UserScript==
var url=document.URL;
var str=url.substr(11,1);
function specifyURL(){
	if(url=="http://www.sis.itu.edu.tr/") return "home";
	else{
		url=url.substr(42);
		if(url=="twbkwbis.P_WWWLogin") return "login";
		else if(url=="twbkwbis.P_GenMenu?name=bmenu.P_MainMnu&msg=WELCOME") return "welcome";
		else if(url=="kyol.P_Kisa") return "register";
		else if(url=="kayit.P_AddDrop") return "afterRegister";
	}
}
function insertLogoutLink(){
	var logout=document.createElement("div");
	logout.setAttribute('style','margin: 0 auto 0 auto; border-bottom: 1px solid #000000; margin-bottom: 5px; font-size: small; background-color: #ff0000; color: #ffffff; cursor:pointer; text-align:center');
	logout.addEventListener('click',function(){unsetCookie();},true);
		var logoutP=document.createElement('p');
		logoutP.setAttribute('style','margin: 2px 0 1px 10px;');
			var logoutBig=document.createElement('big');
				var logoutB=document.createElement('b');
				logoutB.textContent="CIKIS";
			logoutBig.appendChild(logoutB);
		logoutP.appendChild(logoutBig);
	logout.appendChild(logoutP);
	document.body.insertBefore(logout, document.body.lastChild);
}
function getCookie(c_name){
	if(document.cookie.length>0){
		c_start=document.cookie.indexOf(c_name+"=");
		if(c_start!=-1){
			c_start=c_start+c_name.length+1;
			c_end=document.cookie.indexOf(";",c_start);
			if(c_end==-1) c_end=document.cookie.length;
			return unescape(document.cookie.substring(c_start,c_end));
		}
	}
	return "";
}
function setCookie(c_name,value,expiredays){
	var exdate=new Date();
	exdate.setDate(exdate.getDate()+expiredays);
	document.cookie=c_name+"=" +escape(value)+((expiredays==null)?"":";expires="+exdate.toGMTString());
}
function unsetCookie(){
	document.cookie="SESSID='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie="TESTID='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie="userid='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie="pin='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie="crn2Register='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.cookie="crn2Delete='';expires=;expires=Thu, 01-Jan-1970 00:00:01 GMT";
	document.location.href='http://node'+str+'.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_WWWLogin';
}
function isNumeric(sText){
	var validChars="0123456789";
	var character;
	for(i=0;i<sText.length;i++){
		character=sText.charAt(i);
		if(validChars.indexOf(character)==-1) return false;
	}
	return true;
}
function validateCrnList(crnList){
	if(crnList.length==0) return true;
	crnTemp=crnList.split(",");
	for(var i=0;i<crnTemp.length;i++) if(crnTemp[i].length!=5||!isNumeric(crnTemp[i])) return false;
	return true;
}
var Surl=specifyURL();
if(Surl=="home"){
	var td = document.getElementsByTagName('td');
	td[1].innerHTML+='|';
	for(i=1;i<10;i++) td[1].innerHTML+='<a href="http://Node'+i+'.sis.itu.edu.tr:8092/pls/pprd/twbkwbis.P_WWWLogin" target="_blank"> '+i+' </a>|';
}else if(Surl=="login"){
	var loginForm=document.forms[0];
	if(!loginForm) window.setTimeout(function(){window.location.reload();},3000);
	var txtUserid=document.getElementById("Userid");
	var txtpin=document.getElementsByName("pin");
	if(txtUserid&&txtpin){
		userid=getCookie('userid');
		pin=getCookie('pin');
		crn2Register=getCookie('crn2Register');
		crn2Delete=getCookie('crn2Delete');
		if(userid==null||userid==""||pin==null||pin==""||crn2Register==null||crn2Register==""||crn2Delete==null||crn2Delete==""){
			userid=prompt('Please enter your User ID:',"");
			if(userid!=null&&userid!="") setCookie('userid',userid,1);
			pin=prompt('Please enter your PIN:',"");
			if(pin!=null&&pin!="") setCookie('pin',pin,1);
			do{ crn2Register=prompt('Please enter CRNs to register seperated with comma (11111,10000):',""); }while(!validateCrnList(crn2Register));
			if(crn2Register!=null&&crn2Register!="") setCookie('crn2Register',crn2Register,1);
			do{ crn2Delete=prompt('Please enter CRNs to delete seperated with comma (11111,10000):',""); }while(!validateCrnList(crn2Delete));
			if(crn2Delete!=null&&crn2Delete!="") setCookie('crn2Delete',crn2Delete,1);
		}
		txtUserid.value=userid;
		txtpin[0].value=pin;
		loginForm.submit();
	}else window.setTimeout(function(){window.location.reload();},3000);
}else if(Surl=="welcome"){
	insertLogoutLink();
	document.location.href='http://node'+str+'.sis.itu.edu.tr:8092/pls/pprd/kyol.P_Kisa';
}else if(Surl=="register"){
	var registerForm=document.forms[0];
	if(!registerForm) window.setTimeout(function(){window.location.reload();},3000);
	var CRN1=document.getElementsByName('CRN1');
	var CRN1Length=CRN1.length;
	var tableCurrentSchedule = document.getElementsByTagName('table');
	tableCurrentSchedule = tableCurrentSchedule[0];
	var _crn2Register=getCookie('crn2Register');
	if(_crn2Register){
		var crn2Register=_crn2Register.split(",");
		var CRN2=document.getElementsByName('CRN2');
		var crn2RegisterLength=crn2Register.length;
		for(var i=0;i<crn2RegisterLength;i++){
			CRN2[i].value=crn2Register[i];
			for(var j=0;j<CRN1Length;j++)
				if(CRN1[j].value==crn2Register[i])
					tableCurrentSchedule.rows[j+1].style.background="#88ff00";
		}
	}
	var _crn2Delete=getCookie('crn2Delete');
	if(_crn2Delete){
		var crn2Delete=_crn2Delete.split(",");
		var crn2DeleteLength=crn2Delete.length;
		var RSTS=document.getElementsByName('RSTS');
		for(var i=0;i<crn2DeleteLength;i++)
			for(var j=0;j<CRN1Length;j++)
				if(CRN1[j].value==crn2Delete[i])
					RSTS[j].options[1].selected=true;
	}
	// if(crn2DeleteLength>0||crn2RegisterLength>0) window.setTimeout(function(){registerForm.submit();},1000);
	colorizeErrors();
	insertLogoutLink();
}else if(Surl=="afterRegister"){
	if(document.title=="404 Not Found") window.setTimeout(function(){history.go(-1	);},0);
	insertLogoutLink();
}
