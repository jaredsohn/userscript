// ==UserScript==
// @name           Remove 1024 for 1024bbs
// @namespace      http://t66y.com/
// @description    删除草榴论坛中无意义的1024跟帖
// @include        http://*t66y.com/htm_data/*
// @include        http://*t66y.com/read.php*
// @include        http://cl.eye.rs/read.php*
// @include        http://cl.eye.rs/htm_data/*
// @include        http://cl.orc.st/read.php*
// @include        http://cl.orc.st/htm_data/*
// @include        http://66.96.206.94/read.php*
// @include        http://66.96.206.94/htm_data/*
// ==/UserScript==

	var main = document.getElementById("main")
		,topics = main.getElementsByTagName("div")
		,_child = null
		,_parent
		,pattern = new RegExp(/^\s*1024\s*$/);
		
	for (var i = topics.length - 1; i >= 0 ; i --) {
		if ( topics[i].className === "tpc_content" &&  pattern.test(topics[i].innerText) ) {
	    	_child = topics[i];
		}
		if ( topics[i].className === "t t2" && _child) {
			topics[i].style.display = "none";
			_child = null;
		}

	}	 

