// ==UserScript==
// @name           Twitter Post Anywhere
// @namespace      http://ss-o.net/
// @include        http://twitter.com/*
// @include        http://twitread.ss-o.net/*
// @version        0.3
// ==/UserScript==

// author: os0x ( http://d.hatena.ne.jp/os0x/ )

(function(){

	var DEBUG = false;

	var ReplyIconData = ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0',
		'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKGSURBVDjLpZNPSFRhFMV/33vfzDjOvBml',
		'Rkuz0THKIjGN2qSrFkFEBUFBG1fhtkW7aB1UUNDCyIJaRC3aRAXWxkroHxpCRGaY2uS/GWfUGUff',
		'fPPe+1poUbvCs77n3HPvuVdorVkP5P8Ujz3ae0IVtj80w80U5l4i7MlO8a8OfvQmTsvAyXvBjR1E',
		'G1pZGHvD8PNbs/JCz7u+snKrdS5fCi3ZjuFp8NC4nsbTGldrmq234kx7p4hWtJEd/YxfKKzIJsoq',
		'4zEZq4zWdR3bHimWtCgLmH91FYDKvEKlM0QThyhOP8BfLpgYGsb1/Fwe25c0UjknoRxP3OubJjmn',
		'KBQ1ExmPZNYjOdaHSvUSbTyMPdWD8M3jC1tgz2Hu7WK5YvdWo1B0RcBnULs5wvPBFAtLJaojgpXx',
		'x5QvPCO67Sj2ZDeGr4TK1TP1YoiB6vPE6psAhFy2HQASm8IIDb0DKdo3DOLLvaaq/Qhq5hamX2Mv',
		'xpnp/8DgtmtsrGtE6FWeUbDd1TxNSNSEiWaeYWbfo9wapj9ex8OmkK0l2f+JgcQVahsaCf4Rviys',
		'rCoJAU7JwTd9n13Hb/PlwTlG+l8T2NqCPZ9mvu0ivnAMQztIn/y9ZWO56KIBpRxms3lGvqVRn57Q',
		'0NJBKLSDyaFR9IFLNDXvoX6zRXYhj+c4aA1ogVwuOtr1tEhl8tTFLO58TXH1Zjf7dzbgj7fQfOou',
		'/sgWPDSy3I+ssphK51ipCIL2tCxkJ8eLyok3bQmKcNAQN54mMdZGEkKsOfUQvw4DSbzS8sZn8iqX',
		'/jEl1VJ64uDZ3sqAFQrJgCmkNDFMgWmAYQgMucpb00KAdh2lVhbnM+nR5Hex3m80WCd+AqUYHPPw',
		'kaN5AAAAAElFTkSuQmCC'].join('');
	var ReplyPostIconData = ['data:image/png;base64,',
		'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0',
		'U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKESURBVDjLpZO7axRhFMV/38zsy+xuEt2Q',
		'50bYgChGUBAVxUbRRlS0sxJsbP0HFAQJ1jYqtlqYTlARNZoiPlELCxVd0LgxwcnuxmT2MfPN97BI',
		'xAcIggcu91EcLudwhLWW/4HDf8I7feXZw/Sq3JZqEHc0QuUYCwaLNhZjLdpajFneV8oidBy3FquV',
		'd+Wy19PdWTx5eF0+iq1Ip9zf2MWfs1ju7Ui57UgPHDsfhY6/pEpSGXHt4RyVqqQZWaZrhkrdMPPN',
		'MLdo8ANLtWmJNczUJBduzrHQjJxcT3HEaUZapBIOg/157r70+daI6c0LEi4kXUHSEyQ96MoIakuS',
		'8amvdK3Os6YrBSCcVqgAKPVlGerNc+eFz0IQU8g6JD1IutCZFtQDyfiUT2FNntJgFrFintMM9bKa',
		'LpQGsvR0r+L6ZIV6IOlMC3JpQS2QnL99gHcLhygNZMl4v9jYbC9/IASoWJH2DMODXdx67jNTDZmp',
		'htx46hNbxVBhAxcnRkl6P5X1WpHGAlIqvtYDir05kskElx8c4c19jTQKqRUD3SNs6NtOEDY5e2Mt',
		'V0+UwQq8VqSsNlb4tYBiT45MOgEWlJHs23gcbQ3aaAyW2cUKm4Z20ZBtDl4s0Ofcs16z/uVTJNXa',
		'9UMZkc04QjgaBwiVRFvDdO0DsVEoExPrmKUoYHNxN424xfOPu/FkY35676k73alcR4eXcoXnuTiu',
		'oL8YekorevPDKKPR1jC3+JnV2T5eVR7xrFyOE2/PPRF/C9PRSyUdSok0klBJRgobnR2l/bz4/JiJ',
		'93dfS8W22TEbiX9N4+g5Z37r8J7C5PuJl9Kwc3bMSoB/JiidEfPauIW20Ql/zKof9+9pyFaERzUY',
		'+QAAAABJRU5ErkJggg=='].join('');
	var LoadingIconData = ['data:image/gif;base64,',
		'R0lGODlhEAAQAPIAAP///yqVEcvlxmGwTiqVEXu9bJbKiqPRmSH/C05FVFNDQVBFMi4wAwEAAAAh',
		'/h1CdWlsdCB3aXRoIEdJRiBNb3ZpZSBHZWFyIDQuMAAh/hVNYWRlIGJ5IEFqYXhMb2FkLmluZm8A',
		'IfkECQoAAAAsAAAAABAAEAAAAzMIutz+MMpJaxNjCDoIGZwHTphmCUWxMcK6FJnBti5gxMJx0C1b',
		'GDndpgc5GAwHSmvnSAAAIfkECQoAAAAsAAAAABAAEAAAAzQIutz+TowhIBuEDLuw5opEcUJRVGAx',
		'GSBgTEVbGqh8HLV13+1hGAeAINcY4oZDGbIlJCoSACH5BAkKAAAALAAAAAAQABAAAAM2CLoyIyvK',
		'QciQzJRWLwaFYxwO9BlO8UlCYZircBzwCsyzvRzGqCsCWe0X/AGDww8yqWQan78EACH5BAkKAAAA',
		'LAAAAAAQABAAAAMzCLpiJSvKMoaR7JxWX4WLpgmFIQwEMUSHYRwRqkaCsNEfA2JSXfM9HzA4LBqP',
		'yKRyOUwAACH5BAkKAAAALAAAAAAQABAAAAMyCLpyJytK52QU8BjzTIEMJnbDYFxiVJSFhLkeaFlC',
		'Kc/KQBADHuk8H8MmLBqPyKRSkgAAIfkECQoAAAAsAAAAABAAEAAAAzMIuiDCkDkX43TnvNqeMBnH',
		'HOAhLkK2ncpXrKIxDAYLFHNhu7A195UBgTCwCYm7n20pSgAAIfkECQoAAAAsAAAAABAAEAAAAzII',
		'utz+8AkR2ZxVXZoB7tpxcJVgiN1hnN00loVBRsUwFJBgm7YBDQTCQBCbMYDC1s6RAAAh+QQJCgAA',
		'ACwAAAAAEAAQAAADMgi63P4wykmrZULUnCnXHggIwyCOx3EOBDEwqcqwrlAYwmEYB1bapQIgdWIY',
		'gp5bEZAAADsAAAAAAAAAAAA='].join('');

	if (typeof(GM_setValue) != 'function' && typeof(GM_getValue) != 'function') {
		function GM_setValue(name, value) {
			document.cookie = [
				name, '=', escape(value),
				';expires=', (new Date(new Date() + 365 * 1000 * 60 * 60 * 24)).toGMTString()
			].join('');
		}
		function GM_getValue(name, value) {
			var r = new RegExp(name + '=([^;]*)'), m;
			if (m = document.cookie.match(r)) {
				return unescape(m[1]);
			}
			return value;
		}
		function GM_delValue(name, value) {
			if (GM_getValue(name, false))
				document.cookie = name + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
		}
	} else {
		var GM_delValue = GM_setValue;
	}

	if (!this.GM_registerMenuCommand) {
		var functions = [];
		function GM_registerMenuCommand(text,fn) {
			functions.push({fn:fn,text:text});
			window.GM_Menu = function(){
				functions.forEach(function(fns){
					if(confirm(fns.text)) fns.fn.call(null,fns);
				});
			};
		}
	}

	var postAnywhere = function (doc){
		$x('descendant-or-self::li[contains(@class,"status")] |.//li[@class="xfolkentry"]',doc).forEach(postcreater);
	};
	postAnywhere();

	function initAutoPagerize () {
		window.AutoPagerize.addFilter(function(docs){
			docs.forEach(postAnywhere);
		});
	}
	function initMinibuffer () {
		if (!window.Minibuffer) return;
		window.Minibuffer.addCommand({
			 name: 'show-reply-form' // this name is going to type in minibuffer
			,command: function(stdin) {
				stdin.forEach(function(para,i) {
					var reply = $x('descendant::*[contains(@class,"entry-meta")]/img[@class="reply"]',para);
					if(reply) {
						var evt =document.createEvent("MouseEvents");
						evt.initEvent("click",true,true);
						reply[0].dispatchEvent(evt);
					}
				});
			}
		});
		window.Minibuffer.addShortcutkey({
			key: 'r r',
			description: 'Show Reply Form',
			command: function(){
				Minibuffer.execute('pinned-or-current-node | show-reply-form');
			}
		});
	}
	if (window.Minibuffer) {
		initMinibuffer();
	} else {
		window.addEventListener('GM_MinibufferLoaded', initMinibuffer, false);
	}
	document.body.addEventListener('AutoPatchWork.DOMNodeInserted', function(e){postAnywhere(e.target);}, false);
	document.body.addEventListener('AutoPagerize_DOMNodeInserted', function(e){postAnywhere(e.target);}, false);

	function postcreater(item) {
		var meta = $x('descendant::*[contains(@class,"entry-meta")]', item)[0] || item;
		var reply = document.createElement('input');
		reply.type = 'image';
		reply.src = ReplyIconData;
		reply.title = 'reply to this post';
		reply.className = 'reply';
		reply.style.margin = '0 3px';
		reply.style.cursor = 'pointer';
		var forms, username;
		reply.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			if(!forms){
				var link = $x('descendant::a[@rel="bookmark"] | descendant::li[@class="icon"]/a', item)[0];
				var res = /^\/?(\w+)\/\w+\/(\d+)/.exec(link.pathname);
				username = res[1];
				forms = createForm(item, res[1],res[2]);
				forms.text.focus();
			} else {
				var text = forms.text;
				forms.form.style.display = forms.form.style.display == 'none' ? 'block' : 'none';
				if (text.value == '' ) {
					text.value = '@' + username +' ';
				}
				text.focus();
			}
		}, false);
		meta.appendChild(reply);
	}

	function createForm(item, user, repid) {
		var replyform = document.createElement('form');
		replyform.setAttribute('onsubmit','return false;');
		item.appendChild(replyform);
		var replytext = document.createElement('textarea');
		replytext.style.width = '400px';
		replytext.value = '@' + user + ' ';
		replyform.appendChild(replytext);
		var replybtn = document.createElement('input');
		replybtn.type = 'image';
		replybtn.src = ReplyPostIconData;
		replybtn.addEventListener('click', function(e) {
			e.preventDefault();
			e.stopPropagation();
			replybtn.src = LoadingIconData;
			post(replytext.value, repid, function(){
				replytext.value = '';
				replyform.style.display = 'none';
				replybtn.src = ReplyPostIconData;
			});
		}, false);
		replyform.appendChild(replybtn);
		return {form:replyform,text:replytext};
	}

	function post(msg,repid,callback) {
		if (!DEBUG || (msg = prompt(repid,msg)) ) {
			var status = encodeURIComponent(msg);
			var url = 'http://twitter.com/statuses/update.json';
			var postdata = 'status=' + status + '&in_reply_to_status_id=' + repid;
			if (location.host != 'twitter.com' && !window.opera) {
				GM_xmlhttpRequest({
					method : 'POST'
					,url : url
					,data: postdata
					,headers: {
						'Content-Type':'application/x-www-form-urlencoded'
					}
					,onload:function(res){
						if(res.readyState == 4 && res.status == 200){
							callback(res);
						}
					}
				});
			} else {
				var x=new XMLHttpRequest();
				x.open('POST',url,true);
				x.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
				x.onreadystatechange = function() {
					if(x.readyState == 4 && x.status == 200){
						callback(x);
					}
				};
				x.send(postdata);
			}
		} else {
			callback();
		}
	}

	function log(message) {
		if(!DEBUG) return;
		if(!!window.opera) {
			opera.postError(message);
		} else {
			console.log(message)
		}
	}

	function $x(xpath, node) {
		node || (node = document);
		var nodesSnapshot = document.evaluate(xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0, res = [], l = nodesSnapshot.snapshotLength; i < l; i++)
			res.push(nodesSnapshot.snapshotItem(i));
		return res;
	}
})();
