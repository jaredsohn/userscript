// ==UserScript==
// @name           GaiaOnline - QuickBump
// @namespace      http://userscripts.org/users/126924
// @description    Adds a button to bump a thread
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

this_id = document.URL.match(/\/t\.([0-9]+)(_.*?)?\//);

post_url = "";
if( this_id != null ) post_url = "http://www.gaiaonline.com/forum/compose/ajaxentry/new/"+this_id[1]+"/";

$(".thread_options").prepend("<a class=\"info_button quickbump\" href=\"#\">"+
	"<span class=\"button_cap\">&nbsp;</span>"+
	"<span class=\"button_text\">QuickBump</span></a>");

$("#qr_submit").before("<a class=\"info_button\" id=\"savequickbump\" href=\"#\" style=\"float:left;margin:10px 0px 0px 15px;\">"+
	"<span class=\"button_cap\">&nbsp;</span>"+
	"<span class=\"button_text\">Save as QuickBump</span></a>");

$("#savequickbump").click(function(e){
	e.preventDefault();
	if( $("#qr_text").val() != "" ){
		GM_setValue("bumptext",$("#qr_text").val());
		$("#savequickbump span:last").text("Saved!");
		setTimeout(function(){$("#savequickbump span:last").text("Save as QuickBump");},2000);
	}
});

$(".quickbump").click(function(e){
	e.preventDefault();
	$.post(post_url,{message:GM_getValue("bumptext","bump"),action_submit:"submit"},function(data){
		res = JSON.parse(data);
		if( res.status )
			window.location = res.url;
		else{
			$("body").append("<div id=\"bigexclo\"><span id=\"bigexcl\">!</span></div>");
			$("#bigexclo").css({
				display: "table",
				position: "fixed",
				top: "0px",
				left: "0px",
				bottom: "0px",
				right: "0px",
				width: "100%",
				zIndex: "1000"
			});
			$("#bigexcl").css({
				width: "100%",
				background: "rgba(0,0,0,0)",
				color: "red",
				display: "table-cell",
				verticalAlign: "middle",
				textAlign: "center",
				fontSize: "200pt"
			});
			setTimeout(function(){$("#bigexclo").fadeOut("slow",function(){$(this).remove();});},1000);
		}
	});
});