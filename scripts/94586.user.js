// ==UserScript==
// @name          Tutorial 9 auto redirection
// @namespace     t9_redirect
// @description	  If the article isn't T9 exclusive, auto jumps to the users' links.
// @author        ZH CEXO
// @homepage      http://www.zhcexo.com/
// @include       http://www.tutorial9.net/*
// @version       0.1 beta
// ==/UserScript==
(function(){
	if(!document.getElementById("submission_content")) return false;
	var parent = document.getElementById("submission_content");
	var main = parent.getElementsByTagName("div");
	for(var i=0;i<main.length;i++){
		if(main[i].className == "submission_main"){
			var submission_main = main[i];
			break;
		}
	}
	var submission = submission_main.getElementsByTagName("span");
	for(var i=0;i<submission.length;i++){
		if(submission[i].className == "visit_source_link"){
			var link = submission[i].getElementsByTagName("a")[0].href;
			document.location.href = link;
		}
	}
	return false;
})();