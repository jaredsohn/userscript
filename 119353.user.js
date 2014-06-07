// ==UserScript==
// @name           unlimited_friends
// @version        1.01
// @namespace      wutj.info
// @include        http://req.renren.com/xmc/gmc*
// @include        http://www.renren.com/home*
// ==/UserScript==

function process() {
	var reqs = document.getElementById('requests_friend_list');
	if (reqs) {
		reqs = reqs.getElementsByTagName('li');
		for (var i=0; i<reqs.length; i++) {
			var btns = reqs[i].getElementsByClassName('btns')[0];
			if (!btns || btns.getAttribute('ulfriends_processed')) continue;
			var data = btns.getElementsByTagName('button')[0].getAttribute('click');
			var rrid = data.match(/[0-9]+/);
			var detail = reqs[i].getElementsByClassName('detail')[0];
			var newbtn = document.createElement('button');
			newbtn.innerHTML = '接勒个受';
			newbtn.addEventListener('click', force_add_friend(rrid, btns, detail), false);
			btns.insertBefore(newbtn, btns.firstChild);
			btns.setAttribute('ulfriends_processed', 1);
		}
	}
	
	reqs = document.getElementsByClassName('friend');
	if (reqs && reqs[1].tagName == 'DD') {
		reqs = reqs[1].getElementsByTagName('li');
		for (var i=0; i<reqs.length; i++) {
			var btns = reqs[i].getElementsByClassName('handle')[0];
			if (!btns || btns.getAttribute('ulfriends_processed')) continue;
			var data = reqs[i].getElementsByTagName('a')[0].href;
			var rrid = data.match(/[0-9]+/);
			var detail = reqs[i].getElementsByClassName('detail')[0];
			var newbtn = document.createElement('button');
			newbtn.innerHTML = '接勒个受';
			newbtn.className = 'accept';
			newbtn.addEventListener('click', force_add_friend(rrid, btns, detail), false);
			btns.insertBefore(newbtn, btns.firstChild);
			btns.setAttribute('ulfriends_processed', 1);
		}
	}
}

function force_add_friend(rrid, btns, detail, code) {
	var script0 = document.getElementsByTagName('script')[0].innerHTML;
	script0 = script0.substr(0, script0.indexOf("\n"));
	eval(script0);
	var rtk1 = XN.get_check;
	var rtk2 = XN.get_check_x;
	return function() {
		if (code) {
			code = 'codeFlag=1&code='+code+'&';
		} else {
			code = 'codeFlag=0&code=&';
		}
		GM_xmlhttpRequest({
			url: 'http://friend.renren.com/ajax_request_friend.do?from=sg_others_profile',
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
			},
			data: 'id='+rrid+'&why=&'+code+'requestToken='+rtk1+'&_rtk='+rtk2,
			onload: function(response) {
				eval("var r = " + response.responseText);
				if (typeof r.code == 'undefined') {
					if (r.info == 'check code input error') {
						show_vcode(rrid, btns, detail);
					} else {
						alert(r.info);
					}
				}else if (r.code == 0) {
					btns.style.display = 'none';
					detail.innerHTML = '添加好友完成';
				}
			}
		});
	}
}

function show_vcode(rrid, btns, detail) {
	var d = document.createElement('div');
	/*d.style.position = 'fixed';
	d.style.top = '100px';
	d.style.right = '100px';*/
	d.style.backgroundColor = '#fff';
	d.style.opacity = '0.9';
	d.style.zIndex = 100;
	d.style.border = '2px solid #008';
	d.style.padding = '5px';

	var htm = '';
	htm += '请输入验证码：<br/>';
	htm += '<img src="http://icode.renren.com/getcode.do?t=requestfriend_&temp='+Math.random()+'"/><br/>';
	htm += '<input type="text"/><button>确定</button>';
	d.innerHTML = htm;
	detail.innerHTML = '';
	detail.appendChild(d);
	d.getElementsByTagName('button')[0].addEventListener('click', function() {
		var code = d.getElementsByTagName('input')[0].value;
		var x = force_add_friend(rrid, btns, detail, code);
		x();
		detail.removeChild(d);
	}, false);
}

var delayed_call = function(func, delay) {
	var timer;
	return function() {
		if (timer) window.clearTimeout(timer);
		timer = window.setTimeout(func, delay);
	}
};

document.body.addEventListener("DOMNodeInserted", delayed_call(process, 500), false);

