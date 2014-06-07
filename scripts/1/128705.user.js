// ==UserScript==
// @name G++ Multilang
// @id	google_plus_plus_pokerface
// @namespace	  in.co.tossing.toolkit.google
// @description	Google Plus Plus, add reply button for Google Plus and other enhancement
// @license	GPL v3 or later version
// @updateURL	  http://userscripts.org/scripts/source/128705.meta.js
// @include		*://plus.google.com/*
// @version	0.1.1
// @author	Pokerface - Kevin
// ==/UserScript==

(function ($$d) {
	// document URI
	var $$url = null;
	urlHashchange();
	console.debug('Current URL : '+ $$url);
	
	// for each
	function each($arr, $fun) {
		if (!$arr)
			return;
		//console.debug('each function is called. arr length is '+ $arr.length);
		for (var i=$arr.length-1; i >=0; i--)
			$fun.call($arr[i]);
	}

	function urlHashchange() {
		var url = $$d.location.href;
		// turn http://xxx.xxx into http://xxx.xxx/
		if (/^https?:\/\/[\w.]+\w+$/.test(url))
			url += '/';
		if ($$url != url) {
			$$url = url;
			return true;
		}
		else
			return false;
	}
	
	var onUrlHashchange = (function () {
		var queue = [];
		// mointer
		setInterval(function () {
			if (urlHashchange())
				for (var i=0; i<queue.length; i++)
					queue[i]();
		}, 500);
		return function ($func, $init) {
			queue.push($func);
			if ($init)
				$func();
		};
	})();
	
	// listen to specific event
	var listen = (function () {
		var interval_count=[];
		return function ($selector, $event, $func, $init, $runOnce) {
			// $event & $init cannot be false at the same time
			if (!$event && !$init)
				return;
			var evt_listener = (function ($s, $e, $f, $i, $r) {
				var id = interval_count.length;
				return function () {
					// if $s is a element itself
					var dom = (typeof $s == 'string') ? $$d.querySelectorAll($s) : $s;
					if (dom.length > 0) {
						//console.debug('Straight Google: '+ dom.length +' elements of ['+ $s +'] is captured.');
						clearInterval(interval_count[id]);
						delete interval_count[id];
						for (var i=0; i<dom.length; i++) {
							// if the function need initiation
							if ($i) $f.call(dom[i]);
							if ($e instanceof Array)
								each(
									$e,
									function () {
										dom[i].addEventListener(this, (function ($d, $evt) {
											var newF = function () {
												$f.apply($d, Array.prototype.slice.apply(arguments));
												$d.removeEventListener($evt, newF);
											}
											return $r ? newF : $f;
											})(dom[i], this)
										);
									}
								);
							else if ($e)	// when $e != null
								dom[i].addEventListener($e, (function ($d, $evt) {
									var newF = function () {
										// in case the element has been removed
										if (!$d)
											return;
										$f.apply($d, Array.prototype.slice.apply(arguments));
										$d.removeEventListener($evt, newF);
									}
									return $r ? newF : $f;
									})(dom[i], $e)
								);
							else	// do nothing
								;
						}
					}
				}
			})($selector, $event, $func, $init, $runOnce);
			interval_count.push(setInterval(evt_listener, 500));
		}
	})();
	
	// simluate a click event
	function click($elem) {
		if (!$elem)
			return;

		// dispatch click event following the W3C order
		var e = $$d.createEvent("MouseEvents");
		e.initEvent("mousedown", true, true);
		$elem.dispatchEvent(e);
		
		e = $$d.createEvent("MouseEvents");
		e.initEvent("mouseup", true, true);
		$elem.dispatchEvent(e);
		
		e = $$d.createEvent("MouseEvents");
		e.initEvent("click", true, true);
		$elem.dispatchEvent(e);
	}

	// Main function begin ========================================
	var $$profile_cache = [];
	var $$spliter_chr = '\u00a0\u00a0-\u00a0\u00a0';
	var $$reply_button_class = 'gpp-reply';
	
	function appendReplyButton($elem) {
		if (!$elem || $elem.querySelectorAll('.'+ $$reply_button_class).length > 0)
			return;
		var spliter = $$d.createTextNode($$spliter_chr), append_line = $elem, reply_button;
		switch ($elem.className) {
			case "I2" :
				reply_button = getReplyButton();
				append_line = $elem.querySelector('.VSPWVe');
				break;
			case "vo" :
				// reply to author
				reply_button = getReplyButton("span");
				reply_button.className = 'c-C '+ reply_button.className;
				reply_button.setAttribute('tabindex', '0');
		}
		// append spliter '  -  '
		append_line.appendChild(spliter);
		append_line.appendChild(reply_button);
	}
	
	function doReply($elem) {
		var oid = getOID($elem), pid = getPID($elem), editBox = getEditBoxByPID(pid);
		// unable to reply
		if (!editBox)
			return;
		// first type-in
		if (!editBox.getAttribute('dir')) {
			editBox.setAttribute('dir','LTR');
			editBox.innerHTML = "";
		}
		var lstChild = editBox.lastChild;
		// don't know which google function cause this (insert a <br/> if there is any character in the end)
		if (lstChild && lstChild.nodeType == "br")
			editBox.removeChild(lstChild);
		editBox.appendChild($$d.createTextNode("\u00a0"));
		editBox.appendChild(getUserReference(oid));
		editBox.appendChild($$d.createTextNode("\u00a0"));
	}
	
	function getUserReference($oid) {
		var elem = $$d.createElement('button');
		elem.setAttribute('contenteditable', 'false');
		elem.setAttribute('tabindex', '-1');
		elem.className = 'e-QXyXGe';
		elem.setAttribute('data-token-entity', '@'+ $oid);
		elem.setAttribute('oid', $oid);
		elem.setAttribute('style', 'white-space: nowrap; background-image: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(238, 238, 238); border-top-width: 1px; border-right-width: 1px; border-bottom-width: 1px; border-left-width: 1px; border-top-style: solid; border-right-style: solid; border-bottom-style: solid; border-left-style: solid; border-top-color: rgb(221, 221, 221); border-right-color: rgb(221, 221, 221); border-bottom-color: rgb(221, 221, 221); border-left-color: rgb(221, 221, 221); border-image: initial; border-top-left-radius: 2px; border-top-right-radius: 2px; border-bottom-right-radius: 2px; border-bottom-left-radius: 2px; display: inline-block; font-family: Arial, sans-serif; font-size: 13px; font-style: normal; font-variant: normal; font-weight: normal; line-height: 1.4; margin-top: 0px; margin-right: 1px; margin-bottom: 0px; margin-left: 1px; padding-top: 0px; padding-right: 1px; padding-bottom: 0px; padding-left: 1px; vertical-align: baseline; color: rgb(51, 102, 204); background-position: initial initial; background-repeat: initial initial; ');
		var plus = $$d.createElement('span');
		plus.style.color = 'rgb(136, 136, 136)';
		plus.innerText = '+';
		var uname = $$d.createTextNode(getUnameByOID($oid));
		elem.appendChild(plus);
		elem.appendChild(uname);
		return elem;
	}
	
	function getLang() {
		var str = document.getElementsByClassName('k-Dj-zj')[0].href;
		if (str.indexOf('/en') != -1) return 'Reply';
		else if (str.indexOf('/ja') != -1) return '\u8FD4\u4FE1';
		else if (str.indexOf('/zh-CN') != -1) return '\u56DE\u590D';
		else if (str.indexOf('/zh-TW') != -1) return '\u56DE\u8986';
		else return 'Reply';
	}
	
	function getReplyButton($elemType) {
		var reply_button = $$d.createElement($elemType || 'a');
		reply_button.setAttribute('role', 'button');
		reply_button.className = $$reply_button_class;
		//reply_button.innerText = 'Reply';
		reply_button.innerText = getLang();
		
		return reply_button;
	}

	// get oid
	function getOID($elem) {
		while (!$elem.querySelector('a[oid]'))
			$elem = $elem.parentNode;
		return $elem.querySelector('a[oid]').getAttribute('oid');
	}
	
	// find any link with specific oid
	function getUnameByOID($oid) {
		if (!$$profile_cache[$oid])
			$$profile_cache[$oid] = $$d.querySelector('a.cs2K7c.qk[oid="'+ $oid +'"]').innerText;
		return $$profile_cache[$oid];
	}
	
	// get post id
	function getPID($elem) {
		while (!/^update-/.test($elem.getAttribute('id')))
			$elem = $elem.parentNode;
		return $elem.getAttribute('id').split('-')[1];
	}
	
	// get edit box by post id.  If the edit box does not exist, this will initialize one.
	// return null when the post is locked or disabled commenting due to any reason
	function getEditBoxByPID($pid) {
		var post = $$d.querySelector('div#update-'+ $pid);
		if (!post)
			return null;
		// check if the edit box exist
		var editbox = post.querySelector('div.editable[id^=":"][id$=".f"]');
		if (editbox)
			return editbox;
		var addComment = post.querySelector('div.i9kzNd.rh > div.rBJ4nd.Ln[role="button"]');
		if (!addComment)
			return null;
		click(addComment);
		return post.querySelector('div.editable[id^=":"][id$=".f"]');
	}
	
	function mouseDispatcher(e) {
		var elem = e.target;
		switch (e.type) {
			case 'mousemove':
				if (/^I2|vo$/.test(elem.className))
					appendReplyButton(elem);
				break;
			case 'click':
				if (elem.className.indexOf($$reply_button_class) > -1)
					doReply(elem);
				break;
		}
	}
	
	// active option menu
	function activePostMenu($post) {
		if (!$post)
			return;
		if (!$post.querySelector('.Bt.c-o[role="menu"]'))
			click($post.querySelector('.Wl > .VV0qQb[role="button"]'));
	}
		
	function keyDispatcher($e) {
		/* dictionary -> keyCode
		13 Enter
		17 Ctrl
		27 ESC
		77 M
		*/
		// current selected element
		var elem = $e.target;
		var editBox = (/^:[\w\d]+\.f$/.test(elem.getAttribute('id')) && /editable/.test(elem.className)) ? elem : null;
		var post_comment = null, cancel_comment = null, selected_post = $$d.querySelector('div.Wbhcze.bh[id^="update-"]');
		if ($$d.activeElement != selected_post)
			selected_post = null;	// post is not selected
		// 'share with' input
		if (elem.className == 'g-i-h-O-O')
			// focus on edit box
			editBox = elem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('div.editable[id^=":"][id$=".f"]');
		if (editBox) {
			var parent = editBox.parentNode.parentNode.parentNode;
			// if this is the share box
			if (parent.parentNode.getAttribute('guidedhelpid') == 'sharebox') {
				parent = parent.parentNode.parentNode.parentNode;
				post_comment = parent.querySelector('.e-U-a-fa > div.c-wa-Da.e-U-me[role="button"][aria-disabled="false"]');
				cancel_comment = parent.querySelector('.e-U-a-fa > div.c-wa-Da.e-U-rd-Qf[role="button"][aria-disabled="false"]');
			}
			else {
				post_comment = parent.querySelector('div.c-wa-Da[id^=":"][id$=".post"][role="button"][aria-disabled="false"]');
				cancel_comment = parent.querySelector('div.c-wa-Da[id^=":"][id$=".cancel"][role="button"]');
			}
		}

		switch ($e.keyCode) {
			case 13 : // Enter
				if (editBox)
					// CTRL + Enter = POST COMMENT
					if ($e.ctrlKey)
						click(post_comment);
				break;
			case 27 : //ESC
				if (editBox) {
					// clear content
					editBox.innerHTML = '<br/>';
					// cancel comment
					click(cancel_comment);
				}
				break;
			case 77 : //M
				if (!editBox && selected_post) {
					// if this post has been muted already
					if (selected_post.className.indexOf('nt') > -1)
						click(selected_post.querySelector('span.c-C.dSEkJe[role="button"]'));
					else {
						// mute the post
						activePostMenu(selected_post);
						var muteButton = selected_post.querySelector('.t0psmc[role="menuitem"] > .c-D-B');
						click(muteButton);
					}
				}
				break;
		}
		
	}

	// listen to the stream
	function _bind_stream($elem) {
		// mointer mouse move
		listen($elem, "mousemove", mouseDispatcher);
		listen($elem, "click", mouseDispatcher);
		listen($elem, "keydown", keyDispatcher);
	}
	
	// Main progress begins ===============================================
	console.debug('Google Plus Plus is now loaded');
	// notification bar
	if (/\/notifications\/frame\?/.test($$url)) {
		_bind_stream('div.kd.GtHf1e');
	}
	else if (/\/apps-static\//.test($$url)) {}
	else {
		// page switch
		onUrlHashchange(function () {
			_bind_stream("div#contentPane");
			// float share box
			listen('.Y-S.e-Mf-Y', "keydown", keyDispatcher);
		}, true);
	}
	
})(document);