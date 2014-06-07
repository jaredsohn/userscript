// ==UserScript==
// @name           Twitter/home + Last.fm/home
// @namespace      http://userscripts.org/users/7010
// @include        http://twitter.com/
// ==/UserScript==

// 2009-10-08: fix last.fm date parse
// 2009-10-08: fix twitter date parse
// 2009-05-20: change @include
// 2009-03-03: fix twitter date parse
// 2009-02-05: track list reverse
// 2009-02-03: twitter html change

GM_addStyle(<><![CDATA[
	tr.last-fm .status-body strong a{
	}
	.last-fm-widget{
		margin-left : 1em;
	}
	.last-fm-widget img{
		opacity : 0.2;
		height : 12px;
		border : 2px solid transparent;
	}
	.last-fm-widget:hover img{
		opacity : 1;
	}
	.last-fm-widget img:hover{
		height : 16px;
		border : 0 solid transparent;
	}
]]></>);


var NOW = Date.now();
var LAST_FM_URL = 'http://www.last.fm/';
var WIDGET = function(track){
	return <span class="last-fm-widget">
		<a href={'http://hypem.com/search/' + track.artistEncoded + ' - ' + track.titleEncoded} ><img src="http://static.hypem.com/favicon.ico" /></a>
		<a href={'http://www.amazon.' + (navigator.language=='ja'? 'co.jp' : 'com') + '/exec/obidos/external-search?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&tag=collecopy-22&url=search-alias%3Dpopular&field-keywords=' + track.artistEncoded} ><img src="http://www.amazon.co.jp/favicon.ico" /></a>
		<a href={'http://youtube.com/results.php?search_query=' + track.artistEncoded + ' ' + track.titleShrinked} ><img src="http://www.youtube.com/favicon.ico" /></a>
		<a href={'http://www.google.co.jp/search?q=' + track.artistEncoded.quote() + ' ' + track.titleEncoded.quote()} ><img src="http://www.google.co.jp/favicon.ico" /></a>
	</span>
};


getDocument('http://www.last.fm/home?setlang=en', function(doc){
	
	var tracks = $x('id("nowPlaying")//li[contains(@class, "user")]', doc, true).map(function(item){
		var user = $x('.//a[@class="name"]', item);
		
		var userImage = $x('.//span[@class="userImage"]/img/@src', item).replace('/34s/', '/126s/');
		
		var track = $x('.//p[@class="track"]', item);
		var artist = $x('.//a[1]', track);
		var title = $x('.//a[2]', track);
		
		var dateString = trim($x('.//span[@class="date"]', track).textContent);
		var date = parseLastFmDate(dateString) || new Date(NOW);
		
		return {
			user          : trim(user.textContent),
			userLink      : resolveRelativePath(user.href, LAST_FM_URL),
			userImage     : userImage,
			artist        : artist.textContent,
			artistEncoded : encodeURIComponent(artist.textContent),
			artistLink    : resolveRelativePath(artist.href, LAST_FM_URL),
			title         : title.textContent,
			titleEncoded  : encodeURIComponent(title.textContent),
			titleShrinked : shrink(title.textContent),
			titleLink     : resolveRelativePath(title.href, LAST_FM_URL),
			date          : date,
			dateString    : dateString,
		};
	}).reverse();
	
	
	var entries = [];
	$x('//li[contains(@class, "hentry")]', null, true).forEach(function(entry){
		var published = $x('.//span[contains(@class, "published")]/text()', entry);
		entries.push({
			date    : parseTwitterDate(published),
			element : entry,
		});
	});
		
	tracks.forEach(function(track){
		var entry = convertToDOM(<li class="hentry status last-fm">
			<span class="thumb">
				<a class="url" href={track.userLink} >
					<img class="photo fn" alt="{track.user}" height="48" width="48" 
						src={track.userImage} />
				</a>
			</span>
			<span class="status-body">
				<div>
					<strong>
						<a href={track.userLink} ><img height="12" src="http://cdn.last.fm/flatness/favicon.2.png" />{track.user}</a>
					</strong>
					<span class="entry-content">
						{(track.dateString=='now'? <img height="12" src="http://cdn.last.fm/flatness/global/icon_eq.gif" />: '')}
						<a href={track.artistLink}>{track.artist}</a> - <a href={track.titleLink}>{track.title}</a>
					</span>
					<span class="meta entry-meta">
						<span class="published">{track.dateString}</span>
						<span>from 
							<a href="http://www.last.fm/home">Last.fm</a>
						</span>
						{WIDGET(track)}
					</span>
				</div>
			</span>
			<span class="actions">
			</span>
		</li>);
		
		for(var i=0 ; i<entries.length ; i++){
			if(entries[i].date < track.date){
				insertBefore(entries[i].element, entry);
				return;
			}
		}
		insertAfter(entries[entries.length-1].element, entry);
	});
});



// ----[Application]-----------------------------------------------------------------------------
function getDocument(url, fn){
	GM_xmlhttpRequest({
		method : 'GET', 
		url    : url, 
		onload : function(res){
			fn(convertToHTMLDocument(res.responseText));
		},
	});
}

function parseTwitterDate(s){
	var t = {};
	t.minute = 1000 * 60;
	t.hour = t.minute * 60;
	t.day = t.hour * 24;
	
	var pm = t.hour * 12;
	
	var now = new Date();
	
	return (parseTwitterDate = function(s){
		s = s.replace(/(s? ago)$/, '').replace(/^about /, '');
		s = s.split(' ');
		
		if(s.length == 2){
			return new Date(now.getTime() - (s[0] * t[s[1]]));
		} else {
			var d = new Date([s[2], parseInt(s[3]) + ',', (s[4] || now.getFullYear()), s[0]].join(' '))
			if(s[1] == 'PM')
				d.setTime(d.getTime() + pm);
			
			return d;
		}
	})(s);
}

function parseLastFmDate(s){
	var t = {};
	t.minute = 1000 * 60;
	t.hour = t.minute * 60;
	t.day = t.hour * 24;
	
	return (parseLastFmDate = function(s){
GM_log(s);
		s = s.split(' ');
		if(isNaN(s[0]))
			return;
		
		s[1] = s[1].replace(/s$/, '');
		return new Date(NOW - (s[0] * t[s[1]]));
	})(s);
}

function convertToDOM(xml){
	var elm = document.createElement('span');
	elm.innerHTML = xml.toXMLString();
	return elm.childNodes[0];
}

function shrink(s){
	return encodeURIComponent(s.replace(/(\[.*?\]|\(.*?\))/g, '').replace(/ +/g, ' '));
}


// ----[Utility]-----------------------------------------------------------------------------
function resolveRelativePath(path, base){
	var a = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
	a.setAttributeNS('http://www.w3.org/XML/1998/namespace', 'xml:base', base);
	a.href = path;
	
	return a.href;
}

function $x(exp, ctx, multi){
	ctx = ctx || document;
	var res = (ctx.ownerDocument || ctx).evaluate(exp, ctx, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
	for(var i, nodes = [] ; i=res.iterateNext() ; nodes.push(i.nodeType==1? i : i.textContent));
	return multi? nodes : nodes[0];
}

function trim(str){
	return str.replace(/^\s+|\s+$/g, '');
}

function convertToHTMLDocument(html) {
	var xsl = (new DOMParser()).parseFromString(
		'<?xml version="1.0"?>\
			<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
			<output method="html"/>\
		</stylesheet>', "text/xml");
	
	var xsltp = new XSLTProcessor();
	xsltp.importStylesheet(xsl);
	
	var doc = xsltp.transformToDocument(document.implementation.createDocument('', '', null));
	doc.appendChild(doc.createElement('html'));
	
	var range = doc.createRange();
	range.selectNodeContents(doc.documentElement);
	doc.documentElement.appendChild(range.createContextualFragment(html));
	
	return doc
}

function wrappedObject(obj){
	return obj.wrappedJSObject || obj;
}

function insertBefore(target, node){
	return target.parentNode.insertBefore(node, target);
}

function insertAfter(target, node){
	return target.parentNode.insertBefore(node, target.nextSibling);
}