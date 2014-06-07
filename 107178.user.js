// ==UserScript==
// @name           Facebook-Chat Enchancer
// @namespace      *facebook*
// @include        *facebook*
// ==/UserScript==
// Copyright: Lakshika Gayal
// All rights reserved!
// Facebook Chat-Enhancer
// Lets the new Facebook Chat-Bar looks like the old one!


function createCSS(selector,declaration){
	var ua=navigator.userAgent.toLowerCase();
	var isIE=(/msie/.test(ua))&&!(/opera/.test(ua))&&(/win/.test(ua));
	var style_node=document.createElement("style");
	style_node.setAttribute("type","text/css");
	style_node.setAttribute("media","screen");
	if(!isIE)
		style_node.appendChild(document.createTextNode(selector+" {"+declaration+"}"));
	document.getElementsByTagName("head")[0].appendChild(style_node);
	if(isIE&&document.styleSheets&&document.styleSheets.length>0){
		var last_style_node=document.styleSheets[document.styleSheets.length-1];
		if(typeof(last_style_node.addRule)=="object")
			last_style_node.addRule(selector,declaration);
	}
};
createCSS('.fbChatOrderedList .item','display:none;');
createCSS('.fbChatOrderedList .active, .fbChatOrderedList .idle','display:block;');

function insertIntoBody() {
  var copyright = document.createElement('span');
  copyright.innerHTML = '<br><br><center><a href="">Chat-Enhancer Created By Lakshika Gayal</a><br><b>Chat-Enhancer , Copyright, Lakshika Gayal</center></b>';
  document.getElementsByTagName('body')[0].appendChild(copyright);
 maximize_chat();
}

window.addEventListener('load', insertIntoBody, true);

function maximize_chat () {
	if (document.getElementsByClassName) {
        	var Lists = document.getElementsByClassName ("fbChatOrderedList");

                for (var i = 0; i < Lists.length; i++) {
                    var List = Lists[i];
			List.style.display = "none";
			List.setAttribute('style', 'height:50000px; overflow: hidden;');
			window.resizeBy(1,1);
                }
            }
            else {
                alert ("Your browser does not support the getElementsByClassName method.");
            }
}