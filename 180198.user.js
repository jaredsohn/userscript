// ==UserScript==
// @name	Facebook Polls Back
// @namespace	frs_fbpollsback
// @author	furious_
// @description Bring back the Facebook Polls for users and Pages - Official Version
// @include	*facebook.com*
// @version	3.2
// @require	http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// @grant       none
// ==/UserScript==
var ASKBUTTON = '<li class="_c-"><a data-onclick="[[&quot;ComposerXAttachmentBootstrap&quot;,&quot;bootstrap&quot;]]" class="_9lb" aria-pressed="false" href="#" role="button" data-endpoint="/ajax/composerx/attachment/question/"><span class="uiIconText _51z7"><i class="img sp_60cj8d sx_647f2c"></i>Ask Question<i class="_2wr"></i></span></a></li>';

$(document).ready(function(){
	$('body').append('<link rel="stylesheet" type="text/css" href="https://fbstatic-a.akamaihd.net/rsrc.php/v2/yO/r/UjXXPDDGL37.css" />');
	//window.onpopstate = addbutton;
	$(document).ajaxComplete(addbutton);
	addbutton();
});

function addbutton(){
	// check if already exists "ask question" button
	if($("li[class~='_c-']").size() == 0){
		// append "ask question" button after "add photos/video" 
		$("li[class='_92']").after(ASKBUTTON);
		$("li[class~='_c-']").click(function(){
			$("._119.stat_elem").append('<span class="fcg">brought to you by <a href="http://facebook.com/furious.cc">FURiOUS</a></span>');
		});
	}
}