// ==UserScript==
// @name           FotoliaDefaults
// @namespace      net.melastmohican
// @description    Sets Fotolia default values
// @version      1.01
// @include        http://www.fotolia.com/Member/IndexContent/*
// ==/UserScript==

(
function()
{


function click(e) {
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
	var canceled = !e.dispatchEvent(evt);
	GM_log("event canceled = " + canceled);
}

var doAfterLoad = function(event) {
	var add_to_keyword = document.getElementById("add_to_keyword");
	var extended_license_true = document.getElementById("extended_license_true");
	var accept_contract = document.getElementById("accept_contract"); 
	var finish_button = document.getElementById("finish_button"); 
	var save_button = document.getElementById("save_button");  
	
	
	click(extended_license_true);
	accept_contract.checked = true;
	save_button.disabled  = false;
	finish_button.disabled  = false;
	click(add_to_keyword);
}; 

// Wait until page loads
window.addEventListener("load", doAfterLoad, false);


}
)();