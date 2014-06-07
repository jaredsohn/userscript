// ==UserScript==
// @name          ForumParfait
// @namespace     http://asrq.forumparfait.com/
// @description   Enlever les publicités sur ForumParfait
// @include       http://asrq.forumparfait.com/*

// ==/UserScript==

var GM_JQ = document.createElement("script");
GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js";
GM_JQ.type = "text/javascript";
document.getElementsByTagName("head")[0].appendChild(GM_JQ);

function GM_wait(){
	if (typeof unsafeWindow.jQuery == "undefined"){
		window.setTimeout(GM_wait, 100);
	}
	else{
		$ = unsafeWindow.jQuery;
		letsJQuery();
	}
}

GM_wait();

function letsJQuery(){
	$(".spaceRow").parent("tr").remove();
	$("body").css("background", "url(http://www.asrq.com/img/carbon_bkg.gif)");
	$("span.gen a[href=index.php] img:eq(0)").attr("src", "http://www.asrq.com/img/headersite.gif");
	$("span.maintitle").html("Association des Signaleurs de la R&eacute;gion du Qu&eacute;bec");
	$("table span.gen span.gen:eq(0)").html("Groupe de b&eacute;n&eacute;voles oeuvrant dans le sport automobile<br /><br />");
	$("th").css("background", "#222").css("color", "#ccc").children().css("color", "#ccc").children().css("color", "#ccc");
	$(".row1").css("background-color", "#ccc").removeAttr("valign");
	if (document.location == "http://asrq.forumparfait.com/index.php")
		$(".row1 span.genmed, .row1 span.gensmall").remove();
	$(".row2").css("background-color", "#aaa");
	$(".row2 span").css("color", "#222");
	$(".forumline").css("border", "solid 1px black");
	$(".forumlink").css("color", "#222");
	$("a").each(function(){
		if ($(this).css("color") == "rgb(0, 102, 0)")
			$(this).css("color", "#770");
		else if ($(this).css("color") == "rgb(255, 163, 79)")
			$(this).css("color", "#066");
		else
			$(this).css("color", "#111");
	});
	$("a.postlink").css("text-decoration", "underline");
}


