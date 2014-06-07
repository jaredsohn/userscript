// ==UserScript==
// @name           Stack Overflow: Save question to Delicious
// @namespace      http://userscripts.org/users/gangsta75
// @description    Save question to Delicious with Stackoverflow tags
// @include        http://stackoverflow.com/questions/*
// @include        http://meta.stackoverflow.com/questions/*
// @include        http://superuser.com/questions/*
// @include        http://serverfault.com/questions/*
// @include        http://stackapps.com/questions/*

// ==/UserScript==

var DELICIOUS_USERNAME = 'your_username_here'; //Your username here otherwise tags will not work
var DEFAULT_TAGS = 'stackoverflow'; //Space-separated tags

function wait() {
	if(typeof unsafeWindow.jQuery != 'function') { 
		window.setTimeout(wait, 100); 
	} else {         
	        unsafeWindow.jQuery('#question .vote:first').append('<div id="Delicious" style="margin-top:8px"><a alt="Delicious" title="Save to Delicious" href="javascript:(function(){f=\'http://delicious.com/save?user='+DELICIOUS_USERNAME+'&url=\'+encodeURIComponent(window.location.href)+\'&title=\'+encodeURIComponent(document.title)+\'&v=5&tags=\'+encodeURIComponent(\''+DEFAULT_TAGS+' '+unsafeWindow.jQuery.map(unsafeWindow.jQuery('.post-taglist a'),function(x){return encodeURIComponent(x.text)}).join('%20')+'\')+\'&\';a=function(){if(!window.open(f+\'noui=1&jump=doclose\',\'deliciousuiv5\',\'location=yes,links=no,scrollbars=no,toolbar=no,width=550,height=550\'))location.href=f+\'jump=yes\'};if(/Firefox/.test(navigator.userAgent)){setTimeout(a,0)}else{a()}})()"><img src="http://static.delicious.com/img/delicious.med.gif"</img></a></div>');		
	}
}
wait();
