// ==UserScript==
// @name           JVScript
// @namespace      Page Selector
// @include        http://www.jeuxvideo.com/forums/0-*-0-1-0-*-*-*.htm
// ==/UserScript==
function Paginator(number, link) {
	this.pages = parseInt(number / 20) + 1;
	this.begin = '';
	this.end = '';
	this.counter = 3;
	this.points = this.pages > 2 * this.counter;
	this.link = link;
	this.init();
}

Paginator.prototype.normalizeLink = function(i) {
	return '<a href="' + 
		this.link.replace(/(http:\/\/www\.jeuxvideo\.com\/forums\/1-[0-9]+-[0-9]+-)[0-9]+(.+)/, '$1' + i + '$2')
		+ '">'
		+ i
		+ '</a>';
}

Paginator.prototype.start = function(to) {
	for(var i = 0; i < to; i++)
		this.begin = this.begin + '[' + this.normalizeLink(i + 1) + ']';
		//this.begin = this.begin + '' + this.normalizeLink(i + 1) + (i + 1 == to ? '' : '|' );
	
}

Paginator.prototype.fin = function(to) {
	for(var i = this.pages; i > to; i--)
		this.end = '[' + this.normalizeLink(i) + ']' + this.end;
		//this.end = (i - 1 == to ? '' : '|' ) + this.normalizeLink(i) + '' + this.end;
	
}

Paginator.prototype.init = function() {
	this.start(Math.min(this.pages, this.counter));
	if(this.pages > this.counter)
		this.fin(this.pages - this.counter < this.counter ? this.counter : this.pages - this.counter);
	
}

Paginator.prototype.render = function() {
	return this.begin + (this.points ? '.....' : '' ) + this.end;	
	//return this.begin + (this.points ? '.....' : this.end == '' ? '' : '|' ) + this.end;	
}

Paginator.prototype.toString = function() {
	return 	'pages: ' + this.pages + '\n'
		+ 'link: ' + this.link + '\n'
		+ 'begin: ' + this.begin + '\n'
		+ 'end' + this.end + '\n';

}



function Topic(page, number){
	this.page = page;
	this.link = page.getElementsByTagName('a')[0];
	this.postsNumber = number;
	this.init();
}

Topic.prototype.newElemAppend = function(content) {
	var span = document.createElement('span');
	span.setAttribute('class', 'pagDiv');
	span.innerHTML = content;
	this.page.appendChild(span);
}

Topic.prototype.toString = function() {
	return	'page: ' + this.page + '\n'
		+ 'link: ' + this.link + '\n'
		+ 'postsNumber: ' + this.postsNumber +  '\n';
		

}


Topic.prototype.init = function() {
	this.page.setAttribute('class', 'topicDiv');
	var p = new Paginator(this.postsNumber, this.link.href);
	this.newElemAppend(p.render());	
}


function main() {
	var topic = new Array()
	var topics = document.evaluate('//tr[@class="tr1" or @class="tr2"]/td[position()=2 or position()=4]', document, null, 7, null)
	for(var i = 0; i < topics.snapshotLength; i = i+2) 
		if(parseInt(topics.snapshotItem(i + 1).textContent) > 19)
			new Topic(topics.snapshotItem(i), parseInt(topics.snapshotItem(i + 1).textContent));
}

main();

GM_addStyle('.pagDiv { float: right; font-size: 0.7em; }'
	+ '.pagDiv a { display: inline !important; }'
	+ '.topicDiv { text-align: left !important; }'
	+ '.topicDiv a { display: inline !important; }'
	
	);