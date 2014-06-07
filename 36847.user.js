// ==UserScript==
// @name           Popodeus Forum Search
// @namespace      http://popodeus.com
// @description    Popmundo.com Forum Search engine and power tool
// @include        http://www*.popmundo.com/Common/*
// @include        http://popodeus.com/*
// @require        http://popodeus.com/scripts/common-1.1.js
// @version        5
// @copyright	   (c) copyright 2008-2011 Popodeus.com
// ==/UserScript==
/*
 THIS SCRIPT IS PROVIDED AS-IS. NO WARRANTY IS GRANTED OF ANY KIND.
 If you don't like the script, you are free to stop using it anytime you want.

 Redistribution and use in source and binary forms are permitted
 provided that the above copyright notice and this paragraph are
 duplicated in all such forms and that any documentation,
 advertising materials, and other materials related to such
 distribution and use acknowledge that the software was
 developed by Popodeus.com.  The name Popodeus.com may not be used
 to endorse or promote products derived from this software
 without specific prior written permission.

 (c) copyright 2008-2009 Popodeus.com
 All rights reserved.
 */

var script_version = 5;
window.addEventListener('load', function() {
	// ========================================================================================
	var W_HELP = "(HELP)";
	var W_PROMPT_TEXT = 'Search field \"{1}\" for what value?';
	var W_PROMPT_DEFAULT = 'search word(s)';
	var W_CLOSE = '[X] Close';
	// ========================================================================================
	var SETTING_SEARCHFORM_POSITION = 'searchform.position';
	var loc = location.href.toLowerCase();

	function $(id) {
		return document.getElementById(id);
	}

	if (loc.indexOf('popodeus.com/forum-search/help.jsp') >= 0) {
		var my = $('my_version');
		var vvv = parseInt($('last_version').innerHTML);
		my.innerHTML = script_version;
		if (vvv > script_version) my.className = 'old';
		return;
	}

	var hotness_ratings = {
		500:'cctiresome',
		200:'ccuberhot',
		100:'ccsupahot',
		21:'cchot',
		2:'cc'
	};

	function X(xpath) {
		var elem = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		if (elem && elem.snapshotLength >= 1) {
			return elem.snapshotItem(0);
		}
		else return null;
	}
	function X2(xpath) {
		return document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	function getElementsByClass(searchClass, node, tag) {
		var classElements = new Array();
		if (node == null) node = document;
		if (tag == null) tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
		for (var i = 0, j = 0; i < elsLen; i++) {
			if (pattern.test(els[i].className)) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}
	function elem(name, attrs, style, text) {
		var key, e = document.createElement(name);
		if (attrs) {
			for (key in attrs) {
				if (key == 'class' || key == 'className') e.className = attrs[key];
				else if (key == 'id') e.id = attrs[key];
				else e.setAttribute(key, attrs[key]);
			}
		}
		if (style) for (key in style) e.style[key] = style[key];
		if (text) e.appendChild(document.createTextNode(text));
		return e;
	}
	function insertAfter(parent, newnode, referenceNode) {
		parent.insertBefore(newnode, referenceNode.nextSibling);
	}
	function getWord() {
		var retval = arguments[0];
		for (var i = 1; i < arguments.length; i++) {
			retval = retval.replace("{" + i + "}", getWord(arguments[i]));
		}
		return retval;
	}

	// ========================================================================================

	function revealLinkDomains(offset) {
		var divs = getElementsByClass('shrink', document, 'table');
		if (!offset) offset = 0;
		for (var i = offset; i < divs.length; i++) {
			var div = divs[i];
			var alinks = div.getElementsByTagName('a');
			for (var j = 0; j < alinks.length; j++) {
				var link = alinks[j];
				if (!link.href.match(/.*www[0-9]+\.(popmundo)\.com/)) {
					var domain = link.href.split('/', 3)[2];
					var spl = domain.split('.');
					var allnumeric = true
					for (var k = 0; k < spl.length; k++) {
						if (isNaN(spl[k])) {
							allnumeric = false;
							break;
						}
					}
					if (allnumeric) {
						// show it all
						domain = '<a style="cursor: help" target="_blank" href="http://www.dnsstuff.com/tools/whois.ch?ip=' + domain + '">' + domain + '</a>';
					} else {
						if (spl.length >= 3) {
							if (spl[spl.length - 2] == 'co' || spl[spl.length - 2] == 'com') {
								domain = spl[spl.length - 3] + '.' + spl[spl.length - 2] + '.' + spl[spl.length - 1];
							} else {
								domain = spl[spl.length - 2] + '.' + spl[spl.length - 1];
							}
						}
					}
					var filetype = ''; // TODO jpg, mov, swf etc.
					var urlinfo = filetype + domain ;
					var test = elem('span', {className:'domi'});
					test.innerHTML = ' [' + urlinfo + ']';
					insertAfter(link.parentNode, test, link);
					link.setAttribute('title', link.href);
					link.parentNode.appendChild(elem('div',null,null,link.href));
				} else {
					var m = link.href.match(/action=view&CharacterID=(\d+)/)
					if (m) {
						insertAfter(link.parentNode,
								elem('span', {className:'charid'}, null, " ["+m[1]+"]"),
								link);
					}
				}
			}
		}
	}
	function getCheckedValue(form, radiogroup) {
		if (!form) return "";
		for (var i = 0; i < form.elements.length; i++) {
			var elm = form.elements[i];
			if (elm.name == radiogroup && elm.checked) {
				return elm.value;
			}
		}
		return "";
	}

	var subscribed = [ ];
	function searchHandler(evt) {
		var elm = $('keywords');
		var form = $('searchform');
		var btn = this;
		if (!elm) {
			return;
			//elm = X('/html/body/table[3]/tbody/tr[1]/td[3]/table[3]/tbody/tr/td/form/input[1]');
		}

		if (location.href.indexOf('ommon/Search.asp') >= 0) {
			if (getCheckedValue(form, 'Category') != 'XForum') {
				// Use popomundo.com own internal search engine
				form.submit();
				return;
			}
		}
		// Use external search engine, hosted on Photodeus.com
		if (elm) {
			var words = elm.value;
			if (words && words.length > 0) {
				var server = location.host.match(/\d+/);
				var requrl = 'http://popodeus.com/forum-search/legacy.jsp?gm=&server=' + server
						+ '&q=' + encodeURIComponent(words)
						+ "&f=" + encodeURIComponent(subscribed)
						+ "&ver=" + script_version + "&cid=" + GM_getValue('cid');
				if (X('//input[@name="rdup"]').checked) requrl += "&rdup=ok";
				var age = 0;
				var tmp = X2('//input[@name="age"]');
				for (i = 0; i < tmp.snapshotLength; i++) {
					var r = tmp.snapshotItem(i);
					if (r.checked) {
						age = r.value;
						break;
					}
				}
				requrl += "&age=" + age;
				elm.setAttribute('disabled', 'disabled');
				btn.setAttribute('disabled', 'disabled');
				GM_setValue('search', words);
				GM_xmlhttpRequest({
					method:'GET',
					url:requrl,
					onload: function(r) {
						elm.removeAttribute('disabled');
						btn.removeAttribute('disabled');
						var txt = r.responseText;
						var td = $('searchresult');
						td.innerHTML = txt;
					}
				});
			}
		}
		evt.stopPropagation();
		return false;
	}

	function help_clicked(woohaa) {
		if ($('helpwindow')) {
			return;
		}
		var pos = woohaa.target.href.toLowerCase().indexOf('common/search.asp') >= 0 ? [220, 110] : [50, 90];
		var shoff = 10;
		var w = 440;
		var h = 480;
		var x = pos[0];
		var y = pos[1];
		var helpshadow1 = elem('div', {id:'helpshadow1'},
		{position:'absolute',left:(x + w) + 'px',top:(y + shoff) + 'px',width:(shoff) + 'px',height:(h - shoff) + 'px',
			backgroundColor:'black',opacity:'0.5'}, '');
		var helpshadow2 = elem('div', {id:'helpshadow2'},
		{position:'absolute',left:(x + shoff) + 'px',top:(y + h) + 'px',width:(w) + 'px',height:(shoff) + 'px',
			backgroundColor:'black',opacity:'0.5'}, '');
		var helpwindow = elem('div', {id:'helpwindow'},
		{position:'absolute',left:(x) + 'px',top:(y) + 'px',width:(w) + 'px',height:(h) + 'px',
			backgroundColor:'white',textAlign:'center',
			border:'2px solid #134686',
			opacity:'0.93'
		});
		var closebutton = elem('div', {'className':'closebutton'}, {backgroundColor:'#FFA',cursor:'pointer',textAlign:'center',cssFloat:'right'},
				getWord(W_CLOSE));

		closebutton.addEventListener('click', function() {
			document.body.removeChild($('helpshadow1'));
			document.body.removeChild($('helpshadow2'));
			document.body.removeChild($('helpwindow'));
		}, true);
		var iframe = elem("iframe", {width:(w - 2),height:(h - 15),src:"http://popodeus.com/forum-search/help.jsp?version=" + script_version + "&cid=" + GM_getValue('cid')},
		{border:0,padding:0,margin:0});
		helpwindow.appendChild(closebutton);
		helpwindow.appendChild(iframe);
		document.body.appendChild(helpshadow1);
		document.body.appendChild(helpshadow2);
		//window.setTimeout( function() {
		document.body.appendChild(helpwindow);
		//}, 20);
		return false;
	}
	function shortcutButton(who) {
		var field = who.target.value;
		var o = $("keywords");
		var boo = o.value.length > 0 ? " AND " : "";
		var userinput = prompt(getWord(W_PROMPT_TEXT, field), getWord(W_PROMPT_DEFAULT));
		if (userinput) {
			o.value = o.value + boo + field + '"' + userinput + '"';
		}
	}

	function showSearchForm() {
		// add <link> tag into head
		document.getElementsByTagName('head')[0].appendChild(
				elem('link', {rel:'stylesheet',type:'text/css',href:'http://popodeus.com/forum-search/script.css'})
				);
		var yposition = GM_getValue(SETTING_SEARCHFORM_POSITION);
		if (!yposition) yposition = 1;
		var xpath = "id('cn')/table[" + yposition + "]/tbody";
		if (document.referrer.toLowerCase().indexOf("confv2.asp") > 0) {
			xpath = "id('cn')/table[1]"
		}
		var tbody = X(xpath);
		//GM_log(xpath + " => " + tbody);
		if (tbody) {
			var xsubscribed = X2('//a[contains(@href, "viewfolder&folderid=")]')
			for (i = 0; i < xsubscribed.snapshotLength; i++) {
				subscribed[i] = xsubscribed.snapshotItem(i).href.match(/folderid=(\d+)/)[1];
			}
			var tr = elem("tr", {bgcolor:"#E2EFF1"});
			var td = elem("td", {colspan:3});
			var b = elem("b", null, {color:"#06699"}, "SEARCH");
			td.appendChild(b);
			var span = elem("span", null, {color:"#006699"});
			span.innerHTML = ' - Powered by <a href="http://popodeus.com/" target="_blank">Popodeus.com</a> Forum Search';
			var helplink = elem("a", {href:"#"}, null, getWord(W_HELP));
			helplink.addEventListener("click", help_clicked, false);
			span.appendChild(document.createTextNode(' '));
			span.appendChild(helplink);
			td.appendChild(span);

			var img = elem('img', {src:'http://popodeus.com/scripts/gfx/arrow_down.png',title:'Move search form down'},
			{marginLeft:'4px',position:'relative',cursor:'pointer'});
			img.addEventListener('click', function() {
				var ypos = GM_getValue(SETTING_SEARCHFORM_POSITION);
				if (!ypos) ypos = 1;
				if (ypos < 3) ypos++;
				GM_setValue(SETTING_SEARCHFORM_POSITION, ypos);
				location.reload();
			}, false);
			td.appendChild(img);

			img = elem('img', {src:'http://popodeus.com/scripts/gfx/arrow_up.png',title:'Move search form up'},
			{marginLeft:'4px',position:'relative',cursor:'pointer'});
			img.addEventListener('click', function() {
				var ypos = GM_getValue(SETTING_SEARCHFORM_POSITION);
				if (!ypos) ypos = 1;
				if (ypos > 1) ypos--;
				GM_setValue(SETTING_SEARCHFORM_POSITION, ypos);
				location.reload();
			}, false);
			td.appendChild(img);

			tr.appendChild(td);
			tbody.appendChild(tr);

			tr = elem("tr");
			//td = elem("td", null, null, 'Keyword(s):');
			//tr.appendChild(td);
			var input = elem("input", {id:'keywords',name:'keywords',type:'text',size:'50',value:GM_getValue('search')});
			td = elem("td", {colspan:3});
			td.appendChild(input);

			input = elem("input", {type:'button',value:'Search!'});
			input.addEventListener('click', searchHandler, false);
			td.appendChild(input);
			tr.appendChild(td);
			tbody.appendChild(tr);

			tr = elem("tr");
			//tr.appendChild(elem("td"));
			td = elem("td", {colspan:3});
			input = elem("input", {type:'button',value:'topic:'});
			input.addEventListener('click', shortcutButton, false);
			td.appendChild(input);

			input = elem("input", {type:'button',value:'message:'});
			input.addEventListener('click', shortcutButton, false);
			td.appendChild(input);

			input = elem("input", {type:'button',value:'from:'});
			input.addEventListener('click', shortcutButton, false);
			td.appendChild(input);

			input = elem("input", {type:'button',value:'to:'});
			input.addEventListener('click', shortcutButton, false);
			td.appendChild(input);

			//td = elem("td");
			input = elem("input", {type:'checkbox',name:'rdup',checked:'checked'});
			td.appendChild(input);
			td.appendChild(document.createTextNode('Remove duplicate threads'));
			//td.appendChild(elem('br'));

			tr.appendChild(td);
			tbody.appendChild(tr);

			tr = elem("tr");
			td = elem("td", {colspan:3});
			td.appendChild(document.createTextNode('Post max age: '));
			td.appendChild(elem('input', {type:'radio',name:'age',value:'0'}));
			td.appendChild(document.createTextNode('1 week'));
			td.appendChild(elem('input', {type:'radio',name:'age',value:'1',checked:'checked'}));
			td.appendChild(document.createTextNode('1 month'));
			td.appendChild(elem('input', {type:'radio',name:'age',value:'2'}));
			td.appendChild(document.createTextNode('6 months'));
			td.appendChild(elem('input', {type:'radio',name:'age',value:'-1'}));
			td.appendChild(document.createTextNode('No limit'));

			tr.appendChild(td);
			tbody.appendChild(tr);

			tr = elem("tr", {bgcolor:"#E2EFF1"});
			td = elem("td", {colspan:4,id:'searchresult'});
			tr.appendChild(td);
			tbody.appendChild(tr);
		}
	}

	function ClickHandler(onclickobj, idname) {
		onclickobj.setAttribute('rel', idname);
		this.handler = function(evt) {
			// <a><span>clicklink</span></a>
			var sid = evt.target.parentNode.getAttribute('rel');
			if (!sid) sid = evt.target.getAttribute('rel');
			var o = $(sid);
			if (o) {
				o.parentNode.removeChild(o);
				//o.setAttribute('style', 'display: none;');
				// TODO
				//var count = parseInt(o.innerHTML)-20;
				//if (count < 0) count = 0; else count = '+' + count;
				//o.innerHTML = count;
			} 
		};
		onclickobj.addEventListener('click', this.handler, false);
	}

	//var a = X("//a[@href='defaultconf.asp']");
	//if (a) { a.href = "http://popodeus.com/forum-search/custom/?server="+location.href.match(/www(\d+)\.pop/)[1]; }

	if (location.href.toLowerCase().indexOf("characterdetails.asp?action=view") >= 0) {
		var link = X("id('pic')/a");
		if (link) GM_setValue('cid', link.href.match(/acterID=(\d+)/)[1]);
	}

	// ========================================================================================
	if (loc.indexOf("action=viewfolder&folderid=") >= 0 ||
		loc.indexOf("action=viewfolderunread&folderid=") >= 0 ||
		loc.indexOf("menuforum.asp") >= 0) {
		document.getElementsByTagName('head')[0].appendChild(
				elem('link', {rel:'stylesheet',type:'text/css',href:'http://popodeus.com/forum-search/hotness.css'})
				);

		var spans = getElementsByClass("threadno", null, 'span');
		var RE = /(\+\d+)/;
		for (var i = 0; i < spans.length; i++) {
			var span = spans[i];
			if (span.textContent.match(RE)) {
				var sid = "more" + i;
				var numba = parseInt(span.textContent.match(RE)[0], 10);
				var cls = "cc";
				for (var rat in hotness_ratings) {
					rat = parseInt(rat);
					if (numba >= rat) {
						cls = hotness_ratings[rat];
						break;
					}
				}
				try {
					span.innerHTML = span.innerHTML.replace(RE, '<b id="' + sid + '" class="' + cls + '">$1</b>');
					var x = span.previousSibling.previousSibling;
					if (x.textContent.indexOf('[OFF]') == 0
							|| x.textContent.toLowerCase().indexOf('offtopic') == 0
							|| x.textContent.toLowerCase().indexOf('off-topic') == 0
							|| x.textContent.toLowerCase().indexOf('doctors') >= 0
							) {
						x.style.color = '#666';
					} else if (x.textContent.indexOf('[GOV]') == 0
							|| x.textContent.indexOf('[DEV]') == 0
							|| x.textContent.indexOf('[MOD]') == 0) {
						x.style.color = '#070';
					}
					new ClickHandler(x, sid);
				} catch (ex) {
				}
				//var tmp = new ClickHandler(span.previousSibling.previousSibling, sid);
			}
		}

		spans = getElementsByClass("closed", null, 'span');
		//GM_log("closed threads: " + spans.length);
		for (var i = 0; i < spans.length; i++) {
			var span = spans[i];
			span.style.color= '#88A';
			span.nextSibling.nextSibling.childNodes[0].style.fontWeight = 'normal';
			span.nextSibling.nextSibling.childNodes[0].style.color = '#999';
		}

	}

	if (location.href.indexOf('cn.asp?action=view') >= 0 || location.href.indexOf('cn.asp?a=v') >= 0) {
		revealLinkDomains();
	}

	if (location.href.match(/\/common\/cn.asp\?a(ction)?=options/i)) {
		showSearchForm();
	}

}, true);