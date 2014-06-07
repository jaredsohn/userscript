// ==UserScript==
// @name          Eve Forums Gold
// @description	  Quality of life improvements for the Eve Online Forums.
// @version       0.1.5r
// @require       http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js
// @require       http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
// @include       https://forums.eveonline.com* 
// @resource      evegold_logo http://i.imgur.com/hFC4Irk.png
// @resource      logo http://i.imgur.com/O4BqLTT.png
// @resource      tag_blank http://i.imgur.com/0WyWu4g.png
// @resource      tag_glow http://i.imgur.com/b9h80mg.png
// @resource      kb_icon http://i.imgur.com/vNfqMvh.png
// @resource      dotlan_icon http://i.imgur.com/0VtXKoV.png
// @resource      bookmark_icon http://i.imgur.com/RkazQF2.png
// @resource      to_last_read http://i.imgur.com/kNbLTZR.png
// @resource      canned_icon http://i.imgur.com/6qQC7Cv.png
// @resource      canned_icon_hover http://i.imgur.com/ueJ1tg1.png
// ==/UserScript==

// From http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
// String.hashCode() function to create user "ids" for tagging

// -------- Util functions

String.prototype.hashCode = function(){
	var hash = 0;
	if (this.length == 0) return hash;
	for (i = 0; i < this.length; i++) {
		char = this.charCodeAt(i);
		hash = ((hash<<5)-hash)+char;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

// Modified. Original From http://papermashup.com/read-url-get-variables-withjavascript/
function getUrlVars(url) {
	if (typeof(url)==='undefined') url = window.location.href;
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function scroll_to(obj, time, complete) {
	obj = $(obj);
	if (time==undefined || time==null) time = 0;
	if (complete==undefined || complete==null) complete = function() {};
	var complete_executed = false;
	$("html, body").animate({scrollTop: obj.offset().top}, 
							{duration: time, complete: function() {
								if (complete_executed) return;
								complete_executed = true; complete(); 
								}});
}

var EG_CONST = Object();

// HTML Resources
var EVEGOLD_LOGO_HTML = '<img id="evegold_logo" src="'+GM_getResourceURL("logo")+'" />';
var TAG_BLANK_HTML = '<img src="'+GM_getResourceURL("tag_blank")+'" />';
var TAG_GLOW_HTML = '<img src="'+GM_getResourceURL("tag_glow")+'" />';
var BOOKMARK_HTML = '<img src="'+GM_getResourceURL("bookmark_icon")+'" />';
var KB_ICON_HTML = '<img class="eg_superlink" src="'+GM_getResourceURL("kb_icon")+'" />';
var DOTLAN_ICON_HTML = '<img class="eg_superlink" src="'+GM_getResourceURL("dotlan_icon")+'" />';

// CSS Resources
var EXTRA_CSS = '\
<style type="text/css">\
#evegold_logo {\
	position: fixed; left: 0; top: 0;\
	height: 100px; width: 100px;\
	}\
\
.topicLastPost {\
	line-height: 16px; vertical-align: middle !important;\
	}\
.tag {\
	color: yellow; font-style:italic;\
	cursor: pointer;\
	display:inline-block;\
	}\
.tag img {\
	height:16px; width:16px;\
	}\
.tag input {\
	width:60px;\
	height: 12px;\
	font-size: 10px;\
	}\
div.eg_favediv {\
	display: inline-block;\
	padding: 0px;\
	margin: 3px;\
	background-color: #212121;\
	border: thin solid gray;\
	font-weight: bold;\
	}\
a.eg_favelink {\
	display: inline-block;\
	padding: 7px;\
	}\
a.eg_favedel {\
	padding-left: 0px;\
	color: red;\
	}\
a.eg_addfave {\
	display: inline;\
	float: right;\
	padding: 3px;\
	margin: 3px;\
	background: none !important;\
	color: #fa9e0e; !important;\
	}\
a.eg_addfave img {\
	width:32px; height: 32px;\
}\
img.lastread {\
	width:32px; height: 32px;\
}\
a.lastread {\
	float: right; margin-right: 5px;\
	background: none !important;\
}\div.eg_supericons {\
	display: inline-block;\
	float: right;\
	vertical-align: middle;\
	}\
img.eg_superlink{\
	height: 20px; width: 20px;\
	}\
.eg_usersection {\
	border-top: thin solid #1f1f1f;\
	padding-top: 7px;\
	}\
.section {clear: both;}\
.ui-front {z-index: 10;} /* wtf */\
#bbcodeFeatures img.eg_canned{\
	background: transparent url('+GM_getResourceURL('canned_icon')+') top left;\
	}\
#bbcodeFeatures img.eg_canned:hover{\
	background: transparent url('+GM_getResourceURL('canned_icon_hover')+') top left;\
	}\
.smilies-list {margin-right: 0px;}\
#canned_dialog textarea {\
	width: 565px; min-height: 280px;\
	}\
.canlist {\
	margin-bottom: 1em;\
	}\
.canlist a{\
	margin-left: 1em; cursor: pointer; text-decoration: underline;\
	}\
.canlist a.del{\
	margin-left: 1px; font-weight: bold; text-decoration: none;\
	}\
</style>\
';

// Text Resources

EG_CONST.tag_salt = "EVEGOLD_TAG_";
EG_CONST.url_salt = "evegold_";

// -------------- TAGS
function tag_storage_key(name) {
	return EG_CONST.tag_salt + name.hashCode();
}

EG_CONST.tag_glow = GM_getResourceURL("tag_glow"); // injected for next function use
EG_CONST.tag_blank = GM_getResourceURL("tag_blank");
function submit_edit_tag(ev) { // injected
	if (ev.keyCode!=13) return true; // don't care if it's not enter
	var input = $(ev.target);
	var key = input.parent().attr('tagid');
	var tagtext = $(ev.target).val();
	localStorage[key] = tagtext;
	var showparens = (tagtext.length>0);
	
	if (tagtext.length>0) {
		$(".tag[tagid='"+key+"'] img").hide();
		$("."+key+"_tagparens").show();
	} else {
		$(".tag[tagid='"+key+"'] img").attr('src',EG_CONST.tag_blank).show();
		$("."+key+"_tagparens").hide();
	}
	$(".tag[tagid='"+key+"'] span[tagid]").text(tagtext);
	$(".tag[tagid='"+key+"'] input").replaceWith(
		'<span tagid="'+key+'_name">'+
		tagtext+
		'</span>' );
	
	return false;
}

function edit_tag(el) { // injected
	var tagid = $(el).attr('tagid');
	var tagtext = $(el).children('span[tagid]').text();
	$(el).children('span[tagid]').replaceWith('<input type="text" value="'+tagtext+'"/>');
	$(el).children('span:contains("["), span:contains("]")').hide();
	$(el).on('keypress', 'input', function(ev) {return submit_edit_tag(ev);});
	$(el).children("input").focus();
}

function render_tags() {
	$('a[href*="https://gate.eveonline.com/Profile/"]').each(
	function(i, link) {
		var link = $(link);//$(links[i]);
		if (link.attr('href')==undefined) return; // How this can happen is beyond me
		var hrefname = link.attr('href').substring(35); // Skip the first part of the URL
		if (link.text().trim() != hrefname) return;
		var key = tag_storage_key(hrefname);
		var spancontent = "";
		if (localStorage[key]!=undefined) {
			spancontent = localStorage[key];
		}
		
		var taghtml = (spancontent.length>0) ? TAG_GLOW_HTML : TAG_BLANK_HTML;
		
		$('<div class="tag" title="Edit user tag" tagid="'+key+'">&nbsp;'+
				taghtml + 
				'<span class="'+key+'_tagparens">[</span>' +
				'<span tagid="'+key+'_name">'+
				spancontent+
				'</span>'+
				'<span class="'+key+'_tagparens">]</span>' +
				'</div>').insertAfter(link);
		if (spancontent.length==0) $("."+key+"_tagparens").hide();
		else $(".tag[tagid='"+key+"'] img").hide();
	});
}


// ----------------- FAVORITE FORUMS

EG_CONST.FAVORITES_KEY = "EveGold.Favorites"

function get_favorites() {
	var faves = JSON.parse(localStorage.getItem(EG_CONST.FAVORITES_KEY));
	if (faves==null) faves = [];
	return faves;
}

function store_favorites(faves) {
	localStorage[EG_CONST.FAVORITES_KEY] = JSON.stringify(faves);
}

function find_favorite(id) {
	var faves = get_favorites();
	for (i in faves) {
		if (faves[i].id == id)
			return i;
	}
	return null;
}

function add_favorite() {
	var link = $(this).parent().children('[href*="default.aspx"]');
	var id = link.attr("href").split("f=")[1];
	if (find_favorite(id)!=null) {
		alert("You already have this forum selected as a favorite!");
		return;
	}
	var fave = {
		id: link.attr("href").split("f=")[1],
		url: link.attr("href"),
		title: link.text()
		};
	store_favorites(get_favorites().concat([fave]));
	create_favediv(true);
}

function del_favorite() {
	var id = $(this).attr('favid');
	var i = find_favorite(id);
	var faves = get_favorites();
	faves.splice(i, 1)
	store_favorites(faves);
	create_favediv(true);
}

function create_favediv(clear) { 
	if (clear) $("#eg_faves").remove();
	var favediv = $("<div id='eg_faves'></div>");
	var faves = get_favorites();
	var i;
	if (faves.length > 0){
		favediv.text("Favorite Forums:");
		for (i in faves) {
			var f = faves[i];
			var fave = $("<div class='eg_favediv'></div>");
			$("<a/>", {
				"class": "eg_favelink",
				text: f.title,
				href: f.url}).appendTo(fave);
			$("<a/>", {
				"class": "eg_favelink eg_favedel",
				text: "x",
				href: "javascript:void(0)",
				click: del_favorite,
				favid: f.id}).appendTo(fave);
			
			fave.appendTo(favediv);
		} 
	} else {
	}
	favediv.prependTo('.forum-wrapper');
	favediv.prependTo("#yafpage_topics");
	favediv.prependTo("#yafpage_posts");
}

function create_faveadds() {
	var img = GM_getResourceURL("bookmark_icon");
	$(".topicMain a").each(function(i, a) {
		a = $(a);
		var box = a.parent();

		$("<a/>", {
			"class": "eg_addfave",
			href: "javascript:void(0);",
			click: add_favorite,
			title: "Pin to page header",
		}).append('<img src="'+GM_getResourceURL("bookmark_icon")+'"/>').prependTo(box);
	});
}

function render_favorites() {
	create_favediv(false);
	if (window.location.href.search('g=forum')>=0 || window.location.href.search('g=')<0)
		create_faveadds();
}


// --------------- GO TO LAST READ

EG_CONST.read_salt = "+EveGold.Read+"

function record_read() {
	var last_url = $("div.date a:contains('#')").last().attr('href');
	var rss_url = $("a.topic-rss").attr('href');
	var thread_id = rss_url.substring(rss_url.indexOf("t=")+2);
	localStorage[EG_CONST.read_salt+thread_id] = last_url;
}

function show_lastread() {
	$(".maintopic-content").each(function(i, maindiv) {
		maindiv = $(maindiv);
		var href = maindiv.children("a.main").attr("href");
		var thread_id = href.substring(href.indexOf("t=")+2);
		thread_id = thread_id.substring(0,thread_id.indexOf("&"));
		
		var last_url = localStorage.getItem(EG_CONST.read_salt+thread_id);
		if	(last_url==null) return;
		
		var link = $("<a/>", {
				href: last_url,
				style: "padding-left: 1em; font-weight: bold",
				"class": "lastread"
				}).append($("<img/>", {
					src: GM_getResourceURL("to_last_read"),
					"class": "lastread",
					title: "Go to last read post"
				}));
		link.prependTo(maindiv);
		/*
		var pager = maindiv.children("span.topicPager");
		if (pager.length>0) { // Multipage thread, pager already found
			link.appendTo(pager);
		} else {
			pager = $("<span/>", {"class": "topicPager smallfont"});
			link.appendTo(pager);
			pager.appendTo(maindiv);
		}*/
	});
}

function render_lastread() {
	if (window.location.href.search('g=posts')>=0)
		record_read();
	if (window.location.href.search('g=topics')>=0)
		show_lastread();
}


// --------------- Super Profile

function render_superprofile() {
	$("div.section").each(function(i, sect) {
		sect = $(sect);
		if (sect.text().trim()) {
			sect.addClass("eg_usersection");
		}
	});
	
	$("div.section.corp a").each( function(i, corplink) {
		corplink = $(corplink);
		var corpname = corplink.text();
		corplink.attr("href", "https://gate.eveonline.com/Corporation/"+corpname);
		corplink.attr("title", "View Corporation Details");
		
		var linkdiv = $("<div/>", {"class": "eg_supericons"});
		$("<a/>", {
			href: "http://eve-kill.net/?a=search&searchtype=corp&searchphrase="+corpname,
			target: "_blank",
			title: "View Killboard At Eve-Kill",
			}).append($(KB_ICON_HTML)).appendTo(linkdiv);
		$("<a/>", {
			href: "http://evemaps.dotlan.net/corp/"+corpname,
			target: "_blank",
			title: "View Details at DOTLAN EveMaps",
			}).append($(DOTLAN_ICON_HTML)).appendTo(linkdiv);
		linkdiv.prependTo(corplink.parent());
	});
	
	$("div.section.alliance span").each( function(i, allspan) {
		allspan = $(allspan);
		var allname = allspan.text()
		allspan.text("");
		$("<a/>", {
			href: "https://gate.eveonline.com/Alliance/"+allname,
			text: allname,
			title: "View Alliance Details"
			}).appendTo(allspan);
			
		var linkdiv = $("<div/>", {"class": "eg_supericons"});
		$("<a/>", {
			href: "http://eve-kill.net/?a=search&searchtype=alliance&searchphrase="+allname,
			target: "_blank",
			title: "View Killboard At Eve-Kill",
			}).append($(KB_ICON_HTML)).appendTo(linkdiv);
		$("<a/>", {
			href: "http://evemaps.dotlan.net/alliance/"+allname,
			target: "_blank",
			title: "View Details at DOTLAN EveMaps",
			}).append($(DOTLAN_ICON_HTML)).appendTo(linkdiv);
		linkdiv.prependTo(allspan.parent());
	});
	
	$('div.section a[href*="https://gate.eveonline.com/Profile/"]').each(function (i,charlink) {
		charlink = $(charlink);
		if (charlink.attr('href')==undefined) return; // Sanity check WTF
		var charname = charlink.attr('href').substring(35); 	
		var linkdiv = $("<div/>", {"class": "eg_supericons"});
		$("<a/>", {
			href: "http://eve-kill.net/?a=search&searchtype=pilot&searchphrase="+charname,
			target: "_blank",
			title: "View Killboard At Eve-Kill",
			}).append($(KB_ICON_HTML)).appendTo(linkdiv);
		linkdiv.prependTo(charlink.parent());
		
	});

}


// --------------- No external link warning

function showExternalHostWarning(domain, url) { // injected, override
	window.open(url, "_blank"); 
	return false;
}


// --------------- Find posts

var EG_POST_FIND_FLAG = "EveGold.PostFindFlag";
var EG_POST_FIND_DATA = "EveGold.PostFindData";
var EG_POST_FIND_BACKLINK = "EveGold.PostFindBacklink";

function back_dialog(message, href) { 
	var dialogdiv = $("<div />", {style: "z-index:10"});
	$("<p/>", {text: message}).appendTo(dialogdiv);
	dialogdiv.dialog({
		modal: true,
		resizable: false,
		draggable: false,
		title: "No search results",
		buttons: {
			"Go back": function() {
				window.location.href = href;
				dialogdiv.remove();
			},
			"Stay here": function() {
				$(this).dialog("destroy");
				dialogdiv.remove();
			}
		}
	});
	$(".ui-widget-overlay").height($("body").height());
}

function find_author(ev, name) {
	var auth = null;
	var after = null;
	if (ev!=null && ev!=undefined) {
		after = $(this).parents(".content");
		auth = after.find('.section a[href*="https://gate.eveonline.com/Profile/"]').html();
		localStorage[EG_POST_FIND_BACKLINK] = after.find(".date a:contains('#')").attr("href");
	} else if (name != null) {
		auth = name;
	} else {
		auth = localStorage.getItem(EG_POST_FIND_DATA);
	}
	if (auth==null) return;
	
	var posts = null;
	if (after != null) posts = after.nextAll("table.content");
	else posts = $("table.content");
	
	var result = posts.find('.section a[href*="https://gate.eveonline.com/Profile/"]:contains("'+auth+'")');
	if (result.size()==0) {
		scroll_to($("table.content").last(), 500, function() {
			if ($(".pagelink.next a").size() == 0) {
				back_dialog("No more posts by "+auth+".", localStorage.getItem(EG_POST_FIND_BACKLINK));
				return;
			}
			var href = $(".pagelink.next a").first().attr("href");
			localStorage[EG_POST_FIND_FLAG] = "author";
			localStorage[EG_POST_FIND_DATA] = auth;
			window.location.href = href;
			});
		return;
	}
	
	scroll_to(result.first().parents('.content'), 500);
}

function find_quote(ev, name) {
	var auth = null;
	var after = null;
	if (ev!=null && ev!=undefined) {
		after = $(this).parents(".content");
		auth = after.find('.section a[href*="https://gate.eveonline.com/Profile/"]').html();
		localStorage[EG_POST_FIND_BACKLINK] = after.find(".date a:contains('#')").attr("href");
	} else if (name != null) {
		auth = name;
	} else {
		auth = localStorage.getItem(EG_POST_FIND_DATA);
	}
	if (auth==null) return;
	
	var posts = null;
	if (after != null) posts = after.nextAll("table.content");
	else posts = $("table.content");
	
	var result = posts.find('div.quote b:contains("'+auth+' wrote")');
	if (result.size()==0) {
		scroll_to($("table.content").last(), 500, function() {
			if ($(".pagelink.next a").size() == 0) {
				back_dialog("No more posts quoting "+auth+".", localStorage.getItem(EG_POST_FIND_BACKLINK));
				return;
			}
			var href = $(".pagelink.next a").first().attr("href");
			localStorage[EG_POST_FIND_FLAG] = "quote";
			localStorage[EG_POST_FIND_DATA] = auth;
			window.location.href = href;
			});
		return;
	}
	
	scroll_to(result.first().parents('.content'), 500);
}

function create_find_links() {
	var append_chunks = [];
	append_chunks.push($("<span>&nbsp;|&nbsp Find next post:&nbsp;</span>"));
	append_chunks.push($("<a/>", {
							text: "by author",
							href: "javascript:void(0)",
							click: find_author
							}));
	append_chunks.push($("<span>,&nbsp;</span>"));
	append_chunks.push($("<a/>", {
							text: "quoting author",
							href: "javascript:void(0)",
							click: find_quote
							}));
	for (var i=0; i<append_chunks.length; i++) {
		append_chunks[i].appendTo("div.date");
	}
}

function render_findpost() {
	create_find_links();
	
	if (localStorage.getItem(EG_POST_FIND_FLAG) != null) {
		switch(localStorage.getItem(EG_POST_FIND_FLAG)) {
			case "author": find_author(); break;
			case "quote": find_quote(); break;
		}
		localStorage.removeItem(EG_POST_FIND_FLAG);
	}
}

// --------------- Canned Text
var EG_CANNED_DATA = "EveGold.CannedText.Data";
var EG_CANNED_KEYS = "EveGold.CannedText.Keys";

function canned_dialog() {
	if (localStorage.getItem(EG_CANNED_DATA)==null || localStorage.getItem(EG_CANNED_KEYS)==null) {
		localStorage[EG_CANNED_DATA] = "{}";
		localStorage[EG_CANNED_KEYS] = "[]";
	}
	var canned = JSON.parse(localStorage[EG_CANNED_DATA]);
	var keys = JSON.parse(localStorage[EG_CANNED_KEYS]);

	var dialogdiv = $("<div />", {
		id: "canned_dialog",
		"class": "yafnet",
		});
	var area = $("<textarea />");

	if (keys.length > 0) {
		var canlist = $("<p />", {"class": "canlist", text: "My canned messages:"});
		for(var i=0; i<keys.length; i++) {
			$("<a />", {
				text: keys[i]
			}).click(function() {
				var key = $(this).text();
				area.val(canned[key]);
			}).appendTo(canlist);
			$("<a />", {
				text: "\u2715",
				"class": "del"
			}).click(function(){
				if (confirm("Are you sure you want to delete this canned message?"))
				{
					key = $(this).prev().text();
					canned[key] = null;
					keys.splice(keys.indexOf(key),1);
					localStorage[EG_CANNED_KEYS] = JSON.stringify(keys);
					localStorage[EG_CANNED_DATA] = JSON.stringify(canned);
					dialogdiv.dialog("destroy");
					dialogdiv.remove();
					canned_dialog();
				}
			}).appendTo(canlist);
		}
		canlist.appendTo(dialogdiv);
	}
	
	area.appendTo(dialogdiv);
	$("<p>Click \"Save Text As...\" to save the current text. " +
		"Use copy-paste to get the text, or click \"Paste\" to replace "+
		"the entire post with the current text.</p>").appendTo(dialogdiv);
	
	dialogdiv.dialog({
		modal: true,
		resizable: false,
		draggable: false,
		title: "Canned responses",
		width: 600,
		minHeight: 400,
		buttons: {
			"Close": function() {
				$(this).dialog("destroy");
				dialogdiv.remove();
			},
			"Paste": function() {
				var text = area.val();
				$(this).dialog("destroy");
				dialogdiv.remove();
				$("textarea").val(text);
			},
			"Save text as...": function() {
				var name = prompt("Please enter a name for this canned text.", "Sample name");
				while (true) {
					if (name==null) return;
					if (name.length<1) {
						name = prompt("The canned text name cannot be blank.", "Sample name");
						continue;
					}
					if (keys.indexOf(name)>=0) {
						name = prompt("That name is already being used.", "Sample name");
						continue;
					}
					break;
				}
				keys.push(name);
				canned[name] = area.val();
				localStorage[EG_CANNED_KEYS] = JSON.stringify(keys);
				localStorage[EG_CANNED_DATA] = JSON.stringify(canned);
				$(this).dialog("destroy");
				dialogdiv.remove();
				canned_dialog();
			},
		}
	});

}

function render_canned() {
	if (window.location.href.search('g=postmessage')<0)
		return; // This is only while posting a message
	var button = $("<img />", {
		src: "/themes/ccpEveOnline/pix-trans.png",
		"class": "eg_canned",
		alt: "Canned text",
		title: "Canned text",
		});
	button.click(canned_dialog);
	var li = $("<li />");
	button.appendTo(li);
	$("#bbcodeFeatures").children("ul").children("li").last().before(li);
}

// --------------- Injected scripts

function evegold_listeners() {
	$(document).on('click', '.tag', function(){var el=this;edit_tag(el)});
}

function scroll_util(){
	if (window.location.href.search("eg_lastpost")>=0) {
		var lastpost = $(".date a:contains('#')").last();
		$("html, body").animate({scrollTop: lastpost.offset().top}, 0);
	}
}

function inject_scripts() { // Because the sandbox sucks
	tag = '// Injected by Eve Gold \n';
	tag += submit_edit_tag.toString() + '\n';
	tag += edit_tag.toString() + '\n';
	tag += evegold_listeners.toString() + '\n';
	tag += "evegold_listeners();\n";
	tag += scroll_util.toString() + '\n';
	tag += "scroll_util();\n";
	tag += showExternalHostWarning.toString() + "\n"; // override
	tag += "EG_CONST = "+JSON.stringify(EG_CONST)+";\n";
	var script = document.createElement('script');
	script.appendChild(document.createTextNode(tag));	
	(document.body || document.head || document.documentElement).appendChild(script);
}

// -------------- Main stuff

function render_css() {
	$("head").append(EXTRA_CSS);
}

function show_logo() {
	$("img.pngfix").attr("src", GM_getResourceURL("evegold_logo"));
}

function main() {
	render_css();
	show_logo();
	render_tags();
	render_favorites();
	render_lastread();
	render_superprofile();
	render_findpost();
	render_canned();
	inject_scripts();
}

main();
