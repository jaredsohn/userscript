// ==UserScript==
// @name           MySpace Mail Plus
// @namespace      RunningBlind
// @description    Changes the MySpace Mail inbox page a bit and adds a frame to view messages.
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox*
// ==/UserScript==

function $(obj) {return document.getElementById(obj);} //prototype javascript framework

function Element(nodeType, attributes) { //prototype javascipt framework [only basic functionality]
	e = document.createElement(nodeType);
	for (var i in attributes) {
		e[i] = attributes[i];
	}
	return e;
}

String.prototype.trim = function() {return this.replace(/^\s+|\s+$/g,'');}

function rearrange() {
	$('nav').appendChild($('rightRail'));
	$('rightRail').removeChild($('ad150xUnlimited'));//whosOnlineScroller
}

function addStyle() {
	iStatus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4' +
		'c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJxJREFUKM%2BVksENwyAMRZ9R' +
		'9ugAOTfZgBEYBGWMikEYgQ1KzhmgS%2FTaXkwETSLRf8N6tr6%2FEWr5tAAOuANvYAMiwT4KIgregAhMnCsDjmB' +
		'fRgstHKwQrFQNkzIYtXE1mabJp0XwKavnHq0DMDal2opPn5%2BG0RxmHKFGRqPr1WbK9p2K5Q7PPak2ztpiJth5' +
		'0Ifbb3G%2BQ1YG%2BfdrfAGPbC8k%2FKOJkgAAAABJRU5ErkJggg%3D%3D';
	iRead = 'data:image/gif;base64,R0lGODlhFAANAKECAICAgPf39%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAMAL' +
		'AAAAAAUAA0AAAI43ICpao0Co4SoHQHmzMBmrFGUF5RAiQanSaKrmXaOq8KvbKz3zc5vSsMdfkCXcLhIHi3MpvMJ' +
		'LQAAOw%3D%3D';
	iWhiteGrad = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAoCAYAAADHVmuAAAAAAXNSR0IA' +
		'rs4c6QAAAAZiS0dEAAAAAAAA%2BUO7fwAAAAlwSFlzAAALEwAACxMBAJqcGAAAALVJREFUOMutVFsOgDAIq8l09' +
		'z9x%2FTEGsCCZ%2BqMZs6XlATSfjeQEwCx%2BvTkA7NcBbSCeDQCzQz0AHOZvS8l4USHaNByiQnKoFjGKceoj4q' +
		'sYKcDmWdnjvIw5lvbsSdDaw05lqFSrWrfFyMq0fMy8dNQUSluIaZsxuYwlMVPMSKS%2FDWcihEv9OBVV%2FLaIi' +
		't7N9W%2Bqt09NkS6zjBqxUT5Ry22xPFzlXB8vvfjYFFUZZYeX1EwU3%2Bgn140%2Fj732HEoAAAAASUVORK5CYI' +
		'I%3D';
	s = '#main {height: auto !important; min-height: 100px !important;}\
		#rightRail {padding: 0px !important;}\
		.whosOnlineRounded {width: 159px;}\
		#whosOnlineDiv {width: 155px;}\
		.whosOnlineScroller {width: auto; height: 367px; overflow: auto;}\
		.woProfileLinkDiv {width: 78px;}\
		.olnClear img {display: none;}\
		#mainContentBlock {width: 769px;}\
		#msgAction, #msgList, #msgView {margin: 3px 0pt;}\
		#msgAction input {}\
		#msgList {border: 1px solid #cccccc;}\
		#GM_MySpaceMailAJAX table thead tr {position: relative; display: block;}\
		#GM_MySpaceMailAJAX table tbody {display: block; height: 246px; overflow: auto; width: 100%;}\
		#GM_MySpaceMailAJAX table tbody tr {border-top: 1px solid #ddd; background: transparent url('+iWhiteGrad+') repeat-x scroll center bottom;}\
		tr.active {background-color: #C8E8FF !important;}\
		#GM_MySpaceMailAJAX table td, #GM_MySpaceMailAJAX table th {width: 20px; padding: 5px 2px; text-align: left;}\
		#GM_MySpaceMailAJAX table td + td + td, #GM_MySpaceMailAJAX table th + th + th {width: 41px;}\
		#GM_MySpaceMailAJAX table td + td + td + td, #GM_MySpaceMailAJAX table th + th + th + th {width: 200px;}\
		#GM_MySpaceMailAJAX table td + td + td + td + td, #GM_MySpaceMailAJAX table th + th + th + th + th {width: 328px;}\
		#GM_MySpaceMailAJAX table td + td + td + td + td + td, #GM_MySpaceMailAJAX table th + th + th + th + th + th {width: 122px; text-align: right;}\
		#status {background: transparent url('+iStatus+') no-repeat scroll center;}\
		td.status {background: transparent none no-repeat scroll 1px 50%;}\
		td.unread {background-image: url(http://x.myspacecdn.com/Modules/Messaging/Static/img/Envelope.gif);}\
		td.read {background-image: url('+iRead+');}\
		td.replied {background-image: url(http://x.myspacecdn.com/Modules/Messaging/Static/img/Sent.gif);}\
		#GM_MySpaceMailAJAX table img {max-width: 40px; max-height: 30px;}\
		#GM_MySpaceMailAJAX a {color: #0072BA;}\
		a.name {font-size: 110%;}\
		.online {background: transparent url(http:\/\/a177.ac-images.myspacecdn.com\/images01\/59\/l_12ac26c7a736a49e68dbec859b357e88.gif) no-repeat scroll left top; padding-left:20px;}\
		#msgView {border: 1px solid #cccccc; padding: 3px; height: 400px; overflow: auto;}\
		#msgView * {max-width: 100%;}\
		#msgView #msgInfo {background-color: #e8f0ff; padding: 5px;}\
		#msgInfo img {float: left; margin: 0px .5em .5em 0px; padding: 1px; background-color: #fff; border: 1px solid #ccc;}\
		#msgInfo #reply, #msgInfo span {float: right;}\
		.msg + .msg {margin: 1em 0px; padding: 1em 0px; border-top: 1px solid #ccc; color: #333;}\
		.msg + .msg a {font-weight: normal;}\
		.msg + .msg > div span {float: right;}';
	GM_addStyle(s.replace(/}/g, '}\n'));
}

function getInfo() {
	checkAll = $('checkboxHeader');
	deleteButton = $('ctl00_ctl00_ctl00_cpMain_cpMain_messagingMain_MessageList_TrashMailButton');
	msgPagerData = $('___msPagerState').value.split(',');
	msgFirst = msgPagerData[0]*1 - ((msgPagerData[1]*1)*(msgPagerData[2]*1-1)) + 1;
	msgRows = $('messages').tBodies[0].rows;
	msgData = [];
	for (i = 1; i < msgRows.length; i++) {
		msgData[i-1] = {
			id: msgFirst-i,
			checkbox: msgRows[i].cells[0].childNodes[1],
			date: msgRows[i].cells[1].textContent.trim(),
			sender: {
				name: msgRows[i].cells[2].childNodes[1].firstChild.firstChild.title, 
				pic: msgRows[i].cells[2].childNodes[1].firstChild.firstChild.src,
				link: msgRows[i].cells[2].childNodes[1].firstChild.href,
				online: (msgRows[i].cells[2].childNodes[1].innerHTML.match('onlinenow.gif')) ? true : false
			},
			status: msgRows[i].cells[3].childNodes[1].textContent.toLowerCase(),
			subject: msgRows[i].cells[4].childNodes[1].textContent,
			link: msgRows[i].cells[4].childNodes[1].href
		};
	}
	$('messages').parentNode.innerHTML = '';
	$('messageArea').lastChild.previousSibling.id = 'GM_MySpaceMailAJAX';
	//console.log(msgData);
}

currentMsg = null; 

function setActive(num) {
	currentMsg = num;
	for (i=0; i < $('tableBody').rows.length; i++) {
		$('tableBody').rows[i].className = $('tableBody').rows[i].className.replace(' active', '');
	}
	$('msg_' + num).className += ' active';
}

function addChangeEvent(node, num) {
	node.addEventListener('click', function () {
		if (this.parentNode.childNodes[1].className == 'status unread') {
			this.parentNode.childNodes[1].className = 'status read';
		}
		setActive(num);
		changeOut(num);
	}, false);
}

String.prototype.toRgbArray = function() {
	arr = this.replace(/^rgb\((\d+, \d+, \d+)\)$/, '$1').split(', ');
	for (i in arr) arr[i] *= 1;
	return arr;
}

function highlight(objId, start, end, speed, hoverState) {
	obj = $(objId)
	if (!obj.style.backgroundColor) obj.style.backgroundColor = 'rgb('+start[0]+','+start[1]+','+start[2]+')';
	incR = Math.ceil((end[0]-start[0])/5);
	incG = Math.ceil((end[1]-start[1])/5);
	incB = Math.ceil((end[2]-start[2])/5);
	current = obj.style.backgroundColor.toRgbArray();
	if (h[objId] == hoverState) {
		if (current != end) {
			next = [
				(current[0] >= end[0]) ? Math.max(current[0]+incR, end[0]) : Math.min(current[0]+incR, end[0]), 
				(current[1] >= end[1]) ? Math.max(current[1]+incG, end[1]) : Math.min(current[1]+incG, end[1]), 
				(current[2] >= end[2]) ? Math.max(current[2]+incB, end[2]) : Math.min(current[2]+incB, end[2]), 
			];
			obj.style.backgroundColor = 'rgb('+next[0]+', '+next[1]+', '+next[2]+')';
			setTimeout(function() {highlight(objId, start, end, speed, hoverState);}, speed);
		}
	}
}

h = {}; //object for holding hover states, because registering properties to the individual elements was getting annoying :D

function createTable() {
	$('GM_MySpaceMailAJAX').appendChild(new Element('div', {id: 'msgAction'}));
	$('msgAction').appendChild(deleteButton);
	$('GM_MySpaceMailAJAX').appendChild(new Element('div', {id: 'msgList'}));
	$('msgList').appendChild(new Element('table', {id: 'msgTable'}));
	$('msgTable').appendChild(new Element('thead', {id: 'tableHead'}));
	$('tableHead').appendChild(new Element('tr'));
	$('tableHead').firstChild.innerHTML = '<th>'+checkAll.innerHTML+'</th><th id="status"></th><th></th><th>Sender</th><th>Subject</th><th>Date</th>';
	$('msgTable').appendChild(new Element('tbody', {id: 'tableBody'}));
	for (j = 0; j < msgData.length; j++) {
		$('tableBody').appendChild(new Element('tr', {id: 'msg_' + j, className: (j%2==0)?'odd':'even'}));
		$('msg_'+j).appendChild(checkbox = new Element('td', {className: 'checkbox'}));
		checkbox.appendChild(msgData[j].checkbox);
		$('msg_'+j).appendChild(new Element('td', {className: 'status ' + msgData[j].status}));
		$('msg_'+j).appendChild(new Element('td', {innerHTML: '<a href="'+msgData[j].sender.link+'"><img src="' + msgData[j].sender.pic + ' /></a>'}));
		$('msg_'+j).appendChild(new Element('td', {innerHTML: '<a class="name'+ ((msgData[j].sender.online)?' online':'') +'" href="'+msgData[j].sender.link+'">' + msgData[j].sender.name + '</a>'}));
		$('msg_'+j).appendChild(new Element('td', {innerHTML: msgData[j].subject}));
		$('msg_'+j).appendChild(new Element('td', {innerHTML: msgData[j].date.replace(/ \d{4}/, '')}));
		addChangeEvent($('msg_'+j).childNodes[3], j);
		addChangeEvent($('msg_'+j).childNodes[4], j);
		$('msg_'+j).addEventListener('mouseover', function() {h[this.id] = true; highlight(this.id, [255,255,255], [232,241,250], 100, true)}, false);
		$('msg_'+j).addEventListener('mouseout', function() {h[this.id] = false; highlight(this.id, this.style.backgroundColor.toRgbArray(), [255,255,255], 100, false)}, false);
	}
}

function changeOut(num) {
	msgView.innerHTML = '<div style="text-align: center;"><img src="http://x.myspace.com/modules/common/static/img/loadercircles.gif" /><br /><br />:: Loading Message ::</div>';
	if (!msgData[num].text || !msgData[num].replyLink || !msgData[num].script) {
		GM_xmlhttpRequest({ 
			method: 'GET',
			url: msgData[num].link,
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'},
			onload: function(responseDetails) {
				html = responseDetails.responseText.replace(/\t|\r|\n/g, '');
				msgBody = /<div id="messageBodyContainer"[^>]+>(.*?)<br \/><br \/><\/div><\/div><\/div><div class="alignR">/.exec(html);
				msgReply = /value="Reply" onclick=".*?(http:\/\/messaging\.myspace\.com\/index\.cfm\?fuseaction=mail\.reply&amp;.*?)&quot;,/.exec(html);
				msgScript = /src="(\/WebResource.axd\?[^"]+)"/.exec(html);
				msgData[num].text = msgBody[1];
				msgData[num].replyLink = msgReply[1].replace(/&amp;/g, '&');
				msgData[num].script = msgScript[1];
				extScript.src = msgData[num].script;
				showMessage(num);
			}
		});
	}
	else {
		extScript.src = msgData[num].script;
		showMessage(num);
	}
	//console.log(msgData[num]);
}

function showMessage(num) {
	msgView.innerHTML = '<div id="msgInfo"><img src="'+msgData[num].sender.pic+'" /><div><a id="reply" href="'+msgData[num].replyLink+'">Reply &raquo;</a><a class="name" href="'+msgData[num].sender.link+'">'+msgData[num].sender.name+'</a></div><div><span>'+msgData[num].date+'</span>'+msgData[num].subject+'</div></div>';
	msgView.innerHTML += dialogue(msgData[num].text);
	for (i in msgView.getElementsByTagName('div')) {
		if (msgView.getElementsByTagName('div')[i].className == 'msg' && msgView.getElementsByTagName('div')[i].childNodes.length > 2) {
			while (msgView.getElementsByTagName('div')[i].lastChild.tagName == 'BR') msgView.getElementsByTagName('div')[i].removeChild(msgView.getElementsByTagName('div')[i].lastChild)
			//while (msgView.getElementsByTagName('div')[i].childNodes[1].tagName == 'BR') msgView.getElementsByTagName('div')[i].removeChild(msgView.getElementsByTagName('div')[i].childNodes[1])
		}
	}
}

function dialogue(text) {
	//console.log(text);
	a = text.replace(/^/, '<div class="msg">');
	a = a.replace(/----------------- Original Message -----------------<br \/>From: (<a href='.*?'>.*?<\/a>)<br \/>Date: (.*?)<br \/><br \/>/g, '</div><div class="msg"><div><span>$2</span>$1</div>');
	a = a.replace(/$/, '</div>')
	return a;
}

function shortcutKeys(e) {
	//console.log(e.keyCode);
	c = e.keyCode
	if (c==67 || c==78) window.location.href = 'http://messaging.myspace.com/index.cfm?fuseaction=mail.compose';
	if (c==37) {if (currentMsg > -1) {setActive(Math.max(currentMsg-1, 0)); changeOut(currentMsg);}}
	if (c==39) {if (currentMsg > -1) {setActive(Math.min(currentMsg+1, 9)); changeOut(currentMsg);}}
	//if (c==39)
}

if ($('messages')) {
	rearrange();
	addStyle();
	getInfo();
	createTable();
	document.documentElement.firstChild.appendChild(extScript = new Element('script', {type: 'text/javascript'}));
	$('GM_MySpaceMailAJAX').appendChild(msgView = new Element('div', {id: 'msgView', innerHTML: '<div style="text-align: center">Click on any message above to view its contents here</div>'}));
	window.addEventListener('keyup', shortcutKeys, false);
	/*temp fix for header row*/
	$('tableHead').firstChild.style.display = 'inline';
	$('tableHead').firstChild.style.position = 'block';
}