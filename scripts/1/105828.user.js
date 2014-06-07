﻿// ==UserScript==
// @name           新浪微博不显示图片
// @namespace    新浪微博
// @description    新浪微博扁平化显示
// @include        http://*t.sina.com.cn/*
// @include        http://*weibo.com/*
// @include        http://*t.house.sina.com.cn/*

// ==/UserScript==
var references = document.getElementsByClassName("source");
function replace(){
	for (var i=0;i<references.length;i++){
		ref = references[i];
		var ori_text = " RT " + ref.innerText;
		var ori_link = ref.getElementsByClassName("source_att MIB_linkbl")[0].children[0].href;
		var new_obj = document.createElement("a");
		new_obj.innerText=ori_text;
		new_obj.href = ori_link;
		var parent = ref.parentNode.parentNode.parentNode;
		var insert_point = parent.children[0];
		insert_point.appendChild(new_obj); 
		var remove_node = ref.parentNode.parentNode;
		remove_node.parentNode.removeChild(remove_node);
	}
};
setInterval(replace, 300);
