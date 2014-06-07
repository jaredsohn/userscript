// ==UserScript==
// @name           Popodeus Message Helper
// @namespace      http://popodeus.com
// @description    Message helper for Popmundo
// @include        http://www*.popmundo.com/Common/*
// @require        http://popodeus.com/scripts/common-1.1.js
// @copyright	   Popodeus.com, 2009. All rights reserved. No right to alter or redistribute.
// @version        3
// ==/UserScript==

window.addEventListener('load', function() {
	var loc = document.location.href.toLowerCase();
	var ref = document.referrer.toLowerCase();
	var CHECK_FREQUENCY = 90; // seconds

	function displayNotifications(document) {
		if (!document) return;
		var style = document.createElement('style');
		style.setAttribute('type', 'text/css');
		style.innerHTML = 'body { background-color: #FFF !important; text-align: middle; }';
		document.getElementsByTagName('head')[0].appendChild(style);

		var link = document.createElement('link');
		link.setAttribute('rel', 'stylesheet');
		link.setAttribute('type', 'text/css');
		link.setAttribute('href', 'http://www123.popmundo.com/Common/css/Themes/Default/Default.css');
		document.getElementsByTagName('head')[0].appendChild(link);

		var div = elem('elem',
			{id:'messageline'},
			{position:'absolute',
				bottom:0,
				width: '100%',
				textAlign: "center",
				height: "18px",
				backgroundColor: "#EBDEAE",
				borderTop: "1px solid #FFF",
				borderBottom: "2px solid #FFF",
				display: "none"
			});
		document.body.appendChild(div)

		// Just load any page that shows the notification bar.
		// Rules page is static, and doesn's stress servers much as character or city page for example.
		var xurl = location.protocol + "//" + location.host + '/Common/Rules.asp';
		GM_xmlhttpRequest({
			method:'GET',
			url:xurl,
			onload: function(res) {
				if (res.status == 200 && res.readyState == 4) {
					var msg = document.getElementById('messageline');
					var txt = res.responseText;
					var pos1 = txt.indexOf('<td class="Notifications"');
					if (pos1 > 0) {
						pos1 = txt.indexOf('>', pos1) + 1;
						var pos2 = txt.indexOf('</td>', pos1);
						var content = txt.substring(pos1, pos2).replace(/\n/g, ' ');
						//GM_log(content);

						msg.innerHTML = content;
						var len = document.links.length - 1;
						while (len >= 0) {
							var link = document.links[len--];
							link.setAttribute('target', '_blank');
							link.addEventListener('click', function(evt) {
								setTimeout('location.reload()', 1000);
							}, false);
						}
						msg.style.display = "block";
					} else {
						msg.style.display = "none";
					}
				}
			}
		});
	}
	function refreshTopFrame() {
		if (top.frames && top.frames[1] && top.frames[1].name == 'Top') {
			var lastclick = GM_getValue('last.click');
			if (!lastclick) lastclick = 0;
			var diff = new Date().getTime()/1000-lastclick;
			if (diff > CHECK_FREQUENCY) {
				GM_setValue('last.click', parseInt(new Date().getTime()/1000));
				displayNotifications(top.frames[1].document);
			}
		}
	}


	if (loc.indexOf('common/forumtop.asp') > 0) {
		displayNotifications();
		return;
	}

	if (loc.indexOf('characterdetails.asp?action=messages') > 0 ||
		loc.indexOf('characterdetails.asp?action=deletemessage') > 0 ||
		(loc.indexOf('characterDetails.asp') > 0 && ref.indexOf('characterdetails.asp?action=messages') > 0 )) {
		var xpath = '/html/body/table[3]/tbody/tr/td[1]/div[2]/table/tbody/tr/td[2]';
		var list = X2(xpath);
		if (list) {
			GM_addStyle(
					'#x-quote, #x-shadow { ' +
					'	color: black; ' +
					'	font-size: 110%; ' +
					'	position: absolute; ' +
					'	width: 340px; ' +
					'	padding: 4px; ' +
					'	padding-right: 16px; ' +
					'	border: 1px solid #333; ' +
					'	min-height: 52px; ' +
					'	background: #FFF;' +
					'	z-index: 100; ' +
					'}' +
					'#x-shadow { ' +
					'	background: black;' +
					'	opacity: 0.33; ' +
					'	z-index: 80; ' +
					'} ' +
					'#x-ptr { ' +
					'	position: absolute;' +
					'	z-index: 120; ' +
					'}'
					);
			var click = function(e) {
				var t;
				if (!e) e = window.event;
				if (e.target) t = e.target;
				else if (e.srcElement) t = e.srcElement;
				if (t.nodeType == 3) t = t.parentNode; // defeat Safari bug
				var link = t.getElementsByTagName('a')[0];
				if (link) {
					document.location.href = link.href;
					e.stopPropagation();
					e.preventDefault();
				}
			}
			var show = function(e) {
				var t;
				if (!e) e = window.event;
				if (e.target) t = e.target;
				else if (e.srcElement) t = e.srcElement;
				if (t.nodeType == 3) t = t.parentNode; // defeat Safari bug
				// posx and posy will contain the mouse position relative to the document
				var posx, posy;
				if (e.pageX || e.pageY) {
					posx = e.pageX;
					posy = e.pageY;
				} else if (e.clientX || e.clientY) 	{
					posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
					posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
				}
				var title = t.title;
				if (!title) title = t.getElementsByTagName('a')[0].title;

				var ptr = $('x-ptr');
				ptr.style.display = 'inherit';
				ptr.style.left = posx -15 + 'px';
				ptr.style.top = posy + 5 + 'px';
				var s = $('x-shadow');
				s.innerHTML = title;
				s.style.display = 'inherit';
				s.style.left = posx -26 + 'px';
				s.style.top = posy + 23 + 'px';
				var q = $('x-quote');
				q.innerHTML = title;
				q.style.display = 'inherit';
				q.style.left = posx -30 + 'px';
				q.style.top = posy + 19 + 'px';
				e.stopPropagation();
				e.preventDefault();
			}
			var hide = function(e) {
				var t;
				if (!e) e = window.event;
				if (e.target) t = e.target;
				else if (e.srcElement) t = e.srcElement;
				if (t.nodeType == 3) t = t.parentNode; // defeat Safari bug

				$('x-ptr').style.display = 'none';
				$('x-quote').style.display = 'none';
				$('x-shadow').style.display = 'none';
				e.stopPropagation();
				e.preventDefault();
			}
			for (var i = 0; i < list.snapshotLength; i++) {
				var td = list.snapshotItem(i);
				var a = td.getElementsByTagName('a')[0];
				td.addEventListener('mouseover', show, false);
				td.addEventListener('mouseout', hide, false);
				td.addEventListener('click', click, false);
			}
			document.body.appendChild(elem('img', {src:'http://popodeus.com/scripts/gfx/arrow.gif',id:'x-ptr'}, {display:'none'}));
			document.body.appendChild(elem('div', {id:'x-shadow'}, {display:'none'}));
			document.body.appendChild(elem('div', {id:'x-quote'}, {display:'none'}));
		}
		var link = X('//a[contains(@href, "CharacterDetails.asp?action=Messages")]')
		if (link) {
			var img = elem('img', {src:'http://beta.popodeus.com/scripts/gfx/email.png', className:'x-msg'});
			link.appendChild(img);
		}
	}

	refreshTopFrame();
}
, false);