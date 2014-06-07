// ==UserScript==
// @name           HK Stock Level Display
// @namespace      http://userscripts.org/users/434053
// @description    shows hidden item stock level (with BK level)
// @include        http://*.hobbyking.com/*
// @include        http://hobbyking.com/* 
// @author         qemay
// ==/UserScript==

var td_list=document.getElementsByTagName("td");
var stocklevel;
stocklevel=document.getElementsByName("stocklevel")[0].value;

for (var i = 0; i < td_list.length; i++) {
    var td = td_list[i];
    if (td.width == '47') {
        // do something here with a <input type="text" .../>
        // we alert its value here
		if (td.innerHTML=='<font style="font-family:Verdana, Arial, Helvetica, sans-serif; font-size:14px">BK</font>'){
			td.innerHTML='<font style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 8px; color: red;">BK '+stocklevel+'</font>';
		} else {
			td.innerHTML='<font style="font-family: Verdana,Arial,Helvetica,sans-serif; font-size: 8px;">'+stocklevel+'</font>';
		}
    }
} 