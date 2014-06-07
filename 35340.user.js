// ==UserScript==
// @name           Forum icons
// @description    Novos icons do forum
// @include        http://www*.cs-manager.com/forum/*
// ==/UserScript==

var stajl="display:block;margin:auto;";
for(var $=0;(K=document.getElementsByTagName("img")[$]);$++){
	switch(String(K.src).substr(34)){
		
		case"forum_topic_unread.png":
			K.src="http://img136.imageshack.us/img136/1582/maximize1qv2.gif";
			break;
		case"forum_topic_read.png":
			K.src="http://img528.imageshack.us/img528/4885/maximizesy9.gif";
			break;
		case"forum_topic_closed.png":
			K.src="http://imageshack.dk/imagesfree/Wre55658.png";
			break;

		case"forum_unread.png":
			K.src="http://img136.imageshack.us/img136/1582/maximize1qv2.gif";
			break;
		case"forum_read.png":
			K.src="http://img528.imageshack.us/img528/4885/maximizesy9.gif";
			break;


	}
}