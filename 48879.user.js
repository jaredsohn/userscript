//v1.4.10 GreaseMonkey 005810
// ==UserScript==
// @name      pbtweet
// @namespace    http://t-trace.blogspot.com/
// @description   Expand conversation chains and twitPic.com thumbnails.
// @include   https://twitter.com/*
// @include   http://twitter.com/*
// ==/UserScript==
// UPDATE INFO http://web.me.com/t_trace/pbtweet.html

( function(){

var isOpera = !!this.opera, isFirefox = !!this.Components, isChromium = !!this.contentWindow , isSafari = this.getMatchedCSSRules && !isChromium;

// initialize pbtweet if pbtweet not works.
if(!document.getElementById('pb_info')){
	pb_init();
} else {
	return(false);
}

// initialize pbtweet//
function pb_init()
{
	pb_css_set();
	conv_chain_hash = new Array(0);
	session_id = document.getElementsByName('session-user-screen_name')[0].content;

	//preference values
	restore_pb_values();
	pb_accept_local_functions = true;

	document.pb_lang = pb_lang;
	
	//information panel
	pb_version = "v1.4.10 GM 005810";
	pb_active_group = null;
	//enable_accesskey = false;

	//init process
	pb_info_panel();
	if(document.getElementById('side'))
	{
		// pb_group_tab();
		remove_accesskey();
	}
	
	//build pb-extra
	pb_extra = document.createElement('span');
	pb_extra.setAttribute('class','pb-extra');

	pb_trans = document.createElement('span');
	pb_trans.setAttribute('class','pb-trans');
	pb_trans.innerHTML = "to&nbsp;" + pb_lang.toUpperCase();
	pb_extra.appendChild(pb_trans);
	
	pb_rtwweet = document.createElement('span');
	pb_rtwweet.setAttribute('class','pb-rtweet');
	pb_rtwweet.innerHTML = "RT";
	pb_extra.appendChild(pb_rtwweet);
	
	pb_via = document.createElement('span');
	pb_via.setAttribute('class','pb-via');
	pb_via.innerHTML = "(via&nbsp;";
	pb_extra.appendChild(pb_via);
	
	pb_temp_target = document.createElement('span');

	// add pb_main event
	if(!document.getElementById('show')){
		// more button
		document.getElementById('content').addEventListener("DOMNodeInserted", 
			function (event)
			{
				if(event.target.id == 'timeline')
				{
					conv_chain_hash = new Array(0);
					pbtweet_main(event.target.getElementsByClassName('hentry'));
					event.target.addEventListener("DOMNodeInserted", 
					function (event)
					{
						if(event.target.nodeName == "LI" && (pb_is_in_group(event.target) == false))
						{
							//alert('any');
							event.target.style.opacity = '1';
							event.target.style.marginTop = '0px';
							event.target.style.webkitTransition = "";
							removeClass(event.target, 'animate');
							addClass(event.target, 'pbHiddenGroup');
							pbtweet_main([event.target]);
						}
						else
						{
							if(event.target.nodeName == "LI" &&  (!hasClass(event.target, "animate")))
							{
								pbtweet_main([event.target]);
							} else if(event.target.nodeName == "LI") {
								kick_animation_on_top(event);
							}
						}
					}, false);
				}
				else if(hasClass(event.target, "conv_chain"))
				{
					kick_animation(event.target)
				}
			}, false);
			
		pb_add_eventlistener_to_timeline();
	}

	// make master objects
	try{
		master_fav = document.getElementsByClassName("fav-action")[0].cloneNode(true);
		master_reply = document.getElementsByClassName("reply")[0].cloneNode(true);
	} catch(err){
		master_fav = document.createElement('a');
		master_fav.className = "fav-action";
		master_reply = document.createElement('a');
		master_reply.className = "reply";
	}

	pb_snip_url = document.createElement('span');

	//make Y!Pipes for Image receiver
	bkite_processor = document.createElement('script');
	bkite_processor.innerHTML = "var bkiteSrc = function(data){place_picture(data.value.items[1].content,data.value.items[0].content,data.value.items[2].content);}";
	document.getElementsByTagName("head")[0].appendChild(bkite_processor);

	//make tinyUrl receiver
	tinyUrl_processor = document.createElement('script');
	tinyUrl_processor.innerHTML = "var pbTurlExp = function(data){expand_url(data.value.items[0].content,data.value.items[1].content);}";
	document.getElementsByTagName("head")[0].appendChild(tinyUrl_processor);

	if(document.body.id != 'show')
	{
		var nav_buttons = document.getElementById('primary_nav').getElementsByTagName('a');
		for(var i = 0; i < nav_buttons.length; i++){
 			nav_buttons[i].addEventListener('click', function(e){setTimeout(pbtweet_main(document.getElementsByClassName('hentry')), 500)},true);
 		}
 		var page_type = document.getElementById('side').getElementsByClassName('active')[0];
 		switch (page_type.id)
 		{
 			case "home_tab":
 				var update_target = document.getElementById('home_tab');
 				break;
 			case "replies_tab":
 				var update_target = document.getElementById('replies_tab');
 				break;
 			case "favorites_tab":
 				var update_target = document.getElementById('favorites_tab');
 				break;
  			case "profile_tab":
 				var update_target = document.getElementById('updates_tab');
 				break;
  			case "update_tab":
 				var update_target = document.getElementById('update_tab');
 				break;
 			default:
  				//var update_target = document.createElement('div');
 		}
	 }
	pbtweet_main(document.getElementsByClassName('hentry')); //initial
}


function pb_add_eventlistener_to_timeline(timeline)
{
	document.getElementById("timeline").addEventListener("DOMNodeInserted", 
		function (event)
		{
			if(event.target.nodeName == "LI" && (pb_is_in_group(event.target) == false))
			{
				event.target.style.opacity = '1';
				event.target.style.marginTop = '0px';
				removeClass(event.target, 'animate');
				addClass(event.target, 'pbHiddenGroup');
				pbtweet_main([event.target]);
			}
			else
			{
				if(event.target.nodeName == "LI" &&  (!hasClass(event.target, "animate")))
				{
					pbtweet_main([event.target]);
				} else if(event.target.nodeName == "LI") {
					kick_animation_on_top(event);
				}
			}
		}, false);
}


// main process
function pbtweet_main(target)
{
	var repeat_count = chain_count ;
	// if target is moving... delay
	// standard window
	if(!document.getElementById('show'))
	{
		var entry = target;
		for (var i=0; i < entry.length; i++)
		{
			for(var j = 0; j < conv_chain_hash.length; j++)
			{	// remove redundant tweet
				try
				{
					if(entry[i].id == conv_chain_hash[j])
					{
						remove_redundand(entry[i].id, 'inserted');
						break;
					}
				}
				catch(err)
				{
				}
			}
			try
			{
				if(entry[i].getElementsByClassName('msgtxt')[0])
				{	//change search result
					addClass(entry[i].getElementsByClassName('msgtxt')[0], 'entry-content');
					addClass(entry[i].getElementsByClassName('meta')[0].getElementsByTagName('a')[0], 'entry-date');
					entry[i].getElementsByClassName('meta')[0].getElementsByTagName('a')[0].href = entry[i].getElementsByClassName('meta')[0].getElementsByTagName('a')[0].href.replace(/\/([a-zA-Z0-9\-\_]+)\/statuses/, '/$1/status');
				}
				if(entry[i].hasAttribute("id"))
				{	//add external links.
					if(entry[i].getElementsByClassName('entry-content')[0])
					{	// normal tweet
						entry[i].getElementsByClassName('entry-content')[0].innerHTML = pb_link_maker(entry[i].getElementsByClassName('entry-content')[0].innerHTML,'main');
					}
					else if(entry[i].getElementsByClassName('msgtxt')[0])
					{	// search tweet
						entry[i].getElementsByClassName('msgtxt')[0].innerHTML = pb_link_maker(entry[i].getElementsByClassName('msgtxt')[0].innerHTML,'main');					
					}
					pb_snip_retreiver(entry[i]);

					twitpic_thumb(entry[i].id,entry[i].innerHTML);
					pb_extra_set(entry[i]);
					pb_appearance_set(entry[i]);
				}
				var meta_url_list = entry[i].getElementsByClassName('meta')[0].getElementsByTagName('a');
				var get_url = "";
				switch ( meta_url_list.length ) {	//detect patter of in_reply_to_status_id url embedded
					case 1:
						break;
					case 2:
						if(meta_url_list[1].href.match(/\:\/\/twitter.com\/[^\/]+\/status/))
						{
							get_url = meta_url_list[1].href;
						}
						else
						{
						}
						break;
					case 3:
						get_url = meta_url_list[2].href;
						break;
										
					default:
				}

				if(get_url != "" && (!entry[i].getElementsByClassName('conv_chain')[0]))
				{
					var my_node = entry[i].id;
					// delaying //
					if(hasClass(entry[i],"animate")){
						setTimeout(pbtweet_main([entry[i]]), 1000);
					} else {
						document.getElementById(my_node).addEventListener("DOMNodeInserted", function(event){if(hasClass(event.target, "conv_chain")){kick_animation(event.target)}}, false);
						retreve_data(get_url,my_node, repeat_count );
					}
				}
			} catch(err) {
				//window.console.log = err.message + " on " + i;
			}
		}
	}
	else
	{	//tweet status view
			try
			{
				var pic_entry = document.getElementsByClassName("status-body")[0];
				pic_entry.setAttribute("id",guid());
				twitpic_thumb(pic_entry.id,pic_entry.innerHTML);
				var entry = document.getElementsByClassName("meta");
				get_url = entry[0].childNodes[4].href;
				if(document.getElementById("content").childElementCount == 1)
				{
					retreve_data(get_url,"content", repeat_count );
				}
			} 
			catch(err)
			{
			}
	}
}

function retreve_data(get_url,my_node, count)
{
	var request = new XMLHttpRequest();
	request.onreadystatechange = function() {
		if(request.readyState == 4 && request.status == 200)
		{
			conv_object = eval('(' + request.responseText + ')');
			var profile_image_url = conv_object["user"]["profile_image_url"];
			var user_name = conv_object["user"]["screen_name"];
			var conv_mine = "";
			if (user_name == session_id){
				conv_mine = " mine";
			}
			var url_replace = /\:\/\/twitter\.com\/[^\/]+\/status\/[0-9]+\"\>in\ reply\ to/;
			var conv_innerHTML = "<span class = \'icons\'><a href='"+ pb_protocol() + "://twitter.com/" + user_name + "'><img src ='" + profile_image_url + "'></a></span><span class=\'entry-content " + user_name + conv_mine + "\'><strong>" + "<a href='" + pb_protocol() + "://twitter.com/" + user_name + "'>" +user_name + "</a> </strong>" + pb_link_maker(conv_object["text"]) + "</span>";
			if(conv_object["in_reply_to_status_id"]){
				var retreve_status = pb_protocol() + "://twitter.com/" + conv_object["in_reply_to_screen_name"] + "/status/" + conv_object["in_reply_to_status_id"];
				//retreve_data(retreve_status,my_node);
 				if( count > 1 ) {
 					retreve_data(retreve_status,my_node, count - 1);
 				}
			}
			var conv_chain = document.createElement('div');
			conv_chain.innerHTML = conv_innerHTML;
			conv_chain.setAttribute("class","conv_chain");
			conv_chain.id = guid();

			// append fav and reply button
			var conv_action = document.createElement('div');
			conv_action.className = "actions";
			
			var conv_meta = pb_protocol() + "://twitter.com/" + user_name + "/status/" + conv_object["id"];
			var   conv_fav = master_fav.cloneNode(true);
			var conv_reply = master_reply.cloneNode(true);

			// detect favorite
			if(conv_object["favorited"] == true){
				removeClass(conv_fav,"non-fav");
				addClass(conv_fav,"fav");
			} else {
				removeClass(conv_fav,"fav");
				addClass(conv_fav,"non-fav");
			}

			var conv_entry_meta = document.createElement('span');
			conv_entry_meta.setAttribute('class','meta entry-meta');
			var post_date = new Date(conv_object["created_at"]);
			var current_date = new Date();
			var past_duration = (current_date - post_date) / 1000;
			var string_duration = "";
			if (past_duration < 60){
				string_duration = "less than a minute";
			} else if(past_duration < 180) {
				string_duration = "less than 3 minutes";			
			} else if(past_duration < 6000) {
				string_duration = "less than 10 minutes";
			} else if(past_duration < 36000) {
				string_duration = "less than an hour";
			} else if(past_duration < 10800) {
				string_duration = "less than 3 hours";
			} else if(past_duration < 360000) {
				string_duration = "less than 10 hours";
			} else if(past_duration < 86400) {
				string_duration = "less than a day";
			} else if(past_duration < 259200) {
				string_duration = "less than 3 days";
			} else if(past_duration < 604800) {
				string_duration = "less than a week";
			} else if(past_duration < 2592000) {
				string_duration = "less than a month";
			} else if(past_duration < 31536000) {
				string_duration = "less than a year";
			} else {
				string_duration = "more than a year";
			}
			conv_entry_meta.innerHTML = "<a href='" + conv_meta + "' class='entry-date' rel='bookmark'><span class='published'>" + string_duration +" </span></a> <span>from " + conv_object["source"] + "</span>";
			if(conv_object["in_reply_to_status_id"]){
				conv_entry_meta.innerHTML = " " + conv_entry_meta.innerHTML +  " <a href='" + pb_protocol() + "://twitter.com/" + conv_object["in_reply_to_user_id"] + "/status/" + conv_object["in_reply_to_status_id"] +"'>in reply to " + conv_object["in_reply_to_screen_name"] + "</a>";
			}
			conv_chain.appendChild(conv_entry_meta);

			// append chat balloon
			var conv_baloon = document.createElement('span');
			conv_baloon.className = "entry-baloon";

			var conv_baloon_top = document.createElement('span');
			conv_baloon_top.className = "entry-content-before";
			var conv_baloon_bottom = document.createElement('span');
			conv_baloon_bottom.className = "entry-content-after";
			if (user_name == session_id){
				addClass(conv_baloon_top,"mine");
				addClass(conv_baloon_bottom,"mine");
			}
			
			conv_baloon.appendChild(conv_baloon_top);
			conv_baloon.appendChild(conv_chain.getElementsByClassName('entry-content')[0]);
			conv_baloon.appendChild(conv_baloon_bottom);
			conv_baloon.appendChild(conv_entry_meta);

			conv_chain.appendChild(conv_baloon);
			
			//var conv_path = location.href.match(/.+\/\/twitter.com(\/[^\/]+)/)[1];
			var conv_path = 'http://twitter.com/';
			var href_match = /.+\:\/\/twitter\.com\/(.+)\/status\/([0-9]+)/;
			conv_reply.href = conv_path + "?status=@" + conv_meta.match(href_match)[1] + "%20&amp;in_reply_to_status_id=" + conv_meta.match(href_match)[2] + "&amp;in_reply_to=" + conv_meta.match(href_match)[1];
			conv_reply.title = "reply to " + conv_meta.match(href_match)[1];
			conv_fav.id = "status_star_" + conv_meta.match(href_match)[2];

			conv_reply.className = "pb-reply";
			removeClass(conv_fav,'fav-action');
			addClass(conv_fav,'pb-fav-action');

			conv_action.appendChild(conv_fav);
			conv_action.appendChild(conv_reply);
			//
			conv_chain.insertBefore(conv_action, conv_baloon.nextSibling);

			//add reply function
			conv_reply.name = conv_reply.href;
			//if(location.href.match(/twitter.com\/(timeline\/)*(home|replies|public_timeline|)/))
			if( document.body.id.match(/home|replies|favorites|search/) )
			{// home
				conv_reply.removeAttribute("href");
				conv_reply.addEventListener("click", function(e){pb_reply(e);e.preventDefault();e.stopPropagation}, false);
			} else {
				conv_reply.href = conv_reply.href.replace(/twitter.com\/(timeline\/)*[^\?]+/, "twitter.com/$1home");
				conv_reply.href = conv_reply.href.replace(/&amp;/g, "&");
			}
			
			//add fave event
			conv_fav.addEventListener("click", function(e){pb_fave(e);e.preventDefault()}, false);
			if(my_node != "content"){
				conv_chain.style.marginTop = "-60px";
			}
			pb_extra_set(conv_chain);
			
			//add snip retreiving
			pb_snip_retreiver(conv_chain);
			
			pb_appearance_set(conv_chain,conv_chain.getElementsByClassName('entry-content')[0]);
			try{
				document.getElementById(my_node).appendChild(conv_chain);
				//kick_animation(conv_chain);
			} catch(e){
				//window.console.log = e + "on add_child";
			}
			var status_id = get_url.replace(/.+\:\/\/twitter\.com\/[^\/]+\/status\/([0-9]+)/,"status_$1");
			if(status_id != null){
				conv_chain_hash.push(status_id);
				//setTimeout(remove_redundand(status_id),10);
				remove_redundand(status_id);
			}
			twitpic_thumb(conv_chain.id,conv_chain.innerHTML);
		}
	};
	if (location.href.match(/^https/) && get_url.match(/^https/)){
	} else if (location.href.match(/^https/) && get_url.match(/^http\:/)) {
		get_url = get_url.replace(/^http\:/, "https:");
	} else if (location.href.match(/^http\:/) && get_url.match(/^https/)) {
		get_url = get_url.replace(/^https\:/, "http:");
	} else if (location.href.match(/^http\:/) && get_url.match(/^http\:/)) {
	}
	request.open('GET', get_url, true);
// JSON 1st!!!
	request.setRequestHeader("Accept", "application/json, text/javascript, */*");
	request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	request.send(null);
}

function remove_redundand(target_id)
{
	if(arguments[1] != 'inserted')
	{
		try
		{
			var remove_target = document.getElementById(target_id);
			if( ((remove_target.offsetTop + remove_target.offsetHeight) < (window.scrollY + window.innerHeight)) && (remove_target.offsetTop + remove_target.offsetHeight) != 0)
			{
				var curr_scroll_x = window.scrollX;
				var curr_scroll_y = window.scrollY;
				window.scrollTo(curr_scroll_x, (curr_scroll_y - remove_target.offsetHeight));
			}
			// animation effects only std version
			//setTimeout(remove_target.style.display = "none", 400);
			remove_target.parentNode.removeChild(remove_target);
		} catch(e) {
			//window.console.log = window.console.log + '\n' + e + 'on removing';
		}
	}
	else
	{
		var remove_target = document.getElementById(target_id);
		remove_target.style.display = "none"
		//remove_target.parentNode.removeChild(remove_target);
	}
}

function hide_group(target_id)
{
	try
	{
		var remove_target = document.getElementById(target_id);
		if(arguments[2])
		{	// group on_off
		}
		setTimeout(function(){if(!hasClass(remove_target,'pbHiddenGroup')){addClass(remove_target, ' pbHiddenGroup ');removeClass(remove_target, 'pbHiddingGroup')}}, 400);
		//remove_target.parentNode.removeChild(remove_target);
	} catch(e) {
		//window.console.log = window.console.log + '\n' + e + 'on removing';
	}
}

function twitpic_thumb(id,html)
{
	var my_source = html;
	if(my_source == ""){
		my_source = document.getElementById(id).childNodes[0].childNodes[0].innerHTML;
	}
	var twitpic_carrier = />(http\:\/\/twitpic.com\/[^\<\.]+)<\/a\>/;
	var movapic_carrier = /\"(http\:\/\/movapic.com\/pic\/([^\"]+))/;
	var yfrog_carrier = />(http\:\/\/yfrog.com\/[^\<\.]+)<\/a\>/;
	var photoshare_carrier = /(http\:\/\/bcphotoshare\.com\/photos\/[0-9]+\/([0-9]+))/;
	var bkite_carrier = /(Photo|pic)\:\ \<a\ [^\>]*href\=\"http\:\/\/bkite.com\/([0-9a-zA-Z]+)\"/;
	var sec_carrier = /http\:\/\/tiny12\.tv\/([a-zA-Z0-9]+)/;
	var tumbl_carrier = /http\:\/\/tumblr\.com\/([a-zA-Z0-9]+)/;
	var flickr_carrier = /http\:\/\/flic\.kr\/p\/([a-zA-Z0-9]+)/;
	var bctiny_carrier = /http\:\/\/bctiny\.com\/([a-zA-Z0-9]+)/;
	var fhatena_carrier = /(http\:\/\/f\.hatena\.ne\.jp\/(([^\/])[^\/]+)\/(([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])[0-9]+))/;
	
	//twitpic support
	if(my_source.match(twitpic_carrier)){
		var pic_thumb_src = my_source.match(twitpic_carrier)[1].replace(/http\:\/\/twitpic\.com\/([0-9a-zA-Z]+)/,"http://twitpic.com/show/thumb/$1");
		place_picture(id,pic_thumb_src,my_source.match(twitpic_carrier)[1]);
	}
	//photoshare support
	if(my_source.match(photoshare_carrier)){
		var pic_thumb_src = "http://images.bcphotoshare.com/storages/" + my_source.match(photoshare_carrier)[2] +"/thumbnail.jpg";
		place_picture(id,pic_thumb_src,my_source.match(photoshare_carrier)[1]);
	}
	//fhatena support
	if(my_source.match(fhatena_carrier)){
		var pic_thumb_src = "http://img.f.hatena.ne.jp/images/fotolife/" + my_source.match(fhatena_carrier)[3] + "/" + my_source.match(fhatena_carrier)[2] + "/" + my_source.match(fhatena_carrier)[5] + "/" + my_source.match(fhatena_carrier)[4] + "_120.jpg";
		place_picture(id,pic_thumb_src,my_source.match(fhatena_carrier)[1]);
	}
	//movapic support
	if(my_source.match(movapic_carrier)){
		var pic_thumb_src = "http://image.movapic.com/pic/s_" + my_source.match(movapic_carrier)[2] +".jpeg";
		place_picture(id,pic_thumb_src,my_source.match(movapic_carrier)[1]);
	}
	//yfrog support
	if(my_source.match(yfrog_carrier)){
		var pic_thumb_src = my_source.match(yfrog_carrier)[1].replace(/http\:\/\/yfrog\.com\/([0-9a-zA-Z]+)/,"http://yfrog.com/$1:iphone");
		place_picture(id,pic_thumb_src,my_source.match(yfrog_carrier)[1]);
	}
	// getting bkite.com image
	if (my_source.match(bkite_carrier)){
		var pic_thumb_query = my_source.replace(/.+<a\ [^\>]*href\=\"http\:\/\/bkite\.com\/([0-9a-zA-Z]+)\".+/,"http://bkite.com/objects/$1");
		var pic_thumb_loader = document.createElement('script');
		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=WC_YK2IU3hGdr4ty6icw5g&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=bkiteSrc";
		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
	}
	// getting 12sec.tv image
	if (my_source.match(sec_carrier)){
		var pic_thumb_query = my_source.match(sec_carrier)[1];
		var pic_thumb_loader = document.createElement('script');
		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=db3a5299e7cc3465a16b8333891cdc8d&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=bkiteSrc";
		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
	}
	// getting tumblr.com image
	if (my_source.match(tumbl_carrier)){
		var pic_thumb_query = my_source.match(tumbl_carrier)[1];
		var pic_thumb_loader = document.createElement('script');
		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=d6a5ce53ecce335477faf60122f8f7f3&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=bkiteSrc";
		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
	}
	// getting flickr.com image
	if (my_source.match(flickr_carrier)){
		var pic_thumb_query = my_source.match(flickr_carrier)[1];
		var pic_thumb_loader = document.createElement('script');
		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=416a1c6eb426f097dcd35aa745cfe22d&_render=json&snipcode=" + base58_decode(pic_thumb_query) + "&parentid=" + id + "&_callback=bkiteSrc";
		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
	}
	// getting bctiny_carrier image
	if (my_source.match(bctiny_carrier)){
		var pic_thumb_query = my_source.match(bctiny_carrier)[1];
		var pic_thumb_loader = document.createElement('script');
		pic_thumb_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=a5de4b4f98184e4d59896d907948397a&_render=json&snipcode=" + pic_thumb_query + "&parentid=" + id + "&_callback=bkiteSrc";
		document.getElementsByTagName("head")[0].appendChild(pic_thumb_loader);
	}
	return false;
}

function place_picture(id,pic_thumb_src,pic_href)
{
	var pic_thumb = document.createElement('img');
	var pic_thumb_link = document.createElement('a');
	pic_thumb_link.setAttribute("href", pic_href);
	pic_thumb_link.setAttribute("target", "_blank");
	var pic_thumb_id = guid();
	pic_thumb_link.setAttribute("id",pic_thumb_id);
	pic_thumb.setAttribute("class","twitpic_thumb");
	pic_thumb.setAttribute("src", pic_thumb_src);
	pic_thumb_link.appendChild(pic_thumb);
	document.getElementById(id).appendChild(pic_thumb_link);
}

//Make pseudo guid
function S4()
{
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

function guid()
{
   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

function base58_decode(snipcode) {
	var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
	var num = snipcode.length;
	var decoded = 0;
	var multi = 1;
	for ( var i = (num-1) ; i >= 0 ; i-- )
	{
		decoded = decoded + multi * alphabet.indexOf(snipcode[i]);
		multi = multi * alphabet.length;
	}
	return decoded;
}

//Standard function
function hasClass(ele,cls)
{
	try{
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		} catch(err) {
		return false;
	}
	//return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls)
{
	if (!hasClass(ele,cls)) ele.className += " "+cls + " ";
}

function removeClass(ele,cls)
{
	if (hasClass(ele,cls)) {
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	ele.className=ele.className.replace(reg,'');
	}
}

function pb_protocol()
{
	if (location.href.match(/^https/)){
		return "https";
	} else if (location.href.match(/^http\:/)) {
		return "http";
	}
}


//--autoScrolll--//
var during_pagination = true;
setTimeout(function(){if(!document.getElementById("autopagerize_style")){init_autoPager()}}, 1500);

function init_autoPager(){
	during_pagination = false;
	window.addEventListener("scroll", function(){add_scroll_event()}, false);
}


function add_scroll_event(){
	if(document.getElementById("content").clientHeight < (window.scrollY + window.innerHeight + 200) && (during_pagination == false)){
		during_pagination = true;
		add_next_page();
	};
}

// pb_add next page automatically
function add_next_page(){
	during_pagination = true;
	if(!location.href.match(/\/public_timeline$/)){
		var more_url = '';
		if(document.getElementById("more"))
		{
			more_url = document.getElementById("more").href;
			insert_update(more_url);
		}
		else if(document.getElementById("search_more"))
		{
			var more_url = document.getElementById("search_more").href;
			var more_click = document.createEvent('MouseEvents');
			more_click.initEvent( 'click', true, true );
			document.getElementById("search_more").dispatchEvent( more_click );
		}
		window.removeEventListener("scroll", function(){add_scroll_event()}, false);
		during_pagination = false;
	}
}

// -- auto updater -- //
var auto_update = true;
var update_span = 60000;
var update_object = {};
var purge_expression = /public_timeline/;

if(!location.href.match(purge_expression))setInterval(function(){insert_update()}, update_span);

function insert_update()
{
	if(!arguments[0]){
		// insert update
		var real_timeline = document.getElementById("timeline");
		var insert_point = real_timeline.getElementsByClassName('hentry')[0];
		//if(document.getElementById('search_menu'))
		//{	//new interface
		var active_timeline_url = document.getElementById('side').getElementsByClassName('active')[0].getElementsByClassName('in-page-link')[0].href;
		var top_status_id = active_timeline_url + "?twttr=true";
		//}
		//else
		//{	//old interface
		//	var top_status_id = location.href + "?twttr=true";
		//}
		var insert_point_id = insert_point.id.replace(/status_([0-9]+)/,"$1");
			insert_point_id += 0.1;
			insert_point_id -= 0.1;
			//addClass(insert_point, "pb-debug-insert");
	}
	else
	{
		// add next page
		var real_timeline = document.getElementById("timeline");
		var insert_point = real_timeline;
		var insert_point_id = 0.0;
		var top_status_id = arguments[0];
		var more_buton = null;
		if(document.getElementById("more"))
		{
			more_buton = document.getElementById("more");		
		}
		else if(document.getElementById("search_more"))
		{
			more_buton = document.getElementById("search_more");
		}
		var page_num = more_buton.href.match(/page\=([0-9]+)/)[1];
		//var page_num = document.getElementById("more").href.match(/page\=([0-9]+)/)[1];
			page_num -= 0.0;
		var more_url = more_buton.href;
		more_buton.href = more_url.replace(/page\=[0-9]+/, ("page=" + (page_num + 1)));
	}
	var update_req = new XMLHttpRequest();
	update_req.onreadystatechange = function() {
		if(update_req.readyState == 4 && update_req.status == 200){
			update_object = eval('(' + update_req.responseText + ')');
			var insert_HTML = update_object["#timeline"];
			var update_wrapper = document.createElement('div');
			update_wrapper.style.display = "none";
			update_wrapper.id = "pb_updater";
			update_wrapper.innerHTML = insert_HTML;
			document.getElementById("timeline").parentNode.appendChild(update_wrapper);
			var update_node_number = update_wrapper.childNodes[0].childNodes.length;
			for(var i = 0; i < update_node_number; i++ ){
				var updated_entry = update_wrapper.childNodes[0].childNodes[0];
				var updated_entry_id = updated_entry.id.replace(/status_([0-9]+)/,"$1");
					updated_entry_id += 0.1;
					updated_entry_id -= 0.1;

				while(updated_entry_id < insert_point_id && hasClass(insert_point, "mine")){
					insert_point = insert_point.nextSibling;
					while( !hasClass( insert_point , 'hentry' ) )
					{
						insert_point = insert_point.nextSibling;
					}
					insert_point_id = insert_point.id.replace(/status_([0-9]+)/,"$1");
					insert_point_id += 0.1;
					insert_point_id -= 0.1;
					// - debug -- addClass(insert_point, "pb-debug-insert");
				}
				// this try is for myself
				try{
					updated_entry.getElementsByClassName("reply")[0].name = updated_entry.getElementsByClassName("reply")[0].href;
					if(location.href.match(/twitter.com\/(timeline\/)*home/))
					{// home
						updated_entry.removeAttribute("href");
					} else {
						updated_entry.href = updated_entry.href.replace(/twitter.com\/(timeline\/)*[^\?]+/, "twitter.com/$1home");
						updated_entry.href = updated_entry.href.replace(/&amp;/g, "&");
					}

				} catch(err){
				}
				
				//update status text
				if(insert_point_id < updated_entry_id && hasClass(updated_entry,"mine") && (insert_point.id != "timeline") && (document.body.id != "profile")){
					document.getElementsByClassName("status-text")[0].textContent = updated_entry.getElementsByClassName("entry-content")[0].textContent;
				}
				
				//alert(insert_point_id);
				if(insert_point_id < updated_entry_id)
				{
					//add reply function
					try{
						updated_entry.getElementsByClassName("reply")[0].addEventListener("click", function(e){pb_reply(e);e.preventDefault()}, false);
					} catch(err){
					}
					//add face event
					try{
						updated_entry.getElementsByClassName("fav-action")[0].addEventListener("click", function(e){pb_fave(e);e.preventDefault()}, false);
					} catch(err){
					}
					//add destroy event
					try{
						updated_entry.getElementsByClassName("del")[0].addEventListener("click", function(e){pb_destroy(e);e.preventDefault();e.stopPropagation();}, false);
					} catch(err){
					}
					//update animation
					//addClass(updated_entry,"animate");
					
					if(insert_point.id != "timeline"){
						// add animation
						//var conv_script = document.createElement('script');
						//conv_script.innerHTML = "setTimeout(function(){document.getElementById('" + updated_entry.id + "').style.opacity = '1';document.getElementById('" + updated_entry.id + "').style.marginTop = '0px';}," + (i * 200 + 10) + ")";
						//updated_entry.style.opacity = "0";
						//updated_entry.style.marginTop = "-" + updated_entry.clientHeight + "px";
						//updated_entry.style.marginTop = "-52px";
						//updated_entry.style.webkitTransition = "opacity 0.35s cubic-bezier(0.4, 0.0, 0.6, 0.4), margin-top 0.2s ease-in";
						//updated_entry.style.webkitTransition = "opacity 0.35s cubic-bezier(0.4, 0.0, 0.6, 0.4);";
						//updated_entry.appendChild(conv_script);
						insert_point.parentNode.insertBefore(updated_entry, insert_point);

						// latest status class change.
						if(insert_point.className.match(/latest\-status/)){
							insert_point.className = insert_point.className.replace(/latest\-status/g,"");
						}
					//setTimeout(pb_growl(updated_entry), 10);
					//only adding page.
					} else {
						removeClass(updated_entry, "animate");
						real_timeline.appendChild(updated_entry);
					}
				}
				else if(insert_point_id == updated_entry_id)
				{
					updated_entry.parentNode.removeChild(updated_entry);
				}
				else
				{
					update_wrapper.parentNode.removeChild(update_wrapper);
					break;
				}
			}
			try{
				update_wrapper.parentNode.removeChild(update_wrapper);
				} catch(err) {
				}
			}
		};
	update_req.open('GET', top_status_id, true);
	update_req.setRequestHeader("Accept", "application/json, text/javascript, */*");
	update_req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	update_req.send(null);

	return false;
}

function pb_link_maker(string)
{
	var source = string;
	var linked_source = source;
	if(!arguments[1]){
		linked_source = source.replace(/(https*\:\/\/[^\s\*\]\(\)]+)/g, "<a class='pb-link' href='$1' target='_blank'>$1</a>");
		linked_source = linked_source.replace(/blank\'\>([^\<]{28})[^\<]+\<\/a/g, "blank'>$1...</a");
		linked_source = linked_source.replace(/(\s*)\#([^\s]+)(\s*)/g,"$1<a class='pb-link hashtag' href='" + pb_protocol() + "://twitter.com/search?q=%23$2' target='_blank'>#$2</a>$3");
	}
	linked_source = linked_source.replace(/\@([0-9a-zA-Z\_\-]+)/g,"@<a class='pb-link sname' href='" + pb_protocol() + "://twitter.com/$1' target='_blank'>$1</a>");
	//hashtag link
	return linked_source;
}

function pb_snip_retreiver(target)
{
	var snipMatch = /^(http\:\/\/tinyurl\.com\/[^\/]+|http\:\/\/bit\.ly\/.+|http\:\/\/is\.gd\/.+|http\:\/\/ff\.im\/\-.+|http\:\/\/twurl\.nl\/.+)/;
	var links = target.getElementsByClassName('entry-content')[0].getElementsByTagName('a');
	for(var i = 0; i < links.length; i++)
	{
		if(links[i].href.match(snipMatch))
		{
			var snip_opener = pb_snip_url.cloneNode(true);
			snip_opener.name = links[i].href;
			snip_opener.id = guid();
			addClass(links[i], 'pb-snip-url');
			links[i].appendChild(snip_opener);
			links[i].addEventListener("mouseover", function(e){if(hasClass(e.target,'pb-snip-url')){pb_snip_expander(e.target)}}, false);
		}
	}
	return false;
}

function pb_link_remover(target)
{
	pb_temp_target = target.cloneNode(true);
	try
	{  // remove strong tag
		pb_temp_target.removeChild(pb_temp_target.getElementsByTagName('strong')[0]);
	} catch(err){
		//alert(err);
	}
	var pb_link = pb_temp_target.getElementsByTagName('a');
	//var num_pb_link = pb_link.length;
	var removed_str = "";
	for( var i = 0 ; i < pb_link.length ; i++ )
	{
		try
		{ //possible when real-url is exist.
			if( pb_link[i].innerText == '@' )
			{	// in order to remove search tab
				var atmark_span = document.createElement('span');
				atmark_span.innerHTML = '@' ;
				pb_link[i].parentNode.insertBefore( atmark_span , pb_link[i].nextSibling );
				pb_link[i].parentNode.removeChild( pb_link[i] );
			}
			if(!(hasClass(pb_link[i],'hashtag') || hasClass(pb_link[i],'sname') || pb_link[i].target != "_blank"))
			{
					pb_link[i].textContent = pb_link[i].href;
			}
		} catch(err) {}
	}
	removed_str = pb_temp_target.textContent;
	return removed_str;
}

function pb_snip_expander(target)
{
	var url_alias = target.href;
	var snip_pattern = /http\:\/\/bit\.ly\/.+|http\:\/\/is\.gd\/.+|http\:\/\/twurl\.nl\/.+|http\:\/\/tinyurl\.com\/.+/;
	//var turl_pattern = /http\:\/\/tinyurl\.com\/.+/;
	var ffim_pattern = /http\:\/\/ff\.im\/\-.+/;
	// if(url_alias.match(turl_pattern))
// 	{	//tinyURL JSONP
// 		var turl_alias = target.getElementsByTagName('span')[0].name.replace(/http\:\/\/tinyurl\.com\/(.+)/,"$1");
// 		var id =  target.getElementsByTagName('span')[0].id;
// 		addClass(target.getElementsByTagName('span')[0],'loading');
// 	
// 		var turl_loader = document.createElement('script');
// 		turl_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=c2d2c2381f1613c9998ce59f9e621f43&_render=json&urlinput=" + turl_alias + "&parentid=" + id + "&_callback=pbTurlExp";
// 		document.getElementsByTagName("head")[0].appendChild(turl_loader);
// 	}
	if(url_alias.match(snip_pattern))
	{	//search twitter.com JSONP
		var url_alias = url_alias;
		var id =  target.getElementsByTagName('span')[0].id;
		addClass(target.getElementsByTagName('span')[0],'loading');
	
		var turl_loader = document.createElement('script');
		turl_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=be222308568f5f81791af459f573e5a8&_render=json&urlinput=" + url_alias + "&parentid=" + id + "&_callback=pbTurlExp";
		document.getElementsByTagName("head")[0].appendChild(turl_loader);
	}
	else if(url_alias.match(ffim_pattern))
	{	//ffim JSONP
		var url_alias = target.getElementsByTagName('span')[0].name.match(/http\:\/\/ff\.im\/\-(.+)/)[1];
		var id =  target.getElementsByTagName('span')[0].id;
		addClass(target.getElementsByTagName('span')[0],'loading');
	
		var turl_loader = document.createElement('script');
		turl_loader.src = "http://pipes.yahoo.com/pipes/pipe.run?_id=c67eb2388cba44aa76667c00ae58aa88&_render=json&urlinput=" + url_alias + "&parentid=" + id + "&_callback=pbTurlExp";
		document.getElementsByTagName("head")[0].appendChild(turl_loader);
	}
	return;
}

// kick animation to fix place
function kick_animation(target)
{
	var target = target;
	if(target.parentNode.nextSibling)
	{
		//if(target.parentNode.nextSibling.offsetTop < (window.scrollY - 200))
		if((target.parentNode.lastChild.offsetTop < (window.scrollY - 200)))
		{
			//alert('added upper scope');
			var curr_scroll_x = window.scrollX;
			var curr_scroll_y = window.scrollY;
			window.scrollTo(curr_scroll_x, (curr_scroll_y + target.offsetHeight));
			target.style.opacity = "1";
			target.style.marginTop = "0px";	
		}
		else if((target.parentNode.lastChild.offsetTop < (window.scrollY + window.innerHeight + 200)) && ((window.scrollY - 100) < target.parentNode.lastChild.offsetTop) )
		{
			target.style.opacity = "0";
			target.style.webkitTransition = "opacity 0.45s cubic-bezier(0.4, 0.0, 0.6, 0.4), margin-top 0.35s ease-out";
			var conv_script = document.createElement('script');
			conv_script.innerHTML = "setTimeout(function(){document.getElementById('" + target.id + "').style.opacity = '1';document.getElementById('" + target.id + "').style.marginTop = '6px';},200)";
			target.appendChild(conv_script);
		}
		else
		{
			target.style.opacity = "1";
			target.style.marginTop = "6px";
		}
	}
	else
	{
		//alert('end');
		target.style.opacity = "1";
		target.style.marginTop = "6px";
	}
}

function kick_animation_on_top(e)
{
	var target = e.target;
	var curr_scroll_x = window.scrollX;
	var curr_scroll_y = window.scrollY;
	if(target.nextSibling.offsetTop < (window.scrollY - 60))
	{	//upper than scope keep scropp position
		window.scrollTo(curr_scroll_x, (curr_scroll_y + 52));
		target.style.opacity = "1";
		target.style.marginTop = "0px";
		//removeClass(target, "animate");
		pbtweet_main([target]);
	}
	else
	{	// User can see animation
		target.style.webkitTransition = "opacity 0.3s ease-in, margin-top 0.2s ease-in";
		var conv_script = document.createElement('script');
		conv_script.innerHTML = "var target=document.getElementById('" + target.id + "'); setTimeout(function(){target.style.opacity = '1';target.style.marginTop = '0px'},10)";
		target.appendChild(conv_script);
		setTimeout(function(){target.style.opacity = "1";target.style.webkitTransition = "";target.style.marginTop = "0px";removeClass(target, "animate");pbtweet_main([target]);}, 1500);
	}
}

//reply button builder
function pb_extra_set(target)
{
	var my_pb_extra = pb_extra.cloneNode(true);
	var target_meta = target.getElementsByClassName('meta')[0];
	var my_in_reply_to_url = target_meta.getElementsByClassName('entry-date')[0].href;
//	var target_insert = target.getElementsByClassName('entry-meta')[0];

	var my_reply_to = my_in_reply_to_url.match(/twitter\.com\/([^\/]+)/)[1];

	var my_pb_trans = my_pb_extra.getElementsByClassName('pb-trans')[0];

	var my_pb_rtwweet = my_pb_extra.getElementsByClassName('pb-rtweet')[0];
	var my_pb_via = my_pb_extra.getElementsByClassName('pb-via')[0];
//	var my_pb_replyall = my_pb_extra.getElementsByClassName('pb-all')[0];

	my_pb_rtwweet.addEventListener("click", function(e){pb_reply(e,my_in_reply_to_url);}, false);
	my_pb_via.addEventListener("click", function(e){pb_reply(e,my_in_reply_to_url);}, false);
	my_pb_trans.addEventListener("click", function(e){pb_translate(e);e.stopPropagation();e.preventDefault();}, false);


	//set parameter
	my_pb_rtwweet.setAttribute('name',my_in_reply_to_url);
	my_pb_rtwweet.setAttribute('title',"RT @" + my_reply_to + ":");
	my_pb_rtwweet.innerHTML = "RT&nbsp;@:";
	my_pb_via.setAttribute('name',my_in_reply_to_url);
	my_pb_via.setAttribute('title',"via @" + my_reply_to + "");
	my_pb_via.innerHTML = "(via&nbsp;@)";
	
	target_meta.appendChild(my_pb_extra);
	
	return false;
}

function pb_appearance_set(target)
{
	var content_target = target;
	if(arguments[1]){
		var style_target = arguments[1];
	} else {
		var style_target = content_target;
	}
	var entry_string = content_target.getElementsByClassName('entry-content')[0].textContent;

	var mention_regex = new RegExp("@" + session_id);
	if(entry_string.match(mention_regex) && (!hasClass(style_target, 'mine'))){
		addClass(style_target, "pb-mention");
		if(hasClass(style_target.parentNode,"entry-baloon")){
			addClass( style_target.parentNode.getElementsByClassName('entry-content-before')[0], "pb-mention");
			addClass( style_target , "pb-mention" );
			addClass( style_target.parentNode.getElementsByClassName('entry-content-after')[0], "pb-mention");
		}
	}
	return false;
}

function pb_translate(event){
//	load_localscript(event);
	var toEn_button = event.target;
	var target_container = toEn_button.parentNode.parentNode.parentNode.getElementsByClassName('entry-content')[0];
	var string_container = target_container.cloneNode(true);
	if(string_container.getElementsByClassName('pb-real-url')[0])
	{
		for(var i = 0;  i < string_container.getElementsByClassName('pb-real-url').length; i++)
		{
			string_container.getElementsByClassName('pb-real-url')[i].textContent = '';
		}
	}
	var original_string = string_container.textContent;
	if(!hasClass(target_container.parentNode,'entry-baloon')){
		if(target_container.parentNode.getElementsByTagName('strong')[0])
		{
			var tweeter_name = target_container.parentNode.getElementsByTagName('strong')[0].textContent;
		}
		else
		{
			var tweeter_name = "";
		}
		original_string = tweeter_name + ": " + original_string;
	} else {
		original_string = original_string.replace(/^([^\s]+)/,"$1: ");
	}
	var translator_Loader = document.createElement('script');
	translator_Loader.src = "http://www.google.com/uds/Gtranslate?callback=gTransExp&context=" + target_container.parentNode.parentNode.id.replace(/\-/g,"__") + "&q=" + encodeURIComponent(original_string) + "&key=notsupplied&v=1.0&nocache=1240207680396&langpair=%7C" + pb_lang;
	document.getElementsByTagName("head")[0].appendChild(translator_Loader);
	var entry_id = target_container.parentNode.parentNode.id;
	var original_container = document.getElementById(entry_id).getElementsByClassName('entry-content')[0];
	string_container = null;
	var translated_object = original_container.cloneNode(true);
		addClass(translated_object,'pb-translated');
		addClass(translated_object,'translate-loading');
		translated_object.innerHTML = "<img src='http://assets0.twitter.com/images/loader.gif'>";
		original_container.parentNode.insertBefore(translated_object, original_container.nextSibling);
		toEn_button.parentNode.removeChild(toEn_button);
}

function pb_changelang(event) {
	var menu = event.target;
	pb_lang = menu.value;
	pb_trans.innerHTML = "to&nbsp;" + pb_lang.toUpperCase();
	var buttons = document.getElementsByClassName('pb-trans');
	set_storage_Value( 'pb_lang' , pb_lang ) ;
	for(var i = 0; i < buttons.length; i++)
	{
		buttons[i].innerHTML = "to&nbsp;" + pb_lang.toUpperCase();
	}
}

// reply function
function pb_reply(event)
{
	var target = event.target;
	var msg_body = "";
	var my_in_reply_to_url = "";

	var elm = document.getElementById("status");

	switch(event.target.className)
	{
		case "pb-rtweet":
			var in_reply_to_url = arguments[1];
			var reply_to = in_reply_to_url.match(/twitter\.com\/([^\/]+)\/status/)[1];
			var my_in_reply_to_url = in_reply_to_url.match(/\/status\/([0-9]+)$/)[1];
			elm.value = "RT @" + reply_to + ": " + pb_link_remover(target.parentNode.parentNode.parentNode.getElementsByClassName('entry-content')[0]);
			break;
		case "pb-via":
			var in_reply_to_url = arguments[1];
			var reply_to = in_reply_to_url.match(/twitter\.com\/([^\/]+)\/status/)[1];
			var my_in_reply_to_url = in_reply_to_url.match(/\/status\/([0-9]+)$/)[1];
			elm.value = pb_link_remover(target.parentNode.parentNode.parentNode.getElementsByClassName('entry-content')[0]) + " (via @" + reply_to + ")";
			break;
		case "pb-all":
			var in_reply_to_url = arguments[1];
			var reply_to = in_reply_to_url.match(/twitter\.com\/([^\/]+)\/status/)[1];
			var my_in_reply_to_url = in_reply_to_url.match(/\/status\/([0-9]+)$/)[1];
			var id_remover = new RegExp("\@" + reply_to + "\ ");
			elm.value = elm.value.replace(id_remover,"");
			elm.value = "@" + reply_to + " " + elm.value;
			break;
		default:
			var in_reply_to_url = target.name;
			var reply_to = in_reply_to_url.match(/in\_reply\_to\=(.+)$/)[1];
			var my_in_reply_to_url = in_reply_to_url.match(/status\_id\=([0-9]+)\&/)[1];
			var id_remover = new RegExp("\@" + reply_to + "\ ");
			elm.value = elm.value.replace(id_remover,"");
			elm.value = "@" + reply_to + " " + elm.value;
	}
	
	document.getElementById("in_reply_to_status_id").value = my_in_reply_to_url;
	document.getElementById("in_reply_to").value = reply_to;

	elm.focus();
	if(event.target.className != "pb-rtweet"){
		elm.setSelectionRange(elm.value.length, elm.value.length);
	} else {
	}
	return(false);
}


// pb favorite function 
function pb_fave(event)
{
	var target = event.target;
	var target_id = target.id.match(/status\_star\_([0-9]+)/)[1];
	var fave_req = new XMLHttpRequest();
	var post_path = "create";
	if(hasClass(target,"fav")){
		post_path = "destroy";
		removeClass(target,"fav");
	} else if(hasClass(target,"non-fav")){
		post_path = "create";
		removeClass(target,"non-fav");	
	}
	fave_req.onreadystatechange = function(){
		if(fave_req.readyState == 4 && fave_req.status == 200){
			removeClass(target,"fav-throb");	
			if(post_path == "create"){
					addClass(target,"fav");
				} else if(post_path == "destroy"){
					removeClass(target,"non-fav");	
				}
			}
		}
	fave_req.open('POST', "/favorites/" + post_path + "/" + target_id , true);
	fave_req.setRequestHeader("Accept", "*/*");
	fave_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	fave_req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	fave_req.send("authenticity_token=" + twttr.form_authenticity_token);
	addClass(target,"fav-throb");
	return(false);
}

function pb_destroy(event)
{
	if(confirm("Sure you want to delete this update? There is NO undo")){
		var target = event.target;
		var target_id = target.parentNode.childNodes[0].id.match(/status\_star\_([0-9]+)/)[1];
		var fave_req = new XMLHttpRequest();
		var post_path = "destroy";

		fave_req.onreadystatechange = function(){
			if(fave_req.status == 200){
					remove_redundand('status_' + target_id);
				}
			}
		fave_req.open('POST', "/status/" + post_path + "/" + target_id , true);
		fave_req.setRequestHeader("Accept", "application/json, text/javascript, */*");
		fave_req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		fave_req.setRequestHeader("X-Requested-With", "XMLHttpRequest");
//		fave_req.send("authenticity_token=" + document.getElementById("authenticity_token").value);
		fave_req.send("authenticity_token=" + twttr.form_authenticity_token);
		addClass(target,"fav-throb");
	}//
	return(false);
}

// for Growl on Fluid.app
function pb_growl(updated_entry)
{
	if(window.fluid){
		if(updated_entry.getElementsByClassName("screen-name")[0])
		{
			var author = updated_entry.getElementsByClassName("screen-name")[0].title;
			var avatar = updated_entry.getElementsByClassName("photo")[0].src;
		} else {
			var author = document.getElementById('profile').getElementsByClassName("fn")[0].innerText;
			var avatar = document.getElementById('profile-image').src;
		}
		
		var tweet = updated_entry.getElementsByClassName("entry-content")[0].innerText;
		window.fluid.showGrowlNotification({
			title: author,
			description: tweet,
			identifier: updated_entry.id,
			icon: avatar,
			onclick: function(){ window.fluid.activate() ;},
		});
	}
}

function pb_group_tab()
{	//create group
	var pb_hr = document.createElement('hr');

	var pb_group_wrapper = document.createElement('div');
		pb_group_wrapper.id = 'pb-group';
		pb_group_wrapper.className = 'collapsible';
	var pb_group_title = document.createElement('h2');
		pb_group_title.className = 'sidebar-title';
		pb_group_title.innerHTML = '<span>Groups</span>';
	var pb_group_list = document.createElement('ul');
		pb_group_list.className = 'sidebar-menu';
	var pb_group_add_button = document.createElement('a');
		pb_group_add_button.className = 'xref';
		pb_group_add_button.innerHTML = 'add';
	pb_group_list.appendChild( pb_group_add_button );
	pb_group_title.appendChild( pb_group_add_button );

	pb_group_wrapper.appendChild(pb_group_title);
	pb_group_wrapper.appendChild(pb_group_list);
	pb_group_wrapper.appendChild( pb_hr );
	pb_group_add_button.addEventListener('click', function(e){pb_add_group(e.target.parentNode);e.stopPropagation;e.preventDefault()}, false);
	document.getElementById('side').insertBefore( pb_group_wrapper, document.getElementById('rssfeed'));
	document.getElementById( 'following' ).appendChild( pb_hr );
}

function pb_grouping(group)
{	//
	if(pb_active_group != group || arguments[1] == 'keep')
	{
		removeClass(pb_active_group, 'pbActiveGroup');
		pb_active_group = group;
		var elements = document.getElementById('timeline').getElementsByClassName('hentry');
		var group_list = group.getElementsByClassName('vcard');
		var isInGroup = new RegExp(group.inGroup);
		//alert(isInGroup);
		for(var i = 0; i < elements.length; i++)
		{
			var target_u_name = elements[i].className.match(/u-([a-zA-Z0-9\_\-]+)/)[1];
			if(target_u_name.match(isInGroup))
			{
				removeClass(elements[i], 'pbHiddenGroup');				
			}
			else
			{
				hide_group(elements[i].id, '', i * 200);
			}
		}
		addClass(group, 'pbActiveGroup');
	}
	else
	{
		setTimeout(function(){pb_remove_grouping()}, 100);
	}
}

function pb_in_group_regexp(group)
{
	var regrep_string = '';
	var group_list = group.getElementsByClassName('vcard');
	for(var j = 0; j < group_list.length; j++)
	{
		var g_name = group_list[j].getElementsByClassName('url')[0].href.replace(/.+twitter.com\/(.+)/, '$1');
		regrep_string = regrep_string + '|^' + g_name + '$';
	}
	var return_regExp = new RegExp(regrep_string.replace(/^\|/, ''));
	return return_regExp;
}

function pb_is_in_group(target)
{
	var is_in_group = true;
	if(pb_active_group != null)
	{
		is_in_group = false;
		var target_u_name = target.className.match(/u\-([a-zA-Z0-9\_\-]+)/)[1];
		var group_list = pb_active_group.getElementsByClassName('vcard');
		for(var j = 0; j < group_list.length; j++)
		{
			var g_name = group_list[j].getElementsByClassName('url')[0].href.replace(/.+twitter.com\/(.+)/, '$1');
			//window.console.log = window.console.log + target_u_name + '>>' + j + ': '+  g_name +'\n';
			if(target_u_name == g_name)
			{
				is_in_group = true;
				break;
			}
		}
	}
	return(is_in_group);
}

function pb_remove_grouping()
{
	var group = pb_active_group;
	removeClass(group, 'pbActiveGroup');
	var elements = document.getElementById('timeline').getElementsByClassName('hentry');
	for(var i = 0; i < elements.length; i++)
	{
		var target_id = elements[i].id;
		setTimeout(pb_removing_timer(target_id), i*100);
	}
	pb_active_group = null;
}

function pb_removing_timer( target_id )
{
	var target = document.getElementById(target_id);
		removeClass(target, 'pbHiddenGroup');
}

function pb_add_group(wrapper)
{
	var insert_point = wrapper;
	var pb_group = document.createElement('li');
		pb_group.className = 'link-title' ;
	var pb_group_button = document.createElement('a');
		pb_group_button.href = '#';
		pb_group_button.innerHTML = '<span>Group</span>';
	var pb_add_member_to_group_button = document.createElement('span');
		pb_add_member_to_group_button.innerHTML = '+';
		pb_add_member_to_group_button.className = 'pb-group-action';
	pb_group_button.getElementsByTagName('span')[0].appendChild(pb_add_member_to_group_button);
	pb_group_button.addEventListener('click', function(e){pb_grouping(pb_group);e.stopPropagation();e.preventDefault()}, false);
	pb_add_member_to_group_button.addEventListener('click', function(e){pb_add_member_to_group_panel(pb_group);e.preventDefault();e.stopPropagation()}, true);
	pb_group.appendChild(pb_group_button);
	insert_point.parentNode.getElementsByClassName('sidebar-menu')[0].appendChild(pb_group);
	return pb_group;
}

function pb_add_member_to_group(target)
{
	var target = target;
	if(arguments[1] != '')
	{
		var u_name_list = arguments[1].split(/[^0-9a-zA-Z\-\_]+/);
		for( var i = 0 ; i < u_name_list.length ; i++ )
		{
			setTimeout( target.appendChild( vcard_builder( u_name_list[i] ) ) , 100 );
		}
		target.inGroup = pb_in_group_regexp(target);
		pb_grouping(target,'keep');
	}
	pb_add_member_panel_close(target.getElementsByClassName('pb-add-group')[0]);
}

function pb_add_member_to_group_panel(target_group)
{
	var input_field_wrapper = document.createElement('div');
		input_field_wrapper.className = 'pb-add-group';
	var input_field = document.createElement('input');
		input_field.className = 'uname';
	var add_button = document.createElement('input');
		add_button.type = 'button';
		add_button.value = 'Add';
	var cancel_button = document.createElement('input');
		cancel_button.type = 'button';
		cancel_button.value = 'Cancel';

		input_field_wrapper.appendChild(input_field);
		input_field_wrapper.appendChild(cancel_button);
		input_field_wrapper.appendChild(add_button);
	
	add_button.addEventListener('click', function(e){pb_add_member_to_group(target_group, input_field.value);e.stopPropagation()}, false);
	cancel_button.addEventListener('click', function(e){pb_add_member_panel_close(input_field_wrapper);e.stopPropagation()}, false);
	target_group.appendChild(input_field_wrapper); 
}

function pb_add_member_panel_close(target)
{
	var target = target;
	target.parentNode.removeChild(target);
}

function vcard_builder(uname)
{	// current, text vcard
	var userinfo = fetch_user_info(uname);
	if(userinfo)
	{
		var vcard = document.createElement('span');
			vcard.className = 'vcard';
		var vcard_url = document.createElement('a');
			vcard_url.className = 'url';
			vcard_url.rel = 'contact';
			vcard_url.target = '_blank';
			vcard_url.href = '/' + uname;
		var vcard_avater = document.createElement('img');
			vcard_avater.src = userinfo.profile_image_url;
			vcard_avater.className = 'photo fn';
			vcard_avater.width = '24';
			vcard_avater.height = '24';
			vcard_url.appendChild(vcard_avater);
		vcard.appendChild(vcard_url);
		//target.appendChild(vcard);
		return(vcard);
	}
	else
	{
		return(null);	
	}
}

function vcard_append( userinfo , target )
{

}

function fetch_user_info(uname){
	var request = new XMLHttpRequest();
	var url = '/users/' + uname +'.json';
	request.open('GET', url, false);
	request.setRequestHeader("Accept", "application/json, text/javascript, */*");
	request.send(null);
	var conv_object = eval('(' + request.responseText + ')');
	return(conv_object);
}

function pb_info_panel()
{	//create information panel
	var pb_nav = document.createElement('li');
	pb_nav.id = 'pb_info';
	pb_nav.innerHTML = '<a href="">pbtweet</a>';
	var lang_menu = '<select name="tl" id="pb_translation_target"><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">中文 (簡体)</option><option value="zh-TW">中文 (繁体)</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option selected="" value="en">English</option><option value="et">Estonian</option><option value="fa">Persian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="de">German</option><option value="el">Greek</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="id">Indonesian</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option value="es">Spanish</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="vi">Vietnamese</option></select>'
	var chonv_count_menu = '<select name="conv_count"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="999">infinite</option></select>';
	var accesskey_enablity = '<input id="pbaccess" name="pbaccess" type="checkbox"><label  for="pbaccess">enable accesskey</label>';
	accesskey_enablity = '';
	
	var pb_panel = document.createElement('div');
	pb_panel.id = 'pb_panel';
	pb_panel.innerHTML = 'version: ' + pb_version + '<br><form>translate to: '+ lang_menu + '<br>max conversation: ' + chonv_count_menu + '<br>' + accesskey_enablity + '</form><br><a href="http://web.me.com/t_trace/pbtweet/pbtweet_stable_FF.user.js" target="_blank">update to latest version</a><br><img src="http://search.twitter.com/images/powered-by-twitter-sig.gif?1220915084"><br>Powerd by Yahoo! Pipes<br>Powerd by Google<br><input type="button" value="close">';
	pb_panel.style.display = 'none';
	pb_nav.appendChild(pb_panel);
	
	pb_nav.addEventListener('click', function(e){show_close_panel(e.target, pb_panel);e.preventDefault();},false);
	pb_nav.getElementsByTagName('a')[1].addEventListener('click', function(e){e.stopPropagation();},false);
	pb_nav.getElementsByTagName('select')[0].addEventListener('change', function(e){pb_changelang(e);},true);
	pb_nav.getElementsByTagName('select')[1].addEventListener('change', function(e){chain_count = e.target.value; set_storage_Value( 'pb_chain_count' , chain_count ) ; } , true );
//	pb_panel.getElementsByTagName('input')[0].addEventListener('click', function(e){pb_panel.style.display = 'none';e.preventDefault();e.stopPropagation()},true);

	menu_init(pb_nav.getElementsByTagName('select')[0] , pb_lang );
	menu_init(pb_nav.getElementsByTagName('select')[1] , chain_count );
	
	document.getElementById('header').getElementsByTagName('ul')[0].insertBefore(pb_nav, document.getElementById('header').getElementsByTagName('li')[5]);
//	document.getElementById('navigation').getElementsByTagName('ul')[0].insertBefore(pb_nav, document.getElementById('navigation').getElementsByTagName('ul')[0].getElementsByClassName('last')[0]);
}

function show_close_panel(obj, pb_panel){
	if(obj.type == 'button')
	{
		pb_panel.style.display = 'none';
	} else {
		pb_panel.style.display = 'block';
	}
}

function menu_init(target, value)
{
	var option_list = target.getElementsByTagName('option');
	for( var i = 0 ; i < option_list.length ; i++ )
	{
		if(option_list[i].value == value)
		{
			option_list[i].selected = true;
			break;
		}
	}
}

function remove_accesskey(){
	if(!enable_accesskey){
		var target_list = document.getElementById('primary_nav').getElementsByTagName('a');
		for(var i = 0; i < target_list.length ; i++ )
		{
			target_list[i].accessKey = "";
		}
	}
}

//Client side storage handler
function restore_pb_values()
{
	chain_count = get_storage_Value('pb_chain_count') ? get_storage_Value('pb_chain_count') : 4;
	pb_lang = get_storage_Value('pb_lang') ? get_storage_Value('pb_lang') : navigator.language.substr(0,2);
	enable_accesskey = get_storage_Value('pb_enable_accesskey') ? get_storage_Value('pb_enable_accesskey') : false;

// 	if ( !is_localstorage() )
// 	{	//	for legacy cookie
// 		//alert('local and session storage not supported by this browser.');
// 		pb_lang = navigator.language.substr(0,2);
// 		chain_count = 4;
// 	}
// 	else
// 	{	// for localstorage browsers
// 		chain_count = localStorage.getItem('pb_chain_count') ? localStorage.getItem('pb_chain_count') : 4;
// 		pb_lang = localStorage.getItem('pb_lang') ? localStorage.getItem('pb_lang') : navigator.language.substr(0,2);
// 	}
	// Save changes if the user leaves the page.
	window.onclose = function(){save_storage_Changes()};
}

function clearAll()
{
	localStorage.clear();
	restore_pb_values();
}

function set_storage_Value(key, value)
{
	if ( is_localstorage() )
	{
		localStorage.setItem( key, value );
		//sessionStorage.setItem(value, document.getElementById(value).value);
	}
	else
	{
		document.cookie = key + "=" + value + "; expires = Thu, 1-Jan-2030 00:00:00 GMT;" ;
	}
}

function get_storage_Value(key)
{
	if ( is_localstorage() )
	{
		return( localStorage.getItem(key) );
	}
	else
	{
		var cookies = document.cookie.split("; ");
		for ( var i = 0 ; i < cookies.length ; i++ )
		{
			var str = cookies[i].split("=");
			if ( str[0] == key ) {
				return( unescape( str[1] ) );
				break ;
			}
		}
	}
}

function save_storage_Changes()
{
	set_storage_Value('pb_chain_count', chain_count);
	set_storage_Value('pb_lang', pb_lang);
	return;
}

function clearValue(value)
{
	if (value == 'myfield1')
	{
		sessionStorage.removeItem(value);
	}
	else
	{
		localStorage.removeItem(value);
	}
	document.getElementById(value).value = '';
}

function is_localstorage(){
	if (typeof(sessionStorage) == 'undefined' || sessionStorage == null || typeof(localStorage) == 'undefined' || localStorage == null)
	{
		return(false);
	}
	else
	{
		return(false);
	}
}

function load_localscript(event)
{
	if(!pb_accept_local_functions)
	{
		var global_functions = document.createElement('script');
		global_functions.src = "http://web.me.com/t_trace/pbtweet/pbtweet_global_dev.js";
		document.getElementsByTagName("head")[0].appendChild(global_functions);
		pb_accept_local_functions = true;
		pb_translate(event);
	}
}

function pb_css_set()
{
	var insert_HTML = '';
	var get_url = '';
	GM_addStyle(<><![CDATA[s
		div.conv_chain {clear:both; text-align:left;margin: 0px 5px 10px 0px; padding:0px 0px 0px 0px;}
		div.conv_chain div.thumb{width: 34px !important; height: 34px !important; position:relative !important;max-width:100px;}
		div.conv_chain div.thumb img{vertical-align:top; margin-right:4px !important;width:60px !important;max-width:60px !important;height:32px !important;}
		div.conv_chain span.icons{display:inline-block;margin-left:10px;text-align:center;padding:0px 0px 10px 0px;width:50px !important;max-width:50px !important;}
		div.conv_chain span.icons img{max-width:40px;max-height:40px;}
		div.conv_chain span.icons a:hover {text-underline: none;}
		div.conv_chain span.entry-content, body#show #content div.conv_chain span.entry-content{display:block;width:400px;max-width:400px;min-height:24px;margin:0px 0px 0px 0px;padding:0px 12px 0px 16px;vertical-align:top;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_02.png); background-repeat:repeat-y;}
		div.conv_chain span.entry-content-before{display:block;width:400px;max-width:400px; height:12px;margin:0px 0px 0px 0px;padding:0px 6px 0px 16px;vertical-align:top;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_01.png); background-repeat:no-repeat;}
		div.conv_chain span.entry-content-after {display:block;width:400px;max-width:400px; height:25px;margin:0px 0px -10px 0px;padding:0px 6px 0px 16px;vertical-align:top;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_03.png); background-repeat:no-repeat; background-position:0px -4px;}
		ol.statuses div.conv_chain span.meta.entry-meta {clear:right; display:block;padding-left:24px; height:14px; margin-top:4px}
		.hentry img.twitpic_thumb {display:block;position:absolute;left:500px;top:0px;z-index:100;width:100px;heigt100px;border:7px solid white;-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-transform:scale(0.4) rotate(17deg); -moz-transform-origin:50% 0%;-moz-transition:-moz-transform 0.15s ease-in;}
		.hentry img.twitpic_thumb:hover {z-index:101;-moz-transform:scale(1) rotate(0deg);}
		div.conv_chain img.twitpic_thumb {position:absolute;left:435px; top:inherit;margin-top:-35px;-moz-transform-origin:50% 0%;-moz-transform:scale(0.3) rotate(17deg);}
		div.conv_chain img.twitpic_thumb:hover {-moz-transform-origin:50% 0%;-moz-transform:scale(1) rotate(0deg);}
		img.twitpic_thumb {display:block;position:absolute;z-index:900;width:100px;heigt100px;border:7px solid white;-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.7);-moz-transform:translate(490px, -30px) scale(0.4) rotate(17deg); -moz-transform-origin:50% 0%;-moz-transition:-moz-transform 0.15s ease-in;}
		img.twitpic_thumb:hover {-moz-transform: translate(490px, -30px) scale(1) rotate(0deg);}
		ol.statuses div.conv_chain .actions {display:inline; visibility: hidden;padding-top:4px ; float:right; width:14px;line-height:0.8em; position:inherit;margin-right:10px;}
		ol.statuses div.conv_chain:hover .actions {visibility: visible;}
		ol.statuses div.conv_chain .actions .pb-reply {padding:4px 6px; background-image: url(http://static.twitter.com/images/icon_reply.gif);}
		ol.statuses div.conv_chain .actions .pb-fav-action {padding:4px 6px;}
		ol.statuses span.pb-extra span {display:inline-block;box-sizing: content-box; height: 14px; font-size: 10px ;cursor:pointer; margin:0px 3px 5px 3px;padding:1px 6px;border:1px solid #cccccc; -moz-border-radius: 4px;background:#eee;}
		ol.statuses li.status span.pb-extra, ol.statuses li.status:hover div.conv_chain span.pb-extra {opacity: 0;}
		ol.statuses li.status:hover span.pb-extra, ol.statuses li.status div.conv_chain:hover span.pb-extra {opacity: 1;}
		ol.statuses span.pb-extra span:hover {-moz-box-shadow:0px 2px 3px rgba(0, 0, 0, 0.5);color:#444;background-color:#fff;}
		ol.statuses span.pb-extra {display:block;color:#ccc;position:absolute;width:165px;height:12px;margin-left:250px;margin-top:-16px; text-align:right;  font-style:normal; font-family:sans-serif;}
		ol.statuses span.meta.entry-meta {margin-top:5px;}
		ol.statuses li {opacity: 1}
		#pb_info {display: inherit !important;}
		#pb_panel {position: absolute; display: none; left: -130px; padding:4px;background:white; z-index: 9999;}
		#pb_panel * {display: inherit;}
		
		
			//coloring for mine or pb-mention //
		ol.statuses li.pb-mention {background-color:rgb(96%,100%,100%);}
		ol.statuses li.pb-mention:hover {background-color:rgb(88%,95%,99%);}
		ol.statuses li.mine {background-color:#ffffcc;}
		ol.statuses li.mine:hover {background-color:rgb(91%,100%,93%);}
		div.conv_chain span.entry-content.mine {background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mine_02.png)}
		div.conv_chain span.entry-content.pb-mention{background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mention_02.png)}
		div.conv_chain span.entry-content-before.mine { height:12px;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mine_01.png)}
		div.conv_chain span.entry-content-before.pb-mention{ height:12px;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mention_01.png)}
		div.conv_chain span.entry-content-after.mine { height:25px;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mine_03.png)}
		div.conv_chain span.entry-content-after.pb-mention{ height:25px;background-image:url(http://web.me.com/t_trace/pbtweet/images/baloon_mention_03.png)}
			
			//debug-css//
		.pb-debug-insert {background-color:red !important;}
		div#footer {position:fixed; bottom:-20px; z-index:900; text-align:center; margin:0px auto 0px 140px;-moz-box-shadow:0px 3px 5px rgba(0, 0, 0, 0.75);-moz-transition:bottom 0.2s ease-in;}
		div.conv_chain span.entry-baloon {display:inline-block;width:422px;max-width:422px;vertical-align:bottom;margin:0px 0px 0px 0px;}
		ol#timeline {padding-left:0px !important;}
			
		#profile ol.statuses li.status span.pb-extra span.pb-rtweet, #profile ol.statuses li.status span.pb-extra span.pb-via {display:none;}
		div#footer:hover {bottom: 0px;}
		
			// for snip url
		a.pb-snip-url {display:inline-block;margin:-3px -4px; padding: 1px 4px; border:1px solid transparent; text-decoration:none; -moz-border-top-left-radius: 5px 5px;-moz-border-top-right-radius: 5px 5px;}
		a.pb-snip-url:hover {display:inline-block; border:1px solid #999; background-color: #ccc; text-decoration:none; background:-moz-gradient(linear, left top, left bottom, from(#fff), to(#eee), color-stop(0.1, #fff));}
		a.pb-snip-url span {display:block; opacity: 0; position:absolute ;min-width:250px;max-width:400px;  min-height: 16px;margin:0px 0px 0px -5px;padding: 5px 5px; background-color: white; text-decoration:underline; -moz-box-shadow: 0px 4px 4px rgba(0%, 0%, 0%, 0.4);-moz-transform:scale(0, 0);-moz-transform-origin:0% 0%;}
		a.pb-snip-url:hover span {opacity: 1; position:absolute ; z-index: 950;border:1px solid #999; background-color: white; text-decoration:underline;-moz-transform:scale(1, 1);}
		a.pb-snip-url:hover span.loading {background-image:url(http://assets0.twitter.com/images/loader.gif)}
		
		ol.statuses span.status-body {overflow: inherit !important;}
		.status-body > .pb-translated {display:block; border-top:1px dotted silver; color:#555; margin-top: 4px; padding-top:4px;}
		.entry-baloon > .pb-translated {border:none; color:#555; padding-top: 4px;}
		.translate-loading {text-align:center;}
		ol.statuses div.conv_chain .pb-extra {width:180px; margin-left:216px;}
		ol.statuses span.pb-extra .pb-trans {margin-right: 4px; height:14px;-moz-border-radius:6px 6px;}
		ol.statuses span.pb-extra .pb-trans:hover {color: #444; border:1px solid white; background-color:rgb(99%,92%,39%); background: -moz-gradient(linear, left top, left bottom, from(#fff), to(rgb(88%,75%,19%)), color-stop(0.1, rgb(97%,94%,38%)));}
		#profile ol.statuses li.status .status-body > .entry-meta {margin-left:63px;}
		
		body#profile ol.statuses .latest-status .conv_chain .entry-baloon .entry-content {font-size: 1em;}]]></>);
}

})();


unsafeWindow.place_picture = function(id,pic_thumb_src,snip_code){
	if(pic_thumb_src.match(/^http:\/\/s3\.amazonaws.com.+photo\-feed\.jpg$/))
	{
			var pic_thumb = document.createElement('img');
			var pic_thumb_link = document.createElement('a');
			pic_thumb_link.setAttribute("href", "http://bkite.com/" + snip_code);
			pic_thumb_link.setAttribute("target", "_blank");
			var pic_thumb_id = unsafeWindow.guidG();
			pic_thumb_link.setAttribute("id",pic_thumb_id);
			pic_thumb.setAttribute("class","twitpic_thumb");
			pic_thumb.setAttribute("src", pic_thumb_src);
			pic_thumb_link.appendChild(pic_thumb);
			document.getElementById(id).appendChild(pic_thumb_link);
	} else {
			var pic_thumb = document.createElement('img');
			var pic_thumb_link = document.createElement('a');
			pic_thumb_link.setAttribute("href", snip_code);
			pic_thumb_link.setAttribute("target", "_blank");
			var pic_thumb_id = unsafeWindow.guidG();
			pic_thumb_link.setAttribute("id",pic_thumb_id);
			pic_thumb.setAttribute("class","twitpic_thumb");
			pic_thumb.setAttribute("src", pic_thumb_src);
			pic_thumb_link.appendChild(pic_thumb);
			document.getElementById(id).appendChild(pic_thumb_link);	
	}
}

unsafeWindow.expand_url = function(real_url, id){
	if(real_url.match(/^http*\:\/\/.+/))
	{
		var target = document.getElementById(id);
		target.removeEventListener("mouseover", function(e){if(e.target.tagName == 'A'){pb_snip_expander(e.target)}},"false");
		document.getElementById(id).textContent = real_url;
		var real_url_link = document.createElement('a');
		real_url_link.href = real_url.replace(/\, /g , ',');
		real_url_link.textContent = real_url.replace(/\, /g , ',');
		real_url_link.target = '_blank';
		target.textContent = '';
		target.appendChild(real_url_link);
		unsafeWindow.addClassG(real_url_link, 'pb-real-url');
		unsafeWindow.removeClassG(target,'loading');
	}
	else
	{
		var target = document.getElementById(id);
		target.removeEventListener("mouseover", function(e){if(e.target.tagName == 'A'){pb_snip_expander(e.target)}},"false");
		document.getElementById(id).textContent = 'can\'t read real url';
		unsafeWindow.removeClassG(target,'loading');
	}
}


unsafeWindow.gTransExp = function(){
	var target_id = arguments[0].replace(/__/g,'-');
	if(arguments[3] != null)
	{ //error
		var target_object = document.getElementById(target_id).getElementsByClassName('entry-content')[0];
		var translated_object = document.getElementById(target_id).getElementsByClassName('pb-translated')[0];
		translated_object.innerHTML = "" + arguments[3];
		unsafeWindow.removeClassG(translated_object,'translate-loading');
	} else {
		var context = arguments[1].translatedText;
		var org_lang = arguments[1].detectedSourceLanguage;
			if(org_lang == pb_lang)
			{	//same
				var target_object = document.getElementById(target_id).getElementsByClassName('entry-content')[0];
				var translated_object = document.getElementById(target_id).getElementsByClassName('pb-translated')[0];
				target_object.parentNode.removeChild(translated_object);
			}
			else 
			{	// normal
				var target_object = document.getElementById(target_id).getElementsByClassName('entry-content')[0];
				var translated_object = document.getElementById(target_id).getElementsByClassName('pb-translated')[0];
				translated_object.innerHTML = "" + context + " -- from :" + org_lang;
				unsafeWindow.removeClassG(translated_object,'translate-loading');
			}
	}
}

unsafeWindow.S4G = function() {
   return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
unsafeWindow.guidG = function() {
   return (unsafeWindow.S4G()+unsafeWindow.S4G()+"-"+unsafeWindow.S4G()+"-"+unsafeWindow.S4G()+"-"+unsafeWindow.S4G()+"-"+unsafeWindow.S4G()+unsafeWindow.S4G()+unsafeWindow.S4G());
}

unsafeWindow.hasClassG = function(ele,cls) {
	try{
		return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		} catch(err) {
		return false;
	}
}

unsafeWindow.addClassG = function(ele,cls) {
	if (!unsafeWindow.hasClassG(ele,cls)) ele.className += " "+cls;
}

unsafeWindow.removeClassG = function(ele,cls) {
	if (unsafeWindow.hasClassG(ele,cls)) {
	var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
	ele.className=ele.className.replace(reg,'');
	}
}

// in order to detect if outer script is loaded
//pb_accept_local_functions = false;