// ==UserScript==
// @name		GaiaOnline - Move Friends' Threads to Top
// @author		skeate
// @description		This will move threads created by your friends to the top of any forum listing.
// @include		http://www.gaiaonline.com/*
// @include		http://gaiaonline.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var friendlist = [];
var currentpage = 0;
var updateDiv = document.createElement("div");

temp = GM_getValue("friendlist");
if( temp != undefined )
	friendlist = JSON.parse(temp);

function processlist(data){
	friendcount = /\d+ to \d+ of (\d+)/.exec($("#viewlist",data).text())[1];
	$("#listdetail .username a",data).each(function(){
		friendlist.push($(this).attr("title"));
	});
	if( friendlist.length < friendcount ){
		$.get("http://www.gaiaonline.com/profile/friendlist.php?list=friends&start="+(currentpage++*15),processlist);
	} else {
		GM_setValue("friendlist",JSON.stringify(friendlist));
		$("#lpgmudd").html("<span style=\"font-size:100pt\">"+friendlist.length+"</span><br/><br/>friends found.<br/>Click anywhere to close.");
		$("#lpgmudd").click(function(){
			$(this).fadeOut("fast",function(){$("#lpgmuddo").remove();});
		});
		
	}
}
	
// allow fetching of current friend list without overloading the servers
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
		$("#lpgmudd").text("Updating local friend list...");
		$("#lpgmudd").append("<br/><br/>");
		$("#lpgmudd").append("<img src=\"http://imgur.com/iuV4k.gif\" />");
		
		// get all users on friend list.
		friendlist = [];
		$.get("http://www.gaiaonline.com/profile/friendlist.php?list=friends&start="+(currentpage++*15),processlist);
	}
}

var stack = [];
$(".forum-list .creator a").each(function(){
	if( $.inArray($(this).text(),friendlist) != -1 ){
		$(this).parents("tr").each(function(){
			stack.push(this);
		});
	}
});
while(stack.length > 0)
	$(".forum-list tbody").prepend(stack.pop());

GM_registerMenuCommand("Update local friend list",updateList);