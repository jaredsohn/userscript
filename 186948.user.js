// ==UserScript==
// @name        Hummingbird CR Scrobbler
// @namespace   hummingbird
// @author	Tempest
// @description After spending 10 minutes on a Crunchyroll episode page the updater will automatically update your Hummingbird library to the episode you're watching.
// @include     *://*.crunchyroll.com/*
// @version     1
// @grant       none
// ==/UserScript==

var token = localStorage.getItem("token");
var username = localStorage.getItem("username");
console.log(token);
	if (token === null) {
		$("#template_body").find(">:first-child").before("<div id=\"loginsbox\"><input id=\"user\" class=\"form-control\" placeholder=\"Username/Email\" type=\"text\"><input id=\"pass\" class=\"form-control\" placeholder=\"Password\" type=\"password\"><input class=\"btn btn-primary\" value=\"Sign In\" id=\"login\" type=\"submit\"></div>");
		var loginbutton = document.getElementById('login');	
		loginbutton.addEventListener('click', login);
	} else {
		$("#template_body").find(">:first-child").before("<div id=\"loginsbox\"><input class=\"btn btn-primary\" value=\"Sign out\" id=\"signout\" type=\"submit\"></div>");
		var logoutbutton = document.getElementById('signout');
		logoutbutton.addEventListener('click', logout);
}


function logout(e) {
	localStorage.removeItem("token");
	document.location.reload(true);
}

function login(e) {
	var user = $("#user").val();
	var pass = $("#pass").val();
	if(user == "" || pass == "") return;
	var button = $("input.btn-primary");
	button.attr("disabled", "");
	button.attr("value", "Connecting to Hummingbird API...");
	var login = user.indexOf("@") != -1 ? "email" : "username";
	var loginData = { "password" : pass };
	loginData[login] = user.toLowerCase();
	var resp = $.ajax({
		type:"POST", beforeSend: function (request) {
			request.setRequestHeader("X-Mashape-Authorization", "S2oB7reG9wisJm30zr6td4xCoF0UNQEU");
		}, url: "https://hummingbirdv1.p.mashape.com/users/authenticate",
		data: loginData, dataType: "text", async: false
	}).responseText;
	console.log(resp);
	if (resp.indexOf("Invalid") != -1 || resp.indexOf("missing parameter") != -1) {
		button.removeAttr("disabled");
		button.attr("value", "Invalid login, please try again");
	} else {
		var old_element = document.getElementById("login");
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		resp = resp.substring(1, resp.length - 1);
			console.log(resp);
		localStorage.setItem('username', user);
		localStorage.setItem('token', resp);
		console.log(resp);
		document.location.reload(true);
	}
}












if (token === null) {
		$("#template_body").find(">:first-child").before("<div id=\"message_box\" style=\"\"><div class=\"message-container\"><div class=\"message-list\"><div class=\"message-item clearfix message-type-warning\"><img class=\"message-item-icon\" src=\"/common/static/empty_pixel.gif\">You are not logged into automatic Hummingbird updater!</div></div></div></div>");
	} else {
		var empty = url = "assets/images/empty.png";
		$("#template_body").find(">:first-child").after("<style>.box img{position:relative;}.star{cursor:pointer;background-image:url(" + empty + ");}</style><div id=\"message_box\" class=\"box\"><div class=\"message-container\"><div class=\"message-list\"><div class=\"message-item clearfix message-type-warning\"><img class=\"message-item-icon\" src=\"/common/static/empty_pixel.gif\">Hummingbird automatic updater - Welcome back " + username + "<text id=\"htmlify_me\"></text></div></div></div></div>");
		if($("h1.ellipsis>a>span").length == 0){
		}else{
		var show = $("h1.ellipsis>a>span").text();
		var episode = $("h1.ellipsis").text().replace(show, "").match(/\d+/)[0];
		process(show, episode, token);
	}
}
function toTime(seconds) {
	var sec = seconds % 60;
	sec = sec.toString();
	if(sec.length == 1) sec = "0" + sec;
	var minutes = (seconds - sec) / 60;
	minutes = minutes.toString();
	if(minutes.toString().length == 1) minutes = "0" + minutes;
	return minutes + ":" + sec;
}

var ep, access, library_entry, isOnLastEpisode, shouldReset = true, currentStars, cachedStars;

function process(showName, episode, token) {
	if($('div.showmedia-trailer-notice').length > 0) {
		$("#htmlify_me").html("<br/>Hummingbird updater has detected that you are watching a trailer. Will not update your Hummingbird library.");
		return;
	}
	if($("#showmedia_mangareader_title").length > 0) {
		return;
	}
	access = token;
	var messages = $(".block");
	if (messages.text().indexOf("This video has not been released yet.") != -1) {
		$("#htmlify_me").html("<br/>Hummingbird updater has detected that episode " + episode + " of " + showName + " has not come out yet. Will not update your Hummingbird library.");
		return;
	}
	if (showName === "The World God Only Knows: Goddesses") {
		slug = "the-world-god-only-knows-goddess-arc";
	} else if (showName === "Squid Girl Season 1") {
		slug = "squid-girl";
	} else if (showName === "Squid Girl Season 2") {
		slug = "squid-girl-2";
	} else if (showName === "Kimi ni Todoke - From Me To You Season 2") {
		slug = "kimi-ni-todoke-2nd-season";
	} else if (showName === "Kyousougiga") {
		slug = "kyousougiga-tv";
	} else if (showName === "Soranowoto") {
		slug = "so-ra-no-wo-to";
	} else if (showName === "Wagnaria!! 2") {
		slug = "working--3";
	} else if (showName === "Valvrave the Liberator Second Season") {
		slug = "kakumeiki-valvrave-2nd-season";
		episode -= 12;
	} else if (showName === "Kuroko's Basketball 2") {
		slug = "kuroko-no-basket-2";
		episode -= 25;
	} else if (showName === "The World God Only Knows Season 2") {
		slug = "the-world-god-only-knows-ii";
	} else if (showName === "Oreimo") {
		slug = "oreimo-season-2";
	} else if (showName === "Dog & Scissors") {
		slug = "inu-to-hasami-wa-tsukaiyou";
	} else if (showName === "Monogatari") {
		slug = "monogatari-series-second-season";
	} else if (showName === "Hakkenden: Eight Dogs of the East") {
		if (episode > 13) {
			slug = "hakkenden-touhou-hakken-ibun-2nd-season";
			showName = "Hakkenden: Touhou Hakken Ibun 2";
			episode -= 13;
		} else {
			slug = "hakkenden-touhou-hakken-ibun";
		}
	} else if (showName === "The Melancholy of Haruhi Suzumiya (2006)") {
		slug = "the-melancholy-of-haruhi-suzumiya";
	} else if (showName === "Natsume Yujin-cho") {
		slug = "natsume-yuujinchou";
	} else if (showName === "Natsume Yujin-cho Shi") {
		slug = "natsume-yuujinchou-shi"
	} else if (showName === "Free! - Iwatobi Swim Club") {
		slug = "free";
	} else if (showName === "Hunter x Hunter") {
		slug = "hunter-x-hunter-2011"
	} else if (showName === "Genshiken Second Season") {
		slug = "genshiken-nidaime";
	} else if (showName === "Senyu (Part 2)") {
		slug = "senyuu-2";
		episode -= 13;
	} else if (showName === "Fate Zero") {
		if (episode > 13) {
			slug = "fate-zero-2nd-season";
			showName = "Fate/Zero 2nd Season";
			episode -= 13;
		} else {
			slug = "fate-zero";
		}
	} else if (showName === "Naruto Shippuden") {
		slug = "naruto-shippuden";
	} else {
		var search = $.ajax({
			type: "GET", url: "https://hummingbirdv1.p.mashape.com/search/anime?query=" + showName,
			beforeSend: function (req) {
				req.setRequestHeader("X-Mashape-Authorization", "a6o0fOhl0OJXtLQ5cdQspnhMgMXGGGiI");
			}, async: false
		}).responseText;
		search = JSON.parse(search);
		var slug = search[0].slug;
	}
	ep = episode;
	console.log(slug);
	var library = getLibrary(token, "currently-watching", 0).responseText;
	library = JSON.parse(library);
	var found = false;
	for (var key in library) {
		if (!library.hasOwnProperty(key)) continue;
		library_entry = library[key];
		if (library_entry.anime.slug !== slug) continue;
		console.log("You are currently watching ep " + episode + " there are " + library_entry.episodes_watched + " eps you have watched.")
		console.log(library_entry);
		isOnLastEpisode = library_entry.anime.episode_count == episode;
		found = true;
		break;
	}
	if (found) {
		if(episode > library_entry.episodes_watched) {
			$("#htmlify_me").html("<br/>You are watching episode " + episode + " of <strong><a target=\"_blank\" href=\"http://hummingbird.me/anime/" + slug + "\">" + showName + "</a></strong>.<br><time id=\"countdown\">Updating in 10:00</time><a id=\"update_now\" href=\"javascript:void(0)\"><strong> - Update Now</strong></a>");
			setTimeout(function() {
				$("#update_now").click(function() {
					update();
				});
			}, 1500);
			setTimeout(update, 600000);
			setTimeout(countDown, 1000);
		} else {
			$("#htmlify_me").html("<br/>You have already seen episode " + episode + " of <strong><a target=\"_blank\" href=\"http://hummingbird.me/anime/" + slug + "\">" + showName + "</a></strong>.");
		}
	} else {
		$("#htmlify_me").html("<br>You are not watching or have already completed " + showName + "! This scrobbler only works if you have added this show to your currently watching list.<br><strong>Wait!</strong> But I am! <strong><a target=\"_blank\" style=\"color:#fc6419;\" href=\"http://forums.hummingbird.me/t/chrome-extension-automatic-hummingbird-updater-for-crunchyroll/295/\">Report a bug here</a></strong>.");
	}
}

var updated = false;

function update() {
	if (updated) {
		return;
	}
	$("#update_now").hide();
	var updateData = { "anime_id" : library_entry.anime.slug, "auth_token" : access };
	var previous = ep - 1;
	if (previous == library_entry.episodes_watched) {
		updateData["increment_episodes"] = "true";
	} else {
		updateData["episodes_watched"] = ep;
	}
	var resp = $.ajax({
		type:"POST", beforeSend: function (request) {
			request.setRequestHeader("X-Mashape-Authorization", "a6o0fOhl0OJXtLQ5cdQspnhMgMXGGGiI");
		}, url: "https://hummingbirdv1.p.mashape.com/libraries/" + library_entry.anime.slug,
		data: updateData, dataType: "text", async: false
	}).responseText;
	updated = true;
	if (!isOnLastEpisode) {
		$("#countdown").text("Updated!");
	} else {
		var url = "assets/images/empty.png",
		half = "assets/images/half.png",
		full = "assets/images/full.png";
		$("#htmlify_me").html("<br><br>It appears you've finished watching this series! <strong>Do you want to rate it?</strong><br>" +
			"<img number=\"1\" class=\"star\" src=\"" + url + "\"><img number=\"2\" class=\"star\" src=\"" + url + "\"><img number=\"3\" class=\"star\" src=\"" + url + "\"><img number=\"4\" class=\"star\" src=\"" + url + "\"><img number=\"5\" class=\"star\" src=\"" + url + "\">" +
			"<strong id=\"rated_response\" style=\"display:none\"><br>Saving...</strong>");
		$(".star").hover(function(e) {
			var number = $(this).attr("number");
			$("img[number]").each(function() {
				var current = $(this).attr("number");
				if (current > number) {
					$(this).attr("src", url);
					return;
				}
				$(this).attr("src", full);
			});
			$(this).attr("src", e.offsetX >= 24 ? full : half);
		}, function() {
			$("img[number]").each(function() {	
				if (!shouldReset) {
					var currentNumber = $(this).attr("number");
					var leftover = cachedStars % 1;
					if (currentNumber <= cachedStars) {
						$(this).attr("src", full);
						return;		
					} else if (leftover == 0.5 && currentNumber - 0.5 == cachedStars) {
						$(this).attr("src", half);
						return;
					}
				}
				$(this).attr("src", url);
			});
		});
		$(".star").mousemove(function(e) {
			var condition = e.offsetX > 24;
			$(this).attr("src", condition ? full : half);
			currentStars = $(this).attr("number") - (condition ? 0 : 0.5);
		});
		$(".star").click(function(e) {
			$("#rated_response").hide(300);
			shouldReset = false;
			cachedStars = currentStars;
			var localSubmission = cachedStars;
			var response = $.ajax({
				type: "POST", url: "https://hummingbirdv1.p.mashape.com/libraries/" + library_entry.anime.slug,
				data: {"rating":cachedStars,"auth_token":access},
				beforeSend: function (req) {
					req.setRequestHeader("X-Mashape-Authorization", "a6o0fOhl0OJXtLQ5cdQspnhMgMXGGGiI");
				}, dataType: "text"
			}).done(function(response) {
				$("#rated_response").html("<br>Rated " + localSubmission + "!");
				$("#rated_response").fadeIn(300);
			});
		});
	}
	console.log(JSON.parse(resp));
}

var time = 600;

function countDown() {
	if (updated) {
		return;
	}
	time -= 1;
	$("#countdown").text("Updater will automatically update your library in " + toTime(time));
	if (time != 0) {
		setTimeout(countDown, 1000);
	} else {
		$("#countdown").text("Updating now...");
	}
}

function getLibrary(token, status, page) {
	return $.ajax({
		type:"GET", beforeSend: function (request) {
			request.setRequestHeader("X-Mashape-Authorization", "a6o0fOhl0OJXtLQ5cdQspnhMgMXGGGiI");
		}, url: "https://hummingbirdv1.p.mashape.com/users/me/library?id=me&status="
				+ status + "&page=" + page + "&auth_token=" + token, async: false
	});
}
