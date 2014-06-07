// ==UserScript==
// @name           Enable sugang.skku.edu (Only for Opera)
// @description    Enables to using sugang.skku.edu
// @include        http://sugang.skku.edu/*
// @copyright      OLokLiR
// @version        0.1
// ==/UserScript==

function showModalDialog(oReal,oThis,oParam){
	var newParams='';
	try{
		newParams=oParam.replace(/dialog/gi,' ');
		newParams=newParams.replace(/:/g,'=');
		newParams=newParams.replace(/;/g,',');
	}catch(e){};
	_modal=window.open(oReal,oThis,newParams);
	_modal.opener=window;
}
if(document.URL=='http://sugang.skku.edu/hs/HSSULogin.do'){
	obj=document.getElementsByName('hssuform')[0];
	obj.addEventListener("submit",fncSubmit,false);
}
else{
	function _loadend(){
		try{frmMain=document.frmMain;}catch(e){}
		try{frm=document.frmMain;}catch(e){}
		try{ifHakgwaJungong=document.ifHakgwaJungong;}catch(e){}

		try{fncComCdNm();}catch(e){}
		try{fncSelect();}catch(e){}

		try{opener=window.opener;}catch(e){}
	}
	window.addEventListener("load",_loadend,false);
}