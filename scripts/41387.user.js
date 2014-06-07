// ==UserScript==
// @name           	Twitter Fantastico
// @namespace      	http://iworkwithcomputers.com
// @description   	Twitter Fantastico adds a retweet button to every tweet and when pressed, an embedded textarea is created below the current tweet. The reply button has similar functionality now. All requests are made asynchronously. More info found here: http://iworkwithcomputers.com/2009/01/29/greasemonkeytwitter-fantastico-script-update/
// @include        	http://twitter.com/*
// @include        	https://twitter.com/*
// @require			http://iworkwithcomputers.com/dev/jquery/jquery-1.3.min.js
// @require			http://iworkwithcomputers.com/dev/jquery/ui/minified/jquery.ui.all.min.js
// @author    		Carl Furrow
// ==/UserScript==


//TODO: Nested Tweets seems to break this script. Why?
//TODO: Eliminate the website from asking for login credentials twice. Unnecessary!
//TODO: Set focus on textareas when shown via a reply or retweet. (Bug is thrown from some Twitter code, I believe. Focus() causes errors)
//TODO: Create some kind of direct message mechanism on the main page, without refresh (hover-over user image, icon shows up?)
//TODO: @reply helper (this will be hard. api only gets 100 users at a time, no way to filter through entire friend collection)
//TODO: Threaded conversations
//TODO: Toolbar

//FIXED(3.2.09): Removed CSS highlighting when on single tweet-page
//FIXED(2.27.09): HTTPS errors (via Karolis)
//ADDED(2.27.09): TwitPic preview, at Karolis' request (http://userscripts.org/users/26455)
//FIXED(2.27.09): Suspend self-highlights when viewing your own page (compare "a.profile_link:href" and ".profile-head a:href")
//FIXED(2.24.09): Twitter changed their reply link class to "reply" and that broke my code. Changed to "reply2" for now
//FIXED(2.17.09): Make embedded retweet/reply work on non-home pages (single tweet pages, or on profile pages)
//FIXED(2.17.09): Get username from profile link if not on home page?
//ADDED(2.10.09): Add update panel to page, to show user that there's a new version of the script (idea from Mislav via Endless Tweets userscript)
//FIXED(2.10.09): Modify "new" tweet buttons on endless tweet load (reply, retweet, favorite, delete)
//ADDED(2.10.09): Using jQuery.noconflict()
//FIXED(2.10.09): Add regex so that if on /home and there's an anchor in the url (ie "#" or "#reply", etc), still load tweets
//FIXED(2.10.09): Change time to actual time of post, not relative time.
//FIXED(2.10.09): Do regex on each status to see if @current_username is in the text. If found, make sure the li has the "to_me" css class applied
//FIXED(2.6.09): Clicking modified reply button still adds @reply to main status text area
//REMOVED: Removed modified "favorite" button, as twitter seems to have fixed it's functionality
//FIXED(2.6.09): Delete button no longer working--somehow, twitter overwrote previous code and javascript dialog always opens now (grrr!)
//ADDED: Endless tweets using JSON
//ADDED: Modify retweet (embedded retweet)
//ADDED: Modify reply (embedded reply)
//ADDED: Modify delete (to get it working, sometimes it doesn't work)
//ADDED: Modify favorite (to get it working again, sometimes it doesn't work)
//ADDED: slide and highlight animations
//ADDED: Character counter near textareas
//ADDED: Highlight replies to you (yellow?)
//ADDED: Highlight own tweets (green)
twitter_fantastico = function(){
	var j=jQuery.noConflict();
	var last_read_tweet_id;
	var tweets_on_page;
	var current_username = (j.trim(j("p#me_name").html())).length != 0 ? j.trim(j("p#me_name").html()) : j("#navigation #profile_link").attr("href").replace(/https?:\/\/(?:www\.)?twitter\.com\/([\w\d]+)$/,"$1");
	var debug=true;
	var onNonProcessingPage = false;
	var onTwitterFriendFeed = false;
	var onTwitterIndividualTweet = false;
	var onTwitterUsersProfile = false;
	var onOwnProfilePage = false;
	var pageNumber=1;
	var loading=false;
	var lastPage=false;
	var useJQXHR=true;
	var current_script_length = 28882;
	var loaded_tweets = new Array();

	if (typeof GM_xmlhttpRequest == "function") 
	{
	  var xhr = GM_xmlhttpRequest;
	} 
	else 
	{
		var xhr = function(params) 
		{
	    	var req = new XMLHttpRequest();

	    	req.onreadystatechange = function() {
	  			if (req.readyState == 4) {
			        if (req.status >= 200 && req.status < 400) 
						if (params.onload) 
							params.onload(req);
			        else if (params.onerror) 
						params.onerror(req);
				}
		    }

	    	if (params.headers) 
				for (name in params.headers);
	      	req.setRequestHeader(name, params.headers[name]);

		    req.open(params.method, params.url, true);
		    req.send(params.data);
		}
	}

	j(document).ready(function(){	
		//Don't try to get data when user is on twitter's homepage, and not logged in yet.
		log("Document ready. Determining what page the user is on.");
		log("Current Username: " + current_username);

		determine_what_page_user_is_on();
		j('head').append("<style type='text/css'>"+page_css()+"</style>");
		//add_bottom_actionbar();
		log("Loading page data");
		//load_page(false,useJQXHR);
		load_page(useJQXHR,false);
		modify_tweets(loaded_tweets[pageNumber-1],false)
		log("Attaching scroll event handler");
		//apply scroll event handler
		j(window).scroll(function(e){
			//window.pageYOffset
			//window.innerHeight
			//log("Y: "+window.pageYOffset+" WindowHeight: "+window.innerHeight);
			lastTweetTop = j("#timeline .status:last").offset().top;
			currentScrollPosition = window.pageYOffset + window.innerHeight;
			//log("Loading: "+loading+" LastPage: "+lastPage+" currentScrollPosition >= lastTweetTop - 20:" + (currentScrollPosition >= lastTweetTop - 20));
			if( !loading && !lastPage && currentScrollPosition >= lastTweetTop - window.innerHeight/3)
			{
				pageNumber++;
				log("Grabbing more tweets from page "+pageNumber);
				load_page(useJQXHR,false);
				modify_tweets(loaded_tweets[pageNumber-1],true);
			}
		});
		j("table.get-started-steps").hide();
		//Add counters to each text box
		add_counter_to_textareas();
		add_update_notification();
	});

	function load_page(useJqueryAjax,is_async)
	{
		loading=true;
		reHttp = /https?/;
		protocol = /https?/.exec(location.href)[0];
		if(!onNonProcessingPage &&  onTwitterFriendFeed)
		{
			log("On friend feed");
			log("Page Number: " + pageNumber);
			friends_timeline_url = protocol+"://twitter.com/statuses/friends_timeline.json";
			if(useJqueryAjax)
			{
				log("Loading json page data via jquery from "+friends_timeline_url);
				j.ajax({
					url:friends_timeline_url,
					type: "GET",
					data: {page:pageNumber},
					dataType: "json",
					async:is_async,
					success:function(data){
						if(data == null || data.length == 0)
						{	
							log("Data is null from "+friends_timeline_url+", or data.length was 0.");
							lastPage=true;
							pageNumber--;
							return;
						}
						loaded_tweets[pageNumber-1] = data;
						log('Successfully loaded ' + data.length + ' tweets.' )
						loading=false;
					},
					error:function(xmlhttp,errortype,errorobj){
						log('Error loading tweets on page load.')
					}
				});
			}
			else
			{
				log("Loading json page data via xhr");
				xhr({
					url:friends_timeline_url+"?page="+pageNumber,
					method:"GET",
					onload:function(req){
						newTweets = eval(req.responseText);
						if(newTweets == null || newTweets.length == 0 )
						{
							log("Data is null from "+friends_timeline_url+", or data.length was 0.");
							lastPage=true;
							pageNumber--;
							return;
						}
						log('Successfully loaded ' + newTweets.length + ' tweets.' );
						tweets_on_page = newTweets;
						loaded_tweets[pageNumber-1] = data;
						loading=false;
					}
				});
			}		
		}
		else if(!onNonProcessingPage && onTwitterIndividualTweet)
		{
			statusid = reUrlSplitUp[3];
			log("On indidivual page("+statusid+")");
			log("Page Number: " + pageNumber);
			j.ajax({
				url:protocol+"://twitter.com/statuses/show/"+statusid+".json",
				type:"GET",
				data:{id:statusid},
				dataType:"json",
				async:false,
				success:function(data){
					//add to array, don't just apply single tweet
					loaded_tweets[pageNumber-1] = new Array();
					loaded_tweets[pageNumber-1].push(data);
					log("Loaded "+loaded_tweets[pageNumber-1].length+" tweet(s)");
					loading=false;
				}
			});
		}
		else if(onTwitterUsersProfile)
		{
			log("On user's profile");
			log("Page number: "+pageNumber);
			j.ajax({
				url:protocol+"://twitter.com/statuses/user_timeline/"+reUrlSplitUp[1]+".json",
				type: "GET",
				data: {page:pageNumber},
				dataType: "json",
				async:is_async,
				success:function(data){
					if(data == null || data.length == 0)
					{	
						lastPage=true;
						pageNumber--;
						return;
					}
					loaded_tweets[pageNumber-1] = data;
					log('Successfully loaded ' + data.length + ' tweets.' )
					loading=false;
				},
				error:function(xmlhttp,errortype,errorobj){
					log('Error loading tweets on page load.')
				}
			});
		}
	}
	function modify_tweets(tweets,appendTweets)
	{
		log("Modifying " + tweets.length + " tweet(s)");
		if(tweets != null)
		{
			for(i=0;i<tweets.length;i++)
			{
				jq_tweet = j("#timeline #status_"+tweets[i].id);
				if(jq_tweet.length == 0)
					jq_tweet = j("#permalink");
				if(appendTweets)
				{
					new_jq_tweet = convert_json_tweet_to_html_tweet(tweets[i]);//.appendTo("#timeline");
					add_retweet_button(new_jq_tweet,tweets[i]);
					modify_reply_button(new_jq_tweet,tweets[i]);				
					if(tweets[i].user.screen_name == current_username)
					{
						new_jq_tweet.find("span.actions div").append("<a class='delete' title='delete this update' href='#delete'></a>");
						modify_delete_button(new_jq_tweet,tweets[i]);
					}
					find_reply_to_me_in_tweet_and_set_to_me_class(new_jq_tweet);
					if(j("#timeline").length>0)
						new_jq_tweet.appendTo("#timeline");
					else
						new_jq_tweet.appendTo("#wrapper");
					add_twitpic_preview(new_jq_tweet,tweets[i]);
				}
				else
				{
					oldEntryContent = jq_tweet.find(".status-body .entry-content").html();
					newEntryContent = link_up_status_text(oldEntryContent,false,false,true);
					jq_tweet.find(".status-body .entry-content").html(newEntryContent);
					modify_reply_button(jq_tweet,tweets[i]);
					add_retweet_button(jq_tweet,tweets[i]);
					modify_delete_button(jq_tweet,tweets[i]);
					add_twitpic_preview(jq_tweet,tweets[i]);
					find_reply_to_me_in_tweet_and_set_to_me_class(jq_tweet);
				}

			}
		}
		//modify_nested_twitter_replies();
		//log("Done modifying tweets.");
	}
	function modify_nested_twitter_replies()
	{
		j("#reply_*").css("background-color","#f00");
	}
	function add_retweet_button(tweet,json_tweet)
	{
		if(json_tweet.user.screen_name != current_username)
		{
			tweet.find("a.retweet-link").remove();
			//log("Adding retweet button for "+ json_tweet.id);
			//log("Adding retweet button for " + json_tweet.id);
			if(tweet.find(".actions div").length==0)
				jq_retweet_link = j("<a class='retweet-link' href='#retweet'>RT</a>").appendTo(tweet.find(".actions"));
			else
				jq_retweet_link = j("<a class='retweet-link' href='#retweet'>RT</a>").appendTo(tweet.find(".actions div"));

			jq_retweet_link.data('json_tweet',json_tweet);
			jq_retweet_link.click(function(){
				show_embedded_retweet(j(this).data('json_tweet'));
				return false;
			});
			//log("Done adding retweet");
		}

	}
	function show_embedded_retweet(json_tweet)
	{
		if(j("li#status_"+json_tweet.id).length>0)
			jq_tweet = j("li#status_"+json_tweet.id);
		else
			jq_tweet = j("#permalink");

		if( jq_tweet.find(".status-body .embedded-retweet").length==0)
		{
			jq_embedded_retweet = j("<div id='retweet_"+json_tweet.id+ "' class='embedded-retweet'><span class='counter'>140</span><br/><textarea  class='retweet-text'></textarea><br/><a class='retweet-submit' href='#'>Retweet this</a><a class='retweet-cancel' href='#'>Cancel</a></div>");

			jq_embedded_retweet.appendTo(jq_tweet.find(".status-body")).effect('scale',{from:{height:0},percent:100,direction:'vertical',scale:'box'},300);
			jq_textarea = jq_embedded_retweet.find("textarea.retweet-text");
			//jq_textarea.focus(function(){
			//	counter_span = j(this).parent().find("span.counter");
			//	counter_span.html(140-parseInt(j(this).val().length));
			//});
			counter_span = jq_textarea.parent().find("span.counter");
			counter_span.html(140-parseInt(jq_textarea.val().length));

			jq_textarea.val("RT @" + json_tweet.user.screen_name + " " + json_tweet.text);
			jq_retweet_link = jq_embedded_retweet.find("a.retweet-submit");
			jq_retweet_link.data('json_tweet',json_tweet);
			jq_retweet_link.data('jq_textarea',jq_textarea);
			jq_cancel_retweet_link = jq_embedded_retweet.find("a.retweet-cancel");
			jq_cancel_retweet_link.data('json_tweet',json_tweet);
			jq_cancel_retweet_link.data('jq_textarea',jq_textarea);

			jq_retweet_link.click(function(){
				jtweet = j(this).data('json_tweet');
				jq_ta = j(this).data('jq_textarea');
				j.ajax({
					url:'http://twitter.com/statuses/update.json',
					type: 'POST',
					dataType: 'json',
					data:{status:jq_ta.val(),in_reply_to_status_id:jtweet.id},
					success:function(data){
						jq_ta.parent().remove();
						convert_json_tweet_to_html_tweet(data).prependTo("#timeline").show("highlight",{},1000);
					}
				});
				return false;
			});

			jq_cancel_retweet_link.click(function(){
				jtweet = j(this).data('json_tweet');
				jq_ta = j(this).data('jq_textarea');
				jq_ta.parent().effect('scale',{percent:0,direction:'vertical',scale:'box'},300,function(){j(this).remove();});

				//jq_ta.parent().remove();
				return false;
			});
		}

	}
	function modify_reply_button(tweet,json_tweet)
	{
		//log("Modifying reply button for " + json_tweet.id);
		tweet.find(".actions .repl").remove();
		tweet.find(".actions .reply").remove();
		tweet.find(".actions .reply2").remove();
		if(tweet.find(".actions div").length>0)
			jq_reply_link = j("<a class='reply2' href='#reply'></a>").appendTo(tweet.find(".actions div"));
		else
			jq_reply_link = j("<a class='reply2' href='#reply'></a>").appendTo(tweet.find(".actions"));
		jq_reply_link.css({"height":"16px","background-image":"url(http://static.twitter.com/images/icon_reply.gif)"});
		jq_reply_link.data('json_tweet',json_tweet);
		if(json_tweet.user.screen_name == current_username)
		{
			log("Removing reply button, as this is the current user's tweet.");
			tweet.find(".reply").remove();
			tweet.find(".repl").remove();
			tweet.find(".reply2").remove();
			return false;
		}
		//log("Adding reply click-event for: "+jq_reply_link.parent().parent().parent().attr("id"));
		jq_reply_link.click(function(){
			show_embedded_reply(j(this).data('json_tweet'));
			return false;
		});
		//log("Done modifying reply");
	}
	function show_embedded_reply(json_tweet)
	{
		if(j("#status_"+json_tweet.id).length>0)
			jq_tweet = j("#status_"+json_tweet.id);
		else
			jq_tweet = j("#permalink");
		if(jq_tweet.find(".status-body .embedded-reply").length==0)
		{
			jq_embedded_reply = j("<div id='reply_"+json_tweet.id+"' class='embedded-reply'><span class='counter'>140</span><br/><textarea class='reply-text'>@"+json_tweet.user.screen_name+"</textarea><br/><a class='reply-submit' href='#'>Reply</a><a class='reply-cancel' href='#'>Cancel</a></div>");
			jq_embedded_reply.appendTo(jq_tweet.find(".status-body")).effect('scale',{from:{height:0},percent:100,scale:'box',direction:'vertical'},300);
			jq_textarea = jq_embedded_reply.find("textarea.reply-text");
			//jq_textarea.focus(function(){
			//	counter_span = j(this).parent().find("span.counter");
			//	counter_span.html(140-parseInt(j(this).val().length));
			//});
			//jq_textarea.focus();
			counter_span = jq_textarea.parent().find("span.counter");
			counter_span.html(140-parseInt(jq_textarea.val().length));
			jq_reply_link = jq_embedded_reply.find("a.reply-submit");
			jq_reply_link.data('json_tweet',json_tweet);
			jq_reply_link.data('jq_textarea',jq_textarea);

			jq_reply_cancel_link = jq_embedded_reply.find("a.reply-cancel");
			jq_reply_cancel_link.data('json_tweet',json_tweet);
			jq_reply_cancel_link.data('jq_textarea',jq_textarea);		

			jq_reply_link.click(function(){
				jtweet = j(this).data('json_tweet');
				jq_ta = j(this).data('jq_textarea');
				log("Replying to @"+jtweet.user.screen_name+"("+jtweet.id+") with: "+jtweet.text)
				j.ajax({
					url:'http://twitter.com/statuses/update.json',
					type:'POST',
					dataType:'json',
					data:{status:jq_ta.val(),in_reply_to_status_id:jtweet.id},
					success:function(data){
						jq_ta.parent().remove();
						convert_json_tweet_to_html_tweet(data).prependTo("ol#timeline").show("highlight",{},1000);
					}
				});
				return false;
			});

			jq_reply_cancel_link.click(function(){
				jtweet = j(this).data('json_tweet');
				jq_ta = j(this).data('jq_textarea');
				jq_ta.parent().effect('scale',{percent:0,direction:'vertical',scale:'box'},300,function(){j(this).remove();});
				//jq_ta.parent().remove();
				return false;
			});
		}	
	}
	function add_twitpic_preview(tweet,json_tweet)
	{
		tweet.find("a[href^='http://twitpic.com']").each(function(){
			href = j(this).attr('href');
			html = "<div class='twitpic-preview'><a href='"+href+"'><img src='"+href+"-thumb'/></a></div>";
			j(this).parent().append(html);
		})
	}

	function modify_delete_button(tweet,json_tweet)
	{
		if(current_username == json_tweet.user.screen_name)
		{
			//log("current_username==json_tweet.user.screen_name: "+current_username+" == "+json_tweet.user.screen_name);
			//http://twitter.com/statuses/destroy/id.json
			//What's going on here:
				//I'm finding and removing Twitter's existing delete button, so as to create a new delete button that does not
				//use a javascript prompt. Multiple attemps to just "unbind" Twitter's delete button failed. So I had to resort
				//to hack-ish methods (see below). It works for now.
			tweet.find("a.del").remove();
			tweet.find("a.delete").remove();
			newDeleteExists = tweet.find("a.delete").length>0;
			jq_delete_css = {"height":"16px", "background-image":"url(http://static.twitter.com/images/icon_trash.gif)"};
			jq_delete = j("<a href='#delete' class='delete'></a>").appendTo(tweet.find(".actions div"));
			jq_delete.css(jq_delete_css);
			jq_delete.attr('href','#delete');
			jq_delete.data('json_tweet',json_tweet);
			jq_delete.click(function(){
				j.ajax({
					url:"http://twitter.com/statuses/destroy/"+j(this).data('json_tweet').id+".json",
					type: "DELETE",
					dataType: "json",
					data:{id:j(this).data('json_tweet').id},
				});
				tweet.effect('highlight',{color:'#f00'},800,function(){j(this).remove();})
				return false;
			});
		}	
	}
	function convert_json_tweet_to_html_tweet(json_tweet)
	{
		jq_tweet_li = j("a.repl").eq(0).parent().parent().parent().clone();
		if(jq_tweet_li.length == 0)
			jq_tweet_li = j("a.reply").eq(0).parent().parent().parent().clone();
		if(jq_tweet_li.length == 0)
			jq_tweet_li = j("a.reply2").eq(0).parent().parent().parent().clone();
		jq_tweet_li.children(".actions a.reply").attr("class","repl");
		jq_tweet_li.children(".actions a.reply2").attr("class","repl");
		jq_tweet_li.children(".actions .retweet-link").remove();
		jq_tweet_li.find("a:contains('in reply to')").remove();
		//log("Using "+jq_tweet_li.attr("id")+" as a template for copy.");
		jq_tweet_li.attr("id","status_"+json_tweet.id);
		jq_tweet_li.attr("class","hentry status u-"+json_tweet.user.screen_name+(current_username==json_tweet.user.screen_name?" mine":""));
		jq_tweet_li.find("span.author a.url").attr("href","http://twitter.com/"+json_tweet.user.screen_name);
		jq_tweet_li.find("span.author a.url img.photo").attr("src",json_tweet.user.profile_image_url);
		jq_tweet_li.find("span.author a.url img.photo").attr("alt",json_tweet.user.name);
		jq_tweet_li.find("span.status-body strong:first a").html(json_tweet.user.screen_name);
		jq_tweet_li.find("span.status-body strong:first a").attr('title',json_tweet.user.name);
		jq_tweet_li.find("span.status-body strong:first a").attr("href","http://twitter.com/"+json_tweet.user.screen_name);

		jq_tweet_li.find("span.status-body span.entry-content").html(link_up_status_text(json_tweet.text,true,true,true));
		jq_tweet_li.find("span.status-body span.entry-meta a.entry-date").attr("href","http://twitter.com/"+json_tweet.user.screen_name+"/status/"+json_tweet.id);
		jq_tweet_li.find("span.status-body span.entry-meta a.entry-date span.published").attr("title",format_time(json_tweet.created_at) + " ago"); 

		jq_tweet_li.find("span.status-body span.entry-meta a.entry-date span.published").html( format_time(json_tweet.created_at) + " ago"); 
		//jq_tweet_li.find("span.status-body span.entry-meta a.entry-date span.published").timeago();
		jq_tweet_li.find("span.status-body span.entry-meta a.entry-date + span").html("from " + json_tweet.source + "&nbsp;");

		jq_tweet_li.find("span.actions div a[id^=status_star]").unbind();
		jq_tweet_li.find("span.actions div a[id^=status_star]").attr("id","status_star_"+json_tweet.id);
		jq_tweet_li.find("span.actions div a[id^=status_star]").attr("class",(json_tweet.favorited?"fav":"non-fav"));
		jq_tweet_li.find("span.actions div a[id^=status_star]").attr("title",(json_tweet.favorited?"favorite this update":"un-favorite this tweet"));

		//log("Adding retweet button, via convert_json method.");


		jq_tweet_li.find("span.actions div a.retweet-link").unbind();

		jq_tweet_li.find("div.embedded-reply").remove();
		jq_tweet_li.find("div.embedded-retweet").remove();

		if(json_tweet.in_reply_to_status_id != null)
		{
			jq_tweet_li.find("span.entry-meta").append("&nbsp;<a href='http://twitter.com/"+json_tweet.in_reply_to_screen_name+"/status/"+json_tweet.in_reply_to_status_id+"'>in reply to "+json_tweet.in_reply_to_screen_name+"</a>")
		}
		//find_reply_to_me_in_tweet_and_set_to_me_class(jq_tweet_li);
		return jq_tweet_li;
	}
	function determine_what_page_user_is_on()
	{
		reUrlSplitUp=/https?:\/\/(?:www\.)?twitter.com\/([\w\d]+)(?:\/(statuses)\/(\d+))?(?:\?page=(\d+))?/.exec(location.href);
		// 1: directory right after twitter.com (ie: home or carl_furrow, etc)
		// 2: the word "statuses" if in the url (what did I want to use this for?)
		// 3: the status id
		// 4: Page number

		if(reUrlSplitUp == null)
			onNonProcessingPage=true;
		else
		{
			if(reUrlSplitUp[1]=="blocks" || reUrlSplitUp[1] == "account" || reUrlSplitUp[1] == "followers" || reUrlSplitUp[1] == "friends")
			{
				onNonProcessingPage=true;
				return;
			}

			log("reUrlSplitUp[1]: "+reUrlSplitUp[1]+" reUrlSplitUp[2]: "+reUrlSplitUp[2]+" reUrlSplitUp[3]: "+reUrlSplitUp[3]+" reUrlSplitUp[4]: "+reUrlSplitUp[4]);
			if(reUrlSplitUp[1] != null && reUrlSplitUp[1] == "home")
				onTwitterFriendFeed=true;
			else if(reUrlSplitUp[1] != null && reUrlSplitUp[1] != "home")
			{
				if(reUrlSplitUp[3] !=  null)
					onTwitterIndividualTweet=true;
				else
				{
					onTwitterUsersProfile=true;
					top_profile_link_name = /https?:\/\/twitter.com\/([\w\d]+)/.exec(j.trim(j("#navigation .top-nav #profile_link").attr("href")))[1];
					user_name = j.trim(j("#content .wrapper h2.thumb").text());
					log('(determine page)user_name:'+ user_name);
					log('(determine page)top_profile_link username: '+top_profile_link_name)
					if(top_profile_link_name == user_name)
						onOwnProfilePage=true;
				}

			}
			if(reUrlSplitUp[4] != null && reUrlSplitUp[4].length > 0)
				pageNumber = reUrlSplitUp[4];
		}	
		log("onNonProcessingPage: "+onNonProcessingPage+" onTwitterFriendFeed: "+onTwitterFriendFeed+" onTwitterIndividualTweets:"+onTwitterIndividualTweet+" onTwitterUsersProfile: "+onTwitterUsersProfile);
	}
	function add_counter_to_textareas()
	{
		j("textarea.reply-text").live("keyup",function(e){
			counter_span = j(this).parent().find("span.counter");
			counter_span.html(140-parseInt(j(this).val().length));
		})
		j("textarea.retweet-text").live("keyup",function(e){
			counter_span = j(this).parent().find("span.counter");
			counter_span.html(140-parseInt(j(this).val().length));
		});
	}
	function link_up_status_text(statustext, linkUrls, linkReplies, linkHashes)
	{
		//log("Linking: "+text);
		newtext = statustext;
		if(newtext != null)
		{
			if(linkUrls)
				newtext = newtext.replace(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:\/~\+#]*[\w\-\@?^=%&amp;\/~\+#])?/gi,"<a href='$&'>$&</a>"); //from http://regexlib.com/REDetails.aspx?regexp_id=96
			if(linkReplies)
				newtext = newtext.replace(/@([^\s<]+)[\.,\?!]?/gi,"@<a href='http://twitter.com/$1'>$1</a>");
			if(linkHashes)
				newtext = newtext.replace(/#([^\s<]+)[\.,\?!]?/gi,"#<a href='http://hashtags.org/tag/$1'>$1</a>");	
		}
		return newtext;
	}
	//helluva function name--bad practice on my part :)
	function find_reply_to_me_in_tweet_and_set_to_me_class(jqTweet)
	{
		text = jqTweet.find(".status-body .entry-content").html();
		if(text != null)
			if(text.indexOf(current_username) != -1 && jqTweet.attr("class").indexOf("to_me") == -1)
				jqTweet.attr("class",jqTweet.attr("class")+" to_me");
	}
	function add_bottom_actionbar()
	{
		log('Adding bottom actionbar');
		html="<div class='bottom-actionbar'></div>";
		j("body").append(html);
		log('Actionbar appended');
	}
	function add_update_notification()
	{
		//http://userscripts.org/scripts/source/41387.user.js
		xhr({
			method:"HEAD",
			url:"http://userscripts.org/scripts/source/41387.user.js",
			headers: { 'Accept-Encoding': '' }, //Thanks Mislav
			onload:function(response){
				//log("Response from userscripts.org: "+response.responseHeaders);
				scriptLength = response.responseHeaders.match(/Content-Length: (\d+)/)[1];
				log("Got script, length: "+scriptLength);
				if(current_script_length != scriptLength)
				{
					//show update link
					j("<div><a href='http://userscripts.org/scripts/show/41387'>*Update to Twitter Fantastico is available*</a></div>").prependTo("td#content .wrapper");
				}
			}
		});		
	}
	function page_css()
	{
		css = "div.embedded-retweet textarea, div.embedded-reply textarea{width:95%;font-family:arial;font-size:95%;height:125px;} li.hentry{min-height:60px;} span.counter{ float:right; font-weight:bold; position:relative; right:20px; color:#000;} a.retweet-link{text-indent:0px !important;} .twitpic-preview{}";
		mine_css = "ol.statuses li.mine:hover{background-color:#99CC99;} .mine{background-color:#CCFFCC;}li.mine .meta, li.mine .meta a{color:#666;}";
		to_me_css = "ol.statuses li.to_me:hover{background-color:#eecc44;} div.embedded-retweet a, div.embedded-reply a{margin:0 10px 0 0;} .to_me, .to_me .entry-content{background-color:#FFDD99;background: #FFDD99 none repeat scroll 0 0 !important;}li.to_me .meta, li.to_me .meta a{color:#666;}";
		bottom_actionbar_css = ".bottom-actionbar{ position:fixed; background-color:#333; bottom:0; color:#fff; height:25px; padding:0 20px 0 20px; width:100%; z-index:5; }";
		css += bottom_actionbar_css;
		if(onTwitterIndividualTweet)
		{
			return css;
		}
		else
		{
			if(!onOwnProfilePage)
				return css+=mine_css + to_me_css;
			else
				return css;
		}
	}
	function format_time(t)
	{
		log("Time: "+t);
		return relativeTime(new Date(t));
	}
	function getCookieSession()
	{
		r = /_twitter_sess=([^\s;]+)/;
		return r.exec(document.cookie.toString())[0];
	}
	// stolen from twitter.com (hope you guys don't mind)
	function relativeTime(date, relativeTo) {
	  if (!relativeTo) relativeTo = new Date();
	  var delta = (relativeTo.getTime() - date.getTime()) / 1000
	  if (delta < 5) return 'less than 5 seconds'
	  else if (delta < 10)  return 'less than 10 seconds'
	  else if (delta < 20)  return 'less than 20 seconds'
	  else if (delta < 60)  return 'less than a minute'
	  else if (delta < 120) return 'about a minute'
	  else if (delta < (60*60))    return Math.round(delta / 60) + ' minutes'
	  else if (delta < (120*60))   return 'about an hour'
	  else if (delta < (24*60*60)) return 'about ' + Math.round(delta / 3600) + ' hours'
	  else if (delta < (48*60*60)) return '1 day'
	  else return Math.round(delta / 86400) + ' days'
	}
	function log(msg)
	{
		if(debug)
			GM_log(msg);
	}	
}();
