// ==UserScript==
// @name            HackForums Global Deny Receipt
// @namespace       xerotic/globaldenyreceipt
// @description     Allows you to deny receipt from the global pm notice.
// @include         http://hackforums.net/*
// @include         http://www.hackforums.net/*
// @version         1.0
// ==/UserScript==


var pmarea = document.getElementById('pm_notice');
var divs = pmarea.getElementsByTagName('div');
for(var j = 0; j < divs.length; j++){
	if(j==1){
		var f = divs[j];
		var links = f.getElementsByTagName('a');
		for(var i = 0; i < links.length; i++){
			if(i==1){ 
				var e = links[i];
				var link = e.href;
				var deny =  ' - <span style="font-size: 10px;"><a href="' + link + '&denyreceipt=1">[deny receipt]</a></span>';
				f.innerHTML = f.innerHTML + deny;
			}
		}
	}
}
