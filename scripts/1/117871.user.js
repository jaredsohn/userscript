// ==UserScript==
// @id             segnosis_reddit_tools
// @name           SEGnosis Reddit Tools
// @version        1.0
// @namespace      segnosis_reddit
// @author         SEGnosis
// @description    Tools for browsing reddit
// @include        *.reddit.*
// @run-at         document-end
// @require		   http://code.jquery.com/jquery-1.7.1.js
// ==/UserScript==



var settings = new Object();
var profile = undefined;

/* Set default values for global variables */
settings["find_me"] = false;
settings["expand_all"] = new Object();
settings["expand_all"]["images"] = true;
settings["expand_all"]["limit_image_height"] = true;
settings["expand_all"]["videos"] = false;
settings["expand_all"]["stories"] = false;
settings["expand_all"]["auto_expand"] = true;
settings["show_comment_karma"] = new Object();
settings["show_comment_karma"]["enabled"] = true;
settings["show_comment_karma"]["seperator"] = " &bull; ";
settings["hide_all"] = true;
settings["color_karma"] = true;
settings["embed_comment_images"] = true;
settings["hide_blacklisted_subreddits_entries"] = new Object();
settings["hide_blacklisted_subreddits_entries"]["enabled"] = true;
settings["hide_blacklisted_subreddits_entries"]["entries"] = new Array();
settings["flash_mail"] = true;
settings["check_mail"] = false;
settings["blacklisted_titles"] = new Object();
settings["blacklisted_titles"]["enabled"] = true;
settings["blacklisted_titles"]["keywords"] = new Array();
settings["shitlist"] = new Array();

hide_requests = 0;
hide_completed_requests = 0;


$(document).ready(function(){
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("gonewild");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("nsfw");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("boobies");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("adviceanimals");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("bestof");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("mylittlepony");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("minecraft");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("nigelthornberry");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("ladyboners");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("art");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("gonewildplus");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("starcraft");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("firstworldproblems");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("ass");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("thick");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("fffffffuuuuuuuuuuuu");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("redditlaqueristas");
	settings["hide_blacklisted_subreddits_entries"]["entries"].push("popping");
	
	settings["blacklisted_titles"]["keywords"].push("santorum");
	
	settings["shitlist"].push("irepostoldtoplinks");
	
	
	/* Get profile data */
	$.get("http://www.reddit.com/api/me.json", function(a){
		profile = a;
		showCommentKarma();
	});
	
	
	/* Insert style */
	$("head").first().append("<link type=\"text/css\" rel=\"stylesheet\" href=\"http://segnosis.site88.net/user%20scripts/segnosis_reddit_tools/index.css\" />");//$("head").first().append("<style type=\"text/css\">\r\n.segnosis_expand_image_button{\r\n	background-image: url(\"http://segnosis.site88.net/user%20scripts/segnosis_reddit_tools/expandable_images_buttons.png\");\r\n	background-position:0px 0px;\r\n	float: left;\r\n    height: 23px;\r\n    margin-right: 5px;\r\n    margin-top: 2px;\r\n    width: 23px;\r\n}\r\n\r\n.wysiwyg{\r\n	display:none;\r\n	border:2px dotted gray;\r\n	background-color:white;\r\n	margin-top:5px;\r\n	padding:3px;\r\n}\r\n\r\n.segnosis_image_container{\r\n	display:table-row-group;\r\n}\r\n\r\n.segnosis_image{\r\n	width:95%;\r\n	margin-left:2.5%;\r\n	margin-bottom:10px;\r\n	-webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1.0);\r\n	-moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1.0);\r\n	box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1.0); \r\n}</style>");
	
	
	/* Set menu */
	if(settings["find_me"] == true) 
		$("#header-bottom-right").first().prepend("<a id=\"find_me\" href=\"#\">Find Me</a><span class=\"separator\">|</span>");
	if((settings["expand_all"]["images"] == true || settings["expand_all"]["videos"] == true || settings["expand_all"]["stories"] == true) && settings["expand_all"]["auto_expand"] == false) 
		$("#header-bottom-right").first().prepend("<a id=\"expand_all\" href=\"#\">Expand All</a><span class=\"separator\">|</span>");
	if(settings["hide_all"] == true) 
		$(".nextprev").append("<span class=\"separator\">|</span><a id=\"hide_all\" href=\"#\">Hide All</a>");
	if(settings["expand_all"]["auto_expand"] == true){
		$("#header-bottom-right").first().prepend("<a id=\"expand_all\" style=\"display:none;\" href=\"#\">Expand All</a>");
		setTimeout(function(){ $("#expand_all").trigger("click"); }, 2000);
	}
	
	
	/* Extend existing objects */
	String.prototype.insert = strInsert;
	String.prototype.getStringBetween = getStringBetween;
	
	
	/* Start features */
	blacklistedTitles();
	hideBlacklistedSubredditEntries();
	dealShitlist();
	linkEntriesForImageExpansion();
	setInterval(insertWYSIWYG, 2000);
	toggleSidebar();
	embedCommentImages();
	comment_lines();
	setInterval(flashWaitingMail, 1000);
	setInterval(checkMail, 30000);
});


function comment_lines(){
	$(".commentarea").find(".child").css("display", "-moz-inline-box").css("border", "none").prepend("<div class=\"comment_line\" style=\"height: 100%; display: inline-block; cursor: pointer; border-left: 1px dotted rgb(221, 221, 255); width: 3px;\"></div>");
	
	$(".comment_line").live("click", function(){
		$(this).parents(".thing").first().find(".expand:visible").first().trigger("click");
	});
}


function dealShitlist(){
	$.each($(".thing.link"), function(a,b){
		if($.inArray($(b).find(".author").text(), settings["shitlist"]) != -1){
			$(b).find(".arrow.down").trigger("click");
			$(b).hide();
		}
	});
}

function blacklistedTitles(){
	if(settings["blacklisted_titles"]["enabled"] == true){
		$.each($(".thing.link"), function(a,b){
			var c = settings["blacklisted_titles"]["keywords"];
			var t = $(b).find("a.title").first().text().toLowerCase();
			
			for(i = 0; i < c.length; i++){
				if(t.indexOf(c[i]) != -1){
					$(b).hide();
					break;
				}
			}
		});
	}
}

/* Check mail */
function checkMail(){
	if(settings["check_mail"] == true){
		$.get("http://www.reddit.com/api/me.json", function(a){
			if(a.data.has_mail == true)
				$(".nohasmail").removeClass("nohasmail").addClass("hasmail");
			else
				$(".nohasmail,.hasmail").removeAttr("flash");
		});
	}
}


/* Flash waiting mail */
function flashWaitingMail(){
	if(settings["flash_mail"] == true){
		$(".havemail").attr("flash", "true");
		
		if($("[flash='true']").hasClass("havemail") == true)
			$("[flash='true']").addClass("nohavemail").removeClass("havemail");
		else
			$("[flash='true']").removeClass("nohavemail").addClass("havemail");
	}
}


/* hide blacklisted subreddit entries */
function hideBlacklistedSubredditEntries(){
	if(settings["hide_blacklisted_subreddits_entries"]["enabled"] == true){
		$.each($(".thing.link"), function(a,b){
		if($(b).find(".del-button").length == 0 && $.inArray($.trim($(b).find(".subreddit").text().toLowerCase()), settings["hide_blacklisted_subreddits_entries"]["entries"]) != -1)
			$(b).hide();
		});
	}
}


/* Toggle sidebar */
function toggleSidebar(){
	$(".side").before("<div id=\"toggle-side-button\" style=\"position: absolute; right: 310px; cursor: pointer;\">&gt;&gt;</div>");
	$("#toggle-side-button").live("click", function(){
		if($(".side").is(":visible") == true){
			$(".side").hide();
			$("#toggle-side-button").css("right", "10px").html("&lt;&lt;");
			setCookie("toggle_sidebar", "true");
		}
		else{
			$(".side").show();
			$("#toggle-side-button").css("right", "310px").html("&gt;&gt;");
			setCookie("toggle_sidebar", "false");
		}		
	});
	
	if(getCookie("toggle_sidebar") == "true")
		$("#toggle-side-button").trigger("click");
}


/* Color karma */
function colorKarma(){
	if(settings["color_karma"] == true){
		var lastKarma = getCookie("link_karma");
		var color = "";
		var temp2 = undefined;
		
		
		if(profile.data.link_karma > parseInt(lastKarma))
			color = "green";
		else if(profile.data.link_karma < parseInt(lastKarma))
			color = "red";
		
		var temp = $("<span>" + profile.data.link_karma + "</span>");
		
		if(color != "")
			$(temp).css("color", color);
			
			
		if(settings["show_comment_karma"]["enabled"] == true){
			lastKarma = getCookie("comment_karma");
			color = "";
			
			if(profile.data.comment_karma > parseInt(lastKarma))
				color = "green";
			else if(profile.data.comment_karma < parseInt(lastKarma))
				color = "red";
				
			temp2 = $("<span>" + profile.data.comment_karma + "</span>");
		
			if(color != "")
				$(temp2).css("color", color);
		}
		
		if(temp2 != undefined)
			$(".user").html("<a href=\"http://www.reddit.com/user/" + profile.data.name + "/\">" + profile.data.name + "</a> (" + getHtml(temp) + settings["show_comment_karma"]["seperator"] + "<b>" + getHtml(temp2) + "</b>)");
		else
			$(".user").html("<a href=\"http://www.reddit.com/user/" + profile.data.name + "/\">" + profile.data.name + "</a> (" + getHtml(temp) + ")");
			
		setCookie("link_karma", profile.data.link_karma);
		setCookie("comment_karma", profile.data.comment_karma);
	}
}


/* Show comment karma */
function showCommentKarma(){
	if(settings["show_comment_karma"]["enabled"] == true){
		var contents = $(".user").html();
		$(".user").html("<a href=\"http://www.reddit.com/user/" + profile.data.name + "/\">" + profile.data.name + "</a> (" + profile.data.link_karma + settings["show_comment_karma"]["seperator"] + "<b>" + profile.data.comment_karma + "</b>)");
		colorKarma();
	}
}


/* Embed comment images */
function embedCommentImages(){
	$.each($(".entry").find(".usertext-body").find("a"), function(a,b){
		var url = $(b).attr("href");
		
		if(url != undefined && isImageUrl(url) == true)
			$(b).after("<img style=\"display:block;\" src=\"" + url + "\" />");
	});
}


/* What you see is what you get */
function insertWYSIWYG(){
	$.each($(".usertext-edit"), function(a,b){
		if($(b).find(".wysiwyg").length == 0 && $(b).is(":visible") == true){
			var a = $(b).find("textarea").first();
	
			if(a != undefined && a.length != 0){
				$(a).after("<div class=\"wysiwyg_controls\" style=\"display:none;\"><div id=\"bold\"></div><div id=\"italic\"></div><div id=\"link\"></div><div id=\"quote\"></div><div id=\"code\"></div><div id=\"list\"></div></div><div class=\"wysiwyg md\" style=\"display:none;height:" + $(a).height() + "px;width:" + ($(a).width() - 4) + "px;\"></div>");
				
				$(a).keyup(updateWYSIWYG).mousemove(updateWYSIWYG);
				
				if($(a).val().length != 0)
					$(a).trigger("keyup");
			}
		}
		else{
			$(b).find(".wysiwyg").keyup(updateWYSIWYG);
		}
	});
}

function updateWYSIWYG(e){
	var message = $(this).val();

	/* resize preview div */
	$(this).parent().find(".wysiwyg").css("width", $(this).width()).css("height", $(this).height());
	
	/* trim leading white space*/
	message = message.replace(/$[ ]{0,}/g, "").replace(/^[\n?]+/g, "");
	
	/* bold parsing */
	message = message.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
	
	/* strike through parsing */
	message = message.replace(/\~\~(.*?)\~\~/g, "<strike>$1</strike>");
	
	/* Quote parsing */
	for(i = 0; i < message.split(">").length; i++)
		message = (message.indexOf(">") == 0 ? ("\n\n" + message):message).replace(/(\n\n|<\/blockquote>[\n\r.])>(.*)/g, "<blockquote>$1$2</blockquote>");

	/* list item parsing */
	for(i = 0; i < message.length; i++)
		message = (message.indexOf("* ") == 0 ? ("\n\n" + message):message).replace(/(\n\n|<\/ul>[.\r\n])\* (.*)/g, "<ul>$1<li>$2</li></ul>").replace(/<ul><\/ul>/g, "");
	
	/* code parsing */
	for(i = 0; i < message.length; i++)
		message = (message.indexOf("    ") == 0 ? ("\n\n" + message):message).replace(/(\n\n|<\/pre>[.\r\n]) {4,}(.*)/g, "$1<pre><code>$2</code></pre>").replace(/<\/code><\/pre>[.\r\n]*<pre><code>/g, "\n");
	
	/* italic parsing */
	message = message.replace(/\*(.*?)\*/g, "<em>$1</em>");
		
	/* paragraph parsing */
	message = message.replace(/(.*?)\n\n/g, "<p>$1</p>");
	
	/* subscript parsing */
	message = message.replace(/\^(.[^ \^]*)/g, "<sup>$1</sup>");
	
	/* link parsing */
	message = message.replace(/\[(.*?)]\((.*?)\)/g, "<a href=\"#\">$1</a>");
	message = message.replace(/((http|www)([A-z0-9\$&\+,\/\.:;=\?@])+)/g, "<a href=\"#\">$1</a>");
	
	for(i = 0; i < message.split("</sup><sup>").length; i++)
		message = message.replace(/<sup>(.*?)<\/sup><sup>(.*?)<\/sup>/g, "<sup>$1<sup>$2</sup></sup>")

	
	if(message.length != 0 || e.keyCode == 8 || e.keyCode == 46)
		$(this).parent().find(".wysiwyg").first().html(message).fadeIn(1000).prev().fadeIn(1000);
}

$(".wysiwyg_controls>#bold").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd)
		$(editor).val($(editor).val().insert(editor.selectionStart,"**bold text**"));
	else
		$(editor).val($(editor).val().insert(editor.selectionStart, "**").insert(editor.selectionEnd + 2, "**"));
		
	$(editor).trigger("keyup");
});

$(".wysiwyg_controls>#italic").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd)
		$(editor).val($(editor).val().insert(editor.selectionStart, "*italic text*"));
	else
		$(editor).val($(editor).val().insert(editor.selectionStart, "*").insert(editor.selectionEnd + 1, "*"));
		
	$(editor).trigger("keyup");
});

$(".wysiwyg_controls>#link").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd){
		var a = prompt("Enter the text to be made into a link", "");
		if(a != null){
			var b = prompt("Enter the link", "");
			if(b != null)
				$(editor).val($(editor).val().insert(editor.selectionStart, "[" + a + "](" + b + ")"));
		}
	}
	else{
		var b = prompt("Enter the link", "");
		if(b != null)
			$(editor).val($(editor).val().insert(editor.selectionStart, "[").insert(editor.selectionEnd + 1, "](" + b + ")"));
	}
	
	$(editor).trigger("keyup");
});

$(".wysiwyg_controls>#quote").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd)
		$(editor).val($(editor).val().insert(editor.selectionStart, "\n\n>quoted text"));
	else{
		var sel = $(editor).val().substr(editor.selectionStart, editor.selectionEnd - editor.selectionStart);
		var msg = $(editor).val();
		
		sel = sel.replace(/\n/g, "\n>");
		
		if(sel.indexOf("\n\n>") != 0)
			sel = ("\n\n>" + sel);
		
		msg = (msg.substr(0, editor.selectionStart) + sel + msg.substr(editor.selectionEnd, msg.length - editor.selectionEnd));
		
		$(editor).val(msg);
	}
	
	$(editor).trigger("keyup");
});

$(".wysiwyg_controls>#code").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd)
		$(editor).val($(editor).val().insert(editor.selectionStart, "    code text"));
	else{
		var sel = $(editor).val().substr(editor.selectionStart, editor.selectionEnd - editor.selectionStart);
		var msg = $(editor).val()
		
		sel = sel.replace(/\n/g, "\n    ");
		
		if(sel.indexOf("\n\n    ") != 0)
			sel = ("\n\n    " + sel);
		
		msg = (msg.substr(0, editor.selectionStart) + sel + msg.substr(editor.selectionEnd, msg.length - editor.selectionEnd));
		
		$(editor).val(msg);
	}
	
	$(editor).trigger("keyup");
});

$(".wysiwyg_controls>#list").live("click", function(){
	var editor = $(this).parent().parent().find("textarea").first()[0];
	
	if(editor.selectionStart == editor.selectionEnd)
		$(editor).val($(editor).val().insert(editor.selectionStart, "\n\n* list text"));
	else{
		var sel = $(editor).val().substr(editor.selectionStart, editor.selectionEnd - editor.selectionStart);
		var msg = $(editor).val()
		
		sel = sel.replace(/\n/g, "\n* ");
		
		if(sel.indexOf("\n\n* ") != 0)
			sel = ("\n\n* " + sel);
		
		msg = (msg.substr(0, editor.selectionStart) + sel + msg.substr(editor.selectionEnd, msg.length - editor.selectionEnd));
		
		$(editor).val(msg);
	}
	
	$(editor).trigger("keyup");
});


/* WYSIWYG control hover fix*/
$(".wysiwyg_controls>div").live("mouseenter", function(){
	$(this).css("background-position", $(this).css("background-position").split(" ")[0] + " 20px");
});

$(".wysiwyg_controls>div").live("mouseleave", function(){
	$(this).css("background-position", $(this).css("background-position").split(" ")[0] + " 0px");
});


/* Expandable images */
function linkEntriesForImageExpansion(){
	if($(".entry.unvoted,.entry.likes").children(".title").length > 1){
		$.each($(".entry.unvoted,.entry.likes"), function(a,b){
			if($(b).children(".title").length != 0 && $(b).parents(".link.thing").first().is(":hidden") == false){
				var url = $(b).find(".title")[1].href;
				
				if(url != undefined && isImageUrl(url) == false){
					if((url.indexOf("http://imgur.com/") == 0 || url.indexOf("https://imgur.com/") == 0 || url.indexOf("http://i.imgur.com/") == 0) && url.indexOf("http://imgur.com/a/") != 0)
						url = url.replace("r/pics/", "") + ".gif";
					else if(url.indexOf("http://www.quickmeme.com/meme/") == 0)
						url = ("http://i.qkme.me/" + url.split("/")[4].split("?")[0] + ".jpg");
					else if(url.indexOf("http://qkme.me/") == 0)
						url = ("http://i.qkme.me/" + url.split("/")[3].split("?")[0] + ".jpg");
				}
				
				if(url != undefined && (isImageUrl(url) == true || url.indexOf("http://imgur.com/a/") == 0)){
					$(b).children(".title").first().after("<div expanded=\'false\' class=\'segnosis_expand_image_button\'></div>");
					$(b).children(".title").first().children("a").first().attr("href", url);
				}
			}
		});
	}
}

function appendTargetImage(element, url){
	if($(element).attr("expanded") == "false"){
		$(element).attr("expanded", "true");
		
		if(url != undefined && url.indexOf("http://imgur.com/a/") != 0){
			$(element).parents(".link").first().after("<div class=\"segnosis_image_container\"><img class=\"segnosis_image\" src=\"" + url + "\" /></div>");
			//$(element).parents(".link").first().after("<div class=\"segnosis_image_container\"><img class=\"segnosis_image\" src=\"" + url.replace(".gif", ".jpg") + "\" /></div>");
			//$(element).parents(".link").first().after("<div class=\"segnosis_image_container\"><img class=\"segnosis_image\" src=\"" + url.replace(".gif", ".png") + "\" /></div>");
		}
		else if(url != undefined)
			$(element).parents(".link").first().after("<div class=\"segnosis_image_container\" style=\"display:inline;\"><iframe class=\"imgur-album\" width=\"100%\" height=\"550\" frameborder=\"0\" src=\"" + url + "/embed\"></iframe></div>");
		
		if(settings["expand_all"]["limit_image_height"] == true){
			$(".segnosis_image").css("max-height", $(window).height());
			$(".segnosis_image").css("max-width", "100%");
		}
	}
}

function isImageUrl(url){
	if(url == undefined)
		return false;
		
	return (url.indexOf(".jpg") != -1 || url.indexOf(".gif") != -1 || url.indexOf(".png") != -1 || url.indexOf(".bmp") != -1 || url.indexOf(".jpeg") != -1);
}

$(".segnosis_expand_image_button").live("mouseout", function(){
	if($(this).attr("expanded") == "false")
		$(this).css("background-position", "0px 0px");
	else
		$(this).css("background-position", "0px -62px");
});

$(".segnosis_expand_image_button").live("mouseenter", function(){
	if($(this).attr("expanded") == "false")
		$(this).css("background-position", "0px -31px");
	else
		$(this).css("background-position", "0px -93px");
});

$(".segnosis_expand_image_button").live("click", function(){
	if($(this).attr("expanded") == "false"){
		var url = $(this).prev().children().first().attr("href");
		appendTargetImage(this, url);
	}
	else{
		$(this).attr("expanded", "false");
		$(this).parents(".link").first().next().remove();
	}
	
	$(this).trigger("mouseenter");
});

$(".segnosis_image_container").live("click", function(){
	var button = $(this).prev().find(".segnosis_expand_image_button").first();
	$("html").scrollTop($(this).prev().offset().top);
	$(button).click();
	$(button).trigger("mouseenter");
	$(button).trigger("mouseout");
});


/* Expand all embedded images */
$("#expand_all").live("click", function(e){
	e.preventDefault();
	if($(".entry.unvoted,.entry.likes").children(".title").length > 1){
		if(settings["expand_all"]["images"] == true){
			$.each($(".segnosis_expand_image_button"), function(a,b){
				$(b).trigger("click").trigger("mouseleave");
			});
		}
		
		if(settings["expand_all"]["videos"] == true){
			$.each($(".expando-button.collapsed.video"), function(a,b){
				setTimeout(function(){
					$(b).trigger("click");
				}, 1000 * (a + 1));
			});
		}
		
		if(settings["expand_all"]["stories"] == true){
			$.each($(".expando-button.collapsed.selftext"), function(a,b){
				setTimeout(function(){
					$(b).trigger("click");
				}, 1000 * (a + 1));
			});
		}
	}
});


/* Hide all entries */
$("#hide_all").live("click", function(e){
	hide_requests = $("div.link").length;
	
	$.each($("div.link"), function(a, b){
		$.post("http://www.reddit.com/api/hide", { id: $(b).attr("data-fullname"), exeuted: "hidden", uh: $("input[name=\'uh\']").val(), renderstyle: "html" }, function(){
			hide_completed_requests++;
			
			if(hide_completed_requests == hide_requests)
				window.location.href=window.location.href;
		});
	});
	
	e.preventDefault();
});


/* Find my username */
$("#find_me").live("click", function(e){
	e.preventDefault();
	var yourUserName = $(".user").children("a").first().text();
	var comments = $(".nestedlisting").first().find("a.author").toArray();
	
	for(i = 0; i < comments.length; i++){
		if($(comments[i]).text() == yourUserName && $(comments[i]).hasClass("gray") == false){
			$('html, body').animate({
				scrollTop: $(comments[i]).offset().top
			}, 1000);
			break;
		}
	}
});


/* Support functions */
function strInsert(index, addition){
	var ret = this.substr(0, index);
	ret += addition;
	ret += this.substr(index, this.length - index);
	return ret;
}

function getStringBetween(start, end){
	var index = this.indexOf(start);
	
	if(index != -1){
		index += start.length;
		var endIndex = this.indexOf(end, index + 1);
		
		if(endIndex != -1)
			return this.substr(index, endIndex - index);
	}
	
	return "";
}

function setCookie(name, value){
	deleteCookie(name);
	document.cookie = name + "=" + value + ";path=/;";
}

function deleteCookie(name){
	document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
}

function getCookie(name){
	var a = document.cookie.split(";");
	for(i = 0; i < a.length; i++){
		var b = a[i].split("=");
		if($.trim(b[0]) == name)
			return b[1];
	}
	
	return "";
}

function getHtml(a){
	return $("<div>").append($(a).clone()).remove().html();
}

