scr_meta=<><![CDATA[ // Make sure to copy this line right above the script metadata
// ==UserScript==
// @name        THelper
// @namespace   Helper.user.js
// @description Tool Helper
// @version     1.1.1
// @author		Peta
// @include		http://s*/admintool/*
// @require		http://userscripts.org/scripts/source/45326.user.js
// @require		http://userscripts.org/scripts/source/45464.user.js
// ==/UserScript==
// ===========================================================================
]]></>; // Make sure to copy this line right below

var scriptnr = 45465 ;
GM_xmlhttpRequest({
  method:"GET",
  url:"https://userscripts.org/scripts/source/"+scriptnr+".meta.js",
  headers:{
    "User-Agent":"Mozilla/5.0",    
    "Accept":"application/atom+xml,application/xml,text/xml"
  },
  onload:function(response) {
	if (/\/\/\s*@version\s*(.*)\s*\n/i.exec(response.responseText)[1] !== /\/\/\s*@version\s*(.*)\s*\n/i.exec(scr_meta)[1])
	{
	  alert('Versiune noua a Adonului pentru Tool');
      GM_openInTab('http://userscripts.org/scripts/source/'+scriptnr+'.user.js');	  
	}		
  }
}); 

var ixul = 2;
var current_url = window.location.href;
var locationss = current_url.substring(0,current_url.lastIndexOf("/")+1);
if (current_url.substring(current_url.indexOf("?action=multi.")+14,current_url.indexOf("?action=multi.")+30) == 'test'){
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=multi.")+14,current_url.indexOf("?action=multi.")+30) == 'search&search=ip'){ 
	ixul = 1;
}else if(current_url.substring(current_url.indexOf("?action=multi.")+14,current_url.indexOf("?action=multi.")+30) == 'search&search=pa'){ 
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=multi.")+14,current_url.indexOf("?action=multi.")+30) == 'search'){ 
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=ally.")+13,current_url.indexOf("?action=ally.")+29) == 'search'){ 
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=sneak.")+14,current_url.indexOf("?action=sneak.")+30) == 'search'){ 
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=user.")+13,current_url.indexOf("?action=user.")+29) == 'user'){ 
	ixul = 0;
}else if(current_url.substring(current_url.indexOf("?action=user.")+13,current_url.indexOf("?action=user.")+17) == 'edit'){ 
	ixul = 0;
}

var	rows      = document.getElementsByTagName("table")[1].getElementsByTagName("tbody")[0].getElementsByTagName('tr');
var rowl 	  = rows.length;

Main();
function Main(){
//	if (ixul>0){insertGeoLocation();}
//	if (ixul==2){insertSkill();}
}