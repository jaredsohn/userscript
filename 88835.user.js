// ==UserScript==
// @name           Quick Quote (with BBcode) BETA!
// @namespace      http://userscript.org
// @description    Quick Quote (with BBcode)
// @include        http*://*what.cd/inbox.php?action=viewconv&id=*
// @include        http*://*what.cd/forums.php?*action=viewthread&threadid=*
// ==/UserScript==

var ssl = window.location.href.split("what.cd")[0];

function load_page_then(uri, then) {
	GM_xmlhttpRequest({
		method: "GET",
		url: uri,
		onload: then
	});
}

function removeQuote() {
	var links = document.getElementsByTagName("a");
	for (var e = 0; e < links.length; e++) {
		if (links[e].innerHTML == "[Quote]") {
			//var userN = links[e].parentNode.getElementsByTagName("a")[1].innerHTML;
			//var yourUserName = document.getElementsByClassName("username")[0].innerHTML;
			//if (userN == yourUserName) {
				//fix double "-" in post header
			//}
			links[e].parentNode.removeChild(links[e]);
		}
	}
}

function quickPost() {
	document.location.href = "#quickpost";
}

function copySel() {
	var quoteID = this.getAttribute('quoteID');
	var userName = this.getAttribute('userName');
	var selText = window.getSelection().toString();

	if (selText != '' && selText != null) {
		if (document.URL.match(/viewconv/)) {
			var inputBox = document.forms.namedItem("messageform").elements.namedItem("quickpost");
			var bad = new Array(
					'index.php',
					'forums.php',
					'requests.php',
					'collages.php',
					'torrents.php',
					'top10.php',
					'rules.php',
					'wiki.php',
					'user.php',
					'inbox.php',
					'comments.php',
					'userhistory.php',
					'bookmarks.php',
					'donate.php',
					'upload.php'
			);

			for (var e in bad) {
				selText = selText.replace(RegExp([bad[e]].join("|"), "gi"),ssl+"what.cd/"+bad[e]);
			}
			inputBox.value += "[quote=" + userName + "]" + selText + "[/quote]";
		}
		else {
			var inputBox = document.getElementById("quickpost");
			load_page_then(ssl+"what.cd/forums.php?action=get_post&post=" + quoteID, function(response) {
				var originalBBCode = response.responseText;

				/* TODO */
				/**
				  * What works:
				  * Single-line quotes with bbcode, even when bbcode starts/ends at the beginning/end of the row.
				  * Multiline quotes.
				  * Quoting quote boxes ("UserX wrote:" is fetched properly from document.getSelection(); )
				  * Quoting smileys and links
				  *
				  * What doesn't work:
				  * Quoting smileys on their own doesn't work (but who would want that?)
				  * You can copy [/quote] without the start tag [quote]
				  * Quoting multi-lined [*] lists
				  */

				// For some reason, firefox converts bullet points to # in document.getSelection();
				var spaces = [''].concat(selText.trim().replace(/[\S ]* wrote:/g, "").replace(/\s+/g, "").replace(/^#/gm, "").split("")).concat('');
				for (var i = 0; i < spaces.length; ++i) {
					spaces[i] = spaces[i].replace(/[-[\]{}()*+?.\\\/^$|#]/g, "\\$&"); // Escape regexp characters
				}
				var emoticonNames = '(lol|omg|frown|angry|paddle|ohnoes|worried|wink|creepy|';
				emoticonNames += 'cool|wtf|unsure|no|nod|wave|sick|blush|wub|shifty|ninja|sorry|thanks|loveflac|(what|whatman|nightoath|fzerox|a9|padutch|mn)love)';

				var spacer = '(\\s+|\\[.*?\\]|https?:\\/\\/(ssl\.)?what\.cd\\/?|:' + emoticonNames + ':|:\\)|:\\(|:o|:D|:P|:\\||>\\.>|<3)*';
				var reString = spaces.join(spacer) + spacer;
				// ignore the following between letters: any whitespace, then any number of any of these:
				//   any sequence [ ... ] (non-greedy matching)
				//   any beginning of a What.CD URL
				//   any emoticon
				// then any whitespace.
				// For example: if the letters are s, n, a, p and the BBCode is sn [b]a[/b] p, this will match the entire BBCode.
			
				// GM_log(spaces.join('_'));

				var re = new RegExp(reString);
				var match = re.exec(originalBBCode);
				if (match) {
					var repl = match[0];
					inputBox.value += "[quote=" + userName + "]" + repl + "[/quote]";
					// inputBox.value += "[quote=" + userName + "]" + selText +
					//"[/quote][quote=OriginalBBCode]" + originalBBCode + "[/quote][quote=MatchedBBCode]" + repl + "[/quote]";

				} else {
					// something went wrong, take everything
					inputBox.value += "[quote=" + userName + "]" + originalBBCode + "[/quote]";
				}
				quickPost(); // go to #quickpost
			});
		}
	}
	else {
		// nothing selected, take everything
		quickPost() // go to #quickpost
		unsafeWindow.Quote(quoteID,userName);
	}

}

var aLinks = document.getElementById('content').getElementsByTagName('a');

if (aLinks[1] != ssl+"what.cd/forums.php?action=viewforum&forumid=12" && aLinks[1] != ssl+"what.cd/forums.php?action=viewforum&forumid=32") {
// trash forum & resolved forum

	if (document.URL.match(/viewconv/)) {
		var posts = document.getElementsByClassName('box');
		for (var i = 0; i < posts.length-3; i++) {
			o = posts[i].getElementsByTagName('div')[1].id.split("message")[1];
			p = posts[i].getElementsByTagName('div')[0];
			e = document.createElement('a');
			e.innerHTML = "[Quick Quote]";
			e.href = "#s";
			var user = p.getElementsByTagName('a')[0].innerHTML;
			e.setAttribute('quoteID', o);
			e.setAttribute('userName', user);
			e.addEventListener("click", copySel, true);
			p.appendChild(e);
		}
		removeQuote();
	}
	else {
		posts = document.getElementsByClassName('forum_post');
		for (var i = 0; i < posts.length; i++) {
			p = posts[i].getElementsByTagName('span')[0];
			e = document.createElement('a');
			e.innerHTML = "[Quick Quote]";
			e.href = "#s";
			e.className = "newQuote";
			var quoteID = p.getElementsByTagName('a')[0].innerHTML.split("#")[1];
			var user = p.getElementsByTagName('a')[1].innerHTML;
			e.setAttribute('quoteID', quoteID);
			e.setAttribute('userName', user);
			e.addEventListener("click", copySel, true);
			p.appendChild(e);
		}
		removeQuote();
	}
}
// amareus, patapper, darkip, filefly, tobbez and captZEEbo
// feel free to fix bugs and add your own name