// ==UserScript==
// @name        gw mod helper
// @namespace   gwmodhelper
// @description gw mod helper

// @include     http://reddit.com/r/gonewild/*
// @include     http://www.reddit.com/r/gonewild/*
// @include     https://pay.reddit.com/r/gonewild/*

// @include     http://reddit.com/r/treesgonewild/*
// @include     http://www.reddit.com/r/treesgonewild/*
// @include     https://pay.reddit.com/r/treesgonewild/*

// @include     http://reddit.com/r/gwcouples/*
// @include     http://www.reddit.com/r/gwcouples/*
// @include     https://pay.reddit.com/r/gwcouples/*

// @include     http://www.reddit.com/message/moderator/*
// @include     https://pay.reddit.com/message/moderator/*

// @include     http://www.reddit.com/message/messages/*
// @include     https://pay.reddit.com/message/messages/*

// @version     0.0.27
// ==/UserScript==

function main() {
	var poster = $('.sitetable .tagline .author')[0].innerHTML;
	var poster_links = $('.sitetable .entry ul');
	var post_links = $('.sitetable .author');
	var mod_mails = $('.message-parent');
	var perma_links = $('.comment .noncollapsed .first a');
	var raw_comment_links = $('.comment .noncollapsed ul');
	var us = $('.user a')[0].innerHTML;

	var comment_links = [];
	for(var k = 0; k < raw_comment_links.length; k++) {
		// if it has a 'reply' link then it is a valid/undeleted comment
		if (raw_comment_links[k].innerHTML.indexOf('return reply') != -1 ) {
			comment_links.push(raw_comment_links[k]);
		}
	}

	/*	
	for(var k = 0; k < mod_mails.length; k++ ) {
		if (mod_mails[k].innerHTML.indexOf('http://www.reddit.com/user/Emotional_Tampon') != -1 ) {
			mod_mails[k].innerHTML = "";
		}
		if (mod_mails[k].innerHTML.indexOf('http://www.reddit.com/user/Ogahz') != -1 ) {
			mod_mails[k].innerHTML = "";
		}
	} */

	var titles = $('.title a');
	var title = titles[0].innerHTML.toLowerCase();
	title = title.replace(/[^a-zA-Z 0-9]+/g,'');
	console.log(title);
	var verification_post = (title.indexOf("verif") != -1);

	append_links(poster_links[0], window.location.href, poster, us, verification_post);

	function append_links(where, link, who, us, verify) {
		var s = "<li>" + who + ":</li>" +
				"<li><a href='javascript:nuke_thread(\"" + link + "\", \"" + us + "\");'>NUKE</a></li>" +
				"<li><a href='javascript:sandbox(\"" + who + "\", \"" + us + "\", \"" + link + "\");'>SANDBOX</a></li>" +
				"<li><a href='javascript:ban(\"" + who + "\", \"" + us + "\", \"" + link  + "\");'>BAN</a></li>";
		if (verify) {
			s += "<li><a href='javascript:verify(\"" + who + "\", \"" + us + "\", \"" + link  + "\");'>VERIFY</a></li>" + 
				 "<li><a href='http://www.reddit.com/r/gonewild/about/flair?name=" + who + "' target='_blank'>VERIFY_MANUALLY</a></li>"
		} else {
			s += "<li><a href='javascript:ask2verify(\"" + who + "\", \"" + us + "\", \"" + link  + "\");'>ask-to-verify</a></li>";
		}
		where.innerHTML += s;
	}

	for(i = 0, j = 0; i < comment_links.length; i++, j += 2) {
		append_links(comment_links[i], perma_links[i].href, post_links[j+1].innerHTML, us, false);
	}

	var functions_src =
	'function nuke_thread(url,from) {' +
		'if (confirm("nuke thread [" + url + "] ?")) {'+
			'var div = document.createElement("div");'+
			'div.innerHTML = "<iframe src=\'http://www.vidble.com/modreddit.aspx?from=" + from + "&action=nuke&what=" +url+"\' />";'+
			'document.body.insertBefore(div, document.body.firstChild);'+
		'}'+
	'}'+
	'function sandbox(who,from,link) {'+
		'if (confirm("sandbox [" + who + "] ?\\n\\n(If yes, then also remove any reported comments on their first comment page that have been reported but not yet removed (bender-issue))")) {'+
			'var div = document.createElement("div");'+
			'div.innerHTML = "<iframe src=\'http://www.vidble.com/modreddit.aspx?from=" + from + "&action=sandbox&what=" + who + "&reddit=" + link + "\' />";'+
			'document.body.insertBefore(div, document.body.firstChild);'+
		'}'+
	'}' +
	'function ban(who,from,link) {'+
		'if (confirm("ban [" + who + "] ?")) {'+
			'var div = document.createElement("div");'+
			'div.innerHTML = "<iframe src=\'http://www.vidble.com/modreddit.aspx?from=" + from + "&action=ban&what=" +who + "&reddit=" + link + "\' />";'+
			'document.body.insertBefore(div, document.body.firstChild);'+
		'}'+
	'}' +
	'function verify(who,from,link) {'+
		'if (confirm("verify [" + who + "] ?")) {'+
			'var div = document.createElement("div");'+
			'div.innerHTML = "<iframe src=\'http://www.vidble.com/modreddit.aspx?from=" + from + "&action=verify&what=" +who + "&reddit=" + link + "\' />";'+
			'document.body.insertBefore(div, document.body.firstChild);'+
		'}'+
	'}' +
	'function ask2verify(who,from,link) {'+
			'$(\'textarea\')[2].value = \'Hi - mod here - this was auto spam filtered because it was posted before and you do not have the ~verified~ flair.  Please do a verification post before posting more to help confirm that this is you.\\n\\nDirections: http://redd.it/jji56   \\n\\nNudetorial: http://redd.it/1r93ig \';' +
			'if (confirm("flair them as askedtoverify [" + who + "] ?")) {'+
			'var div = document.createElement("div");'+
			'div.innerHTML = "<iframe src=\'http://www.vidble.com/modreddit.aspx?from=" + from + "&action=asked2verify&what=" +who + "&reddit=" + link + "\' />";'+
			'document.body.insertBefore(div, document.body.firstChild);'+
		'}'+
	'}';

	var script = document.createElement("script");
	script.textContent = functions_src;
	document.body.appendChild(script);
}

//alert('hello!');
var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild( script );
