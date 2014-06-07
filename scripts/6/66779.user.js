// ==UserScript==
// @name           TwitterShowFriendships
// @namespace      http://kataho.net/
// @description    Shows if one user follows or is followed by another user.
// @include        http://twitter.com/following
// @include        http://twitter.com/*/following
// @include        http://twitter.com/followers
// @include        http://twitter.com/*/followers
// ==/UserScript==

(function (){
	function doRequest(source, target, callback) {
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (xmlhttp.readyState == 4) {
				if (xmlhttp.status == 200) {
					var json = xmlhttp.responseText;
					var obj = eval('(' + json + ')');
					var following = obj["relationship"]["source"]["following"];
					var followed_by = obj["relationship"]["source"]["followed_by"];
					callback({following: following, followed_by: followed_by});
				} else {
					callback(null);
				}
			}
		};
		xmlhttp.open('GET', '/friendships/show.json?source_screen_name=' + source + '&target_screen_name=' + target, true);
		xmlhttp.send(null);
	}

	function getSourceScreenName() {
		var metas = document.getElementsByTagName('meta');
		for (var i = 0; i < metas.length; ++i) {
			if (metas[i].name == 'page-user-screen_name') {
				return metas[i].content;
			}
		}
		return null;
	}

	function getTargetScreenName() {
		return prompt('Input user name', '');
	}

	function showFriendships() {
		var source = getSourceScreenName();
		var target = getTargetScreenName();
		if (source && target) {
			doRequest(
				source,
				target,
				function(result) {
					if (result) {
						var s = '';
						s = s + source + (result. following ? ' follows ' : ' does not follow ') + target + '\n';
						s = s + source + (result. followed_by ? ' is followed by ' : ' is not followed by ') + target + '\n';
						alert(s);
					} else {
						alert('The server returned an error');
					}
				}
			);
		}
	}

	function onClick(event) {
		showFriendships();
	}

	var h2 = document.getElementsByClassName('heading')[0];
	var btn = document.createElement('button');
	btn.className = 'btn';
	btn.addEventListener('click', onClick, false);
	btn.appendChild(document.createTextNode('find'));
	h2.appendChild(btn);
})();
