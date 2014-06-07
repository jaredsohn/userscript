// ==UserScript==
// @name        SUBMANGA READER
// @namespace   sancagon87@gmail.com
// @description Lector de Manga para submanga.com // made by sancagon87
// @include     submanga.com/c/*
// @version     1
// @grant       none
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

//document.body.style.background = "#ffffff"; 

$("div").attr("id","paginas");
$(".l").append("<a id='prog'></a>");
$("#paginas").css("overflow", "hidden");
$("#paginas").css("margin-top", "33px");
$("#paginas").css("margin-bottom", "0px");

var i=0;
var pos=1;
$("#paginas").contents().each(function(){
	i++;
	if(i==1){
		$(this).css("display", "block");
		$(this).attr("class", "select");
	} else {
		$(this).css("display", "none");
	}
	$(this).css("height", $(window).height() - 33);
});
updateProgreso();
$("body").prepend("<div id='zoom' style='position:absolute;height:100%; width:100%;margin-top:33px;top:0;overflow:hidden;'><div style='width:100%;height:100%;position:absolute;top:0px;margin-top:0;'></div><img src='" + $(".select img").attr("src") + "' style='visibility:hidden;'></div>");

$("#paginas").contents().find("img").each(function(){$(this).css("height", "100%");});

$("#zoom").css("height", $(window).height() - 33);
$("#paginas").css("height", $(window).height() - 33);

function updateProgreso()
{
	var pro = 0;
	if(pos > 1){
		pro = Math.round(pos*100/i);
	}
	
	$("#prog").text(" ");
	if(pos < 10) $("#prog").text($("#prog").text() + "0");
	$("#prog").text($("#prog").text() + pos + "/");
	if(i < 10) $("#prog").text($("#prog").text() + "0");
	$("#prog").text($("#prog").text() + i);
		
	for(j = 0; j < pro; j++)
	{
		$("#prog").text($("#prog").text() + "-");
	}
	$("#prog").text($("#prog").text() + "|>|");
	for(h = 0; h < 100-pro; h++)
	{
		$("#prog").text($("#prog").text() + "-");
	}
	$("#prog").text($("#prog").text() + " " + pro + "%");
}

function cambiar(dir)
{
	switch(dir){
		case 1:
			if(pos > 1)
			{
				$(".select").css("display", "none");
				$(".select").attr("class", "");
				$("a[name=p"+ (pos-1) +"]").css("display", "block");
				$("a[name=p"+ (pos-1) +"]").attr("class", "select");
				pos--;
			}
			break;
		case 2:
			if(pos < i) {
				$(".select").css("display", "none");
				$(".select").attr("class", "");
				$("a[name=p"+ (pos+1) +"]").css("display", "block");
				$("a[name=p"+ (pos+1) +"]").attr("class", "select");
				pos++;
			}
			break;
		case 3:
			$(".select").css("display", "none");
			$(".select").attr("class", "");
			$("a[name=p"+ (1) +"]").css("display", "block");
			$("a[name=p"+ (1) +"]").attr("class", "select");
			pos = 1;
			break;
		case 4:
			$(".select").css("display", "none");
			$(".select").attr("class", "");
			$("a[name=p"+ (i) +"]").css("display", "block");
			$("a[name=p"+ (i) +"]").attr("class", "select");
			pos = i;
			break;
	}
	updateProgreso();
	
	$("#zoom img").attr("src", $(".select img").attr("src"));
}

$(document).mousemove(function(e){
	var bot =  $(".select img").height() - $("#zoom img").height();
	var por	= $(".select img").height()/100;

	if((e.pageX >= ($(document).width()/2)-($(".select img").width()/2)) && (e.pageX <= ($(document).width()/2)+($(".select img").width()/2)) && (e.pageY >= 33) && (e.pageY <= 33+$(".select img").height()))
	{
		$("#zoom img").css("visibility", "visible");
		
		if((e.pageY <= 20*por))
		{ 
			$("#zoom img").css("margin-top", 0);
		} else if((e.pageY >=20*por) && (e.pageY <= 80*por)){
			var por2 = (e.pageY - 20*por)*100/(60*por);
			$("#zoom img").css("margin-top", por2*bot/100);
		} else if(e.pageY > 80*por){
			$("#zoom img").css("margin-top", bot);
		}

	} else {
		$("#zoom img").css("visibility", "hidden");
	}
});

$( window ).resize(function() {
	$("#paginas").css("height", parseInt($(window).height()) - 33 + "px");
	$("#paginas").contents().each(function(){
		$(this).css("height", $(window).height() - 33);
	});
	$("#zoom").css("height", $(window).height() - 33);
});

$(document).keyup(function(e){
	switch(e.which){
		case 37:	/* izquierda */
			cambiar(1);
			break;
		case 39:	/* derecha */
			cambiar(2);
			break;
		case 36:	/* fin */
			cambiar(3);
			break;
		case 35:	/* inicio */
			cambiar(4);
			break;
	}
});
$("#zoom").dblclick(function(e) {
	if(e.pageX >= ($(document).width()/2))
	{
		cambiar(2);
	} else {
		cambiar(1)
	}
});
