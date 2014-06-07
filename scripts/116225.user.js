// ==UserScript==
// @name writeInfo
// @author phoetry (http://phoetry.me)
// @url http://phoetry.me/archives/writeinfo.html
// @include *
// ==/UserScript==
~function(doc){
	if(window.location.pathname=='/')return;
	var isWP=doc.querySelector('[rel~="stylesheet"][href*="/wp-content/themes/"]'),
		isTE=doc.querySelector('[rel~="stylesheet"][href*="/usr/themes/"]'),
		I=function(id){return id&&doc.getElementById(id)},
		mail=I(isWP?'email':isTE?'mail':0),
		name=I('author'),url=I('url');
	if(!name||!mail)return;
	doc.addEventListener('keydown',function(e){
		var target=e.target;
		return 192==e.which&&0>'textarea input'.indexOf(target.nodeName.toLowerCase())&&!target.contenteditable?ins():true;
	},false);	
	function ins(){
		name.value='你的名字'; //your name
		mail.value='你的邮箱'; //your email
		if(url)url.value='你的网站'; //your website
		return false;
	}
}(window.document);