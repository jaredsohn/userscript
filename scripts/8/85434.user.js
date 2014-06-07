// ==UserScript==
// @name           twkt checker
// @revision       20100905
// @author         liddelu
// @namespace      http://d.hatena.ne.jp/liddelu/
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
(function(){
	try{
		var userName = document.getElementsByName("page-user-screen_name")[0].content;
	}catch(e){
		return;
	}
	makeLink();
	
	function makeLink(){

		var setPoint = document.getElementById("profile-image");
		var aTag = document.createElement("a");
		aTag.href = "http://twkr.in/user/" + userName;
		aTag.target = "_blank";
		var imgTag = document.createElement("img");
		imgTag.src = "data:image/png;base64,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";
		imgTag.width = "84";
		imgTag.height = "16";
		aTag.appendChild(imgTag);
		if(setPoint){
			var ins = setPoint.parentNode.parentNode;
		}else{
			var ins = document.getElementsByClassName("thumb clearfix")[0];  
		}
		ins.appendChild(aTag);
	}
})();


