// ==UserScript==
// @name 人教电子课本助手
// @version 3.0
// @namespace //代码@小柯_小哀
// @description 人教电子课本助手
// @include http://www.pep.com.cn/*
// ==/UserScript==
var now_node;


function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load',
	function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	},
	false);
	document.body.appendChild(script);
}
function main() {
jQ(document).ready(function(){
jQ(document).on("click","#PreElementLink",function (event)
{
	event.preventDefault();
	var node = now_node.prev("D");
	if(node.length)
	{
		jQ("#doccontent").load("../"+node.find("L").text()+" #doccontent p");
		now_node = node;
	}
if(now_node.prev("D").length) jQ("#PreElementLink").show();
else jQ("#PreElementLink").hide();
if(now_node.prev("D").length) jQ("#NextElementLink").show();
else jQ("#NextElementLink").hide();
});
jQ(document).on("click","#NextElementLink",function (event)
{
	event.preventDefault();
	var node = now_node.next("D");
	if(node.length) 
	{
		jQ("#doccontent").load("../"+node.find("L").text()+" #doccontent p");
		now_node = node;
	}
if(now_node.prev("D").length) jQ("#PreElementLink").show();
else jQ("#PreElementLink").hide();
if(now_node.prev("D").length) jQ("#NextElementLink").show();
else jQ("#NextElementLink").hide();
});
jQ.ajax({url:XML_FILE,dataType:"xml",
success:function(xml){
xml = xml.getElementsByTagName("Documents");
if(xml&&xml[0]) xml = xml[0];
now_node = jQ(xml).find("ID:contains("+m_oCurrentDocId+")").parent("D");
if(now_node.prev("D").length) jQ("#PreElementLink").show();
else jQ("#PreElementLink").hide();
if(now_node.prev("D").length) jQ("#NextElementLink").show();
else jQ("#NextElementLink").hide();
console.log(now_node);
}});
})}
addJQuery(main);
