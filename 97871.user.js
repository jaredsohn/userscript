// ==UserScript==
// @name           IMDb Message Boards plus
// @namespace      http://userscripts.org/users/67626
// @description    Additional functionality for the IMDb Message Boards.
// @copyright      2008-2014 http://userscripts.org/users/67626
// @license        Creative Commons BY-NC-ND 3.0, http://creativecommons.org/licenses/by-nc-nd/3.0/
// @include        http://*.imdb.com/*board*
// @exclude        http://*.imdb.com/*images*
// @exclude        http://pro.imdb.com/*
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_addStyle
// @grant          GM_setClipboard
// @grant          GM_xmlhttpRequest
// @grant          unsafeWindow
// @updateURL      http://userscripts.org/scripts/source/97871.meta.js
// @version        2014.03.02
// ==/UserScript==

(function() {
if (window.top != window.self) return; //iframes

function $(x) {return document.getElementById(x)}
var Thread = Boolean($("main").className.match("view_thread"));
var Compose = Boolean($("main").className.match("compose"));
var PM = Boolean(document.title.match("Private Messages: Inbox"));

if (Thread || PM || Compose) {

	//markup functions
	var s, a, b;
	function getPosition() {
		s = Body.scrollTop;
		a = Body.selectionStart;
		b = Body.selectionEnd;
	}
	function wrap(tag, event) {
		//Shift+click to swap tags
		var Open = (event.shiftKey) ? ("[/" + tag + "]" + ((tag == "quote") ? "\n" : "")) : "[" + tag + "]";
		var Close = (event.shiftKey) ? (((tag == "quote") ? "\n\n" : "") + "[" + tag + "]") : "[/" + tag + "]";
		getPosition();
		with (Body) {
			if (a < b && value.substring(b - 1, b) == " ")	//text selected with double-click
				b--;
			var Sel = value.substring(a, b);
			value = value.substring(0, a) + Open + Sel + Close + value.substring(b, textLength);
			var p = (Sel) ? b + (Open + Close).length : a + Open.length;
			setSelectionRange(p, p);
			scrollTop = s;
			focus();
		}
		event.stopPropagation();
		event.preventDefault();
	}
	function quote(event) {
		var Sel = window.getSelection().toString();
		if (Sel == "")
			wrap("quote", event);
		else {	//outside text selected
			getPosition();
			with (Body) {
				while (Sel.match(/^\s|\s$/))
					Sel = Sel.replace(/^\s|\s$/, "");	//remove leading and trailing white spaces
				value = value.substring(0, a) + "[quote]" + Sel + "[/quote]" + value.substring(b, textLength);
				var p = value.indexOf("[/quote]", a + 8) + 8;
				setSelectionRange(p, p);
				scrollTop = s;
				focus();
			}
			event.stopPropagation();
			event.preventDefault();
		}
	}
	function link(event) {
		getPosition();
		with (Body) {
			var Link = linkProcess(value.substring(a, b));
			if (Link == "[url][/url]") {
				addEventListener("keyup", linkTrap, false);
				var p = a + 5;
			}
			else
				var p = a + Link.length;
			value = value.substring(0, a) + Link + value.substring(b, textLength);
			setSelectionRange(p, p);
			scrollTop = s;
			focus();
		}
		event.stopPropagation();
		event.preventDefault();
	}
	function linkProcess(url) {
		while (url.match(/^\s|\s$/))
			url = url.replace(/^\s|\s$/, "");	//remove leading and trailing white spaces
		url = url.replace(/ *((\r\n)+|\n+) */g, "[/url]$1[url]");	//list of URLs
		var Junk = new Array(/http:\/\/www\./gi, /http:\/\//gi, /(index|default)\.(html|htm|shtml|php|aspx|asp|jspx|jsp)/gi, /ref_=\w+&/g, /\?ref_=\w+/g);
		if (url.match("p=") && url.match("imdb.com") && url.match("/board/"))
			Junk.splice(5, 0, /&p=\d\d?|p=\d\d?&/g);	//remove page number from links to IMDb Boards posts
		if (url.match("web.archive.org")) {	//don't trim Wayback Machine links - they may break
			Junk.splice(2, 2);
			Junk.splice(0, 1);
		}
		for (var i in Junk)
			url = url.replace(Junk[i], "");
		if (!url.match(/\n/) && !url.match(/\/\S+/) && url.match(/\/$/))
			url = url.replace(/\/$/, "");	//remove trailing slash from homepage URLs: http://imdb.com/ -> http://imdb.com
		url = "[url]" + url + "[/url]";
		url = url.replace(/\[url\]imdb.com\/title\/(tt\d+)\/\[\/url\]/g, "[link=$1]").replace(/\[url\]imdb.com\/name\/(nm\d+)\/\[\/url\]/g, "[link=$1]").replace(/\[url\]imdb.com\/character\/(ch\d+)\/\[\/url\]/g, "[link=$1]").replace(/\[url\]imdb.com\/company\/(co\d+)\/\[\/url\]/g, "[link=$1]");
		return url;
	}
	function linkTrap() {
		Body.removeEventListener("keyup", linkTrap, false);
		getPosition();
		with (Body) {
			if (value.substring(b, b + 6) == "[/url]") {
				var c = value.substring(0, b).lastIndexOf("[url]") + 5;
				var Link = linkProcess(value.substring(c, b));
				value = value.substring(0, c - 5) + Link + value.substring(b + 6, textLength);
				var p = c - 5 + Link.length;
				setSelectionRange(p, p);
				scrollTop = s;
				focus();
			}
		}
	}
	function strikethrough(event) {
		$("characters").click();
		getPosition();
		with (Body) {
			if (a < b && value.substring(b - 1, b) == " ")	//text selected with double-click
				b--;
			var Sel = value.substring(a, b);
			value = value.substring(0, a) + Sel.replace(/(.)/g, "$1\u0336") + value.substring(b, textLength);
			var p = a + Sel.length * 2;
			setSelectionRange(p, p);
			scrollTop = s;
			focus();
		}
		event.stopPropagation();
		event.preventDefault();
	}
	function markup() {
		document.getElementsByClassName("characters")[0].insertAdjacentHTML('afterbegin', '<button id="strikethrough" class="btn small" style="float: right">Strikethrough</button><br /><br />');
		$("b").addEventListener("click", function(event) {wrap("b", event)}, false);
		$("i").addEventListener("click", function(event) {wrap("i", event)}, false);
		$("url").addEventListener("click", function(event) {link(event)}, false);
		$("quote").addEventListener("click", function(event) {quote(event)}, false);
		$("spoiler").addEventListener("click", function(event) {wrap("spoiler", event)}, false);
		$("pre").addEventListener("click", function(event) {wrap("pre", event)}, false);
		$("strikethrough").addEventListener("click", function(event) {strikethrough(event)}, false);
		with (Body) {
			setSelectionRange(0, 0);
			if (document.getElementsByTagName("h3")[0].innerHTML != "Preview:") {
				focus();
				if (!FormURL)
					FormURL = window.location.pathname;
				if (FormURL.match("/edit/")) {	//space problem fix
					value = value.replace(/& ?a ?m ?p ?;(?=[^\[]*\[\/url\])/g, "&").replace(/&(?=[^\[]*\[\/url\])/g, "&amp;").replace(/(\[url\][^\[]{70}) /g, "$1").replace(/&amp;(?=[^\[]*\[\/url\])/g, "&");
					setSelectionRange(0,0);
				}
			}
		}
		Body.addEventListener("keydown", function(event) {	//hotkeys for some of the markup
			if (event.ctrlKey) {
				switch (event.which) {
					case 66: wrap("b", event); break;
					case 73: wrap("i", event); break;
					case 83: wrap("spoiler", event); break;
					case 80: wrap("pre", event); break;
				}
			}
		}, false);
	}
	function hotkeys(preview, post, event) {	//hotkeys for quoting and post actions
		if (Body) {
			if (event.which == 9 && !event.ctrlKey) {	//Tab, but don't block browser tab switch
				Body.focus();
				event.preventDefault();
			}
			else if (event.ctrlKey) {
				if (event.which == 13)	//Enter
					with ((event.shiftKey) ? post : preview)
						click();
				else if (event.which == 81)	//Q
					quote(event);
			}
			event.stopPropagation();
		}
	}
	
	if (Compose) {
		var Body = $("body");
		if (Body) {
			markup();
			var ActionBlocks = document.getElementsByClassName("actions");
			var Actions = ActionBlocks[ActionBlocks.length - 1].getElementsByTagName("input");
			Actions[0].title = "Ctrl + Enter";
			Actions[1].title = "Ctrl + Shift + Enter";
			document.addEventListener("keydown", function(event) {hotkeys(Actions[0], Actions[1], event)}, false);
			document.forms[1].addEventListener("submit", function() {
				with (Body)
					value = value.replace(/( |\n|^)-- /g, "$1— ");	//convert double hyphens into dashes
			}, false)
		}
	}
	else {	//thread or PM

		// Local time
		if (GM_getValue("local_times")) {
			GM_addStyle('\
				.message_box {overflow: visible}\
				.tooltip {\
					white-space: nowrap;\
					position: absolute;\
					bottom: 23px;\
					left: -40px;\
					padding: 7px 10px;\
					-webkit-border-radius: 5px;\
					border-radius: 5px;\
					border-color: rgba(0, 0, 0, 0.75);\
					background: rgba(0, 0, 0, 0.75);\
					color: white;\
					font-size: 12px !important;\
				}\
				.tooltip:after {\
					content: "";\
					position: absolute;\
					top: 100%;\
					left: 39px;\
					border-left: 6px solid transparent;\
					border-right: 6px solid transparent;\
					border-top: 6px solid;\
					border-top-color: inherit;\
				}'
			);
			var d = new Date();
			var localOffset = d.getTimezoneOffset() * 60000; //ms
			var Seattle = d.getTime() + localOffset - 28800000; //UTC-8
			var SeattleOffset = ((Seattle > Date.parse("9 Mar 2014 02:00") && Seattle < Date.parse("2 Nov 2014 01:00")) || (Seattle > Date.parse("8 Mar 2015 02:00") && Seattle < Date.parse("1 Nov 2015 01:00"))) ? 25200000 : 28800000; //if DST then 7 else 8
			var Times = Array.prototype.slice.call(document.getElementsByClassName("timestamp")).concat(Array.prototype.slice.call(document.getElementsByClassName("info")));
			for (var i = 0; i < Times.length; i++)
				with (Times[i]) {
					var D = innerHTML.match(/\w{3} \w{3}  ?\d{1,2} \d{4} \d{2}:\d{2}:\d{2}/);
					if (D) {
						d.setTime(Date.parse(D) + SeattleOffset - localOffset);
						innerHTML = innerHTML.replace(RegExp(D + "(</a>)?"), d.toString().split(" GMT")[0].replace(/0(\d \d{4})/, "$1") + '$1 <span style="position: relative; display: none;"><span class="tooltip">IMDb: ' + D.toString().replace(/  ?(\d{1,2})/, " $1") + '</span></span><img style="opacity: 0.5" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAEfSURBVHjaYpk5cyYDFEQCcQwQe0H524B4CRAvB3FY/vz5A6KbJCQkarW1tRnU1dXBqm7evOl19epVrxcvXmgCuXXMbm5ukWJi4pOcXVwZpKSkGc6ePcsgISHFICQswiApKcXw/Plz+0+fPt5i+vXrV4y6pjYDFy8/w+9/DAznz50F0yAMEgPJgdQw/fz500tJHcj5ywDGIABjgzBIDqSGBUjAFYAAyOqzZ9PBbCd3HwZnD1+QQgaQwm0Xz5/10tQzZjiwazNDfc9MBmQAlAMp3AZy45IzJw4zvH7zhsHaxRfuPhAGiYHkQGqYjY2Nr3x8/475+ZOH9oyMzAwiEjIM//8zMFw9d5Lh8O5NDE8e3G3+9+/fZMa0tDSiAhwgwABuGpEASSPR9QAAAABJRU5ErkJggg==" />');
						with (getElementsByTagName("img")[0]) {
							addEventListener('mouseover', function() {
								this.style.opacity = 1;
								unsafeWindow.jQuery(this.previousSibling).fadeIn("fast");
							}, false);
							addEventListener('mouseout', function() {
								this.style.opacity = 0.5;
								unsafeWindow.jQuery(this.previousSibling).fadeOut("fast");
							}, false);
						}
					}
				}
		}
		
		// Inline Reply/Edit
		var Action, FormURL, Loading_submit, Container, Form, Body, Preview, Submit_data, I = new Array();
		var Loading_img = "data:image/gif;base64,R0lGODlhKwALAPEAAP///1xcXK6urlxcXCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=";
		function prepareFormLoad(x) {
			Action = x;
			with (Action) {
				FormURL = href;
				style.visibility = "hidden";
				parentNode.insertAdjacentHTML('beforeend', '<img style="position: absolute; top: 24px; right: 3px" title="Loading..." src="' + Loading_img + '" />');
			}
			if (Form) Form.innerHTML = "";
			Form = document.createElement("div");
			Form.className = "board reply";
		}
		function finishFormLoad() {
			Action.parentNode.style.display = "none";
			Preview = document.createElement("div");
			with (Container) {
				appendChild(Form);
				appendChild(Preview);
				parentNode.style.minWidth = "725px";
			}
			
			//launch the posting quota timer
			(function() {
				var $ = unsafeWindow.jQuery;
				function tickTock() {
					$('.board .clock').each(function() {
						if ($(this).data('time') == 0)
							return;
						var time = $(this).data('time');
						--time;
						$(this).data('time', time);
						var mins = Math.floor(time / 60);
						if (mins > 99)
							mins = 99;
						else if (mins < 10)
							mins = '0' + mins;
						var secs = time % 60;
						if (secs < 10)
							secs = '0' + secs;
						$(this).html(mins + ':' + secs);
						if (time == 0) {
							$('.board input.submit').attr('disabled', null).removeClass('disabled');
							$('.message_box.quota').fadeOut();
						}
					});
				}
				if ($('.board .clock').size() > 0)
					window.setInterval(tickTock, 1000);
			})();
			
			with (Loading_submit = document.createElement("img")) {
				src = Loading_img;
				title = "Loading...";
				setAttribute("style", "visibility: hidden; position: absolute; top: 10px; left: 12px");
			}
			I = Form.getElementsByTagName("input");
			with (I[5]) {
				title = "Ctrl + Enter";
				addEventListener("click", function(event) {submitForm(I[5], event)}, false);
			}
			with (I[6]) {
				title = "Ctrl + Shift + Enter";
				addEventListener("click", function(event) {submitForm(I[6], event)}, false);
				parentNode.style.position = "relative";
				parentNode.appendChild(Loading_submit);
			}
			Body = Form.getElementsByTagName("textarea")[0];	//can't use getElementById() or similar
			markup();
		}
		function submitForm(action, event) {
			Form.scrollIntoView();
			I[5].style.visibility = "hidden";
			I[6].style.visibility = "hidden";
			Loading_submit.style.visibility = "visible";
			with (Body)
				value = value.replace(/( |\n|^)-- /g, "$1— ");	//convert double hyphens into dashes
			Submit_data = "_rescue=" + I[0].value + "&fs=" + I[1].value + "&cstst=" + encodeURIComponent("&auml;&reg;") + "&title=" + encodeURIComponent(I[4].value) + "&body=" + encodeURIComponent(Body.value) + "&" + action.name + "=" + action.value;
			GM_xmlhttpRequest({
				method: "POST",
				url: Form.getElementsByTagName("form")[0].action,
				data: Submit_data,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Content-Length": Submit_data.length,
					"Accept-Encoding": "IS0-8859-1",
					"Connection": "close"
				},
				onload: function(response) {
					if (action == I[5]) {
						Preview.innerHTML = '<h3>Preview:</h3><div class="comment' + response.responseText.split('<div class="comment')[1].split('<div class="actions">', 1)[0];
						Loading_submit.style.visibility = "hidden";
						I[5].style.visibility = "visible";
						I[6].style.visibility = "visible";
					}
					else if (action == I[6]) {
						Form.innerHTML = "";
						Preview.innerHTML = '<hr />' + response.responseText.match(/<div class="message_box ">\s*<div class="success">(?:\w|\W)+<div class="body">(?:\w|\W)+<br style="clear: both;">/).toString();
						Preview.getElementsByClassName("success")[0].getElementsByTagName("a")[0].addEventListener("click", function() {
							if (window.location.pathname == this.pathname)
								window.location.reload();
						}, false);
						Container.parentNode.style.minWidth = "";
					}
				}
			});
			event.stopPropagation();
			event.preventDefault();
		}
		
		document.addEventListener("keydown", function(event) {hotkeys(I[5], I[6], event)}, false);
		
		if (Thread) {
			function loadForm(event) {
				Container = this.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("body")[0];
				prepareFormLoad(this);
				GM_xmlhttpRequest({
					method: "GET",
					url: FormURL,
					onload: function(response) {
						Form.innerHTML = '<hr /><form accept' + response.responseText.split('<form accept')[1].split('</form>', 1)[0].replace(/<div class="comment(?:\w|\W)+(<h3>Your Reply:|<h3>Edit:)/,  "$1") + '</form>';
						finishFormLoad();
					}
				});
				event.stopPropagation();
				event.preventDefault();
			}
			var Reply = document.getElementsByClassName("reply");
			for (var i = 0; i < Reply.length; i++)
				Reply[i].addEventListener("click", loadForm, false);
			var Edit = document.getElementsByClassName("popover-trigger");
			for (var i = 0; i < Edit.length; i++)
				with (Edit[i])
					if (innerHTML.match("Edit"))
						addEventListener("click", loadForm, false);
		}
		else {	//PM
			function loadForm(event) {
				Container = this.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByClassName("body")[0];
				var Subj = $("comment-").getElementsByTagName("h2")[0].innerHTML;
				prepareFormLoad(this);
				GM_xmlhttpRequest({
					method: "GET",
					url: FormURL,
					onload: function(response) {
						Form.innerHTML = '<hr /><br /><form accept' + response.responseText.split('<form accept')[1].split('</form>', 1)[0].replace(/<h4>To:(?:\w|\W)+(<h4>Subject)/,  "$1") + '</form>';
						finishFormLoad();
						I[4].value = (Subj.match(/^Re:|^Re /i)) ? Subj : "Re: " + Subj;
					}
				});
				event.stopPropagation();
				event.preventDefault();
			}
			document.getElementsByClassName("actions")[0].getElementsByTagName("a")[1].addEventListener("click", loadForm, false);
		}
	}
}

if (Thread) {
	
	// Transparent signatures
	if (GM_getValue("sigs")) {
		function transparentSig() {
			var l = Post.lastIndexOf(pSig);
			Div[i].innerHTML = Post.substring(0, l) + Post.substring(l).replace(pSig, '<span style="opacity: ' + GM_getValue("sigs_opacity") + '">' + pSig + '</span>');
		}
		var pSigs = new Array(); //potential signatures (last paragraphs)
		var Sigs = new Array(); //signatures (detected)
		var Div = document.getElementsByClassName("body");
		for (var i = 0; i < Div.length; i++) {
			with (Div[i]) {
				var Post = innerHTML;
				if (Post.lastIndexOf("<br>\n<br>") > 2) {
					var pSig = Post.replace(/(<br>)*\s*(<br>)*$/, "").slice(Post.replace(/(<br>)*\s*(<br>)*$/, "").lastIndexOf("<br>\n<br>") + 9).replace(/^\s*/, "").replace(/\s*$/, "");
					for (var j in Sigs)
						if (pSig == Sigs[j]) {
							transparentSig();
							className = "body transparent-sig";
							break;
						}
					if (className != "body transparent-sig")
						for (var j in pSigs)
							if (pSig == pSigs[j]) {
								Sigs.push(pSig);
								transparentSig();
								className = "body transparent-sig";
								break;
							}
					if (className != "body transparent-sig") {
						pSigs.push(pSig);
						className = "body skipped-div";
					}
				}
			}
		}
		var Div = document.getElementsByClassName("skipped-div");
		for (var i = 0; i < Div.length; i++) {
			var Post = Div[i].innerHTML;
			var pSig = Post.replace(/(<br>)*\s*(<br>)*$/, "").slice(Post.replace(/(<br>)*\s*(<br>)*$/, "").lastIndexOf("<br>\n<br>") + 9).replace(/^\s*/, "").replace(/\s*$/, "");
			for (var j in Sigs)
				if (pSig == Sigs[j]) {
					transparentSig();
					break;
				}
		}
	}
	
	// Delete posts instantly
	var Del = document.getElementsByClassName("delete");
	for (var i = 0; i < Del.length; i++) {
		Del[i].addEventListener("click", function(event) {
			if (confirm("Do you really want to delete this post?")) {
				var Actions = this.parentNode.parentNode;
				Actions.insertAdjacentHTML('beforeend', '<img style="position: absolute; right: 0px; top: 25px" title="Deleting..." src="data:image/gif;base64,R0lGODlhKwALAPEAAP///wAAAIKCggAAACH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=" />');
				var Inputs = Actions.getElementsByTagName("input");
				var Data = "act_Delete=Delete&Comment=" + Inputs[3].value + "&From=" + Inputs[4].value + "&cstst=" + encodeURIComponent("&auml;&reg;");
				var action = Actions.getElementsByTagName("form")[0].action;
				GM_xmlhttpRequest({
					method: "POST",
					url: action,
					data: Data,
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						"Content-Length": Data.length,
						"Accept-Encoding": "IS0-8859-1",
						"Connection": "close"
					},
					onload: function() {
						$("comment-" + Inputs[3].value).style.opacity = "0.3";
						Actions.innerHTML = '<span style="font-style: italic; margin: 10px">Post deleted</span>';
					}
				});
			}
			event.stopPropagation();
			event.preventDefault();
		}, false);
	}
	
	// Link to a post
	var Permalinks = document.getElementsByClassName("permalink");
	for (var i = 0; i < Permalinks.length; i++) {
		Permalinks[i].addEventListener("click", function(event) {
			GM_setClipboard(this.href.replace(/nest|flat|thread|inline/, "view"));
			this.style.visibility = "hidden";
			this.parentNode.insertAdjacentHTML('beforeend', '<span style="font-style: italic; color: #666666; position: absolute; right: 3px; top: 22px">Link copied</span>');
			event.preventDefault();
		}, false);
	}
}
else if (document.anchors.namedItem("history")) {	// User Profile
	
	// Board display filter
	var Filter = document.createElement("select");
	Filter.innerHTML = '<option id="">All</option>';
	var Show = document.createElement("div");
	with (Show) {
		innerHTML = "Board display filter: ";
		style.marginTop = "30px";
		appendChild(Filter);
	}
	document.getElementsByClassName("boards-profile")[0].appendChild(Show);
	var boards = document.getElementsByClassName("name");
	for (var i = 2; i < boards.length; i++) {
		with (boards[i].getElementsByTagName("a")[0]) {
			var bd = getAttribute("href").split("/")[2];
			if (!Filter.innerHTML.match('"' + bd + '"'))
				Filter.insertAdjacentHTML('beforeend', '<option id="' + bd + '">' + innerHTML + '</option>');
		}
	}
	var LS = window.location.search;
	if (LS.match(/board=\w+/)) {
		var bd = LS.split("board=")[1];
		for (var i = 2; i < boards.length; i++)
			with (boards[i])
				if (getElementsByTagName("a")[0].getAttribute("href").split("/")[2] != bd)
					parentNode.style.display = "none";
		if ($(bd))
			$(bd).selected = true;
		else {
			Filter.options[0].text = bd;
			Filter.insertAdjacentHTML('beforeend', '<option id="">All</option>');
		}
		var Nav = document.getElementsByClassName("history-actions")[0].getElementsByTagName("a");
		for (var i = 0; i < Nav.length; i++)
			with (Nav[i])
				href = href.replace(/profile\//, "").replace(/(\?uc=\d+)/, "$1&board=" + bd);
	}
	Filter.addEventListener("change", function() {
		var bd = this.options[this.selectedIndex].id;
		window.location.search = LS.replace(/(\?uc=\d+\&board=)\w*/, "$1" + bd).replace(/(\?board=)\w*/, "$1" + bd).replace(/(\?uc=\d+)$/, "$1&board=" + bd).replace(/^$/, "?board=" + bd);
	}, false);
	
	// Your Profile
	if (document.getElementsByName("bio")[0]) {
		var Settings = document.createElement("div");
		with (Settings) {
			setAttribute("style", "position: absolute; bottom: 202px; left: 270px");
			innerHTML = '<h3>Script Preferences <a target="_blank" href="http://userscripts.org/scripts/show/97871"><img src="http://i.media-imdb.com/images/resume/icon_help.gif" border="0" style="vertical-align: bottom"></a></h3>\
				<style type="text/css">label {font-weight: normal !important}</style>\
				<input type="checkbox" id="sigs"><label for="sigs">Transparent signatures</label><span id="Opacity">. &#160;Opacity:&#160;<select id="scale" style="position: absolute" onChange="this.style.opacity=this.value" onMouseOver="this.style.opacity = 1" onMouseOut="this.style.opacity = this.value"><option value="1">100%</option><option value="0.9">90%</option><option value="0.8">80%</option><option value="0.7">70%</option><option value="0.6">60%</option><option value="0.5">50%</option><option value="0.4">40%</option><option value="0.3">30%</option><option value="0.2">20%</option><option value="0.1">10%</option></select></span><br />\
				<input type="checkbox" id="local_times"><label for="local_times">Local time in threads and PMs</label>';
		}
		with (document.getElementsByClassName("actions")[0].parentNode){
			style.position = "relative";
			appendChild(Settings);
		}
		var Options = "sigs local_times".split(" ");
		for (var i in Options)
			$(Options[i]).checked = GM_getValue(Options[i]);
		with ($("scale")) {
			style.opacity = GM_getValue("sigs_opacity", 1);
			selectedIndex = 10 - 10 * GM_getValue("sigs_opacity", 1);
		}
		$("Opacity").style.display = ($("sigs").checked) ? "inline" : "none";
		$("sigs").addEventListener("change", function() {
			$("Opacity").style.display = (this.checked) ? "inline" : "none";
		}, false);
		document.getElementsByName("act_Save")[0].addEventListener("click", function() {
			for (i in Options)
				GM_setValue(Options[i], $(Options[i]).checked);
			GM_setValue("sigs_opacity", $("scale").value);
		}, false);
		document.getElementsByName("Reset")[0].style.display = "none";
		
		// Delete posts from profile
		GM_addStyle(".boards.history .title {width: 390px}\
				button.delete {position: absolute; right: 2px; height: 20px; width: 20px; border: none; background: url('http://i.media-imdb.com/images/rating/rating-big/sprite.png');}\
				button.delete:hover {background-position: 0 -20px !important;}\
				button.deleting {cursor: default; position: absolute; right: 3px; top: 3px; height: 16px; width: 16px; border: none; background: url('data:image/gif;base64,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');}");
		var confirmed = false;
		for (var i = 2; i < boards.length; i++) {
			var Delete = document.createElement("button");
			with (Delete) {
				className = "delete";
				title = "Delete";
				addEventListener("click", function(event) {
					if (confirmed) {
						this.blur();
						this.className = "deleting";
						this.title = "Deleting...";
						var A = this.parentNode.getElementsByTagName("a")[1];
						var A_Split = A.pathname.split("/");
						var Data = "act_Delete=Delete&Comment=" + A.search.split("=")[1] + "&From=" + A_Split[2] + "&cstst=" + encodeURIComponent("&auml;&reg;");
						var X = this;
						GM_xmlhttpRequest({
							method: "POST",
							url: A.pathname,
							data: Data,
							headers: {
								"Content-Type": "application/x-www-form-urlencoded",
								"Content-Length": Data.length,
								"Accept-Encoding": "IS0-8859-1",
								"Connection": "close"
							},
							onload: function() {
								X.parentNode.classList.remove("odd", "even");
								X.parentNode.style.opacity = "0.3";
								X.style.display = "none";
							}
						});
					}
					else if (confirm("Do you really want to start deleting your posts from this page?")) {
						confirmed = true;
						this.click();
					}
					event.stopPropagation();
					event.preventDefault();
				}, false);
			}
			with (boards[i].parentNode) {
				style.position = "relative";
				appendChild(Delete);
			}
		}
	}
}

// Make the new PM link bold
with (document.getElementsByClassName("pms")[0])
	if (innerHTML.match("unread"))
		innerHTML = innerHTML.bold();

})();