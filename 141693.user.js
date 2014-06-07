// ==UserScript==
// @name Facepunch Greentexting
// @namespace http://communistpancake.com
// @include http://facepunch.com/*
// @include http//*.facepunch.com/*
// @version 1.2
// @description >Greentexting on facepunch
// ==/UserScript==

var green = "#789922";
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};
loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js", function() {
	console.log("Started FP Greentext")
	$(".postcontent").each(function(i)
	{
		console.log("Found element")
		var lines = $.trim($(this).html()).split("<br>");
		$.each(lines, function(n,elem){
			if(elem.indexOf("&gt;") === 0 || elem.indexOf("&gt;") === 1)
			{
				lines[n] = "<span style='color:#789922'>"+elem+"</span>";
			}
		});
		$(this).html(lines.join("<br>"));
	});
	$(".posttext").each(function(i)
	{
		console.log("Found element")
		var lines = $.trim($(this).html()).split("<br>");
		$.each(lines, function(n,elem){
			if(elem.indexOf("&gt;") === 0 || elem.indexOf("&gt;") === 1)
			{
				lines[n] = "<span style='color:#789922'>"+elem+"</span>";
			}
		});
		$(this).html(lines.join("<br>"));
	});
});