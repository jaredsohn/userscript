// ==UserScript==
// @name           Gaia AutoComplete
// @namespace      http://userscripts.org/users/62850
// @description    Auto Complete for gaia
// @include        http://www.gaiaonline.com/*
// @include        https://www.gaiaonline.com/*
// ==/UserScript==
function AutoComplete(LL,UN,PW,AL){
	if(GM_getValue('runct')==0){
		GM_setValue('runct',1);
		if(LL.length==3){
			if(unescape(LL[0])==UN.value&&unescape(LL[1])==PW.value){
				return;
			}
		}
		if(confirm('Enable Autocomplete for this account.')===true&&PW.value.length>0){
			GM_setValue('LastGaiaLogin',escape(UN.value)+','+escape(PW.value)+','+AL.checked);
		}
	}
}
if(document.getElementById('memberloginForm')){
	var LL=GM_getValue('LastGaiaLogin','').split(',');
	var UN=document.getElementById('username');
	var PW=document.getElementById('password');
	var AL=document.getElementById('autologin');
	var LB=document.getElementById('signInButton');
	if(UN.value==''){
		LB.addEventListener('click',function(){AutoComplete(LL,UN,PW,AL)},false);
		UN.addEventListener('keypress',function(e){if(e.keyCode==13){AutoComplete(LL,UN,PW,AL)}},false);
		PW.addEventListener('keypress',function(e){if(e.keyCode==13){AutoComplete(LL,UN,PW,AL)}},false);
		AL.addEventListener('keypress',function(e){if(e.keyCode==13){AutoComplete(LL,UN,PW,AL)}},false);
		if(LL.length==3){
			UN.value=unescape(LL[0]);
			PW.value=unescape(LL[1]);
			AL.checked=LL[2];
			UN.className='textbox';
			PW.className='textbox';
		}
		GM_setValue('runct',0);
	}
}
else if(document.location.href.indexOf('/marketplace/')!=-1){
	try{
		document.getElementsByName('password')[0].value=unescape(GM_getValue('LastGaiaLogin','').split(',')[1]);
	}
	catch(e){}
}else if(document.location.href.indexOf('/gaia/bank.php')!=-1){
	try{
		document.getElementById('password_entry').value=unescape(GM_getValue('LastGaiaLogin','').split(',')[1]);
	}
	catch(e){}
}