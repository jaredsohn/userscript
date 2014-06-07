// ==UserScript==
// @name        WoN Mafia Userscript
// @namespace   http://userscripts.org/users/142878
// @version		1.1
// @description This script adds utilities for the forum game "Mafia" to the War of Ninja Forums
// @include     http://forums.warofninja.com/*
// ==/UserScript==

var gm_win = (function(){
    var a;
    try {
        a = unsafeWindow === window ? false : unsafeWindow;
    } finally {
        return a || (function(){
            var e = document.createElement('p');
            e.setAttribute('onclick', 'return window;');
            return e.onclick();
        }());
    }
}());		

// reinsert first post after Ajax action
gm_win.$(document).ajaxSuccess(function(e, xhr) {
    rerunsOnAction(); 
});

function rerunsOnAction() {
	
	// a function that loads jQuery and calls a callback function when jQuery has finished loading
	function addJQuery(callback) {
		var script = document.createElement("script");
		script.setAttribute("src", "http://code.jquery.com/jquery-latest.min.js");
		script.addEventListener('load', function() {
			var script = document.createElement("script");
			script.textContent = "(" + callback.toString() + ")();";
			document.body.appendChild(script);
		}, false);
		document.body.appendChild(script);
	}
	
	function main() {
		jQuery.noConflict();
		
		// options set bij user
		var show_first_post_always = false; 
		var show_first_post_mafia = false; 
		var show_top_contributors = true; 
		var show_news_ticker = true; 
		var show_poll_done = true; 
		var show_statistics = true; 
		
		// globals
		var path = window.location.pathname; 
		var at_topic = false; 
		var at_mafia_topic = false; 
		var username = ""; 
		var array_alive = new Array(); 
		var moderators = new Array(); 
		var last_reset = 0; 
		var votes_mod = new Array(); 
		var unvotes_mod = new Array(); 
		var votes_player = new Array(); 
		var unvotes_player = new Array(); 
		var votecount_object = new Object(); // holds an array for each player alive (and "no lynch")
		var phase = "day"; 
		var deadline = ""; // default no deadline
		var posting_blocked = false; 
		// booleans to be set by moderator
		var nightposts = false; // allow posting by players at night? 
		var twilightposts = false; // allow posting by players at twilight? 
		var deadposts = false; // allow posting by dead players? 
		var bahposts = false; // allow bah-posts by dead players? 
		var multivotes = false; // allow multiple votes by a single player? 
		var enforce_unvotes = false; // don't count votes unless the previous vote was unvoted? 
		var mustlynch = false; // don't allow votes for 'no lynch'? 
		var gameover = false; // allow posts by all players (and non-players)? 
		// booleans to detect for user
		var user_alive = false; 
		var user_dead = false; 
		var user_moderator = false; 
		
		// Scan cookies
		var cookies = document.cookie.split(";"); 
		var cookie_name, cookie_content; 
		for (var i=0; i < cookies.length; i++) {
			cookie_name = cookies[i].substr(0, cookies[i].indexOf("=")); 
			cookie_content = cookies[i].substr(cookies[i].indexOf("=")+1); 
			cookie_name = cookie_name.replace(/^\s+|\s+$/g, "");
			if (cookie_name == "won_username") {
				username = unescape(cookie_content);
			}
			else if (cookie_name == "won_mafia_showfirstpost") {
				if(unescape(cookie_content) == "mafia_only") {
					show_first_post_mafia = true; 
				} 
				else if(unescape(cookie_content) == "every_topic") {
					show_first_post_always = true; 
				} 
			}
			else if (cookie_name == "won_mafia_showtopcontributors") {
				if(unescape(cookie_content) == "true") {
					show_top_contributors = false; 
					jQuery("h4:contains('Top Contributors')").parent().parent().parent().remove(); 	
				} 
			}
			else if (cookie_name == "won_mafia_shownewsticker") {
				if(unescape(cookie_content) == "true") {
					show_news_ticker = false; 
					jQuery("h4:contains('News Ticker')").parent().parent().remove(); 
				} 
			}
			else if (cookie_name == "won_mafia_showpolldone") {
				if(unescape(cookie_content) == "true") {
					show_poll_done = false; 
					jQuery("#latestPoll:has(ul.pollResults)").remove(); 
				} 
			}
			else if (cookie_name == "won_mafia_showstatistics") {
				if(unescape(cookie_content) == "true") {
					show_statistics = false; 
					jQuery("h4:contains('Statistics')").parent().parent().remove(); 
				} 
			}
		}
		
		
		// check what page user is on
		var split_path = path.split("/"); 
		// split_path[0] = empty (nothing before first slash, because path starts with a slash)
		// split_path[1] = topic ID
		// split_path[2] = topic name
		// split_path[3] = current page
		
		// check if user is viewing a topic
		for(var i=0; i < split_path.length && !at_topic; i++) {
			// the url-paths of topics always have a number identifying it, and only topics have such a number
			if(parseInt(split_path[i], 10)) {
				at_topic = true; 
			}
		}
		
		if(at_topic) {
			var doc = document.implementation.createHTMLDocument("Created Document"); 
			// check if user is viewing the first page of the topic
			if(split_path.length > 3 && split_path[3] != "1") {
				// if user is not at first page of the topic, we need to get the contents of the first page
				jQuery.ajax({
					url: "http://forums.warofninja.com/"+split_path[1]+"/"+split_path[2],
					type: 'GET',
					success: function(response){
						doc.body.innerHTML = response;
						parse_base(doc);
					}
				});
			}
			else {
				// user is at first page of the topic. no need for xmlhttpRequest, simply run function parse_base on the current document
				doc.body.innerHTML = jQuery("body").html(); 
				parse_base(doc); 
			}
		}
		else {
			// add option to right sidebar
			var CookieDate = new Date;
			CookieDate.setFullYear(CookieDate.getFullYear( ) + 5);
			var options_section = ' \
				<section> \
				    <header> \
				        <h4>Mafia Userscript</h4> \
				        <img alt="" src="http://assets1.warofninja.com/images/layout/icons/search.png?v3" /> \
				    </header> \
				    \
				    <div> \
				        <h6>Show first post</h6> \
				        <p> \
				        	<input type="radio" name="show_first_post" value="default" onClick="document.cookie = \'won_mafia_showfirstpost=default; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(!show_first_post_always && !show_first_post_mafia) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> Only on first page<br /> \
				        	<input type="radio" name="show_first_post" value="mafia_only" onClick="document.cookie = \'won_mafia_showfirstpost=mafia_only; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(show_first_post_mafia) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> On every page, only in mafia games<br /> \
				        	<input type="radio" name="show_first_post" value="every_topic" onClick="document.cookie = \'won_mafia_showfirstpost=every_topic; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(show_first_post_always) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> On every page, in every topic \
				        </p> \
				    </div> \
				    <div> \
				        <h6>Hide containers</h6> \
				        <p> \
				        	<input type="checkbox" name="top_contributors" value="1" onClick="$(\'#mafia_changes_apply\').show(\'slow\'); document.cookie = \'won_mafia_showtopcontributors=\'+this.checked+\'; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(!show_top_contributors) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> Top Contributors<br /> \
				        	<input type="checkbox" name="news_ticker" value="1" onClick="document.cookie = \'won_mafia_shownewsticker=\'+this.checked+\'; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(!show_news_ticker) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> News Ticker<br /> \
				        	<input type="checkbox" name="poll_done" value="1" onClick="document.cookie = \'won_mafia_showpolldone=\'+this.checked+\'; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(!show_poll_done) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> Poll (only if answered already)<br /> \
				        	<input type="checkbox" name="statistics" value="1" onClick="document.cookie = \'won_mafia_showstatistics=\'+this.checked+\'; expires='+CookieDate.toGMTString()+'; domain=forums.warofninja.com; path=/\'" '; 
			if(!show_statistics) {
				options_section = options_section + 'checked=checked '; 
			}
			options_section = options_section + '/> Statistics \
				        </p> \
				        <p id="mafia_changes_apply" style="display: none; color: #BFC9CD"> \
				        	&nbsp;&nbsp;(changes will apply after refresh) \
				       	</p> \
				    </div> \
				</section> \
			'; 
			jQuery("#wrapper aside").append(options_section); 
		}
		
		// function gets header and content of first post from the document and calls insert_first_post
		function parse_base(doc) {
			var firstpage_text = doc.body.innerHTML; 
			
			// if this is a mafia game, lots of action will be taken
			if(firstpage_text.indexOf("[maf"+"ia]") >= 0 && firstpage_text.indexOf("[/maf"+"ia]") >= 0) {
				at_mafia_topic = true; 
				var mafialist = firstpage_text.substring(firstpage_text.indexOf("[maf"+"ia]")+7, firstpage_text.indexOf("[/maf"+"ia]")); 
				
				var logged_in = false; 
				if(username != "") {
					logged_in = true; 
				}
				// Find username in HTML
				else if(jQuery(".firstWelcome .big").length) {
					username = jQuery(".firstWelcome .big").html(); 
					logged_in = true; 
				}
				
				// get all players alive from list to see if user is alive, and store all alive players in array
				while(mafialist.indexOf("[ali"+"ve]") >= 0 && mafialist.indexOf("[/ali"+"ve]") >= 0) {
					var player_alive = mafialist.substring(mafialist.indexOf("[ali"+"ve]")+7, mafialist.indexOf("[/ali"+"ve]")); 
					array_alive.push(player_alive); 
					if(player_alive == username) {
						user_alive = true; 
					}
					mafialist = mafialist.substring(0, mafialist.indexOf("[ali"+"ve]")) + mafialist.substring(mafialist.indexOf("[/ali"+"ve]")+8); 
				}
				
				// get all players dead from list to see if user is dead
				while(mafialist.indexOf("[de"+"ad]") >= 0 && mafialist.indexOf("[/de"+"ad]") >= 0) {
					var player_dead = mafialist.substring(mafialist.indexOf("[de"+"ad]")+6, mafialist.indexOf("[/de"+"ad]")); 
					if(player_dead == username) {
						user_dead = true; 
					}
					mafialist = mafialist.substring(0, mafialist.indexOf("[de"+"ad]")) + mafialist.substring(mafialist.indexOf("[/de"+"ad]")+7); 
				}
				
				// get all game moderators from list to see if user is moderator
				while(mafialist.indexOf("[moder"+"ator]") >= 0 && mafialist.indexOf("[/moder"+"ator]") >= 0) {
					var player_moderator = mafialist.substring(mafialist.indexOf("[moder"+"ator]")+11, mafialist.indexOf("[/moder"+"ator]")); 
					moderators.push(player_moderator); 
					if(player_moderator == username) {
						user_moderator = true; 
					}
					mafialist = mafialist.substring(0, mafialist.indexOf("[moder"+"ator]")) + mafialist.substring(mafialist.indexOf("[/moder"+"ator]")+12); 
				}
				
				// get all options from list
				while(mafialist.indexOf("[opt"+"ion]") >= 0 && mafialist.indexOf("[/opt"+"ion]") >= 0) {
					var option = mafialist.substring(mafialist.indexOf("[opt"+"ion]")+8, mafialist.indexOf("[/opt"+"ion]")); 
					if(option == "nightposts") {
						nightposts = true; 
					}
					else if(option == "twilightposts") {
						twilightposts = true; 
					}
					else if(option == "deadposts") {
						deadposts = true; 
					}
					else if(option == "bahposts") {
						bahposts = true; 
					}
					else if(option == "multivotes") {
						multivotes = true; 
					}
					else if(option == "enforce_unvotes") {
						enforce_unvotes = true; 
					}
					else if(option == "mustlynch") {
						mustlynch = true; 
					}
					else if(option == "gameover") {
						gameover = true; 
					}
					mafialist = mafialist.substring(0, mafialist.indexOf("[opt"+"ion]")) + mafialist.substring(mafialist.indexOf("[/opt"+"ion]")+9); 
				}
				
				// get current phase from list
				while(mafialist.indexOf("[pha"+"se]") >= 0 && mafialist.indexOf("[/pha"+"se]") >= 0) {
					var current_phase = mafialist.substring(mafialist.indexOf("[pha"+"se]")+7, mafialist.indexOf("[/pha"+"se]")); 
					if(current_phase == "night") {
						phase = current_phase; 
					} 
					else if(current_phase == "twilight") {
						phase = current_phase; 
					} 
					mafialist = mafialist.substring(0, mafialist.indexOf("[pha"+"se]")) + mafialist.substring(mafialist.indexOf("[/pha"+"se]")+8); 
				}
				
				// get deadline from list
				while(mafialist.indexOf("[dead"+"line]") >= 0 && mafialist.indexOf("[/dead"+"line]") >= 0) {
					var string_deadline = mafialist.substring(mafialist.indexOf("[dead"+"line]")+10, mafialist.indexOf("[/dead"+"line]")); 
					var array_deadline = string_deadline.toLowerCase().split(" "); 
					if(array_deadline.length == 4 || array_deadline.length == 5) { // June 5, 2012 12:08 PM
						var month_deadline = ""; 
						if(array_deadline[0] == "jan" || array_deadline[0] == "january") {
							month_deadline = 0; 
						}
						else if(array_deadline[0] == "feb" || array_deadline[0] == "february") {
							month_deadline = 1; 
						}
						else if(array_deadline[0] == "mar" || array_deadline[0] == "march") {
							month_deadline = 2; 
						}
						else if(array_deadline[0] == "apr" || array_deadline[0] == "april") {
							month_deadline = 3; 
						}
						else if(array_deadline[0] == "may") {
							month_deadline = 4; 
						}
						else if(array_deadline[0] == "jun" || array_deadline[0] == "june") {
							month_deadline = 5; 
						}
						else if(array_deadline[0] == "jul" || array_deadline[0] == "july") {
							month_deadline = 6; 
						}
						else if(array_deadline[0] == "aug" || array_deadline[0] == "august") {
							month_deadline = 7; 
						}
						else if(array_deadline[0] == "sep" || array_deadline[0] == "september") {
							month_deadline = 8; 
						}
						else if(array_deadline[0] == "oct" || array_deadline[0] == "october") {
							month_deadline = 9; 
						}
						else if(array_deadline[0] == "nov" || array_deadline[0] == "november") {
							month_deadline = 10; 
						}
						else if(array_deadline[0] == "dec" || array_deadline[0] == "december") {
							month_deadline = 11; 
						}
						else {
							month_deadline = array_deadline[0]; 
						}
						
						var day_deadline = ""; 
						if(array_deadline[1].indexOf(",") > 0) {
							day_deadline = array_deadline[1].substring(0, array_deadline[1].indexOf(",")); 
						}
						else {
							day_deadline = array_deadline[1]; 
						}
						
						var year_deadline = array_deadline[2]; 
						
						var hour_deadline = 0; 
						var minute_deadline = 0; 
						var array_time = array_deadline[3].split(":"); 
						if(array_time.length == 2 || array_time.length == 3) {
							hour_deadline = array_time[0]; 
							minute_deadline = array_time[1]; 
						}
						
						if(array_deadline.length == 5 && array_deadline[4] == "pm" && !isNaN(parseInt(hour_deadline, 10))) {
							hour_deadline = parseInt(hour_deadline) + 12; 
						}

						var currentDate = new Date();
						var currentDate_UTC = new Date(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(),  currentDate.getUTCHours(), currentDate.getUTCMinutes());
						if(!isNaN(parseInt(month_deadline, 10)) && !isNaN(parseInt(day_deadline, 10)) && !isNaN(parseInt(year_deadline, 10)) && !isNaN(parseInt(hour_deadline, 10)) && !isNaN(parseInt(minute_deadline, 10))) {
							month_deadline = parseInt(month_deadline, 10); 
							day_deadline = parseInt(day_deadline, 10); 
							year_deadline = parseInt(year_deadline, 10); 
							hour_deadline = parseInt(hour_deadline, 10); 
							minute_deadline = parseInt(minute_deadline, 10); 
							if(month_deadline > 0 && month_deadline < 13 && day_deadline > 0 && day_deadline < 32 && year_deadline >= currentDate.getUTCFullYear() && hour_deadline >= 0 && hour_deadline < 25 && minute_deadline >= 0 && minute_deadline < 60) {
								deadlineDate = new Date(year_deadline, month_deadline, day_deadline, hour_deadline, minute_deadline); 
								var diffMs = (deadlineDate - currentDate_UTC); // milliseconds between deadline & now
								deadline = (diffMs / 3600000).toFixed(2); // difference in hours, rounded to 2 decimals
							}
						}
					} 
					mafialist = mafialist.substring(0, mafialist.indexOf("[dead"+"line]")) + mafialist.substring(mafialist.indexOf("[/dead"+"line]")+11); 
				}
				
				// add 'no lynch' to votecount object unless option mustlynch is enabled
				if(!mustlynch) {
					votecount_object['no lynch'] = new Array(); // each array holds the names of the players voting for a certain player
				}
				
				// count votes
				var lastpage_path = path; 
				// find the last page of this topic if user is not currently there already
				if(jQuery("#content li.last").length) {
					lastpage_path = jQuery("#content li.last a").attr("href"); 
				}
				var lastpage_split_path = lastpage_path.split("/"); 
				if(lastpage_split_path.length > 3 && parseInt(lastpage_split_path[3], 10) && array_alive.length > 0) {
					// get page number of last page of topic
					var page_number = parseInt(lastpage_split_path[3], 10); 
					countVotesRecursively("http://forums.warofninja.com/"+lastpage_split_path[1]+"/"+lastpage_split_path[2], page_number); 
				} 
				else if(lastpage_split_path.length > 2 && array_alive.length > 0) {
					countVotesRecursively("http://forums.warofninja.com/"+lastpage_split_path[1]+"/"+lastpage_split_path[2], 1); 
				}
				 
				// edit post form depending on the state of the game and whether or not the user is playing and alive or not
				if(!user_moderator && !gameover) {
					jQuery(".postOptions .forumButton:contains(Edit)").css("text-decoration", "line-through").attr("href", "javascript: alert('You are not allowed to edit your post in mafia games. As an exception to the forum rules, you are permitted to double-post instead of edit.')").removeAttr("data-ajax"); 
					
					if(!user_alive && (!user_dead || (!deadposts && !bahposts))) {
						// don't allow posts by people who are not playing in this game
						jQuery("textarea.bbcode").html("Please don't post in this topic. Only players who are alive in this game of Mafia are allowed to post here.").attr("disabled", "disabled").css("background-color", "#ddd"); 
						jQuery(".submitButton").attr("disabled", "disabled"); 
						posting_blocked = true; 
					} else if(phase == "night" && !nightposts) {
						// don't allow posts during the night phase
						jQuery("textarea.bbcode").html("It is currently night. Please don't post during this phase of the game. Posting will be allowed again when the next day phase begins.").attr("disabled", "disabled").css("background-color", "#ddd"); 
						jQuery(".submitButton").attr("disabled", "disabled"); 
						posting_blocked = true; 
					} else if(phase == "twilight" && !twilightposts) {
						// don't allow posts during the twilight phase
						jQuery("textarea.bbcode").html("It is currently twilight: the time where a lynch has already been achieved, but the next night hasn't started yet. Please don't post during this phase of the game. Posting will be allowed again when the next day phase begins.").attr("disabled", "disabled").css("background-color", "#ddd"); 
						jQuery(".submitButton").attr("disabled", "disabled"); 
						posting_blocked = true; 
					} else if(phase == "day" && deadline != "" && deadline <= 0 && !twilightposts) {
						// don't allow posts when the deadline has passed (so it's actually twilight phase)
						jQuery("textarea.bbcode").html("The deadline has passed, so it is currently twilight: the time where the day has ended, but the next night hasn't started yet. Please don't post during this phase of the game. Posting will be allowed again when the next day phase begins.").attr("disabled", "disabled").css("background-color", "#ddd"); 
						jQuery(".submitButton").attr("disabled", "disabled"); 
						posting_blocked = true; 
					} else if(user_dead && bahposts) {
						// allow bah-posts by dead players
						jQuery(".bbcode .forumButton").attr("disabled", "disabled"); 
						jQuery(".bbcode img").remove(); 
						jQuery("textarea.bbcode").html("bah [center][/center]").attr("readonly", "readonly").css("background-color", "#aaa"); 
					}
				}
				
			}
			
			var firstpost_header = doc.getElementById("firstpost"); 
			var firstpost_content = firstpost_header.nextSibling;
			// don't accept whitespace or newline as nodeType for firstpost_content
			while (firstpost_content.nodeType != 1) {
				firstpost_content = firstpost_content.nextSibling;
			}
			
			insert_first_post(firstpost_header, firstpost_content); 
			
		}
		
		function insert_first_post(post_header, post_content) {
			// only insert if option is enabled and first post is not already shown
			if((show_first_post_always || (show_first_post_mafia && at_mafia_topic)) && !jQuery("#firstpost").length) {
				// insert first post at top of page using jQuery
				jQuery(".topicHeaderInfo").after(post_content).after(post_header); 
			}
		}
		
		function countVotesRecursively(page_url, page_number) { 
			// create new document to store page loaded by xmlhttpRequest. necessary in order to browse and manipulate the HTML DOM tree
			var doc = document.implementation.createHTMLDocument("Created Document"); 
			jQuery.ajax({
		        url: page_url+"/"+page_number,
		        type: 'GET',
		        success: function(response) {
					doc.body.innerHTML = response;
					
					// remove signatures from posts
		 		    var signatureSnapshot = doc.evaluate("//div[@class and contains(concat(' ', normalize-space(@class), ' '), ' signature ')]", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
					for(var i=0 ; i < signatureSnapshot.snapshotLength; i++) { 
						var signature = signatureSnapshot.snapshotItem(i);
						signature.parentNode.removeChild(signature);
					}  
					
					// find postnumbers of all posts by moderators
					var mod_posts = new Array(); 
					if(moderators.length > 0) {
						var modtest = "text()='"+moderators[0]+"'"; 
						for(var i=1; i < moderators.length; i++) {
							modtest = modtest + " or text()='"+moderators[i]+"'"; 
						}
						var postnumberSnapshot = doc.evaluate( "//a[@class and contains(concat(' ', normalize-space(@class), ' '), ' username ')]/b["+modtest+"]/parent::a/parent::div/parent::div/preceding-sibling::div[1]/div[@class and contains(concat(' ', normalize-space(@class), ' '), ' postNumber ')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
						for(var j=postnumberSnapshot.snapshotLength-1; j >= 0; j--) { 
							var postnumber = postnumberSnapshot.snapshotItem(j).textContent.trim(); 
							if(postnumber.length > 1) {
								mod_posts.push(parseInt(postnumber.substring(1), 10)); 
							}
						}  
					} 
						
					// get all [votecount][/votecount] tags from those posts
					for(var i=0; i < mod_posts.length && last_reset == 0; i++) {
						var modpostSnapshot = doc.evaluate("//div[@class and contains(concat(' ', normalize-space(@class), ' '), ' postNumber ') and contains(concat(' ', text(), ' '), ' #"+mod_posts[i]+"')]/parent::div/following-sibling::div[1]/div[@class and contains(concat(' ', normalize-space(@class), ' '), ' post ')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );  
						if(modpostSnapshot.snapshotLength > 0) {
							var mod_post_string = modpostSnapshot.snapshotItem(0).textContent; 
							var vote_order = 0; 
							while(mod_post_string.indexOf("[votecount]") >= 0 && mod_post_string.indexOf("[/votecount]") >= 0) {
								var votecount_string = mod_post_string.substring(mod_post_string.indexOf("[votecount]")+11, mod_post_string.indexOf("[/votecount]")).trim(); 
								
								if(votecount_string == "reset") {
									// parse [votecount]reset[/votecount] tag
									if(mod_posts[i] > last_reset) {
										last_reset = mod_posts[i]; 
									}
								}
								else if(votecount_string.length > 16 && votecount_string.substring(0,16) == "unvote no lynch ") {
									// parse [votecount]unvote no lynch player2[/votecount] tag
									var unvote_receiver = "no lynch"; 
									var unvote_caster = votecount_string.substring(16).trim(); 
									var unvote = new Object; 
									unvote.receiver = unvote_receiver;
									unvote.caster = unvote_caster;
									unvote.post = mod_posts[i]; 
									unvote.order = vote_order; 
									unvotes_mod.push(unvote); 
									vote_order++; 
								}
								else if(votecount_string.length > 14 && votecount_string.substring(0,14) == "vote no lynch ") {
									// parse [votecount]vote player1 player2[/votecount] tag
									var vote_receiver = "no lynch"; 
									var vote_caster = votecount_string.substring(14).trim(); 
									var vote = new Object; 
									vote.receiver = vote_receiver;
									vote.caster = vote_caster;
									vote.post = mod_posts[i]; 
									vote.order = vote_order; 
									votes_mod.push(vote); 
									vote_order++; 
								}
								else if(votecount_string.length > 9 && votecount_string.substring(0,7) == "unvote " && votecount_string.substring(7).indexOf(" ") >= 0) {
									// parse [votecount]unvote player1 player2[/votecount] tag
									var unvote_space = votecount_string.substring(7).indexOf(" ");  
									var unvote_receiver = votecount_string.substring(7, unvote_space+7).trim(); 
									var unvote_caster = votecount_string.substring(unvote_space+8).trim(); 
									var unvote = new Object; 
									unvote.receiver = unvote_receiver;
									unvote.caster = unvote_caster;
									unvote.post = mod_posts[i]; 
									unvote.order = vote_order; 
									unvotes_mod.push(unvote); 
									vote_order++; 
								}
								else if(votecount_string.length > 7 && votecount_string.substring(0,5) == "vote " && votecount_string.substring(5).indexOf(" ") >= 0) {
									// parse [votecount]vote player1 player2[/votecount] tag
									var vote_space = votecount_string.substring(5).indexOf(" ");  
									var vote_receiver = votecount_string.substring(5, vote_space+5).trim(); 
									var vote_caster = votecount_string.substring(vote_space+6).trim(); 
									var vote = new Object; 
									vote.receiver = vote_receiver;
									vote.caster = vote_caster;
									vote.post = mod_posts[i]; 
									vote.order = vote_order; 
									votes_mod.push(vote); 
									vote_order++; 
								}
								
								mod_post_string = mod_post_string.substring(0, mod_post_string.indexOf("[votecount]")) + mod_post_string.substring(mod_post_string.indexOf("[/votecount]")+12); 
							}
						}
					}
					
					// remove blockquotes from posts
		 		    var blockquoteSnapshot = doc.evaluate("//blockquote", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );  
					for(var i=0 ; i < blockquoteSnapshot.snapshotLength; i++) { 
						var blockquote = blockquoteSnapshot.snapshotItem(i);
						blockquote.parentNode.removeChild(blockquote);
					}  
		 		    
					if(array_alive.length > 0) {
						// parse all posts by players alive
						for(var i=0; i < array_alive.length; i++) {
							
							// create entry for player in array representing votecount
							votecount_object[array_alive[i]] = new Array(); 
							
							var postnumberSnapshot = doc.evaluate( "//a[@class and contains(concat(' ', normalize-space(@class), ' '), ' username ')]/b[text()='"+array_alive[i]+"']/parent::a/parent::div/parent::div/preceding-sibling::div[1]/div[@class and contains(concat(' ', normalize-space(@class), ' '), ' postNumber ')]", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null ); 
							for(var j=postnumberSnapshot.snapshotLength-1; j >= 0; j--) { 
								var postnumber = postnumberSnapshot.snapshotItem(j).textContent.trim(); 
								if(postnumber.length > 1) {
									var player_post = parseInt(postnumber.substring(1), 10); 
									// don't check votes that were cast before the last votecount reset
									if(player_post < last_reset) {
										j = -1; 
									}
									else {
										// get bolded parts from post with ID player_post
										var playerpostSnapshot = doc.evaluate("//div[@class and contains(concat(' ', normalize-space(@class), ' '), ' postNumber ') and contains(concat(' ', text(), ' '), ' #"+player_post+"')]/parent::div/following-sibling::div[1]/div[@class and contains(concat(' ', normalize-space(@class), ' '), ' post ')]/b", doc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );  
										if(playerpostSnapshot.snapshotLength > 0) {
											var vote_order = 0; 
											for(var k=0; k < playerpostSnapshot.snapshotLength; k++) {
												var player_post_string = playerpostSnapshot.snapshotItem(k).textContent.toLowerCase(); 
												// check for unvotes or votes
												while(player_post_string.indexOf("vote") >= 0) { // || player_post_string.indexOf("unvote") >= 0
													if(player_post_string.indexOf("unvote") >= 0 && player_post_string.indexOf("unvote") < player_post_string.indexOf("vote")) {
														// parse unvote
														var unvote_pos = player_post_string.indexOf("unvote"); 
														var unvote_receiver = ""; 
														var unvote_receiver_endpos = 0; 
														if(player_post_string.substring(unvote_pos).length < 7 || player_post_string.substring(unvote_pos+6, unvote_pos+7) == " " || player_post_string.substring(unvote_pos+6, unvote_pos+7) == ":" || player_post_string.substring(unvote_pos+6, unvote_pos+7) == "," || player_post_string.substring(unvote_pos+6, unvote_pos+7) == ";" || player_post_string.substring(unvote_pos+6, unvote_pos+7) == "." || player_post_string.substring(unvote_pos+6, unvote_pos+7) == "!") {
															if(player_post_string.substring(unvote_pos).length > 7 && (player_post_string.substring(unvote_pos+6, unvote_pos+7) == " " || player_post_string.substring(unvote_pos+6, unvote_pos+7) == ":")) {
																unvote_receiver = player_post_string.substring(unvote_pos+7).trim(); 
																unvote_receiver_endpos = -1; 
																if(unvote_receiver.length > 7 && unvote_receiver.substring(0, 8) == "no lynch") {
																	unvote_receiver_endpos = 8; 
																}
																else {
																	if(unvote_receiver.indexOf(" ") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf(" ") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf(" "); 
																	}
																	if(unvote_receiver.indexOf(",") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf(",") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf(","); 
																	}
																	if(unvote_receiver.indexOf(";") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf(";") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf(";"); 
																	}
																	if(unvote_receiver.indexOf(":") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf(":") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf(":"); 
																	}
																	if(unvote_receiver.indexOf(".") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf(".") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf("."); 
																	}
																	if(unvote_receiver.indexOf("!") >= 0 && (unvote_receiver_endpos < 0 || unvote_receiver.indexOf("!") < unvote_receiver_endpos)) {
																		unvote_receiver_endpos = unvote_receiver.indexOf("!"); 
																	}
																}
																if(unvote_receiver_endpos >= 0) {
																	unvote_receiver = unvote_receiver.substring(0, unvote_receiver_endpos); 
																} 
																else {
																	unvote_receiver_endpos = unvote_receiver.length; 
																}
															}
														}
														var unvote = new Object; 
														unvote.receiver = ""; 
														if(unvote_receiver != "") {
															if(unvote_receiver == "no lynch" && !mustlynch) {
																unvote.receiver = unvote_receiver;
															}
															// Only register unvote receiver if the receiver is alive
															for(var l=0; l < array_alive.length; l++) {
																if(unvote_receiver == array_alive[l].toLowerCase()) {
																	unvote.receiver = array_alive[l];
																	l = array_alive.length; 
																}
															}
														}
														// Unvoting someone who is not in the game will still register as an unvote
														unvote.caster = array_alive[i];
														unvote.post = player_post; 
														unvote.order = vote_order; 
														unvotes_player.push(unvote); 
														player_post_string = player_post_string.substring(0, unvote_pos)+player_post_string.substring(unvote_pos+6); 
													}
													else {
														// parse votes
														var vote_pos = player_post_string.indexOf("vote"); 
														var vote_receiver = ""; 
														var vote_receiver_endpos = 0; 
														if(player_post_string.substring(vote_pos).length < 5 || player_post_string.substring(vote_pos+4, vote_pos+5) == " " || player_post_string.substring(vote_pos+4, vote_pos+5) == ":" || player_post_string.substring(vote_pos+4, vote_pos+5) == "," || player_post_string.substring(vote_pos+4, vote_pos+5) == ";" || player_post_string.substring(vote_pos+4, vote_pos+5) == "." || player_post_string.substring(vote_pos+4, vote_pos+5) == "!") {
															if(player_post_string.substring(vote_pos).length > 5 && (player_post_string.substring(vote_pos+4, vote_pos+5) == " " || player_post_string.substring(vote_pos+4, vote_pos+5) == ":")) {
																vote_receiver = player_post_string.substring(vote_pos+5).trim(); 
																vote_receiver_endpos = -1; 
																if(vote_receiver.length > 7 && vote_receiver.substring(0, 8) == "no lynch") {
																	vote_receiver_endpos = 8; 
																}
																else {
																	if(vote_receiver.indexOf(" ") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf(" ") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf(" "); 
																	}
																	if(vote_receiver.indexOf(",") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf(",") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf(","); 
																	}
																	if(vote_receiver.indexOf(";") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf(";") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf(";"); 
																	}
																	if(vote_receiver.indexOf(":") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf(":") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf(":"); 
																	}
																	if(vote_receiver.indexOf(".") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf(".") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf("."); 
																	}
																	if(vote_receiver.indexOf("!") >= 0 && (vote_receiver_endpos < 0 || vote_receiver.indexOf("!") < vote_receiver_endpos)) {
																		vote_receiver_endpos = vote_receiver.indexOf("!"); 
																	}
																}
																if(vote_receiver_endpos >= 0) {
																	vote_receiver = vote_receiver.substring(0, vote_receiver_endpos); 
																} 
																else {
																	vote_receiver_endpos = vote_receiver.length; 
																}
															}
														}
														
														if(vote_receiver != "") {
															if(vote_receiver == "no lynch" && !mustlynch) {
																var vote = new Object(); 
																vote.receiver = vote_receiver;
																vote.caster = array_alive[i];
																vote.post = player_post; 
																vote.order = vote_order; 
																votes_player.push(vote); 
															}
															else {
																// Only register vote if the receiver is alive
																for(var l=0; l < array_alive.length; l++) {
																	if(vote_receiver == array_alive[l].toLowerCase()) {
																		var vote = new Object(); 
																		vote.receiver = array_alive[l];
																		vote.caster = array_alive[i];
																		vote.post = player_post; 
																		vote.order = vote_order; 
																		votes_player.push(vote); 
																		l = array_alive.length; 
																	}
																}
															}
														}
														player_post_string = player_post_string.substring(0, vote_pos)+player_post_string.substring(vote_pos+4); 
													} 
													vote_order++; 
												}
											}
										}
									}	
								}
							}  
						}
					} 
					
					if(page_number > 1 && last_reset == 0) {
						// go into recursion if there are more pages and no votecount reset has been found yet
						countVotesRecursively(page_url, page_number-1)
					}
					else {
						// stop recursion if first page has been reached or votecount has been reset
						produce_votecount(); 
					}
					
		        }
		    });
		}
		
		function produce_votecount() {
			votes_mod.sort(votesort);
			unvotes_mod.sort(votesort);
			votes_player.sort(votesort);
			unvotes_player.sort(votesort);
			
			function votesort(a, b){
				//Compare "a" and "b" in some fashion, and return <0, 0, or >0
				if(a.post==b.post) { 
					return a.order-b.order; 
				} 
				else { 
					return a.post-b.post; 
				}
			}
			
			while(votes_mod.length > 0 || unvotes_mod.length > 0 || votes_player.length > 0 || unvotes_player.length > 0) {
				var min_post = -1; 
				var min_order = -1; 
				var min_type = ""; 
				if(votes_mod.length > 0 && (min_post < 0 || votes_mod[0].post < min_post || (votes_mod[0].post == min_post && (min_order < 0 || votes_mod[0].order < min_order)))) {
					min_post = votes_mod[0].post; 
					min_order = votes_mod[0].order; 
					min_type = "votes_mod"; 
				}
				if(unvotes_mod.length > 0 && (min_post < 0 || unvotes_mod[0].post < min_post || (unvotes_mod[0].post == min_post && (min_order < 0 || unvotes_mod[0].order < min_order)))) {
					min_post = unvotes_mod[0].post; 
					min_order = unvotes_mod[0].order; 
					min_type = "unvotes_mod"; 
				}
				if(votes_player.length > 0 && (min_post < 0 || votes_player[0].post < min_post || (votes_player[0].post == min_post && (min_order < 0 || votes_player[0].order < min_order)))) {
					min_post = votes_player[0].post; 
					min_order = votes_player[0].order; 
					min_type = "votes_player"; 
				}
				if(unvotes_player.length > 0 && (min_post < 0 || unvotes_player[0].post < min_post || (unvotes_player[0].post == min_post && (min_order < 0 || unvotes_player[0].order < min_order)))) {
					min_post = unvotes_player[0].post; 
					min_order = unvotes_player[0].order; 
					min_type = "unvotes_player"; 
				}
				
				if(min_type == "votes_mod") {
					processNextVote(votes_mod); 
				}
				else if(min_type == "unvotes_mod") {
					processNextUnvote(unvotes_mod); 
				}
				else if(min_type == "votes_player") {
					processNextVote(votes_player); 
				}
				else if(min_type == "unvotes_player") {
					processNextUnvote(unvotes_player); 
				}
			}
			
			var votecount_objectarray = new Array(); 
			for (var player_name in votecount_object) {
				var votecount_playeroutput = new Object(); 
				votecount_playeroutput.player = player_name; 
				votecount_playeroutput.votecount = votecount_object[player_name].length; 
				votecount_playeroutput.vote_casters = votecount_object[player_name].join(', '); 
				votecount_objectarray.push(votecount_playeroutput); 
			}
			votecount_objectarray.sort(votecountsort); 
			
			// sort from most votes to fewest votes
			function votecountsort(a, b){
				//Compare "a" and "b" in some fashion, and return <0, 0, or >0
				return b.votecount-a.votecount; 
			}
			
			var votes_needed_to_lynch = Math.ceil(array_alive.length / 2); // correct if number of players alive is uneven
			if(votes_needed_to_lynch == array_alive.length / 2) {
				votes_needed_to_lynch++; // add one if number of players alive is even
			}
			var lynch_reached = false; 
			var votecount_string = "<b><u>Vote count:</u></b> "; 
			for(var i=0; i < votecount_objectarray.length; i++) {
				if(votecount_objectarray[i].votecount > 0) {
					var style_color1 = '<span>'; 
					var style_color2 = '</span>'; 
					if(votecount_objectarray[i].votecount == votes_needed_to_lynch) {
						style_color1 = '<span style="color: red">'; 
						lynch_reached = true; 
					}
					else if(votecount_objectarray[i].votecount == votes_needed_to_lynch - 1) {
						style_color1 = '<span style="color: orange">'; 
					}
					votecount_string = votecount_string+"<br>"+style_color1+votecount_objectarray[i].player+" - "+votecount_objectarray[i].votecount+" <i>("+votecount_objectarray[i].vote_casters+")</i>"+style_color2; 
				}
			}
			votecount_string = votecount_string+"<br><br>With <b>"+array_alive.length+"</b> players alive, it takes <b>"+votes_needed_to_lynch+"</b> votes to lynch. "; 
			if(deadline != "") {
				if(deadline > 0) {
					votecount_string = votecount_string+"<br>The deadline is in "+deadline+" hours. "; 
				}
				else {
					votecount_string = votecount_string+"<br>The deadline has passed. "; 
				}
			}
			if(lynch_reached && !posting_blocked && phase == "day" && !twilightposts && !user_moderator) {
				// don't allow posts when a lynch has been reached (so it's actually twilight phase)
				jQuery("textarea.bbcode").html("It is currently twilight: the time where a lynch has already been reached, but the next night hasn't started yet. Please don't post during this phase of the game. Posting will be allowed again when the next day phase begins.").attr("disabled", "disabled").css("background-color", "#ddd"); 
				jQuery(".submitButton").attr("disabled", "disabled"); 			
			}
			
			// output votecount
			var votecount_post = '<div class="postHeader"></div><div class="forumPostContainer"><div class="poster"><a class="username" href="http://userscripts.org/scripts/show/133943"><b>WoN Mafia Userscript</b></a></div><div class="post" style="min-height: 0">'+votecount_string+'</div>'; 
			if(jQuery(".postHeader:not([id])").length) {
				jQuery(".postHeader:not([id])").before(votecount_post); 
			}
			if(jQuery("#firstpost").length) {
				jQuery("#firstpost").before(votecount_post); 
			}
		}
		
		function processNextVote(votes) {	
			if(votes.length > 0) {
				if(votecount_object[votes[0].receiver]) {
					var already_voted = false; 
					if(!multivotes) {
						for (var player_name in votecount_object) {
							for(var i=0; i < votecount_object[player_name].length; i++) {
								if(votecount_object[player_name][i] == votes[0].caster) {
									votecount_object[player_name].splice(i, 1); 
									already_voted = true; 
								}
							}
						}
					}
					if(!enforce_unvotes || !already_voted) {
						votecount_object[votes[0].receiver].push(votes[0].caster); 
					}
				}
				votes.splice(0, 1); 
			}
		}
		
		function processNextUnvote(unvotes) {	
			if(unvotes.length > 0) {
				for (var player_name in votecount_object) {
					if(unvotes[0].receiver.length > 0) {
						// process unvote for a given caster and receiver
						if(player_name == unvotes[0].receiver) {
							for(var i=0; i < votecount_object[player_name].length; i++) {
								if(votecount_object[player_name][i] == unvotes[0].caster) {
									votecount_object[player_name].splice(i, 1); 
								}
							}
						}
					}
					else {
						// process unvote for a given caster, but no receiver
						for(var i=0; i < votecount_object[player_name].length; i++) {
							if(votecount_object[player_name][i] == unvotes[0].caster) {
								votecount_object[player_name].splice(i, 1); 
							}
						}
					}
				}
				unvotes.splice(0, 1); 
			}
		}
	}
	
	// load jQuery and execute the main function
	addJQuery(main);
	
}

rerunsOnAction(); 