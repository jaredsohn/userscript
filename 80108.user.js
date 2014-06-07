// ==UserScript==
// @name           GaiaOnline - Navigation Submenus
// @namespace      http://userscripts.org/users/126924
// @description    Adds submenus to the navbar.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

var categories = {};
var guilds = {};
var custom = {};
mail = {
	"Inbox":"",
	"Outbox":"?folder=outbox",
	"Sent":"?folder=sentbox",
	"Saved":"?folder=savebox"
};
settings = {
	"Alerts":"alerts",
	"Notifications":"notifications",
	"About Me":"about",
	"Details":"details",
	"Interests":"interests",
	"Signature":"signature",
	"Profile Options":"profileprefs",
	"Feeds":"datafeeds",
	"Wishlist":"wishlist"
};
shops = {
	"Barton Boutique":"suobdlxpawwzvmcs",
	"Durem Depot":"ngabwpnnhvmyhins",
	"Gambino Outfitters":"tctmkgjtjekkblii",
	"Global Imports":"jqztgkvbtpraewh",
	"H&R Wesley":"ggcmjiwqlqkpvbos",
	"The Jock Strap":"aqyvrienpejsqhlq",
	"Junk in the Trunk":"jeusorituensldjz",
	"Sunset Couture":"eazdhzyfhsu3hek8",
	"Ruby's Rack":"uxzehjwiwxtrueit",
	"Phin Phang":"peoikjdnhbalvieu",
	"Barton Jewelers":"essxqbkkcfqhuyrn",
	"Salon Durem":"wdwoprgbzbtbjimf",
	"Skin Tyte":"bvnsukowrbkthaiq",
	"Sam's Body&Parts":"gxqxrbzixwydqakn",
	"Back Alley Bargains":"uhxrdnkgimmkhslj",
	"Barton Flower Shoppe":"bpzhydftrxmiydnf",
	"The Ole Fishing Hole":"alpltfbdnxgowsfn",
	"Prize & Joy":"ndroctlqvprghqqy",
	"The Faktori":"hsozifjktvkcqqxc",
	"Dernier Cri":"eimzlapgnduengad"
};

temp = GM_getValue("categories");
if( temp != null )
	categories = JSON.parse(temp);
else
	updateLinks();

temp = GM_getValue("guilds");
if( temp != null )
	guilds = JSON.parse(temp);

temp = GM_getValue("custom");
if( temp != null )
	custom = JSON.parse(temp);

$(".panel_mygaia_prefs").parent().append("<li class=\"panel-link panel_mygaia_custom\"><span class=\"panel-img\"></span>" +
	"<a class=\"panel-link-title\" href=\"#\">Custom Links</a>" +
	"<div class=\"panel-link-descrip\">user-created links</div></li>");
	
$(".panel_mygaia_prefs").parent().append("<li class=\"panel-link panel_mygaia_update\"><span class=\"panel-img\"></span>" +
	"<a class=\"panel-link-title\" href=\"#\" id=\"navsmenuupd\">Update Nav Submenus</a>" +
	"<div class=\"panel-link-descrip\">refresh the local navmenus</div></li>");
	

// build shop submenu
ssm = "<div class=\"navsubmenu\"><ul id=\"shopsubmenu\">";
for( shop in shops )
	ssm += "<li><a href=\"http://www.gaiaonline.com/gaia/shopping.php?key="+shops[shop]+"\">"+shop+"</a></li>";
ssm += "</ul></div>";

$(".panel_shops_dir").append(ssm);

// build settings submenu
msm = "<div class=\"navsubmenu\"><ul id=\"mailsubmenu\">";
for( link in mail )
	msm += "<li><a href=\"http://www.gaiaonline.com/profile/privmsg.php"+mail[link]+"/\">"+link+"</a></li>";
msm += "</ul></div>";

$(".panel_mygaia_mail").append(msm);

// build custom links submenu
csm = "<div class=\"navsubmenu\"><ul id=\"customsubmenu\">";
for( link in custom )
	csm += "<li><a href=\""+custom[link]+"/\" target=\"_blank\">"+link+"</a></li>";
csm += "<li><a href=\"#\">Manage Custom Links</a></li>";
csm += "</ul></div>";

$(".panel_mygaia_custom").append(csm);
$("#customsubmenu li:last a").click(function(e){
	e.preventDefault();
	lightbox(
		"Title of Link: <input type=\"text\" id=\"customtitle\" value=\"\" /><br/>"+
		"URL of Link: <input type=\"text\" id=\"customurl\" value=\"\" /><br/>"+
		"<button>Add Link</button><br/><br/><br/>"+
		"<h2>Existing links</h2>"
	);
	for( link in custom ){
		line = $("<span><a href=\"#\">[X]</a><a href=\""+custom[link]+"\">"+link+"</a><br/></span>");
		$(line).find("a:first").click(function(f){
			f.preventDefault();
			delete custom[$(this).parent().children("a:last").text()];
			GM_setValue("custom",JSON.stringify(custom));
			$(this).parent().remove();
		});
		$("#fullinner").append(line);
	}
	$("#fullinner").append("<br/><a href=\"#\">Close</a>");
	$("#fullinner a:last").click(function(f){
		f.preventDefault();
		$("#fullouter").fadeOut(function(){$(this).remove();});
	});
	$("#fullinner button").click(function(){
		custom[$("#customtitle").val()] = $("#customurl").val();
		line = $("<span><a href=\"#\">[X]</a><a href=\""+custom[$("#customtitle").val()]+"\">"+$("#customtitle").val()+"</a><br/></span>");
		$(line).find("a:first").click(function(f){
			f.preventDefault();
			delete custom[$(this).parent().children("a:last").text()];
			GM_setValue("custom",JSON.stringify(custom));
			$(this).parent().remove();
		});
		$("#fullinner h2").after(line);
		$("#fullinner a").css({
			color: "white",
			fontSize: "15px",
			padding: "3px"
		});
		GM_setValue("custom",JSON.stringify(custom));
		$("#customtitle").val("");
		$("#customurl").val("");
	});
	$("#fullinner a").css({
		color: "white",
		fontSize: "15px",
		padding: "3px"
	});
	$("#fullinner input").css({
		background: "none",
		color: "white",
		border: "1px solid white",
		padding: "2px",
		margin: "2px"
	});
});
	

// build settings submenu
setsm = "<div class=\"navsubmenu\"><ul id=\"settingssubmenu\">";
for( setting in settings )
	setsm += "<li><a href=\"http://www.gaiaonline.com/account/"+settings[setting]+"/\">"+setting+"</a></li>";
setsm += "</ul></div>";

$(".panel_mygaia_prefs").append(setsm);

// build forum submenu
fsm = "<div class=\"navsubmenu\"><ul id=\"forumsubmenu\">";
for( category in categories ){
	fsm += "<li style=\"position:relative;\">";
	fsm += "<a href=\"http://www.gaiaonline.com/forum/c."+categories[category]["id"]+"\">"+category+"</a>";
	fsm += "<div class=\"navsubmenu\"><ul>";
	for( forum in categories[category]["fora"] ){
		fsm += "<li>";
		fsm += "<a href=\"http://www.gaiaonline.com/forum/f."+categories[category]["fora"][forum]+"\">";
		fsm += forum+"</a></li>";
	}
	fsm += "</div></li>";
}
fsm += "</ul></div>";

$(".panel_community_forums").append(fsm);

// build guild submenu
gsm = "<div class=\"navsubmenu\"><ul id=\"guildsubmenu\">";
for( guild in guilds )
	gsm += "<li><a href=\"http://www.gaiaonline.com/guilds/?guild_id="+guilds[guild]+"\">"+guild+"</a></li>";
gsm += "</ul></div>";

$(".panel_community_guilds").append(gsm);

$(".navsubmenu").css({
	display: "none",
	position: "absolute",
	left: $(".megamenu-standard-menu").width()-3,
	top: "0px",
	zIndex: "500"
});
$(".navsubmenu").parent().css({
	position: "relative"
});
$(".navsubmenu").parent().hover(
	function(){$(this).children(".navsubmenu").css("display","block");},
	function(){$(this).children(".navsubmenu").css("display","none");});

function lightbox(content){
	$("body").append("<div id=\"fullouter\"><div id=\"fullinner\">"+
		content+
		"</div></div>");
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
}
	
function updateLinks(){
	var guildsDone = false;
	var forumsDone = false;
	lightbox("<span id=\"fullinnerforums\">Updating forums...</span><br/>"+
		"<span id=\"fullinnerguilds\">Updating guilds...</span>");
	checkDone = function(){
		if( guildsDone && forumsDone ){
			$("#fullinner").html("Update complete. Click anywhere to close.");
			$("#fullouter").click(function(){$("#fullouter").remove();});
		}
	};
	$.get("http://www.gaiaonline.com/forum/",function(data){
		categories = {};
		$(".subforums",data).each(function(){
			categories[$(this).find(".hd").text()] = {
				"id": $(this).attr("id").substring(1),
				"fora": {}
			};
			var foraobj = categories[$(this).find(".hd").text()]["fora"];
			$(this).find(".bd .categories a").each(function(){
				foraobj[$(this).text()] = $(this).attr("href").slice($(this).attr("href").indexOf("f.")+2,-1);
			});
		});
		$("#fullinnerforums").text("Forum update complete.");
		GM_setValue("categories",JSON.stringify(categories));
		forumsDone = true;
		checkDone();
	});
	$.get("http://www.gaiaonline.com/guilds/",function(data){
		guilds = {};
		$("#myguildlist a",data).each(function(){
			guilds[$(this).text()] = $(this).attr("href").slice($(this).attr("href").indexOf("id=")+3,$(this).attr("href").indexOf("&"));
		});
		$("#fullinnerguilds").text("Guild update complete.");
		GM_setValue("guilds",JSON.stringify(guilds));
		guildsDone = true;
		checkDone();
	});
}

$("#navsmenuupd").click(function(e){
	e.preventDefault();
	updateLinks();
});
