// ==UserScript==
// @name		GaiaOnline - Hide Threads by Ignored
// @author		skeate
// @description		Hide threads in forum listings by people on your ignore list.
// @include		http://www.gaiaonline.com/*
// @include		http://gaiaonline.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var ignorelist = [];
var currentpage = 0;
var updateDiv = document.createElement("div");

temp = GM_getValue("ignorelist");
if( temp != undefined )
	ignorelist = JSON.parse(temp);

function processlist(data){
	ignoredcount = /\d+ to \d+ of (\d+)/.exec($("#viewlist",data).text())[1];
	$("#listdetail .username a",data).each(function(){
		ignorelist.push($(this).attr("title"));
	});
	if( ignorelist.length < ignoredcount ){
		$.get("http://www.gaiaonline.com/profile/friendlist.php?list=ignored&start="+(currentpage++*15),processlist);
	} else {
		GM_setValue("ignorelist",JSON.stringify(ignorelist));
		$("#lpgmudd").html("<span style=\"font-size:100pt\">"+ignorelist.length+"</span><br/><br/>users ignored.<br/>Click anywhere to close.");
		$("#lpgmudd").click(function(){
			$(this).fadeOut("fast",function(){$("#lpgmuddo").remove();});
		});
		
	}
}
	
// allow fetching of current ignore list without overloading the servers
function updateList(){
	if( !GM_setValue ){
		alert("Please upgrade Greasemonkey.");
	} else {
		// show updating screen
		outer = document.createElement("div");
		outer.id = "lpgmuddo";
		updateDiv.id = "lpgmudd";
		$("body").append(outer);
		$("#lpgmuddo").append(updateDiv);
		$("#lpgmuddo").css({
			display: "table",
			position: "fixed",
			top: "0px",
			left: "0px",
			bottom: "0px",
			right: "0px",
			width: "100%",
			zIndex: "1000"
		});
		$("#lpgmudd").css({
			width: "100%",
			background: "rgba(0,0,0,0.75)",
			color: "white",
			display: "table-cell",
			verticalAlign: "middle",
			textAlign: "center"
		});
		$("#lpgmudd").text("Updating local ignore list...");
		$("#lpgmudd").append("<br/><br/>");
		$("#lpgmudd").append("<img src=\"http://imgur.com/iuV4k.gif\" />");
		
		// get all users on ignore list.
		ignorelist = [];
		$.get("http://www.gaiaonline.com/profile/friendlist.php?list=ignored&start="+(currentpage++*15),processlist);
	}
}

$(".forum-list .creator a").each(function(){
	if( $.inArray($(this).text(),ignorelist) != -1 )
		$(this).parents("tr").remove();
});

GM_registerMenuCommand("Update local ignore list",updateList);