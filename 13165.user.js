// ==UserScript==
// @name           SU Forums Enhancer
// @author         Nathan Blume
// @contributor    Josh1billion
// @namespace      thlayli.detrave.net
// @description    This adds an option to StumbleUpon forum threads allowing you to double-post or provide your browser info.
// @based-on       http://userscripts.org/scripts/show/13101
// @include        http://*.group.stumbleupon.com/forum/*
// @version        1.0
// ==/UserScript==

if(document.location.href.substr((document.location.href.length-6),6) != 'forum/'){
	var inputs = document.getElementsByTagName('input');
	for(i=0;i<inputs.length;i++){
		if(inputs[i].name == 'edit')
			var hiddenEdit = inputs[i];
		if(inputs[i].type == 'submit')
			var submitButton = inputs[i];
	}
	var labels = document.getElementsByTagName('label');
	for(i=0;i<labels.length;i++){
		if(labels[i].getAttribute('for') == 'browser_info')
			labels[i].parentNode.parentNode.removeChild(labels[i].parentNode);
	}
	var browserInfo = document.createElement('input');
	browserInfo.setAttribute('id','browser_info');
	browserInfo.setAttribute('name','browser_info_off');
	browserInfo.setAttribute('type','hidden');
	browserInfo.setAttribute('value','on');
	var infoCheckbox = document.createElement('span');
	infoCheckbox.setAttribute('style','float:right;');
	infoCheckbox.innerHTML = "<input id='browser_info_checkbox' type='checkbox'/><label for='browser_info'>Include browser info</label><br /><input id='new_post_checkbox' type='checkbox'/><label for='new_post'>New post</label>";
	document.forms[1].appendChild(browserInfo);
	submitButton.parentNode.insertBefore(infoCheckbox,submitButton);
	document.getElementById('browser_info_checkbox').addEventListener('click', toggleInfo, false);
	document.getElementById('new_post_checkbox').addEventListener('click', toggleNew, false);
}
function toggleNew(){
	hiddenEdit.name = (hiddenEdit.name == 'edit') ? 'edit_off' : 'edit' ;
}
function toggleInfo(){
	box = document.getElementById('browser_info');
	box.name = (box.name == 'browser_info_off') ? 'browser_info' : 'browser_info_off' ;
}