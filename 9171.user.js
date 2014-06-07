// ==UserScript==
// @name       Internet Archive - Correct character set
// @namespace  http://userscripts.org/users/7010
// @include    http://web.archive.org/web/*
// ==/UserScript==

try{
	var contentCharSet = l(getCharSet());
	if( contentCharSet && contentCharSet != l(document.characterSet))
		correctCharSet();
} catch(e){}

function getCharSet(){
	return getContentType().match(/charset=(.*)/) ? 
		RegExp.$1 : '';
}

function getContentType(){
	for(var i=0, metas=document.getElementsByTagName("meta") ; i<metas.length ; i++)
		if(l(metas[i].httpEquiv) == "content-type")
			return metas[i].content;
	
	return '';
}

function correctCharSet(){
	GM_xmlhttpRequest({
		method : 'GET', 
		overrideMimeType : getContentType(),
		url : location.href, 
		onload : function(res){
			document.body.innerHTML = res.responseText;
			
			var titles = document.getElementsByTagName('title');
			titles && (document.title = titles[titles.length - 1].textContent);
		}
	})
}

function l(s){return s && s.toLowerCase()}