// ==UserScript==
// @name                Douban-Dislike
// @namespace	        http://cnborn.net/blog/2012/10/douban-dislike_chrome_extension/
// @description	        Douban Front Page Enhanced.
// @require             http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include		http://*.douban.com/*
// ==/UserScript==


// Needed for GreaseKit since it doesn't support the @require property.
if (typeof(jQuery) == "undefined") {
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js";
    script.type = "text/javascript";
    document.getElementsByTagName("head")[0].appendChild(script);
    script.addEventListener("load", function() {
        jQuery.noConflict();
        douban_dislike(jQuery);
    }, false);
} else {
    douban_dislike(jQuery);
}

function douban_dislike($) {

//Copy code begins

var refresh_interval = 850;

var tweak_for_new_nav = function() {
    $("#db-global-nav").css({
      "width": "960px",
      "margin": "0 auto",
      "background-color": "white"
    });
    $(".global-nav a:active, .global-nav a:link, .global-nav a:visited").css({
      "color": "#072"
    });
    return $('.global-nav a').hover(function() {
      return $(this).css({
        'color': "white",
        'background-color': '#072'
      });
    }, function() {
      return $(this).css({
        'background-color': '',
        'color': "#072"
      });
    });
}


var remove_boutique = function(){
    $("div.boutique").remove();
    $("div#dale_update_top_right").remove();
    $("div#dale_homepage_login_top_right").remove();
}

var remove_site_hot_content = function(){
    return $("div.guess-item:has(div.source:contains('热点'))").remove();

}

var remove_already_liked_content = function(){
    $("div.guess-item:has(div.ft span.fav-btn a.selected)").remove();
    $("div.guess-item:has(div.ft span.subject-btn a.selected)").remove();
    $("div.guess-item:has(div.ft span.online-event-btn a.selected)").remove();
    return $("div.guess-item:has(div.ft span.event-btn a.selected)").remove();
}

var refresh_guess_items_and_unread_count = function(){

    //since hot_content has been removed, we can get user_id from guess_item;
    guess_item = $("div.guess-item:first")

    var get_user_id = function(){
	try{
	    user_id = guess_item.attr("id").split(":")[0];
	    localStorage.douban_dislike_user_id = user_id;
	}
	catch(err){
	    user_id = localStorage.douban_dislike_user_id;
	}
	return user_id;
    }

    var user_id = get_user_id();
    if(!user_id){
	return false;
    }

    var refresh_unread_count = function(){
	var douban_home_link = $("div.site-nav-items ul li:eq(0) a");
	var unread_count = $("div.guess-item").length;
	if (unread_count > 0){
	    douban_home_link.text("首页(" + unread_count + ")");
	}
    }


    //filtered out disliked items
    GM_xmlhttpRequest({
	method: "GET",
	url: "http://50.116.13.151/douban_dislikes/dislikes?user_id=" + user_id,
	headers: {
	    "Content-Type": "application/json"
	},
	onload: function(received) {
	    dislikes = jQuery.parseJSON(received.responseText)['dislikes'];
	    for(dislike_idx in dislikes){
		dislike_unique_id = dislikes[dislike_idx];
		$("div.guess-item[unique_id='" + dislike_unique_id + "']").remove();
		refresh_unread_count();
	    }
	}
    });


}

var put_dislike_button = function() {
    $("div.guess-item div.ft:not(:has(span.dislike-btn))").append('<span class="usr-btn fav-btn dislike-btn"><a href>不喜欢</a></span>');

    $("div.guess-item").delegate("div.ft span.dislike-btn a", "click", function() {

	var guess_item = $(this).parent().parent().parent();

	var get_user_id = function(){
	    return guess_item.attr("id").split(":")[0];
	}
	
	var get_kind_and_id = function(){
	    return guess_item.attr("unique_id").split(":");
	}

	var kind = get_kind_and_id()[0];
	var id = get_kind_and_id()[1];
	var user_id = get_user_id();
	if(!user_id){
	    return false;
	}

	var save_dislike = function(user_id, kind, id){

	    var refresh_guess_items_and_unread_count = function(){
		var douban_home_link = $("div.site-nav-items ul li:eq(0) a");
		var unread_count = $("div.guess-item").length;
		if (unread_count > 0){
		    douban_home_link.text("首页(" + unread_count + ")");
		}
	    }

	    GM_xmlhttpRequest({
		method: "GET",
		url: "http://50.116.13.151/douban_dislikes" + "?kind=" + kind + "&target_id=" + id + "&user_id=" + user_id,
		headers: {
		    "Content-Type": "application/x-www-form-urlencoded"
		},
	        onload: function(msg) {
		    guess_item.remove();
		    refresh_guess_items_and_unread_count();
		}
	    });
	
	}
	save_dislike(user_id, kind, id);
	return false;
    });


}

var put_expand_note_button = function() {
    $("div.guess-item[unique_id^=1015] div.source:not(:has(span.expand-note-btn))").append('<span class="usr-btn expand-note-btn"><a href>展开</a></span>');

    $("div.guess-item[unique_id^=1015] div.source span.expand-note-btn a").click(function() {
	var guess_item = $(this).parent().parent().parent().parent();
	var guess_item_note_id = $(guess_item[0]).attr("unique_id").split(":")[1];

	GM_xmlhttpRequest({
	    method: "GET",
	    url: "http://www.douban.com/note/" + guess_item_note_id + "/",
	    headers: {
		"Content-Type": "text/html"
	    },
	    onload: function(received_html) {
                var note_context = $("div.note:last", received_html.responseText);
                $("div.content div.desc", guess_item).html(note_context);
                $("div.source span.loading", guess_item).remove();

	    }
	});

	$(this).parent().html('<span class="loading">加载中……</span>');
	return false;

    });
    
}

var dislike_refresh_all = function(){
tweak_for_new_nav();
remove_boutique();
remove_site_hot_content();
remove_already_liked_content();
refresh_guess_items_and_unread_count();
put_dislike_button();
put_expand_note_button();
}

dislike_refresh_all();

//make load_more_guess with douban-dislike logic.
$("div.guess-more").delegate("a", "click", function() {
    setTimeout(dislike_refresh_all, refresh_interval);
    setTimeout(dislike_refresh_all, refresh_interval * 5); //refresh in case the request failed.
});

//COPY code ends

}
