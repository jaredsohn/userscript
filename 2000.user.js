// ==UserScript==
// @name           Gmail attachment reminder
// @namespace      http://www.jonathanbrodsky.com/GMscripts
// @description    Reminds you to attach a file to your email if it appears that you have not.
// @include        http*://mail.google.com/mail/*
// ==/UserScript==
if(document.getElementById('send')){
	
	var sendbutton = document.getElementById('send')
	sendbutton.addEventListener('click', function(sendbutton){
		var messagebody = document.getElementById('ta_compose').value;
		if(messagebody.match('attach')){
			var fileattachments = document.getElementsByName('file0');
			if(!fileattachments[0]){
				if(confirm('It appears that you wanted to attach a file to this email.\n Send anyways?')){
				}else{
					sendbutton.stopPropagation();
			    sendbutton.preventDefault();
				}
			}
		}
	}, true);
	
}