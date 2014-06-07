// ==UserScript==
// @name           MySpace - Wall-To-Wall
// @namespace      RunningBlind
// @description    Shows all recent comments exchanged between two users.
// @include        http://*.myspace.com/*
// @include        http://myspace.com/*
// ==/UserScript==

version = '0.0.1'

forceComments = true; //set to true if you want make comments show up even if the user has them set to hidden.
sort = 'ascending' //the order to sort comments: ascending will give the comments from oldest to newest (IM-style) and descending will give the comments from newest to oldest (MySpace-style)

function e(elObj, parent) { //greasespot wiki
  var el;
  if (typeof elObj == 'string') {
     el = document.createTextNode(elObj);
  }
  else {
     el = document.createElement(elObj.n);
     if (elObj.a) {
        attributes = elObj.a;
        for (var key in attributes) if (attributes.hasOwnProperty(key)) {
           if (key.charAt(0) == '@')
              el.setAttribute(key.substring(1), attributes[key]);
           else 
              el[key] = attributes[key];
        }
     }
     if (elObj.evl) {
        el.addEventListener(elObj.evl.type, elObj.evl.f, elObj.evl.bubble);
     }
     if (elObj.c) {
        elObj.c.forEach(function (v, i, a) { e(v, el); });
     }
  }
  if (parent)
     parent.appendChild(el);
  return el;
}

function css() {
	GM_addStyle('\
	#wall2wall {\
		position: fixed; top: 50%; left: 50%; margin-top: -169px; margin-left: -300px;\
		width: 600px; height: 338px;\
		border: 1px solid #6698CB; background-color: #f3f3f3; -moz-border-radius: 5px\
	}\
	#wall2wall * {font-size: 12px; font-family: verdana, sans-serif;}\
	#wall2wall h3 {margin: 0; padding: .25em .5em; background-color: #6698CB; color: #fff;}\
	#wall2wall h3 span:first-child {float: left;}\
	#wall2wall h3 span:last-child {float: right;}\
	#wall2wall h4 {color: #666; margin: .25em; padding: .25em}\
	#exchange {overflow: auto; height: 285px; margin: 5px;}\
	#exchange > div {margin: .25em; padding: .25em;}\
	#exchange > div + div {border-top: 1px solid #ccc;}\
	#exchange > div > div {float: left;}\
	#exchange > div > div:first-child {width: 15%;}\
	#exchange > div > div:first-child img {width: 100%; border: 0 none;}\
	#exchange > div > div:last-child {width: 85%;}\
	#exchange > div > div:last-child > div {margin-left: 5px;}\
	#exchange > div > div:last-child > div:last-child * {max-width: 100%;}\
	.cmtInfo {margin-bottom: 5px;}\
	#exchange > div div.cmtInfo a {float: left;}\
	#exchange > div div div.cmtInfo span {color: #999; float: right;}\
	.clearfix:after {content: \'.\'; display: block; visibility: hidden; clear: both; height: 0;}\
	');
}

function getComments(id, fn) {
	window.setTimeout(function() { GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://comment.myspace.com/index.cfm?fuseaction=user.viewComments&friendID=' + id,
		headers: {'User-agent': navigator.userAgent},
		onload: function(responseDetails) {
			html = responseDetails.responseText.replace(/[\t\r\n]/g, '');
			cmtExp = /profile_comments_\d+".*?<a.*?href="[^"]+friendid=(\d+)".*?<img(.*?)>.*?<h4>([^<]+)<\/h4>.*?<span id="[^"]+">(.*?)<\/span>/g;
			comments = [];
			
			for (i = 0; i < html.match(cmtExp).length; i++) {
				thisComment = cmtExp.exec(html.match(cmtExp)[i]);
				comments.push({
					id: thisComment[1],
					img: thisComment[2].match(/src="([^"]+)"/)[1],
					name: thisComment[2].match(/title="([^"]+)"/)[1].referenceClear().trim(),
					date: thisComment[3],
					body: thisComment[4]
				});
			}
			
			fn(comments);
		}
	}) }, 0);
}

String.prototype.referenceClear = function() {
	dummy = e({n: 'div', a: {innerHTML: this}});
	return dummy.textContent;
}

String.prototype.escapeHTML = function () {
	return this.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};

function wall2wall(friend) {
	$(document.body).append(e({n: 'div', a: {id: 'wall2wall'}, c: [
		{n: 'h3', a: {className: 'clearfix'}, c: [{n: 'span', c: ['Wall-To-Wall']}, {n: 'span', c: ['x']}]},
		{n: 'h4', c: ['Comments exchanged between '+user.name+' and '+friend.name]},
		{n: 'div', a: {id: 'exchange'}, c: [{n: 'img', a: {src: 'http://x.myspace.com/modules/common/static/img/loadercircles.gif'}}]}
	]}));
	$('#wall2wall h3 span:last-child').click(function() {$('#wall2wall').remove()});
	$('#wall2wall').hide().show(500);
	
	exchange = [];
	userComments.forEach(function (a) {
		if (a.name == friend.name) {exchange.push(a)}
		//else console.log(a.name+' != '+friend.name)
	});
	//console.log(exchange.toSource());
	
	getComments(friend.id, function(comments) {
		$('#exchange').empty();
		comments.forEach(function (a) {
			if (a.name == user.name) {exchange.push(a)}
			//else console.log(a.name+' != '+user.name)
		});
		exchange.sort(function (a, b) {
			dateExp = /(\w+) (\d{1,2}), (\d{4}) (\d{1,2}):(\d{2}) (\w{2})/;
			x = a.date.match(dateExp);
			y = b.date.match(dateExp);
			xDate = new Date(x[3], x[1].toMonthNum(), x[2]);
				xDate.setHours((x[4]==12) ? ((x[6]=='AM')?0:12) : ((x[6]=='AM')?x[4]:x[4]*1+12));
				xDate.setMinutes(x[5]);
				xDate.setSeconds(0);
			yDate = new Date(y[3], y[1].toMonthNum(), y[2]);
				yDate.setHours((y[4]==12) ? ((y[6]=='AM')?0:12) : ((y[6]=='AM')?y[4]:y[4]*1+12));
				yDate.setMinutes(y[5]);
				yDate.setSeconds(0);
			return ((xDate > yDate) ? 1 : ((xDate < yDate) ? -1 : 0));
		});
		if (sort=='descending') exchange.reverse();
		exchange.forEach(function (a, b, c) {
			$('#exchange').append(e({n: 'div', a: {className: 'clearfix'}, c: [
				{n: 'div', a: {innerHTML: '<a href="http://www.myspace.com/'+a.id+'"><img src="'+a.img+'" /></a>'}},
				{n: 'div', a: {innerHTML: '<div class="cmtInfo clearfix"><a href="http://www.myspace.com/'+a.id+'">'+a.name.escapeHTML()+'</a><span>'+a.date+'</span></div><div>'+a.body+'</div>'}}
			]}));
		});
		if (sort=='ascending') $('#exchange').animate({scrollTop: document.getElementById('exchange').scrollHeight}, 1000);
	});
}

String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g ,'');
}

String.prototype.toMonthNum = function() {
	months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	m = 0;
	while (m < months.length && months[m] != this) {m++};
	return (m < months.length) ? m : undefined;
}

function begin() {
	user = {
		name: document.evaluate("//span[@class='nametext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).textContent.trim(),
		id: document.evaluate("//table[@class='contactTable']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).innerHTML.match(/friendID=(\d+)/)[1],
		pic: $('#ctl00_cpMain_ctl02_UserBasicInformation1_hlDefaultImage img').attr('src')
	};
	//getComments(user.id, function (comments) {userComments = comments});
	//console.log(user.toSource());
	
	cmtRows = document.evaluate("//table[@class='friendsComments']/tbody/tr/td/table[2]/tbody/tr[2]/td/table/tbody/tr", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	j = 0;
	while (j < cmtRows.snapshotLength) {
		cmtUsers.push({
			id: cmtRows.snapshotItem(j).cells[0].getElementsByTagName('a')[0].href.match(/friendid=(\d+)/)[1],
			name: cmtRows.snapshotItem(j).cells[0].getElementsByTagName('a')[0].textContent.trim(),
			img: cmtRows.snapshotItem(j).cells[0].getElementsByTagName('img')[0].src
		});
		cmtRows.snapshotItem(j).id = 'comment_'+j;
		j++;
	}
	//console.log(cmtUsers.toSource());
	
	css();

	getComments(user.id, function (comments) {
		userComments = comments;
		
		$('.columnsWidening').append(e({n: 'p', a: {className: 'wall2wall'}, c: [
			{n: 'a', a: {textContent: 'Wall-To-Wall', href: '#'}}
		]}));
		
		$('.wall2wall a').click(function() {
			wall2wall(cmtUsers[this.parentNode.parentNode.parentNode.id.match(/comment_(\d+)/)[1]]);
			return false;
		});
	});
}

commentsTable = document.evaluate("//table[@class='friendsComments']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

user = {};
cmtUsers = [];

if (commentsTable.snapshotLength > 0) {
	if (forceComments) commentsTable.snapshotItem(0).style.display = 'table';
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js',
		onload: function(r) {
			eval(r.responseText);
			begin();
		}
	});
}