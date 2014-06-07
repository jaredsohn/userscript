// ==UserScript==
// @name          New Twitch.tv Faces
// @version       1.10
// @description   Adds an emoticon button to Twitch.tv chat
// @author        Isaiah Billingsley
// @match         http://twitch.tv/*
// @match         http://*.twitch.tv/*
// @match         https://twitch.tv/*
// @match         https://*.twitch.tv/*
// @updateURL     https://userscripts.org/scripts/source/160183.user.js
// ==/UserScript==

exec(function() {
	var button = null;

	function poll() {
		setTimeout(poll, 4000);

		if (!document.getElementsByClassName('chat-interface').length)
			return;

		if (!button && window.App && window.App.__container__) {
			var controller = window.App.__container__.lookup('controller:emoticons');
			if (controller && controller.emoticons && controller.emoticons.length)
				init(controller.emoticons);
		}

		if (button) {
			var parent = button.parentNode;
			while (parent && parent != document)
				parent = parent.parentNode;

			if (!parent) {
				document.getElementsByClassName('send-chat-button')[0].style.left = '120px';
				document.getElementsByClassName('chat-option-buttons')[0].appendChild(button);
			}
		}
	}
	poll();

	function init(emoticons) {
		// Create popup panel
		var popup = document.createElement('div');
		popup.className = 'chat-menu';
		popup.style.width = 'auto';
		popup.style.position = 'absolute';
		popup.style.bottom = '50px';
		popup.style.left = '10px';
		popup.style.right = '10px';
		popup.style.padding = '4px 4px 8px';
		popup.style.lineHeight = '30px';

		// Add the button
		var isopen = false;
		button = document.createElement('button');
		button.title = 'Emoticons';
		button.className = 'button normal_button';
		button.style.marginLeft = '7px';
		button.style.backgroundPosition = 'center';
		button.style.backgroundImage = 'url(http://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-ebf60cd72f7aa600-24x18.png)';
		button.onclick = function(e) {
			if (isopen)
				return;

			isopen = true;
			document.getElementsByClassName('chat-interface')[0].appendChild(popup);

			var closePopup = function(e) {
				if (e.shiftKey || e.ctrlKey || e.altKey)
					return;

				isopen = false;
				document.removeEventListener('click', closePopup);
				popup.parentNode.removeChild(popup);
			};
			document.addEventListener('click', closePopup);
			e.stopPropagation();
			e.preventDefault();
			return false;
		};

		var lastEmote = 'Kappa';

		button.oncontextmenu = function(e) {
			insertEmoteText(lastEmote, e);
		};

		// Creates a clickable emote element
		function createEmote(icon) {
			var emoticon = document.createElement('a');
			emoticon.tabIndex = 0;
			emoticon.setAttribute('original-title', icon.text);
			emoticon.className = 'tooltip';
			emoticon.style.cursor = 'pointer';
			emoticon.style.display = 'inline-block';
			emoticon.style.textAlign = 'center';
			emoticon.style.minWidth = '38px';

			var img = document.createElement('img');
			img.src = icon.images[0].url;
			img.alt = icon.text;
			img.style.verticalAlign = 'middle';
			img.style.width = icon.images[0].width + 'px';
			img.style.height = icon.images[0].height + 'px';
			emoticon.appendChild(img);

			(function(text) {
				emoticon.onclick = function(e) {
					insertEmoteText(text, e);
				};
				emoticon.onkeypress = function(e) {
					if (e.keyCode == 13)
						insertEmoteText(text, e);
				};
			})(icon.text);

			return emoticon;
		}

		// Insert or replace selection with emoticon text
		function insertEmoteText(text, e) {
			var input = document.getElementsByClassName('chat-interface')[0].getElementsByTagName('textarea')[0];
			var startpos = input.selectionStart;
			input.focus();
			input.value = input.value.substr(0, startpos) + text + ' ' + input.value.substr(input.selectionEnd, input.value.length);
			input.setSelectionRange(startpos + text.length + 1, startpos+ text.length + 1);
			var tips = document.getElementsByClassName('tipsy');
			for (var i=0; i < tips.length; i++)
				document.body.removeChild(tips[i]);
			e.preventDefault();
			lastEmote = text;
		}

		var emotes = [];
		for (var i=0; i < emoticons.length; i++) {
			var emote = emoticons[i];

			if (!emote.images[0].emoticon_set) {
				// Reverse regex fun
				emote.text = emote.text || decodeURI(emote.regex)
					.replace('&gt\\;', '>')// right angle bracket
					.replace('&lt\\;', '<')// left angle bracket
					.replace(/\(\?![^)]*\)/g, '')// remove negative group
					.replace(/\(([^|])*\|?[^)]*\)/g, '$1')// pick first option from a group
					.replace(/\[([^\]])*\]/g, '$1')// pick first character from a character group
					.replace(/[^\\]\?/g, '')// remove optional chars
					.replace(/^\\b|\\b$/g, '')// remove boundaries
					.replace(/\\/g, '');// unescape

				emotes.push(emote);
			}
		}
		// Basic emoticons first
		emotes.sort(function(a, b) {
			var abasic = /[\W_]/.exec(a.text);
			var bbasic = /[\W_]/.exec(b.text);
			if (abasic && !bbasic) return -1;
			if (bbasic && !abasic) return 1;
			if (a.text == 'Kappa') return -1;
			if (b.text == 'Kappa') return 1;
			if (a.text == 'FrankerZ') return -1;
			if (b.text == 'FrankerZ') return 1;
			var aId = a.images[0].id;
			var bId = b.images[0].id;
			if (aId < bId) return -1;
			if (aId > bId) return 1;
			return 0;
		});
		for (i=0; i<emotes.length; i++) {
			popup.appendChild(createEmote(emotes[i]));
		}
	}
});

function exec(fn) {
	var script = document.createElement('script');
	script.textContent = '(' + fn + ')();';
	document.body.appendChild(script);
	document.body.removeChild(script);
}
