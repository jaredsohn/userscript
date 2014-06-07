// ==UserScript==
// @name			OWA Quick Look 2
// @description		Quick Look-style functionality for Outlook Web Access
// @namespace		http://mike.eire.ca/
// @include			https://*/exchange/*/*/?Cmd=contents
// @include			https://*/exchange/*/*/?Cmd=contents*
// @include			http://*/exchange/*/*/?Cmd=contents
// @include			http://*/exchange/*/*/?Cmd=contents*
// ==/UserScript==
/*
var styles = [
	'#oqlNode {position: absolute; width: 600px; max-height: 95%; top: 10%; left: 10%; background: #333; opacity: 0.9; -moz-border-radius: 10px;}',
	'#oqlNode #shadowHeader, #oqlNode #shadowFooter {font-size: 11px; font-weight: bold; color: white; opacity: 1.0; font-family: "Lucida Grande", sans-serif;}',
	'#oqlNode #shadowHeader {position: relative; text-align: center; height: 16px; padding: 4px 20px;}',
	'#oqlNode #shadowCloser {position: absolute; top: 3px; left: 4px;}',
	'#previewNode {width: 586px; height: 350px; top: 15px; left: 5px; overflow: auto; opacity: 1.0; border: 2px solid black; color: black; background: white; font-size: 12px; margin: 0; padding: 0 5px}',
	'#oqlNode #shadowFooter {height: 25px; padding: 0; margin: 5px 30px; width: 540px;}',
	'#oqlNode #shadowFooter a {text-decoration: none; color: white; background: transparent; display: block; float: left; width: 74px; border: 1px solid white; text-align: center; margin: 0 5px; padding: 2px;}',
	'#oqlNode #shadowFooter a:hover {color: black; background: white; border: 1px solid black;}',
	'tr.oqlSelected {background-color: #66f}',
	'tr.oqlCurrent {border: 1px dotted #999}',
	'#messageTable {border-collapse: separate !important}'
];
//can't create a stylesheet, must append rules to an existing one
var styleSheet = document.styleSheets[document.styleSheets.length - 1];
for (var i=0; i < styles.length; i++) {
	styleSheet.insertRule(styles[i], 0);
}
*/

var s = document.createElement('style');
s.innerHTML = '#oqlNode {position: absolute; width: 600px; max-height: 95%; top: 10%; left: 10%; background: #333; opacity: 0.9; -moz-border-radius: 10px;}\n\
#oqlNode #shadowHeader, #oqlNode #shadowFooter {font-size: 11px; font-weight: bold; color: white; opacity: 1.0; font-family: "Lucida Grande", sans-serif;}\n\
#oqlNode #shadowHeader {position: relative; text-align: center; height: 16px; padding: 4px 20px;}\n\
#oqlNode #shadowCloser {position: absolute; top: 3px; left: 4px;}\n\
#previewNode {width: 586px; height: 350px; top: 15px; left: 5px; overflow: auto; opacity: 1.0; border: 2px solid black; color: black; background: white; font-size: 12px; margin: 0; padding: 0 5px}\n\
#oqlNode #shadowFooter {height: 25px; padding: 0; margin: 5px 30px; width: 540px;}\n\
#oqlNode #shadowFooter a {text-decoration: none; color: white; background: transparent; display: block; float: left; width: 74px; border: 1px solid white; text-align: center; margin: 0 5px; padding: 2px;}\n\
#oqlNode #shadowFooter a:hover {color: black; background: white; border: 1px solid black;}\n\
tr.oqlSelected {background-color: #66f}\n\
tr.oqlCurrent {border: 1px dotted #999}\n\
#messageTable {border-collapse: separate !important}';
document.getElementsByTagName('head')[0].appendChild(s);

//set up the div
oqlNode = document.createElement('div');
oqlNode.id = 'oqlNode';
unsafeWindow.document.body.appendChild(oqlNode);

var selectedMessages = [], lastSelectedMessage;
var messages = document.getElementsByTagName('table')[4].rows;
document.getElementsByTagName('table')[4].id = 'messageTable';

//add click listener to the message rows
for(var i = 1, tr; (tr = messages[i]); i++) {
	tr.addEventListener('click', function(e) {
		if (e.target.tagName.toLowerCase() === 'input') return;
		//don't catch double click
		if (e.detail === 2) return;
		e.stopPropagation();
		e.preventDefault();
		//selecting a range of rows
		if (e.shiftKey === true && lastSelectedMessage) {
			var st = lastSelectedMessage;
			var fi = this;
			lastSelectedMessage = this;
			dom.stripClass(this.parentNode, 'oqlCurrent', 'tr');
			dom.addClass(this, 'oqlCurrent');
			if (fi.rowIndex - st.rowIndex !== 0) {
				var down = ((fi.rowIndex - st.rowIndex) > 0) ? false : true;
				while (fi != st) {
					dom.addClass(fi, 'oqlSelected');
					selectedMessages[selectedMessages.length] = fi;
					fi = (down) ? fi.nextSibling : fi.previousSibling;
				}
				return;
			}
		}
		//selecting multiple rows
		if ((e.ctrlKey === true || e.metaKey === true) && lastSelectedMessage) {
			lastSelectedMessage = this;
			dom.addClass(this, 'oqlSelected');
			dom.stripClass(this.parentNode, 'oqlCurrent', 'tr');
			dom.addClass(this, 'oqlCurrent');
			selectedMessages[selectedMessages.length] = this;
			return;
		}
		//deselecting a selected item
		if (dom.hasClass(this, 'oqlSelected')) {
			dom.stripClass(this.parentNode, ['oqlCurrent', 'oqlSelected'], 'tr');
			selectedMessages = [];
			lastSelectedMessage = undefined;
		}
		//selecting a single row
		else {
			//clear existing selections
			dom.stripClass(this.parentNode, ['oqlCurrent', 'oqlSelected'], 'tr');
			dom.addClass(this, 'oqlCurrent');
			dom.addClass(this, 'oqlSelected');
			selectedMessages = [this];
			lastSelectedMessage = this;
		}
	}, false);
}

document.body.addEventListener('keydown', function(e){
	if (e.keyCode === 27) clearBoxes();
	else if (e.keyCode === 32) {
		if (selectedMessages.length === 0) {
			return;
		}
		else {
			e.stopPropagation();
			e.preventDefault();
			quickLook(lastSelectedMessage);
		}
	}
}, true);

function quickLook(messageRow) {
	var url = messageRow.childNodes[1].childNodes[0].childNodes[0].href;
	if (!url) return;
	GM_xmlhttpRequest({
		method: 'GET',
		url: url,
		onerror: function(ret) {GM_log(ret.status + ' ' + ret.statusText + '\n' + ret.responseText);},
		onload: function(ret) {
			if (ret.status !== 200) return;
			//get some info
			var sortOrder = messageRow.parentNode.rows[0].innerHTML.match(/SortOrder=(\w*)/)[1];
			var deleteBox = messageRow.getElementsByTagName('input')[0];
			//mark it 'read'
			var bs = messageRow.getElementsByTagName('b');
			for (var i = 0, img; i < bs.length; i++) {
				bs[i].style.fontWeight = 'normal';
				img = bs[i].getElementsByTagName('img');
				if (img.length === 1) img[0].src = img[0].src.replace(/unread/, 'read');
			}
			dom.stripClass(messageRow.parentNode, 'oqlCurrent', 'tr');
			dom.addClass(messageRow, 'oqlCurrent');
			//put the message document into a temp node for parsing
			var tempNode = document.createElement('div');
			tempNode.innerHTML = ret.responseText;
			var scripts = tempNode.getElementsByTagName('script');
			var msgID = dom.getChildElementsByName(tempNode, 'MsgID')[0].value;
			var msgBody, tableNode, tables = tempNode.getElementsByTagName('table');
			//go through the various tables getting what we need
			for (i = 0; (tableNode = tables[i]); i++) {
				if (tableNode.rows[0].className === 'trToolbar') {
					var isMeeting = (tableNode.rows[0].cells[0].childNodes[0].title === 'Accept') ? true : false;
					//get reply links
					var links = {
						reply: isMeeting ? undefined : tableNode.rows[0].cells[0].childNodes[0].href,
						replyAll: isMeeting ? undefined : tableNode.rows[0].cells[2].childNodes[0].href,
						forward: isMeeting ? undefined : tableNode.rows[0].cells[4].childNodes[0].href,
						accept: isMeeting ? tableNode.rows[0].cells[0].childNodes[0].href : undefined,
						tentative: isMeeting ? tableNode.rows[0].cells[2].childNodes[0].href : undefined,
						decline: isMeeting ? tableNode.rows[0].cells[4].childNodes[0].href : undefined,
						msg: messageRow.childNodes[1].childNodes[0].childNodes[0].href
					}
				}
				if (tableNode.id === 'idReadMessageHeaderTbl') {
					//get header info
					var headers = {
						from: tableNode.rows[0].cells[1].textContent.replace(/^\s/, ''),
						date: tableNode.rows[0].cells[3].textContent.replace(/^\s/, ''),
						to: isMeeting ? undefined : tableNode.rows[1].cells[1].textContent.replace(/^\s/, ''),
						cc: isMeeting ? undefined : tableNode.rows[2].cells[1].textContent.replace(/^\s/, ''),
						required: isMeeting ? tableNode.rows[1].cells[1].textContent.replace(/^\s/, '') : undefined,
						optional: isMeeting ? tableNode.rows[2].cells[1].textContent.replace(/^\s/, '') : undefined,
						subject: isMeeting ? tableNode.rows[4].cells[1].textContent.replace(/^\s/, '') : tableNode.rows[3].cells[1].textContent.replace(/^\s/, '')
					}
				}
				if (tableNode.className === 'tblMsgBody') {
					break;
				}
				tableNode = null;
			}
			if (tableNode) {
				//get message body
				msgBody = tableNode.rows[0].cells[0].innerHTML;
			}
			else {
				msgBody = bodyText;
			}
			tempNode = undefined;
			//so we don't have 2 scroll bars fighting
			document.body.style.overflow = 'hidden';
			messageRow.scrollIntoView(false);
			oqlNode = $('oqlNode');

			//ooh, lazy programmer abandons dom node creation methods
			oqlNode.innerHTML = '\n\
<div id="shadowHeader">\n\
	<img id="shadowCloser" src="data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%12%00%00%00%12%08%06%00%00%00V%CE%8EW%00%00%01xiCCPICC%20Profile%00%00x%9C%95%91%3FKBa%14%87%9F%F7J%B4%98.%97h%BC%90%85%83%85(AQK%3AD%D0p%13%07%95%16%BD%EA%CD0%7D%B9%DE%AC%A0%8F%D0%20%B4TKV_%A0!j%0A%DC%A3%16A%1A%A2%CF%10%08-!%B7%E1-%5C%8A%EA%07%07%9E%F3%E3%C0%F9%07%DAu%5E%CA%AA%06l%D7%5C%27%B5%9202%D9%9C1%FA%84F%00%00%F2VC.%9B%E6%1A%3F%EA%AD%87%00%E8%CE%E4%A5%AC%FE%5C%F7%AD%FCN%26%9B%03%A1%03%BA%AD8%0C%E8%05%C5K%80%BE%EBJ%17%84%09%E8%D6f%BE%08%A2%08D%9Ct*%09%A2%05%04l%C5m%20PP%7C%05%04%9A%96%ED%82%E8%00%D1Z%B1R%03%F1%0A%CC%17K%0D%0B%B40%60%5B%D2qAk%01%A1L6g%A8%D1%EAmX%98%04%DF%E1%D0%2B%1C%C3%ED%1DL%DC%0F%BD%D0%19%04%17%E1%E6q%E8%F5%D7%11%80%18%EF6%CA%F1%18%00%C2%9F%84%91%17%CF%EBO%C1%E8%11%0CZ%9E%F7~%EEy%83%0B%F0%3DCg%CB%DAq%9A%9Fw%11Z%1C~%CB%D5n*W%3F%00%D5%F7%7BV%FB%03%10%85%CB%1E%A4%0F%60%ED%01NNa%BA%0C%C1%0D0%FD%90%5E%40%8B%CF%7D%85%BA%15%00c%8D%D4J%C20%9Dz%B9R-%FD%E7%D1%7F%91%5B%DAs%01%92u%B9%EFT%ECM%D7X%96%B2Z%8A%18%AB5k6b%C4%A2%D1y%3E%00%CF%B2i%0A!%DE%B8%DF%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%9A%9C%18%00%00%01%7BIDAT8%8D%AD%D4%B1n%D4%40%10%C6%F1%DF%9A%B3%84%A0%A4%B8%02D%03%BA%22%8A%22Q%C5~%05%1A%0A*%F6-x%07%5E%C5GM%0F%B5%5D%9F%0E%8A(U%24%A4D%E2%DA%03%E9PLa%3B%EC-G%40%88Or3%E3%F9%EFx%F6%1B%07%BF%AA%C4%11%9E%E21%1E%8C%F1%0D.p%8EO%D8%A5E!%83%2CP%E1%E4%C0%01%A9V%E8p6%05%EE%24%C9gx%8E%27%7F%80%C0%1C%8F%F0%15%97)h1B%E6c%97%D3%93%2B%CD%DD%1F%DF%FF%82Ma%98I%95%40%CA%18%E3n%8C%CF%12%C8%2C%CB%85%B1%A6BY%18%06%7B3%93%18%E3%B6i%9A%D3%B6m%03%8A%110C%D1%B6mh%9A%E64%C6%B8M%0E8%C1Q%C0K%D4I%EBe%DB%B6%A1%AA%AA%E3%AE%EB%D6u%5D%F7p%20%B6C%3F%D6%B5%01%AF%F10%FB%84%22-%84%0Cr%8D%EFI%CD%E7%807%B8%9B%0Du%0F%06%B7%40%E0%5B%E1%3F%A908%F6%B7%DDt%5D%B7%EE%BAn%5DU%D5qv%01%A96%85%C1%F6%93B%0E%A9%EB%BA%AF%EB%BA%3F%00K%7DvQ%18v%E7F1%C6%ED%81%C1%5E%A7%B0%EC%FA%E1%3C%18%CC%F5%CA%E0%87%C9%90%DB%E5ry%CF%FE%60g(%92%DCt%FD%2B%BC%9D%DA%5B%E0%85%9F%EE%9E%D4%DBW%9E%BB%C2%3B%9CM%BB%B61%2C%E0%DC%B0C%7F%A3%2B%BC%C7G%F6%B7%FF%D2%B0%80%E5%08%BCM%2B%7C%98%20y%AB%93%FE%E9%C7%F6%03%1EF%A2z%8A%97%07%8C%00%00%00%00IEND%AEB%60%82" alt="close">\n'
	+ headers.subject + '\n\
</div>\n\
<div id="previewNode">\n'
	+ msgBody +
'</div>\n\
<div id="shadowFooter">\n\
	<a id="shadowReplier" href="' + (links.accept || links.reply) + '" target="viewer">' + (isMeeting ? 'Accept' : 'Reply') + '</a>\n\
	<a id="shadowReplier2" href="' + (links.tentative || links.replyAll) + '" target="viewer">' + (isMeeting ? 'Tentative' : 'Reply to All') + '</a>\n\
	<a id="shadowDeleter" href="' + (links.decline || links.msg) + '" target="viewer">' + (isMeeting ? 'Decline' : 'Delete') + '</a>\n\
	<a id="shadowOpener" href="' + links.msg + '" target="viewer">Fullscreen</a>\n\
	<a id="shadowNext" href="' + links.msg + '" target="viewer">Next</a>\n\
	<a id="shadowPrev" href="' + links.msg + '" target="viewer">Previous</a>\n\
</div>';
			oqlNode.style.display = 'block';
			oqlNode.style.left = (self.document.body.offsetWidth / 2) - (oqlNode.offsetWidth / 2) + 'px';
			oqlNode.style.top = self.document.body.scrollTop + 20 + 'px';
			for (i = 0; i < scripts.length; i++) if (scripts[i].src) oqlNode.appendChild(scripts[i]);
			$('shadowCloser').addEventListener('click', clearBoxes, false);
			$('shadowDeleter').addEventListener('click', function(e){
				//delete the message in the background and move to the next one
				e.stopPropagation();
				e.preventDefault();
				GM_xmlhttpRequest({
					method: 'POST',
					url: window.location.href,
					headers: {'Content-type': 'application/x-www-form-urlencoded'},
					data: 'Cmd=delete&MsgID=' + msgID,
					onerror: function(ret) {GM_log(ret.status + ' ' + ret.statusText + '\n' + ret.responseText);},
					onload: function(ret) {
						var nextRow;
						if (selectedMessages.length < 2) {
							nextRow = (sortOrder === 'descending') ? messageRow.previousSibling : messageRow.nextSibling;
						}
						else {
							nextRow = messageRow;
							do {
								if (!nextRow.nextSibling) {
									nextRow = undefined;
									break;
								}
								nextRow = nextRow.nextSibling;
							} while (!dom.hasClass(nextRow, 'oqlSelected'));
						}
						messageRow.parentNode.removeChild(messageRow);
						if (nextRow && nextRow.rowIndex !== 0) {
							quickLook(nextRow);
						}
						else {
							clearBoxes();
						}
					}
				});
			}, false);
			$('shadowNext').addEventListener('click', function(e){
				//move to the next message in the selection, or chronologically otherwise
				e.stopPropagation();
				e.preventDefault();
				var nextRow;
				if (selectedMessages.length < 2) {
					nextRow = (sortOrder === 'descending') ? messageRow.previousSibling : messageRow.nextSibling;
				}
				else {
					nextRow = messageRow;
					do {
						if (!nextRow.nextSibling) {
							nextRow = undefined;
							break;
						}
						nextRow = nextRow.nextSibling;
					} while (!dom.hasClass(nextRow, 'oqlSelected'));
				}
				if (nextRow) quickLook(nextRow);
			}, false);
			$('shadowPrev').addEventListener('click', function(e){
				//move to the previous message
				e.stopPropagation();
				e.preventDefault();
				var prevRow;
				if (selectedMessages.length < 2) {
					prevRow = (sortOrder === 'descending') ? messageRow.nextSibling : messageRow.previousSibling;
				}
				else {
					prevRow = messageRow;
					do {
						if (!prevRow.previousSibling) {
							prevRow = undefined;
							break;
						}
						prevRow = prevRow.previousSibling;
					} while (!dom.hasClass(prevRow, 'oqlSelected'));
				}
				if (prevRow) quickLook(prevRow);
			}, false);
		}
	});
}

function clearBoxes() {
	if ($('previewNode')) {
		$('previewNode').innerHTML = '';
		$('previewNode').style.display = 'none';
	}
	if ($('oqlNode')) {
		$('oqlNode').style.display = 'none';
		$('oqlNode').innerHTML = '';
	}
	document.body.style.overflow = 'auto';
	if (lastSelectedMessage) lastSelectedMessage.getElementsByTagName('input')[0].focus();
}

function $(el) {
	var ret;
	if (typeof el === 'string') {
		ret = document.getElementById(el);
	}
	else if (el.length) {
		ret = [];
		for (var i = 0; i < el.length; i++) ret[ret.length] = $(el[i]);
	}
	else ret = el;
	return ret;
}

function $$(cn, root, type) {
	root = root || document;
	type = type || '*';
	var ret = [], els = root.getElementsByTagName(type);
	for (var i = 0, el; (el = els[i]); i++) {
		if (dom.hasClass(el, cn)) ret[ret.length] = el;
	}
	return ret;
}

var dom = {
	getRegion: function(el) {
		var top = el.offsetTop;
		var left = el.offsetLeft;
		var width = el.offsetWidth;
		var height = el.offsetHeight;
		var parent = el.offsetParent;
		do {
			top += parent.offsetTop;
			left += parent.offsetLeft;
		} while (parent = parent.offsetParent);
		return {top: top, left: left, width: width, height: height};
	},

	hasClass: function(el, cn) {
		if (!el.className) return false;
		var re = this.classRegex(cn);
		return (re.test(el.className));
	},

	addClass: function(el, cn) {
		if (!this.hasClass(el, cn)) {
			if (el.className) cn = ' ' + cn;
			el.className += cn;
		}
	},

	removeClass: function(el, cn) {
		if (this.hasClass(el, cn)) {
			var re = this.classRegex(cn);
			var c = el.className;
			el.className = c.replace(re, ' ');
			this.removeClass(el, cn);
		}	
	},

	stripClass: function(el, cn, type) {
		type = type || '*';
		if (typeof cn === 'object') {
			cn = '(' + cn.join(')|(') + ')';
		}
		var c, re = this.classRegex(cn), els = el.getElementsByTagName(type);
		for (var i = 0, e; (e = els[i]); i++) {
			this.removeClass(e, cn);
		}
	},

	classRegex: function(cn) {
		return new RegExp('(?:^|\s+)' + cn + '(?:\s+|$)');
	},

	trimString: function(s) {
		return s.replace(/^\s+|\s+$/g, "");
	},

	getChildElementsByName: function(el, nm) {
		el = $(el);
		if (!el) return false
		var ret = [], els = el.getElementsByTagName('*');
		for (var i = 0, e; (e = els[i]); i++) {
			if (!e.name) continue;
			if (e.name === nm) ret[ret.length] = e;
		}
		return ret;
	}
}