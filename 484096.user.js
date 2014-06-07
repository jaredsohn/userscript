// ==UserScript==
// @name        bangumi dollars feat blending chrome
// @namespace   com.ruocaled.bangumi
// @include     /^http://(bangumi\.tv|bgm\.tv|chii\.in)/(rakuen|(pm|blog|index|wiki|magi|user|group|anime|book|music|game|real|subject|ep|mono|person|character|timeline)(/.*)?)?(\?.*)?$/
// @version     1.2.5
// @grant       GM_addStyle
// ==/UserScript==

const MAX_ITEMS = 200;

GM_addStyle("\
#__u_dollars_sidebar { \
  position: fixed; \
  width: 350px; \
  left: 0; top: 0; bottom: 0; \
  border-right: 1px solid #dfdfdf; \
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.04); \
  margin-left: -353px; \
  transition: margin-left 0.5s; \
  background: #fcfcfc; \
} \
#__u_dollars_sidebar.show { \
  margin-left: 0px; \
} \
#__u_dollars_sidebar>.switch { \
  position: absolute; \
  width: 80px; height: 30px; \
  line-height: 30px; \
  right: -82px; top: 50px; \
  background: #fcfcfc; \
  border: 1px solid #dfdfdf; \
  border-bottom: 0 none; \
  transform: rotate(-270deg); \
  transform-origin: bottom left; \
  -webkit-transform: rotate(-270deg); \
  -webkit-transform-origin: bottom left; \
  cursor: pointer; \
  font-size: 16px; \
  color: #777; \
  text-align: center; \
  border-radius: 3px 3px 0 0;\
  box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 0.04); \
} \
#__u_dollars_sidebar>.badge { \
  position: absolute; \
  width: 20px; height: 20px; \
  top: 75px; right: -40px; \
  background: #f09199; \
  color: white; \
  font-size: 12px; \
  line-height: 20px; \
  text-align: center; \
  border-radius: 10px; \
}\
#__u_dollars_sidebar>.input { \
  width: 320px; \
  box-sizing: border-box; \
  -moz-box-sizing: border-box; \
  background: #fdfdfd; \
  font-size: 12px; \
  color: #777; \
  height: 40px; line-height: 17px; \
  padding: 2px 5px; \
  resize: none; \
  transition: none; \
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1); \
  margin: 10px; \
  border: 1px solid #999; \
  border-color: #999 #ccc #ddd #999; \
  border-radius: 5px; \
} \
#__u_dollars_sidebar>.input:disabled { \
  background: #fff url(/img/loading_s.gif) no-repeat 95% 50%; \
} \
#__u_dollars_sidebar>.history { \
  overflow: scroll; \
  height: 100%; \
  box-sizing: border-box; \
  -moz-box-sizing: border-box; \
  border-bottom: 64px solid transparent; \
  position: relative; \
  background: #fcfcfc; \
} \
#__u_dollars_sidebar>.history>li { \
  padding: 10px 10px 10px 55px; \
  border-bottom: 1px solid #ddd; \
  color: #666; \
  position: relative; \
} \
#__u_dollars_sidebar>.history>li.new { \
  border-bottom: 3px double #ddd; \
} \
#__u_dollars_sidebar>.history>li .avt { \
  width: 32px; height: 32px; \
  position: absolute; \
  top: 12px; left: 12px; \
  border-radius: 5px; \
  box-shadow: inset #BBB 0px 0 2px 0px; \
  transition: box-shadow linear 0.2s; \
} \
#__u_dollars_sidebar>.history>li .avt:hover { \
  box-shadow: #0187C5 0px 0px 2px 0px; \
} \
#__u_dollars_sidebar>.history>li>.color { \
  width: 8px; height: 8px; \
  border-radius: 4px; \
  margin-right: 5px; \
  display: inline-block; \
} \
#__u_dollars_sidebar>.history>li>.user { \
  font-weight: bold; \
  color: #0084b4; \
  cursor: pointer; \
} \
#__u_dollars_sidebar>.history>li>.user:hover { \
  text-decoration:underline; \
} \
#__u_dollars_sidebar>.history>li>.timestamp { \
  margin-left: 5px; \
  color: #999; \
  font-size: 10px; \
} \
#__u_dollars_sidebar>.history>li>.content { \
  margin-top: 3px; \
  padding-right: 15px; \
  word-wrap: break-word; \
} \
");

const PREFIX = '__u_dollars_';
const ITEM_PREFIX = PREFIX + 'chat_';
const SIDEBAR_ID = PREFIX + 'sidebar';

function $(query) {
	return document.querySelector(query);
}
function $c(tag, props) {
	var elem = document.createElement(tag);
	if (props) {
		function setProps(obj, items) {
			for (var key in items) {
				var item = items[key];
				if (typeof item == 'object') {
					setProps(obj[key], item);
				} else {
					obj[key] = item;
				}
			}
		}

		setProps(elem, props);
	}
	return elem;
}

var $sidebar = $c('div', {id: SIDEBAR_ID});

var $switch = $c('a', {
	className: 'switch',
	textContent: 'Chat',
	onclick: function () {
		$sidebar.classList.toggle('show');
		if ($sidebar.classList.contains('show')) {
			setNewMsg(0);
			var lastNew = $('#' + SIDEBAR_ID + ' li.new');
			if (lastNew)
				lastNew.classList.remove('new');
			var previousView = $('#' + ITEM_PREFIX + lastView);
			if (previousView && previousView.previousElementSibling)
				previousView.previousElementSibling.classList.add('new');
			$input.focus();
		} else {
			if ($history.firstChild)
				lastView = $history.firstChild.dataset.id;
		}
	}
});
$sidebar.appendChild($switch);

var $badge = $c('span', {
	className: 'badge'
});
$sidebar.appendChild($badge);

var newMsg;
function setNewMsg(num) {
	if ($sidebar.classList.contains('show'))
		num = 0;
	if (num > 99)
		num = 99;
	newMsg = num;
	if (newMsg) {
		$badge.textContent = newMsg;
		$badge.style.display = 'block';
	} else {
		$badge.style.display = 'none';
	}
}
setNewMsg(0);

var $input = $c('textarea', {
	className: 'input',
	onkeypress: function (evt) {
		switch (evt.keyCode) {
			case 13:
			{  // enter
				var xhr = new XMLHttpRequest();
				xhr.open('POST', '/dollars?ajax=1', true);
				var data = new FormData();
				data.append('message', $input.value);
				$input.disabled = true;
				xhr.send(data);
				xhr.onreadystatechange = function () {
					if (xhr.readyState != 4)
						return;
					$input.disabled = false;
					if (xhr.status < 200 || xhr.status >= 300)
						return;
					$input.value = "";
					updateMsg();
				};
				break;
			}
			case 27:
			{  // escape
				$switch.click();
				$input.blur();
				break;
			}
		}
	},
});
$sidebar.appendChild($input);

var lastView = 0;
var $history = $c('ul', {
	className: 'history',
	onclick: function (evt) {
		var $target = evt.target;
		if ($target.className == 'user') {
			$input.focus();
			$input.value += '@' + $target.parentNode.dataset.nickname + ' ';
			var length = $input.value.length;
			$input.setSelectionRange(length, length);
		}
	}
});
$sidebar.appendChild($history);

function generateTime(date) {
//	var hours = time.getHours(),
//		minutes = time.getMinutes();
//	var ampm = '';
//	if (hours > 12) {
//		ampm = ' PM';
//		hours -= 12;
//	} else if (hours < 12) {
//		ampm = ' AM';
//	} else if (minutes > 0) {
//		ampm = ' PM';
//	}
//	if (minutes < 10)
//		minutes = '0' + minutes;
//	return hours + ':' + minutes + ampm;

	var seconds = Math.floor((new Date() - date) / 1000);

	var interval = Math.floor(seconds / 31536000);

	if (interval >= 1) {
		return interval + "y ago";
	}
	interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		return interval + "m  ago";
	}
	interval = Math.floor(seconds / 86400);
	if (interval >= 1) {
		return interval + "d ago";
	}
	interval = Math.floor(seconds / 3600);
	if (interval >= 1) {
		return interval + "h ago";
	}
	interval = Math.floor(seconds / 60);
	if (interval >= 1) {
		return interval + "m ago";
	}
	return Math.floor(seconds) + "s ago";

}

function writeMsg(item) {
	var id = ITEM_PREFIX + item.id;
	if ($('#' + id))
		return false;

	var $li = $c('li', {
		id: id,
		dataset: {
			id: item.id,
			uid: item.uid,
			nickname: item.nickname,
		},
	});
	var $link = $c('a', {
		href: '/user/' + item.uid,
		target: '_blank'
	});
	var $avatar = $c('img', {
		className: 'avt',
		src: 'http://lain.bgm.tv/pic/user/m/' + item.avatar,

	});
	$link.appendChild($avatar);
	$li.appendChild($link);
	var $color = $c('span', {
		className: 'color',
		style: {
			background: item.color,
		},
	});
	//$li.appendChild($color);
	var $user = $c('a', {
		className: 'user',
		textContent: item.nickname,
	});
	$li.appendChild($user);
	var time = new Date(item.timestamp * 1000);
	var $timestamp = $c('time', {
		className: 'timestamp',
		dateTime: time.toISOString(),
		textContent: '@ ' + generateTime(time),
		dataset: {
			time: time.toISOString()
		},
	});

	$li.appendChild($timestamp);
	var $content = $c('p', {
		className: 'content',
		innerHTML: item.msg,
	});
	$li.appendChild($content);
	$history.insertBefore($li, $history.firstChild);
	return true;
}

var firstUpdate = true;
var lastUpdate = 0;
var updating = false;
function updateMsg() {
	if (updating)
		return;
	refreshTime();
	updating = true;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', '/dollars?since_id=' + lastUpdate, true);
	xhr.timeout = 1000;
	xhr.send();
	xhr.onreadystatechange = function () {
		if (xhr.readyState != 4)
			return;
		updating = false;
		if (xhr.status < 200 || xhr.status >= 300)
			return;
		var data = JSON.parse(xhr.responseText);
		if (!data)
			return;
		var count = 0;
		for (var i in data) {
			if (writeMsg(data[i]))
				count++;
		}
		if (firstUpdate) {
			firstUpdate = false;
		} else {
			setNewMsg(newMsg + count);
		}
		lastUpdate = data[data.length - 1].timestamp;
		while ($history.childNodes.length > MAX_ITEMS) {

			$history.removeChild($history.lastChild);
		}

	};
}

function refreshTime(){
	var times =     $sidebar.querySelectorAll('time');
	for (var i=0; i<times.length; i++){
		var date = new Date(times[i].dataset.time);
		times[i].textContent =  '@ ' + generateTime(date);
	}
}

setInterval(updateMsg, 1500);
updateMsg();

document.body.appendChild($sidebar);