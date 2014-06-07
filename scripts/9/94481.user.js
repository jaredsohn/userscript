// ==UserScript==
// @name           Disqus corrections
// @namespace      http://userscripts.org/users/lorriman
// @description    Addresses problems with the Disqus forum service.
// @include        http://telegraphuk.disqus.com/thread/*
// @include        http://www.telegraph.co.uk/*
// @include        *.disqus.*
// @include        http://disqus.com/*
// @include     http://mediacdn.disqus.com/*
// @include     http://www.disqus.com/*
// @require	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// @version	   0.1
// ==/UserScript==



function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//place-holder code for future ideas, but it doesn't do anything.
var nodeInsertedHandler = function (event) {
try{
    if(event.target.tagName == 'div' && event.target.getAttribute('class') == 'dsq-textarea-wrapper' ){
	//var textarea = $(event.target);
	

	alert(event.target.getAttribute('style'));	
	event.target.setAttribute('style',"height: 400px; overflow-y: hidden;");
	alert(event.target.getAttribute('style'));

/*
	if($(event.target).parent('#label-list') ){
	    replaceTagList(ol);
	}
*/

   }



}

catch( err){
alert(err.message);
}
}


//document.addEventListener("DOMNodeInserted", nodeInsertedHandler, false);


addGlobalStyle('.dsq-textarea {   overflow-y: auto ! important} .dsq-textarea-wrapper {  overflow-y: auto ! important}');


