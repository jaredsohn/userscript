// ==UserScript==
// @name           facebook.com - replace smileys
// @version        1.8.5
// @description    Replace text smileys as graphics (graphics by facebook.com)
// @homepage       http://Kub4jz.cz
// @namespace      http://userscripts.org/scripts/source/49338.user.js
// @require        http://buzzy.hostoi.com/AutoUpdater.js

// @include        http://www.facebook.com/*
// @exclude        http://apps.facebook.com/*
// ==/UserScript==

var script_id = 49338;
var script_version = '1.8.5';

// # smileys
smiley = new Array(); var t;

smiley[';-)']  = '-80px';   smiley[';)'] = '-80px';
smiley[':-P']  = '-32px';   smiley[':P'] = '-32px';

smiley['8-)']  = '-96px';
smiley['8-|']  = '-112px';
smiley['>:-('] = '-128px';  smiley['>:('] = '-128px';
smiley[':-/']  = '-144px';  smiley[' :/'] = '-144px';
smiley[':\'('] = '-160px';  smiley[':´('] = '-160px';
smiley['3:-)'] = '-176px';  smiley['3:)'] = '-176px';
smiley['O:-)'] = '-192px';  smiley['O:)'] = '-192px';
smiley[':-*']  = '-208px';
smiley['<3']   = '-224px';  smiley['♥'] = '-224px'; smiley['*IN LOVE*'] = '-224px';
smiley['^_^']  = '-240px';
smiley['-_-']  = '-256px';
smiley['o.O']  = '-272px';
smiley['>:-O'] = '-288px';  smiley['>:o'] = '-288px';
smiley[':v']   = '-304px';
smiley[' :3']  = '-320px';

smiley[':-)']  = '0px';     smiley[':)'] = '0px';
smiley[':-(']  = '-16px';   smiley[':('] = '-16px';
smiley[':-D']  = '-48px';   smiley[':D'] = '-48px'; smiley['xD'] = '-48px';
smiley[':-O']  = '-64px';

smiley[':putnam:'] = 'putnam';
smiley['<(")']     = 'penguin';
smiley['(^^^)']    = 'shark';
smiley[':|]']      = 'robot';

// # replaced elements class name
var gm_class = ' gm_smileys_replaced';

// < start functions >
function applyTimeout() {
    clearTimeout( t );
    t = setTimeout(smileys, 1500);
}

function replace(elements) {

	count = elements.length - 1;

	if (count < 0) { return; }

	for(i = 0; i <= count; i++) {
		var el = elements.item(i);

		// is replaced?
		if (el.className.indexOf(gm_class) >= 0 || el.className.indexOf('GenericStory_Report') >= 0) {
			continue;
		} else {
			el.className += gm_class;
		}

		var data = el.textContent;

		for (smile in smiley) {
		    if (data == null) { data = el.textContent; }
		  
	 		if (data && data.indexOf(smile) >= 0) {

        		alt = smile.replace(')', '&shy;)');
                alt = smile.replace('"', '&quot;');
                alt = smile.replace(':', '&#58;&shy;');

                //alt = '';

                smile_orig = smile;
    			smile = smile.replace('>', '&gt;');
    			smile = smile.replace('<', '&lt;');

                // smiles as penguin, shark, robot...
                if (!new RegExp('[0-9]').test(smiley[smile])) {
                    el.innerHTML = el.innerHTML.replace(smile, ' <img class="emote_img" src="http://static.ak.fbcdn.net/images/emote/'+smiley[smile_orig]+'.gif" title="'+alt+'" alt="'+alt+'">', 'gmi');
				    data = null; // data reset
                    continue;
                }

				var replace = ' <img class="emote_img" src="http://static.ak.fbcdn.net/images/blank.gif" style="position: relative; top: -1px; background: transparent url(http://static.ak.fbcdn.net/images/emote/emote.gif?8:93872) no-repeat scroll ' + smiley[smile] + ' top; -moz-background-clip: -moz-initial; -moz-background-origin: -moz-initial; -moz-background-inline-policy: -moz-initial;" title="'+alt+'" alt="'+alt+'">';

				// special smileys
				if (smile == ':-)' || smile == ':)') {smile = new RegExp('(:-?[\)]+)', 'gmi'); }
				if (smile == ':-(' || smile == ':(') { smile = new RegExp('(:-?[\(]+)', 'gmi'); }
				if (smile == ':-D' || smile == ':D' || smile == 'xD') { smile = new RegExp('([:|x]-?D+)', 'gmi'); }
				
				el.innerHTML = el.innerHTML.replace(smile, replace, 'gmi');
				data = null; // data reset
			}
		}
	}
	return false;
}

var htmlLength_before = 0;

function smileys() {

    if (c = document.getElementById('contentArea')) {
        htmlLength = document.getElementById('contentArea').innerHTML.length;

        if (htmlLength == htmlLength_before) {
            applyTimeout();
            return false;
        }

        htmlLength_before = htmlLength;
    }

	// get location
	var loc = location.hash;
	if (loc.length == 0) {
        loc = location.pathname.replace(new RegExp('^[/]+', 'g'), '');

        if (loc.length == 0) loc = location.search;
	}

    if (loc == '') { loc = 'home.php'; }


    var home = 'home.php|sk=nf|ref=';
	// home statuses
	if (new RegExp(home, 'i').test(loc)) {
		var headers = document.getElementsByClassName('GenericStory_Message');
		replace(headers);
	}

	// comments
	if (new RegExp(home + '|v=feed&story_fbid|profile.php|photo.php|video.php|group.php|pages/|note.php|posted.php', 'i').test(loc)) {
		var comments = document.getElementsByClassName("comment_actual_text");
		replace(comments);
	}

    // profile, groups wall, pages wall
	if (new RegExp('story_fbid=|profile.php|group.php|pages/', 'i').test(loc)) {
		var wall = document.getElementsByClassName("UIStory_Message");
		replace(wall);
	}

    // photo
	if (new RegExp('photo.php', 'i').test(loc)) {
		var photo_cap = document.getElementsByClassName("photocaption_text");
		replace(photo_cap);
	}

	// events
	if (new RegExp('event.php', 'i').test(loc)) {
		var wall = document.getElementsByClassName("walltext");
		replace(wall);
	}

	// messages
	if (new RegExp('sk=messages&tid=|/inbox/', 'i').test(loc)) {
		var msgs = document.getElementsByClassName("GBThreadMessageRow_Body_Content");
		replace(msgs);
	}

	// topic messages
	if (new RegExp('topic.php', 'i').test(loc)) {
		var posts = document.getElementsByClassName("post_message");
		replace(posts);
	}

    applyTimeout();
}

function starter() {

    smileys();

    if (document.getElementById('contentArea'))
    document.getElementById('contentArea').addEventListener("DOMNodeInserted", function () { clearTimeout( t ); t = setTimeout( smileys, 100 ) }, false);

    window.removeEventListener("load", starter, false);

    autoUpdate (script_id, script_version);
}

window.addEventListener("load", starter, false);