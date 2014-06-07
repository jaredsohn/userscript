// ==UserScript==
// @name           GaiaOnline - List Annotations
// @namespace      http://userscripts.org/users/126924
// @description    Allows you to add notes about users on friend/ignore lists
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var reasons = {};
temp = GM_getValue("reasons");
if( temp != undefined )
	reasons = JSON.parse(temp);

var uid;

function lightbox(inside){
	$("body").append("<div id=\"fullouter\"><div id=\"fullinner\"></div></div>");
	$("#fullouter").css({
		display: "table",
		position: "fixed",
		top: "0px",
		left: "0px",
		bottom: "0px",
		right: "0px",
		width: "100%",
		zIndex: "1000"
	});
	$("#fullinner").css({
		width: "100%",
		background: "rgba(0,0,0,0.75)",
		color: "white",
		display: "table-cell",
		verticalAlign: "middle",
		textAlign: "center"
	});
	$("#fullinner").append(inside);
}

$("#ignore a").live("mousedown",function(e){
	uid = $(this).attr("href").match(/hook=(\d+)&/)[1];
	$(this).attr("href","javascript:");
});

$("#ignore a").live("mouseup",showDialog("ignore"));

$("#addfriend a").live("mousedown",function(e){
	uid = $(this).attr("href").match(/add\/(\d+)?/)[1];
	$(this).attr("href","javascript:");
	$("#addfriend a",unsafeWindow.document).removeAttr("onclick");
});

$("#addfriend a").live("mouseup",showDialog("friend"));

function showDialog(type){
	return function(){
		box = $("<form method=\"post\"><div><h2></h2><a href=\"#\">[X]</a>"+
			"<div><span>Notes:</span><textarea id=\"listannotations\"></textarea></div>"+
			"<div><input type=\"submit\" name=\"submit\" value=\"Loading...\" disabled=\"disabled\" /></div></div></form>");
		if( type == "friend" ){
			$.post("/friends/add/"+uid,{view:"ajax"},function(data){
				temp = JSON.parse(data);
				if( temp.body != null ){
					searchedbody = temp.body.match(/name=\"nonce\" value=\"(\d+\.\d+\.\d+)\"/);
					if( searchedbody != null && searchedbody.length > 1 ){
						nonce = searchedbody[1];
						$(box).find("input:submit").val("Add");
						$(box).find("input:submit").removeAttr("disabled");
						$(box).append("<input type=\"hidden\" name=\"nonce\" value=\""+nonce+"\" />");
					} else {
						$(box).html(temp.body);
						$(box).find("a").css("color","white");
						$(box).find("a").click(function(e){
							e.preventDefault();
							$("#fullouter").fadeOut(function(){$(this).remove();});
						});
					}
				}
			});
			$(box).find("h2").text("Add as Friend");
			$(box).attr("action","/friends/add/"+uid+"/");
			$(box).find("div a").after("<div><span>Message:</span><textarea name=\"message\"></textarea></div>");
			$(box).append("<input type=\"hidden\" name=\"friend_id\" value=\""+uid+"\" />");
			$(box).append("<input type=\"hidden\" name=\"view\" value=\"ajax\" />");
		}
		else if( type == "ignore" ){
			$(box).find("input:submit").val("Ignore");
			$(box).find("input:submit").removeAttr("disabled");
			$(box).find("h2").text("Ignore");
			$(box).attr("action","/profile/friendlist.php?"+uid);
			$(box).append("<input type=\"hidden\" name=\"action\" value=\"Add Ignored\" />"+
				"<input type=\"hidden\" name=\"user_ids[]\" value=\""+uid+"\" />");
		}
		$(box).find("a").click(function(e){
			e.preventDefault();
			$("#fullouter").fadeOut(function(){$(this).remove();});
		});
		$(box).find("input:submit").click(function(){
			temp = $(box).find("#listannotations").val();
			args = {};
			$(box).find("input, textarea").each(function(){
				if ($(this).attr("name") == "submit") return;
				args[$(this).attr("name")] = $(this).val();
			});
			$.get("http://www.gaiaonline.com/avatarmenu/"+uid,function(data){
				info = eval(data);
				reasons[info.username] = temp;
				GM_setValue("reasons",JSON.stringify(reasons));
			});
			$.post($(box).attr("action"),args,function(data){
				if( type == "friend" ){
					result = JSON.parse(data);
					$(box).html(result.header);
				} else {
					$(box).html("<h3>Success!</h3>");
				}
				setTimeout(function(){$("#fullouter").fadeOut(function(){$(this).remove();});},1000);
			});
			$(box).html("<img src=\"http://imgur.com/iuV4k.gif\" />");
			return false;
		});
		$(box).children("div").css({
			width: "300px",
			border: "3px double white",
			marginLeft: "auto",
			marginRight: "auto",
			padding: "5px"
		});
		$(box).find("div div").css({
			clear: "both",
			padding: "5px"
		});
		$(box).find("div h2").css({
			fontFamily: "serif",
			cssFloat: "left"
		});
		$(box).find("textarea").css({
			background: "none",
			border: "1px solid white",
			color: "white",
			cssFloat: "right",
			verticalAlign: "middle",
			padding: "2px"
		});
		$(box).find("input").css({
			background: "none",
			border: "1px solid white",
			color: "white",
			clear: "both"
		});
		$(box).find("div a").css({
			textDecoration: "none",
			cssFloat: "right",
			color: "white"
		});
		lightbox(box);
		return false;
	};
}

$(".postcontent .user_info_wrapper .user_info .user_name").each(function(){
	if( $(this).text() in reasons ){
		$(this).attr("title",reasons[$(this).text()]);
	}
});

$("#listdetail thead tr").append("<th>Notes</th>");
$("#listdetail tbody tr.rowon, #listdetail tbody tr.rowoff").append("<td class=\"notes\" style=\"font-size:15px;font-weight:bold;text-align:center;\"><span>?</span></td>");
$("#listdetail tbody tr.rowon, #listdetail tbody tr.rowoff").each(function(){
	username = $(this).find(".username a").attr("title");
	if( username in reasons ){
		$(this).find(".notes span").attr("title",(reasons[username]==undefined?"":reasons[username]));
	}
});

$("#listdetail tbody tr .notes span").click(function(){
	username = $(this).parent().parent().find(".username a").attr("title");
	editnote = $("<div style=\"margin:auto; width:300px;\"><h2 style=\"float:left;margin-bottom:15px;\">Notes for "+
		username+"</h2><br/>"+
		"<textarea id=\"noteeditfield\" style=\"width:298px;border:1px solid white;background:none;padding:2px;color:white;\">"+
		(reasons[username]==undefined?"":reasons[username])+"</textarea>"+
		"<br/><button id=\"savenotes\">Save</button> <button id=\"cancelnotes\">Cancel</button></div>");
	$(editnote).find("#cancelnotes").click(function(){
		$("#fullouter").fadeOut(function(){$(this).remove();});
	});
	$(editnote).find("#savenotes").click(function(){
		reasons[username] = $(editnote).find("#noteeditfield").val();
		GM_setValue("reasons",JSON.stringify(reasons));
		$(editnote).html("<h3>Success!</h3>");
		setTimeout(function(){$("#fullouter").fadeOut(function(){$(this).remove();});},1000);
	});
	lightbox(editnote);
});