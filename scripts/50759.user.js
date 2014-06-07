// ==UserScript==
// @name           DoubanUtil
// @namespace      http://phill84.org
// @description    small util for douban (page navi on top, floor count, ^+enter submit)
// @include        http://www.douban.com/group/topic/*
// @include        http://www.douban.com/doumail/write*
// @require        http://userscript-autoupdate-helper.googlecode.com/svn/trunk/autoupdatehelper.js
// @author         phill84
// @version        1.11
/* @reason
> Refactored
> Removed quote
@end*/
// ==/UserScript==
var thisScript = {
name:		'DoubanUtil',
id:		'50759',
version:	'1.11'
};
try {
  var updater = new Updater(thisScript);
  updater.check();
} catch (e) {}

/* get parameters from URL */
function gup(name) {
  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+name+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else
    return results[1];
}
/* ctrl+enter to submit reply */
function submit(e) {
	if (e.ctrlKey && e.keyCode == 13) {
		this.parentNode.submit();
	}
}

function sendMail(e) {
	if (e.ctrlKey && e.keyCode == 13) {
		var submitButton = document.getElementsByName('m_submit')[0];
		submitButton.click();
	}
}

var url = window.location.toString();
var isGroup = url.search("group/topic") == -1 ? false : true;
var isMail = url.search("doumail/write") == -1 ? false : true;

if(isGroup) {
	/* add style in the html head */
	var style = document.createElement('style');
	style.setAttribute('type', 'text/css');
	style.innerHTML =  'h4 p.floor{float: right;position: relative;top: -0.1em;right: 0.5em}';
	document.getElementsByTagName('head')[0].appendChild(style);

	/* copy page navigation to top of the page if exists */
	var navi = document.getElementsByClassName('paginator');
	if (navi.length > 0) {
		var article = document.getElementsByClassName('article')[0];
		var ul = article.getElementsByTagName('ul')[0];
		var div = document.createElement('div');
		div.className = 'paginator';
		div.innerHTML = navi[0].innerHTML;
		article.insertBefore(div, ul);
	}

	/* add eventListener to reply textarea if it exists */
	var last = document.getElementById('last');
	if (last != null && last.nodeName == 'TEXTAREA') {
		last.addEventListener('keydown', submit, false);
	}

	/* add sequential number an extra row for the quote button to each reply li */
	var reply = document.getElementsByClassName('topic-reply')[0];
	var threads = reply.getElementsByTagName('li');
	var start = gup('start');
	var length = threads.length;
	for(i=0;i<length;i++) {
		var classVal = threads[i].getAttribute('class');
		threads[i].setAttribute('class', classVal + ' reply');
		var h4 = threads[i].getElementsByTagName('h4')[0];
		var p = document.createElement('p');
		p.className = 'floor';
		if(start == '' || start == '0')
			p.innerHTML = (i+1)+'楼';
		else
			p.innerHTML = ((i+1)+parseInt(start, 10))+'楼';
		h4.appendChild(p);
	}
} else if(isMail) {
	var txtarea = document.getElementsByName('m_text')[0];
	if(txtarea != null || txtarea != undefined) {
		txtarea.addEventListener('keydown', sendMail, false);
	}
}
