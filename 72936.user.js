// ==UserScript==
// @name           Google China gs_rfai fix
// @namespace      http://userstyles.org
// @include        http://www.google.com/
// @include        http://www.google.com.hk/
// @include        http://www.google.com/search*
// @include        http://www.google.com.hk/search*
// @author         CIH
// @version        0.1
// @description    针对2010/3/30出现的google搜索被重置的临时解决方案
// ==/UserScript==

function clear() {
	var cleared = disable_gs_rfai();
	if(!cleared) {
		setTimeout(function() {clear();}, 500);
	}
}

function disable_gs_rfai() {
	var inputs = document.getElementsByTagName("INPUT");
	for(var i=0;i<inputs.length;i++) {
		var input = inputs[i];
		if(input.name == "gs_rfai") {
			input.disabled = true;
			document.title = "[Fixed] " + document.title;
			return true;
		}
	}
	return false;
}

clear();