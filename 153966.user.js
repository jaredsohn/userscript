// ==UserScript==
// @name			4chan Galaxy
// @version			1.45
// @namespace		http://passionateprogramm.in
// @description		Adds things required by "4chan Galaxy" theme.
// @include			https://boards.4chan.org/*
// ==/UserScript==

/* http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome -- Thanks internet! */
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
	script.addEventListener('load', function() {
		var script = document.createElement("script");
		script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function main() {
	/* Add nav */
	var fourChanGalaxyNav = document.createElement("div"); 
	fourChanGalaxyNav.id = "fourchangalaxynav"; 
	fourChanGalaxyNav.className = "fourchangalaxynav"; 
	document.body.appendChild(fourChanGalaxyNav);

	/* Prepend [Settings] to .navLinks.navLinksBot */
	jQ(".navLinks.navLinksBot").prepend('[<a href="#" onclick="SettingsMenu.toggle();" id="galaxysettings">Settings</a>] ');

	/* Populate nav */
	var boards = new Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'gif', 'h', 'hr', 'k', 'm', 'o', 'p', 'r', 's', 't', 'u', 'v', 'vg', 'w', 'wg', 'i', 'ic', 'r9k', 'cm', 'hm', 'y', '3', 'adv', 'an', 'cgl', 'ck', 'co', 'diy', 'fa', 'fit', 'hc', 'int', 'jp', 'lit', 'mlp', 'mu', 'n', 'po', 'pol', 'sci', 'soc', 'sp', 'tg', 'toy', 'trv', 'tv', 'vp', 'wsg', 'x', 'rs', 'status', 'twitter');
	var i = 0;
	var options = "";
	var prefix = 'https://boards.4chan.org/';
	var url = '';
	for(i = 0; i < boards.length; i++) {
		if(boards[i] == 'rs') {
			prefix = 'https://rs.4chan.org/';
			url = 'https://rs.4chan.org/';
		} else if(boards[i] == 'status') {
			prefix = 'https://status.4chan.org/';
			url = 'https://status.4chan.org/';
		} else if(boards[i] == 'twitter') {
			prefix = 'https://twitter.com/4chan';
			url = 'https://twitter.com/4chan';
		} else {
			prefix = 'https://boards.4chan.org/';
		}
		if(url == '')
			url = prefix + boards[i];
		options += '<option value="'+url+'">/'+boards[i]+'/</option>';
		url = '';
	}
	jQ(".fourchangalaxynav").html('Nav: <select name="boardNav" class="boardNav" onchange="window.location=\'\'+this.value+\'\'">'+options+'</select>');

	/* Delete potential shit-threads */
	jQ('.thread').each(function(i, obj) {
		var threadID = obj.id;
		if(jQ('#' + threadID + ' .post.op .file .fileInfo .fileText').html().match(/(fluttershy|rainbow-?dash|9gag|mlp|pony|ponies|poneh|celestia)/)) {
			jQ('#' + threadID).remove();
		}
	});

	/* Resource intensive -- Is there a way we could hook into the native extension, and only delete when needed?  -- 4chan has default functionality in native extension but not within threads -- LOL MOM DO NOT WANT */
	setInterval(function() {
		jQ('.post-hidden').each(function(i, obj) {
			jQ(obj).remove();
		});
		jQ('.sideArrows').each(function(i, obj) {
			if(jQ(obj).text() == '>>') {
				jQ(obj).remove();
			}
		});
		jQ('.fileInfo .fileText').each(function(i, obj) {
			if(jQ(obj).text().match(/\.gif/)) {
				jQ(obj).addClass('fourChanGalaxyImageHighlight');
			}
		});
	}, 500);
}

addJQuery(main);