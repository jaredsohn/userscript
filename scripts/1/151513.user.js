// ==UserScript==
// @name        	auto login exhentai
// @namespace   	smk
// @description 	exhentai login
// @include     	http://exhentai.org/*
// @include     	http://g.e-hentai.org/*
// @resource		src_jquery			http://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.js
// @resource		src_jquery_cookie	https://raw.github.com/carhartl/jquery-cookie/master/jquery.cookie.js
// @run-at			document-start
// ==/UserScript==

function EHCookies(){
	cookieNames=['ipb_member_id','ipb_pass_hash'];
}
EHCookies.prototype={
	'stringify': function(){
		let obj={};
		for(let i=0;i<cookieNames.length;i++){
			cookieName=cookieNames[i];
			obj[cookieName]=$.cookie(cookieName);
		}
		return JSON.stringify(obj);
	},
	
	'parse': function(s){
		return JSON.parse(s);
	},
	
	'use': function(obj){
		if(typeof(obj)=='string')
			obj=this.parse(obj);
		for(let cookieName in obj){
			$.cookie(cookieName,obj[cookieName]);
		}
	}
};

function EHentai(){}
EHentai.prototype={
	/**
	listens to get-cookie requests from parent windows, and sends back the stringified cookie
	*/
	'isLoggedIn': function() $.cookie('ipb_member_id')!=null,
	
	'main': function(){
		//check whether this is the get-cookie iframe
		if(window.parent==window)
			return;
		window.addEventListener('message',this.onMessage.bind(this),false);
	},
	
	'onMessage': function(e){
		/**
		send cookies back to the parent frame, if the login was successful
		*/
		let message=e.data;
		if(message=='request_login_cookies'){
			if(!this.isLoggedIn()){
				parent.window.postMessage('login_failure','*');
				return;
			}
			parent.window.postMessage(new EHCookies().stringify(),'*');
		}else{
			parent.window.postMessage('unknown_request_type','*');
		}
	},
};

function ExHentai(){
	this.eleIFrame=null;
}
ExHentai.prototype={
	'isLoggedIn': function(_document){
		_document=_document || document;
		return document.querySelector('body > img')==null;
	},

	'addLoginForm': function(){
		/**
		dynamically generated forms won't have username/passwords saved
			references:
				https://bugzilla.mozilla.org/show_bug.cgi?id=355063
		*/
		GM_addStyle(
			'form {'+
			'	margin-left: auto;'+
			'	margin-right: auto;'+
			'	margin-top: 300px;'+
			'}'+
			''+
			'form, input, .submit_button {'+
			'	width: 200px;'+
			'}'+
			''+
			'.submit_button {'+
			'	background-image: -moz-linear-gradient(center top, #F5F5F5, #D8D8D8);'+
			'	border: 1px solid #9999AA;'+
			'	font-family: verdana,arial,sans-serif;'+
			'	margin-right: 10px;'+
			'	padding: 3px 0;'+
			'	font-size: 11px;'+
			'}'
		);
		
		let img=document.querySelector('body > img');
		img.parentNode.removeChild(img);
		
		let form=document.createElement('form');
		form.innerHTML=
			'<input type="text" value="username" onfocus="this.value=\'\'" name="username" size="20"><br>'+
			'<input type="password" value="password" onfocus="this.value=\'\'" name="password" size="20"><br>'+
			'<input type="submit" class="submit_button" value="login">';
		document.body.appendChild(form);
		
		let that=this;
		form.addEventListener('submit',function(e){
			GM_xmlhttpRequest({
				method: 'POST',
				url: 'https://forums.e-hentai.org/index.php?act=Login&CODE=01',
				data:
					'referer=https://forums.e-hentai.org/index.php'+
					'&UserName='+form.elements['username'].value+
					'&PassWord='+form.elements['password'].value+
                    '&CookieDate=1',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				onload: function(e){
					that.eleIFrame.contentWindow.postMessage('request_login_cookies','*');
				}
			});
			e.preventDefault();
		},false);
		
		//listen to messages from the child frame
		window.addEventListener('message',this.onMessage.bind(this),false);
	},
	
	'main': function(){
		if(this.isLoggedIn())
			return;
		//add iframe, so we can get the cookies on the g.e-hentai.org domain, and set them on exhentai.org
		let eleIFrame=document.createElement('iframe');
		this.eleIFrame=eleIFrame;
		eleIFrame.src='http://g.e-hentai.org/';
		eleIFrame.style.display='none';
		document.body.appendChild(eleIFrame);
		//add login form before loading of the iframe to be more responsive
		this.addLoginForm();
	},
	
	'onMessage': function(e){
		/**
		handle reception of messages from the child frame
		*/
		let message=e.data;
		if(message=='login_failure'){
			alert('login failed');
		}else if(message=='unknown_request_type'){
			alert('internal error: unknown_request_type');
		}else{
			//set cookies for exhentai.org
			new EHCookies().use(message);
			//refresh page to login
			document.location.reload();
		}
	},
};

function main(){
	//we run on document start, so we can run when the document is an image
	window.addEventListener('readystatechange',function listener(){
		if(document.readyState=='complete'){
			window.removeEventListener('readystatechange',listener);
			//load jquery
			eval(GM_getResourceText('src_jquery'));
			eval(GM_getResourceText('src_jquery_cookie'));
			switch(document.domain){
				case 'exhentai.org': new ExHentai().main(); break;
				case 'g.e-hentai.org': new EHentai().main(); break;
			}
		}
	}, true);

}

main();
