// ==UserScript==
// @name           Switch Profile
// @author         g4plek
// @description    Switches from MW profiles (unframed) to Facebook profiles, works from FB to MW aswell.
// ==/UserScript==

javascript: (function () {
	if (document.getElementsByClassName('canvas_iframe_util')[0]) {
		if (confirm('Switch RPS.\nButuh Unframe MW dulu.\nAnda mungkin perlu untuk menavigasi kembali ke profil.\n\nTekan OK untuk Unframe.')) {
			window.location.href = document.getElementsByClassName('canvas_iframe_util')[0].src;
		}
	}
	else {
		function get_id_from_game() {
			// Mafia Wars
			try {
			//var content = document.getElementById('app10979261223_content_row');
			//var content = document.getElementById('content_row');
			//var as = content.getElementsByTagName('a');
			//for (i = 0; i < as.length; i++) {
			//if (as[i].innerHTML == 'Profile') {
			//match = /[;&]user=(\d+)/.exec(as[i].href);
			//if (match)
			//return match[1];
			//}
			//Code from Pete Dillman
			if (m = /xw_controller=robbing.*?target=([0-9]+)/.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			if (m = /xw_controller=stats.*?user=([0-9]+)/.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			if (m = /xw_action=gift_wishlist.*?user=([0-9]+)/.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			if (m = /q([0-9]+)_(\d+)\.jpg/.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			if (document.getElementsByClassName('fightres_image').length > 1) {
				var fight_image = /(\d+)_(\d+)_q.jpg/.exec(document.getElementsByClassName('fightres_image')[1].innerHTML)
				return fight_image[1];
			}
			// Sometimes the friend_id of the new vegasslots is in the fb id format:
			if (m = /xw_controller=VegasSlots.+?friend_id=([0-9]+)/i.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			if (m = /([0-9]+)_(\d+)\_q.jpg/.exec(document.getElementById('inner_page').innerHTML)) {
				return m[1];
			}
			//More code from Pete Dillman
			if ((m=/user%2522.*?%2522([0-9A-Za-z%]+)%2522/.exec(document.getElementById('mainDiv').innerHTML)) || (m=/user%22.*?%22([0-9A-Za-z%]+)%22/.exec(document.getElementById('mainDiv').innerHTML))) {
				return atob(m[1].replace(/%253D/g,'=').replace(/%3D/g,'='));
			}
			//}
			}
			catch (err) { }
			return null;
		} /* Get ID from a Facebook profile */

		function get_id_from_fb() {
			function f(expr) {
				try {
					return /id=([0-9]+)/.exec(eval(expr))[1];
				}
				catch (e) {
					return null;
				}
			}
			function reportid(expr) {
				try {
					return /cid=([0-9]+)/.exec(eval(expr))[1];
				}
				catch (e) {
					return null;
				}
			}
			function newfb(expr) {
				try {
					return /(\d+)_(\d+)_(\d+)\_n.jpg/.exec(eval(expr))[2];
				}
				catch (e) {
					return null;
				}
			}
			return f("document.getElementById('profileimage').parentNode.innerHTML") || f("document.getElementById('profile_action_send_message').parentNode.innerHTML") || reportid("document.getElementsByClassName('actions secondary_actions')[0].innerHTML") || newfb("document.getElementById('profile_pic').src") || null;

		}

		var id;
		if (id = get_id_from_game()) {
			location.href = 'http://www.facebook.com/profile.php?id=' + (id);
			//window.open('http://www.facebook.com/profile.php?id=' + id);
		} else if (id = get_id_from_fb()) {
			//window.open('http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22$ID%22%7D'.replace('$ID',id));
			location.href = 'http://apps.facebook.com/inthemafia/track.php?next_controller=stats&next_action=view&next_params=%7B%22user%22%3A%22$ID%22%7D'.replace('$ID', id);
		} else {
			alert('Could not find an id!\nFor non-friends you can try attacking once and using Switch on the fight result screen.\nFor friends it should work on MW profile pages.');
		}
	}

})()